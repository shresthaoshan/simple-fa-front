import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import "./styles.scss";

const Navbar = () => {
	const { auth, logout } = useAuth();

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
						<li>Streams</li>
						<li>News</li>
					</ul>
					<div className="divider"></div>
					<div className="control">
						<div className="photo">
							<img src={`https://avatars.dicebear.com/api/croodles/${auth.data.email}.svg?scale=120&translateY=5`} alt="" />
						</div>
						<button onClick={logout} disabled={auth.loading}>
							{auth.loading ? "Loading..." : "Log Out"}
						</button>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
