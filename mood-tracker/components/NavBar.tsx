import React from "react";
import Logo from "./ui/Logo";
import Image from "next/image";

const NavBar = () => {
  return (
    <header className="flex items-center justify-between w-full ">
      <Logo href="/" />
      {/* Placeholder for now */}
      <Image
        src="/images/avatar-lisa.jpg"
        width={40}
        height={40}
        alt="Avatar Image"
        className="rounded-full"
      />
    </header>
  );
};

export default NavBar;
