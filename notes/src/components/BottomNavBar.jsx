import React from "react";
import { Link, NavLink } from "react-router";
import HomeIcon from "../assets/images/icon-home.svg?react";
import SearchIcon from "../assets/images/icon-search.svg?react";
import ArchiveIcon from "../assets/images/icon-archive.svg?react";
import TagIcon from "../assets/images/icon-tag.svg?react";
import SettingsIcon from "../assets/images/icon-settings.svg?react";
const BottomNavBar = () => {
	return (
		<nav
			className="fixed w-full bottom-0 h-[56px] border-t px-4 py-3 flex items-center justify-between text-n-600 dark:text-n-400
    bg-n-0 border-n-200
    dark:bg-n-950 dark:border-n-800
    md:h-[74px] md:px-8 md:py-3 md:[&>div]:w-[80px] lg:hidden
    "
		>
			{/* HomeIcon */}
			<div className="bottom-nav-link w-full">
				<NavLink to="/" className="flex flex-col items-center gap-1 bottom-navlink">
					<HomeIcon alt="home icon" className="" />
					<p className="text-6 hidden md:block ">Home</p>
				</NavLink>
			</div>
			{/* Search */}
			<div className="bottom-nav-link w-full">
				<NavLink to="/search" className="flex flex-col items-center gap-1 bottom-navlink">
					<SearchIcon
						src="../../public/images/icon-search.svg"
						alt="Search icon"
						className=""
					/>
					<p className="text-6 hidden md:block ">Search</p>
				</NavLink>
			</div>
			{/* Archived */}
			<div className="bottom-nav-link w-full">
				<NavLink to="/archived" className="flex flex-col items-center gap-1 bottom-navlink">
					<ArchiveIcon
						src="../../public/images/icon-archive.svg"
						alt="Archive icon"
						className=""
					/>
					<p className="text-6 hidden md:block ">Archived</p>
				</NavLink>
			</div>
			{/* Tags */}
			<div className="bottom-nav-link w-full">
				<NavLink to="/tags" className="flex flex-col items-center gap-1 bottom-navlink">
					<TagIcon src="../../public/images/icon-tag.svg" alt="Tags icon" className="" />
					<p className="text-6 hidden md:block ">Tags</p>
				</NavLink>
			</div>
			<div className="bottom-nav-link w-full">
				<NavLink to="/settings" className="flex flex-col items-center gap-1 bottom-navlink">
					<SettingsIcon
						src="../../public/images/icon-settings.svg"
						alt="Tags icon"
						className=""
					/>
					<p className="text-6 hidden md:block ">Settings</p>
				</NavLink>
			</div>
		</nav>
	);
};

export default BottomNavBar;
