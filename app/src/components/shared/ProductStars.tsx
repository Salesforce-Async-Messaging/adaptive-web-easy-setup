import React from 'react';
import styles from './ProductStars.module.css';

interface ProductStarsProps {
  rating: number;
  size?: 'small' | 'large';
}

const ProductStars: React.FC<ProductStarsProps> = ({ rating, size = 'small' }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const sizeClass = size === 'large' ? styles.large : styles.small;

  return (
    <div className={`${styles.productRating} ${sizeClass}`}>
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`} className={`${styles.star} ${styles.starFull}`}>★</span>
      ))}
      {hasHalfStar && (
        <span className={`${styles.star} ${styles.starHalf}`}>
          <span className={styles.starHalfFilled}>★</span>
          <span className={styles.starHalfEmpty}>★</span>
        </span>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} className={`${styles.star} ${styles.starEmpty}`}>★</span>
      ))}
    </div>
  );
};

export default ProductStars;

