import { Reveal } from "@/components/Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <Reveal className="mb-10 max-w-3xl">
      <p className="section-label">{eyebrow}</p>
      <h2 className="mt-5 text-balance text-3xl font-semibold text-paper md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted md:text-lg">{description}</p>
      ) : null}
    </Reveal>
  );
}
