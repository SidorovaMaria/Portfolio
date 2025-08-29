// Data Base Types
type Mood = -2 | -1 | 0 | 1 | 2;
type Feelings =
  | "Joyful"
  | "Down"
  | "Anxious"
  | "Calm"
  | "Excited"
  | "Frustrated"
  | "Lonely"
  | "Grateful"
  | "Overwhelmed"
  | "Motivated"
  | "Irritable"
  | "Peaceful"
  | "Tired"
  | "Hopeful"
  | "Confident"
  | "Stressed"
  | "Content"
  | "Disappointed"
  | "Optimistic"
  | "Restless";
interface MoodEntry {
  createdAt: string;
  mood: Mood;
  feelings: Feelings[];
  journalEntry: string;
  sleepHours: number;
}
type MoodQuotes = {
  [key in Mood]: string[];
};
interface User {
  name: string;
  image: string;
  email: string;
}
