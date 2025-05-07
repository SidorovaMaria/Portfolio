import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state
const initialState = {
	moodEntries: [],
	loading: false,
	error: null,
};

// Async thunk to get mood entries from the server
export const fetchMoodEntries = createAsyncThunk(
	"mood/fetchMoodEntries",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get("/api/moods", {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`, // Or your method of storing the JWT
				},
			});
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data.msg);
		}
	}
);

// Async thunk to add a new mood entry
export const addMoodEntry = createAsyncThunk(
	"mood/addMoodEntry",
	async (entryData, { rejectWithValue }) => {
		try {
			const response = await axios.post("/api/moods", entryData, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});
			return response.data.moodEntry;
		} catch (error) {
			return rejectWithValue(error.response.data.msg);
		}
	}
);

// Async thunk to delete a mood entry
export const deleteMoodEntry = createAsyncThunk(
	"mood/deleteMoodEntry",
	async (entryId, { rejectWithValue }) => {
		try {
			await axios.delete(`/api/moods/${entryId}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});
			return entryId; // Return the ID of the deleted entry
		} catch (error) {
			return rejectWithValue(error.response.data.msg);
		}
	}
);

// Create the slice
const moodSlice = createSlice({
	name: "mood",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// Fetch mood entries
			.addCase(fetchMoodEntries.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchMoodEntries.fulfilled, (state, action) => {
				state.loading = false;
				state.moodEntries = action.payload;
			})
			.addCase(fetchMoodEntries.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})

			// Add mood entry
			.addCase(addMoodEntry.pending, (state) => {
				state.loading = true;
			})
			.addCase(addMoodEntry.fulfilled, (state, action) => {
				state.loading = false;
				state.moodEntries.push(action.payload);
			})
			.addCase(addMoodEntry.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})

			// Delete mood entry
			.addCase(deleteMoodEntry.pending, (state) => {
				state.loading = true;
			})
			.addCase(deleteMoodEntry.fulfilled, (state, action) => {
				state.loading = false;
				state.moodEntries = state.moodEntries.filter(
					(entry) => entry._id !== action.payload
				);
			})
			.addCase(deleteMoodEntry.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export default moodSlice.reducer;
