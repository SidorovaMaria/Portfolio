import RadioTag from "@/components/ui/RadioTag";
import { useForm } from "react-hook-form";
import { de } from "zod/locales";
import { FormData } from "../FormLayout";

const SleepHoursStep = ({
  form,
}: {
  form: ReturnType<typeof useForm<FormData>>;
}) => {
  return (
    <div className="flex flex-col gap-4">
      <RadioTag
        value={9}
        id="sleep-9"
        label={"9+ hours"}
        {...form.register("sleepHours")}
      />
      <RadioTag
        value={7.5}
        id="sleep-7-8"
        label={"7-8 hours"}
        {...form.register("sleepHours")}
      />
      <RadioTag
        value={5.5}
        id="sleep-5-6"
        label={"5-6 hours"}
        {...form.register("sleepHours")}
      />
      <RadioTag
        value={3.5}
        id="sleep-3-4"
        label={"3-4 hours"}
        {...form.register("sleepHours")}
      />
      <RadioTag
        value={1}
        id="sleep-0-2"
        label={"0-2 hours"}
        {...form.register("sleepHours")}
      />
    </div>
  );
};

export default SleepHoursStep;
