import { useForm } from "react-hook-form";
import { FormData } from "../FormLayout";
import Input from "@/components/ui/Input";

const JournalEntry = ({
  form,
}: {
  form: ReturnType<typeof useForm<FormData>>;
}) => {
  return (
    <>
      <Input
        textArea={true}
        className="w-full min-h-[150px] placeholder:text-preset-6-italic"
        placeholder="Today, I felt…"
        {...form.register("journalEntry")}
      />
      <p className="text-preset-8 text-neutral-600 w-full text-right">
        {form.watch("journalEntry").length}/150
      </p>
    </>
  );
};

export default JournalEntry;
