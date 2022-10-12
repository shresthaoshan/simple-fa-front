import ReCAPTCHA from "react-google-recaptcha";
import Logo from "../../components/Logo";

import { useRef, useState } from "react";
import { captchaConfig } from "../../configs/captcha.config";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

const Help = () => {
	let captchaRef = useRef();
	const navigate = useNavigate();

	const [captchaValue, setCaptchaValue] = useState("");
	const [helpDetails, setHelpDetails] = useState({ email: "" });

	const { auth, requestReset, setAuthError } = useAuth();

	const updateHelpDetails =
		(field = "") =>
		(ev) => {
			setHelpDetails((prev) => ({
				...prev,
				[field]: ev.target.value,
			}));
		};

	const onFormSubmit = async (e) => {
		e.preventDefault();

		if (helpDetails.email.length < 8) {
			setAuthError("Please provide your email address.");
			return;
		}

		if (!captchaValue) {
			alert("Please prove that you're not a bot. Solve the CAPTCHA.");
			return;
		}

		const { email } = helpDetails;

		requestReset(email, captchaValue)
			.then(() => {
				navigate("../reset", { replace: false });
			})
			.catch((err) => {
				captchaRef.current.reset();
				setCaptchaValue("");
			});
	};

	return (
		<div className="help__view">
			<form onSubmit={onFormSubmit}>
				<Logo />

				<div className="header">
					<h2>Forgot your password? Reset it.</h2>
				</div>
				<div className="input__field">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						name="email"
						id="email"
						required
						placeholder="Email Address"
						value={helpDetails.email}
						onChange={updateHelpDetails("email")}
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
				<button disabled={!captchaValue.length || auth.loading}>{auth.loading ? "Loading..." : "Request"}</button>
				<div className="reset">
					<p style={{ textAlign: "right" }}>
						<Link to="../login">Back to login</Link>
					</p>
				</div>
			</form>
		</div>
	);
};

export default Help;
