import React from "react";
import PageLayout from "../layout/PageLayout";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../redux/notesSlice";

const Search = () => {
	const dispatch = useDispatch();
	const { searchQuery, filteredNotes, allNotes } = useSelector((state) => state.notes);

	return (
		<PageLayout
			title={"Search"}
			intro={`All notes matching "${searchQuery}" are displayed below.`}
			notes={filteredNotes.length > 0 || searchQuery !== "" ? filteredNotes : allNotes}
			search
			noNotesText={
				"No notes match your search. Try a different keyword or create a new note."
			}
			searchValue={searchQuery}
			onSearchChange={(e) => dispatch(setSearchQuery(e.target.value))}
		/>
	);
};

export default Search;
