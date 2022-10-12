import axios from "axios";

const axInstance = axios.create({ withCredentials: true });

export const refreshToken = () => axInstance.get("/api/auth/token");

export const signIn = ({ token, ...payload }) =>
	axInstance.post("/api/auth/signin", payload, {
		headers: {
			captcha: token,
		},
	});

export const signOut = () => axInstance.post("/api/auth/signout");

export const register = ({ token, ...payload }) =>
	axInstance.post("/api/auth/register", payload, {
		headers: {
			captcha: token,
		},
	});

export const requestHelp = ({ token, email }) =>
	axInstance.post(
		"/api/auth/request-reset",
		{ email },
		{
			headers: {
				captcha: token,
			},
		}
	);

export const resetPassword = ({ token, verificationToken, password }) =>
	axInstance.put(
		"/api/auth/reset",
		{ token: verificationToken, password },
		{
			headers: {
				captcha: token,
			},
		}
	);
