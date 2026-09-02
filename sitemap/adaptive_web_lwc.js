window.SalesforceInteractions.log.setLoggingLevel('debug')
// Test Message
// Test b
/* DATA CLOUD WEB SDK SITEMAP */
SalesforceInteractions.init({
    consents: [{
        provider: 'Test Provider A',
        purpose: SalesforceInteractions.ConsentPurpose.Tracking,
        status: SalesforceInteractions.ConsentStatus.OptIn
    }]
}).then(() => {
    const sitemapConfig = {
        pageTypeDefault: {
            name: "default",
            interaction: {
                name: "Default_Page",
                eventType: "userEngagement"
            },
            isMatch: () => true
        },
        pageTypes: [],
    };
    SalesforceInteractions.initSitemap(sitemapConfig);
});
/* END DATA CLOUD WEB SDK SITEMAP */

function addControllerToPage() {
    // Contents of build file (controller/adaptive-web-controller.js)
  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  (function() {
    "use strict";
    const STORAGE_KEYS = {
      JWT: "JWT",
      ORGANIZATION_ID: "ORGANIZATION_ID",
      DEPLOYMENT_DEVELOPER_NAME: "DEPLOYMENT_DEVELOPER_NAME",
      MESSAGING_URL: "MESSAGING_URL",
      DEPLOYMENT_CONFIGURATION: "DEPLOYMENT_CONFIGURATION"
    };
    const MESSAGING_API_CONSTANTS = {
      // Optional parameter to listConversations API: The maximum number of conversations to retrieve. Default is 20, Max is 50.
      LIST_CONVERSATION_API_NUM_CONVERSATIONS_LIMIT: 20,
      // Optional parameter to listConversationEntries API: The maximum number of entries to retrieve. Default is 20, Max is 50.
      LIST_CONVERSATION_ENTRIES_API_ENTRIES_LIMIT: 50
    };
    const CONVERSATION_CONSTANTS = {
      /**
       * Status of a conversation in the chat client.
       * @type {String}
       */
      ConversationStatus: {
        NOT_STARTED_CONVERSATION: "NOT_STARTED",
        OPENED_CONVERSATION: "OPEN",
        CLOSED_CONVERSATION: "CLOSED"
      },
      /**
       * Types of events published by Conversation Service in SCRT 2.0.
       * Refer https://developer.salesforce.com/docs/service/messaging-api/references/about/server-sent-events-structure.html
       * @type {String}
       */
      EventTypes: {
        CONVERSATION_MESSAGE: "CONVERSATION_MESSAGE",
        CONVERSATION_PARTICIPANT_CHANGED: "CONVERSATION_PARTICIPANT_CHANGED",
        CONVERSATION_ROUTING_RESULT: "CONVERSATION_ROUTING_RESULT",
        CONVERSATION_TYPING_STARTED_INDICATOR: "CONVERSATION_TYPING_STARTED_INDICATOR",
        CONVERSATION_TYPING_STOPPED_INDICATOR: "CONVERSATION_TYPING_STOPPED_INDICATOR",
        CONVERSATION_DELIVERY_ACKNOWLEDGEMENT: "CONVERSATION_DELIVERY_ACKNOWLEDGEMENT",
        CONVERSATION_READ_ACKNOWLEDGEMENT: "CONVERSATION_READ_ACKNOWLEDGEMENT",
        CONVERSATION_CLOSE_CONVERSATION: "CONVERSATION_CLOSE_CONVERSATION"
      },
      /**
       * Properties of a generic ConversationEntry class instance.
       * @type {String}
       */
      ConversationEntryProperties: {
        CONVERSATION_ID: "conversationId",
        MESSAGE_ID: "messageId",
        CONTENT: "content",
        MESSAGE_TYPE: "messageType",
        ENTRY_TYPE: "entryType",
        SENDER: "sender",
        ACTOR_NAME: "actorName",
        ACTOR_TYPE: "actorType",
        TRANSCRIPTED_TIMESTAMP: "transcriptedTimestamp",
        MESSAGE_REASON: "messageReason"
      },
      /**
       * Types of conversation entries.
       * @type {String}
       */
      EntryTypes: {
        CONVERSATION_MESSAGE: "Message",
        PARTICIPANT_CHANGED: "ParticipantChanged",
        ROUTING_RESULT: "RoutingResult",
        DELIVERY_ACKNOWLEDGEMENT: "DeliveryAcknowledgement",
        READ_ACKNOWLEDGEMENT: "ReadAcknowledgement",
        TYPING_STARTED_INDICATOR: "TypingStartedIndicator",
        TYPING_STOPPED_INDICATOR: "TypingStoppedIndicator"
      },
      /**
       * The semantic type of a Message entry type, i.e. what a message does.
       * Refer https://developer.salesforce.com/docs/service/messaging-api/references/about/message-types-format-types.html#message-types
       * @type {String}
       */
      MessageTypes: {
        STATIC_CONTENT_MESSAGE: "StaticContentMessage",
        CHOICES_MESSAGE: "ChoicesMessage",
        CHOICES_RESPONSE_MESSAGE: "ChoicesResponseMessage"
      },
      /**
       * The rendering format of a Message entry type, i.e. how it looks.
       * Refer https://developer.salesforce.com/docs/service/messaging-api/references/about/message-types-format-types.html#format-types
       * @type {String}
       */
      FormatTypes: {
        TEXT: "Text",
        BUTTONS: "Buttons",
        QUICK_REPLIES: "QuickReplies",
        SELECTIONS: "Selections"
      },
      /**
       * The role of the sender of events published by Conversation Service in SCRT 2.0.
       * @type {String}
       */
      ParticipantRoles: {
        ENDUSER: "EndUser",
        AGENT: "Agent",
        CHATBOT: "Chatbot",
        SYSTEM: "System",
        ROUTER: "Router",
        SUPERVISOR: "Supervisor"
      },
      /**
       * The operation (i.e. join/leave) of the ParticipantChanged entry type.
       * @type {String}
       */
      ParticipantChangedOperations: {
        ADD: "add",
        REMOVE: "remove"
      },
      /**
       * The routing type, set from the RoutingContext and sent in RoutingResult entries.
       * @type {String}
       */
      RoutingTypes: {
        INITIAL: "Initial",
        TRANSFER: "Transfer"
      },
      /**
       * The current routing status of the conversation, returned from the ConversationStatus API.
       * @type {String}
       */
      RoutingStatus: {
        ROUTED: "ROUTED",
        NEEDS_ROUTING: "NEEDS_ROUTING",
        INITIAL: "INITIAL",
        TRANSFER: "TRANSFER"
      },
      /**
       * How routing failed or succeeded, sent in RoutingResult entries.
       * @type {String}
       */
      RoutingFailureTypes: {
        NO_ERROR: "None",
        UNKNOWN_ERROR: "Unknown",
        SUBMISSION_ERROR: "SubmissionError",
        ROUTING_ERROR: "RoutingError"
      }
    };
    const SUPPORTED_ENTRY_TYPES = [CONVERSATION_CONSTANTS.EntryTypes.CONVERSATION_MESSAGE, CONVERSATION_CONSTANTS.EntryTypes.PARTICIPANT_CHANGED, CONVERSATION_CONSTANTS.EntryTypes.ROUTING_RESULT];
    const APP_CONSTANTS = {
      APP_CAPABILITIES_VERSION: "1",
      APP_PLATFORM: "Web",
      // The storage key name under which messaging data is stored in local/session storage.
      WEB_STORAGE_KEY: "ADAPTIVE_WEBSITE"
    };
    let config = {
      level: 0
      /* DEBUG */
      // Default to INFO level
    };
    function shouldLog(level) {
      return level >= config.level && config.level !== 4;
    }
    const logger = {
      debug(...args) {
        if (shouldLog(
          0
          /* DEBUG */
        )) {
          console.debug(...args);
        }
      },
      info(...args) {
        if (shouldLog(
          1
          /* INFO */
        )) {
          console.log(...args);
        }
      },
      warn(...args) {
        if (shouldLog(
          2
          /* WARN */
        )) {
          console.warn(...args);
        }
      },
      error(...args) {
        if (shouldLog(
          3
          /* ERROR */
        )) {
          console.error(...args);
        }
      }
    };
    var ErrorCode = /* @__PURE__ */ ((ErrorCode2) => {
      ErrorCode2["HTTP_ERROR"] = "HTTP_ERROR";
      ErrorCode2["VALIDATION_MISSING_MESSAGING_URL"] = "VALIDATION_MISSING_MESSAGING_URL";
      ErrorCode2["VALIDATION_MISSING_ORGANIZATION_ID"] = "VALIDATION_MISSING_ORGANIZATION_ID";
      ErrorCode2["VALIDATION_MISSING_DEPLOYMENT_DEVELOPER_NAME"] = "VALIDATION_MISSING_DEPLOYMENT_DEVELOPER_NAME";
      ErrorCode2["VALIDATION_MISSING_CONVERSATION_ID"] = "VALIDATION_MISSING_CONVERSATION_ID";
      ErrorCode2["VALIDATION_INVALID_EVENT_SOURCE"] = "VALIDATION_INVALID_EVENT_SOURCE";
      ErrorCode2["VALIDATION_INVALID_EVENT_LISTENER_OPERATION"] = "VALIDATION_INVALID_EVENT_LISTENER_OPERATION";
      ErrorCode2["VALIDATION_INVALID_EVENT_NAME"] = "VALIDATION_INVALID_EVENT_NAME";
      ErrorCode2["VALIDATION_INVALID_EVENT_HANDLER"] = "VALIDATION_INVALID_EVENT_HANDLER";
      ErrorCode2["VALIDATION_INVALID_API_PATH"] = "VALIDATION_INVALID_API_PATH";
      ErrorCode2["VALIDATION_INVALID_EVENT_LISTENER_MAP"] = "VALIDATION_INVALID_EVENT_LISTENER_MAP";
      ErrorCode2["VALIDATION_INVALID_SERVER_SENT_EVENT_DATA"] = "VALIDATION_INVALID_SERVER_SENT_EVENT_DATA";
      ErrorCode2["VALIDATION_INVALID_CONVERSATION_ENTRY"] = "VALIDATION_INVALID_CONVERSATION_ENTRY";
      ErrorCode2["VALIDATION_UNSUPPORTED_ENTRY_TYPE"] = "VALIDATION_UNSUPPORTED_ENTRY_TYPE";
      ErrorCode2["VALIDATION_INVALID_RESPONSE_FORMAT"] = "VALIDATION_INVALID_RESPONSE_FORMAT";
      ErrorCode2["CONVERSATION_WEB_STORAGE_UNAVAILABLE"] = "CONVERSATION_WEB_STORAGE_UNAVAILABLE";
      ErrorCode2["CONVERSATION_ALREADY_OPEN"] = "CONVERSATION_ALREADY_OPEN";
      ErrorCode2["CONVERSATION_NO_ACTIVE_CONVERSATION"] = "CONVERSATION_NO_ACTIVE_CONVERSATION";
      ErrorCode2["CONVERSATION_ID_MISMATCH"] = "CONVERSATION_ID_MISMATCH";
      ErrorCode2["CONVERSATION_FAILED_TO_PARSE_CONVERSATION_ENTRY"] = "CONVERSATION_FAILED_TO_PARSE_CONVERSATION_ENTRY";
      ErrorCode2["CONVERSATION_EVENT_SOURCE_POLYFILL_MISSING"] = "CONVERSATION_EVENT_SOURCE_POLYFILL_MISSING";
      return ErrorCode2;
    })(ErrorCode || {});
    class BaseError extends Error {
      constructor(code, message, originalError) {
        super(message);
        __publicField(this, "code");
        __publicField(this, "timestamp");
        __publicField(this, "originalError");
        this.name = this.constructor.name;
        this.code = code;
        this.timestamp = /* @__PURE__ */ new Date();
        this.originalError = originalError;
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, this.constructor);
        }
      }
      /**
       * Convert error to a plain object for logging/serialization
       */
      toJSON() {
        return {
          name: this.name,
          code: this.code,
          message: this.message,
          timestamp: this.timestamp.toISOString(),
          stack: this.stack,
          originalError: this.originalError instanceof Error ? {
            name: this.originalError.name,
            message: this.originalError.message,
            stack: this.originalError.stack
          } : this.originalError
        };
      }
    }
    class HttpError extends BaseError {
      constructor(code, message, status, statusText, originalError) {
        super(code, message, originalError);
        __publicField(this, "status");
        __publicField(this, "statusText");
        this.status = status;
        this.statusText = statusText;
      }
      toJSON() {
        return {
          ...super.toJSON(),
          status: this.status,
          statusText: this.statusText
        };
      }
    }
    class ValidationError extends BaseError {
      constructor(code, message, originalError) {
        super(code, message, originalError);
      }
    }
    class ConversationConfigurationError extends BaseError {
      constructor(code, message, context, originalError) {
        super(code, message, originalError);
        __publicField(this, "context");
        this.context = context;
      }
      toJSON() {
        return {
          ...super.toJSON(),
          context: this.context
        };
      }
    }
    function isBaseError(error) {
      return error instanceof BaseError;
    }
    function logError(error) {
      if (isBaseError(error)) {
        logger.error(`Error code: ${error.code}`, error);
      } else {
        logger.error(error);
      }
    }
    let storageKey;
    let storageName;
    const isSessionStorageAvailable = () => {
      try {
        window.sessionStorage.getItem("test");
        if (window.sessionStorage && typeof window.sessionStorage === "object") {
          storageName = "sessionStorage";
          return true;
        }
      } catch {
        logger.info("sessionStorage not available.");
        return false;
      }
      return false;
    };
    const determineStorageType = (inLocalStorage = false) => {
      if (isSessionStorageAvailable()) {
        return sessionStorage;
      } else {
        throw new ConversationConfigurationError(
          ErrorCode.CONVERSATION_WEB_STORAGE_UNAVAILABLE,
          "Cannot initialize the app. Web storage is required for the app to function."
        );
      }
    };
    const initializeWebStorage = ({ organizationId, deploymentDeveloperName, messagingUrl }) => {
      storageKey = `${APP_CONSTANTS.WEB_STORAGE_KEY}_${organizationId}_${deploymentDeveloperName}`;
      const storage = determineStorageType();
      if (storage.getItem(storageKey)) {
        return;
      }
      const storageObj = JSON.stringify({
        [STORAGE_KEYS.ORGANIZATION_ID]: organizationId,
        [STORAGE_KEYS.DEPLOYMENT_DEVELOPER_NAME]: deploymentDeveloperName,
        [STORAGE_KEYS.MESSAGING_URL]: messagingUrl
      });
      storage.setItem(storageKey, storageObj);
      logger.debug("Browser Web Storage initialized.");
    };
    const getItemInWebStorageByKey = (key, inLocalStorage = false) => {
      let item;
      const storage = determineStorageType(inLocalStorage);
      if (storage) {
        const storageObj = storage.getItem(storageKey) && JSON.parse(storage.getItem(storageKey)) || {};
        item = storageObj[key];
      }
      return item;
    };
    const setItemInWebStorage = (key, value, inLocalStorage = true) => {
      const storage = determineStorageType(inLocalStorage);
      if (storage) {
        const storageObj = storage.getItem(storageKey) && JSON.parse(storage.getItem(storageKey)) || {};
        storageObj[key] = value;
        storage.setItem(storageKey, JSON.stringify(storageObj));
        logger.debug(`${key} set in ${storageName}`);
      }
    };
    const removeItemInWebStorage = (key) => {
      if (isSessionStorageAvailable() && sessionStorage.getItem(storageKey)) {
        const storageObj = JSON.parse(sessionStorage.getItem(storageKey)) || {};
        delete storageObj[key];
        sessionStorage.setItem(storageKey, JSON.stringify(storageObj));
      }
      logger.debug(`${key} removed from web storage`);
    };
    const clearWebStorage = () => {
      if (isSessionStorageAvailable()) {
        sessionStorage.removeItem(storageKey);
      }
      logger.debug(`web storage cleared`);
    };
    let lastEventId;
    let conversationId;
    function getOrganizationId() {
      return getItemInWebStorageByKey(STORAGE_KEYS.ORGANIZATION_ID);
    }
    function getDeploymentDeveloperName() {
      return getItemInWebStorageByKey(STORAGE_KEYS.DEPLOYMENT_DEVELOPER_NAME);
    }
    function getSalesforceMessagingUrl() {
      return getItemInWebStorageByKey(STORAGE_KEYS.MESSAGING_URL);
    }
    function setJwt(jwt) {
      if (jwt && jwt.trim().length > 0) {
        setItemInWebStorage(STORAGE_KEYS.JWT, jwt);
      } else {
        removeItemInWebStorage(STORAGE_KEYS.JWT);
      }
    }
    function getJwt() {
      return getItemInWebStorageByKey(STORAGE_KEYS.JWT);
    }
    function setDeploymentConfiguration(configuration) {
      setItemInWebStorage(STORAGE_KEYS.DEPLOYMENT_CONFIGURATION, JSON.stringify(configuration));
    }
    function setLastEventId(id) {
      lastEventId = id;
    }
    function getLastEventId() {
      return lastEventId;
    }
    function storeConversationId(convId) {
      conversationId = convId;
    }
    function getConversationId() {
      return conversationId;
    }
    function clearInMemoryData() {
      conversationId = void 0;
      lastEventId = void 0;
    }
    var eventsource$1 = { exports: {} };
    var eventsource = eventsource$1.exports;
    var hasRequiredEventsource;
    function requireEventsource() {
      if (hasRequiredEventsource) return eventsource$1.exports;
      hasRequiredEventsource = 1;
      (function(module, exports$1) {
        (function(global) {
          var setTimeout = global.setTimeout;
          var clearTimeout = global.clearTimeout;
          var XMLHttpRequest = global.XMLHttpRequest;
          var XDomainRequest = global.XDomainRequest;
          var ActiveXObject = global.ActiveXObject;
          var NativeEventSource = global.EventSource;
          var document = global.document;
          var Promise2 = global.Promise;
          var fetch2 = global.fetch;
          var Response = global.Response;
          var TextDecoder = global.TextDecoder;
          var TextEncoder = global.TextEncoder;
          var AbortController = global.AbortController;
          if (typeof window !== "undefined" && typeof document !== "undefined" && !("readyState" in document) && document.body == null) {
            document.readyState = "loading";
            window.addEventListener("load", function(event) {
              document.readyState = "complete";
            }, false);
          }
          if (XMLHttpRequest == null && ActiveXObject != null) {
            XMLHttpRequest = function() {
              return new ActiveXObject("Microsoft.XMLHTTP");
            };
          }
          if (Object.create == void 0) {
            Object.create = function(C) {
              function F() {
              }
              F.prototype = C;
              return new F();
            };
          }
          if (!Date.now) {
            Date.now = function now() {
              return (/* @__PURE__ */ new Date()).getTime();
            };
          }
          if (AbortController == void 0) {
            var originalFetch2 = fetch2;
            fetch2 = function(url, options) {
              var signal = options.signal;
              return originalFetch2(url, { headers: options.headers, credentials: options.credentials, cache: options.cache }).then(function(response) {
                var reader = response.body.getReader();
                signal._reader = reader;
                if (signal._aborted) {
                  signal._reader.cancel();
                }
                return {
                  status: response.status,
                  statusText: response.statusText,
                  headers: response.headers,
                  body: {
                    getReader: function() {
                      return reader;
                    }
                  }
                };
              });
            };
            AbortController = function() {
              this.signal = {
                _reader: null,
                _aborted: false
              };
              this.abort = function() {
                if (this.signal._reader != null) {
                  this.signal._reader.cancel();
                }
                this.signal._aborted = true;
              };
            };
          }
          function TextDecoderPolyfill() {
            this.bitsNeeded = 0;
            this.codePoint = 0;
          }
          TextDecoderPolyfill.prototype.decode = function(octets) {
            function valid(codePoint2, shift, octetsCount2) {
              if (octetsCount2 === 1) {
                return codePoint2 >= 128 >> shift && codePoint2 << shift <= 2047;
              }
              if (octetsCount2 === 2) {
                return codePoint2 >= 2048 >> shift && codePoint2 << shift <= 55295 || codePoint2 >= 57344 >> shift && codePoint2 << shift <= 65535;
              }
              if (octetsCount2 === 3) {
                return codePoint2 >= 65536 >> shift && codePoint2 << shift <= 1114111;
              }
              throw new Error();
            }
            function octetsCount(bitsNeeded2, codePoint2) {
              if (bitsNeeded2 === 6 * 1) {
                return codePoint2 >> 6 > 15 ? 3 : codePoint2 > 31 ? 2 : 1;
              }
              if (bitsNeeded2 === 6 * 2) {
                return codePoint2 > 15 ? 3 : 2;
              }
              if (bitsNeeded2 === 6 * 3) {
                return 3;
              }
              throw new Error();
            }
            var REPLACER = 65533;
            var string = "";
            var bitsNeeded = this.bitsNeeded;
            var codePoint = this.codePoint;
            for (var i = 0; i < octets.length; i += 1) {
              var octet = octets[i];
              if (bitsNeeded !== 0) {
                if (octet < 128 || octet > 191 || !valid(codePoint << 6 | octet & 63, bitsNeeded - 6, octetsCount(bitsNeeded, codePoint))) {
                  bitsNeeded = 0;
                  codePoint = REPLACER;
                  string += String.fromCharCode(codePoint);
                }
              }
              if (bitsNeeded === 0) {
                if (octet >= 0 && octet <= 127) {
                  bitsNeeded = 0;
                  codePoint = octet;
                } else if (octet >= 192 && octet <= 223) {
                  bitsNeeded = 6 * 1;
                  codePoint = octet & 31;
                } else if (octet >= 224 && octet <= 239) {
                  bitsNeeded = 6 * 2;
                  codePoint = octet & 15;
                } else if (octet >= 240 && octet <= 247) {
                  bitsNeeded = 6 * 3;
                  codePoint = octet & 7;
                } else {
                  bitsNeeded = 0;
                  codePoint = REPLACER;
                }
                if (bitsNeeded !== 0 && !valid(codePoint, bitsNeeded, octetsCount(bitsNeeded, codePoint))) {
                  bitsNeeded = 0;
                  codePoint = REPLACER;
                }
              } else {
                bitsNeeded -= 6;
                codePoint = codePoint << 6 | octet & 63;
              }
              if (bitsNeeded === 0) {
                if (codePoint <= 65535) {
                  string += String.fromCharCode(codePoint);
                } else {
                  string += String.fromCharCode(55296 + (codePoint - 65535 - 1 >> 10));
                  string += String.fromCharCode(56320 + (codePoint - 65535 - 1 & 1023));
                }
              }
            }
            this.bitsNeeded = bitsNeeded;
            this.codePoint = codePoint;
            return string;
          };
          var supportsStreamOption = function() {
            try {
              return new TextDecoder().decode(new TextEncoder().encode("test"), { stream: true }) === "test";
            } catch (error) {
              console.debug("TextDecoder does not support streaming option. Using polyfill instead: " + error);
            }
            return false;
          };
          if (TextDecoder == void 0 || TextEncoder == void 0 || !supportsStreamOption()) {
            TextDecoder = TextDecoderPolyfill;
          }
          var k = function() {
          };
          function XHRWrapper(xhr) {
            this.withCredentials = false;
            this.readyState = 0;
            this.status = 0;
            this.statusText = "";
            this.responseText = "";
            this.onprogress = k;
            this.onload = k;
            this.onerror = k;
            this.onreadystatechange = k;
            this._contentType = "";
            this._xhr = xhr;
            this._sendTimeout = 0;
            this._abort = k;
          }
          XHRWrapper.prototype.open = function(method, url) {
            this._abort(true);
            var that = this;
            var xhr = this._xhr;
            var state = 1;
            var timeout = 0;
            this._abort = function(silent) {
              if (that._sendTimeout !== 0) {
                clearTimeout(that._sendTimeout);
                that._sendTimeout = 0;
              }
              if (state === 1 || state === 2 || state === 3) {
                state = 4;
                xhr.onload = k;
                xhr.onerror = k;
                xhr.onabort = k;
                xhr.onprogress = k;
                xhr.onreadystatechange = k;
                xhr.abort();
                if (timeout !== 0) {
                  clearTimeout(timeout);
                  timeout = 0;
                }
                if (!silent) {
                  that.readyState = 4;
                  that.onabort(null);
                  that.onreadystatechange();
                }
              }
              state = 0;
            };
            var onStart = function() {
              if (state === 1) {
                var status = 0;
                var statusText = "";
                var contentType = void 0;
                if (!("contentType" in xhr)) {
                  try {
                    status = xhr.status;
                    statusText = xhr.statusText;
                    contentType = xhr.getResponseHeader("Content-Type");
                  } catch (error) {
                    status = 0;
                    statusText = "";
                    contentType = void 0;
                  }
                } else {
                  status = 200;
                  statusText = "OK";
                  contentType = xhr.contentType;
                }
                if (status !== 0) {
                  state = 2;
                  that.readyState = 2;
                  that.status = status;
                  that.statusText = statusText;
                  that._contentType = contentType;
                  that.onreadystatechange();
                }
              }
            };
            var onProgress = function() {
              onStart();
              if (state === 2 || state === 3) {
                state = 3;
                var responseText = "";
                try {
                  responseText = xhr.responseText;
                } catch (error) {
                }
                that.readyState = 3;
                that.responseText = responseText;
                that.onprogress();
              }
            };
            var onFinish = function(type, event) {
              if (event == null || event.preventDefault == null) {
                event = {
                  preventDefault: k
                };
              }
              onProgress();
              if (state === 1 || state === 2 || state === 3) {
                state = 4;
                if (timeout !== 0) {
                  clearTimeout(timeout);
                  timeout = 0;
                }
                that.readyState = 4;
                if (type === "load") {
                  that.onload(event);
                } else if (type === "error") {
                  that.onerror(event);
                } else if (type === "abort") {
                  that.onabort(event);
                } else {
                  throw new TypeError();
                }
                that.onreadystatechange();
              }
            };
            var onReadyStateChange = function(event) {
              if (xhr != void 0) {
                if (xhr.readyState === 4) {
                  if (!("onload" in xhr) || !("onerror" in xhr) || !("onabort" in xhr)) {
                    onFinish(xhr.responseText === "" ? "error" : "load", event);
                  }
                } else if (xhr.readyState === 3) {
                  if (!("onprogress" in xhr)) {
                    onProgress();
                  }
                } else if (xhr.readyState === 2) {
                  onStart();
                }
              }
            };
            var onTimeout = function() {
              timeout = setTimeout(function() {
                onTimeout();
              }, 500);
              if (xhr.readyState === 3) {
                onProgress();
              }
            };
            if ("onload" in xhr) {
              xhr.onload = function(event) {
                onFinish("load", event);
              };
            }
            if ("onerror" in xhr) {
              xhr.onerror = function(event) {
                onFinish("error", event);
              };
            }
            if ("onabort" in xhr) {
              xhr.onabort = function(event) {
                onFinish("abort", event);
              };
            }
            if ("onprogress" in xhr) {
              xhr.onprogress = onProgress;
            }
            if ("onreadystatechange" in xhr) {
              xhr.onreadystatechange = function(event) {
                onReadyStateChange(event);
              };
            }
            if ("contentType" in xhr || !("ontimeout" in XMLHttpRequest.prototype)) {
              url += (url.indexOf("?") === -1 ? "?" : "&") + "padding=true";
            }
            xhr.open(method, url, true);
            if ("readyState" in xhr) {
              timeout = setTimeout(function() {
                onTimeout();
              }, 0);
            }
          };
          XHRWrapper.prototype.abort = function() {
            this._abort(false);
          };
          XHRWrapper.prototype.getResponseHeader = function(name) {
            return this._contentType;
          };
          XHRWrapper.prototype.setRequestHeader = function(name, value) {
            var xhr = this._xhr;
            if ("setRequestHeader" in xhr) {
              xhr.setRequestHeader(name, value);
            }
          };
          XHRWrapper.prototype.getAllResponseHeaders = function() {
            return this._xhr.getAllResponseHeaders != void 0 ? this._xhr.getAllResponseHeaders() || "" : "";
          };
          XHRWrapper.prototype.send = function() {
            if ((!("ontimeout" in XMLHttpRequest.prototype) || !("sendAsBinary" in XMLHttpRequest.prototype) && !("mozAnon" in XMLHttpRequest.prototype)) && document != void 0 && document.readyState != void 0 && document.readyState !== "complete") {
              var that = this;
              that._sendTimeout = setTimeout(function() {
                that._sendTimeout = 0;
                that.send();
              }, 4);
              return;
            }
            var xhr = this._xhr;
            if ("withCredentials" in xhr) {
              xhr.withCredentials = this.withCredentials;
            }
            try {
              xhr.send(void 0);
            } catch (error1) {
              throw error1;
            }
          };
          function toLowerCase(name) {
            return name.replace(/[A-Z]/g, function(c) {
              return String.fromCharCode(c.charCodeAt(0) + 32);
            });
          }
          function HeadersPolyfill(all) {
            var map = /* @__PURE__ */ Object.create(null);
            var array = all.split("\r\n");
            for (var i = 0; i < array.length; i += 1) {
              var line = array[i];
              var parts = line.split(": ");
              var name = parts.shift();
              var value = parts.join(": ");
              map[toLowerCase(name)] = value;
            }
            this._map = map;
          }
          HeadersPolyfill.prototype.get = function(name) {
            return this._map[toLowerCase(name)];
          };
          if (XMLHttpRequest != null && XMLHttpRequest.HEADERS_RECEIVED == null) {
            XMLHttpRequest.HEADERS_RECEIVED = 2;
          }
          function XHRTransport() {
          }
          XHRTransport.prototype.open = function(xhr, onStartCallback, onProgressCallback, onFinishCallback, url, withCredentials, headers) {
            xhr.open("GET", url);
            var offset = 0;
            xhr.onprogress = function() {
              var responseText = xhr.responseText;
              var chunk = responseText.slice(offset);
              offset += chunk.length;
              onProgressCallback(chunk);
            };
            xhr.onerror = function(event) {
              event.preventDefault();
              onFinishCallback(new Error("NetworkError"));
            };
            xhr.onload = function() {
              onFinishCallback(null);
            };
            xhr.onabort = function() {
              onFinishCallback(null);
            };
            xhr.onreadystatechange = function() {
              if (xhr.readyState === XMLHttpRequest.HEADERS_RECEIVED) {
                var status = xhr.status;
                var statusText = xhr.statusText;
                var contentType = xhr.getResponseHeader("Content-Type");
                var headers2 = xhr.getAllResponseHeaders();
                onStartCallback(status, statusText, contentType, new HeadersPolyfill(headers2));
              }
            };
            xhr.withCredentials = withCredentials;
            for (var name in headers) {
              if (Object.prototype.hasOwnProperty.call(headers, name)) {
                xhr.setRequestHeader(name, headers[name]);
              }
            }
            xhr.send();
            return xhr;
          };
          function HeadersWrapper(headers) {
            this._headers = headers;
          }
          HeadersWrapper.prototype.get = function(name) {
            return this._headers.get(name);
          };
          function FetchTransport() {
          }
          FetchTransport.prototype.open = function(xhr, onStartCallback, onProgressCallback, onFinishCallback, url, withCredentials, headers) {
            var reader = null;
            var controller = new AbortController();
            var signal = controller.signal;
            var textDecoder = new TextDecoder();
            fetch2(url, {
              headers,
              credentials: withCredentials ? "include" : "same-origin",
              signal,
              cache: "no-store"
            }).then(function(response) {
              reader = response.body.getReader();
              onStartCallback(response.status, response.statusText, response.headers.get("Content-Type"), new HeadersWrapper(response.headers));
              return new Promise2(function(resolve, reject) {
                var readNextChunk = function() {
                  reader.read().then(function(result) {
                    if (result.done) {
                      resolve(void 0);
                    } else {
                      var chunk = textDecoder.decode(result.value, { stream: true });
                      onProgressCallback(chunk);
                      readNextChunk();
                    }
                  })["catch"](function(error) {
                    reject(error);
                  });
                };
                readNextChunk();
              });
            })["catch"](function(error) {
              if (error.name === "AbortError") {
                return void 0;
              } else {
                return error;
              }
            }).then(function(error) {
              onFinishCallback(error);
            });
            return {
              abort: function() {
                if (reader != null) {
                  reader.cancel();
                }
                controller.abort();
              }
            };
          };
          function EventTarget() {
            this._listeners = /* @__PURE__ */ Object.create(null);
          }
          function throwError(e) {
            setTimeout(function() {
              throw e;
            }, 0);
          }
          EventTarget.prototype.dispatchEvent = function(event) {
            event.target = this;
            var typeListeners = this._listeners[event.type];
            if (typeListeners != void 0) {
              var length = typeListeners.length;
              for (var i = 0; i < length; i += 1) {
                var listener = typeListeners[i];
                try {
                  if (typeof listener.handleEvent === "function") {
                    listener.handleEvent(event);
                  } else {
                    listener.call(this, event);
                  }
                } catch (e) {
                  throwError(e);
                }
              }
            }
          };
          EventTarget.prototype.addEventListener = function(type, listener) {
            type = String(type);
            var listeners = this._listeners;
            var typeListeners = listeners[type];
            if (typeListeners == void 0) {
              typeListeners = [];
              listeners[type] = typeListeners;
            }
            var found = false;
            for (var i = 0; i < typeListeners.length; i += 1) {
              if (typeListeners[i] === listener) {
                found = true;
              }
            }
            if (!found) {
              typeListeners.push(listener);
            }
          };
          EventTarget.prototype.removeEventListener = function(type, listener) {
            type = String(type);
            var listeners = this._listeners;
            var typeListeners = listeners[type];
            if (typeListeners != void 0) {
              var filtered = [];
              for (var i = 0; i < typeListeners.length; i += 1) {
                if (typeListeners[i] !== listener) {
                  filtered.push(typeListeners[i]);
                }
              }
              if (filtered.length === 0) {
                delete listeners[type];
              } else {
                listeners[type] = filtered;
              }
            }
          };
          function Event(type) {
            this.type = type;
            this.target = void 0;
          }
          function MessageEvent(type, options) {
            Event.call(this, type);
            this.data = options.data;
            this.lastEventId = options.lastEventId;
          }
          MessageEvent.prototype = Object.create(Event.prototype);
          function ConnectionEvent(type, options) {
            Event.call(this, type);
            this.status = options.status;
            this.statusText = options.statusText;
            this.headers = options.headers;
          }
          ConnectionEvent.prototype = Object.create(Event.prototype);
          function ErrorEvent(type, options) {
            Event.call(this, type);
            this.error = options.error;
          }
          ErrorEvent.prototype = Object.create(Event.prototype);
          var WAITING = -1;
          var CONNECTING = 0;
          var OPEN = 1;
          var CLOSED = 2;
          var AFTER_CR = -1;
          var FIELD_START = 0;
          var FIELD = 1;
          var VALUE_START = 2;
          var VALUE = 3;
          var contentTypeRegExp = /^text\/event\-stream(;.*)?$/i;
          var MINIMUM_DURATION = 1e3;
          var MAXIMUM_DURATION = 18e6;
          var parseDuration = function(value, def) {
            var n = value == null ? def : parseInt(value, 10);
            if (n !== n) {
              n = def;
            }
            return clampDuration(n);
          };
          var clampDuration = function(n) {
            return Math.min(Math.max(n, MINIMUM_DURATION), MAXIMUM_DURATION);
          };
          var fire = function(that, f, event) {
            try {
              if (typeof f === "function") {
                f.call(that, event);
              }
            } catch (e) {
              throwError(e);
            }
          };
          function EventSourcePolyfill(url, options) {
            EventTarget.call(this);
            options = options || {};
            this.onopen = void 0;
            this.onmessage = void 0;
            this.onerror = void 0;
            this.url = void 0;
            this.readyState = void 0;
            this.withCredentials = void 0;
            this.headers = void 0;
            this._close = void 0;
            start(this, url, options);
          }
          function getBestXHRTransport() {
            return XMLHttpRequest != void 0 && "withCredentials" in XMLHttpRequest.prototype || XDomainRequest == void 0 ? new XMLHttpRequest() : new XDomainRequest();
          }
          var isFetchSupported = fetch2 != void 0 && Response != void 0 && "body" in Response.prototype;
          function start(es, url, options) {
            url = String(url);
            var withCredentials = Boolean(options.withCredentials);
            var lastEventIdQueryParameterName = options.lastEventIdQueryParameterName || "lastEventId";
            var initialRetry = clampDuration(1e3);
            var heartbeatTimeout = parseDuration(options.heartbeatTimeout, 45e3);
            var lastEventId2 = "";
            var retry = initialRetry;
            var wasActivity = false;
            var textLength = 0;
            var headers = options.headers || {};
            var TransportOption = options.Transport;
            var xhr = isFetchSupported && TransportOption == void 0 ? void 0 : new XHRWrapper(TransportOption != void 0 ? new TransportOption() : getBestXHRTransport());
            var transport = TransportOption != null && typeof TransportOption !== "string" ? new TransportOption() : xhr == void 0 ? new FetchTransport() : new XHRTransport();
            var abortController = void 0;
            var timeout = 0;
            var currentState = WAITING;
            var dataBuffer = "";
            var lastEventIdBuffer = "";
            var eventTypeBuffer = "";
            var textBuffer = "";
            var state = FIELD_START;
            var fieldStart = 0;
            var valueStart = 0;
            var onStart = function(status, statusText, contentType, headers2) {
              if (currentState === CONNECTING) {
                if (status === 200 && contentType != void 0 && contentTypeRegExp.test(contentType)) {
                  currentState = OPEN;
                  wasActivity = Date.now();
                  retry = initialRetry;
                  es.readyState = OPEN;
                  var event = new ConnectionEvent("open", {
                    status,
                    statusText,
                    headers: headers2
                  });
                  es.dispatchEvent(event);
                  fire(es, es.onopen, event);
                } else {
                  var message = "";
                  if (status !== 200) {
                    if (statusText) {
                      statusText = statusText.replace(/\s+/g, " ");
                    }
                    message = "EventSource's response has a status " + status + " " + statusText + " that is not 200. Aborting the connection.";
                  } else {
                    message = "EventSource's response has a Content-Type specifying an unsupported type: " + (contentType == void 0 ? "-" : contentType.replace(/\s+/g, " ")) + ". Aborting the connection.";
                  }
                  close();
                  var event = new ConnectionEvent("error", {
                    status,
                    statusText,
                    headers: headers2
                  });
                  es.dispatchEvent(event);
                  fire(es, es.onerror, event);
                  console.error(message);
                }
              }
            };
            var onProgress = function(textChunk) {
              if (currentState === OPEN) {
                var n = -1;
                for (var i = 0; i < textChunk.length; i += 1) {
                  var c = textChunk.charCodeAt(i);
                  if (c === "\n".charCodeAt(0) || c === "\r".charCodeAt(0)) {
                    n = i;
                  }
                }
                var chunk = (n !== -1 ? textBuffer : "") + textChunk.slice(0, n + 1);
                textBuffer = (n === -1 ? textBuffer : "") + textChunk.slice(n + 1);
                if (textChunk !== "") {
                  wasActivity = Date.now();
                  textLength += textChunk.length;
                }
                for (var position = 0; position < chunk.length; position += 1) {
                  var c = chunk.charCodeAt(position);
                  if (state === AFTER_CR && c === "\n".charCodeAt(0)) {
                    state = FIELD_START;
                  } else {
                    if (state === AFTER_CR) {
                      state = FIELD_START;
                    }
                    if (c === "\r".charCodeAt(0) || c === "\n".charCodeAt(0)) {
                      if (state !== FIELD_START) {
                        if (state === FIELD) {
                          valueStart = position + 1;
                        }
                        var field = chunk.slice(fieldStart, valueStart - 1);
                        var value = chunk.slice(valueStart + (valueStart < position && chunk.charCodeAt(valueStart) === " ".charCodeAt(0) ? 1 : 0), position);
                        if (field === "data") {
                          dataBuffer += "\n";
                          dataBuffer += value;
                        } else if (field === "id") {
                          lastEventIdBuffer = value;
                        } else if (field === "event") {
                          eventTypeBuffer = value;
                        } else if (field === "retry") {
                          initialRetry = parseDuration(value, initialRetry);
                          retry = initialRetry;
                        } else if (field === "heartbeatTimeout") {
                          heartbeatTimeout = parseDuration(value, heartbeatTimeout);
                          if (timeout !== 0) {
                            clearTimeout(timeout);
                            timeout = setTimeout(function() {
                              onTimeout();
                            }, heartbeatTimeout);
                          }
                        }
                      }
                      if (state === FIELD_START) {
                        if (dataBuffer !== "") {
                          lastEventId2 = lastEventIdBuffer;
                          if (eventTypeBuffer === "") {
                            eventTypeBuffer = "message";
                          }
                          var event = new MessageEvent(eventTypeBuffer, {
                            data: dataBuffer.slice(1),
                            lastEventId: lastEventIdBuffer
                          });
                          es.dispatchEvent(event);
                          if (eventTypeBuffer === "open") {
                            fire(es, es.onopen, event);
                          } else if (eventTypeBuffer === "message") {
                            fire(es, es.onmessage, event);
                          } else if (eventTypeBuffer === "error") {
                            fire(es, es.onerror, event);
                          }
                          if (currentState === CLOSED) {
                            return;
                          }
                        }
                        dataBuffer = "";
                        eventTypeBuffer = "";
                      }
                      state = c === "\r".charCodeAt(0) ? AFTER_CR : FIELD_START;
                    } else {
                      if (state === FIELD_START) {
                        fieldStart = position;
                        state = FIELD;
                      }
                      if (state === FIELD) {
                        if (c === ":".charCodeAt(0)) {
                          valueStart = position + 1;
                          state = VALUE_START;
                        }
                      } else if (state === VALUE_START) {
                        state = VALUE;
                      }
                    }
                  }
                }
              }
            };
            var onFinish = function(error) {
              if (currentState === OPEN || currentState === CONNECTING) {
                currentState = WAITING;
                if (timeout !== 0) {
                  clearTimeout(timeout);
                  timeout = 0;
                }
                timeout = setTimeout(function() {
                  onTimeout();
                }, retry);
                retry = clampDuration(Math.min(initialRetry * 16, retry * 2));
                es.readyState = CONNECTING;
                var event = new ErrorEvent("error", { error });
                es.dispatchEvent(event);
                fire(es, es.onerror, event);
                if (error != void 0) {
                  console.error(error);
                }
              }
            };
            var close = function() {
              currentState = CLOSED;
              if (abortController != void 0) {
                abortController.abort();
                abortController = void 0;
              }
              if (timeout !== 0) {
                clearTimeout(timeout);
                timeout = 0;
              }
              es.readyState = CLOSED;
            };
            var onTimeout = function() {
              timeout = 0;
              if (currentState !== WAITING) {
                if (!wasActivity && abortController != void 0) {
                  onFinish(new Error("No activity within " + heartbeatTimeout + " milliseconds. " + (currentState === CONNECTING ? "No response received." : textLength + " chars received.") + " Reconnecting."));
                  if (abortController != void 0) {
                    abortController.abort();
                    abortController = void 0;
                  }
                } else {
                  var nextHeartbeat = Math.max((wasActivity || Date.now()) + heartbeatTimeout - Date.now(), 1);
                  wasActivity = false;
                  timeout = setTimeout(function() {
                    onTimeout();
                  }, nextHeartbeat);
                }
                return;
              }
              wasActivity = false;
              textLength = 0;
              timeout = setTimeout(function() {
                onTimeout();
              }, heartbeatTimeout);
              currentState = CONNECTING;
              dataBuffer = "";
              eventTypeBuffer = "";
              lastEventIdBuffer = lastEventId2;
              textBuffer = "";
              fieldStart = 0;
              valueStart = 0;
              state = FIELD_START;
              var requestURL = url;
              if (url.slice(0, 5) !== "data:" && url.slice(0, 5) !== "blob:") {
                if (lastEventId2 !== "") {
                  var i = url.indexOf("?");
                  requestURL = i === -1 ? url : url.slice(0, i + 1) + url.slice(i + 1).replace(/(?:^|&)([^=&]*)(?:=[^&]*)?/g, function(p, paramName) {
                    return paramName === lastEventIdQueryParameterName ? "" : p;
                  });
                  requestURL += (url.indexOf("?") === -1 ? "?" : "&") + lastEventIdQueryParameterName + "=" + encodeURIComponent(lastEventId2);
                }
              }
              var withCredentials2 = es.withCredentials;
              var requestHeaders = {};
              requestHeaders["Accept"] = "text/event-stream";
              var headers2 = es.headers;
              if (headers2 != void 0) {
                for (var name in headers2) {
                  if (Object.prototype.hasOwnProperty.call(headers2, name)) {
                    requestHeaders[name] = headers2[name];
                  }
                }
              }
              try {
                abortController = transport.open(xhr, onStart, onProgress, onFinish, requestURL, withCredentials2, requestHeaders);
              } catch (error) {
                close();
                throw error;
              }
            };
            es.url = url;
            es.readyState = CONNECTING;
            es.withCredentials = withCredentials;
            es.headers = headers;
            es._close = close;
            onTimeout();
          }
          EventSourcePolyfill.prototype = Object.create(EventTarget.prototype);
          EventSourcePolyfill.prototype.CONNECTING = CONNECTING;
          EventSourcePolyfill.prototype.OPEN = OPEN;
          EventSourcePolyfill.prototype.CLOSED = CLOSED;
          EventSourcePolyfill.prototype.close = function() {
            this._close();
          };
          EventSourcePolyfill.CONNECTING = CONNECTING;
          EventSourcePolyfill.OPEN = OPEN;
          EventSourcePolyfill.CLOSED = CLOSED;
          EventSourcePolyfill.prototype.withCredentials = void 0;
          var R = NativeEventSource;
          if (XMLHttpRequest != void 0 && (NativeEventSource == void 0 || !("withCredentials" in NativeEventSource.prototype))) {
            R = EventSourcePolyfill;
          }
          (function(factory) {
            {
              var v = factory(exports$1);
              if (v !== void 0) module.exports = v;
            }
          })(function(exports$12) {
            exports$12.EventSourcePolyfill = EventSourcePolyfill;
            exports$12.NativeEventSource = NativeEventSource;
            exports$12.EventSource = R;
          });
        })(typeof globalThis === "undefined" ? typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : eventsource : globalThis);
      })(eventsource$1, eventsource$1.exports);
      return eventsource$1.exports;
    }
    var eventsourceExports = requireEventsource();
    let eventSource;
    const getEventSourceParams = () => {
      const jwt = getJwt();
      const orgId = getOrganizationId();
      if (!jwt || !orgId) {
        throw new ValidationError(
          ErrorCode.VALIDATION_MISSING_MESSAGING_URL,
          `JWT or Organization ID is missing for EventSource connection. jwt: ${!!jwt}, orgId: ${!!orgId}`
        );
      }
      const headers = {
        "Authorization": "Bearer " + jwt,
        "X-Org-ID": orgId
      };
      const lastEventId2 = getLastEventId();
      if (lastEventId2) {
        headers["Last-Event-ID"] = lastEventId2;
      }
      return {
        headers,
        heartbeatTimeout: 9e4
      };
    };
    const handleEventSourceListeners = (listenerOperationName, eventListenerMap) => {
      if (typeof eventSource !== "object") {
        throw new ValidationError(
          ErrorCode.VALIDATION_INVALID_EVENT_SOURCE,
          `Expected EventSource object to be a valid object, but received: ${eventSource}`
        );
      }
      if (!listenerOperationName.length) {
        throw new ValidationError(
          ErrorCode.VALIDATION_INVALID_EVENT_LISTENER_OPERATION,
          `Expected a valid string to either add or remove event listeners, but received: ${listenerOperationName}`
        );
      }
      Object.entries(eventListenerMap).forEach((entry) => {
        const [eventName, eventHandler] = entry;
        if (typeof eventName !== "string") {
          throw new ValidationError(
            ErrorCode.VALIDATION_INVALID_EVENT_NAME,
            `Expected event listener name parameter to be a valid string, but received: ${eventName}.`
          );
        }
        if (eventName.trim().length < 1) {
          throw new ValidationError(
            ErrorCode.VALIDATION_INVALID_EVENT_NAME,
            `Expected event listener name parameter to be a string with length greater than 0, but received: ${eventName}.`
          );
        }
        if (typeof eventHandler !== "function") {
          throw new ValidationError(
            ErrorCode.VALIDATION_INVALID_EVENT_HANDLER,
            `Expected event listener handler parameter to be a function, but received: ${eventHandler}.`
          );
        }
        eventSource[listenerOperationName](eventName, eventHandler);
      });
    };
    const createEventSource = (fullApiPath, eventListenerMap) => {
      if (!eventsourceExports.EventSourcePolyfill || typeof eventsourceExports.EventSourcePolyfill !== "function") {
        throw new ConversationConfigurationError(
          ErrorCode.CONVERSATION_EVENT_SOURCE_POLYFILL_MISSING,
          "EventSourcePolyfill is not a constructor.",
          { endpoint: fullApiPath }
        );
      }
      if (typeof fullApiPath !== "string" || !fullApiPath.length) {
        throw new ValidationError(
          ErrorCode.VALIDATION_INVALID_API_PATH,
          `Expected full API path parameter to be a valid string, but received: ${fullApiPath}.`
        );
      }
      if (typeof eventListenerMap !== "object") {
        throw new ValidationError(
          ErrorCode.VALIDATION_INVALID_EVENT_LISTENER_MAP,
          `Expected event listener map parameter to be a valid object map, but received: ${eventListenerMap}.`
        );
      }
      const resolveEventSource = (resolve, reject) => {
        try {
          eventSource = new eventsourceExports.EventSourcePolyfill(fullApiPath, getEventSourceParams());
          eventSource.onopen = () => {
            handleEventSourceListeners("addEventListener", eventListenerMap);
            resolve();
          };
          eventSource.onerror = () => {
            reject();
          };
        } catch (error) {
          reject(error);
        }
      };
      return new Promise(resolveEventSource);
    };
    const subscribeToEventSource = (eventListenerMap) => {
      const messagingUrl = getSalesforceMessagingUrl();
      if (!messagingUrl) {
        return Promise.reject(new ValidationError(
          ErrorCode.VALIDATION_MISSING_MESSAGING_URL,
          `Expected a valid Messaging URL to establish a connection to the Event Source, but instead received ${messagingUrl}`
        ));
      }
      const eventSourceUrl = messagingUrl.concat(`/eventrouter/v1/sse?_ts=${Date.now()}`);
      return new Promise((resolve, reject) => {
        try {
          createEventSource(
            eventSourceUrl,
            eventListenerMap
          ).then(
            resolve,
            (error) => {
              reject(error);
            }
          ).catch((error) => {
            reject(error);
          });
        } catch (error) {
          reject(error);
        }
      });
    };
    const closeEventSource = () => {
      return new Promise((resolve, reject) => {
        try {
          if (eventSource) {
            eventSource.close();
          }
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    };
    const util = {
      /**
       * Generate a UUID.
       */
      generateUUID() {
        const hexDigits = "0123456789abcdef";
        const valueArray = new Uint32Array(32);
        crypto.getRandomValues(valueArray);
        let res = "";
        for (let i = 0; i < 32; i++) {
          if (i === 8 || i === 12 || i === 16 || i === 20) {
            res += "-";
          }
          if (i === 12) {
            res += "4";
          } else if (i === 16) {
            res += hexDigits.charAt(valueArray[i] & 3 | 8);
          } else {
            res += hexDigits.charAt(valueArray[i] & 15);
          }
        }
        return res;
      },
      /**
       * Generates a full style formatted date and time (e.g. 01/01/2024, 10:00:00 AM).
       */
      formatDateTime(timestamp) {
        return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(timestamp);
      },
      getFormattedDate(timestamp) {
        const formattedDateTime = this.formatDateTime(timestamp);
        return formattedDateTime.split(",")[0].trim();
      },
      getFormattedTime(timestamp) {
        const formattedDateTime = this.formatDateTime(timestamp);
        return formattedDateTime.split(",")[1].trim();
      }
    };
    function sendFetchRequest(apiPath, method, mode, requestHeaders, requestBody) {
      const messagingJwt = getItemInWebStorageByKey(STORAGE_KEYS.JWT);
      const headers = requestHeaders ? requestHeaders : {
        "Content-Type": "application/json",
        ...messagingJwt && { "Authorization": "Bearer " + messagingJwt }
      };
      const body = requestBody ? JSON.stringify(requestBody) : void 0;
      return fetch(
        apiPath,
        {
          method,
          mode,
          headers,
          ...body && { body }
        }
      ).then(async (response) => {
        if (response.status === 401) {
          logger.warn("Received 401 Unauthorized - JWT may be expired");
        }
        if (!response.ok) {
          let errorMessage;
          try {
            errorMessage = await response.text();
            if (!errorMessage) {
              errorMessage = response.statusText || `HTTP ${response.status} error`;
            }
          } catch {
            errorMessage = response.statusText || `HTTP ${response.status} error`;
          }
          throw new HttpError(
            ErrorCode.HTTP_ERROR,
            errorMessage,
            response.status,
            response.statusText
          );
        }
        return response;
      });
    }
    function getUnauthenticatedAccessToken() {
      const orgId = getOrganizationId();
      const esDeveloperName = getDeploymentDeveloperName();
      const messagingUrl = getSalesforceMessagingUrl();
      const capabilitiesVersion = APP_CONSTANTS.APP_CAPABILITIES_VERSION;
      const platform = APP_CONSTANTS.APP_PLATFORM;
      if (!messagingUrl) {
        throw new ValidationError(
          ErrorCode.VALIDATION_MISSING_MESSAGING_URL,
          `Messaging URL is required but was undefined. Please ensure the messaging client is properly initialized. Received: ${messagingUrl}`
        );
      }
      if (!orgId) {
        throw new ValidationError(
          ErrorCode.VALIDATION_MISSING_ORGANIZATION_ID,
          `Organization ID is required but was undefined. Received: ${orgId}`
        );
      }
      if (!esDeveloperName) {
        throw new ValidationError(
          ErrorCode.VALIDATION_MISSING_DEPLOYMENT_DEVELOPER_NAME,
          `Deployment developer name is required but was undefined. Received: ${esDeveloperName}`
        );
      }
      const apiPath = `${messagingUrl}/iamessage/api/v2/authorization/unauthenticated/access-token`;
      return sendFetchRequest(
        apiPath,
        "POST",
        "cors",
        {
          "Content-Type": "application/json"
        },
        {
          orgId,
          esDeveloperName,
          capabilitiesVersion,
          platform
        }
      ).then((response) => response.json());
    }
    function createConversation(conversationId2, routingAttributes) {
      const esDeveloperName = getDeploymentDeveloperName();
      const messagingUrl = getSalesforceMessagingUrl();
      const apiPath = `${messagingUrl}/iamessage/api/v2/conversation`;
      return sendFetchRequest(
        apiPath,
        "POST",
        "cors",
        null,
        {
          ...routingAttributes && { routingAttributes },
          esDeveloperName,
          conversationId: conversationId2
        }
      );
    }
    function getContinuityJwt() {
      const messagingUrl = getSalesforceMessagingUrl();
      if (!messagingUrl) {
        throw new ValidationError(
          ErrorCode.VALIDATION_MISSING_MESSAGING_URL,
          `Messaging URL is required but was undefined. Please ensure the messaging client is properly initialized. Received: ${messagingUrl}`
        );
      }
      const apiPath = `${messagingUrl}/iamessage/api/v2/authorization/continuation-access-token`;
      return sendFetchRequest(
        apiPath,
        "GET",
        "cors",
        null,
        null
      ).then((response) => response.json());
    }
    function listConversations(includeClosedConversations = false) {
      const messagingUrl = getSalesforceMessagingUrl();
      const apiPath = `${messagingUrl}/iamessage/api/v2/conversation/list?inclClosedConvs=${includeClosedConversations}&limit=${MESSAGING_API_CONSTANTS.LIST_CONVERSATION_API_NUM_CONVERSATIONS_LIMIT}`;
      return sendFetchRequest(
        apiPath,
        "GET",
        "cors",
        null,
        null
      ).then((response) => response.json());
    }
    function listConversationEntries(conversationId2, startTimestamp, endTimestamp, direction) {
      if (!conversationId2) {
        throw new ValidationError(
          ErrorCode.VALIDATION_MISSING_CONVERSATION_ID,
          `Conversation ID is required but was undefined. Received: ${conversationId2}`
        );
      }
      const messagingUrl = getSalesforceMessagingUrl();
      const limitUrlQueryParam = `${`limit=${MESSAGING_API_CONSTANTS.LIST_CONVERSATION_ENTRIES_API_ENTRIES_LIMIT}`}`;
      const startTimestampUrlQueryParam = `${``}`;
      const endTimestampUrlQueryParam = `${``}`;
      const directionUrlQueryParam = `${``}`;
      const entryTypeFilterUrlQueryParam = `${SUPPORTED_ENTRY_TYPES ? `&entryTypeFilter=${SUPPORTED_ENTRY_TYPES}` : ``}`;
      const apiPath = `${messagingUrl}/iamessage/api/v2/conversation/${conversationId2}/entries?${limitUrlQueryParam}${startTimestampUrlQueryParam}${endTimestampUrlQueryParam}${directionUrlQueryParam}${entryTypeFilterUrlQueryParam}`;
      return sendFetchRequest(
        apiPath,
        "GET",
        "cors",
        null,
        null
      ).then((response) => response.json()).then((responseJson) => {
        const transformedData = [];
        if (typeof responseJson !== "object") {
          throw new ValidationError(
            ErrorCode.VALIDATION_INVALID_RESPONSE_FORMAT,
            `Expected to receive JSON response, instead received ${responseJson}.`
          );
        }
        if (!Array.isArray(responseJson.conversationEntries)) {
          throw new ValidationError(
            ErrorCode.VALIDATION_INVALID_RESPONSE_FORMAT,
            `Expected entries to be an Array, instead was: ${responseJson.conversationEntries}.`
          );
        }
        responseJson.conversationEntries.forEach((conversationEntry) => {
          conversationEntry.conversationId = conversationId2;
          transformedData.push(conversationEntry);
        });
        return transformedData;
      });
    }
    function sendTextMessage(conversationId2, text, messageId, inReplyToMessageId, isNewMessagingSession, routingAttributes, language) {
      const messagingUrl = getSalesforceMessagingUrl();
      const esDeveloperName = getDeploymentDeveloperName();
      const apiPath = `${messagingUrl}/iamessage/api/v2/conversation/${conversationId2}/message`;
      return sendFetchRequest(
        apiPath,
        "POST",
        "cors",
        null,
        {
          message: {
            ...inReplyToMessageId && { inReplyToMessageId },
            id: messageId,
            messageType: CONVERSATION_CONSTANTS.MessageTypes.STATIC_CONTENT_MESSAGE,
            staticContent: {
              formatType: CONVERSATION_CONSTANTS.FormatTypes.TEXT,
              text
            }
          },
          ...routingAttributes && { routingAttributes },
          ...isNewMessagingSession && { isNewMessagingSession },
          esDeveloperName,
          ...language && { language }
        }
      ).then((response) => response.json());
    }
    function closeConversation(conversationId2) {
      const messagingUrl = getSalesforceMessagingUrl();
      const esDeveloperName = getDeploymentDeveloperName();
      const apiPath = `${messagingUrl}/iamessage/api/v2/conversation/${conversationId2}?esDeveloperName=${esDeveloperName}`;
      return sendFetchRequest(
        apiPath,
        "DELETE",
        "cors",
        null,
        null
      );
    }
    function parseServerSentEventData(event) {
      if (event && event.data && typeof event.data === "string") {
        try {
          const data = JSON.parse(event.data);
          if (!data || typeof data !== "object") {
            throw new ValidationError(
              ErrorCode.VALIDATION_INVALID_SERVER_SENT_EVENT_DATA,
              `Error parsing data in server sent event. event.data: ${event.data}`
            );
          } else {
            return data;
          }
        } catch (err) {
          throw new ValidationError(
            ErrorCode.VALIDATION_INVALID_SERVER_SENT_EVENT_DATA,
            `Error parsing data in server sent event. event.data: ${event.data}`,
            err
          );
        }
      } else {
        throw new ValidationError(
          ErrorCode.VALIDATION_INVALID_SERVER_SENT_EVENT_DATA,
          `Invalid data in server sent event. event: ${event}`
        );
      }
    }
    function getSenderRole(data) {
      return data?.conversationEntry?.sender?.role;
    }
    function parseEntryPayload(data) {
      try {
        if (typeof data === "object") {
          let entryPayload;
          try {
            entryPayload = JSON.parse(data.entryPayload);
          } catch (parseErr) {
            throw new ValidationError(
              ErrorCode.VALIDATION_INVALID_CONVERSATION_ENTRY,
              `Failed to parse entry payload JSON. entryPayload: ${data.entryPayload}`,
              parseErr
            );
          }
          if (!Object.values(CONVERSATION_CONSTANTS.EntryTypes).includes(entryPayload.entryType)) {
            throw new ValidationError(
              ErrorCode.VALIDATION_UNSUPPORTED_ENTRY_TYPE,
              `Unexpected and/or unsupported entryType: ${entryPayload.entryType}`
            );
          }
          return {
            ...data,
            entryPayload
          };
        } else {
          throw new ValidationError(
            ErrorCode.VALIDATION_INVALID_CONVERSATION_ENTRY,
            `Expected an object to create a new conversation entry but instead, received ${data}`
          );
        }
      } catch (err) {
        if (err instanceof Error && err.name !== "Error") {
          throw err;
        }
        throw new ConversationConfigurationError(
          ErrorCode.CONVERSATION_FAILED_TO_PARSE_CONVERSATION_ENTRY,
          `Something went wrong while creating a conversation entry: ${err}`,
          void 0,
          err
        );
      }
    }
    function isConversationEntryMessage(conversationEntry) {
      if (conversationEntry) {
        return conversationEntry.entryType === CONVERSATION_CONSTANTS.EntryTypes.CONVERSATION_MESSAGE;
      }
      return false;
    }
    function isMessageFromEndUser(conversationEntry) {
      if (isConversationEntryMessage(conversationEntry)) {
        return conversationEntry.sender.role === CONVERSATION_CONSTANTS.ParticipantRoles.ENDUSER;
      }
      return false;
    }
    function isConversationEntryStaticContentMessage(conversationEntry) {
      if (isConversationEntryMessage(conversationEntry) && "abstractMessage" in conversationEntry.entryPayload) {
        return "messageType" in conversationEntry.entryPayload.abstractMessage && conversationEntry.entryPayload.abstractMessage.messageType === CONVERSATION_CONSTANTS.MessageTypes.STATIC_CONTENT_MESSAGE;
      }
      return false;
    }
    function getStaticContentPayload(conversationEntry) {
      if (isConversationEntryStaticContentMessage(conversationEntry)) {
        return conversationEntry.entryPayload.abstractMessage.staticContent;
      }
      return void 0;
    }
    function isTextMessage(conversationEntry) {
      if (isConversationEntryStaticContentMessage(conversationEntry)) {
        return getStaticContentPayload(conversationEntry)?.formatType === CONVERSATION_CONSTANTS.FormatTypes.TEXT;
      }
      return false;
    }
    function getTextMessageContent(conversationEntry) {
      if (isTextMessage(conversationEntry)) {
        return getStaticContentPayload(conversationEntry)?.text || "";
      }
      return "";
    }
    function isConversationEntryRoutingResultMessage(conversationEntry) {
      return conversationEntry.entryType === CONVERSATION_CONSTANTS.EntryTypes.ROUTING_RESULT;
    }
    function parseJsonInAgentResponse(content) {
      try {
        const jsonBlockStart = "```json";
        const jsonBlockEnd = "```";
        let jsonContent = content.trim();
        if (jsonContent.startsWith(jsonBlockStart) && jsonContent.endsWith(jsonBlockEnd)) {
          jsonContent = jsonContent.slice(jsonBlockStart.length);
          jsonContent = jsonContent.slice(0, -jsonBlockEnd.length);
          jsonContent = jsonContent.trim();
        }
        return JSON.parse(jsonContent);
      } catch {
        if (content.startsWith("```json")) {
          logger.debug(`Response message did not have valid JSON: ${content}`);
        }
      }
    }
    const ConversationEventTypes = {
      ON_EMBEDDED_MESSAGE_SENT: "onEmbeddedMessageSent",
      ON_EMBEDDED_MESSAGING_CONVERSATION_PARTICIPANT_CHANGED: "onEmbeddedMessagingConversationParticipantChanged",
      ON_EMBEDDED_MESSAGE_READ: "onEmbeddedMessageRead",
      ON_EMBEDDED_MESSAGING_CONVERSATION_ROUTED: "onEmbeddedMessagingConversationRouted",
      ON_EMBEDDED_MESSAGING_CONVERSATION_READY: "onEmbeddedMessagingConversationReady",
      ON_EMBEDDED_MESSAGING_CONVERSATION_OPENED: "onEmbeddedMessagingConversationOpened",
      ON_EMBEDDED_MESSAGING_CONVERSATION_STARTED: "onEmbeddedMessagingConversationStarted",
      ON_EMBEDDED_MESSAGING_CONVERSATION_CLOSED: "onEmbeddedMessagingConversationClosed",
      ON_EMBEDDED_MESSAGING_WINDOW_MINIMIZED: "onEmbeddedMessagingWindowMinimized",
      ON_EMBEDDED_MESSAGING_WINDOW_MAXIMIZED: "onEmbeddedMessagingWindowMaximized",
      // below is not current supported in enhanced chat (according to documentation)
      ON_EMBEDDED_MESSAGING_DELIVERED: "onEmbeddedMessagingDelivered",
      ON_EMBEDDED_MESSAGING_TYPING_INDICATOR_STARTED: "onEmbeddedMessagingTypingIndicatorStarted",
      ON_EMBEDDED_MESSAGING_TYPING_INDICATOR_STOPPED: "onEmbeddedMessagingTypingIndicatorStopped",
      ON_EMBEDDED_MESSAGING_LIST_CONVERSATION_ENTRIES: "onEmbeddedMessagingListConversationEntries",
      ON_EMBEDDED_MESSAGING_CONTENT_RECEIVED: "onEmbeddedMessagingContentReceived"
    };
    class ConversationController {
      constructor() {
        __publicField(this, "parsedServerSentEvents", []);
        __publicField(this, "conversationStatus", CONVERSATION_CONSTANTS.ConversationStatus.NOT_STARTED_CONVERSATION);
        __publicField(this, "preChatData");
        __publicField(this, "initialize", ({ organizationId, deploymentDeveloperName, messagingUrl }) => {
          initializeWebStorage({ organizationId, deploymentDeveloperName, messagingUrl });
          this.dispatchEvent(ConversationEventTypes.ON_EMBEDDED_MESSAGING_CONVERSATION_READY);
        });
        /**
         * Dispatch custom DOM events
         */
        __publicField(this, "dispatchEvent", (eventName, detail) => {
          const event = new CustomEvent(eventName, { detail });
          window.dispatchEvent(event);
        });
        /**
         * Initialize conversation - handles both new and existing conversations
         * @param preChatData - Optional pre-chat data to set routing attributes
         */
        __publicField(this, "initializeConversation", async (preChatData) => {
          try {
            if (preChatData) {
              this.preChatData = preChatData;
            }
            const conversationStatePromise = getJwt() ? this.handleExistingConversation() : this.handleNewConversation();
            await conversationStatePromise;
            await this.handleSubscribeToEventSource();
            logger.debug("Conversation initialized successfully");
          } catch (error) {
            logger.error("Failed to initialize conversation:", error);
            throw error;
          }
        });
        /**
         * Cleanup conversation resources
         */
        __publicField(this, "cleanupConversation", async () => {
          try {
            await closeEventSource();
            logger.debug("Closed the Event Source (SSE).");
          } catch (err) {
            logger.error(`Something went wrong in closing the Event Source (SSE): ${err}`);
          }
          clearWebStorage();
          clearInMemoryData();
          this.preChatData = void 0;
          this.updateConversationStatus(CONVERSATION_CONSTANTS.ConversationStatus.CLOSED_CONVERSATION);
        });
        /**
         * Update conversation status and notify listeners
         */
        __publicField(this, "updateConversationStatus", (status) => {
          this.conversationStatus = status;
          const conversationId2 = getConversationId();
          if (typeof conversationId2 !== "string") {
            logger.error("Conversation ID is not defined. Cannot update conversation status.");
            return;
          }
          if (status === CONVERSATION_CONSTANTS.ConversationStatus.OPENED_CONVERSATION) {
            this.dispatchEvent(ConversationEventTypes.ON_EMBEDDED_MESSAGING_CONVERSATION_OPENED);
          } else if (status === CONVERSATION_CONSTANTS.ConversationStatus.CLOSED_CONVERSATION) {
            this.dispatchEvent(ConversationEventTypes.ON_EMBEDDED_MESSAGING_CONVERSATION_CLOSED);
          }
        });
        /**
         * Handles a new conversation
         */
        __publicField(this, "handleNewConversation", async () => {
          try {
            await this.handleGetUnauthenticatedJwt();
            await this.handleCreateNewConversation();
            logger.debug(`Completed initializing a new conversation with conversationId: ${getConversationId()}`);
          } catch (err) {
            logger.error(`Error in handleNewConversation: ${err}`);
            throw err;
          }
        });
        /**
         * Handles an existing conversation
         */
        __publicField(this, "handleExistingConversation", async () => {
          try {
            await this.handleGetContinuityJwt();
            await this.handleListConversations();
            await this.handleListConversationEntries();
            this.updateConversationStatus(CONVERSATION_CONSTANTS.ConversationStatus.OPENED_CONVERSATION);
            logger.debug(`Successfully retrieved entries for the current conversation: ${getConversationId()}`);
          } catch (err) {
            logger.error(`Error in handleExistingConversation: ${err}`);
            throw err;
          }
        });
        /**
         * Handles fetching an Unauthenticated Access Token
         */
        __publicField(this, "handleGetUnauthenticatedJwt", async () => {
          if (getJwt()) {
            logger.warn("Messaging access token (JWT) already exists in the web storage. Discontinuing to create a new Unauthenticated access token.");
            await this.handleExistingConversation();
            return;
          }
          try {
            const response = await getUnauthenticatedAccessToken();
            logger.debug("Successfully fetched an Unauthenticated access token.");
            if (typeof response === "object") {
              setJwt(response.accessToken);
              setLastEventId(response.lastEventId);
              setDeploymentConfiguration(response.context && response.context.configuration && response.context.configuration.embeddedServiceConfig);
            }
          } catch (err) {
            logError(err);
            await this.cleanupConversation();
          }
        });
        /**
         * Handles creating a new conversation
         */
        __publicField(this, "handleCreateNewConversation", async () => {
          if (this.conversationStatus === CONVERSATION_CONSTANTS.ConversationStatus.OPENED_CONVERSATION) {
            logger.warn("Cannot create a new conversation while a conversation is currently open.");
            throw new ConversationConfigurationError(
              ErrorCode.CONVERSATION_ALREADY_OPEN,
              "Conversation already open"
            );
          }
          const conversationId2 = util.generateUUID();
          storeConversationId(conversationId2);
          try {
            await createConversation(getConversationId(), this.preChatData);
            logger.debug(`Successfully created a new conversation with conversation-id: ${getConversationId()}`);
            this.dispatchEvent(ConversationEventTypes.ON_EMBEDDED_MESSAGING_CONVERSATION_STARTED, { conversationId: conversationId2 });
            this.updateConversationStatus(CONVERSATION_CONSTANTS.ConversationStatus.OPENED_CONVERSATION);
          } catch (err) {
            logError(err);
            await this.cleanupConversation();
          }
        });
        /**
         * Handles fetching a Continuation Access Token
         */
        __publicField(this, "handleGetContinuityJwt", async () => {
          try {
            const response = await getContinuityJwt();
            setJwt(response.accessToken);
          } catch (err) {
            logError(err);
          }
        });
        /**
         * Handles fetching a list of all conversations
         */
        __publicField(this, "handleListConversations", async () => {
          try {
            const response = await listConversations();
            if (response && response.openConversationsFound > 0 && response.conversations.length) {
              const openConversations = response.conversations;
              if (openConversations.length > 1) {
                logger.warn(`Expected the user to be participating in 1 open conversation but instead found ${openConversations.length}. Loading the conversation with latest startTimestamp.`);
                openConversations.sort((conversationA, conversationB) => conversationB.startTimestamp - conversationA.startTimestamp);
              }
              storeConversationId(openConversations[0].conversationId);
            } else {
              await this.cleanupConversation();
            }
          } catch (err) {
            logError(err);
          }
        });
        /**
         * Handles fetching conversation entries
         */
        __publicField(this, "handleListConversationEntries", async () => {
          try {
            const response = await listConversationEntries(getConversationId());
            if (Array.isArray(response)) {
              response.reverse().filter((conversationEntry) => {
                return conversationEntry.conversationId === getConversationId() && (conversationEntry.entryType === CONVERSATION_CONSTANTS.EntryTypes.CONVERSATION_MESSAGE || conversationEntry.entryType === CONVERSATION_CONSTANTS.EntryTypes.PARTICIPANT_CHANGED || conversationEntry.entryType === CONVERSATION_CONSTANTS.EntryTypes.ROUTING_RESULT);
              });
              this.dispatchEvent(ConversationEventTypes.ON_EMBEDDED_MESSAGING_LIST_CONVERSATION_ENTRIES, { entries: response });
            } else {
              logger.error(`Expecting a response of type Array from listConversationEntries but instead received: ${response}`);
            }
          } catch (err) {
            logError(err);
          }
        });
        /**
         * Handles establishing connection to EventSource
         */
        __publicField(this, "handleSubscribeToEventSource", async () => {
          try {
            await subscribeToEventSource({
              [CONVERSATION_CONSTANTS.EventTypes.CONVERSATION_MESSAGE]: this.handleConversationMessageServerSentEvent,
              [CONVERSATION_CONSTANTS.EventTypes.CONVERSATION_ROUTING_RESULT]: this.handleRoutingResultServerSentEvent,
              [CONVERSATION_CONSTANTS.EventTypes.CONVERSATION_PARTICIPANT_CHANGED]: this.handleParticipantChangedServerSentEvent,
              [CONVERSATION_CONSTANTS.EventTypes.CONVERSATION_TYPING_STARTED_INDICATOR]: this.handleTypingStartedIndicatorServerSentEvent,
              [CONVERSATION_CONSTANTS.EventTypes.CONVERSATION_TYPING_STOPPED_INDICATOR]: this.handleTypingStoppedIndicatorServerSentEvent,
              [CONVERSATION_CONSTANTS.EventTypes.CONVERSATION_DELIVERY_ACKNOWLEDGEMENT]: this.handleConversationDeliveryAcknowledgementServerSentEvent,
              [CONVERSATION_CONSTANTS.EventTypes.CONVERSATION_READ_ACKNOWLEDGEMENT]: this.handleConversationReadAcknowledgementServerSentEvent,
              [CONVERSATION_CONSTANTS.EventTypes.CONVERSATION_CLOSE_CONVERSATION]: this.handleCloseConversationServerSentEvent
            });
            logger.debug("Subscribed to the Event Source (SSE).");
          } catch (err) {
            logError(err);
          }
        });
        /**
         * Generate a Conversation Entry object from server sent event
         */
        __publicField(this, "generateConversationEntryForServerSentEvent", (parsedServerSentEvent) => {
          const conversationEntry = parseEntryPayload(parsedServerSentEvent.conversationEntry);
          if (parsedServerSentEvent.conversationId === getConversationId()) {
            return conversationEntry;
          }
          throw new ConversationConfigurationError(
            ErrorCode.CONVERSATION_ID_MISMATCH,
            `Current conversation-id: ${getConversationId()} does not match the conversation-id in server sent event: ${parsedServerSentEvent.conversationId}. Ignoring the event.`,
            {
              currentConversationId: getConversationId(),
              eventConversationId: parsedServerSentEvent.conversationId
            }
          );
        });
        /**
         * Handle CONVERSATION_MESSAGE server-sent event
         */
        __publicField(this, "handleConversationMessageServerSentEvent", (event) => {
          try {
            if (event && event.lastEventId) {
              setLastEventId(event.lastEventId);
            }
            const parsedEventData = parseServerSentEventData(event);
            this.parsedServerSentEvents.push(parsedEventData);
            const conversationEntry = this.generateConversationEntryForServerSentEvent(parsedEventData);
            if (isConversationEntryStaticContentMessage(conversationEntry) && !isMessageFromEndUser(conversationEntry)) {
              const content = parseJsonInAgentResponse(conversationEntry.entryPayload.abstractMessage.staticContent.text);
              if (content !== void 0 && content !== null) {
                logger.debug(`Static content message text: `, content);
                this.dispatchEvent(ConversationEventTypes.ON_EMBEDDED_MESSAGING_CONTENT_RECEIVED, { content });
              }
            }
            this.dispatchEvent(ConversationEventTypes.ON_EMBEDDED_MESSAGE_SENT, parsedEventData);
          } catch (err) {
            logger.error(`Something went wrong in handling conversation message server sent event: ${err}`);
          }
        });
        /**
         * Handle ROUTING_RESULT server-sent event
         */
        __publicField(this, "handleRoutingResultServerSentEvent", (event) => {
          try {
            if (event && event.lastEventId) {
              setLastEventId(event.lastEventId);
            }
            const parsedEventData = parseServerSentEventData(event);
            this.parsedServerSentEvents.push(parsedEventData);
            const conversationEntry = this.generateConversationEntryForServerSentEvent(parsedEventData);
            if (!isConversationEntryRoutingResultMessage(conversationEntry)) {
              return;
            }
            if (conversationEntry.entryPayload.routingType === CONVERSATION_CONSTANTS.RoutingTypes.INITIAL) {
              switch (conversationEntry.entryPayload.failureType) {
                case CONVERSATION_CONSTANTS.RoutingFailureTypes.NO_ERROR:
                case CONVERSATION_CONSTANTS.RoutingFailureTypes.SUBMISSION_ERROR:
                case CONVERSATION_CONSTANTS.RoutingFailureTypes.ROUTING_ERROR:
                case CONVERSATION_CONSTANTS.RoutingFailureTypes.UNKNOWN_ERROR:
                  this.dispatchEvent(ConversationEventTypes.ON_EMBEDDED_MESSAGING_CONVERSATION_ROUTED, parsedEventData);
                  break;
                default:
                  logger.error(`Unrecognized initial routing failure type: ${conversationEntry.entryPayload.failureType}`);
              }
            } else if (conversationEntry.entryPayload.routingType === CONVERSATION_CONSTANTS.RoutingTypes.TRANSFER) {
              switch (conversationEntry.entryPayload.failureType) {
                case CONVERSATION_CONSTANTS.RoutingFailureTypes.NO_ERROR:
                  this.dispatchEvent(ConversationEventTypes.ON_EMBEDDED_MESSAGING_CONVERSATION_ROUTED, parsedEventData);
                  break;
                case CONVERSATION_CONSTANTS.RoutingFailureTypes.SUBMISSION_ERROR:
                case CONVERSATION_CONSTANTS.RoutingFailureTypes.ROUTING_ERROR:
                case CONVERSATION_CONSTANTS.RoutingFailureTypes.UNKNOWN_ERROR:
                  break;
                default:
                  logger.error(`Unrecognized transfer routing failure type: ${conversationEntry.entryPayload.failureType}`);
              }
            } else {
              logger.error(`Unrecognized routing type: ${conversationEntry.entryPayload.routingType}`);
            }
          } catch (err) {
            logger.error(`Something went wrong in handling routing result server sent event: ${err}`);
          }
        });
        /**
         * Handle PARTICIPANT_CHANGED server-sent event
         */
        __publicField(this, "handleParticipantChangedServerSentEvent", (event) => {
          try {
            if (event && event.lastEventId) {
              setLastEventId(event.lastEventId);
            }
            const parsedEventData = parseServerSentEventData(event);
            this.parsedServerSentEvents.push(parsedEventData);
            this.dispatchEvent(ConversationEventTypes.ON_EMBEDDED_MESSAGING_CONVERSATION_PARTICIPANT_CHANGED, parsedEventData);
          } catch (err) {
            logger.error(`Something went wrong in handling participant changed server sent event: ${err}`);
          }
        });
        /**
         * Handle TYPING_STARTED_INDICATOR server-sent event
         */
        __publicField(this, "handleTypingStartedIndicatorServerSentEvent", (event) => {
          try {
            if (event && event.lastEventId) {
              setLastEventId(event.lastEventId);
            }
            const parsedEventData = parseServerSentEventData(event);
            this.parsedServerSentEvents.push(parsedEventData);
            if (getConversationId() === parsedEventData.conversationId) {
              if (getSenderRole(parsedEventData) !== CONVERSATION_CONSTANTS.ParticipantRoles.ENDUSER) {
                this.dispatchEvent(ConversationEventTypes.ON_EMBEDDED_MESSAGING_TYPING_INDICATOR_STARTED, parsedEventData);
              }
            }
          } catch (err) {
            logger.error(`Something went wrong in handling typing started indicator server sent event: ${err}`);
          }
        });
        /**
         * Handle TYPING_STOPPED_INDICATOR server-sent event
         */
        __publicField(this, "handleTypingStoppedIndicatorServerSentEvent", (event) => {
          try {
            if (event && event.lastEventId) {
              setLastEventId(event.lastEventId);
            }
            const parsedEventData = parseServerSentEventData(event);
            this.parsedServerSentEvents.push(parsedEventData);
            if (getConversationId() === parsedEventData.conversationId) {
              this.dispatchEvent(ConversationEventTypes.ON_EMBEDDED_MESSAGING_TYPING_INDICATOR_STOPPED, parsedEventData);
            }
          } catch (err) {
            logger.error(`Something went wrong in handling typing stopped indicator server sent event: ${err}`);
          }
        });
        /**
         * Handle CONVERSATION_DELIVERY_ACKNOWLEDGEMENT server-sent event
         */
        __publicField(this, "handleConversationDeliveryAcknowledgementServerSentEvent", (event) => {
          try {
            if (event && event.lastEventId) {
              setLastEventId(event.lastEventId);
            }
            const parsedEventData = parseServerSentEventData(event);
            this.parsedServerSentEvents.push(parsedEventData);
            if (getConversationId() === parsedEventData.conversationId) {
              if (parsedEventData.conversationEntry.relatedRecords && parsedEventData.conversationEntry.relatedRecords.length) {
                this.dispatchEvent(ConversationEventTypes.ON_EMBEDDED_MESSAGING_DELIVERED, parsedEventData);
              }
            }
          } catch (err) {
            logger.error(`Something went wrong in handling conversation delivery acknowledgement server sent event: ${err}`);
          }
        });
        /**
         * Handle CONVERSATION_READ_ACKNOWLEDGEMENT server-sent event
         */
        __publicField(this, "handleConversationReadAcknowledgementServerSentEvent", (event) => {
          try {
            if (event && event.lastEventId) {
              setLastEventId(event.lastEventId);
            }
            const parsedEventData = parseServerSentEventData(event);
            this.parsedServerSentEvents.push(parsedEventData);
            if (getConversationId() === parsedEventData.conversationId) {
              if (parsedEventData.conversationEntry.relatedRecords && parsedEventData.conversationEntry.relatedRecords.length) {
                this.dispatchEvent(ConversationEventTypes.ON_EMBEDDED_MESSAGE_READ, parsedEventData);
              }
            }
          } catch (err) {
            logger.error(`Something went wrong in handling conversation read acknowledgement server sent event: ${err}`);
          }
        });
        /**
         * Handle CONVERSATION_CLOSED server-sent event
         */
        __publicField(this, "handleCloseConversationServerSentEvent", (event) => {
          try {
            if (event && event.lastEventId) {
              setLastEventId(event.lastEventId);
            }
            const parsedEventData = parseServerSentEventData(event);
            if (getConversationId() === parsedEventData.conversationId) {
              this.dispatchEvent(ConversationEventTypes.ON_EMBEDDED_MESSAGING_CONVERSATION_CLOSED);
              this.updateConversationStatus(CONVERSATION_CONSTANTS.ConversationStatus.CLOSED_CONVERSATION);
            }
          } catch (err) {
            logger.error(`Something went wrong while handling conversation closed server sent event in conversation ${getConversationId()}: ${err}`);
          }
        });
        /**
         * Send a text message
         * Internal method with full parameter support
         */
        __publicField(this, "sendTextMessageInternal", async (conversationId2, value, messageId, inReplyToMessageId, isNewMessagingSession, routingAttributes, language) => {
          try {
            const routingAttrs = routingAttributes || this.preChatData;
            await sendTextMessage(conversationId2, value, messageId, inReplyToMessageId, isNewMessagingSession, routingAttrs, language);
          } catch (err) {
            logError(err);
            throw err;
          }
        });
        /**
         * Send a text message (public API - simplified)
         * @param value - The message text to send
         */
        __publicField(this, "sendTextMessage", async (value) => {
          const conversationId2 = getConversationId();
          if (!conversationId2) {
            logger.error("Cannot send message: No active conversation");
            throw new ConversationConfigurationError(
              ErrorCode.CONVERSATION_NO_ACTIVE_CONVERSATION,
              "No active conversation"
            );
          }
          const messageId = util.generateUUID();
          let inReplyToMessageId;
          for (let i = this.parsedServerSentEvents.length - 1; i >= 0; i--) {
            const parsedEventData = this.parsedServerSentEvents[i];
            const conversationEntry = this.generateConversationEntryForServerSentEvent(parsedEventData);
            if (!conversationEntry) {
              continue;
            }
            if (isMessageFromEndUser(conversationEntry)) {
              continue;
            }
            inReplyToMessageId = conversationEntry.identifier;
            break;
          }
          const routingAttributes = this.preChatData;
          const language = void 0;
          await this.sendTextMessageInternal(conversationId2, value, messageId, inReplyToMessageId, void 0, routingAttributes, language);
        });
        /**
         * End the current conversation
         */
        __publicField(this, "endConversation", async () => {
          if (this.conversationStatus === CONVERSATION_CONSTANTS.ConversationStatus.OPENED_CONVERSATION) {
            try {
              await closeConversation(getConversationId());
              logger.debug(`Successfully closed the conversation with conversation-id: ${getConversationId()}`);
            } catch (err) {
              logger.error(`Something went wrong in closing the conversation with conversation-id ${getConversationId()}: ${err}`);
            } finally {
              await this.cleanupConversation();
            }
          }
        });
        /**
         * Start a new conversation
         * @param preChatData - Optional pre-chat data to set routing attributes
         */
        __publicField(this, "startNewConversation", async (preChatData) => {
          await this.endConversation();
          this.parsedServerSentEvents = [];
          if (preChatData) {
            this.preChatData = preChatData;
          }
          await this.handleNewConversation();
          logger.debug("New conversation created successfully");
        });
        /**
         * Check if a session exists
         */
        __publicField(this, "sessionExists", () => {
          return getJwt() !== void 0;
        });
        /**
         * Minimize the conversation UI
         */
        __publicField(this, "minimize", () => {
          this.dispatchEvent(ConversationEventTypes.ON_EMBEDDED_MESSAGING_WINDOW_MINIMIZED, {});
        });
        /**
         * Maximize the conversation UI
         */
        __publicField(this, "maximize", () => {
          this.dispatchEvent(ConversationEventTypes.ON_EMBEDDED_MESSAGING_WINDOW_MAXIMIZED, {});
        });
      }
    }
    const conversationController = new ConversationController();
    if (typeof window !== "undefined") {
      window.AdaptiveWebsite = {
        initialize: conversationController.initialize,
        sendTextMessage: conversationController.sendTextMessage,
        minimize: conversationController.minimize,
        maximize: conversationController.maximize,
        initializeConversation: conversationController.initializeConversation,
        cleanupConversation: conversationController.cleanupConversation,
        startNewConversation: conversationController.startNewConversation,
        endConversation: conversationController.endConversation,
        sessionExists: conversationController.sessionExists,
        Events: ConversationEventTypes,
        util: {
          isConversationEntryStaticContentMessage,
          isMessageFromEndUser,
          isTextMessage,
          parseEntryPayload,
          parseJsonInAgentResponse,
          getTextMessageContent
        }
      };
    }
  })();
  
  }
  
  function addAppToPage() {
    // Contents of build file (lwc-app/dist/lwc-app.js)
  (function () {
      'use strict';
  
      /**
       * Copyright (c) 2026 Salesforce, Inc.
       */
      /**
       * Copyright (c) 2026 Salesforce, Inc.
       */
      /*
       * Copyright (c) 2018, salesforce.com, inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      /**
       *
       * @param value
       * @param msg
       */
      function invariant(value, msg) {
        if (!value) {
          throw new Error(`Invariant Violation: ${msg}`);
        }
      }
      /**
       *
       * @param value
       * @param msg
       */
      function isTrue$1(value, msg) {
        if (!value) {
          throw new Error(`Assert Violation: ${msg}`);
        }
      }
      /**
       *
       * @param value
       * @param msg
       */
      function isFalse$1(value, msg) {
        if (value) {
          throw new Error(`Assert Violation: ${msg}`);
        }
      }
      /**
       *
       * @param msg
       */
      function fail(msg) {
        throw new Error(msg);
      }
      var assert = /*#__PURE__*/Object.freeze({
        __proto__: null,
        fail: fail,
        invariant: invariant,
        isFalse: isFalse$1,
        isTrue: isTrue$1
      });
  
      /*
       * Copyright (c) 2024, Salesforce, Inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      const {
        /** Detached {@linkcode Object.assign}; see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign MDN Reference}. */
        assign,
        /** Detached {@linkcode Object.create}; see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create MDN Reference}. */
        create,
        /** Detached {@linkcode Object.defineProperties}; see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties MDN Reference}. */
        defineProperties,
        /** Detached {@linkcode Object.defineProperty}; see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty MDN Reference}. */
        defineProperty,
        /** Detached {@linkcode Object.entries}; see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries MDN Reference}. */
        entries,
        /** Detached {@linkcode Object.freeze}; see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze MDN Reference}. */
        freeze,
        /** Detached {@linkcode Object.getOwnPropertyDescriptor}; see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor MDN Reference}. */
        getOwnPropertyDescriptor: getOwnPropertyDescriptor$1,
        /** Detached {@linkcode Object.getOwnPropertyDescriptors}; see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors MDN Reference}. */
        getOwnPropertyDescriptors,
        /** Detached {@linkcode Object.getOwnPropertyNames}; see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames MDN Reference}. */
        getOwnPropertyNames: getOwnPropertyNames$1,
        /** Detached {@linkcode Object.getPrototypeOf}; see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf MDN Reference}. */
        getPrototypeOf: getPrototypeOf$1,
        /** Detached {@linkcode Object.hasOwnProperty}; see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty MDN Reference}. */
        hasOwnProperty: hasOwnProperty$1,
        /** Detached {@linkcode Object.isFrozen}; see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen MDN Reference}. */
        isFrozen,
        /** Detached {@linkcode Object.keys}; see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys MDN Reference}. */
        keys,
        /** Detached {@linkcode Object.seal}; see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal MDN Reference}. */
        seal,
        /** Detached {@linkcode Object.setPrototypeOf}; see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf MDN Reference}. */
        setPrototypeOf
      } = Object;
      const {
        /** Detached {@linkcode Array.isArray}; see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray MDN Reference}. */
        isArray: isArray$1,
        /** Detached {@linkcode Array.from}; see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from MDN Reference}. */
        from: ArrayFrom
      } = Array;
      // For some reason, JSDoc don't get picked up for multiple renamed destructured constants (even
      // though it works fine for one, e.g. isArray), so comments for these are added to the export
      // statement, rather than this declaration.
      const {
        filter: ArrayFilter,
        indexOf: ArrayIndexOf,
        join: ArrayJoin,
        map: ArrayMap,
        pop: ArrayPop,
        push: ArrayPush$1,
        slice: ArraySlice,
        splice: ArraySplice,
        unshift: ArrayUnshift,
        forEach // Weird anomaly!
      } = Array.prototype;
      /** Detached {@linkcode String.fromCharCode}; see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode MDN Reference}. */
      const {
        fromCharCode: StringFromCharCode
      } = String;
      // No JSDocs here - see comment for Array.prototype
      const {
        charAt: StringCharAt,
        charCodeAt: StringCharCodeAt,
        replace: StringReplace,
        slice: StringSlice,
        toLowerCase: StringToLowerCase,
        trim: StringTrim
      } = String.prototype;
      /**
       * Determines whether the argument is `undefined`.
       * @param obj Value to test
       * @returns `true` if the value is `undefined`.
       */
      function isUndefined$1(obj) {
        return obj === undefined;
      }
      /**
       * Determines whether the argument is `null`.
       * @param obj Value to test
       * @returns `true` if the value is `null`.
       */
      function isNull(obj) {
        return obj === null;
      }
      /**
       * Determines whether the argument is `true`.
       * @param obj Value to test
       * @returns `true` if the value is `true`.
       */
      function isTrue(obj) {
        return obj === true;
      }
      /**
       * Determines whether the argument is `false`.
       * @param obj Value to test
       * @returns `true` if the value is `false`.
       */
      function isFalse(obj) {
        return obj === false;
      }
      /**
       * Determines whether the argument is a function.
       * @param obj Value to test
       * @returns `true` if the value is a function.
       */
      // Replacing `Function` with a narrower type that works for all our use cases is tricky...
      // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
      function isFunction$1(obj) {
        return typeof obj === 'function';
      }
      /**
       * Determines whether the argument is an object or null.
       * @param obj Value to test
       * @returns `true` if the value is an object or null.
       */
      function isObject(obj) {
        return typeof obj === 'object';
      }
      /**
       * Determines whether the argument is a string.
       * @param obj Value to test
       * @returns `true` if the value is a string.
       */
      function isString(obj) {
        return typeof obj === 'string';
      }
      /** Does nothing! 🚀 */
      function noop() {
        /* Do nothing */
      }
      const OtS = {}.toString;
      /**
       * Converts the argument to a string, safely accounting for objects with "null" prototype.
       * Note that `toString(null)` returns `"[object Null]"` rather than `"null"`.
       * @param obj Value to convert to a string.
       * @returns String representation of the value.
       */
      function toString(obj) {
        if (obj?.toString) {
          // Arrays might hold objects with "null" prototype So using
          // Array.prototype.toString directly will cause an error Iterate through
          // all the items and handle individually.
          if (isArray$1(obj)) {
            // This behavior is slightly different from Array#toString:
            // 1. Array#toString calls `this.join`, rather than Array#join
            // Ex: arr = []; arr.join = () => 1; arr.toString() === 1; toString(arr) === ''
            // 2. Array#toString delegates to Object#toString if `this.join` is not a function
            // Ex: arr = []; arr.join = 'no'; arr.toString() === '[object Array]; toString(arr) = ''
            // 3. Array#toString converts null/undefined to ''
            // Ex: arr = [null, undefined]; arr.toString() === ','; toString(arr) === '[object Null],undefined'
            // 4. Array#toString converts recursive references to arrays to ''
            // Ex: arr = [1]; arr.push(arr, 2); arr.toString() === '1,,2'; toString(arr) throws
            // Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toString
            return ArrayJoin.call(ArrayMap.call(obj, toString), ',');
          }
          return obj.toString();
        } else if (typeof obj === 'object') {
          // This catches null and returns "[object Null]". Weird, but kept for backwards compatibility.
          return OtS.call(obj);
        } else {
          return String(obj);
        }
      }
      /**
       * Gets the property descriptor for the given object and property key. Similar to
       * {@linkcode Object.getOwnPropertyDescriptor}, but looks up the prototype chain.
       * @param o Value to get the property descriptor for
       * @param p Property key to get the descriptor for
       * @returns The property descriptor for the given object and property key.
       */
      function getPropertyDescriptor(o, p) {
        do {
          const d = getOwnPropertyDescriptor$1(o, p);
          if (!isUndefined$1(d)) {
            return d;
          }
          o = getPrototypeOf$1(o);
        } while (o !== null);
      }
  
      /*
       * Copyright (c) 2023, salesforce.com, inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      // These must be updated when the enum is updated.
      // It's a bit annoying to do have to do this manually, but this makes the file tree-shakeable,
      // passing the `verify-treeshakeable.js` test.
      const allVersions = [58 /* APIVersion.V58_244_SUMMER_23 */, 59 /* APIVersion.V59_246_WINTER_24 */, 60 /* APIVersion.V60_248_SPRING_24 */, 61 /* APIVersion.V61_250_SUMMER_24 */, 62 /* APIVersion.V62_252_WINTER_25 */, 63 /* APIVersion.V63_254_SPRING_25 */, 64 /* APIVersion.V64_256_SUMMER_25 */, 65 /* APIVersion.V65_258_WINTER_26 */, 66 /* APIVersion.V66_260_SPRING_26 */];
      const LOWEST_API_VERSION = allVersions[0];
      /**
       * @param apiVersionFeature
       */
      function minApiVersion(apiVersionFeature) {
        switch (apiVersionFeature) {
          case 0 /* APIFeature.LOWERCASE_SCOPE_TOKENS */:
          case 1 /* APIFeature.TREAT_ALL_PARSE5_ERRORS_AS_ERRORS */:
            return 59 /* APIVersion.V59_246_WINTER_24 */;
          case 3 /* APIFeature.DISABLE_OBJECT_REST_SPREAD_TRANSFORMATION */:
          case 4 /* APIFeature.SKIP_UNNECESSARY_REGISTER_DECORATORS */:
          case 5 /* APIFeature.USE_COMMENTS_FOR_FRAGMENT_BOOKENDS */:
          case 2 /* APIFeature.USE_FRAGMENTS_FOR_LIGHT_DOM_SLOTS */:
            return 60 /* APIVersion.V60_248_SPRING_24 */;
          case 7 /* APIFeature.ENABLE_ELEMENT_INTERNALS_AND_FACE */:
          case 6 /* APIFeature.USE_LIGHT_DOM_SLOT_FORWARDING */:
            return 61 /* APIVersion.V61_250_SUMMER_24 */;
          case 8 /* APIFeature.ENABLE_THIS_DOT_HOST_ELEMENT */:
          case 9 /* APIFeature.ENABLE_THIS_DOT_STYLE */:
          case 10 /* APIFeature.TEMPLATE_CLASS_NAME_OBJECT_BINDING */:
            return 62 /* APIVersion.V62_252_WINTER_25 */;
          case 11 /* APIFeature.ENABLE_COMPLEX_TEMPLATE_EXPRESSIONS */:
            return 66 /* APIVersion.V66_260_SPRING_26 */;
        }
      }
      /**
       *
       * @param apiVersionFeature
       * @param apiVersion
       */
      function isAPIFeatureEnabled(apiVersionFeature, apiVersion) {
        return apiVersion >= minApiVersion(apiVersionFeature);
      }
  
      /*
       * Copyright (c) 2018, salesforce.com, inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      /**
       * According to the following list, there are 48 aria attributes of which two (ariaDropEffect and
       * ariaGrabbed) are deprecated:
       * https://www.w3.org/TR/wai-aria-1.1/#x6-6-definitions-of-states-and-properties-all-aria-attributes
       *
       * The above list of 46 aria attributes is consistent with the following resources:
       * https://github.com/w3c/aria/pull/708/files#diff-eacf331f0ffc35d4b482f1d15a887d3bR11060
       * https://wicg.github.io/aom/spec/aria-reflection.html
       *
       * NOTE: If you update this list, please update test files that implicitly reference this list!
       * Searching the codebase for `aria-flowto` and `ariaFlowTo` should be good enough to find all usages.
       */
      const AriaPropertyNames = ['ariaActiveDescendant', 'ariaAtomic', 'ariaAutoComplete', 'ariaBusy', 'ariaChecked', 'ariaColCount', 'ariaColIndex', 'ariaColIndexText', 'ariaColSpan', 'ariaControls', 'ariaCurrent', 'ariaDescribedBy', 'ariaDescription', 'ariaDetails', 'ariaDisabled', 'ariaErrorMessage', 'ariaExpanded', 'ariaFlowTo', 'ariaHasPopup', 'ariaHidden', 'ariaInvalid', 'ariaKeyShortcuts', 'ariaLabel', 'ariaLabelledBy', 'ariaLevel', 'ariaLive', 'ariaModal', 'ariaMultiLine', 'ariaMultiSelectable', 'ariaOrientation', 'ariaOwns', 'ariaPlaceholder', 'ariaPosInSet', 'ariaPressed', 'ariaReadOnly', 'ariaRelevant', 'ariaRequired', 'ariaRoleDescription', 'ariaRowCount', 'ariaRowIndex', 'ariaRowIndexText', 'ariaRowSpan', 'ariaSelected', 'ariaSetSize', 'ariaSort', 'ariaValueMax', 'ariaValueMin', 'ariaValueNow', 'ariaValueText', 'ariaBrailleLabel', 'ariaBrailleRoleDescription', 'role'];
      const {
        AriaAttrNameToPropNameMap,
        AriaPropNameToAttrNameMap
      } = /*@__PURE__*/(() => {
        const AriaAttrNameToPropNameMap = create(null);
        const AriaPropNameToAttrNameMap = create(null);
        // Synthetic creation of all AOM property descriptors for Custom Elements
        forEach.call(AriaPropertyNames, propName => {
          const attrName = StringToLowerCase.call(StringReplace.call(propName, /^aria/, () => 'aria-'));
          // These type assertions are because the map types are a 1:1 mapping of ariaX to aria-x.
          // TypeScript knows we have one of ariaX | ariaY and one of aria-x | aria-y, and tries to
          // prevent us from doing ariaX: aria-y, but we that it's safe.
          AriaAttrNameToPropNameMap[attrName] = propName;
          AriaPropNameToAttrNameMap[propName] = attrName;
        });
        return {
          AriaAttrNameToPropNameMap,
          AriaPropNameToAttrNameMap
        };
      })();
  
      /*
       * Copyright (c) 2024, salesforce.com, inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      const ContextEventName = 'lightning:context-request';
      let contextKeys;
      function getContextKeys() {
        return contextKeys;
      }
      function isTrustedContext(target) {
        {
          // The runtime didn't set a trustedContext set
          // this check should only be performed for runtimes that care about filtering context participants to track
          return true;
        }
      }
  
      /*
       * Copyright (c) 2023, Salesforce.com, inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      const KEY__SHADOW_RESOLVER = '$shadowResolver$';
      const KEY__SHADOW_STATIC = '$shadowStaticNode$';
      const KEY__SHADOW_TOKEN = '$shadowToken$';
      const KEY__SYNTHETIC_MODE = '$$lwc-synthetic-mode';
      const KEY__SCOPED_CSS = '$scoped$';
      const KEY__NATIVE_ONLY_CSS = '$nativeOnly$';
      const KEY__NATIVE_GET_ELEMENT_BY_ID = '$nativeGetElementById$';
      const KEY__NATIVE_QUERY_SELECTOR_ALL = '$nativeQuerySelectorAll$';
      const XML_NAMESPACE = 'http://www.w3.org/XML/1998/namespace';
      const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
      const XLINK_NAMESPACE = 'http://www.w3.org/1999/xlink';
  
      /*
       * Copyright (c) 2020, salesforce.com, inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      const CAMEL_REGEX = /-([a-z])/g;
      // These are HTML standard prop/attribute IDL mappings, but are not predictable based on camel/kebab-case conversion
      const SPECIAL_PROPERTY_ATTRIBUTE_MAPPING = /*@__PURE__@*/new Map([['accessKey', 'accesskey'], ['readOnly', 'readonly'], ['tabIndex', 'tabindex'], ['bgColor', 'bgcolor'], ['colSpan', 'colspan'], ['rowSpan', 'rowspan'], ['contentEditable', 'contenteditable'], ['crossOrigin', 'crossorigin'], ['dateTime', 'datetime'], ['formAction', 'formaction'], ['isMap', 'ismap'], ['maxLength', 'maxlength'], ['minLength', 'minlength'], ['noValidate', 'novalidate'], ['useMap', 'usemap'], ['htmlFor', 'for']]);
      // Global properties that this framework currently reflects. For CSR, the native
      // descriptors for these properties are added from HTMLElement.prototype to
      // LightningElement.prototype. For SSR, in order to match CSR behavior, this
      // list is used to determine which attributes to reflect.
      const REFLECTIVE_GLOBAL_PROPERTY_SET = /*@__PURE__@*/new Set(['accessKey', 'dir', 'draggable', 'hidden', 'id', 'lang', 'spellcheck', 'tabIndex', 'title']);
      /**
       * Map associating previously transformed HTML property into HTML attribute.
       */
      const CACHED_PROPERTY_ATTRIBUTE_MAPPING = /*@__PURE__@*/new Map();
      /**
       *
       * @param propName
       */
      function htmlPropertyToAttribute(propName) {
        const ariaAttributeName = AriaPropNameToAttrNameMap[propName];
        if (!isUndefined$1(ariaAttributeName)) {
          return ariaAttributeName;
        }
        const specialAttributeName = SPECIAL_PROPERTY_ATTRIBUTE_MAPPING.get(propName);
        if (!isUndefined$1(specialAttributeName)) {
          return specialAttributeName;
        }
        const cachedAttributeName = CACHED_PROPERTY_ATTRIBUTE_MAPPING.get(propName);
        if (!isUndefined$1(cachedAttributeName)) {
          return cachedAttributeName;
        }
        let attributeName = '';
        for (let i = 0, len = propName.length; i < len; i++) {
          const code = StringCharCodeAt.call(propName, i);
          if (code >= 65 &&
          // "A"
          code <= 90 // "Z"
          ) {
            attributeName += '-' + StringFromCharCode(code + 32);
          } else {
            attributeName += StringFromCharCode(code);
          }
        }
        CACHED_PROPERTY_ATTRIBUTE_MAPPING.set(propName, attributeName);
        return attributeName;
      }
      /**
       * Map associating previously transformed kabab-case attributes into camel-case props.
       */
      const CACHED_KEBAB_CAMEL_MAPPING = /*@__PURE__@*/new Map();
      /**
       *
       * @param attrName
       */
      function kebabCaseToCamelCase(attrName) {
        let result = CACHED_KEBAB_CAMEL_MAPPING.get(attrName);
        if (isUndefined$1(result)) {
          result = StringReplace.call(attrName, CAMEL_REGEX, g => g[1].toUpperCase());
          CACHED_KEBAB_CAMEL_MAPPING.set(attrName, result);
        }
        return result;
      }
  
      /*
       * Copyright (c) 2020, salesforce.com, inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      /**
       * [ncls] - Normalize class name attribute.
       *
       * Transforms the provided class property value from an object/string into a string the diffing algo
       * can operate on.
       *
       * This implementation is borrowed from Vue:
       * https://github.com/vuejs/core/blob/e790e1bdd7df7be39e14780529db86e4da47a3db/packages/shared/src/normalizeProp.ts#L63-L82
       */
      function normalizeClass(value) {
        if (isUndefined$1(value) || isNull(value)) {
          // Returning undefined here improves initial render cost, because the old vnode's class will be considered
          // undefined in the `patchClassAttribute` routine, so `oldClass === newClass` will be true so we return early
          return undefined;
        }
        let res = '';
        if (isString(value)) {
          res = value;
        } else if (isArray$1(value)) {
          for (let i = 0; i < value.length; i++) {
            const normalized = normalizeClass(value[i]);
            if (normalized) {
              res += normalized + ' ';
            }
          }
        } else if (isObject(value) && !isNull(value)) {
          // Iterate own enumerable keys of the object
          const _keys = keys(value);
          for (let i = 0; i < _keys.length; i += 1) {
            const key = _keys[i];
            if (value[key]) {
              res += key + ' ';
            }
          }
        }
        return StringTrim.call(res);
      }
      let sanitizeHtmlContentImpl = () => {
        // locker-service patches this function during runtime to sanitize HTML content.
        throw new Error('sanitizeHtmlContent hook must be implemented.');
      };
      /**
       * EXPERIMENTAL: This function acts like a hook for Lightning Locker Service and other similar
       * libraries to sanitize HTML content. This hook process the content passed via the template to
       * lwc:inner-html directive.
       * It is meant to be overridden via `setHooks`; it throws an error by default.
       */
      const sanitizeHtmlContent = value => {
        return sanitizeHtmlContentImpl();
      };
      function flattenStylesheets(stylesheets) {
        const list = [];
        for (const stylesheet of stylesheets) {
          if (!isArray$1(stylesheet)) {
            list.push(stylesheet);
          } else {
            list.push(...flattenStylesheets(stylesheet));
          }
        }
        return list;
      }
      /**
       * The legacy validation behavior was that this check should only
       * be performed for runtimes that have provided a trustedSignals set.
       * However, this resulted in a bug as all object values were
       * being considered signals in environments where the trustedSignals
       * set had not been defined. The runtime flag has been added as a killswitch
       * in case the fix needs to be reverted.
       */
      function legacyIsTrustedSignal(target) {
        {
          // The runtime didn't set a trustedSignals set
          // this check should only be performed for runtimes that care about filtering signals to track
          // our default behavior should be to track all signals
          return true;
        }
      }
      function isTrustedSignal(target) {
        {
          return false;
        }
      }
      if (!globalThis.lwcRuntimeFlags) {
        Object.defineProperty(globalThis, 'lwcRuntimeFlags', {
          value: create(null)
        });
      }
      /**
       * Whether reporting is enabled.
       *
       * Note that this may seem redundant, given you can just check if the currentDispatcher is undefined,
       * but it turns out that Terser only strips out unused code if we use this explicit boolean.
       */
      let enabled$1 = false;
      /**
       * Return true if reporting is enabled
       */
      function isReportingEnabled() {
        return enabled$1;
      }
  
      /*
       * Copyright (c) 2018, salesforce.com, inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      function getComponentTag(vm) {
        return `<${StringToLowerCase.call(vm.tagName)}>`;
      }
      // TODO [#1695]: Unify getComponentStack and getErrorComponentStack
      function getComponentStack(vm) {
        const stack = [];
        let prefix = '';
        while (!isNull(vm.owner)) {
          ArrayPush$1.call(stack, prefix + getComponentTag(vm));
          vm = vm.owner;
          prefix += '\t';
        }
        return ArrayJoin.call(stack, '\n');
      }
      function getErrorComponentStack(vm) {
        const wcStack = [];
        let currentVm = vm;
        while (!isNull(currentVm)) {
          ArrayPush$1.call(wcStack, getComponentTag(currentVm));
          currentVm = currentVm.owner;
        }
        return wcStack.reverse().join('\n\t');
      }
  
      /*
       * Copyright (c) 2018, salesforce.com, inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      function addErrorComponentStack(vm, error) {
        if (!isFrozen(error) && isUndefined$1(error.wcStack)) {
          const wcStack = getErrorComponentStack(vm);
          defineProperty(error, 'wcStack', {
            get() {
              return wcStack;
            }
          });
        }
      }
  
      /*
       * Copyright (c) 2024, Salesforce, Inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      const alreadyLoggedMessages = new Set();
      function log(method, message, vm, once) {
        let msg = `[LWC ${method}]: ${message}`;
        if (!isUndefined$1(vm)) {
          msg = `${msg}\n${getComponentStack(vm)}`;
        }
        if (once) {
          if (alreadyLoggedMessages.has(msg)) {
            return;
          }
          alreadyLoggedMessages.add(msg);
        }
        try {
          throw new Error(msg);
        } catch (e) {
          /* eslint-disable-next-line no-console */
          console[method](e);
        }
      }
      function logError(message, vm) {
        log('error', message, vm, false);
      }
      function logWarnOnce(message, vm) {
        log('warn', message, vm, true);
      }
  
      /*
       * Copyright (c) 2018, salesforce.com, inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      let nextTickCallbackQueue = [];
      const SPACE_CHAR = 32;
      const EmptyObject = seal(create(null));
      const EmptyArray = seal([]);
      function flushCallbackQueue() {
        const callbacks = nextTickCallbackQueue;
        nextTickCallbackQueue = []; // reset to a new queue
        for (let i = 0, len = callbacks.length; i < len; i += 1) {
          callbacks[i]();
        }
      }
      function addCallbackToNextTick(callback) {
        if (nextTickCallbackQueue.length === 0) {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          Promise.resolve().then(flushCallbackQueue);
        }
        ArrayPush$1.call(nextTickCallbackQueue, callback);
      }
      // Throw an error if we're running in prod mode. Ensures code is truly removed from prod mode.
      function assertNotProd() {
        /* istanbul ignore if */
        {
          // this method should never leak to prod
          throw new ReferenceError();
        }
      }
      function shouldBeFormAssociated(Ctor) {
        const ctorFormAssociated = Boolean(Ctor.formAssociated);
        const apiVersion = getComponentAPIVersion(Ctor);
        const apiFeatureEnabled = isAPIFeatureEnabled(7 /* APIFeature.ENABLE_ELEMENT_INTERNALS_AND_FACE */, apiVersion);
        return ctorFormAssociated && apiFeatureEnabled;
      }
  
      /*
       * Copyright (c) 2024, Salesforce, Inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      const TargetToReactiveRecordMap = new WeakMap();
      function getReactiveRecord(target) {
        let reactiveRecord = TargetToReactiveRecordMap.get(target);
        if (isUndefined$1(reactiveRecord)) {
          const newRecord = create(null);
          reactiveRecord = newRecord;
          TargetToReactiveRecordMap.set(target, newRecord);
        }
        return reactiveRecord;
      }
      let currentReactiveObserver = null;
      function valueMutated(target, key) {
        const reactiveRecord = TargetToReactiveRecordMap.get(target);
        if (!isUndefined$1(reactiveRecord)) {
          const reactiveObservers = reactiveRecord[key];
          if (!isUndefined$1(reactiveObservers)) {
            for (let i = 0, len = reactiveObservers.length; i < len; i += 1) {
              const ro = reactiveObservers[i];
              ro.notify();
            }
          }
        }
      }
      function valueObserved(target, key) {
        // We should determine if an active Observing Record is present to track mutations.
        if (currentReactiveObserver === null) {
          return;
        }
        const ro = currentReactiveObserver;
        const reactiveRecord = getReactiveRecord(target);
        let reactiveObservers = reactiveRecord[key];
        if (isUndefined$1(reactiveObservers)) {
          reactiveObservers = [];
          reactiveRecord[key] = reactiveObservers;
        } else if (reactiveObservers[0] === ro) {
          return; // perf optimization considering that most subscriptions will come from the same record
        }
        if (ArrayIndexOf.call(reactiveObservers, ro) === -1) {
          ro.link(reactiveObservers);
        }
      }
      class ReactiveObserver {
        constructor(callback) {
          this.listeners = [];
          this.callback = callback;
        }
        observe(job) {
          const inceptionReactiveRecord = currentReactiveObserver;
          // eslint-disable-next-line @typescript-eslint/no-this-alias
          currentReactiveObserver = this;
          let error;
          try {
            job();
          } catch (e) {
            error = Object(e);
          } finally {
            currentReactiveObserver = inceptionReactiveRecord;
            if (error !== undefined) {
              throw error; // eslint-disable-line no-unsafe-finally
            }
          }
        }
        /**
         * This method is responsible for disconnecting the Reactive Observer
         * from any Reactive Record that has a reference to it, to prevent future
         * notifications about previously recorded access.
         */
        reset() {
          const {
            listeners
          } = this;
          const len = listeners.length;
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              const set = listeners[i];
              const setLength = set.length;
              // The length is usually 1, so avoid doing an indexOf when we know for certain
              // that `this` is the first item in the array.
              if (setLength > 1) {
                // Swap with the last item before removal.
                // (Avoiding splice here is a perf optimization, and the order doesn't matter.)
                const index = ArrayIndexOf.call(set, this);
                set[index] = set[setLength - 1];
              }
              // Remove the last item
              ArrayPop.call(set);
            }
            listeners.length = 0;
          }
        }
        // friend methods
        notify() {
          this.callback.call(undefined, this);
        }
        link(reactiveObservers) {
          ArrayPush$1.call(reactiveObservers, this);
          // we keep track of observing records where the observing record was added to so we can do some clean up later on
          ArrayPush$1.call(this.listeners, reactiveObservers);
        }
        isObserving() {
          return currentReactiveObserver === this;
        }
      }
  
      /*
       * Copyright (c) 2024, salesforce.com, inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      /**
       * This map keeps track of objects to signals. There is an assumption that the signal is strongly referenced
       * on the object which allows the SignalTracker to be garbage collected along with the object.
       */
      const TargetToSignalTrackerMap = new WeakMap();
      function getSignalTracker(target) {
        let signalTracker = TargetToSignalTrackerMap.get(target);
        if (isUndefined$1(signalTracker)) {
          signalTracker = new SignalTracker();
          TargetToSignalTrackerMap.set(target, signalTracker);
        }
        return signalTracker;
      }
      function subscribeToSignal(target, signal, update) {
        const signalTracker = getSignalTracker(target);
        if (isFalse(signalTracker.seen(signal))) {
          signalTracker.subscribeToSignal(signal, update);
        }
      }
      function unsubscribeFromSignals(target) {
        if (TargetToSignalTrackerMap.has(target)) {
          const signalTracker = getSignalTracker(target);
          signalTracker.unsubscribeFromSignals();
          signalTracker.reset();
        }
      }
      /**
       * A normalized string representation of an error, because browsers behave differently
       */
      const errorWithStack = err => {
        if (typeof err !== 'object' || err === null) {
          return String(err);
        }
        const stack = 'stack' in err ? String(err.stack) : '';
        const message = 'message' in err ? String(err.message) : '';
        const constructor = err.constructor.name;
        return stack.includes(message) ? stack : `${constructor}: ${message}\n${stack}`;
      };
      /**
       * This class is used to keep track of the signals associated to a given object.
       * It is used to prevent the LWC engine from subscribing duplicate callbacks multiple times
       * to the same signal. Additionally, it keeps track of all signal unsubscribe callbacks, handles invoking
       * them when necessary and discarding them.
       */
      class SignalTracker {
        constructor() {
          this.signalToUnsubscribeMap = new Map();
        }
        seen(signal) {
          return this.signalToUnsubscribeMap.has(signal);
        }
        subscribeToSignal(signal, update) {
          try {
            const unsubscribe = signal.subscribe(update);
            if (isFunction$1(unsubscribe)) {
              // TODO [#3978]: Evaluate how we should handle the case when unsubscribe is not a function.
              // Long term we should throw an error or log a warning.
              this.signalToUnsubscribeMap.set(signal, unsubscribe);
            }
          } catch (err) {
            logWarnOnce(`Attempted to subscribe to an object that has the shape of a signal but received the following error: ${errorWithStack(err)}`);
          }
        }
        unsubscribeFromSignals() {
          try {
            this.signalToUnsubscribeMap.forEach(unsubscribe => unsubscribe());
          } catch (err) {
            logWarnOnce(`Attempted to call a signal's unsubscribe callback but received the following error: ${errorWithStack(err)}`);
          }
        }
        reset() {
          this.signalToUnsubscribeMap.clear();
        }
      }
      function componentValueMutated(vm, key) {
        // On the server side, we don't need mutation tracking. Skipping it improves performance.
        {
          valueMutated(vm.component, key);
        }
      }
      function componentValueObserved(vm, key, target = {}) {
        const {
          component,
          tro
        } = vm;
        // On the server side, we don't need mutation tracking. Skipping it improves performance.
        {
          valueObserved(component, key);
        }
        // The portion of reactivity that's exposed to signals is to subscribe a callback to re-render the VM (templates).
        // We check the following to ensure re-render is subscribed at the correct time.
        //  1. The template is currently being rendered (there is a template reactive observer)
        //  2. There was a call to a getter to access the signal (happens during vnode generation)
        if (lwcRuntimeFlags.ENABLE_EXPERIMENTAL_SIGNALS && isObject(target) && !isNull(target) && true &&
        // Only subscribe if a template is being rendered by the engine
        tro.isObserving()) {
          /**
           * The legacy validation behavior was that this check should only
           * be performed for runtimes that have provided a trustedSignals set.
           * However, this resulted in a bug as all object values were
           * being considered signals in environments where the trustedSignals
           * set had not been defined. The runtime flag has been added as a killswitch
           * in case the fix needs to be reverted.
           */
          if (lwcRuntimeFlags.ENABLE_LEGACY_SIGNAL_CONTEXT_VALIDATION ? legacyIsTrustedSignal() : isTrustedSignal()) {
            // Subscribe the template reactive observer's notify method, which will mark the vm as dirty and schedule hydration.
            subscribeToSignal(component, target, tro.notify.bind(tro));
          }
        }
      }
      function createReactiveObserver(callback) {
        // On the server side, we don't need mutation tracking. Skipping it improves performance.
        return new ReactiveObserver(callback);
      }
  
      /*
       * Copyright (c) 2020, salesforce.com, inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      function resolveCircularModuleDependency(fn) {
        const module = fn();
        return module?.__esModule ? module.default : module;
      }
      function isCircularModuleDependency(obj) {
        return isFunction$1(obj) && hasOwnProperty$1.call(obj, '__circular__');
      }
  
      /*
       * Copyright (c) 2023, salesforce.com, inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      const instrumentDef = globalThis.__lwc_instrument_cmp_def ?? noop;
      const instrumentInstance = globalThis.__lwc_instrument_cmp_instance ?? noop;
  
      /*
       * Copyright (c) 2018, salesforce.com, inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      // This is a temporary workaround to get the @lwc/engine-server to evaluate in node without having
      // to inject at runtime.
      const HTMLElementConstructor = typeof HTMLElement !== 'undefined' ? HTMLElement : function () {};
      const HTMLElementPrototype = HTMLElementConstructor.prototype;
  
      /*
       * Copyright (c) 2023, salesforce.com, inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      // Apply ARIA string reflection behavior to a prototype.
      // This is deliberately kept separate from @lwc/aria-reflection. @lwc/aria-reflection is a global polyfill that is
      // needed for backwards compatibility in LEX, whereas this is designed to only apply to our own
      // LightningElement/BaseBridgeElement prototypes.
      // Note we only need to handle ARIA reflections that aren't already in Element.prototype
      const ariaReflectionPolyfillDescriptors = create(null);
      for (const [propName, attrName] of entries(AriaPropNameToAttrNameMap)) {
        if (isUndefined$1(getPropertyDescriptor(HTMLElementPrototype, propName))) {
          // Note that we need to call this.{get,set,has,remove}Attribute rather than dereferencing
          // from Element.prototype, because these methods are overridden in LightningElement.
          ariaReflectionPolyfillDescriptors[propName] = {
            get() {
              return this.getAttribute(attrName);
            },
            set(newValue) {
              // TODO [#3284]: According to the spec, IDL nullable type values
              // (null and undefined) should remove the attribute; however, we
              // only do so in the case of null for historical reasons.
              // See also https://github.com/w3c/aria/issues/1858
              if (isNull(newValue)) {
                this.removeAttribute(attrName);
              } else {
                this.setAttribute(attrName, newValue);
              }
            },
            // configurable and enumerable to allow it to be overridden – this mimics Safari's/Chrome's behavior
            configurable: true,
            enumerable: true
          };
        }
      }
      // Add descriptors for ARIA attributes
      for (const [attrName, propName] of entries(AriaAttrNameToPropNameMap)) {}
  
      /*
       * Copyright (c) 2018, salesforce.com, inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      /**
       * This is a descriptor map that contains
       * all standard properties that a Custom Element can support (including AOM properties), which
       * determines what kind of capabilities the Base HTML Element and
       * Base Lightning Element should support.
       */
      const HTMLElementOriginalDescriptors = create(null);
      forEach.call(keys(AriaPropNameToAttrNameMap), propName => {
        // Note: intentionally using our in-house getPropertyDescriptor instead of getOwnPropertyDescriptor here because
        // in IE11, some properties are on Element.prototype instead of HTMLElement, just to be sure.
        const descriptor = getPropertyDescriptor(HTMLElementPrototype, propName);
        if (!isUndefined$1(descriptor)) {
          HTMLElementOriginalDescriptors[propName] = descriptor;
        }
      });
      for (const propName of REFLECTIVE_GLOBAL_PROPERTY_SET) {
        // Note: intentionally using our in-house getPropertyDescriptor instead of getOwnPropertyDescriptor here because
        // in IE11, id property is on Element.prototype instead of HTMLElement, and we suspect that more will fall into
        // this category, so, better to be sure.
        const descriptor = getPropertyDescriptor(HTMLElementPrototype, propName);
        if (!isUndefined$1(descriptor)) {
          HTMLElementOriginalDescriptors[propName] = descriptor;
        }
      }
  
      /*
       * Copyright (c) 2018, salesforce.com, inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      function updateComponentValue(vm, key, newValue) {
        const {
          cmpFields
        } = vm;
        if (newValue !== cmpFields[key]) {
          cmpFields[key] = newValue;
          componentValueMutated(vm, key);
        }
      }
  
      /**
       * Copyright (C) 2017 salesforce.com, inc.
       */
      const {
        isArray
      } = Array;
      const {
        prototype: ObjectDotPrototype,
        getPrototypeOf,
        create: ObjectCreate,
        defineProperty: ObjectDefineProperty,
        isExtensible,
        getOwnPropertyDescriptor,
        getOwnPropertyNames,
        getOwnPropertySymbols,
        preventExtensions,
        hasOwnProperty
      } = Object;
      const {
        push: ArrayPush,
        concat: ArrayConcat
      } = Array.prototype;
      function isUndefined(obj) {
        return obj === undefined;
      }
      function isFunction(obj) {
        return typeof obj === 'function';
      }
      const proxyToValueMap = new WeakMap();
      function registerProxy(proxy, value) {
        proxyToValueMap.set(proxy, value);
      }
      const unwrap$1 = replicaOrAny => proxyToValueMap.get(replicaOrAny) || replicaOrAny;
      class BaseProxyHandler {
        constructor(membrane, value) {
          this.originalTarget = value;
          this.membrane = membrane;
        }
        // Shared utility methods
        wrapDescriptor(descriptor) {
          if (hasOwnProperty.call(descriptor, 'value')) {
            descriptor.value = this.wrapValue(descriptor.value);
          } else {
            const {
              set: originalSet,
              get: originalGet
            } = descriptor;
            if (!isUndefined(originalGet)) {
              descriptor.get = this.wrapGetter(originalGet);
            }
            if (!isUndefined(originalSet)) {
              descriptor.set = this.wrapSetter(originalSet);
            }
          }
          return descriptor;
        }
        copyDescriptorIntoShadowTarget(shadowTarget, key) {
          const {
            originalTarget
          } = this;
          // Note: a property might get defined multiple times in the shadowTarget
          //       but it will always be compatible with the previous descriptor
          //       to preserve the object invariants, which makes these lines safe.
          const originalDescriptor = getOwnPropertyDescriptor(originalTarget, key);
          // TODO: it should be impossible for the originalDescriptor to ever be undefined, this `if` can be removed
          /* istanbul ignore else */
          if (!isUndefined(originalDescriptor)) {
            const wrappedDesc = this.wrapDescriptor(originalDescriptor);
            ObjectDefineProperty(shadowTarget, key, wrappedDesc);
          }
        }
        lockShadowTarget(shadowTarget) {
          const {
            originalTarget
          } = this;
          const targetKeys = ArrayConcat.call(getOwnPropertyNames(originalTarget), getOwnPropertySymbols(originalTarget));
          targetKeys.forEach(key => {
            this.copyDescriptorIntoShadowTarget(shadowTarget, key);
          });
          const {
            membrane: {
              tagPropertyKey
            }
          } = this;
          if (!isUndefined(tagPropertyKey) && !hasOwnProperty.call(shadowTarget, tagPropertyKey)) {
            ObjectDefineProperty(shadowTarget, tagPropertyKey, ObjectCreate(null));
          }
          preventExtensions(shadowTarget);
        }
        // Shared Traps
        // TODO: apply() is never called
        /* istanbul ignore next */
        apply(shadowTarget, thisArg, argArray) {
          /* No op */
        }
        // TODO: construct() is never called
        /* istanbul ignore next */
        construct(shadowTarget, argArray, newTarget) {
          /* No op */
        }
        get(shadowTarget, key) {
          const {
            originalTarget,
            membrane: {
              valueObserved
            }
          } = this;
          const value = originalTarget[key];
          valueObserved(originalTarget, key);
          return this.wrapValue(value);
        }
        has(shadowTarget, key) {
          const {
            originalTarget,
            membrane: {
              tagPropertyKey,
              valueObserved
            }
          } = this;
          valueObserved(originalTarget, key);
          // since key is never going to be undefined, and tagPropertyKey might be undefined
          // we can simply compare them as the second part of the condition.
          return key in originalTarget || key === tagPropertyKey;
        }
        ownKeys(shadowTarget) {
          const {
            originalTarget,
            membrane: {
              tagPropertyKey
            }
          } = this;
          // if the membrane tag key exists and it is not in the original target, we add it to the keys.
          const keys = isUndefined(tagPropertyKey) || hasOwnProperty.call(originalTarget, tagPropertyKey) ? [] : [tagPropertyKey];
          // small perf optimization using push instead of concat to avoid creating an extra array
          ArrayPush.apply(keys, getOwnPropertyNames(originalTarget));
          ArrayPush.apply(keys, getOwnPropertySymbols(originalTarget));
          return keys;
        }
        isExtensible(shadowTarget) {
          const {
            originalTarget
          } = this;
          // optimization to avoid attempting to lock down the shadowTarget multiple times
          if (!isExtensible(shadowTarget)) {
            return false; // was already locked down
          }
          if (!isExtensible(originalTarget)) {
            this.lockShadowTarget(shadowTarget);
            return false;
          }
          return true;
        }
        getPrototypeOf(shadowTarget) {
          const {
            originalTarget
          } = this;
          return getPrototypeOf(originalTarget);
        }
        getOwnPropertyDescriptor(shadowTarget, key) {
          const {
            originalTarget,
            membrane: {
              valueObserved,
              tagPropertyKey
            }
          } = this;
          // keys looked up via getOwnPropertyDescriptor need to be reactive
          valueObserved(originalTarget, key);
          let desc = getOwnPropertyDescriptor(originalTarget, key);
          if (isUndefined(desc)) {
            if (key !== tagPropertyKey) {
              return undefined;
            }
            // if the key is the membrane tag key, and is not in the original target,
            // we produce a synthetic descriptor and install it on the shadow target
            desc = {
              value: undefined,
              writable: false,
              configurable: false,
              enumerable: false
            };
            ObjectDefineProperty(shadowTarget, tagPropertyKey, desc);
            return desc;
          }
          if (desc.configurable === false) {
            // updating the descriptor to non-configurable on the shadow
            this.copyDescriptorIntoShadowTarget(shadowTarget, key);
          }
          // Note: by accessing the descriptor, the key is marked as observed
          // but access to the value, setter or getter (if available) cannot observe
          // mutations, just like regular methods, in which case we just do nothing.
          return this.wrapDescriptor(desc);
        }
      }
      const getterMap$1 = new WeakMap();
      const setterMap$1 = new WeakMap();
      const reverseGetterMap = new WeakMap();
      const reverseSetterMap = new WeakMap();
      class ReactiveProxyHandler extends BaseProxyHandler {
        wrapValue(value) {
          return this.membrane.getProxy(value);
        }
        wrapGetter(originalGet) {
          const wrappedGetter = getterMap$1.get(originalGet);
          if (!isUndefined(wrappedGetter)) {
            return wrappedGetter;
          }
          const handler = this;
          const get = function () {
            // invoking the original getter with the original target
            return handler.wrapValue(originalGet.call(unwrap$1(this)));
          };
          getterMap$1.set(originalGet, get);
          reverseGetterMap.set(get, originalGet);
          return get;
        }
        wrapSetter(originalSet) {
          const wrappedSetter = setterMap$1.get(originalSet);
          if (!isUndefined(wrappedSetter)) {
            return wrappedSetter;
          }
          const set = function (v) {
            // invoking the original setter with the original target
            originalSet.call(unwrap$1(this), unwrap$1(v));
          };
          setterMap$1.set(originalSet, set);
          reverseSetterMap.set(set, originalSet);
          return set;
        }
        unwrapDescriptor(descriptor) {
          if (hasOwnProperty.call(descriptor, 'value')) {
            // dealing with a data descriptor
            descriptor.value = unwrap$1(descriptor.value);
          } else {
            const {
              set,
              get
            } = descriptor;
            if (!isUndefined(get)) {
              descriptor.get = this.unwrapGetter(get);
            }
            if (!isUndefined(set)) {
              descriptor.set = this.unwrapSetter(set);
            }
          }
          return descriptor;
        }
        unwrapGetter(redGet) {
          const reverseGetter = reverseGetterMap.get(redGet);
          if (!isUndefined(reverseGetter)) {
            return reverseGetter;
          }
          const handler = this;
          const get = function () {
            // invoking the red getter with the proxy of this
            return unwrap$1(redGet.call(handler.wrapValue(this)));
          };
          getterMap$1.set(get, redGet);
          reverseGetterMap.set(redGet, get);
          return get;
        }
        unwrapSetter(redSet) {
          const reverseSetter = reverseSetterMap.get(redSet);
          if (!isUndefined(reverseSetter)) {
            return reverseSetter;
          }
          const handler = this;
          const set = function (v) {
            // invoking the red setter with the proxy of this
            redSet.call(handler.wrapValue(this), handler.wrapValue(v));
          };
          setterMap$1.set(set, redSet);
          reverseSetterMap.set(redSet, set);
          return set;
        }
        set(shadowTarget, key, value) {
          const {
            originalTarget,
            membrane: {
              valueMutated
            }
          } = this;
          const oldValue = originalTarget[key];
          if (oldValue !== value) {
            originalTarget[key] = value;
            valueMutated(originalTarget, key);
          } else if (key === 'length' && isArray(originalTarget)) {
            // fix for issue #236: push will add the new index, and by the time length
            // is updated, the internal length is already equal to the new length value
            // therefore, the oldValue is equal to the value. This is the forking logic
            // to support this use case.
            valueMutated(originalTarget, key);
          }
          return true;
        }
        deleteProperty(shadowTarget, key) {
          const {
            originalTarget,
            membrane: {
              valueMutated
            }
          } = this;
          delete originalTarget[key];
          valueMutated(originalTarget, key);
          return true;
        }
        setPrototypeOf(shadowTarget, prototype) {}
        preventExtensions(shadowTarget) {
          if (isExtensible(shadowTarget)) {
            const {
              originalTarget
            } = this;
            preventExtensions(originalTarget);
            // if the originalTarget is a proxy itself, it might reject
            // the preventExtension call, in which case we should not attempt to lock down
            // the shadow target.
            // TODO: It should not actually be possible to reach this `if` statement.
            // If a proxy rejects extensions, then calling preventExtensions will throw an error:
            // https://codepen.io/nolanlawson-the-selector/pen/QWMOjbY
            /* istanbul ignore if */
            if (isExtensible(originalTarget)) {
              return false;
            }
            this.lockShadowTarget(shadowTarget);
          }
          return true;
        }
        defineProperty(shadowTarget, key, descriptor) {
          const {
            originalTarget,
            membrane: {
              valueMutated,
              tagPropertyKey
            }
          } = this;
          if (key === tagPropertyKey && !hasOwnProperty.call(originalTarget, key)) {
            // To avoid leaking the membrane tag property into the original target, we must
            // be sure that the original target doesn't have yet.
            // NOTE: we do not return false here because Object.freeze and equivalent operations
            // will attempt to set the descriptor to the same value, and expect no to throw. This
            // is an small compromise for the sake of not having to diff the descriptors.
            return true;
          }
          ObjectDefineProperty(originalTarget, key, this.unwrapDescriptor(descriptor));
          // intentionally testing if false since it could be undefined as well
          if (descriptor.configurable === false) {
            this.copyDescriptorIntoShadowTarget(shadowTarget, key);
          }
          valueMutated(originalTarget, key);
          return true;
        }
        /*LWC compiler v8.28.2*/
      }
      const getterMap = new WeakMap();
      const setterMap = new WeakMap();
      class ReadOnlyHandler extends BaseProxyHandler {
        wrapValue(value) {
          return this.membrane.getReadOnlyProxy(value);
        }
        wrapGetter(originalGet) {
          const wrappedGetter = getterMap.get(originalGet);
          if (!isUndefined(wrappedGetter)) {
            return wrappedGetter;
          }
          const handler = this;
          const get = function () {
            // invoking the original getter with the original target
            return handler.wrapValue(originalGet.call(unwrap$1(this)));
          };
          getterMap.set(originalGet, get);
          return get;
        }
        wrapSetter(originalSet) {
          const wrappedSetter = setterMap.get(originalSet);
          if (!isUndefined(wrappedSetter)) {
            return wrappedSetter;
          }
          const set = function (v) {};
          setterMap.set(originalSet, set);
          return set;
        }
        set(shadowTarget, key, value) {
          /* istanbul ignore next */
          return false;
        }
        deleteProperty(shadowTarget, key) {
          /* istanbul ignore next */
          return false;
        }
        setPrototypeOf(shadowTarget, prototype) {}
        preventExtensions(shadowTarget) {
          /* istanbul ignore next */
          return false;
        }
        defineProperty(shadowTarget, key, descriptor) {
          /* istanbul ignore next */
          return false;
        }
        /*LWC compiler v8.28.2*/
      }
      function defaultValueIsObservable(value) {
        // intentionally checking for null
        if (value === null) {
          return false;
        }
        // treat all non-object types, including undefined, as non-observable values
        if (typeof value !== 'object') {
          return false;
        }
        if (isArray(value)) {
          return true;
        }
        const proto = getPrototypeOf(value);
        return proto === ObjectDotPrototype || proto === null || getPrototypeOf(proto) === null;
      }
      const defaultValueObserved = (obj, key) => {
        /* do nothing */
      };
      const defaultValueMutated = (obj, key) => {
        /* do nothing */
      };
      function createShadowTarget(value) {
        return isArray(value) ? [] : {};
      }
      class ObservableMembrane {
        constructor(options = {}) {
          this.readOnlyObjectGraph = new WeakMap();
          this.reactiveObjectGraph = new WeakMap();
          const {
            valueMutated,
            valueObserved,
            valueIsObservable,
            tagPropertyKey
          } = options;
          this.valueMutated = isFunction(valueMutated) ? valueMutated : defaultValueMutated;
          this.valueObserved = isFunction(valueObserved) ? valueObserved : defaultValueObserved;
          this.valueIsObservable = isFunction(valueIsObservable) ? valueIsObservable : defaultValueIsObservable;
          this.tagPropertyKey = tagPropertyKey;
        }
        getProxy(value) {
          const unwrappedValue = unwrap$1(value);
          if (this.valueIsObservable(unwrappedValue)) {
            // When trying to extract the writable version of a readonly we return the readonly.
            if (this.readOnlyObjectGraph.get(unwrappedValue) === value) {
              return value;
            }
            return this.getReactiveHandler(unwrappedValue);
          }
          return unwrappedValue;
        }
        getReadOnlyProxy(value) {
          value = unwrap$1(value);
          if (this.valueIsObservable(value)) {
            return this.getReadOnlyHandler(value);
          }
          return value;
        }
        unwrapProxy(p) {
          return unwrap$1(p);
        }
        getReactiveHandler(value) {
          let proxy = this.reactiveObjectGraph.get(value);
          if (isUndefined(proxy)) {
            // caching the proxy after the first time it is accessed
            const handler = new ReactiveProxyHandler(this, value);
            proxy = new Proxy(createShadowTarget(value), handler);
            registerProxy(proxy, value);
            this.reactiveObjectGraph.set(value, proxy);
          }
          return proxy;
        }
        getReadOnlyHandler(value) {
          let proxy = this.readOnlyObjectGraph.get(value);
          if (isUndefined(proxy)) {
            // caching the proxy after the first time it is accessed
            const handler = new ReadOnlyHandler(this, value);
            proxy = new Proxy(createShadowTarget(value), handler);
            registerProxy(proxy, value);
            this.readOnlyObjectGraph.set(value, proxy);
          }
          return proxy;
        }
      }
      /** version: 2.0.0 */
  
      /*
       * Copyright (c) 2018, salesforce.com, inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      const lockerLivePropertyKey = Symbol.for('@@lockerLiveValue');
      const reactiveMembrane = new ObservableMembrane({
        valueObserved,
        valueMutated,
        tagPropertyKey: lockerLivePropertyKey
      });
      function getReadOnlyProxy(value) {
        // We must return a frozen wrapper around the value, so that child components cannot mutate properties passed to
        // them from their parents. This applies to both the client and server.
        return reactiveMembrane.getReadOnlyProxy(value);
      }
      function getReactiveProxy(value) {
        // On the server side, we don't need mutation tracking. Skipping it improves performance.
        return reactiveMembrane.getProxy(value);
      }
      // Making the component instance a live value when using Locker to support expandos.
      function markLockerLiveObject(obj) {
        // On the server side, we don't need mutation tracking. Skipping it improves performance.
        {
          obj[lockerLivePropertyKey] = undefined;
        }
      }
  
      /*
       * Copyright (c) 2023, salesforce.com, inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      let globalStylesheet;
      function isStyleElement(elm) {
        return elm.tagName === 'STYLE';
      }
      async function fetchStylesheet(elm) {
        if (isStyleElement(elm)) {
          return elm.textContent;
        } else {
          // <link>
          const {
            href
          } = elm;
          try {
            return await (await fetch(href)).text();
          } catch (_err) {
            logWarnOnce(`Ignoring cross-origin stylesheet in migrate mode: ${href}`);
            // ignore errors with cross-origin stylesheets - nothing we can do for those
            return '';
          }
        }
      }
      function initGlobalStylesheet() {
        const stylesheet = new CSSStyleSheet();
        const elmsToPromises = new Map();
        let lastSeenLength = 0;
        const copyToGlobalStylesheet = () => {
          const elms = document.head.querySelectorAll('style:not([data-rendered-by-lwc]),link[rel="stylesheet"]');
          if (elms.length === lastSeenLength) {
            return; // nothing to update
          }
          lastSeenLength = elms.length;
          const promises = [...elms].map(elm => {
            let promise = elmsToPromises.get(elm);
            if (!promise) {
              // Cache the promise
              promise = fetchStylesheet(elm);
              elmsToPromises.set(elm, promise);
            }
            return promise;
          });
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          Promise.all(promises).then(stylesheetTexts => {
            // When replaceSync() is called, the entire contents of the constructable stylesheet are replaced
            // with the copied+concatenated styles. This means that any shadow root's adoptedStyleSheets that
            // contains this constructable stylesheet will immediately get the new styles.
            stylesheet.replaceSync(stylesheetTexts.join('\n'));
          });
        };
        const headObserver = new MutationObserver(copyToGlobalStylesheet);
        // By observing only the childList, note that we are not covering the case where someone changes an `href`
        // on an existing <link>`, or the textContent on an existing `<style>`. This is assumed to be an uncommon
        // case and not worth covering.
        headObserver.observe(document.head, {
          childList: true
        });
        copyToGlobalStylesheet();
        return stylesheet;
      }
      function applyShadowMigrateMode(shadowRoot) {
        if (!globalStylesheet) {
          globalStylesheet = initGlobalStylesheet();
        }
        shadowRoot.synthetic = true; // pretend to be synthetic mode
        shadowRoot.adoptedStyleSheets.push(globalStylesheet);
      }
  
      /*
       * Copyright (c) 2024, Salesforce, Inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      /**
       * This module is responsible for producing the ComponentDef object that is always
       * accessible via `vm.def`. This is lazily created during the creation of the first
       * instance of a component class, and shared across all instances.
       *
       * This structure can be used to synthetically create proxies, and understand the
       * shape of a component. It is also used internally to apply extra optimizations.
       */
      /**
       * This operation is called with a descriptor of an standard html property
       * that a Custom Element can support (including AOM properties), which
       * determines what kind of capabilities the Base Lightning Element should support. When producing the new descriptors
       * for the Base Lightning Element, it also include the reactivity bit, so the standard property is reactive.
       * @param propName
       * @param descriptor
       */
      function createBridgeToElementDescriptor(propName, descriptor) {
        const {
          get,
          set,
          enumerable,
          configurable
        } = descriptor;
        if (!isFunction$1(get)) {
          throw new TypeError(`Detected invalid public property descriptor for HTMLElement.prototype.${propName} definition. Missing the standard getter.`);
        }
        if (!isFunction$1(set)) {
          throw new TypeError(`Detected invalid public property descriptor for HTMLElement.prototype.${propName} definition. Missing the standard setter.`);
        }
        return {
          enumerable,
          configurable,
          get() {
            const vm = getAssociatedVM(this);
            if (isBeingConstructed(vm)) {
              return;
            }
            componentValueObserved(vm, propName);
            return get.call(vm.elm);
          },
          set(newValue) {
            const vm = getAssociatedVM(this);
            updateComponentValue(vm, propName, newValue);
            return set.call(vm.elm, newValue);
          }
        };
      }
      const refsCache = new WeakMap();
      /**
       * This class is the base class for any LWC element.
       * Some elements directly extends this class, others implement it via inheritance.
       */
      // @ts-expect-error When exported, it will conform, but we need to build it first!
      const LightningElement = function () {
        // This should be as performant as possible, while any initialization should be done lazily
        if (isNull(vmBeingConstructed)) {
          // Thrown when doing something like `new LightningElement()` or
          // `class Foo extends LightningElement {}; new Foo()`
          throw new TypeError('Illegal constructor');
        }
        // This is a no-op unless Lightning DevTools are enabled.
        instrumentInstance(this, vmBeingConstructed);
        const vm = vmBeingConstructed;
        const {
          def,
          elm
        } = vm;
        const {
          bridge
        } = def;
        setPrototypeOf(elm, bridge.prototype);
        vm.component = this;
        // Locker hooks assignment. When the LWC engine run with Locker, Locker intercepts all the new
        // component creation and passes hooks to instrument all the component interactions with the
        // engine. We are intentionally hiding this argument from the formal API of LightningElement
        // because we don't want folks to know about it just yet.
        if (arguments.length === 1) {
          const {
            callHook,
            setHook,
            getHook
          } = arguments[0];
          vm.callHook = callHook;
          vm.setHook = setHook;
          vm.getHook = getHook;
        }
        markLockerLiveObject(this);
        // Linking elm, shadow root and component with the VM.
        associateVM(this, vm);
        associateVM(elm, vm);
        if (vm.renderMode === 1 /* RenderMode.Shadow */) {
          vm.renderRoot = doAttachShadow(vm);
        } else {
          vm.renderRoot = elm;
        }
        return this;
      };
      function doAttachShadow(vm) {
        const {
          elm,
          mode,
          shadowMode,
          def: {
            ctor
          },
          renderer: {
            attachShadow
          }
        } = vm;
        const shadowRoot = attachShadow(elm, {
          [KEY__SYNTHETIC_MODE]: shadowMode === 1 /* ShadowMode.Synthetic */,
          delegatesFocus: Boolean(ctor.delegatesFocus),
          mode
        });
        vm.shadowRoot = shadowRoot;
        associateVM(shadowRoot, vm);
        if (lwcRuntimeFlags.ENABLE_FORCE_SHADOW_MIGRATE_MODE && vm.shadowMigrateMode) {
          applyShadowMigrateMode(shadowRoot);
        }
        return shadowRoot;
      }
      // Type assertion because we need to build the prototype before it satisfies the interface.
      LightningElement.prototype = {
        constructor: LightningElement,
        dispatchEvent(event) {
          const vm = getAssociatedVM(this);
          const {
            elm,
            renderer: {
              dispatchEvent
            }
          } = vm;
          return dispatchEvent(elm, event);
        },
        addEventListener(type, listener, options) {
          const vm = getAssociatedVM(this);
          const {
            elm,
            renderer: {
              addEventListener
            }
          } = vm;
          const wrappedListener = getWrappedComponentsListener(vm, listener);
          addEventListener(elm, type, wrappedListener, options);
        },
        removeEventListener(type, listener, options) {
          const vm = getAssociatedVM(this);
          const {
            elm,
            renderer: {
              removeEventListener
            }
          } = vm;
          const wrappedListener = getWrappedComponentsListener(vm, listener);
          removeEventListener(elm, type, wrappedListener, options);
        },
        hasAttribute(name) {
          const vm = getAssociatedVM(this);
          const {
            elm,
            renderer: {
              getAttribute
            }
          } = vm;
          return !isNull(getAttribute(elm, name));
        },
        hasAttributeNS(namespace, name) {
          const vm = getAssociatedVM(this);
          const {
            elm,
            renderer: {
              getAttribute
            }
          } = vm;
          return !isNull(getAttribute(elm, name, namespace));
        },
        removeAttribute(name) {
          const vm = getAssociatedVM(this);
          const {
            elm,
            renderer: {
              removeAttribute
            }
          } = vm;
          removeAttribute(elm, name);
        },
        removeAttributeNS(namespace, name) {
          const {
            elm,
            renderer: {
              removeAttribute
            }
          } = getAssociatedVM(this);
          removeAttribute(elm, name, namespace);
        },
        getAttribute(name) {
          const vm = getAssociatedVM(this);
          const {
            elm
          } = vm;
          const {
            getAttribute
          } = vm.renderer;
          return getAttribute(elm, name);
        },
        getAttributeNS(namespace, name) {
          const vm = getAssociatedVM(this);
          const {
            elm
          } = vm;
          const {
            getAttribute
          } = vm.renderer;
          return getAttribute(elm, name, namespace);
        },
        setAttribute(name, value) {
          const vm = getAssociatedVM(this);
          const {
            elm,
            renderer: {
              setAttribute
            }
          } = vm;
          setAttribute(elm, name, value);
        },
        setAttributeNS(namespace, name, value) {
          const vm = getAssociatedVM(this);
          const {
            elm,
            renderer: {
              setAttribute
            }
          } = vm;
          setAttribute(elm, name, value, namespace);
        },
        getBoundingClientRect() {
          const vm = getAssociatedVM(this);
          const {
            elm,
            renderer: {
              getBoundingClientRect
            }
          } = vm;
          return getBoundingClientRect(elm);
        },
        attachInternals() {
          const vm = getAssociatedVM(this);
          const {
            def: {
              ctor
            },
            elm,
            apiVersion,
            renderer: {
              attachInternals
            }
          } = vm;
          if (!isAPIFeatureEnabled(7 /* APIFeature.ENABLE_ELEMENT_INTERNALS_AND_FACE */, apiVersion)) {
            throw new Error(`The attachInternals API is only supported in API version 61 and above. ` + `The current version is ${apiVersion}. ` + `To use this API, update the LWC component API version. https://lwc.dev/guide/versioning`);
          }
          const internals = attachInternals(elm);
          if (vm.shadowMode === 1 /* ShadowMode.Synthetic */ && supportsSyntheticElementInternals(ctor)) {
            const handler = {
              get(target, prop) {
                if (prop === 'shadowRoot') {
                  return vm.shadowRoot;
                }
                const value = Reflect.get(target, prop);
                if (typeof value === 'function') {
                  return value.bind(target);
                }
                return value;
              },
              set(target, prop, value) {
                return Reflect.set(target, prop, value);
              }
            };
            return new Proxy(internals, handler);
          } else if (vm.shadowMode === 1 /* ShadowMode.Synthetic */) {
            throw new Error('attachInternals API is not supported in synthetic shadow.');
          }
          return internals;
        },
        get isConnected() {
          const vm = getAssociatedVM(this);
          const {
            elm,
            renderer: {
              isConnected
            }
          } = vm;
          return isConnected(elm);
        },
        get classList() {
          const vm = getAssociatedVM(this);
          const {
            elm,
            renderer: {
              getClassList
            }
          } = vm;
          return getClassList(elm);
        },
        get template() {
          const vm = getAssociatedVM(this);
          return vm.shadowRoot;
        },
        get hostElement() {
          const vm = getAssociatedVM(this);
          const apiVersion = getComponentAPIVersion(vm.def.ctor);
          if (!isAPIFeatureEnabled(8 /* APIFeature.ENABLE_THIS_DOT_HOST_ELEMENT */, apiVersion)) {
            // Simulate the old behavior for `this.hostElement` to avoid a breaking change
            return undefined;
          }
          return vm.elm;
        },
        get refs() {
          const vm = getAssociatedVM(this);
          if (isUpdatingTemplate) {
            // If the template is in the process of being updated, then we don't want to go through the normal
            // process of returning the refs and caching them, because the state of the refs is unstable.
            // This can happen if e.g. a template contains `<div class={foo}></div>` and `foo` is computed
            // based on `this.refs.bar`.
            return;
          }
          const {
            refVNodes,
            cmpTemplate
          } = vm;
          // For backwards compatibility with component written before template refs
          // were introduced, we return undefined if the template has no refs defined
          // anywhere. This fixes components that may want to add an expando called `refs`
          // and are checking if it exists with `if (this.refs)`  before adding it.
          // Note we use a null refVNodes to indicate that the template has no refs defined.
          if (isNull(refVNodes)) {
            return;
          }
          // The refNodes can be cached based on the refVNodes, since the refVNodes
          // are recreated from scratch every time the template is rendered.
          // This happens with `vm.refVNodes = null` in `template.ts` in `@lwc/engine-core`.
          let refs = refsCache.get(refVNodes);
          if (isUndefined$1(refs)) {
            refs = create(null);
            for (const key of keys(refVNodes)) {
              refs[key] = refVNodes[key].elm;
            }
            freeze(refs);
            refsCache.set(refVNodes, refs);
          }
          return refs;
        },
        // For backwards compat, we allow component authors to set `refs` as an expando
        set refs(value) {
          defineProperty(this, 'refs', {
            configurable: true,
            enumerable: true,
            writable: true,
            value
          });
        },
        get shadowRoot() {
          // From within the component instance, the shadowRoot is always reported as "closed".
          // Authors should rely on this.template instead.
          return null;
        },
        get children() {
          const vm = getAssociatedVM(this);
          const renderer = vm.renderer;
          return renderer.getChildren(vm.elm);
        },
        get childNodes() {
          const vm = getAssociatedVM(this);
          const renderer = vm.renderer;
          // getChildNodes returns a NodeList, which has `item(index: number): Node | null`.
          // NodeListOf<T> extends NodeList, but claims to not return null. That seems inaccurate,
          // but these are built-in types, so ultimately not our problem.
          return renderer.getChildNodes(vm.elm);
        },
        get firstChild() {
          const vm = getAssociatedVM(this);
          const renderer = vm.renderer;
          return renderer.getFirstChild(vm.elm);
        },
        get firstElementChild() {
          const vm = getAssociatedVM(this);
          const renderer = vm.renderer;
          return renderer.getFirstElementChild(vm.elm);
        },
        get lastChild() {
          const vm = getAssociatedVM(this);
          const renderer = vm.renderer;
          return renderer.getLastChild(vm.elm);
        },
        get lastElementChild() {
          const vm = getAssociatedVM(this);
          const renderer = vm.renderer;
          return renderer.getLastElementChild(vm.elm);
        },
        get ownerDocument() {
          const vm = getAssociatedVM(this);
          const renderer = vm.renderer;
          return renderer.ownerDocument(vm.elm);
        },
        get tagName() {
          const {
            elm,
            renderer
          } = getAssociatedVM(this);
          return renderer.getTagName(elm);
        },
        get style() {
          const {
            elm,
            renderer,
            def
          } = getAssociatedVM(this);
          const apiVersion = getComponentAPIVersion(def.ctor);
          if (!isAPIFeatureEnabled(9 /* APIFeature.ENABLE_THIS_DOT_STYLE */, apiVersion)) {
            // Simulate the old behavior for `this.style` to avoid a breaking change
            return undefined;
          }
          return renderer.getStyle(elm);
        },
        render() {
          const vm = getAssociatedVM(this);
          return vm.def.template;
        },
        toString() {
          const vm = getAssociatedVM(this);
          return `[object ${vm.def.name}]`;
        }
      };
      const queryAndChildGetterDescriptors = create(null);
      const queryMethods = ['getElementsByClassName', 'getElementsByTagName', 'querySelector', 'querySelectorAll'];
      // Generic passthrough for query APIs on HTMLElement to the relevant Renderer APIs
      for (const queryMethod of queryMethods) {
        queryAndChildGetterDescriptors[queryMethod] = {
          value(arg) {
            const vm = getAssociatedVM(this);
            const {
              elm,
              renderer
            } = vm;
            return renderer[queryMethod](elm, arg);
          },
          configurable: true,
          enumerable: true,
          writable: true
        };
      }
      defineProperties(LightningElement.prototype, queryAndChildGetterDescriptors);
      const lightningBasedDescriptors = create(null);
      for (const propName in HTMLElementOriginalDescriptors) {
        lightningBasedDescriptors[propName] = createBridgeToElementDescriptor(propName, HTMLElementOriginalDescriptors[propName]);
      }
      // Apply ARIA reflection to LightningElement.prototype, on both the browser and server.
      // This allows `this.aria*` property accessors to work from inside a component, and to reflect `aria-*` attrs.
      // Note this works regardless of whether the global ARIA reflection polyfill is applied or not.
      {
        // In the browser, we use createBridgeToElementDescriptor, so we can get the normal reactivity lifecycle for
        // aria* properties
        for (const [propName, descriptor] of entries(ariaReflectionPolyfillDescriptors)) {
          lightningBasedDescriptors[propName] = createBridgeToElementDescriptor(propName, descriptor);
        }
      }
      defineProperties(LightningElement.prototype, lightningBasedDescriptors);
      defineProperty(LightningElement, 'CustomElementConstructor', {
        get() {
          // If required, a runtime-specific implementation must be defined.
          throw new ReferenceError('The current runtime does not support CustomElementConstructor.');
        },
        configurable: true
      });
  
      /*
       * Copyright (c) 2018, salesforce.com, inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      function createObservedFieldPropertyDescriptor(key) {
        return {
          get() {
            const vm = getAssociatedVM(this);
            const val = vm.cmpFields[key];
            componentValueObserved(vm, key, val);
            return val;
          },
          set(newValue) {
            const vm = getAssociatedVM(this);
            updateComponentValue(vm, key, newValue);
          },
          enumerable: true,
          configurable: true
        };
      }
  
      /*
       * Copyright (c) 2023, salesforce.com, inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      const AdapterToTokenMap = new Map();
      function createContextWatcher(vm, wireDef, callbackWhenContextIsReady) {
        const {
          adapter
        } = wireDef;
        const adapterContextToken = AdapterToTokenMap.get(adapter);
        if (isUndefined$1(adapterContextToken)) {
          return; // no provider found, nothing to be done
        }
        const {
          elm,
          context: {
            wiredConnecting,
            wiredDisconnecting
          },
          renderer: {
            registerContextConsumer
          }
        } = vm;
        // waiting for the component to be connected to formally request the context via the token
        ArrayPush$1.call(wiredConnecting, () => {
          // This will attempt to connect the current element with one of its anscestors
          // that can provide context for the given wire adapter. This relationship is
          // keyed on the secret & internal value of `adapterContextToken`, which is unique
          // to a given wire adapter.
          //
          // Depending on the runtime environment, this connection is made using either DOM
          // events (in the browser) or a custom traversal (on the server).
          registerContextConsumer(elm, adapterContextToken, {
            setNewContext(newContext) {
              // eslint-disable-next-line @lwc/lwc-internal/no-invalid-todo
              // TODO: dev-mode validation of config based on the adapter.contextSchema
              callbackWhenContextIsReady(newContext);
              // Return true as the context is always consumed here and the consumer should
              // stop bubbling.
              return true;
            },
            setDisconnectedCallback(disconnectCallback) {
              // adds this callback into the disconnect bucket so it gets disconnected from parent
              // the the element hosting the wire is disconnected
              ArrayPush$1.call(wiredDisconnecting, disconnectCallback);
            }
          });
        });
      }
  
      /*
       * Copyright (c) 2024, Salesforce, Inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      const DeprecatedWiredElementHost = '$$DeprecatedWiredElementHostKey$$';
      const DeprecatedWiredParamsMeta = '$$DeprecatedWiredParamsMetaKey$$';
      const WireMetaMap = new Map();
      function createFieldDataCallback(vm, name) {
        return value => {
          updateComponentValue(vm, name, value);
        };
      }
      function createMethodDataCallback(vm, method) {
        return value => {
          // dispatching new value into the wired method
          runWithBoundaryProtection(vm, vm.owner, noop, () => {
            // job
            method.call(vm.component, value);
          }, noop);
        };
      }
      function createConfigWatcher(component, configCallback, callbackWhenConfigIsReady) {
        let hasPendingConfig = false;
        // creating the reactive observer for reactive params when needed
        const ro = createReactiveObserver(() => {
          if (hasPendingConfig === false) {
            hasPendingConfig = true;
            // collect new config in the micro-task
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            Promise.resolve().then(() => {
              hasPendingConfig = false;
              // resetting current reactive params
              ro.reset();
              // dispatching a new config due to a change in the configuration
              computeConfigAndUpdate();
            });
          }
        });
        const computeConfigAndUpdate = () => {
          let config;
          ro.observe(() => config = configCallback(component));
          // eslint-disable-next-line @lwc/lwc-internal/no-invalid-todo
          // TODO: dev-mode validation of config based on the adapter.configSchema
          // @ts-expect-error it is assigned in the observe() callback
          callbackWhenConfigIsReady(config);
        };
        return {
          computeConfigAndUpdate,
          ro
        };
      }
      function createConnector(vm, name, wireDef) {
        const {
          method,
          adapter,
          configCallback,
          dynamic
        } = wireDef;
        let debugInfo;
        const fieldOrMethodCallback = isUndefined$1(method) ? createFieldDataCallback(vm, name) : createMethodDataCallback(vm, method);
        const dataCallback = value => {
          fieldOrMethodCallback(value);
        };
        let context;
        let connector;
        // Workaround to pass the component element associated to this wire adapter instance.
        defineProperty(dataCallback, DeprecatedWiredElementHost, {
          value: vm.elm
        });
        defineProperty(dataCallback, DeprecatedWiredParamsMeta, {
          value: dynamic
        });
        runWithBoundaryProtection(vm, vm, noop, () => {
          // job
          connector = new adapter(dataCallback, {
            tagName: vm.tagName
          });
        }, noop);
        const updateConnectorConfig = config => {
          // every time the config is recomputed due to tracking,
          // this callback will be invoked with the new computed config
          runWithBoundaryProtection(vm, vm, noop, () => {
            // job
            if ("production" !== 'production') ;
            connector.update(config, context);
          }, noop);
        };
        // Computes the current wire config and calls the update method on the wire adapter.
        // If it has params, we will need to observe changes in the next tick.
        const {
          computeConfigAndUpdate,
          ro
        } = createConfigWatcher(vm.component, configCallback, updateConnectorConfig);
        // if the adapter needs contextualization, we need to watch for new context and push it alongside the config
        if (!isUndefined$1(adapter.contextSchema)) {
          createContextWatcher(vm, wireDef, newContext => {
            // every time the context is pushed into this component,
            // this callback will be invoked with the new computed context
            if (context !== newContext) {
              context = newContext;
              // Note: when new context arrives, the config will be recomputed and pushed along side the new
              // context, this is to preserve the identity characteristics, config should not have identity
              // (ever), while context can have identity
              if (vm.state === 1 /* VMState.connected */) {
                computeConfigAndUpdate();
              }
            }
          });
        }
        return {
          // @ts-expect-error the boundary protection executes sync, connector is always defined
          connector,
          computeConfigAndUpdate,
          resetConfigWatcher: () => ro.reset()
        };
      }
      function storeWiredMethodMeta(descriptor, adapter, configCallback, dynamic) {
        // support for callable adapters
        if (adapter.adapter) {
          adapter = adapter.adapter;
        }
        const method = descriptor.value;
        const def = {
          adapter,
          method,
          configCallback,
          dynamic
        };
        WireMetaMap.set(descriptor, def);
      }
      function storeWiredFieldMeta(descriptor, adapter, configCallback, dynamic) {
        // support for callable adapters
        if (adapter.adapter) {
          adapter = adapter.adapter;
        }
        const def = {
          adapter,
          configCallback,
          dynamic
        };
        WireMetaMap.set(descriptor, def);
      }
      function installWireAdapters(vm) {
        const {
          context,
          def: {
            wire
          }
        } = vm;
        const wiredConnecting = context.wiredConnecting = [];
        const wiredDisconnecting = context.wiredDisconnecting = [];
        for (const fieldNameOrMethod in wire) {
          const descriptor = wire[fieldNameOrMethod];
          const wireDef = WireMetaMap.get(descriptor);
          if (!isUndefined$1(wireDef)) {
            const {
              connector,
              computeConfigAndUpdate,
              resetConfigWatcher
            } = createConnector(vm, fieldNameOrMethod, wireDef);
            const hasDynamicParams = wireDef.dynamic.length > 0;
            ArrayPush$1.call(wiredConnecting, () => {
              connector.connect();
              if (!lwcRuntimeFlags.ENABLE_WIRE_SYNC_EMIT) {
                if (hasDynamicParams) {
                  // eslint-disable-next-line @typescript-eslint/no-floating-promises
                  Promise.resolve().then(computeConfigAndUpdate);
                  return;
                }
              }
              computeConfigAndUpdate();
            });
            ArrayPush$1.call(wiredDisconnecting, () => {
              connector.disconnect();
              resetConfigWatcher();
            });
          }
        }
      }
      function connectWireAdapters(vm) {
        const {
          wiredConnecting
        } = vm.context;
        for (let i = 0, len = wiredConnecting.length; i < len; i += 1) {
          wiredConnecting[i]();
        }
      }
      function disconnectWireAdapters(vm) {
        const {
          wiredDisconnecting
        } = vm.context;
        runWithBoundaryProtection(vm, vm, noop, () => {
          // job
          for (let i = 0, len = wiredDisconnecting.length; i < len; i += 1) {
            wiredDisconnecting[i]();
          }
        }, noop);
      }
      function createPublicPropertyDescriptor(key) {
        return {
          get() {
            const vm = getAssociatedVM(this);
            if (isBeingConstructed(vm)) {
              return;
            }
            const val = vm.cmpProps[key];
            componentValueObserved(vm, key, val);
            return val;
          },
          set(newValue) {
            const vm = getAssociatedVM(this);
            vm.cmpProps[key] = newValue;
            componentValueMutated(vm, key);
          },
          enumerable: true,
          configurable: true
        };
      }
      function createPublicAccessorDescriptor(key, descriptor) {
        const {
          get,
          set,
          enumerable,
          configurable
        } = descriptor;
        assert.invariant(isFunction$1(get), `Invalid public accessor ${toString(key)} decorated with @api. The property is missing a getter.`);
        return {
          get() {
            return get.call(this);
          },
          set(newValue) {
            getAssociatedVM(this);
            if (set) {
              set.call(this, newValue);
            }
          },
          enumerable,
          configurable
        };
      }
      function internalTrackDecorator(key) {
        return {
          get() {
            const vm = getAssociatedVM(this);
            const val = vm.cmpFields[key];
            componentValueObserved(vm, key, val);
            return val;
          },
          set(newValue) {
            const vm = getAssociatedVM(this);
            const reactiveOrAnyValue = getReactiveProxy(newValue);
            updateComponentValue(vm, key, reactiveOrAnyValue);
          },
          enumerable: true,
          configurable: true
        };
      }
      function internalWireFieldDecorator(key) {
        return {
          get() {
            const vm = getAssociatedVM(this);
            componentValueObserved(vm, key);
            return vm.cmpFields[key];
          },
          set(value) {
            const vm = getAssociatedVM(this);
            /**
             * Reactivity for wired fields is provided in wiring.
             * We intentionally add reactivity here since this is just
             * letting the author to do the wrong thing, but it will keep our
             * system to be backward compatible.
             */
            updateComponentValue(vm, key, value);
          },
          enumerable: true,
          configurable: true
        };
      }
      /**
       * INTERNAL: This function can only be invoked by compiled code. The compiler
       * will prevent this function from being imported by user-land code.
       * @param Ctor
       * @param meta
       */
      function registerDecorators(Ctor, meta) {
        const proto = Ctor.prototype;
        const {
          publicProps,
          publicMethods,
          wire,
          track,
          fields
        } = meta;
        const apiMethods = create(null);
        const apiFields = create(null);
        const wiredMethods = create(null);
        const wiredFields = create(null);
        const observedFields = create(null);
        const apiFieldsConfig = create(null);
        let descriptor;
        if (!isUndefined$1(publicProps)) {
          for (const fieldName in publicProps) {
            const propConfig = publicProps[fieldName];
            apiFieldsConfig[fieldName] = propConfig.config;
            descriptor = getOwnPropertyDescriptor$1(proto, fieldName);
            if (propConfig.config > 0) {
              if (isUndefined$1(descriptor)) {
                // TODO [#3441]: This line of code does not seem possible to reach.
                throw new Error();
              }
              descriptor = createPublicAccessorDescriptor(fieldName, descriptor);
            } else {
              // [W-9927596] If a component has both a public property and a private setter/getter
              // with the same name, the property is defined as a public accessor. This branch is
              // only here for backward compatibility reasons.
              if (!isUndefined$1(descriptor) && !isUndefined$1(descriptor.get)) {
                descriptor = createPublicAccessorDescriptor(fieldName, descriptor);
              } else {
                descriptor = createPublicPropertyDescriptor(fieldName);
              }
            }
            apiFields[fieldName] = descriptor;
            defineProperty(proto, fieldName, descriptor);
          }
        }
        if (!isUndefined$1(publicMethods)) {
          forEach.call(publicMethods, methodName => {
            descriptor = getOwnPropertyDescriptor$1(proto, methodName);
            if (isUndefined$1(descriptor)) {
              throw new Error();
            }
            apiMethods[methodName] = descriptor;
          });
        }
        if (!isUndefined$1(wire)) {
          for (const fieldOrMethodName in wire) {
            const {
              adapter,
              method,
              config: configCallback,
              dynamic = []
            } = wire[fieldOrMethodName];
            descriptor = getOwnPropertyDescriptor$1(proto, fieldOrMethodName);
            if (method === 1) {
              if (isUndefined$1(descriptor)) {
                throw new Error(`Missing descriptor for wired method "${fieldOrMethodName}".`);
              }
              wiredMethods[fieldOrMethodName] = descriptor;
              storeWiredMethodMeta(descriptor, adapter, configCallback, dynamic);
            } else {
              descriptor = internalWireFieldDecorator(fieldOrMethodName);
              wiredFields[fieldOrMethodName] = descriptor;
              storeWiredFieldMeta(descriptor, adapter, configCallback, dynamic);
              defineProperty(proto, fieldOrMethodName, descriptor);
            }
          }
        }
        if (!isUndefined$1(track)) {
          for (const fieldName in track) {
            descriptor = getOwnPropertyDescriptor$1(proto, fieldName);
            descriptor = internalTrackDecorator(fieldName);
            defineProperty(proto, fieldName, descriptor);
          }
        }
        if (!isUndefined$1(fields)) {
          for (let i = 0, n = fields.length; i < n; i++) {
            const fieldName = fields[i];
            descriptor = getOwnPropertyDescriptor$1(proto, fieldName);
            // [W-9927596] Only mark a field as observed whenever it isn't a duplicated public nor
            // tracked property. This is only here for backward compatibility purposes.
            const isDuplicatePublicProp = !isUndefined$1(publicProps) && fieldName in publicProps;
            const isDuplicateTrackedProp = !isUndefined$1(track) && fieldName in track;
            if (!isDuplicatePublicProp && !isDuplicateTrackedProp) {
              observedFields[fieldName] = createObservedFieldPropertyDescriptor(fieldName);
            }
          }
        }
        setDecoratorsMeta(Ctor, {
          apiMethods,
          apiFields,
          apiFieldsConfig,
          wiredMethods,
          wiredFields,
          observedFields
        });
        return Ctor;
      }
      const signedDecoratorToMetaMap = new Map();
      function setDecoratorsMeta(Ctor, meta) {
        signedDecoratorToMetaMap.set(Ctor, meta);
      }
      const defaultMeta = {
        apiMethods: EmptyObject,
        apiFields: EmptyObject,
        apiFieldsConfig: EmptyObject,
        wiredMethods: EmptyObject,
        wiredFields: EmptyObject,
        observedFields: EmptyObject
      };
      function getDecoratorsMeta(Ctor) {
        const meta = signedDecoratorToMetaMap.get(Ctor);
        return isUndefined$1(meta) ? defaultMeta : meta;
      }
  
      /*
       * Copyright (c) 2018, salesforce.com, inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      const signedTemplateSet = new Set();
      function defaultEmptyTemplate() {
        return [];
      }
      signedTemplateSet.add(defaultEmptyTemplate);
      function isTemplateRegistered(tpl) {
        return signedTemplateSet.has(tpl);
      }
      /**
       * INTERNAL: This function can only be invoked by compiled code. The compiler
       * will prevent this function from being imported by userland code.
       * @param tpl
       */
      function registerTemplate(tpl) {
        signedTemplateSet.add(tpl);
        // chaining this method as a way to wrap existing
        // assignment of templates easily, without too much transformation
        return tpl;
      }
  
      /*
       * Copyright (c) 2024, Salesforce, Inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      /**
       * This module is responsible for creating the base bridge class BaseBridgeElement
       * that represents the HTMLElement extension used for any LWC inserted in the DOM.
       */
      // A bridge descriptor is a descriptor whose job is just to get the component instance
      // from the element instance, and get the value or set a new value on the component.
      // This means that across different elements, similar names can get the exact same
      // descriptor, so we can cache them:
      const cachedGetterByKey = create(null);
      const cachedSetterByKey = create(null);
      function createGetter(key) {
        let fn = cachedGetterByKey[key];
        if (isUndefined$1(fn)) {
          fn = cachedGetterByKey[key] = function () {
            const vm = getAssociatedVM(this);
            const {
              getHook
            } = vm;
            return getHook(vm.component, key);
          };
        }
        return fn;
      }
      function createSetter(key) {
        let fn = cachedSetterByKey[key];
        if (isUndefined$1(fn)) {
          fn = cachedSetterByKey[key] = function (newValue) {
            const vm = getAssociatedVM(this);
            const {
              setHook
            } = vm;
            newValue = getReadOnlyProxy(newValue);
            setHook(vm.component, key, newValue);
          };
        }
        return fn;
      }
      function createMethodCaller(methodName) {
        return function () {
          const vm = getAssociatedVM(this);
          const {
            callHook,
            component
          } = vm;
          const fn = component[methodName];
          return callHook(vm.component, fn, ArraySlice.call(arguments));
        };
      }
      function createAttributeChangedCallback(attributeToPropMap, superAttributeChangedCallback) {
        return function attributeChangedCallback(attrName, oldValue, newValue) {
          if (oldValue === newValue) {
            // Ignore same values.
            return;
          }
          const propName = attributeToPropMap[attrName];
          if (isUndefined$1(propName)) {
            if (!isUndefined$1(superAttributeChangedCallback)) {
              // delegate unknown attributes to the super.
              // Typescript does not like it when you treat the `arguments` object as an array
              // @ts-expect-error type-mismatch
              superAttributeChangedCallback.apply(this, arguments);
            }
            return;
          }
          // Reflect attribute change to the corresponding property when changed from outside.
          this[propName] = newValue;
        };
      }
      function HTMLBridgeElementFactory(SuperClass, publicProperties, methods, observedFields, proto, hasCustomSuperClass) {
        const HTMLBridgeElement = class extends SuperClass {
          /*LWC compiler v8.28.2*/
        };
        // generating the hash table for attributes to avoid duplicate fields and facilitate validation
        // and false positives in case of inheritance.
        const attributeToPropMap = create(null);
        const {
          attributeChangedCallback: superAttributeChangedCallback
        } = SuperClass.prototype;
        const {
          observedAttributes: superObservedAttributes = []
        } = SuperClass;
        const descriptors = create(null);
        // expose getters and setters for each public props on the new Element Bridge
        for (let i = 0, len = publicProperties.length; i < len; i += 1) {
          const propName = publicProperties[i];
          attributeToPropMap[htmlPropertyToAttribute(propName)] = propName;
          descriptors[propName] = {
            get: createGetter(propName),
            set: createSetter(propName),
            enumerable: true,
            configurable: true
          };
        }
        // expose public methods as props on the new Element Bridge
        for (let i = 0, len = methods.length; i < len; i += 1) {
          const methodName = methods[i];
          descriptors[methodName] = {
            value: createMethodCaller(methodName),
            writable: true,
            configurable: true
          };
        }
        // creating a new attributeChangedCallback per bridge because they are bound to the corresponding
        // map of attributes to props. We do this after all other props and methods to avoid the possibility
        // of getting overrule by a class declaration in user-land, and we make it non-writable, non-configurable
        // to preserve this definition.
        descriptors.attributeChangedCallback = {
          value: createAttributeChangedCallback(attributeToPropMap, superAttributeChangedCallback)
        };
        // To avoid leaking private component details, accessing internals from outside a component is not allowed.
        descriptors.attachInternals = {
          set() {
          },
          get() {
          }
        };
        descriptors.formAssociated = {
          set() {
          },
          get() {
          }
        };
        // Specify attributes for which we want to reflect changes back to their corresponding
        // properties via attributeChangedCallback.
        defineProperty(HTMLBridgeElement, 'observedAttributes', {
          get() {
            return [...superObservedAttributes, ...keys(attributeToPropMap)];
          }
        });
        defineProperties(HTMLBridgeElement.prototype, descriptors);
        return HTMLBridgeElement;
      }
      // We do some special handling of non-standard ARIA props like ariaLabelledBy as well as props without (as of this
      // writing) broad cross-browser support like ariaBrailleLabel. This is so the reflection works correctly and preserves
      // backwards compatibility with the previous global polyfill approach.
      //
      // The goal here is to expose `elm.aria*` property accessors to work from outside a component, and to reflect `aria-*`
      // attrs. This is especially important because the template compiler compiles aria-* attrs on components to aria* props.
      // Note this works regardless of whether the global ARIA reflection polyfill is applied or not.
      //
      // Also note this ARIA reflection only really makes sense in the browser. On the server, there is no
      // `renderedCallback()`, so you cannot do e.g. `this.template.querySelector('x-child').ariaBusy = 'true'`. So we don't
      // need to expose ARIA props outside the LightningElement
      const basePublicProperties = [...getOwnPropertyNames$1(HTMLElementOriginalDescriptors), ...getOwnPropertyNames$1(ariaReflectionPolyfillDescriptors)];
      const BaseBridgeElement = HTMLBridgeElementFactory(HTMLElementConstructor, basePublicProperties, []);
      freeze(BaseBridgeElement);
      seal(BaseBridgeElement.prototype);
  
      /*
       * Copyright (c) 2025, Salesforce, Inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      const VALID_SCOPE_TOKEN_REGEX = /^[a-zA-Z0-9\-_]+$/;
      function getOrCreateAbortSignal(cssContent) {
        return undefined;
      }
      function makeHostToken(token) {
        // Note: if this ever changes, update the `cssScopeTokens` returned by `@lwc/compiler`
        return `${token}-host`;
      }
      function createInlineStyleVNode(content) {
        return api.h('style', {
          key: 'style',
          // special key
          attrs: {
            type: 'text/css'
          }
        }, [api.t(content)]);
      }
      // TODO [#3733]: remove support for legacy scope tokens
      function updateStylesheetToken(vm, template, legacy) {
        const {
          elm,
          context,
          renderMode,
          shadowMode,
          renderer: {
            getClassList,
            removeAttribute,
            setAttribute
          }
        } = vm;
        const {
          stylesheets: newStylesheets
        } = template;
        const newStylesheetToken = legacy ? template.legacyStylesheetToken : template.stylesheetToken;
        const {
          stylesheets: newVmStylesheets
        } = vm;
        const isSyntheticShadow = renderMode === 1 /* RenderMode.Shadow */ && shadowMode === 1 /* ShadowMode.Synthetic */;
        const {
          hasScopedStyles
        } = context;
        let newToken;
        let newHasTokenInClass;
        let newHasTokenInAttribute;
        // Reset the styling token applied to the host element.
        let oldToken;
        let oldHasTokenInClass;
        let oldHasTokenInAttribute;
        if (legacy) {
          oldToken = context.legacyStylesheetToken;
          oldHasTokenInClass = context.hasLegacyTokenInClass;
          oldHasTokenInAttribute = context.hasLegacyTokenInAttribute;
        } else {
          oldToken = context.stylesheetToken;
          oldHasTokenInClass = context.hasTokenInClass;
          oldHasTokenInAttribute = context.hasTokenInAttribute;
        }
        if (!isUndefined$1(oldToken)) {
          if (oldHasTokenInClass) {
            getClassList(elm).remove(makeHostToken(oldToken));
          }
          if (oldHasTokenInAttribute) {
            removeAttribute(elm, makeHostToken(oldToken));
          }
        }
        // Apply the new template styling token to the host element, if the new template has any
        // associated stylesheets. In the case of light DOM, also ensure there is at least one scoped stylesheet.
        const hasNewStylesheets = hasStyles(newStylesheets);
        const hasNewVmStylesheets = hasStyles(newVmStylesheets);
        if (hasNewStylesheets || hasNewVmStylesheets) {
          newToken = newStylesheetToken;
        }
        // Set the new styling token on the host element
        if (!isUndefined$1(newToken)) {
          if (hasScopedStyles) {
            const hostScopeTokenClass = makeHostToken(newToken);
            getClassList(elm).add(hostScopeTokenClass);
            newHasTokenInClass = true;
          }
          if (isSyntheticShadow) {
            setAttribute(elm, makeHostToken(newToken), '');
            newHasTokenInAttribute = true;
          }
        }
        // Update the styling tokens present on the context object.
        if (legacy) {
          context.legacyStylesheetToken = newToken;
          context.hasLegacyTokenInClass = newHasTokenInClass;
          context.hasLegacyTokenInAttribute = newHasTokenInAttribute;
        } else {
          context.stylesheetToken = newToken;
          context.hasTokenInClass = newHasTokenInClass;
          context.hasTokenInAttribute = newHasTokenInAttribute;
        }
      }
      function evaluateStylesheetsContent(stylesheets, stylesheetToken, vm) {
        const content = [];
        let root;
        for (let i = 0; i < stylesheets.length; i++) {
          let stylesheet = stylesheets[i];
          if (isArray$1(stylesheet)) {
            ArrayPush$1.apply(content, evaluateStylesheetsContent(stylesheet, stylesheetToken, vm));
          } else {
            const isScopedCss = isTrue(stylesheet[KEY__SCOPED_CSS]);
            const isNativeOnlyCss = isTrue(stylesheet[KEY__NATIVE_ONLY_CSS]);
            const {
              renderMode,
              shadowMode
            } = vm;
            if (lwcRuntimeFlags.DISABLE_LIGHT_DOM_UNSCOPED_CSS && !isScopedCss && renderMode === 0 /* RenderMode.Light */) {
              logError('Unscoped CSS is not supported in Light DOM in this environment. Please use scoped CSS ' + '(*.scoped.css) instead of unscoped CSS (*.css). See also: https://sfdc.co/scoped-styles-light-dom');
              continue;
            }
            // Apply the scope token only if the stylesheet itself is scoped, or if we're rendering synthetic shadow.
            const scopeToken = isScopedCss || shadowMode === 1 /* ShadowMode.Synthetic */ && renderMode === 1 /* RenderMode.Shadow */ ? stylesheetToken : undefined;
            // Use the actual `:host` selector if we're rendering global CSS for light DOM, or if we're rendering
            // native shadow DOM. Synthetic shadow DOM never uses `:host`.
            const useActualHostSelector = renderMode === 0 /* RenderMode.Light */ ? !isScopedCss : shadowMode === 0 /* ShadowMode.Native */;
            // Use the native :dir() pseudoclass only in native shadow DOM. Otherwise, in synthetic shadow,
            // we use an attribute selector on the host to simulate :dir().
            let useNativeDirPseudoclass;
            if (renderMode === 1 /* RenderMode.Shadow */) {
              useNativeDirPseudoclass = shadowMode === 0 /* ShadowMode.Native */;
            } else {
              // Light DOM components should only render `[dir]` if they're inside of a synthetic shadow root.
              // At the top level (root is null) or inside of a native shadow root, they should use `:dir()`.
              if (isUndefined$1(root)) {
                // Only calculate the root once as necessary
                root = getNearestShadowComponent(vm);
              }
              useNativeDirPseudoclass = isNull(root) || root.shadowMode === 0 /* ShadowMode.Native */;
            }
            let cssContent;
            if (isNativeOnlyCss && renderMode === 1 /* RenderMode.Shadow */ && shadowMode === 1 /* ShadowMode.Synthetic */) {
              // Native-only (i.e. disableSyntheticShadowSupport) CSS should be ignored entirely
              // in synthetic shadow. It's fine to use in either native shadow or light DOM, but in
              // synthetic shadow it wouldn't be scoped properly and so should be ignored.
              cssContent = '/* ignored native-only CSS */';
            } else {
              cssContent = stylesheet(scopeToken, useActualHostSelector, useNativeDirPseudoclass);
            }
            ArrayPush$1.call(content, cssContent);
          }
        }
        return content;
      }
      function getStylesheetsContent(vm, template) {
        const {
          stylesheets,
          stylesheetToken
        } = template;
        const {
          stylesheets: vmStylesheets
        } = vm;
        if (!isUndefined$1(stylesheetToken) && !isValidScopeToken(stylesheetToken)) {
          throw new Error('stylesheet token must be a valid string');
        }
        const hasTemplateStyles = hasStyles(stylesheets);
        const hasVmStyles = hasStyles(vmStylesheets);
        if (hasTemplateStyles) {
          const content = evaluateStylesheetsContent(stylesheets, stylesheetToken, vm);
          if (hasVmStyles) {
            // Slow path – merge the template styles and vm styles
            ArrayPush$1.apply(content, evaluateStylesheetsContent(vmStylesheets, stylesheetToken, vm));
          }
          return content;
        }
        if (hasVmStyles) {
          // No template styles, so return vm styles directly
          return evaluateStylesheetsContent(vmStylesheets, stylesheetToken, vm);
        }
        // Fastest path - no styles, so return an empty array
        return EmptyArray;
      }
      // It might be worth caching this to avoid doing the lookup repeatedly, but
      // perf testing has not shown it to be a huge improvement yet:
      // https://github.com/salesforce/lwc/pull/2460#discussion_r691208892
      function getNearestShadowComponent(vm) {
        let owner = vm;
        while (!isNull(owner)) {
          if (owner.renderMode === 1 /* RenderMode.Shadow */) {
            return owner;
          }
          owner = owner.owner;
        }
        return owner;
      }
      /**
       * If the component that is currently being rendered uses scoped styles,
       * this returns the unique token for that scoped stylesheet. Otherwise
       * it returns null.
       * @param owner
       * @param legacy
       */
      // TODO [#3733]: remove support for legacy scope tokens
      function getScopeTokenClass(owner, legacy) {
        const {
          cmpTemplate,
          context
        } = owner;
        return context.hasScopedStyles && (legacy ? cmpTemplate?.legacyStylesheetToken : cmpTemplate?.stylesheetToken) || null;
      }
      function getNearestNativeShadowComponent(vm) {
        const owner = getNearestShadowComponent(vm);
        if (!isNull(owner) && owner.shadowMode === 1 /* ShadowMode.Synthetic */) {
          // Synthetic-within-native is impossible. So if the nearest shadow component is
          // synthetic, we know we won't find a native component if we go any further.
          return null;
        }
        return owner;
      }
      function createStylesheet(vm, stylesheets) {
        const {
          renderMode,
          shadowMode,
          renderer: {
            insertStylesheet
          }
        } = vm;
        if (renderMode === 1 /* RenderMode.Shadow */ && shadowMode === 1 /* ShadowMode.Synthetic */) {
          for (let i = 0; i < stylesheets.length; i++) {
            const stylesheet = stylesheets[i];
            insertStylesheet(stylesheet, undefined, getOrCreateAbortSignal());
          }
        } else if (vm.hydrated) {
          // Note: We need to ensure that during hydration, the stylesheets method is the same as those in ssr.
          //       This works in the client, because the stylesheets are created, and cached in the VM
          //       the first time the VM renders.
          // native shadow or light DOM, SSR
          return ArrayMap.call(stylesheets, createInlineStyleVNode);
        } else {
          // native shadow or light DOM, DOM renderer
          const root = getNearestNativeShadowComponent(vm);
          // null root means a global style
          const target = isNull(root) ? undefined : root.shadowRoot;
          for (let i = 0; i < stylesheets.length; i++) {
            const stylesheet = stylesheets[i];
            insertStylesheet(stylesheet, target, getOrCreateAbortSignal());
          }
        }
        return null;
      }
      function isValidScopeToken(token) {
        if (!isString(token)) {
          return false;
        }
        // See W-16614556
        return lwcRuntimeFlags.DISABLE_SCOPE_TOKEN_VALIDATION || VALID_SCOPE_TOKEN_REGEX.test(token);
      }
  
      /*
       * Copyright (c) 2023, salesforce.com, inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      const supportsWeakRefs = typeof WeakRef === 'function' && typeof FinalizationRegistry === 'function';
      // In browsers that doesn't support WeakRefs, the values will still leak, but at least the keys won't
      class LegacyWeakMultiMap {
        constructor() {
          this._map = new WeakMap();
        }
        _getValues(key) {
          let values = this._map.get(key);
          if (isUndefined$1(values)) {
            values = new Set();
            this._map.set(key, values);
          }
          return values;
        }
        get(key) {
          return this._getValues(key);
        }
        add(key, vm) {
          const set = this._getValues(key);
          set.add(vm);
        }
        delete(key) {
          this._map.delete(key);
        }
      }
      // This implementation relies on the WeakRef/FinalizationRegistry proposal.
      // For some background, see: https://github.com/tc39/proposal-weakrefs
      class ModernWeakMultiMap {
        constructor() {
          this._map = new WeakMap();
          this._registry = new FinalizationRegistry(weakRefs => {
            // This should be considered an optional cleanup method to remove GC'ed values from their respective arrays.
            // JS VMs are not obligated to call FinalizationRegistry callbacks.
            // Work backwards, removing stale VMs
            for (let i = weakRefs.length - 1; i >= 0; i--) {
              const vm = weakRefs[i].deref();
              if (isUndefined$1(vm)) {
                ArraySplice.call(weakRefs, i, 1); // remove
              }
            }
          });
        }
        _getWeakRefs(key) {
          let weakRefs = this._map.get(key);
          if (isUndefined$1(weakRefs)) {
            weakRefs = [];
            this._map.set(key, weakRefs);
          }
          return weakRefs;
        }
        get(key) {
          const weakRefs = this._getWeakRefs(key);
          const result = new Set();
          for (const weakRef of weakRefs) {
            const vm = weakRef.deref();
            if (!isUndefined$1(vm)) {
              result.add(vm);
            }
          }
          return result;
        }
        add(key, value) {
          const weakRefs = this._getWeakRefs(key);
          // We could check for duplicate values here, but it doesn't seem worth it.
          // We transform the output into a Set anyway
          ArrayPush$1.call(weakRefs, new WeakRef(value));
          // It's important here not to leak the second argument, which is the "held value." The FinalizationRegistry
          // effectively creates a strong reference between the first argument (the "target") and the held value. When
          // the target is GC'ed, the callback is called, and then the held value is GC'ed.
          // Putting the key here would mean the key is not GC'ed until the value is GC'ed, which defeats the purpose
          // of the WeakMap. Whereas putting the weakRefs array here is fine, because it doesn't have a strong reference
          // to anything. See also this example:
          // https://gist.github.com/nolanlawson/79a3d36e8e6cc25c5048bb17c1795aea
          this._registry.register(value, weakRefs);
        }
        delete(key) {
          this._map.delete(key);
        }
      }
      const WeakMultiMap = supportsWeakRefs ? ModernWeakMultiMap : LegacyWeakMultiMap;
      let swappedStyleMap = /*@__PURE__@*/new WeakMap();
      // The important thing here is the weak values – VMs are transient (one per component instance) and should be GC'ed,
      // so we don't want to create strong references to them.
      // The weak keys are kind of useless, because Templates, LightningElementConstructors, and Stylesheets are
      // never GC'ed. But maybe they will be someday, so we may as well use weak keys too.
      // The "pure" annotations are so that Rollup knows for sure it can remove these from prod mode
      let activeTemplates = /*@__PURE__@*/new WeakMultiMap();
      let activeComponents = /*@__PURE__@*/new WeakMultiMap();
      let activeStyles = /*@__PURE__@*/new WeakMultiMap();
      function getStyleOrSwappedStyle(style) {
        assertNotProd(); // this method should never leak to prod
        // TODO [#4154]: shows stale content when swapping content back and forth multiple times
        const visited = new Set();
        while (swappedStyleMap.has(style) && !visited.has(style)) {
          visited.add(style);
          style = swappedStyleMap.get(style);
        }
        return style;
      }
      function addActiveStylesheets(stylesheets, vm) {
        if (isUndefined$1(stylesheets) || isNull(stylesheets)) {
          // Ignore non-existent stylesheets
          return;
        }
        for (const stylesheet of flattenStylesheets(stylesheets)) {
          // this is necessary because we don't hold the list of styles
          // in the vm, we only hold the selected (already swapped template)
          // but the styles attached to the template might not be the actual
          // active ones, but the swapped versions of those.
          const swappedStylesheet = getStyleOrSwappedStyle(stylesheet);
          // this will allow us to keep track of the stylesheet that are
          // being used by a hot component
          activeStyles.add(swappedStylesheet, vm);
        }
      }
      function setActiveVM(vm) {
        assertNotProd(); // this method should never leak to prod
        // tracking active component
        const Ctor = vm.def.ctor;
        // this will allow us to keep track of the hot components
        activeComponents.add(Ctor, vm);
        // tracking active template
        const template = vm.cmpTemplate;
        if (!isNull(template)) {
          // this will allow us to keep track of the templates that are
          // being used by a hot component
          activeTemplates.add(template, vm);
          // Tracking active styles from the template or the VM. `template.stylesheets` are implicitly associated
          // (e.g. `foo.css` associated with `foo.html`), whereas `vm.stylesheets` are from `static stylesheets`.
          addActiveStylesheets(template.stylesheets, vm);
          addActiveStylesheets(vm.stylesheets, vm);
        }
      }
  
      /*
       * Copyright (c) 2018, salesforce.com, inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      /**
       * This module is responsible for producing the ComponentDef object that is always
       * accessible via `vm.def`. This is lazily created during the creation of the first
       * instance of a component class, and shared across all instances.
       *
       * This structure can be used to synthetically create proxies, and understand the
       * shape of a component. It is also used internally to apply extra optimizations.
       */
      const CtorToDefMap = new WeakMap();
      function getCtorProto(Ctor) {
        let proto = getPrototypeOf$1(Ctor);
        if (isNull(proto)) {
          throw new ReferenceError(`Invalid prototype chain for ${Ctor.name}, you must extend LightningElement.`);
        }
        // covering the cases where the ref is circular in AMD
        if (isCircularModuleDependency(proto)) {
          const p = resolveCircularModuleDependency(proto);
          // escape hatch for Locker and other abstractions to provide their own base class instead
          // of our Base class without having to leak it to user-land. If the circular function returns
          // itself, that's the signal that we have hit the end of the proto chain, which must always
          // be base.
          proto = p === proto ? LightningElement : p;
        }
        return proto;
      }
      function createComponentDef(Ctor) {
        // Enforce component-level feature flag if provided at compile time
        if (!isComponentFeatureEnabled(Ctor)) {
          const metadata = getComponentMetadata(Ctor);
          const componentName = Ctor.name || metadata?.sel || 'Unknown';
          const componentFeatureFlagPath = metadata?.componentFeatureFlag?.path || 'Unknown';
          throw new Error(`Component ${componentName} is disabled by the feature flag at ${componentFeatureFlagPath}.`);
        }
        const {
          shadowSupportMode: ctorShadowSupportMode,
          renderMode: ctorRenderMode,
          formAssociated: ctorFormAssociated
        } = Ctor;
        const decoratorsMeta = getDecoratorsMeta(Ctor);
        const {
          apiFields,
          apiFieldsConfig,
          apiMethods,
          wiredFields,
          wiredMethods,
          observedFields
        } = decoratorsMeta;
        const proto = Ctor.prototype;
        let {
          connectedCallback,
          disconnectedCallback,
          renderedCallback,
          errorCallback,
          formAssociatedCallback,
          formResetCallback,
          formDisabledCallback,
          formStateRestoreCallback,
          render
        } = proto;
        const superProto = getCtorProto(Ctor);
        const hasCustomSuperClass = superProto !== LightningElement;
        const superDef = hasCustomSuperClass ? getComponentInternalDef(superProto) : lightingElementDef;
        const bridge = HTMLBridgeElementFactory(superDef.bridge, keys(apiFields), keys(apiMethods));
        const props = assign(create(null), superDef.props, apiFields);
        const propsConfig = assign(create(null), superDef.propsConfig, apiFieldsConfig);
        const methods = assign(create(null), superDef.methods, apiMethods);
        const wire = assign(create(null), superDef.wire, wiredFields, wiredMethods);
        connectedCallback = connectedCallback || superDef.connectedCallback;
        disconnectedCallback = disconnectedCallback || superDef.disconnectedCallback;
        renderedCallback = renderedCallback || superDef.renderedCallback;
        errorCallback = errorCallback || superDef.errorCallback;
        formAssociatedCallback = formAssociatedCallback || superDef.formAssociatedCallback;
        formResetCallback = formResetCallback || superDef.formResetCallback;
        formDisabledCallback = formDisabledCallback || superDef.formDisabledCallback;
        formStateRestoreCallback = formStateRestoreCallback || superDef.formStateRestoreCallback;
        render = render || superDef.render;
        let shadowSupportMode = superDef.shadowSupportMode;
        if (!isUndefined$1(ctorShadowSupportMode)) {
          shadowSupportMode = ctorShadowSupportMode;
        }
        let renderMode = superDef.renderMode;
        if (!isUndefined$1(ctorRenderMode)) {
          renderMode = ctorRenderMode === 'light' ? 0 /* RenderMode.Light */ : 1 /* RenderMode.Shadow */;
        }
        let formAssociated = superDef.formAssociated;
        if (!isUndefined$1(ctorFormAssociated)) {
          formAssociated = ctorFormAssociated;
        }
        const template = getComponentRegisteredTemplate(Ctor) || superDef.template;
        const name = Ctor.name || superDef.name;
        // installing observed fields into the prototype.
        defineProperties(proto, observedFields);
        const def = {
          ctor: Ctor,
          name,
          wire,
          props,
          propsConfig,
          methods,
          bridge,
          template,
          renderMode,
          shadowSupportMode,
          formAssociated,
          connectedCallback,
          disconnectedCallback,
          errorCallback,
          formAssociatedCallback,
          formDisabledCallback,
          formResetCallback,
          formStateRestoreCallback,
          renderedCallback,
          render
        };
        // This is a no-op unless Lightning DevTools are enabled.
        instrumentDef(def);
        return def;
      }
      /**
       * EXPERIMENTAL: This function allows for the identification of LWC constructors. This API is
       * subject to change or being removed.
       * @param ctor
       */
      function isComponentConstructor(ctor) {
        if (!isFunction$1(ctor)) {
          return false;
        }
        // Fast path: LightningElement is part of the prototype chain of the constructor.
        if (ctor.prototype instanceof LightningElement) {
          return true;
        }
        // Slow path: LightningElement is not part of the prototype chain of the constructor, we need
        // climb up the constructor prototype chain to check in case there are circular dependencies
        // to resolve.
        let current = ctor;
        do {
          if (isCircularModuleDependency(current)) {
            const circularResolved = resolveCircularModuleDependency(current);
            // If the circular function returns itself, that's the signal that we have hit the end
            // of the proto chain, which must always be a valid base constructor.
            if (circularResolved === current) {
              return true;
            }
            current = circularResolved;
          }
          if (current === LightningElement) {
            return true;
          }
        } while (!isNull(current) && (current = getPrototypeOf$1(current)));
        // Finally return false if the LightningElement is not part of the prototype chain.
        return false;
      }
      function getComponentInternalDef(Ctor) {
        let def = CtorToDefMap.get(Ctor);
        if (isUndefined$1(def)) {
          if (isCircularModuleDependency(Ctor)) {
            const resolvedCtor = resolveCircularModuleDependency(Ctor);
            def = getComponentInternalDef(resolvedCtor);
            // Cache the unresolved component ctor too. The next time if the same unresolved ctor is used,
            // look up the definition in cache instead of re-resolving and recreating the def.
            CtorToDefMap.set(Ctor, def);
            return def;
          }
          if (!isComponentConstructor(Ctor)) {
            throw new TypeError(`${Ctor} is not a valid component, or does not extends LightningElement from "lwc". You probably forgot to add the extend clause on the class declaration.`);
          }
          def = createComponentDef(Ctor);
          CtorToDefMap.set(Ctor, def);
        }
        return def;
      }
      function getComponentHtmlPrototype(Ctor) {
        const def = getComponentInternalDef(Ctor);
        return def.bridge;
      }
      const lightingElementDef = {
        name: LightningElement.name,
        props: lightningBasedDescriptors,
        propsConfig: EmptyObject,
        methods: EmptyObject,
        renderMode: 1 /* RenderMode.Shadow */,
        shadowSupportMode: 'reset',
        formAssociated: undefined,
        wire: EmptyObject,
        bridge: BaseBridgeElement,
        template: defaultEmptyTemplate,
        render: LightningElement.prototype.render
      };
  
      /*
       * Copyright (c) 2024, Salesforce, Inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      function isVBaseElement(vnode) {
        const {
          type
        } = vnode;
        return type === 2 /* VNodeType.Element */ || type === 3 /* VNodeType.CustomElement */;
      }
      function isSameVnode(vnode1, vnode2) {
        return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
      }
      function isVCustomElement(vnode) {
        return vnode.type === 3 /* VNodeType.CustomElement */;
      }
      function isVFragment(vnode) {
        return vnode.type === 5 /* VNodeType.Fragment */;
      }
      function isVScopedSlotFragment(vnode) {
        return vnode.type === 6 /* VNodeType.ScopedSlotFragment */;
      }
      function isVStatic(vnode) {
        return vnode.type === 4 /* VNodeType.Static */;
      }
      function isVStaticPartElement(vnode) {
        return vnode.type === 1 /* VStaticPartType.Element */;
      }
  
      /*
       * Copyright (c) 2024, Salesforce, Inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      const sanitizedHtmlContentSymbol = Symbol('lwc-get-sanitized-html-content');
      function isSanitizedHtmlContent(object) {
        return isObject(object) && !isNull(object) && sanitizedHtmlContentSymbol in object;
      }
      /**
       * Wrap a pre-sanitized string designated for `.innerHTML` via `lwc:inner-html`
       * as an object with a Symbol that only we have access to.
       * @param sanitizedString
       * @returns SanitizedHtmlContent
       */
      function createSanitizedHtmlContent(sanitizedString) {
        return create(null, {
          [sanitizedHtmlContentSymbol]: {
            value: sanitizedString,
            configurable: false,
            writable: false
          }
        });
      }
      /**
       * Safely call setProperty on an Element while handling any SanitizedHtmlContent objects correctly
       *
       * @param setProperty - renderer.setProperty
       * @param elm - Element
       * @param key - key to set
       * @param value -  value to set
       */
      function safelySetProperty(setProperty, elm, key, value) {
        // See W-16614337
        // we support setting innerHTML to `undefined` because it's inherently safe
        if ((key === 'innerHTML' || key === 'outerHTML') && !isUndefined$1(value)) {
          if (isSanitizedHtmlContent(value)) {
            // it's a SanitizedHtmlContent object
            setProperty(elm, key, value[sanitizedHtmlContentSymbol]);
          }
        } else {
          setProperty(elm, key, value);
        }
      }
  
      /*
       * Copyright (c) 2018, salesforce.com, inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      const ColonCharCode = 58;
      function patchAttributes(oldVnode, vnode, renderer) {
        const {
          data,
          elm
        } = vnode;
        const {
          attrs
        } = data;
        if (isUndefined$1(attrs)) {
          return;
        }
        const oldAttrs = isNull(oldVnode) ? EmptyObject : oldVnode.data.attrs;
        // Attrs may be the same due to the static content optimization, so we can skip diffing
        if (oldAttrs === attrs) {
          return;
        }
        // Note VStaticPartData does not contain the external property so it will always default to false.
        const external = 'external' in data ? data.external : false;
        const {
          setAttribute,
          removeAttribute,
          setProperty
        } = renderer;
        for (const key in attrs) {
          const cur = attrs[key];
          const old = oldAttrs[key];
          if (old !== cur) {
            let propName;
            // For external custom elements, sniff to see if the attr should be considered a prop.
            // Use kebabCaseToCamelCase directly because we don't want to set props like `ariaLabel` or `tabIndex`
            // on a custom element versus just using the more reliable attribute format.
            if (external && (propName = kebabCaseToCamelCase(key)) in elm) {
              safelySetProperty(setProperty, elm, propName, cur);
            } else if (StringCharCodeAt.call(key, 3) === ColonCharCode) {
              // Assume xml namespace
              setAttribute(elm, key, cur, XML_NAMESPACE);
            } else if (StringCharCodeAt.call(key, 5) === ColonCharCode) {
              // Assume xlink namespace
              setAttribute(elm, key, cur, XLINK_NAMESPACE);
            } else if (isNull(cur) || isUndefined$1(cur)) {
              removeAttribute(elm, key);
            } else {
              setAttribute(elm, key, cur);
            }
          }
        }
      }
      function patchSlotAssignment(oldVnode, vnode, renderer) {
        const {
          slotAssignment
        } = vnode;
        if (oldVnode?.slotAssignment === slotAssignment) {
          return;
        }
        const {
          elm
        } = vnode;
        const {
          setAttribute,
          removeAttribute
        } = renderer;
        if (isUndefined$1(slotAssignment) || isNull(slotAssignment)) {
          removeAttribute(elm, 'slot');
        } else {
          setAttribute(elm, 'slot', slotAssignment);
        }
      }
  
      /*
       * Copyright (c) 2018, salesforce.com, inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      function isLiveBindingProp(sel, key) {
        // For properties with live bindings, we read values from the DOM element
        // instead of relying on internally tracked values.
        return sel === 'input' && (key === 'value' || key === 'checked');
      }
      function patchProps(oldVnode, vnode, renderer) {
        const {
          props
        } = vnode.data;
        if (isUndefined$1(props)) {
          return;
        }
        let oldProps;
        if (!isNull(oldVnode)) {
          oldProps = oldVnode.data.props;
          // Props may be the same due to the static content optimization, so we can skip diffing
          if (oldProps === props) {
            return;
          }
          if (isUndefined$1(oldProps)) {
            oldProps = EmptyObject;
          }
        }
        const isFirstPatch = isNull(oldVnode);
        const {
          elm,
          sel
        } = vnode;
        const {
          getProperty,
          setProperty
        } = renderer;
        for (const key in props) {
          const cur = props[key];
          // Set the property if it's the first time is is patched or if the previous property is
          // different than the one previously set.
          if (isFirstPatch || cur !== (isLiveBindingProp(sel, key) ? getProperty(elm, key) : oldProps[key]) || !(key in oldProps) // this is required because the above case will pass when `cur` is `undefined` and key is missing in `oldProps`
          ) {
            safelySetProperty(setProperty, elm, key, cur);
          }
        }
      }
  
      /*
       * Copyright (c) 2018, salesforce.com, inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      const classNameToClassMap = create(null);
      function getMapFromClassName(className) {
        if (isUndefined$1(className) || isNull(className) || className === '') {
          return EmptyObject;
        }
        // computed class names must be string
        // This will throw if className is a symbol or null-prototype object
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        className = isString(className) ? className : className + '';
        let map = classNameToClassMap[className];
        if (map) {
          return map;
        }
        map = create(null);
        let start = 0;
        let o;
        const len = className.length;
        for (o = 0; o < len; o++) {
          if (StringCharCodeAt.call(className, o) === SPACE_CHAR) {
            if (o > start) {
              map[StringSlice.call(className, start, o)] = true;
            }
            start = o + 1;
          }
        }
        if (o > start) {
          map[StringSlice.call(className, start, o)] = true;
        }
        classNameToClassMap[className] = map;
        return map;
      }
      function patchClassAttribute(oldVnode, vnode, renderer) {
        const {
          elm,
          data: {
            className: newClass
          }
        } = vnode;
        const oldClass = isNull(oldVnode) ? undefined : oldVnode.data.className;
        if (oldClass === newClass) {
          return;
        }
        const newClassMap = getMapFromClassName(newClass);
        const oldClassMap = getMapFromClassName(oldClass);
        if (oldClassMap === newClassMap) {
          // These objects are cached by className string (`classNameToClassMap`), so we can only get here if there is
          // a key collision due to types, e.g. oldClass is `undefined` and newClass is `""` (empty string), or oldClass
          // is `1` (number) and newClass is `"1"` (string).
          return;
        }
        const {
          getClassList
        } = renderer;
        const classList = getClassList(elm);
        let name;
        for (name in oldClassMap) {
          // remove only if it is not in the new class collection and it is not set from within the instance
          if (isUndefined$1(newClassMap[name])) {
            classList.remove(name);
          }
        }
        for (name in newClassMap) {
          if (isUndefined$1(oldClassMap[name])) {
            classList.add(name);
          }
        }
      }
  
      /*
       * Copyright (c) 2018, salesforce.com, inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      // The style property is a string when defined via an expression in the template.
      function patchStyleAttribute(oldVnode, vnode, renderer, owner) {
        const {
          elm,
          data: {
            style: newStyle
          }
        } = vnode;
        const oldStyle = isNull(oldVnode) ? undefined : oldVnode.data.style;
        if (oldStyle === newStyle) {
          return;
        }
        const {
          setAttribute,
          removeAttribute
        } = renderer;
        if (!isString(newStyle) || newStyle === '') {
          removeAttribute(elm, 'style');
        } else {
          setAttribute(elm, 'style', newStyle);
        }
      }
  
      /*
       * Copyright (c) 2018, salesforce.com, inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      function applyEventListeners(vnode, renderer) {
        const {
          elm,
          data
        } = vnode;
        const {
          on
        } = data;
        if (isUndefined$1(on)) {
          return;
        }
        const {
          addEventListener
        } = renderer;
        for (const name in on) {
          const handler = on[name];
          addEventListener(elm, name, handler);
        }
      }
  
      /*
       * Copyright (c) 2025, salesforce.com, inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      function patchDynamicEventListeners(oldVnode, vnode, renderer, owner) {
        const {
          elm,
          data: {
            dynamicOn,
            dynamicOnRaw
          },
          sel
        } = vnode;
        // dynamicOn : A cloned version of the object passed to lwc:on, with null prototype and only its own enumerable properties.
        const oldDynamicOn = oldVnode?.data?.dynamicOn ?? EmptyObject;
        const newDynamicOn = dynamicOn ?? EmptyObject;
        // dynamicOnRaw : object passed to lwc:on
        // Compare dynamicOnRaw to check if same object is passed to lwc:on
        oldVnode?.data?.dynamicOnRaw === dynamicOnRaw;
        const {
          addEventListener,
          removeEventListener
        } = renderer;
        const attachedEventListeners = getAttachedEventListeners(owner, elm);
        // Properties that are present in 'oldDynamicOn' but not in 'newDynamicOn'
        for (const eventType in oldDynamicOn) {
          if (!(eventType in newDynamicOn)) {
            // Remove listeners that were attached previously but don't have a corresponding property in `newDynamicOn`
            const attachedEventListener = attachedEventListeners[eventType];
            removeEventListener(elm, eventType, attachedEventListener);
            attachedEventListeners[eventType] = undefined;
          }
        }
        // Ensure that the event listeners that are attached match what is present in `newDynamicOn`
        for (const eventType in newDynamicOn) {
          const typeExistsInOld = eventType in oldDynamicOn;
          const newCallback = newDynamicOn[eventType];
          // Skip if callback hasn't changed
          if (typeExistsInOld && oldDynamicOn[eventType] === newCallback) {
            continue;
          }
          // Remove listener that was attached previously
          if (typeExistsInOld) {
            const attachedEventListener = attachedEventListeners[eventType];
            removeEventListener(elm, eventType, attachedEventListener);
          }
          // Bind new callback to owner component and add it as listener to element
          const newBoundEventListener = bindEventListener(owner, newCallback);
          addEventListener(elm, eventType, newBoundEventListener);
          // Store the newly added eventListener
          attachedEventListeners[eventType] = newBoundEventListener;
        }
      }
      function getAttachedEventListeners(vm, elm) {
        let attachedEventListeners = vm.attachedEventListeners.get(elm);
        if (isUndefined$1(attachedEventListeners)) {
          attachedEventListeners = {};
          vm.attachedEventListeners.set(elm, attachedEventListeners);
        }
        return attachedEventListeners;
      }
      function bindEventListener(vm, fn) {
        return function (event) {
          invokeEventListener(vm, fn, vm.component, event);
        };
      }
  
      /*
       * Copyright (c) 2018, salesforce.com, inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      // The HTML class property becomes the vnode.data.classMap object when defined as a string in the template.
      // The compiler takes care of transforming the inline classnames into an object. It's faster to set the
      // different classnames properties individually instead of via a string.
      function applyStaticClassAttribute(vnode, renderer) {
        const {
          elm,
          data: {
            classMap
          }
        } = vnode;
        if (isUndefined$1(classMap)) {
          return;
        }
        const {
          getClassList
        } = renderer;
        const classList = getClassList(elm);
        for (const name in classMap) {
          classList.add(name);
        }
      }
  
      /*
       * Copyright (c) 2018, salesforce.com, inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      // The HTML style property becomes the vnode.data.styleDecls object when defined as a string in the template.
      // The compiler takes care of transforming the inline style into an object. It's faster to set the
      // different style properties individually instead of via a string.
      function applyStaticStyleAttribute(vnode, renderer) {
        const {
          elm,
          data: {
            styleDecls
          }
        } = vnode;
        if (isUndefined$1(styleDecls)) {
          return;
        }
        const {
          setCSSStyleProperty
        } = renderer;
        for (let i = 0; i < styleDecls.length; i++) {
          const [prop, value, important] = styleDecls[i];
          setCSSStyleProperty(elm, prop, value, important);
        }
      }
  
      /*
       * Copyright (c) 2023, salesforce.com, inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      // Set a ref (lwc:ref) on a VM, from a template API
      function applyRefs(vnode, owner) {
        const {
          data
        } = vnode;
        const {
          ref
        } = data;
        if (isUndefined$1(ref)) {
          return;
        }
        // If this method is called, then vm.refVNodes is set as the template has refs.
        // If not, then something went wrong and we threw an error above.
        const refVNodes = owner.refVNodes;
        // In cases of conflict (two elements with the same ref), prefer the last one,
        // in depth-first traversal order. This happens automatically due to how we render
        refVNodes[ref] = vnode;
      }
  
      /*
       * Copyright (c) 2024, salesforce.com, inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      function patchTextVNode(n1, n2, renderer) {
        n2.elm = n1.elm;
        if (n2.text !== n1.text) {
          updateTextContent$1(n2, renderer);
        }
      }
      function patchTextVStaticPart(n1, n2, renderer) {
        if (isNull(n1) || n2.text !== n1.text) {
          updateTextContent$1(n2, renderer);
        }
      }
      function updateTextContent$1(vnode, renderer) {
        const {
          elm,
          text
        } = vnode;
        const {
          setText
        } = renderer;
        setText(elm, text);
      }
  
      /*
       * Copyright (c) 2024, Salesforce, Inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      /**
       * Given an array of static parts, mounts the DOM element to the part based on the staticPartId
       * @param root the root element
       * @param parts an array of VStaticParts
       * @param renderer the renderer to use
       */
      function traverseAndSetElements(root, parts, renderer) {
        const numParts = parts.length;
        // Optimization given that, in most cases, there will be one part, and it's just the root
        if (numParts === 1) {
          const firstPart = parts[0];
          if (firstPart.partId === 0) {
            // 0 means the root node
            firstPart.elm = root;
            return;
          }
        }
        const partIdsToParts = new Map();
        for (const staticPart of parts) {
          partIdsToParts.set(staticPart.partId, staticPart);
        }
        // Note that we traverse using `*Child`/`*Sibling` rather than `children` because the browser uses a linked
        // list under the hood to represent the DOM tree, so it's faster to do this than to create an underlying array
        // by calling `children`.
        const {
          nextSibling,
          getFirstChild,
          getParentNode
        } = renderer;
        let numFoundParts = 0;
        let partId = -1;
        // Depth-first traversal. We assign a partId to each element, which is an integer based on traversal order.
        // This function is very hot, which is why it's micro-optimized. Note we don't use a stack at all; we traverse
        // using an algorithm that relies on the parentNode getter: https://stackoverflow.com/a/5285417
        // This is very slightly faster than a TreeWalker (~0.5% on js-framework-benchmark create-10k), but basically
        // the same idea.
        let node = root;
        while (!isNull(node)) {
          // visit node
          partId++;
          const part = partIdsToParts.get(partId);
          if (!isUndefined$1(part)) {
            part.elm = node;
            numFoundParts++;
            if (numFoundParts === numParts) {
              return; // perf optimization - stop traversing once we've found everything we need
            }
          }
          const child = getFirstChild(node);
          if (!isNull(child)) {
            // walk down
            node = child;
          } else {
            let sibling;
            while (isNull(sibling = nextSibling(node))) {
              // walk up
              node = getParentNode(node);
            }
            // walk right
            node = sibling;
          }
        }
      }
      /**
       * Given an array of static parts, do all the mounting required for these parts.
       * @param root the root element
       * @param vnode the parent VStatic
       * @param renderer the renderer to use
       */
      function mountStaticParts(root, vnode, renderer) {
        const {
          parts,
          owner
        } = vnode;
        if (isUndefined$1(parts)) {
          return;
        }
        // This adds `part.elm` to each `part`. We have to do this on every mount because the `parts`
        // array is recreated from scratch every time, so each `part.elm` is now undefined.
        traverseAndSetElements(root, parts, renderer);
        // Currently only event listeners and refs are supported for static vnodes
        for (const part of parts) {
          if (isVStaticPartElement(part)) {
            // Event listeners only need to be applied once when mounting
            applyEventListeners(part, renderer);
            // Refs must be updated after every render due to refVNodes getting reset before every render
            applyRefs(part, owner);
            patchAttributes(null, part, renderer);
            patchClassAttribute(null, part, renderer);
            patchStyleAttribute(null, part, renderer);
          } else {
            patchTextVStaticPart(null, part, renderer);
          }
        }
      }
      /**
       * Updates the static elements based on the content of the VStaticParts
       * @param n1 the previous VStatic vnode
       * @param n2 the current VStatic vnode
       * @param renderer the renderer to use
       */
      function patchStaticParts(n1, n2, renderer) {
        const {
          parts: currParts,
          owner: currPartsOwner
        } = n2;
        if (isUndefined$1(currParts)) {
          return;
        }
        const {
          parts: prevParts
        } = n1;
        for (let i = 0; i < currParts.length; i++) {
          const prevPart = prevParts[i];
          const part = currParts[i];
          // Patch only occurs if the vnode is newly generated, which means the part.elm is always undefined
          // Since the vnode and elements are the same we can safely assume that prevParts[i].elm is defined.
          part.elm = prevPart.elm;
          if (isVStaticPartElement(part)) {
            // Refs must be updated after every render due to refVNodes getting reset before every render
            applyRefs(part, currPartsOwner);
            patchAttributes(prevPart, part, renderer);
            patchClassAttribute(prevPart, part, renderer);
            patchStyleAttribute(prevPart, part, renderer);
          } else {
            patchTextVStaticPart(null, part, renderer);
          }
        }
      }
  
      /*
       * Copyright (c) 2024, Salesforce, Inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      function patchChildren(c1, c2, parent, renderer) {
        if (hasDynamicChildren(c2)) {
          updateDynamicChildren(c1, c2, parent, renderer);
        } else {
          updateStaticChildren(c1, c2, parent, renderer);
        }
      }
      function patch(n1, n2, parent, renderer) {
        if (n1 === n2) {
          return;
        }
        switch (n2.type) {
          case 0 /* VNodeType.Text */:
            // VText has no special capability, fallback to the owner's renderer
            patchTextVNode(n1, n2, renderer);
            break;
          case 1 /* VNodeType.Comment */:
            // VComment has no special capability, fallback to the owner's renderer
            patchComment(n1, n2, renderer);
            break;
          case 4 /* VNodeType.Static */:
            patchStatic(n1, n2, renderer);
            break;
          case 5 /* VNodeType.Fragment */:
            patchFragment(n1, n2, parent, renderer);
            break;
          case 2 /* VNodeType.Element */:
            patchElement(n1, n2, n2.data.renderer ?? renderer);
            break;
          case 3 /* VNodeType.CustomElement */:
            patchCustomElement(n1, n2, parent, n2.data.renderer ?? renderer);
            break;
        }
      }
      function mount(node, parent, renderer, anchor) {
        switch (node.type) {
          case 0 /* VNodeType.Text */:
            // VText has no special capability, fallback to the owner's renderer
            mountText(node, parent, anchor, renderer);
            break;
          case 1 /* VNodeType.Comment */:
            // VComment has no special capability, fallback to the owner's renderer
            mountComment(node, parent, anchor, renderer);
            break;
          case 4 /* VNodeType.Static */:
            // VStatic cannot have a custom renderer associated to them, using owner's renderer
            mountStatic(node, parent, anchor, renderer);
            break;
          case 5 /* VNodeType.Fragment */:
            mountFragment(node, parent, anchor, renderer);
            break;
          case 2 /* VNodeType.Element */:
            // If the vnode data has a renderer override use it, else fallback to owner's renderer
            mountElement(node, parent, anchor, node.data.renderer ?? renderer);
            break;
          case 3 /* VNodeType.CustomElement */:
            // If the vnode data has a renderer override use it, else fallback to owner's renderer
            mountCustomElement(node, parent, anchor, node.data.renderer ?? renderer);
            break;
        }
      }
      function mountText(vnode, parent, anchor, renderer) {
        const {
          owner
        } = vnode;
        const {
          createText
        } = renderer;
        const textNode = vnode.elm = createText(vnode.text);
        linkNodeToShadow(textNode, owner, renderer);
        insertNode(textNode, parent, anchor, renderer);
      }
      function patchComment(n1, n2, renderer) {
        n2.elm = n1.elm;
        // FIXME: Comment nodes should be static, we shouldn't need to diff them together. However
        // it is the case today.
        if (n2.text !== n1.text) {
          updateTextContent$1(n2, renderer);
        }
      }
      function mountComment(vnode, parent, anchor, renderer) {
        const {
          owner
        } = vnode;
        const {
          createComment
        } = renderer;
        const commentNode = vnode.elm = createComment(vnode.text);
        linkNodeToShadow(commentNode, owner, renderer);
        insertNode(commentNode, parent, anchor, renderer);
      }
      function mountFragment(vnode, parent, anchor, renderer) {
        const {
          children
        } = vnode;
        mountVNodes(children, parent, renderer, anchor);
        vnode.elm = vnode.leading.elm;
      }
      function patchFragment(n1, n2, parent, renderer) {
        const {
          children,
          stable
        } = n2;
        if (stable) {
          updateStaticChildren(n1.children, children, parent, renderer);
        } else {
          updateDynamicChildren(n1.children, children, parent, renderer);
        }
        // Note: not reusing n1.elm, because during patching, it may be patched with another text node.
        n2.elm = n2.leading.elm;
      }
      function mountElement(vnode, parent, anchor, renderer) {
        const {
          sel,
          owner,
          data: {
            svg
          }
        } = vnode;
        const {
          createElement
        } = renderer;
        const namespace = isTrue(svg) ? SVG_NAMESPACE : undefined;
        const elm = vnode.elm = createElement(sel, namespace);
        linkNodeToShadow(elm, owner, renderer);
        applyStyleScoping(elm, owner, renderer);
        applyDomManual(elm, vnode);
        patchElementPropsAndAttrsAndRefs$1(null, vnode, renderer);
        insertNode(elm, parent, anchor, renderer);
        mountVNodes(vnode.children, elm, renderer, null);
      }
      function patchStatic(n1, n2, renderer) {
        n2.elm = n1.elm;
        // slotAssignments can only apply to the top level element, never to a static part.
        patchSlotAssignment(n1, n2, renderer);
        // The `refs` object is blown away in every re-render, so we always need to re-apply them
        patchStaticParts(n1, n2, renderer);
      }
      function patchElement(n1, n2, renderer) {
        const elm = n2.elm = n1.elm;
        patchElementPropsAndAttrsAndRefs$1(n1, n2, renderer);
        patchChildren(n1.children, n2.children, elm, renderer);
      }
      function mountStatic(vnode, parent, anchor, renderer) {
        const {
          owner
        } = vnode;
        const {
          cloneNode,
          isSyntheticShadowDefined
        } = renderer;
        const elm = vnode.elm = cloneNode(vnode.fragment, true);
        // Define the root node shadow resolver
        linkNodeToShadow(elm, owner, renderer);
        const {
          renderMode,
          shadowMode
        } = owner;
        if (isSyntheticShadowDefined) {
          // Marks this node as Static to propagate the shadow resolver. must happen after elm is assigned to the proper shadow
          if (shadowMode === 1 /* ShadowMode.Synthetic */ || renderMode === 0 /* RenderMode.Light */) {
            elm[KEY__SHADOW_STATIC] = true;
          }
        }
        // slotAssignments can only apply to the top level element, never to a static part.
        patchSlotAssignment(null, vnode, renderer);
        mountStaticParts(elm, vnode, renderer);
        insertNode(elm, parent, anchor, renderer);
      }
      function mountCustomElement(vnode, parent, anchor, renderer) {
        const {
          sel,
          owner,
          ctor
        } = vnode;
        const {
          createCustomElement
        } = renderer;
        /**
         * Note: if the upgradable constructor does not expect, or throw when we new it
         * with a callback as the first argument, we could implement a more advanced
         * mechanism that only passes that argument if the constructor is known to be
         * an upgradable custom element.
         */
        let vm;
        const upgradeCallback = elm => {
          // the custom element from the registry is expecting an upgrade callback
          vm = createViewModelHook(elm, vnode, renderer);
        };
        // Should never get a tag with upper case letter at this point; the compiler
        // should produce only tags with lowercase letters. However, the Java
        // compiler may generate tagnames with uppercase letters so - for backwards
        // compatibility, we lower case the tagname here.
        const normalizedTagname = sel.toLowerCase();
        const useNativeLifecycle = !lwcRuntimeFlags.DISABLE_NATIVE_CUSTOM_ELEMENT_LIFECYCLE;
        const isFormAssociated = shouldBeFormAssociated(ctor);
        const elm = createCustomElement(normalizedTagname, upgradeCallback, useNativeLifecycle, isFormAssociated);
        vnode.elm = elm;
        vnode.vm = vm;
        linkNodeToShadow(elm, owner, renderer);
        applyStyleScoping(elm, owner, renderer);
        if (vm) {
          allocateChildren(vnode, vm);
        }
        patchElementPropsAndAttrsAndRefs$1(null, vnode, renderer);
        insertNode(elm, parent, anchor, renderer);
        if (vm) {
          {
            if (!useNativeLifecycle) {
              runConnectedCallback(vm);
            }
          }
        }
        mountVNodes(vnode.children, elm, renderer, null);
        if (vm) {
          appendVM(vm);
        }
      }
      function patchCustomElement(n1, n2, parent, renderer) {
        // TODO [#3331]: This if branch should be removed in 246 with lwc:dynamic
        if (n1.ctor !== n2.ctor) {
          // If the constructor differs, unmount the current component and mount a new one using the new
          // constructor.
          const anchor = renderer.nextSibling(n1.elm);
          unmount(n1, parent, renderer, true);
          mountCustomElement(n2, parent, anchor, renderer);
        } else {
          // Otherwise patch the existing component with new props/attrs/etc.
          const elm = n2.elm = n1.elm;
          const vm = n2.vm = n1.vm;
          patchElementPropsAndAttrsAndRefs$1(n1, n2, renderer);
          if (!isUndefined$1(vm)) {
            // in fallback mode, the allocation will always set children to
            // empty and delegate the real allocation to the slot elements
            allocateChildren(n2, vm);
            // Solves an edge case with slotted VFragments in native shadow mode.
            //
            // During allocation, in native shadow, slotted VFragment nodes are flattened and their text delimiters are removed
            // to avoid interfering with native slot behavior. When this happens, if any of the fragments
            // were not stable, the children must go through the dynamic diffing algo.
            //
            // If the new children (n2.children) contain no VFragments, but the previous children (n1.children) were dynamic,
            // the new nodes must be marked dynamic so that all nodes are properly updated. The only indicator that the new
            // nodes need to be dynamic comes from the previous children, so we check that to determine whether we need to
            // mark the new children dynamic.
            //
            // Example:
            // n1.children: [div, VFragment('', div, null, ''), div] => [div, div, null, div]; // marked dynamic
            // n2.children: [div, null, div] => [div, null, div] // marked ???
            const {
              shadowMode,
              renderMode
            } = vm;
            if (shadowMode == 0 /* ShadowMode.Native */ && renderMode !== 0 /* RenderMode.Light */ && hasDynamicChildren(n1.children)) {
              // No-op if children has already been marked dynamic by 'allocateChildren()'.
              markAsDynamicChildren(n2.children);
            }
          }
          // in fallback mode, the children will be always empty, so, nothing
          // will happen, but in native, it does allocate the light dom
          patchChildren(n1.children, n2.children, elm, renderer);
          if (!isUndefined$1(vm)) {
            // this will probably update the shadowRoot, but only if the vm is in a dirty state
            // this is important to preserve the top to bottom synchronous rendering phase.
            rerenderVM(vm);
          }
        }
      }
      function mountVNodes(vnodes, parent, renderer, anchor, start = 0, end = vnodes.length) {
        for (; start < end; ++start) {
          const vnode = vnodes[start];
          if (isVNode(vnode)) {
            mount(vnode, parent, renderer, anchor);
          }
        }
      }
      function unmount(vnode, parent, renderer, doRemove = false) {
        const {
          type,
          elm,
          sel
        } = vnode;
        // When unmounting a VNode subtree not all the elements have to removed from the DOM. The
        // subtree root, is the only element worth unmounting from the subtree.
        if (doRemove && type !== 5 /* VNodeType.Fragment */) {
          // The vnode might or might not have a data.renderer associated to it
          // but the removal used here is from the owner instead.
          removeNode(elm, parent, renderer);
        }
        switch (type) {
          case 5 /* VNodeType.Fragment */:
            {
              unmountVNodes(vnode.children, parent, renderer, doRemove);
              break;
            }
          case 2 /* VNodeType.Element */:
            {
              // Slot content is removed to trigger slotchange event when removing slot.
              // Only required for synthetic shadow.
              const shouldRemoveChildren = sel === 'slot' && vnode.owner.shadowMode === 1 /* ShadowMode.Synthetic */;
              unmountVNodes(vnode.children, elm, renderer, shouldRemoveChildren);
              break;
            }
          case 3 /* VNodeType.CustomElement */:
            {
              const {
                vm
              } = vnode;
              // No need to unmount the children here, `removeVM` will take care of removing the
              // children.
              if (!isUndefined$1(vm)) {
                removeVM(vm);
              }
            }
        }
      }
      function unmountVNodes(vnodes, parent, renderer, doRemove = false, start = 0, end = vnodes.length) {
        for (; start < end; ++start) {
          const ch = vnodes[start];
          if (isVNode(ch)) {
            unmount(ch, parent, renderer, doRemove);
          }
        }
      }
      function isVNode(vnode) {
        return vnode != null;
      }
      function linkNodeToShadow(elm, owner, renderer) {
        const {
          renderRoot,
          renderMode,
          shadowMode
        } = owner;
        const {
          isSyntheticShadowDefined
        } = renderer;
        // TODO [#1164]: this should eventually be done by the polyfill directly
        if (isSyntheticShadowDefined) {
          if (shadowMode === 1 /* ShadowMode.Synthetic */ || renderMode === 0 /* RenderMode.Light */) {
            elm[KEY__SHADOW_RESOLVER] = renderRoot[KEY__SHADOW_RESOLVER];
          }
        }
      }
      function insertFragmentOrNode(vnode, parent, anchor, renderer) {
        if (isVFragment(vnode)) {
          const children = vnode.children;
          for (let i = 0; i < children.length; i += 1) {
            const child = children[i];
            if (!isNull(child)) {
              renderer.insert(child.elm, parent, anchor);
            }
          }
        } else {
          renderer.insert(vnode.elm, parent, anchor);
        }
      }
      function insertNode(node, parent, anchor, renderer) {
        renderer.insert(node, parent, anchor);
      }
      function removeNode(node, parent, renderer) {
        renderer.remove(node, parent);
      }
      function patchElementPropsAndAttrsAndRefs$1(oldVnode, vnode, renderer) {
        if (isNull(oldVnode)) {
          applyEventListeners(vnode, renderer);
          applyStaticClassAttribute(vnode, renderer);
          applyStaticStyleAttribute(vnode, renderer);
        }
        const {
          owner
        } = vnode;
        patchDynamicEventListeners(oldVnode, vnode, renderer, owner);
        // Attrs need to be applied to element before props IE11 will wipe out value on radio inputs if
        // value is set before type=radio.
        patchClassAttribute(oldVnode, vnode, renderer);
        patchStyleAttribute(oldVnode, vnode, renderer);
        patchAttributes(oldVnode, vnode, renderer);
        patchProps(oldVnode, vnode, renderer);
        patchSlotAssignment(oldVnode, vnode, renderer);
        // The `refs` object is blown away in every re-render, so we always need to re-apply them
        applyRefs(vnode, owner);
      }
      function applyStyleScoping(elm, owner, renderer) {
        const {
          getClassList
        } = renderer;
        // Set the class name for `*.scoped.css` style scoping.
        const scopeToken = getScopeTokenClass(owner, /* legacy */false);
        if (!isNull(scopeToken)) {
          if (!isValidScopeToken(scopeToken)) {
            // See W-16614556
            throw new Error('stylesheet token must be a valid string');
          }
          // TODO [#2762]: this dot notation with add is probably problematic
          // probably we should have a renderer api for just the add operation
          getClassList(elm).add(scopeToken);
        }
        // TODO [#3733]: remove support for legacy scope tokens
        if (lwcRuntimeFlags.ENABLE_LEGACY_SCOPE_TOKENS) {
          const legacyScopeToken = getScopeTokenClass(owner, /* legacy */true);
          if (!isNull(legacyScopeToken)) {
            if (!isValidScopeToken(legacyScopeToken)) {
              // See W-16614556
              throw new Error('stylesheet token must be a valid string');
            }
            // TODO [#2762]: this dot notation with add is probably problematic
            // probably we should have a renderer api for just the add operation
            getClassList(elm).add(legacyScopeToken);
          }
        }
        // Set property element for synthetic shadow DOM style scoping.
        const {
          stylesheetToken: syntheticToken
        } = owner.context;
        if (owner.shadowMode === 1 /* ShadowMode.Synthetic */) {
          if (!isUndefined$1(syntheticToken)) {
            elm.$shadowToken$ = syntheticToken;
          }
          if (lwcRuntimeFlags.ENABLE_LEGACY_SCOPE_TOKENS) {
            const legacyToken = owner.context.legacyStylesheetToken;
            if (!isUndefined$1(legacyToken)) {
              elm.$legacyShadowToken$ = legacyToken;
            }
          }
        }
      }
      function applyDomManual(elm, vnode) {
        const {
          owner,
          data: {
            context
          }
        } = vnode;
        if (owner.shadowMode === 1 /* ShadowMode.Synthetic */ && context?.lwc?.dom === 'manual') {
          elm.$domManual$ = true;
        }
      }
      function allocateChildren(vnode, vm) {
        // A component with slots will re-render because:
        // 1- There is a change of the internal state.
        // 2- There is a change on the external api (ex: slots)
        //
        // In case #1, the vnodes in the cmpSlots will be reused since they didn't changed. This routine emptied the
        // slotted children when those VCustomElement were rendered and therefore in subsequent calls to allocate children
        // in a reused VCustomElement, there won't be any slotted children.
        // For those cases, we will use the reference for allocated children stored when rendering the fresh VCustomElement.
        //
        // In case #2, we will always get a fresh VCustomElement.
        const children = vnode.aChildren || vnode.children;
        const {
          renderMode,
          shadowMode
        } = vm;
        // If any of the children being allocated are VFragments, we remove the text delimiters and flatten all immediate
        // children VFragments to avoid them interfering with default slot behavior.
        const allocatedChildren = flattenFragmentsInChildren(children);
        vnode.children = allocatedChildren;
        vm.aChildren = allocatedChildren;
        if (shadowMode === 1 /* ShadowMode.Synthetic */ || renderMode === 0 /* RenderMode.Light */) {
          // slow path
          allocateInSlot(vm, allocatedChildren, vnode.owner);
          // save the allocated children in case this vnode is reused.
          vnode.aChildren = allocatedChildren;
          // every child vnode is now allocated, and the host should receive none directly, it receives them via the shadow!
          vnode.children = EmptyArray;
        }
      }
      /**
       * Flattens the contents of all VFragments in an array of VNodes, removes the text delimiters on those VFragments, and
       * marks the resulting children array as dynamic. Uses a stack (array) to iteratively traverse the nested VFragments
       * and avoid the perf overhead of creating/destroying throwaway arrays/objects in a recursive approach.
       *
       * With the delimiters removed, the contents are marked dynamic so they are diffed correctly.
       *
       * This function is used for slotted VFragments to avoid the text delimiters interfering with slotting functionality.
       * @param children
       */
      function flattenFragmentsInChildren(children) {
        const flattenedChildren = [];
        // Initialize our stack with the direct children of the custom component and check whether we have a VFragment.
        // If no VFragment is found in children, we don't need to traverse anything or mark the children dynamic and can return early.
        const nodeStack = [];
        let fragmentFound = false;
        for (let i = children.length - 1; i > -1; i -= 1) {
          const child = children[i];
          ArrayPush$1.call(nodeStack, child);
          fragmentFound = fragmentFound || !!(child && isVFragment(child));
        }
        if (!fragmentFound) {
          return children;
        }
        let currentNode;
        while (!isUndefined$1(currentNode = ArrayPop.call(nodeStack))) {
          if (!isNull(currentNode) && isVFragment(currentNode)) {
            const fChildren = currentNode.children;
            // Ignore the start and end text node delimiters
            for (let i = fChildren.length - 2; i > 0; i -= 1) {
              ArrayPush$1.call(nodeStack, fChildren[i]);
            }
          } else {
            ArrayPush$1.call(flattenedChildren, currentNode);
          }
        }
        // We always mark the children as dynamic because nothing generates stable VFragments yet.
        // If/when stable VFragments are generated by the compiler, this code should be updated to
        // not mark dynamic if all flattened VFragments were stable.
        markAsDynamicChildren(flattenedChildren);
        return flattenedChildren;
      }
      function createViewModelHook(elm, vnode, renderer) {
        let vm = getAssociatedVMIfPresent(elm);
        // There is a possibility that a custom element is registered under tagName, in which case, the
        // initialization is already carry on, and there is nothing else to do here since this hook is
        // called right after invoking `document.createElement`.
        if (!isUndefined$1(vm)) {
          return vm;
        }
        const {
          sel,
          mode,
          ctor,
          owner
        } = vnode;
        vm = createVM(elm, ctor, renderer, {
          mode,
          owner,
          tagName: sel
        });
        return vm;
      }
      function allocateInSlot(vm, children, owner) {
        const {
          cmpSlots: {
            slotAssignments: oldSlotsMapping
          }
        } = vm;
        const cmpSlotsMapping = create(null);
        // Collect all slots into cmpSlotsMapping
        for (let i = 0, len = children.length; i < len; i += 1) {
          const vnode = children[i];
          if (isNull(vnode)) {
            continue;
          }
          let slotName = '';
          if (isVBaseElement(vnode) || isVStatic(vnode)) {
            slotName = vnode.slotAssignment ?? '';
          } else if (isVScopedSlotFragment(vnode)) {
            slotName = vnode.slotName;
          }
          // Can't use toString here because Symbol(1).toString() is 'Symbol(1)'
          // but elm.setAttribute('slot', Symbol(1)) is an error.
          // the following line also throws same error for symbols
          // Similar for Object.create(null)
          // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
          const normalizedSlotName = '' + slotName;
          const vnodes = cmpSlotsMapping[normalizedSlotName] = cmpSlotsMapping[normalizedSlotName] || [];
          ArrayPush$1.call(vnodes, vnode);
        }
        vm.cmpSlots = {
          owner,
          slotAssignments: cmpSlotsMapping
        };
        if (isFalse(vm.isDirty)) {
          // We need to determine if the old allocation is really different from the new one
          // and mark the vm as dirty
          const oldKeys = keys(oldSlotsMapping);
          if (oldKeys.length !== keys(cmpSlotsMapping).length) {
            markComponentAsDirty(vm);
            return;
          }
          for (let i = 0, len = oldKeys.length; i < len; i += 1) {
            const key = oldKeys[i];
            if (isUndefined$1(cmpSlotsMapping[key]) || oldSlotsMapping[key].length !== cmpSlotsMapping[key].length) {
              markComponentAsDirty(vm);
              return;
            }
            const oldVNodes = oldSlotsMapping[key];
            const vnodes = cmpSlotsMapping[key];
            for (let j = 0, a = cmpSlotsMapping[key].length; j < a; j += 1) {
              if (oldVNodes[j] !== vnodes[j]) {
                markComponentAsDirty(vm);
                return;
              }
            }
          }
        }
      }
      const DynamicChildren = new WeakSet();
      // dynamic children means it was either generated by an iteration in a template
      // or part of an unstable fragment, and will require a more complex diffing algo.
      function markAsDynamicChildren(children) {
        DynamicChildren.add(children);
      }
      function hasDynamicChildren(children) {
        return DynamicChildren.has(children);
      }
      function createKeyToOldIdx(children, beginIdx, endIdx) {
        const map = {};
        // TODO [#1637]: simplify this by assuming that all vnodes has keys
        for (let j = beginIdx; j <= endIdx; ++j) {
          const ch = children[j];
          if (isVNode(ch)) {
            const {
              key
            } = ch;
            if (key !== undefined) {
              map[key] = j;
            }
          }
        }
        return map;
      }
      function updateDynamicChildren(oldCh, newCh, parent, renderer) {
        let oldStartIdx = 0;
        let newStartIdx = 0;
        let oldEndIdx = oldCh.length - 1;
        let oldStartVnode = oldCh[0];
        let oldEndVnode = oldCh[oldEndIdx];
        const newChEnd = newCh.length - 1;
        let newEndIdx = newChEnd;
        let newStartVnode = newCh[0];
        let newEndVnode = newCh[newEndIdx];
        let oldKeyToIdx;
        let idxInOld;
        let elmToMove;
        let before;
        let clonedOldCh = false;
        while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
          if (!isVNode(oldStartVnode)) {
            oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
          } else if (!isVNode(oldEndVnode)) {
            oldEndVnode = oldCh[--oldEndIdx];
          } else if (!isVNode(newStartVnode)) {
            newStartVnode = newCh[++newStartIdx];
          } else if (!isVNode(newEndVnode)) {
            newEndVnode = newCh[--newEndIdx];
          } else if (isSameVnode(oldStartVnode, newStartVnode)) {
            patch(oldStartVnode, newStartVnode, parent, renderer);
            oldStartVnode = oldCh[++oldStartIdx];
            newStartVnode = newCh[++newStartIdx];
          } else if (isSameVnode(oldEndVnode, newEndVnode)) {
            patch(oldEndVnode, newEndVnode, parent, renderer);
            oldEndVnode = oldCh[--oldEndIdx];
            newEndVnode = newCh[--newEndIdx];
          } else if (isSameVnode(oldStartVnode, newEndVnode)) {
            // Vnode moved right
            patch(oldStartVnode, newEndVnode, parent, renderer);
            // In the case of fragments, the `elm` property of a vfragment points to the leading
            // anchor. To determine the next sibling of the whole fragment, we need to use the
            // trailing anchor as the argument to nextSibling():
            // [..., [leading, ...content, trailing], nextSibling, ...]
            let anchor;
            if (isVFragment(oldEndVnode)) {
              anchor = renderer.nextSibling(oldEndVnode.trailing.elm);
            } else {
              anchor = renderer.nextSibling(oldEndVnode.elm);
            }
            insertFragmentOrNode(oldStartVnode, parent, anchor, renderer);
            oldStartVnode = oldCh[++oldStartIdx];
            newEndVnode = newCh[--newEndIdx];
          } else if (isSameVnode(oldEndVnode, newStartVnode)) {
            // Vnode moved left
            patch(oldEndVnode, newStartVnode, parent, renderer);
            insertFragmentOrNode(newStartVnode, parent, oldStartVnode.elm, renderer);
            oldEndVnode = oldCh[--oldEndIdx];
            newStartVnode = newCh[++newStartIdx];
          } else {
            if (oldKeyToIdx === undefined) {
              oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
            }
            idxInOld = oldKeyToIdx[newStartVnode.key];
            if (isUndefined$1(idxInOld)) {
              // New element
              mount(newStartVnode, parent, renderer, oldStartVnode.elm);
              newStartVnode = newCh[++newStartIdx];
            } else {
              elmToMove = oldCh[idxInOld];
              if (isVNode(elmToMove)) {
                if (elmToMove.sel !== newStartVnode.sel) {
                  // New element
                  mount(newStartVnode, parent, renderer, oldStartVnode.elm);
                } else {
                  patch(elmToMove, newStartVnode, parent, renderer);
                  // Delete the old child, but copy the array since it is read-only.
                  // The `oldCh` will be GC'ed after `updateDynamicChildren` is complete,
                  // so we only care about the `oldCh` object inside this function.
                  // To avoid cloning over and over again, we check `clonedOldCh`
                  // and only clone once.
                  if (!clonedOldCh) {
                    clonedOldCh = true;
                    oldCh = [...oldCh];
                  }
                  // We've already cloned at least once, so it's no longer read-only
                  oldCh[idxInOld] = undefined;
                  insertFragmentOrNode(elmToMove, parent, oldStartVnode.elm, renderer);
                }
              }
              newStartVnode = newCh[++newStartIdx];
            }
          }
        }
        if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
          if (oldStartIdx > oldEndIdx) {
            // There's some cases in which the sub array of vnodes to be inserted is followed by null(s) and an
            // already processed vnode, in such cases the vnodes to be inserted should be before that processed vnode.
            let i = newEndIdx;
            let n;
            do {
              n = newCh[++i];
            } while (!isVNode(n) && i < newChEnd);
            before = isVNode(n) ? n.elm : null;
            mountVNodes(newCh, parent, renderer, before, newStartIdx, newEndIdx + 1);
          } else {
            unmountVNodes(oldCh, parent, renderer, true, oldStartIdx, oldEndIdx + 1);
          }
        }
      }
      function updateStaticChildren(c1, c2, parent, renderer) {
        const c1Length = c1.length;
        const c2Length = c2.length;
        if (c1Length === 0) {
          // the old list is empty, we can directly insert anything new
          mountVNodes(c2, parent, renderer, null);
          return;
        }
        if (c2Length === 0) {
          // the old list is nonempty and the new list is empty so we can directly remove all old nodes
          // this is the case in which the dynamic children of an if-directive should be removed
          unmountVNodes(c1, parent, renderer, true);
          return;
        }
        // if the old list is not empty, the new list MUST have the same
        // amount of nodes, that's why we call this static children
        let anchor = null;
        for (let i = c2Length - 1; i >= 0; i -= 1) {
          const n1 = c1[i];
          const n2 = c2[i];
          if (n2 !== n1) {
            if (isVNode(n1)) {
              if (isVNode(n2)) {
                if (isSameVnode(n1, n2)) {
                  // both vnodes are equivalent, and we just need to patch them
                  patch(n1, n2, parent, renderer);
                  anchor = n2.elm;
                } else {
                  // removing the old vnode since the new one is different
                  unmount(n1, parent, renderer, true);
                  mount(n2, parent, renderer, anchor);
                  anchor = n2.elm;
                }
              } else {
                // removing the old vnode since the new one is null
                unmount(n1, parent, renderer, true);
              }
            } else if (isVNode(n2)) {
              mount(n2, parent, renderer, anchor);
              anchor = n2.elm;
            }
          }
        }
      }
  
      /*
       * Copyright (c) 2024, Salesforce, Inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      const SymbolIterator = Symbol.iterator;
      function addVNodeToChildLWC(vnode) {
        ArrayPush$1.call(getVMBeingRendered().velements, vnode);
      }
      // [s]tatic [p]art
      function sp(partId, data, text) {
        // Static part will always have either text or data, it's guaranteed by the compiler.
        const type = isNull(text) ? 1 /* VStaticPartType.Element */ : 0 /* VStaticPartType.Text */;
        return {
          type,
          partId,
          data,
          text,
          elm: undefined // elm is defined later
        };
      }
      // [s]coped [s]lot [f]actory
      function ssf(slotName, factory) {
        return {
          type: 6 /* VNodeType.ScopedSlotFragment */,
          factory,
          owner: getVMBeingRendered(),
          elm: undefined,
          sel: '__scoped_slot_fragment__',
          key: undefined,
          slotName
        };
      }
      // [st]atic node
      function st(fragmentFactory, key, parts) {
        const owner = getVMBeingRendered();
        const fragment = fragmentFactory(parts);
        const vnode = {
          type: 4 /* VNodeType.Static */,
          sel: '__static__',
          key,
          elm: undefined,
          fragment,
          owner,
          parts,
          slotAssignment: undefined
        };
        return vnode;
      }
      // [fr]agment node
      function fr(key, children, stable) {
        const owner = getVMBeingRendered();
        const useCommentNodes = isAPIFeatureEnabled(5 /* APIFeature.USE_COMMENTS_FOR_FRAGMENT_BOOKENDS */, owner.apiVersion);
        const leading = useCommentNodes ? co('') : t('');
        const trailing = useCommentNodes ? co('') : t('');
        return {
          type: 5 /* VNodeType.Fragment */,
          sel: '__fragment__',
          key,
          elm: undefined,
          children: [leading, ...children, trailing],
          stable,
          owner,
          leading,
          trailing
        };
      }
      // [h]tml node
      function h(sel, data, children = EmptyArray) {
        const vmBeingRendered = getVMBeingRendered();
        const {
          key,
          slotAssignment
        } = data;
        const vnode = {
          type: 2 /* VNodeType.Element */,
          sel,
          data,
          children,
          elm: undefined,
          key,
          owner: vmBeingRendered,
          slotAssignment
        };
        return vnode;
      }
      // [t]ab[i]ndex function
      function ti(value) {
        // if value is greater than 0, we normalize to 0
        // If value is an invalid tabIndex value (null, undefined, string, etc), we let that value pass through
        // If value is less than -1, we don't care
        const shouldNormalize = value > 0 && !(isTrue(value) || isFalse(value));
        return shouldNormalize ? 0 : value;
      }
      // [s]lot element node
      function s(slotName, data, children, slotset) {
        const vmBeingRendered = getVMBeingRendered();
        const {
          renderMode,
          apiVersion
        } = vmBeingRendered;
        if (!isUndefined$1(slotset) && !isUndefined$1(slotset.slotAssignments) && !isUndefined$1(slotset.slotAssignments[slotName]) && slotset.slotAssignments[slotName].length !== 0) {
          const newChildren = [];
          const slotAssignments = slotset.slotAssignments[slotName];
          for (let i = 0; i < slotAssignments.length; i++) {
            const vnode = slotAssignments[i];
            if (!isNull(vnode)) {
              const assignedNodeIsScopedSlot = isVScopedSlotFragment(vnode);
              // The only sniff test for a scoped <slot> element is the presence of `slotData`
              const isScopedSlotElement = !isUndefined$1(data.slotData);
              // Check if slot types of parent and child are matching
              if (assignedNodeIsScopedSlot !== isScopedSlotElement) {
                // Ignore slot content from parent
                continue;
              }
              // If the passed slot content is factory, evaluate it and add the produced vnodes
              if (assignedNodeIsScopedSlot) {
                // Evaluate in the scope of the slot content's owner
                // if a slotset is provided, there will always be an owner. The only case where owner is
                // undefined is for root components, but root components cannot accept slotted content
                setVMBeingRendered(slotset.owner);
                try {
                  // The factory function is a template snippet from the slot set owner's template,
                  // hence switch over to the slot set owner's template reactive observer
                  const {
                    tro
                  } = slotset.owner;
                  tro.observe(() => {
                    ArrayPush$1.call(newChildren, vnode.factory(data.slotData, data.key));
                  });
                } finally {
                  setVMBeingRendered(vmBeingRendered);
                }
              } else {
                // This block is for standard slots (non-scoped slots)
                let clonedVNode;
                if (renderMode === 0 /* RenderMode.Light */ && isAPIFeatureEnabled(6 /* APIFeature.USE_LIGHT_DOM_SLOT_FORWARDING */, apiVersion) && (isVBaseElement(vnode) || isVStatic(vnode)) && vnode.slotAssignment !== data.slotAssignment) {
                  // When the light DOM slot assignment (slot attribute) changes, we can't use the same reference
                  // to the vnode because the current way the diffing algo works, it will replace the original
                  // reference to the host element with a new one. This means the new element will be mounted and
                  // immediately unmounted. Creating a copy of the vnode preserves a reference to the previous
                  // host element.
                  clonedVNode = {
                    ...vnode,
                    slotAssignment: data.slotAssignment
                  };
                  // For disconnectedCallback to work correctly in synthetic lifecycle mode, we need to link the
                  // current VM's velements to the clone, so that when the VM unmounts, the clone also unmounts.
                  // Note this only applies to VCustomElements, since those are the elements that we manually need
                  // to call disconnectedCallback for, when running in synthetic lifecycle mode.
                  //
                  // You might think it would make more sense to add the clonedVNode to the same velements array
                  // as the original vnode's VM (i.e. `vnode.owner.velements`) rather than the current VM (i.e.
                  // `vmBeingRendered.velements`), but this actually might not trigger disconnectedCallback
                  // in synthetic lifecycle mode. The reason for this is that a reactivity change may cause
                  // the slottable component to unmount, but _not_ the slotter component (see issue #4446).
                  //
                  // If this occurs, then the slottable component (i.e .this component we are rendering right
                  // now) is the one that needs to own the clone. Whereas if a reactivity change higher in the
                  // tree causes the slotter to unmount, then the slottable will also unmount. So using the
                  // current VM works either way.
                  if (isVCustomElement(vnode)) {
                    addVNodeToChildLWC(clonedVNode);
                  }
                }
                // If the slot content is standard type, the content is static, no additional
                // processing needed on the vnode
                ArrayPush$1.call(newChildren, clonedVNode ?? vnode);
              }
            }
          }
          children = newChildren;
        }
        const {
          shadowMode
        } = vmBeingRendered;
        if (renderMode === 0 /* RenderMode.Light */) {
          // light DOM slots - backwards-compatible behavior uses flattening, new behavior uses fragments
          if (isAPIFeatureEnabled(2 /* APIFeature.USE_FRAGMENTS_FOR_LIGHT_DOM_SLOTS */, apiVersion)) {
            return fr(data.key, children, 0);
          } else {
            sc(children);
            return children;
          }
        }
        if (shadowMode === 1 /* ShadowMode.Synthetic */) {
          // TODO [#1276]: compiler should give us some sort of indicator when a vnodes collection is dynamic
          sc(children);
        }
        return h('slot', data, children);
      }
      // [c]ustom element node
      function c(sel, Ctor, data, children = EmptyArray) {
        const vmBeingRendered = getVMBeingRendered();
        const {
          key,
          slotAssignment
        } = data;
        let elm, aChildren, vm;
        const vnode = {
          type: 3 /* VNodeType.CustomElement */,
          sel,
          data,
          children,
          elm,
          key,
          slotAssignment,
          ctor: Ctor,
          owner: vmBeingRendered,
          mode: 'open',
          // TODO [#1294]: this should be defined in Ctor
          aChildren,
          vm
        };
        addVNodeToChildLWC(vnode);
        return vnode;
      }
      // [i]terable node
      function i(iterable, factory) {
        const list = [];
        // TODO [#1276]: compiler should give us some sort of indicator when a vnodes collection is dynamic
        sc(list);
        if (isUndefined$1(iterable) || isNull(iterable)) {
          return list;
        }
        const iterator = iterable[SymbolIterator]();
        let next = iterator.next();
        let j = 0;
        let {
          value,
          done: last
        } = next;
        while (last === false) {
          // implementing a look-back-approach because we need to know if the element is the last
          next = iterator.next();
          last = next.done;
          // template factory logic based on the previous collected value
          const vnode = factory(value, j, j === 0, last === true);
          if (isArray$1(vnode)) {
            ArrayPush$1.apply(list, vnode);
          } else {
            // `isArray` doesn't narrow this block properly...
            ArrayPush$1.call(list, vnode);
          }
          // preparing next value
          j += 1;
          value = next.value;
        }
        return list;
      }
      /**
       * [f]lattening
       * @param items
       */
      function f(items) {
        const len = items.length;
        const flattened = [];
        // TODO [#1276]: compiler should give us some sort of indicator when a vnodes collection is dynamic
        sc(flattened);
        for (let j = 0; j < len; j += 1) {
          const item = items[j];
          if (isArray$1(item)) {
            ArrayPush$1.apply(flattened, item);
          } else {
            // `isArray` doesn't narrow this block properly...
            ArrayPush$1.call(flattened, item);
          }
        }
        return flattened;
      }
      // [t]ext node
      function t(text) {
        let key, elm;
        return {
          type: 0 /* VNodeType.Text */,
          sel: '__text__',
          text,
          elm,
          key,
          owner: getVMBeingRendered()
        };
      }
      // [co]mment node
      function co(text) {
        let elm, key;
        return {
          type: 1 /* VNodeType.Comment */,
          sel: '__comment__',
          text,
          elm,
          key,
          owner: getVMBeingRendered()
        };
      }
      // [d]ynamic text
      function d(value) {
        return value == null ? '' : String(value);
      }
      // [b]ind function
      function b(fn) {
        const vmBeingRendered = getVMBeingRendered();
        if (isNull(vmBeingRendered)) {
          throw new Error();
        }
        const vm = vmBeingRendered;
        return function (event) {
          invokeEventListener(vm, fn, vm.component, event);
        };
      }
      // [k]ey function
      function k(compilerKey, obj) {
        switch (typeof obj) {
          case 'number':
          case 'string':
            return compilerKey + ':' + obj;
        }
      }
      // [g]lobal [id] function
      function gid(id) {
        const vmBeingRendered = getVMBeingRendered();
        if (isUndefined$1(id) || id === '') {
          return id;
        }
        // We remove attributes when they are assigned a value of null
        if (isNull(id)) {
          return null;
        }
        const {
          idx,
          shadowMode
        } = vmBeingRendered;
        if (shadowMode === 1 /* ShadowMode.Synthetic */) {
          return StringReplace.call(id, /\S+/g, id => `${id}-${idx}`);
        }
        return id;
      }
      // [f]ragment [id] function
      function fid(url) {
        const vmBeingRendered = getVMBeingRendered();
        if (isUndefined$1(url) || url === '') {
          return url;
        }
        // We remove attributes when they are assigned a value of null
        if (isNull(url)) {
          return null;
        }
        const {
          idx,
          shadowMode
        } = vmBeingRendered;
        // Apply transformation only for fragment-only-urls, and only in shadow DOM
        if (shadowMode === 1 /* ShadowMode.Synthetic */ && /^#/.test(url)) {
          return `${url}-${idx}`;
        }
        return url;
      }
      /**
       * [ddc] - create a (deprecated) dynamic component via `<x-foo lwc:dynamic={Ctor}>`
       *
       * TODO [#3331]: remove usage of lwc:dynamic in 246
       * @param sel
       * @param Ctor
       * @param data
       * @param children
       */
      function ddc(sel, Ctor, data, children = EmptyArray) {
        // null or undefined values should produce a null value in the VNodes
        if (isNull(Ctor) || isUndefined$1(Ctor)) {
          return null;
        }
        if (!isComponentConstructor(Ctor)) {
          throw new Error(`Invalid LWC Constructor ${toString(Ctor)} for custom element <${sel}>.`);
        }
        return c(sel, Ctor, data, children);
      }
      /**
       * [dc] - create a dynamic component via `<lwc:component lwc:is={Ctor}>`
       * @param Ctor
       * @param data
       * @param children
       */
      function dc(Ctor, data, children = EmptyArray) {
        // Null or undefined values should produce a null value in the VNodes.
        // This is the only value at compile time as the constructor will not be known.
        if (isNull(Ctor) || isUndefined$1(Ctor)) {
          return null;
        }
        if (!isComponentConstructor(Ctor)) {
          throw new Error(`Invalid constructor: "${toString(Ctor)}" is not a LightningElement constructor.`);
        }
        // Look up the dynamic component's name at runtime once the constructor is available.
        // This information is only known at runtime and is stored as part of registerComponent.
        const sel = getComponentRegisteredName(Ctor);
        if (isUndefined$1(sel) || sel === '') {
          throw new Error(`Invalid LWC constructor ${toString(Ctor)} does not have a registered name`);
        }
        return c(sel, Ctor, data, children);
      }
      /**
       * slow children collection marking mechanism. this API allows the compiler to signal
       * to the engine that a particular collection of children must be diffed using the slow
       * algo based on keys due to the nature of the list. E.g.:
       *
       * - slot element's children: the content of the slot has to be dynamic when in synthetic
       * shadow mode because the `vnode.children` might be the slotted
       * content vs default content, in which case the size and the
       * keys are not matching.
       * - children that contain dynamic components
       * - children that are produced by iteration
       * @param vnodes
       */
      function sc(vnodes) {
        // We have to mark the vnodes collection as dynamic so we can later on
        // choose to use the snabbdom virtual dom diffing algo instead of our
        // static dummy algo.
        markAsDynamicChildren(vnodes);
        return vnodes;
      }
      // [s]anitize [h]tml [c]ontent
      function shc(content) {
        const sanitizedString = sanitizeHtmlContent();
        return createSanitizedHtmlContent(sanitizedString);
      }
      const ncls = normalizeClass;
      const api = freeze({
        s,
        h,
        c,
        i,
        f,
        t,
        d,
        b,
        k,
        co,
        dc,
        fr,
        ti,
        st,
        gid,
        fid,
        shc,
        ssf,
        ddc,
        sp,
        ncls
      });
  
      /*
       * Copyright (c) 2024, Salesforce, Inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      // HAS_SCOPED_STYLE | SHADOW_MODE_SYNTHETIC = 3
      const MAX_CACHE_KEY = 3;
      // Mapping of cacheKeys to `string[]` (assumed to come from a tagged template literal) to an Element.
      // Note that every unique tagged template literal will have a unique `string[]`. So by using `string[]`
      // as the WeakMap key, we effectively associate each Element with a unique tagged template literal.
      // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates
      // Also note that this array only needs to be large enough to account for the maximum possible cache key
      const fragmentCache = ArrayFrom({
        length: MAX_CACHE_KEY + 1
      }, () => new WeakMap());
      function getFromFragmentCache(cacheKey, strings) {
        return fragmentCache[cacheKey].get(strings);
      }
      function setInFragmentCache(cacheKey, strings, element) {
        fragmentCache[cacheKey].set(strings, element);
      }
  
      /*
       * Copyright (c) 2024, Salesforce, Inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      let isUpdatingTemplate = false;
      let vmBeingRendered = null;
      function getVMBeingRendered() {
        return vmBeingRendered;
      }
      function setVMBeingRendered(vm) {
        vmBeingRendered = vm;
      }
      function validateSlots(vm) {
        assertNotProd(); // this method should never leak to prod
        const {
          cmpSlots
        } = vm;
        for (const slotName in cmpSlots.slotAssignments) {
          assert.isTrue(isArray$1(cmpSlots.slotAssignments[slotName]), `Slots can only be set to an array, instead received ${toString(cmpSlots.slotAssignments[slotName])} for slot "${slotName}" in ${vm}.`);
        }
      }
      function checkHasMatchingRenderMode(template, vm) {
        // don't validate in prod environments where reporting is disabled
        {
          return;
        }
      }
      const browserExpressionSerializer = (partToken, classAttrToken) => {
        // This will insert the scoped style token as a static class attribute in the fragment
        // bypassing the need to call applyStyleScoping when mounting static parts.
        const type = StringCharAt.call(partToken, 0);
        switch (type) {
          case "c" /* STATIC_PART_TOKEN_ID.CLASS */:
            return classAttrToken;
          case "t" /* STATIC_PART_TOKEN_ID.TEXT */:
            // Using a single space here gives us a single empty text node
            return ' ';
          default:
            return '';
        }
      };
      // This function serializes the expressions generated by static content optimization.
      // Currently this is only needed for SSR.
      // TODO [#4078]: Split the implementation between @lwc/engine-dom and @lwc/engine-server
      function buildSerializeExpressionFn(parts) {
        {
          return browserExpressionSerializer;
        }
      }
      function buildParseFragmentFn(createFragmentFn) {
        return function parseFragment(strings, ...keys) {
          return function applyFragmentParts(parts) {
            const {
              context: {
                hasScopedStyles,
                stylesheetToken,
                legacyStylesheetToken
              },
              shadowMode,
              renderer
            } = getVMBeingRendered();
            const hasStyleToken = !isUndefined$1(stylesheetToken);
            const isSyntheticShadow = shadowMode === 1 /* ShadowMode.Synthetic */;
            const hasLegacyToken = lwcRuntimeFlags.ENABLE_LEGACY_SCOPE_TOKENS && !isUndefined$1(legacyStylesheetToken);
            let cacheKey = 0;
            if (hasStyleToken && hasScopedStyles) {
              cacheKey |= 1 /* FragmentCacheKey.HAS_SCOPED_STYLE */;
            }
            if (hasStyleToken && isSyntheticShadow) {
              cacheKey |= 2 /* FragmentCacheKey.SHADOW_MODE_SYNTHETIC */;
            }
            // Cache is only here to prevent calling innerHTML multiple times which doesn't happen on the server.
            {
              // Disable this on the server to prevent cache poisoning when expressions are used.
              const cached = getFromFragmentCache(cacheKey, strings);
              if (!isUndefined$1(cached)) {
                return cached;
              }
            }
            // See W-16614556
            // TODO [#2826]: freeze the template object
            if (hasStyleToken && !isValidScopeToken(stylesheetToken) || hasLegacyToken && !isValidScopeToken(legacyStylesheetToken)) {
              throw new Error('stylesheet token must be a valid string');
            }
            // If legacy stylesheet tokens are required, then add them to the rendered string
            const stylesheetTokenToRender = stylesheetToken + (hasLegacyToken ? ` ${legacyStylesheetToken}` : '');
            const classToken = hasScopedStyles && hasStyleToken ? ' ' + stylesheetTokenToRender : '';
            const classAttrToken = hasScopedStyles && hasStyleToken ? ` class="${stylesheetTokenToRender}"` : '';
            const attrToken = hasStyleToken && isSyntheticShadow ? ' ' + stylesheetTokenToRender : '';
            // In the browser, we provide the entire class attribute as a perf optimization to avoid applying it on mount.
            // The remaining class expression will be applied when the static parts are mounted.
            // In SSR, the entire class attribute (expression included) is assembled along with the fragment.
            // This is why in the browser we provide the entire class attribute and in SSR we only provide the class token.
            const exprClassToken = classAttrToken;
            // TODO [#3624]: The implementation of this function should be specific to @lwc/engine-dom and @lwc/engine-server.
            // Find a way to split this in a future refactor.
            const serializeExpression = buildSerializeExpressionFn();
            let htmlFragment = '';
            for (let i = 0, n = keys.length; i < n; i++) {
              switch (keys[i]) {
                case 0:
                  // styleToken in existing class attr
                  htmlFragment += strings[i] + classToken;
                  break;
                case 1:
                  // styleToken for added class attr
                  htmlFragment += strings[i] + classAttrToken;
                  break;
                case 2:
                  // styleToken as attr
                  htmlFragment += strings[i] + attrToken;
                  break;
                case 3:
                  // ${1}${2}
                  htmlFragment += strings[i] + classAttrToken + attrToken;
                  break;
                default:
                  // expressions ${partId:attributeName/textId}
                  htmlFragment += strings[i] + serializeExpression(keys[i], exprClassToken);
                  break;
              }
            }
            htmlFragment += strings[strings.length - 1];
            const element = createFragmentFn(htmlFragment, renderer);
            // Cache is only here to prevent calling innerHTML multiple times which doesn't happen on the server.
            {
              setInFragmentCache(cacheKey, strings, element);
            }
            return element;
          };
        };
      }
      // Note: at the moment this code executes, we don't have a renderer yet.
      const parseFragment = buildParseFragmentFn((html, renderer) => {
        const {
          createFragment
        } = renderer;
        return createFragment(html);
      });
      function evaluateTemplate(vm, html) {
        const isUpdatingTemplateInception = isUpdatingTemplate;
        const vmOfTemplateBeingUpdatedInception = vmBeingRendered;
        let vnodes = [];
        runWithBoundaryProtection(vm, vm.owner, () => {
          // pre
          vmBeingRendered = vm;
        }, () => {
          // job
          const {
            component,
            context,
            cmpSlots,
            cmpTemplate,
            tro
          } = vm;
          tro.observe(() => {
            // Reset the cache memoizer for template when needed.
            if (html !== cmpTemplate) {
              // Check that the template was built by the compiler.
              if (!isTemplateRegistered(html)) {
                throw new TypeError(`Invalid template returned by the render() method on ${vm.tagName}. It must return an imported template (e.g.: \`import html from "./${vm.def.name}.html"\`), instead, it has returned: ${toString(html)}.`);
              }
              checkHasMatchingRenderMode(html, vm);
              // Perf opt: do not reset the shadow root during the first rendering (there is
              // nothing to reset).
              if (!isNull(cmpTemplate)) {
                // It is important to reset the content to avoid reusing similar elements
                // generated from a different template, because they could have similar IDs,
                // and snabbdom just rely on the IDs.
                resetComponentRoot(vm);
              }
              vm.cmpTemplate = html;
              // Create a brand new template cache for the swapped templated.
              context.tplCache = create(null);
              // Set the computeHasScopedStyles property in the context, to avoid recomputing it repeatedly.
              context.hasScopedStyles = computeHasScopedStyles(html, vm);
              // Update the scoping token on the host element.
              updateStylesheetToken(vm, html, /* legacy */false);
              if (lwcRuntimeFlags.ENABLE_LEGACY_SCOPE_TOKENS) {
                updateStylesheetToken(vm, html, /* legacy */true);
              }
              // Evaluate, create stylesheet and cache the produced VNode for future
              // re-rendering.
              const stylesheetsContent = getStylesheetsContent(vm, html);
              context.styleVNodes = stylesheetsContent.length === 0 ? null : createStylesheet(vm, stylesheetsContent);
            }
            if ("production" !== 'production') ;
            // right before producing the vnodes, we clear up all internal references
            // to custom elements from the template.
            vm.velements = [];
            // Set the global flag that template is being updated
            isUpdatingTemplate = true;
            vnodes = html.call(undefined, api, component, cmpSlots, context.tplCache);
            const {
              styleVNodes
            } = context;
            if (!isNull(styleVNodes)) {
              // It's important here not to mutate the underlying `vnodes` returned from `html.call()`.
              // The reason for this is because, due to the static content optimization, the vnodes array
              // may be a static array shared across multiple component instances. E.g. this occurs in the
              // case of an empty `<template></template>` in a `component.html` file, due to the underlying
              // children being `[]` (no children). If we append the `<style>` vnode to this array, then the same
              // array will be reused for every component instance, i.e. whenever `tmpl()` is called.
              vnodes = [...styleVNodes, ...vnodes];
            }
          });
        }, () => {
          // post
          isUpdatingTemplate = isUpdatingTemplateInception;
          vmBeingRendered = vmOfTemplateBeingUpdatedInception;
        });
        return vnodes;
      }
      function computeHasScopedStylesInStylesheets(stylesheets) {
        if (hasStyles(stylesheets)) {
          for (let i = 0; i < stylesheets.length; i++) {
            if (isTrue(stylesheets[i][KEY__SCOPED_CSS])) {
              return true;
            }
          }
        }
        return false;
      }
      function computeHasScopedStyles(template, vm) {
        const {
          stylesheets
        } = template;
        const vmStylesheets = !isUndefined$1(vm) ? vm.stylesheets : null;
        return computeHasScopedStylesInStylesheets(stylesheets) || computeHasScopedStylesInStylesheets(vmStylesheets);
      }
      function hasStyles(stylesheets) {
        return !isUndefined$1(stylesheets) && !isNull(stylesheets) && stylesheets.length > 0;
      }
      let vmBeingConstructed = null;
      function isBeingConstructed(vm) {
        return vmBeingConstructed === vm;
      }
      function invokeComponentCallback(vm, fn, args) {
        const {
          component,
          callHook,
          owner
        } = vm;
        runWithBoundaryProtection(vm, owner, noop, () => {
          callHook(component, fn, args);
        }, noop);
      }
      function invokeComponentConstructor(vm, Ctor) {
        const vmBeingConstructedInception = vmBeingConstructed;
        let error;
        vmBeingConstructed = vm;
        /**
         * Constructors don't need to be wrapped with a boundary because for root elements
         * it should throw, while elements from template are already wrapped by a boundary
         * associated to the diffing algo.
         */
        try {
          // job
          const result = new Ctor();
          // Check indirectly if the constructor result is an instance of LightningElement.
          // When Locker is enabled, the "instanceof" operator would not work since Locker Service
          // provides its own implementation of LightningElement, so we indirectly check
          // if the base constructor is invoked by accessing the component on the vm.
          // When the DISABLE_LOCKER_VALIDATION gate is false or LEGACY_LOCKER_ENABLED is false,
          // then the instanceof LightningElement can be used.
          const useLegacyConstructorCheck = !lwcRuntimeFlags.DISABLE_LEGACY_VALIDATION || lwcRuntimeFlags.LEGACY_LOCKER_ENABLED;
          const isInvalidConstructor = useLegacyConstructorCheck ? vmBeingConstructed.component !== result : !(result instanceof LightningElement);
          if (isInvalidConstructor) {
            throw new TypeError('Invalid component constructor, the class should extend LightningElement.');
          }
        } catch (e) {
          error = Object(e);
        } finally {
          vmBeingConstructed = vmBeingConstructedInception;
          if (!isUndefined$1(error)) {
            addErrorComponentStack(vm, error);
            // re-throwing the original error annotated after restoring the context
            throw error; // eslint-disable-line no-unsafe-finally
          }
        }
      }
      function invokeComponentRenderMethod(vm) {
        const {
          def: {
            render
          },
          callHook,
          component,
          owner
        } = vm;
        const vmBeingRenderedInception = getVMBeingRendered();
        let html;
        let renderInvocationSuccessful = false;
        runWithBoundaryProtection(vm, owner, () => {
          setVMBeingRendered(vm);
        }, () => {
          // job
          vm.tro.observe(() => {
            html = callHook(component, render);
            renderInvocationSuccessful = true;
          });
        }, () => {
          setVMBeingRendered(vmBeingRenderedInception);
        });
        // If render() invocation failed, process errorCallback in boundary and return an empty template
        return renderInvocationSuccessful ? evaluateTemplate(vm, html) : [];
      }
      function invokeEventListener(vm, fn, thisValue, event) {
        const {
          callHook,
          owner
        } = vm;
        runWithBoundaryProtection(vm, owner, noop, () => {
          // job
          if ("production" !== 'production') ;
          callHook(thisValue, fn, [event]);
        }, noop);
      }
  
      /*
       * Copyright (c) 2018, salesforce.com, inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      const registeredComponentMap = new Map();
      /**
       * INTERNAL: This function can only be invoked by compiled code. The compiler
       * will prevent this function from being imported by userland code.
       * @param Ctor
       * @param metadata
       */
      function registerComponent(
      // We typically expect a LightningElementConstructor, but technically you can call this with anything
      Ctor, metadata) {
        if (isFunction$1(Ctor)) {
          // TODO [#3331]: add validation to check the value of metadata.sel is not an empty string.
          registeredComponentMap.set(Ctor, metadata);
        }
        // chaining this method as a way to wrap existing assignment of component constructor easily,
        // without too much transformation
        return Ctor;
      }
      function getComponentRegisteredTemplate(Ctor) {
        return registeredComponentMap.get(Ctor)?.tmpl;
      }
      function getComponentRegisteredName(Ctor) {
        return registeredComponentMap.get(Ctor)?.sel;
      }
      function getComponentAPIVersion(Ctor) {
        const metadata = registeredComponentMap.get(Ctor);
        const apiVersion = metadata?.apiVersion;
        if (isUndefined$1(apiVersion)) {
          // This should only occur in our integration tests; in practice every component
          // is registered, and so this code path should not get hit. But to be safe,
          // return the lowest possible version.
          return LOWEST_API_VERSION;
        }
        return apiVersion;
      }
      function supportsSyntheticElementInternals(Ctor) {
        return registeredComponentMap.get(Ctor)?.enableSyntheticElementInternals || false;
      }
      function isComponentFeatureEnabled(Ctor) {
        const flag = registeredComponentMap.get(Ctor)?.componentFeatureFlag;
        // Default to true if not provided
        return flag?.value !== false;
      }
      function getComponentMetadata(Ctor) {
        return registeredComponentMap.get(Ctor);
      }
      function getTemplateReactiveObserver(vm) {
        const reactiveObserver = createReactiveObserver(() => {
          const {
            isDirty
          } = vm;
          if (isFalse(isDirty)) {
            markComponentAsDirty(vm);
            scheduleRehydration(vm);
          }
        });
        return reactiveObserver;
      }
      function resetTemplateObserverAndUnsubscribe(vm) {
        const {
          tro,
          component
        } = vm;
        tro.reset();
        // Unsubscribe every time the template reactive observer is reset.
        if (lwcRuntimeFlags.ENABLE_EXPERIMENTAL_SIGNALS) {
          unsubscribeFromSignals(component);
        }
      }
      function renderComponent(vm) {
        // The engine should only hold a subscription to a signal if it is rendered in the template.
        // Because of the potential presence of conditional rendering logic, we unsubscribe on each render
        // in the scenario where it is present in one condition but not the other.
        // For example:
        // 1. There is an lwc:if=true conditional where the signal is present on the template.
        // 2. The lwc:if changes to false and the signal is no longer present on the template.
        // If the signal is still subscribed to, the template will re-render when it receives a notification
        // from the signal, even though we won't be using the new value.
        resetTemplateObserverAndUnsubscribe(vm);
        const vnodes = invokeComponentRenderMethod(vm);
        vm.isDirty = false;
        vm.isScheduled = false;
        return vnodes;
      }
      function markComponentAsDirty(vm) {
        vm.isDirty = true;
      }
      const cmpEventListenerMap = new WeakMap();
      function getWrappedComponentsListener(vm, listener) {
        if (!isFunction$1(listener)) {
          throw new TypeError('Expected an EventListener but received ' + typeof listener); // avoiding problems with non-valid listeners
        }
        let wrappedListener = cmpEventListenerMap.get(listener);
        if (isUndefined$1(wrappedListener)) {
          wrappedListener = function (event) {
            invokeEventListener(vm, listener, undefined, event);
          };
          cmpEventListenerMap.set(listener, wrappedListener);
        }
        return wrappedListener;
      }
  
      /******************************************************************************
      Copyright (c) Microsoft Corporation.
  
      Permission to use, copy, modify, and/or distribute this software for any
      purpose with or without fee is hereby granted.
  
      THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
      REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
      AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
      INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
      LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
      OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
      PERFORMANCE OF THIS SOFTWARE.
      ***************************************************************************** */
      /* global Reflect, Promise, SuppressedError, Symbol, Iterator */
  
      function __classPrivateFieldGet(receiver, state, kind, f) {
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
      }
      function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (typeof state === "function" ? receiver !== state || true : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return state.set(receiver, value), value;
      }
      typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
      };
      var _ContextBinding_renderer, _ContextBinding_providedContextVarieties, _ContextBinding_elm;
      class ContextBinding {
        constructor(vm, component, providedContextVarieties) {
          _ContextBinding_renderer.set(this, void 0);
          _ContextBinding_providedContextVarieties.set(this, void 0);
          _ContextBinding_elm.set(this, void 0);
          this.component = component;
          __classPrivateFieldSet(this, _ContextBinding_renderer, vm.renderer);
          __classPrivateFieldSet(this, _ContextBinding_elm, vm.elm);
          __classPrivateFieldSet(this, _ContextBinding_providedContextVarieties, providedContextVarieties);
          // Register the component as a context provider.
          __classPrivateFieldGet(this, _ContextBinding_renderer, "f").registerContextProvider(__classPrivateFieldGet(this, _ContextBinding_elm, "f"), ContextEventName, contextConsumer => {
            // This callback is invoked when the provided context is consumed somewhere down
            // in the component's subtree.
            return contextConsumer.setNewContext(__classPrivateFieldGet(this, _ContextBinding_providedContextVarieties, "f"));
          });
        }
        provideContext(contextVariety, providedContextSignal) {
          if (__classPrivateFieldGet(this, _ContextBinding_providedContextVarieties, "f").has(contextVariety)) {
            logWarnOnce('Multiple contexts of the same variety were provided. Only the first context will be used.');
            return;
          }
          __classPrivateFieldGet(this, _ContextBinding_providedContextVarieties, "f").set(contextVariety, providedContextSignal);
        }
        consumeContext(contextVariety, contextProvidedCallback) {
          __classPrivateFieldGet(this, _ContextBinding_renderer, "f").registerContextConsumer(__classPrivateFieldGet(this, _ContextBinding_elm, "f"), ContextEventName, {
            setNewContext: providerContextVarieties => {
              // If the provider has the specified context variety, then it is consumed
              // and true is returned to stop bubbling.
              if (providerContextVarieties.has(contextVariety)) {
                contextProvidedCallback(providerContextVarieties.get(contextVariety));
                return true;
              }
              // Return false as context has not been found/consumed
              // and the consumer should continue traversing the context tree
              return false;
            }
          });
        }
      }
      _ContextBinding_renderer = new WeakMap(), _ContextBinding_providedContextVarieties = new WeakMap(), _ContextBinding_elm = new WeakMap();
      function connectContext(vm) {
        /**
         * If ENABLE_LEGACY_CONTEXT_CONNECTION is true, enumerates directly on the component
         * which can result in the component lifecycle observing properties that are not typically observed.
         * See PR #5536 for more information.
         */
        if (lwcRuntimeFlags.ENABLE_LEGACY_CONTEXT_CONNECTION) {
          connect(vm, keys(getPrototypeOf$1(vm.component)), vm.component);
        } else {
          // Non-decorated objects
          connect(vm, keys(vm.cmpFields), vm.cmpFields);
          // Decorated objects like @api context
          connect(vm, keys(vm.cmpProps), vm.cmpProps);
        }
      }
      function disconnectContext(vm) {
        /**
         * If ENABLE_LEGACY_CONTEXT_CONNECTION is true, enumerates directly on the component
         * which can result in the component lifecycle observing properties that are not typically observed.
         * See PR #5536 for more information.
         */
        if (lwcRuntimeFlags.ENABLE_LEGACY_CONTEXT_CONNECTION) {
          connect(vm, keys(getPrototypeOf$1(vm.component)), vm.component);
        } else {
          // Non-decorated objects
          disconnect(vm, keys(vm.cmpFields), vm.cmpFields);
          // Decorated objects like @api context
          disconnect(vm, keys(vm.cmpProps), vm.cmpProps);
        }
      }
      function connect(vm, enumerableKeys, contextContainer) {
        const contextKeys = getContextKeys();
        if (isUndefined$1(contextKeys)) {
          return;
        }
        const {
          connectContext
        } = contextKeys;
        const {
          component
        } = vm;
        const contextfulKeys = ArrayFilter.call(enumerableKeys, enumerableKey => isTrustedContext(contextContainer[enumerableKey]));
        if (contextfulKeys.length === 0) {
          return;
        }
        const providedContextVarieties = new Map();
        try {
          for (let i = 0; i < contextfulKeys.length; i++) {
            contextContainer[contextfulKeys[i]][connectContext](new ContextBinding(vm, component, providedContextVarieties));
          }
        } catch (err) {
          logWarnOnce(`Attempted to connect to trusted context but received the following error: ${err.message}`);
        }
      }
      function disconnect(vm, enumerableKeys, contextContainer) {
        {
          return;
        }
      }
  
      /*
       * Copyright (c) 2024, Salesforce, Inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      let idx = 0;
      /** The internal slot used to associate different objects the engine manipulates with the VM */
      const ViewModelReflection = new WeakMap();
      function callHook(cmp, fn, args = []) {
        return fn.apply(cmp, args);
      }
      function setHook(cmp, prop, newValue) {
        cmp[prop] = newValue;
      }
      function getHook(cmp, prop) {
        return cmp[prop];
      }
      function rerenderVM(vm) {
        rehydrate(vm);
      }
      function connectRootElement(elm) {
        const vm = getAssociatedVM(elm);
        // Usually means moving the element from one place to another, which is observable via
        // life-cycle hooks.
        if (vm.state === 1 /* VMState.connected */) {
          disconnectRootElement(elm);
        }
        runConnectedCallback(vm);
        rehydrate(vm);
      }
      function disconnectRootElement(elm) {
        const vm = getAssociatedVM(elm);
        resetComponentStateWhenRemoved(vm);
      }
      function appendVM(vm) {
        rehydrate(vm);
      }
      // just in case the component comes back, with this we guarantee re-rendering it
      // while preventing any attempt to rehydration until after reinsertion.
      function resetComponentStateWhenRemoved(vm) {
        const {
          state
        } = vm;
        if (state !== 2 /* VMState.disconnected */) {
          // Making sure that any observing record will not trigger the rehydrated on this vm
          resetTemplateObserverAndUnsubscribe(vm);
          runDisconnectedCallback(vm);
          // Spec: https://dom.spec.whatwg.org/#concept-node-remove (step 14-15)
          runChildNodesDisconnectedCallback(vm);
          runLightChildNodesDisconnectedCallback(vm);
        }
      }
      // this method is triggered by the diffing algo only when a vnode from the
      // old vnode.children is removed from the DOM.
      function removeVM(vm) {
        resetComponentStateWhenRemoved(vm);
      }
      function getNearestShadowAncestor(owner) {
        let ancestor = owner;
        while (!isNull(ancestor) && ancestor.renderMode === 0 /* RenderMode.Light */) {
          ancestor = ancestor.owner;
        }
        return ancestor;
      }
      function createVM(elm, ctor, renderer, options) {
        const {
          mode,
          owner,
          tagName,
          hydrated
        } = options;
        const def = getComponentInternalDef(ctor);
        const apiVersion = getComponentAPIVersion(ctor);
        const vm = {
          elm,
          def,
          idx: idx++,
          state: 0 /* VMState.created */,
          isScheduled: false,
          isDirty: true,
          tagName,
          mode,
          owner,
          refVNodes: null,
          attachedEventListeners: new WeakMap(),
          children: EmptyArray,
          aChildren: EmptyArray,
          velements: EmptyArray,
          cmpProps: create(null),
          cmpFields: create(null),
          cmpSlots: {
            slotAssignments: create(null)
          },
          cmpTemplate: null,
          hydrated: Boolean(hydrated),
          renderMode: def.renderMode,
          context: {
            stylesheetToken: undefined,
            hasTokenInClass: undefined,
            hasTokenInAttribute: undefined,
            legacyStylesheetToken: undefined,
            hasLegacyTokenInClass: undefined,
            hasLegacyTokenInAttribute: undefined,
            hasScopedStyles: undefined,
            styleVNodes: null,
            tplCache: EmptyObject,
            wiredConnecting: EmptyArray,
            wiredDisconnecting: EmptyArray
          },
          // Properties set right after VM creation.
          tro: null,
          shadowMode: null,
          shadowMigrateMode: false,
          stylesheets: null,
          // Properties set by the LightningElement constructor.
          component: null,
          shadowRoot: null,
          renderRoot: null,
          callHook,
          setHook,
          getHook,
          renderer,
          apiVersion
        };
        vm.stylesheets = computeStylesheets(vm, def.ctor);
        const computedShadowMode = computeShadowMode(def, vm.owner, renderer, hydrated);
        if (lwcRuntimeFlags.ENABLE_FORCE_SHADOW_MIGRATE_MODE) {
          vm.shadowMode = 0 /* ShadowMode.Native */;
          vm.shadowMigrateMode = computedShadowMode === 1 /* ShadowMode.Synthetic */;
        } else {
          vm.shadowMode = computedShadowMode;
        }
        vm.tro = getTemplateReactiveObserver(vm);
        // Create component instance associated to the vm and the element.
        invokeComponentConstructor(vm, def.ctor);
        // Initializing the wire decorator per instance only when really needed
        if (hasWireAdapters(vm)) {
          installWireAdapters(vm);
        }
        return vm;
      }
      function validateComponentStylesheets(vm, stylesheets) {
        let valid = true;
        const validate = arrayOrStylesheet => {
          if (isArray$1(arrayOrStylesheet)) {
            for (let i = 0; i < arrayOrStylesheet.length; i++) {
              validate(arrayOrStylesheet[i]);
            }
          } else if (!isFunction$1(arrayOrStylesheet)) {
            // function assumed to be a stylesheet factory
            valid = false;
          }
        };
        if (!isArray$1(stylesheets)) {
          valid = false;
        } else {
          validate(stylesheets);
        }
        return valid;
      }
      // Validate and flatten any stylesheets defined as `static stylesheets`
      function computeStylesheets(vm, ctor) {
        const {
          stylesheets
        } = ctor;
        if (!isUndefined$1(stylesheets)) {
          const valid = validateComponentStylesheets(vm, stylesheets);
          if (valid) {
            return flattenStylesheets(stylesheets);
          }
        }
        return null;
      }
      // Compute the shadowMode/renderMode without creating a VM. This is used in some scenarios like hydration.
      function computeShadowAndRenderMode(Ctor, renderer) {
        const def = getComponentInternalDef(Ctor);
        const {
          renderMode
        } = def;
        // Assume null `owner` - this is what happens in hydration cases anyway
        // Also assume we are not in hydration mode for this exported API
        const shadowMode = computeShadowMode(def, /* owner */null, renderer, false);
        return {
          renderMode,
          shadowMode
        };
      }
      function computeShadowMode(def, owner, renderer, hydrated) {
        if (
        // Force the shadow mode to always be native. Used for running tests with synthetic shadow patches
        // on, but components running in actual native shadow mode
        // If synthetic shadow is explicitly disabled, use pure-native
        lwcRuntimeFlags.DISABLE_SYNTHETIC_SHADOW ||
        // hydration only supports native shadow
        isTrue(hydrated)) {
          return 0 /* ShadowMode.Native */;
        }
        const {
          isSyntheticShadowDefined
        } = renderer;
        let shadowMode;
        if (isSyntheticShadowDefined || lwcRuntimeFlags.ENABLE_FORCE_SHADOW_MIGRATE_MODE) {
          if (def.renderMode === 0 /* RenderMode.Light */) {
            // ShadowMode.Native implies "not synthetic shadow" which is consistent with how
            // everything defaults to native when the synthetic shadow polyfill is unavailable.
            shadowMode = 0 /* ShadowMode.Native */;
          } else if (def.shadowSupportMode === 'native') {
            shadowMode = 0 /* ShadowMode.Native */;
          } else {
            const shadowAncestor = getNearestShadowAncestor(owner);
            if (!isNull(shadowAncestor) && shadowAncestor.shadowMode === 0 /* ShadowMode.Native */) {
              // Transitive support for native Shadow DOM. A component in native mode
              // transitively opts all of its descendants into native.
              shadowMode = 0 /* ShadowMode.Native */;
            } else {
              // Synthetic if neither this component nor any of its ancestors are configured
              // to be native.
              shadowMode = 1 /* ShadowMode.Synthetic */;
            }
          }
        } else {
          // Native if the synthetic shadow polyfill is unavailable.
          shadowMode = 0 /* ShadowMode.Native */;
        }
        return shadowMode;
      }
      function associateVM(obj, vm) {
        ViewModelReflection.set(obj, vm);
      }
      function getAssociatedVM(obj) {
        const vm = ViewModelReflection.get(obj);
        return vm;
      }
      function getAssociatedVMIfPresent(obj) {
        const maybeVm = ViewModelReflection.get(obj);
        return maybeVm;
      }
      function rehydrate(vm) {
        if (isTrue(vm.isDirty)) {
          const children = renderComponent(vm);
          patchShadowRoot(vm, children);
        }
      }
      function patchShadowRoot(vm, newCh) {
        const {
          renderRoot,
          children: oldCh,
          renderer
        } = vm;
        // reset the refs; they will be set during `patchChildren`
        resetRefVNodes(vm);
        // caching the new children collection
        vm.children = newCh;
        if (newCh.length > 0 || oldCh.length > 0) {
          // patch function mutates vnodes by adding the element reference,
          // however, if patching fails it contains partial changes.
          if (oldCh !== newCh) {
            runWithBoundaryProtection(vm, vm, () => {
            }, () => {
              // job
              patchChildren(oldCh, newCh, renderRoot, renderer);
            }, () => {
            });
          }
        }
        if (vm.state === 1 /* VMState.connected */) {
          // If the element is connected, that means connectedCallback was already issued, and
          // any successive rendering should finish with the call to renderedCallback, otherwise
          // the connectedCallback will take care of calling it in the right order at the end of
          // the current rehydration process.
          runRenderedCallback(vm);
        }
      }
      function runRenderedCallback(vm) {
        const {
          def: {
            renderedCallback
          }
        } = vm;
        if (!isUndefined$1(renderedCallback)) {
          invokeComponentCallback(vm, renderedCallback);
        }
      }
      let rehydrateQueue = [];
      function flushRehydrationQueue() {
        const vms = rehydrateQueue.sort((a, b) => a.idx - b.idx);
        rehydrateQueue = []; // reset to a new queue
        for (let i = 0, len = vms.length; i < len; i += 1) {
          const vm = vms[i];
          try {
            // We want to prevent rehydration from occurring when nodes are detached from the DOM as this can trigger
            // unintended side effects, like lifecycle methods being called multiple times.
            // For backwards compatibility, we use a flag to control the check.
            // 1. When flag is off, always rehydrate (legacy behavior)
            // 2. When flag is on, only rehydrate when the VM state is connected (fixed behavior)
            if (!lwcRuntimeFlags.DISABLE_DETACHED_REHYDRATION || vm.state === 1 /* VMState.connected */) {
              rehydrate(vm);
            }
          } catch (error) {
            if (i + 1 < len) {
              // pieces of the queue are still pending to be rehydrated, those should have priority
              if (rehydrateQueue.length === 0) {
                addCallbackToNextTick(flushRehydrationQueue);
              }
              ArrayUnshift.apply(rehydrateQueue, ArraySlice.call(vms, i + 1));
            }
            // re-throwing the original error will break the current tick, but since the next tick is
            // already scheduled, it should continue patching the rest.
            throw error;
          }
        }
      }
      function runConnectedCallback(vm) {
        const {
          state
        } = vm;
        if (state === 1 /* VMState.connected */) {
          return; // nothing to do since it was already connected
        }
        vm.state = 1 /* VMState.connected */;
        if (hasWireAdapters(vm)) {
          connectWireAdapters(vm);
        }
        if (lwcRuntimeFlags.ENABLE_EXPERIMENTAL_SIGNALS) {
          // Setup context before connected callback is executed
          connectContext(vm);
        }
        const {
          connectedCallback
        } = vm.def;
        if (!isUndefined$1(connectedCallback)) {
          invokeComponentCallback(vm, connectedCallback);
        }
        // This test only makes sense in the browser, with synthetic lifecycle, and when reporting is enabled or
        // we're in dev mode. This is to detect a particular issue with synthetic lifecycle.
        if (lwcRuntimeFlags.DISABLE_NATIVE_CUSTOM_ELEMENT_LIFECYCLE && (isReportingEnabled())) ;
      }
      function hasWireAdapters(vm) {
        return getOwnPropertyNames$1(vm.def.wire).length > 0;
      }
      function runDisconnectedCallback(vm) {
        if (lwcRuntimeFlags.ENABLE_EXPERIMENTAL_SIGNALS) {
          disconnectContext(vm);
        }
        if (isFalse(vm.isDirty)) {
          // this guarantees that if the component is reused/reinserted,
          // it will be re-rendered because we are disconnecting the reactivity
          // linking, so mutations are not automatically reflected on the state
          // of disconnected components.
          vm.isDirty = true;
        }
        vm.state = 2 /* VMState.disconnected */;
        if (hasWireAdapters(vm)) {
          disconnectWireAdapters(vm);
        }
        const {
          disconnectedCallback
        } = vm.def;
        if (!isUndefined$1(disconnectedCallback)) {
          invokeComponentCallback(vm, disconnectedCallback);
        }
      }
      function runChildNodesDisconnectedCallback(vm) {
        const {
          velements: vCustomElementCollection
        } = vm;
        // Reporting disconnection for every child in inverse order since they are
        // inserted in reserved order.
        for (let i = vCustomElementCollection.length - 1; i >= 0; i -= 1) {
          const {
            elm
          } = vCustomElementCollection[i];
          // There are two cases where the element could be undefined:
          // * when there is an error during the construction phase, and an error
          //   boundary picks it, there is a possibility that the VCustomElement
          //   is not properly initialized, and therefore is should be ignored.
          // * when slotted custom element is not used by the element where it is
          //   slotted into it, as  a result, the custom element was never
          //   initialized.
          if (!isUndefined$1(elm)) {
            const childVM = getAssociatedVMIfPresent(elm);
            // The VM associated with the element might be associated undefined
            // in the case where the VM failed in the middle of its creation,
            // eg: constructor throwing before invoking super().
            if (!isUndefined$1(childVM)) {
              resetComponentStateWhenRemoved(childVM);
            }
          }
        }
      }
      function runLightChildNodesDisconnectedCallback(vm) {
        const {
          aChildren: adoptedChildren
        } = vm;
        recursivelyDisconnectChildren(adoptedChildren);
      }
      /**
       * The recursion doesn't need to be a complete traversal of the vnode graph,
       * instead it can be partial, when a custom element vnode is found, we don't
       * need to continue into its children because by attempting to disconnect the
       * custom element itself will trigger the removal of anything slotted or anything
       * defined on its shadow.
       * @param vnodes
       */
      function recursivelyDisconnectChildren(vnodes) {
        for (let i = 0, len = vnodes.length; i < len; i += 1) {
          const vnode = vnodes[i];
          if (!isNull(vnode) && !isUndefined$1(vnode.elm)) {
            switch (vnode.type) {
              case 2 /* VNodeType.Element */:
                recursivelyDisconnectChildren(vnode.children);
                break;
              case 3 /* VNodeType.CustomElement */:
                {
                  const vm = getAssociatedVM(vnode.elm);
                  resetComponentStateWhenRemoved(vm);
                  break;
                }
            }
          }
        }
      }
      // This is a super optimized mechanism to remove the content of the root node (shadow root
      // for shadow DOM components and the root element itself for light DOM) without having to go
      // into snabbdom. Especially useful when the reset is a consequence of an error, in which case the
      // children VNodes might not be representing the current state of the DOM.
      function resetComponentRoot(vm) {
        recursivelyRemoveChildren(vm.children, vm);
        vm.children = EmptyArray;
        runChildNodesDisconnectedCallback(vm);
        vm.velements = EmptyArray;
      }
      // Helper function to remove all children of the root node.
      // If the set of children includes VFragment nodes, we need to remove the children of those nodes too.
      // Since VFragments can contain other VFragments, we need to traverse the entire of tree of VFragments.
      // If the set contains no VFragment nodes, no traversal is needed.
      function recursivelyRemoveChildren(vnodes, vm) {
        const {
          renderRoot,
          renderer: {
            remove
          }
        } = vm;
        for (let i = 0, len = vnodes.length; i < len; i += 1) {
          const vnode = vnodes[i];
          if (!isNull(vnode)) {
            // VFragments are special; their .elm property does not point to the root element since they have no single root.
            if (isVFragment(vnode)) {
              recursivelyRemoveChildren(vnode.children, vm);
            } else if (!isUndefined$1(vnode.elm)) {
              remove(vnode.elm, renderRoot);
            }
          }
        }
      }
      function scheduleRehydration(vm) {
        if (isTrue(vm.isScheduled)) {
          return;
        }
        vm.isScheduled = true;
        if (rehydrateQueue.length === 0) {
          addCallbackToNextTick(flushRehydrationQueue);
        }
        ArrayPush$1.call(rehydrateQueue, vm);
      }
      function getErrorBoundaryVM(vm) {
        let currentVm = vm;
        while (!isNull(currentVm)) {
          if (!isUndefined$1(currentVm.def.errorCallback)) {
            return currentVm;
          }
          currentVm = currentVm.owner;
        }
      }
      function runWithBoundaryProtection(vm, owner, pre, job, post) {
        let error;
        pre();
        try {
          job();
        } catch (e) {
          error = Object(e);
        } finally {
          post();
          if (!isUndefined$1(error)) {
            addErrorComponentStack(vm, error);
            const errorBoundaryVm = isNull(owner) ? undefined : getErrorBoundaryVM(owner);
            // Error boundaries are not in effect when server-side rendering. `errorCallback`
            // is intended to allow recovery from errors - changing the state of a component
            // and instigating a re-render. That is at odds with the single-pass, synchronous
            // nature of SSR. For that reason, all errors bubble up to the `renderComponent`
            // call site.
            if (isUndefined$1(errorBoundaryVm)) {
              throw error; // eslint-disable-line no-unsafe-finally
            }
            resetComponentRoot(vm); // remove offenders
            // error boundaries must have an ErrorCallback
            const errorCallback = errorBoundaryVm.def.errorCallback;
            invokeComponentCallback(errorBoundaryVm, errorCallback, [error, error.wcStack]);
          }
        }
      }
      function runFormAssociatedCustomElementCallback(vm, faceCb, args) {
        const {
          renderMode,
          shadowMode,
          def: {
            ctor
          }
        } = vm;
        if (shadowMode === 1 /* ShadowMode.Synthetic */ && renderMode !== 0 /* RenderMode.Light */ && !supportsSyntheticElementInternals(ctor)) {
          throw new Error('Form associated lifecycle methods are not available in synthetic shadow. Please use native shadow or light DOM.');
        }
        invokeComponentCallback(vm, faceCb, args);
      }
      function runFormAssociatedCallback(elm, form) {
        const vm = getAssociatedVM(elm);
        const {
          formAssociatedCallback
        } = vm.def;
        if (!isUndefined$1(formAssociatedCallback)) {
          runFormAssociatedCustomElementCallback(vm, formAssociatedCallback, [form]);
        }
      }
      function runFormDisabledCallback(elm, disabled) {
        const vm = getAssociatedVM(elm);
        const {
          formDisabledCallback
        } = vm.def;
        if (!isUndefined$1(formDisabledCallback)) {
          runFormAssociatedCustomElementCallback(vm, formDisabledCallback, [disabled]);
        }
      }
      function runFormResetCallback(elm) {
        const vm = getAssociatedVM(elm);
        const {
          formResetCallback
        } = vm.def;
        if (!isUndefined$1(formResetCallback)) {
          runFormAssociatedCustomElementCallback(vm, formResetCallback);
        }
      }
      function runFormStateRestoreCallback(elm, state, reason) {
        const vm = getAssociatedVM(elm);
        const {
          formStateRestoreCallback
        } = vm.def;
        if (!isUndefined$1(formStateRestoreCallback)) {
          runFormAssociatedCustomElementCallback(vm, formStateRestoreCallback, [state, reason]);
        }
      }
      function resetRefVNodes(vm) {
        const {
          cmpTemplate
        } = vm;
        vm.refVNodes = !isNull(cmpTemplate) && cmpTemplate.hasRefs ? create(null) : null;
      }
      // This is a "handoff" from synthetic-shadow to engine-core – we want to clean up after ourselves
      // so nobody else can misuse these global APIs.
      delete globalThis[KEY__NATIVE_GET_ELEMENT_BY_ID];
      delete globalThis[KEY__NATIVE_QUERY_SELECTOR_ALL];
      // Our detection logic relies on some modern browser features. We can just skip reporting the data
      // for unsupported browsers
      function supportsCssEscape() {
        return typeof CSS !== 'undefined' && isFunction$1(CSS.escape);
      }
      // If this page is not using synthetic shadow, then we don't need to install detection. Note
      // that we are assuming synthetic shadow is loaded before LWC.
      function isSyntheticShadowLoaded() {
        // We should probably be calling `renderer.isSyntheticShadowDefined`, but 1) we don't have access to the renderer,
        // and 2) this code needs to run in @lwc/engine-core, so it can access `logWarn()` and `report()`.
        return hasOwnProperty$1.call(Element.prototype, KEY__SHADOW_TOKEN);
      }
      // Detecting cross-root ARIA in synthetic shadow only makes sense for the browser
      if (supportsCssEscape() && isSyntheticShadowLoaded()) ;
      // Deeply freeze the entire array (of arrays) of stylesheet factory functions
      function deepFreeze(stylesheets) {
        traverseStylesheets(stylesheets, subStylesheets => {
          freeze(subStylesheets);
        });
      }
      // Deep-traverse an array (of arrays) of stylesheet factory functions, and call the callback for every array/function
      function traverseStylesheets(stylesheets, callback) {
        callback(stylesheets);
        for (let i = 0; i < stylesheets.length; i++) {
          const stylesheet = stylesheets[i];
          if (isArray$1(stylesheet)) {
            traverseStylesheets(stylesheet, callback);
          } else {
            callback(stylesheet);
          }
        }
      }
      function addLegacyStylesheetTokensShim(tmpl) {
        // When ENABLE_FROZEN_TEMPLATE is false, then we shim stylesheetTokens on top of stylesheetToken for anyone who
        // is accessing the old internal API (backwards compat). Details: W-14210169
        defineProperty(tmpl, 'stylesheetTokens', {
          enumerable: true,
          configurable: true,
          get() {
            const {
              stylesheetToken
            } = this;
            if (isUndefined$1(stylesheetToken)) {
              return stylesheetToken;
            }
            // Shim for the old `stylesheetTokens` property
            // See https://github.com/salesforce/lwc/pull/2332/files#diff-7901555acef29969adaa6583185b3e9bce475cdc6f23e799a54e0018cb18abaa
            return {
              hostAttribute: `${stylesheetToken}-host`,
              shadowAttribute: stylesheetToken
            };
          },
          set(value) {
            // If the value is null or some other exotic object, you would be broken anyway in the past
            // because the engine would try to access hostAttribute/shadowAttribute, which would throw an error.
            // However it may be undefined in newer versions of LWC, so we need to guard against that case.
            this.stylesheetToken = isUndefined$1(value) ? undefined : value.shadowAttribute;
          }
        });
      }
      function freezeTemplate(tmpl) {
        // TODO [#2782]: remove this flag and delete the legacy behavior
        if (lwcRuntimeFlags.ENABLE_FROZEN_TEMPLATE) {
          // Deep freeze the template
          freeze(tmpl);
          if (!isUndefined$1(tmpl.stylesheets)) {
            deepFreeze(tmpl.stylesheets);
          }
        } else {
          // template is not frozen - shim, report, and warn
          // this shim should be applied in both dev and prod
          addLegacyStylesheetTokensShim(tmpl);
        }
      }
  
      /*
       * Copyright (c) 2018, salesforce.com, inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      //
      // Feature detection
      //
      // This check for constructable style sheets is similar to Fast's:
      // https://github.com/microsoft/fast/blob/d49d1ec/packages/web-components/fast-element/src/dom.ts#L51-L53
      // See also: https://github.com/whatwg/webidl/issues/1027#issuecomment-934510070
      const supportsConstructableStylesheets = isFunction$1(CSSStyleSheet.prototype.replaceSync) && isArray$1(document.adoptedStyleSheets);
      const stylesheetCache = new Map();
      function createFreshStyleElement(content) {
        const elm = document.createElement('style');
        elm.type = 'text/css';
        elm.textContent = content;
        // Add an attribute to distinguish global styles added by LWC as opposed to other frameworks/libraries on the page
        elm.setAttribute('data-rendered-by-lwc', '');
        return elm;
      }
      function createStyleElement(content, cacheData) {
        const {
          element,
          usedElement
        } = cacheData;
        // If the <style> was already used, then we should clone it. We cannot insert
        // the same <style> in two places in the DOM.
        if (usedElement) {
          // This `<style>` may be repeated multiple times in the DOM, so cache it. It's a bit
          // faster to call `cloneNode()` on an existing node than to recreate it every time.
          return element.cloneNode(true);
        }
        // We don't clone every time, because that would be a perf tax on the first time
        cacheData.usedElement = true;
        return element;
      }
      function createConstructableStylesheet(content) {
        const stylesheet = new CSSStyleSheet();
        stylesheet.replaceSync(content);
        return stylesheet;
      }
      function insertConstructableStylesheet(content, target, cacheData, signal) {
        const {
          adoptedStyleSheets
        } = target;
        const {
          stylesheet
        } = cacheData;
        // The reason we prefer .push() rather than reassignment is for perf: https://github.com/salesforce/lwc/pull/2683
        adoptedStyleSheets.push(stylesheet);
      }
      function insertStyleElement(content, target, cacheData, signal) {
        const elm = createStyleElement(content, cacheData);
        target.appendChild(elm);
      }
      function getCacheData(content, useConstructableStylesheet) {
        let cacheData = stylesheetCache.get(content);
        if (isUndefined$1(cacheData)) {
          cacheData = {
            stylesheet: undefined,
            element: undefined,
            roots: undefined,
            global: false,
            usedElement: false
          };
          stylesheetCache.set(content, cacheData);
        }
        // Create <style> elements or CSSStyleSheets on-demand, as needed
        if (useConstructableStylesheet && isUndefined$1(cacheData.stylesheet)) {
          cacheData.stylesheet = createConstructableStylesheet(content);
        } else if (!useConstructableStylesheet && isUndefined$1(cacheData.element)) {
          cacheData.element = createFreshStyleElement(content);
        }
        return cacheData;
      }
      function insertGlobalStylesheet(content, signal) {
        // Force a <style> element for global stylesheets. See comment below.
        const cacheData = getCacheData(content, false);
        if (cacheData.global) {
          // already inserted
          return;
        }
        cacheData.global = true; // mark inserted
        // TODO [#2922]: use document.adoptedStyleSheets in supported browsers. Currently we can't, due to backwards compat.
        insertStyleElement(content, document.head, cacheData);
      }
      function insertLocalStylesheet(content, target, signal) {
        const cacheData = getCacheData(content, supportsConstructableStylesheets);
        let {
          roots
        } = cacheData;
        if (isUndefined$1(roots)) {
          roots = cacheData.roots = new WeakSet(); // lazily initialize (not needed for global styles)
        } else if (roots.has(target)) {
          // already inserted
          return;
        }
        roots.add(target); // mark inserted
        // Constructable stylesheets are only supported in certain browsers:
        // https://caniuse.com/mdn-api_document_adoptedstylesheets
        // The reason we use it is for perf: https://github.com/salesforce/lwc/pull/2460
        if (supportsConstructableStylesheets) {
          insertConstructableStylesheet(content, target, cacheData);
        } else {
          // Fall back to <style> element
          insertStyleElement(content, target, cacheData);
        }
      }
      /**
       * Injects a stylesheet into the global (document) level or inside a shadow root.
       * @param content CSS content to insert
       * @param target ShadowRoot to insert into, or undefined if global (document) level
       * @param signal AbortSignal for aborting the stylesheet render. Used in dev mode for HMR to unrender stylesheets.
       */
      function insertStylesheet(content, target, signal) {
        if (isUndefined$1(target)) {
          // global
          insertGlobalStylesheet(content);
        } else {
          // local
          insertLocalStylesheet(content, target);
        }
      }
  
      /*
       * Copyright (c) 2023, Salesforce.com, inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      const cachedConstructors = new Map();
      const nativeLifecycleElementsToUpgradedByLWC = new WeakMap();
      let elementBeingUpgradedByLWC = false;
      let BaseUpgradableConstructor;
      let BaseHTMLElement;
      function createBaseUpgradableConstructor() {
        // Creates a constructor that is intended to be used directly as a custom element, except that the upgradeCallback is
        // passed in to the constructor so LWC can reuse the same custom element constructor for multiple components.
        // Another benefit is that only LWC can create components that actually do anything – if you do
        // `customElements.define('x-foo')`, then you don't have access to the upgradeCallback, so it's a dummy custom element.
        // This class should be created once per tag name.
        // TODO [#2972]: this class should expose observedAttributes as necessary
        BaseUpgradableConstructor = class TheBaseUpgradableConstructor extends HTMLElement {
          constructor(upgradeCallback, useNativeLifecycle) {
            super();
            if (useNativeLifecycle) {
              // When in native lifecycle mode, we need to keep track of instances that were created outside LWC
              // (i.e. not created by `lwc.createElement()`). If the element uses synthetic lifecycle, then we don't
              // need to track this.
              nativeLifecycleElementsToUpgradedByLWC.set(this, elementBeingUpgradedByLWC);
            }
            // If the element is not created using lwc.createElement(), e.g. `document.createElement('x-foo')`,
            // then elementBeingUpgradedByLWC will be false
            if (elementBeingUpgradedByLWC) {
              upgradeCallback(this);
            }
            // TODO [#2970]: LWC elements cannot be upgraded via new Ctor()
            // Do we want to support this? Throw an error? Currently for backwards compat it's a no-op.
          }
          connectedCallback() {
            // native `connectedCallback`/`disconnectedCallback` are only enabled in native lifecycle mode
            if (isTrue(nativeLifecycleElementsToUpgradedByLWC.get(this))) {
              connectRootElement(this);
            }
          }
          disconnectedCallback() {
            // native `connectedCallback`/`disconnectedCallback` are only enabled in native lifecycle mode
            if (isTrue(nativeLifecycleElementsToUpgradedByLWC.get(this))) {
              disconnectRootElement(this);
            }
          }
          formAssociatedCallback(form) {
            runFormAssociatedCallback(this, form);
          }
          formDisabledCallback(disabled) {
            runFormDisabledCallback(this, disabled);
          }
          formResetCallback() {
            runFormResetCallback(this);
          }
          formStateRestoreCallback(state, reason) {
            runFormStateRestoreCallback(this, state, reason);
          }
          /*LWC compiler v8.28.2*/
        };
        BaseHTMLElement = HTMLElement; // cache to track if it changes
      }
      const createUpgradableConstructor = isFormAssociated => {
        if (HTMLElement !== BaseHTMLElement) {
          // If the global HTMLElement changes out from under our feet, then we need to create a new
          // BaseUpgradableConstructor from scratch (since it extends from HTMLElement). This can occur if
          // polyfills are in play, e.g. a polyfill for scoped custom element registries.
          // This workaround can potentially be removed when W-15361244 is resolved.
          createBaseUpgradableConstructor();
        }
        // Using a BaseUpgradableConstructor superclass here is a perf optimization to avoid
        // re-defining the same logic (connectedCallback, disconnectedCallback, etc.) over and over.
        class UpgradableConstructor extends BaseUpgradableConstructor {
          /*LWC compiler v8.28.2*/
        }
        if (isFormAssociated) {
          // Perf optimization - the vast majority of components have formAssociated=false,
          // so we can skip the setter in those cases, since undefined works the same as false.
          UpgradableConstructor.formAssociated = isFormAssociated;
        }
        return UpgradableConstructor;
      };
      function getUpgradableConstructor(tagName, isFormAssociated) {
        let UpgradableConstructor = cachedConstructors.get(tagName);
        if (isUndefined$1(UpgradableConstructor)) {
          if (!isUndefined$1(customElements.get(tagName))) {
            throw new Error(`Unexpected tag name "${tagName}". This name is a registered custom element, preventing LWC to upgrade the element.`);
          }
          UpgradableConstructor = createUpgradableConstructor(isFormAssociated);
          customElements.define(tagName, UpgradableConstructor);
          cachedConstructors.set(tagName, UpgradableConstructor);
        }
        return UpgradableConstructor;
      }
      const createCustomElement = (tagName, upgradeCallback, useNativeLifecycle, isFormAssociated) => {
        const UpgradableConstructor = getUpgradableConstructor(tagName, isFormAssociated);
        if (Boolean(UpgradableConstructor.formAssociated) !== isFormAssociated) {
          throw new Error(`<${tagName}> was already registered with formAssociated=${UpgradableConstructor.formAssociated}. It cannot be re-registered with formAssociated=${isFormAssociated}. Please rename your component to have a different name than <${tagName}>`);
        }
        elementBeingUpgradedByLWC = true;
        try {
          return new UpgradableConstructor(upgradeCallback, useNativeLifecycle);
        } finally {
          elementBeingUpgradedByLWC = false;
        }
      };
  
      /*
       * Copyright (c) 2024, Salesforce, Inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      /**
       * A factory function that produces a renderer.
       * Renderer encapsulates operations that are required to render an LWC component into the underlying
       * runtime environment. In the case of @lwc/enigne-dom, it is meant to be used in a DOM environment.
       * @param baseRenderer Either null or the base renderer imported from 'lwc'.
       * @returns The created renderer
       * @example
       * import { renderer, rendererFactory } from 'lwc';
       * const customRenderer = rendererFactory(renderer);
       */
      function rendererFactory(baseRenderer) {
        // Type assertion because this is replaced by rollup with an object, not a string.
        // See `injectInlineRenderer` in /scripts/rollup/rollup.config.js
        const renderer = function (exports$1) {
          /**
           * Copyright (c) 2026 Salesforce, Inc.
           */
          /*
           * Copyright (c) 2018, salesforce.com, inc.
           * All rights reserved.
           * SPDX-License-Identifier: MIT
           * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
           */
          /**
           *
           * @param value
           * @param msg
           */
          function invariant(value, msg) {
            if (!value) {
              throw new Error(`Invariant Violation: ${msg}`);
            }
          }
          /**
           *
           * @param value
           * @param msg
           */
          function isTrue$1(value, msg) {
            if (!value) {
              throw new Error(`Assert Violation: ${msg}`);
            }
          }
          /**
           *
           * @param value
           * @param msg
           */
          function isFalse$1(value, msg) {
            if (value) {
              throw new Error(`Assert Violation: ${msg}`);
            }
          }
          /**
           *
           * @param msg
           */
          function fail(msg) {
            throw new Error(msg);
          }
          var assert = /*#__PURE__*/Object.freeze({
            __proto__: null,
            fail: fail,
            invariant: invariant,
            isFalse: isFalse$1,
            isTrue: isTrue$1
          });
  
          /*
           * Copyright (c) 2024, Salesforce, Inc.
           * All rights reserved.
           * SPDX-License-Identifier: MIT
           * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
           */
          const {
            /** Detached {@linkcode Object.getOwnPropertyDescriptors}; see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors MDN Reference}. */
            getOwnPropertyDescriptors
          } = Object;
          /**
           * Determines whether the argument is `undefined`.
           * @param obj Value to test
           * @returns `true` if the value is `undefined`.
           */
          function isUndefined(obj) {
            return obj === undefined;
          }
          /**
           * Determines whether the argument is `null`.
           * @param obj Value to test
           * @returns `true` if the value is `null`.
           */
          function isNull(obj) {
            return obj === null;
          }
          /** version: 8.28.2 */
  
          /*
           * Copyright (c) 2024, Salesforce, Inc.
           * All rights reserved.
           * SPDX-License-Identifier: MIT
           * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
           */
          // Like @lwc/shared, but for DOM APIs
          const ElementDescriptors = getOwnPropertyDescriptors(Element.prototype);
          const ElementAttachShadow = ElementDescriptors.attachShadow.value;
          const ElementShadowRootGetter = ElementDescriptors.shadowRoot.get;
  
          /*
           * Copyright (c) 2023, salesforce.com, inc.
           * All rights reserved.
           * SPDX-License-Identifier: MIT
           * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
           */
          class WireContextSubscriptionEvent extends CustomEvent {
            constructor(adapterToken, {
              setNewContext,
              setDisconnectedCallback
            }) {
              super(adapterToken, {
                bubbles: true,
                composed: true
              });
              this.setNewContext = setNewContext;
              this.setDisconnectedCallback = setDisconnectedCallback;
            }
            /*LWC compiler v8.28.2*/
          }
          function registerContextConsumer(elm, adapterContextToken, subscriptionPayload) {
            dispatchEvent(elm, new WireContextSubscriptionEvent(adapterContextToken, subscriptionPayload));
          }
          function registerContextProvider(elm, adapterContextToken, onContextSubscription) {
            addEventListener(elm, adapterContextToken, evt => {
              const {
                setNewContext,
                setDisconnectedCallback
              } = evt;
              // If context subscription is successful, stop event propagation
              if (onContextSubscription({
                setNewContext,
                setDisconnectedCallback
              })) {
                evt.stopImmediatePropagation();
              }
            });
          }
  
          /*
           * Copyright (c) 2018, salesforce.com, inc.
           * All rights reserved.
           * SPDX-License-Identifier: MIT
           * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
           */
          function cloneNode(node, deep) {
            return node.cloneNode(deep);
          }
          function createElement(tagName, namespace) {
            return isUndefined(namespace) ? document.createElement(tagName) : document.createElementNS(namespace, tagName);
          }
          function createText(content) {
            return document.createTextNode(content);
          }
          function createComment(content) {
            return document.createComment(content);
          }
          // Parse the fragment HTML string into DOM
          function createFragment(html) {
            const template = document.createElement('template');
            template.innerHTML = html;
            return template.content.firstChild;
          }
          function insert(node, parent, anchor) {
            parent.insertBefore(node, anchor);
          }
          function remove(node, parent) {
            parent.removeChild(node);
          }
          function nextSibling(node) {
            return node.nextSibling;
          }
          function previousSibling(node) {
            return node.previousSibling;
          }
          function getParentNode(node) {
            return node.parentNode;
          }
          function attachShadow(element, options) {
            // `shadowRoot` will be non-null in two cases:
            //   1. upon initial load with an SSR-generated DOM, while in Shadow render mode
            //   2. when a webapp author places <c-app> in their static HTML and mounts their
            //      root component with customElement.define('c-app', Ctor)
            // see W-17441501
            const shadowRoot = ElementShadowRootGetter.call(element);
            if (!isNull(shadowRoot)) {
              return shadowRoot;
            }
            return ElementAttachShadow.call(element, options);
          }
          function setText(node, content) {
            node.nodeValue = content;
          }
          function getProperty(node, key) {
            return node[key];
          }
          function setProperty(node, key, value) {
            node[key] = value;
          }
          function getAttribute(element, name, namespace) {
            return isUndefined(namespace) ? element.getAttribute(name) : element.getAttributeNS(namespace, name);
          }
          function setAttribute(element, name, value, namespace) {
            return isUndefined(namespace) ? element.setAttribute(name, value) : element.setAttributeNS(namespace, name, value);
          }
          function removeAttribute(element, name, namespace) {
            if (isUndefined(namespace)) {
              element.removeAttribute(name);
            } else {
              element.removeAttributeNS(namespace, name);
            }
          }
          function addEventListener(target, type, callback, options) {
            target.addEventListener(type, callback, options);
          }
          function removeEventListener(target, type, callback, options) {
            target.removeEventListener(type, callback, options);
          }
          function dispatchEvent(target, event) {
            return target.dispatchEvent(event);
          }
          function getClassList(element) {
            return element.classList;
          }
          function setCSSStyleProperty(element, name, value, important) {
            // TODO [#0]: How to avoid this type casting? Shall we use a different type interface to
            // represent elements in the engine?
            element.style.setProperty(name, value, important ? 'important' : '');
          }
          function getBoundingClientRect(element) {
            return element.getBoundingClientRect();
          }
          function querySelector(element, selectors) {
            return element.querySelector(selectors);
          }
          function querySelectorAll(element, selectors) {
            return element.querySelectorAll(selectors);
          }
          function getElementsByTagName(element, tagNameOrWildCard) {
            return element.getElementsByTagName(tagNameOrWildCard);
          }
          function getElementsByClassName(element, names) {
            return element.getElementsByClassName(names);
          }
          function getChildren(element) {
            return element.children;
          }
          function getChildNodes(element) {
            return element.childNodes;
          }
          function getFirstChild(element) {
            return element.firstChild;
          }
          function getFirstElementChild(element) {
            return element.firstElementChild;
          }
          function getLastChild(element) {
            return element.lastChild;
          }
          function getLastElementChild(element) {
            return element.lastElementChild;
          }
          function isConnected(node) {
            return node.isConnected;
          }
          function assertInstanceOfHTMLElement(elm, msg) {
            assert.invariant(elm instanceof HTMLElement, msg);
          }
          function ownerDocument(element) {
            return element.ownerDocument;
          }
          function getTagName(elm) {
            return elm.tagName;
          }
          function getStyle(elm) {
            return elm.style;
          }
          function attachInternals(elm) {
            return attachInternalsFunc.call(elm);
          }
          // Use the attachInternals method from HTMLElement.prototype because access to it is removed
          // in HTMLBridgeElement, ie: elm.attachInternals is undefined.
          // Additionally, cache the attachInternals method to protect against 3rd party monkey-patching.
          const attachInternalsFunc = typeof ElementInternals !== 'undefined' ? HTMLElement.prototype.attachInternals : () => {
            throw new Error('attachInternals API is not supported in this browser environment.');
          };
          exports$1.addEventListener = addEventListener;
          exports$1.assertInstanceOfHTMLElement = assertInstanceOfHTMLElement;
          exports$1.attachInternals = attachInternals;
          exports$1.attachShadow = attachShadow;
          exports$1.cloneNode = cloneNode;
          exports$1.createComment = createComment;
          exports$1.createElement = createElement;
          exports$1.createFragment = createFragment;
          exports$1.createText = createText;
          exports$1.dispatchEvent = dispatchEvent;
          exports$1.getAttribute = getAttribute;
          exports$1.getBoundingClientRect = getBoundingClientRect;
          exports$1.getChildNodes = getChildNodes;
          exports$1.getChildren = getChildren;
          exports$1.getClassList = getClassList;
          exports$1.getElementsByClassName = getElementsByClassName;
          exports$1.getElementsByTagName = getElementsByTagName;
          exports$1.getFirstChild = getFirstChild;
          exports$1.getFirstElementChild = getFirstElementChild;
          exports$1.getLastChild = getLastChild;
          exports$1.getLastElementChild = getLastElementChild;
          exports$1.getParentNode = getParentNode;
          exports$1.getProperty = getProperty;
          exports$1.getStyle = getStyle;
          exports$1.getTagName = getTagName;
          exports$1.insert = insert;
          exports$1.isConnected = isConnected;
          exports$1.nextSibling = nextSibling;
          exports$1.ownerDocument = ownerDocument;
          exports$1.previousSibling = previousSibling;
          exports$1.querySelector = querySelector;
          exports$1.querySelectorAll = querySelectorAll;
          exports$1.registerContextConsumer = registerContextConsumer;
          exports$1.registerContextProvider = registerContextProvider;
          exports$1.remove = remove;
          exports$1.removeAttribute = removeAttribute;
          exports$1.removeEventListener = removeEventListener;
          exports$1.setAttribute = setAttribute;
          exports$1.setCSSStyleProperty = setCSSStyleProperty;
          exports$1.setProperty = setProperty;
          exports$1.setText = setText;
          return exports$1;
        }({});
        // Meant to inherit any properties passed via the base renderer as the argument to the factory.
        Object.setPrototypeOf(renderer, baseRenderer);
        return renderer;
      }
  
      /*
       * Copyright (c) 2023, Salesforce.com, inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      // Host element mutation tracking is for SSR only
      const startTrackingMutations = noop;
      const stopTrackingMutations = noop;
      /**
       * The base renderer that will be used by engine-core.
       * This will be used for DOM operations when lwc is running in a browser environment.
       */
      const renderer = assign(
      // The base renderer will invoke the factory with null and assign additional properties that are
      // shared across renderers
      rendererFactory(null),
      // Properties that are either not required to be sandboxed or rely on a globally shared information
      {
        // insertStyleSheet implementation shares a global cache of stylesheet data
        insertStylesheet,
        // relies on a shared global cache
        createCustomElement,
        defineCustomElement: getUpgradableConstructor,
        isSyntheticShadowDefined: hasOwnProperty$1.call(Element.prototype, KEY__SHADOW_TOKEN),
        startTrackingMutations,
        stopTrackingMutations
      });
      function clearNode(node) {
        const childNodes = renderer.getChildNodes(node);
        for (let i = childNodes.length - 1; i >= 0; i--) {
          renderer.remove(childNodes[i], node);
        }
      }
      /**
       * The real `buildCustomElementConstructor`. Should not be accessible to external users!
       * @internal
       * @param Ctor LWC constructor to build
       * @returns A Web Component class
       * @see {@linkcode deprecatedBuildCustomElementConstructor}
       */
      function buildCustomElementConstructor(Ctor) {
        var _a;
        const HtmlPrototype = getComponentHtmlPrototype(Ctor);
        const {
          observedAttributes
        } = HtmlPrototype;
        const {
          attributeChangedCallback
        } = HtmlPrototype.prototype;
        return _a = class extends HTMLElement {
          constructor() {
            super();
            if (!isNull(this.shadowRoot)) {
              clearNode(this.shadowRoot);
            }
            // Compute renderMode/shadowMode in advance. This must be done before `createVM` because `createVM` may
            // mutate the element.
            const {
              shadowMode,
              renderMode
            } = computeShadowAndRenderMode(Ctor, renderer);
            // Native shadow components are allowed to have pre-existing `childNodes` before upgrade. This supports
            // use cases where a custom element has declaratively-defined slotted content, e.g.:
            // https://github.com/salesforce/lwc/issues/3639
            const isNativeShadow = renderMode === 1 /* RenderMode.Shadow */ && shadowMode === 0 /* ShadowMode.Native */;
            if (!isNativeShadow && this.childNodes.length > 0) {
              clearNode(this);
            }
            createVM(this, Ctor, renderer, {
              mode: 'open',
              owner: null,
              tagName: this.tagName
            });
          }
          connectedCallback() {
            connectRootElement(this);
          }
          disconnectedCallback() {
            disconnectRootElement(this);
          }
          attributeChangedCallback(name, oldValue, newValue) {
            if (this instanceof BaseBridgeElement) {
              // W-17420330
              attributeChangedCallback.call(this, name, oldValue, newValue);
            }
          }
          formAssociatedCallback(form) {
            runFormAssociatedCallback(this, form);
          }
          formDisabledCallback(disabled) {
            runFormDisabledCallback(this, disabled);
          }
          formResetCallback() {
            runFormResetCallback(this);
          }
          formStateRestoreCallback(state, reason) {
            runFormStateRestoreCallback(this, state, reason);
          }
          /*LWC compiler v8.28.2*/
        }, _a.observedAttributes = observedAttributes,
        // Note CustomElementConstructor is not upgraded by LWC and inherits directly from HTMLElement which means it calls the native
        // attachInternals API.
        _a.formAssociated = Boolean(Ctor.formAssociated), _a;
      }
  
      /*
       * Copyright (c) 2018, salesforce.com, inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      // TODO [#2472]: Remove this workaround when appropriate.
      // eslint-disable-next-line @lwc/lwc-internal/no-global-node
      const _Node$1 = Node;
      const ConnectingSlot = new WeakMap();
      const DisconnectingSlot = new WeakMap();
      function callNodeSlot(node, slot) {
        const fn = slot.get(node);
        if (!isUndefined$1(fn)) {
          fn(node);
        }
        return node; // for convenience
      }
      let monkeyPatched = false;
      function monkeyPatchDomAPIs() {
        if (monkeyPatched) {
          // don't double-patch
          return;
        }
        monkeyPatched = true;
        // Monkey patching Node methods to be able to detect the insertions and removal of root elements
        // created via createElement.
        const {
          appendChild,
          insertBefore,
          removeChild,
          replaceChild
        } = _Node$1.prototype;
        assign(_Node$1.prototype, {
          appendChild(newChild) {
            const appendedNode = appendChild.call(this, newChild);
            return callNodeSlot(appendedNode, ConnectingSlot);
          },
          insertBefore(newChild, referenceNode) {
            const insertedNode = insertBefore.call(this, newChild, referenceNode);
            return callNodeSlot(insertedNode, ConnectingSlot);
          },
          removeChild(oldChild) {
            const removedNode = removeChild.call(this, oldChild);
            return callNodeSlot(removedNode, DisconnectingSlot);
          },
          replaceChild(newChild, oldChild) {
            const replacedNode = replaceChild.call(this, newChild, oldChild);
            callNodeSlot(replacedNode, DisconnectingSlot);
            callNodeSlot(newChild, ConnectingSlot);
            return replacedNode;
          }
        });
      }
      /**
       * EXPERIMENTAL: This function is almost identical to document.createElement with the slightly
       * difference that in the options, you can pass the `is` property set to a Constructor instead of
       * just a string value. The intent is to allow the creation of an element controlled by LWC without
       * having to register the element as a custom element.
       *
       * NOTE: The returned type incorrectly includes _all_ properties defined on the component class,
       * even though the runtime object only uses those decorated with `@api`. This is due to a
       * limitation of TypeScript. To avoid inferring incorrect properties, provide an explicit generic
       * parameter, e.g. `createElement<typeof LightningElement>('x-foo', { is: FooCtor })`.
       * @param sel The tagname of the element to create
       * @param options Control the behavior of the created element
       * @param options.is The LWC component that the element should be
       * @param options.mode What kind of shadow root to use
       * @returns The created HTML element
       * @throws Throws when called with invalid parameters.
       * @example
       * const el = createElement('x-foo', { is: FooCtor });
       */
      function createElement(sel, options) {
        if (!isObject(options) || isNull(options)) {
          throw new TypeError(`"createElement" function expects an object as second parameter but received "${toString(options)}".`);
        }
        const Ctor = options.is;
        if (!isFunction$1(Ctor)) {
          throw new TypeError(`"createElement" function expects an "is" option with a valid component constructor.`);
        }
        const {
          createCustomElement
        } = renderer;
        // tagName must be all lowercase, unfortunately, we have legacy code that is
        // passing `sel` as a camel-case, which makes them invalid custom elements name
        // the following line guarantees that this does not leaks beyond this point.
        const tagName = StringToLowerCase.call(sel);
        const useNativeCustomElementLifecycle = !lwcRuntimeFlags.DISABLE_NATIVE_CUSTOM_ELEMENT_LIFECYCLE;
        const isFormAssociated = shouldBeFormAssociated(Ctor);
        // the custom element from the registry is expecting an upgrade callback
        /*
         * Note: if the upgradable constructor does not expect, or throw when we new it
         * with a callback as the first argument, we could implement a more advanced
         * mechanism that only passes that argument if the constructor is known to be
         * an upgradable custom element.
         */
        const upgradeCallback = elm => {
          createVM(elm, Ctor, renderer, {
            tagName,
            mode: options.mode !== 'closed' ? 'open' : 'closed',
            owner: null
          });
          if (!useNativeCustomElementLifecycle) {
            // Monkey-patch on-demand, because `lwcRuntimeFlags.DISABLE_NATIVE_CUSTOM_ELEMENT_LIFECYCLE` may be set to
            // `true` lazily, after `@lwc/engine-dom` has finished initializing but before a component has rendered.
            monkeyPatchDomAPIs();
            ConnectingSlot.set(elm, connectRootElement);
            DisconnectingSlot.set(elm, disconnectRootElement);
          }
        };
        return createCustomElement(tagName, upgradeCallback, useNativeCustomElementLifecycle, isFormAssociated);
      }
  
      /*
       * Copyright (c) 2018, salesforce.com, inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      const ComponentConstructorToCustomElementConstructorMap = new Map();
      function getCustomElementConstructor(Ctor) {
        if (Ctor === LightningElement) {
          throw new TypeError(`Invalid Constructor. LightningElement base class can't be claimed as a custom element.`);
        }
        let ce = ComponentConstructorToCustomElementConstructorMap.get(Ctor);
        if (isUndefined$1(ce)) {
          ce = buildCustomElementConstructor(Ctor);
          ComponentConstructorToCustomElementConstructorMap.set(Ctor, ce);
        }
        return ce;
      }
      /**
       * This static getter builds a Web Component class from a LWC constructor so it can be registered
       * as a new element via customElements.define() at any given time.
       * @example
       * import Foo from 'ns/foo';
       * customElements.define('x-foo', Foo.CustomElementConstructor);
       * const elm = document.createElement('x-foo');
       */
      defineProperty(LightningElement, 'CustomElementConstructor', {
        get() {
          return getCustomElementConstructor(this);
        }
      });
      freeze(LightningElement);
      seal(LightningElement.prototype);
  
      /*
       * Copyright (c) 2024, Salesforce, Inc.
       * All rights reserved.
       * SPDX-License-Identifier: MIT
       * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
       */
      // Like @lwc/shared, but for DOM APIs
      const ElementDescriptors = getOwnPropertyDescriptors(Element.prototype);
      ElementDescriptors.attachShadow.value;
      ElementDescriptors.shadowRoot.get;
      /** version: 8.28.2 */
  
      function stylesheet$b(token, useActualHostSelector, useNativeDirPseudoclass) {
        var shadowSelector = token ? ("[" + token + "]") : "";
        return ".app" + shadowSelector + " {font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;position: fixed;top: 0;left: 0;right: 0;bottom: 0;z-index: 999999;pointer-events: none;display: flex;flex-direction: column;align-items: center;justify-content: center;}.app" + shadowSelector + " > *" + shadowSelector + " {pointer-events: auto;}.conversation-wrapper" + shadowSelector + " {width: 75%;max-width: 1200px;min-width: 600px;display: flex;flex-direction: column;}.conversation-wrapper-hidden" + shadowSelector + " {display: none;}.conversation-container" + shadowSelector + " {display: flex;flex-direction: row;gap: 16px;padding: 16px;background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);border-radius: 0;box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);height: 75vh;max-height: 75vh;overflow: hidden;}@media (max-width: 768px) {.conversation-container" + shadowSelector + " {flex-direction: column;max-height: 80vh;}.conversation-wrapper" + shadowSelector + " {width: 95%;min-width: auto;}}";
        /*LWC compiler v8.28.2*/
      }
      var _implicitStylesheets$b = [stylesheet$b];
  
      function stylesheet$a(token, useActualHostSelector, useNativeDirPseudoclass) {
        var shadowSelector = token ? ("[" + token + "]") : "";
        var hostSelector = token ? ("[" + token + "-host]") : "";
        return ((useActualHostSelector ? ":host {" : hostSelector + " {")) + "position: absolute;bottom: 10%;left: 50%;transform: translateX(-50%);width: 75%;max-width: 1200px;min-width: 600px;}.search-container" + shadowSelector + " {display: flex;align-items: center;gap: 12px;padding: 12px 16px;background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);border-radius: 24px;margin: 0;box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);}.search-form" + shadowSelector + " {flex: 1;}.search-bar" + shadowSelector + " {display: flex;align-items: center;gap: 12px;background: rgba(255, 255, 255, 0.1);border-radius: 20px;padding: 8px 16px;}.search-icon" + shadowSelector + " {width: 32px;height: 32px;flex-shrink: 0;}.search-icon" + shadowSelector + " img" + shadowSelector + " {width: 100%;height: 100%;border-radius: 50%;}.search-input" + shadowSelector + " {flex: 1;border: none;background: transparent;color: white;font-size: 14px;outline: none;min-width: 200px;}.search-input" + shadowSelector + "::placeholder {color: rgba(255, 255, 255, 0.6);}.search-actions" + shadowSelector + " {display: flex;gap: 8px;flex-wrap: wrap;}.search-action-button" + shadowSelector + " {background: rgba(255, 255, 255, 0.15);border: 1px solid rgba(255, 255, 255, 0.2);border-radius: 16px;color: white;padding: 6px 12px;font-size: 12px;cursor: pointer;transition: all 0.2s ease;white-space: nowrap;}.search-action-button:hover" + shadowSelector + " {background: rgba(255, 255, 255, 0.25);border-color: rgba(255, 255, 255, 0.4);}.expand-button" + shadowSelector + " {cursor: pointer;opacity: 0.7;transition: opacity 0.2s ease;}.expand-button:hover" + shadowSelector + " {opacity: 1;}@media (max-width: 768px) {" + ((useActualHostSelector ? ":host {" : hostSelector + " {")) + "width: 95%;min-width: auto;}.search-actions" + shadowSelector + " {display: none;}}";
        /*LWC compiler v8.28.2*/
      }
      var _implicitStylesheets$a = [stylesheet$a];
  
      const $fragment1$8 = parseFragment`<div class="search-icon${0}"${2}><img${"a1:src"} alt="Search"${3}></div>`;
      const $fragment2$3 = parseFragment`<button type="submit" name="buttonText" class="search-action-button${0}"${"a0:value"}${2}>${"t1"}</button>`;
      const $fragment3$3 = parseFragment`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" class="expand-button${0}"${2}><path d="M5 11L9 7L13 11" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${3}/></svg>`;
      const stc0$8 = {
        classMap: {
          "search-container": true
        },
        key: 1
      };
      const stc1$7 = {
        "search-form": true
      };
      const stc2$4 = {
        classMap: {
          "search-bar": true
        },
        key: 3
      };
      const stc3$3 = {
        "search-input": true
      };
      const stc4$1 = {
        "type": "text",
        "name": "searchText",
        "placeholder": "Welcome! How can I help you today?"
      };
      const stc5 = {
        classMap: {
          "search-actions": true
        },
        key: 7
      };
      function tmpl$b($api, $cmp, $slotset, $ctx) {
        const {b: api_bind, sp: api_static_part, st: api_static_fragment, h: api_element, k: api_key, d: api_dynamic_text, i: api_iterator, fr: api_fragment} = $api;
        const {_m0, _m1, _m2, _m3} = $ctx;
        return [$cmp.show ? api_fragment(0, [api_element("div", stc0$8, [api_element("form", {
          classMap: stc1$7,
          key: 2,
          on: _m0 || ($ctx._m0 = {
            "submit": api_bind($cmp.handleSearch)
          })
        }, [api_element("div", stc2$4, [api_static_fragment($fragment1$8, 5, [api_static_part(1, {
          attrs: {
            "src": $cmp.AGENT_LOGO_IMAGE_URL
          }
        }, null)]), api_element("input", {
          classMap: stc3$3,
          attrs: stc4$1,
          props: {
            "value": $cmp.searchText
          },
          key: 6,
          on: _m1 || ($ctx._m1 = {
            "input": api_bind($cmp.handleInputChange)
          })
        }), api_element("div", stc5, api_iterator($cmp.searchActions, function (action, index) {
          return api_static_fragment($fragment2$3, api_key(9, action.value), [api_static_part(0, {
            attrs: {
              "value": action.value
            }
          }, null), api_static_part(1, null, api_dynamic_text(action.text))]);
        }))])]), api_static_fragment($fragment3$3, 11, [api_static_part(0, {
          on: _m3 || ($ctx._m3 = {
            "click": api_bind($cmp.handleExpand)
          })
        }, null)])])], 0) : null];
        /*LWC compiler v8.28.2*/
      }
      var _tmpl$b = registerTemplate(tmpl$b);
      tmpl$b.stylesheets = [];
      tmpl$b.stylesheetToken = "lwc-48dq4n8pof9";
      tmpl$b.legacyStylesheetToken = "c-searchBar_searchBar";
      if (_implicitStylesheets$a) {
        tmpl$b.stylesheets.push.apply(tmpl$b.stylesheets, _implicitStylesheets$a);
      }
      freezeTemplate(tmpl$b);
  
      class SearchBar extends LightningElement {
        constructor(...args) {
          super(...args);
          this.show = false;
          this.searchText = '';
          this.hasSentInitialMessage = false;
          this.AGENT_LOGO_IMAGE_URL = 'https://zzpq-010.dx.commercecloud.salesforce.com/on/demandware.static/Sites-nto-Site/-/default/dw9814f411/images/favicons/favicon-32x32.png';
          this.searchActions = [{
            text: 'Shop Hiking Boots',
            value: 'Shop Hiking Boots'
          }, {
            text: 'Find Jackets',
            value: 'Find Jackets'
          }, {
            text: 'Browse Backpacks',
            value: 'Browse Backpacks'
          }];
        }
        handleInputChange(event) {
          this.searchText = event.target.value;
        }
        handleSearch(event) {
          event.preventDefault();
  
          // Get the text from either the input or the button
          const formData = new FormData(event.target);
          const textToSend = formData.get('searchText') || formData.get('buttonText');
          if (!textToSend) return;
          if (!this.hasSentInitialMessage) {
            // Dispatch custom event to parent
            this.dispatchEvent(new CustomEvent('initialmessage', {
              detail: {
                text: textToSend
              },
              bubbles: true,
              composed: true
            }));
            this.hasSentInitialMessage = true;
          } else {
            window.AdaptiveWebsite.sendTextMessage(textToSend);
          }
          window.AdaptiveWebsite.maximize();
        }
        handleExpand() {
          // Dispatch custom event for pure UI toggle (doesn't affect conversation state)
          this.dispatchEvent(new CustomEvent('togglemaximize', {
            bubbles: true,
            composed: true
          }));
        }
        /*LWC compiler v8.28.2*/
      }
      registerDecorators(SearchBar, {
        publicProps: {
          show: {
            config: 0
          }
        },
        track: {
          searchText: 1,
          hasSentInitialMessage: 1
        },
        fields: ["AGENT_LOGO_IMAGE_URL", "searchActions"]
      });
      const __lwc_component_class_internal$b = registerComponent(SearchBar, {
        tmpl: _tmpl$b,
        sel: "c-search-bar",
        apiVersion: 66
      });
  
      function stylesheet$9(token, useActualHostSelector, useNativeDirPseudoclass) {
        var shadowSelector = token ? ("[" + token + "]") : "";
        return ".header" + shadowSelector + " {display: flex;justify-content: space-between;align-items: center;padding: 12px 16px;background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);border-radius: 16px 16px 0 0;color: white;}.header-left" + shadowSelector + " {display: flex;align-items: center;gap: 12px;}.agent-info" + shadowSelector + " {display: flex;align-items: center;gap: 8px;}.agent-logo" + shadowSelector + " {width: 32px;height: 32px;border-radius: 50%;}.agent-name" + shadowSelector + " {font-weight: 600;font-size: 14px;}.header-right" + shadowSelector + " {display: flex;gap: 8px;}.header-button" + shadowSelector + " {background: rgba(255, 255, 255, 0.1);border: none;border-radius: 8px;padding: 8px;cursor: pointer;color: white;transition: background 0.2s ease;display: flex;align-items: center;justify-content: center;}.header-button:hover" + shadowSelector + " {background: rgba(255, 255, 255, 0.2);}";
        /*LWC compiler v8.28.2*/
      }
      var _implicitStylesheets$9 = [stylesheet$9];
  
      const $fragment1$7 = parseFragment`<div class="header${0}"${2}><div class="header-left${0}"${2}><div class="agent-info${0}"${2}><img${"a3:src"} alt="Agent Logo" class="agent-logo${0}"${2}><span class="agent-name${0}"${2}>Adaptive Web Agent</span></div></div><div class="header-right${0}"${2}><button class="header-button${0}" title="New Conversation"${2}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"${3}><path d="M12 5v14M5 12h14"${3}/></svg></button><button class="header-button${0}" title="Minimize"${2}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"${3}><path d="M6 9l6 6 6-6"${3}/></svg></button><button class="header-button${0}" title="Close Conversation"${2}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"${3}><path d="M18 6L6 18M6 6l12 12"${3}/></svg></button></div></div>`;
      function tmpl$a($api, $cmp, $slotset, $ctx) {
        const {b: api_bind, sp: api_static_part, st: api_static_fragment, fr: api_fragment} = $api;
        const {_m0, _m1, _m2} = $ctx;
        return [$cmp.show ? api_fragment(0, [api_static_fragment($fragment1$7, 2, [api_static_part(3, {
          attrs: {
            "src": $cmp.AGENT_LOGO_IMAGE_URL
          }
        }, null), api_static_part(7, {
          on: _m0 || ($ctx._m0 = {
            "click": api_bind($cmp.handleNewConversation)
          })
        }, null), api_static_part(10, {
          on: _m1 || ($ctx._m1 = {
            "click": api_bind($cmp.handleMinimize)
          })
        }, null), api_static_part(13, {
          on: _m2 || ($ctx._m2 = {
            "click": api_bind($cmp.handleCloseConversation)
          })
        }, null)])], 0) : null];
        /*LWC compiler v8.28.2*/
      }
      var _tmpl$a = registerTemplate(tmpl$a);
      tmpl$a.stylesheets = [];
      tmpl$a.stylesheetToken = "lwc-6h4v25i937b";
      tmpl$a.legacyStylesheetToken = "c-header_header";
      if (_implicitStylesheets$9) {
        tmpl$a.stylesheets.push.apply(tmpl$a.stylesheets, _implicitStylesheets$9);
      }
      freezeTemplate(tmpl$a);
  
      class Header extends LightningElement {
        constructor(...args) {
          super(...args);
          this.show = false;
          this.AGENT_LOGO_IMAGE_URL = 'https://zzpq-010.dx.commercecloud.salesforce.com/on/demandware.static/Sites-nto-Site/-/default/dw9814f411/images/favicons/favicon-32x32.png';
        }
        handleMinimize() {
          // Dispatch custom event for pure UI toggle (doesn't affect conversation state)
          this.dispatchEvent(new CustomEvent('toggleminimize', {
            bubbles: true,
            composed: true
          }));
        }
        handleNewConversation() {
          window.AdaptiveWebsite.startNewConversation();
        }
        handleCloseConversation() {
          // End the conversation via controller
          window.AdaptiveWebsite.endConversation();
  
          // Also dispatch event to toggle UI to SearchBar
          this.dispatchEvent(new CustomEvent('closeconversation', {
            bubbles: true,
            composed: true
          }));
        }
        /*LWC compiler v8.28.2*/
      }
      registerDecorators(Header, {
        publicProps: {
          show: {
            config: 0
          }
        },
        fields: ["AGENT_LOGO_IMAGE_URL"]
      });
      const __lwc_component_class_internal$a = registerComponent(Header, {
        tmpl: _tmpl$a,
        sel: "c-header",
        apiVersion: 66
      });
  
      function stylesheet$8(token, useActualHostSelector, useNativeDirPseudoclass) {
        var shadowSelector = token ? ("[" + token + "]") : "";
        var suffixToken = token ? ("-" + token) : "";
        return ".chatbot-container" + shadowSelector + " {display: flex;flex-direction: column;height: 100%;width: 26vw;min-width: 200px;background: transparent;pointer-events: auto;animation: dropDown" + suffixToken + " 0.5s ease-out forwards;box-sizing: border-box;}@keyframes dropDown" + suffixToken + " {from {transform: translateY(-100vh);opacity: 0;}to {transform: translateY(0);opacity: 1;}}.messages-container" + shadowSelector + " {flex: 1;padding: 16px;overflow-y: auto;display: flex;flex-direction: column;gap: 12px;background: rgba(255, 255, 255);border-radius: 12px;margin: 8px;}.message" + shadowSelector + " {display: flex;align-items: center;gap: 12px;max-width: 80%;}.message-user" + shadowSelector + " {align-self: flex-end;flex-direction: row-reverse;}.message-bot" + shadowSelector + " {align-self: flex-start;}.agent-logo" + shadowSelector + " {flex-shrink: 0;width: 32px;height: 32px;display: flex;justify-content: center;align-self: center;border-radius: 50%;}.agent-logo" + shadowSelector + " img" + shadowSelector + " {width: 100%;height: 100%;border-radius: 50%;}.message-wrapper" + shadowSelector + " {flex: 1;display: flex;flex-direction: column;gap: 4px;font-size: 1rem;}.message-content" + shadowSelector + " {background: #f1f3f4;padding: 12px 16px;position: relative;width: fit-content;color: #1C1C1C;}.message-user" + shadowSelector + " .message-content" + shadowSelector + " {background: #EEF4FF;align-self: flex-end;border-radius: 15px 15px 0px 15px;}.message-bot" + shadowSelector + " .message-content" + shadowSelector + " {background: #F3F3F3;align-self: flex-start;border-radius: 15px 15px 15px 0px;}.message-text" + shadowSelector + " {line-height: 1.4;word-wrap: break-word;max-width: 285px;}.message-timestamp" + shadowSelector + " {font-size: 11px;opacity: 0.6;color: #444;margin-left: 12px;align-self: flex-start;}.message-user" + shadowSelector + " .message-timestamp" + shadowSelector + " {align-self: flex-end;margin-left: 0;margin-right: 12px;}.message-input-form" + shadowSelector + " {padding: 12px 16px;background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);margin: 0;width: 100%;box-sizing: border-box;}.message-input-container" + shadowSelector + " {display: flex;align-items: center;gap: 12px;background: rgba(255, 255, 255, 0.1);border-radius: 20px;padding: 8px 16px;}.input-row" + shadowSelector + " {display: flex;align-items: center;gap: 12px;flex: 1;}.textarea-container" + shadowSelector + " {position: relative;flex: 1;display: flex;align-items: center;}.message-input" + shadowSelector + " {flex: 1;border: none;background: transparent;color: white;font-size: 14px;outline: none;resize: none;min-height: 20px;max-height: 80px;overflow-y: auto;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;line-height: 1.4;}.message-input" + shadowSelector + "::placeholder {color: rgba(255, 255, 255, 0.6);}.message-input:focus" + shadowSelector + " {outline: none;}.send-button" + shadowSelector + " {background: rgba(255, 255, 255, 0.15);border: none;border-radius: 50%;width: 36px;height: 36px;cursor: pointer;display: flex;align-items: center;justify-content: center;transition: background 0.2s ease;flex-shrink: 0;}.send-button:hover" + shadowSelector + " {background: rgba(255, 255, 255, 0.25);}.send-button" + shadowSelector + " svg" + shadowSelector + " {color: white;}.message-choices" + shadowSelector + " {display: flex;width: 280px;flex-direction: column;align-items: flex-end;border-radius: 4px;border: 1px solid #949494;margin-top: 8px;overflow: hidden;}.choice-button" + shadowSelector + " {padding: 12px 16px;border: none;background: white;color: #333333;border-radius: 0;cursor: pointer;font-weight: 500;transition: all 0.2s ease;text-align: left;min-height: 44px;display: flex;align-items: center;width: 100%;border-bottom: 1px solid #949494;}.choice-button:hover" + shadowSelector + " {background: #EEF4FF;box-shadow: 0 2px 4px rgba(0, 123, 255, 0.2);}.choice-button:active" + shadowSelector + " {box-shadow: 0 1px 2px rgba(0, 123, 255, 0.2);}.choice-button.selected" + shadowSelector + " {background: #EEF4FF;box-shadow: 0 2px 4px rgba(0, 123, 255, 0.2);cursor: not-allowed;opacity: 0.8;}.typing-indicator" + shadowSelector + " {display: flex;align-items: center;gap: 4px;padding: 4px 0;}.typing-indicator" + shadowSelector + " span" + shadowSelector + " {width: 8px;height: 8px;border-radius: 50%;background-color: #999;animation: typing" + suffixToken + " 1.4s infinite ease-in-out;}.typing-indicator" + shadowSelector + " span:nth-child(1)" + shadowSelector + " {animation-delay: -0.32s;}.typing-indicator" + shadowSelector + " span:nth-child(2)" + shadowSelector + " {animation-delay: -0.16s;}.typing-indicator" + shadowSelector + " span:nth-child(3)" + shadowSelector + " {animation-delay: 0;}@keyframes typing" + suffixToken + " {0%, 80%, 100% {transform: scale(0.8);opacity: 0.5;}40% {transform: scale(1);opacity: 1;}}";
        /*LWC compiler v8.28.2*/
      }
      var _implicitStylesheets$8 = [stylesheet$8];
  
      const $fragment1$6 = parseFragment`<div class="agent-logo${0}"${2}><img${"a1:src"} alt="Agent Logo"${3}></div>`;
      const $fragment2$2 = parseFragment`<div class="message-content${0}"${2}><div class="message-text${0}"${2}>${"t2"}</div></div>`;
      const $fragment3$2 = parseFragment`<button class="choice-button${0}"${"a0:data-option"}${2}>${"t1"}</button>`;
      const $fragment4$1 = parseFragment`<div class="message-timestamp${0}"${2}>${"t1"}</div>`;
      const $fragment5$1 = parseFragment`<div class="message message-bot${0}"${2}><div class="agent-logo${0}"${2}><img${"a2:src"} alt="Agent Logo"${3}></div><div class="message-wrapper${0}"${2}><div class="message-content${0}"${2}><div class="typing-indicator${0}"${2}><span${3}></span><span${3}></span><span${3}></span></div></div></div></div>`;
      const $fragment6$1 = parseFragment`<form class="message-input-form${0}"${2}><div class="message-input-container${0}"${2}><div class="input-row${0}"${2}><div class="textarea-container${0}"${2}><textarea placeholder="Ask me anything..." class="message-input${0}" rows="1"${2}>${"t5"}</textarea></div><button type="submit" class="send-button${0}" title="Send message"${2}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${3}><path d="M22 2L11 13"${3}/><path d="M22 2L15 22L11 13L2 9L22 2Z"${3}/></svg></button></div></div></form>`;
      const stc0$7 = {
        classMap: {
          "chatbot-container": true
        },
        key: 1
      };
      const stc1$6 = {
        classMap: {
          "messages-container": true
        },
        key: 2
      };
      const stc2$3 = {
        classMap: {
          "message-wrapper": true
        },
        key: 7
      };
      const stc3$2 = {
        classMap: {
          "message-choices": true
        },
        key: 11
      };
      function tmpl$9($api, $cmp, $slotset, $ctx) {
        const {ncls: api_normalize_class_name, k: api_key, sp: api_static_part, st: api_static_fragment, fr: api_fragment, d: api_dynamic_text, b: api_bind, i: api_iterator, h: api_element, f: api_flatten} = $api;
        const {_m0, _m1, _m2, _m3, _m4} = $ctx;
        return [$cmp.show ? api_fragment(0, [api_element("div", stc0$7, [api_element("div", stc1$6, api_flatten([api_iterator($cmp.filteredEntries, function (entry) {
          return api_element("div", {
            className: api_normalize_class_name(entry.messageClass),
            key: api_key(3, entry.id)
          }, [entry.isFromBot ? api_fragment(4, [api_static_fragment($fragment1$6, 6, [api_static_part(1, {
            attrs: {
              "src": $cmp.AGENT_LOGO_IMAGE_URL
            }
          }, null)])], 0) : null, api_element("div", stc2$3, [api_static_fragment($fragment2$2, 9, [api_static_part(2, null, api_dynamic_text(entry.text))]), entry.hasOptions ? api_fragment(10, [api_element("div", stc3$2, api_iterator(entry.options, function (option) {
            return api_static_fragment($fragment3$2, api_key(13, option.name), [api_static_part(0, {
              on: _m1 || ($ctx._m1 = {
                "click": api_bind($cmp.handleChoiceSelection)
              }),
              attrs: {
                "data-option": option.name
              }
            }, null), api_static_part(1, null, api_dynamic_text(option.name))]);
          }))], 0) : null, entry.timestamp ? api_fragment(14, [api_static_fragment($fragment4$1, 16, [api_static_part(1, null, api_dynamic_text(entry.timestampLabel))])], 0) : null])]);
        }), $cmp.isAnotherParticipantTyping ? api_fragment(17, [api_static_fragment($fragment5$1, 19, [api_static_part(2, {
          attrs: {
            "src": $cmp.AGENT_LOGO_IMAGE_URL
          }
        }, null)])], 0) : null])), api_static_fragment($fragment6$1, 21, [api_static_part(0, {
          on: _m3 || ($ctx._m3 = {
            "submit": api_bind($cmp.handleSendMessage)
          })
        }, null), api_static_part(4, {
          on: _m4 || ($ctx._m4 = {
            "input": api_bind($cmp.handleInputChange),
            "keydown": api_bind($cmp.handleKeyPress)
          })
        }, null), api_static_part(5, null, api_dynamic_text($cmp.inputText))])])], 0) : null];
        /*LWC compiler v8.28.2*/
      }
      var _tmpl$9 = registerTemplate(tmpl$9);
      tmpl$9.stylesheets = [];
      tmpl$9.stylesheetToken = "lwc-3s8sc0bamoo";
      tmpl$9.legacyStylesheetToken = "c-chatBot_chatBot";
      if (_implicitStylesheets$8) {
        tmpl$9.stylesheets.push.apply(tmpl$9.stylesheets, _implicitStylesheets$8);
      }
      freezeTemplate(tmpl$9);
  
      class ChatBot extends LightningElement {
        constructor(...args) {
          super(...args);
          this.show = false;
          this.inputText = '';
          this.isAnotherParticipantTyping = false;
          this.conversationEntries = [];
          this.AGENT_LOGO_IMAGE_URL = 'https://zzpq-010.dx.commercecloud.salesforce.com/on/demandware.static/Sites-nto-Site/-/default/dw9814f411/images/favicons/favicon-32x32.png';
          this.AGENT_NAME = 'Adaptive Web Agent';
          this._handleTypingStarted = void 0;
          this._handleTypingStopped = void 0;
          this._handleMessageReceived = void 0;
          this._handleListEntries = void 0;
        }
        connectedCallback() {
          this._handleTypingStarted = this.handleTypingIndicatorStarted.bind(this);
          this._handleTypingStopped = this.handleTypingIndicatorStopped.bind(this);
          this._handleMessageReceived = this.handleMessageReceived.bind(this);
          this._handleListEntries = this.handleListConversationEntries.bind(this);
          window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_TYPING_INDICATOR_STARTED, this._handleTypingStarted);
          window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_TYPING_INDICATOR_STOPPED, this._handleTypingStopped);
          window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGE_SENT, this._handleMessageReceived);
          window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_LIST_CONVERSATION_ENTRIES, this._handleListEntries);
        }
        disconnectedCallback() {
          window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_TYPING_INDICATOR_STARTED, this._handleTypingStarted);
          window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_TYPING_INDICATOR_STOPPED, this._handleTypingStopped);
          window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGE_SENT, this._handleMessageReceived);
          window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_LIST_CONVERSATION_ENTRIES, this._handleListEntries);
        }
        renderedCallback() {
          if (this.show) {
            this.scrollToBottom();
          }
        }
        scrollToBottom() {
          const container = this.template.querySelector('.messages-container');
          if (container) {
            container.scrollTo({
              top: container.scrollHeight,
              behavior: 'smooth'
            });
          }
        }
        handleMessageReceived(event) {
          const entry = window.AdaptiveWebsite.util.parseEntryPayload(event.detail.conversationEntry);
          this.conversationEntries = [...this.conversationEntries, entry];
          console.debug('Message received:', event.detail);
        }
        handleListConversationEntries(event) {
          this.conversationEntries = event.detail.entries;
          console.debug('List conversation entries:', event.detail);
        }
        handleTypingIndicatorStarted() {
          this.isAnotherParticipantTyping = true;
        }
        handleTypingIndicatorStopped() {
          this.isAnotherParticipantTyping = false;
        }
        handleInputChange(event) {
          this.inputText = event.target.value;
        }
        handleSendMessage(event) {
          event.preventDefault();
          if (this.inputText) {
            const text = this.inputText;
            this.inputText = '';
  
            // Also clear the actual textarea element (LWC doesn't auto-sync textarea content)
            const textarea = this.template.querySelector('.message-input');
            if (textarea) {
              textarea.value = '';
            }
            window.AdaptiveWebsite.sendTextMessage(text).catch(error => {
              console.error('Something went wrong while sending a message:', error);
            });
          }
        }
        handleKeyPress(event) {
          if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            this.handleSendMessage(event);
          }
        }
  
        // Computed property for filtered entries
        get filteredEntries() {
          return this.conversationEntries.filter(entry => window.AdaptiveWebsite.util.isTextMessage(entry)).map(entry => {
            const payload = this.getMessagePayload(entry);
            const isFromEndUser = window.AdaptiveWebsite.util.isMessageFromEndUser(entry);
            const isFromBot = !isFromEndUser;
            const timestamp = this.formatTimestamp(entry.transcriptedTimestamp);
            const senderLabel = isFromEndUser ? 'Sent' : this.AGENT_NAME;
            return {
              id: entry.identifier,
              text: payload?.text || '',
              options: payload?.options || [],
              hasOptions: payload?.options?.length > 0,
              isFromEndUser,
              isFromBot,
              timestamp,
              senderLabel,
              messageClass: isFromEndUser ? 'message message-user' : 'message message-bot',
              timestampLabel: senderLabel + ' - ' + timestamp
            };
          });
        }
        getMessagePayload(entry) {
          try {
            if (window.AdaptiveWebsite.util.isConversationEntryStaticContentMessage(entry)) {
              const textContent = window.AdaptiveWebsite.util.getTextMessageContent(entry);
              if (textContent) {
                // Use parseJsonInAgentResponse to handle ```json blocks
                const json = window.AdaptiveWebsite.util.parseJsonInAgentResponse(textContent);
                if (json !== undefined && typeof json === 'object' && json !== null && typeof json.text === 'string') {
                  // Valid JSON payload with text property
                  return json;
                } else {
                  // Plain text response (not JSON or no text property)
                  return {
                    text: textContent
                  };
                }
              }
            }
          } catch (e) {
            console.error('Error getting message payload:', e);
          }
          return null;
        }
        formatTimestamp(timestamp) {
          if (!timestamp) return '';
          const date = new Date(timestamp);
          return date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          });
        }
        handleChoiceSelection(event) {
          const optionName = event.target.dataset.option;
          window.AdaptiveWebsite.sendTextMessage(optionName);
  
          // Visual feedback
          event.target.classList.add('selected');
          const siblings = event.target.parentElement.querySelectorAll('button');
          siblings.forEach(btn => {
            if (btn !== event.target) {
              btn.classList.remove('selected');
            }
          });
        }
        /*LWC compiler v8.28.2*/
      }
      registerDecorators(ChatBot, {
        publicProps: {
          show: {
            config: 0
          }
        },
        track: {
          inputText: 1,
          isAnotherParticipantTyping: 1,
          conversationEntries: 1
        },
        fields: ["AGENT_LOGO_IMAGE_URL", "AGENT_NAME", "_handleTypingStarted", "_handleTypingStopped", "_handleMessageReceived", "_handleListEntries"]
      });
      const __lwc_component_class_internal$9 = registerComponent(ChatBot, {
        tmpl: _tmpl$9,
        sel: "c-chat-bot",
        apiVersion: 66
      });
  
      function stylesheet$7(token, useActualHostSelector, useNativeDirPseudoclass) {
        var shadowSelector = token ? ("[" + token + "]") : "";
        var hostSelector = token ? ("[" + token + "-host]") : "";
        return ((useActualHostSelector ? ":host {" : hostSelector + " {")) + "display: flex;flex: 1;height: 100%;}.content-zone-container" + shadowSelector + " {flex: 1;display: flex;flex-direction: column;height: 100%;background: transparent;overflow: hidden;min-width: 300px;padding: 8px;box-sizing: border-box;}.content-zone-content" + shadowSelector + " {flex: 1;display: flex;flex-direction: column;padding: 16px;overflow-y: auto;height: 100%;background: rgba(255, 255, 255, 0.95);border-radius: 12px;}";
        /*LWC compiler v8.28.2*/
      }
      var _implicitStylesheets$7 = [stylesheet$7];
  
      function stylesheet$6(token, useActualHostSelector, useNativeDirPseudoclass) {
        var shadowSelector = token ? ("[" + token + "]") : "";
        return ".recs-template" + shadowSelector + " {padding: 16px;}.products-grid" + shadowSelector + " {display: grid;grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));gap: 16px;}@media (max-width: 480px) {.products-grid" + shadowSelector + " {grid-template-columns: repeat(2, 1fr);}}";
        /*LWC compiler v8.28.2*/
      }
      var _implicitStylesheets$6 = [stylesheet$6];
  
      function stylesheet$5(token, useActualHostSelector, useNativeDirPseudoclass) {
        var shadowSelector = token ? ("[" + token + "]") : "";
        return ".product-card" + shadowSelector + " {background: white;border-radius: 12px;overflow: hidden;box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);transition: transform 0.2s ease, box-shadow 0.2s ease;}.product-card:hover" + shadowSelector + " {transform: translateY(-4px);box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);}.product-image-container" + shadowSelector + " {width: 100%;aspect-ratio: 1;overflow: hidden;background: #f5f5f5;}.product-image" + shadowSelector + " {width: 100%;height: 100%;object-fit: cover;}.product-info" + shadowSelector + " {padding: 12px;}.product-name" + shadowSelector + " {font-size: 14px;font-weight: 600;margin: 0 0 8px 0;color: #333;line-height: 1.3;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;}.product-price" + shadowSelector + " {font-size: 16px;font-weight: 700;color: #1a1a1a;margin-bottom: 8px;}";
        /*LWC compiler v8.28.2*/
      }
      var _implicitStylesheets$5 = [stylesheet$5];
  
      function stylesheet$4(token, useActualHostSelector, useNativeDirPseudoclass) {
        var shadowSelector = token ? ("[" + token + "]") : "";
        return ".stars-container" + shadowSelector + " {display: flex;align-items: center;gap: 2px;}.stars-container.small" + shadowSelector + " .star" + shadowSelector + " {font-size: 12px;}.stars-container.large" + shadowSelector + " .star" + shadowSelector + " {font-size: 18px;}.star" + shadowSelector + " {color: #ffc107;}.rating-text" + shadowSelector + " {margin-left: 4px;font-size: 12px;color: #666;}";
        /*LWC compiler v8.28.2*/
      }
      var _implicitStylesheets$4 = [stylesheet$4];
  
      const $fragment1$5 = parseFragment`<span class="rating-text${0}"${2}>${"t1"}</span>`;
      const stc0$6 = {
        "star": true
      };
      function tmpl$8($api, $cmp, $slotset, $ctx) {
        const {ncls: api_normalize_class_name, k: api_key, t: api_text, fr: api_fragment, h: api_element, i: api_iterator, d: api_dynamic_text, sp: api_static_part, st: api_static_fragment, f: api_flatten} = $api;
        return [api_element("div", {
          className: api_normalize_class_name($cmp.containerClass),
          key: 0
        }, api_flatten([api_iterator($cmp.stars, function (star) {
          return api_element("span", {
            classMap: stc0$6,
            key: api_key(1, star.id)
          }, [star.isFull ? api_fragment(2, [api_text("★")], 0) : star.isHalf ? api_fragment(2, [api_text("☆")], 0) : api_fragment(2, [api_text("☆")], 0)]);
        }), api_static_fragment($fragment1$5, 4, [api_static_part(1, null, api_dynamic_text($cmp.rating))])]))];
        /*LWC compiler v8.28.2*/
      }
      var _tmpl$8 = registerTemplate(tmpl$8);
      tmpl$8.stylesheets = [];
      tmpl$8.stylesheetToken = "lwc-54dm2lkufct";
      tmpl$8.legacyStylesheetToken = "c-productStars_productStars";
      if (_implicitStylesheets$4) {
        tmpl$8.stylesheets.push.apply(tmpl$8.stylesheets, _implicitStylesheets$4);
      }
      freezeTemplate(tmpl$8);
  
      class ProductStars extends LightningElement {
        constructor(...args) {
          super(...args);
          this.rating = 0;
          this.size = 'small';
        }
        get stars() {
          const fullStars = Math.floor(this.rating);
          const hasHalfStar = this.rating % 1 >= 0.5;
          const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
          const result = [];
          for (let i = 0; i < fullStars; i++) {
            result.push({
              id: `full-${i}`,
              type: 'full',
              isFull: true,
              isHalf: false
            });
          }
          if (hasHalfStar) {
            result.push({
              id: 'half',
              type: 'half',
              isFull: false,
              isHalf: true
            });
          }
          for (let i = 0; i < emptyStars; i++) {
            result.push({
              id: `empty-${i}`,
              type: 'empty',
              isFull: false,
              isHalf: false
            });
          }
          return result;
        }
        get containerClass() {
          return `stars-container ${this.size}`;
        }
        /*LWC compiler v8.28.2*/
      }
      registerDecorators(ProductStars, {
        publicProps: {
          rating: {
            config: 0
          },
          size: {
            config: 0
          }
        }
      });
      const __lwc_component_class_internal$8 = registerComponent(ProductStars, {
        tmpl: _tmpl$8,
        sel: "c-product-stars",
        apiVersion: 66
      });
  
      const $fragment1$4 = parseFragment`<div class="product-image-container${0}"${2}><img${"a1:src"}${"a1:alt"} class="product-image${0}"${2}></div>`;
      const $fragment2$1 = parseFragment`<h3 class="product-name${0}"${2}>${"t1"}</h3>`;
      const $fragment3$1 = parseFragment`<div class="product-price${0}"${2}>${"t1"}</div>`;
      const stc0$5 = {
        classMap: {
          "product-card": true
        },
        key: 0
      };
      const stc1$5 = {
        classMap: {
          "product-info": true
        },
        key: 3
      };
      function tmpl$7($api, $cmp, $slotset, $ctx) {
        const {sp: api_static_part, st: api_static_fragment, d: api_dynamic_text, c: api_custom_element, fr: api_fragment, h: api_element} = $api;
        return [api_element("div", stc0$5, [api_static_fragment($fragment1$4, 2, [api_static_part(1, {
          attrs: {
            "src": $cmp.productImage,
            "alt": $cmp.productName
          }
        }, null)]), api_element("div", stc1$5, [api_static_fragment($fragment2$1, 5, [api_static_part(1, null, api_dynamic_text($cmp.productName))]), api_static_fragment($fragment3$1, 7, [api_static_part(1, null, api_dynamic_text($cmp.productPrice))]), $cmp.hasRating ? api_fragment(8, [api_custom_element("c-product-stars", __lwc_component_class_internal$8, {
          props: {
            "rating": $cmp.productRating
          },
          key: 9
        })], 0) : null])])];
        /*LWC compiler v8.28.2*/
      }
      var _tmpl$7 = registerTemplate(tmpl$7);
      tmpl$7.stylesheets = [];
      tmpl$7.stylesheetToken = "lwc-66d2o2b37sd";
      tmpl$7.legacyStylesheetToken = "c-productCard_productCard";
      if (_implicitStylesheets$5) {
        tmpl$7.stylesheets.push.apply(tmpl$7.stylesheets, _implicitStylesheets$5);
      }
      freezeTemplate(tmpl$7);
  
      class ProductCard extends LightningElement {
        constructor(...args) {
          super(...args);
          this.product = {};
        }
        get hasRating() {
          return this.product && this.product.rating;
        }
        get productImage() {
          return this.product?.image || '';
        }
        get productName() {
          return this.product?.name || '';
        }
        get productPrice() {
          return this.product?.price || '';
        }
        get productRating() {
          return this.product?.rating || 0;
        }
        /*LWC compiler v8.28.2*/
      }
      registerDecorators(ProductCard, {
        publicProps: {
          product: {
            config: 0
          }
        }
      });
      const __lwc_component_class_internal$7 = registerComponent(ProductCard, {
        tmpl: _tmpl$7,
        sel: "c-product-card",
        apiVersion: 66
      });
  
      const stc0$4 = {
        classMap: {
          "recs-template": true
        },
        key: 0
      };
      const stc1$4 = {
        classMap: {
          "products-grid": true
        },
        key: 2
      };
      function tmpl$6($api, $cmp, $slotset, $ctx) {
        const {k: api_key, c: api_custom_element, i: api_iterator, h: api_element, fr: api_fragment} = $api;
        return [api_element("div", stc0$4, [$cmp.hasProducts ? api_fragment(1, [api_element("div", stc1$4, api_iterator($cmp.products, function (product) {
          return api_custom_element("c-product-card", __lwc_component_class_internal$7, {
            props: {
              "product": product
            },
            key: api_key(3, product.id)
          });
        }))], 0) : null])];
        /*LWC compiler v8.28.2*/
      }
      var _tmpl$6 = registerTemplate(tmpl$6);
      tmpl$6.stylesheets = [];
      tmpl$6.stylesheetToken = "lwc-6tgn3a111pn";
      tmpl$6.legacyStylesheetToken = "c-recsTemplate_recsTemplate";
      if (_implicitStylesheets$6) {
        tmpl$6.stylesheets.push.apply(tmpl$6.stylesheets, _implicitStylesheets$6);
      }
      freezeTemplate(tmpl$6);
  
      class RecsTemplate extends LightningElement {
        constructor(...args) {
          super(...args);
          this._content = {};
        }
        get content() {
          return this._content;
        }
        set content(value) {
          if (typeof value === 'string') {
            try {
              this._content = JSON.parse(value);
            } catch {
              this._content = {};
            }
          } else {
            this._content = value || {};
          }
        }
        get products() {
          const curation = this._content?.curation;
          if (curation && Array.isArray(curation.products)) {
            return curation.products.map((product, index) => ({
              ...product,
              id: product.id || `product-${index}`
            }));
          }
          return [];
        }
        get hasProducts() {
          return this.products.length > 0;
        }
        /*LWC compiler v8.28.2*/
      }
      registerDecorators(RecsTemplate, {
        publicProps: {
          content: {
            config: 3
          }
        },
        track: {
          _content: 1
        }
      });
      const __lwc_component_class_internal$6 = registerComponent(RecsTemplate, {
        tmpl: _tmpl$6,
        sel: "c-recs-template",
        apiVersion: 66
      });
  
      function stylesheet$3(token, useActualHostSelector, useNativeDirPseudoclass) {
        var shadowSelector = token ? ("[" + token + "]") : "";
        return ".comparison-template" + shadowSelector + " {padding: 16px;}.comparison-grid" + shadowSelector + " {display: grid;grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));gap: 16px;}.comparison-column" + shadowSelector + " {display: flex;flex-direction: column;gap: 12px;}.features-section" + shadowSelector + " {background: #f9f9f9;border-radius: 8px;padding: 12px;}.feature-row" + shadowSelector + " {display: flex;justify-content: space-between;padding: 8px 0;border-bottom: 1px solid #eee;}.feature-row:last-child" + shadowSelector + " {border-bottom: none;}.feature-name" + shadowSelector + " {font-size: 12px;color: #666;}.feature-value" + shadowSelector + " {font-size: 12px;font-weight: 600;color: #333;}";
        /*LWC compiler v8.28.2*/
      }
      var _implicitStylesheets$3 = [stylesheet$3];
  
      const $fragment1$3 = parseFragment`<div class="feature-row${0}"${2}><div class="feature-name${0}"${2}>${"t2"}</div><div class="feature-value${0}"${2}>${"t4"}</div></div>`;
      const stc0$3 = {
        classMap: {
          "comparison-template": true
        },
        key: 0
      };
      const stc1$3 = {
        classMap: {
          "comparison-grid": true
        },
        key: 2
      };
      const stc2$2 = {
        "comparison-column": true
      };
      const stc3$1 = {
        classMap: {
          "features-section": true
        },
        key: 6
      };
      function tmpl$5($api, $cmp, $slotset, $ctx) {
        const {k: api_key, c: api_custom_element, d: api_dynamic_text, sp: api_static_part, st: api_static_fragment, i: api_iterator, h: api_element, fr: api_fragment} = $api;
        return [api_element("div", stc0$3, [$cmp.hasProducts ? api_fragment(1, [api_element("div", stc1$3, api_iterator($cmp.displayProducts, function (product) {
          return api_element("div", {
            classMap: stc2$2,
            key: api_key(3, product.id)
          }, [api_custom_element("c-product-card", __lwc_component_class_internal$7, {
            props: {
              "product": product
            },
            key: 4
          }), $cmp.hasFeatures ? api_fragment(5, [api_element("div", stc3$1, api_iterator(product.featureRows, function (feature) {
            return api_static_fragment($fragment1$3, api_key(8, feature.id), [api_static_part(2, null, api_dynamic_text(feature.name)), api_static_part(4, null, api_dynamic_text(feature.value))]);
          }))], 0) : null]);
        }))], 0) : null])];
        /*LWC compiler v8.28.2*/
      }
      var _tmpl$5 = registerTemplate(tmpl$5);
      tmpl$5.stylesheets = [];
      tmpl$5.stylesheetToken = "lwc-1h18joj15ub";
      tmpl$5.legacyStylesheetToken = "c-comparisonTemplate_comparisonTemplate";
      if (_implicitStylesheets$3) {
        tmpl$5.stylesheets.push.apply(tmpl$5.stylesheets, _implicitStylesheets$3);
      }
      freezeTemplate(tmpl$5);
  
      class ComparisonTemplate extends LightningElement {
        constructor(...args) {
          super(...args);
          this._content = {};
        }
        get content() {
          return this._content;
        }
        set content(value) {
          if (typeof value === 'string') {
            try {
              this._content = JSON.parse(value);
            } catch {
              this._content = {};
            }
          } else {
            this._content = value || {};
          }
        }
        get displayProducts() {
          const curation = this._content?.curation;
          if (curation && Array.isArray(curation.products)) {
            return curation.products.slice(0, 3).map((product, index) => ({
              ...product,
              id: product.id || `product-${index}`,
              featureRows: this.getFeatureRowsForProduct(product)
            }));
          }
          return [];
        }
        get allFeatures() {
          const featureSet = new Set();
          const curation = this._content?.curation;
          if (curation && Array.isArray(curation.products)) {
            curation.products.slice(0, 3).forEach(product => {
              if (product.features) {
                product.features.forEach(feature => {
                  featureSet.add(feature.name);
                });
              }
            });
          }
          return Array.from(featureSet).slice(0, 5);
        }
        getFeatureRowsForProduct(product) {
          return this.allFeatures.map((featureName, index) => {
            const feature = product.features?.find(f => f.name === featureName);
            return {
              id: `${product.id}-feature-${index}`,
              name: featureName,
              value: feature?.value || '—'
            };
          });
        }
        get hasProducts() {
          return this.displayProducts.length > 0;
        }
        get hasFeatures() {
          return this.allFeatures.length > 0;
        }
        /*LWC compiler v8.28.2*/
      }
      registerDecorators(ComparisonTemplate, {
        publicProps: {
          content: {
            config: 3
          }
        },
        track: {
          _content: 1
        }
      });
      const __lwc_component_class_internal$5 = registerComponent(ComparisonTemplate, {
        tmpl: _tmpl$5,
        sel: "c-comparison-template",
        apiVersion: 66
      });
  
      function stylesheet$2(token, useActualHostSelector, useNativeDirPseudoclass) {
        var shadowSelector = token ? ("[" + token + "]") : "";
        return ".product-details-template" + shadowSelector + " {padding: 16px;}.product-details-container" + shadowSelector + " {display: grid;grid-template-columns: 1fr 1fr;gap: 24px;}@media (max-width: 600px) {.product-details-container" + shadowSelector + " {grid-template-columns: 1fr;}}.product-image-section" + shadowSelector + " {display: flex;justify-content: center;}.product-image-container" + shadowSelector + " {max-width: 300px;border-radius: 12px;overflow: hidden;background: #f5f5f5;}.product-image-container" + shadowSelector + " img" + shadowSelector + " {width: 100%;height: auto;display: block;}.product-info-section" + shadowSelector + " {display: flex;flex-direction: column;gap: 12px;}.item-number" + shadowSelector + " {font-size: 12px;color: #666;text-transform: uppercase;}.product-name" + shadowSelector + " {font-size: 24px;font-weight: 700;margin: 0;color: #1a1a1a;}.product-price" + shadowSelector + " {font-size: 20px;font-weight: 700;color: #1a1a1a;}.action-buttons" + shadowSelector + " {display: flex;gap: 12px;margin-top: 8px;}.add-to-cart-button" + shadowSelector + " {flex: 1;display: flex;align-items: center;justify-content: center;gap: 8px;padding: 12px 24px;background: #1a1a1a;color: white;border: none;border-radius: 8px;font-weight: 600;font-size: 14px;cursor: pointer;transition: background 0.2s ease;}.add-to-cart-button:hover" + shadowSelector + " {background: #333;}.favorite-button" + shadowSelector + " {padding: 12px;background: white;border: 2px solid #ddd;border-radius: 8px;cursor: pointer;transition: all 0.2s ease;display: flex;align-items: center;justify-content: center;}.favorite-button:hover" + shadowSelector + " {border-color: #ff4444;color: #ff4444;}.features-section" + shadowSelector + " {margin-top: 16px;padding-top: 16px;border-top: 1px solid #eee;}.features-title" + shadowSelector + " {font-size: 14px;font-weight: 700;margin: 0 0 12px 0;color: #1a1a1a;}.features-list" + shadowSelector + " {list-style: none;padding: 0;margin: 0;}.feature-item" + shadowSelector + " {display: flex;gap: 8px;padding: 8px 0;border-bottom: 1px solid #f0f0f0;}.feature-item:last-child" + shadowSelector + " {border-bottom: none;}.feature-name" + shadowSelector + " {font-weight: 600;color: #666;}.feature-value" + shadowSelector + " {color: #333;}";
        /*LWC compiler v8.28.2*/
      }
      var _implicitStylesheets$2 = [stylesheet$2];
  
      const $fragment1$2 = parseFragment`<div class="product-image-section${0}"${2}><div class="product-image-container${0}"${2}><img${"a2:src"}${"a2:alt"}${3}></div></div>`;
      const $fragment2 = parseFragment`<div class="item-number${0}"${2}>${"t1"}</div>`;
      const $fragment3 = parseFragment`<h1 class="product-name${0}"${2}>${"t1"}</h1>`;
      const $fragment4 = parseFragment`<div class="product-price${0}"${2}>${"t1"}</div>`;
      const $fragment5 = parseFragment`<div class="action-buttons${0}"${2}><button class="add-to-cart-button${0}"${2}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"${3}><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"${3}/><line x1="3" y1="6" x2="21" y2="6"${3}/><path d="M16 10a4 4 0 0 1-8 0"${3}/></svg>ADD TO CART</button><button class="favorite-button${0}"${2}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"${3}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"${3}/></svg></button></div>`;
      const $fragment6 = parseFragment`<h2 class="features-title${0}"${2}>FEATURES</h2>`;
      const $fragment7 = parseFragment`<li class="feature-item${0}"${2}><span class="feature-name${0}"${2}>${"t2"}</span><span class="feature-value${0}"${2}>${"t4"}</span></li>`;
      const stc0$2 = {
        classMap: {
          "product-details-template": true
        },
        key: 1
      };
      const stc1$2 = {
        classMap: {
          "product-details-container": true
        },
        key: 2
      };
      const stc2$1 = {
        classMap: {
          "product-info-section": true
        },
        key: 5
      };
      const stc3 = {
        classMap: {
          "features-section": true
        },
        key: 18
      };
      const stc4 = {
        classMap: {
          "features-list": true
        },
        key: 21
      };
      function tmpl$4($api, $cmp, $slotset, $ctx) {
        const {sp: api_static_part, st: api_static_fragment, d: api_dynamic_text, fr: api_fragment, c: api_custom_element, b: api_bind, k: api_key, i: api_iterator, h: api_element} = $api;
        const {_m0, _m1} = $ctx;
        return [$cmp.hasProduct ? api_fragment(0, [api_element("div", stc0$2, [api_element("div", stc1$2, [api_static_fragment($fragment1$2, 4, [api_static_part(2, {
          attrs: {
            "src": $cmp.productImage,
            "alt": $cmp.productName
          }
        }, null)]), api_element("div", stc2$1, [$cmp.hasItemNumber ? api_fragment(6, [api_static_fragment($fragment2, 8, [api_static_part(1, null, "ITEM NO.: " + api_dynamic_text($cmp.productItemNumber))])], 0) : null, api_static_fragment($fragment3, 10, [api_static_part(1, null, api_dynamic_text($cmp.productName))]), api_static_fragment($fragment4, 12, [api_static_part(1, null, api_dynamic_text($cmp.productPrice))]), $cmp.hasRating ? api_fragment(13, [api_custom_element("c-product-stars", __lwc_component_class_internal$8, {
          props: {
            "rating": $cmp.productRating,
            "size": "large"
          },
          key: 14
        })], 0) : null, api_static_fragment($fragment5, 16, [api_static_part(1, {
          on: _m0 || ($ctx._m0 = {
            "click": api_bind($cmp.handleAddToCart)
          })
        }, null), api_static_part(7, {
          on: _m1 || ($ctx._m1 = {
            "click": api_bind($cmp.handleFavoriteClick)
          })
        }, null)]), $cmp.hasFeatures ? api_fragment(17, [api_element("div", stc3, [api_static_fragment($fragment6, 20), api_element("ul", stc4, api_iterator($cmp.productFeatures, function (feature) {
          return api_static_fragment($fragment7, api_key(23, feature.id), [api_static_part(2, null, api_dynamic_text(feature.name) + ":"), api_static_part(4, null, api_dynamic_text(feature.value))]);
        }))])], 0) : null])])])], 0) : null];
        /*LWC compiler v8.28.2*/
      }
      var _tmpl$4 = registerTemplate(tmpl$4);
      tmpl$4.stylesheets = [];
      tmpl$4.stylesheetToken = "lwc-4vvev6sp9de";
      tmpl$4.legacyStylesheetToken = "c-productDetailsTemplate_productDetailsTemplate";
      if (_implicitStylesheets$2) {
        tmpl$4.stylesheets.push.apply(tmpl$4.stylesheets, _implicitStylesheets$2);
      }
      freezeTemplate(tmpl$4);
  
      class ProductDetailsTemplate extends LightningElement {
        constructor(...args) {
          super(...args);
          this._content = {};
        }
        get content() {
          return this._content;
        }
        set content(value) {
          if (typeof value === 'string') {
            try {
              this._content = JSON.parse(value);
            } catch {
              this._content = {};
            }
          } else {
            this._content = value || {};
          }
        }
        get product() {
          return this._content?.curation?.product || null;
        }
        get hasProduct() {
          return !!this.product;
        }
        get productImage() {
          return this.product?.image || '';
        }
        get productName() {
          return this.product?.name || '';
        }
        get productPrice() {
          return this.product?.price || '';
        }
        get productItemNumber() {
          return this.product?.itemNumber || '';
        }
        get hasItemNumber() {
          return !!this.productItemNumber;
        }
        get productRating() {
          return this.product?.rating || 0;
        }
        get hasRating() {
          return !!this.product?.rating;
        }
        get productFeatures() {
          if (this.product?.features && Array.isArray(this.product.features)) {
            return this.product.features.map((feature, index) => ({
              id: `feature-${index}`,
              name: feature.name,
              value: feature.value
            }));
          }
          return [];
        }
        get hasFeatures() {
          return this.productFeatures.length > 0;
        }
        handleAddToCart() {
          console.debug('Add to cart clicked for product:', this.product?.id);
        }
        handleFavoriteClick() {
          console.debug('Favorite clicked for product:', this.product?.id);
        }
        /*LWC compiler v8.28.2*/
      }
      registerDecorators(ProductDetailsTemplate, {
        publicProps: {
          content: {
            config: 3
          }
        },
        track: {
          _content: 1
        }
      });
      const __lwc_component_class_internal$4 = registerComponent(ProductDetailsTemplate, {
        tmpl: _tmpl$4,
        sel: "c-product-details-template",
        apiVersion: 66
      });
  
      function stylesheet$1(token, useActualHostSelector, useNativeDirPseudoclass) {
        var shadowSelector = token ? ("[" + token + "]") : "";
        return ".json-viewer-container" + shadowSelector + " {display: flex;flex-direction: column;height: 100%;background: #1e1e1e;border-radius: 8px;overflow: hidden;font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', monospace;}.json-viewer-header" + shadowSelector + " {display: flex;justify-content: space-between;align-items: center;padding: 12px 16px;background: #2d2d2d;border-bottom: 1px solid #3d3d3d;}.json-viewer-title" + shadowSelector + " {color: #e0e0e0;font-size: 14px;font-weight: 500;}.copy-button" + shadowSelector + " {background: transparent;border: 1px solid #555;border-radius: 4px;padding: 6px 8px;cursor: pointer;color: #aaa;display: flex;align-items: center;justify-content: center;transition: all 0.2s ease;}.copy-button:hover" + shadowSelector + " {background: #3d3d3d;color: #fff;border-color: #666;}.json-viewer-content" + shadowSelector + " {flex: 1;overflow: auto;padding: 16px;}.json-code" + shadowSelector + " {margin: 0;color: #9cdcfe;font-size: 13px;line-height: 1.5;white-space: pre-wrap;word-wrap: break-word;}.json-code" + shadowSelector + " code" + shadowSelector + " {font-family: inherit;}.json-viewer-content" + shadowSelector + "::-webkit-scrollbar {width: 8px;height: 8px;}.json-viewer-content" + shadowSelector + "::-webkit-scrollbar-track {background: #1e1e1e;}.json-viewer-content" + shadowSelector + "::-webkit-scrollbar-thumb {background: #555;border-radius: 4px;}.json-viewer-content::-webkit-scrollbar-thumb:hover" + shadowSelector + " {background: #666;}";
        /*LWC compiler v8.28.2*/
      }
      var _implicitStylesheets$1 = [stylesheet$1];
  
      const $fragment1$1 = parseFragment`<div class="json-viewer-container${0}"${2}><div class="json-viewer-header${0}"${2}><span class="json-viewer-title${0}"${2}>${"t3"}</span><button class="copy-button${0}" title="Copy JSON"${2}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${3}><rect x="9" y="9" width="13" height="13" rx="2" ry="2"${3}/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"${3}/></svg></button></div><div class="json-viewer-content${0}"${2}><pre class="json-code${0}"${2}><code${3}>${"t11"}</code></pre></div></div>`;
      function tmpl$3($api, $cmp, $slotset, $ctx) {
        const {d: api_dynamic_text, b: api_bind, sp: api_static_part, st: api_static_fragment} = $api;
        const {_m0} = $ctx;
        return [api_static_fragment($fragment1$1, 1, [api_static_part(3, null, api_dynamic_text($cmp.title)), api_static_part(4, {
          on: _m0 || ($ctx._m0 = {
            "click": api_bind($cmp.handleCopy)
          })
        }, null), api_static_part(11, null, api_dynamic_text($cmp.parsedContent))])];
        /*LWC compiler v8.28.2*/
      }
      var _tmpl$3 = registerTemplate(tmpl$3);
      tmpl$3.stylesheets = [];
      tmpl$3.stylesheetToken = "lwc-7erlpfjvhj9";
      tmpl$3.legacyStylesheetToken = "c-jsonViewer_jsonViewer";
      if (_implicitStylesheets$1) {
        tmpl$3.stylesheets.push.apply(tmpl$3.stylesheets, _implicitStylesheets$1);
      }
      freezeTemplate(tmpl$3);
  
      class JsonViewer extends LightningElement {
        constructor(...args) {
          super(...args);
          this.content = '{}';
        }
        get parsedContent() {
          try {
            const data = JSON.parse(this.content);
            // Extract the curation data for display
            if (data.curation) {
              return JSON.stringify(data.curation, null, 2);
            }
            return JSON.stringify(data, null, 2);
          } catch (e) {
            console.error('JsonViewer: Error parsing content', e);
            return this.content;
          }
        }
        get title() {
          try {
            const data = JSON.parse(this.content);
            return data.text || 'JSON Data';
          } catch {
            return 'JSON Data';
          }
        }
        handleCopy() {
          const textToCopy = this.parsedContent;
          navigator.clipboard.writeText(textToCopy).then(() => {
            // Visual feedback - could enhance with a toast notification
            const button = this.template.querySelector('.copy-button');
            if (button) {
              button.style.color = '#4caf50';
              setTimeout(() => {
                button.style.color = '';
              }, 1500);
            }
          }).catch(err => {
            console.error('Failed to copy JSON:', err);
          });
        }
        /*LWC compiler v8.28.2*/
      }
      registerDecorators(JsonViewer, {
        publicProps: {
          content: {
            config: 0
          }
        }
      });
      const __lwc_component_class_internal$3 = registerComponent(JsonViewer, {
        tmpl: _tmpl$3,
        sel: "c-json-viewer",
        apiVersion: 66
      });
  
      function stylesheet(token, useActualHostSelector, useNativeDirPseudoclass) {
        var shadowSelector = token ? ("[" + token + "]") : "";
        var hostSelector = token ? ("[" + token + "-host]") : "";
        var suffixToken = token ? ("-" + token) : "";
        return ((useActualHostSelector ? ":host {" : hostSelector + " {")) + "display: flex;flex: 1;height: 100%;}.blank-content" + shadowSelector + " {display: flex;align-items: center;justify-content: center;flex: 1;height: 100%;color: #666;}.typing-indicator" + shadowSelector + " {display: flex;align-items: center;gap: 4px;padding: 4px 0;}.typing-indicator" + shadowSelector + " span" + shadowSelector + " {width: 10px;height: 10px;border-radius: 50%;background-color: #999;animation: typing" + suffixToken + " 1.4s infinite ease-in-out;}.typing-indicator" + shadowSelector + " span:nth-child(1)" + shadowSelector + " {animation-delay: -0.32s;}.typing-indicator" + shadowSelector + " span:nth-child(2)" + shadowSelector + " {animation-delay: -0.16s;}.typing-indicator" + shadowSelector + " span:nth-child(3)" + shadowSelector + " {animation-delay: 0;}@keyframes typing" + suffixToken + " {0%, 80%, 100% {transform: scale(0.8);opacity: 0.5;}40% {transform: scale(1);opacity: 1;}}";
        /*LWC compiler v8.28.2*/
      }
      var _implicitStylesheets = [stylesheet];
  
      const $fragment1 = parseFragment`<div class="blank-content${0}"${2}><div class="typing-indicator${0}"${2}><span${3}></span><span${3}></span><span${3}></span></div></div>`;
      function tmpl$2($api, $cmp, $slotset, $ctx) {
        const {st: api_static_fragment} = $api;
        return [api_static_fragment($fragment1, 1)];
        /*LWC compiler v8.28.2*/
      }
      var _tmpl$2 = registerTemplate(tmpl$2);
      tmpl$2.stylesheets = [];
      tmpl$2.stylesheetToken = "lwc-6anvjd8ci3d";
      tmpl$2.legacyStylesheetToken = "c-placeholder_placeholder";
      if (_implicitStylesheets) {
        tmpl$2.stylesheets.push.apply(tmpl$2.stylesheets, _implicitStylesheets);
      }
      freezeTemplate(tmpl$2);
  
      class Placeholder extends LightningElement {
        // Simple placeholder component with typing indicator
        /*LWC compiler v8.28.2*/
      }
      const __lwc_component_class_internal$2 = registerComponent(Placeholder, {
        tmpl: _tmpl$2,
        sel: "c-placeholder",
        apiVersion: 66
      });
  
      const stc0$1 = {
        classMap: {
          "content-zone-container": true
        },
        key: 1
      };
      const stc1$1 = {
        classMap: {
          "content-zone-content": true
        },
        key: 2
      };
      const stc2 = {
        key: 8
      };
      function tmpl$1($api, $cmp, $slotset, $ctx) {
        const {c: api_custom_element, fr: api_fragment, h: api_element} = $api;
        return [$cmp.show ? api_fragment(0, [api_element("div", stc0$1, [api_element("div", stc1$1, [$cmp.showRecs ? api_fragment(3, [api_custom_element("c-recs-template", __lwc_component_class_internal$6, {
          props: {
            "content": $cmp.contentJson
          },
          key: 4
        })], 0) : $cmp.showComparison ? api_fragment(3, [api_custom_element("c-comparison-template", __lwc_component_class_internal$5, {
          props: {
            "content": $cmp.contentJson
          },
          key: 5
        })], 0) : $cmp.showProductDetails ? api_fragment(3, [api_custom_element("c-product-details-template", __lwc_component_class_internal$4, {
          props: {
            "content": $cmp.contentJson
          },
          key: 6
        })], 0) : $cmp.showJsonViewer ? api_fragment(3, [api_custom_element("c-json-viewer", __lwc_component_class_internal$3, {
          props: {
            "content": $cmp.contentJson
          },
          key: 7
        })], 0) : api_fragment(3, [api_custom_element("c-placeholder", __lwc_component_class_internal$2, stc2)], 0)])])], 0) : null];
        /*LWC compiler v8.28.2*/
      }
      var _tmpl$1 = registerTemplate(tmpl$1);
      tmpl$1.stylesheets = [];
      tmpl$1.stylesheetToken = "lwc-7mjni3j8ie5";
      tmpl$1.legacyStylesheetToken = "c-contentZone_contentZone";
      if (_implicitStylesheets$7) {
        tmpl$1.stylesheets.push.apply(tmpl$1.stylesheets, _implicitStylesheets$7);
      }
      freezeTemplate(tmpl$1);
  
      class ContentZone extends LightningElement {
        constructor(...args) {
          super(...args);
          this.show = false;
          this.contentZoneContent = null;
          this.currentTemplate = null;
          this._handleContentReceived = void 0;
          this._handleListEntries = void 0;
        }
        connectedCallback() {
          this._handleContentReceived = this.handleContentReceived.bind(this);
          this._handleListEntries = this.handleListConversationEntries.bind(this);
          window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_CONTENT_RECEIVED, this._handleContentReceived);
          window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_LIST_CONVERSATION_ENTRIES, this._handleListEntries);
        }
        disconnectedCallback() {
          window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_CONTENT_RECEIVED, this._handleContentReceived);
          window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_LIST_CONVERSATION_ENTRIES, this._handleListEntries);
        }
        handleContentReceived(event) {
          this.contentZoneContent = event.detail.content;
          this.updateCurrentTemplate();
        }
        handleListConversationEntries(event) {
          const entries = event.detail.entries;
  
          // Find the last entry that is sent by agent/bot and is a static content message
          for (let i = entries.length - 1; i >= 0; i--) {
            const entry = entries[i];
            if (window.AdaptiveWebsite.util.isConversationEntryStaticContentMessage(entry) && !window.AdaptiveWebsite.util.isMessageFromEndUser(entry)) {
              const payload = this.getMessagePayload(entry);
              if (payload) {
                this.contentZoneContent = payload;
                this.updateCurrentTemplate();
                return;
              }
            }
          }
        }
        getMessagePayload(entry) {
          try {
            if (window.AdaptiveWebsite.util.isConversationEntryStaticContentMessage(entry)) {
              const textContent = window.AdaptiveWebsite.util.getTextMessageContent(entry);
              if (textContent) {
                // Use parseJsonInAgentResponse to handle ```json blocks
                const json = window.AdaptiveWebsite.util.parseJsonInAgentResponse(textContent);
                if (json !== undefined && typeof json === 'object' && json !== null) {
                  // Valid JSON payload
                  return json;
                } else {
                  // Plain text response (not JSON)
                  return {
                    text: textContent
                  };
                }
              }
            }
          } catch (e) {
            console.error('Error getting message payload:', e);
          }
          return null;
        }
        updateCurrentTemplate() {
          if (this.contentZoneContent && this.contentZoneContent.template) {
            const template = this.contentZoneContent.template;
            if (Array.isArray(template) && template.length > 0) {
              const firstTemplate = template[0];
              if (typeof firstTemplate === 'object' && firstTemplate !== null && 'name' in firstTemplate) {
                this.currentTemplate = firstTemplate.name;
                return;
              }
            }
          }
          this.currentTemplate = null;
        }
  
        // Computed properties for template conditions
        get showRecs() {
          return this.currentTemplate === 'Recs';
        }
        get showComparison() {
          return this.currentTemplate === 'Comparison';
        }
        get showProductDetails() {
          return this.currentTemplate === 'ProductDetails';
        }
        get showJsonViewer() {
          return this.currentTemplate === 'JsonViewer';
        }
        get showPlaceholder() {
          return !this.contentZoneContent || !this.currentTemplate;
        }
        get contentJson() {
          return this.contentZoneContent ? JSON.stringify(this.contentZoneContent) : '{}';
        }
        /*LWC compiler v8.28.2*/
      }
      registerDecorators(ContentZone, {
        publicProps: {
          show: {
            config: 0
          }
        },
        track: {
          contentZoneContent: 1,
          currentTemplate: 1
        },
        fields: ["_handleContentReceived", "_handleListEntries"]
      });
      const __lwc_component_class_internal$1 = registerComponent(ContentZone, {
        tmpl: _tmpl$1,
        sel: "c-content-zone",
        apiVersion: 66
      });
  
      const stc0 = {
        classMap: {
          "app": true
        },
        key: 0
      };
      const stc1 = {
        classMap: {
          "conversation-container": true
        },
        key: 5
      };
      function tmpl($api, $cmp, $slotset, $ctx) {
        const {b: api_bind, c: api_custom_element, ncls: api_normalize_class_name, h: api_element, fr: api_fragment} = $api;
        const {_m0, _m1} = $ctx;
        return [api_element("div", stc0, [$cmp.isReady ? api_fragment(1, [api_custom_element("c-search-bar", __lwc_component_class_internal$b, {
          props: {
            "show": $cmp.showSearchBar
          },
          key: 2,
          on: _m0 || ($ctx._m0 = {
            "initialmessage": api_bind($cmp.handleInitialMessage),
            "togglemaximize": api_bind($cmp.handleToggleMaximize)
          })
        }), api_element("div", {
          className: api_normalize_class_name($cmp.conversationWrapperClass),
          key: 3
        }, [api_custom_element("c-header", __lwc_component_class_internal$a, {
          props: {
            "show": $cmp.showChatBot
          },
          key: 4,
          on: _m1 || ($ctx._m1 = {
            "toggleminimize": api_bind($cmp.handleToggleMinimize),
            "closeconversation": api_bind($cmp.handleCloseConversationUI)
          })
        }), api_element("div", stc1, [api_custom_element("c-chat-bot", __lwc_component_class_internal$9, {
          props: {
            "show": $cmp.showChatBot
          },
          key: 6
        }), api_custom_element("c-content-zone", __lwc_component_class_internal$1, {
          props: {
            "show": $cmp.showChatBot
          },
          key: 7
        })])])], 0) : null])];
        /*LWC compiler v8.28.2*/
      }
      var _tmpl = registerTemplate(tmpl);
      tmpl.stylesheets = [];
      tmpl.stylesheetToken = "lwc-2rjvebuuto3";
      tmpl.legacyStylesheetToken = "c-app_app";
      if (_implicitStylesheets$b) {
        tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets$b);
      }
      freezeTemplate(tmpl);
  
      class App extends LightningElement {
        constructor(...args) {
          super(...args);
          this.conversationMessages = [];
          this.showChatBot = false;
          this.isReady = false;
          // Bound event handlers (for proper removal)
          this._handleMessageReceived = void 0;
          this._handleListConversationEntries = void 0;
          this._handleConversationReady = void 0;
          this._handleConversationOpened = void 0;
          this._handleConversationClosed = void 0;
          this._handleMinimize = void 0;
          this._handleMaximize = void 0;
        }
        connectedCallback() {
          console.log('[LWC App] connectedCallback called');
          console.log('[LWC App] window.AdaptiveWebsite exists:', !!window.AdaptiveWebsite);
          console.log('[LWC App] window.AdaptiveWebsite.Events:', window.AdaptiveWebsite?.Events);
  
          // Create bound handlers
          this._handleMessageReceived = this.handleMessageReceived.bind(this);
          this._handleListConversationEntries = this.handleListConversationEntries.bind(this);
          this._handleConversationReady = this.handleConversationReady.bind(this);
          this._handleConversationOpened = this.handleConversationOpened.bind(this);
          this._handleConversationClosed = this.handleConversationClosed.bind(this);
          this._handleMinimize = this.handleMinimize.bind(this);
          this._handleMaximize = this.handleMaximize.bind(this);
  
          // Register DOM event listeners
          window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGE_SENT, this._handleMessageReceived);
          window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_LIST_CONVERSATION_ENTRIES, this._handleListConversationEntries);
          window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_CONVERSATION_READY, this._handleConversationReady);
          window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_CONVERSATION_OPENED, this._handleConversationOpened);
          window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_CONVERSATION_CLOSED, this._handleConversationClosed);
          window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_WINDOW_MINIMIZED, this._handleMinimize);
          window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_WINDOW_MAXIMIZED, this._handleMaximize);
          console.log('[LWC App] Event listeners registered');
  
          // Check if controller is already ready (event may have fired before we registered)
          // If AdaptiveWebsite exists and is initialized, we're ready
          if (window.AdaptiveWebsite && !this.isReady) {
            console.log('[LWC App] Controller already initialized, calling handleConversationReady directly');
            this.handleConversationReady();
          }
        }
        disconnectedCallback() {
          // Unregister DOM event listeners
          window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGE_SENT, this._handleMessageReceived);
          window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_LIST_CONVERSATION_ENTRIES, this._handleListConversationEntries);
          window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_CONVERSATION_READY, this._handleConversationReady);
          window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_CONVERSATION_OPENED, this._handleConversationOpened);
          window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_CONVERSATION_CLOSED, this._handleConversationClosed);
          window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_WINDOW_MINIMIZED, this._handleMinimize);
          window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_WINDOW_MAXIMIZED, this._handleMaximize);
        }
        handleMinimize() {
          this.showChatBot = false;
        }
        handleMaximize() {
          this.showChatBot = true;
        }
  
        // Pure UI toggle handlers (from child component events)
        handleToggleMinimize() {
          console.log('[LWC App] handleToggleMinimize called, setting showChatBot to false');
          this.showChatBot = false;
        }
        handleToggleMaximize() {
          console.log('[LWC App] handleToggleMaximize called, setting showChatBot to true');
          this.showChatBot = true;
        }
        handleCloseConversationUI() {
          console.log('[LWC App] handleCloseConversationUI called, resetting to SearchBar');
          this.showChatBot = false;
          this.conversationMessages = [];
        }
        handleConversationOpened() {
          this.showChatBot = true;
        }
        handleConversationReady() {
          console.log('[LWC App] handleConversationReady called');
          this.isReady = true;
          console.log('[LWC App] isReady set to:', this.isReady);
          if (window.AdaptiveWebsite.sessionExists()) {
            console.log('[LWC App] Session exists, initializing conversation');
            window.AdaptiveWebsite.initializeConversation(this.getPreChatData()).catch(error => {
              console.error('Failed to initialize conversation:', error);
            });
          } else {
            console.log('[LWC App] No existing session');
          }
        }
        handleConversationClosed() {
          // When conversation is closed, revert to SearchBar view (don't hide the app)
          this.showChatBot = false;
          this.conversationMessages = [];
        }
        handleMessageReceived(event) {
          const entry = window.AdaptiveWebsite.util.parseEntryPayload(event.detail.conversationEntry);
          this.conversationMessages = [...this.conversationMessages, entry];
          this.updateShowChatBot();
        }
        handleListConversationEntries(event) {
          const conversationMessages = event.detail.entries.filter(window.AdaptiveWebsite.util.isConversationEntryStaticContentMessage);
          if (conversationMessages.length > 0) {
            this.conversationMessages = conversationMessages;
            this.updateShowChatBot();
          }
        }
        updateShowChatBot() {
          this.showChatBot = this.conversationMessages.length > 0;
        }
        handleInitialMessage(event) {
          const textToSend = event.detail.text;
          window.AdaptiveWebsite.initializeConversation(this.getPreChatData()).then(() => {
            window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGE_SENT, () => {
              window.AdaptiveWebsite.sendTextMessage(textToSend);
            }, {
              once: true
            });
          }).catch(error => {
            console.error('Failed to initialize conversation:', error);
          });
        }
        getPreChatData() {
          const anonymousId = window.getSalesforceInteractions?.()?.getAnonymousId?.();
          const preChatData = {};
          if (anonymousId && typeof anonymousId === 'string') {
            preChatData['Individual_Id'] = anonymousId;
          }
          return preChatData;
        }
  
        // Computed properties for template
        get showSearchBar() {
          return !this.showChatBot;
        }
        get conversationWrapperClass() {
          return this.showChatBot ? 'conversation-wrapper' : 'conversation-wrapper conversation-wrapper-hidden';
        }
        /*LWC compiler v8.28.2*/
      }
      registerDecorators(App, {
        track: {
          conversationMessages: 1,
          showChatBot: 1,
          isReady: 1
        },
        fields: ["_handleMessageReceived", "_handleListConversationEntries", "_handleConversationReady", "_handleConversationOpened", "_handleConversationClosed", "_handleMinimize", "_handleMaximize"]
      });
      const __lwc_component_class_internal = registerComponent(App, {
        tmpl: _tmpl,
        sel: "c-app",
        apiVersion: 66
      });
  
      console.log('[LWC App] index.js executing');
  
      // Create a container div with proper isolation
      const root = document.createElement('div');
      root.id = 'web-curation-overlay-root';
      console.log('[LWC App] Created root container');
  
      // Create the LWC app element
      const app = createElement('c-app', {
        is: __lwc_component_class_internal
      });
      console.log('[LWC App] Created c-app element');
      root.appendChild(app);
      console.log('[LWC App] Appended c-app to root');
  
      // Function to safely append to body when it's available
      function appendToBody() {
        if (document.body) {
          document.body.appendChild(root);
          console.log('[LWC App] Appended root to document.body');
          return true;
        }
        console.log('[LWC App] document.body not available yet');
        return false;
      }
  
      // Try to append immediately if body is already available
      if (!appendToBody()) {
        console.log('[LWC App] Using MutationObserver to wait for body');
        // Use mutation observer to watch for body creation
        const observer = new MutationObserver((mutations, obs) => {
          if (document.body) {
            obs.disconnect();
            appendToBody();
          }
        });
  
        // Start observing
        observer.observe(document.documentElement, {
          childList: true,
          subtree: true
        });
      } else {
        console.log('[LWC App] Root appended immediately');
      }
  
  })();
  
  }
  
  // Export functions to window for global access
  window.addControllerToPage = addControllerToPage;
  window.addAppToPage = addAppToPage;
  

try{ 

    window.addEventListener("onEmbeddedMessagingConversationStarted", (event) => {
        SalesforceInteractions.sendEvent({
            interaction: { 
                name: 'conversation-started', 
                eventType: 'agentEngagement', 
                conversationId: event.detail.conversationId 
            },
            user: {
                attributes: {
                    eventType: "identity",
                    isAnonymous: "1" // TODO: Check if the user is anonymous
                }
            }
        });   
    }); 

  window.addControllerToPage()
  window.addAppToPage()
  window.AdaptiveWebsite.initialize({
    organizationId: "00DHu00000sTjID",
    messagingUrl: "https://storm-d759b260ae0825.my.salesforce-scrt.com",
    deploymentDeveloperName: "adaptive_web_agent_custom"
  })
} catch (e) {
  console.error("[Salesforce Personalization] Error initializing AgentScript:", e);
}