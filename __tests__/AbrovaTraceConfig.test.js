const AbrovaTraceConfig = require('../lib/config/AbrovaTraceConfig');
const { SDK_VERSION } = require('../lib/config/AbrovaTraceConfig');

const validOptions = () => ({
  apiKey: 'ab_live_abc123',
  serverSecret: 'ab_srv_secret456',
});

describe('AbrovaTraceConfig', () => {
  // ─── Constructor & Required Fields ────────────────────────────────

  describe('constructor - required fields', () => {
    test('throws when no options are provided', () => {
      expect(() => new AbrovaTraceConfig()).toThrow(
        'API key is required in AbrovaTrace configuration'
      );
    });

    test('throws when apiKey is missing', () => {
      expect(() => new AbrovaTraceConfig({ serverSecret: 'ab_srv_x' })).toThrow(
        'API key is required in AbrovaTrace configuration'
      );
    });

    test('throws when serverSecret is missing', () => {
      expect(() => new AbrovaTraceConfig({ apiKey: 'ab_live_abc' })).toThrow(
        'Server secret is required for server-side operations'
      );
    });

    test('creates config with valid apiKey and serverSecret', () => {
      const cfg = new AbrovaTraceConfig(validOptions());
      expect(cfg.apiKey).toBe('ab_live_abc123');
      expect(cfg.serverSecret).toBe('ab_srv_secret456');
    });
  });

  // ─── API Key Validation ───────────────────────────────────────────

  describe('API key format validation', () => {
    test('accepts ab_live_ prefix', () => {
      const cfg = new AbrovaTraceConfig({ ...validOptions(), apiKey: 'ab_live_xyz' });
      expect(cfg.apiKey).toBe('ab_live_xyz');
    });

    test('rejects ab_test_ prefix (never issued)', () => {
      expect(
        () => new AbrovaTraceConfig({ ...validOptions(), apiKey: 'ab_test_xyz' })
      ).toThrow('API key must start with ab_live_');
    });

    test('rejects nl_live_ prefix (legacy)', () => {
      expect(
        () => new AbrovaTraceConfig({ ...validOptions(), apiKey: 'nl_live_xyz' })
      ).toThrow('API key must start with ab_live_');
    });

    test('rejects nl_test_ prefix (legacy)', () => {
      expect(
        () => new AbrovaTraceConfig({ ...validOptions(), apiKey: 'nl_test_xyz' })
      ).toThrow('API key must start with ab_live_');
    });

    test('rejects API key with invalid prefix', () => {
      expect(
        () => new AbrovaTraceConfig({ ...validOptions(), apiKey: 'invalid_key' })
      ).toThrow('API key must start with ab_live_');
    });

    test('rejects empty string API key', () => {
      expect(
        () => new AbrovaTraceConfig({ ...validOptions(), apiKey: '' })
      ).toThrow();
    });

    test('rejects non-string API key', () => {
      expect(
        () => new AbrovaTraceConfig({ ...validOptions(), apiKey: 12345 })
      ).toThrow();
    });
  });

  // ─── Server Secret Validation ─────────────────────────────────────

  describe('server secret validation', () => {
    test('accepts ab_srv_ prefix', () => {
      const cfg = new AbrovaTraceConfig({ ...validOptions(), serverSecret: 'ab_srv_abc' });
      expect(cfg.serverSecret).toBe('ab_srv_abc');
    });

    test('rejects nl_srv_ prefix (legacy)', () => {
      expect(
        () => new AbrovaTraceConfig({ ...validOptions(), serverSecret: 'nl_srv_abc' })
      ).toThrow('Server secret must start with ab_srv_');
    });

    test('rejects invalid server secret prefix', () => {
      expect(
        () => new AbrovaTraceConfig({ ...validOptions(), serverSecret: 'bad_prefix' })
      ).toThrow('Server secret must start with ab_srv_');
    });

    test('rejects empty string server secret', () => {
      expect(
        () => new AbrovaTraceConfig({ ...validOptions(), serverSecret: '' })
      ).toThrow('Server secret is required for server-side operations');
    });

    test('rejects non-string server secret', () => {
      expect(
        () => new AbrovaTraceConfig({ ...validOptions(), serverSecret: 999 })
      ).toThrow();
    });
  });

  // ─── Default Values ───────────────────────────────────────────────

  describe('default values', () => {
    let cfg;
    beforeEach(() => {
      cfg = new AbrovaTraceConfig(validOptions());
    });

    test('apiUrl defaults to hardcoded AbrovaTrace URL', () => {
      expect(cfg.apiUrl).toBe('https://trace.abrova.ir');
    });

    test('environment defaults to NODE_ENV or development', () => {
      // In jest NODE_ENV is typically "test"
      expect(['test', 'development']).toContain(cfg.environment);
    });

    test('release defaults to npm_package_version or 1.0.0', () => {
      expect(cfg.release).toBeDefined();
    });

    test('enabled defaults to true', () => {
      expect(cfg.enabled).toBe(true);
    });

    test('debug defaults to false', () => {
      expect(cfg.debug).toBe(false);
    });

    test('timeout defaults to 5000', () => {
      expect(cfg.timeout).toBe(5000);
    });

    test('captureUncaughtExceptions defaults to true', () => {
      expect(cfg.captureUncaughtExceptions).toBe(true);
    });

    test('captureUnhandledRejections defaults to true', () => {
      expect(cfg.captureUnhandledRejections).toBe(true);
    });

    test('maxBreadcrumbs defaults to 50', () => {
      expect(cfg.maxBreadcrumbs).toBe(50);
    });

    test('beforeSend defaults to null', () => {
      expect(cfg.beforeSend).toBeNull();
    });
  });

  // ─── Custom Values ────────────────────────────────────────────────

  describe('custom option values', () => {
    test('allows custom environment', () => {
      const cfg = new AbrovaTraceConfig({ ...validOptions(), environment: 'staging' });
      expect(cfg.environment).toBe('staging');
    });

    test('allows custom release', () => {
      const cfg = new AbrovaTraceConfig({ ...validOptions(), release: '2.5.0' });
      expect(cfg.release).toBe('2.5.0');
    });

    test('allows enabled = false', () => {
      const cfg = new AbrovaTraceConfig({ ...validOptions(), enabled: false });
      expect(cfg.enabled).toBe(false);
    });

    test('allows debug = true', () => {
      const cfg = new AbrovaTraceConfig({ ...validOptions(), debug: true });
      expect(cfg.debug).toBe(true);
    });

    test('allows custom timeout within range', () => {
      const cfg = new AbrovaTraceConfig({ ...validOptions(), timeout: 10000 });
      expect(cfg.timeout).toBe(10000);
    });

    test('allows maxBreadcrumbs within range', () => {
      const cfg = new AbrovaTraceConfig({ ...validOptions(), maxBreadcrumbs: 25 });
      expect(cfg.maxBreadcrumbs).toBe(25);
    });

    test('allows beforeSend callback', () => {
      const cb = jest.fn();
      const cfg = new AbrovaTraceConfig({ ...validOptions(), beforeSend: cb });
      expect(cfg.beforeSend).toBe(cb);
    });

    test('captureUncaughtExceptions can be disabled', () => {
      const cfg = new AbrovaTraceConfig({ ...validOptions(), captureUncaughtExceptions: false });
      expect(cfg.captureUncaughtExceptions).toBe(false);
    });

    test('captureUnhandledRejections can be disabled', () => {
      const cfg = new AbrovaTraceConfig({ ...validOptions(), captureUnhandledRejections: false });
      expect(cfg.captureUnhandledRejections).toBe(false);
    });
  });

  // ─── Timeout Validation ───────────────────────────────────────────

  describe('timeout validation', () => {
    test('rejects timeout below 1000ms', () => {
      expect(
        () => new AbrovaTraceConfig({ ...validOptions(), timeout: 500 })
      ).toThrow('Timeout must be between 1000ms and 30000ms');
    });

    test('rejects timeout above 30000ms', () => {
      expect(
        () => new AbrovaTraceConfig({ ...validOptions(), timeout: 60000 })
      ).toThrow('Timeout must be between 1000ms and 30000ms');
    });

    test('accepts timeout at lower boundary (1000ms)', () => {
      const cfg = new AbrovaTraceConfig({ ...validOptions(), timeout: 1000 });
      expect(cfg.timeout).toBe(1000);
    });

    test('accepts timeout at upper boundary (30000ms)', () => {
      const cfg = new AbrovaTraceConfig({ ...validOptions(), timeout: 30000 });
      expect(cfg.timeout).toBe(30000);
    });
  });

  // ─── maxBreadcrumbs Validation ────────────────────────────────────

  describe('maxBreadcrumbs validation', () => {
    test('rejects negative maxBreadcrumbs', () => {
      expect(
        () => new AbrovaTraceConfig({ ...validOptions(), maxBreadcrumbs: -1 })
      ).toThrow('maxBreadcrumbs must be between 0 and 100');
    });

    test('rejects maxBreadcrumbs above 100', () => {
      expect(
        () => new AbrovaTraceConfig({ ...validOptions(), maxBreadcrumbs: 200 })
      ).toThrow('maxBreadcrumbs must be between 0 and 100');
    });

    test('maxBreadcrumbs of 0 defaults to 50 (falsy value)', () => {
      const cfg = new AbrovaTraceConfig({ ...validOptions(), maxBreadcrumbs: 0 });
      expect(cfg.maxBreadcrumbs).toBe(50);
    });

    test('accepts maxBreadcrumbs at upper boundary (100)', () => {
      const cfg = new AbrovaTraceConfig({ ...validOptions(), maxBreadcrumbs: 100 });
      expect(cfg.maxBreadcrumbs).toBe(100);
    });
  });

  // ─── Instance Methods ─────────────────────────────────────────────

  describe('getEndpoint()', () => {
    test('returns correct API errors endpoint', () => {
      const cfg = new AbrovaTraceConfig(validOptions());
      expect(cfg.getEndpoint()).toBe('https://trace.abrova.ir/api/errors');
    });
  });

  describe('getMessagesEndpoint()', () => {
    test('returns the API messages endpoint', () => {
      const cfg = new AbrovaTraceConfig(validOptions());
      expect(cfg.getMessagesEndpoint()).toBe('https://trace.abrova.ir/api/messages');
    });

    test('follows a custom apiUrl the same way as getEndpoint()', () => {
      const cfg = new AbrovaTraceConfig({ ...validOptions(), apiUrl: 'http://localhost:3001' });
      expect(cfg.getMessagesEndpoint()).toBe('http://localhost:3001/api/messages');
      expect(cfg.getEndpoint()).toBe('http://localhost:3001/api/errors');
    });
  });

  describe('isEnabled()', () => {
    test('returns true when enabled', () => {
      const cfg = new AbrovaTraceConfig(validOptions());
      expect(cfg.isEnabled()).toBe(true);
    });

    test('returns false when disabled', () => {
      const cfg = new AbrovaTraceConfig({ ...validOptions(), enabled: false });
      expect(cfg.isEnabled()).toBe(false);
    });
  });

  describe('shouldCaptureException()', () => {
    test('returns true for any error', () => {
      const cfg = new AbrovaTraceConfig(validOptions());
      expect(cfg.shouldCaptureException(new Error('test'))).toBe(true);
    });
  });

  // ─── SDK_VERSION Export ───────────────────────────────────────────

  describe('SDK_VERSION export', () => {
    test('SDK_VERSION is exported and is a string', () => {
      expect(typeof SDK_VERSION).toBe('string');
    });

    test('SDK_VERSION matches expected format', () => {
      expect(SDK_VERSION).toMatch(/^\d+\.\d+\.\d+$/);
    });
  });
});
