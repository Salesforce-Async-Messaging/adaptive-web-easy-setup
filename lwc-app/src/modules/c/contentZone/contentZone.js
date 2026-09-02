import { LightningElement, api, track } from 'lwc';

export default class ContentZone extends LightningElement {
    @api show = false;
    @track contentZoneContent = null;
    @track currentTemplate = null;

    _handleContentReceived;
    _handleListEntries;

    connectedCallback() {
        this._handleContentReceived = this.handleContentReceived.bind(this);
        this._handleListEntries = this.handleListConversationEntries.bind(this);

        window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_CONTENT_RECEIVED, this._handleContentReceived);
        window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_LIST_CONVERSATION_ENTRIES, this._handleListEntries);
    }

    disconnectedCallback() {
        window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_CONTENT_RECEIVED, this._handleContentReceived);
        window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_LIST_CONVERSATION_ENTRIES, this._handleListEntries);
    }

    handleContentReceived(event) {
        this.contentZoneContent = event.detail.content;
        this.updateCurrentTemplate();
    }

    handleListConversationEntries(event) {
        const entries = event.detail.entries;

        for (let i = entries.length - 1; i >= 0; i--) {
            const entry = entries[i];

            if (
                window.AdaptiveWebsite.util.isConversationEntryStaticContentMessage(entry) &&
                !window.AdaptiveWebsite.util.isMessageFromEndUser(entry)
            ) {
                const payload = this.getMessagePayload(entry);
                if (payload) {
                    this.contentZoneContent = payload;
                    this.updateCurrentTemplate();
                    return;
                }
            }
        }
    }

    getMessagePayload(entry) {
        try {
            if (window.AdaptiveWebsite.util.isConversationEntryStaticContentMessage(entry)) {
                const textContent = window.AdaptiveWebsite.util.getTextMessageContent(entry);
                if (textContent) {
                    const json = window.AdaptiveWebsite.util.parseJsonInAgentResponse(textContent);

                    if (json !== undefined && typeof json === 'object' && json !== null) {
                        return json;
                    } else {
                        return { text: textContent };
                    }
                }
            }
        } catch (e) {
            console.error('Error getting message payload:', e);
        }
        return null;
    }

    updateCurrentTemplate() {
        if (this.contentZoneContent && typeof this.contentZoneContent.template === 'string') {
            this.currentTemplate = this.contentZoneContent.template;
        } else {
            this.currentTemplate = null;
        }
    }

    get personalizationItems() {
        const personalizations = this.contentZoneContent?.personalizations ?? [];
        return personalizations.flatMap(p => p.data ?? []);
    }

    get itemsJson() {
        return JSON.stringify(this.personalizationItems);
    }

    get firstItemJson() {
        const items = this.personalizationItems;
        return items.length > 0 ? JSON.stringify(items[0]) : '{}';
    }

    get showRecs() {
        return this.currentTemplate === 'Recs';
    }

    get showComparison() {
        return this.currentTemplate === 'Comparison';
    }

    get showProductDetails() {
        return this.currentTemplate === 'ProductDetails' && this.personalizationItems.length > 0;
    }

    get showJsonViewer() {
        return this.currentTemplate === 'JsonViewer';
    }

    get showPlaceholder() {
        return !this.contentZoneContent || !this.currentTemplate;
    }

    get contentJson() {
        return this.contentZoneContent ? JSON.stringify(this.contentZoneContent) : '{}';
    }
}
