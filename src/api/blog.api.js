import axios from "axios";

const ax = axios.create({});

export const fetchBlogList = (sport_id) => ax.get(`/api/blogs?sport_id=${sport_id}`);
