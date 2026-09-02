import { APP_CONSTANTS, STORAGE_KEYS, MESSAGING_API_CONSTANTS, CONVERSATION_CONSTANTS, SUPPORTED_ENTRY_TYPES } from "./constants";
import { getOrganizationId, getDeploymentDeveloperName, getSalesforceMessagingUrl } from "./dataProvider";
import { getItemInWebStorageByKey } from "./webstorageUtils";
import { util } from "./common";
import { ErrorCode, HttpError, ValidationError } from "./errors";
import logger from "./logger";

import type { ParticipantRole, EntryType } from "./conversation";
import type { StaticContentMessage, ChoicesResponseMessage } from "./conversation";

interface ListConversationEntriesResponse {
	conversationEntries: ConversationEntry[];
}

export interface ConversationEntry {
	conversationId: string;
	entryType: EntryType;
	entryPayload: EntryPayloadWithStaticContentMessage | EntryPayloadWithChoicesResponseMessage | EntryPayloadWithRoutingResultMessage | EntryWithParticipantChangedMessage;
	transcriptedTimestamp: number;
	sender: {
		role: ParticipantRole;
		subject: string;
	};
	clientTimestamp: number;
	identifier: string;
	senderDisplayName: string;
	actorType: ParticipantRole;
	actorName: string;
    isSent?: boolean;
    isDelivered?: boolean;
    deliveryAcknowledgementTimestamp?: number;
    isRead?: boolean;
    readAcknowledgementTimestamp?: number;
    relatedRecords?: string[];
}

export interface ConversationEntryWithStaticContentMessage extends ConversationEntry {
	entryPayload: EntryPayloadWithStaticContentMessage;
}

export interface ConversationEntryWithParticipantChangedMessage extends ConversationEntry {
	entryPayload: EntryWithParticipantChangedMessage;
}

export interface ConversationEntryWithChoicesResponseMessage extends ConversationEntry {
	entryPayload: EntryPayloadWithChoicesResponseMessage;
}

export interface ConversationEntryWithRoutingResultMessage extends ConversationEntry {
	entryPayload: EntryPayloadWithRoutingResultMessage;
}

interface EntryPayloadWithStaticContentMessage {
	abstractMessage: StaticContentMessage;
}

interface EntryPayloadWithChoicesResponseMessage {
	abstractMessage: ChoicesResponseMessage;
}

interface EntryWithParticipantChangedMessage extends ConversationEntry {
    entryType: typeof CONVERSATION_CONSTANTS.EntryTypes.PARTICIPANT_CHANGED,
    id: string,
    entries: {
        operation: typeof CONVERSATION_CONSTANTS.ParticipantChangedOperations[keyof typeof CONVERSATION_CONSTANTS.ParticipantChangedOperations],
        menuMetadata: string | null,
        participant: {
            role: ParticipantRole,
            appType: string,
            subject: string,
            clientIdentifier: string
        },
        displayName: string
    }[]
}

interface EntryPayloadWithRoutingResultMessage {
	entryType: typeof CONVERSATION_CONSTANTS.EntryTypes.ROUTING_RESULT,
	id: string,
	recordId: string,
	errorMessages: string[],
	pendingServiceRoutingId: string,
	skipRouterCPRemovalIfNoRoutingFailures: boolean,
	workOwnerId: string | null,
	routingType: typeof CONVERSATION_CONSTANTS.RoutingTypes[keyof typeof CONVERSATION_CONSTANTS.RoutingTypes],
	estimatedWaitTime: {
		estimatedWaitTimeInSeconds: number | null,
		isEWTRequested: boolean
	},
	failureReason: string,
	failureType: typeof CONVERSATION_CONSTANTS.RoutingFailureTypes[keyof typeof CONVERSATION_CONSTANTS.RoutingFailureTypes],
	isExternallyRouted: boolean,
	cancelReason: string | null,
	routingConfigurationDetails: {
		routingConfigurationType: string,
		queueId: string
	}
}
interface ListConversationsResponse {
	openConversationsFound: number;
	closedConversationsFound: number;
	conversations: {
		conversationId: string;
		startTimestamp: number;
		endTimestamp: number;
	}[];
}

/**
 * Send an HTTP request using fetch with a specified path, method, mode, headers, and body.
 *
 * @param {String} apiPath - Endpoint to make request to.
 * @param {String} method - HTTP request method (POST, GET, DELETE).
 * @param {String} mode - HTTP mode (cors, no-cors, same-origin, navigate).
 * @param {Object} requestHeaders - Headers to include with request.
 * @param {Object} requestBody - Body to include with request. This method stringifies the object passed in, except when
 *                               uploading a file. For file attachments, request body must be binary data.
 * @returns {Promise}
 */
function sendFetchRequest(apiPath: string, method: string, mode: RequestMode, requestHeaders: Record<string, string> | null, requestBody: object | null) {
	const messagingJwt = getItemInWebStorageByKey(STORAGE_KEYS.JWT);
	const headers: Record<string, string> = requestHeaders ?
		requestHeaders :
		{
			"Content-Type": "application/json",
			...(messagingJwt && { "Authorization": "Bearer " + messagingJwt })
		};
	const body = requestBody ? JSON.stringify(requestBody) : undefined;

	return fetch(
		apiPath,
		{
			method,
			mode,
			headers,
			...(body && { body })
		}
	).then(async (response) => {
		if (response.status === 401) {
			// Don't automatically clear web storage here - let the error handler decide
			// This preserves the messaging URL and other configuration
			logger.warn("Received 401 Unauthorized - JWT may be expired");
		}
		if (!response.ok) {
			let errorMessage: string;
			try {
				// Assume the body is text with an error message
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
};

/**
 * Get a JWT for an anonymous user. This JWT is used for unauthenticated conversations.
 *
 * Refer https://developer.salesforce.com/docs/service/messaging-api/references/miaw-api-reference?meta=generateAccessTokenForUnauthenticatedUser
 *
 * @returns {Promise}
 */
function getUnauthenticatedAccessToken() {
	const orgId = getOrganizationId();
	const esDeveloperName = getDeploymentDeveloperName();
	const messagingUrl = getSalesforceMessagingUrl();
	const capabilitiesVersion = APP_CONSTANTS.APP_CAPABILITIES_VERSION;
	const platform = APP_CONSTANTS.APP_PLATFORM;

	// Validate required parameters
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
	).then(response => response.json());
}

/**
 * Create a new conversation.
 *
 * Refer https://developer.salesforce.com/docs/service/messaging-api/references/miaw-api-reference?meta=createConversation
 *
 * @param {Object} routingAttributes - Optional. Prechat data to be used while routing the conversation request.
 * @returns {Promise}
 */
function createConversation(conversationId: string | undefined, routingAttributes?: object) {
	const esDeveloperName = getDeploymentDeveloperName();
	const messagingUrl = getSalesforceMessagingUrl();
	const apiPath = `${messagingUrl}/iamessage/api/v2/conversation`;

	return sendFetchRequest(
		apiPath,
		"POST",
		"cors",
		null,
		{
			...(routingAttributes && { routingAttributes }),
			esDeveloperName,
			conversationId
		}
	);
}

/**
 * Get a JWT with the same subjectId but new clientId as the existing Messaging JWT that was issued previously. This function is used for session continuity in the same tab (page reload) and/or across tabs.
 *
 * Refer https://developer.salesforce.com/docs/service/messaging-api/references/miaw-api-reference?meta=generateContinuationToken
 *
 * @returns {Promise}
 */
function getContinuityJwt() {
	const messagingUrl = getSalesforceMessagingUrl();
	
	// Validate required parameters
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
	).then(response => response.json());
}

/**
 * Get a list of all conversations the current subjectId is participating in.
 * Returns:
 * - number of open conversations
 * - number of closed conversations
 * - array of conversations
 *
 * Refer https://developer.salesforce.com/docs/service/messaging-api/references/miaw-api-reference?meta=listConversations
 *
 * @param {Boolean} includeClosedConversations - Whether to include closed conversations in list. Optional.
 * @returns {Promise}
 */
function listConversations(includeClosedConversations = false): Promise<ListConversationsResponse> {
	const messagingUrl = getSalesforceMessagingUrl();
	const apiPath = `${messagingUrl}/iamessage/api/v2/conversation/list?inclClosedConvs=${includeClosedConversations}&limit=${MESSAGING_API_CONSTANTS.LIST_CONVERSATION_API_NUM_CONVERSATIONS_LIMIT}`;

	return sendFetchRequest(
		apiPath,
		"GET",
		"cors",
		null,
		null
	).then(response => response.json());
};

/**
 * Get a list of conversation entries for a given conversationId.
 * Returns:
 * - array of conversation entries
 *
 * Refer https://developer.salesforce.com/docs/service/messaging-api/references/miaw-api-reference?meta=listConversationEntries
 *
 * @param {String} conversationId - The ID of the conversation to get entries for.
 * @param {Number} startTimestamp - The start time for the window of time being requested. Optional.
 * @param {Number} endTimestamp - The end time for the window of time being requested. Optional.
 * @param {String} direction - Query direction either "FromStart" or "FromEnd" of the conversation. Optional.
 * @returns {Promise}
 */
function listConversationEntries(conversationId: string | undefined, startTimestamp?: number, endTimestamp?: number, direction?: string) {
	if (!conversationId) {
		throw new ValidationError(
			ErrorCode.VALIDATION_MISSING_CONVERSATION_ID,
			`Conversation ID is required but was undefined. Received: ${conversationId}`
		);
	}
	const messagingUrl = getSalesforceMessagingUrl();
	const limitUrlQueryParam = `${MESSAGING_API_CONSTANTS.LIST_CONVERSATION_ENTRIES_API_ENTRIES_LIMIT ? `limit=${MESSAGING_API_CONSTANTS.LIST_CONVERSATION_ENTRIES_API_ENTRIES_LIMIT}` : ``}`;
	const startTimestampUrlQueryParam = `${startTimestamp ? `&startTimestamp=${startTimestamp}` : ``}`;
	const endTimestampUrlQueryParam = `${endTimestamp ? `&endTimestamp=${endTimestamp}` : ``}`;
	const directionUrlQueryParam = `${direction ? `&direction=${direction}` : ``}`;
	const entryTypeFilterUrlQueryParam = `${SUPPORTED_ENTRY_TYPES ? `&entryTypeFilter=${SUPPORTED_ENTRY_TYPES}` : ``}`;
	const apiPath = `${messagingUrl}/iamessage/api/v2/conversation/${conversationId}/entries?${limitUrlQueryParam}${startTimestampUrlQueryParam}${endTimestampUrlQueryParam}${directionUrlQueryParam}${entryTypeFilterUrlQueryParam}`;

	return sendFetchRequest(
		apiPath,
		"GET",
		"cors",
		null,
		null
	).then(response => response.json())
	.then((responseJson: ListConversationEntriesResponse) => {
		// Transform the response to look like a conversation entry received via a server-sent event.
		const transformedData: ConversationEntry[] = [];

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
			// conversationEntry.entryPayload = JSON.stringify(conversationEntry.entryPayload);
			conversationEntry.conversationId = conversationId;
			transformedData.push(conversationEntry);
		});

		return transformedData;
	});
}

/*
 * Publish a text message to a conversation.
 * 
 * Refer https://developer.salesforce.com/docs/service/messaging-api/references/miaw-api-reference?meta=sendMessage
 * 
 * @param {String} conversationId - ID of conversation to send a text message to.
 * @param {String} text - String content to send to conversation.
 * @param {String} messageId - ID of the conversation entry.
 * @param {String} inReplyToMessageId - ID of message this message is a response for.
 * @param {boolean} isNewMessagingSession - Optional. Whether this message should create a new session. Used by session pre-chat forms.
 * @param {Object} routingAttributes - Optional. Pre-chat data to be used while routing the new session request. Used by session pre-chat forms.
 * @param {String} language - Optional. TODO.
 * @returns {Promise}
 */
function sendTextMessage(conversationId: string | undefined, text: string, messageId: string, inReplyToMessageId?: string, isNewMessagingSession?: boolean, routingAttributes?: object, language?: string) {
	const messagingUrl = getSalesforceMessagingUrl();
	const esDeveloperName = getDeploymentDeveloperName();
	const apiPath = `${messagingUrl}/iamessage/api/v2/conversation/${conversationId}/message`;

	return sendFetchRequest(
		apiPath,
		"POST",
		"cors",
		null,
        {
			message: {
				...(inReplyToMessageId && { inReplyToMessageId }),
				id: messageId,
				messageType: CONVERSATION_CONSTANTS.MessageTypes.STATIC_CONTENT_MESSAGE,
				staticContent: {
					formatType: CONVERSATION_CONSTANTS.FormatTypes.TEXT,
					text
				},
			},
			...(routingAttributes && { routingAttributes }),
			...(isNewMessagingSession && { isNewMessagingSession }),
			esDeveloperName,
			...(language && { language })
        }
	).then(response => response.json());
}


/**
 * Publish a started/stopped typing indicator entry to a conversation.
 *
 * @param {string} conversationId - ID of conversation to send a typing indicator to.
 * @param {string} typingIndicator - Indicate whether to typing started or stopped indicator.
 * @returns {Promise}
 */
function sendTypingIndicator(conversationId: string, typingIndicator: string) {
	const messagingUrl = getSalesforceMessagingUrl();
	const apiPath = `${messagingUrl}/iamessage/api/v2/conversation/${conversationId}/entry`;

    return sendFetchRequest(
        apiPath,
        "POST",
        "cors",
        null,
        {
            entryType: typingIndicator,
            id: util.generateUUID()
        }
    );
};

/**
 * Close conversation and clean up JWT:
 * - clear JWT variable on inAppService.
 * - remove JWT from web storage (if web storage is available).
 *
 * This endpoint is typically used for anonymous users.
 *
 * Refer https://developer.salesforce.com/docs/service/messaging-api/references/miaw-api-reference?meta=closeConversation
 *
 * @param {String} conversationId - ID of the conversation to close. Required.
 * @returns {Promise}
 */
function closeConversation(conversationId: string | undefined) {
    const messagingUrl = getSalesforceMessagingUrl();
	const esDeveloperName = getDeploymentDeveloperName();
	const apiPath = `${messagingUrl}/iamessage/api/v2/conversation/${conversationId}?esDeveloperName=${esDeveloperName}`;

    return sendFetchRequest(
        apiPath,
        "DELETE",
        "cors",
        null,
        null
    );
};

export { getUnauthenticatedAccessToken, createConversation, getContinuityJwt, listConversations, listConversationEntries, sendTextMessage, sendTypingIndicator, closeConversation };

