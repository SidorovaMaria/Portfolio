import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { ReactSVG } from "react-svg";
import BoardOption from "../components/BoardOption";
import ThemeToggle from "../components/ThemeToggle";
import DeleteBoardModal from "../components/DeleteBoardModal";
import { useRef } from "react";
import { useEffect } from "react";
import EditBoardModal from "../components/EditBoardModal";

const MobileNavbar = () => {
	const { boards, activeBoard } = useSelector((state) => state.boards);
	const [openAllBoards, setOpenAllBoards] = useState(false);
	const [deleteEditBoardOpen, setdeleteEditBoardOpen] = useState(false);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [editBoardOpen, setEditBoardOpen] = useState(false);
	const settingsRef = useRef();
	const boardsRef = useRef();
	const boardsToggleRef = useRef();
	useEffect(() => {
		const handleClickOutside = (e) => {
			if (settingsRef.current && !settingsRef.current.contains(e.target)) {
				setdeleteEditBoardOpen(false);
			}
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
		<header className="flex px-4 py-5 relative md:hidden justify-between">
			{/* Logo and ToggleActiveBlog */}
			<div className="flex items-center gap-4">
				<img src="/assets/logo-mobile.svg" />
				{/* Dropdowns Boards */}
				<div>
					<button
						onClick={() => setOpenAllBoards((prev) => !prev)}
						className="text-l leading-l flex items-center gap-2"
					>
						{activeBoard ? `${activeBoard.name}` : ""}
						<motion.span
							ref={boardsToggleRef}
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
									className="origin-top absolute z-20 top-[120%] left-1/2 -translate-x-1/2 w-2/3 bg-white dark:bg-dark-grey p-4 pl-0 rounded-8 overflow-hidden"
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
															key={board.slug}
															close={setOpenAllBoards}
															active={board.slug === activeBoard.slug}
														/>
													))}
												</>
											)}
											<motion.li
												variants={mobileMenuSelectItem}
												className={`flex items-center gap-3 pl-6 rounded-r-full py-4 cursor-pointer group text-purple`}
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
				<button className="bg-purple px-4.5 py-2.5 rounded-full hover:bg-purple-hover group ">
					<ReactSVG src="/assets/icon-add-task-mobile.svg" className="fill-white " />
				</button>
				{/* Edit & Delete Board */}
				<motion.div
					ref={settingsRef}
					animate={deleteEditBoardOpen ? "openSetting" : "closeSetting"}
				>
					<button className="flex items-center justify-center h-4">
						<ReactSVG
							src="/assets/icon-vertical-ellipsis.svg"
							onClick={() => setdeleteEditBoardOpen((prev) => !prev)}
						/>
					</button>
					<motion.div
						className="absolute top-[120%] right-[2%] flex flex-col gap-1 cursor-pointer"
						variants={{
							openSetting: {
								y: 0,
								scaleY: 1,
								opacity: 1,
							},
							closeSetting: {
								y: -50,
								scaleY: 0,
								opacity: 0,
							},
						}}
						transition={{
							type: "spring",
							duration: 0.5,
						}}
					>
						<motion.button
							className="bg-white dark:bg-dark-grey text-s leading-m text-dark-grey/80 dark:text-white/80 hover:bg-purple hover:text-white py-2 px-4 w-full text-left shadow-[2px_2px_2px_2px] border shadow-dark-grey/50 rounded-sm hover:shadow-none"
							onClick={() => {
								setEditBoardOpen(true);
								setdeleteEditBoardOpen(false);
							}}
						>
							Edit Board
						</motion.button>
						<motion.button
							onClick={() => {
								setDeleteModalOpen(true);
								setdeleteEditBoardOpen(false);
							}}
							className=" bg-white dark:bg-dark-grey text-s leading-m text-red hover:bg-red hover:text-white py-2 px-4 w-full text-left shadow-[2px_2px_2px_2px] border shadow-red/50 rounded-sm hover:shadow-none"
						>
							Delete Board
						</motion.button>
					</motion.div>
				</motion.div>
			</div>
			<DeleteBoardModal
				close={setDeleteModalOpen}
				board={activeBoard}
				modal={deleteModalOpen}
			/>
			<EditBoardModal modal={editBoardOpen} close={setEditBoardOpen} board={activeBoard} />
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
