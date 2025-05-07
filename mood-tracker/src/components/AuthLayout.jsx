import React from "react";
import { AnimatePresence, motion } from "motion/react";
import LogoIcon from "../assets/images/logo.svg?react";
const AuthLayout = ({ children, title, info, authKey }) => {
	return (
		<AnimatePresence mode="wait">
			<div className="flex flex-col items-center h-screen w-screen justify-start gradient gap-12 px-4 py-20 gap-8 md:gap-12 mx-auto">
				<LogoIcon />

				<motion.div
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{
						y: -20,
						opacity: 0,
					}}
					transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
					key={authKey}
					className="flex flex-col items-start gap-8 px-4 py-10 rounded-16 bg-n-0 w-full shadow-[0px_8px_16px_rgba(32,37,41,0.08)]
                    md:px-8 max-w-[530px] mx-auto"
				>
					<section className="flex flex-col gap-2 w-full">
						<h1 className="text-3 text-n-900">{title}</h1>
						<p className="text-6 regular text-n-600">{info}</p>
					</section>
					{children}
				</motion.div>
			</div>
		</AnimatePresence>
	);
};

export default AuthLayout;
