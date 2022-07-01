import ReCAPTCHA from "react-google-recaptcha";
import PasswordStrengthBar from "react-password-strength-bar";

import { Link } from "react-router-dom";
import { useMemo, useRef, useState } from "react";
import { captchaConfig } from "../../configs/captcha.config";
import { useAuth } from "../../hooks/useAuth";

import "../../styles/form.css";
import Logo from "../../components/Logo";

const Register = () => {
	let captchaRef = useRef();
	const [captchaValue, setCaptchaValue] = useState("");
	const [registrationDetails, setRegistrationDetails] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [passwordStrength, setPWStrength] = useState({ score: 0, feedback: {} });

	const { auth, clearAuth, register, setAuthError } = useAuth();

	const updateRegDetails =
		(field = "") =>
		(ev) => {
			setRegistrationDetails((prev) => ({
				...prev,
				[field]: ev.target.value,
			}));
		};

	const onFormSubmit = async (e) => {
		e.preventDefault();

		if (passwordStrength.score < 3) {
			setAuthError("Set good/strong passsword.");
			return;
		}

		if (!captchaValue) {
			alert("Please prove that you're not a bot. Solve the CAPTCHA.");
			return;
		}

		const { name, email, password, confirmPassword } = registrationDetails;
		if (confirmPassword !== password) {
			alert("Passwords do not match.");
			return;
		}

		register(name, email, password, captchaValue).finally(() => {
			captchaRef.current.reset();
			setCaptchaValue("");
		});
	};

	const passwordConfirmed = useMemo(() => {
		return !!registrationDetails.password.length && registrationDetails.password === registrationDetails.confirmPassword;
	}, [registrationDetails.password, registrationDetails.confirmPassword]);

	return (
		<div className="register__view">
			<form onSubmit={onFormSubmit}>
				<Logo />
				<div className="header">
					<h2>Register New Account</h2>
					<p>
						Already have an account?{" "}
						<Link to="/auth/login" onClick={clearAuth}>
							Login
						</Link>
					</p>
				</div>
				<div className="input__field">
					<label htmlFor="name">Full Name</label>
					<input
						type="text"
						name="name"
						id="name"
						required
						placeholder="Full Name"
						value={registrationDetails.name}
						onChange={updateRegDetails("name")}
					/>
				</div>
				<div className="input__field">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						name="email"
						id="email"
						required
						placeholder="Email Address"
						value={registrationDetails.email}
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
						placeholder="Password"
						value={registrationDetails.password}
						onChange={updateRegDetails("password")}
					/>
					<PasswordStrengthBar
						password={registrationDetails.password}
						minLength={8}
						onChangeScore={(score, feedback) => {
							console.log({ score, feedback });
							setPWStrength({ score, feedback });
						}}
					/>
					<p>
						{passwordStrength.feedback?.warning?.length ? (
							<small className="error__msg">{passwordStrength.feedback.warning}</small>
						) : null}
					</p>
				</div>
				<div className="input__field">
					<label htmlFor="confirm_password">Confirm Password</label>
					<input
						type="password"
						name="confirm_password"
						id="confirm_password"
						required
						placeholder="Confirm Password"
						value={registrationDetails.confirmPassword}
						onChange={updateRegDetails("confirmPassword")}
						style={
							registrationDetails.confirmPassword.length || registrationDetails.password.length
								? { borderBottomColor: passwordConfirmed ? "green" : "red" }
								: {}
						}
					/>
					<p>
						{(registrationDetails.confirmPassword.length || registrationDetails.password.length) && !passwordConfirmed ? (
							<small className="error__msg">Passwords do not match.</small>
						) : (
							<></>
						)}
					</p>
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
				<button disabled={!captchaValue.length || !passwordConfirmed || auth.loading}>
					{auth.loading ? "Loading..." : "Register"}
				</button>
			</form>
		</div>
	);
};

export default Register;
