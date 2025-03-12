import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router';
import LandingPage from './components/LandingPage';
import styles from "./styles/Header.module.css"
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import UserProfile from './components/UserProfile';
import UploadTour from './components/UploadTour';
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { FaUser} from "react-icons/fa";
import ProtectedRoutes from './utils/ProtectedRoutes';
import AllTours from './components/AllTours';


export const LoginContext = React.createContext();

const Header = ({ loggedIn, setLoggedIn }) => {
	const navigate = useNavigate();

	useEffect(() => {

	}, [loggedIn])

	return (
		<header className={styles.header}>
			<div onClick={() => navigate("/")}
				className={styles.logo}>Tourie</div>
			<nav className={styles.nav}>
				{
					loggedIn ? (
						<Link to="/profile">
							<div style={{ display: "flex", flexDirection:"column",alignItems:"center", justifyContent: "center", width: "fit-content" }}>
								<FaUser style={{ marginRight: "5px" }} /> <p>{sessionStorage.getItem("username")}</p>
							</div>
						</Link>
					) : (
						<Link to="/signup">Sign In</Link>
					)
				}
			</nav>
		</header>
	)
}


function App() {
	const [loggedIn, setLoggedIn] = useState(() => {
		return sessionStorage.getItem("loggedIn") === "true";
	});


	return (
		<Router>
			<LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
				<Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
				<Routes>
					<Route path='/' element={<LandingPage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/signup' element={<SignUpPage />} />
					<Route path='/tours' element={<AllTours />} />
					<Route element={<ProtectedRoutes />}>
						<Route path='/profile' element={<UserProfile />} />
						<Route path='/upload' element={<UploadTour />} />
					</Route>

				</Routes>
			</LoginContext.Provider>
		</Router>
	);
}

export default App;
