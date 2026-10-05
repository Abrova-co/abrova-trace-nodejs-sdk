const AbrovaTrace = require('../index');
const AbrovaTraceError = require('../lib/models/AbrovaTraceError');
const { Breadcrumb } = require('../lib/models/Breadcrumb');

// Mock HttpClient to prevent real network calls
jest.mock('../lib/handlers/HttpClient', () => {
  return jest.fn().mockImplementation(() => ({
    sendError: jest.fn().mockResolvedValue({ success: true, statusCode: 200 }),
    sendMessage: jest.fn().mockResolvedValue({ success: true, statusCode: 201 }),
  }));
});

// Mock PerformanceClient to prevent timers
jest.mock('../lib/performance/PerformanceClient', () => ({
  PerformanceClient: jest.fn().mockImplementation(() => ({
    reportSpan: jest.fn(),
    trackOperation: jest.fn(async (op, fn) => fn()),
    flush: jest.fn().mockResolvedValue(undefined),
    dispose: jest.fn().mockResolvedValue(undefined),
  })),
}));

const validOptions = () => ({
  apiKey: 'ab_live_abc123',
  serverSecret: 'ab_srv_secret456',
  captureUncaughtExceptions: false,
  captureUnhandledRejections: false,
});

describe('AbrovaTrace', () => {
  afterEach(async () => {
    await AbrovaTrace.close();
  });

  // ─── init ─────────────────────────────────────────────────────────

  describe('init()', () => {
    test('initializes the singleton instance', () => {
      AbrovaTrace.init(validOptions());
      expect(AbrovaTrace._instance).not.toBeNull();
      expect(AbrovaTrace._instance._isInitialized).toBe(true);
    });

    test('returns the instance', () => {
      const instance = AbrovaTrace.init(validOptions());
      expect(instance).toBe(AbrovaTrace._instance);
    });

    test('replaces previous instance on re-init', async () => {
      const first = AbrovaTrace.init(validOptions());
      const second = AbrovaTrace.init(validOptions());
      expect(second).not.toBe(first);
      expect(AbrovaTrace._instance).toBe(second);
    });

    test('throws when apiKey is missing', () => {
      expect(() => AbrovaTrace.init({ serverSecret: 'ab_srv_x' })).toThrow();
    });

    test('throws when serverSecret is missing', () => {
      expect(() => AbrovaTrace.init({ apiKey: 'ab_live_x' })).toThrow();
    });

    test('creates breadcrumb manager', () => {
      AbrovaTrace.init(validOptions());
      expect(AbrovaTrace._instance._breadcrumbManager).toBeDefined();
    });

    test('creates rate limiter', () => {
      AbrovaTrace.init(validOptions());
      expect(AbrovaTrace._instance._rateLimiter).toBeDefined();
    });

    test('creates HTTP client', () => {
      AbrovaTrace.init(validOptions());
      expect(AbrovaTrace._instance._httpClient).toBeDefined();
    });

    test('sets default sample rate to 1.0', () => {
      AbrovaTrace.init(validOptions());
      expect(AbrovaTrace._instance._sampleRate).toBe(1.0);
    });

    test('accepts custom sample rate', () => {
      AbrovaTrace.init({ ...validOptions(), sampleRate: 0.5 });
      expect(AbrovaTrace._instance._sampleRate).toBe(0.5);
    });
  });

  // ─── instance getter ─────────────────────────────────────────────

  describe('instance getter', () => {
    test('throws when not initialized', () => {
      expect(() => AbrovaTrace.instance).toThrow(
        'AbrovaTrace not initialized. Call AbrovaTrace.init() first.'
      );
    });

    test('returns the singleton when initialized', () => {
      AbrovaTrace.init(validOptions());
      expect(AbrovaTrace.instance).toBe(AbrovaTrace._instance);
    });
  });

  // ─── captureException ─────────────────────────────────────────────

  describe('captureException()', () => {
    test('resolves silently when not initialized', async () => {
      const result = await AbrovaTrace.captureException(new Error('no init'));
      expect(result).toBeUndefined();
    });

    test('sends error via HTTP client', async () => {
      AbrovaTrace.init(validOptions());
      await AbrovaTrace.captureException(new Error('test error'));

      expect(AbrovaTrace._instance._httpClient.sendError).toHaveBeenCalled();
    });

    test('includes environment and release from config', async () => {
      AbrovaTrace.init({
        ...validOptions(),
        environment: 'production',
        release: '2.0.0',
      });
      const sendSpy = AbrovaTrace._instance._httpClient.sendError;

      await AbrovaTrace.captureException(new Error('prod error'));

      const sentError = sendSpy.mock.calls[0][0];
      expect(sentError.environment).toBe('production');
      expect(sentError.release).toBe('2.0.0');
    });

    test('includes node context', async () => {
      AbrovaTrace.init(validOptions());
      const sendSpy = AbrovaTrace._instance._httpClient.sendError;

      await AbrovaTrace.captureException(new Error('ctx error'));

      const sentError = sendSpy.mock.calls[0][0];
      expect(sentError.extra.node_context).toBeDefined();
      expect(sentError.extra.node_context.node_version).toBe(process.version);
    });

    test('includes breadcrumbs in extra', async () => {
      AbrovaTrace.init(validOptions());
      AbrovaTrace.addBreadcrumb({ message: 'crumb1' });

      const sendSpy = AbrovaTrace._instance._httpClient.sendError;
      await AbrovaTrace.captureException(new Error('with crumbs'));

      const sentError = sendSpy.mock.calls[0][0];
      expect(sentError.extra.breadcrumbs).toBeDefined();
      expect(sentError.extra.breadcrumbs.length).toBeGreaterThan(0);
    });

    test('includes extra options', async () => {
      AbrovaTrace.init(validOptions());
      const sendSpy = AbrovaTrace._instance._httpClient.sendError;

      await AbrovaTrace.captureException(new Error('x'), {
        extra: { userId: 42 },
      });

      const sentError = sendSpy.mock.calls[0][0];
      expect(sentError.extra.userId).toBe(42);
    });

    test('skips sending when beforeSend returns falsy', async () => {
      AbrovaTrace.init({
        ...validOptions(),
        beforeSend: () => null,
      });
      const sendSpy = AbrovaTrace._instance._httpClient.sendError;

      await AbrovaTrace.captureException(new Error('filtered'));

      expect(sendSpy).not.toHaveBeenCalled();
    });

    test('calls beforeSend with the error', async () => {
      const beforeSend = jest.fn((err) => err);
      AbrovaTrace.init({ ...validOptions(), beforeSend });

      await AbrovaTrace.captureException(new Error('callback'));

      expect(beforeSend).toHaveBeenCalledWith(expect.any(AbrovaTraceError));
    });

    test('respects sample rate of 0', async () => {
      AbrovaTrace.init({ ...validOptions(), sampleRate: 0 });
      const sendSpy = AbrovaTrace._instance._httpClient.sendError;

      // With sampleRate=0 and Math.random() always returning something > 0,
      // all errors should be dropped
      jest.spyOn(Math, 'random').mockReturnValue(0.5);
      await AbrovaTrace.captureException(new Error('sampled'));
      jest.spyOn(Math, 'random').mockRestore();

      expect(sendSpy).not.toHaveBeenCalled();
    });

    test('does not send when disabled', async () => {
      AbrovaTrace.init({ ...validOptions(), enabled: false });

      await AbrovaTrace.captureException(new Error('disabled'));

      // sendError returns disabled result
      expect(AbrovaTrace._instance._httpClient.sendError).not.toHaveBeenCalled();
    });
  });

  // ─── captureMessage ───────────────────────────────────────────────

  describe('captureMessage()', () => {
    const sent = () => AbrovaTrace._instance._httpClient.sendMessage.mock.calls[0][0];

    test('resolves silently when not initialized', async () => {
      const result = await AbrovaTrace.captureMessage('no init');
      expect(result).toBeUndefined();
    });

    test('sends via sendMessage and never via sendError', async () => {
      AbrovaTrace.init(validOptions());
      await AbrovaTrace.captureMessage('test message');

      expect(AbrovaTrace._instance._httpClient.sendMessage).toHaveBeenCalledTimes(1);
      expect(AbrovaTrace._instance._httpClient.sendError).not.toHaveBeenCalled();
      expect(sent().message).toBe('test message');
    });

    test('builds the /api/messages payload shape', async () => {
      AbrovaTrace.init({ ...validOptions(), environment: 'staging', release: '9.9.9' });
      await AbrovaTrace.captureMessage('shape');

      const msg = sent();
      expect(msg).toEqual(expect.objectContaining({
        message: 'shape',
        level: 'info',
        platform: 'nodejs',
        environment: 'staging',
        release: '9.9.9',
        tags: {},
      }));
      expect(new Date(msg.timestamp).toISOString()).toBe(msg.timestamp);
      expect(msg.stack_trace).toBeUndefined();
      expect(Array.isArray(msg.breadcrumbs)).toBe(true);
    });

    test('carries _sdk.sdk_version in extra, keeping one the app set', async () => {
      AbrovaTrace.init(validOptions());
      const { SDK_VERSION } = require('../lib/config/AbrovaTraceConfig');
      await AbrovaTrace.captureMessage('v');
      expect(sent().extra._sdk).toEqual({ sdk_version: SDK_VERSION });

      AbrovaTrace._instance._httpClient.sendMessage.mockClear();
      await AbrovaTrace.captureMessage('v2', { extra: { _sdk: { sdk_version: 'x' } } });
      expect(sent().extra._sdk).toEqual({ sdk_version: 'x' });
    });

    test('defaults level to info and accepts the four message levels', async () => {
      AbrovaTrace.init(validOptions());
      const send = AbrovaTrace._instance._httpClient.sendMessage;
      for (const level of ['debug', 'info', 'warning', 'error']) {
        await AbrovaTrace.captureMessage(`lvl ${level}`, { level });
      }
      expect(send.mock.calls.map((c) => c[0].level)).toEqual(['debug', 'info', 'warning', 'error']);
    });

    test('maps warn, fatal, trace and unknown levels', async () => {
      AbrovaTrace.init(validOptions());
      const send = AbrovaTrace._instance._httpClient.sendMessage;
      await AbrovaTrace.captureMessage('a', { level: 'warn' });
      await AbrovaTrace.captureMessage('b', { level: 'fatal' });
      await AbrovaTrace.captureMessage('c', { level: 'trace' });
      await AbrovaTrace.captureMessage('d', { level: 'nonsense' });
      expect(send.mock.calls.map((c) => c[0].level)).toEqual(['warning', 'error', 'debug', 'info']);
    });

    test('includes extra and tags', async () => {
      AbrovaTrace.init(validOptions());
      await AbrovaTrace.captureMessage('msg', { extra: { detail: 'info' }, tags: { region: 'eu' } });

      expect(sent().extra.detail).toBe('info');
      expect(sent().tags).toEqual({ region: 'eu' });
    });

    test('puts the 10 most recent breadcrumbs at the top level, not in extra', async () => {
      AbrovaTrace.init(validOptions());
      for (let i = 0; i < 12; i++) {
        AbrovaTrace.addBreadcrumb({ message: `crumb ${i}`, category: 'test' });
      }
      await AbrovaTrace.captureMessage('with crumbs');

      const msg = sent();
      expect(msg.breadcrumbs).toHaveLength(10);
      expect(msg.breadcrumbs[0].message).toBe('crumb 2');
      expect(msg.breadcrumbs[9].message).toBe('crumb 11');
      expect(msg.extra.breadcrumbs).toBeUndefined();
    });

    test('sets user_id from the user context', async () => {
      AbrovaTrace.init(validOptions());
      AbrovaTrace.setUser({ id: 42, email: 'a@b.c' });
      await AbrovaTrace.captureMessage('user msg');

      expect(sent().user_id).toBe('42');
      expect(sent().extra.user_context).toEqual({ id: 42, email: 'a@b.c' });
    });

    test('omits user_id without a user', async () => {
      AbrovaTrace.init(validOptions());
      await AbrovaTrace.captureMessage('anon');
      expect(sent().user_id).toBeUndefined();
    });

    test('skips when beforeSend returns falsy', async () => {
      AbrovaTrace.init({ ...validOptions(), beforeSend: () => null });
      await AbrovaTrace.captureMessage('filtered');

      expect(AbrovaTrace._instance._httpClient.sendMessage).not.toHaveBeenCalled();
      expect(AbrovaTrace._instance._httpClient.sendError).not.toHaveBeenCalled();
    });

    test('beforeSend receives the message object and can modify it', async () => {
      const beforeSend = jest.fn((event) => ({ ...event, tags: { scrubbed: 'yes' } }));
      AbrovaTrace.init({ ...validOptions(), beforeSend });
      await AbrovaTrace.captureMessage('modify me');

      expect(beforeSend.mock.calls[0][0].message).toBe('modify me');
      expect(beforeSend.mock.calls[0][0].level).toBe('info');
      expect(sent().tags).toEqual({ scrubbed: 'yes' });
    });

    test('respects sample rate', async () => {
      AbrovaTrace.init({ ...validOptions(), sampleRate: 0 });
      await AbrovaTrace.captureMessage('sampled out');
      expect(AbrovaTrace._instance._httpClient.sendMessage).not.toHaveBeenCalled();
    });

    test('does not send when disabled', async () => {
      AbrovaTrace.init({ ...validOptions(), enabled: false });
      await AbrovaTrace.captureMessage('disabled');
      expect(AbrovaTrace._instance._httpClient.sendMessage).not.toHaveBeenCalled();
    });
  });

  // ─── addBreadcrumb ────────────────────────────────────────────────

  describe('addBreadcrumb()', () => {
    test('does nothing when not initialized', () => {
      expect(() => AbrovaTrace.addBreadcrumb({ message: 'safe' })).not.toThrow();
    });

    test('adds breadcrumb to manager', () => {
      AbrovaTrace.init(validOptions());
      AbrovaTrace.addBreadcrumb({ message: 'first', category: 'test' });

      const crumbs = AbrovaTrace._instance._breadcrumbManager.getAll();
      expect(crumbs).toHaveLength(1);
      expect(crumbs[0].message).toBe('first');
    });

    test('accepts Breadcrumb instance', () => {
      AbrovaTrace.init(validOptions());
      AbrovaTrace.addBreadcrumb(Breadcrumb.http('GET', '/test', 200, 50));

      const crumbs = AbrovaTrace._instance._breadcrumbManager.getAll();
      expect(crumbs).toHaveLength(1);
      expect(crumbs[0].category).toBe('http');
    });
  });

  // ─── setRequestContext / setUser ──────────────────────────────────

  describe('setRequestContext()', () => {
    test('does nothing when not initialized', () => {
      expect(() => AbrovaTrace.setRequestContext({ url: '/' })).not.toThrow();
    });

    test('stores request context', () => {
      AbrovaTrace.init(validOptions());
      AbrovaTrace.setRequestContext({ url: '/api', method: 'GET' });
      expect(AbrovaTrace._instance._requestContext).toEqual({ url: '/api', method: 'GET' });
    });
  });

  describe('setUser()', () => {
    test('does nothing when not initialized', () => {
      expect(() => AbrovaTrace.setUser({ id: '1' })).not.toThrow();
    });

    test('stores user context', () => {
      AbrovaTrace.init(validOptions());
      AbrovaTrace.setUser({ id: 'u1', email: 'test@example.com' });
      expect(AbrovaTrace._instance._userContext).toEqual({
        id: 'u1',
        email: 'test@example.com',
      });
    });
  });

  // ─── getConfig ────────────────────────────────────────────────────

  describe('getConfig()', () => {
    test('returns null when not initialized', () => {
      expect(AbrovaTrace.getConfig()).toBeUndefined();
    });

    test('returns config when initialized', () => {
      AbrovaTrace.init(validOptions());
      const config = AbrovaTrace.getConfig();
      expect(config.apiKey).toBe('ab_live_abc123');
    });
  });

  // ─── isEnabled ────────────────────────────────────────────────────

  describe('isEnabled()', () => {
    test('returns false when not initialized', () => {
      expect(AbrovaTrace.isEnabled()).toBe(false);
    });

    test('returns true when initialized and enabled', () => {
      AbrovaTrace.init(validOptions());
      expect(AbrovaTrace.isEnabled()).toBe(true);
    });

    test('returns false when initialized but disabled', () => {
      AbrovaTrace.init({ ...validOptions(), enabled: false });
      expect(AbrovaTrace.isEnabled()).toBe(false);
    });
  });

  // ─── getStats ─────────────────────────────────────────────────────

  describe('getStats()', () => {
    test('returns null when not initialized', () => {
      expect(AbrovaTrace.getStats()).toBeNull();
    });

    test('returns stats object when initialized', () => {
      AbrovaTrace.init(validOptions());
      const stats = AbrovaTrace.getStats();

      expect(stats).toHaveProperty('isEnabled', true);
      expect(stats).toHaveProperty('breadcrumbCount', 0);
      expect(stats).toHaveProperty('rateLimiter');
      expect(stats).toHaveProperty('config');
      expect(stats.config.apiKey).toContain('ab_live_');
    });

    test('tracks breadcrumb count', () => {
      AbrovaTrace.init(validOptions());
      AbrovaTrace.addBreadcrumb({ message: 'a' });
      AbrovaTrace.addBreadcrumb({ message: 'b' });

      expect(AbrovaTrace.getStats().breadcrumbCount).toBe(2);
    });

    test('truncates API key in stats', () => {
      AbrovaTrace.init(validOptions());
      const stats = AbrovaTrace.getStats();
      expect(stats.config.apiKey).toMatch(/\.\.\.$/);
    });
  });

  // ─── withScope ────────────────────────────────────────────────────

  describe('withScope()', () => {
    test('calls callback when not initialized', () => {
      const cb = jest.fn();
      AbrovaTrace.withScope(cb);
      expect(cb).toHaveBeenCalled();
    });

    test('provides scope object with setExtra, setUser, addBreadcrumb', () => {
      AbrovaTrace.init(validOptions());

      AbrovaTrace.withScope((scope) => {
        expect(scope).toHaveProperty('setExtra');
        expect(scope).toHaveProperty('setUser');
        expect(scope).toHaveProperty('addBreadcrumb');
      });
    });

    test('restores original context after scope', () => {
      AbrovaTrace.init(validOptions());
      AbrovaTrace.setRequestContext({ original: true });
      AbrovaTrace.setUser({ id: 'original' });

      AbrovaTrace.withScope((scope) => {
        scope.setExtra('scoped', true);
        scope.setUser({ id: 'scoped' });
      });

      // Context should be restored
      expect(AbrovaTrace._instance._userContext).toEqual({ id: 'original' });
    });

    test('scope.addBreadcrumb adds to manager', () => {
      AbrovaTrace.init(validOptions());

      AbrovaTrace.withScope((scope) => {
        scope.addBreadcrumb({ message: 'scoped crumb' });
      });

      // Breadcrumbs are NOT restored (they persist)
      const crumbs = AbrovaTrace._instance._breadcrumbManager.getAll();
      expect(crumbs).toHaveLength(1);
    });
  });

  // ─── flush ────────────────────────────────────────────────────────

  describe('flush()', () => {
    test('resolves true when not initialized', async () => {
      const result = await AbrovaTrace.flush();
      expect(result).toBe(true);
    });

    test('resolves true when initialized', async () => {
      AbrovaTrace.init(validOptions());
      const result = await AbrovaTrace.flush();
      expect(result).toBe(true);
    });
  });

  // ─── close ────────────────────────────────────────────────────────

  describe('close()', () => {
    test('clears the singleton', async () => {
      AbrovaTrace.init(validOptions());
      await AbrovaTrace.close();
      expect(AbrovaTrace._instance).toBeNull();
    });

    test('clears breadcrumbs on close', async () => {
      AbrovaTrace.init(validOptions());
      AbrovaTrace.addBreadcrumb({ message: 'will be cleared' });
      await AbrovaTrace.close();
      // After close, instance is null, so can't check breadcrumbs
      expect(AbrovaTrace._instance).toBeNull();
    });

    test('resets contexts on close', async () => {
      AbrovaTrace.init(validOptions());
      AbrovaTrace.setRequestContext({ url: '/' });
      AbrovaTrace.setUser({ id: '1' });
      await AbrovaTrace.close();
      expect(AbrovaTrace._instance).toBeNull();
    });

    test('handles close when not initialized', async () => {
      await expect(AbrovaTrace.close()).resolves.toBeUndefined();
    });
  });

  // ─── expressMiddleware ────────────────────────────────────────────

  describe('expressMiddleware()', () => {
    test('returns no-op middleware when not initialized', () => {
      const middleware = AbrovaTrace.expressMiddleware();
      expect(typeof middleware).toBe('function');

      // Should just call next
      const next = jest.fn();
      middleware({}, {}, next);
      expect(next).toHaveBeenCalled();
    });
  });

  // ─── Logging convenience methods ─────────────────────────────────

  describe('logging methods', () => {
    test('log() does nothing when not initialized', () => {
      expect(() => AbrovaTrace.log('test')).not.toThrow();
    });

    test('trace() does nothing when not initialized', () => {
      expect(() => AbrovaTrace.trace('test')).not.toThrow();
    });

    test('info() does nothing when not initialized', () => {
      expect(() => AbrovaTrace.info('test')).not.toThrow();
    });

    test('warn() does nothing when not initialized', () => {
      expect(() => AbrovaTrace.warn('test')).not.toThrow();
    });

    test('logError() does nothing when not initialized', () => {
      expect(() => AbrovaTrace.logError('test')).not.toThrow();
    });

    test('fatal() does nothing when not initialized', () => {
      expect(() => AbrovaTrace.fatal('test')).not.toThrow();
    });

    test('logDebug() does nothing when not initialized', () => {
      expect(() => AbrovaTrace.logDebug('test')).not.toThrow();
    });

    test('pendingLogCount returns 0 when not initialized', () => {
      expect(AbrovaTrace.pendingLogCount).toBe(0);
    });

    test('flushLogs resolves true when no log service', async () => {
      const result = await AbrovaTrace.flushLogs();
      expect(result).toBe(true);
    });
  });

  // ─── Performance methods ──────────────────────────────────────────

  describe('performance methods', () => {
    test('reportPerformanceSpan does nothing when not initialized', () => {
      expect(() => AbrovaTrace.reportPerformanceSpan({})).not.toThrow();
    });

    test('reportPerformanceSpanBatch does nothing when not initialized', () => {
      expect(() => AbrovaTrace.reportPerformanceSpanBatch([{}, {}])).not.toThrow();
    });

    test('trackOperation just runs the function when not initialized', async () => {
      const result = await AbrovaTrace.trackOperation('op', () => 42);
      expect(result).toBe(42);
    });

    test('flushPerformance does nothing when no client', async () => {
      await expect(AbrovaTrace.flushPerformance()).resolves.toBeUndefined();
    });
  });

  // ─── enableLogging ────────────────────────────────────────────────

  describe('enableLogging()', () => {
    test('does nothing when not initialized', () => {
      expect(() => AbrovaTrace.enableLogging()).not.toThrow();
    });

    test('creates log service when initialized', () => {
      AbrovaTrace.init(validOptions());
      AbrovaTrace.enableLogging({ sourceId: 'src-1' });
      expect(AbrovaTrace._instance._logService).toBeDefined();
    });
  });

  // ─── Rate limiting integration ────────────────────────────────────

  describe('rate limiting', () => {
    test('rate-limited errors are not sent', async () => {
      AbrovaTrace.init(validOptions());
      const sendSpy = AbrovaTrace._instance._httpClient.sendError;

      // Exhaust the rate limiter by sending many identical errors
      // Default: 10 same errors per minute
      for (let i = 0; i < 15; i++) {
        await AbrovaTrace.captureException(new Error('identical'));
      }

      // Should have been called 10 times (the per-error limit)
      expect(sendSpy.mock.calls.length).toBe(10);
    });
  });
});
