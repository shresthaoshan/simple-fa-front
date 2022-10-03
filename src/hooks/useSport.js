import { useContext } from "react";
import sportContext from "../contexts/SportContext";

export const useSport = () => useContext(sportContext);
