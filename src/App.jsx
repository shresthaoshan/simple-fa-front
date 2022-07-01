import { useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import AppRoutes from "./routes";

function App() {
	const { refreshToken } = useAuth();

	useEffect(() => {
		refreshToken()
	}, []);

	return (
		<>
			<AppRoutes />
		</>
	);
}

export default App;
