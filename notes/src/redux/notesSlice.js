// src/redux/notesSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { notes } from "../assets/data/data.json";

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
	searchQuery: "",
	filteredNotes: [],
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
		addNote: (state, action) => {
			const newNote = { ...action.payload, id: uuidv4(), isArchived: false };
			state.allNotes.push(newNote);
			newNote.tags.forEach((tag) => {
				if (!state.tags.some((t) => t.name === tag)) {
					state.tags.push({ id: tag.toLowerCase(), name: tag });
				}
			});
			localStorage.setItem("notes", JSON.stringify(state.allNotes));
		},
		editNote: (state, action) => {
			const noteIndex = state.allNotes.findIndex((note) => note.id === action.payload.id);
			if (noteIndex !== -1) {
				const updatedNote = { ...state.allNotes[noteIndex], ...action.payload };
				state.allNotes[noteIndex] = updatedNote;

				// Check updated note tags for any new ones
				updatedNote.tags.forEach((tag) => {
					if (!state.tags.some((t) => t.name === tag)) {
						state.tags.push({ id: tag.toLowerCase(), name: tag });
					}
				});

				localStorage.setItem("notes", JSON.stringify(state.allNotes));
			}
		},
		setSearchQuery: (state, action) => {
			state.searchQuery = action.payload;

			const lowerQuery = action.payload.toLowerCase();
			state.filteredNotes = state.allNotes.filter(
				(note) =>
					note.title.toLowerCase().includes(lowerQuery) ||
					note.content.toLowerCase().includes(lowerQuery) ||
					note.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
			);
		},
		clearSearch: (state) => {
			state.searchQuery = "";
			state.filteredNotes = [];
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

export const {
	resetNotes,
	deleteNote,
	archiveNote,
	addNote,
	editNote,
	setSearchQuery,
	clearSearch,
} = notesSlice.actions;
export default notesSlice.reducer;
