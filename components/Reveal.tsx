"use client";

import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from "react";

const revealCallbacks = new WeakMap<Element, () => void>();
let revealObserver: IntersectionObserver | null = null;

function getRevealObserver() {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          revealCallbacks.get(entry.target)?.();
          revealCallbacks.delete(entry.target);
          revealObserver?.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.18 }
    );
  }

  return revealObserver;
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "span" | "section";
};

export function Reveal({ children, className = "", delay = 0, as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const Component = as;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = getRevealObserver();
    revealCallbacks.set(node, () => setVisible(true));
    observer.observe(node);
    return () => {
      revealCallbacks.delete(node);
      observer.unobserve(node);
    };
  }, []);

  return (
    <Component
      ref={ref as never}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Component>
  );
}
