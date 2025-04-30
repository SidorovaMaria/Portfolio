import React from "react";
// eslint-disable-next-line no-unused-vars
import { delay, motion } from "motion/react";
import { useIsDesktop } from "../app/hooks";
const LeftSide = ({ children, className, disableInitialAnimation }) => {
	const isDesktop = useIsDesktop();
	const LeftSideVariant = {
		desktopInitial: {
			opacity: 0,
			y: 20,
		},
		initial: {
			opacity: 0,
			x: -375,
		},
		show: {
			x: 0,
			opacity: 1,
			transition: {
				delay: 0.3,
				type: "tween",
				duration: 0.3,
			},
		},
		showDesktop: {
			y: 0,
			opacity: 1,
			transition: {
				type: "tween",
				duration: 0.3,
			},
		},
		exit: {
			opacity: 0,
			x: -375,
			transition: {
				type: "tween",
				duration: 0.3,
			},
		},
	};

	return (
		<motion.section
			className={`py-5 px-4 flex flex-col gap-4 md:px-8 md:py-6 lg:py-5 lg:pl-8 lg:pr-4 w-full lg:w-[290px] ${className}`}
			initial={
				isDesktop
					? "desktopInitial"
					: !disableInitialAnimation
					? "desktopInitial"
					: "initial"
			}
			animate={isDesktop ? "showDesktop" : !disableInitialAnimation ? "showDesktop" : "show"}
			exit={"exit"}
			variants={LeftSideVariant}
		>
			{children}
		</motion.section>
	);
};

export default LeftSide;
