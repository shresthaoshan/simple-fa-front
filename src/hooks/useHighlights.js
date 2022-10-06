import { useContext } from "react";
import highlightsContext from "../contexts/HighlightsContext";

export const useHighlights = () => useContext(highlightsContext);
