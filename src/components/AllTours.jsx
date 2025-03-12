import React, { useEffect, useState } from 'react';
import styles from '../styles/AllTours.module.css';
import TourCard from './TourCard';

function AllTours() {
	const backend_url = process.env.REACT_APP_BACKEND_URL;
	const [tours, setTours] = useState([])

	useEffect(() => {
		fetch(`${backend_url}/tour/all`, {
			method: "GET",
			credentials: "include"
		})
			.then(res => {
				if(!res.ok){
					throw new Error("Error fetching tours " + res.status )
				}
				console.log("Got this response: ", res)
				return res.json()
			})
			.then(data => {
				setTours(data)
			})
	}, [])
	return (
		<div className={styles.app}>
			<h1 className={styles.title}>Available Tours</h1>
			<div className={styles.tourList}>
				{tours.map((tour) => (
					<TourCard key={tour.id} tour={tour} />
				))}
			</div>
		</div>
	);
}

export default AllTours;
