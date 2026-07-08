import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectMedia } from "@/components/ProjectMedia";
import { Reveal } from "@/components/Reveal";
import { getProject, projects } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

function getGalleryClass(layout = "standard") {
  if (layout === "frc") return "project-gallery project-gallery-frc";
  return "project-gallery";
}

function getMediaPlacement(layout = "standard", index: number) {
  if (layout === "v-jaw") {
    const placements = [
      { aspect: "wide", className: "md:col-span-3" },
      { aspect: "wide", className: "md:col-span-3" },
      { aspect: "wide", className: "md:col-span-4" },
      { aspect: "wide", className: "md:col-span-2" },
      { aspect: "wide", className: "md:col-span-6" },
      { aspect: "document", className: "md:col-span-6" }
    ] as const;
    return placements[index] ?? { aspect: "wide", className: "md:col-span-3" };
  }

  if (layout === "pulsejet") {
    const placements = [
      { aspect: "wide", className: "md:col-span-6" },
      { aspect: "wide", className: "md:col-span-6" },
      { aspect: "document", className: "md:col-span-3" },
      { aspect: "document", className: "md:col-span-3" }
    ] as const;
    return placements[index] ?? { aspect: "wide", className: "md:col-span-3" };
  }

  if (layout === "per") {
    const placements = [
      { aspect: "wide", className: "md:col-span-6" },
      { aspect: "wide", className: "md:col-span-4" },
      { aspect: "square", className: "md:col-span-2" }
    ] as const;
    return placements[index] ?? { aspect: "wide", className: "md:col-span-3" };
  }

  if (layout === "frc") {
    const placements = [
      { aspect: "wide", className: "" },
      { aspect: "tall", className: "" }
    ] as const;
    return placements[index] ?? { aspect: "wide", className: "" };
  }

  return { aspect: index === 0 ? "wide" : "square", className: "md:col-span-3" } as const;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) {
    return {
      title: "Project Not Found | Matthew Deng"
    };
  }

  return {
    title: `${project.title} | Matthew Deng`,
    description: project.description
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-28">
      <section className="section-shell !pt-10">
        <Link href="/#work" className="button-secondary">
          Back to work
        </Link>

        <Reveal className="mt-12 max-w-5xl">
          <p className="section-label">{project.category}</p>
          <h1 className="mt-5 text-balance text-5xl font-semibold leading-tight text-paper md:text-7xl">
            {project.title}
          </h1>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[0.72rem] font-bold uppercase text-dim">
            <span>{project.role}</span>
            <span>{project.yearStatus}</span>
            <span>{project.category}</span>
          </div>
          <p className="mt-8 max-w-3xl text-xl leading-8 text-muted">{project.description}</p>
        </Reveal>

        {project.metrics?.length ? (
          <Reveal className="mt-12 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-3">
            {project.metrics.map((metric) => (
              <div
                key={metric}
                className="bg-graphite-900 p-5 font-mono text-sm font-bold uppercase leading-6 text-paper"
              >
                {metric}
              </div>
            ))}
          </Reveal>
        ) : null}

        {project.media?.length ? (
          <div className={`mt-12 ${getGalleryClass(project.galleryLayout)}`}>
            {project.media.map((media, index) => {
              const placement = getMediaPlacement(project.galleryLayout, index);
              return (
                <Reveal key={media.src} delay={index * 80} className={placement.className}>
                  <ProjectMedia
                    media={media}
                    aspect={placement.aspect}
                    priority={index === 0}
                  />
                </Reveal>
              );
            })}
          </div>
        ) : null}

        <div className="mt-16 grid gap-10 border-t border-white/10 pt-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="section-label">Overview</p>
            <h2 className="mt-5 text-3xl font-semibold text-paper">Process and details</h2>
          </Reveal>
          <Reveal className="space-y-5">
            {project.details.map((detail) => (
              <p key={detail} className="text-base leading-7 text-muted">
                {detail}
              </p>
            ))}
            {project.detailSections?.map((section) => (
              <section key={section.heading} className="pt-2">
                <h3 className="mb-3 font-mono text-[0.72rem] font-bold uppercase tracking-[0.08em] text-paper">
                  {section.heading}
                </h3>
                <div className="space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-base leading-7 text-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
            {project.confidentialityNote ? (
              <p className="border-l border-cyan/45 pl-5 text-sm leading-6 text-dim">
                {project.confidentialityNote}
              </p>
            ) : null}
          </Reveal>
        </div>
      </section>
    </main>
  );
}
