import React from "react";
import { motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskStatus } from "../redux/boardsSlice";

const BoardColumns = ({ column, openTask, openTaskModal }) => {
	const dispatch = useDispatch();
	const handleDragEnd = (event, info, draggedTask) => {
		const dropTarget = document.elementFromPoint(event.clientX, event.clientY);
		if (!dropTarget) return;
		const columnElement = dropTarget.closest("[data-column-id]");
		if (!columnElement) return;
		const newColumnId = columnElement.getAttribute("data-column-id");
		if (newColumnId !== column.name) {
			dispatch(updateTaskStatus({ task: draggedTask, columnName: newColumnId }));
		}
	};
	return (
		<motion.div
			data-column-id={column.name}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 20 }}
			transition={{ duration: 0.3 }}
			className=""
		>
			<div className="min-w-[280px] max-w-[280px] min-h-full flex flex-col gap-6">
				<h4 className="text-medium-grey text-s leading-s tracking-s uppercase">
					{column.name} ({column.tasks ? column.tasks.length : "0"})
				</h4>
				<motion.div className="flex flex-col w-full gap-5" data-column-id={column.name}>
					{column.tasks.map((task) => {
						const completedSubTasks = task.subtasks?.filter((task) => task.isCompleted);
						return (
							<motion.div
								whileHover={{ scale: 1.08 }}
								whileDrag={{
									filter: "brightness(1.9)",
									zIndex: 10,
									pointerEvents: "none",
								}}
								key={task.id}
								drag
								dragSnapToOrigin
								dragConstraints={{ top: 0, bottom: 0 }}
								onDragEnd={(e, info) => handleDragEnd(e, info, task)}
								className="rounded-8 py-6 px-4 flex flex-col gap-2 bg-white dark:bg-dark-grey group cursor-pointer
                                shadow-[0_4px_6px_0_#364E7E1A]
                                "
								onClick={() => openTask(task, column)}
							>
								<h4 className="text-m leading-m group-hover:text-purple">
									{task.title}
								</h4>
								{task.subtasks.length !== 0 && (
									<p className="text-body-m leading-body-m text-medium-grey">
										{completedSubTasks.length} of {task.subtasks.length}{" "}
										subtasks
									</p>
								)}
							</motion.div>
						);
					})}
					<button
						data-column-id={column.name}
						type="button"
						className="group h-20 w-full flex items-center justify-center hover:border-dashed hover:border-4 rounded-8 hover:border-purple/50! cursor-pointer hover:bg-purple/10"
						onClick={() => openTaskModal("addTask", column, null)}
					>
						<h3 className="text-l leading-l text-transparent group-hover:text-purple">
							+ New Task
						</h3>
					</button>
				</motion.div>
			</div>
		</motion.div>
	);
};

export default BoardColumns;
