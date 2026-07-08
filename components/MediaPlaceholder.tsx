type MediaPlaceholderProps = {
  label: string;
  aspect?: "wide" | "panorama" | "square" | "tall";
  className?: string;
};

export function MediaPlaceholder({
  label,
  aspect = "wide",
  className = ""
}: MediaPlaceholderProps) {
  const aspectClass =
    aspect === "square"
      ? "aspect-square"
      : aspect === "tall"
        ? "aspect-[4/5]"
        : aspect === "panorama"
          ? "aspect-[4/1]"
          : "aspect-[16/9]";

  return (
    <div
      className={`media-frame ${aspectClass} ${className}`}
      role="img"
      aria-label={`${label} placeholder. Replace with approved project media.`}
    >
      <div className="absolute left-5 top-5 h-px w-10 bg-cyan/45" />
      <div className="absolute inset-x-5 bottom-5">
        <p className="font-mono text-[0.64rem] font-bold uppercase text-muted">
          {label}
        </p>
      </div>
    </div>
  );
}
