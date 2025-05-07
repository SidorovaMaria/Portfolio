import React, { useState } from "react";
import { sleepDurations } from "../assets/helpData";
import SleepIcon from "../assets/images/icon-sleep.svg?react";
import { useSelector } from "react-redux";
import { moods } from "../assets/helpData";
import { motion, AnimatePresence } from "motion/react";
import { getAverageMoodLabel, getAverageSleepLabel } from "../hooks/lastFiveDays";
const Trends = () => {
	const { moodEntries } = useSelector((state) => state.mood);
	const sorted = [...moodEntries].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

	return (
		<div className="flex flex-col gap-8 px-4 py-5 bg-n-0 border rounded-16 border-blue-100 lg:min-w-[768px]">
			<h3 className="text-3 text-n-900">Mood and sleep trends</h3>
			<div className="flex gap-4 items-center h-[312px]">
				<div className="flex flex-col gap-10 h-full items-start justify-start">
					{sleepDurations.map((sleep) => (
						<div key={sleep.label} className="flex gap-1.5 items-center">
							<SleepIcon />
							<p className="text-9 text-n-600">{sleep.label}</p>
						</div>
					))}
				</div>
				<div className="flex  h-full overflow-x-auto gap-4 flex-1">
					{sorted.map((mood) => (
						<MoodTrend key={mood._id} mood={mood} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Trends;

export const MoodTrend = ({ mood }) => {
	const date = new Date(mood.createdAt);
	const day = date.getDate();
	const month = date.toLocaleString("default", { month: "short" });
	const moodLabel = getAverageMoodLabel(mood.mood);
	const sleepLabel = getAverageSleepLabel(mood.sleepHours);
	const MoodIcon = moodLabel.icon;
	const [popOver, setPopOver] = useState(false);

	return (
		<div className="h-full min-w-[40px] flex flex-col items-cneter gap-3 justify-end relative ">
			{mood.sleepHours && (
				<div
					className={`${moodLabel.color} w-full rounded-full flex items-start justify-center pt-1.5 cursor-pointer `}
					onClick={() => setPopOver(!popOver)}
					style={{ height: `${sleepLabel.height}` }}
				>
					<MoodIcon className="w-[30px] h-[30px]" />
					<AnimatePresence>
						{popOver && (
							<PopOver
								mood={mood}
								moodLabel={moodLabel}
								sleepLabel={sleepLabel}
								icon={MoodIcon}
							/>
						)}
					</AnimatePresence>
				</div>
			)}

			<div className="flex flex-col gap-1.5 items-center">
				<p className="text-9 text-n-600">{month}</p>
				<p className="text-8 text-n-900">{day}</p>
			</div>
		</div>
	);
};

const PopOver = ({ mood, moodLabel, sleepLabel }) => {
	const MoodIcon = moods.find((moodObj) => moodObj.value === mood.mood)?.icon;

	return (
		<motion.div
			initial={{ opaciity: 0, x: 20 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: 20 }}
			className="absolute top-10 right-[110%] bg-white flex flex-col gap-3 p-3 rounded-10 min-w-[175px] z-50"
		>
			<div className="flex gap-2 flex-col">
				<p className="text-8 text-n-600">Mood</p>
				<p className="text-7 text-n-900">
					<span className="pr-1.5">
						<MoodIcon className="w-4 h-4 inline-block" />
					</span>
					{moodLabel.mood}
				</p>
			</div>
			<div className="flex gap-2 flex-col">
				<p className="text-8 text-n-600">Sleep</p>
				<p className="text-7 text-n-900">{sleepLabel.label}</p>
			</div>
			<div className="flex gap-2 flex-col">
				<p className="text-8 text-n-600">Relfection</p>
				<p className="text-9 text-n-900">{mood.journalEntry}</p>
			</div>
			<div className="flex gap-2 flex-col">
				<p className="text-8 text-n-600">Tags</p>
				<p className="text-9 text-n-900">
					{mood.feelings.map((tag, index) => (
						<span key={index} c>
							{tag}
							{", "}
						</span>
					))}
				</p>
			</div>
		</motion.div>
	);
};
