export type ProjectMedia = {
  src: string;
  alt: string;
  caption: string;
  fit?: "cover" | "contain";
  tone?: "photo" | "cad" | "document";
};

export type ProjectDetailSection = {
  heading: string;
  paragraphs: string[];
};

export type Project = {
  title: string;
  slug: string;
  category: string;
  yearStatus: string;
  role: string;
  description: string;
  tags: string[];
  metrics?: string[];
  featured?: boolean;
  mediaLabels: string[];
  cardMedia?: ProjectMedia;
  media?: ProjectMedia[];
  galleryLayout?: "standard" | "per" | "pulsejet" | "frc" | "v-jaw";
  details: string[];
  detailSections?: ProjectDetailSection[];
  cardSize?: "wide" | "tall" | "standard";
};

export const projects: Project[] = [
  {
    title: "LYNX - Modular 12-DOF Quadruped Robot",
    slug: "lynx",
    category: "Robotics",
    yearStatus: "2023-Present",
    role: "Founder & Lead Engineer",
    description:
      "A quadruped robotics platform for mechanical design, embedded electronics, controls, and iterative manufacturing.",
    tags: [
      "Robotics",
      "CAD",
      "FDM",
      "Embedded Electronics",
      "Balance Control"
    ],
    metrics: [
      "12-DOF modular quadruped architecture",
      "Full parametric Fusion redesign for Mk.1",
      "Belt-driven knee replacing earlier rod-driven mechanism",
      "64% full-frame mass reduction vs. CAD baseline",
      "71% printed leg-section mass reduction",
      "PLA+ anisotropy testing with MATLAB regression",
      "Custom PCB designed and fabricated; integration in progress",
      "Upgrade path toward stronger printed or metal structure"
    ],
    featured: true,
    mediaLabels: [
      "CAD Assembly",
      "Exploded View",
      "Physical Prototype",
      "Custom Electronics",
      "Test Footage"
    ],
    details: [
      "Current status: LYNX Mk.1 mechanical redesign and electronics integration in progress."
    ],
    detailSections: [
      {
        heading: "Overview",
        paragraphs: [
          "LYNX is a long-running quadruped robotics testbed that began as a high-school robodog concept and has evolved into a more deliberate platform for mechanical design, embedded electronics, controls, and iterative manufacturing. The current direction is a compact, indoor, dorm-compatible quadruped that can be repeatedly disassembled, tested, modified, and upgraded as its systems mature.",
          "The architecture uses four modular legs with three actuated axes per leg, creating a 12-DOF platform for future standing, flat-ground motion, turning, and IMU-informed gait work. The project is not presented as a finished autonomous robot; Mk.1 is an integration and validation phase focused on reliable mechanical modules, electronics bring-up, joint behavior, and safe basic motion."
        ]
      },
      {
        heading: "From V1 proof of concept to Mk.1 redesign",
        paragraphs: [
          "V1 established physical proof of concept through printed left and right leg-module iterations, front-frame mounting, original servo integration, Raspberry Pi-based angular telemetry, and simple test-rig movement. It also exposed the constraints that made a ground-up redesign necessary.",
          "The V1 rod-driven knee was useful as an early mechanism study, but it lacked the stiffness and angular precision needed for a controlled, repeatable platform. The baseline frame was intentionally overbuilt, which made it a useful structural reference for later lightweighting rather than a failed prototype."
        ]
      },
      {
        heading: "Mechanical architecture and transmission strategy",
        paragraphs: [
          "LYNX Mk.1 was rebuilt in Fusion around shared reference geometry and parametric relationships between the torso, leg modules, mounting points, and structural members. The documented envelope is roughly 4 x 3 x 14 inches, with about 4.5-inch upper links and 4.0-inch lower links.",
          "The redesigned leg replaces the earlier rod-driven knee with a belt-driven knee system, revised motor packaging, and a more compact lower-leg layout to reduce torque and center-of-mass penalties. The mechanical standards emphasize metal shafts, supported rotating interfaces, bearings or bushings, belt transmissions where packaging permits, and avoiding unsupported plastic-on-plastic load-bearing joints unless validated.",
          "The in-progress leg-module reference captures belt-drive stages, actuator packaging, bearing-supported rotating features, standardized hardware, dimensional controls, and fastener access. It is a working technical reference for the Mk.1 redesign, not a claim of finalized production hardware."
        ]
      },
      {
        heading: "Lightweighting and DfAM workflow",
        paragraphs: [
          "Lightweighting was treated as an engineering trade study. Relative to the deliberately overbuilt V1 frame baseline, the redesigned frame achieved a 64% mass reduction while preserving development headroom. The printed portions of the leg sections achieved a 71% mass reduction relative to an earlier rough leg baseline.",
          "Generative-design and shape-optimization studies informed material removal and reinforcement, but final geometry was constrained by print orientation, load paths, fastener access, belt routing, bearing interfaces, stiffness, assembly sequence, and fabrication reality.",
          "Because the structure is primarily printed, PLA+ material behavior was evaluated under project printer conditions across multiple print orientations. MATLAB regression converted that test data into design-useful property trends, helping connect print direction and local reinforcement decisions to real structural choices."
        ]
      },
      {
        heading: "Electronics and controls integration",
        paragraphs: [
          "A custom electronics/control PCB has been designed and fabricated and is currently being integrated. The architecture targets a Raspberry Pi, Teensy, accelerometer/IMU hardware, actuator interfaces, a 12 V actuator bus, logic and sensor rails, hardware e-stop provisions, current limiting, brownout awareness, and safer fault handling.",
          "These are integration requirements and architecture targets rather than finished autonomy claims. The immediate objective is to validate the redesigned leg modules, electronics integration, joint behavior, and safe basic motion before advancing toward standing, flat-ground walking, turning, and later IMU-informed gait adaptation."
        ]
      }
    ],
  },
  {
    title: "Aluminum V-Jaw Fixture - Materials-Processing Tooling",
    slug: "aluminum-v-jaw-fixture",
    category: "Manufacturing / Research Tooling",
    yearStatus: "Machined / validated",
    role: "Designer and Fabricator",
    description:
      "Iterative fixture development for clamping circular materials samples during pass-through milling, progressing from 3D-printed prototypes to a machinable aluminum design and standalone technical drawing.",
    tags: ["CAD", "DFM", "Fixture Design", "CNC", "Additive Prototyping"],
    metrics: [
      "Machined, validated, and used in active sample-processing workflow",
      "15 deg V-groove for circular MAX-phase samples",
      "Approx. 10-25 mm intended working range",
      "Roughly 60 min to 20 min estimated small-puck processing improvement"
    ],
    mediaLabels: ["Technical Drawing / Prototype Photo"],
    cardMedia: {
      src: "/assets/v-jaw/vjaw-v3-ortho.png",
      alt: "V-jaw fixture V3 orthographic CAD refinement on a dark grid.",
      caption: "V3 CAD refinement",
      fit: "cover",
      tone: "cad"
    },
    media: [
      {
        src: "/assets/v-jaw/vjaw-v1-real-photo.png",
        alt: "First V-jaw prototype clamping a circular sample in a vise.",
        caption: "Printed V-jaw prototype used to validate cylindrical sample clamping before aluminum redesign.",
        fit: "cover",
        tone: "photo"
      },
      {
        src: "/assets/v-jaw/vjaw-v2-minmax-functionality-demo.png",
        alt: "V-jaw V2 CAD view showing minimum and maximum clamping positions.",
        caption: "V2 travel study used to check cylinder range and pass-through clamping geometry.",
        fit: "contain",
        tone: "cad"
      },
      {
        src: "/assets/v-jaw/vjaw-v2-ortho.png",
        alt: "V-jaw V2 orthographic CAD assembly with guide rods and central round sample.",
        caption: "V2 CAD assembly showing guide rods, jaw geometry, and early sample-holding layout.",
        fit: "cover",
        tone: "cad"
      },
      {
        src: "/assets/v-jaw/vjaw-v2-side-top-view.png",
        alt: "V-jaw V2 side-top CAD view showing threaded adjustment hardware.",
        caption: "V2 side-top view showing threaded hardware and jaw closure around a circular sample.",
        fit: "contain",
        tone: "cad"
      },
      {
        src: "/assets/v-jaw/vjaw-v3-ortho.png",
        alt: "V-jaw V3 orthographic CAD refinement with cleaner jaw geometry.",
        caption: "V3 refinement after real mill feedback on stiffness, access, and compactness.",
        fit: "cover",
        tone: "cad"
      },
      {
        src: "/assets/v-jaw/vjaw-v4-technical-drawing.png",
        alt: "V-jaw fixture block V4 technical drawing with dimensions, tolerances, and detail view.",
        caption: "Final aluminum fixture drawing produced for mill fabrication.",
        fit: "contain",
        tone: "document"
      }
    ],
    galleryLayout: "v-jaw",
    details: [
      "A purpose-built milling fixture for making circular MAX-phase samples safer, faster, and more repeatable to process into powder."
    ],
    detailSections: [
      {
        heading: "Problem definition",
        paragraphs: [
          "The fixture addressed a practical bottleneck in materials processing. Small circular MAX-phase pucks produced after hot pressing and annealing were difficult to machine or powderize efficiently with the previous setup, which relied on slow vise-grip positioning and low-power drill-press work.",
          "The fixture needed to stabilize circular samples in a mill vise while preserving pass-through milling clearance and practical powder collection. It also had to accommodate varying diameters, resist shifting, separate heated material from polymer tooling during prototype stages, maintain vise clearance, and avoid losing sample powder during collection."
        ]
      },
      {
        heading: "Printed prototype validation",
        paragraphs: [
          "The initial V-groove concept naturally centered cylindrical samples with two support lines instead of relying on a flat jaw. V1 proved the clamping concept and helped isolate fit and mounting issues against the real vise and mill geometry.",
          "V2 reduced the frame size, improved the wood-insulator mounting approach, and validated strong clamping. It held roughly 10-30+ mm cylinders and a real MAX sample. In one test, a 30 mm cylinder supported lifting roughly the 15 lb vise and fixture assembly without slipping."
        ]
      },
      {
        heading: "Mill-test failure modes",
        paragraphs: [
          "Real milling showed that secure clamping alone was not enough. Vertical-position bolts added complexity, wood insulation deformed, PLA remained too close to the heated sample after deformation, the base geometry needed to be more compact, limited contact could allow inward deformation, and aluminum foil worked better than weigh paper for powder collection.",
          "The printed prototypes were useful validation tools rather than failures: they confirmed the right basic clamping geometry and exposed the exact constraints the final aluminum design needed to solve."
        ]
      },
      {
        heading: "Aluminum redesign",
        paragraphs: [
          "The final fixture transitioned the validated V-jaw concept into a machinable aluminum design. It uses matching V-jaw halves, clearance-fit guide rods for alignment, and the mill vise as the primary clamping force. This separates sample alignment from force generation.",
          "The final design uses a 15 deg V-groove, an intended working range of approximately 10-25 mm, improved pass-through clearance, more robust guide and clamping hardware, protected contact surfaces, and foil-compatible powder collection."
        ]
      },
      {
        heading: "Workflow outcome",
        paragraphs: [
          "The machined aluminum fixture was validated and used in an active sample-processing workflow. For small MAX pucks, Dr. Hassan estimated that processing decreased from roughly 60 minutes to about 20 minutes. That is about 40 minutes saved per small puck, roughly a 67% reduction, and about 3x throughput for that specific powderization step.",
          "This should be read as a lab workflow estimate rather than a formal time study, but it demonstrates the practical value of the design-for-use loop: identify a bottleneck, prototype cheaply, test on real equipment, observe failure modes, redesign for fabrication, machine the fixture, and validate it in use."
        ]
      }
    ],
    cardSize: "wide"
  },
  {
    title: "Purdue Electric Racing - Aero & Composite Manufacturing",
    slug: "purdue-electric-racing-aero-composites",
    category: "Composites / Motorsport",
    yearStatus: "Selected work",
    role: "Aerodynamics Subteam Engineer",
    description:
      "Aerodynamic component and composite-manufacturing work for a Formula SAE team, including resin-infusion workflow support and FDM tooling for vacuum processes.",
    tags: ["Composites", "FDM", "Aerodynamics", "Manufacturing"],
    mediaLabels: ["Composite Tooling / Race-Car Component"],
    cardMedia: {
      src: "/assets/per/per-26-full-car.png",
      alt: "Purdue Electric Racing Formula SAE car with aero package in the paddock.",
      caption: "PER 26 full-car context",
      fit: "cover",
      tone: "photo"
    },
    media: [
      {
        src: "/assets/per/per-26-full-car.png",
        alt: "Purdue Electric Racing Formula SAE car with aero package in the paddock.",
        caption: "2026 Purdue Electric Racing vehicle context for aero and composite work.",
        fit: "cover",
        tone: "photo"
      },
      {
        src: "/assets/per/per-26-prelim-aero-design.png",
        alt: "Preliminary Formula SAE aero CAD layout with front wing, rear wing, and body surfaces.",
        caption: "Preliminary aero CAD layout used to reason about wing package geometry and vehicle integration.",
        fit: "contain",
        tone: "cad"
      },
      {
        src: "/assets/per/per-vacuum-infusion-rubber-port-cad.png",
        alt: "CAD render of a rubber vacuum-infusion port component.",
        caption: "Redesigned vacuum-infusion port with a wider base for more stable tubing entry during bag setup.",
        fit: "contain",
        tone: "cad"
      }
    ],
    galleryLayout: "per",
    details: [
      "Formula SAE work spanning aerodynamic design, composite manufacturing, tooling, and build execution."
    ],
    detailSections: [
      {
        heading: "Aero design and integration",
        paragraphs: [
          "My Purdue Electric Racing work sits at the interface between aero geometry and the constraints of producing repeatable carbon-fiber parts. I contributed to the front-wing E2/E3 design effort while working within aerodynamic, packaging, mounting, and assembly constraints.",
          "The work included practical support needed to move wing geometry into hardware: drilling and mounting fixtures, hardware documentation, and standardization for more repeatable assembly. The goal was not just to make a part plausible in CAD, but to make it buildable, positionable, and serviceable on a Formula SAE vehicle."
        ]
      },
      {
        heading: "Composite manufacturing",
        paragraphs: [
          "I supported hands-on fabrication across the 2026 aero package, including front-wing elements, nosecone, rear-wing elements, and undertray work. Manufacturing steps included MDF machining, mold and fixture preparation, gluing and sanding, carbon-fiber selection and cutting, layup, vacuum-infusion setup, post-cure finishing, sanding, and visual inspection.",
          "That work made the gap between a theoretically workable composite design and a reliably produced part very concrete. Material placement, bag behavior, resin flow, tooling geometry, edge finishing, and vacuum integrity all affected whether a part could move cleanly through the build process."
        ]
      },
      {
        heading: "Vacuum-infusion tooling improvement",
        paragraphs: [
          "One focused tooling improvement was a redesigned resin infusion/extraction port. The original printed port geometry could tip or fall inside the bag setup, disturbing tubing placement and risking loss of vacuum suction.",
          "The revised port used a wider base for stability and adjusted geometry to reduce puncture risk at the bag interface. The updated printed fixture provided a more controlled tubing-entry point during infusion setup and improved process reliability."
        ]
      },
      {
        heading: "Engineering takeaway",
        paragraphs: [
          "The PER work is valuable because it combined design participation with production responsibility. It required attention to geometry, mounting, documentation, and real composite workflow behavior without implying sole ownership of the full aero package.",
          "The strongest takeaway is practical: a successful aero component is not only an aerodynamic surface, but a manufacturable system involving molds, fixtures, fasteners, operators, process timing, and inspection."
        ]
      }
    ],
    cardSize: "standard"
  },
  {
    title: "PURPL / NDS - Pulsejet UAV Propulsion Analysis",
    slug: "purpl-nds-pulsejet-uav-propulsion",
    category: "Propulsion",
    yearStatus: "Selected work",
    role: "Mechanical & Analysis Contributor",
    description:
      "Takeoff performance, structural screening, dynamic reed-valve modeling, and safety-planning support for a student pulsejet UAV project.",
    tags: ["Propulsion", "MATLAB", "Structural Analysis", "Systems Integration"],
    metrics: ["75 lbf pulsejet UAV"],
    mediaLabels: ["Pulsejet Concept / Simulation Output"],
    cardMedia: {
      src: "/assets/purpl/pulsejet-vehicle-initial-cad.png",
      alt: "Initial pulsejet UAV CAD model with wing, tail, fuselage, and pulsejet engine layout.",
      caption: "Initial vehicle CAD",
      fit: "cover",
      tone: "cad"
    },
    media: [
      {
        src: "/assets/purpl/pulsejet-vehicle-initial-cad.png",
        alt: "Initial pulsejet UAV CAD model with wing, tail, fuselage, and pulsejet engine layout.",
        caption: "Vehicle CAD architecture",
        fit: "cover",
        tone: "cad"
      },
      {
        src: "/assets/purpl/pulsejet-reed-valve-analysis-graphs.png",
        alt: "Reed-valve analysis plots showing pressure difference, reed tip opening, and reed tip velocity.",
        caption: "Reed-valve dynamic response plots",
        fit: "contain",
        tone: "document"
      },
      {
        src: "/assets/purpl/pulsejet-takeoff-calculations-tables.png",
        alt: "Takeoff ground-roll calculation document with equation and rolling-friction table.",
        caption: "Takeoff ground-roll calculation notes",
        fit: "contain",
        tone: "document"
      },
      {
        src: "/assets/purpl/pulsejet-wing-calculations-matlab-script.png",
        alt: "MATLAB script screenshot for wing cube loading, aspect ratio, wing area, span, and chord calculations.",
        caption: "MATLAB wing sizing calculation script",
        fit: "contain",
        tone: "document"
      }
    ],
    galleryLayout: "pulsejet",
    details: [
      "Early-stage student pulsejet UAV propulsion analysis and mechanical integration support."
    ],
    detailSections: [
      {
        heading: "Overview",
        paragraphs: [
          "PURPL / NDS was an early-stage student pulsejet UAV effort where my work focused on analysis and mechanical integration support rather than validated flight performance. The public material is limited to non-sensitive summary content: vehicle CAD, reed-valve plots, takeoff calculation notes, and a MATLAB wing-sizing script."
        ]
      },
      {
        heading: "Analysis process",
        paragraphs: [
          "The work covered takeoff performance analysis, geometry and sizing calculations, structural screening, reed-valve dynamic modeling, and safety-planning support. The intent was to reason about whether the proposed vehicle architecture and propulsion assumptions were mechanically plausible before deeper fabrication or test claims.",
          "The gallery is ordered as the actual technical sequence: vehicle CAD architecture, reed-valve response plots, takeoff ground-roll calculations, and MATLAB wing sizing work."
        ]
      },
      {
        heading: "Status",
        paragraphs: [
          "This project is intentionally framed as analysis and integration support for an early student platform. No public claims are made here about completed propulsion validation, flight testing, or achieved performance."
        ]
      }
    ],
    cardSize: "standard",
  },
  {
    title: "FRC Robotics - Mechanical Design and Team Leadership",
    slug: "frc-robotics-mechanical-design-leadership",
    category: "Robotics",
    yearStatus: "Team 868",
    role: "Mechanical Lead / Mentor",
    description:
      "Mechanical subsystem design, fabrication, and cross-functional leadership for Team 868, including CAD and machining mentorship.",
    tags: ["Robotics", "CAD", "Manufacturing", "Leadership"],
    mediaLabels: ["Competition Robot / Mechanism"],
    cardMedia: {
      src: "/assets/frc/techhounds-bot-in-competition-2024.png",
      alt: "TechHOUNDS Team 868 robot competing on a 2024 FRC field.",
      caption: "2024 competition robot",
      fit: "cover",
      tone: "photo"
    },
    media: [
      {
        src: "/assets/frc/techhounds-bot-in-competition-2024.png",
        alt: "TechHOUNDS Team 868 robot competing on a 2024 FRC field.",
        caption: "Competition context",
        fit: "cover",
        tone: "photo"
      },
      {
        src: "/assets/frc/techhounds-bot-closeup.png",
        alt: "Close-up of a TechHOUNDS robot mechanism with aluminum structure, rollers, and intake components.",
        caption: "Mechanism close-up",
        fit: "cover",
        tone: "photo"
      }
    ],
    galleryLayout: "frc",
    details: [
      "Mechanical subsystem design, fabrication planning, and cross-functional robotics team leadership."
    ],
    detailSections: [
      {
        heading: "Mechanical design and fabrication",
        paragraphs: [
          "FRC robotics combined mechanism design, fabrication planning, and cross-functional coordination under the pace of a competition season. My work included mechanical subsystem development, intake and shooter-related mechanism work, CAD iteration, fabrication support, and practical design decisions around serviceability and assembly.",
          "The project media pairs field context with a closer mechanism view to show both the competition environment and the hardware-level detail behind the robot."
        ]
      },
      {
        heading: "Leadership and mentorship",
        paragraphs: [
          "The leadership work included helping teammates develop CAD habits, machining judgment, and iteration discipline while coordinating mechanical decisions with electrical, programming, and strategy constraints. Team outcomes are presented as team outcomes; my role was to contribute mechanical direction and mentorship within that broader group effort."
        ]
      }
    ],
    cardSize: "standard"
  }
];

export const selectedProjects = projects.filter((project) => !project.featured);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
