import React from "react";
// eslint-disable-next-line no-unused-vars
import { delay, motion } from "motion/react";
import { useIsDesktop } from "../app/hooks";
const RightSide = ({ children, keyModal }) => {
	const isDesktop = useIsDesktop();
	const rightSideVariant = {
		initial: {
			x: 375,
			opacity: 0,
			transition: {
				type: "tween",
				duration: 0.3,
			},
		},
		initialDesktop: {
			y: 20,
			opacity: 0,
			transition: {
				type: "tween",
				duration: 0.3,
			},
		},
		show: {
			x: 0,
			opacity: 1,
			transition: {
				type: "tween",
				duration: 0.3,
				delay: 0.4,
			},
		},
		showDesktop: {
			y: 0,
			opacity: 1,
			transition: {
				type: "spring",
				stiffness: 100,
				damping: 20,
			},
		},
		exit: {
			x: 375,
			opacity: 0,
			transition: {
				type: "tween",
				duration: 0.3,
			},
		},
	};
	return (
		<motion.section
			key={keyModal}
			initial={isDesktop ? "initialDesktop" : "initial"}
			animate={isDesktop ? "showDesktop" : "show"}
			exit={isDesktop ? "" : "exit"}
			variants={rightSideVariant}
			className={`
    flex flex-col gap-3 px-4 py-5 rounded-12 md:px-8 md:py-6 lg:px-6 lg:py-5 lg:w-[588px] w-full `}
		>
			{children}
		</motion.section>
	);
};

export default RightSide;
