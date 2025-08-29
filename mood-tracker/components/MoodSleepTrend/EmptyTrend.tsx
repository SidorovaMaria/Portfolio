import { getMoodByNumber, heightMap } from "@/lib/utils";
import { format } from "date-fns";
import { g } from "motion/react-m";
import React from "react";

const EmptyTrend = ({
  entry,
}: {
  entry: {
    createdAt: string;
  };
}) => {
  const [month, day] = [
    format(new Date(entry.createdAt), "MMMM"),
    format(new Date(entry.createdAt), "dd"),
  ];

  return (
    <div className="min-w-10 max-w-10 h-full flex flex-col-reverse items-center gap-3 ">
      <p className="text-center">
        <span className="text-preset-9 text-neutral-600 block">{month}</span>
        <span className="text-preset-8 block">{day}</span>
      </p>
    </div>
  );
};

export default EmptyTrend;
