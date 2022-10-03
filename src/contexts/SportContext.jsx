import { createContext, useState } from "react";
import * as sportsApi from "../api/sports.api";

const sportContext = createContext({
	sports: {},
	fetchSports: () => {},
	setSportError: () => {},
});

export const SportProvider = ({ children }) => {
	const [sports, setSports] = useState({
		list: [],
		loading: false,
		error: "",
	});

	const setSportError = (error = "") =>
		setSports((prev) => ({
			...prev,
			error,
		}));

	const fetchSports = async () => {
		setSports((prev) => ({ ...prev, loading: true }));
		try {
			const { data } = await sportsApi.fetchSportList();
			console.log({ sportsData: data });
			setSports({
				loading: false,
				list: data,
				error: "",
			});
		} catch (error) {
			console.log({ error });
			setSports({
				loading: false,
				list: [],
				error: error.response.data.error || error.response.data.detail || "Something went wrong.",
			});
		}
	};

	return <sportContext.Provider value={{ fetchSports, setSportError, sports }}>{children}</sportContext.Provider>;
};


export default sportContext