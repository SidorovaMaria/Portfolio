import React, { useState } from "react";
import NoteControl from "./NoteControl";
import TagIcon from "../assets/images/icon-tag.svg?react";
import TimeIcon from "../assets/images/icon-clock.svg?react";

const SelectedNote = ({ note, unselect }) => {
	const formattedDate = new Date(note.lastEdited).toLocaleDateString("en-GB", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	});
	const [noteContent, setNoteContent] = useState(note.content);
	const handleChange = (e) => {
		setNoteContent(e.target.value);
	};
	return (
		<React.Fragment>
			<NoteControl unselect={unselect} note={note} />
			<h2 className="text-1">{note.title}</h2>
			{/* Tags  */}
			<aside className="grid grid-cols-[3fr_5fr] grid-rows-2 row-gap-1 col-gap-2 text-6 md:grid-cols-[2fr_6fr] items-center">
				<div className="flex items-center gap-1.5 py-1">
					<TagIcon className="w-4 h-4" />
					<p className=" text-n-700">Tags</p>
				</div>
				<p>{note.tags.join(",")}</p>
				<div className="flex items-center gap-1.5 py-1">
					<TimeIcon className="w-4 h-4" />
					<p className=" text-n-700">Last edited</p>
				</div>
				<p className="text-n-700">{formattedDate}</p>
			</aside>
			<hr className="border-n-200 dark:border-n-800 " />
			<textarea value={noteContent} className="min-h-[60vh]" onChange={handleChange} />
			<hr className="border-n-200 dark:border-n-800 hidden lg:block" />
			<div className=" items-center gap-4 w-ful hidden lg:flex">
				<button className="primary-btn-blue py-3 px-4">Save Note</button>
				<button className="secondary-btn">Cancel</button>
			</div>
		</React.Fragment>
	);
};

export default SelectedNote;
