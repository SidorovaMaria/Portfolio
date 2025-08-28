import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = ({ href, ariaLabel }: { href?: string; ariaLabel?: string }) => {
  const Img = (
    <Image
      src="/images/logo.svg"
      alt="Mood Tracker Logo"
      width={177}
      height={40}
      priority
      aria-hidden="true"
      className="h-auto w-auto max-w-[177px]"
    />
  );
  return href ? (
    <Link href={href} aria-label={ariaLabel}>
      {Img}
    </Link>
  ) : (
    Img
  );
};

export default Logo;
