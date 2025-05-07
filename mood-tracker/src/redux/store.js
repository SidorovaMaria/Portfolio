import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import moodReducer from "./moodSlice";
const store = configureStore({
	reducer: {
		auth: authReducer,
		mood: moodReducer,
	},
});
export default store;
