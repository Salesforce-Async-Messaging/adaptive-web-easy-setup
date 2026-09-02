import type { ConversationEntry, StaticContentMessageTextPayload } from "adaptive-web-controller";
import logger from "./logger";

const isStaticContentMessageTextPayload = (json: any): json is StaticContentMessageTextPayload => {
    return typeof json === 'object' && json !== null && typeof json.text === 'string';
};

export const getMessagePayloadFromConversationEntry = (entry: ConversationEntry): StaticContentMessageTextPayload | undefined => {
    if (window.AdaptiveWebsite.util.isConversationEntryStaticContentMessage(entry)) {
        const text = entry.entryPayload.abstractMessage.staticContent.text
        const json = window.AdaptiveWebsite.util.parseJsonInAgentResponse(text);
        
        if (json !== undefined) {
            if (isStaticContentMessageTextPayload(json)) {
                return json
            } else {
                logger.error('Invalid static content message text payload:', json);
            }
        } else {
            // if agent happens to respond with just text instead of StaticContentMessageTextPayload, still display the text
            if (typeof text === 'string') {
                return { text }
            } else {
                logger.error('Invalid static content message text payload:', text);
            }
        }
    }
};