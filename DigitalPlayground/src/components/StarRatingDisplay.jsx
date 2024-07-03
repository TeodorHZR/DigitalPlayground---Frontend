import React from 'react';
import styles from './style.module.css';
const StarRatingDisplay = ({ rating }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i}>&#9733;</span>); 
      } else {
        stars.push(<span key={i}>&#9734;</span>); 
      }
    }
    return <div className={styles.starRatingDisplay}>Rating:{stars}</div>;
  };

export default StarRatingDisplay;
