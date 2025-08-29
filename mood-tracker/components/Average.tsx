import { getMoodinFives } from "@/lib/api";
import React from "react";
import AverageMood from "./AverageMood";
import AverageSleep from "./AverageSleep";

const Average = async () => {
  const last5Entries = await getMoodinFives();
  const current = last5Entries ? last5Entries[0] : null;
  const previous =
    last5Entries && last5Entries.length > 1 ? last5Entries[1] : null;
  console.log(current, "current");
  console.log(previous, "previous");
  return (
    <div className="flex flex-col gap-6 bg-neutral-0 rounded-[16px] border border-blue-100 px-4 py-5">
      <AverageMood current={current} previous={previous} />
      <AverageSleep current={current} previous={previous} />
    </div>
  );
};

export default Average;
