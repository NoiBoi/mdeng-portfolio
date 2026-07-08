import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import type { ReactNode } from "react";

const anasoriDetails = [
  {
    heading: "Research role and scope",
    paragraphs: [
      "Work combines hands-on MAX/MXene synthesis with mechanical and process-improvement tooling. Public-safe scope includes precursor calculations, powder preparation, HF/HCl etching exposure, molten-salt etching setup, centrifugation washing, filtration, delamination, sample storage, and lab-specific workflow documentation.",
      "Systems include standard Ti3C2Tx processing exposure as well as nitride, high-entropy, oxycarbide, carbonitride, heavy-metal, and other compositionally complex MAX/MXene workflows."
    ]
  },
  {
    heading: "TiNbAlN route contribution",
    paragraphs: [
      "Contributed to TiNbAlN MAX synthesis using an NbN-based precursor route and supported molten-salt etching toward a novel TiNbAlN-derived MXene. Contributions included stoichiometric design, mass-ratio calculations, precursor measurement, mixing, ball-milling preparation, and etching setup.",
      "Annealing and XRD characterization were performed by Dr. Hassan, so the defensible public framing is contribution to the synthesis route and support toward the derived MXene rather than an independent discovery claim."
    ]
  },
  {
    heading: "Processing and tooling",
    paragraphs: [
      "Developed spreadsheet-based precursor calculations for systems including TiNbAlN, Ti3AlCN, Ti4AlN3, and Nb2AlN, converting target formulas and precursor options into practical batch masses.",
      "Also developed the V-jaw sample-processing fixture path from printed prototypes to a 6061-T6 aluminum design with a 15 deg V-groove, pass-through milling clearance, and a technical drawing produced for fabrication."
    ]
  }
];

const cosmologyDetails = [
  {
    heading: "Research question",
    paragraphs: [
      "Independent theory work comparing the present-day CMB photon number density with the optical-infrared extragalactic background light. The project began as a broad question about early-universe photons versus photons produced later by stars, galaxies, dust, accretion, and other baryonic astrophysical processes.",
      "The revised manuscript narrows the problem into a physically controlled present-day comparison rather than trying to count all photons ever produced by baryonic processes."
    ]
  },
  {
    heading: "Conceptual correction",
    paragraphs: [
      <>
        A central correction is that the commonly cited value near 411 is not a CMB-to-non-CMB
        photon ratio. It is the present-day CMB photon number density:{" "}
        <MathInline>
          <i>n</i>
          <sub>&gamma;,CMB,0</sub> &asymp; 410.7 cm<sup>-3</sup>
        </MathInline>
        . The photon-to-baryon ratio is a different quantity, of order{" "}
        <MathInline>10<sup>9</sup></MathInline>.
      </>,
      <>
        Because the EBL is not a blackbody, the paper uses the intensity-to-number-density
        framework{" "}
        <MathInline>
          <i>n</i>
          <sub>&gamma;,EBL,0</sub> = (4&pi; / <i>c</i>) &int;{" "}
          <i>I</i>
          <sub>&nu;</sub> / (<i>h&nu;</i>) d&nu;
        </MathInline>
        , while distinguishing photon number density from energy density.
      </>
    ]
  },
  {
    heading: "Revised estimate and status",
    paragraphs: [
      <>
        The revised optical-infrared EBL photon-count estimate is{" "}
        <MathInline>
          <i>n</i>
          <sub>&gamma;,EBL,0</sub> &asymp; 0.7-1.2 cm<sup>-3</sup>
        </MathInline>
        , with a fiducial value near{" "}
        <MathInline>0.8-1.0 cm<sup>-3</sup></MathInline>. That implies the CMB outnumbers the
        optical-infrared EBL by roughly a few hundred, about{" "}
        <MathInline>3 &times; 10<sup>2</sup> to 6 &times; 10<sup>2</sup></MathInline>.
      </>,
      "The value of the project is theoretical framing, unit discipline, literature synthesis, and correction of a misleading interpretation, not a new observational discovery. The manuscript is being revised in an AASTeX-style two-column format."
    ]
  }
] satisfies Array<{ heading: string; paragraphs: ReactNode[] }>;

function MathInline({ children }: { children: ReactNode }) {
  return <span className="math-inline">{children}</span>;
}

export function ResearchSection() {
  return (
    <section id="research" className="section-shell border-t border-white/10">
      <SectionHeading
        eyebrow="Research"
        title="Materials processing, research fixtures, and quantitative notebooks."
        description="A quieter section for academic and independent research work, focused on public-safe process notes, theory framing, and approved paper assets."
      />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal className="border border-white/10 bg-graphite-900 p-5 md:p-7">
          <p className="section-label">Anasori Lab, Purdue University</p>
          <h3 className="mt-4 text-2xl font-semibold text-paper md:text-4xl">
            TiNbAlN-derived MXene synthesis support
          </h3>
          <p className="mt-3 font-mono text-[0.68rem] font-bold uppercase text-muted">
            Undergraduate Student Researcher / Summer 2026-Present
          </p>
          <p className="mt-6 max-w-3xl text-base leading-7 text-muted">
            Contributing to TiNbAlN MAX synthesis and molten-salt etching support toward a
            novel TiNbAlN-derived MXene, alongside compositionally complex MAX/MXene
            processing and lab-specific tooling development.
          </p>
          <div className="mt-6 space-y-5">
            {anasoriDetails.map((section) => (
              <section key={section.heading}>
                <h4 className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.08em] text-paper">
                  {section.heading}
                </h4>
                <div className="mt-3 space-y-3">
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={`${section.heading}-${index}`} className="text-sm leading-6 text-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </Reveal>

        <Reveal className="border border-white/10 bg-graphite-900 p-5 md:p-7" delay={120}>
          <p className="section-label">Cosmology Research</p>
          <h3 className="mt-4 text-2xl font-semibold text-paper md:text-4xl">
            Extragalactic Background Light & the CMB
          </h3>
          <p className="mt-6 text-base leading-7 text-muted">
            Independent revised manuscript comparing present-day CMB photon number density
            with the optical-infrared extragalactic background light.
          </p>
          <div className="mt-6 space-y-5">
            {cosmologyDetails.map((section) => (
              <section key={section.heading}>
                <h4 className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.08em] text-paper">
                  {section.heading}
                </h4>
                <div className="mt-3 space-y-3">
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={`${section.heading}-${index}`} className="text-sm leading-6 text-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
          <a
            href="/assets/research/revised-ebl-paper-aastex-twocolumn-cleaned.pdf"
            download
            className="mt-6 inline-flex items-center border border-white/10 px-5 py-3 font-mono text-[0.68rem] font-bold uppercase text-paper transition-colors hover:border-cyan/55 hover:text-cyan focus-visible:focus-ring"
            aria-label="Download revised CMB and extragalactic background light paper PDF"
          >
            Read paper
          </a>
        </Reveal>
      </div>
    </section>
  );
}
