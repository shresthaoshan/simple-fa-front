import { Route, Routes } from "react-router-dom";

import AuthView from "../views/auth";
import Login from "../views/auth/Login";
import Register from "../views/auth/Register";

import NormalView from "../views/normal";
import Home from "../views/normal/Home";

const AppRoutes = () => {
	return (
		<>
			<Routes>
				{/* admin */}
				<Route path="/" element={<NormalView />}>
					<Route index element={<Home />} />
				</Route>
				<Route path="auth" element={<AuthView />}>
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
				</Route>
			</Routes>
		</>
	);
};

export default AppRoutes;
