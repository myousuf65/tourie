import React, { useEffect, useState } from 'react';
import { Carousel, Button, Modal } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import img1 from '../images/hk.jpg';
import img2 from '../images/hk1.jpg';
import img3 from '../images/ferry.jpg';



const images = [img1, img2, img3];

const Test = () => {

	const [tours, setTours] = useState([])
	const backend_url = process.env.REACT_APP_BACKEND_URL;

	useEffect(() => {
		fetch(`${backend_url}/tour/all`, {
			method: "GET",
			credentials: "include"
		})
			.then(res => {
				return res.json()
			})
			.then(data => {
				setTours(data)	
			})

	}, [])


	const carouselRef = React.useRef(null);

	const handlePrev = () => {
		carouselRef.current.prev();
	};

	const handleNext = () => {
		carouselRef.current.next();
	};

	return (
		<div style={{ position: 'relative', width: '800px', margin: '0 auto' }}>
			<Carousel ref={carouselRef} autoplay>
				{tours.map((tour, index) => (
					<div key={index}>
						<img
							src={tour.photoUrl}
							alt={`Slide ${index + 1}`}
							style={{ width: '100%', height: '400px', objectFit: 'cover' }}
						/>
					</div>
				))}
			</Carousel>

			<Button
				type="primary"
				shape="circle"
				icon={<LeftOutlined />}
				onClick={handlePrev}
				style={{ position: 'absolute', top: '50%', left: '-50px', transform: 'translateY(-50%)' }}
			/>
			<Button
				type="primary"
				shape="circle"
				icon={<RightOutlined />}
				onClick={handleNext}
				style={{ position: 'absolute', top: '50%', right: '-50px', transform: 'translateY(-50%)' }}
			/>
		</div>
	);
};

export default Test;
