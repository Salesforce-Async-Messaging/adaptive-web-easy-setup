import React, { useState, useEffect } from 'react';
import './App.css';
import type { ConversationEntry } from 'adaptive-web-controller';
import ChatBot from './components/ChatBot';
import ContentZone from './components/ContentZone';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import { registerEngagementEventListeners, unregisterEngagementEventListeners } from './helpers/engagementEvents';
import logger from './helpers/logger';

function App() {
  const [conversationMessages, setConversationMessages] = useState<ConversationEntry[]>([]);
  const [showChatBot, setShowChatBot] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const handleMinimize = () => {
    setShowChatBot(false);
  };

  const handleMaximize = () => {
    setShowChatBot(true);
  };

  const handleConversationOpened = () => {
    setShowChatBot(true);
  };

  const handleConversationReady = () => {
    setIsReady(true);
    if (window.AdaptiveWebsite.sessionExists()) {
      window.AdaptiveWebsite.initializeConversation(getPreChatData()).catch((error) => {
        logger.error('Failed to initialize conversation:', error);
      });
    }
  };

  const handleConversationClosed = () => {
    setIsReady(false);
  };

  const handleMessageReceived = (event: WindowEventMap[typeof window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGE_SENT]) => {
    setConversationMessages(prev => [...prev, window.AdaptiveWebsite.util.parseEntryPayload(event.detail.conversationEntry)]);
  };

  const handleListConversationEntries = (event: WindowEventMap[typeof window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_LIST_CONVERSATION_ENTRIES]) => {
    const conversationMessages = event.detail.entries.filter(window.AdaptiveWebsite.util.isConversationEntryStaticContentMessage);
    if (conversationMessages.length > 0) {
      setConversationMessages(conversationMessages);
    }
  };

  const handleInitialMessageFromUser = (textToSend: string) => {
    window.AdaptiveWebsite.initializeConversation(getPreChatData()).then(() => {
      window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGE_SENT, () => {
        window.AdaptiveWebsite.sendTextMessage(textToSend);
      }, { once: true });
    }).catch((error) => {
      logger.error('Failed to initialize conversation:', error);
    });
  };

  const getPreChatData = () => {
    const anonymousId = (window as any).getSalesforceInteractions()?.getAnonymousId();
    const preChatData: Record<string, string> = {};
    if (anonymousId && typeof anonymousId === 'string') {
      preChatData['Individual_Id'] = anonymousId;
    }
    return preChatData;
  };

  useEffect(() => {
    // Register DOM event listeners for conversation and UI related functionality
    window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGE_SENT, handleMessageReceived);
    window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_LIST_CONVERSATION_ENTRIES, handleListConversationEntries);
    window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_CONVERSATION_READY, handleConversationReady);
    window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_CONVERSATION_OPENED, handleConversationOpened);
    window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_CONVERSATION_CLOSED, handleConversationClosed);
    window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_WINDOW_MINIMIZED, handleMinimize);
    window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_WINDOW_MAXIMIZED, handleMaximize);

    // Register engagement event listeners to send engagement events to Data Cloud
    registerEngagementEventListeners();

    return () => {
      // Unregister DOM event listeners for conversation and UI related functionality
      window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGE_SENT, handleMessageReceived);
      window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_LIST_CONVERSATION_ENTRIES, handleListConversationEntries);
      window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_CONVERSATION_READY, handleConversationReady);
      window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_CONVERSATION_OPENED, handleConversationOpened);
      window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_CONVERSATION_CLOSED, handleConversationClosed);
      window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_WINDOW_MINIMIZED, handleMinimize);
      window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_WINDOW_MAXIMIZED, handleMaximize);

      // Unregister engagement event listeners to stop sending engagement events to Data Cloud
      unregisterEngagementEventListeners();
    };
  });

  // Add effect to check if we should show chatbot if there any messages
  useEffect(() => {
    if (conversationMessages.length > 0) {
      setShowChatBot(true);
    } else {
      setShowChatBot(false);
    }
  }, [conversationMessages]);

  return (
    <div className="app">
      {isReady && (
        <> 
          <SearchBar show={!showChatBot} onInitialMessage={handleInitialMessageFromUser}/>
          <Header show={showChatBot}/>
          <div className="conversation-container">
            <ChatBot show={showChatBot}/>
            <ContentZone show={showChatBot}/>
          </div>
        </>
      )}
    </div>
  );
}


export default App;
