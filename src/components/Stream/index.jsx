import ReactPlayer from "react-player/twitch";

import "./styles.scss";

export const LiveStream = ({ sport = "" }) => {
	return (
		<div className="stream_view live">
			<div className="play_view">
				<ReactPlayer width="100%" height="100%" url="https://www.twitch.tv/beyondthesummit" controls={false} />
			</div>
		</div>
	);
};
