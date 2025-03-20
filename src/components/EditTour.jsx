import React, { useState, useEffect } from 'react';
import styles from "../styles/EditTour.module.css"
import { message, Spin, List, Rate, Tabs } from 'antd';
import { useNavigate } from 'react-router';
import { storage } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import TabPane from 'antd/es/tabs/TabPane';


const EditTour = () => {
	const backend_url = process.env.REACT_APP_BACKEND_URL;
	const navigate = useNavigate();
	const [editedTour, setEditedTour] = useState({
		tourId: '',
		name: '',
		description: '',
		price: '',
		photoUrl: '',
	});
	const [tourPhoto, setTourPhoto] = useState(null);
	const [loading, setLoading] = useState(false)
	const [imageError, setImageError] = useState(false);
	const [bookings, setBookings] = useState([])

	// const ratings = [
	// 	{
	// 		"username": "user1",
	// 		"rating": 4,
	// 		"comment": "Great tour!"
	// 	},
	// 	{
	// 		"username": "user2",
	// 		"rating": 5,
	// 		"comment": "Amazing experience!"
	// 	}
	// ]

	useEffect(() => {
		const tour = JSON.parse(window.localStorage.getItem("edit"));
		if (tour) {
			setEditedTour({
				tourId: tour.tourId,
				name: tour.name,
				description: tour.description,
				price: tour.price,
				photoUrl: tour.photoUrl,
			});
			setImageError(false);
		}

		fetch(`${backend_url}/tour/getratings/${tour.tourId}`, {
			method: "GET",
			credentials: "include"
		})
			.then(res => res.json())
			.then(data => setBookings(data))
	}, []);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setEditedTour((prev) => ({ ...prev, [name]: value }));
	};

	const handleSave = () => {
		if (tourPhoto !== null) {
			// if use has uploaded a new photo
			setLoading(true)
			const imageRef = ref(storage, "images/" + tourPhoto.name);
			uploadBytes(imageRef, tourPhoto).then((snapshot) => {
				getDownloadURL(snapshot.ref).then((url) => {
					console.log("image url is ", url);

					const body = {
						"tourId": editedTour.tourId,
						"name": editedTour.name,
						"description": editedTour.description,
						"price": editedTour.price,
						"photoUrl": url,
						"username": sessionStorage.getItem("username")
					}

					console.log(body)

					// Upload URL and other info to PostgreSQL
					fetch(`${backend_url}/tour/update`, {
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
							message.info("Update Success")
							navigate("/profile")
						})
						.catch(error => {
							console.error("Error uploading tour info:", error);
							message.error("Update Failed")
						})
						.finally(() => {
							setLoading(false);
						});
				});
			})
				.catch((error) => {
					console.error("Error uploading image:", error);
					message.error("Failed to upload image")
					setLoading(false);
				});
		} else {
			// if user has not uploaded a new photo
			const body = {
				"tourId": editedTour.tourId,
				"name": editedTour.name,
				"description": editedTour.description,
				"price": editedTour.price,
				"photoUrl": editedTour.photoUrl,
				"username": sessionStorage.getItem("username")
			}

			console.log(body)

			fetch(`${backend_url}/tour/update`, {
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
					message.info("Update Success")
					navigate("/profile")

				})
				.catch(error => {
					console.error("Error uploading tour info:", error);
					message.error("Update Failed")
				})
				.finally(() => {
					setLoading(false);
				});

		}

	}

	const handleCancel = () => {
		navigate(-1)
	}

	const { TabPane } = Tabs;

	return (
		<div className={styles.container}>
			<Spin spinning={loading}>
				<h2 className={styles.title}>Edit Tour</h2>

				<Tabs defaultActiveKey="1">
					{/* Tab 1: Form Section */}
					<TabPane tab="Edit Tour" key="1">
						<div className={styles.formContainer}>
							<div className={styles.form}>
								<div className={styles.formGroup}>
									<label htmlFor="name">Name:</label>
									<input
										type="text"
										id="name"
										name="name"
										value={editedTour.name}
										onChange={handleInputChange}
									/>
								</div>
								<div className={styles.formGroup}>
									<label htmlFor="description">Date and Time:</label>
									<textarea
										id="description"
										name="description"
										value={editedTour.description}
										onChange={handleInputChange}
									/>
								</div>
								<div className={styles.formGroup}>
									<label htmlFor="price">Price:</label>
									<input
										type="number"
										id="price"
										name="price"
										value={editedTour.price}
										onChange={handleInputChange}
									/>
								</div>
								<div className={styles.formGroup}>
									<label htmlFor="photoUrl">Photo URL:</label>
									<input
										type="text"
										id="photoUrl"
										name="photoUrl"
										value={editedTour.photoUrl}
										onChange={handleInputChange}
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

								<div className={styles.buttons}>
									<button className={styles.cancelButton} onClick={handleCancel}>
										Cancel
									</button>
									<button className={styles.saveButton} onClick={handleSave}>
										Save
									</button>
								</div>
							</div>

							<div className={styles.imagePreview}>
								<img
									src={editedTour.photoUrl}
									alt="Tour Preview"
								/>
							</div>
						</div>
					</TabPane>

					{/* Tab 2: Ratings Section */}
					<TabPane tab="Ratings" key="2">
						<div className={styles.ratingsSection}>
							<h3>Ratings</h3>
							<List
								dataSource={bookings}
								renderItem={booking => (
									<List.Item>
										<List.Item.Meta
											title={booking.user.name}
											description={<Rate disabled defaultValue={booking.rating} />}
										/>
										<div>{booking.comment}</div>
									</List.Item>
								)}
							/>
						</div>
					</TabPane>
				</Tabs>
			</Spin>
		</div>
	);
};

export default EditTour;
