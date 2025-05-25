"use client";

import { useMediaQuery } from "react-responsive";

const NavBar = () => {
	const isDesktop = useMediaQuery({
		query: "(min-width: 1024px)",
	});
	if (isDesktop) {
		return null; // Hide the NavBar on mobile devices
	}
	return <nav className="bg-gray-800 text-white p-4"></nav>;
};

export default NavBar;
