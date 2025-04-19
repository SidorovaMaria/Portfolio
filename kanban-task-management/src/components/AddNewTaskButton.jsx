import { AnimatePresence } from "motion/react";
import React from "react";
import { useSelector } from "react-redux";
import { ReactSVG } from "react-svg";

const AddNewTaskButton = () => {
	const { activeBoard } = useSelector((state) => state.boards);
	return (
		<AnimatePresence>
			<button className="bg-purple px-4.5 py-2.5 rounded-full hover:bg-purple-hover group cursor-pointer">
				<ReactSVG src="/assets/icon-add-task-mobile.svg" className="fill-white " />
			</button>
		</AnimatePresence>
	);
};

export default AddNewTaskButton;
