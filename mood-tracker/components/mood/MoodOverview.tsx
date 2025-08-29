"use client";
import { getMoodByNumber } from "@/lib/utils";
import React, { useEffect, useMemo, useState } from "react";
import MoodCard from "./MoodCard";

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
  const [randomMoodQuote, setRandomMoodQuote] = useState<string>("");

  useEffect(() => {
    const random = Math.floor(Math.random() * quotes.length);
    setRandomMoodQuote(quotes[random]);
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
