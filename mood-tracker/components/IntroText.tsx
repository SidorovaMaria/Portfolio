import { getUser } from "@/lib/api";
import { format } from "date-fns";

import React from "react";

const IntroText = async () => {
  const currentUser = await getUser();
  const date = new Date();
  const formattedDate = format(date, "EEEE, MMMM do, yyyy");
  console.log(formattedDate);

  return (
    <section className="flex flex-col justify-center items-center w-full gap-4 text-center ">
      <h3 className="text-preset-3-mobile md:text-preset-3 text-blue-600">
        Hello,{currentUser.name}!
      </h3>
      <h1 className="text-preset-1-mobile md:text-preset-1 text-neutral-900 ">
        How are you feeling today?
      </h1>
      <p className="text-preset-6 text-neutral-600">{formattedDate}</p>
    </section>
  );
};

export default IntroText;
