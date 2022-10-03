import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { SportProvider } from "./contexts/SportContext";

import "./styles/global.css";

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<SportProvider>
					<App />
				</SportProvider>
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);
