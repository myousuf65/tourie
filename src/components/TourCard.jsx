import React from 'react';
import { useNavigate } from 'react-router';
import styles from '../styles/TourCard.module.css';

const TourCard = ({ tour }) => {

	const navigate = useNavigate();

	const handleMoreInfo = () =>{
		navigate("/explore", {	state:{id: tour.tourId }})
	}

	return (
		<div className={styles.card}>
			<img src={tour.photoUrl} alt={tour.name} className={styles.photo} />
			<h3 className={styles.name}>{tour.name}</h3>
			<button onClick={handleMoreInfo} className={styles.bookButton}>More Info</button>
		</div>
	);
};

export default TourCard;
