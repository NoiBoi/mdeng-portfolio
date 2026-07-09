"use client";

import Link from "next/link";
import type { MouseEvent } from "react";

export function BackToWorkLink() {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.location.assign("/?instantWork=1#work");
  };

  return (
    <Link href="/#work" onClick={handleClick} className="back-to-work-floating">
      Back to work
    </Link>
  );
}
