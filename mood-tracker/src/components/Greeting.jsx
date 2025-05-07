import { AnimatePresence } from "motion/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import LogMood from "./LogMood";
import { useGetTodaysMood } from "../hooks/useGetTodaysMood";
import MoodToday from "./MoodToday";

const Greeting = () => {
	const { user } = useSelector((state) => state.auth);
	const { moodEntries } = useSelector((state) => state.mood);
	const [logMoodModal, setLogMoodModal] = useState(false);
	const today = new Date().toLocaleDateString("en-US", {
		weekday: "long",
		month: "long",
		day: "numeric",
		year: "numeric",
	});
	const moodTodayExist = useGetTodaysMood();
	return (
		<React.Fragment>
			<div className="flex flex-col items-center gap-4">
				<h1 className="text-3 text-blue-600 w-full text-center">Hello, {user.name}!</h1>
				<h2 className="text-n-900 text-1 text-center w-full">How are you feeling today?</h2>
				<p className="text-6 text-n-600 text-center">{today}</p>
			</div>
			{moodTodayExist ? (
				<MoodToday />
			) : (
				<button onClick={() => setLogMoodModal(true)} className="btn w-fit text-5">
					Log today's mood
				</button>
			)}
			<AnimatePresence>
				{logMoodModal && <LogMood close={() => setLogMoodModal(false)} />}
			</AnimatePresence>
		</React.Fragment>
	);
};

export default Greeting;
