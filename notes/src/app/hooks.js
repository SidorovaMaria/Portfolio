import { useState, useEffect } from "react";

const DESKTOP_BREAKPOINT = 1024; // You can adjust this to match your Tailwind config if needed

export const useIsDesktop = () => {
	const [isDesktop, setIsDesktop] = useState(window.innerWidth >= DESKTOP_BREAKPOINT);

	useEffect(() => {
		const handleResize = () => {
			setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT);
		};

		window.addEventListener("resize", handleResize);

		// Cleanup on unmount
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return isDesktop;
};
