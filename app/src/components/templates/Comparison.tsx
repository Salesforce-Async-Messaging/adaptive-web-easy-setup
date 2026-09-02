import React from 'react';
import styles from './Comparison.module.css';
import type { ContentObject } from 'adaptive-web-controller';

interface ComparisonProps {
  items: ContentObject[];
}

const Comparison: React.FC<ComparisonProps> = ({ items }) => {
  const displayItems = items.slice(0, 3);

  return (
    <div className={styles.comparisonTemplate}>
      <div className={styles.comparisonGrid}>
        {displayItems.map((item) => (
          <div key={item.personalizationContentId} className={styles.comparisonColumn}>
            {item.Image_URL__c && (
              <div className={styles.productImageContainer}>
                <img src={item.Image_URL__c} alt={item.ssot__Name__c ?? ''} />
              </div>
            )}
            <div className={styles.productName}>{item.ssot__Name__c ?? ''}</div>
            {item.ssot__ProductSKU__c && (
              <div className={styles.featureRow}>
                <div className={styles.featureName}>SKU</div>
                <div className={styles.featureValue}>{item.ssot__ProductSKU__c}</div>
              </div>
            )}
            {item.ssot__BrandId__c && (
              <div className={styles.featureRow}>
                <div className={styles.featureName}>Brand</div>
                <div className={styles.featureValue}>{item.ssot__BrandId__c}</div>
              </div>
            )}
            {item.ssot__MSRPAmount__c && (
              <div className={styles.featureRow}>
                <div className={styles.featureName}>Price</div>
                <div className={styles.featureValue}>
                  {item.ssot__MSRPAmount__c}{item.ssot__MSRPAmountCurrency__c ? ` ${item.ssot__MSRPAmountCurrency__c}` : ''}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comparison;
