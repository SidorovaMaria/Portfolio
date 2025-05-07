import React from "react";
import {
	getAverageMoodLabel,
	getAverageSleepLabel,
	useGetLastFiveDaysLogs,
} from "../hooks/lastFiveDays";
import SleepIcon from "../assets/images/icon-sleep.svg?react";
const Average = () => {
	return (
		<div className="flex flex-col gap-6 px-4 py-5 rounded-16 bg-n-0 border border-blue-100 w-full">
			<AverageMood />
			<AverageSleep />
		</div>
	);
};

export default Average;

const AverageMood = () => {
	const last5Moods = useGetLastFiveDaysLogs();

	const averageMoods =
		last5Moods.reduce((acc, mood) => acc + Number(mood.mood), 0) / last5Moods.length;
	const averageMood = getAverageMoodLabel(averageMoods);
	const MoodIcon = averageMood?.icon;
	const notEnoughData = last5Moods.length < 5;
	return (
		<div className="flex flex-col gap-3 w-full">
			<h5 className="text-5 text-n-900">
				Average Mood <span className="text-7 text-n-600">(Last 5 Check-ins)</span>
			</h5>
			<div
				className={`flex flex-col items-start justify-center gap-3 px-4 py-5 h-[150px] rounded-16 ${
					notEnoughData ? "bg-blue-100" : averageMood.color
				}`}
			>
				{notEnoughData ? (
					<>
						<h6 className="text-n-900 text-4">Keep tracking!</h6>
						<p className="text-7 text-n-900/70">
							Log 5 check-ins to see your average mood.
						</p>
					</>
				) : (
					<>
						<div className="flex items-center gap-4">
							{MoodIcon && <MoodIcon className="w-6 h-6" />}
							<h6 className="text-n-900 text-4">{averageMood.mood}</h6>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

const AverageSleep = () => {
	const last5Days = useGetLastFiveDaysLogs();
	const averageSleep =
		last5Days.reduce((acc, log) => acc + Number(log.sleepHours), 0) / last5Days.length;
	const notEnoughData = last5Days.length < 5;
	const averageSleepLabel = getAverageSleepLabel(averageSleep);

	return (
		<div className="flex flex-col gap-3 w-full">
			<h5 className="text-5 text-n-900">
				Average Sleep <span className="text-7 text-n-600">(Last 5 Check-ins)</span>
			</h5>
			<div
				className={`flex flex-col items-start justify-center gap-3 px-4 py-5 h-[150px] rounded-16 ${
					notEnoughData ? "bg-blue-100" : "bg-blue-600"
				}`}
			>
				{notEnoughData ? (
					<>
						<h6 className="text-n-900 text-4">Not enough data yet!</h6>
						<p className="text-7 text-n-900/70">
							Track 5 nights to view average sleep.
						</p>
					</>
				) : (
					<>
						<div className="flex items-center gap-4">
							<SleepIcon className="w-6 h-6 text-white" />
							<h6 className="text-n-0 text-4">{averageSleepLabel.label}</h6>
						</div>
					</>
				)}
			</div>
		</div>
	);
};
