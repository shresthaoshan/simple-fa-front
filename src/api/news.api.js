import axios from "axios";

const ax = axios.create({});

export const fetchNewsList = () => ax.get("/api/news");
