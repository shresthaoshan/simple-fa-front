import ReCAPTCHA from "react-google-recaptcha";

import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { captchaConfig } from "../../configs/captcha.config";
import { useAuth } from "../../hooks/useAuth";

import "../../styles/form.css";
import Logo from "../../components/Logo";

const Login = () => {
	const navigate = useNavigate();

	let captchaRef = useRef();
	const [captchaValue, setCaptchaValue] = useState("");
	const [loginDetails, setLoginDetails] = useState({
		email: "",
		password: "",
	});

	const { auth, clearAuth, login, setAuthError } = useAuth();

	const updateRegDetails =
		(field = "") =>
		(ev) => {
			setLoginDetails((prev) => ({
				...prev,
				[field]: ev.target.value,
			}));
		};

	const onFormSubmit = async (e) => {
		e.preventDefault();

		if (loginDetails.password.length < 8) {
			setAuthError("Password must be at least 8 characters.");
			return;
		}

		if (!captchaValue) {
			alert("Please prove that you're not a bot. Solve the CAPTCHA.");
			return;
		}

		const { email, password } = loginDetails;

		login(email, password, captchaValue)
			.then(() => {
				navigate("/", { replace: true });
			})
			.catch((err) => {
				captchaRef.current.reset();
				setCaptchaValue("");
			});
	};

	return (
		<div className="login__view">
			<form onSubmit={onFormSubmit}>
				<Logo />
				<div className="header">
					<h2>Sign In</h2>
					<p>
						New here?{" "}
						<Link to="/auth/register" onClick={clearAuth}>
							Register Now
						</Link>
					</p>
				</div>
				<div className="input__field">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						name="email"
						id="email"
						required
						placeholder="Email Address"
						value={loginDetails.email}
						onChange={updateRegDetails("email")}
					/>
				</div>
				<div className="input__field">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						id="password"
						required
						minLength={8}
						placeholder="Password"
						value={loginDetails.password}
						onChange={updateRegDetails("password")}
					/>
				</div>
				<div className="input__field">
					<ReCAPTCHA
						ref={captchaRef}
						sitekey={captchaConfig.CAPTCHA_KEY}
						onError={(err) => console.log({ err })}
						onExpired={() => {
							setCaptchaValue("");
						}}
						onChange={setCaptchaValue}
					/>
				</div>
				<p>
					<small className="error__msg">{auth.error}</small>
				</p>
				<button disabled={!captchaValue.length || auth.loading}>{auth.loading ? "Loading..." : "Sign In"}</button>
			</form>
		</div>
	);
};

export default Login;
