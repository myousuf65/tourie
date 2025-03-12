import React, { useContext, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router';
import { LoginContext } from '../App';
import { message } from 'antd';

function ProtectedRoutes() {
	const { loggedIn, setLoggedIn } = useContext(LoginContext);

	// useEffect(() => {
	// 	if (!loggedIn) {
	// 		message.warning('You are not logged in.');
	// 	}
	// }, [loggedIn]);

	return loggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;
