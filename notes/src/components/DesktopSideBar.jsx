import React from "react";
import LogoIcon from "../assets/images/logo.svg?react";
import HomeIcon from "../assets/images/icon-home.svg?react";
import ArchiveIcon from "../assets/images/icon-archive.svg?react";
import TagIcon from "../assets/images/icon-tag.svg?react";
import { NavLink } from "react-router";
import { useSelector } from "react-redux";
const DesktopSideBar = () => {
	const { tags } = useSelector((state) => state.notes);

	return (
		<nav className="hidden lg:flex h-screen min-w-[272px] px-4 py-3 flex-col gap-4 border-r border-r-n-200 dark:border-r-n-800 sticky top-0">
			<div className="w-full py-3">
				<LogoIcon />
			</div>
			<div className="flex flex-col gap-2">
				<ul className="flex flex-col gap-1">
					<li className="has-[.active]:text-blue-500 dark:has-[.active]:bg-n-800 rounded-8 t">
						<NavLink
							to="/"
							className="flex px-3 py-2.5 rounded-8 gap-2 items-center overflow-hidden arrow-right"
						>
							<HomeIcon />
							<p className="text-4 text-n-950 dark:text-n-0">All Notes</p>
						</NavLink>
					</li>
					<li className="has-[.active]:text-blue-500 dark:has-[.active]:bg-n-800 rounded-8 t">
						<NavLink
							to="/archived"
							className="flex px-3 py-2.5 rounded-8 gap-2 items-center overflow-hidden arrow-right"
						>
							<ArchiveIcon />
							<p className="text-4 text-n-950 dark:text-n-0">Archived Notes</p>
						</NavLink>
					</li>
				</ul>
				<hr className="border-n-200 dark:border-n-800 w-full" />
				<p className="text-4 text-n-500">Tags</p>
				<ul className="flex flex-col gap-1">
					{tags.map((tag) => (
						<li
							key={tag.id}
							className="has-[.active]:text-blue-500 dark:has-[.active]:bg-n-800 has-[.active]:bg-n-200 rounded-8 t"
						>
							<NavLink
								to={`/tags/${tag.id}`}
								className="flex px-3 py-2.5 rounded-8 gap-2 items-center overflow-hidden arrow-right"
							>
								<TagIcon />
								<p className="text-4 text-n-950 dark:text-n-0">{tag.name}</p>
							</NavLink>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
};

export default DesktopSideBar;
