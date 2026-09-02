import { LightningElement, track } from 'lwc';

export default class App extends LightningElement {
    @track conversationMessages = [];
    @track showChatBot = false;
    @track isReady = false;

    // Bound event handlers (for proper removal)
    _handleMessageReceived;
    _handleListConversationEntries;
    _handleConversationReady;
    _handleConversationOpened;
    _handleConversationClosed;
    _handleMinimize;
    _handleMaximize;

    connectedCallback() {
        console.log('[LWC App] connectedCallback called');
        console.log('[LWC App] window.AdaptiveWebsite exists:', !!window.AdaptiveWebsite);
        console.log('[LWC App] window.AdaptiveWebsite.Events:', window.AdaptiveWebsite?.Events);
        
        // Create bound handlers
        this._handleMessageReceived = this.handleMessageReceived.bind(this);
        this._handleListConversationEntries = this.handleListConversationEntries.bind(this);
        this._handleConversationReady = this.handleConversationReady.bind(this);
        this._handleConversationOpened = this.handleConversationOpened.bind(this);
        this._handleConversationClosed = this.handleConversationClosed.bind(this);
        this._handleMinimize = this.handleMinimize.bind(this);
        this._handleMaximize = this.handleMaximize.bind(this);

        // Register DOM event listeners
        window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGE_SENT, this._handleMessageReceived);
        window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_LIST_CONVERSATION_ENTRIES, this._handleListConversationEntries);
        window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_CONVERSATION_READY, this._handleConversationReady);
        window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_CONVERSATION_OPENED, this._handleConversationOpened);
        window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_CONVERSATION_CLOSED, this._handleConversationClosed);
        window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_WINDOW_MINIMIZED, this._handleMinimize);
        window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_WINDOW_MAXIMIZED, this._handleMaximize);
        
        console.log('[LWC App] Event listeners registered');
        
        // Check if controller is already ready (event may have fired before we registered)
        // If AdaptiveWebsite exists and is initialized, we're ready
        if (window.AdaptiveWebsite && !this.isReady) {
            console.log('[LWC App] Controller already initialized, calling handleConversationReady directly');
            this.handleConversationReady();
        }
    }

    disconnectedCallback() {
        // Unregister DOM event listeners
        window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGE_SENT, this._handleMessageReceived);
        window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_LIST_CONVERSATION_ENTRIES, this._handleListConversationEntries);
        window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_CONVERSATION_READY, this._handleConversationReady);
        window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_CONVERSATION_OPENED, this._handleConversationOpened);
        window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_CONVERSATION_CLOSED, this._handleConversationClosed);
        window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_WINDOW_MINIMIZED, this._handleMinimize);
        window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_WINDOW_MAXIMIZED, this._handleMaximize);
    }

    handleMinimize() {
        this.showChatBot = false;
    }

    handleMaximize() {
        this.showChatBot = true;
    }

    // Pure UI toggle handlers (from child component events)
    handleToggleMinimize() {
        console.log('[LWC App] handleToggleMinimize called, setting showChatBot to false');
        this.showChatBot = false;
    }

    handleToggleMaximize() {
        console.log('[LWC App] handleToggleMaximize called, setting showChatBot to true');
        this.showChatBot = true;
    }

    handleCloseConversationUI() {
        console.log('[LWC App] handleCloseConversationUI called, resetting to SearchBar');
        this.showChatBot = false;
        this.conversationMessages = [];
    }

    handleConversationOpened() {
        this.showChatBot = true;
    }

    handleConversationReady() {
        console.log('[LWC App] handleConversationReady called');
        this.isReady = true;
        console.log('[LWC App] isReady set to:', this.isReady);
        if (window.AdaptiveWebsite.sessionExists()) {
            console.log('[LWC App] Session exists, initializing conversation');
            window.AdaptiveWebsite.initializeConversation(this.getPreChatData()).catch((error) => {
                console.error('Failed to initialize conversation:', error);
            });
        } else {
            console.log('[LWC App] No existing session');
        }
    }

    handleConversationClosed() {
        // When conversation is closed, revert to SearchBar view (don't hide the app)
        this.showChatBot = false;
        this.conversationMessages = [];
    }

    handleMessageReceived(event) {
        const entry = window.AdaptiveWebsite.util.parseEntryPayload(event.detail.conversationEntry);
        this.conversationMessages = [...this.conversationMessages, entry];
        this.updateShowChatBot();
    }

    handleListConversationEntries(event) {
        const conversationMessages = event.detail.entries.filter(
            window.AdaptiveWebsite.util.isConversationEntryStaticContentMessage
        );
        if (conversationMessages.length > 0) {
            this.conversationMessages = conversationMessages;
            this.updateShowChatBot();
        }
    }

    updateShowChatBot() {
        this.showChatBot = this.conversationMessages.length > 0;
    }

    handleInitialMessage(event) {
        const textToSend = event.detail.text;
        window.AdaptiveWebsite.initializeConversation(this.getPreChatData()).then(() => {
            window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGE_SENT, () => {
                window.AdaptiveWebsite.sendTextMessage(textToSend);
            }, { once: true });
        }).catch((error) => {
            console.error('Failed to initialize conversation:', error);
        });
    }

    getPreChatData() {
        const anonymousId = window.getSalesforceInteractions?.()?.getAnonymousId?.();
        const preChatData = {};
        if (anonymousId && typeof anonymousId === 'string') {
            preChatData['Individual_Id'] = anonymousId;
            preChatData['Adaptive_Web_Data'] = JSON.stringify(['Recs', 'Comparison'])
        }
        return preChatData;
    }

    // Computed properties for template
    get showSearchBar() {
        return !this.showChatBot;
    }

    get conversationWrapperClass() {
        return this.showChatBot ? 'conversation-wrapper' : 'conversation-wrapper conversation-wrapper-hidden';
    }
}
