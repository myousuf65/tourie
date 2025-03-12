import React, { useState } from 'react';
import styles from '../styles/EditableTourCard.module.css'

const EditableTourCard = ({ tour, handleShowModal }) => {



	return (
		<div className={styles.card}>
			<img src={tour.photoUrl} alt={tour.name} className={styles.photo} />
			<h3 className={styles.name}>{tour.name}</h3>
			<button className={styles.editButton}>Edit</button>
			<button onClick={()=>handleShowModal(tour.name)} className={styles.deleteButton}>Delete</button>
		</div>
	);
};

export default EditableTourCard;
