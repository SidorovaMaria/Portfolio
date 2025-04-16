import { createContext, useContext } from "react";

export const ThemeProviderContext = createContext({
	theme: "system",
	setTheme: () => null,
});

export const useTheme = () => {
	const context = useContext(ThemeProviderContext);

	if (context === undefined)
		throw new Error("useTheme must be used within a ThemeProvider");

	return context;
};
