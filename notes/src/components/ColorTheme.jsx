import React from "react";
import { useDispatch, useSelector } from "react-redux";
import LightModeIcon from "../assets/images/icon-sun.svg?react";
import DarkModeIcon from "../assets/images/icon-moon.svg?react";
import ArrowLeftIcon from "../assets/images/icon-arrow-left.svg?react";
import SystemThemeIcon from "../assets/images/icon-system-theme.svg?react";
import { setTheme } from "../redux/themeSlice";
import SettingsBtn from "./SettingsBtn";

import toast from "react-hot-toast";
import CustomToast from "./CustomToast";

const ColorTheme = ({ unselect }) => {
	const { theme } = useSelector((state) => state.theme);
	const dispatch = useDispatch();

	const setPickedTheme = (newTheme) => {
		if (theme === newTheme) return;
		dispatch(setTheme(newTheme));
		toast.custom((t) => <CustomToast t={t} message={`Changed theme to ${newTheme}`} />);
	};
	return (
		<React.Fragment>
			<div
				className="flex gap-1 text-n-600 dark:text-n-300 items-center lg:hidden mb-3"
				onClick={unselect}
			>
				<ArrowLeftIcon className="w-4.5 h-4.5" />
				<p className="text-5 cursor-pointer dark:">Settings</p>
			</div>
			<div className="flex lg:gap-1 gap-2 flex-col w-full">
				<h2 className="text-1 lg:text-base lg:tracking-[-0.3px] lg:font-semibold">
					Color Theme{" "}
				</h2>
				<p className="text-5 text-n-700 dark:text-n-300">Choose your color theme:</p>
				<SettingsBtn
					icon={<LightModeIcon />}
					title="Light Mode "
					intro="Pick a clean and classic light theme"
					onClick={() => setPickedTheme("light")}
					selected={theme === "light"}
					name={"color"}
					id={"theme-color-light"}
				/>
				<SettingsBtn
					icon={<DarkModeIcon />}
					title="Dark Mode"
					intro="Select a sleek and modern dark theme"
					onClick={() => setPickedTheme("dark")}
					selected={theme === "dark"}
					name={"color"}
					id={"theme-color-dark"}
				/>
				<SettingsBtn
					icon={<SystemThemeIcon />}
					title="System"
					intro="Code-like, great for a technical vibe."
					onClick={() => setPickedTheme("system")}
					selected={theme === "system"}
					name={"font"}
					id={"theme-system"}
				/>
			</div>
		</React.Fragment>
	);
};

export default ColorTheme;
