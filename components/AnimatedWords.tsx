import type { CSSProperties } from "react";

type AnimatedWordsProps = {
  text: string;
  className?: string;
  startDelay?: number;
};

export function AnimatedWords({ text, className = "", startDelay = 0 }: AnimatedWordsProps) {
  return (
    <span className={`word-sequence ${className}`}>
      {text.split(" ").map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="word-reveal"
          style={{ "--word-delay": `${startDelay + index * 58}ms` } as CSSProperties}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
