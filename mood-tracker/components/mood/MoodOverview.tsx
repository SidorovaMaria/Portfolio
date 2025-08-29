"use client";
import { getMoodByNumber } from "@/lib/utils";
import React, { useMemo } from "react";
import MoodCard from "./MoodCard";
import { getMoodQuotes } from "@/lib/api";
import SleepCard from "./SleepCard";
import ReflectionCard from "./ReflectionCard";

const MoodOverview = ({
  mood,
  quotes,
}: {
  mood: MoodEntry;
  quotes: string[];
}) => {
  const MoodDetails = getMoodByNumber(mood.mood)!;
  const randomMoodQuote = useMemo(() => {
    const random = Math.floor(Math.random() * quotes.length);
    return quotes[random];
  }, [quotes]);

  return (
    <article className="grid grid-cols-1 xl:grid-cols-[5fr_4fr] w-full gap-y-5 gap-x-8">
      <MoodCard moodDetails={MoodDetails} quote={randomMoodQuote} />
      <SleepCard sleep={mood.sleepHours} />
      <ReflectionCard reflection={mood.journalEntry} tags={mood.feelings} />
    </article>
  );
};

export default MoodOverview;
