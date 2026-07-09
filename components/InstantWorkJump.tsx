"use client";

import { useLayoutEffect } from "react";

export function InstantWorkJump() {
  useLayoutEffect(() => {
    const run = () => {
      if (window.location.hash !== "#work") return;
      const root = document.documentElement;
      const isInstantJump =
        new URLSearchParams(window.location.search).get("instantWork") === "1" ||
        root.dataset.instantWorkJump === "true";
      if (!isInstantJump) return;

      const previousBehavior = root.dataset.instantWorkJump === "true" ? "" : root.style.scrollBehavior;
      const target = document.getElementById("work");

      root.dataset.instantWorkJump = "true";
      root.style.scrollBehavior = "auto";
      if (target) {
        const snapToWork = () => {
          window.scrollTo({
            top: window.scrollY + target.getBoundingClientRect().top,
            behavior: "auto"
          });
        };

        snapToWork();
        window.history.replaceState(null, "", "/#work");
        requestAnimationFrame(() => {
          snapToWork();
          root.style.scrollBehavior = previousBehavior;
        });
      } else {
        root.style.scrollBehavior = previousBehavior;
      }
    };

    run();
    window.addEventListener("hashchange", run);
    window.addEventListener("popstate", run);
    return () => {
      window.removeEventListener("hashchange", run);
      window.removeEventListener("popstate", run);
    };
  }, []);

  return null;
}
