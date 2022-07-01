import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig((confEnv) => {
	const isDev = confEnv.mode === "development";
	return {
		plugins: [
			react({
				fastRefresh: true,
			}),
		],
		base: "./",
		publicDir: "./public",
		envDir: "./",
		server: {
			proxy: {
				"/api": {
					target: isDev ? "http://localhost:8000" : "",
					changeOrigin: true,
					// rewrite: (path) => path.replace(/^\/api/, ""),
				},
			},
		},
	};
});
