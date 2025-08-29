"use client";
import { getMoodByNumber, heightMap } from "@/lib/utils";
import { format } from "date-fns";

import React, { useState } from "react";

import EntryDetails from "./EntryDetails";

const EntryTrend = ({ entry, index }: { entry: MoodEntry; index: number }) => {
  const [detailShown, setDetailShown] = useState(false);
  const [month, day] = [
    format(new Date(entry.createdAt), "MMMM"),
    format(new Date(entry.createdAt), "dd"),
  ];
  const heightD = heightMap[entry.sleepHours] || "260px";
  const moodInfo = getMoodByNumber(entry.mood)!;
  const Icon = moodInfo.icon!;

  return (
    <div
      className="min-w-10 max-w-10 h-full flex flex-col-reverse items-center gap-3 cursor-pointer relative"
      onMouseEnter={() => setDetailShown(true)}
      onMouseLeave={() => setDetailShown(false)}
    >
      <p className="text-center">
        <span className="text-preset-9 text-neutral-600 block">{month}</span>
        <span className="text-preset-8 block">{day}</span>
      </p>
      {moodInfo && Icon && (
        <span
          className={`${moodInfo?.color} w-10 rounded-full relative`}
          style={{ height: `${heightD}` }}
        >
          <Icon className="absolute top-[5px] left-[5px] w-[30px] h-[30px]" />
        </span>
      )}
      <EntryDetails
        show={detailShown}
        index={index}
        entry={entry}
        height={heightD}
        moodInfo={moodInfo}
      />
    </div>
  );
};

export default EntryTrend;
