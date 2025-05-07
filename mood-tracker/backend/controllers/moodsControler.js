import User from "../models/User.js";

// Get all mood entries for the logged-in user
export const getMoodEntries = async (req, res) => {
	try {
		const user = await User.findById(req.userId);

		if (!user) {
			return res.status(404).json({ msg: "User not found" });
		}

		res.json(user.moodEntries); // Return all mood entries
	} catch (error) {
		res.status(500).json({ msg: "Server error", error: error.message });
	}
};

// Add a new mood entry
export const addMoodEntry = async (req, res) => {
	try {
		const { mood, feelings, journalEntry, sleepHours, createdAt } = req.body;

		if (mood === undefined || mood < -2 || mood > 2) {
			return res.status(400).json({ msg: "Invalid mood value" });
		}

		const user = await User.findById(req.userId);

		if (!user) {
			return res.status(404).json({ msg: "User not found" });
		}

		// Add the new mood entry to the user's moodEntries
		user.moodEntries.push({
			mood,
			feelings,
			journalEntry,
			sleepHours,
			createdAt,
		});

		await user.save(); // Save the updated user document
		res.status(201).json({
			msg: "Mood entry added successfully",
			moodEntry: user.moodEntries[user.moodEntries.length - 1],
		});
	} catch (error) {
		res.status(500).json({ msg: "Server error", error: error.message });
	}
};

// Delete a mood entry by ID
export const deleteMoodEntry = async (req, res) => {
	try {
		const { entryId } = req.params;

		const user = await User.findById(req.userId);

		if (!user) {
			return res.status(404).json({ msg: "User not found" });
		}

		// Find the index of the mood entry to delete
		const entryIndex = user.moodEntries.findIndex((entry) => entry._id.toString() === entryId);

		if (entryIndex === -1) {
			return res.status(404).json({ msg: "Mood entry not found" });
		}

		// Remove the mood entry from the moodEntries array
		user.moodEntries.splice(entryIndex, 1);

		await user.save(); // Save the updated user document
		res.json({ msg: "Mood entry deleted successfully" });
	} catch (error) {
		res.status(500).json({ msg: "Server error", error: error.message });
	}
};
