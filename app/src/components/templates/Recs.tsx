import React, { useState } from 'react';
import styles from './Recs.module.css';
import type { ContentObject } from 'adaptive-web-controller';
import logger from '../../helpers/logger';

interface RecsProps {
  items: ContentObject[];
}

const MAX_COMPARE_ITEMS = 3;

const Recs: React.FC<RecsProps> = ({ items }) => {
  const [compareSelected, setCompareSelected] = useState<string[]>([]);

  const handleCompareChange = (id: string) => {
    if (compareSelected.includes(id)) {
      setCompareSelected(compareSelected.filter(refId => refId !== id));
    } else {
      setCompareSelected([...compareSelected, id]);
    }
  };

  const handleCompareItems = () => {
    logger.debug('Comparing items:', compareSelected);
  };

  const shouldDisableCompareCheckbox = (id: string): boolean => {
    return compareSelected.length >= MAX_COMPARE_ITEMS && !compareSelected.includes(id);
  };

  return (
    <div className={styles.recsTemplate}>
      <div className={styles.recsProductsGrid}>
        {items.map((item) => (
          <div key={item.personalizationContentId} className={styles.recsProductCard}>
            {item.Image_URL__c && (
              <div className={styles.productImageContainer}>
                <img src={item.Image_URL__c} alt={item.ssot__Name__c ?? ''} />
              </div>
            )}
            <div className={styles.productName}>{item.ssot__Name__c ?? ''}</div>
            {item.ssot__ProductSKU__c && (
              <div className={styles.productSku}>{item.ssot__ProductSKU__c}</div>
            )}
            {item.ssot__MSRPAmount__c && (
              <div className={styles.productPrice}>
                {item.ssot__MSRPAmount__c}{item.ssot__MSRPAmountCurrency__c ? ` ${item.ssot__MSRPAmountCurrency__c}` : ''}
              </div>
            )}
            <div className={styles.productCompare}>
              <input
                type="checkbox"
                id={`compare-${item.personalizationContentId}`}
                onChange={() => handleCompareChange(item.personalizationContentId)}
                disabled={shouldDisableCompareCheckbox(item.personalizationContentId)}
              />
              <label htmlFor={`compare-${item.personalizationContentId}`}>Compare</label>
            </div>
          </div>
        ))}
      </div>
      {compareSelected.length >= MAX_COMPARE_ITEMS && (
        <div className={styles.compareButtonContainer}>
          <button
            className={styles.compareButton}
            onClick={handleCompareItems}
          >
            Compare Items
          </button>
        </div>
      )}
    </div>
  );
};

export default Recs;
