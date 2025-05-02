import React, { useEffect } from "react";
import LogoIcon from "../assets/images/logo.svg?react";
import SettingIcon from "../assets/images/icon-settings.svg?react";
import SearchIcon from "../assets/images/icon-search.svg?react";
import { Link, useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { clearSearch, setSearchQuery } from "../redux/notesSlice";
const TopBar = ({ title }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { searchQuery } = useSelector((state) => state.notes);
	const location = useLocation();
	useEffect(() => {
		if (location.pathname !== "/search") {
			dispatch(clearSearch());
		}
	}, [location.pathname, dispatch]);

	return (
		<header className="flex items-center justify-bwtween dark:bg-n-800 bg-n-100 h-[54px] px-3 py-4 w-full lg:w-[calc(100vw-272px)] md:h-[74px] md:px-8  lg:h-[81px] lg:px-8 lg:bg-transparent! lg:border-b  border-b-n-200 dark:lg:border-b-n-800 fixed top-0 ">
			<LogoIcon className="lg:hidden" />
			<div className="hidden lg:flex items-center justify-between w-full">
				<h1 className="text-1">{title}</h1>
				{/* Search and Settongs */}
				<div className="flex items-center gap-4">
					<div
						className="flex min-w-[300px] gap-2 px-4 text-5 py-3 border rounded-8 border-n-300 dark:border-n-600 placeholder:text-n-500
                                                        hover:bg-n-50 dark:hover:bg-n-800
                                                    has-focus:border-n-950 dark:has-focus:border-n-600 has-focus:outline-offset-2 has-focus:outline-2 has-focus:outline-n-500 dark:has-focus:outline-n-600 "
						onFocus={() => {
							navigate("/search");
						}}
					>
						<SearchIcon />
						<input
							type="text"
							placeholder="Search by title, content, or tags…"
							value={searchQuery}
							onChange={(e) => dispatch(setSearchQuery(e.target.value))}
							className="outline-none flex-1"
						/>
					</div>

					<Link
						to="/settings"
						className="w-10.5 h-10.5 flex items-center justify-center group"
					>
						<SettingIcon className="text-n-950 group-hover:text-blue-500" />
					</Link>
				</div>
			</div>
		</header>
	);
};

export default TopBar;
