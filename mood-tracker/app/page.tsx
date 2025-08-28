"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import RadioTag from "@/components/ui/RadioTag";
import { z } from "zod";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CheckBoxTag from "@/components/ui/CheckBoxTag";
const countries = ["UK", "USA", "Latvia", "Germany", "France"] as const;
const schema = z.object({
  countries: z
    .array(z.string())
    .min(1, "Pick at least one")
    .max(3, "Up to 3 items"),
});
export default function Home() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      countries: [],
    },
  });
  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log(data);
  };
  return (
    <div className="max-w-2xl mx-auto my-8 flex flex-col gap-8 items-start">
      <Input placeholder="Type your message here..." />
      <Button asChild>
        <Link href="/">Home</Link>
      </Button>
      <Button variant="secondary">Click Me</Button>
      <RadioTag id="radio1" name="radio" label="Option 1" value="1" />
    </div>
  );
}
