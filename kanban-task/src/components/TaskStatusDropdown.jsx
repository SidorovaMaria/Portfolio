import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ReactSVG } from "react-svg";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskStatus } from "../redux/boardsSlice";

const TaskStatusDropdown = ({ task, formikFunction }) => {
	const { activeBoard } = useSelector((state) => state.boards);
	const [openStatusDropDown, setOpenStatusDropDown] = useState(false);
	const BoardsStatusesNames = activeBoard.columns.map((col) => col.name);
	const dispatch = useDispatch();

	const handleStatusChange = (status) => {
		setOpenStatusDropDown(false);
		if (formikFunction) {
			formikFunction(status);
		} else {
			if (status !== task.status) {
				dispatch(updateTaskStatus({ task, columnName: status }));
			}
		}
	};

	return (
		<div className="flex flex-col gap-2 relative">
			<button
				type="button"
				aria-label="Open Status Dropdown"
				onClick={() => setOpenStatusDropDown((prev) => !prev)}
				className="w-full border py-2 px-4 text-body-l text-left leading-body-l font-medium rounded-4 border-purple flex items-center cursor-pointer"
			>
				<p className="flex-1">{task.status ? task.status : task}</p>
				<motion.div
					animate={{ rotate: openStatusDropDown ? 180 : 0 }}
					transition={{ duration: 0.2 }}
				>
					<ReactSVG
						src="/assets/icon-chevron-down.svg"
						aria-label="Show Available Statuses"
					/>
				</motion.div>
			</button>

			<AnimatePresence>
				{openStatusDropDown && (
					<motion.ul
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						className="absolute bg-white dark:bg-very-dark-grey w-full top-[110%] left-0 rounded-8 flex flex-col p-1 z-20 shadow-lg"
					>
						{BoardsStatusesNames.map((colName) => (
							<motion.li key={`${colName}-${task.id}`}>
								<button
									// aria-label="Change Task Status"
									type="button"
									className={`hover:bg-purple-hover text-body-l leading-body-l font-medium px-4 rounded-4 py-2 w-full text-left ${
										(task.status === colName || task === colName) &&
										"font-bold bg-purple-hover/50 cursor-not-allowed pointer-events-none "
									}`}
									onClick={() => handleStatusChange(colName)}
								>
									{colName}
								</button>
							</motion.li>
						))}
					</motion.ul>
				)}
			</AnimatePresence>
		</div>
	);
};

export default TaskStatusDropdown;
