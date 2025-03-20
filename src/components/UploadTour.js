import React, { useState } from 'react';
import styles from '../styles/UploadTour.module.css'; // Import CSS module
import { storage } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { message, Spin } from "antd"

const UploadTour = () => {
	const backend_url = process.env.REACT_APP_BACKEND_URL;
	const [tourName, setTourName] = useState('');
	const [tourDescription, setTourDescription] = useState('');
	const [tourPrice, setTourPrice] = useState('');
	const [tourPhoto, setTourPhoto] = useState(null);
	const [loading, setLoading] = useState(false)
	const [username, setUsername] = useState(sessionStorage.getItem("username"))

	const handleSubmit = (e) => {

		setLoading(true)
		e.preventDefault();

		//upload image to firebase storage
		const imageRef = ref(storage, "images/" + tourPhoto.name);
		uploadBytes(imageRef, tourPhoto).then((snapshot) => {
			getDownloadURL(snapshot.ref).then((url) => {

				console.log("image url is ", url);

				const body = {
					"name": tourName,
					"description": tourDescription,
					"price": parseInt(tourPrice),
					"photoUrl": url,
					"username": username
				}

				console.log(body)

				// Upload URL and other info to PostgreSQL
				fetch(`${backend_url}/tour/upload`, {
					method: "POST",
					credentials: "include",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(body)
				})
					.then(res => {
						if (!res.ok) {
							throw new Error(`HTTP error! Status: ${res.status}`); // Throw an error for non-2xx responses
						}
						return res.text()

					})
					.then(data => {
						console.log("backend returned this ", data);
						message.info("Upload Success")
					})
					.catch(error => {
						console.error("Error uploading tour info:", error);
						message.error("Upload Failed")
					})
					.finally(() => {
						setLoading(false);
					});
			});
		})
			.catch((error) => {
				console.error("Error uploading image:", error);
				message.error("Upload Failed")
				setLoading(false);
			});
	};

	return (
		<div className={styles.uploadContainer}>
			<h2 style={{ textAlign: "center", marginBottom: "30px" }}>Upload a New Tour</h2>
			<Spin spinning={loading}>
				<form onSubmit={handleSubmit} className={styles.uploadForm}>

					<div className={styles.formGroup}>
						<label htmlFor="tourName">Tour Name:</label>
						<input
							type="text"
							id="tourName"
							value={tourName}
							onChange={(e) => setTourName(e.target.value)}
							required
						/>
					</div>

					<div className={styles.formGroup}>
						<label htmlFor="tourDescription">Date and Time:</label>
						<textarea
							id="tourDescription"
							value={tourDescription}
							onChange={(e) => setTourDescription(e.target.value)}
							required
						/>
					</div>

					<div className={styles.formGroup}>
						<label htmlFor="tourPrice">Tour Price:</label>
						<input
							type="number"
							id="tourPrice"
							value={tourPrice}
							onChange={(e) => setTourPrice(e.target.value)}
							required
						/>
					</div>

					<div className={styles.formGroup}>
						<label htmlFor="tourPhoto">Tour Photo:</label>
						<input
							type="file"
							id="tourPhoto"
							accept="image/*"
							onChange={(e) => setTourPhoto(e.target.files[0])}
							required
						/>
					</div>

					<button type="submit" className={styles.submitButton}>
						Upload Tour
					</button>
				</form>
			</Spin>
		</div>
	);
};

export default UploadTour;
