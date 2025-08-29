import Average from "@/components/Average";
import FormLayout from "@/components/form/FormLayout";
import IntroText from "@/components/IntroText";
import NavBar from "@/components/NavBar";

import { getMoodEntryByDate } from "@/lib/api";

export default async function Home() {
  const todaysDate = new Date().toISOString().split("T")[0];
  const mood = await getMoodEntryByDate(todaysDate);

  return (
    <section className="flex flex-col gap-12 xl:gap-16 items-center w-full ">
      <NavBar />
      <IntroText />
      {mood ? null : <FormLayout />}
      <section className="grid grid-cols-1 xl:grid-cols-[1fr_2fr] gap-8 w-full">
        <Average />
        <div>Mood and Sleep Trends</div>
      </section>
    </section>
  );
}
