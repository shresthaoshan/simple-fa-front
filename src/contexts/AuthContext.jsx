import { createContext, useMemo, useState } from "react";
import * as authApi from "../api/auth.api";

const authContext = createContext({
	auth: {},
	isLoggedIn: false,
	refreshToken: () => {},
	register: () => {},
	login: () => {},
	logout: () => {},
	setAuthError: () => {},
	clearAuth: () => {},
});

export const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({
		data: {},
		loading: false,
		error: "",
	});

	const clearAuth = () => {
		setAuth({
			data: null,
			loading: false,
			error: "",
		});
	};

	const setAuthError = (error = "") => setAuth((prev) => ({ ...prev, error }));

	const refreshToken = async () => {
		const isLogged = localStorage.getItem("logged");
		if (!isLogged) {
			logout();
			return;
		}
		setAuth((prev) => ({ ...prev, loading: true }));
		try {
			const { data } = await authApi.refreshToken();
			console.log({ registration: data });
			setAuth({ loading: false, data, error: "" });
		} catch (error) {
			console.log({ error });
			setAuth({
				loading: false,
				data: null,
				error: error.response.data.error || error.response.data.detail || "Something went wrong.",
			});
			localStorage.removeItem("logged");
		}
	};
	const register = async (full_name = "", email = "", password = "", token = "") => {
		setAuth((prev) => ({ ...prev, loading: true }));
		try {
			const { data } = await authApi.register({ full_name, email, password, token });
			console.log({ registration: data });
			setAuth({ loading: false, data, error: "" });
			localStorage.setItem("logged", 1);
		} catch (error) {
			console.log({ error });
			setAuth({ loading: false, data: null, error: error.response.data.error || error.response.data.detail });
			localStorage.removeItem("logged");
			throw err;
		}
	};
	const login = async (email = "", password = "", token = "") => {
		setAuth((prev) => ({ ...prev, loading: true }));
		try {
			const { data } = await authApi.signIn({ email, password, token });
			setAuth({ loading: false, data, error: "" });
			localStorage.setItem("logged", 1);
		} catch (error) {
			setAuth({ loading: false, data: null, error: error.response.data.error || error.response.data.detail });
			localStorage.removeItem("logged");
			throw err;
		}
	};
	const logout = async () => {
		setAuth((prev) => ({ ...prev, loading: true }));
		try {
			await authApi.signOut();
			setAuth({ loading: false, data: null, error: "" });
			localStorage.removeItem("logged");
		} catch (error) {
			setAuth((prev) => ({ ...prev, data: null, loading: false }));
			throw err;
		}
	};

	const isLoggedIn = useMemo(() => !!auth.data, [auth.data]);

	return (
		<authContext.Provider value={{ auth, isLoggedIn, clearAuth, login, logout, refreshToken, register, setAuthError }}>
			{children}
		</authContext.Provider>
	);
};

export default authContext;
