import type { ParticipantRole, StaticContentMessage } from "./conversation";
import type { ConversationEntry, ConversationEntryWithChoicesResponseMessage, ConversationEntryWithParticipantChangedMessage, ConversationEntryWithRoutingResultMessage, ConversationEntryWithStaticContentMessage } from "./messagingService";
import { CONVERSATION_CONSTANTS } from "./constants";
import { ErrorCode, ValidationError, ConversationConfigurationError } from "./errors";
import logger from "./logger";

export interface ServerSentEvent {
    data: string; // JSON string of ParsedServerSentEventData
    lastEventId?: string;
    type: typeof CONVERSATION_CONSTANTS.EventTypes[keyof typeof CONVERSATION_CONSTANTS.EventTypes];
}

export interface ParsedServerSentEventData {
    channelPlatformKey: string;
    channelType: string;
    channelAddressIdentifier: string;
    conversationId: string;
    conversationEntry: Omit<ConversationEntry, 'entryPayload'> & { entryPayload: string };
}

/**
 * Parses JSON data from a server-sent event.
 * @param {object} event - Server-sent event.
 * @returns {object} - Parsed server-sent event data.
 * @throws {Error} if event data is invalid.
 */
export function parseServerSentEventData(event: ServerSentEvent): ParsedServerSentEventData {
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
};

/**
 * Get the sender's display name from incoming typing started/stopped indicator events.
 * @param {Object} data - Data from typing indicator server-sent events.
 * @returns {String} - Parsed display name of sender.
 */
export function getSenderDisplayName(data: ConversationEntry): string {
    return (data && data.senderDisplayName) || "";
};

/**
 * Get the sender's role from incoming typing started/stopped indicator events.
 * @param {Object} data - Data from typing indicator server-sent events.
 * @returns {ParticipantRole} - Parsed role of the sender.
 */
export function getSenderRole(data: ParsedServerSentEventData): ParticipantRole {
    return data?.conversationEntry?.sender?.role
};

/**
 * Parses JSON entry payload field from a server-sent event data.
 * @param {object} data - Server-sent event.
 * @returns {object} - Parsed server-sent event data.
 * @throws {Error} if event data is invalid.
 */
export function parseEntryPayload(data: ParsedServerSentEventData['conversationEntry']) : ConversationEntry {
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

            // Do not create a conversation-entry for unknown/unsupported entryType.
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
        // If it's already a BaseError, re-throw it
        if (err instanceof Error && err.name !== "Error") {
            throw err;
        }
        throw new ConversationConfigurationError(
            ErrorCode.CONVERSATION_FAILED_TO_PARSE_CONVERSATION_ENTRY,
            `Something went wrong while creating a conversation entry: ${err}`,
            undefined,
            err
        );
    }
    
};

//============================================================== STATIC TEXT MESSAGE functions ==============================================================
/**
 * Validates whether the supplied object is a conversation-entry with entry type as CONVERSATION_MESSAGE.
 * @param {object} conversationEntry
 * @returns {boolean} - TRUE - if the conversation-entry is a CONVERSATION_MESSAGE and FALSE - otherwise.
 */
export function isConversationEntryMessage(conversationEntry: ConversationEntry) {
    if (conversationEntry) {
        return conversationEntry.entryType === CONVERSATION_CONSTANTS.EntryTypes.CONVERSATION_MESSAGE;
    }
    return false;
};

/**
 * Validates whether the supplied CONVERSATION_MESSAGE is originating from an end-user participant.
 * @param {object} conversationEntry
 * @returns {boolean} - TRUE - if the CONVERSATION_MESSAGE is sent by the end-user participant and FALSE - otherwise.
 */
export function isMessageFromEndUser(conversationEntry: ConversationEntry) {
    if (isConversationEntryMessage(conversationEntry)) {
        return conversationEntry.sender.role === CONVERSATION_CONSTANTS.ParticipantRoles.ENDUSER;
    }
    return false;
};

/**
 * Validates whether the supplied CONVERSATION_MESSAGE is a STATIC_CONTENT_MESSAGE (i.e. messageType === "STATIC_CONTENT_MESSAGE").
 * @param {object} conversationEntry
 * @returns {boolean} - TRUE - if the CONVERSATION_MESSAGE is a STATIC_CONTENT_MESSAGE and FALSE - otherwise.
 */
export function isConversationEntryStaticContentMessage(conversationEntry: ConversationEntry) : conversationEntry is ConversationEntryWithStaticContentMessage {
    if (isConversationEntryMessage(conversationEntry) && "abstractMessage" in conversationEntry.entryPayload) {
        return "messageType" in conversationEntry.entryPayload.abstractMessage && conversationEntry.entryPayload.abstractMessage.messageType === CONVERSATION_CONSTANTS.MessageTypes.STATIC_CONTENT_MESSAGE;
    }
    return false;
};

/**
 * Gets the supplied STATIC_CONTENT_MESSAGE's payload.
 * @param {object} conversationEntry
 * @returns {object|undefined}
 */
export function getStaticContentPayload(conversationEntry: ConversationEntry) : StaticContentMessage['staticContent'] | undefined {
    if (isConversationEntryStaticContentMessage(conversationEntry)) {
        return conversationEntry.entryPayload.abstractMessage.staticContent;
    }
    return undefined;
};

/**
 * Validates whether the supplied STATIC_CONTENT_MESSAGE is a Text Message (i.e. formatType === "Text").
 * @param {object} conversationEntry
 * @returns {boolean} - TRUE - if the STATIC_CONTENT_MESSAGE is a Text Message and FALSE - otherwise.
 */
export function isTextMessage(conversationEntry: ConversationEntry): boolean { // TODO: fix this return type
    if (isConversationEntryStaticContentMessage(conversationEntry)) {
        return getStaticContentPayload(conversationEntry)?.formatType === CONVERSATION_CONSTANTS.FormatTypes.TEXT;
    }
    return false;
};

/**
 * Gets the supplied Text Message's text.
 * @param {object} conversationEntry
 * @returns {string}
 */
export function getTextMessageContent(conversationEntry: ConversationEntry) {
    if (isTextMessage(conversationEntry)) {
        return getStaticContentPayload(conversationEntry)?.text || "";
    }
    return "";
};

//============================================================== CHOICES MESSAGE functions ==============================================================
/**
 * Validates whether the supplied CONVERSATION_MESSAGE is a CHOICES_MESSAGE (i.e. messageType === "ChoicesMessage").
 * @param {object} conversationEntry
 * @returns {boolean} - TRUE - if the CONVERSATION_MESSAGE is a CHOICES_MESSAGE and FALSE - otherwise.
 */
export function isConversationEntryChoicesMessage(conversationEntry: ConversationEntry) : conversationEntry is ConversationEntryWithChoicesResponseMessage {
    if (isConversationEntryMessage(conversationEntry) && "abstractMessage" in conversationEntry.entryPayload) {
        return "messageType" in conversationEntry.entryPayload.abstractMessage && conversationEntry.entryPayload.abstractMessage.messageType === CONVERSATION_CONSTANTS.MessageTypes.CHOICES_MESSAGE;
    }
    return false;
};

/**
 * Validates whether the supplied CHOICES_MESSAGE is QUICK_REPLIES (i.e. formatType === "QuickReplies") or BUTTONS (i.e. formatType === "Buttons").
 * @param {object} conversationEntry
 * @returns {boolean} - TRUE - if the CHOICES_MESSAGE is a QUICK_REPLIES or BUTTONS format type and FALSE - otherwise.
 */
export function isChoicesMessage(conversationEntry: ConversationEntry) : boolean {
    if (isConversationEntryChoicesMessage(conversationEntry)) {
        return getStaticContentPayload(conversationEntry)?.formatType === CONVERSATION_CONSTANTS.FormatTypes.QUICK_REPLIES 
            || getStaticContentPayload(conversationEntry)?.formatType === CONVERSATION_CONSTANTS.FormatTypes.BUTTONS;
    }
    return false;
};

//============================================================== PARTICIPANT CHANGE functions ==============================================================
/**
 * Validates whether the supplied object is a conversation-entry with entry type as PARTICIPANT_CHANGED.
 * @param {object} conversationEntry
 * @returns {boolean} - TRUE - if the conversation-entry is a PARTICIPANT_CHANGED event and FALSE - otherwise.
 */
export function isConversationEntryParticipantChangedMessage(conversationEntry: ConversationEntry) : conversationEntry is ConversationEntryWithParticipantChangedMessage {
    return conversationEntry.entryType === CONVERSATION_CONSTANTS.EntryTypes.PARTICIPANT_CHANGED;
};

/**
 * Validates whether the supplied PARTICIPANT_CHANGED conversation-entry's participant joined the conversation. 
 * @param {object} conversationEntry
 * @returns {boolean} - TRUE - if the participant joined and FALSE - if the participant left.
 */
export function hasParticipantJoined(conversationEntry: ConversationEntry) : boolean {
    return isConversationEntryParticipantChangedMessage(conversationEntry) && conversationEntry.entryPayload.entries[0].operation === CONVERSATION_CONSTANTS.ParticipantChangedOperations.ADD;
};

/**
 * Gets the supplied PARTICIPANT_CHANGED conversation-entry's participant name.
 * @param {object} conversationEntry
 * @returns {string}
 */
export function getParticipantChangeEventPartcipantName(conversationEntry: ConversationEntry) : string {
    return isConversationEntryParticipantChangedMessage(conversationEntry) && (conversationEntry.entryPayload.entries[0].displayName || conversationEntry.entryPayload.entries[0].participant.role) || "";
};


//============================================================== ROUTING RESULT functions ==============================================================
/**
 * Validates whether the supplied object is a conversation-entry with entry type as ROUTING_RESULT.
 * @param {object} conversationEntry
 * @returns {boolean} - TRUE - if the conversation-entry is a ROUTING_RESULT and FALSE - otherwise.
 */
export function isConversationEntryRoutingResultMessage(conversationEntry: ConversationEntry) : conversationEntry is ConversationEntryWithRoutingResultMessage {
    return conversationEntry.entryType === CONVERSATION_CONSTANTS.EntryTypes.ROUTING_RESULT;
};

/**
 * Parses JSON content that may be wrapped in markdown code blocks (```json ... ```)
 * This is the same logic used by parseJsonInAgentResponse in ConversationController
 * @param content - The content string that may contain JSON wrapped in markdown code blocks
 * @returns The parsed JSON object, or undefined if parsing fails
 */
export function parseJsonInAgentResponse(content: string): any | undefined {
    try {
        const jsonBlockStart = '```json';
        const jsonBlockEnd = '```';

        let jsonContent = content.trim();

        const lower = jsonContent.toLowerCase();
        if (lower.startsWith(jsonBlockStart) && lower.endsWith(jsonBlockEnd)) {
            jsonContent = jsonContent.slice(jsonBlockStart.length);
            jsonContent = jsonContent.slice(0, -jsonBlockEnd.length);
            jsonContent = jsonContent.trim();
        }

        return JSON.parse(jsonContent);
    } catch {
        if (content.toLowerCase().includes('```json')) {
            logger.debug(`Response message did not have valid JSON: ${content}`);
        }
    }
}

