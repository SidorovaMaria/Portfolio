import React, { useState } from "react";
import ArrowLeftIcon from "../assets/images/icon-arrow-left.svg?react";
import DeletIcon from "../assets/images/icon-delete.svg?react";
import ArchiveIcon from "../assets/images/icon-archive.svg?react";
import { AnimatePresence } from "motion/react";
import DeleteArchiveModal from "./modals/DeleteArchiveModal";
import RestoreIcon from "../assets/images/icon-restore.svg?react";
import { useDispatch } from "react-redux";
import { archiveNote } from "../redux/notesSlice";
import toast from "react-hot-toast";
import CustomToast from "./CustomToast";
import { useNavigate } from "react-router";
const NoteControl = ({
	unselect,
	note,
	noDelete = false,
	noArchive = false,
	disabled,
	handleSave,
	handleCancel,
	noRestore,
	hasUnsavedChanges,
}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
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
	const handleGoBack = () => {
		if (hasUnsavedChanges) {
			setOpenModal((prev) => ({
				...prev,
				note: note,
				mode: "unsaved",
			}));
		} else {
			unselect();
		}
	};
	return (
		<div className="flex justify-between pb-3 border-b border-n-200 lg:hidden text-n-600 dark:text-n-300  dark:border-n-800">
			<div className="flex gap-1 items-center">
				<ArrowLeftIcon className="w-4.5 h-4.5" />
				<p className="text-5 cursor-pointer" onClick={handleGoBack}>
					Go Back
				</p>
			</div>
			<div className="flex gap-4 items-center">
				{!noDelete && (
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
				)}

				{!noArchive && (
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
				)}
				{!noRestore && (
					<RestoreIcon
						className="w-4.5 h-4.5"
						onClick={() => {
							dispatch(archiveNote(note.id));
							unselect();
							toast.custom((t) => (
								<CustomToast
									t={t}
									message="Note restored to active notes."
									linkText="All Notes"
									onLinkClick={() => navigate("/")}
								/>
							));
						}}
					/>
				)}
				<button
					className="text-5 cursor-pointer disabled:text-n-500"
					disabled={disabled}
					onClick={handleCancel}
				>
					Cancel
				</button>
				<button
					className="text-5 cursor-pointer text-blue-500 disabled:text-blue-500/20"
					disabled={disabled}
					type="submit"
					onClick={handleSave}
				>
					Save Note
				</button>
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
