import React, { useEffect, useRef, useState } from "react";
import LeftSide from "../layout/LeftSide";
import { useSelector } from "react-redux";
import RightSide from "../layout/RightSide";
import PlusIcon from "../assets/images/icon-plus.svg?react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "motion/react";
import SelectedNote from "../components/SelectedNote";
import { useIsDesktop } from "../app/hooks";

const AllNotes = () => {
	const { allNotes } = useSelector((state) => state.notes);
	const [selectedNote, setSelectedNote] = useState(null);
	const isDesktop = useIsDesktop();
	const hasMounted = useRef(false);
	useEffect(() => {
		if (!hasMounted.current) {
			hasMounted.current = true;
		}
	}, []);

	return (
		<motion.section className="flex ">
			<AnimatePresence>
				{(isDesktop || selectedNote === null) && (
					<LeftSide
						className="relative"
						selected={selectedNote}
						disableInitialAnimation={hasMounted.current}
					>
						<button className="text-4 primary-btn-blue hidden lg:block">
							+ Create New Note
						</button>

						<button className="fixed bottom-[calc(16px+56px)] md:bottom-[calc(32px+74px)] right-4 md:right-[35px] h-12 md:h-16 md:w-16 w-12 bg-blue-500 rounded-full flex items-center justify-center lg:hidden shadow-[0px_7px_11px_rgba(202,207,216,1)]">
							<PlusIcon className="text-n-0 w-8 h-8" />
						</button>

						<h1 className="text-1 lg:hidden ">All Notes</h1>

						<ul className="flex flex-col gap-1 w-full">
							{allNotes.map((note, index) => {
								const formattedDate = new Date(note.lastEdited).toLocaleDateString(
									"en-GB",
									{
										day: "2-digit",
										month: "short",
										year: "numeric",
									}
								);

								return (
									<React.Fragment key={note.id}>
										<article
											className="p-2 flex flex-col gap-3 cursor-pointer"
											onClick={() => setSelectedNote(note)}
										>
											<h2 className="text-3">{note.title}</h2>
											<div className="flex gap-1 w-fit">
												{note.tags.map((tag) => (
													<div
														className="px-1.5 py-0.5 rounded-4 bg-n-200 text-6"
														key={`${tag}-${index}`}
													>
														{tag}
													</div>
												))}
											</div>
											<div className="rounded-[36px]">
												<p className="text-6 text-n-700">{formattedDate}</p>
											</div>
										</article>
										<hr className="border-n-200 dark:border-n-800" />
									</React.Fragment>
								);
							})}
						</ul>
					</LeftSide>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{selectedNote && (
					<RightSide keyModal={selectedNote.id}>
						<SelectedNote note={selectedNote} unselect={() => setSelectedNote(null)} />
					</RightSide>
				)}
			</AnimatePresence>

			{/* <RightSide></RightSide> */}
		</motion.section>
	);
};

export default AllNotes;
const NoNotes = () => {
	return (
		<div className="p-2 rounded-8 border bg-n-100 border-n-200">
			<p className="text-5">
				You don’t have any notes yet. Start a new note to capture your thoughts and ideas.
			</p>
		</div>
	);
};
