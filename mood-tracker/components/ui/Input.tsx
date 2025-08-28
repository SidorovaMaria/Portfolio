import { cn } from "@/lib/utils";
import { textarea } from "motion/react-m";
import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  textArea?: false;
};

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string;
  textArea: true;
};

type Props = InputProps | TextAreaProps;

const Input = (props: Props) => {
  const { className, textArea, ...rest } = props;
  return (
    <>
      {textArea ? (
        <textarea
          {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          className={cn(
            "bg-neutral-0 rounded-[10px] px-4 py-3 border border-neutral-300 placeholder:text-neutral-600 text-neutral-900 hover:border-neutral-600 hover:shadow-[0_1px_2px] hover:shadow-[#21214d]/5 text-preset-6-regular focus:border-neutral-300 focus:outline-0 focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 active:border-neutral-600 active:shadow-[0_1px_2px] active:shadow-[#21214d]/5 aria-invalid:border-red-700",
            className
          )}
        />
      ) : (
        <input
          {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
          className={cn(
            "bg-neutral-0 rounded-[10px] px-4 py-3 border border-neutral-300 placeholder:text-neutral-600 text-neutral-900 hover:border-neutral-600 hover:shadow-[0_1px_2px] hover:shadow-[#21214d]/5 text-preset-6-regular focus:border-neutral-300 focus:outline-0 focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 active:border-neutral-600 active:shadow-[0_1px_2px] active:shadow-[#21214d]/5 aria-invalid:border-red-700",
            className
          )}
        />
      )}
    </>
  );
};

export default Input;
