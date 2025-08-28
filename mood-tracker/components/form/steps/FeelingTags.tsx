import { useForm } from "react-hook-form";
import { FormData } from "../FormLayout";
import { FEELINGS } from "@/constants";
import CheckBoxTag from "@/components/ui/CheckBoxTag";

const FeelingTags = ({
  form,
}: {
  form: ReturnType<typeof useForm<FormData>>;
}) => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {FEELINGS.map((feeling, index) => (
        <CheckBoxTag
          id={`feeling-${index}`}
          key={index}
          value={feeling}
          label={feeling}
          {...form.register("feelings")}
        />
      ))}
    </div>
  );
};

export default FeelingTags;
