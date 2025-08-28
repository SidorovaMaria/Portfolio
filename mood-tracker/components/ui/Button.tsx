import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";
const Button = ({
  className,
  children,
  asChild,
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  children: ReactNode;
  asChild?: boolean;
  variant?: "primary" | "secondary";
}) => {
  const Comp = asChild ? Slot : "button";
  return (
    <>
      {variant === "primary" ? (
        <Comp
          className={cn(
            "cursor-pointer rounded-[10px] text-preset-5 font-semibold bg-blue-600 text-neutral-0 px-8 py-3 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 focus:bg-blue-600 disabled:bg-blue-200 disabled:cursor-not-allowed transition-all duration-200 ",
            className
          )}
          {...props}
        >
          {children}
        </Comp>
      ) : (
        <Comp
          className={cn(
            "cursor-pointer rounded-[8px] text-preset-5 font-semibold bg-neutral-0 text-neutral-900 px-4 py-2 border border-neutral-300 shadow-[0px_1px_2px] shadow-[#0a0d14]/5 hover:border-neutral-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 focus:border-neutral-600",
            className
          )}
          {...props}
        >
          {children}
        </Comp>
      )}
    </>
  );
};

export default Button;
