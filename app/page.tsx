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

      <section id="about" className="section-shell closing-about border-t border-white/10">
        <Reveal className="closing-section-heading">
          <p className="section-label">About</p>
        </Reveal>

        <div className="about-grid">
          <Reveal className="about-statement">
            <p>
              I like figuring out how things work, especially when that means bouncing between
              CAD, the lab, and MATLAB. Most of my projects start with building something,
              testing it, and then chasing down why it behaved the way it did.
            </p>
            <div className="about-meta">
              <div className="about-meta-item">
                <p className="about-meta-label">Focus</p>
                <p className="about-meta-text">
                  Packaging / Materials / Process / Reliability
                </p>
              </div>
              <div className="about-meta-item">
                <p className="about-meta-label">Method</p>
                <p className="about-meta-text">Design / fabricate / characterize / model / iterate</p>
              </div>
            </div>
          </Reveal>

          <Reveal className="about-identity" delay={120}>
            <div className="about-identity-headshot">
              <Image
                src={siteConfig.headshotSrc}
                alt="Matthew Deng headshot"
                fill
                sizes="(max-width: 700px) 116px, 176px"
                unoptimized
                className="object-contain"
              />
            </div>
            <div className="about-identity-copy">
              <Image
                src={siteConfig.purdueLogoSrc}
                alt="Purdue mark"
                width={112}
                height={34}
                className="about-identity-mark"
                style={{ width: "auto", height: "auto" }}
              />
              <div>
                <p className="about-identity-name">Matthew Deng</p>
                <p className="about-identity-detail">Mechanical Engineering</p>
              </div>
              <p className="about-identity-label">Purdue University / West Lafayette</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="contact" className="section-shell closing-contact border-t border-white/10">
        <div className="contact-grid">
          <Reveal className="contact-intro">
            <p className="section-label">Contact</p>
            <h2>Questions, collaboration, and project details.</h2>
            <p>For project context, research conversations, or résumé requests, reach me directly.</p>
          </Reveal>

          <Reveal className="contact-direct" delay={80}>
            <p className="contact-direct-label">Email</p>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            <p>Mechanical Engineering / Purdue University</p>
          </Reveal>
        </div>

        <Reveal className="contact-actions" delay={120}>
          <a
            href={`mailto:${siteConfig.email}`}
            className="contact-action"
            aria-label="Email Matthew Deng"
          >
            <Image src={siteConfig.mailIconSrc} alt="" width={18} height={18} aria-hidden="true" />
            <span>Email</span>
            <span aria-hidden="true">→</span>
          </a>
          <a
            href={siteConfig.linkedIn}
            target="_blank"
            rel="noreferrer"
            className="contact-action"
            aria-label="Open Matthew Deng on LinkedIn"
          >
            <Image src={siteConfig.linkedInIconSrc} alt="" width={18} height={18} aria-hidden="true" />
            <span>LinkedIn</span>
            <span aria-hidden="true">→</span>
          </a>
          <a href={siteConfig.resumeInquiryHref} className="contact-action contact-action-primary">
            <span>Request résumé</span>
            <span aria-hidden="true">→</span>
          </a>
        </Reveal>

        <Reveal className="contact-footer" delay={160}>
          <p>Matthew Deng / Mechanical Engineering</p>
          <p>Purdue University / West Lafayette, Indiana</p>
        </Reveal>
      </section>
    </main>
  );
}
