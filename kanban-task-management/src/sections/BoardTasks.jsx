import React from "react";
import { useSelector } from "react-redux";

const BoardTasks = () => {
	const { boards, activeBoard } = useSelector((state) => state.boards);
	return (
		<main>
			{/* Upper Board Settings - only for tablet and desktop */}
			{activeBoard && (
				<aside className="bg-white border-b border-b-light-lines dark:border-b-dark-lines hidden md:flex">
					{/* BoardName */}
					<h1 className="text-[20px] leading-[25px] ">{activeBoard.name}</h1>
					{/* Add New Task Edit and Delete */}
					<div></div>
				</aside>
			)}
		</main>
	);
};

export default BoardTasks;
