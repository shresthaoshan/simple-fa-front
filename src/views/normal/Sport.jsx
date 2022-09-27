import React, { useCallback, useMemo } from "react";
import ReactPlayer from "react-player";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { LiveStream } from "../../components/Stream";

import "../../styles/sport.scss";

const _news = [
	{
		id: "jksahdjkgaiu",
		title: "India’s tennis star Sania Mirza credits National Games for her international success",
		thumbnail: "https://img.olympicchannel.com/images/image/private/t_16-9_400-225/f_auto/primary/geijli3bd07eb9vjrtrx",
	},
	{
		id: "kjgdfhshjsdb",
		title: "Doing it for her daughter: Why Paris 2024 and motherhood mean so much to Gabi Mazetto",
		thumbnail: "https://img.olympicchannel.com/images/image/private/t_16-9_400-225/f_auto/primary/jea6zfmgmie4ih4rouiz",
	},
	{
		id: "ydgyufsdjbhu",
		title: "Serena Williams: How life after tennis is treating me",
		thumbnail: "https://img.olympicchannel.com/images/image/private/t_16-9_400-225/f_auto/primary/qjkuxv157c2a1wkys6cd",
	},
];
const _highlights = [
	{
		url: "https://www.youtube.com/watch?v=_PMUlWqEskc",
		title: "Czech Republic 0 - 4 Portugal | Highlights | UEFA Nations League | 25th September 2022",
	},
	{
		url: "https://www.youtube.com/watch?v=VPVPC6TtSIs",
		title: "Denmark 2 - 0 France | Highlights | UEFA Nations League | 26th September 2022",
	},
	{
		url: "https://www.youtube.com/watch?v=WTJSt4wP2ME",
		title: "K'NAAN - Wavin' Flag (Coca-Cola Celebration Mix)",
	},
	{
		url: "https://www.youtube.com/watch?v=QP25ucU8vfI",
		title: "FULL MATCH | Chelsea 4-0 Manchester United | Premier League Replay",
	},
];

const Sport = () => {
	const { sport } = useParams();
	const { pathname } = useLocation();

	const getVidThumbnail = useCallback((link = "") => {
		const id = link.split("=")[1];
		return `https://i3.ytimg.com/vi/${id}/maxresdefault.jpg`;
	}, []);

	const getActSport = useCallback(
		(sport = "") => {
			const sport_id = sport.split(" ").join("_").toLowerCase();
			return `/${sport_id}/live` === pathname;
		},
		[pathname]
	);

	return (
		<div className="sport">
			<div className="selection">
				{["Football", "Judo", "Tennis", "Long Jump", "High Jump", "Karate", "Sprint", "Shotput"].map((item, key) => (
					<Link to={`/${item.split(" ").join("_").toLowerCase()}/live`} key={key}>
						<div className={`selection_item ${getActSport(item) ? "active" : ""}`}>{item}</div>
					</Link>
				))}
			</div>
			<LiveStream sport={sport} />
			<section className="passive">
				<div className="news">
					<h3>News</h3>
					<div className="list">
						{_news.map((item) => (
							<div key={item.id} className="news_item">
								<Link to={`/news/${item.id}`}>
									<div className="image">
										<img src={item.thumbnail} alt={item.title} />
									</div>
									<div className="info">
										<h4>{item.title}</h4>
									</div>
								</Link>
							</div>
						))}
					</div>
				</div>
				<div className="highlights">
					<h3>Highlights</h3>
					<div className="list">
						{_highlights.map((item, idx) => (
							<div key={idx} className="highlight_item">
								<div className="player">
									<img src={getVidThumbnail(item.url)} alt={item.title} />

									{/* <ReactPlayer playsinline playing={false} width="100%" height="100%" url={item.url} /> */}
								</div>
								<div className="info">
									<h4>{item.title}</h4>
								</div>
							</div>
						))}
						<div className="divider"></div>
						<h3>Blog Posts</h3>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Sport;
