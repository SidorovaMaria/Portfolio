import React, { useEffect } from "react";
import { Outlet, useLocation, useOutlet } from "react-router";
import BottomNavBar from "./components/BottomNavBar";
import DesktopSideBar from "./components/DesktopSideBar";
import TopBar from "./components/TopBar";
import { useDispatch, useSelector } from "react-redux";
import { loadNotes } from "./redux/notesSlice";
import { AnimatePresence } from "motion/react";

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
	const element = useOutlet();

	return (
		<main className="flex">
			<DesktopSideBar />

			<div className="flex flex-col w-full mt-[54px] md:mt-[74xp lg:mt-[81px] mb-[56px] md:mb-[74px] lg:mb-0 ">
				<TopBar title={title} />
				<AnimatePresence mode="wait" initial={true}>
					{element && React.cloneElement(element, { key: location.pathname })}
				</AnimatePresence>
			</div>

			<BottomNavBar />
		</main>
	);
};

export default Layout;
