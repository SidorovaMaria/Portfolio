/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import { ReactSVG } from "react-svg";
import FlipLink from "./texts/FlipLink";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "motion/react";

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

const TechStackCard = ({ iconSrc, title }) => {
	const ref = useRef(null);

	// 3D tilt motion values
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const xSpring = useSpring(x, { stiffness: 100, damping: 15 });
	const ySpring = useSpring(y, { stiffness: 100, damping: 15 });
	const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

	// Circle position
	const circleLeft = useMotionValue("50%");
	const circleTop = useMotionValue("50%");
	const circleLeftSpring = useSpring(circleLeft, {
		stiffness: 100,
		damping: 15,
	});
	const circleTopSpring = useSpring(circleTop, {
		stiffness: 100,
		damping: 15,
	});

	const handleMouseMove = (e) => {
		if (!ref.current) return;

		const rect = ref.current.getBoundingClientRect();
		const mouseX = e.clientX - rect.left;
		const mouseY = e.clientY - rect.top;

		// Circle movement
		const left = `${(mouseX / rect.width) * 100}%`;
		const top = `${(mouseY / rect.height) * 100}%`;
		circleLeft.set(left);
		circleTop.set(top);

		// 3D tilt
		const rX = ((mouseY / rect.height) * ROTATION_RANGE - HALF_ROTATION_RANGE) * -1;
		const rY = (mouseX / rect.width) * ROTATION_RANGE - HALF_ROTATION_RANGE;

		x.set(rX);
		y.set(rY);
	};

	const handleMouseLeave = () => {
		x.set(0);
		y.set(0);
		circleLeft.set("50%");
		circleTop.set("50%");
	};

	return (
		<motion.div
			ref={ref}
			style={{
				transformStyle: "preserve-3d",
				transform,
			}}
			initial={"initial"}
			whileHover={"hovered"}
			variants={TechCard}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			className="relative backdrop-blur-sm w-[25vw] h-1/2 rounded-2xl flex flex-col gap-4 items-center justify-center"
		>
			<div
				style={{
					transform: "translateZ(75px)",
					transformStyle: "preserve-3d",
				}}
				className="absolute backdrop-blur-3xl flex flex-col gap-4 items-center w-3/4 h-3/4 justify-center rounded-xl shadow-[0px_0px_50px_10px] shadow-background"
			>
				<ReactSVG
					src={iconSrc}
					beforeInjection={(svg) => {
						svg.classList.add(
							"w-[7vw]",
							"h-auto",
							"fill-background",
							"mix-blend-plus-lighter"
						);
					}}
				/>
				<FlipLink className="mix-blend-plus-lighter">{title}</FlipLink>

				{/* Mouse-following circle */}
				<motion.span
					style={{
						left: circleLeftSpring,
						top: circleTopSpring,
					}}
					className="pointer-events-none absolute h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial from-primary/0 to-65% to-white/50 blur-sm -z-10"
				/>
			</div>
		</motion.div>
	);
};

export default TechStackCard;
const TechCard = {
	initial: {
		borderWidth: 0,
	},
	hovered: {
		borderWidth: "4px",
	},
};
