import React from "react";
import { useGetTodaysMood } from "../hooks/useGetTodaysMood";
import { motion } from "motion/react";
import { moods, sleepDurations, moodQuotes } from "../assets/helpData";
import SleepIcon from "../assets/images/icon-sleep.svg?react";
import QuoteIcon from "../assets/images/icon-quote.svg?react";
import ReflectionIcon from "../assets/images/icon-reflection.svg?react";
const MoodToday = () => {
	const todaysMood = useGetTodaysMood();
	const mood = moods.find((m) => m.value === Number(todaysMood.mood));

	const sleepDuration = sleepDurations.find((s) => s.value === Number(todaysMood.sleepHours));

	return (
		<motion.article
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 100 }}
			className="flex flex-col gap-5 lg:flex-row lg:gap-8 items-center w-full"
		>
			<div className="flex flex-col items-center w-full gap-8 px-4 py-8 rounded-16 border border-blue-100 md:h-[340px] md:justify-between  md:w-full md:p-8 relative overflow-hidden lg:min-w-[670px]">
				<div className="flex flex-col items-center md:items-start w-full">
					<h3 className="text-3 opacity-70 text-n-900">I'm feeling</h3>
					<h2 className="text-2 text-n-900 capitalize">{mood.mood}</h2>
				</div>
				<mood.icon className="w-[200px] h-[200px] md:w-[320px] md:h-[320px] md:absolute md:right-10 lg:right-5" />
				<div className="flex flex-col gap-4 items-center md:items-start  w-full ">
					<QuoteIcon className="w-6 h-6" />
					<p className="text-6 italic text-n-900 text-center md:text-left md:max-w-[246px]">
						"
						{
							moodQuotes[todaysMood.mood][
								Math.floor(Math.random() * moodQuotes[todaysMood.mood].length)
							]
						}
						"
					</p>
				</div>
			</div>
			<div className="flex flex-col gap-5 items-start w-full justify-start h-[340px]">
				{/* Sleep */}
				<div className="flex flex-col gap-4 p-5 rounded-4 border border-blue-100 w-full ">
					<div className="flex gap-3 items-center justify-start">
						<SleepIcon className="w-[22px] h-[22px]" />
						<p className="text-6 text-n-600">Sleep</p>
					</div>
					<h4 className="text-4 text-n-900">{sleepDuration.label}</h4>
				</div>
				{/* Reflection */}
				<div className="flex flex-col gap-4 p-5 rounded-4 border border-blue-100 w-full flex-1">
					<div className="flex gap-3 items-center justify-start">
						<ReflectionIcon className="w-[22px] h-[22px]" />
						<p className="text-6 text-n-600">Reflection of the day</p>
					</div>

					<textarea
						readOnly
						className="w-full text-6 text-n-900 outline-none flex-1 "
						rows={4}
						value={todaysMood.journalEntry}
					></textarea>
					<div className="flex items-center gap-3">
						{todaysMood.feelings.map((feeling) => (
							<span key={feeling} className="text-6 italic text-n-600">
								#{feeling}
							</span>
						))}
					</div>
				</div>
			</div>
		</motion.article>
	);
};

export default MoodToday;
