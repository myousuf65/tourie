import React from 'react';
import styles from '../styles/TourCard.module.css';

const TourCard = ({ tour }) => {
  return (
    <div className={styles.card}>
      <img src={tour.photoUrl} alt={tour.name} className={styles.photo} />
      <h3 className={styles.name}>{tour.name}</h3>
      <button className={styles.bookButton}>Book Now</button>
    </div>
  );
};

export default TourCard;
