import { createSlice } from "@reduxjs/toolkit";

const THEME_KEY = "notes-theme";
const FONT_KEY = "notes-font";

const getSystemTheme = () =>
	window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

// Apply theme to <html>
const applyTheme = (theme) => {
	const root = document.documentElement;
	root.classList.remove("light", "dark");

	const resolvedTheme = theme === "system" ? getSystemTheme() : theme;
	root.classList.add(resolvedTheme);
	localStorage.setItem(THEME_KEY, theme);
};

// Apply font to <html>
const applyFont = (font) => {
	const root = document.documentElement;
	root.classList.remove("font-sans", "font-serif", "font-code");

	switch (font) {
		case "sans":
			root.classList.add("font-sans");
			break;
		case "serif":
			root.classList.add("font-serif");
			break;
		case "code":
			root.classList.add("font-code");
			break;
		default:
			break;
	}
	localStorage.setItem(FONT_KEY, font);
};

const themeSlice = createSlice({
	name: "theme",
	initialState: {
		theme: localStorage.getItem(THEME_KEY) || "system", // default to system theme
		font: localStorage.getItem(FONT_KEY) || "sans", // default to sans font
	},
	reducers: {
		setTheme: (state, action) => {
			state.theme = action.payload;
			applyTheme(action.payload);
		},
		setFont: (state, action) => {
			state.font = action.payload;
			applyFont(action.payload);
		},
	},
});

// Apply initial theme and font on load
applyTheme(localStorage.getItem(THEME_KEY) || "system");
applyFont(localStorage.getItem(FONT_KEY) || "sans");

export const { setTheme, setFont } = themeSlice.actions;
export default themeSlice.reducer;
