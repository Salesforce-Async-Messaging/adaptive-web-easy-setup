import type { StaticContentMessageTextPayload } from './conversation';
import logger from './logger';

export interface ContentObject {
    personalizationContentId: string;
    ssot__Id__c?: string;
    ssot__Name__c?: string;
    ssot__ProductSKU__c?: string;
    ssot__MSRPAmount__c?: string;
    ssot__MSRPAmountCurrency__c?: string;
    ssot__BrandId__c?: string;
    Image_URL__c?: string;
}

export interface Personalization {
    personalizationId: string;
    decisionId?: string;
    personalizationPointId: string;
    personalizationPointName: string;
    data: ContentObject[];
    attributes: Record<string, unknown>;
}

export interface PersonalizationResponse {
    personalizations: Personalization[];
}

export type DynamicContextVariable = Record<string, unknown>;

declare global {
    interface Window {
        SalesforceInteractions?: {
            Personalization: {
                fetch(personalizationPoints: string[], context?: DynamicContextVariable): Promise<PersonalizationResponse>;
            };
        };
    }
}

export async function fetchPersonalizationData(personalizationPoint: string, context?: DynamicContextVariable): Promise<Personalization | undefined> {
    if (!window.SalesforceInteractions?.Personalization) {
        logger.warn('SalesforceInteractions.Personalization is not available on window. Cannot fetch personalization data.');
        return undefined;
    }

    const response = await window.SalesforceInteractions.Personalization.fetch([personalizationPoint], context);

    if (!response?.personalizations?.length) {
        logger.warn(`No personalizations returned for point: ${personalizationPoint}`);
        return undefined;
    }

    return response.personalizations.find(p => p.personalizationPointName === personalizationPoint);
}

export async function enrichContentWithPersonalizationData(
    content: StaticContentMessageTextPayload
): Promise<StaticContentMessageTextPayload> {
    const personalizationPoint = content.personalizationPoint;
    if (!personalizationPoint) {
        return content;
    }

    try {
        const context = content.dynamicContextAttributes;
        const personalization = await fetchPersonalizationData(personalizationPoint, context);

        if (!personalization || !personalization.data?.length) {
            logger.warn(`No content objects found for personalization point: ${personalizationPoint}`);
            return content;
        }

        return { ...content, personalizations: [personalization] };
    } catch (error) {
        logger.error('Failed to enrich content with personalization data:', error);
        return content;
    }
}
