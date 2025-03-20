import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import styles from '../styles/EditableTourCard.module.css'

const EditableTourCard = ({ tour, handleShowModal }) => {

	const navigate = useNavigate();

	const handleEditModal = () => {
		navigate("/edit")
		window.localStorage.setItem("edit", JSON.stringify(tour))
	}

	return (
		<div className={styles.card}>
			<img src={tour.photoUrl} alt={tour.name} className={styles.photo} />
			<h3 className={styles.name}>{tour.name}</h3>
			<div className={styles.container1}>
				<button onClick={handleEditModal} className={styles.editButton}>Edit</button>
				<button onClick={() => handleShowModal(tour.name, tour.tourId)} className={styles.deleteButton}>Delete</button>
			</div>
		</div>
	);
};

export default EditableTourCard;
