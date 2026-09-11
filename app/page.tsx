import Image from "next/image";
import { LynxHero } from "@/components/LynxHero";
import { ProjectCard } from "@/components/ProjectCard";
import { ResearchSection } from "@/components/ResearchSection";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { engineeringProjects } from "@/data/projects";
import { siteConfig } from "@/data/site";

export default function Home() {
  return (
    <main>
      <LynxHero />

      <ResearchSection />

      <section id="work" className="section-shell border-t border-white/10">
        <SectionHeading
          eyebrow="Selected Engineering"
          title="Team-built systems beyond the research lab."
          description="Earlier work in motorsport and competitive robotics, focused on the parts, tooling, and production decisions I directly contributed."
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
          {engineeringProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </section>

      <section id="about" className="section-shell border-t border-white/10">
        <div className="about-grid">
          <Reveal className="about-rail">
            <p className="font-mono text-[0.68rem] font-bold uppercase text-cyan/70">04 / About</p>
          </Reveal>
          <Reveal className="about-statement">
            <p className="text-balance text-2xl leading-tight text-paper md:text-4xl lg:text-[2.75rem]">
              Mechanical Engineering at Purdue, working across packaging, advanced materials,
              and experimental systems.
            </p>
            <div className="about-meta">
              <div>
                <p className="about-meta-label">Focus</p>
                <p className="about-meta-text">
                  Packaging / Materials / Process / Reliability
                </p>
              </div>
              <div>
                <p className="about-meta-label">Method</p>
                <p className="about-meta-text">design — fabricate — characterize — model — iterate</p>
              </div>
            </div>
          </Reveal>
          <Reveal className="about-identity" delay={120}>
            <div className="about-identity-headshot">
              <Image
                src={siteConfig.headshotSrc}
                alt="Matthew Deng headshot"
                fill
                sizes="96px"
                className="object-contain"
              />
            </div>
            <div className="about-identity-copy">
              <Image
                src={siteConfig.purdueLogoSrc}
                alt="Purdue mark"
                width={36}
                height={24}
                className="about-identity-mark"
                style={{ width: "auto", height: "auto" }}
              />
              <p className="about-identity-label">West Lafayette / Purdue University</p>
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
              className="button-secondary button-icon-link"
              aria-label="Open Matthew Deng on LinkedIn"
            >
              <Image src={siteConfig.linkedInIconSrc} alt="" width={16} height={16} aria-hidden="true" />
              <span>LinkedIn</span>
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="button-secondary button-icon-link"
              aria-label="Email Matthew Deng"
            >
              <Image src={siteConfig.mailIconSrc} alt="" width={16} height={16} aria-hidden="true" />
              <span>Email</span>
            </a>
            <a href={siteConfig.resumeInquiryHref} className="button-primary">
              Request résumé
            </a>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
