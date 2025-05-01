import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { useIsDesktop } from "../app/hooks";
import PlusIcon from "../assets/images/icon-plus.svg?react";
import ArrowLeftIcon from "../assets/images/icon-arrow-left.svg?react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "motion/react";
import LeftSide from "../layout/LeftSide";
import SelectedNote from "../components/SelectedNote";
import RightSide from "../layout/RightSide";
const Tag = () => {
	const { tag } = useParams();
	const navigate = useNavigate();
	const { allNotes, tags } = useSelector((state) => state.notes);
	const selectedTag = tags.filter((t) => t.id === tag)[0];
	const notesByTag = allNotes.filter((note) => note.tags.includes(selectedTag.name));
	const isDesktop = useIsDesktop();
	const [selectedNote, setSelectedNote] = useState(null);
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
						<button className="flex gap-1 text-n-600 items-center lg:hidden">
							<ArrowLeftIcon className="w-4.5 h-4.5" />
							<p className="text-5 cursor-pointer" onClick={() => navigate(-1)}>
								Go Back
							</p>
						</button>

						<h1 className="text-1 lg:hidden ">Notes Tagged: {selectedTag.name}</h1>
						<p className="text-5 text-n-700 dark:text-n-200">
							{" "}
							All notes with the ”{selectedTag.name}” tag are shown here.
						</p>
						<ul className="flex flex-col gap-1 w-full">
							{notesByTag.map((note, index) => {
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
		</motion.section>
	);
};

export default Tag;
