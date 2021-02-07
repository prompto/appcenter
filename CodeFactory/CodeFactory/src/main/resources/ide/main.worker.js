/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./node_modules/babel-loader/lib/index.js!./node_modules/eslint-loader/dist/cjs.js!./node_modules/webpack-conditional-loader/src/index.js!./src/worker/PromptoWorkerThread.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = [
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
  ];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys)
    .concat(directMergeKeys);

  var otherKeys = Object
    .keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, mergeDeepProperties);

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/eslint-loader/dist/cjs.js!./node_modules/webpack-conditional-loader/src/index.js!./src/worker/PromptoWorkerThread.js":
/*!*****************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/eslint-loader/dist/cjs.js!(webpack)-conditional-loader/src!./src/worker/PromptoWorkerThread.js ***!
  \*****************************************************************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Globals */ "./src/worker/Globals.js");
/* harmony import */ var _Globals__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Globals__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ace_Sender__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ace/Sender */ "./src/ace/Sender.js");
/* harmony import */ var _PromptoWorker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PromptoWorker */ "./src/worker/PromptoWorker.js");
var sender=new _ace_Sender__WEBPACK_IMPORTED_MODULE_1__["default"]();var worker=new _PromptoWorker__WEBPACK_IMPORTED_MODULE_2__["default"](sender);// eslint-disable-next-line
var globals=self;onmessage=function onmessage(e){var msg=e.data;if(msg.event&&sender){sender._signal(msg.event,msg.data);}else if(msg.command){if(worker[msg.command])worker[msg.command].apply(worker,msg.args);else if(globals[msg.command])globals[msg.command].apply(globals,msg.args);else throw new Error("Unknown command: "+msg.command);}else if(msg.init){// console.log("init");
}};

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/ace/Anchor.js":
/*!***************************!*\
  !*** ./src/ace/Anchor.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Anchor; });
/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2010, Ajax.org B.V.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */function $pointsInOrder(point1,point2,equalPointsInOrder){var bColIsAfter=equalPointsInOrder?point1.column<=point2.column:point1.column<point2.column;return point1.row<point2.row||point1.row===point2.row&&bColIsAfter;}function $getTransformedPoint(delta,point,moveIfEqual){// Get delta info.
var deltaIsInsert=delta.action==="insert";var deltaRowShift=(deltaIsInsert?1:-1)*(delta.end.row-delta.start.row);var deltaColShift=(deltaIsInsert?1:-1)*(delta.end.column-delta.start.column);var deltaStart=delta.start;var deltaEnd=deltaIsInsert?deltaStart:delta.end;// Collapse insert range.
// DELTA AFTER POINT: No change needed.
if($pointsInOrder(point,deltaStart,moveIfEqual)){return{row:point.row,column:point.column};}// DELTA BEFORE POINT: Move point by delta shift.
if($pointsInOrder(deltaEnd,point,!moveIfEqual)){return{row:point.row+deltaRowShift,column:point.column+(point.row===deltaEnd.row?deltaColShift:0)};}// DELTA ENVELOPS POINT (delete only): Move point to delta start.
// TODO warn if delta.action != "remove" ?
return{row:deltaStart.row,column:deltaStart.column};}/**
 *
 * Defines a floating pointer in the document. Whenever text is inserted or deleted before the cursor, the position of the anchor is updated.
 *
 * @class Anchor
 **/ /**
 * Creates a new `Anchor` and associates it with a document.
 *
 * @param {Document} doc The document to associate with the anchor
 * @param {Number} row The starting row position
 * @param {Number} column The starting column position
 *
 * @constructor
 **/class Anchor{constructor(doc,row,column){this.$onChange=this.onChange.bind(this);this.attach(doc);if(typeof column=="undefined")this.setPosition(row.row,row.column);else this.setPosition(row,column);/**
          * experimental: allows anchor to stick to the next on the left
          */this.$insertRight=false;}/**
     * Returns an object identifying the `row` and `column` position of the current anchor.
     * @returns {Object}
     **/getPosition(){return this.$clipPositionToDocument(this.row,this.column);}/**
     *
     * Returns the current document.
     * @returns {Document}
     **/getDocument(){return this.document;}/**
     * Fires whenever the anchor position changes.
     *
     * Both of these objects have a `row` and `column` property corresponding to the position.
     *
     * Events that can trigger this function include [[Anchor.setPosition `setPosition()`]].
     *
     * @event change
     * @param {Object} e  An object containing information about the anchor position. It has two properties:
     *  - `old`: An object describing the old Anchor position
     *  - `value`: An object describing the new Anchor position
     *
     **/onChange(delta){if(delta.start.row===delta.end.row&&delta.start.row!==this.row)return;if(delta.start.row>this.row)return;var point=$getTransformedPoint(delta,{row:this.row,column:this.column},this.$insertRight);this.setPosition(point.row,point.column,true);}/**
     * Sets the anchor position to the specified row and column. If `noClip` is `true`, the position is not clipped.
     * @param {Number} row The row index to move the anchor to
     * @param {Number} column The column index to move the anchor to
     * @param {Boolean} noClip Identifies if you want the position to be clipped
     *
     **/setPosition(row,column,noClip){var pos;if(noClip){pos={row:row,column:column};}else{pos=this.$clipPositionToDocument(row,column);}if(this.row===pos.row&&this.column===pos.column)return;var old={row:this.row,column:this.column};this.row=pos.row;this.column=pos.column;this._signal("change",{old:old,value:pos});}/**
     * When called, the `"change"` event listener is removed.
     *
     **/detach(){this.document.removeEventListener("change",this.$onChange);}attach(doc){this.document=doc||this.document;this.document.on("change",this.$onChange);}/**
     * Clips the anchor position to the specified row and column.
     * @param {Number} row The row index to clip the anchor to
     * @param {Number} column The column index to clip the anchor to
     *
     **/$clipPositionToDocument(row,column){var pos={};if(row>=this.document.getLength()){pos.row=Math.max(0,this.document.getLength()-1);pos.column=this.document.getLine(pos.row).length;}else if(row<0){pos.row=0;pos.column=0;}else{pos.row=row;pos.column=Math.min(this.document.getLine(pos.row).length,Math.max(0,column));}if(column<0)pos.column=0;return pos;}}

/***/ }),

/***/ "./src/ace/Document.js":
/*!*****************************!*\
  !*** ./src/ace/Document.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Document; });
/* harmony import */ var _Range__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Range */ "./src/ace/Range.js");
/* harmony import */ var _Anchor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Anchor */ "./src/ace/Anchor.js");
/* harmony import */ var _EventEmitter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EventEmitter */ "./src/ace/EventEmitter.js");
/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2010, Ajax.org B.V.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** *//*
function throwDeltaError(delta, errorText){
    console.log("Invalid Delta:", delta);
    throw new Error("Invalid Delta: " + errorText);
}

function positionInDocument(docLines, position) {
    return position.row    >= 0 && position.row    <  docLines.length &&
        position.column >= 0 && position.column <= docLines[position.row].length;
}


function validateDelta(docLines, delta) {
    // Validate action string.
    if (delta.action != "insert" && delta.action != "remove")
        throwDeltaError(delta, "delta.action must be 'insert' or 'remove'");

    // Validate lines type.
    if (!(delta.lines instanceof Array))
        throwDeltaError(delta, "delta.lines must be an Array");

    // Validate range type.
    if (!delta.start || !delta.end)
        throwDeltaError(delta, "delta.start/end must be an present");

    // Validate that the start point is contained in the document.
    var start = delta.start;
    if (!positionInDocument(docLines, delta.start))
        throwDeltaError(delta, "delta.start must be contained in document");

    // Validate that the end point is contained in the document (remove deltas only).
    var end = delta.end;
    if (delta.action == "remove" && !positionInDocument(docLines, end))
        throwDeltaError(delta, "delta.end must contained in document for 'remove' actions");

    // Validate that the .range size matches the .lines size.
    var numRangeRows = end.row - start.row;
    var numRangeLastLineChars = (end.column - (numRangeRows == 0 ? start.column : 0));
    if (numRangeRows != delta.lines.length - 1 || delta.lines[numRangeRows].length != numRangeLastLineChars)
        throwDeltaError(delta, "delta.range must match delta lines");
}
*/function applyDelta(docLines,delta,doNotValidate){// disabled validation since it breaks autocompletion popup
// if (!doNotValidate)
//    validateDelta(docLines, delta);
var row=delta.start.row;var startColumn=delta.start.column;var line=docLines[row]||"";switch(delta.action){case"insert":var lines=delta.lines;if(lines.length===1){docLines[row]=line.substring(0,startColumn)+delta.lines[0]+line.substring(startColumn);}else{var args=[row,1].concat(delta.lines);docLines.splice.apply(docLines,args);docLines[row]=line.substring(0,startColumn)+docLines[row];docLines[row+delta.lines.length-1]+=line.substring(startColumn);}break;case"remove":var endColumn=delta.end.column;var endRow=delta.end.row;if(row===endRow){docLines[row]=line.substring(0,startColumn)+line.substring(endColumn);}else{docLines.splice(row,endRow-row+1,line.substring(0,startColumn)+docLines[endRow].substring(endColumn));}break;default:throw new Error("Unsupported: "+delta.action);}}/**
 * Contains the text of the document. Document can be attached to several [[EditSession `EditSession`]]s.
 * At its core, `Document`s are just an array of strings, with each row in the document matching up to the array index.
 *
 * @class Document
 **/class Document extends _EventEmitter__WEBPACK_IMPORTED_MODULE_2__["default"]{/**
     *
     * Creates a new `Document`. If `text` is included, the `Document` contains those strings; otherwise, it's empty.
     * @param {String | Array} text The starting text
     * @constructor
     **/constructor(textOrLines){super();this.$lines=[""];this.$autoNewLine="";this.$newLineMode="auto";// There has to be one line at least in the document. If you pass an empty
// string to the insert function, nothing will happen. Workaround.
if(textOrLines.length===0){this.$lines=[""];}else if(Array.isArray(textOrLines)){this.insertMergedLines({row:0,column:0},textOrLines);}else{this.insert({row:0,column:0},textOrLines);}}/**
     * Replaces all the lines in the current `Document` with the value of `text`.
     *
     * @param {String} text The text to use
     **/setValue(text){var len=this.getLength()-1;this.remove(new _Range__WEBPACK_IMPORTED_MODULE_0__["default"](0,0,len,this.getLine(len).length));this.insert({row:0,column:0},text);}/**
     * Returns all the lines in the document as a single string, joined by the new line character.
     **/getValue(){return this.getAllLines().join(this.getNewLineCharacter());}/**
     * Creates a new `Anchor` to define a floating point in the document.
     * @param {Number} row The row number to use
     * @param {Number} column The column number to use
     *
     **/createAnchor(row,column){return new _Anchor__WEBPACK_IMPORTED_MODULE_1__["default"](this,row,column);}/**
     * Splits a string of text on any newline (`\n`) or carriage-return (`\r`) characters.
     *
     * @method $split
     * @param {String} text The text to work with
     * @returns {String} A String array, with each index containing a piece of the original `text` string.
     *
     **/$split(text){return text.split(/\r\n|\r|\n/);}$detectNewLine(text){var match=text.match(/^.*?(\r\n|\r|\n)/m);this.$autoNewLine=match?match[1]:"\n";this._signal("changeNewLineMode");}/**
     * Returns the newline character that's being used, depending on the value of `newLineMode`.
     * @returns {String} If `newLineMode == windows`, `\r\n` is returned.
     *  If `newLineMode == unix`, `\n` is returned.
     *  If `newLineMode == auto`, the value of `autoNewLine` is returned.
     *
     **/getNewLineCharacter(){switch(this.$newLineMode){case"windows":return"\r\n";case"unix":return"\n";default:return this.$autoNewLine||"\n";}}/**
     * [Sets the new line mode.]{: #Document.setNewLineMode.desc}
     * @param {String} newLineMode [The newline mode to use; can be either `windows`, `unix`, or `auto`]{: #Document.setNewLineMode.param}
     *
     **/setNewLineMode(newLineMode){if(this.$newLineMode===newLineMode)return;this.$newLineMode=newLineMode;this._signal("changeNewLineMode");}/**
     * [Returns the type of newlines being used; either `windows`, `unix`, or `auto`]{: #Document.getNewLineMode}
     * @returns {String}
     **/getNewLineMode(){return this.$newLineMode;}/**
     * Returns `true` if `text` is a newline character (either `\r\n`, `\r`, or `\n`).
     * @param {String} text The text to check
     *
     **/isNewLine(text){return text==="\r\n"||text==="\r"||text==="\n";}/**
     * Returns a verbatim copy of the given line as it is in the document
     * @param {Number} row The row index to retrieve
     *
     **/getLine(row){return this.$lines[row]||"";}/**
     * Returns an array of strings of the rows between `firstRow` and `lastRow`. This function is inclusive of `lastRow`.
     * @param {Number} firstRow The first row index to retrieve
     * @param {Number} lastRow The final row index to retrieve
     *
     **/getLines(firstRow,lastRow){return this.$lines.slice(firstRow,lastRow+1);}/**
     * Returns all lines in the document as string array.
     **/getAllLines(){return this.getLines(0,this.getLength());}/**
     * Returns the number of rows in the document.
     **/getLength(){return this.$lines.length;}/**
     * Returns all the text within `range` as a single string.
     * @param {Range} range The range to work with.
     *
     * @returns {String}
     **/getTextRange(range){return this.getLinesForRange(range).join(this.getNewLineCharacter());}/**
     * Returns all the text within `range` as an array of lines.
     * @param {Range} range The range to work with.
     *
     * @returns {Array}
     **/getLinesForRange(range){var lines;if(range.start.row===range.end.row){// Handle a single-line range.
lines=[this.getLine(range.start.row).substring(range.start.column,range.end.column)];}else{// Handle a multi-line range.
lines=this.getLines(range.start.row,range.end.row);lines[0]=(lines[0]||"").substring(range.start.column);var l=lines.length-1;if(range.end.row-range.start.row===l)lines[l]=lines[l].substring(0,range.end.column);}return lines;}// Deprecated methods retained for backwards compatibility.
insertLines(row,lines){console.warn("Use of document.insertLines is deprecated. Use the insertFullLines method instead.");return this.insertFullLines(row,lines);}removeLines(firstRow,lastRow){console.warn("Use of document.removeLines is deprecated. Use the removeFullLines method instead.");return this.removeFullLines(firstRow,lastRow);}insertNewLine(position){console.warn("Use of document.insertNewLine is deprecated. Use insertMergedLines(position, ['', '']) instead.");return this.insertMergedLines(position,["",""]);}/**
     * Inserts a block of `text` at the indicated `position`.
     * @param {Object} position The position to start inserting at; it's an object that looks like `{ row: row, column: column}`
     * @param {String} text A chunk of text to insert
     * @returns {Object} The position ({row, column}) of the last line of `text`. If the length of `text` is 0, this function simply returns `position`.
     *
     **/insert(position,text){// Only detect new lines if the document has no line break yet.
if(this.getLength()<=1)this.$detectNewLine(text);return this.insertMergedLines(position,this.$split(text));}/**
     * Inserts `text` into the `position` at the current row. This method also triggers the `"change"` event.
     *
     * This differs from the `insert` method in two ways:
     *   1. This does NOT handle newline characters (single-line text only).
     *   2. This is faster than the `insert` method for single-line text insertions.
     *
     * @param {Object} position The position to insert at; it's an object that looks like `{ row: row, column: column}`
     * @param {String} text A chunk of text
     * @returns {Object} Returns an object containing the final row and column, like this:
     *     ```
     *     {row: endRow, column: 0}
     *     ```
     **/insertInLine(position,text){var start=this.clippedPos(position.row,position.column);var end=this.pos(position.row,position.column+text.length);this.applyDelta({start:start,end:end,action:"insert",lines:[text]},true);return this.clonePos(end);}clippedPos(row,column){var length=this.getLength();if(row===undefined){row=length;}else if(row<0){row=0;}else if(row>=length){row=length-1;column=undefined;}var line=this.getLine(row);if(column===undefined)column=line.length;column=Math.min(Math.max(column,0),line.length);return{row:row,column:column};}clonePos(pos){return{row:pos.row,column:pos.column};}pos(row,column){return{row:row,column:column};}$clipPosition(position){var length=this.getLength();if(position.row>=length){position.row=Math.max(0,length-1);position.column=this.getLine(length-1).length;}else{position.row=Math.max(0,position.row);position.column=Math.min(Math.max(position.column,0),this.getLine(position.row).length);}return position;}/**
     * Fires whenever the document changes.
     *
     * Several methods trigger different `"change"` events. Below is a list of each action type, followed by each property that's also available:
     *
     *  * `"insert"`
     *    * `range`: the [[Range]] of the change within the document
     *    * `lines`: the lines being added
     *  * `"remove"`
     *    * `range`: the [[Range]] of the change within the document
     *    * `lines`: the lines being removed
     *
     * @event change
     * @param {Object} e Contains at least one property called `"action"`. `"action"` indicates the action that triggered the change. Each action also has a set of additional properties.
     *
     **/ /**
     * Inserts the elements in `lines` into the document as full lines (does not merge with existing line), starting at the row index given by `row`. This method also triggers the `"change"` event.
     * @param {Number} row The index of the row to insert at
     * @param {Array} lines An array of strings
     * @returns {Object} Contains the final row and column, like this:
     *   ```
     *   {row: endRow, column: 0}
     *   ```
     *   If `lines` is empty, this function returns an object containing the current row, and column, like this:
     *   ```
     *   {row: row, column: 0}
     *   ```
     *
     **/insertFullLines(row,lines){// Clip to document.
// Allow one past the document end.
row=Math.min(Math.max(row,0),this.getLength());// Calculate insertion point.
var column=0;if(row<this.getLength()){// Insert before the specified row.
lines=lines.concat([""]);column=0;}else{// Insert after the last row in the document.
lines=[""].concat(lines);row--;column=this.$lines[row].length;}// Insert.
this.insertMergedLines({row:row,column:column},lines);}/**
     * Inserts the elements in `lines` into the document, starting at the position index given by `row`. This method also triggers the `"change"` event.
     * @param {Number} row The index of the row to insert at
     * @param {Array} lines An array of strings
     * @returns {Object} Contains the final row and column, like this:
     *   ```
     *   {row: endRow, column: 0}
     *   ```
     *   If `lines` is empty, this function returns an object containing the current row, and column, like this:
     *   ```
     *   {row: row, column: 0}
     *   ```
     *
     **/insertMergedLines(position,lines){var start=this.clippedPos(position.row,position.column);var end={row:start.row+lines.length-1,column:(lines.length===1?start.column:0)+lines[lines.length-1].length};this.applyDelta({start:start,end:end,action:"insert",lines:lines});return this.clonePos(end);}/**
     * Removes the `range` from the document.
     * @param {Range} range A specified Range to remove
     * @returns {Object} Returns the new `start` property of the range, which contains `startRow` and `startColumn`. If `range` is empty, this function returns the unmodified value of `range.start`.
     *
     **/remove(range){var start=this.clippedPos(range.start.row,range.start.column);var end=this.clippedPos(range.end.row,range.end.column);this.applyDelta({start:start,end:end,action:"remove",lines:this.getLinesForRange({start:start,end:end})});return this.clonePos(start);}/**
     * Removes the specified columns from the `row`. This method also triggers a `"change"` event.
     * @param {Number} row The row to remove from
     * @param {Number} startColumn The column to start removing at
     * @param {Number} endColumn The column to stop removing at
     * @returns {Object} Returns an object containing `startRow` and `startColumn`, indicating the new row and column values.<br/>If `startColumn` is equal to `endColumn`, this function returns nothing.
     *
     **/removeInLine(row,startColumn,endColumn){var start=this.clippedPos(row,startColumn);var end=this.clippedPos(row,endColumn);this.applyDelta({start:start,end:end,action:"remove",lines:this.getLinesForRange({start:start,end:end})},true);return this.clonePos(start);}/**
     * Removes a range of full lines. This method also triggers the `"change"` event.
     * @param {Number} firstRow The first row to be removed
     * @param {Number} lastRow The last row to be removed
     * @returns {[String]} Returns all the removed lines.
     *
     **/removeFullLines(firstRow,lastRow){// Clip to document.
firstRow=Math.min(Math.max(0,firstRow),this.getLength()-1);lastRow=Math.min(Math.max(0,lastRow),this.getLength()-1);// Calculate deletion range.
// Delete the ending new line unless we're at the end of the document.
// If we're at the end of the document, delete the starting new line.
var deleteFirstNewLine=lastRow===this.getLength()-1&&firstRow>0;var deleteLastNewLine=lastRow<this.getLength()-1;var startRow=deleteFirstNewLine?firstRow-1:firstRow;var startCol=deleteFirstNewLine?this.getLine(startRow).length:0;var endRow=deleteLastNewLine?lastRow+1:lastRow;var endCol=deleteLastNewLine?0:this.getLine(endRow).length;var range=new _Range__WEBPACK_IMPORTED_MODULE_0__["default"](startRow,startCol,endRow,endCol);// Store delelted lines with bounding newlines ommitted (maintains previous behavior).
var deletedLines=this.$lines.slice(firstRow,lastRow+1);this.applyDelta({start:range.start,end:range.end,action:"remove",lines:this.getLinesForRange(range)});// Return the deleted lines.
return deletedLines;}/**
     * Removes the new line between `row` and the row immediately following it. This method also triggers the `"change"` event.
     * @param {Number} row The row to check
     *
     **/removeNewLine(row){if(row<this.getLength()-1&&row>=0){this.applyDelta({start:this.pos(row,this.getLine(row).length),end:this.pos(row+1,0),action:"remove",lines:["",""]});}}/**
     * Replaces a range in the document with the new `text`.
     * @param {Range} range A specified Range to replace
     * @param {String} text The new text to use as a replacement
     * @returns {Object} Returns an object containing the final row and column, like this:
     *     {row: endRow, column: 0}
     * If the text and range are empty, this function returns an object containing the current `range.start` value.
     * If the text is the exact same as what currently exists, this function returns an object containing the current `range.end` value.
     *
     **/replace(range,text){if(!(range instanceof _Range__WEBPACK_IMPORTED_MODULE_0__["default"]))range=_Range__WEBPACK_IMPORTED_MODULE_0__["default"].fromPoints(range.start,range.end);if(text.length===0&&range.isEmpty())return range.start;// Shortcut: If the text we want to insert is the same as it is already
// in the document, we don't have to replace anything.
if(text===this.getTextRange(range))return range.end;this.remove(range);var end;if(text){end=this.insert(range.start,text);}else{end=range.start;}return end;}/**
     * Applies all changes in `deltas` to the document.
     * @param {Array} deltas An array of delta objects (can include "insert" and "remove" actions)
     **/applyDeltas(deltas){for(var i=0;i<deltas.length;i++){this.applyDelta(deltas[i]);}}/**
     * Reverts all changes in `deltas` from the document.
     * @param {Array} deltas An array of delta objects (can include "insert" and "remove" actions)
     **/revertDeltas(deltas){for(var i=deltas.length-1;i>=0;i--){this.revertDelta(deltas[i]);}}/**
     * Applies `delta` to the document.
     * @param {Object} delta A delta object (can include "insert" and "remove" actions)
     **/applyDelta(delta,doNotValidate){var isInsert=delta.action==="insert";// An empty range is a NOOP.
if(isInsert?delta.lines.length<=1&&!delta.lines[0]:!_Range__WEBPACK_IMPORTED_MODULE_0__["default"].comparePoints(delta.start,delta.end)){return;}if(isInsert&&delta.lines.length>20000){this.$splitAndapplyLargeDelta(delta,20000);}else{applyDelta(this.$lines,delta,doNotValidate);this._signal("change",delta);}}$splitAndapplyLargeDelta(delta,MAX){// Split large insert deltas. This is necessary because:
//    1. We need to support splicing delta lines into the document via $lines.splice.apply(...)
//    2. fn.apply() doesn't work for a large number of params. The smallest threshold is on chrome 40 ~42000.
// we use 20000 to leave some space for actual stack
//
// To Do: Ideally we'd be consistent and also split 'delete' deltas. We don't do this now, because delete
//        delta handling is too slow. If we make delete delta handling faster we can split all large deltas
//        as shown in https://gist.github.com/aldendaniels/8367109#file-document-snippet-js
//        If we do this, update validateDelta() to limit the number of lines in a delete delta.
var lines=delta.lines;var l=lines.length-MAX+1;var row=delta.start.row;var column=delta.start.column;for(var from=0,to=0;from<l;from=to){to+=MAX-1;var chunk=lines.slice(from,to);chunk.push("");this.applyDelta({start:this.pos(row+from,column),end:this.pos(row+to,column=0),action:delta.action,lines:chunk},true);}// Update remaining delta.
delta.lines=lines.slice(from);delta.start.row=row+from;delta.start.column=column;this.applyDelta(delta,true);}/**
     * Reverts `delta` from the document.
     * @param {Object} delta A delta object (can include "insert" and "remove" actions)
     **/revertDelta(delta){this.applyDelta({start:this.clonePos(delta.start),end:this.clonePos(delta.end),action:delta.action==="insert"?"remove":"insert",lines:delta.lines.slice()});}/**
     * Converts an index position in a document to a `{row, column}` object.
     *
     * Index refers to the "absolute position" of a character in the document. For example:
     *
     * ```javascript
     * var x = 0; // 10 characters, plus one for newline
     * var y = -1;
     * ```
     *
     * Here, `y` is an index 15: 11 characters for the first row, and 5 characters until `y` in the second.
     *
     * @param {Number} index An index to convert
     * @param {Number} startRow=0 The row from which to start the conversion
     * @returns {Object} A `{row, column}` object of the `index` position
     */indexToPosition(index,startRow){var lines=this.$lines||this.getAllLines();var newlineLength=this.getNewLineCharacter().length;for(var i=startRow||0,l=lines.length;i<l;i++){index-=lines[i].length+newlineLength;if(index<0)return{row:i,column:index+lines[i].length+newlineLength};}return{row:l-1,column:index+lines[l-1].length+newlineLength};}/**
     * Converts the `{row, column}` position in a document to the character's index.
     *
     * Index refers to the "absolute position" of a character in the document. For example:
     *
     * ```javascript
     * var x = 0; // 10 characters, plus one for newline
     * var y = -1;
     * ```
     *
     * Here, `y` is an index 15: 11 characters for the first row, and 5 characters until `y` in the second.
     *
     * @param {Object} pos The `{row, column}` to convert
     * @param {Number} startRow=0 The row from which to start the conversion
     * @returns {Number} The index position in the document
     */positionToIndex(pos,startRow){var lines=this.$lines||this.getAllLines();var newlineLength=this.getNewLineCharacter().length;var index=0;var row=Math.min(pos.row,lines.length);for(var i=startRow||0;i<row;++i){index+=lines[i].length+newlineLength;}return index+pos.column;}}

/***/ }),

/***/ "./src/ace/EventEmitter.js":
/*!*********************************!*\
  !*** ./src/ace/EventEmitter.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EventEmitter; });
/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2010, Ajax.org B.V.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */var stopPropagation=function stopPropagation(){this.propagationStopped=true;};var preventDefault=function preventDefault(){this.defaultPrevented=true;};class EventEmitter{constructor(){this._emit=this._dispatchEvent;this.on=this.addEventListener;this.off=this.removeEventListener;this.removeListener=this.removeEventListener;}dispatchEvent(eventName,e){this._eventRegistry||(this._eventRegistry={});this._defaultHandlers||(this._defaultHandlers={});var listeners=this._eventRegistry[eventName]||[];var defaultHandler=this._defaultHandlers[eventName];if(!listeners.length&&!defaultHandler)return;if(typeof e!="object"||!e)e={};if(!e.type)e.type=eventName;if(!e.stopPropagation)e.stopPropagation=stopPropagation;if(!e.preventDefault)e.preventDefault=preventDefault;listeners=listeners.slice();for(var i=0;i<listeners.length;i++){listeners[i](e,this);if(e.propagationStopped)break;}if(defaultHandler&&!e.defaultPrevented)return defaultHandler(e,this);}_signal(eventName,e){var listeners=(this._eventRegistry||{})[eventName];if(!listeners)return;listeners=listeners.slice();for(var i=0;i<listeners.length;i++){listeners[i](e,this);}}once(eventName,callback){var _self=this;this.addEventListener(eventName,function newCallback(){_self.removeEventListener(eventName,newCallback);callback.apply(null,arguments);});if(!callback){return new Promise(function(resolve){callback=resolve;});}}setDefaultHandler(eventName,callback){var handlers=this._defaultHandlers;if(!handlers)handlers=this._defaultHandlers={_disabled_:{}};if(handlers[eventName]){var old=handlers[eventName];var disabled=handlers._disabled_[eventName];if(!disabled)handlers._disabled_[eventName]=disabled=[];disabled.push(old);var i=disabled.indexOf(callback);if(i!==-1)disabled.splice(i,1);}handlers[eventName]=callback;}removeDefaultHandler(eventName,callback){var handlers=this._defaultHandlers;if(!handlers)return;var disabled=handlers._disabled_[eventName];if(handlers[eventName]===callback){if(disabled)this.setDefaultHandler(eventName,disabled.pop());}else if(disabled){var i=disabled.indexOf(callback);if(i!==-1)disabled.splice(i,1);}}addEventListener(eventName,callback,capturing){this._eventRegistry=this._eventRegistry||{};var listeners=this._eventRegistry[eventName];if(!listeners)listeners=this._eventRegistry[eventName]=[];if(listeners.indexOf(callback)===-1)listeners[capturing?"unshift":"push"](callback);return callback;}removeEventListener(eventName,callback){this._eventRegistry=this._eventRegistry||{};var listeners=this._eventRegistry[eventName];if(!listeners)return;var index=listeners.indexOf(callback);if(index!==-1)listeners.splice(index,1);}removeAllListeners(eventName){if(this._eventRegistry)this._eventRegistry[eventName]=[];}}

/***/ }),

/***/ "./src/ace/Mirror.js":
/*!***************************!*\
  !*** ./src/ace/Mirror.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Mirror; });
/* harmony import */ var _Document__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Document */ "./src/ace/Document.js");
/* harmony import */ var _lang__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lang */ "./src/ace/lang.js");
class Mirror{constructor(sender){this.sender=sender;this.$timeout=0;this.doc=new _Document__WEBPACK_IMPORTED_MODULE_0__["default"]("");this.deferredUpdate=Object(_lang__WEBPACK_IMPORTED_MODULE_1__["delayedCall"])(this.onUpdate.bind(this));sender.on("change",this.processChange.bind(this));sender.on("changes",this.processChanges.bind(this));}processChanges(data){var changes=data.data;for(var i=0;i<changes.length;i++){this.applyChange(changes[i]);}return this.invokeUpdate();}processChange(data){var change=data.data;this.applyChange(change);return this.invokeUpdate();}invokeUpdate(){if(this.$timeout)return this.deferredUpdate.schedule(this.$timeout);else this.onUpdate();}applyChange(data){var doc=this.doc;if(data[0].start){doc.applyDeltas(data);}else{for(var i=0;i<data.length;i+=2){var d=Array.isArray(data[i+1])?{action:"insert",start:data[i],lines:data[i+1]}:{action:"remove",start:data[i],end:data[i+1]};doc.applyDelta(d,true);}}}setTimeout(timeout){this.$timeout=timeout;}setValue(value){this.doc.setValue(value);this.deferredUpdate.schedule(this.$timeout);}getValue(callbackId){this.sender.callback(this.doc.getValue(),callbackId);}onUpdate(){// abstract method
}isPending(){return this.deferredUpdate.isPending();}}

/***/ }),

/***/ "./src/ace/Range.js":
/*!**************************!*\
  !*** ./src/ace/Range.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Range; });
function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2010, Ajax.org B.V.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */ /**
 * This object is used in various places to indicate a region within the editor. To better visualize how this works, imagine a rectangle. Each quadrant of the rectangle is analogous to a range, as ranges contain a starting row and starting column, and an ending row, and ending column.
 * @class Range
 **/class Range{/**
     * Creates a new `Range` object with the given starting and ending row and column points.
     * @param {Number} startRow The starting row
     * @param {Number} startColumn The starting column
     * @param {Number} endRow The ending row
     * @param {Number} endColumn The ending column
     *
     * @constructor
     **/constructor(startRow,startColumn,endRow,endColumn){_defineProperty(this,"moveBy",function(row,column){this.start.row+=row;this.start.column+=column;this.end.row+=row;this.end.column+=column;});this.start={row:startRow,column:startColumn};this.end={row:endRow,column:endColumn};}/**
     * Returns `true` if and only if the starting row and column, and ending row and column, are equivalent to those given by `range`.
     * @param {Range} range A range to check against
     *
     * @return {Boolean}
     **/isEqual(range){return this.start.row===range.start.row&&this.end.row===range.end.row&&this.start.column===range.start.column&&this.end.column===range.end.column;}/**
     *
     * Returns a string containing the range's row and column information, given like this:
     * ```
     *    [start.row/start.column] -> [end.row/end.column]
     * ```
     * @return {String}
     **/toString(){return"Range: ["+this.start.row+"/"+this.start.column+"] -> ["+this.end.row+"/"+this.end.column+"]";}/**
     *
     * Returns `true` if the `row` and `column` provided are within the given range. This can better be expressed as returning `true` if:
     * ```javascript
     *    this.start.row <= row <= this.end.row &&
     *    this.start.column <= column <= this.end.column
     * ```
     * @param {Number} row A row to check for
     * @param {Number} column A column to check for
     * @returns {Boolean}
     * @related Range.compare
     **/contains(row,column){return this.compare(row,column)===0;}/**
     * Compares `this` range (A) with another range (B).
     * @param {Range} range A range to compare with
     *
     * @related Range.compare
     * @returns {Number} This method returns one of the following numbers:<br/>
     * <br/>
     * * `-2`: (B) is in front of (A), and doesn't intersect with (A)<br/>
     * * `-1`: (B) begins before (A) but ends inside of (A)<br/>
     * * `0`: (B) is completely inside of (A) OR (A) is completely inside of (B)<br/>
     * * `+1`: (B) begins inside of (A) but ends outside of (A)<br/>
     * * `+2`: (B) is after (A) and doesn't intersect with (A)<br/>
     * * `42`: FTW state: (B) ends in (A) but starts outside of (A)
     **/compareRange(range){var cmp,end=range.end,start=range.start;cmp=this.compare(end.row,end.column);if(cmp===1){cmp=this.compare(start.row,start.column);if(cmp===1){return 2;}else if(cmp===0){return 1;}else{return 0;}}else if(cmp===-1){return-2;}else{cmp=this.compare(start.row,start.column);if(cmp===-1){return-1;}else if(cmp===1){return 42;}else{return 0;}}}/**
     * Checks the row and column points of `p` with the row and column points of the calling range.
     *
     * @param {Range} p A point to compare with
     *
     * @related Range.compare
     * @returns {Number} This method returns one of the following numbers:<br/>
     * * `0` if the two points are exactly equal<br/>
     * * `-1` if `p.row` is less then the calling range<br/>
     * * `1` if `p.row` is greater than the calling range<br/>
     * <br/>
     * If the starting row of the calling range is equal to `p.row`, and:<br/>
     * * `p.column` is greater than or equal to the calling range's starting column, this returns `0`<br/>
     * * Otherwise, it returns -1<br/>
     *<br/>
     * If the ending row of the calling range is equal to `p.row`, and:<br/>
     * * `p.column` is less than or equal to the calling range's ending column, this returns `0`<br/>
     * * Otherwise, it returns 1<br/>
     **/comparePoint(p){return this.compare(p.row,p.column);}/**
     * Checks the start and end points of `range` and compares them to the calling range. Returns `true` if the `range` is contained within the caller's range.
     * @param {Range} range A range to compare with
     *
     * @returns {Boolean}
     * @related Range.comparePoint
     **/containsRange(range){return this.comparePoint(range.start)===0&&this.comparePoint(range.end)===0;}/**
     * Returns `true` if passed in `range` intersects with the one calling this method.
     * @param {Range} range A range to compare with
     *
     * @returns {Boolean}
     **/intersects(range){var cmp=this.compareRange(range);return cmp===-1||cmp===0||cmp===1;}/**
     * Returns `true` if the caller's ending row point is the same as `row`, and if the caller's ending column is the same as `column`.
     * @param {Number} row A row point to compare with
     * @param {Number} column A column point to compare with
     *
     * @returns {Boolean}
     **/isEnd(row,column){return this.end.row===row&&this.end.column===column;}/**
     * Returns `true` if the caller's starting row point is the same as `row`, and if the caller's starting column is the same as `column`.
     * @param {Number} row A row point to compare with
     * @param {Number} column A column point to compare with
     *
     * @returns {Boolean}
     **/isStart(row,column){return this.start.row===row&&this.start.column===column;}/**
     * Sets the starting row and column for the range.
     * @param {Number} row A row point to set
     * @param {Number} column A column point to set
     *
     **/setStart(row,column){if(typeof row==="object"){this.start.column=row.column;this.start.row=row.row;}else{this.start.row=row;this.start.column=column;}}/**
     * Sets the starting row and column for the range.
     * @param {Number} row A row point to set
     * @param {Number} column A column point to set
     *
     **/setEnd(row,column){if(typeof row==="object"){this.end.column=row.column;this.end.row=row.row;}else{this.end.row=row;this.end.column=column;}}/**
     * Returns `true` if the `row` and `column` are within the given range.
     * @param {Number} row A row point to compare with
     * @param {Number} column A column point to compare with
     *
     *
     * @returns {Boolean}
     * @related Range.compare
     **/inside(row,column){if(this.compare(row,column)===0){if(this.isEnd(row,column)||this.isStart(row,column)){return false;}else{return true;}}return false;}/**
     * Returns `true` if the `row` and `column` are within the given range's starting points.
     * @param {Number} row A row point to compare with
     * @param {Number} column A column point to compare with
     *
     * @returns {Boolean}
     * @related Range.compare
     **/insideStart(row,column){if(this.compare(row,column)===0){if(this.isEnd(row,column)){return false;}else{return true;}}return false;}/**
     * Returns `true` if the `row` and `column` are within the given range's ending points.
     * @param {Number} row A row point to compare with
     * @param {Number} column A column point to compare with
     *
     * @returns {Boolean}
     * @related Range.compare
     *
     **/insideEnd(row,column){if(this.compare(row,column)===0){if(this.isStart(row,column)){return false;}else{return true;}}return false;}/**
     * Checks the row and column points with the row and column points of the calling range.
     * @param {Number} row A row point to compare with
     * @param {Number} column A column point to compare with
     *
     *
     * @returns {Number} This method returns one of the following numbers:<br/>
     * `0` if the two points are exactly equal <br/>
     * `-1` if `p.row` is less then the calling range <br/>
     * `1` if `p.row` is greater than the calling range <br/>
     *  <br/>
     * If the starting row of the calling range is equal to `p.row`, and: <br/>
     * `p.column` is greater than or equal to the calling range's starting column, this returns `0`<br/>
     * Otherwise, it returns -1<br/>
     * <br/>
     * If the ending row of the calling range is equal to `p.row`, and: <br/>
     * `p.column` is less than or equal to the calling range's ending column, this returns `0` <br/>
     * Otherwise, it returns 1
     **/compare(row,column){if(!this.isMultiLine()){if(row===this.start.row){return column<this.start.column?-1:column>this.end.column?1:0;}}if(row<this.start.row)return-1;if(row>this.end.row)return 1;if(this.start.row===row)return column>=this.start.column?0:-1;if(this.end.row===row)return column<=this.end.column?0:1;return 0;}/**
     * Checks the row and column points with the row and column points of the calling range.
     * @param {Number} row A row point to compare with
     * @param {Number} column A column point to compare with
     *
     * @returns {Number} This method returns one of the following numbers:<br/>
     * <br/>
     * `0` if the two points are exactly equal<br/>
     * `-1` if `p.row` is less then the calling range<br/>
     * `1` if `p.row` is greater than the calling range, or if `isStart` is `true`.<br/>
     * <br/>
     * If the starting row of the calling range is equal to `p.row`, and:<br/>
     * `p.column` is greater than or equal to the calling range's starting column, this returns `0`<br/>
     * Otherwise, it returns -1<br/>
     * <br/>
     * If the ending row of the calling range is equal to `p.row`, and:<br/>
     * `p.column` is less than or equal to the calling range's ending column, this returns `0`<br/>
     * Otherwise, it returns 1
     *
     **/compareStart(row,column){if(this.start.row===row&&this.start.column===column){return-1;}else{return this.compare(row,column);}}/**
     * Checks the row and column points with the row and column points of the calling range.
     * @param {Number} row A row point to compare with
     * @param {Number} column A column point to compare with
     *
     *
     * @returns {Number} This method returns one of the following numbers:<br/>
     * `0` if the two points are exactly equal<br/>
     * `-1` if `p.row` is less then the calling range<br/>
     * `1` if `p.row` is greater than the calling range, or if `isEnd` is `true.<br/>
     * <br/>
     * If the starting row of the calling range is equal to `p.row`, and:<br/>
     * `p.column` is greater than or equal to the calling range's starting column, this returns `0`<br/>
     * Otherwise, it returns -1<br/>
     *<br/>
     * If the ending row of the calling range is equal to `p.row`, and:<br/>
     * `p.column` is less than or equal to the calling range's ending column, this returns `0`<br/>
     * Otherwise, it returns 1
     */compareEnd(row,column){if(this.end.row===row&&this.end.column===column){return 1;}else{return this.compare(row,column);}}/**
     * Checks the row and column points with the row and column points of the calling range.
     * @param {Number} row A row point to compare with
     * @param {Number} column A column point to compare with
     *
     *
     * @returns {Number} This method returns one of the following numbers:<br/>
     * * `1` if the ending row of the calling range is equal to `row`, and the ending column of the calling range is equal to `column`<br/>
     * * `-1` if the starting row of the calling range is equal to `row`, and the starting column of the calling range is equal to `column`<br/>
     * <br/>
     * Otherwise, it returns the value after calling [[Range.compare `compare()`]].
     *
     **/compareInside(row,column){if(this.end.row===row&&this.end.column===column){return 1;}else if(this.start.row===row&&this.start.column===column){return-1;}else{return this.compare(row,column);}}/**
     * Returns the part of the current `Range` that occurs within the boundaries of `firstRow` and `lastRow` as a new `Range` object.
     * @param {Number} firstRow The starting row
     * @param {Number} lastRow The ending row
     *
     *
     * @returns {Range}
     **/clipRows(firstRow,lastRow){var start,end;if(this.end.row>lastRow)end={row:lastRow+1,column:0};else if(this.end.row<firstRow)end={row:firstRow,column:0};if(this.start.row>lastRow)start={row:lastRow+1,column:0};else if(this.start.row<firstRow)start={row:firstRow,column:0};return Range.fromPoints(start||this.start,end||this.end);}/**
     * Changes the row and column points for the calling range for both the starting and ending points.
     * @param {Number} row A new row to extend to
     * @param {Number} column A new column to extend to
     *
     *
     * @returns {Range} The original range with the new row
     **/extend(row,column){var cmp=this.compare(row,column);if(cmp===0)return this;else if(cmp===-1)var start={row:row,column:column};else var end={row:row,column:column};return Range.fromPoints(start||this.start,end||this.end);}isEmpty(){return this.start.row===this.end.row&&this.start.column===this.end.column;}/**
     *
     * Returns `true` if the range spans across multiple lines.
     * @returns {Boolean}
     **/isMultiLine(){return this.start.row!==this.end.row;}/**
     *
     * Returns a duplicate of the calling range.
     * @returns {Range}
     **/clone(){return Range.fromPoints(this.start,this.end);}/**
     *
     * Returns a range containing the starting and ending rows of the original range, but with a column value of `0`.
     * @returns {Range}
     **/collapseRows(){if(this.end.column===0)return new Range(this.start.row,0,Math.max(this.start.row,this.end.row-1),0);else return new Range(this.start.row,0,this.end.row,0);}/**
     * Given the current `Range`, this function converts those starting and ending points into screen positions, and then returns a new `Range` object.
     * @param {EditSession} session The `EditSession` to retrieve coordinates from
     *
     *
     * @returns {Range}
     **/toScreenRange(session){var screenPosStart=session.documentToScreenPosition(this.start);var screenPosEnd=session.documentToScreenPosition(this.end);return new Range(screenPosStart.row,screenPosStart.column,screenPosEnd.row,screenPosEnd.column);}/* experimental */ /**
     * Creates and returns a new `Range` based on the row and column of the given parameters.
     * @param {Range} start A starting point to use
     * @param {Range} end An ending point to use
     *
     * @returns {Range}
     **/static fromPoints(start,end){return new Range(start.row,start.column,end.row,end.column);}static comparePoints(p1,p2){return p1.row-p2.row||p1.column-p2.column;}}

/***/ }),

/***/ "./src/ace/Sender.js":
/*!***************************!*\
  !*** ./src/ace/Sender.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Sender; });
/* harmony import */ var _EventEmitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventEmitter */ "./src/ace/EventEmitter.js");
class Sender extends _EventEmitter__WEBPACK_IMPORTED_MODULE_0__["default"]{callback(data,callbackId){postMessage({type:"call",id:callbackId,data:data});}emit(name,data){postMessage({type:"event",name:name,data:data});}}

/***/ }),

/***/ "./src/ace/lang.js":
/*!*************************!*\
  !*** ./src/ace/lang.js ***!
  \*************************/
/*! exports provided: last, stringReverse, stringRepeat, stringTrimLeft, stringTrimRight, copyObject, copyArray, deepCopy, arrayToMap, createMap, arrayRemove, escapeRegExp, escapeHTML, getMatchOffsets, deferredCall, delayedCall */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "last", function() { return last; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringReverse", function() { return stringReverse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringRepeat", function() { return stringRepeat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringTrimLeft", function() { return stringTrimLeft; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringTrimRight", function() { return stringTrimRight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copyObject", function() { return copyObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copyArray", function() { return copyArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deepCopy", function() { return deepCopy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arrayToMap", function() { return arrayToMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMap", function() { return createMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arrayRemove", function() { return arrayRemove; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "escapeRegExp", function() { return escapeRegExp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "escapeHTML", function() { return escapeHTML; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMatchOffsets", function() { return getMatchOffsets; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deferredCall", function() { return deferredCall; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "delayedCall", function() { return delayedCall; });
/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2010, Ajax.org B.V.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */function last(a){return a[a.length-1];}function stringReverse(string){return string.split("").reverse().join("");}function stringRepeat(string,count){var result='';while(count>0){if(count&1)result+=string;if((count>>=1)!==0)string+=string;}return result;}var trimBeginRegexp=/^\s\s*/;var trimEndRegexp=/\s\s*$/;function stringTrimLeft(string){return string.replace(trimBeginRegexp,'');}function stringTrimRight(string){return string.replace(trimEndRegexp,'');}function copyObject(obj){var copy={};for(var key in obj){copy[key]=obj[key];}return copy;}function copyArray(array){var copy=[];for(var i=0,l=array.length;i<l;i++){if(array[i]&&typeof array[i]=="object")copy[i]=this.copyObject(array[i]);else copy[i]=array[i];}return copy;}function deepCopy(obj){if(typeof obj!=="object"||!obj)return obj;var copy;if(Array.isArray(obj)){copy=[];for(var key=0;key<obj.length;key++){copy[key]=deepCopy(obj[key]);}return copy;}if(Object.prototype.toString.call(obj)!=="[object Object]")return obj;copy={};for(key in obj){copy[key]=deepCopy(obj[key]);}return copy;}function arrayToMap(arr){var map={};for(var i=0;i<arr.length;i++){map[arr[i]]=1;}return map;}function createMap(props){var map=Object.create(null);for(var i in props){map[i]=props[i];}return map;}/*
 * splice out of 'array' anything that === 'value'
 */function arrayRemove(array,value){for(var i=0;i<=array.length;i++){if(value===array[i]){array.splice(i,1);}}}function escapeRegExp(str){// eslint-disable-next-line
return str.replace(/([.*+?^${}()|[\]\/\\])/g,'\\$1');}function escapeHTML(str){return(""+str).replace(/&/g,"&#38;").replace(/"/g,"&#34;").replace(/'/g,"&#39;").replace(/</g,"&#60;");}function getMatchOffsets(string,regExp){var matches=[];string.replace(regExp,function(str){matches.push({offset:arguments[arguments.length-2],length:str.length});});return matches;}/* deprecated */function deferredCall(fcn){var timer=null;var callback=function callback(){timer=null;fcn();};var deferred=function deferred(timeout){deferred.cancel();timer=setTimeout(callback,timeout||0);return deferred;};deferred.schedule=deferred;deferred.call=function(){this.cancel();fcn();return deferred;};deferred.cancel=function(){clearTimeout(timer);timer=null;return deferred;};deferred.isPending=function(){return timer;};return deferred;}function delayedCall(fcn,defaultTimeout){var timer=null;var callback=function callback(){timer=null;fcn();};var _self=function _self(timeout){if(timer==null)timer=setTimeout(callback,timeout||defaultTimeout);};_self.delay=function(timeout){timer&&clearTimeout(timer);timer=setTimeout(callback,timeout||defaultTimeout);};_self.schedule=_self;_self.call=function(){this.cancel();fcn();};_self.cancel=function(){timer&&clearTimeout(timer);timer=null;};_self.isPending=function(){return timer;};return _self;}

/***/ }),

/***/ "./src/code/Catalog.js":
/*!*****************************!*\
  !*** ./src/code/Catalog.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Catalog; });
/* harmony import */ var _CodeUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CodeUtils */ "./src/code/CodeUtils.js");
var prompto=null;/* need a deferred function for testing with Jest */function linkPrompto(){// eslint-disable-next-line
var globals=global||window||self||this;prompto=globals.prompto;}/* an object which represents a catalog of declarations, classified by type */class Catalog{constructor(decls,globalContext,filterContext){linkPrompto();this.readCatalog(globalContext,decls);if(filterContext)this.filterOutDeclarations(filterContext);}length(){return Object(_CodeUtils__WEBPACK_IMPORTED_MODULE_0__["getCodebaseLength"])(this);}readCatalog(globalContext,decls){var content=this.loadCatalog(globalContext,decls);this.attributes=content.attributes;this.categories=content.categories;this.enumerations=content.enumerations;this.methods=content.methods;this.tests=content.tests;this.widgets=content.widgets;}loadCatalog(globalContext,decls){if(prompto&&decls){var context=prompto.runtime.Context.newGlobalsContext();// need a fresh context to ensure all get registered
context.problemListener=new prompto.problem.ProblemCollector();// we'll ignore these errors but let's catch them
decls.register(context);context.globals=globalContext;var catalog=context.getLocalCatalog();return Object(_CodeUtils__WEBPACK_IMPORTED_MODULE_0__["convertDocumentToObject"])(catalog);}else return{};}filterOutDeclarations(filterContext){this.filterOutObjects("attributes",filterContext);this.filterOutMethods(filterContext);this.filterOutObjects("categories",filterContext);this.filterOutObjects("enumerations",filterContext);this.filterOutObjects("tests",filterContext);this.filterOutObjects("widgets",filterContext);}filterOutObjects(type,filterContext){if(this[type])this[type]=this[type].filter(name=>filterContext.contextForDeclaration(name)===null);}filterOutMethods(filterContext){if(this.methods)this.methods=this.methods.filter(method=>this.filterOutMethod(method,filterContext));}filterOutMethod(method,filterContext){var context=filterContext.contextForDeclaration(method.name);if(context===null)return true;// if core has such method, need to check protos
if(method.protos.length===1)return false;var map=filterContext.getRegisteredDeclaration(method.name);method.protos=method.protos.filter(proto=>!map.hasPrototype(proto.proto));return method.protos.length>0;}}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/code/CodeUtils.js":
/*!*******************************!*\
  !*** ./src/code/CodeUtils.js ***!
  \*******************************/
/*! exports provided: inferDialect, newParser, parse, unparse, translate, sortBy, makeValidId, getCodebaseLength, getFirstCodebaseEntry, getContentFromEntry, convertDocumentToObject, convertObjectToDocument */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inferDialect", function() { return inferDialect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "newParser", function() { return newParser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parse", function() { return parse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unparse", function() { return unparse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "translate", function() { return translate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sortBy", function() { return sortBy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeValidId", function() { return makeValidId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCodebaseLength", function() { return getCodebaseLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFirstCodebaseEntry", function() { return getFirstCodebaseEntry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getContentFromEntry", function() { return getContentFromEntry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertDocumentToObject", function() { return convertDocumentToObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertObjectToDocument", function() { return convertObjectToDocument; });
// eslint-disable-next-line
var globals=global||self||undefined;/* a function for inferring dialect from file extension */var inferDialect=function inferDialect(path){return path.substring(path.length-2,path.length-1).toUpperCase();};/* a function for getting a new prompto code parser */var newParser=function newParser(input,dialect,listener){var prompto=globals.prompto;var klass=prompto.parser[dialect+"CleverParser"];var parser=new klass(input);parser.removeErrorListeners();if(listener)parser.addErrorListener(listener);return parser;};/* a function for parsing prompto code into declarations */var parse=function parse(input,dialect,listener){var parser=newParser(input,dialect,listener);var decls=parser.parse();decls.forEach(decl=>{decl.sourceCode={dialect:dialect,body:decl.fetchBody(parser)};});return decls;};/* a function for producing code from a declaration object */var unparse=function unparse(context,decl,dialect){var prompto=globals.prompto;var d=prompto.parser.Dialect[dialect];var writer=new prompto.utils.CodeWriter(d,context.newChildContext());// avoid throwing since this would stop the translation
writer.context.problemListener=new prompto.problem.ProblemCollector();if(decl.comments)decl.comments.forEach(cmt=>cmt.toDialect(writer));if(decl.annotations)decl.annotations.forEach(ann=>ann.toDialect(writer));decl.toDialect(writer);return writer.toString();};/* a function for translating current input to other dialect */var translate=function translate(context,data,from,to){var prompto=globals.prompto;var decls=parse(data,from);// could be cached
var dialect=prompto.parser.Dialect[to];var writer=new prompto.utils.CodeWriter(dialect,context.newChildContext());decls.toDialect(writer);return writer.toString();};/* a utility function to sort by field name */var sortBy=function sortBy(a,f){return a.sort(function(i1,i2){return i1[f]>i2[f]?1:i1[f]<i2[f]?-1:0;});};var makeValidId=function makeValidId(name){/*eslint no-useless-escape: "off"*/return name.replace(/[ /\.]/g,"_").replace(/[\"\'\(\),]/g,"");};/* use global functions so we can call it on serialized data */var getCodebaseLength=function getCodebaseLength(codebase){if(!codebase)return 0;var length=0;for(var name in codebase){if(Array.isArray(codebase[name]))length+=codebase[name].length;}return length;};var getFirstCodebaseEntry=function getFirstCodebaseEntry(codebase){if(!codebase)return null;for(var name in codebase){if(Array.isArray(codebase[name])&&codebase[name].length>0)return{key:name,value:codebase[name][0]};}return null;};var getContentFromEntry=function getContentFromEntry(entry){var subType=entry.key==="categories"?"category":entry.key.substring(0,entry.key.length-1);var content={type:"prompto",subType:subType,core:false};switch(subType){case"method":content.name=entry.value.name;content.proto=entry.value.protos[0].proto;break;case"enumeration":content.name=entry.value.name;break;default:content.name=entry.value;}return content;};function recursivelyConvertDocumentToObject(object){if(!object)return object;if(Array.isArray(object))return object.map(recursivelyConvertDocumentToObject);if(typeof object===typeof{}){var result={};if(object.type==="Document"&&object.value)object=object.value;Object.getOwnPropertyNames(object).forEach(name=>result[name]=recursivelyConvertDocumentToObject(object[name]),this);return result;}return object;}var convertDocumentToObject=recursivelyConvertDocumentToObject;function recursivelyConvertObjectToDocument(object){if(!object)return object;if(Array.isArray(object))return object.map(recursivelyConvertObjectToDocument);if(typeof object===typeof{}){var result={};Object.getOwnPropertyNames(object).forEach(name=>result[name]=recursivelyConvertObjectToDocument(object[name]),this);return{type:"Document",value:result};}return object;}var convertObjectToDocument=recursivelyConvertObjectToDocument;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/code/Defaults.js":
/*!******************************!*\
  !*** ./src/code/Defaults.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({dialect:"O"});

/***/ }),

/***/ "./src/code/Delta.js":
/*!***************************!*\
  !*** ./src/code/Delta.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Delta; });
/* harmony import */ var _CodeUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CodeUtils */ "./src/code/CodeUtils.js");
/* harmony import */ var _Catalog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Catalog */ "./src/code/Catalog.js");
function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly)symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable;});keys.push.apply(keys,symbols);}return keys;}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(Object(source),true).forEach(function(key){_defineProperty(target,key,source[key]);});}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source));}else{ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key));});}}return target;}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}/**
 * An object which represents the delta between 2 catalogs
 * The purpose of this class is to minimize the re-processing in the IDE
 * when code is updated. Typically, various scenarios can occur:
 *  - code body change, this has not impact on the catalog
 *  - declaration removed
 *  - declaration added
 *  - declarations changed, which for global methods adds complexity because
 *  methods are displayed differently depending on their number of prototypes
 *  This follows the assumption that the number of overloads for a method name is generally very low (< 10).
 */class Delta{constructor(){this.removed=null;this.added=null;}length(){var length=0;if(this.removed)length+=this.removed.length();if(this.added)length+=this.added.length();return length;}getContent(){return{removed:this.removed,added:this.added};}getFirstAdded(){if(!this.added)return null;for(var key in this.added){var list=this.added[key];if(list&&list.length>0){var entry=list[0];if(key==="methods"){return _objectSpread(_objectSpread({},{name:entry.name}),entry.protos[0]);}else return entry;}}return null;}filterOutDuplicates(){if(!this.removed&&!this.added)return 0;if(!this.removed)return this.added.length();if(!this.added)return this.removed.length();var length=this.filterOutDuplicatesInField("attributes");length+=this.filterOutDuplicatesInField("methods");length+=this.filterOutDuplicatesInField("categories");length+=this.filterOutDuplicatesInField("enumerations");length+=this.filterOutDuplicatesInField("tests");length+=this.filterOutDuplicatesInField("widgets");return length;}filterOutDuplicatesInField(field){var fn=this.filterOutDuplicatesInLists;if(field==="methods")fn=this.filterOutDuplicatesInMethods;else if(field==="enumerations")fn=(a,b)=>this.filterOutDuplicatesInLists(a,b,"name");var length=fn.bind(this)(this.removed[field],this.added[field]);// clean up empty lists
if(this.removed[field]&&!this.removed[field].length)delete this.removed[field];if(this.added[field]&&!this.added[field].length)delete this.added[field];return length;}filterOutDuplicatesInLists(a,b,field){if(a&&b){if(field){Object(_CodeUtils__WEBPACK_IMPORTED_MODULE_0__["sortBy"])(a,field);Object(_CodeUtils__WEBPACK_IMPORTED_MODULE_0__["sortBy"])(b,field);}else{a.sort();b.sort();}for(var i=0,j=0;i<a.length&&j<b.length;){var va=a[i];if(field)va=va[field];var vb=b[j];if(field)vb=vb[field];if(va===vb){a.splice(i,1);b.splice(j,1);}else if(va>vb){j++;}else{i++;}}return a.length+b.length;}else if(a)return a.length;else if(b)return b.length;else return 0;}filterOutDuplicatesInMethods(a,b){if(a&&b){Object(_CodeUtils__WEBPACK_IMPORTED_MODULE_0__["sortBy"])(a,"name");Object(_CodeUtils__WEBPACK_IMPORTED_MODULE_0__["sortBy"])(b,"name");for(var i=0,j=0;i<a.length&&j<b.length;){if(a[i].name===b[j].name){this.filterOutDuplicatesInLists(a[i].protos,b[j].protos,"proto");if(!a[i].protos||!a[i].protos.length)a.splice(i,1);i++;if(!b[j].protos||!b[j].protos.length)b.splice(j,1);j++;}else if(a[i].name>b[j].name){j++;}else{i++;}}return a.length+b.length;}else if(a)return a.length;else if(b)return b.length;else return 0;}adjustForMovingProtos(context){// methods with 1 proto are displayed differently than methods with multiple protos
// if proto cardinality changes from N to 1 or 1 to N, we need to rebuild the corresponding displays
if(this.removed&&this.removed.methods){this.removed.methods.forEach(method=>{var decl=context.getRegisteredDeclaration(method.name);if(decl&&Object.keys(decl.protos).length===1&&!this.isModifiedProto(method))// moved from N to 1
this.adjustMethodForRemovedProtos(method,decl);},this);}if(this.added&&this.added.methods){this.added.methods.forEach(method=>{var decl=context.getRegisteredDeclaration(method.name);if(decl&&Object.keys(decl.protos).length-method.protos.length===1)// moved from 1 to N
this.adjustMethodForAddedProtos(method,decl);},this);}// cleanup
if(this.removed&&this.removed.methods){this.removed.methods.forEach(method=>{if(method.proto_to_remove){method.protos.push(method.proto_to_remove);Object(_CodeUtils__WEBPACK_IMPORTED_MODULE_0__["sortBy"])(method.protos,"proto");delete method.proto_to_remove;}});}if(this.added&&this.added.methods){this.added.methods.forEach(method=>{if(method.proto_to_add){method.protos.push(method.proto_to_add);Object(_CodeUtils__WEBPACK_IMPORTED_MODULE_0__["sortBy"])(method.protos,"proto");delete method.proto_to_add;}});}}isModifiedProto(method){if(!this.added||!this.added.methods)return false;var added=this.added.methods.filter(m=>m.name===method.name);if(added.length===0)return false;return true;}adjustMethodForAddedProtos(method,decl){var proto=this.findPreExistingProto(method,decl);if(proto){var proto_to_move={proto:proto,main:decl.protos[proto].isEligibleAsMain()};// add it to the remove list
if(!this.removed)this.removed=new _Catalog__WEBPACK_IMPORTED_MODULE_1__["default"]();var removed=this.findOrCreateMethod(this.removed,method.name);removed.proto_to_remove=proto_to_move;// add it to the add list
method.proto_to_add=proto_to_move;}}findPreExistingProto(method,decl){for(var proto in decl.protos){if(decl.protos.hasOwnProperty(proto)){var found=false;for(var i=0;!found&&i<method.protos.length;i++){found=proto===method.protos[i].proto;}if(!found)return proto;}}return null;// TODO throw error?
}adjustMethodForRemovedProtos(method,decl){// the below will only loop once
for(var proto in decl.protos){if(decl.protos.hasOwnProperty(proto)){this.adjustMethodForRemovedProto(method,decl,proto);}}}adjustMethodForRemovedProto(method,decl,proto){var proto_to_move={proto:proto,main:decl.protos[proto].isEligibleAsMain()};// add it to the remove list
method.proto_to_remove=proto_to_move;// add it to the added list
if(!this.added)this.added=new _Catalog__WEBPACK_IMPORTED_MODULE_1__["default"]();var added=this.findOrCreateMethod(this.added,decl.name);// avoid adding it twice (it might have just been added)
added.protos.forEach(current=>{if(proto_to_move&&proto_to_move.proto===current.proto)proto_to_move=null;// don't add it
});// not an existing proto ?
if(proto_to_move)added.proto_to_add=proto_to_move;}findOrCreateMethod(catalog,name){if(!catalog.methods)catalog.methods=[];for(var i=0;i<catalog.methods.length;i++){if(catalog.methods[i].name===name)return catalog.methods[i];}var created={name:name,protos:[]};catalog.methods.push(created);return created;}}

/***/ }),

/***/ "./src/code/Repository.js":
/*!********************************!*\
  !*** ./src/code/Repository.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Repository; });
/* harmony import */ var _CodeUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CodeUtils */ "./src/code/CodeUtils.js");
/* harmony import */ var _Catalog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Catalog */ "./src/code/Catalog.js");
/* harmony import */ var _Delta__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Delta */ "./src/code/Delta.js");
var prompto=null;var profiling=false;/* need a deferred function for testing with Jest */function linkPrompto(){// eslint-disable-next-line
var globals=global||window||self||this;prompto=globals.prompto;}/* a class to maintain an up-to-date copy of the repository */ /* which can be used to detect required changes in the UI, and deltas to commit */class Repository{constructor(){linkPrompto();this.librariesContext=prompto.runtime.Context.newGlobalsContext();this.projectContext=prompto.runtime.Context.newGlobalsContext();this.projectContext.setParentContext(this.librariesContext);this.moduleId=null;this.lastSuccess=new prompto.declaration.DeclarationList();// last piece of code successfully registered through handleUpdate
this.statuses={};}reset(){this.lastSuccess=new prompto.declaration.DeclarationList();}registerLibraryCode(code,dialect){var decls=Object(_CodeUtils__WEBPACK_IMPORTED_MODULE_0__["parse"])(code,dialect);decls.register(this.librariesContext);}registerLibraryDeclarations(declarations){declarations.forEach(obj=>{var decls=Object(_CodeUtils__WEBPACK_IMPORTED_MODULE_0__["parse"])(obj.value.body,obj.value.dialect);decls.register(this.librariesContext);},this);}clearLibrariesContext(){this.librariesContext=prompto.runtime.Context.newGlobalsContext();this.projectContext.setParentContext(this.librariesContext);}publishLibraries(){return{type:"Document",value:{removed:{type:"Document",value:{}},added:this.librariesContext.getCatalog(),library:true}};}publishProject(){return{type:"Document",value:{removed:{type:"Document",value:{}},added:this.projectContext.getLocalCatalog(),project:true}};}unpublishProject(){var delta={type:"Document",value:{removed:this.projectContext.getLocalCatalog(),added:{type:"Document",value:{}}}};this.projectContext=prompto.runtime.Context.newGlobalsContext();this.projectContext.setParentContext(this.librariesContext);this.statuses={};return delta;}registerProjectDeclarations(moduleId,declarations,progress){var totalCount=declarations.length;var actualCount=0;this.moduleId=moduleId;declarations.forEach(obj=>{var decl=Object(_CodeUtils__WEBPACK_IMPORTED_MODULE_0__["parse"])(obj.value.body,obj.value.dialect);decl.register(this.projectContext);if(progress)progress("Parsing project code "+ ++actualCount+"/"+totalCount);// prepare for commit
var module=obj.value.module;if(module){// avoid sending back large objects
delete obj.value.module.value.dependencies;delete obj.value.module.value.image;}this.registerClean(obj);},this);}getDeclarationBody(content,dialect){var decl=this.getDeclaration(content);if(decl.sourceCode&&decl.sourceCode.dialect===dialect)return decl.sourceCode.body;else return Object(_CodeUtils__WEBPACK_IMPORTED_MODULE_0__["unparse"])(this.projectContext,decl,dialect);}getDeclaration(content){if(content.type==="TestRef")return this.projectContext.getRegisteredTest(content.name);else if(content.type==="MethodRef"){var methodsMap=this.projectContext.getRegisteredDeclaration(content.name);return methodsMap.protos[content.prototype||""]||methodsMap.getFirst();}else return this.projectContext.getRegisteredDeclaration(content.name);}/* dbDecl = object received from the server */idFromDbDecl(dbDecl){if(dbDecl.type==="MethodDeclaration")return dbDecl.value.name+"/"+(dbDecl.value.prototype||"");else return dbDecl.value.name;}/* id = object received from the UI */idFromContent(content){if(content.type==="MethodRef")return content.name+"/"+(content.prototype||"");else return content.name;}/* decl = object received from the parser */idFromDecl(decl){return decl.name+(decl.getProto!==undefined?"/"+(decl.getProto()||""):"");}registerClean(obj){var id=this.idFromDbDecl(obj);this.statuses[id]={stuff:obj,editStatus:"CLEAN"};}registerDestroyed(id){var obj_status=this.statuses[id];if(obj_status)obj_status.editStatus="DELETED";}registerDirty(decls,parser,dialect){decls.forEach(decl=>{var decl_obj;var id=this.idFromDecl(decl);var existing=this.statuses[id];if(existing){decl_obj=existing.stuff.value;var body=decl.fetchBody(parser);if(decl_obj.dialect!==dialect||decl_obj.body!==body){decl_obj.dialect=dialect;decl_obj.body=body;if(existing.editStatus!=="CREATED")// don't overwrite
existing.editStatus="DIRTY";if(decl.getProto!==undefined)decl_obj.prototype=decl.getProto();if(decl.storable!==undefined)decl_obj.storable=decl.storable;if(decl.symbols)decl_obj.symbols=decl.symbols.map(function(s){return s.name;});if(decl.derivedFrom)decl_obj.derivedFrom=decl.derivedFrom.map(function(s){return s.name;});else if(decl_obj.derivedFrom)decl_obj.derivedFrom=[];if(decl.annotations)decl_obj.annotations=decl.annotations.map(function(a){return a.name;});else if(decl_obj.annotations)decl_obj.annotations=[];}}else{decl_obj={name:decl.name,version:{type:"Version",value:"0.0.1"},dialect:dialect,body:decl.fetchBody(parser),module:{type:"Module",value:{dbId:this.moduleId}}};if(decl.getProto!==undefined)decl_obj.prototype=decl.getProto();if(decl.storable!==undefined)decl_obj.storable=decl.storable;if(decl.symbols)decl_obj.symbols=decl.symbols.map(function(s){return s.name;});if(decl.derivedFrom)decl_obj.derivedFrom=decl.derivedFrom.map(function(s){return s.name;});if(decl.annotations)decl_obj.annotations=decl.annotations.map(function(a){return a.name;});this.statuses[id]={editStatus:"CREATED",stuff:{type:decl.getDeclarationType()+"Declaration",value:decl_obj}};}},this);}markChangesCommitted(storedDecls){storedDecls.forEach(storedDecl=>{var id=this.idFromDbDecl(storedDecl);this.statuses[id].stuff.value.dbId=storedDecl.value.dbId;this.statuses[id].editStatus="CLEAN";},this);}clearDeleted(){var deleted=[];for(var id in this.statuses){if(this.statuses.hasOwnProperty(id)&&this.statuses[id].editStatus==="DELETED")deleted.push(id);}deleted.forEach(id=>{delete this.statuses[id];},this);}getEditedDeclarations(contents){return contents.map(content=>{var id=this.idFromContent(content);var status=this.statuses[id];return{type:"EditedStuff",value:status};},this);}translate(data,from,to){return Object(_CodeUtils__WEBPACK_IMPORTED_MODULE_0__["translate"])(this.projectContext,data,from,to);}handleDestroyed(content){var id=this.idFromContent(content);this.registerDestroyed(id);var obj_status=this.statuses[id];if(obj_status&&obj_status.editStatus==="DELETED"){var decls=Object(_CodeUtils__WEBPACK_IMPORTED_MODULE_0__["parse"])(obj_status.stuff.value.body,obj_status.stuff.value.dialect);decls[0].unregister(this.projectContext);var delta=new _Delta__WEBPACK_IMPORTED_MODULE_2__["default"]();delta.removed=new _Catalog__WEBPACK_IMPORTED_MODULE_1__["default"](decls,this.librariesContext);delta.filterOutDuplicates();return delta;}else return null;}handleSetContent(content,dialect,listener){try{return this.doHandleSetContent(content,dialect,listener);}catch(e){return this.handleUnhandled(e,listener);}}doHandleSetContent(content,dialect,listener){var decls=Object(_CodeUtils__WEBPACK_IMPORTED_MODULE_0__["parse"])(content,dialect,listener);var saved_listener=this.projectContext.problemListener;try{this.projectContext.problemListener=listener;decls.check(this.projectContext.newChildContext());// don't pollute projectContext
}finally{this.projectContext.problemListener=saved_listener;}this.lastSuccess=decls;// assume registered content is always parsed successfully
}handleEditContent(content,dialect,listener,selected){try{return this.doHandleEditContent(content,dialect,listener,selected);}catch(e){return this.handleUnhandled(e,listener);}}handleUnhandled(e,listener){if(!listener.problems.length){var problem={startLine:1,startColumn:0,endLine:1000,endColumn:1000,type:"error",message:"Invalid syntax!"};listener.collectProblem(problem);}return null;}doHandleEditContent(content,dialect,listener,selected){var startTime=profiling?Date.now():null;var old_decls=this.lastSuccess;var parser=Object(_CodeUtils__WEBPACK_IMPORTED_MODULE_0__["newParser"])(content,dialect,listener);var new_decls=parser.parse();new_decls.forEach(decl=>{decl.sourceCode={dialect:dialect,body:decl.fetchBody(parser)};});var parseEndTime=profiling?Date.now():null;if(profiling)self.logDebug("parse time: "+(parseEndTime-startTime)+" ms");// look for duplicates
this.checkDuplicates(old_decls,new_decls,listener);var duplicatesEndTime=profiling?Date.now():null;if(profiling)self.logDebug("check duplicates time: "+(duplicatesEndTime-parseEndTime)+" ms");// only update codebase if syntax is correct and there is no foreseeable damage
if(listener.problems.length===0){this.lastSuccess=new_decls;var delta=this.updateCodebase(old_decls,new_decls,parser,dialect,listener);var updateEndTime=profiling?Date.now():null;if(profiling)self.logDebug("repo update time: "+(updateEndTime-duplicatesEndTime)+" ms");if(delta){var $delta=delta.getContent();if(selected&&new_decls.length===1)// object might have been renamed
$delta.selected=new_decls[0].name;$delta.editedCount=new_decls.length;if(old_decls.length<=1&&new_decls.length===1)$delta.newContent=delta.getFirstAdded();return $delta;}else return null;}else return null;}checkDuplicates(old_decls,new_decls,listener){return new_decls.some(decl=>{if(this.isDuplicate(decl,old_decls)){listener.reportDuplicate(decl.name,decl);return true;}else return false;},this);}isDuplicate(decl,old_decls){// if updating an existing declaration, not a duplicate
// TODO refine for method protos
if(old_decls.some(old=>old.name===decl.name))return false;var existing=this.projectContext.getRegisteredDeclaration(decl.name);if(existing instanceof prompto.runtime.MethodDeclarationMap){if(decl instanceof prompto.declaration.BaseMethodDeclaration)return existing.hasProto(decl.getProto());else return true;}return!!existing;}updateCodebase(old_decls,new_decls,parser,dialect,listener){var delta=new _Delta__WEBPACK_IMPORTED_MODULE_2__["default"]();delta.removed=new _Catalog__WEBPACK_IMPORTED_MODULE_1__["default"](old_decls,this.projectContext,this.librariesContext);delta.added=new _Catalog__WEBPACK_IMPORTED_MODULE_1__["default"](new_decls,this.projectContext,this.librariesContext);var changedIdsCount=delta.filterOutDuplicates();var handled=this.updateRenamed(changedIdsCount,old_decls,new_decls,parser,dialect);this.updateAppContext(old_decls,new_decls,listener);if(!handled){// either no change in ids, or more than one
// simply mark new decls as dirty, don't destroy old ones, since this can
// be achieved safely through an explicit action in the UI
this.registerDirty(new_decls,parser,dialect);}if(changedIdsCount!==0){delta.adjustForMovingProtos(this.projectContext);return delta;}else return null;// no UI update required
}updateRenamed(changedIdsCount,old_decls,new_decls,parser,dialect){// special case when changing id of a declaration, try connect to the previous version
if(changedIdsCount!==2||old_decls.length===0||new_decls.length!==old_decls.length)return false;// locate new declaration, for which there is no existing status entry
var decls_with_status=new_decls.filter(decl=>{var id=this.idFromDecl(decl);var status=this.statuses[id]||null;return status===null;},this);if(decls_with_status.length===1){var new_decl=decls_with_status[0];var new_id=this.idFromDecl(new_decl);var new_status=this.statuses[new_id];// locate corresponding old declaration
var orphan_decls=old_decls.filter(function(decl){var id=this.idFromDecl(decl);return new_decls.filter(function(decl){return id===this.idFromDecl(decl);},this).length===0;},this);if(orphan_decls.length===1){var old_decl=orphan_decls[0];var old_id=this.idFromDecl(old_decl);var old_status=this.statuses[old_id];// all ok, move the object
if(old_status&&!new_status){// update statuses
this.statuses[new_id]=this.statuses[old_id];delete this.statuses[old_id];// update status obj
new_status=old_status;if(new_status.editStatus!=="CREATED")// don't overwrite
new_status.editStatus="DIRTY";// update declaration obj
new_status.stuff.type=new_decl.getDeclarationType()+"Declaration";var decl_obj=new_status.stuff.value;decl_obj.name=new_decl.name;decl_obj.dialect=dialect;decl_obj.body=new_decl.fetchBody(parser);if(new_decl.getProto!==undefined)decl_obj.prototype=new_decl.getProto();if(new_decl.storable!==undefined)decl_obj.storable=new_decl.storable;return true;}}}// done
return false;}updateAppContext(old_decls,new_decls,listener){old_decls.unregister(this.projectContext);// TODO: manage damage on objects referring to these
new_decls.unregister(this.projectContext);// avoid duplicate declaration errors
var saved_listener=this.projectContext.problemListener;try{this.projectContext.problemListener=listener;new_decls.register(this.projectContext);new_decls.check(this.projectContext.newChildContext());// don't pollute projectContext
}finally{this.projectContext.problemListener=saved_listener;}}locateContent(stackFrame){if(stackFrame.categoryName&&stackFrame.categoryName.length)return this.locateCategoryContent(stackFrame);else return this.locateMethodContent(stackFrame);}locateCategoryContent(stackFrame){var decl=this.librariesContext.getRegisteredDeclaration(stackFrame.categoryName);if(decl)return{type:"Prompto",subType:this.subTypeFromDeclaration(decl),name:stackFrame.categoryName,core:true};decl=this.projectContext.getRegisteredDeclaration(stackFrame.categoryName);if(decl)return{type:"Prompto",subType:this.subTypeFromDeclaration(decl),name:stackFrame.categoryName,core:false};else return null;}subTypeFromDeclaration(decl){if(decl instanceof prompto.declaration.EnumeratedCategoryDeclaration||decl instanceof prompto.declaration.EnumeratedNativeDeclaration)return"enumeration";else return"category";}locateMethodContent(stackFrame){var testMethod=this.librariesContext.getRegisteredTest(stackFrame.methodName);if(testMethod)return{type:"Prompto",subType:"test",name:stackFrame.methodName,core:true,main:false};var methodsMap=this.librariesContext.getRegisteredDeclaration(stackFrame.methodName);if(methodsMap){var method=stackFrame.methodProto?methodsMap.protos[stackFrame.methodProto]:methodsMap.getFirst();if(method)return{type:"Prompto",subType:"method",name:stackFrame.methodName,proto:stackFrame.methodProto,core:true,main:method.isEligibleAsMain()};}testMethod=this.projectContext.getRegisteredTest(stackFrame.methodName);if(testMethod)return{type:"Prompto",subType:"test",name:stackFrame.methodName,core:false,main:false};methodsMap=this.projectContext.getRegisteredDeclaration(stackFrame.methodName);if(methodsMap){var _method=stackFrame.methodProto?methodsMap.protos[stackFrame.methodProto]:methodsMap.getFirst();if(_method)return{type:"Prompto",subType:"method",name:stackFrame.methodName,proto:stackFrame.methodProto,core:false,main:_method.isEligibleAsMain()};}return null;}locateSection(breakpoint){var declaration=null;if(breakpoint.type==="category")declaration=this.projectContext.getRegisteredDeclaration(breakpoint.name);else if(breakpoint.type==="method"){var methods=this.projectContext.getRegisteredDeclaration(breakpoint.name);if(methods)declaration=methods.protos[breakpoint.prototype];}else if(breakpoint.type==="test")declaration=this.projectContext.getRegisteredTest(breakpoint.name);if(declaration==null)return null;var section=declaration.locateSectionAtLine(breakpoint.line);if(section==null)return null;section=new prompto.parser.Section(section).asObject();if(!section.path)section.path="store:/"+breakpoint.type+"/"+breakpoint.name+(breakpoint.type==="method"?"/"+breakpoint.prototype:"");return section;}}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/runner/LocalInterpreter.js":
/*!****************************************!*\
  !*** ./src/runner/LocalInterpreter.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LocalInterpreter; });
/* harmony import */ var _Runner__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Runner */ "./src/runner/Runner.js");
// eslint-disable-next-line
var globals=self||window;var prompto=globals.prompto;class LocalInterpreter extends _Runner__WEBPACK_IMPORTED_MODULE_0__["default"]{runMethod(repo,methodRef,callback){try{prompto.runtime.Interpreter.interpret(repo.projectContext,methodRef.name,"");}finally{callback();}}runTest(repo,testRef,callback){var store=prompto.store.$DataStore.instance;prompto.store.$DataStore.instance=new prompto.memstore.MemStore();try{prompto.runtime.Interpreter.interpretTest(repo.projectContext,testRef.name);}finally{prompto.store.$DataStore.instance=store;callback();}}}

/***/ }),

/***/ "./src/runner/Runner.js":
/*!******************************!*\
  !*** ./src/runner/Runner.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Runner; });
class Runner{runMethod(projectId,repo,methodRef,callback){throw new Error("Unsupported!");}runTest(projectId,repo,testRef,callback){throw new Error("Unsupported!");}}

/***/ }),

/***/ "./src/utils/Fetcher.js":
/*!******************************!*\
  !*** ./src/utils/Fetcher.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Fetcher; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly)symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable;});keys.push.apply(keys,symbols);}return keys;}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(Object(source),true).forEach(function(key){_defineProperty(target,key,source[key]);});}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source));}else{ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key));});}}return target;}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}// eslint-disable-next-line
var globals=self||window;class Fetcher{constructor(){this.$authorization=null;this.onSuccess=this.onSuccess.bind(this);this.prepareConfig=this.prepareConfig.bind(this);this.collectHeaders=this.collectHeaders.bind(this);}prepareConfig(url){if(url[0]!=="/"&&url[0]!=="."){var headers={"Access-Control-Allow-Origin":"*"};if(this.$authorization!==null)headers=_objectSpread(_objectSpread({},headers),{},{"X-Authorization":this.$authorization});return{withCredentials:true,headers:headers};}else return{};}postJSON(url,params,success,errored){this.postTEXT(url,params,text=>{var json=typeof text===typeof''?JSON.parse(text):text;// already transformed by axios
success(json);},errored);}postTEXT(url,params,success,errored){errored=errored||console.log;var config=this.prepareConfig(url);axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(url,params,config).then(resp=>this.onSuccess(resp,url,success,errored)).catch(errored);}getJSON(url,params,success,errored){this.getTEXT(url,params,text=>{var json=typeof text===typeof''?JSON.parse(text):text;// already transformed by axios
success(json);},errored);}getTEXT(url,params,success,errored){errored=errored||console.log;var config=this.prepareConfig(url);if(params)config=_objectSpread(_objectSpread({},config),{},{params:params});axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(url,config).then(resp=>this.onSuccess(resp,url,success,errored)).catch(errored);}onSuccess(response,url,success,errored){if(response.status===200){this.collectHeaders(response,url);success(response.data);}else errored("Failed to load "+url+", error: "+response.status);}collectHeaders(response,url){// only read headers from server
if(url[0]==="/"||url[0]===".")this.$authorization=response.headers["X-Authorization"]||null;}clearModuleContext(projectId,success,errored){var args=[{name:"dbId",value:projectId}];var params={params:JSON.stringify(args)};axios__WEBPACK_IMPORTED_MODULE_0___default.a.get('/ws/run/clearModuleContext',{params:params}).then(resp=>{var response=resp.data;if(response.error);// TODO something
else if(response.data===-1)alert("Server is not running!");else if(success)success(response.data);}).catch(error=>errored?errored(error):{});}fetchModulePort(projectId,action,success,errored){var args=[{name:"dbId",value:projectId},{name:"action",type:"Text",value:action}];var params={params:JSON.stringify(args)};axios__WEBPACK_IMPORTED_MODULE_0___default.a.get('/ws/run/fetchModulePort',{params:params}).then(resp=>{var response=resp.data;if(response.error);// TODO something
else if(response.data===-1)alert("Server is not running!");else success(response.data);}).catch(error=>errored(error));}fetchModuleURL(projectId,action,success,errored){this.fetchModulePort(projectId,action,port=>{var href=globals.location.protocol+"//"+globals.location.hostname+":"+port+"/";success(href);},errored);}}Fetcher.instance=new Fetcher();// singleton needed to register $authorization across calls

/***/ }),

/***/ "./src/worker/Globals.js":
/*!*******************************!*\
  !*** ./src/worker/Globals.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

// eslint-disable-next-line
var globals=self;globals.Honey={'requirePath':['..']};// walk up to js folder
globals.importScripts("/js/lib/require.js","/js/lib/prompto.core.bundle.js");var log=function log(){var e=Array.prototype.slice.call(arguments,0);globals.logDebug(e);postMessage({type:"log",data:e});};globals.logDebug=console.log;console.error=console.warn=console.log=console.trace=log;/* not Webpacking this yet because that would require webpacking and installing prompto runtime too, which is not ready yet */var ProblemCollector=globals["prompto"].problem.ProblemCollector;/* ES6 inheritance crashes here */function AnnotatingErrorListener(problems){var pc=new ProblemCollector(problems);pc.collectProblem=function(problem){// convert to ACE annotation
problem={row:problem.startLine-1,column:problem.startColumn,endRow:problem.endLine-1,endColumn:problem.endColumn,type:problem.type,text:problem.message};this.problems.push(problem);};return pc;}globals.AnnotatingErrorListener=AnnotatingErrorListener;

/***/ }),

/***/ "./src/worker/PromptoWorker.js":
/*!*************************************!*\
  !*** ./src/worker/PromptoWorker.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PromptoWorker; });
/* harmony import */ var _ace_Mirror__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ace/Mirror */ "./src/ace/Mirror.js");
/* harmony import */ var _code_Repository__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../code/Repository */ "./src/code/Repository.js");
/* harmony import */ var _code_Defaults__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../code/Defaults */ "./src/code/Defaults.js");
/* harmony import */ var _utils_Fetcher__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/Fetcher */ "./src/utils/Fetcher.js");
/* harmony import */ var _runner_LocalInterpreter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../runner/LocalInterpreter */ "./src/runner/LocalInterpreter.js");
/* harmony import */ var _code_CodeUtils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../code/CodeUtils */ "./src/code/CodeUtils.js");
// eslint-disable-next-line
var globals=self||window;class PromptoWorker extends _ace_Mirror__WEBPACK_IMPORTED_MODULE_0__["default"]{constructor(sender){super(sender);this.$projectId=null;this.$project=null;this.$dialect=_code_Defaults__WEBPACK_IMPORTED_MODULE_2__["default"].dialect;this.$value="";// the last value received
this.$repo=new _code_Repository__WEBPACK_IMPORTED_MODULE_1__["default"]();this.$loading={};this.$selected=null;this.onInit();}// noinspection JSUnusedGlobalSymbols
onInit(){this.markLoading("Project");// fake 'library' to ensure libraries are published only once dependencies are loaded
this.markLoading("%Description%");this.loadCore();}// noinspection JSUnusedGlobalSymbols
onUpdate(){var value=this.doc.getValue();var problems=this.handleSetContent(value);if(problems==null)problems=this.handleEditContent(value);this.$value=value;// changing the below requires evolving PromptoChangeManager
this.sender.emit("annotate",problems);}progress(text){this.sender.emit("progressed",text);}loadCore(){this.markLoading("Core");this.progress("Fetching Core code");_utils_Fetcher__WEBPACK_IMPORTED_MODULE_3__["default"].instance.getTEXT("/prompto/prompto.pec",null,text=>{this.progress("Loading Core code");this.$repo.registerLibraryCode(text,"E");this.markLoaded("Core");});}setProject(projectId,loadDependencies){this.$projectId=projectId;this.unpublishProject();this.loadProject(loadDependencies);}setContent(content,clearValue){this.$selected=content;if(clearValue){this.$value=null;// next update will be setting the value
this.$repo.reset();}}handleSetContent(value){if(this.$value)return null;if(this.$selected&&value.length){var errorListener=new globals.AnnotatingErrorListener();this.$repo.handleSetContent(value,this.$dialect,errorListener);return errorListener.problems;}else return null;}handleEditContent(value){if(value!==this.$value){var errorListener=new globals.AnnotatingErrorListener();var delta=this.$repo.handleEditContent(value,this.$dialect,errorListener,this.$selected);if(delta){var data=Object(_code_CodeUtils__WEBPACK_IMPORTED_MODULE_5__["convertObjectToDocument"])(delta);this.sender.emit("catalogUpdated",data);}else if(this.$selected)this.sender.emit("bodyEdited",this.$selected);return errorListener.problems;}else return[];}setDialect(dialect){var old=this.$dialect;this.$dialect=dialect;if(old&&dialect!==old){var value=this.doc.getValue();if(value){// remember value since it does not result from an edit
this.$value=this.$repo.translate(value,old,dialect);this.sender.emit("value",this.$value);}}}getContentBody(content){var callbackId=arguments[arguments.length-1];// callbackId is added by ACE
var body=content?this.$repo.getDeclarationBody(content,this.$dialect):"";this.sender.callback(body,callbackId);}getEditedContents(contents){var callbackId=arguments[arguments.length-1];// callbackId is added by ACE
var edited=this.$repo.getEditedDeclarations(contents);this.sender.callback(edited,callbackId);}// noinspection JSUnusedGlobalSymbols
locateContent(stackFrame){var callbackId=arguments[arguments.length-1];// callbackId is added by ACE
var content=this.$repo.locateContent(stackFrame);this.sender.callback(content,callbackId);}// noinspection JSUnusedGlobalSymbols
locateSection(breakpoint){var callbackId=arguments[arguments.length-1];// callbackId is added by ACE
var section=this.$repo.locateSection(breakpoint);this.sender.callback(section,callbackId);}// noinspection JSUnusedGlobalSymbols
destroyContent(content){this.$value="";var delta=this.$repo.handleDestroyed(content);if(delta){var data=Object(_code_CodeUtils__WEBPACK_IMPORTED_MODULE_5__["convertObjectToDocument"])(delta.getContent());this.sender.emit("catalogUpdated",data);}this.sender.emit("value",this.$value);}loadProject(loadDependencies){this.progress("Fetching project description");PromptoWorker.fetchProjectDescription(this.$projectId,true,response=>{if(response.error)this.handleError(response.error);else{this.progress("Fetching project description complete");this.$project=response.data.value;if(loadDependencies)this.loadDependencies();// noinspection JSUnresolvedVariable
if(this.$project.stubResource)try{// resource location is absolute
globals.importScripts("/stub?moduleId="+this.$project.dbId+"&resourceName="+this.$project.stubResource);}catch(e){// TODO something
var trace=e.stack;console.error(trace);}this.markLoaded("%Description%");this.progress("Fetching project code");PromptoWorker.fetchModuleDeclarations(this.$projectId,response=>{if(response.error)this.handleError(response.error);else{this.progress("Parsing project code");var cursor=response.data.value;this.$repo.registerProjectDeclarations(this.$projectId,cursor.items,this.progress.bind(this));this.markLoaded("Project");}});}});}loadDependencies(){if(this.$project.dependencies){this.$project.dependencies.value.filter(dep=>dep!=null).map(dep=>this.loadDependency(dep.value||dep),this);}}loadDependency(dependency){this.markLoading(dependency.name);PromptoWorker.fetchModuleDescription(dependency.name,dependency.version,response=>{if(response.error)this.handleError(response.error);else{var library=response.data.value;// noinspection JSUnresolvedVariable
if(library.stubResource){try{// resource location is absolute
globals.importScripts("/stub?moduleId="+library.dbId+"&resourceName="+library.stubResource);}catch(e){// TODO something
var trace=e.stack;console.error(trace);}}this.progress("Fetching "+dependency.name+" code");PromptoWorker.fetchModuleDeclarations(library.dbId,response=>{if(response.error)this.handleError(response.error);else{this.progress("Parsing "+dependency.name+" code");var cursor=response.data.value;this.$repo.registerLibraryDeclarations(cursor.items);this.markLoaded(dependency.name);}});}});}handleError(error){// TODO
}// TODO reconnect this stuff
// noinspection JSUnusedGlobalSymbols
dependenciesUpdated(){this.$repo.clearLibrariesContext();this.markLoading("Project");// fake 'library' to ensure libraries are published only once dependencies are loaded
this.markLoading("%Description%");this.loadCore();this.loadProject(true);}static fetchProjectDescription(projectId,register,success){var params=[{name:"dbId",value:projectId.toString()},{name:"register",type:"Boolean",value:register}];var url='/ws/run/fetchModuleDescription';_utils_Fetcher__WEBPACK_IMPORTED_MODULE_3__["default"].instance.getJSON(url,{params:JSON.stringify(params)},success);}static fetchModuleDescription(name,version,success){var params=[{name:"name",type:"Text",value:name},{name:"version",type:version.type,value:version.value},{name:"register",type:"Boolean",value:false}];var url='/ws/run/fetchModuleDescription';_utils_Fetcher__WEBPACK_IMPORTED_MODULE_3__["default"].instance.getJSON(url,{params:JSON.stringify(params)},success);}static fetchModuleDeclarations(moduleId,success){var params=[{name:"dbId",value:moduleId.toString()}];var url='/ws/run/fetchModuleDeclarations';_utils_Fetcher__WEBPACK_IMPORTED_MODULE_3__["default"].instance.getJSON(url,{params:JSON.stringify(params)},success);}publishLibraries(complete){var catalog=this.$repo.publishLibraries();this.sender.emit("catalogLoaded",[catalog,complete]);}publishProject(complete){var catalog=this.$repo.publishProject();this.sender.emit("catalogLoaded",[catalog,complete]);}unpublishProject(){var catalog=this.$repo.unpublishProject();this.sender.emit("catalogLoaded",[catalog,false]);}markLoading(name){this.$loading[name]=true;}markLoaded(name){if(name!=="%Description%")this.progress("Loading "+name+" complete");delete this.$loading[name];var complete=Object.keys(this.$loading).length===0;// is this the Project ?
if(name==="Project")this.publishProject(complete);// is this the last library ?
else if(Object.keys(this.$loading).length===1&&"Project"in this.$loading)this.publishLibraries(complete);// is this the last loading
else if(complete)this.publishLibraries(complete);}markChangesCommitted(){PromptoWorker.fetchModuleDeclarations(this.$projectId,response=>{if(response.error)this.handleError(response.error);else{var cursor=response.data.value;this.$repo.markChangesCommitted(cursor.items);this.$repo.clearDeleted();}});}runMethod(methodRef){var callbackId=arguments[arguments.length-1];// callbackId is added by ACE
var oldLog=console.log;console.log=this.progress.bind(this);var runner=new _runner_LocalInterpreter__WEBPACK_IMPORTED_MODULE_4__["default"]();try{runner.runMethod(this.$repo,methodRef,()=>this.sender.callback(null,callbackId));}finally{console.log=oldLog;}}runTest(testRef){var callbackId=arguments[arguments.length-1];// callbackId is added by ACE
var oldLog=console.log;console.log=this.progress.bind(this);var runner=new _runner_LocalInterpreter__WEBPACK_IMPORTED_MODULE_4__["default"]();try{runner.runTest(this.$repo,testRef,()=>this.sender.callback(null,callbackId));}finally{console.log=oldLog;}}}

/***/ })

/******/ });
//# sourceMappingURL=main.worker.js.map