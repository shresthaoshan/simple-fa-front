import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import LoginButton from "../Buttons/Login.button";

import "./styles.scss";

const Navbar = () => {
	const { auth, logout, isLoggedIn } = useAuth();

	return (
		<div className="navbar__container">
			<nav>
				<div className="logo">
					<Link to="/">
						FunOlympics
						<span>Stream</span>
					</Link>
				</div>
				<div className="menus">
					<ul>
						<li>News</li>
						<li>Blog</li>
					</ul>
					<div className="divider"></div>
					<div className="control">
						{isLoggedIn ? (
							<div className="photo">
								<img
									src={`https://avatars.dicebear.com/api/croodles/${auth.data.email}.svg?scale=120&translateY=5`}
									alt=""
								/>
							</div>
						) : (
							<></>
						)}
						{isLoggedIn ? (
							<button onClick={logout} disabled={auth.loading}>
								{auth.loading ? "Loading..." : "Log Out"}
							</button>
						) : (
							<LoginButton />
						)}
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
