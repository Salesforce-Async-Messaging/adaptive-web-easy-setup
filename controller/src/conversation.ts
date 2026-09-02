import { 
    setJwt, 
    setLastEventId, 
    storeConversationId, 
    getConversationId, 
    getJwt, 
    clearInMemoryData, 
    setDeploymentConfiguration
} from './dataProvider';
import { subscribeToEventSource, closeEventSource } from './eventSourceService';
import { 
    sendTextMessage, 
    getContinuityJwt, 
    listConversations, 
    listConversationEntries, 
    closeConversation, 
    getUnauthenticatedAccessToken, 
    createConversation, 
    type ConversationEntry
} from './messagingService';
import * as ConversationEntryUtil from './conversationEntryUtil';
import { CONVERSATION_CONSTANTS } from './constants';
import { clearWebStorage, initializeWebStorage, type WebStorageParams } from './webstorageUtils';
import { util } from './common';
import { isConversationEntryRoutingResultMessage, isConversationEntryStaticContentMessage, type ParsedServerSentEventData } from './conversationEntryUtil';
import { ErrorCode, ConversationConfigurationError, logError } from './errors';
import logger from './logger';
import { enrichContentWithPersonalizationData } from './personalizationService';

// Type definitions
export type EntryType = typeof CONVERSATION_CONSTANTS.EntryTypes[keyof typeof CONVERSATION_CONSTANTS.EntryTypes];
type MessageType = typeof CONVERSATION_CONSTANTS.MessageTypes[keyof typeof CONVERSATION_CONSTANTS.MessageTypes];
export type ParticipantRole = typeof CONVERSATION_CONSTANTS.ParticipantRoles[keyof typeof CONVERSATION_CONSTANTS.ParticipantRoles];
type ParticipantChangedOperations = typeof CONVERSATION_CONSTANTS.ParticipantChangedOperations[keyof typeof CONVERSATION_CONSTANTS.ParticipantChangedOperations];
type ConversationStatus = typeof CONVERSATION_CONSTANTS.ConversationStatus[keyof typeof CONVERSATION_CONSTANTS.ConversationStatus];
type RoutingFailureType = typeof CONVERSATION_CONSTANTS.RoutingFailureTypes[keyof typeof CONVERSATION_CONSTANTS.RoutingFailureTypes];

export interface StaticContentMessageTextPayload {
    text: string,
    personalizationPoint?: string,
    dynamicContextAttributes?: Record<string, unknown>,
    personalizations?: import('./personalizationService').Personalization[],
    template?: string,
    options?: {
        name: string;
    }[];
}

export interface StaticContentMessage {
    messageType: MessageType,
    inReplyToMessageId: string | null,
    id: string,
    staticContent: {
        formatType: typeof CONVERSATION_CONSTANTS.FormatTypes[keyof typeof CONVERSATION_CONSTANTS.FormatTypes],
        text: string, // possibly stringified JSON of StaticContentMessageTextPayload
    }
}

export interface ParticipantChangedMessage {
    entryType: EntryType,
    id: string,
    entries: {
        operation: ParticipantChangedOperations,
        participant: {
            role: ParticipantRole,
            appType: string,
            subject: string,
            clientIdentifier: string
        },
        displayName: string
    }[]
}

export interface ChoicesResponseMessage {
    messageType: MessageType,
    inReplyToMessageId: string | null,
    id: string,
    choicesResponse: {
        formatType: typeof CONVERSATION_CONSTANTS.FormatTypes[keyof typeof CONVERSATION_CONSTANTS.FormatTypes],
        selectedOptions: {
            optionIdentifier: string
            optionId: string
            optionTitle: string
        }[]
    }
}

export interface RoutingResultMessage {
    failureType: RoutingFailureType,
    id: string
}

export const ConversationEventTypes = {
    ON_EMBEDDED_MESSAGE_SENT: 'onEmbeddedMessageSent',
    ON_EMBEDDED_MESSAGING_CONVERSATION_PARTICIPANT_CHANGED: 'onEmbeddedMessagingConversationParticipantChanged',
    ON_EMBEDDED_MESSAGE_READ: 'onEmbeddedMessageRead',
    ON_EMBEDDED_MESSAGING_CONVERSATION_ROUTED: 'onEmbeddedMessagingConversationRouted',
    ON_EMBEDDED_MESSAGING_CONVERSATION_READY: 'onEmbeddedMessagingConversationReady',
    ON_EMBEDDED_MESSAGING_CONVERSATION_OPENED: 'onEmbeddedMessagingConversationOpened',
    ON_EMBEDDED_MESSAGING_CONVERSATION_STARTED: 'onEmbeddedMessagingConversationStarted',
    ON_EMBEDDED_MESSAGING_CONVERSATION_CLOSED: 'onEmbeddedMessagingConversationClosed',
    ON_EMBEDDED_MESSAGING_WINDOW_MINIMIZED: 'onEmbeddedMessagingWindowMinimized',
    ON_EMBEDDED_MESSAGING_WINDOW_MAXIMIZED: 'onEmbeddedMessagingWindowMaximized',
    // below is not current supported in enhanced chat (according to documentation)
    ON_EMBEDDED_MESSAGING_DELIVERED: 'onEmbeddedMessagingDelivered',
    ON_EMBEDDED_MESSAGING_TYPING_INDICATOR_STARTED: 'onEmbeddedMessagingTypingIndicatorStarted',
    ON_EMBEDDED_MESSAGING_TYPING_INDICATOR_STOPPED: 'onEmbeddedMessagingTypingIndicatorStopped',
    ON_EMBEDDED_MESSAGING_LIST_CONVERSATION_ENTRIES: 'onEmbeddedMessagingListConversationEntries',
    ON_EMBEDDED_MESSAGING_CONTENT_RECEIVED: 'onEmbeddedMessagingContentReceived',
} as const

// Custom DOM event types for the controller
export interface ConversationEventDetail {
    [ConversationEventTypes.ON_EMBEDDED_MESSAGE_SENT]: ParsedServerSentEventData;
    [ConversationEventTypes.ON_EMBEDDED_MESSAGING_CONVERSATION_PARTICIPANT_CHANGED]: ParsedServerSentEventData;
    [ConversationEventTypes.ON_EMBEDDED_MESSAGE_READ]: ParsedServerSentEventData;
    [ConversationEventTypes.ON_EMBEDDED_MESSAGING_CONVERSATION_ROUTED]: ParsedServerSentEventData;
    [ConversationEventTypes.ON_EMBEDDED_MESSAGING_CONVERSATION_READY]: Record<string, never>;
    [ConversationEventTypes.ON_EMBEDDED_MESSAGING_CONVERSATION_OPENED]: { conversationId: string };
    [ConversationEventTypes.ON_EMBEDDED_MESSAGING_CONVERSATION_STARTED]: { conversationId: string };
    [ConversationEventTypes.ON_EMBEDDED_MESSAGING_CONVERSATION_CLOSED]: ParsedServerSentEventData;
    [ConversationEventTypes.ON_EMBEDDED_MESSAGING_WINDOW_MINIMIZED]: Record<string, never>;
    [ConversationEventTypes.ON_EMBEDDED_MESSAGING_WINDOW_MAXIMIZED]: Record<string, never>;
    // below is not current supported in enhanced chat (according to documentation)
    [ConversationEventTypes.ON_EMBEDDED_MESSAGING_DELIVERED]: ParsedServerSentEventData;
    [ConversationEventTypes.ON_EMBEDDED_MESSAGING_TYPING_INDICATOR_STARTED]: ParsedServerSentEventData;
    [ConversationEventTypes.ON_EMBEDDED_MESSAGING_TYPING_INDICATOR_STOPPED]: ParsedServerSentEventData;
    [ConversationEventTypes.ON_EMBEDDED_MESSAGING_LIST_CONVERSATION_ENTRIES]: { entries: ConversationEntry[] };
    [ConversationEventTypes.ON_EMBEDDED_MESSAGING_CONTENT_RECEIVED]: { content: StaticContentMessageTextPayload };
}

/**
 * Controller service that manages conversation state and acts as an event hub
 * This service handles all conversation-related business logic and communicates
 * with React components through custom DOM events
 */
export class ConversationController {
    private parsedServerSentEvents: ParsedServerSentEventData[] = [];
    private conversationStatus: ConversationStatus = CONVERSATION_CONSTANTS.ConversationStatus.NOT_STARTED_CONVERSATION;
    private preChatData?: object;

    public initialize = ({ organizationId, deploymentDeveloperName, messagingUrl }: WebStorageParams): void => {
        initializeWebStorage({ organizationId, deploymentDeveloperName, messagingUrl });
        this.dispatchEvent(ConversationEventTypes.ON_EMBEDDED_MESSAGING_CONVERSATION_READY);
    }

    /**
     * Dispatch custom DOM events
     */
    private dispatchEvent = <K extends keyof ConversationEventDetail>(
        eventName: K, 
        detail?: ConversationEventDetail[K]
    ): void => {
        const event = new CustomEvent(eventName, { detail });
        window.dispatchEvent(event);
    }

    /**
     * Initialize conversation - handles both new and existing conversations
     * @param preChatData - Optional pre-chat data to set routing attributes
     */
    public initializeConversation = async (preChatData?: object): Promise<void> => {
        try {
            // Store pre-chat data if provided
            if (preChatData) {
                this.preChatData = preChatData;
            }
            
            const conversationStatePromise = getJwt() 
                ? this.handleExistingConversation() 
                : this.handleNewConversation();
            
            await conversationStatePromise;
            await this.handleSubscribeToEventSource();
            logger.debug('Conversation initialized successfully');
        } catch (error) {
            logger.error('Failed to initialize conversation:', error);
            throw error;
        }
    }

    /**
     * Cleanup conversation resources
     */
    public cleanupConversation = async (): Promise<void> => {
        try {
            await closeEventSource();
            logger.debug("Closed the Event Source (SSE).");
        } catch (err) {
            logger.error(`Something went wrong in closing the Event Source (SSE): ${err}`);
        }

        clearWebStorage();
        clearInMemoryData();
        this.preChatData = undefined; // Clear pre-chat data
        this.updateConversationStatus(CONVERSATION_CONSTANTS.ConversationStatus.CLOSED_CONVERSATION);
    }

    /**
     * Update conversation status and notify listeners
     */
    private updateConversationStatus = (status: ConversationStatus): void => {
        this.conversationStatus = status;
        const conversationId = getConversationId();
        if (typeof conversationId !== 'string') {
            logger.error("Conversation ID is not defined. Cannot update conversation status.");
            return;
        }
        if (status === CONVERSATION_CONSTANTS.ConversationStatus.OPENED_CONVERSATION) {
            this.dispatchEvent(ConversationEventTypes.ON_EMBEDDED_MESSAGING_CONVERSATION_OPENED);
        } else if (status === CONVERSATION_CONSTANTS.ConversationStatus.CLOSED_CONVERSATION) {
            this.dispatchEvent(ConversationEventTypes.ON_EMBEDDED_MESSAGING_CONVERSATION_CLOSED);
        }
    }

    /**
     * Handles a new conversation
     */
    private handleNewConversation = async (): Promise<void> => {
        try {
            await this.handleGetUnauthenticatedJwt();
            await this.handleCreateNewConversation();
            logger.debug(`Completed initializing a new conversation with conversationId: ${getConversationId()}`);
        } catch (err) {
            logger.error(`Error in handleNewConversation: ${err}`);
            throw err;
        }
    }

    /**
     * Handles an existing conversation
     */
    private handleExistingConversation = async (): Promise<void> => {
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
    }

    /**
     * Handles fetching an Unauthenticated Access Token
     */
    private handleGetUnauthenticatedJwt = async (): Promise<void> => {
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
    }

    /**
     * Handles creating a new conversation
     */
    private handleCreateNewConversation = async (): Promise<void> => {
        if (this.conversationStatus === CONVERSATION_CONSTANTS.ConversationStatus.OPENED_CONVERSATION) {
            logger.warn("Cannot create a new conversation while a conversation is currently open.");
            throw new ConversationConfigurationError(
                ErrorCode.CONVERSATION_ALREADY_OPEN,
                "Conversation already open"
            );
        }

        // Initialize a new unique conversation-id in-memory
        const conversationId = util.generateUUID();
        storeConversationId(conversationId);
        
        try {
            await createConversation(getConversationId(), this.preChatData);
            logger.debug(`Successfully created a new conversation with conversation-id: ${getConversationId()}`);
            this.dispatchEvent(ConversationEventTypes.ON_EMBEDDED_MESSAGING_CONVERSATION_STARTED, { conversationId });
            this.updateConversationStatus(CONVERSATION_CONSTANTS.ConversationStatus.OPENED_CONVERSATION);
        } catch (err) {
            logError(err);
            await this.cleanupConversation();
        }
    }

    /**
     * Handles fetching a Continuation Access Token
     */
    private handleGetContinuityJwt = async (): Promise<void> => {
        try {
            const response = await getContinuityJwt();
            setJwt(response.accessToken);
        } catch (err) {
            logError(err);
        }
    }

    /**
     * Handles fetching a list of all conversations
     */
    private handleListConversations = async (): Promise<void> => {
        try {
            const response = await listConversations();
            
            if (response && response.openConversationsFound > 0 && response.conversations.length) {
                const openConversations = response.conversations;
                if (openConversations.length > 1) {
                    logger.warn(`Expected the user to be participating in 1 open conversation but instead found ${openConversations.length}. Loading the conversation with latest startTimestamp.`);
                    openConversations.sort((conversationA, conversationB) => conversationB.startTimestamp - conversationA.startTimestamp);
                }
                
                // Update conversation-id with the one from service
                storeConversationId(openConversations[0].conversationId);
            } else {
                // No open conversations found
                await this.cleanupConversation();
            }
        } catch (err) {
            logError(err);
        }
    }

    /**
     * Handles fetching conversation entries
     */
    private handleListConversationEntries = async (): Promise<void> => {
        try {
            const response = await listConversationEntries(getConversationId());
            
            if (Array.isArray(response)) {
                response.reverse().filter(conversationEntry => {
                    return conversationEntry.conversationId === getConversationId() && (
                        conversationEntry.entryType === CONVERSATION_CONSTANTS.EntryTypes.CONVERSATION_MESSAGE || 
                        conversationEntry.entryType === CONVERSATION_CONSTANTS.EntryTypes.PARTICIPANT_CHANGED || 
                        conversationEntry.entryType === CONVERSATION_CONSTANTS.EntryTypes.ROUTING_RESULT
                    );
                });
                this.dispatchEvent(ConversationEventTypes.ON_EMBEDDED_MESSAGING_LIST_CONVERSATION_ENTRIES, { entries: response });
            } else {
                logger.error(`Expecting a response of type Array from listConversationEntries but instead received: ${response}`);
            }
        } catch (err) {
            logError(err);
        }
    }

    /**
     * Handles establishing connection to EventSource
     */
    private handleSubscribeToEventSource = async (): Promise<void> => {
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
    }

    /**
     * Generate a Conversation Entry object from server sent event
     */
    private generateConversationEntryForServerSentEvent = (parsedServerSentEvent: ParsedServerSentEventData): ConversationEntry => {
        const conversationEntry = ConversationEntryUtil.parseEntryPayload(parsedServerSentEvent.conversationEntry);

        // Handle server sent events only for the current conversation
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
    }

    /**
     * Handle CONVERSATION_MESSAGE server-sent event
     */
    private handleConversationMessageServerSentEvent = (event: ConversationEntryUtil.ServerSentEvent): void => {
        try {
            // Update in-memory to the latest lastEventId
            if (event && event.lastEventId) {
                setLastEventId(event.lastEventId);
            }

            const parsedEventData = ConversationEntryUtil.parseServerSentEventData(event);
            this.parsedServerSentEvents.push(parsedEventData);
            const conversationEntry = this.generateConversationEntryForServerSentEvent(parsedEventData);

            if (isConversationEntryStaticContentMessage(conversationEntry) && !ConversationEntryUtil.isMessageFromEndUser(conversationEntry)) {
                const content = ConversationEntryUtil.parseJsonInAgentResponse(conversationEntry.entryPayload.abstractMessage.staticContent.text)
                if (content !== undefined && content !== null) {
                    logger.debug(`Static content message text: `, content);
                    if (content.personalizationPoint) {
                        this.enrichAndDispatchContent(content);
                    } else {
                        this.dispatchEvent(ConversationEventTypes.ON_EMBEDDED_MESSAGING_CONTENT_RECEIVED, { content });
                    }
                }
            }
            this.dispatchEvent(ConversationEventTypes.ON_EMBEDDED_MESSAGE_SENT, parsedEventData);
        } catch (err) {
            logger.error(`Something went wrong in handling conversation message server sent event: ${err}`);
        }
    }

    private enrichAndDispatchContent = async (content: StaticContentMessageTextPayload): Promise<void> => {
        try {
            const enrichedContent = await enrichContentWithPersonalizationData(content);
            this.dispatchEvent(ConversationEventTypes.ON_EMBEDDED_MESSAGING_CONTENT_RECEIVED, { content: enrichedContent });
        } catch (error) {
            logger.error('Failed to enrich content with personalization data, dispatching original:', error);
            this.dispatchEvent(ConversationEventTypes.ON_EMBEDDED_MESSAGING_CONTENT_RECEIVED, { content });
        }
    }

    /**
     * Handle ROUTING_RESULT server-sent event
     */
    private handleRoutingResultServerSentEvent = (event: ConversationEntryUtil.ServerSentEvent): void => {
        try {
            // Update in-memory to the latest lastEventId
            if (event && event.lastEventId) {
                setLastEventId(event.lastEventId);
            }

            const parsedEventData = ConversationEntryUtil.parseServerSentEventData(event);
            this.parsedServerSentEvents.push(parsedEventData);
            const conversationEntry = this.generateConversationEntryForServerSentEvent(parsedEventData);
            if (!isConversationEntryRoutingResultMessage(conversationEntry)) {
                return;
            }

            if (conversationEntry.entryPayload.routingType === CONVERSATION_CONSTANTS.RoutingTypes.INITIAL) {
                // Render reasonForNotRouting when initial routing fails
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
    }

    /**
     * Handle PARTICIPANT_CHANGED server-sent event
     */
    private handleParticipantChangedServerSentEvent = (event: ConversationEntryUtil.ServerSentEvent): void => {
        try {
            // Update in-memory to the latest lastEventId
            if (event && event.lastEventId) {
                setLastEventId(event.lastEventId);
            }

            const parsedEventData = ConversationEntryUtil.parseServerSentEventData(event);
            this.parsedServerSentEvents.push(parsedEventData);
            this.dispatchEvent(ConversationEventTypes.ON_EMBEDDED_MESSAGING_CONVERSATION_PARTICIPANT_CHANGED, parsedEventData);
        } catch (err) {
            logger.error(`Something went wrong in handling participant changed server sent event: ${err}`);
        }
    }

    /**
     * Handle TYPING_STARTED_INDICATOR server-sent event
     */
    private handleTypingStartedIndicatorServerSentEvent = (event: ConversationEntryUtil.ServerSentEvent): void => {
        try {
            // Update in-memory to the latest lastEventId
            if (event && event.lastEventId) {
                setLastEventId(event.lastEventId);
            }

            const parsedEventData = ConversationEntryUtil.parseServerSentEventData(event);
            this.parsedServerSentEvents.push(parsedEventData);
            // Handle typing indicators only for the current conversation
            if (getConversationId() === parsedEventData.conversationId) {
                if (ConversationEntryUtil.getSenderRole(parsedEventData) !== CONVERSATION_CONSTANTS.ParticipantRoles.ENDUSER) {
                    this.dispatchEvent(ConversationEventTypes.ON_EMBEDDED_MESSAGING_TYPING_INDICATOR_STARTED, parsedEventData);
                }
            }
        } catch (err) {
            logger.error(`Something went wrong in handling typing started indicator server sent event: ${err}`);
        }
    }

    /**
     * Handle TYPING_STOPPED_INDICATOR server-sent event
     */
    private handleTypingStoppedIndicatorServerSentEvent = (event: ConversationEntryUtil.ServerSentEvent): void => {
        try {
            // Update in-memory to the latest lastEventId
            if (event && event.lastEventId) {
                setLastEventId(event.lastEventId);
            }

            const parsedEventData = ConversationEntryUtil.parseServerSentEventData(event);
            this.parsedServerSentEvents.push(parsedEventData);
            // Handle typing indicators only for the current conversation
            if (getConversationId() === parsedEventData.conversationId) {                
                this.dispatchEvent(ConversationEventTypes.ON_EMBEDDED_MESSAGING_TYPING_INDICATOR_STOPPED, parsedEventData);
            }
        } catch (err) {
            logger.error(`Something went wrong in handling typing stopped indicator server sent event: ${err}`);
        }
    }

    /**
     * Handle CONVERSATION_DELIVERY_ACKNOWLEDGEMENT server-sent event
     */
    private handleConversationDeliveryAcknowledgementServerSentEvent = (event: ConversationEntryUtil.ServerSentEvent): void => {
        try {
            // Update in-memory to the latest lastEventId
            if (event && event.lastEventId) {
                setLastEventId(event.lastEventId);
            }

            const parsedEventData = ConversationEntryUtil.parseServerSentEventData(event);
            this.parsedServerSentEvents.push(parsedEventData);
            // Handle delivery acknowledgements only for the current conversation
            if (getConversationId() === parsedEventData.conversationId) {
                if (parsedEventData.conversationEntry.relatedRecords && parsedEventData.conversationEntry.relatedRecords.length) { // TODO: why this line?
                    this.dispatchEvent(ConversationEventTypes.ON_EMBEDDED_MESSAGING_DELIVERED, parsedEventData);
                }
            }
        } catch (err) {
            logger.error(`Something went wrong in handling conversation delivery acknowledgement server sent event: ${err}`);
        }
    }

    /**
     * Handle CONVERSATION_READ_ACKNOWLEDGEMENT server-sent event
     */
    private handleConversationReadAcknowledgementServerSentEvent = (event: ConversationEntryUtil.ServerSentEvent): void => {
        try {
            // Update in-memory to the latest lastEventId
            if (event && event.lastEventId) {
                setLastEventId(event.lastEventId);
            }

            const parsedEventData = ConversationEntryUtil.parseServerSentEventData(event);
            this.parsedServerSentEvents.push(parsedEventData);
            // Handle read acknowledgements only for the current conversation
            if (getConversationId() === parsedEventData.conversationId) {
                if (parsedEventData.conversationEntry.relatedRecords && parsedEventData.conversationEntry.relatedRecords.length) { // TODO: why this line?
                    this.dispatchEvent(ConversationEventTypes.ON_EMBEDDED_MESSAGE_READ, parsedEventData);
                }
            }
        } catch (err) {
            logger.error(`Something went wrong in handling conversation read acknowledgement server sent event: ${err}`);
        }
    }

    /**
     * Handle CONVERSATION_CLOSED server-sent event
     */
    private handleCloseConversationServerSentEvent = (event: ConversationEntryUtil.ServerSentEvent): void => {
        try {
            // Update in-memory to the latest lastEventId
            if (event && event.lastEventId) {
                setLastEventId(event.lastEventId);
            }

            const parsedEventData = ConversationEntryUtil.parseServerSentEventData(event);

            // Do not render conversation ended text if the conversation entry is not for the current conversation
            if (getConversationId() === parsedEventData.conversationId) {
                // Update state to conversation closed status
                this.dispatchEvent(ConversationEventTypes.ON_EMBEDDED_MESSAGING_CONVERSATION_CLOSED);
                this.updateConversationStatus(CONVERSATION_CONSTANTS.ConversationStatus.CLOSED_CONVERSATION);
            }
        } catch (err) {
            logger.error(`Something went wrong while handling conversation closed server sent event in conversation ${getConversationId()}: ${err}`);
        }
    }

    /**
     * Send a text message
     * Internal method with full parameter support
     */
    private sendTextMessageInternal = async (conversationId: string | undefined, value: string, messageId: string, inReplyToMessageId?: string, isNewMessagingSession?: boolean, routingAttributes?: object, language?: string): Promise<void> => {
        try {
            // Use pre-chat data if no routing attributes were provided
            const routingAttrs = routingAttributes || this.preChatData;
            await sendTextMessage(conversationId, value, messageId, inReplyToMessageId, isNewMessagingSession, routingAttrs, language);
        } catch (err) {
            logError(err);
            throw err;
        }
    }

    /**
     * Send a text message (public API - simplified)
     * @param value - The message text to send
     */
    public sendTextMessage = async (value: string): Promise<void> => {
        // Get conversationId from memory
        const conversationId = getConversationId();
        
        if (!conversationId) {
            logger.error('Cannot send message: No active conversation');
            throw new ConversationConfigurationError(
                ErrorCode.CONVERSATION_NO_ACTIVE_CONVERSATION,
                'No active conversation'
            );
        }

        // Generate messageId
        const messageId = util.generateUUID();

        // Deduce inReplyToMessageId by finding the last message from an agent
        let inReplyToMessageId: string | undefined;
        for (let i = this.parsedServerSentEvents.length - 1; i >= 0; i--) {
            const parsedEventData = this.parsedServerSentEvents[i];
            const conversationEntry = this.generateConversationEntryForServerSentEvent(parsedEventData);
            if (!conversationEntry) {
                continue;
            }
            if (ConversationEntryUtil.isMessageFromEndUser(conversationEntry)) {
                // Skip end user messages
                continue;
            }
            // Found the last non-end-user message, this is what we should reply to
            inReplyToMessageId = conversationEntry.identifier;
            break;
        }

        // Use pre-chat data from memory
        const routingAttributes = this.preChatData;

        // TODO: Add language support
        const language: string | undefined = undefined;

        await this.sendTextMessageInternal(conversationId, value, messageId, inReplyToMessageId, undefined, routingAttributes, language);
    }

    /**
     * End the current conversation
     */
    public endConversation = async (): Promise<void> => {
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
    }

    /**
     * Start a new conversation
     * @param preChatData - Optional pre-chat data to set routing attributes
     */
    public startNewConversation = async (preChatData?: object): Promise<void> => {
        // First end the existing conversation
        await this.endConversation();
        
        // Reset the state
        this.parsedServerSentEvents = [];

        // Store pre-chat data if provided
        if (preChatData) {
            this.preChatData = preChatData;
        }

        // Create a new conversation
        await this.handleNewConversation();
        logger.debug('New conversation created successfully');
    }

    /**
     * Check if a session exists
     */
    public sessionExists = (): boolean => {
        return getJwt() !== undefined;
    }

    /**
     * Minimize the conversation UI
     */
    public minimize = (): void => {
        this.dispatchEvent(ConversationEventTypes.ON_EMBEDDED_MESSAGING_WINDOW_MINIMIZED, {} as Record<string, never>);
    }

    /**
     * Maximize the conversation UI
     */
    public maximize = (): void => {
        this.dispatchEvent(ConversationEventTypes.ON_EMBEDDED_MESSAGING_WINDOW_MAXIMIZED, {} as Record<string, never>);
    }
}

