import VeryHappyIcon from "../assets/images/icon-very-happy-color.svg?react";
import HappyIcon from "../assets/images/icon-happy-color.svg?react";
import NeutralIcon from "../assets/images/icon-neutral-color.svg?react";
import SadIcon from "../assets/images/icon-sad-color.svg?react";
import VerySadIcon from "../assets/images/icon-very-sad-color.svg?react";

export const moods = [
	{ mood: "very happy", icon: VeryHappyIcon, value: 2 },
	{ mood: "happy", icon: HappyIcon, value: 1 },
	{ mood: "neutral", icon: NeutralIcon, value: 0 },
	{ mood: "sad", icon: SadIcon, value: -1 },
	{ mood: "very sad", icon: VerySadIcon, value: -2 },
];
export const feelings = [
	"Joyful",
	"Down",
	"Anxious",
	"Calm",
	"Escited",
	"Frustrated",
	"Lonely",
	"Grateful",
	"Overwhelmed",
	"Motivated",
	"Irritable",
	"Peaceful",
	"Tired",
	"Hopeful",
	"Confident",
	"Stressed",
	"Content",
	"Disappointed",
	"Optimistic",
	"Restless",
];

export const sleepDurations = [
	{ label: "9+ hours", value: 9 },
	{ label: "7-8 hours", value: 7.5 },
	{ label: "5-6 hours", value: 5.5 },
	{ label: "3-4 hours", value: 3.5 },
	{ label: "0-2 hours", value: 0.5 },
];

export const moodQuotes = {
	"-2": [
		"You are stronger than you think; the storm will pass.",
		"It's okay to cry. Healing begins when you let your feelings flow.",
		"Even in darkness, a spark of hope can shine bright.",
		"This moment is tough, but you've overcome challenges before.",
		"A gentle step forward, no matter how small, is still progress.",
	],
	"-1": [
		"Pain is temporary, brighter days lie ahead.",
		"Each setback is a chance to grow and learn.",
		"One small positive thought can change your entire day.",
		"It's okay to rest; self-care isn't selfish.",
		"Healing takes time - be patient and kind to yourself.",
	],
	0: [
		"A calm mind can find opportunity in every moment.",
		"Sometimes the greatest triumph is simply finding peace.",
		"Take a moment to breathe; every breath is a fresh start.",
		"Even an ordinary day can hold a pleasant surprise.",
		"Balance isn't found, it's created.",
	],
	1: [
		"Happiness grows when it's shared with others.",
		"Celebrate even the small victories to make life extraordinary.",
		"Gratitude can turn what you have into enough.",
		"Keep smiling; your joy can be contagious.",
		"Where focus goes, energy flows - keep your focus on what lifts you.",
	],
	2: [
		"When your heart is full, share your light with the world.",
		"Savor the highs in life; they become precious memories.",
		"Joy multiplies when spread among friends.",
		"Trust your journey; you're in a beautiful place right now.",
		"Let your happiness ripple out and inspire others.",
	],
};
