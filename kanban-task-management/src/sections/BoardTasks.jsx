import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ReactSVG } from "react-svg";
import AddEditBoardModal from "../components/AddEditBoardModal";
import BoardColumn from "../components/BoardColumn";

const BoardTasks = () => {
	const { activeBoard } = useSelector((state) => state.boards);
	const [addNewBoardModal, setAddNewBoardModal] = useState(false);

	const openAddBoardModal = () => setAddNewBoardModal(true);
	const closeAddBoardModal = () => setAddNewBoardModal(false);

	return (
		<AnimatePresence mode="wait">
			{!activeBoard ? (
				<motion.div
					key="no-active-board"
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.95 }}
					transition={{ duration: 0.3 }}
					className="flex flex-col w-full h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] items-center justify-center px-4 gap-6"
				>
					<h2 className="text-center text-l leading-l text-medium-grey">
						No boards found. Create a new board to get started.
					</h2>
					<button
						className="bg-purple text-white rounded-[24px] py-3.5 px-6 text-m leading-m not-dark:hover:bg-purple-hover cursor-pointer text-center"
						onClick={openAddBoardModal}
					>
						+ Add New Board
					</button>
					{addNewBoardModal && (
						<AddEditBoardModal modal mode="add" close={closeAddBoardModal} />
					)}
				</motion.div>
			) : activeBoard.columns.length === 0 ? (
				<motion.div
					key="empty-board"
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.95 }}
					transition={{ duration: 0.3 }}
					className="flex flex-col w-full h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] items-center justify-center px-4 gap-6"
				>
					<h2 className="text-center text-l leading-l text-medium-grey">
						This board is empty. Create a new column to get started.
					</h2>
					<button
						onClick={openAddBoardModal}
						className="bg-purple text-white rounded-[24px] py-3.5 px-6 text-m leading-m not-dark:hover:bg-purple-hover cursor-pointer text-center"
					>
						+ Add New Column
					</button>
					{addNewBoardModal && (
						<AddEditBoardModal
							board={activeBoard}
							modal
							mode="addColumn"
							close={closeAddBoardModal}
						/>
					)}
				</motion.div>
			) : (
				<motion.div
					key="board-columns"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
					className="flex overflow-x-auto w-full space-x-4 py-6 px-4"
				>
					{activeBoard.columns.map((column) => (
						<motion.div
							key={column.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 20 }}
							transition={{ duration: 0.3 }}
						>
							<BoardColumn column={column} />
						</motion.div>
					))}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 20 }}
						transition={{ duration: 0.3 }}
						className="group min-w-[280px] max-w-[280px] h-full flex items-center justify-center border-dashed border-4 rounded-[6px] border-transparent hover:border-purple cursor-pointer"
						onClick={openAddBoardModal}
					>
						<h1 className="text-xl leading-xl text-medium-grey group-hover:text-purple">
							+ New Column
						</h1>
					</motion.div>
					{addNewBoardModal && (
						<AddEditBoardModal
							board={activeBoard}
							modal
							mode="addColumn"
							close={closeAddBoardModal}
						/>
					)}
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default BoardTasks;
