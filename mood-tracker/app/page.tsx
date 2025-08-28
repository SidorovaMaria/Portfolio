import FormLayout from "@/components/form/FormLayout";
import IntroText from "@/components/IntroText";
import NavBar from "@/components/NavBar";
import Button from "@/components/ui/Button";
import { getMoodEntries, getMoodEntryByDate } from "@/lib/api";

export default async function Home() {
  const todaysMood = new Date().toISOString().split("T")[0];
  const mood = await getMoodEntryByDate(todaysMood);
  return (
    <section className="flex flex-col gap-12 xl:gap-16 items-center ">
      <NavBar />
      <IntroText />
      {mood ? <FormLayout /> : null}
    </section>
  );
}
