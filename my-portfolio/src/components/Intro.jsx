import React from "react";
import { ReactSVG } from "react-svg";
import { motion, useMotionValue, useTransform } from "framer-motion";
import AnimatedText from "./texts/AnimatedText";
const Intro = () => {
	const x = useMotionValue(200);
	const y = useMotionValue(200);
	const rotateX = useTransform(y, [0, 400], [10, -10]);
	const rotateY = useTransform(x, [0, 400], [10, -10]);
	const rotateXOutline = useTransform(y, [0, 400], [-10, 10]);
	const rotateYOutline = useTransform(x, [0, 400], [-10, 10]);
	function handleMouse(event) {
		const rect = event.currentTarget.getBoundingClientRect();
		x.set(event.clientX - rect.left);
		y.set(event.clientY - rect.top);
	}

	function handleMouseLeave() {
		x.set(200); // Reset to center
		y.set(200);
	}
	return (
		<motion.div
			onMouseMove={handleMouse}
			onMouseLeave={handleMouseLeave}
			className="grid lg:grid-cols-[2fr_3fr] gap-x-20 md:grid-cols-1"
		>
			<motion.div
				className="relative p-6"
				initial="hidden"
				animate="visible"
				variants={IntroProfile}
			>
				<motion.div className="relative flex items-center justify-center perspective-[400px] p-10 w-fit ">
					<motion.div
						className="z-50"
						style={{
							rotateX,
							rotateY,
						}}
					>
						<ReactSVG src="../../public/images/profile-img.svg" />
					</motion.div>
					<motion.div
						className="absolute"
						style={{
							rotateX: rotateXOutline,
							rotateY: rotateYOutline,
						}}
					>
						<ReactSVG
							src="../../public/images/profile-outline.svg"
							className="fill-text dark:fill-dark-text "
						/>
					</motion.div>
					<div className="w-60 h-60 absolute rounded-full shadow-[0px_0px_60px_50px_#212a31] dark:shadow-[0px_0px_60px_50px_#d3d9d4]"></div>
				</motion.div>
			</motion.div>
			<motion.div initial="hidden" animate="visible" variants={IntroText}>
				<article className="flex flex-col gap-4">
					<h1 className="text-[64px] leading-18 font-teko-semibold">
						<AnimatedText text={["HI, I am Maria"]}></AnimatedText>
						<AnimatedText
							delay={1.5}
							text="a Front-End Developer who brings designs to life"
							className="text-right"
						/>
						<span className="block text-right"></span>
					</h1>
					<hr className="border-text dark:border-dark-text border-2 rounded-full" />
					<p className="text-[26px] tracking-wide leading-8 font-teko-light">
						I’m passionate about transforming visual ideas into
						seamless, interactive web experiences. I love front-end
						development because it lets me combine logic and
						creativity — especially when it comes to building
						polished UIs with creative animations and smooth
						interactions.
					</p>
				</article>
			</motion.div>
		</motion.div>
	);
};

export default Intro;
const IntroText = {
	hidden: {
		opacity: 0,
		x: 200,
	},
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			type: "spring",
			duration: 1.5,
			bounce: 0.5,
		},
	},
};
const IntroProfile = {
	hidden: {
		opacity: 0,
		x: -200,
	},
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			type: "spring",
			duration: 1.5,
			bounce: 0.5,
		},
	},
};
