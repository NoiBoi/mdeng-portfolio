import Image from "next/image";
import type { ProjectMedia as ProjectMediaItem } from "@/data/projects";

type MediaAspect = "wide" | "panorama" | "landscape" | "square" | "tall" | "document";

type ProjectMediaProps = {
  media: ProjectMediaItem;
  aspect?: MediaAspect;
  className?: string;
  priority?: boolean;
};

const aspectClasses: Record<MediaAspect, string> = {
  wide: "aspect-[16/9]",
  panorama: "aspect-[4/1]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
  tall: "aspect-[4/5]",
  document: "aspect-[1.62/1]"
};

export function ProjectMedia({
  media,
  aspect = "wide",
  className = "",
  priority = false
}: ProjectMediaProps) {
  const fitClass = media.fit === "contain" ? "object-contain" : "object-cover";
  const toneClass =
    media.tone === "document"
      ? "project-media-document"
      : media.tone === "cad"
        ? "project-media-cad"
        : "project-media-photo";

  return (
    <figure className={`project-media ${toneClass} ${className}`}>
      <div className={`project-media-frame ${aspectClasses[aspect]}`}>
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority={priority}
          className={fitClass}
        />
      </div>
      <figcaption>{media.caption}</figcaption>
    </figure>
  );
}
