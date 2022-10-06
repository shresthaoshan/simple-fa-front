import ReactPlayer from "react-player/twitch";
import { useAuth } from "../../hooks/useAuth";
import LoginButton from "../Buttons/Login.button";

import "./styles.scss";

export const LiveStream = ({ stream = "", paused = false }) => {
	const { isLoggedIn } = useAuth();

	return (
		<div className="stream_view live">
			<div className="play_view">
				{isLoggedIn ? (
					stream.length ? (
						<ReactPlayer muted={!paused} volume={1} width="100%" height="100%" url={stream} controls={false} />
					) : (
						<div className="overlay">
							<h2>Stream not available.</h2>
							<p>Check back soon.</p>
						</div>
					)
				) : (
					<div className="overlay">
						<h2>Please log in to watch.</h2>
						<LoginButton />
					</div>
				)}
			</div>
		</div>
	);
};
