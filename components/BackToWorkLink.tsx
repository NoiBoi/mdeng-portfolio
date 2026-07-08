"use client";

import Link from "next/link";
import type { MouseEvent } from "react";

export function BackToWorkLink() {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    sessionStorage.setItem("jumpToWork", "1");
    window.location.assign("/?jump=work");
  };

  return (
    <Link href="/?jump=work" onClick={handleClick} className="button-secondary">
      Back to work
    </Link>
  );
}
