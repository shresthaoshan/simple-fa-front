import { useAuth } from "../../hooks/useAuth";

import "../../styles/home.css";

const Home = () => {
	const { auth, logout } = useAuth();

	return (
		<div className="home__view">
			<div className="wrapper">
				<div>
					{auth.data ? (
						<div className="photo">
							<img src={`https://avatars.dicebear.com/api/croodles/${auth.data.email}.svg?scale=120&translateY=5`} alt="" />
						</div>
					) : (
						<></>
					)}
					<h2>{auth.data?.full_name || "Not set."}</h2>
					<p>{auth.data?.email || "Not set."}</p>
				</div>
				<button onClick={logout} disabled={auth.loading}>
					{auth.loading ? "Loading..." : "Sign Out"}
				</button>
			</div>
		</div>
	);
};

export default Home;
