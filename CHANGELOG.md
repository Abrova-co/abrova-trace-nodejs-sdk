# Changelog

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
