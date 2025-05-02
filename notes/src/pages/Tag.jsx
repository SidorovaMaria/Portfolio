import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

import PageLayout from "../layout/PageLayout";
const Tag = () => {
	const { tag } = useParams();

	const { allNotes, tags } = useSelector((state) => state.notes);
	const selectedTag = tags.filter((t) => t.id === tag)[0];
	const notesByTag = allNotes.filter((note) => note.tags.includes(selectedTag.name));
	const hasMounted = useRef(false);
	useEffect(() => {
		if (!hasMounted.current) {
			hasMounted.current = true;
		}
	}, []);
	return (
		<PageLayout
			title={`Notes tagged: ${selectedTag.name}`}
			intro={`All notes with the "${selectedTag.name}" tag are shown here.`}
			notes={notesByTag}
			disableInitialAnimation={hasMounted.current}
			tag={true}
			noNotesText={`No notes found with the "${selectedTag.name}" tag.`}
		/>
	);
};

export default Tag;
