import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import DeleteIcon from "../../assets/images/icon-delete.svg?react";
import ArchiveIcon from "../../assets/images/icon-archive.svg?react";
import { useDispatch } from "react-redux";
import { archiveNote, deleteNote } from "../../redux/notesSlice";
import InfoIcon from "../../assets/images/icon-info.svg?react";
import CrossIcon from "../../assets/images/icon-cross.svg?react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import CustomToast from "../CustomToast";
const DeleteArchiveModal = ({ note, mode, close, deleted }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const modalConfig = {
		delete: {
			title: "Delete Note",
			description:
				"Are you sure you want to permanently delete this note? This action cannot be undone.",
			buttonLabel: "Delete Note",
			buttonClass: "primary-btn-red",
			icon: <DeleteIcon className="w-6 h-6" />,
			action: () => {
				close();

				toast.custom((t) => <CustomToast t={t} message="Note permamently deleted" />);
				setTimeout(() => {
					dispatch(deleteNote(note.id));
				}, 500);
				deleted();
			},
		},
		archive: {
			title: "Archive Note",
			description:
				"Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime.",
			buttonLabel: "Archive Note",
			buttonClass: "primary-btn-blue",
			icon: <ArchiveIcon className="w-6 h-6" />,
			action: () => {
				close();
				toast.custom((t) => (
					<CustomToast
						t={t}
						message="Note Archived"
						linkText="Archived Notes"
						onLinkClick={() => navigate("/archived")}
					/>
				));
				setTimeout(() => {
					dispatch(archiveNote(note.id));
					deleted?.();
				}, 500);
			},
		},
		unsaved: {
			title: "Unsaved Changes",
			description: "You have unsaved changes. Are you sure you want to go back?",
			buttonLabel: "Discard Changes",
			buttonClass: "primary-btn-red",
			icon: <InfoIcon className="w-6 h-6" />,
			action: () => {
				close();
				deleted?.();
			},
		},
	};
	const { title, description, buttonLabel, buttonClass, icon, action } = modalConfig[mode] || {};

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
				className="w-full md:w-[440px] md:mx-auto bg-white dark:bg-n-700 rounded-12 flex flex-col"
			>
				<div onClick={(e) => e.stopPropagation()} className="flex items-start gap-4 p-5">
					<div className="flex items-center justify-center w-10 h-10 rounded-8 bg-n-100 dark:bg-n-600 shrink-0 text-n-950 dark:text-white ">
						{icon}
					</div>
					<div className="flex flex-col gap-1.5 items-start">
						<h3 className="text-3 text-n-950 dark:text-n-0">{title}</h3>
						<p className="text-5 text-n-700 dark:text-n-200">{description}</p>
					</div>
				</div>
				<hr className="border-b border-n-200 dark:border-n-800 w-full" />
				<div className="flex items-center gap-4 justify-end px-5 py-4">
					<button className="secondary-btn" onClick={close}>
						Cancel
					</button>
					<button onClick={action} className={buttonClass}>
						{buttonLabel}
					</button>
				</div>
			</motion.div>
		</motion.div>
	);
};

export default DeleteArchiveModal;
