import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./themeContext";

const ThemeToggle = () => {
	const { setTheme } = useTheme();

	return (
		<div className="flex items-center gap-1 relative">
			<Sun
				className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 not-dark:hover:text-accent not-dark:hover:scale-150"
				title={"Switch to dark Mode"}
				onClick={() => setTheme("dark")}
			/>
			<Moon
				className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 dark:hover:text-accent dark:hover:scale-150"
				title={"Switch to Light Mode"}
				onClick={() => setTheme("light")}
			/>
		</div>
	);
};

export default ThemeToggle;
