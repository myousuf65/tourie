import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/UserProfile.module.css";
import User from "../images/user.png";
import { message, Modal, Spin, Button, Tabs, Rate } from "antd";
import { useNavigate } from "react-router";
import { LoginContext } from "../App";
import TourCard from "./TourCard";
import EditableTourCard from "./EditableTourCard";

const { TabPane } = Tabs;

const UserProfile = () => {
	const backend_url = process.env.REACT_APP_BACKEND_URL;
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState(sessionStorage.getItem("username"));
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { loggedIn, setLoggedIn } = useContext(LoginContext);
	const [tours, setTours] = useState([]);
	const [bookingHistory, setBookingHistory] = useState([])
	const [isRatingModalVisible, setIsRatingModalVisible] = useState(false);
	const [currentRating, setCurrentRating] = useState(0);
	const [currentBookingId, setCurrentBookingId] = useState(null);

	const handleRateTour = (bookingId, tourName, initialRating = 0) => {
		setCurrentBookingId(bookingId);
		setCurrentRating(initialRating);
		setIsRatingModalVisible(true);
	};

	const handleRatingSubmit = () => {
		if (!currentBookingId) return;

		const body = {
			bookingId: currentBookingId,
			rating: currentRating,
			username: sessionStorage.getItem("username")
		}

		fetch(`${backend_url}/tour/rate`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		})
			.then(res => res.json())
			.then(data => {
				console.log(data)
				setBookingHistory(data)
			})
			.finally(() => {
				setIsRatingModalVisible(false);
			});

	};

	const handleDeleteItem = (itemName, tourId) => {
		fetch(`${backend_url}/tour/delete`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: sessionStorage.getItem("username"),
				tour: tourId
			})
		})
			.then((res) => {
				if (!res.ok) {
					console.error(res.status, res)
					// throw new Error('Error Deleting Item')
				}
				return res.text()
			})
			.then((data) => {
				console.log(data)
				if (data === "delete success") {
					message.success("Tour Deleted");
					setTours(prevState => {
						return prevState.filter(item => item.tourId !== tourId); // Corrected return statement.
					});
				}
			})
			.catch(error => {
				message.error("Error Deleting item")
				console.log(error.message)
			})
	};

	const handleCancelTour = (bookingId) => {
		const body = {
			bookingId: bookingId,
			username: sessionStorage.getItem("username")
		}

		console.log(body)
		fetch(`${backend_url}/booking/cancel`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		})
			.then(res => res.json())
			.then(data => {
				setBookingHistory(data)
				message.info("Cancel Tour Succes")
			})
	}

	const handleShowModal = (itemName, tourId) => {
		console.log(itemName, tourId);
		Modal.confirm({
			title: "Are you sure you want to delete tour: " + itemName + "?",
			okText: "Delete",
			cancelText: "Cancel",
			onOk() {
				handleDeleteItem(itemName, tourId);
			},
			onCancel() {
				console.log("Action canceled");
			},
		});
	};



	useEffect(() => {
		setLoading(true);

		//------------ get user information-----------------
		fetch(
			`${backend_url}/auth/getdetails/${sessionStorage.getItem("username")}`,
			{
				method: "POST",
				credentials: "include",
			}
		)
			.then((res) => res.json())
			.then((data) => {
				console.log("data returned ", data);
				setEmail(data.email);
				setUsername(data.username);
				setLoading(false);
			});


		// ---------------get user postings -----------------
		fetch(
			`${backend_url}/tour/getbyusername/${sessionStorage.getItem("username")}`,
			{
				method: "GET",
				credentials: "include",
			}
		)
			.then((res) => {
				if (!res.ok) {
					setLoggedIn(false)
					message.error("You are not logged in")
					navigate("/login")
				} else {
					console.log(res);
					return res.json();
				}
			})
			.then((data) => {
				console.log("uploaded tours", data);
				setTours(data);
			});

		// -------------get user bookings -----------------
		fetch(
			`${backend_url}/getbookings/${sessionStorage.getItem("username")}`,
			{
				method: "GET",
				credentials: "include",
			}
		)
			.then((res) => {
				console.log(res.status);
				console.log(res);
				return res.json();
			})
			.then((data) => {
				console.log("booked", data);
				setBookingHistory(data)
			});
	}, []);

	const handleLogout = () => {
		console.log("clicked");
		fetch(`${backend_url}/auth/logout`, {
			method: "POST",
			credentials: "include",
		})
			.then((res) => res.text())
			.then((data) => {
				if (data === "USER IS LOGGED OUT") {
					console.log("user has been logged out", data);
					sessionStorage.removeItem("username");
					sessionStorage.setItem("loggedIn", false);
					navigate("/");
					setLoggedIn(false);
					message.success("You have been logged out.");
				}
			});
	};

	const user = {
		name: username,
		email: email,
	};

	return (
		<Spin spinning={loading}>
			<div className={styles.profileContainer}>
				<div className={styles.topSection}>
					<div className={styles.top1}>
						<div className={styles.userIcon}>
							<img src={User} alt="User Icon" />
						</div>
						<div className={styles.userInfo}>
							<h2>{user.name}</h2>
							<p>{user.email}</p>
						</div>
					</div>
					<div className={styles.top2}>
						<Button
							onClick={handleLogout}
							type="primary"
							danger
							style={{
								marginTop: "10px",
							}}
						>
							Logout
						</Button>
						<Button
							onClick={() => {
								navigate("/upload");
							}}
							type="primary"
							style={{
								marginTop: "10px",
							}}
						>
							Upload
						</Button>
					</div>
				</div>

				{/* Tabs for Booking History and Tours */}
				<Tabs defaultActiveKey="1" className={styles.tabsContainer}>
					<TabPane tab="Booking Information" key="1">
						<div className={styles.bottomSection}>
							<h3>Booking Information</h3>
							<table className={styles.bookingTable}>
								<thead>
									<tr>
										<th>Tour</th>
										<th>Date</th>
										<th>Price</th>
										<th>Cancel Tour</th>
										<th>Rate Tour</th>

									</tr>
								</thead>
								<tbody>
									{bookingHistory.map((booking) => (
										<tr key={booking.id}>
											<td>{booking.tour.name}</td>
											<td>{booking.tour.description}</td>
											<td>${booking.tour.price}</td>
											<td>
												<Button type="default" danger disabled={booking.deleted} onClick={() => handleCancelTour(booking.bookingId)}>
													Cancel Tour
												</Button>
											</td>
											<td>
												<Button
													type="default"
													disabled={booking.deleted}
													onClick={() => handleRateTour(booking.bookingId, booking.tour.name, booking.rating)}
												>
													Rate Tour
												</Button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
							<Modal
								title="Rate Tour"
								visible={isRatingModalVisible}
								onOk={handleRatingSubmit}
								onCancel={() => setIsRatingModalVisible(false)}
								okText="Submit Rating"
								cancelText="Cancel"
							>
								<Rate
									value={currentRating}
									onChange={(value) => setCurrentRating(value)}
								/>
							</Modal>
						</div>
					</TabPane>

					<TabPane tab="Tours Uploaded" key="2">
						<div className={styles.app}>
							<h3 className={styles.title}>Tours Uploaded</h3>
							<div
								style={{ display: "flex", flexWrap: "wrap", height: "100%" }}
								className={styles.tourList}
							>
								{tours.map((tour) => (
									<EditableTourCard
										key={tour.id}
										tour={tour}
										handleShowModal={handleShowModal}
									/>
								))}
							</div>
						</div>
					</TabPane>
				</Tabs>
			</div>
		</Spin>
	);
};

export default UserProfile;
