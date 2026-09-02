import { type StaticContentMessageTextPayload, ConversationController, ConversationEventDetail, ConversationEventTypes } from "./src/conversation";
import * as ConversationEntryUtil from "./src/conversationEntryUtil";
import type { ParsedServerSentEventData } from "./src/conversationEntryUtil";
import type { ConversationEntry, ConversationEntryWithStaticContentMessage } from "./src/messagingService";
import { WebStorageParams } from "./src/webstorageUtils";
import {
    LogLevel,
    getLogLevel as getControllerLoggerLevel,
    setLogLevel as setControllerLoggerLevel,
} from "./src/logger";

// Export a singleton instance
const conversationController = new ConversationController();

// Define custom event types for the conversation controller
declare global {
    interface WindowEventMap {
        [ConversationEventTypes.ON_EMBEDDED_MESSAGE_SENT]: CustomEvent<ConversationEventDetail[typeof ConversationEventTypes.ON_EMBEDDED_MESSAGE_SENT]>;
        [ConversationEventTypes.ON_EMBEDDED_MESSAGING_CONVERSATION_PARTICIPANT_CHANGED]: CustomEvent<ConversationEventDetail[typeof ConversationEventTypes.ON_EMBEDDED_MESSAGING_CONVERSATION_PARTICIPANT_CHANGED]>;
        [ConversationEventTypes.ON_EMBEDDED_MESSAGING_TYPING_INDICATOR_STARTED]: CustomEvent<ConversationEventDetail[typeof ConversationEventTypes.ON_EMBEDDED_MESSAGING_TYPING_INDICATOR_STARTED]>;
        [ConversationEventTypes.ON_EMBEDDED_MESSAGING_TYPING_INDICATOR_STOPPED]: CustomEvent<ConversationEventDetail[typeof ConversationEventTypes.ON_EMBEDDED_MESSAGING_TYPING_INDICATOR_STOPPED]>;
        [ConversationEventTypes.ON_EMBEDDED_MESSAGE_READ]: CustomEvent<ConversationEventDetail[typeof ConversationEventTypes.ON_EMBEDDED_MESSAGE_READ]>;
        [ConversationEventTypes.ON_EMBEDDED_MESSAGING_CONVERSATION_ROUTED]: CustomEvent<ConversationEventDetail[typeof ConversationEventTypes.ON_EMBEDDED_MESSAGING_CONVERSATION_ROUTED]>;
        [ConversationEventTypes.ON_EMBEDDED_MESSAGING_CONTENT_RECEIVED]: CustomEvent<ConversationEventDetail[typeof ConversationEventTypes.ON_EMBEDDED_MESSAGING_CONTENT_RECEIVED]>;
        [ConversationEventTypes.ON_EMBEDDED_MESSAGING_CONVERSATION_READY]: CustomEvent<ConversationEventDetail[typeof ConversationEventTypes.ON_EMBEDDED_MESSAGING_CONVERSATION_READY]>;
        [ConversationEventTypes.ON_EMBEDDED_MESSAGING_CONVERSATION_OPENED]: CustomEvent<ConversationEventDetail[typeof ConversationEventTypes.ON_EMBEDDED_MESSAGING_CONVERSATION_OPENED]>;
        [ConversationEventTypes.ON_EMBEDDED_MESSAGING_CONVERSATION_STARTED]: CustomEvent<ConversationEventDetail[typeof ConversationEventTypes.ON_EMBEDDED_MESSAGING_CONVERSATION_STARTED]>;
        [ConversationEventTypes.ON_EMBEDDED_MESSAGING_CONVERSATION_CLOSED]: CustomEvent<ConversationEventDetail[typeof ConversationEventTypes.ON_EMBEDDED_MESSAGING_CONVERSATION_CLOSED]>;
        [ConversationEventTypes.ON_EMBEDDED_MESSAGING_WINDOW_MINIMIZED]: CustomEvent<ConversationEventDetail[typeof ConversationEventTypes.ON_EMBEDDED_MESSAGING_WINDOW_MINIMIZED]>;
        [ConversationEventTypes.ON_EMBEDDED_MESSAGING_WINDOW_MAXIMIZED]: CustomEvent<ConversationEventDetail[typeof ConversationEventTypes.ON_EMBEDDED_MESSAGING_WINDOW_MAXIMIZED]>;
        [ConversationEventTypes.ON_EMBEDDED_MESSAGING_DELIVERED]: CustomEvent<ConversationEventDetail[typeof ConversationEventTypes.ON_EMBEDDED_MESSAGING_DELIVERED]>;
        [ConversationEventTypes.ON_EMBEDDED_MESSAGING_LIST_CONVERSATION_ENTRIES]: CustomEvent<ConversationEventDetail[typeof ConversationEventTypes.ON_EMBEDDED_MESSAGING_LIST_CONVERSATION_ENTRIES]>;
    }
}

// Expose AdaptiveWebsite API on window object
declare global {
    interface Window {
        AdaptiveWebsite: {
            initialize: ({ organizationId, deploymentDeveloperName, messagingUrl }: WebStorageParams) => void;
            sendTextMessage: (value: string) => Promise<void>;
            minimize: () => void;
            maximize: () => void;
            initializeConversation: (preChatData?: object) => Promise<void>;
            cleanupConversation: () => Promise<void>;
            startNewConversation: (preChatData?: object) => Promise<void>;
            endConversation: () => Promise<void>;
            sessionExists: () => boolean;
            Events: typeof ConversationEventTypes;
            util: {
                isConversationEntryStaticContentMessage: (conversationEntry: ConversationEntry) => conversationEntry is ConversationEntryWithStaticContentMessage;
                isMessageFromEndUser: (conversationEntry: ConversationEntry) => boolean;
                isTextMessage: (conversationEntry: ConversationEntry) => boolean;
                parseEntryPayload: (data: ParsedServerSentEventData['conversationEntry']) => ConversationEntry;
                parseJsonInAgentResponse: (content: string) => any | undefined;
                getTextMessageContent: (conversationEntry: ConversationEntry) => string;
            };
            logging: {
                readonly LogLevel: typeof LogLevel;
                setControllerLogLevel(level: LogLevel): void;
                getControllerLogLevel(): LogLevel;
                setAppLogLevel?(level: LogLevel): void;
                getAppLogLevel?(): LogLevel;
            };
        };
    }
}

// Initialize the AdaptiveWebsite API on window
if (typeof window !== 'undefined') {
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
            isConversationEntryStaticContentMessage: ConversationEntryUtil.isConversationEntryStaticContentMessage,
            isMessageFromEndUser: ConversationEntryUtil.isMessageFromEndUser,
            isTextMessage: ConversationEntryUtil.isTextMessage,
            parseEntryPayload: ConversationEntryUtil.parseEntryPayload,
            parseJsonInAgentResponse: ConversationEntryUtil.parseJsonInAgentResponse,
            getTextMessageContent: ConversationEntryUtil.getTextMessageContent
        },
        logging: {
            LogLevel,
            setControllerLogLevel: (level: LogLevel) => setControllerLoggerLevel(level),
            getControllerLogLevel: () => getControllerLoggerLevel(),
        },
    };
}

export { ConversationEntry, LogLevel, StaticContentMessageTextPayload };
export type { ContentObject, Personalization } from "./src/personalizationService";
