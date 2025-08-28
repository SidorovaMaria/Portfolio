import {
  IconHappyColor,
  IconNeutralColor,
  IconSadColor,
  IconVeryHappyColor,
  IconVerySadColor,
} from "@/components/svg";
import RadioTag from "@/components/ui/RadioTag";
import React from "react";
import { useForm } from "react-hook-form";
import { FormData } from "../FormLayout";

export const MoodStep = ({
  form,
}: {
  form: ReturnType<typeof useForm<FormData>>;
}) => {
  return (
    <div className="flex flex-col gap-3">
      <RadioTag
        value={2}
        id="veryHappy"
        className="py-3!"
        label={"Very Happy"}
        {...form.register("mood")}
        icon={<IconVeryHappyColor className="w-[38px]" />}
      />
      <RadioTag
        value={1}
        id="happy"
        label={"Happy"}
        {...form.register("mood")}
        icon={<IconHappyColor className="w-[38px]" />}
      />
      <RadioTag
        value={0}
        id="neutral"
        label={"Neutral"}
        {...form.register("mood")}
        icon={<IconNeutralColor className="w-[38px]" />}
      />
      <RadioTag
        value={-1}
        id="sad"
        label={"Sad"}
        {...form.register("mood")}
        icon={<IconSadColor className="w-[38px]" />}
      />
      <RadioTag
        value={-2}
        id="very-sad"
        label={"Very Sad"}
        {...form.register("mood")}
        icon={<IconVerySadColor className="w-[38px]" />}
      />
    </div>
  );
};
export default MoodStep;
