import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  IconVerySad,
  IconSad,
  IconNeutral,
  IconHappy,
  IconVeryHappy,
  IconVeryHappyColor,
  IconSadColor,
  IconNeutralColor,
  IconHappyColor,
} from "../components/svg/index"; // Update the path as needed
import { subDays } from "date-fns";

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

export type MoodInfo = {
  title: string;
  color: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | null;
  coloredIcon: React.ComponentType<React.SVGProps<SVGSVGElement>> | null;
};

export const getMoodByNumber = (number: number | null): MoodInfo | null => {
  const mood: MoodInfo = {
    title: "",
    color: "",
    icon: null,
    coloredIcon: null,
  };
  if (number === null || number === undefined) return null;
  switch (number) {
    case -2:
      mood.title = "Very Sad";
      mood.color = "bg-red-300";
      mood.icon = IconVerySad;
      mood.coloredIcon = IconVeryHappyColor;
      break;
    case -1:
      mood.title = "Sad";
      mood.color = "bg-indigo-200";
      mood.icon = IconSad;
      mood.coloredIcon = IconSadColor;
      break;
    case 0:
      mood.title = "Neutral";
      mood.color = "bg-blue-300";
      mood.icon = IconNeutral;
      mood.coloredIcon = IconNeutralColor;
      break;
    case 1:
      mood.title = "Happy";
      mood.color = "bg-green-300";
      mood.icon = IconHappy;
      mood.coloredIcon = IconHappyColor;
      break;
    case 2:
      mood.title = "Very Happy";
      mood.color = "bg-amber-300";
      mood.icon = IconVeryHappy;
      mood.coloredIcon = IconVeryHappyColor;
      break;
    default:
      mood.title = "Unknown";
      mood.color = "bg-white";
      mood.icon = null;
      mood.coloredIcon = null;
  }
  return mood.title !== "Unknown" ? mood : null;
};
export const getSleepByNumber = (number: number | null) => {
  let sleepTitle;
  if (number === null || number === undefined) return null;
  if (number < 2) {
    sleepTitle = "0-2 hours";
  } else if (number < 4) {
    sleepTitle = "3-4 hours";
  } else if (number < 6) {
    sleepTitle = "5-6 hours";
  } else if (number < 8) {
    sleepTitle = "7-8 hours";
  } else if (number >= 9) {
    sleepTitle = "9+ hours";
  } else {
    sleepTitle = "Unknown";
  }
  return sleepTitle !== "Unknown" ? sleepTitle : null;
};

export const heightMap: Record<number, string> = {
  1: "60px",
  3.5: "110px",
  5.5: "155px",
  7.5: "210px",
};
