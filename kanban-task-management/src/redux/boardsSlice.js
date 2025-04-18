import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import data from "../data/data.json"; //Provided data by FrontEndMentor

export const loadBoards = createAsyncThunk("board/loadBoards", async () => {
	const savedBoards = localStorage.getItem("kanbanBoards");

	if (savedBoards) {
		// If alreade have (modified boards)
		return JSON.parse(savedBoards);
	} else {
		// If no boards exit originally, save the provided data to the localStorage
		const initializedBoards = data.boards.map(generateBoardIds); // ← generate IDs first
		localStorage.setItem("kanbanBoards", JSON.stringify(initializedBoards));
		return initializedBoards;
	}
});
export const generateBoardIds = (board) => {
	const boardWithId = {
		...board,
		id: uuidv4(),
		columns: board.columns.map((column) => ({
			...column,
			id: uuidv4(),
			tasks:
				column.tasks?.map((task) => ({
					...task,
					id: uuidv4(),
					subtasks:
						task.subtasks?.map((sub) => ({
							...sub,
							id: uuidv4(),
						})) || [],
				})) || [],
		})),
	};

	return boardWithId;
};

const boardsSlice = createSlice({
	name: "boards",
	initialState: { boards: [], activeBoard: null }, // Empty initially
	reducers: {
		addBoard: (state, action) => {
			state.boards.push(action.payload);
			localStorage.setItem("kanbanBoards", JSON.stringify(state.boards));
			state.activeBoard = action.payload;
		},
		deleteBoard: (state, action) => {
			state.boards = state.boards.filter((board) => board.id !== action.payload);
			localStorage.setItem("kanbanBoards", JSON.stringify(state.boards));

			// Since the deleted board is the active one,swap it

			state.activeBoard = state.boards[0] || null;
		},
		editBoard: (state, action) => {
			const updatedBoard = action.payload;
			//Find board
			const index = state.boards.findIndex((board) => board.id === updatedBoard.id);
			if (index !== -1) {
				state.boards[index] = updatedBoard;

				// Persist changes to localStorage
				localStorage.setItem("kanbanBoards", JSON.stringify(state.boards));

				// Optional: update activeBoard if it's the one being edited
				if (state.activeBoard?.id === updatedBoard.id) {
					state.activeBoard = updatedBoard;
				}
			}
		},
		setActiveBoard: (state, action) => {
			const found = state.boards.find((board) => board.id === action.payload);
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
export const { addBoard, deleteBoard, setActiveBoard, editBoard } = boardsSlice.actions;

export default boardsSlice.reducer;
