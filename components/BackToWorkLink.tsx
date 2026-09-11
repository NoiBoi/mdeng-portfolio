"use client";

import Link from "next/link";
import type { MouseEvent } from "react";

type BackToWorkLinkProps = {
  section?: "research" | "work";
};

export function BackToWorkLink({ section = "work" }: BackToWorkLinkProps) {
  const href = `/#${section}`;
  const label = section === "research" ? "Back to research" : "Back to work";

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.location.assign(href);
  };

  return (
    <Link href={href} onClick={handleClick} className="back-to-work-floating">
      {label}
    </Link>
  );
}
