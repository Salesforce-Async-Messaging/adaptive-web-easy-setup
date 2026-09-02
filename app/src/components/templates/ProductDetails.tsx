import React from 'react';
import styles from './ProductDetails.module.css';
import type { ContentObject } from 'adaptive-web-controller';

interface ProductDetailsProps {
  item: ContentObject;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ item }) => {
  return (
    <div className={styles.productDetailsTemplate}>
      <div className={styles.productDetailsContainer}>
        {item.Image_URL__c && (
          <div className={styles.productImageSection}>
            <div className={styles.productImageContainer}>
              <img src={item.Image_URL__c} alt={item.ssot__Name__c ?? ''} />
            </div>
          </div>
        )}
        <div className={styles.productInfoSection}>
          <h1 className={styles.productName}>{item.ssot__Name__c ?? ''}</h1>
          {item.ssot__ProductSKU__c && (
            <div className={styles.itemNumber}>SKU: {item.ssot__ProductSKU__c}</div>
          )}
          {item.ssot__MSRPAmount__c && (
            <div className={styles.productPrice}>
              {item.ssot__MSRPAmount__c}{item.ssot__MSRPAmountCurrency__c ? ` ${item.ssot__MSRPAmountCurrency__c}` : ''}
            </div>
          )}
          {item.ssot__BrandId__c && (
            <div className={styles.featuresSection}>
              <span className={styles.featureName}>Brand:</span>
              <span className={styles.featureValue}>{item.ssot__BrandId__c}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
