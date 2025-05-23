import { useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { motion } from "motion/react";
import TechStackCard from "./TechStackCard";
import MovingText from "./texts/MovingText";
import AnimatedText from "./texts/AnimatedText";

const TechStack = () => {
	const targetRef = useRef();
	const { scrollYProgress } = useScroll({
		target: targetRef,
	});
	const x = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);

	return (
		<section
			id="aboutme"
			ref={targetRef}
			className="relative h-[150vh] bg-[url('/images/tech-stack-bg.avif')] bg-[center] bg-no-repeat bg-transparent "
			aria-labelledby="tech-stack"
		>
			<div className="sticky top-[110px] left-0 flex flex-col justify-around h-[calc(100vh-110px)] items-center overflow-hidden bg-primary/50 backdrop-brightness-150 dark:backdrop-brightness-50 text-background">
				<AnimatedText
					text="TechStack"
					className="absolute top-1/12 text-[80px] font-teko-bold"
					once
					el="h1"
				/>
				<motion.div
					style={{ x }}
					className="flex gap-20 h-[95%] items-center justify-start "
				>
					{TechStackCards.map((card) => (
						<TechStackCard iconSrc={card.iconSrc} title={card.title} key={card.title} />
					))}
				</motion.div>
				<p className="absolute bottom-1/12 text-3xl font-teko-semibold text-center max-w-3/4">
					I am always open to learning new technologies and frameworks! And I am currently
					learning TypeScript and Next.js.
				</p>
			</div>
		</section>
	);
};

export default TechStack;

const TechStackCards = [
	{
		iconSrc: "/icons/html.svg",
		title: "HTML",
	},
	{
		iconSrc: "/icons/css.svg",
		title: "CSS",
	},
	{
		iconSrc: "/icons/js.svg",
		title: "JavaScript",
	},
	{
		iconSrc: "/icons/react.svg",
		title: "React",
	},
	{
		iconSrc: "/icons/redux.svg",
		title: "Redux",
	},
	{
		iconSrc: "/icons/tailwind.svg",
		title: "TailwindCSS",
	},
	{
		iconSrc: "/icons/motiondev.svg",
		title: "motion.dev",
	},
	{
		iconSrc: "/icons/shadcn.svg",
		title: "Shadcn",
	},
];
