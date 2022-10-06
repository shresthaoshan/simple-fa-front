import { createContext, useEffect, useState } from "react";
import * as newsApi from "../api/news.api";

const newsContext = createContext({
	news: { list: [], loading: false, error: "" },
	fetchNews: () => {},
	setNewsError: () => {},
});

export const NewsProvider = ({ children }) => {
	const [news, setNews] = useState({
		list: [],
		loading: false,
		error: "",
	});

	const setNewsError = (error = "") =>
		setNews((prev) => ({
			...prev,
			error,
		}));

	const fetchNews = async () => {
		setNews((prev) => ({ ...prev, loading: true }));
		try {
			const { data } = await newsApi.fetchNewsList();
			console.log({ newsData: data });
			setNews({
				loading: false,
				list: data,
				error: "",
			});
		} catch (error) {
			console.log({ error });
			setNews({
				loading: false,
				list: [],
				error: error.response.data.error || error.response.data.detail || "Something went wrong.",
			});
		}
	};

	useEffect(() => {
		if (!news.list.length) fetchNews();
	}, [news.list.length]);

	return <newsContext.Provider value={{ fetchNews, setNewsError, news }}>{children}</newsContext.Provider>;
};

export default newsContext;
