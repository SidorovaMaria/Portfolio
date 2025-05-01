import React, { useEffect, useRef } from "react";

// eslint-disable-next-line no-unused-vars

import { useSelector } from "react-redux";

import PageLayout from "../layout/PageLayout";
const Archived = () => {
	const { allNotes } = useSelector((state) => state.notes);
	const archivedNotes = allNotes.filter((note) => note.isArchived);

	const hasMounted = useRef(false);
	useEffect(() => {
		if (!hasMounted.current) {
			hasMounted.current = true;
		}
	}, []);
	return (
		<PageLayout
			title="Archived Notes"
			intro="All your archived notes are stored here. You can restore or delete them anytime."
			notes={archivedNotes}
			disableInitialAnimation={hasMounted.current}
			noNotesText="No notes have been archived yet. Move notes here for safekeeping, or create a new note."
		/>
	);
};

export default Archived;
