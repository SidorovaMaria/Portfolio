import { useEffect } from "react";
import { motion } from "motion/react";

const Loader = ({ setLoading }) => {
	const draw = {
		hidden: { pathLength: 0, opacity: 0, fill: "transparent" },
		visible: (i) => {
			const delay = i * 0.5;
			return {
				pathLength: 1,
				opacity: 1,
				transition: {
					pathLength: {
						delay,
						type: "spring",
						duration: 2.0,
						bounce: 0,
					},
					opacity: { delay, duration: 0.01 },
				},
			};
		},
	};

	const loaderVariants = {
		hidden: { opacity: 0, y: 200 },
		show: {
			opacity: 1,
			y: 0,
			transition: {
				type: "spring",
				duration: 1,
			},
		},
		exit: {
			opacity: 0,
			scale: 0.5,
			transition: {
				duration: 0.5,
			},
		},
	};

	return (
		<motion.div
			className="absolute inset-0 flex items-center justify-center bg-background dark:bg-dark-background"
			initial="hidden"
			animate="show"
			exit="exit"
			variants={loaderVariants}
		>
			<motion.svg
				layoutId="main-logo"
				className="w-1/2 h-auto"
				viewBox="0 0 339 243"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				initial="hidden"
				animate="visible"
				onAnimationComplete={() => setLoading(false)}
			>
				{/* M */}
				<motion.path
					variants={draw}
					custom={1}
					d="M45.6851 65.208H30.3251L20.2131 31.032V83H0.245117V0.824005H24.6931L38.0051 44.728L51.3171 0.824005H75.7651V83H55.9251V30.776L45.6851 65.208Z"
					fill="none"
					stroke="transparent"
					className="stroke-text dark:stroke-dark-text"
					strokeWidth="3"
				/>
				{/* A */}
				<motion.path
					variants={draw}
					custom={2}
					d="M150.754 163H128.226L125.666 150.712H105.954L103.266 163H81.2501L102.37 80.824H129.634L150.754 163ZM115.938 105.272L109.41 134.84H122.21L115.938 105.272Z"
					fill="none"
					className="stroke-text dark:stroke-dark-text"
					stroke="transparent"
					strokeWidth="3"
				/>
				{/* R */}
				<motion.path
					variants={draw}
					custom={1}
					d="M156.245 0.824005H194.261C207.957 0.824005 213.077 7.096 213.077 16.696V37.944C213.077 45.496 210.005 50.872 202.069 52.92L217.173 83H193.109L180.053 53.816H178.645V83H156.245V0.824005ZM190.677 35.768V19.64C190.677 17.72 189.653 16.824 187.477 16.824H178.645V38.584H187.477C189.653 38.584 190.677 37.688 190.677 35.768Z"
					fill="none"
					className="stroke-text dark:stroke-dark-text"
					stroke="transparent"
					strokeWidth="3"
				/>
				{/* I */}
				<motion.path
					variants={draw}
					custom={3}
					d="M239.308 80.824H261.708V163H239.308V80.824Z"
					fill="none"
					className="stroke-text dark:stroke-dark-text"
					stroke="transparent"
					strokeWidth="3"
				/>
				{/* A */}
				<motion.path
					variants={draw}
					custom={4}
					d="M338.754 243H316.226L313.666 230.712H293.954L291.266 243H269.25L290.37 160.824H317.634L338.754 243ZM303.938 185.272L297.41 214.84H310.21L303.938 185.272Z"
					fill="none"
					stroke="transparent"
					className="stroke-text dark:stroke-dark-text"
					strokeWidth="3"
				/>
			</motion.svg>
		</motion.div>
	);
};

export default Loader;
