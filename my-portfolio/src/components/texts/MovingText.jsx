import React from "react";
import ParallalText from "./ParallalText";

const MovingText = ({ children }) => {
	return (
		<div className="flex flex-col gap-2">
			<ParallalText baseVelocity={-1}>
				<hr className="w-screen h-1 border-0 rounded  bg-gradient-to-r from-accent via-background dark:via-dark-background to-80% to-accent" />
			</ParallalText>
			<ParallalText baseVelocity={3}>
				<h1 className="text-accent group uppercase text-stroke-1 font-teko-bold text-4xl mr-2 cursor-pointer">
					<span className="group-hover:text-secondary"> {children}</span>
					<span className="ml-2 divider shadow-0! hover:text-accent"> |</span>
				</h1>
			</ParallalText>
			<ParallalText baseVelocity={-1}>
				<hr className="w-screen  h-1 border-0 rounded  bg-gradient-to-r from-accent via-background dark:via-dark-background to-80% to-accent" />
			</ParallalText>
		</div>
	);
};

export default MovingText;
