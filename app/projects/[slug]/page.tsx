import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BackToWorkLink } from "@/components/BackToWorkLink";
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
  if (layout === "creep") return "project-gallery project-gallery-creep";
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

  if (layout === "maxcalc") {
    const placements = [
      { aspect: "wide", className: "md:col-span-6" },
      { aspect: "tall", className: "md:col-span-3" },
      { aspect: "tall", className: "md:col-span-3" },
      { aspect: "panorama", className: "md:col-span-6" },
      { aspect: "wide", className: "md:col-span-6" },
      { aspect: "panorama", className: "md:col-span-6" },
      { aspect: "tall", className: "md:col-span-4 md:col-start-2" }
    ] as const;
    return placements[index] ?? { aspect: "wide", className: "md:col-span-3" };
  }

  if (layout === "icon") {
    return { aspect: "wide", className: "md:col-span-3" } as const;
  }

  if (layout === "creep") {
    const placements = [
      { aspect: "document", className: "md:col-span-6" },
      { aspect: "landscape", className: "md:col-span-3" },
      { aspect: "landscape", className: "md:col-span-3" },
      { aspect: "landscape", className: "md:col-span-3" },
      { aspect: "landscape", className: "md:col-span-3" }
    ] as const;
    return placements[index] ?? { aspect: "wide", className: "md:col-span-3" };
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

  const title = `${project.title} | Matthew Deng`;
  const canonicalPath = `/projects/${project.slug}`;

  return {
    title,
    description: project.description,
    alternates: {
      canonical: canonicalPath
    },
    openGraph: {
      title,
      description: project.description,
      url: canonicalPath,
      siteName: "Matthew Deng Engineering Portfolio",
      locale: "en_US",
      type: "article"
    },
    twitter: {
      card: "summary",
      title,
      description: project.description
    }
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
        <BackToWorkLink section={project.homepageGroup === "research" ? "research" : "work"} />

        <Reveal className="project-intro mt-12 max-w-5xl">
          <p className="section-label">{project.category}</p>
          <div className="project-title-lockup">
            {project.logoSrc ? (
              <Image
                src={project.logoSrc}
                alt=""
                width={96}
                height={96}
                unoptimized
                aria-hidden="true"
                className="project-title-logo"
              />
            ) : null}
            <h1 className="max-w-4xl text-balance text-4xl font-semibold leading-[1.06] text-paper sm:text-5xl md:text-6xl">
              {project.title}
            </h1>
          </div>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[0.75rem] font-bold uppercase text-dim">
            <span>{project.role}</span>
            <span>{project.yearStatus}</span>
            <span>{project.category}</span>
          </div>
          <p className="mt-8 max-w-3xl text-xl leading-8 text-muted">{project.description}</p>
          <div className="project-method-list mt-7 flex flex-wrap gap-x-4 gap-y-2">
            {project.tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </Reveal>

        {project.metrics?.length ? (
          <Reveal className="project-metrics-grid mt-12">
            {project.metrics.map((metric) => (
              <div key={metric} className="project-metric">
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

        {project.codeExcerpt ? (
          <Reveal className="project-code-section mt-14">
            <div className="project-code-heading">
              <p className="section-label">MATLAB excerpt</p>
            </div>
            <div className="project-code-panel">
              <div className="project-code-bar">
                <span>{project.codeExcerpt.label}</span>
                <span>{project.codeExcerpt.language}</span>
              </div>
              <pre><code>{project.codeExcerpt.code}</code></pre>
            </div>
          </Reveal>
        ) : null}

        <div className="project-detail-layout mt-16 grid gap-10 border-t border-white/10 pt-12 lg:grid-cols-[0.65fr_1.35fr]">
          <Reveal>
            <p className="section-label">Project record</p>
            <h2 className="mt-5 text-3xl font-semibold text-paper">Engineering notes</h2>
          </Reveal>
          <Reveal className="project-prose max-w-3xl space-y-5">
            {project.details.map((detail) => (
              <p key={detail} className="text-base leading-7 text-muted">
                {detail}
              </p>
            ))}
            {project.detailSections?.map((section) => (
              <section key={section.heading} className="project-detail-section">
                <h3 className="mb-3 font-mono text-[0.75rem] font-bold uppercase tracking-[0.08em] text-paper">
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
          </Reveal>
        </div>
      </section>
    </main>
  );
}
