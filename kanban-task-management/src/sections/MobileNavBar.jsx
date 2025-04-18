import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { ReactSVG } from "react-svg";
import BoardOption from "../components/BoardOption";
import ThemeToggle from "../components/ThemeToggle";
import { useRef } from "react";
import { useEffect } from "react";

import AddNewTaskButton from "../components/AddNewTaskButton";
import EditDeletBoardBtn from "../components/EditDeletBoardBtn";
import AddEditBoardModal from "../components/AddEditBoardModal";

const MobileNavbar = () => {
	const { boards, activeBoard } = useSelector((state) => state.boards);
	const [openCreateBoardModal, setOpenCreateBoardModal] = useState(false);
	const [openAllBoards, setOpenAllBoards] = useState(false);

	const boardsRef = useRef();
	const boardsToggleRef = useRef();

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (
				boardsRef.current &&
				!boardsRef.current.contains(e.target) &&
				boardsToggleRef.current &&
				!boardsToggleRef.current.contains(e.target)
			) {
				setOpenAllBoards(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<header className="flex relative px-4 py-5  md:hidden justify-between">
			{/* Logo and ToggleActiveBlog */}
			<div className="flex items-center gap-4">
				<img src="/assets/logo-mobile.svg" />
				{/* Dropdowns Boards */}
				<div>
					<button
						onClick={() => setOpenAllBoards((prev) => !prev)}
						ref={boardsToggleRef}
						className="text-l leading-l flex items-center gap-2"
					>
						{activeBoard ? `${activeBoard.name}` : ""}
						<motion.span
							variants={ChevronVariant}
							initial="closed"
							className="text-purple"
							animate={openAllBoards ? "open" : "closed"}
						>
							<ChevronDown size={16} />
						</motion.span>
					</button>
					{/* Modal with Boards */}
					<AnimatePresence mode="wait">
						{openAllBoards && (
							<>
								{/* Backfrop */}
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{
										opacity: 0,
									}}
									transition={{
										type: "spring",
									}}
									className="absolute w-full left-0 h-[calc(100vh-72px)] bg-black/50 top-[72px] z-10"
								></motion.div>
								{/* DropDown Panel */}
								<motion.div
									ref={boardsRef}
									initial="hidden"
									animate="show"
									exit="exit"
									variants={boardsOption}
									className="origin-top absolute z-20 top-[150%] left-1/2 -translate-x-1/2 w-2/3 bg-white dark:bg-dark-grey p-4 pl-0 rounded-8 overflow-hidden"
								>
									<div className="flex flex-col gap-5">
										<motion.h2
											variants={allboards}
											className="text-medium-grey text-s leading-s tracking-s uppercase pl-6"
										>
											All Boards ({boards.length})
										</motion.h2>
										<motion.ul className="">
											{boards.length > 0 && (
												<>
													{boards.map((board) => (
														<BoardOption
															variant={mobileMenuSelectItem}
															board={board}
															key={board.id}
															close={setOpenAllBoards}
															active={board.id === activeBoard.id}
														/>
													))}
												</>
											)}
											<motion.li
												variants={mobileMenuSelectItem}
												className={`flex items-center gap-3 pl-6 rounded-r-full py-4 cursor-pointer group text-purple`}
												onClick={() => {
													setOpenCreateBoardModal(true);
													setOpenAllBoards(false);
												}}
											>
												<motion.span variants={""}>
													<ReactSVG
														src="/assets/icon-board.svg"
														className={`fill-purple`}
													/>
												</motion.span>
												<h2
													className={` text-m leading-m whitespace-nowrap`}
												>
													+ Create New Board
												</h2>
											</motion.li>
											<motion.li variants={mobileMenuSelectItem}>
												<ThemeToggle />
											</motion.li>
										</motion.ul>
									</div>
								</motion.div>
							</>
						)}
					</AnimatePresence>
				</div>
			</div>
			{/* Add Task & Edit & Delete Board */}
			<div className="flex items-center gap-4">
				{/* Add new Task */}
				<AddNewTaskButton />
				{/* Edit & Delete Board */}
				<EditDeletBoardBtn />
			</div>
			<AddEditBoardModal
				modal={openCreateBoardModal}
				mode={"add"}
				close={setOpenCreateBoardModal}
			/>
		</header>
	);
};

export default MobileNavbar;

// ------------------ Animation Variants ------------------
const ChevronVariant = { open: { rotate: 180 }, closed: { rotate: 0 } };
const boardsOption = {
	hidden: {
		scaleY: 0,
		opacity: 0,
		transition: {
			when: "afterChildren",
			staggerChildren: 0.1,
		},
	},
	show: {
		scaleY: 1,
		opacity: 1,
		transition: {
			when: "beforeChildren",
			staggerChildren: 0.1,
		},
	},
	exit: {
		scaleY: 0,
		opacity: 0,
	},
};

const mobileMenuSelectItem = {
	hidden: {
		opacity: 0,
		y: -30,
		transition: {
			when: "afterChildren",
		},
	},
	show: {
		opacity: 1,
		y: 0,
		transition: {
			when: "beforeChildren",
		},
	},
	exit: {
		opacity: 0,
		y: -30,
	},
};
const allboards = {
	hidden: {
		opacity: 0,
		y: "-100%",
	},
	show: {
		opacity: 1,
		y: 0,
	},
};
