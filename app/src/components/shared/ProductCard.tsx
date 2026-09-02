import React from 'react';
import styles from './ProductCard.module.css';
import ProductStars from './ProductStars';
import logger from '../../helpers/logger';

export interface Product {
  id: string;
  image?: string;
  name?: string;
  price?: string;
  rating?: number;
  features?: Array<{ name: string; value: string }>;
}

interface ProductCardProps {
  product: Product;
  onCompareChange?: (id: string) => void;
  showCompare?: boolean;
  compareDisabled?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onCompareChange,
  showCompare,
  compareDisabled
}) => {

  const handleFavoriteClick = (e: React.MouseEvent) => {
    logger.debug('Favorite clicked for product:', product.id)
  };

  return (
    <a 
      href="#" 
      className={styles.productLink}
    >
      <div className={styles.productCard}>
        <div className={styles.productFavorite} onClick={handleFavoriteClick}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </div>
        <div className={styles.productImageContainer}>
          <img src={product.image} alt={product.name} />
        </div>
        <div className={styles.productName}>{product.name}</div>
        <div className={styles.productPrice}>{product.price}</div>
        {product.rating && <ProductStars rating={product.rating} size="small" />}
        {showCompare && (
          <div className={styles.productCompare}>
            <input
              type="checkbox"
              id={`compare-${product.id}`}
              onChange={() => onCompareChange && onCompareChange(product.id)}
              disabled={compareDisabled}
            />
            <label htmlFor={`compare-${product.id}`}>Compare</label>
          </div>
        )}
      </div>
    </a>
  );
};

export default ProductCard;

