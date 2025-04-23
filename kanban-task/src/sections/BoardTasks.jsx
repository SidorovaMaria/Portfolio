import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import BoardColumns from "./BoardColumns";
import TaskDetails from "../components/modals/TaskDetails";

const BoardTasks = ({ openModal, openTaskModal }) => {
	const { activeBoard, boards } = useSelector((state) => state.boards);
	const [taskDetails, settaskDetails] = useState({
		open: false,
		task: null,
		column: null,
	});
	const openTaskDetails = (task, column) => {
		settaskDetails((prev) => ({
			...prev,
			open: true,
			task: task,
			column: column,
		}));
	};
	const closeTaskDetails = () => {
		settaskDetails((prev) => ({
			...prev,
			open: false,
			task: null,
		}));
	};
	return (
		<AnimatePresence mode="wait">
			{!activeBoard ? (
				<motion.div
					key="no-active-board"
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.95 }}
					transition={{ duration: 0.3 }}
					className="flex flex-col w-full h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] lg:h-[calc(100vh-100px)] items-center justify-center px-4 gap-6"
				>
					<h2 className="text-center text-l leading-l text-medium-grey">
						No boards found. Create a new board to get started.
					</h2>
					<button
						aria-label="Add New Board"
						className="bg-purple text-white rounded-[24px] py-3.5 px-6 text-m leading-m not-dark:hover:bg-purple-hover cursor-pointer text-center"
						onClick={() => openModal("add")}
					>
						+ Add New Board
					</button>
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
						aria-label="Add New Column"
						onClick={() => openModal("addColumn")}
						className="bg-purple text-white rounded-[24px] py-3.5 px-6 text-m leading-m not-dark:hover:bg-purple-hover cursor-pointer text-center"
					>
						+ Add New Column
					</button>
				</motion.div>
			) : (
				<motion.div
					key="board-columns"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
					className="flex min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-80px)] lg:min-h-[calc(100vh-100px)] overflow-x-auto w-full space-x-6 py-6 px-4 "
				>
					{activeBoard.columns.map((column) => (
						<BoardColumns
							column={column}
							key={column.id}
							openTask={openTaskDetails}
							openTaskModal={openTaskModal}
						/>
					))}
					<motion.button
						aria-label="Add New Column"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 20 }}
						transition={{ duration: 0.3 }}
						className="group min-w-[280px] max-w-[280px] h-full flex items-center justify-center hover:border-dashed hover:border-4 rounded-[6px] hover:border-purple/50! cursor-pointer hover:bg-purple/10 transition-colors duration-300"
						onClick={() => openModal("addColumn")}
					>
						<h1 className="text-xl leading-xl text-transparent group-hover:text-purple">
							+ New Column
						</h1>
					</motion.button>
					<AnimatePresence>
						{taskDetails.open && (
							<TaskDetails
								taskId={taskDetails.task.id}
								column={taskDetails.column}
								close={closeTaskDetails}
								openModalEdit={openTaskModal}
							/>
						)}
					</AnimatePresence>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default BoardTasks;
