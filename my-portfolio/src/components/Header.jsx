import React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import ThemeToggle from "./themetoggle/ThemeToggle";
import FlipLink from "./texts/FlipLink";

const Header = () => {
	const { scrollY } = useScroll();
	const height = useTransform(scrollY, [0, 110], [150, 110]);

	return (
		<motion.div
			style={{
				height,
			}}
			initial="hidden"
			animate="show"
			variants={header}
			id="header"
			className="flex w-full h-1/12  justify-between items-center fixed top-0 left-0 px-10 z-50 bg-background/80 dark:bg-dark-background/80"
		>
			<h1 className="uppercase font-teko-bold tracking-widest text-5xl">
				<FlipLink href="#">Maria Sidorova</FlipLink>
			</h1>
			<div className="flex items-center gap-8">
				<nav>
					<ul className="uppercase text-3xl flex items-center gap-8 tracking-wider font-teko-semibold ">
						<li className="hover:text-accent ">
							<FlipLink href="#aboutme">About Me</FlipLink>
						</li>
						<li className="hover:text-accent ">
							<FlipLink href="#projects">Projects</FlipLink>
						</li>
						<li className="hover:text-accent ">
							<FlipLink href="#contactme">Contact me</FlipLink>
						</li>
					</ul>
				</nav>

				<ThemeToggle />
			</div>
		</motion.div>
	);
};

export default Header;
const header = {
	hidden: {
		y: -200,
		opacity: 0,
	},
	show: {
		y: 0,
		opacity: 1,
		transition: {
			type: "spring",
			duration: 1.5,
			bounce: 0.4,
		},
	},
};
