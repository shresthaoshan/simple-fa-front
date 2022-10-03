import ReactPlayer from "react-player/twitch";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import "./styles.scss";

export const LiveStream = ({ stream = "" }) => {
	const { isLoggedIn } = useAuth();

	return (
		<div className="stream_view live">
			<div className="play_view">
				{isLoggedIn ? (
					stream.length ? (
						<ReactPlayer width="100%" height="100%" url={stream} controls={false} />
					) : (
						<div className="overlay">
							<h2>Stream not available.</h2>
							<p>Check back soon.</p>
						</div>
					)
				) : (
					<div className="overlay">
						<h2>Please log in to watch.</h2>
						<Link to="/auth/login">
							<button>Log In</button>
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};
