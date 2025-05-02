import React, { useEffect, useRef } from "react";

import { useSelector } from "react-redux";

import PageLayout from "../layout/PageLayout";

const AllNotes = () => {
	const { allNotes } = useSelector((state) => state.notes);
	const activeNotes = allNotes.filter((note) => !note.isArchived);

	const hasMounted = useRef(false);
	useEffect(() => {
		if (!hasMounted.current) {
			hasMounted.current = true;
		}
	}, []);
	return (
		<PageLayout
			title="All Notes"
			notes={activeNotes}
			disableInitialAnimation={hasMounted.current}
			noNotesText={
				"You don’t have any notes yet. Start a new note to capture your thoughts and ideas."
			}
		/>
	);
};

export default AllNotes;
