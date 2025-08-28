"use client";
import React, { use, useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { set, z, infer as zodInfer } from "zod";
import {
  FEELINGS,
  formStepTitles,
  MOODS,
  MoodValue,
  StepCheckValue,
  totalFormSteps,
} from "@/constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../ui/Button";

import RadioTag from "../ui/RadioTag";

import JournalEntry from "./steps/JournalEntry";
import MoodStep from "./steps/MoodStep";
import FeelingTags from "./steps/FeelingTags";
import SleepHoursStep from "./steps/SleepHoursStep";
import { IconClose, IconHint } from "../svg";
const formSchema = z.object({
  mood: z
    .string()
    .min(1, "Please select a mood before continuing.")
    .refine(
      (v) => MOODS.includes(v as MoodValue),
      "Please select a valid mood."
    ),
  feelings: z
    .array(
      z
        .string()
        .refine((val) => FEELINGS.includes(val as (typeof FEELINGS)[number]), {
          message: "Please select at least one feeling before continuing.",
        })
    )
    .min(1, {
      message: "Please select at least one tag before continuing.",
    })
    .max(3, {
      message: "You can only select a maximum of 3 tags.",
    }),
  journalEntry: z.string().min(1, {
    message: "Please write a few words about your day before continuing.",
  }),
  sleepHours: z.string().min(1, {
    message: "Please choose sleep duration before submitting.",
  }),
});
export type FormData = zodInfer<typeof formSchema>;

const FormLayout = () => {
  const [MoodFormOpen, setMoodFormOpen] = useState(false);
  const openMoodForm = useCallback(() => setMoodFormOpen(true), []);
  const onClose = useCallback(() => setMoodFormOpen(false), []);
  const [error, setError] = useState<string | null>(null);
  const [formStep, setFormStep] = useState(0);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mood: "",
      feelings: [],
      journalEntry: "",
      sleepHours: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const { handleSubmit, getFieldState, trigger } = form;
  const NextStep = async () => {
    const fieldName = StepCheckValue[
      formStep as keyof typeof StepCheckValue
    ] as keyof FormData;
    const ok = await trigger(fieldName, { shouldFocus: true });
    if (!ok) {
      const { error: fieldError } = getFieldState(fieldName);
      setError(fieldError?.message ?? "Unknown Error.");

      return;
    }
    setError(null);
    setFormStep((prev) => (prev + 1 < totalFormSteps ? prev + 1 : prev));
  };
  const PrevStep = () => {
    setFormStep((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
  };
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <>
      <Button onClick={openMoodForm}> Log today&apos;s mood</Button>

      <AnimatePresence mode="wait">
        {MoodFormOpen && (
          <motion.div
            layout
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{ duration: 0.4, type: "tween" }}
            className="fixed w-screen h-screen inset-0 bg-black/50 z-10 px-5
        flex items-center justify-between md:px-21"
          >
            <motion.div
              aria-labelledby="log-food-form"
              initial={{
                opacity: 0,
                scaleY: 0.8,
                y: -20,
              }}
              animate={{
                opacity: 1,
                scaleY: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scaleY: 0.8,
                y: 20,
              }}
              transition={{ duration: 0.6 }}
              className="w-full md:max-w-[600px] mx-auto  py-8 px-5 rounded-[16px] light-gradient relative md:py-12 md:px-10 flex flex-col gap-6 md:gap-8"
            >
              <button
                type="button"
                role="button"
                onClick={onClose}
                className="absolute max-sm:hidden top-[30px] right-[30px] w-[15px] cursor-pointer"
                aria-label="Close Log Food Form"
              >
                <IconClose className="" />
              </button>
              <h3
                id="log-food-form"
                className="text-preset-3 md:text-preset-2 text-meutral-900"
              >
                Log your mood
              </h3>
              <div className={`grid grid-cols-4 place-items-stretch gap-x-4`}>
                {Array.from({ length: totalFormSteps }).map((_, index) => {
                  const active = index <= formStep;
                  return (
                    <span
                      key={index}
                      className="relative w-full h-[6px] overflow-hidden"
                    >
                      <span
                        className={`w-full h-[6px] absolute left-0 right-0 rounded-full transition-all duration-700 origin-left ease-in-out z-20 ${
                          active ? "bg-blue-600 scale-x-100" : "scale-x-0"
                        }`}
                      >
                        <span className="sr-only">
                          {formStepTitles[index as keyof typeof formStepTitles]}
                        </span>
                      </span>
                      <span className=" absolute rounded-full left-0 right-0 h-[6px] w-full bg-blue-200 z-0" />
                    </span>
                  );
                })}
              </div>
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.h3
                  key={formStep} // 👈 critical: unique per step
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{
                    duration: 0.6,
                    ease: "easeInOut",
                    type: "tween",
                  }}
                  className="text-preset-3-mobile md:text-preset-3"
                >
                  {formStepTitles[formStep as keyof typeof formStepTitles]}
                </motion.h3>
              </AnimatePresence>
              <form onSubmit={handleSubmit(onSubmit)} id="mood-form">
                {/* Form fields go here */}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    layout
                    key={formStep}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut",
                      type: "tween",
                    }}
                  >
                    {formStep === 0 && <MoodStep form={form} />}
                    {formStep === 1 && <FeelingTags form={form} />}
                    {formStep === 2 && <JournalEntry form={form} />}
                    {formStep === 3 && <SleepHoursStep form={form} />}
                  </motion.div>
                </AnimatePresence>
              </form>
              <div className="flex flex-col gap-4 ">
                {error && (
                  <p className="flex items-center gap-1.5 text-red-700 text-preset-7 ">
                    <IconHint className="w-4" />
                    {error}
                  </p>
                )}
                <Button
                  form="mood-form"
                  onClick={NextStep}
                  className="w-full"
                  type={formStep === totalFormSteps - 1 ? "submit" : "button"}
                >
                  {formStep < totalFormSteps - 1 ? "Continue" : "Submit"}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FormLayout;
