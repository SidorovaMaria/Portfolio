import React, { useState } from "react";
import { useIsDesktop } from "../app/hooks";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "motion/react";
import LeftSide from "./LeftSide";
import PlusIcon from "../assets/images/icon-plus.svg?react";
import ArrowLeftIcon from "../assets/images/icon-arrow-left.svg?react";
import SearchIcon from "../assets/images/icon-search.svg?react";
import RightSide from "./RightSide";
import SelectedNote from "../components/SelectedNote";
import { useNavigate } from "react-router";
import CreateNewNote from "../components/CreateNewNote";

const PageLayout = ({
	title,
	intro,
	notes,
	disableInitialAnimation,
	tag,
	noNotesText,
	search = false,
	searchValue,
	onSearchChange,
}) => {
	const navigate = useNavigate();
	const isDesktop = useIsDesktop();
	const [selectedNote, setSelectedNote] = useState(null);
	const [newNote, setNewNote] = useState(false);

	return (
		<motion.section className="flex ">
			<AnimatePresence>
				{(isDesktop || (selectedNote === null && !newNote)) && (
					<LeftSide
						className={"relative"}
						selected={selectedNote}
						disableInitialAnimation={disableInitialAnimation}
					>
						<button
							className="text-4 primary-btn-blue hidden lg:block"
							onClick={() => setSelectedNote("new")}
						>
							+ Create New Note
						</button>
						<button
							className="fixed bottom-[calc(16px+56px)] md:bottom-[calc(32px+74px)] right-4 md:right-[35px] h-12 md:h-16 md:w-16 w-12 bg-blue-500 rounded-full flex items-center justify-center lg:hidden shadow-[0px_7px_11px_rgba(202,207,216,1)] dark:shadow-[0px_7px_11px_rgba(0,0,0,0.7)]"
							onClick={() => setSelectedNote("new")}
						>
							<PlusIcon className="text-n-0 w-8 h-8" />
						</button>
						{tag && (
							<button className="flex gap-1 text-n-600 dark:text-n-300 items-center lg:hidden">
								<ArrowLeftIcon className="w-4.5 h-4.5" />
								<p
									className="text-5 cursor-pointer text-"
									onClick={() => navigate(-1)}
								>
									All Tags
								</p>
							</button>
						)}
						<h1 className="text-1 lg:hidden ">{title}</h1>

						{search && (
							<div
								className="flex gap-2 px-4 text-5 py-3 border rounded-8 border-n-300 dark:border-n-600 placeholder:text-n-500
                    hover:bg-n-50 dark:hover:bg-n-800
                has-focus:border-n-950 dark:has-focus:border-n-600 has-focus:outline-offset-2 has-focus:outline-2 has-focus:outline-n-500 dark:has-focus:outline-n-600 lg:hidden"
							>
								<SearchIcon />
								<input
									type="text"
									placeholder="Search notes..."
									value={searchValue}
									onChange={onSearchChange}
									className="outline-none"
								/>
							</div>
						)}
						{intro && <p className="text-5 text-n-700 dark:text-n-200">{intro}</p>}

						{notes.length !== 0 ? (
							<ul className="flex flex-col-reverse gap-1 w-full">
								{notes.map((note, index) => {
									const formattedDate = new Date(
										note.lastEdited
									).toLocaleDateString("en-GB", {
										day: "2-digit",
										month: "short",
										year: "numeric",
									});

									return (
										<React.Fragment key={note.id}>
											<article
												className={` rounded-6 p-2 flex flex-col gap-3 cursor-pointer 
                                                hover:bg-n-200
                                                dark:hover:bg-n-700 group ${
													note.id === selectedNote?.id &&
													"bg-n-100 dark:bg-n-800"
												}`}
												onClick={() => {
													setSelectedNote(note);
													setNewNote(false);
												}}
											>
												<h2 className="text-3">{note.title}</h2>
												<div className="flex gap-1 w-fit">
													{note.tags.map((tag) => (
														<div
															className={`px-1.5 py-0.5 rounded-4 bg-n-200 text-6 dark:bg-n-700 
                                                            dark:group-hover:bg-n-600
                                                             group-hover:bg-n-300
                                                            dark:text-n-0 ${
																note.id === selectedNote?.id &&
																"dark:bg-n-600!"
															}`}
															key={`${tag}-${index}`}
														>
															{tag}
														</div>
													))}
												</div>
												<div className="rounded-[36px]">
													<p className="text-6 text-n-700 dark:text-n-300">
														{formattedDate}
													</p>
												</div>
											</article>
											<hr
												className={`border-n-200 dark:border-n-800  ${
													index == notes.length - 1 && "hidden"
												}`}
											/>
										</React.Fragment>
									);
								})}
							</ul>
						) : (
							<div className="bg-n-100 dark:bg-n-800 border border-n-200 dark:border-n-700 text-5 rounded-8 p-2">
								<p>{noNotesText}</p>
							</div>
						)}
					</LeftSide>
				)}
			</AnimatePresence>
			<AnimatePresence>
				{selectedNote && (
					<RightSide keyModal={selectedNote.id || "new"}>
						<SelectedNote note={selectedNote} unselect={() => setSelectedNote(null)} />
					</RightSide>
				)}
			</AnimatePresence>
		</motion.section>
	);
};

export default PageLayout;
