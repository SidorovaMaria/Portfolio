"use client";
import { getSleepByNumber, MoodInfo } from "@/lib/utils";
import { AnimatePresence } from "motion/react";
import React from "react";
import { motion } from "motion/react";

const EntryDetails = ({
  show,
  index,
  entry,
  moodInfo,
  height,
}: {
  show: boolean;
  index: number;
  entry: MoodEntry;
  moodInfo: MoodInfo;
  height: string;
}) => {
  const Icon = moodInfo.coloredIcon!;
  const sleep = getSleepByNumber(entry.sleepHours);
  return (
    <AnimatePresence>
      {show && (
        <motion.aside
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, type: "tween", delay: 0.1 }}
          className={`absolute bg-neutral-0 rounded-xl p-3 border border-blue-100 shadow-[0_4px_7px] shadow-[rgba(33,33,77,0.16)]
            flex flex-col gap-3 z-50 [direction:ltr] min-w-[175px] arrow-container
          ${
            index > 10 ? "left-[120%]" : "right-[120%]"
          } top-0 pointer-events-none`}
        >
          <span
            className={`${index > 10 ? "arrow-left" : "arrow-right"}`}
            style={{ "--sleepHeight": height } as React.CSSProperties}
          ></span>
          <div className="flex flex-col gap-2 w-full ">
            <p className="text-preset-8 text-neutral-600">Mood</p>
            <p className="flex items-center gap-2 whitespace-nowrap text-preset-7">
              <Icon className="w-4 h-4" />
              {moodInfo.title}
            </p>
          </div>
          <div className="flex flex-col gap-1.5 w-full  ">
            <p className="text-preset-8 text-neutral-600">Sleep</p>
            <p className=" text-preset-7">{sleep}</p>
          </div>
          <div className="flex flex-col gap-1.5 w-full  ">
            <p className="text-preset-8 text-neutral-600">Reflection</p>
            <p className="text-preset-7">{entry.journalEntry}</p>
          </div>
          <div className="flex flex-col gap-1.5 w-full  ">
            <p className="text-preset-8 text-neutral-600">Tags</p>
            <p className="text-preset-7 whitespace-nowrap">
              {entry.feelings.join(", ")}
            </p>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default EntryDetails;
