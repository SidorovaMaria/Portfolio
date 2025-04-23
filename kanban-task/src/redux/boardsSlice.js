import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import data from "../data/data.json";
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

// Assign Id to every component in the data
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
const persistBoards = (boards) => {
	localStorage.setItem("kanbanBoards", JSON.stringify(boards));
};

const boardsSlice = createSlice({
	name: "boards",
	initialState: { boards: [], activeBoard: null }, // Empty initially
	reducers: {
		// Add Board
		addBoard: (state, action) => {
			state.boards.push(action.payload);
			persistBoards(state.boards);
			state.activeBoard = action.payload;
		},
		// Edit Board
		editBoard: (state, action) => {
			const updatedBoard = action.payload;
			const boardIndex = state.boards.findIndex((board) => board.id === updatedBoard.id);
			if (boardIndex !== -1) {
				state.boards[boardIndex] = updatedBoard;
				persistBoards(state.boards);
			}

			state.activeBoard = updatedBoard;
		},
		deleteBoard: (state, action) => {
			state.boards = state.boards.filter((board) => board.id !== action.payload);
			persistBoards(state.boards);
			state.activeBoard = state.boards[0] || null;
		},
		//Change board in view
		setActiveBoard: (state, action) => {
			const found = state.boards.find((board) => board.id === action.payload);
			state.activeBoard = found || null;
		},
		updateSubtaskComplete: (state, action) => {
			const { taskId, subtaskId } = action.payload;
			state.boards = state.boards.map((board) => ({
				...board,
				columns: board.columns.map((column) => ({
					...column,
					tasks: column.tasks.map((task) => {
						if (task.id === taskId) {
							return {
								...task,
								subtasks: task.subtasks.map((subtask) => {
									if (subtask.id === subtaskId) {
										return {
											...subtask,
											isCompleted: !subtask.isCompleted,
										};
									}
									return subtask;
								}),
							};
						}
						return task;
					}),
				})),
			}));
			state.activeBoard = state.boards.find((board) => board.id === state.activeBoard.id);

			persistBoards(state.boards);
		},
		updateTaskStatus: (state, action) => {
			const { task, columnName } = action.payload;
			const currentBoard = state.boards.find((board) => board.id === state.activeBoard.id);
			//Find Current Column
			const currentColumn = currentBoard.columns.find((column) =>
				column.tasks.some((t) => t.id === task.id)
			);
			if (currentColumn) {
				// Remove task from current column
				currentColumn.tasks = currentColumn.tasks.filter((t) => t.id !== task.id);
			}
			// Find the new column
			const futureColumn = currentBoard.columns.find((column) => column.name === columnName);

			if (futureColumn) {
				// Update task's status before pushing
				const updatedTask = { ...task, status: columnName };

				// Add task to new column
				futureColumn.tasks.push(updatedTask);
			}
			state.activeBoard = currentBoard;
			persistBoards(state.boards);
		},
		deleteTask: (state, action) => {
			const { taskId } = action.payload;
			const currentBoard = state.boards.find((board) => board.id === state.activeBoard.id);
			// Find the column that contains the task
			const columnWithTask = currentBoard.columns.find((column) =>
				column.tasks.some((task) => task.id === taskId)
			);
			if (columnWithTask) {
				// Remove the task from the column
				columnWithTask.tasks = columnWithTask.tasks.filter((task) => task.id !== taskId);
			}
			state.activeBoard = currentBoard;
			persistBoards(state.boards);
		},
		updateTask: (state, action) => {
			const { taskId, updatedTask } = action.payload;
			const currentBoard = state.boards.find((board) => board.id === state.activeBoard.id);
			// Find the column that contains the task
			const columnWithTask = currentBoard.columns.find((column) =>
				column.tasks.some((task) => task.id === taskId)
			);
			if (columnWithTask) {
				// Update the task in the column
				columnWithTask.tasks = columnWithTask.tasks.map((task) =>
					task.id === taskId ? { ...task, ...updatedTask } : task
				);
			}
			state.activeBoard = currentBoard;
			persistBoards(state.boards);
		},
		addTask: (state, action) => {
			const { task } = action.payload;
			const currentBoard = state.boards.find((board) => board.id === state.activeBoard.id);
			// Find the column that matches the columnName
			const targetColumn = currentBoard.columns.find((column) => column.name === task.status);
			if (targetColumn) {
				// Add the new task to the target column
				targetColumn.tasks.push(task);
			}
			state.activeBoard = currentBoard;
			persistBoards(state.boards);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(loadBoards.fulfilled, (state, action) => {
			state.boards = action.payload;
			state.activeBoard = action.payload.length ? action.payload[0] : null;
		});
	},
});
export const {
	addBoard,
	editBoard,
	deleteBoard,
	setActiveBoard,
	updateSubtaskComplete,
	updateTaskStatus,
	deleteTask,
	updateTask,
	addTask,

	// deleteBoard,
	// setActiveBoard,
	// editBoard,
	// updateSubtask,
	// updateSubtaskStatus,
	// addNewTask,
	// updateTask,
	// deleteTask,
} = boardsSlice.actions;
export default boardsSlice.reducer;
