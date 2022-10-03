import axios from "axios";

const ax = axios.create({});

export const fetchSportList = () => ax.get("/api/sports");
