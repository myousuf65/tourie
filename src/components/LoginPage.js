import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { LoginContext } from "../App";
import styles from "../styles/LoginPage.module.css";
import { Link } from 'react-router';
import { message, Spin } from "antd";

const LoginPage = () => {
	const { loggedIn, setLoggedIn } = useContext(LoginContext);
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const handleLogin = (e) => {
		e.preventDefault();
		console.log("Login attempted with:", { email: username, password });
		setLoading(true);
		fetch("http://localhost:8080/auth/login", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: username,
				password: password,
				email: "",
			}),
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error("Error : ", res.status)
				}
				return res.text()
			})
			.then((data) => {
				console.log(data)
				if (data === "USER IS LOGGED IN") {
					sessionStorage.setItem("loggedIn", true)
					sessionStorage.setItem("username", username)
					setLoading(false);
					navigate("/profile")
					setLoggedIn(true)
				} else {
					console.log(data)
				}
			}).catch(e => {
				message.error(e.message)
				setLoading(false)
			})
			;
	};


	return (
		<div className={styles.loginPage}>
			<div className={styles.formContainer}>
				<h2 className={styles.title}>Log in to your account</h2>
				<Spin spinning={loading}>
					<form onSubmit={handleLogin}>
						<input
							type="text"
							placeholder="Username"
							className={styles.inputField}
							value={username}
							onChange={(e) => setUsername(e.target.value)}
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
						<button type="submit" className={styles.submitButton}>
							Log in
						</button>
					</form>
				</Spin>
				<p className={styles.switchPage}>
					Don’t have an account? <Link to="/signup">Sign up</Link>
				</p>
			</div>
		</div>
	);
};

export default LoginPage;
