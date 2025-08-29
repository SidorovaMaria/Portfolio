import { getMoodByNumber, heightMap } from "@/lib/utils";
import { format } from "date-fns";
import { g } from "motion/react-m";
import React from "react";

const EntryTrend = ({ entry }: { entry: MoodEntry | null }) => {
  if (!entry) return null;
  const [month, day] = [
    format(new Date(entry.createdAt), "MMMM"),
    format(new Date(entry.createdAt), "dd"),
  ];
  const heightD = heightMap[entry.sleepHours] || "260px";
  const moodColor = getMoodByNumber(entry.mood)!;
  const Icon = moodColor.icon;
  return (
    <div className="min-w-10 max-w-10 h-full flex flex-col-reverse items-center gap-3 cursor-pointer">
      <p className="text-center">
        <span className="text-preset-9 text-neutral-600 block">{month}</span>
        <span className="text-preset-8 block">{day}</span>
      </p>
      {moodColor && Icon && (
        <span
          className={`${moodColor?.color} w-10 rounded-full relative`}
          style={{ height: `${heightD}` }}
        >
          <Icon className="absolute top-[5px] left-[5px] w-[30px] h-[30px]" />
        </span>
      )}
    </div>
  );
};

export default EntryTrend;
