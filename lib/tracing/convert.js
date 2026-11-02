'use strict';

/**
 * OpenTelemetry spans → the transaction Abrova Trace stores, in the shape
 * developers know from Sentry: one transaction per incoming request (the
 * local root span), its spans inside it, Sentry's `op` names.
 *
 * Pure: takes finished spans (OpenTelemetry ReadableSpan objects, or plain
 * objects with the same fields) and returns plain JSON. Never sends a query's
 * values: SQL is sent as the driver's text with its placeholders, Redis as the
 * command and its key, URLs without their query string.
 */

const SQL_SYSTEMS = new Set(['postgresql', 'mysql', 'mariadb', 'mssql', 'sqlite', 'oracle', 'cockroachdb', 'db2']);
const MAX_SPANS = 1000;

const seconds = (hr) => (Array.isArray(hr) ? hr[0] + hr[1] / 1e9 : Number(hr) || 0);
const attr = (span, ...keys) => {
  for (const k of keys) {
    const v = span.attributes && span.attributes[k];
    if (v !== undefined && v !== null && v !== '') return v;
  }
  return undefined;
};
const parentId = (span) => (span.parentSpanContext && span.parentSpanContext.spanId) || span.parentSpanId || null;
const ids = (span) => (typeof span.spanContext === 'function' ? span.spanContext() : span);
const stripQuery = (url) => String(url).split('?')[0];

/** Sentry's span status for an HTTP status code. */
function statusForHttp(code) {
  if (!code || code < 400) return 'ok';
  const known = { 401: 'unauthenticated', 403: 'permission_denied', 404: 'not_found', 409: 'already_exists', 429: 'resource_exhausted', 499: 'cancelled', 501: 'unimplemented', 503: 'unavailable', 504: 'deadline_exceeded' };
  if (known[code]) return known[code];
  return code < 500 ? 'invalid_argument' : 'internal_error';
}

/** The `op`, description and data of one child span. */
function describe(span) {
  const system = attr(span, 'db.system.name', 'db.system');
  if (system) {
    const data = { 'db.system': String(system) };
    const name = attr(span, 'db.namespace', 'db.name');
    if (name) data['db.name'] = String(name);
    if (system === 'redis') {
      const statement = String(attr(span, 'db.query.text', 'db.statement') || span.name || '');
      const [command, key] = statement.split(/\s+/);
      return { op: 'db.redis', description: [command && command.toUpperCase(), key].filter(Boolean).join(' ').slice(0, 200), data };
    }
    if (system === 'mongodb') {
      const collection = attr(span, 'db.collection.name', 'db.mongodb.collection');
      const operation = attr(span, 'db.operation.name', 'db.operation');
      return { op: 'db.mongodb', description: [operation, collection].filter(Boolean).join(' ') || span.name, data };
    }
    const text = attr(span, 'db.query.text', 'db.statement');
    // Connection and pool spans have no query: they are not queries.
    if (!text) return { op: 'db.connection', description: span.name, data };
    return { op: SQL_SYSTEMS.has(String(system)) ? 'db.sql.query' : `db.${system}`, description: String(text), data };
  }
  if (span.kind === 2) {
    const method = attr(span, 'http.request.method', 'http.method') || 'GET';
    const url = attr(span, 'url.full', 'http.url');
    const code = attr(span, 'http.response.status_code', 'http.status_code');
    const host = attr(span, 'server.address', 'net.peer.name');
    const data = { 'http.request.method': String(method) };
    if (code) data['http.response.status_code'] = Number(code);
    if (host) data['server.address'] = String(host);
    return { op: 'http.client', description: url ? `${method} ${stripQuery(url)}` : span.name, data, status: statusForHttp(Number(code)) };
  }
  const expressType = attr(span, 'express.type');
  if (expressType) {
    const op = expressType === 'request_handler' ? 'http.route' : expressType === 'router' ? 'http.router' : 'middleware.handle';
    return { op, description: attr(span, 'express.name') || span.name, data: {} };
  }
  if (attr(span, 'nestjs.type')) {
    return { op: attr(span, 'nestjs.type') === 'handler' ? 'http.route' : 'middleware.handle', description: span.name, data: {} };
  }
  return { op: 'function', description: span.name, data: {} };
}

/** True for the span that starts a transaction here: an incoming request. */
function isTransactionRoot(span) {
  return span.kind === 1 && (!parentId(span) || (span.parentSpanContext && span.parentSpanContext.isRemote));
}

/**
 * One transaction from its root span and every finished span of the same trace.
 * Spans that do not descend from the root are left out.
 * @returns {object|null}
 */
function toTransaction(root, spans, context = {}) {
  const rootIds = ids(root);
  const method = attr(root, 'http.request.method', 'http.method') || 'GET';
  const route = attr(root, 'http.route');
  const target = attr(root, 'url.path', 'http.target');
  const code = Number(attr(root, 'http.response.status_code', 'http.status_code')) || 0;

  const children = new Map();
  for (const s of spans) {
    const p = parentId(s);
    if (!p || ids(s).spanId === rootIds.spanId) continue;
    if (!children.has(p)) children.set(p, []);
    children.get(p).push(s);
  }
  // A span whose parent was not recorded (ended too late, or not sampled) belongs to the request itself.
  const known = new Set(spans.map((s) => ids(s).spanId));
  for (const s of spans) {
    const p = parentId(s);
    const id = ids(s).spanId;
    if (id === rootIds.spanId || !p || known.has(p) || ids(s).traceId !== rootIds.traceId) continue;
    if (!children.has(rootIds.spanId)) children.set(rootIds.spanId, []);
    children.get(rootIds.spanId).push(s);
    const list = children.get(p);
    if (list) children.set(p, list.filter((x) => x !== s));
  }
  const kept = [];
  const walk = (id) => {
    for (const s of children.get(id) || []) {
      if (kept.length >= MAX_SPANS) return;
      kept.push(s);
      walk(ids(s).spanId);
    }
  };
  walk(rootIds.spanId);

  const out = kept.map((s) => {
    const d = describe(s);
    const span = {
      span_id: ids(s).spanId,
      parent_span_id: known.has(parentId(s)) ? parentId(s) : rootIds.spanId,
      op: d.op,
      start_timestamp: seconds(s.startTime),
      timestamp: seconds(s.endTime),
    };
    if (d.description) span.description = String(d.description).slice(0, 2000);
    const status = d.status || (s.status && s.status.code === 2 ? 'internal_error' : 'ok');
    if (status !== 'ok') span.status = status;
    if (Object.keys(d.data).length) span.data = d.data;
    return span;
  });

  const name = route ? `${method} ${route}` : `${method} ${stripQuery(target || root.name || '/')}`;
  const parent = root.parentSpanContext && root.parentSpanContext.isRemote ? root.parentSpanContext.spanId : undefined;
  return {
    type: 'transaction',
    transaction: name.slice(0, 255),
    transaction_info: { source: route ? 'route' : 'url' },
    start_timestamp: seconds(root.startTime),
    timestamp: seconds(root.endTime),
    contexts: {
      trace: {
        trace_id: rootIds.traceId,
        span_id: rootIds.spanId,
        ...(parent ? { parent_span_id: parent } : {}),
        op: 'http.server',
        status: code ? statusForHttp(code) : root.status && root.status.code === 2 ? 'internal_error' : 'ok',
        data: { 'http.request.method': String(method), ...(code ? { 'http.response.status_code': code } : {}) },
      },
    },
    spans: out,
    ...context,
  };
}

module.exports = { describe, isTransactionRoot, statusForHttp, toTransaction };
