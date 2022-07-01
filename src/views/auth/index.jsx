import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const AuthView = () => {
	const { isLoggedIn } = useAuth();

	return !isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default AuthView;
