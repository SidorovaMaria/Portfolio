import { configureStore } from "@reduxjs/toolkit";
import boardsReducer from "../redux/boardsSlice";
import themeReducer from "../redux/themeSlice";
const store = configureStore({
	reducer: {
		boards: boardsReducer,
		theme: themeReducer,
	},
});
export default store;
