import Average from "@/components/Average";
import FormLayout from "@/components/form/FormLayout";
import IntroText from "@/components/IntroText";
import MoodOverview from "@/components/mood/MoodOverview";
import MoodSleepTrend from "@/components/MoodSleepTrend/MoodSleepTrend";
import NavBar from "@/components/NavBar";

import { getMoodEntries, getMoodEntryByDate, getMoodQuotes } from "@/lib/api";

export default async function Home() {
  const todaysDate = new Date().toISOString().split("T")[0];
  const [mood, moodQuotes] = await Promise.all([
    getMoodEntryByDate(todaysDate),
    getMoodQuotes(),
  ]);

  const allMoods = await getMoodEntries();
  const sortedEntries = allMoods.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <section className="flex flex-col gap-12 xl:gap-16 items-center w-full ">
      <NavBar />
      <IntroText />
      {mood && moodQuotes ? (
        <MoodOverview mood={mood} quotes={moodQuotes[mood.mood]} />
      ) : (
        <FormLayout />
      )}
      <section className="grid grid-cols-1 xl:grid-cols-[4fr_7fr] gap-8 w-full">
        <Average />
        <MoodSleepTrend entry={sortedEntries.slice(0, 11)} />
      </section>
    </section>
  );
}
