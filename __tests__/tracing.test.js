const { describe: describeSpan, isTransactionRoot, statusForHttp, toTransaction } = require('../lib/tracing/convert');
const { nodeSupportsTracing } = require('../lib/tracing');

const S = 1793580000;
const hr = (s) => [Math.floor(s), Math.round((s % 1) * 1e9)];
const span = (id, parent, kind, name, from, to, attributes = {}, remote = false) => ({
  name,
  kind,
  startTime: hr(S + from),
  endTime: hr(S + to),
  attributes,
  status: { code: 0 },
  spanContext: () => ({ traceId: 'a'.repeat(32), spanId: id.padStart(16, '0') }),
  parentSpanContext: parent ? { spanId: parent.padStart(16, '0'), isRemote: remote } : undefined,
});

const root = span('1', 'f', 1, 'GET', 0, 0.2, { 'http.request.method': 'GET', 'http.route': '/orders/:id', 'http.response.status_code': 200 }, true);
const handler = span('2', '1', 0, 'request handler - /orders/:id', 0.01, 0.25, { 'express.type': 'request_handler', 'express.name': '/orders/:id' });
const query = span('3', '2', 2, 'pg.query', 0.02, 0.03, { 'db.system.name': 'postgresql', 'db.query.text': 'SELECT * FROM customers WHERE id = $1', 'db.namespace': 'shop' });

describe('API tracing: OpenTelemetry spans to a transaction', () => {
  it('names the transaction by method and route, in the Sentry shape', () => {
    const tx = toTransaction(root, [root, handler, query], { environment: 'production' });
    expect(tx).toMatchObject({
      type: 'transaction',
      transaction: 'GET /orders/:id',
      transaction_info: { source: 'route' },
      environment: 'production',
      contexts: { trace: { trace_id: 'a'.repeat(32), parent_span_id: 'f'.padStart(16, '0'), op: 'http.server', status: 'ok' } },
    });
    expect(tx.spans.map((s) => s.op)).toEqual(['http.route', 'db.sql.query']);
    expect(tx.spans[1]).toMatchObject({ description: 'SELECT * FROM customers WHERE id = $1', data: { 'db.system': 'postgresql', 'db.name': 'shop' } });
  });

  it('keeps spans whose parent ended too late, under the request', () => {
    const tx = toTransaction(root, [root, query]);
    expect(tx.spans).toHaveLength(1);
    expect(tx.spans[0].parent_span_id).toBe('1'.padStart(16, '0'));
  });

  it('never sends Redis values or URL query strings', () => {
    const redis = describeSpan(span('4', '2', 2, 'set', 0, 0.001, { 'db.system.name': 'redis', 'db.query.text': 'set session:42 secret-value' }));
    expect(redis).toMatchObject({ op: 'db.redis', description: 'SET session:42' });
    const http = describeSpan(span('5', '2', 2, 'GET', 0, 0.01, { 'http.request.method': 'GET', 'url.full': 'https://api.test/v1?token=s', 'http.response.status_code': 503 }));
    expect(http).toMatchObject({ op: 'http.client', description: 'GET https://api.test/v1', status: 'unavailable' });
  });

  it('labels connection spans, so they are never taken for repeated queries', () => {
    expect(describeSpan(span('6', '2', 2, 'pg-pool.connect', 0, 0.001, { 'db.system.name': 'postgresql' })).op).toBe('db.connection');
  });

  it('only an incoming request starts a transaction', () => {
    expect(isTransactionRoot(root)).toBe(true);
    expect(isTransactionRoot(handler)).toBe(false);
    expect(isTransactionRoot(span('7', '9', 1, 'GET', 0, 1, {}, false))).toBe(false);
  });

  it('maps HTTP codes to span statuses', () => {
    expect(statusForHttp(200)).toBe('ok');
    expect(statusForHttp(404)).toBe('not_found');
    expect(statusForHttp(500)).toBe('internal_error');
  });

  it('runs on Node 18.19+ and 20.6+ only', () => {
    expect(nodeSupportsTracing('16.20.2')).toBe(false);
    expect(nodeSupportsTracing('18.18.0')).toBe(false);
    expect(nodeSupportsTracing('18.19.0')).toBe(true);
    expect(nodeSupportsTracing('20.5.1')).toBe(false);
    expect(nodeSupportsTracing('20.6.0')).toBe(true);
    expect(nodeSupportsTracing('24.0.0')).toBe(true);
  });
});
