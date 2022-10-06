import { createContext, useEffect, useState } from "react";
import * as highlightsApi from "../api/highlights.api";

const highlightsContext = createContext({
	highlights: { list: [], loading: false, error: "" },
	fetchHighlights: (sport_id = "") => {},
	setHighlightError: () => {},
});

export const HighlightsProvider = ({ children }) => {
	const [highlights, setHighlights] = useState({
		list: [],
		loading: false,
		error: "",
	});

	const setHighlightError = (error = "") =>
		setHighlights((prev) => ({
			...prev,
			error,
		}));

	const fetchHighlights = async (sport_id) => {
		setHighlights((prev) => ({ ...prev, loading: true }));
		try {
			const { data } = await highlightsApi.fetchHighlights(sport_id);
			if (data.length) {
				console.log({ highlightsData: data });
				setHighlights({
					loading: false,
					list: data,
					error: "",
				});
			}
		} catch (error) {
			console.log({ error });
			setHighlights({
				loading: false,
				list: [],
				error: error.response.data.error || error.response.data.detail || "Something went wrong.",
			});
		}
	};

	useEffect(() => {
		if (!highlights.list.length) fetchHighlights();
	}, [highlights.list.length]);

	return <highlightsContext.Provider value={{ fetchHighlights, setHighlightError, highlights }}>{children}</highlightsContext.Provider>;
};

export default highlightsContext;