import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import BottomNavBar from "./components/BottomNavBar";
import DesktopSideBar from "./components/DesktopSideBar";
import TopBar from "./components/TopBar";
import { useDispatch, useSelector } from "react-redux";
import { loadNotes } from "./redux/notesSlice";

const Layout = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	useEffect(() => {
		if (user) {
			dispatch(loadNotes());
		}
	}, [user, dispatch]);

	const { pathname } = location;

	let title = "";

	if (pathname.startsWith("/tags/")) {
		const tag = decodeURIComponent(pathname.split("/tags/")[1]);
		const capitalizedTag = tag.charAt(0).toUpperCase() + tag.slice(1);
		title = `Notes Tagged: ${capitalizedTag}`;
	} else {
		const titles = {
			"/": "All Notes",
			"/tags": "Notes Tagged:",
			"/settings": "Settings",
			"/search": "Search",
			"/archived": "Archived Notes",
		};
		title = titles[pathname] || "";
	}

	return (
		<main className="flex">
			<DesktopSideBar />

			<div className="flex flex-col w-full">
				<TopBar title={title} />
				<Outlet />
			</div>

			<BottomNavBar />
		</main>
	);
};

export default Layout;
