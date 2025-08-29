import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  IconVerySad,
  IconSad,
  IconNeutral,
  IconHappy,
  IconVeryHappy,
} from "../components/svg/index"; // Update the path as needed

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateAverageMood = (entries: MoodEntry[]) => {
  const total = entries.reduce((acc, entry) => acc + entry.mood, 0);
  return Math.floor(total / entries.length);
};
export const calculateAverageSleep = (entries: MoodEntry[]) => {
  const total = entries.reduce((acc, entry) => acc + entry.sleepHours, 0);
  return total / entries.length;
};

type MoodInfo = {
  title: string;
  color: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | null;
};

export const getMoodByNumber = (number: number | null): MoodInfo | null => {
  const mood: MoodInfo = {
    title: "",
    color: "",
    icon: null,
  };
  switch (number) {
    case -2:
      mood.title = "Very Sad";
      mood.color = "bg-red-300";
      mood.icon = IconVerySad;
      break;
    case -1:
      mood.title = "Sad";
      mood.color = "bg-indigo-200";
      mood.icon = IconSad;
      break;
    case 0:
      mood.title = "Neutral";
      mood.color = "bg-blue-300";
      mood.icon = IconNeutral;
      break;
    case 1:
      mood.title = "Happy";
      mood.color = "bg-green-300";
      mood.icon = IconHappy;
      break;
    case 2:
      mood.title = "Very Happy";
      mood.color = "bg-amber-300";
      mood.icon = IconVeryHappy;
      break;
    default:
      mood.title = "Unknown";
      mood.color = "bg-white";
      mood.icon = null;
  }
  return mood.title !== "Unknown" ? mood : null;
};
export const getSleepByNumber = (number: number | null) => {
  let sleepTitle;
  if (number === null || number === undefined) return null;
  if (number < 2) {
    sleepTitle = "0-2 hours";
  } else if (number < 4) {
    sleepTitle = "2-4 hours";
  } else if (number < 6) {
    sleepTitle = "4-6 hours";
  } else if (number < 8) {
    sleepTitle = "6-8 hours";
  } else if (number >= 9) {
    sleepTitle = "9+ hours";
  } else {
    sleepTitle = "Unknown";
  }
  return sleepTitle !== "Unknown" ? sleepTitle : null;
};
