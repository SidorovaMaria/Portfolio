import React from "react";
import { IconSleep } from "../svg";
import { getSleepByNumber } from "@/lib/utils";
import { motion } from "motion/react";
const SleepCard = ({ sleep }: { sleep: number }) => {
  const sleepTiming = getSleepByNumber(sleep);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-neutral-0 border border-blue-100 rounded-[16px] p-5 flex flex-col gap-4"
    >
      <p className="flex gap-3 items-center text-neutral-600  text-preset-6">
        <IconSleep className="w-5 inline-flex" /> Sleep
      </p>
      <h3 className="text-preset-3">{sleepTiming}</h3>
    </motion.div>
  );
};

export default SleepCard;
