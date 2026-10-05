# Abrova Trace for Node.js

Error tracking, logging and performance monitoring for Node.js servers, reported to Abrova Trace.

## Requirements

- Node.js 14 or later
- Express 4 or later (optional, only for the Express middleware)

## Install

```
# .npmrc (in your project root)
@abrova-trace:registry=https://center.abrova.ir/api/packages/abrova/npm/
```

```
npm install @abrova-trace/nodejs-sdk
```

## Quick start

Initialise the SDK once, as early as possible in your entry file. The API key and the server secret come from the Abrova console.

```js
const AbrovaTrace = require('@abrova-trace/nodejs-sdk');

AbrovaTrace.init({
  apiKey: 'ab_live_your_api_key',
  serverSecret: 'ab_srv_your_server_secret',
  environment: 'production',
  release: '1.0.0',
});
```

Uncaught exceptions and unhandled promise rejections are now reported automatically. Both keys are required: `init()` throws if one is missing or has the wrong prefix. The server secret must stay on the server.

## Usage

### Capture an exception

```js
try {
  await chargeCustomer(order);
} catch (error) {
  AbrovaTrace.captureException(error, { extra: { orderId: order.id } });
}
```

### Capture a message

`level` is `debug`, `info` (default), `warning` or `error`.

```js
AbrovaTrace.captureMessage('Payment provider switched to fallback', {
  level: 'warning',
  extra: { attempt: 2 },
  tags: { region: 'eu' },
});
```

### Set the user

```js
AbrovaTrace.setUser({ id: '42', email: 'user@example.com', username: 'jane' });
```

### Add a breadcrumb

The most recent breadcrumbs are attached to every error and message.

```js
const { Breadcrumb } = require('@abrova-trace/nodejs-sdk');

AbrovaTrace.addBreadcrumb({ message: 'Cart updated', category: 'cart', data: { items: 3 } });
AbrovaTrace.addBreadcrumb(Breadcrumb.http('POST', '/api/order', 200, 150));
```

### Express middleware

Call `init()` first. The request handler goes before your routes, the error handler after them.

```js
const express = require('express');
const app = express();

const trace = AbrovaTrace.expressMiddleware();
app.use(trace.requestHandler());
app.use(trace.userMiddleware()); // optional: reads req.user (id, email, username)

app.get('/users/:id', getUser);

app.use(trace.errorHandler());
```

Reported errors include the method, path, matched route and response status. Request headers and bodies are never sent, and sensitive query and route values are redacted.

### Logging

Logs are sent in batches. Available levels: `trace`, `logDebug`, `info`, `warn`, `logError`, `fatal`.

```js
AbrovaTrace.enableLogging({ sourceId: 'api', sourceName: 'API server' });

AbrovaTrace.info('Server started', { port: 3000 });
AbrovaTrace.warn('Slow query', { durationMs: 2500 });
AbrovaTrace.logError('Payment gateway timeout', { orderId: 'A-1' });
```

Call `await AbrovaTrace.close()` before the process exits to send buffered logs and spans.

### Performance tracing

`trackOperation` times an async function and reports the result as a span.

```js
const users = await AbrovaTrace.trackOperation(
  'load-users',
  () => db.query('SELECT * FROM users'),
  { operationType: 'db', tags: { table: 'users' } }
);
```

To report a span you timed yourself, use `PerformanceSpan.fromHttpRequest()`, `PerformanceSpan.forDbQuery()` or `PerformanceSpan.custom()` with `AbrovaTrace.reportPerformanceSpan(span)`.

## Configuration

Options for `AbrovaTrace.init()`. TypeScript definitions are included.

| Option | Default | Description |
|---|---|---|
| `apiKey` | required | Project API key, starts with `ab_live_` |
| `serverSecret` | required | Server secret, starts with `ab_srv_` |
| `environment` | `NODE_ENV` or `development` | Environment name |
| `release` | `npm_package_version` or `1.0.0` | Version of your application |
| `enabled` | `true` | Set to `false` to stop reporting errors and messages |
| `debug` | `false` | Print SDK activity to the console |
| `timeout` | `5000` | Request timeout in milliseconds (1000 to 30000) |
| `sampleRate` | `1.0` | Share of errors and messages to report, from 0.0 to 1.0 |
| `maxBreadcrumbs` | `50` | Breadcrumbs kept in memory (up to 100) |
| `captureUncaughtExceptions` | `true` | Report uncaught exceptions, then exit the process |
| `captureUnhandledRejections` | `true` | Report unhandled promise rejections |
| `ignoredExceptions` | `[]` | Errors never reported: a constructor, an error name or a RegExp |
| `ignoredPaths` | `[]` | Request paths the middleware skips: an exact path, a glob such as `/health*` or a RegExp |
| `beforeSend` | none | Function called with each error or message before it is sent; return a falsy value to drop it |
| `apiUrl` | `https://trace.abrova.ir` | Base URL of the Trace API |

## License

MIT, see [LICENSE](LICENSE).
