import { createContext, useEffect, useState } from "react";
import * as blogApi from "../api/blog.api";

const blogContext = createContext({
	blogs: { list: [], loading: false, error: "" },
	fetchBlogs: () => {},
	setBlogError: () => {},
});

export const BlogProvider = ({ children }) => {
	const [blogs, setBlog] = useState({
		list: [],
		loading: false,
		error: "",
	});

	const setBlogError = (error = "") =>
		setBlog((prev) => ({
			...prev,
			error,
		}));

	const fetchBlogs = async (sport_id = "") => {
		setBlog((prev) => ({ ...prev, loading: true }));
		try {
			const { data } = await blogApi.fetchBlogList(sport_id);
			console.log({ blogApi: data });
			setBlog({
				loading: false,
				list: data,
				error: "",
			});
		} catch (error) {
			console.log({ error });
			setBlog({
				loading: false,
				list: [],
				error: error.response.data.error || error.response.data.detail || "Something went wrong.",
			});
		}
	};

	useEffect(() => {
		if (!blogs.list.length) fetchBlogs();
	}, [blogs.list.length]);

	return <blogContext.Provider value={{ fetchBlogs, setBlogError, blogs }}>{children}</blogContext.Provider>;
};

export default blogContext;
