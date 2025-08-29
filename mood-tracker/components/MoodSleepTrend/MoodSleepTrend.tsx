import React from "react";
import { IconSleep } from "../svg";
import EntryTrend from "./EntryTrend";
import JournalEntry from "../form/steps/JournalEntry";
import EmptyTrend from "./EmptyTrend";

const MoodSleepTrend = ({ entries }: { entries: MoodEntry[] }) => {
  //17 is a good value for UI/UX on teh Desktop
  const emptyDataLength = 17 - entries.length;
  console.log(emptyDataLength);
  const lastAvailableDate = entries[entries.length - 1]?.createdAt;
  const emptyData = Array.from({ length: emptyDataLength }, (_, i) => ({
    createdAt: new Date(
      new Date(lastAvailableDate).getTime() - (i + 1) * 24 * 60 * 60 * 1000
    ).toISOString(),
  }));
  return (
    <div className="bg-neutral-0 rounded-[16px] border border-blue-100 px-4 py-5 md:p-6 xl:p-8 flex flex-col gap-8">
      <h3 className="text-preset-3-mobile md:text-preset-3">
        Mood and sleep trends
      </h3>
      <aside className=" max-h-[312px] h-[312px] flex gap-4 w-full justify-between">
        <div className="flex flex-col-reverse justify-end h-full items-start gap-10 shrink-0 ">
          {sleepTags.map((tag) => (
            <SleepTag key={tag} tag={tag} />
          ))}
        </div>
        <div className="overflow-x-auto overflow-y-hidden flex flex-row h-full gap-4 lg:gap-6  xl:gap-4 border w-full xl:max-w-[627px] items [direction:rtl]">
          {entries.map((entry) => (
            <EntryTrend key={entry.createdAt} entry={entry} />
          ))}
          {emptyData.map((entry) => (
            <EmptyTrend key={entry.createdAt} entry={entry} />
          ))}
        </div>
      </aside>
    </div>
  );
};

export default MoodSleepTrend;

const sleepTags = [
  "0-2 hours",
  "3-4 hours",
  "5-6 hours",
  "7-8 hours",
  "9+ hours",
];
const SleepTag = ({ tag }: { tag: string }) => (
  <p className=" text-neutral-500 text-preset-9 ">
    <IconSleep className="inline-flex w-2.5 h-2.5 mr-1.5" />
    <span>{tag}</span>
  </p>
);
