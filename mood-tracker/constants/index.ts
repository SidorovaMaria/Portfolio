export const totalFormSteps = 4;
export const FEELINGS = [
  "Joyful",
  "Down",
  "Anxious",
  "Calm",
  "Excited",
  "Frustrated",
  "Lonely",
  "Grateful",
  "Overwhelmed",
  "Motivated",
  "Irritable",
  "Peaceful",
  "Tired",
  "Hopeful",
  "Confident",
  "Stressed",
  "Content",
  "Disappointed",
  "Optimistic",
  "Restless",
] as const;

// 🔗 Infer the type from the constant (stays in sync automatically)
export type Feeling = (typeof FEELINGS)[number];

// (Optional) runtime constant for moods
export const MOODS = ["-2", "-1", "0", "1", "2"] as const;
export type MoodValue = (typeof MOODS)[number];

export const formStepTitles = {
  0: "How was your mood today?",
  1: "How did you feel?",
  2: "Write about your day...",
  3: "How many hours did you sleep last night?",
};
export const StepCheckValue = {
  0: "mood",
  1: "feelings",
  2: "journalEntry",
  3: "sleepHours",
};
