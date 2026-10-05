# Changelog

## 0.2.1 - 2026-10-05

First public release.

- Automatic reporting of uncaught exceptions and unhandled promise rejections.
- Manual reporting with `captureException()` and `captureMessage()`, with user context and breadcrumbs.
- Express middleware that reports request errors with the route, path and response status, without headers or bodies.
- Batched logging with six levels, from `trace` to `fatal`.
- Performance spans with `trackOperation()` and `reportPerformanceSpan()`.
- Filtering with `ignoredExceptions`, `ignoredPaths`, `sampleRate` and `beforeSend`.
- TypeScript definitions included.
