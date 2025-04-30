import React from "react";
import ArrowLeftIcon from "../assets/images/icon-arrow-left.svg?react";
import DeletIcon from "../assets/images/icon-delete.svg?react";
import ArchiveIcon from "../assets/images/icon-archive.svg?react";
const NoteControl = ({ unselect }) => {
	return (
		<div className="flex justify-between pb-3 border-b border-n-200 lg:hidden">
			<div className="flex gap-1 text-n-600 items-center">
				<ArrowLeftIcon className="w-4.5 h-4.5" />
				<p className="text-5 cursor-pointer" onClick={unselect}>
					Go Back
				</p>
			</div>
			<div className="flex gap-4 items-center">
				<DeletIcon className="w-4.5 h-4.5" />
				<ArchiveIcon className="w-4.5 h-4.5" />
				<p className="text-5 cursor-pointer">Cancel</p>
				<p className="text-5 cursor-pointer text-blue-500">Save Note</p>
			</div>
		</div>
	);
};

export default NoteControl;
