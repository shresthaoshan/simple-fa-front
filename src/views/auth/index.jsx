import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const AuthView = () => {
	const { isLoggedIn } = useAuth();

	return !isLoggedIn ? <Outlet /> : <Navigate to="/" replace={true} />;
};

export default AuthView;
