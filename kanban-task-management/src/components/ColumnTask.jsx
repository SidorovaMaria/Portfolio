import { AnimatePresence, motion } from "motion/react";
import React from "react";

const ColumnTask = ({ task }) => {
	const completedSubTasks = task.subtasks?.filter((task) => task.isCompleted);
	console.log(completedSubTasks);
	return (
		<AnimatePresence>
			{task && (
				<motion.div className="rounded-8 py-6 px-4 flex flex-col gap-2 bg-white dark:bg-dark-grey group cursor-pointer">
					<h4 className="text-m leading-m group-hover:text-purple">{task.title}</h4>
					<p className="text-body-m leading-body-m text-medium-grey">
						{completedSubTasks.length} of {task.subtasks.length} subtasks
					</p>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default ColumnTask;
