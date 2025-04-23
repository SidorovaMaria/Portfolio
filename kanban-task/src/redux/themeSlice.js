import { createSlice } from "@reduxjs/toolkit";

const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const defaultTheme = localStorage.getItem("kanbanTheme") || (systemPrefersDark ? "dark" : "light");

const themeSlice = createSlice({
	name: "theme",
	initialState: {
		value: defaultTheme,
	},
	reducers: {
		toggleTheme: (state) => {
			state.value = state.value === "dark" ? "light" : "dark";
			updateRootTheme(state.value);
		},
		setTheme: (state, action) => {
			state.value = action.payload;
			updateRootTheme(action.payload);
		},
	},
});

const updateRootTheme = (theme) => {
	const root = document.documentElement;
	root.classList.remove("light", "dark");
	root.classList.add(theme);
};

updateRootTheme(defaultTheme); // Set it once on load
export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
