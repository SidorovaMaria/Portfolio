import React from "react";
import NoteControl from "./NoteControl";
// import { useFormik } from "formik";
import TagIcon from "../assets/images/icon-tag.svg?react";
import TimeIcon from "../assets/images/icon-clock.svg?react";
const CreateNewNote = ({ unselect }) => {
	// const formik = useFormik({
	// 	initialValues: {
	// 		title: "",
	// 		tags: "",
	// 		date: "",
	// 		content: "",
	// 	},
	// });
	return (
		<React.Fragment>
			<NoteControl unselect={unselect} noDelete={true} noArchive={true} />

			<input
				type="text"
				name="title"
				placeholder="Enter a title..."
				className="text-2 placeholder:text-n-950"
			/>
			<div className="flex flex-col gap-2">
				<div className="grid grid-cols-[1fr_2fr] items-center min-h-[28px]">
					<label
						htmlFor="tags"
						className="text-6 text-n-700 flex items-center gap-1.5 py-1"
					>
						<TagIcon className="w-4 h-4" />
						<p className=" text-n-700">Tags</p>
					</label>
					<textarea
						type="text"
						name="tags"
						id="tags"
						placeholder="Add tags separated by commas (e.g. Work, Planning)"
						className="text-6 placeholder:text-n-400 flex-1 w-full h-full p-1"
					/>
				</div>
				<div className="grid grid-cols-[1fr_2fr] items-center min-h-[28px]">
					<label
						htmlFor="tags"
						className="text-6 text-n-700 flex items-center gap-1.5 py-1"
					>
						<TimeIcon className="w-4 h-4" />
						<p className=" text-n-700">Last Edited</p>
					</label>
					<input
						readOnly
						disabled
						type="text"
						name="date"
						id="date"
						placeholder="Not yet Saved"
						className="text-6 placeholder:text-n-400 flex-1 w-full h-full p-1"
					/>
				</div>
			</div>
			<hr className="border-n-200 dark:border-n-800" />
		</React.Fragment>
	);
};

export default CreateNewNote;
