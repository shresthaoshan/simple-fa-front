import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import Modal from "react-modal";
import { LiveStream } from "../../components/Stream";
import { useHighlights } from "../../hooks/useHighlights";
import { useNews } from "../../hooks/useNews";
import { useSport } from "../../hooks/useSport";

import "../../styles/sport.scss";
import { useBlog } from "../../hooks/useBlog";

const Sport = () => {
	const { sport } = useParams();
	const { pathname } = useLocation();
	const {
		sports: { list },
	} = useSport();
	const { blogs, fetchBlogs } = useBlog();
	const { news } = useNews();
	const { highlights, fetchHighlights } = useHighlights();

	const [paused, setPaused] = useState(false);
	const [playHighlight, setHighlight] = useState("");

	const getVidThumbnail = useCallback((link = "") => {
		const id = link.split("=")[1];
		return `https://i3.ytimg.com/vi/${id}/maxresdefault.jpg`;
	}, []);

	const getActSport = useCallback((_sport = "") => sport === _sport, [sport]);

	const sportDetails = useMemo(() => {
		return list.find((e) => e.sport_id == sport);
	}, [pathname, list]);

	useEffect(() => {
		if (sport.length) {
			fetchHighlights(sport);
			fetchBlogs(sport);
		}
	}, [sport]);

	return (
		<div className="sport">
			<div className="selection">
				{list.map((item, key) => (
					<Link to={`/${item.sport_id}/live`} key={key}>
						<div className={`selection_item ${getActSport(item.sport_id) ? "active" : ""}`}>{item.name}</div>
					</Link>
				))}
			</div>
			<LiveStream paused={paused} stream={sportDetails?.live_url || ""} />
			<section className="passive">
				<div className="news">
					<h3>News</h3>
					<div className="list">
						{news.list.map((item) => (
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
						{highlights.list.map((item, idx) => (
							<div
								key={idx}
								className="highlight_item"
								onClick={() => {
									setPaused(true);
									setHighlight(item.source);
								}}
							>
								<div className="player">
									<img src={getVidThumbnail(item.source)} alt={item.name} />
								</div>
								<div className="info">
									<h4>{item.name}</h4>
								</div>
							</div>
						))}
					</div>
					<div className="divider"></div>
					<h3>Blog Posts</h3>
					{blogs.list.map((item) => (
						<div className="blog_item" key={item.id}>
							<h2>{item.title}</h2>
							<p>
								{item.content.split("\n").map((c, i) => (
									<p key={i}>{c}</p>
								))}
							</p>
						</div>
					))}
				</div>
			</section>
			<Modal
				isOpen={paused}
				onRequestClose={() => setPaused(false)}
				style={{
					overlay: {
						zIndex: 9999,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						background: "rgba(30, 30, 30, .9)",
						backdropFilter: "blur(5px)",
					},
				}}
				preventScroll
				shouldCloseOnEsc
				shouldFocusAfterRender
				shouldReturnFocusAfterClose
				shouldCloseOnOverlayClick
				className="modal"
				bodyOpenClassName="modal__open"
			>
				<ReactPlayer url={playHighlight} />
			</Modal>
		</div>
	);
};

export default Sport;
