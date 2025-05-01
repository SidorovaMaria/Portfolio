// src/redux/notesSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { notes } from "../assets/data/data.json";
import Archived from "../pages/Archived";

// Helper to generate unique IDs for notes
const generateIds = (note) => ({
	...note,
	id: uuidv4(),
});

// Async thunk to load notes
export const loadNotes = createAsyncThunk("/notes/loadNotes", async () => {
	const storedNotes = localStorage.getItem("notes");
	if (storedNotes) {
		return JSON.parse(storedNotes);
	}

	const initialNotes = notes.map(generateIds);

	localStorage.setItem("notes", JSON.stringify(initialNotes));
	return initialNotes;
});

// Helper to persist notes to localStorage

// Initial state
const initialState = {
	allNotes: [],
	tags: [],
};

const notesSlice = createSlice({
	name: "notes",
	initialState,
	reducers: {
		// (Optional) Example reducer if you want to clear notes later
		resetNotes: (state) => {
			state.allNotes = [];
			state.tags = [];
			localStorage.removeItem("notes");
		},
		deleteNote: (state, action) => {
			state.allNotes = state.allNotes.filter((note) => note.id !== action.payload);
			localStorage.setItem("notes", JSON.stringify(state.allNotes));
		},
		archiveNote: (state, action) => {
			const note = state.allNotes.find((note) => note.id === action.payload);
			if (note) {
				note.isArchived = !note.isArchived;
			}
			localStorage.setItem("notes", JSON.stringify(state.allNotes));
		},
	},
	extraReducers: (builder) => {
		builder.addCase(loadNotes.fulfilled, (state, action) => {
			state.allNotes = action.payload;

			state.tags = action.payload.reduce((acc, note) => {
				note.tags.forEach((tag) => {
					// Check if tag already exists in acc
					if (!acc.some((t) => t.name === tag)) {
						acc.push({ id: tag.toLowerCase(), name: tag });
					}
				});
				return acc;
			}, []);
		});
	},
});

export const { resetNotes, deleteNote, archiveNote } = notesSlice.actions;
export default notesSlice.reducer;
