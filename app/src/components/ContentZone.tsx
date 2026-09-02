import React, { Suspense, useEffect, useState } from 'react';
import styles from './ContentZone.module.css';
import { type StaticContentMessageTextPayload } from 'adaptive-web-controller';
import type { ContentObject, Personalization } from 'adaptive-web-controller';
import { getMessagePayloadFromConversationEntry } from '../helpers/messagePayload';

const Recs = React.lazy(() => import('./templates/Recs'));
const Comparison = React.lazy(() => import('./templates/Comparison'));
const ProductDetails = React.lazy(() => import('./templates/ProductDetails'));

const ContentZone: React.FC<{ show: boolean }> = ({ show }) => {
  const [contentZoneContent, setContentZoneContent] = useState<StaticContentMessageTextPayload>();
  
  useEffect(() => {
    window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_CONTENT_RECEIVED, handleContentReceived);
    window.addEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_LIST_CONVERSATION_ENTRIES, handleListConversationEntries);
    return () => {
      window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_CONTENT_RECEIVED, handleContentReceived);
      window.removeEventListener(window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_LIST_CONVERSATION_ENTRIES, handleListConversationEntries);
    }
  }, [])

  const handleContentReceived = (event: WindowEventMap[typeof window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_CONTENT_RECEIVED]) => {
    setContentZoneContent(event.detail.content);
  };

  const handleListConversationEntries = (event: WindowEventMap[typeof window.AdaptiveWebsite.Events.ON_EMBEDDED_MESSAGING_LIST_CONVERSATION_ENTRIES]) => {
    const entries = event.detail.entries;

    for (let i = entries.length - 1; i >= 0; i--) {
      const entry = entries[i];

      if (
        window.AdaptiveWebsite.util.isConversationEntryStaticContentMessage(entry) &&
        !window.AdaptiveWebsite.util.isMessageFromEndUser(entry)
      ) {
        const payload = getMessagePayloadFromConversationEntry(entry);
        if (payload) {
          setContentZoneContent(payload);
          return;
        }
      }
    }
  };

  return (
    <>
      {show && (
        <div className={styles.contentZoneContainer}>
          <div className={styles.contentZoneContent}>
            <Suspense fallback={<Placeholder />}>
              {contentZoneContent ? (
                (() => {
                  const templateName = contentZoneContent.template;
                  const personalizations: Personalization[] = contentZoneContent.personalizations ?? [];
                  const items: ContentObject[] = personalizations.flatMap(p => p.data);

                  if (templateName === 'Recs') {
                    return <Recs items={items} />;
                  }
                  if (templateName === 'Comparison') {
                    return <Comparison items={items} />;
                  }
                  if (templateName === 'ProductDetails') {
                    return items[0] != null ? (
                      <ProductDetails item={items[0]} />
                    ) : (
                      <Placeholder />
                    );
                  }
                  return <Placeholder />;
                })()
              ) : (
                <Placeholder />
              )}
            </Suspense>
          </div>
        </div>
      )}
    </>
  );
};

const Placeholder: React.FC = () => {
  return (
    <div className={styles.blankContent}>
      <div className={styles.typingIndicator}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default ContentZone;