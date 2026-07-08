import Link from "next/link";
import type { Project } from "@/data/projects";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { ProjectMedia } from "@/components/ProjectMedia";
import { Reveal } from "@/components/Reveal";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Reveal className="md:col-span-4" delay={index * 90}>
      <Link
        href={`/projects/${project.slug}`}
        className="group block h-full border-t border-white/12 bg-transparent transition duration-300 ease-editorial hover:border-cyan/45 focus-visible:focus-ring"
      >
        <article className="flex h-full flex-col py-5">
          {project.cardMedia ? (
            <ProjectMedia media={project.cardMedia} aspect="wide" className="project-card-media" />
          ) : (
            <MediaPlaceholder label={project.mediaLabels[0]} aspect="wide" />
          )}
          <div className="flex flex-1 flex-col pt-5">
            <div className="flex items-start justify-between gap-4">
              <p className="font-mono text-[0.64rem] font-bold uppercase text-muted">
                {project.category}
              </p>
              <p className="whitespace-nowrap font-mono text-[0.64rem] font-bold uppercase text-dim">
                {project.yearStatus}
              </p>
            </div>
            <h3 className="mt-3 text-balance text-2xl font-semibold leading-tight text-paper md:text-3xl">
              {project.title}
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted md:text-base">
              {project.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.slice(0, 5).map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-auto pt-6 font-mono text-[0.64rem] font-bold uppercase text-paper/70 transition-colors group-hover:text-cyan">
              View project
            </p>
          </div>
        </article>
      </Link>
    </Reveal>
  );
}
