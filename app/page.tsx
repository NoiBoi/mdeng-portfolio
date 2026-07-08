import Image from "next/image";
import { InstantWorkJump } from "@/components/InstantWorkJump";
import { LynxHero } from "@/components/LynxHero";
import { ProjectCard } from "@/components/ProjectCard";
import { ResearchSection } from "@/components/ResearchSection";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { selectedProjects } from "@/data/projects";
import { siteConfig } from "@/data/site";

export default function Home() {
  return (
    <main>
      <InstantWorkJump />
      <LynxHero />

      <section id="work" className="section-shell">
        <SectionHeading
          eyebrow="Selected Work"
          title="Hardware projects, research tooling, and systems work."
          description="A compact index of mechanical, manufacturing, robotics, propulsion, and research-tooling projects with real CAD, drawings, photos, and analysis figures."
        />
        <Reveal className="work-drawing-banner">
          <Image
            src="/assets/work/selected-work-header-photo.png"
            alt="Technical drawing detail used as a selected-work section banner."
            fill
            sizes="100vw"
            className="object-cover"
          />
        </Reveal>
        <div className="grid auto-rows-auto gap-5 md:grid-cols-8">
          {selectedProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
        <Reveal className="mt-8 border border-white/10 px-5 py-5">
          <div className="flex flex-col justify-between gap-3 text-sm font-semibold text-muted md:flex-row md:items-center">
            <p>
              Project visuals use real CAD, drawings, photos, and analysis figures where approved;
              future LYNX and research media slots remain intentionally reserved.
            </p>
            <p className="font-mono text-[0.68rem] font-bold uppercase text-cyan/75">
              No stock / no AI art
            </p>
          </div>
        </Reveal>
      </section>

      <ResearchSection />

      <section id="about" className="section-shell border-t border-white/10">
        <div className="about-grid">
          <Reveal className="about-rail">
            <p className="font-mono text-[0.68rem] font-bold uppercase text-cyan/70">04 / About</p>
          </Reveal>
          <Reveal className="about-statement">
            <p className="text-balance text-2xl leading-tight text-paper md:text-4xl lg:text-[2.75rem]">
              I am a Purdue University student in Mechanical Engineering · Artificial
              Intelligence & Machine Learning Minor, interested in the design and fabrication
              of complex physical systems. My work spans robotics, advanced materials,
              propulsion, composites, and the engineering process that turns CAD concepts into
              real hardware.
            </p>
            <div className="about-meta">
              <div>
                <p className="about-meta-label">Focus</p>
                <p className="about-meta-text">
                  Robotics / Materials / Propulsion / Manufacturing
                </p>
              </div>
              <div>
                <p className="about-meta-label">Method</p>
                <p className="about-meta-text">CAD - analysis - prototype - fabrication - test</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="contact" className="section-shell border-t border-white/10">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
          <Reveal>
            <p className="section-label">Contact</p>
            <h2 className="mt-5 text-4xl font-semibold text-paper md:text-6xl">Matthew Deng</h2>
            <p className="mt-5 text-lg leading-7 text-muted">
              Purdue University
              <br />
              Mechanical Engineering
            </p>
          </Reveal>
          <Reveal className="flex flex-wrap gap-3 lg:justify-end" delay={100}>
            <a
              href={siteConfig.linkedIn}
              target="_blank"
              rel="noreferrer"
              className="button-secondary"
            >
              LinkedIn
            </a>
            <a href={`mailto:${siteConfig.email}`} className="button-secondary">
              Email
            </a>
            <a href={siteConfig.resumeInquiryHref} className="button-primary">
              Request resume
            </a>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
