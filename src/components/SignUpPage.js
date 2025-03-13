import { message, Spin } from 'antd';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import styles from '../styles/SignUpPage.module.css';

const SignUpPage = () => {
	const backend_url = process.env.REACT_APP_BACKEND_URL;

	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false)
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const handleSignUp = (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			message.error("Passwords not matching")
			return;
		}

		console.log('Sign Up attempted with:', { email, password, name });

		setLoading(true)
		fetch(`${backend_url}/auth/signup`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: name,
				email: email,
				password: password
			})
		}).then(async (res) => {
			if (!res.ok) {
				return res.text().then(data => {
					throw new Error("Error: " + data)
				})
			}
			return res.text()
		})
			.then(data => {
				message.success("User Created")
				navigate("/login")
			}).catch(error => {
				message.error(error.message)
			}).finally(()=>{
				setLoading(false)
			})
	};

	return (
		<div className={styles.signUpPage}>
			<div className={styles.formContainer}>
				<h2 className={styles.title}>Create a new account</h2>
				<Spin spinning={loading}>
					<form onSubmit={handleSignUp}>
						<input
							type="text"
							placeholder="Full Name"
							className={styles.inputField}
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
						<input
							type="email"
							placeholder="Email"
							className={styles.inputField}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						<input
							type="password"
							placeholder="Password"
							className={styles.inputField}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<input
							type="password"
							placeholder="Confirm Password"
							className={styles.inputField}
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
						<button type="submit" className={styles.submitButton}>Sign up</button>
					</form>
				</Spin>
				<p className={styles.switchPage}>
					Already have an account? <Link to="/login">Log in</Link>
				</p>
			</div>
		</div>
	);
};

export default SignUpPage;

