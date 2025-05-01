import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import DeleteIcon from "../../assets/images/icon-delete.svg?react";
import ArchiveIcon from "../../assets/images/icon-archive.svg?react";
import { useDispatch } from "react-redux";
import { archiveNote, deleteNote } from "../../redux/notesSlice";
import CheckIcon from "../../assets/images/icon-checkmark.svg?react";
import CrossIcon from "../../assets/images/icon-cross.svg?react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import CustomToast from "../CustomToast";
const DeleteArchiveModal = ({ note, mode, close, deleted }) => {
	console.log(note);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleDeleteArchive = () => {
		if (mode === "delete") {
			close();
			toast.custom((t) => <CustomToast t={t} message="Note permamently deleted" />);
			setTimeout(() => {
				dispatch(deleteNote(note.id));
				deleted();
			}, 500);
		} else {
			dispatch(archiveNote(note.id));
			toast.custom((t) => (
				<CustomToast
					t={t}
					message="Note Archived"
					linkText="Archived Notes"
					onLinkClick={() => navigate("/archived")}
				/>
			));
		}
	};
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.2 }}
			className="fixed flex justify-center items-center z-50 top-0 w-screen left-0 h-screen bg-black/50 px-4"
			onClick={close}
		>
			<motion.div
				initial={{ y: -200, scaleX: 0.8, opacity: 0 }}
				animate={{ y: 0, scaleX: 1, opacity: 1 }}
				exit={{ y: 200, scaleX: 0.8, opacity: 0 }}
				transition={{ duration: 0.35, ease: "easeOut" }}
				className="w-full md:w-[440px] md:mx-auto bg-white rounded-12 flex flex-col"
			>
				<div onClick={(e) => e.stopPropagation()} className="flex items-start gap-4 p-5">
					<div className="flex items-center justify-center w-10 h-10 rounded-8 ">
						{mode === "delete" ? (
							<DeleteIcon className="w-6 h-auto" />
						) : (
							<ArchiveIcon className="w-6 h-auto" />
						)}
					</div>
					<div className="flex flex-col gap-1.5 items-start">
						<h3 className="text-3">
							{mode === "delete" ? "Delete Note" : "Archive Note"}
						</h3>
						<p className="text-5 text-n-700 dark:text-n-300">
							{mode === "delete"
								? "Are you sure you want to permanently delete this note? This action cannot be undone."
								: "Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime."}
						</p>
					</div>
				</div>
				<hr className="border-b border-n-200 dark:border-n-800 w-full" />
				<div className="flex items-center gap-4 justify-end px-5 py-4">
					<button className="secondary-btn" onClick={close}>
						Cancel
					</button>
					<button
						onClick={handleDeleteArchive}
						className={`${mode === "delete" ? "primary-btn-red" : "primary-btn-blue"}`}
					>
						{mode === "delete" ? "Delete Note" : "Archive Note"}
					</button>
				</div>
			</motion.div>
		</motion.div>
	);
};

export default DeleteArchiveModal;
