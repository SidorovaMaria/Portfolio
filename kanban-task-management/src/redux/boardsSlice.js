import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import data from "../data/data.json"; //Provided data by FrontEndMentor

export const loadBoards = createAsyncThunk("board/loadBoards", async () => {
	const savedBoards = localStorage.getItem("kanbanBoards");

	if (savedBoards) {
		// If alreade have (modified boards)
		return JSON.parse(savedBoards);
	} else {
		// If no boards exit originally, save the provided data to the localStorage
		localStorage.setItem("kanbanBoards", JSON.stringify(data.boards));
		return data.boards;
	}
});

const boardsSlice = createSlice({
	name: "boards",
	initialState: { boards: [], activeBoard: null }, // Empty initially
	reducers: {
		addBoard: (state, action) => {
			state.push(action.payload);
			localStorage.setItem("kanbanBoards", JSON.stringify(state));
		},
		deleteBoard: (state, action) => {
			const updatedBoards = state.filter((board) => board.slug !== action.payload);
			localStorage.setItem("kanbanBoards", JSON.stringify(updatedBoards));
			return updatedBoards;
		},
		setActiveBoard: (state, action) => {
			const found = state.boards.find((board) => board.slug === action.payload);
			state.activeBoard = found || null;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(loadBoards.fulfilled, (state, action) => {
			state.boards = action.payload;
			state.activeBoard = action.payload.length ? action.payload[0] : null;
		});
	},
});
export const { addBoard, deleteBoard, setActiveBoard } = boardsSlice.actions;

export default boardsSlice.reducer;
