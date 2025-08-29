"use client";
import { calculateAverageMood, cn, getMoodByNumber } from "@/lib/utils";
import Image from "next/image";
import React, { useMemo } from "react";
import { IconTrendDecrease, IconTrendIncrease, IconTrendSame } from "./svg";

const AverageMood = ({
  current,
  previous,
}: {
  current: MoodEntry[] | null;
  previous: MoodEntry[] | null;
}) => {
  const currentMood = Array.isArray(current)
    ? calculateAverageMood(current)
    : null;
  const previousMood = Array.isArray(previous)
    ? calculateAverageMood(previous)
    : null;

  const mood = useMemo(
    () => getMoodByNumber(currentMood ?? null),
    [currentMood]
  );
  const MoodIcon = mood && mood.icon;
  const hasEnoughData = currentMood !== null && currentMood !== undefined;
  return (
    <aside
      aria-labelledby="Average-Mood"
      aria-describedby="Average mood based on the last five check-ins"
      className="flex flex-col w-full gap-3"
    >
      <h4 id="Average-Mood" className="text-preset-5 text-neutral-900">
        Average Mood{" "}
        <span className="text-preset-7 font-normal text-neutral-600">
          (Last 5 Check-ins)
        </span>
      </h4>

      <aside
        className={cn(
          ` px-4 md:px-5 py-5 flex flex-col w-full rounded-[16px] min-h-[150px] justify-center gap-3 relative overflow-hidden `,
          mood ? mood.color : "bg-blue-100"
        )}
        role="group"
        aria-roledescription="Average mood based on the last five check-ins"
      >
        {hasEnoughData ? (
          MoodIcon ? (
            <>
              <h3
                className="text-preset-4 flex items-center gap-3"
                aria-live="polite"
              >
                <MoodIcon className="w-6 h-6 inline-flex" aria-hidden="true" />
                {mood.title}
              </h3>
              <TrendInfo previous={previousMood} current={currentMood} />
            </>
          ) : null
        ) : (
          <>
            <h3 className="text-preset-4 ">Keep Tracking</h3>
            <p className="text-preset-7" aria-label="Not enough data">
              Log 5 check-ins to see your average mood.
            </p>
          </>
        )}
        <Image
          src="/images/bg-pattern-averages.svg"
          alt="Background pattern"
          aria-hidden
          className="absolute -right-[182px] -top-[37px] "
          width={243}
          height={251}
          priority
        />
      </aside>
    </aside>
  );
};

export default AverageMood;

export const TrendInfo = ({
  previous,
  current,
  className,
}: {
  previous: number | null;
  current: number;
  className?: string;
}) => {
  const Icon =
    previous == null
      ? null
      : current === previous
      ? IconTrendSame
      : current > previous
      ? IconTrendIncrease
      : IconTrendDecrease;
  return (
    <p className={`flex items-center gap-2 ${className}`}>
      {Icon ? <Icon className={`w-4 ${className}`} /> : null}
      {previous === null
        ? "No previous data available"
        : current === previous
        ? "Same as the previous 5 check-ins"
        : current > previous
        ? "Increase from the previous 5 check-ins"
        : "Decrease from the previous 5 check-ins"}
    </p>
  );
};
