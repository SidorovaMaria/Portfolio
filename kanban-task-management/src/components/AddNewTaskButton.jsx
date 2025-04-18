import React from "react";
import { ReactSVG } from "react-svg";

const AddNewTaskButton = () => {
	return (
		<button className="bg-purple px-4.5 py-2.5 rounded-full hover:bg-purple-hover group cursor-pointer">
			<ReactSVG src="/assets/icon-add-task-mobile.svg" className="fill-white " />
		</button>
	);
};

export default AddNewTaskButton;
