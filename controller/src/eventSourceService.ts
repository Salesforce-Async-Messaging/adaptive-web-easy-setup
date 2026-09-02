import { getOrganizationId, getSalesforceMessagingUrl, getJwt, getLastEventId } from './dataProvider';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { ErrorCode, ValidationError, ConversationConfigurationError } from './errors';

/**
 * Instance of an EventSourcePolyfill object to add or remove event listeners on.
 */
let eventSource: EventSourcePolyfill;

/**
 * Get the request headers for connecting to SSE.
 */
const getEventSourceParams = () => {
    const jwt = getJwt();
    const orgId = getOrganizationId();
    
    if (!jwt || !orgId) {
        throw new ValidationError(
            ErrorCode.VALIDATION_MISSING_MESSAGING_URL,
            `JWT or Organization ID is missing for EventSource connection. jwt: ${!!jwt}, orgId: ${!!orgId}`
        );
    }

    const headers: { [key: string]: string } = {
        "Authorization": "Bearer " + jwt,
        "X-Org-ID": orgId
    };

    const lastEventId = getLastEventId();
    if (lastEventId) {
        headers["Last-Event-ID"] = lastEventId;
    }

    return {
        headers,
        heartbeatTimeout: 90000
    };
};

/**
 * Add event listeners on an EventSourcePolyfill object.
 *
 * @param {String} listenerOperationName - Name of the operator to act on an instance of EventSourcePolyfill, either "addEventListener" or "removeEventListener".
 * @param {Object} eventListenerMap - Map of event names and corresponding handlers for server-sent events. Shape of object is { eventName: eventHandler }.
 */
const handleEventSourceListeners = (listenerOperationName: "addEventListener" | "removeEventListener", eventListenerMap: object) => {
    if (typeof eventSource !== "object") {
        throw new ValidationError(
            ErrorCode.VALIDATION_INVALID_EVENT_SOURCE,
            `Expected EventSource object to be a valid object, but received: ${eventSource}`
        );
    }
    if (typeof listenerOperationName !== "string" || !listenerOperationName.length) {
        throw new ValidationError(
            ErrorCode.VALIDATION_INVALID_EVENT_LISTENER_OPERATION,
            `Expected a valid string to either add or remove event listeners, but received: ${listenerOperationName}`
        );
    }

    Object.entries(eventListenerMap).forEach(entry => {
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

        // Perform event listener operation (add or remove) on eventSource.
        eventSource[listenerOperationName](eventName, eventHandler);
    });
};

/**
 * Establish the EventSource object with handlers for onopen and onerror.
 *
 * @param {String} fullApiPath - The full API path endpoint to request server-sent events.
 * @param {Object} eventListenerMap - Map of event handlers for server-sent events. Shape of object is { eventName: eventHandler }.
 * @returns {Promise}
 */
export const createEventSource = (fullApiPath: string, eventListenerMap: object) => {
    if (!EventSourcePolyfill || typeof EventSourcePolyfill !== "function") {
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

    /**
     * Create a closure here to isolate `reconnectAttempts` and `reconnectIntervalSeconds` values to a single invocation of `createEventSource`.
     * All calls to `resolveEventSource` within a call to `createEventSource` share the same `reconnectAttempts` and `reconnectIntervalSeconds` values.
     *
     * @param {Promise.resolve} resolve - Event source opened.
     * @param {Promise.reject} reject - Attempted to reconnect to event source too many times.
     */
    const resolveEventSource = (resolve: (value?: unknown) => void, reject: (value?: unknown) => void) => {
        try {
            eventSource = new EventSourcePolyfill(fullApiPath, getEventSourceParams());

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

/**
 * Subscribe to EventSource by providing authorization and org details.
 *
 * @param {Object} eventListenerMap - Map of event handlers for server-sent events. Shape of object is { eventName: eventHandler }.
 * @returns {Promise}
 */
export const subscribeToEventSource = (eventListenerMap: object) => {
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
            /**
             * Directly connect to event router endpoint on Salesforce Messaging domain instead of going through ia-message.
             */
            createEventSource(
                eventSourceUrl,
                eventListenerMap
            ).then(
                resolve,
                error => {
                    /**
                     * If this reject function is called, there are likely three possibilities:
                     * 1. a syntactic error in creating the EventSource
                     * 2. too many reconnect attempts
                     * 3. JWT has expired
                     */
                    reject(error);
                }
            ).catch(error => {
                reject(error);
            });
        } catch (error) {
            reject(error);
        }
    });
};

/**
 * Close the event source to end event stream.
 * @returns {Promise}
 */
export const closeEventSource = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
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

