"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@opentelemetry/api/build/esm/version.js
var VERSION;
var init_version = __esm({
  "node_modules/@opentelemetry/api/build/esm/version.js"() {
    VERSION = "1.9.1";
  }
});

// node_modules/@opentelemetry/api/build/esm/internal/semver.js
function _makeCompatibilityCheck(ownVersion) {
  const acceptedVersions = /* @__PURE__ */ new Set([ownVersion]);
  const rejectedVersions = /* @__PURE__ */ new Set();
  const myVersionMatch = ownVersion.match(re);
  if (!myVersionMatch) {
    return () => false;
  }
  const ownVersionParsed = {
    major: +myVersionMatch[1],
    minor: +myVersionMatch[2],
    patch: +myVersionMatch[3],
    prerelease: myVersionMatch[4]
  };
  if (ownVersionParsed.prerelease != null) {
    return function isExactmatch(globalVersion) {
      return globalVersion === ownVersion;
    };
  }
  function _reject(v) {
    rejectedVersions.add(v);
    return false;
  }
  function _accept(v) {
    acceptedVersions.add(v);
    return true;
  }
  return function isCompatible2(globalVersion) {
    if (acceptedVersions.has(globalVersion)) {
      return true;
    }
    if (rejectedVersions.has(globalVersion)) {
      return false;
    }
    const globalVersionMatch = globalVersion.match(re);
    if (!globalVersionMatch) {
      return _reject(globalVersion);
    }
    const globalVersionParsed = {
      major: +globalVersionMatch[1],
      minor: +globalVersionMatch[2],
      patch: +globalVersionMatch[3],
      prerelease: globalVersionMatch[4]
    };
    if (globalVersionParsed.prerelease != null) {
      return _reject(globalVersion);
    }
    if (ownVersionParsed.major !== globalVersionParsed.major) {
      return _reject(globalVersion);
    }
    if (ownVersionParsed.major === 0) {
      if (ownVersionParsed.minor === globalVersionParsed.minor && ownVersionParsed.patch <= globalVersionParsed.patch) {
        return _accept(globalVersion);
      }
      return _reject(globalVersion);
    }
    if (ownVersionParsed.minor <= globalVersionParsed.minor) {
      return _accept(globalVersion);
    }
    return _reject(globalVersion);
  };
}
var re, isCompatible;
var init_semver = __esm({
  "node_modules/@opentelemetry/api/build/esm/internal/semver.js"() {
    init_version();
    re = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
    isCompatible = _makeCompatibilityCheck(VERSION);
  }
});

// node_modules/@opentelemetry/api/build/esm/internal/global-utils.js
function registerGlobal(type, instance, diag3, allowOverride = false) {
  var _a;
  const api = _global[GLOBAL_OPENTELEMETRY_API_KEY] = (_a = _global[GLOBAL_OPENTELEMETRY_API_KEY]) !== null && _a !== void 0 ? _a : {
    version: VERSION
  };
  if (!allowOverride && api[type]) {
    const err = new Error(`@opentelemetry/api: Attempted duplicate registration of API: ${type}`);
    diag3.error(err.stack || err.message);
    return false;
  }
  if (api.version !== VERSION) {
    const err = new Error(`@opentelemetry/api: Registration of version v${api.version} for ${type} does not match previously registered API v${VERSION}`);
    diag3.error(err.stack || err.message);
    return false;
  }
  api[type] = instance;
  diag3.debug(`@opentelemetry/api: Registered a global for ${type} v${VERSION}.`);
  return true;
}
function getGlobal(type) {
  var _a, _b;
  const globalVersion = (_a = _global[GLOBAL_OPENTELEMETRY_API_KEY]) === null || _a === void 0 ? void 0 : _a.version;
  if (!globalVersion || !isCompatible(globalVersion)) {
    return;
  }
  return (_b = _global[GLOBAL_OPENTELEMETRY_API_KEY]) === null || _b === void 0 ? void 0 : _b[type];
}
function unregisterGlobal(type, diag3) {
  diag3.debug(`@opentelemetry/api: Unregistering a global for ${type} v${VERSION}.`);
  const api = _global[GLOBAL_OPENTELEMETRY_API_KEY];
  if (api) {
    delete api[type];
  }
}
var major, GLOBAL_OPENTELEMETRY_API_KEY, _global;
var init_global_utils = __esm({
  "node_modules/@opentelemetry/api/build/esm/internal/global-utils.js"() {
    init_version();
    init_semver();
    major = VERSION.split(".")[0];
    GLOBAL_OPENTELEMETRY_API_KEY = /* @__PURE__ */ Symbol.for(`opentelemetry.js.api.${major}`);
    _global = typeof globalThis === "object" ? globalThis : typeof self === "object" ? self : typeof window === "object" ? window : typeof global === "object" ? global : {};
  }
});

// node_modules/@opentelemetry/api/build/esm/diag/ComponentLogger.js
function logProxy(funcName, namespace, args) {
  const logger = getGlobal("diag");
  if (!logger) {
    return;
  }
  return logger[funcName](namespace, ...args);
}
var DiagComponentLogger;
var init_ComponentLogger = __esm({
  "node_modules/@opentelemetry/api/build/esm/diag/ComponentLogger.js"() {
    init_global_utils();
    DiagComponentLogger = class {
      constructor(props) {
        this._namespace = props.namespace || "DiagComponentLogger";
      }
      debug(...args) {
        return logProxy("debug", this._namespace, args);
      }
      error(...args) {
        return logProxy("error", this._namespace, args);
      }
      info(...args) {
        return logProxy("info", this._namespace, args);
      }
      warn(...args) {
        return logProxy("warn", this._namespace, args);
      }
      verbose(...args) {
        return logProxy("verbose", this._namespace, args);
      }
    };
  }
});

// node_modules/@opentelemetry/api/build/esm/diag/types.js
var DiagLogLevel;
var init_types = __esm({
  "node_modules/@opentelemetry/api/build/esm/diag/types.js"() {
    (function(DiagLogLevel2) {
      DiagLogLevel2[DiagLogLevel2["NONE"] = 0] = "NONE";
      DiagLogLevel2[DiagLogLevel2["ERROR"] = 30] = "ERROR";
      DiagLogLevel2[DiagLogLevel2["WARN"] = 50] = "WARN";
      DiagLogLevel2[DiagLogLevel2["INFO"] = 60] = "INFO";
      DiagLogLevel2[DiagLogLevel2["DEBUG"] = 70] = "DEBUG";
      DiagLogLevel2[DiagLogLevel2["VERBOSE"] = 80] = "VERBOSE";
      DiagLogLevel2[DiagLogLevel2["ALL"] = 9999] = "ALL";
    })(DiagLogLevel || (DiagLogLevel = {}));
  }
});

// node_modules/@opentelemetry/api/build/esm/diag/internal/logLevelLogger.js
function createLogLevelDiagLogger(maxLevel, logger) {
  if (maxLevel < DiagLogLevel.NONE) {
    maxLevel = DiagLogLevel.NONE;
  } else if (maxLevel > DiagLogLevel.ALL) {
    maxLevel = DiagLogLevel.ALL;
  }
  logger = logger || {};
  function _filterFunc(funcName, theLevel) {
    const theFunc = logger[funcName];
    if (typeof theFunc === "function" && maxLevel >= theLevel) {
      return theFunc.bind(logger);
    }
    return function() {
    };
  }
  return {
    error: _filterFunc("error", DiagLogLevel.ERROR),
    warn: _filterFunc("warn", DiagLogLevel.WARN),
    info: _filterFunc("info", DiagLogLevel.INFO),
    debug: _filterFunc("debug", DiagLogLevel.DEBUG),
    verbose: _filterFunc("verbose", DiagLogLevel.VERBOSE)
  };
}
var init_logLevelLogger = __esm({
  "node_modules/@opentelemetry/api/build/esm/diag/internal/logLevelLogger.js"() {
    init_types();
  }
});

// node_modules/@opentelemetry/api/build/esm/api/diag.js
var API_NAME, DiagAPI;
var init_diag = __esm({
  "node_modules/@opentelemetry/api/build/esm/api/diag.js"() {
    init_ComponentLogger();
    init_logLevelLogger();
    init_types();
    init_global_utils();
    API_NAME = "diag";
    DiagAPI = class _DiagAPI {
      /** Get the singleton instance of the DiagAPI API */
      static instance() {
        if (!this._instance) {
          this._instance = new _DiagAPI();
        }
        return this._instance;
      }
      /**
       * Private internal constructor
       * @private
       */
      constructor() {
        function _logProxy(funcName) {
          return function(...args) {
            const logger = getGlobal("diag");
            if (!logger)
              return;
            return logger[funcName](...args);
          };
        }
        const self2 = this;
        const setLogger = (logger, optionsOrLogLevel = { logLevel: DiagLogLevel.INFO }) => {
          var _a, _b, _c;
          if (logger === self2) {
            const err = new Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
            self2.error((_a = err.stack) !== null && _a !== void 0 ? _a : err.message);
            return false;
          }
          if (typeof optionsOrLogLevel === "number") {
            optionsOrLogLevel = {
              logLevel: optionsOrLogLevel
            };
          }
          const oldLogger = getGlobal("diag");
          const newLogger = createLogLevelDiagLogger((_b = optionsOrLogLevel.logLevel) !== null && _b !== void 0 ? _b : DiagLogLevel.INFO, logger);
          if (oldLogger && !optionsOrLogLevel.suppressOverrideMessage) {
            const stack = (_c = new Error().stack) !== null && _c !== void 0 ? _c : "<failed to generate stacktrace>";
            oldLogger.warn(`Current logger will be overwritten from ${stack}`);
            newLogger.warn(`Current logger will overwrite one already registered from ${stack}`);
          }
          return registerGlobal("diag", newLogger, self2, true);
        };
        self2.setLogger = setLogger;
        self2.disable = () => {
          unregisterGlobal(API_NAME, self2);
        };
        self2.createComponentLogger = (options) => {
          return new DiagComponentLogger(options);
        };
        self2.verbose = _logProxy("verbose");
        self2.debug = _logProxy("debug");
        self2.info = _logProxy("info");
        self2.warn = _logProxy("warn");
        self2.error = _logProxy("error");
      }
    };
  }
});

// node_modules/@opentelemetry/api/build/esm/baggage/internal/baggage-impl.js
var BaggageImpl;
var init_baggage_impl = __esm({
  "node_modules/@opentelemetry/api/build/esm/baggage/internal/baggage-impl.js"() {
    BaggageImpl = class _BaggageImpl {
      constructor(entries) {
        this._entries = entries ? new Map(entries) : /* @__PURE__ */ new Map();
      }
      getEntry(key) {
        const entry = this._entries.get(key);
        if (!entry) {
          return void 0;
        }
        return Object.assign({}, entry);
      }
      getAllEntries() {
        return Array.from(this._entries.entries());
      }
      setEntry(key, entry) {
        const newBaggage = new _BaggageImpl(this._entries);
        newBaggage._entries.set(key, entry);
        return newBaggage;
      }
      removeEntry(key) {
        const newBaggage = new _BaggageImpl(this._entries);
        newBaggage._entries.delete(key);
        return newBaggage;
      }
      removeEntries(...keys) {
        const newBaggage = new _BaggageImpl(this._entries);
        for (const key of keys) {
          newBaggage._entries.delete(key);
        }
        return newBaggage;
      }
      clear() {
        return new _BaggageImpl();
      }
    };
  }
});

// node_modules/@opentelemetry/api/build/esm/baggage/internal/symbol.js
var baggageEntryMetadataSymbol;
var init_symbol = __esm({
  "node_modules/@opentelemetry/api/build/esm/baggage/internal/symbol.js"() {
    baggageEntryMetadataSymbol = /* @__PURE__ */ Symbol("BaggageEntryMetadata");
  }
});

// node_modules/@opentelemetry/api/build/esm/baggage/utils.js
function createBaggage(entries = {}) {
  return new BaggageImpl(new Map(Object.entries(entries)));
}
function baggageEntryMetadataFromString(str) {
  if (typeof str !== "string") {
    diag.error(`Cannot create baggage metadata from unknown type: ${typeof str}`);
    str = "";
  }
  return {
    __TYPE__: baggageEntryMetadataSymbol,
    toString() {
      return str;
    }
  };
}
var diag;
var init_utils = __esm({
  "node_modules/@opentelemetry/api/build/esm/baggage/utils.js"() {
    init_diag();
    init_baggage_impl();
    init_symbol();
    diag = DiagAPI.instance();
  }
});

// node_modules/@opentelemetry/api/build/esm/context/context.js
function createContextKey(description) {
  return Symbol.for(description);
}
var BaseContext, ROOT_CONTEXT;
var init_context = __esm({
  "node_modules/@opentelemetry/api/build/esm/context/context.js"() {
    BaseContext = class _BaseContext {
      /**
       * Construct a new context which inherits values from an optional parent context.
       *
       * @param parentContext a context from which to inherit values
       */
      constructor(parentContext) {
        const self2 = this;
        self2._currentContext = parentContext ? new Map(parentContext) : /* @__PURE__ */ new Map();
        self2.getValue = (key) => self2._currentContext.get(key);
        self2.setValue = (key, value) => {
          const context2 = new _BaseContext(self2._currentContext);
          context2._currentContext.set(key, value);
          return context2;
        };
        self2.deleteValue = (key) => {
          const context2 = new _BaseContext(self2._currentContext);
          context2._currentContext.delete(key);
          return context2;
        };
      }
    };
    ROOT_CONTEXT = new BaseContext();
  }
});

// node_modules/@opentelemetry/api/build/esm/diag/consoleLogger.js
var consoleMap, _originalConsoleMethods, DiagConsoleLogger;
var init_consoleLogger = __esm({
  "node_modules/@opentelemetry/api/build/esm/diag/consoleLogger.js"() {
    consoleMap = [
      { n: "error", c: "error" },
      { n: "warn", c: "warn" },
      { n: "info", c: "info" },
      { n: "debug", c: "debug" },
      { n: "verbose", c: "trace" }
    ];
    _originalConsoleMethods = {};
    if (typeof console !== "undefined") {
      const keys = [
        "error",
        "warn",
        "info",
        "debug",
        "trace",
        "log"
      ];
      for (const key of keys) {
        if (typeof console[key] === "function") {
          _originalConsoleMethods[key] = console[key];
        }
      }
    }
    DiagConsoleLogger = class {
      constructor() {
        function _consoleFunc(funcName) {
          return function(...args) {
            let theFunc = _originalConsoleMethods[funcName];
            if (typeof theFunc !== "function") {
              theFunc = _originalConsoleMethods["log"];
            }
            if (typeof theFunc !== "function" && console) {
              theFunc = console[funcName];
              if (typeof theFunc !== "function") {
                theFunc = console.log;
              }
            }
            if (typeof theFunc === "function") {
              return theFunc.apply(console, args);
            }
          };
        }
        for (let i = 0; i < consoleMap.length; i++) {
          this[consoleMap[i].n] = _consoleFunc(consoleMap[i].c);
        }
      }
    };
  }
});

// node_modules/@opentelemetry/api/build/esm/metrics/NoopMeter.js
function createNoopMeter() {
  return NOOP_METER;
}
var NoopMeter, NoopMetric, NoopCounterMetric, NoopUpDownCounterMetric, NoopGaugeMetric, NoopHistogramMetric, NoopObservableMetric, NoopObservableCounterMetric, NoopObservableGaugeMetric, NoopObservableUpDownCounterMetric, NOOP_METER, NOOP_COUNTER_METRIC, NOOP_GAUGE_METRIC, NOOP_HISTOGRAM_METRIC, NOOP_UP_DOWN_COUNTER_METRIC, NOOP_OBSERVABLE_COUNTER_METRIC, NOOP_OBSERVABLE_GAUGE_METRIC, NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
var init_NoopMeter = __esm({
  "node_modules/@opentelemetry/api/build/esm/metrics/NoopMeter.js"() {
    NoopMeter = class {
      constructor() {
      }
      /**
       * @see {@link Meter.createGauge}
       */
      createGauge(_name, _options) {
        return NOOP_GAUGE_METRIC;
      }
      /**
       * @see {@link Meter.createHistogram}
       */
      createHistogram(_name, _options) {
        return NOOP_HISTOGRAM_METRIC;
      }
      /**
       * @see {@link Meter.createCounter}
       */
      createCounter(_name, _options) {
        return NOOP_COUNTER_METRIC;
      }
      /**
       * @see {@link Meter.createUpDownCounter}
       */
      createUpDownCounter(_name, _options) {
        return NOOP_UP_DOWN_COUNTER_METRIC;
      }
      /**
       * @see {@link Meter.createObservableGauge}
       */
      createObservableGauge(_name, _options) {
        return NOOP_OBSERVABLE_GAUGE_METRIC;
      }
      /**
       * @see {@link Meter.createObservableCounter}
       */
      createObservableCounter(_name, _options) {
        return NOOP_OBSERVABLE_COUNTER_METRIC;
      }
      /**
       * @see {@link Meter.createObservableUpDownCounter}
       */
      createObservableUpDownCounter(_name, _options) {
        return NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
      }
      /**
       * @see {@link Meter.addBatchObservableCallback}
       */
      addBatchObservableCallback(_callback, _observables) {
      }
      /**
       * @see {@link Meter.removeBatchObservableCallback}
       */
      removeBatchObservableCallback(_callback) {
      }
    };
    NoopMetric = class {
    };
    NoopCounterMetric = class extends NoopMetric {
      add(_value, _attributes) {
      }
    };
    NoopUpDownCounterMetric = class extends NoopMetric {
      add(_value, _attributes) {
      }
    };
    NoopGaugeMetric = class extends NoopMetric {
      record(_value, _attributes) {
      }
    };
    NoopHistogramMetric = class extends NoopMetric {
      record(_value, _attributes) {
      }
    };
    NoopObservableMetric = class {
      addCallback(_callback) {
      }
      removeCallback(_callback) {
      }
    };
    NoopObservableCounterMetric = class extends NoopObservableMetric {
    };
    NoopObservableGaugeMetric = class extends NoopObservableMetric {
    };
    NoopObservableUpDownCounterMetric = class extends NoopObservableMetric {
    };
    NOOP_METER = new NoopMeter();
    NOOP_COUNTER_METRIC = new NoopCounterMetric();
    NOOP_GAUGE_METRIC = new NoopGaugeMetric();
    NOOP_HISTOGRAM_METRIC = new NoopHistogramMetric();
    NOOP_UP_DOWN_COUNTER_METRIC = new NoopUpDownCounterMetric();
    NOOP_OBSERVABLE_COUNTER_METRIC = new NoopObservableCounterMetric();
    NOOP_OBSERVABLE_GAUGE_METRIC = new NoopObservableGaugeMetric();
    NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new NoopObservableUpDownCounterMetric();
  }
});

// node_modules/@opentelemetry/api/build/esm/metrics/Metric.js
var ValueType;
var init_Metric = __esm({
  "node_modules/@opentelemetry/api/build/esm/metrics/Metric.js"() {
    (function(ValueType2) {
      ValueType2[ValueType2["INT"] = 0] = "INT";
      ValueType2[ValueType2["DOUBLE"] = 1] = "DOUBLE";
    })(ValueType || (ValueType = {}));
  }
});

// node_modules/@opentelemetry/api/build/esm/propagation/TextMapPropagator.js
var defaultTextMapGetter, defaultTextMapSetter;
var init_TextMapPropagator = __esm({
  "node_modules/@opentelemetry/api/build/esm/propagation/TextMapPropagator.js"() {
    defaultTextMapGetter = {
      get(carrier, key) {
        if (carrier == null) {
          return void 0;
        }
        return carrier[key];
      },
      keys(carrier) {
        if (carrier == null) {
          return [];
        }
        return Object.keys(carrier);
      }
    };
    defaultTextMapSetter = {
      set(carrier, key, value) {
        if (carrier == null) {
          return;
        }
        carrier[key] = value;
      }
    };
  }
});

// node_modules/@opentelemetry/api/build/esm/context/NoopContextManager.js
var NoopContextManager;
var init_NoopContextManager = __esm({
  "node_modules/@opentelemetry/api/build/esm/context/NoopContextManager.js"() {
    init_context();
    NoopContextManager = class {
      active() {
        return ROOT_CONTEXT;
      }
      with(_context, fn, thisArg, ...args) {
        return fn.call(thisArg, ...args);
      }
      bind(_context, target) {
        return target;
      }
      enable() {
        return this;
      }
      disable() {
        return this;
      }
    };
  }
});

// node_modules/@opentelemetry/api/build/esm/api/context.js
var API_NAME2, NOOP_CONTEXT_MANAGER, ContextAPI;
var init_context2 = __esm({
  "node_modules/@opentelemetry/api/build/esm/api/context.js"() {
    init_NoopContextManager();
    init_global_utils();
    init_diag();
    API_NAME2 = "context";
    NOOP_CONTEXT_MANAGER = new NoopContextManager();
    ContextAPI = class _ContextAPI {
      /** Empty private constructor prevents end users from constructing a new instance of the API */
      constructor() {
      }
      /** Get the singleton instance of the Context API */
      static getInstance() {
        if (!this._instance) {
          this._instance = new _ContextAPI();
        }
        return this._instance;
      }
      /**
       * Set the current context manager.
       *
       * @returns true if the context manager was successfully registered, else false
       */
      setGlobalContextManager(contextManager) {
        return registerGlobal(API_NAME2, contextManager, DiagAPI.instance());
      }
      /**
       * Get the currently active context
       */
      active() {
        return this._getContextManager().active();
      }
      /**
       * Execute a function with an active context
       *
       * @param context context to be active during function execution
       * @param fn function to execute in a context
       * @param thisArg optional receiver to be used for calling fn
       * @param args optional arguments forwarded to fn
       */
      with(context2, fn, thisArg, ...args) {
        return this._getContextManager().with(context2, fn, thisArg, ...args);
      }
      /**
       * Bind a context to a target function or event emitter
       *
       * @param context context to bind to the event emitter or function. Defaults to the currently active context
       * @param target function or event emitter to bind
       */
      bind(context2, target) {
        return this._getContextManager().bind(context2, target);
      }
      _getContextManager() {
        return getGlobal(API_NAME2) || NOOP_CONTEXT_MANAGER;
      }
      /** Disable and remove the global context manager */
      disable() {
        this._getContextManager().disable();
        unregisterGlobal(API_NAME2, DiagAPI.instance());
      }
    };
  }
});

// node_modules/@opentelemetry/api/build/esm/trace/trace_flags.js
var TraceFlags;
var init_trace_flags = __esm({
  "node_modules/@opentelemetry/api/build/esm/trace/trace_flags.js"() {
    (function(TraceFlags2) {
      TraceFlags2[TraceFlags2["NONE"] = 0] = "NONE";
      TraceFlags2[TraceFlags2["SAMPLED"] = 1] = "SAMPLED";
    })(TraceFlags || (TraceFlags = {}));
  }
});

// node_modules/@opentelemetry/api/build/esm/trace/invalid-span-constants.js
var INVALID_SPANID, INVALID_TRACEID, INVALID_SPAN_CONTEXT;
var init_invalid_span_constants = __esm({
  "node_modules/@opentelemetry/api/build/esm/trace/invalid-span-constants.js"() {
    init_trace_flags();
    INVALID_SPANID = "0000000000000000";
    INVALID_TRACEID = "00000000000000000000000000000000";
    INVALID_SPAN_CONTEXT = {
      traceId: INVALID_TRACEID,
      spanId: INVALID_SPANID,
      traceFlags: TraceFlags.NONE
    };
  }
});

// node_modules/@opentelemetry/api/build/esm/trace/NonRecordingSpan.js
var NonRecordingSpan;
var init_NonRecordingSpan = __esm({
  "node_modules/@opentelemetry/api/build/esm/trace/NonRecordingSpan.js"() {
    init_invalid_span_constants();
    NonRecordingSpan = class {
      constructor(spanContext = INVALID_SPAN_CONTEXT) {
        this._spanContext = spanContext;
      }
      // Returns a SpanContext.
      spanContext() {
        return this._spanContext;
      }
      // By default does nothing
      setAttribute(_key, _value) {
        return this;
      }
      // By default does nothing
      setAttributes(_attributes) {
        return this;
      }
      // By default does nothing
      addEvent(_name, _attributes) {
        return this;
      }
      addLink(_link) {
        return this;
      }
      addLinks(_links) {
        return this;
      }
      // By default does nothing
      setStatus(_status) {
        return this;
      }
      // By default does nothing
      updateName(_name) {
        return this;
      }
      // By default does nothing
      end(_endTime) {
      }
      // isRecording always returns false for NonRecordingSpan.
      isRecording() {
        return false;
      }
      // By default does nothing
      recordException(_exception, _time) {
      }
    };
  }
});

// node_modules/@opentelemetry/api/build/esm/trace/context-utils.js
function getSpan(context2) {
  return context2.getValue(SPAN_KEY) || void 0;
}
function getActiveSpan() {
  return getSpan(ContextAPI.getInstance().active());
}
function setSpan(context2, span) {
  return context2.setValue(SPAN_KEY, span);
}
function deleteSpan(context2) {
  return context2.deleteValue(SPAN_KEY);
}
function setSpanContext(context2, spanContext) {
  return setSpan(context2, new NonRecordingSpan(spanContext));
}
function getSpanContext(context2) {
  var _a;
  return (_a = getSpan(context2)) === null || _a === void 0 ? void 0 : _a.spanContext();
}
var SPAN_KEY;
var init_context_utils = __esm({
  "node_modules/@opentelemetry/api/build/esm/trace/context-utils.js"() {
    init_context();
    init_NonRecordingSpan();
    init_context2();
    SPAN_KEY = createContextKey("OpenTelemetry Context Key SPAN");
  }
});

// node_modules/@opentelemetry/api/build/esm/trace/spancontext-utils.js
function isValidHex(id, length) {
  if (typeof id !== "string" || id.length !== length)
    return false;
  let r = 0;
  for (let i = 0; i < id.length; i += 4) {
    r += (isHex[id.charCodeAt(i)] | 0) + (isHex[id.charCodeAt(i + 1)] | 0) + (isHex[id.charCodeAt(i + 2)] | 0) + (isHex[id.charCodeAt(i + 3)] | 0);
  }
  return r === length;
}
function isValidTraceId(traceId) {
  return isValidHex(traceId, 32) && traceId !== INVALID_TRACEID;
}
function isValidSpanId(spanId) {
  return isValidHex(spanId, 16) && spanId !== INVALID_SPANID;
}
function isSpanContextValid(spanContext) {
  return isValidTraceId(spanContext.traceId) && isValidSpanId(spanContext.spanId);
}
function wrapSpanContext(spanContext) {
  return new NonRecordingSpan(spanContext);
}
var isHex;
var init_spancontext_utils = __esm({
  "node_modules/@opentelemetry/api/build/esm/trace/spancontext-utils.js"() {
    init_invalid_span_constants();
    init_NonRecordingSpan();
    isHex = new Uint8Array([
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1
    ]);
  }
});

// node_modules/@opentelemetry/api/build/esm/trace/NoopTracer.js
function isSpanContext(spanContext) {
  return spanContext !== null && typeof spanContext === "object" && "spanId" in spanContext && typeof spanContext["spanId"] === "string" && "traceId" in spanContext && typeof spanContext["traceId"] === "string" && "traceFlags" in spanContext && typeof spanContext["traceFlags"] === "number";
}
var contextApi, NoopTracer;
var init_NoopTracer = __esm({
  "node_modules/@opentelemetry/api/build/esm/trace/NoopTracer.js"() {
    init_context2();
    init_context_utils();
    init_NonRecordingSpan();
    init_spancontext_utils();
    contextApi = ContextAPI.getInstance();
    NoopTracer = class {
      // startSpan starts a noop span.
      startSpan(name, options, context2 = contextApi.active()) {
        const root = Boolean(options === null || options === void 0 ? void 0 : options.root);
        if (root) {
          return new NonRecordingSpan();
        }
        const parentFromContext = context2 && getSpanContext(context2);
        if (isSpanContext(parentFromContext) && isSpanContextValid(parentFromContext)) {
          return new NonRecordingSpan(parentFromContext);
        } else {
          return new NonRecordingSpan();
        }
      }
      startActiveSpan(name, arg2, arg3, arg4) {
        let opts;
        let ctx;
        let fn;
        if (arguments.length < 2) {
          return;
        } else if (arguments.length === 2) {
          fn = arg2;
        } else if (arguments.length === 3) {
          opts = arg2;
          fn = arg3;
        } else {
          opts = arg2;
          ctx = arg3;
          fn = arg4;
        }
        const parentContext = ctx !== null && ctx !== void 0 ? ctx : contextApi.active();
        const span = this.startSpan(name, opts, parentContext);
        const contextWithSpanSet = setSpan(parentContext, span);
        return contextApi.with(contextWithSpanSet, fn, void 0, span);
      }
    };
  }
});

// node_modules/@opentelemetry/api/build/esm/trace/ProxyTracer.js
var NOOP_TRACER, ProxyTracer;
var init_ProxyTracer = __esm({
  "node_modules/@opentelemetry/api/build/esm/trace/ProxyTracer.js"() {
    init_NoopTracer();
    NOOP_TRACER = new NoopTracer();
    ProxyTracer = class {
      constructor(provider, name, version, options) {
        this._provider = provider;
        this.name = name;
        this.version = version;
        this.options = options;
      }
      startSpan(name, options, context2) {
        return this._getTracer().startSpan(name, options, context2);
      }
      startActiveSpan(_name, _options, _context, _fn) {
        const tracer = this._getTracer();
        return Reflect.apply(tracer.startActiveSpan, tracer, arguments);
      }
      /**
       * Try to get a tracer from the proxy tracer provider.
       * If the proxy tracer provider has no delegate, return a noop tracer.
       */
      _getTracer() {
        if (this._delegate) {
          return this._delegate;
        }
        const tracer = this._provider.getDelegateTracer(this.name, this.version, this.options);
        if (!tracer) {
          return NOOP_TRACER;
        }
        this._delegate = tracer;
        return this._delegate;
      }
    };
  }
});

// node_modules/@opentelemetry/api/build/esm/trace/NoopTracerProvider.js
var NoopTracerProvider;
var init_NoopTracerProvider = __esm({
  "node_modules/@opentelemetry/api/build/esm/trace/NoopTracerProvider.js"() {
    init_NoopTracer();
    NoopTracerProvider = class {
      getTracer(_name, _version, _options) {
        return new NoopTracer();
      }
    };
  }
});

// node_modules/@opentelemetry/api/build/esm/trace/ProxyTracerProvider.js
var NOOP_TRACER_PROVIDER, ProxyTracerProvider;
var init_ProxyTracerProvider = __esm({
  "node_modules/@opentelemetry/api/build/esm/trace/ProxyTracerProvider.js"() {
    init_ProxyTracer();
    init_NoopTracerProvider();
    NOOP_TRACER_PROVIDER = new NoopTracerProvider();
    ProxyTracerProvider = class {
      /**
       * Get a {@link ProxyTracer}
       */
      getTracer(name, version, options) {
        var _a;
        return (_a = this.getDelegateTracer(name, version, options)) !== null && _a !== void 0 ? _a : new ProxyTracer(this, name, version, options);
      }
      getDelegate() {
        var _a;
        return (_a = this._delegate) !== null && _a !== void 0 ? _a : NOOP_TRACER_PROVIDER;
      }
      /**
       * Set the delegate tracer provider
       */
      setDelegate(delegate) {
        this._delegate = delegate;
      }
      getDelegateTracer(name, version, options) {
        var _a;
        return (_a = this._delegate) === null || _a === void 0 ? void 0 : _a.getTracer(name, version, options);
      }
    };
  }
});

// node_modules/@opentelemetry/api/build/esm/trace/SamplingResult.js
var SamplingDecision;
var init_SamplingResult = __esm({
  "node_modules/@opentelemetry/api/build/esm/trace/SamplingResult.js"() {
    (function(SamplingDecision2) {
      SamplingDecision2[SamplingDecision2["NOT_RECORD"] = 0] = "NOT_RECORD";
      SamplingDecision2[SamplingDecision2["RECORD"] = 1] = "RECORD";
      SamplingDecision2[SamplingDecision2["RECORD_AND_SAMPLED"] = 2] = "RECORD_AND_SAMPLED";
    })(SamplingDecision || (SamplingDecision = {}));
  }
});

// node_modules/@opentelemetry/api/build/esm/trace/span_kind.js
var SpanKind;
var init_span_kind = __esm({
  "node_modules/@opentelemetry/api/build/esm/trace/span_kind.js"() {
    (function(SpanKind2) {
      SpanKind2[SpanKind2["INTERNAL"] = 0] = "INTERNAL";
      SpanKind2[SpanKind2["SERVER"] = 1] = "SERVER";
      SpanKind2[SpanKind2["CLIENT"] = 2] = "CLIENT";
      SpanKind2[SpanKind2["PRODUCER"] = 3] = "PRODUCER";
      SpanKind2[SpanKind2["CONSUMER"] = 4] = "CONSUMER";
    })(SpanKind || (SpanKind = {}));
  }
});

// node_modules/@opentelemetry/api/build/esm/trace/status.js
var SpanStatusCode;
var init_status = __esm({
  "node_modules/@opentelemetry/api/build/esm/trace/status.js"() {
    (function(SpanStatusCode2) {
      SpanStatusCode2[SpanStatusCode2["UNSET"] = 0] = "UNSET";
      SpanStatusCode2[SpanStatusCode2["OK"] = 1] = "OK";
      SpanStatusCode2[SpanStatusCode2["ERROR"] = 2] = "ERROR";
    })(SpanStatusCode || (SpanStatusCode = {}));
  }
});

// node_modules/@opentelemetry/api/build/esm/trace/internal/tracestate-validators.js
function validateKey(key) {
  return VALID_KEY_REGEX.test(key);
}
function validateValue(value) {
  return VALID_VALUE_BASE_REGEX.test(value) && !INVALID_VALUE_COMMA_EQUAL_REGEX.test(value);
}
var VALID_KEY_CHAR_RANGE, VALID_KEY, VALID_VENDOR_KEY, VALID_KEY_REGEX, VALID_VALUE_BASE_REGEX, INVALID_VALUE_COMMA_EQUAL_REGEX;
var init_tracestate_validators = __esm({
  "node_modules/@opentelemetry/api/build/esm/trace/internal/tracestate-validators.js"() {
    VALID_KEY_CHAR_RANGE = "[_0-9a-z-*/]";
    VALID_KEY = `[a-z]${VALID_KEY_CHAR_RANGE}{0,255}`;
    VALID_VENDOR_KEY = `[a-z0-9]${VALID_KEY_CHAR_RANGE}{0,240}@[a-z]${VALID_KEY_CHAR_RANGE}{0,13}`;
    VALID_KEY_REGEX = new RegExp(`^(?:${VALID_KEY}|${VALID_VENDOR_KEY})$`);
    VALID_VALUE_BASE_REGEX = /^[ -~]{0,255}[!-~]$/;
    INVALID_VALUE_COMMA_EQUAL_REGEX = /,|=/;
  }
});

// node_modules/@opentelemetry/api/build/esm/trace/internal/tracestate-impl.js
var MAX_TRACE_STATE_ITEMS, MAX_TRACE_STATE_LEN, LIST_MEMBERS_SEPARATOR, LIST_MEMBER_KEY_VALUE_SPLITTER, TraceStateImpl;
var init_tracestate_impl = __esm({
  "node_modules/@opentelemetry/api/build/esm/trace/internal/tracestate-impl.js"() {
    init_tracestate_validators();
    MAX_TRACE_STATE_ITEMS = 32;
    MAX_TRACE_STATE_LEN = 512;
    LIST_MEMBERS_SEPARATOR = ",";
    LIST_MEMBER_KEY_VALUE_SPLITTER = "=";
    TraceStateImpl = class _TraceStateImpl {
      constructor(rawTraceState) {
        this._internalState = /* @__PURE__ */ new Map();
        if (rawTraceState)
          this._parse(rawTraceState);
      }
      set(key, value) {
        const traceState = this._clone();
        if (traceState._internalState.has(key)) {
          traceState._internalState.delete(key);
        }
        traceState._internalState.set(key, value);
        return traceState;
      }
      unset(key) {
        const traceState = this._clone();
        traceState._internalState.delete(key);
        return traceState;
      }
      get(key) {
        return this._internalState.get(key);
      }
      serialize() {
        return Array.from(this._internalState.keys()).reduceRight((agg, key) => {
          agg.push(key + LIST_MEMBER_KEY_VALUE_SPLITTER + this.get(key));
          return agg;
        }, []).join(LIST_MEMBERS_SEPARATOR);
      }
      _parse(rawTraceState) {
        if (rawTraceState.length > MAX_TRACE_STATE_LEN)
          return;
        this._internalState = rawTraceState.split(LIST_MEMBERS_SEPARATOR).reduceRight((agg, part) => {
          const listMember = part.trim();
          const i = listMember.indexOf(LIST_MEMBER_KEY_VALUE_SPLITTER);
          if (i !== -1) {
            const key = listMember.slice(0, i);
            const value = listMember.slice(i + 1, part.length);
            if (validateKey(key) && validateValue(value)) {
              agg.set(key, value);
            } else {
            }
          }
          return agg;
        }, /* @__PURE__ */ new Map());
        if (this._internalState.size > MAX_TRACE_STATE_ITEMS) {
          this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, MAX_TRACE_STATE_ITEMS));
        }
      }
      // @ts-expect-error TS6133 Accessed in tests only.
      _keys() {
        return Array.from(this._internalState.keys()).reverse();
      }
      _clone() {
        const traceState = new _TraceStateImpl();
        traceState._internalState = new Map(this._internalState);
        return traceState;
      }
    };
  }
});

// node_modules/@opentelemetry/api/build/esm/trace/internal/utils.js
function createTraceState(rawTraceState) {
  return new TraceStateImpl(rawTraceState);
}
var init_utils2 = __esm({
  "node_modules/@opentelemetry/api/build/esm/trace/internal/utils.js"() {
    init_tracestate_impl();
  }
});

// node_modules/@opentelemetry/api/build/esm/context-api.js
var context;
var init_context_api = __esm({
  "node_modules/@opentelemetry/api/build/esm/context-api.js"() {
    init_context2();
    context = ContextAPI.getInstance();
  }
});

// node_modules/@opentelemetry/api/build/esm/diag-api.js
var diag2;
var init_diag_api = __esm({
  "node_modules/@opentelemetry/api/build/esm/diag-api.js"() {
    init_diag();
    diag2 = DiagAPI.instance();
  }
});

// node_modules/@opentelemetry/api/build/esm/metrics/NoopMeterProvider.js
var NoopMeterProvider, NOOP_METER_PROVIDER;
var init_NoopMeterProvider = __esm({
  "node_modules/@opentelemetry/api/build/esm/metrics/NoopMeterProvider.js"() {
    init_NoopMeter();
    NoopMeterProvider = class {
      getMeter(_name, _version, _options) {
        return NOOP_METER;
      }
    };
    NOOP_METER_PROVIDER = new NoopMeterProvider();
  }
});

// node_modules/@opentelemetry/api/build/esm/api/metrics.js
var API_NAME3, MetricsAPI;
var init_metrics = __esm({
  "node_modules/@opentelemetry/api/build/esm/api/metrics.js"() {
    init_NoopMeterProvider();
    init_global_utils();
    init_diag();
    API_NAME3 = "metrics";
    MetricsAPI = class _MetricsAPI {
      /** Empty private constructor prevents end users from constructing a new instance of the API */
      constructor() {
      }
      /** Get the singleton instance of the Metrics API */
      static getInstance() {
        if (!this._instance) {
          this._instance = new _MetricsAPI();
        }
        return this._instance;
      }
      /**
       * Set the current global meter provider.
       * Returns true if the meter provider was successfully registered, else false.
       */
      setGlobalMeterProvider(provider) {
        return registerGlobal(API_NAME3, provider, DiagAPI.instance());
      }
      /**
       * Returns the global meter provider.
       */
      getMeterProvider() {
        return getGlobal(API_NAME3) || NOOP_METER_PROVIDER;
      }
      /**
       * Returns a meter from the global meter provider.
       */
      getMeter(name, version, options) {
        return this.getMeterProvider().getMeter(name, version, options);
      }
      /** Remove the global meter provider */
      disable() {
        unregisterGlobal(API_NAME3, DiagAPI.instance());
      }
    };
  }
});

// node_modules/@opentelemetry/api/build/esm/metrics-api.js
var metrics;
var init_metrics_api = __esm({
  "node_modules/@opentelemetry/api/build/esm/metrics-api.js"() {
    init_metrics();
    metrics = MetricsAPI.getInstance();
  }
});

// node_modules/@opentelemetry/api/build/esm/propagation/NoopTextMapPropagator.js
var NoopTextMapPropagator;
var init_NoopTextMapPropagator = __esm({
  "node_modules/@opentelemetry/api/build/esm/propagation/NoopTextMapPropagator.js"() {
    NoopTextMapPropagator = class {
      /** Noop inject function does nothing */
      inject(_context, _carrier) {
      }
      /** Noop extract function does nothing and returns the input context */
      extract(context2, _carrier) {
        return context2;
      }
      fields() {
        return [];
      }
    };
  }
});

// node_modules/@opentelemetry/api/build/esm/baggage/context-helpers.js
function getBaggage(context2) {
  return context2.getValue(BAGGAGE_KEY) || void 0;
}
function getActiveBaggage() {
  return getBaggage(ContextAPI.getInstance().active());
}
function setBaggage(context2, baggage) {
  return context2.setValue(BAGGAGE_KEY, baggage);
}
function deleteBaggage(context2) {
  return context2.deleteValue(BAGGAGE_KEY);
}
var BAGGAGE_KEY;
var init_context_helpers = __esm({
  "node_modules/@opentelemetry/api/build/esm/baggage/context-helpers.js"() {
    init_context2();
    init_context();
    BAGGAGE_KEY = createContextKey("OpenTelemetry Baggage Key");
  }
});

// node_modules/@opentelemetry/api/build/esm/api/propagation.js
var API_NAME4, NOOP_TEXT_MAP_PROPAGATOR, PropagationAPI;
var init_propagation = __esm({
  "node_modules/@opentelemetry/api/build/esm/api/propagation.js"() {
    init_global_utils();
    init_NoopTextMapPropagator();
    init_TextMapPropagator();
    init_context_helpers();
    init_utils();
    init_diag();
    API_NAME4 = "propagation";
    NOOP_TEXT_MAP_PROPAGATOR = new NoopTextMapPropagator();
    PropagationAPI = class _PropagationAPI {
      /** Empty private constructor prevents end users from constructing a new instance of the API */
      constructor() {
        this.createBaggage = createBaggage;
        this.getBaggage = getBaggage;
        this.getActiveBaggage = getActiveBaggage;
        this.setBaggage = setBaggage;
        this.deleteBaggage = deleteBaggage;
      }
      /** Get the singleton instance of the Propagator API */
      static getInstance() {
        if (!this._instance) {
          this._instance = new _PropagationAPI();
        }
        return this._instance;
      }
      /**
       * Set the current propagator.
       *
       * @returns true if the propagator was successfully registered, else false
       */
      setGlobalPropagator(propagator) {
        return registerGlobal(API_NAME4, propagator, DiagAPI.instance());
      }
      /**
       * Inject context into a carrier to be propagated inter-process
       *
       * @param context Context carrying tracing data to inject
       * @param carrier carrier to inject context into
       * @param setter Function used to set values on the carrier
       */
      inject(context2, carrier, setter = defaultTextMapSetter) {
        return this._getGlobalPropagator().inject(context2, carrier, setter);
      }
      /**
       * Extract context from a carrier
       *
       * @param context Context which the newly created context will inherit from
       * @param carrier Carrier to extract context from
       * @param getter Function used to extract keys from a carrier
       */
      extract(context2, carrier, getter = defaultTextMapGetter) {
        return this._getGlobalPropagator().extract(context2, carrier, getter);
      }
      /**
       * Return a list of all fields which may be used by the propagator.
       */
      fields() {
        return this._getGlobalPropagator().fields();
      }
      /** Remove the global propagator */
      disable() {
        unregisterGlobal(API_NAME4, DiagAPI.instance());
      }
      _getGlobalPropagator() {
        return getGlobal(API_NAME4) || NOOP_TEXT_MAP_PROPAGATOR;
      }
    };
  }
});

// node_modules/@opentelemetry/api/build/esm/propagation-api.js
var propagation;
var init_propagation_api = __esm({
  "node_modules/@opentelemetry/api/build/esm/propagation-api.js"() {
    init_propagation();
    propagation = PropagationAPI.getInstance();
  }
});

// node_modules/@opentelemetry/api/build/esm/api/trace.js
var API_NAME5, TraceAPI;
var init_trace = __esm({
  "node_modules/@opentelemetry/api/build/esm/api/trace.js"() {
    init_global_utils();
    init_ProxyTracerProvider();
    init_spancontext_utils();
    init_context_utils();
    init_diag();
    API_NAME5 = "trace";
    TraceAPI = class _TraceAPI {
      /** Empty private constructor prevents end users from constructing a new instance of the API */
      constructor() {
        this._proxyTracerProvider = new ProxyTracerProvider();
        this.wrapSpanContext = wrapSpanContext;
        this.isSpanContextValid = isSpanContextValid;
        this.deleteSpan = deleteSpan;
        this.getSpan = getSpan;
        this.getActiveSpan = getActiveSpan;
        this.getSpanContext = getSpanContext;
        this.setSpan = setSpan;
        this.setSpanContext = setSpanContext;
      }
      /** Get the singleton instance of the Trace API */
      static getInstance() {
        if (!this._instance) {
          this._instance = new _TraceAPI();
        }
        return this._instance;
      }
      /**
       * Set the current global tracer.
       *
       * @returns true if the tracer provider was successfully registered, else false
       */
      setGlobalTracerProvider(provider) {
        const success = registerGlobal(API_NAME5, this._proxyTracerProvider, DiagAPI.instance());
        if (success) {
          this._proxyTracerProvider.setDelegate(provider);
        }
        return success;
      }
      /**
       * Returns the global tracer provider.
       */
      getTracerProvider() {
        return getGlobal(API_NAME5) || this._proxyTracerProvider;
      }
      /**
       * Returns a tracer from the global tracer provider.
       */
      getTracer(name, version) {
        return this.getTracerProvider().getTracer(name, version);
      }
      /** Remove the global tracer provider */
      disable() {
        unregisterGlobal(API_NAME5, DiagAPI.instance());
        this._proxyTracerProvider = new ProxyTracerProvider();
      }
    };
  }
});

// node_modules/@opentelemetry/api/build/esm/trace-api.js
var trace;
var init_trace_api = __esm({
  "node_modules/@opentelemetry/api/build/esm/trace-api.js"() {
    init_trace();
    trace = TraceAPI.getInstance();
  }
});

// node_modules/@opentelemetry/api/build/esm/index.js
var esm_exports = {};
__export(esm_exports, {
  DiagConsoleLogger: () => DiagConsoleLogger,
  DiagLogLevel: () => DiagLogLevel,
  INVALID_SPANID: () => INVALID_SPANID,
  INVALID_SPAN_CONTEXT: () => INVALID_SPAN_CONTEXT,
  INVALID_TRACEID: () => INVALID_TRACEID,
  ProxyTracer: () => ProxyTracer,
  ProxyTracerProvider: () => ProxyTracerProvider,
  ROOT_CONTEXT: () => ROOT_CONTEXT,
  SamplingDecision: () => SamplingDecision,
  SpanKind: () => SpanKind,
  SpanStatusCode: () => SpanStatusCode,
  TraceFlags: () => TraceFlags,
  ValueType: () => ValueType,
  baggageEntryMetadataFromString: () => baggageEntryMetadataFromString,
  context: () => context,
  createContextKey: () => createContextKey,
  createNoopMeter: () => createNoopMeter,
  createTraceState: () => createTraceState,
  default: () => esm_default,
  defaultTextMapGetter: () => defaultTextMapGetter,
  defaultTextMapSetter: () => defaultTextMapSetter,
  diag: () => diag2,
  isSpanContextValid: () => isSpanContextValid,
  isValidSpanId: () => isValidSpanId,
  isValidTraceId: () => isValidTraceId,
  metrics: () => metrics,
  propagation: () => propagation,
  trace: () => trace
});
var esm_default;
var init_esm = __esm({
  "node_modules/@opentelemetry/api/build/esm/index.js"() {
    init_utils();
    init_context();
    init_consoleLogger();
    init_types();
    init_NoopMeter();
    init_Metric();
    init_TextMapPropagator();
    init_ProxyTracer();
    init_ProxyTracerProvider();
    init_SamplingResult();
    init_span_kind();
    init_status();
    init_trace_flags();
    init_utils2();
    init_spancontext_utils();
    init_invalid_span_constants();
    init_context_api();
    init_diag_api();
    init_metrics_api();
    init_propagation_api();
    init_trace_api();
    esm_default = {
      context,
      diag: diag2,
      metrics,
      propagation,
      trace
    };
  }
});

// node_modules/@opentelemetry/context-async-hooks/build/src/AbstractAsyncHooksContextManager.js
var require_AbstractAsyncHooksContextManager = __commonJS({
  "node_modules/@opentelemetry/context-async-hooks/build/src/AbstractAsyncHooksContextManager.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.AbstractAsyncHooksContextManager = void 0;
    var events_1 = require("events");
    var ADD_LISTENER_METHODS = [
      "addListener",
      "on",
      "once",
      "prependListener",
      "prependOnceListener"
    ];
    var AbstractAsyncHooksContextManager = class {
      /**
       * Binds a the certain context or the active one to the target function and then returns the target
       * @param context A context (span) to be bind to target
       * @param target a function or event emitter. When target or one of its callbacks is called,
       *  the provided context will be used as the active context for the duration of the call.
       */
      bind(context2, target) {
        if (target instanceof events_1.EventEmitter) {
          return this._bindEventEmitter(context2, target);
        }
        if (typeof target === "function") {
          return this._bindFunction(context2, target);
        }
        return target;
      }
      _bindFunction(context2, target) {
        const manager = this;
        const contextWrapper = function(...args) {
          return manager.with(context2, () => target.apply(this, args));
        };
        Object.defineProperty(contextWrapper, "length", {
          enumerable: false,
          configurable: true,
          writable: false,
          value: target.length
        });
        return contextWrapper;
      }
      /**
       * By default, EventEmitter call their callback with their context, which we do
       * not want, instead we will bind a specific context to all callbacks that
       * go through it.
       * @param context the context we want to bind
       * @param ee EventEmitter an instance of EventEmitter to patch
       */
      _bindEventEmitter(context2, ee) {
        const map = this._getPatchMap(ee);
        if (map !== void 0)
          return ee;
        this._createPatchMap(ee);
        ADD_LISTENER_METHODS.forEach((methodName) => {
          if (ee[methodName] === void 0)
            return;
          ee[methodName] = this._patchAddListener(ee, ee[methodName], context2);
        });
        if (typeof ee.removeListener === "function") {
          ee.removeListener = this._patchRemoveListener(ee, ee.removeListener);
        }
        if (typeof ee.off === "function") {
          ee.off = this._patchRemoveListener(ee, ee.off);
        }
        if (typeof ee.removeAllListeners === "function") {
          ee.removeAllListeners = this._patchRemoveAllListeners(ee, ee.removeAllListeners);
        }
        return ee;
      }
      /**
       * Patch methods that remove a given listener so that we match the "patched"
       * version of that listener (the one that propagate context).
       * @param ee EventEmitter instance
       * @param original reference to the patched method
       */
      _patchRemoveListener(ee, original) {
        const contextManager = this;
        return function(event, listener) {
          const events = contextManager._getPatchMap(ee)?.[event];
          if (events === void 0) {
            return original.call(this, event, listener);
          }
          const patchedListener = events.get(listener);
          return original.call(this, event, patchedListener || listener);
        };
      }
      /**
       * Patch methods that remove all listeners so we remove our
       * internal references for a given event.
       * @param ee EventEmitter instance
       * @param original reference to the patched method
       */
      _patchRemoveAllListeners(ee, original) {
        const contextManager = this;
        return function(event) {
          const map = contextManager._getPatchMap(ee);
          if (map !== void 0) {
            if (arguments.length === 0) {
              contextManager._createPatchMap(ee);
            } else if (map[event] !== void 0) {
              delete map[event];
            }
          }
          return original.apply(this, arguments);
        };
      }
      /**
       * Patch methods on an event emitter instance that can add listeners so we
       * can force them to propagate a given context.
       * @param ee EventEmitter instance
       * @param original reference to the patched method
       * @param [context] context to propagate when calling listeners
       */
      _patchAddListener(ee, original, context2) {
        const contextManager = this;
        return function(event, listener) {
          if (contextManager._wrapped) {
            return original.call(this, event, listener);
          }
          let map = contextManager._getPatchMap(ee);
          if (map === void 0) {
            map = contextManager._createPatchMap(ee);
          }
          let listeners = map[event];
          if (listeners === void 0) {
            listeners = /* @__PURE__ */ new WeakMap();
            map[event] = listeners;
          }
          const patchedListener = contextManager.bind(context2, listener);
          listeners.set(listener, patchedListener);
          contextManager._wrapped = true;
          try {
            return original.call(this, event, patchedListener);
          } finally {
            contextManager._wrapped = false;
          }
        };
      }
      _createPatchMap(ee) {
        const map = /* @__PURE__ */ Object.create(null);
        ee[this._kOtListeners] = map;
        return map;
      }
      _getPatchMap(ee) {
        return ee[this._kOtListeners];
      }
      _kOtListeners = /* @__PURE__ */ Symbol("OtListeners");
      _wrapped = false;
    };
    exports2.AbstractAsyncHooksContextManager = AbstractAsyncHooksContextManager;
  }
});

// node_modules/@opentelemetry/context-async-hooks/build/src/AsyncHooksContextManager.js
var require_AsyncHooksContextManager = __commonJS({
  "node_modules/@opentelemetry/context-async-hooks/build/src/AsyncHooksContextManager.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.AsyncHooksContextManager = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var asyncHooks = require("async_hooks");
    var AbstractAsyncHooksContextManager_1 = require_AbstractAsyncHooksContextManager();
    var AsyncHooksContextManager = class extends AbstractAsyncHooksContextManager_1.AbstractAsyncHooksContextManager {
      _asyncHook;
      _contexts = /* @__PURE__ */ new Map();
      _stack = [];
      constructor() {
        super();
        this._asyncHook = asyncHooks.createHook({
          init: this._init.bind(this),
          before: this._before.bind(this),
          after: this._after.bind(this),
          destroy: this._destroy.bind(this),
          promiseResolve: this._destroy.bind(this)
        });
      }
      active() {
        return this._stack[this._stack.length - 1] ?? api_1.ROOT_CONTEXT;
      }
      with(context2, fn, thisArg, ...args) {
        this._enterContext(context2);
        try {
          return fn.call(thisArg, ...args);
        } finally {
          this._exitContext();
        }
      }
      enable() {
        this._asyncHook.enable();
        return this;
      }
      disable() {
        this._asyncHook.disable();
        this._contexts.clear();
        this._stack = [];
        return this;
      }
      /**
       * Init hook will be called when userland create a async context, setting the
       * context as the current one if it exist.
       * @param uid id of the async context
       * @param type the resource type
       */
      _init(uid, type) {
        if (type === "TIMERWRAP")
          return;
        const context2 = this._stack[this._stack.length - 1];
        if (context2 !== void 0) {
          this._contexts.set(uid, context2);
        }
      }
      /**
       * Destroy hook will be called when a given context is no longer used so we can
       * remove its attached context.
       * @param uid uid of the async context
       */
      _destroy(uid) {
        this._contexts.delete(uid);
      }
      /**
       * Before hook is called just before executing a async context.
       * @param uid uid of the async context
       */
      _before(uid) {
        const context2 = this._contexts.get(uid);
        if (context2 !== void 0) {
          this._enterContext(context2);
        }
      }
      /**
       * After hook is called just after completing the execution of a async context.
       */
      _after() {
        this._exitContext();
      }
      /**
       * Set the given context as active
       */
      _enterContext(context2) {
        this._stack.push(context2);
      }
      /**
       * Remove the context at the root of the stack
       */
      _exitContext() {
        this._stack.pop();
      }
    };
    exports2.AsyncHooksContextManager = AsyncHooksContextManager;
  }
});

// node_modules/@opentelemetry/context-async-hooks/build/src/AsyncLocalStorageContextManager.js
var require_AsyncLocalStorageContextManager = __commonJS({
  "node_modules/@opentelemetry/context-async-hooks/build/src/AsyncLocalStorageContextManager.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.AsyncLocalStorageContextManager = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var async_hooks_1 = require("async_hooks");
    var AbstractAsyncHooksContextManager_1 = require_AbstractAsyncHooksContextManager();
    var DisposeOnceToken = class {
      _isDisposed = false;
      _previousContext;
      _asyncLocalStorage;
      constructor(previousContext, asyncLocalStorage) {
        this._previousContext = previousContext;
        this._asyncLocalStorage = asyncLocalStorage;
      }
      dispose() {
        if (this._isDisposed) {
          return;
        }
        this._asyncLocalStorage.enterWith(this._previousContext);
        this._isDisposed = true;
      }
    };
    var AsyncLocalStorageContextManager = class extends AbstractAsyncHooksContextManager_1.AbstractAsyncHooksContextManager {
      _asyncLocalStorage;
      constructor() {
        super();
        this._asyncLocalStorage = new async_hooks_1.AsyncLocalStorage();
      }
      active() {
        return this._asyncLocalStorage.getStore() ?? api_1.ROOT_CONTEXT;
      }
      with(context2, fn, thisArg, ...args) {
        const cb = thisArg == null ? fn : fn.bind(thisArg);
        return this._asyncLocalStorage.run(context2, cb, ...args);
      }
      enable() {
        return this;
      }
      disable() {
        this._asyncLocalStorage.disable();
        return this;
      }
      /**
       * Imperatively sets `context` as active for the current async execution chain
       * and operations spawned from it. Returns a {@link ContextManagementToken} whose `dispose()`
       * restores the previous context (see {@link ContextManager.attach}).
       *
       * On Node.js 25.9+, delegates to `AsyncLocalStorage.withScope()` which returns
       * a native `RunScope`. On older Node.js versions, falls back to `enterWith()` with
       * a manual token.
       *
       * **Caveat for async functions:** Both `withScope()` and `enterWith()` affect the
       * entire current async execution chain. If `attach()` is called inside an async
       * function before the first `await`, the context change will leak into the caller's
       * context and remain active there until something else restores it. Prefer `with()`
       * for async code.
       *
       * @experimental This API is experimental and may change in minor releases without prior notice.
       */
      attach(context2) {
        const withScope = this._asyncLocalStorage.withScope;
        if (withScope) {
          return withScope.call(this._asyncLocalStorage, context2);
        }
        const previousContext = this.active();
        this._asyncLocalStorage.enterWith(context2);
        return new DisposeOnceToken(previousContext, this._asyncLocalStorage);
      }
    };
    exports2.AsyncLocalStorageContextManager = AsyncLocalStorageContextManager;
  }
});

// node_modules/@opentelemetry/context-async-hooks/build/src/index.js
var require_src = __commonJS({
  "node_modules/@opentelemetry/context-async-hooks/build/src/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.AsyncLocalStorageContextManager = exports2.AsyncHooksContextManager = void 0;
    var AsyncHooksContextManager_1 = require_AsyncHooksContextManager();
    Object.defineProperty(exports2, "AsyncHooksContextManager", { enumerable: true, get: function() {
      return AsyncHooksContextManager_1.AsyncHooksContextManager;
    } });
    var AsyncLocalStorageContextManager_1 = require_AsyncLocalStorageContextManager();
    Object.defineProperty(exports2, "AsyncLocalStorageContextManager", { enumerable: true, get: function() {
      return AsyncLocalStorageContextManager_1.AsyncLocalStorageContextManager;
    } });
  }
});

// node_modules/@opentelemetry/core/build/src/trace/suppress-tracing.js
var require_suppress_tracing = __commonJS({
  "node_modules/@opentelemetry/core/build/src/trace/suppress-tracing.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isTracingSuppressed = exports2.unsuppressTracing = exports2.suppressTracing = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var SUPPRESS_TRACING_KEY = (0, api_1.createContextKey)("OpenTelemetry SDK Context Key SUPPRESS_TRACING");
    function suppressTracing(context2) {
      return context2.setValue(SUPPRESS_TRACING_KEY, true);
    }
    exports2.suppressTracing = suppressTracing;
    function unsuppressTracing(context2) {
      return context2.deleteValue(SUPPRESS_TRACING_KEY);
    }
    exports2.unsuppressTracing = unsuppressTracing;
    function isTracingSuppressed(context2) {
      return context2.getValue(SUPPRESS_TRACING_KEY) === true;
    }
    exports2.isTracingSuppressed = isTracingSuppressed;
  }
});

// node_modules/@opentelemetry/core/build/src/baggage/constants.js
var require_constants = __commonJS({
  "node_modules/@opentelemetry/core/build/src/baggage/constants.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.BAGGAGE_MAX_TOTAL_LENGTH = exports2.BAGGAGE_MAX_PER_NAME_VALUE_PAIRS = exports2.BAGGAGE_MAX_NAME_VALUE_PAIRS = exports2.BAGGAGE_HEADER = exports2.BAGGAGE_ITEMS_SEPARATOR = exports2.BAGGAGE_PROPERTIES_SEPARATOR = exports2.BAGGAGE_KEY_PAIR_SEPARATOR = void 0;
    exports2.BAGGAGE_KEY_PAIR_SEPARATOR = "=";
    exports2.BAGGAGE_PROPERTIES_SEPARATOR = ";";
    exports2.BAGGAGE_ITEMS_SEPARATOR = ",";
    exports2.BAGGAGE_HEADER = "baggage";
    exports2.BAGGAGE_MAX_NAME_VALUE_PAIRS = 180;
    exports2.BAGGAGE_MAX_PER_NAME_VALUE_PAIRS = 4096;
    exports2.BAGGAGE_MAX_TOTAL_LENGTH = 8192;
  }
});

// node_modules/@opentelemetry/core/build/src/baggage/utils.js
var require_utils = __commonJS({
  "node_modules/@opentelemetry/core/build/src/baggage/utils.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.parseKeyPairsIntoRecord = exports2.parseBaggageHeaderString = exports2.parsePairKeyValue = exports2.getKeyPairs = exports2.serializeKeyPairs = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var constants_1 = require_constants();
    function serializeKeyPairs(keyPairs) {
      return keyPairs.reduce((hValue, current) => {
        const value = `${hValue}${hValue !== "" ? constants_1.BAGGAGE_ITEMS_SEPARATOR : ""}${current}`;
        return value.length > constants_1.BAGGAGE_MAX_TOTAL_LENGTH ? hValue : value;
      }, "");
    }
    exports2.serializeKeyPairs = serializeKeyPairs;
    function getKeyPairs(baggage) {
      return baggage.getAllEntries().map(([key, value]) => {
        let entry = `${encodeURIComponent(key)}=${encodeURIComponent(value.value)}`;
        if (value.metadata !== void 0) {
          entry += constants_1.BAGGAGE_PROPERTIES_SEPARATOR + value.metadata.toString();
        }
        return entry;
      });
    }
    exports2.getKeyPairs = getKeyPairs;
    function parsePairKeyValue(entry) {
      if (!entry)
        return;
      const metadataSeparatorIndex = entry.indexOf(constants_1.BAGGAGE_PROPERTIES_SEPARATOR);
      const keyPairPart = metadataSeparatorIndex === -1 ? entry : entry.substring(0, metadataSeparatorIndex);
      const separatorIndex = keyPairPart.indexOf(constants_1.BAGGAGE_KEY_PAIR_SEPARATOR);
      if (separatorIndex <= 0)
        return;
      const rawKey = keyPairPart.substring(0, separatorIndex).trim();
      const rawValue = keyPairPart.substring(separatorIndex + 1).trim();
      if (!rawKey || !rawValue)
        return;
      let key;
      let value;
      try {
        key = decodeURIComponent(rawKey);
        value = decodeURIComponent(rawValue);
      } catch {
        return;
      }
      let metadata;
      if (metadataSeparatorIndex !== -1 && metadataSeparatorIndex < entry.length - 1) {
        const metadataString = entry.substring(metadataSeparatorIndex + 1);
        metadata = (0, api_1.baggageEntryMetadataFromString)(metadataString);
      }
      return { key, value, metadata };
    }
    exports2.parsePairKeyValue = parsePairKeyValue;
    function parseBaggageHeaderString(value, baggage, count, totalSize) {
      let start = 0;
      while (start < value.length && count < constants_1.BAGGAGE_MAX_NAME_VALUE_PAIRS) {
        const end = value.indexOf(constants_1.BAGGAGE_ITEMS_SEPARATOR, start);
        const entryEnd = end === -1 ? value.length : end;
        const entryLength = entryEnd - start;
        if (entryLength <= constants_1.BAGGAGE_MAX_PER_NAME_VALUE_PAIRS) {
          const keyPair = parsePairKeyValue(value.substring(start, entryEnd));
          if (keyPair) {
            const entrySize = (count === 0 ? 0 : 1) + entryLength;
            if (totalSize + entrySize > constants_1.BAGGAGE_MAX_TOTAL_LENGTH)
              break;
            baggage[keyPair.key] = keyPair.metadata ? { value: keyPair.value, metadata: keyPair.metadata } : { value: keyPair.value };
            count++;
            totalSize += entrySize;
          }
        }
        if (end === -1)
          break;
        start = end + 1;
      }
      return [count, totalSize];
    }
    exports2.parseBaggageHeaderString = parseBaggageHeaderString;
    function parseKeyPairsIntoRecord(value) {
      const result = {};
      if (typeof value === "string" && value.length > 0) {
        value.split(constants_1.BAGGAGE_ITEMS_SEPARATOR).forEach((entry) => {
          const keyPair = parsePairKeyValue(entry);
          if (keyPair !== void 0 && keyPair.value.length > 0) {
            result[keyPair.key] = keyPair.value;
          }
        });
      }
      return result;
    }
    exports2.parseKeyPairsIntoRecord = parseKeyPairsIntoRecord;
  }
});

// node_modules/@opentelemetry/core/build/src/baggage/propagation/W3CBaggagePropagator.js
var require_W3CBaggagePropagator = __commonJS({
  "node_modules/@opentelemetry/core/build/src/baggage/propagation/W3CBaggagePropagator.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.W3CBaggagePropagator = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var suppress_tracing_1 = require_suppress_tracing();
    var constants_1 = require_constants();
    var utils_1 = require_utils();
    var W3CBaggagePropagator = class {
      inject(context2, carrier, setter) {
        const baggage = api_1.propagation.getBaggage(context2);
        if (!baggage || (0, suppress_tracing_1.isTracingSuppressed)(context2))
          return;
        const keyPairs = (0, utils_1.getKeyPairs)(baggage).filter((pair) => {
          return pair.length <= constants_1.BAGGAGE_MAX_PER_NAME_VALUE_PAIRS;
        }).slice(0, constants_1.BAGGAGE_MAX_NAME_VALUE_PAIRS);
        const headerValue = (0, utils_1.serializeKeyPairs)(keyPairs);
        if (headerValue.length > 0) {
          setter.set(carrier, constants_1.BAGGAGE_HEADER, headerValue);
        }
      }
      extract(context2, carrier, getter) {
        const headerValue = getter.get(carrier, constants_1.BAGGAGE_HEADER);
        if (!headerValue) {
          return context2;
        }
        const baggage = {};
        let count = 0;
        let totalSize = 0;
        if (Array.isArray(headerValue)) {
          for (let i = 0; i < headerValue.length; i++) {
            [count, totalSize] = (0, utils_1.parseBaggageHeaderString)(headerValue[i], baggage, count, totalSize);
          }
        } else {
          [count] = (0, utils_1.parseBaggageHeaderString)(headerValue, baggage, count, totalSize);
        }
        if (count === 0) {
          return context2;
        }
        return api_1.propagation.setBaggage(context2, api_1.propagation.createBaggage(baggage));
      }
      fields() {
        return [constants_1.BAGGAGE_HEADER];
      }
    };
    exports2.W3CBaggagePropagator = W3CBaggagePropagator;
  }
});

// node_modules/@opentelemetry/core/build/src/common/anchored-clock.js
var require_anchored_clock = __commonJS({
  "node_modules/@opentelemetry/core/build/src/common/anchored-clock.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.AnchoredClock = void 0;
    var AnchoredClock = class {
      _monotonicClock;
      _epochMillis;
      _performanceMillis;
      /**
       * Create a new AnchoredClock anchored to the current time returned by systemClock.
       *
       * @param systemClock should be a clock that returns the number of milliseconds since January 1 1970 such as Date
       * @param monotonicClock should be a clock that counts milliseconds monotonically such as window.performance or perf_hooks.performance
       */
      constructor(systemClock, monotonicClock) {
        this._monotonicClock = monotonicClock;
        this._epochMillis = systemClock.now();
        this._performanceMillis = monotonicClock.now();
      }
      /**
       * Returns the current time by adding the number of milliseconds since the
       * AnchoredClock was created to the creation epoch time
       */
      now() {
        const delta = this._monotonicClock.now() - this._performanceMillis;
        return this._epochMillis + delta;
      }
    };
    exports2.AnchoredClock = AnchoredClock;
  }
});

// node_modules/@opentelemetry/core/build/src/common/attributes.js
var require_attributes = __commonJS({
  "node_modules/@opentelemetry/core/build/src/common/attributes.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isAttributeValue = exports2.isAttributeKey = exports2.sanitizeAttributes = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    function sanitizeAttributes(attributes) {
      const out = {};
      if (typeof attributes !== "object" || attributes == null) {
        return out;
      }
      for (const key in attributes) {
        if (!Object.prototype.hasOwnProperty.call(attributes, key)) {
          continue;
        }
        if (!isAttributeKey(key)) {
          api_1.diag.warn(`Invalid attribute key: ${key}`);
          continue;
        }
        const val = attributes[key];
        if (!isAttributeValue(val)) {
          api_1.diag.warn(`Invalid attribute value set for key: ${key}`);
          continue;
        }
        if (Array.isArray(val)) {
          out[key] = val.slice();
        } else {
          out[key] = val;
        }
      }
      return out;
    }
    exports2.sanitizeAttributes = sanitizeAttributes;
    function isAttributeKey(key) {
      return typeof key === "string" && key !== "";
    }
    exports2.isAttributeKey = isAttributeKey;
    function isAttributeValue(val) {
      if (val == null) {
        return true;
      }
      if (Array.isArray(val)) {
        return isHomogeneousAttributeValueArray(val);
      }
      return isValidPrimitiveAttributeValueType(typeof val);
    }
    exports2.isAttributeValue = isAttributeValue;
    function isHomogeneousAttributeValueArray(arr) {
      let type;
      for (const element of arr) {
        if (element == null)
          continue;
        const elementType = typeof element;
        if (elementType === type) {
          continue;
        }
        if (!type) {
          if (isValidPrimitiveAttributeValueType(elementType)) {
            type = elementType;
            continue;
          }
          return false;
        }
        return false;
      }
      return true;
    }
    function isValidPrimitiveAttributeValueType(valType) {
      switch (valType) {
        case "number":
        case "boolean":
        case "string":
          return true;
      }
      return false;
    }
  }
});

// node_modules/@opentelemetry/core/build/src/common/logging-error-handler.js
var require_logging_error_handler = __commonJS({
  "node_modules/@opentelemetry/core/build/src/common/logging-error-handler.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.loggingErrorHandler = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    function loggingErrorHandler() {
      return (ex) => {
        api_1.diag.error(stringifyException(ex));
      };
    }
    exports2.loggingErrorHandler = loggingErrorHandler;
    function stringifyException(ex) {
      if (typeof ex === "string") {
        return ex;
      } else {
        return JSON.stringify(flattenException(ex));
      }
    }
    function flattenException(ex) {
      const result = {};
      let current = ex;
      while (current !== null) {
        Object.getOwnPropertyNames(current).forEach((propertyName) => {
          if (result[propertyName])
            return;
          const value = current[propertyName];
          if (value) {
            result[propertyName] = String(value);
          }
        });
        current = Object.getPrototypeOf(current);
      }
      return result;
    }
  }
});

// node_modules/@opentelemetry/core/build/src/common/global-error-handler.js
var require_global_error_handler = __commonJS({
  "node_modules/@opentelemetry/core/build/src/common/global-error-handler.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.globalErrorHandler = exports2.setGlobalErrorHandler = void 0;
    var logging_error_handler_1 = require_logging_error_handler();
    var delegateHandler = (0, logging_error_handler_1.loggingErrorHandler)();
    function setGlobalErrorHandler(handler) {
      delegateHandler = handler;
    }
    exports2.setGlobalErrorHandler = setGlobalErrorHandler;
    function globalErrorHandler(ex) {
      try {
        delegateHandler(ex);
      } catch {
      }
    }
    exports2.globalErrorHandler = globalErrorHandler;
  }
});

// node_modules/@opentelemetry/core/build/src/platform/node/environment.js
var require_environment = __commonJS({
  "node_modules/@opentelemetry/core/build/src/platform/node/environment.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getStringListFromEnv = exports2.getBooleanFromEnv = exports2.getStringFromEnv = exports2.getNumberFromEnv = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var util_1 = require("util");
    function getNumberFromEnv(key) {
      const raw = process.env[key];
      if (raw == null || raw.trim() === "") {
        return void 0;
      }
      const value = Number(raw);
      if (isNaN(value)) {
        api_1.diag.warn(`Unknown value ${(0, util_1.inspect)(raw)} for ${key}, expected a number, using defaults`);
        return void 0;
      }
      return value;
    }
    exports2.getNumberFromEnv = getNumberFromEnv;
    function getStringFromEnv(key) {
      const raw = process.env[key];
      if (raw == null || raw.trim() === "") {
        return void 0;
      }
      return raw;
    }
    exports2.getStringFromEnv = getStringFromEnv;
    function getBooleanFromEnv(key) {
      const raw = process.env[key]?.trim().toLowerCase();
      if (raw == null || raw === "") {
        return false;
      }
      if (raw === "true") {
        return true;
      } else if (raw === "false") {
        return false;
      } else {
        api_1.diag.warn(`Unknown value ${(0, util_1.inspect)(raw)} for ${key}, expected 'true' or 'false', falling back to 'false' (default)`);
        return false;
      }
    }
    exports2.getBooleanFromEnv = getBooleanFromEnv;
    function getStringListFromEnv(key) {
      return getStringFromEnv(key)?.split(",").map((v) => v.trim()).filter((s) => s !== "");
    }
    exports2.getStringListFromEnv = getStringListFromEnv;
  }
});

// node_modules/@opentelemetry/core/build/src/common/globalThis.js
var require_globalThis = __commonJS({
  "node_modules/@opentelemetry/core/build/src/common/globalThis.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2._globalThis = void 0;
    exports2._globalThis = globalThis;
  }
});

// node_modules/@opentelemetry/core/build/src/version.js
var require_version = __commonJS({
  "node_modules/@opentelemetry/core/build/src/version.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.VERSION = void 0;
    exports2.VERSION = "2.12.0";
  }
});

// node_modules/@opentelemetry/semantic-conventions/dist/internal/utils.cjs
var require_utils2 = __commonJS({
  "node_modules/@opentelemetry/semantic-conventions/dist/internal/utils.cjs"(exports2) {
    // @__NO_SIDE_EFFECTS__
    function createConstMap(values) {
      let res = {};
      const len = values.length;
      for (let lp = 0; lp < len; lp++) {
        const val = values[lp];
        if (val) res[String(val).toUpperCase().replace(/[-.]/g, "_")] = val;
      }
      return res;
    }
    exports2.createConstMap = createConstMap;
  }
});

// node_modules/@opentelemetry/semantic-conventions/dist/trace/SemanticAttributes.cjs
var require_SemanticAttributes = __commonJS({
  "node_modules/@opentelemetry/semantic-conventions/dist/trace/SemanticAttributes.cjs"(exports2) {
    var require_utils13 = require_utils2();
    var TMP_AWS_LAMBDA_INVOKED_ARN = "aws.lambda.invoked_arn";
    var TMP_DB_SYSTEM = "db.system";
    var TMP_DB_CONNECTION_STRING = "db.connection_string";
    var TMP_DB_USER = "db.user";
    var TMP_DB_JDBC_DRIVER_CLASSNAME = "db.jdbc.driver_classname";
    var TMP_DB_NAME = "db.name";
    var TMP_DB_STATEMENT = "db.statement";
    var TMP_DB_OPERATION = "db.operation";
    var TMP_DB_MSSQL_INSTANCE_NAME = "db.mssql.instance_name";
    var TMP_DB_CASSANDRA_KEYSPACE = "db.cassandra.keyspace";
    var TMP_DB_CASSANDRA_PAGE_SIZE = "db.cassandra.page_size";
    var TMP_DB_CASSANDRA_CONSISTENCY_LEVEL = "db.cassandra.consistency_level";
    var TMP_DB_CASSANDRA_TABLE = "db.cassandra.table";
    var TMP_DB_CASSANDRA_IDEMPOTENCE = "db.cassandra.idempotence";
    var TMP_DB_CASSANDRA_SPECULATIVE_EXECUTION_COUNT = "db.cassandra.speculative_execution_count";
    var TMP_DB_CASSANDRA_COORDINATOR_ID = "db.cassandra.coordinator.id";
    var TMP_DB_CASSANDRA_COORDINATOR_DC = "db.cassandra.coordinator.dc";
    var TMP_DB_HBASE_NAMESPACE = "db.hbase.namespace";
    var TMP_DB_REDIS_DATABASE_INDEX = "db.redis.database_index";
    var TMP_DB_MONGODB_COLLECTION = "db.mongodb.collection";
    var TMP_DB_SQL_TABLE = "db.sql.table";
    var TMP_EXCEPTION_TYPE = "exception.type";
    var TMP_EXCEPTION_MESSAGE = "exception.message";
    var TMP_EXCEPTION_STACKTRACE = "exception.stacktrace";
    var TMP_EXCEPTION_ESCAPED = "exception.escaped";
    var TMP_FAAS_TRIGGER = "faas.trigger";
    var TMP_FAAS_EXECUTION = "faas.execution";
    var TMP_FAAS_DOCUMENT_COLLECTION = "faas.document.collection";
    var TMP_FAAS_DOCUMENT_OPERATION = "faas.document.operation";
    var TMP_FAAS_DOCUMENT_TIME = "faas.document.time";
    var TMP_FAAS_DOCUMENT_NAME = "faas.document.name";
    var TMP_FAAS_TIME = "faas.time";
    var TMP_FAAS_CRON = "faas.cron";
    var TMP_FAAS_COLDSTART = "faas.coldstart";
    var TMP_FAAS_INVOKED_NAME = "faas.invoked_name";
    var TMP_FAAS_INVOKED_PROVIDER = "faas.invoked_provider";
    var TMP_FAAS_INVOKED_REGION = "faas.invoked_region";
    var TMP_NET_TRANSPORT = "net.transport";
    var TMP_NET_PEER_IP = "net.peer.ip";
    var TMP_NET_PEER_PORT = "net.peer.port";
    var TMP_NET_PEER_NAME = "net.peer.name";
    var TMP_NET_HOST_IP = "net.host.ip";
    var TMP_NET_HOST_PORT = "net.host.port";
    var TMP_NET_HOST_NAME = "net.host.name";
    var TMP_NET_HOST_CONNECTION_TYPE = "net.host.connection.type";
    var TMP_NET_HOST_CONNECTION_SUBTYPE = "net.host.connection.subtype";
    var TMP_NET_HOST_CARRIER_NAME = "net.host.carrier.name";
    var TMP_NET_HOST_CARRIER_MCC = "net.host.carrier.mcc";
    var TMP_NET_HOST_CARRIER_MNC = "net.host.carrier.mnc";
    var TMP_NET_HOST_CARRIER_ICC = "net.host.carrier.icc";
    var TMP_PEER_SERVICE = "peer.service";
    var TMP_ENDUSER_ID = "enduser.id";
    var TMP_ENDUSER_ROLE = "enduser.role";
    var TMP_ENDUSER_SCOPE = "enduser.scope";
    var TMP_THREAD_ID = "thread.id";
    var TMP_THREAD_NAME = "thread.name";
    var TMP_CODE_FUNCTION = "code.function";
    var TMP_CODE_NAMESPACE = "code.namespace";
    var TMP_CODE_FILEPATH = "code.filepath";
    var TMP_CODE_LINENO = "code.lineno";
    var TMP_HTTP_METHOD = "http.method";
    var TMP_HTTP_URL = "http.url";
    var TMP_HTTP_TARGET = "http.target";
    var TMP_HTTP_HOST = "http.host";
    var TMP_HTTP_SCHEME = "http.scheme";
    var TMP_HTTP_STATUS_CODE = "http.status_code";
    var TMP_HTTP_FLAVOR = "http.flavor";
    var TMP_HTTP_USER_AGENT = "http.user_agent";
    var TMP_HTTP_REQUEST_CONTENT_LENGTH = "http.request_content_length";
    var TMP_HTTP_REQUEST_CONTENT_LENGTH_UNCOMPRESSED = "http.request_content_length_uncompressed";
    var TMP_HTTP_RESPONSE_CONTENT_LENGTH = "http.response_content_length";
    var TMP_HTTP_RESPONSE_CONTENT_LENGTH_UNCOMPRESSED = "http.response_content_length_uncompressed";
    var TMP_HTTP_SERVER_NAME = "http.server_name";
    var TMP_HTTP_ROUTE = "http.route";
    var TMP_HTTP_CLIENT_IP = "http.client_ip";
    var TMP_AWS_DYNAMODB_TABLE_NAMES = "aws.dynamodb.table_names";
    var TMP_AWS_DYNAMODB_CONSUMED_CAPACITY = "aws.dynamodb.consumed_capacity";
    var TMP_AWS_DYNAMODB_ITEM_COLLECTION_METRICS = "aws.dynamodb.item_collection_metrics";
    var TMP_AWS_DYNAMODB_PROVISIONED_READ_CAPACITY = "aws.dynamodb.provisioned_read_capacity";
    var TMP_AWS_DYNAMODB_PROVISIONED_WRITE_CAPACITY = "aws.dynamodb.provisioned_write_capacity";
    var TMP_AWS_DYNAMODB_CONSISTENT_READ = "aws.dynamodb.consistent_read";
    var TMP_AWS_DYNAMODB_PROJECTION = "aws.dynamodb.projection";
    var TMP_AWS_DYNAMODB_LIMIT = "aws.dynamodb.limit";
    var TMP_AWS_DYNAMODB_ATTRIBUTES_TO_GET = "aws.dynamodb.attributes_to_get";
    var TMP_AWS_DYNAMODB_INDEX_NAME = "aws.dynamodb.index_name";
    var TMP_AWS_DYNAMODB_SELECT = "aws.dynamodb.select";
    var TMP_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEXES = "aws.dynamodb.global_secondary_indexes";
    var TMP_AWS_DYNAMODB_LOCAL_SECONDARY_INDEXES = "aws.dynamodb.local_secondary_indexes";
    var TMP_AWS_DYNAMODB_EXCLUSIVE_START_TABLE = "aws.dynamodb.exclusive_start_table";
    var TMP_AWS_DYNAMODB_TABLE_COUNT = "aws.dynamodb.table_count";
    var TMP_AWS_DYNAMODB_SCAN_FORWARD = "aws.dynamodb.scan_forward";
    var TMP_AWS_DYNAMODB_SEGMENT = "aws.dynamodb.segment";
    var TMP_AWS_DYNAMODB_TOTAL_SEGMENTS = "aws.dynamodb.total_segments";
    var TMP_AWS_DYNAMODB_COUNT = "aws.dynamodb.count";
    var TMP_AWS_DYNAMODB_SCANNED_COUNT = "aws.dynamodb.scanned_count";
    var TMP_AWS_DYNAMODB_ATTRIBUTE_DEFINITIONS = "aws.dynamodb.attribute_definitions";
    var TMP_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEX_UPDATES = "aws.dynamodb.global_secondary_index_updates";
    var TMP_MESSAGING_SYSTEM = "messaging.system";
    var TMP_MESSAGING_DESTINATION = "messaging.destination";
    var TMP_MESSAGING_DESTINATION_KIND = "messaging.destination_kind";
    var TMP_MESSAGING_TEMP_DESTINATION = "messaging.temp_destination";
    var TMP_MESSAGING_PROTOCOL = "messaging.protocol";
    var TMP_MESSAGING_PROTOCOL_VERSION = "messaging.protocol_version";
    var TMP_MESSAGING_URL = "messaging.url";
    var TMP_MESSAGING_MESSAGE_ID = "messaging.message_id";
    var TMP_MESSAGING_CONVERSATION_ID = "messaging.conversation_id";
    var TMP_MESSAGING_MESSAGE_PAYLOAD_SIZE_BYTES = "messaging.message_payload_size_bytes";
    var TMP_MESSAGING_MESSAGE_PAYLOAD_COMPRESSED_SIZE_BYTES = "messaging.message_payload_compressed_size_bytes";
    var TMP_MESSAGING_OPERATION = "messaging.operation";
    var TMP_MESSAGING_CONSUMER_ID = "messaging.consumer_id";
    var TMP_MESSAGING_RABBITMQ_ROUTING_KEY = "messaging.rabbitmq.routing_key";
    var TMP_MESSAGING_KAFKA_MESSAGE_KEY = "messaging.kafka.message_key";
    var TMP_MESSAGING_KAFKA_CONSUMER_GROUP = "messaging.kafka.consumer_group";
    var TMP_MESSAGING_KAFKA_CLIENT_ID = "messaging.kafka.client_id";
    var TMP_MESSAGING_KAFKA_PARTITION = "messaging.kafka.partition";
    var TMP_MESSAGING_KAFKA_TOMBSTONE = "messaging.kafka.tombstone";
    var TMP_RPC_SYSTEM = "rpc.system";
    var TMP_RPC_SERVICE = "rpc.service";
    var TMP_RPC_METHOD = "rpc.method";
    var TMP_RPC_GRPC_STATUS_CODE = "rpc.grpc.status_code";
    var TMP_RPC_JSONRPC_VERSION = "rpc.jsonrpc.version";
    var TMP_RPC_JSONRPC_REQUEST_ID = "rpc.jsonrpc.request_id";
    var TMP_RPC_JSONRPC_ERROR_CODE = "rpc.jsonrpc.error_code";
    var TMP_RPC_JSONRPC_ERROR_MESSAGE = "rpc.jsonrpc.error_message";
    var TMP_MESSAGE_TYPE = "message.type";
    var TMP_MESSAGE_ID = "message.id";
    var TMP_MESSAGE_COMPRESSED_SIZE = "message.compressed_size";
    var TMP_MESSAGE_UNCOMPRESSED_SIZE = "message.uncompressed_size";
    var SEMATTRS_AWS_LAMBDA_INVOKED_ARN = TMP_AWS_LAMBDA_INVOKED_ARN;
    var SEMATTRS_DB_SYSTEM = TMP_DB_SYSTEM;
    var SEMATTRS_DB_CONNECTION_STRING = TMP_DB_CONNECTION_STRING;
    var SEMATTRS_DB_USER = TMP_DB_USER;
    var SEMATTRS_DB_JDBC_DRIVER_CLASSNAME = TMP_DB_JDBC_DRIVER_CLASSNAME;
    var SEMATTRS_DB_NAME = TMP_DB_NAME;
    var SEMATTRS_DB_STATEMENT = TMP_DB_STATEMENT;
    var SEMATTRS_DB_OPERATION = TMP_DB_OPERATION;
    var SEMATTRS_DB_MSSQL_INSTANCE_NAME = TMP_DB_MSSQL_INSTANCE_NAME;
    var SEMATTRS_DB_CASSANDRA_KEYSPACE = TMP_DB_CASSANDRA_KEYSPACE;
    var SEMATTRS_DB_CASSANDRA_PAGE_SIZE = TMP_DB_CASSANDRA_PAGE_SIZE;
    var SEMATTRS_DB_CASSANDRA_CONSISTENCY_LEVEL = TMP_DB_CASSANDRA_CONSISTENCY_LEVEL;
    var SEMATTRS_DB_CASSANDRA_TABLE = TMP_DB_CASSANDRA_TABLE;
    var SEMATTRS_DB_CASSANDRA_IDEMPOTENCE = TMP_DB_CASSANDRA_IDEMPOTENCE;
    var SEMATTRS_DB_CASSANDRA_SPECULATIVE_EXECUTION_COUNT = TMP_DB_CASSANDRA_SPECULATIVE_EXECUTION_COUNT;
    var SEMATTRS_DB_CASSANDRA_COORDINATOR_ID = TMP_DB_CASSANDRA_COORDINATOR_ID;
    var SEMATTRS_DB_CASSANDRA_COORDINATOR_DC = TMP_DB_CASSANDRA_COORDINATOR_DC;
    var SEMATTRS_DB_HBASE_NAMESPACE = TMP_DB_HBASE_NAMESPACE;
    var SEMATTRS_DB_REDIS_DATABASE_INDEX = TMP_DB_REDIS_DATABASE_INDEX;
    var SEMATTRS_DB_MONGODB_COLLECTION = TMP_DB_MONGODB_COLLECTION;
    var SEMATTRS_DB_SQL_TABLE = TMP_DB_SQL_TABLE;
    var SEMATTRS_EXCEPTION_TYPE = TMP_EXCEPTION_TYPE;
    var SEMATTRS_EXCEPTION_MESSAGE = TMP_EXCEPTION_MESSAGE;
    var SEMATTRS_EXCEPTION_STACKTRACE = TMP_EXCEPTION_STACKTRACE;
    var SEMATTRS_EXCEPTION_ESCAPED = TMP_EXCEPTION_ESCAPED;
    var SEMATTRS_FAAS_TRIGGER = TMP_FAAS_TRIGGER;
    var SEMATTRS_FAAS_EXECUTION = TMP_FAAS_EXECUTION;
    var SEMATTRS_FAAS_DOCUMENT_COLLECTION = TMP_FAAS_DOCUMENT_COLLECTION;
    var SEMATTRS_FAAS_DOCUMENT_OPERATION = TMP_FAAS_DOCUMENT_OPERATION;
    var SEMATTRS_FAAS_DOCUMENT_TIME = TMP_FAAS_DOCUMENT_TIME;
    var SEMATTRS_FAAS_DOCUMENT_NAME = TMP_FAAS_DOCUMENT_NAME;
    var SEMATTRS_FAAS_TIME = TMP_FAAS_TIME;
    var SEMATTRS_FAAS_CRON = TMP_FAAS_CRON;
    var SEMATTRS_FAAS_COLDSTART = TMP_FAAS_COLDSTART;
    var SEMATTRS_FAAS_INVOKED_NAME = TMP_FAAS_INVOKED_NAME;
    var SEMATTRS_FAAS_INVOKED_PROVIDER = TMP_FAAS_INVOKED_PROVIDER;
    var SEMATTRS_FAAS_INVOKED_REGION = TMP_FAAS_INVOKED_REGION;
    var SEMATTRS_NET_TRANSPORT = TMP_NET_TRANSPORT;
    var SEMATTRS_NET_PEER_IP = TMP_NET_PEER_IP;
    var SEMATTRS_NET_PEER_PORT = TMP_NET_PEER_PORT;
    var SEMATTRS_NET_PEER_NAME = TMP_NET_PEER_NAME;
    var SEMATTRS_NET_HOST_IP = TMP_NET_HOST_IP;
    var SEMATTRS_NET_HOST_PORT = TMP_NET_HOST_PORT;
    var SEMATTRS_NET_HOST_NAME = TMP_NET_HOST_NAME;
    var SEMATTRS_NET_HOST_CONNECTION_TYPE = TMP_NET_HOST_CONNECTION_TYPE;
    var SEMATTRS_NET_HOST_CONNECTION_SUBTYPE = TMP_NET_HOST_CONNECTION_SUBTYPE;
    var SEMATTRS_NET_HOST_CARRIER_NAME = TMP_NET_HOST_CARRIER_NAME;
    var SEMATTRS_NET_HOST_CARRIER_MCC = TMP_NET_HOST_CARRIER_MCC;
    var SEMATTRS_NET_HOST_CARRIER_MNC = TMP_NET_HOST_CARRIER_MNC;
    var SEMATTRS_NET_HOST_CARRIER_ICC = TMP_NET_HOST_CARRIER_ICC;
    var SEMATTRS_PEER_SERVICE = TMP_PEER_SERVICE;
    var SEMATTRS_ENDUSER_ID = TMP_ENDUSER_ID;
    var SEMATTRS_ENDUSER_ROLE = TMP_ENDUSER_ROLE;
    var SEMATTRS_ENDUSER_SCOPE = TMP_ENDUSER_SCOPE;
    var SEMATTRS_THREAD_ID = TMP_THREAD_ID;
    var SEMATTRS_THREAD_NAME = TMP_THREAD_NAME;
    var SEMATTRS_CODE_FUNCTION = TMP_CODE_FUNCTION;
    var SEMATTRS_CODE_NAMESPACE = TMP_CODE_NAMESPACE;
    var SEMATTRS_CODE_FILEPATH = TMP_CODE_FILEPATH;
    var SEMATTRS_CODE_LINENO = TMP_CODE_LINENO;
    var SEMATTRS_HTTP_METHOD = TMP_HTTP_METHOD;
    var SEMATTRS_HTTP_URL = TMP_HTTP_URL;
    var SEMATTRS_HTTP_TARGET = TMP_HTTP_TARGET;
    var SEMATTRS_HTTP_HOST = TMP_HTTP_HOST;
    var SEMATTRS_HTTP_SCHEME = TMP_HTTP_SCHEME;
    var SEMATTRS_HTTP_STATUS_CODE = TMP_HTTP_STATUS_CODE;
    var SEMATTRS_HTTP_FLAVOR = TMP_HTTP_FLAVOR;
    var SEMATTRS_HTTP_USER_AGENT = TMP_HTTP_USER_AGENT;
    var SEMATTRS_HTTP_REQUEST_CONTENT_LENGTH = TMP_HTTP_REQUEST_CONTENT_LENGTH;
    var SEMATTRS_HTTP_REQUEST_CONTENT_LENGTH_UNCOMPRESSED = TMP_HTTP_REQUEST_CONTENT_LENGTH_UNCOMPRESSED;
    var SEMATTRS_HTTP_RESPONSE_CONTENT_LENGTH = TMP_HTTP_RESPONSE_CONTENT_LENGTH;
    var SEMATTRS_HTTP_RESPONSE_CONTENT_LENGTH_UNCOMPRESSED = TMP_HTTP_RESPONSE_CONTENT_LENGTH_UNCOMPRESSED;
    var SEMATTRS_HTTP_SERVER_NAME = TMP_HTTP_SERVER_NAME;
    var SEMATTRS_HTTP_ROUTE = TMP_HTTP_ROUTE;
    var SEMATTRS_HTTP_CLIENT_IP = TMP_HTTP_CLIENT_IP;
    var SEMATTRS_AWS_DYNAMODB_TABLE_NAMES = TMP_AWS_DYNAMODB_TABLE_NAMES;
    var SEMATTRS_AWS_DYNAMODB_CONSUMED_CAPACITY = TMP_AWS_DYNAMODB_CONSUMED_CAPACITY;
    var SEMATTRS_AWS_DYNAMODB_ITEM_COLLECTION_METRICS = TMP_AWS_DYNAMODB_ITEM_COLLECTION_METRICS;
    var SEMATTRS_AWS_DYNAMODB_PROVISIONED_READ_CAPACITY = TMP_AWS_DYNAMODB_PROVISIONED_READ_CAPACITY;
    var SEMATTRS_AWS_DYNAMODB_PROVISIONED_WRITE_CAPACITY = TMP_AWS_DYNAMODB_PROVISIONED_WRITE_CAPACITY;
    var SEMATTRS_AWS_DYNAMODB_CONSISTENT_READ = TMP_AWS_DYNAMODB_CONSISTENT_READ;
    var SEMATTRS_AWS_DYNAMODB_PROJECTION = TMP_AWS_DYNAMODB_PROJECTION;
    var SEMATTRS_AWS_DYNAMODB_LIMIT = TMP_AWS_DYNAMODB_LIMIT;
    var SEMATTRS_AWS_DYNAMODB_ATTRIBUTES_TO_GET = TMP_AWS_DYNAMODB_ATTRIBUTES_TO_GET;
    var SEMATTRS_AWS_DYNAMODB_INDEX_NAME = TMP_AWS_DYNAMODB_INDEX_NAME;
    var SEMATTRS_AWS_DYNAMODB_SELECT = TMP_AWS_DYNAMODB_SELECT;
    var SEMATTRS_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEXES = TMP_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEXES;
    var SEMATTRS_AWS_DYNAMODB_LOCAL_SECONDARY_INDEXES = TMP_AWS_DYNAMODB_LOCAL_SECONDARY_INDEXES;
    var SEMATTRS_AWS_DYNAMODB_EXCLUSIVE_START_TABLE = TMP_AWS_DYNAMODB_EXCLUSIVE_START_TABLE;
    var SEMATTRS_AWS_DYNAMODB_TABLE_COUNT = TMP_AWS_DYNAMODB_TABLE_COUNT;
    var SEMATTRS_AWS_DYNAMODB_SCAN_FORWARD = TMP_AWS_DYNAMODB_SCAN_FORWARD;
    var SEMATTRS_AWS_DYNAMODB_SEGMENT = TMP_AWS_DYNAMODB_SEGMENT;
    var SEMATTRS_AWS_DYNAMODB_TOTAL_SEGMENTS = TMP_AWS_DYNAMODB_TOTAL_SEGMENTS;
    var SEMATTRS_AWS_DYNAMODB_COUNT = TMP_AWS_DYNAMODB_COUNT;
    var SEMATTRS_AWS_DYNAMODB_SCANNED_COUNT = TMP_AWS_DYNAMODB_SCANNED_COUNT;
    var SEMATTRS_AWS_DYNAMODB_ATTRIBUTE_DEFINITIONS = TMP_AWS_DYNAMODB_ATTRIBUTE_DEFINITIONS;
    var SEMATTRS_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEX_UPDATES = TMP_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEX_UPDATES;
    var SEMATTRS_MESSAGING_SYSTEM = TMP_MESSAGING_SYSTEM;
    var SEMATTRS_MESSAGING_DESTINATION = TMP_MESSAGING_DESTINATION;
    var SEMATTRS_MESSAGING_DESTINATION_KIND = TMP_MESSAGING_DESTINATION_KIND;
    var SEMATTRS_MESSAGING_TEMP_DESTINATION = TMP_MESSAGING_TEMP_DESTINATION;
    var SEMATTRS_MESSAGING_PROTOCOL = TMP_MESSAGING_PROTOCOL;
    var SEMATTRS_MESSAGING_PROTOCOL_VERSION = TMP_MESSAGING_PROTOCOL_VERSION;
    var SEMATTRS_MESSAGING_URL = TMP_MESSAGING_URL;
    var SEMATTRS_MESSAGING_MESSAGE_ID = TMP_MESSAGING_MESSAGE_ID;
    var SEMATTRS_MESSAGING_CONVERSATION_ID = TMP_MESSAGING_CONVERSATION_ID;
    var SEMATTRS_MESSAGING_MESSAGE_PAYLOAD_SIZE_BYTES = TMP_MESSAGING_MESSAGE_PAYLOAD_SIZE_BYTES;
    var SEMATTRS_MESSAGING_MESSAGE_PAYLOAD_COMPRESSED_SIZE_BYTES = TMP_MESSAGING_MESSAGE_PAYLOAD_COMPRESSED_SIZE_BYTES;
    var SEMATTRS_MESSAGING_OPERATION = TMP_MESSAGING_OPERATION;
    var SEMATTRS_MESSAGING_CONSUMER_ID = TMP_MESSAGING_CONSUMER_ID;
    var SEMATTRS_MESSAGING_RABBITMQ_ROUTING_KEY = TMP_MESSAGING_RABBITMQ_ROUTING_KEY;
    var SEMATTRS_MESSAGING_KAFKA_MESSAGE_KEY = TMP_MESSAGING_KAFKA_MESSAGE_KEY;
    var SEMATTRS_MESSAGING_KAFKA_CONSUMER_GROUP = TMP_MESSAGING_KAFKA_CONSUMER_GROUP;
    var SEMATTRS_MESSAGING_KAFKA_CLIENT_ID = TMP_MESSAGING_KAFKA_CLIENT_ID;
    var SEMATTRS_MESSAGING_KAFKA_PARTITION = TMP_MESSAGING_KAFKA_PARTITION;
    var SEMATTRS_MESSAGING_KAFKA_TOMBSTONE = TMP_MESSAGING_KAFKA_TOMBSTONE;
    var SEMATTRS_RPC_SYSTEM = TMP_RPC_SYSTEM;
    var SEMATTRS_RPC_SERVICE = TMP_RPC_SERVICE;
    var SEMATTRS_RPC_METHOD = TMP_RPC_METHOD;
    var SEMATTRS_RPC_GRPC_STATUS_CODE = TMP_RPC_GRPC_STATUS_CODE;
    var SEMATTRS_RPC_JSONRPC_VERSION = TMP_RPC_JSONRPC_VERSION;
    var SEMATTRS_RPC_JSONRPC_REQUEST_ID = TMP_RPC_JSONRPC_REQUEST_ID;
    var SEMATTRS_RPC_JSONRPC_ERROR_CODE = TMP_RPC_JSONRPC_ERROR_CODE;
    var SEMATTRS_RPC_JSONRPC_ERROR_MESSAGE = TMP_RPC_JSONRPC_ERROR_MESSAGE;
    var SEMATTRS_MESSAGE_TYPE = TMP_MESSAGE_TYPE;
    var SEMATTRS_MESSAGE_ID = TMP_MESSAGE_ID;
    var SEMATTRS_MESSAGE_COMPRESSED_SIZE = TMP_MESSAGE_COMPRESSED_SIZE;
    var SEMATTRS_MESSAGE_UNCOMPRESSED_SIZE = TMP_MESSAGE_UNCOMPRESSED_SIZE;
    var SemanticAttributes = /* @__PURE__ */ require_utils13.createConstMap([
      TMP_AWS_LAMBDA_INVOKED_ARN,
      TMP_DB_SYSTEM,
      TMP_DB_CONNECTION_STRING,
      TMP_DB_USER,
      TMP_DB_JDBC_DRIVER_CLASSNAME,
      TMP_DB_NAME,
      TMP_DB_STATEMENT,
      TMP_DB_OPERATION,
      TMP_DB_MSSQL_INSTANCE_NAME,
      TMP_DB_CASSANDRA_KEYSPACE,
      TMP_DB_CASSANDRA_PAGE_SIZE,
      TMP_DB_CASSANDRA_CONSISTENCY_LEVEL,
      TMP_DB_CASSANDRA_TABLE,
      TMP_DB_CASSANDRA_IDEMPOTENCE,
      TMP_DB_CASSANDRA_SPECULATIVE_EXECUTION_COUNT,
      TMP_DB_CASSANDRA_COORDINATOR_ID,
      TMP_DB_CASSANDRA_COORDINATOR_DC,
      TMP_DB_HBASE_NAMESPACE,
      TMP_DB_REDIS_DATABASE_INDEX,
      TMP_DB_MONGODB_COLLECTION,
      TMP_DB_SQL_TABLE,
      TMP_EXCEPTION_TYPE,
      TMP_EXCEPTION_MESSAGE,
      TMP_EXCEPTION_STACKTRACE,
      TMP_EXCEPTION_ESCAPED,
      TMP_FAAS_TRIGGER,
      TMP_FAAS_EXECUTION,
      TMP_FAAS_DOCUMENT_COLLECTION,
      TMP_FAAS_DOCUMENT_OPERATION,
      TMP_FAAS_DOCUMENT_TIME,
      TMP_FAAS_DOCUMENT_NAME,
      TMP_FAAS_TIME,
      TMP_FAAS_CRON,
      TMP_FAAS_COLDSTART,
      TMP_FAAS_INVOKED_NAME,
      TMP_FAAS_INVOKED_PROVIDER,
      TMP_FAAS_INVOKED_REGION,
      TMP_NET_TRANSPORT,
      TMP_NET_PEER_IP,
      TMP_NET_PEER_PORT,
      TMP_NET_PEER_NAME,
      TMP_NET_HOST_IP,
      TMP_NET_HOST_PORT,
      TMP_NET_HOST_NAME,
      TMP_NET_HOST_CONNECTION_TYPE,
      TMP_NET_HOST_CONNECTION_SUBTYPE,
      TMP_NET_HOST_CARRIER_NAME,
      TMP_NET_HOST_CARRIER_MCC,
      TMP_NET_HOST_CARRIER_MNC,
      TMP_NET_HOST_CARRIER_ICC,
      TMP_PEER_SERVICE,
      TMP_ENDUSER_ID,
      TMP_ENDUSER_ROLE,
      TMP_ENDUSER_SCOPE,
      TMP_THREAD_ID,
      TMP_THREAD_NAME,
      TMP_CODE_FUNCTION,
      TMP_CODE_NAMESPACE,
      TMP_CODE_FILEPATH,
      TMP_CODE_LINENO,
      TMP_HTTP_METHOD,
      TMP_HTTP_URL,
      TMP_HTTP_TARGET,
      TMP_HTTP_HOST,
      TMP_HTTP_SCHEME,
      TMP_HTTP_STATUS_CODE,
      TMP_HTTP_FLAVOR,
      TMP_HTTP_USER_AGENT,
      TMP_HTTP_REQUEST_CONTENT_LENGTH,
      TMP_HTTP_REQUEST_CONTENT_LENGTH_UNCOMPRESSED,
      TMP_HTTP_RESPONSE_CONTENT_LENGTH,
      TMP_HTTP_RESPONSE_CONTENT_LENGTH_UNCOMPRESSED,
      TMP_HTTP_SERVER_NAME,
      TMP_HTTP_ROUTE,
      TMP_HTTP_CLIENT_IP,
      TMP_AWS_DYNAMODB_TABLE_NAMES,
      TMP_AWS_DYNAMODB_CONSUMED_CAPACITY,
      TMP_AWS_DYNAMODB_ITEM_COLLECTION_METRICS,
      TMP_AWS_DYNAMODB_PROVISIONED_READ_CAPACITY,
      TMP_AWS_DYNAMODB_PROVISIONED_WRITE_CAPACITY,
      TMP_AWS_DYNAMODB_CONSISTENT_READ,
      TMP_AWS_DYNAMODB_PROJECTION,
      TMP_AWS_DYNAMODB_LIMIT,
      TMP_AWS_DYNAMODB_ATTRIBUTES_TO_GET,
      TMP_AWS_DYNAMODB_INDEX_NAME,
      TMP_AWS_DYNAMODB_SELECT,
      TMP_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEXES,
      TMP_AWS_DYNAMODB_LOCAL_SECONDARY_INDEXES,
      TMP_AWS_DYNAMODB_EXCLUSIVE_START_TABLE,
      TMP_AWS_DYNAMODB_TABLE_COUNT,
      TMP_AWS_DYNAMODB_SCAN_FORWARD,
      TMP_AWS_DYNAMODB_SEGMENT,
      TMP_AWS_DYNAMODB_TOTAL_SEGMENTS,
      TMP_AWS_DYNAMODB_COUNT,
      TMP_AWS_DYNAMODB_SCANNED_COUNT,
      TMP_AWS_DYNAMODB_ATTRIBUTE_DEFINITIONS,
      TMP_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEX_UPDATES,
      TMP_MESSAGING_SYSTEM,
      TMP_MESSAGING_DESTINATION,
      TMP_MESSAGING_DESTINATION_KIND,
      TMP_MESSAGING_TEMP_DESTINATION,
      TMP_MESSAGING_PROTOCOL,
      TMP_MESSAGING_PROTOCOL_VERSION,
      TMP_MESSAGING_URL,
      TMP_MESSAGING_MESSAGE_ID,
      TMP_MESSAGING_CONVERSATION_ID,
      TMP_MESSAGING_MESSAGE_PAYLOAD_SIZE_BYTES,
      TMP_MESSAGING_MESSAGE_PAYLOAD_COMPRESSED_SIZE_BYTES,
      TMP_MESSAGING_OPERATION,
      TMP_MESSAGING_CONSUMER_ID,
      TMP_MESSAGING_RABBITMQ_ROUTING_KEY,
      TMP_MESSAGING_KAFKA_MESSAGE_KEY,
      TMP_MESSAGING_KAFKA_CONSUMER_GROUP,
      TMP_MESSAGING_KAFKA_CLIENT_ID,
      TMP_MESSAGING_KAFKA_PARTITION,
      TMP_MESSAGING_KAFKA_TOMBSTONE,
      TMP_RPC_SYSTEM,
      TMP_RPC_SERVICE,
      TMP_RPC_METHOD,
      TMP_RPC_GRPC_STATUS_CODE,
      TMP_RPC_JSONRPC_VERSION,
      TMP_RPC_JSONRPC_REQUEST_ID,
      TMP_RPC_JSONRPC_ERROR_CODE,
      TMP_RPC_JSONRPC_ERROR_MESSAGE,
      TMP_MESSAGE_TYPE,
      TMP_MESSAGE_ID,
      TMP_MESSAGE_COMPRESSED_SIZE,
      TMP_MESSAGE_UNCOMPRESSED_SIZE
    ]);
    var TMP_DBSYSTEMVALUES_OTHER_SQL = "other_sql";
    var TMP_DBSYSTEMVALUES_MSSQL = "mssql";
    var TMP_DBSYSTEMVALUES_MYSQL = "mysql";
    var TMP_DBSYSTEMVALUES_ORACLE = "oracle";
    var TMP_DBSYSTEMVALUES_DB2 = "db2";
    var TMP_DBSYSTEMVALUES_POSTGRESQL = "postgresql";
    var TMP_DBSYSTEMVALUES_REDSHIFT = "redshift";
    var TMP_DBSYSTEMVALUES_HIVE = "hive";
    var TMP_DBSYSTEMVALUES_CLOUDSCAPE = "cloudscape";
    var TMP_DBSYSTEMVALUES_HSQLDB = "hsqldb";
    var TMP_DBSYSTEMVALUES_PROGRESS = "progress";
    var TMP_DBSYSTEMVALUES_MAXDB = "maxdb";
    var TMP_DBSYSTEMVALUES_HANADB = "hanadb";
    var TMP_DBSYSTEMVALUES_INGRES = "ingres";
    var TMP_DBSYSTEMVALUES_FIRSTSQL = "firstsql";
    var TMP_DBSYSTEMVALUES_EDB = "edb";
    var TMP_DBSYSTEMVALUES_CACHE = "cache";
    var TMP_DBSYSTEMVALUES_ADABAS = "adabas";
    var TMP_DBSYSTEMVALUES_FIREBIRD = "firebird";
    var TMP_DBSYSTEMVALUES_DERBY = "derby";
    var TMP_DBSYSTEMVALUES_FILEMAKER = "filemaker";
    var TMP_DBSYSTEMVALUES_INFORMIX = "informix";
    var TMP_DBSYSTEMVALUES_INSTANTDB = "instantdb";
    var TMP_DBSYSTEMVALUES_INTERBASE = "interbase";
    var TMP_DBSYSTEMVALUES_MARIADB = "mariadb";
    var TMP_DBSYSTEMVALUES_NETEZZA = "netezza";
    var TMP_DBSYSTEMVALUES_PERVASIVE = "pervasive";
    var TMP_DBSYSTEMVALUES_POINTBASE = "pointbase";
    var TMP_DBSYSTEMVALUES_SQLITE = "sqlite";
    var TMP_DBSYSTEMVALUES_SYBASE = "sybase";
    var TMP_DBSYSTEMVALUES_TERADATA = "teradata";
    var TMP_DBSYSTEMVALUES_VERTICA = "vertica";
    var TMP_DBSYSTEMVALUES_H2 = "h2";
    var TMP_DBSYSTEMVALUES_COLDFUSION = "coldfusion";
    var TMP_DBSYSTEMVALUES_CASSANDRA = "cassandra";
    var TMP_DBSYSTEMVALUES_HBASE = "hbase";
    var TMP_DBSYSTEMVALUES_MONGODB = "mongodb";
    var TMP_DBSYSTEMVALUES_REDIS = "redis";
    var TMP_DBSYSTEMVALUES_COUCHBASE = "couchbase";
    var TMP_DBSYSTEMVALUES_COUCHDB = "couchdb";
    var TMP_DBSYSTEMVALUES_COSMOSDB = "cosmosdb";
    var TMP_DBSYSTEMVALUES_DYNAMODB = "dynamodb";
    var TMP_DBSYSTEMVALUES_NEO4J = "neo4j";
    var TMP_DBSYSTEMVALUES_GEODE = "geode";
    var TMP_DBSYSTEMVALUES_ELASTICSEARCH = "elasticsearch";
    var TMP_DBSYSTEMVALUES_MEMCACHED = "memcached";
    var TMP_DBSYSTEMVALUES_COCKROACHDB = "cockroachdb";
    var DBSYSTEMVALUES_OTHER_SQL = TMP_DBSYSTEMVALUES_OTHER_SQL;
    var DBSYSTEMVALUES_MSSQL = TMP_DBSYSTEMVALUES_MSSQL;
    var DBSYSTEMVALUES_MYSQL = TMP_DBSYSTEMVALUES_MYSQL;
    var DBSYSTEMVALUES_ORACLE = TMP_DBSYSTEMVALUES_ORACLE;
    var DBSYSTEMVALUES_DB2 = TMP_DBSYSTEMVALUES_DB2;
    var DBSYSTEMVALUES_POSTGRESQL = TMP_DBSYSTEMVALUES_POSTGRESQL;
    var DBSYSTEMVALUES_REDSHIFT = TMP_DBSYSTEMVALUES_REDSHIFT;
    var DBSYSTEMVALUES_HIVE = TMP_DBSYSTEMVALUES_HIVE;
    var DBSYSTEMVALUES_CLOUDSCAPE = TMP_DBSYSTEMVALUES_CLOUDSCAPE;
    var DBSYSTEMVALUES_HSQLDB = TMP_DBSYSTEMVALUES_HSQLDB;
    var DBSYSTEMVALUES_PROGRESS = TMP_DBSYSTEMVALUES_PROGRESS;
    var DBSYSTEMVALUES_MAXDB = TMP_DBSYSTEMVALUES_MAXDB;
    var DBSYSTEMVALUES_HANADB = TMP_DBSYSTEMVALUES_HANADB;
    var DBSYSTEMVALUES_INGRES = TMP_DBSYSTEMVALUES_INGRES;
    var DBSYSTEMVALUES_FIRSTSQL = TMP_DBSYSTEMVALUES_FIRSTSQL;
    var DBSYSTEMVALUES_EDB = TMP_DBSYSTEMVALUES_EDB;
    var DBSYSTEMVALUES_CACHE = TMP_DBSYSTEMVALUES_CACHE;
    var DBSYSTEMVALUES_ADABAS = TMP_DBSYSTEMVALUES_ADABAS;
    var DBSYSTEMVALUES_FIREBIRD = TMP_DBSYSTEMVALUES_FIREBIRD;
    var DBSYSTEMVALUES_DERBY = TMP_DBSYSTEMVALUES_DERBY;
    var DBSYSTEMVALUES_FILEMAKER = TMP_DBSYSTEMVALUES_FILEMAKER;
    var DBSYSTEMVALUES_INFORMIX = TMP_DBSYSTEMVALUES_INFORMIX;
    var DBSYSTEMVALUES_INSTANTDB = TMP_DBSYSTEMVALUES_INSTANTDB;
    var DBSYSTEMVALUES_INTERBASE = TMP_DBSYSTEMVALUES_INTERBASE;
    var DBSYSTEMVALUES_MARIADB = TMP_DBSYSTEMVALUES_MARIADB;
    var DBSYSTEMVALUES_NETEZZA = TMP_DBSYSTEMVALUES_NETEZZA;
    var DBSYSTEMVALUES_PERVASIVE = TMP_DBSYSTEMVALUES_PERVASIVE;
    var DBSYSTEMVALUES_POINTBASE = TMP_DBSYSTEMVALUES_POINTBASE;
    var DBSYSTEMVALUES_SQLITE = TMP_DBSYSTEMVALUES_SQLITE;
    var DBSYSTEMVALUES_SYBASE = TMP_DBSYSTEMVALUES_SYBASE;
    var DBSYSTEMVALUES_TERADATA = TMP_DBSYSTEMVALUES_TERADATA;
    var DBSYSTEMVALUES_VERTICA = TMP_DBSYSTEMVALUES_VERTICA;
    var DBSYSTEMVALUES_H2 = TMP_DBSYSTEMVALUES_H2;
    var DBSYSTEMVALUES_COLDFUSION = TMP_DBSYSTEMVALUES_COLDFUSION;
    var DBSYSTEMVALUES_CASSANDRA = TMP_DBSYSTEMVALUES_CASSANDRA;
    var DBSYSTEMVALUES_HBASE = TMP_DBSYSTEMVALUES_HBASE;
    var DBSYSTEMVALUES_MONGODB = TMP_DBSYSTEMVALUES_MONGODB;
    var DBSYSTEMVALUES_REDIS = TMP_DBSYSTEMVALUES_REDIS;
    var DBSYSTEMVALUES_COUCHBASE = TMP_DBSYSTEMVALUES_COUCHBASE;
    var DBSYSTEMVALUES_COUCHDB = TMP_DBSYSTEMVALUES_COUCHDB;
    var DBSYSTEMVALUES_COSMOSDB = TMP_DBSYSTEMVALUES_COSMOSDB;
    var DBSYSTEMVALUES_DYNAMODB = TMP_DBSYSTEMVALUES_DYNAMODB;
    var DBSYSTEMVALUES_NEO4J = TMP_DBSYSTEMVALUES_NEO4J;
    var DBSYSTEMVALUES_GEODE = TMP_DBSYSTEMVALUES_GEODE;
    var DBSYSTEMVALUES_ELASTICSEARCH = TMP_DBSYSTEMVALUES_ELASTICSEARCH;
    var DBSYSTEMVALUES_MEMCACHED = TMP_DBSYSTEMVALUES_MEMCACHED;
    var DBSYSTEMVALUES_COCKROACHDB = TMP_DBSYSTEMVALUES_COCKROACHDB;
    var DbSystemValues = /* @__PURE__ */ require_utils13.createConstMap([
      TMP_DBSYSTEMVALUES_OTHER_SQL,
      TMP_DBSYSTEMVALUES_MSSQL,
      TMP_DBSYSTEMVALUES_MYSQL,
      TMP_DBSYSTEMVALUES_ORACLE,
      TMP_DBSYSTEMVALUES_DB2,
      TMP_DBSYSTEMVALUES_POSTGRESQL,
      TMP_DBSYSTEMVALUES_REDSHIFT,
      TMP_DBSYSTEMVALUES_HIVE,
      TMP_DBSYSTEMVALUES_CLOUDSCAPE,
      TMP_DBSYSTEMVALUES_HSQLDB,
      TMP_DBSYSTEMVALUES_PROGRESS,
      TMP_DBSYSTEMVALUES_MAXDB,
      TMP_DBSYSTEMVALUES_HANADB,
      TMP_DBSYSTEMVALUES_INGRES,
      TMP_DBSYSTEMVALUES_FIRSTSQL,
      TMP_DBSYSTEMVALUES_EDB,
      TMP_DBSYSTEMVALUES_CACHE,
      TMP_DBSYSTEMVALUES_ADABAS,
      TMP_DBSYSTEMVALUES_FIREBIRD,
      TMP_DBSYSTEMVALUES_DERBY,
      TMP_DBSYSTEMVALUES_FILEMAKER,
      TMP_DBSYSTEMVALUES_INFORMIX,
      TMP_DBSYSTEMVALUES_INSTANTDB,
      TMP_DBSYSTEMVALUES_INTERBASE,
      TMP_DBSYSTEMVALUES_MARIADB,
      TMP_DBSYSTEMVALUES_NETEZZA,
      TMP_DBSYSTEMVALUES_PERVASIVE,
      TMP_DBSYSTEMVALUES_POINTBASE,
      TMP_DBSYSTEMVALUES_SQLITE,
      TMP_DBSYSTEMVALUES_SYBASE,
      TMP_DBSYSTEMVALUES_TERADATA,
      TMP_DBSYSTEMVALUES_VERTICA,
      TMP_DBSYSTEMVALUES_H2,
      TMP_DBSYSTEMVALUES_COLDFUSION,
      TMP_DBSYSTEMVALUES_CASSANDRA,
      TMP_DBSYSTEMVALUES_HBASE,
      TMP_DBSYSTEMVALUES_MONGODB,
      TMP_DBSYSTEMVALUES_REDIS,
      TMP_DBSYSTEMVALUES_COUCHBASE,
      TMP_DBSYSTEMVALUES_COUCHDB,
      TMP_DBSYSTEMVALUES_COSMOSDB,
      TMP_DBSYSTEMVALUES_DYNAMODB,
      TMP_DBSYSTEMVALUES_NEO4J,
      TMP_DBSYSTEMVALUES_GEODE,
      TMP_DBSYSTEMVALUES_ELASTICSEARCH,
      TMP_DBSYSTEMVALUES_MEMCACHED,
      TMP_DBSYSTEMVALUES_COCKROACHDB
    ]);
    var TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ALL = "all";
    var TMP_DBCASSANDRACONSISTENCYLEVELVALUES_EACH_QUORUM = "each_quorum";
    var TMP_DBCASSANDRACONSISTENCYLEVELVALUES_QUORUM = "quorum";
    var TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_QUORUM = "local_quorum";
    var TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ONE = "one";
    var TMP_DBCASSANDRACONSISTENCYLEVELVALUES_TWO = "two";
    var TMP_DBCASSANDRACONSISTENCYLEVELVALUES_THREE = "three";
    var TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_ONE = "local_one";
    var TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ANY = "any";
    var TMP_DBCASSANDRACONSISTENCYLEVELVALUES_SERIAL = "serial";
    var TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_SERIAL = "local_serial";
    var DBCASSANDRACONSISTENCYLEVELVALUES_ALL = TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ALL;
    var DBCASSANDRACONSISTENCYLEVELVALUES_EACH_QUORUM = TMP_DBCASSANDRACONSISTENCYLEVELVALUES_EACH_QUORUM;
    var DBCASSANDRACONSISTENCYLEVELVALUES_QUORUM = TMP_DBCASSANDRACONSISTENCYLEVELVALUES_QUORUM;
    var DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_QUORUM = TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_QUORUM;
    var DBCASSANDRACONSISTENCYLEVELVALUES_ONE = TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ONE;
    var DBCASSANDRACONSISTENCYLEVELVALUES_TWO = TMP_DBCASSANDRACONSISTENCYLEVELVALUES_TWO;
    var DBCASSANDRACONSISTENCYLEVELVALUES_THREE = TMP_DBCASSANDRACONSISTENCYLEVELVALUES_THREE;
    var DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_ONE = TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_ONE;
    var DBCASSANDRACONSISTENCYLEVELVALUES_ANY = TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ANY;
    var DBCASSANDRACONSISTENCYLEVELVALUES_SERIAL = TMP_DBCASSANDRACONSISTENCYLEVELVALUES_SERIAL;
    var DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_SERIAL = TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_SERIAL;
    var DbCassandraConsistencyLevelValues = /* @__PURE__ */ require_utils13.createConstMap([
      TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ALL,
      TMP_DBCASSANDRACONSISTENCYLEVELVALUES_EACH_QUORUM,
      TMP_DBCASSANDRACONSISTENCYLEVELVALUES_QUORUM,
      TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_QUORUM,
      TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ONE,
      TMP_DBCASSANDRACONSISTENCYLEVELVALUES_TWO,
      TMP_DBCASSANDRACONSISTENCYLEVELVALUES_THREE,
      TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_ONE,
      TMP_DBCASSANDRACONSISTENCYLEVELVALUES_ANY,
      TMP_DBCASSANDRACONSISTENCYLEVELVALUES_SERIAL,
      TMP_DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_SERIAL
    ]);
    var TMP_FAASTRIGGERVALUES_DATASOURCE = "datasource";
    var TMP_FAASTRIGGERVALUES_HTTP = "http";
    var TMP_FAASTRIGGERVALUES_PUBSUB = "pubsub";
    var TMP_FAASTRIGGERVALUES_TIMER = "timer";
    var TMP_FAASTRIGGERVALUES_OTHER = "other";
    var FAASTRIGGERVALUES_DATASOURCE = TMP_FAASTRIGGERVALUES_DATASOURCE;
    var FAASTRIGGERVALUES_HTTP = TMP_FAASTRIGGERVALUES_HTTP;
    var FAASTRIGGERVALUES_PUBSUB = TMP_FAASTRIGGERVALUES_PUBSUB;
    var FAASTRIGGERVALUES_TIMER = TMP_FAASTRIGGERVALUES_TIMER;
    var FAASTRIGGERVALUES_OTHER = TMP_FAASTRIGGERVALUES_OTHER;
    var FaasTriggerValues = /* @__PURE__ */ require_utils13.createConstMap([
      TMP_FAASTRIGGERVALUES_DATASOURCE,
      TMP_FAASTRIGGERVALUES_HTTP,
      TMP_FAASTRIGGERVALUES_PUBSUB,
      TMP_FAASTRIGGERVALUES_TIMER,
      TMP_FAASTRIGGERVALUES_OTHER
    ]);
    var TMP_FAASDOCUMENTOPERATIONVALUES_INSERT = "insert";
    var TMP_FAASDOCUMENTOPERATIONVALUES_EDIT = "edit";
    var TMP_FAASDOCUMENTOPERATIONVALUES_DELETE = "delete";
    var FAASDOCUMENTOPERATIONVALUES_INSERT = TMP_FAASDOCUMENTOPERATIONVALUES_INSERT;
    var FAASDOCUMENTOPERATIONVALUES_EDIT = TMP_FAASDOCUMENTOPERATIONVALUES_EDIT;
    var FAASDOCUMENTOPERATIONVALUES_DELETE = TMP_FAASDOCUMENTOPERATIONVALUES_DELETE;
    var FaasDocumentOperationValues = /* @__PURE__ */ require_utils13.createConstMap([
      TMP_FAASDOCUMENTOPERATIONVALUES_INSERT,
      TMP_FAASDOCUMENTOPERATIONVALUES_EDIT,
      TMP_FAASDOCUMENTOPERATIONVALUES_DELETE
    ]);
    var TMP_FAASINVOKEDPROVIDERVALUES_ALIBABA_CLOUD = "alibaba_cloud";
    var TMP_FAASINVOKEDPROVIDERVALUES_AWS = "aws";
    var TMP_FAASINVOKEDPROVIDERVALUES_AZURE = "azure";
    var TMP_FAASINVOKEDPROVIDERVALUES_GCP = "gcp";
    var FAASINVOKEDPROVIDERVALUES_ALIBABA_CLOUD = TMP_FAASINVOKEDPROVIDERVALUES_ALIBABA_CLOUD;
    var FAASINVOKEDPROVIDERVALUES_AWS = TMP_FAASINVOKEDPROVIDERVALUES_AWS;
    var FAASINVOKEDPROVIDERVALUES_AZURE = TMP_FAASINVOKEDPROVIDERVALUES_AZURE;
    var FAASINVOKEDPROVIDERVALUES_GCP = TMP_FAASINVOKEDPROVIDERVALUES_GCP;
    var FaasInvokedProviderValues = /* @__PURE__ */ require_utils13.createConstMap([
      TMP_FAASINVOKEDPROVIDERVALUES_ALIBABA_CLOUD,
      TMP_FAASINVOKEDPROVIDERVALUES_AWS,
      TMP_FAASINVOKEDPROVIDERVALUES_AZURE,
      TMP_FAASINVOKEDPROVIDERVALUES_GCP
    ]);
    var TMP_NETTRANSPORTVALUES_IP_TCP = "ip_tcp";
    var TMP_NETTRANSPORTVALUES_IP_UDP = "ip_udp";
    var TMP_NETTRANSPORTVALUES_IP = "ip";
    var TMP_NETTRANSPORTVALUES_UNIX = "unix";
    var TMP_NETTRANSPORTVALUES_PIPE = "pipe";
    var TMP_NETTRANSPORTVALUES_INPROC = "inproc";
    var TMP_NETTRANSPORTVALUES_OTHER = "other";
    var NETTRANSPORTVALUES_IP_TCP = TMP_NETTRANSPORTVALUES_IP_TCP;
    var NETTRANSPORTVALUES_IP_UDP = TMP_NETTRANSPORTVALUES_IP_UDP;
    var NETTRANSPORTVALUES_IP = TMP_NETTRANSPORTVALUES_IP;
    var NETTRANSPORTVALUES_UNIX = TMP_NETTRANSPORTVALUES_UNIX;
    var NETTRANSPORTVALUES_PIPE = TMP_NETTRANSPORTVALUES_PIPE;
    var NETTRANSPORTVALUES_INPROC = TMP_NETTRANSPORTVALUES_INPROC;
    var NETTRANSPORTVALUES_OTHER = TMP_NETTRANSPORTVALUES_OTHER;
    var NetTransportValues = /* @__PURE__ */ require_utils13.createConstMap([
      TMP_NETTRANSPORTVALUES_IP_TCP,
      TMP_NETTRANSPORTVALUES_IP_UDP,
      TMP_NETTRANSPORTVALUES_IP,
      TMP_NETTRANSPORTVALUES_UNIX,
      TMP_NETTRANSPORTVALUES_PIPE,
      TMP_NETTRANSPORTVALUES_INPROC,
      TMP_NETTRANSPORTVALUES_OTHER
    ]);
    var TMP_NETHOSTCONNECTIONTYPEVALUES_WIFI = "wifi";
    var TMP_NETHOSTCONNECTIONTYPEVALUES_WIRED = "wired";
    var TMP_NETHOSTCONNECTIONTYPEVALUES_CELL = "cell";
    var TMP_NETHOSTCONNECTIONTYPEVALUES_UNAVAILABLE = "unavailable";
    var TMP_NETHOSTCONNECTIONTYPEVALUES_UNKNOWN = "unknown";
    var NETHOSTCONNECTIONTYPEVALUES_WIFI = TMP_NETHOSTCONNECTIONTYPEVALUES_WIFI;
    var NETHOSTCONNECTIONTYPEVALUES_WIRED = TMP_NETHOSTCONNECTIONTYPEVALUES_WIRED;
    var NETHOSTCONNECTIONTYPEVALUES_CELL = TMP_NETHOSTCONNECTIONTYPEVALUES_CELL;
    var NETHOSTCONNECTIONTYPEVALUES_UNAVAILABLE = TMP_NETHOSTCONNECTIONTYPEVALUES_UNAVAILABLE;
    var NETHOSTCONNECTIONTYPEVALUES_UNKNOWN = TMP_NETHOSTCONNECTIONTYPEVALUES_UNKNOWN;
    var NetHostConnectionTypeValues = /* @__PURE__ */ require_utils13.createConstMap([
      TMP_NETHOSTCONNECTIONTYPEVALUES_WIFI,
      TMP_NETHOSTCONNECTIONTYPEVALUES_WIRED,
      TMP_NETHOSTCONNECTIONTYPEVALUES_CELL,
      TMP_NETHOSTCONNECTIONTYPEVALUES_UNAVAILABLE,
      TMP_NETHOSTCONNECTIONTYPEVALUES_UNKNOWN
    ]);
    var TMP_NETHOSTCONNECTIONSUBTYPEVALUES_GPRS = "gprs";
    var TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EDGE = "edge";
    var TMP_NETHOSTCONNECTIONSUBTYPEVALUES_UMTS = "umts";
    var TMP_NETHOSTCONNECTIONSUBTYPEVALUES_CDMA = "cdma";
    var TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_0 = "evdo_0";
    var TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_A = "evdo_a";
    var TMP_NETHOSTCONNECTIONSUBTYPEVALUES_CDMA2000_1XRTT = "cdma2000_1xrtt";
    var TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSDPA = "hsdpa";
    var TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSUPA = "hsupa";
    var TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSPA = "hspa";
    var TMP_NETHOSTCONNECTIONSUBTYPEVALUES_IDEN = "iden";
    var TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_B = "evdo_b";
    var TMP_NETHOSTCONNECTIONSUBTYPEVALUES_LTE = "lte";
    var TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EHRPD = "ehrpd";
    var TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSPAP = "hspap";
    var TMP_NETHOSTCONNECTIONSUBTYPEVALUES_GSM = "gsm";
    var TMP_NETHOSTCONNECTIONSUBTYPEVALUES_TD_SCDMA = "td_scdma";
    var TMP_NETHOSTCONNECTIONSUBTYPEVALUES_IWLAN = "iwlan";
    var TMP_NETHOSTCONNECTIONSUBTYPEVALUES_NR = "nr";
    var TMP_NETHOSTCONNECTIONSUBTYPEVALUES_NRNSA = "nrnsa";
    var TMP_NETHOSTCONNECTIONSUBTYPEVALUES_LTE_CA = "lte_ca";
    var NETHOSTCONNECTIONSUBTYPEVALUES_GPRS = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_GPRS;
    var NETHOSTCONNECTIONSUBTYPEVALUES_EDGE = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EDGE;
    var NETHOSTCONNECTIONSUBTYPEVALUES_UMTS = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_UMTS;
    var NETHOSTCONNECTIONSUBTYPEVALUES_CDMA = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_CDMA;
    var NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_0 = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_0;
    var NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_A = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_A;
    var NETHOSTCONNECTIONSUBTYPEVALUES_CDMA2000_1XRTT = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_CDMA2000_1XRTT;
    var NETHOSTCONNECTIONSUBTYPEVALUES_HSDPA = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSDPA;
    var NETHOSTCONNECTIONSUBTYPEVALUES_HSUPA = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSUPA;
    var NETHOSTCONNECTIONSUBTYPEVALUES_HSPA = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSPA;
    var NETHOSTCONNECTIONSUBTYPEVALUES_IDEN = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_IDEN;
    var NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_B = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_B;
    var NETHOSTCONNECTIONSUBTYPEVALUES_LTE = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_LTE;
    var NETHOSTCONNECTIONSUBTYPEVALUES_EHRPD = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EHRPD;
    var NETHOSTCONNECTIONSUBTYPEVALUES_HSPAP = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSPAP;
    var NETHOSTCONNECTIONSUBTYPEVALUES_GSM = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_GSM;
    var NETHOSTCONNECTIONSUBTYPEVALUES_TD_SCDMA = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_TD_SCDMA;
    var NETHOSTCONNECTIONSUBTYPEVALUES_IWLAN = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_IWLAN;
    var NETHOSTCONNECTIONSUBTYPEVALUES_NR = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_NR;
    var NETHOSTCONNECTIONSUBTYPEVALUES_NRNSA = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_NRNSA;
    var NETHOSTCONNECTIONSUBTYPEVALUES_LTE_CA = TMP_NETHOSTCONNECTIONSUBTYPEVALUES_LTE_CA;
    var NetHostConnectionSubtypeValues = /* @__PURE__ */ require_utils13.createConstMap([
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_GPRS,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EDGE,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_UMTS,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_CDMA,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_0,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_A,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_CDMA2000_1XRTT,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSDPA,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSUPA,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSPA,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_IDEN,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_B,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_LTE,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_EHRPD,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_HSPAP,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_GSM,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_TD_SCDMA,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_IWLAN,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_NR,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_NRNSA,
      TMP_NETHOSTCONNECTIONSUBTYPEVALUES_LTE_CA
    ]);
    var TMP_HTTPFLAVORVALUES_HTTP_1_0 = "1.0";
    var TMP_HTTPFLAVORVALUES_HTTP_1_1 = "1.1";
    var TMP_HTTPFLAVORVALUES_HTTP_2_0 = "2.0";
    var TMP_HTTPFLAVORVALUES_SPDY = "SPDY";
    var TMP_HTTPFLAVORVALUES_QUIC = "QUIC";
    var HTTPFLAVORVALUES_HTTP_1_0 = TMP_HTTPFLAVORVALUES_HTTP_1_0;
    var HTTPFLAVORVALUES_HTTP_1_1 = TMP_HTTPFLAVORVALUES_HTTP_1_1;
    var HTTPFLAVORVALUES_HTTP_2_0 = TMP_HTTPFLAVORVALUES_HTTP_2_0;
    var HTTPFLAVORVALUES_SPDY = TMP_HTTPFLAVORVALUES_SPDY;
    var HTTPFLAVORVALUES_QUIC = TMP_HTTPFLAVORVALUES_QUIC;
    var HttpFlavorValues = {
      HTTP_1_0: TMP_HTTPFLAVORVALUES_HTTP_1_0,
      HTTP_1_1: TMP_HTTPFLAVORVALUES_HTTP_1_1,
      HTTP_2_0: TMP_HTTPFLAVORVALUES_HTTP_2_0,
      SPDY: TMP_HTTPFLAVORVALUES_SPDY,
      QUIC: TMP_HTTPFLAVORVALUES_QUIC
    };
    var TMP_MESSAGINGDESTINATIONKINDVALUES_QUEUE = "queue";
    var TMP_MESSAGINGDESTINATIONKINDVALUES_TOPIC = "topic";
    var MESSAGINGDESTINATIONKINDVALUES_QUEUE = TMP_MESSAGINGDESTINATIONKINDVALUES_QUEUE;
    var MESSAGINGDESTINATIONKINDVALUES_TOPIC = TMP_MESSAGINGDESTINATIONKINDVALUES_TOPIC;
    var MessagingDestinationKindValues = /* @__PURE__ */ require_utils13.createConstMap([TMP_MESSAGINGDESTINATIONKINDVALUES_QUEUE, TMP_MESSAGINGDESTINATIONKINDVALUES_TOPIC]);
    var TMP_MESSAGINGOPERATIONVALUES_RECEIVE = "receive";
    var TMP_MESSAGINGOPERATIONVALUES_PROCESS = "process";
    var MESSAGINGOPERATIONVALUES_RECEIVE = TMP_MESSAGINGOPERATIONVALUES_RECEIVE;
    var MESSAGINGOPERATIONVALUES_PROCESS = TMP_MESSAGINGOPERATIONVALUES_PROCESS;
    var MessagingOperationValues = /* @__PURE__ */ require_utils13.createConstMap([TMP_MESSAGINGOPERATIONVALUES_RECEIVE, TMP_MESSAGINGOPERATIONVALUES_PROCESS]);
    var TMP_RPCGRPCSTATUSCODEVALUES_OK = 0;
    var TMP_RPCGRPCSTATUSCODEVALUES_CANCELLED = 1;
    var TMP_RPCGRPCSTATUSCODEVALUES_UNKNOWN = 2;
    var TMP_RPCGRPCSTATUSCODEVALUES_INVALID_ARGUMENT = 3;
    var TMP_RPCGRPCSTATUSCODEVALUES_DEADLINE_EXCEEDED = 4;
    var TMP_RPCGRPCSTATUSCODEVALUES_NOT_FOUND = 5;
    var TMP_RPCGRPCSTATUSCODEVALUES_ALREADY_EXISTS = 6;
    var TMP_RPCGRPCSTATUSCODEVALUES_PERMISSION_DENIED = 7;
    var TMP_RPCGRPCSTATUSCODEVALUES_RESOURCE_EXHAUSTED = 8;
    var TMP_RPCGRPCSTATUSCODEVALUES_FAILED_PRECONDITION = 9;
    var TMP_RPCGRPCSTATUSCODEVALUES_ABORTED = 10;
    var TMP_RPCGRPCSTATUSCODEVALUES_OUT_OF_RANGE = 11;
    var TMP_RPCGRPCSTATUSCODEVALUES_UNIMPLEMENTED = 12;
    var TMP_RPCGRPCSTATUSCODEVALUES_INTERNAL = 13;
    var TMP_RPCGRPCSTATUSCODEVALUES_UNAVAILABLE = 14;
    var TMP_RPCGRPCSTATUSCODEVALUES_DATA_LOSS = 15;
    var TMP_RPCGRPCSTATUSCODEVALUES_UNAUTHENTICATED = 16;
    var RPCGRPCSTATUSCODEVALUES_OK = TMP_RPCGRPCSTATUSCODEVALUES_OK;
    var RPCGRPCSTATUSCODEVALUES_CANCELLED = TMP_RPCGRPCSTATUSCODEVALUES_CANCELLED;
    var RPCGRPCSTATUSCODEVALUES_UNKNOWN = TMP_RPCGRPCSTATUSCODEVALUES_UNKNOWN;
    var RPCGRPCSTATUSCODEVALUES_INVALID_ARGUMENT = TMP_RPCGRPCSTATUSCODEVALUES_INVALID_ARGUMENT;
    var RPCGRPCSTATUSCODEVALUES_DEADLINE_EXCEEDED = TMP_RPCGRPCSTATUSCODEVALUES_DEADLINE_EXCEEDED;
    var RPCGRPCSTATUSCODEVALUES_NOT_FOUND = TMP_RPCGRPCSTATUSCODEVALUES_NOT_FOUND;
    var RPCGRPCSTATUSCODEVALUES_ALREADY_EXISTS = TMP_RPCGRPCSTATUSCODEVALUES_ALREADY_EXISTS;
    var RPCGRPCSTATUSCODEVALUES_PERMISSION_DENIED = TMP_RPCGRPCSTATUSCODEVALUES_PERMISSION_DENIED;
    var RPCGRPCSTATUSCODEVALUES_RESOURCE_EXHAUSTED = TMP_RPCGRPCSTATUSCODEVALUES_RESOURCE_EXHAUSTED;
    var RPCGRPCSTATUSCODEVALUES_FAILED_PRECONDITION = TMP_RPCGRPCSTATUSCODEVALUES_FAILED_PRECONDITION;
    var RPCGRPCSTATUSCODEVALUES_ABORTED = TMP_RPCGRPCSTATUSCODEVALUES_ABORTED;
    var RPCGRPCSTATUSCODEVALUES_OUT_OF_RANGE = TMP_RPCGRPCSTATUSCODEVALUES_OUT_OF_RANGE;
    var RPCGRPCSTATUSCODEVALUES_UNIMPLEMENTED = TMP_RPCGRPCSTATUSCODEVALUES_UNIMPLEMENTED;
    var RPCGRPCSTATUSCODEVALUES_INTERNAL = TMP_RPCGRPCSTATUSCODEVALUES_INTERNAL;
    var RPCGRPCSTATUSCODEVALUES_UNAVAILABLE = TMP_RPCGRPCSTATUSCODEVALUES_UNAVAILABLE;
    var RPCGRPCSTATUSCODEVALUES_DATA_LOSS = TMP_RPCGRPCSTATUSCODEVALUES_DATA_LOSS;
    var RPCGRPCSTATUSCODEVALUES_UNAUTHENTICATED = TMP_RPCGRPCSTATUSCODEVALUES_UNAUTHENTICATED;
    var RpcGrpcStatusCodeValues = {
      OK: TMP_RPCGRPCSTATUSCODEVALUES_OK,
      CANCELLED: TMP_RPCGRPCSTATUSCODEVALUES_CANCELLED,
      UNKNOWN: TMP_RPCGRPCSTATUSCODEVALUES_UNKNOWN,
      INVALID_ARGUMENT: TMP_RPCGRPCSTATUSCODEVALUES_INVALID_ARGUMENT,
      DEADLINE_EXCEEDED: TMP_RPCGRPCSTATUSCODEVALUES_DEADLINE_EXCEEDED,
      NOT_FOUND: TMP_RPCGRPCSTATUSCODEVALUES_NOT_FOUND,
      ALREADY_EXISTS: TMP_RPCGRPCSTATUSCODEVALUES_ALREADY_EXISTS,
      PERMISSION_DENIED: TMP_RPCGRPCSTATUSCODEVALUES_PERMISSION_DENIED,
      RESOURCE_EXHAUSTED: TMP_RPCGRPCSTATUSCODEVALUES_RESOURCE_EXHAUSTED,
      FAILED_PRECONDITION: TMP_RPCGRPCSTATUSCODEVALUES_FAILED_PRECONDITION,
      ABORTED: TMP_RPCGRPCSTATUSCODEVALUES_ABORTED,
      OUT_OF_RANGE: TMP_RPCGRPCSTATUSCODEVALUES_OUT_OF_RANGE,
      UNIMPLEMENTED: TMP_RPCGRPCSTATUSCODEVALUES_UNIMPLEMENTED,
      INTERNAL: TMP_RPCGRPCSTATUSCODEVALUES_INTERNAL,
      UNAVAILABLE: TMP_RPCGRPCSTATUSCODEVALUES_UNAVAILABLE,
      DATA_LOSS: TMP_RPCGRPCSTATUSCODEVALUES_DATA_LOSS,
      UNAUTHENTICATED: TMP_RPCGRPCSTATUSCODEVALUES_UNAUTHENTICATED
    };
    var TMP_MESSAGETYPEVALUES_SENT = "SENT";
    var TMP_MESSAGETYPEVALUES_RECEIVED = "RECEIVED";
    var MESSAGETYPEVALUES_SENT = TMP_MESSAGETYPEVALUES_SENT;
    var MESSAGETYPEVALUES_RECEIVED = TMP_MESSAGETYPEVALUES_RECEIVED;
    var MessageTypeValues = /* @__PURE__ */ require_utils13.createConstMap([TMP_MESSAGETYPEVALUES_SENT, TMP_MESSAGETYPEVALUES_RECEIVED]);
    exports2.DBCASSANDRACONSISTENCYLEVELVALUES_ALL = DBCASSANDRACONSISTENCYLEVELVALUES_ALL;
    exports2.DBCASSANDRACONSISTENCYLEVELVALUES_ANY = DBCASSANDRACONSISTENCYLEVELVALUES_ANY;
    exports2.DBCASSANDRACONSISTENCYLEVELVALUES_EACH_QUORUM = DBCASSANDRACONSISTENCYLEVELVALUES_EACH_QUORUM;
    exports2.DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_ONE = DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_ONE;
    exports2.DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_QUORUM = DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_QUORUM;
    exports2.DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_SERIAL = DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_SERIAL;
    exports2.DBCASSANDRACONSISTENCYLEVELVALUES_ONE = DBCASSANDRACONSISTENCYLEVELVALUES_ONE;
    exports2.DBCASSANDRACONSISTENCYLEVELVALUES_QUORUM = DBCASSANDRACONSISTENCYLEVELVALUES_QUORUM;
    exports2.DBCASSANDRACONSISTENCYLEVELVALUES_SERIAL = DBCASSANDRACONSISTENCYLEVELVALUES_SERIAL;
    exports2.DBCASSANDRACONSISTENCYLEVELVALUES_THREE = DBCASSANDRACONSISTENCYLEVELVALUES_THREE;
    exports2.DBCASSANDRACONSISTENCYLEVELVALUES_TWO = DBCASSANDRACONSISTENCYLEVELVALUES_TWO;
    exports2.DBSYSTEMVALUES_ADABAS = DBSYSTEMVALUES_ADABAS;
    exports2.DBSYSTEMVALUES_CACHE = DBSYSTEMVALUES_CACHE;
    exports2.DBSYSTEMVALUES_CASSANDRA = DBSYSTEMVALUES_CASSANDRA;
    exports2.DBSYSTEMVALUES_CLOUDSCAPE = DBSYSTEMVALUES_CLOUDSCAPE;
    exports2.DBSYSTEMVALUES_COCKROACHDB = DBSYSTEMVALUES_COCKROACHDB;
    exports2.DBSYSTEMVALUES_COLDFUSION = DBSYSTEMVALUES_COLDFUSION;
    exports2.DBSYSTEMVALUES_COSMOSDB = DBSYSTEMVALUES_COSMOSDB;
    exports2.DBSYSTEMVALUES_COUCHBASE = DBSYSTEMVALUES_COUCHBASE;
    exports2.DBSYSTEMVALUES_COUCHDB = DBSYSTEMVALUES_COUCHDB;
    exports2.DBSYSTEMVALUES_DB2 = DBSYSTEMVALUES_DB2;
    exports2.DBSYSTEMVALUES_DERBY = DBSYSTEMVALUES_DERBY;
    exports2.DBSYSTEMVALUES_DYNAMODB = DBSYSTEMVALUES_DYNAMODB;
    exports2.DBSYSTEMVALUES_EDB = DBSYSTEMVALUES_EDB;
    exports2.DBSYSTEMVALUES_ELASTICSEARCH = DBSYSTEMVALUES_ELASTICSEARCH;
    exports2.DBSYSTEMVALUES_FILEMAKER = DBSYSTEMVALUES_FILEMAKER;
    exports2.DBSYSTEMVALUES_FIREBIRD = DBSYSTEMVALUES_FIREBIRD;
    exports2.DBSYSTEMVALUES_FIRSTSQL = DBSYSTEMVALUES_FIRSTSQL;
    exports2.DBSYSTEMVALUES_GEODE = DBSYSTEMVALUES_GEODE;
    exports2.DBSYSTEMVALUES_H2 = DBSYSTEMVALUES_H2;
    exports2.DBSYSTEMVALUES_HANADB = DBSYSTEMVALUES_HANADB;
    exports2.DBSYSTEMVALUES_HBASE = DBSYSTEMVALUES_HBASE;
    exports2.DBSYSTEMVALUES_HIVE = DBSYSTEMVALUES_HIVE;
    exports2.DBSYSTEMVALUES_HSQLDB = DBSYSTEMVALUES_HSQLDB;
    exports2.DBSYSTEMVALUES_INFORMIX = DBSYSTEMVALUES_INFORMIX;
    exports2.DBSYSTEMVALUES_INGRES = DBSYSTEMVALUES_INGRES;
    exports2.DBSYSTEMVALUES_INSTANTDB = DBSYSTEMVALUES_INSTANTDB;
    exports2.DBSYSTEMVALUES_INTERBASE = DBSYSTEMVALUES_INTERBASE;
    exports2.DBSYSTEMVALUES_MARIADB = DBSYSTEMVALUES_MARIADB;
    exports2.DBSYSTEMVALUES_MAXDB = DBSYSTEMVALUES_MAXDB;
    exports2.DBSYSTEMVALUES_MEMCACHED = DBSYSTEMVALUES_MEMCACHED;
    exports2.DBSYSTEMVALUES_MONGODB = DBSYSTEMVALUES_MONGODB;
    exports2.DBSYSTEMVALUES_MSSQL = DBSYSTEMVALUES_MSSQL;
    exports2.DBSYSTEMVALUES_MYSQL = DBSYSTEMVALUES_MYSQL;
    exports2.DBSYSTEMVALUES_NEO4J = DBSYSTEMVALUES_NEO4J;
    exports2.DBSYSTEMVALUES_NETEZZA = DBSYSTEMVALUES_NETEZZA;
    exports2.DBSYSTEMVALUES_ORACLE = DBSYSTEMVALUES_ORACLE;
    exports2.DBSYSTEMVALUES_OTHER_SQL = DBSYSTEMVALUES_OTHER_SQL;
    exports2.DBSYSTEMVALUES_PERVASIVE = DBSYSTEMVALUES_PERVASIVE;
    exports2.DBSYSTEMVALUES_POINTBASE = DBSYSTEMVALUES_POINTBASE;
    exports2.DBSYSTEMVALUES_POSTGRESQL = DBSYSTEMVALUES_POSTGRESQL;
    exports2.DBSYSTEMVALUES_PROGRESS = DBSYSTEMVALUES_PROGRESS;
    exports2.DBSYSTEMVALUES_REDIS = DBSYSTEMVALUES_REDIS;
    exports2.DBSYSTEMVALUES_REDSHIFT = DBSYSTEMVALUES_REDSHIFT;
    exports2.DBSYSTEMVALUES_SQLITE = DBSYSTEMVALUES_SQLITE;
    exports2.DBSYSTEMVALUES_SYBASE = DBSYSTEMVALUES_SYBASE;
    exports2.DBSYSTEMVALUES_TERADATA = DBSYSTEMVALUES_TERADATA;
    exports2.DBSYSTEMVALUES_VERTICA = DBSYSTEMVALUES_VERTICA;
    exports2.DbCassandraConsistencyLevelValues = DbCassandraConsistencyLevelValues;
    exports2.DbSystemValues = DbSystemValues;
    exports2.FAASDOCUMENTOPERATIONVALUES_DELETE = FAASDOCUMENTOPERATIONVALUES_DELETE;
    exports2.FAASDOCUMENTOPERATIONVALUES_EDIT = FAASDOCUMENTOPERATIONVALUES_EDIT;
    exports2.FAASDOCUMENTOPERATIONVALUES_INSERT = FAASDOCUMENTOPERATIONVALUES_INSERT;
    exports2.FAASINVOKEDPROVIDERVALUES_ALIBABA_CLOUD = FAASINVOKEDPROVIDERVALUES_ALIBABA_CLOUD;
    exports2.FAASINVOKEDPROVIDERVALUES_AWS = FAASINVOKEDPROVIDERVALUES_AWS;
    exports2.FAASINVOKEDPROVIDERVALUES_AZURE = FAASINVOKEDPROVIDERVALUES_AZURE;
    exports2.FAASINVOKEDPROVIDERVALUES_GCP = FAASINVOKEDPROVIDERVALUES_GCP;
    exports2.FAASTRIGGERVALUES_DATASOURCE = FAASTRIGGERVALUES_DATASOURCE;
    exports2.FAASTRIGGERVALUES_HTTP = FAASTRIGGERVALUES_HTTP;
    exports2.FAASTRIGGERVALUES_OTHER = FAASTRIGGERVALUES_OTHER;
    exports2.FAASTRIGGERVALUES_PUBSUB = FAASTRIGGERVALUES_PUBSUB;
    exports2.FAASTRIGGERVALUES_TIMER = FAASTRIGGERVALUES_TIMER;
    exports2.FaasDocumentOperationValues = FaasDocumentOperationValues;
    exports2.FaasInvokedProviderValues = FaasInvokedProviderValues;
    exports2.FaasTriggerValues = FaasTriggerValues;
    exports2.HTTPFLAVORVALUES_HTTP_1_0 = HTTPFLAVORVALUES_HTTP_1_0;
    exports2.HTTPFLAVORVALUES_HTTP_1_1 = HTTPFLAVORVALUES_HTTP_1_1;
    exports2.HTTPFLAVORVALUES_HTTP_2_0 = HTTPFLAVORVALUES_HTTP_2_0;
    exports2.HTTPFLAVORVALUES_QUIC = HTTPFLAVORVALUES_QUIC;
    exports2.HTTPFLAVORVALUES_SPDY = HTTPFLAVORVALUES_SPDY;
    exports2.HttpFlavorValues = HttpFlavorValues;
    exports2.MESSAGETYPEVALUES_RECEIVED = MESSAGETYPEVALUES_RECEIVED;
    exports2.MESSAGETYPEVALUES_SENT = MESSAGETYPEVALUES_SENT;
    exports2.MESSAGINGDESTINATIONKINDVALUES_QUEUE = MESSAGINGDESTINATIONKINDVALUES_QUEUE;
    exports2.MESSAGINGDESTINATIONKINDVALUES_TOPIC = MESSAGINGDESTINATIONKINDVALUES_TOPIC;
    exports2.MESSAGINGOPERATIONVALUES_PROCESS = MESSAGINGOPERATIONVALUES_PROCESS;
    exports2.MESSAGINGOPERATIONVALUES_RECEIVE = MESSAGINGOPERATIONVALUES_RECEIVE;
    exports2.MessageTypeValues = MessageTypeValues;
    exports2.MessagingDestinationKindValues = MessagingDestinationKindValues;
    exports2.MessagingOperationValues = MessagingOperationValues;
    exports2.NETHOSTCONNECTIONSUBTYPEVALUES_CDMA = NETHOSTCONNECTIONSUBTYPEVALUES_CDMA;
    exports2.NETHOSTCONNECTIONSUBTYPEVALUES_CDMA2000_1XRTT = NETHOSTCONNECTIONSUBTYPEVALUES_CDMA2000_1XRTT;
    exports2.NETHOSTCONNECTIONSUBTYPEVALUES_EDGE = NETHOSTCONNECTIONSUBTYPEVALUES_EDGE;
    exports2.NETHOSTCONNECTIONSUBTYPEVALUES_EHRPD = NETHOSTCONNECTIONSUBTYPEVALUES_EHRPD;
    exports2.NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_0 = NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_0;
    exports2.NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_A = NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_A;
    exports2.NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_B = NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_B;
    exports2.NETHOSTCONNECTIONSUBTYPEVALUES_GPRS = NETHOSTCONNECTIONSUBTYPEVALUES_GPRS;
    exports2.NETHOSTCONNECTIONSUBTYPEVALUES_GSM = NETHOSTCONNECTIONSUBTYPEVALUES_GSM;
    exports2.NETHOSTCONNECTIONSUBTYPEVALUES_HSDPA = NETHOSTCONNECTIONSUBTYPEVALUES_HSDPA;
    exports2.NETHOSTCONNECTIONSUBTYPEVALUES_HSPA = NETHOSTCONNECTIONSUBTYPEVALUES_HSPA;
    exports2.NETHOSTCONNECTIONSUBTYPEVALUES_HSPAP = NETHOSTCONNECTIONSUBTYPEVALUES_HSPAP;
    exports2.NETHOSTCONNECTIONSUBTYPEVALUES_HSUPA = NETHOSTCONNECTIONSUBTYPEVALUES_HSUPA;
    exports2.NETHOSTCONNECTIONSUBTYPEVALUES_IDEN = NETHOSTCONNECTIONSUBTYPEVALUES_IDEN;
    exports2.NETHOSTCONNECTIONSUBTYPEVALUES_IWLAN = NETHOSTCONNECTIONSUBTYPEVALUES_IWLAN;
    exports2.NETHOSTCONNECTIONSUBTYPEVALUES_LTE = NETHOSTCONNECTIONSUBTYPEVALUES_LTE;
    exports2.NETHOSTCONNECTIONSUBTYPEVALUES_LTE_CA = NETHOSTCONNECTIONSUBTYPEVALUES_LTE_CA;
    exports2.NETHOSTCONNECTIONSUBTYPEVALUES_NR = NETHOSTCONNECTIONSUBTYPEVALUES_NR;
    exports2.NETHOSTCONNECTIONSUBTYPEVALUES_NRNSA = NETHOSTCONNECTIONSUBTYPEVALUES_NRNSA;
    exports2.NETHOSTCONNECTIONSUBTYPEVALUES_TD_SCDMA = NETHOSTCONNECTIONSUBTYPEVALUES_TD_SCDMA;
    exports2.NETHOSTCONNECTIONSUBTYPEVALUES_UMTS = NETHOSTCONNECTIONSUBTYPEVALUES_UMTS;
    exports2.NETHOSTCONNECTIONTYPEVALUES_CELL = NETHOSTCONNECTIONTYPEVALUES_CELL;
    exports2.NETHOSTCONNECTIONTYPEVALUES_UNAVAILABLE = NETHOSTCONNECTIONTYPEVALUES_UNAVAILABLE;
    exports2.NETHOSTCONNECTIONTYPEVALUES_UNKNOWN = NETHOSTCONNECTIONTYPEVALUES_UNKNOWN;
    exports2.NETHOSTCONNECTIONTYPEVALUES_WIFI = NETHOSTCONNECTIONTYPEVALUES_WIFI;
    exports2.NETHOSTCONNECTIONTYPEVALUES_WIRED = NETHOSTCONNECTIONTYPEVALUES_WIRED;
    exports2.NETTRANSPORTVALUES_INPROC = NETTRANSPORTVALUES_INPROC;
    exports2.NETTRANSPORTVALUES_IP = NETTRANSPORTVALUES_IP;
    exports2.NETTRANSPORTVALUES_IP_TCP = NETTRANSPORTVALUES_IP_TCP;
    exports2.NETTRANSPORTVALUES_IP_UDP = NETTRANSPORTVALUES_IP_UDP;
    exports2.NETTRANSPORTVALUES_OTHER = NETTRANSPORTVALUES_OTHER;
    exports2.NETTRANSPORTVALUES_PIPE = NETTRANSPORTVALUES_PIPE;
    exports2.NETTRANSPORTVALUES_UNIX = NETTRANSPORTVALUES_UNIX;
    exports2.NetHostConnectionSubtypeValues = NetHostConnectionSubtypeValues;
    exports2.NetHostConnectionTypeValues = NetHostConnectionTypeValues;
    exports2.NetTransportValues = NetTransportValues;
    exports2.RPCGRPCSTATUSCODEVALUES_ABORTED = RPCGRPCSTATUSCODEVALUES_ABORTED;
    exports2.RPCGRPCSTATUSCODEVALUES_ALREADY_EXISTS = RPCGRPCSTATUSCODEVALUES_ALREADY_EXISTS;
    exports2.RPCGRPCSTATUSCODEVALUES_CANCELLED = RPCGRPCSTATUSCODEVALUES_CANCELLED;
    exports2.RPCGRPCSTATUSCODEVALUES_DATA_LOSS = RPCGRPCSTATUSCODEVALUES_DATA_LOSS;
    exports2.RPCGRPCSTATUSCODEVALUES_DEADLINE_EXCEEDED = RPCGRPCSTATUSCODEVALUES_DEADLINE_EXCEEDED;
    exports2.RPCGRPCSTATUSCODEVALUES_FAILED_PRECONDITION = RPCGRPCSTATUSCODEVALUES_FAILED_PRECONDITION;
    exports2.RPCGRPCSTATUSCODEVALUES_INTERNAL = RPCGRPCSTATUSCODEVALUES_INTERNAL;
    exports2.RPCGRPCSTATUSCODEVALUES_INVALID_ARGUMENT = RPCGRPCSTATUSCODEVALUES_INVALID_ARGUMENT;
    exports2.RPCGRPCSTATUSCODEVALUES_NOT_FOUND = RPCGRPCSTATUSCODEVALUES_NOT_FOUND;
    exports2.RPCGRPCSTATUSCODEVALUES_OK = RPCGRPCSTATUSCODEVALUES_OK;
    exports2.RPCGRPCSTATUSCODEVALUES_OUT_OF_RANGE = RPCGRPCSTATUSCODEVALUES_OUT_OF_RANGE;
    exports2.RPCGRPCSTATUSCODEVALUES_PERMISSION_DENIED = RPCGRPCSTATUSCODEVALUES_PERMISSION_DENIED;
    exports2.RPCGRPCSTATUSCODEVALUES_RESOURCE_EXHAUSTED = RPCGRPCSTATUSCODEVALUES_RESOURCE_EXHAUSTED;
    exports2.RPCGRPCSTATUSCODEVALUES_UNAUTHENTICATED = RPCGRPCSTATUSCODEVALUES_UNAUTHENTICATED;
    exports2.RPCGRPCSTATUSCODEVALUES_UNAVAILABLE = RPCGRPCSTATUSCODEVALUES_UNAVAILABLE;
    exports2.RPCGRPCSTATUSCODEVALUES_UNIMPLEMENTED = RPCGRPCSTATUSCODEVALUES_UNIMPLEMENTED;
    exports2.RPCGRPCSTATUSCODEVALUES_UNKNOWN = RPCGRPCSTATUSCODEVALUES_UNKNOWN;
    exports2.RpcGrpcStatusCodeValues = RpcGrpcStatusCodeValues;
    exports2.SEMATTRS_AWS_DYNAMODB_ATTRIBUTES_TO_GET = SEMATTRS_AWS_DYNAMODB_ATTRIBUTES_TO_GET;
    exports2.SEMATTRS_AWS_DYNAMODB_ATTRIBUTE_DEFINITIONS = SEMATTRS_AWS_DYNAMODB_ATTRIBUTE_DEFINITIONS;
    exports2.SEMATTRS_AWS_DYNAMODB_CONSISTENT_READ = SEMATTRS_AWS_DYNAMODB_CONSISTENT_READ;
    exports2.SEMATTRS_AWS_DYNAMODB_CONSUMED_CAPACITY = SEMATTRS_AWS_DYNAMODB_CONSUMED_CAPACITY;
    exports2.SEMATTRS_AWS_DYNAMODB_COUNT = SEMATTRS_AWS_DYNAMODB_COUNT;
    exports2.SEMATTRS_AWS_DYNAMODB_EXCLUSIVE_START_TABLE = SEMATTRS_AWS_DYNAMODB_EXCLUSIVE_START_TABLE;
    exports2.SEMATTRS_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEXES = SEMATTRS_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEXES;
    exports2.SEMATTRS_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEX_UPDATES = SEMATTRS_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEX_UPDATES;
    exports2.SEMATTRS_AWS_DYNAMODB_INDEX_NAME = SEMATTRS_AWS_DYNAMODB_INDEX_NAME;
    exports2.SEMATTRS_AWS_DYNAMODB_ITEM_COLLECTION_METRICS = SEMATTRS_AWS_DYNAMODB_ITEM_COLLECTION_METRICS;
    exports2.SEMATTRS_AWS_DYNAMODB_LIMIT = SEMATTRS_AWS_DYNAMODB_LIMIT;
    exports2.SEMATTRS_AWS_DYNAMODB_LOCAL_SECONDARY_INDEXES = SEMATTRS_AWS_DYNAMODB_LOCAL_SECONDARY_INDEXES;
    exports2.SEMATTRS_AWS_DYNAMODB_PROJECTION = SEMATTRS_AWS_DYNAMODB_PROJECTION;
    exports2.SEMATTRS_AWS_DYNAMODB_PROVISIONED_READ_CAPACITY = SEMATTRS_AWS_DYNAMODB_PROVISIONED_READ_CAPACITY;
    exports2.SEMATTRS_AWS_DYNAMODB_PROVISIONED_WRITE_CAPACITY = SEMATTRS_AWS_DYNAMODB_PROVISIONED_WRITE_CAPACITY;
    exports2.SEMATTRS_AWS_DYNAMODB_SCANNED_COUNT = SEMATTRS_AWS_DYNAMODB_SCANNED_COUNT;
    exports2.SEMATTRS_AWS_DYNAMODB_SCAN_FORWARD = SEMATTRS_AWS_DYNAMODB_SCAN_FORWARD;
    exports2.SEMATTRS_AWS_DYNAMODB_SEGMENT = SEMATTRS_AWS_DYNAMODB_SEGMENT;
    exports2.SEMATTRS_AWS_DYNAMODB_SELECT = SEMATTRS_AWS_DYNAMODB_SELECT;
    exports2.SEMATTRS_AWS_DYNAMODB_TABLE_COUNT = SEMATTRS_AWS_DYNAMODB_TABLE_COUNT;
    exports2.SEMATTRS_AWS_DYNAMODB_TABLE_NAMES = SEMATTRS_AWS_DYNAMODB_TABLE_NAMES;
    exports2.SEMATTRS_AWS_DYNAMODB_TOTAL_SEGMENTS = SEMATTRS_AWS_DYNAMODB_TOTAL_SEGMENTS;
    exports2.SEMATTRS_AWS_LAMBDA_INVOKED_ARN = SEMATTRS_AWS_LAMBDA_INVOKED_ARN;
    exports2.SEMATTRS_CODE_FILEPATH = SEMATTRS_CODE_FILEPATH;
    exports2.SEMATTRS_CODE_FUNCTION = SEMATTRS_CODE_FUNCTION;
    exports2.SEMATTRS_CODE_LINENO = SEMATTRS_CODE_LINENO;
    exports2.SEMATTRS_CODE_NAMESPACE = SEMATTRS_CODE_NAMESPACE;
    exports2.SEMATTRS_DB_CASSANDRA_CONSISTENCY_LEVEL = SEMATTRS_DB_CASSANDRA_CONSISTENCY_LEVEL;
    exports2.SEMATTRS_DB_CASSANDRA_COORDINATOR_DC = SEMATTRS_DB_CASSANDRA_COORDINATOR_DC;
    exports2.SEMATTRS_DB_CASSANDRA_COORDINATOR_ID = SEMATTRS_DB_CASSANDRA_COORDINATOR_ID;
    exports2.SEMATTRS_DB_CASSANDRA_IDEMPOTENCE = SEMATTRS_DB_CASSANDRA_IDEMPOTENCE;
    exports2.SEMATTRS_DB_CASSANDRA_KEYSPACE = SEMATTRS_DB_CASSANDRA_KEYSPACE;
    exports2.SEMATTRS_DB_CASSANDRA_PAGE_SIZE = SEMATTRS_DB_CASSANDRA_PAGE_SIZE;
    exports2.SEMATTRS_DB_CASSANDRA_SPECULATIVE_EXECUTION_COUNT = SEMATTRS_DB_CASSANDRA_SPECULATIVE_EXECUTION_COUNT;
    exports2.SEMATTRS_DB_CASSANDRA_TABLE = SEMATTRS_DB_CASSANDRA_TABLE;
    exports2.SEMATTRS_DB_CONNECTION_STRING = SEMATTRS_DB_CONNECTION_STRING;
    exports2.SEMATTRS_DB_HBASE_NAMESPACE = SEMATTRS_DB_HBASE_NAMESPACE;
    exports2.SEMATTRS_DB_JDBC_DRIVER_CLASSNAME = SEMATTRS_DB_JDBC_DRIVER_CLASSNAME;
    exports2.SEMATTRS_DB_MONGODB_COLLECTION = SEMATTRS_DB_MONGODB_COLLECTION;
    exports2.SEMATTRS_DB_MSSQL_INSTANCE_NAME = SEMATTRS_DB_MSSQL_INSTANCE_NAME;
    exports2.SEMATTRS_DB_NAME = SEMATTRS_DB_NAME;
    exports2.SEMATTRS_DB_OPERATION = SEMATTRS_DB_OPERATION;
    exports2.SEMATTRS_DB_REDIS_DATABASE_INDEX = SEMATTRS_DB_REDIS_DATABASE_INDEX;
    exports2.SEMATTRS_DB_SQL_TABLE = SEMATTRS_DB_SQL_TABLE;
    exports2.SEMATTRS_DB_STATEMENT = SEMATTRS_DB_STATEMENT;
    exports2.SEMATTRS_DB_SYSTEM = SEMATTRS_DB_SYSTEM;
    exports2.SEMATTRS_DB_USER = SEMATTRS_DB_USER;
    exports2.SEMATTRS_ENDUSER_ID = SEMATTRS_ENDUSER_ID;
    exports2.SEMATTRS_ENDUSER_ROLE = SEMATTRS_ENDUSER_ROLE;
    exports2.SEMATTRS_ENDUSER_SCOPE = SEMATTRS_ENDUSER_SCOPE;
    exports2.SEMATTRS_EXCEPTION_ESCAPED = SEMATTRS_EXCEPTION_ESCAPED;
    exports2.SEMATTRS_EXCEPTION_MESSAGE = SEMATTRS_EXCEPTION_MESSAGE;
    exports2.SEMATTRS_EXCEPTION_STACKTRACE = SEMATTRS_EXCEPTION_STACKTRACE;
    exports2.SEMATTRS_EXCEPTION_TYPE = SEMATTRS_EXCEPTION_TYPE;
    exports2.SEMATTRS_FAAS_COLDSTART = SEMATTRS_FAAS_COLDSTART;
    exports2.SEMATTRS_FAAS_CRON = SEMATTRS_FAAS_CRON;
    exports2.SEMATTRS_FAAS_DOCUMENT_COLLECTION = SEMATTRS_FAAS_DOCUMENT_COLLECTION;
    exports2.SEMATTRS_FAAS_DOCUMENT_NAME = SEMATTRS_FAAS_DOCUMENT_NAME;
    exports2.SEMATTRS_FAAS_DOCUMENT_OPERATION = SEMATTRS_FAAS_DOCUMENT_OPERATION;
    exports2.SEMATTRS_FAAS_DOCUMENT_TIME = SEMATTRS_FAAS_DOCUMENT_TIME;
    exports2.SEMATTRS_FAAS_EXECUTION = SEMATTRS_FAAS_EXECUTION;
    exports2.SEMATTRS_FAAS_INVOKED_NAME = SEMATTRS_FAAS_INVOKED_NAME;
    exports2.SEMATTRS_FAAS_INVOKED_PROVIDER = SEMATTRS_FAAS_INVOKED_PROVIDER;
    exports2.SEMATTRS_FAAS_INVOKED_REGION = SEMATTRS_FAAS_INVOKED_REGION;
    exports2.SEMATTRS_FAAS_TIME = SEMATTRS_FAAS_TIME;
    exports2.SEMATTRS_FAAS_TRIGGER = SEMATTRS_FAAS_TRIGGER;
    exports2.SEMATTRS_HTTP_CLIENT_IP = SEMATTRS_HTTP_CLIENT_IP;
    exports2.SEMATTRS_HTTP_FLAVOR = SEMATTRS_HTTP_FLAVOR;
    exports2.SEMATTRS_HTTP_HOST = SEMATTRS_HTTP_HOST;
    exports2.SEMATTRS_HTTP_METHOD = SEMATTRS_HTTP_METHOD;
    exports2.SEMATTRS_HTTP_REQUEST_CONTENT_LENGTH = SEMATTRS_HTTP_REQUEST_CONTENT_LENGTH;
    exports2.SEMATTRS_HTTP_REQUEST_CONTENT_LENGTH_UNCOMPRESSED = SEMATTRS_HTTP_REQUEST_CONTENT_LENGTH_UNCOMPRESSED;
    exports2.SEMATTRS_HTTP_RESPONSE_CONTENT_LENGTH = SEMATTRS_HTTP_RESPONSE_CONTENT_LENGTH;
    exports2.SEMATTRS_HTTP_RESPONSE_CONTENT_LENGTH_UNCOMPRESSED = SEMATTRS_HTTP_RESPONSE_CONTENT_LENGTH_UNCOMPRESSED;
    exports2.SEMATTRS_HTTP_ROUTE = SEMATTRS_HTTP_ROUTE;
    exports2.SEMATTRS_HTTP_SCHEME = SEMATTRS_HTTP_SCHEME;
    exports2.SEMATTRS_HTTP_SERVER_NAME = SEMATTRS_HTTP_SERVER_NAME;
    exports2.SEMATTRS_HTTP_STATUS_CODE = SEMATTRS_HTTP_STATUS_CODE;
    exports2.SEMATTRS_HTTP_TARGET = SEMATTRS_HTTP_TARGET;
    exports2.SEMATTRS_HTTP_URL = SEMATTRS_HTTP_URL;
    exports2.SEMATTRS_HTTP_USER_AGENT = SEMATTRS_HTTP_USER_AGENT;
    exports2.SEMATTRS_MESSAGE_COMPRESSED_SIZE = SEMATTRS_MESSAGE_COMPRESSED_SIZE;
    exports2.SEMATTRS_MESSAGE_ID = SEMATTRS_MESSAGE_ID;
    exports2.SEMATTRS_MESSAGE_TYPE = SEMATTRS_MESSAGE_TYPE;
    exports2.SEMATTRS_MESSAGE_UNCOMPRESSED_SIZE = SEMATTRS_MESSAGE_UNCOMPRESSED_SIZE;
    exports2.SEMATTRS_MESSAGING_CONSUMER_ID = SEMATTRS_MESSAGING_CONSUMER_ID;
    exports2.SEMATTRS_MESSAGING_CONVERSATION_ID = SEMATTRS_MESSAGING_CONVERSATION_ID;
    exports2.SEMATTRS_MESSAGING_DESTINATION = SEMATTRS_MESSAGING_DESTINATION;
    exports2.SEMATTRS_MESSAGING_DESTINATION_KIND = SEMATTRS_MESSAGING_DESTINATION_KIND;
    exports2.SEMATTRS_MESSAGING_KAFKA_CLIENT_ID = SEMATTRS_MESSAGING_KAFKA_CLIENT_ID;
    exports2.SEMATTRS_MESSAGING_KAFKA_CONSUMER_GROUP = SEMATTRS_MESSAGING_KAFKA_CONSUMER_GROUP;
    exports2.SEMATTRS_MESSAGING_KAFKA_MESSAGE_KEY = SEMATTRS_MESSAGING_KAFKA_MESSAGE_KEY;
    exports2.SEMATTRS_MESSAGING_KAFKA_PARTITION = SEMATTRS_MESSAGING_KAFKA_PARTITION;
    exports2.SEMATTRS_MESSAGING_KAFKA_TOMBSTONE = SEMATTRS_MESSAGING_KAFKA_TOMBSTONE;
    exports2.SEMATTRS_MESSAGING_MESSAGE_ID = SEMATTRS_MESSAGING_MESSAGE_ID;
    exports2.SEMATTRS_MESSAGING_MESSAGE_PAYLOAD_COMPRESSED_SIZE_BYTES = SEMATTRS_MESSAGING_MESSAGE_PAYLOAD_COMPRESSED_SIZE_BYTES;
    exports2.SEMATTRS_MESSAGING_MESSAGE_PAYLOAD_SIZE_BYTES = SEMATTRS_MESSAGING_MESSAGE_PAYLOAD_SIZE_BYTES;
    exports2.SEMATTRS_MESSAGING_OPERATION = SEMATTRS_MESSAGING_OPERATION;
    exports2.SEMATTRS_MESSAGING_PROTOCOL = SEMATTRS_MESSAGING_PROTOCOL;
    exports2.SEMATTRS_MESSAGING_PROTOCOL_VERSION = SEMATTRS_MESSAGING_PROTOCOL_VERSION;
    exports2.SEMATTRS_MESSAGING_RABBITMQ_ROUTING_KEY = SEMATTRS_MESSAGING_RABBITMQ_ROUTING_KEY;
    exports2.SEMATTRS_MESSAGING_SYSTEM = SEMATTRS_MESSAGING_SYSTEM;
    exports2.SEMATTRS_MESSAGING_TEMP_DESTINATION = SEMATTRS_MESSAGING_TEMP_DESTINATION;
    exports2.SEMATTRS_MESSAGING_URL = SEMATTRS_MESSAGING_URL;
    exports2.SEMATTRS_NET_HOST_CARRIER_ICC = SEMATTRS_NET_HOST_CARRIER_ICC;
    exports2.SEMATTRS_NET_HOST_CARRIER_MCC = SEMATTRS_NET_HOST_CARRIER_MCC;
    exports2.SEMATTRS_NET_HOST_CARRIER_MNC = SEMATTRS_NET_HOST_CARRIER_MNC;
    exports2.SEMATTRS_NET_HOST_CARRIER_NAME = SEMATTRS_NET_HOST_CARRIER_NAME;
    exports2.SEMATTRS_NET_HOST_CONNECTION_SUBTYPE = SEMATTRS_NET_HOST_CONNECTION_SUBTYPE;
    exports2.SEMATTRS_NET_HOST_CONNECTION_TYPE = SEMATTRS_NET_HOST_CONNECTION_TYPE;
    exports2.SEMATTRS_NET_HOST_IP = SEMATTRS_NET_HOST_IP;
    exports2.SEMATTRS_NET_HOST_NAME = SEMATTRS_NET_HOST_NAME;
    exports2.SEMATTRS_NET_HOST_PORT = SEMATTRS_NET_HOST_PORT;
    exports2.SEMATTRS_NET_PEER_IP = SEMATTRS_NET_PEER_IP;
    exports2.SEMATTRS_NET_PEER_NAME = SEMATTRS_NET_PEER_NAME;
    exports2.SEMATTRS_NET_PEER_PORT = SEMATTRS_NET_PEER_PORT;
    exports2.SEMATTRS_NET_TRANSPORT = SEMATTRS_NET_TRANSPORT;
    exports2.SEMATTRS_PEER_SERVICE = SEMATTRS_PEER_SERVICE;
    exports2.SEMATTRS_RPC_GRPC_STATUS_CODE = SEMATTRS_RPC_GRPC_STATUS_CODE;
    exports2.SEMATTRS_RPC_JSONRPC_ERROR_CODE = SEMATTRS_RPC_JSONRPC_ERROR_CODE;
    exports2.SEMATTRS_RPC_JSONRPC_ERROR_MESSAGE = SEMATTRS_RPC_JSONRPC_ERROR_MESSAGE;
    exports2.SEMATTRS_RPC_JSONRPC_REQUEST_ID = SEMATTRS_RPC_JSONRPC_REQUEST_ID;
    exports2.SEMATTRS_RPC_JSONRPC_VERSION = SEMATTRS_RPC_JSONRPC_VERSION;
    exports2.SEMATTRS_RPC_METHOD = SEMATTRS_RPC_METHOD;
    exports2.SEMATTRS_RPC_SERVICE = SEMATTRS_RPC_SERVICE;
    exports2.SEMATTRS_RPC_SYSTEM = SEMATTRS_RPC_SYSTEM;
    exports2.SEMATTRS_THREAD_ID = SEMATTRS_THREAD_ID;
    exports2.SEMATTRS_THREAD_NAME = SEMATTRS_THREAD_NAME;
    exports2.SemanticAttributes = SemanticAttributes;
  }
});

// node_modules/@opentelemetry/semantic-conventions/dist/resource/SemanticResourceAttributes.cjs
var require_SemanticResourceAttributes = __commonJS({
  "node_modules/@opentelemetry/semantic-conventions/dist/resource/SemanticResourceAttributes.cjs"(exports2) {
    var require_utils13 = require_utils2();
    var TMP_CLOUD_PROVIDER = "cloud.provider";
    var TMP_CLOUD_ACCOUNT_ID = "cloud.account.id";
    var TMP_CLOUD_REGION = "cloud.region";
    var TMP_CLOUD_AVAILABILITY_ZONE = "cloud.availability_zone";
    var TMP_CLOUD_PLATFORM = "cloud.platform";
    var TMP_AWS_ECS_CONTAINER_ARN = "aws.ecs.container.arn";
    var TMP_AWS_ECS_CLUSTER_ARN = "aws.ecs.cluster.arn";
    var TMP_AWS_ECS_LAUNCHTYPE = "aws.ecs.launchtype";
    var TMP_AWS_ECS_TASK_ARN = "aws.ecs.task.arn";
    var TMP_AWS_ECS_TASK_FAMILY = "aws.ecs.task.family";
    var TMP_AWS_ECS_TASK_REVISION = "aws.ecs.task.revision";
    var TMP_AWS_EKS_CLUSTER_ARN = "aws.eks.cluster.arn";
    var TMP_AWS_LOG_GROUP_NAMES = "aws.log.group.names";
    var TMP_AWS_LOG_GROUP_ARNS = "aws.log.group.arns";
    var TMP_AWS_LOG_STREAM_NAMES = "aws.log.stream.names";
    var TMP_AWS_LOG_STREAM_ARNS = "aws.log.stream.arns";
    var TMP_CONTAINER_NAME = "container.name";
    var TMP_CONTAINER_ID = "container.id";
    var TMP_CONTAINER_RUNTIME = "container.runtime";
    var TMP_CONTAINER_IMAGE_NAME = "container.image.name";
    var TMP_CONTAINER_IMAGE_TAG = "container.image.tag";
    var TMP_DEPLOYMENT_ENVIRONMENT = "deployment.environment";
    var TMP_DEVICE_ID = "device.id";
    var TMP_DEVICE_MODEL_IDENTIFIER = "device.model.identifier";
    var TMP_DEVICE_MODEL_NAME = "device.model.name";
    var TMP_FAAS_NAME = "faas.name";
    var TMP_FAAS_ID = "faas.id";
    var TMP_FAAS_VERSION = "faas.version";
    var TMP_FAAS_INSTANCE = "faas.instance";
    var TMP_FAAS_MAX_MEMORY = "faas.max_memory";
    var TMP_HOST_ID = "host.id";
    var TMP_HOST_NAME = "host.name";
    var TMP_HOST_TYPE = "host.type";
    var TMP_HOST_ARCH = "host.arch";
    var TMP_HOST_IMAGE_NAME = "host.image.name";
    var TMP_HOST_IMAGE_ID = "host.image.id";
    var TMP_HOST_IMAGE_VERSION = "host.image.version";
    var TMP_K8S_CLUSTER_NAME = "k8s.cluster.name";
    var TMP_K8S_NODE_NAME = "k8s.node.name";
    var TMP_K8S_NODE_UID = "k8s.node.uid";
    var TMP_K8S_NAMESPACE_NAME = "k8s.namespace.name";
    var TMP_K8S_POD_UID = "k8s.pod.uid";
    var TMP_K8S_POD_NAME = "k8s.pod.name";
    var TMP_K8S_CONTAINER_NAME = "k8s.container.name";
    var TMP_K8S_REPLICASET_UID = "k8s.replicaset.uid";
    var TMP_K8S_REPLICASET_NAME = "k8s.replicaset.name";
    var TMP_K8S_DEPLOYMENT_UID = "k8s.deployment.uid";
    var TMP_K8S_DEPLOYMENT_NAME = "k8s.deployment.name";
    var TMP_K8S_STATEFULSET_UID = "k8s.statefulset.uid";
    var TMP_K8S_STATEFULSET_NAME = "k8s.statefulset.name";
    var TMP_K8S_DAEMONSET_UID = "k8s.daemonset.uid";
    var TMP_K8S_DAEMONSET_NAME = "k8s.daemonset.name";
    var TMP_K8S_JOB_UID = "k8s.job.uid";
    var TMP_K8S_JOB_NAME = "k8s.job.name";
    var TMP_K8S_CRONJOB_UID = "k8s.cronjob.uid";
    var TMP_K8S_CRONJOB_NAME = "k8s.cronjob.name";
    var TMP_OS_TYPE = "os.type";
    var TMP_OS_DESCRIPTION = "os.description";
    var TMP_OS_NAME = "os.name";
    var TMP_OS_VERSION = "os.version";
    var TMP_PROCESS_PID = "process.pid";
    var TMP_PROCESS_EXECUTABLE_NAME = "process.executable.name";
    var TMP_PROCESS_EXECUTABLE_PATH = "process.executable.path";
    var TMP_PROCESS_COMMAND = "process.command";
    var TMP_PROCESS_COMMAND_LINE = "process.command_line";
    var TMP_PROCESS_COMMAND_ARGS = "process.command_args";
    var TMP_PROCESS_OWNER = "process.owner";
    var TMP_PROCESS_RUNTIME_NAME = "process.runtime.name";
    var TMP_PROCESS_RUNTIME_VERSION = "process.runtime.version";
    var TMP_PROCESS_RUNTIME_DESCRIPTION = "process.runtime.description";
    var TMP_SERVICE_NAME = "service.name";
    var TMP_SERVICE_NAMESPACE = "service.namespace";
    var TMP_SERVICE_INSTANCE_ID = "service.instance.id";
    var TMP_SERVICE_VERSION = "service.version";
    var TMP_TELEMETRY_SDK_NAME = "telemetry.sdk.name";
    var TMP_TELEMETRY_SDK_LANGUAGE = "telemetry.sdk.language";
    var TMP_TELEMETRY_SDK_VERSION = "telemetry.sdk.version";
    var TMP_TELEMETRY_AUTO_VERSION = "telemetry.auto.version";
    var TMP_WEBENGINE_NAME = "webengine.name";
    var TMP_WEBENGINE_VERSION = "webengine.version";
    var TMP_WEBENGINE_DESCRIPTION = "webengine.description";
    var SEMRESATTRS_CLOUD_PROVIDER = TMP_CLOUD_PROVIDER;
    var SEMRESATTRS_CLOUD_ACCOUNT_ID = TMP_CLOUD_ACCOUNT_ID;
    var SEMRESATTRS_CLOUD_REGION = TMP_CLOUD_REGION;
    var SEMRESATTRS_CLOUD_AVAILABILITY_ZONE = TMP_CLOUD_AVAILABILITY_ZONE;
    var SEMRESATTRS_CLOUD_PLATFORM = TMP_CLOUD_PLATFORM;
    var SEMRESATTRS_AWS_ECS_CONTAINER_ARN = TMP_AWS_ECS_CONTAINER_ARN;
    var SEMRESATTRS_AWS_ECS_CLUSTER_ARN = TMP_AWS_ECS_CLUSTER_ARN;
    var SEMRESATTRS_AWS_ECS_LAUNCHTYPE = TMP_AWS_ECS_LAUNCHTYPE;
    var SEMRESATTRS_AWS_ECS_TASK_ARN = TMP_AWS_ECS_TASK_ARN;
    var SEMRESATTRS_AWS_ECS_TASK_FAMILY = TMP_AWS_ECS_TASK_FAMILY;
    var SEMRESATTRS_AWS_ECS_TASK_REVISION = TMP_AWS_ECS_TASK_REVISION;
    var SEMRESATTRS_AWS_EKS_CLUSTER_ARN = TMP_AWS_EKS_CLUSTER_ARN;
    var SEMRESATTRS_AWS_LOG_GROUP_NAMES = TMP_AWS_LOG_GROUP_NAMES;
    var SEMRESATTRS_AWS_LOG_GROUP_ARNS = TMP_AWS_LOG_GROUP_ARNS;
    var SEMRESATTRS_AWS_LOG_STREAM_NAMES = TMP_AWS_LOG_STREAM_NAMES;
    var SEMRESATTRS_AWS_LOG_STREAM_ARNS = TMP_AWS_LOG_STREAM_ARNS;
    var SEMRESATTRS_CONTAINER_NAME = TMP_CONTAINER_NAME;
    var SEMRESATTRS_CONTAINER_ID = TMP_CONTAINER_ID;
    var SEMRESATTRS_CONTAINER_RUNTIME = TMP_CONTAINER_RUNTIME;
    var SEMRESATTRS_CONTAINER_IMAGE_NAME = TMP_CONTAINER_IMAGE_NAME;
    var SEMRESATTRS_CONTAINER_IMAGE_TAG = TMP_CONTAINER_IMAGE_TAG;
    var SEMRESATTRS_DEPLOYMENT_ENVIRONMENT = TMP_DEPLOYMENT_ENVIRONMENT;
    var SEMRESATTRS_DEVICE_ID = TMP_DEVICE_ID;
    var SEMRESATTRS_DEVICE_MODEL_IDENTIFIER = TMP_DEVICE_MODEL_IDENTIFIER;
    var SEMRESATTRS_DEVICE_MODEL_NAME = TMP_DEVICE_MODEL_NAME;
    var SEMRESATTRS_FAAS_NAME = TMP_FAAS_NAME;
    var SEMRESATTRS_FAAS_ID = TMP_FAAS_ID;
    var SEMRESATTRS_FAAS_VERSION = TMP_FAAS_VERSION;
    var SEMRESATTRS_FAAS_INSTANCE = TMP_FAAS_INSTANCE;
    var SEMRESATTRS_FAAS_MAX_MEMORY = TMP_FAAS_MAX_MEMORY;
    var SEMRESATTRS_HOST_ID = TMP_HOST_ID;
    var SEMRESATTRS_HOST_NAME = TMP_HOST_NAME;
    var SEMRESATTRS_HOST_TYPE = TMP_HOST_TYPE;
    var SEMRESATTRS_HOST_ARCH = TMP_HOST_ARCH;
    var SEMRESATTRS_HOST_IMAGE_NAME = TMP_HOST_IMAGE_NAME;
    var SEMRESATTRS_HOST_IMAGE_ID = TMP_HOST_IMAGE_ID;
    var SEMRESATTRS_HOST_IMAGE_VERSION = TMP_HOST_IMAGE_VERSION;
    var SEMRESATTRS_K8S_CLUSTER_NAME = TMP_K8S_CLUSTER_NAME;
    var SEMRESATTRS_K8S_NODE_NAME = TMP_K8S_NODE_NAME;
    var SEMRESATTRS_K8S_NODE_UID = TMP_K8S_NODE_UID;
    var SEMRESATTRS_K8S_NAMESPACE_NAME = TMP_K8S_NAMESPACE_NAME;
    var SEMRESATTRS_K8S_POD_UID = TMP_K8S_POD_UID;
    var SEMRESATTRS_K8S_POD_NAME = TMP_K8S_POD_NAME;
    var SEMRESATTRS_K8S_CONTAINER_NAME = TMP_K8S_CONTAINER_NAME;
    var SEMRESATTRS_K8S_REPLICASET_UID = TMP_K8S_REPLICASET_UID;
    var SEMRESATTRS_K8S_REPLICASET_NAME = TMP_K8S_REPLICASET_NAME;
    var SEMRESATTRS_K8S_DEPLOYMENT_UID = TMP_K8S_DEPLOYMENT_UID;
    var SEMRESATTRS_K8S_DEPLOYMENT_NAME = TMP_K8S_DEPLOYMENT_NAME;
    var SEMRESATTRS_K8S_STATEFULSET_UID = TMP_K8S_STATEFULSET_UID;
    var SEMRESATTRS_K8S_STATEFULSET_NAME = TMP_K8S_STATEFULSET_NAME;
    var SEMRESATTRS_K8S_DAEMONSET_UID = TMP_K8S_DAEMONSET_UID;
    var SEMRESATTRS_K8S_DAEMONSET_NAME = TMP_K8S_DAEMONSET_NAME;
    var SEMRESATTRS_K8S_JOB_UID = TMP_K8S_JOB_UID;
    var SEMRESATTRS_K8S_JOB_NAME = TMP_K8S_JOB_NAME;
    var SEMRESATTRS_K8S_CRONJOB_UID = TMP_K8S_CRONJOB_UID;
    var SEMRESATTRS_K8S_CRONJOB_NAME = TMP_K8S_CRONJOB_NAME;
    var SEMRESATTRS_OS_TYPE = TMP_OS_TYPE;
    var SEMRESATTRS_OS_DESCRIPTION = TMP_OS_DESCRIPTION;
    var SEMRESATTRS_OS_NAME = TMP_OS_NAME;
    var SEMRESATTRS_OS_VERSION = TMP_OS_VERSION;
    var SEMRESATTRS_PROCESS_PID = TMP_PROCESS_PID;
    var SEMRESATTRS_PROCESS_EXECUTABLE_NAME = TMP_PROCESS_EXECUTABLE_NAME;
    var SEMRESATTRS_PROCESS_EXECUTABLE_PATH = TMP_PROCESS_EXECUTABLE_PATH;
    var SEMRESATTRS_PROCESS_COMMAND = TMP_PROCESS_COMMAND;
    var SEMRESATTRS_PROCESS_COMMAND_LINE = TMP_PROCESS_COMMAND_LINE;
    var SEMRESATTRS_PROCESS_COMMAND_ARGS = TMP_PROCESS_COMMAND_ARGS;
    var SEMRESATTRS_PROCESS_OWNER = TMP_PROCESS_OWNER;
    var SEMRESATTRS_PROCESS_RUNTIME_NAME = TMP_PROCESS_RUNTIME_NAME;
    var SEMRESATTRS_PROCESS_RUNTIME_VERSION = TMP_PROCESS_RUNTIME_VERSION;
    var SEMRESATTRS_PROCESS_RUNTIME_DESCRIPTION = TMP_PROCESS_RUNTIME_DESCRIPTION;
    var SEMRESATTRS_SERVICE_NAME = TMP_SERVICE_NAME;
    var SEMRESATTRS_SERVICE_NAMESPACE = TMP_SERVICE_NAMESPACE;
    var SEMRESATTRS_SERVICE_INSTANCE_ID = TMP_SERVICE_INSTANCE_ID;
    var SEMRESATTRS_SERVICE_VERSION = TMP_SERVICE_VERSION;
    var SEMRESATTRS_TELEMETRY_SDK_NAME = TMP_TELEMETRY_SDK_NAME;
    var SEMRESATTRS_TELEMETRY_SDK_LANGUAGE = TMP_TELEMETRY_SDK_LANGUAGE;
    var SEMRESATTRS_TELEMETRY_SDK_VERSION = TMP_TELEMETRY_SDK_VERSION;
    var SEMRESATTRS_TELEMETRY_AUTO_VERSION = TMP_TELEMETRY_AUTO_VERSION;
    var SEMRESATTRS_WEBENGINE_NAME = TMP_WEBENGINE_NAME;
    var SEMRESATTRS_WEBENGINE_VERSION = TMP_WEBENGINE_VERSION;
    var SEMRESATTRS_WEBENGINE_DESCRIPTION = TMP_WEBENGINE_DESCRIPTION;
    var SemanticResourceAttributes = /* @__PURE__ */ require_utils13.createConstMap([
      TMP_CLOUD_PROVIDER,
      TMP_CLOUD_ACCOUNT_ID,
      TMP_CLOUD_REGION,
      TMP_CLOUD_AVAILABILITY_ZONE,
      TMP_CLOUD_PLATFORM,
      TMP_AWS_ECS_CONTAINER_ARN,
      TMP_AWS_ECS_CLUSTER_ARN,
      TMP_AWS_ECS_LAUNCHTYPE,
      TMP_AWS_ECS_TASK_ARN,
      TMP_AWS_ECS_TASK_FAMILY,
      TMP_AWS_ECS_TASK_REVISION,
      TMP_AWS_EKS_CLUSTER_ARN,
      TMP_AWS_LOG_GROUP_NAMES,
      TMP_AWS_LOG_GROUP_ARNS,
      TMP_AWS_LOG_STREAM_NAMES,
      TMP_AWS_LOG_STREAM_ARNS,
      TMP_CONTAINER_NAME,
      TMP_CONTAINER_ID,
      TMP_CONTAINER_RUNTIME,
      TMP_CONTAINER_IMAGE_NAME,
      TMP_CONTAINER_IMAGE_TAG,
      TMP_DEPLOYMENT_ENVIRONMENT,
      TMP_DEVICE_ID,
      TMP_DEVICE_MODEL_IDENTIFIER,
      TMP_DEVICE_MODEL_NAME,
      TMP_FAAS_NAME,
      TMP_FAAS_ID,
      TMP_FAAS_VERSION,
      TMP_FAAS_INSTANCE,
      TMP_FAAS_MAX_MEMORY,
      TMP_HOST_ID,
      TMP_HOST_NAME,
      TMP_HOST_TYPE,
      TMP_HOST_ARCH,
      TMP_HOST_IMAGE_NAME,
      TMP_HOST_IMAGE_ID,
      TMP_HOST_IMAGE_VERSION,
      TMP_K8S_CLUSTER_NAME,
      TMP_K8S_NODE_NAME,
      TMP_K8S_NODE_UID,
      TMP_K8S_NAMESPACE_NAME,
      TMP_K8S_POD_UID,
      TMP_K8S_POD_NAME,
      TMP_K8S_CONTAINER_NAME,
      TMP_K8S_REPLICASET_UID,
      TMP_K8S_REPLICASET_NAME,
      TMP_K8S_DEPLOYMENT_UID,
      TMP_K8S_DEPLOYMENT_NAME,
      TMP_K8S_STATEFULSET_UID,
      TMP_K8S_STATEFULSET_NAME,
      TMP_K8S_DAEMONSET_UID,
      TMP_K8S_DAEMONSET_NAME,
      TMP_K8S_JOB_UID,
      TMP_K8S_JOB_NAME,
      TMP_K8S_CRONJOB_UID,
      TMP_K8S_CRONJOB_NAME,
      TMP_OS_TYPE,
      TMP_OS_DESCRIPTION,
      TMP_OS_NAME,
      TMP_OS_VERSION,
      TMP_PROCESS_PID,
      TMP_PROCESS_EXECUTABLE_NAME,
      TMP_PROCESS_EXECUTABLE_PATH,
      TMP_PROCESS_COMMAND,
      TMP_PROCESS_COMMAND_LINE,
      TMP_PROCESS_COMMAND_ARGS,
      TMP_PROCESS_OWNER,
      TMP_PROCESS_RUNTIME_NAME,
      TMP_PROCESS_RUNTIME_VERSION,
      TMP_PROCESS_RUNTIME_DESCRIPTION,
      TMP_SERVICE_NAME,
      TMP_SERVICE_NAMESPACE,
      TMP_SERVICE_INSTANCE_ID,
      TMP_SERVICE_VERSION,
      TMP_TELEMETRY_SDK_NAME,
      TMP_TELEMETRY_SDK_LANGUAGE,
      TMP_TELEMETRY_SDK_VERSION,
      TMP_TELEMETRY_AUTO_VERSION,
      TMP_WEBENGINE_NAME,
      TMP_WEBENGINE_VERSION,
      TMP_WEBENGINE_DESCRIPTION
    ]);
    var TMP_CLOUDPROVIDERVALUES_ALIBABA_CLOUD = "alibaba_cloud";
    var TMP_CLOUDPROVIDERVALUES_AWS = "aws";
    var TMP_CLOUDPROVIDERVALUES_AZURE = "azure";
    var TMP_CLOUDPROVIDERVALUES_GCP = "gcp";
    var CLOUDPROVIDERVALUES_ALIBABA_CLOUD = TMP_CLOUDPROVIDERVALUES_ALIBABA_CLOUD;
    var CLOUDPROVIDERVALUES_AWS = TMP_CLOUDPROVIDERVALUES_AWS;
    var CLOUDPROVIDERVALUES_AZURE = TMP_CLOUDPROVIDERVALUES_AZURE;
    var CLOUDPROVIDERVALUES_GCP = TMP_CLOUDPROVIDERVALUES_GCP;
    var CloudProviderValues = /* @__PURE__ */ require_utils13.createConstMap([
      TMP_CLOUDPROVIDERVALUES_ALIBABA_CLOUD,
      TMP_CLOUDPROVIDERVALUES_AWS,
      TMP_CLOUDPROVIDERVALUES_AZURE,
      TMP_CLOUDPROVIDERVALUES_GCP
    ]);
    var TMP_CLOUDPLATFORMVALUES_ALIBABA_CLOUD_ECS = "alibaba_cloud_ecs";
    var TMP_CLOUDPLATFORMVALUES_ALIBABA_CLOUD_FC = "alibaba_cloud_fc";
    var TMP_CLOUDPLATFORMVALUES_AWS_EC2 = "aws_ec2";
    var TMP_CLOUDPLATFORMVALUES_AWS_ECS = "aws_ecs";
    var TMP_CLOUDPLATFORMVALUES_AWS_EKS = "aws_eks";
    var TMP_CLOUDPLATFORMVALUES_AWS_LAMBDA = "aws_lambda";
    var TMP_CLOUDPLATFORMVALUES_AWS_ELASTIC_BEANSTALK = "aws_elastic_beanstalk";
    var TMP_CLOUDPLATFORMVALUES_AZURE_VM = "azure_vm";
    var TMP_CLOUDPLATFORMVALUES_AZURE_CONTAINER_INSTANCES = "azure_container_instances";
    var TMP_CLOUDPLATFORMVALUES_AZURE_AKS = "azure_aks";
    var TMP_CLOUDPLATFORMVALUES_AZURE_FUNCTIONS = "azure_functions";
    var TMP_CLOUDPLATFORMVALUES_AZURE_APP_SERVICE = "azure_app_service";
    var TMP_CLOUDPLATFORMVALUES_GCP_COMPUTE_ENGINE = "gcp_compute_engine";
    var TMP_CLOUDPLATFORMVALUES_GCP_CLOUD_RUN = "gcp_cloud_run";
    var TMP_CLOUDPLATFORMVALUES_GCP_KUBERNETES_ENGINE = "gcp_kubernetes_engine";
    var TMP_CLOUDPLATFORMVALUES_GCP_CLOUD_FUNCTIONS = "gcp_cloud_functions";
    var TMP_CLOUDPLATFORMVALUES_GCP_APP_ENGINE = "gcp_app_engine";
    var CLOUDPLATFORMVALUES_ALIBABA_CLOUD_ECS = TMP_CLOUDPLATFORMVALUES_ALIBABA_CLOUD_ECS;
    var CLOUDPLATFORMVALUES_ALIBABA_CLOUD_FC = TMP_CLOUDPLATFORMVALUES_ALIBABA_CLOUD_FC;
    var CLOUDPLATFORMVALUES_AWS_EC2 = TMP_CLOUDPLATFORMVALUES_AWS_EC2;
    var CLOUDPLATFORMVALUES_AWS_ECS = TMP_CLOUDPLATFORMVALUES_AWS_ECS;
    var CLOUDPLATFORMVALUES_AWS_EKS = TMP_CLOUDPLATFORMVALUES_AWS_EKS;
    var CLOUDPLATFORMVALUES_AWS_LAMBDA = TMP_CLOUDPLATFORMVALUES_AWS_LAMBDA;
    var CLOUDPLATFORMVALUES_AWS_ELASTIC_BEANSTALK = TMP_CLOUDPLATFORMVALUES_AWS_ELASTIC_BEANSTALK;
    var CLOUDPLATFORMVALUES_AZURE_VM = TMP_CLOUDPLATFORMVALUES_AZURE_VM;
    var CLOUDPLATFORMVALUES_AZURE_CONTAINER_INSTANCES = TMP_CLOUDPLATFORMVALUES_AZURE_CONTAINER_INSTANCES;
    var CLOUDPLATFORMVALUES_AZURE_AKS = TMP_CLOUDPLATFORMVALUES_AZURE_AKS;
    var CLOUDPLATFORMVALUES_AZURE_FUNCTIONS = TMP_CLOUDPLATFORMVALUES_AZURE_FUNCTIONS;
    var CLOUDPLATFORMVALUES_AZURE_APP_SERVICE = TMP_CLOUDPLATFORMVALUES_AZURE_APP_SERVICE;
    var CLOUDPLATFORMVALUES_GCP_COMPUTE_ENGINE = TMP_CLOUDPLATFORMVALUES_GCP_COMPUTE_ENGINE;
    var CLOUDPLATFORMVALUES_GCP_CLOUD_RUN = TMP_CLOUDPLATFORMVALUES_GCP_CLOUD_RUN;
    var CLOUDPLATFORMVALUES_GCP_KUBERNETES_ENGINE = TMP_CLOUDPLATFORMVALUES_GCP_KUBERNETES_ENGINE;
    var CLOUDPLATFORMVALUES_GCP_CLOUD_FUNCTIONS = TMP_CLOUDPLATFORMVALUES_GCP_CLOUD_FUNCTIONS;
    var CLOUDPLATFORMVALUES_GCP_APP_ENGINE = TMP_CLOUDPLATFORMVALUES_GCP_APP_ENGINE;
    var CloudPlatformValues = /* @__PURE__ */ require_utils13.createConstMap([
      TMP_CLOUDPLATFORMVALUES_ALIBABA_CLOUD_ECS,
      TMP_CLOUDPLATFORMVALUES_ALIBABA_CLOUD_FC,
      TMP_CLOUDPLATFORMVALUES_AWS_EC2,
      TMP_CLOUDPLATFORMVALUES_AWS_ECS,
      TMP_CLOUDPLATFORMVALUES_AWS_EKS,
      TMP_CLOUDPLATFORMVALUES_AWS_LAMBDA,
      TMP_CLOUDPLATFORMVALUES_AWS_ELASTIC_BEANSTALK,
      TMP_CLOUDPLATFORMVALUES_AZURE_VM,
      TMP_CLOUDPLATFORMVALUES_AZURE_CONTAINER_INSTANCES,
      TMP_CLOUDPLATFORMVALUES_AZURE_AKS,
      TMP_CLOUDPLATFORMVALUES_AZURE_FUNCTIONS,
      TMP_CLOUDPLATFORMVALUES_AZURE_APP_SERVICE,
      TMP_CLOUDPLATFORMVALUES_GCP_COMPUTE_ENGINE,
      TMP_CLOUDPLATFORMVALUES_GCP_CLOUD_RUN,
      TMP_CLOUDPLATFORMVALUES_GCP_KUBERNETES_ENGINE,
      TMP_CLOUDPLATFORMVALUES_GCP_CLOUD_FUNCTIONS,
      TMP_CLOUDPLATFORMVALUES_GCP_APP_ENGINE
    ]);
    var TMP_AWSECSLAUNCHTYPEVALUES_EC2 = "ec2";
    var TMP_AWSECSLAUNCHTYPEVALUES_FARGATE = "fargate";
    var AWSECSLAUNCHTYPEVALUES_EC2 = TMP_AWSECSLAUNCHTYPEVALUES_EC2;
    var AWSECSLAUNCHTYPEVALUES_FARGATE = TMP_AWSECSLAUNCHTYPEVALUES_FARGATE;
    var AwsEcsLaunchtypeValues = /* @__PURE__ */ require_utils13.createConstMap([TMP_AWSECSLAUNCHTYPEVALUES_EC2, TMP_AWSECSLAUNCHTYPEVALUES_FARGATE]);
    var TMP_HOSTARCHVALUES_AMD64 = "amd64";
    var TMP_HOSTARCHVALUES_ARM32 = "arm32";
    var TMP_HOSTARCHVALUES_ARM64 = "arm64";
    var TMP_HOSTARCHVALUES_IA64 = "ia64";
    var TMP_HOSTARCHVALUES_PPC32 = "ppc32";
    var TMP_HOSTARCHVALUES_PPC64 = "ppc64";
    var TMP_HOSTARCHVALUES_X86 = "x86";
    var HOSTARCHVALUES_AMD64 = TMP_HOSTARCHVALUES_AMD64;
    var HOSTARCHVALUES_ARM32 = TMP_HOSTARCHVALUES_ARM32;
    var HOSTARCHVALUES_ARM64 = TMP_HOSTARCHVALUES_ARM64;
    var HOSTARCHVALUES_IA64 = TMP_HOSTARCHVALUES_IA64;
    var HOSTARCHVALUES_PPC32 = TMP_HOSTARCHVALUES_PPC32;
    var HOSTARCHVALUES_PPC64 = TMP_HOSTARCHVALUES_PPC64;
    var HOSTARCHVALUES_X86 = TMP_HOSTARCHVALUES_X86;
    var HostArchValues = /* @__PURE__ */ require_utils13.createConstMap([
      TMP_HOSTARCHVALUES_AMD64,
      TMP_HOSTARCHVALUES_ARM32,
      TMP_HOSTARCHVALUES_ARM64,
      TMP_HOSTARCHVALUES_IA64,
      TMP_HOSTARCHVALUES_PPC32,
      TMP_HOSTARCHVALUES_PPC64,
      TMP_HOSTARCHVALUES_X86
    ]);
    var TMP_OSTYPEVALUES_WINDOWS = "windows";
    var TMP_OSTYPEVALUES_LINUX = "linux";
    var TMP_OSTYPEVALUES_DARWIN = "darwin";
    var TMP_OSTYPEVALUES_FREEBSD = "freebsd";
    var TMP_OSTYPEVALUES_NETBSD = "netbsd";
    var TMP_OSTYPEVALUES_OPENBSD = "openbsd";
    var TMP_OSTYPEVALUES_DRAGONFLYBSD = "dragonflybsd";
    var TMP_OSTYPEVALUES_HPUX = "hpux";
    var TMP_OSTYPEVALUES_AIX = "aix";
    var TMP_OSTYPEVALUES_SOLARIS = "solaris";
    var TMP_OSTYPEVALUES_Z_OS = "z_os";
    var OSTYPEVALUES_WINDOWS = TMP_OSTYPEVALUES_WINDOWS;
    var OSTYPEVALUES_LINUX = TMP_OSTYPEVALUES_LINUX;
    var OSTYPEVALUES_DARWIN = TMP_OSTYPEVALUES_DARWIN;
    var OSTYPEVALUES_FREEBSD = TMP_OSTYPEVALUES_FREEBSD;
    var OSTYPEVALUES_NETBSD = TMP_OSTYPEVALUES_NETBSD;
    var OSTYPEVALUES_OPENBSD = TMP_OSTYPEVALUES_OPENBSD;
    var OSTYPEVALUES_DRAGONFLYBSD = TMP_OSTYPEVALUES_DRAGONFLYBSD;
    var OSTYPEVALUES_HPUX = TMP_OSTYPEVALUES_HPUX;
    var OSTYPEVALUES_AIX = TMP_OSTYPEVALUES_AIX;
    var OSTYPEVALUES_SOLARIS = TMP_OSTYPEVALUES_SOLARIS;
    var OSTYPEVALUES_Z_OS = TMP_OSTYPEVALUES_Z_OS;
    var OsTypeValues = /* @__PURE__ */ require_utils13.createConstMap([
      TMP_OSTYPEVALUES_WINDOWS,
      TMP_OSTYPEVALUES_LINUX,
      TMP_OSTYPEVALUES_DARWIN,
      TMP_OSTYPEVALUES_FREEBSD,
      TMP_OSTYPEVALUES_NETBSD,
      TMP_OSTYPEVALUES_OPENBSD,
      TMP_OSTYPEVALUES_DRAGONFLYBSD,
      TMP_OSTYPEVALUES_HPUX,
      TMP_OSTYPEVALUES_AIX,
      TMP_OSTYPEVALUES_SOLARIS,
      TMP_OSTYPEVALUES_Z_OS
    ]);
    var TMP_TELEMETRYSDKLANGUAGEVALUES_CPP = "cpp";
    var TMP_TELEMETRYSDKLANGUAGEVALUES_DOTNET = "dotnet";
    var TMP_TELEMETRYSDKLANGUAGEVALUES_ERLANG = "erlang";
    var TMP_TELEMETRYSDKLANGUAGEVALUES_GO = "go";
    var TMP_TELEMETRYSDKLANGUAGEVALUES_JAVA = "java";
    var TMP_TELEMETRYSDKLANGUAGEVALUES_NODEJS = "nodejs";
    var TMP_TELEMETRYSDKLANGUAGEVALUES_PHP = "php";
    var TMP_TELEMETRYSDKLANGUAGEVALUES_PYTHON = "python";
    var TMP_TELEMETRYSDKLANGUAGEVALUES_RUBY = "ruby";
    var TMP_TELEMETRYSDKLANGUAGEVALUES_WEBJS = "webjs";
    var TELEMETRYSDKLANGUAGEVALUES_CPP = TMP_TELEMETRYSDKLANGUAGEVALUES_CPP;
    var TELEMETRYSDKLANGUAGEVALUES_DOTNET = TMP_TELEMETRYSDKLANGUAGEVALUES_DOTNET;
    var TELEMETRYSDKLANGUAGEVALUES_ERLANG = TMP_TELEMETRYSDKLANGUAGEVALUES_ERLANG;
    var TELEMETRYSDKLANGUAGEVALUES_GO = TMP_TELEMETRYSDKLANGUAGEVALUES_GO;
    var TELEMETRYSDKLANGUAGEVALUES_JAVA = TMP_TELEMETRYSDKLANGUAGEVALUES_JAVA;
    var TELEMETRYSDKLANGUAGEVALUES_NODEJS = TMP_TELEMETRYSDKLANGUAGEVALUES_NODEJS;
    var TELEMETRYSDKLANGUAGEVALUES_PHP = TMP_TELEMETRYSDKLANGUAGEVALUES_PHP;
    var TELEMETRYSDKLANGUAGEVALUES_PYTHON = TMP_TELEMETRYSDKLANGUAGEVALUES_PYTHON;
    var TELEMETRYSDKLANGUAGEVALUES_RUBY = TMP_TELEMETRYSDKLANGUAGEVALUES_RUBY;
    var TELEMETRYSDKLANGUAGEVALUES_WEBJS = TMP_TELEMETRYSDKLANGUAGEVALUES_WEBJS;
    var TelemetrySdkLanguageValues = /* @__PURE__ */ require_utils13.createConstMap([
      TMP_TELEMETRYSDKLANGUAGEVALUES_CPP,
      TMP_TELEMETRYSDKLANGUAGEVALUES_DOTNET,
      TMP_TELEMETRYSDKLANGUAGEVALUES_ERLANG,
      TMP_TELEMETRYSDKLANGUAGEVALUES_GO,
      TMP_TELEMETRYSDKLANGUAGEVALUES_JAVA,
      TMP_TELEMETRYSDKLANGUAGEVALUES_NODEJS,
      TMP_TELEMETRYSDKLANGUAGEVALUES_PHP,
      TMP_TELEMETRYSDKLANGUAGEVALUES_PYTHON,
      TMP_TELEMETRYSDKLANGUAGEVALUES_RUBY,
      TMP_TELEMETRYSDKLANGUAGEVALUES_WEBJS
    ]);
    exports2.AWSECSLAUNCHTYPEVALUES_EC2 = AWSECSLAUNCHTYPEVALUES_EC2;
    exports2.AWSECSLAUNCHTYPEVALUES_FARGATE = AWSECSLAUNCHTYPEVALUES_FARGATE;
    exports2.AwsEcsLaunchtypeValues = AwsEcsLaunchtypeValues;
    exports2.CLOUDPLATFORMVALUES_ALIBABA_CLOUD_ECS = CLOUDPLATFORMVALUES_ALIBABA_CLOUD_ECS;
    exports2.CLOUDPLATFORMVALUES_ALIBABA_CLOUD_FC = CLOUDPLATFORMVALUES_ALIBABA_CLOUD_FC;
    exports2.CLOUDPLATFORMVALUES_AWS_EC2 = CLOUDPLATFORMVALUES_AWS_EC2;
    exports2.CLOUDPLATFORMVALUES_AWS_ECS = CLOUDPLATFORMVALUES_AWS_ECS;
    exports2.CLOUDPLATFORMVALUES_AWS_EKS = CLOUDPLATFORMVALUES_AWS_EKS;
    exports2.CLOUDPLATFORMVALUES_AWS_ELASTIC_BEANSTALK = CLOUDPLATFORMVALUES_AWS_ELASTIC_BEANSTALK;
    exports2.CLOUDPLATFORMVALUES_AWS_LAMBDA = CLOUDPLATFORMVALUES_AWS_LAMBDA;
    exports2.CLOUDPLATFORMVALUES_AZURE_AKS = CLOUDPLATFORMVALUES_AZURE_AKS;
    exports2.CLOUDPLATFORMVALUES_AZURE_APP_SERVICE = CLOUDPLATFORMVALUES_AZURE_APP_SERVICE;
    exports2.CLOUDPLATFORMVALUES_AZURE_CONTAINER_INSTANCES = CLOUDPLATFORMVALUES_AZURE_CONTAINER_INSTANCES;
    exports2.CLOUDPLATFORMVALUES_AZURE_FUNCTIONS = CLOUDPLATFORMVALUES_AZURE_FUNCTIONS;
    exports2.CLOUDPLATFORMVALUES_AZURE_VM = CLOUDPLATFORMVALUES_AZURE_VM;
    exports2.CLOUDPLATFORMVALUES_GCP_APP_ENGINE = CLOUDPLATFORMVALUES_GCP_APP_ENGINE;
    exports2.CLOUDPLATFORMVALUES_GCP_CLOUD_FUNCTIONS = CLOUDPLATFORMVALUES_GCP_CLOUD_FUNCTIONS;
    exports2.CLOUDPLATFORMVALUES_GCP_CLOUD_RUN = CLOUDPLATFORMVALUES_GCP_CLOUD_RUN;
    exports2.CLOUDPLATFORMVALUES_GCP_COMPUTE_ENGINE = CLOUDPLATFORMVALUES_GCP_COMPUTE_ENGINE;
    exports2.CLOUDPLATFORMVALUES_GCP_KUBERNETES_ENGINE = CLOUDPLATFORMVALUES_GCP_KUBERNETES_ENGINE;
    exports2.CLOUDPROVIDERVALUES_ALIBABA_CLOUD = CLOUDPROVIDERVALUES_ALIBABA_CLOUD;
    exports2.CLOUDPROVIDERVALUES_AWS = CLOUDPROVIDERVALUES_AWS;
    exports2.CLOUDPROVIDERVALUES_AZURE = CLOUDPROVIDERVALUES_AZURE;
    exports2.CLOUDPROVIDERVALUES_GCP = CLOUDPROVIDERVALUES_GCP;
    exports2.CloudPlatformValues = CloudPlatformValues;
    exports2.CloudProviderValues = CloudProviderValues;
    exports2.HOSTARCHVALUES_AMD64 = HOSTARCHVALUES_AMD64;
    exports2.HOSTARCHVALUES_ARM32 = HOSTARCHVALUES_ARM32;
    exports2.HOSTARCHVALUES_ARM64 = HOSTARCHVALUES_ARM64;
    exports2.HOSTARCHVALUES_IA64 = HOSTARCHVALUES_IA64;
    exports2.HOSTARCHVALUES_PPC32 = HOSTARCHVALUES_PPC32;
    exports2.HOSTARCHVALUES_PPC64 = HOSTARCHVALUES_PPC64;
    exports2.HOSTARCHVALUES_X86 = HOSTARCHVALUES_X86;
    exports2.HostArchValues = HostArchValues;
    exports2.OSTYPEVALUES_AIX = OSTYPEVALUES_AIX;
    exports2.OSTYPEVALUES_DARWIN = OSTYPEVALUES_DARWIN;
    exports2.OSTYPEVALUES_DRAGONFLYBSD = OSTYPEVALUES_DRAGONFLYBSD;
    exports2.OSTYPEVALUES_FREEBSD = OSTYPEVALUES_FREEBSD;
    exports2.OSTYPEVALUES_HPUX = OSTYPEVALUES_HPUX;
    exports2.OSTYPEVALUES_LINUX = OSTYPEVALUES_LINUX;
    exports2.OSTYPEVALUES_NETBSD = OSTYPEVALUES_NETBSD;
    exports2.OSTYPEVALUES_OPENBSD = OSTYPEVALUES_OPENBSD;
    exports2.OSTYPEVALUES_SOLARIS = OSTYPEVALUES_SOLARIS;
    exports2.OSTYPEVALUES_WINDOWS = OSTYPEVALUES_WINDOWS;
    exports2.OSTYPEVALUES_Z_OS = OSTYPEVALUES_Z_OS;
    exports2.OsTypeValues = OsTypeValues;
    exports2.SEMRESATTRS_AWS_ECS_CLUSTER_ARN = SEMRESATTRS_AWS_ECS_CLUSTER_ARN;
    exports2.SEMRESATTRS_AWS_ECS_CONTAINER_ARN = SEMRESATTRS_AWS_ECS_CONTAINER_ARN;
    exports2.SEMRESATTRS_AWS_ECS_LAUNCHTYPE = SEMRESATTRS_AWS_ECS_LAUNCHTYPE;
    exports2.SEMRESATTRS_AWS_ECS_TASK_ARN = SEMRESATTRS_AWS_ECS_TASK_ARN;
    exports2.SEMRESATTRS_AWS_ECS_TASK_FAMILY = SEMRESATTRS_AWS_ECS_TASK_FAMILY;
    exports2.SEMRESATTRS_AWS_ECS_TASK_REVISION = SEMRESATTRS_AWS_ECS_TASK_REVISION;
    exports2.SEMRESATTRS_AWS_EKS_CLUSTER_ARN = SEMRESATTRS_AWS_EKS_CLUSTER_ARN;
    exports2.SEMRESATTRS_AWS_LOG_GROUP_ARNS = SEMRESATTRS_AWS_LOG_GROUP_ARNS;
    exports2.SEMRESATTRS_AWS_LOG_GROUP_NAMES = SEMRESATTRS_AWS_LOG_GROUP_NAMES;
    exports2.SEMRESATTRS_AWS_LOG_STREAM_ARNS = SEMRESATTRS_AWS_LOG_STREAM_ARNS;
    exports2.SEMRESATTRS_AWS_LOG_STREAM_NAMES = SEMRESATTRS_AWS_LOG_STREAM_NAMES;
    exports2.SEMRESATTRS_CLOUD_ACCOUNT_ID = SEMRESATTRS_CLOUD_ACCOUNT_ID;
    exports2.SEMRESATTRS_CLOUD_AVAILABILITY_ZONE = SEMRESATTRS_CLOUD_AVAILABILITY_ZONE;
    exports2.SEMRESATTRS_CLOUD_PLATFORM = SEMRESATTRS_CLOUD_PLATFORM;
    exports2.SEMRESATTRS_CLOUD_PROVIDER = SEMRESATTRS_CLOUD_PROVIDER;
    exports2.SEMRESATTRS_CLOUD_REGION = SEMRESATTRS_CLOUD_REGION;
    exports2.SEMRESATTRS_CONTAINER_ID = SEMRESATTRS_CONTAINER_ID;
    exports2.SEMRESATTRS_CONTAINER_IMAGE_NAME = SEMRESATTRS_CONTAINER_IMAGE_NAME;
    exports2.SEMRESATTRS_CONTAINER_IMAGE_TAG = SEMRESATTRS_CONTAINER_IMAGE_TAG;
    exports2.SEMRESATTRS_CONTAINER_NAME = SEMRESATTRS_CONTAINER_NAME;
    exports2.SEMRESATTRS_CONTAINER_RUNTIME = SEMRESATTRS_CONTAINER_RUNTIME;
    exports2.SEMRESATTRS_DEPLOYMENT_ENVIRONMENT = SEMRESATTRS_DEPLOYMENT_ENVIRONMENT;
    exports2.SEMRESATTRS_DEVICE_ID = SEMRESATTRS_DEVICE_ID;
    exports2.SEMRESATTRS_DEVICE_MODEL_IDENTIFIER = SEMRESATTRS_DEVICE_MODEL_IDENTIFIER;
    exports2.SEMRESATTRS_DEVICE_MODEL_NAME = SEMRESATTRS_DEVICE_MODEL_NAME;
    exports2.SEMRESATTRS_FAAS_ID = SEMRESATTRS_FAAS_ID;
    exports2.SEMRESATTRS_FAAS_INSTANCE = SEMRESATTRS_FAAS_INSTANCE;
    exports2.SEMRESATTRS_FAAS_MAX_MEMORY = SEMRESATTRS_FAAS_MAX_MEMORY;
    exports2.SEMRESATTRS_FAAS_NAME = SEMRESATTRS_FAAS_NAME;
    exports2.SEMRESATTRS_FAAS_VERSION = SEMRESATTRS_FAAS_VERSION;
    exports2.SEMRESATTRS_HOST_ARCH = SEMRESATTRS_HOST_ARCH;
    exports2.SEMRESATTRS_HOST_ID = SEMRESATTRS_HOST_ID;
    exports2.SEMRESATTRS_HOST_IMAGE_ID = SEMRESATTRS_HOST_IMAGE_ID;
    exports2.SEMRESATTRS_HOST_IMAGE_NAME = SEMRESATTRS_HOST_IMAGE_NAME;
    exports2.SEMRESATTRS_HOST_IMAGE_VERSION = SEMRESATTRS_HOST_IMAGE_VERSION;
    exports2.SEMRESATTRS_HOST_NAME = SEMRESATTRS_HOST_NAME;
    exports2.SEMRESATTRS_HOST_TYPE = SEMRESATTRS_HOST_TYPE;
    exports2.SEMRESATTRS_K8S_CLUSTER_NAME = SEMRESATTRS_K8S_CLUSTER_NAME;
    exports2.SEMRESATTRS_K8S_CONTAINER_NAME = SEMRESATTRS_K8S_CONTAINER_NAME;
    exports2.SEMRESATTRS_K8S_CRONJOB_NAME = SEMRESATTRS_K8S_CRONJOB_NAME;
    exports2.SEMRESATTRS_K8S_CRONJOB_UID = SEMRESATTRS_K8S_CRONJOB_UID;
    exports2.SEMRESATTRS_K8S_DAEMONSET_NAME = SEMRESATTRS_K8S_DAEMONSET_NAME;
    exports2.SEMRESATTRS_K8S_DAEMONSET_UID = SEMRESATTRS_K8S_DAEMONSET_UID;
    exports2.SEMRESATTRS_K8S_DEPLOYMENT_NAME = SEMRESATTRS_K8S_DEPLOYMENT_NAME;
    exports2.SEMRESATTRS_K8S_DEPLOYMENT_UID = SEMRESATTRS_K8S_DEPLOYMENT_UID;
    exports2.SEMRESATTRS_K8S_JOB_NAME = SEMRESATTRS_K8S_JOB_NAME;
    exports2.SEMRESATTRS_K8S_JOB_UID = SEMRESATTRS_K8S_JOB_UID;
    exports2.SEMRESATTRS_K8S_NAMESPACE_NAME = SEMRESATTRS_K8S_NAMESPACE_NAME;
    exports2.SEMRESATTRS_K8S_NODE_NAME = SEMRESATTRS_K8S_NODE_NAME;
    exports2.SEMRESATTRS_K8S_NODE_UID = SEMRESATTRS_K8S_NODE_UID;
    exports2.SEMRESATTRS_K8S_POD_NAME = SEMRESATTRS_K8S_POD_NAME;
    exports2.SEMRESATTRS_K8S_POD_UID = SEMRESATTRS_K8S_POD_UID;
    exports2.SEMRESATTRS_K8S_REPLICASET_NAME = SEMRESATTRS_K8S_REPLICASET_NAME;
    exports2.SEMRESATTRS_K8S_REPLICASET_UID = SEMRESATTRS_K8S_REPLICASET_UID;
    exports2.SEMRESATTRS_K8S_STATEFULSET_NAME = SEMRESATTRS_K8S_STATEFULSET_NAME;
    exports2.SEMRESATTRS_K8S_STATEFULSET_UID = SEMRESATTRS_K8S_STATEFULSET_UID;
    exports2.SEMRESATTRS_OS_DESCRIPTION = SEMRESATTRS_OS_DESCRIPTION;
    exports2.SEMRESATTRS_OS_NAME = SEMRESATTRS_OS_NAME;
    exports2.SEMRESATTRS_OS_TYPE = SEMRESATTRS_OS_TYPE;
    exports2.SEMRESATTRS_OS_VERSION = SEMRESATTRS_OS_VERSION;
    exports2.SEMRESATTRS_PROCESS_COMMAND = SEMRESATTRS_PROCESS_COMMAND;
    exports2.SEMRESATTRS_PROCESS_COMMAND_ARGS = SEMRESATTRS_PROCESS_COMMAND_ARGS;
    exports2.SEMRESATTRS_PROCESS_COMMAND_LINE = SEMRESATTRS_PROCESS_COMMAND_LINE;
    exports2.SEMRESATTRS_PROCESS_EXECUTABLE_NAME = SEMRESATTRS_PROCESS_EXECUTABLE_NAME;
    exports2.SEMRESATTRS_PROCESS_EXECUTABLE_PATH = SEMRESATTRS_PROCESS_EXECUTABLE_PATH;
    exports2.SEMRESATTRS_PROCESS_OWNER = SEMRESATTRS_PROCESS_OWNER;
    exports2.SEMRESATTRS_PROCESS_PID = SEMRESATTRS_PROCESS_PID;
    exports2.SEMRESATTRS_PROCESS_RUNTIME_DESCRIPTION = SEMRESATTRS_PROCESS_RUNTIME_DESCRIPTION;
    exports2.SEMRESATTRS_PROCESS_RUNTIME_NAME = SEMRESATTRS_PROCESS_RUNTIME_NAME;
    exports2.SEMRESATTRS_PROCESS_RUNTIME_VERSION = SEMRESATTRS_PROCESS_RUNTIME_VERSION;
    exports2.SEMRESATTRS_SERVICE_INSTANCE_ID = SEMRESATTRS_SERVICE_INSTANCE_ID;
    exports2.SEMRESATTRS_SERVICE_NAME = SEMRESATTRS_SERVICE_NAME;
    exports2.SEMRESATTRS_SERVICE_NAMESPACE = SEMRESATTRS_SERVICE_NAMESPACE;
    exports2.SEMRESATTRS_SERVICE_VERSION = SEMRESATTRS_SERVICE_VERSION;
    exports2.SEMRESATTRS_TELEMETRY_AUTO_VERSION = SEMRESATTRS_TELEMETRY_AUTO_VERSION;
    exports2.SEMRESATTRS_TELEMETRY_SDK_LANGUAGE = SEMRESATTRS_TELEMETRY_SDK_LANGUAGE;
    exports2.SEMRESATTRS_TELEMETRY_SDK_NAME = SEMRESATTRS_TELEMETRY_SDK_NAME;
    exports2.SEMRESATTRS_TELEMETRY_SDK_VERSION = SEMRESATTRS_TELEMETRY_SDK_VERSION;
    exports2.SEMRESATTRS_WEBENGINE_DESCRIPTION = SEMRESATTRS_WEBENGINE_DESCRIPTION;
    exports2.SEMRESATTRS_WEBENGINE_NAME = SEMRESATTRS_WEBENGINE_NAME;
    exports2.SEMRESATTRS_WEBENGINE_VERSION = SEMRESATTRS_WEBENGINE_VERSION;
    exports2.SemanticResourceAttributes = SemanticResourceAttributes;
    exports2.TELEMETRYSDKLANGUAGEVALUES_CPP = TELEMETRYSDKLANGUAGEVALUES_CPP;
    exports2.TELEMETRYSDKLANGUAGEVALUES_DOTNET = TELEMETRYSDKLANGUAGEVALUES_DOTNET;
    exports2.TELEMETRYSDKLANGUAGEVALUES_ERLANG = TELEMETRYSDKLANGUAGEVALUES_ERLANG;
    exports2.TELEMETRYSDKLANGUAGEVALUES_GO = TELEMETRYSDKLANGUAGEVALUES_GO;
    exports2.TELEMETRYSDKLANGUAGEVALUES_JAVA = TELEMETRYSDKLANGUAGEVALUES_JAVA;
    exports2.TELEMETRYSDKLANGUAGEVALUES_NODEJS = TELEMETRYSDKLANGUAGEVALUES_NODEJS;
    exports2.TELEMETRYSDKLANGUAGEVALUES_PHP = TELEMETRYSDKLANGUAGEVALUES_PHP;
    exports2.TELEMETRYSDKLANGUAGEVALUES_PYTHON = TELEMETRYSDKLANGUAGEVALUES_PYTHON;
    exports2.TELEMETRYSDKLANGUAGEVALUES_RUBY = TELEMETRYSDKLANGUAGEVALUES_RUBY;
    exports2.TELEMETRYSDKLANGUAGEVALUES_WEBJS = TELEMETRYSDKLANGUAGEVALUES_WEBJS;
    exports2.TelemetrySdkLanguageValues = TelemetrySdkLanguageValues;
  }
});

// node_modules/@opentelemetry/semantic-conventions/dist/stable_attributes.cjs
var require_stable_attributes = __commonJS({
  "node_modules/@opentelemetry/semantic-conventions/dist/stable_attributes.cjs"(exports2) {
    var ATTR_ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT = "aspnetcore.diagnostics.exception.result";
    var ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_ABORTED = "aborted";
    var ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_HANDLED = "handled";
    var ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_SKIPPED = "skipped";
    var ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_UNHANDLED = "unhandled";
    var ATTR_ASPNETCORE_DIAGNOSTICS_HANDLER_TYPE = "aspnetcore.diagnostics.handler.type";
    var ATTR_ASPNETCORE_RATE_LIMITING_POLICY = "aspnetcore.rate_limiting.policy";
    var ATTR_ASPNETCORE_RATE_LIMITING_RESULT = "aspnetcore.rate_limiting.result";
    var ASPNETCORE_RATE_LIMITING_RESULT_VALUE_ACQUIRED = "acquired";
    var ASPNETCORE_RATE_LIMITING_RESULT_VALUE_ENDPOINT_LIMITER = "endpoint_limiter";
    var ASPNETCORE_RATE_LIMITING_RESULT_VALUE_GLOBAL_LIMITER = "global_limiter";
    var ASPNETCORE_RATE_LIMITING_RESULT_VALUE_REQUEST_CANCELED = "request_canceled";
    var ATTR_ASPNETCORE_REQUEST_IS_UNHANDLED = "aspnetcore.request.is_unhandled";
    var ATTR_ASPNETCORE_ROUTING_IS_FALLBACK = "aspnetcore.routing.is_fallback";
    var ATTR_ASPNETCORE_ROUTING_MATCH_STATUS = "aspnetcore.routing.match_status";
    var ASPNETCORE_ROUTING_MATCH_STATUS_VALUE_FAILURE = "failure";
    var ASPNETCORE_ROUTING_MATCH_STATUS_VALUE_SUCCESS = "success";
    var ATTR_ASPNETCORE_USER_IS_AUTHENTICATED = "aspnetcore.user.is_authenticated";
    var ATTR_CLIENT_ADDRESS = "client.address";
    var ATTR_CLIENT_PORT = "client.port";
    var ATTR_CODE_COLUMN_NUMBER = "code.column.number";
    var ATTR_CODE_FILE_PATH = "code.file.path";
    var ATTR_CODE_FUNCTION_NAME = "code.function.name";
    var ATTR_CODE_LINE_NUMBER = "code.line.number";
    var ATTR_CODE_STACKTRACE = "code.stacktrace";
    var ATTR_CONTAINER_ID = "container.id";
    var ATTR_CONTAINER_IMAGE_NAME = "container.image.name";
    var ATTR_CONTAINER_IMAGE_REPO_DIGESTS = "container.image.repo_digests";
    var ATTR_CONTAINER_IMAGE_TAGS = "container.image.tags";
    var ATTR_DB_COLLECTION_NAME = "db.collection.name";
    var ATTR_DB_NAMESPACE = "db.namespace";
    var ATTR_DB_OPERATION_BATCH_SIZE = "db.operation.batch.size";
    var ATTR_DB_OPERATION_NAME = "db.operation.name";
    var ATTR_DB_QUERY_SUMMARY = "db.query.summary";
    var ATTR_DB_QUERY_TEXT = "db.query.text";
    var ATTR_DB_RESPONSE_STATUS_CODE = "db.response.status_code";
    var ATTR_DB_STORED_PROCEDURE_NAME = "db.stored_procedure.name";
    var ATTR_DB_SYSTEM_NAME = "db.system.name";
    var DB_SYSTEM_NAME_VALUE_MARIADB = "mariadb";
    var DB_SYSTEM_NAME_VALUE_MICROSOFT_SQL_SERVER = "microsoft.sql_server";
    var DB_SYSTEM_NAME_VALUE_MYSQL = "mysql";
    var DB_SYSTEM_NAME_VALUE_POSTGRESQL = "postgresql";
    var ATTR_DEPLOYMENT_ENVIRONMENT_NAME = "deployment.environment.name";
    var DEPLOYMENT_ENVIRONMENT_NAME_VALUE_DEVELOPMENT = "development";
    var DEPLOYMENT_ENVIRONMENT_NAME_VALUE_PRODUCTION = "production";
    var DEPLOYMENT_ENVIRONMENT_NAME_VALUE_STAGING = "staging";
    var DEPLOYMENT_ENVIRONMENT_NAME_VALUE_TEST = "test";
    var ATTR_DOTNET_GC_HEAP_GENERATION = "dotnet.gc.heap.generation";
    var DOTNET_GC_HEAP_GENERATION_VALUE_GEN0 = "gen0";
    var DOTNET_GC_HEAP_GENERATION_VALUE_GEN1 = "gen1";
    var DOTNET_GC_HEAP_GENERATION_VALUE_GEN2 = "gen2";
    var DOTNET_GC_HEAP_GENERATION_VALUE_LOH = "loh";
    var DOTNET_GC_HEAP_GENERATION_VALUE_POH = "poh";
    var ATTR_ERROR_TYPE = "error.type";
    var ERROR_TYPE_VALUE_OTHER = "_OTHER";
    var ATTR_EXCEPTION_ESCAPED = "exception.escaped";
    var ATTR_EXCEPTION_MESSAGE = "exception.message";
    var ATTR_EXCEPTION_STACKTRACE = "exception.stacktrace";
    var ATTR_EXCEPTION_TYPE = "exception.type";
    var ATTR_HTTP_REQUEST_HEADER = (key) => `http.request.header.${key}`;
    var ATTR_HTTP_REQUEST_METHOD = "http.request.method";
    var HTTP_REQUEST_METHOD_VALUE_OTHER = "_OTHER";
    var HTTP_REQUEST_METHOD_VALUE_CONNECT = "CONNECT";
    var HTTP_REQUEST_METHOD_VALUE_DELETE = "DELETE";
    var HTTP_REQUEST_METHOD_VALUE_GET = "GET";
    var HTTP_REQUEST_METHOD_VALUE_HEAD = "HEAD";
    var HTTP_REQUEST_METHOD_VALUE_OPTIONS = "OPTIONS";
    var HTTP_REQUEST_METHOD_VALUE_PATCH = "PATCH";
    var HTTP_REQUEST_METHOD_VALUE_POST = "POST";
    var HTTP_REQUEST_METHOD_VALUE_PUT = "PUT";
    var HTTP_REQUEST_METHOD_VALUE_TRACE = "TRACE";
    var ATTR_HTTP_REQUEST_METHOD_ORIGINAL = "http.request.method_original";
    var ATTR_HTTP_REQUEST_RESEND_COUNT = "http.request.resend_count";
    var ATTR_HTTP_RESPONSE_HEADER = (key) => `http.response.header.${key}`;
    var ATTR_HTTP_RESPONSE_STATUS_CODE = "http.response.status_code";
    var ATTR_HTTP_ROUTE = "http.route";
    var ATTR_JVM_GC_ACTION = "jvm.gc.action";
    var ATTR_JVM_GC_NAME = "jvm.gc.name";
    var ATTR_JVM_MEMORY_POOL_NAME = "jvm.memory.pool.name";
    var ATTR_JVM_MEMORY_TYPE = "jvm.memory.type";
    var JVM_MEMORY_TYPE_VALUE_HEAP = "heap";
    var JVM_MEMORY_TYPE_VALUE_NON_HEAP = "non_heap";
    var ATTR_JVM_THREAD_DAEMON = "jvm.thread.daemon";
    var ATTR_JVM_THREAD_STATE = "jvm.thread.state";
    var JVM_THREAD_STATE_VALUE_BLOCKED = "blocked";
    var JVM_THREAD_STATE_VALUE_NEW = "new";
    var JVM_THREAD_STATE_VALUE_RUNNABLE = "runnable";
    var JVM_THREAD_STATE_VALUE_TERMINATED = "terminated";
    var JVM_THREAD_STATE_VALUE_TIMED_WAITING = "timed_waiting";
    var JVM_THREAD_STATE_VALUE_WAITING = "waiting";
    var ATTR_K8S_CLUSTER_NAME = "k8s.cluster.name";
    var ATTR_K8S_CLUSTER_UID = "k8s.cluster.uid";
    var ATTR_K8S_CONTAINER_NAME = "k8s.container.name";
    var ATTR_K8S_CONTAINER_RESTART_COUNT = "k8s.container.restart_count";
    var ATTR_K8S_CRONJOB_ANNOTATION = (key) => `k8s.cronjob.annotation.${key}`;
    var ATTR_K8S_CRONJOB_LABEL = (key) => `k8s.cronjob.label.${key}`;
    var ATTR_K8S_CRONJOB_NAME = "k8s.cronjob.name";
    var ATTR_K8S_CRONJOB_UID = "k8s.cronjob.uid";
    var ATTR_K8S_DAEMONSET_ANNOTATION = (key) => `k8s.daemonset.annotation.${key}`;
    var ATTR_K8S_DAEMONSET_LABEL = (key) => `k8s.daemonset.label.${key}`;
    var ATTR_K8S_DAEMONSET_NAME = "k8s.daemonset.name";
    var ATTR_K8S_DAEMONSET_UID = "k8s.daemonset.uid";
    var ATTR_K8S_DEPLOYMENT_ANNOTATION = (key) => `k8s.deployment.annotation.${key}`;
    var ATTR_K8S_DEPLOYMENT_LABEL = (key) => `k8s.deployment.label.${key}`;
    var ATTR_K8S_DEPLOYMENT_NAME = "k8s.deployment.name";
    var ATTR_K8S_DEPLOYMENT_UID = "k8s.deployment.uid";
    var ATTR_K8S_JOB_ANNOTATION = (key) => `k8s.job.annotation.${key}`;
    var ATTR_K8S_JOB_LABEL = (key) => `k8s.job.label.${key}`;
    var ATTR_K8S_JOB_NAME = "k8s.job.name";
    var ATTR_K8S_JOB_UID = "k8s.job.uid";
    var ATTR_K8S_NAMESPACE_ANNOTATION = (key) => `k8s.namespace.annotation.${key}`;
    var ATTR_K8S_NAMESPACE_LABEL = (key) => `k8s.namespace.label.${key}`;
    var ATTR_K8S_NAMESPACE_NAME = "k8s.namespace.name";
    var ATTR_K8S_NODE_ANNOTATION = (key) => `k8s.node.annotation.${key}`;
    var ATTR_K8S_NODE_LABEL = (key) => `k8s.node.label.${key}`;
    var ATTR_K8S_NODE_NAME = "k8s.node.name";
    var ATTR_K8S_NODE_UID = "k8s.node.uid";
    var ATTR_K8S_POD_ANNOTATION = (key) => `k8s.pod.annotation.${key}`;
    var ATTR_K8S_POD_HOSTNAME = "k8s.pod.hostname";
    var ATTR_K8S_POD_IP = "k8s.pod.ip";
    var ATTR_K8S_POD_LABEL = (key) => `k8s.pod.label.${key}`;
    var ATTR_K8S_POD_NAME = "k8s.pod.name";
    var ATTR_K8S_POD_START_TIME = "k8s.pod.start_time";
    var ATTR_K8S_POD_UID = "k8s.pod.uid";
    var ATTR_K8S_REPLICASET_ANNOTATION = (key) => `k8s.replicaset.annotation.${key}`;
    var ATTR_K8S_REPLICASET_LABEL = (key) => `k8s.replicaset.label.${key}`;
    var ATTR_K8S_REPLICASET_NAME = "k8s.replicaset.name";
    var ATTR_K8S_REPLICASET_UID = "k8s.replicaset.uid";
    var ATTR_K8S_STATEFULSET_ANNOTATION = (key) => `k8s.statefulset.annotation.${key}`;
    var ATTR_K8S_STATEFULSET_LABEL = (key) => `k8s.statefulset.label.${key}`;
    var ATTR_K8S_STATEFULSET_NAME = "k8s.statefulset.name";
    var ATTR_K8S_STATEFULSET_UID = "k8s.statefulset.uid";
    var ATTR_NETWORK_LOCAL_ADDRESS = "network.local.address";
    var ATTR_NETWORK_LOCAL_PORT = "network.local.port";
    var ATTR_NETWORK_PEER_ADDRESS = "network.peer.address";
    var ATTR_NETWORK_PEER_PORT = "network.peer.port";
    var ATTR_NETWORK_PROTOCOL_NAME = "network.protocol.name";
    var ATTR_NETWORK_PROTOCOL_VERSION = "network.protocol.version";
    var ATTR_NETWORK_TRANSPORT = "network.transport";
    var NETWORK_TRANSPORT_VALUE_PIPE = "pipe";
    var NETWORK_TRANSPORT_VALUE_QUIC = "quic";
    var NETWORK_TRANSPORT_VALUE_TCP = "tcp";
    var NETWORK_TRANSPORT_VALUE_UDP = "udp";
    var NETWORK_TRANSPORT_VALUE_UNIX = "unix";
    var ATTR_NETWORK_TYPE = "network.type";
    var NETWORK_TYPE_VALUE_IPV4 = "ipv4";
    var NETWORK_TYPE_VALUE_IPV6 = "ipv6";
    var ATTR_OTEL_EVENT_NAME = "otel.event.name";
    var ATTR_OTEL_SCOPE_NAME = "otel.scope.name";
    var ATTR_OTEL_SCOPE_VERSION = "otel.scope.version";
    var ATTR_OTEL_STATUS_CODE = "otel.status_code";
    var OTEL_STATUS_CODE_VALUE_ERROR = "ERROR";
    var OTEL_STATUS_CODE_VALUE_OK = "OK";
    var ATTR_OTEL_STATUS_DESCRIPTION = "otel.status_description";
    var ATTR_SERVER_ADDRESS = "server.address";
    var ATTR_SERVER_PORT = "server.port";
    var ATTR_SERVICE_INSTANCE_ID = "service.instance.id";
    var ATTR_SERVICE_NAME = "service.name";
    var ATTR_SERVICE_NAMESPACE = "service.namespace";
    var ATTR_SERVICE_VERSION = "service.version";
    var ATTR_SIGNALR_CONNECTION_STATUS = "signalr.connection.status";
    var SIGNALR_CONNECTION_STATUS_VALUE_APP_SHUTDOWN = "app_shutdown";
    var SIGNALR_CONNECTION_STATUS_VALUE_NORMAL_CLOSURE = "normal_closure";
    var SIGNALR_CONNECTION_STATUS_VALUE_TIMEOUT = "timeout";
    var ATTR_SIGNALR_TRANSPORT = "signalr.transport";
    var SIGNALR_TRANSPORT_VALUE_LONG_POLLING = "long_polling";
    var SIGNALR_TRANSPORT_VALUE_SERVER_SENT_EVENTS = "server_sent_events";
    var SIGNALR_TRANSPORT_VALUE_WEB_SOCKETS = "web_sockets";
    var ATTR_TELEMETRY_DISTRO_NAME = "telemetry.distro.name";
    var ATTR_TELEMETRY_DISTRO_VERSION = "telemetry.distro.version";
    var ATTR_TELEMETRY_SDK_LANGUAGE = "telemetry.sdk.language";
    var TELEMETRY_SDK_LANGUAGE_VALUE_CPP = "cpp";
    var TELEMETRY_SDK_LANGUAGE_VALUE_DOTNET = "dotnet";
    var TELEMETRY_SDK_LANGUAGE_VALUE_ERLANG = "erlang";
    var TELEMETRY_SDK_LANGUAGE_VALUE_GO = "go";
    var TELEMETRY_SDK_LANGUAGE_VALUE_JAVA = "java";
    var TELEMETRY_SDK_LANGUAGE_VALUE_KOTLIN = "kotlin";
    var TELEMETRY_SDK_LANGUAGE_VALUE_NODEJS = "nodejs";
    var TELEMETRY_SDK_LANGUAGE_VALUE_PHP = "php";
    var TELEMETRY_SDK_LANGUAGE_VALUE_PYTHON = "python";
    var TELEMETRY_SDK_LANGUAGE_VALUE_RUBY = "ruby";
    var TELEMETRY_SDK_LANGUAGE_VALUE_RUST = "rust";
    var TELEMETRY_SDK_LANGUAGE_VALUE_SWIFT = "swift";
    var TELEMETRY_SDK_LANGUAGE_VALUE_WEBJS = "webjs";
    var ATTR_TELEMETRY_SDK_NAME = "telemetry.sdk.name";
    var ATTR_TELEMETRY_SDK_VERSION = "telemetry.sdk.version";
    var ATTR_URL_FRAGMENT = "url.fragment";
    var ATTR_URL_FULL = "url.full";
    var ATTR_URL_PATH = "url.path";
    var ATTR_URL_QUERY = "url.query";
    var ATTR_URL_SCHEME = "url.scheme";
    var ATTR_USER_AGENT_ORIGINAL = "user_agent.original";
    exports2.ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_ABORTED = ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_ABORTED;
    exports2.ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_HANDLED = ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_HANDLED;
    exports2.ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_SKIPPED = ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_SKIPPED;
    exports2.ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_UNHANDLED = ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_UNHANDLED;
    exports2.ASPNETCORE_RATE_LIMITING_RESULT_VALUE_ACQUIRED = ASPNETCORE_RATE_LIMITING_RESULT_VALUE_ACQUIRED;
    exports2.ASPNETCORE_RATE_LIMITING_RESULT_VALUE_ENDPOINT_LIMITER = ASPNETCORE_RATE_LIMITING_RESULT_VALUE_ENDPOINT_LIMITER;
    exports2.ASPNETCORE_RATE_LIMITING_RESULT_VALUE_GLOBAL_LIMITER = ASPNETCORE_RATE_LIMITING_RESULT_VALUE_GLOBAL_LIMITER;
    exports2.ASPNETCORE_RATE_LIMITING_RESULT_VALUE_REQUEST_CANCELED = ASPNETCORE_RATE_LIMITING_RESULT_VALUE_REQUEST_CANCELED;
    exports2.ASPNETCORE_ROUTING_MATCH_STATUS_VALUE_FAILURE = ASPNETCORE_ROUTING_MATCH_STATUS_VALUE_FAILURE;
    exports2.ASPNETCORE_ROUTING_MATCH_STATUS_VALUE_SUCCESS = ASPNETCORE_ROUTING_MATCH_STATUS_VALUE_SUCCESS;
    exports2.ATTR_ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT = ATTR_ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT;
    exports2.ATTR_ASPNETCORE_DIAGNOSTICS_HANDLER_TYPE = ATTR_ASPNETCORE_DIAGNOSTICS_HANDLER_TYPE;
    exports2.ATTR_ASPNETCORE_RATE_LIMITING_POLICY = ATTR_ASPNETCORE_RATE_LIMITING_POLICY;
    exports2.ATTR_ASPNETCORE_RATE_LIMITING_RESULT = ATTR_ASPNETCORE_RATE_LIMITING_RESULT;
    exports2.ATTR_ASPNETCORE_REQUEST_IS_UNHANDLED = ATTR_ASPNETCORE_REQUEST_IS_UNHANDLED;
    exports2.ATTR_ASPNETCORE_ROUTING_IS_FALLBACK = ATTR_ASPNETCORE_ROUTING_IS_FALLBACK;
    exports2.ATTR_ASPNETCORE_ROUTING_MATCH_STATUS = ATTR_ASPNETCORE_ROUTING_MATCH_STATUS;
    exports2.ATTR_ASPNETCORE_USER_IS_AUTHENTICATED = ATTR_ASPNETCORE_USER_IS_AUTHENTICATED;
    exports2.ATTR_CLIENT_ADDRESS = ATTR_CLIENT_ADDRESS;
    exports2.ATTR_CLIENT_PORT = ATTR_CLIENT_PORT;
    exports2.ATTR_CODE_COLUMN_NUMBER = ATTR_CODE_COLUMN_NUMBER;
    exports2.ATTR_CODE_FILE_PATH = ATTR_CODE_FILE_PATH;
    exports2.ATTR_CODE_FUNCTION_NAME = ATTR_CODE_FUNCTION_NAME;
    exports2.ATTR_CODE_LINE_NUMBER = ATTR_CODE_LINE_NUMBER;
    exports2.ATTR_CODE_STACKTRACE = ATTR_CODE_STACKTRACE;
    exports2.ATTR_CONTAINER_ID = ATTR_CONTAINER_ID;
    exports2.ATTR_CONTAINER_IMAGE_NAME = ATTR_CONTAINER_IMAGE_NAME;
    exports2.ATTR_CONTAINER_IMAGE_REPO_DIGESTS = ATTR_CONTAINER_IMAGE_REPO_DIGESTS;
    exports2.ATTR_CONTAINER_IMAGE_TAGS = ATTR_CONTAINER_IMAGE_TAGS;
    exports2.ATTR_DB_COLLECTION_NAME = ATTR_DB_COLLECTION_NAME;
    exports2.ATTR_DB_NAMESPACE = ATTR_DB_NAMESPACE;
    exports2.ATTR_DB_OPERATION_BATCH_SIZE = ATTR_DB_OPERATION_BATCH_SIZE;
    exports2.ATTR_DB_OPERATION_NAME = ATTR_DB_OPERATION_NAME;
    exports2.ATTR_DB_QUERY_SUMMARY = ATTR_DB_QUERY_SUMMARY;
    exports2.ATTR_DB_QUERY_TEXT = ATTR_DB_QUERY_TEXT;
    exports2.ATTR_DB_RESPONSE_STATUS_CODE = ATTR_DB_RESPONSE_STATUS_CODE;
    exports2.ATTR_DB_STORED_PROCEDURE_NAME = ATTR_DB_STORED_PROCEDURE_NAME;
    exports2.ATTR_DB_SYSTEM_NAME = ATTR_DB_SYSTEM_NAME;
    exports2.ATTR_DEPLOYMENT_ENVIRONMENT_NAME = ATTR_DEPLOYMENT_ENVIRONMENT_NAME;
    exports2.ATTR_DOTNET_GC_HEAP_GENERATION = ATTR_DOTNET_GC_HEAP_GENERATION;
    exports2.ATTR_ERROR_TYPE = ATTR_ERROR_TYPE;
    exports2.ATTR_EXCEPTION_ESCAPED = ATTR_EXCEPTION_ESCAPED;
    exports2.ATTR_EXCEPTION_MESSAGE = ATTR_EXCEPTION_MESSAGE;
    exports2.ATTR_EXCEPTION_STACKTRACE = ATTR_EXCEPTION_STACKTRACE;
    exports2.ATTR_EXCEPTION_TYPE = ATTR_EXCEPTION_TYPE;
    exports2.ATTR_HTTP_REQUEST_HEADER = ATTR_HTTP_REQUEST_HEADER;
    exports2.ATTR_HTTP_REQUEST_METHOD = ATTR_HTTP_REQUEST_METHOD;
    exports2.ATTR_HTTP_REQUEST_METHOD_ORIGINAL = ATTR_HTTP_REQUEST_METHOD_ORIGINAL;
    exports2.ATTR_HTTP_REQUEST_RESEND_COUNT = ATTR_HTTP_REQUEST_RESEND_COUNT;
    exports2.ATTR_HTTP_RESPONSE_HEADER = ATTR_HTTP_RESPONSE_HEADER;
    exports2.ATTR_HTTP_RESPONSE_STATUS_CODE = ATTR_HTTP_RESPONSE_STATUS_CODE;
    exports2.ATTR_HTTP_ROUTE = ATTR_HTTP_ROUTE;
    exports2.ATTR_JVM_GC_ACTION = ATTR_JVM_GC_ACTION;
    exports2.ATTR_JVM_GC_NAME = ATTR_JVM_GC_NAME;
    exports2.ATTR_JVM_MEMORY_POOL_NAME = ATTR_JVM_MEMORY_POOL_NAME;
    exports2.ATTR_JVM_MEMORY_TYPE = ATTR_JVM_MEMORY_TYPE;
    exports2.ATTR_JVM_THREAD_DAEMON = ATTR_JVM_THREAD_DAEMON;
    exports2.ATTR_JVM_THREAD_STATE = ATTR_JVM_THREAD_STATE;
    exports2.ATTR_K8S_CLUSTER_NAME = ATTR_K8S_CLUSTER_NAME;
    exports2.ATTR_K8S_CLUSTER_UID = ATTR_K8S_CLUSTER_UID;
    exports2.ATTR_K8S_CONTAINER_NAME = ATTR_K8S_CONTAINER_NAME;
    exports2.ATTR_K8S_CONTAINER_RESTART_COUNT = ATTR_K8S_CONTAINER_RESTART_COUNT;
    exports2.ATTR_K8S_CRONJOB_ANNOTATION = ATTR_K8S_CRONJOB_ANNOTATION;
    exports2.ATTR_K8S_CRONJOB_LABEL = ATTR_K8S_CRONJOB_LABEL;
    exports2.ATTR_K8S_CRONJOB_NAME = ATTR_K8S_CRONJOB_NAME;
    exports2.ATTR_K8S_CRONJOB_UID = ATTR_K8S_CRONJOB_UID;
    exports2.ATTR_K8S_DAEMONSET_ANNOTATION = ATTR_K8S_DAEMONSET_ANNOTATION;
    exports2.ATTR_K8S_DAEMONSET_LABEL = ATTR_K8S_DAEMONSET_LABEL;
    exports2.ATTR_K8S_DAEMONSET_NAME = ATTR_K8S_DAEMONSET_NAME;
    exports2.ATTR_K8S_DAEMONSET_UID = ATTR_K8S_DAEMONSET_UID;
    exports2.ATTR_K8S_DEPLOYMENT_ANNOTATION = ATTR_K8S_DEPLOYMENT_ANNOTATION;
    exports2.ATTR_K8S_DEPLOYMENT_LABEL = ATTR_K8S_DEPLOYMENT_LABEL;
    exports2.ATTR_K8S_DEPLOYMENT_NAME = ATTR_K8S_DEPLOYMENT_NAME;
    exports2.ATTR_K8S_DEPLOYMENT_UID = ATTR_K8S_DEPLOYMENT_UID;
    exports2.ATTR_K8S_JOB_ANNOTATION = ATTR_K8S_JOB_ANNOTATION;
    exports2.ATTR_K8S_JOB_LABEL = ATTR_K8S_JOB_LABEL;
    exports2.ATTR_K8S_JOB_NAME = ATTR_K8S_JOB_NAME;
    exports2.ATTR_K8S_JOB_UID = ATTR_K8S_JOB_UID;
    exports2.ATTR_K8S_NAMESPACE_ANNOTATION = ATTR_K8S_NAMESPACE_ANNOTATION;
    exports2.ATTR_K8S_NAMESPACE_LABEL = ATTR_K8S_NAMESPACE_LABEL;
    exports2.ATTR_K8S_NAMESPACE_NAME = ATTR_K8S_NAMESPACE_NAME;
    exports2.ATTR_K8S_NODE_ANNOTATION = ATTR_K8S_NODE_ANNOTATION;
    exports2.ATTR_K8S_NODE_LABEL = ATTR_K8S_NODE_LABEL;
    exports2.ATTR_K8S_NODE_NAME = ATTR_K8S_NODE_NAME;
    exports2.ATTR_K8S_NODE_UID = ATTR_K8S_NODE_UID;
    exports2.ATTR_K8S_POD_ANNOTATION = ATTR_K8S_POD_ANNOTATION;
    exports2.ATTR_K8S_POD_HOSTNAME = ATTR_K8S_POD_HOSTNAME;
    exports2.ATTR_K8S_POD_IP = ATTR_K8S_POD_IP;
    exports2.ATTR_K8S_POD_LABEL = ATTR_K8S_POD_LABEL;
    exports2.ATTR_K8S_POD_NAME = ATTR_K8S_POD_NAME;
    exports2.ATTR_K8S_POD_START_TIME = ATTR_K8S_POD_START_TIME;
    exports2.ATTR_K8S_POD_UID = ATTR_K8S_POD_UID;
    exports2.ATTR_K8S_REPLICASET_ANNOTATION = ATTR_K8S_REPLICASET_ANNOTATION;
    exports2.ATTR_K8S_REPLICASET_LABEL = ATTR_K8S_REPLICASET_LABEL;
    exports2.ATTR_K8S_REPLICASET_NAME = ATTR_K8S_REPLICASET_NAME;
    exports2.ATTR_K8S_REPLICASET_UID = ATTR_K8S_REPLICASET_UID;
    exports2.ATTR_K8S_STATEFULSET_ANNOTATION = ATTR_K8S_STATEFULSET_ANNOTATION;
    exports2.ATTR_K8S_STATEFULSET_LABEL = ATTR_K8S_STATEFULSET_LABEL;
    exports2.ATTR_K8S_STATEFULSET_NAME = ATTR_K8S_STATEFULSET_NAME;
    exports2.ATTR_K8S_STATEFULSET_UID = ATTR_K8S_STATEFULSET_UID;
    exports2.ATTR_NETWORK_LOCAL_ADDRESS = ATTR_NETWORK_LOCAL_ADDRESS;
    exports2.ATTR_NETWORK_LOCAL_PORT = ATTR_NETWORK_LOCAL_PORT;
    exports2.ATTR_NETWORK_PEER_ADDRESS = ATTR_NETWORK_PEER_ADDRESS;
    exports2.ATTR_NETWORK_PEER_PORT = ATTR_NETWORK_PEER_PORT;
    exports2.ATTR_NETWORK_PROTOCOL_NAME = ATTR_NETWORK_PROTOCOL_NAME;
    exports2.ATTR_NETWORK_PROTOCOL_VERSION = ATTR_NETWORK_PROTOCOL_VERSION;
    exports2.ATTR_NETWORK_TRANSPORT = ATTR_NETWORK_TRANSPORT;
    exports2.ATTR_NETWORK_TYPE = ATTR_NETWORK_TYPE;
    exports2.ATTR_OTEL_EVENT_NAME = ATTR_OTEL_EVENT_NAME;
    exports2.ATTR_OTEL_SCOPE_NAME = ATTR_OTEL_SCOPE_NAME;
    exports2.ATTR_OTEL_SCOPE_VERSION = ATTR_OTEL_SCOPE_VERSION;
    exports2.ATTR_OTEL_STATUS_CODE = ATTR_OTEL_STATUS_CODE;
    exports2.ATTR_OTEL_STATUS_DESCRIPTION = ATTR_OTEL_STATUS_DESCRIPTION;
    exports2.ATTR_SERVER_ADDRESS = ATTR_SERVER_ADDRESS;
    exports2.ATTR_SERVER_PORT = ATTR_SERVER_PORT;
    exports2.ATTR_SERVICE_INSTANCE_ID = ATTR_SERVICE_INSTANCE_ID;
    exports2.ATTR_SERVICE_NAME = ATTR_SERVICE_NAME;
    exports2.ATTR_SERVICE_NAMESPACE = ATTR_SERVICE_NAMESPACE;
    exports2.ATTR_SERVICE_VERSION = ATTR_SERVICE_VERSION;
    exports2.ATTR_SIGNALR_CONNECTION_STATUS = ATTR_SIGNALR_CONNECTION_STATUS;
    exports2.ATTR_SIGNALR_TRANSPORT = ATTR_SIGNALR_TRANSPORT;
    exports2.ATTR_TELEMETRY_DISTRO_NAME = ATTR_TELEMETRY_DISTRO_NAME;
    exports2.ATTR_TELEMETRY_DISTRO_VERSION = ATTR_TELEMETRY_DISTRO_VERSION;
    exports2.ATTR_TELEMETRY_SDK_LANGUAGE = ATTR_TELEMETRY_SDK_LANGUAGE;
    exports2.ATTR_TELEMETRY_SDK_NAME = ATTR_TELEMETRY_SDK_NAME;
    exports2.ATTR_TELEMETRY_SDK_VERSION = ATTR_TELEMETRY_SDK_VERSION;
    exports2.ATTR_URL_FRAGMENT = ATTR_URL_FRAGMENT;
    exports2.ATTR_URL_FULL = ATTR_URL_FULL;
    exports2.ATTR_URL_PATH = ATTR_URL_PATH;
    exports2.ATTR_URL_QUERY = ATTR_URL_QUERY;
    exports2.ATTR_URL_SCHEME = ATTR_URL_SCHEME;
    exports2.ATTR_USER_AGENT_ORIGINAL = ATTR_USER_AGENT_ORIGINAL;
    exports2.DB_SYSTEM_NAME_VALUE_MARIADB = DB_SYSTEM_NAME_VALUE_MARIADB;
    exports2.DB_SYSTEM_NAME_VALUE_MICROSOFT_SQL_SERVER = DB_SYSTEM_NAME_VALUE_MICROSOFT_SQL_SERVER;
    exports2.DB_SYSTEM_NAME_VALUE_MYSQL = DB_SYSTEM_NAME_VALUE_MYSQL;
    exports2.DB_SYSTEM_NAME_VALUE_POSTGRESQL = DB_SYSTEM_NAME_VALUE_POSTGRESQL;
    exports2.DEPLOYMENT_ENVIRONMENT_NAME_VALUE_DEVELOPMENT = DEPLOYMENT_ENVIRONMENT_NAME_VALUE_DEVELOPMENT;
    exports2.DEPLOYMENT_ENVIRONMENT_NAME_VALUE_PRODUCTION = DEPLOYMENT_ENVIRONMENT_NAME_VALUE_PRODUCTION;
    exports2.DEPLOYMENT_ENVIRONMENT_NAME_VALUE_STAGING = DEPLOYMENT_ENVIRONMENT_NAME_VALUE_STAGING;
    exports2.DEPLOYMENT_ENVIRONMENT_NAME_VALUE_TEST = DEPLOYMENT_ENVIRONMENT_NAME_VALUE_TEST;
    exports2.DOTNET_GC_HEAP_GENERATION_VALUE_GEN0 = DOTNET_GC_HEAP_GENERATION_VALUE_GEN0;
    exports2.DOTNET_GC_HEAP_GENERATION_VALUE_GEN1 = DOTNET_GC_HEAP_GENERATION_VALUE_GEN1;
    exports2.DOTNET_GC_HEAP_GENERATION_VALUE_GEN2 = DOTNET_GC_HEAP_GENERATION_VALUE_GEN2;
    exports2.DOTNET_GC_HEAP_GENERATION_VALUE_LOH = DOTNET_GC_HEAP_GENERATION_VALUE_LOH;
    exports2.DOTNET_GC_HEAP_GENERATION_VALUE_POH = DOTNET_GC_HEAP_GENERATION_VALUE_POH;
    exports2.ERROR_TYPE_VALUE_OTHER = ERROR_TYPE_VALUE_OTHER;
    exports2.HTTP_REQUEST_METHOD_VALUE_CONNECT = HTTP_REQUEST_METHOD_VALUE_CONNECT;
    exports2.HTTP_REQUEST_METHOD_VALUE_DELETE = HTTP_REQUEST_METHOD_VALUE_DELETE;
    exports2.HTTP_REQUEST_METHOD_VALUE_GET = HTTP_REQUEST_METHOD_VALUE_GET;
    exports2.HTTP_REQUEST_METHOD_VALUE_HEAD = HTTP_REQUEST_METHOD_VALUE_HEAD;
    exports2.HTTP_REQUEST_METHOD_VALUE_OPTIONS = HTTP_REQUEST_METHOD_VALUE_OPTIONS;
    exports2.HTTP_REQUEST_METHOD_VALUE_OTHER = HTTP_REQUEST_METHOD_VALUE_OTHER;
    exports2.HTTP_REQUEST_METHOD_VALUE_PATCH = HTTP_REQUEST_METHOD_VALUE_PATCH;
    exports2.HTTP_REQUEST_METHOD_VALUE_POST = HTTP_REQUEST_METHOD_VALUE_POST;
    exports2.HTTP_REQUEST_METHOD_VALUE_PUT = HTTP_REQUEST_METHOD_VALUE_PUT;
    exports2.HTTP_REQUEST_METHOD_VALUE_TRACE = HTTP_REQUEST_METHOD_VALUE_TRACE;
    exports2.JVM_MEMORY_TYPE_VALUE_HEAP = JVM_MEMORY_TYPE_VALUE_HEAP;
    exports2.JVM_MEMORY_TYPE_VALUE_NON_HEAP = JVM_MEMORY_TYPE_VALUE_NON_HEAP;
    exports2.JVM_THREAD_STATE_VALUE_BLOCKED = JVM_THREAD_STATE_VALUE_BLOCKED;
    exports2.JVM_THREAD_STATE_VALUE_NEW = JVM_THREAD_STATE_VALUE_NEW;
    exports2.JVM_THREAD_STATE_VALUE_RUNNABLE = JVM_THREAD_STATE_VALUE_RUNNABLE;
    exports2.JVM_THREAD_STATE_VALUE_TERMINATED = JVM_THREAD_STATE_VALUE_TERMINATED;
    exports2.JVM_THREAD_STATE_VALUE_TIMED_WAITING = JVM_THREAD_STATE_VALUE_TIMED_WAITING;
    exports2.JVM_THREAD_STATE_VALUE_WAITING = JVM_THREAD_STATE_VALUE_WAITING;
    exports2.NETWORK_TRANSPORT_VALUE_PIPE = NETWORK_TRANSPORT_VALUE_PIPE;
    exports2.NETWORK_TRANSPORT_VALUE_QUIC = NETWORK_TRANSPORT_VALUE_QUIC;
    exports2.NETWORK_TRANSPORT_VALUE_TCP = NETWORK_TRANSPORT_VALUE_TCP;
    exports2.NETWORK_TRANSPORT_VALUE_UDP = NETWORK_TRANSPORT_VALUE_UDP;
    exports2.NETWORK_TRANSPORT_VALUE_UNIX = NETWORK_TRANSPORT_VALUE_UNIX;
    exports2.NETWORK_TYPE_VALUE_IPV4 = NETWORK_TYPE_VALUE_IPV4;
    exports2.NETWORK_TYPE_VALUE_IPV6 = NETWORK_TYPE_VALUE_IPV6;
    exports2.OTEL_STATUS_CODE_VALUE_ERROR = OTEL_STATUS_CODE_VALUE_ERROR;
    exports2.OTEL_STATUS_CODE_VALUE_OK = OTEL_STATUS_CODE_VALUE_OK;
    exports2.SIGNALR_CONNECTION_STATUS_VALUE_APP_SHUTDOWN = SIGNALR_CONNECTION_STATUS_VALUE_APP_SHUTDOWN;
    exports2.SIGNALR_CONNECTION_STATUS_VALUE_NORMAL_CLOSURE = SIGNALR_CONNECTION_STATUS_VALUE_NORMAL_CLOSURE;
    exports2.SIGNALR_CONNECTION_STATUS_VALUE_TIMEOUT = SIGNALR_CONNECTION_STATUS_VALUE_TIMEOUT;
    exports2.SIGNALR_TRANSPORT_VALUE_LONG_POLLING = SIGNALR_TRANSPORT_VALUE_LONG_POLLING;
    exports2.SIGNALR_TRANSPORT_VALUE_SERVER_SENT_EVENTS = SIGNALR_TRANSPORT_VALUE_SERVER_SENT_EVENTS;
    exports2.SIGNALR_TRANSPORT_VALUE_WEB_SOCKETS = SIGNALR_TRANSPORT_VALUE_WEB_SOCKETS;
    exports2.TELEMETRY_SDK_LANGUAGE_VALUE_CPP = TELEMETRY_SDK_LANGUAGE_VALUE_CPP;
    exports2.TELEMETRY_SDK_LANGUAGE_VALUE_DOTNET = TELEMETRY_SDK_LANGUAGE_VALUE_DOTNET;
    exports2.TELEMETRY_SDK_LANGUAGE_VALUE_ERLANG = TELEMETRY_SDK_LANGUAGE_VALUE_ERLANG;
    exports2.TELEMETRY_SDK_LANGUAGE_VALUE_GO = TELEMETRY_SDK_LANGUAGE_VALUE_GO;
    exports2.TELEMETRY_SDK_LANGUAGE_VALUE_JAVA = TELEMETRY_SDK_LANGUAGE_VALUE_JAVA;
    exports2.TELEMETRY_SDK_LANGUAGE_VALUE_KOTLIN = TELEMETRY_SDK_LANGUAGE_VALUE_KOTLIN;
    exports2.TELEMETRY_SDK_LANGUAGE_VALUE_NODEJS = TELEMETRY_SDK_LANGUAGE_VALUE_NODEJS;
    exports2.TELEMETRY_SDK_LANGUAGE_VALUE_PHP = TELEMETRY_SDK_LANGUAGE_VALUE_PHP;
    exports2.TELEMETRY_SDK_LANGUAGE_VALUE_PYTHON = TELEMETRY_SDK_LANGUAGE_VALUE_PYTHON;
    exports2.TELEMETRY_SDK_LANGUAGE_VALUE_RUBY = TELEMETRY_SDK_LANGUAGE_VALUE_RUBY;
    exports2.TELEMETRY_SDK_LANGUAGE_VALUE_RUST = TELEMETRY_SDK_LANGUAGE_VALUE_RUST;
    exports2.TELEMETRY_SDK_LANGUAGE_VALUE_SWIFT = TELEMETRY_SDK_LANGUAGE_VALUE_SWIFT;
    exports2.TELEMETRY_SDK_LANGUAGE_VALUE_WEBJS = TELEMETRY_SDK_LANGUAGE_VALUE_WEBJS;
  }
});

// node_modules/@opentelemetry/semantic-conventions/dist/stable_metrics.cjs
var require_stable_metrics = __commonJS({
  "node_modules/@opentelemetry/semantic-conventions/dist/stable_metrics.cjs"(exports2) {
    var METRIC_ASPNETCORE_DIAGNOSTICS_EXCEPTIONS = "aspnetcore.diagnostics.exceptions";
    var METRIC_ASPNETCORE_RATE_LIMITING_ACTIVE_REQUEST_LEASES = "aspnetcore.rate_limiting.active_request_leases";
    var METRIC_ASPNETCORE_RATE_LIMITING_QUEUED_REQUESTS = "aspnetcore.rate_limiting.queued_requests";
    var METRIC_ASPNETCORE_RATE_LIMITING_REQUEST_TIME_IN_QUEUE = "aspnetcore.rate_limiting.request.time_in_queue";
    var METRIC_ASPNETCORE_RATE_LIMITING_REQUEST_LEASE_DURATION = "aspnetcore.rate_limiting.request_lease.duration";
    var METRIC_ASPNETCORE_RATE_LIMITING_REQUESTS = "aspnetcore.rate_limiting.requests";
    var METRIC_ASPNETCORE_ROUTING_MATCH_ATTEMPTS = "aspnetcore.routing.match_attempts";
    var METRIC_DB_CLIENT_OPERATION_DURATION = "db.client.operation.duration";
    var METRIC_DOTNET_ASSEMBLY_COUNT = "dotnet.assembly.count";
    var METRIC_DOTNET_EXCEPTIONS = "dotnet.exceptions";
    var METRIC_DOTNET_GC_COLLECTIONS = "dotnet.gc.collections";
    var METRIC_DOTNET_GC_HEAP_TOTAL_ALLOCATED = "dotnet.gc.heap.total_allocated";
    var METRIC_DOTNET_GC_LAST_COLLECTION_HEAP_FRAGMENTATION_SIZE = "dotnet.gc.last_collection.heap.fragmentation.size";
    var METRIC_DOTNET_GC_LAST_COLLECTION_HEAP_SIZE = "dotnet.gc.last_collection.heap.size";
    var METRIC_DOTNET_GC_LAST_COLLECTION_MEMORY_COMMITTED_SIZE = "dotnet.gc.last_collection.memory.committed_size";
    var METRIC_DOTNET_GC_PAUSE_TIME = "dotnet.gc.pause.time";
    var METRIC_DOTNET_JIT_COMPILATION_TIME = "dotnet.jit.compilation.time";
    var METRIC_DOTNET_JIT_COMPILED_IL_SIZE = "dotnet.jit.compiled_il.size";
    var METRIC_DOTNET_JIT_COMPILED_METHODS = "dotnet.jit.compiled_methods";
    var METRIC_DOTNET_MONITOR_LOCK_CONTENTIONS = "dotnet.monitor.lock_contentions";
    var METRIC_DOTNET_PROCESS_CPU_COUNT = "dotnet.process.cpu.count";
    var METRIC_DOTNET_PROCESS_CPU_TIME = "dotnet.process.cpu.time";
    var METRIC_DOTNET_PROCESS_MEMORY_WORKING_SET = "dotnet.process.memory.working_set";
    var METRIC_DOTNET_THREAD_POOL_QUEUE_LENGTH = "dotnet.thread_pool.queue.length";
    var METRIC_DOTNET_THREAD_POOL_THREAD_COUNT = "dotnet.thread_pool.thread.count";
    var METRIC_DOTNET_THREAD_POOL_WORK_ITEM_COUNT = "dotnet.thread_pool.work_item.count";
    var METRIC_DOTNET_TIMER_COUNT = "dotnet.timer.count";
    var METRIC_HTTP_CLIENT_REQUEST_DURATION = "http.client.request.duration";
    var METRIC_HTTP_SERVER_REQUEST_DURATION = "http.server.request.duration";
    var METRIC_JVM_CLASS_COUNT = "jvm.class.count";
    var METRIC_JVM_CLASS_LOADED = "jvm.class.loaded";
    var METRIC_JVM_CLASS_UNLOADED = "jvm.class.unloaded";
    var METRIC_JVM_CPU_COUNT = "jvm.cpu.count";
    var METRIC_JVM_CPU_RECENT_UTILIZATION = "jvm.cpu.recent_utilization";
    var METRIC_JVM_CPU_TIME = "jvm.cpu.time";
    var METRIC_JVM_GC_DURATION = "jvm.gc.duration";
    var METRIC_JVM_MEMORY_COMMITTED = "jvm.memory.committed";
    var METRIC_JVM_MEMORY_LIMIT = "jvm.memory.limit";
    var METRIC_JVM_MEMORY_USED = "jvm.memory.used";
    var METRIC_JVM_MEMORY_USED_AFTER_LAST_GC = "jvm.memory.used_after_last_gc";
    var METRIC_JVM_THREAD_COUNT = "jvm.thread.count";
    var METRIC_KESTREL_ACTIVE_CONNECTIONS = "kestrel.active_connections";
    var METRIC_KESTREL_ACTIVE_TLS_HANDSHAKES = "kestrel.active_tls_handshakes";
    var METRIC_KESTREL_CONNECTION_DURATION = "kestrel.connection.duration";
    var METRIC_KESTREL_QUEUED_CONNECTIONS = "kestrel.queued_connections";
    var METRIC_KESTREL_QUEUED_REQUESTS = "kestrel.queued_requests";
    var METRIC_KESTREL_REJECTED_CONNECTIONS = "kestrel.rejected_connections";
    var METRIC_KESTREL_TLS_HANDSHAKE_DURATION = "kestrel.tls_handshake.duration";
    var METRIC_KESTREL_UPGRADED_CONNECTIONS = "kestrel.upgraded_connections";
    var METRIC_SIGNALR_SERVER_ACTIVE_CONNECTIONS = "signalr.server.active_connections";
    var METRIC_SIGNALR_SERVER_CONNECTION_DURATION = "signalr.server.connection.duration";
    exports2.METRIC_ASPNETCORE_DIAGNOSTICS_EXCEPTIONS = METRIC_ASPNETCORE_DIAGNOSTICS_EXCEPTIONS;
    exports2.METRIC_ASPNETCORE_RATE_LIMITING_ACTIVE_REQUEST_LEASES = METRIC_ASPNETCORE_RATE_LIMITING_ACTIVE_REQUEST_LEASES;
    exports2.METRIC_ASPNETCORE_RATE_LIMITING_QUEUED_REQUESTS = METRIC_ASPNETCORE_RATE_LIMITING_QUEUED_REQUESTS;
    exports2.METRIC_ASPNETCORE_RATE_LIMITING_REQUESTS = METRIC_ASPNETCORE_RATE_LIMITING_REQUESTS;
    exports2.METRIC_ASPNETCORE_RATE_LIMITING_REQUEST_LEASE_DURATION = METRIC_ASPNETCORE_RATE_LIMITING_REQUEST_LEASE_DURATION;
    exports2.METRIC_ASPNETCORE_RATE_LIMITING_REQUEST_TIME_IN_QUEUE = METRIC_ASPNETCORE_RATE_LIMITING_REQUEST_TIME_IN_QUEUE;
    exports2.METRIC_ASPNETCORE_ROUTING_MATCH_ATTEMPTS = METRIC_ASPNETCORE_ROUTING_MATCH_ATTEMPTS;
    exports2.METRIC_DB_CLIENT_OPERATION_DURATION = METRIC_DB_CLIENT_OPERATION_DURATION;
    exports2.METRIC_DOTNET_ASSEMBLY_COUNT = METRIC_DOTNET_ASSEMBLY_COUNT;
    exports2.METRIC_DOTNET_EXCEPTIONS = METRIC_DOTNET_EXCEPTIONS;
    exports2.METRIC_DOTNET_GC_COLLECTIONS = METRIC_DOTNET_GC_COLLECTIONS;
    exports2.METRIC_DOTNET_GC_HEAP_TOTAL_ALLOCATED = METRIC_DOTNET_GC_HEAP_TOTAL_ALLOCATED;
    exports2.METRIC_DOTNET_GC_LAST_COLLECTION_HEAP_FRAGMENTATION_SIZE = METRIC_DOTNET_GC_LAST_COLLECTION_HEAP_FRAGMENTATION_SIZE;
    exports2.METRIC_DOTNET_GC_LAST_COLLECTION_HEAP_SIZE = METRIC_DOTNET_GC_LAST_COLLECTION_HEAP_SIZE;
    exports2.METRIC_DOTNET_GC_LAST_COLLECTION_MEMORY_COMMITTED_SIZE = METRIC_DOTNET_GC_LAST_COLLECTION_MEMORY_COMMITTED_SIZE;
    exports2.METRIC_DOTNET_GC_PAUSE_TIME = METRIC_DOTNET_GC_PAUSE_TIME;
    exports2.METRIC_DOTNET_JIT_COMPILATION_TIME = METRIC_DOTNET_JIT_COMPILATION_TIME;
    exports2.METRIC_DOTNET_JIT_COMPILED_IL_SIZE = METRIC_DOTNET_JIT_COMPILED_IL_SIZE;
    exports2.METRIC_DOTNET_JIT_COMPILED_METHODS = METRIC_DOTNET_JIT_COMPILED_METHODS;
    exports2.METRIC_DOTNET_MONITOR_LOCK_CONTENTIONS = METRIC_DOTNET_MONITOR_LOCK_CONTENTIONS;
    exports2.METRIC_DOTNET_PROCESS_CPU_COUNT = METRIC_DOTNET_PROCESS_CPU_COUNT;
    exports2.METRIC_DOTNET_PROCESS_CPU_TIME = METRIC_DOTNET_PROCESS_CPU_TIME;
    exports2.METRIC_DOTNET_PROCESS_MEMORY_WORKING_SET = METRIC_DOTNET_PROCESS_MEMORY_WORKING_SET;
    exports2.METRIC_DOTNET_THREAD_POOL_QUEUE_LENGTH = METRIC_DOTNET_THREAD_POOL_QUEUE_LENGTH;
    exports2.METRIC_DOTNET_THREAD_POOL_THREAD_COUNT = METRIC_DOTNET_THREAD_POOL_THREAD_COUNT;
    exports2.METRIC_DOTNET_THREAD_POOL_WORK_ITEM_COUNT = METRIC_DOTNET_THREAD_POOL_WORK_ITEM_COUNT;
    exports2.METRIC_DOTNET_TIMER_COUNT = METRIC_DOTNET_TIMER_COUNT;
    exports2.METRIC_HTTP_CLIENT_REQUEST_DURATION = METRIC_HTTP_CLIENT_REQUEST_DURATION;
    exports2.METRIC_HTTP_SERVER_REQUEST_DURATION = METRIC_HTTP_SERVER_REQUEST_DURATION;
    exports2.METRIC_JVM_CLASS_COUNT = METRIC_JVM_CLASS_COUNT;
    exports2.METRIC_JVM_CLASS_LOADED = METRIC_JVM_CLASS_LOADED;
    exports2.METRIC_JVM_CLASS_UNLOADED = METRIC_JVM_CLASS_UNLOADED;
    exports2.METRIC_JVM_CPU_COUNT = METRIC_JVM_CPU_COUNT;
    exports2.METRIC_JVM_CPU_RECENT_UTILIZATION = METRIC_JVM_CPU_RECENT_UTILIZATION;
    exports2.METRIC_JVM_CPU_TIME = METRIC_JVM_CPU_TIME;
    exports2.METRIC_JVM_GC_DURATION = METRIC_JVM_GC_DURATION;
    exports2.METRIC_JVM_MEMORY_COMMITTED = METRIC_JVM_MEMORY_COMMITTED;
    exports2.METRIC_JVM_MEMORY_LIMIT = METRIC_JVM_MEMORY_LIMIT;
    exports2.METRIC_JVM_MEMORY_USED = METRIC_JVM_MEMORY_USED;
    exports2.METRIC_JVM_MEMORY_USED_AFTER_LAST_GC = METRIC_JVM_MEMORY_USED_AFTER_LAST_GC;
    exports2.METRIC_JVM_THREAD_COUNT = METRIC_JVM_THREAD_COUNT;
    exports2.METRIC_KESTREL_ACTIVE_CONNECTIONS = METRIC_KESTREL_ACTIVE_CONNECTIONS;
    exports2.METRIC_KESTREL_ACTIVE_TLS_HANDSHAKES = METRIC_KESTREL_ACTIVE_TLS_HANDSHAKES;
    exports2.METRIC_KESTREL_CONNECTION_DURATION = METRIC_KESTREL_CONNECTION_DURATION;
    exports2.METRIC_KESTREL_QUEUED_CONNECTIONS = METRIC_KESTREL_QUEUED_CONNECTIONS;
    exports2.METRIC_KESTREL_QUEUED_REQUESTS = METRIC_KESTREL_QUEUED_REQUESTS;
    exports2.METRIC_KESTREL_REJECTED_CONNECTIONS = METRIC_KESTREL_REJECTED_CONNECTIONS;
    exports2.METRIC_KESTREL_TLS_HANDSHAKE_DURATION = METRIC_KESTREL_TLS_HANDSHAKE_DURATION;
    exports2.METRIC_KESTREL_UPGRADED_CONNECTIONS = METRIC_KESTREL_UPGRADED_CONNECTIONS;
    exports2.METRIC_SIGNALR_SERVER_ACTIVE_CONNECTIONS = METRIC_SIGNALR_SERVER_ACTIVE_CONNECTIONS;
    exports2.METRIC_SIGNALR_SERVER_CONNECTION_DURATION = METRIC_SIGNALR_SERVER_CONNECTION_DURATION;
  }
});

// node_modules/@opentelemetry/semantic-conventions/dist/stable_events.cjs
var require_stable_events = __commonJS({
  "node_modules/@opentelemetry/semantic-conventions/dist/stable_events.cjs"(exports2) {
    var EVENT_EXCEPTION = "exception";
    exports2.EVENT_EXCEPTION = EVENT_EXCEPTION;
  }
});

// node_modules/@opentelemetry/semantic-conventions/dist/index.cjs
var require_dist = __commonJS({
  "node_modules/@opentelemetry/semantic-conventions/dist/index.cjs"(exports2) {
    Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
    var require_SemanticAttributes2 = require_SemanticAttributes();
    var require_SemanticResourceAttributes2 = require_SemanticResourceAttributes();
    var require_stable_attributes2 = require_stable_attributes();
    var require_stable_metrics2 = require_stable_metrics();
    var require_stable_events2 = require_stable_events();
    exports2.ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_ABORTED = require_stable_attributes2.ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_ABORTED;
    exports2.ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_HANDLED = require_stable_attributes2.ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_HANDLED;
    exports2.ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_SKIPPED = require_stable_attributes2.ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_SKIPPED;
    exports2.ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_UNHANDLED = require_stable_attributes2.ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT_VALUE_UNHANDLED;
    exports2.ASPNETCORE_RATE_LIMITING_RESULT_VALUE_ACQUIRED = require_stable_attributes2.ASPNETCORE_RATE_LIMITING_RESULT_VALUE_ACQUIRED;
    exports2.ASPNETCORE_RATE_LIMITING_RESULT_VALUE_ENDPOINT_LIMITER = require_stable_attributes2.ASPNETCORE_RATE_LIMITING_RESULT_VALUE_ENDPOINT_LIMITER;
    exports2.ASPNETCORE_RATE_LIMITING_RESULT_VALUE_GLOBAL_LIMITER = require_stable_attributes2.ASPNETCORE_RATE_LIMITING_RESULT_VALUE_GLOBAL_LIMITER;
    exports2.ASPNETCORE_RATE_LIMITING_RESULT_VALUE_REQUEST_CANCELED = require_stable_attributes2.ASPNETCORE_RATE_LIMITING_RESULT_VALUE_REQUEST_CANCELED;
    exports2.ASPNETCORE_ROUTING_MATCH_STATUS_VALUE_FAILURE = require_stable_attributes2.ASPNETCORE_ROUTING_MATCH_STATUS_VALUE_FAILURE;
    exports2.ASPNETCORE_ROUTING_MATCH_STATUS_VALUE_SUCCESS = require_stable_attributes2.ASPNETCORE_ROUTING_MATCH_STATUS_VALUE_SUCCESS;
    exports2.ATTR_ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT = require_stable_attributes2.ATTR_ASPNETCORE_DIAGNOSTICS_EXCEPTION_RESULT;
    exports2.ATTR_ASPNETCORE_DIAGNOSTICS_HANDLER_TYPE = require_stable_attributes2.ATTR_ASPNETCORE_DIAGNOSTICS_HANDLER_TYPE;
    exports2.ATTR_ASPNETCORE_RATE_LIMITING_POLICY = require_stable_attributes2.ATTR_ASPNETCORE_RATE_LIMITING_POLICY;
    exports2.ATTR_ASPNETCORE_RATE_LIMITING_RESULT = require_stable_attributes2.ATTR_ASPNETCORE_RATE_LIMITING_RESULT;
    exports2.ATTR_ASPNETCORE_REQUEST_IS_UNHANDLED = require_stable_attributes2.ATTR_ASPNETCORE_REQUEST_IS_UNHANDLED;
    exports2.ATTR_ASPNETCORE_ROUTING_IS_FALLBACK = require_stable_attributes2.ATTR_ASPNETCORE_ROUTING_IS_FALLBACK;
    exports2.ATTR_ASPNETCORE_ROUTING_MATCH_STATUS = require_stable_attributes2.ATTR_ASPNETCORE_ROUTING_MATCH_STATUS;
    exports2.ATTR_ASPNETCORE_USER_IS_AUTHENTICATED = require_stable_attributes2.ATTR_ASPNETCORE_USER_IS_AUTHENTICATED;
    exports2.ATTR_CLIENT_ADDRESS = require_stable_attributes2.ATTR_CLIENT_ADDRESS;
    exports2.ATTR_CLIENT_PORT = require_stable_attributes2.ATTR_CLIENT_PORT;
    exports2.ATTR_CODE_COLUMN_NUMBER = require_stable_attributes2.ATTR_CODE_COLUMN_NUMBER;
    exports2.ATTR_CODE_FILE_PATH = require_stable_attributes2.ATTR_CODE_FILE_PATH;
    exports2.ATTR_CODE_FUNCTION_NAME = require_stable_attributes2.ATTR_CODE_FUNCTION_NAME;
    exports2.ATTR_CODE_LINE_NUMBER = require_stable_attributes2.ATTR_CODE_LINE_NUMBER;
    exports2.ATTR_CODE_STACKTRACE = require_stable_attributes2.ATTR_CODE_STACKTRACE;
    exports2.ATTR_CONTAINER_ID = require_stable_attributes2.ATTR_CONTAINER_ID;
    exports2.ATTR_CONTAINER_IMAGE_NAME = require_stable_attributes2.ATTR_CONTAINER_IMAGE_NAME;
    exports2.ATTR_CONTAINER_IMAGE_REPO_DIGESTS = require_stable_attributes2.ATTR_CONTAINER_IMAGE_REPO_DIGESTS;
    exports2.ATTR_CONTAINER_IMAGE_TAGS = require_stable_attributes2.ATTR_CONTAINER_IMAGE_TAGS;
    exports2.ATTR_DB_COLLECTION_NAME = require_stable_attributes2.ATTR_DB_COLLECTION_NAME;
    exports2.ATTR_DB_NAMESPACE = require_stable_attributes2.ATTR_DB_NAMESPACE;
    exports2.ATTR_DB_OPERATION_BATCH_SIZE = require_stable_attributes2.ATTR_DB_OPERATION_BATCH_SIZE;
    exports2.ATTR_DB_OPERATION_NAME = require_stable_attributes2.ATTR_DB_OPERATION_NAME;
    exports2.ATTR_DB_QUERY_SUMMARY = require_stable_attributes2.ATTR_DB_QUERY_SUMMARY;
    exports2.ATTR_DB_QUERY_TEXT = require_stable_attributes2.ATTR_DB_QUERY_TEXT;
    exports2.ATTR_DB_RESPONSE_STATUS_CODE = require_stable_attributes2.ATTR_DB_RESPONSE_STATUS_CODE;
    exports2.ATTR_DB_STORED_PROCEDURE_NAME = require_stable_attributes2.ATTR_DB_STORED_PROCEDURE_NAME;
    exports2.ATTR_DB_SYSTEM_NAME = require_stable_attributes2.ATTR_DB_SYSTEM_NAME;
    exports2.ATTR_DEPLOYMENT_ENVIRONMENT_NAME = require_stable_attributes2.ATTR_DEPLOYMENT_ENVIRONMENT_NAME;
    exports2.ATTR_DOTNET_GC_HEAP_GENERATION = require_stable_attributes2.ATTR_DOTNET_GC_HEAP_GENERATION;
    exports2.ATTR_ERROR_TYPE = require_stable_attributes2.ATTR_ERROR_TYPE;
    exports2.ATTR_EXCEPTION_ESCAPED = require_stable_attributes2.ATTR_EXCEPTION_ESCAPED;
    exports2.ATTR_EXCEPTION_MESSAGE = require_stable_attributes2.ATTR_EXCEPTION_MESSAGE;
    exports2.ATTR_EXCEPTION_STACKTRACE = require_stable_attributes2.ATTR_EXCEPTION_STACKTRACE;
    exports2.ATTR_EXCEPTION_TYPE = require_stable_attributes2.ATTR_EXCEPTION_TYPE;
    exports2.ATTR_HTTP_REQUEST_HEADER = require_stable_attributes2.ATTR_HTTP_REQUEST_HEADER;
    exports2.ATTR_HTTP_REQUEST_METHOD = require_stable_attributes2.ATTR_HTTP_REQUEST_METHOD;
    exports2.ATTR_HTTP_REQUEST_METHOD_ORIGINAL = require_stable_attributes2.ATTR_HTTP_REQUEST_METHOD_ORIGINAL;
    exports2.ATTR_HTTP_REQUEST_RESEND_COUNT = require_stable_attributes2.ATTR_HTTP_REQUEST_RESEND_COUNT;
    exports2.ATTR_HTTP_RESPONSE_HEADER = require_stable_attributes2.ATTR_HTTP_RESPONSE_HEADER;
    exports2.ATTR_HTTP_RESPONSE_STATUS_CODE = require_stable_attributes2.ATTR_HTTP_RESPONSE_STATUS_CODE;
    exports2.ATTR_HTTP_ROUTE = require_stable_attributes2.ATTR_HTTP_ROUTE;
    exports2.ATTR_JVM_GC_ACTION = require_stable_attributes2.ATTR_JVM_GC_ACTION;
    exports2.ATTR_JVM_GC_NAME = require_stable_attributes2.ATTR_JVM_GC_NAME;
    exports2.ATTR_JVM_MEMORY_POOL_NAME = require_stable_attributes2.ATTR_JVM_MEMORY_POOL_NAME;
    exports2.ATTR_JVM_MEMORY_TYPE = require_stable_attributes2.ATTR_JVM_MEMORY_TYPE;
    exports2.ATTR_JVM_THREAD_DAEMON = require_stable_attributes2.ATTR_JVM_THREAD_DAEMON;
    exports2.ATTR_JVM_THREAD_STATE = require_stable_attributes2.ATTR_JVM_THREAD_STATE;
    exports2.ATTR_K8S_CLUSTER_NAME = require_stable_attributes2.ATTR_K8S_CLUSTER_NAME;
    exports2.ATTR_K8S_CLUSTER_UID = require_stable_attributes2.ATTR_K8S_CLUSTER_UID;
    exports2.ATTR_K8S_CONTAINER_NAME = require_stable_attributes2.ATTR_K8S_CONTAINER_NAME;
    exports2.ATTR_K8S_CONTAINER_RESTART_COUNT = require_stable_attributes2.ATTR_K8S_CONTAINER_RESTART_COUNT;
    exports2.ATTR_K8S_CRONJOB_ANNOTATION = require_stable_attributes2.ATTR_K8S_CRONJOB_ANNOTATION;
    exports2.ATTR_K8S_CRONJOB_LABEL = require_stable_attributes2.ATTR_K8S_CRONJOB_LABEL;
    exports2.ATTR_K8S_CRONJOB_NAME = require_stable_attributes2.ATTR_K8S_CRONJOB_NAME;
    exports2.ATTR_K8S_CRONJOB_UID = require_stable_attributes2.ATTR_K8S_CRONJOB_UID;
    exports2.ATTR_K8S_DAEMONSET_ANNOTATION = require_stable_attributes2.ATTR_K8S_DAEMONSET_ANNOTATION;
    exports2.ATTR_K8S_DAEMONSET_LABEL = require_stable_attributes2.ATTR_K8S_DAEMONSET_LABEL;
    exports2.ATTR_K8S_DAEMONSET_NAME = require_stable_attributes2.ATTR_K8S_DAEMONSET_NAME;
    exports2.ATTR_K8S_DAEMONSET_UID = require_stable_attributes2.ATTR_K8S_DAEMONSET_UID;
    exports2.ATTR_K8S_DEPLOYMENT_ANNOTATION = require_stable_attributes2.ATTR_K8S_DEPLOYMENT_ANNOTATION;
    exports2.ATTR_K8S_DEPLOYMENT_LABEL = require_stable_attributes2.ATTR_K8S_DEPLOYMENT_LABEL;
    exports2.ATTR_K8S_DEPLOYMENT_NAME = require_stable_attributes2.ATTR_K8S_DEPLOYMENT_NAME;
    exports2.ATTR_K8S_DEPLOYMENT_UID = require_stable_attributes2.ATTR_K8S_DEPLOYMENT_UID;
    exports2.ATTR_K8S_JOB_ANNOTATION = require_stable_attributes2.ATTR_K8S_JOB_ANNOTATION;
    exports2.ATTR_K8S_JOB_LABEL = require_stable_attributes2.ATTR_K8S_JOB_LABEL;
    exports2.ATTR_K8S_JOB_NAME = require_stable_attributes2.ATTR_K8S_JOB_NAME;
    exports2.ATTR_K8S_JOB_UID = require_stable_attributes2.ATTR_K8S_JOB_UID;
    exports2.ATTR_K8S_NAMESPACE_ANNOTATION = require_stable_attributes2.ATTR_K8S_NAMESPACE_ANNOTATION;
    exports2.ATTR_K8S_NAMESPACE_LABEL = require_stable_attributes2.ATTR_K8S_NAMESPACE_LABEL;
    exports2.ATTR_K8S_NAMESPACE_NAME = require_stable_attributes2.ATTR_K8S_NAMESPACE_NAME;
    exports2.ATTR_K8S_NODE_ANNOTATION = require_stable_attributes2.ATTR_K8S_NODE_ANNOTATION;
    exports2.ATTR_K8S_NODE_LABEL = require_stable_attributes2.ATTR_K8S_NODE_LABEL;
    exports2.ATTR_K8S_NODE_NAME = require_stable_attributes2.ATTR_K8S_NODE_NAME;
    exports2.ATTR_K8S_NODE_UID = require_stable_attributes2.ATTR_K8S_NODE_UID;
    exports2.ATTR_K8S_POD_ANNOTATION = require_stable_attributes2.ATTR_K8S_POD_ANNOTATION;
    exports2.ATTR_K8S_POD_HOSTNAME = require_stable_attributes2.ATTR_K8S_POD_HOSTNAME;
    exports2.ATTR_K8S_POD_IP = require_stable_attributes2.ATTR_K8S_POD_IP;
    exports2.ATTR_K8S_POD_LABEL = require_stable_attributes2.ATTR_K8S_POD_LABEL;
    exports2.ATTR_K8S_POD_NAME = require_stable_attributes2.ATTR_K8S_POD_NAME;
    exports2.ATTR_K8S_POD_START_TIME = require_stable_attributes2.ATTR_K8S_POD_START_TIME;
    exports2.ATTR_K8S_POD_UID = require_stable_attributes2.ATTR_K8S_POD_UID;
    exports2.ATTR_K8S_REPLICASET_ANNOTATION = require_stable_attributes2.ATTR_K8S_REPLICASET_ANNOTATION;
    exports2.ATTR_K8S_REPLICASET_LABEL = require_stable_attributes2.ATTR_K8S_REPLICASET_LABEL;
    exports2.ATTR_K8S_REPLICASET_NAME = require_stable_attributes2.ATTR_K8S_REPLICASET_NAME;
    exports2.ATTR_K8S_REPLICASET_UID = require_stable_attributes2.ATTR_K8S_REPLICASET_UID;
    exports2.ATTR_K8S_STATEFULSET_ANNOTATION = require_stable_attributes2.ATTR_K8S_STATEFULSET_ANNOTATION;
    exports2.ATTR_K8S_STATEFULSET_LABEL = require_stable_attributes2.ATTR_K8S_STATEFULSET_LABEL;
    exports2.ATTR_K8S_STATEFULSET_NAME = require_stable_attributes2.ATTR_K8S_STATEFULSET_NAME;
    exports2.ATTR_K8S_STATEFULSET_UID = require_stable_attributes2.ATTR_K8S_STATEFULSET_UID;
    exports2.ATTR_NETWORK_LOCAL_ADDRESS = require_stable_attributes2.ATTR_NETWORK_LOCAL_ADDRESS;
    exports2.ATTR_NETWORK_LOCAL_PORT = require_stable_attributes2.ATTR_NETWORK_LOCAL_PORT;
    exports2.ATTR_NETWORK_PEER_ADDRESS = require_stable_attributes2.ATTR_NETWORK_PEER_ADDRESS;
    exports2.ATTR_NETWORK_PEER_PORT = require_stable_attributes2.ATTR_NETWORK_PEER_PORT;
    exports2.ATTR_NETWORK_PROTOCOL_NAME = require_stable_attributes2.ATTR_NETWORK_PROTOCOL_NAME;
    exports2.ATTR_NETWORK_PROTOCOL_VERSION = require_stable_attributes2.ATTR_NETWORK_PROTOCOL_VERSION;
    exports2.ATTR_NETWORK_TRANSPORT = require_stable_attributes2.ATTR_NETWORK_TRANSPORT;
    exports2.ATTR_NETWORK_TYPE = require_stable_attributes2.ATTR_NETWORK_TYPE;
    exports2.ATTR_OTEL_EVENT_NAME = require_stable_attributes2.ATTR_OTEL_EVENT_NAME;
    exports2.ATTR_OTEL_SCOPE_NAME = require_stable_attributes2.ATTR_OTEL_SCOPE_NAME;
    exports2.ATTR_OTEL_SCOPE_VERSION = require_stable_attributes2.ATTR_OTEL_SCOPE_VERSION;
    exports2.ATTR_OTEL_STATUS_CODE = require_stable_attributes2.ATTR_OTEL_STATUS_CODE;
    exports2.ATTR_OTEL_STATUS_DESCRIPTION = require_stable_attributes2.ATTR_OTEL_STATUS_DESCRIPTION;
    exports2.ATTR_SERVER_ADDRESS = require_stable_attributes2.ATTR_SERVER_ADDRESS;
    exports2.ATTR_SERVER_PORT = require_stable_attributes2.ATTR_SERVER_PORT;
    exports2.ATTR_SERVICE_INSTANCE_ID = require_stable_attributes2.ATTR_SERVICE_INSTANCE_ID;
    exports2.ATTR_SERVICE_NAME = require_stable_attributes2.ATTR_SERVICE_NAME;
    exports2.ATTR_SERVICE_NAMESPACE = require_stable_attributes2.ATTR_SERVICE_NAMESPACE;
    exports2.ATTR_SERVICE_VERSION = require_stable_attributes2.ATTR_SERVICE_VERSION;
    exports2.ATTR_SIGNALR_CONNECTION_STATUS = require_stable_attributes2.ATTR_SIGNALR_CONNECTION_STATUS;
    exports2.ATTR_SIGNALR_TRANSPORT = require_stable_attributes2.ATTR_SIGNALR_TRANSPORT;
    exports2.ATTR_TELEMETRY_DISTRO_NAME = require_stable_attributes2.ATTR_TELEMETRY_DISTRO_NAME;
    exports2.ATTR_TELEMETRY_DISTRO_VERSION = require_stable_attributes2.ATTR_TELEMETRY_DISTRO_VERSION;
    exports2.ATTR_TELEMETRY_SDK_LANGUAGE = require_stable_attributes2.ATTR_TELEMETRY_SDK_LANGUAGE;
    exports2.ATTR_TELEMETRY_SDK_NAME = require_stable_attributes2.ATTR_TELEMETRY_SDK_NAME;
    exports2.ATTR_TELEMETRY_SDK_VERSION = require_stable_attributes2.ATTR_TELEMETRY_SDK_VERSION;
    exports2.ATTR_URL_FRAGMENT = require_stable_attributes2.ATTR_URL_FRAGMENT;
    exports2.ATTR_URL_FULL = require_stable_attributes2.ATTR_URL_FULL;
    exports2.ATTR_URL_PATH = require_stable_attributes2.ATTR_URL_PATH;
    exports2.ATTR_URL_QUERY = require_stable_attributes2.ATTR_URL_QUERY;
    exports2.ATTR_URL_SCHEME = require_stable_attributes2.ATTR_URL_SCHEME;
    exports2.ATTR_USER_AGENT_ORIGINAL = require_stable_attributes2.ATTR_USER_AGENT_ORIGINAL;
    exports2.AWSECSLAUNCHTYPEVALUES_EC2 = require_SemanticResourceAttributes2.AWSECSLAUNCHTYPEVALUES_EC2;
    exports2.AWSECSLAUNCHTYPEVALUES_FARGATE = require_SemanticResourceAttributes2.AWSECSLAUNCHTYPEVALUES_FARGATE;
    exports2.AwsEcsLaunchtypeValues = require_SemanticResourceAttributes2.AwsEcsLaunchtypeValues;
    exports2.CLOUDPLATFORMVALUES_ALIBABA_CLOUD_ECS = require_SemanticResourceAttributes2.CLOUDPLATFORMVALUES_ALIBABA_CLOUD_ECS;
    exports2.CLOUDPLATFORMVALUES_ALIBABA_CLOUD_FC = require_SemanticResourceAttributes2.CLOUDPLATFORMVALUES_ALIBABA_CLOUD_FC;
    exports2.CLOUDPLATFORMVALUES_AWS_EC2 = require_SemanticResourceAttributes2.CLOUDPLATFORMVALUES_AWS_EC2;
    exports2.CLOUDPLATFORMVALUES_AWS_ECS = require_SemanticResourceAttributes2.CLOUDPLATFORMVALUES_AWS_ECS;
    exports2.CLOUDPLATFORMVALUES_AWS_EKS = require_SemanticResourceAttributes2.CLOUDPLATFORMVALUES_AWS_EKS;
    exports2.CLOUDPLATFORMVALUES_AWS_ELASTIC_BEANSTALK = require_SemanticResourceAttributes2.CLOUDPLATFORMVALUES_AWS_ELASTIC_BEANSTALK;
    exports2.CLOUDPLATFORMVALUES_AWS_LAMBDA = require_SemanticResourceAttributes2.CLOUDPLATFORMVALUES_AWS_LAMBDA;
    exports2.CLOUDPLATFORMVALUES_AZURE_AKS = require_SemanticResourceAttributes2.CLOUDPLATFORMVALUES_AZURE_AKS;
    exports2.CLOUDPLATFORMVALUES_AZURE_APP_SERVICE = require_SemanticResourceAttributes2.CLOUDPLATFORMVALUES_AZURE_APP_SERVICE;
    exports2.CLOUDPLATFORMVALUES_AZURE_CONTAINER_INSTANCES = require_SemanticResourceAttributes2.CLOUDPLATFORMVALUES_AZURE_CONTAINER_INSTANCES;
    exports2.CLOUDPLATFORMVALUES_AZURE_FUNCTIONS = require_SemanticResourceAttributes2.CLOUDPLATFORMVALUES_AZURE_FUNCTIONS;
    exports2.CLOUDPLATFORMVALUES_AZURE_VM = require_SemanticResourceAttributes2.CLOUDPLATFORMVALUES_AZURE_VM;
    exports2.CLOUDPLATFORMVALUES_GCP_APP_ENGINE = require_SemanticResourceAttributes2.CLOUDPLATFORMVALUES_GCP_APP_ENGINE;
    exports2.CLOUDPLATFORMVALUES_GCP_CLOUD_FUNCTIONS = require_SemanticResourceAttributes2.CLOUDPLATFORMVALUES_GCP_CLOUD_FUNCTIONS;
    exports2.CLOUDPLATFORMVALUES_GCP_CLOUD_RUN = require_SemanticResourceAttributes2.CLOUDPLATFORMVALUES_GCP_CLOUD_RUN;
    exports2.CLOUDPLATFORMVALUES_GCP_COMPUTE_ENGINE = require_SemanticResourceAttributes2.CLOUDPLATFORMVALUES_GCP_COMPUTE_ENGINE;
    exports2.CLOUDPLATFORMVALUES_GCP_KUBERNETES_ENGINE = require_SemanticResourceAttributes2.CLOUDPLATFORMVALUES_GCP_KUBERNETES_ENGINE;
    exports2.CLOUDPROVIDERVALUES_ALIBABA_CLOUD = require_SemanticResourceAttributes2.CLOUDPROVIDERVALUES_ALIBABA_CLOUD;
    exports2.CLOUDPROVIDERVALUES_AWS = require_SemanticResourceAttributes2.CLOUDPROVIDERVALUES_AWS;
    exports2.CLOUDPROVIDERVALUES_AZURE = require_SemanticResourceAttributes2.CLOUDPROVIDERVALUES_AZURE;
    exports2.CLOUDPROVIDERVALUES_GCP = require_SemanticResourceAttributes2.CLOUDPROVIDERVALUES_GCP;
    exports2.CloudPlatformValues = require_SemanticResourceAttributes2.CloudPlatformValues;
    exports2.CloudProviderValues = require_SemanticResourceAttributes2.CloudProviderValues;
    exports2.DBCASSANDRACONSISTENCYLEVELVALUES_ALL = require_SemanticAttributes2.DBCASSANDRACONSISTENCYLEVELVALUES_ALL;
    exports2.DBCASSANDRACONSISTENCYLEVELVALUES_ANY = require_SemanticAttributes2.DBCASSANDRACONSISTENCYLEVELVALUES_ANY;
    exports2.DBCASSANDRACONSISTENCYLEVELVALUES_EACH_QUORUM = require_SemanticAttributes2.DBCASSANDRACONSISTENCYLEVELVALUES_EACH_QUORUM;
    exports2.DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_ONE = require_SemanticAttributes2.DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_ONE;
    exports2.DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_QUORUM = require_SemanticAttributes2.DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_QUORUM;
    exports2.DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_SERIAL = require_SemanticAttributes2.DBCASSANDRACONSISTENCYLEVELVALUES_LOCAL_SERIAL;
    exports2.DBCASSANDRACONSISTENCYLEVELVALUES_ONE = require_SemanticAttributes2.DBCASSANDRACONSISTENCYLEVELVALUES_ONE;
    exports2.DBCASSANDRACONSISTENCYLEVELVALUES_QUORUM = require_SemanticAttributes2.DBCASSANDRACONSISTENCYLEVELVALUES_QUORUM;
    exports2.DBCASSANDRACONSISTENCYLEVELVALUES_SERIAL = require_SemanticAttributes2.DBCASSANDRACONSISTENCYLEVELVALUES_SERIAL;
    exports2.DBCASSANDRACONSISTENCYLEVELVALUES_THREE = require_SemanticAttributes2.DBCASSANDRACONSISTENCYLEVELVALUES_THREE;
    exports2.DBCASSANDRACONSISTENCYLEVELVALUES_TWO = require_SemanticAttributes2.DBCASSANDRACONSISTENCYLEVELVALUES_TWO;
    exports2.DBSYSTEMVALUES_ADABAS = require_SemanticAttributes2.DBSYSTEMVALUES_ADABAS;
    exports2.DBSYSTEMVALUES_CACHE = require_SemanticAttributes2.DBSYSTEMVALUES_CACHE;
    exports2.DBSYSTEMVALUES_CASSANDRA = require_SemanticAttributes2.DBSYSTEMVALUES_CASSANDRA;
    exports2.DBSYSTEMVALUES_CLOUDSCAPE = require_SemanticAttributes2.DBSYSTEMVALUES_CLOUDSCAPE;
    exports2.DBSYSTEMVALUES_COCKROACHDB = require_SemanticAttributes2.DBSYSTEMVALUES_COCKROACHDB;
    exports2.DBSYSTEMVALUES_COLDFUSION = require_SemanticAttributes2.DBSYSTEMVALUES_COLDFUSION;
    exports2.DBSYSTEMVALUES_COSMOSDB = require_SemanticAttributes2.DBSYSTEMVALUES_COSMOSDB;
    exports2.DBSYSTEMVALUES_COUCHBASE = require_SemanticAttributes2.DBSYSTEMVALUES_COUCHBASE;
    exports2.DBSYSTEMVALUES_COUCHDB = require_SemanticAttributes2.DBSYSTEMVALUES_COUCHDB;
    exports2.DBSYSTEMVALUES_DB2 = require_SemanticAttributes2.DBSYSTEMVALUES_DB2;
    exports2.DBSYSTEMVALUES_DERBY = require_SemanticAttributes2.DBSYSTEMVALUES_DERBY;
    exports2.DBSYSTEMVALUES_DYNAMODB = require_SemanticAttributes2.DBSYSTEMVALUES_DYNAMODB;
    exports2.DBSYSTEMVALUES_EDB = require_SemanticAttributes2.DBSYSTEMVALUES_EDB;
    exports2.DBSYSTEMVALUES_ELASTICSEARCH = require_SemanticAttributes2.DBSYSTEMVALUES_ELASTICSEARCH;
    exports2.DBSYSTEMVALUES_FILEMAKER = require_SemanticAttributes2.DBSYSTEMVALUES_FILEMAKER;
    exports2.DBSYSTEMVALUES_FIREBIRD = require_SemanticAttributes2.DBSYSTEMVALUES_FIREBIRD;
    exports2.DBSYSTEMVALUES_FIRSTSQL = require_SemanticAttributes2.DBSYSTEMVALUES_FIRSTSQL;
    exports2.DBSYSTEMVALUES_GEODE = require_SemanticAttributes2.DBSYSTEMVALUES_GEODE;
    exports2.DBSYSTEMVALUES_H2 = require_SemanticAttributes2.DBSYSTEMVALUES_H2;
    exports2.DBSYSTEMVALUES_HANADB = require_SemanticAttributes2.DBSYSTEMVALUES_HANADB;
    exports2.DBSYSTEMVALUES_HBASE = require_SemanticAttributes2.DBSYSTEMVALUES_HBASE;
    exports2.DBSYSTEMVALUES_HIVE = require_SemanticAttributes2.DBSYSTEMVALUES_HIVE;
    exports2.DBSYSTEMVALUES_HSQLDB = require_SemanticAttributes2.DBSYSTEMVALUES_HSQLDB;
    exports2.DBSYSTEMVALUES_INFORMIX = require_SemanticAttributes2.DBSYSTEMVALUES_INFORMIX;
    exports2.DBSYSTEMVALUES_INGRES = require_SemanticAttributes2.DBSYSTEMVALUES_INGRES;
    exports2.DBSYSTEMVALUES_INSTANTDB = require_SemanticAttributes2.DBSYSTEMVALUES_INSTANTDB;
    exports2.DBSYSTEMVALUES_INTERBASE = require_SemanticAttributes2.DBSYSTEMVALUES_INTERBASE;
    exports2.DBSYSTEMVALUES_MARIADB = require_SemanticAttributes2.DBSYSTEMVALUES_MARIADB;
    exports2.DBSYSTEMVALUES_MAXDB = require_SemanticAttributes2.DBSYSTEMVALUES_MAXDB;
    exports2.DBSYSTEMVALUES_MEMCACHED = require_SemanticAttributes2.DBSYSTEMVALUES_MEMCACHED;
    exports2.DBSYSTEMVALUES_MONGODB = require_SemanticAttributes2.DBSYSTEMVALUES_MONGODB;
    exports2.DBSYSTEMVALUES_MSSQL = require_SemanticAttributes2.DBSYSTEMVALUES_MSSQL;
    exports2.DBSYSTEMVALUES_MYSQL = require_SemanticAttributes2.DBSYSTEMVALUES_MYSQL;
    exports2.DBSYSTEMVALUES_NEO4J = require_SemanticAttributes2.DBSYSTEMVALUES_NEO4J;
    exports2.DBSYSTEMVALUES_NETEZZA = require_SemanticAttributes2.DBSYSTEMVALUES_NETEZZA;
    exports2.DBSYSTEMVALUES_ORACLE = require_SemanticAttributes2.DBSYSTEMVALUES_ORACLE;
    exports2.DBSYSTEMVALUES_OTHER_SQL = require_SemanticAttributes2.DBSYSTEMVALUES_OTHER_SQL;
    exports2.DBSYSTEMVALUES_PERVASIVE = require_SemanticAttributes2.DBSYSTEMVALUES_PERVASIVE;
    exports2.DBSYSTEMVALUES_POINTBASE = require_SemanticAttributes2.DBSYSTEMVALUES_POINTBASE;
    exports2.DBSYSTEMVALUES_POSTGRESQL = require_SemanticAttributes2.DBSYSTEMVALUES_POSTGRESQL;
    exports2.DBSYSTEMVALUES_PROGRESS = require_SemanticAttributes2.DBSYSTEMVALUES_PROGRESS;
    exports2.DBSYSTEMVALUES_REDIS = require_SemanticAttributes2.DBSYSTEMVALUES_REDIS;
    exports2.DBSYSTEMVALUES_REDSHIFT = require_SemanticAttributes2.DBSYSTEMVALUES_REDSHIFT;
    exports2.DBSYSTEMVALUES_SQLITE = require_SemanticAttributes2.DBSYSTEMVALUES_SQLITE;
    exports2.DBSYSTEMVALUES_SYBASE = require_SemanticAttributes2.DBSYSTEMVALUES_SYBASE;
    exports2.DBSYSTEMVALUES_TERADATA = require_SemanticAttributes2.DBSYSTEMVALUES_TERADATA;
    exports2.DBSYSTEMVALUES_VERTICA = require_SemanticAttributes2.DBSYSTEMVALUES_VERTICA;
    exports2.DB_SYSTEM_NAME_VALUE_MARIADB = require_stable_attributes2.DB_SYSTEM_NAME_VALUE_MARIADB;
    exports2.DB_SYSTEM_NAME_VALUE_MICROSOFT_SQL_SERVER = require_stable_attributes2.DB_SYSTEM_NAME_VALUE_MICROSOFT_SQL_SERVER;
    exports2.DB_SYSTEM_NAME_VALUE_MYSQL = require_stable_attributes2.DB_SYSTEM_NAME_VALUE_MYSQL;
    exports2.DB_SYSTEM_NAME_VALUE_POSTGRESQL = require_stable_attributes2.DB_SYSTEM_NAME_VALUE_POSTGRESQL;
    exports2.DEPLOYMENT_ENVIRONMENT_NAME_VALUE_DEVELOPMENT = require_stable_attributes2.DEPLOYMENT_ENVIRONMENT_NAME_VALUE_DEVELOPMENT;
    exports2.DEPLOYMENT_ENVIRONMENT_NAME_VALUE_PRODUCTION = require_stable_attributes2.DEPLOYMENT_ENVIRONMENT_NAME_VALUE_PRODUCTION;
    exports2.DEPLOYMENT_ENVIRONMENT_NAME_VALUE_STAGING = require_stable_attributes2.DEPLOYMENT_ENVIRONMENT_NAME_VALUE_STAGING;
    exports2.DEPLOYMENT_ENVIRONMENT_NAME_VALUE_TEST = require_stable_attributes2.DEPLOYMENT_ENVIRONMENT_NAME_VALUE_TEST;
    exports2.DOTNET_GC_HEAP_GENERATION_VALUE_GEN0 = require_stable_attributes2.DOTNET_GC_HEAP_GENERATION_VALUE_GEN0;
    exports2.DOTNET_GC_HEAP_GENERATION_VALUE_GEN1 = require_stable_attributes2.DOTNET_GC_HEAP_GENERATION_VALUE_GEN1;
    exports2.DOTNET_GC_HEAP_GENERATION_VALUE_GEN2 = require_stable_attributes2.DOTNET_GC_HEAP_GENERATION_VALUE_GEN2;
    exports2.DOTNET_GC_HEAP_GENERATION_VALUE_LOH = require_stable_attributes2.DOTNET_GC_HEAP_GENERATION_VALUE_LOH;
    exports2.DOTNET_GC_HEAP_GENERATION_VALUE_POH = require_stable_attributes2.DOTNET_GC_HEAP_GENERATION_VALUE_POH;
    exports2.DbCassandraConsistencyLevelValues = require_SemanticAttributes2.DbCassandraConsistencyLevelValues;
    exports2.DbSystemValues = require_SemanticAttributes2.DbSystemValues;
    exports2.ERROR_TYPE_VALUE_OTHER = require_stable_attributes2.ERROR_TYPE_VALUE_OTHER;
    exports2.EVENT_EXCEPTION = require_stable_events2.EVENT_EXCEPTION;
    exports2.FAASDOCUMENTOPERATIONVALUES_DELETE = require_SemanticAttributes2.FAASDOCUMENTOPERATIONVALUES_DELETE;
    exports2.FAASDOCUMENTOPERATIONVALUES_EDIT = require_SemanticAttributes2.FAASDOCUMENTOPERATIONVALUES_EDIT;
    exports2.FAASDOCUMENTOPERATIONVALUES_INSERT = require_SemanticAttributes2.FAASDOCUMENTOPERATIONVALUES_INSERT;
    exports2.FAASINVOKEDPROVIDERVALUES_ALIBABA_CLOUD = require_SemanticAttributes2.FAASINVOKEDPROVIDERVALUES_ALIBABA_CLOUD;
    exports2.FAASINVOKEDPROVIDERVALUES_AWS = require_SemanticAttributes2.FAASINVOKEDPROVIDERVALUES_AWS;
    exports2.FAASINVOKEDPROVIDERVALUES_AZURE = require_SemanticAttributes2.FAASINVOKEDPROVIDERVALUES_AZURE;
    exports2.FAASINVOKEDPROVIDERVALUES_GCP = require_SemanticAttributes2.FAASINVOKEDPROVIDERVALUES_GCP;
    exports2.FAASTRIGGERVALUES_DATASOURCE = require_SemanticAttributes2.FAASTRIGGERVALUES_DATASOURCE;
    exports2.FAASTRIGGERVALUES_HTTP = require_SemanticAttributes2.FAASTRIGGERVALUES_HTTP;
    exports2.FAASTRIGGERVALUES_OTHER = require_SemanticAttributes2.FAASTRIGGERVALUES_OTHER;
    exports2.FAASTRIGGERVALUES_PUBSUB = require_SemanticAttributes2.FAASTRIGGERVALUES_PUBSUB;
    exports2.FAASTRIGGERVALUES_TIMER = require_SemanticAttributes2.FAASTRIGGERVALUES_TIMER;
    exports2.FaasDocumentOperationValues = require_SemanticAttributes2.FaasDocumentOperationValues;
    exports2.FaasInvokedProviderValues = require_SemanticAttributes2.FaasInvokedProviderValues;
    exports2.FaasTriggerValues = require_SemanticAttributes2.FaasTriggerValues;
    exports2.HOSTARCHVALUES_AMD64 = require_SemanticResourceAttributes2.HOSTARCHVALUES_AMD64;
    exports2.HOSTARCHVALUES_ARM32 = require_SemanticResourceAttributes2.HOSTARCHVALUES_ARM32;
    exports2.HOSTARCHVALUES_ARM64 = require_SemanticResourceAttributes2.HOSTARCHVALUES_ARM64;
    exports2.HOSTARCHVALUES_IA64 = require_SemanticResourceAttributes2.HOSTARCHVALUES_IA64;
    exports2.HOSTARCHVALUES_PPC32 = require_SemanticResourceAttributes2.HOSTARCHVALUES_PPC32;
    exports2.HOSTARCHVALUES_PPC64 = require_SemanticResourceAttributes2.HOSTARCHVALUES_PPC64;
    exports2.HOSTARCHVALUES_X86 = require_SemanticResourceAttributes2.HOSTARCHVALUES_X86;
    exports2.HTTPFLAVORVALUES_HTTP_1_0 = require_SemanticAttributes2.HTTPFLAVORVALUES_HTTP_1_0;
    exports2.HTTPFLAVORVALUES_HTTP_1_1 = require_SemanticAttributes2.HTTPFLAVORVALUES_HTTP_1_1;
    exports2.HTTPFLAVORVALUES_HTTP_2_0 = require_SemanticAttributes2.HTTPFLAVORVALUES_HTTP_2_0;
    exports2.HTTPFLAVORVALUES_QUIC = require_SemanticAttributes2.HTTPFLAVORVALUES_QUIC;
    exports2.HTTPFLAVORVALUES_SPDY = require_SemanticAttributes2.HTTPFLAVORVALUES_SPDY;
    exports2.HTTP_REQUEST_METHOD_VALUE_CONNECT = require_stable_attributes2.HTTP_REQUEST_METHOD_VALUE_CONNECT;
    exports2.HTTP_REQUEST_METHOD_VALUE_DELETE = require_stable_attributes2.HTTP_REQUEST_METHOD_VALUE_DELETE;
    exports2.HTTP_REQUEST_METHOD_VALUE_GET = require_stable_attributes2.HTTP_REQUEST_METHOD_VALUE_GET;
    exports2.HTTP_REQUEST_METHOD_VALUE_HEAD = require_stable_attributes2.HTTP_REQUEST_METHOD_VALUE_HEAD;
    exports2.HTTP_REQUEST_METHOD_VALUE_OPTIONS = require_stable_attributes2.HTTP_REQUEST_METHOD_VALUE_OPTIONS;
    exports2.HTTP_REQUEST_METHOD_VALUE_OTHER = require_stable_attributes2.HTTP_REQUEST_METHOD_VALUE_OTHER;
    exports2.HTTP_REQUEST_METHOD_VALUE_PATCH = require_stable_attributes2.HTTP_REQUEST_METHOD_VALUE_PATCH;
    exports2.HTTP_REQUEST_METHOD_VALUE_POST = require_stable_attributes2.HTTP_REQUEST_METHOD_VALUE_POST;
    exports2.HTTP_REQUEST_METHOD_VALUE_PUT = require_stable_attributes2.HTTP_REQUEST_METHOD_VALUE_PUT;
    exports2.HTTP_REQUEST_METHOD_VALUE_TRACE = require_stable_attributes2.HTTP_REQUEST_METHOD_VALUE_TRACE;
    exports2.HostArchValues = require_SemanticResourceAttributes2.HostArchValues;
    exports2.HttpFlavorValues = require_SemanticAttributes2.HttpFlavorValues;
    exports2.JVM_MEMORY_TYPE_VALUE_HEAP = require_stable_attributes2.JVM_MEMORY_TYPE_VALUE_HEAP;
    exports2.JVM_MEMORY_TYPE_VALUE_NON_HEAP = require_stable_attributes2.JVM_MEMORY_TYPE_VALUE_NON_HEAP;
    exports2.JVM_THREAD_STATE_VALUE_BLOCKED = require_stable_attributes2.JVM_THREAD_STATE_VALUE_BLOCKED;
    exports2.JVM_THREAD_STATE_VALUE_NEW = require_stable_attributes2.JVM_THREAD_STATE_VALUE_NEW;
    exports2.JVM_THREAD_STATE_VALUE_RUNNABLE = require_stable_attributes2.JVM_THREAD_STATE_VALUE_RUNNABLE;
    exports2.JVM_THREAD_STATE_VALUE_TERMINATED = require_stable_attributes2.JVM_THREAD_STATE_VALUE_TERMINATED;
    exports2.JVM_THREAD_STATE_VALUE_TIMED_WAITING = require_stable_attributes2.JVM_THREAD_STATE_VALUE_TIMED_WAITING;
    exports2.JVM_THREAD_STATE_VALUE_WAITING = require_stable_attributes2.JVM_THREAD_STATE_VALUE_WAITING;
    exports2.MESSAGETYPEVALUES_RECEIVED = require_SemanticAttributes2.MESSAGETYPEVALUES_RECEIVED;
    exports2.MESSAGETYPEVALUES_SENT = require_SemanticAttributes2.MESSAGETYPEVALUES_SENT;
    exports2.MESSAGINGDESTINATIONKINDVALUES_QUEUE = require_SemanticAttributes2.MESSAGINGDESTINATIONKINDVALUES_QUEUE;
    exports2.MESSAGINGDESTINATIONKINDVALUES_TOPIC = require_SemanticAttributes2.MESSAGINGDESTINATIONKINDVALUES_TOPIC;
    exports2.MESSAGINGOPERATIONVALUES_PROCESS = require_SemanticAttributes2.MESSAGINGOPERATIONVALUES_PROCESS;
    exports2.MESSAGINGOPERATIONVALUES_RECEIVE = require_SemanticAttributes2.MESSAGINGOPERATIONVALUES_RECEIVE;
    exports2.METRIC_ASPNETCORE_DIAGNOSTICS_EXCEPTIONS = require_stable_metrics2.METRIC_ASPNETCORE_DIAGNOSTICS_EXCEPTIONS;
    exports2.METRIC_ASPNETCORE_RATE_LIMITING_ACTIVE_REQUEST_LEASES = require_stable_metrics2.METRIC_ASPNETCORE_RATE_LIMITING_ACTIVE_REQUEST_LEASES;
    exports2.METRIC_ASPNETCORE_RATE_LIMITING_QUEUED_REQUESTS = require_stable_metrics2.METRIC_ASPNETCORE_RATE_LIMITING_QUEUED_REQUESTS;
    exports2.METRIC_ASPNETCORE_RATE_LIMITING_REQUESTS = require_stable_metrics2.METRIC_ASPNETCORE_RATE_LIMITING_REQUESTS;
    exports2.METRIC_ASPNETCORE_RATE_LIMITING_REQUEST_LEASE_DURATION = require_stable_metrics2.METRIC_ASPNETCORE_RATE_LIMITING_REQUEST_LEASE_DURATION;
    exports2.METRIC_ASPNETCORE_RATE_LIMITING_REQUEST_TIME_IN_QUEUE = require_stable_metrics2.METRIC_ASPNETCORE_RATE_LIMITING_REQUEST_TIME_IN_QUEUE;
    exports2.METRIC_ASPNETCORE_ROUTING_MATCH_ATTEMPTS = require_stable_metrics2.METRIC_ASPNETCORE_ROUTING_MATCH_ATTEMPTS;
    exports2.METRIC_DB_CLIENT_OPERATION_DURATION = require_stable_metrics2.METRIC_DB_CLIENT_OPERATION_DURATION;
    exports2.METRIC_DOTNET_ASSEMBLY_COUNT = require_stable_metrics2.METRIC_DOTNET_ASSEMBLY_COUNT;
    exports2.METRIC_DOTNET_EXCEPTIONS = require_stable_metrics2.METRIC_DOTNET_EXCEPTIONS;
    exports2.METRIC_DOTNET_GC_COLLECTIONS = require_stable_metrics2.METRIC_DOTNET_GC_COLLECTIONS;
    exports2.METRIC_DOTNET_GC_HEAP_TOTAL_ALLOCATED = require_stable_metrics2.METRIC_DOTNET_GC_HEAP_TOTAL_ALLOCATED;
    exports2.METRIC_DOTNET_GC_LAST_COLLECTION_HEAP_FRAGMENTATION_SIZE = require_stable_metrics2.METRIC_DOTNET_GC_LAST_COLLECTION_HEAP_FRAGMENTATION_SIZE;
    exports2.METRIC_DOTNET_GC_LAST_COLLECTION_HEAP_SIZE = require_stable_metrics2.METRIC_DOTNET_GC_LAST_COLLECTION_HEAP_SIZE;
    exports2.METRIC_DOTNET_GC_LAST_COLLECTION_MEMORY_COMMITTED_SIZE = require_stable_metrics2.METRIC_DOTNET_GC_LAST_COLLECTION_MEMORY_COMMITTED_SIZE;
    exports2.METRIC_DOTNET_GC_PAUSE_TIME = require_stable_metrics2.METRIC_DOTNET_GC_PAUSE_TIME;
    exports2.METRIC_DOTNET_JIT_COMPILATION_TIME = require_stable_metrics2.METRIC_DOTNET_JIT_COMPILATION_TIME;
    exports2.METRIC_DOTNET_JIT_COMPILED_IL_SIZE = require_stable_metrics2.METRIC_DOTNET_JIT_COMPILED_IL_SIZE;
    exports2.METRIC_DOTNET_JIT_COMPILED_METHODS = require_stable_metrics2.METRIC_DOTNET_JIT_COMPILED_METHODS;
    exports2.METRIC_DOTNET_MONITOR_LOCK_CONTENTIONS = require_stable_metrics2.METRIC_DOTNET_MONITOR_LOCK_CONTENTIONS;
    exports2.METRIC_DOTNET_PROCESS_CPU_COUNT = require_stable_metrics2.METRIC_DOTNET_PROCESS_CPU_COUNT;
    exports2.METRIC_DOTNET_PROCESS_CPU_TIME = require_stable_metrics2.METRIC_DOTNET_PROCESS_CPU_TIME;
    exports2.METRIC_DOTNET_PROCESS_MEMORY_WORKING_SET = require_stable_metrics2.METRIC_DOTNET_PROCESS_MEMORY_WORKING_SET;
    exports2.METRIC_DOTNET_THREAD_POOL_QUEUE_LENGTH = require_stable_metrics2.METRIC_DOTNET_THREAD_POOL_QUEUE_LENGTH;
    exports2.METRIC_DOTNET_THREAD_POOL_THREAD_COUNT = require_stable_metrics2.METRIC_DOTNET_THREAD_POOL_THREAD_COUNT;
    exports2.METRIC_DOTNET_THREAD_POOL_WORK_ITEM_COUNT = require_stable_metrics2.METRIC_DOTNET_THREAD_POOL_WORK_ITEM_COUNT;
    exports2.METRIC_DOTNET_TIMER_COUNT = require_stable_metrics2.METRIC_DOTNET_TIMER_COUNT;
    exports2.METRIC_HTTP_CLIENT_REQUEST_DURATION = require_stable_metrics2.METRIC_HTTP_CLIENT_REQUEST_DURATION;
    exports2.METRIC_HTTP_SERVER_REQUEST_DURATION = require_stable_metrics2.METRIC_HTTP_SERVER_REQUEST_DURATION;
    exports2.METRIC_JVM_CLASS_COUNT = require_stable_metrics2.METRIC_JVM_CLASS_COUNT;
    exports2.METRIC_JVM_CLASS_LOADED = require_stable_metrics2.METRIC_JVM_CLASS_LOADED;
    exports2.METRIC_JVM_CLASS_UNLOADED = require_stable_metrics2.METRIC_JVM_CLASS_UNLOADED;
    exports2.METRIC_JVM_CPU_COUNT = require_stable_metrics2.METRIC_JVM_CPU_COUNT;
    exports2.METRIC_JVM_CPU_RECENT_UTILIZATION = require_stable_metrics2.METRIC_JVM_CPU_RECENT_UTILIZATION;
    exports2.METRIC_JVM_CPU_TIME = require_stable_metrics2.METRIC_JVM_CPU_TIME;
    exports2.METRIC_JVM_GC_DURATION = require_stable_metrics2.METRIC_JVM_GC_DURATION;
    exports2.METRIC_JVM_MEMORY_COMMITTED = require_stable_metrics2.METRIC_JVM_MEMORY_COMMITTED;
    exports2.METRIC_JVM_MEMORY_LIMIT = require_stable_metrics2.METRIC_JVM_MEMORY_LIMIT;
    exports2.METRIC_JVM_MEMORY_USED = require_stable_metrics2.METRIC_JVM_MEMORY_USED;
    exports2.METRIC_JVM_MEMORY_USED_AFTER_LAST_GC = require_stable_metrics2.METRIC_JVM_MEMORY_USED_AFTER_LAST_GC;
    exports2.METRIC_JVM_THREAD_COUNT = require_stable_metrics2.METRIC_JVM_THREAD_COUNT;
    exports2.METRIC_KESTREL_ACTIVE_CONNECTIONS = require_stable_metrics2.METRIC_KESTREL_ACTIVE_CONNECTIONS;
    exports2.METRIC_KESTREL_ACTIVE_TLS_HANDSHAKES = require_stable_metrics2.METRIC_KESTREL_ACTIVE_TLS_HANDSHAKES;
    exports2.METRIC_KESTREL_CONNECTION_DURATION = require_stable_metrics2.METRIC_KESTREL_CONNECTION_DURATION;
    exports2.METRIC_KESTREL_QUEUED_CONNECTIONS = require_stable_metrics2.METRIC_KESTREL_QUEUED_CONNECTIONS;
    exports2.METRIC_KESTREL_QUEUED_REQUESTS = require_stable_metrics2.METRIC_KESTREL_QUEUED_REQUESTS;
    exports2.METRIC_KESTREL_REJECTED_CONNECTIONS = require_stable_metrics2.METRIC_KESTREL_REJECTED_CONNECTIONS;
    exports2.METRIC_KESTREL_TLS_HANDSHAKE_DURATION = require_stable_metrics2.METRIC_KESTREL_TLS_HANDSHAKE_DURATION;
    exports2.METRIC_KESTREL_UPGRADED_CONNECTIONS = require_stable_metrics2.METRIC_KESTREL_UPGRADED_CONNECTIONS;
    exports2.METRIC_SIGNALR_SERVER_ACTIVE_CONNECTIONS = require_stable_metrics2.METRIC_SIGNALR_SERVER_ACTIVE_CONNECTIONS;
    exports2.METRIC_SIGNALR_SERVER_CONNECTION_DURATION = require_stable_metrics2.METRIC_SIGNALR_SERVER_CONNECTION_DURATION;
    exports2.MessageTypeValues = require_SemanticAttributes2.MessageTypeValues;
    exports2.MessagingDestinationKindValues = require_SemanticAttributes2.MessagingDestinationKindValues;
    exports2.MessagingOperationValues = require_SemanticAttributes2.MessagingOperationValues;
    exports2.NETHOSTCONNECTIONSUBTYPEVALUES_CDMA = require_SemanticAttributes2.NETHOSTCONNECTIONSUBTYPEVALUES_CDMA;
    exports2.NETHOSTCONNECTIONSUBTYPEVALUES_CDMA2000_1XRTT = require_SemanticAttributes2.NETHOSTCONNECTIONSUBTYPEVALUES_CDMA2000_1XRTT;
    exports2.NETHOSTCONNECTIONSUBTYPEVALUES_EDGE = require_SemanticAttributes2.NETHOSTCONNECTIONSUBTYPEVALUES_EDGE;
    exports2.NETHOSTCONNECTIONSUBTYPEVALUES_EHRPD = require_SemanticAttributes2.NETHOSTCONNECTIONSUBTYPEVALUES_EHRPD;
    exports2.NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_0 = require_SemanticAttributes2.NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_0;
    exports2.NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_A = require_SemanticAttributes2.NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_A;
    exports2.NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_B = require_SemanticAttributes2.NETHOSTCONNECTIONSUBTYPEVALUES_EVDO_B;
    exports2.NETHOSTCONNECTIONSUBTYPEVALUES_GPRS = require_SemanticAttributes2.NETHOSTCONNECTIONSUBTYPEVALUES_GPRS;
    exports2.NETHOSTCONNECTIONSUBTYPEVALUES_GSM = require_SemanticAttributes2.NETHOSTCONNECTIONSUBTYPEVALUES_GSM;
    exports2.NETHOSTCONNECTIONSUBTYPEVALUES_HSDPA = require_SemanticAttributes2.NETHOSTCONNECTIONSUBTYPEVALUES_HSDPA;
    exports2.NETHOSTCONNECTIONSUBTYPEVALUES_HSPA = require_SemanticAttributes2.NETHOSTCONNECTIONSUBTYPEVALUES_HSPA;
    exports2.NETHOSTCONNECTIONSUBTYPEVALUES_HSPAP = require_SemanticAttributes2.NETHOSTCONNECTIONSUBTYPEVALUES_HSPAP;
    exports2.NETHOSTCONNECTIONSUBTYPEVALUES_HSUPA = require_SemanticAttributes2.NETHOSTCONNECTIONSUBTYPEVALUES_HSUPA;
    exports2.NETHOSTCONNECTIONSUBTYPEVALUES_IDEN = require_SemanticAttributes2.NETHOSTCONNECTIONSUBTYPEVALUES_IDEN;
    exports2.NETHOSTCONNECTIONSUBTYPEVALUES_IWLAN = require_SemanticAttributes2.NETHOSTCONNECTIONSUBTYPEVALUES_IWLAN;
    exports2.NETHOSTCONNECTIONSUBTYPEVALUES_LTE = require_SemanticAttributes2.NETHOSTCONNECTIONSUBTYPEVALUES_LTE;
    exports2.NETHOSTCONNECTIONSUBTYPEVALUES_LTE_CA = require_SemanticAttributes2.NETHOSTCONNECTIONSUBTYPEVALUES_LTE_CA;
    exports2.NETHOSTCONNECTIONSUBTYPEVALUES_NR = require_SemanticAttributes2.NETHOSTCONNECTIONSUBTYPEVALUES_NR;
    exports2.NETHOSTCONNECTIONSUBTYPEVALUES_NRNSA = require_SemanticAttributes2.NETHOSTCONNECTIONSUBTYPEVALUES_NRNSA;
    exports2.NETHOSTCONNECTIONSUBTYPEVALUES_TD_SCDMA = require_SemanticAttributes2.NETHOSTCONNECTIONSUBTYPEVALUES_TD_SCDMA;
    exports2.NETHOSTCONNECTIONSUBTYPEVALUES_UMTS = require_SemanticAttributes2.NETHOSTCONNECTIONSUBTYPEVALUES_UMTS;
    exports2.NETHOSTCONNECTIONTYPEVALUES_CELL = require_SemanticAttributes2.NETHOSTCONNECTIONTYPEVALUES_CELL;
    exports2.NETHOSTCONNECTIONTYPEVALUES_UNAVAILABLE = require_SemanticAttributes2.NETHOSTCONNECTIONTYPEVALUES_UNAVAILABLE;
    exports2.NETHOSTCONNECTIONTYPEVALUES_UNKNOWN = require_SemanticAttributes2.NETHOSTCONNECTIONTYPEVALUES_UNKNOWN;
    exports2.NETHOSTCONNECTIONTYPEVALUES_WIFI = require_SemanticAttributes2.NETHOSTCONNECTIONTYPEVALUES_WIFI;
    exports2.NETHOSTCONNECTIONTYPEVALUES_WIRED = require_SemanticAttributes2.NETHOSTCONNECTIONTYPEVALUES_WIRED;
    exports2.NETTRANSPORTVALUES_INPROC = require_SemanticAttributes2.NETTRANSPORTVALUES_INPROC;
    exports2.NETTRANSPORTVALUES_IP = require_SemanticAttributes2.NETTRANSPORTVALUES_IP;
    exports2.NETTRANSPORTVALUES_IP_TCP = require_SemanticAttributes2.NETTRANSPORTVALUES_IP_TCP;
    exports2.NETTRANSPORTVALUES_IP_UDP = require_SemanticAttributes2.NETTRANSPORTVALUES_IP_UDP;
    exports2.NETTRANSPORTVALUES_OTHER = require_SemanticAttributes2.NETTRANSPORTVALUES_OTHER;
    exports2.NETTRANSPORTVALUES_PIPE = require_SemanticAttributes2.NETTRANSPORTVALUES_PIPE;
    exports2.NETTRANSPORTVALUES_UNIX = require_SemanticAttributes2.NETTRANSPORTVALUES_UNIX;
    exports2.NETWORK_TRANSPORT_VALUE_PIPE = require_stable_attributes2.NETWORK_TRANSPORT_VALUE_PIPE;
    exports2.NETWORK_TRANSPORT_VALUE_QUIC = require_stable_attributes2.NETWORK_TRANSPORT_VALUE_QUIC;
    exports2.NETWORK_TRANSPORT_VALUE_TCP = require_stable_attributes2.NETWORK_TRANSPORT_VALUE_TCP;
    exports2.NETWORK_TRANSPORT_VALUE_UDP = require_stable_attributes2.NETWORK_TRANSPORT_VALUE_UDP;
    exports2.NETWORK_TRANSPORT_VALUE_UNIX = require_stable_attributes2.NETWORK_TRANSPORT_VALUE_UNIX;
    exports2.NETWORK_TYPE_VALUE_IPV4 = require_stable_attributes2.NETWORK_TYPE_VALUE_IPV4;
    exports2.NETWORK_TYPE_VALUE_IPV6 = require_stable_attributes2.NETWORK_TYPE_VALUE_IPV6;
    exports2.NetHostConnectionSubtypeValues = require_SemanticAttributes2.NetHostConnectionSubtypeValues;
    exports2.NetHostConnectionTypeValues = require_SemanticAttributes2.NetHostConnectionTypeValues;
    exports2.NetTransportValues = require_SemanticAttributes2.NetTransportValues;
    exports2.OSTYPEVALUES_AIX = require_SemanticResourceAttributes2.OSTYPEVALUES_AIX;
    exports2.OSTYPEVALUES_DARWIN = require_SemanticResourceAttributes2.OSTYPEVALUES_DARWIN;
    exports2.OSTYPEVALUES_DRAGONFLYBSD = require_SemanticResourceAttributes2.OSTYPEVALUES_DRAGONFLYBSD;
    exports2.OSTYPEVALUES_FREEBSD = require_SemanticResourceAttributes2.OSTYPEVALUES_FREEBSD;
    exports2.OSTYPEVALUES_HPUX = require_SemanticResourceAttributes2.OSTYPEVALUES_HPUX;
    exports2.OSTYPEVALUES_LINUX = require_SemanticResourceAttributes2.OSTYPEVALUES_LINUX;
    exports2.OSTYPEVALUES_NETBSD = require_SemanticResourceAttributes2.OSTYPEVALUES_NETBSD;
    exports2.OSTYPEVALUES_OPENBSD = require_SemanticResourceAttributes2.OSTYPEVALUES_OPENBSD;
    exports2.OSTYPEVALUES_SOLARIS = require_SemanticResourceAttributes2.OSTYPEVALUES_SOLARIS;
    exports2.OSTYPEVALUES_WINDOWS = require_SemanticResourceAttributes2.OSTYPEVALUES_WINDOWS;
    exports2.OSTYPEVALUES_Z_OS = require_SemanticResourceAttributes2.OSTYPEVALUES_Z_OS;
    exports2.OTEL_STATUS_CODE_VALUE_ERROR = require_stable_attributes2.OTEL_STATUS_CODE_VALUE_ERROR;
    exports2.OTEL_STATUS_CODE_VALUE_OK = require_stable_attributes2.OTEL_STATUS_CODE_VALUE_OK;
    exports2.OsTypeValues = require_SemanticResourceAttributes2.OsTypeValues;
    exports2.RPCGRPCSTATUSCODEVALUES_ABORTED = require_SemanticAttributes2.RPCGRPCSTATUSCODEVALUES_ABORTED;
    exports2.RPCGRPCSTATUSCODEVALUES_ALREADY_EXISTS = require_SemanticAttributes2.RPCGRPCSTATUSCODEVALUES_ALREADY_EXISTS;
    exports2.RPCGRPCSTATUSCODEVALUES_CANCELLED = require_SemanticAttributes2.RPCGRPCSTATUSCODEVALUES_CANCELLED;
    exports2.RPCGRPCSTATUSCODEVALUES_DATA_LOSS = require_SemanticAttributes2.RPCGRPCSTATUSCODEVALUES_DATA_LOSS;
    exports2.RPCGRPCSTATUSCODEVALUES_DEADLINE_EXCEEDED = require_SemanticAttributes2.RPCGRPCSTATUSCODEVALUES_DEADLINE_EXCEEDED;
    exports2.RPCGRPCSTATUSCODEVALUES_FAILED_PRECONDITION = require_SemanticAttributes2.RPCGRPCSTATUSCODEVALUES_FAILED_PRECONDITION;
    exports2.RPCGRPCSTATUSCODEVALUES_INTERNAL = require_SemanticAttributes2.RPCGRPCSTATUSCODEVALUES_INTERNAL;
    exports2.RPCGRPCSTATUSCODEVALUES_INVALID_ARGUMENT = require_SemanticAttributes2.RPCGRPCSTATUSCODEVALUES_INVALID_ARGUMENT;
    exports2.RPCGRPCSTATUSCODEVALUES_NOT_FOUND = require_SemanticAttributes2.RPCGRPCSTATUSCODEVALUES_NOT_FOUND;
    exports2.RPCGRPCSTATUSCODEVALUES_OK = require_SemanticAttributes2.RPCGRPCSTATUSCODEVALUES_OK;
    exports2.RPCGRPCSTATUSCODEVALUES_OUT_OF_RANGE = require_SemanticAttributes2.RPCGRPCSTATUSCODEVALUES_OUT_OF_RANGE;
    exports2.RPCGRPCSTATUSCODEVALUES_PERMISSION_DENIED = require_SemanticAttributes2.RPCGRPCSTATUSCODEVALUES_PERMISSION_DENIED;
    exports2.RPCGRPCSTATUSCODEVALUES_RESOURCE_EXHAUSTED = require_SemanticAttributes2.RPCGRPCSTATUSCODEVALUES_RESOURCE_EXHAUSTED;
    exports2.RPCGRPCSTATUSCODEVALUES_UNAUTHENTICATED = require_SemanticAttributes2.RPCGRPCSTATUSCODEVALUES_UNAUTHENTICATED;
    exports2.RPCGRPCSTATUSCODEVALUES_UNAVAILABLE = require_SemanticAttributes2.RPCGRPCSTATUSCODEVALUES_UNAVAILABLE;
    exports2.RPCGRPCSTATUSCODEVALUES_UNIMPLEMENTED = require_SemanticAttributes2.RPCGRPCSTATUSCODEVALUES_UNIMPLEMENTED;
    exports2.RPCGRPCSTATUSCODEVALUES_UNKNOWN = require_SemanticAttributes2.RPCGRPCSTATUSCODEVALUES_UNKNOWN;
    exports2.RpcGrpcStatusCodeValues = require_SemanticAttributes2.RpcGrpcStatusCodeValues;
    exports2.SEMATTRS_AWS_DYNAMODB_ATTRIBUTES_TO_GET = require_SemanticAttributes2.SEMATTRS_AWS_DYNAMODB_ATTRIBUTES_TO_GET;
    exports2.SEMATTRS_AWS_DYNAMODB_ATTRIBUTE_DEFINITIONS = require_SemanticAttributes2.SEMATTRS_AWS_DYNAMODB_ATTRIBUTE_DEFINITIONS;
    exports2.SEMATTRS_AWS_DYNAMODB_CONSISTENT_READ = require_SemanticAttributes2.SEMATTRS_AWS_DYNAMODB_CONSISTENT_READ;
    exports2.SEMATTRS_AWS_DYNAMODB_CONSUMED_CAPACITY = require_SemanticAttributes2.SEMATTRS_AWS_DYNAMODB_CONSUMED_CAPACITY;
    exports2.SEMATTRS_AWS_DYNAMODB_COUNT = require_SemanticAttributes2.SEMATTRS_AWS_DYNAMODB_COUNT;
    exports2.SEMATTRS_AWS_DYNAMODB_EXCLUSIVE_START_TABLE = require_SemanticAttributes2.SEMATTRS_AWS_DYNAMODB_EXCLUSIVE_START_TABLE;
    exports2.SEMATTRS_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEXES = require_SemanticAttributes2.SEMATTRS_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEXES;
    exports2.SEMATTRS_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEX_UPDATES = require_SemanticAttributes2.SEMATTRS_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEX_UPDATES;
    exports2.SEMATTRS_AWS_DYNAMODB_INDEX_NAME = require_SemanticAttributes2.SEMATTRS_AWS_DYNAMODB_INDEX_NAME;
    exports2.SEMATTRS_AWS_DYNAMODB_ITEM_COLLECTION_METRICS = require_SemanticAttributes2.SEMATTRS_AWS_DYNAMODB_ITEM_COLLECTION_METRICS;
    exports2.SEMATTRS_AWS_DYNAMODB_LIMIT = require_SemanticAttributes2.SEMATTRS_AWS_DYNAMODB_LIMIT;
    exports2.SEMATTRS_AWS_DYNAMODB_LOCAL_SECONDARY_INDEXES = require_SemanticAttributes2.SEMATTRS_AWS_DYNAMODB_LOCAL_SECONDARY_INDEXES;
    exports2.SEMATTRS_AWS_DYNAMODB_PROJECTION = require_SemanticAttributes2.SEMATTRS_AWS_DYNAMODB_PROJECTION;
    exports2.SEMATTRS_AWS_DYNAMODB_PROVISIONED_READ_CAPACITY = require_SemanticAttributes2.SEMATTRS_AWS_DYNAMODB_PROVISIONED_READ_CAPACITY;
    exports2.SEMATTRS_AWS_DYNAMODB_PROVISIONED_WRITE_CAPACITY = require_SemanticAttributes2.SEMATTRS_AWS_DYNAMODB_PROVISIONED_WRITE_CAPACITY;
    exports2.SEMATTRS_AWS_DYNAMODB_SCANNED_COUNT = require_SemanticAttributes2.SEMATTRS_AWS_DYNAMODB_SCANNED_COUNT;
    exports2.SEMATTRS_AWS_DYNAMODB_SCAN_FORWARD = require_SemanticAttributes2.SEMATTRS_AWS_DYNAMODB_SCAN_FORWARD;
    exports2.SEMATTRS_AWS_DYNAMODB_SEGMENT = require_SemanticAttributes2.SEMATTRS_AWS_DYNAMODB_SEGMENT;
    exports2.SEMATTRS_AWS_DYNAMODB_SELECT = require_SemanticAttributes2.SEMATTRS_AWS_DYNAMODB_SELECT;
    exports2.SEMATTRS_AWS_DYNAMODB_TABLE_COUNT = require_SemanticAttributes2.SEMATTRS_AWS_DYNAMODB_TABLE_COUNT;
    exports2.SEMATTRS_AWS_DYNAMODB_TABLE_NAMES = require_SemanticAttributes2.SEMATTRS_AWS_DYNAMODB_TABLE_NAMES;
    exports2.SEMATTRS_AWS_DYNAMODB_TOTAL_SEGMENTS = require_SemanticAttributes2.SEMATTRS_AWS_DYNAMODB_TOTAL_SEGMENTS;
    exports2.SEMATTRS_AWS_LAMBDA_INVOKED_ARN = require_SemanticAttributes2.SEMATTRS_AWS_LAMBDA_INVOKED_ARN;
    exports2.SEMATTRS_CODE_FILEPATH = require_SemanticAttributes2.SEMATTRS_CODE_FILEPATH;
    exports2.SEMATTRS_CODE_FUNCTION = require_SemanticAttributes2.SEMATTRS_CODE_FUNCTION;
    exports2.SEMATTRS_CODE_LINENO = require_SemanticAttributes2.SEMATTRS_CODE_LINENO;
    exports2.SEMATTRS_CODE_NAMESPACE = require_SemanticAttributes2.SEMATTRS_CODE_NAMESPACE;
    exports2.SEMATTRS_DB_CASSANDRA_CONSISTENCY_LEVEL = require_SemanticAttributes2.SEMATTRS_DB_CASSANDRA_CONSISTENCY_LEVEL;
    exports2.SEMATTRS_DB_CASSANDRA_COORDINATOR_DC = require_SemanticAttributes2.SEMATTRS_DB_CASSANDRA_COORDINATOR_DC;
    exports2.SEMATTRS_DB_CASSANDRA_COORDINATOR_ID = require_SemanticAttributes2.SEMATTRS_DB_CASSANDRA_COORDINATOR_ID;
    exports2.SEMATTRS_DB_CASSANDRA_IDEMPOTENCE = require_SemanticAttributes2.SEMATTRS_DB_CASSANDRA_IDEMPOTENCE;
    exports2.SEMATTRS_DB_CASSANDRA_KEYSPACE = require_SemanticAttributes2.SEMATTRS_DB_CASSANDRA_KEYSPACE;
    exports2.SEMATTRS_DB_CASSANDRA_PAGE_SIZE = require_SemanticAttributes2.SEMATTRS_DB_CASSANDRA_PAGE_SIZE;
    exports2.SEMATTRS_DB_CASSANDRA_SPECULATIVE_EXECUTION_COUNT = require_SemanticAttributes2.SEMATTRS_DB_CASSANDRA_SPECULATIVE_EXECUTION_COUNT;
    exports2.SEMATTRS_DB_CASSANDRA_TABLE = require_SemanticAttributes2.SEMATTRS_DB_CASSANDRA_TABLE;
    exports2.SEMATTRS_DB_CONNECTION_STRING = require_SemanticAttributes2.SEMATTRS_DB_CONNECTION_STRING;
    exports2.SEMATTRS_DB_HBASE_NAMESPACE = require_SemanticAttributes2.SEMATTRS_DB_HBASE_NAMESPACE;
    exports2.SEMATTRS_DB_JDBC_DRIVER_CLASSNAME = require_SemanticAttributes2.SEMATTRS_DB_JDBC_DRIVER_CLASSNAME;
    exports2.SEMATTRS_DB_MONGODB_COLLECTION = require_SemanticAttributes2.SEMATTRS_DB_MONGODB_COLLECTION;
    exports2.SEMATTRS_DB_MSSQL_INSTANCE_NAME = require_SemanticAttributes2.SEMATTRS_DB_MSSQL_INSTANCE_NAME;
    exports2.SEMATTRS_DB_NAME = require_SemanticAttributes2.SEMATTRS_DB_NAME;
    exports2.SEMATTRS_DB_OPERATION = require_SemanticAttributes2.SEMATTRS_DB_OPERATION;
    exports2.SEMATTRS_DB_REDIS_DATABASE_INDEX = require_SemanticAttributes2.SEMATTRS_DB_REDIS_DATABASE_INDEX;
    exports2.SEMATTRS_DB_SQL_TABLE = require_SemanticAttributes2.SEMATTRS_DB_SQL_TABLE;
    exports2.SEMATTRS_DB_STATEMENT = require_SemanticAttributes2.SEMATTRS_DB_STATEMENT;
    exports2.SEMATTRS_DB_SYSTEM = require_SemanticAttributes2.SEMATTRS_DB_SYSTEM;
    exports2.SEMATTRS_DB_USER = require_SemanticAttributes2.SEMATTRS_DB_USER;
    exports2.SEMATTRS_ENDUSER_ID = require_SemanticAttributes2.SEMATTRS_ENDUSER_ID;
    exports2.SEMATTRS_ENDUSER_ROLE = require_SemanticAttributes2.SEMATTRS_ENDUSER_ROLE;
    exports2.SEMATTRS_ENDUSER_SCOPE = require_SemanticAttributes2.SEMATTRS_ENDUSER_SCOPE;
    exports2.SEMATTRS_EXCEPTION_ESCAPED = require_SemanticAttributes2.SEMATTRS_EXCEPTION_ESCAPED;
    exports2.SEMATTRS_EXCEPTION_MESSAGE = require_SemanticAttributes2.SEMATTRS_EXCEPTION_MESSAGE;
    exports2.SEMATTRS_EXCEPTION_STACKTRACE = require_SemanticAttributes2.SEMATTRS_EXCEPTION_STACKTRACE;
    exports2.SEMATTRS_EXCEPTION_TYPE = require_SemanticAttributes2.SEMATTRS_EXCEPTION_TYPE;
    exports2.SEMATTRS_FAAS_COLDSTART = require_SemanticAttributes2.SEMATTRS_FAAS_COLDSTART;
    exports2.SEMATTRS_FAAS_CRON = require_SemanticAttributes2.SEMATTRS_FAAS_CRON;
    exports2.SEMATTRS_FAAS_DOCUMENT_COLLECTION = require_SemanticAttributes2.SEMATTRS_FAAS_DOCUMENT_COLLECTION;
    exports2.SEMATTRS_FAAS_DOCUMENT_NAME = require_SemanticAttributes2.SEMATTRS_FAAS_DOCUMENT_NAME;
    exports2.SEMATTRS_FAAS_DOCUMENT_OPERATION = require_SemanticAttributes2.SEMATTRS_FAAS_DOCUMENT_OPERATION;
    exports2.SEMATTRS_FAAS_DOCUMENT_TIME = require_SemanticAttributes2.SEMATTRS_FAAS_DOCUMENT_TIME;
    exports2.SEMATTRS_FAAS_EXECUTION = require_SemanticAttributes2.SEMATTRS_FAAS_EXECUTION;
    exports2.SEMATTRS_FAAS_INVOKED_NAME = require_SemanticAttributes2.SEMATTRS_FAAS_INVOKED_NAME;
    exports2.SEMATTRS_FAAS_INVOKED_PROVIDER = require_SemanticAttributes2.SEMATTRS_FAAS_INVOKED_PROVIDER;
    exports2.SEMATTRS_FAAS_INVOKED_REGION = require_SemanticAttributes2.SEMATTRS_FAAS_INVOKED_REGION;
    exports2.SEMATTRS_FAAS_TIME = require_SemanticAttributes2.SEMATTRS_FAAS_TIME;
    exports2.SEMATTRS_FAAS_TRIGGER = require_SemanticAttributes2.SEMATTRS_FAAS_TRIGGER;
    exports2.SEMATTRS_HTTP_CLIENT_IP = require_SemanticAttributes2.SEMATTRS_HTTP_CLIENT_IP;
    exports2.SEMATTRS_HTTP_FLAVOR = require_SemanticAttributes2.SEMATTRS_HTTP_FLAVOR;
    exports2.SEMATTRS_HTTP_HOST = require_SemanticAttributes2.SEMATTRS_HTTP_HOST;
    exports2.SEMATTRS_HTTP_METHOD = require_SemanticAttributes2.SEMATTRS_HTTP_METHOD;
    exports2.SEMATTRS_HTTP_REQUEST_CONTENT_LENGTH = require_SemanticAttributes2.SEMATTRS_HTTP_REQUEST_CONTENT_LENGTH;
    exports2.SEMATTRS_HTTP_REQUEST_CONTENT_LENGTH_UNCOMPRESSED = require_SemanticAttributes2.SEMATTRS_HTTP_REQUEST_CONTENT_LENGTH_UNCOMPRESSED;
    exports2.SEMATTRS_HTTP_RESPONSE_CONTENT_LENGTH = require_SemanticAttributes2.SEMATTRS_HTTP_RESPONSE_CONTENT_LENGTH;
    exports2.SEMATTRS_HTTP_RESPONSE_CONTENT_LENGTH_UNCOMPRESSED = require_SemanticAttributes2.SEMATTRS_HTTP_RESPONSE_CONTENT_LENGTH_UNCOMPRESSED;
    exports2.SEMATTRS_HTTP_ROUTE = require_SemanticAttributes2.SEMATTRS_HTTP_ROUTE;
    exports2.SEMATTRS_HTTP_SCHEME = require_SemanticAttributes2.SEMATTRS_HTTP_SCHEME;
    exports2.SEMATTRS_HTTP_SERVER_NAME = require_SemanticAttributes2.SEMATTRS_HTTP_SERVER_NAME;
    exports2.SEMATTRS_HTTP_STATUS_CODE = require_SemanticAttributes2.SEMATTRS_HTTP_STATUS_CODE;
    exports2.SEMATTRS_HTTP_TARGET = require_SemanticAttributes2.SEMATTRS_HTTP_TARGET;
    exports2.SEMATTRS_HTTP_URL = require_SemanticAttributes2.SEMATTRS_HTTP_URL;
    exports2.SEMATTRS_HTTP_USER_AGENT = require_SemanticAttributes2.SEMATTRS_HTTP_USER_AGENT;
    exports2.SEMATTRS_MESSAGE_COMPRESSED_SIZE = require_SemanticAttributes2.SEMATTRS_MESSAGE_COMPRESSED_SIZE;
    exports2.SEMATTRS_MESSAGE_ID = require_SemanticAttributes2.SEMATTRS_MESSAGE_ID;
    exports2.SEMATTRS_MESSAGE_TYPE = require_SemanticAttributes2.SEMATTRS_MESSAGE_TYPE;
    exports2.SEMATTRS_MESSAGE_UNCOMPRESSED_SIZE = require_SemanticAttributes2.SEMATTRS_MESSAGE_UNCOMPRESSED_SIZE;
    exports2.SEMATTRS_MESSAGING_CONSUMER_ID = require_SemanticAttributes2.SEMATTRS_MESSAGING_CONSUMER_ID;
    exports2.SEMATTRS_MESSAGING_CONVERSATION_ID = require_SemanticAttributes2.SEMATTRS_MESSAGING_CONVERSATION_ID;
    exports2.SEMATTRS_MESSAGING_DESTINATION = require_SemanticAttributes2.SEMATTRS_MESSAGING_DESTINATION;
    exports2.SEMATTRS_MESSAGING_DESTINATION_KIND = require_SemanticAttributes2.SEMATTRS_MESSAGING_DESTINATION_KIND;
    exports2.SEMATTRS_MESSAGING_KAFKA_CLIENT_ID = require_SemanticAttributes2.SEMATTRS_MESSAGING_KAFKA_CLIENT_ID;
    exports2.SEMATTRS_MESSAGING_KAFKA_CONSUMER_GROUP = require_SemanticAttributes2.SEMATTRS_MESSAGING_KAFKA_CONSUMER_GROUP;
    exports2.SEMATTRS_MESSAGING_KAFKA_MESSAGE_KEY = require_SemanticAttributes2.SEMATTRS_MESSAGING_KAFKA_MESSAGE_KEY;
    exports2.SEMATTRS_MESSAGING_KAFKA_PARTITION = require_SemanticAttributes2.SEMATTRS_MESSAGING_KAFKA_PARTITION;
    exports2.SEMATTRS_MESSAGING_KAFKA_TOMBSTONE = require_SemanticAttributes2.SEMATTRS_MESSAGING_KAFKA_TOMBSTONE;
    exports2.SEMATTRS_MESSAGING_MESSAGE_ID = require_SemanticAttributes2.SEMATTRS_MESSAGING_MESSAGE_ID;
    exports2.SEMATTRS_MESSAGING_MESSAGE_PAYLOAD_COMPRESSED_SIZE_BYTES = require_SemanticAttributes2.SEMATTRS_MESSAGING_MESSAGE_PAYLOAD_COMPRESSED_SIZE_BYTES;
    exports2.SEMATTRS_MESSAGING_MESSAGE_PAYLOAD_SIZE_BYTES = require_SemanticAttributes2.SEMATTRS_MESSAGING_MESSAGE_PAYLOAD_SIZE_BYTES;
    exports2.SEMATTRS_MESSAGING_OPERATION = require_SemanticAttributes2.SEMATTRS_MESSAGING_OPERATION;
    exports2.SEMATTRS_MESSAGING_PROTOCOL = require_SemanticAttributes2.SEMATTRS_MESSAGING_PROTOCOL;
    exports2.SEMATTRS_MESSAGING_PROTOCOL_VERSION = require_SemanticAttributes2.SEMATTRS_MESSAGING_PROTOCOL_VERSION;
    exports2.SEMATTRS_MESSAGING_RABBITMQ_ROUTING_KEY = require_SemanticAttributes2.SEMATTRS_MESSAGING_RABBITMQ_ROUTING_KEY;
    exports2.SEMATTRS_MESSAGING_SYSTEM = require_SemanticAttributes2.SEMATTRS_MESSAGING_SYSTEM;
    exports2.SEMATTRS_MESSAGING_TEMP_DESTINATION = require_SemanticAttributes2.SEMATTRS_MESSAGING_TEMP_DESTINATION;
    exports2.SEMATTRS_MESSAGING_URL = require_SemanticAttributes2.SEMATTRS_MESSAGING_URL;
    exports2.SEMATTRS_NET_HOST_CARRIER_ICC = require_SemanticAttributes2.SEMATTRS_NET_HOST_CARRIER_ICC;
    exports2.SEMATTRS_NET_HOST_CARRIER_MCC = require_SemanticAttributes2.SEMATTRS_NET_HOST_CARRIER_MCC;
    exports2.SEMATTRS_NET_HOST_CARRIER_MNC = require_SemanticAttributes2.SEMATTRS_NET_HOST_CARRIER_MNC;
    exports2.SEMATTRS_NET_HOST_CARRIER_NAME = require_SemanticAttributes2.SEMATTRS_NET_HOST_CARRIER_NAME;
    exports2.SEMATTRS_NET_HOST_CONNECTION_SUBTYPE = require_SemanticAttributes2.SEMATTRS_NET_HOST_CONNECTION_SUBTYPE;
    exports2.SEMATTRS_NET_HOST_CONNECTION_TYPE = require_SemanticAttributes2.SEMATTRS_NET_HOST_CONNECTION_TYPE;
    exports2.SEMATTRS_NET_HOST_IP = require_SemanticAttributes2.SEMATTRS_NET_HOST_IP;
    exports2.SEMATTRS_NET_HOST_NAME = require_SemanticAttributes2.SEMATTRS_NET_HOST_NAME;
    exports2.SEMATTRS_NET_HOST_PORT = require_SemanticAttributes2.SEMATTRS_NET_HOST_PORT;
    exports2.SEMATTRS_NET_PEER_IP = require_SemanticAttributes2.SEMATTRS_NET_PEER_IP;
    exports2.SEMATTRS_NET_PEER_NAME = require_SemanticAttributes2.SEMATTRS_NET_PEER_NAME;
    exports2.SEMATTRS_NET_PEER_PORT = require_SemanticAttributes2.SEMATTRS_NET_PEER_PORT;
    exports2.SEMATTRS_NET_TRANSPORT = require_SemanticAttributes2.SEMATTRS_NET_TRANSPORT;
    exports2.SEMATTRS_PEER_SERVICE = require_SemanticAttributes2.SEMATTRS_PEER_SERVICE;
    exports2.SEMATTRS_RPC_GRPC_STATUS_CODE = require_SemanticAttributes2.SEMATTRS_RPC_GRPC_STATUS_CODE;
    exports2.SEMATTRS_RPC_JSONRPC_ERROR_CODE = require_SemanticAttributes2.SEMATTRS_RPC_JSONRPC_ERROR_CODE;
    exports2.SEMATTRS_RPC_JSONRPC_ERROR_MESSAGE = require_SemanticAttributes2.SEMATTRS_RPC_JSONRPC_ERROR_MESSAGE;
    exports2.SEMATTRS_RPC_JSONRPC_REQUEST_ID = require_SemanticAttributes2.SEMATTRS_RPC_JSONRPC_REQUEST_ID;
    exports2.SEMATTRS_RPC_JSONRPC_VERSION = require_SemanticAttributes2.SEMATTRS_RPC_JSONRPC_VERSION;
    exports2.SEMATTRS_RPC_METHOD = require_SemanticAttributes2.SEMATTRS_RPC_METHOD;
    exports2.SEMATTRS_RPC_SERVICE = require_SemanticAttributes2.SEMATTRS_RPC_SERVICE;
    exports2.SEMATTRS_RPC_SYSTEM = require_SemanticAttributes2.SEMATTRS_RPC_SYSTEM;
    exports2.SEMATTRS_THREAD_ID = require_SemanticAttributes2.SEMATTRS_THREAD_ID;
    exports2.SEMATTRS_THREAD_NAME = require_SemanticAttributes2.SEMATTRS_THREAD_NAME;
    exports2.SEMRESATTRS_AWS_ECS_CLUSTER_ARN = require_SemanticResourceAttributes2.SEMRESATTRS_AWS_ECS_CLUSTER_ARN;
    exports2.SEMRESATTRS_AWS_ECS_CONTAINER_ARN = require_SemanticResourceAttributes2.SEMRESATTRS_AWS_ECS_CONTAINER_ARN;
    exports2.SEMRESATTRS_AWS_ECS_LAUNCHTYPE = require_SemanticResourceAttributes2.SEMRESATTRS_AWS_ECS_LAUNCHTYPE;
    exports2.SEMRESATTRS_AWS_ECS_TASK_ARN = require_SemanticResourceAttributes2.SEMRESATTRS_AWS_ECS_TASK_ARN;
    exports2.SEMRESATTRS_AWS_ECS_TASK_FAMILY = require_SemanticResourceAttributes2.SEMRESATTRS_AWS_ECS_TASK_FAMILY;
    exports2.SEMRESATTRS_AWS_ECS_TASK_REVISION = require_SemanticResourceAttributes2.SEMRESATTRS_AWS_ECS_TASK_REVISION;
    exports2.SEMRESATTRS_AWS_EKS_CLUSTER_ARN = require_SemanticResourceAttributes2.SEMRESATTRS_AWS_EKS_CLUSTER_ARN;
    exports2.SEMRESATTRS_AWS_LOG_GROUP_ARNS = require_SemanticResourceAttributes2.SEMRESATTRS_AWS_LOG_GROUP_ARNS;
    exports2.SEMRESATTRS_AWS_LOG_GROUP_NAMES = require_SemanticResourceAttributes2.SEMRESATTRS_AWS_LOG_GROUP_NAMES;
    exports2.SEMRESATTRS_AWS_LOG_STREAM_ARNS = require_SemanticResourceAttributes2.SEMRESATTRS_AWS_LOG_STREAM_ARNS;
    exports2.SEMRESATTRS_AWS_LOG_STREAM_NAMES = require_SemanticResourceAttributes2.SEMRESATTRS_AWS_LOG_STREAM_NAMES;
    exports2.SEMRESATTRS_CLOUD_ACCOUNT_ID = require_SemanticResourceAttributes2.SEMRESATTRS_CLOUD_ACCOUNT_ID;
    exports2.SEMRESATTRS_CLOUD_AVAILABILITY_ZONE = require_SemanticResourceAttributes2.SEMRESATTRS_CLOUD_AVAILABILITY_ZONE;
    exports2.SEMRESATTRS_CLOUD_PLATFORM = require_SemanticResourceAttributes2.SEMRESATTRS_CLOUD_PLATFORM;
    exports2.SEMRESATTRS_CLOUD_PROVIDER = require_SemanticResourceAttributes2.SEMRESATTRS_CLOUD_PROVIDER;
    exports2.SEMRESATTRS_CLOUD_REGION = require_SemanticResourceAttributes2.SEMRESATTRS_CLOUD_REGION;
    exports2.SEMRESATTRS_CONTAINER_ID = require_SemanticResourceAttributes2.SEMRESATTRS_CONTAINER_ID;
    exports2.SEMRESATTRS_CONTAINER_IMAGE_NAME = require_SemanticResourceAttributes2.SEMRESATTRS_CONTAINER_IMAGE_NAME;
    exports2.SEMRESATTRS_CONTAINER_IMAGE_TAG = require_SemanticResourceAttributes2.SEMRESATTRS_CONTAINER_IMAGE_TAG;
    exports2.SEMRESATTRS_CONTAINER_NAME = require_SemanticResourceAttributes2.SEMRESATTRS_CONTAINER_NAME;
    exports2.SEMRESATTRS_CONTAINER_RUNTIME = require_SemanticResourceAttributes2.SEMRESATTRS_CONTAINER_RUNTIME;
    exports2.SEMRESATTRS_DEPLOYMENT_ENVIRONMENT = require_SemanticResourceAttributes2.SEMRESATTRS_DEPLOYMENT_ENVIRONMENT;
    exports2.SEMRESATTRS_DEVICE_ID = require_SemanticResourceAttributes2.SEMRESATTRS_DEVICE_ID;
    exports2.SEMRESATTRS_DEVICE_MODEL_IDENTIFIER = require_SemanticResourceAttributes2.SEMRESATTRS_DEVICE_MODEL_IDENTIFIER;
    exports2.SEMRESATTRS_DEVICE_MODEL_NAME = require_SemanticResourceAttributes2.SEMRESATTRS_DEVICE_MODEL_NAME;
    exports2.SEMRESATTRS_FAAS_ID = require_SemanticResourceAttributes2.SEMRESATTRS_FAAS_ID;
    exports2.SEMRESATTRS_FAAS_INSTANCE = require_SemanticResourceAttributes2.SEMRESATTRS_FAAS_INSTANCE;
    exports2.SEMRESATTRS_FAAS_MAX_MEMORY = require_SemanticResourceAttributes2.SEMRESATTRS_FAAS_MAX_MEMORY;
    exports2.SEMRESATTRS_FAAS_NAME = require_SemanticResourceAttributes2.SEMRESATTRS_FAAS_NAME;
    exports2.SEMRESATTRS_FAAS_VERSION = require_SemanticResourceAttributes2.SEMRESATTRS_FAAS_VERSION;
    exports2.SEMRESATTRS_HOST_ARCH = require_SemanticResourceAttributes2.SEMRESATTRS_HOST_ARCH;
    exports2.SEMRESATTRS_HOST_ID = require_SemanticResourceAttributes2.SEMRESATTRS_HOST_ID;
    exports2.SEMRESATTRS_HOST_IMAGE_ID = require_SemanticResourceAttributes2.SEMRESATTRS_HOST_IMAGE_ID;
    exports2.SEMRESATTRS_HOST_IMAGE_NAME = require_SemanticResourceAttributes2.SEMRESATTRS_HOST_IMAGE_NAME;
    exports2.SEMRESATTRS_HOST_IMAGE_VERSION = require_SemanticResourceAttributes2.SEMRESATTRS_HOST_IMAGE_VERSION;
    exports2.SEMRESATTRS_HOST_NAME = require_SemanticResourceAttributes2.SEMRESATTRS_HOST_NAME;
    exports2.SEMRESATTRS_HOST_TYPE = require_SemanticResourceAttributes2.SEMRESATTRS_HOST_TYPE;
    exports2.SEMRESATTRS_K8S_CLUSTER_NAME = require_SemanticResourceAttributes2.SEMRESATTRS_K8S_CLUSTER_NAME;
    exports2.SEMRESATTRS_K8S_CONTAINER_NAME = require_SemanticResourceAttributes2.SEMRESATTRS_K8S_CONTAINER_NAME;
    exports2.SEMRESATTRS_K8S_CRONJOB_NAME = require_SemanticResourceAttributes2.SEMRESATTRS_K8S_CRONJOB_NAME;
    exports2.SEMRESATTRS_K8S_CRONJOB_UID = require_SemanticResourceAttributes2.SEMRESATTRS_K8S_CRONJOB_UID;
    exports2.SEMRESATTRS_K8S_DAEMONSET_NAME = require_SemanticResourceAttributes2.SEMRESATTRS_K8S_DAEMONSET_NAME;
    exports2.SEMRESATTRS_K8S_DAEMONSET_UID = require_SemanticResourceAttributes2.SEMRESATTRS_K8S_DAEMONSET_UID;
    exports2.SEMRESATTRS_K8S_DEPLOYMENT_NAME = require_SemanticResourceAttributes2.SEMRESATTRS_K8S_DEPLOYMENT_NAME;
    exports2.SEMRESATTRS_K8S_DEPLOYMENT_UID = require_SemanticResourceAttributes2.SEMRESATTRS_K8S_DEPLOYMENT_UID;
    exports2.SEMRESATTRS_K8S_JOB_NAME = require_SemanticResourceAttributes2.SEMRESATTRS_K8S_JOB_NAME;
    exports2.SEMRESATTRS_K8S_JOB_UID = require_SemanticResourceAttributes2.SEMRESATTRS_K8S_JOB_UID;
    exports2.SEMRESATTRS_K8S_NAMESPACE_NAME = require_SemanticResourceAttributes2.SEMRESATTRS_K8S_NAMESPACE_NAME;
    exports2.SEMRESATTRS_K8S_NODE_NAME = require_SemanticResourceAttributes2.SEMRESATTRS_K8S_NODE_NAME;
    exports2.SEMRESATTRS_K8S_NODE_UID = require_SemanticResourceAttributes2.SEMRESATTRS_K8S_NODE_UID;
    exports2.SEMRESATTRS_K8S_POD_NAME = require_SemanticResourceAttributes2.SEMRESATTRS_K8S_POD_NAME;
    exports2.SEMRESATTRS_K8S_POD_UID = require_SemanticResourceAttributes2.SEMRESATTRS_K8S_POD_UID;
    exports2.SEMRESATTRS_K8S_REPLICASET_NAME = require_SemanticResourceAttributes2.SEMRESATTRS_K8S_REPLICASET_NAME;
    exports2.SEMRESATTRS_K8S_REPLICASET_UID = require_SemanticResourceAttributes2.SEMRESATTRS_K8S_REPLICASET_UID;
    exports2.SEMRESATTRS_K8S_STATEFULSET_NAME = require_SemanticResourceAttributes2.SEMRESATTRS_K8S_STATEFULSET_NAME;
    exports2.SEMRESATTRS_K8S_STATEFULSET_UID = require_SemanticResourceAttributes2.SEMRESATTRS_K8S_STATEFULSET_UID;
    exports2.SEMRESATTRS_OS_DESCRIPTION = require_SemanticResourceAttributes2.SEMRESATTRS_OS_DESCRIPTION;
    exports2.SEMRESATTRS_OS_NAME = require_SemanticResourceAttributes2.SEMRESATTRS_OS_NAME;
    exports2.SEMRESATTRS_OS_TYPE = require_SemanticResourceAttributes2.SEMRESATTRS_OS_TYPE;
    exports2.SEMRESATTRS_OS_VERSION = require_SemanticResourceAttributes2.SEMRESATTRS_OS_VERSION;
    exports2.SEMRESATTRS_PROCESS_COMMAND = require_SemanticResourceAttributes2.SEMRESATTRS_PROCESS_COMMAND;
    exports2.SEMRESATTRS_PROCESS_COMMAND_ARGS = require_SemanticResourceAttributes2.SEMRESATTRS_PROCESS_COMMAND_ARGS;
    exports2.SEMRESATTRS_PROCESS_COMMAND_LINE = require_SemanticResourceAttributes2.SEMRESATTRS_PROCESS_COMMAND_LINE;
    exports2.SEMRESATTRS_PROCESS_EXECUTABLE_NAME = require_SemanticResourceAttributes2.SEMRESATTRS_PROCESS_EXECUTABLE_NAME;
    exports2.SEMRESATTRS_PROCESS_EXECUTABLE_PATH = require_SemanticResourceAttributes2.SEMRESATTRS_PROCESS_EXECUTABLE_PATH;
    exports2.SEMRESATTRS_PROCESS_OWNER = require_SemanticResourceAttributes2.SEMRESATTRS_PROCESS_OWNER;
    exports2.SEMRESATTRS_PROCESS_PID = require_SemanticResourceAttributes2.SEMRESATTRS_PROCESS_PID;
    exports2.SEMRESATTRS_PROCESS_RUNTIME_DESCRIPTION = require_SemanticResourceAttributes2.SEMRESATTRS_PROCESS_RUNTIME_DESCRIPTION;
    exports2.SEMRESATTRS_PROCESS_RUNTIME_NAME = require_SemanticResourceAttributes2.SEMRESATTRS_PROCESS_RUNTIME_NAME;
    exports2.SEMRESATTRS_PROCESS_RUNTIME_VERSION = require_SemanticResourceAttributes2.SEMRESATTRS_PROCESS_RUNTIME_VERSION;
    exports2.SEMRESATTRS_SERVICE_INSTANCE_ID = require_SemanticResourceAttributes2.SEMRESATTRS_SERVICE_INSTANCE_ID;
    exports2.SEMRESATTRS_SERVICE_NAME = require_SemanticResourceAttributes2.SEMRESATTRS_SERVICE_NAME;
    exports2.SEMRESATTRS_SERVICE_NAMESPACE = require_SemanticResourceAttributes2.SEMRESATTRS_SERVICE_NAMESPACE;
    exports2.SEMRESATTRS_SERVICE_VERSION = require_SemanticResourceAttributes2.SEMRESATTRS_SERVICE_VERSION;
    exports2.SEMRESATTRS_TELEMETRY_AUTO_VERSION = require_SemanticResourceAttributes2.SEMRESATTRS_TELEMETRY_AUTO_VERSION;
    exports2.SEMRESATTRS_TELEMETRY_SDK_LANGUAGE = require_SemanticResourceAttributes2.SEMRESATTRS_TELEMETRY_SDK_LANGUAGE;
    exports2.SEMRESATTRS_TELEMETRY_SDK_NAME = require_SemanticResourceAttributes2.SEMRESATTRS_TELEMETRY_SDK_NAME;
    exports2.SEMRESATTRS_TELEMETRY_SDK_VERSION = require_SemanticResourceAttributes2.SEMRESATTRS_TELEMETRY_SDK_VERSION;
    exports2.SEMRESATTRS_WEBENGINE_DESCRIPTION = require_SemanticResourceAttributes2.SEMRESATTRS_WEBENGINE_DESCRIPTION;
    exports2.SEMRESATTRS_WEBENGINE_NAME = require_SemanticResourceAttributes2.SEMRESATTRS_WEBENGINE_NAME;
    exports2.SEMRESATTRS_WEBENGINE_VERSION = require_SemanticResourceAttributes2.SEMRESATTRS_WEBENGINE_VERSION;
    exports2.SIGNALR_CONNECTION_STATUS_VALUE_APP_SHUTDOWN = require_stable_attributes2.SIGNALR_CONNECTION_STATUS_VALUE_APP_SHUTDOWN;
    exports2.SIGNALR_CONNECTION_STATUS_VALUE_NORMAL_CLOSURE = require_stable_attributes2.SIGNALR_CONNECTION_STATUS_VALUE_NORMAL_CLOSURE;
    exports2.SIGNALR_CONNECTION_STATUS_VALUE_TIMEOUT = require_stable_attributes2.SIGNALR_CONNECTION_STATUS_VALUE_TIMEOUT;
    exports2.SIGNALR_TRANSPORT_VALUE_LONG_POLLING = require_stable_attributes2.SIGNALR_TRANSPORT_VALUE_LONG_POLLING;
    exports2.SIGNALR_TRANSPORT_VALUE_SERVER_SENT_EVENTS = require_stable_attributes2.SIGNALR_TRANSPORT_VALUE_SERVER_SENT_EVENTS;
    exports2.SIGNALR_TRANSPORT_VALUE_WEB_SOCKETS = require_stable_attributes2.SIGNALR_TRANSPORT_VALUE_WEB_SOCKETS;
    exports2.SemanticAttributes = require_SemanticAttributes2.SemanticAttributes;
    exports2.SemanticResourceAttributes = require_SemanticResourceAttributes2.SemanticResourceAttributes;
    exports2.TELEMETRYSDKLANGUAGEVALUES_CPP = require_SemanticResourceAttributes2.TELEMETRYSDKLANGUAGEVALUES_CPP;
    exports2.TELEMETRYSDKLANGUAGEVALUES_DOTNET = require_SemanticResourceAttributes2.TELEMETRYSDKLANGUAGEVALUES_DOTNET;
    exports2.TELEMETRYSDKLANGUAGEVALUES_ERLANG = require_SemanticResourceAttributes2.TELEMETRYSDKLANGUAGEVALUES_ERLANG;
    exports2.TELEMETRYSDKLANGUAGEVALUES_GO = require_SemanticResourceAttributes2.TELEMETRYSDKLANGUAGEVALUES_GO;
    exports2.TELEMETRYSDKLANGUAGEVALUES_JAVA = require_SemanticResourceAttributes2.TELEMETRYSDKLANGUAGEVALUES_JAVA;
    exports2.TELEMETRYSDKLANGUAGEVALUES_NODEJS = require_SemanticResourceAttributes2.TELEMETRYSDKLANGUAGEVALUES_NODEJS;
    exports2.TELEMETRYSDKLANGUAGEVALUES_PHP = require_SemanticResourceAttributes2.TELEMETRYSDKLANGUAGEVALUES_PHP;
    exports2.TELEMETRYSDKLANGUAGEVALUES_PYTHON = require_SemanticResourceAttributes2.TELEMETRYSDKLANGUAGEVALUES_PYTHON;
    exports2.TELEMETRYSDKLANGUAGEVALUES_RUBY = require_SemanticResourceAttributes2.TELEMETRYSDKLANGUAGEVALUES_RUBY;
    exports2.TELEMETRYSDKLANGUAGEVALUES_WEBJS = require_SemanticResourceAttributes2.TELEMETRYSDKLANGUAGEVALUES_WEBJS;
    exports2.TELEMETRY_SDK_LANGUAGE_VALUE_CPP = require_stable_attributes2.TELEMETRY_SDK_LANGUAGE_VALUE_CPP;
    exports2.TELEMETRY_SDK_LANGUAGE_VALUE_DOTNET = require_stable_attributes2.TELEMETRY_SDK_LANGUAGE_VALUE_DOTNET;
    exports2.TELEMETRY_SDK_LANGUAGE_VALUE_ERLANG = require_stable_attributes2.TELEMETRY_SDK_LANGUAGE_VALUE_ERLANG;
    exports2.TELEMETRY_SDK_LANGUAGE_VALUE_GO = require_stable_attributes2.TELEMETRY_SDK_LANGUAGE_VALUE_GO;
    exports2.TELEMETRY_SDK_LANGUAGE_VALUE_JAVA = require_stable_attributes2.TELEMETRY_SDK_LANGUAGE_VALUE_JAVA;
    exports2.TELEMETRY_SDK_LANGUAGE_VALUE_KOTLIN = require_stable_attributes2.TELEMETRY_SDK_LANGUAGE_VALUE_KOTLIN;
    exports2.TELEMETRY_SDK_LANGUAGE_VALUE_NODEJS = require_stable_attributes2.TELEMETRY_SDK_LANGUAGE_VALUE_NODEJS;
    exports2.TELEMETRY_SDK_LANGUAGE_VALUE_PHP = require_stable_attributes2.TELEMETRY_SDK_LANGUAGE_VALUE_PHP;
    exports2.TELEMETRY_SDK_LANGUAGE_VALUE_PYTHON = require_stable_attributes2.TELEMETRY_SDK_LANGUAGE_VALUE_PYTHON;
    exports2.TELEMETRY_SDK_LANGUAGE_VALUE_RUBY = require_stable_attributes2.TELEMETRY_SDK_LANGUAGE_VALUE_RUBY;
    exports2.TELEMETRY_SDK_LANGUAGE_VALUE_RUST = require_stable_attributes2.TELEMETRY_SDK_LANGUAGE_VALUE_RUST;
    exports2.TELEMETRY_SDK_LANGUAGE_VALUE_SWIFT = require_stable_attributes2.TELEMETRY_SDK_LANGUAGE_VALUE_SWIFT;
    exports2.TELEMETRY_SDK_LANGUAGE_VALUE_WEBJS = require_stable_attributes2.TELEMETRY_SDK_LANGUAGE_VALUE_WEBJS;
    exports2.TelemetrySdkLanguageValues = require_SemanticResourceAttributes2.TelemetrySdkLanguageValues;
  }
});

// node_modules/@opentelemetry/core/build/src/semconv.js
var require_semconv = __commonJS({
  "node_modules/@opentelemetry/core/build/src/semconv.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ATTR_PROCESS_RUNTIME_NAME = void 0;
    exports2.ATTR_PROCESS_RUNTIME_NAME = "process.runtime.name";
  }
});

// node_modules/@opentelemetry/core/build/src/platform/node/sdk-info.js
var require_sdk_info = __commonJS({
  "node_modules/@opentelemetry/core/build/src/platform/node/sdk-info.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SDK_INFO = void 0;
    var version_1 = require_version();
    var semantic_conventions_1 = require_dist();
    var semconv_1 = require_semconv();
    exports2.SDK_INFO = {
      [semantic_conventions_1.ATTR_TELEMETRY_SDK_NAME]: "opentelemetry",
      [semconv_1.ATTR_PROCESS_RUNTIME_NAME]: "node",
      [semantic_conventions_1.ATTR_TELEMETRY_SDK_LANGUAGE]: semantic_conventions_1.TELEMETRY_SDK_LANGUAGE_VALUE_NODEJS,
      [semantic_conventions_1.ATTR_TELEMETRY_SDK_VERSION]: version_1.VERSION
    };
  }
});

// node_modules/@opentelemetry/core/build/src/platform/node/index.js
var require_node = __commonJS({
  "node_modules/@opentelemetry/core/build/src/platform/node/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.otperformance = exports2.SDK_INFO = exports2._globalThis = exports2.getStringListFromEnv = exports2.getNumberFromEnv = exports2.getBooleanFromEnv = exports2.getStringFromEnv = void 0;
    var environment_1 = require_environment();
    Object.defineProperty(exports2, "getStringFromEnv", { enumerable: true, get: function() {
      return environment_1.getStringFromEnv;
    } });
    Object.defineProperty(exports2, "getBooleanFromEnv", { enumerable: true, get: function() {
      return environment_1.getBooleanFromEnv;
    } });
    Object.defineProperty(exports2, "getNumberFromEnv", { enumerable: true, get: function() {
      return environment_1.getNumberFromEnv;
    } });
    Object.defineProperty(exports2, "getStringListFromEnv", { enumerable: true, get: function() {
      return environment_1.getStringListFromEnv;
    } });
    var globalThis_1 = require_globalThis();
    Object.defineProperty(exports2, "_globalThis", { enumerable: true, get: function() {
      return globalThis_1._globalThis;
    } });
    var sdk_info_1 = require_sdk_info();
    Object.defineProperty(exports2, "SDK_INFO", { enumerable: true, get: function() {
      return sdk_info_1.SDK_INFO;
    } });
    exports2.otperformance = performance;
  }
});

// node_modules/@opentelemetry/core/build/src/platform/index.js
var require_platform = __commonJS({
  "node_modules/@opentelemetry/core/build/src/platform/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getStringListFromEnv = exports2.getNumberFromEnv = exports2.getStringFromEnv = exports2.getBooleanFromEnv = exports2.otperformance = exports2._globalThis = exports2.SDK_INFO = void 0;
    var node_1 = require_node();
    Object.defineProperty(exports2, "SDK_INFO", { enumerable: true, get: function() {
      return node_1.SDK_INFO;
    } });
    Object.defineProperty(exports2, "_globalThis", { enumerable: true, get: function() {
      return node_1._globalThis;
    } });
    Object.defineProperty(exports2, "otperformance", { enumerable: true, get: function() {
      return node_1.otperformance;
    } });
    Object.defineProperty(exports2, "getBooleanFromEnv", { enumerable: true, get: function() {
      return node_1.getBooleanFromEnv;
    } });
    Object.defineProperty(exports2, "getStringFromEnv", { enumerable: true, get: function() {
      return node_1.getStringFromEnv;
    } });
    Object.defineProperty(exports2, "getNumberFromEnv", { enumerable: true, get: function() {
      return node_1.getNumberFromEnv;
    } });
    Object.defineProperty(exports2, "getStringListFromEnv", { enumerable: true, get: function() {
      return node_1.getStringListFromEnv;
    } });
  }
});

// node_modules/@opentelemetry/core/build/src/common/time.js
var require_time = __commonJS({
  "node_modules/@opentelemetry/core/build/src/common/time.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.addHrTimes = exports2.isTimeInput = exports2.isTimeInputHrTime = exports2.hrTimeToSeconds = exports2.hrTimeToMilliseconds = exports2.hrTimeToMicroseconds = exports2.hrTimeToNanoseconds = exports2.hrTimeToTimeStamp = exports2.hrTimeDuration = exports2.timeInputToHrTime = exports2.hrTime = exports2.getTimeOrigin = exports2.millisToHrTime = void 0;
    var platform_1 = require_platform();
    var NANOSECOND_DIGITS = 9;
    var NANOSECOND_DIGITS_IN_MILLIS = 6;
    var MILLISECONDS_TO_NANOSECONDS = Math.pow(10, NANOSECOND_DIGITS_IN_MILLIS);
    var SECOND_TO_NANOSECONDS = Math.pow(10, NANOSECOND_DIGITS);
    function millisToHrTime(epochMillis) {
      const epochSeconds = epochMillis / 1e3;
      const seconds = Math.trunc(epochSeconds);
      const nanos = Math.round(epochMillis % 1e3 * MILLISECONDS_TO_NANOSECONDS);
      return [seconds, nanos];
    }
    exports2.millisToHrTime = millisToHrTime;
    function getTimeOrigin() {
      return platform_1.otperformance.timeOrigin;
    }
    exports2.getTimeOrigin = getTimeOrigin;
    function hrTime(performanceNow) {
      const timeOrigin = millisToHrTime(platform_1.otperformance.timeOrigin);
      const now = millisToHrTime(typeof performanceNow === "number" ? performanceNow : platform_1.otperformance.now());
      return addHrTimes(timeOrigin, now);
    }
    exports2.hrTime = hrTime;
    function timeInputToHrTime(time) {
      if (isTimeInputHrTime(time)) {
        return time;
      } else if (typeof time === "number") {
        if (time < platform_1.otperformance.timeOrigin / 2) {
          return hrTime(time);
        } else {
          return millisToHrTime(time);
        }
      } else if (time instanceof Date) {
        return millisToHrTime(time.getTime());
      } else {
        throw TypeError("Invalid input type");
      }
    }
    exports2.timeInputToHrTime = timeInputToHrTime;
    function hrTimeDuration(startTime, endTime) {
      let seconds = endTime[0] - startTime[0];
      let nanos = endTime[1] - startTime[1];
      if (nanos < 0) {
        seconds -= 1;
        nanos += SECOND_TO_NANOSECONDS;
      }
      return [seconds, nanos];
    }
    exports2.hrTimeDuration = hrTimeDuration;
    function hrTimeToTimeStamp(time) {
      const precision = NANOSECOND_DIGITS;
      const tmp = `${"0".repeat(precision)}${time[1]}Z`;
      const nanoString = tmp.substring(tmp.length - precision - 1);
      const date = new Date(time[0] * 1e3).toISOString();
      return date.replace("000Z", nanoString);
    }
    exports2.hrTimeToTimeStamp = hrTimeToTimeStamp;
    function hrTimeToNanoseconds(time) {
      return time[0] * SECOND_TO_NANOSECONDS + time[1];
    }
    exports2.hrTimeToNanoseconds = hrTimeToNanoseconds;
    function hrTimeToMicroseconds(time) {
      return time[0] * 1e6 + time[1] / 1e3;
    }
    exports2.hrTimeToMicroseconds = hrTimeToMicroseconds;
    function hrTimeToMilliseconds(time) {
      return time[0] * 1e3 + time[1] / 1e6;
    }
    exports2.hrTimeToMilliseconds = hrTimeToMilliseconds;
    function hrTimeToSeconds(time) {
      return time[0] + time[1] / SECOND_TO_NANOSECONDS;
    }
    exports2.hrTimeToSeconds = hrTimeToSeconds;
    function isTimeInputHrTime(value) {
      return Array.isArray(value) && value.length === 2 && typeof value[0] === "number" && typeof value[1] === "number";
    }
    exports2.isTimeInputHrTime = isTimeInputHrTime;
    function isTimeInput(value) {
      return isTimeInputHrTime(value) || typeof value === "number" || value instanceof Date;
    }
    exports2.isTimeInput = isTimeInput;
    function addHrTimes(time1, time2) {
      const out = [time1[0] + time2[0], time1[1] + time2[1]];
      if (out[1] >= SECOND_TO_NANOSECONDS) {
        out[1] -= SECOND_TO_NANOSECONDS;
        out[0] += 1;
      }
      return out;
    }
    exports2.addHrTimes = addHrTimes;
  }
});

// node_modules/@opentelemetry/core/build/src/common/timer-util.js
var require_timer_util = __commonJS({
  "node_modules/@opentelemetry/core/build/src/common/timer-util.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.unrefTimer = void 0;
    function unrefTimer(timer) {
      if (typeof timer !== "number") {
        timer.unref();
      }
    }
    exports2.unrefTimer = unrefTimer;
  }
});

// node_modules/@opentelemetry/core/build/src/ExportResult.js
var require_ExportResult = __commonJS({
  "node_modules/@opentelemetry/core/build/src/ExportResult.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ExportResultCode = void 0;
    var ExportResultCode;
    (function(ExportResultCode2) {
      ExportResultCode2[ExportResultCode2["SUCCESS"] = 0] = "SUCCESS";
      ExportResultCode2[ExportResultCode2["FAILED"] = 1] = "FAILED";
    })(ExportResultCode || (exports2.ExportResultCode = ExportResultCode = {}));
  }
});

// node_modules/@opentelemetry/core/build/src/propagation/composite.js
var require_composite = __commonJS({
  "node_modules/@opentelemetry/core/build/src/propagation/composite.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CompositePropagator = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var CompositePropagator = class {
      _propagators;
      _fields;
      /**
       * Construct a composite propagator from a list of propagators.
       *
       * @param [config] Configuration object for composite propagator
       */
      constructor(config = {}) {
        this._propagators = config.propagators ?? [];
        const fields = /* @__PURE__ */ new Set();
        for (const propagator of this._propagators) {
          const propagatorFields = typeof propagator.fields === "function" ? propagator.fields() : [];
          for (const field of propagatorFields) {
            fields.add(field);
          }
        }
        this._fields = Array.from(fields);
      }
      /**
       * Run each of the configured propagators with the given context and carrier.
       * Propagators are run in the order they are configured, so if multiple
       * propagators write the same carrier key, the propagator later in the list
       * will "win".
       *
       * @param context Context to inject
       * @param carrier Carrier into which context will be injected
       */
      inject(context2, carrier, setter) {
        for (const propagator of this._propagators) {
          try {
            propagator.inject(context2, carrier, setter);
          } catch (err) {
            api_1.diag.warn(`Failed to inject with ${propagator.constructor.name}. Err: ${err.message}`);
          }
        }
      }
      /**
       * Run each of the configured propagators with the given context and carrier.
       * Propagators are run in the order they are configured, so if multiple
       * propagators write the same context key, the propagator later in the list
       * will "win".
       *
       * @param context Context to add values to
       * @param carrier Carrier from which to extract context
       */
      extract(context2, carrier, getter) {
        return this._propagators.reduce((ctx, propagator) => {
          try {
            return propagator.extract(ctx, carrier, getter);
          } catch (err) {
            api_1.diag.warn(`Failed to extract with ${propagator.constructor.name}. Err: ${err.message}`);
          }
          return ctx;
        }, context2);
      }
      fields() {
        return this._fields.slice();
      }
    };
    exports2.CompositePropagator = CompositePropagator;
  }
});

// node_modules/@opentelemetry/core/build/src/internal/validators.js
var require_validators = __commonJS({
  "node_modules/@opentelemetry/core/build/src/internal/validators.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.validateValue = exports2.validateKey = void 0;
    var VALID_KEY_CHAR_RANGE2 = "[_0-9a-z-*/]";
    var VALID_KEY2 = `[a-z]${VALID_KEY_CHAR_RANGE2}{0,255}`;
    var VALID_VENDOR_KEY2 = `[a-z0-9]${VALID_KEY_CHAR_RANGE2}{0,240}@[a-z]${VALID_KEY_CHAR_RANGE2}{0,13}`;
    var VALID_KEY_REGEX2 = new RegExp(`^(?:${VALID_KEY2}|${VALID_VENDOR_KEY2})$`);
    var VALID_VALUE_BASE_REGEX2 = /^[ -~]{0,255}[!-~]$/;
    var INVALID_VALUE_COMMA_EQUAL_REGEX2 = /,|=/;
    function validateKey2(key) {
      return VALID_KEY_REGEX2.test(key);
    }
    exports2.validateKey = validateKey2;
    function validateValue2(value) {
      return VALID_VALUE_BASE_REGEX2.test(value) && !INVALID_VALUE_COMMA_EQUAL_REGEX2.test(value);
    }
    exports2.validateValue = validateValue2;
  }
});

// node_modules/@opentelemetry/core/build/src/trace/TraceState.js
var require_TraceState = __commonJS({
  "node_modules/@opentelemetry/core/build/src/trace/TraceState.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TraceState = void 0;
    var validators_1 = require_validators();
    var MAX_TRACE_STATE_ITEMS2 = 32;
    var MAX_TRACE_STATE_LEN2 = 512;
    var LIST_MEMBERS_SEPARATOR2 = ",";
    var LIST_MEMBER_KEY_VALUE_SPLITTER2 = "=";
    var TraceState = class _TraceState {
      _length;
      _rawTraceState;
      _internalState;
      constructor(rawTraceState) {
        this._rawTraceState = typeof rawTraceState === "string" ? rawTraceState : "";
        this._length = this._rawTraceState.length;
      }
      set(key, value) {
        if (!(0, validators_1.validateKey)(key) || !(0, validators_1.validateValue)(value)) {
          return this;
        }
        const currState = this._getState();
        const currValue = currState.get(key);
        let newLength = this._length;
        if (typeof currValue === "string") {
          newLength += value.length - currValue.length;
        } else {
          newLength += key.length + value.length + (currState.size > 0 ? 2 : 1);
        }
        if (newLength > MAX_TRACE_STATE_LEN2) {
          return this;
        }
        const newState = new Map(currState);
        newState.delete(key);
        newState.set(key, value);
        return this._fromState(newState, newLength);
      }
      unset(key) {
        const currState = this._getState();
        const currValue = currState.get(key);
        if (typeof currValue !== "string") {
          return this;
        }
        let newLength = this._length - (key.length + currValue.length + 1);
        if (currState.size > 1) {
          newLength = newLength - 1;
        }
        const newState = new Map(currState);
        newState.delete(key);
        return this._fromState(newState, newLength);
      }
      get(key) {
        const currState = this._getState();
        return currState.get(key);
      }
      serialize() {
        let serialized = "";
        let index = 0;
        for (const entry of this._getState()) {
          if (index > 0) {
            serialized = LIST_MEMBERS_SEPARATOR2 + serialized;
          }
          serialized = `${entry[0]}${LIST_MEMBER_KEY_VALUE_SPLITTER2}${entry[1]}` + serialized;
          index++;
        }
        return serialized;
      }
      _getState() {
        if (this._internalState) {
          return this._internalState;
        }
        const vendorMembers = this._rawTraceState.split(LIST_MEMBERS_SEPARATOR2);
        const vendorEntries = /* @__PURE__ */ new Map();
        let currentLength = 0;
        for (const member of vendorMembers) {
          const m = member.trim();
          const idx = m.indexOf(LIST_MEMBER_KEY_VALUE_SPLITTER2);
          if (idx === -1) {
            continue;
          }
          const key = m.slice(0, idx);
          const value = m.slice(idx + 1);
          if (!(0, validators_1.validateKey)(key) || !(0, validators_1.validateValue)(value)) {
            continue;
          }
          const futureLength = currentLength + m.length + (vendorEntries.size > 0 ? 1 : 0);
          if (futureLength > MAX_TRACE_STATE_LEN2) {
            continue;
          }
          vendorEntries.set(key, value);
          currentLength = futureLength;
          if (vendorEntries.size >= MAX_TRACE_STATE_ITEMS2) {
            break;
          }
        }
        this._length = currentLength;
        this._internalState = new Map(Array.from(vendorEntries.entries()).reverse());
        return this._internalState;
      }
      _fromState(state, length) {
        const traceState = Object.create(_TraceState.prototype);
        traceState._internalState = state;
        traceState._length = length;
        return traceState;
      }
    };
    exports2.TraceState = TraceState;
  }
});

// node_modules/@opentelemetry/core/build/src/trace/W3CTraceContextPropagator.js
var require_W3CTraceContextPropagator = __commonJS({
  "node_modules/@opentelemetry/core/build/src/trace/W3CTraceContextPropagator.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.W3CTraceContextPropagator = exports2.parseTraceParent = exports2.TRACE_STATE_HEADER = exports2.TRACE_PARENT_HEADER = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var suppress_tracing_1 = require_suppress_tracing();
    var TraceState_1 = require_TraceState();
    exports2.TRACE_PARENT_HEADER = "traceparent";
    exports2.TRACE_STATE_HEADER = "tracestate";
    var VERSION2 = "00";
    var VERSION_PART = "(?!ff)[\\da-f]{2}";
    var TRACE_ID_PART = "(?![0]{32})[\\da-f]{32}";
    var PARENT_ID_PART = "(?![0]{16})[\\da-f]{16}";
    var FLAGS_PART = "[\\da-f]{2}";
    var TRACE_PARENT_REGEX = new RegExp(`^\\s?(${VERSION_PART})-(${TRACE_ID_PART})-(${PARENT_ID_PART})-(${FLAGS_PART})(-.*)?\\s?$`);
    function parseTraceParent(traceParent) {
      const match = TRACE_PARENT_REGEX.exec(traceParent);
      if (!match)
        return null;
      if (match[1] === "00" && match[5])
        return null;
      return {
        traceId: match[2],
        spanId: match[3],
        traceFlags: parseInt(match[4], 16)
      };
    }
    exports2.parseTraceParent = parseTraceParent;
    var W3CTraceContextPropagator = class {
      inject(context2, carrier, setter) {
        const spanContext = api_1.trace.getSpanContext(context2);
        if (!spanContext || (0, suppress_tracing_1.isTracingSuppressed)(context2) || !(0, api_1.isSpanContextValid)(spanContext))
          return;
        const traceParent = `${VERSION2}-${spanContext.traceId}-${spanContext.spanId}-0${Number(spanContext.traceFlags || api_1.TraceFlags.NONE).toString(16)}`;
        setter.set(carrier, exports2.TRACE_PARENT_HEADER, traceParent);
        if (spanContext.traceState) {
          setter.set(carrier, exports2.TRACE_STATE_HEADER, spanContext.traceState.serialize());
        }
      }
      extract(context2, carrier, getter) {
        const traceParentHeader = getter.get(carrier, exports2.TRACE_PARENT_HEADER);
        if (!traceParentHeader)
          return context2;
        const traceParent = Array.isArray(traceParentHeader) ? traceParentHeader[0] : traceParentHeader;
        if (typeof traceParent !== "string")
          return context2;
        const spanContext = parseTraceParent(traceParent);
        if (!spanContext)
          return context2;
        spanContext.isRemote = true;
        const traceStateHeader = getter.get(carrier, exports2.TRACE_STATE_HEADER);
        if (traceStateHeader) {
          const state = Array.isArray(traceStateHeader) ? traceStateHeader.join(",") : traceStateHeader;
          spanContext.traceState = new TraceState_1.TraceState(typeof state === "string" ? state : void 0);
        }
        return api_1.trace.setSpanContext(context2, spanContext);
      }
      fields() {
        return [exports2.TRACE_PARENT_HEADER, exports2.TRACE_STATE_HEADER];
      }
    };
    exports2.W3CTraceContextPropagator = W3CTraceContextPropagator;
  }
});

// node_modules/@opentelemetry/core/build/src/trace/rpc-metadata.js
var require_rpc_metadata = __commonJS({
  "node_modules/@opentelemetry/core/build/src/trace/rpc-metadata.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getRPCMetadata = exports2.deleteRPCMetadata = exports2.setRPCMetadata = exports2.RPCType = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var RPC_METADATA_KEY = (0, api_1.createContextKey)("OpenTelemetry SDK Context Key RPC_METADATA");
    var RPCType;
    (function(RPCType2) {
      RPCType2["HTTP"] = "http";
    })(RPCType || (exports2.RPCType = RPCType = {}));
    function setRPCMetadata(context2, meta) {
      return context2.setValue(RPC_METADATA_KEY, meta);
    }
    exports2.setRPCMetadata = setRPCMetadata;
    function deleteRPCMetadata(context2) {
      return context2.deleteValue(RPC_METADATA_KEY);
    }
    exports2.deleteRPCMetadata = deleteRPCMetadata;
    function getRPCMetadata(context2) {
      return context2.getValue(RPC_METADATA_KEY);
    }
    exports2.getRPCMetadata = getRPCMetadata;
  }
});

// node_modules/@opentelemetry/core/build/src/utils/lodash.merge.js
var require_lodash_merge = __commonJS({
  "node_modules/@opentelemetry/core/build/src/utils/lodash.merge.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isPlainObject = void 0;
    var objectTag = "[object Object]";
    var nullTag = "[object Null]";
    var undefinedTag = "[object Undefined]";
    var funcProto = Function.prototype;
    var funcToString = funcProto.toString;
    var objectCtorString = funcToString.call(Object);
    var getPrototypeOf = Object.getPrototypeOf;
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var symToStringTag = Symbol ? Symbol.toStringTag : void 0;
    var nativeObjectToString = objectProto.toString;
    function isPlainObject(value) {
      if (!isObjectLike(value) || baseGetTag(value) !== objectTag) {
        return false;
      }
      const proto = getPrototypeOf(value);
      if (proto === null) {
        return true;
      }
      const Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
      return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) === objectCtorString;
    }
    exports2.isPlainObject = isPlainObject;
    function isObjectLike(value) {
      return value != null && typeof value == "object";
    }
    function baseGetTag(value) {
      if (value == null) {
        return value === void 0 ? undefinedTag : nullTag;
      }
      return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
    }
    function getRawTag(value) {
      const isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
      let unmasked = false;
      try {
        value[symToStringTag] = void 0;
        unmasked = true;
      } catch {
      }
      const result = nativeObjectToString.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag;
        } else {
          delete value[symToStringTag];
        }
      }
      return result;
    }
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }
  }
});

// node_modules/@opentelemetry/core/build/src/utils/merge.js
var require_merge = __commonJS({
  "node_modules/@opentelemetry/core/build/src/utils/merge.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.merge = void 0;
    var lodash_merge_1 = require_lodash_merge();
    var MAX_LEVEL = 20;
    function merge(...args) {
      let result = args.shift();
      const objects = /* @__PURE__ */ new WeakMap();
      while (args.length > 0) {
        result = mergeTwoObjects(result, args.shift(), 0, objects);
      }
      return result;
    }
    exports2.merge = merge;
    function takeValue(value) {
      if (isArray(value)) {
        return value.slice();
      }
      return value;
    }
    function mergeTwoObjects(one, two, level = 0, objects) {
      let result;
      if (level > MAX_LEVEL) {
        return void 0;
      }
      level++;
      if (isPrimitive(one) || isPrimitive(two) || isFunction(two)) {
        result = takeValue(two);
      } else if (isArray(one)) {
        result = one.slice();
        if (isArray(two)) {
          for (let i = 0, j = two.length; i < j; i++) {
            result.push(takeValue(two[i]));
          }
        } else if (isObject(two)) {
          const keys = Object.keys(two);
          for (let i = 0, j = keys.length; i < j; i++) {
            const key = keys[i];
            if (key === "__proto__" || key === "constructor" || key === "prototype") {
              continue;
            }
            result[key] = takeValue(two[key]);
          }
        }
      } else if (isObject(one)) {
        if (isObject(two)) {
          if (!shouldMerge(one, two)) {
            return two;
          }
          result = Object.assign({}, one);
          const keys = Object.keys(two);
          for (let i = 0, j = keys.length; i < j; i++) {
            const key = keys[i];
            if (key === "__proto__" || key === "constructor" || key === "prototype") {
              continue;
            }
            const twoValue = two[key];
            if (isPrimitive(twoValue)) {
              if (typeof twoValue === "undefined") {
                delete result[key];
              } else {
                result[key] = twoValue;
              }
            } else {
              const obj1 = result[key];
              const obj2 = twoValue;
              if (wasObjectReferenced(one, key, objects) || wasObjectReferenced(two, key, objects)) {
                delete result[key];
              } else {
                if (isObject(obj1) && isObject(obj2)) {
                  const arr1 = objects.get(obj1) || [];
                  const arr2 = objects.get(obj2) || [];
                  arr1.push({ obj: one, key });
                  arr2.push({ obj: two, key });
                  objects.set(obj1, arr1);
                  objects.set(obj2, arr2);
                }
                result[key] = mergeTwoObjects(result[key], twoValue, level, objects);
              }
            }
          }
        } else {
          result = two;
        }
      }
      return result;
    }
    function wasObjectReferenced(obj, key, objects) {
      const arr = objects.get(obj[key]) || [];
      for (let i = 0, j = arr.length; i < j; i++) {
        const info = arr[i];
        if (info.key === key && info.obj === obj) {
          return true;
        }
      }
      return false;
    }
    function isArray(value) {
      return Array.isArray(value);
    }
    function isFunction(value) {
      return typeof value === "function";
    }
    function isObject(value) {
      return !isPrimitive(value) && !isArray(value) && !isFunction(value) && typeof value === "object";
    }
    function isPrimitive(value) {
      return typeof value === "string" || typeof value === "number" || typeof value === "boolean" || typeof value === "undefined" || value instanceof Date || value instanceof RegExp || value === null;
    }
    function shouldMerge(one, two) {
      if (!(0, lodash_merge_1.isPlainObject)(one) || !(0, lodash_merge_1.isPlainObject)(two)) {
        return false;
      }
      return true;
    }
  }
});

// node_modules/@opentelemetry/core/build/src/utils/timeout.js
var require_timeout = __commonJS({
  "node_modules/@opentelemetry/core/build/src/utils/timeout.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.callWithTimeout = exports2.TimeoutError = void 0;
    var TimeoutError = class _TimeoutError extends Error {
      constructor(message) {
        super(message);
        Object.setPrototypeOf(this, _TimeoutError.prototype);
      }
    };
    exports2.TimeoutError = TimeoutError;
    function callWithTimeout(promise, timeout) {
      let timeoutHandle;
      const timeoutPromise = new Promise(function timeoutFunction(_resolve, reject) {
        timeoutHandle = setTimeout(function timeoutHandler() {
          reject(new TimeoutError("Operation timed out."));
        }, timeout);
      });
      return Promise.race([promise, timeoutPromise]).then((result) => {
        clearTimeout(timeoutHandle);
        return result;
      }, (reason) => {
        clearTimeout(timeoutHandle);
        throw reason;
      });
    }
    exports2.callWithTimeout = callWithTimeout;
  }
});

// node_modules/@opentelemetry/core/build/src/utils/url.js
var require_url = __commonJS({
  "node_modules/@opentelemetry/core/build/src/utils/url.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isUrlIgnored = exports2.urlMatches = void 0;
    function urlMatches(url, urlToMatch) {
      if (typeof urlToMatch === "string") {
        return url === urlToMatch;
      } else {
        return !!url.match(urlToMatch);
      }
    }
    exports2.urlMatches = urlMatches;
    function isUrlIgnored(url, ignoredUrls) {
      if (!ignoredUrls) {
        return false;
      }
      for (const ignoreUrl of ignoredUrls) {
        if (urlMatches(url, ignoreUrl)) {
          return true;
        }
      }
      return false;
    }
    exports2.isUrlIgnored = isUrlIgnored;
  }
});

// node_modules/@opentelemetry/core/build/src/utils/promise.js
var require_promise = __commonJS({
  "node_modules/@opentelemetry/core/build/src/utils/promise.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Deferred = void 0;
    var Deferred = class {
      _promise;
      _resolve;
      _reject;
      constructor() {
        this._promise = new Promise((resolve, reject) => {
          this._resolve = resolve;
          this._reject = reject;
        });
      }
      get promise() {
        return this._promise;
      }
      resolve(val) {
        this._resolve(val);
      }
      reject(err) {
        this._reject(err);
      }
    };
    exports2.Deferred = Deferred;
  }
});

// node_modules/@opentelemetry/core/build/src/utils/callback.js
var require_callback = __commonJS({
  "node_modules/@opentelemetry/core/build/src/utils/callback.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.BindOnceFuture = void 0;
    var promise_1 = require_promise();
    var BindOnceFuture = class {
      _isCalled = false;
      _deferred = new promise_1.Deferred();
      _callback;
      _that;
      constructor(callback, that) {
        this._callback = callback;
        this._that = that;
      }
      get isCalled() {
        return this._isCalled;
      }
      get promise() {
        return this._deferred.promise;
      }
      call(...args) {
        if (!this._isCalled) {
          this._isCalled = true;
          try {
            Promise.resolve(this._callback.call(this._that, ...args)).then((val) => this._deferred.resolve(val), (err) => this._deferred.reject(err));
          } catch (err) {
            this._deferred.reject(err);
          }
        }
        return this._deferred.promise;
      }
    };
    exports2.BindOnceFuture = BindOnceFuture;
  }
});

// node_modules/@opentelemetry/core/build/src/utils/configuration.js
var require_configuration = __commonJS({
  "node_modules/@opentelemetry/core/build/src/utils/configuration.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.diagLogLevelFromString = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var logLevelMap = {
      ALL: api_1.DiagLogLevel.ALL,
      VERBOSE: api_1.DiagLogLevel.VERBOSE,
      DEBUG: api_1.DiagLogLevel.DEBUG,
      INFO: api_1.DiagLogLevel.INFO,
      WARN: api_1.DiagLogLevel.WARN,
      ERROR: api_1.DiagLogLevel.ERROR,
      NONE: api_1.DiagLogLevel.NONE
    };
    function diagLogLevelFromString(value) {
      if (value == null) {
        return void 0;
      }
      const resolvedLogLevel = logLevelMap[value.toUpperCase()];
      if (resolvedLogLevel == null) {
        api_1.diag.warn(`Unknown log level "${value}", expected one of ${Object.keys(logLevelMap)}, using default`);
        return api_1.DiagLogLevel.INFO;
      }
      return resolvedLogLevel;
    }
    exports2.diagLogLevelFromString = diagLogLevelFromString;
  }
});

// node_modules/@opentelemetry/core/build/src/internal/exporter.js
var require_exporter = __commonJS({
  "node_modules/@opentelemetry/core/build/src/internal/exporter.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2._export = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var suppress_tracing_1 = require_suppress_tracing();
    function _export(exporter, arg) {
      return new Promise((resolve) => {
        api_1.context.with((0, suppress_tracing_1.suppressTracing)(api_1.context.active()), () => {
          exporter.export(arg, resolve);
        });
      });
    }
    exports2._export = _export;
  }
});

// node_modules/@opentelemetry/core/build/src/index.js
var require_src2 = __commonJS({
  "node_modules/@opentelemetry/core/build/src/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.diagLogLevelFromString = exports2.BindOnceFuture = exports2.urlMatches = exports2.isUrlIgnored = exports2.callWithTimeout = exports2.TimeoutError = exports2.merge = exports2.TraceState = exports2.unsuppressTracing = exports2.suppressTracing = exports2.isTracingSuppressed = exports2.setRPCMetadata = exports2.getRPCMetadata = exports2.deleteRPCMetadata = exports2.RPCType = exports2.parseTraceParent = exports2.W3CTraceContextPropagator = exports2.TRACE_STATE_HEADER = exports2.TRACE_PARENT_HEADER = exports2.CompositePropagator = exports2.otperformance = exports2.getStringListFromEnv = exports2.getNumberFromEnv = exports2.getBooleanFromEnv = exports2.getStringFromEnv = exports2._globalThis = exports2.SDK_INFO = exports2.parseKeyPairsIntoRecord = exports2.ExportResultCode = exports2.unrefTimer = exports2.timeInputToHrTime = exports2.millisToHrTime = exports2.isTimeInputHrTime = exports2.isTimeInput = exports2.hrTimeToTimeStamp = exports2.hrTimeToSeconds = exports2.hrTimeToNanoseconds = exports2.hrTimeToMilliseconds = exports2.hrTimeToMicroseconds = exports2.hrTimeDuration = exports2.hrTime = exports2.getTimeOrigin = exports2.addHrTimes = exports2.loggingErrorHandler = exports2.setGlobalErrorHandler = exports2.globalErrorHandler = exports2.sanitizeAttributes = exports2.isAttributeValue = exports2.AnchoredClock = exports2.W3CBaggagePropagator = void 0;
    exports2.internal = void 0;
    var W3CBaggagePropagator_1 = require_W3CBaggagePropagator();
    Object.defineProperty(exports2, "W3CBaggagePropagator", { enumerable: true, get: function() {
      return W3CBaggagePropagator_1.W3CBaggagePropagator;
    } });
    var anchored_clock_1 = require_anchored_clock();
    Object.defineProperty(exports2, "AnchoredClock", { enumerable: true, get: function() {
      return anchored_clock_1.AnchoredClock;
    } });
    var attributes_1 = require_attributes();
    Object.defineProperty(exports2, "isAttributeValue", { enumerable: true, get: function() {
      return attributes_1.isAttributeValue;
    } });
    Object.defineProperty(exports2, "sanitizeAttributes", { enumerable: true, get: function() {
      return attributes_1.sanitizeAttributes;
    } });
    var global_error_handler_1 = require_global_error_handler();
    Object.defineProperty(exports2, "globalErrorHandler", { enumerable: true, get: function() {
      return global_error_handler_1.globalErrorHandler;
    } });
    Object.defineProperty(exports2, "setGlobalErrorHandler", { enumerable: true, get: function() {
      return global_error_handler_1.setGlobalErrorHandler;
    } });
    var logging_error_handler_1 = require_logging_error_handler();
    Object.defineProperty(exports2, "loggingErrorHandler", { enumerable: true, get: function() {
      return logging_error_handler_1.loggingErrorHandler;
    } });
    var time_1 = require_time();
    Object.defineProperty(exports2, "addHrTimes", { enumerable: true, get: function() {
      return time_1.addHrTimes;
    } });
    Object.defineProperty(exports2, "getTimeOrigin", { enumerable: true, get: function() {
      return time_1.getTimeOrigin;
    } });
    Object.defineProperty(exports2, "hrTime", { enumerable: true, get: function() {
      return time_1.hrTime;
    } });
    Object.defineProperty(exports2, "hrTimeDuration", { enumerable: true, get: function() {
      return time_1.hrTimeDuration;
    } });
    Object.defineProperty(exports2, "hrTimeToMicroseconds", { enumerable: true, get: function() {
      return time_1.hrTimeToMicroseconds;
    } });
    Object.defineProperty(exports2, "hrTimeToMilliseconds", { enumerable: true, get: function() {
      return time_1.hrTimeToMilliseconds;
    } });
    Object.defineProperty(exports2, "hrTimeToNanoseconds", { enumerable: true, get: function() {
      return time_1.hrTimeToNanoseconds;
    } });
    Object.defineProperty(exports2, "hrTimeToSeconds", { enumerable: true, get: function() {
      return time_1.hrTimeToSeconds;
    } });
    Object.defineProperty(exports2, "hrTimeToTimeStamp", { enumerable: true, get: function() {
      return time_1.hrTimeToTimeStamp;
    } });
    Object.defineProperty(exports2, "isTimeInput", { enumerable: true, get: function() {
      return time_1.isTimeInput;
    } });
    Object.defineProperty(exports2, "isTimeInputHrTime", { enumerable: true, get: function() {
      return time_1.isTimeInputHrTime;
    } });
    Object.defineProperty(exports2, "millisToHrTime", { enumerable: true, get: function() {
      return time_1.millisToHrTime;
    } });
    Object.defineProperty(exports2, "timeInputToHrTime", { enumerable: true, get: function() {
      return time_1.timeInputToHrTime;
    } });
    var timer_util_1 = require_timer_util();
    Object.defineProperty(exports2, "unrefTimer", { enumerable: true, get: function() {
      return timer_util_1.unrefTimer;
    } });
    var ExportResult_1 = require_ExportResult();
    Object.defineProperty(exports2, "ExportResultCode", { enumerable: true, get: function() {
      return ExportResult_1.ExportResultCode;
    } });
    var utils_1 = require_utils();
    Object.defineProperty(exports2, "parseKeyPairsIntoRecord", { enumerable: true, get: function() {
      return utils_1.parseKeyPairsIntoRecord;
    } });
    var platform_1 = require_platform();
    Object.defineProperty(exports2, "SDK_INFO", { enumerable: true, get: function() {
      return platform_1.SDK_INFO;
    } });
    Object.defineProperty(exports2, "_globalThis", { enumerable: true, get: function() {
      return platform_1._globalThis;
    } });
    Object.defineProperty(exports2, "getStringFromEnv", { enumerable: true, get: function() {
      return platform_1.getStringFromEnv;
    } });
    Object.defineProperty(exports2, "getBooleanFromEnv", { enumerable: true, get: function() {
      return platform_1.getBooleanFromEnv;
    } });
    Object.defineProperty(exports2, "getNumberFromEnv", { enumerable: true, get: function() {
      return platform_1.getNumberFromEnv;
    } });
    Object.defineProperty(exports2, "getStringListFromEnv", { enumerable: true, get: function() {
      return platform_1.getStringListFromEnv;
    } });
    Object.defineProperty(exports2, "otperformance", { enumerable: true, get: function() {
      return platform_1.otperformance;
    } });
    var composite_1 = require_composite();
    Object.defineProperty(exports2, "CompositePropagator", { enumerable: true, get: function() {
      return composite_1.CompositePropagator;
    } });
    var W3CTraceContextPropagator_1 = require_W3CTraceContextPropagator();
    Object.defineProperty(exports2, "TRACE_PARENT_HEADER", { enumerable: true, get: function() {
      return W3CTraceContextPropagator_1.TRACE_PARENT_HEADER;
    } });
    Object.defineProperty(exports2, "TRACE_STATE_HEADER", { enumerable: true, get: function() {
      return W3CTraceContextPropagator_1.TRACE_STATE_HEADER;
    } });
    Object.defineProperty(exports2, "W3CTraceContextPropagator", { enumerable: true, get: function() {
      return W3CTraceContextPropagator_1.W3CTraceContextPropagator;
    } });
    Object.defineProperty(exports2, "parseTraceParent", { enumerable: true, get: function() {
      return W3CTraceContextPropagator_1.parseTraceParent;
    } });
    var rpc_metadata_1 = require_rpc_metadata();
    Object.defineProperty(exports2, "RPCType", { enumerable: true, get: function() {
      return rpc_metadata_1.RPCType;
    } });
    Object.defineProperty(exports2, "deleteRPCMetadata", { enumerable: true, get: function() {
      return rpc_metadata_1.deleteRPCMetadata;
    } });
    Object.defineProperty(exports2, "getRPCMetadata", { enumerable: true, get: function() {
      return rpc_metadata_1.getRPCMetadata;
    } });
    Object.defineProperty(exports2, "setRPCMetadata", { enumerable: true, get: function() {
      return rpc_metadata_1.setRPCMetadata;
    } });
    var suppress_tracing_1 = require_suppress_tracing();
    Object.defineProperty(exports2, "isTracingSuppressed", { enumerable: true, get: function() {
      return suppress_tracing_1.isTracingSuppressed;
    } });
    Object.defineProperty(exports2, "suppressTracing", { enumerable: true, get: function() {
      return suppress_tracing_1.suppressTracing;
    } });
    Object.defineProperty(exports2, "unsuppressTracing", { enumerable: true, get: function() {
      return suppress_tracing_1.unsuppressTracing;
    } });
    var TraceState_1 = require_TraceState();
    Object.defineProperty(exports2, "TraceState", { enumerable: true, get: function() {
      return TraceState_1.TraceState;
    } });
    var merge_1 = require_merge();
    Object.defineProperty(exports2, "merge", { enumerable: true, get: function() {
      return merge_1.merge;
    } });
    var timeout_1 = require_timeout();
    Object.defineProperty(exports2, "TimeoutError", { enumerable: true, get: function() {
      return timeout_1.TimeoutError;
    } });
    Object.defineProperty(exports2, "callWithTimeout", { enumerable: true, get: function() {
      return timeout_1.callWithTimeout;
    } });
    var url_1 = require_url();
    Object.defineProperty(exports2, "isUrlIgnored", { enumerable: true, get: function() {
      return url_1.isUrlIgnored;
    } });
    Object.defineProperty(exports2, "urlMatches", { enumerable: true, get: function() {
      return url_1.urlMatches;
    } });
    var callback_1 = require_callback();
    Object.defineProperty(exports2, "BindOnceFuture", { enumerable: true, get: function() {
      return callback_1.BindOnceFuture;
    } });
    var configuration_1 = require_configuration();
    Object.defineProperty(exports2, "diagLogLevelFromString", { enumerable: true, get: function() {
      return configuration_1.diagLogLevelFromString;
    } });
    var exporter_1 = require_exporter();
    exports2.internal = {
      _export: exporter_1._export
    };
  }
});

// node_modules/@opentelemetry/sdk-trace/build/src/StackContextManager.js
var require_StackContextManager = __commonJS({
  "node_modules/@opentelemetry/sdk-trace/build/src/StackContextManager.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.StackContextManager = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var StackContextManager = class {
      /**
       * whether the context manager is enabled or not
       */
      _enabled = false;
      /**
       * Keeps the reference to current context
       */
      _currentContext = api_1.ROOT_CONTEXT;
      /**
       *
       * @param context
       * @param target Function to be executed within the context
       */
      // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
      _bindFunction(context2 = api_1.ROOT_CONTEXT, target) {
        const manager = this;
        const contextWrapper = function(...args) {
          return manager.with(context2, () => target.apply(this, args));
        };
        Object.defineProperty(contextWrapper, "length", {
          enumerable: false,
          configurable: true,
          writable: false,
          value: target.length
        });
        return contextWrapper;
      }
      /**
       * Returns the active context
       */
      active() {
        return this._currentContext;
      }
      /**
       * Binds a the certain context or the active one to the target function and then returns the target
       * @param context A context (span) to be bind to target
       * @param target a function or event emitter. When target or one of its callbacks is called,
       *  the provided context will be used as the active context for the duration of the call.
       */
      bind(context2, target) {
        if (context2 === void 0) {
          context2 = this.active();
        }
        if (typeof target === "function") {
          return this._bindFunction(context2, target);
        }
        return target;
      }
      /**
       * Disable the context manager (clears the current context)
       */
      disable() {
        this._currentContext = api_1.ROOT_CONTEXT;
        this._enabled = false;
        return this;
      }
      /**
       * Enables the context manager and creates a default(root) context
       */
      enable() {
        if (this._enabled) {
          return this;
        }
        this._enabled = true;
        this._currentContext = api_1.ROOT_CONTEXT;
        return this;
      }
      /**
       * Calls the callback function [fn] with the provided [context]. If [context] is undefined then it will use the window.
       * The context will be set as active
       * @param context
       * @param fn Callback function
       * @param thisArg optional receiver to be used for calling fn
       * @param args optional arguments forwarded to fn
       */
      with(context2, fn, thisArg, ...args) {
        const previousContext = this._currentContext;
        this._currentContext = context2 || api_1.ROOT_CONTEXT;
        try {
          return fn.call(thisArg, ...args);
        } finally {
          this._currentContext = previousContext;
        }
      }
    };
    exports2.StackContextManager = StackContextManager;
  }
});

// node_modules/@opentelemetry/resources/build/src/default-service-name.js
var require_default_service_name = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/default-service-name.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2._clearDefaultServiceNameCache = exports2.defaultServiceName = void 0;
    var serviceName;
    function defaultServiceName() {
      if (serviceName === void 0) {
        try {
          const argv0 = globalThis.process.argv0;
          serviceName = argv0 ? `unknown_service:${argv0}` : "unknown_service";
        } catch {
          serviceName = "unknown_service";
        }
      }
      return serviceName;
    }
    exports2.defaultServiceName = defaultServiceName;
    function _clearDefaultServiceNameCache() {
      serviceName = void 0;
    }
    exports2._clearDefaultServiceNameCache = _clearDefaultServiceNameCache;
  }
});

// node_modules/@opentelemetry/resources/build/src/utils.js
var require_utils3 = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/utils.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isPromiseLike = void 0;
    var isPromiseLike = (val) => {
      return val !== null && typeof val === "object" && typeof val.then === "function";
    };
    exports2.isPromiseLike = isPromiseLike;
  }
});

// node_modules/@opentelemetry/resources/build/src/ResourceImpl.js
var require_ResourceImpl = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/ResourceImpl.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.defaultResource = exports2.emptyResource = exports2.resourceFromDetectedResource = exports2.resourceFromAttributes = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var core_1 = require_src2();
    var semantic_conventions_1 = require_dist();
    var default_service_name_1 = require_default_service_name();
    var utils_1 = require_utils3();
    var ResourceImpl = class _ResourceImpl {
      _rawAttributes;
      _asyncAttributesPending = false;
      _schemaUrl;
      _memoizedAttributes;
      static FromAttributeList(attributes, options) {
        const res = new _ResourceImpl({}, options);
        res._rawAttributes = guardedRawAttributes(attributes);
        res._asyncAttributesPending = attributes.filter(([_, val]) => (0, utils_1.isPromiseLike)(val)).length > 0;
        return res;
      }
      constructor(resource, options) {
        const attributes = resource.attributes ?? {};
        this._rawAttributes = Object.entries(attributes).map(([k, v]) => {
          if ((0, utils_1.isPromiseLike)(v)) {
            this._asyncAttributesPending = true;
          }
          return [k, v];
        });
        this._rawAttributes = guardedRawAttributes(this._rawAttributes);
        this._schemaUrl = validateSchemaUrl(options?.schemaUrl);
      }
      get asyncAttributesPending() {
        return this._asyncAttributesPending;
      }
      async waitForAsyncAttributes() {
        if (!this.asyncAttributesPending) {
          return;
        }
        for (let i = 0; i < this._rawAttributes.length; i++) {
          const [k, v] = this._rawAttributes[i];
          this._rawAttributes[i] = [k, (0, utils_1.isPromiseLike)(v) ? await v : v];
        }
        this._asyncAttributesPending = false;
      }
      get attributes() {
        if (this.asyncAttributesPending) {
          api_1.diag.error("Accessing resource attributes before async attributes settled");
        }
        if (this._memoizedAttributes) {
          return this._memoizedAttributes;
        }
        const attrs = {};
        for (const [k, v] of this._rawAttributes) {
          if ((0, utils_1.isPromiseLike)(v)) {
            api_1.diag.debug(`Unsettled resource attribute ${k} skipped`);
            continue;
          }
          if (v != null) {
            attrs[k] ??= v;
          }
        }
        if (!this._asyncAttributesPending) {
          this._memoizedAttributes = attrs;
        }
        return attrs;
      }
      getRawAttributes() {
        return this._rawAttributes;
      }
      get schemaUrl() {
        return this._schemaUrl;
      }
      merge(resource) {
        if (resource == null)
          return this;
        const mergedSchemaUrl = mergeSchemaUrl(this, resource);
        const mergedOptions = mergedSchemaUrl ? { schemaUrl: mergedSchemaUrl } : void 0;
        return _ResourceImpl.FromAttributeList([...resource.getRawAttributes(), ...this.getRawAttributes()], mergedOptions);
      }
    };
    function resourceFromAttributes(attributes, options) {
      return ResourceImpl.FromAttributeList(Object.entries(attributes), options);
    }
    exports2.resourceFromAttributes = resourceFromAttributes;
    function resourceFromDetectedResource(detectedResource, options) {
      return new ResourceImpl(detectedResource, options);
    }
    exports2.resourceFromDetectedResource = resourceFromDetectedResource;
    function emptyResource() {
      return resourceFromAttributes({});
    }
    exports2.emptyResource = emptyResource;
    function defaultResource() {
      return resourceFromAttributes({
        [semantic_conventions_1.ATTR_SERVICE_NAME]: (0, default_service_name_1.defaultServiceName)(),
        [semantic_conventions_1.ATTR_TELEMETRY_SDK_LANGUAGE]: core_1.SDK_INFO[semantic_conventions_1.ATTR_TELEMETRY_SDK_LANGUAGE],
        [semantic_conventions_1.ATTR_TELEMETRY_SDK_NAME]: core_1.SDK_INFO[semantic_conventions_1.ATTR_TELEMETRY_SDK_NAME],
        [semantic_conventions_1.ATTR_TELEMETRY_SDK_VERSION]: core_1.SDK_INFO[semantic_conventions_1.ATTR_TELEMETRY_SDK_VERSION]
      });
    }
    exports2.defaultResource = defaultResource;
    function guardedRawAttributes(attributes) {
      return attributes.map(([k, v]) => {
        if ((0, utils_1.isPromiseLike)(v)) {
          return [
            k,
            v.catch((err) => {
              api_1.diag.debug("promise rejection for resource attribute: %s - %s", k, err);
              return void 0;
            })
          ];
        }
        return [k, v];
      });
    }
    function validateSchemaUrl(schemaUrl) {
      if (typeof schemaUrl === "string" || schemaUrl === void 0) {
        return schemaUrl;
      }
      api_1.diag.warn("Schema URL must be string or undefined, got %s. Schema URL will be ignored.", schemaUrl);
      return void 0;
    }
    function mergeSchemaUrl(old, updating) {
      const oldSchemaUrl = old?.schemaUrl;
      const updatingSchemaUrl = updating?.schemaUrl;
      const isOldEmpty = oldSchemaUrl === void 0 || oldSchemaUrl === "";
      const isUpdatingEmpty = updatingSchemaUrl === void 0 || updatingSchemaUrl === "";
      if (isOldEmpty) {
        return updatingSchemaUrl;
      }
      if (isUpdatingEmpty) {
        return oldSchemaUrl;
      }
      if (oldSchemaUrl === updatingSchemaUrl) {
        return oldSchemaUrl;
      }
      api_1.diag.warn('Schema URL merge conflict: old resource has "%s", updating resource has "%s". Resulting resource will have undefined Schema URL.', oldSchemaUrl, updatingSchemaUrl);
      return void 0;
    }
  }
});

// node_modules/@opentelemetry/resources/build/src/detect-resources.js
var require_detect_resources = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/detect-resources.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.detectResources = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var ResourceImpl_1 = require_ResourceImpl();
    var detectResources = (config = {}) => {
      const resources = (config.detectors || []).map((d) => {
        try {
          const resource = (0, ResourceImpl_1.resourceFromDetectedResource)(d.detect(config));
          api_1.diag.debug(`${d.constructor.name} found resource.`, resource);
          return resource;
        } catch (e) {
          api_1.diag.debug(`${d.constructor.name} failed: ${e.message}`);
          return (0, ResourceImpl_1.emptyResource)();
        }
      });
      return resources.reduce((acc, resource) => acc.merge(resource), (0, ResourceImpl_1.emptyResource)());
    };
    exports2.detectResources = detectResources;
  }
});

// node_modules/@opentelemetry/resources/build/src/detectors/EnvDetector.js
var require_EnvDetector = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/detectors/EnvDetector.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.envDetector = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var semantic_conventions_1 = require_dist();
    var core_1 = require_src2();
    var EnvDetector = class {
      // Type, attribute keys, and attribute values should not exceed 256 characters.
      _MAX_LENGTH = 255;
      // OTEL_RESOURCE_ATTRIBUTES is a comma-separated list of attributes.
      _COMMA_SEPARATOR = ",";
      // OTEL_RESOURCE_ATTRIBUTES contains key value pair separated by '='.
      _LABEL_KEY_VALUE_SPLITTER = "=";
      /**
       * Returns a {@link Resource} populated with attributes from the
       * OTEL_RESOURCE_ATTRIBUTES environment variable. Note this is an async
       * function to conform to the Detector interface.
       *
       * @param config The resource detection config
       */
      detect(_config) {
        const attributes = {};
        const rawAttributes = (0, core_1.getStringFromEnv)("OTEL_RESOURCE_ATTRIBUTES");
        const serviceName = (0, core_1.getStringFromEnv)("OTEL_SERVICE_NAME");
        if (rawAttributes) {
          try {
            const parsedAttributes = this._parseResourceAttributes(rawAttributes);
            Object.assign(attributes, parsedAttributes);
          } catch (e) {
            api_1.diag.debug(`EnvDetector failed: ${e instanceof Error ? e.message : e}`);
          }
        }
        if (serviceName) {
          attributes[semantic_conventions_1.ATTR_SERVICE_NAME] = serviceName;
        }
        return { attributes };
      }
      /**
       * Creates an attribute map from the OTEL_RESOURCE_ATTRIBUTES environment
       * variable.
       *
       * OTEL_RESOURCE_ATTRIBUTES: A comma-separated list of attributes in the
       * format "key1=value1,key2=value2". The ',' and '=' characters in keys
       * and values MUST be percent-encoded. Other characters MAY be percent-encoded.
       *
       * Per the spec, on any error (e.g., decoding failure), the entire environment
       * variable value is discarded.
       *
       * @param rawEnvAttributes The resource attributes as a comma-separated list
       * of key/value pairs.
       * @returns The parsed resource attributes.
       * @throws Error if parsing fails (caller handles by discarding all attributes)
       */
      _parseResourceAttributes(rawEnvAttributes) {
        if (!rawEnvAttributes)
          return {};
        const attributes = {};
        const rawAttributes = rawEnvAttributes.split(this._COMMA_SEPARATOR).filter((attr) => attr.trim() !== "");
        for (const rawAttribute of rawAttributes) {
          const keyValuePair = rawAttribute.split(this._LABEL_KEY_VALUE_SPLITTER);
          if (keyValuePair.length !== 2) {
            throw new Error(`Invalid format for OTEL_RESOURCE_ATTRIBUTES: "${rawAttribute}". Expected format: key=value. The ',' and '=' characters must be percent-encoded in keys and values.`);
          }
          const [rawKey, rawValue] = keyValuePair;
          const key = rawKey.trim();
          const value = rawValue.trim();
          if (key.length === 0) {
            throw new Error(`Invalid OTEL_RESOURCE_ATTRIBUTES: empty attribute key in "${rawAttribute}".`);
          }
          let decodedKey;
          let decodedValue;
          try {
            decodedKey = decodeURIComponent(key);
            decodedValue = decodeURIComponent(value);
          } catch (e) {
            throw new Error(`Failed to percent-decode OTEL_RESOURCE_ATTRIBUTES entry "${rawAttribute}": ${e instanceof Error ? e.message : e}`, { cause: e });
          }
          if (decodedKey.length > this._MAX_LENGTH) {
            throw new Error(`Attribute key exceeds the maximum length of ${this._MAX_LENGTH} characters: "${decodedKey}".`);
          }
          if (decodedValue.length > this._MAX_LENGTH) {
            throw new Error(`Attribute value exceeds the maximum length of ${this._MAX_LENGTH} characters for key "${decodedKey}".`);
          }
          attributes[decodedKey] = decodedValue;
        }
        return attributes;
      }
    };
    exports2.envDetector = new EnvDetector();
  }
});

// node_modules/@opentelemetry/resources/build/src/semconv.js
var require_semconv2 = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/semconv.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ATTR_WEBENGINE_VERSION = exports2.ATTR_WEBENGINE_NAME = exports2.ATTR_WEBENGINE_DESCRIPTION = exports2.ATTR_SERVICE_NAMESPACE = exports2.ATTR_SERVICE_INSTANCE_ID = exports2.ATTR_PROCESS_RUNTIME_VERSION = exports2.ATTR_PROCESS_RUNTIME_NAME = exports2.ATTR_PROCESS_RUNTIME_DESCRIPTION = exports2.ATTR_PROCESS_PID = exports2.ATTR_PROCESS_OWNER = exports2.ATTR_PROCESS_EXECUTABLE_PATH = exports2.ATTR_PROCESS_EXECUTABLE_NAME = exports2.ATTR_PROCESS_COMMAND_ARGS = exports2.ATTR_PROCESS_COMMAND = exports2.ATTR_OS_VERSION = exports2.ATTR_OS_TYPE = exports2.ATTR_K8S_POD_NAME = exports2.ATTR_K8S_NAMESPACE_NAME = exports2.ATTR_K8S_DEPLOYMENT_NAME = exports2.ATTR_K8S_CLUSTER_NAME = exports2.ATTR_HOST_TYPE = exports2.ATTR_HOST_NAME = exports2.ATTR_HOST_IMAGE_VERSION = exports2.ATTR_HOST_IMAGE_NAME = exports2.ATTR_HOST_IMAGE_ID = exports2.ATTR_HOST_ID = exports2.ATTR_HOST_ARCH = exports2.ATTR_CONTAINER_NAME = exports2.ATTR_CONTAINER_IMAGE_TAGS = exports2.ATTR_CONTAINER_IMAGE_NAME = exports2.ATTR_CONTAINER_ID = exports2.ATTR_CLOUD_REGION = exports2.ATTR_CLOUD_PROVIDER = exports2.ATTR_CLOUD_AVAILABILITY_ZONE = exports2.ATTR_CLOUD_ACCOUNT_ID = void 0;
    exports2.ATTR_CLOUD_ACCOUNT_ID = "cloud.account.id";
    exports2.ATTR_CLOUD_AVAILABILITY_ZONE = "cloud.availability_zone";
    exports2.ATTR_CLOUD_PROVIDER = "cloud.provider";
    exports2.ATTR_CLOUD_REGION = "cloud.region";
    exports2.ATTR_CONTAINER_ID = "container.id";
    exports2.ATTR_CONTAINER_IMAGE_NAME = "container.image.name";
    exports2.ATTR_CONTAINER_IMAGE_TAGS = "container.image.tags";
    exports2.ATTR_CONTAINER_NAME = "container.name";
    exports2.ATTR_HOST_ARCH = "host.arch";
    exports2.ATTR_HOST_ID = "host.id";
    exports2.ATTR_HOST_IMAGE_ID = "host.image.id";
    exports2.ATTR_HOST_IMAGE_NAME = "host.image.name";
    exports2.ATTR_HOST_IMAGE_VERSION = "host.image.version";
    exports2.ATTR_HOST_NAME = "host.name";
    exports2.ATTR_HOST_TYPE = "host.type";
    exports2.ATTR_K8S_CLUSTER_NAME = "k8s.cluster.name";
    exports2.ATTR_K8S_DEPLOYMENT_NAME = "k8s.deployment.name";
    exports2.ATTR_K8S_NAMESPACE_NAME = "k8s.namespace.name";
    exports2.ATTR_K8S_POD_NAME = "k8s.pod.name";
    exports2.ATTR_OS_TYPE = "os.type";
    exports2.ATTR_OS_VERSION = "os.version";
    exports2.ATTR_PROCESS_COMMAND = "process.command";
    exports2.ATTR_PROCESS_COMMAND_ARGS = "process.command_args";
    exports2.ATTR_PROCESS_EXECUTABLE_NAME = "process.executable.name";
    exports2.ATTR_PROCESS_EXECUTABLE_PATH = "process.executable.path";
    exports2.ATTR_PROCESS_OWNER = "process.owner";
    exports2.ATTR_PROCESS_PID = "process.pid";
    exports2.ATTR_PROCESS_RUNTIME_DESCRIPTION = "process.runtime.description";
    exports2.ATTR_PROCESS_RUNTIME_NAME = "process.runtime.name";
    exports2.ATTR_PROCESS_RUNTIME_VERSION = "process.runtime.version";
    exports2.ATTR_SERVICE_INSTANCE_ID = "service.instance.id";
    exports2.ATTR_SERVICE_NAMESPACE = "service.namespace";
    exports2.ATTR_WEBENGINE_DESCRIPTION = "webengine.description";
    exports2.ATTR_WEBENGINE_NAME = "webengine.name";
    exports2.ATTR_WEBENGINE_VERSION = "webengine.version";
  }
});

// node_modules/@opentelemetry/resources/build/src/detectors/platform/node/machine-id/execAsync.js
var require_execAsync = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/detectors/platform/node/machine-id/execAsync.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.execAsync = void 0;
    var child_process = require("child_process");
    var util = require("util");
    exports2.execAsync = util.promisify(child_process.exec);
  }
});

// node_modules/@opentelemetry/resources/build/src/detectors/platform/node/machine-id/getMachineId-darwin.js
var require_getMachineId_darwin = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/detectors/platform/node/machine-id/getMachineId-darwin.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getMachineId = void 0;
    var execAsync_1 = require_execAsync();
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    async function getMachineId() {
      try {
        const result = await (0, execAsync_1.execAsync)('ioreg -rd1 -c "IOPlatformExpertDevice"');
        const idLine = result.stdout.split("\n").find((line) => line.includes("IOPlatformUUID"));
        if (!idLine) {
          return void 0;
        }
        const parts = idLine.split('" = "');
        if (parts.length === 2) {
          return parts[1].slice(0, -1);
        }
      } catch (e) {
        api_1.diag.debug(`error reading machine id: ${e}`);
      }
      return void 0;
    }
    exports2.getMachineId = getMachineId;
  }
});

// node_modules/@opentelemetry/resources/build/src/detectors/platform/node/machine-id/getMachineId-linux.js
var require_getMachineId_linux = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/detectors/platform/node/machine-id/getMachineId-linux.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getMachineId = void 0;
    var fs_1 = require("fs");
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    async function getMachineId() {
      const paths = ["/etc/machine-id", "/var/lib/dbus/machine-id"];
      for (const path of paths) {
        try {
          const result = await fs_1.promises.readFile(path, { encoding: "utf8" });
          return result.trim();
        } catch (e) {
          api_1.diag.debug(`error reading machine id: ${e}`);
        }
      }
      return void 0;
    }
    exports2.getMachineId = getMachineId;
  }
});

// node_modules/@opentelemetry/resources/build/src/detectors/platform/node/machine-id/getMachineId-bsd.js
var require_getMachineId_bsd = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/detectors/platform/node/machine-id/getMachineId-bsd.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getMachineId = void 0;
    var fs_1 = require("fs");
    var execAsync_1 = require_execAsync();
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    async function getMachineId() {
      try {
        const result = await fs_1.promises.readFile("/etc/hostid", { encoding: "utf8" });
        return result.trim();
      } catch (e) {
        api_1.diag.debug(`error reading machine id: ${e}`);
      }
      try {
        const result = await (0, execAsync_1.execAsync)("kenv -q smbios.system.uuid");
        return result.stdout.trim();
      } catch (e) {
        api_1.diag.debug(`error reading machine id: ${e}`);
      }
      return void 0;
    }
    exports2.getMachineId = getMachineId;
  }
});

// node_modules/@opentelemetry/resources/build/src/detectors/platform/node/machine-id/getMachineId-win.js
var require_getMachineId_win = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/detectors/platform/node/machine-id/getMachineId-win.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getMachineId = void 0;
    var process2 = require("process");
    var execAsync_1 = require_execAsync();
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    async function getMachineId() {
      const args = "QUERY HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Cryptography /v MachineGuid";
      let command = "%windir%\\System32\\REG.exe";
      if (process2.arch === "ia32" && "PROCESSOR_ARCHITEW6432" in process2.env) {
        command = "%windir%\\sysnative\\cmd.exe /c " + command;
      }
      try {
        const result = await (0, execAsync_1.execAsync)(`${command} ${args}`);
        const parts = result.stdout.split("REG_SZ");
        if (parts.length === 2) {
          return parts[1].trim();
        }
      } catch (e) {
        api_1.diag.debug(`error reading machine id: ${e}`);
      }
      return void 0;
    }
    exports2.getMachineId = getMachineId;
  }
});

// node_modules/@opentelemetry/resources/build/src/detectors/platform/node/machine-id/getMachineId-unsupported.js
var require_getMachineId_unsupported = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/detectors/platform/node/machine-id/getMachineId-unsupported.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getMachineId = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    async function getMachineId() {
      api_1.diag.debug("could not read machine-id: unsupported platform");
      return void 0;
    }
    exports2.getMachineId = getMachineId;
  }
});

// node_modules/@opentelemetry/resources/build/src/detectors/platform/node/machine-id/getMachineId.js
var require_getMachineId = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/detectors/platform/node/machine-id/getMachineId.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getMachineId = void 0;
    var process2 = require("process");
    var getMachineIdImpl;
    async function getMachineId() {
      if (!getMachineIdImpl) {
        switch (process2.platform) {
          case "darwin":
            getMachineIdImpl = (await Promise.resolve().then(() => __toESM(require_getMachineId_darwin()))).getMachineId;
            break;
          case "linux":
            getMachineIdImpl = (await Promise.resolve().then(() => __toESM(require_getMachineId_linux()))).getMachineId;
            break;
          case "freebsd":
            getMachineIdImpl = (await Promise.resolve().then(() => __toESM(require_getMachineId_bsd()))).getMachineId;
            break;
          case "win32":
            getMachineIdImpl = (await Promise.resolve().then(() => __toESM(require_getMachineId_win()))).getMachineId;
            break;
          default:
            getMachineIdImpl = (await Promise.resolve().then(() => __toESM(require_getMachineId_unsupported()))).getMachineId;
            break;
        }
      }
      return getMachineIdImpl();
    }
    exports2.getMachineId = getMachineId;
  }
});

// node_modules/@opentelemetry/resources/build/src/detectors/platform/node/utils.js
var require_utils4 = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/detectors/platform/node/utils.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.normalizeType = exports2.normalizeArch = void 0;
    var normalizeArch = (nodeArchString) => {
      switch (nodeArchString) {
        case "arm":
          return "arm32";
        case "ppc":
          return "ppc32";
        case "x64":
          return "amd64";
        default:
          return nodeArchString;
      }
    };
    exports2.normalizeArch = normalizeArch;
    var normalizeType = (nodePlatform) => {
      switch (nodePlatform) {
        case "sunos":
          return "solaris";
        case "win32":
          return "windows";
        default:
          return nodePlatform;
      }
    };
    exports2.normalizeType = normalizeType;
  }
});

// node_modules/@opentelemetry/resources/build/src/detectors/platform/node/HostDetector.js
var require_HostDetector = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/detectors/platform/node/HostDetector.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.hostDetector = void 0;
    var semconv_1 = require_semconv2();
    var os_1 = require("os");
    var getMachineId_1 = require_getMachineId();
    var utils_1 = require_utils4();
    var HostDetector = class {
      detect(_config) {
        const attributes = {
          [semconv_1.ATTR_HOST_NAME]: (0, os_1.hostname)(),
          [semconv_1.ATTR_HOST_ARCH]: (0, utils_1.normalizeArch)((0, os_1.arch)()),
          [semconv_1.ATTR_HOST_ID]: (0, getMachineId_1.getMachineId)()
        };
        return { attributes };
      }
    };
    exports2.hostDetector = new HostDetector();
  }
});

// node_modules/@opentelemetry/resources/build/src/detectors/platform/node/OSDetector.js
var require_OSDetector = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/detectors/platform/node/OSDetector.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.osDetector = void 0;
    var semconv_1 = require_semconv2();
    var os_1 = require("os");
    var utils_1 = require_utils4();
    var OSDetector = class {
      detect(_config) {
        const attributes = {
          [semconv_1.ATTR_OS_TYPE]: (0, utils_1.normalizeType)((0, os_1.platform)()),
          [semconv_1.ATTR_OS_VERSION]: (0, os_1.release)()
        };
        return { attributes };
      }
    };
    exports2.osDetector = new OSDetector();
  }
});

// node_modules/@opentelemetry/resources/build/src/detectors/platform/node/ProcessDetector.js
var require_ProcessDetector = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/detectors/platform/node/ProcessDetector.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.processDetector = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var semconv_1 = require_semconv2();
    var os = require("os");
    var ProcessDetector = class {
      detect(_config) {
        const attributes = {
          [semconv_1.ATTR_PROCESS_PID]: process.pid,
          [semconv_1.ATTR_PROCESS_EXECUTABLE_NAME]: process.title,
          [semconv_1.ATTR_PROCESS_EXECUTABLE_PATH]: process.execPath,
          [semconv_1.ATTR_PROCESS_COMMAND_ARGS]: [
            process.argv[0],
            ...process.execArgv,
            ...process.argv.slice(1)
          ],
          [semconv_1.ATTR_PROCESS_RUNTIME_VERSION]: process.versions.node,
          [semconv_1.ATTR_PROCESS_RUNTIME_NAME]: "nodejs",
          [semconv_1.ATTR_PROCESS_RUNTIME_DESCRIPTION]: "Node.js"
        };
        if (process.argv.length > 1) {
          attributes[semconv_1.ATTR_PROCESS_COMMAND] = process.argv[1];
        }
        try {
          const userInfo = os.userInfo();
          attributes[semconv_1.ATTR_PROCESS_OWNER] = userInfo.username;
        } catch (e) {
          api_1.diag.debug(`error obtaining process owner: ${e}`);
        }
        return { attributes };
      }
    };
    exports2.processDetector = new ProcessDetector();
  }
});

// node_modules/@opentelemetry/resources/build/src/detectors/platform/node/ServiceInstanceIdDetector.js
var require_ServiceInstanceIdDetector = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/detectors/platform/node/ServiceInstanceIdDetector.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.serviceInstanceIdDetector = void 0;
    var semconv_1 = require_semconv2();
    var crypto_1 = require("crypto");
    var ServiceInstanceIdDetector = class {
      // Multiple calls to ServiceInstanceIdDetector return the same ID.
      _serviceInstanceId;
      detect(_config) {
        if (!this._serviceInstanceId) {
          this._serviceInstanceId = (0, crypto_1.randomUUID)();
        }
        return {
          attributes: {
            [semconv_1.ATTR_SERVICE_INSTANCE_ID]: this._serviceInstanceId
          }
        };
      }
    };
    exports2.serviceInstanceIdDetector = new ServiceInstanceIdDetector();
  }
});

// node_modules/@opentelemetry/resources/build/src/detectors/platform/node/index.js
var require_node2 = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/detectors/platform/node/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.serviceInstanceIdDetector = exports2.processDetector = exports2.osDetector = exports2.hostDetector = void 0;
    var HostDetector_1 = require_HostDetector();
    Object.defineProperty(exports2, "hostDetector", { enumerable: true, get: function() {
      return HostDetector_1.hostDetector;
    } });
    var OSDetector_1 = require_OSDetector();
    Object.defineProperty(exports2, "osDetector", { enumerable: true, get: function() {
      return OSDetector_1.osDetector;
    } });
    var ProcessDetector_1 = require_ProcessDetector();
    Object.defineProperty(exports2, "processDetector", { enumerable: true, get: function() {
      return ProcessDetector_1.processDetector;
    } });
    var ServiceInstanceIdDetector_1 = require_ServiceInstanceIdDetector();
    Object.defineProperty(exports2, "serviceInstanceIdDetector", { enumerable: true, get: function() {
      return ServiceInstanceIdDetector_1.serviceInstanceIdDetector;
    } });
  }
});

// node_modules/@opentelemetry/resources/build/src/detectors/platform/index.js
var require_platform2 = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/detectors/platform/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.serviceInstanceIdDetector = exports2.processDetector = exports2.osDetector = exports2.hostDetector = void 0;
    var node_1 = require_node2();
    Object.defineProperty(exports2, "hostDetector", { enumerable: true, get: function() {
      return node_1.hostDetector;
    } });
    Object.defineProperty(exports2, "osDetector", { enumerable: true, get: function() {
      return node_1.osDetector;
    } });
    Object.defineProperty(exports2, "processDetector", { enumerable: true, get: function() {
      return node_1.processDetector;
    } });
    Object.defineProperty(exports2, "serviceInstanceIdDetector", { enumerable: true, get: function() {
      return node_1.serviceInstanceIdDetector;
    } });
  }
});

// node_modules/@opentelemetry/resources/build/src/detectors/NoopDetector.js
var require_NoopDetector = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/detectors/NoopDetector.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.noopDetector = exports2.NoopDetector = void 0;
    var NoopDetector = class {
      detect() {
        return {
          attributes: {}
        };
      }
    };
    exports2.NoopDetector = NoopDetector;
    exports2.noopDetector = new NoopDetector();
  }
});

// node_modules/@opentelemetry/resources/build/src/detectors/index.js
var require_detectors = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/detectors/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.noopDetector = exports2.serviceInstanceIdDetector = exports2.processDetector = exports2.osDetector = exports2.hostDetector = exports2.envDetector = void 0;
    var EnvDetector_1 = require_EnvDetector();
    Object.defineProperty(exports2, "envDetector", { enumerable: true, get: function() {
      return EnvDetector_1.envDetector;
    } });
    var platform_1 = require_platform2();
    Object.defineProperty(exports2, "hostDetector", { enumerable: true, get: function() {
      return platform_1.hostDetector;
    } });
    Object.defineProperty(exports2, "osDetector", { enumerable: true, get: function() {
      return platform_1.osDetector;
    } });
    Object.defineProperty(exports2, "processDetector", { enumerable: true, get: function() {
      return platform_1.processDetector;
    } });
    Object.defineProperty(exports2, "serviceInstanceIdDetector", { enumerable: true, get: function() {
      return platform_1.serviceInstanceIdDetector;
    } });
    var NoopDetector_1 = require_NoopDetector();
    Object.defineProperty(exports2, "noopDetector", { enumerable: true, get: function() {
      return NoopDetector_1.noopDetector;
    } });
  }
});

// node_modules/@opentelemetry/resources/build/src/index.js
var require_src3 = __commonJS({
  "node_modules/@opentelemetry/resources/build/src/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.defaultServiceName = exports2.emptyResource = exports2.defaultResource = exports2.resourceFromAttributes = exports2.serviceInstanceIdDetector = exports2.processDetector = exports2.osDetector = exports2.hostDetector = exports2.envDetector = exports2.detectResources = void 0;
    var detect_resources_1 = require_detect_resources();
    Object.defineProperty(exports2, "detectResources", { enumerable: true, get: function() {
      return detect_resources_1.detectResources;
    } });
    var detectors_1 = require_detectors();
    Object.defineProperty(exports2, "envDetector", { enumerable: true, get: function() {
      return detectors_1.envDetector;
    } });
    Object.defineProperty(exports2, "hostDetector", { enumerable: true, get: function() {
      return detectors_1.hostDetector;
    } });
    Object.defineProperty(exports2, "osDetector", { enumerable: true, get: function() {
      return detectors_1.osDetector;
    } });
    Object.defineProperty(exports2, "processDetector", { enumerable: true, get: function() {
      return detectors_1.processDetector;
    } });
    Object.defineProperty(exports2, "serviceInstanceIdDetector", { enumerable: true, get: function() {
      return detectors_1.serviceInstanceIdDetector;
    } });
    var ResourceImpl_1 = require_ResourceImpl();
    Object.defineProperty(exports2, "resourceFromAttributes", { enumerable: true, get: function() {
      return ResourceImpl_1.resourceFromAttributes;
    } });
    Object.defineProperty(exports2, "defaultResource", { enumerable: true, get: function() {
      return ResourceImpl_1.defaultResource;
    } });
    Object.defineProperty(exports2, "emptyResource", { enumerable: true, get: function() {
      return ResourceImpl_1.emptyResource;
    } });
    var default_service_name_1 = require_default_service_name();
    Object.defineProperty(exports2, "defaultServiceName", { enumerable: true, get: function() {
      return default_service_name_1.defaultServiceName;
    } });
  }
});

// node_modules/@opentelemetry/sdk-trace/build/src/enums.js
var require_enums = __commonJS({
  "node_modules/@opentelemetry/sdk-trace/build/src/enums.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ExceptionEventName = void 0;
    exports2.ExceptionEventName = "exception";
  }
});

// node_modules/@opentelemetry/sdk-trace/build/src/inspect.js
var require_inspect = __commonJS({
  "node_modules/@opentelemetry/sdk-trace/build/src/inspect.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.formatInspect = exports2.settledResourceAttributes = exports2.inspectCustom = void 0;
    exports2.inspectCustom = /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom");
    function settledResourceAttributes(resource) {
      const attrs = {};
      for (const [k, v] of resource.getRawAttributes()) {
        if (typeof v?.then === "function") {
          continue;
        }
        if (v != null) {
          attrs[k] ??= v;
        }
      }
      return attrs;
    }
    exports2.settledResourceAttributes = settledResourceAttributes;
    function formatInspect(className, payload, depth, options, inspect) {
      if (typeof depth === "number" && depth < 0) {
        const tag = `[${className}]`;
        return options?.stylize ? options.stylize(tag, "special") : tag;
      }
      if (typeof inspect !== "function" || !options) {
        return payload;
      }
      const childOptions = {
        ...options,
        depth: options.depth == null ? options.depth : options.depth - 1
      };
      return `${className} ${inspect(payload, childOptions)}`;
    }
    exports2.formatInspect = formatInspect;
  }
});

// node_modules/@opentelemetry/sdk-trace/build/src/Span.js
var require_Span = __commonJS({
  "node_modules/@opentelemetry/sdk-trace/build/src/Span.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SpanImpl = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var core_1 = require_src2();
    var semantic_conventions_1 = require_dist();
    var enums_1 = require_enums();
    var inspect_1 = require_inspect();
    var SpanImpl = class {
      // Below properties are included to implement ReadableSpan for export
      // purposes but are not intended to be written-to directly.
      _spanContext;
      kind;
      parentSpanContext;
      attributes = {};
      links = [];
      events = [];
      startTime;
      resource;
      instrumentationScope;
      _droppedAttributesCount = 0;
      _droppedEventsCount = 0;
      _droppedLinksCount = 0;
      _attributesCount = 0;
      name;
      status = {
        code: api_1.SpanStatusCode.UNSET
      };
      endTime = [0, 0];
      _ended = false;
      _duration = [-1, -1];
      _spanProcessor;
      _spanLimits;
      _attributeValueLengthLimit;
      _recordEndMetrics;
      _performanceStartTime;
      _performanceOffset;
      _startTimeProvided;
      /**
       * Constructs a new SpanImpl instance.
       */
      constructor(opts) {
        const now = Date.now();
        this._spanContext = opts.spanContext;
        this._performanceStartTime = core_1.otperformance.now();
        this._performanceOffset = now - (this._performanceStartTime + core_1.otperformance.timeOrigin);
        this._startTimeProvided = opts.startTime != null;
        this._spanLimits = opts.spanLimits;
        this._attributeValueLengthLimit = this._spanLimits.attributeValueLengthLimit ?? 0;
        this._spanProcessor = opts.spanProcessor;
        this.name = opts.name;
        this.parentSpanContext = opts.parentSpanContext;
        this.kind = opts.kind;
        if (opts.links) {
          for (const link of opts.links) {
            this.addLink(link);
          }
        }
        this.startTime = this._getTime(opts.startTime ?? now);
        this.resource = opts.resource;
        this.instrumentationScope = opts.scope;
        this._recordEndMetrics = opts.recordEndMetrics;
        if (opts.attributes != null) {
          this.setAttributes(opts.attributes);
        }
        this._spanProcessor.onStart(this, opts.context);
      }
      spanContext() {
        return this._spanContext;
      }
      setAttribute(key, value) {
        if (value == null || this._isSpanEnded())
          return this;
        if (key.length === 0) {
          api_1.diag.warn(`Invalid attribute key: ${key}`);
          return this;
        }
        if (!(0, core_1.isAttributeValue)(value)) {
          api_1.diag.warn(`Invalid attribute value set for key: ${key}`);
          return this;
        }
        const { attributeCountLimit } = this._spanLimits;
        const isNewKey = !Object.prototype.hasOwnProperty.call(this.attributes, key);
        if (attributeCountLimit !== void 0 && this._attributesCount >= attributeCountLimit && isNewKey) {
          this._droppedAttributesCount++;
          return this;
        }
        this.attributes[key] = this._truncateToSize(value);
        if (isNewKey) {
          this._attributesCount++;
        }
        return this;
      }
      setAttributes(attributes) {
        for (const key in attributes) {
          if (Object.prototype.hasOwnProperty.call(attributes, key)) {
            this.setAttribute(key, attributes[key]);
          }
        }
        return this;
      }
      /**
       *
       * @param name Span Name
       * @param [attributesOrStartTime] Span attributes or start time
       *     if type is {@type TimeInput} and 3rd param is undefined
       * @param [timeStamp] Specified time stamp for the event
       */
      addEvent(name, attributesOrStartTime, timeStamp) {
        if (this._isSpanEnded())
          return this;
        const { eventCountLimit } = this._spanLimits;
        if (eventCountLimit === 0) {
          api_1.diag.warn("No events allowed.");
          this._droppedEventsCount++;
          return this;
        }
        if (eventCountLimit !== void 0 && this.events.length >= eventCountLimit) {
          if (this._droppedEventsCount === 0) {
            api_1.diag.debug("Dropping extra events.");
          }
          this.events.shift();
          this._droppedEventsCount++;
        }
        if ((0, core_1.isTimeInput)(attributesOrStartTime)) {
          if (!(0, core_1.isTimeInput)(timeStamp)) {
            timeStamp = attributesOrStartTime;
          }
          attributesOrStartTime = void 0;
        }
        const sanitized = (0, core_1.sanitizeAttributes)(attributesOrStartTime);
        const { attributePerEventCountLimit } = this._spanLimits;
        const attributes = {};
        let droppedAttributesCount = 0;
        let eventAttributesCount = 0;
        for (const attr in sanitized) {
          if (!Object.prototype.hasOwnProperty.call(sanitized, attr)) {
            continue;
          }
          const attrVal = sanitized[attr];
          if (attributePerEventCountLimit !== void 0 && eventAttributesCount >= attributePerEventCountLimit) {
            droppedAttributesCount++;
            continue;
          }
          attributes[attr] = this._truncateToSize(attrVal);
          eventAttributesCount++;
        }
        this.events.push({
          name,
          attributes,
          time: this._getTime(timeStamp),
          droppedAttributesCount
        });
        return this;
      }
      addLink(link) {
        if (this._isSpanEnded())
          return this;
        const { linkCountLimit } = this._spanLimits;
        if (linkCountLimit === 0) {
          this._droppedLinksCount++;
          return this;
        }
        if (linkCountLimit !== void 0 && this.links.length >= linkCountLimit) {
          if (this._droppedLinksCount === 0) {
            api_1.diag.debug("Dropping extra links.");
          }
          this.links.shift();
          this._droppedLinksCount++;
        }
        const { attributePerLinkCountLimit } = this._spanLimits;
        const sanitized = (0, core_1.sanitizeAttributes)(link.attributes);
        const attributes = {};
        let droppedAttributesCount = 0;
        let linkAttributesCount = 0;
        for (const attr in sanitized) {
          if (!Object.prototype.hasOwnProperty.call(sanitized, attr)) {
            continue;
          }
          const attrVal = sanitized[attr];
          if (attributePerLinkCountLimit !== void 0 && linkAttributesCount >= attributePerLinkCountLimit) {
            droppedAttributesCount++;
            continue;
          }
          attributes[attr] = this._truncateToSize(attrVal);
          linkAttributesCount++;
        }
        const processedLink = { context: link.context };
        if (linkAttributesCount > 0) {
          processedLink.attributes = attributes;
        }
        if (droppedAttributesCount > 0) {
          processedLink.droppedAttributesCount = droppedAttributesCount;
        }
        this.links.push(processedLink);
        return this;
      }
      addLinks(links) {
        for (const link of links) {
          this.addLink(link);
        }
        return this;
      }
      setStatus(status) {
        if (this._isSpanEnded())
          return this;
        if (status.code === api_1.SpanStatusCode.UNSET)
          return this;
        if (this.status.code === api_1.SpanStatusCode.OK)
          return this;
        const newStatus = { code: status.code };
        if (status.code === api_1.SpanStatusCode.ERROR) {
          if (typeof status.message === "string") {
            newStatus.message = status.message;
          } else if (status.message != null) {
            api_1.diag.warn(`Dropping invalid status.message of type '${typeof status.message}', expected 'string'`);
          }
        }
        this.status = newStatus;
        return this;
      }
      updateName(name) {
        if (this._isSpanEnded())
          return this;
        this.name = name;
        return this;
      }
      end(endTime) {
        if (this._isSpanEnded()) {
          api_1.diag.error(`${this.name} ${this._spanContext.traceId}-${this._spanContext.spanId} - You can only call end() on a span once.`);
          return;
        }
        this.endTime = this._getTime(endTime);
        this._duration = (0, core_1.hrTimeDuration)(this.startTime, this.endTime);
        if (this._duration[0] < 0) {
          api_1.diag.warn("Inconsistent start and end time, startTime > endTime. Setting span duration to 0ms.", this.startTime, this.endTime);
          this.endTime = this.startTime.slice();
          this._duration = [0, 0];
        }
        if (this._droppedEventsCount > 0) {
          api_1.diag.warn(`Dropped ${this._droppedEventsCount} events because eventCountLimit reached`);
        }
        if (this._droppedLinksCount > 0) {
          api_1.diag.warn(`Dropped ${this._droppedLinksCount} links because linkCountLimit reached`);
        }
        if (this._spanProcessor.onEnding) {
          this._spanProcessor.onEnding(this);
        }
        this._recordEndMetrics?.();
        this._ended = true;
        this._spanProcessor.onEnd(this);
      }
      _getTime(inp) {
        if (typeof inp === "number" && inp <= core_1.otperformance.now()) {
          return (0, core_1.hrTime)(inp + this._performanceOffset);
        }
        if (typeof inp === "number") {
          return (0, core_1.millisToHrTime)(inp);
        }
        if (inp instanceof Date) {
          return (0, core_1.millisToHrTime)(inp.getTime());
        }
        if ((0, core_1.isTimeInputHrTime)(inp)) {
          return inp;
        }
        if (this._startTimeProvided) {
          return (0, core_1.millisToHrTime)(Date.now());
        }
        const msDuration = core_1.otperformance.now() - this._performanceStartTime;
        return (0, core_1.addHrTimes)(this.startTime, (0, core_1.millisToHrTime)(msDuration));
      }
      isRecording() {
        return this._ended === false;
      }
      recordException(exception, time) {
        const attributes = {};
        if (typeof exception === "string") {
          attributes[semantic_conventions_1.ATTR_EXCEPTION_MESSAGE] = exception;
        } else if (exception) {
          if (exception.code) {
            attributes[semantic_conventions_1.ATTR_EXCEPTION_TYPE] = exception.code.toString();
          } else if (exception.name) {
            attributes[semantic_conventions_1.ATTR_EXCEPTION_TYPE] = exception.name;
          }
          if (exception.message) {
            attributes[semantic_conventions_1.ATTR_EXCEPTION_MESSAGE] = exception.message;
          }
          if (exception.stack) {
            attributes[semantic_conventions_1.ATTR_EXCEPTION_STACKTRACE] = exception.stack;
          }
        }
        if (attributes[semantic_conventions_1.ATTR_EXCEPTION_TYPE] || attributes[semantic_conventions_1.ATTR_EXCEPTION_MESSAGE]) {
          this.addEvent(enums_1.ExceptionEventName, attributes, time);
        } else {
          api_1.diag.warn(`Failed to record an exception ${exception}`);
        }
      }
      get duration() {
        return this._duration;
      }
      get ended() {
        return this._ended;
      }
      get droppedAttributesCount() {
        return this._droppedAttributesCount;
      }
      get droppedEventsCount() {
        return this._droppedEventsCount;
      }
      get droppedLinksCount() {
        return this._droppedLinksCount;
      }
      _isSpanEnded() {
        if (this._ended) {
          const error = new Error(`Operation attempted on ended Span {traceId: ${this._spanContext.traceId}, spanId: ${this._spanContext.spanId}}`);
          api_1.diag.warn(`Cannot execute the operation on ended Span {traceId: ${this._spanContext.traceId}, spanId: ${this._spanContext.spanId}}`, error);
        }
        return this._ended;
      }
      // Utility function to truncate given value within size
      // for value type of string, will truncate to given limit
      // for type of non-string, will return same value
      _truncateToLimitUtil(value, limit) {
        if (value.length <= limit) {
          return value;
        }
        return value.substring(0, limit);
      }
      /**
       * If the given attribute value is of type string and has more characters than given {@code attributeValueLengthLimit} then
       * return string with truncated to {@code attributeValueLengthLimit} characters
       *
       * If the given attribute value is array of strings then
       * return new array of strings with each element truncated to {@code attributeValueLengthLimit} characters
       *
       * Otherwise return same Attribute {@code value}
       *
       * @param value Attribute value
       * @returns truncated attribute value if required, otherwise same value
       */
      _truncateToSize(value) {
        const limit = this._attributeValueLengthLimit;
        if (limit <= 0) {
          api_1.diag.warn(`Attribute value limit must be positive, got ${limit}`);
          return value;
        }
        if (typeof value === "string") {
          return this._truncateToLimitUtil(value, limit);
        }
        if (Array.isArray(value)) {
          return value.map((val) => typeof val === "string" ? this._truncateToLimitUtil(val, limit) : val);
        }
        return value;
      }
      [inspect_1.inspectCustom](depth, options, inspect) {
        const payload = {
          name: this.name,
          kind: this.kind,
          spanContext: this._spanContext,
          parentSpanContext: this.parentSpanContext,
          status: this.status,
          startTime: this.startTime,
          endTime: this.endTime,
          duration: this._duration,
          ended: this._ended,
          attributes: this.attributes,
          events: this.events,
          links: this.links,
          droppedAttributesCount: this._droppedAttributesCount,
          droppedEventsCount: this._droppedEventsCount,
          droppedLinksCount: this._droppedLinksCount,
          instrumentationScope: this.instrumentationScope,
          resource: { attributes: (0, inspect_1.settledResourceAttributes)(this.resource) }
        };
        return (0, inspect_1.formatInspect)("SpanImpl", payload, depth, options, inspect);
      }
    };
    exports2.SpanImpl = SpanImpl;
  }
});

// node_modules/@opentelemetry/sdk-trace/build/src/Sampler.js
var require_Sampler = __commonJS({
  "node_modules/@opentelemetry/sdk-trace/build/src/Sampler.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SamplingDecision = void 0;
    var SamplingDecision2;
    (function(SamplingDecision3) {
      SamplingDecision3[SamplingDecision3["NOT_RECORD"] = 0] = "NOT_RECORD";
      SamplingDecision3[SamplingDecision3["RECORD"] = 1] = "RECORD";
      SamplingDecision3[SamplingDecision3["RECORD_AND_SAMPLED"] = 2] = "RECORD_AND_SAMPLED";
    })(SamplingDecision2 || (exports2.SamplingDecision = SamplingDecision2 = {}));
  }
});

// node_modules/@opentelemetry/sdk-trace/build/src/semconv.js
var require_semconv3 = __commonJS({
  "node_modules/@opentelemetry/sdk-trace/build/src/semconv.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.OTEL_COMPONENT_TYPE_VALUE_SIMPLE_SPAN_PROCESSOR = exports2.OTEL_COMPONENT_TYPE_VALUE_BATCHING_SPAN_PROCESSOR = exports2.METRIC_OTEL_SDK_SPAN_STARTED = exports2.METRIC_OTEL_SDK_SPAN_LIVE = exports2.METRIC_OTEL_SDK_PROCESSOR_SPAN_QUEUE_SIZE = exports2.METRIC_OTEL_SDK_PROCESSOR_SPAN_QUEUE_CAPACITY = exports2.METRIC_OTEL_SDK_PROCESSOR_SPAN_PROCESSED = exports2.ATTR_OTEL_SPAN_SAMPLING_RESULT = exports2.ATTR_OTEL_SPAN_PARENT_ORIGIN = exports2.ATTR_OTEL_COMPONENT_TYPE = exports2.ATTR_OTEL_COMPONENT_NAME = void 0;
    exports2.ATTR_OTEL_COMPONENT_NAME = "otel.component.name";
    exports2.ATTR_OTEL_COMPONENT_TYPE = "otel.component.type";
    exports2.ATTR_OTEL_SPAN_PARENT_ORIGIN = "otel.span.parent.origin";
    exports2.ATTR_OTEL_SPAN_SAMPLING_RESULT = "otel.span.sampling_result";
    exports2.METRIC_OTEL_SDK_PROCESSOR_SPAN_PROCESSED = "otel.sdk.processor.span.processed";
    exports2.METRIC_OTEL_SDK_PROCESSOR_SPAN_QUEUE_CAPACITY = "otel.sdk.processor.span.queue.capacity";
    exports2.METRIC_OTEL_SDK_PROCESSOR_SPAN_QUEUE_SIZE = "otel.sdk.processor.span.queue.size";
    exports2.METRIC_OTEL_SDK_SPAN_LIVE = "otel.sdk.span.live";
    exports2.METRIC_OTEL_SDK_SPAN_STARTED = "otel.sdk.span.started";
    exports2.OTEL_COMPONENT_TYPE_VALUE_BATCHING_SPAN_PROCESSOR = "batching_span_processor";
    exports2.OTEL_COMPONENT_TYPE_VALUE_SIMPLE_SPAN_PROCESSOR = "simple_span_processor";
  }
});

// node_modules/@opentelemetry/sdk-trace/build/src/TracerMetrics.js
var require_TracerMetrics = __commonJS({
  "node_modules/@opentelemetry/sdk-trace/build/src/TracerMetrics.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TracerMetrics = void 0;
    var Sampler_1 = require_Sampler();
    var semconv_1 = require_semconv3();
    var TracerMetrics = class {
      startedSpans;
      liveSpans;
      constructor(meter) {
        this.startedSpans = meter.createCounter(semconv_1.METRIC_OTEL_SDK_SPAN_STARTED, {
          unit: "{span}",
          description: "The number of created spans."
        });
        this.liveSpans = meter.createUpDownCounter(semconv_1.METRIC_OTEL_SDK_SPAN_LIVE, {
          unit: "{span}",
          description: "The number of currently live spans."
        });
      }
      startSpan(parentSpanCtx, samplingDecision) {
        const samplingDecisionStr = samplingDecisionToString(samplingDecision);
        this.startedSpans.add(1, {
          [semconv_1.ATTR_OTEL_SPAN_PARENT_ORIGIN]: parentOrigin(parentSpanCtx),
          [semconv_1.ATTR_OTEL_SPAN_SAMPLING_RESULT]: samplingDecisionStr
        });
        if (samplingDecision === Sampler_1.SamplingDecision.NOT_RECORD) {
          return () => {
          };
        }
        const liveSpanAttributes = {
          [semconv_1.ATTR_OTEL_SPAN_SAMPLING_RESULT]: samplingDecisionStr
        };
        this.liveSpans.add(1, liveSpanAttributes);
        return () => {
          this.liveSpans.add(-1, liveSpanAttributes);
        };
      }
    };
    exports2.TracerMetrics = TracerMetrics;
    function parentOrigin(parentSpanContext) {
      if (!parentSpanContext) {
        return "none";
      }
      if (parentSpanContext.isRemote) {
        return "remote";
      }
      return "local";
    }
    function samplingDecisionToString(decision) {
      switch (decision) {
        case Sampler_1.SamplingDecision.RECORD_AND_SAMPLED:
          return "RECORD_AND_SAMPLE";
        case Sampler_1.SamplingDecision.RECORD:
          return "RECORD_ONLY";
        case Sampler_1.SamplingDecision.NOT_RECORD:
          return "DROP";
      }
    }
  }
});

// node_modules/@opentelemetry/sdk-trace/build/src/version.js
var require_version2 = __commonJS({
  "node_modules/@opentelemetry/sdk-trace/build/src/version.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.VERSION = void 0;
    exports2.VERSION = "2.12.0";
  }
});

// node_modules/@opentelemetry/sdk-trace/build/src/Tracer.js
var require_Tracer = __commonJS({
  "node_modules/@opentelemetry/sdk-trace/build/src/Tracer.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Tracer = void 0;
    var api = (init_esm(), __toCommonJS(esm_exports));
    var core_1 = require_src2();
    var Span_1 = require_Span();
    var TracerMetrics_1 = require_TracerMetrics();
    var version_1 = require_version2();
    var inspect_1 = require_inspect();
    var Tracer = class {
      _sampler;
      _spanLimits;
      _idGenerator;
      instrumentationScope;
      _resource;
      _spanProcessor;
      _tracerMetrics;
      /**
       * Constructs a new Tracer instance.
       */
      constructor(instrumentationScope, options) {
        this.instrumentationScope = instrumentationScope;
        this._sampler = options.sampler;
        this._spanLimits = options.spanLimits;
        this._resource = options.resource;
        this._idGenerator = options.idGenerator;
        this._spanProcessor = options.spanProcessor;
        const meter = options.meterProvider.getMeter("@opentelemetry/sdk-trace", version_1.VERSION);
        this._tracerMetrics = new TracerMetrics_1.TracerMetrics(meter);
      }
      /**
       * Starts a new Span or returns the default NoopSpan based on the sampling
       * decision.
       */
      startSpan(name, options = {}, context2 = api.context.active()) {
        if (options.root) {
          context2 = api.trace.deleteSpan(context2);
        }
        const parentSpan = api.trace.getSpan(context2);
        if ((0, core_1.isTracingSuppressed)(context2)) {
          api.diag.debug("Instrumentation suppressed, returning Noop Span");
          const nonRecordingSpan = api.trace.wrapSpanContext(api.INVALID_SPAN_CONTEXT);
          return nonRecordingSpan;
        }
        const parentSpanContext = parentSpan?.spanContext();
        const spanId = this._idGenerator.generateSpanId();
        let validParentSpanContext;
        let traceId;
        let traceState;
        if (!parentSpanContext || !api.trace.isSpanContextValid(parentSpanContext)) {
          traceId = this._idGenerator.generateTraceId();
        } else {
          traceId = parentSpanContext.traceId;
          traceState = parentSpanContext.traceState;
          validParentSpanContext = parentSpanContext;
        }
        const spanKind = options.kind ?? api.SpanKind.INTERNAL;
        const links = (options.links ?? []).map((link) => {
          return {
            context: link.context,
            attributes: (0, core_1.sanitizeAttributes)(link.attributes)
          };
        });
        const attributes = (0, core_1.sanitizeAttributes)(options.attributes);
        const samplingResult = this._sampler.shouldSample(context2, traceId, name, spanKind, attributes, links);
        const recordEndMetrics = this._tracerMetrics.startSpan(parentSpanContext, samplingResult.decision);
        traceState = samplingResult.traceState ?? traceState;
        const traceFlags = samplingResult.decision === api.SamplingDecision.RECORD_AND_SAMPLED ? api.TraceFlags.SAMPLED : api.TraceFlags.NONE;
        const spanContext = { traceId, spanId, traceFlags, traceState };
        if (samplingResult.decision === api.SamplingDecision.NOT_RECORD) {
          api.diag.debug("Recording is off, propagating context in a non-recording span");
          const nonRecordingSpan = api.trace.wrapSpanContext(spanContext);
          return nonRecordingSpan;
        }
        const initAttributes = (0, core_1.sanitizeAttributes)(Object.assign(attributes, samplingResult.attributes));
        const span = new Span_1.SpanImpl({
          resource: this._resource,
          scope: this.instrumentationScope,
          context: context2,
          spanContext,
          name,
          kind: spanKind,
          links,
          parentSpanContext: validParentSpanContext,
          attributes: initAttributes,
          startTime: options.startTime,
          spanProcessor: this._spanProcessor,
          spanLimits: this._spanLimits,
          recordEndMetrics
        });
        return span;
      }
      startActiveSpan(name, arg2, arg3, arg4) {
        let opts;
        let ctx;
        let fn;
        if (arguments.length < 2) {
          return;
        } else if (arguments.length === 2) {
          fn = arg2;
        } else if (arguments.length === 3) {
          opts = arg2;
          fn = arg3;
        } else {
          opts = arg2;
          ctx = arg3;
          fn = arg4;
        }
        const parentContext = ctx ?? api.context.active();
        const span = this.startSpan(name, opts, parentContext);
        const contextWithSpanSet = api.trace.setSpan(parentContext, span);
        return api.context.with(contextWithSpanSet, fn, void 0, span);
      }
      [inspect_1.inspectCustom](depth, options, inspect) {
        const payload = {
          instrumentationScope: this.instrumentationScope,
          resource: { attributes: (0, inspect_1.settledResourceAttributes)(this._resource) },
          spanLimits: this._spanLimits
        };
        return (0, inspect_1.formatInspect)("Tracer", payload, depth, options, inspect);
      }
    };
    exports2.Tracer = Tracer;
  }
});

// node_modules/@opentelemetry/sdk-trace/build/src/MultiSpanProcessor.js
var require_MultiSpanProcessor = __commonJS({
  "node_modules/@opentelemetry/sdk-trace/build/src/MultiSpanProcessor.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.MultiSpanProcessor = void 0;
    var core_1 = require_src2();
    var MultiSpanProcessor = class {
      _spanProcessors;
      constructor(spanProcessors) {
        this._spanProcessors = spanProcessors;
      }
      forceFlush() {
        const promises = [];
        for (const spanProcessor of this._spanProcessors) {
          promises.push(spanProcessor.forceFlush());
        }
        return new Promise((resolve) => {
          Promise.all(promises).then(() => {
            resolve();
          }).catch((error) => {
            (0, core_1.globalErrorHandler)(error || new Error("MultiSpanProcessor: forceFlush failed"));
            resolve();
          });
        });
      }
      onStart(span, context2) {
        for (const spanProcessor of this._spanProcessors) {
          spanProcessor.onStart(span, context2);
        }
      }
      onEnding(span) {
        for (const spanProcessor of this._spanProcessors) {
          if (spanProcessor.onEnding) {
            spanProcessor.onEnding(span);
          }
        }
      }
      onEnd(span) {
        for (const spanProcessor of this._spanProcessors) {
          spanProcessor.onEnd(span);
        }
      }
      shutdown() {
        const promises = [];
        for (const spanProcessor of this._spanProcessors) {
          promises.push(spanProcessor.shutdown());
        }
        return new Promise((resolve, reject) => {
          Promise.all(promises).then(() => {
            resolve();
          }, reject);
        });
      }
    };
    exports2.MultiSpanProcessor = MultiSpanProcessor;
  }
});

// node_modules/@opentelemetry/sdk-trace/build/src/sampler/AlwaysOffSampler.js
var require_AlwaysOffSampler = __commonJS({
  "node_modules/@opentelemetry/sdk-trace/build/src/sampler/AlwaysOffSampler.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.AlwaysOffSampler = void 0;
    var Sampler_1 = require_Sampler();
    var AlwaysOffSampler = class {
      shouldSample() {
        return {
          decision: Sampler_1.SamplingDecision.NOT_RECORD
        };
      }
      toString() {
        return "AlwaysOffSampler";
      }
    };
    exports2.AlwaysOffSampler = AlwaysOffSampler;
  }
});

// node_modules/@opentelemetry/sdk-trace/build/src/sampler/AlwaysOnSampler.js
var require_AlwaysOnSampler = __commonJS({
  "node_modules/@opentelemetry/sdk-trace/build/src/sampler/AlwaysOnSampler.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.AlwaysOnSampler = void 0;
    var Sampler_1 = require_Sampler();
    var AlwaysOnSampler = class {
      shouldSample() {
        return {
          decision: Sampler_1.SamplingDecision.RECORD_AND_SAMPLED
        };
      }
      toString() {
        return "AlwaysOnSampler";
      }
    };
    exports2.AlwaysOnSampler = AlwaysOnSampler;
  }
});

// node_modules/@opentelemetry/sdk-trace/build/src/sampler/ParentBasedSampler.js
var require_ParentBasedSampler = __commonJS({
  "node_modules/@opentelemetry/sdk-trace/build/src/sampler/ParentBasedSampler.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ParentBasedSampler = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var core_1 = require_src2();
    var AlwaysOffSampler_1 = require_AlwaysOffSampler();
    var AlwaysOnSampler_1 = require_AlwaysOnSampler();
    var ParentBasedSampler2 = class {
      _root;
      _remoteParentSampled;
      _remoteParentNotSampled;
      _localParentSampled;
      _localParentNotSampled;
      constructor(config) {
        this._root = config.root;
        if (!this._root) {
          (0, core_1.globalErrorHandler)(new Error("ParentBasedSampler must have a root sampler configured"));
          this._root = new AlwaysOnSampler_1.AlwaysOnSampler();
        }
        this._remoteParentSampled = config.remoteParentSampled ?? new AlwaysOnSampler_1.AlwaysOnSampler();
        this._remoteParentNotSampled = config.remoteParentNotSampled ?? new AlwaysOffSampler_1.AlwaysOffSampler();
        this._localParentSampled = config.localParentSampled ?? new AlwaysOnSampler_1.AlwaysOnSampler();
        this._localParentNotSampled = config.localParentNotSampled ?? new AlwaysOffSampler_1.AlwaysOffSampler();
      }
      shouldSample(context2, traceId, spanName, spanKind, attributes, links) {
        const parentContext = api_1.trace.getSpanContext(context2);
        if (!parentContext || !(0, api_1.isSpanContextValid)(parentContext)) {
          return this._root.shouldSample(context2, traceId, spanName, spanKind, attributes, links);
        }
        if (parentContext.isRemote) {
          if (parentContext.traceFlags & api_1.TraceFlags.SAMPLED) {
            return this._remoteParentSampled.shouldSample(context2, traceId, spanName, spanKind, attributes, links);
          }
          return this._remoteParentNotSampled.shouldSample(context2, traceId, spanName, spanKind, attributes, links);
        }
        if (parentContext.traceFlags & api_1.TraceFlags.SAMPLED) {
          return this._localParentSampled.shouldSample(context2, traceId, spanName, spanKind, attributes, links);
        }
        return this._localParentNotSampled.shouldSample(context2, traceId, spanName, spanKind, attributes, links);
      }
      toString() {
        return `ParentBased{root=${this._root.toString()}, remoteParentSampled=${this._remoteParentSampled.toString()}, remoteParentNotSampled=${this._remoteParentNotSampled.toString()}, localParentSampled=${this._localParentSampled.toString()}, localParentNotSampled=${this._localParentNotSampled.toString()}}`;
      }
    };
    exports2.ParentBasedSampler = ParentBasedSampler2;
  }
});

// node_modules/@opentelemetry/sdk-trace/build/src/export/SpanProcessorMetrics.js
var require_SpanProcessorMetrics = __commonJS({
  "node_modules/@opentelemetry/sdk-trace/build/src/export/SpanProcessorMetrics.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SpanProcessorMetrics = void 0;
    var semantic_conventions_1 = require_dist();
    var semconv_1 = require_semconv3();
    var componentCounter = /* @__PURE__ */ new Map();
    var SpanProcessorMetrics = class {
      processedSpans;
      queueSize;
      queueSizeCallback;
      standardAttrs;
      droppedAttrs;
      constructor(componentType, meter, queueConfig) {
        const counter = componentCounter.get(componentType) ?? 0;
        componentCounter.set(componentType, counter + 1);
        this.standardAttrs = {
          [semconv_1.ATTR_OTEL_COMPONENT_TYPE]: componentType,
          [semconv_1.ATTR_OTEL_COMPONENT_NAME]: `${componentType}/${counter}`
        };
        this.droppedAttrs = {
          ...this.standardAttrs,
          [semantic_conventions_1.ATTR_ERROR_TYPE]: "queue_full"
        };
        this.processedSpans = meter.createCounter(semconv_1.METRIC_OTEL_SDK_PROCESSOR_SPAN_PROCESSED, {
          unit: "{span}",
          description: "The number of spans for which the processing has finished, either successful or failed."
        });
        if (queueConfig) {
          const { capacity, getQueueSize } = queueConfig;
          const queueCapacity = meter.createUpDownCounter(semconv_1.METRIC_OTEL_SDK_PROCESSOR_SPAN_QUEUE_CAPACITY, {
            unit: "{span}",
            description: "The maximum number of spans the queue of a given instance of an SDK span processor can hold."
          });
          queueCapacity.add(capacity, this.standardAttrs);
          this.queueSize = meter.createObservableUpDownCounter(semconv_1.METRIC_OTEL_SDK_PROCESSOR_SPAN_QUEUE_SIZE, {
            unit: "{span}",
            description: "The number of spans in the queue of a given instance of an SDK span processor."
          });
          this.queueSizeCallback = (result) => result.observe(getQueueSize(), this.standardAttrs);
          this.queueSize.addCallback(this.queueSizeCallback);
        }
      }
      dropSpans(count) {
        this.processedSpans.add(count, this.droppedAttrs);
      }
      finishSpans(count, error) {
        if (!error) {
          this.processedSpans.add(count, this.standardAttrs);
          return;
        }
        const attrs = {
          ...this.standardAttrs,
          [semantic_conventions_1.ATTR_ERROR_TYPE]: error.name
        };
        this.processedSpans.add(count, attrs);
      }
      shutdown() {
        if (this.queueSize && this.queueSizeCallback) {
          this.queueSize.removeCallback(this.queueSizeCallback);
        }
      }
    };
    exports2.SpanProcessorMetrics = SpanProcessorMetrics;
  }
});

// node_modules/@opentelemetry/sdk-trace/build/src/export/BatchSpanProcessorBase.js
var require_BatchSpanProcessorBase = __commonJS({
  "node_modules/@opentelemetry/sdk-trace/build/src/export/BatchSpanProcessorBase.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.BatchSpanProcessorBase = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var core_1 = require_src2();
    var SpanProcessorMetrics_1 = require_SpanProcessorMetrics();
    var semconv_1 = require_semconv3();
    var BatchSpanProcessorBase = class {
      _maxExportBatchSize;
      _maxQueueSize;
      _scheduledDelayMillis;
      _exportTimeoutMillis;
      _exporter;
      _metrics;
      _isExporting = false;
      _finishedSpans = [];
      _timer;
      _shutdownOnce;
      _droppedSpansCount = 0;
      constructor(options) {
        this._exporter = options.exporter;
        this._maxExportBatchSize = options.maxExportBatchSize ?? 512;
        this._maxQueueSize = options.maxQueueSize ?? 2048;
        this._scheduledDelayMillis = options.scheduledDelayMillis ?? 5e3;
        this._exportTimeoutMillis = options.exportTimeoutMillis ?? 3e4;
        this._shutdownOnce = new core_1.BindOnceFuture(this._shutdown, this);
        if (this._maxExportBatchSize > this._maxQueueSize) {
          api_1.diag.warn("BatchSpanProcessor: maxExportBatchSize must be smaller or equal to maxQueueSize, setting maxExportBatchSize to match maxQueueSize");
          this._maxExportBatchSize = this._maxQueueSize;
        }
        const meter = options.selfObsMeterProvider ? options.selfObsMeterProvider.getMeter("@opentelemetry/sdk-trace") : (0, api_1.createNoopMeter)();
        this._metrics = new SpanProcessorMetrics_1.SpanProcessorMetrics(semconv_1.OTEL_COMPONENT_TYPE_VALUE_BATCHING_SPAN_PROCESSOR, meter, {
          capacity: this._maxQueueSize,
          getQueueSize: () => this._finishedSpans.length
        });
      }
      forceFlush() {
        if (this._shutdownOnce.isCalled) {
          return this._shutdownOnce.promise;
        }
        return this._flushAll();
      }
      // does nothing.
      onStart(_span, _parentContext) {
      }
      onEnd(span) {
        if (this._shutdownOnce.isCalled) {
          return;
        }
        if ((span.spanContext().traceFlags & api_1.TraceFlags.SAMPLED) === 0) {
          return;
        }
        this._addToBuffer(span);
      }
      shutdown() {
        return this._shutdownOnce.call();
      }
      _shutdown() {
        return Promise.resolve().then(() => {
          return this.onShutdown();
        }).then(() => {
          return this._flushAll();
        }).then(() => {
          this._metrics.shutdown();
          return this._exporter.shutdown();
        });
      }
      /** Add a span in the buffer. */
      _addToBuffer(span) {
        if (this._finishedSpans.length >= this._maxQueueSize) {
          if (this._droppedSpansCount === 0) {
            api_1.diag.debug("maxQueueSize reached, dropping spans");
          }
          this._droppedSpansCount++;
          this._metrics.dropSpans(1);
          return;
        }
        if (this._droppedSpansCount > 0) {
          api_1.diag.warn(`Dropped ${this._droppedSpansCount} spans because maxQueueSize reached`);
          this._droppedSpansCount = 0;
        }
        this._finishedSpans.push(span);
        this._maybeStartTimer();
      }
      /**
       * Send all spans to the exporter respecting the batch size limit
       * This function is used only on forceFlush or shutdown,
       * for all other cases _flush should be used
       * */
      _flushAll() {
        return new Promise((resolve, reject) => {
          const promises = [];
          const count = Math.ceil(this._finishedSpans.length / this._maxExportBatchSize);
          for (let i = 0, j = count; i < j; i++) {
            promises.push(this._flushOneBatch());
          }
          Promise.all(promises).then(() => {
            resolve();
          }).catch(reject);
        });
      }
      _flushOneBatch() {
        this._clearTimer();
        if (this._finishedSpans.length === 0) {
          return Promise.resolve();
        }
        return new Promise((resolve, reject) => {
          const timer = setTimeout(() => {
            reject(new Error("Timeout"));
          }, this._exportTimeoutMillis);
          api_1.context.with((0, core_1.suppressTracing)(api_1.context.active()), () => {
            let spans;
            if (this._finishedSpans.length <= this._maxExportBatchSize) {
              spans = this._finishedSpans;
              this._finishedSpans = [];
            } else {
              spans = this._finishedSpans.splice(0, this._maxExportBatchSize);
            }
            const doExport = () => this._exporter.export(spans, (result) => {
              clearTimeout(timer);
              this._metrics.finishSpans(spans.length, result.error);
              if (result.code === core_1.ExportResultCode.SUCCESS) {
                resolve();
              } else {
                reject(result.error ?? new Error("BatchSpanProcessor: span export failed"));
              }
            });
            let pendingResources = null;
            for (let i = 0, len = spans.length; i < len; i++) {
              const span = spans[i];
              if (span.resource.asyncAttributesPending && span.resource.waitForAsyncAttributes) {
                pendingResources ??= [];
                pendingResources.push(span.resource.waitForAsyncAttributes());
              }
            }
            if (pendingResources === null) {
              doExport();
            } else {
              Promise.all(pendingResources).then(doExport, (err) => {
                (0, core_1.globalErrorHandler)(err);
                reject(err);
              });
            }
          });
        });
      }
      _maybeStartTimer() {
        if (this._isExporting)
          return;
        const flush = () => {
          this._isExporting = true;
          this._flushOneBatch().finally(() => {
            this._isExporting = false;
            if (this._finishedSpans.length > 0) {
              this._clearTimer();
              this._maybeStartTimer();
            }
          }).catch((e) => {
            this._isExporting = false;
            (0, core_1.globalErrorHandler)(e);
          });
        };
        if (this._finishedSpans.length >= this._maxExportBatchSize) {
          return flush();
        }
        if (this._timer !== void 0)
          return;
        this._timer = setTimeout(() => flush(), this._scheduledDelayMillis);
        if (typeof this._timer !== "number") {
          this._timer.unref();
        }
      }
      _clearTimer() {
        if (this._timer !== void 0) {
          clearTimeout(this._timer);
          this._timer = void 0;
        }
      }
    };
    exports2.BatchSpanProcessorBase = BatchSpanProcessorBase;
  }
});

// node_modules/@opentelemetry/sdk-trace/build/src/platform/node/export/BatchSpanProcessor.js
var require_BatchSpanProcessor = __commonJS({
  "node_modules/@opentelemetry/sdk-trace/build/src/platform/node/export/BatchSpanProcessor.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.BatchSpanProcessor = void 0;
    var BatchSpanProcessorBase_1 = require_BatchSpanProcessorBase();
    var BatchSpanProcessor = class extends BatchSpanProcessorBase_1.BatchSpanProcessorBase {
      onShutdown() {
      }
    };
    exports2.BatchSpanProcessor = BatchSpanProcessor;
  }
});

// node_modules/@opentelemetry/sdk-trace/build/src/platform/node/RandomIdGenerator.js
var require_RandomIdGenerator = __commonJS({
  "node_modules/@opentelemetry/sdk-trace/build/src/platform/node/RandomIdGenerator.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.RandomIdGenerator = void 0;
    var SPAN_ID_BYTES = 8;
    var TRACE_ID_BYTES = 16;
    var RandomIdGenerator = class {
      /**
       * Returns a random 16-byte trace ID formatted/encoded as a 32 lowercase hex
       * characters corresponding to 128 bits.
       */
      generateTraceId = getIdGenerator(TRACE_ID_BYTES);
      /**
       * Returns a random 8-byte span ID formatted/encoded as a 16 lowercase hex
       * characters corresponding to 64 bits.
       */
      generateSpanId = getIdGenerator(SPAN_ID_BYTES);
    };
    exports2.RandomIdGenerator = RandomIdGenerator;
    var SHARED_BUFFER = Buffer.allocUnsafe(TRACE_ID_BYTES);
    function getIdGenerator(bytes) {
      return function generateId() {
        for (let i = 0; i < bytes / 4; i++) {
          SHARED_BUFFER.writeUInt32BE(Math.random() * 2 ** 32 >>> 0, i * 4);
        }
        for (let i = 0; i < bytes; i++) {
          if (SHARED_BUFFER[i] > 0) {
            break;
          } else if (i === bytes - 1) {
            SHARED_BUFFER[bytes - 1] = 1;
          }
        }
        return SHARED_BUFFER.toString("hex", 0, bytes);
      };
    }
  }
});

// node_modules/@opentelemetry/sdk-trace/build/src/platform/node/index.js
var require_node3 = __commonJS({
  "node_modules/@opentelemetry/sdk-trace/build/src/platform/node/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.RandomIdGenerator = exports2.BatchSpanProcessor = void 0;
    var BatchSpanProcessor_1 = require_BatchSpanProcessor();
    Object.defineProperty(exports2, "BatchSpanProcessor", { enumerable: true, get: function() {
      return BatchSpanProcessor_1.BatchSpanProcessor;
    } });
    var RandomIdGenerator_1 = require_RandomIdGenerator();
    Object.defineProperty(exports2, "RandomIdGenerator", { enumerable: true, get: function() {
      return RandomIdGenerator_1.RandomIdGenerator;
    } });
  }
});

// node_modules/@opentelemetry/sdk-trace/build/src/platform/index.js
var require_platform3 = __commonJS({
  "node_modules/@opentelemetry/sdk-trace/build/src/platform/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.RandomIdGenerator = exports2.BatchSpanProcessor = void 0;
    var node_1 = require_node3();
    Object.defineProperty(exports2, "BatchSpanProcessor", { enumerable: true, get: function() {
      return node_1.BatchSpanProcessor;
    } });
    Object.defineProperty(exports2, "RandomIdGenerator", { enumerable: true, get: function() {
      return node_1.RandomIdGenerator;
    } });
  }
});

// node_modules/@opentelemetry/sdk-trace/build/src/TracerProvider.js
var require_TracerProvider = __commonJS({
  "node_modules/@opentelemetry/sdk-trace/build/src/TracerProvider.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TracerProvider = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var resources_1 = require_src3();
    var Tracer_1 = require_Tracer();
    var MultiSpanProcessor_1 = require_MultiSpanProcessor();
    var ParentBasedSampler_1 = require_ParentBasedSampler();
    var AlwaysOnSampler_1 = require_AlwaysOnSampler();
    var platform_1 = require_platform3();
    var inspect_1 = require_inspect();
    var ForceFlushState;
    (function(ForceFlushState2) {
      ForceFlushState2[ForceFlushState2["resolved"] = 0] = "resolved";
      ForceFlushState2[ForceFlushState2["timeout"] = 1] = "timeout";
      ForceFlushState2[ForceFlushState2["error"] = 2] = "error";
      ForceFlushState2[ForceFlushState2["unresolved"] = 3] = "unresolved";
    })(ForceFlushState || (ForceFlushState = {}));
    var TracerProvider = class {
      _resource;
      _activeSpanProcessor;
      _forceFlushTimeoutMillis;
      _tracerOptions;
      _tracers = /* @__PURE__ */ new Map();
      constructor(options = {}) {
        this._forceFlushTimeoutMillis = options.forceFlushTimeoutMillis ?? 3e4;
        this._resource = options.resource ?? (0, resources_1.defaultResource)();
        const spanProcessors = options.spanProcessors ?? [];
        this._activeSpanProcessor = new MultiSpanProcessor_1.MultiSpanProcessor(spanProcessors);
        this._tracerOptions = {
          resource: this._resource,
          sampler: options.sampler ?? new ParentBasedSampler_1.ParentBasedSampler({
            root: new AlwaysOnSampler_1.AlwaysOnSampler()
          }),
          spanLimits: {
            attributeCountLimit: options.spanLimits?.attributeCountLimit ?? 128,
            attributeValueLengthLimit: options.spanLimits?.attributeValueLengthLimit ?? Infinity,
            eventCountLimit: options.spanLimits?.eventCountLimit ?? 128,
            linkCountLimit: options.spanLimits?.linkCountLimit ?? 128,
            attributePerEventCountLimit: options.spanLimits?.attributePerEventCountLimit ?? 128,
            attributePerLinkCountLimit: options.spanLimits?.attributePerLinkCountLimit ?? 128
          },
          idGenerator: options.idGenerator || new platform_1.RandomIdGenerator(),
          spanProcessor: this._activeSpanProcessor,
          meterProvider: options.meterProvider ?? {
            getMeter() {
              return (0, api_1.createNoopMeter)();
            }
          }
        };
      }
      getTracer(name, version, options) {
        const key = `${name}@${version || ""}:${options?.schemaUrl || ""}`;
        if (!this._tracers.has(key)) {
          this._tracers.set(key, new Tracer_1.Tracer({ name, version, schemaUrl: options?.schemaUrl }, this._tracerOptions));
        }
        return this._tracers.get(key);
      }
      forceFlush(options) {
        const timeout = options?.timeoutMillis ?? this._forceFlushTimeoutMillis;
        const promises = this._activeSpanProcessor["_spanProcessors"].map((spanProcessor) => {
          return new Promise((resolve) => {
            let state;
            const timeoutInterval = setTimeout(() => {
              resolve(new Error(`Span processor did not completed within timeout period of ${timeout} ms`));
              state = ForceFlushState.timeout;
            }, timeout);
            spanProcessor.forceFlush().then(() => {
              clearTimeout(timeoutInterval);
              if (state !== ForceFlushState.timeout) {
                state = ForceFlushState.resolved;
                resolve(state);
              }
            }).catch((error) => {
              clearTimeout(timeoutInterval);
              state = ForceFlushState.error;
              resolve(error);
            });
          });
        });
        return new Promise((resolve, reject) => {
          Promise.all(promises).then((results) => {
            const errors = results.filter((result) => result !== ForceFlushState.resolved);
            if (errors.length > 0) {
              reject(errors);
            } else {
              resolve();
            }
          }).catch((error) => reject([error]));
        });
      }
      shutdown() {
        return this._activeSpanProcessor.shutdown();
      }
      [inspect_1.inspectCustom](depth, options, inspect) {
        const processors = this._activeSpanProcessor["_spanProcessors"];
        const payload = {
          resource: { attributes: (0, inspect_1.settledResourceAttributes)(this._resource) },
          tracers: Array.from(this._tracers.keys()),
          spanProcessors: processors.map((p) => p.constructor?.name ?? "SpanProcessor")
        };
        return (0, inspect_1.formatInspect)("TracerProvider", payload, depth, options, inspect);
      }
    };
    exports2.TracerProvider = TracerProvider;
  }
});

// node_modules/@opentelemetry/sdk-trace/build/src/export/ConsoleSpanExporter.js
var require_ConsoleSpanExporter = __commonJS({
  "node_modules/@opentelemetry/sdk-trace/build/src/export/ConsoleSpanExporter.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ConsoleSpanExporter = void 0;
    var core_1 = require_src2();
    var ConsoleSpanExporter = class {
      /**
       * Export spans.
       * @param spans
       * @param resultCallback
       */
      export(spans, resultCallback) {
        return this._sendSpans(spans, resultCallback);
      }
      /**
       * Shutdown the exporter.
       */
      shutdown() {
        this._sendSpans([]);
        return this.forceFlush();
      }
      /**
       * Exports any pending spans in exporter
       */
      forceFlush() {
        return Promise.resolve();
      }
      /**
       * converts span info into more readable format
       * @param span
       */
      _exportInfo(span) {
        return {
          resource: {
            attributes: span.resource.attributes
          },
          instrumentationScope: span.instrumentationScope,
          traceId: span.spanContext().traceId,
          parentSpanContext: span.parentSpanContext,
          traceState: span.spanContext().traceState?.serialize(),
          name: span.name,
          id: span.spanContext().spanId,
          kind: span.kind,
          timestamp: (0, core_1.hrTimeToMicroseconds)(span.startTime),
          duration: (0, core_1.hrTimeToMicroseconds)(span.duration),
          attributes: span.attributes,
          status: span.status,
          events: span.events,
          links: span.links
        };
      }
      /**
       * Showing spans in console
       * @param spans
       * @param done
       */
      _sendSpans(spans, done) {
        for (const span of spans) {
          console.dir(this._exportInfo(span), { depth: 3 });
        }
        if (done) {
          return done({ code: core_1.ExportResultCode.SUCCESS });
        }
      }
    };
    exports2.ConsoleSpanExporter = ConsoleSpanExporter;
  }
});

// node_modules/@opentelemetry/sdk-trace/build/src/export/InMemorySpanExporter.js
var require_InMemorySpanExporter = __commonJS({
  "node_modules/@opentelemetry/sdk-trace/build/src/export/InMemorySpanExporter.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.InMemorySpanExporter = void 0;
    var core_1 = require_src2();
    var InMemorySpanExporter = class {
      _finishedSpans = [];
      /**
       * Indicates if the exporter has been "shutdown."
       * When false, exported spans will not be stored in-memory.
       */
      _stopped = false;
      export(spans, resultCallback) {
        if (this._stopped)
          return resultCallback({
            code: core_1.ExportResultCode.FAILED,
            error: new Error("Exporter has been stopped")
          });
        this._finishedSpans.push(...spans);
        setTimeout(() => resultCallback({ code: core_1.ExportResultCode.SUCCESS }), 0);
      }
      shutdown() {
        this._stopped = true;
        this._finishedSpans = [];
        return this.forceFlush();
      }
      /**
       * Exports any pending spans in the exporter
       */
      forceFlush() {
        return Promise.resolve();
      }
      reset() {
        this._finishedSpans = [];
      }
      getFinishedSpans() {
        return this._finishedSpans;
      }
    };
    exports2.InMemorySpanExporter = InMemorySpanExporter;
  }
});

// node_modules/@opentelemetry/sdk-trace/build/src/export/SimpleSpanProcessor.js
var require_SimpleSpanProcessor = __commonJS({
  "node_modules/@opentelemetry/sdk-trace/build/src/export/SimpleSpanProcessor.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SimpleSpanProcessor = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var core_1 = require_src2();
    var SpanProcessorMetrics_1 = require_SpanProcessorMetrics();
    var semconv_1 = require_semconv3();
    var SimpleSpanProcessor = class {
      _exporter;
      _metrics;
      _shutdownOnce;
      _pendingExports;
      constructor(options) {
        this._exporter = options.exporter;
        this._shutdownOnce = new core_1.BindOnceFuture(this._shutdown, this);
        this._pendingExports = /* @__PURE__ */ new Set();
        const meter = options.selfObsMeterProvider ? options.selfObsMeterProvider.getMeter("@opentelemetry/sdk-trace") : (0, api_1.createNoopMeter)();
        this._metrics = new SpanProcessorMetrics_1.SpanProcessorMetrics(semconv_1.OTEL_COMPONENT_TYPE_VALUE_SIMPLE_SPAN_PROCESSOR, meter);
      }
      async forceFlush() {
        let pendingExportError;
        let pendingExportRejected = false;
        try {
          await Promise.all(Array.from(this._pendingExports));
        } catch (err) {
          pendingExportError = err;
          pendingExportRejected = true;
        }
        if (this._exporter.forceFlush) {
          await this._exporter.forceFlush();
        }
        if (pendingExportRejected) {
          throw pendingExportError;
        }
      }
      onStart(_span, _parentContext) {
      }
      onEnd(span) {
        if (this._shutdownOnce.isCalled) {
          return;
        }
        if ((span.spanContext().traceFlags & api_1.TraceFlags.SAMPLED) === 0) {
          return;
        }
        const pendingExport = this._doExport(span);
        this._pendingExports.add(pendingExport);
        void pendingExport.then(() => {
          this._pendingExports.delete(pendingExport);
        }, (err) => {
          (0, core_1.globalErrorHandler)(err);
          this._pendingExports.delete(pendingExport);
        });
      }
      async _doExport(span) {
        if (span.resource.asyncAttributesPending) {
          await span.resource.waitForAsyncAttributes?.();
        }
        const result = await core_1.internal._export(this._exporter, [span]);
        this._metrics.finishSpans(1, result.error);
        if (result.code !== core_1.ExportResultCode.SUCCESS) {
          throw result.error ?? new Error(`SimpleSpanProcessor: span export failed (status ${result})`);
        }
      }
      shutdown() {
        return this._shutdownOnce.call();
      }
      _shutdown() {
        this._metrics.shutdown();
        return this._exporter.shutdown();
      }
    };
    exports2.SimpleSpanProcessor = SimpleSpanProcessor;
  }
});

// node_modules/@opentelemetry/sdk-trace/build/src/export/NoopSpanProcessor.js
var require_NoopSpanProcessor = __commonJS({
  "node_modules/@opentelemetry/sdk-trace/build/src/export/NoopSpanProcessor.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.NoopSpanProcessor = void 0;
    var NoopSpanProcessor = class {
      onStart(_span, _context) {
      }
      onEnd(_span) {
      }
      shutdown() {
        return Promise.resolve();
      }
      forceFlush() {
        return Promise.resolve();
      }
    };
    exports2.NoopSpanProcessor = NoopSpanProcessor;
  }
});

// node_modules/@opentelemetry/sdk-trace/build/src/sampler/AlwaysRecordSampler.js
var require_AlwaysRecordSampler = __commonJS({
  "node_modules/@opentelemetry/sdk-trace/build/src/sampler/AlwaysRecordSampler.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createAlwaysRecordSampler = void 0;
    var Sampler_1 = require_Sampler();
    function createAlwaysRecordSampler(delegate) {
      if (!delegate) {
        throw new Error("createAlwaysRecordSampler requires a delegate sampler");
      }
      return {
        shouldSample(context2, traceId, spanName, spanKind, attributes, links) {
          const result = delegate.shouldSample(context2, traceId, spanName, spanKind, attributes, links);
          if (result.decision === Sampler_1.SamplingDecision.NOT_RECORD) {
            return {
              decision: Sampler_1.SamplingDecision.RECORD,
              attributes: result.attributes,
              traceState: result.traceState
            };
          }
          return result;
        },
        toString() {
          return `AlwaysRecordSampler{${delegate.toString()}}`;
        }
      };
    }
    exports2.createAlwaysRecordSampler = createAlwaysRecordSampler;
  }
});

// node_modules/@opentelemetry/sdk-trace/build/src/sampler/TraceIdRatioBasedSampler.js
var require_TraceIdRatioBasedSampler = __commonJS({
  "node_modules/@opentelemetry/sdk-trace/build/src/sampler/TraceIdRatioBasedSampler.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TraceIdRatioBasedSampler = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var Sampler_1 = require_Sampler();
    var TraceIdRatioBasedSampler2 = class {
      _ratio;
      _upperBound;
      constructor(ratio = 0) {
        this._ratio = this._normalize(ratio);
        this._upperBound = this._ratio === 1 ? 4294967296 : Math.floor(this._ratio * 4294967295);
      }
      shouldSample(context2, traceId) {
        return {
          decision: (0, api_1.isValidTraceId)(traceId) && this._accumulate(traceId) < this._upperBound ? Sampler_1.SamplingDecision.RECORD_AND_SAMPLED : Sampler_1.SamplingDecision.NOT_RECORD
        };
      }
      toString() {
        return `TraceIdRatioBased{${this._ratio}}`;
      }
      _normalize(ratio) {
        if (typeof ratio !== "number" || isNaN(ratio))
          return 0;
        return ratio >= 1 ? 1 : ratio <= 0 ? 0 : ratio;
      }
      _accumulate(traceId) {
        let accumulation = 0;
        for (let i = 0; i < 32; i += 8) {
          let part = 0;
          for (let j = 0; j < 8; j++) {
            const c = traceId.charCodeAt(i + j);
            const v = c < 58 ? c - 48 : c < 71 ? c - 55 : c - 87;
            part = part << 4 | v;
          }
          accumulation = (accumulation ^ part) >>> 0;
        }
        return accumulation;
      }
    };
    exports2.TraceIdRatioBasedSampler = TraceIdRatioBasedSampler2;
  }
});

// node_modules/@opentelemetry/sdk-trace/build/src/index.js
var require_src4 = __commonJS({
  "node_modules/@opentelemetry/sdk-trace/build/src/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SamplingDecision = exports2.TraceIdRatioBasedSampler = exports2.ParentBasedSampler = exports2.createAlwaysRecordSampler = exports2.AlwaysOnSampler = exports2.AlwaysOffSampler = exports2.NoopSpanProcessor = exports2.SimpleSpanProcessor = exports2.InMemorySpanExporter = exports2.ConsoleSpanExporter = exports2.RandomIdGenerator = exports2.BatchSpanProcessor = exports2.TracerProvider = exports2.StackContextManager = void 0;
    var StackContextManager_1 = require_StackContextManager();
    Object.defineProperty(exports2, "StackContextManager", { enumerable: true, get: function() {
      return StackContextManager_1.StackContextManager;
    } });
    var TracerProvider_1 = require_TracerProvider();
    Object.defineProperty(exports2, "TracerProvider", { enumerable: true, get: function() {
      return TracerProvider_1.TracerProvider;
    } });
    var platform_1 = require_platform3();
    Object.defineProperty(exports2, "BatchSpanProcessor", { enumerable: true, get: function() {
      return platform_1.BatchSpanProcessor;
    } });
    Object.defineProperty(exports2, "RandomIdGenerator", { enumerable: true, get: function() {
      return platform_1.RandomIdGenerator;
    } });
    var ConsoleSpanExporter_1 = require_ConsoleSpanExporter();
    Object.defineProperty(exports2, "ConsoleSpanExporter", { enumerable: true, get: function() {
      return ConsoleSpanExporter_1.ConsoleSpanExporter;
    } });
    var InMemorySpanExporter_1 = require_InMemorySpanExporter();
    Object.defineProperty(exports2, "InMemorySpanExporter", { enumerable: true, get: function() {
      return InMemorySpanExporter_1.InMemorySpanExporter;
    } });
    var SimpleSpanProcessor_1 = require_SimpleSpanProcessor();
    Object.defineProperty(exports2, "SimpleSpanProcessor", { enumerable: true, get: function() {
      return SimpleSpanProcessor_1.SimpleSpanProcessor;
    } });
    var NoopSpanProcessor_1 = require_NoopSpanProcessor();
    Object.defineProperty(exports2, "NoopSpanProcessor", { enumerable: true, get: function() {
      return NoopSpanProcessor_1.NoopSpanProcessor;
    } });
    var AlwaysOffSampler_1 = require_AlwaysOffSampler();
    Object.defineProperty(exports2, "AlwaysOffSampler", { enumerable: true, get: function() {
      return AlwaysOffSampler_1.AlwaysOffSampler;
    } });
    var AlwaysOnSampler_1 = require_AlwaysOnSampler();
    Object.defineProperty(exports2, "AlwaysOnSampler", { enumerable: true, get: function() {
      return AlwaysOnSampler_1.AlwaysOnSampler;
    } });
    var AlwaysRecordSampler_1 = require_AlwaysRecordSampler();
    Object.defineProperty(exports2, "createAlwaysRecordSampler", { enumerable: true, get: function() {
      return AlwaysRecordSampler_1.createAlwaysRecordSampler;
    } });
    var ParentBasedSampler_1 = require_ParentBasedSampler();
    Object.defineProperty(exports2, "ParentBasedSampler", { enumerable: true, get: function() {
      return ParentBasedSampler_1.ParentBasedSampler;
    } });
    var TraceIdRatioBasedSampler_1 = require_TraceIdRatioBasedSampler();
    Object.defineProperty(exports2, "TraceIdRatioBasedSampler", { enumerable: true, get: function() {
      return TraceIdRatioBasedSampler_1.TraceIdRatioBasedSampler;
    } });
    var Sampler_1 = require_Sampler();
    Object.defineProperty(exports2, "SamplingDecision", { enumerable: true, get: function() {
      return Sampler_1.SamplingDecision;
    } });
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/config.js
var require_config = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/config.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.buildSamplerFromEnv = exports2.loadDefaultConfig = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var core_1 = require_src2();
    var sdk_trace_1 = require_src4();
    var TracesSamplerValues;
    (function(TracesSamplerValues2) {
      TracesSamplerValues2["AlwaysOff"] = "always_off";
      TracesSamplerValues2["AlwaysOn"] = "always_on";
      TracesSamplerValues2["ParentBasedAlwaysOff"] = "parentbased_always_off";
      TracesSamplerValues2["ParentBasedAlwaysOn"] = "parentbased_always_on";
      TracesSamplerValues2["ParentBasedTraceIdRatio"] = "parentbased_traceidratio";
      TracesSamplerValues2["TraceIdRatio"] = "traceidratio";
    })(TracesSamplerValues || (TracesSamplerValues = {}));
    var DEFAULT_RATIO = 1;
    function loadDefaultConfig() {
      return {
        sampler: buildSamplerFromEnv(),
        forceFlushTimeoutMillis: 3e4,
        generalLimits: {
          attributeValueLengthLimit: (0, core_1.getNumberFromEnv)("OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT") ?? Infinity,
          attributeCountLimit: (0, core_1.getNumberFromEnv)("OTEL_ATTRIBUTE_COUNT_LIMIT") ?? 128
        },
        spanLimits: {
          attributeValueLengthLimit: (0, core_1.getNumberFromEnv)("OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT") ?? Infinity,
          attributeCountLimit: (0, core_1.getNumberFromEnv)("OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT") ?? 128,
          linkCountLimit: (0, core_1.getNumberFromEnv)("OTEL_SPAN_LINK_COUNT_LIMIT") ?? 128,
          eventCountLimit: (0, core_1.getNumberFromEnv)("OTEL_SPAN_EVENT_COUNT_LIMIT") ?? 128,
          attributePerEventCountLimit: (0, core_1.getNumberFromEnv)("OTEL_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT") ?? 128,
          attributePerLinkCountLimit: (0, core_1.getNumberFromEnv)("OTEL_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT") ?? 128
        }
      };
    }
    exports2.loadDefaultConfig = loadDefaultConfig;
    function buildSamplerFromEnv() {
      const sampler = (0, core_1.getStringFromEnv)("OTEL_TRACES_SAMPLER") ?? TracesSamplerValues.ParentBasedAlwaysOn;
      switch (sampler) {
        case TracesSamplerValues.AlwaysOn:
          return new sdk_trace_1.AlwaysOnSampler();
        case TracesSamplerValues.AlwaysOff:
          return new sdk_trace_1.AlwaysOffSampler();
        case TracesSamplerValues.ParentBasedAlwaysOn:
          return new sdk_trace_1.ParentBasedSampler({
            root: new sdk_trace_1.AlwaysOnSampler()
          });
        case TracesSamplerValues.ParentBasedAlwaysOff:
          return new sdk_trace_1.ParentBasedSampler({
            root: new sdk_trace_1.AlwaysOffSampler()
          });
        case TracesSamplerValues.TraceIdRatio:
          return new sdk_trace_1.TraceIdRatioBasedSampler(getSamplerProbabilityFromEnv());
        case TracesSamplerValues.ParentBasedTraceIdRatio:
          return new sdk_trace_1.ParentBasedSampler({
            root: new sdk_trace_1.TraceIdRatioBasedSampler(getSamplerProbabilityFromEnv())
          });
        default:
          api_1.diag.error(`OTEL_TRACES_SAMPLER value "${sampler}" invalid, defaulting to "${TracesSamplerValues.ParentBasedAlwaysOn}".`);
          return new sdk_trace_1.ParentBasedSampler({
            root: new sdk_trace_1.AlwaysOnSampler()
          });
      }
    }
    exports2.buildSamplerFromEnv = buildSamplerFromEnv;
    function getSamplerProbabilityFromEnv() {
      const probability = (0, core_1.getNumberFromEnv)("OTEL_TRACES_SAMPLER_ARG");
      if (probability == null) {
        api_1.diag.error(`OTEL_TRACES_SAMPLER_ARG is blank, defaulting to ${DEFAULT_RATIO}.`);
        return DEFAULT_RATIO;
      }
      if (probability < 0 || probability > 1) {
        api_1.diag.error(`OTEL_TRACES_SAMPLER_ARG=${probability} was given, but it is out of range ([0..1]), defaulting to ${DEFAULT_RATIO}.`);
        return DEFAULT_RATIO;
      }
      return probability;
    }
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/utility.js
var require_utility = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/utility.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.reconfigureLimits = exports2.DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT = exports2.DEFAULT_ATTRIBUTE_COUNT_LIMIT = void 0;
    var core_1 = require_src2();
    exports2.DEFAULT_ATTRIBUTE_COUNT_LIMIT = 128;
    exports2.DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT = Infinity;
    function reconfigureLimits(userConfig) {
      const spanLimits = Object.assign({}, userConfig.spanLimits);
      spanLimits.attributeCountLimit = userConfig.spanLimits?.attributeCountLimit ?? userConfig.generalLimits?.attributeCountLimit ?? (0, core_1.getNumberFromEnv)("OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT") ?? (0, core_1.getNumberFromEnv)("OTEL_ATTRIBUTE_COUNT_LIMIT") ?? exports2.DEFAULT_ATTRIBUTE_COUNT_LIMIT;
      spanLimits.attributeValueLengthLimit = userConfig.spanLimits?.attributeValueLengthLimit ?? userConfig.generalLimits?.attributeValueLengthLimit ?? (0, core_1.getNumberFromEnv)("OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT") ?? (0, core_1.getNumberFromEnv)("OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT") ?? exports2.DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT;
      return Object.assign({}, userConfig, { spanLimits });
    }
    exports2.reconfigureLimits = reconfigureLimits;
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/BasicTracerProvider-shim.js
var require_BasicTracerProvider_shim = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/BasicTracerProvider-shim.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.BasicTracerProvider = void 0;
    var core_1 = require_src2();
    var config_1 = require_config();
    var utility_1 = require_utility();
    var sdk_trace_1 = require_src4();
    var BasicTracerProvider = class extends sdk_trace_1.TracerProvider {
      constructor(config = {}) {
        const mergedConfig = (0, core_1.merge)({}, (0, config_1.loadDefaultConfig)(), (0, utility_1.reconfigureLimits)(config));
        delete mergedConfig.generalLimits;
        super(mergedConfig);
      }
    };
    exports2.BasicTracerProvider = BasicTracerProvider;
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/BatchSpanProcessor-shim.js
var require_BatchSpanProcessor_shim = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/BatchSpanProcessor-shim.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.BatchSpanProcessor = void 0;
    var core_1 = require_src2();
    var sdk_trace_1 = require_src4();
    var BatchSpanProcessor = class extends sdk_trace_1.BatchSpanProcessor {
      constructor(exporter, config) {
        if (!config) {
          config = {};
        }
        const envFallbacks = [
          ["maxExportBatchSize", "OTEL_BSP_MAX_EXPORT_BATCH_SIZE"],
          ["maxQueueSize", "OTEL_BSP_MAX_QUEUE_SIZE"],
          ["scheduledDelayMillis", "OTEL_BSP_SCHEDULE_DELAY"],
          ["exportTimeoutMillis", "OTEL_BSP_EXPORT_TIMEOUT"]
        ];
        for (const [configName, envName] of envFallbacks) {
          if (config[configName] === void 0) {
            const envFallback = (0, core_1.getNumberFromEnv)(envName);
            if (envFallback !== void 0) {
              config[configName] = envFallback;
            }
          }
        }
        super({ exporter, ...config });
      }
    };
    exports2.BatchSpanProcessor = BatchSpanProcessor;
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/SimpleSpanProcessor-shim.js
var require_SimpleSpanProcessor_shim = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/SimpleSpanProcessor-shim.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SimpleSpanProcessor = void 0;
    var sdk_trace_1 = require_src4();
    var SimpleSpanProcessor = class extends sdk_trace_1.SimpleSpanProcessor {
      constructor(exporter) {
        super({ exporter });
      }
    };
    exports2.SimpleSpanProcessor = SimpleSpanProcessor;
  }
});

// node_modules/@opentelemetry/sdk-trace-base/build/src/index-shim.js
var require_index_shim = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-base/build/src/index-shim.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SamplingDecision = exports2.TraceIdRatioBasedSampler = exports2.ParentBasedSampler = exports2.AlwaysOnSampler = exports2.AlwaysOffSampler = exports2.NoopSpanProcessor = exports2.InMemorySpanExporter = exports2.RandomIdGenerator = exports2.ConsoleSpanExporter = exports2.SimpleSpanProcessor = exports2.BatchSpanProcessor = exports2.BasicTracerProvider = void 0;
    var BasicTracerProvider_shim_1 = require_BasicTracerProvider_shim();
    Object.defineProperty(exports2, "BasicTracerProvider", { enumerable: true, get: function() {
      return BasicTracerProvider_shim_1.BasicTracerProvider;
    } });
    var BatchSpanProcessor_shim_1 = require_BatchSpanProcessor_shim();
    Object.defineProperty(exports2, "BatchSpanProcessor", { enumerable: true, get: function() {
      return BatchSpanProcessor_shim_1.BatchSpanProcessor;
    } });
    var SimpleSpanProcessor_shim_1 = require_SimpleSpanProcessor_shim();
    Object.defineProperty(exports2, "SimpleSpanProcessor", { enumerable: true, get: function() {
      return SimpleSpanProcessor_shim_1.SimpleSpanProcessor;
    } });
    var sdk_trace_1 = require_src4();
    Object.defineProperty(exports2, "ConsoleSpanExporter", { enumerable: true, get: function() {
      return sdk_trace_1.ConsoleSpanExporter;
    } });
    Object.defineProperty(exports2, "RandomIdGenerator", { enumerable: true, get: function() {
      return sdk_trace_1.RandomIdGenerator;
    } });
    Object.defineProperty(exports2, "InMemorySpanExporter", { enumerable: true, get: function() {
      return sdk_trace_1.InMemorySpanExporter;
    } });
    Object.defineProperty(exports2, "NoopSpanProcessor", { enumerable: true, get: function() {
      return sdk_trace_1.NoopSpanProcessor;
    } });
    Object.defineProperty(exports2, "AlwaysOffSampler", { enumerable: true, get: function() {
      return sdk_trace_1.AlwaysOffSampler;
    } });
    Object.defineProperty(exports2, "AlwaysOnSampler", { enumerable: true, get: function() {
      return sdk_trace_1.AlwaysOnSampler;
    } });
    Object.defineProperty(exports2, "ParentBasedSampler", { enumerable: true, get: function() {
      return sdk_trace_1.ParentBasedSampler;
    } });
    Object.defineProperty(exports2, "TraceIdRatioBasedSampler", { enumerable: true, get: function() {
      return sdk_trace_1.TraceIdRatioBasedSampler;
    } });
    Object.defineProperty(exports2, "SamplingDecision", { enumerable: true, get: function() {
      return sdk_trace_1.SamplingDecision;
    } });
  }
});

// node_modules/@opentelemetry/sdk-trace-node/build/src/NodeTracerProvider.js
var require_NodeTracerProvider = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-node/build/src/NodeTracerProvider.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.NodeTracerProvider = void 0;
    var context_async_hooks_1 = require_src();
    var sdk_trace_base_1 = require_index_shim();
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var core_1 = require_src2();
    function setupContextManager(contextManager) {
      if (contextManager === null) {
        return;
      }
      if (contextManager === void 0) {
        const defaultContextManager = new context_async_hooks_1.AsyncLocalStorageContextManager();
        defaultContextManager.enable();
        api_1.context.setGlobalContextManager(defaultContextManager);
        return;
      }
      contextManager.enable();
      api_1.context.setGlobalContextManager(contextManager);
    }
    function setupPropagator(propagator) {
      if (propagator === null) {
        return;
      }
      if (propagator === void 0) {
        api_1.propagation.setGlobalPropagator(new core_1.CompositePropagator({
          propagators: [
            new core_1.W3CTraceContextPropagator(),
            new core_1.W3CBaggagePropagator()
          ]
        }));
        return;
      }
      api_1.propagation.setGlobalPropagator(propagator);
    }
    var NodeTracerProvider2 = class extends sdk_trace_base_1.BasicTracerProvider {
      constructor(config = {}) {
        super(config);
      }
      /**
       * Register this TracerProvider for use with the OpenTelemetry API.
       * Undefined values may be replaced with defaults, and
       * null values will be skipped.
       *
       * @param config Configuration object for SDK registration
       */
      register(config = {}) {
        api_1.trace.setGlobalTracerProvider(this);
        setupContextManager(config.contextManager);
        setupPropagator(config.propagator);
      }
    };
    exports2.NodeTracerProvider = NodeTracerProvider2;
  }
});

// node_modules/@opentelemetry/sdk-trace-node/build/src/index.js
var require_src5 = __commonJS({
  "node_modules/@opentelemetry/sdk-trace-node/build/src/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.TraceIdRatioBasedSampler = exports2.SimpleSpanProcessor = exports2.SamplingDecision = exports2.RandomIdGenerator = exports2.ParentBasedSampler = exports2.NoopSpanProcessor = exports2.InMemorySpanExporter = exports2.ConsoleSpanExporter = exports2.BatchSpanProcessor = exports2.BasicTracerProvider = exports2.AlwaysOnSampler = exports2.AlwaysOffSampler = exports2.NodeTracerProvider = void 0;
    var NodeTracerProvider_1 = require_NodeTracerProvider();
    Object.defineProperty(exports2, "NodeTracerProvider", { enumerable: true, get: function() {
      return NodeTracerProvider_1.NodeTracerProvider;
    } });
    var sdk_trace_base_1 = require_index_shim();
    Object.defineProperty(exports2, "AlwaysOffSampler", { enumerable: true, get: function() {
      return sdk_trace_base_1.AlwaysOffSampler;
    } });
    Object.defineProperty(exports2, "AlwaysOnSampler", { enumerable: true, get: function() {
      return sdk_trace_base_1.AlwaysOnSampler;
    } });
    Object.defineProperty(exports2, "BasicTracerProvider", { enumerable: true, get: function() {
      return sdk_trace_base_1.BasicTracerProvider;
    } });
    Object.defineProperty(exports2, "BatchSpanProcessor", { enumerable: true, get: function() {
      return sdk_trace_base_1.BatchSpanProcessor;
    } });
    Object.defineProperty(exports2, "ConsoleSpanExporter", { enumerable: true, get: function() {
      return sdk_trace_base_1.ConsoleSpanExporter;
    } });
    Object.defineProperty(exports2, "InMemorySpanExporter", { enumerable: true, get: function() {
      return sdk_trace_base_1.InMemorySpanExporter;
    } });
    Object.defineProperty(exports2, "NoopSpanProcessor", { enumerable: true, get: function() {
      return sdk_trace_base_1.NoopSpanProcessor;
    } });
    Object.defineProperty(exports2, "ParentBasedSampler", { enumerable: true, get: function() {
      return sdk_trace_base_1.ParentBasedSampler;
    } });
    Object.defineProperty(exports2, "RandomIdGenerator", { enumerable: true, get: function() {
      return sdk_trace_base_1.RandomIdGenerator;
    } });
    Object.defineProperty(exports2, "SamplingDecision", { enumerable: true, get: function() {
      return sdk_trace_base_1.SamplingDecision;
    } });
    Object.defineProperty(exports2, "SimpleSpanProcessor", { enumerable: true, get: function() {
      return sdk_trace_base_1.SimpleSpanProcessor;
    } });
    Object.defineProperty(exports2, "TraceIdRatioBasedSampler", { enumerable: true, get: function() {
      return sdk_trace_base_1.TraceIdRatioBasedSampler;
    } });
  }
});

// node_modules/@opentelemetry/api-logs/build/src/types/LogRecord.js
var require_LogRecord = __commonJS({
  "node_modules/@opentelemetry/api-logs/build/src/types/LogRecord.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SeverityNumber = void 0;
    var SeverityNumber;
    (function(SeverityNumber2) {
      SeverityNumber2[SeverityNumber2["UNSPECIFIED"] = 0] = "UNSPECIFIED";
      SeverityNumber2[SeverityNumber2["TRACE"] = 1] = "TRACE";
      SeverityNumber2[SeverityNumber2["TRACE2"] = 2] = "TRACE2";
      SeverityNumber2[SeverityNumber2["TRACE3"] = 3] = "TRACE3";
      SeverityNumber2[SeverityNumber2["TRACE4"] = 4] = "TRACE4";
      SeverityNumber2[SeverityNumber2["DEBUG"] = 5] = "DEBUG";
      SeverityNumber2[SeverityNumber2["DEBUG2"] = 6] = "DEBUG2";
      SeverityNumber2[SeverityNumber2["DEBUG3"] = 7] = "DEBUG3";
      SeverityNumber2[SeverityNumber2["DEBUG4"] = 8] = "DEBUG4";
      SeverityNumber2[SeverityNumber2["INFO"] = 9] = "INFO";
      SeverityNumber2[SeverityNumber2["INFO2"] = 10] = "INFO2";
      SeverityNumber2[SeverityNumber2["INFO3"] = 11] = "INFO3";
      SeverityNumber2[SeverityNumber2["INFO4"] = 12] = "INFO4";
      SeverityNumber2[SeverityNumber2["WARN"] = 13] = "WARN";
      SeverityNumber2[SeverityNumber2["WARN2"] = 14] = "WARN2";
      SeverityNumber2[SeverityNumber2["WARN3"] = 15] = "WARN3";
      SeverityNumber2[SeverityNumber2["WARN4"] = 16] = "WARN4";
      SeverityNumber2[SeverityNumber2["ERROR"] = 17] = "ERROR";
      SeverityNumber2[SeverityNumber2["ERROR2"] = 18] = "ERROR2";
      SeverityNumber2[SeverityNumber2["ERROR3"] = 19] = "ERROR3";
      SeverityNumber2[SeverityNumber2["ERROR4"] = 20] = "ERROR4";
      SeverityNumber2[SeverityNumber2["FATAL"] = 21] = "FATAL";
      SeverityNumber2[SeverityNumber2["FATAL2"] = 22] = "FATAL2";
      SeverityNumber2[SeverityNumber2["FATAL3"] = 23] = "FATAL3";
      SeverityNumber2[SeverityNumber2["FATAL4"] = 24] = "FATAL4";
    })(SeverityNumber || (exports2.SeverityNumber = SeverityNumber = {}));
  }
});

// node_modules/@opentelemetry/api-logs/build/src/NoopLogger.js
var require_NoopLogger = __commonJS({
  "node_modules/@opentelemetry/api-logs/build/src/NoopLogger.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createNoopLogger = exports2.NOOP_LOGGER = exports2.NoopLogger = void 0;
    var NoopLogger = class {
      emit(_logRecord) {
      }
      enabled() {
        return false;
      }
    };
    exports2.NoopLogger = NoopLogger;
    exports2.NOOP_LOGGER = new NoopLogger();
    function createNoopLogger() {
      return exports2.NOOP_LOGGER;
    }
    exports2.createNoopLogger = createNoopLogger;
  }
});

// node_modules/@opentelemetry/api-logs/build/src/internal/global-utils.js
var require_global_utils = __commonJS({
  "node_modules/@opentelemetry/api-logs/build/src/internal/global-utils.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.API_BACKWARDS_COMPATIBILITY_VERSION = exports2.makeGetter = exports2._global = exports2.GLOBAL_LOGS_API_KEY = void 0;
    exports2.GLOBAL_LOGS_API_KEY = /* @__PURE__ */ Symbol.for("io.opentelemetry.js.api.logs");
    exports2._global = globalThis;
    function makeGetter(requiredVersion, instance, fallback) {
      return (version) => version === requiredVersion ? instance : fallback;
    }
    exports2.makeGetter = makeGetter;
    exports2.API_BACKWARDS_COMPATIBILITY_VERSION = 1;
  }
});

// node_modules/@opentelemetry/api-logs/build/src/NoopLoggerProvider.js
var require_NoopLoggerProvider = __commonJS({
  "node_modules/@opentelemetry/api-logs/build/src/NoopLoggerProvider.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.NOOP_LOGGER_PROVIDER = exports2.NoopLoggerProvider = void 0;
    var NoopLogger_1 = require_NoopLogger();
    var NoopLoggerProvider = class {
      getLogger(_name, _version, _options) {
        return new NoopLogger_1.NoopLogger();
      }
    };
    exports2.NoopLoggerProvider = NoopLoggerProvider;
    exports2.NOOP_LOGGER_PROVIDER = new NoopLoggerProvider();
  }
});

// node_modules/@opentelemetry/api-logs/build/src/ProxyLogger.js
var require_ProxyLogger = __commonJS({
  "node_modules/@opentelemetry/api-logs/build/src/ProxyLogger.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ProxyLogger = void 0;
    var NoopLogger_1 = require_NoopLogger();
    var ProxyLogger = class {
      constructor(provider, name, version, options) {
        this._provider = provider;
        this.name = name;
        this.version = version;
        this.options = options;
      }
      /**
       * Emit a log record. This method should only be used by log appenders.
       *
       * @param logRecord
       */
      emit(logRecord) {
        this._getLogger().emit(logRecord);
      }
      enabled(options) {
        return this._getLogger().enabled(options);
      }
      /**
       * Try to get a logger from the proxy logger provider.
       * If the proxy logger provider has no delegate, return a noop logger.
       */
      _getLogger() {
        if (this._delegate) {
          return this._delegate;
        }
        const logger = this._provider._getDelegateLogger(this.name, this.version, this.options);
        if (!logger) {
          return NoopLogger_1.NOOP_LOGGER;
        }
        this._delegate = logger;
        return this._delegate;
      }
    };
    exports2.ProxyLogger = ProxyLogger;
  }
});

// node_modules/@opentelemetry/api-logs/build/src/ProxyLoggerProvider.js
var require_ProxyLoggerProvider = __commonJS({
  "node_modules/@opentelemetry/api-logs/build/src/ProxyLoggerProvider.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ProxyLoggerProvider = void 0;
    var NoopLoggerProvider_1 = require_NoopLoggerProvider();
    var ProxyLogger_1 = require_ProxyLogger();
    var ProxyLoggerProvider = class {
      getLogger(name, version, options) {
        var _a;
        return (_a = this._getDelegateLogger(name, version, options)) !== null && _a !== void 0 ? _a : new ProxyLogger_1.ProxyLogger(this, name, version, options);
      }
      /**
       * Get the delegate logger provider.
       * Used by tests only.
       * @internal
       */
      _getDelegate() {
        var _a;
        return (_a = this._delegate) !== null && _a !== void 0 ? _a : NoopLoggerProvider_1.NOOP_LOGGER_PROVIDER;
      }
      /**
       * Set the delegate logger provider
       * @internal
       */
      _setDelegate(delegate) {
        this._delegate = delegate;
      }
      /**
       * @internal
       */
      _getDelegateLogger(name, version, options) {
        var _a;
        return (_a = this._delegate) === null || _a === void 0 ? void 0 : _a.getLogger(name, version, options);
      }
    };
    exports2.ProxyLoggerProvider = ProxyLoggerProvider;
  }
});

// node_modules/@opentelemetry/api-logs/build/src/api/logs.js
var require_logs = __commonJS({
  "node_modules/@opentelemetry/api-logs/build/src/api/logs.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.LogsAPI = void 0;
    var global_utils_1 = require_global_utils();
    var NoopLoggerProvider_1 = require_NoopLoggerProvider();
    var ProxyLoggerProvider_1 = require_ProxyLoggerProvider();
    var LogsAPI = class _LogsAPI {
      constructor() {
        this._proxyLoggerProvider = new ProxyLoggerProvider_1.ProxyLoggerProvider();
      }
      static getInstance() {
        if (!this._instance) {
          this._instance = new _LogsAPI();
        }
        return this._instance;
      }
      setGlobalLoggerProvider(provider) {
        if (global_utils_1._global[global_utils_1.GLOBAL_LOGS_API_KEY]) {
          return this.getLoggerProvider();
        }
        global_utils_1._global[global_utils_1.GLOBAL_LOGS_API_KEY] = (0, global_utils_1.makeGetter)(global_utils_1.API_BACKWARDS_COMPATIBILITY_VERSION, provider, NoopLoggerProvider_1.NOOP_LOGGER_PROVIDER);
        this._proxyLoggerProvider._setDelegate(provider);
        return provider;
      }
      /**
       * Returns the global logger provider.
       *
       * @returns LoggerProvider
       */
      getLoggerProvider() {
        var _a, _b;
        return (_b = (_a = global_utils_1._global[global_utils_1.GLOBAL_LOGS_API_KEY]) === null || _a === void 0 ? void 0 : _a.call(global_utils_1._global, global_utils_1.API_BACKWARDS_COMPATIBILITY_VERSION)) !== null && _b !== void 0 ? _b : this._proxyLoggerProvider;
      }
      /**
       * Returns a Logger, creating one if one with the given name, version,
       * schemaUrl, and attributes is not already created.
       *
       * Getting a Logger may be expensive, especially when `attributes` are
       * provided. Reuse Logger instances where possible instead of calling
       * `getLogger()` on hot paths.
       *
       * @param name The name of the logger or instrumentation library.
       * @param version The version of the logger or instrumentation library.
       * @param options The options of the logger or instrumentation library.
       * @returns {@link Logger}
       */
      getLogger(name, version, options) {
        return this.getLoggerProvider().getLogger(name, version, options);
      }
      /** Remove the global logger provider */
      disable() {
        delete global_utils_1._global[global_utils_1.GLOBAL_LOGS_API_KEY];
        this._proxyLoggerProvider = new ProxyLoggerProvider_1.ProxyLoggerProvider();
      }
    };
    exports2.LogsAPI = LogsAPI;
  }
});

// node_modules/@opentelemetry/api-logs/build/src/index.js
var require_src6 = __commonJS({
  "node_modules/@opentelemetry/api-logs/build/src/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.logs = exports2.createNoopLogger = exports2.SeverityNumber = void 0;
    var LogRecord_1 = require_LogRecord();
    Object.defineProperty(exports2, "SeverityNumber", { enumerable: true, get: function() {
      return LogRecord_1.SeverityNumber;
    } });
    var NoopLogger_1 = require_NoopLogger();
    Object.defineProperty(exports2, "createNoopLogger", { enumerable: true, get: function() {
      return NoopLogger_1.createNoopLogger;
    } });
    var logs_1 = require_logs();
    exports2.logs = logs_1.LogsAPI.getInstance();
  }
});

// node_modules/@opentelemetry/instrumentation/build/src/autoLoaderUtils.js
var require_autoLoaderUtils = __commonJS({
  "node_modules/@opentelemetry/instrumentation/build/src/autoLoaderUtils.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.disableInstrumentations = exports2.enableInstrumentations = void 0;
    function enableInstrumentations(instrumentations, tracerProvider, meterProvider, loggerProvider) {
      for (let i = 0, j = instrumentations.length; i < j; i++) {
        const instrumentation = instrumentations[i];
        if (tracerProvider) {
          instrumentation.setTracerProvider(tracerProvider);
        }
        if (meterProvider) {
          instrumentation.setMeterProvider(meterProvider);
        }
        if (loggerProvider && instrumentation.setLoggerProvider) {
          instrumentation.setLoggerProvider(loggerProvider);
        }
        if (!instrumentation.getConfig().enabled) {
          instrumentation.enable();
        }
      }
    }
    exports2.enableInstrumentations = enableInstrumentations;
    function disableInstrumentations(instrumentations) {
      instrumentations.forEach((instrumentation) => instrumentation.disable());
    }
    exports2.disableInstrumentations = disableInstrumentations;
  }
});

// node_modules/@opentelemetry/instrumentation/build/src/autoLoader.js
var require_autoLoader = __commonJS({
  "node_modules/@opentelemetry/instrumentation/build/src/autoLoader.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.registerInstrumentations = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var api_logs_1 = require_src6();
    var autoLoaderUtils_1 = require_autoLoaderUtils();
    function registerInstrumentations2(options) {
      const tracerProvider = options.tracerProvider || api_1.trace.getTracerProvider();
      const meterProvider = options.meterProvider || api_1.metrics.getMeterProvider();
      const loggerProvider = options.loggerProvider || api_logs_1.logs.getLoggerProvider();
      const instrumentations = options.instrumentations?.flat() ?? [];
      (0, autoLoaderUtils_1.enableInstrumentations)(instrumentations, tracerProvider, meterProvider, loggerProvider);
      return () => {
        (0, autoLoaderUtils_1.disableInstrumentations)(instrumentations);
      };
    }
    exports2.registerInstrumentations = registerInstrumentations2;
  }
});

// node_modules/@opentelemetry/instrumentation/build/src/semver.js
var require_semver = __commonJS({
  "node_modules/@opentelemetry/instrumentation/build/src/semver.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.satisfies = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var VERSION_REGEXP = /^(?:v)?(?<version>(?<major>0|[1-9]\d*)\.(?<minor>0|[1-9]\d*)\.(?<patch>0|[1-9]\d*))(?:-(?<prerelease>(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+(?<build>[0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
    var RANGE_REGEXP = /^(?<op><|>|=|==|<=|>=|~|\^|~>)?\s*(?:v)?(?<version>(?<major>x|X|\*|0|[1-9]\d*)(?:\.(?<minor>x|X|\*|0|[1-9]\d*))?(?:\.(?<patch>x|X|\*|0|[1-9]\d*))?)(?:-(?<prerelease>(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+(?<build>[0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
    var operatorResMap = {
      ">": [1],
      ">=": [0, 1],
      "=": [0],
      "<=": [-1, 0],
      "<": [-1],
      "!=": [-1, 1]
    };
    function satisfies(version, range, options) {
      if (!_validateVersion(version)) {
        api_1.diag.error(`Invalid version: ${version}`);
        return false;
      }
      if (!range) {
        return true;
      }
      range = range.replace(/([<>=~^]+)\s+/g, "$1");
      const parsedVersion = _parseVersion(version);
      if (!parsedVersion) {
        return false;
      }
      const allParsedRanges = [];
      const checkResult = _doSatisfies(parsedVersion, range, allParsedRanges, options);
      if (checkResult && !options?.includePrerelease) {
        return _doPreleaseCheck(parsedVersion, allParsedRanges);
      }
      return checkResult;
    }
    exports2.satisfies = satisfies;
    function _validateVersion(version) {
      return typeof version === "string" && VERSION_REGEXP.test(version);
    }
    function _doSatisfies(parsedVersion, range, allParsedRanges, options) {
      if (range.includes("||")) {
        const ranges = range.trim().split("||");
        for (const r of ranges) {
          if (_checkRange(parsedVersion, r, allParsedRanges, options)) {
            return true;
          }
        }
        return false;
      } else if (range.includes(" - ")) {
        range = replaceHyphen(range, options);
      } else if (range.includes(" ")) {
        const ranges = range.trim().replace(/\s{2,}/g, " ").split(" ");
        for (const r of ranges) {
          if (!_checkRange(parsedVersion, r, allParsedRanges, options)) {
            return false;
          }
        }
        return true;
      }
      return _checkRange(parsedVersion, range, allParsedRanges, options);
    }
    function _checkRange(parsedVersion, range, allParsedRanges, options) {
      range = _normalizeRange(range, options);
      if (range.includes(" ")) {
        return _doSatisfies(parsedVersion, range, allParsedRanges, options);
      } else {
        const parsedRange = _parseRange(range);
        allParsedRanges.push(parsedRange);
        return _satisfies(parsedVersion, parsedRange);
      }
    }
    function _satisfies(parsedVersion, parsedRange) {
      if (parsedRange.invalid) {
        return false;
      }
      if (!parsedRange.version || _isWildcard(parsedRange.version)) {
        return true;
      }
      let comparisonResult = _compareVersionSegments(parsedVersion.versionSegments || [], parsedRange.versionSegments || []);
      if (comparisonResult === 0) {
        const versionPrereleaseSegments = parsedVersion.prereleaseSegments || [];
        const rangePrereleaseSegments = parsedRange.prereleaseSegments || [];
        if (!versionPrereleaseSegments.length && !rangePrereleaseSegments.length) {
          comparisonResult = 0;
        } else if (!versionPrereleaseSegments.length && rangePrereleaseSegments.length) {
          comparisonResult = 1;
        } else if (versionPrereleaseSegments.length && !rangePrereleaseSegments.length) {
          comparisonResult = -1;
        } else {
          comparisonResult = _compareVersionSegments(versionPrereleaseSegments, rangePrereleaseSegments);
        }
      }
      return operatorResMap[parsedRange.op]?.includes(comparisonResult);
    }
    function _doPreleaseCheck(parsedVersion, allParsedRanges) {
      if (parsedVersion.prerelease) {
        return allParsedRanges.some((r) => r.prerelease && r.version === parsedVersion.version);
      }
      return true;
    }
    function _normalizeRange(range, options) {
      range = range.trim();
      range = replaceCaret(range, options);
      range = replaceTilde(range);
      range = replaceXRange(range, options);
      range = range.trim();
      return range;
    }
    function isX(id) {
      return !id || id.toLowerCase() === "x" || id === "*";
    }
    function _parseVersion(versionString) {
      const match = versionString.match(VERSION_REGEXP);
      if (!match) {
        api_1.diag.error(`Invalid version: ${versionString}`);
        return void 0;
      }
      const version = match.groups.version;
      const prerelease = match.groups.prerelease;
      const build = match.groups.build;
      const versionSegments = version.split(".");
      const prereleaseSegments = prerelease?.split(".");
      return {
        op: void 0,
        version,
        versionSegments,
        versionSegmentCount: versionSegments.length,
        prerelease,
        prereleaseSegments,
        prereleaseSegmentCount: prereleaseSegments ? prereleaseSegments.length : 0,
        build
      };
    }
    function _parseRange(rangeString) {
      if (!rangeString) {
        return {};
      }
      const match = rangeString.match(RANGE_REGEXP);
      if (!match) {
        api_1.diag.error(`Invalid range: ${rangeString}`);
        return {
          invalid: true
        };
      }
      let op = match.groups.op;
      const version = match.groups.version;
      const prerelease = match.groups.prerelease;
      const build = match.groups.build;
      const versionSegments = version.split(".");
      const prereleaseSegments = prerelease?.split(".");
      if (op === "==") {
        op = "=";
      }
      return {
        op: op || "=",
        version,
        versionSegments,
        versionSegmentCount: versionSegments.length,
        prerelease,
        prereleaseSegments,
        prereleaseSegmentCount: prereleaseSegments ? prereleaseSegments.length : 0,
        build
      };
    }
    function _isWildcard(s) {
      return s === "*" || s === "x" || s === "X";
    }
    function _parseVersionString(v) {
      const n = parseInt(v, 10);
      return isNaN(n) ? v : n;
    }
    function _normalizeVersionType(a, b) {
      if (typeof a === typeof b) {
        if (typeof a === "number") {
          return [a, b];
        } else if (typeof a === "string") {
          return [a, b];
        } else {
          throw new Error("Version segments can only be strings or numbers");
        }
      } else {
        return [String(a), String(b)];
      }
    }
    function _compareVersionStrings(v1, v2) {
      if (_isWildcard(v1) || _isWildcard(v2)) {
        return 0;
      }
      const [parsedV1, parsedV2] = _normalizeVersionType(_parseVersionString(v1), _parseVersionString(v2));
      if (parsedV1 > parsedV2) {
        return 1;
      } else if (parsedV1 < parsedV2) {
        return -1;
      }
      return 0;
    }
    function _compareVersionSegments(v1, v2) {
      for (let i = 0; i < Math.max(v1.length, v2.length); i++) {
        const res = _compareVersionStrings(v1[i] || "0", v2[i] || "0");
        if (res !== 0) {
          return res;
        }
      }
      return 0;
    }
    var LETTERDASHNUMBER = "[a-zA-Z0-9-]";
    var NUMERICIDENTIFIER = "0|[1-9]\\d*";
    var NONNUMERICIDENTIFIER = `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`;
    var GTLT = "((?:<|>)?=?)";
    var PRERELEASEIDENTIFIER = `(?:${NUMERICIDENTIFIER}|${NONNUMERICIDENTIFIER})`;
    var PRERELEASE = `(?:-(${PRERELEASEIDENTIFIER}(?:\\.${PRERELEASEIDENTIFIER})*))`;
    var BUILDIDENTIFIER = `${LETTERDASHNUMBER}+`;
    var BUILD = `(?:\\+(${BUILDIDENTIFIER}(?:\\.${BUILDIDENTIFIER})*))`;
    var XRANGEIDENTIFIER = `${NUMERICIDENTIFIER}|x|X|\\*`;
    var XRANGEPLAIN = `[v=\\s]*(${XRANGEIDENTIFIER})(?:\\.(${XRANGEIDENTIFIER})(?:\\.(${XRANGEIDENTIFIER})(?:${PRERELEASE})?${BUILD}?)?)?`;
    var XRANGE = `^${GTLT}\\s*${XRANGEPLAIN}$`;
    var XRANGE_REGEXP = new RegExp(XRANGE);
    var HYPHENRANGE = `^\\s*(${XRANGEPLAIN})\\s+-\\s+(${XRANGEPLAIN})\\s*$`;
    var HYPHENRANGE_REGEXP = new RegExp(HYPHENRANGE);
    var LONETILDE = "(?:~>?)";
    var TILDE = `^${LONETILDE}${XRANGEPLAIN}$`;
    var TILDE_REGEXP = new RegExp(TILDE);
    var LONECARET = "(?:\\^)";
    var CARET = `^${LONECARET}${XRANGEPLAIN}$`;
    var CARET_REGEXP = new RegExp(CARET);
    function replaceTilde(comp) {
      const r = TILDE_REGEXP;
      return comp.replace(r, (_, M, m, p, pr) => {
        let ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = `>=${M}.0.0 <${+M + 1}.0.0-0`;
        } else if (isX(p)) {
          ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`;
        } else if (pr) {
          ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
        } else {
          ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
        }
        return ret;
      });
    }
    function replaceCaret(comp, options) {
      const r = CARET_REGEXP;
      const z = options?.includePrerelease ? "-0" : "";
      return comp.replace(r, (_, M, m, p, pr) => {
        let ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
        } else if (isX(p)) {
          if (M === "0") {
            ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
          } else {
            ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
          }
        } else if (pr) {
          if (M === "0") {
            if (m === "0") {
              ret = `>=${M}.${m}.${p}-${pr} <${M}.${m}.${+p + 1}-0`;
            } else {
              ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
            }
          } else {
            ret = `>=${M}.${m}.${p}-${pr} <${+M + 1}.0.0-0`;
          }
        } else {
          if (M === "0") {
            if (m === "0") {
              ret = `>=${M}.${m}.${p}${z} <${M}.${m}.${+p + 1}-0`;
            } else {
              ret = `>=${M}.${m}.${p}${z} <${M}.${+m + 1}.0-0`;
            }
          } else {
            ret = `>=${M}.${m}.${p} <${+M + 1}.0.0-0`;
          }
        }
        return ret;
      });
    }
    function replaceXRange(comp, options) {
      const r = XRANGE_REGEXP;
      return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
        const xM = isX(M);
        const xm = xM || isX(m);
        const xp = xm || isX(p);
        const anyX = xp;
        if (gtlt === "=" && anyX) {
          gtlt = "";
        }
        pr = options?.includePrerelease ? "-0" : "";
        if (xM) {
          if (gtlt === ">" || gtlt === "<") {
            ret = "<0.0.0-0";
          } else {
            ret = "*";
          }
        } else if (gtlt && anyX) {
          if (xm) {
            m = 0;
          }
          p = 0;
          if (gtlt === ">") {
            gtlt = ">=";
            if (xm) {
              M = +M + 1;
              m = 0;
              p = 0;
            } else {
              m = +m + 1;
              p = 0;
            }
          } else if (gtlt === "<=") {
            gtlt = "<";
            if (xm) {
              M = +M + 1;
            } else {
              m = +m + 1;
            }
          }
          if (gtlt === "<") {
            pr = "-0";
          }
          ret = `${gtlt + M}.${m}.${p}${pr}`;
        } else if (xm) {
          ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
        } else if (xp) {
          ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`;
        }
        return ret;
      });
    }
    function replaceHyphen(comp, options) {
      const r = HYPHENRANGE_REGEXP;
      return comp.replace(r, (_, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr) => {
        if (isX(fM)) {
          from = "";
        } else if (isX(fm)) {
          from = `>=${fM}.0.0${options?.includePrerelease ? "-0" : ""}`;
        } else if (isX(fp)) {
          from = `>=${fM}.${fm}.0${options?.includePrerelease ? "-0" : ""}`;
        } else if (fpr) {
          from = `>=${from}`;
        } else {
          from = `>=${from}${options?.includePrerelease ? "-0" : ""}`;
        }
        if (isX(tM)) {
          to = "";
        } else if (isX(tm)) {
          to = `<${+tM + 1}.0.0-0`;
        } else if (isX(tp)) {
          to = `<${tM}.${+tm + 1}.0-0`;
        } else if (tpr) {
          to = `<=${tM}.${tm}.${tp}-${tpr}`;
        } else if (options?.includePrerelease) {
          to = `<${tM}.${tm}.${+tp + 1}-0`;
        } else {
          to = `<=${to}`;
        }
        return `${from} ${to}`.trim();
      });
    }
  }
});

// node_modules/@opentelemetry/instrumentation/build/src/shimmer.js
var require_shimmer = __commonJS({
  "node_modules/@opentelemetry/instrumentation/build/src/shimmer.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.massUnwrap = exports2.unwrap = exports2.massWrap = exports2.wrap = void 0;
    var logger = console.error.bind(console);
    function defineProperty(obj, name, value) {
      const enumerable = !!obj[name] && Object.prototype.propertyIsEnumerable.call(obj, name);
      Object.defineProperty(obj, name, {
        configurable: true,
        enumerable,
        writable: true,
        value
      });
    }
    var wrap = (nodule, name, wrapper) => {
      if (!nodule || !nodule[name]) {
        logger("no original function " + String(name) + " to wrap");
        return;
      }
      if (!wrapper) {
        logger("no wrapper function");
        logger(new Error().stack);
        return;
      }
      const original = nodule[name];
      if (typeof original !== "function" || typeof wrapper !== "function") {
        logger("original object and wrapper must be functions");
        return;
      }
      const wrapped = wrapper(original, name);
      defineProperty(wrapped, "__original", original);
      defineProperty(wrapped, "__unwrap", () => {
        if (nodule[name] === wrapped) {
          defineProperty(nodule, name, original);
        }
      });
      defineProperty(wrapped, "__wrapped", true);
      defineProperty(nodule, name, wrapped);
      return wrapped;
    };
    exports2.wrap = wrap;
    var massWrap = (nodules, names, wrapper) => {
      if (!nodules) {
        logger("must provide one or more modules to patch");
        logger(new Error().stack);
        return;
      } else if (!Array.isArray(nodules)) {
        nodules = [nodules];
      }
      if (!(names && Array.isArray(names))) {
        logger("must provide one or more functions to wrap on modules");
        return;
      }
      nodules.forEach((nodule) => {
        names.forEach((name) => {
          (0, exports2.wrap)(nodule, name, wrapper);
        });
      });
    };
    exports2.massWrap = massWrap;
    var unwrap = (nodule, name) => {
      if (!nodule || !nodule[name]) {
        logger("no function to unwrap.");
        logger(new Error().stack);
        return;
      }
      const wrapped = nodule[name];
      if (!wrapped.__unwrap) {
        logger("no original to unwrap to -- has " + String(name) + " already been unwrapped?");
      } else {
        wrapped.__unwrap();
        return;
      }
    };
    exports2.unwrap = unwrap;
    var massUnwrap = (nodules, names) => {
      if (!nodules) {
        logger("must provide one or more modules to patch");
        logger(new Error().stack);
        return;
      } else if (!Array.isArray(nodules)) {
        nodules = [nodules];
      }
      if (!(names && Array.isArray(names))) {
        logger("must provide one or more functions to unwrap on modules");
        return;
      }
      nodules.forEach((nodule) => {
        names.forEach((name) => {
          (0, exports2.unwrap)(nodule, name);
        });
      });
    };
    exports2.massUnwrap = massUnwrap;
    function shimmer(options) {
      if (options && options.logger) {
        if (typeof options.logger !== "function") {
          logger("new logger isn't a function, not replacing");
        } else {
          logger = options.logger;
        }
      }
    }
    exports2.default = shimmer;
    shimmer.wrap = exports2.wrap;
    shimmer.massWrap = exports2.massWrap;
    shimmer.unwrap = exports2.unwrap;
    shimmer.massUnwrap = exports2.massUnwrap;
  }
});

// node_modules/@opentelemetry/instrumentation/build/src/instrumentation.js
var require_instrumentation = __commonJS({
  "node_modules/@opentelemetry/instrumentation/build/src/instrumentation.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.InstrumentationAbstract = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var api_logs_1 = require_src6();
    var shimmer = require_shimmer();
    var InstrumentationAbstract = class {
      _config = {};
      _tracer;
      _meter;
      _logger;
      _diag;
      instrumentationName;
      instrumentationVersion;
      constructor(instrumentationName, instrumentationVersion, config) {
        this.instrumentationName = instrumentationName;
        this.instrumentationVersion = instrumentationVersion;
        this.setConfig(config);
        this._diag = api_1.diag.createComponentLogger({
          namespace: instrumentationName
        });
        this._tracer = api_1.trace.getTracer(instrumentationName, instrumentationVersion);
        this._meter = api_1.metrics.getMeter(instrumentationName, instrumentationVersion);
        this._logger = api_logs_1.logs.getLogger(instrumentationName, instrumentationVersion);
        this._updateMetricInstruments();
      }
      /* Api to wrap instrumented method */
      _wrap = shimmer.wrap;
      /* Api to unwrap instrumented methods */
      _unwrap = shimmer.unwrap;
      /* Api to mass wrap instrumented method */
      _massWrap = shimmer.massWrap;
      /* Api to mass unwrap instrumented methods */
      _massUnwrap = shimmer.massUnwrap;
      /* Returns meter */
      get meter() {
        return this._meter;
      }
      /**
       * Sets MeterProvider to this plugin
       * @param meterProvider
       */
      setMeterProvider(meterProvider) {
        this._meter = meterProvider.getMeter(this.instrumentationName, this.instrumentationVersion);
        this._updateMetricInstruments();
      }
      /* Returns logger */
      get logger() {
        return this._logger;
      }
      /**
       * Sets LoggerProvider to this plugin
       * @param loggerProvider
       */
      setLoggerProvider(loggerProvider) {
        this._logger = loggerProvider.getLogger(this.instrumentationName, this.instrumentationVersion);
      }
      /**
       * @experimental
       *
       * Get module definitions defined by {@link init}.
       * This can be used for experimental compile-time instrumentation.
       *
       * @returns an array of {@link InstrumentationModuleDefinition}
       */
      getModuleDefinitions() {
        const initResult = this.init() ?? [];
        if (!Array.isArray(initResult)) {
          return [initResult];
        }
        return initResult;
      }
      /**
       * Sets the new metric instruments with the current Meter.
       */
      _updateMetricInstruments() {
        return;
      }
      /* Returns InstrumentationConfig */
      getConfig() {
        return this._config;
      }
      /**
       * Sets InstrumentationConfig to this plugin
       * @param config
       */
      setConfig(config) {
        this._config = {
          enabled: true,
          ...config
        };
      }
      /**
       * Sets TracerProvider to this plugin
       * @param tracerProvider
       */
      setTracerProvider(tracerProvider) {
        this._tracer = tracerProvider.getTracer(this.instrumentationName, this.instrumentationVersion);
      }
      /* Returns tracer */
      get tracer() {
        return this._tracer;
      }
      /**
       * Execute span customization hook, if configured, and log any errors.
       * Any semantics of the trigger and info are defined by the specific instrumentation.
       * @param hookHandler The optional hook handler which the user has configured via instrumentation config
       * @param triggerName The name of the trigger for executing the hook for logging purposes
       * @param span The span to which the hook should be applied
       * @param info The info object to be passed to the hook, with useful data the hook may use
       */
      _runSpanCustomizationHook(hookHandler, triggerName, span, info) {
        if (!hookHandler) {
          return;
        }
        try {
          hookHandler(span, info);
        } catch (e) {
          this._diag.error("Error running span customization hook due to exception in handler", { triggerName }, e);
        }
      }
    };
    exports2.InstrumentationAbstract = InstrumentationAbstract;
  }
});

// node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/ms/index.js"(exports2, module2) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module2.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// node_modules/debug/src/common.js
var require_common = __commonJS({
  "node_modules/debug/src/common.js"(exports2, module2) {
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args) {
          if (!debug.enabled) {
            return;
          }
          const self2 = debug;
          const curr = Number(/* @__PURE__ */ new Date());
          const ms = curr - (prevTime || curr);
          self2.diff = ms;
          self2.prev = prevTime;
          self2.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self2, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self2, args);
          const logFn = self2.log || createDebug.log;
          logFn.apply(self2, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy;
        Object.defineProperty(debug, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v) => {
            enableOverride = v;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug);
        }
        return debug;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        const split = (typeof namespaces === "string" ? namespaces : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
        for (const ns of split) {
          if (ns[0] === "-") {
            createDebug.skips.push(ns.slice(1));
          } else {
            createDebug.names.push(ns);
          }
        }
      }
      function matchesTemplate(search, template) {
        let searchIndex = 0;
        let templateIndex = 0;
        let starIndex = -1;
        let matchIndex = 0;
        while (searchIndex < search.length) {
          if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === "*")) {
            if (template[templateIndex] === "*") {
              starIndex = templateIndex;
              matchIndex = searchIndex;
              templateIndex++;
            } else {
              searchIndex++;
              templateIndex++;
            }
          } else if (starIndex !== -1) {
            templateIndex = starIndex + 1;
            matchIndex++;
            searchIndex = matchIndex;
          } else {
            return false;
          }
        }
        while (templateIndex < template.length && template[templateIndex] === "*") {
          templateIndex++;
        }
        return templateIndex === template.length;
      }
      function disable() {
        const namespaces = [
          ...createDebug.names,
          ...createDebug.skips.map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name) {
        for (const skip of createDebug.skips) {
          if (matchesTemplate(name, skip)) {
            return false;
          }
        }
        for (const ns of createDebug.names) {
          if (matchesTemplate(name, ns)) {
            return true;
          }
        }
        return false;
      }
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module2.exports = setup;
  }
});

// node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/debug/src/browser.js"(exports2, module2) {
    exports2.formatArgs = formatArgs;
    exports2.save = save;
    exports2.load = load;
    exports2.useColors = useColors;
    exports2.storage = localstorage();
    exports2.destroy = /* @__PURE__ */ (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports2.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      let m;
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module2.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    exports2.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports2.storage.setItem("debug", namespaces);
        } else {
          exports2.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r;
      try {
        r = exports2.storage.getItem("debug") || exports2.storage.getItem("DEBUG");
      } catch (error) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module2.exports = require_common()(exports2);
    var { formatters } = module2.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// node_modules/has-flag/index.js
var require_has_flag = __commonJS({
  "node_modules/has-flag/index.js"(exports2, module2) {
    "use strict";
    module2.exports = (flag, argv = process.argv) => {
      const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
      const position = argv.indexOf(prefix + flag);
      const terminatorPosition = argv.indexOf("--");
      return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
    };
  }
});

// node_modules/supports-color/index.js
var require_supports_color = __commonJS({
  "node_modules/supports-color/index.js"(exports2, module2) {
    "use strict";
    var os = require("os");
    var tty = require("tty");
    var hasFlag = require_has_flag();
    var { env } = process;
    var forceColor;
    if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
      forceColor = 0;
    } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
      forceColor = 1;
    }
    if ("FORCE_COLOR" in env) {
      if (env.FORCE_COLOR === "true") {
        forceColor = 1;
      } else if (env.FORCE_COLOR === "false") {
        forceColor = 0;
      } else {
        forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
      }
    }
    function translateLevel(level) {
      if (level === 0) {
        return false;
      }
      return {
        level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
      };
    }
    function supportsColor(haveStream, streamIsTTY) {
      if (forceColor === 0) {
        return 0;
      }
      if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
        return 3;
      }
      if (hasFlag("color=256")) {
        return 2;
      }
      if (haveStream && !streamIsTTY && forceColor === void 0) {
        return 0;
      }
      const min = forceColor || 0;
      if (env.TERM === "dumb") {
        return min;
      }
      if (process.platform === "win32") {
        const osRelease = os.release().split(".");
        if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
          return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }
        return 1;
      }
      if ("CI" in env) {
        if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
          return 1;
        }
        return min;
      }
      if ("TEAMCITY_VERSION" in env) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
      }
      if (env.COLORTERM === "truecolor") {
        return 3;
      }
      if ("TERM_PROGRAM" in env) {
        const version = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (env.TERM_PROGRAM) {
          case "iTerm.app":
            return version >= 3 ? 3 : 2;
          case "Apple_Terminal":
            return 2;
        }
      }
      if (/-256(color)?$/i.test(env.TERM)) {
        return 2;
      }
      if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
        return 1;
      }
      if ("COLORTERM" in env) {
        return 1;
      }
      return min;
    }
    function getSupportLevel(stream) {
      const level = supportsColor(stream, stream && stream.isTTY);
      return translateLevel(level);
    }
    module2.exports = {
      supportsColor: getSupportLevel,
      stdout: translateLevel(supportsColor(true, tty.isatty(1))),
      stderr: translateLevel(supportsColor(true, tty.isatty(2)))
    };
  }
});

// node_modules/debug/src/node.js
var require_node4 = __commonJS({
  "node_modules/debug/src/node.js"(exports2, module2) {
    var tty = require("tty");
    var util = require("util");
    exports2.init = init;
    exports2.log = log;
    exports2.formatArgs = formatArgs;
    exports2.save = save;
    exports2.load = load;
    exports2.useColors = useColors;
    exports2.destroy = util.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    );
    exports2.colors = [6, 2, 3, 4, 5, 1];
    try {
      const supportsColor = require_supports_color();
      if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports2.colors = [
          20,
          21,
          26,
          27,
          32,
          33,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          56,
          57,
          62,
          63,
          68,
          69,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          92,
          93,
          98,
          99,
          112,
          113,
          128,
          129,
          134,
          135,
          148,
          149,
          160,
          161,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          171,
          172,
          173,
          178,
          179,
          184,
          185,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          203,
          204,
          205,
          206,
          207,
          208,
          209,
          214,
          215,
          220,
          221
        ];
      }
    } catch (error) {
    }
    exports2.inspectOpts = Object.keys(process.env).filter((key) => {
      return /^debug_/i.test(key);
    }).reduce((obj, key) => {
      const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
        return k.toUpperCase();
      });
      let val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
      } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
      } else if (val === "null") {
        val = null;
      } else {
        val = Number(val);
      }
      obj[prop] = val;
      return obj;
    }, {});
    function useColors() {
      return "colors" in exports2.inspectOpts ? Boolean(exports2.inspectOpts.colors) : tty.isatty(process.stderr.fd);
    }
    function formatArgs(args) {
      const { namespace: name, useColors: useColors2 } = this;
      if (useColors2) {
        const c = this.color;
        const colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
        const prefix = `  ${colorCode};1m${name} \x1B[0m`;
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push(colorCode + "m+" + module2.exports.humanize(this.diff) + "\x1B[0m");
      } else {
        args[0] = getDate() + name + " " + args[0];
      }
    }
    function getDate() {
      if (exports2.inspectOpts.hideDate) {
        return "";
      }
      return (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function log(...args) {
      return process.stderr.write(util.formatWithOptions(exports2.inspectOpts, ...args) + "\n");
    }
    function save(namespaces) {
      if (namespaces) {
        process.env.DEBUG = namespaces;
      } else {
        delete process.env.DEBUG;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function init(debug) {
      debug.inspectOpts = {};
      const keys = Object.keys(exports2.inspectOpts);
      for (let i = 0; i < keys.length; i++) {
        debug.inspectOpts[keys[i]] = exports2.inspectOpts[keys[i]];
      }
    }
    module2.exports = require_common()(exports2);
    var { formatters } = module2.exports;
    formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
    };
    formatters.O = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts);
    };
  }
});

// node_modules/debug/src/index.js
var require_src7 = __commonJS({
  "node_modules/debug/src/index.js"(exports2, module2) {
    if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) {
      module2.exports = require_browser();
    } else {
      module2.exports = require_node4();
    }
  }
});

// node_modules/module-details-from-path/index.js
var require_module_details_from_path = __commonJS({
  "node_modules/module-details-from-path/index.js"(exports2, module2) {
    "use strict";
    var sep = require("path").sep;
    module2.exports = function(file) {
      var segments = file.split(sep);
      var index = segments.lastIndexOf("node_modules");
      if (index === -1) return;
      if (!segments[index + 1]) return;
      var scoped = segments[index + 1][0] === "@";
      var name = scoped ? segments[index + 1] + "/" + segments[index + 2] : segments[index + 1];
      var offset = scoped ? 3 : 2;
      var basedir = "";
      var lastBaseDirSegmentIndex = index + offset - 1;
      for (var i = 0; i <= lastBaseDirSegmentIndex; i++) {
        if (i === lastBaseDirSegmentIndex) {
          basedir += segments[i];
        } else {
          basedir += segments[i] + sep;
        }
      }
      var path = "";
      var lastSegmentIndex = segments.length - 1;
      for (var i2 = index + offset; i2 <= lastSegmentIndex; i2++) {
        if (i2 === lastSegmentIndex) {
          path += segments[i2];
        } else {
          path += segments[i2] + sep;
        }
      }
      return {
        name,
        basedir,
        path
      };
    };
  }
});

// node_modules/require-in-the-middle/index.js
var require_require_in_the_middle = __commonJS({
  "node_modules/require-in-the-middle/index.js"(exports2, module2) {
    "use strict";
    var path = require("path");
    var Module = require("module");
    var debug = require_src7()("require-in-the-middle");
    var moduleDetailsFromPath = require_module_details_from_path();
    module2.exports = Hook;
    module2.exports.Hook = Hook;
    var builtinModules;
    var isCore;
    if (Module.isBuiltin) {
      isCore = Module.isBuiltin;
    } else if (Module.builtinModules) {
      isCore = (moduleName) => {
        if (moduleName.startsWith("node:")) {
          return true;
        }
        if (builtinModules === void 0) {
          builtinModules = new Set(Module.builtinModules);
        }
        return builtinModules.has(moduleName);
      };
    } else {
      throw new Error("'require-in-the-middle' requires Node.js >=v9.3.0 or >=v8.10.0");
    }
    var normalize = /([/\\]index)?(\.js)?$/;
    var ExportsCache = class {
      constructor() {
        this._localCache = /* @__PURE__ */ new Map();
        this._kRitmExports = /* @__PURE__ */ Symbol("RitmExports");
      }
      has(filename, isBuiltin) {
        if (this._localCache.has(filename)) {
          return true;
        } else if (!isBuiltin) {
          const mod = require.cache[filename];
          return !!(mod && this._kRitmExports in mod);
        } else {
          return false;
        }
      }
      get(filename, isBuiltin) {
        const cachedExports = this._localCache.get(filename);
        if (cachedExports !== void 0) {
          return cachedExports;
        } else if (!isBuiltin) {
          const mod = require.cache[filename];
          return mod && mod[this._kRitmExports];
        }
      }
      set(filename, exports3, isBuiltin) {
        if (isBuiltin) {
          this._localCache.set(filename, exports3);
        } else if (filename in require.cache) {
          require.cache[filename][this._kRitmExports] = exports3;
        } else {
          debug('non-core module is unexpectedly not in require.cache: "%s"', filename);
          this._localCache.set(filename, exports3);
        }
      }
    };
    function Hook(modules, options, onrequire) {
      if (this instanceof Hook === false) return new Hook(modules, options, onrequire);
      if (typeof modules === "function") {
        onrequire = modules;
        modules = null;
        options = null;
      } else if (typeof options === "function") {
        onrequire = options;
        options = null;
      }
      if (typeof Module._resolveFilename !== "function") {
        console.error("Error: Expected Module._resolveFilename to be a function (was: %s) - aborting!", typeof Module._resolveFilename);
        console.error("Please report this error as an issue related to Node.js %s at https://github.com/nodejs/require-in-the-middle/issues", process.version);
        return;
      }
      this._cache = new ExportsCache();
      this._unhooked = false;
      this._origRequire = Module.prototype.require;
      const self2 = this;
      const patching = /* @__PURE__ */ new Set();
      const internals = options ? options.internals === true : false;
      const hasWhitelist = Array.isArray(modules);
      debug("registering require hook");
      this._require = Module.prototype.require = function(id) {
        if (self2._unhooked === true) {
          debug("ignoring require call - module is soft-unhooked");
          return self2._origRequire.apply(this, arguments);
        }
        return patchedRequire.call(this, arguments, false);
      };
      if (typeof process.getBuiltinModule === "function") {
        this._origGetBuiltinModule = process.getBuiltinModule;
        this._getBuiltinModule = process.getBuiltinModule = function(id) {
          if (self2._unhooked === true) {
            debug("ignoring process.getBuiltinModule call - module is soft-unhooked");
            return self2._origGetBuiltinModule.apply(this, arguments);
          }
          return patchedRequire.call(this, arguments, true);
        };
      }
      function patchedRequire(args, coreOnly) {
        const id = args[0];
        const core = isCore(id);
        let filename;
        if (core) {
          filename = id;
          if (id.startsWith("node:")) {
            const idWithoutPrefix = id.slice(5);
            if (isCore(idWithoutPrefix)) {
              filename = idWithoutPrefix;
            }
          }
        } else if (coreOnly) {
          debug("call to process.getBuiltinModule with unknown built-in id");
          return self2._origGetBuiltinModule.apply(this, args);
        } else {
          try {
            filename = Module._resolveFilename(id, this);
          } catch (resolveErr) {
            debug('Module._resolveFilename("%s") threw %j, calling original Module.require', id, resolveErr.message);
            return self2._origRequire.apply(this, args);
          }
        }
        let moduleName, basedir;
        debug("processing %s module require('%s'): %s", core === true ? "core" : "non-core", id, filename);
        if (self2._cache.has(filename, core) === true) {
          debug("returning already patched cached module: %s", filename);
          return self2._cache.get(filename, core);
        }
        const isPatching = patching.has(filename);
        if (isPatching === false) {
          patching.add(filename);
        }
        const exports3 = coreOnly ? self2._origGetBuiltinModule.apply(this, args) : self2._origRequire.apply(this, args);
        if (isPatching === true) {
          debug("module is in the process of being patched already - ignoring: %s", filename);
          return exports3;
        }
        patching.delete(filename);
        if (core === true) {
          if (hasWhitelist === true && modules.includes(filename) === false) {
            debug("ignoring core module not on whitelist: %s", filename);
            return exports3;
          }
          moduleName = filename;
        } else if (hasWhitelist === true && modules.includes(filename)) {
          const parsedPath = path.parse(filename);
          moduleName = parsedPath.name;
          basedir = parsedPath.dir;
        } else {
          const stat = moduleDetailsFromPath(filename);
          if (stat === void 0) {
            debug("could not parse filename: %s", filename);
            return exports3;
          }
          moduleName = stat.name;
          basedir = stat.basedir;
          const fullModuleName = resolveModuleName(stat);
          debug("resolved filename to module: %s (id: %s, resolved: %s, basedir: %s)", moduleName, id, fullModuleName, basedir);
          let matchFound = false;
          if (hasWhitelist) {
            if (!id.startsWith(".") && modules.includes(id)) {
              moduleName = id;
              matchFound = true;
            }
            if (!modules.includes(moduleName) && !modules.includes(fullModuleName)) {
              return exports3;
            }
            if (modules.includes(fullModuleName) && fullModuleName !== moduleName) {
              moduleName = fullModuleName;
              matchFound = true;
            }
          }
          if (!matchFound) {
            let res;
            try {
              res = require.resolve(moduleName, { paths: [basedir] });
            } catch (e) {
              debug("could not resolve module: %s", moduleName);
              self2._cache.set(filename, exports3, core);
              return exports3;
            }
            if (res !== filename) {
              if (internals === true) {
                moduleName = moduleName + path.sep + path.relative(basedir, filename);
                debug("preparing to process require of internal file: %s", moduleName);
              } else {
                debug("ignoring require of non-main module file: %s", res);
                self2._cache.set(filename, exports3, core);
                return exports3;
              }
            }
          }
        }
        self2._cache.set(filename, exports3, core);
        debug("calling require hook: %s", moduleName);
        const patchedExports = onrequire(exports3, moduleName, basedir);
        self2._cache.set(filename, patchedExports, core);
        debug("returning module: %s", moduleName);
        return patchedExports;
      }
    }
    Hook.prototype.unhook = function() {
      this._unhooked = true;
      if (this._require === Module.prototype.require) {
        Module.prototype.require = this._origRequire;
        debug("require unhook successful");
      } else {
        debug("require unhook unsuccessful");
      }
      if (process.getBuiltinModule !== void 0) {
        if (this._getBuiltinModule === process.getBuiltinModule) {
          process.getBuiltinModule = this._origGetBuiltinModule;
          debug("process.getBuiltinModule unhook successful");
        } else {
          debug("process.getBuiltinModule unhook unsuccessful");
        }
      }
    };
    function resolveModuleName(stat) {
      const normalizedPath = path.sep !== "/" ? stat.path.split(path.sep).join("/") : stat.path;
      return path.posix.join(stat.name, normalizedPath).replace(normalize, "");
    }
  }
});

// node_modules/@opentelemetry/instrumentation/build/src/platform/node/ModuleNameTrie.js
var require_ModuleNameTrie = __commonJS({
  "node_modules/@opentelemetry/instrumentation/build/src/platform/node/ModuleNameTrie.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ModuleNameTrie = exports2.ModuleNameSeparator = void 0;
    exports2.ModuleNameSeparator = "/";
    var ModuleNameTrieNode = class {
      hooks = [];
      children = /* @__PURE__ */ new Map();
    };
    var ModuleNameTrie = class {
      _trie = new ModuleNameTrieNode();
      _counter = 0;
      /**
       * Insert a module hook into the trie
       *
       * @param {Hooked} hook Hook
       */
      insert(hook) {
        let trieNode = this._trie;
        for (const moduleNamePart of hook.moduleName.split(exports2.ModuleNameSeparator)) {
          let nextNode = trieNode.children.get(moduleNamePart);
          if (!nextNode) {
            nextNode = new ModuleNameTrieNode();
            trieNode.children.set(moduleNamePart, nextNode);
          }
          trieNode = nextNode;
        }
        trieNode.hooks.push({ hook, insertedId: this._counter++ });
      }
      /**
       * Search for matching hooks in the trie
       *
       * @param {string} moduleName Module name
       * @param {boolean} maintainInsertionOrder Whether to return the results in insertion order
       * @param {boolean} fullOnly Whether to return only full matches
       * @returns {Hooked[]} Matching hooks
       */
      search(moduleName, { maintainInsertionOrder, fullOnly } = {}) {
        let trieNode = this._trie;
        const results = [];
        let foundFull = true;
        for (const moduleNamePart of moduleName.split(exports2.ModuleNameSeparator)) {
          const nextNode = trieNode.children.get(moduleNamePart);
          if (!nextNode) {
            foundFull = false;
            break;
          }
          if (!fullOnly) {
            results.push(...nextNode.hooks);
          }
          trieNode = nextNode;
        }
        if (fullOnly && foundFull) {
          results.push(...trieNode.hooks);
        }
        if (results.length === 0) {
          return [];
        }
        if (results.length === 1) {
          return [results[0].hook];
        }
        if (maintainInsertionOrder) {
          results.sort((a, b) => a.insertedId - b.insertedId);
        }
        return results.map(({ hook }) => hook);
      }
    };
    exports2.ModuleNameTrie = ModuleNameTrie;
  }
});

// node_modules/@opentelemetry/instrumentation/build/src/platform/node/RequireInTheMiddleSingleton.js
var require_RequireInTheMiddleSingleton = __commonJS({
  "node_modules/@opentelemetry/instrumentation/build/src/platform/node/RequireInTheMiddleSingleton.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.RequireInTheMiddleSingleton = void 0;
    var require_in_the_middle_1 = require_require_in_the_middle();
    var path = require("path");
    var ModuleNameTrie_1 = require_ModuleNameTrie();
    var isMocha = [
      "afterEach",
      "after",
      "beforeEach",
      "before",
      "describe",
      "it"
    ].every((fn) => {
      return typeof global[fn] === "function";
    });
    var RequireInTheMiddleSingleton = class _RequireInTheMiddleSingleton {
      _moduleNameTrie = new ModuleNameTrie_1.ModuleNameTrie();
      static _instance;
      constructor() {
        this._initialize();
      }
      _initialize() {
        new require_in_the_middle_1.Hook(
          // Intercept all `require` calls; we will filter the matching ones below
          null,
          { internals: true },
          (exports3, name, basedir) => {
            const normalizedModuleName = normalizePathSeparators(name);
            const matches = this._moduleNameTrie.search(normalizedModuleName, {
              maintainInsertionOrder: true,
              // For core modules (e.g. `fs`), do not match on sub-paths (e.g. `fs/promises').
              // This matches the behavior of `require-in-the-middle`.
              // `basedir` is always `undefined` for core modules.
              fullOnly: basedir === void 0
            });
            for (const { onRequire } of matches) {
              exports3 = onRequire(exports3, name, basedir);
            }
            return exports3;
          }
        );
      }
      /**
       * Register a hook with `require-in-the-middle`
       *
       * @param {string} moduleName Module name
       * @param {OnRequireFn} onRequire Hook function
       * @returns {Hooked} Registered hook
       */
      register(moduleName, onRequire) {
        const hooked = { moduleName, onRequire };
        this._moduleNameTrie.insert(hooked);
        return hooked;
      }
      /**
       * Get the `RequireInTheMiddleSingleton` singleton
       *
       * @returns {RequireInTheMiddleSingleton} Singleton of `RequireInTheMiddleSingleton`
       */
      static getInstance() {
        if (isMocha)
          return new _RequireInTheMiddleSingleton();
        return this._instance = this._instance ?? new _RequireInTheMiddleSingleton();
      }
    };
    exports2.RequireInTheMiddleSingleton = RequireInTheMiddleSingleton;
    function normalizePathSeparators(moduleNameOrPath) {
      return path.sep !== ModuleNameTrie_1.ModuleNameSeparator ? moduleNameOrPath.split(path.sep).join(ModuleNameTrie_1.ModuleNameSeparator) : moduleNameOrPath;
    }
  }
});

// node_modules/import-in-the-middle/lib/register.js
var require_register = __commonJS({
  "node_modules/import-in-the-middle/lib/register.js"(exports2) {
    var importHooks = [];
    var binders = /* @__PURE__ */ new WeakMap();
    var legacySetters;
    var legacyGetters;
    var legacyProxyHandler;
    var specifiers = /* @__PURE__ */ new Map();
    var toHook = [];
    function readExport(source, name) {
      if (name === "module.exports" && !Object.hasOwn(source, name)) {
        return source.default;
      }
      return source[name];
    }
    function setExport(target, name, value) {
      return binders.get(target).write(name, value);
    }
    function defineExport(target, name, descriptor) {
      if (!("value" in descriptor)) {
        throw new Error("Getters/setters are not supported for exports property descriptors.");
      }
      return setExport(target, name, descriptor.value);
    }
    var proxyHandler = { defineProperty: defineExport, set: setExport };
    function setLegacyExport(target, name, value) {
      const setter = legacySetters.get(target)?.[name];
      return typeof setter === "function" ? setter(value) : true;
    }
    function getLegacyExport(target, name) {
      if (name === Symbol.toStringTag) return "Module";
      const getter = legacyGetters.get(target)[name];
      if (typeof getter === "function") return getter();
    }
    function defineLegacyExport(target, name, descriptor) {
      if (!("value" in descriptor)) {
        throw new Error("Getters/setters are not supported for exports property descriptors.");
      }
      return setLegacyExport(target, name, descriptor.value);
    }
    function registerLegacy(name, namespace, set, get, specifier) {
      legacySetters ??= /* @__PURE__ */ new WeakMap();
      legacyGetters ??= /* @__PURE__ */ new WeakMap();
      legacyProxyHandler ??= {
        defineProperty: defineLegacyExport,
        get: getLegacyExport,
        set: setLegacyExport
      };
      specifiers.set(name, specifier);
      legacySetters.set(namespace, set);
      legacyGetters.set(namespace, get);
      const proxy = new Proxy(namespace, legacyProxyHandler);
      importHooks.forEach((hook) => hook(name, proxy, specifier));
      toHook.push([name, proxy, specifier]);
    }
    function register(name, binder, specifier, get, legacySpecifier) {
      if (arguments.length === 5) {
        registerLegacy(name, binder, specifier, get, legacySpecifier);
        return;
      }
      const { namespace } = binder;
      specifiers.set(name, specifier);
      binders.set(namespace, binder);
      const proxy = new Proxy(namespace, proxyHandler);
      importHooks.forEach((hook) => hook(name, proxy, specifier));
      toHook.push([name, proxy, specifier]);
    }
    var RETRY_DELAYS = [0, 10, 50];
    var ModuleBinder = class {
      // Mimics a Module namespace object (https://tc39.es/ecma262/#sec-module-namespace-objects).
      namespace = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
      #set = /* @__PURE__ */ Object.create(null);
      #write;
      #overridden;
      #pending;
      /**
       * @param {object} source The wrapped module namespace.
       * @param {string[]} [keys] Export names in wrapper-binding order.
       * @param {(index: number, value: unknown) => void} [write] Assigns a wrapper binding by index.
       * @param {object[]} [sources] Alternate namespaces for star-collision bindings.
       */
      constructor(source, keys, write, sources) {
        this.#write = write;
        if (keys !== void 0) {
          for (let index = 0; index < keys.length; index++) {
            this.#bind(keys[index], index, sources?.[index] ?? source);
          }
        }
      }
      /**
       * Seeds `key` from `source` and installs its proxy accessors. A value that is
       * undefined or throws `ReferenceError` (temporal dead zone during a circular
       * import) is deferred to `flush`; any other throw propagates.
       *
       * @param {string} key The export name.
       * @param {number} index The wrapper binding index.
       * @param {object} source The binding's source namespace.
       * @returns {void}
       */
      #bind(key, index, source) {
        let value;
        try {
          value = readExport(source, key);
          this.#write(index, value);
          this.namespace[key] = value;
        } catch (error) {
          if (!(error instanceof ReferenceError)) throw error;
        }
        if (value === void 0) {
          (this.#pending ??= []).push(this.#makeUpdater(key, index, source));
        }
        this.#set[key] = index;
      }
      /**
       * @param {string | symbol} key The export name.
       * @param {unknown} value The replacement value.
       * @returns {boolean}
       */
      write(key, value) {
        const index = this.#set[key];
        if (index !== void 0) {
          this.#write(index, value);
          if (this.#pending !== void 0) {
            this.#overridden ??= /* @__PURE__ */ Object.create(null);
            this.#overridden[key] = true;
          }
          this.namespace[key] = value;
        }
        return true;
      }
      /**
       * @param {string} key The export name to update.
       * @param {number} index The wrapper binding index.
       * @param {object} source The real module namespace.
       * @returns {() => boolean} Updater returning whether the value is now settled.
       */
      #makeUpdater(key, index, source) {
        return () => {
          if (this.#overridden?.[key] === true) return true;
          try {
            const value = readExport(source, key);
            if (value !== void 0) {
              this.#write(index, value);
              this.namespace[key] = value;
              return true;
            }
            return false;
          } catch (error) {
            if (error instanceof ReferenceError) return false;
            throw error;
          }
        };
      }
      #flushOnce() {
        const pending = this.#pending;
        if (pending === void 0) return;
        let next;
        for (const updater of pending) {
          if (updater() !== true) (next ??= []).push(updater);
        }
        this.#pending = next;
      }
      /**
       * Resolves exports deferred by `bind` (undefined or TDZ at wrapper-eval time).
       * Retries on a microtask, then at `RETRY_DELAYS`, giving up afterwards to avoid
       * unbounded retries. A no-op when nothing was deferred.
       *
       * @returns {void}
       */
      flush() {
        if (this.#pending === void 0) return;
        queueMicrotask(() => {
          this.#flushOnce();
          this.#scheduleRetry(0);
        });
      }
      /**
       * @param {number} attempt Index into `RETRY_DELAYS` for the next retry.
       * @returns {void}
       */
      #scheduleRetry(attempt) {
        if (this.#pending === void 0) return;
        if (attempt >= RETRY_DELAYS.length) {
          this.#pending = void 0;
          return;
        }
        const timer = setTimeout(() => {
          this.#flushOnce();
          this.#scheduleRetry(attempt + 1);
        }, RETRY_DELAYS[attempt]);
        if (timer && typeof timer.unref === "function") timer.unref();
      }
    };
    exports2.register = register;
    exports2.ModuleBinder = ModuleBinder;
    exports2.importHooks = importHooks;
    exports2.specifiers = specifiers;
    exports2.toHook = toHook;
  }
});

// node_modules/import-in-the-middle/index.js
var require_import_in_the_middle = __commonJS({
  "node_modules/import-in-the-middle/index.js"(exports2, module2) {
    var path = require("path");
    var moduleDetailsFromPath = require_module_details_from_path();
    var { fileURLToPath } = require("url");
    var { MessageChannel } = require("worker_threads");
    var { isBuiltin } = require("module");
    if (!isBuiltin) {
      isBuiltin = () => true;
    }
    var {
      importHooks,
      specifiers,
      toHook
    } = require_register();
    function isPackageSpecifier(specifier, baseDir) {
      if (process.platform === "win32" && specifier.includes("/")) baseDir = baseDir.replaceAll(path.sep, "/");
      if (baseDir.endsWith(specifier)) return true;
      const usingTurbopack = process.env.TURBOPACK ?? process.argv.includes("--turbo");
      if (!usingTurbopack) return false;
      const hashSeparator = specifier.lastIndexOf("-");
      return hashSeparator !== -1 && baseDir.endsWith(specifier.slice(0, hashSeparator));
    }
    function addHook(hook) {
      importHooks.push(hook);
      toHook.forEach(([name, namespace, specifier]) => hook(name, namespace, specifier));
    }
    function removeHook(hook) {
      const index = importHooks.indexOf(hook);
      if (index > -1) {
        importHooks.splice(index, 1);
      }
    }
    function callHookFn(hookFn, namespace, name, baseDir) {
      const newDefault = hookFn(namespace, name, baseDir);
      if (newDefault && newDefault !== namespace) {
        if ("default" in namespace) {
          namespace.default = newDefault;
        }
      }
    }
    var sendModulesToLoader;
    function createAddHookMessageChannel() {
      const { port1, port2 } = new MessageChannel();
      let pendingAckCount = 0;
      let resolveFn;
      sendModulesToLoader = (modules) => {
        pendingAckCount++;
        port1.postMessage(modules);
      };
      port1.on("message", () => {
        pendingAckCount--;
        if (resolveFn && pendingAckCount <= 0) {
          resolveFn();
        }
      }).unref();
      function waitForAllMessagesAcknowledged() {
        const timer = setInterval(() => {
        }, 1e3);
        const promise = new Promise((resolve) => {
          resolveFn = resolve;
        }).then(() => {
          clearInterval(timer);
        });
        if (pendingAckCount === 0) {
          resolveFn();
        }
        return promise;
      }
      const addHookMessagePort = port2;
      const registerOptions = { data: { addHookMessagePort, include: [] }, transferList: [addHookMessagePort] };
      return { registerOptions, addHookMessagePort, waitForAllMessagesAcknowledged };
    }
    function Hook(modules, options, hookFn) {
      if (this instanceof Hook === false) return new Hook(modules, options, hookFn);
      if (typeof modules === "function") {
        hookFn = modules;
        modules = null;
        options = null;
      } else if (typeof options === "function") {
        hookFn = options;
        options = null;
      }
      const internals = options ? options.internals === true : false;
      if (sendModulesToLoader && Array.isArray(modules)) {
        sendModulesToLoader(modules);
      }
      this._iitmHook = (name, namespace, specifier) => {
        const loadUrl = name;
        const isNodeUrl = loadUrl.startsWith("node:");
        let filePath, baseDir;
        if (isNodeUrl) {
          const unprefixed = name.slice(5);
          if (isBuiltin(unprefixed)) {
            name = unprefixed;
          }
        } else if (loadUrl.startsWith("file://")) {
          const stackTraceLimit = Error.stackTraceLimit;
          Error.stackTraceLimit = 0;
          try {
            filePath = fileURLToPath(name);
            name = filePath;
          } catch (e) {
          }
          Error.stackTraceLimit = stackTraceLimit;
          if (filePath) {
            const details = moduleDetailsFromPath(filePath);
            if (details) {
              name = details.name;
              baseDir = details.basedir;
            }
          }
        }
        if (modules) {
          for (const matchArg of modules) {
            if (filePath && matchArg === filePath) {
              callHookFn(hookFn, namespace, filePath, void 0);
            } else if (matchArg === name) {
              if (!baseDir) {
                callHookFn(hookFn, namespace, name, baseDir);
              } else if (isPackageSpecifier(specifiers.get(loadUrl), baseDir)) {
                callHookFn(hookFn, namespace, name, baseDir);
              } else if (internals) {
                const internalPath = name + path.sep + path.relative(baseDir, filePath);
                callHookFn(hookFn, namespace, internalPath, baseDir);
              }
            } else if (matchArg === specifier) {
              callHookFn(hookFn, namespace, specifier, baseDir);
            }
          }
        } else {
          callHookFn(hookFn, namespace, name, baseDir);
        }
      };
      addHook(this._iitmHook);
    }
    Hook.prototype.unhook = function() {
      removeHook(this._iitmHook);
    };
    module2.exports = Hook;
    module2.exports.Hook = Hook;
    module2.exports.addHook = addHook;
    module2.exports.removeHook = removeHook;
    module2.exports.createAddHookMessageChannel = createAddHookMessageChannel;
  }
});

// node_modules/@opentelemetry/instrumentation/build/src/utils.js
var require_utils5 = __commonJS({
  "node_modules/@opentelemetry/instrumentation/build/src/utils.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isWrapped = exports2.safeExecuteInTheMiddleAsync = exports2.safeExecuteInTheMiddle = void 0;
    function safeExecuteInTheMiddle(execute, onFinish, preventThrowingError) {
      let error;
      let result;
      try {
        result = execute();
      } catch (e) {
        error = e;
      } finally {
        onFinish(error, result);
        if (error && !preventThrowingError) {
          throw error;
        }
        return result;
      }
    }
    exports2.safeExecuteInTheMiddle = safeExecuteInTheMiddle;
    async function safeExecuteInTheMiddleAsync(execute, onFinish, preventThrowingError) {
      let error;
      let result;
      try {
        result = await execute();
      } catch (e) {
        error = e;
      } finally {
        await onFinish(error, result);
        if (error && !preventThrowingError) {
          throw error;
        }
        return result;
      }
    }
    exports2.safeExecuteInTheMiddleAsync = safeExecuteInTheMiddleAsync;
    function isWrapped(func) {
      return typeof func === "function" && typeof func.__original === "function" && typeof func.__unwrap === "function" && func.__wrapped === true;
    }
    exports2.isWrapped = isWrapped;
  }
});

// node_modules/@opentelemetry/instrumentation/build/src/platform/node/instrumentation.js
var require_instrumentation2 = __commonJS({
  "node_modules/@opentelemetry/instrumentation/build/src/platform/node/instrumentation.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.InstrumentationBase = void 0;
    var path = require("path");
    var util_1 = require("util");
    var semver_1 = require_semver();
    var shimmer_1 = require_shimmer();
    var instrumentation_1 = require_instrumentation();
    var RequireInTheMiddleSingleton_1 = require_RequireInTheMiddleSingleton();
    var import_in_the_middle_1 = require_import_in_the_middle();
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var require_in_the_middle_1 = require_require_in_the_middle();
    var fs_1 = require("fs");
    var utils_1 = require_utils5();
    var InstrumentationBase = class extends instrumentation_1.InstrumentationAbstract {
      _modules;
      _hooks = [];
      _requireInTheMiddleSingleton = RequireInTheMiddleSingleton_1.RequireInTheMiddleSingleton.getInstance();
      _enabled = false;
      constructor(instrumentationName, instrumentationVersion, config) {
        super(instrumentationName, instrumentationVersion, config);
        let modules = this.init();
        if (modules && !Array.isArray(modules)) {
          modules = [modules];
        }
        this._modules = modules || [];
        if (this._config.enabled) {
          this.enable();
        }
      }
      _wrap = (moduleExports, name, wrapper) => {
        if ((0, utils_1.isWrapped)(moduleExports[name])) {
          this._unwrap(moduleExports, name);
        }
        if (!util_1.types.isProxy(moduleExports)) {
          return (0, shimmer_1.wrap)(moduleExports, name, wrapper);
        } else {
          const wrapped = (0, shimmer_1.wrap)(Object.assign({}, moduleExports), name, wrapper);
          Object.defineProperty(moduleExports, name, {
            value: wrapped
          });
          return wrapped;
        }
      };
      _unwrap = (moduleExports, name) => {
        if (!util_1.types.isProxy(moduleExports)) {
          return (0, shimmer_1.unwrap)(moduleExports, name);
        } else {
          return Object.defineProperty(moduleExports, name, {
            value: moduleExports[name]
          });
        }
      };
      _massWrap = (moduleExportsArray, names, wrapper) => {
        if (!moduleExportsArray) {
          api_1.diag.error("must provide one or more modules to patch");
          return;
        } else if (!Array.isArray(moduleExportsArray)) {
          moduleExportsArray = [moduleExportsArray];
        }
        if (!(names && Array.isArray(names))) {
          api_1.diag.error("must provide one or more functions to wrap on modules");
          return;
        }
        moduleExportsArray.forEach((moduleExports) => {
          names.forEach((name) => {
            this._wrap(moduleExports, name, wrapper);
          });
        });
      };
      _massUnwrap = (moduleExportsArray, names) => {
        if (!moduleExportsArray) {
          api_1.diag.error("must provide one or more modules to patch");
          return;
        } else if (!Array.isArray(moduleExportsArray)) {
          moduleExportsArray = [moduleExportsArray];
        }
        if (!(names && Array.isArray(names))) {
          api_1.diag.error("must provide one or more functions to wrap on modules");
          return;
        }
        moduleExportsArray.forEach((moduleExports) => {
          names.forEach((name) => {
            this._unwrap(moduleExports, name);
          });
        });
      };
      _warnOnPreloadedModules() {
        const nodeRequire = globalThis.require;
        if (!nodeRequire?.resolve || !nodeRequire?.cache)
          return;
        this._modules.forEach((module3) => {
          const { name } = module3;
          try {
            const resolvedModule = nodeRequire.resolve(name);
            if (nodeRequire.cache[resolvedModule]?.loaded) {
              this._diag.warn(`Module ${name} has been loaded before ${this.instrumentationName} so it might not work, please initialize it before requiring ${name}`);
            }
          } catch {
          }
        });
      }
      _extractPackageVersion(baseDir) {
        try {
          const json = (0, fs_1.readFileSync)(path.join(baseDir, "package.json"), {
            encoding: "utf8"
          });
          const version = JSON.parse(json).version;
          return typeof version === "string" ? version : void 0;
        } catch {
          api_1.diag.warn("Failed extracting version", baseDir);
        }
        return void 0;
      }
      _onRequire(module3, exports3, name, baseDir) {
        if (!baseDir) {
          if (typeof module3.patch === "function") {
            module3.moduleExports = exports3;
            if (this._enabled) {
              this._diag.debug("Applying instrumentation patch for nodejs core module on require hook", {
                module: module3.name
              });
              return module3.patch(exports3);
            }
          }
          return exports3;
        }
        const version = this._extractPackageVersion(baseDir);
        module3.moduleVersion = version;
        if (module3.name === name) {
          if (isSupported(module3.supportedVersions, version, module3.includePrerelease)) {
            if (typeof module3.patch === "function") {
              module3.moduleExports = exports3;
              if (this._enabled) {
                this._diag.debug("Applying instrumentation patch for module on require hook", {
                  module: module3.name,
                  version: module3.moduleVersion,
                  baseDir
                });
                return module3.patch(exports3, module3.moduleVersion);
              }
            }
          }
          return exports3;
        }
        const files = module3.files ?? [];
        const normalizedName = path.normalize(name);
        const supportedFileInstrumentations = files.filter((f) => f.name === normalizedName && isSupported(f.supportedVersions, version, module3.includePrerelease));
        return supportedFileInstrumentations.reduce((patchedExports, file) => {
          file.moduleExports = patchedExports;
          if (this._enabled) {
            this._diag.debug("Applying instrumentation patch for nodejs module file on require hook", {
              module: module3.name,
              version: module3.moduleVersion,
              fileName: file.name,
              baseDir
            });
            return file.patch(patchedExports, module3.moduleVersion);
          }
          return patchedExports;
        }, exports3);
      }
      enable() {
        if (this._enabled) {
          return;
        }
        this._enabled = true;
        if (this._hooks.length > 0) {
          for (const module3 of this._modules) {
            if (typeof module3.patch === "function" && module3.moduleExports) {
              this._diag.debug("Applying instrumentation patch for nodejs module on instrumentation enabled", {
                module: module3.name,
                version: module3.moduleVersion
              });
              module3.patch(module3.moduleExports, module3.moduleVersion);
            }
            for (const file of module3.files) {
              if (file.moduleExports) {
                this._diag.debug("Applying instrumentation patch for nodejs module file on instrumentation enabled", {
                  module: module3.name,
                  version: module3.moduleVersion,
                  fileName: file.name
                });
                file.patch(file.moduleExports, module3.moduleVersion);
              }
            }
          }
          return;
        }
        this._warnOnPreloadedModules();
        for (const module3 of this._modules) {
          const hookFn = (exports3, name, baseDir) => {
            if (!baseDir && path.isAbsolute(name)) {
              const parsedPath = path.parse(name);
              name = parsedPath.name;
              baseDir = parsedPath.dir;
            }
            return this._onRequire(module3, exports3, name, baseDir);
          };
          const onRequire = (exports3, name, baseDir) => {
            return this._onRequire(module3, exports3, name, baseDir);
          };
          const hook = path.isAbsolute(module3.name) ? new require_in_the_middle_1.Hook([module3.name], { internals: true }, onRequire) : this._requireInTheMiddleSingleton.register(module3.name, onRequire);
          this._hooks.push(hook);
          const esmHook = new import_in_the_middle_1.Hook([module3.name], { internals: true }, hookFn);
          this._hooks.push(esmHook);
        }
      }
      disable() {
        if (!this._enabled) {
          return;
        }
        this._enabled = false;
        for (const module3 of this._modules) {
          if (typeof module3.unpatch === "function" && module3.moduleExports) {
            this._diag.debug("Removing instrumentation patch for nodejs module on instrumentation disabled", {
              module: module3.name,
              version: module3.moduleVersion
            });
            module3.unpatch(module3.moduleExports, module3.moduleVersion);
          }
          for (const file of module3.files) {
            if (file.moduleExports) {
              this._diag.debug("Removing instrumentation patch for nodejs module file on instrumentation disabled", {
                module: module3.name,
                version: module3.moduleVersion,
                fileName: file.name
              });
              file.unpatch(file.moduleExports, module3.moduleVersion);
            }
          }
        }
      }
      isEnabled() {
        return this._enabled;
      }
    };
    exports2.InstrumentationBase = InstrumentationBase;
    function isSupported(supportedVersions, version, includePrerelease) {
      if (typeof version === "undefined") {
        return supportedVersions.includes("*");
      }
      return supportedVersions.some((supportedVersion) => {
        return (0, semver_1.satisfies)(version, supportedVersion, { includePrerelease });
      });
    }
  }
});

// node_modules/@opentelemetry/instrumentation/build/src/platform/node/normalize.js
var require_normalize = __commonJS({
  "node_modules/@opentelemetry/instrumentation/build/src/platform/node/normalize.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.normalize = void 0;
    var path_1 = require("path");
    Object.defineProperty(exports2, "normalize", { enumerable: true, get: function() {
      return path_1.normalize;
    } });
  }
});

// node_modules/@opentelemetry/instrumentation/build/src/platform/node/index.js
var require_node5 = __commonJS({
  "node_modules/@opentelemetry/instrumentation/build/src/platform/node/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.normalize = exports2.InstrumentationBase = void 0;
    var instrumentation_1 = require_instrumentation2();
    Object.defineProperty(exports2, "InstrumentationBase", { enumerable: true, get: function() {
      return instrumentation_1.InstrumentationBase;
    } });
    var normalize_1 = require_normalize();
    Object.defineProperty(exports2, "normalize", { enumerable: true, get: function() {
      return normalize_1.normalize;
    } });
  }
});

// node_modules/@opentelemetry/instrumentation/build/src/platform/index.js
var require_platform4 = __commonJS({
  "node_modules/@opentelemetry/instrumentation/build/src/platform/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.normalize = exports2.InstrumentationBase = void 0;
    var node_1 = require_node5();
    Object.defineProperty(exports2, "InstrumentationBase", { enumerable: true, get: function() {
      return node_1.InstrumentationBase;
    } });
    Object.defineProperty(exports2, "normalize", { enumerable: true, get: function() {
      return node_1.normalize;
    } });
  }
});

// node_modules/@opentelemetry/instrumentation/build/src/instrumentationNodeModuleDefinition.js
var require_instrumentationNodeModuleDefinition = __commonJS({
  "node_modules/@opentelemetry/instrumentation/build/src/instrumentationNodeModuleDefinition.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.InstrumentationNodeModuleDefinition = void 0;
    var InstrumentationNodeModuleDefinition = class {
      files;
      name;
      supportedVersions;
      patch;
      unpatch;
      constructor(name, supportedVersions, patch, unpatch, files) {
        this.files = files || [];
        this.name = name;
        this.supportedVersions = supportedVersions;
        this.patch = patch;
        this.unpatch = unpatch;
      }
    };
    exports2.InstrumentationNodeModuleDefinition = InstrumentationNodeModuleDefinition;
  }
});

// node_modules/@opentelemetry/instrumentation/build/src/instrumentationNodeModuleFile.js
var require_instrumentationNodeModuleFile = __commonJS({
  "node_modules/@opentelemetry/instrumentation/build/src/instrumentationNodeModuleFile.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.InstrumentationNodeModuleFile = void 0;
    var index_1 = require_platform4();
    var InstrumentationNodeModuleFile = class {
      name;
      supportedVersions;
      patch;
      unpatch;
      constructor(name, supportedVersions, patch, unpatch) {
        this.name = (0, index_1.normalize)(name);
        this.supportedVersions = supportedVersions;
        this.patch = patch;
        this.unpatch = unpatch;
      }
    };
    exports2.InstrumentationNodeModuleFile = InstrumentationNodeModuleFile;
  }
});

// node_modules/@opentelemetry/instrumentation/build/src/semconvStability.js
var require_semconvStability = __commonJS({
  "node_modules/@opentelemetry/instrumentation/build/src/semconvStability.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.semconvStabilityFromStr = exports2.SemconvStability = void 0;
    var SemconvStability;
    (function(SemconvStability2) {
      SemconvStability2[SemconvStability2["STABLE"] = 1] = "STABLE";
      SemconvStability2[SemconvStability2["OLD"] = 2] = "OLD";
      SemconvStability2[SemconvStability2["DUPLICATE"] = 3] = "DUPLICATE";
    })(SemconvStability || (exports2.SemconvStability = SemconvStability = {}));
    function semconvStabilityFromStr(namespace, str) {
      let semconvStability = SemconvStability.OLD;
      const entries = str?.split(",").map((v) => v.trim()).filter((s) => s !== "");
      for (const entry of entries ?? []) {
        if (entry.toLowerCase() === namespace + "/dup") {
          semconvStability = SemconvStability.DUPLICATE;
          break;
        } else if (entry.toLowerCase() === namespace) {
          semconvStability = SemconvStability.STABLE;
        }
      }
      return semconvStability;
    }
    exports2.semconvStabilityFromStr = semconvStabilityFromStr;
  }
});

// node_modules/@opentelemetry/instrumentation/build/src/index.js
var require_src8 = __commonJS({
  "node_modules/@opentelemetry/instrumentation/build/src/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.semconvStabilityFromStr = exports2.SemconvStability = exports2.safeExecuteInTheMiddleAsync = exports2.safeExecuteInTheMiddle = exports2.isWrapped = exports2.InstrumentationNodeModuleFile = exports2.InstrumentationNodeModuleDefinition = exports2.InstrumentationBase = exports2.registerInstrumentations = void 0;
    var autoLoader_1 = require_autoLoader();
    Object.defineProperty(exports2, "registerInstrumentations", { enumerable: true, get: function() {
      return autoLoader_1.registerInstrumentations;
    } });
    var index_1 = require_platform4();
    Object.defineProperty(exports2, "InstrumentationBase", { enumerable: true, get: function() {
      return index_1.InstrumentationBase;
    } });
    var instrumentationNodeModuleDefinition_1 = require_instrumentationNodeModuleDefinition();
    Object.defineProperty(exports2, "InstrumentationNodeModuleDefinition", { enumerable: true, get: function() {
      return instrumentationNodeModuleDefinition_1.InstrumentationNodeModuleDefinition;
    } });
    var instrumentationNodeModuleFile_1 = require_instrumentationNodeModuleFile();
    Object.defineProperty(exports2, "InstrumentationNodeModuleFile", { enumerable: true, get: function() {
      return instrumentationNodeModuleFile_1.InstrumentationNodeModuleFile;
    } });
    var utils_1 = require_utils5();
    Object.defineProperty(exports2, "isWrapped", { enumerable: true, get: function() {
      return utils_1.isWrapped;
    } });
    Object.defineProperty(exports2, "safeExecuteInTheMiddle", { enumerable: true, get: function() {
      return utils_1.safeExecuteInTheMiddle;
    } });
    Object.defineProperty(exports2, "safeExecuteInTheMiddleAsync", { enumerable: true, get: function() {
      return utils_1.safeExecuteInTheMiddleAsync;
    } });
    var semconvStability_1 = require_semconvStability();
    Object.defineProperty(exports2, "SemconvStability", { enumerable: true, get: function() {
      return semconvStability_1.SemconvStability;
    } });
    Object.defineProperty(exports2, "semconvStabilityFromStr", { enumerable: true, get: function() {
      return semconvStability_1.semconvStabilityFromStr;
    } });
  }
});

// node_modules/@opentelemetry/instrumentation-http/build/src/version.js
var require_version3 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-http/build/src/version.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.VERSION = void 0;
    exports2.VERSION = "0.223.0";
  }
});

// node_modules/@opentelemetry/instrumentation-http/build/src/semconv.js
var require_semconv4 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-http/build/src/semconv.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.USER_AGENT_SYNTHETIC_TYPE_VALUE_TEST = exports2.USER_AGENT_SYNTHETIC_TYPE_VALUE_BOT = exports2.ATTR_USER_AGENT_SYNTHETIC_TYPE = void 0;
    exports2.ATTR_USER_AGENT_SYNTHETIC_TYPE = "user_agent.synthetic.type";
    exports2.USER_AGENT_SYNTHETIC_TYPE_VALUE_BOT = "bot";
    exports2.USER_AGENT_SYNTHETIC_TYPE_VALUE_TEST = "test";
  }
});

// node_modules/@opentelemetry/instrumentation-http/build/src/internal-types.js
var require_internal_types = __commonJS({
  "node_modules/@opentelemetry/instrumentation-http/build/src/internal-types.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.DEFAULT_QUERY_STRINGS_TO_REDACT = exports2.STR_REDACTED = exports2.SYNTHETIC_BOT_NAMES = exports2.SYNTHETIC_TEST_NAMES = void 0;
    exports2.SYNTHETIC_TEST_NAMES = ["alwayson"];
    exports2.SYNTHETIC_BOT_NAMES = ["googlebot", "bingbot"];
    exports2.STR_REDACTED = "REDACTED";
    exports2.DEFAULT_QUERY_STRINGS_TO_REDACT = [
      "sig",
      "Signature",
      "AWSAccessKeyId",
      "X-Goog-Signature",
      "X-Amz-Signature",
      "X-Amz-Credential",
      "X-Amz-Security-Token"
    ];
  }
});

// node_modules/forwarded-parse/lib/error.js
var require_error = __commonJS({
  "node_modules/forwarded-parse/lib/error.js"(exports2, module2) {
    "use strict";
    var util = require("util");
    function ParseError(message, input) {
      Error.captureStackTrace(this, ParseError);
      this.name = this.constructor.name;
      this.message = message;
      this.input = input;
    }
    util.inherits(ParseError, Error);
    module2.exports = ParseError;
  }
});

// node_modules/forwarded-parse/lib/ascii.js
var require_ascii = __commonJS({
  "node_modules/forwarded-parse/lib/ascii.js"(exports2, module2) {
    "use strict";
    function isDelimiter(code) {
      return code === 34 || code === 40 || code === 41 || code === 44 || code === 47 || code >= 58 && code <= 64 || code >= 91 && code <= 93 || code === 123 || code === 125;
    }
    function isTokenChar(code) {
      return code === 33 || code >= 35 && code <= 39 || code === 42 || code === 43 || code === 45 || code === 46 || code >= 48 && code <= 57 || code >= 65 && code <= 90 || code >= 94 && code <= 122 || code === 124 || code === 126;
    }
    function isPrint(code) {
      return code >= 32 && code <= 126;
    }
    function isExtended(code) {
      return code >= 128 && code <= 255;
    }
    module2.exports = {
      isDelimiter,
      isTokenChar,
      isExtended,
      isPrint
    };
  }
});

// node_modules/forwarded-parse/index.js
var require_forwarded_parse = __commonJS({
  "node_modules/forwarded-parse/index.js"(exports2, module2) {
    "use strict";
    var util = require("util");
    var ParseError = require_error();
    var ascii = require_ascii();
    var isDelimiter = ascii.isDelimiter;
    var isTokenChar = ascii.isTokenChar;
    var isExtended = ascii.isExtended;
    var isPrint = ascii.isPrint;
    function decode(str) {
      return str.replace(/\\(.)/g, "$1");
    }
    function unexpectedCharacterMessage(header, position) {
      return util.format(
        "Unexpected character '%s' at index %d",
        header.charAt(position),
        position
      );
    }
    function parse(header) {
      var mustUnescape = false;
      var isEscaping = false;
      var inQuotes = false;
      var forwarded = {};
      var output = [];
      var start = -1;
      var end = -1;
      var parameter;
      var code;
      for (var i = 0; i < header.length; i++) {
        code = header.charCodeAt(i);
        if (parameter === void 0) {
          if (i !== 0 && start === -1 && (code === 32 || code === 9)) {
            continue;
          }
          if (isTokenChar(code)) {
            if (start === -1) start = i;
          } else if (code === 61 && start !== -1) {
            parameter = header.slice(start, i).toLowerCase();
            start = -1;
          } else {
            throw new ParseError(unexpectedCharacterMessage(header, i), header);
          }
        } else {
          if (isEscaping && (code === 9 || isPrint(code) || isExtended(code))) {
            isEscaping = false;
          } else if (isTokenChar(code)) {
            if (end !== -1) {
              throw new ParseError(unexpectedCharacterMessage(header, i), header);
            }
            if (start === -1) start = i;
          } else if (isDelimiter(code) || isExtended(code)) {
            if (inQuotes) {
              if (code === 34) {
                inQuotes = false;
                end = i;
              } else if (code === 92) {
                if (start === -1) start = i;
                isEscaping = mustUnescape = true;
              } else if (start === -1) {
                start = i;
              }
            } else if (code === 34 && header.charCodeAt(i - 1) === 61) {
              inQuotes = true;
            } else if ((code === 44 || code === 59) && (start !== -1 || end !== -1)) {
              if (start !== -1) {
                if (end === -1) end = i;
                forwarded[parameter] = mustUnescape ? decode(header.slice(start, end)) : header.slice(start, end);
              } else {
                forwarded[parameter] = "";
              }
              if (code === 44) {
                output.push(forwarded);
                forwarded = {};
              }
              parameter = void 0;
              start = end = -1;
            } else {
              throw new ParseError(unexpectedCharacterMessage(header, i), header);
            }
          } else if (code === 32 || code === 9) {
            if (end !== -1) continue;
            if (inQuotes) {
              if (start === -1) start = i;
            } else if (start !== -1) {
              end = i;
            } else {
              throw new ParseError(unexpectedCharacterMessage(header, i), header);
            }
          } else {
            throw new ParseError(unexpectedCharacterMessage(header, i), header);
          }
        }
      }
      if (parameter === void 0 || inQuotes || start === -1 && end === -1 || code === 32 || code === 9) {
        throw new ParseError("Unexpected end of input", header);
      }
      if (start !== -1) {
        if (end === -1) end = i;
        forwarded[parameter] = mustUnescape ? decode(header.slice(start, end)) : header.slice(start, end);
      } else {
        forwarded[parameter] = "";
      }
      output.push(forwarded);
      return output;
    }
    module2.exports = parse;
  }
});

// node_modules/@opentelemetry/instrumentation-http/build/src/utils.js
var require_utils6 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-http/build/src/utils.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.headerCapture = exports2.getIncomingStableRequestMetricAttributesOnResponse = exports2.getIncomingRequestAttributesOnResponse = exports2.getIncomingRequestAttributes = exports2.getRemoteClientAddress = exports2.getOutgoingStableRequestMetricAttributesOnResponse = exports2.getOutgoingRequestAttributesOnResponse = exports2.getOutgoingRequestAttributes = exports2.extractHostnameAndPort = exports2.isValidOptionsType = exports2.getRequestInfo = exports2.isCompressed = exports2.setSpanWithError = exports2.satisfiesPattern = exports2.parseResponseStatus = exports2.getAbsoluteUrl = exports2.redactQueryString = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var semantic_conventions_1 = require_dist();
    var semconv_1 = require_semconv4();
    var core_1 = require_src2();
    var url = require("url");
    var internal_types_1 = require_internal_types();
    var internal_types_2 = require_internal_types();
    var forwardedParse = require_forwarded_parse();
    var defaultQueryStringsToRedact = Array.from(internal_types_2.DEFAULT_QUERY_STRINGS_TO_REDACT);
    var redactQueryString = (searchParams, paramsToRedact) => {
      const params = new URLSearchParams(searchParams);
      for (const param of paramsToRedact) {
        if (params.has(param)) {
          params.set(param, internal_types_2.STR_REDACTED);
        }
      }
      return params.toString();
    };
    exports2.redactQueryString = redactQueryString;
    var getAbsoluteUrl = (requestUrl, headers, fallbackProtocol = "http:", redactedQueryParams = Array.from(internal_types_2.DEFAULT_QUERY_STRINGS_TO_REDACT)) => {
      const reqUrlObject = requestUrl || {};
      const protocol = reqUrlObject.protocol || fallbackProtocol;
      const port = (reqUrlObject.port || "").toString();
      let path = reqUrlObject.path || "/";
      let host = reqUrlObject.host || reqUrlObject.hostname || headers.host || "localhost";
      if (host.indexOf(":") === -1 && port && port !== "80" && port !== "443") {
        host += `:${port}`;
      }
      if (path.includes("?")) {
        try {
          const parsedUrl = new URL(path, "http://localhost");
          const redacted = (0, exports2.redactQueryString)(parsedUrl.searchParams, redactedQueryParams);
          path = `${parsedUrl.pathname}?${redacted}`;
        } catch {
        }
      }
      const authPart = reqUrlObject.auth ? `${internal_types_2.STR_REDACTED}:${internal_types_2.STR_REDACTED}@` : "";
      return `${protocol}//${authPart}${host}${path}`;
    };
    exports2.getAbsoluteUrl = getAbsoluteUrl;
    var parseResponseStatus = (kind, statusCode) => {
      const upperBound = kind === api_1.SpanKind.CLIENT ? 400 : 500;
      if (statusCode && statusCode >= 100 && statusCode < upperBound) {
        return api_1.SpanStatusCode.UNSET;
      }
      return api_1.SpanStatusCode.ERROR;
    };
    exports2.parseResponseStatus = parseResponseStatus;
    var satisfiesPattern = (constant, pattern) => {
      if (typeof pattern === "string") {
        return pattern === constant;
      } else if (pattern instanceof RegExp) {
        return pattern.test(constant);
      } else if (typeof pattern === "function") {
        return pattern(constant);
      } else {
        throw new TypeError("Pattern is in unsupported datatype");
      }
    };
    exports2.satisfiesPattern = satisfiesPattern;
    var setSpanWithError = (span, error) => {
      const message = error.message;
      span.setAttribute(semantic_conventions_1.ATTR_ERROR_TYPE, error.name);
      span.setStatus({ code: api_1.SpanStatusCode.ERROR, message });
      span.recordException(error);
    };
    exports2.setSpanWithError = setSpanWithError;
    var isCompressed = (headers) => {
      const encoding = headers["content-encoding"];
      return !!encoding && encoding !== "identity";
    };
    exports2.isCompressed = isCompressed;
    function stringUrlToHttpOptions(stringUrl) {
      const { hostname, pathname, port, username, password, search, protocol, hash, href, origin, host } = new URL(stringUrl);
      const options = {
        protocol,
        hostname: hostname && hostname[0] === "[" ? hostname.slice(1, -1) : hostname,
        hash,
        search,
        pathname,
        path: `${pathname || ""}${search || ""}`,
        href,
        origin,
        host
      };
      if (port !== "") {
        options.port = Number(port);
      }
      if (username || password) {
        options.auth = `${decodeURIComponent(username)}:${decodeURIComponent(password)}`;
      }
      return options;
    }
    var getRequestInfo = (logger, options, extraOptions) => {
      let pathname;
      let origin;
      let optionsParsed;
      let invalidUrl = false;
      if (typeof options === "string") {
        try {
          const convertedOptions = stringUrlToHttpOptions(options);
          optionsParsed = convertedOptions;
          pathname = convertedOptions.pathname || "/";
        } catch (e) {
          invalidUrl = true;
          logger.verbose("Unable to parse URL provided to HTTP request, using fallback to determine path. Original error:", e);
          optionsParsed = {
            path: options
          };
          pathname = optionsParsed.path || "/";
        }
        origin = `${optionsParsed.protocol || "http:"}//${optionsParsed.host}`;
        if (extraOptions !== void 0) {
          Object.assign(optionsParsed, extraOptions);
        }
      } else if (options instanceof url.URL) {
        optionsParsed = {
          protocol: options.protocol,
          hostname: typeof options.hostname === "string" && options.hostname.startsWith("[") ? options.hostname.slice(1, -1) : options.hostname,
          path: `${options.pathname || ""}${options.search || ""}`
        };
        if (options.port !== "") {
          optionsParsed.port = Number(options.port);
        }
        if (options.username || options.password) {
          optionsParsed.auth = `${options.username}:${options.password}`;
        }
        pathname = options.pathname;
        origin = options.origin;
        if (extraOptions !== void 0) {
          Object.assign(optionsParsed, extraOptions);
        }
      } else {
        optionsParsed = Object.assign({ protocol: options.host ? "http:" : void 0 }, options);
        const hostname = optionsParsed.host || (optionsParsed.port != null ? `${optionsParsed.hostname}${optionsParsed.port}` : optionsParsed.hostname);
        origin = `${optionsParsed.protocol || "http:"}//${hostname}`;
        pathname = options.pathname;
        if (!pathname && optionsParsed.path) {
          try {
            const parsedUrl = new URL(optionsParsed.path, origin);
            pathname = parsedUrl.pathname || "/";
          } catch {
            pathname = "/";
          }
        }
      }
      const method = optionsParsed.method ? optionsParsed.method.toUpperCase() : "GET";
      return { origin, pathname, method, optionsParsed, invalidUrl };
    };
    exports2.getRequestInfo = getRequestInfo;
    var isValidOptionsType = (options) => {
      if (!options) {
        return false;
      }
      const type = typeof options;
      return type === "string" || type === "object" && !Array.isArray(options);
    };
    exports2.isValidOptionsType = isValidOptionsType;
    var extractHostnameAndPort = (requestOptions) => {
      if (requestOptions.hostname && requestOptions.port) {
        return { hostname: requestOptions.hostname, port: requestOptions.port };
      }
      const matches = requestOptions.host?.match(/^([^:/ ]+)(:\d{1,5})?/) || null;
      const hostname = requestOptions.hostname || (matches === null ? "localhost" : matches[1]);
      let port = requestOptions.port;
      if (!port) {
        if (matches && matches[2]) {
          port = matches[2].substring(1);
        } else {
          port = requestOptions.protocol === "https:" ? "443" : "80";
        }
      }
      return { hostname, port };
    };
    exports2.extractHostnameAndPort = extractHostnameAndPort;
    var getOutgoingRequestAttributes = (requestOptions, options, enableSyntheticSourceDetection) => {
      const hostname = options.hostname;
      const port = options.port;
      const method = requestOptions.method ?? "GET";
      const normalizedMethod = normalizeMethod(method);
      const headers = requestOptions.headers || {};
      const userAgent = headers["user-agent"];
      const urlFull = (0, exports2.getAbsoluteUrl)(requestOptions, headers, `${options.component}:`, options.redactedQueryParams);
      const attributes = {
        // Required attributes
        [semantic_conventions_1.ATTR_HTTP_REQUEST_METHOD]: normalizedMethod,
        [semantic_conventions_1.ATTR_SERVER_ADDRESS]: hostname,
        [semantic_conventions_1.ATTR_SERVER_PORT]: Number(port),
        [semantic_conventions_1.ATTR_URL_FULL]: urlFull,
        [semantic_conventions_1.ATTR_USER_AGENT_ORIGINAL]: userAgent
        // leaving out protocol version, it is not yet negotiated
        // leaving out protocol name, it is only required when protocol version is set
        // retries and redirects not supported
        // Opt-in attributes left off for now
      };
      if (method !== normalizedMethod) {
        attributes[semantic_conventions_1.ATTR_HTTP_REQUEST_METHOD_ORIGINAL] = method;
      }
      if (enableSyntheticSourceDetection && userAgent) {
        attributes[semconv_1.ATTR_USER_AGENT_SYNTHETIC_TYPE] = getSyntheticType(userAgent);
      }
      return Object.assign(attributes, options.hookAttributes);
    };
    exports2.getOutgoingRequestAttributes = getOutgoingRequestAttributes;
    var getSyntheticType = (userAgent) => {
      const userAgentString = String(userAgent).toLowerCase();
      for (const name of internal_types_1.SYNTHETIC_TEST_NAMES) {
        if (userAgentString.includes(name)) {
          return semconv_1.USER_AGENT_SYNTHETIC_TYPE_VALUE_TEST;
        }
      }
      for (const name of internal_types_1.SYNTHETIC_BOT_NAMES) {
        if (userAgentString.includes(name)) {
          return semconv_1.USER_AGENT_SYNTHETIC_TYPE_VALUE_BOT;
        }
      }
      return;
    };
    var getOutgoingRequestAttributesOnResponse = (response) => {
      const { statusCode, socket } = response;
      const attributes = {};
      if (statusCode != null) {
        attributes[semantic_conventions_1.ATTR_HTTP_RESPONSE_STATUS_CODE] = statusCode;
      }
      if (socket) {
        const { remoteAddress, remotePort } = socket;
        attributes[semantic_conventions_1.ATTR_NETWORK_PEER_ADDRESS] = remoteAddress;
        attributes[semantic_conventions_1.ATTR_NETWORK_PEER_PORT] = remotePort;
        attributes[semantic_conventions_1.ATTR_NETWORK_PROTOCOL_VERSION] = response.httpVersion;
      }
      return attributes;
    };
    exports2.getOutgoingRequestAttributesOnResponse = getOutgoingRequestAttributesOnResponse;
    var getOutgoingStableRequestMetricAttributesOnResponse = (spanAttributes) => {
      const metricAttributes = {};
      if (spanAttributes[semantic_conventions_1.ATTR_NETWORK_PROTOCOL_VERSION]) {
        metricAttributes[semantic_conventions_1.ATTR_NETWORK_PROTOCOL_VERSION] = spanAttributes[semantic_conventions_1.ATTR_NETWORK_PROTOCOL_VERSION];
      }
      const statusCode = spanAttributes[semantic_conventions_1.ATTR_HTTP_RESPONSE_STATUS_CODE];
      if (statusCode) {
        metricAttributes[semantic_conventions_1.ATTR_HTTP_RESPONSE_STATUS_CODE] = statusCode;
        if (typeof statusCode === "number" && statusCode >= 400 && statusCode < 600) {
          metricAttributes[semantic_conventions_1.ATTR_ERROR_TYPE] ??= String(statusCode);
        }
      }
      return metricAttributes;
    };
    exports2.getOutgoingStableRequestMetricAttributesOnResponse = getOutgoingStableRequestMetricAttributesOnResponse;
    function parseHostHeader(hostHeader, proto) {
      const parts = hostHeader.split(":");
      if (parts.length === 1) {
        if (proto === "http") {
          return { host: parts[0], port: "80" };
        }
        if (proto === "https") {
          return { host: parts[0], port: "443" };
        }
        return { host: parts[0] };
      }
      if (parts.length === 2) {
        return {
          host: parts[0],
          port: parts[1]
        };
      }
      if (parts[0].startsWith("[")) {
        if (parts[parts.length - 1].endsWith("]")) {
          if (proto === "http") {
            return { host: hostHeader, port: "80" };
          }
          if (proto === "https") {
            return { host: hostHeader, port: "443" };
          }
        } else if (parts[parts.length - 2].endsWith("]")) {
          return {
            host: parts.slice(0, -1).join(":"),
            port: parts[parts.length - 1]
          };
        }
      }
      return { host: hostHeader };
    }
    function getServerAddress(request, component) {
      const forwardedHeader = request.headers["forwarded"];
      if (forwardedHeader) {
        for (const entry of parseForwardedHeader(forwardedHeader)) {
          if (entry.host) {
            return parseHostHeader(entry.host, entry.proto);
          }
        }
      }
      const xForwardedHost = request.headers["x-forwarded-host"];
      if (typeof xForwardedHost === "string") {
        if (typeof request.headers["x-forwarded-proto"] === "string") {
          return parseHostHeader(xForwardedHost, request.headers["x-forwarded-proto"]);
        }
        if (Array.isArray(request.headers["x-forwarded-proto"])) {
          return parseHostHeader(xForwardedHost, request.headers["x-forwarded-proto"][0]);
        }
        return parseHostHeader(xForwardedHost);
      } else if (Array.isArray(xForwardedHost) && typeof xForwardedHost[0] === "string" && xForwardedHost[0].length > 0) {
        if (typeof request.headers["x-forwarded-proto"] === "string") {
          return parseHostHeader(xForwardedHost[0], request.headers["x-forwarded-proto"]);
        }
        if (Array.isArray(request.headers["x-forwarded-proto"])) {
          return parseHostHeader(xForwardedHost[0], request.headers["x-forwarded-proto"][0]);
        }
        return parseHostHeader(xForwardedHost[0]);
      }
      const host = request.headers["host"];
      if (typeof host === "string" && host.length > 0) {
        return parseHostHeader(host, component);
      }
      return null;
    }
    function getRemoteClientAddress(request) {
      const forwardedHeader = request.headers["forwarded"];
      if (forwardedHeader) {
        for (const entry of parseForwardedHeader(forwardedHeader)) {
          if (entry.for) {
            return removePortFromAddress(entry.for);
          }
        }
      }
      const xForwardedFor = request.headers["x-forwarded-for"];
      if (xForwardedFor) {
        let xForwardedForVal;
        if (typeof xForwardedFor === "string") {
          xForwardedForVal = xForwardedFor;
        } else if (Array.isArray(xForwardedFor)) {
          xForwardedForVal = xForwardedFor[0];
        }
        if (typeof xForwardedForVal === "string") {
          xForwardedForVal = xForwardedForVal.split(",")[0].trim();
          return removePortFromAddress(xForwardedForVal);
        }
      }
      const remote = request.socket.remoteAddress;
      if (remote) {
        return remote;
      }
      return null;
    }
    exports2.getRemoteClientAddress = getRemoteClientAddress;
    function removePortFromAddress(input) {
      try {
        const { hostname: address } = new URL(`http://${input}`);
        if (address.startsWith("[") && address.endsWith("]")) {
          return address.slice(1, -1);
        }
        return address;
      } catch {
        return input;
      }
    }
    function getInfoFromIncomingMessage(component, request, logger) {
      try {
        if (request.headers.host) {
          return new URL(request.url ?? "/", `${component}://${request.headers.host}`);
        } else {
          const unsafeParsedUrl = new URL(
            request.url ?? "/",
            // using localhost as a workaround to still use the URL constructor for parsing
            `${component}://localhost`
          );
          return {
            pathname: unsafeParsedUrl.pathname,
            search: unsafeParsedUrl.search,
            toString: function() {
              return unsafeParsedUrl.pathname + unsafeParsedUrl.search;
            }
          };
        }
      } catch (e) {
        logger.verbose("Unable to get URL from request", e);
        return {};
      }
    }
    var getIncomingRequestAttributes = (request, options, logger) => {
      const { component, enableSyntheticSourceDetection, hookAttributes, redactedQueryParams } = options;
      const { headers, method } = request;
      const { "user-agent": userAgent } = headers;
      const parsedUrl = getInfoFromIncomingMessage(component, request, logger);
      const normalizedMethod = normalizeMethod(method);
      const serverAddress = getServerAddress(request, component);
      const remoteClientAddress = getRemoteClientAddress(request);
      const attributes = {
        [semantic_conventions_1.ATTR_HTTP_REQUEST_METHOD]: normalizedMethod,
        [semantic_conventions_1.ATTR_URL_SCHEME]: component,
        [semantic_conventions_1.ATTR_SERVER_ADDRESS]: serverAddress?.host,
        [semantic_conventions_1.ATTR_NETWORK_PEER_ADDRESS]: request.socket.remoteAddress,
        [semantic_conventions_1.ATTR_NETWORK_PEER_PORT]: request.socket.remotePort,
        [semantic_conventions_1.ATTR_NETWORK_PROTOCOL_VERSION]: request.httpVersion,
        [semantic_conventions_1.ATTR_USER_AGENT_ORIGINAL]: userAgent
      };
      if (parsedUrl.pathname != null) {
        attributes[semantic_conventions_1.ATTR_URL_PATH] = parsedUrl.pathname;
      }
      if (parsedUrl.search) {
        const paramsToRedact = redactedQueryParams ?? defaultQueryStringsToRedact;
        attributes[semantic_conventions_1.ATTR_URL_QUERY] = (0, exports2.redactQueryString)(new URLSearchParams(parsedUrl.search.slice(1)), paramsToRedact);
      }
      if (remoteClientAddress != null) {
        attributes[semantic_conventions_1.ATTR_CLIENT_ADDRESS] = remoteClientAddress;
      }
      if (serverAddress?.port != null) {
        attributes[semantic_conventions_1.ATTR_SERVER_PORT] = Number(serverAddress.port);
      }
      if (method !== normalizedMethod) {
        attributes[semantic_conventions_1.ATTR_HTTP_REQUEST_METHOD_ORIGINAL] = method;
      }
      if (enableSyntheticSourceDetection && userAgent) {
        attributes[semconv_1.ATTR_USER_AGENT_SYNTHETIC_TYPE] = getSyntheticType(userAgent);
      }
      return Object.assign(attributes, hookAttributes);
    };
    exports2.getIncomingRequestAttributes = getIncomingRequestAttributes;
    var getIncomingRequestAttributesOnResponse = (response) => {
      const { statusCode } = response;
      const attributes = {
        [semantic_conventions_1.ATTR_HTTP_RESPONSE_STATUS_CODE]: statusCode
      };
      const rpcMetadata = (0, core_1.getRPCMetadata)(api_1.context.active());
      if (rpcMetadata?.type === core_1.RPCType.HTTP && rpcMetadata.route !== void 0) {
        attributes[semantic_conventions_1.ATTR_HTTP_ROUTE] = rpcMetadata.route;
      }
      return attributes;
    };
    exports2.getIncomingRequestAttributesOnResponse = getIncomingRequestAttributesOnResponse;
    var getIncomingStableRequestMetricAttributesOnResponse = (spanAttributes) => {
      const metricAttributes = {};
      if (spanAttributes[semantic_conventions_1.ATTR_HTTP_ROUTE] !== void 0) {
        metricAttributes[semantic_conventions_1.ATTR_HTTP_ROUTE] = spanAttributes[semantic_conventions_1.ATTR_HTTP_ROUTE];
      }
      const statusCode = spanAttributes[semantic_conventions_1.ATTR_HTTP_RESPONSE_STATUS_CODE];
      if (statusCode) {
        metricAttributes[semantic_conventions_1.ATTR_HTTP_RESPONSE_STATUS_CODE] = statusCode;
        if (typeof statusCode === "number" && statusCode >= 500 && statusCode < 600) {
          metricAttributes[semantic_conventions_1.ATTR_ERROR_TYPE] ??= String(statusCode);
        }
      }
      return metricAttributes;
    };
    exports2.getIncomingStableRequestMetricAttributesOnResponse = getIncomingStableRequestMetricAttributesOnResponse;
    function headerCapture(type, headers) {
      const normalizedHeaders = /* @__PURE__ */ new Map();
      for (let i = 0, len = headers.length; i < len; i++) {
        const capturedHeader = headers[i].toLowerCase();
        normalizedHeaders.set(capturedHeader, capturedHeader);
      }
      return (getHeader) => {
        const attributes = {};
        for (const capturedHeader of normalizedHeaders.keys()) {
          const value = getHeader(capturedHeader);
          if (value === void 0) {
            continue;
          }
          const normalizedHeader = normalizedHeaders.get(capturedHeader);
          const key = `http.${type}.header.${normalizedHeader}`;
          if (typeof value === "string") {
            attributes[key] = [value];
          } else if (Array.isArray(value)) {
            attributes[key] = value;
          } else {
            attributes[key] = [value];
          }
        }
        return attributes;
      };
    }
    exports2.headerCapture = headerCapture;
    var KNOWN_METHODS = /* @__PURE__ */ new Set([
      // methods from https://www.rfc-editor.org/rfc/rfc9110.html#name-methods
      "GET",
      "HEAD",
      "POST",
      "PUT",
      "DELETE",
      "CONNECT",
      "OPTIONS",
      "TRACE",
      // PATCH from https://www.rfc-editor.org/rfc/rfc5789.html
      "PATCH",
      // QUERY from https://datatracker.ietf.org/doc/draft-ietf-httpbis-safe-method-w-body/
      "QUERY"
    ]);
    function normalizeMethod(method) {
      if (method == null) {
        return "GET";
      }
      const upper = method.toUpperCase();
      if (KNOWN_METHODS.has(upper)) {
        return upper;
      }
      return "_OTHER";
    }
    function parseForwardedHeader(header) {
      try {
        return forwardedParse(header);
      } catch {
        return [];
      }
    }
  }
});

// node_modules/@opentelemetry/instrumentation-http/build/src/http.js
var require_http = __commonJS({
  "node_modules/@opentelemetry/instrumentation-http/build/src/http.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.HttpInstrumentation = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var core_1 = require_src2();
    var url = require("url");
    var version_1 = require_version3();
    var instrumentation_1 = require_src8();
    var events_1 = require("events");
    var semantic_conventions_1 = require_dist();
    var utils_1 = require_utils6();
    var internal_types_1 = require_internal_types();
    var HttpInstrumentation2 = class extends instrumentation_1.InstrumentationBase {
      /** keep track on spans not ended */
      _spanNotEnded = /* @__PURE__ */ new WeakSet();
      _headerCapture;
      _httpPatched = false;
      _httpsPatched = false;
      constructor(config = {}) {
        super("@opentelemetry/instrumentation-http", version_1.VERSION, config);
        this._headerCapture = this._createHeaderCapture();
      }
      _updateMetricInstruments() {
        this._httpServerDurationHistogram = this.meter.createHistogram(semantic_conventions_1.METRIC_HTTP_SERVER_REQUEST_DURATION, {
          description: "Duration of HTTP server requests.",
          unit: "s",
          valueType: api_1.ValueType.DOUBLE,
          advice: {
            explicitBucketBoundaries: [
              5e-3,
              0.01,
              0.025,
              0.05,
              0.075,
              0.1,
              0.25,
              0.5,
              0.75,
              1,
              2.5,
              5,
              7.5,
              10
            ]
          }
        });
        this._httpClientDurationHistogram = this.meter.createHistogram(semantic_conventions_1.METRIC_HTTP_CLIENT_REQUEST_DURATION, {
          description: "Duration of HTTP client requests.",
          unit: "s",
          valueType: api_1.ValueType.DOUBLE,
          advice: {
            explicitBucketBoundaries: [
              5e-3,
              0.01,
              0.025,
              0.05,
              0.075,
              0.1,
              0.25,
              0.5,
              0.75,
              1,
              2.5,
              5,
              7.5,
              10
            ]
          }
        });
      }
      _recordServerDuration(durationMs, attributes) {
        this._httpServerDurationHistogram.record(durationMs / 1e3, attributes);
      }
      _recordClientDuration(durationMs, attributes) {
        this._httpClientDurationHistogram.record(durationMs / 1e3, attributes);
      }
      setConfig(config = {}) {
        super.setConfig(config);
        this._headerCapture = this._createHeaderCapture();
      }
      init() {
        return [this._getHttpsInstrumentation(), this._getHttpInstrumentation()];
      }
      _getHttpInstrumentation() {
        return new instrumentation_1.InstrumentationNodeModuleDefinition("http", ["*"], (moduleExports) => {
          if (this._httpPatched) {
            return moduleExports;
          }
          this._httpPatched = true;
          const isESM = moduleExports[Symbol.toStringTag] === "Module";
          if (!this.getConfig().disableOutgoingRequestInstrumentation) {
            const patchedRequest = this._wrap(moduleExports, "request", this._getPatchOutgoingRequestFunction("http"));
            const patchedGet = this._wrap(moduleExports, "get", this._getPatchOutgoingGetFunction(patchedRequest));
            if (isESM) {
              moduleExports.default.request = patchedRequest;
              moduleExports.default.get = patchedGet;
            }
          }
          if (!this.getConfig().disableIncomingRequestInstrumentation) {
            this._wrap(moduleExports.Server.prototype, "emit", this._getPatchIncomingRequestFunction("http"));
          }
          return moduleExports;
        }, (moduleExports) => {
          this._httpPatched = false;
          if (moduleExports === void 0)
            return;
          if (!this.getConfig().disableOutgoingRequestInstrumentation) {
            this._unwrap(moduleExports, "request");
            this._unwrap(moduleExports, "get");
          }
          if (!this.getConfig().disableIncomingRequestInstrumentation) {
            this._unwrap(moduleExports.Server.prototype, "emit");
          }
        });
      }
      _getHttpsInstrumentation() {
        return new instrumentation_1.InstrumentationNodeModuleDefinition("https", ["*"], (moduleExports) => {
          if (this._httpsPatched) {
            return moduleExports;
          }
          this._httpsPatched = true;
          const isESM = moduleExports[Symbol.toStringTag] === "Module";
          if (!this.getConfig().disableOutgoingRequestInstrumentation) {
            const patchedRequest = this._wrap(moduleExports, "request", this._getPatchHttpsOutgoingRequestFunction("https"));
            const patchedGet = this._wrap(moduleExports, "get", this._getPatchHttpsOutgoingGetFunction(patchedRequest));
            if (isESM) {
              moduleExports.default.request = patchedRequest;
              moduleExports.default.get = patchedGet;
            }
          }
          if (!this.getConfig().disableIncomingRequestInstrumentation) {
            this._wrap(moduleExports.Server.prototype, "emit", this._getPatchIncomingRequestFunction("https"));
          }
          return moduleExports;
        }, (moduleExports) => {
          this._httpsPatched = false;
          if (moduleExports === void 0)
            return;
          if (!this.getConfig().disableOutgoingRequestInstrumentation) {
            this._unwrap(moduleExports, "request");
            this._unwrap(moduleExports, "get");
          }
          if (!this.getConfig().disableIncomingRequestInstrumentation) {
            this._unwrap(moduleExports.Server.prototype, "emit");
          }
        });
      }
      /**
       * Creates spans for incoming requests, restoring spans' context if applied.
       */
      _getPatchIncomingRequestFunction(component) {
        return (original) => {
          return this._incomingRequestFunction(component, original);
        };
      }
      /**
       * Creates spans for outgoing requests, sending spans' context for distributed
       * tracing.
       */
      _getPatchOutgoingRequestFunction(component) {
        return (original) => {
          return this._outgoingRequestFunction(component, original);
        };
      }
      _getPatchOutgoingGetFunction(clientRequest) {
        return (_original) => {
          return function outgoingGetRequest(options, ...args) {
            const req = clientRequest(options, ...args);
            req.end();
            return req;
          };
        };
      }
      /** Patches HTTPS outgoing requests */
      _getPatchHttpsOutgoingRequestFunction(component) {
        return (original) => {
          const instrumentation = this;
          return function httpsOutgoingRequest(options, ...args) {
            if (component === "https" && typeof options === "object" && options?.constructor?.name !== "URL") {
              options = Object.assign({}, options);
              instrumentation._setDefaultOptions(options);
            }
            return instrumentation._getPatchOutgoingRequestFunction(component)(original)(options, ...args);
          };
        };
      }
      _setDefaultOptions(options) {
        options.protocol = options.protocol || "https:";
        options.port = options.port || 443;
      }
      /** Patches HTTPS outgoing get requests */
      _getPatchHttpsOutgoingGetFunction(clientRequest) {
        return (original) => {
          const instrumentation = this;
          return function httpsOutgoingRequest(options, ...args) {
            return instrumentation._getPatchOutgoingGetFunction(clientRequest)(original)(options, ...args);
          };
        };
      }
      /**
       * Attach event listeners to a client request to end span and add span attributes.
       *
       * @param request The original request object.
       * @param span representing the current operation
       * @param startTime representing the start time of the request to calculate duration in Metric
       * @param metricAttributes metric attributes for the request duration metric
       */
      _traceClientRequest(request, span, startTime, metricAttributes) {
        if (this.getConfig().requestHook) {
          this._callRequestHook(span, request);
        }
        let responseFinished = false;
        request.prependListener("response", (response) => {
          this._diag.debug("outgoingRequest on response()");
          if (request.listenerCount("response") <= 1) {
            response.resume();
          }
          const responseAttributes = (0, utils_1.getOutgoingRequestAttributesOnResponse)(response);
          span.setAttributes(responseAttributes);
          metricAttributes = Object.assign(metricAttributes, (0, utils_1.getOutgoingStableRequestMetricAttributesOnResponse)(responseAttributes));
          if (this.getConfig().responseHook) {
            this._callResponseHook(span, response);
          }
          span.setAttributes(this._headerCapture.client.captureRequestHeaders((header) => request.getHeader(header)));
          span.setAttributes(this._headerCapture.client.captureResponseHeaders((header) => response.headers[header]));
          api_1.context.bind(api_1.context.active(), response);
          const endHandler = () => {
            this._diag.debug("outgoingRequest on end()");
            if (responseFinished) {
              return;
            }
            responseFinished = true;
            let status;
            if (response.aborted && !response.complete) {
              status = { code: api_1.SpanStatusCode.ERROR };
            } else {
              status = {
                code: (0, utils_1.parseResponseStatus)(api_1.SpanKind.CLIENT, response.statusCode)
              };
            }
            span.setStatus(status);
            if (this.getConfig().applyCustomAttributesOnSpan) {
              (0, instrumentation_1.safeExecuteInTheMiddle)(() => this.getConfig().applyCustomAttributesOnSpan(span, request, response), () => {
              }, true);
            }
            this._closeHttpSpan(span, api_1.SpanKind.CLIENT, startTime, metricAttributes);
          };
          response.on("end", endHandler);
          response.on(events_1.errorMonitor, (error) => {
            this._diag.debug("outgoingRequest on error()", error);
            if (responseFinished) {
              return;
            }
            responseFinished = true;
            this._onOutgoingRequestError(span, metricAttributes, startTime, error);
          });
        });
        request.on("close", () => {
          this._diag.debug("outgoingRequest on request close()");
          if (request.aborted || responseFinished) {
            return;
          }
          responseFinished = true;
          this._closeHttpSpan(span, api_1.SpanKind.CLIENT, startTime, metricAttributes);
        });
        request.on(events_1.errorMonitor, (error) => {
          this._diag.debug("outgoingRequest on request error()", error);
          if (responseFinished) {
            return;
          }
          responseFinished = true;
          this._onOutgoingRequestError(span, metricAttributes, startTime, error);
        });
        this._diag.debug("http.ClientRequest return request");
        return request;
      }
      _incomingRequestFunction(component, original) {
        const instrumentation = this;
        return function incomingRequest(event, ...args) {
          if (event !== "request") {
            return original.apply(this, [event, ...args]);
          }
          const request = args[0];
          const response = args[1];
          const method = request.method || "GET";
          instrumentation._diag.debug(`${component} instrumentation incomingRequest`);
          if ((0, instrumentation_1.safeExecuteInTheMiddle)(() => instrumentation.getConfig().ignoreIncomingRequestHook?.(request), (e) => {
            if (e != null) {
              instrumentation._diag.error("caught ignoreIncomingRequestHook error: ", e);
            }
          }, true)) {
            return api_1.context.with((0, core_1.suppressTracing)(api_1.context.active()), () => {
              api_1.context.bind(api_1.context.active(), request);
              api_1.context.bind(api_1.context.active(), response);
              return original.apply(this, [event, ...args]);
            });
          }
          const headers = request.headers;
          const spanAttributes = (0, utils_1.getIncomingRequestAttributes)(request, {
            component,
            hookAttributes: instrumentation._callStartSpanHook(request, instrumentation.getConfig().startIncomingSpanHook),
            enableSyntheticSourceDetection: instrumentation.getConfig().enableSyntheticSourceDetection || false,
            redactedQueryParams: instrumentation.getConfig().redactedQueryParamsServer ?? Array.from(internal_types_1.DEFAULT_QUERY_STRINGS_TO_REDACT)
          }, instrumentation._diag);
          Object.assign(spanAttributes, instrumentation._headerCapture.server.captureRequestHeaders((header) => request.headers[header]));
          const spanOptions = {
            kind: api_1.SpanKind.SERVER,
            attributes: spanAttributes
          };
          const startTime = (0, core_1.hrTime)();
          const metricAttributes = {
            [semantic_conventions_1.ATTR_HTTP_REQUEST_METHOD]: spanAttributes[semantic_conventions_1.ATTR_HTTP_REQUEST_METHOD],
            [semantic_conventions_1.ATTR_URL_SCHEME]: spanAttributes[semantic_conventions_1.ATTR_URL_SCHEME]
          };
          if (spanAttributes[semantic_conventions_1.ATTR_NETWORK_PROTOCOL_VERSION]) {
            metricAttributes[semantic_conventions_1.ATTR_NETWORK_PROTOCOL_VERSION] = spanAttributes[semantic_conventions_1.ATTR_NETWORK_PROTOCOL_VERSION];
          }
          const ctx = api_1.propagation.extract(api_1.ROOT_CONTEXT, headers);
          const span = instrumentation._startHttpSpan(method, spanOptions, ctx);
          const rpcMetadata = {
            type: core_1.RPCType.HTTP,
            span
          };
          return api_1.context.with((0, core_1.setRPCMetadata)(api_1.trace.setSpan(ctx, span), rpcMetadata), () => {
            api_1.context.bind(api_1.context.active(), request);
            api_1.context.bind(api_1.context.active(), response);
            if (instrumentation.getConfig().requestHook) {
              instrumentation._callRequestHook(span, request);
            }
            if (instrumentation.getConfig().responseHook) {
              instrumentation._callResponseHook(span, response);
            }
            let hasError = false;
            response.on("close", () => {
              if (hasError) {
                return;
              }
              instrumentation._onServerResponseFinish(request, response, span, metricAttributes, startTime);
            });
            response.on(events_1.errorMonitor, (err) => {
              hasError = true;
              instrumentation._onServerResponseError(span, metricAttributes, startTime, err);
            });
            return (0, instrumentation_1.safeExecuteInTheMiddle)(() => original.apply(this, [event, ...args]), (error) => {
              if (error) {
                instrumentation._onServerResponseError(span, metricAttributes, startTime, error);
                throw error;
              }
            });
          });
        };
      }
      _outgoingRequestFunction(component, original) {
        const instrumentation = this;
        return function outgoingRequest(options, ...args) {
          if (!(0, utils_1.isValidOptionsType)(options)) {
            return original.apply(this, [options, ...args]);
          }
          const extraOptions = typeof args[0] === "object" && (typeof options === "string" || options instanceof url.URL) ? args.shift() : void 0;
          const { method, invalidUrl, optionsParsed } = (0, utils_1.getRequestInfo)(instrumentation._diag, options, extraOptions);
          if ((0, instrumentation_1.safeExecuteInTheMiddle)(() => instrumentation.getConfig().ignoreOutgoingRequestHook?.(optionsParsed), (e) => {
            if (e != null) {
              instrumentation._diag.error("caught ignoreOutgoingRequestHook error: ", e);
            }
          }, true)) {
            return original.apply(this, [optionsParsed, ...args]);
          }
          const { hostname, port } = (0, utils_1.extractHostnameAndPort)(optionsParsed);
          const attributes = (0, utils_1.getOutgoingRequestAttributes)(optionsParsed, {
            component,
            port,
            hostname,
            hookAttributes: instrumentation._callStartSpanHook(optionsParsed, instrumentation.getConfig().startOutgoingSpanHook),
            redactedQueryParams: instrumentation.getConfig().redactedQueryParams
            // Added config for adding custom query strings
          }, instrumentation.getConfig().enableSyntheticSourceDetection || false);
          const startTime = (0, core_1.hrTime)();
          const metricAttributes = {
            [semantic_conventions_1.ATTR_HTTP_REQUEST_METHOD]: attributes[semantic_conventions_1.ATTR_HTTP_REQUEST_METHOD],
            [semantic_conventions_1.ATTR_SERVER_ADDRESS]: attributes[semantic_conventions_1.ATTR_SERVER_ADDRESS],
            [semantic_conventions_1.ATTR_SERVER_PORT]: attributes[semantic_conventions_1.ATTR_SERVER_PORT]
          };
          if (attributes[semantic_conventions_1.ATTR_HTTP_RESPONSE_STATUS_CODE]) {
            metricAttributes[semantic_conventions_1.ATTR_HTTP_RESPONSE_STATUS_CODE] = attributes[semantic_conventions_1.ATTR_HTTP_RESPONSE_STATUS_CODE];
          }
          if (attributes[semantic_conventions_1.ATTR_NETWORK_PROTOCOL_VERSION]) {
            metricAttributes[semantic_conventions_1.ATTR_NETWORK_PROTOCOL_VERSION] = attributes[semantic_conventions_1.ATTR_NETWORK_PROTOCOL_VERSION];
          }
          const spanOptions = {
            kind: api_1.SpanKind.CLIENT,
            attributes
          };
          const span = instrumentation._startHttpSpan(method, spanOptions);
          const parentContext = api_1.context.active();
          const requestContext = api_1.trace.setSpan(parentContext, span);
          if (!optionsParsed.headers) {
            optionsParsed.headers = {};
          } else {
            optionsParsed.headers = Object.assign({}, optionsParsed.headers);
          }
          api_1.propagation.inject(requestContext, optionsParsed.headers);
          return api_1.context.with(requestContext, () => {
            const cb = args[args.length - 1];
            if (typeof cb === "function") {
              args[args.length - 1] = api_1.context.bind(parentContext, cb);
            }
            const request = (0, instrumentation_1.safeExecuteInTheMiddle)(() => {
              if (invalidUrl) {
                return original.apply(this, [options, ...args]);
              } else {
                return original.apply(this, [optionsParsed, ...args]);
              }
            }, (error) => {
              if (error) {
                instrumentation._onOutgoingRequestError(span, metricAttributes, startTime, error);
                throw error;
              }
            });
            instrumentation._diag.debug(`${component} instrumentation outgoingRequest`);
            api_1.context.bind(parentContext, request);
            return instrumentation._traceClientRequest(request, span, startTime, metricAttributes);
          });
        };
      }
      _onServerResponseFinish(request, response, span, metricAttributes, startTime) {
        const attributes = (0, utils_1.getIncomingRequestAttributesOnResponse)(response);
        metricAttributes = Object.assign(metricAttributes, (0, utils_1.getIncomingStableRequestMetricAttributesOnResponse)(attributes));
        span.setAttributes(this._headerCapture.server.captureResponseHeaders((header) => response.getHeader(header)));
        span.setAttributes(attributes).setStatus({
          code: (0, utils_1.parseResponseStatus)(api_1.SpanKind.SERVER, response.statusCode)
        });
        const route = attributes[semantic_conventions_1.ATTR_HTTP_ROUTE];
        if (route) {
          span.updateName(`${request.method || "GET"} ${route}`);
        }
        if (this.getConfig().applyCustomAttributesOnSpan) {
          (0, instrumentation_1.safeExecuteInTheMiddle)(() => this.getConfig().applyCustomAttributesOnSpan(span, request, response), () => {
          }, true);
        }
        this._closeHttpSpan(span, api_1.SpanKind.SERVER, startTime, metricAttributes);
      }
      _onOutgoingRequestError(span, metricAttributes, startTime, error) {
        (0, utils_1.setSpanWithError)(span, error);
        metricAttributes[semantic_conventions_1.ATTR_ERROR_TYPE] = error.name;
        this._closeHttpSpan(span, api_1.SpanKind.CLIENT, startTime, metricAttributes);
      }
      _onServerResponseError(span, metricAttributes, startTime, error) {
        (0, utils_1.setSpanWithError)(span, error);
        metricAttributes[semantic_conventions_1.ATTR_ERROR_TYPE] = error.name;
        this._closeHttpSpan(span, api_1.SpanKind.SERVER, startTime, metricAttributes);
      }
      _startHttpSpan(name, options, ctx = api_1.context.active()) {
        const requireParent = options.kind === api_1.SpanKind.CLIENT ? this.getConfig().requireParentforOutgoingSpans : this.getConfig().requireParentforIncomingSpans;
        let span;
        const currentSpan = api_1.trace.getSpan(ctx);
        if (requireParent === true && (!currentSpan || !api_1.trace.isSpanContextValid(currentSpan.spanContext()))) {
          span = api_1.trace.wrapSpanContext(api_1.INVALID_SPAN_CONTEXT);
        } else if (requireParent === true && currentSpan?.spanContext().isRemote) {
          span = currentSpan;
        } else {
          span = this.tracer.startSpan(name, options, ctx);
        }
        this._spanNotEnded.add(span);
        return span;
      }
      _closeHttpSpan(span, spanKind, startTime, metricAttributes) {
        if (!this._spanNotEnded.has(span)) {
          return;
        }
        span.end();
        this._spanNotEnded.delete(span);
        const duration = (0, core_1.hrTimeToMilliseconds)((0, core_1.hrTimeDuration)(startTime, (0, core_1.hrTime)()));
        if (spanKind === api_1.SpanKind.SERVER) {
          this._recordServerDuration(duration, metricAttributes);
        } else if (spanKind === api_1.SpanKind.CLIENT) {
          this._recordClientDuration(duration, metricAttributes);
        }
      }
      _callResponseHook(span, response) {
        (0, instrumentation_1.safeExecuteInTheMiddle)(() => this.getConfig().responseHook(span, response), () => {
        }, true);
      }
      _callRequestHook(span, request) {
        (0, instrumentation_1.safeExecuteInTheMiddle)(() => this.getConfig().requestHook(span, request), () => {
        }, true);
      }
      _callStartSpanHook(request, hookFunc) {
        if (typeof hookFunc === "function") {
          return (0, instrumentation_1.safeExecuteInTheMiddle)(() => hookFunc(request), () => {
          }, true);
        }
      }
      _createHeaderCapture() {
        const config = this.getConfig();
        return {
          client: {
            captureRequestHeaders: (0, utils_1.headerCapture)("request", config.headersToSpanAttributes?.client?.requestHeaders ?? []),
            captureResponseHeaders: (0, utils_1.headerCapture)("response", config.headersToSpanAttributes?.client?.responseHeaders ?? [])
          },
          server: {
            captureRequestHeaders: (0, utils_1.headerCapture)("request", config.headersToSpanAttributes?.server?.requestHeaders ?? []),
            captureResponseHeaders: (0, utils_1.headerCapture)("response", config.headersToSpanAttributes?.server?.responseHeaders ?? [])
          }
        };
      }
    };
    exports2.HttpInstrumentation = HttpInstrumentation2;
  }
});

// node_modules/@opentelemetry/instrumentation-http/build/src/index.js
var require_src9 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-http/build/src/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.HttpInstrumentation = void 0;
    var http_1 = require_http();
    Object.defineProperty(exports2, "HttpInstrumentation", { enumerable: true, get: function() {
      return http_1.HttpInstrumentation;
    } });
  }
});

// node_modules/@opentelemetry/instrumentation-express/build/src/enums/ExpressLayerType.js
var require_ExpressLayerType = __commonJS({
  "node_modules/@opentelemetry/instrumentation-express/build/src/enums/ExpressLayerType.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ExpressLayerType = void 0;
    var ExpressLayerType;
    (function(ExpressLayerType2) {
      ExpressLayerType2["ROUTER"] = "router";
      ExpressLayerType2["MIDDLEWARE"] = "middleware";
      ExpressLayerType2["REQUEST_HANDLER"] = "request_handler";
    })(ExpressLayerType = exports2.ExpressLayerType || (exports2.ExpressLayerType = {}));
  }
});

// node_modules/@opentelemetry/instrumentation-express/build/src/enums/AttributeNames.js
var require_AttributeNames = __commonJS({
  "node_modules/@opentelemetry/instrumentation-express/build/src/enums/AttributeNames.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.AttributeNames = void 0;
    var AttributeNames;
    (function(AttributeNames2) {
      AttributeNames2["EXPRESS_TYPE"] = "express.type";
      AttributeNames2["EXPRESS_NAME"] = "express.name";
    })(AttributeNames = exports2.AttributeNames || (exports2.AttributeNames = {}));
  }
});

// node_modules/@opentelemetry/instrumentation-express/build/src/internal-types.js
var require_internal_types2 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-express/build/src/internal-types.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2._LAYERS_STORE_PROPERTY = exports2.kLayerPatched = void 0;
    exports2.kLayerPatched = /* @__PURE__ */ Symbol("express-layer-patched");
    exports2._LAYERS_STORE_PROPERTY = "__ot_middlewares";
  }
});

// node_modules/@opentelemetry/instrumentation-express/build/src/utils.js
var require_utils7 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-express/build/src/utils.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getActualMatchedRoute = exports2.getConstructedRoute = exports2.getLayerPath = exports2.asErrorAndMessage = exports2.isLayerIgnored = exports2.getLayerMetadata = exports2.getRouterPath = exports2.storeLayerPath = void 0;
    var ExpressLayerType_1 = require_ExpressLayerType();
    var AttributeNames_1 = require_AttributeNames();
    var internal_types_1 = require_internal_types2();
    var storeLayerPath = (request, value) => {
      if (Array.isArray(request[internal_types_1._LAYERS_STORE_PROPERTY]) === false) {
        Object.defineProperty(request, internal_types_1._LAYERS_STORE_PROPERTY, {
          enumerable: false,
          value: []
        });
      }
      if (value === void 0)
        return { isLayerPathStored: false };
      request[internal_types_1._LAYERS_STORE_PROPERTY].push(value);
      return { isLayerPathStored: true };
    };
    exports2.storeLayerPath = storeLayerPath;
    var getRouterPath = (path, layer) => {
      const stackLayer = layer.handle?.stack?.[0];
      if (stackLayer?.route?.path) {
        return `${path}${stackLayer.route.path}`;
      }
      if (stackLayer?.handle?.stack) {
        return (0, exports2.getRouterPath)(path, stackLayer);
      }
      return path;
    };
    exports2.getRouterPath = getRouterPath;
    var getLayerMetadata = (route, layer, layerPath) => {
      if (layer.name === "router") {
        const maybeRouterPath = (0, exports2.getRouterPath)("", layer);
        const extractedRouterPath = maybeRouterPath ? maybeRouterPath : layerPath || route || "/";
        return {
          attributes: {
            [AttributeNames_1.AttributeNames.EXPRESS_NAME]: extractedRouterPath,
            [AttributeNames_1.AttributeNames.EXPRESS_TYPE]: ExpressLayerType_1.ExpressLayerType.ROUTER
          },
          name: `router - ${extractedRouterPath}`
        };
      } else if (layer.name === "bound dispatch" || layer.name === "handle") {
        return {
          attributes: {
            [AttributeNames_1.AttributeNames.EXPRESS_NAME]: (route || layerPath) ?? "request handler",
            [AttributeNames_1.AttributeNames.EXPRESS_TYPE]: ExpressLayerType_1.ExpressLayerType.REQUEST_HANDLER
          },
          name: `request handler${layer.path ? ` - ${route || layerPath}` : ""}`
        };
      } else {
        return {
          attributes: {
            [AttributeNames_1.AttributeNames.EXPRESS_NAME]: layer.name,
            [AttributeNames_1.AttributeNames.EXPRESS_TYPE]: ExpressLayerType_1.ExpressLayerType.MIDDLEWARE
          },
          name: `middleware - ${layer.name}`
        };
      }
    };
    exports2.getLayerMetadata = getLayerMetadata;
    var satisfiesPattern = (constant, pattern) => {
      if (typeof pattern === "string") {
        return pattern === constant;
      } else if (pattern instanceof RegExp) {
        return pattern.test(constant);
      } else if (typeof pattern === "function") {
        return pattern(constant);
      } else {
        throw new TypeError("Pattern is in unsupported datatype");
      }
    };
    var isLayerIgnored = (name, type, config) => {
      if (Array.isArray(config?.ignoreLayersType) && config?.ignoreLayersType?.includes(type)) {
        return true;
      }
      if (Array.isArray(config?.ignoreLayers) === false)
        return false;
      try {
        for (const pattern of config.ignoreLayers) {
          if (satisfiesPattern(name, pattern)) {
            return true;
          }
        }
      } catch (e) {
      }
      return false;
    };
    exports2.isLayerIgnored = isLayerIgnored;
    var asErrorAndMessage = (error) => error instanceof Error ? [error, error.message] : [String(error), String(error)];
    exports2.asErrorAndMessage = asErrorAndMessage;
    var getLayerPath = (args) => {
      const firstArg = args[0];
      if (Array.isArray(firstArg)) {
        return firstArg.map((arg) => extractLayerPathSegment(arg) || "").join(",");
      }
      return extractLayerPathSegment(firstArg);
    };
    exports2.getLayerPath = getLayerPath;
    var extractLayerPathSegment = (arg) => {
      if (typeof arg === "string") {
        return arg;
      }
      if (arg instanceof RegExp || typeof arg === "number") {
        return arg.toString();
      }
      return;
    };
    function getConstructedRoute(req) {
      const layersStore = Array.isArray(req[internal_types_1._LAYERS_STORE_PROPERTY]) ? req[internal_types_1._LAYERS_STORE_PROPERTY] : [];
      const meaningfulPaths = layersStore.filter(
        // Exclude root path, wildcard '/*', and Express v5 wildcard segments like /{*param} or /{**param}
        (path) => path !== "/" && path !== "/*" && !/^\/\{[*][^}]*\}$/.test(path)
      );
      if (meaningfulPaths.length === 1 && meaningfulPaths[0] === "*") {
        return "*";
      }
      return meaningfulPaths.join("").replace(/\/{2,}/g, "/");
    }
    exports2.getConstructedRoute = getConstructedRoute;
    function getActualMatchedRoute(req) {
      const layersStore = Array.isArray(req[internal_types_1._LAYERS_STORE_PROPERTY]) ? req[internal_types_1._LAYERS_STORE_PROPERTY] : [];
      if (layersStore.length === 0) {
        return void 0;
      }
      if (layersStore.every((path) => path === "/")) {
        return req.originalUrl === "/" ? "/" : void 0;
      }
      const constructedRoute = getConstructedRoute(req);
      if (constructedRoute === "*") {
        return constructedRoute;
      }
      if (constructedRoute.includes("/") && (constructedRoute.includes(",") || constructedRoute.includes("\\") || constructedRoute.includes("*") || constructedRoute.includes("["))) {
        return constructedRoute;
      }
      const normalizedRoute = constructedRoute.startsWith("/") ? constructedRoute : `/${constructedRoute}`;
      const isValidRoute = normalizedRoute.length > 0 && (req.originalUrl === normalizedRoute || req.originalUrl.startsWith(normalizedRoute) || isRoutePattern(normalizedRoute));
      return isValidRoute ? normalizedRoute : void 0;
    }
    exports2.getActualMatchedRoute = getActualMatchedRoute;
    function isRoutePattern(route) {
      return route.includes(":") || route.includes("*");
    }
  }
});

// node_modules/@opentelemetry/instrumentation-express/build/src/version.js
var require_version4 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-express/build/src/version.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PACKAGE_NAME = exports2.PACKAGE_VERSION = void 0;
    exports2.PACKAGE_VERSION = "0.71.1";
    exports2.PACKAGE_NAME = "@opentelemetry/instrumentation-express";
  }
});

// node_modules/@opentelemetry/instrumentation-express/build/src/instrumentation.js
var require_instrumentation3 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-express/build/src/instrumentation.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ExpressInstrumentation = void 0;
    var core_1 = require_src2();
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var ExpressLayerType_1 = require_ExpressLayerType();
    var AttributeNames_1 = require_AttributeNames();
    var utils_1 = require_utils7();
    var version_1 = require_version4();
    var instrumentation_1 = require_src8();
    var semantic_conventions_1 = require_dist();
    var internal_types_1 = require_internal_types2();
    var ExpressInstrumentation2 = class extends instrumentation_1.InstrumentationBase {
      constructor(config = {}) {
        super(version_1.PACKAGE_NAME, version_1.PACKAGE_VERSION, config);
      }
      init() {
        return [
          new instrumentation_1.InstrumentationNodeModuleDefinition("express", [">=4.0.0 <6"], (moduleExports) => {
            const isExpressWithRouterPrototype = typeof moduleExports?.Router?.prototype?.route === "function";
            const routerProto = isExpressWithRouterPrototype ? moduleExports.Router.prototype : moduleExports.Router;
            if ((0, instrumentation_1.isWrapped)(routerProto.route)) {
              this._unwrap(routerProto, "route");
            }
            this._wrap(routerProto, "route", this._getRoutePatch());
            if ((0, instrumentation_1.isWrapped)(routerProto.use)) {
              this._unwrap(routerProto, "use");
            }
            this._wrap(routerProto, "use", this._getRouterUsePatch());
            if ((0, instrumentation_1.isWrapped)(moduleExports.application.use)) {
              this._unwrap(moduleExports.application, "use");
            }
            this._wrap(
              moduleExports.application,
              "use",
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              this._getAppUsePatch(isExpressWithRouterPrototype)
            );
            return moduleExports;
          }, (moduleExports) => {
            if (moduleExports === void 0)
              return;
            const isExpressWithRouterPrototype = typeof moduleExports?.Router?.prototype?.route === "function";
            const routerProto = isExpressWithRouterPrototype ? moduleExports.Router.prototype : moduleExports.Router;
            this._unwrap(routerProto, "route");
            this._unwrap(routerProto, "use");
            this._unwrap(moduleExports.application, "use");
          })
        ];
      }
      /**
       * Get the patch for Router.route function
       */
      _getRoutePatch() {
        const instrumentation = this;
        return function(original) {
          return function route_trace(...args) {
            const route = original.apply(this, args);
            const layer = this.stack[this.stack.length - 1];
            instrumentation._applyPatch(layer, (0, utils_1.getLayerPath)(args));
            return route;
          };
        };
      }
      /**
       * Get the patch for Router.use function
       */
      _getRouterUsePatch() {
        const instrumentation = this;
        return function(original) {
          return function use(...args) {
            const route = original.apply(this, args);
            const layer = this.stack[this.stack.length - 1];
            instrumentation._applyPatch(layer, (0, utils_1.getLayerPath)(args));
            return route;
          };
        };
      }
      /**
       * Get the patch for Application.use function
       */
      _getAppUsePatch(isExpressWithRouterPrototype) {
        const instrumentation = this;
        return function(original) {
          return function use(...args) {
            const router = isExpressWithRouterPrototype ? this.router : this._router;
            const route = original.apply(this, args);
            if (router) {
              const layer = router.stack[router.stack.length - 1];
              instrumentation._applyPatch(layer, (0, utils_1.getLayerPath)(args));
            }
            return route;
          };
        };
      }
      /** Patch each express layer to create span and propagate context */
      _applyPatch(layer, layerPath) {
        const instrumentation = this;
        if (layer[internal_types_1.kLayerPatched] === true)
          return;
        layer[internal_types_1.kLayerPatched] = true;
        this._wrap(layer, "handle", (original) => {
          if (original.length === 4)
            return original;
          const patched = function(req, res) {
            const { isLayerPathStored } = (0, utils_1.storeLayerPath)(req, layerPath);
            const constructedRoute = (0, utils_1.getConstructedRoute)(req);
            const actualMatchedRoute = (0, utils_1.getActualMatchedRoute)(req);
            const attributes = {
              [semantic_conventions_1.ATTR_HTTP_ROUTE]: actualMatchedRoute
            };
            const metadata = (0, utils_1.getLayerMetadata)(constructedRoute, layer, layerPath);
            const type = metadata.attributes[AttributeNames_1.AttributeNames.EXPRESS_TYPE];
            const rpcMetadata = (0, core_1.getRPCMetadata)(api_1.context.active());
            if (rpcMetadata?.type === core_1.RPCType.HTTP) {
              rpcMetadata.route = actualMatchedRoute;
            }
            if ((0, utils_1.isLayerIgnored)(metadata.name, type, instrumentation.getConfig())) {
              if (type !== ExpressLayerType_1.ExpressLayerType.ROUTER && isLayerPathStored) {
                req[internal_types_1._LAYERS_STORE_PROPERTY].pop();
              }
              return original.apply(this, arguments);
            }
            if (api_1.trace.getSpan(api_1.context.active()) === void 0) {
              return original.apply(this, arguments);
            }
            const spanName = instrumentation._getSpanName({
              request: req,
              layerType: type,
              route: constructedRoute
            }, metadata.name);
            const span = instrumentation.tracer.startSpan(spanName, {
              attributes: Object.assign(attributes, metadata.attributes)
            });
            const parentContext = api_1.context.active();
            let currentContext = api_1.trace.setSpan(parentContext, span);
            const { requestHook } = instrumentation.getConfig();
            if (requestHook) {
              (0, instrumentation_1.safeExecuteInTheMiddle)(() => requestHook(span, {
                request: req,
                layerType: type,
                route: constructedRoute
              }), (e) => {
                if (e) {
                  api_1.diag.error("express instrumentation: request hook failed", e);
                }
              }, true);
            }
            let spanHasEnded = false;
            if (metadata.attributes[AttributeNames_1.AttributeNames.EXPRESS_TYPE] === ExpressLayerType_1.ExpressLayerType.ROUTER) {
              span.end();
              spanHasEnded = true;
              currentContext = parentContext;
            }
            const onResponseEnded = () => {
              if (spanHasEnded === false) {
                spanHasEnded = true;
                span.end();
              }
            };
            const args = Array.from(arguments);
            const callbackIdx = args.findIndex((arg) => typeof arg === "function");
            if (callbackIdx >= 0) {
              arguments[callbackIdx] = function() {
                const maybeError = arguments[0];
                const isError = ![void 0, null, "route", "router"].includes(maybeError);
                if (!spanHasEnded && isError) {
                  const [error, message] = (0, utils_1.asErrorAndMessage)(maybeError);
                  span.recordException(error);
                  span.setStatus({
                    code: api_1.SpanStatusCode.ERROR,
                    message
                  });
                }
                if (spanHasEnded === false) {
                  spanHasEnded = true;
                  req.res?.removeListener("close", onResponseEnded);
                  span.end();
                }
                if (!(req.route && isError) && isLayerPathStored) {
                  req[internal_types_1._LAYERS_STORE_PROPERTY].pop();
                }
                const callback = args[callbackIdx];
                const activeContext = api_1.context.active();
                const parentSpan = api_1.trace.getSpan(parentContext);
                const nextContext = parentSpan ? api_1.trace.setSpan(activeContext, parentSpan) : activeContext;
                return api_1.context.bind(nextContext, callback).apply(this, arguments);
              };
            }
            try {
              return api_1.context.bind(currentContext, original).apply(this, arguments);
            } catch (anyError) {
              const [error, message] = (0, utils_1.asErrorAndMessage)(anyError);
              span.recordException(error);
              span.setStatus({
                code: api_1.SpanStatusCode.ERROR,
                message
              });
              throw anyError;
            } finally {
              if (!spanHasEnded) {
                res.once("close", onResponseEnded);
              }
            }
          };
          for (const key in original) {
            Object.defineProperty(patched, key, {
              get() {
                return original[key];
              },
              set(value) {
                original[key] = value;
              }
            });
          }
          return patched;
        });
      }
      _getSpanName(info, defaultName) {
        const { spanNameHook } = this.getConfig();
        if (!(spanNameHook instanceof Function)) {
          return defaultName;
        }
        try {
          return spanNameHook(info, defaultName) ?? defaultName;
        } catch (err) {
          api_1.diag.error("express instrumentation: error calling span name rewrite hook", err);
          return defaultName;
        }
      }
    };
    exports2.ExpressInstrumentation = ExpressInstrumentation2;
  }
});

// node_modules/@opentelemetry/instrumentation-express/build/src/index.js
var require_src10 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-express/build/src/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.AttributeNames = exports2.ExpressLayerType = exports2.ExpressInstrumentation = void 0;
    var instrumentation_1 = require_instrumentation3();
    Object.defineProperty(exports2, "ExpressInstrumentation", { enumerable: true, get: function() {
      return instrumentation_1.ExpressInstrumentation;
    } });
    var ExpressLayerType_1 = require_ExpressLayerType();
    Object.defineProperty(exports2, "ExpressLayerType", { enumerable: true, get: function() {
      return ExpressLayerType_1.ExpressLayerType;
    } });
    var AttributeNames_1 = require_AttributeNames();
    Object.defineProperty(exports2, "AttributeNames", { enumerable: true, get: function() {
      return AttributeNames_1.AttributeNames;
    } });
  }
});

// node_modules/@opentelemetry/instrumentation-nestjs-core/build/src/version.js
var require_version5 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-nestjs-core/build/src/version.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PACKAGE_NAME = exports2.PACKAGE_VERSION = void 0;
    exports2.PACKAGE_VERSION = "0.70.0";
    exports2.PACKAGE_NAME = "@opentelemetry/instrumentation-nestjs-core";
  }
});

// node_modules/@opentelemetry/instrumentation-nestjs-core/build/src/enums/AttributeNames.js
var require_AttributeNames2 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-nestjs-core/build/src/enums/AttributeNames.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.AttributeNames = void 0;
    var AttributeNames;
    (function(AttributeNames2) {
      AttributeNames2["VERSION"] = "nestjs.version";
      AttributeNames2["TYPE"] = "nestjs.type";
      AttributeNames2["MODULE"] = "nestjs.module";
      AttributeNames2["CONTROLLER"] = "nestjs.controller";
      AttributeNames2["CALLBACK"] = "nestjs.callback";
      AttributeNames2["PIPES"] = "nestjs.pipes";
      AttributeNames2["INTERCEPTORS"] = "nestjs.interceptors";
      AttributeNames2["GUARDS"] = "nestjs.guards";
    })(AttributeNames = exports2.AttributeNames || (exports2.AttributeNames = {}));
  }
});

// node_modules/@opentelemetry/instrumentation-nestjs-core/build/src/enums/NestType.js
var require_NestType = __commonJS({
  "node_modules/@opentelemetry/instrumentation-nestjs-core/build/src/enums/NestType.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.NestType = void 0;
    var NestType;
    (function(NestType2) {
      NestType2["APP_CREATION"] = "app_creation";
      NestType2["REQUEST_CONTEXT"] = "request_context";
      NestType2["REQUEST_HANDLER"] = "handler";
    })(NestType = exports2.NestType || (exports2.NestType = {}));
  }
});

// node_modules/@opentelemetry/instrumentation-nestjs-core/build/src/enums/index.js
var require_enums2 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-nestjs-core/build/src/enums/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.NestType = exports2.AttributeNames = void 0;
    var AttributeNames_1 = require_AttributeNames2();
    Object.defineProperty(exports2, "AttributeNames", { enumerable: true, get: function() {
      return AttributeNames_1.AttributeNames;
    } });
    var NestType_1 = require_NestType();
    Object.defineProperty(exports2, "NestType", { enumerable: true, get: function() {
      return NestType_1.NestType;
    } });
  }
});

// node_modules/@opentelemetry/instrumentation-nestjs-core/build/src/instrumentation.js
var require_instrumentation4 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-nestjs-core/build/src/instrumentation.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.NestInstrumentation = void 0;
    var api = (init_esm(), __toCommonJS(esm_exports));
    var instrumentation_1 = require_src8();
    var semantic_conventions_1 = require_dist();
    var version_1 = require_version5();
    var enums_1 = require_enums2();
    var supportedVersions = [">=4.0.0 <12"];
    var NestInstrumentation2 = class _NestInstrumentation extends instrumentation_1.InstrumentationBase {
      static COMPONENT = "@nestjs/core";
      static COMMON_ATTRIBUTES = {
        component: _NestInstrumentation.COMPONENT
      };
      constructor(config = {}) {
        super(version_1.PACKAGE_NAME, version_1.PACKAGE_VERSION, config);
      }
      init() {
        const module3 = new instrumentation_1.InstrumentationNodeModuleDefinition(_NestInstrumentation.COMPONENT, supportedVersions);
        module3.files.push(this.getNestFactoryFileInstrumentation(supportedVersions), this.getRouterExecutionContextFileInstrumentation(supportedVersions));
        return module3;
      }
      getNestFactoryFileInstrumentation(versions) {
        return new instrumentation_1.InstrumentationNodeModuleFile("@nestjs/core/nest-factory.js", versions, (NestFactoryStatic, moduleVersion) => {
          this.ensureWrapped(NestFactoryStatic.NestFactoryStatic.prototype, "create", createWrapNestFactoryCreate(this.tracer, moduleVersion));
          return NestFactoryStatic;
        }, (NestFactoryStatic) => {
          this._unwrap(NestFactoryStatic.NestFactoryStatic.prototype, "create");
        });
      }
      getRouterExecutionContextFileInstrumentation(versions) {
        return new instrumentation_1.InstrumentationNodeModuleFile("@nestjs/core/router/router-execution-context.js", versions, (RouterExecutionContext, moduleVersion) => {
          this.ensureWrapped(RouterExecutionContext.RouterExecutionContext.prototype, "create", createWrapCreateHandler(this.tracer, moduleVersion));
          return RouterExecutionContext;
        }, (RouterExecutionContext) => {
          this._unwrap(RouterExecutionContext.RouterExecutionContext.prototype, "create");
        });
      }
      ensureWrapped(obj, methodName, wrapper) {
        if ((0, instrumentation_1.isWrapped)(obj[methodName])) {
          this._unwrap(obj, methodName);
        }
        this._wrap(obj, methodName, wrapper);
      }
    };
    exports2.NestInstrumentation = NestInstrumentation2;
    function createWrapNestFactoryCreate(tracer, moduleVersion) {
      return function wrapCreate(original) {
        return function createWithTrace(nestModule) {
          const span = tracer.startSpan("Create Nest App", {
            attributes: {
              ...NestInstrumentation2.COMMON_ATTRIBUTES,
              [enums_1.AttributeNames.TYPE]: enums_1.NestType.APP_CREATION,
              [enums_1.AttributeNames.VERSION]: moduleVersion,
              [enums_1.AttributeNames.MODULE]: nestModule.name
            }
          });
          const spanContext = api.trace.setSpan(api.context.active(), span);
          return api.context.with(spanContext, async () => {
            try {
              return await original.apply(this, arguments);
            } catch (e) {
              throw addError(span, e);
            } finally {
              span.end();
            }
          });
        };
      };
    }
    function createWrapCreateHandler(tracer, moduleVersion) {
      return function wrapCreateHandler(original) {
        return function createHandlerWithTrace(instance, callback) {
          arguments[1] = createWrapHandler(tracer, moduleVersion, callback);
          const handler = original.apply(this, arguments);
          const callbackName = callback.name;
          const instanceName = instance.constructor && instance.constructor.name ? instance.constructor.name : "UnnamedInstance";
          const spanName = callbackName ? `${instanceName}.${callbackName}` : instanceName;
          return function(req, res, next) {
            const attributes = {
              ...NestInstrumentation2.COMMON_ATTRIBUTES,
              [enums_1.AttributeNames.VERSION]: moduleVersion,
              [enums_1.AttributeNames.TYPE]: enums_1.NestType.REQUEST_CONTEXT,
              [semantic_conventions_1.ATTR_HTTP_ROUTE]: req.route?.path || req.routeOptions?.url || req.routerPath,
              [enums_1.AttributeNames.CONTROLLER]: instanceName,
              [enums_1.AttributeNames.CALLBACK]: callbackName
            };
            attributes[semantic_conventions_1.ATTR_HTTP_REQUEST_METHOD] = req.method;
            attributes[semantic_conventions_1.ATTR_URL_FULL] = req.originalUrl || req.url;
            const span = tracer.startSpan(spanName, { attributes });
            const spanContext = api.trace.setSpan(api.context.active(), span);
            return api.context.with(spanContext, async () => {
              try {
                return await handler.apply(this, arguments);
              } catch (e) {
                throw addError(span, e);
              } finally {
                span.end();
              }
            });
          };
        };
      };
    }
    function createWrapHandler(tracer, moduleVersion, handler) {
      const spanName = handler.name || "anonymous nest handler";
      const options = {
        attributes: {
          ...NestInstrumentation2.COMMON_ATTRIBUTES,
          [enums_1.AttributeNames.VERSION]: moduleVersion,
          [enums_1.AttributeNames.TYPE]: enums_1.NestType.REQUEST_HANDLER,
          [enums_1.AttributeNames.CALLBACK]: handler.name
        }
      };
      const wrappedHandler = function() {
        const span = tracer.startSpan(spanName, options);
        const spanContext = api.trace.setSpan(api.context.active(), span);
        return api.context.with(spanContext, async () => {
          try {
            return await handler.apply(this, arguments);
          } catch (e) {
            throw addError(span, e);
          } finally {
            span.end();
          }
        });
      };
      if (handler.name) {
        Object.defineProperty(wrappedHandler, "name", { value: handler.name });
      }
      Reflect.getMetadataKeys(handler).forEach((metadataKey) => {
        Reflect.defineMetadata(metadataKey, Reflect.getMetadata(metadataKey, handler), wrappedHandler);
      });
      return wrappedHandler;
    }
    var addError = (span, error) => {
      span.recordException(error);
      span.setStatus({ code: api.SpanStatusCode.ERROR, message: error.message });
      return error;
    };
  }
});

// node_modules/@opentelemetry/instrumentation-nestjs-core/build/src/index.js
var require_src11 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-nestjs-core/build/src/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.AttributeNames = exports2.NestInstrumentation = void 0;
    var instrumentation_1 = require_instrumentation4();
    Object.defineProperty(exports2, "NestInstrumentation", { enumerable: true, get: function() {
      return instrumentation_1.NestInstrumentation;
    } });
    var AttributeNames_1 = require_AttributeNames2();
    Object.defineProperty(exports2, "AttributeNames", { enumerable: true, get: function() {
      return AttributeNames_1.AttributeNames;
    } });
  }
});

// node_modules/@opentelemetry/instrumentation-pg/build/src/internal-types.js
var require_internal_types3 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-pg/build/src/internal-types.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.EVENT_LISTENERS_SET = void 0;
    exports2.EVENT_LISTENERS_SET = /* @__PURE__ */ Symbol("opentelemetry.instrumentation.pg.eventListenersSet");
  }
});

// node_modules/@opentelemetry/instrumentation-pg/build/src/enums/AttributeNames.js
var require_AttributeNames3 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-pg/build/src/enums/AttributeNames.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.AttributeNames = void 0;
    var AttributeNames;
    (function(AttributeNames2) {
      AttributeNames2["PG_VALUES"] = "db.postgresql.values";
      AttributeNames2["PG_PLAN"] = "db.postgresql.plan";
      AttributeNames2["IDLE_TIMEOUT_MILLIS"] = "db.postgresql.idle.timeout.millis";
      AttributeNames2["MAX_CLIENT"] = "db.postgresql.max.client";
    })(AttributeNames = exports2.AttributeNames || (exports2.AttributeNames = {}));
  }
});

// node_modules/@opentelemetry/instrumentation-pg/build/src/semconv.js
var require_semconv5 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-pg/build/src/semconv.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.METRIC_DB_CLIENT_CONNECTION_PENDING_REQUESTS = exports2.METRIC_DB_CLIENT_CONNECTION_MAX = exports2.METRIC_DB_CLIENT_CONNECTION_COUNT = exports2.DB_SYSTEM_NAME_VALUE_POSTGRESQL = exports2.DB_CLIENT_CONNECTION_STATE_VALUE_USED = exports2.DB_CLIENT_CONNECTION_STATE_VALUE_IDLE = exports2.ATTR_DB_CLIENT_CONNECTION_STATE = exports2.ATTR_DB_CLIENT_CONNECTION_POOL_NAME = void 0;
    exports2.ATTR_DB_CLIENT_CONNECTION_POOL_NAME = "db.client.connection.pool.name";
    exports2.ATTR_DB_CLIENT_CONNECTION_STATE = "db.client.connection.state";
    exports2.DB_CLIENT_CONNECTION_STATE_VALUE_IDLE = "idle";
    exports2.DB_CLIENT_CONNECTION_STATE_VALUE_USED = "used";
    exports2.DB_SYSTEM_NAME_VALUE_POSTGRESQL = "postgresql";
    exports2.METRIC_DB_CLIENT_CONNECTION_COUNT = "db.client.connection.count";
    exports2.METRIC_DB_CLIENT_CONNECTION_MAX = "db.client.connection.max";
    exports2.METRIC_DB_CLIENT_CONNECTION_PENDING_REQUESTS = "db.client.connection.pending_requests";
  }
});

// node_modules/@opentelemetry/instrumentation-pg/build/src/enums/SpanNames.js
var require_SpanNames = __commonJS({
  "node_modules/@opentelemetry/instrumentation-pg/build/src/enums/SpanNames.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SpanNames = void 0;
    var SpanNames;
    (function(SpanNames2) {
      SpanNames2["QUERY_PREFIX"] = "pg.query";
      SpanNames2["CONNECT"] = "pg.connect";
      SpanNames2["POOL_CONNECT"] = "pg-pool.connect";
    })(SpanNames = exports2.SpanNames || (exports2.SpanNames = {}));
  }
});

// node_modules/@opentelemetry/instrumentation-pg/build/src/utils.js
var require_utils8 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-pg/build/src/utils.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.sanitizedErrorMessage = exports2.isObjectWithTextString = exports2.getErrorMessage = exports2.patchClientConnectCallback = exports2.patchCallbackPGPool = exports2.updateCounter = exports2.getPoolName = exports2.patchCallback = exports2.handleExecutionResult = exports2.handleConfigQuery = exports2.shouldSkipInstrumentation = exports2.handleConnectionHook = exports2.getConnectionInfoFromPoolConnection = exports2.getSemanticAttributesFromPoolConnection = exports2.getSemanticAttributesFromConnection = exports2.getConnectionString = exports2.parseAndMaskConnectionString = exports2.parseNormalizedOperationName = exports2.getQuerySpanName = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var AttributeNames_1 = require_AttributeNames3();
    var semantic_conventions_1 = require_dist();
    var semconv_1 = require_semconv5();
    var instrumentation_1 = require_src8();
    var SpanNames_1 = require_SpanNames();
    function getQuerySpanName(dbName, queryConfig) {
      if (!queryConfig)
        return SpanNames_1.SpanNames.QUERY_PREFIX;
      const command = typeof queryConfig.name === "string" && queryConfig.name ? queryConfig.name : parseNormalizedOperationName(queryConfig.text);
      return `${SpanNames_1.SpanNames.QUERY_PREFIX}:${command}${dbName ? ` ${dbName}` : ""}`;
    }
    exports2.getQuerySpanName = getQuerySpanName;
    function parseNormalizedOperationName(queryText) {
      const trimmedQuery = queryText.trim();
      const indexOfFirstSpace = trimmedQuery.indexOf(" ");
      let sqlCommand = indexOfFirstSpace === -1 ? trimmedQuery : trimmedQuery.slice(0, indexOfFirstSpace);
      sqlCommand = sqlCommand.toUpperCase();
      return sqlCommand.endsWith(";") ? sqlCommand.slice(0, -1) : sqlCommand;
    }
    exports2.parseNormalizedOperationName = parseNormalizedOperationName;
    function parseAndMaskConnectionString(connectionString) {
      try {
        const url = new URL(connectionString);
        url.username = "";
        url.password = "";
        return url.toString();
      } catch (e) {
        return "postgresql://localhost:5432/";
      }
    }
    exports2.parseAndMaskConnectionString = parseAndMaskConnectionString;
    function getConnectionString(params) {
      if ("connectionString" in params && params.connectionString) {
        return parseAndMaskConnectionString(params.connectionString);
      }
      const host = params.host || "localhost";
      const port = params.port || 5432;
      const database = params.database || "";
      return `postgresql://${host}:${port}/${database}`;
    }
    exports2.getConnectionString = getConnectionString;
    function getPort(port) {
      if (Number.isInteger(port)) {
        return port;
      }
      return void 0;
    }
    function getSemanticAttributesFromConnection(params) {
      const attributes = {
        [semantic_conventions_1.ATTR_DB_SYSTEM_NAME]: semantic_conventions_1.DB_SYSTEM_NAME_VALUE_POSTGRESQL,
        [semantic_conventions_1.ATTR_DB_NAMESPACE]: params.database,
        [semantic_conventions_1.ATTR_SERVER_ADDRESS]: params.host,
        [semantic_conventions_1.ATTR_SERVER_PORT]: getPort(params.port)
      };
      return attributes;
    }
    exports2.getSemanticAttributesFromConnection = getSemanticAttributesFromConnection;
    function getSemanticAttributesFromPoolConnection(params) {
      let url;
      try {
        url = params.connectionString ? new URL(params.connectionString) : void 0;
      } catch (e) {
        url = void 0;
      }
      const attributes = {
        [AttributeNames_1.AttributeNames.IDLE_TIMEOUT_MILLIS]: params.idleTimeoutMillis,
        [AttributeNames_1.AttributeNames.MAX_CLIENT]: params.maxClient,
        [semantic_conventions_1.ATTR_DB_SYSTEM_NAME]: semantic_conventions_1.DB_SYSTEM_NAME_VALUE_POSTGRESQL,
        [semantic_conventions_1.ATTR_DB_NAMESPACE]: url?.pathname.slice(1) ?? params.database,
        [semantic_conventions_1.ATTR_SERVER_ADDRESS]: url?.hostname ?? params.host,
        [semantic_conventions_1.ATTR_SERVER_PORT]: Number(url?.port) || getPort(params.port)
      };
      return attributes;
    }
    exports2.getSemanticAttributesFromPoolConnection = getSemanticAttributesFromPoolConnection;
    function getConnectionInfoFromPoolConnection(params) {
      let url;
      try {
        url = params.connectionString ? new URL(params.connectionString) : void 0;
      } catch (e) {
        url = void 0;
      }
      return {
        database: url?.pathname.slice(1) ?? params.database,
        host: url?.hostname ?? params.host,
        port: Number(url?.port) || getPort(params.port),
        user: url && decodeURIComponent(url.username) || params.user
      };
    }
    exports2.getConnectionInfoFromPoolConnection = getConnectionInfoFromPoolConnection;
    function handleConnectionHook(instrumentationConfig, span, getConnection, onError) {
      const { connectionHook } = instrumentationConfig;
      if (typeof connectionHook !== "function") {
        return;
      }
      (0, instrumentation_1.safeExecuteInTheMiddle)(() => {
        connectionHook(span, { connection: getConnection() });
      }, (err) => {
        if (err) {
          onError(err);
        }
      }, true);
    }
    exports2.handleConnectionHook = handleConnectionHook;
    function shouldSkipInstrumentation(instrumentationConfig) {
      return instrumentationConfig.requireParentSpan === true && api_1.trace.getSpan(api_1.context.active()) === void 0;
    }
    exports2.shouldSkipInstrumentation = shouldSkipInstrumentation;
    function handleConfigQuery(tracer, instrumentationConfig, queryConfig) {
      const { connectionParameters } = this;
      const dbName = connectionParameters.database;
      const spanName = getQuerySpanName(dbName, queryConfig);
      const span = tracer.startSpan(spanName, {
        kind: api_1.SpanKind.CLIENT,
        attributes: getSemanticAttributesFromConnection(connectionParameters)
      });
      if (!queryConfig) {
        return span;
      }
      if (queryConfig.text) {
        span.setAttribute(semantic_conventions_1.ATTR_DB_QUERY_TEXT, queryConfig.text);
      }
      if (instrumentationConfig.enhancedDatabaseReporting && Array.isArray(queryConfig.values)) {
        try {
          const convertedValues = queryConfig.values.map((value) => {
            if (value == null) {
              return "null";
            } else if (value instanceof Buffer) {
              return value.toString();
            } else if (typeof value === "object") {
              if (typeof value.toPostgres === "function") {
                return value.toPostgres();
              }
              return JSON.stringify(value);
            } else {
              return value.toString();
            }
          });
          span.setAttribute(AttributeNames_1.AttributeNames.PG_VALUES, convertedValues);
        } catch (e) {
          api_1.diag.error("failed to stringify ", queryConfig.values, e);
        }
      }
      if (typeof queryConfig.name === "string") {
        span.setAttribute(AttributeNames_1.AttributeNames.PG_PLAN, queryConfig.name);
      }
      return span;
    }
    exports2.handleConfigQuery = handleConfigQuery;
    function handleExecutionResult(config, span, pgResult) {
      if (typeof config.responseHook === "function") {
        (0, instrumentation_1.safeExecuteInTheMiddle)(() => {
          config.responseHook(span, {
            data: pgResult
          });
        }, (err) => {
          if (err) {
            api_1.diag.error("Error running response hook", err);
          }
        }, true);
      }
    }
    exports2.handleExecutionResult = handleExecutionResult;
    function patchCallback(instrumentationConfig, span, cb, attributes, recordDuration) {
      return function patchedCallback(err, res) {
        if (err) {
          if (Object.prototype.hasOwnProperty.call(err, "code")) {
            attributes[semantic_conventions_1.ATTR_ERROR_TYPE] = err["code"];
          }
          if (err instanceof Error) {
            span.recordException(sanitizedErrorMessage(err));
          }
          span.setStatus({
            code: api_1.SpanStatusCode.ERROR,
            message: err.message
          });
        } else {
          handleExecutionResult(instrumentationConfig, span, res);
        }
        recordDuration();
        span.end();
        cb.call(this, err, res);
      };
    }
    exports2.patchCallback = patchCallback;
    function getPoolName(pool) {
      let poolName = "";
      poolName += (pool?.host ? `${pool.host}` : "unknown_host") + ":";
      poolName += (pool?.port ? `${pool.port}` : "unknown_port") + "/";
      poolName += pool?.database ? `${pool.database}` : "unknown_database";
      return poolName.trim();
    }
    exports2.getPoolName = getPoolName;
    function updateCounter(poolName, pool, connectionCount, connectionPendingRequests, latestCounter) {
      const all = pool.totalCount;
      const pending = pool.waitingCount;
      const idle = pool.idleCount;
      const used = all - idle;
      connectionCount.add(used - latestCounter.used, {
        [semconv_1.ATTR_DB_CLIENT_CONNECTION_STATE]: semconv_1.DB_CLIENT_CONNECTION_STATE_VALUE_USED,
        [semconv_1.ATTR_DB_CLIENT_CONNECTION_POOL_NAME]: poolName
      });
      connectionCount.add(idle - latestCounter.idle, {
        [semconv_1.ATTR_DB_CLIENT_CONNECTION_STATE]: semconv_1.DB_CLIENT_CONNECTION_STATE_VALUE_IDLE,
        [semconv_1.ATTR_DB_CLIENT_CONNECTION_POOL_NAME]: poolName
      });
      connectionPendingRequests.add(pending - latestCounter.pending, {
        [semconv_1.ATTR_DB_CLIENT_CONNECTION_POOL_NAME]: poolName
      });
      return { used, idle, pending };
    }
    exports2.updateCounter = updateCounter;
    function patchCallbackPGPool(span, cb) {
      return function patchedCallback(err, res, done) {
        if (err) {
          if (err instanceof Error) {
            span.recordException(sanitizedErrorMessage(err));
          }
          span.setStatus({
            code: api_1.SpanStatusCode.ERROR,
            message: err.message
          });
        }
        span.end();
        cb.call(this, err, res, done);
      };
    }
    exports2.patchCallbackPGPool = patchCallbackPGPool;
    function patchClientConnectCallback(span, cb) {
      return function patchedClientConnectCallback(err) {
        if (err) {
          if (err instanceof Error) {
            span.recordException(sanitizedErrorMessage(err));
          }
          span.setStatus({
            code: api_1.SpanStatusCode.ERROR,
            message: err.message
          });
        }
        span.end();
        cb.apply(this, arguments);
      };
    }
    exports2.patchClientConnectCallback = patchClientConnectCallback;
    function getErrorMessage(e) {
      return typeof e === "object" && e !== null && "message" in e ? String(e.message) : void 0;
    }
    exports2.getErrorMessage = getErrorMessage;
    function isObjectWithTextString(it) {
      return typeof it === "object" && typeof it?.text === "string";
    }
    exports2.isObjectWithTextString = isObjectWithTextString;
    function sanitizedErrorMessage(error) {
      const name = error?.name ?? "PostgreSQLError";
      const code = error?.code ?? "UNKNOWN";
      return `PostgreSQL error of type '${name}' occurred (code: ${code})`;
    }
    exports2.sanitizedErrorMessage = sanitizedErrorMessage;
  }
});

// node_modules/@opentelemetry/sql-common/build/src/index.js
var require_src12 = __commonJS({
  "node_modules/@opentelemetry/sql-common/build/src/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.addSqlCommenterComment = exports2.buildTraceparent = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var core_1 = require_src2();
    var propagator = new core_1.W3CTraceContextPropagator();
    var TRACE_PARENT_HEADER = "traceparent";
    function buildTraceparent(span) {
      const carrier = {};
      propagator.inject(api_1.trace.setSpan(api_1.ROOT_CONTEXT, span), carrier, api_1.defaultTextMapSetter);
      return carrier[TRACE_PARENT_HEADER];
    }
    exports2.buildTraceparent = buildTraceparent;
    function hasValidSqlComment(query) {
      const indexOpeningDashDashComment = query.indexOf("--");
      if (indexOpeningDashDashComment >= 0) {
        return true;
      }
      const indexOpeningSlashComment = query.indexOf("/*");
      if (indexOpeningSlashComment < 0) {
        return false;
      }
      const indexClosingSlashComment = query.indexOf("*/");
      return indexOpeningDashDashComment < indexClosingSlashComment;
    }
    function fixedEncodeURIComponent(str) {
      return encodeURIComponent(str).replace(/[!'()*]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);
    }
    function addSqlCommenterComment(span, query) {
      if (typeof query !== "string" || query.length === 0) {
        return query;
      }
      if (hasValidSqlComment(query)) {
        return query;
      }
      const headers = {};
      propagator.inject(api_1.trace.setSpan(api_1.ROOT_CONTEXT, span), headers, api_1.defaultTextMapSetter);
      const sortedKeys = Object.keys(headers).sort();
      if (sortedKeys.length === 0) {
        return query;
      }
      const commentString = sortedKeys.map((key) => {
        const encodedValue = fixedEncodeURIComponent(headers[key]);
        return `${key}='${encodedValue}'`;
      }).join(",");
      return `${query} /*${commentString}*/`;
    }
    exports2.addSqlCommenterComment = addSqlCommenterComment;
  }
});

// node_modules/@opentelemetry/instrumentation-pg/build/src/version.js
var require_version6 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-pg/build/src/version.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PACKAGE_NAME = exports2.PACKAGE_VERSION = void 0;
    exports2.PACKAGE_VERSION = "0.76.0";
    exports2.PACKAGE_NAME = "@opentelemetry/instrumentation-pg";
  }
});

// node_modules/@opentelemetry/instrumentation-pg/build/src/instrumentation.js
var require_instrumentation5 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-pg/build/src/instrumentation.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PgInstrumentation = void 0;
    var instrumentation_1 = require_src8();
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var internal_types_1 = require_internal_types3();
    var utils = require_utils8();
    var sql_common_1 = require_src12();
    var version_1 = require_version6();
    var SpanNames_1 = require_SpanNames();
    var core_1 = require_src2();
    var semantic_conventions_1 = require_dist();
    var semconv_1 = require_semconv5();
    function extractModuleExports(module3) {
      return module3[Symbol.toStringTag] === "Module" ? module3.default : module3;
    }
    var INTERNAL_SET_QUERY = /* @__PURE__ */ Symbol("opentelemetry.instrumentation-pg.internal-set-query");
    var PgInstrumentation2 = class extends instrumentation_1.InstrumentationBase {
      _poolMaxValues = /* @__PURE__ */ new Map();
      // Pool events connect, acquire, release and remove can be called
      // multiple times without changing the values of total, idle and waiting
      // connections. The _connectionsCounter is used to keep track of latest
      // values and only update the metrics _connectionsCount and _connectionPendingRequests
      // when the value change.
      _connectionsCounter = {
        used: 0,
        idle: 0,
        pending: 0
      };
      constructor(config = {}) {
        super(version_1.PACKAGE_NAME, version_1.PACKAGE_VERSION, config);
      }
      _updateMetricInstruments() {
        if (this._connectionMax && this._poolMaxValues) {
          for (const { value, attributes } of this._poolMaxValues.values()) {
            this._connectionMax.add(-value, attributes);
          }
        }
        this._operationDuration = this.meter.createHistogram(semantic_conventions_1.METRIC_DB_CLIENT_OPERATION_DURATION, {
          description: "Duration of database client operations.",
          unit: "s",
          valueType: api_1.ValueType.DOUBLE,
          advice: {
            explicitBucketBoundaries: [
              1e-3,
              5e-3,
              0.01,
              0.05,
              0.1,
              0.5,
              1,
              5,
              10
            ]
          }
        });
        this._connectionsCounter = {
          idle: 0,
          pending: 0,
          used: 0
        };
        this._connectionsCount = this.meter.createUpDownCounter(semconv_1.METRIC_DB_CLIENT_CONNECTION_COUNT, {
          description: "The number of connections that are currently in state described by the state attribute.",
          unit: "{connection}"
        });
        this._connectionPendingRequests = this.meter.createUpDownCounter(semconv_1.METRIC_DB_CLIENT_CONNECTION_PENDING_REQUESTS, {
          description: "The number of current pending requests for an open connection.",
          unit: "{connection}"
        });
        this._connectionMax = this.meter.createUpDownCounter(semconv_1.METRIC_DB_CLIENT_CONNECTION_MAX, {
          description: "The maximum number of open connections allowed.",
          unit: "{connection}"
        });
        if (this._poolMaxValues) {
          for (const { value, attributes } of this._poolMaxValues.values()) {
            this._connectionMax.add(value, attributes);
          }
        }
      }
      init() {
        const SUPPORTED_PG_VERSIONS = [">=8.0.3 <9"];
        const SUPPORTED_PG_POOL_VERSIONS = [">=2.0.0 <4"];
        const modulePgNativeClient = new instrumentation_1.InstrumentationNodeModuleFile("pg/lib/native/client.js", SUPPORTED_PG_VERSIONS, this._patchPgClient.bind(this), this._unpatchPgClient.bind(this));
        const modulePgClient = new instrumentation_1.InstrumentationNodeModuleFile("pg/lib/client.js", SUPPORTED_PG_VERSIONS, this._patchPgClient.bind(this), this._unpatchPgClient.bind(this));
        const modulePG = new instrumentation_1.InstrumentationNodeModuleDefinition("pg", SUPPORTED_PG_VERSIONS, (module3) => {
          const moduleExports = extractModuleExports(module3);
          this._patchPgClient(moduleExports.Client);
          return module3;
        }, (module3) => {
          const moduleExports = extractModuleExports(module3);
          this._unpatchPgClient(moduleExports.Client);
          return module3;
        }, [modulePgClient, modulePgNativeClient]);
        const modulePGPool = new instrumentation_1.InstrumentationNodeModuleDefinition("pg-pool", SUPPORTED_PG_POOL_VERSIONS, (module3) => {
          const moduleExports = extractModuleExports(module3);
          if ((0, instrumentation_1.isWrapped)(moduleExports.prototype.connect)) {
            this._unwrap(moduleExports.prototype, "connect");
          }
          if ((0, instrumentation_1.isWrapped)(moduleExports.prototype.end)) {
            this._unwrap(moduleExports.prototype, "end");
          }
          this._wrap(moduleExports.prototype, "connect", this._getPoolConnectPatch());
          this._wrap(moduleExports.prototype, "end", this._getPoolEndPatch());
          return moduleExports;
        }, (module3) => {
          const moduleExports = extractModuleExports(module3);
          if ((0, instrumentation_1.isWrapped)(moduleExports.prototype.connect)) {
            this._unwrap(moduleExports.prototype, "connect");
          }
          if ((0, instrumentation_1.isWrapped)(moduleExports.prototype.end)) {
            this._unwrap(moduleExports.prototype, "end");
          }
        });
        return [modulePG, modulePGPool];
      }
      _patchPgClient(module3) {
        if (!module3) {
          return;
        }
        const moduleExports = extractModuleExports(module3);
        if ((0, instrumentation_1.isWrapped)(moduleExports.prototype.query)) {
          this._unwrap(moduleExports.prototype, "query");
        }
        if ((0, instrumentation_1.isWrapped)(moduleExports.prototype.connect)) {
          this._unwrap(moduleExports.prototype, "connect");
        }
        this._wrap(moduleExports.prototype, "query", this._getClientQueryPatch());
        this._wrap(moduleExports.prototype, "connect", this._getClientConnectPatch());
        return module3;
      }
      _unpatchPgClient(module3) {
        const moduleExports = extractModuleExports(module3);
        if ((0, instrumentation_1.isWrapped)(moduleExports.prototype.query)) {
          this._unwrap(moduleExports.prototype, "query");
        }
        if ((0, instrumentation_1.isWrapped)(moduleExports.prototype.connect)) {
          this._unwrap(moduleExports.prototype, "connect");
        }
        return module3;
      }
      _getClientConnectPatch() {
        const plugin = this;
        return (original) => {
          return function connect(callback) {
            const config = plugin.getConfig();
            if (utils.shouldSkipInstrumentation(config) || config.ignoreConnectSpans) {
              return original.call(this, callback);
            }
            const span = plugin.tracer.startSpan(SpanNames_1.SpanNames.CONNECT, {
              kind: api_1.SpanKind.CLIENT,
              attributes: utils.getSemanticAttributesFromConnection(this)
            });
            utils.handleConnectionHook(config, span, () => {
              const { database, host, port, user } = this.connectionParameters;
              return { database, host, port, user };
            }, (err) => plugin._diag.error("Error running connection hook", err));
            if (callback) {
              const parentSpan = api_1.trace.getSpan(api_1.context.active());
              callback = utils.patchClientConnectCallback(span, callback);
              if (parentSpan) {
                callback = api_1.context.bind(api_1.context.active(), callback);
              }
            }
            const connectResult = api_1.context.with(api_1.trace.setSpan(api_1.context.active(), span), () => {
              return original.call(this, callback);
            });
            return handleConnectResult(span, connectResult);
          };
        };
      }
      recordOperationDuration(attributes, startTime) {
        const metricsAttributes = {};
        const keysToCopy = [
          semantic_conventions_1.ATTR_DB_NAMESPACE,
          semantic_conventions_1.ATTR_ERROR_TYPE,
          semantic_conventions_1.ATTR_SERVER_PORT,
          semantic_conventions_1.ATTR_SERVER_ADDRESS,
          semantic_conventions_1.ATTR_DB_OPERATION_NAME
        ];
        keysToCopy.push(semantic_conventions_1.ATTR_DB_SYSTEM_NAME);
        keysToCopy.forEach((key) => {
          if (key in attributes) {
            metricsAttributes[key] = attributes[key];
          }
        });
        const durationSeconds = (0, core_1.hrTimeToMilliseconds)((0, core_1.hrTimeDuration)(startTime, (0, core_1.hrTime)())) / 1e3;
        this._operationDuration.record(durationSeconds, metricsAttributes);
      }
      _getClientQueryPatch() {
        const plugin = this;
        return (original) => {
          this._diag.debug("Patching pg.Client.prototype.query");
          return function query(...args) {
            if (typeof args[0] === "object" && args[0] !== null && args[0][INTERNAL_SET_QUERY]) {
              return original.apply(this, args);
            }
            if (utils.shouldSkipInstrumentation(plugin.getConfig())) {
              return original.apply(this, args);
            }
            const startTime = (0, core_1.hrTime)();
            const arg0 = args[0];
            const firstArgIsString = typeof arg0 === "string";
            const firstArgIsQueryObjectWithText = utils.isObjectWithTextString(arg0);
            const queryConfig = firstArgIsString ? {
              text: arg0,
              values: Array.isArray(args[1]) ? args[1] : void 0
            } : firstArgIsQueryObjectWithText ? {
              ...arg0,
              name: arg0.name,
              text: arg0.text,
              values: arg0.values ?? (Array.isArray(args[1]) ? args[1] : void 0)
            } : void 0;
            const attributes = {
              [semantic_conventions_1.ATTR_DB_SYSTEM_NAME]: semconv_1.DB_SYSTEM_NAME_VALUE_POSTGRESQL,
              [semantic_conventions_1.ATTR_DB_NAMESPACE]: this.database,
              [semantic_conventions_1.ATTR_SERVER_PORT]: this.connectionParameters.port,
              [semantic_conventions_1.ATTR_SERVER_ADDRESS]: this.connectionParameters.host
            };
            if (queryConfig?.text) {
              attributes[semantic_conventions_1.ATTR_DB_OPERATION_NAME] = utils.parseNormalizedOperationName(queryConfig?.text);
            }
            const recordDuration = () => {
              plugin.recordOperationDuration(attributes, startTime);
            };
            const instrumentationConfig = plugin.getConfig();
            const span = utils.handleConfigQuery.call(this, plugin.tracer, instrumentationConfig, queryConfig);
            if (instrumentationConfig.addSqlCommenterCommentToQueries) {
              if (firstArgIsString) {
                args[0] = (0, sql_common_1.addSqlCommenterComment)(span, arg0);
              } else if (firstArgIsQueryObjectWithText && (!("name" in arg0) || arg0.name === void 0)) {
                args[0] = {
                  ...arg0,
                  text: (0, sql_common_1.addSqlCommenterComment)(span, arg0.text)
                };
              }
            }
            if (args.length > 0) {
              const parentSpan = api_1.trace.getSpan(api_1.context.active());
              if (typeof args[args.length - 1] === "function") {
                args[args.length - 1] = utils.patchCallback(
                  instrumentationConfig,
                  span,
                  args[args.length - 1],
                  // nb: not type safe.
                  attributes,
                  recordDuration
                );
                if (parentSpan) {
                  args[args.length - 1] = api_1.context.bind(api_1.context.active(), args[args.length - 1]);
                }
              } else if (typeof queryConfig?.callback === "function") {
                let callback = utils.patchCallback(
                  plugin.getConfig(),
                  span,
                  queryConfig.callback,
                  // nb: not type safe.
                  attributes,
                  recordDuration
                );
                if (parentSpan) {
                  callback = api_1.context.bind(api_1.context.active(), callback);
                }
                args[0].callback = callback;
              }
            }
            const { requestHook } = instrumentationConfig;
            if (typeof requestHook === "function" && queryConfig) {
              (0, instrumentation_1.safeExecuteInTheMiddle)(() => {
                const { database, host, port, user } = this.connectionParameters;
                const connection = { database, host, port, user };
                requestHook(span, {
                  connection,
                  query: {
                    text: queryConfig.text,
                    // nb: if `client.query` is called with illegal arguments
                    // (e.g., if `queryConfig.values` is passed explicitly, but a
                    // non-array is given), then the type casts will be wrong. But
                    // we leave it up to the queryHook to handle that, and we
                    // catch and swallow any errors it throws. The other options
                    // are all worse. E.g., we could leave `queryConfig.values`
                    // and `queryConfig.name` as `unknown`, but then the hook body
                    // would be forced to validate (or cast) them before using
                    // them, which seems incredibly cumbersome given that these
                    // casts will be correct 99.9% of the time -- and pg.query
                    // will immediately throw during development in the other .1%
                    // of cases. Alternatively, we could simply skip calling the
                    // hook when `values` or `name` don't have the expected type,
                    // but that would add unnecessary validation overhead to every
                    // hook invocation and possibly be even more confusing/unexpected.
                    values: queryConfig.values,
                    name: queryConfig.name
                  }
                });
              }, (err) => {
                if (err) {
                  plugin._diag.error("Error running query hook", err);
                }
              }, true);
            }
            if (instrumentationConfig.enableTraceContextPropagation) {
              const traceparent = (0, sql_common_1.buildTraceparent)(span);
              if (traceparent) {
                const setQuery = {
                  text: `SET application_name = '${traceparent}'`,
                  [INTERNAL_SET_QUERY]: true
                };
                try {
                  const setResult = original.apply(this, [
                    setQuery
                  ]);
                  if (setResult instanceof Promise) {
                    setResult.catch((error) => {
                      plugin._diag.warn("Failed to set pg application_name for trace context propagation", error);
                    });
                  }
                } catch (error) {
                  plugin._diag.warn("Failed to set pg application_name for trace context propagation", error);
                }
              }
            }
            let result;
            try {
              result = original.apply(this, args);
            } catch (e) {
              if (e instanceof Error) {
                span.recordException(utils.sanitizedErrorMessage(e));
              }
              span.setStatus({
                code: api_1.SpanStatusCode.ERROR,
                message: utils.getErrorMessage(e)
              });
              span.end();
              throw e;
            }
            if (result instanceof Promise) {
              return result.then((result2) => {
                return new Promise((resolve) => {
                  utils.handleExecutionResult(plugin.getConfig(), span, result2);
                  recordDuration();
                  span.end();
                  resolve(result2);
                });
              }).catch((error) => {
                return new Promise((_, reject) => {
                  if (error instanceof Error) {
                    span.recordException(utils.sanitizedErrorMessage(error));
                  }
                  span.setStatus({
                    code: api_1.SpanStatusCode.ERROR,
                    message: error.message
                  });
                  recordDuration();
                  span.end();
                  reject(error);
                });
              });
            }
            return result;
          };
        };
      }
      _setPoolConnectEventListeners(pgPool) {
        this._recordPoolMax(pgPool);
        if (pgPool[internal_types_1.EVENT_LISTENERS_SET])
          return;
        const poolName = utils.getPoolName(pgPool.options);
        pgPool.on("connect", () => {
          this._connectionsCounter = utils.updateCounter(poolName, pgPool, this._connectionsCount, this._connectionPendingRequests, this._connectionsCounter);
        });
        pgPool.on("acquire", () => {
          this._connectionsCounter = utils.updateCounter(poolName, pgPool, this._connectionsCount, this._connectionPendingRequests, this._connectionsCounter);
        });
        pgPool.on("remove", () => {
          this._connectionsCounter = utils.updateCounter(poolName, pgPool, this._connectionsCount, this._connectionPendingRequests, this._connectionsCounter);
        });
        pgPool.on("release", () => {
          this._connectionsCounter = utils.updateCounter(poolName, pgPool, this._connectionsCount, this._connectionPendingRequests, this._connectionsCounter);
        });
        pgPool[internal_types_1.EVENT_LISTENERS_SET] = true;
      }
      _recordPoolMax(pgPool) {
        if (this._poolMaxValues.has(pgPool))
          return;
        const attributes = {
          [semconv_1.ATTR_DB_CLIENT_CONNECTION_POOL_NAME]: utils.getPoolName(pgPool.options)
        };
        const value = pgPool.options.max;
        this._poolMaxValues.set(pgPool, { value, attributes });
        this._connectionMax.add(value, attributes);
      }
      _removePoolMax(pgPool) {
        const state = this._poolMaxValues.get(pgPool);
        if (!state)
          return;
        this._connectionMax.add(-state.value, state.attributes);
        this._poolMaxValues.delete(pgPool);
      }
      _getPoolConnectPatch() {
        const plugin = this;
        return (originalConnect) => {
          return function connect(callback) {
            const config = plugin.getConfig();
            if (utils.shouldSkipInstrumentation(config)) {
              return originalConnect.call(this, callback);
            }
            plugin._setPoolConnectEventListeners(this);
            if (config.ignoreConnectSpans) {
              return originalConnect.call(this, callback);
            }
            const span = plugin.tracer.startSpan(SpanNames_1.SpanNames.POOL_CONNECT, {
              kind: api_1.SpanKind.CLIENT,
              attributes: utils.getSemanticAttributesFromPoolConnection(this.options)
            });
            utils.handleConnectionHook(config, span, () => utils.getConnectionInfoFromPoolConnection(this.options), (err) => plugin._diag.error("Error running connection hook", err));
            if (callback) {
              const parentSpan = api_1.trace.getSpan(api_1.context.active());
              callback = utils.patchCallbackPGPool(span, callback);
              if (parentSpan) {
                callback = api_1.context.bind(api_1.context.active(), callback);
              }
            }
            const connectResult = api_1.context.with(api_1.trace.setSpan(api_1.context.active(), span), () => {
              return originalConnect.call(this, callback);
            });
            return handleConnectResult(span, connectResult);
          };
        };
      }
      _getPoolEndPatch() {
        const plugin = this;
        return (originalEnd) => {
          return function end(callback) {
            try {
              return callback ? originalEnd.call(this, callback) : originalEnd.call(this);
            } finally {
              if (this.ending) {
                plugin._removePoolMax(this);
              }
            }
          };
        };
      }
    };
    exports2.PgInstrumentation = PgInstrumentation2;
    function handleConnectResult(span, connectResult) {
      if (!(connectResult instanceof Promise)) {
        return connectResult;
      }
      const connectResultPromise = connectResult;
      return api_1.context.bind(api_1.context.active(), connectResultPromise.then((result) => {
        span.end();
        return result;
      }).catch((error) => {
        if (error instanceof Error) {
          span.recordException(utils.sanitizedErrorMessage(error));
        }
        span.setStatus({
          code: api_1.SpanStatusCode.ERROR,
          message: utils.getErrorMessage(error)
        });
        span.end();
        return Promise.reject(error);
      }));
    }
  }
});

// node_modules/@opentelemetry/instrumentation-pg/build/src/index.js
var require_src13 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-pg/build/src/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.AttributeNames = exports2.PgInstrumentation = void 0;
    var instrumentation_1 = require_instrumentation5();
    Object.defineProperty(exports2, "PgInstrumentation", { enumerable: true, get: function() {
      return instrumentation_1.PgInstrumentation;
    } });
    var AttributeNames_1 = require_AttributeNames3();
    Object.defineProperty(exports2, "AttributeNames", { enumerable: true, get: function() {
      return AttributeNames_1.AttributeNames;
    } });
  }
});

// node_modules/@opentelemetry/instrumentation-mysql2/build/src/utils.js
var require_utils9 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-mysql2/build/src/utils.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getConnectionPrototypeToInstrument = exports2.once = exports2.getSpanName = exports2.getQueryText = exports2.getConnectionAttributes = void 0;
    var semantic_conventions_1 = require_dist();
    function getConnectionAttributes(config) {
      const { host, port, database } = getConfig(config);
      const attrs = {};
      attrs[semantic_conventions_1.ATTR_DB_NAMESPACE] = database;
      const portNumber = parseInt(port, 10);
      attrs[semantic_conventions_1.ATTR_SERVER_ADDRESS] = host;
      if (!isNaN(portNumber)) {
        attrs[semantic_conventions_1.ATTR_SERVER_PORT] = portNumber;
      }
      return attrs;
    }
    exports2.getConnectionAttributes = getConnectionAttributes;
    function getConfig(config) {
      const { host, port, database, user } = config && config.connectionConfig || config || {};
      return { host, port, database, user };
    }
    function getQueryText(query, format, values, maskStatement = false, maskStatementHook = defaultMaskingHook) {
      const [querySql, queryValues] = typeof query === "string" ? [query, values] : [query.sql, hasValues(query) ? values || query.values : values];
      try {
        if (maskStatement) {
          return maskStatementHook(querySql);
        } else if (format && queryValues) {
          return format(querySql, queryValues);
        } else {
          return querySql;
        }
      } catch (e) {
        return "Could not determine the query due to an error in masking or formatting";
      }
    }
    exports2.getQueryText = getQueryText;
    function defaultMaskingHook(query) {
      return query.replace(/\b\d+\b/g, "?").replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, "?");
    }
    function hasValues(obj) {
      return "values" in obj;
    }
    function getSpanName(query) {
      const rawQuery = typeof query === "object" ? query.sql : query;
      const firstSpace = rawQuery?.indexOf(" ");
      if (typeof firstSpace === "number" && firstSpace !== -1) {
        return rawQuery?.substring(0, firstSpace);
      }
      return rawQuery;
    }
    exports2.getSpanName = getSpanName;
    var once = (fn) => {
      let called = false;
      return (...args) => {
        if (called)
          return;
        called = true;
        return fn(...args);
      };
    };
    exports2.once = once;
    function getConnectionPrototypeToInstrument(connection) {
      const connectionPrototype = connection.prototype;
      const basePrototype = Object.getPrototypeOf(connectionPrototype);
      if (typeof basePrototype?.query === "function" && typeof basePrototype?.execute === "function") {
        return basePrototype;
      }
      return connectionPrototype;
    }
    exports2.getConnectionPrototypeToInstrument = getConnectionPrototypeToInstrument;
  }
});

// node_modules/@opentelemetry/instrumentation-mysql2/build/src/version.js
var require_version7 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-mysql2/build/src/version.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PACKAGE_NAME = exports2.PACKAGE_VERSION = void 0;
    exports2.PACKAGE_VERSION = "0.69.0";
    exports2.PACKAGE_NAME = "@opentelemetry/instrumentation-mysql2";
  }
});

// node_modules/@opentelemetry/instrumentation-mysql2/build/src/instrumentation.js
var require_instrumentation6 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-mysql2/build/src/instrumentation.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.MySQL2Instrumentation = void 0;
    var api = (init_esm(), __toCommonJS(esm_exports));
    var instrumentation_1 = require_src8();
    var sql_common_1 = require_src12();
    var utils_1 = require_utils9();
    var version_1 = require_version7();
    var semantic_conventions_1 = require_dist();
    var supportedVersions = [">=1.4.2 <4"];
    var MySQL2Instrumentation2 = class extends instrumentation_1.InstrumentationBase {
      constructor(config = {}) {
        super(version_1.PACKAGE_NAME, version_1.PACKAGE_VERSION, config);
      }
      init() {
        let format;
        function setFormatFunction(moduleExports) {
          if (!format && moduleExports.format) {
            format = moduleExports.format;
          }
        }
        const patch = (ConnectionPrototype) => {
          if ((0, instrumentation_1.isWrapped)(ConnectionPrototype.query)) {
            this._unwrap(ConnectionPrototype, "query");
          }
          this._wrap(ConnectionPrototype, "query", this._patchQuery(format, false));
          if ((0, instrumentation_1.isWrapped)(ConnectionPrototype.execute)) {
            this._unwrap(ConnectionPrototype, "execute");
          }
          this._wrap(ConnectionPrototype, "execute", this._patchQuery(format, true));
        };
        const unpatch = (ConnectionPrototype) => {
          this._unwrap(ConnectionPrototype, "query");
          this._unwrap(ConnectionPrototype, "execute");
        };
        return [
          new instrumentation_1.InstrumentationNodeModuleDefinition("mysql2", supportedVersions, (moduleExports) => {
            setFormatFunction(moduleExports);
            return moduleExports;
          }, () => {
          }, [
            new instrumentation_1.InstrumentationNodeModuleFile("mysql2/promise.js", supportedVersions, (moduleExports) => {
              setFormatFunction(moduleExports);
              return moduleExports;
            }, () => {
            }),
            new instrumentation_1.InstrumentationNodeModuleFile("mysql2/lib/connection.js", supportedVersions, (moduleExports) => {
              const ConnectionPrototype = (0, utils_1.getConnectionPrototypeToInstrument)(moduleExports);
              patch(ConnectionPrototype);
              return moduleExports;
            }, (moduleExports) => {
              if (moduleExports === void 0)
                return;
              const ConnectionPrototype = (0, utils_1.getConnectionPrototypeToInstrument)(moduleExports);
              unpatch(ConnectionPrototype);
            })
          ])
        ];
      }
      _patchQuery(format, isPrepared) {
        return (originalQuery) => {
          const thisPlugin = this;
          return function query(query, _valuesOrCallback, _callback) {
            let values;
            if (Array.isArray(_valuesOrCallback)) {
              values = _valuesOrCallback;
            } else if (arguments[2]) {
              values = [_valuesOrCallback];
            }
            const { maskStatement, maskStatementHook, responseHook } = thisPlugin.getConfig();
            const attributes = (0, utils_1.getConnectionAttributes)(this.config);
            const dbQueryText = (0, utils_1.getQueryText)(query, format, values, maskStatement, maskStatementHook);
            attributes[semantic_conventions_1.ATTR_DB_SYSTEM_NAME] = semantic_conventions_1.DB_SYSTEM_NAME_VALUE_MYSQL;
            attributes[semantic_conventions_1.ATTR_DB_QUERY_TEXT] = dbQueryText;
            const span = thisPlugin.tracer.startSpan((0, utils_1.getSpanName)(query), {
              kind: api.SpanKind.CLIENT,
              attributes
            });
            if (!isPrepared && thisPlugin.getConfig().addSqlCommenterCommentToQueries) {
              arguments[0] = query = typeof query === "string" ? (0, sql_common_1.addSqlCommenterComment)(span, query) : Object.assign(query, {
                sql: (0, sql_common_1.addSqlCommenterComment)(span, query.sql)
              });
            }
            const endSpan = (0, utils_1.once)((err, results) => {
              if (err) {
                span.setStatus({
                  code: api.SpanStatusCode.ERROR,
                  message: err.message
                });
              } else {
                if (typeof responseHook === "function") {
                  (0, instrumentation_1.safeExecuteInTheMiddle)(() => {
                    responseHook(span, {
                      queryResults: results
                    });
                  }, (err2) => {
                    if (err2) {
                      thisPlugin._diag.warn("Failed executing responseHook", err2);
                    }
                  }, true);
                }
              }
              span.end();
            });
            if (arguments.length === 1) {
              if (typeof query.onResult === "function") {
                thisPlugin._wrap(query, "onResult", thisPlugin._patchCallbackQuery(endSpan));
              }
              const streamableQuery = originalQuery.apply(this, arguments);
              streamableQuery.once("error", (err) => {
                endSpan(err);
              }).once("result", (results) => {
                endSpan(void 0, results);
              });
              return streamableQuery;
            }
            if (typeof arguments[1] === "function") {
              thisPlugin._wrap(arguments, 1, thisPlugin._patchCallbackQuery(endSpan));
            } else if (typeof arguments[2] === "function") {
              thisPlugin._wrap(arguments, 2, thisPlugin._patchCallbackQuery(endSpan));
            }
            return originalQuery.apply(this, arguments);
          };
        };
      }
      _patchCallbackQuery(endSpan) {
        return (originalCallback) => {
          return function(err, results, fields) {
            endSpan(err, results);
            return originalCallback(...arguments);
          };
        };
      }
    };
    exports2.MySQL2Instrumentation = MySQL2Instrumentation2;
  }
});

// node_modules/@opentelemetry/instrumentation-mysql2/build/src/index.js
var require_src14 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-mysql2/build/src/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.MySQL2Instrumentation = void 0;
    var instrumentation_1 = require_instrumentation6();
    Object.defineProperty(exports2, "MySQL2Instrumentation", { enumerable: true, get: function() {
      return instrumentation_1.MySQL2Instrumentation;
    } });
  }
});

// node_modules/@opentelemetry/instrumentation-ioredis/build/src/semconv.js
var require_semconv6 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-ioredis/build/src/semconv.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.DB_SYSTEM_NAME_VALUE_REDIS = void 0;
    exports2.DB_SYSTEM_NAME_VALUE_REDIS = "redis";
  }
});

// node_modules/@opentelemetry/instrumentation-ioredis/build/src/utils.js
var require_utils10 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-ioredis/build/src/utils.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.endSpan = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var endSpan = (span, err) => {
      if (err) {
        span.recordException(err);
        span.setStatus({
          code: api_1.SpanStatusCode.ERROR,
          message: err.message
        });
      }
      span.end();
    };
    exports2.endSpan = endSpan;
  }
});

// node_modules/@opentelemetry/redis-common/build/src/index.js
var require_src15 = __commonJS({
  "node_modules/@opentelemetry/redis-common/build/src/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.defaultDbStatementSerializer = void 0;
    var serializationSubsets = [
      {
        regex: /^ECHO/i,
        args: 0
      },
      {
        regex: /^(GETSET|LPUSH|MSET|PFA|PSETEX|PUBLISH|RPUSH|SADD|SET|SPUBLISH|XADD|ZADD)/i,
        args: 1
      },
      {
        regex: /^(HSET|HMSET|LSET|LINSERT)/i,
        args: 2
      },
      // ACL and CONFIG subcommands may contain sensitive data (e.g. passwords),
      // so only serialize the subcommand name (first argument).
      {
        regex: /^(ACL|CONFIG)/i,
        args: 1
      },
      {
        regex: /^(BIT|B[LRZ]|CLIENT|CLUSTER|COMMAND|DECR|DEL|EVAL|EX|FUNCTION|GEO|GET|HINCR|HMGET|HSCAN|INCR|L[TRLM]|MEMORY|P[EFISTU]|RPOP|S[CDIMORSU]|XACK|X[CDGILPRT]|Z[CDILMPRS])/i,
        args: -1
      }
    ];
    var defaultDbStatementSerializer = (cmdName, cmdArgs) => {
      if (Array.isArray(cmdArgs) && cmdArgs.length) {
        const nArgsToSerialize = serializationSubsets.find(({ regex }) => {
          return regex.test(cmdName);
        })?.args ?? 0;
        const argsToSerialize = nArgsToSerialize >= 0 ? cmdArgs.slice(0, nArgsToSerialize) : cmdArgs;
        if (cmdArgs.length > argsToSerialize.length) {
          argsToSerialize.push(`[${cmdArgs.length - nArgsToSerialize} other arguments]`);
        }
        return `${cmdName} ${argsToSerialize.join(" ")}`;
      }
      return cmdName;
    };
    exports2.defaultDbStatementSerializer = defaultDbStatementSerializer;
  }
});

// node_modules/@opentelemetry/instrumentation-ioredis/build/src/version.js
var require_version8 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-ioredis/build/src/version.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PACKAGE_NAME = exports2.PACKAGE_VERSION = void 0;
    exports2.PACKAGE_VERSION = "0.71.0";
    exports2.PACKAGE_NAME = "@opentelemetry/instrumentation-ioredis";
  }
});

// node_modules/@opentelemetry/instrumentation-ioredis/build/src/instrumentation.js
var require_instrumentation7 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-ioredis/build/src/instrumentation.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.IORedisInstrumentation = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var instrumentation_1 = require_src8();
    var semantic_conventions_1 = require_dist();
    var semconv_1 = require_semconv6();
    var instrumentation_2 = require_src8();
    var utils_1 = require_utils10();
    var redis_common_1 = require_src15();
    var version_1 = require_version8();
    var DEFAULT_CONFIG = {
      requireParentSpan: true
    };
    var IORedisInstrumentation2 = class extends instrumentation_1.InstrumentationBase {
      constructor(config = {}) {
        super(version_1.PACKAGE_NAME, version_1.PACKAGE_VERSION, { ...DEFAULT_CONFIG, ...config });
      }
      setConfig(config = {}) {
        super.setConfig({ ...DEFAULT_CONFIG, ...config });
      }
      init() {
        return [
          new instrumentation_1.InstrumentationNodeModuleDefinition("ioredis", [">=2.0.0 <7"], (module3, moduleVersion) => {
            const moduleExports = module3[Symbol.toStringTag] === "Module" ? module3.default : module3;
            if ((0, instrumentation_1.isWrapped)(moduleExports.prototype.sendCommand)) {
              this._unwrap(moduleExports.prototype, "sendCommand");
            }
            this._wrap(moduleExports.prototype, "sendCommand", this._patchSendCommand(moduleVersion));
            if ((0, instrumentation_1.isWrapped)(moduleExports.prototype.connect)) {
              this._unwrap(moduleExports.prototype, "connect");
            }
            this._wrap(moduleExports.prototype, "connect", this._patchConnection());
            return module3;
          }, (module3) => {
            if (module3 === void 0)
              return;
            const moduleExports = module3[Symbol.toStringTag] === "Module" ? module3.default : module3;
            this._unwrap(moduleExports.prototype, "sendCommand");
            this._unwrap(moduleExports.prototype, "connect");
          })
        ];
      }
      /**
       * Patch send command internal to trace requests
       */
      _patchSendCommand(moduleVersion) {
        return (original) => {
          return this._traceSendCommand(original, moduleVersion);
        };
      }
      _patchConnection() {
        return (original) => {
          return this._traceConnection(original);
        };
      }
      _traceSendCommand(original, moduleVersion) {
        const instrumentation = this;
        return function(cmd) {
          if (arguments.length < 1 || typeof cmd !== "object") {
            return original.apply(this, arguments);
          }
          const config = instrumentation.getConfig();
          const dbStatementSerializer = config.dbStatementSerializer || redis_common_1.defaultDbStatementSerializer;
          const hasNoParentSpan = api_1.trace.getSpan(api_1.context.active()) === void 0;
          if (config.requireParentSpan === true && hasNoParentSpan) {
            return original.apply(this, arguments);
          }
          const attributes = {};
          let operationName = cmd.name;
          const command = cmd;
          if (command.inTransaction && cmd.name !== "multi" && cmd.name !== "exec") {
            operationName = `MULTI ${cmd.name}`;
          } else if (command.pipelineIndex != null && cmd.name !== "multi" && cmd.name !== "exec") {
            operationName = `PIPELINE ${cmd.name}`;
          }
          attributes[semantic_conventions_1.ATTR_DB_OPERATION_NAME] = operationName;
          const { host, port } = this.options;
          const dbQueryText = dbStatementSerializer(cmd.name, cmd.args);
          attributes[semantic_conventions_1.ATTR_DB_SYSTEM_NAME] = semconv_1.DB_SYSTEM_NAME_VALUE_REDIS;
          attributes[semantic_conventions_1.ATTR_DB_QUERY_TEXT] = dbQueryText;
          attributes[semantic_conventions_1.ATTR_SERVER_ADDRESS] = host;
          attributes[semantic_conventions_1.ATTR_SERVER_PORT] = port;
          const span = instrumentation.tracer.startSpan(cmd.name, {
            kind: api_1.SpanKind.CLIENT,
            attributes
          });
          const { requestHook } = config;
          if (requestHook) {
            (0, instrumentation_2.safeExecuteInTheMiddle)(() => requestHook(span, {
              moduleVersion,
              cmdName: cmd.name,
              cmdArgs: cmd.args
            }), (e) => {
              if (e) {
                api_1.diag.error("ioredis instrumentation: request hook failed", e);
              }
            }, true);
          }
          try {
            const result = original.apply(this, arguments);
            const origResolve = cmd.resolve;
            cmd.resolve = function(result2) {
              (0, instrumentation_2.safeExecuteInTheMiddle)(() => config.responseHook?.(span, cmd.name, cmd.args, result2), (e) => {
                if (e) {
                  api_1.diag.error("ioredis instrumentation: response hook failed", e);
                }
              }, true);
              (0, utils_1.endSpan)(span, null);
              origResolve(result2);
            };
            const origReject = cmd.reject;
            cmd.reject = function(err) {
              (0, utils_1.endSpan)(span, err);
              origReject(err);
            };
            return result;
          } catch (error) {
            (0, utils_1.endSpan)(span, error);
            throw error;
          }
        };
      }
      _traceConnection(original) {
        const instrumentation = this;
        return function() {
          const hasNoParentSpan = api_1.trace.getSpan(api_1.context.active()) === void 0;
          if (instrumentation.getConfig().requireParentSpan === true && hasNoParentSpan) {
            return original.apply(this, arguments);
          }
          const attributes = {};
          const { host, port } = this.options;
          attributes[semantic_conventions_1.ATTR_DB_SYSTEM_NAME] = semconv_1.DB_SYSTEM_NAME_VALUE_REDIS;
          attributes[semantic_conventions_1.ATTR_DB_QUERY_TEXT] = "connect";
          attributes[semantic_conventions_1.ATTR_SERVER_ADDRESS] = host;
          attributes[semantic_conventions_1.ATTR_SERVER_PORT] = port;
          const span = instrumentation.tracer.startSpan("connect", {
            kind: api_1.SpanKind.CLIENT,
            attributes
          });
          try {
            const client = original.apply(this, arguments);
            (0, utils_1.endSpan)(span, null);
            return client;
          } catch (error) {
            (0, utils_1.endSpan)(span, error);
            throw error;
          }
        };
      }
    };
    exports2.IORedisInstrumentation = IORedisInstrumentation2;
  }
});

// node_modules/@opentelemetry/instrumentation-ioredis/build/src/index.js
var require_src16 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-ioredis/build/src/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.IORedisInstrumentation = void 0;
    var instrumentation_1 = require_instrumentation7();
    Object.defineProperty(exports2, "IORedisInstrumentation", { enumerable: true, get: function() {
      return instrumentation_1.IORedisInstrumentation;
    } });
  }
});

// node_modules/@opentelemetry/instrumentation-redis/build/src/version.js
var require_version9 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-redis/build/src/version.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PACKAGE_NAME = exports2.PACKAGE_VERSION = void 0;
    exports2.PACKAGE_VERSION = "0.71.0";
    exports2.PACKAGE_NAME = "@opentelemetry/instrumentation-redis";
  }
});

// node_modules/@opentelemetry/instrumentation-redis/build/src/v2-v3/utils.js
var require_utils11 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-redis/build/src/v2-v3/utils.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getTracedCreateStreamTrace = exports2.getTracedCreateClient = exports2.endSpan = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var endSpan = (span, err) => {
      if (err) {
        span.setStatus({
          code: api_1.SpanStatusCode.ERROR,
          message: err.message
        });
      }
      span.end();
    };
    exports2.endSpan = endSpan;
    var getTracedCreateClient = (original) => {
      return function createClientTrace() {
        const client = original.apply(this, arguments);
        return api_1.context.bind(api_1.context.active(), client);
      };
    };
    exports2.getTracedCreateClient = getTracedCreateClient;
    var getTracedCreateStreamTrace = (original) => {
      return function create_stream_trace() {
        if (!Object.prototype.hasOwnProperty.call(this, "stream")) {
          Object.defineProperty(this, "stream", {
            get() {
              return this._patched_redis_stream;
            },
            set(val) {
              api_1.context.bind(api_1.context.active(), val);
              this._patched_redis_stream = val;
            }
          });
        }
        return original.apply(this, arguments);
      };
    };
    exports2.getTracedCreateStreamTrace = getTracedCreateStreamTrace;
  }
});

// node_modules/@opentelemetry/instrumentation-redis/build/src/semconv.js
var require_semconv7 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-redis/build/src/semconv.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.DB_SYSTEM_NAME_VALUE_REDIS = void 0;
    exports2.DB_SYSTEM_NAME_VALUE_REDIS = "redis";
  }
});

// node_modules/@opentelemetry/instrumentation-redis/build/src/v2-v3/instrumentation.js
var require_instrumentation8 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-redis/build/src/v2-v3/instrumentation.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.RedisInstrumentationV2_V3 = void 0;
    var instrumentation_1 = require_src8();
    var utils_1 = require_utils11();
    var version_1 = require_version9();
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var semantic_conventions_1 = require_dist();
    var semconv_1 = require_semconv7();
    var redis_common_1 = require_src15();
    var RedisInstrumentationV2_V3 = class _RedisInstrumentationV2_V3 extends instrumentation_1.InstrumentationBase {
      static COMPONENT = "redis";
      constructor(config = {}) {
        super(version_1.PACKAGE_NAME, version_1.PACKAGE_VERSION, config);
      }
      setConfig(config = {}) {
        super.setConfig(config);
      }
      init() {
        return [
          new instrumentation_1.InstrumentationNodeModuleDefinition("redis", [">=2.6.0 <4"], (moduleExports) => {
            if ((0, instrumentation_1.isWrapped)(moduleExports.RedisClient.prototype["internal_send_command"])) {
              this._unwrap(moduleExports.RedisClient.prototype, "internal_send_command");
            }
            this._wrap(moduleExports.RedisClient.prototype, "internal_send_command", this._getPatchInternalSendCommand());
            if ((0, instrumentation_1.isWrapped)(moduleExports.RedisClient.prototype["create_stream"])) {
              this._unwrap(moduleExports.RedisClient.prototype, "create_stream");
            }
            this._wrap(moduleExports.RedisClient.prototype, "create_stream", this._getPatchCreateStream());
            if ((0, instrumentation_1.isWrapped)(moduleExports.createClient)) {
              this._unwrap(moduleExports, "createClient");
            }
            this._wrap(moduleExports, "createClient", this._getPatchCreateClient());
            return moduleExports;
          }, (moduleExports) => {
            if (moduleExports === void 0)
              return;
            this._unwrap(moduleExports.RedisClient.prototype, "internal_send_command");
            this._unwrap(moduleExports.RedisClient.prototype, "create_stream");
            this._unwrap(moduleExports, "createClient");
          })
        ];
      }
      /**
       * Patch internal_send_command(...) to trace requests
       */
      _getPatchInternalSendCommand() {
        const instrumentation = this;
        return function internal_send_command(original) {
          return function internal_send_command_trace(cmd) {
            if (arguments.length !== 1 || typeof cmd !== "object") {
              return original.apply(this, arguments);
            }
            const config = instrumentation.getConfig();
            const hasNoParentSpan = api_1.trace.getSpan(api_1.context.active()) === void 0;
            if (config.requireParentSpan === true && hasNoParentSpan) {
              return original.apply(this, arguments);
            }
            const dbStatementSerializer = config?.dbStatementSerializer || redis_common_1.defaultDbStatementSerializer;
            const attributes = {};
            Object.assign(attributes, {
              [semantic_conventions_1.ATTR_DB_SYSTEM_NAME]: semconv_1.DB_SYSTEM_NAME_VALUE_REDIS,
              [semantic_conventions_1.ATTR_DB_OPERATION_NAME]: cmd.command,
              [semantic_conventions_1.ATTR_DB_QUERY_TEXT]: dbStatementSerializer(cmd.command, cmd.args)
            });
            const span = instrumentation.tracer.startSpan(`${_RedisInstrumentationV2_V3.COMPONENT}-${cmd.command}`, {
              kind: api_1.SpanKind.CLIENT,
              attributes
            });
            if (this.connection_options) {
              const connectionAttributes = {};
              Object.assign(connectionAttributes, {
                [semantic_conventions_1.ATTR_SERVER_ADDRESS]: this.connection_options.host,
                [semantic_conventions_1.ATTR_SERVER_PORT]: this.connection_options.port
              });
              span.setAttributes(connectionAttributes);
            }
            const originalCallback = arguments[0].callback;
            if (originalCallback) {
              const originalContext = api_1.context.active();
              arguments[0].callback = function callback(err, reply) {
                if (config?.responseHook) {
                  const responseHook = config.responseHook;
                  (0, instrumentation_1.safeExecuteInTheMiddle)(() => {
                    responseHook(span, cmd.command, cmd.args, reply);
                  }, (err2) => {
                    if (err2) {
                      instrumentation._diag.error("Error executing responseHook", err2);
                    }
                  }, true);
                }
                (0, utils_1.endSpan)(span, err);
                return api_1.context.with(originalContext, originalCallback, this, ...arguments);
              };
            }
            try {
              return original.apply(this, arguments);
            } catch (rethrow) {
              (0, utils_1.endSpan)(span, rethrow);
              throw rethrow;
            }
          };
        };
      }
      _getPatchCreateClient() {
        return function createClient(original) {
          return (0, utils_1.getTracedCreateClient)(original);
        };
      }
      _getPatchCreateStream() {
        return function createReadStream(original) {
          return (0, utils_1.getTracedCreateStreamTrace)(original);
        };
      }
    };
    exports2.RedisInstrumentationV2_V3 = RedisInstrumentationV2_V3;
  }
});

// node_modules/@opentelemetry/instrumentation-redis/build/src/v4-v5/utils.js
var require_utils12 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-redis/build/src/v4-v5/utils.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getClientAttributes = void 0;
    var semantic_conventions_1 = require_dist();
    var semconv_1 = require_semconv7();
    function getClientAttributes(options) {
      const attributes = {};
      Object.assign(attributes, {
        [semantic_conventions_1.ATTR_DB_SYSTEM_NAME]: semconv_1.DB_SYSTEM_NAME_VALUE_REDIS,
        [semantic_conventions_1.ATTR_SERVER_ADDRESS]: options?.socket?.host,
        [semantic_conventions_1.ATTR_SERVER_PORT]: options?.socket?.port
      });
      return attributes;
    }
    exports2.getClientAttributes = getClientAttributes;
  }
});

// node_modules/@opentelemetry/instrumentation-redis/build/src/v4-v5/instrumentation.js
var require_instrumentation9 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-redis/build/src/v4-v5/instrumentation.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.RedisInstrumentationV4_V5 = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var instrumentation_1 = require_src8();
    var utils_1 = require_utils12();
    var redis_common_1 = require_src15();
    var version_1 = require_version9();
    var semantic_conventions_1 = require_dist();
    var OTEL_OPEN_SPANS = /* @__PURE__ */ Symbol("opentelemetry.instrumentation.redis.open_spans");
    var MULTI_COMMAND_OPTIONS = /* @__PURE__ */ Symbol("opentelemetry.instrumentation.redis.multi_command_options");
    var RedisInstrumentationV4_V5 = class _RedisInstrumentationV4_V5 extends instrumentation_1.InstrumentationBase {
      static COMPONENT = "redis";
      constructor(config = {}) {
        super(version_1.PACKAGE_NAME, version_1.PACKAGE_VERSION, config);
      }
      setConfig(config = {}) {
        super.setConfig(config);
      }
      init() {
        return [
          this._getInstrumentationNodeModuleDefinition("@redis/client"),
          this._getInstrumentationNodeModuleDefinition("@node-redis/client")
        ];
      }
      _getInstrumentationNodeModuleDefinition(basePackageName) {
        const commanderModuleFile = new instrumentation_1.InstrumentationNodeModuleFile(`${basePackageName}/dist/lib/commander.js`, ["^1.0.0"], (moduleExports, moduleVersion) => {
          const transformCommandArguments = moduleExports.transformCommandArguments;
          if (!transformCommandArguments) {
            this._diag.error("internal instrumentation error, missing transformCommandArguments function");
            return moduleExports;
          }
          const functionToPatch = moduleVersion?.startsWith("1.0.") ? "extendWithCommands" : "attachCommands";
          if ((0, instrumentation_1.isWrapped)(moduleExports?.[functionToPatch])) {
            this._unwrap(moduleExports, functionToPatch);
          }
          this._wrap(moduleExports, functionToPatch, this._getPatchExtendWithCommands(transformCommandArguments));
          return moduleExports;
        }, (moduleExports) => {
          if ((0, instrumentation_1.isWrapped)(moduleExports?.extendWithCommands)) {
            this._unwrap(moduleExports, "extendWithCommands");
          }
          if ((0, instrumentation_1.isWrapped)(moduleExports?.attachCommands)) {
            this._unwrap(moduleExports, "attachCommands");
          }
        });
        const multiCommanderModule = new instrumentation_1.InstrumentationNodeModuleFile(`${basePackageName}/dist/lib/client/multi-command.js`, ["^1.0.0", "^5.0.0", "^6.0.0"], (moduleExports) => {
          const redisClientMultiCommandPrototype = moduleExports?.default?.prototype;
          if ((0, instrumentation_1.isWrapped)(redisClientMultiCommandPrototype?.exec)) {
            this._unwrap(redisClientMultiCommandPrototype, "exec");
          }
          this._wrap(redisClientMultiCommandPrototype, "exec", this._getPatchMultiCommandsExec(false));
          if ((0, instrumentation_1.isWrapped)(redisClientMultiCommandPrototype?.execAsPipeline)) {
            this._unwrap(redisClientMultiCommandPrototype, "execAsPipeline");
          }
          this._wrap(redisClientMultiCommandPrototype, "execAsPipeline", this._getPatchMultiCommandsExec(true));
          if ((0, instrumentation_1.isWrapped)(redisClientMultiCommandPrototype?.addCommand)) {
            this._unwrap(redisClientMultiCommandPrototype, "addCommand");
          }
          this._wrap(redisClientMultiCommandPrototype, "addCommand", this._getPatchMultiCommandsAddCommand());
          return moduleExports;
        }, (moduleExports) => {
          const redisClientMultiCommandPrototype = moduleExports?.default?.prototype;
          if ((0, instrumentation_1.isWrapped)(redisClientMultiCommandPrototype?.exec)) {
            this._unwrap(redisClientMultiCommandPrototype, "exec");
          }
          if ((0, instrumentation_1.isWrapped)(redisClientMultiCommandPrototype?.addCommand)) {
            this._unwrap(redisClientMultiCommandPrototype, "addCommand");
          }
        });
        const clientIndexModule = new instrumentation_1.InstrumentationNodeModuleFile(`${basePackageName}/dist/lib/client/index.js`, ["^1.0.0", "^5.0.0", "^6.0.0"], (moduleExports) => {
          const redisClientPrototype = moduleExports?.default?.prototype;
          if (redisClientPrototype?.multi) {
            if ((0, instrumentation_1.isWrapped)(redisClientPrototype?.multi)) {
              this._unwrap(redisClientPrototype, "multi");
            }
            this._wrap(redisClientPrototype, "multi", this._getPatchRedisClientMulti());
          }
          if (redisClientPrototype?.MULTI) {
            if ((0, instrumentation_1.isWrapped)(redisClientPrototype?.MULTI)) {
              this._unwrap(redisClientPrototype, "MULTI");
            }
            this._wrap(redisClientPrototype, "MULTI", this._getPatchRedisClientMulti());
          }
          if ((0, instrumentation_1.isWrapped)(redisClientPrototype?.sendCommand)) {
            this._unwrap(redisClientPrototype, "sendCommand");
          }
          this._wrap(redisClientPrototype, "sendCommand", this._getPatchRedisClientSendCommand());
          this._wrap(redisClientPrototype, "connect", this._getPatchedClientConnect());
          return moduleExports;
        }, (moduleExports) => {
          const redisClientPrototype = moduleExports?.default?.prototype;
          if ((0, instrumentation_1.isWrapped)(redisClientPrototype?.multi)) {
            this._unwrap(redisClientPrototype, "multi");
          }
          if ((0, instrumentation_1.isWrapped)(redisClientPrototype?.MULTI)) {
            this._unwrap(redisClientPrototype, "MULTI");
          }
          if ((0, instrumentation_1.isWrapped)(redisClientPrototype?.sendCommand)) {
            this._unwrap(redisClientPrototype, "sendCommand");
          }
        });
        const clusterIndexModule = new instrumentation_1.InstrumentationNodeModuleFile(`${basePackageName}/dist/lib/cluster/index.js`, ["^1.0.0", "^5.0.0", "^6.0.0"], (moduleExports) => {
          const redisClusterPrototype = moduleExports?.default?.prototype;
          if (redisClusterPrototype?.MULTI) {
            if ((0, instrumentation_1.isWrapped)(redisClusterPrototype?.MULTI)) {
              this._unwrap(redisClusterPrototype, "MULTI");
            }
            this._wrap(redisClusterPrototype, "MULTI", this._getPatchRedisClusterMulti());
          }
          return moduleExports;
        }, (moduleExports) => {
          const redisClusterPrototype = moduleExports?.default?.prototype;
          if ((0, instrumentation_1.isWrapped)(redisClusterPrototype?.MULTI)) {
            this._unwrap(redisClusterPrototype, "MULTI");
          }
        });
        const clusterMultiCommanderModule = new instrumentation_1.InstrumentationNodeModuleFile(`${basePackageName}/dist/lib/cluster/multi-command.js`, ["^1.0.0", "^5.0.0", "^6.0.0"], (moduleExports) => {
          const redisClusterMultiCommandPrototype = moduleExports?.default?.prototype;
          if ((0, instrumentation_1.isWrapped)(redisClusterMultiCommandPrototype?.exec)) {
            this._unwrap(redisClusterMultiCommandPrototype, "exec");
          }
          this._wrap(redisClusterMultiCommandPrototype, "exec", this._getPatchMultiCommandsExec(false));
          if ((0, instrumentation_1.isWrapped)(redisClusterMultiCommandPrototype?.addCommand)) {
            this._unwrap(redisClusterMultiCommandPrototype, "addCommand");
          }
          this._wrap(redisClusterMultiCommandPrototype, "addCommand", this._getPatchClusterMultiCommandsAddCommand());
          return moduleExports;
        }, (moduleExports) => {
          const redisClusterMultiCommandPrototype = moduleExports?.default?.prototype;
          if ((0, instrumentation_1.isWrapped)(redisClusterMultiCommandPrototype?.exec)) {
            this._unwrap(redisClusterMultiCommandPrototype, "exec");
          }
          if ((0, instrumentation_1.isWrapped)(redisClusterMultiCommandPrototype?.addCommand)) {
            this._unwrap(redisClusterMultiCommandPrototype, "addCommand");
          }
        });
        return new instrumentation_1.InstrumentationNodeModuleDefinition(basePackageName, ["^1.0.0", "^5.0.0", "^6.0.0"], (moduleExports) => {
          return moduleExports;
        }, () => {
        }, [
          commanderModuleFile,
          multiCommanderModule,
          clientIndexModule,
          clusterIndexModule,
          clusterMultiCommanderModule
        ]);
      }
      // serves both for redis 4.0.x where function name is extendWithCommands
      // and redis ^4.1.0 where function name is attachCommands
      _getPatchExtendWithCommands(transformCommandArguments) {
        const plugin = this;
        return function extendWithCommandsPatchWrapper(original) {
          return function extendWithCommandsPatch(config) {
            if (config?.BaseClass?.name !== "RedisClient") {
              return original.apply(this, arguments);
            }
            const origExecutor = config.executor;
            config.executor = function(command, args) {
              const redisCommandArguments = transformCommandArguments(command, args).args;
              return plugin._traceClientCommand(origExecutor, this, arguments, redisCommandArguments);
            };
            return original.apply(this, arguments);
          };
        };
      }
      _getPatchMultiCommandsExec(isPipeline) {
        const plugin = this;
        return function execPatchWrapper(original) {
          return function execPatch() {
            const execRes = original.apply(this, arguments);
            if (typeof execRes?.then !== "function") {
              plugin._diag.error("non-promise result when patching exec/execAsPipeline");
              return execRes;
            }
            return execRes.then((redisRes) => {
              const openSpans = this[OTEL_OPEN_SPANS];
              plugin._endSpansWithRedisReplies(openSpans, redisRes, isPipeline);
              return redisRes;
            }).catch((err) => {
              const openSpans = this[OTEL_OPEN_SPANS];
              if (!openSpans) {
                plugin._diag.error("cannot find open spans to end for multi/pipeline");
              } else {
                const replies = err.constructor.name === "MultiErrorReply" ? err.replies : new Array(openSpans.length).fill(err);
                plugin._endSpansWithRedisReplies(openSpans, replies, isPipeline);
              }
              return Promise.reject(err);
            });
          };
        };
      }
      _getPatchMultiCommandsAddCommand() {
        const plugin = this;
        return function addCommandWrapper(original) {
          return function addCommandPatch(args) {
            return plugin._traceClientCommand(original, this, arguments, args);
          };
        };
      }
      _getPatchClusterMultiCommandsAddCommand() {
        const plugin = this;
        return function addCommandWrapper(original) {
          return function addCommandPatch(firstKeyOrArgs, isReadonly, args) {
            const redisArgs = Array.isArray(firstKeyOrArgs) ? firstKeyOrArgs : args;
            return plugin._traceClientCommand(original, this, arguments, redisArgs);
          };
        };
      }
      _getPatchRedisClusterMulti() {
        return function multiPatchWrapper(original) {
          return function multiPatch() {
            const multiRes = original.apply(this, arguments);
            multiRes[MULTI_COMMAND_OPTIONS] = this._options;
            return multiRes;
          };
        };
      }
      _getPatchRedisClientMulti() {
        return function multiPatchWrapper(original) {
          return function multiPatch() {
            const multiRes = original.apply(this, arguments);
            multiRes[MULTI_COMMAND_OPTIONS] = this.options;
            return multiRes;
          };
        };
      }
      _getPatchRedisClientSendCommand() {
        const plugin = this;
        return function sendCommandWrapper(original) {
          return function sendCommandPatch(args) {
            return plugin._traceClientCommand(original, this, arguments, args);
          };
        };
      }
      _getPatchedClientConnect() {
        const plugin = this;
        return function connectWrapper(original) {
          return function patchedConnect() {
            const options = this.options;
            const attributes = (0, utils_1.getClientAttributes)(options);
            const span = plugin.tracer.startSpan(`${_RedisInstrumentationV4_V5.COMPONENT}-connect`, {
              kind: api_1.SpanKind.CLIENT,
              attributes
            });
            const res = api_1.context.with(api_1.trace.setSpan(api_1.context.active(), span), () => {
              return original.apply(this);
            });
            return res.then((result) => {
              span.end();
              return result;
            }).catch((error) => {
              span.recordException(error);
              span.setStatus({
                code: api_1.SpanStatusCode.ERROR,
                message: error.message
              });
              span.end();
              return Promise.reject(error);
            });
          };
        };
      }
      _traceClientCommand(origFunction, origThis, origArguments, redisCommandArguments) {
        const hasNoParentSpan = api_1.trace.getSpan(api_1.context.active()) === void 0;
        if (hasNoParentSpan && this.getConfig().requireParentSpan) {
          return origFunction.apply(origThis, origArguments);
        }
        const clientOptions = origThis.options || origThis[MULTI_COMMAND_OPTIONS];
        const commandName = redisCommandArguments[0];
        const commandArgs = redisCommandArguments.slice(1);
        const dbStatementSerializer = this.getConfig().dbStatementSerializer || redis_common_1.defaultDbStatementSerializer;
        const attributes = (0, utils_1.getClientAttributes)(clientOptions);
        attributes[semantic_conventions_1.ATTR_DB_OPERATION_NAME] = commandName;
        try {
          const dbStatement = dbStatementSerializer(commandName, commandArgs);
          if (dbStatement != null) {
            attributes[semantic_conventions_1.ATTR_DB_QUERY_TEXT] = dbStatement;
          }
        } catch (e) {
          this._diag.error("dbStatementSerializer throw an exception", e, {
            commandName
          });
        }
        const span = this.tracer.startSpan(`${_RedisInstrumentationV4_V5.COMPONENT}-${commandName}`, {
          kind: api_1.SpanKind.CLIENT,
          attributes
        });
        const res = api_1.context.with(api_1.trace.setSpan(api_1.context.active(), span), () => {
          return origFunction.apply(origThis, origArguments);
        });
        if (typeof res?.then === "function") {
          res.then((redisRes) => {
            this._endSpanWithResponse(span, commandName, commandArgs, redisRes, void 0);
          }, (err) => {
            this._endSpanWithResponse(span, commandName, commandArgs, null, err);
          });
        } else {
          const redisClientMultiCommand = res;
          redisClientMultiCommand[OTEL_OPEN_SPANS] = redisClientMultiCommand[OTEL_OPEN_SPANS] || [];
          redisClientMultiCommand[OTEL_OPEN_SPANS].push({
            span,
            commandName,
            commandArgs
          });
        }
        return res;
      }
      _endSpansWithRedisReplies(openSpans, replies, isPipeline = false) {
        if (!openSpans) {
          return this._diag.error("cannot find open spans to end for redis multi/pipeline");
        }
        if (replies.length !== openSpans.length) {
          return this._diag.error("number of multi command spans does not match response from redis");
        }
        const allCommands = openSpans.map((s) => s.commandName);
        const allSameCommand = allCommands.every((cmd) => cmd === allCommands[0]);
        const operationName = allSameCommand ? (isPipeline ? "PIPELINE " : "MULTI ") + allCommands[0] : isPipeline ? "PIPELINE" : "MULTI";
        for (let i = 0; i < openSpans.length; i++) {
          const { span, commandArgs } = openSpans[i];
          const currCommandRes = replies[i];
          const [res, err] = currCommandRes instanceof Error ? [null, currCommandRes] : [currCommandRes, void 0];
          span.setAttribute(semantic_conventions_1.ATTR_DB_OPERATION_NAME, operationName);
          this._endSpanWithResponse(span, allCommands[i], commandArgs, res, err);
        }
      }
      _endSpanWithResponse(span, commandName, commandArgs, response, error) {
        const { responseHook } = this.getConfig();
        if (!error && responseHook) {
          try {
            responseHook(span, commandName, commandArgs, response);
          } catch (err) {
            this._diag.error("responseHook throw an exception", err);
          }
        }
        if (error) {
          span.recordException(error);
          span.setStatus({ code: api_1.SpanStatusCode.ERROR, message: error?.message });
        }
        span.end();
      }
    };
    exports2.RedisInstrumentationV4_V5 = RedisInstrumentationV4_V5;
  }
});

// node_modules/@opentelemetry/instrumentation-redis/build/src/redis.js
var require_redis = __commonJS({
  "node_modules/@opentelemetry/instrumentation-redis/build/src/redis.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.RedisInstrumentation = void 0;
    var instrumentation_1 = require_src8();
    var version_1 = require_version9();
    var instrumentation_2 = require_instrumentation8();
    var instrumentation_3 = require_instrumentation9();
    var DEFAULT_CONFIG = {
      requireParentSpan: false
    };
    var RedisInstrumentation2 = class extends instrumentation_1.InstrumentationBase {
      instrumentationV2_V3;
      instrumentationV4_V5;
      // this is used to bypass a flaw in the base class constructor, which is calling
      // member functions before the constructor has a chance to fully initialize the member variables.
      initialized = false;
      constructor(config = {}) {
        const resolvedConfig = { ...DEFAULT_CONFIG, ...config };
        super(version_1.PACKAGE_NAME, version_1.PACKAGE_VERSION, resolvedConfig);
        this.instrumentationV2_V3 = new instrumentation_2.RedisInstrumentationV2_V3(this.getConfig());
        this.instrumentationV4_V5 = new instrumentation_3.RedisInstrumentationV4_V5(this.getConfig());
        this.initialized = true;
      }
      setConfig(config = {}) {
        const newConfig = { ...DEFAULT_CONFIG, ...config };
        super.setConfig(newConfig);
        if (!this.initialized) {
          return;
        }
        this.instrumentationV2_V3.setConfig(newConfig);
        this.instrumentationV4_V5.setConfig(newConfig);
      }
      init() {
      }
      // Return underlying modules, as consumers (like https://github.com/DrewCorlin/opentelemetry-node-bundler-plugins) may
      // expect them to be populated without knowing that this module wraps 2 instrumentations
      getModuleDefinitions() {
        return [
          ...this.instrumentationV2_V3.getModuleDefinitions(),
          ...this.instrumentationV4_V5.getModuleDefinitions()
        ];
      }
      setTracerProvider(tracerProvider) {
        super.setTracerProvider(tracerProvider);
        if (!this.initialized) {
          return;
        }
        this.instrumentationV2_V3.setTracerProvider(tracerProvider);
        this.instrumentationV4_V5.setTracerProvider(tracerProvider);
      }
      enable() {
        super.enable();
        if (!this.initialized) {
          return;
        }
        this.instrumentationV2_V3.enable();
        this.instrumentationV4_V5.enable();
      }
      disable() {
        super.disable();
        if (!this.initialized) {
          return;
        }
        this.instrumentationV2_V3.disable();
        this.instrumentationV4_V5.disable();
      }
    };
    exports2.RedisInstrumentation = RedisInstrumentation2;
  }
});

// node_modules/@opentelemetry/instrumentation-redis/build/src/index.js
var require_src17 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-redis/build/src/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.RedisInstrumentation = void 0;
    var redis_1 = require_redis();
    Object.defineProperty(exports2, "RedisInstrumentation", { enumerable: true, get: function() {
      return redis_1.RedisInstrumentation;
    } });
  }
});

// node_modules/@opentelemetry/instrumentation-mongodb/build/src/semconv.js
var require_semconv8 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-mongodb/build/src/semconv.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.METRIC_DB_CLIENT_CONNECTION_COUNT = exports2.DB_SYSTEM_NAME_VALUE_MONGODB = exports2.DB_CLIENT_CONNECTION_STATE_VALUE_USED = exports2.DB_CLIENT_CONNECTION_STATE_VALUE_IDLE = exports2.ATTR_DB_CLIENT_CONNECTION_STATE = exports2.ATTR_DB_CLIENT_CONNECTION_POOL_NAME = void 0;
    exports2.ATTR_DB_CLIENT_CONNECTION_POOL_NAME = "db.client.connection.pool.name";
    exports2.ATTR_DB_CLIENT_CONNECTION_STATE = "db.client.connection.state";
    exports2.DB_CLIENT_CONNECTION_STATE_VALUE_IDLE = "idle";
    exports2.DB_CLIENT_CONNECTION_STATE_VALUE_USED = "used";
    exports2.DB_SYSTEM_NAME_VALUE_MONGODB = "mongodb";
    exports2.METRIC_DB_CLIENT_CONNECTION_COUNT = "db.client.connection.count";
  }
});

// node_modules/@opentelemetry/instrumentation-mongodb/build/src/internal-types.js
var require_internal_types4 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-mongodb/build/src/internal-types.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.MongodbCommandType = void 0;
    var MongodbCommandType;
    (function(MongodbCommandType2) {
      MongodbCommandType2["CREATE_INDEXES"] = "createIndexes";
      MongodbCommandType2["FIND_AND_MODIFY"] = "findAndModify";
      MongodbCommandType2["IS_MASTER"] = "isMaster";
      MongodbCommandType2["COUNT"] = "count";
      MongodbCommandType2["AGGREGATE"] = "aggregate";
      MongodbCommandType2["UNKNOWN"] = "unknown";
    })(MongodbCommandType = exports2.MongodbCommandType || (exports2.MongodbCommandType = {}));
  }
});

// node_modules/@opentelemetry/instrumentation-mongodb/build/src/version.js
var require_version10 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-mongodb/build/src/version.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PACKAGE_NAME = exports2.PACKAGE_VERSION = void 0;
    exports2.PACKAGE_VERSION = "0.76.0";
    exports2.PACKAGE_NAME = "@opentelemetry/instrumentation-mongodb";
  }
});

// node_modules/@opentelemetry/instrumentation-mongodb/build/src/instrumentation.js
var require_instrumentation10 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-mongodb/build/src/instrumentation.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.MongoDBInstrumentation = void 0;
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var instrumentation_1 = require_src8();
    var semantic_conventions_1 = require_dist();
    var semconv_1 = require_semconv8();
    var internal_types_1 = require_internal_types4();
    var version_1 = require_version10();
    var DEFAULT_CONFIG = {
      requireParentSpan: true
    };
    var MongoDBInstrumentation2 = class _MongoDBInstrumentation extends instrumentation_1.InstrumentationBase {
      constructor(config = {}) {
        super(version_1.PACKAGE_NAME, version_1.PACKAGE_VERSION, { ...DEFAULT_CONFIG, ...config });
      }
      setConfig(config = {}) {
        super.setConfig({ ...DEFAULT_CONFIG, ...config });
      }
      _updateMetricInstruments() {
        this._connectionsCount = this.meter.createUpDownCounter(semconv_1.METRIC_DB_CLIENT_CONNECTION_COUNT, {
          description: "The number of connections that are currently in state described by the state attribute.",
          unit: "{connection}"
        });
      }
      /**
       * Convenience function for updating the `db.client.connection.count` metric.
       */
      _connCountAdd(n, poolName, state) {
        this._connectionsCount?.add(n, {
          [semconv_1.ATTR_DB_CLIENT_CONNECTION_POOL_NAME]: poolName,
          [semconv_1.ATTR_DB_CLIENT_CONNECTION_STATE]: state
        });
      }
      init() {
        const { v3PatchConnection, v3UnpatchConnection } = this._getV3ConnectionPatches();
        const { v4PatchConnect, v4UnpatchConnect } = this._getV4ConnectPatches();
        const { v4PatchConnectionCallback, v4PatchConnectionPromise, v4UnpatchConnection } = this._getV4ConnectionPatches();
        const { v4PatchConnectionPool, v4UnpatchConnectionPool } = this._getV4ConnectionPoolPatches();
        const { v4PatchSessions, v4UnpatchSessions } = this._getV4SessionsPatches();
        return [
          new instrumentation_1.InstrumentationNodeModuleDefinition("mongodb", [">=3.3.0 <4"], void 0, void 0, [
            new instrumentation_1.InstrumentationNodeModuleFile("mongodb/lib/core/wireprotocol/index.js", [">=3.3.0 <4"], v3PatchConnection, v3UnpatchConnection)
          ]),
          new instrumentation_1.InstrumentationNodeModuleDefinition("mongodb", [">=4.0.0 <8"], void 0, void 0, [
            new instrumentation_1.InstrumentationNodeModuleFile("mongodb/lib/cmap/connection.js", [">=4.0.0 <6.4"], v4PatchConnectionCallback, v4UnpatchConnection),
            new instrumentation_1.InstrumentationNodeModuleFile("mongodb/lib/cmap/connection.js", [">=6.4.0 <8"], v4PatchConnectionPromise, v4UnpatchConnection),
            new instrumentation_1.InstrumentationNodeModuleFile("mongodb/lib/cmap/connection_pool.js", [">=4.0.0 <6.4"], v4PatchConnectionPool, v4UnpatchConnectionPool),
            new instrumentation_1.InstrumentationNodeModuleFile("mongodb/lib/cmap/connect.js", [">=4.0.0 <8"], v4PatchConnect, v4UnpatchConnect),
            new instrumentation_1.InstrumentationNodeModuleFile("mongodb/lib/sessions.js", [">=4.0.0 <8"], v4PatchSessions, v4UnpatchSessions)
          ])
        ];
      }
      _getV3ConnectionPatches() {
        return {
          v3PatchConnection: (moduleExports) => {
            if ((0, instrumentation_1.isWrapped)(moduleExports.insert)) {
              this._unwrap(moduleExports, "insert");
            }
            this._wrap(moduleExports, "insert", this._getV3PatchOperation("insert"));
            if ((0, instrumentation_1.isWrapped)(moduleExports.remove)) {
              this._unwrap(moduleExports, "remove");
            }
            this._wrap(moduleExports, "remove", this._getV3PatchOperation("remove"));
            if ((0, instrumentation_1.isWrapped)(moduleExports.update)) {
              this._unwrap(moduleExports, "update");
            }
            this._wrap(moduleExports, "update", this._getV3PatchOperation("update"));
            if ((0, instrumentation_1.isWrapped)(moduleExports.command)) {
              this._unwrap(moduleExports, "command");
            }
            this._wrap(moduleExports, "command", this._getV3PatchCommand());
            if ((0, instrumentation_1.isWrapped)(moduleExports.query)) {
              this._unwrap(moduleExports, "query");
            }
            this._wrap(moduleExports, "query", this._getV3PatchFind());
            if ((0, instrumentation_1.isWrapped)(moduleExports.getMore)) {
              this._unwrap(moduleExports, "getMore");
            }
            this._wrap(moduleExports, "getMore", this._getV3PatchCursor());
            return moduleExports;
          },
          v3UnpatchConnection: (moduleExports) => {
            if (moduleExports === void 0)
              return;
            this._unwrap(moduleExports, "insert");
            this._unwrap(moduleExports, "remove");
            this._unwrap(moduleExports, "update");
            this._unwrap(moduleExports, "command");
            this._unwrap(moduleExports, "query");
            this._unwrap(moduleExports, "getMore");
          }
        };
      }
      _getV4SessionsPatches() {
        return {
          v4PatchSessions: (moduleExports) => {
            if ((0, instrumentation_1.isWrapped)(moduleExports.acquire)) {
              this._unwrap(moduleExports, "acquire");
            }
            this._wrap(moduleExports.ServerSessionPool.prototype, "acquire", this._getV4AcquireCommand());
            if ((0, instrumentation_1.isWrapped)(moduleExports.release)) {
              this._unwrap(moduleExports, "release");
            }
            this._wrap(moduleExports.ServerSessionPool.prototype, "release", this._getV4ReleaseCommand());
            return moduleExports;
          },
          v4UnpatchSessions: (moduleExports) => {
            if (moduleExports === void 0)
              return;
            if ((0, instrumentation_1.isWrapped)(moduleExports.acquire)) {
              this._unwrap(moduleExports, "acquire");
            }
            if ((0, instrumentation_1.isWrapped)(moduleExports.release)) {
              this._unwrap(moduleExports, "release");
            }
          }
        };
      }
      _getV4AcquireCommand() {
        const instrumentation = this;
        return (original) => {
          return function patchAcquire() {
            const nSessionsBeforeAcquire = this.sessions.length;
            const session = original.call(this);
            const nSessionsAfterAcquire = this.sessions.length;
            if (nSessionsBeforeAcquire === nSessionsAfterAcquire) {
              instrumentation._connCountAdd(1, instrumentation._poolName, semconv_1.DB_CLIENT_CONNECTION_STATE_VALUE_USED);
            } else if (nSessionsBeforeAcquire - 1 === nSessionsAfterAcquire) {
              instrumentation._connCountAdd(-1, instrumentation._poolName, semconv_1.DB_CLIENT_CONNECTION_STATE_VALUE_IDLE);
              instrumentation._connCountAdd(1, instrumentation._poolName, semconv_1.DB_CLIENT_CONNECTION_STATE_VALUE_USED);
            }
            return session;
          };
        };
      }
      _getV4ReleaseCommand() {
        const instrumentation = this;
        return (original) => {
          return function patchRelease(session) {
            const cmdPromise = original.call(this, session);
            instrumentation._connCountAdd(-1, instrumentation._poolName, semconv_1.DB_CLIENT_CONNECTION_STATE_VALUE_USED);
            instrumentation._connCountAdd(1, instrumentation._poolName, semconv_1.DB_CLIENT_CONNECTION_STATE_VALUE_IDLE);
            return cmdPromise;
          };
        };
      }
      _getV4ConnectionPoolPatches() {
        return {
          v4PatchConnectionPool: (moduleExports) => {
            const poolPrototype = moduleExports.ConnectionPool.prototype;
            if ((0, instrumentation_1.isWrapped)(poolPrototype.checkOut)) {
              this._unwrap(poolPrototype, "checkOut");
            }
            this._wrap(poolPrototype, "checkOut", this._getV4ConnectionPoolCheckOut());
            return moduleExports;
          },
          v4UnpatchConnectionPool: (moduleExports) => {
            if (moduleExports === void 0)
              return;
            this._unwrap(moduleExports.ConnectionPool.prototype, "checkOut");
          }
        };
      }
      _getV4ConnectPatches() {
        return {
          v4PatchConnect: (moduleExports) => {
            if ((0, instrumentation_1.isWrapped)(moduleExports.connect)) {
              this._unwrap(moduleExports, "connect");
            }
            this._wrap(moduleExports, "connect", this._getV4ConnectCommand());
            return moduleExports;
          },
          v4UnpatchConnect: (moduleExports) => {
            if (moduleExports === void 0)
              return;
            this._unwrap(moduleExports, "connect");
          }
        };
      }
      // This patch will become unnecessary once
      // https://jira.mongodb.org/browse/NODE-5639 is done.
      _getV4ConnectionPoolCheckOut() {
        return (original) => {
          return function patchedCheckout(callback) {
            const patchedCallback = api_1.context.bind(api_1.context.active(), callback);
            return original.call(this, patchedCallback);
          };
        };
      }
      _getV4ConnectCommand() {
        const instrumentation = this;
        return (original) => {
          return function patchedConnect(options, callback) {
            if (original.length === 1) {
              const result = original.call(this, options);
              if (result && typeof result.then === "function") {
                result.then(
                  () => instrumentation.setPoolName(options),
                  // this handler is set to pass the lint rules
                  () => void 0
                );
              }
              return result;
            }
            const patchedCallback = function(err, conn) {
              if (err || !conn) {
                callback(err, conn);
                return;
              }
              instrumentation.setPoolName(options);
              callback(err, conn);
            };
            return original.call(this, options, patchedCallback);
          };
        };
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _getV4ConnectionPatches() {
        return {
          v4PatchConnectionCallback: (moduleExports) => {
            if ((0, instrumentation_1.isWrapped)(moduleExports.Connection.prototype.command)) {
              this._unwrap(moduleExports.Connection.prototype, "command");
            }
            this._wrap(moduleExports.Connection.prototype, "command", this._getV4PatchCommandCallback());
            return moduleExports;
          },
          v4PatchConnectionPromise: (moduleExports) => {
            if ((0, instrumentation_1.isWrapped)(moduleExports.Connection.prototype.command)) {
              this._unwrap(moduleExports.Connection.prototype, "command");
            }
            this._wrap(moduleExports.Connection.prototype, "command", this._getV4PatchCommandPromise());
            return moduleExports;
          },
          v4UnpatchConnection: (moduleExports) => {
            if (moduleExports === void 0)
              return;
            this._unwrap(moduleExports.Connection.prototype, "command");
          }
        };
      }
      /** Creates spans for common operations */
      _getV3PatchOperation(operationName) {
        const instrumentation = this;
        return (original) => {
          return function patchedServerCommand(server, ns, ops, options, callback) {
            const currentSpan = api_1.trace.getSpan(api_1.context.active());
            const skipInstrumentation = instrumentation._checkSkipInstrumentation(currentSpan);
            const resultHandler = typeof options === "function" ? options : callback;
            if (skipInstrumentation || typeof resultHandler !== "function" || typeof ops !== "object") {
              if (typeof options === "function") {
                return original.call(this, server, ns, ops, options);
              } else {
                return original.call(this, server, ns, ops, options, callback);
              }
            }
            const attributes = instrumentation._getV3SpanAttributes(
              ns,
              server,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ops[0],
              operationName
            );
            const spanName = instrumentation._spanNameFromAttrs(attributes);
            const span = instrumentation.tracer.startSpan(spanName, {
              kind: api_1.SpanKind.CLIENT,
              attributes
            });
            const patchedCallback = instrumentation._patchEnd(span, resultHandler);
            if (typeof options === "function") {
              return original.call(this, server, ns, ops, patchedCallback);
            } else {
              return original.call(this, server, ns, ops, options, patchedCallback);
            }
          };
        };
      }
      /** Creates spans for command operation */
      _getV3PatchCommand() {
        const instrumentation = this;
        return (original) => {
          return function patchedServerCommand(server, ns, cmd, options, callback) {
            const currentSpan = api_1.trace.getSpan(api_1.context.active());
            const skipInstrumentation = instrumentation._checkSkipInstrumentation(currentSpan);
            const resultHandler = typeof options === "function" ? options : callback;
            if (skipInstrumentation || typeof resultHandler !== "function" || typeof cmd !== "object") {
              if (typeof options === "function") {
                return original.call(this, server, ns, cmd, options);
              } else {
                return original.call(this, server, ns, cmd, options, callback);
              }
            }
            const commandType = _MongoDBInstrumentation._getCommandType(cmd);
            const operationName = commandType === internal_types_1.MongodbCommandType.UNKNOWN ? void 0 : commandType;
            const attributes = instrumentation._getV3SpanAttributes(ns, server, cmd, operationName);
            const spanName = instrumentation._spanNameFromAttrs(attributes);
            const span = instrumentation.tracer.startSpan(spanName, {
              kind: api_1.SpanKind.CLIENT,
              attributes
            });
            const patchedCallback = instrumentation._patchEnd(span, resultHandler);
            if (typeof options === "function") {
              return original.call(this, server, ns, cmd, patchedCallback);
            } else {
              return original.call(this, server, ns, cmd, options, patchedCallback);
            }
          };
        };
      }
      /** Creates spans for command operation */
      _getV4PatchCommandCallback() {
        const instrumentation = this;
        return (original) => {
          return function patchedV4ServerCommand(ns, cmd, options, callback) {
            const currentSpan = api_1.trace.getSpan(api_1.context.active());
            const skipInstrumentation = instrumentation._checkSkipInstrumentation(currentSpan);
            const resultHandler = callback;
            const commandType = Object.keys(cmd)[0];
            if (typeof cmd !== "object" || cmd.ismaster || cmd.hello) {
              return original.call(this, ns, cmd, options, callback);
            }
            let span = void 0;
            if (!skipInstrumentation) {
              const attributes = instrumentation._getV4SpanAttributes(this, ns, cmd, commandType);
              const spanName = instrumentation._spanNameFromAttrs(attributes);
              span = instrumentation.tracer.startSpan(spanName, {
                kind: api_1.SpanKind.CLIENT,
                attributes
              });
            }
            const patchedCallback = instrumentation._patchEnd(span, resultHandler, this.id, commandType);
            return original.call(this, ns, cmd, options, patchedCallback);
          };
        };
      }
      _getV4PatchCommandPromise() {
        const instrumentation = this;
        return (original) => {
          return function patchedV4ServerCommand(...args) {
            const [ns, cmd] = args;
            const currentSpan = api_1.trace.getSpan(api_1.context.active());
            const skipInstrumentation = instrumentation._checkSkipInstrumentation(currentSpan);
            const commandType = Object.keys(cmd)[0];
            const resultHandler = () => void 0;
            if (typeof cmd !== "object" || cmd.ismaster || cmd.hello) {
              return original.apply(this, args);
            }
            let span = void 0;
            if (!skipInstrumentation) {
              const attributes = instrumentation._getV4SpanAttributes(this, ns, cmd, commandType);
              const spanName = instrumentation._spanNameFromAttrs(attributes);
              span = instrumentation.tracer.startSpan(spanName, {
                kind: api_1.SpanKind.CLIENT,
                attributes
              });
            }
            const patchedCallback = instrumentation._patchEnd(span, resultHandler, this.id, commandType);
            const result = original.apply(this, args);
            result.then((res) => patchedCallback(null, res), (err) => patchedCallback(err));
            return result;
          };
        };
      }
      /** Creates spans for find operation */
      _getV3PatchFind() {
        const instrumentation = this;
        return (original) => {
          return function patchedServerCommand(server, ns, cmd, cursorState, options, callback) {
            const currentSpan = api_1.trace.getSpan(api_1.context.active());
            const skipInstrumentation = instrumentation._checkSkipInstrumentation(currentSpan);
            const resultHandler = typeof options === "function" ? options : callback;
            if (skipInstrumentation || typeof resultHandler !== "function" || typeof cmd !== "object") {
              if (typeof options === "function") {
                return original.call(this, server, ns, cmd, cursorState, options);
              } else {
                return original.call(this, server, ns, cmd, cursorState, options, callback);
              }
            }
            const attributes = instrumentation._getV3SpanAttributes(ns, server, cmd, "find");
            const spanName = instrumentation._spanNameFromAttrs(attributes);
            const span = instrumentation.tracer.startSpan(spanName, {
              kind: api_1.SpanKind.CLIENT,
              attributes
            });
            const patchedCallback = instrumentation._patchEnd(span, resultHandler);
            if (typeof options === "function") {
              return original.call(this, server, ns, cmd, cursorState, patchedCallback);
            } else {
              return original.call(this, server, ns, cmd, cursorState, options, patchedCallback);
            }
          };
        };
      }
      /** Creates spans for find operation */
      _getV3PatchCursor() {
        const instrumentation = this;
        return (original) => {
          return function patchedServerCommand(server, ns, cursorState, batchSize, options, callback) {
            const currentSpan = api_1.trace.getSpan(api_1.context.active());
            const skipInstrumentation = instrumentation._checkSkipInstrumentation(currentSpan);
            const resultHandler = typeof options === "function" ? options : callback;
            if (skipInstrumentation || typeof resultHandler !== "function") {
              if (typeof options === "function") {
                return original.call(this, server, ns, cursorState, batchSize, options);
              } else {
                return original.call(this, server, ns, cursorState, batchSize, options, callback);
              }
            }
            const attributes = instrumentation._getV3SpanAttributes(ns, server, cursorState.cmd, "getMore");
            const spanName = instrumentation._spanNameFromAttrs(attributes);
            const span = instrumentation.tracer.startSpan(spanName, {
              kind: api_1.SpanKind.CLIENT,
              attributes
            });
            const patchedCallback = instrumentation._patchEnd(span, resultHandler);
            if (typeof options === "function") {
              return original.call(this, server, ns, cursorState, batchSize, patchedCallback);
            } else {
              return original.call(this, server, ns, cursorState, batchSize, options, patchedCallback);
            }
          };
        };
      }
      /**
       * Get the mongodb command type from the object.
       * @param command Internal mongodb command object
       */
      static _getCommandType(command) {
        if (command.createIndexes !== void 0) {
          return internal_types_1.MongodbCommandType.CREATE_INDEXES;
        } else if (command.findandmodify !== void 0) {
          return internal_types_1.MongodbCommandType.FIND_AND_MODIFY;
        } else if (command.ismaster !== void 0) {
          return internal_types_1.MongodbCommandType.IS_MASTER;
        } else if (command.count !== void 0) {
          return internal_types_1.MongodbCommandType.COUNT;
        } else if (command.aggregate !== void 0) {
          return internal_types_1.MongodbCommandType.AGGREGATE;
        } else {
          return internal_types_1.MongodbCommandType.UNKNOWN;
        }
      }
      /**
       * Determine a span's attributes by fetching related metadata from the context
       * @param connectionCtx mongodb internal connection context
       * @param ns mongodb namespace
       * @param command mongodb internal representation of a command
       */
      _getV4SpanAttributes(connectionCtx, ns, command, operation) {
        let host, port;
        if (connectionCtx) {
          const hostParts = typeof connectionCtx.address === "string" ? connectionCtx.address.split(":") : "";
          if (hostParts.length === 2) {
            host = hostParts[0];
            port = hostParts[1];
          }
        }
        let commandObj;
        if (command?.documents && command.documents[0]) {
          commandObj = command.documents[0];
        } else if (command?.cursors) {
          commandObj = command.cursors;
        } else {
          commandObj = command;
        }
        return this._getSpanAttributes(ns.db, ns.collection, host, port, commandObj, operation);
      }
      /**
       * Determine a span's attributes by fetching related metadata from the context
       * @param ns mongodb namespace
       * @param topology mongodb internal representation of the network topology
       * @param command mongodb internal representation of a command
       */
      _getV3SpanAttributes(ns, topology, command, operation) {
        let host;
        let port;
        if (topology && topology.s) {
          host = topology.s.options?.host ?? topology.s.host;
          port = (topology.s.options?.port ?? topology.s.port)?.toString();
          if (host == null || port == null) {
            const address = topology.description?.address;
            if (address) {
              const addressSegments = address.split(":");
              host = addressSegments[0];
              port = addressSegments[1];
            }
          }
        }
        const [dbName, dbCollection] = ns.toString().split(".");
        const commandObj = command?.query ?? command?.q ?? command;
        return this._getSpanAttributes(dbName, dbCollection, host, port, commandObj, operation);
      }
      _getSpanAttributes(dbName, dbCollection, host, port, commandObj, operation) {
        const attributes = {};
        attributes[semantic_conventions_1.ATTR_DB_SYSTEM_NAME] = semconv_1.DB_SYSTEM_NAME_VALUE_MONGODB;
        attributes[semantic_conventions_1.ATTR_DB_NAMESPACE] = dbName;
        attributes[semantic_conventions_1.ATTR_DB_OPERATION_NAME] = operation;
        attributes[semantic_conventions_1.ATTR_DB_COLLECTION_NAME] = dbCollection;
        if (host && port) {
          attributes[semantic_conventions_1.ATTR_SERVER_ADDRESS] = host;
          const portNumber = parseInt(port, 10);
          if (!isNaN(portNumber)) {
            attributes[semantic_conventions_1.ATTR_SERVER_PORT] = portNumber;
          }
        }
        if (commandObj) {
          const { dbStatementSerializer: configDbStatementSerializer } = this.getConfig();
          const dbStatementSerializer = typeof configDbStatementSerializer === "function" ? configDbStatementSerializer : this._defaultDbStatementSerializer.bind(this);
          (0, instrumentation_1.safeExecuteInTheMiddle)(() => {
            const query = dbStatementSerializer(commandObj);
            attributes[semantic_conventions_1.ATTR_DB_QUERY_TEXT] = query;
          }, (err) => {
            if (err) {
              this._diag.error("Error running dbStatementSerializer hook", err);
            }
          }, true);
        }
        return attributes;
      }
      _spanNameFromAttrs(attributes) {
        const spanName = [attributes[semantic_conventions_1.ATTR_DB_OPERATION_NAME], attributes[semantic_conventions_1.ATTR_DB_COLLECTION_NAME]].filter((attr) => attr).join(" ") || semconv_1.DB_SYSTEM_NAME_VALUE_MONGODB;
        return spanName;
      }
      _getDefaultDbStatementReplacer() {
        const seen = /* @__PURE__ */ new WeakSet();
        return (_key, value) => {
          if (typeof value !== "object" || !value)
            return "?";
          if (seen.has(value))
            return "[Circular]";
          seen.add(value);
          return value;
        };
      }
      _defaultDbStatementSerializer(commandObj) {
        const { enhancedDatabaseReporting } = this.getConfig();
        if (enhancedDatabaseReporting) {
          return JSON.stringify(commandObj);
        }
        return JSON.stringify(commandObj, this._getDefaultDbStatementReplacer());
      }
      /**
       * Triggers the response hook in case it is defined.
       * @param span The span to add the results to.
       * @param result The command result
       */
      _handleExecutionResult(span, result) {
        const { responseHook } = this.getConfig();
        if (typeof responseHook === "function") {
          (0, instrumentation_1.safeExecuteInTheMiddle)(() => {
            responseHook(span, { data: result });
          }, (err) => {
            if (err) {
              this._diag.error("Error running response hook", err);
            }
          }, true);
        }
      }
      /**
       * Ends a created span.
       * @param span The created span to end.
       * @param resultHandler A callback function.
       * @param connectionId: The connection ID of the Command response.
       */
      _patchEnd(span, resultHandler, connectionId, commandType) {
        const activeContext = api_1.context.active();
        const instrumentation = this;
        let spanEnded = false;
        return function patchedEnd(...args) {
          if (!spanEnded) {
            spanEnded = true;
            const error = args[0];
            if (span) {
              if (error instanceof Error) {
                span.setStatus({
                  code: api_1.SpanStatusCode.ERROR,
                  message: error.message
                });
              } else {
                const result = args[1];
                instrumentation._handleExecutionResult(span, result);
              }
              span.end();
            }
            if (commandType === "endSessions") {
              instrumentation._connCountAdd(-1, instrumentation._poolName, semconv_1.DB_CLIENT_CONNECTION_STATE_VALUE_IDLE);
            }
          }
          return api_1.context.with(activeContext, () => {
            return resultHandler.apply(this, args);
          });
        };
      }
      setPoolName(options) {
        const host = options.hostAddress?.host;
        const port = options.hostAddress?.port;
        const database = options.dbName;
        const poolName = `mongodb://${host}:${port}/${database}`;
        this._poolName = poolName;
      }
      _checkSkipInstrumentation(currentSpan) {
        const requireParentSpan = this.getConfig().requireParentSpan;
        const hasNoParentSpan = currentSpan === void 0;
        return requireParentSpan === true && hasNoParentSpan;
      }
    };
    exports2.MongoDBInstrumentation = MongoDBInstrumentation2;
  }
});

// node_modules/@opentelemetry/instrumentation-mongodb/build/src/types.js
var require_types = __commonJS({
  "node_modules/@opentelemetry/instrumentation-mongodb/build/src/types.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.MongodbCommandType = void 0;
    var MongodbCommandType;
    (function(MongodbCommandType2) {
      MongodbCommandType2["CREATE_INDEXES"] = "createIndexes";
      MongodbCommandType2["FIND_AND_MODIFY"] = "findAndModify";
      MongodbCommandType2["IS_MASTER"] = "isMaster";
      MongodbCommandType2["COUNT"] = "count";
      MongodbCommandType2["UNKNOWN"] = "unknown";
    })(MongodbCommandType = exports2.MongodbCommandType || (exports2.MongodbCommandType = {}));
  }
});

// node_modules/@opentelemetry/instrumentation-mongodb/build/src/index.js
var require_src18 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-mongodb/build/src/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.MongodbCommandType = exports2.MongoDBInstrumentation = void 0;
    var instrumentation_1 = require_instrumentation10();
    Object.defineProperty(exports2, "MongoDBInstrumentation", { enumerable: true, get: function() {
      return instrumentation_1.MongoDBInstrumentation;
    } });
    var types_1 = require_types();
    Object.defineProperty(exports2, "MongodbCommandType", { enumerable: true, get: function() {
      return types_1.MongodbCommandType;
    } });
  }
});

// node_modules/@opentelemetry/instrumentation-undici/build/src/version.js
var require_version11 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-undici/build/src/version.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PACKAGE_NAME = exports2.PACKAGE_VERSION = void 0;
    exports2.PACKAGE_VERSION = "0.33.0";
    exports2.PACKAGE_NAME = "@opentelemetry/instrumentation-undici";
  }
});

// node_modules/@opentelemetry/instrumentation-undici/build/src/undici.js
var require_undici = __commonJS({
  "node_modules/@opentelemetry/instrumentation-undici/build/src/undici.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.UndiciInstrumentation = void 0;
    var diagch = require("diagnostics_channel");
    var url_1 = require("url");
    var instrumentation_1 = require_src8();
    var api_1 = (init_esm(), __toCommonJS(esm_exports));
    var core_1 = require_src2();
    var semantic_conventions_1 = require_dist();
    var version_1 = require_version11();
    var UndiciInstrumentation2 = class extends instrumentation_1.InstrumentationBase {
      _recordFromReq = /* @__PURE__ */ new WeakMap();
      constructor(config = {}) {
        super(version_1.PACKAGE_NAME, version_1.PACKAGE_VERSION, config);
      }
      // No need to instrument files/modules
      init() {
        return void 0;
      }
      disable() {
        super.disable();
        this._channelSubs.forEach((sub) => sub.unsubscribe());
        this._channelSubs.length = 0;
      }
      enable() {
        super.enable();
        this._channelSubs = this._channelSubs || [];
        if (this._channelSubs.length > 0) {
          return;
        }
        this.subscribeToChannel("undici:request:create", this.onRequestCreated.bind(this));
        this.subscribeToChannel("undici:client:sendHeaders", this.onRequestHeaders.bind(this));
        this.subscribeToChannel("undici:request:headers", this.onResponseHeaders.bind(this));
        this.subscribeToChannel("undici:request:trailers", this.onDone.bind(this));
        this.subscribeToChannel("undici:request:error", this.onError.bind(this));
      }
      _updateMetricInstruments() {
        this._httpClientDurationHistogram = this.meter.createHistogram(semantic_conventions_1.METRIC_HTTP_CLIENT_REQUEST_DURATION, {
          description: "Measures the duration of outbound HTTP requests.",
          unit: "s",
          valueType: api_1.ValueType.DOUBLE,
          advice: {
            explicitBucketBoundaries: [
              5e-3,
              0.01,
              0.025,
              0.05,
              0.075,
              0.1,
              0.25,
              0.5,
              0.75,
              1,
              2.5,
              5,
              7.5,
              10
            ]
          }
        });
      }
      subscribeToChannel(diagnosticChannel, onMessage) {
        const [major2, minor] = process.version.replace("v", "").split(".").map((n) => Number(n));
        const useNewSubscribe = major2 > 18 || major2 === 18 && minor >= 19;
        let unsubscribe;
        if (useNewSubscribe) {
          diagch.subscribe?.(diagnosticChannel, onMessage);
          unsubscribe = () => diagch.unsubscribe?.(diagnosticChannel, onMessage);
        } else {
          const channel = diagch.channel(diagnosticChannel);
          channel.subscribe(onMessage);
          unsubscribe = () => channel.unsubscribe(onMessage);
        }
        this._channelSubs.push({
          name: diagnosticChannel,
          unsubscribe
        });
      }
      parseRequestHeaders(request) {
        const result = /* @__PURE__ */ new Map();
        if (Array.isArray(request.headers)) {
          for (let i = 0; i < request.headers.length; i += 2) {
            const key = request.headers[i];
            const value = request.headers[i + 1];
            if (typeof key === "string") {
              result.set(key.toLowerCase(), value);
            }
          }
        } else if (typeof request.headers === "string") {
          const headers = request.headers.split("\r\n");
          for (const line of headers) {
            if (!line) {
              continue;
            }
            const colonIndex = line.indexOf(":");
            if (colonIndex === -1) {
              continue;
            }
            const key = line.substring(0, colonIndex).toLowerCase();
            const value = line.substring(colonIndex + 1).trim();
            const allValues = result.get(key);
            if (allValues && Array.isArray(allValues)) {
              allValues.push(value);
            } else if (allValues) {
              result.set(key, [allValues, value]);
            } else {
              result.set(key, value);
            }
          }
        }
        return result;
      }
      // This is the 1st message we receive for each request (fired after request creation). Here we will
      // create the span and populate some atttributes, then link the span to the request for further
      // span processing
      onRequestCreated({ request }) {
        const config = this.getConfig();
        const enabled = config.enabled !== false;
        const shouldIgnoreReq = (0, instrumentation_1.safeExecuteInTheMiddle)(() => !enabled || request.method === "CONNECT" || config.ignoreRequestHook?.(request), (e) => e && this._diag.error("caught ignoreRequestHook error: ", e), true);
        if (shouldIgnoreReq) {
          return;
        }
        const startTime = (0, core_1.hrTime)();
        let requestUrl;
        try {
          requestUrl = new url_1.URL(request.path, request.origin);
        } catch (err) {
          this._diag.warn("could not determine url.full:", err);
          return;
        }
        const urlScheme = requestUrl.protocol.replace(":", "");
        const requestMethod = this.getRequestMethod(request.method);
        const attributes = {
          [semantic_conventions_1.ATTR_HTTP_REQUEST_METHOD]: requestMethod,
          [semantic_conventions_1.ATTR_HTTP_REQUEST_METHOD_ORIGINAL]: request.method,
          [semantic_conventions_1.ATTR_URL_FULL]: requestUrl.toString(),
          [semantic_conventions_1.ATTR_URL_PATH]: requestUrl.pathname,
          [semantic_conventions_1.ATTR_URL_QUERY]: requestUrl.search,
          [semantic_conventions_1.ATTR_URL_SCHEME]: urlScheme
        };
        const schemePorts = { https: "443", http: "80" };
        const serverAddress = requestUrl.hostname;
        const serverPort = requestUrl.port || schemePorts[urlScheme];
        attributes[semantic_conventions_1.ATTR_SERVER_ADDRESS] = serverAddress;
        if (serverPort && !isNaN(Number(serverPort))) {
          attributes[semantic_conventions_1.ATTR_SERVER_PORT] = Number(serverPort);
        }
        const headersMap = this.parseRequestHeaders(request);
        const userAgentValues = headersMap.get("user-agent");
        if (userAgentValues) {
          const userAgent = Array.isArray(userAgentValues) ? userAgentValues[userAgentValues.length - 1] : userAgentValues;
          attributes[semantic_conventions_1.ATTR_USER_AGENT_ORIGINAL] = userAgent;
        }
        const hookAttributes = (0, instrumentation_1.safeExecuteInTheMiddle)(() => config.startSpanHook?.(request), (e) => e && this._diag.error("caught startSpanHook error: ", e), true);
        if (hookAttributes) {
          Object.entries(hookAttributes).forEach(([key, val]) => {
            attributes[key] = val;
          });
        }
        const activeCtx = api_1.context.active();
        const currentSpan = api_1.trace.getSpan(activeCtx);
        let span;
        if (config.requireParentforSpans && (!currentSpan || !api_1.trace.isSpanContextValid(currentSpan.spanContext()))) {
          span = api_1.trace.wrapSpanContext(api_1.INVALID_SPAN_CONTEXT);
        } else {
          span = this.tracer.startSpan(requestMethod === "_OTHER" ? "HTTP" : requestMethod, {
            kind: api_1.SpanKind.CLIENT,
            attributes
          }, activeCtx);
        }
        (0, instrumentation_1.safeExecuteInTheMiddle)(() => config.requestHook?.(span, request), (e) => e && this._diag.error("caught requestHook error: ", e), true);
        const requestContext = api_1.trace.setSpan(api_1.context.active(), span);
        const addedHeaders = {};
        api_1.propagation.inject(requestContext, addedHeaders);
        const headerEntries = Object.entries(addedHeaders);
        for (let i = 0; i < headerEntries.length; i++) {
          const [k, v] = headerEntries[i];
          if (typeof request.addHeader === "function") {
            request.addHeader(k, v);
          } else if (typeof request.headers === "string") {
            request.headers += `${k}: ${v}\r
`;
          } else if (Array.isArray(request.headers)) {
            request.headers.push(k, v);
          }
        }
        this._recordFromReq.set(request, { span, attributes, startTime });
      }
      // This is the 2nd message we receive for each request. It is fired when connection with
      // the remote is established and about to send the first byte. Here we do have info about the
      // remote address and port so we can populate some `network.*` attributes into the span
      onRequestHeaders({ request, socket }) {
        const record = this._recordFromReq.get(request);
        if (!record) {
          return;
        }
        const config = this.getConfig();
        const { span } = record;
        const { remoteAddress, remotePort, alpnProtocol } = socket;
        const spanAttributes = {
          [semantic_conventions_1.ATTR_NETWORK_PEER_ADDRESS]: remoteAddress,
          [semantic_conventions_1.ATTR_NETWORK_PEER_PORT]: remotePort,
          // undici only ever offers `http/1.1` and, with `allowH2`, `h2` as ALPN
          // protocols; a connection that negotiated neither is HTTP/1.1.
          [semantic_conventions_1.ATTR_NETWORK_PROTOCOL_VERSION]: alpnProtocol === "h2" ? "2" : "1.1"
        };
        if (config.headersToSpanAttributes?.requestHeaders) {
          const headersToAttribs = new Set(config.headersToSpanAttributes.requestHeaders.map((n) => n.toLowerCase()));
          const headersMap = this.parseRequestHeaders(request);
          for (const [name, value] of headersMap.entries()) {
            if (headersToAttribs.has(name)) {
              const attrValue = Array.isArray(value) ? value : [value];
              spanAttributes[`http.request.header.${name}`] = attrValue;
            }
          }
        }
        span.setAttributes(spanAttributes);
        record.attributes = Object.assign(record.attributes, spanAttributes);
      }
      // This is the 3rd message we get for each request and it's fired when the server
      // headers are received, body may not be accessible yet.
      // From the response headers we can set the status and content length
      onResponseHeaders({ request, response }) {
        const record = this._recordFromReq.get(request);
        if (!record) {
          return;
        }
        const { span, attributes } = record;
        const isError = response.statusCode >= 400;
        const spanAttributes = {
          [semantic_conventions_1.ATTR_HTTP_RESPONSE_STATUS_CODE]: response.statusCode
        };
        if (isError) {
          spanAttributes[semantic_conventions_1.ATTR_ERROR_TYPE] = String(response.statusCode);
        }
        const config = this.getConfig();
        (0, instrumentation_1.safeExecuteInTheMiddle)(() => config.responseHook?.(span, { request, response }), (e) => e && this._diag.error("caught responseHook error: ", e), true);
        if (config.headersToSpanAttributes?.responseHeaders) {
          const headersToAttribs = /* @__PURE__ */ new Set();
          config.headersToSpanAttributes?.responseHeaders.forEach((name) => headersToAttribs.add(name.toLowerCase()));
          for (let idx = 0; idx < response.headers.length; idx = idx + 2) {
            const name = response.headers[idx].toString().toLowerCase();
            const value = response.headers[idx + 1];
            if (headersToAttribs.has(name)) {
              const attrName = `http.response.header.${name}`;
              if (!Object.hasOwn(spanAttributes, attrName)) {
                spanAttributes[attrName] = [value.toString()];
              } else {
                spanAttributes[attrName].push(value.toString());
              }
            }
          }
        }
        span.setAttributes(spanAttributes);
        span.setStatus({
          code: isError ? api_1.SpanStatusCode.ERROR : api_1.SpanStatusCode.UNSET
        });
        record.attributes = Object.assign(attributes, spanAttributes);
      }
      // This is the last event we receive if the request went without any errors
      onDone({ request }) {
        const record = this._recordFromReq.get(request);
        if (!record) {
          return;
        }
        const { span, attributes, startTime } = record;
        span.end();
        this._recordFromReq.delete(request);
        this.recordRequestDuration(attributes, startTime);
      }
      // This is the event we get when something is wrong in the request like
      // - invalid options when calling `fetch` global API or any undici method for request
      // - connectivity errors such as unreachable host
      // - requests aborted through an `AbortController.signal`
      // NOTE: server errors are considered valid responses and it's the lib consumer
      // who should deal with that.
      onError({ request, error }) {
        const record = this._recordFromReq.get(request);
        if (!record) {
          return;
        }
        const { span, attributes, startTime } = record;
        const isAbort = error.name === "AbortError" || typeof DOMException !== "undefined" && error instanceof DOMException && error.code === DOMException.ABORT_ERR;
        if (isAbort) {
          span.end();
        } else {
          const errorType = error.code || error.name || "Error";
          attributes[semantic_conventions_1.ATTR_ERROR_TYPE] = errorType;
          span.setAttribute(semantic_conventions_1.ATTR_ERROR_TYPE, errorType);
          span.recordException(error);
          span.setStatus({
            code: api_1.SpanStatusCode.ERROR,
            message: error.message
          });
          span.end();
        }
        this._recordFromReq.delete(request);
        this.recordRequestDuration(attributes, startTime);
      }
      recordRequestDuration(attributes, startTime) {
        const metricsAttributes = {};
        const keysToCopy = [
          semantic_conventions_1.ATTR_HTTP_RESPONSE_STATUS_CODE,
          semantic_conventions_1.ATTR_HTTP_REQUEST_METHOD,
          semantic_conventions_1.ATTR_SERVER_ADDRESS,
          semantic_conventions_1.ATTR_SERVER_PORT,
          semantic_conventions_1.ATTR_URL_SCHEME,
          semantic_conventions_1.ATTR_ERROR_TYPE,
          semantic_conventions_1.ATTR_NETWORK_PROTOCOL_VERSION
        ];
        keysToCopy.forEach((key) => {
          if (key in attributes) {
            metricsAttributes[key] = attributes[key];
          }
        });
        const durationSeconds = (0, core_1.hrTimeToMilliseconds)((0, core_1.hrTimeDuration)(startTime, (0, core_1.hrTime)())) / 1e3;
        this._httpClientDurationHistogram.record(durationSeconds, metricsAttributes);
      }
      getRequestMethod(original) {
        const knownMethods = {
          CONNECT: true,
          OPTIONS: true,
          HEAD: true,
          GET: true,
          POST: true,
          PUT: true,
          PATCH: true,
          DELETE: true,
          TRACE: true,
          // QUERY from https://datatracker.ietf.org/doc/draft-ietf-httpbis-safe-method-w-body/
          QUERY: true
        };
        if (original.toUpperCase() in knownMethods) {
          return original.toUpperCase();
        }
        return "_OTHER";
      }
    };
    exports2.UndiciInstrumentation = UndiciInstrumentation2;
  }
});

// node_modules/@opentelemetry/instrumentation-undici/build/src/index.js
var require_src19 = __commonJS({
  "node_modules/@opentelemetry/instrumentation-undici/build/src/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.UndiciInstrumentation = void 0;
    var undici_1 = require_undici();
    Object.defineProperty(exports2, "UndiciInstrumentation", { enumerable: true, get: function() {
      return undici_1.UndiciInstrumentation;
    } });
  }
});

// lib/tracing/convert.js
var require_convert = __commonJS({
  "lib/tracing/convert.js"(exports2, module2) {
    "use strict";
    var SQL_SYSTEMS = /* @__PURE__ */ new Set(["postgresql", "mysql", "mariadb", "mssql", "sqlite", "oracle", "cockroachdb", "db2"]);
    var MAX_SPANS = 1e3;
    var seconds = (hr) => Array.isArray(hr) ? hr[0] + hr[1] / 1e9 : Number(hr) || 0;
    var attr = (span, ...keys) => {
      for (const k of keys) {
        const v = span.attributes && span.attributes[k];
        if (v !== void 0 && v !== null && v !== "") return v;
      }
      return void 0;
    };
    var parentId = (span) => span.parentSpanContext && span.parentSpanContext.spanId || span.parentSpanId || null;
    var ids = (span) => typeof span.spanContext === "function" ? span.spanContext() : span;
    var stripQuery = (url) => String(url).split("?")[0];
    function statusForHttp(code) {
      if (!code || code < 400) return "ok";
      const known = { 401: "unauthenticated", 403: "permission_denied", 404: "not_found", 409: "already_exists", 429: "resource_exhausted", 499: "cancelled", 501: "unimplemented", 503: "unavailable", 504: "deadline_exceeded" };
      if (known[code]) return known[code];
      return code < 500 ? "invalid_argument" : "internal_error";
    }
    function describe(span) {
      const system = attr(span, "db.system.name", "db.system");
      if (system) {
        const data = { "db.system": String(system) };
        const name = attr(span, "db.namespace", "db.name");
        if (name) data["db.name"] = String(name);
        if (system === "redis") {
          const statement = String(attr(span, "db.query.text", "db.statement") || span.name || "");
          const [command, key] = statement.split(/\s+/);
          return { op: "db.redis", description: [command && command.toUpperCase(), key].filter(Boolean).join(" ").slice(0, 200), data };
        }
        if (system === "mongodb") {
          const collection = attr(span, "db.collection.name", "db.mongodb.collection");
          const operation = attr(span, "db.operation.name", "db.operation");
          return { op: "db.mongodb", description: [operation, collection].filter(Boolean).join(" ") || span.name, data };
        }
        const text = attr(span, "db.query.text", "db.statement");
        if (!text) return { op: "db.connection", description: span.name, data };
        return { op: SQL_SYSTEMS.has(String(system)) ? "db.sql.query" : `db.${system}`, description: String(text), data };
      }
      if (span.kind === 2) {
        const method = attr(span, "http.request.method", "http.method") || "GET";
        const url = attr(span, "url.full", "http.url");
        const code = attr(span, "http.response.status_code", "http.status_code");
        const host = attr(span, "server.address", "net.peer.name");
        const data = { "http.request.method": String(method) };
        if (code) data["http.response.status_code"] = Number(code);
        if (host) data["server.address"] = String(host);
        return { op: "http.client", description: url ? `${method} ${stripQuery(url)}` : span.name, data, status: statusForHttp(Number(code)) };
      }
      const expressType = attr(span, "express.type");
      if (expressType) {
        const op = expressType === "request_handler" ? "http.route" : expressType === "router" ? "http.router" : "middleware.handle";
        return { op, description: attr(span, "express.name") || span.name, data: {} };
      }
      if (attr(span, "nestjs.type")) {
        return { op: attr(span, "nestjs.type") === "handler" ? "http.route" : "middleware.handle", description: span.name, data: {} };
      }
      return { op: "function", description: span.name, data: {} };
    }
    function isTransactionRoot2(span) {
      return span.kind === 1 && (!parentId(span) || span.parentSpanContext && span.parentSpanContext.isRemote);
    }
    function toTransaction2(root, spans, context2 = {}) {
      const rootIds = ids(root);
      const method = attr(root, "http.request.method", "http.method") || "GET";
      const route = attr(root, "http.route");
      const target = attr(root, "url.path", "http.target");
      const code = Number(attr(root, "http.response.status_code", "http.status_code")) || 0;
      const children = /* @__PURE__ */ new Map();
      for (const s of spans) {
        const p = parentId(s);
        if (!p || ids(s).spanId === rootIds.spanId) continue;
        if (!children.has(p)) children.set(p, []);
        children.get(p).push(s);
      }
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
          timestamp: seconds(s.endTime)
        };
        if (d.description) span.description = String(d.description).slice(0, 2e3);
        const status = d.status || (s.status && s.status.code === 2 ? "internal_error" : "ok");
        if (status !== "ok") span.status = status;
        if (Object.keys(d.data).length) span.data = d.data;
        return span;
      });
      const name = route ? `${method} ${route}` : `${method} ${stripQuery(target || root.name || "/")}`;
      const parent = root.parentSpanContext && root.parentSpanContext.isRemote ? root.parentSpanContext.spanId : void 0;
      return {
        type: "transaction",
        transaction: name.slice(0, 255),
        transaction_info: { source: route ? "route" : "url" },
        start_timestamp: seconds(root.startTime),
        timestamp: seconds(root.endTime),
        contexts: {
          trace: {
            trace_id: rootIds.traceId,
            span_id: rootIds.spanId,
            ...parent ? { parent_span_id: parent } : {},
            op: "http.server",
            status: code ? statusForHttp(code) : root.status && root.status.code === 2 ? "internal_error" : "ok",
            data: { "http.request.method": String(method), ...code ? { "http.response.status_code": code } : {} }
          }
        },
        spans: out,
        ...context2
      };
    }
    module2.exports = { describe, isTransactionRoot: isTransactionRoot2, statusForHttp, toTransaction: toTransaction2 };
  }
});

// tracing-src/index.js
var { NodeTracerProvider } = require_src5();
var { ParentBasedSampler, TraceIdRatioBasedSampler } = require_index_shim();
var { registerInstrumentations } = require_src8();
var { HttpInstrumentation } = require_src9();
var { ExpressInstrumentation } = require_src10();
var { NestInstrumentation } = require_src11();
var { PgInstrumentation } = require_src13();
var { MySQL2Instrumentation } = require_src14();
var { IORedisInstrumentation } = require_src16();
var { RedisInstrumentation } = require_src17();
var { MongoDBInstrumentation } = require_src18();
var { UndiciInstrumentation } = require_src19();
var { isTransactionRoot, toTransaction } = require_convert();
var MAX_TRACES = 2e3;
var MAX_SPANS_PER_TRACE = 2e3;
var STALE_MS = 120 * 1e3;
var GRACE_MS = 250;
var redisStatement = (command, args) => [command, Array.isArray(args) && typeof args[0] === "string" ? args[0].slice(0, 100) : null].filter(Boolean).join(" ");
function startTracing(opts) {
  const traces = /* @__PURE__ */ new Map();
  const processor = {
    onStart() {
    },
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
          }
        }, GRACE_MS);
        if (timer.unref) timer.unref();
      }
    },
    forceFlush: () => Promise.resolve(),
    shutdown: () => Promise.resolve()
  };
  const provider = new NodeTracerProvider({
    sampler: new ParentBasedSampler({ root: new TraceIdRatioBasedSampler(opts.sampleRate) }),
    spanProcessors: [processor]
  });
  provider.register();
  const t = opts.tracing || {};
  const ignoredPaths = opts.ignoredPaths || [];
  const instrumentations = [
    new HttpInstrumentation({
      // The SDK's own requests to Abrova Trace are never traced.
      ignoreOutgoingRequestHook: (req) => (req.hostname || req.host || "").split(":")[0] === opts.ignoreHost,
      ignoreIncomingRequestHook: (req) => ignoredPaths.some((p) => (req.url || "").split("?")[0] === p)
    }),
    new ExpressInstrumentation(),
    new NestInstrumentation()
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
    instrumentations.push(new UndiciInstrumentation({ ignoreRequestHook: (req) => (req.origin || "").includes(opts.ignoreHost) }));
  }
  registerInstrumentations({ tracerProvider: provider, instrumentations });
  const pending = () => [...traces.values()].filter((b) => b.root).length;
  return { pending, shutdown: () => provider.shutdown() };
}
module.exports = { startTracing };
