import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";

const NormalView = () => {
	return (
		<>
			<Navbar />
			<div style={{ marginTop: 70 }}>
				<Outlet />
			</div>
		</>
	);
};

export default NormalView;
