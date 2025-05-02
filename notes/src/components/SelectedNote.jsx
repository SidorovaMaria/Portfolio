import React, { useMemo } from "react";
import NoteControl from "./NoteControl";
import TagIcon from "../assets/images/icon-tag.svg?react";
import TimeIcon from "../assets/images/icon-clock.svg?react";
import StatusIcon from "../assets/images/icon-status.svg?react";
import { useFormik } from "formik";

import { useDispatch, useSelector } from "react-redux";
import { addNote, editNote } from "../redux/notesSlice";
import CustomToast from "./CustomToast";
import toast from "react-hot-toast";

const SelectedNote = ({ note, unselect }) => {
	const dispatch = useDispatch();
	const updatedNote = useSelector((state) => state.notes.allNotes.find((n) => n.id === note.id));

	const formattedDate = useMemo(() => {
		return new Date(updatedNote.lastEdited).toLocaleDateString("en-GB", {
			day: "2-digit",
			month: "short",
			year: "numeric",
		});
	}, [updatedNote]);

	const initialValues = useMemo(() => {
		if (note === "new") {
			return {
				title: "",
				tags: "",
				lastEdited: "Not yet saved",
				content: "",
				status: "",
			};
		} else {
			const noteToUse = updatedNote || note;
			return {
				title: noteToUse.title || "",
				tags: noteToUse.tags ? noteToUse.tags.join(",") : "",
				lastEdited: noteToUse.lastEdited ? formattedDate : "",
				content: noteToUse.content || "",
				status: noteToUse.isArchived ? "Archived" : "",
			};
		}
	}, [note, updatedNote, formattedDate]);

	const formik = useFormik({
		initialValues,
		enableReinitialize: true,
		onSubmit: (values) => {
			if (note === "new") {
				const newNote = {
					title: values.title,
					tags: values.tags.split(",").map((tag) => tag.trim()),
					lastEdited: new Date().toISOString(),
					content: values.content,
				};
				dispatch(addNote(newNote));
				toast.custom((t) => <CustomToast t={t} message="Note saved successfully!" />);
			} else {
				const updatedNote = {
					...note,
					title: values.title,
					tags: values.tags.split(",").map((tag) => tag.trim()),
					lastEdited: new Date().toISOString(),
					content: values.content,
				};
				dispatch(editNote(updatedNote));
				toast.custom((t) => <CustomToast t={t} message="Note updated successfully!" />);
			}
		},
	});

	const noteChanged = useMemo(() => {
		return Object.keys(initialValues).some((key) => formik.values[key] !== initialValues[key]);
	}, [formik.values, initialValues]);

	const handleCancel = () => {
		formik.resetForm({ values: initialValues });
	};

	return (
		<>
			<NoteControl
				unselect={unselect}
				note={note}
				noDelete={note === "new"}
				noArchive={note === "new" || note.isArchived}
				noRestore={note ? !note.isArchived : true}
				disabled={!noteChanged}
				handleCancel={handleCancel}
				handleSave={formik.handleSubmit}
				hasUnsavedChanges={noteChanged}
			/>

			<input
				type="text"
				name="title"
				placeholder="Enter a title..."
				className="text-2 rounded-4 placeholder:text-n-400 focus:outline-none focus:border-b focus:border-b-n-400 focus:ring-0"
				value={formik.values.title}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
			/>

			<div className="flex flex-col gap-2">
				<div className="grid grid-cols-[1fr_2fr] items-center min-h-[28px]">
					<label htmlFor="tags" className="py-1 rounded-[36px] flex items-center gap-1.5">
						<TagIcon className="w-4 h-4 text-n-700 dark:text-n-300" />
						<p className="text-n-700 dark:text-n-300 text-6">Tags</p>
					</label>
					<input
						name="tags"
						id="tags"
						placeholder="Add tags separated by commas"
						className="text-6 placeholder:text-n-400 flex-1 w-full h-full px-1 py-0.5 rounded-4 focus:outline-1 focus:outline-offset-2 focus:outline-n-500"
						value={formik.values.tags}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
				</div>
				{formik.values.status && (
					<div className="grid grid-cols-[1fr_2fr] items-center min-h-[28px]">
						<label
							htmlFor="status"
							className="py-1 rounded-[36px] flex items-center gap-1.5"
						>
							<StatusIcon className="w-4 h-4 text-n-700 dark:text-n-300" />
							<p className="text-n-700 dark:text-n-300 text-6">Status</p>
						</label>
						<input
							name="status"
							id="status"
							disabled
							placeholder=""
							className="text-6 placeholder:text-n-400 flex-1 w-full h-full px-1 py-0.5 rounded-4 focus:outline-1 focus:outline-offset-2 focus:outline-n-500"
							value={formik.values.status}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
				)}

				<div className="grid grid-cols-[1fr_2fr] items-center min-h-[28px]">
					<label
						htmlFor="lastEdited"
						className="py-1 rounded-[36px] flex items-center gap-1.5"
					>
						<TimeIcon className="w-4 h-4 text-n-700 dark:text-n-300" />
						<p className="text-n-700 dark:text-n-300 text-6">Last edited</p>
					</label>
					<input
						name="lastEdited"
						id="lastEdited"
						placeholder="Not yet Saved"
						className="text-6 text-n-600 dark:text-n-300 placeholder:text-n-400 flex-1 w-full h-full p-1"
						value={formik.values.lastEdited}
						disabled
					/>
				</div>
			</div>

			<hr className="border-n-200 dark:border-n-800" />

			<textarea
				id="content"
				name="content"
				value={formik.values.content}
				onChange={formik.handleChange}
				placeholder="Start typing your note here…"
				className="min-h-[50vh] text-6 placeholder:text-n-400 text-5 px-1 py-0.5 rounded-4 focus:outline-1 focus:outline-offset-2 focus:outline-n-500"
			/>

			<hr className="border-n-200 dark:border-n-800 hidden lg:block" />

			<div className="items-center gap-4 w-full hidden lg:flex">
				<button
					className="primary-btn-blue py-3 px-4"
					onClick={formik.handleSubmit}
					type="submit"
					disabled={!noteChanged}
				>
					Save Note
				</button>
				<button className="secondary-btn" onClick={handleCancel} disabled={!noteChanged}>
					Cancel
				</button>
			</div>
		</>
	);
};

export default SelectedNote;
