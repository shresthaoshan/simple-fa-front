import { Link } from "react-router-dom";
import "../../styles/home.css";

const backgrounds = {
	Football: "https://img.olympicchannel.com/images/image/private/t_16-9_360-203_2x/f_auto/v1538355600/primary/cfxidc1gzjra0vovtknv",
	Judo: "https://img.olympicchannel.com/images/image/private/t_16-9_760/primary/swiwzmpywuhbh76it0bs",
	Taekwondo: "https://img.olympicchannel.com/images/image/private/t_social_share_thumb/f_auto/primary/rerz7idjxa5vgdwoqosf",
	Tennis: "https://img.olympicchannel.com/images/image/private/t_16-9_1280/primary/rhbmgvuy8knmi7xfi0ce",
	"Long Jump": "https://pyxis.nymag.com/v1/imgs/381/6a2/2c79d107591a070a130623bf931cb7f531-juvaughn-harrison.2x.rsocial.w600.jpg",
	"High Jump": "https://cloudfront-us-east-2.images.arcpublishing.com/reuters/NYYX57HPAJMXHFCJYLJ7RF6IHQ.jpg",
	Sprint: "https://www.sportco.io/images/post/7t_1614185298.jpg",
	Shotput: "https://assets.aws.worldathletics.org/large/2f263101-6e11-451a-8fa1-f928c6b4ad75.jpg",
};

const Home = () => {
	return (
		<div className="home__view">
			<h1 className="banner-text">Welcome to Fun Olympics online.</h1>
			<h4>Choose your favorite sport and get going.</h4>

			<div className="grid">
				{["Football", "Judo", "Taekwondo", "Tennis", "Sprint", "Long Jump", "High Jump", "Shotput"].map((g) => (
					<div key={g} className="grid-sport">
						<Link to={`/${g.split(" ").join("_").toLowerCase()}/live`}>
							<div className="label">
								<h3>{g}</h3>
							</div>
						</Link>
						<div className="bg">
							<img src={backgrounds[g]} alt={g} />
						</div>
					</div>
				))}
			</div>

			{/* <div className="wrapper">
				<div className="streams">
					<div className="list">
						{_streams.map((stream, id) => (
							<div className="stream" key={stream.id + "-" + id}>
								<div className="banner">
									<img src={stream.banner} alt="Olympic sport" />
								</div>
								<div className="info">
									<h3>{stream.name}</h3>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="news">
					<h2>Latest News</h2>
					<ul className="list">
						{_news.map((article, index) => (
							<li key={index} className="news_article">
								<a href={article.url}>{article.title}</a>
							</li>
						))}
					</ul>
				</div>
			</div> */}
		</div>
	);
};

export default Home;
