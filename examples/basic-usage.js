/* eslint-disable no-unused-vars, no-undef */
// ===== examples/basic-usage.js =====
const AbrovaTrace = require('@abrova-trace/nodejs-sdk');

// Initialize AbrovaTrace
AbrovaTrace.init({
  apiKey: 'ab_live_your_api_key_here',
  serverSecret: 'ab_srv_your_secret_here',
  environment: 'production',
  release: '1.2.3',
  debug: true
});

// Basic error capturing
try {
  throw new Error('Something went wrong!');
} catch (error) {
  AbrovaTrace.captureException(error, {
    extra: {
      userId: 123,
      feature: 'payment-processing'
    }
  });
}

// Capture messages
AbrovaTrace.captureMessage('User login successful', {
  extra: {
    userId: 123,
    loginMethod: 'oauth'
  }
});

// Add breadcrumbs
AbrovaTrace.addBreadcrumb({
  message: 'User started checkout',
  category: 'user-action',
  level: 'info',
  data: { cartTotal: 99.99, items: 3 }
});

// ===== examples/express-integration.js =====
const express = require('express');
const AbrovaTrace2 = require('@abrova-trace/nodejs-sdk');

const app = express();

// Initialize AbrovaTrace
AbrovaTrace2.init({
  apiKey: 'ab_live_your_api_key_here',
  environment: process.env.NODE_ENV,
  release: process.env.npm_package_version
});

// Use AbrovaTrace middleware
const middleware = AbrovaTrace2.expressMiddleware();
app.use(middleware.requestHandler());

// Your routes
app.get('/api/users/:id', async (req, res) => {
  try {
    AbrovaTrace2.addBreadcrumb({
      message: 'Fetching user data',
      category: 'database',
      data: { userId: req.params.id }
    });

    const user = await getUserById(req.params.id);
    res.json(user);
  } catch (error) {
    AbrovaTrace2.captureException(error, {
      extra: {
        userId: req.params.id,
        endpoint: '/api/users/:id'
      }
    });

    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Error handling middleware (should be last)
app.use(middleware.errorHandler());

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

// ===== examples/database-example.js =====
const AbrovaTrace3 = require('@abrova-trace/nodejs-sdk');
const mysql = require('mysql2/promise');

AbrovaTrace3.init({
  apiKey: 'ab_live_your_api_key_here',
  environment: 'production'
});

class DatabaseManager {
  async connect() {
    try {
      AbrovaTrace3.addBreadcrumb({
        message: 'Connecting to database',
        category: 'database'
      });

      this.connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'myapp'
      });

      AbrovaTrace3.addBreadcrumb({
        message: 'Database connected successfully',
        category: 'database',
        level: 'info'
      });

    } catch (error) {
      AbrovaTrace3.captureException(error, {
        extra: { operation: 'database_connect' }
      });
      throw error;
    }
  }

  async query(sql, params = []) {
    const startTime = Date.now();

    try {
      AbrovaTrace3.addBreadcrumb({
        message: 'Executing database query',
        category: 'database',
        data: { sql: sql.substring(0, 100) + '...' }
      });

      const [results] = await this.connection.execute(sql, params);

      const duration = Date.now() - startTime;
      AbrovaTrace3.addBreadcrumb({
        message: 'Query completed successfully',
        category: 'database',
        data: { duration_ms: duration, rows_affected: results.length }
      });

      return results;

    } catch (error) {
      AbrovaTrace3.captureException(error, {
        extra: {
          operation: 'database_query',
          sql: sql,
          params: params,
          duration_ms: Date.now() - startTime
        }
      });
      throw error;
    }
  }
}

// ===== examples/microservice-example.js =====
const AbrovaTrace4 = require('@abrova-trace/nodejs-sdk');
const axios = require('axios');

AbrovaTrace4.init({
  apiKey: 'ab_live_your_api_key_here',
  environment: 'production'
});

class PaymentService {
  static async processPayment(orderId, amount) {
    return AbrovaTrace4.withScope((scope) => {
      scope.setExtra('service', 'payment-service');
      scope.setExtra('operation', 'process_payment');
      scope.setExtra('orderId', orderId);
      scope.setExtra('amount', amount);

      return this._processPaymentInternal(orderId, amount);
    });
  }

  static async _processPaymentInternal(orderId, amount) {
    try {
      AbrovaTrace4.addBreadcrumb({
        message: 'Processing payment',
        category: 'payment',
        data: { orderId, amount }
      });

      const response = await axios.post('https://payment-api.com/charge', {
        amount,
        orderId
      });

      AbrovaTrace4.addBreadcrumb({
        message: 'Payment processed successfully',
        category: 'payment',
        level: 'info',
        data: { transactionId: response.data.id }
      });

      return response.data;

    } catch (error) {
      AbrovaTrace4.captureException(error, {
        extra: {
          orderId,
          amount,
          external_api: 'payment-api.com'
        }
      });
      throw error;
    }
  }
}

// ===== examples/performance-example.js =====
const AbrovaTrace5 = require('@abrova-trace/nodejs-sdk');
const { PerformanceSpan } = require('@abrova-trace/nodejs-sdk');

AbrovaTrace5.init({
  apiKey: 'ab_live_your_api_key_here',
  serverSecret: 'ab_srv_your_secret_here',
  environment: 'production',
  release: '2.0.0',
  sampleRate: 1.0, // Capture 100% of events
  debug: true
});

// --- HTTP request span ---
const httpSpan = PerformanceSpan.fromHttpRequest({
  method: 'GET',
  url: 'https://api.example.com/users',
  statusCode: 200,
  durationMs: 145,
  startTime: new Date(),
  environment: 'production',
  releaseVersion: '2.0.0',
  tags: { service: 'user-service' }
});
AbrovaTrace5.reportPerformanceSpan(httpSpan);

// --- Database query span ---
const dbSpan = PerformanceSpan.forDbQuery({
  queryType: 'SELECT',
  tableName: 'users',
  durationMs: 32,
  startTime: new Date(),
  rowsAffected: 15,
  environment: 'production',
  releaseVersion: '2.0.0'
});
AbrovaTrace5.reportPerformanceSpan(dbSpan);

// --- Custom span ---
const customSpan = PerformanceSpan.custom({
  operation: 'image-resize',
  durationMs: 520,
  startTime: new Date(),
  tags: { format: 'webp', width: '800' }
});
AbrovaTrace5.reportPerformanceSpan(customSpan);

// --- Track an async operation automatically ---
async function fetchUsers() {
  const result = await AbrovaTrace5.trackOperation(
    'fetch-all-users',
    async () => {
      // Simulate async work
      await new Promise(r => setTimeout(r, 100));
      return [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
    },
    { operationType: 'db', tags: { table: 'users' } }
  );
  console.log('Fetched users:', result);
}
fetchUsers();

// --- Batch reporting ---
const spans = [
  PerformanceSpan.fromHttpRequest({
    method: 'POST', url: '/api/orders', statusCode: 201,
    durationMs: 89, startTime: new Date()
  }),
  PerformanceSpan.forDbQuery({
    queryType: 'INSERT', tableName: 'orders',
    durationMs: 12, startTime: new Date(), rowsAffected: 1
  }),
];
AbrovaTrace5.reportPerformanceSpanBatch(spans);

// Flush performance data before shutdown
// await AbrovaTrace5.flushPerformance();

// ===== examples/logging-example.js =====
const AbrovaTrace6 = require('@abrova-trace/nodejs-sdk');

AbrovaTrace6.init({
  apiKey: 'ab_live_your_api_key_here',
  serverSecret: 'ab_srv_your_secret_here',
  environment: 'production',
  debug: true
});

// Enable logging with a source identifier
AbrovaTrace6.enableLogging({
  sourceId: 'order-service',
  sourceName: 'Order Service',
  batchSize: 50,
  flushIntervalMs: 5000,
});

// Log at all levels
AbrovaTrace6.trace('Entering processOrder function', { orderId: '12345' });
AbrovaTrace6.logDebug('Order validation started', { orderId: '12345' });
AbrovaTrace6.info('Order processed successfully', { orderId: '12345', total: 99.99 });
AbrovaTrace6.warn('Inventory low for item', { itemId: 'SKU-001', remaining: 3 });
AbrovaTrace6.logError('Payment gateway timeout', { gateway: 'stripe', timeout: 5000 });
AbrovaTrace6.fatal('Database connection lost', { host: 'db-primary', retries: 3 });

// Check pending logs
console.log('Pending logs:', AbrovaTrace6.pendingLogCount);

// Flush logs before shutdown
// await AbrovaTrace6.flushLogs();

// ===== examples/advanced-usage.js =====
const AbrovaTrace7 = require('@abrova-trace/nodejs-sdk');

// Initialize with advanced options
AbrovaTrace7.init({
  apiKey: 'ab_live_your_api_key_here',
  serverSecret: 'ab_srv_your_secret_here',
  environment: 'production',
  release: '1.0.0',
  sampleRate: 0.5, // Capture 50% of events (useful in high-traffic production)
  debug: false,

  // Custom error filtering
  beforeSend(error) {
    // Filter out certain errors
    if (error.message.includes('ECONNREFUSED')) {
      return null; // Don't send this error
    }

    // Modify error before sending
    error.setExtra('custom_field', 'custom_value');

    return error;
  }
});

// Set user context
AbrovaTrace7.setUser({
  id: 123,
  email: 'user@example.com',
  username: 'john_doe'
});

// Advanced breadcrumb usage
const { Breadcrumb } = require('@abrova-trace/nodejs-sdk');

// Create custom breadcrumbs
AbrovaTrace7.addBreadcrumb(
  Breadcrumb.http('POST', '/api/login', 200, 150)
);

AbrovaTrace7.addBreadcrumb(
  Breadcrumb.database('SELECT * FROM users WHERE id = ?', 25)
);

AbrovaTrace7.addBreadcrumb(
  Breadcrumb.user('clicked_checkout_button', {
    cart_total: 99.99,
    items_count: 3
  })
);

// Scoped error tracking
AbrovaTrace7.withScope((scope) => {
  scope.setUser({ id: 456, email: 'other@example.com' });
  scope.setExtra('operation', 'bulk_import');

  try {
    // Some operation that might fail
    throw new Error('Bulk import failed');
  } catch (error) {
    AbrovaTrace7.captureException(error);
  }
  // User context is restored after this block
});

// Get SDK stats
console.log('AbrovaTrace Stats:', AbrovaTrace7.getStats());

// Graceful shutdown (flush errors, performance spans, and logs)
process.on('SIGTERM', async () => {
  console.log('Shutting down gracefully...');
  await AbrovaTrace7.flush(2000);       // Flush pending errors
  await AbrovaTrace7.flushPerformance(); // Flush pending performance spans
  await AbrovaTrace7.flushLogs();        // Flush pending logs
  await AbrovaTrace7.close();            // Cleanup all resources
  process.exit(0);
});
