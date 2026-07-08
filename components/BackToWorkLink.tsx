"use client";

import Link from "next/link";
import type { MouseEvent } from "react";

export function BackToWorkLink() {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.location.assign("/#work");
  };

  return (
    <Link href="/#work" onClick={handleClick} className="button-secondary">
      Back to work
    </Link>
  );
}
