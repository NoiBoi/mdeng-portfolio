import Link from "next/link";
import type { Project } from "@/data/projects";
import { ProjectMedia } from "@/components/ProjectMedia";
import { Reveal } from "@/components/Reveal";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const title = project.homepageTitle ?? project.title;
  const description = project.homepageDescription ?? project.description;
  const tags = project.homepageTags ?? project.tags.slice(0, 3);
  const showMedia = Boolean(project.cardMedia && !project.homepageHideMedia);

  return (
    <Reveal className="md:col-span-4" delay={index * 90}>
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`View ${title}`}
        className="project-card group block h-full border-t border-white/12 bg-transparent transition duration-300 ease-editorial hover:border-cyan/45 focus-visible:focus-ring"
      >
        <article className="flex h-full flex-col py-6">
          {showMedia && project.cardMedia ? (
            <ProjectMedia
              media={project.cardMedia}
              aspect="wide"
              className="project-card-media"
            />
          ) : null}
          <div className={`flex flex-1 flex-col ${showMedia ? "pt-5" : "pt-1"}`}>
            {project.homepageMeta ? (
              <p className="project-card-meta font-mono font-bold uppercase text-muted">
                {project.homepageMeta}
              </p>
            ) : null}
            <h3 className={`${project.homepageMeta ? "mt-3" : "mt-0"} text-balance text-2xl font-semibold leading-tight text-paper md:text-3xl`}>
              {title}
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted md:text-base">
              {description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>
      </Link>
    </Reveal>
  );
}
