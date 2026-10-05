const AbrovaTrace = require('../index');

// Sends that stay open until the test releases them.
const pending = [];
jest.mock('../lib/handlers/HttpClient', () => {
  return jest.fn().mockImplementation(() => ({
    sendError: jest.fn(() => new Promise((resolve) => pending.push(resolve))),
    sendMessage: jest.fn(() => new Promise((resolve) => pending.push(resolve))),
  }));
});

jest.mock('../lib/performance/PerformanceClient', () => ({
  PerformanceClient: jest.fn().mockImplementation(() => ({
    reportSpan: jest.fn(),
    flush: jest.fn().mockResolvedValue(undefined),
    dispose: jest.fn().mockResolvedValue(undefined),
  })),
}));

const release = () => pending.splice(0).forEach((resolve) => resolve({ success: true, statusCode: 200 }));

describe('AbrovaTrace.flush', () => {
  beforeEach(() => {
    pending.length = 0;
    AbrovaTrace.init({
      apiKey: 'ab_live_abc123',
      serverSecret: 'ab_srv_secret456',
      captureUncaughtExceptions: false,
      captureUnhandledRejections: false,
    });
  });

  afterEach(async () => {
    release();
    await AbrovaTrace.close();
  });

  test('resolves true at once when nothing is waiting', async () => {
    await expect(AbrovaTrace.flush(1000)).resolves.toBe(true);
  });

  test('waits for an error that is still being sent', async () => {
    AbrovaTrace.captureException(new Error('boom'));
    let finished = false;
    const flushed = AbrovaTrace.flush(2000).then((result) => {
      finished = true;
      return result;
    });

    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(finished).toBe(false);

    release();
    await expect(flushed).resolves.toBe(true);
  });

  test('waits for a message that is still being sent', async () => {
    AbrovaTrace.captureMessage('hello');
    const flushed = AbrovaTrace.flush(2000);
    release();
    await expect(flushed).resolves.toBe(true);
  });

  test('resolves false when the timeout passes first', async () => {
    AbrovaTrace.captureException(new Error('slow'));
    await expect(AbrovaTrace.flush(50)).resolves.toBe(false);
  });

  test('flushes the performance buffer', async () => {
    AbrovaTrace.reportPerformanceSpan({ operation: 'x', durationMs: 1 });
    const client = AbrovaTrace.instance._performanceClient;
    await AbrovaTrace.flush(1000);
    expect(client.flush).toHaveBeenCalled();
  });

  test('does not reject when a send fails', async () => {
    AbrovaTrace.instance._trackSend(Promise.reject(new Error('network')));
    await expect(AbrovaTrace.flush(1000)).resolves.toBe(true);
  });
});
