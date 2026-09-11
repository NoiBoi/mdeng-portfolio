import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

type ResearchLinkProps = {
  href: string;
  label: string;
  meta: string;
  download?: boolean;
};

function ResearchLink({ href, label, meta, download }: ResearchLinkProps) {
  const content = (
    <>
      <span>
        <span className="research-link-meta">{meta}</span>
        <span className="research-link-title">{label}</span>
      </span>
      <span className="research-link-arrow" aria-hidden="true">&rarr;</span>
    </>
  );

  if (download) {
    return <a href={href} download className="research-link">{content}</a>;
  }

  return <Link href={href} className="research-link">{content}</Link>;
}

function ResearchProgram({
  index,
  lab,
  role,
  title,
  children,
  links,
  delay = 0
}: {
  index: string;
  lab: string;
  role: string;
  title: string;
  children: ReactNode;
  links: ReactNode;
  delay?: number;
}) {
  return (
    <Reveal className="research-program" delay={delay}>
      <div className="research-program-index" aria-hidden="true">{index}</div>
      <div className="research-program-copy">
        <div className="research-program-heading">
          <p className="section-label">{lab}</p>
          <p className="research-program-role">{role}</p>
        </div>
        <h3>{title}</h3>
        <div className="research-program-summary">{children}</div>
      </div>
      <div className="research-program-links">
        <p className="research-links-label">Related work</p>
        {links}
      </div>
    </Reveal>
  );
}

export function ResearchSection() {
  return (
    <section id="research" className="section-shell">
      <SectionHeading
        eyebrow="Research"
        title="Current work, organized by research context."
        description="Labs establish the question and methods; the linked case studies document the systems, analysis, and tooling developed within them."
      />

      <div className="research-programs">
        <ResearchProgram
          index="01"
          lab="CoSMAP Lab"
          role="Undergraduate Researcher / 2026—"
          title="Advanced packaging reliability"
          links={
            <ResearchLink
              href="/projects/cosmap-thermomechanical-packaging-characterization"
              label="Thermomechanical Packaging"
              meta="Characterization / Modeling"
            />
          }
        >
          <p>
            Experimental and computational work on temperature-dependent deformation in electronic packaging,
            including optical metrology, mechanical testing, and short-term solder-joint creep modeling.
          </p>
          <p>
            Current analysis emphasizes whole-specimen validation, uncertainty, and bounded interpolation rather
            than extrapolated lifetime or material-property claims.
          </p>
        </ResearchProgram>

        <ResearchProgram
          index="02"
          lab="Layered Materials & Structures (LSML) Lab"
          role="Undergraduate Student Researcher / Summer 2026—"
          title="MAX/MXene synthesis & research tooling"
          delay={80}
          links={
            <>
              <ResearchLink
                href="/projects/maxcalc-synthesis-planning-analysis"
                label="MAXCalc"
                meta="Stoichiometry / EMI Analysis"
              />
              <ResearchLink
                href="/projects/aluminum-v-jaw-fixture"
                label="Aluminum V-Jaw Fixture"
                meta="Processing Tooling"
              />
            </>
          }
        >
          <p>
            Supporting compositionally complex MAX/MXene processing through precursor design, powder preparation,
            synthesis support, characterization analysis, and lab-specific workflow development.
          </p>
          <p>
            Contributions include an <span className="math-inline">NbN</span>-based <span className="math-inline">TiNbAlN</span> route,
            auditable precursor calculations, MAXCalc, and a machined fixture for repeatable sample processing.
          </p>
        </ResearchProgram>

        <ResearchProgram
          index="03"
          lab="ICoN Programmable Cloud Lab"
          role="Undergraduate Researcher / 2026—"
          title="Autonomous materials preparation"
          links={
            <ResearchLink
              href="/projects/icon-automated-powder-dispensing"
              label="Automated Powder Dispensing"
              meta="Concept Selection / Prototype"
            />
          }
        >
          <p>
            Developing a recipe-driven powder-preparation architecture for controlled precursor storage,
            selection, dispensing, mass verification, mixing, and process-history tracking.
          </p>
          <p>
            The current path centers on a closed-loop variable-gap rotating-pin dispenser; hardware validation
            and multi-cartridge integration remain in development.
          </p>
        </ResearchProgram>

        <ResearchProgram
          index="04"
          lab="Independent Research"
          role="Revised manuscript / 2026"
          title="CMB and extragalactic background-light photons"
          delay={80}
          links={
            <ResearchLink
              href="/assets/research/revised-ebl-paper-aastex-twocolumn-cleaned.pdf"
              label="Read the revised paper"
              meta="AASTeX / PDF"
              download
            />
          }
        >
          <p>
            A present-day comparison of the CMB with the optical-infrared extragalactic background light,
            framed around photon number density rather than a cumulative count of photons ever emitted.
          </p>
          <div className="research-equation-row" aria-label="Key paper estimates">
            <span><i>n</i><sub>&gamma;, CMB, 0</sub> &asymp; 410.7 cm<sup>-3</sup></span>
            <span><i>n</i><sub>&gamma;, EBL, 0</sub> &asymp; 0.7-1.2 cm<sup>-3</sup></span>
          </div>
        </ResearchProgram>
      </div>
    </section>
  );
}
