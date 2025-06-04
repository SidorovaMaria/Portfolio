import { useEffect, useState } from "react";

export type FontType = "sans" | "serif" | "mono";
export function useFont() {
	const [font, setFont] = useState<FontType>("sans");

	useEffect(() => {
		const stored = localStorage.getItem("font-family");
		if (stored === "serif" || stored === "mono") {
			setFont(stored);
			document.documentElement.classList.add(stored);
		} else {
			document.documentElement.classList.add("sans");
		}
	}, []);

	const changeFont = (newFont: FontType) => {
		document.documentElement.classList.remove("sans", "serif", "mono");
		document.documentElement.classList.add(newFont);
		setFont(newFont);
		localStorage.setItem("font-family", newFont);
	};

	return { font, changeFont };
}
