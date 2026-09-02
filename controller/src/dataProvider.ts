import { setItemInWebStorage, getItemInWebStorageByKey, removeItemInWebStorage } from "./webstorageUtils";
import { STORAGE_KEYS } from "./constants";
import logger from "./logger";

// Store the latest last-event-id from the Access Token API response or from an Event Source (SSE) event in-memory.
let lastEventId: string | undefined;

// Store the conversation-id for the current conversation in-memory for other components to use.
let conversationId: string | undefined;

function getOrganizationId() {
    return getItemInWebStorageByKey(STORAGE_KEYS.ORGANIZATION_ID);
}

function getDeploymentDeveloperName() {
    return getItemInWebStorageByKey(STORAGE_KEYS.DEPLOYMENT_DEVELOPER_NAME);
}

function getSalesforceMessagingUrl() {
    return getItemInWebStorageByKey(STORAGE_KEYS.MESSAGING_URL);
}

// Store the Salesforce Access Token (JWT) for other components to use.
function setJwt(jwt: string) {
    if (jwt && jwt.trim().length > 0) {
        setItemInWebStorage(STORAGE_KEYS.JWT, jwt);
    } else {
        // Clear the JWT if empty string is passed
        removeItemInWebStorage(STORAGE_KEYS.JWT);
    }
}
function getJwt() {
    return getItemInWebStorageByKey(STORAGE_KEYS.JWT);
}

// Store the configuration settings of the Embedded Service Deployment for other components to use.
function setDeploymentConfiguration(configuration: string) {
    setItemInWebStorage(STORAGE_KEYS.DEPLOYMENT_CONFIGURATION, JSON.stringify(configuration));
}

function getDeploymentConfiguration() {
    const configuration = getItemInWebStorageByKey(STORAGE_KEYS.DEPLOYMENT_CONFIGURATION);
    if (!configuration) {
        return;
    }
    return JSON.parse(configuration);
}

function setLastEventId(id: string) {
    lastEventId = id;
}
function getLastEventId() {
    return lastEventId;
}

function storeConversationId(convId: string) {
    conversationId = convId;
}
function getConversationId() {
    return conversationId;
}

// Clears the in-memory messaging data variables.
function clearInMemoryData() {
    conversationId = undefined;
    lastEventId = undefined;
}

export {
    getOrganizationId,
    getDeploymentDeveloperName,
    getSalesforceMessagingUrl,
    setDeploymentConfiguration,
    getDeploymentConfiguration,
    setLastEventId,
    getLastEventId,
    setJwt,
    getJwt,
    storeConversationId,
    getConversationId,
    clearInMemoryData
};

