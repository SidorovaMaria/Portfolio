import React from "react";
import { motion } from "motion/react";
import ColumnTask from "./ColumnTask";
const BoardColumn = ({ column }) => {
	console.log(column);
	return (
		<div className="min-w-[280px] max-w-[280px] h-full flex flex-col gap-6">
			<h4 className="text-medium-grey text-s leading-s tracking-s uppercase">
				{column.name} ({column.tasks ? column.tasks.length : "0"})
			</h4>
			{column.tasks && (
				<div className="flex flex-col w-full gap-5">
					{column.tasks.map((task) => (
						<ColumnTask task={task} key={task.id} />
					))}
				</div>
			)}
		</div>
	);
};

export default BoardColumn;
