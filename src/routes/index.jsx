import { Route, Routes } from "react-router-dom";

import AuthView from "../views/auth";
import Help from "../views/auth/Help";
import Login from "../views/auth/Login";
import Register from "../views/auth/Register";
import Reset from "../views/auth/Reset";

import NormalView from "../views/normal";
import Home from "../views/normal/Home";
import Sport from "../views/normal/Sport";

const AppRoutes = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<NormalView />}>
					<Route path=":sport/live" element={<Sport />} />
					<Route index element={<Home />} />
				</Route>
				<Route path="auth" element={<AuthView />}>
					<Route path="login" element={<Login />} />
					<Route path="help" element={<Help />} />
					<Route path="reset" element={<Reset />} />
					<Route path="register" element={<Register />} />
				</Route>
			</Routes>
		</>
	);
};

export default AppRoutes;
