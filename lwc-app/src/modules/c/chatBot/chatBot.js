import { LightningElement, api, track } from 'lwc';

export default class ChatBot extends LightningElement {
    @api show = false;
    @track inputText = '';
    @track isAnotherParticipantTyping = false;
    @track conversationEntries = [];

    AGENT_LOGO_IMAGE_URL = 'https://a.sfdcstatic.com/shared/images/c360-nav/salesforce-no-type-logo.svg';
    AGENT_NAME = 'Adaptive Web Agent';

    _handleTypingStarted;
    _handleTypingStopped;
    _handleMessageReceived;
    _handleListEntries;

    connectedCallback() {
        this._handleTypingStarted = this.handleTypingIndicatorStarted.bind(this);
        this._handleTypingStopped = this.handleTypingIndicatorStopped.bind(this);
        this._handleMessageReceived = this.handleMessageReceived.bind(this);
        this._handleListEntries = this.handleListConversationEntries.bind(this);

        window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_TYPING_INDICATOR_STARTED, this._handleTypingStarted);
        window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_TYPING_INDICATOR_STOPPED, this._handleTypingStopped);
        window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGE_SENT, this._handleMessageReceived);
        window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_LIST_CONVERSATION_ENTRIES, this._handleListEntries);
    }

    disconnectedCallback() {
        window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_TYPING_INDICATOR_STARTED, this._handleTypingStarted);
        window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_TYPING_INDICATOR_STOPPED, this._handleTypingStopped);
        window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGE_SENT, this._handleMessageReceived);
        window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_LIST_CONVERSATION_ENTRIES, this._handleListEntries);
    }

    renderedCallback() {
        if (this.show) {
            this.scrollToBottom();
        }
    }

    scrollToBottom() {
        const container = this.template.querySelector('.messages-container');
        if (container) {
            container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
        }
    }

    handleMessageReceived(event) {
        const entry = window.AdaptiveWebsite.util.parseEntryPayload(event.detail.conversationEntry);
        this.conversationEntries = [...this.conversationEntries, entry];
        console.debug('Message received:', event.detail);
    }

    handleListConversationEntries(event) {
        this.conversationEntries = event.detail.entries;
        console.debug('List conversation entries:', event.detail);
    }

    handleTypingIndicatorStarted() {
        this.isAnotherParticipantTyping = true;
    }

    handleTypingIndicatorStopped() {
        this.isAnotherParticipantTyping = false;
    }

    handleInputChange(event) {
        this.inputText = event.target.value;
    }

    handleSendMessage(event) {
        event.preventDefault();
        if (this.inputText) {
            const text = this.inputText;
            this.inputText = '';
            
            // Also clear the actual textarea element (LWC doesn't auto-sync textarea content)
            const textarea = this.template.querySelector('.message-input');
            if (textarea) {
                textarea.value = '';
            }
            
            window.AdaptiveWebsite.sendTextMessage(text).catch((error) => {
                console.error('Something went wrong while sending a message:', error);
            });
        }
    }

    handleKeyPress(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            this.handleSendMessage(event);
        }
    }

    // Computed property for filtered entries
    get filteredEntries() {
        return this.conversationEntries
            .filter(entry => window.AdaptiveWebsite.util.isTextMessage(entry))
            .map(entry => {
                const payload = this.getMessagePayload(entry);
                const isFromEndUser = window.AdaptiveWebsite.util.isMessageFromEndUser(entry);
                const isFromBot = !isFromEndUser;
                const timestamp = this.formatTimestamp(entry.transcriptedTimestamp);
                const senderLabel = isFromEndUser ? 'Sent' : this.AGENT_NAME;
                return {
                    id: entry.identifier,
                    text: payload?.text || '',
                    options: payload?.options || [],
                    hasOptions: payload?.options?.length > 0,
                    isFromEndUser,
                    isFromBot,
                    timestamp,
                    senderLabel,
                    messageClass: isFromEndUser ? 'message message-user' : 'message message-bot',
                    timestampLabel: senderLabel + ' - ' + timestamp
                };
            });
    }

    getMessagePayload(entry) {
        try {
            if (window.AdaptiveWebsite.util.isConversationEntryStaticContentMessage(entry)) {
                const textContent = window.AdaptiveWebsite.util.getTextMessageContent(entry);
                if (textContent) {
                    // Use parseJsonInAgentResponse to handle ```json blocks
                    const json = window.AdaptiveWebsite.util.parseJsonInAgentResponse(textContent);
                    
                    if (json !== undefined && typeof json === 'object' && json !== null && typeof json.text === 'string') {
                        // Valid JSON payload with text property
                        return json;
                    } else {
                        // Plain text response (not JSON or no text property)
                        return { text: textContent };
                    }
                }
            }
        } catch (e) {
            console.error('Error getting message payload:', e);
        }
        return null;
    }

    formatTimestamp(timestamp) {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    handleChoiceSelection(event) {
        const optionName = event.target.dataset.option;
        window.AdaptiveWebsite.sendTextMessage(optionName);
        
        // Visual feedback
        event.target.classList.add('selected');
        const siblings = event.target.parentElement.querySelectorAll('button');
        siblings.forEach(btn => {
            if (btn !== event.target) {
                btn.classList.remove('selected');
            }
        });
    }
}
