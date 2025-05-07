import { useSelector } from "react-redux";
import VeryHappyIcon from "../assets/images/icon-very-happy-white.svg?react";
import HappyIcon from "../assets/images/icon-happy-white.svg?react";
import NeutralIcon from "../assets/images/icon-neutral-white.svg?react";
import SadIcon from "../assets/images/icon-sad-white.svg?react";
import VerySadIcon from "../assets/images/icon-very-sad-white.svg?react";
export const useGetLastFiveDaysLogs = () => {
	const moods = useSelector((state) => state.mood.moodEntries);
	const today = new Date();
	const fiveDaysAgo = new Date(today);
	fiveDaysAgo.setDate(today.getDate() - 5);
	const lastFiveDaysLogs = moods.filter((entry) => {
		const entryDate = new Date(entry.createdAt);
		return entryDate >= fiveDaysAgo && entryDate <= today;
	});
	return lastFiveDaysLogs;
};
export const getAverageMoodLabel = (value) => {
	if (value <= -1.5) {
		return { mood: "Very Sad", color: "bg-red-300", icon: VerySadIcon };
	} else if (value <= -0.5) {
		return { mood: "Sad", color: "bg-indigo-300", icon: SadIcon };
	} else if (value < 0.5) {
		return { mood: "Neutral", color: "bg-blue-300", icon: NeutralIcon };
	} else if (value < 1.5) {
		return { mood: "Happy", color: "bg-green-300", icon: HappyIcon };
	} else {
		return { mood: "Very Happy", color: "bg-emerald-400", icon: VeryHappyIcon };
	}
};

export const getAverageSleepLabel = (value) => {
	if (value <= 2) {
		return { label: "0-2 Hours", height: "52px" };
	} else if (value <= 4) {
		return { label: "3-4 hours", height: "104px" };
	} else if (value <= 6) {
		return { label: "5-6 hours", height: "156px" };
	} else if (value <= 8) {
		return { label: "7-8 hours", height: "208px" };
	} else {
		return { label: "9+ hours", height: "260px" };
	}
};

export const createDummyDates = (endDateStr, days = 7) => {
	const endDate = new Date(endDateStr);
	const dummyDates = [];

	for (let i = days - 1; i >= 0; i--) {
		const date = new Date(endDate);
		date.setDate(endDate.getDate() - i);

		dummyDates.push({
			_id: `dummy-${days - i}`,
			createdAt: date.toISOString(),
			mood: null,
			sleepHours: null,
		});
	}

	return dummyDates;
};
