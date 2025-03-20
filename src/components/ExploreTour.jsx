// TourPage.jsx
import { message } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { LoginContext } from '../App';
import styles from "../styles/ExploreTour.module.css"

const ExploreTour = () => {
	const backend_url = process.env.REACT_APP_BACKEND_URL;
	const { loggedIn, setLoggedIn } = useContext(LoginContext);
	const navigate = useNavigate();

	const location = useLocation()
	const tourId = location.state.id

	const [tour, setTour] = useState({
		name: "",
		description: "",
		price: "",
		uploader: "",
		imageUrl: ""
	})

	console.log("tour id", tourId)

	useEffect(() => {
		fetch(`${backend_url}/tour/get/${tourId}`, {
			method: "GET",
			credentials: "include"
		})
			.then(res => res.json())
			.then(data => {
				setTour({
					name: data.name,
					description: data.description,
					price: data.price,
					imageUrl: data.photoUrl,
					uploader: data.user.name
				})
			})
	}, [])

	const handleBook = () => {
		if (!loggedIn) {
			message.error("You have to be logged in to book!!");
			navigate("/login");
		} else {
			const body = {
				tourId: tourId,
				username: sessionStorage.getItem("username")
			};

			console.log("body ", body);
			fetch(`${backend_url}/book`, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(body)
			})
				.then(async (res) => {
					const data = await res.json(); // Read the response body once

					if (!res.ok) {
						message.error(data.message); // Use the parsed data for error handling
					} else {
						console.log(data);
						message.info("Successfully Booked Tour");
					}
				})
				.catch(error => {
					console.error("Fetch error:", error);
					message.error("An error occurred while booking the tour.");
				});
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.tourPage}>
				<div className={styles.imageContainer}>
					<img src={tour.imageUrl} alt={tour.name} className={styles.tourImage} />
				</div>
				<div className={styles.infoContainer}>
					<h1 className={styles.tourName}>{tour.name}</h1>
					<p className={styles.tourDescription}>{tour.description}</p>
					<p className={styles.tourPrice}><strong>Price: </strong>${tour.price}</p>
					<p className={styles.tourUploader}><strong>Uploaded by: </strong>{tour.uploader}</p>
					<button className={styles.bookButton} onClick={handleBook}>
						Book Now
					</button>
				</div>
			</div>
		</div>
	);
};

export default ExploreTour;
