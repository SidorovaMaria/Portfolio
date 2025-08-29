import { format } from "date-fns";
import React from "react";

const MoodSleepTrend = ({ entries }: { entries: MoodEntry[] }) => {
  const dates = entries.map((entry) => format(entry.createdAt, "MMMM dd"));
  console.log(dates);
  return <div>MoodSleepTrend</div>;
};

export default MoodSleepTrend;
