import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import themeReducer from "./themeSlice";
import notesReducer from "./notesSlice";
export const store = configureStore({
	reducer: {
		auth: authReducer,
		theme: themeReducer,
		notes: notesReducer,
	},
});
