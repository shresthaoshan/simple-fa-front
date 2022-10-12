import PasswordStrengthBar from "react-password-strength-bar";
import ReCAPTCHA from "react-google-recaptcha";
import Logo from "../../components/Logo";

import { useMemo, useRef, useState } from "react";
import { captchaConfig } from "../../configs/captcha.config";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

const Reset = () => {
	let captchaRef = useRef();
	const navigate = useNavigate();

	const [captchaValue, setCaptchaValue] = useState("");
	const [resetDetails, setResetDetails] = useState({ password: "", confirmPassword: "", verificationToken: "" });
	const [passwordStrength, setPWStrength] = useState({ score: 0, feedback: {} });

	const { auth, reset, setAuthError } = useAuth();

	const updateResetDetails =
		(field = "") =>
		(ev) => {
			setResetDetails((prev) => ({
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

		const { confirmPassword, password, verificationToken } = resetDetails;

		if (password !== confirmPassword) {
			setAuthError("Passwords do not match.");
			return;
		}

		reset(verificationToken, password, captchaValue)
			.then(() => {
				navigate("../login", { replace: false });
			})
			.catch((err) => {
				captchaRef.current.reset();
				setCaptchaValue("");
			});
	};

	const passwordConfirmed = useMemo(() => {
		return !!resetDetails.password.length && resetDetails.password === resetDetails.confirmPassword;
	}, [resetDetails.password, resetDetails.confirmPassword]);

	return (
		<div className="help__view">
			<form onSubmit={onFormSubmit}>
				<Logo />

				<div className="header">
					<h2>Password reset.</h2>
				</div>

				<div className="input__field">
					<label htmlFor="name">Token</label>
					<input
						type="text"
						name="token"
						id="token"
						required
						placeholder="Token"
						value={resetDetails.verificationToken}
						onChange={updateResetDetails("verificationToken")}
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
						value={resetDetails.password}
						onChange={updateResetDetails("password")}
					/>
					<PasswordStrengthBar
						password={resetDetails.password}
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
						value={resetDetails.confirmPassword}
						onChange={updateResetDetails("confirmPassword")}
						style={
							resetDetails.confirmPassword.length || resetDetails.password.length
								? { borderBottomColor: passwordConfirmed ? "green" : "red" }
								: {}
						}
					/>
					<p>
						{(resetDetails.confirmPassword.length || resetDetails.password.length) && !passwordConfirmed ? (
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
				<button disabled={!captchaValue.length || auth.loading}>{auth.loading ? "Loading..." : "Reset"}</button>
				<div className="reset">
					<p style={{ textAlign: "right" }}>
						<Link to="../login">Back to login</Link>
					</p>
				</div>
			</form>
		</div>
	);
};

export default Reset;
