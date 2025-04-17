import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const AnimatedText = ({ text, el, className, once = false, repeatDelay }) => {
	const controls = useAnimation();
	const textArray = Array.isArray(text) ? text : [text];
	const ref = useRef(null);
	const isInView = useInView(ref, { amount: 0.5, once: once });
	useEffect(() => {
		let interval;
		const show = () => {
			controls.start("visible");
			if (repeatDelay) {
				interval = setInterval(async () => {
					await controls.start("hidden");
					controls.start("visible");
				}, repeatDelay * 2);
			}
		};
		if (isInView) {
			show();
		} else {
			controls.start("hidden");
		}
		return () => clearInterval(interval);
	}, [isInView]);

	return (
		<div className={className}>
			<span className="sr-only">{text}</span>
			<motion.span
				ref={ref}
				aria-hidden
				initial="hidden"
				animate={controls}
				transition={{
					staggerChildren: 0.1,
				}}
			>
				{textArray.map((line, index) => (
					<span className="block cursor-pointer" key={`${index}-line`}>
						{line.split(" ").map((word, index) => (
							<span
								className="inline-block hover:-translate-y-2 hover:text-accent! transition-all under-line"
								key={`${index}-word`}
							>
								{word.split("").map((char, index) => (
									<motion.span
										className="inline-block"
										variants={defaultAnimations}
										key={`${index}-letter`}
									>
										{char}
									</motion.span>
								))}
								<span className="inline-block">&nbsp;</span>
							</span>
						))}
					</span>
				))}
			</motion.span>
		</div>
	);
};

export default AnimatedText;
const defaultAnimations = {
	hidden: {
		opacity: 0,
		x: 30,
	},
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			type: "spring",
			duration: 1.5,
			bounce: 0.4,
		},
	},
};
