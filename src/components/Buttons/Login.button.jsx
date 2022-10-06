import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LoginButton = () => {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const goToLogin = () => {
		navigate("/auth/login", { state: { goto: pathname }, replace: true });
	};

	return <button onClick={goToLogin}>Log In</button>;
};

export default LoginButton;
