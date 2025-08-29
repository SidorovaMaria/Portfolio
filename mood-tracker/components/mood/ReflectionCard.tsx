import React from "react";
import { IconReflection } from "../svg";
import { motion } from "motion/react";
const ReflectionCard = ({
  reflection,
  tags,
}: {
  reflection: string;
  tags: Feelings[];
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-neutral-0 border border-blue-100 rounded-[16px] p-5 flex flex-col gap-4"
    >
      <p className="flex gap-3 items-center text-neutral-600  text-preset-6">
        <IconReflection className="w-5 inline-flex" /> Reflection of the day
      </p>
      <p className="h-20 text-preset-6">{reflection}</p>
      <p className="text-preset-6-italic text-neutral-600">
        {tags.map((tag) => `#${tag}`).join(" ")}
      </p>
    </motion.div>
  );
};

export default ReflectionCard;
