/* eslint-disable no-unused-vars */
import {
	useAnimationFrame,
	useMotionValue,
	useScroll,
	useSpring,
	useTransform,
	useVelocity,
	motion,
} from "motion/react";
import React, { useRef } from "react";
import { wrap } from "@motionone/utils";

const ParallalText = ({ baseVelocity = 100, children }) => {
	const baseX = useMotionValue(0);
	const { scrollY } = useScroll();
	const scrollVelocity = useVelocity(scrollY);
	const smoothVelocity = useSpring(scrollVelocity, {
		damping: 50,
		stiffness: 400,
	});
	const velocityFactor = useTransform(smoothVelocity, [0, 2000], [0, 10], {
		clamp: false,
	});
	const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
	const directionFactor = useRef(1);
	useAnimationFrame((t, delta) => {
		let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
		if (velocityFactor.get() < 0) {
			directionFactor.current = -1;
		} else if (velocityFactor.get() > 0) {
			directionFactor.current = 1;
		}

		moveBy += directionFactor.current * moveBy * velocityFactor.get();

		baseX.set(baseX.get() + moveBy);
	});
	return (
		<div className="overflow-hidden tracking-widest m-0 flex flex-nowrap ">
			<motion.div className="whitespace-nowrap flex-nowrap flex gap-0" style={{ x }}>
				<span>{children} </span>
				<span>{children} </span>
				<span>{children} </span>
				<span>{children} </span>
				<span>{children} </span>

				<span>{children} </span>
				<span>{children} </span>
				<span>{children} </span>

				<span>{children} </span>
				<span>{children} </span>
				<span>{children} </span>
			</motion.div>
		</div>
	);
};

export default ParallalText;
