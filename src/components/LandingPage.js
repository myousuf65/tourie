import React from 'react';
import { useNavigate } from 'react-router';
import styles from "../styles/LandingPage.module.css";

const LandingPage = () => {
	const navigate = useNavigate();

	return (
		<div className={styles.landingPage}>
			{/* Hero Section */}
			<div className={styles.heroSection}>
				<h1 className={styles.heroTitle}>Explore Hong Kong Like Never Before</h1>
				<p className={styles.heroSubtitle}>Join us for unforgettable tours and experiences in the vibrant city of Hong Kong.</p>
				<button onClick={()=>{
					navigate("/tours")
				}} className={styles.heroButton}>Start Your Adventure</button>
			</div>

			{/* Features Section */}
			<div className={styles.featuresSection}>
				<div className={styles.featuresContainer}>
					<h2 className={styles.featuresTitle}>Why Choose Our Tours?</h2>
					<div className={styles.featuresGrid}>
						<div className={styles.featureItem}>
							<h3>Expert Guides</h3>
							<p>Our knowledgeable and friendly guides will provide you with insider tips and stories about Hong Kong.</p>
						</div>
						<div className={styles.featureItem}>
							<h3>Customizable Tours</h3>
							<p>Choose from a variety of tours or create a personalized experience tailored to your interests.</p>
						</div>
						<div className={styles.featureItem}>
							<h3>Seamless Booking</h3>
							<p>Book your tours online with ease and secure your spot instantly.</p>
						</div>
					</div>
				</div>
			</div>

			<div className={styles.howItWorksSection}>
				<div className={styles.howItWorksContainer}>
					<h2 className={styles.howItWorksTitle}>How It Works</h2>
					<div className={styles.howItWorksSteps}>
						<div className={styles.step}>
							<h3>Step 1: Browse Tours</h3>
							<p>Explore our wide range of tours, including city sightseeing, cultural experiences, and adventure activities.</p>
						</div>
						<div className={styles.step}>
							<h3>Step 2: Book Your Tour</h3>
							<p>Choose your tour, select your preferred date, and book your spot in just a few clicks.</p>
						</div>
						<div className={styles.step}>
							<h3>Step 3: Explore Hong Kong</h3>
							<p>Join your tour and enjoy a memorable journey through the heart of Hong Kong!</p>
						</div>
					</div>
				</div>
			</div>

			{/* Testimonials Section */}
			<div className={styles.testimonialsSection}>
				<h2 className={styles.testimonialsTitle}>What Our Guests Say</h2>
				<div className={styles.testimonialsContainer}>
					<div className={styles.testimonial}>
						<p>"The Hong Kong tour was an amazing experience. The guide was so knowledgeable, and we got to see the best parts of the city!"</p>
						<p><strong>- Emily R.</strong></p>
					</div>
					<div className={styles.testimonial}>
						<p>"I loved the customized tour. We explored the hidden gems of Hong Kong, and it was such a unique experience. Highly recommend!"</p>
						<p><strong>- Mark T.</strong></p>
					</div>
				</div>
			</div>

			{/* Footer */}
			<footer className={styles.footer}>
				<p>© 2025 Hong Kong Tours. All rights reserved.</p>
			</footer>
		</div>
	);
};

export default LandingPage;
