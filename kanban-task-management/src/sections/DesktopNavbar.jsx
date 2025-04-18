import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import { AnimatePresence, delay, motion } from "motion/react";
import BoardOption from "../components/BoardOption";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import ThemeToggle from "../components/ThemeToggle";

const DesktopNavbar = () => {
	const [openNavbar, setOpenNavbar] = useState(true);
	const { boards, activeBoard } = useSelector((state) => state.boards);
	return (
		<>
			<AnimatePresence>
				{openNavbar && (
					<>
						<motion.header
							key="desktop-navbar"
							variants={desktopNavBarVariant}
							initial={"hidden"}
							animate={"show"}
							exit={"exit"}
							transition={{
								type: "spring",
								duration: 1,
							}}
							className="hidden md:flex w-[260px] py-8 h-screen  flex-col gap-14 overflow-hidden dark:bg-dark-grey pr-5"
						>
							<div className="pl-6">
								<ReactSVG
									src="/assets/logo-light.svg"
									className="hidden dark:block"
								/>
								<ReactSVG src="/assets/logo-dark.svg" className="dark:hidden" />
							</div>
							<motion.div
								key="boards-container"
								className="flex gap-5 flex-col "
								initial="hidden"
								animate="show"
								exit="exit"
							>
								<motion.h2 className="text-medium-grey text-s leading-s tracking-s uppercase pl-6">
									All Boards ({boards.length})
								</motion.h2>
								<motion.ul className="" variants={boardsVariant}>
									{boards.map((board) => (
										<BoardOption
											variant={desktopBoardVarint}
											board={board}
											key={board.id}
											active={board.id === activeBoard.id}
										/>
									))}
									<motion.li
										className={`flex items-center gap-3 pl-6 rounded-r-full py-4 cursor-pointer group text-purple`}
										variants={desktopBoardVarint}
									>
										<motion.span variants={""}>
											<ReactSVG
												src="/assets/icon-board.svg"
												className={`fill-purple`}
											/>
										</motion.span>
										<h2 className={` text-m leading-m whitespace-nowrap`}>
											+ Create New Board
										</h2>
									</motion.li>
								</motion.ul>
							</motion.div>
							{/* Toggle Theme And Hide NavBar */}
							<motion.div className="mt-auto flex flex-col gap-4 ">
								<ThemeToggle />
								<button
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
						</motion.header>
					</>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{!openNavbar && (
					<motion.button
						key="show-sidebar"
						initial={{ x: -100, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						exit={{ x: -100, opacity: 0 }}
						transition={{
							type: "spring",
							duration: 0.4,
						}}
						className="absolute bottom-8 left-0 w-14 h-12 flex items-center justify-center bg-purple rounded-r-full hover:bg-purple-hover"
						onClick={() => setOpenNavbar((prev) => !prev)}
					>
						<ReactSVG
							src="/assets/icon-show-sidebar.svg"
							className="fill-medium-grey  dark:fill-white group-hover:fill-black"
						/>
					</motion.button>
				)}
			</AnimatePresence>
		</>
	);
};

export default DesktopNavbar;

//
const desktopNavBarVariant = {
	hidden: {
		width: 0,
		opacity: 0,
	},
	show: {
		width: 240,
		opacity: 1,
	},
	exit: {
		width: 0,
		opacity: 0,
	},
};
const boardsVariant = {
	show: {
		transition: {
			staggerChildren: 0.2,
			delayChildren: 0.5,
		},
	},
};
const desktopBoardVarint = {
	hidden: { opacity: 0, x: -30 },
	show: {
		opacity: 1,
		x: 0,
	},
};
