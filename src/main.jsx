import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { HighlightsProvider } from "./contexts/HighlightsContext";
import { NewsProvider } from "./contexts/NewsContext";
import { SportProvider } from "./contexts/SportContext";

import "./styles/global.css";

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<SportProvider>
					<NewsProvider>
						<HighlightsProvider>
							<App />
						</HighlightsProvider>
					</NewsProvider>
				</SportProvider>
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);
