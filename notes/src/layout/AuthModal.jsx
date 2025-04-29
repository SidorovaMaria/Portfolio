import { Link } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import LogoIcon from "../assets/images/logo.svg?react";
const AuthModal = ({ children, title, intro, authAction, account, link, linkText }) => {
	return (
		<main className="bg-n-100 dark:bg-n-700 h-screen w-screen flex items-center justify-cnter px-4">
			<motion.article
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 20 }}
				transition={{ duration: 0.7, type: "spring" }}
				key={title}
				className="bg-n-0 dark:bg-n-950 border border-n-200 dark:border-n-800 rounded-12 shadow-large dark:shadow-none flex flex-col items-center justify-start gap-4 px-4 py-10 max-w-[400px] md:max-w-[522px] lg:max-w-[540px] mx-auto w-full md:py-12 md:px-8 lg:p-12"
			>
				{/* Logo */}
				<div className="pb-2">
					<LogoIcon />
				</div>
				{/* Title and Intro */}
				<div className="flex flex-col gap-2 items-center">
					<h1 className="text-1 text-center">{title}</h1>
					<p className=" text-center text-5 text-n-600 dark:text-n-300">{intro}</p>
				</div>
				{children}
				<div className="flex flex-col items-center gap-4 pt-6 w-full border-t border-n-200 dark:border-n-800 ">
					<p className="text-5 text-n-600 dark:text-n-300">Or {authAction} with:</p>
					<button className="border-btn-google flex gap-2 items-center w-full justify-center">
						<img src="..//images/icon-google.svg" alt="Google" className="dark-icon" />
						<p className="text-base tracking-[0.5px] font-medium">Google</p>
					</button>
				</div>
				<hr className="border-n-200 dark:border-n-800 w-full" />
				<p className="text-5 text-n-600 dark:text-n-300 ">
					{account}{" "}
					<Link to={link}>
						<span className="text-n-950 dark:text-n-0 hover:text-blue-500 cursor-pointer">
							{linkText}
						</span>
					</Link>
				</p>
			</motion.article>
		</main>
	);
};

export default AuthModal;
