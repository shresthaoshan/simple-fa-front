import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../hooks/useAuth";

const NormalView = () => {
	const { isLoggedIn, auth } = useAuth();

	if (auth.loading)
		return (
			<div className="loading">
				<h3>Loading...</h3>
			</div>
		);

	return isLoggedIn ? (
		<>
			<Navbar />
			<Outlet />
		</>
	) : (
		<Navigate to="/auth/login" />
	);
};

export default NormalView;
