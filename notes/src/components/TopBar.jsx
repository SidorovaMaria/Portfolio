import React from "react";
import LogoIcon from "../assets/images/logo.svg?react";
const TopBar = ({ title }) => {
	return (
		<header className="flex items-center justify-bwtween dark:bg-n-800 bg-n-100 h-[54px] px-3 py-4 w-full md:h-[74px] md:px-8 md:px-4 lg:h-[81px] lg:px-8 lg:bg-transparent! lg:border-b  border-b-n-200 dark:lg:border-b-n-800">
			<LogoIcon className="lg:hidden" />
			<div className="hidden lg:flex items-center justify-between w-full">
				<h1 className="text-1">{title}</h1>
			</div>
		</header>
	);
};

export default TopBar;
