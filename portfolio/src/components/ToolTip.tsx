import React from "react";

interface ToolTipProps {
	text: string;
	children: React.ReactNode;
	className?: string;
	delay?: number;
	position: "top" | "bottom" | "left" | "right" | "mouse";
}

const ToolTip = ({ text, children, position, className, delay }: ToolTipProps) => {
	const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

	// Static positions via Tailwind
	const positionClasses: Record<string, string> = {
		top: "bottom-full mb-2 left-1/2 transform -translate-x-1/2",
		bottom: "top-full mt-2 left-1/2 transform -translate-x-1/2",
		left: "right-full mr-2 top-1/2 transform -translate-y-1/2",
		right: "left-full ml-2 top-1/2 transform -translate-y-1/2",
	};

	React.useEffect(() => {
		if (position === "mouse") {
			const handleMouseMove = (event: MouseEvent) => {
				setMousePosition({ x: event.clientX + 25, y: event.clientY + 15 });
			};

			window.addEventListener("mousemove", handleMouseMove);
			return () => window.removeEventListener("mousemove", handleMouseMove);
		}
	}, [position]);

	return (
		<div className={`relative group font-semibold text-xs ${className} `}>
			{children}
			{position !== "mouse" ? (
				<div
					className={`opacity-0 absolute  bg-coffee-brown px-2 py-1 rounded-md group-hover:opacity-100 transition-opacity duration-300 ease-in-out ${positionClasses[position]}`}
					style={{ animationDelay: `${delay ? delay : 2000}ms` }}
				>
					{text}
				</div>
			) : (
				<div
					style={{
						top: mousePosition.y,
						left: mousePosition.x,
						position: "fixed",
						pointerEvents: "none",
						animationDelay: `${delay ? delay : 2000}ms`,
					}}
					className={`opacity-0 absolute  bg-coffee-brown px-2 py-1 rounded-md group-hover:opacity-100 transition-opacity duration-300 ease-in-out ${positionClasses[position]}`}
				>
					{text}
				</div>
			)}
		</div>
	);
};

export default ToolTip;
