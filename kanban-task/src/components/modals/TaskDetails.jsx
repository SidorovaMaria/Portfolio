import React from "react";
import { motion } from "motion/react";
import SettingsToggle from "../SettingsToggle";
import { ReactSVG } from "react-svg";
import { useDispatch, useSelector } from "react-redux";
import { updateSubtaskComplete } from "../../redux/boardsSlice";
import TaskStatusDropdown from "../TaskStatusDropdown";
const TaskDetails = ({ taskId, close, openModalEdit }) => {
	const dispatch = useDispatch();
	const { activeBoard } = useSelector((state) => state.boards);
	const task = activeBoard.columns.flatMap((column) => column.tasks).find((t) => t.id === taskId);
	if (!task) return null;

	const completedSubTasks = task.subtasks?.filter((sub) => sub.isCompleted);

	const handleCheckboxChange = (e) => {
		const subtaskId = e.target.id;
		dispatch(updateSubtaskComplete({ taskId: task.id, subtaskId: subtaskId }));
	};

	return (
		<motion.aside
			key="delteModal"
			initial="hidden"
			animate="show"
			exit="exit"
			variants={backdropVariant}
			transition={{
				duration: 0.7,
			}}
			onClick={() => {
				close();
			}}
			className="inset-0 absolute z-30 w-screen h-screen bg-black/50 px-4 flex items-center gap-6
           "
		>
			<motion.div
				onClick={(e) => e.stopPropagation()}
				variants={modalBlock}
				transition={{ delay: 0.5 }}
				className="bg-white dark:bg-dark-grey w-full p-6 md:p-8 rounded-[6px] flex flex-col gap-6  max-w-[480px] mx-auto "
			>
				<div className="flex items-center gap-4 justify-between relative">
					<h2 className="text-l leading-l text-left">{task.title}</h2>
					<SettingsToggle
						component={task}
						mode="task"
						open={openModalEdit}
						className={"top-[120%] -right-1/6 w-1/3"}
					/>
				</div>
				{task.description && (
					<p className="text-body-l leading-body-l font-medium text-medium-grey">
						{task.description}
					</p>
				)}
				{task.subtasks.length !== 0 ? (
					<div className="flex flex-col text-body-m leading-body-m text-medium-grey dark:text-white gap-4">
						<h3>
							Subtasks ({completedSubTasks.length} of {task.subtasks.length})
						</h3>
						<div className="flex flex-col gap-2">
							{task.subtasks.map((sub) => (
								<div
									key={sub.id}
									className="flex gap-4 w-full items-center py-3 pl-3 pr-2 dark:bg-very-dark-grey bg-light-grey rounded-[4px]"
								>
									<input
										aria-label="Subtask Checkbox"
										id={sub.id}
										type="checkbox"
										className="peer hidden"
										checked={sub.isCompleted}
										onChange={handleCheckboxChange}
									/>
									<div className="w-4 h-4 flex items-center justify-center rounded-[2px] bg-white peer-checked:bg-purple border border-[#828FA3]">
										<ReactSVG src="/assets/icon-check.svg" />
									</div>
									<label
										htmlFor={sub.id}
										className="flex-1 text-m leading-m text-black dark:text-white peer-checked:line-through peer-checked:text-medium-grey cursor-pointer"
									>
										{sub.title}
									</label>
								</div>
							))}
						</div>
					</div>
				) : (
					<p className="text-body-m leading-body-m font-medium text-medium-grey ">
						No Subtasks
					</p>
				)}
				<div className="flex flex-col gap-2">
					<label
						className="text-body-m leading-body-m text-medium-grey dark:text-white"
						htmlFor="stats"
					>
						Current Status
					</label>
					<TaskStatusDropdown task={task} column={activeBoard} />
				</div>
			</motion.div>
		</motion.aside>
	);
};

export default TaskDetails;
const backdropVariant = {
	hidden: {
		opacity: 0,
	},
	show: {
		opacity: 1,
	},
	exit: {
		opacity: 0,
	},
};
const modalBlock = {
	hidden: {
		scaleY: 0,
		scaleX: 2,
	},
	show: {
		scaleY: 1,
		scaleX: 1,
		transition: {
			type: "spring",
			duration: 1,
		},
	},
	exit: {
		scaleY: 0,
		scaleX: 2,
		transition: {
			type: "spring",
			duration: 0.5,
		},
	},
};
