import { useSelector } from "react-redux";

export const useGetTodaysMood = () => {
	const moods = useSelector((state) => state.mood.moodEntries);
	const today = new Date();
	const todayYear = today.getFullYear();
	const todayMonth = today.getMonth();
	const todayDate = today.getDate();

	const todaysMood = moods.find((entry) => {
		const entryDate = new Date(entry.createdAt);
		return (
			entryDate.getFullYear() === todayYear &&
			entryDate.getMonth() === todayMonth &&
			entryDate.getDate() === todayDate
		);
	});

	return todaysMood;
};
