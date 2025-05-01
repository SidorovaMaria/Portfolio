import React, { useState } from "react";
import ArrowLeftIcon from "../assets/images/icon-arrow-left.svg?react";
import DeletIcon from "../assets/images/icon-delete.svg?react";
import ArchiveIcon from "../assets/images/icon-archive.svg?react";
import { AnimatePresence } from "motion/react";
import DeleteArchiveModal from "./modals/DeleteArchiveModal";
const NoteControl = ({ unselect, note }) => {
	const [openModal, setOpenModal] = useState({
		mode: null,
		note: null,
	});
	const closeModal = () => {
		setOpenModal((prev) => ({
			...prev,
			note: null,
			mode: null,
		}));
	};
	return (
		<div className="flex justify-between pb-3 border-b border-n-200 lg:hidden">
			<div className="flex gap-1 text-n-600 items-center">
				<ArrowLeftIcon className="w-4.5 h-4.5" />
				<p className="text-5 cursor-pointer" onClick={unselect}>
					Go Back
				</p>
			</div>
			<div className="flex gap-4 items-center">
				<DeletIcon
					className="w-4.5 h-4.5"
					onClick={() =>
						setOpenModal((prev) => ({
							...prev,
							note: note,
							mode: "delete",
						}))
					}
				/>
				<ArchiveIcon
					className="w-4.5 h-4.5"
					onClick={() =>
						setOpenModal((prev) => ({
							...prev,
							note: note,
							mode: "archive",
						}))
					}
				/>
				<p className="text-5 cursor-pointer">Cancel</p>
				<p className="text-5 cursor-pointer text-blue-500">Save Note</p>
			</div>
			<AnimatePresence>
				{openModal.note && (
					<DeleteArchiveModal
						note={openModal.note}
						mode={openModal.mode}
						close={closeModal}
						deleted={() => {
							unselect();
						}}
					/>
				)}
			</AnimatePresence>
		</div>
	);
};

export default NoteControl;
