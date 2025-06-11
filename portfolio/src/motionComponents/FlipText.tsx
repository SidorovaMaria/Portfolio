import { motion } from "motion/react";
const DURATION = 0.25;
const STAGGER = 0.03;
interface FlipTextProps {
	children: string;
	href?: string;
	className?: string;
}
const FlipText = ({ children, href, className }: FlipTextProps) => {
	return (
		<motion.a
			aria-hidden
			initial="initial"
			whileHover="hovered"
			href={href}
			className={`relative block overflow-hidden whitespace-nowrap cursor-pointer  ${className}`}
			style={{
				lineHeight: 0.75,
			}}
		>
			<div>
				{children.split("").map((l, i) => (
					<motion.span
						variants={originalText}
						transition={{
							duration: DURATION,
							ease: "easeInOut",
							delay: STAGGER * i,
						}}
						className="inline-block"
						key={i}
					>
						{l === " " ? "\u00A0" : l}
					</motion.span>
				))}
			</div>
			<div className="absolute inset-0">
				{children.split("").map((l, i) => (
					<motion.span
						variants={hoveredText}
						transition={{
							duration: DURATION,
							ease: "easeInOut",
							delay: STAGGER * i,
						}}
						className="inline-block text-coffe-light"
						key={i}
					>
						{l === " " ? "\u00A0" : l}
					</motion.span>
				))}
			</div>
		</motion.a>
	);
};

export default FlipText;
const originalText = {
	initial: {
		y: 0,
	},
	hovered: {
		y: "-100%",
	},
};

const hoveredText = {
	initial: {
		y: "100%",
	},
	hovered: {
		y: 0,
	},
};
