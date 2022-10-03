import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";

import { useSport } from "../../hooks/useSport";

const Home = () => {
	const { sports, fetchSports } = useSport();

	useEffect(() => {
		fetchSports();
		// eslint-disable-next-line
	}, []);

	return (
		<div className="home__view">
			<h1 className="banner-text">Welcome to Fun Olympics online.</h1>
			<h4>Choose your favorite sport and get going.</h4>

			<div className="grid">
				{sports.list.length ? (
					sports.list.map((item) => (
						<div key={item.id} className="grid-sport">
							<Link to={`/${item.sport_id}/live`}>
								<div className="label">
									<h3>{item.name}</h3>
								</div>
							</Link>
							<div className="bg">
								<img src={item.thumbnail} alt={item.name} />
							</div>
						</div>
					))
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default Home;
