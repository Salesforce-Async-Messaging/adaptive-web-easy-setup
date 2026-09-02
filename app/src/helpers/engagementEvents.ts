import { getMessagePayloadFromConversationEntry } from "./messagePayload";

const DATA_CLOUD_AGENT_ENGAGEMENT_EVENT_TYPE = 'agentEngagement';

type AdaptiveWebsiteCustomDomEventNames = typeof window.AdaptiveWebsite.Events[keyof typeof window.AdaptiveWebsite.Events];

interface EngagementEventConfig<TEventDetail extends keyof WindowEventMap> {
    customDomEventName: TEventDetail;
    interactionName: string;
    getAttributes: (e: WindowEventMap[TEventDetail]) => Record<string, any>;
}

type EngagementEvents = {
    [K in AdaptiveWebsiteCustomDomEventNames]: EngagementEventConfig<K>;
}[AdaptiveWebsiteCustomDomEventNames]

let engagementHandlers: { customDomEventName: AdaptiveWebsiteCustomDomEventNames, handler: (e: WindowEventMap[AdaptiveWebsiteCustomDomEventNames]) => void }[] = [];

export const registerEngagementEventListeners = () => {
    engagementHandlers = engagementEvents.map((engagementEventConfig) => {
        const handler = (e: CustomEvent) => {
            sendDataCloudAgentEngagementEvent(engagementEventConfig.interactionName, engagementEventConfig.getAttributes(e));
        };
        window.addEventListener(engagementEventConfig.customDomEventName, handler);
        return { customDomEventName: engagementEventConfig.customDomEventName, handler };
    });
};

export const unregisterEngagementEventListeners = () => {
    engagementHandlers.forEach(({ customDomEventName, handler }) => {
        window.removeEventListener(customDomEventName, handler);
    });
    engagementHandlers = [];
};

const engagementEvents: EngagementEvents[] = [
    {
        customDomEventName: window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_CONVERSATION_STARTED,
        interactionName: 'agent-conversation-started',
        getAttributes: (e) => {
            return { conversationId: e.detail.conversationId }
        }
    },
    {
        customDomEventName: window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_CONVERSATION_CLOSED,
        interactionName: 'agent-conversation-closed',
        getAttributes: (e) => {
            return { conversationId: e.detail.conversationId }
        }
    },
    {
        customDomEventName: window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_CONVERSATION_READY,
        interactionName: 'agent-conversation-ready',
        getAttributes: () => ({})
    },
    {
        customDomEventName: window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGE_SENT,
        interactionName: 'agent-message-sent',
        getAttributes: (e) => ({
            conversationId: e.detail.conversationId,
            message: getTextMessageContentFromOnMessageSentEvent(e)
        })
    },
    {
        customDomEventName: window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_CONVERSATION_ROUTED,
        interactionName: 'agent-conversation-routed',
        getAttributes: (e) => ({
            conversationId: e.detail.conversationId
        })
    }
]

const sendDataCloudAgentEngagementEvent = (interactionName: string, attributes: Record<string, string>) => {
    (window as any).getSalesforceInteractions()?.sendEvent({
        interaction: {
            name: interactionName,
            eventType: DATA_CLOUD_AGENT_ENGAGEMENT_EVENT_TYPE,
            ...attributes
        }
    });
};

const getTextMessageContentFromOnMessageSentEvent = (e: WindowEventMap[typeof window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGE_SENT]) => {
    const parsedConversationEntry = window.AdaptiveWebsite.util.parseEntryPayload(e.detail.conversationEntry);
    return getMessagePayloadFromConversationEntry(parsedConversationEntry)?.text
};
