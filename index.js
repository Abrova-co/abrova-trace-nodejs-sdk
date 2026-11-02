// index.js - Main AbrovaTrace SDK
const AbrovaTraceConfig = require('./lib/config/AbrovaTraceConfig');
const AbrovaTraceError = require('./lib/models/AbrovaTraceError');
const { Breadcrumb, BreadcrumbManager } = require('./lib/models/Breadcrumb');
const HttpClient = require('./lib/handlers/HttpClient');
const { createExpressMiddleware } = require('./lib/middleware/ExpressMiddleware');
const RateLimiter = require('./lib/utils/RateLimiter');
const { LogService, LogLevel, LogEntry } = require('./lib/logging/LogService');
const { PerformanceSpan, generateTraceId, generateSpanId } = require('./lib/performance/PerformanceSpan');
const { PerformanceClient } = require('./lib/performance/PerformanceClient');
const { Tracing } = require('./lib/tracing');

// The Trace messages table only accepts these four levels.
const MESSAGE_LEVELS = ['debug', 'info', 'warning', 'error'];
const MESSAGE_LEVEL_ALIASES = { warn: 'warning', fatal: 'error', critical: 'error', trace: 'debug', log: 'info' };

function normalizeMessageLevel(level) {
  if (typeof level !== 'string') return 'info';
  const lower = level.toLowerCase();
  if (MESSAGE_LEVELS.includes(lower)) return lower;
  return MESSAGE_LEVEL_ALIASES[lower] || 'info';
}

class AbrovaTrace {
  static _instance = null;

  constructor() {
    this._config = null;
    this._httpClient = null;
    this._breadcrumbManager = null;
    this._rateLimiter = null;
    this._isInitialized = false;
    this._requestContext = null;
    this._userContext = null;
    this._logService = null;
    this._performanceClient = null;
    this._sampleRate = 1.0;
    // Error and message requests that are on their way; flush() waits for them.
    this._pendingSends = new Set();
  }

  _trackSend(promise) {
    this._pendingSends.add(promise);
    const done = () => this._pendingSends.delete(promise);
    promise.then(done, done);
    return promise;
  }

  static get instance() {
    if (!AbrovaTrace._instance) {
      throw new Error('AbrovaTrace not initialized. Call AbrovaTrace.init() first.');
    }
    return AbrovaTrace._instance;
  }

  // Initialize AbrovaTrace
  static init(options) {
    AbrovaTrace._instance = new AbrovaTrace();
    try {
      AbrovaTrace._instance._initialize(options);
    } catch (error) {
      // A wrong key must never stop the app it watches: tracking turns itself off and says why.
      console.error(`[AbrovaTrace] Turned off: ${error.message}`);
      AbrovaTrace._instance._isInitialized = false;
    }
    return AbrovaTrace._instance;
  }

  _initialize(options) {
    this._config = new AbrovaTraceConfig(options);
    this._httpClient = new HttpClient(this._config);
    this._breadcrumbManager = new BreadcrumbManager(this._config.maxBreadcrumbs);
    this._rateLimiter = new RateLimiter({
      windowMs: 60000, // 1 minute
      maxErrors: 10,   // Max 10 same errors per minute
      maxTotal: 100    // Max 100 total errors per minute
    });

    this._sampleRate = options.sampleRate !== undefined ? options.sampleRate : 1.0;

    this._tracing = null;
    if (this._config.enabled && this._config.tracesSampleRate > 0) {
      try {
        this._config.sdkVersion = require('./package.json').version;
        const tracing = new Tracing(this._config, this._httpClient);
        if (tracing.start()) this._tracing = tracing;
      } catch (error) {
        if (this._config.debug) console.log('[AbrovaTrace] API tracing did not start:', error.message);
      }
    }

    this._setupErrorHandling();
    this._isInitialized = true;

    if (this._config.debug) {
      console.log('[AbrovaTrace] Initialized for Node.js', process.version);
    }
  }

  // Manually capture an exception
  static captureException(error, options = {}) {
    if (!AbrovaTrace._instance?._isInitialized) return Promise.resolve();
    return AbrovaTrace._instance._captureException(error, options);
  }

  async _captureException(error, options = {}) {
    // Exceptions the app said it never wants reported.
    if (!this._config.shouldCaptureException(error)) {
      if (this._config.debug) console.log('[AbrovaTrace] Error ignored by ignoredExceptions');
      return;
    }

    // Sample rate check
    if (this._sampleRate < 1.0 && Math.random() > this._sampleRate) {
      if (this._config.debug) console.log('[AbrovaTrace] Error dropped due to sample rate');
      return;
    }

    try {
      const abrovaTraceError = AbrovaTraceError.fromError(error, {
        environment: this._config.environment,
        release: this._config.release,
        extra: {
          ...options.extra,
          breadcrumbs: this._breadcrumbManager.getRecent(10),
          request_context: this._requestContext,
          user_context: this._userContext
        }
      });

      // Add Node.js context
      abrovaTraceError.addNodeContext();

      // Apply beforeSend callback if provided
      if (this._config.beforeSend) {
        const modifiedError = this._config.beforeSend(abrovaTraceError);
        if (!modifiedError) return; // Filter out this error
      }

      await this._sendError(abrovaTraceError);
    } catch (err) {
      if (this._config.debug) {
        console.error('[AbrovaTrace] Error capturing exception:', err);
      }
    }
  }

  // Manually capture a message
  static captureMessage(message, options = {}) {
    if (!AbrovaTrace._instance?._isInitialized) return Promise.resolve();
    return AbrovaTrace._instance._captureMessage(message, options);
  }

  async _captureMessage(message, options = {}) {
    // Sample rate check
    if (this._sampleRate < 1.0 && Math.random() > this._sampleRate) {
      if (this._config.debug) console.log('[AbrovaTrace] Message dropped due to sample rate');
      return;
    }

    try {
      // A message is not an issue: it goes to /api/messages with the same
      // shape the Next.js, iOS, Android and Flutter SDKs send, never to
      // /api/errors (which turned every message into an issue with a fake
      // stack trace).
      const extra = { ...(options.extra || {}) };
      if (this._requestContext) extra.request_context = this._requestContext;
      if (this._userContext) extra.user_context = this._userContext;
      const sdk = extra._sdk && typeof extra._sdk === 'object' && !Array.isArray(extra._sdk) ? extra._sdk : {};
      extra._sdk = { sdk_version: AbrovaTraceConfig.SDK_VERSION, ...sdk };

      const userId = this._userContext?.id;

      let abrovaTraceMessage = {
        message: String(message),
        level: normalizeMessageLevel(options.level),
        platform: 'nodejs',
        environment: this._config.environment,
        release: this._config.release,
        timestamp: new Date().toISOString(),
        user_id: userId !== undefined && userId !== null ? String(userId) : undefined,
        extra,
        tags: options.tags || {},
        breadcrumbs: this._breadcrumbManager.getRecent(10).map((b) => (b.toJSON ? b.toJSON() : b)),
      };

      // Same beforeSend as errors: a falsy return drops the message. The
      // callback receives this plain message object (no stack_trace); if it
      // returns an object, that object is what gets sent.
      if (this._config.beforeSend) {
        const modified = this._config.beforeSend(abrovaTraceMessage);
        if (!modified) return;
        if (typeof modified === 'object') abrovaTraceMessage = modified;
      }

      await this._sendMessage(abrovaTraceMessage);
    } catch (err) {
      if (this._config.debug) {
        console.error('[AbrovaTrace] Error capturing message:', err);
      }
    }
  }

  // Add breadcrumb
  static addBreadcrumb(breadcrumb) {
    if (!AbrovaTrace._instance?._isInitialized) return;
    AbrovaTrace._instance._breadcrumbManager.add(breadcrumb);
  }

  // Set request context
  static setRequestContext(context) {
    if (!AbrovaTrace._instance?._isInitialized) return;
    AbrovaTrace._instance._requestContext = context;
  }

  // Set user context
  static setUser(user) {
    if (!AbrovaTrace._instance?._isInitialized) return;
    AbrovaTrace._instance._userContext = user;
  }

  // Express middleware
  static expressMiddleware() {
    if (!AbrovaTrace._instance?._isInitialized) {
      // Not initialized: handlers that do nothing, in the same shape as the
      // real middleware (and still callable as a plain request handler).
      const noop = (req, res, next) => next();
      noop.requestHandler = () => (req, res, next) => next();
      noop.errorHandler = () => (error, req, res, next) => next(error);
      return noop;
    }
    return createExpressMiddleware(AbrovaTrace._instance);
  }

  // Get current configuration
  static getConfig() {
    return AbrovaTrace._instance?._config;
  }

  // Check if enabled
  static isEnabled() {
    return AbrovaTrace._instance?._config?.isEnabled() || false;
  }

  // Setup automatic error handling
  _setupErrorHandling() {
    if (this._config.captureUncaughtExceptions) {
      process.on('uncaughtException', (error) => {
        this._handleProcessError(error, 'uncaughtException');

        // Give time to send the error before exiting
        setTimeout(() => {
          process.exit(1);
        }, 1000);
      });
    }

    if (this._config.captureUnhandledRejections) {
      process.on('unhandledRejection', (reason, promise) => {
        const error = reason instanceof Error ? reason : new Error(String(reason));
        this._handleProcessError(error, 'unhandledRejection', { promise });
      });
    }
  }

  async _handleProcessError(error, type, extra = {}) {
    try {
      const abrovaTraceError = AbrovaTraceError.fromError(error, {
        environment: this._config.environment,
        release: this._config.release,
        extra: {
          error_type: type,
          ...extra,
          breadcrumbs: this._breadcrumbManager.getRecent(10),
          request_context: this._requestContext,
          user_context: this._userContext
        }
      });

      abrovaTraceError.addNodeContext();

      if (this._config.beforeSend) {
        const modifiedError = this._config.beforeSend(abrovaTraceError);
        if (!modifiedError) return;
      }

      await this._sendError(abrovaTraceError);
    } catch (err) {
      if (this._config.debug) {
        console.error('[AbrovaTrace] Error handling process error:', err);
      }
    }
  }

  async _sendError(abrovaTraceError) {
    if (!this._config.isEnabled()) return;

    // Check rate limiting
    const rateLimitResult = this._rateLimiter.shouldSendError(abrovaTraceError);
    if (!rateLimitResult.allowed) {
      if (this._config.debug) {
        console.log(`[AbrovaTrace] Rate limited: ${rateLimitResult.reason}`);
      }
      return;
    }

    // Send error
    const result = await this._trackSend(this._httpClient.sendError(abrovaTraceError));

    if (!result.success && this._config.debug) {
      console.log(`[AbrovaTrace] Failed to send error: ${result.error || result.reason}`);
    }
  }

  async _sendMessage(abrovaTraceMessage) {
    if (!this._config.isEnabled()) return;

    // Same flood protection as errors (keyed on message + platform + environment).
    const rateLimitResult = this._rateLimiter.shouldSendError(abrovaTraceMessage);
    if (!rateLimitResult.allowed) {
      if (this._config.debug) {
        console.log(`[AbrovaTrace] Rate limited: ${rateLimitResult.reason}`);
      }
      return;
    }

    const result = await this._trackSend(this._httpClient.sendMessage(abrovaTraceMessage));

    if (!result.success && this._config.debug) {
      console.log(`[AbrovaTrace] Failed to send message: ${result.error || result.reason}`);
    }
  }

  // Utility methods for advanced usage
  static withScope(callback) {
    if (!AbrovaTrace._instance?._isInitialized) return callback();

    const instance = AbrovaTrace._instance;
    const originalContext = { ...instance._requestContext };
    const originalUser = { ...instance._userContext };

    try {
      return callback({
        setExtra: (key, value) => {
          if (!instance._requestContext) instance._requestContext = {};
          instance._requestContext[key] = value;
        },
        setUser: (user) => {
          instance._userContext = user;
        },
        addBreadcrumb: (breadcrumb) => {
          instance._breadcrumbManager.add(breadcrumb);
        }
      });
    } finally {
      // Restore original context
      instance._requestContext = originalContext;
      instance._userContext = originalUser;
    }
  }

  // Get current stats (useful for monitoring)
  static getStats() {
    if (!AbrovaTrace._instance?._isInitialized) return null;

    return {
      isEnabled: AbrovaTrace._instance._config.isEnabled(),
      breadcrumbCount: AbrovaTrace._instance._breadcrumbManager.breadcrumbs.length,
      rateLimiter: AbrovaTrace._instance._rateLimiter.getStats(),
      config: {
        environment: AbrovaTrace._instance._config.environment,
        release: AbrovaTrace._instance._config.release,
        apiKey: AbrovaTrace._instance._config.apiKey.substring(0, 15) + '...'
      }
    };
  }

  // Send everything that is still waiting: errors and messages on their way, buffered
  // logs and buffered performance spans. Call it before the process exits.
  // Resolves true when all of it went out within the timeout, false otherwise. Never rejects.
  static async flush(timeout = 5000) {
    const instance = AbrovaTrace._instance;
    if (!instance?._isInitialized) return true;

    const work = Promise.all([
      Promise.all([...instance._pendingSends].map((send) => send.catch(() => {}))),
      instance._logService ? instance._logService.flush() : true,
      instance._tracing ? instance._tracing.flush() : true,
      instance._performanceClient ? instance._performanceClient.flush() : true
    ]).then(() => true, () => false);

    let timer;
    const timedOut = new Promise((resolve) => {
      timer = setTimeout(() => resolve(false), timeout);
    });
    const result = await Promise.race([work, timedOut]);
    clearTimeout(timer);
    return result;
  }

  // ==================== PERFORMANCE ====================

  /**
   * Ensure performance client is initialized
   */
  _ensurePerformanceClient() {
    if (!this._performanceClient) {
      this._performanceClient = new PerformanceClient(this._config);
    }
    return this._performanceClient;
  }

  /**
   * Report a performance span
   * @param {PerformanceSpan} span - The span to report
   */
  static reportPerformanceSpan(span) {
    if (!AbrovaTrace._instance?._isInitialized) return;
    AbrovaTrace._instance._ensurePerformanceClient().reportSpan(span);
  }

  /**
   * Report multiple performance spans in a batch
   * @param {PerformanceSpan[]} spans - Array of spans to report
   */
  static reportPerformanceSpanBatch(spans) {
    if (!AbrovaTrace._instance?._isInitialized) return;
    const client = AbrovaTrace._instance._ensurePerformanceClient();
    for (const span of spans) {
      client.reportSpan(span);
    }
  }

  /**
   * Track an async operation with automatic timing
   * @param {string} operation - Name of the operation
   * @param {Function} fn - Async function to track
   * @param {Object} [options] - Options (operationType, tags)
   * @returns {Promise<*>} Result of the operation
   */
  static async trackOperation(operation, fn, options = {}) {
    if (!AbrovaTrace._instance?._isInitialized) return fn();
    return AbrovaTrace._instance._ensurePerformanceClient().trackOperation(operation, fn, options);
  }

  /**
   * Flush pending performance spans
   */
  static async flushPerformance() {
    if (!AbrovaTrace._instance?._performanceClient) return;
    await AbrovaTrace._instance._performanceClient.flush();
  }

  // ==================== LOGGING ====================

  /**
   * Enable logging with optional configuration
   * @param {Object} options - Logging options
   * @param {string} [options.sourceId] - Identifier for this log source
   * @param {string} [options.sourceName] - Human-readable name for this source
   * @param {number} [options.batchSize=50] - Number of logs to batch before sending
   * @param {number} [options.flushIntervalMs=5000] - How often to flush logs
   */
  static enableLogging(options = {}) {
    if (!AbrovaTrace._instance?._isInitialized) return;

    const config = AbrovaTrace._instance._config;
    AbrovaTrace._instance._logService = new LogService({
      apiKey: config.apiKey,
      apiUrl: config.apiUrl,
      serverSecret: config.serverSecret,
      sourceId: options.sourceId,
      sourceName: options.sourceName,
      platform: 'nodejs',
      environment: config.environment,
      release: config.release,
      batchSize: options.batchSize || 50,
      flushIntervalMs: options.flushIntervalMs || 5000,
      debug: config.debug,
    });

    if (config.debug) {
      console.log(`[AbrovaTrace] Logging enabled with sourceId: ${options.sourceId}`);
    }
  }

  /**
   * Log a message with the specified level
   * @param {string} message - The log message
   * @param {string} [level='info'] - Log level (trace, debug, info, warn, error, fatal)
   * @param {Object} [metadata] - Additional metadata
   */
  static log(message, level = LogLevel.INFO, metadata = null) {
    if (!AbrovaTrace._instance?._isInitialized) return;

    // Auto-enable logging if not already enabled
    if (!AbrovaTrace._instance._logService) {
      AbrovaTrace.enableLogging();
    }

    const userId = AbrovaTrace._instance._userContext?.id || null;
    AbrovaTrace._instance._logService?.log(message, level, metadata, userId);
  }

  /**
   * Log a trace-level message
   */
  static trace(message, metadata = null) {
    AbrovaTrace.log(message, LogLevel.TRACE, metadata);
  }

  /**
   * Log a debug-level message
   */
  static logDebug(message, metadata = null) {
    AbrovaTrace.log(message, LogLevel.DEBUG, metadata);
  }

  /**
   * Log an info-level message
   */
  static info(message, metadata = null) {
    AbrovaTrace.log(message, LogLevel.INFO, metadata);
  }

  /**
   * Log a warning-level message
   */
  static warn(message, metadata = null) {
    AbrovaTrace.log(message, LogLevel.WARN, metadata);
  }

  /**
   * Log an error-level message (for non-exception errors)
   */
  static logError(message, metadata = null) {
    AbrovaTrace.log(message, LogLevel.ERROR, metadata);
  }

  /**
   * Log a fatal-level message
   */
  static fatal(message, metadata = null) {
    AbrovaTrace.log(message, LogLevel.FATAL, metadata);
  }

  /**
   * Flush all pending logs immediately
   * @returns {Promise<boolean>}
   */
  static async flushLogs() {
    if (!AbrovaTrace._instance?._logService) return true;
    return AbrovaTrace._instance._logService.flush();
  }

  /**
   * Get the number of logs currently buffered
   * @returns {number}
   */
  static get pendingLogCount() {
    return AbrovaTrace._instance?._logService?.bufferSize || 0;
  }

  // Close and cleanup
  static async close() {
    if (AbrovaTrace._instance) {
      // Flush and dispose log service
      if (AbrovaTrace._instance._logService) {
        await AbrovaTrace._instance._logService.dispose();
      }

      // Flush and dispose performance client
      if (AbrovaTrace._instance._performanceClient) {
        await AbrovaTrace._instance._performanceClient.dispose();
      }

      AbrovaTrace._instance._breadcrumbManager?.clear();
      AbrovaTrace._instance._requestContext = null;
      AbrovaTrace._instance._userContext = null;
      AbrovaTrace._instance._rateLimiter?.reset();
      AbrovaTrace._instance = null;
    }
  }
}

// Export static methods for convenience
module.exports = AbrovaTrace;

// Also export classes for advanced usage
module.exports.AbrovaTraceConfig = AbrovaTraceConfig;
module.exports.AbrovaTraceError = AbrovaTraceError;
module.exports.Breadcrumb = Breadcrumb;
module.exports.BreadcrumbManager = BreadcrumbManager;
module.exports.LogService = LogService;
module.exports.LogLevel = LogLevel;
module.exports.LogEntry = LogEntry;
module.exports.PerformanceSpan = PerformanceSpan;
module.exports.PerformanceClient = PerformanceClient;
module.exports.generateTraceId = generateTraceId;
module.exports.generateSpanId = generateSpanId;
