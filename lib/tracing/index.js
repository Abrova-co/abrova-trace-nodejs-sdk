'use strict';

/**
 * API tracing: starts the bundled OpenTelemetry (lib/tracing/otel.js) and
 * sends each finished request to Abrova Trace as a transaction, in batches,
 * away from the request: the app never waits for it.
 *
 * Needs Node 18.19+ or 20.6+ (OpenTelemetry's own floor). On an older Node,
 * tracing stays off and the rest of the SDK works as before.
 */

const BATCH = 10;
const FLUSH_MS = 5000;
const MAX_QUEUE = 500;

function nodeSupportsTracing(version = process.versions.node) {
  const [major, minor] = version.split('.').map(Number);
  return (major === 18 && minor >= 19) || (major === 20 && minor >= 6) || major >= 21;
}

class Tracing {
  constructor(config, http) {
    this.config = config;
    this.http = http;
    this.queue = [];
    this.timer = null;
    this.sending = new Set();
    this.handle = null;
  }

  start() {
    if (!nodeSupportsTracing()) {
      if (this.config.debug) console.log(`[AbrovaTrace] API tracing needs Node 18.19+ or 20.6+; this is ${process.version}. Tracing is off.`);
      return false;
    }
    // eslint-disable-next-line global-require
    const { startTracing } = require('./otel.js');
    this.handle = startTracing({
      sampleRate: this.config.tracesSampleRate,
      tracing: this.config.tracing,
      ignoredPaths: this.config.ignoredPaths,
      ignoreHost: new URL(this.config.apiUrl).hostname,
      context: {
        environment: this.config.environment,
        release: this.config.release,
        platform: 'nodejs',
        sdk: { name: 'abrova-trace-nodejs', version: this.config.sdkVersion },
      },
      onTransaction: (tx) => this.add(tx),
    });
    return true;
  }

  add(tx) {
    if (this.queue.length >= MAX_QUEUE) return;
    this.queue.push(tx);
    if (this.queue.length >= BATCH) {
      this.sendNow();
    } else if (!this.timer) {
      this.timer = setTimeout(() => this.sendNow(), FLUSH_MS);
      if (this.timer.unref) this.timer.unref();
    }
  }

  /** Waits (up to a second) for finished requests still collecting late spans, then sends everything. */
  async flush() {
    for (let waited = 0; this.handle && this.handle.pending() > 0 && waited < 1000; waited += 50) {
      // eslint-disable-next-line no-await-in-loop
      await new Promise((resolve) => { setTimeout(resolve, 50); });
    }
    return this.sendNow();
  }

  sendNow() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.queue.length === 0) return Promise.all([...this.sending]);
    const transactions = this.queue.splice(0, this.queue.length);
    const send = this.http
      ._makeRequest(`${this.config.apiUrl}/api/performance/transactions`, JSON.stringify({ transactions }))
      .catch((error) => {
        if (this.config.debug) console.log('[AbrovaTrace] Sending transactions failed:', error.message);
      })
      .finally(() => this.sending.delete(send));
    this.sending.add(send);
    return Promise.all([...this.sending]);
  }

  async shutdown() {
    await this.flush();
    if (this.handle) await this.handle.shutdown();
  }
}

module.exports = { Tracing, nodeSupportsTracing };
