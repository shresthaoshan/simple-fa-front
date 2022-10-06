import { useContext } from "react";
import blogContext from "../contexts/BlogContext";

export const useBlog = () => useContext(blogContext);
