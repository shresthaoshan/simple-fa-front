import axios from "axios";

const ax = axios.create({});

export const fetchHighlights = (sport_id = "") => ax.get(`/api/highlights?sport_id=${sport_id}`);
