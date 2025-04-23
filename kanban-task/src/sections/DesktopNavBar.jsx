import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ReactSVG } from "react-svg";
import BoardOption from "../components/BoardOption";
import ThemeToggle from "../components/ThemeToggle";

const DesktopNavBar = ({ openModal }) => {
	const { boards, activeBoard } = useSelector((state) => state.boards);
	const [openNavbar, setOpenNavbar] = useState(true);

	return (
		<AnimatePresence mode="wait">
			{openNavbar ? (
				<motion.nav
					key="desktop-navbar"
					variants={desktopNavBarVariant}
					initial={"hidden"}
					animate={"show"}
					exit={"exit"}
					layout
					style={{ transformOrigin: "left" }}
					className={`hidden md:flex top-[80px] lg:top-[100px] min-w-[280px] lg:min-w-[300px] sticky md:max-h-[calc(100vh-80px)]  ]pb-8 flex-col  bg-white dark:bg-dark-grey pr-5 lg:pr-6
                    lg:max-h-[calc(100vh-100px)]
                    border-r border-light-lines z-20 dark:border-dark-lines`}
				>
					<motion.div
						key="boards-container"
						className="flex gap-5 flex-col mt-8 lg:mt-4"
						initial="hidden"
						animate="show"
						exit="exit"
						variants={navBarVarinant}
					>
						<motion.h2 className="text-medium-grey text-s leading-s tracking-s uppercase pl-6">
							All Boards ({boards.length})
						</motion.h2>
						<motion.ul>
							{boards.map((board) => (
								<BoardOption
									variants={itemVariants}
									key={board.id}
									board={board}
									active={board.id === activeBoard.id}
								/>
							))}
							<motion.li
								variants={itemVariants}
								className={`flex items-center gap-3 pl-6 rounded-r-full py-4 cursor-pointer group text-purple`}
							>
								<motion.span>
									<ReactSVG
										src="/assets/icon-board.svg"
										className={`fill-purple`}
									/>
								</motion.span>
								<h2
									className={` text-m leading-m whitespace-nowrap`}
									onClick={() => {
										openModal("add");
									}}
								>
									+ Create New Board
								</h2>
							</motion.li>
						</motion.ul>
					</motion.div>
					<motion.div className="mt-auto flex flex-col gap-4 ">
						<ThemeToggle />
						<button
							aria-label="Hide Sidebar"
							className="flex items-center gap-2.5 text-medium-grey hover:text-purple group mr-6 w-full hover:bg-purple/10 py-4 rounded-r-full pl-8 dark:hover:bg-white"
							onClick={() => setOpenNavbar((prev) => !prev)}
						>
							<ReactSVG
								src="/assets/icon-hide-sidebar.svg"
								className="fill-medium-grey group-hover:fill-purple"
							/>
							<h3 className="text-m leading-m">Hide Sidebar</h3>
						</button>
					</motion.div>
				</motion.nav>
			) : (
				<motion.button
					aria-label="Show Sidebar"
					key="show-sidebar"
					initial={{ x: -100, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					exit={{ x: -100, opacity: 0 }}
					transition={{ ease: "easeInOut" }}
					className="hidden md:flex fixed bottom-8 left-0 w-14 h-12 items-center justify-center bg-purple rounded-r-full hover:bg-purple-hover z-30"
					onClick={() => setOpenNavbar((prev) => !prev)}
				>
					<ReactSVG
						alt="icon-show-sidebar"
						aria-label="Show Sidebar"
						src="/assets/icon-show-sidebar.svg"
						className="fill-white group-hover:fill-black"
					/>
				</motion.button>
			)}
		</AnimatePresence>
	);
};

export default DesktopNavBar;

const desktopNavBarVariant = {
	hidden: {
		opacity: 0,
		scaleX: 0,
		transformOrigin: "left",
	},
	show: {
		opacity: 1,
		scaleX: 1,
		transformOrigin: "left",
		transition: {
			type: "spring",
			stiffness: 100,
			damping: 20,
		},
	},
	exit: {
		opacity: 0,
		scaleX: 0,
		transformOrigin: "left",
	},
};

const navBarVarinant = {
	hidden: {
		opacity: 0,
		transition: { when: "afterChildren", staggerChildren: 0.15 },
	},
	show: {
		opacity: 1,
		transition: { when: "beforeChildren", staggerChildren: 0.15 },
	},
	exit: {
		opacity: 0,
		transition: { when: "afterChildren", staggerChildren: 0.15 },
	},
};

const itemVariants = {
	hidden: {
		opacity: 0,
		x: -30,
	},
	show: {
		opacity: 1,
		x: 0,
	},
	exit: {
		opacity: 0,
		x: -30,
	},
};
