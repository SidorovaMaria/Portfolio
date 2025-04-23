import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useSelector } from "react-redux";
import BoardOption from "./BoardOption";
import { ReactSVG } from "react-svg";
import ThemeToggle from "./ThemeToggle";
const MobileDropDown = ({ openCreateNew }) => {
	const { activeBoard, boards } = useSelector((state) => state.boards);
	const [allBoardsDropdown, setAllBoardsDropdown] = useState(false);
	// useEffect(() => {
	// 	if (allBoardsDropdown) {
	// 		document.body.classList.add("noscroll");
	// 	} else {
	// 		document.body.classList.remove("noscroll");
	// 	}

	// 	// Cleanup on unmount
	// 	return () => document.body.classList.remove("noscroll");
	// }, [allBoardsDropdown]);

	return (
		<motion.div className="md:hidden mx-4">
			<button
				type="button"
				className="text-l leading-l flex items-center gap-2"
				onClick={() => setAllBoardsDropdown((prev) => !prev)}
			>
				{activeBoard && activeBoard.name}
				<motion.span
					variants={arrowVariants}
					animate={allBoardsDropdown ? "open" : "closed"}
					transition={{
						duration: 0.3,
					}}
				>
					<img src="/assets/icon-chevron-down.svg" />
				</motion.span>
			</button>
			<AnimatePresence mode="wait">
				{allBoardsDropdown && (
					<motion.div
						variants={backdropVariants}
						initial="hidden"
						animate="show"
						exit="exit"
						onClick={() => setAllBoardsDropdown(false)}
						transition={{
							type: "spring",
							duration: 1,
						}}
						className="absolute w-full left-0 h-[calc(100vh-64px)] bg-black/50 bottom-0 z-10 "
					>
						<motion.div
							onClick={(e) => e.stopPropagation()}
							variants={dropdownVariants}
							initial="hidden"
							animate="show"
							exit="exit"
							className="origin-top bg-white dark:bg-dark-grey p-4 pl-0 rounded-8 overflow-hidden max-w-[264px] mx-auto mt-4"
						>
							<div className="flex flex-col gap-5">
								<motion.h2 className="text-medium-grey text-s leading-s tracking-s uppercase pl-6">
									All Boards ({boards.length})
								</motion.h2>
								<motion.ul>
									{boards.map((board) => (
										<BoardOption
											variants={itemVariants}
											key={board.id}
											board={board}
											close={setAllBoardsDropdown}
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
												openCreateNew("add"), setAllBoardsDropdown(false);
											}}
										>
											+ Create New Board
										</h2>
									</motion.li>
									<motion.li variants={itemVariants}>
										<ThemeToggle />
									</motion.li>
								</motion.ul>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
};

export default MobileDropDown;
// ——— Animation Variants —————————————————————————————————————————
const arrowVariants = {
	open: { rotate: 180 },
	closed: { rotate: 0 },
};

const backdropVariants = {
	hidden: { opacity: 0 },
	show: { opacity: 1 },
	exit: { opacity: 0 },
};

const dropdownVariants = {
	hidden: {
		scaleY: 0,
		opacity: 0,
		transition: { when: "afterChildren", staggerChildren: 0.1 },
	},
	show: {
		scaleY: 1,
		opacity: 1,
		transition: { when: "beforeChildren", staggerChildren: 0.1 },
	},
	exit: {
		scaleY: 0,
		opacity: 0,
	},
};

const itemVariants = {
	hidden: {
		opacity: 0,
		y: -30,
		transition: { when: "afterChildren" },
	},
	show: {
		opacity: 1,
		y: 0,
		transition: { when: "beforeChildren" },
	},
	exit: {
		opacity: 0,
		y: -30,
	},
};
