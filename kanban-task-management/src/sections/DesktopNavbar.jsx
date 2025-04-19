import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import { AnimatePresence, delay, motion } from "motion/react";
import BoardOption from "../components/BoardOption";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import ThemeToggle from "../components/ThemeToggle";
import AddEditBoardModal from "../components/AddEditBoardModal";

const DesktopNavbar = () => {
	const [openNavbar, setOpenNavbar] = useState(true);
	const [editAddBoardOpen, setEditAddBoardOpen] = useState({
		open: false,
		mode: null,
	});
	const { boards, activeBoard } = useSelector((state) => state.boards);
	const closeEditAddModal = () => {
		setEditAddBoardOpen((prev) => ({
			...prev,
			mode: null,
			open: false,
		}));
	};
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
							className={`hidden md:flex min-w-[260px] min-h-[calc(100vh-80px)] pb-8  flex-col overflow-hidden bg-white dark:bg-dark-grey pr-5
                            border-r border-light-lines z-20 dark:border-dark-lines`}
						>
							<motion.div
								key="boards-container"
								className="flex gap-5 flex-col mt-8"
								initial="hidden"
								animate="show"
								exit="exit"
							>
								<motion.h2 className="text-medium-grey text-s leading-s tracking-s uppercase pl-6">
									All Boards ({boards.length})
								</motion.h2>
								<motion.ul className="" variants={boardsVariant}>
									{boards.length > 0 &&
										boards.map((board) => (
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
										onClick={() => {
											setEditAddBoardOpen((prev) => ({
												...prev,
												mode: "add",
												open: true,
											}));
										}}
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
						className=" cursor-pointer absolute bottom-8 left-0 w-14 h-12  items-center justify-center bg-purple rounded-r-full hover:bg-purple-hover hidden md:flex"
						onClick={() => setOpenNavbar((prev) => !prev)}
					>
						<ReactSVG
							src="/assets/icon-show-sidebar.svg"
							className="fill-white group-hover:fill-black"
						/>
					</motion.button>
				)}
			</AnimatePresence>
			<AddEditBoardModal
				modal={editAddBoardOpen.open}
				board={activeBoard}
				mode={editAddBoardOpen.mode}
				close={closeEditAddModal}
			/>
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
		transition: {
			type: "spring",
			duration: 1,
		},
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
