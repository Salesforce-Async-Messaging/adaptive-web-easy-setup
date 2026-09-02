window.SalesforceInteractions.log.setLoggingLevel('debug')
/* DATA CLOUD WEB SDK SITEMAP */
SalesforceInteractions.init({
    consents: [{
        provider: 'Test Provider',
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
          parseJsonInAgentResponse
        }
      };
    }
  })();
  
  }
  
  function addAppToPage() {
    // Contents of build file (app/dist/app.js)
  (function() {
    "use strict";
    try {
      if (typeof document != "undefined") {
        var elementStyle = document.createElement("style");
        elementStyle.appendChild(document.createTextNode(`.app {
    position: fixed !important;
    bottom: 0px !important;
    width: 100% !important;
    z-index: 2147483647 !important;
    font-family: "Source Sans Pro", sans-serif !important;
    display: flex;
    flex-direction: column;
    background: white;
  }
  
  .conversation-container {
    display: flex;
    flex-direction: row;
  }
  ._chatbotContainer_ixb5p_1 {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 143px);
    width: 26vw;
    min-width: 200px;
    border-top: 2px solid rgba(224, 224, 224, 0.8);
    border-right: 2px solid rgba(224, 224, 224, 0.8);
    background: rgba(255, 255, 255);
    max-height: none;
    backdrop-filter: blur(10px);
    pointer-events: auto;
    animation: _dropDown_ixb5p_1 0.5s ease-out forwards;
  }
  
  @keyframes _dropDown_ixb5p_1 {
    from {
      transform: translateY(-100vh);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  ._messagesContainer_ixb5p_27 {
    flex: 1;
    padding: 16px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  ._message_ixb5p_27 {
    display: flex;
    align-items: center;
    gap: 12px;
    max-width: 80%;
  }
  
  ._messageUser_ixb5p_43 {
    align-self: flex-end;
    flex-direction: row-reverse;
  }
  
  ._messageBot_ixb5p_48 {
    align-self: flex-start;
  }
  
  ._agentLogo_ixb5p_52 {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-self: center;
    border-radius: 50%;
  }
  
  ._messageWrapper_ixb5p_62 {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 1rem;
  }
  
  ._messageContent_ixb5p_70 {
    background: #f1f3f4;
    padding: 12px 16px;
    position: relative;
    width: fit-content;
    color: var(--Text-text-default, #1C1C1C);
  }
  
  ._messageUser_ixb5p_43 ._messageContent_ixb5p_70 {
    background: #EEF4FF;
    align-self: flex-end;
    border-radius: 15px 15px 0px 15px;
  }
  
  ._messageBot_ixb5p_48 ._messageContent_ixb5p_70 {
    background: #F3F3F3;
    align-self: flex-start;
    border-radius: 15px 15px 15px 0px;
  }
  
  ._messageText_ixb5p_90 {
    line-height: 1.4;
    word-wrap: break-word;
    max-width: 285px;
  }
  
  ._messageTimestamp_ixb5p_96 {
    font-size: 11px;
    opacity: 0.6;
    color: var(--Text-Weak, #444);
    margin-left: 12px;
    align-self: flex-start;
  }
  
  ._messageUser_ixb5p_43 ._messageTimestamp_ixb5p_96 {
    align-self: flex-end;
    margin-left: 0;
    margin-right: 12px;
  }
  
  ._messageInputForm_ixb5p_110 {
    border-top: 1px solid #e0e0e0;
    padding: 16px 20px 16px 16px;
    background: #393939;
  }
  
  ._messageInputContainer_ixb5p_116 {
    display: flex;
    flex-direction: column;
    gap: 8px;
    border-bottom: 3px solid #006EBE;
  }
  
  ._inputRow_ixb5p_123 {
    display: flex;
    align-items: flex-end;
    gap: 8px;
  }
  
  ._textareaContainer_ixb5p_129 {
    position: relative;
    flex: 1;
    display: flex;
    align-items: flex-end;
  }
  
  ._messageInput_ixb5p_110 {
    flex: 1;
    padding: 12px 50px 12px 16px;
    border: 1px solid #ddd;
    resize: none;
    font-size: 14px;
    line-height: 1.4;
    min-height: 20px;
    max-height: 120px;
    overflow-y: auto;
    font-family: "Source Sans Pro", sans-serif;
  }
  
  ._messageInput_ixb5p_110:focus {
    outline: none;
    border-color: #EEF4FF;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.1);
  }
  
  ._messageChoices_ixb5p_155 {
    display: flex;
    width: 280px;
    flex-direction: column;
    align-items: flex-end;
    border-radius: 4px;
    border: 1px solid #949494;
    margin-top: 8px; /* Keep small margin from message box */
    overflow: hidden; /* Ensure child elements don't overflow rounded corners */
  }
  
  ._choiceButton_ixb5p_166 {
    padding: 12px 16px;
    border: none; /* Remove individual borders since container has border */
    background: white;
    color: #333333;
    border-radius: 0; /* Remove default border radius */
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s ease;
    text-align: left;
    min-height: 44px;
    display: flex;
    align-items: center;
    width: 100%; /* Fill container width */
    border-bottom: 1px solid #949494; /* Add border between buttons using container color */
  }
  
  ._choiceButton_ixb5p_166:hover {
    background: #EEF4FF;
    box-shadow: 0 2px 4px rgba(0, 123, 255, 0.2);
  }
  
  ._choiceButton_ixb5p_166:active {
    box-shadow: 0 1px 2px rgba(0, 123, 255, 0.2);
  }
  
  ._choiceButton_ixb5p_166._selected_ixb5p_192 {
    background: #EEF4FF;
    box-shadow: 0 2px 4px rgba(0, 123, 255, 0.2);
    cursor: not-allowed;
    opacity: 0.8;
  }
  
  ._choiceButton_ixb5p_166._selected_ixb5p_192:hover {
    background: #EEF4FF; /* Keep same background on hover */
    box-shadow: 0 2px 4px rgba(0, 123, 255, 0.2); /* Keep same shadow */
  }
  
  ._typingIndicator_ixb5p_204 {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 0;
  }
  
  ._typingIndicator_ixb5p_204 span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #999;
    animation: _typing_ixb5p_204 1.4s infinite ease-in-out;
  }
  
  ._typingIndicator_ixb5p_204 span:nth-child(1) {
    animation-delay: -0.32s;
  }
  
  ._typingIndicator_ixb5p_204 span:nth-child(2) {
    animation-delay: -0.16s;
  }
  
  ._typingIndicator_ixb5p_204 span:nth-child(3) {
    animation-delay: 0;
  }
  
  @keyframes _typing_ixb5p_204 {
    0%, 80%, 100% {
      transform: scale(0.8);
      opacity: 0.5;
    }
    40% {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  ._contentZoneContainer_1hs9j_1 {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 143px);
    width: calc(74vw);
    min-width: 200px;
    border: 2px solid rgba(224, 224, 224, 0.8);
    background: #FFFFFF;
    backdrop-filter: blur(10px);
    pointer-events: auto;
    animation: _dropDown_1hs9j_1 0.5s ease-out forwards;
  }
  
  @keyframes _dropDown_1hs9j_1 {
    from {
      transform: translateY(-100vh);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  ._contentZoneContent_1hs9j_25 {
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow: scroll;
  }
  
  ._blankContent_1hs9j_34 {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    color: #666;
  }
  
  ._typingIndicator_1hs9j_44 {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 0;
  }
  
  ._typingIndicator_1hs9j_44 span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #999;
    animation: _typing_1hs9j_44 1.4s infinite ease-in-out;
  }
  
  ._typingIndicator_1hs9j_44 span:nth-child(1) {
    animation-delay: -0.32s;
  }
  
  ._typingIndicator_1hs9j_44 span:nth-child(2) {
    animation-delay: -0.16s;
  }
  
  ._typingIndicator_1hs9j_44 span:nth-child(3) {
    animation-delay: 0;
  }
  
  @keyframes _typing_1hs9j_44 {
    0%, 80%, 100% {
      transform: scale(0.8);
      opacity: 0.5;
    }
    40% {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  ._headerContainer_1983q_1 {
    display: flex;
    align-items: center;
    position: relative;
    width: 100vw;
    height: 70px;
    padding: 0 30px;
    background-color: #393939;
  }
  
  ._agentName_1983q_11 {
    color: white;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    text-transform: uppercase;
  }
  
  ._endConversationButton_1983q_19 {
    position: absolute;
    right: 80px;
    top: 50%;
    transform: translateY(-50%);
    background: #097fb3;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
    border-radius: 4px;
    font-size: 14px;
    color: white;
    transition: all 0.2s ease;
  }
  
  ._endConversationButton_1983q_19:hover {
    background-color: #076a94;
  }
  
  ._minimizeButton_1983q_38 {
    position: absolute;
    right: 32px;
    top: 50%;
    color: white;
    cursor: pointer;
    transform: translateY(-50%);
    border: none;
    display: flex;
  }
  ._searchContainer_lpcxl_1 {
    display: flex;
    width: 100vw;
    height: 80px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    background: #393939;
    position: relative;
  }
  
  ._searchForm_lpcxl_12 {
    display: flex;
    align-items: center;
    grid-column: 2;
    width: 94%;
    height: 45px;
    flex-shrink: 0;
  }
  
  ._searchBar_lpcxl_21 {
    display: flex;
    background: #FFFFFF;
    height: 50px;
    width: 94vw;
    border-bottom: 3px solid #006EBE;
  }
  
  ._searchBar_lpcxl_21:focus-within {
    border-color: #006EBE;
    box-shadow: 0 4px 12px rgba(66, 133, 244, 0.2);
  }
  
  ._searchInput_lpcxl_34 {
    flex: 1;
    border: none;
    outline: none;
    font-size: 16px;
    padding: 12px 16px;
    background: transparent;
    color: #333;
  }
  
  ._searchInput_lpcxl_34::placeholder {
    color: #333;
    font-size: 16px;
    overflow: hidden;
  }
  
  ._searchActions_lpcxl_50 {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0px 12px;
  }
  
  ._searchActionButton_lpcxl_57 {
    background: #097fb3;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
    border-radius: 4px;
    font-size: 14px;
    color: white;
    transition: all 0.2s ease;
    white-space: nowrap;
  }
  
  ._searchActionButton_lpcxl_57:hover {
    background-color: #076a94;
  }
  
  ._searchIcon_lpcxl_73 {
    width: 1.5rem;
    height: 1.5rem;
    aspect-ratio: 1/1;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto 0 auto 12px;
    flex-shrink: 0;
  }
  
  ._searchIcon_lpcxl_73 img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  ._expandButton_lpcxl_90 {
    width: 22px;
    height: 22px;
    flex-shrink: 0;
    aspect-ratio: 1/1;
    position: absolute;
    right: 1vw;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
  
  ._recsTemplate_153zu_1 {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 24px;
    font-family: "Source Sans Pro", sans-serif;
  }
  
  ._recsBanner_153zu_9 {
    width: 100%;
    height: 250px;
    overflow: hidden;
  }
  
  ._recsBanner_153zu_9 img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  ._recsProductsGrid_153zu_21 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    width: 100%;
  }
  
  ._compareButtonContainer_153zu_28 {
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  ._compareButton_153zu_28 {
    background-color: #097fb3;
    color: white;
    padding: 12px 24px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.2s ease;
    border: none;
  }
  
  ._compareButton_153zu_28:hover {
    background-color: #076a94;
  }
  
  ._compareButton_153zu_28:active {
    background-color: #055a7a;
  }._productLink_1oysg_1 {
    text-decoration: none;
    color: inherit;
    display: block;
  }
  
  ._productCard_1oysg_7 {
    position: relative;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0;
    transition: box-shadow 0.2s ease;
  }
  
  ._productCard_1oysg_7:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  ._productFavorite_1oysg_22 {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 2;
    border-radius: 50%;
    transition: background-color 0.2s ease;
  }
  
  ._productFavorite_1oysg_22:hover {
    background: rgba(255, 255, 255, 1);
  }
  
  ._productFavorite_1oysg_22 svg {
    width: 18px;
    height: 18px;
    stroke: #097fb3;
    fill: none;
    stroke-width: 1.5;
  }
  
  ._productFavorite_1oysg_22:hover svg {
    fill: #076a94;
    stroke: #076a94;
  }
  
  ._productImageContainer_1oysg_54 {
    width: 100%;
    height: 280px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    overflow: hidden;
    position: relative;
  }
  
  ._productImageContainer_1oysg_54 img {
    width: auto;
    height: 100%;
    padding: 8px;
  }
  
  ._productName_1oysg_71 {
    font-size: 13px;
    font-weight: 400;
    color: #333;
    line-height: 1.4;
    padding: 0 12px;
    min-height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  ._productPrice_1oysg_83 {
    font-size: 15px;
    font-weight: 500;
    color: #333;
    margin-bottom: 8px;
    letter-spacing: 0.3px;
  }
  
  ._productCompare_1oysg_91 {
    display: flex;
    align-items: center;
    gap: 6px;
    margin: 12px 0px;
  }
  
  ._productCompare_1oysg_91 input[type="checkbox"] {
    width: 14px;
    height: 14px;
    cursor: pointer;
    accent-color: #333;
    margin: 0;
    flex-shrink: 0;
  }
  
  ._productCompare_1oysg_91 input[type="checkbox"]:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  
  ._productCompare_1oysg_91 label {
    font-size: 13px;
    color: #333;
    cursor: pointer;
    user-select: none;
    font-weight: 400;
    line-height: 1;
  }
  
  ._productRating_12zy1_1 {
    display: flex;
    gap: 1px;
    line-height: 1;
    align-items: center;
  }
  
  ._small_12zy1_8 {
    font-size: 14px;
    height: 16px;
  }
  
  ._large_12zy1_13 {
    font-size: 16px;
    height: 20px;
  }
  
  ._star_12zy1_18 {
    display: inline-block;
    color: #097fb3;
    line-height: 1;
  }
  
  ._small_12zy1_8 ._star_12zy1_18 {
    font-size: 14px;
  }
  
  ._large_12zy1_13 ._star_12zy1_18 {
    font-size: 16px;
  }
  
  ._starFull_12zy1_32 {
    color: #097fb3;
  }
  
  ._starHalf_12zy1_36 {
    position: relative;
    display: inline-block;
    overflow: hidden;
  }
  
  ._small_12zy1_8 ._starHalf_12zy1_36 {
    width: 14px;
    height: 14px;
  }
  
  ._large_12zy1_13 ._starHalf_12zy1_36 {
    width: 16px;
    height: 16px;
  }
  
  ._starHalfFilled_12zy1_52 {
    position: absolute;
    left: 0;
    top: 0;
    width: 50%;
    overflow: hidden;
    color: #097fb3;
    line-height: 1;
  }
  
  ._small_12zy1_8 ._starHalfFilled_12zy1_52 {
    font-size: 14px;
  }
  
  ._large_12zy1_13 ._starHalfFilled_12zy1_52 {
    font-size: 16px;
  }
  
  ._starHalfEmpty_12zy1_70 {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    color: #e0e0e0;
    line-height: 1;
    z-index: -1;
  }
  
  ._small_12zy1_8 ._starHalfEmpty_12zy1_70 {
    font-size: 14px;
  }
  
  ._large_12zy1_13 ._starHalfEmpty_12zy1_70 {
    font-size: 16px;
  }
  
  ._starEmpty_12zy1_88 {
    color: #e0e0e0;
  }
  
  ._comparisonTemplate_1nvy2_1 {
    display: flex;
    flex-direction: column;
    width: 100%;
    font-family: "Source Sans Pro", sans-serif;
  }
  
  ._comparisonGrid_1nvy2_8 {
    display: grid;
    gap: 16px;
    width: 100%;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
  
  ._comparisonColumn_1nvy2_15 {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  ._featuresSection_1nvy2_21 {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 8px;
  }
  
  ._featureRow_1nvy2_28 {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 12px;
    background: #f8f8f8;
    border-radius: 4px;
  }
  
  ._featureName_1nvy2_37 {
    font-size: 12px;
    font-weight: 600;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 4px;
  }
  
  ._featureValue_1nvy2_46 {
    font-size: 14px;
    font-weight: 400;
    color: #333;
    line-height: 1.4;
  }
  
  ._productDetailsTemplate_19kxk_1 {
    display: flex;
    flex-direction: column;
    width: 100%;
    font-family: "Source Sans Pro", sans-serif;
    padding: 24px;
  }
  
  ._productDetailsContainer_19kxk_9 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  ._productImageSection_19kxk_17 {
    display: flex;
    flex-direction: column;
  }
  
  ._productImageContainer_19kxk_22 {
    width: 100%;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 4px;
  }
  
  ._productImageContainer_19kxk_22 img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
  
  ._productInfoSection_19kxk_38 {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  ._itemNumber_19kxk_44 {
    font-size: 12px;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  ._productName_19kxk_51 {
    font-size: 28px;
    font-weight: 600;
    color: #333;
    margin: 0;
    line-height: 1.3;
  }
  
  ._productPrice_19kxk_59 {
    font-size: 24px;
    font-weight: 600;
    color: #333;
    margin: 8px 0;
  }
  
  ._actionButtons_19kxk_66 {
    display: flex;
    gap: 12px;
    margin: 24px 0;
    align-items: center;
  }
  
  ._addToCartButton_19kxk_73 {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 14px 24px;
    background-color: #097fb3;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  
  ._addToCartButton_19kxk_73:hover {
    background-color: #076a94;
  }
  
  ._addToCartButton_19kxk_73:active {
    background-color: #055a7a;
  }
  
  ._addToCartButton_19kxk_73 svg {
    width: 16px;
    height: 16px;
  }
  
  ._favoriteButton_19kxk_103 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background-color: white;
    border: 2px solid #097fb3;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
    padding: 0;
  }
  
  ._favoriteButton_19kxk_103:hover {
    background-color: #f5f5f5;
    border-color: #076a94;
  }
  
  ._favoriteButton_19kxk_103 svg {
    width: 20px;
    height: 20px;
    stroke: #097fb3;
    fill: none;
    stroke-width: 2;
  }
  
  ._favoriteButton_19kxk_103:hover svg {
    stroke: #076a94;
  }
  
  ._featuresSection_19kxk_134 {
    margin-top: 32px;
    padding-top: 32px;
    border-top: 1px solid #e0e0e0;
  }
  
  ._featuresTitle_19kxk_140 {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin: 0 0 16px 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  ._featuresList_19kxk_149 {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  ._featureItem_19kxk_158 {
    display: flex;
    gap: 8px;
    font-size: 14px;
    line-height: 1.5;
  }
  
  ._featureName_19kxk_165 {
    font-weight: 600;
    color: #666;
  }
  
  ._featureValue_19kxk_170 {
    color: #333;
  }
  
  /* Responsive design */
  @media (max-width: 900px) {
    ._productDetailsContainer_19kxk_9 {
      grid-template-columns: 1fr;
      gap: 32px;
    }
  
    ._productDetailsTemplate_19kxk_1 {
      padding: 16px;
    }
  }`));
        document.head.appendChild(elementStyle);
      }
    } catch (e) {
      console.error("vite-plugin-css-injected-by-js", e);
    }
  })();
  function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
  }
  var jsxRuntime = { exports: {} };
  var reactJsxRuntime_production = {};
  /**
   * @license React
   * react-jsx-runtime.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var hasRequiredReactJsxRuntime_production;
  function requireReactJsxRuntime_production() {
    if (hasRequiredReactJsxRuntime_production) return reactJsxRuntime_production;
    hasRequiredReactJsxRuntime_production = 1;
    var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
    function jsxProd(type, config2, maybeKey) {
      var key = null;
      void 0 !== maybeKey && (key = "" + maybeKey);
      void 0 !== config2.key && (key = "" + config2.key);
      if ("key" in config2) {
        maybeKey = {};
        for (var propName in config2)
          "key" !== propName && (maybeKey[propName] = config2[propName]);
      } else maybeKey = config2;
      config2 = maybeKey.ref;
      return {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        ref: void 0 !== config2 ? config2 : null,
        props: maybeKey
      };
    }
    reactJsxRuntime_production.Fragment = REACT_FRAGMENT_TYPE;
    reactJsxRuntime_production.jsx = jsxProd;
    reactJsxRuntime_production.jsxs = jsxProd;
    return reactJsxRuntime_production;
  }
  var hasRequiredJsxRuntime;
  function requireJsxRuntime() {
    if (hasRequiredJsxRuntime) return jsxRuntime.exports;
    hasRequiredJsxRuntime = 1;
    {
      jsxRuntime.exports = requireReactJsxRuntime_production();
    }
    return jsxRuntime.exports;
  }
  var jsxRuntimeExports = requireJsxRuntime();
  var client = { exports: {} };
  var reactDomClient_production = {};
  var scheduler = { exports: {} };
  var scheduler_production = {};
  /**
   * @license React
   * scheduler.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var hasRequiredScheduler_production;
  function requireScheduler_production() {
    if (hasRequiredScheduler_production) return scheduler_production;
    hasRequiredScheduler_production = 1;
    (function(exports$1) {
      function push(heap, node) {
        var index = heap.length;
        heap.push(node);
        a: for (; 0 < index; ) {
          var parentIndex = index - 1 >>> 1, parent = heap[parentIndex];
          if (0 < compare(parent, node))
            heap[parentIndex] = node, heap[index] = parent, index = parentIndex;
          else break a;
        }
      }
      function peek(heap) {
        return 0 === heap.length ? null : heap[0];
      }
      function pop(heap) {
        if (0 === heap.length) return null;
        var first = heap[0], last = heap.pop();
        if (last !== first) {
          heap[0] = last;
          a: for (var index = 0, length = heap.length, halfLength = length >>> 1; index < halfLength; ) {
            var leftIndex = 2 * (index + 1) - 1, left = heap[leftIndex], rightIndex = leftIndex + 1, right = heap[rightIndex];
            if (0 > compare(left, last))
              rightIndex < length && 0 > compare(right, left) ? (heap[index] = right, heap[rightIndex] = last, index = rightIndex) : (heap[index] = left, heap[leftIndex] = last, index = leftIndex);
            else if (rightIndex < length && 0 > compare(right, last))
              heap[index] = right, heap[rightIndex] = last, index = rightIndex;
            else break a;
          }
        }
        return first;
      }
      function compare(a, b) {
        var diff = a.sortIndex - b.sortIndex;
        return 0 !== diff ? diff : a.id - b.id;
      }
      exports$1.unstable_now = void 0;
      if ("object" === typeof performance && "function" === typeof performance.now) {
        var localPerformance = performance;
        exports$1.unstable_now = function() {
          return localPerformance.now();
        };
      } else {
        var localDate = Date, initialTime = localDate.now();
        exports$1.unstable_now = function() {
          return localDate.now() - initialTime;
        };
      }
      var taskQueue = [], timerQueue = [], taskIdCounter = 1, currentTask = null, currentPriorityLevel = 3, isPerformingWork = false, isHostCallbackScheduled = false, isHostTimeoutScheduled = false, needsPaint = false, localSetTimeout = "function" === typeof setTimeout ? setTimeout : null, localClearTimeout = "function" === typeof clearTimeout ? clearTimeout : null, localSetImmediate = "undefined" !== typeof setImmediate ? setImmediate : null;
      function advanceTimers(currentTime) {
        for (var timer = peek(timerQueue); null !== timer; ) {
          if (null === timer.callback) pop(timerQueue);
          else if (timer.startTime <= currentTime)
            pop(timerQueue), timer.sortIndex = timer.expirationTime, push(taskQueue, timer);
          else break;
          timer = peek(timerQueue);
        }
      }
      function handleTimeout(currentTime) {
        isHostTimeoutScheduled = false;
        advanceTimers(currentTime);
        if (!isHostCallbackScheduled)
          if (null !== peek(taskQueue))
            isHostCallbackScheduled = true, isMessageLoopRunning || (isMessageLoopRunning = true, schedulePerformWorkUntilDeadline());
          else {
            var firstTimer = peek(timerQueue);
            null !== firstTimer && requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
          }
      }
      var isMessageLoopRunning = false, taskTimeoutID = -1, frameInterval = 5, startTime = -1;
      function shouldYieldToHost() {
        return needsPaint ? true : exports$1.unstable_now() - startTime < frameInterval ? false : true;
      }
      function performWorkUntilDeadline() {
        needsPaint = false;
        if (isMessageLoopRunning) {
          var currentTime = exports$1.unstable_now();
          startTime = currentTime;
          var hasMoreWork = true;
          try {
            a: {
              isHostCallbackScheduled = false;
              isHostTimeoutScheduled && (isHostTimeoutScheduled = false, localClearTimeout(taskTimeoutID), taskTimeoutID = -1);
              isPerformingWork = true;
              var previousPriorityLevel = currentPriorityLevel;
              try {
                b: {
                  advanceTimers(currentTime);
                  for (currentTask = peek(taskQueue); null !== currentTask && !(currentTask.expirationTime > currentTime && shouldYieldToHost()); ) {
                    var callback = currentTask.callback;
                    if ("function" === typeof callback) {
                      currentTask.callback = null;
                      currentPriorityLevel = currentTask.priorityLevel;
                      var continuationCallback = callback(
                        currentTask.expirationTime <= currentTime
                      );
                      currentTime = exports$1.unstable_now();
                      if ("function" === typeof continuationCallback) {
                        currentTask.callback = continuationCallback;
                        advanceTimers(currentTime);
                        hasMoreWork = true;
                        break b;
                      }
                      currentTask === peek(taskQueue) && pop(taskQueue);
                      advanceTimers(currentTime);
                    } else pop(taskQueue);
                    currentTask = peek(taskQueue);
                  }
                  if (null !== currentTask) hasMoreWork = true;
                  else {
                    var firstTimer = peek(timerQueue);
                    null !== firstTimer && requestHostTimeout(
                      handleTimeout,
                      firstTimer.startTime - currentTime
                    );
                    hasMoreWork = false;
                  }
                }
                break a;
              } finally {
                currentTask = null, currentPriorityLevel = previousPriorityLevel, isPerformingWork = false;
              }
              hasMoreWork = void 0;
            }
          } finally {
            hasMoreWork ? schedulePerformWorkUntilDeadline() : isMessageLoopRunning = false;
          }
        }
      }
      var schedulePerformWorkUntilDeadline;
      if ("function" === typeof localSetImmediate)
        schedulePerformWorkUntilDeadline = function() {
          localSetImmediate(performWorkUntilDeadline);
        };
      else if ("undefined" !== typeof MessageChannel) {
        var channel = new MessageChannel(), port = channel.port2;
        channel.port1.onmessage = performWorkUntilDeadline;
        schedulePerformWorkUntilDeadline = function() {
          port.postMessage(null);
        };
      } else
        schedulePerformWorkUntilDeadline = function() {
          localSetTimeout(performWorkUntilDeadline, 0);
        };
      function requestHostTimeout(callback, ms) {
        taskTimeoutID = localSetTimeout(function() {
          callback(exports$1.unstable_now());
        }, ms);
      }
      exports$1.unstable_IdlePriority = 5;
      exports$1.unstable_ImmediatePriority = 1;
      exports$1.unstable_LowPriority = 4;
      exports$1.unstable_NormalPriority = 3;
      exports$1.unstable_Profiling = null;
      exports$1.unstable_UserBlockingPriority = 2;
      exports$1.unstable_cancelCallback = function(task) {
        task.callback = null;
      };
      exports$1.unstable_forceFrameRate = function(fps) {
        0 > fps || 125 < fps ? console.error(
          "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
        ) : frameInterval = 0 < fps ? Math.floor(1e3 / fps) : 5;
      };
      exports$1.unstable_getCurrentPriorityLevel = function() {
        return currentPriorityLevel;
      };
      exports$1.unstable_next = function(eventHandler) {
        switch (currentPriorityLevel) {
          case 1:
          case 2:
          case 3:
            var priorityLevel = 3;
            break;
          default:
            priorityLevel = currentPriorityLevel;
        }
        var previousPriorityLevel = currentPriorityLevel;
        currentPriorityLevel = priorityLevel;
        try {
          return eventHandler();
        } finally {
          currentPriorityLevel = previousPriorityLevel;
        }
      };
      exports$1.unstable_requestPaint = function() {
        needsPaint = true;
      };
      exports$1.unstable_runWithPriority = function(priorityLevel, eventHandler) {
        switch (priorityLevel) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            priorityLevel = 3;
        }
        var previousPriorityLevel = currentPriorityLevel;
        currentPriorityLevel = priorityLevel;
        try {
          return eventHandler();
        } finally {
          currentPriorityLevel = previousPriorityLevel;
        }
      };
      exports$1.unstable_scheduleCallback = function(priorityLevel, callback, options) {
        var currentTime = exports$1.unstable_now();
        "object" === typeof options && null !== options ? (options = options.delay, options = "number" === typeof options && 0 < options ? currentTime + options : currentTime) : options = currentTime;
        switch (priorityLevel) {
          case 1:
            var timeout = -1;
            break;
          case 2:
            timeout = 250;
            break;
          case 5:
            timeout = 1073741823;
            break;
          case 4:
            timeout = 1e4;
            break;
          default:
            timeout = 5e3;
        }
        timeout = options + timeout;
        priorityLevel = {
          id: taskIdCounter++,
          callback,
          priorityLevel,
          startTime: options,
          expirationTime: timeout,
          sortIndex: -1
        };
        options > currentTime ? (priorityLevel.sortIndex = options, push(timerQueue, priorityLevel), null === peek(taskQueue) && priorityLevel === peek(timerQueue) && (isHostTimeoutScheduled ? (localClearTimeout(taskTimeoutID), taskTimeoutID = -1) : isHostTimeoutScheduled = true, requestHostTimeout(handleTimeout, options - currentTime))) : (priorityLevel.sortIndex = timeout, push(taskQueue, priorityLevel), isHostCallbackScheduled || isPerformingWork || (isHostCallbackScheduled = true, isMessageLoopRunning || (isMessageLoopRunning = true, schedulePerformWorkUntilDeadline())));
        return priorityLevel;
      };
      exports$1.unstable_shouldYield = shouldYieldToHost;
      exports$1.unstable_wrapCallback = function(callback) {
        var parentPriorityLevel = currentPriorityLevel;
        return function() {
          var previousPriorityLevel = currentPriorityLevel;
          currentPriorityLevel = parentPriorityLevel;
          try {
            return callback.apply(this, arguments);
          } finally {
            currentPriorityLevel = previousPriorityLevel;
          }
        };
      };
    })(scheduler_production);
    return scheduler_production;
  }
  var hasRequiredScheduler;
  function requireScheduler() {
    if (hasRequiredScheduler) return scheduler.exports;
    hasRequiredScheduler = 1;
    {
      scheduler.exports = requireScheduler_production();
    }
    return scheduler.exports;
  }
  var react = { exports: {} };
  var react_production = {};
  /**
   * @license React
   * react.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var hasRequiredReact_production;
  function requireReact_production() {
    if (hasRequiredReact_production) return react_production;
    hasRequiredReact_production = 1;
    var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
    function getIteratorFn(maybeIterable) {
      if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
      maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
      return "function" === typeof maybeIterable ? maybeIterable : null;
    }
    var ReactNoopUpdateQueue = {
      isMounted: function() {
        return false;
      },
      enqueueForceUpdate: function() {
      },
      enqueueReplaceState: function() {
      },
      enqueueSetState: function() {
      }
    }, assign = Object.assign, emptyObject = {};
    function Component(props, context, updater) {
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;
    }
    Component.prototype.isReactComponent = {};
    Component.prototype.setState = function(partialState, callback) {
      if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, partialState, callback, "setState");
    };
    Component.prototype.forceUpdate = function(callback) {
      this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
    };
    function ComponentDummy() {
    }
    ComponentDummy.prototype = Component.prototype;
    function PureComponent(props, context, updater) {
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;
    }
    var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
    pureComponentPrototype.constructor = PureComponent;
    assign(pureComponentPrototype, Component.prototype);
    pureComponentPrototype.isPureReactComponent = true;
    var isArrayImpl = Array.isArray;
    function noop() {
    }
    var ReactSharedInternals = { H: null, A: null, T: null, S: null }, hasOwnProperty = Object.prototype.hasOwnProperty;
    function ReactElement(type, key, props) {
      var refProp = props.ref;
      return {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        ref: void 0 !== refProp ? refProp : null,
        props
      };
    }
    function cloneAndReplaceKey(oldElement, newKey) {
      return ReactElement(oldElement.type, newKey, oldElement.props);
    }
    function isValidElement(object) {
      return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    function escape(key) {
      var escaperLookup = { "=": "=0", ":": "=2" };
      return "$" + key.replace(/[=:]/g, function(match) {
        return escaperLookup[match];
      });
    }
    var userProvidedKeyEscapeRegex = /\/+/g;
    function getElementKey(element, index) {
      return "object" === typeof element && null !== element && null != element.key ? escape("" + element.key) : index.toString(36);
    }
    function resolveThenable(thenable) {
      switch (thenable.status) {
        case "fulfilled":
          return thenable.value;
        case "rejected":
          throw thenable.reason;
        default:
          switch ("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(
            function(fulfilledValue) {
              "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
            },
            function(error) {
              "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
            }
          )), thenable.status) {
            case "fulfilled":
              return thenable.value;
            case "rejected":
              throw thenable.reason;
          }
      }
      throw thenable;
    }
    function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
      var type = typeof children;
      if ("undefined" === type || "boolean" === type) children = null;
      var invokeCallback = false;
      if (null === children) invokeCallback = true;
      else
        switch (type) {
          case "bigint":
          case "string":
          case "number":
            invokeCallback = true;
            break;
          case "object":
            switch (children.$$typeof) {
              case REACT_ELEMENT_TYPE:
              case REACT_PORTAL_TYPE:
                invokeCallback = true;
                break;
              case REACT_LAZY_TYPE:
                return invokeCallback = children._init, mapIntoArray(
                  invokeCallback(children._payload),
                  array,
                  escapedPrefix,
                  nameSoFar,
                  callback
                );
            }
        }
      if (invokeCallback)
        return callback = callback(children), invokeCallback = "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar, isArrayImpl(callback) ? (escapedPrefix = "", null != invokeCallback && (escapedPrefix = invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
          return c;
        })) : null != callback && (isValidElement(callback) && (callback = cloneAndReplaceKey(
          callback,
          escapedPrefix + (null == callback.key || children && children.key === callback.key ? "" : ("" + callback.key).replace(
            userProvidedKeyEscapeRegex,
            "$&/"
          ) + "/") + invokeCallback
        )), array.push(callback)), 1;
      invokeCallback = 0;
      var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
      if (isArrayImpl(children))
        for (var i = 0; i < children.length; i++)
          nameSoFar = children[i], type = nextNamePrefix + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(
            nameSoFar,
            array,
            escapedPrefix,
            type,
            callback
          );
      else if (i = getIteratorFn(children), "function" === typeof i)
        for (children = i.call(children), i = 0; !(nameSoFar = children.next()).done; )
          nameSoFar = nameSoFar.value, type = nextNamePrefix + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(
            nameSoFar,
            array,
            escapedPrefix,
            type,
            callback
          );
      else if ("object" === type) {
        if ("function" === typeof children.then)
          return mapIntoArray(
            resolveThenable(children),
            array,
            escapedPrefix,
            nameSoFar,
            callback
          );
        array = String(children);
        throw Error(
          "Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead."
        );
      }
      return invokeCallback;
    }
    function mapChildren(children, func, context) {
      if (null == children) return children;
      var result = [], count = 0;
      mapIntoArray(children, result, "", "", function(child) {
        return func.call(context, child, count++);
      });
      return result;
    }
    function lazyInitializer(payload) {
      if (-1 === payload._status) {
        var ctor = payload._result;
        ctor = ctor();
        ctor.then(
          function(moduleObject) {
            if (0 === payload._status || -1 === payload._status)
              payload._status = 1, payload._result = moduleObject;
          },
          function(error) {
            if (0 === payload._status || -1 === payload._status)
              payload._status = 2, payload._result = error;
          }
        );
        -1 === payload._status && (payload._status = 0, payload._result = ctor);
      }
      if (1 === payload._status) return payload._result.default;
      throw payload._result;
    }
    var reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
      if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
        var event = new window.ErrorEvent("error", {
          bubbles: true,
          cancelable: true,
          message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
          error
        });
        if (!window.dispatchEvent(event)) return;
      } else if ("object" === typeof process && "function" === typeof process.emit) {
        process.emit("uncaughtException", error);
        return;
      }
      console.error(error);
    }, Children = {
      map: mapChildren,
      forEach: function(children, forEachFunc, forEachContext) {
        mapChildren(
          children,
          function() {
            forEachFunc.apply(this, arguments);
          },
          forEachContext
        );
      },
      count: function(children) {
        var n = 0;
        mapChildren(children, function() {
          n++;
        });
        return n;
      },
      toArray: function(children) {
        return mapChildren(children, function(child) {
          return child;
        }) || [];
      },
      only: function(children) {
        if (!isValidElement(children))
          throw Error(
            "React.Children.only expected to receive a single React element child."
          );
        return children;
      }
    };
    react_production.Activity = REACT_ACTIVITY_TYPE;
    react_production.Children = Children;
    react_production.Component = Component;
    react_production.Fragment = REACT_FRAGMENT_TYPE;
    react_production.Profiler = REACT_PROFILER_TYPE;
    react_production.PureComponent = PureComponent;
    react_production.StrictMode = REACT_STRICT_MODE_TYPE;
    react_production.Suspense = REACT_SUSPENSE_TYPE;
    react_production.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
    react_production.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function(size) {
        return ReactSharedInternals.H.useMemoCache(size);
      }
    };
    react_production.cache = function(fn) {
      return function() {
        return fn.apply(null, arguments);
      };
    };
    react_production.cacheSignal = function() {
      return null;
    };
    react_production.cloneElement = function(element, config2, children) {
      if (null === element || void 0 === element)
        throw Error(
          "The argument must be a React element, but you passed " + element + "."
        );
      var props = assign({}, element.props), key = element.key;
      if (null != config2)
        for (propName in void 0 !== config2.key && (key = "" + config2.key), config2)
          !hasOwnProperty.call(config2, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config2.ref || (props[propName] = config2[propName]);
      var propName = arguments.length - 2;
      if (1 === propName) props.children = children;
      else if (1 < propName) {
        for (var childArray = Array(propName), i = 0; i < propName; i++)
          childArray[i] = arguments[i + 2];
        props.children = childArray;
      }
      return ReactElement(element.type, key, props);
    };
    react_production.createContext = function(defaultValue) {
      defaultValue = {
        $$typeof: REACT_CONTEXT_TYPE,
        _currentValue: defaultValue,
        _currentValue2: defaultValue,
        _threadCount: 0,
        Provider: null,
        Consumer: null
      };
      defaultValue.Provider = defaultValue;
      defaultValue.Consumer = {
        $$typeof: REACT_CONSUMER_TYPE,
        _context: defaultValue
      };
      return defaultValue;
    };
    react_production.createElement = function(type, config2, children) {
      var propName, props = {}, key = null;
      if (null != config2)
        for (propName in void 0 !== config2.key && (key = "" + config2.key), config2)
          hasOwnProperty.call(config2, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (props[propName] = config2[propName]);
      var childrenLength = arguments.length - 2;
      if (1 === childrenLength) props.children = children;
      else if (1 < childrenLength) {
        for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++)
          childArray[i] = arguments[i + 2];
        props.children = childArray;
      }
      if (type && type.defaultProps)
        for (propName in childrenLength = type.defaultProps, childrenLength)
          void 0 === props[propName] && (props[propName] = childrenLength[propName]);
      return ReactElement(type, key, props);
    };
    react_production.createRef = function() {
      return { current: null };
    };
    react_production.forwardRef = function(render) {
      return { $$typeof: REACT_FORWARD_REF_TYPE, render };
    };
    react_production.isValidElement = isValidElement;
    react_production.lazy = function(ctor) {
      return {
        $$typeof: REACT_LAZY_TYPE,
        _payload: { _status: -1, _result: ctor },
        _init: lazyInitializer
      };
    };
    react_production.memo = function(type, compare) {
      return {
        $$typeof: REACT_MEMO_TYPE,
        type,
        compare: void 0 === compare ? null : compare
      };
    };
    react_production.startTransition = function(scope) {
      var prevTransition = ReactSharedInternals.T, currentTransition = {};
      ReactSharedInternals.T = currentTransition;
      try {
        var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
        null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
        "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && returnValue.then(noop, reportGlobalError);
      } catch (error) {
        reportGlobalError(error);
      } finally {
        null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
      }
    };
    react_production.unstable_useCacheRefresh = function() {
      return ReactSharedInternals.H.useCacheRefresh();
    };
    react_production.use = function(usable) {
      return ReactSharedInternals.H.use(usable);
    };
    react_production.useActionState = function(action, initialState, permalink) {
      return ReactSharedInternals.H.useActionState(action, initialState, permalink);
    };
    react_production.useCallback = function(callback, deps) {
      return ReactSharedInternals.H.useCallback(callback, deps);
    };
    react_production.useContext = function(Context) {
      return ReactSharedInternals.H.useContext(Context);
    };
    react_production.useDebugValue = function() {
    };
    react_production.useDeferredValue = function(value, initialValue) {
      return ReactSharedInternals.H.useDeferredValue(value, initialValue);
    };
    react_production.useEffect = function(create, deps) {
      return ReactSharedInternals.H.useEffect(create, deps);
    };
    react_production.useEffectEvent = function(callback) {
      return ReactSharedInternals.H.useEffectEvent(callback);
    };
    react_production.useId = function() {
      return ReactSharedInternals.H.useId();
    };
    react_production.useImperativeHandle = function(ref, create, deps) {
      return ReactSharedInternals.H.useImperativeHandle(ref, create, deps);
    };
    react_production.useInsertionEffect = function(create, deps) {
      return ReactSharedInternals.H.useInsertionEffect(create, deps);
    };
    react_production.useLayoutEffect = function(create, deps) {
      return ReactSharedInternals.H.useLayoutEffect(create, deps);
    };
    react_production.useMemo = function(create, deps) {
      return ReactSharedInternals.H.useMemo(create, deps);
    };
    react_production.useOptimistic = function(passthrough, reducer) {
      return ReactSharedInternals.H.useOptimistic(passthrough, reducer);
    };
    react_production.useReducer = function(reducer, initialArg, init) {
      return ReactSharedInternals.H.useReducer(reducer, initialArg, init);
    };
    react_production.useRef = function(initialValue) {
      return ReactSharedInternals.H.useRef(initialValue);
    };
    react_production.useState = function(initialState) {
      return ReactSharedInternals.H.useState(initialState);
    };
    react_production.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
      return ReactSharedInternals.H.useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot
      );
    };
    react_production.useTransition = function() {
      return ReactSharedInternals.H.useTransition();
    };
    react_production.version = "19.2.3";
    return react_production;
  }
  var hasRequiredReact;
  function requireReact() {
    if (hasRequiredReact) return react.exports;
    hasRequiredReact = 1;
    {
      react.exports = requireReact_production();
    }
    return react.exports;
  }
  var reactDom = { exports: {} };
  var reactDom_production = {};
  /**
   * @license React
   * react-dom.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var hasRequiredReactDom_production;
  function requireReactDom_production() {
    if (hasRequiredReactDom_production) return reactDom_production;
    hasRequiredReactDom_production = 1;
    var React2 = requireReact();
    function formatProdErrorMessage(code) {
      var url = "https://react.dev/errors/" + code;
      if (1 < arguments.length) {
        url += "?args[]=" + encodeURIComponent(arguments[1]);
        for (var i = 2; i < arguments.length; i++)
          url += "&args[]=" + encodeURIComponent(arguments[i]);
      }
      return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    function noop() {
    }
    var Internals = {
      d: {
        f: noop,
        r: function() {
          throw Error(formatProdErrorMessage(522));
        },
        D: noop,
        C: noop,
        L: noop,
        m: noop,
        X: noop,
        S: noop,
        M: noop
      },
      p: 0,
      findDOMNode: null
    }, REACT_PORTAL_TYPE = Symbol.for("react.portal");
    function createPortal$1(children, containerInfo, implementation) {
      var key = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
      return {
        $$typeof: REACT_PORTAL_TYPE,
        key: null == key ? null : "" + key,
        children,
        containerInfo,
        implementation
      };
    }
    var ReactSharedInternals = React2.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    function getCrossOriginStringAs(as, input) {
      if ("font" === as) return "";
      if ("string" === typeof input)
        return "use-credentials" === input ? input : "";
    }
    reactDom_production.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Internals;
    reactDom_production.createPortal = function(children, container) {
      var key = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
      if (!container || 1 !== container.nodeType && 9 !== container.nodeType && 11 !== container.nodeType)
        throw Error(formatProdErrorMessage(299));
      return createPortal$1(children, container, null, key);
    };
    reactDom_production.flushSync = function(fn) {
      var previousTransition = ReactSharedInternals.T, previousUpdatePriority = Internals.p;
      try {
        if (ReactSharedInternals.T = null, Internals.p = 2, fn) return fn();
      } finally {
        ReactSharedInternals.T = previousTransition, Internals.p = previousUpdatePriority, Internals.d.f();
      }
    };
    reactDom_production.preconnect = function(href, options) {
      "string" === typeof href && (options ? (options = options.crossOrigin, options = "string" === typeof options ? "use-credentials" === options ? options : "" : void 0) : options = null, Internals.d.C(href, options));
    };
    reactDom_production.prefetchDNS = function(href) {
      "string" === typeof href && Internals.d.D(href);
    };
    reactDom_production.preinit = function(href, options) {
      if ("string" === typeof href && options && "string" === typeof options.as) {
        var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin), integrity = "string" === typeof options.integrity ? options.integrity : void 0, fetchPriority = "string" === typeof options.fetchPriority ? options.fetchPriority : void 0;
        "style" === as ? Internals.d.S(
          href,
          "string" === typeof options.precedence ? options.precedence : void 0,
          {
            crossOrigin,
            integrity,
            fetchPriority
          }
        ) : "script" === as && Internals.d.X(href, {
          crossOrigin,
          integrity,
          fetchPriority,
          nonce: "string" === typeof options.nonce ? options.nonce : void 0
        });
      }
    };
    reactDom_production.preinitModule = function(href, options) {
      if ("string" === typeof href)
        if ("object" === typeof options && null !== options) {
          if (null == options.as || "script" === options.as) {
            var crossOrigin = getCrossOriginStringAs(
              options.as,
              options.crossOrigin
            );
            Internals.d.M(href, {
              crossOrigin,
              integrity: "string" === typeof options.integrity ? options.integrity : void 0,
              nonce: "string" === typeof options.nonce ? options.nonce : void 0
            });
          }
        } else null == options && Internals.d.M(href);
    };
    reactDom_production.preload = function(href, options) {
      if ("string" === typeof href && "object" === typeof options && null !== options && "string" === typeof options.as) {
        var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin);
        Internals.d.L(href, as, {
          crossOrigin,
          integrity: "string" === typeof options.integrity ? options.integrity : void 0,
          nonce: "string" === typeof options.nonce ? options.nonce : void 0,
          type: "string" === typeof options.type ? options.type : void 0,
          fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0,
          referrerPolicy: "string" === typeof options.referrerPolicy ? options.referrerPolicy : void 0,
          imageSrcSet: "string" === typeof options.imageSrcSet ? options.imageSrcSet : void 0,
          imageSizes: "string" === typeof options.imageSizes ? options.imageSizes : void 0,
          media: "string" === typeof options.media ? options.media : void 0
        });
      }
    };
    reactDom_production.preloadModule = function(href, options) {
      if ("string" === typeof href)
        if (options) {
          var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
          Internals.d.m(href, {
            as: "string" === typeof options.as && "script" !== options.as ? options.as : void 0,
            crossOrigin,
            integrity: "string" === typeof options.integrity ? options.integrity : void 0
          });
        } else Internals.d.m(href);
    };
    reactDom_production.requestFormReset = function(form) {
      Internals.d.r(form);
    };
    reactDom_production.unstable_batchedUpdates = function(fn, a) {
      return fn(a);
    };
    reactDom_production.useFormState = function(action, initialState, permalink) {
      return ReactSharedInternals.H.useFormState(action, initialState, permalink);
    };
    reactDom_production.useFormStatus = function() {
      return ReactSharedInternals.H.useHostTransitionStatus();
    };
    reactDom_production.version = "19.2.3";
    return reactDom_production;
  }
  var hasRequiredReactDom;
  function requireReactDom() {
    if (hasRequiredReactDom) return reactDom.exports;
    hasRequiredReactDom = 1;
    function checkDCE() {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
        return;
      }
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
      } catch (err) {
        console.error(err);
      }
    }
    {
      checkDCE();
      reactDom.exports = requireReactDom_production();
    }
    return reactDom.exports;
  }
  /**
   * @license React
   * react-dom-client.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var hasRequiredReactDomClient_production;
  function requireReactDomClient_production() {
    if (hasRequiredReactDomClient_production) return reactDomClient_production;
    hasRequiredReactDomClient_production = 1;
    var Scheduler = requireScheduler(), React2 = requireReact(), ReactDOM = requireReactDom();
    function formatProdErrorMessage(code) {
      var url = "https://react.dev/errors/" + code;
      if (1 < arguments.length) {
        url += "?args[]=" + encodeURIComponent(arguments[1]);
        for (var i = 2; i < arguments.length; i++)
          url += "&args[]=" + encodeURIComponent(arguments[i]);
      }
      return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    function isValidContainer(node) {
      return !(!node || 1 !== node.nodeType && 9 !== node.nodeType && 11 !== node.nodeType);
    }
    function getNearestMountedFiber(fiber) {
      var node = fiber, nearestMounted = fiber;
      if (fiber.alternate) for (; node.return; ) node = node.return;
      else {
        fiber = node;
        do
          node = fiber, 0 !== (node.flags & 4098) && (nearestMounted = node.return), fiber = node.return;
        while (fiber);
      }
      return 3 === node.tag ? nearestMounted : null;
    }
    function getSuspenseInstanceFromFiber(fiber) {
      if (13 === fiber.tag) {
        var suspenseState = fiber.memoizedState;
        null === suspenseState && (fiber = fiber.alternate, null !== fiber && (suspenseState = fiber.memoizedState));
        if (null !== suspenseState) return suspenseState.dehydrated;
      }
      return null;
    }
    function getActivityInstanceFromFiber(fiber) {
      if (31 === fiber.tag) {
        var activityState = fiber.memoizedState;
        null === activityState && (fiber = fiber.alternate, null !== fiber && (activityState = fiber.memoizedState));
        if (null !== activityState) return activityState.dehydrated;
      }
      return null;
    }
    function assertIsMounted(fiber) {
      if (getNearestMountedFiber(fiber) !== fiber)
        throw Error(formatProdErrorMessage(188));
    }
    function findCurrentFiberUsingSlowPath(fiber) {
      var alternate = fiber.alternate;
      if (!alternate) {
        alternate = getNearestMountedFiber(fiber);
        if (null === alternate) throw Error(formatProdErrorMessage(188));
        return alternate !== fiber ? null : fiber;
      }
      for (var a = fiber, b = alternate; ; ) {
        var parentA = a.return;
        if (null === parentA) break;
        var parentB = parentA.alternate;
        if (null === parentB) {
          b = parentA.return;
          if (null !== b) {
            a = b;
            continue;
          }
          break;
        }
        if (parentA.child === parentB.child) {
          for (parentB = parentA.child; parentB; ) {
            if (parentB === a) return assertIsMounted(parentA), fiber;
            if (parentB === b) return assertIsMounted(parentA), alternate;
            parentB = parentB.sibling;
          }
          throw Error(formatProdErrorMessage(188));
        }
        if (a.return !== b.return) a = parentA, b = parentB;
        else {
          for (var didFindChild = false, child$0 = parentA.child; child$0; ) {
            if (child$0 === a) {
              didFindChild = true;
              a = parentA;
              b = parentB;
              break;
            }
            if (child$0 === b) {
              didFindChild = true;
              b = parentA;
              a = parentB;
              break;
            }
            child$0 = child$0.sibling;
          }
          if (!didFindChild) {
            for (child$0 = parentB.child; child$0; ) {
              if (child$0 === a) {
                didFindChild = true;
                a = parentB;
                b = parentA;
                break;
              }
              if (child$0 === b) {
                didFindChild = true;
                b = parentB;
                a = parentA;
                break;
              }
              child$0 = child$0.sibling;
            }
            if (!didFindChild) throw Error(formatProdErrorMessage(189));
          }
        }
        if (a.alternate !== b) throw Error(formatProdErrorMessage(190));
      }
      if (3 !== a.tag) throw Error(formatProdErrorMessage(188));
      return a.stateNode.current === a ? fiber : alternate;
    }
    function findCurrentHostFiberImpl(node) {
      var tag = node.tag;
      if (5 === tag || 26 === tag || 27 === tag || 6 === tag) return node;
      for (node = node.child; null !== node; ) {
        tag = findCurrentHostFiberImpl(node);
        if (null !== tag) return tag;
        node = node.sibling;
      }
      return null;
    }
    var assign = Object.assign, REACT_LEGACY_ELEMENT_TYPE = Symbol.for("react.element"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy");
    var REACT_ACTIVITY_TYPE = Symbol.for("react.activity");
    var REACT_MEMO_CACHE_SENTINEL = Symbol.for("react.memo_cache_sentinel");
    var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
    function getIteratorFn(maybeIterable) {
      if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
      maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
      return "function" === typeof maybeIterable ? maybeIterable : null;
    }
    var REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference");
    function getComponentNameFromType(type) {
      if (null == type) return null;
      if ("function" === typeof type)
        return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
      if ("string" === typeof type) return type;
      switch (type) {
        case REACT_FRAGMENT_TYPE:
          return "Fragment";
        case REACT_PROFILER_TYPE:
          return "Profiler";
        case REACT_STRICT_MODE_TYPE:
          return "StrictMode";
        case REACT_SUSPENSE_TYPE:
          return "Suspense";
        case REACT_SUSPENSE_LIST_TYPE:
          return "SuspenseList";
        case REACT_ACTIVITY_TYPE:
          return "Activity";
      }
      if ("object" === typeof type)
        switch (type.$$typeof) {
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_CONTEXT_TYPE:
            return type.displayName || "Context";
          case REACT_CONSUMER_TYPE:
            return (type._context.displayName || "Context") + ".Consumer";
          case REACT_FORWARD_REF_TYPE:
            var innerType = type.render;
            type = type.displayName;
            type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
            return type;
          case REACT_MEMO_TYPE:
            return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
          case REACT_LAZY_TYPE:
            innerType = type._payload;
            type = type._init;
            try {
              return getComponentNameFromType(type(innerType));
            } catch (x) {
            }
        }
      return null;
    }
    var isArrayImpl = Array.isArray, ReactSharedInternals = React2.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ReactDOMSharedInternals = ReactDOM.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, sharedNotPendingObject = {
      pending: false,
      data: null,
      method: null,
      action: null
    }, valueStack = [], index = -1;
    function createCursor(defaultValue) {
      return { current: defaultValue };
    }
    function pop(cursor) {
      0 > index || (cursor.current = valueStack[index], valueStack[index] = null, index--);
    }
    function push(cursor, value) {
      index++;
      valueStack[index] = cursor.current;
      cursor.current = value;
    }
    var contextStackCursor = createCursor(null), contextFiberStackCursor = createCursor(null), rootInstanceStackCursor = createCursor(null), hostTransitionProviderCursor = createCursor(null);
    function pushHostContainer(fiber, nextRootInstance) {
      push(rootInstanceStackCursor, nextRootInstance);
      push(contextFiberStackCursor, fiber);
      push(contextStackCursor, null);
      switch (nextRootInstance.nodeType) {
        case 9:
        case 11:
          fiber = (fiber = nextRootInstance.documentElement) ? (fiber = fiber.namespaceURI) ? getOwnHostContext(fiber) : 0 : 0;
          break;
        default:
          if (fiber = nextRootInstance.tagName, nextRootInstance = nextRootInstance.namespaceURI)
            nextRootInstance = getOwnHostContext(nextRootInstance), fiber = getChildHostContextProd(nextRootInstance, fiber);
          else
            switch (fiber) {
              case "svg":
                fiber = 1;
                break;
              case "math":
                fiber = 2;
                break;
              default:
                fiber = 0;
            }
      }
      pop(contextStackCursor);
      push(contextStackCursor, fiber);
    }
    function popHostContainer() {
      pop(contextStackCursor);
      pop(contextFiberStackCursor);
      pop(rootInstanceStackCursor);
    }
    function pushHostContext(fiber) {
      null !== fiber.memoizedState && push(hostTransitionProviderCursor, fiber);
      var context = contextStackCursor.current;
      var JSCompiler_inline_result = getChildHostContextProd(context, fiber.type);
      context !== JSCompiler_inline_result && (push(contextFiberStackCursor, fiber), push(contextStackCursor, JSCompiler_inline_result));
    }
    function popHostContext(fiber) {
      contextFiberStackCursor.current === fiber && (pop(contextStackCursor), pop(contextFiberStackCursor));
      hostTransitionProviderCursor.current === fiber && (pop(hostTransitionProviderCursor), HostTransitionContext._currentValue = sharedNotPendingObject);
    }
    var prefix, suffix;
    function describeBuiltInComponentFrame(name) {
      if (void 0 === prefix)
        try {
          throw Error();
        } catch (x) {
          var match = x.stack.trim().match(/\n( *(at )?)/);
          prefix = match && match[1] || "";
          suffix = -1 < x.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < x.stack.indexOf("@") ? "@unknown:0:0" : "";
        }
      return "\n" + prefix + name + suffix;
    }
    var reentry = false;
    function describeNativeComponentFrame(fn, construct) {
      if (!fn || reentry) return "";
      reentry = true;
      var previousPrepareStackTrace = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      try {
        var RunInRootFrame = {
          DetermineComponentFrameRoot: function() {
            try {
              if (construct) {
                var Fake = function() {
                  throw Error();
                };
                Object.defineProperty(Fake.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                });
                if ("object" === typeof Reflect && Reflect.construct) {
                  try {
                    Reflect.construct(Fake, []);
                  } catch (x) {
                    var control = x;
                  }
                  Reflect.construct(fn, [], Fake);
                } else {
                  try {
                    Fake.call();
                  } catch (x$1) {
                    control = x$1;
                  }
                  fn.call(Fake.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (x$2) {
                  control = x$2;
                }
                (Fake = fn()) && "function" === typeof Fake.catch && Fake.catch(function() {
                });
              }
            } catch (sample) {
              if (sample && control && "string" === typeof sample.stack)
                return [sample.stack, control.stack];
            }
            return [null, null];
          }
        };
        RunInRootFrame.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
        var namePropDescriptor = Object.getOwnPropertyDescriptor(
          RunInRootFrame.DetermineComponentFrameRoot,
          "name"
        );
        namePropDescriptor && namePropDescriptor.configurable && Object.defineProperty(
          RunInRootFrame.DetermineComponentFrameRoot,
          "name",
          { value: "DetermineComponentFrameRoot" }
        );
        var _RunInRootFrame$Deter = RunInRootFrame.DetermineComponentFrameRoot(), sampleStack = _RunInRootFrame$Deter[0], controlStack = _RunInRootFrame$Deter[1];
        if (sampleStack && controlStack) {
          var sampleLines = sampleStack.split("\n"), controlLines = controlStack.split("\n");
          for (namePropDescriptor = RunInRootFrame = 0; RunInRootFrame < sampleLines.length && !sampleLines[RunInRootFrame].includes("DetermineComponentFrameRoot"); )
            RunInRootFrame++;
          for (; namePropDescriptor < controlLines.length && !controlLines[namePropDescriptor].includes(
            "DetermineComponentFrameRoot"
          ); )
            namePropDescriptor++;
          if (RunInRootFrame === sampleLines.length || namePropDescriptor === controlLines.length)
            for (RunInRootFrame = sampleLines.length - 1, namePropDescriptor = controlLines.length - 1; 1 <= RunInRootFrame && 0 <= namePropDescriptor && sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]; )
              namePropDescriptor--;
          for (; 1 <= RunInRootFrame && 0 <= namePropDescriptor; RunInRootFrame--, namePropDescriptor--)
            if (sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]) {
              if (1 !== RunInRootFrame || 1 !== namePropDescriptor) {
                do
                  if (RunInRootFrame--, namePropDescriptor--, 0 > namePropDescriptor || sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]) {
                    var frame = "\n" + sampleLines[RunInRootFrame].replace(" at new ", " at ");
                    fn.displayName && frame.includes("<anonymous>") && (frame = frame.replace("<anonymous>", fn.displayName));
                    return frame;
                  }
                while (1 <= RunInRootFrame && 0 <= namePropDescriptor);
              }
              break;
            }
        }
      } finally {
        reentry = false, Error.prepareStackTrace = previousPrepareStackTrace;
      }
      return (previousPrepareStackTrace = fn ? fn.displayName || fn.name : "") ? describeBuiltInComponentFrame(previousPrepareStackTrace) : "";
    }
    function describeFiber(fiber, childFiber) {
      switch (fiber.tag) {
        case 26:
        case 27:
        case 5:
          return describeBuiltInComponentFrame(fiber.type);
        case 16:
          return describeBuiltInComponentFrame("Lazy");
        case 13:
          return fiber.child !== childFiber && null !== childFiber ? describeBuiltInComponentFrame("Suspense Fallback") : describeBuiltInComponentFrame("Suspense");
        case 19:
          return describeBuiltInComponentFrame("SuspenseList");
        case 0:
        case 15:
          return describeNativeComponentFrame(fiber.type, false);
        case 11:
          return describeNativeComponentFrame(fiber.type.render, false);
        case 1:
          return describeNativeComponentFrame(fiber.type, true);
        case 31:
          return describeBuiltInComponentFrame("Activity");
        default:
          return "";
      }
    }
    function getStackByFiberInDevAndProd(workInProgress2) {
      try {
        var info = "", previous = null;
        do
          info += describeFiber(workInProgress2, previous), previous = workInProgress2, workInProgress2 = workInProgress2.return;
        while (workInProgress2);
        return info;
      } catch (x) {
        return "\nError generating stack: " + x.message + "\n" + x.stack;
      }
    }
    var hasOwnProperty = Object.prototype.hasOwnProperty, scheduleCallback$3 = Scheduler.unstable_scheduleCallback, cancelCallback$1 = Scheduler.unstable_cancelCallback, shouldYield = Scheduler.unstable_shouldYield, requestPaint = Scheduler.unstable_requestPaint, now = Scheduler.unstable_now, getCurrentPriorityLevel = Scheduler.unstable_getCurrentPriorityLevel, ImmediatePriority = Scheduler.unstable_ImmediatePriority, UserBlockingPriority = Scheduler.unstable_UserBlockingPriority, NormalPriority$1 = Scheduler.unstable_NormalPriority, LowPriority = Scheduler.unstable_LowPriority, IdlePriority = Scheduler.unstable_IdlePriority, log$1 = Scheduler.log, unstable_setDisableYieldValue = Scheduler.unstable_setDisableYieldValue, rendererID = null, injectedHook = null;
    function setIsStrictModeForDevtools(newIsStrictMode) {
      "function" === typeof log$1 && unstable_setDisableYieldValue(newIsStrictMode);
      if (injectedHook && "function" === typeof injectedHook.setStrictMode)
        try {
          injectedHook.setStrictMode(rendererID, newIsStrictMode);
        } catch (err) {
        }
    }
    var clz32 = Math.clz32 ? Math.clz32 : clz32Fallback, log = Math.log, LN2 = Math.LN2;
    function clz32Fallback(x) {
      x >>>= 0;
      return 0 === x ? 32 : 31 - (log(x) / LN2 | 0) | 0;
    }
    var nextTransitionUpdateLane = 256, nextTransitionDeferredLane = 262144, nextRetryLane = 4194304;
    function getHighestPriorityLanes(lanes) {
      var pendingSyncLanes = lanes & 42;
      if (0 !== pendingSyncLanes) return pendingSyncLanes;
      switch (lanes & -lanes) {
        case 1:
          return 1;
        case 2:
          return 2;
        case 4:
          return 4;
        case 8:
          return 8;
        case 16:
          return 16;
        case 32:
          return 32;
        case 64:
          return 64;
        case 128:
          return 128;
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
          return lanes & 261888;
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return lanes & 3932160;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          return lanes & 62914560;
        case 67108864:
          return 67108864;
        case 134217728:
          return 134217728;
        case 268435456:
          return 268435456;
        case 536870912:
          return 536870912;
        case 1073741824:
          return 0;
        default:
          return lanes;
      }
    }
    function getNextLanes(root3, wipLanes, rootHasPendingCommit) {
      var pendingLanes = root3.pendingLanes;
      if (0 === pendingLanes) return 0;
      var nextLanes = 0, suspendedLanes = root3.suspendedLanes, pingedLanes = root3.pingedLanes;
      root3 = root3.warmLanes;
      var nonIdlePendingLanes = pendingLanes & 134217727;
      0 !== nonIdlePendingLanes ? (pendingLanes = nonIdlePendingLanes & ~suspendedLanes, 0 !== pendingLanes ? nextLanes = getHighestPriorityLanes(pendingLanes) : (pingedLanes &= nonIdlePendingLanes, 0 !== pingedLanes ? nextLanes = getHighestPriorityLanes(pingedLanes) : rootHasPendingCommit || (rootHasPendingCommit = nonIdlePendingLanes & ~root3, 0 !== rootHasPendingCommit && (nextLanes = getHighestPriorityLanes(rootHasPendingCommit))))) : (nonIdlePendingLanes = pendingLanes & ~suspendedLanes, 0 !== nonIdlePendingLanes ? nextLanes = getHighestPriorityLanes(nonIdlePendingLanes) : 0 !== pingedLanes ? nextLanes = getHighestPriorityLanes(pingedLanes) : rootHasPendingCommit || (rootHasPendingCommit = pendingLanes & ~root3, 0 !== rootHasPendingCommit && (nextLanes = getHighestPriorityLanes(rootHasPendingCommit))));
      return 0 === nextLanes ? 0 : 0 !== wipLanes && wipLanes !== nextLanes && 0 === (wipLanes & suspendedLanes) && (suspendedLanes = nextLanes & -nextLanes, rootHasPendingCommit = wipLanes & -wipLanes, suspendedLanes >= rootHasPendingCommit || 32 === suspendedLanes && 0 !== (rootHasPendingCommit & 4194048)) ? wipLanes : nextLanes;
    }
    function checkIfRootIsPrerendering(root3, renderLanes2) {
      return 0 === (root3.pendingLanes & ~(root3.suspendedLanes & ~root3.pingedLanes) & renderLanes2);
    }
    function computeExpirationTime(lane, currentTime) {
      switch (lane) {
        case 1:
        case 2:
        case 4:
        case 8:
        case 64:
          return currentTime + 250;
        case 16:
        case 32:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return currentTime + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          return -1;
        case 67108864:
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
          return -1;
        default:
          return -1;
      }
    }
    function claimNextRetryLane() {
      var lane = nextRetryLane;
      nextRetryLane <<= 1;
      0 === (nextRetryLane & 62914560) && (nextRetryLane = 4194304);
      return lane;
    }
    function createLaneMap(initial) {
      for (var laneMap = [], i = 0; 31 > i; i++) laneMap.push(initial);
      return laneMap;
    }
    function markRootUpdated$1(root3, updateLane) {
      root3.pendingLanes |= updateLane;
      268435456 !== updateLane && (root3.suspendedLanes = 0, root3.pingedLanes = 0, root3.warmLanes = 0);
    }
    function markRootFinished(root3, finishedLanes, remainingLanes, spawnedLane, updatedLanes, suspendedRetryLanes) {
      var previouslyPendingLanes = root3.pendingLanes;
      root3.pendingLanes = remainingLanes;
      root3.suspendedLanes = 0;
      root3.pingedLanes = 0;
      root3.warmLanes = 0;
      root3.expiredLanes &= remainingLanes;
      root3.entangledLanes &= remainingLanes;
      root3.errorRecoveryDisabledLanes &= remainingLanes;
      root3.shellSuspendCounter = 0;
      var entanglements = root3.entanglements, expirationTimes = root3.expirationTimes, hiddenUpdates = root3.hiddenUpdates;
      for (remainingLanes = previouslyPendingLanes & ~remainingLanes; 0 < remainingLanes; ) {
        var index$7 = 31 - clz32(remainingLanes), lane = 1 << index$7;
        entanglements[index$7] = 0;
        expirationTimes[index$7] = -1;
        var hiddenUpdatesForLane = hiddenUpdates[index$7];
        if (null !== hiddenUpdatesForLane)
          for (hiddenUpdates[index$7] = null, index$7 = 0; index$7 < hiddenUpdatesForLane.length; index$7++) {
            var update = hiddenUpdatesForLane[index$7];
            null !== update && (update.lane &= -536870913);
          }
        remainingLanes &= ~lane;
      }
      0 !== spawnedLane && markSpawnedDeferredLane(root3, spawnedLane, 0);
      0 !== suspendedRetryLanes && 0 === updatedLanes && 0 !== root3.tag && (root3.suspendedLanes |= suspendedRetryLanes & ~(previouslyPendingLanes & ~finishedLanes));
    }
    function markSpawnedDeferredLane(root3, spawnedLane, entangledLanes) {
      root3.pendingLanes |= spawnedLane;
      root3.suspendedLanes &= ~spawnedLane;
      var spawnedLaneIndex = 31 - clz32(spawnedLane);
      root3.entangledLanes |= spawnedLane;
      root3.entanglements[spawnedLaneIndex] = root3.entanglements[spawnedLaneIndex] | 1073741824 | entangledLanes & 261930;
    }
    function markRootEntangled(root3, entangledLanes) {
      var rootEntangledLanes = root3.entangledLanes |= entangledLanes;
      for (root3 = root3.entanglements; rootEntangledLanes; ) {
        var index$8 = 31 - clz32(rootEntangledLanes), lane = 1 << index$8;
        lane & entangledLanes | root3[index$8] & entangledLanes && (root3[index$8] |= entangledLanes);
        rootEntangledLanes &= ~lane;
      }
    }
    function getBumpedLaneForHydration(root3, renderLanes2) {
      var renderLane = renderLanes2 & -renderLanes2;
      renderLane = 0 !== (renderLane & 42) ? 1 : getBumpedLaneForHydrationByLane(renderLane);
      return 0 !== (renderLane & (root3.suspendedLanes | renderLanes2)) ? 0 : renderLane;
    }
    function getBumpedLaneForHydrationByLane(lane) {
      switch (lane) {
        case 2:
          lane = 1;
          break;
        case 8:
          lane = 4;
          break;
        case 32:
          lane = 16;
          break;
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          lane = 128;
          break;
        case 268435456:
          lane = 134217728;
          break;
        default:
          lane = 0;
      }
      return lane;
    }
    function lanesToEventPriority(lanes) {
      lanes &= -lanes;
      return 2 < lanes ? 8 < lanes ? 0 !== (lanes & 134217727) ? 32 : 268435456 : 8 : 2;
    }
    function resolveUpdatePriority() {
      var updatePriority = ReactDOMSharedInternals.p;
      if (0 !== updatePriority) return updatePriority;
      updatePriority = window.event;
      return void 0 === updatePriority ? 32 : getEventPriority(updatePriority.type);
    }
    function runWithPriority(priority, fn) {
      var previousPriority = ReactDOMSharedInternals.p;
      try {
        return ReactDOMSharedInternals.p = priority, fn();
      } finally {
        ReactDOMSharedInternals.p = previousPriority;
      }
    }
    var randomKey = Math.random().toString(36).slice(2), internalInstanceKey = "__reactFiber$" + randomKey, internalPropsKey = "__reactProps$" + randomKey, internalContainerInstanceKey = "__reactContainer$" + randomKey, internalEventHandlersKey = "__reactEvents$" + randomKey, internalEventHandlerListenersKey = "__reactListeners$" + randomKey, internalEventHandlesSetKey = "__reactHandles$" + randomKey, internalRootNodeResourcesKey = "__reactResources$" + randomKey, internalHoistableMarker = "__reactMarker$" + randomKey;
    function detachDeletedInstance(node) {
      delete node[internalInstanceKey];
      delete node[internalPropsKey];
      delete node[internalEventHandlersKey];
      delete node[internalEventHandlerListenersKey];
      delete node[internalEventHandlesSetKey];
    }
    function getClosestInstanceFromNode(targetNode) {
      var targetInst = targetNode[internalInstanceKey];
      if (targetInst) return targetInst;
      for (var parentNode = targetNode.parentNode; parentNode; ) {
        if (targetInst = parentNode[internalContainerInstanceKey] || parentNode[internalInstanceKey]) {
          parentNode = targetInst.alternate;
          if (null !== targetInst.child || null !== parentNode && null !== parentNode.child)
            for (targetNode = getParentHydrationBoundary(targetNode); null !== targetNode; ) {
              if (parentNode = targetNode[internalInstanceKey]) return parentNode;
              targetNode = getParentHydrationBoundary(targetNode);
            }
          return targetInst;
        }
        targetNode = parentNode;
        parentNode = targetNode.parentNode;
      }
      return null;
    }
    function getInstanceFromNode(node) {
      if (node = node[internalInstanceKey] || node[internalContainerInstanceKey]) {
        var tag = node.tag;
        if (5 === tag || 6 === tag || 13 === tag || 31 === tag || 26 === tag || 27 === tag || 3 === tag)
          return node;
      }
      return null;
    }
    function getNodeFromInstance(inst) {
      var tag = inst.tag;
      if (5 === tag || 26 === tag || 27 === tag || 6 === tag) return inst.stateNode;
      throw Error(formatProdErrorMessage(33));
    }
    function getResourcesFromRoot(root3) {
      var resources = root3[internalRootNodeResourcesKey];
      resources || (resources = root3[internalRootNodeResourcesKey] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() });
      return resources;
    }
    function markNodeAsHoistable(node) {
      node[internalHoistableMarker] = true;
    }
    var allNativeEvents = /* @__PURE__ */ new Set(), registrationNameDependencies = {};
    function registerTwoPhaseEvent(registrationName, dependencies) {
      registerDirectEvent(registrationName, dependencies);
      registerDirectEvent(registrationName + "Capture", dependencies);
    }
    function registerDirectEvent(registrationName, dependencies) {
      registrationNameDependencies[registrationName] = dependencies;
      for (registrationName = 0; registrationName < dependencies.length; registrationName++)
        allNativeEvents.add(dependencies[registrationName]);
    }
    var VALID_ATTRIBUTE_NAME_REGEX = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ), illegalAttributeNameCache = {}, validatedAttributeNameCache = {};
    function isAttributeNameSafe(attributeName) {
      if (hasOwnProperty.call(validatedAttributeNameCache, attributeName))
        return true;
      if (hasOwnProperty.call(illegalAttributeNameCache, attributeName)) return false;
      if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName))
        return validatedAttributeNameCache[attributeName] = true;
      illegalAttributeNameCache[attributeName] = true;
      return false;
    }
    function setValueForAttribute(node, name, value) {
      if (isAttributeNameSafe(name))
        if (null === value) node.removeAttribute(name);
        else {
          switch (typeof value) {
            case "undefined":
            case "function":
            case "symbol":
              node.removeAttribute(name);
              return;
            case "boolean":
              var prefix$10 = name.toLowerCase().slice(0, 5);
              if ("data-" !== prefix$10 && "aria-" !== prefix$10) {
                node.removeAttribute(name);
                return;
              }
          }
          node.setAttribute(name, "" + value);
        }
    }
    function setValueForKnownAttribute(node, name, value) {
      if (null === value) node.removeAttribute(name);
      else {
        switch (typeof value) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            node.removeAttribute(name);
            return;
        }
        node.setAttribute(name, "" + value);
      }
    }
    function setValueForNamespacedAttribute(node, namespace, name, value) {
      if (null === value) node.removeAttribute(name);
      else {
        switch (typeof value) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            node.removeAttribute(name);
            return;
        }
        node.setAttributeNS(namespace, name, "" + value);
      }
    }
    function getToStringValue(value) {
      switch (typeof value) {
        case "bigint":
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return value;
        case "object":
          return value;
        default:
          return "";
      }
    }
    function isCheckable(elem) {
      var type = elem.type;
      return (elem = elem.nodeName) && "input" === elem.toLowerCase() && ("checkbox" === type || "radio" === type);
    }
    function trackValueOnNode(node, valueField, currentValue) {
      var descriptor = Object.getOwnPropertyDescriptor(
        node.constructor.prototype,
        valueField
      );
      if (!node.hasOwnProperty(valueField) && "undefined" !== typeof descriptor && "function" === typeof descriptor.get && "function" === typeof descriptor.set) {
        var get = descriptor.get, set = descriptor.set;
        Object.defineProperty(node, valueField, {
          configurable: true,
          get: function() {
            return get.call(this);
          },
          set: function(value) {
            currentValue = "" + value;
            set.call(this, value);
          }
        });
        Object.defineProperty(node, valueField, {
          enumerable: descriptor.enumerable
        });
        return {
          getValue: function() {
            return currentValue;
          },
          setValue: function(value) {
            currentValue = "" + value;
          },
          stopTracking: function() {
            node._valueTracker = null;
            delete node[valueField];
          }
        };
      }
    }
    function track(node) {
      if (!node._valueTracker) {
        var valueField = isCheckable(node) ? "checked" : "value";
        node._valueTracker = trackValueOnNode(
          node,
          valueField,
          "" + node[valueField]
        );
      }
    }
    function updateValueIfChanged(node) {
      if (!node) return false;
      var tracker = node._valueTracker;
      if (!tracker) return true;
      var lastValue = tracker.getValue();
      var value = "";
      node && (value = isCheckable(node) ? node.checked ? "true" : "false" : node.value);
      node = value;
      return node !== lastValue ? (tracker.setValue(node), true) : false;
    }
    function getActiveElement(doc) {
      doc = doc || ("undefined" !== typeof document ? document : void 0);
      if ("undefined" === typeof doc) return null;
      try {
        return doc.activeElement || doc.body;
      } catch (e) {
        return doc.body;
      }
    }
    var escapeSelectorAttributeValueInsideDoubleQuotesRegex = /[\n"\\]/g;
    function escapeSelectorAttributeValueInsideDoubleQuotes(value) {
      return value.replace(
        escapeSelectorAttributeValueInsideDoubleQuotesRegex,
        function(ch) {
          return "\\" + ch.charCodeAt(0).toString(16) + " ";
        }
      );
    }
    function updateInput(element, value, defaultValue, lastDefaultValue, checked, defaultChecked, type, name) {
      element.name = "";
      null != type && "function" !== typeof type && "symbol" !== typeof type && "boolean" !== typeof type ? element.type = type : element.removeAttribute("type");
      if (null != value)
        if ("number" === type) {
          if (0 === value && "" === element.value || element.value != value)
            element.value = "" + getToStringValue(value);
        } else
          element.value !== "" + getToStringValue(value) && (element.value = "" + getToStringValue(value));
      else
        "submit" !== type && "reset" !== type || element.removeAttribute("value");
      null != value ? setDefaultValue(element, type, getToStringValue(value)) : null != defaultValue ? setDefaultValue(element, type, getToStringValue(defaultValue)) : null != lastDefaultValue && element.removeAttribute("value");
      null == checked && null != defaultChecked && (element.defaultChecked = !!defaultChecked);
      null != checked && (element.checked = checked && "function" !== typeof checked && "symbol" !== typeof checked);
      null != name && "function" !== typeof name && "symbol" !== typeof name && "boolean" !== typeof name ? element.name = "" + getToStringValue(name) : element.removeAttribute("name");
    }
    function initInput(element, value, defaultValue, checked, defaultChecked, type, name, isHydrating2) {
      null != type && "function" !== typeof type && "symbol" !== typeof type && "boolean" !== typeof type && (element.type = type);
      if (null != value || null != defaultValue) {
        if (!("submit" !== type && "reset" !== type || void 0 !== value && null !== value)) {
          track(element);
          return;
        }
        defaultValue = null != defaultValue ? "" + getToStringValue(defaultValue) : "";
        value = null != value ? "" + getToStringValue(value) : defaultValue;
        isHydrating2 || value === element.value || (element.value = value);
        element.defaultValue = value;
      }
      checked = null != checked ? checked : defaultChecked;
      checked = "function" !== typeof checked && "symbol" !== typeof checked && !!checked;
      element.checked = isHydrating2 ? element.checked : !!checked;
      element.defaultChecked = !!checked;
      null != name && "function" !== typeof name && "symbol" !== typeof name && "boolean" !== typeof name && (element.name = name);
      track(element);
    }
    function setDefaultValue(node, type, value) {
      "number" === type && getActiveElement(node.ownerDocument) === node || node.defaultValue === "" + value || (node.defaultValue = "" + value);
    }
    function updateOptions(node, multiple, propValue, setDefaultSelected) {
      node = node.options;
      if (multiple) {
        multiple = {};
        for (var i = 0; i < propValue.length; i++)
          multiple["$" + propValue[i]] = true;
        for (propValue = 0; propValue < node.length; propValue++)
          i = multiple.hasOwnProperty("$" + node[propValue].value), node[propValue].selected !== i && (node[propValue].selected = i), i && setDefaultSelected && (node[propValue].defaultSelected = true);
      } else {
        propValue = "" + getToStringValue(propValue);
        multiple = null;
        for (i = 0; i < node.length; i++) {
          if (node[i].value === propValue) {
            node[i].selected = true;
            setDefaultSelected && (node[i].defaultSelected = true);
            return;
          }
          null !== multiple || node[i].disabled || (multiple = node[i]);
        }
        null !== multiple && (multiple.selected = true);
      }
    }
    function updateTextarea(element, value, defaultValue) {
      if (null != value && (value = "" + getToStringValue(value), value !== element.value && (element.value = value), null == defaultValue)) {
        element.defaultValue !== value && (element.defaultValue = value);
        return;
      }
      element.defaultValue = null != defaultValue ? "" + getToStringValue(defaultValue) : "";
    }
    function initTextarea(element, value, defaultValue, children) {
      if (null == value) {
        if (null != children) {
          if (null != defaultValue) throw Error(formatProdErrorMessage(92));
          if (isArrayImpl(children)) {
            if (1 < children.length) throw Error(formatProdErrorMessage(93));
            children = children[0];
          }
          defaultValue = children;
        }
        null == defaultValue && (defaultValue = "");
        value = defaultValue;
      }
      defaultValue = getToStringValue(value);
      element.defaultValue = defaultValue;
      children = element.textContent;
      children === defaultValue && "" !== children && null !== children && (element.value = children);
      track(element);
    }
    function setTextContent(node, text) {
      if (text) {
        var firstChild = node.firstChild;
        if (firstChild && firstChild === node.lastChild && 3 === firstChild.nodeType) {
          firstChild.nodeValue = text;
          return;
        }
      }
      node.textContent = text;
    }
    var unitlessNumbers = new Set(
      "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
        " "
      )
    );
    function setValueForStyle(style2, styleName, value) {
      var isCustomProperty = 0 === styleName.indexOf("--");
      null == value || "boolean" === typeof value || "" === value ? isCustomProperty ? style2.setProperty(styleName, "") : "float" === styleName ? style2.cssFloat = "" : style2[styleName] = "" : isCustomProperty ? style2.setProperty(styleName, value) : "number" !== typeof value || 0 === value || unitlessNumbers.has(styleName) ? "float" === styleName ? style2.cssFloat = value : style2[styleName] = ("" + value).trim() : style2[styleName] = value + "px";
    }
    function setValueForStyles(node, styles2, prevStyles) {
      if (null != styles2 && "object" !== typeof styles2)
        throw Error(formatProdErrorMessage(62));
      node = node.style;
      if (null != prevStyles) {
        for (var styleName in prevStyles)
          !prevStyles.hasOwnProperty(styleName) || null != styles2 && styles2.hasOwnProperty(styleName) || (0 === styleName.indexOf("--") ? node.setProperty(styleName, "") : "float" === styleName ? node.cssFloat = "" : node[styleName] = "");
        for (var styleName$16 in styles2)
          styleName = styles2[styleName$16], styles2.hasOwnProperty(styleName$16) && prevStyles[styleName$16] !== styleName && setValueForStyle(node, styleName$16, styleName);
      } else
        for (var styleName$17 in styles2)
          styles2.hasOwnProperty(styleName$17) && setValueForStyle(node, styleName$17, styles2[styleName$17]);
    }
    function isCustomElement(tagName) {
      if (-1 === tagName.indexOf("-")) return false;
      switch (tagName) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return false;
        default:
          return true;
      }
    }
    var aliases = /* @__PURE__ */ new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"]
    ]), isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
    function sanitizeURL(url) {
      return isJavaScriptProtocol.test("" + url) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : url;
    }
    function noop$1() {
    }
    var currentReplayingEvent = null;
    function getEventTarget(nativeEvent) {
      nativeEvent = nativeEvent.target || nativeEvent.srcElement || window;
      nativeEvent.correspondingUseElement && (nativeEvent = nativeEvent.correspondingUseElement);
      return 3 === nativeEvent.nodeType ? nativeEvent.parentNode : nativeEvent;
    }
    var restoreTarget = null, restoreQueue = null;
    function restoreStateOfTarget(target) {
      var internalInstance = getInstanceFromNode(target);
      if (internalInstance && (target = internalInstance.stateNode)) {
        var props = target[internalPropsKey] || null;
        a: switch (target = internalInstance.stateNode, internalInstance.type) {
          case "input":
            updateInput(
              target,
              props.value,
              props.defaultValue,
              props.defaultValue,
              props.checked,
              props.defaultChecked,
              props.type,
              props.name
            );
            internalInstance = props.name;
            if ("radio" === props.type && null != internalInstance) {
              for (props = target; props.parentNode; ) props = props.parentNode;
              props = props.querySelectorAll(
                'input[name="' + escapeSelectorAttributeValueInsideDoubleQuotes(
                  "" + internalInstance
                ) + '"][type="radio"]'
              );
              for (internalInstance = 0; internalInstance < props.length; internalInstance++) {
                var otherNode = props[internalInstance];
                if (otherNode !== target && otherNode.form === target.form) {
                  var otherProps = otherNode[internalPropsKey] || null;
                  if (!otherProps) throw Error(formatProdErrorMessage(90));
                  updateInput(
                    otherNode,
                    otherProps.value,
                    otherProps.defaultValue,
                    otherProps.defaultValue,
                    otherProps.checked,
                    otherProps.defaultChecked,
                    otherProps.type,
                    otherProps.name
                  );
                }
              }
              for (internalInstance = 0; internalInstance < props.length; internalInstance++)
                otherNode = props[internalInstance], otherNode.form === target.form && updateValueIfChanged(otherNode);
            }
            break a;
          case "textarea":
            updateTextarea(target, props.value, props.defaultValue);
            break a;
          case "select":
            internalInstance = props.value, null != internalInstance && updateOptions(target, !!props.multiple, internalInstance, false);
        }
      }
    }
    var isInsideEventHandler = false;
    function batchedUpdates$1(fn, a, b) {
      if (isInsideEventHandler) return fn(a, b);
      isInsideEventHandler = true;
      try {
        var JSCompiler_inline_result = fn(a);
        return JSCompiler_inline_result;
      } finally {
        if (isInsideEventHandler = false, null !== restoreTarget || null !== restoreQueue) {
          if (flushSyncWork$1(), restoreTarget && (a = restoreTarget, fn = restoreQueue, restoreQueue = restoreTarget = null, restoreStateOfTarget(a), fn))
            for (a = 0; a < fn.length; a++) restoreStateOfTarget(fn[a]);
        }
      }
    }
    function getListener(inst, registrationName) {
      var stateNode = inst.stateNode;
      if (null === stateNode) return null;
      var props = stateNode[internalPropsKey] || null;
      if (null === props) return null;
      stateNode = props[registrationName];
      a: switch (registrationName) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
          (props = !props.disabled) || (inst = inst.type, props = !("button" === inst || "input" === inst || "select" === inst || "textarea" === inst));
          inst = !props;
          break a;
        default:
          inst = false;
      }
      if (inst) return null;
      if (stateNode && "function" !== typeof stateNode)
        throw Error(
          formatProdErrorMessage(231, registrationName, typeof stateNode)
        );
      return stateNode;
    }
    var canUseDOM = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), passiveBrowserEventsSupported = false;
    if (canUseDOM)
      try {
        var options = {};
        Object.defineProperty(options, "passive", {
          get: function() {
            passiveBrowserEventsSupported = true;
          }
        });
        window.addEventListener("test", options, options);
        window.removeEventListener("test", options, options);
      } catch (e) {
        passiveBrowserEventsSupported = false;
      }
    var root2 = null, startText = null, fallbackText = null;
    function getData() {
      if (fallbackText) return fallbackText;
      var start, startValue = startText, startLength = startValue.length, end, endValue = "value" in root2 ? root2.value : root2.textContent, endLength = endValue.length;
      for (start = 0; start < startLength && startValue[start] === endValue[start]; start++) ;
      var minEnd = startLength - start;
      for (end = 1; end <= minEnd && startValue[startLength - end] === endValue[endLength - end]; end++) ;
      return fallbackText = endValue.slice(start, 1 < end ? 1 - end : void 0);
    }
    function getEventCharCode(nativeEvent) {
      var keyCode = nativeEvent.keyCode;
      "charCode" in nativeEvent ? (nativeEvent = nativeEvent.charCode, 0 === nativeEvent && 13 === keyCode && (nativeEvent = 13)) : nativeEvent = keyCode;
      10 === nativeEvent && (nativeEvent = 13);
      return 32 <= nativeEvent || 13 === nativeEvent ? nativeEvent : 0;
    }
    function functionThatReturnsTrue() {
      return true;
    }
    function functionThatReturnsFalse() {
      return false;
    }
    function createSyntheticEvent(Interface) {
      function SyntheticBaseEvent(reactName, reactEventType, targetInst, nativeEvent, nativeEventTarget) {
        this._reactName = reactName;
        this._targetInst = targetInst;
        this.type = reactEventType;
        this.nativeEvent = nativeEvent;
        this.target = nativeEventTarget;
        this.currentTarget = null;
        for (var propName in Interface)
          Interface.hasOwnProperty(propName) && (reactName = Interface[propName], this[propName] = reactName ? reactName(nativeEvent) : nativeEvent[propName]);
        this.isDefaultPrevented = (null != nativeEvent.defaultPrevented ? nativeEvent.defaultPrevented : false === nativeEvent.returnValue) ? functionThatReturnsTrue : functionThatReturnsFalse;
        this.isPropagationStopped = functionThatReturnsFalse;
        return this;
      }
      assign(SyntheticBaseEvent.prototype, {
        preventDefault: function() {
          this.defaultPrevented = true;
          var event = this.nativeEvent;
          event && (event.preventDefault ? event.preventDefault() : "unknown" !== typeof event.returnValue && (event.returnValue = false), this.isDefaultPrevented = functionThatReturnsTrue);
        },
        stopPropagation: function() {
          var event = this.nativeEvent;
          event && (event.stopPropagation ? event.stopPropagation() : "unknown" !== typeof event.cancelBubble && (event.cancelBubble = true), this.isPropagationStopped = functionThatReturnsTrue);
        },
        persist: function() {
        },
        isPersistent: functionThatReturnsTrue
      });
      return SyntheticBaseEvent;
    }
    var EventInterface = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(event) {
        return event.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    }, SyntheticEvent = createSyntheticEvent(EventInterface), UIEventInterface = assign({}, EventInterface, { view: 0, detail: 0 }), SyntheticUIEvent = createSyntheticEvent(UIEventInterface), lastMovementX, lastMovementY, lastMouseEvent, MouseEventInterface = assign({}, UIEventInterface, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: getEventModifierState,
      button: 0,
      buttons: 0,
      relatedTarget: function(event) {
        return void 0 === event.relatedTarget ? event.fromElement === event.srcElement ? event.toElement : event.fromElement : event.relatedTarget;
      },
      movementX: function(event) {
        if ("movementX" in event) return event.movementX;
        event !== lastMouseEvent && (lastMouseEvent && "mousemove" === event.type ? (lastMovementX = event.screenX - lastMouseEvent.screenX, lastMovementY = event.screenY - lastMouseEvent.screenY) : lastMovementY = lastMovementX = 0, lastMouseEvent = event);
        return lastMovementX;
      },
      movementY: function(event) {
        return "movementY" in event ? event.movementY : lastMovementY;
      }
    }), SyntheticMouseEvent = createSyntheticEvent(MouseEventInterface), DragEventInterface = assign({}, MouseEventInterface, { dataTransfer: 0 }), SyntheticDragEvent = createSyntheticEvent(DragEventInterface), FocusEventInterface = assign({}, UIEventInterface, { relatedTarget: 0 }), SyntheticFocusEvent = createSyntheticEvent(FocusEventInterface), AnimationEventInterface = assign({}, EventInterface, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), SyntheticAnimationEvent = createSyntheticEvent(AnimationEventInterface), ClipboardEventInterface = assign({}, EventInterface, {
      clipboardData: function(event) {
        return "clipboardData" in event ? event.clipboardData : window.clipboardData;
      }
    }), SyntheticClipboardEvent = createSyntheticEvent(ClipboardEventInterface), CompositionEventInterface = assign({}, EventInterface, { data: 0 }), SyntheticCompositionEvent = createSyntheticEvent(CompositionEventInterface), normalizeKey = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified"
    }, translateToKey = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta"
    }, modifierKeyToProp = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
    function modifierStateGetter(keyArg) {
      var nativeEvent = this.nativeEvent;
      return nativeEvent.getModifierState ? nativeEvent.getModifierState(keyArg) : (keyArg = modifierKeyToProp[keyArg]) ? !!nativeEvent[keyArg] : false;
    }
    function getEventModifierState() {
      return modifierStateGetter;
    }
    var KeyboardEventInterface = assign({}, UIEventInterface, {
      key: function(nativeEvent) {
        if (nativeEvent.key) {
          var key = normalizeKey[nativeEvent.key] || nativeEvent.key;
          if ("Unidentified" !== key) return key;
        }
        return "keypress" === nativeEvent.type ? (nativeEvent = getEventCharCode(nativeEvent), 13 === nativeEvent ? "Enter" : String.fromCharCode(nativeEvent)) : "keydown" === nativeEvent.type || "keyup" === nativeEvent.type ? translateToKey[nativeEvent.keyCode] || "Unidentified" : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: getEventModifierState,
      charCode: function(event) {
        return "keypress" === event.type ? getEventCharCode(event) : 0;
      },
      keyCode: function(event) {
        return "keydown" === event.type || "keyup" === event.type ? event.keyCode : 0;
      },
      which: function(event) {
        return "keypress" === event.type ? getEventCharCode(event) : "keydown" === event.type || "keyup" === event.type ? event.keyCode : 0;
      }
    }), SyntheticKeyboardEvent = createSyntheticEvent(KeyboardEventInterface), PointerEventInterface = assign({}, MouseEventInterface, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0
    }), SyntheticPointerEvent = createSyntheticEvent(PointerEventInterface), TouchEventInterface = assign({}, UIEventInterface, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: getEventModifierState
    }), SyntheticTouchEvent = createSyntheticEvent(TouchEventInterface), TransitionEventInterface = assign({}, EventInterface, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), SyntheticTransitionEvent = createSyntheticEvent(TransitionEventInterface), WheelEventInterface = assign({}, MouseEventInterface, {
      deltaX: function(event) {
        return "deltaX" in event ? event.deltaX : "wheelDeltaX" in event ? -event.wheelDeltaX : 0;
      },
      deltaY: function(event) {
        return "deltaY" in event ? event.deltaY : "wheelDeltaY" in event ? -event.wheelDeltaY : "wheelDelta" in event ? -event.wheelDelta : 0;
      },
      deltaZ: 0,
      deltaMode: 0
    }), SyntheticWheelEvent = createSyntheticEvent(WheelEventInterface), ToggleEventInterface = assign({}, EventInterface, {
      newState: 0,
      oldState: 0
    }), SyntheticToggleEvent = createSyntheticEvent(ToggleEventInterface), END_KEYCODES = [9, 13, 27, 32], canUseCompositionEvent = canUseDOM && "CompositionEvent" in window, documentMode = null;
    canUseDOM && "documentMode" in document && (documentMode = document.documentMode);
    var canUseTextInputEvent = canUseDOM && "TextEvent" in window && !documentMode, useFallbackCompositionData = canUseDOM && (!canUseCompositionEvent || documentMode && 8 < documentMode && 11 >= documentMode), SPACEBAR_CHAR = String.fromCharCode(32), hasSpaceKeypress = false;
    function isFallbackCompositionEnd(domEventName, nativeEvent) {
      switch (domEventName) {
        case "keyup":
          return -1 !== END_KEYCODES.indexOf(nativeEvent.keyCode);
        case "keydown":
          return 229 !== nativeEvent.keyCode;
        case "keypress":
        case "mousedown":
        case "focusout":
          return true;
        default:
          return false;
      }
    }
    function getDataFromCustomEvent(nativeEvent) {
      nativeEvent = nativeEvent.detail;
      return "object" === typeof nativeEvent && "data" in nativeEvent ? nativeEvent.data : null;
    }
    var isComposing = false;
    function getNativeBeforeInputChars(domEventName, nativeEvent) {
      switch (domEventName) {
        case "compositionend":
          return getDataFromCustomEvent(nativeEvent);
        case "keypress":
          if (32 !== nativeEvent.which) return null;
          hasSpaceKeypress = true;
          return SPACEBAR_CHAR;
        case "textInput":
          return domEventName = nativeEvent.data, domEventName === SPACEBAR_CHAR && hasSpaceKeypress ? null : domEventName;
        default:
          return null;
      }
    }
    function getFallbackBeforeInputChars(domEventName, nativeEvent) {
      if (isComposing)
        return "compositionend" === domEventName || !canUseCompositionEvent && isFallbackCompositionEnd(domEventName, nativeEvent) ? (domEventName = getData(), fallbackText = startText = root2 = null, isComposing = false, domEventName) : null;
      switch (domEventName) {
        case "paste":
          return null;
        case "keypress":
          if (!(nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) || nativeEvent.ctrlKey && nativeEvent.altKey) {
            if (nativeEvent.char && 1 < nativeEvent.char.length)
              return nativeEvent.char;
            if (nativeEvent.which) return String.fromCharCode(nativeEvent.which);
          }
          return null;
        case "compositionend":
          return useFallbackCompositionData && "ko" !== nativeEvent.locale ? null : nativeEvent.data;
        default:
          return null;
      }
    }
    var supportedInputTypes = {
      color: true,
      date: true,
      datetime: true,
      "datetime-local": true,
      email: true,
      month: true,
      number: true,
      password: true,
      range: true,
      search: true,
      tel: true,
      text: true,
      time: true,
      url: true,
      week: true
    };
    function isTextInputElement(elem) {
      var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
      return "input" === nodeName ? !!supportedInputTypes[elem.type] : "textarea" === nodeName ? true : false;
    }
    function createAndAccumulateChangeEvent(dispatchQueue, inst, nativeEvent, target) {
      restoreTarget ? restoreQueue ? restoreQueue.push(target) : restoreQueue = [target] : restoreTarget = target;
      inst = accumulateTwoPhaseListeners(inst, "onChange");
      0 < inst.length && (nativeEvent = new SyntheticEvent(
        "onChange",
        "change",
        null,
        nativeEvent,
        target
      ), dispatchQueue.push({ event: nativeEvent, listeners: inst }));
    }
    var activeElement$1 = null, activeElementInst$1 = null;
    function runEventInBatch(dispatchQueue) {
      processDispatchQueue(dispatchQueue, 0);
    }
    function getInstIfValueChanged(targetInst) {
      var targetNode = getNodeFromInstance(targetInst);
      if (updateValueIfChanged(targetNode)) return targetInst;
    }
    function getTargetInstForChangeEvent(domEventName, targetInst) {
      if ("change" === domEventName) return targetInst;
    }
    var isInputEventSupported = false;
    if (canUseDOM) {
      var JSCompiler_inline_result$jscomp$286;
      if (canUseDOM) {
        var isSupported$jscomp$inline_427 = "oninput" in document;
        if (!isSupported$jscomp$inline_427) {
          var element$jscomp$inline_428 = document.createElement("div");
          element$jscomp$inline_428.setAttribute("oninput", "return;");
          isSupported$jscomp$inline_427 = "function" === typeof element$jscomp$inline_428.oninput;
        }
        JSCompiler_inline_result$jscomp$286 = isSupported$jscomp$inline_427;
      } else JSCompiler_inline_result$jscomp$286 = false;
      isInputEventSupported = JSCompiler_inline_result$jscomp$286 && (!document.documentMode || 9 < document.documentMode);
    }
    function stopWatchingForValueChange() {
      activeElement$1 && (activeElement$1.detachEvent("onpropertychange", handlePropertyChange), activeElementInst$1 = activeElement$1 = null);
    }
    function handlePropertyChange(nativeEvent) {
      if ("value" === nativeEvent.propertyName && getInstIfValueChanged(activeElementInst$1)) {
        var dispatchQueue = [];
        createAndAccumulateChangeEvent(
          dispatchQueue,
          activeElementInst$1,
          nativeEvent,
          getEventTarget(nativeEvent)
        );
        batchedUpdates$1(runEventInBatch, dispatchQueue);
      }
    }
    function handleEventsForInputEventPolyfill(domEventName, target, targetInst) {
      "focusin" === domEventName ? (stopWatchingForValueChange(), activeElement$1 = target, activeElementInst$1 = targetInst, activeElement$1.attachEvent("onpropertychange", handlePropertyChange)) : "focusout" === domEventName && stopWatchingForValueChange();
    }
    function getTargetInstForInputEventPolyfill(domEventName) {
      if ("selectionchange" === domEventName || "keyup" === domEventName || "keydown" === domEventName)
        return getInstIfValueChanged(activeElementInst$1);
    }
    function getTargetInstForClickEvent(domEventName, targetInst) {
      if ("click" === domEventName) return getInstIfValueChanged(targetInst);
    }
    function getTargetInstForInputOrChangeEvent(domEventName, targetInst) {
      if ("input" === domEventName || "change" === domEventName)
        return getInstIfValueChanged(targetInst);
    }
    function is(x, y) {
      return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
    }
    var objectIs = "function" === typeof Object.is ? Object.is : is;
    function shallowEqual(objA, objB) {
      if (objectIs(objA, objB)) return true;
      if ("object" !== typeof objA || null === objA || "object" !== typeof objB || null === objB)
        return false;
      var keysA = Object.keys(objA), keysB = Object.keys(objB);
      if (keysA.length !== keysB.length) return false;
      for (keysB = 0; keysB < keysA.length; keysB++) {
        var currentKey = keysA[keysB];
        if (!hasOwnProperty.call(objB, currentKey) || !objectIs(objA[currentKey], objB[currentKey]))
          return false;
      }
      return true;
    }
    function getLeafNode(node) {
      for (; node && node.firstChild; ) node = node.firstChild;
      return node;
    }
    function getNodeForCharacterOffset(root3, offset) {
      var node = getLeafNode(root3);
      root3 = 0;
      for (var nodeEnd; node; ) {
        if (3 === node.nodeType) {
          nodeEnd = root3 + node.textContent.length;
          if (root3 <= offset && nodeEnd >= offset)
            return { node, offset: offset - root3 };
          root3 = nodeEnd;
        }
        a: {
          for (; node; ) {
            if (node.nextSibling) {
              node = node.nextSibling;
              break a;
            }
            node = node.parentNode;
          }
          node = void 0;
        }
        node = getLeafNode(node);
      }
    }
    function containsNode(outerNode, innerNode) {
      return outerNode && innerNode ? outerNode === innerNode ? true : outerNode && 3 === outerNode.nodeType ? false : innerNode && 3 === innerNode.nodeType ? containsNode(outerNode, innerNode.parentNode) : "contains" in outerNode ? outerNode.contains(innerNode) : outerNode.compareDocumentPosition ? !!(outerNode.compareDocumentPosition(innerNode) & 16) : false : false;
    }
    function getActiveElementDeep(containerInfo) {
      containerInfo = null != containerInfo && null != containerInfo.ownerDocument && null != containerInfo.ownerDocument.defaultView ? containerInfo.ownerDocument.defaultView : window;
      for (var element = getActiveElement(containerInfo.document); element instanceof containerInfo.HTMLIFrameElement; ) {
        try {
          var JSCompiler_inline_result = "string" === typeof element.contentWindow.location.href;
        } catch (err) {
          JSCompiler_inline_result = false;
        }
        if (JSCompiler_inline_result) containerInfo = element.contentWindow;
        else break;
        element = getActiveElement(containerInfo.document);
      }
      return element;
    }
    function hasSelectionCapabilities(elem) {
      var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
      return nodeName && ("input" === nodeName && ("text" === elem.type || "search" === elem.type || "tel" === elem.type || "url" === elem.type || "password" === elem.type) || "textarea" === nodeName || "true" === elem.contentEditable);
    }
    var skipSelectionChangeEvent = canUseDOM && "documentMode" in document && 11 >= document.documentMode, activeElement = null, activeElementInst = null, lastSelection = null, mouseDown = false;
    function constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget) {
      var doc = nativeEventTarget.window === nativeEventTarget ? nativeEventTarget.document : 9 === nativeEventTarget.nodeType ? nativeEventTarget : nativeEventTarget.ownerDocument;
      mouseDown || null == activeElement || activeElement !== getActiveElement(doc) || (doc = activeElement, "selectionStart" in doc && hasSelectionCapabilities(doc) ? doc = { start: doc.selectionStart, end: doc.selectionEnd } : (doc = (doc.ownerDocument && doc.ownerDocument.defaultView || window).getSelection(), doc = {
        anchorNode: doc.anchorNode,
        anchorOffset: doc.anchorOffset,
        focusNode: doc.focusNode,
        focusOffset: doc.focusOffset
      }), lastSelection && shallowEqual(lastSelection, doc) || (lastSelection = doc, doc = accumulateTwoPhaseListeners(activeElementInst, "onSelect"), 0 < doc.length && (nativeEvent = new SyntheticEvent(
        "onSelect",
        "select",
        null,
        nativeEvent,
        nativeEventTarget
      ), dispatchQueue.push({ event: nativeEvent, listeners: doc }), nativeEvent.target = activeElement)));
    }
    function makePrefixMap(styleProp, eventName) {
      var prefixes = {};
      prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
      prefixes["Webkit" + styleProp] = "webkit" + eventName;
      prefixes["Moz" + styleProp] = "moz" + eventName;
      return prefixes;
    }
    var vendorPrefixes = {
      animationend: makePrefixMap("Animation", "AnimationEnd"),
      animationiteration: makePrefixMap("Animation", "AnimationIteration"),
      animationstart: makePrefixMap("Animation", "AnimationStart"),
      transitionrun: makePrefixMap("Transition", "TransitionRun"),
      transitionstart: makePrefixMap("Transition", "TransitionStart"),
      transitioncancel: makePrefixMap("Transition", "TransitionCancel"),
      transitionend: makePrefixMap("Transition", "TransitionEnd")
    }, prefixedEventNames = {}, style = {};
    canUseDOM && (style = document.createElement("div").style, "AnimationEvent" in window || (delete vendorPrefixes.animationend.animation, delete vendorPrefixes.animationiteration.animation, delete vendorPrefixes.animationstart.animation), "TransitionEvent" in window || delete vendorPrefixes.transitionend.transition);
    function getVendorPrefixedEventName(eventName) {
      if (prefixedEventNames[eventName]) return prefixedEventNames[eventName];
      if (!vendorPrefixes[eventName]) return eventName;
      var prefixMap = vendorPrefixes[eventName], styleProp;
      for (styleProp in prefixMap)
        if (prefixMap.hasOwnProperty(styleProp) && styleProp in style)
          return prefixedEventNames[eventName] = prefixMap[styleProp];
      return eventName;
    }
    var ANIMATION_END = getVendorPrefixedEventName("animationend"), ANIMATION_ITERATION = getVendorPrefixedEventName("animationiteration"), ANIMATION_START = getVendorPrefixedEventName("animationstart"), TRANSITION_RUN = getVendorPrefixedEventName("transitionrun"), TRANSITION_START = getVendorPrefixedEventName("transitionstart"), TRANSITION_CANCEL = getVendorPrefixedEventName("transitioncancel"), TRANSITION_END = getVendorPrefixedEventName("transitionend"), topLevelEventsToReactNames = /* @__PURE__ */ new Map(), simpleEventPluginEvents = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " "
    );
    simpleEventPluginEvents.push("scrollEnd");
    function registerSimpleEvent(domEventName, reactName) {
      topLevelEventsToReactNames.set(domEventName, reactName);
      registerTwoPhaseEvent(reactName, [domEventName]);
    }
    var reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
      if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
        var event = new window.ErrorEvent("error", {
          bubbles: true,
          cancelable: true,
          message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
          error
        });
        if (!window.dispatchEvent(event)) return;
      } else if ("object" === typeof process && "function" === typeof process.emit) {
        process.emit("uncaughtException", error);
        return;
      }
      console.error(error);
    }, concurrentQueues = [], concurrentQueuesIndex = 0, concurrentlyUpdatedLanes = 0;
    function finishQueueingConcurrentUpdates() {
      for (var endIndex = concurrentQueuesIndex, i = concurrentlyUpdatedLanes = concurrentQueuesIndex = 0; i < endIndex; ) {
        var fiber = concurrentQueues[i];
        concurrentQueues[i++] = null;
        var queue = concurrentQueues[i];
        concurrentQueues[i++] = null;
        var update = concurrentQueues[i];
        concurrentQueues[i++] = null;
        var lane = concurrentQueues[i];
        concurrentQueues[i++] = null;
        if (null !== queue && null !== update) {
          var pending = queue.pending;
          null === pending ? update.next = update : (update.next = pending.next, pending.next = update);
          queue.pending = update;
        }
        0 !== lane && markUpdateLaneFromFiberToRoot(fiber, update, lane);
      }
    }
    function enqueueUpdate$1(fiber, queue, update, lane) {
      concurrentQueues[concurrentQueuesIndex++] = fiber;
      concurrentQueues[concurrentQueuesIndex++] = queue;
      concurrentQueues[concurrentQueuesIndex++] = update;
      concurrentQueues[concurrentQueuesIndex++] = lane;
      concurrentlyUpdatedLanes |= lane;
      fiber.lanes |= lane;
      fiber = fiber.alternate;
      null !== fiber && (fiber.lanes |= lane);
    }
    function enqueueConcurrentHookUpdate(fiber, queue, update, lane) {
      enqueueUpdate$1(fiber, queue, update, lane);
      return getRootForUpdatedFiber(fiber);
    }
    function enqueueConcurrentRenderForLane(fiber, lane) {
      enqueueUpdate$1(fiber, null, null, lane);
      return getRootForUpdatedFiber(fiber);
    }
    function markUpdateLaneFromFiberToRoot(sourceFiber, update, lane) {
      sourceFiber.lanes |= lane;
      var alternate = sourceFiber.alternate;
      null !== alternate && (alternate.lanes |= lane);
      for (var isHidden = false, parent = sourceFiber.return; null !== parent; )
        parent.childLanes |= lane, alternate = parent.alternate, null !== alternate && (alternate.childLanes |= lane), 22 === parent.tag && (sourceFiber = parent.stateNode, null === sourceFiber || sourceFiber._visibility & 1 || (isHidden = true)), sourceFiber = parent, parent = parent.return;
      return 3 === sourceFiber.tag ? (parent = sourceFiber.stateNode, isHidden && null !== update && (isHidden = 31 - clz32(lane), sourceFiber = parent.hiddenUpdates, alternate = sourceFiber[isHidden], null === alternate ? sourceFiber[isHidden] = [update] : alternate.push(update), update.lane = lane | 536870912), parent) : null;
    }
    function getRootForUpdatedFiber(sourceFiber) {
      if (50 < nestedUpdateCount)
        throw nestedUpdateCount = 0, rootWithNestedUpdates = null, Error(formatProdErrorMessage(185));
      for (var parent = sourceFiber.return; null !== parent; )
        sourceFiber = parent, parent = sourceFiber.return;
      return 3 === sourceFiber.tag ? sourceFiber.stateNode : null;
    }
    var emptyContextObject = {};
    function FiberNode(tag, pendingProps, key, mode) {
      this.tag = tag;
      this.key = key;
      this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
      this.index = 0;
      this.refCleanup = this.ref = null;
      this.pendingProps = pendingProps;
      this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
      this.mode = mode;
      this.subtreeFlags = this.flags = 0;
      this.deletions = null;
      this.childLanes = this.lanes = 0;
      this.alternate = null;
    }
    function createFiberImplClass(tag, pendingProps, key, mode) {
      return new FiberNode(tag, pendingProps, key, mode);
    }
    function shouldConstruct(Component) {
      Component = Component.prototype;
      return !(!Component || !Component.isReactComponent);
    }
    function createWorkInProgress(current, pendingProps) {
      var workInProgress2 = current.alternate;
      null === workInProgress2 ? (workInProgress2 = createFiberImplClass(
        current.tag,
        pendingProps,
        current.key,
        current.mode
      ), workInProgress2.elementType = current.elementType, workInProgress2.type = current.type, workInProgress2.stateNode = current.stateNode, workInProgress2.alternate = current, current.alternate = workInProgress2) : (workInProgress2.pendingProps = pendingProps, workInProgress2.type = current.type, workInProgress2.flags = 0, workInProgress2.subtreeFlags = 0, workInProgress2.deletions = null);
      workInProgress2.flags = current.flags & 65011712;
      workInProgress2.childLanes = current.childLanes;
      workInProgress2.lanes = current.lanes;
      workInProgress2.child = current.child;
      workInProgress2.memoizedProps = current.memoizedProps;
      workInProgress2.memoizedState = current.memoizedState;
      workInProgress2.updateQueue = current.updateQueue;
      pendingProps = current.dependencies;
      workInProgress2.dependencies = null === pendingProps ? null : { lanes: pendingProps.lanes, firstContext: pendingProps.firstContext };
      workInProgress2.sibling = current.sibling;
      workInProgress2.index = current.index;
      workInProgress2.ref = current.ref;
      workInProgress2.refCleanup = current.refCleanup;
      return workInProgress2;
    }
    function resetWorkInProgress(workInProgress2, renderLanes2) {
      workInProgress2.flags &= 65011714;
      var current = workInProgress2.alternate;
      null === current ? (workInProgress2.childLanes = 0, workInProgress2.lanes = renderLanes2, workInProgress2.child = null, workInProgress2.subtreeFlags = 0, workInProgress2.memoizedProps = null, workInProgress2.memoizedState = null, workInProgress2.updateQueue = null, workInProgress2.dependencies = null, workInProgress2.stateNode = null) : (workInProgress2.childLanes = current.childLanes, workInProgress2.lanes = current.lanes, workInProgress2.child = current.child, workInProgress2.subtreeFlags = 0, workInProgress2.deletions = null, workInProgress2.memoizedProps = current.memoizedProps, workInProgress2.memoizedState = current.memoizedState, workInProgress2.updateQueue = current.updateQueue, workInProgress2.type = current.type, renderLanes2 = current.dependencies, workInProgress2.dependencies = null === renderLanes2 ? null : {
        lanes: renderLanes2.lanes,
        firstContext: renderLanes2.firstContext
      });
      return workInProgress2;
    }
    function createFiberFromTypeAndProps(type, key, pendingProps, owner, mode, lanes) {
      var fiberTag = 0;
      owner = type;
      if ("function" === typeof type) shouldConstruct(type) && (fiberTag = 1);
      else if ("string" === typeof type)
        fiberTag = isHostHoistableType(
          type,
          pendingProps,
          contextStackCursor.current
        ) ? 26 : "html" === type || "head" === type || "body" === type ? 27 : 5;
      else
        a: switch (type) {
          case REACT_ACTIVITY_TYPE:
            return type = createFiberImplClass(31, pendingProps, key, mode), type.elementType = REACT_ACTIVITY_TYPE, type.lanes = lanes, type;
          case REACT_FRAGMENT_TYPE:
            return createFiberFromFragment(pendingProps.children, mode, lanes, key);
          case REACT_STRICT_MODE_TYPE:
            fiberTag = 8;
            mode |= 24;
            break;
          case REACT_PROFILER_TYPE:
            return type = createFiberImplClass(12, pendingProps, key, mode | 2), type.elementType = REACT_PROFILER_TYPE, type.lanes = lanes, type;
          case REACT_SUSPENSE_TYPE:
            return type = createFiberImplClass(13, pendingProps, key, mode), type.elementType = REACT_SUSPENSE_TYPE, type.lanes = lanes, type;
          case REACT_SUSPENSE_LIST_TYPE:
            return type = createFiberImplClass(19, pendingProps, key, mode), type.elementType = REACT_SUSPENSE_LIST_TYPE, type.lanes = lanes, type;
          default:
            if ("object" === typeof type && null !== type)
              switch (type.$$typeof) {
                case REACT_CONTEXT_TYPE:
                  fiberTag = 10;
                  break a;
                case REACT_CONSUMER_TYPE:
                  fiberTag = 9;
                  break a;
                case REACT_FORWARD_REF_TYPE:
                  fiberTag = 11;
                  break a;
                case REACT_MEMO_TYPE:
                  fiberTag = 14;
                  break a;
                case REACT_LAZY_TYPE:
                  fiberTag = 16;
                  owner = null;
                  break a;
              }
            fiberTag = 29;
            pendingProps = Error(
              formatProdErrorMessage(130, null === type ? "null" : typeof type, "")
            );
            owner = null;
        }
      key = createFiberImplClass(fiberTag, pendingProps, key, mode);
      key.elementType = type;
      key.type = owner;
      key.lanes = lanes;
      return key;
    }
    function createFiberFromFragment(elements, mode, lanes, key) {
      elements = createFiberImplClass(7, elements, key, mode);
      elements.lanes = lanes;
      return elements;
    }
    function createFiberFromText(content, mode, lanes) {
      content = createFiberImplClass(6, content, null, mode);
      content.lanes = lanes;
      return content;
    }
    function createFiberFromDehydratedFragment(dehydratedNode) {
      var fiber = createFiberImplClass(18, null, null, 0);
      fiber.stateNode = dehydratedNode;
      return fiber;
    }
    function createFiberFromPortal(portal, mode, lanes) {
      mode = createFiberImplClass(
        4,
        null !== portal.children ? portal.children : [],
        portal.key,
        mode
      );
      mode.lanes = lanes;
      mode.stateNode = {
        containerInfo: portal.containerInfo,
        pendingChildren: null,
        implementation: portal.implementation
      };
      return mode;
    }
    var CapturedStacks = /* @__PURE__ */ new WeakMap();
    function createCapturedValueAtFiber(value, source) {
      if ("object" === typeof value && null !== value) {
        var existing = CapturedStacks.get(value);
        if (void 0 !== existing) return existing;
        source = {
          value,
          source,
          stack: getStackByFiberInDevAndProd(source)
        };
        CapturedStacks.set(value, source);
        return source;
      }
      return {
        value,
        source,
        stack: getStackByFiberInDevAndProd(source)
      };
    }
    var forkStack = [], forkStackIndex = 0, treeForkProvider = null, treeForkCount = 0, idStack = [], idStackIndex = 0, treeContextProvider = null, treeContextId = 1, treeContextOverflow = "";
    function pushTreeFork(workInProgress2, totalChildren) {
      forkStack[forkStackIndex++] = treeForkCount;
      forkStack[forkStackIndex++] = treeForkProvider;
      treeForkProvider = workInProgress2;
      treeForkCount = totalChildren;
    }
    function pushTreeId(workInProgress2, totalChildren, index2) {
      idStack[idStackIndex++] = treeContextId;
      idStack[idStackIndex++] = treeContextOverflow;
      idStack[idStackIndex++] = treeContextProvider;
      treeContextProvider = workInProgress2;
      var baseIdWithLeadingBit = treeContextId;
      workInProgress2 = treeContextOverflow;
      var baseLength = 32 - clz32(baseIdWithLeadingBit) - 1;
      baseIdWithLeadingBit &= ~(1 << baseLength);
      index2 += 1;
      var length = 32 - clz32(totalChildren) + baseLength;
      if (30 < length) {
        var numberOfOverflowBits = baseLength - baseLength % 5;
        length = (baseIdWithLeadingBit & (1 << numberOfOverflowBits) - 1).toString(32);
        baseIdWithLeadingBit >>= numberOfOverflowBits;
        baseLength -= numberOfOverflowBits;
        treeContextId = 1 << 32 - clz32(totalChildren) + baseLength | index2 << baseLength | baseIdWithLeadingBit;
        treeContextOverflow = length + workInProgress2;
      } else
        treeContextId = 1 << length | index2 << baseLength | baseIdWithLeadingBit, treeContextOverflow = workInProgress2;
    }
    function pushMaterializedTreeId(workInProgress2) {
      null !== workInProgress2.return && (pushTreeFork(workInProgress2, 1), pushTreeId(workInProgress2, 1, 0));
    }
    function popTreeContext(workInProgress2) {
      for (; workInProgress2 === treeForkProvider; )
        treeForkProvider = forkStack[--forkStackIndex], forkStack[forkStackIndex] = null, treeForkCount = forkStack[--forkStackIndex], forkStack[forkStackIndex] = null;
      for (; workInProgress2 === treeContextProvider; )
        treeContextProvider = idStack[--idStackIndex], idStack[idStackIndex] = null, treeContextOverflow = idStack[--idStackIndex], idStack[idStackIndex] = null, treeContextId = idStack[--idStackIndex], idStack[idStackIndex] = null;
    }
    function restoreSuspendedTreeContext(workInProgress2, suspendedContext) {
      idStack[idStackIndex++] = treeContextId;
      idStack[idStackIndex++] = treeContextOverflow;
      idStack[idStackIndex++] = treeContextProvider;
      treeContextId = suspendedContext.id;
      treeContextOverflow = suspendedContext.overflow;
      treeContextProvider = workInProgress2;
    }
    var hydrationParentFiber = null, nextHydratableInstance = null, isHydrating = false, hydrationErrors = null, rootOrSingletonContext = false, HydrationMismatchException = Error(formatProdErrorMessage(519));
    function throwOnHydrationMismatch(fiber) {
      var error = Error(
        formatProdErrorMessage(
          418,
          1 < arguments.length && void 0 !== arguments[1] && arguments[1] ? "text" : "HTML",
          ""
        )
      );
      queueHydrationError(createCapturedValueAtFiber(error, fiber));
      throw HydrationMismatchException;
    }
    function prepareToHydrateHostInstance(fiber) {
      var instance = fiber.stateNode, type = fiber.type, props = fiber.memoizedProps;
      instance[internalInstanceKey] = fiber;
      instance[internalPropsKey] = props;
      switch (type) {
        case "dialog":
          listenToNonDelegatedEvent("cancel", instance);
          listenToNonDelegatedEvent("close", instance);
          break;
        case "iframe":
        case "object":
        case "embed":
          listenToNonDelegatedEvent("load", instance);
          break;
        case "video":
        case "audio":
          for (type = 0; type < mediaEventTypes.length; type++)
            listenToNonDelegatedEvent(mediaEventTypes[type], instance);
          break;
        case "source":
          listenToNonDelegatedEvent("error", instance);
          break;
        case "img":
        case "image":
        case "link":
          listenToNonDelegatedEvent("error", instance);
          listenToNonDelegatedEvent("load", instance);
          break;
        case "details":
          listenToNonDelegatedEvent("toggle", instance);
          break;
        case "input":
          listenToNonDelegatedEvent("invalid", instance);
          initInput(
            instance,
            props.value,
            props.defaultValue,
            props.checked,
            props.defaultChecked,
            props.type,
            props.name,
            true
          );
          break;
        case "select":
          listenToNonDelegatedEvent("invalid", instance);
          break;
        case "textarea":
          listenToNonDelegatedEvent("invalid", instance), initTextarea(instance, props.value, props.defaultValue, props.children);
      }
      type = props.children;
      "string" !== typeof type && "number" !== typeof type && "bigint" !== typeof type || instance.textContent === "" + type || true === props.suppressHydrationWarning || checkForUnmatchedText(instance.textContent, type) ? (null != props.popover && (listenToNonDelegatedEvent("beforetoggle", instance), listenToNonDelegatedEvent("toggle", instance)), null != props.onScroll && listenToNonDelegatedEvent("scroll", instance), null != props.onScrollEnd && listenToNonDelegatedEvent("scrollend", instance), null != props.onClick && (instance.onclick = noop$1), instance = true) : instance = false;
      instance || throwOnHydrationMismatch(fiber, true);
    }
    function popToNextHostParent(fiber) {
      for (hydrationParentFiber = fiber.return; hydrationParentFiber; )
        switch (hydrationParentFiber.tag) {
          case 5:
          case 31:
          case 13:
            rootOrSingletonContext = false;
            return;
          case 27:
          case 3:
            rootOrSingletonContext = true;
            return;
          default:
            hydrationParentFiber = hydrationParentFiber.return;
        }
    }
    function popHydrationState(fiber) {
      if (fiber !== hydrationParentFiber) return false;
      if (!isHydrating) return popToNextHostParent(fiber), isHydrating = true, false;
      var tag = fiber.tag, JSCompiler_temp;
      if (JSCompiler_temp = 3 !== tag && 27 !== tag) {
        if (JSCompiler_temp = 5 === tag)
          JSCompiler_temp = fiber.type, JSCompiler_temp = !("form" !== JSCompiler_temp && "button" !== JSCompiler_temp) || shouldSetTextContent(fiber.type, fiber.memoizedProps);
        JSCompiler_temp = !JSCompiler_temp;
      }
      JSCompiler_temp && nextHydratableInstance && throwOnHydrationMismatch(fiber);
      popToNextHostParent(fiber);
      if (13 === tag) {
        fiber = fiber.memoizedState;
        fiber = null !== fiber ? fiber.dehydrated : null;
        if (!fiber) throw Error(formatProdErrorMessage(317));
        nextHydratableInstance = getNextHydratableInstanceAfterHydrationBoundary(fiber);
      } else if (31 === tag) {
        fiber = fiber.memoizedState;
        fiber = null !== fiber ? fiber.dehydrated : null;
        if (!fiber) throw Error(formatProdErrorMessage(317));
        nextHydratableInstance = getNextHydratableInstanceAfterHydrationBoundary(fiber);
      } else
        27 === tag ? (tag = nextHydratableInstance, isSingletonScope(fiber.type) ? (fiber = previousHydratableOnEnteringScopedSingleton, previousHydratableOnEnteringScopedSingleton = null, nextHydratableInstance = fiber) : nextHydratableInstance = tag) : nextHydratableInstance = hydrationParentFiber ? getNextHydratable(fiber.stateNode.nextSibling) : null;
      return true;
    }
    function resetHydrationState() {
      nextHydratableInstance = hydrationParentFiber = null;
      isHydrating = false;
    }
    function upgradeHydrationErrorsToRecoverable() {
      var queuedErrors = hydrationErrors;
      null !== queuedErrors && (null === workInProgressRootRecoverableErrors ? workInProgressRootRecoverableErrors = queuedErrors : workInProgressRootRecoverableErrors.push.apply(
        workInProgressRootRecoverableErrors,
        queuedErrors
      ), hydrationErrors = null);
      return queuedErrors;
    }
    function queueHydrationError(error) {
      null === hydrationErrors ? hydrationErrors = [error] : hydrationErrors.push(error);
    }
    var valueCursor = createCursor(null), currentlyRenderingFiber$1 = null, lastContextDependency = null;
    function pushProvider(providerFiber, context, nextValue) {
      push(valueCursor, context._currentValue);
      context._currentValue = nextValue;
    }
    function popProvider(context) {
      context._currentValue = valueCursor.current;
      pop(valueCursor);
    }
    function scheduleContextWorkOnParentPath(parent, renderLanes2, propagationRoot) {
      for (; null !== parent; ) {
        var alternate = parent.alternate;
        (parent.childLanes & renderLanes2) !== renderLanes2 ? (parent.childLanes |= renderLanes2, null !== alternate && (alternate.childLanes |= renderLanes2)) : null !== alternate && (alternate.childLanes & renderLanes2) !== renderLanes2 && (alternate.childLanes |= renderLanes2);
        if (parent === propagationRoot) break;
        parent = parent.return;
      }
    }
    function propagateContextChanges(workInProgress2, contexts, renderLanes2, forcePropagateEntireTree) {
      var fiber = workInProgress2.child;
      null !== fiber && (fiber.return = workInProgress2);
      for (; null !== fiber; ) {
        var list = fiber.dependencies;
        if (null !== list) {
          var nextFiber = fiber.child;
          list = list.firstContext;
          a: for (; null !== list; ) {
            var dependency = list;
            list = fiber;
            for (var i = 0; i < contexts.length; i++)
              if (dependency.context === contexts[i]) {
                list.lanes |= renderLanes2;
                dependency = list.alternate;
                null !== dependency && (dependency.lanes |= renderLanes2);
                scheduleContextWorkOnParentPath(
                  list.return,
                  renderLanes2,
                  workInProgress2
                );
                forcePropagateEntireTree || (nextFiber = null);
                break a;
              }
            list = dependency.next;
          }
        } else if (18 === fiber.tag) {
          nextFiber = fiber.return;
          if (null === nextFiber) throw Error(formatProdErrorMessage(341));
          nextFiber.lanes |= renderLanes2;
          list = nextFiber.alternate;
          null !== list && (list.lanes |= renderLanes2);
          scheduleContextWorkOnParentPath(nextFiber, renderLanes2, workInProgress2);
          nextFiber = null;
        } else nextFiber = fiber.child;
        if (null !== nextFiber) nextFiber.return = fiber;
        else
          for (nextFiber = fiber; null !== nextFiber; ) {
            if (nextFiber === workInProgress2) {
              nextFiber = null;
              break;
            }
            fiber = nextFiber.sibling;
            if (null !== fiber) {
              fiber.return = nextFiber.return;
              nextFiber = fiber;
              break;
            }
            nextFiber = nextFiber.return;
          }
        fiber = nextFiber;
      }
    }
    function propagateParentContextChanges(current, workInProgress2, renderLanes2, forcePropagateEntireTree) {
      current = null;
      for (var parent = workInProgress2, isInsidePropagationBailout = false; null !== parent; ) {
        if (!isInsidePropagationBailout) {
          if (0 !== (parent.flags & 524288)) isInsidePropagationBailout = true;
          else if (0 !== (parent.flags & 262144)) break;
        }
        if (10 === parent.tag) {
          var currentParent = parent.alternate;
          if (null === currentParent) throw Error(formatProdErrorMessage(387));
          currentParent = currentParent.memoizedProps;
          if (null !== currentParent) {
            var context = parent.type;
            objectIs(parent.pendingProps.value, currentParent.value) || (null !== current ? current.push(context) : current = [context]);
          }
        } else if (parent === hostTransitionProviderCursor.current) {
          currentParent = parent.alternate;
          if (null === currentParent) throw Error(formatProdErrorMessage(387));
          currentParent.memoizedState.memoizedState !== parent.memoizedState.memoizedState && (null !== current ? current.push(HostTransitionContext) : current = [HostTransitionContext]);
        }
        parent = parent.return;
      }
      null !== current && propagateContextChanges(
        workInProgress2,
        current,
        renderLanes2,
        forcePropagateEntireTree
      );
      workInProgress2.flags |= 262144;
    }
    function checkIfContextChanged(currentDependencies) {
      for (currentDependencies = currentDependencies.firstContext; null !== currentDependencies; ) {
        if (!objectIs(
          currentDependencies.context._currentValue,
          currentDependencies.memoizedValue
        ))
          return true;
        currentDependencies = currentDependencies.next;
      }
      return false;
    }
    function prepareToReadContext(workInProgress2) {
      currentlyRenderingFiber$1 = workInProgress2;
      lastContextDependency = null;
      workInProgress2 = workInProgress2.dependencies;
      null !== workInProgress2 && (workInProgress2.firstContext = null);
    }
    function readContext(context) {
      return readContextForConsumer(currentlyRenderingFiber$1, context);
    }
    function readContextDuringReconciliation(consumer, context) {
      null === currentlyRenderingFiber$1 && prepareToReadContext(consumer);
      return readContextForConsumer(consumer, context);
    }
    function readContextForConsumer(consumer, context) {
      var value = context._currentValue;
      context = { context, memoizedValue: value, next: null };
      if (null === lastContextDependency) {
        if (null === consumer) throw Error(formatProdErrorMessage(308));
        lastContextDependency = context;
        consumer.dependencies = { lanes: 0, firstContext: context };
        consumer.flags |= 524288;
      } else lastContextDependency = lastContextDependency.next = context;
      return value;
    }
    var AbortControllerLocal = "undefined" !== typeof AbortController ? AbortController : function() {
      var listeners = [], signal = this.signal = {
        aborted: false,
        addEventListener: function(type, listener) {
          listeners.push(listener);
        }
      };
      this.abort = function() {
        signal.aborted = true;
        listeners.forEach(function(listener) {
          return listener();
        });
      };
    }, scheduleCallback$2 = Scheduler.unstable_scheduleCallback, NormalPriority = Scheduler.unstable_NormalPriority, CacheContext = {
      $$typeof: REACT_CONTEXT_TYPE,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0
    };
    function createCache() {
      return {
        controller: new AbortControllerLocal(),
        data: /* @__PURE__ */ new Map(),
        refCount: 0
      };
    }
    function releaseCache(cache) {
      cache.refCount--;
      0 === cache.refCount && scheduleCallback$2(NormalPriority, function() {
        cache.controller.abort();
      });
    }
    var currentEntangledListeners = null, currentEntangledPendingCount = 0, currentEntangledLane = 0, currentEntangledActionThenable = null;
    function entangleAsyncAction(transition, thenable) {
      if (null === currentEntangledListeners) {
        var entangledListeners = currentEntangledListeners = [];
        currentEntangledPendingCount = 0;
        currentEntangledLane = requestTransitionLane();
        currentEntangledActionThenable = {
          status: "pending",
          value: void 0,
          then: function(resolve) {
            entangledListeners.push(resolve);
          }
        };
      }
      currentEntangledPendingCount++;
      thenable.then(pingEngtangledActionScope, pingEngtangledActionScope);
      return thenable;
    }
    function pingEngtangledActionScope() {
      if (0 === --currentEntangledPendingCount && null !== currentEntangledListeners) {
        null !== currentEntangledActionThenable && (currentEntangledActionThenable.status = "fulfilled");
        var listeners = currentEntangledListeners;
        currentEntangledListeners = null;
        currentEntangledLane = 0;
        currentEntangledActionThenable = null;
        for (var i = 0; i < listeners.length; i++) (0, listeners[i])();
      }
    }
    function chainThenableValue(thenable, result) {
      var listeners = [], thenableWithOverride = {
        status: "pending",
        value: null,
        reason: null,
        then: function(resolve) {
          listeners.push(resolve);
        }
      };
      thenable.then(
        function() {
          thenableWithOverride.status = "fulfilled";
          thenableWithOverride.value = result;
          for (var i = 0; i < listeners.length; i++) (0, listeners[i])(result);
        },
        function(error) {
          thenableWithOverride.status = "rejected";
          thenableWithOverride.reason = error;
          for (error = 0; error < listeners.length; error++)
            (0, listeners[error])(void 0);
        }
      );
      return thenableWithOverride;
    }
    var prevOnStartTransitionFinish = ReactSharedInternals.S;
    ReactSharedInternals.S = function(transition, returnValue) {
      globalMostRecentTransitionTime = now();
      "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && entangleAsyncAction(transition, returnValue);
      null !== prevOnStartTransitionFinish && prevOnStartTransitionFinish(transition, returnValue);
    };
    var resumedCache = createCursor(null);
    function peekCacheFromPool() {
      var cacheResumedFromPreviousRender = resumedCache.current;
      return null !== cacheResumedFromPreviousRender ? cacheResumedFromPreviousRender : workInProgressRoot.pooledCache;
    }
    function pushTransition(offscreenWorkInProgress, prevCachePool) {
      null === prevCachePool ? push(resumedCache, resumedCache.current) : push(resumedCache, prevCachePool.pool);
    }
    function getSuspendedCache() {
      var cacheFromPool = peekCacheFromPool();
      return null === cacheFromPool ? null : { parent: CacheContext._currentValue, pool: cacheFromPool };
    }
    var SuspenseException = Error(formatProdErrorMessage(460)), SuspenseyCommitException = Error(formatProdErrorMessage(474)), SuspenseActionException = Error(formatProdErrorMessage(542)), noopSuspenseyCommitThenable = { then: function() {
    } };
    function isThenableResolved(thenable) {
      thenable = thenable.status;
      return "fulfilled" === thenable || "rejected" === thenable;
    }
    function trackUsedThenable(thenableState2, thenable, index2) {
      index2 = thenableState2[index2];
      void 0 === index2 ? thenableState2.push(thenable) : index2 !== thenable && (thenable.then(noop$1, noop$1), thenable = index2);
      switch (thenable.status) {
        case "fulfilled":
          return thenable.value;
        case "rejected":
          throw thenableState2 = thenable.reason, checkIfUseWrappedInAsyncCatch(thenableState2), thenableState2;
        default:
          if ("string" === typeof thenable.status) thenable.then(noop$1, noop$1);
          else {
            thenableState2 = workInProgressRoot;
            if (null !== thenableState2 && 100 < thenableState2.shellSuspendCounter)
              throw Error(formatProdErrorMessage(482));
            thenableState2 = thenable;
            thenableState2.status = "pending";
            thenableState2.then(
              function(fulfilledValue) {
                if ("pending" === thenable.status) {
                  var fulfilledThenable = thenable;
                  fulfilledThenable.status = "fulfilled";
                  fulfilledThenable.value = fulfilledValue;
                }
              },
              function(error) {
                if ("pending" === thenable.status) {
                  var rejectedThenable = thenable;
                  rejectedThenable.status = "rejected";
                  rejectedThenable.reason = error;
                }
              }
            );
          }
          switch (thenable.status) {
            case "fulfilled":
              return thenable.value;
            case "rejected":
              throw thenableState2 = thenable.reason, checkIfUseWrappedInAsyncCatch(thenableState2), thenableState2;
          }
          suspendedThenable = thenable;
          throw SuspenseException;
      }
    }
    function resolveLazy(lazyType) {
      try {
        var init = lazyType._init;
        return init(lazyType._payload);
      } catch (x) {
        if (null !== x && "object" === typeof x && "function" === typeof x.then)
          throw suspendedThenable = x, SuspenseException;
        throw x;
      }
    }
    var suspendedThenable = null;
    function getSuspendedThenable() {
      if (null === suspendedThenable) throw Error(formatProdErrorMessage(459));
      var thenable = suspendedThenable;
      suspendedThenable = null;
      return thenable;
    }
    function checkIfUseWrappedInAsyncCatch(rejectedReason) {
      if (rejectedReason === SuspenseException || rejectedReason === SuspenseActionException)
        throw Error(formatProdErrorMessage(483));
    }
    var thenableState$1 = null, thenableIndexCounter$1 = 0;
    function unwrapThenable(thenable) {
      var index2 = thenableIndexCounter$1;
      thenableIndexCounter$1 += 1;
      null === thenableState$1 && (thenableState$1 = []);
      return trackUsedThenable(thenableState$1, thenable, index2);
    }
    function coerceRef(workInProgress2, element) {
      element = element.props.ref;
      workInProgress2.ref = void 0 !== element ? element : null;
    }
    function throwOnInvalidObjectTypeImpl(returnFiber, newChild) {
      if (newChild.$$typeof === REACT_LEGACY_ELEMENT_TYPE)
        throw Error(formatProdErrorMessage(525));
      returnFiber = Object.prototype.toString.call(newChild);
      throw Error(
        formatProdErrorMessage(
          31,
          "[object Object]" === returnFiber ? "object with keys {" + Object.keys(newChild).join(", ") + "}" : returnFiber
        )
      );
    }
    function createChildReconciler(shouldTrackSideEffects) {
      function deleteChild(returnFiber, childToDelete) {
        if (shouldTrackSideEffects) {
          var deletions = returnFiber.deletions;
          null === deletions ? (returnFiber.deletions = [childToDelete], returnFiber.flags |= 16) : deletions.push(childToDelete);
        }
      }
      function deleteRemainingChildren(returnFiber, currentFirstChild) {
        if (!shouldTrackSideEffects) return null;
        for (; null !== currentFirstChild; )
          deleteChild(returnFiber, currentFirstChild), currentFirstChild = currentFirstChild.sibling;
        return null;
      }
      function mapRemainingChildren(currentFirstChild) {
        for (var existingChildren = /* @__PURE__ */ new Map(); null !== currentFirstChild; )
          null !== currentFirstChild.key ? existingChildren.set(currentFirstChild.key, currentFirstChild) : existingChildren.set(currentFirstChild.index, currentFirstChild), currentFirstChild = currentFirstChild.sibling;
        return existingChildren;
      }
      function useFiber(fiber, pendingProps) {
        fiber = createWorkInProgress(fiber, pendingProps);
        fiber.index = 0;
        fiber.sibling = null;
        return fiber;
      }
      function placeChild(newFiber, lastPlacedIndex, newIndex) {
        newFiber.index = newIndex;
        if (!shouldTrackSideEffects)
          return newFiber.flags |= 1048576, lastPlacedIndex;
        newIndex = newFiber.alternate;
        if (null !== newIndex)
          return newIndex = newIndex.index, newIndex < lastPlacedIndex ? (newFiber.flags |= 67108866, lastPlacedIndex) : newIndex;
        newFiber.flags |= 67108866;
        return lastPlacedIndex;
      }
      function placeSingleChild(newFiber) {
        shouldTrackSideEffects && null === newFiber.alternate && (newFiber.flags |= 67108866);
        return newFiber;
      }
      function updateTextNode(returnFiber, current, textContent, lanes) {
        if (null === current || 6 !== current.tag)
          return current = createFiberFromText(textContent, returnFiber.mode, lanes), current.return = returnFiber, current;
        current = useFiber(current, textContent);
        current.return = returnFiber;
        return current;
      }
      function updateElement(returnFiber, current, element, lanes) {
        var elementType = element.type;
        if (elementType === REACT_FRAGMENT_TYPE)
          return updateFragment(
            returnFiber,
            current,
            element.props.children,
            lanes,
            element.key
          );
        if (null !== current && (current.elementType === elementType || "object" === typeof elementType && null !== elementType && elementType.$$typeof === REACT_LAZY_TYPE && resolveLazy(elementType) === current.type))
          return current = useFiber(current, element.props), coerceRef(current, element), current.return = returnFiber, current;
        current = createFiberFromTypeAndProps(
          element.type,
          element.key,
          element.props,
          null,
          returnFiber.mode,
          lanes
        );
        coerceRef(current, element);
        current.return = returnFiber;
        return current;
      }
      function updatePortal(returnFiber, current, portal, lanes) {
        if (null === current || 4 !== current.tag || current.stateNode.containerInfo !== portal.containerInfo || current.stateNode.implementation !== portal.implementation)
          return current = createFiberFromPortal(portal, returnFiber.mode, lanes), current.return = returnFiber, current;
        current = useFiber(current, portal.children || []);
        current.return = returnFiber;
        return current;
      }
      function updateFragment(returnFiber, current, fragment, lanes, key) {
        if (null === current || 7 !== current.tag)
          return current = createFiberFromFragment(
            fragment,
            returnFiber.mode,
            lanes,
            key
          ), current.return = returnFiber, current;
        current = useFiber(current, fragment);
        current.return = returnFiber;
        return current;
      }
      function createChild(returnFiber, newChild, lanes) {
        if ("string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild)
          return newChild = createFiberFromText(
            "" + newChild,
            returnFiber.mode,
            lanes
          ), newChild.return = returnFiber, newChild;
        if ("object" === typeof newChild && null !== newChild) {
          switch (newChild.$$typeof) {
            case REACT_ELEMENT_TYPE:
              return lanes = createFiberFromTypeAndProps(
                newChild.type,
                newChild.key,
                newChild.props,
                null,
                returnFiber.mode,
                lanes
              ), coerceRef(lanes, newChild), lanes.return = returnFiber, lanes;
            case REACT_PORTAL_TYPE:
              return newChild = createFiberFromPortal(
                newChild,
                returnFiber.mode,
                lanes
              ), newChild.return = returnFiber, newChild;
            case REACT_LAZY_TYPE:
              return newChild = resolveLazy(newChild), createChild(returnFiber, newChild, lanes);
          }
          if (isArrayImpl(newChild) || getIteratorFn(newChild))
            return newChild = createFiberFromFragment(
              newChild,
              returnFiber.mode,
              lanes,
              null
            ), newChild.return = returnFiber, newChild;
          if ("function" === typeof newChild.then)
            return createChild(returnFiber, unwrapThenable(newChild), lanes);
          if (newChild.$$typeof === REACT_CONTEXT_TYPE)
            return createChild(
              returnFiber,
              readContextDuringReconciliation(returnFiber, newChild),
              lanes
            );
          throwOnInvalidObjectTypeImpl(returnFiber, newChild);
        }
        return null;
      }
      function updateSlot(returnFiber, oldFiber, newChild, lanes) {
        var key = null !== oldFiber ? oldFiber.key : null;
        if ("string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild)
          return null !== key ? null : updateTextNode(returnFiber, oldFiber, "" + newChild, lanes);
        if ("object" === typeof newChild && null !== newChild) {
          switch (newChild.$$typeof) {
            case REACT_ELEMENT_TYPE:
              return newChild.key === key ? updateElement(returnFiber, oldFiber, newChild, lanes) : null;
            case REACT_PORTAL_TYPE:
              return newChild.key === key ? updatePortal(returnFiber, oldFiber, newChild, lanes) : null;
            case REACT_LAZY_TYPE:
              return newChild = resolveLazy(newChild), updateSlot(returnFiber, oldFiber, newChild, lanes);
          }
          if (isArrayImpl(newChild) || getIteratorFn(newChild))
            return null !== key ? null : updateFragment(returnFiber, oldFiber, newChild, lanes, null);
          if ("function" === typeof newChild.then)
            return updateSlot(
              returnFiber,
              oldFiber,
              unwrapThenable(newChild),
              lanes
            );
          if (newChild.$$typeof === REACT_CONTEXT_TYPE)
            return updateSlot(
              returnFiber,
              oldFiber,
              readContextDuringReconciliation(returnFiber, newChild),
              lanes
            );
          throwOnInvalidObjectTypeImpl(returnFiber, newChild);
        }
        return null;
      }
      function updateFromMap(existingChildren, returnFiber, newIdx, newChild, lanes) {
        if ("string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild)
          return existingChildren = existingChildren.get(newIdx) || null, updateTextNode(returnFiber, existingChildren, "" + newChild, lanes);
        if ("object" === typeof newChild && null !== newChild) {
          switch (newChild.$$typeof) {
            case REACT_ELEMENT_TYPE:
              return existingChildren = existingChildren.get(
                null === newChild.key ? newIdx : newChild.key
              ) || null, updateElement(returnFiber, existingChildren, newChild, lanes);
            case REACT_PORTAL_TYPE:
              return existingChildren = existingChildren.get(
                null === newChild.key ? newIdx : newChild.key
              ) || null, updatePortal(returnFiber, existingChildren, newChild, lanes);
            case REACT_LAZY_TYPE:
              return newChild = resolveLazy(newChild), updateFromMap(
                existingChildren,
                returnFiber,
                newIdx,
                newChild,
                lanes
              );
          }
          if (isArrayImpl(newChild) || getIteratorFn(newChild))
            return existingChildren = existingChildren.get(newIdx) || null, updateFragment(returnFiber, existingChildren, newChild, lanes, null);
          if ("function" === typeof newChild.then)
            return updateFromMap(
              existingChildren,
              returnFiber,
              newIdx,
              unwrapThenable(newChild),
              lanes
            );
          if (newChild.$$typeof === REACT_CONTEXT_TYPE)
            return updateFromMap(
              existingChildren,
              returnFiber,
              newIdx,
              readContextDuringReconciliation(returnFiber, newChild),
              lanes
            );
          throwOnInvalidObjectTypeImpl(returnFiber, newChild);
        }
        return null;
      }
      function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren, lanes) {
        for (var resultingFirstChild = null, previousNewFiber = null, oldFiber = currentFirstChild, newIdx = currentFirstChild = 0, nextOldFiber = null; null !== oldFiber && newIdx < newChildren.length; newIdx++) {
          oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = null) : nextOldFiber = oldFiber.sibling;
          var newFiber = updateSlot(
            returnFiber,
            oldFiber,
            newChildren[newIdx],
            lanes
          );
          if (null === newFiber) {
            null === oldFiber && (oldFiber = nextOldFiber);
            break;
          }
          shouldTrackSideEffects && oldFiber && null === newFiber.alternate && deleteChild(returnFiber, oldFiber);
          currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
          null === previousNewFiber ? resultingFirstChild = newFiber : previousNewFiber.sibling = newFiber;
          previousNewFiber = newFiber;
          oldFiber = nextOldFiber;
        }
        if (newIdx === newChildren.length)
          return deleteRemainingChildren(returnFiber, oldFiber), isHydrating && pushTreeFork(returnFiber, newIdx), resultingFirstChild;
        if (null === oldFiber) {
          for (; newIdx < newChildren.length; newIdx++)
            oldFiber = createChild(returnFiber, newChildren[newIdx], lanes), null !== oldFiber && (currentFirstChild = placeChild(
              oldFiber,
              currentFirstChild,
              newIdx
            ), null === previousNewFiber ? resultingFirstChild = oldFiber : previousNewFiber.sibling = oldFiber, previousNewFiber = oldFiber);
          isHydrating && pushTreeFork(returnFiber, newIdx);
          return resultingFirstChild;
        }
        for (oldFiber = mapRemainingChildren(oldFiber); newIdx < newChildren.length; newIdx++)
          nextOldFiber = updateFromMap(
            oldFiber,
            returnFiber,
            newIdx,
            newChildren[newIdx],
            lanes
          ), null !== nextOldFiber && (shouldTrackSideEffects && null !== nextOldFiber.alternate && oldFiber.delete(
            null === nextOldFiber.key ? newIdx : nextOldFiber.key
          ), currentFirstChild = placeChild(
            nextOldFiber,
            currentFirstChild,
            newIdx
          ), null === previousNewFiber ? resultingFirstChild = nextOldFiber : previousNewFiber.sibling = nextOldFiber, previousNewFiber = nextOldFiber);
        shouldTrackSideEffects && oldFiber.forEach(function(child) {
          return deleteChild(returnFiber, child);
        });
        isHydrating && pushTreeFork(returnFiber, newIdx);
        return resultingFirstChild;
      }
      function reconcileChildrenIterator(returnFiber, currentFirstChild, newChildren, lanes) {
        if (null == newChildren) throw Error(formatProdErrorMessage(151));
        for (var resultingFirstChild = null, previousNewFiber = null, oldFiber = currentFirstChild, newIdx = currentFirstChild = 0, nextOldFiber = null, step = newChildren.next(); null !== oldFiber && !step.done; newIdx++, step = newChildren.next()) {
          oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = null) : nextOldFiber = oldFiber.sibling;
          var newFiber = updateSlot(returnFiber, oldFiber, step.value, lanes);
          if (null === newFiber) {
            null === oldFiber && (oldFiber = nextOldFiber);
            break;
          }
          shouldTrackSideEffects && oldFiber && null === newFiber.alternate && deleteChild(returnFiber, oldFiber);
          currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
          null === previousNewFiber ? resultingFirstChild = newFiber : previousNewFiber.sibling = newFiber;
          previousNewFiber = newFiber;
          oldFiber = nextOldFiber;
        }
        if (step.done)
          return deleteRemainingChildren(returnFiber, oldFiber), isHydrating && pushTreeFork(returnFiber, newIdx), resultingFirstChild;
        if (null === oldFiber) {
          for (; !step.done; newIdx++, step = newChildren.next())
            step = createChild(returnFiber, step.value, lanes), null !== step && (currentFirstChild = placeChild(step, currentFirstChild, newIdx), null === previousNewFiber ? resultingFirstChild = step : previousNewFiber.sibling = step, previousNewFiber = step);
          isHydrating && pushTreeFork(returnFiber, newIdx);
          return resultingFirstChild;
        }
        for (oldFiber = mapRemainingChildren(oldFiber); !step.done; newIdx++, step = newChildren.next())
          step = updateFromMap(oldFiber, returnFiber, newIdx, step.value, lanes), null !== step && (shouldTrackSideEffects && null !== step.alternate && oldFiber.delete(null === step.key ? newIdx : step.key), currentFirstChild = placeChild(step, currentFirstChild, newIdx), null === previousNewFiber ? resultingFirstChild = step : previousNewFiber.sibling = step, previousNewFiber = step);
        shouldTrackSideEffects && oldFiber.forEach(function(child) {
          return deleteChild(returnFiber, child);
        });
        isHydrating && pushTreeFork(returnFiber, newIdx);
        return resultingFirstChild;
      }
      function reconcileChildFibersImpl(returnFiber, currentFirstChild, newChild, lanes) {
        "object" === typeof newChild && null !== newChild && newChild.type === REACT_FRAGMENT_TYPE && null === newChild.key && (newChild = newChild.props.children);
        if ("object" === typeof newChild && null !== newChild) {
          switch (newChild.$$typeof) {
            case REACT_ELEMENT_TYPE:
              a: {
                for (var key = newChild.key; null !== currentFirstChild; ) {
                  if (currentFirstChild.key === key) {
                    key = newChild.type;
                    if (key === REACT_FRAGMENT_TYPE) {
                      if (7 === currentFirstChild.tag) {
                        deleteRemainingChildren(
                          returnFiber,
                          currentFirstChild.sibling
                        );
                        lanes = useFiber(
                          currentFirstChild,
                          newChild.props.children
                        );
                        lanes.return = returnFiber;
                        returnFiber = lanes;
                        break a;
                      }
                    } else if (currentFirstChild.elementType === key || "object" === typeof key && null !== key && key.$$typeof === REACT_LAZY_TYPE && resolveLazy(key) === currentFirstChild.type) {
                      deleteRemainingChildren(
                        returnFiber,
                        currentFirstChild.sibling
                      );
                      lanes = useFiber(currentFirstChild, newChild.props);
                      coerceRef(lanes, newChild);
                      lanes.return = returnFiber;
                      returnFiber = lanes;
                      break a;
                    }
                    deleteRemainingChildren(returnFiber, currentFirstChild);
                    break;
                  } else deleteChild(returnFiber, currentFirstChild);
                  currentFirstChild = currentFirstChild.sibling;
                }
                newChild.type === REACT_FRAGMENT_TYPE ? (lanes = createFiberFromFragment(
                  newChild.props.children,
                  returnFiber.mode,
                  lanes,
                  newChild.key
                ), lanes.return = returnFiber, returnFiber = lanes) : (lanes = createFiberFromTypeAndProps(
                  newChild.type,
                  newChild.key,
                  newChild.props,
                  null,
                  returnFiber.mode,
                  lanes
                ), coerceRef(lanes, newChild), lanes.return = returnFiber, returnFiber = lanes);
              }
              return placeSingleChild(returnFiber);
            case REACT_PORTAL_TYPE:
              a: {
                for (key = newChild.key; null !== currentFirstChild; ) {
                  if (currentFirstChild.key === key)
                    if (4 === currentFirstChild.tag && currentFirstChild.stateNode.containerInfo === newChild.containerInfo && currentFirstChild.stateNode.implementation === newChild.implementation) {
                      deleteRemainingChildren(
                        returnFiber,
                        currentFirstChild.sibling
                      );
                      lanes = useFiber(currentFirstChild, newChild.children || []);
                      lanes.return = returnFiber;
                      returnFiber = lanes;
                      break a;
                    } else {
                      deleteRemainingChildren(returnFiber, currentFirstChild);
                      break;
                    }
                  else deleteChild(returnFiber, currentFirstChild);
                  currentFirstChild = currentFirstChild.sibling;
                }
                lanes = createFiberFromPortal(newChild, returnFiber.mode, lanes);
                lanes.return = returnFiber;
                returnFiber = lanes;
              }
              return placeSingleChild(returnFiber);
            case REACT_LAZY_TYPE:
              return newChild = resolveLazy(newChild), reconcileChildFibersImpl(
                returnFiber,
                currentFirstChild,
                newChild,
                lanes
              );
          }
          if (isArrayImpl(newChild))
            return reconcileChildrenArray(
              returnFiber,
              currentFirstChild,
              newChild,
              lanes
            );
          if (getIteratorFn(newChild)) {
            key = getIteratorFn(newChild);
            if ("function" !== typeof key) throw Error(formatProdErrorMessage(150));
            newChild = key.call(newChild);
            return reconcileChildrenIterator(
              returnFiber,
              currentFirstChild,
              newChild,
              lanes
            );
          }
          if ("function" === typeof newChild.then)
            return reconcileChildFibersImpl(
              returnFiber,
              currentFirstChild,
              unwrapThenable(newChild),
              lanes
            );
          if (newChild.$$typeof === REACT_CONTEXT_TYPE)
            return reconcileChildFibersImpl(
              returnFiber,
              currentFirstChild,
              readContextDuringReconciliation(returnFiber, newChild),
              lanes
            );
          throwOnInvalidObjectTypeImpl(returnFiber, newChild);
        }
        return "string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild ? (newChild = "" + newChild, null !== currentFirstChild && 6 === currentFirstChild.tag ? (deleteRemainingChildren(returnFiber, currentFirstChild.sibling), lanes = useFiber(currentFirstChild, newChild), lanes.return = returnFiber, returnFiber = lanes) : (deleteRemainingChildren(returnFiber, currentFirstChild), lanes = createFiberFromText(newChild, returnFiber.mode, lanes), lanes.return = returnFiber, returnFiber = lanes), placeSingleChild(returnFiber)) : deleteRemainingChildren(returnFiber, currentFirstChild);
      }
      return function(returnFiber, currentFirstChild, newChild, lanes) {
        try {
          thenableIndexCounter$1 = 0;
          var firstChildFiber = reconcileChildFibersImpl(
            returnFiber,
            currentFirstChild,
            newChild,
            lanes
          );
          thenableState$1 = null;
          return firstChildFiber;
        } catch (x) {
          if (x === SuspenseException || x === SuspenseActionException) throw x;
          var fiber = createFiberImplClass(29, x, null, returnFiber.mode);
          fiber.lanes = lanes;
          fiber.return = returnFiber;
          return fiber;
        } finally {
        }
      };
    }
    var reconcileChildFibers = createChildReconciler(true), mountChildFibers = createChildReconciler(false), hasForceUpdate = false;
    function initializeUpdateQueue(fiber) {
      fiber.updateQueue = {
        baseState: fiber.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: { pending: null, lanes: 0, hiddenCallbacks: null },
        callbacks: null
      };
    }
    function cloneUpdateQueue(current, workInProgress2) {
      current = current.updateQueue;
      workInProgress2.updateQueue === current && (workInProgress2.updateQueue = {
        baseState: current.baseState,
        firstBaseUpdate: current.firstBaseUpdate,
        lastBaseUpdate: current.lastBaseUpdate,
        shared: current.shared,
        callbacks: null
      });
    }
    function createUpdate(lane) {
      return { lane, tag: 0, payload: null, callback: null, next: null };
    }
    function enqueueUpdate(fiber, update, lane) {
      var updateQueue = fiber.updateQueue;
      if (null === updateQueue) return null;
      updateQueue = updateQueue.shared;
      if (0 !== (executionContext & 2)) {
        var pending = updateQueue.pending;
        null === pending ? update.next = update : (update.next = pending.next, pending.next = update);
        updateQueue.pending = update;
        update = getRootForUpdatedFiber(fiber);
        markUpdateLaneFromFiberToRoot(fiber, null, lane);
        return update;
      }
      enqueueUpdate$1(fiber, updateQueue, update, lane);
      return getRootForUpdatedFiber(fiber);
    }
    function entangleTransitions(root3, fiber, lane) {
      fiber = fiber.updateQueue;
      if (null !== fiber && (fiber = fiber.shared, 0 !== (lane & 4194048))) {
        var queueLanes = fiber.lanes;
        queueLanes &= root3.pendingLanes;
        lane |= queueLanes;
        fiber.lanes = lane;
        markRootEntangled(root3, lane);
      }
    }
    function enqueueCapturedUpdate(workInProgress2, capturedUpdate) {
      var queue = workInProgress2.updateQueue, current = workInProgress2.alternate;
      if (null !== current && (current = current.updateQueue, queue === current)) {
        var newFirst = null, newLast = null;
        queue = queue.firstBaseUpdate;
        if (null !== queue) {
          do {
            var clone = {
              lane: queue.lane,
              tag: queue.tag,
              payload: queue.payload,
              callback: null,
              next: null
            };
            null === newLast ? newFirst = newLast = clone : newLast = newLast.next = clone;
            queue = queue.next;
          } while (null !== queue);
          null === newLast ? newFirst = newLast = capturedUpdate : newLast = newLast.next = capturedUpdate;
        } else newFirst = newLast = capturedUpdate;
        queue = {
          baseState: current.baseState,
          firstBaseUpdate: newFirst,
          lastBaseUpdate: newLast,
          shared: current.shared,
          callbacks: current.callbacks
        };
        workInProgress2.updateQueue = queue;
        return;
      }
      workInProgress2 = queue.lastBaseUpdate;
      null === workInProgress2 ? queue.firstBaseUpdate = capturedUpdate : workInProgress2.next = capturedUpdate;
      queue.lastBaseUpdate = capturedUpdate;
    }
    var didReadFromEntangledAsyncAction = false;
    function suspendIfUpdateReadFromEntangledAsyncAction() {
      if (didReadFromEntangledAsyncAction) {
        var entangledActionThenable = currentEntangledActionThenable;
        if (null !== entangledActionThenable) throw entangledActionThenable;
      }
    }
    function processUpdateQueue(workInProgress$jscomp$0, props, instance$jscomp$0, renderLanes2) {
      didReadFromEntangledAsyncAction = false;
      var queue = workInProgress$jscomp$0.updateQueue;
      hasForceUpdate = false;
      var firstBaseUpdate = queue.firstBaseUpdate, lastBaseUpdate = queue.lastBaseUpdate, pendingQueue = queue.shared.pending;
      if (null !== pendingQueue) {
        queue.shared.pending = null;
        var lastPendingUpdate = pendingQueue, firstPendingUpdate = lastPendingUpdate.next;
        lastPendingUpdate.next = null;
        null === lastBaseUpdate ? firstBaseUpdate = firstPendingUpdate : lastBaseUpdate.next = firstPendingUpdate;
        lastBaseUpdate = lastPendingUpdate;
        var current = workInProgress$jscomp$0.alternate;
        null !== current && (current = current.updateQueue, pendingQueue = current.lastBaseUpdate, pendingQueue !== lastBaseUpdate && (null === pendingQueue ? current.firstBaseUpdate = firstPendingUpdate : pendingQueue.next = firstPendingUpdate, current.lastBaseUpdate = lastPendingUpdate));
      }
      if (null !== firstBaseUpdate) {
        var newState = queue.baseState;
        lastBaseUpdate = 0;
        current = firstPendingUpdate = lastPendingUpdate = null;
        pendingQueue = firstBaseUpdate;
        do {
          var updateLane = pendingQueue.lane & -536870913, isHiddenUpdate = updateLane !== pendingQueue.lane;
          if (isHiddenUpdate ? (workInProgressRootRenderLanes & updateLane) === updateLane : (renderLanes2 & updateLane) === updateLane) {
            0 !== updateLane && updateLane === currentEntangledLane && (didReadFromEntangledAsyncAction = true);
            null !== current && (current = current.next = {
              lane: 0,
              tag: pendingQueue.tag,
              payload: pendingQueue.payload,
              callback: null,
              next: null
            });
            a: {
              var workInProgress2 = workInProgress$jscomp$0, update = pendingQueue;
              updateLane = props;
              var instance = instance$jscomp$0;
              switch (update.tag) {
                case 1:
                  workInProgress2 = update.payload;
                  if ("function" === typeof workInProgress2) {
                    newState = workInProgress2.call(instance, newState, updateLane);
                    break a;
                  }
                  newState = workInProgress2;
                  break a;
                case 3:
                  workInProgress2.flags = workInProgress2.flags & -65537 | 128;
                case 0:
                  workInProgress2 = update.payload;
                  updateLane = "function" === typeof workInProgress2 ? workInProgress2.call(instance, newState, updateLane) : workInProgress2;
                  if (null === updateLane || void 0 === updateLane) break a;
                  newState = assign({}, newState, updateLane);
                  break a;
                case 2:
                  hasForceUpdate = true;
              }
            }
            updateLane = pendingQueue.callback;
            null !== updateLane && (workInProgress$jscomp$0.flags |= 64, isHiddenUpdate && (workInProgress$jscomp$0.flags |= 8192), isHiddenUpdate = queue.callbacks, null === isHiddenUpdate ? queue.callbacks = [updateLane] : isHiddenUpdate.push(updateLane));
          } else
            isHiddenUpdate = {
              lane: updateLane,
              tag: pendingQueue.tag,
              payload: pendingQueue.payload,
              callback: pendingQueue.callback,
              next: null
            }, null === current ? (firstPendingUpdate = current = isHiddenUpdate, lastPendingUpdate = newState) : current = current.next = isHiddenUpdate, lastBaseUpdate |= updateLane;
          pendingQueue = pendingQueue.next;
          if (null === pendingQueue)
            if (pendingQueue = queue.shared.pending, null === pendingQueue)
              break;
            else
              isHiddenUpdate = pendingQueue, pendingQueue = isHiddenUpdate.next, isHiddenUpdate.next = null, queue.lastBaseUpdate = isHiddenUpdate, queue.shared.pending = null;
        } while (1);
        null === current && (lastPendingUpdate = newState);
        queue.baseState = lastPendingUpdate;
        queue.firstBaseUpdate = firstPendingUpdate;
        queue.lastBaseUpdate = current;
        null === firstBaseUpdate && (queue.shared.lanes = 0);
        workInProgressRootSkippedLanes |= lastBaseUpdate;
        workInProgress$jscomp$0.lanes = lastBaseUpdate;
        workInProgress$jscomp$0.memoizedState = newState;
      }
    }
    function callCallback(callback, context) {
      if ("function" !== typeof callback)
        throw Error(formatProdErrorMessage(191, callback));
      callback.call(context);
    }
    function commitCallbacks(updateQueue, context) {
      var callbacks = updateQueue.callbacks;
      if (null !== callbacks)
        for (updateQueue.callbacks = null, updateQueue = 0; updateQueue < callbacks.length; updateQueue++)
          callCallback(callbacks[updateQueue], context);
    }
    var currentTreeHiddenStackCursor = createCursor(null), prevEntangledRenderLanesCursor = createCursor(0);
    function pushHiddenContext(fiber, context) {
      fiber = entangledRenderLanes;
      push(prevEntangledRenderLanesCursor, fiber);
      push(currentTreeHiddenStackCursor, context);
      entangledRenderLanes = fiber | context.baseLanes;
    }
    function reuseHiddenContextOnStack() {
      push(prevEntangledRenderLanesCursor, entangledRenderLanes);
      push(currentTreeHiddenStackCursor, currentTreeHiddenStackCursor.current);
    }
    function popHiddenContext() {
      entangledRenderLanes = prevEntangledRenderLanesCursor.current;
      pop(currentTreeHiddenStackCursor);
      pop(prevEntangledRenderLanesCursor);
    }
    var suspenseHandlerStackCursor = createCursor(null), shellBoundary = null;
    function pushPrimaryTreeSuspenseHandler(handler) {
      var current = handler.alternate;
      push(suspenseStackCursor, suspenseStackCursor.current & 1);
      push(suspenseHandlerStackCursor, handler);
      null === shellBoundary && (null === current || null !== currentTreeHiddenStackCursor.current ? shellBoundary = handler : null !== current.memoizedState && (shellBoundary = handler));
    }
    function pushDehydratedActivitySuspenseHandler(fiber) {
      push(suspenseStackCursor, suspenseStackCursor.current);
      push(suspenseHandlerStackCursor, fiber);
      null === shellBoundary && (shellBoundary = fiber);
    }
    function pushOffscreenSuspenseHandler(fiber) {
      22 === fiber.tag ? (push(suspenseStackCursor, suspenseStackCursor.current), push(suspenseHandlerStackCursor, fiber), null === shellBoundary && (shellBoundary = fiber)) : reuseSuspenseHandlerOnStack();
    }
    function reuseSuspenseHandlerOnStack() {
      push(suspenseStackCursor, suspenseStackCursor.current);
      push(suspenseHandlerStackCursor, suspenseHandlerStackCursor.current);
    }
    function popSuspenseHandler(fiber) {
      pop(suspenseHandlerStackCursor);
      shellBoundary === fiber && (shellBoundary = null);
      pop(suspenseStackCursor);
    }
    var suspenseStackCursor = createCursor(0);
    function findFirstSuspended(row) {
      for (var node = row; null !== node; ) {
        if (13 === node.tag) {
          var state = node.memoizedState;
          if (null !== state && (state = state.dehydrated, null === state || isSuspenseInstancePending(state) || isSuspenseInstanceFallback(state)))
            return node;
        } else if (19 === node.tag && ("forwards" === node.memoizedProps.revealOrder || "backwards" === node.memoizedProps.revealOrder || "unstable_legacy-backwards" === node.memoizedProps.revealOrder || "together" === node.memoizedProps.revealOrder)) {
          if (0 !== (node.flags & 128)) return node;
        } else if (null !== node.child) {
          node.child.return = node;
          node = node.child;
          continue;
        }
        if (node === row) break;
        for (; null === node.sibling; ) {
          if (null === node.return || node.return === row) return null;
          node = node.return;
        }
        node.sibling.return = node.return;
        node = node.sibling;
      }
      return null;
    }
    var renderLanes = 0, currentlyRenderingFiber = null, currentHook = null, workInProgressHook = null, didScheduleRenderPhaseUpdate = false, didScheduleRenderPhaseUpdateDuringThisPass = false, shouldDoubleInvokeUserFnsInHooksDEV = false, localIdCounter = 0, thenableIndexCounter = 0, thenableState = null, globalClientIdCounter = 0;
    function throwInvalidHookError() {
      throw Error(formatProdErrorMessage(321));
    }
    function areHookInputsEqual(nextDeps, prevDeps) {
      if (null === prevDeps) return false;
      for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++)
        if (!objectIs(nextDeps[i], prevDeps[i])) return false;
      return true;
    }
    function renderWithHooks(current, workInProgress2, Component, props, secondArg, nextRenderLanes) {
      renderLanes = nextRenderLanes;
      currentlyRenderingFiber = workInProgress2;
      workInProgress2.memoizedState = null;
      workInProgress2.updateQueue = null;
      workInProgress2.lanes = 0;
      ReactSharedInternals.H = null === current || null === current.memoizedState ? HooksDispatcherOnMount : HooksDispatcherOnUpdate;
      shouldDoubleInvokeUserFnsInHooksDEV = false;
      nextRenderLanes = Component(props, secondArg);
      shouldDoubleInvokeUserFnsInHooksDEV = false;
      didScheduleRenderPhaseUpdateDuringThisPass && (nextRenderLanes = renderWithHooksAgain(
        workInProgress2,
        Component,
        props,
        secondArg
      ));
      finishRenderingHooks(current);
      return nextRenderLanes;
    }
    function finishRenderingHooks(current) {
      ReactSharedInternals.H = ContextOnlyDispatcher;
      var didRenderTooFewHooks = null !== currentHook && null !== currentHook.next;
      renderLanes = 0;
      workInProgressHook = currentHook = currentlyRenderingFiber = null;
      didScheduleRenderPhaseUpdate = false;
      thenableIndexCounter = 0;
      thenableState = null;
      if (didRenderTooFewHooks) throw Error(formatProdErrorMessage(300));
      null === current || didReceiveUpdate || (current = current.dependencies, null !== current && checkIfContextChanged(current) && (didReceiveUpdate = true));
    }
    function renderWithHooksAgain(workInProgress2, Component, props, secondArg) {
      currentlyRenderingFiber = workInProgress2;
      var numberOfReRenders = 0;
      do {
        didScheduleRenderPhaseUpdateDuringThisPass && (thenableState = null);
        thenableIndexCounter = 0;
        didScheduleRenderPhaseUpdateDuringThisPass = false;
        if (25 <= numberOfReRenders) throw Error(formatProdErrorMessage(301));
        numberOfReRenders += 1;
        workInProgressHook = currentHook = null;
        if (null != workInProgress2.updateQueue) {
          var children = workInProgress2.updateQueue;
          children.lastEffect = null;
          children.events = null;
          children.stores = null;
          null != children.memoCache && (children.memoCache.index = 0);
        }
        ReactSharedInternals.H = HooksDispatcherOnRerender;
        children = Component(props, secondArg);
      } while (didScheduleRenderPhaseUpdateDuringThisPass);
      return children;
    }
    function TransitionAwareHostComponent() {
      var dispatcher = ReactSharedInternals.H, maybeThenable = dispatcher.useState()[0];
      maybeThenable = "function" === typeof maybeThenable.then ? useThenable(maybeThenable) : maybeThenable;
      dispatcher = dispatcher.useState()[0];
      (null !== currentHook ? currentHook.memoizedState : null) !== dispatcher && (currentlyRenderingFiber.flags |= 1024);
      return maybeThenable;
    }
    function checkDidRenderIdHook() {
      var didRenderIdHook = 0 !== localIdCounter;
      localIdCounter = 0;
      return didRenderIdHook;
    }
    function bailoutHooks(current, workInProgress2, lanes) {
      workInProgress2.updateQueue = current.updateQueue;
      workInProgress2.flags &= -2053;
      current.lanes &= ~lanes;
    }
    function resetHooksOnUnwind(workInProgress2) {
      if (didScheduleRenderPhaseUpdate) {
        for (workInProgress2 = workInProgress2.memoizedState; null !== workInProgress2; ) {
          var queue = workInProgress2.queue;
          null !== queue && (queue.pending = null);
          workInProgress2 = workInProgress2.next;
        }
        didScheduleRenderPhaseUpdate = false;
      }
      renderLanes = 0;
      workInProgressHook = currentHook = currentlyRenderingFiber = null;
      didScheduleRenderPhaseUpdateDuringThisPass = false;
      thenableIndexCounter = localIdCounter = 0;
      thenableState = null;
    }
    function mountWorkInProgressHook() {
      var hook = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      null === workInProgressHook ? currentlyRenderingFiber.memoizedState = workInProgressHook = hook : workInProgressHook = workInProgressHook.next = hook;
      return workInProgressHook;
    }
    function updateWorkInProgressHook() {
      if (null === currentHook) {
        var nextCurrentHook = currentlyRenderingFiber.alternate;
        nextCurrentHook = null !== nextCurrentHook ? nextCurrentHook.memoizedState : null;
      } else nextCurrentHook = currentHook.next;
      var nextWorkInProgressHook = null === workInProgressHook ? currentlyRenderingFiber.memoizedState : workInProgressHook.next;
      if (null !== nextWorkInProgressHook)
        workInProgressHook = nextWorkInProgressHook, currentHook = nextCurrentHook;
      else {
        if (null === nextCurrentHook) {
          if (null === currentlyRenderingFiber.alternate)
            throw Error(formatProdErrorMessage(467));
          throw Error(formatProdErrorMessage(310));
        }
        currentHook = nextCurrentHook;
        nextCurrentHook = {
          memoizedState: currentHook.memoizedState,
          baseState: currentHook.baseState,
          baseQueue: currentHook.baseQueue,
          queue: currentHook.queue,
          next: null
        };
        null === workInProgressHook ? currentlyRenderingFiber.memoizedState = workInProgressHook = nextCurrentHook : workInProgressHook = workInProgressHook.next = nextCurrentHook;
      }
      return workInProgressHook;
    }
    function createFunctionComponentUpdateQueue() {
      return { lastEffect: null, events: null, stores: null, memoCache: null };
    }
    function useThenable(thenable) {
      var index2 = thenableIndexCounter;
      thenableIndexCounter += 1;
      null === thenableState && (thenableState = []);
      thenable = trackUsedThenable(thenableState, thenable, index2);
      index2 = currentlyRenderingFiber;
      null === (null === workInProgressHook ? index2.memoizedState : workInProgressHook.next) && (index2 = index2.alternate, ReactSharedInternals.H = null === index2 || null === index2.memoizedState ? HooksDispatcherOnMount : HooksDispatcherOnUpdate);
      return thenable;
    }
    function use(usable) {
      if (null !== usable && "object" === typeof usable) {
        if ("function" === typeof usable.then) return useThenable(usable);
        if (usable.$$typeof === REACT_CONTEXT_TYPE) return readContext(usable);
      }
      throw Error(formatProdErrorMessage(438, String(usable)));
    }
    function useMemoCache(size) {
      var memoCache = null, updateQueue = currentlyRenderingFiber.updateQueue;
      null !== updateQueue && (memoCache = updateQueue.memoCache);
      if (null == memoCache) {
        var current = currentlyRenderingFiber.alternate;
        null !== current && (current = current.updateQueue, null !== current && (current = current.memoCache, null != current && (memoCache = {
          data: current.data.map(function(array) {
            return array.slice();
          }),
          index: 0
        })));
      }
      null == memoCache && (memoCache = { data: [], index: 0 });
      null === updateQueue && (updateQueue = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = updateQueue);
      updateQueue.memoCache = memoCache;
      updateQueue = memoCache.data[memoCache.index];
      if (void 0 === updateQueue)
        for (updateQueue = memoCache.data[memoCache.index] = Array(size), current = 0; current < size; current++)
          updateQueue[current] = REACT_MEMO_CACHE_SENTINEL;
      memoCache.index++;
      return updateQueue;
    }
    function basicStateReducer(state, action) {
      return "function" === typeof action ? action(state) : action;
    }
    function updateReducer(reducer) {
      var hook = updateWorkInProgressHook();
      return updateReducerImpl(hook, currentHook, reducer);
    }
    function updateReducerImpl(hook, current, reducer) {
      var queue = hook.queue;
      if (null === queue) throw Error(formatProdErrorMessage(311));
      queue.lastRenderedReducer = reducer;
      var baseQueue = hook.baseQueue, pendingQueue = queue.pending;
      if (null !== pendingQueue) {
        if (null !== baseQueue) {
          var baseFirst = baseQueue.next;
          baseQueue.next = pendingQueue.next;
          pendingQueue.next = baseFirst;
        }
        current.baseQueue = baseQueue = pendingQueue;
        queue.pending = null;
      }
      pendingQueue = hook.baseState;
      if (null === baseQueue) hook.memoizedState = pendingQueue;
      else {
        current = baseQueue.next;
        var newBaseQueueFirst = baseFirst = null, newBaseQueueLast = null, update = current, didReadFromEntangledAsyncAction$60 = false;
        do {
          var updateLane = update.lane & -536870913;
          if (updateLane !== update.lane ? (workInProgressRootRenderLanes & updateLane) === updateLane : (renderLanes & updateLane) === updateLane) {
            var revertLane = update.revertLane;
            if (0 === revertLane)
              null !== newBaseQueueLast && (newBaseQueueLast = newBaseQueueLast.next = {
                lane: 0,
                revertLane: 0,
                gesture: null,
                action: update.action,
                hasEagerState: update.hasEagerState,
                eagerState: update.eagerState,
                next: null
              }), updateLane === currentEntangledLane && (didReadFromEntangledAsyncAction$60 = true);
            else if ((renderLanes & revertLane) === revertLane) {
              update = update.next;
              revertLane === currentEntangledLane && (didReadFromEntangledAsyncAction$60 = true);
              continue;
            } else
              updateLane = {
                lane: 0,
                revertLane: update.revertLane,
                gesture: null,
                action: update.action,
                hasEagerState: update.hasEagerState,
                eagerState: update.eagerState,
                next: null
              }, null === newBaseQueueLast ? (newBaseQueueFirst = newBaseQueueLast = updateLane, baseFirst = pendingQueue) : newBaseQueueLast = newBaseQueueLast.next = updateLane, currentlyRenderingFiber.lanes |= revertLane, workInProgressRootSkippedLanes |= revertLane;
            updateLane = update.action;
            shouldDoubleInvokeUserFnsInHooksDEV && reducer(pendingQueue, updateLane);
            pendingQueue = update.hasEagerState ? update.eagerState : reducer(pendingQueue, updateLane);
          } else
            revertLane = {
              lane: updateLane,
              revertLane: update.revertLane,
              gesture: update.gesture,
              action: update.action,
              hasEagerState: update.hasEagerState,
              eagerState: update.eagerState,
              next: null
            }, null === newBaseQueueLast ? (newBaseQueueFirst = newBaseQueueLast = revertLane, baseFirst = pendingQueue) : newBaseQueueLast = newBaseQueueLast.next = revertLane, currentlyRenderingFiber.lanes |= updateLane, workInProgressRootSkippedLanes |= updateLane;
          update = update.next;
        } while (null !== update && update !== current);
        null === newBaseQueueLast ? baseFirst = pendingQueue : newBaseQueueLast.next = newBaseQueueFirst;
        if (!objectIs(pendingQueue, hook.memoizedState) && (didReceiveUpdate = true, didReadFromEntangledAsyncAction$60 && (reducer = currentEntangledActionThenable, null !== reducer)))
          throw reducer;
        hook.memoizedState = pendingQueue;
        hook.baseState = baseFirst;
        hook.baseQueue = newBaseQueueLast;
        queue.lastRenderedState = pendingQueue;
      }
      null === baseQueue && (queue.lanes = 0);
      return [hook.memoizedState, queue.dispatch];
    }
    function rerenderReducer(reducer) {
      var hook = updateWorkInProgressHook(), queue = hook.queue;
      if (null === queue) throw Error(formatProdErrorMessage(311));
      queue.lastRenderedReducer = reducer;
      var dispatch = queue.dispatch, lastRenderPhaseUpdate = queue.pending, newState = hook.memoizedState;
      if (null !== lastRenderPhaseUpdate) {
        queue.pending = null;
        var update = lastRenderPhaseUpdate = lastRenderPhaseUpdate.next;
        do
          newState = reducer(newState, update.action), update = update.next;
        while (update !== lastRenderPhaseUpdate);
        objectIs(newState, hook.memoizedState) || (didReceiveUpdate = true);
        hook.memoizedState = newState;
        null === hook.baseQueue && (hook.baseState = newState);
        queue.lastRenderedState = newState;
      }
      return [newState, dispatch];
    }
    function updateSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
      var fiber = currentlyRenderingFiber, hook = updateWorkInProgressHook(), isHydrating$jscomp$0 = isHydrating;
      if (isHydrating$jscomp$0) {
        if (void 0 === getServerSnapshot) throw Error(formatProdErrorMessage(407));
        getServerSnapshot = getServerSnapshot();
      } else getServerSnapshot = getSnapshot();
      var snapshotChanged = !objectIs(
        (currentHook || hook).memoizedState,
        getServerSnapshot
      );
      snapshotChanged && (hook.memoizedState = getServerSnapshot, didReceiveUpdate = true);
      hook = hook.queue;
      updateEffect(subscribeToStore.bind(null, fiber, hook, subscribe), [
        subscribe
      ]);
      if (hook.getSnapshot !== getSnapshot || snapshotChanged || null !== workInProgressHook && workInProgressHook.memoizedState.tag & 1) {
        fiber.flags |= 2048;
        pushSimpleEffect(
          9,
          { destroy: void 0 },
          updateStoreInstance.bind(
            null,
            fiber,
            hook,
            getServerSnapshot,
            getSnapshot
          ),
          null
        );
        if (null === workInProgressRoot) throw Error(formatProdErrorMessage(349));
        isHydrating$jscomp$0 || 0 !== (renderLanes & 127) || pushStoreConsistencyCheck(fiber, getSnapshot, getServerSnapshot);
      }
      return getServerSnapshot;
    }
    function pushStoreConsistencyCheck(fiber, getSnapshot, renderedSnapshot) {
      fiber.flags |= 16384;
      fiber = { getSnapshot, value: renderedSnapshot };
      getSnapshot = currentlyRenderingFiber.updateQueue;
      null === getSnapshot ? (getSnapshot = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = getSnapshot, getSnapshot.stores = [fiber]) : (renderedSnapshot = getSnapshot.stores, null === renderedSnapshot ? getSnapshot.stores = [fiber] : renderedSnapshot.push(fiber));
    }
    function updateStoreInstance(fiber, inst, nextSnapshot, getSnapshot) {
      inst.value = nextSnapshot;
      inst.getSnapshot = getSnapshot;
      checkIfSnapshotChanged(inst) && forceStoreRerender(fiber);
    }
    function subscribeToStore(fiber, inst, subscribe) {
      return subscribe(function() {
        checkIfSnapshotChanged(inst) && forceStoreRerender(fiber);
      });
    }
    function checkIfSnapshotChanged(inst) {
      var latestGetSnapshot = inst.getSnapshot;
      inst = inst.value;
      try {
        var nextValue = latestGetSnapshot();
        return !objectIs(inst, nextValue);
      } catch (error) {
        return true;
      }
    }
    function forceStoreRerender(fiber) {
      var root3 = enqueueConcurrentRenderForLane(fiber, 2);
      null !== root3 && scheduleUpdateOnFiber(root3, fiber, 2);
    }
    function mountStateImpl(initialState) {
      var hook = mountWorkInProgressHook();
      if ("function" === typeof initialState) {
        var initialStateInitializer = initialState;
        initialState = initialStateInitializer();
        if (shouldDoubleInvokeUserFnsInHooksDEV) {
          setIsStrictModeForDevtools(true);
          try {
            initialStateInitializer();
          } finally {
            setIsStrictModeForDevtools(false);
          }
        }
      }
      hook.memoizedState = hook.baseState = initialState;
      hook.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: basicStateReducer,
        lastRenderedState: initialState
      };
      return hook;
    }
    function updateOptimisticImpl(hook, current, passthrough, reducer) {
      hook.baseState = passthrough;
      return updateReducerImpl(
        hook,
        currentHook,
        "function" === typeof reducer ? reducer : basicStateReducer
      );
    }
    function dispatchActionState(fiber, actionQueue, setPendingState, setState, payload) {
      if (isRenderPhaseUpdate(fiber)) throw Error(formatProdErrorMessage(485));
      fiber = actionQueue.action;
      if (null !== fiber) {
        var actionNode = {
          payload,
          action: fiber,
          next: null,
          isTransition: true,
          status: "pending",
          value: null,
          reason: null,
          listeners: [],
          then: function(listener) {
            actionNode.listeners.push(listener);
          }
        };
        null !== ReactSharedInternals.T ? setPendingState(true) : actionNode.isTransition = false;
        setState(actionNode);
        setPendingState = actionQueue.pending;
        null === setPendingState ? (actionNode.next = actionQueue.pending = actionNode, runActionStateAction(actionQueue, actionNode)) : (actionNode.next = setPendingState.next, actionQueue.pending = setPendingState.next = actionNode);
      }
    }
    function runActionStateAction(actionQueue, node) {
      var action = node.action, payload = node.payload, prevState = actionQueue.state;
      if (node.isTransition) {
        var prevTransition = ReactSharedInternals.T, currentTransition = {};
        ReactSharedInternals.T = currentTransition;
        try {
          var returnValue = action(prevState, payload), onStartTransitionFinish = ReactSharedInternals.S;
          null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
          handleActionReturnValue(actionQueue, node, returnValue);
        } catch (error) {
          onActionError(actionQueue, node, error);
        } finally {
          null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
        }
      } else
        try {
          prevTransition = action(prevState, payload), handleActionReturnValue(actionQueue, node, prevTransition);
        } catch (error$66) {
          onActionError(actionQueue, node, error$66);
        }
    }
    function handleActionReturnValue(actionQueue, node, returnValue) {
      null !== returnValue && "object" === typeof returnValue && "function" === typeof returnValue.then ? returnValue.then(
        function(nextState) {
          onActionSuccess(actionQueue, node, nextState);
        },
        function(error) {
          return onActionError(actionQueue, node, error);
        }
      ) : onActionSuccess(actionQueue, node, returnValue);
    }
    function onActionSuccess(actionQueue, actionNode, nextState) {
      actionNode.status = "fulfilled";
      actionNode.value = nextState;
      notifyActionListeners(actionNode);
      actionQueue.state = nextState;
      actionNode = actionQueue.pending;
      null !== actionNode && (nextState = actionNode.next, nextState === actionNode ? actionQueue.pending = null : (nextState = nextState.next, actionNode.next = nextState, runActionStateAction(actionQueue, nextState)));
    }
    function onActionError(actionQueue, actionNode, error) {
      var last = actionQueue.pending;
      actionQueue.pending = null;
      if (null !== last) {
        last = last.next;
        do
          actionNode.status = "rejected", actionNode.reason = error, notifyActionListeners(actionNode), actionNode = actionNode.next;
        while (actionNode !== last);
      }
      actionQueue.action = null;
    }
    function notifyActionListeners(actionNode) {
      actionNode = actionNode.listeners;
      for (var i = 0; i < actionNode.length; i++) (0, actionNode[i])();
    }
    function actionStateReducer(oldState, newState) {
      return newState;
    }
    function mountActionState(action, initialStateProp) {
      if (isHydrating) {
        var ssrFormState = workInProgressRoot.formState;
        if (null !== ssrFormState) {
          a: {
            var JSCompiler_inline_result = currentlyRenderingFiber;
            if (isHydrating) {
              if (nextHydratableInstance) {
                b: {
                  var JSCompiler_inline_result$jscomp$0 = nextHydratableInstance;
                  for (var inRootOrSingleton = rootOrSingletonContext; 8 !== JSCompiler_inline_result$jscomp$0.nodeType; ) {
                    if (!inRootOrSingleton) {
                      JSCompiler_inline_result$jscomp$0 = null;
                      break b;
                    }
                    JSCompiler_inline_result$jscomp$0 = getNextHydratable(
                      JSCompiler_inline_result$jscomp$0.nextSibling
                    );
                    if (null === JSCompiler_inline_result$jscomp$0) {
                      JSCompiler_inline_result$jscomp$0 = null;
                      break b;
                    }
                  }
                  inRootOrSingleton = JSCompiler_inline_result$jscomp$0.data;
                  JSCompiler_inline_result$jscomp$0 = "F!" === inRootOrSingleton || "F" === inRootOrSingleton ? JSCompiler_inline_result$jscomp$0 : null;
                }
                if (JSCompiler_inline_result$jscomp$0) {
                  nextHydratableInstance = getNextHydratable(
                    JSCompiler_inline_result$jscomp$0.nextSibling
                  );
                  JSCompiler_inline_result = "F!" === JSCompiler_inline_result$jscomp$0.data;
                  break a;
                }
              }
              throwOnHydrationMismatch(JSCompiler_inline_result);
            }
            JSCompiler_inline_result = false;
          }
          JSCompiler_inline_result && (initialStateProp = ssrFormState[0]);
        }
      }
      ssrFormState = mountWorkInProgressHook();
      ssrFormState.memoizedState = ssrFormState.baseState = initialStateProp;
      JSCompiler_inline_result = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: actionStateReducer,
        lastRenderedState: initialStateProp
      };
      ssrFormState.queue = JSCompiler_inline_result;
      ssrFormState = dispatchSetState.bind(
        null,
        currentlyRenderingFiber,
        JSCompiler_inline_result
      );
      JSCompiler_inline_result.dispatch = ssrFormState;
      JSCompiler_inline_result = mountStateImpl(false);
      inRootOrSingleton = dispatchOptimisticSetState.bind(
        null,
        currentlyRenderingFiber,
        false,
        JSCompiler_inline_result.queue
      );
      JSCompiler_inline_result = mountWorkInProgressHook();
      JSCompiler_inline_result$jscomp$0 = {
        state: initialStateProp,
        dispatch: null,
        action,
        pending: null
      };
      JSCompiler_inline_result.queue = JSCompiler_inline_result$jscomp$0;
      ssrFormState = dispatchActionState.bind(
        null,
        currentlyRenderingFiber,
        JSCompiler_inline_result$jscomp$0,
        inRootOrSingleton,
        ssrFormState
      );
      JSCompiler_inline_result$jscomp$0.dispatch = ssrFormState;
      JSCompiler_inline_result.memoizedState = action;
      return [initialStateProp, ssrFormState, false];
    }
    function updateActionState(action) {
      var stateHook = updateWorkInProgressHook();
      return updateActionStateImpl(stateHook, currentHook, action);
    }
    function updateActionStateImpl(stateHook, currentStateHook, action) {
      currentStateHook = updateReducerImpl(
        stateHook,
        currentStateHook,
        actionStateReducer
      )[0];
      stateHook = updateReducer(basicStateReducer)[0];
      if ("object" === typeof currentStateHook && null !== currentStateHook && "function" === typeof currentStateHook.then)
        try {
          var state = useThenable(currentStateHook);
        } catch (x) {
          if (x === SuspenseException) throw SuspenseActionException;
          throw x;
        }
      else state = currentStateHook;
      currentStateHook = updateWorkInProgressHook();
      var actionQueue = currentStateHook.queue, dispatch = actionQueue.dispatch;
      action !== currentStateHook.memoizedState && (currentlyRenderingFiber.flags |= 2048, pushSimpleEffect(
        9,
        { destroy: void 0 },
        actionStateActionEffect.bind(null, actionQueue, action),
        null
      ));
      return [state, dispatch, stateHook];
    }
    function actionStateActionEffect(actionQueue, action) {
      actionQueue.action = action;
    }
    function rerenderActionState(action) {
      var stateHook = updateWorkInProgressHook(), currentStateHook = currentHook;
      if (null !== currentStateHook)
        return updateActionStateImpl(stateHook, currentStateHook, action);
      updateWorkInProgressHook();
      stateHook = stateHook.memoizedState;
      currentStateHook = updateWorkInProgressHook();
      var dispatch = currentStateHook.queue.dispatch;
      currentStateHook.memoizedState = action;
      return [stateHook, dispatch, false];
    }
    function pushSimpleEffect(tag, inst, create, deps) {
      tag = { tag, create, deps, inst, next: null };
      inst = currentlyRenderingFiber.updateQueue;
      null === inst && (inst = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = inst);
      create = inst.lastEffect;
      null === create ? inst.lastEffect = tag.next = tag : (deps = create.next, create.next = tag, tag.next = deps, inst.lastEffect = tag);
      return tag;
    }
    function updateRef() {
      return updateWorkInProgressHook().memoizedState;
    }
    function mountEffectImpl(fiberFlags, hookFlags, create, deps) {
      var hook = mountWorkInProgressHook();
      currentlyRenderingFiber.flags |= fiberFlags;
      hook.memoizedState = pushSimpleEffect(
        1 | hookFlags,
        { destroy: void 0 },
        create,
        void 0 === deps ? null : deps
      );
    }
    function updateEffectImpl(fiberFlags, hookFlags, create, deps) {
      var hook = updateWorkInProgressHook();
      deps = void 0 === deps ? null : deps;
      var inst = hook.memoizedState.inst;
      null !== currentHook && null !== deps && areHookInputsEqual(deps, currentHook.memoizedState.deps) ? hook.memoizedState = pushSimpleEffect(hookFlags, inst, create, deps) : (currentlyRenderingFiber.flags |= fiberFlags, hook.memoizedState = pushSimpleEffect(
        1 | hookFlags,
        inst,
        create,
        deps
      ));
    }
    function mountEffect(create, deps) {
      mountEffectImpl(8390656, 8, create, deps);
    }
    function updateEffect(create, deps) {
      updateEffectImpl(2048, 8, create, deps);
    }
    function useEffectEventImpl(payload) {
      currentlyRenderingFiber.flags |= 4;
      var componentUpdateQueue = currentlyRenderingFiber.updateQueue;
      if (null === componentUpdateQueue)
        componentUpdateQueue = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = componentUpdateQueue, componentUpdateQueue.events = [payload];
      else {
        var events = componentUpdateQueue.events;
        null === events ? componentUpdateQueue.events = [payload] : events.push(payload);
      }
    }
    function updateEvent(callback) {
      var ref = updateWorkInProgressHook().memoizedState;
      useEffectEventImpl({ ref, nextImpl: callback });
      return function() {
        if (0 !== (executionContext & 2)) throw Error(formatProdErrorMessage(440));
        return ref.impl.apply(void 0, arguments);
      };
    }
    function updateInsertionEffect(create, deps) {
      return updateEffectImpl(4, 2, create, deps);
    }
    function updateLayoutEffect(create, deps) {
      return updateEffectImpl(4, 4, create, deps);
    }
    function imperativeHandleEffect(create, ref) {
      if ("function" === typeof ref) {
        create = create();
        var refCleanup = ref(create);
        return function() {
          "function" === typeof refCleanup ? refCleanup() : ref(null);
        };
      }
      if (null !== ref && void 0 !== ref)
        return create = create(), ref.current = create, function() {
          ref.current = null;
        };
    }
    function updateImperativeHandle(ref, create, deps) {
      deps = null !== deps && void 0 !== deps ? deps.concat([ref]) : null;
      updateEffectImpl(4, 4, imperativeHandleEffect.bind(null, create, ref), deps);
    }
    function mountDebugValue() {
    }
    function updateCallback(callback, deps) {
      var hook = updateWorkInProgressHook();
      deps = void 0 === deps ? null : deps;
      var prevState = hook.memoizedState;
      if (null !== deps && areHookInputsEqual(deps, prevState[1]))
        return prevState[0];
      hook.memoizedState = [callback, deps];
      return callback;
    }
    function updateMemo(nextCreate, deps) {
      var hook = updateWorkInProgressHook();
      deps = void 0 === deps ? null : deps;
      var prevState = hook.memoizedState;
      if (null !== deps && areHookInputsEqual(deps, prevState[1]))
        return prevState[0];
      prevState = nextCreate();
      if (shouldDoubleInvokeUserFnsInHooksDEV) {
        setIsStrictModeForDevtools(true);
        try {
          nextCreate();
        } finally {
          setIsStrictModeForDevtools(false);
        }
      }
      hook.memoizedState = [prevState, deps];
      return prevState;
    }
    function mountDeferredValueImpl(hook, value, initialValue) {
      if (void 0 === initialValue || 0 !== (renderLanes & 1073741824) && 0 === (workInProgressRootRenderLanes & 261930))
        return hook.memoizedState = value;
      hook.memoizedState = initialValue;
      hook = requestDeferredLane();
      currentlyRenderingFiber.lanes |= hook;
      workInProgressRootSkippedLanes |= hook;
      return initialValue;
    }
    function updateDeferredValueImpl(hook, prevValue, value, initialValue) {
      if (objectIs(value, prevValue)) return value;
      if (null !== currentTreeHiddenStackCursor.current)
        return hook = mountDeferredValueImpl(hook, value, initialValue), objectIs(hook, prevValue) || (didReceiveUpdate = true), hook;
      if (0 === (renderLanes & 42) || 0 !== (renderLanes & 1073741824) && 0 === (workInProgressRootRenderLanes & 261930))
        return didReceiveUpdate = true, hook.memoizedState = value;
      hook = requestDeferredLane();
      currentlyRenderingFiber.lanes |= hook;
      workInProgressRootSkippedLanes |= hook;
      return prevValue;
    }
    function startTransition(fiber, queue, pendingState, finishedState, callback) {
      var previousPriority = ReactDOMSharedInternals.p;
      ReactDOMSharedInternals.p = 0 !== previousPriority && 8 > previousPriority ? previousPriority : 8;
      var prevTransition = ReactSharedInternals.T, currentTransition = {};
      ReactSharedInternals.T = currentTransition;
      dispatchOptimisticSetState(fiber, false, queue, pendingState);
      try {
        var returnValue = callback(), onStartTransitionFinish = ReactSharedInternals.S;
        null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
        if (null !== returnValue && "object" === typeof returnValue && "function" === typeof returnValue.then) {
          var thenableForFinishedState = chainThenableValue(
            returnValue,
            finishedState
          );
          dispatchSetStateInternal(
            fiber,
            queue,
            thenableForFinishedState,
            requestUpdateLane(fiber)
          );
        } else
          dispatchSetStateInternal(
            fiber,
            queue,
            finishedState,
            requestUpdateLane(fiber)
          );
      } catch (error) {
        dispatchSetStateInternal(
          fiber,
          queue,
          { then: function() {
          }, status: "rejected", reason: error },
          requestUpdateLane()
        );
      } finally {
        ReactDOMSharedInternals.p = previousPriority, null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
      }
    }
    function noop() {
    }
    function startHostTransition(formFiber, pendingState, action, formData) {
      if (5 !== formFiber.tag) throw Error(formatProdErrorMessage(476));
      var queue = ensureFormComponentIsStateful(formFiber).queue;
      startTransition(
        formFiber,
        queue,
        pendingState,
        sharedNotPendingObject,
        null === action ? noop : function() {
          requestFormReset$1(formFiber);
          return action(formData);
        }
      );
    }
    function ensureFormComponentIsStateful(formFiber) {
      var existingStateHook = formFiber.memoizedState;
      if (null !== existingStateHook) return existingStateHook;
      existingStateHook = {
        memoizedState: sharedNotPendingObject,
        baseState: sharedNotPendingObject,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: basicStateReducer,
          lastRenderedState: sharedNotPendingObject
        },
        next: null
      };
      var initialResetState = {};
      existingStateHook.next = {
        memoizedState: initialResetState,
        baseState: initialResetState,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: basicStateReducer,
          lastRenderedState: initialResetState
        },
        next: null
      };
      formFiber.memoizedState = existingStateHook;
      formFiber = formFiber.alternate;
      null !== formFiber && (formFiber.memoizedState = existingStateHook);
      return existingStateHook;
    }
    function requestFormReset$1(formFiber) {
      var stateHook = ensureFormComponentIsStateful(formFiber);
      null === stateHook.next && (stateHook = formFiber.alternate.memoizedState);
      dispatchSetStateInternal(
        formFiber,
        stateHook.next.queue,
        {},
        requestUpdateLane()
      );
    }
    function useHostTransitionStatus() {
      return readContext(HostTransitionContext);
    }
    function updateId() {
      return updateWorkInProgressHook().memoizedState;
    }
    function updateRefresh() {
      return updateWorkInProgressHook().memoizedState;
    }
    function refreshCache(fiber) {
      for (var provider = fiber.return; null !== provider; ) {
        switch (provider.tag) {
          case 24:
          case 3:
            var lane = requestUpdateLane();
            fiber = createUpdate(lane);
            var root$69 = enqueueUpdate(provider, fiber, lane);
            null !== root$69 && (scheduleUpdateOnFiber(root$69, provider, lane), entangleTransitions(root$69, provider, lane));
            provider = { cache: createCache() };
            fiber.payload = provider;
            return;
        }
        provider = provider.return;
      }
    }
    function dispatchReducerAction(fiber, queue, action) {
      var lane = requestUpdateLane();
      action = {
        lane,
        revertLane: 0,
        gesture: null,
        action,
        hasEagerState: false,
        eagerState: null,
        next: null
      };
      isRenderPhaseUpdate(fiber) ? enqueueRenderPhaseUpdate(queue, action) : (action = enqueueConcurrentHookUpdate(fiber, queue, action, lane), null !== action && (scheduleUpdateOnFiber(action, fiber, lane), entangleTransitionUpdate(action, queue, lane)));
    }
    function dispatchSetState(fiber, queue, action) {
      var lane = requestUpdateLane();
      dispatchSetStateInternal(fiber, queue, action, lane);
    }
    function dispatchSetStateInternal(fiber, queue, action, lane) {
      var update = {
        lane,
        revertLane: 0,
        gesture: null,
        action,
        hasEagerState: false,
        eagerState: null,
        next: null
      };
      if (isRenderPhaseUpdate(fiber)) enqueueRenderPhaseUpdate(queue, update);
      else {
        var alternate = fiber.alternate;
        if (0 === fiber.lanes && (null === alternate || 0 === alternate.lanes) && (alternate = queue.lastRenderedReducer, null !== alternate))
          try {
            var currentState = queue.lastRenderedState, eagerState = alternate(currentState, action);
            update.hasEagerState = true;
            update.eagerState = eagerState;
            if (objectIs(eagerState, currentState))
              return enqueueUpdate$1(fiber, queue, update, 0), null === workInProgressRoot && finishQueueingConcurrentUpdates(), false;
          } catch (error) {
          } finally {
          }
        action = enqueueConcurrentHookUpdate(fiber, queue, update, lane);
        if (null !== action)
          return scheduleUpdateOnFiber(action, fiber, lane), entangleTransitionUpdate(action, queue, lane), true;
      }
      return false;
    }
    function dispatchOptimisticSetState(fiber, throwIfDuringRender, queue, action) {
      action = {
        lane: 2,
        revertLane: requestTransitionLane(),
        gesture: null,
        action,
        hasEagerState: false,
        eagerState: null,
        next: null
      };
      if (isRenderPhaseUpdate(fiber)) {
        if (throwIfDuringRender) throw Error(formatProdErrorMessage(479));
      } else
        throwIfDuringRender = enqueueConcurrentHookUpdate(
          fiber,
          queue,
          action,
          2
        ), null !== throwIfDuringRender && scheduleUpdateOnFiber(throwIfDuringRender, fiber, 2);
    }
    function isRenderPhaseUpdate(fiber) {
      var alternate = fiber.alternate;
      return fiber === currentlyRenderingFiber || null !== alternate && alternate === currentlyRenderingFiber;
    }
    function enqueueRenderPhaseUpdate(queue, update) {
      didScheduleRenderPhaseUpdateDuringThisPass = didScheduleRenderPhaseUpdate = true;
      var pending = queue.pending;
      null === pending ? update.next = update : (update.next = pending.next, pending.next = update);
      queue.pending = update;
    }
    function entangleTransitionUpdate(root3, queue, lane) {
      if (0 !== (lane & 4194048)) {
        var queueLanes = queue.lanes;
        queueLanes &= root3.pendingLanes;
        lane |= queueLanes;
        queue.lanes = lane;
        markRootEntangled(root3, lane);
      }
    }
    var ContextOnlyDispatcher = {
      readContext,
      use,
      useCallback: throwInvalidHookError,
      useContext: throwInvalidHookError,
      useEffect: throwInvalidHookError,
      useImperativeHandle: throwInvalidHookError,
      useLayoutEffect: throwInvalidHookError,
      useInsertionEffect: throwInvalidHookError,
      useMemo: throwInvalidHookError,
      useReducer: throwInvalidHookError,
      useRef: throwInvalidHookError,
      useState: throwInvalidHookError,
      useDebugValue: throwInvalidHookError,
      useDeferredValue: throwInvalidHookError,
      useTransition: throwInvalidHookError,
      useSyncExternalStore: throwInvalidHookError,
      useId: throwInvalidHookError,
      useHostTransitionStatus: throwInvalidHookError,
      useFormState: throwInvalidHookError,
      useActionState: throwInvalidHookError,
      useOptimistic: throwInvalidHookError,
      useMemoCache: throwInvalidHookError,
      useCacheRefresh: throwInvalidHookError
    };
    ContextOnlyDispatcher.useEffectEvent = throwInvalidHookError;
    var HooksDispatcherOnMount = {
      readContext,
      use,
      useCallback: function(callback, deps) {
        mountWorkInProgressHook().memoizedState = [
          callback,
          void 0 === deps ? null : deps
        ];
        return callback;
      },
      useContext: readContext,
      useEffect: mountEffect,
      useImperativeHandle: function(ref, create, deps) {
        deps = null !== deps && void 0 !== deps ? deps.concat([ref]) : null;
        mountEffectImpl(
          4194308,
          4,
          imperativeHandleEffect.bind(null, create, ref),
          deps
        );
      },
      useLayoutEffect: function(create, deps) {
        return mountEffectImpl(4194308, 4, create, deps);
      },
      useInsertionEffect: function(create, deps) {
        mountEffectImpl(4, 2, create, deps);
      },
      useMemo: function(nextCreate, deps) {
        var hook = mountWorkInProgressHook();
        deps = void 0 === deps ? null : deps;
        var nextValue = nextCreate();
        if (shouldDoubleInvokeUserFnsInHooksDEV) {
          setIsStrictModeForDevtools(true);
          try {
            nextCreate();
          } finally {
            setIsStrictModeForDevtools(false);
          }
        }
        hook.memoizedState = [nextValue, deps];
        return nextValue;
      },
      useReducer: function(reducer, initialArg, init) {
        var hook = mountWorkInProgressHook();
        if (void 0 !== init) {
          var initialState = init(initialArg);
          if (shouldDoubleInvokeUserFnsInHooksDEV) {
            setIsStrictModeForDevtools(true);
            try {
              init(initialArg);
            } finally {
              setIsStrictModeForDevtools(false);
            }
          }
        } else initialState = initialArg;
        hook.memoizedState = hook.baseState = initialState;
        reducer = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: reducer,
          lastRenderedState: initialState
        };
        hook.queue = reducer;
        reducer = reducer.dispatch = dispatchReducerAction.bind(
          null,
          currentlyRenderingFiber,
          reducer
        );
        return [hook.memoizedState, reducer];
      },
      useRef: function(initialValue) {
        var hook = mountWorkInProgressHook();
        initialValue = { current: initialValue };
        return hook.memoizedState = initialValue;
      },
      useState: function(initialState) {
        initialState = mountStateImpl(initialState);
        var queue = initialState.queue, dispatch = dispatchSetState.bind(null, currentlyRenderingFiber, queue);
        queue.dispatch = dispatch;
        return [initialState.memoizedState, dispatch];
      },
      useDebugValue: mountDebugValue,
      useDeferredValue: function(value, initialValue) {
        var hook = mountWorkInProgressHook();
        return mountDeferredValueImpl(hook, value, initialValue);
      },
      useTransition: function() {
        var stateHook = mountStateImpl(false);
        stateHook = startTransition.bind(
          null,
          currentlyRenderingFiber,
          stateHook.queue,
          true,
          false
        );
        mountWorkInProgressHook().memoizedState = stateHook;
        return [false, stateHook];
      },
      useSyncExternalStore: function(subscribe, getSnapshot, getServerSnapshot) {
        var fiber = currentlyRenderingFiber, hook = mountWorkInProgressHook();
        if (isHydrating) {
          if (void 0 === getServerSnapshot)
            throw Error(formatProdErrorMessage(407));
          getServerSnapshot = getServerSnapshot();
        } else {
          getServerSnapshot = getSnapshot();
          if (null === workInProgressRoot)
            throw Error(formatProdErrorMessage(349));
          0 !== (workInProgressRootRenderLanes & 127) || pushStoreConsistencyCheck(fiber, getSnapshot, getServerSnapshot);
        }
        hook.memoizedState = getServerSnapshot;
        var inst = { value: getServerSnapshot, getSnapshot };
        hook.queue = inst;
        mountEffect(subscribeToStore.bind(null, fiber, inst, subscribe), [
          subscribe
        ]);
        fiber.flags |= 2048;
        pushSimpleEffect(
          9,
          { destroy: void 0 },
          updateStoreInstance.bind(
            null,
            fiber,
            inst,
            getServerSnapshot,
            getSnapshot
          ),
          null
        );
        return getServerSnapshot;
      },
      useId: function() {
        var hook = mountWorkInProgressHook(), identifierPrefix = workInProgressRoot.identifierPrefix;
        if (isHydrating) {
          var JSCompiler_inline_result = treeContextOverflow;
          var idWithLeadingBit = treeContextId;
          JSCompiler_inline_result = (idWithLeadingBit & ~(1 << 32 - clz32(idWithLeadingBit) - 1)).toString(32) + JSCompiler_inline_result;
          identifierPrefix = "_" + identifierPrefix + "R_" + JSCompiler_inline_result;
          JSCompiler_inline_result = localIdCounter++;
          0 < JSCompiler_inline_result && (identifierPrefix += "H" + JSCompiler_inline_result.toString(32));
          identifierPrefix += "_";
        } else
          JSCompiler_inline_result = globalClientIdCounter++, identifierPrefix = "_" + identifierPrefix + "r_" + JSCompiler_inline_result.toString(32) + "_";
        return hook.memoizedState = identifierPrefix;
      },
      useHostTransitionStatus,
      useFormState: mountActionState,
      useActionState: mountActionState,
      useOptimistic: function(passthrough) {
        var hook = mountWorkInProgressHook();
        hook.memoizedState = hook.baseState = passthrough;
        var queue = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null
        };
        hook.queue = queue;
        hook = dispatchOptimisticSetState.bind(
          null,
          currentlyRenderingFiber,
          true,
          queue
        );
        queue.dispatch = hook;
        return [passthrough, hook];
      },
      useMemoCache,
      useCacheRefresh: function() {
        return mountWorkInProgressHook().memoizedState = refreshCache.bind(
          null,
          currentlyRenderingFiber
        );
      },
      useEffectEvent: function(callback) {
        var hook = mountWorkInProgressHook(), ref = { impl: callback };
        hook.memoizedState = ref;
        return function() {
          if (0 !== (executionContext & 2))
            throw Error(formatProdErrorMessage(440));
          return ref.impl.apply(void 0, arguments);
        };
      }
    }, HooksDispatcherOnUpdate = {
      readContext,
      use,
      useCallback: updateCallback,
      useContext: readContext,
      useEffect: updateEffect,
      useImperativeHandle: updateImperativeHandle,
      useInsertionEffect: updateInsertionEffect,
      useLayoutEffect: updateLayoutEffect,
      useMemo: updateMemo,
      useReducer: updateReducer,
      useRef: updateRef,
      useState: function() {
        return updateReducer(basicStateReducer);
      },
      useDebugValue: mountDebugValue,
      useDeferredValue: function(value, initialValue) {
        var hook = updateWorkInProgressHook();
        return updateDeferredValueImpl(
          hook,
          currentHook.memoizedState,
          value,
          initialValue
        );
      },
      useTransition: function() {
        var booleanOrThenable = updateReducer(basicStateReducer)[0], start = updateWorkInProgressHook().memoizedState;
        return [
          "boolean" === typeof booleanOrThenable ? booleanOrThenable : useThenable(booleanOrThenable),
          start
        ];
      },
      useSyncExternalStore: updateSyncExternalStore,
      useId: updateId,
      useHostTransitionStatus,
      useFormState: updateActionState,
      useActionState: updateActionState,
      useOptimistic: function(passthrough, reducer) {
        var hook = updateWorkInProgressHook();
        return updateOptimisticImpl(hook, currentHook, passthrough, reducer);
      },
      useMemoCache,
      useCacheRefresh: updateRefresh
    };
    HooksDispatcherOnUpdate.useEffectEvent = updateEvent;
    var HooksDispatcherOnRerender = {
      readContext,
      use,
      useCallback: updateCallback,
      useContext: readContext,
      useEffect: updateEffect,
      useImperativeHandle: updateImperativeHandle,
      useInsertionEffect: updateInsertionEffect,
      useLayoutEffect: updateLayoutEffect,
      useMemo: updateMemo,
      useReducer: rerenderReducer,
      useRef: updateRef,
      useState: function() {
        return rerenderReducer(basicStateReducer);
      },
      useDebugValue: mountDebugValue,
      useDeferredValue: function(value, initialValue) {
        var hook = updateWorkInProgressHook();
        return null === currentHook ? mountDeferredValueImpl(hook, value, initialValue) : updateDeferredValueImpl(
          hook,
          currentHook.memoizedState,
          value,
          initialValue
        );
      },
      useTransition: function() {
        var booleanOrThenable = rerenderReducer(basicStateReducer)[0], start = updateWorkInProgressHook().memoizedState;
        return [
          "boolean" === typeof booleanOrThenable ? booleanOrThenable : useThenable(booleanOrThenable),
          start
        ];
      },
      useSyncExternalStore: updateSyncExternalStore,
      useId: updateId,
      useHostTransitionStatus,
      useFormState: rerenderActionState,
      useActionState: rerenderActionState,
      useOptimistic: function(passthrough, reducer) {
        var hook = updateWorkInProgressHook();
        if (null !== currentHook)
          return updateOptimisticImpl(hook, currentHook, passthrough, reducer);
        hook.baseState = passthrough;
        return [passthrough, hook.queue.dispatch];
      },
      useMemoCache,
      useCacheRefresh: updateRefresh
    };
    HooksDispatcherOnRerender.useEffectEvent = updateEvent;
    function applyDerivedStateFromProps(workInProgress2, ctor, getDerivedStateFromProps, nextProps) {
      ctor = workInProgress2.memoizedState;
      getDerivedStateFromProps = getDerivedStateFromProps(nextProps, ctor);
      getDerivedStateFromProps = null === getDerivedStateFromProps || void 0 === getDerivedStateFromProps ? ctor : assign({}, ctor, getDerivedStateFromProps);
      workInProgress2.memoizedState = getDerivedStateFromProps;
      0 === workInProgress2.lanes && (workInProgress2.updateQueue.baseState = getDerivedStateFromProps);
    }
    var classComponentUpdater = {
      enqueueSetState: function(inst, payload, callback) {
        inst = inst._reactInternals;
        var lane = requestUpdateLane(), update = createUpdate(lane);
        update.payload = payload;
        void 0 !== callback && null !== callback && (update.callback = callback);
        payload = enqueueUpdate(inst, update, lane);
        null !== payload && (scheduleUpdateOnFiber(payload, inst, lane), entangleTransitions(payload, inst, lane));
      },
      enqueueReplaceState: function(inst, payload, callback) {
        inst = inst._reactInternals;
        var lane = requestUpdateLane(), update = createUpdate(lane);
        update.tag = 1;
        update.payload = payload;
        void 0 !== callback && null !== callback && (update.callback = callback);
        payload = enqueueUpdate(inst, update, lane);
        null !== payload && (scheduleUpdateOnFiber(payload, inst, lane), entangleTransitions(payload, inst, lane));
      },
      enqueueForceUpdate: function(inst, callback) {
        inst = inst._reactInternals;
        var lane = requestUpdateLane(), update = createUpdate(lane);
        update.tag = 2;
        void 0 !== callback && null !== callback && (update.callback = callback);
        callback = enqueueUpdate(inst, update, lane);
        null !== callback && (scheduleUpdateOnFiber(callback, inst, lane), entangleTransitions(callback, inst, lane));
      }
    };
    function checkShouldComponentUpdate(workInProgress2, ctor, oldProps, newProps, oldState, newState, nextContext) {
      workInProgress2 = workInProgress2.stateNode;
      return "function" === typeof workInProgress2.shouldComponentUpdate ? workInProgress2.shouldComponentUpdate(newProps, newState, nextContext) : ctor.prototype && ctor.prototype.isPureReactComponent ? !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState) : true;
    }
    function callComponentWillReceiveProps(workInProgress2, instance, newProps, nextContext) {
      workInProgress2 = instance.state;
      "function" === typeof instance.componentWillReceiveProps && instance.componentWillReceiveProps(newProps, nextContext);
      "function" === typeof instance.UNSAFE_componentWillReceiveProps && instance.UNSAFE_componentWillReceiveProps(newProps, nextContext);
      instance.state !== workInProgress2 && classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
    }
    function resolveClassComponentProps(Component, baseProps) {
      var newProps = baseProps;
      if ("ref" in baseProps) {
        newProps = {};
        for (var propName in baseProps)
          "ref" !== propName && (newProps[propName] = baseProps[propName]);
      }
      if (Component = Component.defaultProps) {
        newProps === baseProps && (newProps = assign({}, newProps));
        for (var propName$73 in Component)
          void 0 === newProps[propName$73] && (newProps[propName$73] = Component[propName$73]);
      }
      return newProps;
    }
    function defaultOnUncaughtError(error) {
      reportGlobalError(error);
    }
    function defaultOnCaughtError(error) {
      console.error(error);
    }
    function defaultOnRecoverableError(error) {
      reportGlobalError(error);
    }
    function logUncaughtError(root3, errorInfo) {
      try {
        var onUncaughtError = root3.onUncaughtError;
        onUncaughtError(errorInfo.value, { componentStack: errorInfo.stack });
      } catch (e$74) {
        setTimeout(function() {
          throw e$74;
        });
      }
    }
    function logCaughtError(root3, boundary, errorInfo) {
      try {
        var onCaughtError = root3.onCaughtError;
        onCaughtError(errorInfo.value, {
          componentStack: errorInfo.stack,
          errorBoundary: 1 === boundary.tag ? boundary.stateNode : null
        });
      } catch (e$75) {
        setTimeout(function() {
          throw e$75;
        });
      }
    }
    function createRootErrorUpdate(root3, errorInfo, lane) {
      lane = createUpdate(lane);
      lane.tag = 3;
      lane.payload = { element: null };
      lane.callback = function() {
        logUncaughtError(root3, errorInfo);
      };
      return lane;
    }
    function createClassErrorUpdate(lane) {
      lane = createUpdate(lane);
      lane.tag = 3;
      return lane;
    }
    function initializeClassErrorUpdate(update, root3, fiber, errorInfo) {
      var getDerivedStateFromError = fiber.type.getDerivedStateFromError;
      if ("function" === typeof getDerivedStateFromError) {
        var error = errorInfo.value;
        update.payload = function() {
          return getDerivedStateFromError(error);
        };
        update.callback = function() {
          logCaughtError(root3, fiber, errorInfo);
        };
      }
      var inst = fiber.stateNode;
      null !== inst && "function" === typeof inst.componentDidCatch && (update.callback = function() {
        logCaughtError(root3, fiber, errorInfo);
        "function" !== typeof getDerivedStateFromError && (null === legacyErrorBoundariesThatAlreadyFailed ? legacyErrorBoundariesThatAlreadyFailed = /* @__PURE__ */ new Set([this]) : legacyErrorBoundariesThatAlreadyFailed.add(this));
        var stack = errorInfo.stack;
        this.componentDidCatch(errorInfo.value, {
          componentStack: null !== stack ? stack : ""
        });
      });
    }
    function throwException(root3, returnFiber, sourceFiber, value, rootRenderLanes) {
      sourceFiber.flags |= 32768;
      if (null !== value && "object" === typeof value && "function" === typeof value.then) {
        returnFiber = sourceFiber.alternate;
        null !== returnFiber && propagateParentContextChanges(
          returnFiber,
          sourceFiber,
          rootRenderLanes,
          true
        );
        sourceFiber = suspenseHandlerStackCursor.current;
        if (null !== sourceFiber) {
          switch (sourceFiber.tag) {
            case 31:
            case 13:
              return null === shellBoundary ? renderDidSuspendDelayIfPossible() : null === sourceFiber.alternate && 0 === workInProgressRootExitStatus && (workInProgressRootExitStatus = 3), sourceFiber.flags &= -257, sourceFiber.flags |= 65536, sourceFiber.lanes = rootRenderLanes, value === noopSuspenseyCommitThenable ? sourceFiber.flags |= 16384 : (returnFiber = sourceFiber.updateQueue, null === returnFiber ? sourceFiber.updateQueue = /* @__PURE__ */ new Set([value]) : returnFiber.add(value), attachPingListener(root3, value, rootRenderLanes)), false;
            case 22:
              return sourceFiber.flags |= 65536, value === noopSuspenseyCommitThenable ? sourceFiber.flags |= 16384 : (returnFiber = sourceFiber.updateQueue, null === returnFiber ? (returnFiber = {
                transitions: null,
                markerInstances: null,
                retryQueue: /* @__PURE__ */ new Set([value])
              }, sourceFiber.updateQueue = returnFiber) : (sourceFiber = returnFiber.retryQueue, null === sourceFiber ? returnFiber.retryQueue = /* @__PURE__ */ new Set([value]) : sourceFiber.add(value)), attachPingListener(root3, value, rootRenderLanes)), false;
          }
          throw Error(formatProdErrorMessage(435, sourceFiber.tag));
        }
        attachPingListener(root3, value, rootRenderLanes);
        renderDidSuspendDelayIfPossible();
        return false;
      }
      if (isHydrating)
        return returnFiber = suspenseHandlerStackCursor.current, null !== returnFiber ? (0 === (returnFiber.flags & 65536) && (returnFiber.flags |= 256), returnFiber.flags |= 65536, returnFiber.lanes = rootRenderLanes, value !== HydrationMismatchException && (root3 = Error(formatProdErrorMessage(422), { cause: value }), queueHydrationError(createCapturedValueAtFiber(root3, sourceFiber)))) : (value !== HydrationMismatchException && (returnFiber = Error(formatProdErrorMessage(423), {
          cause: value
        }), queueHydrationError(
          createCapturedValueAtFiber(returnFiber, sourceFiber)
        )), root3 = root3.current.alternate, root3.flags |= 65536, rootRenderLanes &= -rootRenderLanes, root3.lanes |= rootRenderLanes, value = createCapturedValueAtFiber(value, sourceFiber), rootRenderLanes = createRootErrorUpdate(
          root3.stateNode,
          value,
          rootRenderLanes
        ), enqueueCapturedUpdate(root3, rootRenderLanes), 4 !== workInProgressRootExitStatus && (workInProgressRootExitStatus = 2)), false;
      var wrapperError = Error(formatProdErrorMessage(520), { cause: value });
      wrapperError = createCapturedValueAtFiber(wrapperError, sourceFiber);
      null === workInProgressRootConcurrentErrors ? workInProgressRootConcurrentErrors = [wrapperError] : workInProgressRootConcurrentErrors.push(wrapperError);
      4 !== workInProgressRootExitStatus && (workInProgressRootExitStatus = 2);
      if (null === returnFiber) return true;
      value = createCapturedValueAtFiber(value, sourceFiber);
      sourceFiber = returnFiber;
      do {
        switch (sourceFiber.tag) {
          case 3:
            return sourceFiber.flags |= 65536, root3 = rootRenderLanes & -rootRenderLanes, sourceFiber.lanes |= root3, root3 = createRootErrorUpdate(sourceFiber.stateNode, value, root3), enqueueCapturedUpdate(sourceFiber, root3), false;
          case 1:
            if (returnFiber = sourceFiber.type, wrapperError = sourceFiber.stateNode, 0 === (sourceFiber.flags & 128) && ("function" === typeof returnFiber.getDerivedStateFromError || null !== wrapperError && "function" === typeof wrapperError.componentDidCatch && (null === legacyErrorBoundariesThatAlreadyFailed || !legacyErrorBoundariesThatAlreadyFailed.has(wrapperError))))
              return sourceFiber.flags |= 65536, rootRenderLanes &= -rootRenderLanes, sourceFiber.lanes |= rootRenderLanes, rootRenderLanes = createClassErrorUpdate(rootRenderLanes), initializeClassErrorUpdate(
                rootRenderLanes,
                root3,
                sourceFiber,
                value
              ), enqueueCapturedUpdate(sourceFiber, rootRenderLanes), false;
        }
        sourceFiber = sourceFiber.return;
      } while (null !== sourceFiber);
      return false;
    }
    var SelectiveHydrationException = Error(formatProdErrorMessage(461)), didReceiveUpdate = false;
    function reconcileChildren(current, workInProgress2, nextChildren, renderLanes2) {
      workInProgress2.child = null === current ? mountChildFibers(workInProgress2, null, nextChildren, renderLanes2) : reconcileChildFibers(
        workInProgress2,
        current.child,
        nextChildren,
        renderLanes2
      );
    }
    function updateForwardRef(current, workInProgress2, Component, nextProps, renderLanes2) {
      Component = Component.render;
      var ref = workInProgress2.ref;
      if ("ref" in nextProps) {
        var propsWithoutRef = {};
        for (var key in nextProps)
          "ref" !== key && (propsWithoutRef[key] = nextProps[key]);
      } else propsWithoutRef = nextProps;
      prepareToReadContext(workInProgress2);
      nextProps = renderWithHooks(
        current,
        workInProgress2,
        Component,
        propsWithoutRef,
        ref,
        renderLanes2
      );
      key = checkDidRenderIdHook();
      if (null !== current && !didReceiveUpdate)
        return bailoutHooks(current, workInProgress2, renderLanes2), bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
      isHydrating && key && pushMaterializedTreeId(workInProgress2);
      workInProgress2.flags |= 1;
      reconcileChildren(current, workInProgress2, nextProps, renderLanes2);
      return workInProgress2.child;
    }
    function updateMemoComponent(current, workInProgress2, Component, nextProps, renderLanes2) {
      if (null === current) {
        var type = Component.type;
        if ("function" === typeof type && !shouldConstruct(type) && void 0 === type.defaultProps && null === Component.compare)
          return workInProgress2.tag = 15, workInProgress2.type = type, updateSimpleMemoComponent(
            current,
            workInProgress2,
            type,
            nextProps,
            renderLanes2
          );
        current = createFiberFromTypeAndProps(
          Component.type,
          null,
          nextProps,
          workInProgress2,
          workInProgress2.mode,
          renderLanes2
        );
        current.ref = workInProgress2.ref;
        current.return = workInProgress2;
        return workInProgress2.child = current;
      }
      type = current.child;
      if (!checkScheduledUpdateOrContext(current, renderLanes2)) {
        var prevProps = type.memoizedProps;
        Component = Component.compare;
        Component = null !== Component ? Component : shallowEqual;
        if (Component(prevProps, nextProps) && current.ref === workInProgress2.ref)
          return bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
      }
      workInProgress2.flags |= 1;
      current = createWorkInProgress(type, nextProps);
      current.ref = workInProgress2.ref;
      current.return = workInProgress2;
      return workInProgress2.child = current;
    }
    function updateSimpleMemoComponent(current, workInProgress2, Component, nextProps, renderLanes2) {
      if (null !== current) {
        var prevProps = current.memoizedProps;
        if (shallowEqual(prevProps, nextProps) && current.ref === workInProgress2.ref)
          if (didReceiveUpdate = false, workInProgress2.pendingProps = nextProps = prevProps, checkScheduledUpdateOrContext(current, renderLanes2))
            0 !== (current.flags & 131072) && (didReceiveUpdate = true);
          else
            return workInProgress2.lanes = current.lanes, bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
      }
      return updateFunctionComponent(
        current,
        workInProgress2,
        Component,
        nextProps,
        renderLanes2
      );
    }
    function updateOffscreenComponent(current, workInProgress2, renderLanes2, nextProps) {
      var nextChildren = nextProps.children, prevState = null !== current ? current.memoizedState : null;
      null === current && null === workInProgress2.stateNode && (workInProgress2.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null
      });
      if ("hidden" === nextProps.mode) {
        if (0 !== (workInProgress2.flags & 128)) {
          prevState = null !== prevState ? prevState.baseLanes | renderLanes2 : renderLanes2;
          if (null !== current) {
            nextProps = workInProgress2.child = current.child;
            for (nextChildren = 0; null !== nextProps; )
              nextChildren = nextChildren | nextProps.lanes | nextProps.childLanes, nextProps = nextProps.sibling;
            nextProps = nextChildren & ~prevState;
          } else nextProps = 0, workInProgress2.child = null;
          return deferHiddenOffscreenComponent(
            current,
            workInProgress2,
            prevState,
            renderLanes2,
            nextProps
          );
        }
        if (0 !== (renderLanes2 & 536870912))
          workInProgress2.memoizedState = { baseLanes: 0, cachePool: null }, null !== current && pushTransition(
            workInProgress2,
            null !== prevState ? prevState.cachePool : null
          ), null !== prevState ? pushHiddenContext(workInProgress2, prevState) : reuseHiddenContextOnStack(), pushOffscreenSuspenseHandler(workInProgress2);
        else
          return nextProps = workInProgress2.lanes = 536870912, deferHiddenOffscreenComponent(
            current,
            workInProgress2,
            null !== prevState ? prevState.baseLanes | renderLanes2 : renderLanes2,
            renderLanes2,
            nextProps
          );
      } else
        null !== prevState ? (pushTransition(workInProgress2, prevState.cachePool), pushHiddenContext(workInProgress2, prevState), reuseSuspenseHandlerOnStack(), workInProgress2.memoizedState = null) : (null !== current && pushTransition(workInProgress2, null), reuseHiddenContextOnStack(), reuseSuspenseHandlerOnStack());
      reconcileChildren(current, workInProgress2, nextChildren, renderLanes2);
      return workInProgress2.child;
    }
    function bailoutOffscreenComponent(current, workInProgress2) {
      null !== current && 22 === current.tag || null !== workInProgress2.stateNode || (workInProgress2.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null
      });
      return workInProgress2.sibling;
    }
    function deferHiddenOffscreenComponent(current, workInProgress2, nextBaseLanes, renderLanes2, remainingChildLanes) {
      var JSCompiler_inline_result = peekCacheFromPool();
      JSCompiler_inline_result = null === JSCompiler_inline_result ? null : { parent: CacheContext._currentValue, pool: JSCompiler_inline_result };
      workInProgress2.memoizedState = {
        baseLanes: nextBaseLanes,
        cachePool: JSCompiler_inline_result
      };
      null !== current && pushTransition(workInProgress2, null);
      reuseHiddenContextOnStack();
      pushOffscreenSuspenseHandler(workInProgress2);
      null !== current && propagateParentContextChanges(current, workInProgress2, renderLanes2, true);
      workInProgress2.childLanes = remainingChildLanes;
      return null;
    }
    function mountActivityChildren(workInProgress2, nextProps) {
      nextProps = mountWorkInProgressOffscreenFiber(
        { mode: nextProps.mode, children: nextProps.children },
        workInProgress2.mode
      );
      nextProps.ref = workInProgress2.ref;
      workInProgress2.child = nextProps;
      nextProps.return = workInProgress2;
      return nextProps;
    }
    function retryActivityComponentWithoutHydrating(current, workInProgress2, renderLanes2) {
      reconcileChildFibers(workInProgress2, current.child, null, renderLanes2);
      current = mountActivityChildren(workInProgress2, workInProgress2.pendingProps);
      current.flags |= 2;
      popSuspenseHandler(workInProgress2);
      workInProgress2.memoizedState = null;
      return current;
    }
    function updateActivityComponent(current, workInProgress2, renderLanes2) {
      var nextProps = workInProgress2.pendingProps, didSuspend = 0 !== (workInProgress2.flags & 128);
      workInProgress2.flags &= -129;
      if (null === current) {
        if (isHydrating) {
          if ("hidden" === nextProps.mode)
            return current = mountActivityChildren(workInProgress2, nextProps), workInProgress2.lanes = 536870912, bailoutOffscreenComponent(null, current);
          pushDehydratedActivitySuspenseHandler(workInProgress2);
          (current = nextHydratableInstance) ? (current = canHydrateHydrationBoundary(
            current,
            rootOrSingletonContext
          ), current = null !== current && "&" === current.data ? current : null, null !== current && (workInProgress2.memoizedState = {
            dehydrated: current,
            treeContext: null !== treeContextProvider ? { id: treeContextId, overflow: treeContextOverflow } : null,
            retryLane: 536870912,
            hydrationErrors: null
          }, renderLanes2 = createFiberFromDehydratedFragment(current), renderLanes2.return = workInProgress2, workInProgress2.child = renderLanes2, hydrationParentFiber = workInProgress2, nextHydratableInstance = null)) : current = null;
          if (null === current) throw throwOnHydrationMismatch(workInProgress2);
          workInProgress2.lanes = 536870912;
          return null;
        }
        return mountActivityChildren(workInProgress2, nextProps);
      }
      var prevState = current.memoizedState;
      if (null !== prevState) {
        var dehydrated = prevState.dehydrated;
        pushDehydratedActivitySuspenseHandler(workInProgress2);
        if (didSuspend)
          if (workInProgress2.flags & 256)
            workInProgress2.flags &= -257, workInProgress2 = retryActivityComponentWithoutHydrating(
              current,
              workInProgress2,
              renderLanes2
            );
          else if (null !== workInProgress2.memoizedState)
            workInProgress2.child = current.child, workInProgress2.flags |= 128, workInProgress2 = null;
          else throw Error(formatProdErrorMessage(558));
        else if (didReceiveUpdate || propagateParentContextChanges(current, workInProgress2, renderLanes2, false), didSuspend = 0 !== (renderLanes2 & current.childLanes), didReceiveUpdate || didSuspend) {
          nextProps = workInProgressRoot;
          if (null !== nextProps && (dehydrated = getBumpedLaneForHydration(nextProps, renderLanes2), 0 !== dehydrated && dehydrated !== prevState.retryLane))
            throw prevState.retryLane = dehydrated, enqueueConcurrentRenderForLane(current, dehydrated), scheduleUpdateOnFiber(nextProps, current, dehydrated), SelectiveHydrationException;
          renderDidSuspendDelayIfPossible();
          workInProgress2 = retryActivityComponentWithoutHydrating(
            current,
            workInProgress2,
            renderLanes2
          );
        } else
          current = prevState.treeContext, nextHydratableInstance = getNextHydratable(dehydrated.nextSibling), hydrationParentFiber = workInProgress2, isHydrating = true, hydrationErrors = null, rootOrSingletonContext = false, null !== current && restoreSuspendedTreeContext(workInProgress2, current), workInProgress2 = mountActivityChildren(workInProgress2, nextProps), workInProgress2.flags |= 4096;
        return workInProgress2;
      }
      current = createWorkInProgress(current.child, {
        mode: nextProps.mode,
        children: nextProps.children
      });
      current.ref = workInProgress2.ref;
      workInProgress2.child = current;
      current.return = workInProgress2;
      return current;
    }
    function markRef(current, workInProgress2) {
      var ref = workInProgress2.ref;
      if (null === ref)
        null !== current && null !== current.ref && (workInProgress2.flags |= 4194816);
      else {
        if ("function" !== typeof ref && "object" !== typeof ref)
          throw Error(formatProdErrorMessage(284));
        if (null === current || current.ref !== ref)
          workInProgress2.flags |= 4194816;
      }
    }
    function updateFunctionComponent(current, workInProgress2, Component, nextProps, renderLanes2) {
      prepareToReadContext(workInProgress2);
      Component = renderWithHooks(
        current,
        workInProgress2,
        Component,
        nextProps,
        void 0,
        renderLanes2
      );
      nextProps = checkDidRenderIdHook();
      if (null !== current && !didReceiveUpdate)
        return bailoutHooks(current, workInProgress2, renderLanes2), bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
      isHydrating && nextProps && pushMaterializedTreeId(workInProgress2);
      workInProgress2.flags |= 1;
      reconcileChildren(current, workInProgress2, Component, renderLanes2);
      return workInProgress2.child;
    }
    function replayFunctionComponent(current, workInProgress2, nextProps, Component, secondArg, renderLanes2) {
      prepareToReadContext(workInProgress2);
      workInProgress2.updateQueue = null;
      nextProps = renderWithHooksAgain(
        workInProgress2,
        Component,
        nextProps,
        secondArg
      );
      finishRenderingHooks(current);
      Component = checkDidRenderIdHook();
      if (null !== current && !didReceiveUpdate)
        return bailoutHooks(current, workInProgress2, renderLanes2), bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
      isHydrating && Component && pushMaterializedTreeId(workInProgress2);
      workInProgress2.flags |= 1;
      reconcileChildren(current, workInProgress2, nextProps, renderLanes2);
      return workInProgress2.child;
    }
    function updateClassComponent(current, workInProgress2, Component, nextProps, renderLanes2) {
      prepareToReadContext(workInProgress2);
      if (null === workInProgress2.stateNode) {
        var context = emptyContextObject, contextType = Component.contextType;
        "object" === typeof contextType && null !== contextType && (context = readContext(contextType));
        context = new Component(nextProps, context);
        workInProgress2.memoizedState = null !== context.state && void 0 !== context.state ? context.state : null;
        context.updater = classComponentUpdater;
        workInProgress2.stateNode = context;
        context._reactInternals = workInProgress2;
        context = workInProgress2.stateNode;
        context.props = nextProps;
        context.state = workInProgress2.memoizedState;
        context.refs = {};
        initializeUpdateQueue(workInProgress2);
        contextType = Component.contextType;
        context.context = "object" === typeof contextType && null !== contextType ? readContext(contextType) : emptyContextObject;
        context.state = workInProgress2.memoizedState;
        contextType = Component.getDerivedStateFromProps;
        "function" === typeof contextType && (applyDerivedStateFromProps(
          workInProgress2,
          Component,
          contextType,
          nextProps
        ), context.state = workInProgress2.memoizedState);
        "function" === typeof Component.getDerivedStateFromProps || "function" === typeof context.getSnapshotBeforeUpdate || "function" !== typeof context.UNSAFE_componentWillMount && "function" !== typeof context.componentWillMount || (contextType = context.state, "function" === typeof context.componentWillMount && context.componentWillMount(), "function" === typeof context.UNSAFE_componentWillMount && context.UNSAFE_componentWillMount(), contextType !== context.state && classComponentUpdater.enqueueReplaceState(context, context.state, null), processUpdateQueue(workInProgress2, nextProps, context, renderLanes2), suspendIfUpdateReadFromEntangledAsyncAction(), context.state = workInProgress2.memoizedState);
        "function" === typeof context.componentDidMount && (workInProgress2.flags |= 4194308);
        nextProps = true;
      } else if (null === current) {
        context = workInProgress2.stateNode;
        var unresolvedOldProps = workInProgress2.memoizedProps, oldProps = resolveClassComponentProps(Component, unresolvedOldProps);
        context.props = oldProps;
        var oldContext = context.context, contextType$jscomp$0 = Component.contextType;
        contextType = emptyContextObject;
        "object" === typeof contextType$jscomp$0 && null !== contextType$jscomp$0 && (contextType = readContext(contextType$jscomp$0));
        var getDerivedStateFromProps = Component.getDerivedStateFromProps;
        contextType$jscomp$0 = "function" === typeof getDerivedStateFromProps || "function" === typeof context.getSnapshotBeforeUpdate;
        unresolvedOldProps = workInProgress2.pendingProps !== unresolvedOldProps;
        contextType$jscomp$0 || "function" !== typeof context.UNSAFE_componentWillReceiveProps && "function" !== typeof context.componentWillReceiveProps || (unresolvedOldProps || oldContext !== contextType) && callComponentWillReceiveProps(
          workInProgress2,
          context,
          nextProps,
          contextType
        );
        hasForceUpdate = false;
        var oldState = workInProgress2.memoizedState;
        context.state = oldState;
        processUpdateQueue(workInProgress2, nextProps, context, renderLanes2);
        suspendIfUpdateReadFromEntangledAsyncAction();
        oldContext = workInProgress2.memoizedState;
        unresolvedOldProps || oldState !== oldContext || hasForceUpdate ? ("function" === typeof getDerivedStateFromProps && (applyDerivedStateFromProps(
          workInProgress2,
          Component,
          getDerivedStateFromProps,
          nextProps
        ), oldContext = workInProgress2.memoizedState), (oldProps = hasForceUpdate || checkShouldComponentUpdate(
          workInProgress2,
          Component,
          oldProps,
          nextProps,
          oldState,
          oldContext,
          contextType
        )) ? (contextType$jscomp$0 || "function" !== typeof context.UNSAFE_componentWillMount && "function" !== typeof context.componentWillMount || ("function" === typeof context.componentWillMount && context.componentWillMount(), "function" === typeof context.UNSAFE_componentWillMount && context.UNSAFE_componentWillMount()), "function" === typeof context.componentDidMount && (workInProgress2.flags |= 4194308)) : ("function" === typeof context.componentDidMount && (workInProgress2.flags |= 4194308), workInProgress2.memoizedProps = nextProps, workInProgress2.memoizedState = oldContext), context.props = nextProps, context.state = oldContext, context.context = contextType, nextProps = oldProps) : ("function" === typeof context.componentDidMount && (workInProgress2.flags |= 4194308), nextProps = false);
      } else {
        context = workInProgress2.stateNode;
        cloneUpdateQueue(current, workInProgress2);
        contextType = workInProgress2.memoizedProps;
        contextType$jscomp$0 = resolveClassComponentProps(Component, contextType);
        context.props = contextType$jscomp$0;
        getDerivedStateFromProps = workInProgress2.pendingProps;
        oldState = context.context;
        oldContext = Component.contextType;
        oldProps = emptyContextObject;
        "object" === typeof oldContext && null !== oldContext && (oldProps = readContext(oldContext));
        unresolvedOldProps = Component.getDerivedStateFromProps;
        (oldContext = "function" === typeof unresolvedOldProps || "function" === typeof context.getSnapshotBeforeUpdate) || "function" !== typeof context.UNSAFE_componentWillReceiveProps && "function" !== typeof context.componentWillReceiveProps || (contextType !== getDerivedStateFromProps || oldState !== oldProps) && callComponentWillReceiveProps(
          workInProgress2,
          context,
          nextProps,
          oldProps
        );
        hasForceUpdate = false;
        oldState = workInProgress2.memoizedState;
        context.state = oldState;
        processUpdateQueue(workInProgress2, nextProps, context, renderLanes2);
        suspendIfUpdateReadFromEntangledAsyncAction();
        var newState = workInProgress2.memoizedState;
        contextType !== getDerivedStateFromProps || oldState !== newState || hasForceUpdate || null !== current && null !== current.dependencies && checkIfContextChanged(current.dependencies) ? ("function" === typeof unresolvedOldProps && (applyDerivedStateFromProps(
          workInProgress2,
          Component,
          unresolvedOldProps,
          nextProps
        ), newState = workInProgress2.memoizedState), (contextType$jscomp$0 = hasForceUpdate || checkShouldComponentUpdate(
          workInProgress2,
          Component,
          contextType$jscomp$0,
          nextProps,
          oldState,
          newState,
          oldProps
        ) || null !== current && null !== current.dependencies && checkIfContextChanged(current.dependencies)) ? (oldContext || "function" !== typeof context.UNSAFE_componentWillUpdate && "function" !== typeof context.componentWillUpdate || ("function" === typeof context.componentWillUpdate && context.componentWillUpdate(nextProps, newState, oldProps), "function" === typeof context.UNSAFE_componentWillUpdate && context.UNSAFE_componentWillUpdate(
          nextProps,
          newState,
          oldProps
        )), "function" === typeof context.componentDidUpdate && (workInProgress2.flags |= 4), "function" === typeof context.getSnapshotBeforeUpdate && (workInProgress2.flags |= 1024)) : ("function" !== typeof context.componentDidUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 4), "function" !== typeof context.getSnapshotBeforeUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 1024), workInProgress2.memoizedProps = nextProps, workInProgress2.memoizedState = newState), context.props = nextProps, context.state = newState, context.context = oldProps, nextProps = contextType$jscomp$0) : ("function" !== typeof context.componentDidUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 4), "function" !== typeof context.getSnapshotBeforeUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 1024), nextProps = false);
      }
      context = nextProps;
      markRef(current, workInProgress2);
      nextProps = 0 !== (workInProgress2.flags & 128);
      context || nextProps ? (context = workInProgress2.stateNode, Component = nextProps && "function" !== typeof Component.getDerivedStateFromError ? null : context.render(), workInProgress2.flags |= 1, null !== current && nextProps ? (workInProgress2.child = reconcileChildFibers(
        workInProgress2,
        current.child,
        null,
        renderLanes2
      ), workInProgress2.child = reconcileChildFibers(
        workInProgress2,
        null,
        Component,
        renderLanes2
      )) : reconcileChildren(current, workInProgress2, Component, renderLanes2), workInProgress2.memoizedState = context.state, current = workInProgress2.child) : current = bailoutOnAlreadyFinishedWork(
        current,
        workInProgress2,
        renderLanes2
      );
      return current;
    }
    function mountHostRootWithoutHydrating(current, workInProgress2, nextChildren, renderLanes2) {
      resetHydrationState();
      workInProgress2.flags |= 256;
      reconcileChildren(current, workInProgress2, nextChildren, renderLanes2);
      return workInProgress2.child;
    }
    var SUSPENDED_MARKER = {
      dehydrated: null,
      treeContext: null,
      retryLane: 0,
      hydrationErrors: null
    };
    function mountSuspenseOffscreenState(renderLanes2) {
      return { baseLanes: renderLanes2, cachePool: getSuspendedCache() };
    }
    function getRemainingWorkInPrimaryTree(current, primaryTreeDidDefer, renderLanes2) {
      current = null !== current ? current.childLanes & ~renderLanes2 : 0;
      primaryTreeDidDefer && (current |= workInProgressDeferredLane);
      return current;
    }
    function updateSuspenseComponent(current, workInProgress2, renderLanes2) {
      var nextProps = workInProgress2.pendingProps, showFallback = false, didSuspend = 0 !== (workInProgress2.flags & 128), JSCompiler_temp;
      (JSCompiler_temp = didSuspend) || (JSCompiler_temp = null !== current && null === current.memoizedState ? false : 0 !== (suspenseStackCursor.current & 2));
      JSCompiler_temp && (showFallback = true, workInProgress2.flags &= -129);
      JSCompiler_temp = 0 !== (workInProgress2.flags & 32);
      workInProgress2.flags &= -33;
      if (null === current) {
        if (isHydrating) {
          showFallback ? pushPrimaryTreeSuspenseHandler(workInProgress2) : reuseSuspenseHandlerOnStack();
          (current = nextHydratableInstance) ? (current = canHydrateHydrationBoundary(
            current,
            rootOrSingletonContext
          ), current = null !== current && "&" !== current.data ? current : null, null !== current && (workInProgress2.memoizedState = {
            dehydrated: current,
            treeContext: null !== treeContextProvider ? { id: treeContextId, overflow: treeContextOverflow } : null,
            retryLane: 536870912,
            hydrationErrors: null
          }, renderLanes2 = createFiberFromDehydratedFragment(current), renderLanes2.return = workInProgress2, workInProgress2.child = renderLanes2, hydrationParentFiber = workInProgress2, nextHydratableInstance = null)) : current = null;
          if (null === current) throw throwOnHydrationMismatch(workInProgress2);
          isSuspenseInstanceFallback(current) ? workInProgress2.lanes = 32 : workInProgress2.lanes = 536870912;
          return null;
        }
        var nextPrimaryChildren = nextProps.children;
        nextProps = nextProps.fallback;
        if (showFallback)
          return reuseSuspenseHandlerOnStack(), showFallback = workInProgress2.mode, nextPrimaryChildren = mountWorkInProgressOffscreenFiber(
            { mode: "hidden", children: nextPrimaryChildren },
            showFallback
          ), nextProps = createFiberFromFragment(
            nextProps,
            showFallback,
            renderLanes2,
            null
          ), nextPrimaryChildren.return = workInProgress2, nextProps.return = workInProgress2, nextPrimaryChildren.sibling = nextProps, workInProgress2.child = nextPrimaryChildren, nextProps = workInProgress2.child, nextProps.memoizedState = mountSuspenseOffscreenState(renderLanes2), nextProps.childLanes = getRemainingWorkInPrimaryTree(
            current,
            JSCompiler_temp,
            renderLanes2
          ), workInProgress2.memoizedState = SUSPENDED_MARKER, bailoutOffscreenComponent(null, nextProps);
        pushPrimaryTreeSuspenseHandler(workInProgress2);
        return mountSuspensePrimaryChildren(workInProgress2, nextPrimaryChildren);
      }
      var prevState = current.memoizedState;
      if (null !== prevState && (nextPrimaryChildren = prevState.dehydrated, null !== nextPrimaryChildren)) {
        if (didSuspend)
          workInProgress2.flags & 256 ? (pushPrimaryTreeSuspenseHandler(workInProgress2), workInProgress2.flags &= -257, workInProgress2 = retrySuspenseComponentWithoutHydrating(
            current,
            workInProgress2,
            renderLanes2
          )) : null !== workInProgress2.memoizedState ? (reuseSuspenseHandlerOnStack(), workInProgress2.child = current.child, workInProgress2.flags |= 128, workInProgress2 = null) : (reuseSuspenseHandlerOnStack(), nextPrimaryChildren = nextProps.fallback, showFallback = workInProgress2.mode, nextProps = mountWorkInProgressOffscreenFiber(
            { mode: "visible", children: nextProps.children },
            showFallback
          ), nextPrimaryChildren = createFiberFromFragment(
            nextPrimaryChildren,
            showFallback,
            renderLanes2,
            null
          ), nextPrimaryChildren.flags |= 2, nextProps.return = workInProgress2, nextPrimaryChildren.return = workInProgress2, nextProps.sibling = nextPrimaryChildren, workInProgress2.child = nextProps, reconcileChildFibers(
            workInProgress2,
            current.child,
            null,
            renderLanes2
          ), nextProps = workInProgress2.child, nextProps.memoizedState = mountSuspenseOffscreenState(renderLanes2), nextProps.childLanes = getRemainingWorkInPrimaryTree(
            current,
            JSCompiler_temp,
            renderLanes2
          ), workInProgress2.memoizedState = SUSPENDED_MARKER, workInProgress2 = bailoutOffscreenComponent(null, nextProps));
        else if (pushPrimaryTreeSuspenseHandler(workInProgress2), isSuspenseInstanceFallback(nextPrimaryChildren)) {
          JSCompiler_temp = nextPrimaryChildren.nextSibling && nextPrimaryChildren.nextSibling.dataset;
          if (JSCompiler_temp) var digest = JSCompiler_temp.dgst;
          JSCompiler_temp = digest;
          nextProps = Error(formatProdErrorMessage(419));
          nextProps.stack = "";
          nextProps.digest = JSCompiler_temp;
          queueHydrationError({ value: nextProps, source: null, stack: null });
          workInProgress2 = retrySuspenseComponentWithoutHydrating(
            current,
            workInProgress2,
            renderLanes2
          );
        } else if (didReceiveUpdate || propagateParentContextChanges(current, workInProgress2, renderLanes2, false), JSCompiler_temp = 0 !== (renderLanes2 & current.childLanes), didReceiveUpdate || JSCompiler_temp) {
          JSCompiler_temp = workInProgressRoot;
          if (null !== JSCompiler_temp && (nextProps = getBumpedLaneForHydration(JSCompiler_temp, renderLanes2), 0 !== nextProps && nextProps !== prevState.retryLane))
            throw prevState.retryLane = nextProps, enqueueConcurrentRenderForLane(current, nextProps), scheduleUpdateOnFiber(JSCompiler_temp, current, nextProps), SelectiveHydrationException;
          isSuspenseInstancePending(nextPrimaryChildren) || renderDidSuspendDelayIfPossible();
          workInProgress2 = retrySuspenseComponentWithoutHydrating(
            current,
            workInProgress2,
            renderLanes2
          );
        } else
          isSuspenseInstancePending(nextPrimaryChildren) ? (workInProgress2.flags |= 192, workInProgress2.child = current.child, workInProgress2 = null) : (current = prevState.treeContext, nextHydratableInstance = getNextHydratable(
            nextPrimaryChildren.nextSibling
          ), hydrationParentFiber = workInProgress2, isHydrating = true, hydrationErrors = null, rootOrSingletonContext = false, null !== current && restoreSuspendedTreeContext(workInProgress2, current), workInProgress2 = mountSuspensePrimaryChildren(
            workInProgress2,
            nextProps.children
          ), workInProgress2.flags |= 4096);
        return workInProgress2;
      }
      if (showFallback)
        return reuseSuspenseHandlerOnStack(), nextPrimaryChildren = nextProps.fallback, showFallback = workInProgress2.mode, prevState = current.child, digest = prevState.sibling, nextProps = createWorkInProgress(prevState, {
          mode: "hidden",
          children: nextProps.children
        }), nextProps.subtreeFlags = prevState.subtreeFlags & 65011712, null !== digest ? nextPrimaryChildren = createWorkInProgress(
          digest,
          nextPrimaryChildren
        ) : (nextPrimaryChildren = createFiberFromFragment(
          nextPrimaryChildren,
          showFallback,
          renderLanes2,
          null
        ), nextPrimaryChildren.flags |= 2), nextPrimaryChildren.return = workInProgress2, nextProps.return = workInProgress2, nextProps.sibling = nextPrimaryChildren, workInProgress2.child = nextProps, bailoutOffscreenComponent(null, nextProps), nextProps = workInProgress2.child, nextPrimaryChildren = current.child.memoizedState, null === nextPrimaryChildren ? nextPrimaryChildren = mountSuspenseOffscreenState(renderLanes2) : (showFallback = nextPrimaryChildren.cachePool, null !== showFallback ? (prevState = CacheContext._currentValue, showFallback = showFallback.parent !== prevState ? { parent: prevState, pool: prevState } : showFallback) : showFallback = getSuspendedCache(), nextPrimaryChildren = {
          baseLanes: nextPrimaryChildren.baseLanes | renderLanes2,
          cachePool: showFallback
        }), nextProps.memoizedState = nextPrimaryChildren, nextProps.childLanes = getRemainingWorkInPrimaryTree(
          current,
          JSCompiler_temp,
          renderLanes2
        ), workInProgress2.memoizedState = SUSPENDED_MARKER, bailoutOffscreenComponent(current.child, nextProps);
      pushPrimaryTreeSuspenseHandler(workInProgress2);
      renderLanes2 = current.child;
      current = renderLanes2.sibling;
      renderLanes2 = createWorkInProgress(renderLanes2, {
        mode: "visible",
        children: nextProps.children
      });
      renderLanes2.return = workInProgress2;
      renderLanes2.sibling = null;
      null !== current && (JSCompiler_temp = workInProgress2.deletions, null === JSCompiler_temp ? (workInProgress2.deletions = [current], workInProgress2.flags |= 16) : JSCompiler_temp.push(current));
      workInProgress2.child = renderLanes2;
      workInProgress2.memoizedState = null;
      return renderLanes2;
    }
    function mountSuspensePrimaryChildren(workInProgress2, primaryChildren) {
      primaryChildren = mountWorkInProgressOffscreenFiber(
        { mode: "visible", children: primaryChildren },
        workInProgress2.mode
      );
      primaryChildren.return = workInProgress2;
      return workInProgress2.child = primaryChildren;
    }
    function mountWorkInProgressOffscreenFiber(offscreenProps, mode) {
      offscreenProps = createFiberImplClass(22, offscreenProps, null, mode);
      offscreenProps.lanes = 0;
      return offscreenProps;
    }
    function retrySuspenseComponentWithoutHydrating(current, workInProgress2, renderLanes2) {
      reconcileChildFibers(workInProgress2, current.child, null, renderLanes2);
      current = mountSuspensePrimaryChildren(
        workInProgress2,
        workInProgress2.pendingProps.children
      );
      current.flags |= 2;
      workInProgress2.memoizedState = null;
      return current;
    }
    function scheduleSuspenseWorkOnFiber(fiber, renderLanes2, propagationRoot) {
      fiber.lanes |= renderLanes2;
      var alternate = fiber.alternate;
      null !== alternate && (alternate.lanes |= renderLanes2);
      scheduleContextWorkOnParentPath(fiber.return, renderLanes2, propagationRoot);
    }
    function initSuspenseListRenderState(workInProgress2, isBackwards, tail, lastContentRow, tailMode, treeForkCount2) {
      var renderState = workInProgress2.memoizedState;
      null === renderState ? workInProgress2.memoizedState = {
        isBackwards,
        rendering: null,
        renderingStartTime: 0,
        last: lastContentRow,
        tail,
        tailMode,
        treeForkCount: treeForkCount2
      } : (renderState.isBackwards = isBackwards, renderState.rendering = null, renderState.renderingStartTime = 0, renderState.last = lastContentRow, renderState.tail = tail, renderState.tailMode = tailMode, renderState.treeForkCount = treeForkCount2);
    }
    function updateSuspenseListComponent(current, workInProgress2, renderLanes2) {
      var nextProps = workInProgress2.pendingProps, revealOrder = nextProps.revealOrder, tailMode = nextProps.tail;
      nextProps = nextProps.children;
      var suspenseContext = suspenseStackCursor.current, shouldForceFallback = 0 !== (suspenseContext & 2);
      shouldForceFallback ? (suspenseContext = suspenseContext & 1 | 2, workInProgress2.flags |= 128) : suspenseContext &= 1;
      push(suspenseStackCursor, suspenseContext);
      reconcileChildren(current, workInProgress2, nextProps, renderLanes2);
      nextProps = isHydrating ? treeForkCount : 0;
      if (!shouldForceFallback && null !== current && 0 !== (current.flags & 128))
        a: for (current = workInProgress2.child; null !== current; ) {
          if (13 === current.tag)
            null !== current.memoizedState && scheduleSuspenseWorkOnFiber(current, renderLanes2, workInProgress2);
          else if (19 === current.tag)
            scheduleSuspenseWorkOnFiber(current, renderLanes2, workInProgress2);
          else if (null !== current.child) {
            current.child.return = current;
            current = current.child;
            continue;
          }
          if (current === workInProgress2) break a;
          for (; null === current.sibling; ) {
            if (null === current.return || current.return === workInProgress2)
              break a;
            current = current.return;
          }
          current.sibling.return = current.return;
          current = current.sibling;
        }
      switch (revealOrder) {
        case "forwards":
          renderLanes2 = workInProgress2.child;
          for (revealOrder = null; null !== renderLanes2; )
            current = renderLanes2.alternate, null !== current && null === findFirstSuspended(current) && (revealOrder = renderLanes2), renderLanes2 = renderLanes2.sibling;
          renderLanes2 = revealOrder;
          null === renderLanes2 ? (revealOrder = workInProgress2.child, workInProgress2.child = null) : (revealOrder = renderLanes2.sibling, renderLanes2.sibling = null);
          initSuspenseListRenderState(
            workInProgress2,
            false,
            revealOrder,
            renderLanes2,
            tailMode,
            nextProps
          );
          break;
        case "backwards":
        case "unstable_legacy-backwards":
          renderLanes2 = null;
          revealOrder = workInProgress2.child;
          for (workInProgress2.child = null; null !== revealOrder; ) {
            current = revealOrder.alternate;
            if (null !== current && null === findFirstSuspended(current)) {
              workInProgress2.child = revealOrder;
              break;
            }
            current = revealOrder.sibling;
            revealOrder.sibling = renderLanes2;
            renderLanes2 = revealOrder;
            revealOrder = current;
          }
          initSuspenseListRenderState(
            workInProgress2,
            true,
            renderLanes2,
            null,
            tailMode,
            nextProps
          );
          break;
        case "together":
          initSuspenseListRenderState(
            workInProgress2,
            false,
            null,
            null,
            void 0,
            nextProps
          );
          break;
        default:
          workInProgress2.memoizedState = null;
      }
      return workInProgress2.child;
    }
    function bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2) {
      null !== current && (workInProgress2.dependencies = current.dependencies);
      workInProgressRootSkippedLanes |= workInProgress2.lanes;
      if (0 === (renderLanes2 & workInProgress2.childLanes))
        if (null !== current) {
          if (propagateParentContextChanges(
            current,
            workInProgress2,
            renderLanes2,
            false
          ), 0 === (renderLanes2 & workInProgress2.childLanes))
            return null;
        } else return null;
      if (null !== current && workInProgress2.child !== current.child)
        throw Error(formatProdErrorMessage(153));
      if (null !== workInProgress2.child) {
        current = workInProgress2.child;
        renderLanes2 = createWorkInProgress(current, current.pendingProps);
        workInProgress2.child = renderLanes2;
        for (renderLanes2.return = workInProgress2; null !== current.sibling; )
          current = current.sibling, renderLanes2 = renderLanes2.sibling = createWorkInProgress(current, current.pendingProps), renderLanes2.return = workInProgress2;
        renderLanes2.sibling = null;
      }
      return workInProgress2.child;
    }
    function checkScheduledUpdateOrContext(current, renderLanes2) {
      if (0 !== (current.lanes & renderLanes2)) return true;
      current = current.dependencies;
      return null !== current && checkIfContextChanged(current) ? true : false;
    }
    function attemptEarlyBailoutIfNoScheduledUpdate(current, workInProgress2, renderLanes2) {
      switch (workInProgress2.tag) {
        case 3:
          pushHostContainer(workInProgress2, workInProgress2.stateNode.containerInfo);
          pushProvider(workInProgress2, CacheContext, current.memoizedState.cache);
          resetHydrationState();
          break;
        case 27:
        case 5:
          pushHostContext(workInProgress2);
          break;
        case 4:
          pushHostContainer(workInProgress2, workInProgress2.stateNode.containerInfo);
          break;
        case 10:
          pushProvider(
            workInProgress2,
            workInProgress2.type,
            workInProgress2.memoizedProps.value
          );
          break;
        case 31:
          if (null !== workInProgress2.memoizedState)
            return workInProgress2.flags |= 128, pushDehydratedActivitySuspenseHandler(workInProgress2), null;
          break;
        case 13:
          var state$102 = workInProgress2.memoizedState;
          if (null !== state$102) {
            if (null !== state$102.dehydrated)
              return pushPrimaryTreeSuspenseHandler(workInProgress2), workInProgress2.flags |= 128, null;
            if (0 !== (renderLanes2 & workInProgress2.child.childLanes))
              return updateSuspenseComponent(current, workInProgress2, renderLanes2);
            pushPrimaryTreeSuspenseHandler(workInProgress2);
            current = bailoutOnAlreadyFinishedWork(
              current,
              workInProgress2,
              renderLanes2
            );
            return null !== current ? current.sibling : null;
          }
          pushPrimaryTreeSuspenseHandler(workInProgress2);
          break;
        case 19:
          var didSuspendBefore = 0 !== (current.flags & 128);
          state$102 = 0 !== (renderLanes2 & workInProgress2.childLanes);
          state$102 || (propagateParentContextChanges(
            current,
            workInProgress2,
            renderLanes2,
            false
          ), state$102 = 0 !== (renderLanes2 & workInProgress2.childLanes));
          if (didSuspendBefore) {
            if (state$102)
              return updateSuspenseListComponent(
                current,
                workInProgress2,
                renderLanes2
              );
            workInProgress2.flags |= 128;
          }
          didSuspendBefore = workInProgress2.memoizedState;
          null !== didSuspendBefore && (didSuspendBefore.rendering = null, didSuspendBefore.tail = null, didSuspendBefore.lastEffect = null);
          push(suspenseStackCursor, suspenseStackCursor.current);
          if (state$102) break;
          else return null;
        case 22:
          return workInProgress2.lanes = 0, updateOffscreenComponent(
            current,
            workInProgress2,
            renderLanes2,
            workInProgress2.pendingProps
          );
        case 24:
          pushProvider(workInProgress2, CacheContext, current.memoizedState.cache);
      }
      return bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
    }
    function beginWork(current, workInProgress2, renderLanes2) {
      if (null !== current)
        if (current.memoizedProps !== workInProgress2.pendingProps)
          didReceiveUpdate = true;
        else {
          if (!checkScheduledUpdateOrContext(current, renderLanes2) && 0 === (workInProgress2.flags & 128))
            return didReceiveUpdate = false, attemptEarlyBailoutIfNoScheduledUpdate(
              current,
              workInProgress2,
              renderLanes2
            );
          didReceiveUpdate = 0 !== (current.flags & 131072) ? true : false;
        }
      else
        didReceiveUpdate = false, isHydrating && 0 !== (workInProgress2.flags & 1048576) && pushTreeId(workInProgress2, treeForkCount, workInProgress2.index);
      workInProgress2.lanes = 0;
      switch (workInProgress2.tag) {
        case 16:
          a: {
            var props = workInProgress2.pendingProps;
            current = resolveLazy(workInProgress2.elementType);
            workInProgress2.type = current;
            if ("function" === typeof current)
              shouldConstruct(current) ? (props = resolveClassComponentProps(current, props), workInProgress2.tag = 1, workInProgress2 = updateClassComponent(
                null,
                workInProgress2,
                current,
                props,
                renderLanes2
              )) : (workInProgress2.tag = 0, workInProgress2 = updateFunctionComponent(
                null,
                workInProgress2,
                current,
                props,
                renderLanes2
              ));
            else {
              if (void 0 !== current && null !== current) {
                var $$typeof = current.$$typeof;
                if ($$typeof === REACT_FORWARD_REF_TYPE) {
                  workInProgress2.tag = 11;
                  workInProgress2 = updateForwardRef(
                    null,
                    workInProgress2,
                    current,
                    props,
                    renderLanes2
                  );
                  break a;
                } else if ($$typeof === REACT_MEMO_TYPE) {
                  workInProgress2.tag = 14;
                  workInProgress2 = updateMemoComponent(
                    null,
                    workInProgress2,
                    current,
                    props,
                    renderLanes2
                  );
                  break a;
                }
              }
              workInProgress2 = getComponentNameFromType(current) || current;
              throw Error(formatProdErrorMessage(306, workInProgress2, ""));
            }
          }
          return workInProgress2;
        case 0:
          return updateFunctionComponent(
            current,
            workInProgress2,
            workInProgress2.type,
            workInProgress2.pendingProps,
            renderLanes2
          );
        case 1:
          return props = workInProgress2.type, $$typeof = resolveClassComponentProps(
            props,
            workInProgress2.pendingProps
          ), updateClassComponent(
            current,
            workInProgress2,
            props,
            $$typeof,
            renderLanes2
          );
        case 3:
          a: {
            pushHostContainer(
              workInProgress2,
              workInProgress2.stateNode.containerInfo
            );
            if (null === current) throw Error(formatProdErrorMessage(387));
            props = workInProgress2.pendingProps;
            var prevState = workInProgress2.memoizedState;
            $$typeof = prevState.element;
            cloneUpdateQueue(current, workInProgress2);
            processUpdateQueue(workInProgress2, props, null, renderLanes2);
            var nextState = workInProgress2.memoizedState;
            props = nextState.cache;
            pushProvider(workInProgress2, CacheContext, props);
            props !== prevState.cache && propagateContextChanges(
              workInProgress2,
              [CacheContext],
              renderLanes2,
              true
            );
            suspendIfUpdateReadFromEntangledAsyncAction();
            props = nextState.element;
            if (prevState.isDehydrated)
              if (prevState = {
                element: props,
                isDehydrated: false,
                cache: nextState.cache
              }, workInProgress2.updateQueue.baseState = prevState, workInProgress2.memoizedState = prevState, workInProgress2.flags & 256) {
                workInProgress2 = mountHostRootWithoutHydrating(
                  current,
                  workInProgress2,
                  props,
                  renderLanes2
                );
                break a;
              } else if (props !== $$typeof) {
                $$typeof = createCapturedValueAtFiber(
                  Error(formatProdErrorMessage(424)),
                  workInProgress2
                );
                queueHydrationError($$typeof);
                workInProgress2 = mountHostRootWithoutHydrating(
                  current,
                  workInProgress2,
                  props,
                  renderLanes2
                );
                break a;
              } else {
                current = workInProgress2.stateNode.containerInfo;
                switch (current.nodeType) {
                  case 9:
                    current = current.body;
                    break;
                  default:
                    current = "HTML" === current.nodeName ? current.ownerDocument.body : current;
                }
                nextHydratableInstance = getNextHydratable(current.firstChild);
                hydrationParentFiber = workInProgress2;
                isHydrating = true;
                hydrationErrors = null;
                rootOrSingletonContext = true;
                renderLanes2 = mountChildFibers(
                  workInProgress2,
                  null,
                  props,
                  renderLanes2
                );
                for (workInProgress2.child = renderLanes2; renderLanes2; )
                  renderLanes2.flags = renderLanes2.flags & -3 | 4096, renderLanes2 = renderLanes2.sibling;
              }
            else {
              resetHydrationState();
              if (props === $$typeof) {
                workInProgress2 = bailoutOnAlreadyFinishedWork(
                  current,
                  workInProgress2,
                  renderLanes2
                );
                break a;
              }
              reconcileChildren(current, workInProgress2, props, renderLanes2);
            }
            workInProgress2 = workInProgress2.child;
          }
          return workInProgress2;
        case 26:
          return markRef(current, workInProgress2), null === current ? (renderLanes2 = getResource(
            workInProgress2.type,
            null,
            workInProgress2.pendingProps,
            null
          )) ? workInProgress2.memoizedState = renderLanes2 : isHydrating || (renderLanes2 = workInProgress2.type, current = workInProgress2.pendingProps, props = getOwnerDocumentFromRootContainer(
            rootInstanceStackCursor.current
          ).createElement(renderLanes2), props[internalInstanceKey] = workInProgress2, props[internalPropsKey] = current, setInitialProperties(props, renderLanes2, current), markNodeAsHoistable(props), workInProgress2.stateNode = props) : workInProgress2.memoizedState = getResource(
            workInProgress2.type,
            current.memoizedProps,
            workInProgress2.pendingProps,
            current.memoizedState
          ), null;
        case 27:
          return pushHostContext(workInProgress2), null === current && isHydrating && (props = workInProgress2.stateNode = resolveSingletonInstance(
            workInProgress2.type,
            workInProgress2.pendingProps,
            rootInstanceStackCursor.current
          ), hydrationParentFiber = workInProgress2, rootOrSingletonContext = true, $$typeof = nextHydratableInstance, isSingletonScope(workInProgress2.type) ? (previousHydratableOnEnteringScopedSingleton = $$typeof, nextHydratableInstance = getNextHydratable(props.firstChild)) : nextHydratableInstance = $$typeof), reconcileChildren(
            current,
            workInProgress2,
            workInProgress2.pendingProps.children,
            renderLanes2
          ), markRef(current, workInProgress2), null === current && (workInProgress2.flags |= 4194304), workInProgress2.child;
        case 5:
          if (null === current && isHydrating) {
            if ($$typeof = props = nextHydratableInstance)
              props = canHydrateInstance(
                props,
                workInProgress2.type,
                workInProgress2.pendingProps,
                rootOrSingletonContext
              ), null !== props ? (workInProgress2.stateNode = props, hydrationParentFiber = workInProgress2, nextHydratableInstance = getNextHydratable(props.firstChild), rootOrSingletonContext = false, $$typeof = true) : $$typeof = false;
            $$typeof || throwOnHydrationMismatch(workInProgress2);
          }
          pushHostContext(workInProgress2);
          $$typeof = workInProgress2.type;
          prevState = workInProgress2.pendingProps;
          nextState = null !== current ? current.memoizedProps : null;
          props = prevState.children;
          shouldSetTextContent($$typeof, prevState) ? props = null : null !== nextState && shouldSetTextContent($$typeof, nextState) && (workInProgress2.flags |= 32);
          null !== workInProgress2.memoizedState && ($$typeof = renderWithHooks(
            current,
            workInProgress2,
            TransitionAwareHostComponent,
            null,
            null,
            renderLanes2
          ), HostTransitionContext._currentValue = $$typeof);
          markRef(current, workInProgress2);
          reconcileChildren(current, workInProgress2, props, renderLanes2);
          return workInProgress2.child;
        case 6:
          if (null === current && isHydrating) {
            if (current = renderLanes2 = nextHydratableInstance)
              renderLanes2 = canHydrateTextInstance(
                renderLanes2,
                workInProgress2.pendingProps,
                rootOrSingletonContext
              ), null !== renderLanes2 ? (workInProgress2.stateNode = renderLanes2, hydrationParentFiber = workInProgress2, nextHydratableInstance = null, current = true) : current = false;
            current || throwOnHydrationMismatch(workInProgress2);
          }
          return null;
        case 13:
          return updateSuspenseComponent(current, workInProgress2, renderLanes2);
        case 4:
          return pushHostContainer(
            workInProgress2,
            workInProgress2.stateNode.containerInfo
          ), props = workInProgress2.pendingProps, null === current ? workInProgress2.child = reconcileChildFibers(
            workInProgress2,
            null,
            props,
            renderLanes2
          ) : reconcileChildren(current, workInProgress2, props, renderLanes2), workInProgress2.child;
        case 11:
          return updateForwardRef(
            current,
            workInProgress2,
            workInProgress2.type,
            workInProgress2.pendingProps,
            renderLanes2
          );
        case 7:
          return reconcileChildren(
            current,
            workInProgress2,
            workInProgress2.pendingProps,
            renderLanes2
          ), workInProgress2.child;
        case 8:
          return reconcileChildren(
            current,
            workInProgress2,
            workInProgress2.pendingProps.children,
            renderLanes2
          ), workInProgress2.child;
        case 12:
          return reconcileChildren(
            current,
            workInProgress2,
            workInProgress2.pendingProps.children,
            renderLanes2
          ), workInProgress2.child;
        case 10:
          return props = workInProgress2.pendingProps, pushProvider(workInProgress2, workInProgress2.type, props.value), reconcileChildren(current, workInProgress2, props.children, renderLanes2), workInProgress2.child;
        case 9:
          return $$typeof = workInProgress2.type._context, props = workInProgress2.pendingProps.children, prepareToReadContext(workInProgress2), $$typeof = readContext($$typeof), props = props($$typeof), workInProgress2.flags |= 1, reconcileChildren(current, workInProgress2, props, renderLanes2), workInProgress2.child;
        case 14:
          return updateMemoComponent(
            current,
            workInProgress2,
            workInProgress2.type,
            workInProgress2.pendingProps,
            renderLanes2
          );
        case 15:
          return updateSimpleMemoComponent(
            current,
            workInProgress2,
            workInProgress2.type,
            workInProgress2.pendingProps,
            renderLanes2
          );
        case 19:
          return updateSuspenseListComponent(current, workInProgress2, renderLanes2);
        case 31:
          return updateActivityComponent(current, workInProgress2, renderLanes2);
        case 22:
          return updateOffscreenComponent(
            current,
            workInProgress2,
            renderLanes2,
            workInProgress2.pendingProps
          );
        case 24:
          return prepareToReadContext(workInProgress2), props = readContext(CacheContext), null === current ? ($$typeof = peekCacheFromPool(), null === $$typeof && ($$typeof = workInProgressRoot, prevState = createCache(), $$typeof.pooledCache = prevState, prevState.refCount++, null !== prevState && ($$typeof.pooledCacheLanes |= renderLanes2), $$typeof = prevState), workInProgress2.memoizedState = { parent: props, cache: $$typeof }, initializeUpdateQueue(workInProgress2), pushProvider(workInProgress2, CacheContext, $$typeof)) : (0 !== (current.lanes & renderLanes2) && (cloneUpdateQueue(current, workInProgress2), processUpdateQueue(workInProgress2, null, null, renderLanes2), suspendIfUpdateReadFromEntangledAsyncAction()), $$typeof = current.memoizedState, prevState = workInProgress2.memoizedState, $$typeof.parent !== props ? ($$typeof = { parent: props, cache: props }, workInProgress2.memoizedState = $$typeof, 0 === workInProgress2.lanes && (workInProgress2.memoizedState = workInProgress2.updateQueue.baseState = $$typeof), pushProvider(workInProgress2, CacheContext, props)) : (props = prevState.cache, pushProvider(workInProgress2, CacheContext, props), props !== $$typeof.cache && propagateContextChanges(
            workInProgress2,
            [CacheContext],
            renderLanes2,
            true
          ))), reconcileChildren(
            current,
            workInProgress2,
            workInProgress2.pendingProps.children,
            renderLanes2
          ), workInProgress2.child;
        case 29:
          throw workInProgress2.pendingProps;
      }
      throw Error(formatProdErrorMessage(156, workInProgress2.tag));
    }
    function markUpdate(workInProgress2) {
      workInProgress2.flags |= 4;
    }
    function preloadInstanceAndSuspendIfNeeded(workInProgress2, type, oldProps, newProps, renderLanes2) {
      if (type = 0 !== (workInProgress2.mode & 32)) type = false;
      if (type) {
        if (workInProgress2.flags |= 16777216, (renderLanes2 & 335544128) === renderLanes2)
          if (workInProgress2.stateNode.complete) workInProgress2.flags |= 8192;
          else if (shouldRemainOnPreviousScreen()) workInProgress2.flags |= 8192;
          else
            throw suspendedThenable = noopSuspenseyCommitThenable, SuspenseyCommitException;
      } else workInProgress2.flags &= -16777217;
    }
    function preloadResourceAndSuspendIfNeeded(workInProgress2, resource) {
      if ("stylesheet" !== resource.type || 0 !== (resource.state.loading & 4))
        workInProgress2.flags &= -16777217;
      else if (workInProgress2.flags |= 16777216, !preloadResource(resource))
        if (shouldRemainOnPreviousScreen()) workInProgress2.flags |= 8192;
        else
          throw suspendedThenable = noopSuspenseyCommitThenable, SuspenseyCommitException;
    }
    function scheduleRetryEffect(workInProgress2, retryQueue) {
      null !== retryQueue && (workInProgress2.flags |= 4);
      workInProgress2.flags & 16384 && (retryQueue = 22 !== workInProgress2.tag ? claimNextRetryLane() : 536870912, workInProgress2.lanes |= retryQueue, workInProgressSuspendedRetryLanes |= retryQueue);
    }
    function cutOffTailIfNeeded(renderState, hasRenderedATailFallback) {
      if (!isHydrating)
        switch (renderState.tailMode) {
          case "hidden":
            hasRenderedATailFallback = renderState.tail;
            for (var lastTailNode = null; null !== hasRenderedATailFallback; )
              null !== hasRenderedATailFallback.alternate && (lastTailNode = hasRenderedATailFallback), hasRenderedATailFallback = hasRenderedATailFallback.sibling;
            null === lastTailNode ? renderState.tail = null : lastTailNode.sibling = null;
            break;
          case "collapsed":
            lastTailNode = renderState.tail;
            for (var lastTailNode$106 = null; null !== lastTailNode; )
              null !== lastTailNode.alternate && (lastTailNode$106 = lastTailNode), lastTailNode = lastTailNode.sibling;
            null === lastTailNode$106 ? hasRenderedATailFallback || null === renderState.tail ? renderState.tail = null : renderState.tail.sibling = null : lastTailNode$106.sibling = null;
        }
    }
    function bubbleProperties(completedWork) {
      var didBailout = null !== completedWork.alternate && completedWork.alternate.child === completedWork.child, newChildLanes = 0, subtreeFlags = 0;
      if (didBailout)
        for (var child$107 = completedWork.child; null !== child$107; )
          newChildLanes |= child$107.lanes | child$107.childLanes, subtreeFlags |= child$107.subtreeFlags & 65011712, subtreeFlags |= child$107.flags & 65011712, child$107.return = completedWork, child$107 = child$107.sibling;
      else
        for (child$107 = completedWork.child; null !== child$107; )
          newChildLanes |= child$107.lanes | child$107.childLanes, subtreeFlags |= child$107.subtreeFlags, subtreeFlags |= child$107.flags, child$107.return = completedWork, child$107 = child$107.sibling;
      completedWork.subtreeFlags |= subtreeFlags;
      completedWork.childLanes = newChildLanes;
      return didBailout;
    }
    function completeWork(current, workInProgress2, renderLanes2) {
      var newProps = workInProgress2.pendingProps;
      popTreeContext(workInProgress2);
      switch (workInProgress2.tag) {
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return bubbleProperties(workInProgress2), null;
        case 1:
          return bubbleProperties(workInProgress2), null;
        case 3:
          renderLanes2 = workInProgress2.stateNode;
          newProps = null;
          null !== current && (newProps = current.memoizedState.cache);
          workInProgress2.memoizedState.cache !== newProps && (workInProgress2.flags |= 2048);
          popProvider(CacheContext);
          popHostContainer();
          renderLanes2.pendingContext && (renderLanes2.context = renderLanes2.pendingContext, renderLanes2.pendingContext = null);
          if (null === current || null === current.child)
            popHydrationState(workInProgress2) ? markUpdate(workInProgress2) : null === current || current.memoizedState.isDehydrated && 0 === (workInProgress2.flags & 256) || (workInProgress2.flags |= 1024, upgradeHydrationErrorsToRecoverable());
          bubbleProperties(workInProgress2);
          return null;
        case 26:
          var type = workInProgress2.type, nextResource = workInProgress2.memoizedState;
          null === current ? (markUpdate(workInProgress2), null !== nextResource ? (bubbleProperties(workInProgress2), preloadResourceAndSuspendIfNeeded(workInProgress2, nextResource)) : (bubbleProperties(workInProgress2), preloadInstanceAndSuspendIfNeeded(
            workInProgress2,
            type,
            null,
            newProps,
            renderLanes2
          ))) : nextResource ? nextResource !== current.memoizedState ? (markUpdate(workInProgress2), bubbleProperties(workInProgress2), preloadResourceAndSuspendIfNeeded(workInProgress2, nextResource)) : (bubbleProperties(workInProgress2), workInProgress2.flags &= -16777217) : (current = current.memoizedProps, current !== newProps && markUpdate(workInProgress2), bubbleProperties(workInProgress2), preloadInstanceAndSuspendIfNeeded(
            workInProgress2,
            type,
            current,
            newProps,
            renderLanes2
          ));
          return null;
        case 27:
          popHostContext(workInProgress2);
          renderLanes2 = rootInstanceStackCursor.current;
          type = workInProgress2.type;
          if (null !== current && null != workInProgress2.stateNode)
            current.memoizedProps !== newProps && markUpdate(workInProgress2);
          else {
            if (!newProps) {
              if (null === workInProgress2.stateNode)
                throw Error(formatProdErrorMessage(166));
              bubbleProperties(workInProgress2);
              return null;
            }
            current = contextStackCursor.current;
            popHydrationState(workInProgress2) ? prepareToHydrateHostInstance(workInProgress2) : (current = resolveSingletonInstance(type, newProps, renderLanes2), workInProgress2.stateNode = current, markUpdate(workInProgress2));
          }
          bubbleProperties(workInProgress2);
          return null;
        case 5:
          popHostContext(workInProgress2);
          type = workInProgress2.type;
          if (null !== current && null != workInProgress2.stateNode)
            current.memoizedProps !== newProps && markUpdate(workInProgress2);
          else {
            if (!newProps) {
              if (null === workInProgress2.stateNode)
                throw Error(formatProdErrorMessage(166));
              bubbleProperties(workInProgress2);
              return null;
            }
            nextResource = contextStackCursor.current;
            if (popHydrationState(workInProgress2))
              prepareToHydrateHostInstance(workInProgress2);
            else {
              var ownerDocument = getOwnerDocumentFromRootContainer(
                rootInstanceStackCursor.current
              );
              switch (nextResource) {
                case 1:
                  nextResource = ownerDocument.createElementNS(
                    "http://www.w3.org/2000/svg",
                    type
                  );
                  break;
                case 2:
                  nextResource = ownerDocument.createElementNS(
                    "http://www.w3.org/1998/Math/MathML",
                    type
                  );
                  break;
                default:
                  switch (type) {
                    case "svg":
                      nextResource = ownerDocument.createElementNS(
                        "http://www.w3.org/2000/svg",
                        type
                      );
                      break;
                    case "math":
                      nextResource = ownerDocument.createElementNS(
                        "http://www.w3.org/1998/Math/MathML",
                        type
                      );
                      break;
                    case "script":
                      nextResource = ownerDocument.createElement("div");
                      nextResource.innerHTML = "<script><\/script>";
                      nextResource = nextResource.removeChild(
                        nextResource.firstChild
                      );
                      break;
                    case "select":
                      nextResource = "string" === typeof newProps.is ? ownerDocument.createElement("select", {
                        is: newProps.is
                      }) : ownerDocument.createElement("select");
                      newProps.multiple ? nextResource.multiple = true : newProps.size && (nextResource.size = newProps.size);
                      break;
                    default:
                      nextResource = "string" === typeof newProps.is ? ownerDocument.createElement(type, { is: newProps.is }) : ownerDocument.createElement(type);
                  }
              }
              nextResource[internalInstanceKey] = workInProgress2;
              nextResource[internalPropsKey] = newProps;
              a: for (ownerDocument = workInProgress2.child; null !== ownerDocument; ) {
                if (5 === ownerDocument.tag || 6 === ownerDocument.tag)
                  nextResource.appendChild(ownerDocument.stateNode);
                else if (4 !== ownerDocument.tag && 27 !== ownerDocument.tag && null !== ownerDocument.child) {
                  ownerDocument.child.return = ownerDocument;
                  ownerDocument = ownerDocument.child;
                  continue;
                }
                if (ownerDocument === workInProgress2) break a;
                for (; null === ownerDocument.sibling; ) {
                  if (null === ownerDocument.return || ownerDocument.return === workInProgress2)
                    break a;
                  ownerDocument = ownerDocument.return;
                }
                ownerDocument.sibling.return = ownerDocument.return;
                ownerDocument = ownerDocument.sibling;
              }
              workInProgress2.stateNode = nextResource;
              a: switch (setInitialProperties(nextResource, type, newProps), type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  newProps = !!newProps.autoFocus;
                  break a;
                case "img":
                  newProps = true;
                  break a;
                default:
                  newProps = false;
              }
              newProps && markUpdate(workInProgress2);
            }
          }
          bubbleProperties(workInProgress2);
          preloadInstanceAndSuspendIfNeeded(
            workInProgress2,
            workInProgress2.type,
            null === current ? null : current.memoizedProps,
            workInProgress2.pendingProps,
            renderLanes2
          );
          return null;
        case 6:
          if (current && null != workInProgress2.stateNode)
            current.memoizedProps !== newProps && markUpdate(workInProgress2);
          else {
            if ("string" !== typeof newProps && null === workInProgress2.stateNode)
              throw Error(formatProdErrorMessage(166));
            current = rootInstanceStackCursor.current;
            if (popHydrationState(workInProgress2)) {
              current = workInProgress2.stateNode;
              renderLanes2 = workInProgress2.memoizedProps;
              newProps = null;
              type = hydrationParentFiber;
              if (null !== type)
                switch (type.tag) {
                  case 27:
                  case 5:
                    newProps = type.memoizedProps;
                }
              current[internalInstanceKey] = workInProgress2;
              current = current.nodeValue === renderLanes2 || null !== newProps && true === newProps.suppressHydrationWarning || checkForUnmatchedText(current.nodeValue, renderLanes2) ? true : false;
              current || throwOnHydrationMismatch(workInProgress2, true);
            } else
              current = getOwnerDocumentFromRootContainer(current).createTextNode(
                newProps
              ), current[internalInstanceKey] = workInProgress2, workInProgress2.stateNode = current;
          }
          bubbleProperties(workInProgress2);
          return null;
        case 31:
          renderLanes2 = workInProgress2.memoizedState;
          if (null === current || null !== current.memoizedState) {
            newProps = popHydrationState(workInProgress2);
            if (null !== renderLanes2) {
              if (null === current) {
                if (!newProps) throw Error(formatProdErrorMessage(318));
                current = workInProgress2.memoizedState;
                current = null !== current ? current.dehydrated : null;
                if (!current) throw Error(formatProdErrorMessage(557));
                current[internalInstanceKey] = workInProgress2;
              } else
                resetHydrationState(), 0 === (workInProgress2.flags & 128) && (workInProgress2.memoizedState = null), workInProgress2.flags |= 4;
              bubbleProperties(workInProgress2);
              current = false;
            } else
              renderLanes2 = upgradeHydrationErrorsToRecoverable(), null !== current && null !== current.memoizedState && (current.memoizedState.hydrationErrors = renderLanes2), current = true;
            if (!current) {
              if (workInProgress2.flags & 256)
                return popSuspenseHandler(workInProgress2), workInProgress2;
              popSuspenseHandler(workInProgress2);
              return null;
            }
            if (0 !== (workInProgress2.flags & 128))
              throw Error(formatProdErrorMessage(558));
          }
          bubbleProperties(workInProgress2);
          return null;
        case 13:
          newProps = workInProgress2.memoizedState;
          if (null === current || null !== current.memoizedState && null !== current.memoizedState.dehydrated) {
            type = popHydrationState(workInProgress2);
            if (null !== newProps && null !== newProps.dehydrated) {
              if (null === current) {
                if (!type) throw Error(formatProdErrorMessage(318));
                type = workInProgress2.memoizedState;
                type = null !== type ? type.dehydrated : null;
                if (!type) throw Error(formatProdErrorMessage(317));
                type[internalInstanceKey] = workInProgress2;
              } else
                resetHydrationState(), 0 === (workInProgress2.flags & 128) && (workInProgress2.memoizedState = null), workInProgress2.flags |= 4;
              bubbleProperties(workInProgress2);
              type = false;
            } else
              type = upgradeHydrationErrorsToRecoverable(), null !== current && null !== current.memoizedState && (current.memoizedState.hydrationErrors = type), type = true;
            if (!type) {
              if (workInProgress2.flags & 256)
                return popSuspenseHandler(workInProgress2), workInProgress2;
              popSuspenseHandler(workInProgress2);
              return null;
            }
          }
          popSuspenseHandler(workInProgress2);
          if (0 !== (workInProgress2.flags & 128))
            return workInProgress2.lanes = renderLanes2, workInProgress2;
          renderLanes2 = null !== newProps;
          current = null !== current && null !== current.memoizedState;
          renderLanes2 && (newProps = workInProgress2.child, type = null, null !== newProps.alternate && null !== newProps.alternate.memoizedState && null !== newProps.alternate.memoizedState.cachePool && (type = newProps.alternate.memoizedState.cachePool.pool), nextResource = null, null !== newProps.memoizedState && null !== newProps.memoizedState.cachePool && (nextResource = newProps.memoizedState.cachePool.pool), nextResource !== type && (newProps.flags |= 2048));
          renderLanes2 !== current && renderLanes2 && (workInProgress2.child.flags |= 8192);
          scheduleRetryEffect(workInProgress2, workInProgress2.updateQueue);
          bubbleProperties(workInProgress2);
          return null;
        case 4:
          return popHostContainer(), null === current && listenToAllSupportedEvents(workInProgress2.stateNode.containerInfo), bubbleProperties(workInProgress2), null;
        case 10:
          return popProvider(workInProgress2.type), bubbleProperties(workInProgress2), null;
        case 19:
          pop(suspenseStackCursor);
          newProps = workInProgress2.memoizedState;
          if (null === newProps) return bubbleProperties(workInProgress2), null;
          type = 0 !== (workInProgress2.flags & 128);
          nextResource = newProps.rendering;
          if (null === nextResource)
            if (type) cutOffTailIfNeeded(newProps, false);
            else {
              if (0 !== workInProgressRootExitStatus || null !== current && 0 !== (current.flags & 128))
                for (current = workInProgress2.child; null !== current; ) {
                  nextResource = findFirstSuspended(current);
                  if (null !== nextResource) {
                    workInProgress2.flags |= 128;
                    cutOffTailIfNeeded(newProps, false);
                    current = nextResource.updateQueue;
                    workInProgress2.updateQueue = current;
                    scheduleRetryEffect(workInProgress2, current);
                    workInProgress2.subtreeFlags = 0;
                    current = renderLanes2;
                    for (renderLanes2 = workInProgress2.child; null !== renderLanes2; )
                      resetWorkInProgress(renderLanes2, current), renderLanes2 = renderLanes2.sibling;
                    push(
                      suspenseStackCursor,
                      suspenseStackCursor.current & 1 | 2
                    );
                    isHydrating && pushTreeFork(workInProgress2, newProps.treeForkCount);
                    return workInProgress2.child;
                  }
                  current = current.sibling;
                }
              null !== newProps.tail && now() > workInProgressRootRenderTargetTime && (workInProgress2.flags |= 128, type = true, cutOffTailIfNeeded(newProps, false), workInProgress2.lanes = 4194304);
            }
          else {
            if (!type)
              if (current = findFirstSuspended(nextResource), null !== current) {
                if (workInProgress2.flags |= 128, type = true, current = current.updateQueue, workInProgress2.updateQueue = current, scheduleRetryEffect(workInProgress2, current), cutOffTailIfNeeded(newProps, true), null === newProps.tail && "hidden" === newProps.tailMode && !nextResource.alternate && !isHydrating)
                  return bubbleProperties(workInProgress2), null;
              } else
                2 * now() - newProps.renderingStartTime > workInProgressRootRenderTargetTime && 536870912 !== renderLanes2 && (workInProgress2.flags |= 128, type = true, cutOffTailIfNeeded(newProps, false), workInProgress2.lanes = 4194304);
            newProps.isBackwards ? (nextResource.sibling = workInProgress2.child, workInProgress2.child = nextResource) : (current = newProps.last, null !== current ? current.sibling = nextResource : workInProgress2.child = nextResource, newProps.last = nextResource);
          }
          if (null !== newProps.tail)
            return current = newProps.tail, newProps.rendering = current, newProps.tail = current.sibling, newProps.renderingStartTime = now(), current.sibling = null, renderLanes2 = suspenseStackCursor.current, push(
              suspenseStackCursor,
              type ? renderLanes2 & 1 | 2 : renderLanes2 & 1
            ), isHydrating && pushTreeFork(workInProgress2, newProps.treeForkCount), current;
          bubbleProperties(workInProgress2);
          return null;
        case 22:
        case 23:
          return popSuspenseHandler(workInProgress2), popHiddenContext(), newProps = null !== workInProgress2.memoizedState, null !== current ? null !== current.memoizedState !== newProps && (workInProgress2.flags |= 8192) : newProps && (workInProgress2.flags |= 8192), newProps ? 0 !== (renderLanes2 & 536870912) && 0 === (workInProgress2.flags & 128) && (bubbleProperties(workInProgress2), workInProgress2.subtreeFlags & 6 && (workInProgress2.flags |= 8192)) : bubbleProperties(workInProgress2), renderLanes2 = workInProgress2.updateQueue, null !== renderLanes2 && scheduleRetryEffect(workInProgress2, renderLanes2.retryQueue), renderLanes2 = null, null !== current && null !== current.memoizedState && null !== current.memoizedState.cachePool && (renderLanes2 = current.memoizedState.cachePool.pool), newProps = null, null !== workInProgress2.memoizedState && null !== workInProgress2.memoizedState.cachePool && (newProps = workInProgress2.memoizedState.cachePool.pool), newProps !== renderLanes2 && (workInProgress2.flags |= 2048), null !== current && pop(resumedCache), null;
        case 24:
          return renderLanes2 = null, null !== current && (renderLanes2 = current.memoizedState.cache), workInProgress2.memoizedState.cache !== renderLanes2 && (workInProgress2.flags |= 2048), popProvider(CacheContext), bubbleProperties(workInProgress2), null;
        case 25:
          return null;
        case 30:
          return null;
      }
      throw Error(formatProdErrorMessage(156, workInProgress2.tag));
    }
    function unwindWork(current, workInProgress2) {
      popTreeContext(workInProgress2);
      switch (workInProgress2.tag) {
        case 1:
          return current = workInProgress2.flags, current & 65536 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
        case 3:
          return popProvider(CacheContext), popHostContainer(), current = workInProgress2.flags, 0 !== (current & 65536) && 0 === (current & 128) ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
        case 26:
        case 27:
        case 5:
          return popHostContext(workInProgress2), null;
        case 31:
          if (null !== workInProgress2.memoizedState) {
            popSuspenseHandler(workInProgress2);
            if (null === workInProgress2.alternate)
              throw Error(formatProdErrorMessage(340));
            resetHydrationState();
          }
          current = workInProgress2.flags;
          return current & 65536 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
        case 13:
          popSuspenseHandler(workInProgress2);
          current = workInProgress2.memoizedState;
          if (null !== current && null !== current.dehydrated) {
            if (null === workInProgress2.alternate)
              throw Error(formatProdErrorMessage(340));
            resetHydrationState();
          }
          current = workInProgress2.flags;
          return current & 65536 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
        case 19:
          return pop(suspenseStackCursor), null;
        case 4:
          return popHostContainer(), null;
        case 10:
          return popProvider(workInProgress2.type), null;
        case 22:
        case 23:
          return popSuspenseHandler(workInProgress2), popHiddenContext(), null !== current && pop(resumedCache), current = workInProgress2.flags, current & 65536 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
        case 24:
          return popProvider(CacheContext), null;
        case 25:
          return null;
        default:
          return null;
      }
    }
    function unwindInterruptedWork(current, interruptedWork) {
      popTreeContext(interruptedWork);
      switch (interruptedWork.tag) {
        case 3:
          popProvider(CacheContext);
          popHostContainer();
          break;
        case 26:
        case 27:
        case 5:
          popHostContext(interruptedWork);
          break;
        case 4:
          popHostContainer();
          break;
        case 31:
          null !== interruptedWork.memoizedState && popSuspenseHandler(interruptedWork);
          break;
        case 13:
          popSuspenseHandler(interruptedWork);
          break;
        case 19:
          pop(suspenseStackCursor);
          break;
        case 10:
          popProvider(interruptedWork.type);
          break;
        case 22:
        case 23:
          popSuspenseHandler(interruptedWork);
          popHiddenContext();
          null !== current && pop(resumedCache);
          break;
        case 24:
          popProvider(CacheContext);
      }
    }
    function commitHookEffectListMount(flags, finishedWork) {
      try {
        var updateQueue = finishedWork.updateQueue, lastEffect = null !== updateQueue ? updateQueue.lastEffect : null;
        if (null !== lastEffect) {
          var firstEffect = lastEffect.next;
          updateQueue = firstEffect;
          do {
            if ((updateQueue.tag & flags) === flags) {
              lastEffect = void 0;
              var create = updateQueue.create, inst = updateQueue.inst;
              lastEffect = create();
              inst.destroy = lastEffect;
            }
            updateQueue = updateQueue.next;
          } while (updateQueue !== firstEffect);
        }
      } catch (error) {
        captureCommitPhaseError(finishedWork, finishedWork.return, error);
      }
    }
    function commitHookEffectListUnmount(flags, finishedWork, nearestMountedAncestor$jscomp$0) {
      try {
        var updateQueue = finishedWork.updateQueue, lastEffect = null !== updateQueue ? updateQueue.lastEffect : null;
        if (null !== lastEffect) {
          var firstEffect = lastEffect.next;
          updateQueue = firstEffect;
          do {
            if ((updateQueue.tag & flags) === flags) {
              var inst = updateQueue.inst, destroy = inst.destroy;
              if (void 0 !== destroy) {
                inst.destroy = void 0;
                lastEffect = finishedWork;
                var nearestMountedAncestor = nearestMountedAncestor$jscomp$0, destroy_ = destroy;
                try {
                  destroy_();
                } catch (error) {
                  captureCommitPhaseError(
                    lastEffect,
                    nearestMountedAncestor,
                    error
                  );
                }
              }
            }
            updateQueue = updateQueue.next;
          } while (updateQueue !== firstEffect);
        }
      } catch (error) {
        captureCommitPhaseError(finishedWork, finishedWork.return, error);
      }
    }
    function commitClassCallbacks(finishedWork) {
      var updateQueue = finishedWork.updateQueue;
      if (null !== updateQueue) {
        var instance = finishedWork.stateNode;
        try {
          commitCallbacks(updateQueue, instance);
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
      }
    }
    function safelyCallComponentWillUnmount(current, nearestMountedAncestor, instance) {
      instance.props = resolveClassComponentProps(
        current.type,
        current.memoizedProps
      );
      instance.state = current.memoizedState;
      try {
        instance.componentWillUnmount();
      } catch (error) {
        captureCommitPhaseError(current, nearestMountedAncestor, error);
      }
    }
    function safelyAttachRef(current, nearestMountedAncestor) {
      try {
        var ref = current.ref;
        if (null !== ref) {
          switch (current.tag) {
            case 26:
            case 27:
            case 5:
              var instanceToUse = current.stateNode;
              break;
            case 30:
              instanceToUse = current.stateNode;
              break;
            default:
              instanceToUse = current.stateNode;
          }
          "function" === typeof ref ? current.refCleanup = ref(instanceToUse) : ref.current = instanceToUse;
        }
      } catch (error) {
        captureCommitPhaseError(current, nearestMountedAncestor, error);
      }
    }
    function safelyDetachRef(current, nearestMountedAncestor) {
      var ref = current.ref, refCleanup = current.refCleanup;
      if (null !== ref)
        if ("function" === typeof refCleanup)
          try {
            refCleanup();
          } catch (error) {
            captureCommitPhaseError(current, nearestMountedAncestor, error);
          } finally {
            current.refCleanup = null, current = current.alternate, null != current && (current.refCleanup = null);
          }
        else if ("function" === typeof ref)
          try {
            ref(null);
          } catch (error$140) {
            captureCommitPhaseError(current, nearestMountedAncestor, error$140);
          }
        else ref.current = null;
    }
    function commitHostMount(finishedWork) {
      var type = finishedWork.type, props = finishedWork.memoizedProps, instance = finishedWork.stateNode;
      try {
        a: switch (type) {
          case "button":
          case "input":
          case "select":
          case "textarea":
            props.autoFocus && instance.focus();
            break a;
          case "img":
            props.src ? instance.src = props.src : props.srcSet && (instance.srcset = props.srcSet);
        }
      } catch (error) {
        captureCommitPhaseError(finishedWork, finishedWork.return, error);
      }
    }
    function commitHostUpdate(finishedWork, newProps, oldProps) {
      try {
        var domElement = finishedWork.stateNode;
        updateProperties(domElement, finishedWork.type, oldProps, newProps);
        domElement[internalPropsKey] = newProps;
      } catch (error) {
        captureCommitPhaseError(finishedWork, finishedWork.return, error);
      }
    }
    function isHostParent(fiber) {
      return 5 === fiber.tag || 3 === fiber.tag || 26 === fiber.tag || 27 === fiber.tag && isSingletonScope(fiber.type) || 4 === fiber.tag;
    }
    function getHostSibling(fiber) {
      a: for (; ; ) {
        for (; null === fiber.sibling; ) {
          if (null === fiber.return || isHostParent(fiber.return)) return null;
          fiber = fiber.return;
        }
        fiber.sibling.return = fiber.return;
        for (fiber = fiber.sibling; 5 !== fiber.tag && 6 !== fiber.tag && 18 !== fiber.tag; ) {
          if (27 === fiber.tag && isSingletonScope(fiber.type)) continue a;
          if (fiber.flags & 2) continue a;
          if (null === fiber.child || 4 === fiber.tag) continue a;
          else fiber.child.return = fiber, fiber = fiber.child;
        }
        if (!(fiber.flags & 2)) return fiber.stateNode;
      }
    }
    function insertOrAppendPlacementNodeIntoContainer(node, before, parent) {
      var tag = node.tag;
      if (5 === tag || 6 === tag)
        node = node.stateNode, before ? (9 === parent.nodeType ? parent.body : "HTML" === parent.nodeName ? parent.ownerDocument.body : parent).insertBefore(node, before) : (before = 9 === parent.nodeType ? parent.body : "HTML" === parent.nodeName ? parent.ownerDocument.body : parent, before.appendChild(node), parent = parent._reactRootContainer, null !== parent && void 0 !== parent || null !== before.onclick || (before.onclick = noop$1));
      else if (4 !== tag && (27 === tag && isSingletonScope(node.type) && (parent = node.stateNode, before = null), node = node.child, null !== node))
        for (insertOrAppendPlacementNodeIntoContainer(node, before, parent), node = node.sibling; null !== node; )
          insertOrAppendPlacementNodeIntoContainer(node, before, parent), node = node.sibling;
    }
    function insertOrAppendPlacementNode(node, before, parent) {
      var tag = node.tag;
      if (5 === tag || 6 === tag)
        node = node.stateNode, before ? parent.insertBefore(node, before) : parent.appendChild(node);
      else if (4 !== tag && (27 === tag && isSingletonScope(node.type) && (parent = node.stateNode), node = node.child, null !== node))
        for (insertOrAppendPlacementNode(node, before, parent), node = node.sibling; null !== node; )
          insertOrAppendPlacementNode(node, before, parent), node = node.sibling;
    }
    function commitHostSingletonAcquisition(finishedWork) {
      var singleton = finishedWork.stateNode, props = finishedWork.memoizedProps;
      try {
        for (var type = finishedWork.type, attributes = singleton.attributes; attributes.length; )
          singleton.removeAttributeNode(attributes[0]);
        setInitialProperties(singleton, type, props);
        singleton[internalInstanceKey] = finishedWork;
        singleton[internalPropsKey] = props;
      } catch (error) {
        captureCommitPhaseError(finishedWork, finishedWork.return, error);
      }
    }
    var offscreenSubtreeIsHidden = false, offscreenSubtreeWasHidden = false, needsFormReset = false, PossiblyWeakSet = "function" === typeof WeakSet ? WeakSet : Set, nextEffect = null;
    function commitBeforeMutationEffects(root3, firstChild) {
      root3 = root3.containerInfo;
      eventsEnabled = _enabled;
      root3 = getActiveElementDeep(root3);
      if (hasSelectionCapabilities(root3)) {
        if ("selectionStart" in root3)
          var JSCompiler_temp = {
            start: root3.selectionStart,
            end: root3.selectionEnd
          };
        else
          a: {
            JSCompiler_temp = (JSCompiler_temp = root3.ownerDocument) && JSCompiler_temp.defaultView || window;
            var selection = JSCompiler_temp.getSelection && JSCompiler_temp.getSelection();
            if (selection && 0 !== selection.rangeCount) {
              JSCompiler_temp = selection.anchorNode;
              var anchorOffset = selection.anchorOffset, focusNode = selection.focusNode;
              selection = selection.focusOffset;
              try {
                JSCompiler_temp.nodeType, focusNode.nodeType;
              } catch (e$20) {
                JSCompiler_temp = null;
                break a;
              }
              var length = 0, start = -1, end = -1, indexWithinAnchor = 0, indexWithinFocus = 0, node = root3, parentNode = null;
              b: for (; ; ) {
                for (var next; ; ) {
                  node !== JSCompiler_temp || 0 !== anchorOffset && 3 !== node.nodeType || (start = length + anchorOffset);
                  node !== focusNode || 0 !== selection && 3 !== node.nodeType || (end = length + selection);
                  3 === node.nodeType && (length += node.nodeValue.length);
                  if (null === (next = node.firstChild)) break;
                  parentNode = node;
                  node = next;
                }
                for (; ; ) {
                  if (node === root3) break b;
                  parentNode === JSCompiler_temp && ++indexWithinAnchor === anchorOffset && (start = length);
                  parentNode === focusNode && ++indexWithinFocus === selection && (end = length);
                  if (null !== (next = node.nextSibling)) break;
                  node = parentNode;
                  parentNode = node.parentNode;
                }
                node = next;
              }
              JSCompiler_temp = -1 === start || -1 === end ? null : { start, end };
            } else JSCompiler_temp = null;
          }
        JSCompiler_temp = JSCompiler_temp || { start: 0, end: 0 };
      } else JSCompiler_temp = null;
      selectionInformation = { focusedElem: root3, selectionRange: JSCompiler_temp };
      _enabled = false;
      for (nextEffect = firstChild; null !== nextEffect; )
        if (firstChild = nextEffect, root3 = firstChild.child, 0 !== (firstChild.subtreeFlags & 1028) && null !== root3)
          root3.return = firstChild, nextEffect = root3;
        else
          for (; null !== nextEffect; ) {
            firstChild = nextEffect;
            focusNode = firstChild.alternate;
            root3 = firstChild.flags;
            switch (firstChild.tag) {
              case 0:
                if (0 !== (root3 & 4) && (root3 = firstChild.updateQueue, root3 = null !== root3 ? root3.events : null, null !== root3))
                  for (JSCompiler_temp = 0; JSCompiler_temp < root3.length; JSCompiler_temp++)
                    anchorOffset = root3[JSCompiler_temp], anchorOffset.ref.impl = anchorOffset.nextImpl;
                break;
              case 11:
              case 15:
                break;
              case 1:
                if (0 !== (root3 & 1024) && null !== focusNode) {
                  root3 = void 0;
                  JSCompiler_temp = firstChild;
                  anchorOffset = focusNode.memoizedProps;
                  focusNode = focusNode.memoizedState;
                  selection = JSCompiler_temp.stateNode;
                  try {
                    var resolvedPrevProps = resolveClassComponentProps(
                      JSCompiler_temp.type,
                      anchorOffset
                    );
                    root3 = selection.getSnapshotBeforeUpdate(
                      resolvedPrevProps,
                      focusNode
                    );
                    selection.__reactInternalSnapshotBeforeUpdate = root3;
                  } catch (error) {
                    captureCommitPhaseError(
                      JSCompiler_temp,
                      JSCompiler_temp.return,
                      error
                    );
                  }
                }
                break;
              case 3:
                if (0 !== (root3 & 1024)) {
                  if (root3 = firstChild.stateNode.containerInfo, JSCompiler_temp = root3.nodeType, 9 === JSCompiler_temp)
                    clearContainerSparingly(root3);
                  else if (1 === JSCompiler_temp)
                    switch (root3.nodeName) {
                      case "HEAD":
                      case "HTML":
                      case "BODY":
                        clearContainerSparingly(root3);
                        break;
                      default:
                        root3.textContent = "";
                    }
                }
                break;
              case 5:
              case 26:
              case 27:
              case 6:
              case 4:
              case 17:
                break;
              default:
                if (0 !== (root3 & 1024)) throw Error(formatProdErrorMessage(163));
            }
            root3 = firstChild.sibling;
            if (null !== root3) {
              root3.return = firstChild.return;
              nextEffect = root3;
              break;
            }
            nextEffect = firstChild.return;
          }
    }
    function commitLayoutEffectOnFiber(finishedRoot, current, finishedWork) {
      var flags = finishedWork.flags;
      switch (finishedWork.tag) {
        case 0:
        case 11:
        case 15:
          recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
          flags & 4 && commitHookEffectListMount(5, finishedWork);
          break;
        case 1:
          recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
          if (flags & 4)
            if (finishedRoot = finishedWork.stateNode, null === current)
              try {
                finishedRoot.componentDidMount();
              } catch (error) {
                captureCommitPhaseError(finishedWork, finishedWork.return, error);
              }
            else {
              var prevProps = resolveClassComponentProps(
                finishedWork.type,
                current.memoizedProps
              );
              current = current.memoizedState;
              try {
                finishedRoot.componentDidUpdate(
                  prevProps,
                  current,
                  finishedRoot.__reactInternalSnapshotBeforeUpdate
                );
              } catch (error$139) {
                captureCommitPhaseError(
                  finishedWork,
                  finishedWork.return,
                  error$139
                );
              }
            }
          flags & 64 && commitClassCallbacks(finishedWork);
          flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
          break;
        case 3:
          recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
          if (flags & 64 && (finishedRoot = finishedWork.updateQueue, null !== finishedRoot)) {
            current = null;
            if (null !== finishedWork.child)
              switch (finishedWork.child.tag) {
                case 27:
                case 5:
                  current = finishedWork.child.stateNode;
                  break;
                case 1:
                  current = finishedWork.child.stateNode;
              }
            try {
              commitCallbacks(finishedRoot, current);
            } catch (error) {
              captureCommitPhaseError(finishedWork, finishedWork.return, error);
            }
          }
          break;
        case 27:
          null === current && flags & 4 && commitHostSingletonAcquisition(finishedWork);
        case 26:
        case 5:
          recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
          null === current && flags & 4 && commitHostMount(finishedWork);
          flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
          break;
        case 12:
          recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
          break;
        case 31:
          recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
          flags & 4 && commitActivityHydrationCallbacks(finishedRoot, finishedWork);
          break;
        case 13:
          recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
          flags & 4 && commitSuspenseHydrationCallbacks(finishedRoot, finishedWork);
          flags & 64 && (finishedRoot = finishedWork.memoizedState, null !== finishedRoot && (finishedRoot = finishedRoot.dehydrated, null !== finishedRoot && (finishedWork = retryDehydratedSuspenseBoundary.bind(
            null,
            finishedWork
          ), registerSuspenseInstanceRetry(finishedRoot, finishedWork))));
          break;
        case 22:
          flags = null !== finishedWork.memoizedState || offscreenSubtreeIsHidden;
          if (!flags) {
            current = null !== current && null !== current.memoizedState || offscreenSubtreeWasHidden;
            prevProps = offscreenSubtreeIsHidden;
            var prevOffscreenSubtreeWasHidden = offscreenSubtreeWasHidden;
            offscreenSubtreeIsHidden = flags;
            (offscreenSubtreeWasHidden = current) && !prevOffscreenSubtreeWasHidden ? recursivelyTraverseReappearLayoutEffects(
              finishedRoot,
              finishedWork,
              0 !== (finishedWork.subtreeFlags & 8772)
            ) : recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
            offscreenSubtreeIsHidden = prevProps;
            offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden;
          }
          break;
        case 30:
          break;
        default:
          recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
      }
    }
    function detachFiberAfterEffects(fiber) {
      var alternate = fiber.alternate;
      null !== alternate && (fiber.alternate = null, detachFiberAfterEffects(alternate));
      fiber.child = null;
      fiber.deletions = null;
      fiber.sibling = null;
      5 === fiber.tag && (alternate = fiber.stateNode, null !== alternate && detachDeletedInstance(alternate));
      fiber.stateNode = null;
      fiber.return = null;
      fiber.dependencies = null;
      fiber.memoizedProps = null;
      fiber.memoizedState = null;
      fiber.pendingProps = null;
      fiber.stateNode = null;
      fiber.updateQueue = null;
    }
    var hostParent = null, hostParentIsContainer = false;
    function recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, parent) {
      for (parent = parent.child; null !== parent; )
        commitDeletionEffectsOnFiber(finishedRoot, nearestMountedAncestor, parent), parent = parent.sibling;
    }
    function commitDeletionEffectsOnFiber(finishedRoot, nearestMountedAncestor, deletedFiber) {
      if (injectedHook && "function" === typeof injectedHook.onCommitFiberUnmount)
        try {
          injectedHook.onCommitFiberUnmount(rendererID, deletedFiber);
        } catch (err) {
        }
      switch (deletedFiber.tag) {
        case 26:
          offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
          recursivelyTraverseDeletionEffects(
            finishedRoot,
            nearestMountedAncestor,
            deletedFiber
          );
          deletedFiber.memoizedState ? deletedFiber.memoizedState.count-- : deletedFiber.stateNode && (deletedFiber = deletedFiber.stateNode, deletedFiber.parentNode.removeChild(deletedFiber));
          break;
        case 27:
          offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
          var prevHostParent = hostParent, prevHostParentIsContainer = hostParentIsContainer;
          isSingletonScope(deletedFiber.type) && (hostParent = deletedFiber.stateNode, hostParentIsContainer = false);
          recursivelyTraverseDeletionEffects(
            finishedRoot,
            nearestMountedAncestor,
            deletedFiber
          );
          releaseSingletonInstance(deletedFiber.stateNode);
          hostParent = prevHostParent;
          hostParentIsContainer = prevHostParentIsContainer;
          break;
        case 5:
          offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
        case 6:
          prevHostParent = hostParent;
          prevHostParentIsContainer = hostParentIsContainer;
          hostParent = null;
          recursivelyTraverseDeletionEffects(
            finishedRoot,
            nearestMountedAncestor,
            deletedFiber
          );
          hostParent = prevHostParent;
          hostParentIsContainer = prevHostParentIsContainer;
          if (null !== hostParent)
            if (hostParentIsContainer)
              try {
                (9 === hostParent.nodeType ? hostParent.body : "HTML" === hostParent.nodeName ? hostParent.ownerDocument.body : hostParent).removeChild(deletedFiber.stateNode);
              } catch (error) {
                captureCommitPhaseError(
                  deletedFiber,
                  nearestMountedAncestor,
                  error
                );
              }
            else
              try {
                hostParent.removeChild(deletedFiber.stateNode);
              } catch (error) {
                captureCommitPhaseError(
                  deletedFiber,
                  nearestMountedAncestor,
                  error
                );
              }
          break;
        case 18:
          null !== hostParent && (hostParentIsContainer ? (finishedRoot = hostParent, clearHydrationBoundary(
            9 === finishedRoot.nodeType ? finishedRoot.body : "HTML" === finishedRoot.nodeName ? finishedRoot.ownerDocument.body : finishedRoot,
            deletedFiber.stateNode
          ), retryIfBlockedOn(finishedRoot)) : clearHydrationBoundary(hostParent, deletedFiber.stateNode));
          break;
        case 4:
          prevHostParent = hostParent;
          prevHostParentIsContainer = hostParentIsContainer;
          hostParent = deletedFiber.stateNode.containerInfo;
          hostParentIsContainer = true;
          recursivelyTraverseDeletionEffects(
            finishedRoot,
            nearestMountedAncestor,
            deletedFiber
          );
          hostParent = prevHostParent;
          hostParentIsContainer = prevHostParentIsContainer;
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          commitHookEffectListUnmount(2, deletedFiber, nearestMountedAncestor);
          offscreenSubtreeWasHidden || commitHookEffectListUnmount(4, deletedFiber, nearestMountedAncestor);
          recursivelyTraverseDeletionEffects(
            finishedRoot,
            nearestMountedAncestor,
            deletedFiber
          );
          break;
        case 1:
          offscreenSubtreeWasHidden || (safelyDetachRef(deletedFiber, nearestMountedAncestor), prevHostParent = deletedFiber.stateNode, "function" === typeof prevHostParent.componentWillUnmount && safelyCallComponentWillUnmount(
            deletedFiber,
            nearestMountedAncestor,
            prevHostParent
          ));
          recursivelyTraverseDeletionEffects(
            finishedRoot,
            nearestMountedAncestor,
            deletedFiber
          );
          break;
        case 21:
          recursivelyTraverseDeletionEffects(
            finishedRoot,
            nearestMountedAncestor,
            deletedFiber
          );
          break;
        case 22:
          offscreenSubtreeWasHidden = (prevHostParent = offscreenSubtreeWasHidden) || null !== deletedFiber.memoizedState;
          recursivelyTraverseDeletionEffects(
            finishedRoot,
            nearestMountedAncestor,
            deletedFiber
          );
          offscreenSubtreeWasHidden = prevHostParent;
          break;
        default:
          recursivelyTraverseDeletionEffects(
            finishedRoot,
            nearestMountedAncestor,
            deletedFiber
          );
      }
    }
    function commitActivityHydrationCallbacks(finishedRoot, finishedWork) {
      if (null === finishedWork.memoizedState && (finishedRoot = finishedWork.alternate, null !== finishedRoot && (finishedRoot = finishedRoot.memoizedState, null !== finishedRoot))) {
        finishedRoot = finishedRoot.dehydrated;
        try {
          retryIfBlockedOn(finishedRoot);
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
      }
    }
    function commitSuspenseHydrationCallbacks(finishedRoot, finishedWork) {
      if (null === finishedWork.memoizedState && (finishedRoot = finishedWork.alternate, null !== finishedRoot && (finishedRoot = finishedRoot.memoizedState, null !== finishedRoot && (finishedRoot = finishedRoot.dehydrated, null !== finishedRoot))))
        try {
          retryIfBlockedOn(finishedRoot);
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
    }
    function getRetryCache(finishedWork) {
      switch (finishedWork.tag) {
        case 31:
        case 13:
        case 19:
          var retryCache = finishedWork.stateNode;
          null === retryCache && (retryCache = finishedWork.stateNode = new PossiblyWeakSet());
          return retryCache;
        case 22:
          return finishedWork = finishedWork.stateNode, retryCache = finishedWork._retryCache, null === retryCache && (retryCache = finishedWork._retryCache = new PossiblyWeakSet()), retryCache;
        default:
          throw Error(formatProdErrorMessage(435, finishedWork.tag));
      }
    }
    function attachSuspenseRetryListeners(finishedWork, wakeables) {
      var retryCache = getRetryCache(finishedWork);
      wakeables.forEach(function(wakeable) {
        if (!retryCache.has(wakeable)) {
          retryCache.add(wakeable);
          var retry = resolveRetryWakeable.bind(null, finishedWork, wakeable);
          wakeable.then(retry, retry);
        }
      });
    }
    function recursivelyTraverseMutationEffects(root$jscomp$0, parentFiber) {
      var deletions = parentFiber.deletions;
      if (null !== deletions)
        for (var i = 0; i < deletions.length; i++) {
          var childToDelete = deletions[i], root3 = root$jscomp$0, returnFiber = parentFiber, parent = returnFiber;
          a: for (; null !== parent; ) {
            switch (parent.tag) {
              case 27:
                if (isSingletonScope(parent.type)) {
                  hostParent = parent.stateNode;
                  hostParentIsContainer = false;
                  break a;
                }
                break;
              case 5:
                hostParent = parent.stateNode;
                hostParentIsContainer = false;
                break a;
              case 3:
              case 4:
                hostParent = parent.stateNode.containerInfo;
                hostParentIsContainer = true;
                break a;
            }
            parent = parent.return;
          }
          if (null === hostParent) throw Error(formatProdErrorMessage(160));
          commitDeletionEffectsOnFiber(root3, returnFiber, childToDelete);
          hostParent = null;
          hostParentIsContainer = false;
          root3 = childToDelete.alternate;
          null !== root3 && (root3.return = null);
          childToDelete.return = null;
        }
      if (parentFiber.subtreeFlags & 13886)
        for (parentFiber = parentFiber.child; null !== parentFiber; )
          commitMutationEffectsOnFiber(parentFiber, root$jscomp$0), parentFiber = parentFiber.sibling;
    }
    var currentHoistableRoot = null;
    function commitMutationEffectsOnFiber(finishedWork, root3) {
      var current = finishedWork.alternate, flags = finishedWork.flags;
      switch (finishedWork.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          recursivelyTraverseMutationEffects(root3, finishedWork);
          commitReconciliationEffects(finishedWork);
          flags & 4 && (commitHookEffectListUnmount(3, finishedWork, finishedWork.return), commitHookEffectListMount(3, finishedWork), commitHookEffectListUnmount(5, finishedWork, finishedWork.return));
          break;
        case 1:
          recursivelyTraverseMutationEffects(root3, finishedWork);
          commitReconciliationEffects(finishedWork);
          flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
          flags & 64 && offscreenSubtreeIsHidden && (finishedWork = finishedWork.updateQueue, null !== finishedWork && (flags = finishedWork.callbacks, null !== flags && (current = finishedWork.shared.hiddenCallbacks, finishedWork.shared.hiddenCallbacks = null === current ? flags : current.concat(flags))));
          break;
        case 26:
          var hoistableRoot = currentHoistableRoot;
          recursivelyTraverseMutationEffects(root3, finishedWork);
          commitReconciliationEffects(finishedWork);
          flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
          if (flags & 4) {
            var currentResource = null !== current ? current.memoizedState : null;
            flags = finishedWork.memoizedState;
            if (null === current)
              if (null === flags)
                if (null === finishedWork.stateNode) {
                  a: {
                    flags = finishedWork.type;
                    current = finishedWork.memoizedProps;
                    hoistableRoot = hoistableRoot.ownerDocument || hoistableRoot;
                    b: switch (flags) {
                      case "title":
                        currentResource = hoistableRoot.getElementsByTagName("title")[0];
                        if (!currentResource || currentResource[internalHoistableMarker] || currentResource[internalInstanceKey] || "http://www.w3.org/2000/svg" === currentResource.namespaceURI || currentResource.hasAttribute("itemprop"))
                          currentResource = hoistableRoot.createElement(flags), hoistableRoot.head.insertBefore(
                            currentResource,
                            hoistableRoot.querySelector("head > title")
                          );
                        setInitialProperties(currentResource, flags, current);
                        currentResource[internalInstanceKey] = finishedWork;
                        markNodeAsHoistable(currentResource);
                        flags = currentResource;
                        break a;
                      case "link":
                        var maybeNodes = getHydratableHoistableCache(
                          "link",
                          "href",
                          hoistableRoot
                        ).get(flags + (current.href || ""));
                        if (maybeNodes) {
                          for (var i = 0; i < maybeNodes.length; i++)
                            if (currentResource = maybeNodes[i], currentResource.getAttribute("href") === (null == current.href || "" === current.href ? null : current.href) && currentResource.getAttribute("rel") === (null == current.rel ? null : current.rel) && currentResource.getAttribute("title") === (null == current.title ? null : current.title) && currentResource.getAttribute("crossorigin") === (null == current.crossOrigin ? null : current.crossOrigin)) {
                              maybeNodes.splice(i, 1);
                              break b;
                            }
                        }
                        currentResource = hoistableRoot.createElement(flags);
                        setInitialProperties(currentResource, flags, current);
                        hoistableRoot.head.appendChild(currentResource);
                        break;
                      case "meta":
                        if (maybeNodes = getHydratableHoistableCache(
                          "meta",
                          "content",
                          hoistableRoot
                        ).get(flags + (current.content || ""))) {
                          for (i = 0; i < maybeNodes.length; i++)
                            if (currentResource = maybeNodes[i], currentResource.getAttribute("content") === (null == current.content ? null : "" + current.content) && currentResource.getAttribute("name") === (null == current.name ? null : current.name) && currentResource.getAttribute("property") === (null == current.property ? null : current.property) && currentResource.getAttribute("http-equiv") === (null == current.httpEquiv ? null : current.httpEquiv) && currentResource.getAttribute("charset") === (null == current.charSet ? null : current.charSet)) {
                              maybeNodes.splice(i, 1);
                              break b;
                            }
                        }
                        currentResource = hoistableRoot.createElement(flags);
                        setInitialProperties(currentResource, flags, current);
                        hoistableRoot.head.appendChild(currentResource);
                        break;
                      default:
                        throw Error(formatProdErrorMessage(468, flags));
                    }
                    currentResource[internalInstanceKey] = finishedWork;
                    markNodeAsHoistable(currentResource);
                    flags = currentResource;
                  }
                  finishedWork.stateNode = flags;
                } else
                  mountHoistable(
                    hoistableRoot,
                    finishedWork.type,
                    finishedWork.stateNode
                  );
              else
                finishedWork.stateNode = acquireResource(
                  hoistableRoot,
                  flags,
                  finishedWork.memoizedProps
                );
            else
              currentResource !== flags ? (null === currentResource ? null !== current.stateNode && (current = current.stateNode, current.parentNode.removeChild(current)) : currentResource.count--, null === flags ? mountHoistable(
                hoistableRoot,
                finishedWork.type,
                finishedWork.stateNode
              ) : acquireResource(
                hoistableRoot,
                flags,
                finishedWork.memoizedProps
              )) : null === flags && null !== finishedWork.stateNode && commitHostUpdate(
                finishedWork,
                finishedWork.memoizedProps,
                current.memoizedProps
              );
          }
          break;
        case 27:
          recursivelyTraverseMutationEffects(root3, finishedWork);
          commitReconciliationEffects(finishedWork);
          flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
          null !== current && flags & 4 && commitHostUpdate(
            finishedWork,
            finishedWork.memoizedProps,
            current.memoizedProps
          );
          break;
        case 5:
          recursivelyTraverseMutationEffects(root3, finishedWork);
          commitReconciliationEffects(finishedWork);
          flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
          if (finishedWork.flags & 32) {
            hoistableRoot = finishedWork.stateNode;
            try {
              setTextContent(hoistableRoot, "");
            } catch (error) {
              captureCommitPhaseError(finishedWork, finishedWork.return, error);
            }
          }
          flags & 4 && null != finishedWork.stateNode && (hoistableRoot = finishedWork.memoizedProps, commitHostUpdate(
            finishedWork,
            hoistableRoot,
            null !== current ? current.memoizedProps : hoistableRoot
          ));
          flags & 1024 && (needsFormReset = true);
          break;
        case 6:
          recursivelyTraverseMutationEffects(root3, finishedWork);
          commitReconciliationEffects(finishedWork);
          if (flags & 4) {
            if (null === finishedWork.stateNode)
              throw Error(formatProdErrorMessage(162));
            flags = finishedWork.memoizedProps;
            current = finishedWork.stateNode;
            try {
              current.nodeValue = flags;
            } catch (error) {
              captureCommitPhaseError(finishedWork, finishedWork.return, error);
            }
          }
          break;
        case 3:
          tagCaches = null;
          hoistableRoot = currentHoistableRoot;
          currentHoistableRoot = getHoistableRoot(root3.containerInfo);
          recursivelyTraverseMutationEffects(root3, finishedWork);
          currentHoistableRoot = hoistableRoot;
          commitReconciliationEffects(finishedWork);
          if (flags & 4 && null !== current && current.memoizedState.isDehydrated)
            try {
              retryIfBlockedOn(root3.containerInfo);
            } catch (error) {
              captureCommitPhaseError(finishedWork, finishedWork.return, error);
            }
          needsFormReset && (needsFormReset = false, recursivelyResetForms(finishedWork));
          break;
        case 4:
          flags = currentHoistableRoot;
          currentHoistableRoot = getHoistableRoot(
            finishedWork.stateNode.containerInfo
          );
          recursivelyTraverseMutationEffects(root3, finishedWork);
          commitReconciliationEffects(finishedWork);
          currentHoistableRoot = flags;
          break;
        case 12:
          recursivelyTraverseMutationEffects(root3, finishedWork);
          commitReconciliationEffects(finishedWork);
          break;
        case 31:
          recursivelyTraverseMutationEffects(root3, finishedWork);
          commitReconciliationEffects(finishedWork);
          flags & 4 && (flags = finishedWork.updateQueue, null !== flags && (finishedWork.updateQueue = null, attachSuspenseRetryListeners(finishedWork, flags)));
          break;
        case 13:
          recursivelyTraverseMutationEffects(root3, finishedWork);
          commitReconciliationEffects(finishedWork);
          finishedWork.child.flags & 8192 && null !== finishedWork.memoizedState !== (null !== current && null !== current.memoizedState) && (globalMostRecentFallbackTime = now());
          flags & 4 && (flags = finishedWork.updateQueue, null !== flags && (finishedWork.updateQueue = null, attachSuspenseRetryListeners(finishedWork, flags)));
          break;
        case 22:
          hoistableRoot = null !== finishedWork.memoizedState;
          var wasHidden = null !== current && null !== current.memoizedState, prevOffscreenSubtreeIsHidden = offscreenSubtreeIsHidden, prevOffscreenSubtreeWasHidden = offscreenSubtreeWasHidden;
          offscreenSubtreeIsHidden = prevOffscreenSubtreeIsHidden || hoistableRoot;
          offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden || wasHidden;
          recursivelyTraverseMutationEffects(root3, finishedWork);
          offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden;
          offscreenSubtreeIsHidden = prevOffscreenSubtreeIsHidden;
          commitReconciliationEffects(finishedWork);
          if (flags & 8192)
            a: for (root3 = finishedWork.stateNode, root3._visibility = hoistableRoot ? root3._visibility & -2 : root3._visibility | 1, hoistableRoot && (null === current || wasHidden || offscreenSubtreeIsHidden || offscreenSubtreeWasHidden || recursivelyTraverseDisappearLayoutEffects(finishedWork)), current = null, root3 = finishedWork; ; ) {
              if (5 === root3.tag || 26 === root3.tag) {
                if (null === current) {
                  wasHidden = current = root3;
                  try {
                    if (currentResource = wasHidden.stateNode, hoistableRoot)
                      maybeNodes = currentResource.style, "function" === typeof maybeNodes.setProperty ? maybeNodes.setProperty("display", "none", "important") : maybeNodes.display = "none";
                    else {
                      i = wasHidden.stateNode;
                      var styleProp = wasHidden.memoizedProps.style, display = void 0 !== styleProp && null !== styleProp && styleProp.hasOwnProperty("display") ? styleProp.display : null;
                      i.style.display = null == display || "boolean" === typeof display ? "" : ("" + display).trim();
                    }
                  } catch (error) {
                    captureCommitPhaseError(wasHidden, wasHidden.return, error);
                  }
                }
              } else if (6 === root3.tag) {
                if (null === current) {
                  wasHidden = root3;
                  try {
                    wasHidden.stateNode.nodeValue = hoistableRoot ? "" : wasHidden.memoizedProps;
                  } catch (error) {
                    captureCommitPhaseError(wasHidden, wasHidden.return, error);
                  }
                }
              } else if (18 === root3.tag) {
                if (null === current) {
                  wasHidden = root3;
                  try {
                    var instance = wasHidden.stateNode;
                    hoistableRoot ? hideOrUnhideDehydratedBoundary(instance, true) : hideOrUnhideDehydratedBoundary(wasHidden.stateNode, false);
                  } catch (error) {
                    captureCommitPhaseError(wasHidden, wasHidden.return, error);
                  }
                }
              } else if ((22 !== root3.tag && 23 !== root3.tag || null === root3.memoizedState || root3 === finishedWork) && null !== root3.child) {
                root3.child.return = root3;
                root3 = root3.child;
                continue;
              }
              if (root3 === finishedWork) break a;
              for (; null === root3.sibling; ) {
                if (null === root3.return || root3.return === finishedWork) break a;
                current === root3 && (current = null);
                root3 = root3.return;
              }
              current === root3 && (current = null);
              root3.sibling.return = root3.return;
              root3 = root3.sibling;
            }
          flags & 4 && (flags = finishedWork.updateQueue, null !== flags && (current = flags.retryQueue, null !== current && (flags.retryQueue = null, attachSuspenseRetryListeners(finishedWork, current))));
          break;
        case 19:
          recursivelyTraverseMutationEffects(root3, finishedWork);
          commitReconciliationEffects(finishedWork);
          flags & 4 && (flags = finishedWork.updateQueue, null !== flags && (finishedWork.updateQueue = null, attachSuspenseRetryListeners(finishedWork, flags)));
          break;
        case 30:
          break;
        case 21:
          break;
        default:
          recursivelyTraverseMutationEffects(root3, finishedWork), commitReconciliationEffects(finishedWork);
      }
    }
    function commitReconciliationEffects(finishedWork) {
      var flags = finishedWork.flags;
      if (flags & 2) {
        try {
          for (var hostParentFiber, parentFiber = finishedWork.return; null !== parentFiber; ) {
            if (isHostParent(parentFiber)) {
              hostParentFiber = parentFiber;
              break;
            }
            parentFiber = parentFiber.return;
          }
          if (null == hostParentFiber) throw Error(formatProdErrorMessage(160));
          switch (hostParentFiber.tag) {
            case 27:
              var parent = hostParentFiber.stateNode, before = getHostSibling(finishedWork);
              insertOrAppendPlacementNode(finishedWork, before, parent);
              break;
            case 5:
              var parent$141 = hostParentFiber.stateNode;
              hostParentFiber.flags & 32 && (setTextContent(parent$141, ""), hostParentFiber.flags &= -33);
              var before$142 = getHostSibling(finishedWork);
              insertOrAppendPlacementNode(finishedWork, before$142, parent$141);
              break;
            case 3:
            case 4:
              var parent$143 = hostParentFiber.stateNode.containerInfo, before$144 = getHostSibling(finishedWork);
              insertOrAppendPlacementNodeIntoContainer(
                finishedWork,
                before$144,
                parent$143
              );
              break;
            default:
              throw Error(formatProdErrorMessage(161));
          }
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
        finishedWork.flags &= -3;
      }
      flags & 4096 && (finishedWork.flags &= -4097);
    }
    function recursivelyResetForms(parentFiber) {
      if (parentFiber.subtreeFlags & 1024)
        for (parentFiber = parentFiber.child; null !== parentFiber; ) {
          var fiber = parentFiber;
          recursivelyResetForms(fiber);
          5 === fiber.tag && fiber.flags & 1024 && fiber.stateNode.reset();
          parentFiber = parentFiber.sibling;
        }
    }
    function recursivelyTraverseLayoutEffects(root3, parentFiber) {
      if (parentFiber.subtreeFlags & 8772)
        for (parentFiber = parentFiber.child; null !== parentFiber; )
          commitLayoutEffectOnFiber(root3, parentFiber.alternate, parentFiber), parentFiber = parentFiber.sibling;
    }
    function recursivelyTraverseDisappearLayoutEffects(parentFiber) {
      for (parentFiber = parentFiber.child; null !== parentFiber; ) {
        var finishedWork = parentFiber;
        switch (finishedWork.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            commitHookEffectListUnmount(4, finishedWork, finishedWork.return);
            recursivelyTraverseDisappearLayoutEffects(finishedWork);
            break;
          case 1:
            safelyDetachRef(finishedWork, finishedWork.return);
            var instance = finishedWork.stateNode;
            "function" === typeof instance.componentWillUnmount && safelyCallComponentWillUnmount(
              finishedWork,
              finishedWork.return,
              instance
            );
            recursivelyTraverseDisappearLayoutEffects(finishedWork);
            break;
          case 27:
            releaseSingletonInstance(finishedWork.stateNode);
          case 26:
          case 5:
            safelyDetachRef(finishedWork, finishedWork.return);
            recursivelyTraverseDisappearLayoutEffects(finishedWork);
            break;
          case 22:
            null === finishedWork.memoizedState && recursivelyTraverseDisappearLayoutEffects(finishedWork);
            break;
          case 30:
            recursivelyTraverseDisappearLayoutEffects(finishedWork);
            break;
          default:
            recursivelyTraverseDisappearLayoutEffects(finishedWork);
        }
        parentFiber = parentFiber.sibling;
      }
    }
    function recursivelyTraverseReappearLayoutEffects(finishedRoot$jscomp$0, parentFiber, includeWorkInProgressEffects) {
      includeWorkInProgressEffects = includeWorkInProgressEffects && 0 !== (parentFiber.subtreeFlags & 8772);
      for (parentFiber = parentFiber.child; null !== parentFiber; ) {
        var current = parentFiber.alternate, finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, flags = finishedWork.flags;
        switch (finishedWork.tag) {
          case 0:
          case 11:
          case 15:
            recursivelyTraverseReappearLayoutEffects(
              finishedRoot,
              finishedWork,
              includeWorkInProgressEffects
            );
            commitHookEffectListMount(4, finishedWork);
            break;
          case 1:
            recursivelyTraverseReappearLayoutEffects(
              finishedRoot,
              finishedWork,
              includeWorkInProgressEffects
            );
            current = finishedWork;
            finishedRoot = current.stateNode;
            if ("function" === typeof finishedRoot.componentDidMount)
              try {
                finishedRoot.componentDidMount();
              } catch (error) {
                captureCommitPhaseError(current, current.return, error);
              }
            current = finishedWork;
            finishedRoot = current.updateQueue;
            if (null !== finishedRoot) {
              var instance = current.stateNode;
              try {
                var hiddenCallbacks = finishedRoot.shared.hiddenCallbacks;
                if (null !== hiddenCallbacks)
                  for (finishedRoot.shared.hiddenCallbacks = null, finishedRoot = 0; finishedRoot < hiddenCallbacks.length; finishedRoot++)
                    callCallback(hiddenCallbacks[finishedRoot], instance);
              } catch (error) {
                captureCommitPhaseError(current, current.return, error);
              }
            }
            includeWorkInProgressEffects && flags & 64 && commitClassCallbacks(finishedWork);
            safelyAttachRef(finishedWork, finishedWork.return);
            break;
          case 27:
            commitHostSingletonAcquisition(finishedWork);
          case 26:
          case 5:
            recursivelyTraverseReappearLayoutEffects(
              finishedRoot,
              finishedWork,
              includeWorkInProgressEffects
            );
            includeWorkInProgressEffects && null === current && flags & 4 && commitHostMount(finishedWork);
            safelyAttachRef(finishedWork, finishedWork.return);
            break;
          case 12:
            recursivelyTraverseReappearLayoutEffects(
              finishedRoot,
              finishedWork,
              includeWorkInProgressEffects
            );
            break;
          case 31:
            recursivelyTraverseReappearLayoutEffects(
              finishedRoot,
              finishedWork,
              includeWorkInProgressEffects
            );
            includeWorkInProgressEffects && flags & 4 && commitActivityHydrationCallbacks(finishedRoot, finishedWork);
            break;
          case 13:
            recursivelyTraverseReappearLayoutEffects(
              finishedRoot,
              finishedWork,
              includeWorkInProgressEffects
            );
            includeWorkInProgressEffects && flags & 4 && commitSuspenseHydrationCallbacks(finishedRoot, finishedWork);
            break;
          case 22:
            null === finishedWork.memoizedState && recursivelyTraverseReappearLayoutEffects(
              finishedRoot,
              finishedWork,
              includeWorkInProgressEffects
            );
            safelyAttachRef(finishedWork, finishedWork.return);
            break;
          case 30:
            break;
          default:
            recursivelyTraverseReappearLayoutEffects(
              finishedRoot,
              finishedWork,
              includeWorkInProgressEffects
            );
        }
        parentFiber = parentFiber.sibling;
      }
    }
    function commitOffscreenPassiveMountEffects(current, finishedWork) {
      var previousCache = null;
      null !== current && null !== current.memoizedState && null !== current.memoizedState.cachePool && (previousCache = current.memoizedState.cachePool.pool);
      current = null;
      null !== finishedWork.memoizedState && null !== finishedWork.memoizedState.cachePool && (current = finishedWork.memoizedState.cachePool.pool);
      current !== previousCache && (null != current && current.refCount++, null != previousCache && releaseCache(previousCache));
    }
    function commitCachePassiveMountEffect(current, finishedWork) {
      current = null;
      null !== finishedWork.alternate && (current = finishedWork.alternate.memoizedState.cache);
      finishedWork = finishedWork.memoizedState.cache;
      finishedWork !== current && (finishedWork.refCount++, null != current && releaseCache(current));
    }
    function recursivelyTraversePassiveMountEffects(root3, parentFiber, committedLanes, committedTransitions) {
      if (parentFiber.subtreeFlags & 10256)
        for (parentFiber = parentFiber.child; null !== parentFiber; )
          commitPassiveMountOnFiber(
            root3,
            parentFiber,
            committedLanes,
            committedTransitions
          ), parentFiber = parentFiber.sibling;
    }
    function commitPassiveMountOnFiber(finishedRoot, finishedWork, committedLanes, committedTransitions) {
      var flags = finishedWork.flags;
      switch (finishedWork.tag) {
        case 0:
        case 11:
        case 15:
          recursivelyTraversePassiveMountEffects(
            finishedRoot,
            finishedWork,
            committedLanes,
            committedTransitions
          );
          flags & 2048 && commitHookEffectListMount(9, finishedWork);
          break;
        case 1:
          recursivelyTraversePassiveMountEffects(
            finishedRoot,
            finishedWork,
            committedLanes,
            committedTransitions
          );
          break;
        case 3:
          recursivelyTraversePassiveMountEffects(
            finishedRoot,
            finishedWork,
            committedLanes,
            committedTransitions
          );
          flags & 2048 && (finishedRoot = null, null !== finishedWork.alternate && (finishedRoot = finishedWork.alternate.memoizedState.cache), finishedWork = finishedWork.memoizedState.cache, finishedWork !== finishedRoot && (finishedWork.refCount++, null != finishedRoot && releaseCache(finishedRoot)));
          break;
        case 12:
          if (flags & 2048) {
            recursivelyTraversePassiveMountEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions
            );
            finishedRoot = finishedWork.stateNode;
            try {
              var _finishedWork$memoize2 = finishedWork.memoizedProps, id = _finishedWork$memoize2.id, onPostCommit = _finishedWork$memoize2.onPostCommit;
              "function" === typeof onPostCommit && onPostCommit(
                id,
                null === finishedWork.alternate ? "mount" : "update",
                finishedRoot.passiveEffectDuration,
                -0
              );
            } catch (error) {
              captureCommitPhaseError(finishedWork, finishedWork.return, error);
            }
          } else
            recursivelyTraversePassiveMountEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions
            );
          break;
        case 31:
          recursivelyTraversePassiveMountEffects(
            finishedRoot,
            finishedWork,
            committedLanes,
            committedTransitions
          );
          break;
        case 13:
          recursivelyTraversePassiveMountEffects(
            finishedRoot,
            finishedWork,
            committedLanes,
            committedTransitions
          );
          break;
        case 23:
          break;
        case 22:
          _finishedWork$memoize2 = finishedWork.stateNode;
          id = finishedWork.alternate;
          null !== finishedWork.memoizedState ? _finishedWork$memoize2._visibility & 2 ? recursivelyTraversePassiveMountEffects(
            finishedRoot,
            finishedWork,
            committedLanes,
            committedTransitions
          ) : recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork) : _finishedWork$memoize2._visibility & 2 ? recursivelyTraversePassiveMountEffects(
            finishedRoot,
            finishedWork,
            committedLanes,
            committedTransitions
          ) : (_finishedWork$memoize2._visibility |= 2, recursivelyTraverseReconnectPassiveEffects(
            finishedRoot,
            finishedWork,
            committedLanes,
            committedTransitions,
            0 !== (finishedWork.subtreeFlags & 10256) || false
          ));
          flags & 2048 && commitOffscreenPassiveMountEffects(id, finishedWork);
          break;
        case 24:
          recursivelyTraversePassiveMountEffects(
            finishedRoot,
            finishedWork,
            committedLanes,
            committedTransitions
          );
          flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
          break;
        default:
          recursivelyTraversePassiveMountEffects(
            finishedRoot,
            finishedWork,
            committedLanes,
            committedTransitions
          );
      }
    }
    function recursivelyTraverseReconnectPassiveEffects(finishedRoot$jscomp$0, parentFiber, committedLanes$jscomp$0, committedTransitions$jscomp$0, includeWorkInProgressEffects) {
      includeWorkInProgressEffects = includeWorkInProgressEffects && (0 !== (parentFiber.subtreeFlags & 10256) || false);
      for (parentFiber = parentFiber.child; null !== parentFiber; ) {
        var finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, committedLanes = committedLanes$jscomp$0, committedTransitions = committedTransitions$jscomp$0, flags = finishedWork.flags;
        switch (finishedWork.tag) {
          case 0:
          case 11:
          case 15:
            recursivelyTraverseReconnectPassiveEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions,
              includeWorkInProgressEffects
            );
            commitHookEffectListMount(8, finishedWork);
            break;
          case 23:
            break;
          case 22:
            var instance = finishedWork.stateNode;
            null !== finishedWork.memoizedState ? instance._visibility & 2 ? recursivelyTraverseReconnectPassiveEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions,
              includeWorkInProgressEffects
            ) : recursivelyTraverseAtomicPassiveEffects(
              finishedRoot,
              finishedWork
            ) : (instance._visibility |= 2, recursivelyTraverseReconnectPassiveEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions,
              includeWorkInProgressEffects
            ));
            includeWorkInProgressEffects && flags & 2048 && commitOffscreenPassiveMountEffects(
              finishedWork.alternate,
              finishedWork
            );
            break;
          case 24:
            recursivelyTraverseReconnectPassiveEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions,
              includeWorkInProgressEffects
            );
            includeWorkInProgressEffects && flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
            break;
          default:
            recursivelyTraverseReconnectPassiveEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions,
              includeWorkInProgressEffects
            );
        }
        parentFiber = parentFiber.sibling;
      }
    }
    function recursivelyTraverseAtomicPassiveEffects(finishedRoot$jscomp$0, parentFiber) {
      if (parentFiber.subtreeFlags & 10256)
        for (parentFiber = parentFiber.child; null !== parentFiber; ) {
          var finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, flags = finishedWork.flags;
          switch (finishedWork.tag) {
            case 22:
              recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
              flags & 2048 && commitOffscreenPassiveMountEffects(
                finishedWork.alternate,
                finishedWork
              );
              break;
            case 24:
              recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
              flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
              break;
            default:
              recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
          }
          parentFiber = parentFiber.sibling;
        }
    }
    var suspenseyCommitFlag = 8192;
    function recursivelyAccumulateSuspenseyCommit(parentFiber, committedLanes, suspendedState) {
      if (parentFiber.subtreeFlags & suspenseyCommitFlag)
        for (parentFiber = parentFiber.child; null !== parentFiber; )
          accumulateSuspenseyCommitOnFiber(
            parentFiber,
            committedLanes,
            suspendedState
          ), parentFiber = parentFiber.sibling;
    }
    function accumulateSuspenseyCommitOnFiber(fiber, committedLanes, suspendedState) {
      switch (fiber.tag) {
        case 26:
          recursivelyAccumulateSuspenseyCommit(
            fiber,
            committedLanes,
            suspendedState
          );
          fiber.flags & suspenseyCommitFlag && null !== fiber.memoizedState && suspendResource(
            suspendedState,
            currentHoistableRoot,
            fiber.memoizedState,
            fiber.memoizedProps
          );
          break;
        case 5:
          recursivelyAccumulateSuspenseyCommit(
            fiber,
            committedLanes,
            suspendedState
          );
          break;
        case 3:
        case 4:
          var previousHoistableRoot = currentHoistableRoot;
          currentHoistableRoot = getHoistableRoot(fiber.stateNode.containerInfo);
          recursivelyAccumulateSuspenseyCommit(
            fiber,
            committedLanes,
            suspendedState
          );
          currentHoistableRoot = previousHoistableRoot;
          break;
        case 22:
          null === fiber.memoizedState && (previousHoistableRoot = fiber.alternate, null !== previousHoistableRoot && null !== previousHoistableRoot.memoizedState ? (previousHoistableRoot = suspenseyCommitFlag, suspenseyCommitFlag = 16777216, recursivelyAccumulateSuspenseyCommit(
            fiber,
            committedLanes,
            suspendedState
          ), suspenseyCommitFlag = previousHoistableRoot) : recursivelyAccumulateSuspenseyCommit(
            fiber,
            committedLanes,
            suspendedState
          ));
          break;
        default:
          recursivelyAccumulateSuspenseyCommit(
            fiber,
            committedLanes,
            suspendedState
          );
      }
    }
    function detachAlternateSiblings(parentFiber) {
      var previousFiber = parentFiber.alternate;
      if (null !== previousFiber && (parentFiber = previousFiber.child, null !== parentFiber)) {
        previousFiber.child = null;
        do
          previousFiber = parentFiber.sibling, parentFiber.sibling = null, parentFiber = previousFiber;
        while (null !== parentFiber);
      }
    }
    function recursivelyTraversePassiveUnmountEffects(parentFiber) {
      var deletions = parentFiber.deletions;
      if (0 !== (parentFiber.flags & 16)) {
        if (null !== deletions)
          for (var i = 0; i < deletions.length; i++) {
            var childToDelete = deletions[i];
            nextEffect = childToDelete;
            commitPassiveUnmountEffectsInsideOfDeletedTree_begin(
              childToDelete,
              parentFiber
            );
          }
        detachAlternateSiblings(parentFiber);
      }
      if (parentFiber.subtreeFlags & 10256)
        for (parentFiber = parentFiber.child; null !== parentFiber; )
          commitPassiveUnmountOnFiber(parentFiber), parentFiber = parentFiber.sibling;
    }
    function commitPassiveUnmountOnFiber(finishedWork) {
      switch (finishedWork.tag) {
        case 0:
        case 11:
        case 15:
          recursivelyTraversePassiveUnmountEffects(finishedWork);
          finishedWork.flags & 2048 && commitHookEffectListUnmount(9, finishedWork, finishedWork.return);
          break;
        case 3:
          recursivelyTraversePassiveUnmountEffects(finishedWork);
          break;
        case 12:
          recursivelyTraversePassiveUnmountEffects(finishedWork);
          break;
        case 22:
          var instance = finishedWork.stateNode;
          null !== finishedWork.memoizedState && instance._visibility & 2 && (null === finishedWork.return || 13 !== finishedWork.return.tag) ? (instance._visibility &= -3, recursivelyTraverseDisconnectPassiveEffects(finishedWork)) : recursivelyTraversePassiveUnmountEffects(finishedWork);
          break;
        default:
          recursivelyTraversePassiveUnmountEffects(finishedWork);
      }
    }
    function recursivelyTraverseDisconnectPassiveEffects(parentFiber) {
      var deletions = parentFiber.deletions;
      if (0 !== (parentFiber.flags & 16)) {
        if (null !== deletions)
          for (var i = 0; i < deletions.length; i++) {
            var childToDelete = deletions[i];
            nextEffect = childToDelete;
            commitPassiveUnmountEffectsInsideOfDeletedTree_begin(
              childToDelete,
              parentFiber
            );
          }
        detachAlternateSiblings(parentFiber);
      }
      for (parentFiber = parentFiber.child; null !== parentFiber; ) {
        deletions = parentFiber;
        switch (deletions.tag) {
          case 0:
          case 11:
          case 15:
            commitHookEffectListUnmount(8, deletions, deletions.return);
            recursivelyTraverseDisconnectPassiveEffects(deletions);
            break;
          case 22:
            i = deletions.stateNode;
            i._visibility & 2 && (i._visibility &= -3, recursivelyTraverseDisconnectPassiveEffects(deletions));
            break;
          default:
            recursivelyTraverseDisconnectPassiveEffects(deletions);
        }
        parentFiber = parentFiber.sibling;
      }
    }
    function commitPassiveUnmountEffectsInsideOfDeletedTree_begin(deletedSubtreeRoot, nearestMountedAncestor) {
      for (; null !== nextEffect; ) {
        var fiber = nextEffect;
        switch (fiber.tag) {
          case 0:
          case 11:
          case 15:
            commitHookEffectListUnmount(8, fiber, nearestMountedAncestor);
            break;
          case 23:
          case 22:
            if (null !== fiber.memoizedState && null !== fiber.memoizedState.cachePool) {
              var cache = fiber.memoizedState.cachePool.pool;
              null != cache && cache.refCount++;
            }
            break;
          case 24:
            releaseCache(fiber.memoizedState.cache);
        }
        cache = fiber.child;
        if (null !== cache) cache.return = fiber, nextEffect = cache;
        else
          a: for (fiber = deletedSubtreeRoot; null !== nextEffect; ) {
            cache = nextEffect;
            var sibling = cache.sibling, returnFiber = cache.return;
            detachFiberAfterEffects(cache);
            if (cache === fiber) {
              nextEffect = null;
              break a;
            }
            if (null !== sibling) {
              sibling.return = returnFiber;
              nextEffect = sibling;
              break a;
            }
            nextEffect = returnFiber;
          }
      }
    }
    var DefaultAsyncDispatcher = {
      getCacheForType: function(resourceType) {
        var cache = readContext(CacheContext), cacheForType = cache.data.get(resourceType);
        void 0 === cacheForType && (cacheForType = resourceType(), cache.data.set(resourceType, cacheForType));
        return cacheForType;
      },
      cacheSignal: function() {
        return readContext(CacheContext).controller.signal;
      }
    }, PossiblyWeakMap = "function" === typeof WeakMap ? WeakMap : Map, executionContext = 0, workInProgressRoot = null, workInProgress = null, workInProgressRootRenderLanes = 0, workInProgressSuspendedReason = 0, workInProgressThrownValue = null, workInProgressRootDidSkipSuspendedSiblings = false, workInProgressRootIsPrerendering = false, workInProgressRootDidAttachPingListener = false, entangledRenderLanes = 0, workInProgressRootExitStatus = 0, workInProgressRootSkippedLanes = 0, workInProgressRootInterleavedUpdatedLanes = 0, workInProgressRootPingedLanes = 0, workInProgressDeferredLane = 0, workInProgressSuspendedRetryLanes = 0, workInProgressRootConcurrentErrors = null, workInProgressRootRecoverableErrors = null, workInProgressRootDidIncludeRecursiveRenderUpdate = false, globalMostRecentFallbackTime = 0, globalMostRecentTransitionTime = 0, workInProgressRootRenderTargetTime = Infinity, workInProgressTransitions = null, legacyErrorBoundariesThatAlreadyFailed = null, pendingEffectsStatus = 0, pendingEffectsRoot = null, pendingFinishedWork = null, pendingEffectsLanes = 0, pendingEffectsRemainingLanes = 0, pendingPassiveTransitions = null, pendingRecoverableErrors = null, nestedUpdateCount = 0, rootWithNestedUpdates = null;
    function requestUpdateLane() {
      return 0 !== (executionContext & 2) && 0 !== workInProgressRootRenderLanes ? workInProgressRootRenderLanes & -workInProgressRootRenderLanes : null !== ReactSharedInternals.T ? requestTransitionLane() : resolveUpdatePriority();
    }
    function requestDeferredLane() {
      if (0 === workInProgressDeferredLane)
        if (0 === (workInProgressRootRenderLanes & 536870912) || isHydrating) {
          var lane = nextTransitionDeferredLane;
          nextTransitionDeferredLane <<= 1;
          0 === (nextTransitionDeferredLane & 3932160) && (nextTransitionDeferredLane = 262144);
          workInProgressDeferredLane = lane;
        } else workInProgressDeferredLane = 536870912;
      lane = suspenseHandlerStackCursor.current;
      null !== lane && (lane.flags |= 32);
      return workInProgressDeferredLane;
    }
    function scheduleUpdateOnFiber(root3, fiber, lane) {
      if (root3 === workInProgressRoot && (2 === workInProgressSuspendedReason || 9 === workInProgressSuspendedReason) || null !== root3.cancelPendingCommit)
        prepareFreshStack(root3, 0), markRootSuspended(
          root3,
          workInProgressRootRenderLanes,
          workInProgressDeferredLane,
          false
        );
      markRootUpdated$1(root3, lane);
      if (0 === (executionContext & 2) || root3 !== workInProgressRoot)
        root3 === workInProgressRoot && (0 === (executionContext & 2) && (workInProgressRootInterleavedUpdatedLanes |= lane), 4 === workInProgressRootExitStatus && markRootSuspended(
          root3,
          workInProgressRootRenderLanes,
          workInProgressDeferredLane,
          false
        )), ensureRootIsScheduled(root3);
    }
    function performWorkOnRoot(root$jscomp$0, lanes, forceSync) {
      if (0 !== (executionContext & 6)) throw Error(formatProdErrorMessage(327));
      var shouldTimeSlice = !forceSync && 0 === (lanes & 127) && 0 === (lanes & root$jscomp$0.expiredLanes) || checkIfRootIsPrerendering(root$jscomp$0, lanes), exitStatus = shouldTimeSlice ? renderRootConcurrent(root$jscomp$0, lanes) : renderRootSync(root$jscomp$0, lanes, true), renderWasConcurrent = shouldTimeSlice;
      do {
        if (0 === exitStatus) {
          workInProgressRootIsPrerendering && !shouldTimeSlice && markRootSuspended(root$jscomp$0, lanes, 0, false);
          break;
        } else {
          forceSync = root$jscomp$0.current.alternate;
          if (renderWasConcurrent && !isRenderConsistentWithExternalStores(forceSync)) {
            exitStatus = renderRootSync(root$jscomp$0, lanes, false);
            renderWasConcurrent = false;
            continue;
          }
          if (2 === exitStatus) {
            renderWasConcurrent = lanes;
            if (root$jscomp$0.errorRecoveryDisabledLanes & renderWasConcurrent)
              var JSCompiler_inline_result = 0;
            else
              JSCompiler_inline_result = root$jscomp$0.pendingLanes & -536870913, JSCompiler_inline_result = 0 !== JSCompiler_inline_result ? JSCompiler_inline_result : JSCompiler_inline_result & 536870912 ? 536870912 : 0;
            if (0 !== JSCompiler_inline_result) {
              lanes = JSCompiler_inline_result;
              a: {
                var root3 = root$jscomp$0;
                exitStatus = workInProgressRootConcurrentErrors;
                var wasRootDehydrated = root3.current.memoizedState.isDehydrated;
                wasRootDehydrated && (prepareFreshStack(root3, JSCompiler_inline_result).flags |= 256);
                JSCompiler_inline_result = renderRootSync(
                  root3,
                  JSCompiler_inline_result,
                  false
                );
                if (2 !== JSCompiler_inline_result) {
                  if (workInProgressRootDidAttachPingListener && !wasRootDehydrated) {
                    root3.errorRecoveryDisabledLanes |= renderWasConcurrent;
                    workInProgressRootInterleavedUpdatedLanes |= renderWasConcurrent;
                    exitStatus = 4;
                    break a;
                  }
                  renderWasConcurrent = workInProgressRootRecoverableErrors;
                  workInProgressRootRecoverableErrors = exitStatus;
                  null !== renderWasConcurrent && (null === workInProgressRootRecoverableErrors ? workInProgressRootRecoverableErrors = renderWasConcurrent : workInProgressRootRecoverableErrors.push.apply(
                    workInProgressRootRecoverableErrors,
                    renderWasConcurrent
                  ));
                }
                exitStatus = JSCompiler_inline_result;
              }
              renderWasConcurrent = false;
              if (2 !== exitStatus) continue;
            }
          }
          if (1 === exitStatus) {
            prepareFreshStack(root$jscomp$0, 0);
            markRootSuspended(root$jscomp$0, lanes, 0, true);
            break;
          }
          a: {
            shouldTimeSlice = root$jscomp$0;
            renderWasConcurrent = exitStatus;
            switch (renderWasConcurrent) {
              case 0:
              case 1:
                throw Error(formatProdErrorMessage(345));
              case 4:
                if ((lanes & 4194048) !== lanes) break;
              case 6:
                markRootSuspended(
                  shouldTimeSlice,
                  lanes,
                  workInProgressDeferredLane,
                  !workInProgressRootDidSkipSuspendedSiblings
                );
                break a;
              case 2:
                workInProgressRootRecoverableErrors = null;
                break;
              case 3:
              case 5:
                break;
              default:
                throw Error(formatProdErrorMessage(329));
            }
            if ((lanes & 62914560) === lanes && (exitStatus = globalMostRecentFallbackTime + 300 - now(), 10 < exitStatus)) {
              markRootSuspended(
                shouldTimeSlice,
                lanes,
                workInProgressDeferredLane,
                !workInProgressRootDidSkipSuspendedSiblings
              );
              if (0 !== getNextLanes(shouldTimeSlice, 0, true)) break a;
              pendingEffectsLanes = lanes;
              shouldTimeSlice.timeoutHandle = scheduleTimeout(
                commitRootWhenReady.bind(
                  null,
                  shouldTimeSlice,
                  forceSync,
                  workInProgressRootRecoverableErrors,
                  workInProgressTransitions,
                  workInProgressRootDidIncludeRecursiveRenderUpdate,
                  lanes,
                  workInProgressDeferredLane,
                  workInProgressRootInterleavedUpdatedLanes,
                  workInProgressSuspendedRetryLanes,
                  workInProgressRootDidSkipSuspendedSiblings,
                  renderWasConcurrent,
                  "Throttled",
                  -0,
                  0
                ),
                exitStatus
              );
              break a;
            }
            commitRootWhenReady(
              shouldTimeSlice,
              forceSync,
              workInProgressRootRecoverableErrors,
              workInProgressTransitions,
              workInProgressRootDidIncludeRecursiveRenderUpdate,
              lanes,
              workInProgressDeferredLane,
              workInProgressRootInterleavedUpdatedLanes,
              workInProgressSuspendedRetryLanes,
              workInProgressRootDidSkipSuspendedSiblings,
              renderWasConcurrent,
              null,
              -0,
              0
            );
          }
        }
        break;
      } while (1);
      ensureRootIsScheduled(root$jscomp$0);
    }
    function commitRootWhenReady(root3, finishedWork, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, lanes, spawnedLane, updatedLanes, suspendedRetryLanes, didSkipSuspendedSiblings, exitStatus, suspendedCommitReason, completedRenderStartTime, completedRenderEndTime) {
      root3.timeoutHandle = -1;
      suspendedCommitReason = finishedWork.subtreeFlags;
      if (suspendedCommitReason & 8192 || 16785408 === (suspendedCommitReason & 16785408)) {
        suspendedCommitReason = {
          stylesheets: null,
          count: 0,
          imgCount: 0,
          imgBytes: 0,
          suspenseyImages: [],
          waitingForImages: true,
          waitingForViewTransition: false,
          unsuspend: noop$1
        };
        accumulateSuspenseyCommitOnFiber(
          finishedWork,
          lanes,
          suspendedCommitReason
        );
        var timeoutOffset = (lanes & 62914560) === lanes ? globalMostRecentFallbackTime - now() : (lanes & 4194048) === lanes ? globalMostRecentTransitionTime - now() : 0;
        timeoutOffset = waitForCommitToBeReady(
          suspendedCommitReason,
          timeoutOffset
        );
        if (null !== timeoutOffset) {
          pendingEffectsLanes = lanes;
          root3.cancelPendingCommit = timeoutOffset(
            commitRoot.bind(
              null,
              root3,
              finishedWork,
              lanes,
              recoverableErrors,
              transitions,
              didIncludeRenderPhaseUpdate,
              spawnedLane,
              updatedLanes,
              suspendedRetryLanes,
              exitStatus,
              suspendedCommitReason,
              null,
              completedRenderStartTime,
              completedRenderEndTime
            )
          );
          markRootSuspended(root3, lanes, spawnedLane, !didSkipSuspendedSiblings);
          return;
        }
      }
      commitRoot(
        root3,
        finishedWork,
        lanes,
        recoverableErrors,
        transitions,
        didIncludeRenderPhaseUpdate,
        spawnedLane,
        updatedLanes,
        suspendedRetryLanes
      );
    }
    function isRenderConsistentWithExternalStores(finishedWork) {
      for (var node = finishedWork; ; ) {
        var tag = node.tag;
        if ((0 === tag || 11 === tag || 15 === tag) && node.flags & 16384 && (tag = node.updateQueue, null !== tag && (tag = tag.stores, null !== tag)))
          for (var i = 0; i < tag.length; i++) {
            var check = tag[i], getSnapshot = check.getSnapshot;
            check = check.value;
            try {
              if (!objectIs(getSnapshot(), check)) return false;
            } catch (error) {
              return false;
            }
          }
        tag = node.child;
        if (node.subtreeFlags & 16384 && null !== tag)
          tag.return = node, node = tag;
        else {
          if (node === finishedWork) break;
          for (; null === node.sibling; ) {
            if (null === node.return || node.return === finishedWork) return true;
            node = node.return;
          }
          node.sibling.return = node.return;
          node = node.sibling;
        }
      }
      return true;
    }
    function markRootSuspended(root3, suspendedLanes, spawnedLane, didAttemptEntireTree) {
      suspendedLanes &= ~workInProgressRootPingedLanes;
      suspendedLanes &= ~workInProgressRootInterleavedUpdatedLanes;
      root3.suspendedLanes |= suspendedLanes;
      root3.pingedLanes &= ~suspendedLanes;
      didAttemptEntireTree && (root3.warmLanes |= suspendedLanes);
      didAttemptEntireTree = root3.expirationTimes;
      for (var lanes = suspendedLanes; 0 < lanes; ) {
        var index$6 = 31 - clz32(lanes), lane = 1 << index$6;
        didAttemptEntireTree[index$6] = -1;
        lanes &= ~lane;
      }
      0 !== spawnedLane && markSpawnedDeferredLane(root3, spawnedLane, suspendedLanes);
    }
    function flushSyncWork$1() {
      return 0 === (executionContext & 6) ? (flushSyncWorkAcrossRoots_impl(0), false) : true;
    }
    function resetWorkInProgressStack() {
      if (null !== workInProgress) {
        if (0 === workInProgressSuspendedReason)
          var interruptedWork = workInProgress.return;
        else
          interruptedWork = workInProgress, lastContextDependency = currentlyRenderingFiber$1 = null, resetHooksOnUnwind(interruptedWork), thenableState$1 = null, thenableIndexCounter$1 = 0, interruptedWork = workInProgress;
        for (; null !== interruptedWork; )
          unwindInterruptedWork(interruptedWork.alternate, interruptedWork), interruptedWork = interruptedWork.return;
        workInProgress = null;
      }
    }
    function prepareFreshStack(root3, lanes) {
      var timeoutHandle = root3.timeoutHandle;
      -1 !== timeoutHandle && (root3.timeoutHandle = -1, cancelTimeout(timeoutHandle));
      timeoutHandle = root3.cancelPendingCommit;
      null !== timeoutHandle && (root3.cancelPendingCommit = null, timeoutHandle());
      pendingEffectsLanes = 0;
      resetWorkInProgressStack();
      workInProgressRoot = root3;
      workInProgress = timeoutHandle = createWorkInProgress(root3.current, null);
      workInProgressRootRenderLanes = lanes;
      workInProgressSuspendedReason = 0;
      workInProgressThrownValue = null;
      workInProgressRootDidSkipSuspendedSiblings = false;
      workInProgressRootIsPrerendering = checkIfRootIsPrerendering(root3, lanes);
      workInProgressRootDidAttachPingListener = false;
      workInProgressSuspendedRetryLanes = workInProgressDeferredLane = workInProgressRootPingedLanes = workInProgressRootInterleavedUpdatedLanes = workInProgressRootSkippedLanes = workInProgressRootExitStatus = 0;
      workInProgressRootRecoverableErrors = workInProgressRootConcurrentErrors = null;
      workInProgressRootDidIncludeRecursiveRenderUpdate = false;
      0 !== (lanes & 8) && (lanes |= lanes & 32);
      var allEntangledLanes = root3.entangledLanes;
      if (0 !== allEntangledLanes)
        for (root3 = root3.entanglements, allEntangledLanes &= lanes; 0 < allEntangledLanes; ) {
          var index$4 = 31 - clz32(allEntangledLanes), lane = 1 << index$4;
          lanes |= root3[index$4];
          allEntangledLanes &= ~lane;
        }
      entangledRenderLanes = lanes;
      finishQueueingConcurrentUpdates();
      return timeoutHandle;
    }
    function handleThrow(root3, thrownValue) {
      currentlyRenderingFiber = null;
      ReactSharedInternals.H = ContextOnlyDispatcher;
      thrownValue === SuspenseException || thrownValue === SuspenseActionException ? (thrownValue = getSuspendedThenable(), workInProgressSuspendedReason = 3) : thrownValue === SuspenseyCommitException ? (thrownValue = getSuspendedThenable(), workInProgressSuspendedReason = 4) : workInProgressSuspendedReason = thrownValue === SelectiveHydrationException ? 8 : null !== thrownValue && "object" === typeof thrownValue && "function" === typeof thrownValue.then ? 6 : 1;
      workInProgressThrownValue = thrownValue;
      null === workInProgress && (workInProgressRootExitStatus = 1, logUncaughtError(
        root3,
        createCapturedValueAtFiber(thrownValue, root3.current)
      ));
    }
    function shouldRemainOnPreviousScreen() {
      var handler = suspenseHandlerStackCursor.current;
      return null === handler ? true : (workInProgressRootRenderLanes & 4194048) === workInProgressRootRenderLanes ? null === shellBoundary ? true : false : (workInProgressRootRenderLanes & 62914560) === workInProgressRootRenderLanes || 0 !== (workInProgressRootRenderLanes & 536870912) ? handler === shellBoundary : false;
    }
    function pushDispatcher() {
      var prevDispatcher = ReactSharedInternals.H;
      ReactSharedInternals.H = ContextOnlyDispatcher;
      return null === prevDispatcher ? ContextOnlyDispatcher : prevDispatcher;
    }
    function pushAsyncDispatcher() {
      var prevAsyncDispatcher = ReactSharedInternals.A;
      ReactSharedInternals.A = DefaultAsyncDispatcher;
      return prevAsyncDispatcher;
    }
    function renderDidSuspendDelayIfPossible() {
      workInProgressRootExitStatus = 4;
      workInProgressRootDidSkipSuspendedSiblings || (workInProgressRootRenderLanes & 4194048) !== workInProgressRootRenderLanes && null !== suspenseHandlerStackCursor.current || (workInProgressRootIsPrerendering = true);
      0 === (workInProgressRootSkippedLanes & 134217727) && 0 === (workInProgressRootInterleavedUpdatedLanes & 134217727) || null === workInProgressRoot || markRootSuspended(
        workInProgressRoot,
        workInProgressRootRenderLanes,
        workInProgressDeferredLane,
        false
      );
    }
    function renderRootSync(root3, lanes, shouldYieldForPrerendering) {
      var prevExecutionContext = executionContext;
      executionContext |= 2;
      var prevDispatcher = pushDispatcher(), prevAsyncDispatcher = pushAsyncDispatcher();
      if (workInProgressRoot !== root3 || workInProgressRootRenderLanes !== lanes)
        workInProgressTransitions = null, prepareFreshStack(root3, lanes);
      lanes = false;
      var exitStatus = workInProgressRootExitStatus;
      a: do
        try {
          if (0 !== workInProgressSuspendedReason && null !== workInProgress) {
            var unitOfWork = workInProgress, thrownValue = workInProgressThrownValue;
            switch (workInProgressSuspendedReason) {
              case 8:
                resetWorkInProgressStack();
                exitStatus = 6;
                break a;
              case 3:
              case 2:
              case 9:
              case 6:
                null === suspenseHandlerStackCursor.current && (lanes = true);
                var reason = workInProgressSuspendedReason;
                workInProgressSuspendedReason = 0;
                workInProgressThrownValue = null;
                throwAndUnwindWorkLoop(root3, unitOfWork, thrownValue, reason);
                if (shouldYieldForPrerendering && workInProgressRootIsPrerendering) {
                  exitStatus = 0;
                  break a;
                }
                break;
              default:
                reason = workInProgressSuspendedReason, workInProgressSuspendedReason = 0, workInProgressThrownValue = null, throwAndUnwindWorkLoop(root3, unitOfWork, thrownValue, reason);
            }
          }
          workLoopSync();
          exitStatus = workInProgressRootExitStatus;
          break;
        } catch (thrownValue$165) {
          handleThrow(root3, thrownValue$165);
        }
      while (1);
      lanes && root3.shellSuspendCounter++;
      lastContextDependency = currentlyRenderingFiber$1 = null;
      executionContext = prevExecutionContext;
      ReactSharedInternals.H = prevDispatcher;
      ReactSharedInternals.A = prevAsyncDispatcher;
      null === workInProgress && (workInProgressRoot = null, workInProgressRootRenderLanes = 0, finishQueueingConcurrentUpdates());
      return exitStatus;
    }
    function workLoopSync() {
      for (; null !== workInProgress; ) performUnitOfWork(workInProgress);
    }
    function renderRootConcurrent(root3, lanes) {
      var prevExecutionContext = executionContext;
      executionContext |= 2;
      var prevDispatcher = pushDispatcher(), prevAsyncDispatcher = pushAsyncDispatcher();
      workInProgressRoot !== root3 || workInProgressRootRenderLanes !== lanes ? (workInProgressTransitions = null, workInProgressRootRenderTargetTime = now() + 500, prepareFreshStack(root3, lanes)) : workInProgressRootIsPrerendering = checkIfRootIsPrerendering(
        root3,
        lanes
      );
      a: do
        try {
          if (0 !== workInProgressSuspendedReason && null !== workInProgress) {
            lanes = workInProgress;
            var thrownValue = workInProgressThrownValue;
            b: switch (workInProgressSuspendedReason) {
              case 1:
                workInProgressSuspendedReason = 0;
                workInProgressThrownValue = null;
                throwAndUnwindWorkLoop(root3, lanes, thrownValue, 1);
                break;
              case 2:
              case 9:
                if (isThenableResolved(thrownValue)) {
                  workInProgressSuspendedReason = 0;
                  workInProgressThrownValue = null;
                  replaySuspendedUnitOfWork(lanes);
                  break;
                }
                lanes = function() {
                  2 !== workInProgressSuspendedReason && 9 !== workInProgressSuspendedReason || workInProgressRoot !== root3 || (workInProgressSuspendedReason = 7);
                  ensureRootIsScheduled(root3);
                };
                thrownValue.then(lanes, lanes);
                break a;
              case 3:
                workInProgressSuspendedReason = 7;
                break a;
              case 4:
                workInProgressSuspendedReason = 5;
                break a;
              case 7:
                isThenableResolved(thrownValue) ? (workInProgressSuspendedReason = 0, workInProgressThrownValue = null, replaySuspendedUnitOfWork(lanes)) : (workInProgressSuspendedReason = 0, workInProgressThrownValue = null, throwAndUnwindWorkLoop(root3, lanes, thrownValue, 7));
                break;
              case 5:
                var resource = null;
                switch (workInProgress.tag) {
                  case 26:
                    resource = workInProgress.memoizedState;
                  case 5:
                  case 27:
                    var hostFiber = workInProgress;
                    if (resource ? preloadResource(resource) : hostFiber.stateNode.complete) {
                      workInProgressSuspendedReason = 0;
                      workInProgressThrownValue = null;
                      var sibling = hostFiber.sibling;
                      if (null !== sibling) workInProgress = sibling;
                      else {
                        var returnFiber = hostFiber.return;
                        null !== returnFiber ? (workInProgress = returnFiber, completeUnitOfWork(returnFiber)) : workInProgress = null;
                      }
                      break b;
                    }
                }
                workInProgressSuspendedReason = 0;
                workInProgressThrownValue = null;
                throwAndUnwindWorkLoop(root3, lanes, thrownValue, 5);
                break;
              case 6:
                workInProgressSuspendedReason = 0;
                workInProgressThrownValue = null;
                throwAndUnwindWorkLoop(root3, lanes, thrownValue, 6);
                break;
              case 8:
                resetWorkInProgressStack();
                workInProgressRootExitStatus = 6;
                break a;
              default:
                throw Error(formatProdErrorMessage(462));
            }
          }
          workLoopConcurrentByScheduler();
          break;
        } catch (thrownValue$167) {
          handleThrow(root3, thrownValue$167);
        }
      while (1);
      lastContextDependency = currentlyRenderingFiber$1 = null;
      ReactSharedInternals.H = prevDispatcher;
      ReactSharedInternals.A = prevAsyncDispatcher;
      executionContext = prevExecutionContext;
      if (null !== workInProgress) return 0;
      workInProgressRoot = null;
      workInProgressRootRenderLanes = 0;
      finishQueueingConcurrentUpdates();
      return workInProgressRootExitStatus;
    }
    function workLoopConcurrentByScheduler() {
      for (; null !== workInProgress && !shouldYield(); )
        performUnitOfWork(workInProgress);
    }
    function performUnitOfWork(unitOfWork) {
      var next = beginWork(unitOfWork.alternate, unitOfWork, entangledRenderLanes);
      unitOfWork.memoizedProps = unitOfWork.pendingProps;
      null === next ? completeUnitOfWork(unitOfWork) : workInProgress = next;
    }
    function replaySuspendedUnitOfWork(unitOfWork) {
      var next = unitOfWork;
      var current = next.alternate;
      switch (next.tag) {
        case 15:
        case 0:
          next = replayFunctionComponent(
            current,
            next,
            next.pendingProps,
            next.type,
            void 0,
            workInProgressRootRenderLanes
          );
          break;
        case 11:
          next = replayFunctionComponent(
            current,
            next,
            next.pendingProps,
            next.type.render,
            next.ref,
            workInProgressRootRenderLanes
          );
          break;
        case 5:
          resetHooksOnUnwind(next);
        default:
          unwindInterruptedWork(current, next), next = workInProgress = resetWorkInProgress(next, entangledRenderLanes), next = beginWork(current, next, entangledRenderLanes);
      }
      unitOfWork.memoizedProps = unitOfWork.pendingProps;
      null === next ? completeUnitOfWork(unitOfWork) : workInProgress = next;
    }
    function throwAndUnwindWorkLoop(root3, unitOfWork, thrownValue, suspendedReason) {
      lastContextDependency = currentlyRenderingFiber$1 = null;
      resetHooksOnUnwind(unitOfWork);
      thenableState$1 = null;
      thenableIndexCounter$1 = 0;
      var returnFiber = unitOfWork.return;
      try {
        if (throwException(
          root3,
          returnFiber,
          unitOfWork,
          thrownValue,
          workInProgressRootRenderLanes
        )) {
          workInProgressRootExitStatus = 1;
          logUncaughtError(
            root3,
            createCapturedValueAtFiber(thrownValue, root3.current)
          );
          workInProgress = null;
          return;
        }
      } catch (error) {
        if (null !== returnFiber) throw workInProgress = returnFiber, error;
        workInProgressRootExitStatus = 1;
        logUncaughtError(
          root3,
          createCapturedValueAtFiber(thrownValue, root3.current)
        );
        workInProgress = null;
        return;
      }
      if (unitOfWork.flags & 32768) {
        if (isHydrating || 1 === suspendedReason) root3 = true;
        else if (workInProgressRootIsPrerendering || 0 !== (workInProgressRootRenderLanes & 536870912))
          root3 = false;
        else if (workInProgressRootDidSkipSuspendedSiblings = root3 = true, 2 === suspendedReason || 9 === suspendedReason || 3 === suspendedReason || 6 === suspendedReason)
          suspendedReason = suspenseHandlerStackCursor.current, null !== suspendedReason && 13 === suspendedReason.tag && (suspendedReason.flags |= 16384);
        unwindUnitOfWork(unitOfWork, root3);
      } else completeUnitOfWork(unitOfWork);
    }
    function completeUnitOfWork(unitOfWork) {
      var completedWork = unitOfWork;
      do {
        if (0 !== (completedWork.flags & 32768)) {
          unwindUnitOfWork(
            completedWork,
            workInProgressRootDidSkipSuspendedSiblings
          );
          return;
        }
        unitOfWork = completedWork.return;
        var next = completeWork(
          completedWork.alternate,
          completedWork,
          entangledRenderLanes
        );
        if (null !== next) {
          workInProgress = next;
          return;
        }
        completedWork = completedWork.sibling;
        if (null !== completedWork) {
          workInProgress = completedWork;
          return;
        }
        workInProgress = completedWork = unitOfWork;
      } while (null !== completedWork);
      0 === workInProgressRootExitStatus && (workInProgressRootExitStatus = 5);
    }
    function unwindUnitOfWork(unitOfWork, skipSiblings) {
      do {
        var next = unwindWork(unitOfWork.alternate, unitOfWork);
        if (null !== next) {
          next.flags &= 32767;
          workInProgress = next;
          return;
        }
        next = unitOfWork.return;
        null !== next && (next.flags |= 32768, next.subtreeFlags = 0, next.deletions = null);
        if (!skipSiblings && (unitOfWork = unitOfWork.sibling, null !== unitOfWork)) {
          workInProgress = unitOfWork;
          return;
        }
        workInProgress = unitOfWork = next;
      } while (null !== unitOfWork);
      workInProgressRootExitStatus = 6;
      workInProgress = null;
    }
    function commitRoot(root3, finishedWork, lanes, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, spawnedLane, updatedLanes, suspendedRetryLanes) {
      root3.cancelPendingCommit = null;
      do
        flushPendingEffects();
      while (0 !== pendingEffectsStatus);
      if (0 !== (executionContext & 6)) throw Error(formatProdErrorMessage(327));
      if (null !== finishedWork) {
        if (finishedWork === root3.current) throw Error(formatProdErrorMessage(177));
        didIncludeRenderPhaseUpdate = finishedWork.lanes | finishedWork.childLanes;
        didIncludeRenderPhaseUpdate |= concurrentlyUpdatedLanes;
        markRootFinished(
          root3,
          lanes,
          didIncludeRenderPhaseUpdate,
          spawnedLane,
          updatedLanes,
          suspendedRetryLanes
        );
        root3 === workInProgressRoot && (workInProgress = workInProgressRoot = null, workInProgressRootRenderLanes = 0);
        pendingFinishedWork = finishedWork;
        pendingEffectsRoot = root3;
        pendingEffectsLanes = lanes;
        pendingEffectsRemainingLanes = didIncludeRenderPhaseUpdate;
        pendingPassiveTransitions = transitions;
        pendingRecoverableErrors = recoverableErrors;
        0 !== (finishedWork.subtreeFlags & 10256) || 0 !== (finishedWork.flags & 10256) ? (root3.callbackNode = null, root3.callbackPriority = 0, scheduleCallback$1(NormalPriority$1, function() {
          flushPassiveEffects();
          return null;
        })) : (root3.callbackNode = null, root3.callbackPriority = 0);
        recoverableErrors = 0 !== (finishedWork.flags & 13878);
        if (0 !== (finishedWork.subtreeFlags & 13878) || recoverableErrors) {
          recoverableErrors = ReactSharedInternals.T;
          ReactSharedInternals.T = null;
          transitions = ReactDOMSharedInternals.p;
          ReactDOMSharedInternals.p = 2;
          spawnedLane = executionContext;
          executionContext |= 4;
          try {
            commitBeforeMutationEffects(root3, finishedWork, lanes);
          } finally {
            executionContext = spawnedLane, ReactDOMSharedInternals.p = transitions, ReactSharedInternals.T = recoverableErrors;
          }
        }
        pendingEffectsStatus = 1;
        flushMutationEffects();
        flushLayoutEffects();
        flushSpawnedWork();
      }
    }
    function flushMutationEffects() {
      if (1 === pendingEffectsStatus) {
        pendingEffectsStatus = 0;
        var root3 = pendingEffectsRoot, finishedWork = pendingFinishedWork, rootMutationHasEffect = 0 !== (finishedWork.flags & 13878);
        if (0 !== (finishedWork.subtreeFlags & 13878) || rootMutationHasEffect) {
          rootMutationHasEffect = ReactSharedInternals.T;
          ReactSharedInternals.T = null;
          var previousPriority = ReactDOMSharedInternals.p;
          ReactDOMSharedInternals.p = 2;
          var prevExecutionContext = executionContext;
          executionContext |= 4;
          try {
            commitMutationEffectsOnFiber(finishedWork, root3);
            var priorSelectionInformation = selectionInformation, curFocusedElem = getActiveElementDeep(root3.containerInfo), priorFocusedElem = priorSelectionInformation.focusedElem, priorSelectionRange = priorSelectionInformation.selectionRange;
            if (curFocusedElem !== priorFocusedElem && priorFocusedElem && priorFocusedElem.ownerDocument && containsNode(
              priorFocusedElem.ownerDocument.documentElement,
              priorFocusedElem
            )) {
              if (null !== priorSelectionRange && hasSelectionCapabilities(priorFocusedElem)) {
                var start = priorSelectionRange.start, end = priorSelectionRange.end;
                void 0 === end && (end = start);
                if ("selectionStart" in priorFocusedElem)
                  priorFocusedElem.selectionStart = start, priorFocusedElem.selectionEnd = Math.min(
                    end,
                    priorFocusedElem.value.length
                  );
                else {
                  var doc = priorFocusedElem.ownerDocument || document, win = doc && doc.defaultView || window;
                  if (win.getSelection) {
                    var selection = win.getSelection(), length = priorFocusedElem.textContent.length, start$jscomp$0 = Math.min(priorSelectionRange.start, length), end$jscomp$0 = void 0 === priorSelectionRange.end ? start$jscomp$0 : Math.min(priorSelectionRange.end, length);
                    !selection.extend && start$jscomp$0 > end$jscomp$0 && (curFocusedElem = end$jscomp$0, end$jscomp$0 = start$jscomp$0, start$jscomp$0 = curFocusedElem);
                    var startMarker = getNodeForCharacterOffset(
                      priorFocusedElem,
                      start$jscomp$0
                    ), endMarker = getNodeForCharacterOffset(
                      priorFocusedElem,
                      end$jscomp$0
                    );
                    if (startMarker && endMarker && (1 !== selection.rangeCount || selection.anchorNode !== startMarker.node || selection.anchorOffset !== startMarker.offset || selection.focusNode !== endMarker.node || selection.focusOffset !== endMarker.offset)) {
                      var range = doc.createRange();
                      range.setStart(startMarker.node, startMarker.offset);
                      selection.removeAllRanges();
                      start$jscomp$0 > end$jscomp$0 ? (selection.addRange(range), selection.extend(endMarker.node, endMarker.offset)) : (range.setEnd(endMarker.node, endMarker.offset), selection.addRange(range));
                    }
                  }
                }
              }
              doc = [];
              for (selection = priorFocusedElem; selection = selection.parentNode; )
                1 === selection.nodeType && doc.push({
                  element: selection,
                  left: selection.scrollLeft,
                  top: selection.scrollTop
                });
              "function" === typeof priorFocusedElem.focus && priorFocusedElem.focus();
              for (priorFocusedElem = 0; priorFocusedElem < doc.length; priorFocusedElem++) {
                var info = doc[priorFocusedElem];
                info.element.scrollLeft = info.left;
                info.element.scrollTop = info.top;
              }
            }
            _enabled = !!eventsEnabled;
            selectionInformation = eventsEnabled = null;
          } finally {
            executionContext = prevExecutionContext, ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = rootMutationHasEffect;
          }
        }
        root3.current = finishedWork;
        pendingEffectsStatus = 2;
      }
    }
    function flushLayoutEffects() {
      if (2 === pendingEffectsStatus) {
        pendingEffectsStatus = 0;
        var root3 = pendingEffectsRoot, finishedWork = pendingFinishedWork, rootHasLayoutEffect = 0 !== (finishedWork.flags & 8772);
        if (0 !== (finishedWork.subtreeFlags & 8772) || rootHasLayoutEffect) {
          rootHasLayoutEffect = ReactSharedInternals.T;
          ReactSharedInternals.T = null;
          var previousPriority = ReactDOMSharedInternals.p;
          ReactDOMSharedInternals.p = 2;
          var prevExecutionContext = executionContext;
          executionContext |= 4;
          try {
            commitLayoutEffectOnFiber(root3, finishedWork.alternate, finishedWork);
          } finally {
            executionContext = prevExecutionContext, ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = rootHasLayoutEffect;
          }
        }
        pendingEffectsStatus = 3;
      }
    }
    function flushSpawnedWork() {
      if (4 === pendingEffectsStatus || 3 === pendingEffectsStatus) {
        pendingEffectsStatus = 0;
        requestPaint();
        var root3 = pendingEffectsRoot, finishedWork = pendingFinishedWork, lanes = pendingEffectsLanes, recoverableErrors = pendingRecoverableErrors;
        0 !== (finishedWork.subtreeFlags & 10256) || 0 !== (finishedWork.flags & 10256) ? pendingEffectsStatus = 5 : (pendingEffectsStatus = 0, pendingFinishedWork = pendingEffectsRoot = null, releaseRootPooledCache(root3, root3.pendingLanes));
        var remainingLanes = root3.pendingLanes;
        0 === remainingLanes && (legacyErrorBoundariesThatAlreadyFailed = null);
        lanesToEventPriority(lanes);
        finishedWork = finishedWork.stateNode;
        if (injectedHook && "function" === typeof injectedHook.onCommitFiberRoot)
          try {
            injectedHook.onCommitFiberRoot(
              rendererID,
              finishedWork,
              void 0,
              128 === (finishedWork.current.flags & 128)
            );
          } catch (err) {
          }
        if (null !== recoverableErrors) {
          finishedWork = ReactSharedInternals.T;
          remainingLanes = ReactDOMSharedInternals.p;
          ReactDOMSharedInternals.p = 2;
          ReactSharedInternals.T = null;
          try {
            for (var onRecoverableError = root3.onRecoverableError, i = 0; i < recoverableErrors.length; i++) {
              var recoverableError = recoverableErrors[i];
              onRecoverableError(recoverableError.value, {
                componentStack: recoverableError.stack
              });
            }
          } finally {
            ReactSharedInternals.T = finishedWork, ReactDOMSharedInternals.p = remainingLanes;
          }
        }
        0 !== (pendingEffectsLanes & 3) && flushPendingEffects();
        ensureRootIsScheduled(root3);
        remainingLanes = root3.pendingLanes;
        0 !== (lanes & 261930) && 0 !== (remainingLanes & 42) ? root3 === rootWithNestedUpdates ? nestedUpdateCount++ : (nestedUpdateCount = 0, rootWithNestedUpdates = root3) : nestedUpdateCount = 0;
        flushSyncWorkAcrossRoots_impl(0);
      }
    }
    function releaseRootPooledCache(root3, remainingLanes) {
      0 === (root3.pooledCacheLanes &= remainingLanes) && (remainingLanes = root3.pooledCache, null != remainingLanes && (root3.pooledCache = null, releaseCache(remainingLanes)));
    }
    function flushPendingEffects() {
      flushMutationEffects();
      flushLayoutEffects();
      flushSpawnedWork();
      return flushPassiveEffects();
    }
    function flushPassiveEffects() {
      if (5 !== pendingEffectsStatus) return false;
      var root3 = pendingEffectsRoot, remainingLanes = pendingEffectsRemainingLanes;
      pendingEffectsRemainingLanes = 0;
      var renderPriority = lanesToEventPriority(pendingEffectsLanes), prevTransition = ReactSharedInternals.T, previousPriority = ReactDOMSharedInternals.p;
      try {
        ReactDOMSharedInternals.p = 32 > renderPriority ? 32 : renderPriority;
        ReactSharedInternals.T = null;
        renderPriority = pendingPassiveTransitions;
        pendingPassiveTransitions = null;
        var root$jscomp$0 = pendingEffectsRoot, lanes = pendingEffectsLanes;
        pendingEffectsStatus = 0;
        pendingFinishedWork = pendingEffectsRoot = null;
        pendingEffectsLanes = 0;
        if (0 !== (executionContext & 6)) throw Error(formatProdErrorMessage(331));
        var prevExecutionContext = executionContext;
        executionContext |= 4;
        commitPassiveUnmountOnFiber(root$jscomp$0.current);
        commitPassiveMountOnFiber(
          root$jscomp$0,
          root$jscomp$0.current,
          lanes,
          renderPriority
        );
        executionContext = prevExecutionContext;
        flushSyncWorkAcrossRoots_impl(0, false);
        if (injectedHook && "function" === typeof injectedHook.onPostCommitFiberRoot)
          try {
            injectedHook.onPostCommitFiberRoot(rendererID, root$jscomp$0);
          } catch (err) {
          }
        return true;
      } finally {
        ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition, releaseRootPooledCache(root3, remainingLanes);
      }
    }
    function captureCommitPhaseErrorOnRoot(rootFiber, sourceFiber, error) {
      sourceFiber = createCapturedValueAtFiber(error, sourceFiber);
      sourceFiber = createRootErrorUpdate(rootFiber.stateNode, sourceFiber, 2);
      rootFiber = enqueueUpdate(rootFiber, sourceFiber, 2);
      null !== rootFiber && (markRootUpdated$1(rootFiber, 2), ensureRootIsScheduled(rootFiber));
    }
    function captureCommitPhaseError(sourceFiber, nearestMountedAncestor, error) {
      if (3 === sourceFiber.tag)
        captureCommitPhaseErrorOnRoot(sourceFiber, sourceFiber, error);
      else
        for (; null !== nearestMountedAncestor; ) {
          if (3 === nearestMountedAncestor.tag) {
            captureCommitPhaseErrorOnRoot(
              nearestMountedAncestor,
              sourceFiber,
              error
            );
            break;
          } else if (1 === nearestMountedAncestor.tag) {
            var instance = nearestMountedAncestor.stateNode;
            if ("function" === typeof nearestMountedAncestor.type.getDerivedStateFromError || "function" === typeof instance.componentDidCatch && (null === legacyErrorBoundariesThatAlreadyFailed || !legacyErrorBoundariesThatAlreadyFailed.has(instance))) {
              sourceFiber = createCapturedValueAtFiber(error, sourceFiber);
              error = createClassErrorUpdate(2);
              instance = enqueueUpdate(nearestMountedAncestor, error, 2);
              null !== instance && (initializeClassErrorUpdate(
                error,
                instance,
                nearestMountedAncestor,
                sourceFiber
              ), markRootUpdated$1(instance, 2), ensureRootIsScheduled(instance));
              break;
            }
          }
          nearestMountedAncestor = nearestMountedAncestor.return;
        }
    }
    function attachPingListener(root3, wakeable, lanes) {
      var pingCache = root3.pingCache;
      if (null === pingCache) {
        pingCache = root3.pingCache = new PossiblyWeakMap();
        var threadIDs = /* @__PURE__ */ new Set();
        pingCache.set(wakeable, threadIDs);
      } else
        threadIDs = pingCache.get(wakeable), void 0 === threadIDs && (threadIDs = /* @__PURE__ */ new Set(), pingCache.set(wakeable, threadIDs));
      threadIDs.has(lanes) || (workInProgressRootDidAttachPingListener = true, threadIDs.add(lanes), root3 = pingSuspendedRoot.bind(null, root3, wakeable, lanes), wakeable.then(root3, root3));
    }
    function pingSuspendedRoot(root3, wakeable, pingedLanes) {
      var pingCache = root3.pingCache;
      null !== pingCache && pingCache.delete(wakeable);
      root3.pingedLanes |= root3.suspendedLanes & pingedLanes;
      root3.warmLanes &= ~pingedLanes;
      workInProgressRoot === root3 && (workInProgressRootRenderLanes & pingedLanes) === pingedLanes && (4 === workInProgressRootExitStatus || 3 === workInProgressRootExitStatus && (workInProgressRootRenderLanes & 62914560) === workInProgressRootRenderLanes && 300 > now() - globalMostRecentFallbackTime ? 0 === (executionContext & 2) && prepareFreshStack(root3, 0) : workInProgressRootPingedLanes |= pingedLanes, workInProgressSuspendedRetryLanes === workInProgressRootRenderLanes && (workInProgressSuspendedRetryLanes = 0));
      ensureRootIsScheduled(root3);
    }
    function retryTimedOutBoundary(boundaryFiber, retryLane) {
      0 === retryLane && (retryLane = claimNextRetryLane());
      boundaryFiber = enqueueConcurrentRenderForLane(boundaryFiber, retryLane);
      null !== boundaryFiber && (markRootUpdated$1(boundaryFiber, retryLane), ensureRootIsScheduled(boundaryFiber));
    }
    function retryDehydratedSuspenseBoundary(boundaryFiber) {
      var suspenseState = boundaryFiber.memoizedState, retryLane = 0;
      null !== suspenseState && (retryLane = suspenseState.retryLane);
      retryTimedOutBoundary(boundaryFiber, retryLane);
    }
    function resolveRetryWakeable(boundaryFiber, wakeable) {
      var retryLane = 0;
      switch (boundaryFiber.tag) {
        case 31:
        case 13:
          var retryCache = boundaryFiber.stateNode;
          var suspenseState = boundaryFiber.memoizedState;
          null !== suspenseState && (retryLane = suspenseState.retryLane);
          break;
        case 19:
          retryCache = boundaryFiber.stateNode;
          break;
        case 22:
          retryCache = boundaryFiber.stateNode._retryCache;
          break;
        default:
          throw Error(formatProdErrorMessage(314));
      }
      null !== retryCache && retryCache.delete(wakeable);
      retryTimedOutBoundary(boundaryFiber, retryLane);
    }
    function scheduleCallback$1(priorityLevel, callback) {
      return scheduleCallback$3(priorityLevel, callback);
    }
    var firstScheduledRoot = null, lastScheduledRoot = null, didScheduleMicrotask = false, mightHavePendingSyncWork = false, isFlushingWork = false, currentEventTransitionLane = 0;
    function ensureRootIsScheduled(root3) {
      root3 !== lastScheduledRoot && null === root3.next && (null === lastScheduledRoot ? firstScheduledRoot = lastScheduledRoot = root3 : lastScheduledRoot = lastScheduledRoot.next = root3);
      mightHavePendingSyncWork = true;
      didScheduleMicrotask || (didScheduleMicrotask = true, scheduleImmediateRootScheduleTask());
    }
    function flushSyncWorkAcrossRoots_impl(syncTransitionLanes, onlyLegacy) {
      if (!isFlushingWork && mightHavePendingSyncWork) {
        isFlushingWork = true;
        do {
          var didPerformSomeWork = false;
          for (var root$170 = firstScheduledRoot; null !== root$170; ) {
            if (0 !== syncTransitionLanes) {
              var pendingLanes = root$170.pendingLanes;
              if (0 === pendingLanes) var JSCompiler_inline_result = 0;
              else {
                var suspendedLanes = root$170.suspendedLanes, pingedLanes = root$170.pingedLanes;
                JSCompiler_inline_result = (1 << 31 - clz32(42 | syncTransitionLanes) + 1) - 1;
                JSCompiler_inline_result &= pendingLanes & ~(suspendedLanes & ~pingedLanes);
                JSCompiler_inline_result = JSCompiler_inline_result & 201326741 ? JSCompiler_inline_result & 201326741 | 1 : JSCompiler_inline_result ? JSCompiler_inline_result | 2 : 0;
              }
              0 !== JSCompiler_inline_result && (didPerformSomeWork = true, performSyncWorkOnRoot(root$170, JSCompiler_inline_result));
            } else
              JSCompiler_inline_result = workInProgressRootRenderLanes, JSCompiler_inline_result = getNextLanes(
                root$170,
                root$170 === workInProgressRoot ? JSCompiler_inline_result : 0,
                null !== root$170.cancelPendingCommit || -1 !== root$170.timeoutHandle
              ), 0 === (JSCompiler_inline_result & 3) || checkIfRootIsPrerendering(root$170, JSCompiler_inline_result) || (didPerformSomeWork = true, performSyncWorkOnRoot(root$170, JSCompiler_inline_result));
            root$170 = root$170.next;
          }
        } while (didPerformSomeWork);
        isFlushingWork = false;
      }
    }
    function processRootScheduleInImmediateTask() {
      processRootScheduleInMicrotask();
    }
    function processRootScheduleInMicrotask() {
      mightHavePendingSyncWork = didScheduleMicrotask = false;
      var syncTransitionLanes = 0;
      0 !== currentEventTransitionLane && shouldAttemptEagerTransition() && (syncTransitionLanes = currentEventTransitionLane);
      for (var currentTime = now(), prev = null, root3 = firstScheduledRoot; null !== root3; ) {
        var next = root3.next, nextLanes = scheduleTaskForRootDuringMicrotask(root3, currentTime);
        if (0 === nextLanes)
          root3.next = null, null === prev ? firstScheduledRoot = next : prev.next = next, null === next && (lastScheduledRoot = prev);
        else if (prev = root3, 0 !== syncTransitionLanes || 0 !== (nextLanes & 3))
          mightHavePendingSyncWork = true;
        root3 = next;
      }
      0 !== pendingEffectsStatus && 5 !== pendingEffectsStatus || flushSyncWorkAcrossRoots_impl(syncTransitionLanes);
      0 !== currentEventTransitionLane && (currentEventTransitionLane = 0);
    }
    function scheduleTaskForRootDuringMicrotask(root3, currentTime) {
      for (var suspendedLanes = root3.suspendedLanes, pingedLanes = root3.pingedLanes, expirationTimes = root3.expirationTimes, lanes = root3.pendingLanes & -62914561; 0 < lanes; ) {
        var index$5 = 31 - clz32(lanes), lane = 1 << index$5, expirationTime = expirationTimes[index$5];
        if (-1 === expirationTime) {
          if (0 === (lane & suspendedLanes) || 0 !== (lane & pingedLanes))
            expirationTimes[index$5] = computeExpirationTime(lane, currentTime);
        } else expirationTime <= currentTime && (root3.expiredLanes |= lane);
        lanes &= ~lane;
      }
      currentTime = workInProgressRoot;
      suspendedLanes = workInProgressRootRenderLanes;
      suspendedLanes = getNextLanes(
        root3,
        root3 === currentTime ? suspendedLanes : 0,
        null !== root3.cancelPendingCommit || -1 !== root3.timeoutHandle
      );
      pingedLanes = root3.callbackNode;
      if (0 === suspendedLanes || root3 === currentTime && (2 === workInProgressSuspendedReason || 9 === workInProgressSuspendedReason) || null !== root3.cancelPendingCommit)
        return null !== pingedLanes && null !== pingedLanes && cancelCallback$1(pingedLanes), root3.callbackNode = null, root3.callbackPriority = 0;
      if (0 === (suspendedLanes & 3) || checkIfRootIsPrerendering(root3, suspendedLanes)) {
        currentTime = suspendedLanes & -suspendedLanes;
        if (currentTime === root3.callbackPriority) return currentTime;
        null !== pingedLanes && cancelCallback$1(pingedLanes);
        switch (lanesToEventPriority(suspendedLanes)) {
          case 2:
          case 8:
            suspendedLanes = UserBlockingPriority;
            break;
          case 32:
            suspendedLanes = NormalPriority$1;
            break;
          case 268435456:
            suspendedLanes = IdlePriority;
            break;
          default:
            suspendedLanes = NormalPriority$1;
        }
        pingedLanes = performWorkOnRootViaSchedulerTask.bind(null, root3);
        suspendedLanes = scheduleCallback$3(suspendedLanes, pingedLanes);
        root3.callbackPriority = currentTime;
        root3.callbackNode = suspendedLanes;
        return currentTime;
      }
      null !== pingedLanes && null !== pingedLanes && cancelCallback$1(pingedLanes);
      root3.callbackPriority = 2;
      root3.callbackNode = null;
      return 2;
    }
    function performWorkOnRootViaSchedulerTask(root3, didTimeout) {
      if (0 !== pendingEffectsStatus && 5 !== pendingEffectsStatus)
        return root3.callbackNode = null, root3.callbackPriority = 0, null;
      var originalCallbackNode = root3.callbackNode;
      if (flushPendingEffects() && root3.callbackNode !== originalCallbackNode)
        return null;
      var workInProgressRootRenderLanes$jscomp$0 = workInProgressRootRenderLanes;
      workInProgressRootRenderLanes$jscomp$0 = getNextLanes(
        root3,
        root3 === workInProgressRoot ? workInProgressRootRenderLanes$jscomp$0 : 0,
        null !== root3.cancelPendingCommit || -1 !== root3.timeoutHandle
      );
      if (0 === workInProgressRootRenderLanes$jscomp$0) return null;
      performWorkOnRoot(root3, workInProgressRootRenderLanes$jscomp$0, didTimeout);
      scheduleTaskForRootDuringMicrotask(root3, now());
      return null != root3.callbackNode && root3.callbackNode === originalCallbackNode ? performWorkOnRootViaSchedulerTask.bind(null, root3) : null;
    }
    function performSyncWorkOnRoot(root3, lanes) {
      if (flushPendingEffects()) return null;
      performWorkOnRoot(root3, lanes, true);
    }
    function scheduleImmediateRootScheduleTask() {
      scheduleMicrotask(function() {
        0 !== (executionContext & 6) ? scheduleCallback$3(
          ImmediatePriority,
          processRootScheduleInImmediateTask
        ) : processRootScheduleInMicrotask();
      });
    }
    function requestTransitionLane() {
      if (0 === currentEventTransitionLane) {
        var actionScopeLane = currentEntangledLane;
        0 === actionScopeLane && (actionScopeLane = nextTransitionUpdateLane, nextTransitionUpdateLane <<= 1, 0 === (nextTransitionUpdateLane & 261888) && (nextTransitionUpdateLane = 256));
        currentEventTransitionLane = actionScopeLane;
      }
      return currentEventTransitionLane;
    }
    function coerceFormActionProp(actionProp) {
      return null == actionProp || "symbol" === typeof actionProp || "boolean" === typeof actionProp ? null : "function" === typeof actionProp ? actionProp : sanitizeURL("" + actionProp);
    }
    function createFormDataWithSubmitter(form, submitter) {
      var temp = submitter.ownerDocument.createElement("input");
      temp.name = submitter.name;
      temp.value = submitter.value;
      form.id && temp.setAttribute("form", form.id);
      submitter.parentNode.insertBefore(temp, submitter);
      form = new FormData(form);
      temp.parentNode.removeChild(temp);
      return form;
    }
    function extractEvents$1(dispatchQueue, domEventName, maybeTargetInst, nativeEvent, nativeEventTarget) {
      if ("submit" === domEventName && maybeTargetInst && maybeTargetInst.stateNode === nativeEventTarget) {
        var action = coerceFormActionProp(
          (nativeEventTarget[internalPropsKey] || null).action
        ), submitter = nativeEvent.submitter;
        submitter && (domEventName = (domEventName = submitter[internalPropsKey] || null) ? coerceFormActionProp(domEventName.formAction) : submitter.getAttribute("formAction"), null !== domEventName && (action = domEventName, submitter = null));
        var event = new SyntheticEvent(
          "action",
          "action",
          null,
          nativeEvent,
          nativeEventTarget
        );
        dispatchQueue.push({
          event,
          listeners: [
            {
              instance: null,
              listener: function() {
                if (nativeEvent.defaultPrevented) {
                  if (0 !== currentEventTransitionLane) {
                    var formData = submitter ? createFormDataWithSubmitter(nativeEventTarget, submitter) : new FormData(nativeEventTarget);
                    startHostTransition(
                      maybeTargetInst,
                      {
                        pending: true,
                        data: formData,
                        method: nativeEventTarget.method,
                        action
                      },
                      null,
                      formData
                    );
                  }
                } else
                  "function" === typeof action && (event.preventDefault(), formData = submitter ? createFormDataWithSubmitter(nativeEventTarget, submitter) : new FormData(nativeEventTarget), startHostTransition(
                    maybeTargetInst,
                    {
                      pending: true,
                      data: formData,
                      method: nativeEventTarget.method,
                      action
                    },
                    action,
                    formData
                  ));
              },
              currentTarget: nativeEventTarget
            }
          ]
        });
      }
    }
    for (var i$jscomp$inline_1577 = 0; i$jscomp$inline_1577 < simpleEventPluginEvents.length; i$jscomp$inline_1577++) {
      var eventName$jscomp$inline_1578 = simpleEventPluginEvents[i$jscomp$inline_1577], domEventName$jscomp$inline_1579 = eventName$jscomp$inline_1578.toLowerCase(), capitalizedEvent$jscomp$inline_1580 = eventName$jscomp$inline_1578[0].toUpperCase() + eventName$jscomp$inline_1578.slice(1);
      registerSimpleEvent(
        domEventName$jscomp$inline_1579,
        "on" + capitalizedEvent$jscomp$inline_1580
      );
    }
    registerSimpleEvent(ANIMATION_END, "onAnimationEnd");
    registerSimpleEvent(ANIMATION_ITERATION, "onAnimationIteration");
    registerSimpleEvent(ANIMATION_START, "onAnimationStart");
    registerSimpleEvent("dblclick", "onDoubleClick");
    registerSimpleEvent("focusin", "onFocus");
    registerSimpleEvent("focusout", "onBlur");
    registerSimpleEvent(TRANSITION_RUN, "onTransitionRun");
    registerSimpleEvent(TRANSITION_START, "onTransitionStart");
    registerSimpleEvent(TRANSITION_CANCEL, "onTransitionCancel");
    registerSimpleEvent(TRANSITION_END, "onTransitionEnd");
    registerDirectEvent("onMouseEnter", ["mouseout", "mouseover"]);
    registerDirectEvent("onMouseLeave", ["mouseout", "mouseover"]);
    registerDirectEvent("onPointerEnter", ["pointerout", "pointerover"]);
    registerDirectEvent("onPointerLeave", ["pointerout", "pointerover"]);
    registerTwoPhaseEvent(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(" ")
    );
    registerTwoPhaseEvent(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " "
      )
    );
    registerTwoPhaseEvent("onBeforeInput", [
      "compositionend",
      "keypress",
      "textInput",
      "paste"
    ]);
    registerTwoPhaseEvent(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" ")
    );
    registerTwoPhaseEvent(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" ")
    );
    registerTwoPhaseEvent(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
    );
    var mediaEventTypes = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " "
    ), nonDelegatedEvents = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(mediaEventTypes)
    );
    function processDispatchQueue(dispatchQueue, eventSystemFlags) {
      eventSystemFlags = 0 !== (eventSystemFlags & 4);
      for (var i = 0; i < dispatchQueue.length; i++) {
        var _dispatchQueue$i = dispatchQueue[i], event = _dispatchQueue$i.event;
        _dispatchQueue$i = _dispatchQueue$i.listeners;
        a: {
          var previousInstance = void 0;
          if (eventSystemFlags)
            for (var i$jscomp$0 = _dispatchQueue$i.length - 1; 0 <= i$jscomp$0; i$jscomp$0--) {
              var _dispatchListeners$i = _dispatchQueue$i[i$jscomp$0], instance = _dispatchListeners$i.instance, currentTarget = _dispatchListeners$i.currentTarget;
              _dispatchListeners$i = _dispatchListeners$i.listener;
              if (instance !== previousInstance && event.isPropagationStopped())
                break a;
              previousInstance = _dispatchListeners$i;
              event.currentTarget = currentTarget;
              try {
                previousInstance(event);
              } catch (error) {
                reportGlobalError(error);
              }
              event.currentTarget = null;
              previousInstance = instance;
            }
          else
            for (i$jscomp$0 = 0; i$jscomp$0 < _dispatchQueue$i.length; i$jscomp$0++) {
              _dispatchListeners$i = _dispatchQueue$i[i$jscomp$0];
              instance = _dispatchListeners$i.instance;
              currentTarget = _dispatchListeners$i.currentTarget;
              _dispatchListeners$i = _dispatchListeners$i.listener;
              if (instance !== previousInstance && event.isPropagationStopped())
                break a;
              previousInstance = _dispatchListeners$i;
              event.currentTarget = currentTarget;
              try {
                previousInstance(event);
              } catch (error) {
                reportGlobalError(error);
              }
              event.currentTarget = null;
              previousInstance = instance;
            }
        }
      }
    }
    function listenToNonDelegatedEvent(domEventName, targetElement) {
      var JSCompiler_inline_result = targetElement[internalEventHandlersKey];
      void 0 === JSCompiler_inline_result && (JSCompiler_inline_result = targetElement[internalEventHandlersKey] = /* @__PURE__ */ new Set());
      var listenerSetKey = domEventName + "__bubble";
      JSCompiler_inline_result.has(listenerSetKey) || (addTrappedEventListener(targetElement, domEventName, 2, false), JSCompiler_inline_result.add(listenerSetKey));
    }
    function listenToNativeEvent(domEventName, isCapturePhaseListener, target) {
      var eventSystemFlags = 0;
      isCapturePhaseListener && (eventSystemFlags |= 4);
      addTrappedEventListener(
        target,
        domEventName,
        eventSystemFlags,
        isCapturePhaseListener
      );
    }
    var listeningMarker = "_reactListening" + Math.random().toString(36).slice(2);
    function listenToAllSupportedEvents(rootContainerElement) {
      if (!rootContainerElement[listeningMarker]) {
        rootContainerElement[listeningMarker] = true;
        allNativeEvents.forEach(function(domEventName) {
          "selectionchange" !== domEventName && (nonDelegatedEvents.has(domEventName) || listenToNativeEvent(domEventName, false, rootContainerElement), listenToNativeEvent(domEventName, true, rootContainerElement));
        });
        var ownerDocument = 9 === rootContainerElement.nodeType ? rootContainerElement : rootContainerElement.ownerDocument;
        null === ownerDocument || ownerDocument[listeningMarker] || (ownerDocument[listeningMarker] = true, listenToNativeEvent("selectionchange", false, ownerDocument));
      }
    }
    function addTrappedEventListener(targetContainer, domEventName, eventSystemFlags, isCapturePhaseListener) {
      switch (getEventPriority(domEventName)) {
        case 2:
          var listenerWrapper = dispatchDiscreteEvent;
          break;
        case 8:
          listenerWrapper = dispatchContinuousEvent;
          break;
        default:
          listenerWrapper = dispatchEvent;
      }
      eventSystemFlags = listenerWrapper.bind(
        null,
        domEventName,
        eventSystemFlags,
        targetContainer
      );
      listenerWrapper = void 0;
      !passiveBrowserEventsSupported || "touchstart" !== domEventName && "touchmove" !== domEventName && "wheel" !== domEventName || (listenerWrapper = true);
      isCapturePhaseListener ? void 0 !== listenerWrapper ? targetContainer.addEventListener(domEventName, eventSystemFlags, {
        capture: true,
        passive: listenerWrapper
      }) : targetContainer.addEventListener(domEventName, eventSystemFlags, true) : void 0 !== listenerWrapper ? targetContainer.addEventListener(domEventName, eventSystemFlags, {
        passive: listenerWrapper
      }) : targetContainer.addEventListener(domEventName, eventSystemFlags, false);
    }
    function dispatchEventForPluginEventSystem(domEventName, eventSystemFlags, nativeEvent, targetInst$jscomp$0, targetContainer) {
      var ancestorInst = targetInst$jscomp$0;
      if (0 === (eventSystemFlags & 1) && 0 === (eventSystemFlags & 2) && null !== targetInst$jscomp$0)
        a: for (; ; ) {
          if (null === targetInst$jscomp$0) return;
          var nodeTag = targetInst$jscomp$0.tag;
          if (3 === nodeTag || 4 === nodeTag) {
            var container = targetInst$jscomp$0.stateNode.containerInfo;
            if (container === targetContainer) break;
            if (4 === nodeTag)
              for (nodeTag = targetInst$jscomp$0.return; null !== nodeTag; ) {
                var grandTag = nodeTag.tag;
                if ((3 === grandTag || 4 === grandTag) && nodeTag.stateNode.containerInfo === targetContainer)
                  return;
                nodeTag = nodeTag.return;
              }
            for (; null !== container; ) {
              nodeTag = getClosestInstanceFromNode(container);
              if (null === nodeTag) return;
              grandTag = nodeTag.tag;
              if (5 === grandTag || 6 === grandTag || 26 === grandTag || 27 === grandTag) {
                targetInst$jscomp$0 = ancestorInst = nodeTag;
                continue a;
              }
              container = container.parentNode;
            }
          }
          targetInst$jscomp$0 = targetInst$jscomp$0.return;
        }
      batchedUpdates$1(function() {
        var targetInst = ancestorInst, nativeEventTarget = getEventTarget(nativeEvent), dispatchQueue = [];
        a: {
          var reactName = topLevelEventsToReactNames.get(domEventName);
          if (void 0 !== reactName) {
            var SyntheticEventCtor = SyntheticEvent, reactEventType = domEventName;
            switch (domEventName) {
              case "keypress":
                if (0 === getEventCharCode(nativeEvent)) break a;
              case "keydown":
              case "keyup":
                SyntheticEventCtor = SyntheticKeyboardEvent;
                break;
              case "focusin":
                reactEventType = "focus";
                SyntheticEventCtor = SyntheticFocusEvent;
                break;
              case "focusout":
                reactEventType = "blur";
                SyntheticEventCtor = SyntheticFocusEvent;
                break;
              case "beforeblur":
              case "afterblur":
                SyntheticEventCtor = SyntheticFocusEvent;
                break;
              case "click":
                if (2 === nativeEvent.button) break a;
              case "auxclick":
              case "dblclick":
              case "mousedown":
              case "mousemove":
              case "mouseup":
              case "mouseout":
              case "mouseover":
              case "contextmenu":
                SyntheticEventCtor = SyntheticMouseEvent;
                break;
              case "drag":
              case "dragend":
              case "dragenter":
              case "dragexit":
              case "dragleave":
              case "dragover":
              case "dragstart":
              case "drop":
                SyntheticEventCtor = SyntheticDragEvent;
                break;
              case "touchcancel":
              case "touchend":
              case "touchmove":
              case "touchstart":
                SyntheticEventCtor = SyntheticTouchEvent;
                break;
              case ANIMATION_END:
              case ANIMATION_ITERATION:
              case ANIMATION_START:
                SyntheticEventCtor = SyntheticAnimationEvent;
                break;
              case TRANSITION_END:
                SyntheticEventCtor = SyntheticTransitionEvent;
                break;
              case "scroll":
              case "scrollend":
                SyntheticEventCtor = SyntheticUIEvent;
                break;
              case "wheel":
                SyntheticEventCtor = SyntheticWheelEvent;
                break;
              case "copy":
              case "cut":
              case "paste":
                SyntheticEventCtor = SyntheticClipboardEvent;
                break;
              case "gotpointercapture":
              case "lostpointercapture":
              case "pointercancel":
              case "pointerdown":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerup":
                SyntheticEventCtor = SyntheticPointerEvent;
                break;
              case "toggle":
              case "beforetoggle":
                SyntheticEventCtor = SyntheticToggleEvent;
            }
            var inCapturePhase = 0 !== (eventSystemFlags & 4), accumulateTargetOnly = !inCapturePhase && ("scroll" === domEventName || "scrollend" === domEventName), reactEventName = inCapturePhase ? null !== reactName ? reactName + "Capture" : null : reactName;
            inCapturePhase = [];
            for (var instance = targetInst, lastHostComponent; null !== instance; ) {
              var _instance = instance;
              lastHostComponent = _instance.stateNode;
              _instance = _instance.tag;
              5 !== _instance && 26 !== _instance && 27 !== _instance || null === lastHostComponent || null === reactEventName || (_instance = getListener(instance, reactEventName), null != _instance && inCapturePhase.push(
                createDispatchListener(instance, _instance, lastHostComponent)
              ));
              if (accumulateTargetOnly) break;
              instance = instance.return;
            }
            0 < inCapturePhase.length && (reactName = new SyntheticEventCtor(
              reactName,
              reactEventType,
              null,
              nativeEvent,
              nativeEventTarget
            ), dispatchQueue.push({ event: reactName, listeners: inCapturePhase }));
          }
        }
        if (0 === (eventSystemFlags & 7)) {
          a: {
            reactName = "mouseover" === domEventName || "pointerover" === domEventName;
            SyntheticEventCtor = "mouseout" === domEventName || "pointerout" === domEventName;
            if (reactName && nativeEvent !== currentReplayingEvent && (reactEventType = nativeEvent.relatedTarget || nativeEvent.fromElement) && (getClosestInstanceFromNode(reactEventType) || reactEventType[internalContainerInstanceKey]))
              break a;
            if (SyntheticEventCtor || reactName) {
              reactName = nativeEventTarget.window === nativeEventTarget ? nativeEventTarget : (reactName = nativeEventTarget.ownerDocument) ? reactName.defaultView || reactName.parentWindow : window;
              if (SyntheticEventCtor) {
                if (reactEventType = nativeEvent.relatedTarget || nativeEvent.toElement, SyntheticEventCtor = targetInst, reactEventType = reactEventType ? getClosestInstanceFromNode(reactEventType) : null, null !== reactEventType && (accumulateTargetOnly = getNearestMountedFiber(reactEventType), inCapturePhase = reactEventType.tag, reactEventType !== accumulateTargetOnly || 5 !== inCapturePhase && 27 !== inCapturePhase && 6 !== inCapturePhase))
                  reactEventType = null;
              } else SyntheticEventCtor = null, reactEventType = targetInst;
              if (SyntheticEventCtor !== reactEventType) {
                inCapturePhase = SyntheticMouseEvent;
                _instance = "onMouseLeave";
                reactEventName = "onMouseEnter";
                instance = "mouse";
                if ("pointerout" === domEventName || "pointerover" === domEventName)
                  inCapturePhase = SyntheticPointerEvent, _instance = "onPointerLeave", reactEventName = "onPointerEnter", instance = "pointer";
                accumulateTargetOnly = null == SyntheticEventCtor ? reactName : getNodeFromInstance(SyntheticEventCtor);
                lastHostComponent = null == reactEventType ? reactName : getNodeFromInstance(reactEventType);
                reactName = new inCapturePhase(
                  _instance,
                  instance + "leave",
                  SyntheticEventCtor,
                  nativeEvent,
                  nativeEventTarget
                );
                reactName.target = accumulateTargetOnly;
                reactName.relatedTarget = lastHostComponent;
                _instance = null;
                getClosestInstanceFromNode(nativeEventTarget) === targetInst && (inCapturePhase = new inCapturePhase(
                  reactEventName,
                  instance + "enter",
                  reactEventType,
                  nativeEvent,
                  nativeEventTarget
                ), inCapturePhase.target = lastHostComponent, inCapturePhase.relatedTarget = accumulateTargetOnly, _instance = inCapturePhase);
                accumulateTargetOnly = _instance;
                if (SyntheticEventCtor && reactEventType)
                  b: {
                    inCapturePhase = getParent;
                    reactEventName = SyntheticEventCtor;
                    instance = reactEventType;
                    lastHostComponent = 0;
                    for (_instance = reactEventName; _instance; _instance = inCapturePhase(_instance))
                      lastHostComponent++;
                    _instance = 0;
                    for (var tempB = instance; tempB; tempB = inCapturePhase(tempB))
                      _instance++;
                    for (; 0 < lastHostComponent - _instance; )
                      reactEventName = inCapturePhase(reactEventName), lastHostComponent--;
                    for (; 0 < _instance - lastHostComponent; )
                      instance = inCapturePhase(instance), _instance--;
                    for (; lastHostComponent--; ) {
                      if (reactEventName === instance || null !== instance && reactEventName === instance.alternate) {
                        inCapturePhase = reactEventName;
                        break b;
                      }
                      reactEventName = inCapturePhase(reactEventName);
                      instance = inCapturePhase(instance);
                    }
                    inCapturePhase = null;
                  }
                else inCapturePhase = null;
                null !== SyntheticEventCtor && accumulateEnterLeaveListenersForEvent(
                  dispatchQueue,
                  reactName,
                  SyntheticEventCtor,
                  inCapturePhase,
                  false
                );
                null !== reactEventType && null !== accumulateTargetOnly && accumulateEnterLeaveListenersForEvent(
                  dispatchQueue,
                  accumulateTargetOnly,
                  reactEventType,
                  inCapturePhase,
                  true
                );
              }
            }
          }
          a: {
            reactName = targetInst ? getNodeFromInstance(targetInst) : window;
            SyntheticEventCtor = reactName.nodeName && reactName.nodeName.toLowerCase();
            if ("select" === SyntheticEventCtor || "input" === SyntheticEventCtor && "file" === reactName.type)
              var getTargetInstFunc = getTargetInstForChangeEvent;
            else if (isTextInputElement(reactName))
              if (isInputEventSupported)
                getTargetInstFunc = getTargetInstForInputOrChangeEvent;
              else {
                getTargetInstFunc = getTargetInstForInputEventPolyfill;
                var handleEventFunc = handleEventsForInputEventPolyfill;
              }
            else
              SyntheticEventCtor = reactName.nodeName, !SyntheticEventCtor || "input" !== SyntheticEventCtor.toLowerCase() || "checkbox" !== reactName.type && "radio" !== reactName.type ? targetInst && isCustomElement(targetInst.elementType) && (getTargetInstFunc = getTargetInstForChangeEvent) : getTargetInstFunc = getTargetInstForClickEvent;
            if (getTargetInstFunc && (getTargetInstFunc = getTargetInstFunc(domEventName, targetInst))) {
              createAndAccumulateChangeEvent(
                dispatchQueue,
                getTargetInstFunc,
                nativeEvent,
                nativeEventTarget
              );
              break a;
            }
            handleEventFunc && handleEventFunc(domEventName, reactName, targetInst);
            "focusout" === domEventName && targetInst && "number" === reactName.type && null != targetInst.memoizedProps.value && setDefaultValue(reactName, "number", reactName.value);
          }
          handleEventFunc = targetInst ? getNodeFromInstance(targetInst) : window;
          switch (domEventName) {
            case "focusin":
              if (isTextInputElement(handleEventFunc) || "true" === handleEventFunc.contentEditable)
                activeElement = handleEventFunc, activeElementInst = targetInst, lastSelection = null;
              break;
            case "focusout":
              lastSelection = activeElementInst = activeElement = null;
              break;
            case "mousedown":
              mouseDown = true;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              mouseDown = false;
              constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget);
              break;
            case "selectionchange":
              if (skipSelectionChangeEvent) break;
            case "keydown":
            case "keyup":
              constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget);
          }
          var fallbackData;
          if (canUseCompositionEvent)
            b: {
              switch (domEventName) {
                case "compositionstart":
                  var eventType = "onCompositionStart";
                  break b;
                case "compositionend":
                  eventType = "onCompositionEnd";
                  break b;
                case "compositionupdate":
                  eventType = "onCompositionUpdate";
                  break b;
              }
              eventType = void 0;
            }
          else
            isComposing ? isFallbackCompositionEnd(domEventName, nativeEvent) && (eventType = "onCompositionEnd") : "keydown" === domEventName && 229 === nativeEvent.keyCode && (eventType = "onCompositionStart");
          eventType && (useFallbackCompositionData && "ko" !== nativeEvent.locale && (isComposing || "onCompositionStart" !== eventType ? "onCompositionEnd" === eventType && isComposing && (fallbackData = getData()) : (root2 = nativeEventTarget, startText = "value" in root2 ? root2.value : root2.textContent, isComposing = true)), handleEventFunc = accumulateTwoPhaseListeners(targetInst, eventType), 0 < handleEventFunc.length && (eventType = new SyntheticCompositionEvent(
            eventType,
            domEventName,
            null,
            nativeEvent,
            nativeEventTarget
          ), dispatchQueue.push({ event: eventType, listeners: handleEventFunc }), fallbackData ? eventType.data = fallbackData : (fallbackData = getDataFromCustomEvent(nativeEvent), null !== fallbackData && (eventType.data = fallbackData))));
          if (fallbackData = canUseTextInputEvent ? getNativeBeforeInputChars(domEventName, nativeEvent) : getFallbackBeforeInputChars(domEventName, nativeEvent))
            eventType = accumulateTwoPhaseListeners(targetInst, "onBeforeInput"), 0 < eventType.length && (handleEventFunc = new SyntheticCompositionEvent(
              "onBeforeInput",
              "beforeinput",
              null,
              nativeEvent,
              nativeEventTarget
            ), dispatchQueue.push({
              event: handleEventFunc,
              listeners: eventType
            }), handleEventFunc.data = fallbackData);
          extractEvents$1(
            dispatchQueue,
            domEventName,
            targetInst,
            nativeEvent,
            nativeEventTarget
          );
        }
        processDispatchQueue(dispatchQueue, eventSystemFlags);
      });
    }
    function createDispatchListener(instance, listener, currentTarget) {
      return {
        instance,
        listener,
        currentTarget
      };
    }
    function accumulateTwoPhaseListeners(targetFiber, reactName) {
      for (var captureName = reactName + "Capture", listeners = []; null !== targetFiber; ) {
        var _instance2 = targetFiber, stateNode = _instance2.stateNode;
        _instance2 = _instance2.tag;
        5 !== _instance2 && 26 !== _instance2 && 27 !== _instance2 || null === stateNode || (_instance2 = getListener(targetFiber, captureName), null != _instance2 && listeners.unshift(
          createDispatchListener(targetFiber, _instance2, stateNode)
        ), _instance2 = getListener(targetFiber, reactName), null != _instance2 && listeners.push(
          createDispatchListener(targetFiber, _instance2, stateNode)
        ));
        if (3 === targetFiber.tag) return listeners;
        targetFiber = targetFiber.return;
      }
      return [];
    }
    function getParent(inst) {
      if (null === inst) return null;
      do
        inst = inst.return;
      while (inst && 5 !== inst.tag && 27 !== inst.tag);
      return inst ? inst : null;
    }
    function accumulateEnterLeaveListenersForEvent(dispatchQueue, event, target, common, inCapturePhase) {
      for (var registrationName = event._reactName, listeners = []; null !== target && target !== common; ) {
        var _instance3 = target, alternate = _instance3.alternate, stateNode = _instance3.stateNode;
        _instance3 = _instance3.tag;
        if (null !== alternate && alternate === common) break;
        5 !== _instance3 && 26 !== _instance3 && 27 !== _instance3 || null === stateNode || (alternate = stateNode, inCapturePhase ? (stateNode = getListener(target, registrationName), null != stateNode && listeners.unshift(
          createDispatchListener(target, stateNode, alternate)
        )) : inCapturePhase || (stateNode = getListener(target, registrationName), null != stateNode && listeners.push(
          createDispatchListener(target, stateNode, alternate)
        )));
        target = target.return;
      }
      0 !== listeners.length && dispatchQueue.push({ event, listeners });
    }
    var NORMALIZE_NEWLINES_REGEX = /\r\n?/g, NORMALIZE_NULL_AND_REPLACEMENT_REGEX = /\u0000|\uFFFD/g;
    function normalizeMarkupForTextOrAttribute(markup) {
      return ("string" === typeof markup ? markup : "" + markup).replace(NORMALIZE_NEWLINES_REGEX, "\n").replace(NORMALIZE_NULL_AND_REPLACEMENT_REGEX, "");
    }
    function checkForUnmatchedText(serverText, clientText) {
      clientText = normalizeMarkupForTextOrAttribute(clientText);
      return normalizeMarkupForTextOrAttribute(serverText) === clientText ? true : false;
    }
    function setProp(domElement, tag, key, value, props, prevValue) {
      switch (key) {
        case "children":
          "string" === typeof value ? "body" === tag || "textarea" === tag && "" === value || setTextContent(domElement, value) : ("number" === typeof value || "bigint" === typeof value) && "body" !== tag && setTextContent(domElement, "" + value);
          break;
        case "className":
          setValueForKnownAttribute(domElement, "class", value);
          break;
        case "tabIndex":
          setValueForKnownAttribute(domElement, "tabindex", value);
          break;
        case "dir":
        case "role":
        case "viewBox":
        case "width":
        case "height":
          setValueForKnownAttribute(domElement, key, value);
          break;
        case "style":
          setValueForStyles(domElement, value, prevValue);
          break;
        case "data":
          if ("object" !== tag) {
            setValueForKnownAttribute(domElement, "data", value);
            break;
          }
        case "src":
        case "href":
          if ("" === value && ("a" !== tag || "href" !== key)) {
            domElement.removeAttribute(key);
            break;
          }
          if (null == value || "function" === typeof value || "symbol" === typeof value || "boolean" === typeof value) {
            domElement.removeAttribute(key);
            break;
          }
          value = sanitizeURL("" + value);
          domElement.setAttribute(key, value);
          break;
        case "action":
        case "formAction":
          if ("function" === typeof value) {
            domElement.setAttribute(
              key,
              "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
            );
            break;
          } else
            "function" === typeof prevValue && ("formAction" === key ? ("input" !== tag && setProp(domElement, tag, "name", props.name, props, null), setProp(
              domElement,
              tag,
              "formEncType",
              props.formEncType,
              props,
              null
            ), setProp(
              domElement,
              tag,
              "formMethod",
              props.formMethod,
              props,
              null
            ), setProp(
              domElement,
              tag,
              "formTarget",
              props.formTarget,
              props,
              null
            )) : (setProp(domElement, tag, "encType", props.encType, props, null), setProp(domElement, tag, "method", props.method, props, null), setProp(domElement, tag, "target", props.target, props, null)));
          if (null == value || "symbol" === typeof value || "boolean" === typeof value) {
            domElement.removeAttribute(key);
            break;
          }
          value = sanitizeURL("" + value);
          domElement.setAttribute(key, value);
          break;
        case "onClick":
          null != value && (domElement.onclick = noop$1);
          break;
        case "onScroll":
          null != value && listenToNonDelegatedEvent("scroll", domElement);
          break;
        case "onScrollEnd":
          null != value && listenToNonDelegatedEvent("scrollend", domElement);
          break;
        case "dangerouslySetInnerHTML":
          if (null != value) {
            if ("object" !== typeof value || !("__html" in value))
              throw Error(formatProdErrorMessage(61));
            key = value.__html;
            if (null != key) {
              if (null != props.children) throw Error(formatProdErrorMessage(60));
              domElement.innerHTML = key;
            }
          }
          break;
        case "multiple":
          domElement.multiple = value && "function" !== typeof value && "symbol" !== typeof value;
          break;
        case "muted":
          domElement.muted = value && "function" !== typeof value && "symbol" !== typeof value;
          break;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "defaultValue":
        case "defaultChecked":
        case "innerHTML":
        case "ref":
          break;
        case "autoFocus":
          break;
        case "xlinkHref":
          if (null == value || "function" === typeof value || "boolean" === typeof value || "symbol" === typeof value) {
            domElement.removeAttribute("xlink:href");
            break;
          }
          key = sanitizeURL("" + value);
          domElement.setAttributeNS(
            "http://www.w3.org/1999/xlink",
            "xlink:href",
            key
          );
          break;
        case "contentEditable":
        case "spellCheck":
        case "draggable":
        case "value":
        case "autoReverse":
        case "externalResourcesRequired":
        case "focusable":
        case "preserveAlpha":
          null != value && "function" !== typeof value && "symbol" !== typeof value ? domElement.setAttribute(key, "" + value) : domElement.removeAttribute(key);
          break;
        case "inert":
        case "allowFullScreen":
        case "async":
        case "autoPlay":
        case "controls":
        case "default":
        case "defer":
        case "disabled":
        case "disablePictureInPicture":
        case "disableRemotePlayback":
        case "formNoValidate":
        case "hidden":
        case "loop":
        case "noModule":
        case "noValidate":
        case "open":
        case "playsInline":
        case "readOnly":
        case "required":
        case "reversed":
        case "scoped":
        case "seamless":
        case "itemScope":
          value && "function" !== typeof value && "symbol" !== typeof value ? domElement.setAttribute(key, "") : domElement.removeAttribute(key);
          break;
        case "capture":
        case "download":
          true === value ? domElement.setAttribute(key, "") : false !== value && null != value && "function" !== typeof value && "symbol" !== typeof value ? domElement.setAttribute(key, value) : domElement.removeAttribute(key);
          break;
        case "cols":
        case "rows":
        case "size":
        case "span":
          null != value && "function" !== typeof value && "symbol" !== typeof value && !isNaN(value) && 1 <= value ? domElement.setAttribute(key, value) : domElement.removeAttribute(key);
          break;
        case "rowSpan":
        case "start":
          null == value || "function" === typeof value || "symbol" === typeof value || isNaN(value) ? domElement.removeAttribute(key) : domElement.setAttribute(key, value);
          break;
        case "popover":
          listenToNonDelegatedEvent("beforetoggle", domElement);
          listenToNonDelegatedEvent("toggle", domElement);
          setValueForAttribute(domElement, "popover", value);
          break;
        case "xlinkActuate":
          setValueForNamespacedAttribute(
            domElement,
            "http://www.w3.org/1999/xlink",
            "xlink:actuate",
            value
          );
          break;
        case "xlinkArcrole":
          setValueForNamespacedAttribute(
            domElement,
            "http://www.w3.org/1999/xlink",
            "xlink:arcrole",
            value
          );
          break;
        case "xlinkRole":
          setValueForNamespacedAttribute(
            domElement,
            "http://www.w3.org/1999/xlink",
            "xlink:role",
            value
          );
          break;
        case "xlinkShow":
          setValueForNamespacedAttribute(
            domElement,
            "http://www.w3.org/1999/xlink",
            "xlink:show",
            value
          );
          break;
        case "xlinkTitle":
          setValueForNamespacedAttribute(
            domElement,
            "http://www.w3.org/1999/xlink",
            "xlink:title",
            value
          );
          break;
        case "xlinkType":
          setValueForNamespacedAttribute(
            domElement,
            "http://www.w3.org/1999/xlink",
            "xlink:type",
            value
          );
          break;
        case "xmlBase":
          setValueForNamespacedAttribute(
            domElement,
            "http://www.w3.org/XML/1998/namespace",
            "xml:base",
            value
          );
          break;
        case "xmlLang":
          setValueForNamespacedAttribute(
            domElement,
            "http://www.w3.org/XML/1998/namespace",
            "xml:lang",
            value
          );
          break;
        case "xmlSpace":
          setValueForNamespacedAttribute(
            domElement,
            "http://www.w3.org/XML/1998/namespace",
            "xml:space",
            value
          );
          break;
        case "is":
          setValueForAttribute(domElement, "is", value);
          break;
        case "innerText":
        case "textContent":
          break;
        default:
          if (!(2 < key.length) || "o" !== key[0] && "O" !== key[0] || "n" !== key[1] && "N" !== key[1])
            key = aliases.get(key) || key, setValueForAttribute(domElement, key, value);
      }
    }
    function setPropOnCustomElement(domElement, tag, key, value, props, prevValue) {
      switch (key) {
        case "style":
          setValueForStyles(domElement, value, prevValue);
          break;
        case "dangerouslySetInnerHTML":
          if (null != value) {
            if ("object" !== typeof value || !("__html" in value))
              throw Error(formatProdErrorMessage(61));
            key = value.__html;
            if (null != key) {
              if (null != props.children) throw Error(formatProdErrorMessage(60));
              domElement.innerHTML = key;
            }
          }
          break;
        case "children":
          "string" === typeof value ? setTextContent(domElement, value) : ("number" === typeof value || "bigint" === typeof value) && setTextContent(domElement, "" + value);
          break;
        case "onScroll":
          null != value && listenToNonDelegatedEvent("scroll", domElement);
          break;
        case "onScrollEnd":
          null != value && listenToNonDelegatedEvent("scrollend", domElement);
          break;
        case "onClick":
          null != value && (domElement.onclick = noop$1);
          break;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "innerHTML":
        case "ref":
          break;
        case "innerText":
        case "textContent":
          break;
        default:
          if (!registrationNameDependencies.hasOwnProperty(key))
            a: {
              if ("o" === key[0] && "n" === key[1] && (props = key.endsWith("Capture"), tag = key.slice(2, props ? key.length - 7 : void 0), prevValue = domElement[internalPropsKey] || null, prevValue = null != prevValue ? prevValue[key] : null, "function" === typeof prevValue && domElement.removeEventListener(tag, prevValue, props), "function" === typeof value)) {
                "function" !== typeof prevValue && null !== prevValue && (key in domElement ? domElement[key] = null : domElement.hasAttribute(key) && domElement.removeAttribute(key));
                domElement.addEventListener(tag, value, props);
                break a;
              }
              key in domElement ? domElement[key] = value : true === value ? domElement.setAttribute(key, "") : setValueForAttribute(domElement, key, value);
            }
      }
    }
    function setInitialProperties(domElement, tag, props) {
      switch (tag) {
        case "div":
        case "span":
        case "svg":
        case "path":
        case "a":
        case "g":
        case "p":
        case "li":
          break;
        case "img":
          listenToNonDelegatedEvent("error", domElement);
          listenToNonDelegatedEvent("load", domElement);
          var hasSrc = false, hasSrcSet = false, propKey;
          for (propKey in props)
            if (props.hasOwnProperty(propKey)) {
              var propValue = props[propKey];
              if (null != propValue)
                switch (propKey) {
                  case "src":
                    hasSrc = true;
                    break;
                  case "srcSet":
                    hasSrcSet = true;
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw Error(formatProdErrorMessage(137, tag));
                  default:
                    setProp(domElement, tag, propKey, propValue, props, null);
                }
            }
          hasSrcSet && setProp(domElement, tag, "srcSet", props.srcSet, props, null);
          hasSrc && setProp(domElement, tag, "src", props.src, props, null);
          return;
        case "input":
          listenToNonDelegatedEvent("invalid", domElement);
          var defaultValue = propKey = propValue = hasSrcSet = null, checked = null, defaultChecked = null;
          for (hasSrc in props)
            if (props.hasOwnProperty(hasSrc)) {
              var propValue$184 = props[hasSrc];
              if (null != propValue$184)
                switch (hasSrc) {
                  case "name":
                    hasSrcSet = propValue$184;
                    break;
                  case "type":
                    propValue = propValue$184;
                    break;
                  case "checked":
                    checked = propValue$184;
                    break;
                  case "defaultChecked":
                    defaultChecked = propValue$184;
                    break;
                  case "value":
                    propKey = propValue$184;
                    break;
                  case "defaultValue":
                    defaultValue = propValue$184;
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    if (null != propValue$184)
                      throw Error(formatProdErrorMessage(137, tag));
                    break;
                  default:
                    setProp(domElement, tag, hasSrc, propValue$184, props, null);
                }
            }
          initInput(
            domElement,
            propKey,
            defaultValue,
            checked,
            defaultChecked,
            propValue,
            hasSrcSet,
            false
          );
          return;
        case "select":
          listenToNonDelegatedEvent("invalid", domElement);
          hasSrc = propValue = propKey = null;
          for (hasSrcSet in props)
            if (props.hasOwnProperty(hasSrcSet) && (defaultValue = props[hasSrcSet], null != defaultValue))
              switch (hasSrcSet) {
                case "value":
                  propKey = defaultValue;
                  break;
                case "defaultValue":
                  propValue = defaultValue;
                  break;
                case "multiple":
                  hasSrc = defaultValue;
                default:
                  setProp(domElement, tag, hasSrcSet, defaultValue, props, null);
              }
          tag = propKey;
          props = propValue;
          domElement.multiple = !!hasSrc;
          null != tag ? updateOptions(domElement, !!hasSrc, tag, false) : null != props && updateOptions(domElement, !!hasSrc, props, true);
          return;
        case "textarea":
          listenToNonDelegatedEvent("invalid", domElement);
          propKey = hasSrcSet = hasSrc = null;
          for (propValue in props)
            if (props.hasOwnProperty(propValue) && (defaultValue = props[propValue], null != defaultValue))
              switch (propValue) {
                case "value":
                  hasSrc = defaultValue;
                  break;
                case "defaultValue":
                  hasSrcSet = defaultValue;
                  break;
                case "children":
                  propKey = defaultValue;
                  break;
                case "dangerouslySetInnerHTML":
                  if (null != defaultValue) throw Error(formatProdErrorMessage(91));
                  break;
                default:
                  setProp(domElement, tag, propValue, defaultValue, props, null);
              }
          initTextarea(domElement, hasSrc, hasSrcSet, propKey);
          return;
        case "option":
          for (checked in props)
            if (props.hasOwnProperty(checked) && (hasSrc = props[checked], null != hasSrc))
              switch (checked) {
                case "selected":
                  domElement.selected = hasSrc && "function" !== typeof hasSrc && "symbol" !== typeof hasSrc;
                  break;
                default:
                  setProp(domElement, tag, checked, hasSrc, props, null);
              }
          return;
        case "dialog":
          listenToNonDelegatedEvent("beforetoggle", domElement);
          listenToNonDelegatedEvent("toggle", domElement);
          listenToNonDelegatedEvent("cancel", domElement);
          listenToNonDelegatedEvent("close", domElement);
          break;
        case "iframe":
        case "object":
          listenToNonDelegatedEvent("load", domElement);
          break;
        case "video":
        case "audio":
          for (hasSrc = 0; hasSrc < mediaEventTypes.length; hasSrc++)
            listenToNonDelegatedEvent(mediaEventTypes[hasSrc], domElement);
          break;
        case "image":
          listenToNonDelegatedEvent("error", domElement);
          listenToNonDelegatedEvent("load", domElement);
          break;
        case "details":
          listenToNonDelegatedEvent("toggle", domElement);
          break;
        case "embed":
        case "source":
        case "link":
          listenToNonDelegatedEvent("error", domElement), listenToNonDelegatedEvent("load", domElement);
        case "area":
        case "base":
        case "br":
        case "col":
        case "hr":
        case "keygen":
        case "meta":
        case "param":
        case "track":
        case "wbr":
        case "menuitem":
          for (defaultChecked in props)
            if (props.hasOwnProperty(defaultChecked) && (hasSrc = props[defaultChecked], null != hasSrc))
              switch (defaultChecked) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(formatProdErrorMessage(137, tag));
                default:
                  setProp(domElement, tag, defaultChecked, hasSrc, props, null);
              }
          return;
        default:
          if (isCustomElement(tag)) {
            for (propValue$184 in props)
              props.hasOwnProperty(propValue$184) && (hasSrc = props[propValue$184], void 0 !== hasSrc && setPropOnCustomElement(
                domElement,
                tag,
                propValue$184,
                hasSrc,
                props,
                void 0
              ));
            return;
          }
      }
      for (defaultValue in props)
        props.hasOwnProperty(defaultValue) && (hasSrc = props[defaultValue], null != hasSrc && setProp(domElement, tag, defaultValue, hasSrc, props, null));
    }
    function updateProperties(domElement, tag, lastProps, nextProps) {
      switch (tag) {
        case "div":
        case "span":
        case "svg":
        case "path":
        case "a":
        case "g":
        case "p":
        case "li":
          break;
        case "input":
          var name = null, type = null, value = null, defaultValue = null, lastDefaultValue = null, checked = null, defaultChecked = null;
          for (propKey in lastProps) {
            var lastProp = lastProps[propKey];
            if (lastProps.hasOwnProperty(propKey) && null != lastProp)
              switch (propKey) {
                case "checked":
                  break;
                case "value":
                  break;
                case "defaultValue":
                  lastDefaultValue = lastProp;
                default:
                  nextProps.hasOwnProperty(propKey) || setProp(domElement, tag, propKey, null, nextProps, lastProp);
              }
          }
          for (var propKey$201 in nextProps) {
            var propKey = nextProps[propKey$201];
            lastProp = lastProps[propKey$201];
            if (nextProps.hasOwnProperty(propKey$201) && (null != propKey || null != lastProp))
              switch (propKey$201) {
                case "type":
                  type = propKey;
                  break;
                case "name":
                  name = propKey;
                  break;
                case "checked":
                  checked = propKey;
                  break;
                case "defaultChecked":
                  defaultChecked = propKey;
                  break;
                case "value":
                  value = propKey;
                  break;
                case "defaultValue":
                  defaultValue = propKey;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (null != propKey)
                    throw Error(formatProdErrorMessage(137, tag));
                  break;
                default:
                  propKey !== lastProp && setProp(
                    domElement,
                    tag,
                    propKey$201,
                    propKey,
                    nextProps,
                    lastProp
                  );
              }
          }
          updateInput(
            domElement,
            value,
            defaultValue,
            lastDefaultValue,
            checked,
            defaultChecked,
            type,
            name
          );
          return;
        case "select":
          propKey = value = defaultValue = propKey$201 = null;
          for (type in lastProps)
            if (lastDefaultValue = lastProps[type], lastProps.hasOwnProperty(type) && null != lastDefaultValue)
              switch (type) {
                case "value":
                  break;
                case "multiple":
                  propKey = lastDefaultValue;
                default:
                  nextProps.hasOwnProperty(type) || setProp(
                    domElement,
                    tag,
                    type,
                    null,
                    nextProps,
                    lastDefaultValue
                  );
              }
          for (name in nextProps)
            if (type = nextProps[name], lastDefaultValue = lastProps[name], nextProps.hasOwnProperty(name) && (null != type || null != lastDefaultValue))
              switch (name) {
                case "value":
                  propKey$201 = type;
                  break;
                case "defaultValue":
                  defaultValue = type;
                  break;
                case "multiple":
                  value = type;
                default:
                  type !== lastDefaultValue && setProp(
                    domElement,
                    tag,
                    name,
                    type,
                    nextProps,
                    lastDefaultValue
                  );
              }
          tag = defaultValue;
          lastProps = value;
          nextProps = propKey;
          null != propKey$201 ? updateOptions(domElement, !!lastProps, propKey$201, false) : !!nextProps !== !!lastProps && (null != tag ? updateOptions(domElement, !!lastProps, tag, true) : updateOptions(domElement, !!lastProps, lastProps ? [] : "", false));
          return;
        case "textarea":
          propKey = propKey$201 = null;
          for (defaultValue in lastProps)
            if (name = lastProps[defaultValue], lastProps.hasOwnProperty(defaultValue) && null != name && !nextProps.hasOwnProperty(defaultValue))
              switch (defaultValue) {
                case "value":
                  break;
                case "children":
                  break;
                default:
                  setProp(domElement, tag, defaultValue, null, nextProps, name);
              }
          for (value in nextProps)
            if (name = nextProps[value], type = lastProps[value], nextProps.hasOwnProperty(value) && (null != name || null != type))
              switch (value) {
                case "value":
                  propKey$201 = name;
                  break;
                case "defaultValue":
                  propKey = name;
                  break;
                case "children":
                  break;
                case "dangerouslySetInnerHTML":
                  if (null != name) throw Error(formatProdErrorMessage(91));
                  break;
                default:
                  name !== type && setProp(domElement, tag, value, name, nextProps, type);
              }
          updateTextarea(domElement, propKey$201, propKey);
          return;
        case "option":
          for (var propKey$217 in lastProps)
            if (propKey$201 = lastProps[propKey$217], lastProps.hasOwnProperty(propKey$217) && null != propKey$201 && !nextProps.hasOwnProperty(propKey$217))
              switch (propKey$217) {
                case "selected":
                  domElement.selected = false;
                  break;
                default:
                  setProp(
                    domElement,
                    tag,
                    propKey$217,
                    null,
                    nextProps,
                    propKey$201
                  );
              }
          for (lastDefaultValue in nextProps)
            if (propKey$201 = nextProps[lastDefaultValue], propKey = lastProps[lastDefaultValue], nextProps.hasOwnProperty(lastDefaultValue) && propKey$201 !== propKey && (null != propKey$201 || null != propKey))
              switch (lastDefaultValue) {
                case "selected":
                  domElement.selected = propKey$201 && "function" !== typeof propKey$201 && "symbol" !== typeof propKey$201;
                  break;
                default:
                  setProp(
                    domElement,
                    tag,
                    lastDefaultValue,
                    propKey$201,
                    nextProps,
                    propKey
                  );
              }
          return;
        case "img":
        case "link":
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "keygen":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
        case "menuitem":
          for (var propKey$222 in lastProps)
            propKey$201 = lastProps[propKey$222], lastProps.hasOwnProperty(propKey$222) && null != propKey$201 && !nextProps.hasOwnProperty(propKey$222) && setProp(domElement, tag, propKey$222, null, nextProps, propKey$201);
          for (checked in nextProps)
            if (propKey$201 = nextProps[checked], propKey = lastProps[checked], nextProps.hasOwnProperty(checked) && propKey$201 !== propKey && (null != propKey$201 || null != propKey))
              switch (checked) {
                case "children":
                case "dangerouslySetInnerHTML":
                  if (null != propKey$201)
                    throw Error(formatProdErrorMessage(137, tag));
                  break;
                default:
                  setProp(
                    domElement,
                    tag,
                    checked,
                    propKey$201,
                    nextProps,
                    propKey
                  );
              }
          return;
        default:
          if (isCustomElement(tag)) {
            for (var propKey$227 in lastProps)
              propKey$201 = lastProps[propKey$227], lastProps.hasOwnProperty(propKey$227) && void 0 !== propKey$201 && !nextProps.hasOwnProperty(propKey$227) && setPropOnCustomElement(
                domElement,
                tag,
                propKey$227,
                void 0,
                nextProps,
                propKey$201
              );
            for (defaultChecked in nextProps)
              propKey$201 = nextProps[defaultChecked], propKey = lastProps[defaultChecked], !nextProps.hasOwnProperty(defaultChecked) || propKey$201 === propKey || void 0 === propKey$201 && void 0 === propKey || setPropOnCustomElement(
                domElement,
                tag,
                defaultChecked,
                propKey$201,
                nextProps,
                propKey
              );
            return;
          }
      }
      for (var propKey$232 in lastProps)
        propKey$201 = lastProps[propKey$232], lastProps.hasOwnProperty(propKey$232) && null != propKey$201 && !nextProps.hasOwnProperty(propKey$232) && setProp(domElement, tag, propKey$232, null, nextProps, propKey$201);
      for (lastProp in nextProps)
        propKey$201 = nextProps[lastProp], propKey = lastProps[lastProp], !nextProps.hasOwnProperty(lastProp) || propKey$201 === propKey || null == propKey$201 && null == propKey || setProp(domElement, tag, lastProp, propKey$201, nextProps, propKey);
    }
    function isLikelyStaticResource(initiatorType) {
      switch (initiatorType) {
        case "css":
        case "script":
        case "font":
        case "img":
        case "image":
        case "input":
        case "link":
          return true;
        default:
          return false;
      }
    }
    function estimateBandwidth() {
      if ("function" === typeof performance.getEntriesByType) {
        for (var count = 0, bits = 0, resourceEntries = performance.getEntriesByType("resource"), i = 0; i < resourceEntries.length; i++) {
          var entry = resourceEntries[i], transferSize = entry.transferSize, initiatorType = entry.initiatorType, duration = entry.duration;
          if (transferSize && duration && isLikelyStaticResource(initiatorType)) {
            initiatorType = 0;
            duration = entry.responseEnd;
            for (i += 1; i < resourceEntries.length; i++) {
              var overlapEntry = resourceEntries[i], overlapStartTime = overlapEntry.startTime;
              if (overlapStartTime > duration) break;
              var overlapTransferSize = overlapEntry.transferSize, overlapInitiatorType = overlapEntry.initiatorType;
              overlapTransferSize && isLikelyStaticResource(overlapInitiatorType) && (overlapEntry = overlapEntry.responseEnd, initiatorType += overlapTransferSize * (overlapEntry < duration ? 1 : (duration - overlapStartTime) / (overlapEntry - overlapStartTime)));
            }
            --i;
            bits += 8 * (transferSize + initiatorType) / (entry.duration / 1e3);
            count++;
            if (10 < count) break;
          }
        }
        if (0 < count) return bits / count / 1e6;
      }
      return navigator.connection && (count = navigator.connection.downlink, "number" === typeof count) ? count : 5;
    }
    var eventsEnabled = null, selectionInformation = null;
    function getOwnerDocumentFromRootContainer(rootContainerElement) {
      return 9 === rootContainerElement.nodeType ? rootContainerElement : rootContainerElement.ownerDocument;
    }
    function getOwnHostContext(namespaceURI) {
      switch (namespaceURI) {
        case "http://www.w3.org/2000/svg":
          return 1;
        case "http://www.w3.org/1998/Math/MathML":
          return 2;
        default:
          return 0;
      }
    }
    function getChildHostContextProd(parentNamespace, type) {
      if (0 === parentNamespace)
        switch (type) {
          case "svg":
            return 1;
          case "math":
            return 2;
          default:
            return 0;
        }
      return 1 === parentNamespace && "foreignObject" === type ? 0 : parentNamespace;
    }
    function shouldSetTextContent(type, props) {
      return "textarea" === type || "noscript" === type || "string" === typeof props.children || "number" === typeof props.children || "bigint" === typeof props.children || "object" === typeof props.dangerouslySetInnerHTML && null !== props.dangerouslySetInnerHTML && null != props.dangerouslySetInnerHTML.__html;
    }
    var currentPopstateTransitionEvent = null;
    function shouldAttemptEagerTransition() {
      var event = window.event;
      if (event && "popstate" === event.type) {
        if (event === currentPopstateTransitionEvent) return false;
        currentPopstateTransitionEvent = event;
        return true;
      }
      currentPopstateTransitionEvent = null;
      return false;
    }
    var scheduleTimeout = "function" === typeof setTimeout ? setTimeout : void 0, cancelTimeout = "function" === typeof clearTimeout ? clearTimeout : void 0, localPromise = "function" === typeof Promise ? Promise : void 0, scheduleMicrotask = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof localPromise ? function(callback) {
      return localPromise.resolve(null).then(callback).catch(handleErrorInNextTick);
    } : scheduleTimeout;
    function handleErrorInNextTick(error) {
      setTimeout(function() {
        throw error;
      });
    }
    function isSingletonScope(type) {
      return "head" === type;
    }
    function clearHydrationBoundary(parentInstance, hydrationInstance) {
      var node = hydrationInstance, depth = 0;
      do {
        var nextNode = node.nextSibling;
        parentInstance.removeChild(node);
        if (nextNode && 8 === nextNode.nodeType)
          if (node = nextNode.data, "/$" === node || "/&" === node) {
            if (0 === depth) {
              parentInstance.removeChild(nextNode);
              retryIfBlockedOn(hydrationInstance);
              return;
            }
            depth--;
          } else if ("$" === node || "$?" === node || "$~" === node || "$!" === node || "&" === node)
            depth++;
          else if ("html" === node)
            releaseSingletonInstance(parentInstance.ownerDocument.documentElement);
          else if ("head" === node) {
            node = parentInstance.ownerDocument.head;
            releaseSingletonInstance(node);
            for (var node$jscomp$0 = node.firstChild; node$jscomp$0; ) {
              var nextNode$jscomp$0 = node$jscomp$0.nextSibling, nodeName = node$jscomp$0.nodeName;
              node$jscomp$0[internalHoistableMarker] || "SCRIPT" === nodeName || "STYLE" === nodeName || "LINK" === nodeName && "stylesheet" === node$jscomp$0.rel.toLowerCase() || node.removeChild(node$jscomp$0);
              node$jscomp$0 = nextNode$jscomp$0;
            }
          } else
            "body" === node && releaseSingletonInstance(parentInstance.ownerDocument.body);
        node = nextNode;
      } while (node);
      retryIfBlockedOn(hydrationInstance);
    }
    function hideOrUnhideDehydratedBoundary(suspenseInstance, isHidden) {
      var node = suspenseInstance;
      suspenseInstance = 0;
      do {
        var nextNode = node.nextSibling;
        1 === node.nodeType ? isHidden ? (node._stashedDisplay = node.style.display, node.style.display = "none") : (node.style.display = node._stashedDisplay || "", "" === node.getAttribute("style") && node.removeAttribute("style")) : 3 === node.nodeType && (isHidden ? (node._stashedText = node.nodeValue, node.nodeValue = "") : node.nodeValue = node._stashedText || "");
        if (nextNode && 8 === nextNode.nodeType)
          if (node = nextNode.data, "/$" === node)
            if (0 === suspenseInstance) break;
            else suspenseInstance--;
          else
            "$" !== node && "$?" !== node && "$~" !== node && "$!" !== node || suspenseInstance++;
        node = nextNode;
      } while (node);
    }
    function clearContainerSparingly(container) {
      var nextNode = container.firstChild;
      nextNode && 10 === nextNode.nodeType && (nextNode = nextNode.nextSibling);
      for (; nextNode; ) {
        var node = nextNode;
        nextNode = nextNode.nextSibling;
        switch (node.nodeName) {
          case "HTML":
          case "HEAD":
          case "BODY":
            clearContainerSparingly(node);
            detachDeletedInstance(node);
            continue;
          case "SCRIPT":
          case "STYLE":
            continue;
          case "LINK":
            if ("stylesheet" === node.rel.toLowerCase()) continue;
        }
        container.removeChild(node);
      }
    }
    function canHydrateInstance(instance, type, props, inRootOrSingleton) {
      for (; 1 === instance.nodeType; ) {
        var anyProps = props;
        if (instance.nodeName.toLowerCase() !== type.toLowerCase()) {
          if (!inRootOrSingleton && ("INPUT" !== instance.nodeName || "hidden" !== instance.type))
            break;
        } else if (!inRootOrSingleton)
          if ("input" === type && "hidden" === instance.type) {
            var name = null == anyProps.name ? null : "" + anyProps.name;
            if ("hidden" === anyProps.type && instance.getAttribute("name") === name)
              return instance;
          } else return instance;
        else if (!instance[internalHoistableMarker])
          switch (type) {
            case "meta":
              if (!instance.hasAttribute("itemprop")) break;
              return instance;
            case "link":
              name = instance.getAttribute("rel");
              if ("stylesheet" === name && instance.hasAttribute("data-precedence"))
                break;
              else if (name !== anyProps.rel || instance.getAttribute("href") !== (null == anyProps.href || "" === anyProps.href ? null : anyProps.href) || instance.getAttribute("crossorigin") !== (null == anyProps.crossOrigin ? null : anyProps.crossOrigin) || instance.getAttribute("title") !== (null == anyProps.title ? null : anyProps.title))
                break;
              return instance;
            case "style":
              if (instance.hasAttribute("data-precedence")) break;
              return instance;
            case "script":
              name = instance.getAttribute("src");
              if ((name !== (null == anyProps.src ? null : anyProps.src) || instance.getAttribute("type") !== (null == anyProps.type ? null : anyProps.type) || instance.getAttribute("crossorigin") !== (null == anyProps.crossOrigin ? null : anyProps.crossOrigin)) && name && instance.hasAttribute("async") && !instance.hasAttribute("itemprop"))
                break;
              return instance;
            default:
              return instance;
          }
        instance = getNextHydratable(instance.nextSibling);
        if (null === instance) break;
      }
      return null;
    }
    function canHydrateTextInstance(instance, text, inRootOrSingleton) {
      if ("" === text) return null;
      for (; 3 !== instance.nodeType; ) {
        if ((1 !== instance.nodeType || "INPUT" !== instance.nodeName || "hidden" !== instance.type) && !inRootOrSingleton)
          return null;
        instance = getNextHydratable(instance.nextSibling);
        if (null === instance) return null;
      }
      return instance;
    }
    function canHydrateHydrationBoundary(instance, inRootOrSingleton) {
      for (; 8 !== instance.nodeType; ) {
        if ((1 !== instance.nodeType || "INPUT" !== instance.nodeName || "hidden" !== instance.type) && !inRootOrSingleton)
          return null;
        instance = getNextHydratable(instance.nextSibling);
        if (null === instance) return null;
      }
      return instance;
    }
    function isSuspenseInstancePending(instance) {
      return "$?" === instance.data || "$~" === instance.data;
    }
    function isSuspenseInstanceFallback(instance) {
      return "$!" === instance.data || "$?" === instance.data && "loading" !== instance.ownerDocument.readyState;
    }
    function registerSuspenseInstanceRetry(instance, callback) {
      var ownerDocument = instance.ownerDocument;
      if ("$~" === instance.data) instance._reactRetry = callback;
      else if ("$?" !== instance.data || "loading" !== ownerDocument.readyState)
        callback();
      else {
        var listener = function() {
          callback();
          ownerDocument.removeEventListener("DOMContentLoaded", listener);
        };
        ownerDocument.addEventListener("DOMContentLoaded", listener);
        instance._reactRetry = listener;
      }
    }
    function getNextHydratable(node) {
      for (; null != node; node = node.nextSibling) {
        var nodeType = node.nodeType;
        if (1 === nodeType || 3 === nodeType) break;
        if (8 === nodeType) {
          nodeType = node.data;
          if ("$" === nodeType || "$!" === nodeType || "$?" === nodeType || "$~" === nodeType || "&" === nodeType || "F!" === nodeType || "F" === nodeType)
            break;
          if ("/$" === nodeType || "/&" === nodeType) return null;
        }
      }
      return node;
    }
    var previousHydratableOnEnteringScopedSingleton = null;
    function getNextHydratableInstanceAfterHydrationBoundary(hydrationInstance) {
      hydrationInstance = hydrationInstance.nextSibling;
      for (var depth = 0; hydrationInstance; ) {
        if (8 === hydrationInstance.nodeType) {
          var data = hydrationInstance.data;
          if ("/$" === data || "/&" === data) {
            if (0 === depth)
              return getNextHydratable(hydrationInstance.nextSibling);
            depth--;
          } else
            "$" !== data && "$!" !== data && "$?" !== data && "$~" !== data && "&" !== data || depth++;
        }
        hydrationInstance = hydrationInstance.nextSibling;
      }
      return null;
    }
    function getParentHydrationBoundary(targetInstance) {
      targetInstance = targetInstance.previousSibling;
      for (var depth = 0; targetInstance; ) {
        if (8 === targetInstance.nodeType) {
          var data = targetInstance.data;
          if ("$" === data || "$!" === data || "$?" === data || "$~" === data || "&" === data) {
            if (0 === depth) return targetInstance;
            depth--;
          } else "/$" !== data && "/&" !== data || depth++;
        }
        targetInstance = targetInstance.previousSibling;
      }
      return null;
    }
    function resolveSingletonInstance(type, props, rootContainerInstance) {
      props = getOwnerDocumentFromRootContainer(rootContainerInstance);
      switch (type) {
        case "html":
          type = props.documentElement;
          if (!type) throw Error(formatProdErrorMessage(452));
          return type;
        case "head":
          type = props.head;
          if (!type) throw Error(formatProdErrorMessage(453));
          return type;
        case "body":
          type = props.body;
          if (!type) throw Error(formatProdErrorMessage(454));
          return type;
        default:
          throw Error(formatProdErrorMessage(451));
      }
    }
    function releaseSingletonInstance(instance) {
      for (var attributes = instance.attributes; attributes.length; )
        instance.removeAttributeNode(attributes[0]);
      detachDeletedInstance(instance);
    }
    var preloadPropsMap = /* @__PURE__ */ new Map(), preconnectsSet = /* @__PURE__ */ new Set();
    function getHoistableRoot(container) {
      return "function" === typeof container.getRootNode ? container.getRootNode() : 9 === container.nodeType ? container : container.ownerDocument;
    }
    var previousDispatcher = ReactDOMSharedInternals.d;
    ReactDOMSharedInternals.d = {
      f: flushSyncWork,
      r: requestFormReset,
      D: prefetchDNS,
      C: preconnect,
      L: preload2,
      m: preloadModule,
      X: preinitScript,
      S: preinitStyle,
      M: preinitModuleScript
    };
    function flushSyncWork() {
      var previousWasRendering = previousDispatcher.f(), wasRendering = flushSyncWork$1();
      return previousWasRendering || wasRendering;
    }
    function requestFormReset(form) {
      var formInst = getInstanceFromNode(form);
      null !== formInst && 5 === formInst.tag && "form" === formInst.type ? requestFormReset$1(formInst) : previousDispatcher.r(form);
    }
    var globalDocument = "undefined" === typeof document ? null : document;
    function preconnectAs(rel, href, crossOrigin) {
      var ownerDocument = globalDocument;
      if (ownerDocument && "string" === typeof href && href) {
        var limitedEscapedHref = escapeSelectorAttributeValueInsideDoubleQuotes(href);
        limitedEscapedHref = 'link[rel="' + rel + '"][href="' + limitedEscapedHref + '"]';
        "string" === typeof crossOrigin && (limitedEscapedHref += '[crossorigin="' + crossOrigin + '"]');
        preconnectsSet.has(limitedEscapedHref) || (preconnectsSet.add(limitedEscapedHref), rel = { rel, crossOrigin, href }, null === ownerDocument.querySelector(limitedEscapedHref) && (href = ownerDocument.createElement("link"), setInitialProperties(href, "link", rel), markNodeAsHoistable(href), ownerDocument.head.appendChild(href)));
      }
    }
    function prefetchDNS(href) {
      previousDispatcher.D(href);
      preconnectAs("dns-prefetch", href, null);
    }
    function preconnect(href, crossOrigin) {
      previousDispatcher.C(href, crossOrigin);
      preconnectAs("preconnect", href, crossOrigin);
    }
    function preload2(href, as, options2) {
      previousDispatcher.L(href, as, options2);
      var ownerDocument = globalDocument;
      if (ownerDocument && href && as) {
        var preloadSelector = 'link[rel="preload"][as="' + escapeSelectorAttributeValueInsideDoubleQuotes(as) + '"]';
        "image" === as ? options2 && options2.imageSrcSet ? (preloadSelector += '[imagesrcset="' + escapeSelectorAttributeValueInsideDoubleQuotes(
          options2.imageSrcSet
        ) + '"]', "string" === typeof options2.imageSizes && (preloadSelector += '[imagesizes="' + escapeSelectorAttributeValueInsideDoubleQuotes(
          options2.imageSizes
        ) + '"]')) : preloadSelector += '[href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"]' : preloadSelector += '[href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"]';
        var key = preloadSelector;
        switch (as) {
          case "style":
            key = getStyleKey(href);
            break;
          case "script":
            key = getScriptKey(href);
        }
        preloadPropsMap.has(key) || (href = assign(
          {
            rel: "preload",
            href: "image" === as && options2 && options2.imageSrcSet ? void 0 : href,
            as
          },
          options2
        ), preloadPropsMap.set(key, href), null !== ownerDocument.querySelector(preloadSelector) || "style" === as && ownerDocument.querySelector(getStylesheetSelectorFromKey(key)) || "script" === as && ownerDocument.querySelector(getScriptSelectorFromKey(key)) || (as = ownerDocument.createElement("link"), setInitialProperties(as, "link", href), markNodeAsHoistable(as), ownerDocument.head.appendChild(as)));
      }
    }
    function preloadModule(href, options2) {
      previousDispatcher.m(href, options2);
      var ownerDocument = globalDocument;
      if (ownerDocument && href) {
        var as = options2 && "string" === typeof options2.as ? options2.as : "script", preloadSelector = 'link[rel="modulepreload"][as="' + escapeSelectorAttributeValueInsideDoubleQuotes(as) + '"][href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"]', key = preloadSelector;
        switch (as) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            key = getScriptKey(href);
        }
        if (!preloadPropsMap.has(key) && (href = assign({ rel: "modulepreload", href }, options2), preloadPropsMap.set(key, href), null === ownerDocument.querySelector(preloadSelector))) {
          switch (as) {
            case "audioworklet":
            case "paintworklet":
            case "serviceworker":
            case "sharedworker":
            case "worker":
            case "script":
              if (ownerDocument.querySelector(getScriptSelectorFromKey(key)))
                return;
          }
          as = ownerDocument.createElement("link");
          setInitialProperties(as, "link", href);
          markNodeAsHoistable(as);
          ownerDocument.head.appendChild(as);
        }
      }
    }
    function preinitStyle(href, precedence, options2) {
      previousDispatcher.S(href, precedence, options2);
      var ownerDocument = globalDocument;
      if (ownerDocument && href) {
        var styles2 = getResourcesFromRoot(ownerDocument).hoistableStyles, key = getStyleKey(href);
        precedence = precedence || "default";
        var resource = styles2.get(key);
        if (!resource) {
          var state = { loading: 0, preload: null };
          if (resource = ownerDocument.querySelector(
            getStylesheetSelectorFromKey(key)
          ))
            state.loading = 5;
          else {
            href = assign(
              { rel: "stylesheet", href, "data-precedence": precedence },
              options2
            );
            (options2 = preloadPropsMap.get(key)) && adoptPreloadPropsForStylesheet(href, options2);
            var link = resource = ownerDocument.createElement("link");
            markNodeAsHoistable(link);
            setInitialProperties(link, "link", href);
            link._p = new Promise(function(resolve, reject) {
              link.onload = resolve;
              link.onerror = reject;
            });
            link.addEventListener("load", function() {
              state.loading |= 1;
            });
            link.addEventListener("error", function() {
              state.loading |= 2;
            });
            state.loading |= 4;
            insertStylesheet(resource, precedence, ownerDocument);
          }
          resource = {
            type: "stylesheet",
            instance: resource,
            count: 1,
            state
          };
          styles2.set(key, resource);
        }
      }
    }
    function preinitScript(src, options2) {
      previousDispatcher.X(src, options2);
      var ownerDocument = globalDocument;
      if (ownerDocument && src) {
        var scripts = getResourcesFromRoot(ownerDocument).hoistableScripts, key = getScriptKey(src), resource = scripts.get(key);
        resource || (resource = ownerDocument.querySelector(getScriptSelectorFromKey(key)), resource || (src = assign({ src, async: true }, options2), (options2 = preloadPropsMap.get(key)) && adoptPreloadPropsForScript(src, options2), resource = ownerDocument.createElement("script"), markNodeAsHoistable(resource), setInitialProperties(resource, "link", src), ownerDocument.head.appendChild(resource)), resource = {
          type: "script",
          instance: resource,
          count: 1,
          state: null
        }, scripts.set(key, resource));
      }
    }
    function preinitModuleScript(src, options2) {
      previousDispatcher.M(src, options2);
      var ownerDocument = globalDocument;
      if (ownerDocument && src) {
        var scripts = getResourcesFromRoot(ownerDocument).hoistableScripts, key = getScriptKey(src), resource = scripts.get(key);
        resource || (resource = ownerDocument.querySelector(getScriptSelectorFromKey(key)), resource || (src = assign({ src, async: true, type: "module" }, options2), (options2 = preloadPropsMap.get(key)) && adoptPreloadPropsForScript(src, options2), resource = ownerDocument.createElement("script"), markNodeAsHoistable(resource), setInitialProperties(resource, "link", src), ownerDocument.head.appendChild(resource)), resource = {
          type: "script",
          instance: resource,
          count: 1,
          state: null
        }, scripts.set(key, resource));
      }
    }
    function getResource(type, currentProps, pendingProps, currentResource) {
      var JSCompiler_inline_result = (JSCompiler_inline_result = rootInstanceStackCursor.current) ? getHoistableRoot(JSCompiler_inline_result) : null;
      if (!JSCompiler_inline_result) throw Error(formatProdErrorMessage(446));
      switch (type) {
        case "meta":
        case "title":
          return null;
        case "style":
          return "string" === typeof pendingProps.precedence && "string" === typeof pendingProps.href ? (currentProps = getStyleKey(pendingProps.href), pendingProps = getResourcesFromRoot(
            JSCompiler_inline_result
          ).hoistableStyles, currentResource = pendingProps.get(currentProps), currentResource || (currentResource = {
            type: "style",
            instance: null,
            count: 0,
            state: null
          }, pendingProps.set(currentProps, currentResource)), currentResource) : { type: "void", instance: null, count: 0, state: null };
        case "link":
          if ("stylesheet" === pendingProps.rel && "string" === typeof pendingProps.href && "string" === typeof pendingProps.precedence) {
            type = getStyleKey(pendingProps.href);
            var styles$243 = getResourcesFromRoot(
              JSCompiler_inline_result
            ).hoistableStyles, resource$244 = styles$243.get(type);
            resource$244 || (JSCompiler_inline_result = JSCompiler_inline_result.ownerDocument || JSCompiler_inline_result, resource$244 = {
              type: "stylesheet",
              instance: null,
              count: 0,
              state: { loading: 0, preload: null }
            }, styles$243.set(type, resource$244), (styles$243 = JSCompiler_inline_result.querySelector(
              getStylesheetSelectorFromKey(type)
            )) && !styles$243._p && (resource$244.instance = styles$243, resource$244.state.loading = 5), preloadPropsMap.has(type) || (pendingProps = {
              rel: "preload",
              as: "style",
              href: pendingProps.href,
              crossOrigin: pendingProps.crossOrigin,
              integrity: pendingProps.integrity,
              media: pendingProps.media,
              hrefLang: pendingProps.hrefLang,
              referrerPolicy: pendingProps.referrerPolicy
            }, preloadPropsMap.set(type, pendingProps), styles$243 || preloadStylesheet(
              JSCompiler_inline_result,
              type,
              pendingProps,
              resource$244.state
            )));
            if (currentProps && null === currentResource)
              throw Error(formatProdErrorMessage(528, ""));
            return resource$244;
          }
          if (currentProps && null !== currentResource)
            throw Error(formatProdErrorMessage(529, ""));
          return null;
        case "script":
          return currentProps = pendingProps.async, pendingProps = pendingProps.src, "string" === typeof pendingProps && currentProps && "function" !== typeof currentProps && "symbol" !== typeof currentProps ? (currentProps = getScriptKey(pendingProps), pendingProps = getResourcesFromRoot(
            JSCompiler_inline_result
          ).hoistableScripts, currentResource = pendingProps.get(currentProps), currentResource || (currentResource = {
            type: "script",
            instance: null,
            count: 0,
            state: null
          }, pendingProps.set(currentProps, currentResource)), currentResource) : { type: "void", instance: null, count: 0, state: null };
        default:
          throw Error(formatProdErrorMessage(444, type));
      }
    }
    function getStyleKey(href) {
      return 'href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"';
    }
    function getStylesheetSelectorFromKey(key) {
      return 'link[rel="stylesheet"][' + key + "]";
    }
    function stylesheetPropsFromRawProps(rawProps) {
      return assign({}, rawProps, {
        "data-precedence": rawProps.precedence,
        precedence: null
      });
    }
    function preloadStylesheet(ownerDocument, key, preloadProps, state) {
      ownerDocument.querySelector('link[rel="preload"][as="style"][' + key + "]") ? state.loading = 1 : (key = ownerDocument.createElement("link"), state.preload = key, key.addEventListener("load", function() {
        return state.loading |= 1;
      }), key.addEventListener("error", function() {
        return state.loading |= 2;
      }), setInitialProperties(key, "link", preloadProps), markNodeAsHoistable(key), ownerDocument.head.appendChild(key));
    }
    function getScriptKey(src) {
      return '[src="' + escapeSelectorAttributeValueInsideDoubleQuotes(src) + '"]';
    }
    function getScriptSelectorFromKey(key) {
      return "script[async]" + key;
    }
    function acquireResource(hoistableRoot, resource, props) {
      resource.count++;
      if (null === resource.instance)
        switch (resource.type) {
          case "style":
            var instance = hoistableRoot.querySelector(
              'style[data-href~="' + escapeSelectorAttributeValueInsideDoubleQuotes(props.href) + '"]'
            );
            if (instance)
              return resource.instance = instance, markNodeAsHoistable(instance), instance;
            var styleProps = assign({}, props, {
              "data-href": props.href,
              "data-precedence": props.precedence,
              href: null,
              precedence: null
            });
            instance = (hoistableRoot.ownerDocument || hoistableRoot).createElement(
              "style"
            );
            markNodeAsHoistable(instance);
            setInitialProperties(instance, "style", styleProps);
            insertStylesheet(instance, props.precedence, hoistableRoot);
            return resource.instance = instance;
          case "stylesheet":
            styleProps = getStyleKey(props.href);
            var instance$249 = hoistableRoot.querySelector(
              getStylesheetSelectorFromKey(styleProps)
            );
            if (instance$249)
              return resource.state.loading |= 4, resource.instance = instance$249, markNodeAsHoistable(instance$249), instance$249;
            instance = stylesheetPropsFromRawProps(props);
            (styleProps = preloadPropsMap.get(styleProps)) && adoptPreloadPropsForStylesheet(instance, styleProps);
            instance$249 = (hoistableRoot.ownerDocument || hoistableRoot).createElement("link");
            markNodeAsHoistable(instance$249);
            var linkInstance = instance$249;
            linkInstance._p = new Promise(function(resolve, reject) {
              linkInstance.onload = resolve;
              linkInstance.onerror = reject;
            });
            setInitialProperties(instance$249, "link", instance);
            resource.state.loading |= 4;
            insertStylesheet(instance$249, props.precedence, hoistableRoot);
            return resource.instance = instance$249;
          case "script":
            instance$249 = getScriptKey(props.src);
            if (styleProps = hoistableRoot.querySelector(
              getScriptSelectorFromKey(instance$249)
            ))
              return resource.instance = styleProps, markNodeAsHoistable(styleProps), styleProps;
            instance = props;
            if (styleProps = preloadPropsMap.get(instance$249))
              instance = assign({}, props), adoptPreloadPropsForScript(instance, styleProps);
            hoistableRoot = hoistableRoot.ownerDocument || hoistableRoot;
            styleProps = hoistableRoot.createElement("script");
            markNodeAsHoistable(styleProps);
            setInitialProperties(styleProps, "link", instance);
            hoistableRoot.head.appendChild(styleProps);
            return resource.instance = styleProps;
          case "void":
            return null;
          default:
            throw Error(formatProdErrorMessage(443, resource.type));
        }
      else
        "stylesheet" === resource.type && 0 === (resource.state.loading & 4) && (instance = resource.instance, resource.state.loading |= 4, insertStylesheet(instance, props.precedence, hoistableRoot));
      return resource.instance;
    }
    function insertStylesheet(instance, precedence, root3) {
      for (var nodes = root3.querySelectorAll(
        'link[rel="stylesheet"][data-precedence],style[data-precedence]'
      ), last = nodes.length ? nodes[nodes.length - 1] : null, prior = last, i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if (node.dataset.precedence === precedence) prior = node;
        else if (prior !== last) break;
      }
      prior ? prior.parentNode.insertBefore(instance, prior.nextSibling) : (precedence = 9 === root3.nodeType ? root3.head : root3, precedence.insertBefore(instance, precedence.firstChild));
    }
    function adoptPreloadPropsForStylesheet(stylesheetProps, preloadProps) {
      null == stylesheetProps.crossOrigin && (stylesheetProps.crossOrigin = preloadProps.crossOrigin);
      null == stylesheetProps.referrerPolicy && (stylesheetProps.referrerPolicy = preloadProps.referrerPolicy);
      null == stylesheetProps.title && (stylesheetProps.title = preloadProps.title);
    }
    function adoptPreloadPropsForScript(scriptProps, preloadProps) {
      null == scriptProps.crossOrigin && (scriptProps.crossOrigin = preloadProps.crossOrigin);
      null == scriptProps.referrerPolicy && (scriptProps.referrerPolicy = preloadProps.referrerPolicy);
      null == scriptProps.integrity && (scriptProps.integrity = preloadProps.integrity);
    }
    var tagCaches = null;
    function getHydratableHoistableCache(type, keyAttribute, ownerDocument) {
      if (null === tagCaches) {
        var cache = /* @__PURE__ */ new Map();
        var caches = tagCaches = /* @__PURE__ */ new Map();
        caches.set(ownerDocument, cache);
      } else
        caches = tagCaches, cache = caches.get(ownerDocument), cache || (cache = /* @__PURE__ */ new Map(), caches.set(ownerDocument, cache));
      if (cache.has(type)) return cache;
      cache.set(type, null);
      ownerDocument = ownerDocument.getElementsByTagName(type);
      for (caches = 0; caches < ownerDocument.length; caches++) {
        var node = ownerDocument[caches];
        if (!(node[internalHoistableMarker] || node[internalInstanceKey] || "link" === type && "stylesheet" === node.getAttribute("rel")) && "http://www.w3.org/2000/svg" !== node.namespaceURI) {
          var nodeKey = node.getAttribute(keyAttribute) || "";
          nodeKey = type + nodeKey;
          var existing = cache.get(nodeKey);
          existing ? existing.push(node) : cache.set(nodeKey, [node]);
        }
      }
      return cache;
    }
    function mountHoistable(hoistableRoot, type, instance) {
      hoistableRoot = hoistableRoot.ownerDocument || hoistableRoot;
      hoistableRoot.head.insertBefore(
        instance,
        "title" === type ? hoistableRoot.querySelector("head > title") : null
      );
    }
    function isHostHoistableType(type, props, hostContext) {
      if (1 === hostContext || null != props.itemProp) return false;
      switch (type) {
        case "meta":
        case "title":
          return true;
        case "style":
          if ("string" !== typeof props.precedence || "string" !== typeof props.href || "" === props.href)
            break;
          return true;
        case "link":
          if ("string" !== typeof props.rel || "string" !== typeof props.href || "" === props.href || props.onLoad || props.onError)
            break;
          switch (props.rel) {
            case "stylesheet":
              return type = props.disabled, "string" === typeof props.precedence && null == type;
            default:
              return true;
          }
        case "script":
          if (props.async && "function" !== typeof props.async && "symbol" !== typeof props.async && !props.onLoad && !props.onError && props.src && "string" === typeof props.src)
            return true;
      }
      return false;
    }
    function preloadResource(resource) {
      return "stylesheet" === resource.type && 0 === (resource.state.loading & 3) ? false : true;
    }
    function suspendResource(state, hoistableRoot, resource, props) {
      if ("stylesheet" === resource.type && ("string" !== typeof props.media || false !== matchMedia(props.media).matches) && 0 === (resource.state.loading & 4)) {
        if (null === resource.instance) {
          var key = getStyleKey(props.href), instance = hoistableRoot.querySelector(
            getStylesheetSelectorFromKey(key)
          );
          if (instance) {
            hoistableRoot = instance._p;
            null !== hoistableRoot && "object" === typeof hoistableRoot && "function" === typeof hoistableRoot.then && (state.count++, state = onUnsuspend.bind(state), hoistableRoot.then(state, state));
            resource.state.loading |= 4;
            resource.instance = instance;
            markNodeAsHoistable(instance);
            return;
          }
          instance = hoistableRoot.ownerDocument || hoistableRoot;
          props = stylesheetPropsFromRawProps(props);
          (key = preloadPropsMap.get(key)) && adoptPreloadPropsForStylesheet(props, key);
          instance = instance.createElement("link");
          markNodeAsHoistable(instance);
          var linkInstance = instance;
          linkInstance._p = new Promise(function(resolve, reject) {
            linkInstance.onload = resolve;
            linkInstance.onerror = reject;
          });
          setInitialProperties(instance, "link", props);
          resource.instance = instance;
        }
        null === state.stylesheets && (state.stylesheets = /* @__PURE__ */ new Map());
        state.stylesheets.set(resource, hoistableRoot);
        (hoistableRoot = resource.state.preload) && 0 === (resource.state.loading & 3) && (state.count++, resource = onUnsuspend.bind(state), hoistableRoot.addEventListener("load", resource), hoistableRoot.addEventListener("error", resource));
      }
    }
    var estimatedBytesWithinLimit = 0;
    function waitForCommitToBeReady(state, timeoutOffset) {
      state.stylesheets && 0 === state.count && insertSuspendedStylesheets(state, state.stylesheets);
      return 0 < state.count || 0 < state.imgCount ? function(commit) {
        var stylesheetTimer = setTimeout(function() {
          state.stylesheets && insertSuspendedStylesheets(state, state.stylesheets);
          if (state.unsuspend) {
            var unsuspend = state.unsuspend;
            state.unsuspend = null;
            unsuspend();
          }
        }, 6e4 + timeoutOffset);
        0 < state.imgBytes && 0 === estimatedBytesWithinLimit && (estimatedBytesWithinLimit = 62500 * estimateBandwidth());
        var imgTimer = setTimeout(
          function() {
            state.waitingForImages = false;
            if (0 === state.count && (state.stylesheets && insertSuspendedStylesheets(state, state.stylesheets), state.unsuspend)) {
              var unsuspend = state.unsuspend;
              state.unsuspend = null;
              unsuspend();
            }
          },
          (state.imgBytes > estimatedBytesWithinLimit ? 50 : 800) + timeoutOffset
        );
        state.unsuspend = commit;
        return function() {
          state.unsuspend = null;
          clearTimeout(stylesheetTimer);
          clearTimeout(imgTimer);
        };
      } : null;
    }
    function onUnsuspend() {
      this.count--;
      if (0 === this.count && (0 === this.imgCount || !this.waitingForImages)) {
        if (this.stylesheets) insertSuspendedStylesheets(this, this.stylesheets);
        else if (this.unsuspend) {
          var unsuspend = this.unsuspend;
          this.unsuspend = null;
          unsuspend();
        }
      }
    }
    var precedencesByRoot = null;
    function insertSuspendedStylesheets(state, resources) {
      state.stylesheets = null;
      null !== state.unsuspend && (state.count++, precedencesByRoot = /* @__PURE__ */ new Map(), resources.forEach(insertStylesheetIntoRoot, state), precedencesByRoot = null, onUnsuspend.call(state));
    }
    function insertStylesheetIntoRoot(root3, resource) {
      if (!(resource.state.loading & 4)) {
        var precedences = precedencesByRoot.get(root3);
        if (precedences) var last = precedences.get(null);
        else {
          precedences = /* @__PURE__ */ new Map();
          precedencesByRoot.set(root3, precedences);
          for (var nodes = root3.querySelectorAll(
            "link[data-precedence],style[data-precedence]"
          ), i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            if ("LINK" === node.nodeName || "not all" !== node.getAttribute("media"))
              precedences.set(node.dataset.precedence, node), last = node;
          }
          last && precedences.set(null, last);
        }
        nodes = resource.instance;
        node = nodes.getAttribute("data-precedence");
        i = precedences.get(node) || last;
        i === last && precedences.set(null, nodes);
        precedences.set(node, nodes);
        this.count++;
        last = onUnsuspend.bind(this);
        nodes.addEventListener("load", last);
        nodes.addEventListener("error", last);
        i ? i.parentNode.insertBefore(nodes, i.nextSibling) : (root3 = 9 === root3.nodeType ? root3.head : root3, root3.insertBefore(nodes, root3.firstChild));
        resource.state.loading |= 4;
      }
    }
    var HostTransitionContext = {
      $$typeof: REACT_CONTEXT_TYPE,
      Provider: null,
      Consumer: null,
      _currentValue: sharedNotPendingObject,
      _currentValue2: sharedNotPendingObject,
      _threadCount: 0
    };
    function FiberRootNode(containerInfo, tag, hydrate, identifierPrefix, onUncaughtError, onCaughtError, onRecoverableError, onDefaultTransitionIndicator, formState) {
      this.tag = 1;
      this.containerInfo = containerInfo;
      this.pingCache = this.current = this.pendingChildren = null;
      this.timeoutHandle = -1;
      this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null;
      this.callbackPriority = 0;
      this.expirationTimes = createLaneMap(-1);
      this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
      this.entanglements = createLaneMap(0);
      this.hiddenUpdates = createLaneMap(null);
      this.identifierPrefix = identifierPrefix;
      this.onUncaughtError = onUncaughtError;
      this.onCaughtError = onCaughtError;
      this.onRecoverableError = onRecoverableError;
      this.pooledCache = null;
      this.pooledCacheLanes = 0;
      this.formState = formState;
      this.incompleteTransitions = /* @__PURE__ */ new Map();
    }
    function createFiberRoot(containerInfo, tag, hydrate, initialChildren, hydrationCallbacks, isStrictMode, identifierPrefix, formState, onUncaughtError, onCaughtError, onRecoverableError, onDefaultTransitionIndicator) {
      containerInfo = new FiberRootNode(
        containerInfo,
        tag,
        hydrate,
        identifierPrefix,
        onUncaughtError,
        onCaughtError,
        onRecoverableError,
        onDefaultTransitionIndicator,
        formState
      );
      tag = 1;
      true === isStrictMode && (tag |= 24);
      isStrictMode = createFiberImplClass(3, null, null, tag);
      containerInfo.current = isStrictMode;
      isStrictMode.stateNode = containerInfo;
      tag = createCache();
      tag.refCount++;
      containerInfo.pooledCache = tag;
      tag.refCount++;
      isStrictMode.memoizedState = {
        element: initialChildren,
        isDehydrated: hydrate,
        cache: tag
      };
      initializeUpdateQueue(isStrictMode);
      return containerInfo;
    }
    function getContextForSubtree(parentComponent) {
      if (!parentComponent) return emptyContextObject;
      parentComponent = emptyContextObject;
      return parentComponent;
    }
    function updateContainerImpl(rootFiber, lane, element, container, parentComponent, callback) {
      parentComponent = getContextForSubtree(parentComponent);
      null === container.context ? container.context = parentComponent : container.pendingContext = parentComponent;
      container = createUpdate(lane);
      container.payload = { element };
      callback = void 0 === callback ? null : callback;
      null !== callback && (container.callback = callback);
      element = enqueueUpdate(rootFiber, container, lane);
      null !== element && (scheduleUpdateOnFiber(element, rootFiber, lane), entangleTransitions(element, rootFiber, lane));
    }
    function markRetryLaneImpl(fiber, retryLane) {
      fiber = fiber.memoizedState;
      if (null !== fiber && null !== fiber.dehydrated) {
        var a = fiber.retryLane;
        fiber.retryLane = 0 !== a && a < retryLane ? a : retryLane;
      }
    }
    function markRetryLaneIfNotHydrated(fiber, retryLane) {
      markRetryLaneImpl(fiber, retryLane);
      (fiber = fiber.alternate) && markRetryLaneImpl(fiber, retryLane);
    }
    function attemptContinuousHydration(fiber) {
      if (13 === fiber.tag || 31 === fiber.tag) {
        var root3 = enqueueConcurrentRenderForLane(fiber, 67108864);
        null !== root3 && scheduleUpdateOnFiber(root3, fiber, 67108864);
        markRetryLaneIfNotHydrated(fiber, 67108864);
      }
    }
    function attemptHydrationAtCurrentPriority(fiber) {
      if (13 === fiber.tag || 31 === fiber.tag) {
        var lane = requestUpdateLane();
        lane = getBumpedLaneForHydrationByLane(lane);
        var root3 = enqueueConcurrentRenderForLane(fiber, lane);
        null !== root3 && scheduleUpdateOnFiber(root3, fiber, lane);
        markRetryLaneIfNotHydrated(fiber, lane);
      }
    }
    var _enabled = true;
    function dispatchDiscreteEvent(domEventName, eventSystemFlags, container, nativeEvent) {
      var prevTransition = ReactSharedInternals.T;
      ReactSharedInternals.T = null;
      var previousPriority = ReactDOMSharedInternals.p;
      try {
        ReactDOMSharedInternals.p = 2, dispatchEvent(domEventName, eventSystemFlags, container, nativeEvent);
      } finally {
        ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition;
      }
    }
    function dispatchContinuousEvent(domEventName, eventSystemFlags, container, nativeEvent) {
      var prevTransition = ReactSharedInternals.T;
      ReactSharedInternals.T = null;
      var previousPriority = ReactDOMSharedInternals.p;
      try {
        ReactDOMSharedInternals.p = 8, dispatchEvent(domEventName, eventSystemFlags, container, nativeEvent);
      } finally {
        ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition;
      }
    }
    function dispatchEvent(domEventName, eventSystemFlags, targetContainer, nativeEvent) {
      if (_enabled) {
        var blockedOn = findInstanceBlockingEvent(nativeEvent);
        if (null === blockedOn)
          dispatchEventForPluginEventSystem(
            domEventName,
            eventSystemFlags,
            nativeEvent,
            return_targetInst,
            targetContainer
          ), clearIfContinuousEvent(domEventName, nativeEvent);
        else if (queueIfContinuousEvent(
          blockedOn,
          domEventName,
          eventSystemFlags,
          targetContainer,
          nativeEvent
        ))
          nativeEvent.stopPropagation();
        else if (clearIfContinuousEvent(domEventName, nativeEvent), eventSystemFlags & 4 && -1 < discreteReplayableEvents.indexOf(domEventName)) {
          for (; null !== blockedOn; ) {
            var fiber = getInstanceFromNode(blockedOn);
            if (null !== fiber)
              switch (fiber.tag) {
                case 3:
                  fiber = fiber.stateNode;
                  if (fiber.current.memoizedState.isDehydrated) {
                    var lanes = getHighestPriorityLanes(fiber.pendingLanes);
                    if (0 !== lanes) {
                      var root3 = fiber;
                      root3.pendingLanes |= 2;
                      for (root3.entangledLanes |= 2; lanes; ) {
                        var lane = 1 << 31 - clz32(lanes);
                        root3.entanglements[1] |= lane;
                        lanes &= ~lane;
                      }
                      ensureRootIsScheduled(fiber);
                      0 === (executionContext & 6) && (workInProgressRootRenderTargetTime = now() + 500, flushSyncWorkAcrossRoots_impl(0));
                    }
                  }
                  break;
                case 31:
                case 13:
                  root3 = enqueueConcurrentRenderForLane(fiber, 2), null !== root3 && scheduleUpdateOnFiber(root3, fiber, 2), flushSyncWork$1(), markRetryLaneIfNotHydrated(fiber, 2);
              }
            fiber = findInstanceBlockingEvent(nativeEvent);
            null === fiber && dispatchEventForPluginEventSystem(
              domEventName,
              eventSystemFlags,
              nativeEvent,
              return_targetInst,
              targetContainer
            );
            if (fiber === blockedOn) break;
            blockedOn = fiber;
          }
          null !== blockedOn && nativeEvent.stopPropagation();
        } else
          dispatchEventForPluginEventSystem(
            domEventName,
            eventSystemFlags,
            nativeEvent,
            null,
            targetContainer
          );
      }
    }
    function findInstanceBlockingEvent(nativeEvent) {
      nativeEvent = getEventTarget(nativeEvent);
      return findInstanceBlockingTarget(nativeEvent);
    }
    var return_targetInst = null;
    function findInstanceBlockingTarget(targetNode) {
      return_targetInst = null;
      targetNode = getClosestInstanceFromNode(targetNode);
      if (null !== targetNode) {
        var nearestMounted = getNearestMountedFiber(targetNode);
        if (null === nearestMounted) targetNode = null;
        else {
          var tag = nearestMounted.tag;
          if (13 === tag) {
            targetNode = getSuspenseInstanceFromFiber(nearestMounted);
            if (null !== targetNode) return targetNode;
            targetNode = null;
          } else if (31 === tag) {
            targetNode = getActivityInstanceFromFiber(nearestMounted);
            if (null !== targetNode) return targetNode;
            targetNode = null;
          } else if (3 === tag) {
            if (nearestMounted.stateNode.current.memoizedState.isDehydrated)
              return 3 === nearestMounted.tag ? nearestMounted.stateNode.containerInfo : null;
            targetNode = null;
          } else nearestMounted !== targetNode && (targetNode = null);
        }
      }
      return_targetInst = targetNode;
      return null;
    }
    function getEventPriority(domEventName) {
      switch (domEventName) {
        case "beforetoggle":
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "toggle":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
          return 2;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
          return 8;
        case "message":
          switch (getCurrentPriorityLevel()) {
            case ImmediatePriority:
              return 2;
            case UserBlockingPriority:
              return 8;
            case NormalPriority$1:
            case LowPriority:
              return 32;
            case IdlePriority:
              return 268435456;
            default:
              return 32;
          }
        default:
          return 32;
      }
    }
    var hasScheduledReplayAttempt = false, queuedFocus = null, queuedDrag = null, queuedMouse = null, queuedPointers = /* @__PURE__ */ new Map(), queuedPointerCaptures = /* @__PURE__ */ new Map(), queuedExplicitHydrationTargets = [], discreteReplayableEvents = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
      " "
    );
    function clearIfContinuousEvent(domEventName, nativeEvent) {
      switch (domEventName) {
        case "focusin":
        case "focusout":
          queuedFocus = null;
          break;
        case "dragenter":
        case "dragleave":
          queuedDrag = null;
          break;
        case "mouseover":
        case "mouseout":
          queuedMouse = null;
          break;
        case "pointerover":
        case "pointerout":
          queuedPointers.delete(nativeEvent.pointerId);
          break;
        case "gotpointercapture":
        case "lostpointercapture":
          queuedPointerCaptures.delete(nativeEvent.pointerId);
      }
    }
    function accumulateOrCreateContinuousQueuedReplayableEvent(existingQueuedEvent, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent) {
      if (null === existingQueuedEvent || existingQueuedEvent.nativeEvent !== nativeEvent)
        return existingQueuedEvent = {
          blockedOn,
          domEventName,
          eventSystemFlags,
          nativeEvent,
          targetContainers: [targetContainer]
        }, null !== blockedOn && (blockedOn = getInstanceFromNode(blockedOn), null !== blockedOn && attemptContinuousHydration(blockedOn)), existingQueuedEvent;
      existingQueuedEvent.eventSystemFlags |= eventSystemFlags;
      blockedOn = existingQueuedEvent.targetContainers;
      null !== targetContainer && -1 === blockedOn.indexOf(targetContainer) && blockedOn.push(targetContainer);
      return existingQueuedEvent;
    }
    function queueIfContinuousEvent(blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent) {
      switch (domEventName) {
        case "focusin":
          return queuedFocus = accumulateOrCreateContinuousQueuedReplayableEvent(
            queuedFocus,
            blockedOn,
            domEventName,
            eventSystemFlags,
            targetContainer,
            nativeEvent
          ), true;
        case "dragenter":
          return queuedDrag = accumulateOrCreateContinuousQueuedReplayableEvent(
            queuedDrag,
            blockedOn,
            domEventName,
            eventSystemFlags,
            targetContainer,
            nativeEvent
          ), true;
        case "mouseover":
          return queuedMouse = accumulateOrCreateContinuousQueuedReplayableEvent(
            queuedMouse,
            blockedOn,
            domEventName,
            eventSystemFlags,
            targetContainer,
            nativeEvent
          ), true;
        case "pointerover":
          var pointerId = nativeEvent.pointerId;
          queuedPointers.set(
            pointerId,
            accumulateOrCreateContinuousQueuedReplayableEvent(
              queuedPointers.get(pointerId) || null,
              blockedOn,
              domEventName,
              eventSystemFlags,
              targetContainer,
              nativeEvent
            )
          );
          return true;
        case "gotpointercapture":
          return pointerId = nativeEvent.pointerId, queuedPointerCaptures.set(
            pointerId,
            accumulateOrCreateContinuousQueuedReplayableEvent(
              queuedPointerCaptures.get(pointerId) || null,
              blockedOn,
              domEventName,
              eventSystemFlags,
              targetContainer,
              nativeEvent
            )
          ), true;
      }
      return false;
    }
    function attemptExplicitHydrationTarget(queuedTarget) {
      var targetInst = getClosestInstanceFromNode(queuedTarget.target);
      if (null !== targetInst) {
        var nearestMounted = getNearestMountedFiber(targetInst);
        if (null !== nearestMounted) {
          if (targetInst = nearestMounted.tag, 13 === targetInst) {
            if (targetInst = getSuspenseInstanceFromFiber(nearestMounted), null !== targetInst) {
              queuedTarget.blockedOn = targetInst;
              runWithPriority(queuedTarget.priority, function() {
                attemptHydrationAtCurrentPriority(nearestMounted);
              });
              return;
            }
          } else if (31 === targetInst) {
            if (targetInst = getActivityInstanceFromFiber(nearestMounted), null !== targetInst) {
              queuedTarget.blockedOn = targetInst;
              runWithPriority(queuedTarget.priority, function() {
                attemptHydrationAtCurrentPriority(nearestMounted);
              });
              return;
            }
          } else if (3 === targetInst && nearestMounted.stateNode.current.memoizedState.isDehydrated) {
            queuedTarget.blockedOn = 3 === nearestMounted.tag ? nearestMounted.stateNode.containerInfo : null;
            return;
          }
        }
      }
      queuedTarget.blockedOn = null;
    }
    function attemptReplayContinuousQueuedEvent(queuedEvent) {
      if (null !== queuedEvent.blockedOn) return false;
      for (var targetContainers = queuedEvent.targetContainers; 0 < targetContainers.length; ) {
        var nextBlockedOn = findInstanceBlockingEvent(queuedEvent.nativeEvent);
        if (null === nextBlockedOn) {
          nextBlockedOn = queuedEvent.nativeEvent;
          var nativeEventClone = new nextBlockedOn.constructor(
            nextBlockedOn.type,
            nextBlockedOn
          );
          currentReplayingEvent = nativeEventClone;
          nextBlockedOn.target.dispatchEvent(nativeEventClone);
          currentReplayingEvent = null;
        } else
          return targetContainers = getInstanceFromNode(nextBlockedOn), null !== targetContainers && attemptContinuousHydration(targetContainers), queuedEvent.blockedOn = nextBlockedOn, false;
        targetContainers.shift();
      }
      return true;
    }
    function attemptReplayContinuousQueuedEventInMap(queuedEvent, key, map) {
      attemptReplayContinuousQueuedEvent(queuedEvent) && map.delete(key);
    }
    function replayUnblockedEvents() {
      hasScheduledReplayAttempt = false;
      null !== queuedFocus && attemptReplayContinuousQueuedEvent(queuedFocus) && (queuedFocus = null);
      null !== queuedDrag && attemptReplayContinuousQueuedEvent(queuedDrag) && (queuedDrag = null);
      null !== queuedMouse && attemptReplayContinuousQueuedEvent(queuedMouse) && (queuedMouse = null);
      queuedPointers.forEach(attemptReplayContinuousQueuedEventInMap);
      queuedPointerCaptures.forEach(attemptReplayContinuousQueuedEventInMap);
    }
    function scheduleCallbackIfUnblocked(queuedEvent, unblocked) {
      queuedEvent.blockedOn === unblocked && (queuedEvent.blockedOn = null, hasScheduledReplayAttempt || (hasScheduledReplayAttempt = true, Scheduler.unstable_scheduleCallback(
        Scheduler.unstable_NormalPriority,
        replayUnblockedEvents
      )));
    }
    var lastScheduledReplayQueue = null;
    function scheduleReplayQueueIfNeeded(formReplayingQueue) {
      lastScheduledReplayQueue !== formReplayingQueue && (lastScheduledReplayQueue = formReplayingQueue, Scheduler.unstable_scheduleCallback(
        Scheduler.unstable_NormalPriority,
        function() {
          lastScheduledReplayQueue === formReplayingQueue && (lastScheduledReplayQueue = null);
          for (var i = 0; i < formReplayingQueue.length; i += 3) {
            var form = formReplayingQueue[i], submitterOrAction = formReplayingQueue[i + 1], formData = formReplayingQueue[i + 2];
            if ("function" !== typeof submitterOrAction)
              if (null === findInstanceBlockingTarget(submitterOrAction || form))
                continue;
              else break;
            var formInst = getInstanceFromNode(form);
            null !== formInst && (formReplayingQueue.splice(i, 3), i -= 3, startHostTransition(
              formInst,
              {
                pending: true,
                data: formData,
                method: form.method,
                action: submitterOrAction
              },
              submitterOrAction,
              formData
            ));
          }
        }
      ));
    }
    function retryIfBlockedOn(unblocked) {
      function unblock(queuedEvent) {
        return scheduleCallbackIfUnblocked(queuedEvent, unblocked);
      }
      null !== queuedFocus && scheduleCallbackIfUnblocked(queuedFocus, unblocked);
      null !== queuedDrag && scheduleCallbackIfUnblocked(queuedDrag, unblocked);
      null !== queuedMouse && scheduleCallbackIfUnblocked(queuedMouse, unblocked);
      queuedPointers.forEach(unblock);
      queuedPointerCaptures.forEach(unblock);
      for (var i = 0; i < queuedExplicitHydrationTargets.length; i++) {
        var queuedTarget = queuedExplicitHydrationTargets[i];
        queuedTarget.blockedOn === unblocked && (queuedTarget.blockedOn = null);
      }
      for (; 0 < queuedExplicitHydrationTargets.length && (i = queuedExplicitHydrationTargets[0], null === i.blockedOn); )
        attemptExplicitHydrationTarget(i), null === i.blockedOn && queuedExplicitHydrationTargets.shift();
      i = (unblocked.ownerDocument || unblocked).$$reactFormReplay;
      if (null != i)
        for (queuedTarget = 0; queuedTarget < i.length; queuedTarget += 3) {
          var form = i[queuedTarget], submitterOrAction = i[queuedTarget + 1], formProps = form[internalPropsKey] || null;
          if ("function" === typeof submitterOrAction)
            formProps || scheduleReplayQueueIfNeeded(i);
          else if (formProps) {
            var action = null;
            if (submitterOrAction && submitterOrAction.hasAttribute("formAction"))
              if (form = submitterOrAction, formProps = submitterOrAction[internalPropsKey] || null)
                action = formProps.formAction;
              else {
                if (null !== findInstanceBlockingTarget(form)) continue;
              }
            else action = formProps.action;
            "function" === typeof action ? i[queuedTarget + 1] = action : (i.splice(queuedTarget, 3), queuedTarget -= 3);
            scheduleReplayQueueIfNeeded(i);
          }
        }
    }
    function defaultOnDefaultTransitionIndicator() {
      function handleNavigate(event) {
        event.canIntercept && "react-transition" === event.info && event.intercept({
          handler: function() {
            return new Promise(function(resolve) {
              return pendingResolve = resolve;
            });
          },
          focusReset: "manual",
          scroll: "manual"
        });
      }
      function handleNavigateComplete() {
        null !== pendingResolve && (pendingResolve(), pendingResolve = null);
        isCancelled || setTimeout(startFakeNavigation, 20);
      }
      function startFakeNavigation() {
        if (!isCancelled && !navigation.transition) {
          var currentEntry = navigation.currentEntry;
          currentEntry && null != currentEntry.url && navigation.navigate(currentEntry.url, {
            state: currentEntry.getState(),
            info: "react-transition",
            history: "replace"
          });
        }
      }
      if ("object" === typeof navigation) {
        var isCancelled = false, pendingResolve = null;
        navigation.addEventListener("navigate", handleNavigate);
        navigation.addEventListener("navigatesuccess", handleNavigateComplete);
        navigation.addEventListener("navigateerror", handleNavigateComplete);
        setTimeout(startFakeNavigation, 100);
        return function() {
          isCancelled = true;
          navigation.removeEventListener("navigate", handleNavigate);
          navigation.removeEventListener("navigatesuccess", handleNavigateComplete);
          navigation.removeEventListener("navigateerror", handleNavigateComplete);
          null !== pendingResolve && (pendingResolve(), pendingResolve = null);
        };
      }
    }
    function ReactDOMRoot(internalRoot) {
      this._internalRoot = internalRoot;
    }
    ReactDOMHydrationRoot.prototype.render = ReactDOMRoot.prototype.render = function(children) {
      var root3 = this._internalRoot;
      if (null === root3) throw Error(formatProdErrorMessage(409));
      var current = root3.current, lane = requestUpdateLane();
      updateContainerImpl(current, lane, children, root3, null, null);
    };
    ReactDOMHydrationRoot.prototype.unmount = ReactDOMRoot.prototype.unmount = function() {
      var root3 = this._internalRoot;
      if (null !== root3) {
        this._internalRoot = null;
        var container = root3.containerInfo;
        updateContainerImpl(root3.current, 2, null, root3, null, null);
        flushSyncWork$1();
        container[internalContainerInstanceKey] = null;
      }
    };
    function ReactDOMHydrationRoot(internalRoot) {
      this._internalRoot = internalRoot;
    }
    ReactDOMHydrationRoot.prototype.unstable_scheduleHydration = function(target) {
      if (target) {
        var updatePriority = resolveUpdatePriority();
        target = { blockedOn: null, target, priority: updatePriority };
        for (var i = 0; i < queuedExplicitHydrationTargets.length && 0 !== updatePriority && updatePriority < queuedExplicitHydrationTargets[i].priority; i++) ;
        queuedExplicitHydrationTargets.splice(i, 0, target);
        0 === i && attemptExplicitHydrationTarget(target);
      }
    };
    var isomorphicReactPackageVersion$jscomp$inline_1840 = React2.version;
    if ("19.2.3" !== isomorphicReactPackageVersion$jscomp$inline_1840)
      throw Error(
        formatProdErrorMessage(
          527,
          isomorphicReactPackageVersion$jscomp$inline_1840,
          "19.2.3"
        )
      );
    ReactDOMSharedInternals.findDOMNode = function(componentOrElement) {
      var fiber = componentOrElement._reactInternals;
      if (void 0 === fiber) {
        if ("function" === typeof componentOrElement.render)
          throw Error(formatProdErrorMessage(188));
        componentOrElement = Object.keys(componentOrElement).join(",");
        throw Error(formatProdErrorMessage(268, componentOrElement));
      }
      componentOrElement = findCurrentFiberUsingSlowPath(fiber);
      componentOrElement = null !== componentOrElement ? findCurrentHostFiberImpl(componentOrElement) : null;
      componentOrElement = null === componentOrElement ? null : componentOrElement.stateNode;
      return componentOrElement;
    };
    var internals$jscomp$inline_2347 = {
      bundleType: 0,
      version: "19.2.3",
      rendererPackageName: "react-dom",
      currentDispatcherRef: ReactSharedInternals,
      reconcilerVersion: "19.2.3"
    };
    if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
      var hook$jscomp$inline_2348 = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (!hook$jscomp$inline_2348.isDisabled && hook$jscomp$inline_2348.supportsFiber)
        try {
          rendererID = hook$jscomp$inline_2348.inject(
            internals$jscomp$inline_2347
          ), injectedHook = hook$jscomp$inline_2348;
        } catch (err) {
        }
    }
    reactDomClient_production.createRoot = function(container, options2) {
      if (!isValidContainer(container)) throw Error(formatProdErrorMessage(299));
      var isStrictMode = false, identifierPrefix = "", onUncaughtError = defaultOnUncaughtError, onCaughtError = defaultOnCaughtError, onRecoverableError = defaultOnRecoverableError;
      null !== options2 && void 0 !== options2 && (true === options2.unstable_strictMode && (isStrictMode = true), void 0 !== options2.identifierPrefix && (identifierPrefix = options2.identifierPrefix), void 0 !== options2.onUncaughtError && (onUncaughtError = options2.onUncaughtError), void 0 !== options2.onCaughtError && (onCaughtError = options2.onCaughtError), void 0 !== options2.onRecoverableError && (onRecoverableError = options2.onRecoverableError));
      options2 = createFiberRoot(
        container,
        1,
        false,
        null,
        null,
        isStrictMode,
        identifierPrefix,
        null,
        onUncaughtError,
        onCaughtError,
        onRecoverableError,
        defaultOnDefaultTransitionIndicator
      );
      container[internalContainerInstanceKey] = options2.current;
      listenToAllSupportedEvents(container);
      return new ReactDOMRoot(options2);
    };
    reactDomClient_production.hydrateRoot = function(container, initialChildren, options2) {
      if (!isValidContainer(container)) throw Error(formatProdErrorMessage(299));
      var isStrictMode = false, identifierPrefix = "", onUncaughtError = defaultOnUncaughtError, onCaughtError = defaultOnCaughtError, onRecoverableError = defaultOnRecoverableError, formState = null;
      null !== options2 && void 0 !== options2 && (true === options2.unstable_strictMode && (isStrictMode = true), void 0 !== options2.identifierPrefix && (identifierPrefix = options2.identifierPrefix), void 0 !== options2.onUncaughtError && (onUncaughtError = options2.onUncaughtError), void 0 !== options2.onCaughtError && (onCaughtError = options2.onCaughtError), void 0 !== options2.onRecoverableError && (onRecoverableError = options2.onRecoverableError), void 0 !== options2.formState && (formState = options2.formState));
      initialChildren = createFiberRoot(
        container,
        1,
        true,
        initialChildren,
        null != options2 ? options2 : null,
        isStrictMode,
        identifierPrefix,
        formState,
        onUncaughtError,
        onCaughtError,
        onRecoverableError,
        defaultOnDefaultTransitionIndicator
      );
      initialChildren.context = getContextForSubtree(null);
      options2 = initialChildren.current;
      isStrictMode = requestUpdateLane();
      isStrictMode = getBumpedLaneForHydrationByLane(isStrictMode);
      identifierPrefix = createUpdate(isStrictMode);
      identifierPrefix.callback = null;
      enqueueUpdate(options2, identifierPrefix, isStrictMode);
      options2 = isStrictMode;
      initialChildren.current.lanes = options2;
      markRootUpdated$1(initialChildren, options2);
      ensureRootIsScheduled(initialChildren);
      container[internalContainerInstanceKey] = initialChildren.current;
      listenToAllSupportedEvents(container);
      return new ReactDOMHydrationRoot(initialChildren);
    };
    reactDomClient_production.version = "19.2.3";
    return reactDomClient_production;
  }
  var hasRequiredClient;
  function requireClient() {
    if (hasRequiredClient) return client.exports;
    hasRequiredClient = 1;
    function checkDCE() {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
        return;
      }
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
      } catch (err) {
        console.error(err);
      }
    }
    {
      checkDCE();
      client.exports = requireReactDomClient_production();
    }
    return client.exports;
  }
  var clientExports = requireClient();
  var reactExports = requireReact();
  const React = /* @__PURE__ */ getDefaultExportFromCjs(reactExports);
  const chatbotContainer = "_chatbotContainer_ixb5p_1";
  const messagesContainer = "_messagesContainer_ixb5p_27";
  const message = "_message_ixb5p_27";
  const messageUser = "_messageUser_ixb5p_43";
  const messageBot = "_messageBot_ixb5p_48";
  const agentLogo = "_agentLogo_ixb5p_52";
  const messageWrapper = "_messageWrapper_ixb5p_62";
  const messageContent = "_messageContent_ixb5p_70";
  const messageText = "_messageText_ixb5p_90";
  const messageTimestamp = "_messageTimestamp_ixb5p_96";
  const messageInputForm = "_messageInputForm_ixb5p_110";
  const messageInputContainer = "_messageInputContainer_ixb5p_116";
  const inputRow = "_inputRow_ixb5p_123";
  const textareaContainer = "_textareaContainer_ixb5p_129";
  const messageInput = "_messageInput_ixb5p_110";
  const messageChoices = "_messageChoices_ixb5p_155";
  const choiceButton = "_choiceButton_ixb5p_166";
  const selected = "_selected_ixb5p_192";
  const typingIndicator$1 = "_typingIndicator_ixb5p_204";
  const styles$8 = {
    chatbotContainer,
    messagesContainer,
    message,
    messageUser,
    messageBot,
    agentLogo,
    messageWrapper,
    messageContent,
    messageText,
    messageTimestamp,
    messageInputForm,
    messageInputContainer,
    inputRow,
    textareaContainer,
    messageInput,
    messageChoices,
    choiceButton,
    selected,
    typingIndicator: typingIndicator$1
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
  const isStaticContentMessageTextPayload = (json) => {
    return typeof json === "object" && json !== null && typeof json.text === "string";
  };
  const getMessagePayloadFromConversationEntry = (entry) => {
    if (window.AdaptiveWebsite.util.isConversationEntryStaticContentMessage(entry)) {
      const text = entry.entryPayload.abstractMessage.staticContent.text;
      const json = window.AdaptiveWebsite.util.parseJsonInAgentResponse(text);
      if (json !== void 0) {
        if (isStaticContentMessageTextPayload(json)) {
          return json;
        } else {
          logger.error("Invalid static content message text payload:", json);
        }
      } else {
        if (typeof text === "string") {
          return { text };
        } else {
          logger.error("Invalid static content message text payload:", text);
        }
      }
    }
  };
  const ChatBot = ({ show }) => {
    const AGENT_LOGO_IMAGE_URL = "https://zzpq-010.dx.commercecloud.salesforce.com/on/demandware.static/Sites-nto-Site/-/default/dw9814f411/images/favicons/favicon-32x32.png";
    const AGENT_NAME = "Adaptive Web Agent";
    const [inputText, setInputText] = reactExports.useState("");
    const [isAnotherParticipantTyping, setIsAnotherParticipantTyping] = reactExports.useState(false);
    const [conversationEntries, setConversationEntries] = reactExports.useState([]);
    const messagesContainerRef = reactExports.useRef(null);
    reactExports.useEffect(() => {
      window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_TYPING_INDICATOR_STARTED, handleTypingIndicatorStarted);
      window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_TYPING_INDICATOR_STOPPED, handleTypingIndicatorStopped);
      window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGE_SENT, handleMessageReceived);
      window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_LIST_CONVERSATION_ENTRIES, handleListConversationEntries);
      return () => {
        window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_TYPING_INDICATOR_STARTED, handleTypingIndicatorStarted);
        window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_TYPING_INDICATOR_STOPPED, handleTypingIndicatorStopped);
        window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGE_SENT, handleMessageReceived);
        window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_LIST_CONVERSATION_ENTRIES, handleListConversationEntries);
      };
    }, []);
    reactExports.useEffect(() => {
      var _a, _b;
      (_b = messagesContainerRef.current) == null ? void 0 : _b.scrollTo({ top: (_a = messagesContainerRef.current) == null ? void 0 : _a.scrollHeight, behavior: "smooth" });
    }, [conversationEntries, show]);
    const handleMessageReceived = (event) => {
      setConversationEntries((prev) => [...prev, window.AdaptiveWebsite.util.parseEntryPayload(event.detail.conversationEntry)]);
      logger.debug("Message received:", event.detail);
    };
    const handleListConversationEntries = (event) => {
      setConversationEntries(event.detail.entries);
      logger.debug("List conversation entries:", event.detail);
    };
    const handleTypingIndicatorStarted = () => {
      setIsAnotherParticipantTyping(true);
    };
    const handleTypingIndicatorStopped = () => {
      setIsAnotherParticipantTyping(false);
    };
    const handleSendMessage = () => {
      if (inputText) {
        setInputText("");
        window.AdaptiveWebsite.sendTextMessage(inputText).catch((error) => {
          logger.error("Something went wrong while sending a message to conversation:", error);
        });
      }
    };
    const handleKeyPress = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    };
    const formatTimestamp = (timestamp) => {
      if (!timestamp) return "";
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: show && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$8.chatbotContainer, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$8.messagesContainer, ref: messagesContainerRef, children: [
        conversationEntries.filter(window.AdaptiveWebsite.util.isTextMessage).map((entry) => {
          const messagePayload = getMessagePayloadFromConversationEntry(entry);
          if (messagePayload) {
            const isMessageFromEndUser = window.AdaptiveWebsite.util.isMessageFromEndUser(entry);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `${styles$8.message} ${isMessageFromEndUser ? styles$8.messageUser : styles$8.messageBot}`, children: [
              !isMessageFromEndUser && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$8.agentLogo, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: AGENT_LOGO_IMAGE_URL, alt: "Agent Logo" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$8.messageWrapper, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$8.messageContent, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$8.messageText, children: messagePayload == null ? void 0 : messagePayload.text }) }),
                (messagePayload == null ? void 0 : messagePayload.options) && /* @__PURE__ */ jsxRuntimeExports.jsx(MessageOptions, { options: messagePayload.options }),
                entry.transcriptedTimestamp && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$8.messageTimestamp, children: [
                  !isMessageFromEndUser ? `${AGENT_NAME} • ` : "Sent • ",
                  formatTimestamp(entry.transcriptedTimestamp)
                ] })
              ] })
            ] }, entry.identifier);
          }
        }),
        isAnotherParticipantTyping && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `${styles$8.message} ${styles$8.messageBot}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$8.agentLogo, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: AGENT_LOGO_IMAGE_URL, alt: "Agent Logo" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$8.messageWrapper, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$8.messageContent, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$8.typingIndicator, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", {})
          ] }) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: handleSendMessage, className: styles$8.messageInputForm, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$8.messageInputContainer, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$8.inputRow, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$8.textareaContainer, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          value: inputText,
          onChange: (e) => setInputText(e.target.value),
          onKeyDown: handleKeyPress,
          placeholder: "Ask me anything...",
          className: styles$8.messageInput,
          rows: 1
        }
      ) }) }) }) })
    ] }) });
  };
  const MessageOptions = ({ options }) => {
    const messageChoicesRef = reactExports.useRef(null);
    const handleChoiceSelection = (event, option) => {
      var _a;
      window.AdaptiveWebsite.sendTextMessage(option.name);
      event.currentTarget.classList.add(styles$8.selected);
      (_a = messageChoicesRef.current) == null ? void 0 : _a.querySelectorAll("button").forEach((button) => {
        if (button !== event.currentTarget) {
          button.classList.remove(styles$8.selected);
        }
      });
    };
    if (Array.isArray(options) && options.length > 0) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: messageChoicesRef, className: styles$8.messageChoices, children: options.map((option) => {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: styles$8.choiceButton,
            onClick: (e) => handleChoiceSelection(e, option),
            children: option.name
          },
          option.name
        );
      }) });
    }
  };
  const scriptRel = "modulepreload";
  const assetsURL = function(dep) {
    return "/" + dep;
  };
  const seen = {};
  const __vitePreload = function preload(baseModule, deps, importerUrl) {
    let promise = Promise.resolve();
    if (deps && deps.length > 0) {
      let allSettled2 = function(promises) {
        return Promise.all(
          promises.map(
            (p) => Promise.resolve(p).then(
              (value) => ({ status: "fulfilled", value }),
              (reason) => ({ status: "rejected", reason })
            )
          )
        );
      };
      document.getElementsByTagName("link");
      const cspNonceMeta = document.querySelector(
        "meta[property=csp-nonce]"
      );
      const cspNonce = (cspNonceMeta == null ? void 0 : cspNonceMeta.nonce) || (cspNonceMeta == null ? void 0 : cspNonceMeta.getAttribute("nonce"));
      promise = allSettled2(
        deps.map((dep) => {
          dep = assetsURL(dep);
          if (dep in seen) return;
          seen[dep] = true;
          const isCss = dep.endsWith(".css");
          const cssSelector = isCss ? '[rel="stylesheet"]' : "";
          if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
            return;
          }
          const link = document.createElement("link");
          link.rel = isCss ? "stylesheet" : scriptRel;
          if (!isCss) {
            link.as = "script";
          }
          link.crossOrigin = "";
          link.href = dep;
          if (cspNonce) {
            link.setAttribute("nonce", cspNonce);
          }
          document.head.appendChild(link);
          if (isCss) {
            return new Promise((res, rej) => {
              link.addEventListener("load", res);
              link.addEventListener(
                "error",
                () => rej(new Error(`Unable to preload CSS for ${dep}`))
              );
            });
          }
        })
      );
    }
    function handlePreloadError(err) {
      const e = new Event("vite:preloadError", {
        cancelable: true
      });
      e.payload = err;
      window.dispatchEvent(e);
      if (!e.defaultPrevented) {
        throw err;
      }
    }
    return promise.then((res) => {
      for (const item of res || []) {
        if (item.status !== "rejected") continue;
        handlePreloadError(item.reason);
      }
      return baseModule().catch(handlePreloadError);
    });
  };
  const contentZoneContainer = "_contentZoneContainer_1hs9j_1";
  const contentZoneContent = "_contentZoneContent_1hs9j_25";
  const blankContent = "_blankContent_1hs9j_34";
  const typingIndicator = "_typingIndicator_1hs9j_44";
  const styles$7 = {
    contentZoneContainer,
    contentZoneContent,
    blankContent,
    typingIndicator
  };
  var adaptiveWebController = {};
  var hasRequiredAdaptiveWebController;
  function requireAdaptiveWebController() {
    if (hasRequiredAdaptiveWebController) return adaptiveWebController;
    hasRequiredAdaptiveWebController = 1;
    var __defProp = Object.defineProperty;
    var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
    var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    (function() {
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
      let config2 = {
        level: 0
        /* DEBUG */
        // Default to INFO level
      };
      function shouldLog2(level) {
        return level >= config2.level && config2.level !== 4;
      }
      const logger2 = {
        debug(...args) {
          if (shouldLog2(
            0
            /* DEBUG */
          )) {
            console.debug(...args);
          }
        },
        info(...args) {
          if (shouldLog2(
            1
            /* INFO */
          )) {
            console.log(...args);
          }
        },
        warn(...args) {
          if (shouldLog2(
            2
            /* WARN */
          )) {
            console.warn(...args);
          }
        },
        error(...args) {
          if (shouldLog2(
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
        constructor(code, message2, originalError) {
          super(message2);
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
        constructor(code, message2, status, statusText, originalError) {
          super(code, message2, originalError);
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
        constructor(code, message2, originalError) {
          super(code, message2, originalError);
        }
      }
      class ConversationConfigurationError extends BaseError {
        constructor(code, message2, context, originalError) {
          super(code, message2, originalError);
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
          logger2.error(`Error code: ${error.code}`, error);
        } else {
          logger2.error(error);
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
          logger2.info("sessionStorage not available.");
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
        logger2.debug("Browser Web Storage initialized.");
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
          logger2.debug(`${key} set in ${storageName}`);
        }
      };
      const removeItemInWebStorage = (key) => {
        if (isSessionStorageAvailable() && sessionStorage.getItem(storageKey)) {
          const storageObj = JSON.parse(sessionStorage.getItem(storageKey)) || {};
          delete storageObj[key];
          sessionStorage.setItem(storageKey, JSON.stringify(storageObj));
        }
        logger2.debug(`${key} removed from web storage`);
      };
      const clearWebStorage = () => {
        if (isSessionStorageAvailable()) {
          sessionStorage.removeItem(storageKey);
        }
        logger2.debug(`web storage cleared`);
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
            var setTimeout2 = global.setTimeout;
            var clearTimeout2 = global.clearTimeout;
            var XMLHttpRequest = global.XMLHttpRequest;
            var XDomainRequest = global.XDomainRequest;
            var ActiveXObject = global.ActiveXObject;
            var NativeEventSource = global.EventSource;
            var document2 = global.document;
            var Promise2 = global.Promise;
            var fetch2 = global.fetch;
            var Response = global.Response;
            var TextDecoder = global.TextDecoder;
            var TextEncoder = global.TextEncoder;
            var AbortController2 = global.AbortController;
            if (typeof window !== "undefined" && typeof document2 !== "undefined" && !("readyState" in document2) && document2.body == null) {
              document2.readyState = "loading";
              window.addEventListener("load", function(event) {
                document2.readyState = "complete";
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
            if (AbortController2 == void 0) {
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
              AbortController2 = function() {
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
                  clearTimeout2(that._sendTimeout);
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
                    clearTimeout2(timeout);
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
                    clearTimeout2(timeout);
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
                timeout = setTimeout2(function() {
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
                timeout = setTimeout2(function() {
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
              if ((!("ontimeout" in XMLHttpRequest.prototype) || !("sendAsBinary" in XMLHttpRequest.prototype) && !("mozAnon" in XMLHttpRequest.prototype)) && document2 != void 0 && document2.readyState != void 0 && document2.readyState !== "complete") {
                var that = this;
                that._sendTimeout = setTimeout2(function() {
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
              var controller = new AbortController2();
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
              setTimeout2(function() {
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
            function Event2(type) {
              this.type = type;
              this.target = void 0;
            }
            function MessageEvent(type, options) {
              Event2.call(this, type);
              this.data = options.data;
              this.lastEventId = options.lastEventId;
            }
            MessageEvent.prototype = Object.create(Event2.prototype);
            function ConnectionEvent(type, options) {
              Event2.call(this, type);
              this.status = options.status;
              this.statusText = options.statusText;
              this.headers = options.headers;
            }
            ConnectionEvent.prototype = Object.create(Event2.prototype);
            function ErrorEvent(type, options) {
              Event2.call(this, type);
              this.error = options.error;
            }
            ErrorEvent.prototype = Object.create(Event2.prototype);
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
                    var message2 = "";
                    if (status !== 200) {
                      if (statusText) {
                        statusText = statusText.replace(/\s+/g, " ");
                      }
                      message2 = "EventSource's response has a status " + status + " " + statusText + " that is not 200. Aborting the connection.";
                    } else {
                      message2 = "EventSource's response has a Content-Type specifying an unsupported type: " + (contentType == void 0 ? "-" : contentType.replace(/\s+/g, " ")) + ". Aborting the connection.";
                    }
                    close();
                    var event = new ConnectionEvent("error", {
                      status,
                      statusText,
                      headers: headers2
                    });
                    es.dispatchEvent(event);
                    fire(es, es.onerror, event);
                    console.error(message2);
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
                              clearTimeout2(timeout);
                              timeout = setTimeout2(function() {
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
                    clearTimeout2(timeout);
                    timeout = 0;
                  }
                  timeout = setTimeout2(function() {
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
                  clearTimeout2(timeout);
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
                    timeout = setTimeout2(function() {
                      onTimeout();
                    }, nextHeartbeat);
                  }
                  return;
                }
                wasActivity = false;
                textLength = 0;
                timeout = setTimeout2(function() {
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
            logger2.warn("Received 401 Unauthorized - JWT may be expired");
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
        var _a, _b;
        return (_b = (_a = data == null ? void 0 : data.conversationEntry) == null ? void 0 : _a.sender) == null ? void 0 : _b.role;
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
        var _a;
        if (isConversationEntryStaticContentMessage(conversationEntry)) {
          return ((_a = getStaticContentPayload(conversationEntry)) == null ? void 0 : _a.formatType) === CONVERSATION_CONSTANTS.FormatTypes.TEXT;
        }
        return false;
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
            logger2.debug(`Response message did not have valid JSON: ${content}`);
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
          __publicField(this, "dispatchEvent", (eventName, detail) => {
            const event = new CustomEvent(eventName, { detail });
            window.dispatchEvent(event);
          });
          __publicField(this, "initializeConversation", async (preChatData) => {
            try {
              if (preChatData) {
                this.preChatData = preChatData;
              }
              const conversationStatePromise = getJwt() ? this.handleExistingConversation() : this.handleNewConversation();
              await conversationStatePromise;
              await this.handleSubscribeToEventSource();
              logger2.debug("Conversation initialized successfully");
            } catch (error) {
              logger2.error("Failed to initialize conversation:", error);
              throw error;
            }
          });
          __publicField(this, "cleanupConversation", async () => {
            try {
              await closeEventSource();
              logger2.debug("Closed the Event Source (SSE).");
            } catch (err) {
              logger2.error(`Something went wrong in closing the Event Source (SSE): ${err}`);
            }
            clearWebStorage();
            clearInMemoryData();
            this.preChatData = void 0;
            this.updateConversationStatus(CONVERSATION_CONSTANTS.ConversationStatus.CLOSED_CONVERSATION);
          });
          __publicField(this, "updateConversationStatus", (status) => {
            this.conversationStatus = status;
            const conversationId2 = getConversationId();
            if (typeof conversationId2 !== "string") {
              logger2.error("Conversation ID is not defined. Cannot update conversation status.");
              return;
            }
            if (status === CONVERSATION_CONSTANTS.ConversationStatus.OPENED_CONVERSATION) {
              this.dispatchEvent(ConversationEventTypes.ON_EMBEDDED_MESSAGING_CONVERSATION_OPENED);
            } else if (status === CONVERSATION_CONSTANTS.ConversationStatus.CLOSED_CONVERSATION) {
              this.dispatchEvent(ConversationEventTypes.ON_EMBEDDED_MESSAGING_CONVERSATION_CLOSED);
            }
          });
          __publicField(this, "handleNewConversation", async () => {
            try {
              await this.handleGetUnauthenticatedJwt();
              await this.handleCreateNewConversation();
              logger2.debug(`Completed initializing a new conversation with conversationId: ${getConversationId()}`);
            } catch (err) {
              logger2.error(`Error in handleNewConversation: ${err}`);
              throw err;
            }
          });
          __publicField(this, "handleExistingConversation", async () => {
            try {
              await this.handleGetContinuityJwt();
              await this.handleListConversations();
              await this.handleListConversationEntries();
              this.updateConversationStatus(CONVERSATION_CONSTANTS.ConversationStatus.OPENED_CONVERSATION);
              logger2.debug(`Successfully retrieved entries for the current conversation: ${getConversationId()}`);
            } catch (err) {
              logger2.error(`Error in handleExistingConversation: ${err}`);
              throw err;
            }
          });
          __publicField(this, "handleGetUnauthenticatedJwt", async () => {
            if (getJwt()) {
              logger2.warn("Messaging access token (JWT) already exists in the web storage. Discontinuing to create a new Unauthenticated access token.");
              await this.handleExistingConversation();
              return;
            }
            try {
              const response = await getUnauthenticatedAccessToken();
              logger2.debug("Successfully fetched an Unauthenticated access token.");
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
          __publicField(this, "handleCreateNewConversation", async () => {
            if (this.conversationStatus === CONVERSATION_CONSTANTS.ConversationStatus.OPENED_CONVERSATION) {
              logger2.warn("Cannot create a new conversation while a conversation is currently open.");
              throw new ConversationConfigurationError(
                ErrorCode.CONVERSATION_ALREADY_OPEN,
                "Conversation already open"
              );
            }
            const conversationId2 = util.generateUUID();
            storeConversationId(conversationId2);
            try {
              await createConversation(getConversationId(), this.preChatData);
              logger2.debug(`Successfully created a new conversation with conversation-id: ${getConversationId()}`);
              this.dispatchEvent(ConversationEventTypes.ON_EMBEDDED_MESSAGING_CONVERSATION_STARTED, { conversationId: conversationId2 });
              this.updateConversationStatus(CONVERSATION_CONSTANTS.ConversationStatus.OPENED_CONVERSATION);
            } catch (err) {
              logError(err);
              await this.cleanupConversation();
            }
          });
          __publicField(this, "handleGetContinuityJwt", async () => {
            try {
              const response = await getContinuityJwt();
              setJwt(response.accessToken);
            } catch (err) {
              logError(err);
            }
          });
          __publicField(this, "handleListConversations", async () => {
            try {
              const response = await listConversations();
              if (response && response.openConversationsFound > 0 && response.conversations.length) {
                const openConversations = response.conversations;
                if (openConversations.length > 1) {
                  logger2.warn(`Expected the user to be participating in 1 open conversation but instead found ${openConversations.length}. Loading the conversation with latest startTimestamp.`);
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
          __publicField(this, "handleListConversationEntries", async () => {
            try {
              const response = await listConversationEntries(getConversationId());
              if (Array.isArray(response)) {
                response.reverse().filter((conversationEntry) => {
                  return conversationEntry.conversationId === getConversationId() && (conversationEntry.entryType === CONVERSATION_CONSTANTS.EntryTypes.CONVERSATION_MESSAGE || conversationEntry.entryType === CONVERSATION_CONSTANTS.EntryTypes.PARTICIPANT_CHANGED || conversationEntry.entryType === CONVERSATION_CONSTANTS.EntryTypes.ROUTING_RESULT);
                });
                this.dispatchEvent(ConversationEventTypes.ON_EMBEDDED_MESSAGING_LIST_CONVERSATION_ENTRIES, { entries: response });
              } else {
                logger2.error(`Expecting a response of type Array from listConversationEntries but instead received: ${response}`);
              }
            } catch (err) {
              logError(err);
            }
          });
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
              logger2.debug("Subscribed to the Event Source (SSE).");
            } catch (err) {
              logError(err);
            }
          });
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
                  logger2.debug(`Static content message text: `, content);
                  this.dispatchEvent(ConversationEventTypes.ON_EMBEDDED_MESSAGING_CONTENT_RECEIVED, { content });
                }
              }
              this.dispatchEvent(ConversationEventTypes.ON_EMBEDDED_MESSAGE_SENT, parsedEventData);
            } catch (err) {
              logger2.error(`Something went wrong in handling conversation message server sent event: ${err}`);
            }
          });
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
                    logger2.error(`Unrecognized initial routing failure type: ${conversationEntry.entryPayload.failureType}`);
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
                    logger2.error(`Unrecognized transfer routing failure type: ${conversationEntry.entryPayload.failureType}`);
                }
              } else {
                logger2.error(`Unrecognized routing type: ${conversationEntry.entryPayload.routingType}`);
              }
            } catch (err) {
              logger2.error(`Something went wrong in handling routing result server sent event: ${err}`);
            }
          });
          __publicField(this, "handleParticipantChangedServerSentEvent", (event) => {
            try {
              if (event && event.lastEventId) {
                setLastEventId(event.lastEventId);
              }
              const parsedEventData = parseServerSentEventData(event);
              this.parsedServerSentEvents.push(parsedEventData);
              this.dispatchEvent(ConversationEventTypes.ON_EMBEDDED_MESSAGING_CONVERSATION_PARTICIPANT_CHANGED, parsedEventData);
            } catch (err) {
              logger2.error(`Something went wrong in handling participant changed server sent event: ${err}`);
            }
          });
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
              logger2.error(`Something went wrong in handling typing started indicator server sent event: ${err}`);
            }
          });
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
              logger2.error(`Something went wrong in handling typing stopped indicator server sent event: ${err}`);
            }
          });
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
              logger2.error(`Something went wrong in handling conversation delivery acknowledgement server sent event: ${err}`);
            }
          });
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
              logger2.error(`Something went wrong in handling conversation read acknowledgement server sent event: ${err}`);
            }
          });
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
              logger2.error(`Something went wrong while handling conversation closed server sent event in conversation ${getConversationId()}: ${err}`);
            }
          });
          __publicField(this, "sendTextMessageInternal", async (conversationId2, value, messageId, inReplyToMessageId, isNewMessagingSession, routingAttributes, language) => {
            try {
              const routingAttrs = routingAttributes || this.preChatData;
              await sendTextMessage(conversationId2, value, messageId, inReplyToMessageId, isNewMessagingSession, routingAttrs, language);
            } catch (err) {
              logError(err);
              throw err;
            }
          });
          __publicField(this, "sendTextMessage", async (value) => {
            const conversationId2 = getConversationId();
            if (!conversationId2) {
              logger2.error("Cannot send message: No active conversation");
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
          __publicField(this, "endConversation", async () => {
            if (this.conversationStatus === CONVERSATION_CONSTANTS.ConversationStatus.OPENED_CONVERSATION) {
              try {
                await closeConversation(getConversationId());
                logger2.debug(`Successfully closed the conversation with conversation-id: ${getConversationId()}`);
              } catch (err) {
                logger2.error(`Something went wrong in closing the conversation with conversation-id ${getConversationId()}: ${err}`);
              } finally {
                await this.cleanupConversation();
              }
            }
          });
          __publicField(this, "startNewConversation", async (preChatData) => {
            await this.endConversation();
            this.parsedServerSentEvents = [];
            if (preChatData) {
              this.preChatData = preChatData;
            }
            await this.handleNewConversation();
            logger2.debug("New conversation created successfully");
          });
          __publicField(this, "sessionExists", () => {
            return getJwt() !== void 0;
          });
          __publicField(this, "minimize", () => {
            this.dispatchEvent(ConversationEventTypes.ON_EMBEDDED_MESSAGING_WINDOW_MINIMIZED, {});
          });
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
            parseJsonInAgentResponse
          }
        };
      }
    })();
    return adaptiveWebController;
  }
  requireAdaptiveWebController();
  const Recs$2 = React.lazy(() => __vitePreload(() => Promise.resolve().then(() => Recs$1), true ? void 0 : void 0));
  const Comparison$2 = React.lazy(() => __vitePreload(() => Promise.resolve().then(() => Comparison$1), true ? void 0 : void 0));
  const ProductDetails$2 = React.lazy(() => __vitePreload(() => Promise.resolve().then(() => ProductDetails$1), true ? void 0 : void 0));
  const ContentZone = ({ show }) => {
    const [contentZoneContent2, setContentZoneContent] = reactExports.useState();
    reactExports.useEffect(() => {
      window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_CONTENT_RECEIVED, handleContentReceived);
      window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_LIST_CONVERSATION_ENTRIES, handleListConversationEntries);
      return () => {
        window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_CONTENT_RECEIVED, handleContentReceived);
        window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_LIST_CONVERSATION_ENTRIES, handleListConversationEntries);
      };
    }, []);
    const handleContentReceived = (event) => {
      setContentZoneContent(event.detail.content);
    };
    const handleListConversationEntries = (event) => {
      const entries = event.detail.entries;
      for (let i = entries.length - 1; i >= 0; i--) {
        const entry = entries[i];
        if (window.AdaptiveWebsite.util.isConversationEntryStaticContentMessage(entry) && !window.AdaptiveWebsite.util.isMessageFromEndUser(entry)) {
          const payload = getMessagePayloadFromConversationEntry(entry);
          if (payload) {
            setContentZoneContent(payload);
            return;
          }
        }
      }
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: show && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$7.contentZoneContainer, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$7.contentZoneContent, children: contentZoneContent2 ? (() => {
      const template = contentZoneContent2.template;
      if (template && Array.isArray(template) && template.length > 0) {
        const firstTemplate = template[0];
        const templateName = typeof firstTemplate === "object" && firstTemplate !== null && "name" in firstTemplate ? firstTemplate.name : null;
        if (templateName === "Recs") {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(Recs$2, { content: contentZoneContent2 });
        } else if (templateName === "Comparison") {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(Comparison$2, { content: contentZoneContent2 });
        } else if (templateName === "ProductDetails") {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(ProductDetails$2, { content: contentZoneContent2 });
        }
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Placeholder, {});
    })() : /* @__PURE__ */ jsxRuntimeExports.jsx(Placeholder, {}) }) }) });
  };
  const Placeholder = () => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$7.blankContent, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$7.typingIndicator, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", {})
    ] }) });
  };
  const headerContainer = "_headerContainer_1983q_1";
  const agentName = "_agentName_1983q_11";
  const endConversationButton = "_endConversationButton_1983q_19";
  const minimizeButton = "_minimizeButton_1983q_38";
  const styles$6 = {
    headerContainer,
    agentName,
    endConversationButton,
    minimizeButton
  };
  const Header = ({ show }) => {
    const AGENT_NAME = "Adaptive Web Agent";
    if (!show) {
      return null;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$6.headerContainer, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$6.agentName, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: AGENT_NAME }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: styles$6.endConversationButton, onClick: window.AdaptiveWebsite.endConversation, children: "End Conversation" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: styles$6.minimizeButton,
          onClick: window.AdaptiveWebsite.minimize,
          "aria-label": "Minimize content zone",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "22",
              height: "22",
              viewBox: "0 0 18 18",
              fill: "none",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: "M5 7L9 11L13 7",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                }
              )
            }
          )
        }
      )
    ] });
  };
  const searchContainer = "_searchContainer_lpcxl_1";
  const searchForm = "_searchForm_lpcxl_12";
  const searchBar = "_searchBar_lpcxl_21";
  const searchInput = "_searchInput_lpcxl_34";
  const searchActions = "_searchActions_lpcxl_50";
  const searchActionButton = "_searchActionButton_lpcxl_57";
  const searchIcon = "_searchIcon_lpcxl_73";
  const expandButton = "_expandButton_lpcxl_90";
  const styles$5 = {
    searchContainer,
    searchForm,
    searchBar,
    searchInput,
    searchActions,
    searchActionButton,
    searchIcon,
    expandButton
  };
  const SearchBar = ({ show, onInitialMessage }) => {
    const [searchText, setSearchText] = reactExports.useState("");
    const [hasSentInitialMessage, setHasSentInitialMessage] = reactExports.useState(false);
    const AGENT_LOGO_IMAGE_URL = "https://zzpq-010.dx.commercecloud.salesforce.com/on/demandware.static/Sites-nto-Site/-/default/dw9814f411/images/favicons/favicon-32x32.png";
    const searchActions2 = [
      { text: "Shop Hiking Boots", value: "Shop Hiking Boots" },
      { text: "Find Jackets", value: "Find Jackets" },
      { text: "Browse Backpacks", value: "Browse Backpacks" }
    ];
    const handleSearch = (e) => {
      var _a, _b;
      e.preventDefault();
      const target = e.target;
      const textToSend = ((_a = target.searchText) == null ? void 0 : _a.value) || ((_b = target.buttonText) == null ? void 0 : _b.value);
      if (!hasSentInitialMessage) {
        onInitialMessage(textToSend);
        setHasSentInitialMessage(true);
      } else {
        window.AdaptiveWebsite.sendTextMessage(textToSend);
      }
      window.AdaptiveWebsite.maximize();
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: show && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$5.searchContainer, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: handleSearch, className: styles$5.searchForm, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$5.searchBar, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$5.searchIcon, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: AGENT_LOGO_IMAGE_URL, alt: "Search" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            name: "searchText",
            value: searchText,
            onChange: (e) => setSearchText(e.target.value),
            placeholder: "Welcome! How can I help you today?",
            className: styles$5.searchInput
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$5.searchActions, children: searchActions2.map((action, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            name: "buttonText",
            className: styles$5.searchActionButton,
            value: action.value,
            children: action.text
          },
          index
        )) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          width: "18",
          height: "18",
          viewBox: "0 0 18 18",
          fill: "none",
          className: styles$5.expandButton,
          onClick: window.AdaptiveWebsite.maximize,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: "M5 11L9 7L13 11",
              stroke: "white",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          )
        }
      )
    ] }) });
  };
  const DATA_CLOUD_AGENT_ENGAGEMENT_EVENT_TYPE = "agentEngagement";
  let engagementHandlers = [];
  const registerEngagementEventListeners = () => {
    engagementHandlers = engagementEvents.map((engagementEventConfig) => {
      const handler = (e) => {
        sendDataCloudAgentEngagementEvent(engagementEventConfig.interactionName, engagementEventConfig.getAttributes(e));
      };
      window.addEventListener(engagementEventConfig.customDomEventName, handler);
      return { customDomEventName: engagementEventConfig.customDomEventName, handler };
    });
  };
  const unregisterEngagementEventListeners = () => {
    engagementHandlers.forEach(({ customDomEventName, handler }) => {
      window.removeEventListener(customDomEventName, handler);
    });
    engagementHandlers = [];
  };
  const engagementEvents = [
    {
      customDomEventName: window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_CONVERSATION_STARTED,
      interactionName: "agent-conversation-started",
      getAttributes: (e) => {
        return { conversationId: e.detail.conversationId };
      }
    },
    {
      customDomEventName: window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_CONVERSATION_CLOSED,
      interactionName: "agent-conversation-closed",
      getAttributes: (e) => {
        return { conversationId: e.detail.conversationId };
      }
    },
    {
      customDomEventName: window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_CONVERSATION_READY,
      interactionName: "agent-conversation-ready",
      getAttributes: () => ({})
    },
    {
      customDomEventName: window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGE_SENT,
      interactionName: "agent-message-sent",
      getAttributes: (e) => ({
        conversationId: e.detail.conversationId,
        message: getTextMessageContentFromOnMessageSentEvent(e)
      })
    },
    {
      customDomEventName: window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_CONVERSATION_ROUTED,
      interactionName: "agent-conversation-routed",
      getAttributes: (e) => ({
        conversationId: e.detail.conversationId
      })
    }
  ];
  const sendDataCloudAgentEngagementEvent = (interactionName, attributes) => {
    var _a;
    (_a = window.getSalesforceInteractions()) == null ? void 0 : _a.sendEvent({
      interaction: {
        name: interactionName,
        eventType: DATA_CLOUD_AGENT_ENGAGEMENT_EVENT_TYPE,
        ...attributes
      }
    });
  };
  const getTextMessageContentFromOnMessageSentEvent = (e) => {
    var _a;
    const parsedConversationEntry = window.AdaptiveWebsite.util.parseEntryPayload(e.detail.conversationEntry);
    return (_a = getMessagePayloadFromConversationEntry(parsedConversationEntry)) == null ? void 0 : _a.text;
  };
  function App() {
    const [conversationMessages, setConversationMessages] = reactExports.useState([]);
    const [showChatBot, setShowChatBot] = reactExports.useState(false);
    const [isReady, setIsReady] = reactExports.useState(false);
    const handleMinimize = () => {
      setShowChatBot(false);
    };
    const handleMaximize = () => {
      setShowChatBot(true);
    };
    const handleConversationOpened = () => {
      setShowChatBot(true);
    };
    const handleConversationReady = () => {
      setIsReady(true);
      if (window.AdaptiveWebsite.sessionExists()) {
        window.AdaptiveWebsite.initializeConversation(getPreChatData()).catch((error) => {
          logger.error("Failed to initialize conversation:", error);
        });
      }
    };
    const handleConversationClosed = () => {
      setIsReady(false);
    };
    const handleMessageReceived = (event) => {
      setConversationMessages((prev) => [...prev, window.AdaptiveWebsite.util.parseEntryPayload(event.detail.conversationEntry)]);
    };
    const handleListConversationEntries = (event) => {
      const conversationMessages2 = event.detail.entries.filter(window.AdaptiveWebsite.util.isConversationEntryStaticContentMessage);
      if (conversationMessages2.length > 0) {
        setConversationMessages(conversationMessages2);
      }
    };
    const handleInitialMessageFromUser = (textToSend) => {
      window.AdaptiveWebsite.initializeConversation(getPreChatData()).then(() => {
        window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGE_SENT, () => {
          window.AdaptiveWebsite.sendTextMessage(textToSend);
        }, { once: true });
      }).catch((error) => {
        logger.error("Failed to initialize conversation:", error);
      });
    };
    const getPreChatData = () => {
      var _a;
      const anonymousId = (_a = window.getSalesforceInteractions()) == null ? void 0 : _a.getAnonymousId();
      const preChatData = {};
      if (anonymousId && typeof anonymousId === "string") {
        preChatData["Individual_Id"] = anonymousId;
      }
      return preChatData;
    };
    reactExports.useEffect(() => {
      window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGE_SENT, handleMessageReceived);
      window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_LIST_CONVERSATION_ENTRIES, handleListConversationEntries);
      window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_CONVERSATION_READY, handleConversationReady);
      window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_CONVERSATION_OPENED, handleConversationOpened);
      window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_CONVERSATION_CLOSED, handleConversationClosed);
      window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_WINDOW_MINIMIZED, handleMinimize);
      window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_WINDOW_MAXIMIZED, handleMaximize);
      registerEngagementEventListeners();
      return () => {
        window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGE_SENT, handleMessageReceived);
        window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_LIST_CONVERSATION_ENTRIES, handleListConversationEntries);
        window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_CONVERSATION_READY, handleConversationReady);
        window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_CONVERSATION_OPENED, handleConversationOpened);
        window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_CONVERSATION_CLOSED, handleConversationClosed);
        window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_WINDOW_MINIMIZED, handleMinimize);
        window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_WINDOW_MAXIMIZED, handleMaximize);
        unregisterEngagementEventListeners();
      };
    });
    reactExports.useEffect(() => {
      if (conversationMessages.length > 0) {
        setShowChatBot(true);
      } else {
        setShowChatBot(false);
      }
    }, [conversationMessages]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "app", children: isReady && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SearchBar, { show: !showChatBot, onInitialMessage: handleInitialMessageFromUser }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { show: showChatBot }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "conversation-container", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChatBot, { show: showChatBot }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ContentZone, { show: showChatBot })
      ] })
    ] }) });
  }
  var reactDomExports = requireReactDom();
  const root = document.createElement("div");
  root.id = "web-curation-overlay-root";
  reactDomExports.flushSync(() => {
    clientExports.createRoot(root).render(
      /* @__PURE__ */ jsxRuntimeExports.jsx(App, {})
    );
  });
  function appendToBody() {
    if (document.body) {
      document.body.appendChild(root);
      return true;
    }
    return false;
  }
  if (!appendToBody()) {
    const observer = new MutationObserver((mutations, obs) => {
      if (document.body) {
        obs.disconnect();
        appendToBody();
      }
    });
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }
  const recsTemplate = "_recsTemplate_153zu_1";
  const recsBanner = "_recsBanner_153zu_9";
  const recsProductsGrid = "_recsProductsGrid_153zu_21";
  const compareButtonContainer = "_compareButtonContainer_153zu_28";
  const compareButton = "_compareButton_153zu_28";
  const styles$4 = {
    recsTemplate,
    recsBanner,
    recsProductsGrid,
    compareButtonContainer,
    compareButton
  };
  const productLink = "_productLink_1oysg_1";
  const productCard = "_productCard_1oysg_7";
  const productFavorite = "_productFavorite_1oysg_22";
  const productImageContainer$1 = "_productImageContainer_1oysg_54";
  const productName$1 = "_productName_1oysg_71";
  const productPrice$1 = "_productPrice_1oysg_83";
  const productCompare = "_productCompare_1oysg_91";
  const styles$3 = {
    productLink,
    productCard,
    productFavorite,
    productImageContainer: productImageContainer$1,
    productName: productName$1,
    productPrice: productPrice$1,
    productCompare
  };
  const productRating = "_productRating_12zy1_1";
  const small = "_small_12zy1_8";
  const large = "_large_12zy1_13";
  const star = "_star_12zy1_18";
  const starFull = "_starFull_12zy1_32";
  const starHalf = "_starHalf_12zy1_36";
  const starHalfFilled = "_starHalfFilled_12zy1_52";
  const starHalfEmpty = "_starHalfEmpty_12zy1_70";
  const starEmpty = "_starEmpty_12zy1_88";
  const styles$2 = {
    productRating,
    small,
    large,
    star,
    starFull,
    starHalf,
    starHalfFilled,
    starHalfEmpty,
    starEmpty
  };
  const ProductStars = ({ rating, size = "small" }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    const sizeClass = size === "large" ? styles$2.large : styles$2.small;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `${styles$2.productRating} ${sizeClass}`, children: [
      [...Array(fullStars)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `${styles$2.star} ${styles$2.starFull}`, children: "★" }, `full-${i}`)),
      hasHalfStar && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `${styles$2.star} ${styles$2.starHalf}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles$2.starHalfFilled, children: "★" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles$2.starHalfEmpty, children: "★" })
      ] }),
      [...Array(emptyStars)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `${styles$2.star} ${styles$2.starEmpty}`, children: "★" }, `empty-${i}`))
    ] });
  };
  const ProductCard = ({
    product,
    onCompareChange,
    showCompare,
    compareDisabled
  }) => {
    const handleFavoriteClick = (e) => {
      logger.debug("Favorite clicked for product:", product.id);
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "a",
      {
        href: "#",
        className: styles$3.productLink,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$3.productCard, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$3.productFavorite, onClick: handleFavoriteClick, children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$3.productImageContainer, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: product.image, alt: product.name }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$3.productName, children: product.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$3.productPrice, children: product.price }),
          product.rating && /* @__PURE__ */ jsxRuntimeExports.jsx(ProductStars, { rating: product.rating, size: "small" }),
          showCompare && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$3.productCompare, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "checkbox",
                id: `compare-${product.id}`,
                onChange: () => onCompareChange && onCompareChange(product.id),
                disabled: compareDisabled
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: `compare-${product.id}`, children: "Compare" })
          ] })
        ] })
      }
    );
  };
  const Recs = ({ content }) => {
    const recsData = (content == null ? void 0 : content.curation) || {};
    const products = (recsData == null ? void 0 : recsData.products) || [];
    const bannerImage = recsData == null ? void 0 : recsData.bannerImage;
    const MAX_COMPARE_PRODUCTS = 3;
    const [compareCheckboxesSelected, setCompareCheckboxesSelected] = reactExports.useState([]);
    const handleCompareChange = (id) => {
      if (compareCheckboxesSelected.includes(id)) {
        setCompareCheckboxesSelected(compareCheckboxesSelected.filter((refId) => refId !== id));
      } else {
        setCompareCheckboxesSelected([...compareCheckboxesSelected, id]);
      }
    };
    const handleCompareProducts = () => {
      logger.debug("Comparing products:", compareCheckboxesSelected);
    };
    const shouldDisableCompareCheckbox = (id) => {
      return compareCheckboxesSelected.length >= MAX_COMPARE_PRODUCTS && !compareCheckboxesSelected.includes(id);
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$4.recsTemplate, children: [
      bannerImage && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$4.recsBanner, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: bannerImage, alt: "Banner" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$4.recsProductsGrid, children: products.map((product) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        ProductCard,
        {
          product,
          showCompare: true,
          compareDisabled: shouldDisableCompareCheckbox(product.id),
          onCompareChange: handleCompareChange
        },
        product.id
      )) }),
      compareCheckboxesSelected.length >= MAX_COMPARE_PRODUCTS && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$4.compareButtonContainer, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: styles$4.compareButton,
          onClick: handleCompareProducts,
          children: "Compare Products"
        }
      ) })
    ] });
  };
  const Recs$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: Recs
  }, Symbol.toStringTag, { value: "Module" }));
  const comparisonTemplate = "_comparisonTemplate_1nvy2_1";
  const comparisonGrid = "_comparisonGrid_1nvy2_8";
  const comparisonColumn = "_comparisonColumn_1nvy2_15";
  const featuresSection$1 = "_featuresSection_1nvy2_21";
  const featureRow = "_featureRow_1nvy2_28";
  const featureName$1 = "_featureName_1nvy2_37";
  const featureValue$1 = "_featureValue_1nvy2_46";
  const styles$1 = {
    comparisonTemplate,
    comparisonGrid,
    comparisonColumn,
    featuresSection: featuresSection$1,
    featureRow,
    featureName: featureName$1,
    featureValue: featureValue$1
  };
  const Comparison = ({ content }) => {
    const comparisonData = (content == null ? void 0 : content.curation) || {};
    const products = (comparisonData == null ? void 0 : comparisonData.products) || [];
    const displayProducts = products.slice(0, 3);
    const getAllFeatures = () => {
      const featureSet = /* @__PURE__ */ new Set();
      displayProducts.forEach((product) => {
        var _a;
        (_a = product.features) == null ? void 0 : _a.forEach((feature) => {
          featureSet.add(feature.name);
        });
      });
      return Array.from(featureSet).slice(0, 5);
    };
    const allFeatures = getAllFeatures();
    const getFeatureValue = (product, featureName2) => {
      var _a;
      const feature = (_a = product.features) == null ? void 0 : _a.find((f) => f.name === featureName2);
      return (feature == null ? void 0 : feature.value) || "—";
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$1.comparisonTemplate, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$1.comparisonGrid, children: displayProducts.map((product) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$1.comparisonColumn, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product }),
      allFeatures.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$1.featuresSection, children: allFeatures.map((featureName2, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$1.featureRow, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$1.featureName, children: featureName2 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$1.featureValue, children: getFeatureValue(product, featureName2) })
      ] }, index)) })
    ] }, product.id)) }) });
  };
  const Comparison$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: Comparison
  }, Symbol.toStringTag, { value: "Module" }));
  const productDetailsTemplate = "_productDetailsTemplate_19kxk_1";
  const productDetailsContainer = "_productDetailsContainer_19kxk_9";
  const productImageSection = "_productImageSection_19kxk_17";
  const productImageContainer = "_productImageContainer_19kxk_22";
  const productInfoSection = "_productInfoSection_19kxk_38";
  const itemNumber = "_itemNumber_19kxk_44";
  const productName = "_productName_19kxk_51";
  const productPrice = "_productPrice_19kxk_59";
  const actionButtons = "_actionButtons_19kxk_66";
  const addToCartButton = "_addToCartButton_19kxk_73";
  const favoriteButton = "_favoriteButton_19kxk_103";
  const featuresSection = "_featuresSection_19kxk_134";
  const featuresTitle = "_featuresTitle_19kxk_140";
  const featuresList = "_featuresList_19kxk_149";
  const featureItem = "_featureItem_19kxk_158";
  const featureName = "_featureName_19kxk_165";
  const featureValue = "_featureValue_19kxk_170";
  const styles = {
    productDetailsTemplate,
    productDetailsContainer,
    productImageSection,
    productImageContainer,
    productInfoSection,
    itemNumber,
    productName,
    productPrice,
    actionButtons,
    addToCartButton,
    favoriteButton,
    featuresSection,
    featuresTitle,
    featuresList,
    featureItem,
    featureName,
    featureValue
  };
  const ProductDetails = ({ content }) => {
    const detailsData = (content == null ? void 0 : content.curation) || {};
    const product = detailsData == null ? void 0 : detailsData.product;
    if (!product) {
      return null;
    }
    const handleAddToCart = () => {
      logger.debug("Add to cart clicked for product:", product.id);
    };
    const handleFavoriteClick = () => {
      logger.debug("Favorite clicked for product:", product.id);
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles.productDetailsTemplate, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.productDetailsContainer, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles.productImageSection, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles.productImageContainer, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: product.image, alt: product.name }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.productInfoSection, children: [
        product.itemNumber && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.itemNumber, children: [
          "ITEM NO.: ",
          product.itemNumber
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: styles.productName, children: product.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles.productPrice, children: product.price }),
        product.rating && /* @__PURE__ */ jsxRuntimeExports.jsx(ProductStars, { rating: product.rating, size: "large" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.actionButtons, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              className: styles.addToCartButton,
              onClick: handleAddToCart,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "3", y1: "6", x2: "21", y2: "6" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M16 10a4 4 0 0 1-8 0" })
                ] }),
                "ADD TO CART"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: styles.favoriteButton,
              onClick: handleFavoriteClick,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" }) })
            }
          )
        ] }),
        product.features && product.features.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.featuresSection, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: styles.featuresTitle, children: "FEATURES" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: styles.featuresList, children: product.features.map((feature, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: styles.featureItem, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: styles.featureName, children: [
              feature.name,
              ":"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles.featureValue, children: feature.value })
          ] }, index)) })
        ] })
      ] })
    ] }) });
  };
  const ProductDetails$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: ProductDetails
  }, Symbol.toStringTag, { value: "Module" }));
  
  }
  
  // Export functions to window for global access
  window.addControllerToPage = addControllerToPage;
  window.addAppToPage = addAppToPage;
  

try{ 
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