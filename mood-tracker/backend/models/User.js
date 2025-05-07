import mongoose from "mongoose";
import { Buffer } from "buffer";
const moodEntries = [
	{
		createdAt: "2025-03-20T09:00:00Z",
		mood: 2,
		feelings: ["Joyful", "Motivated", "Hopeful"],
		journalEntry: "Had an amazing morning run and feel full of energy!",
		sleepHours: 7.5,
	},
	{
		createdAt: "2025-03-24T10:30:00Z",
		mood: 1,
		feelings: ["Grateful", "Calm"],
		journalEntry: "Spent time with family, feeling relaxed and thankful.",
		sleepHours: 7.5,
	},
	{
		createdAt: "2025-03-26T08:15:00Z",
		mood: 0,
		feelings: ["Peaceful"],
		journalEntry: "Routine day at work, nothing too exciting or stressful.",
		sleepHours: 5.5,
	},
	{
		createdAt: "2025-03-28T07:50:00Z",
		mood: -1,
		feelings: ["Down", "Tired"],
		journalEntry: "Tough day. Didn't sleep well and felt drained at work.",
		sleepHours: 3.5,
	},
	{
		createdAt: "2025-03-31T11:00:00Z",
		mood: -1,
		feelings: ["Disappointed", "Frustrated"],
		journalEntry: "Got some bad news. Trying to process my emotions.",
		sleepHours: 5.5,
	},
	{
		createdAt: "2025-04-02T12:05:00Z",
		mood: 1,
		feelings: ["Excited", "Content"],
		journalEntry: "A good friend visited, which lifted my spirits a lot.",
		sleepHours: 7.5,
	},
	{
		createdAt: "2025-04-04T09:15:00Z",
		mood: -2,
		feelings: ["Overwhelmed", "Lonely"],
		journalEntry: "Feeling isolated. Need to talk to someone soon.",
		sleepHours: 3.5,
	},
	{
		createdAt: "2025-04-06T19:45:00Z",
		mood: 0,
		feelings: ["Irritable"],
		journalEntry: "Woke up in a grouchy mood but it got better by evening.",
		sleepHours: 5.5,
	},
	{
		createdAt: "2025-04-07T10:55:00Z",
		mood: 1,
		feelings: ["Optimistic", "Confident"],
		journalEntry: "Good progress on personal goals today, feeling proud.",
		sleepHours: 7.5,
	},
	{
		createdAt: "2025-04-09T07:30:00Z",
		mood: 2,
		feelings: ["Joyful", "Excited", "Grateful"],
		journalEntry: "Slept well and woke up ready to tackle new challenges.",
		sleepHours: 9,
	},
	{
		createdAt: "2025-04-10T08:30:00Z",
		mood: -1,
		feelings: ["Lonely", "Anxious"],
		journalEntry: "Feeling a bit off. Hoping tomorrow is better.",
		sleepHours: 3.5,
	},
	{
		createdAt: "2025-04-12T08:00:00Z",
		mood: 0,
		feelings: ["Calm"],
		journalEntry: "Quiet day at home, reading and resting.",
		sleepHours: 7.5,
	},
	{
		createdAt: "2025-04-13T09:00:00Z",
		mood: 1,
		feelings: ["Optimistic", "Confident"],
		journalEntry: "Had a productive morning cleaning and organizing.",
		sleepHours: 7.5,
	},
	{
		createdAt: "2025-04-14T10:00:00Z",
		mood: -2,
		feelings: ["Down", "Tired"],
		journalEntry: "Rough night of sleep. Need support and rest.",
		sleepHours: 3.5,
	},
	{
		createdAt: "2025-04-15T11:00:00Z",
		mood: 2,
		feelings: ["Grateful", "Optimistic"],
		journalEntry: "Woke up early and finally tackled a big project!",
		sleepHours: 9,
	},
];

const userSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	name: { type: String, required: false },
	profileImg: {
		data: { type: Buffer, required: false },
		contentType: { type: String, required: false },
	},
	moodEntries: {
		type: [
			{
				mood: { type: Number, min: -2, max: 2, required: true },
				feelings: { type: [String], default: [] },
				journalEntry: { type: String, default: "" },
				sleepHours: { type: Number, min: 0 },
				createdAt: { type: Date, default: Date.now },
			},
		],
		default: () => shiftMoodEntryDates(new Date().toISOString()),
	},
});

export default mongoose.model("User", userSchema);

const shiftMoodEntryDates = (signupDateStr) => {
	const signupDate = new Date(signupDateStr);

	// Adjust to get the previous day
	signupDate.setDate(signupDate.getDate() - 1); // Set to the previous day

	return moodEntries.map((entry, i) => {
		const date = new Date(signupDate);
		date.setDate(signupDate.getDate() - (moodEntries.length - 1 - i)); // Adjust dates backward for each entry

		return {
			...entry,
			createdAt: date.toISOString(),
		};
	});
};
