"use client";

import { useEffect } from "react";

export function InstantWorkJump() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const shouldJump =
      params.get("jump") === "work" || sessionStorage.getItem("jumpToWork") === "1";

    if (!shouldJump) return;

    sessionStorage.removeItem("jumpToWork");
    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    document.getElementById("work")?.scrollIntoView({ block: "start", behavior: "auto" });
    window.history.replaceState(null, "", "/#work");
    window.setTimeout(() => {
      root.style.scrollBehavior = previousBehavior;
    }, 80);
  }, []);

  return null;
}
