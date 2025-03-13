import React from 'react';
import { Carousel } from 'antd';
import img1 from "../images/hk.jpg";
import img2 from "../images/hk1.jpg";
import img3 from "../images/ferry.jpg";

const contentStyle = {
	height: '400px',
	color: '#fff',
	lineHeight: '400px',
	textAlign: 'center',
	background: '#364d79',
	borderRadius: '10px',
	overflow: 'hidden',
	position: 'relative',
};

const imageStyle = {
	width: '100%',
	height: '100%',
	objectFit: 'cover',
	position: 'absolute',
	top: '0',
	left: '0',
};

const halfVisibleStyle = {
	position: 'absolute',
	top: '0',
	right: '-50%',
	width: '50%',
	height: '100%',
	overflow: 'hidden',
};

const halfVisibleImageStyle = {
	width: '200%',
	height: '100%',
	objectFit: 'cover',
	position: 'absolute',
	top: '0',
	left: '0',
};

function Test() {
	return (
		<div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
			<h1>hellow ordl</h1>
			{/* <Carousel autoplay effect="fade" dots={false} style={{ borderRadius: '10px' }}>
				<div>
					<div style={contentStyle}>
						<img src={img1} alt="Hong Kong 1" style={imageStyle} />
						<div style={halfVisibleStyle}>
							<img src={img2} alt="Hong Kong 2" style={halfVisibleImageStyle} />
						</div>
					</div>
				</div>
				<div>
					<div style={contentStyle}>
						<img src={img2} alt="Hong Kong 2" style={imageStyle} />
						<div style={halfVisibleStyle}>
							<img src={img3} alt="Ferry" style={halfVisibleImageStyle} />
						</div>
					</div>
				</div>
				<div>
					<div style={contentStyle}>
						<img src={img3} alt="Ferry" style={imageStyle} />
						<div style={halfVisibleStyle}>
							<img src={img1} alt="Hong Kong 1" style={halfVisibleImageStyle} />
						</div>
					</div>
				</div>
			</Carousel> */}
		</div>
	);
}

export default Test;
