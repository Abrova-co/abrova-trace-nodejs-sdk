'use strict';

/**
 * Bundled into lib/tracing/otel.js by scripts/build-tracing.mjs, so the
 * package installs with no dependency from npm: everything here is inside it.
 * OpenTelemetry does the timing (http, express, NestJS, pg, mysql2, ioredis,
 * redis, mongodb, fetch); lib/tracing/convert.js turns each incoming request
 * into one transaction.
 */
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { ParentBasedSampler, TraceIdRatioBasedSampler } = require('@opentelemetry/sdk-trace-base');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');
const { NestInstrumentation } = require('@opentelemetry/instrumentation-nestjs-core');
const { PgInstrumentation } = require('@opentelemetry/instrumentation-pg');
const { MySQL2Instrumentation } = require('@opentelemetry/instrumentation-mysql2');
const { IORedisInstrumentation } = require('@opentelemetry/instrumentation-ioredis');
const { RedisInstrumentation } = require('@opentelemetry/instrumentation-redis');
const { MongoDBInstrumentation } = require('@opentelemetry/instrumentation-mongodb');
const { UndiciInstrumentation } = require('@opentelemetry/instrumentation-undici');
const { isTransactionRoot, toTransaction } = require('../lib/tracing/convert');

const MAX_TRACES = 2000;
const MAX_SPANS_PER_TRACE = 2000;
const STALE_MS = 120 * 1000;
/** Some spans end after their request (Express ends its route handler after the response): wait for them. */
const GRACE_MS = 250;

/** Redis: the command and its key, never its values. */
const redisStatement = (command, args) => [command, Array.isArray(args) && typeof args[0] === 'string' ? args[0].slice(0, 100) : null].filter(Boolean).join(' ');

/**
 * @param {{ sampleRate: number, tracing: object, ignoreHost: string, ignoredPaths: string[], context: object,
 *           onTransaction: (tx: object) => void }} opts
 */
function startTracing(opts) {
  const traces = new Map();

  const processor = {
    onStart() {},
    onEnd(span) {
      const traceId = span.spanContext().traceId;
      let bucket = traces.get(traceId);
      if (!bucket) {
        if (traces.size >= MAX_TRACES) {
          const cutoff = Date.now() - STALE_MS;
          for (const [id, b] of traces) if (b.at < cutoff) traces.delete(id);
          if (traces.size >= MAX_TRACES) return;
        }
        bucket = { at: Date.now(), spans: [] };
        traces.set(traceId, bucket);
      }
      if (bucket.spans.length < MAX_SPANS_PER_TRACE) bucket.spans.push(span);
      if (isTransactionRoot(span) && !bucket.root) {
        bucket.root = span;
        const timer = setTimeout(() => {
          traces.delete(traceId);
          try {
            opts.onTransaction(toTransaction(bucket.root, bucket.spans, opts.context));
          } catch (_) {
            // A transaction that cannot be built is skipped, never thrown into the app.
          }
        }, GRACE_MS);
        if (timer.unref) timer.unref();
      }
    },
    forceFlush: () => Promise.resolve(),
    shutdown: () => Promise.resolve(),
  };

  const provider = new NodeTracerProvider({
    sampler: new ParentBasedSampler({ root: new TraceIdRatioBasedSampler(opts.sampleRate) }),
    spanProcessors: [processor],
  });
  provider.register();

  const t = opts.tracing || {};
  const ignoredPaths = opts.ignoredPaths || [];
  const instrumentations = [
    new HttpInstrumentation({
      // The SDK's own requests to Abrova Trace are never traced.
      ignoreOutgoingRequestHook: (req) => (req.hostname || req.host || '').split(':')[0] === opts.ignoreHost,
      ignoreIncomingRequestHook: (req) => ignoredPaths.some((p) => (req.url || '').split('?')[0] === p),
    }),
    new ExpressInstrumentation(),
    new NestInstrumentation(),
  ];
  if (t.sqlQueries !== false) instrumentations.push(new PgInstrumentation(), new MySQL2Instrumentation());
  if (t.redisCommands !== false) {
    instrumentations.push(
      new IORedisInstrumentation({ dbStatementSerializer: redisStatement }),
      new RedisInstrumentation({ dbStatementSerializer: redisStatement })
    );
  }
  if (t.mongodb !== false) instrumentations.push(new MongoDBInstrumentation());
  if (t.httpClientRequests !== false) {
    instrumentations.push(new UndiciInstrumentation({ ignoreRequestHook: (req) => (req.origin || '').includes(opts.ignoreHost) }));
  }
  registerInstrumentations({ tracerProvider: provider, instrumentations });

  /** Requests that finished but are still waiting for their late spans. */
  const pending = () => [...traces.values()].filter((b) => b.root).length;
  return { pending, shutdown: () => provider.shutdown() };
}

module.exports = { startTracing };
