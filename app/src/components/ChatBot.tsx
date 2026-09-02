import React, { useState, useEffect, useRef } from 'react';
import styles from './ChatBot.module.css';
import type { ConversationEntry, StaticContentMessageTextPayload } from 'adaptive-web-controller';
import { getMessagePayloadFromConversationEntry } from '../helpers/messagePayload';
import logger from '../helpers/logger';

const ChatBot: React.FC<{ show: boolean }> = ({ show }) => {
  const AGENT_LOGO_IMAGE_URL = 'https://zzpq-010.dx.commercecloud.salesforce.com/on/demandware.static/Sites-nto-Site/-/default/dw9814f411/images/favicons/favicon-32x32.png';
  const AGENT_NAME = 'Adaptive Web Agent';
  
  const [inputText, setInputText] = useState('');
  const [isAnotherParticipantTyping, setIsAnotherParticipantTyping] = useState(false);
  const [conversationEntries, setConversationEntries] = useState<ConversationEntry[]>([]);
  
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_TYPING_INDICATOR_STARTED, handleTypingIndicatorStarted);
    window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_TYPING_INDICATOR_STOPPED, handleTypingIndicatorStopped);
    window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGE_SENT, handleMessageReceived);
    window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_LIST_CONVERSATION_ENTRIES, handleListConversationEntries);
    return () => {
      window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_TYPING_INDICATOR_STARTED, handleTypingIndicatorStarted);
      window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_TYPING_INDICATOR_STOPPED, handleTypingIndicatorStopped);
      window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGE_SENT, handleMessageReceived);
      window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_LIST_CONVERSATION_ENTRIES, handleListConversationEntries);
    };
  }, []);

  useEffect(() => {
    messagesContainerRef.current?.scrollTo({ top: messagesContainerRef.current?.scrollHeight, behavior: 'smooth' });
  }, [conversationEntries, show]);

  const handleMessageReceived = (event: WindowEventMap[typeof window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGE_SENT]) => {
    setConversationEntries(prev => [...prev, window.AdaptiveWebsite.util.parseEntryPayload(event.detail.conversationEntry)]);
    logger.debug('Message received:', event.detail);
  };

  const handleListConversationEntries = (event: WindowEventMap[typeof window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_LIST_CONVERSATION_ENTRIES]) => {
    setConversationEntries(event.detail.entries);
    logger.debug('List conversation entries:', event.detail);
  };

  const handleTypingIndicatorStarted = () => {
    setIsAnotherParticipantTyping(true);
  };

  const handleTypingIndicatorStopped = () => {
    setIsAnotherParticipantTyping(false);
  };

  const handleSendMessage = () => {
    if (inputText) {
      setInputText('');
      window.AdaptiveWebsite.sendTextMessage(inputText).catch((error) => {
        logger.error('Something went wrong while sending a message to conversation:', error);
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Helper function to format timestamp
  const formatTimestamp = (timestamp: number) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
    {show && (
      <div className={styles.chatbotContainer}>
        <div className={styles.messagesContainer} ref={messagesContainerRef}>
          {conversationEntries.filter(window.AdaptiveWebsite.util.isTextMessage).map((entry) => {
            const messagePayload = getMessagePayloadFromConversationEntry(entry);
            if (messagePayload) {
              const isMessageFromEndUser = window.AdaptiveWebsite.util.isMessageFromEndUser(entry);
              return (
                <div key={entry.identifier} className={`${styles.message} ${isMessageFromEndUser ? styles.messageUser : styles.messageBot}`}>
                  {/* Agent logo for bot messages */}
                  {!isMessageFromEndUser && (
                    <div className={styles.agentLogo}>
                      <img src={AGENT_LOGO_IMAGE_URL} alt="Agent Logo" />
                    </div>
                  )}
                  
                  <div className={styles.messageWrapper}>
                    <div className={styles.messageContent}>
                      <div className={styles.messageText}>{messagePayload?.text}</div>
                    </div>
  
                    {messagePayload?.options && (
                      <MessageOptions options={messagePayload.options} />
                    )}
  
                    {entry.transcriptedTimestamp && (
                      <div className={styles.messageTimestamp}>
                        {!isMessageFromEndUser ? `${AGENT_NAME} • ` : "Sent • "}
                        {formatTimestamp(entry.transcriptedTimestamp)}
                      </div>
                    )}
                  </div>
                </div>
              );
            }
          })}
          
          {isAnotherParticipantTyping && (
            <div className={`${styles.message} ${styles.messageBot}`}>
              <div className={styles.agentLogo}>
                <img src={AGENT_LOGO_IMAGE_URL} alt="Agent Logo" />
              </div>
              <div className={styles.messageWrapper}>
                <div className={styles.messageContent}>
                  <div className={styles.typingIndicator}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSendMessage} className={styles.messageInputForm}>
          <div className={styles.messageInputContainer}>
            <div className={styles.inputRow}>
              <div className={styles.textareaContainer}>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask me anything..."
                  className={styles.messageInput}
                  rows={1}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    )}
    </>
  );
};

const MessageOptions: React.FC<{ options: { name: string }[] }> = ({ options }) => {
  const messageChoicesRef = useRef<HTMLDivElement>(null);

  const handleChoiceSelection = (event: React.MouseEvent<HTMLButtonElement>, option: { name: string }) => {
    window.AdaptiveWebsite.sendTextMessage(option.name);
    event.currentTarget.classList.add(styles.selected);
    messageChoicesRef.current?.querySelectorAll('button').forEach(button => {
      if (button !== event.currentTarget) {
        button.classList.remove(styles.selected);
      }
    });
  };

  if (Array.isArray(options) && options.length > 0) {
    return (
      <div ref={messageChoicesRef} className={styles.messageChoices}>
        {options.map(option => {
          return (
            <button
              key={option.name}
              className={styles.choiceButton}
              onClick={(e) => handleChoiceSelection(e, option)}
            >
              {option.name}
            </button>
          );
        })}
      </div>
    );
  }
};

export default ChatBot; 