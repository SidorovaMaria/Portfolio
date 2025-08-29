"use client";
import { calculateAverageSleep, cn, getSleepByNumber } from "@/lib/utils";
import Image from "next/image";
import React, { useMemo } from "react";
import { TrendInfo } from "./AverageMood";
import { IconSleep } from "./svg";

const AverageSleep = ({
  current,
  previous,
}: {
  current: MoodEntry[] | null;
  previous: MoodEntry[] | null;
}) => {
  const currentSleep = Array.isArray(current)
    ? calculateAverageSleep(current)
    : null;
  const previousSleep = Array.isArray(previous)
    ? calculateAverageSleep(previous)
    : null;
  const sleep = useMemo(
    () => getSleepByNumber(currentSleep ?? null),
    [currentSleep]
  );
  const hasEnoughData = currentSleep !== null && currentSleep !== undefined;
  return (
    <aside
      aria-labelledby="Average-Mood"
      aria-describedby="Average mood based on the last five check-ins"
      className="flex flex-col w-full gap-3"
    >
      <h4 id="Average-Mood" className="text-preset-5 text-neutral-900">
        Average Sleep{" "}
        <span className="text-preset-7 font-normal text-neutral-600">
          (Last 5 Check-ins)
        </span>
      </h4>

      <aside
        className={cn(
          ` px-4 md:px-5 py-5 flex flex-col w-full rounded-[16px] min-h-[150px] justify-center gap-3 relative overflow-hidden `,
          sleep ? "bg-blue-600" : "bg-blue-100"
        )}
        role="group"
        aria-roledescription="Average mood based on the last five check-ins"
      >
        {hasEnoughData ? (
          <>
            <h3
              className="text-preset-4 flex items-center gap-3 text-neutral-0"
              aria-live="polite"
            >
              <IconSleep
                className="w-6 h-6 inline-flex text-neutral-0/70"
                aria-hidden="true"
              />
              {sleep}
            </h3>
            <TrendInfo
              previous={previousSleep}
              current={currentSleep}
              className="text-neutral-0/70"
            />
          </>
        ) : (
          <>
            <h3 className="text-preset-4 ">Not enough data yet!</h3>
            <p className="text-preset-7" aria-label="Not enough data">
              Track 5 nights to view average sleep.
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

export default AverageSleep;
