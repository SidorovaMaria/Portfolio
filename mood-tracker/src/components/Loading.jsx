import React from "react";
import { motion } from "framer-motion"; // also corrected the import

const loadingContainer = {
	initial: {
		transition: {
			staggerChildren: 0.2,
		},
	},
	animate: {
		transition: {
			staggerChildren: 0.2,
		},
	},
};

const DotVariant = {
	initial: {
		y: "0%",
	},
	animate: {
		y: "100%",
	},
};

const Loading = () => {
	return (
		<motion.div
			className="flex items-center justify-center w-full gap-5"
			initial="initial"
			animate="animate"
			exit="exit"
			variants={loadingContainer}
		>
			{[1, 2, 3].map((_, i) => (
				<motion.span
					key={i}
					variants={DotVariant}
					transition={{
						duration: 0.5,
						repeat: Infinity,
						repeatType: "reverse",
						ease: "easeInOut",
					}}
					className="block w-5 h-5 rounded-full bg-blue-600 "
				/>
			))}
		</motion.div>
	);
};

export default Loading;
