# Changelog

## 0.3.0 - 2026-11-02

- API tracing: a share of incoming requests (`tracesSampleRate`, 0.1 by default) is sent as a transaction with its spans: Express and NestJS handlers and middleware, PostgreSQL and MySQL queries (text only, never values), Redis commands (command and key), MongoDB, and outbound HTTP (`http`, `https` and `fetch`). The Console shows each route's slowest requests, one request as a timeline, and N+1 queries.
- The standard `traceparent` header continues a trace across services.
- Call `AbrovaTrace.init()` before requiring your framework and database clients, so they can be timed.
- Tracing needs Node 18.19+ or 20.6+; on older Node it stays off and everything else works as before.
- Nothing new to install: tracing is built into the package.
- A wrong or missing key turns tracking off and says why on the console, instead of `init()` throwing and stopping the app.

## 0.2.4 - 2026-10-06

- A report that is sent again is counted once: every error carries an `event_id` that stays the same on each attempt.

## 0.2.3 - 2026-10-05

- `flush()` sends what is still waiting (errors, messages, logs, performance spans) and returns `false` when it did not finish in time.
- Express: sensitive query values in the request address are replaced with `[REDACTED]`.
- TypeScript: `expressMiddleware()` is typed with `requestHandler()` and `errorHandler()`.

## 0.2.1 - 2026-10-05

First public release.

- Automatic reporting of uncaught exceptions and unhandled promise rejections.
- Manual reporting with `captureException()` and `captureMessage()`, with user context and breadcrumbs.
- Express middleware that reports request errors with the route, path and response status, without headers or bodies.
- Batched logging with six levels, from `trace` to `fatal`.
- Performance spans with `trackOperation()` and `reportPerformanceSpan()`.
- Filtering with `ignoredExceptions`, `ignoredPaths`, `sampleRate` and `beforeSend`.
- TypeScript definitions included.
