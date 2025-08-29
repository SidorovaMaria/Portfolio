import { MoodInfo } from "@/lib/utils";
import React from "react";
import { IconQuote } from "../svg";
import { motion } from "framer-motion";
const MoodCard = ({
  moodDetails,
  quote,
}: {
  moodDetails: MoodInfo;
  quote: string;
}) => {
  const MoodIcon = moodDetails.coloredIcon!;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="xl:row-span-2 bg-neutral-0 rounded-[16px] px-4 md:px-8 py-8 border border-blue-100 shadow-[0px_0px_20px] shadow-[rgba(1,5,39,0.08)] w-full flex flex-col gap-8 items-center justify-center md:items-start md:min-h-[340px] md:justify-between overflow-hidden relative"
    >
      <h2 className="text-preset-3 text-center md:text-left ">
        <span className="opacity-70">I am feeling</span>
        <span className="block text-preset-2 opacity-100!">
          {moodDetails.title}
        </span>
      </h2>
      <MoodIcon className="w-50 h-50 md:w-[320px] md:h-[320px] md:absolute md:right-10 md:top-[50px]" />
      <div className="flex flex-col item-center gap-4  md:max-w-[250px]">
        <IconQuote className="w-6 mx-auto md:mx-0" />
        <p className="text-preset-6-italic xl:font-bold">&quot;{quote}&quot;</p>
      </div>
    </motion.div>
  );
};

export default MoodCard;
