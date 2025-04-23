import React from "react";
import { motion } from "motion/react";
import { ReactSVG } from "react-svg";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/themeSlice";

const ThemeToggle = () => {
	const dispatch = useDispatch();
	const theme = useSelector((state) => state.theme);
	const isDark = theme.value === "dark";
	return (
		<div className="flex items-center justify-center dark:bg-very-dark-grey ml-4 py-4 gap-6 rounded-[6px] ">
			<div>
				<ReactSVG
					aria-label="Light Theme"
					alt="Light Theme"
					src="/assets/icon-light-theme.svg"
					className="fill-purple dark:fill-medium-grey"
				/>
			</div>
			<button
				aria-label="Toggle Theme"
				className="w-10 h-5 rounded-12 bg-purple cursor-pointer flex p-[3px] not-dark:hover:opacity-50 dark:hover:brightness-150"
				style={{
					justifyContent: "flex-" + (isDark ? "end" : "start"),
				}}
				onClick={() => dispatch(toggleTheme())}
			>
				<motion.div
					layout
					className="w-[14px] h-[14px] rounded-full bg-white"
					transition={{
						type: "spring",
						visualDuration: 0.2,
						bounce: 0.2,
					}}
				/>
			</button>
			<div>
				<ReactSVG
					aria-label="Dark Theme"
					alt="Dark Theme"
					src="/assets/icon-dark-theme.svg"
					className="fill-medium-grey dark:fill-purple"
				/>
			</div>
		</div>
	);
};

export default ThemeToggle;
