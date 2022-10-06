import { useContext } from "react";
import newsContext from "../contexts/NewsContext";

export const useNews = () => useContext(newsContext);
