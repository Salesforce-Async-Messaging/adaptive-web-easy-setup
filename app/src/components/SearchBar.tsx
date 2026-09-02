import React, { useState } from 'react';
import styles from './SearchBar.module.css';

const SearchBar: React.FC<{ show: boolean, onInitialMessage: (textToSend: string) => void }> = ({ show, onInitialMessage }) => {
  const [searchText, setSearchText] = useState('');
  const [hasSentInitialMessage, setHasSentInitialMessage] = useState(false);
  
  const AGENT_LOGO_IMAGE_URL = 'https://zzpq-010.dx.commercecloud.salesforce.com/on/demandware.static/Sites-nto-Site/-/default/dw9814f411/images/favicons/favicon-32x32.png';
  
  // Placeholder search actions for testing
  const searchActions = [
    { text: 'Shop Hiking Boots', value: 'Shop Hiking Boots' },
    { text: 'Find Jackets', value: 'Find Jackets' },
    { text: 'Browse Backpacks', value: 'Browse Backpacks' }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      buttonText: { value: string };
      searchText: { value: string };
    };
    const textToSend = target.searchText?.value || target.buttonText?.value;
    if (!hasSentInitialMessage) {
      onInitialMessage(textToSend);
      setHasSentInitialMessage(true);
    } else {
      window.AdaptiveWebsite.sendTextMessage(textToSend);
    }
    window.AdaptiveWebsite.maximize();
  };

  return (
    <>
    {show && (
      <div className={styles.searchContainer}>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <div className={styles.searchBar}>
            <div className={styles.searchIcon}>
              <img src={AGENT_LOGO_IMAGE_URL} alt="Search" />
            </div>
            <input
              type="text"
              name="searchText"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder={"Welcome! How can I help you today?"}
              className={styles.searchInput}
            />
            
            <div className={styles.searchActions}>
              {searchActions.map((action, index) => (
                <button
                  key={index}
                  type="submit"
                  name="buttonText"
                  className={styles.searchActionButton}
                  value={action.value}
                >
                  {action.text}
                </button>
              ))}
            </div>
          </div>
        </form>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="18" 
          height="18" 
          viewBox="0 0 18 18" 
          fill="none"
          className={styles.expandButton}
          onClick={window.AdaptiveWebsite.maximize}
        >
          <path 
            d="M5 11L9 7L13 11" 
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    )}
    </>
  );
};

export default SearchBar; 