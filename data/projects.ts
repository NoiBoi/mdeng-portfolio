export type ProjectMedia = {
  src: string;
  alt: string;
  caption: string;
  fit?: "cover" | "contain";
  tone?: "photo" | "cad" | "document";
  unoptimized?: boolean;
};

export type ProjectDetailSection = {
  heading: string;
  paragraphs: string[];
};

export type ProjectCodeExcerpt = {
  label: string;
  language: string;
  code: string;
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
  homepage?: boolean;
  homepageGroup?: "research" | "engineering";
  homepageTitle?: string;
  homepageMeta?: string;
  homepageDescription?: string;
  homepageTags?: string[];
  homepageHideMedia?: boolean;
  logoSrc?: string;
  mediaLabels: string[];
  cardMedia?: ProjectMedia;
  media?: ProjectMedia[];
  galleryLayout?: "standard" | "per" | "pulsejet" | "frc" | "v-jaw" | "maxcalc" | "icon" | "creep";
  codeExcerpt?: ProjectCodeExcerpt;
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
    title: "CoSMAP - Packaging Characterization & Reliability Testing",
    slug: "cosmap-thermomechanical-packaging-characterization",
    category: "Semiconductor Packaging / Reliability",
    yearStatus: "Current research",
    homepageTitle: "Characterization & Testing",
    homepageGroup: "research",
    homepageMeta: "CoSMAP / 2026 to Present",
    homepageDescription:
      "Fixture-led warpage, bend, shear, vibrometry, and shock workflows connecting 3D metrology with MATLAB and ANSYS.",
    homepageTags: ["Packaging", "Metrology", "Reliability"],
    role: "Undergraduate Researcher",
    description:
      "Fixture design, 3D metrology, MATLAB analysis, and ANSYS modeling for thermomechanical warpage, bend, shear, vibration, and shock characterization in advanced packaging.",
    tags: ["Advanced Packaging", "Optical Metrology", "Mechanical Testing", "Thermomechanical Reliability", "Experimental Design"],
    metrics: [
      "Keyence VK-X3000 in-situ thermal-warpage workflow",
      "Custom thermal-chamber fixturing for optical access and specimen positioning",
      "MATLAB analysis and ANSYS thermomechanical correlation",
      "75% reduction in unusable four-point-bend results: 0.4 to 0.1 errors per test"
    ],
    mediaLabels: ["Experimental Characterization Workflow"],
    details: [
      "Fixture design ties the CoSMAP work together: each setup has to locate the specimen repeatably, preserve access for the measurement system, and produce data that can be compared with a mechanical model."
    ],
    detailSections: [
      {
        heading: "In-situ warpage characterization",
        paragraphs: [
          "I co-own development of an in-situ thermomechanical warpage workflow built around a Keyence VK-X3000 and a custom thermal chamber. My fixture work inside the chamber focuses on optical access, controlled specimen positioning, and repeatable placement across temperature-dependent scans.",
          "The setup is being developed as a measurement system rather than a loose collection of instruments: chamber geometry, line of sight, specimen support, thermal exposure, and scan repeatability all affect whether the resulting 3D surface data can support a defensible warpage result."
        ]
      },
      {
        heading: "Metrology, MATLAB, and model correlation",
        paragraphs: [
          "I characterize temperature-dependent warpage and deformation from 3D metrology data, with MATLAB workflows used to quantify displacement, curvature, and thermal response across the measured surface.",
          "ANSYS thermomechanical workflows provide a parallel model of the package response. The objective is to compare modeled and measured behavior, identify where fixture or boundary-condition assumptions matter, and improve the experimental and simulation workflows together."
        ]
      },
      {
        heading: "Mechanical-test fixtures",
        paragraphs: [
          "I designed precision fixtures for four-point-bend and solder-joint shear testing, integrating specimen-locating features and sensor mounting into the test setup. The fixture geometry is intended to reduce setup variability while keeping loading and measurement interfaces accessible.",
          "Iteration on the four-point-bend setup reduced unusable results from 0.4 to 0.1 errors per test, a 75% reduction. That result reflects fixture and workflow improvement rather than a change to the material being tested."
        ]
      },
      {
        heading: "Vibration and shock support",
        paragraphs: [
          "I also support Optomet 3D laser-vibrometry and Lansmont shock testing through calibration, experiment execution, and analysis of package displacement and shock response. This work extends the same fixture-and-measurement approach into dynamic loading, where alignment, sensor access, and test repeatability remain central constraints."
        ]
      },
    ],
    cardSize: "wide"
  },
  {
    title: "CoSMAP - Innolot Solder-Joint Creep Modeling & Analysis",
    slug: "cosmap-innolot-creep-modeling-analysis",
    category: "Semiconductor Packaging / Creep Modeling",
    yearStatus: "Short-term model / 2026",
    homepageTitle: "Creep Modeling & Analysis",
    homepageGroup: "research",
    homepageMeta: "CoSMAP / 2026",
    homepageDescription:
      "A 23-test Innolot creep model selected through whole-specimen validation, with uncertainty kept inside the measured domain.",
    homepageTags: ["Creep", "MATLAB", "Model Validation"],
    role: "Research Analysis & Model Development",
    description:
      "A bounded interpolation model for short-term Innolot solder-joint creep, developed from raw tester records through data reduction, candidate-model comparison, whole-specimen validation, and uncertainty analysis.",
    tags: ["Solder-Joint Creep", "MATLAB", "Nonlinear Regression", "Cross-Validation", "Uncertainty Analysis"],
    metrics: [
      "23 retained short-term creep tests",
      "30-60 °C / 50-90 N measured test matrix",
      "0.251 median leave-one-specimen-out normalized RMSE",
      "100 / 100 whole-specimen bootstrap refits converged"
    ],
    mediaLabels: ["Test Matrix", "Measured Records", "Controller Audit", "Replicates", "Tertiary Onset"],
    media: [
      {
        src: "/assets/innolot/measured-creep-records.png",
        alt: "Measured engineering shear strain versus time for Innolot specimens grouped at 30, 45, and 60 degrees Celsius.",
        caption: "Reduced measured records: the 60 °C, 90 N specimens are separated after rapid acceleration toward the sensor limit",
        fit: "contain",
        tone: "document"
      },
      {
        src: "/assets/innolot/test-matrix.png",
        alt: "Heatmap of retained Innolot creep specimens across nominal temperatures from 30 to 60 degrees Celsius and forces from 50 to 90 newtons.",
        caption: "Retained test matrix: 23 specimens across the tested temperature-load combinations",
        fit: "contain",
        tone: "document"
      },
      {
        src: "/assets/innolot/controller-stability.png",
        alt: "Error-bar plots comparing measured load and temperature against their nominal conditions for repeated Innolot creep tests.",
        caption: "Controller audit: closely matched load and temperature do not explain the largest replicate spread",
        fit: "contain",
        tone: "document"
      },
      {
        src: "/assets/innolot/replicate-comparison.png",
        alt: "Measured strain-time curves for repeated Innolot creep-test conditions, including 30, 45, and 60 degree Celsius groups.",
        caption: "Repeatability by condition: specimen scatter stays in the analysis instead of being filtered away",
        fit: "contain",
        tone: "document"
      },
      {
        src: "/assets/innolot/tertiary-onset.png",
        alt: "Measured strain and smoothed strain-rate plots for two 60 degree Celsius, 90 newton tests with marked acceleration-onset times.",
        caption: "Operational tertiary onset: acceleration is identified separately without claiming rupture life",
        fit: "contain",
        tone: "document"
      }
    ],
    galleryLayout: "creep",
    codeExcerpt: {
      label: "Load-onset detection and one-second reduction",
      language: "MATLAB",
      code: `valid = isfinite(raw.time_s) & isfinite(raw.displacement_um) & ...
    isfinite(raw.load_N) & isfinite(raw.sampleTemp_C);

targetLoad = raw.maxLoad_N;
atLoad = raw.load_N(valid) >= cfg.loadReachedFraction * targetLoad;
held = movsum(atLoad, [0 cfg.loadHoldSamples-1]) >= cfg.loadHoldSamples;
i0 = find(held, 1, 'first');
assert(~isempty(i0), 'Target load was not reached in %s', raw.sample);

t = raw.time_s(valid);
disp_um = raw.displacement_um(valid);
t = t(i0:end) - t(i0);
disp_um = disp_um(i0:end) - disp_um(i0);

bin = floor(t / cfg.reductionStep_s) + 1;
tBin = accumarray(bin, t, [], @mean, NaN);
dispBin = accumarray(bin, disp_um, [], @mean, NaN);`
    },
    details: [
      "The goal is narrow: estimate short-term creep strain inside the measured stress-temperature-time range. The fitted equation is not presented as a long-duration material law or a failure-life model."
    ],
    detailSections: [
      {
        heading: "Dataset and reduction",
        paragraphs: [
          "The retained dataset contains 23 constant-load tests at nominal temperatures of 30, 45, and 60 °C and forces from 50 to 90 N. Force and displacement were converted to equivalent joint stress and engineering shear strain using the eight-joint specimen geometry.",
          "Load onset was detected only after the measured force remained above 98% of target for five consecutive samples. Time and displacement were zeroed at that point, nonfinite measurements were removed, and the remaining high-frequency record was reduced to one-second means without modifying the raw source files.",
          "Two 60 °C, 90 N tests that entered rapid tertiary acceleration were retained for separate analysis but excluded from the ordinary global fit. This preserves their experimental value without forcing an ordinary short-term interpolation model to represent a different deformation regime."
        ]
      },
      {
        heading: "Model comparison and selection",
        paragraphs: [
          "Findley, Burgers-type, and power-linear forms were first compared on individual records. Power-linear and Burgers-type equations described individual curves better than the simple Findley form, but that result did not establish an independently identifiable steady-rate term across specimens.",
          "Four nested global forms were then compared using leave-one-specimen-out validation. The selected four-parameter primary-creep law had a median normalized RMSE of 0.251 and no parameter at a bound. More complex forms produced little practical validation benefit and less stable parameter behavior."
        ]
      },
      {
        heading: "Whole-specimen validation",
        paragraphs: [
          "Validation withheld complete specimens rather than random time points. This prevents measurements sharing the same geometry, mounting, zeroing, and drift from appearing in both training and validation data.",
          "Each candidate was refit after withholding one entire test, then evaluated against that unseen specimen. The selected form balanced held-out error with parameter stability and model complexity rather than choosing the equation with the smallest training residual.",
          "One hundred whole-specimen bootstrap refits were then used to distinguish uncertainty in the fitted mean from the much wider variability expected for a future specimen. This page explains the validation method and convergence record but leaves fitted coefficients and proprietary prediction outputs out."
        ]
      },
      {
        heading: "Repeatability and experimental scatter",
        paragraphs: [
          "Repeated conditions were analyzed as groups instead of treating each curve as interchangeable. The largest spread occurred in the 45 °C, 50 N group even though the measured load and specimen temperature were closely matched, so controller instability did not explain the difference.",
          "That scatter was carried into the uncertainty treatment rather than removed through selective exclusions. At low creep rates, slow reversals in some records also indicated that displacement drift could be comparable to the material response over the six-hour window."
        ]
      },
      {
        heading: "Tertiary acceleration",
        paragraphs: [
          "Tertiary onset was evaluated from a smoothed strain-rate history using a sustained threshold relative to the preceding minimum rate. The two 60 °C, 90 N records entered rapid acceleration near 3.1 h and then terminated near the displacement-sensor limit at approximately 3.9 h.",
          "Neither specimen reached rupture. The analysis therefore reports an operational acceleration onset and keeps those records outside the ordinary global fit; it does not convert sensor-limit termination into a failure-time result."
        ]
      },
      {
        heading: "Model boundary",
        paragraphs: [
          "The MATLAB predictor is restricted to exploratory interpolation over the measured short-term domain, approximately 0-6 h, 30-60 °C, and 25-46 MPa. It is not a lifetime law, design allowable, rupture model, or FEA material card."
        ]
      }
    ],
    cardSize: "wide"
  },
  {
    title: "Automated Powder Dispensing - Process Equipment Development",
    slug: "icon-automated-powder-dispensing",
    category: "ICoN Programmable Cloud Lab",
    yearStatus: "Prototype / testing",
    homepageTitle: "Automated Powder Dispensing",
    homepageGroup: "research",
    homepageMeta: "ICoN Programmable Cloud Lab / 2026 to Present",
    homepageDescription:
      "A variable-rate rotating-pin dispenser prototyped and characterized for closed-loop precursor dosing by mass.",
    homepageTags: ["Automation", "Process Equipment", "Prototyping"],
    role: "Undergraduate Researcher",
    description:
      "A variable-rate automated powder-dispensing prototype combining precision axial positioning, rotary agitation, and measured-mass feedback for autonomous materials synthesis.",
    tags: ["Laboratory Automation", "Process Equipment", "Mechanism Design", "Prototyping", "Repeatability"],
    metrics: [
      "3 dispenser concepts compared across 8 engineering criteria",
      "Variable-gap rotating-pin architecture selected and prototyped",
      "Dosing accuracy and repeatability characterized",
      "Geometry, actuation parameters, and operating sequences iterated from test data"
    ],
    mediaLabels: ["Powder Dispenser Architecture"],
    media: [
      {
        src: "/assets/icon/variable-gap-dispenser-architecture.png",
        alt: "Annotated concept drawing of the variable-gap rotating-pin powder dispenser, including bottle, stepper motors, lead screw, carriage tracks, funnels, and detachable powder-contact assembly.",
        caption: "Selected dispenser architecture: lead-screw gap control, rotary agitation, and a detachable powder-contact assembly",
        fit: "contain",
        tone: "cad"
      },
      {
        src: "/assets/icon/precursor-preparation-cell.png",
        alt: "System diagram showing the powder cartridge library, docked variable-gap dispenser, stationary balance, mixing stage, and furnace interface inside a controlled enclosure.",
        caption: "Precursor-preparation cell concept: powder identity, dosing, weighing, mixing, and batch history stay connected",
        fit: "contain",
        tone: "document"
      }
    ],
    galleryLayout: "icon",
    details: [
      "The project translates hands-on MAX and MXene precursor preparation into a controlled machine sequence: identify the powder, dose toward a recipe-defined mass, verify delivery, and retain the batch history."
    ],
    detailSections: [
      {
        heading: "Process objective",
        paragraphs: [
          "The larger system is intended to store multiple precursor powders, select the correct material and lot, dispense to a recipe-defined target, verify the delivered mass, and carry the batch into mixing and furnace preparation. Material identity, deviations, and process history stay attached to the same workflow.",
          "MAX and MXene precursor handling adds constraints beyond generic powder dosing, including abrasive or reactive powders, composition sensitivity, wear contamination, atmosphere control, grounding, dust capture, and powder-specific contact surfaces."
        ]
      },
      {
        heading: "Trade study and concept selection",
        paragraphs: [
          "Miniature-auger, vibratory-capillary, and pin-head concepts were compared across powder compatibility, fine-dose capability, multi-gram throughput, start-stop control, retained powder, wear risk, autonomous precedent, and development risk.",
          "The selected direction adapts the pin-head concept into a variable-gap rotating-pin dispenser. Axial motion changes the annular flow gap while rotary agitation regulates powder movement, allowing the same mechanism to transition between faster bulk delivery and controlled fine dosing near the target mass."
        ]
      },
      {
        heading: "Prototype and operating sequence",
        paragraphs: [
          "I designed and prototyped the variable-rate dispensing system around precision axial positioning and rotary agitation. The operating sequence verifies the powder and target, tares the balance, opens the gap for bulk flow, narrows the gap and slows rotation near the target, then closes the mechanism and allows residual powder to settle before accepting, correcting, or rejecting the measured dose.",
          "A stationary analytical balance provides gain-in-weight feedback while powder-contact components remain detachable. This separates the measurement-sensitive vial from cartridge transport and supports powder-specific cleaning or replacement."
        ]
      },
      {
        heading: "Characterization and iteration",
        paragraphs: [
          "I characterized dosing accuracy and repeatability, then used the results to iterate mechanical geometry, actuation parameters, and automated operating sequences. The test program also considers minimum reliable dose, usable flow-rate range, closure overshoot, settling time, jam or bridging behavior, retained powder, wear, and carryover risk.",
          "So far, the result is a tested single-dispenser prototype and a repeatable way to improve it from dosing data. Multi-cartridge storage, controlled-atmosphere integration, vial transport, mixing, and furnace interfacing are still later system stages."
        ]
      }
    ],
    cardSize: "standard"
  },
  {
    title: "MAXCalc - Synthesis Planning & Experimental Analysis",
    slug: "maxcalc-synthesis-planning-analysis",
    category: "Engineering Software / Materials",
    yearStatus: "Active development",
    homepageTitle: "MAXCalc",
    homepageGroup: "research",
    homepageMeta: "LSML / 2026 to Present",
    homepageDescription:
      "Recipe planning, precursor balancing, EMI-data validation, and print-ready batch records in one lab-facing tool.",
    homepageTags: ["Materials", "Scientific Computing", "Analysis"],
    logoSrc: "/assets/maxcalc/maxcalc-logo.svg",
    role: "Developer",
    description:
      "A domain-specific engineering platform translating MAX-phase synthesis and VNA/EMI characterization workflows into practical calculations and analysis tools.",
    tags: ["MAX Phases", "Precursor Balancing", "Synthesis Planning", "VNA / EMI", "Scientific Computing"],
    mediaLabels: ["Recipe Workspace", "Precursor Route", "Site Descriptors", "Comparison", "EMI Analysis", "Publication Output"],
    media: [
      {
        src: "/assets/maxcalc/calculation-workspace.png",
        alt: "MAXCalc recipe workspace showing a mixed-metal 413 MAX formula, normalized site occupancy, and final precursor weighing results.",
        caption: "Auditable recipe workspace: target definition, normalized composition, and final weighing result",
        fit: "contain",
        tone: "cad"
      },
      {
        src: "/assets/maxcalc/precursor-route.png",
        alt: "MAXCalc precursor-route editor with aluminum, carbon, niobium, tantalum, titanium, and vanadium inputs.",
        caption: "Precursor-route editor with purity assumptions and rounding review kept visible",
        fit: "contain",
        tone: "cad"
      },
      {
        src: "/assets/maxcalc/site-descriptors.png",
        alt: "MAXCalc site descriptor interface for M, A, and X site composition and calculation controls.",
        caption: "Explicit M, A, and X site occupancy with dataset and solver controls",
        fit: "contain",
        tone: "cad"
      },
      {
        src: "/assets/maxcalc/recipe-comparison.png",
        alt: "MAXCalc comparison view showing deterministic differences across related TiVNb MAX-phase recipes.",
        caption: "Recipe comparison: arithmetic differences are kept separate from claims about scientific quality",
        fit: "contain",
        tone: "cad"
      },
      {
        src: "/assets/maxcalc/emi-dataset-validation.png",
        alt: "MAXCalc EMI analyzer showing imported Ka-band datasets with measurement-quality warnings and metadata.",
        caption: "EMI dataset intake with per-file metadata, validity screening, and measurement-quality warnings",
        fit: "contain",
        tone: "cad"
      },
      {
        src: "/assets/maxcalc/publication-plot-formatting.png",
        alt: "MAXCalc publication plot controls for labels, axes, uncertainty, line styles, and export dimensions.",
        caption: "Publication controls change figure presentation without altering analysis data",
        fit: "contain",
        tone: "cad"
      },
      {
        src: "/assets/maxcalc/print-output.png",
        alt: "MAXCalc print-ready weighing sheets for two saved MAX-phase recipes.",
        caption: "Print-ready weighing sheets retain formulas, masses, verification state, and engine provenance",
        fit: "contain",
        tone: "document"
      }
    ],
    galleryLayout: "maxcalc",
    details: [
      "MAXCalc translates laboratory synthesis and characterization workflows into a purpose-built engineering tool for planning experiments and processing results."
    ],
    detailSections: [
      {
        heading: "Engineering objective",
        paragraphs: [
          "The tool reduces repeated manual calculation while keeping synthesis assumptions and precursor choices visible to the researcher. Its structure was informed by real formulation, stoichiometry, and powder-processing work across multiple MAX-phase systems."
        ]
      },
      {
        heading: "Synthesis planning",
        paragraphs: [
          "MAX composition parsing, precursor selection and balancing, route solving, and practical weighing outputs support the path from a target formula to a laboratory batch plan."
        ]
      },
      {
        heading: "Characterization analysis",
        paragraphs: [
          "VNA and EMI data-processing functions extend MAXCalc from synthesis planning into characterization and measured performance analysis."
        ]
      },
      {
        heading: "Validation and status",
        paragraphs: [
          "Calculations and outputs are being checked against active laboratory methods and prior hand calculations so the tool remains useful at the bench. Development is ongoing."
        ]
      }
    ],
    cardSize: "standard"
  },
  {
    title: "Aluminum V-Jaw Fixture - Materials-Processing Tooling",
    slug: "aluminum-v-jaw-fixture",
    category: "Manufacturing / Research Tooling",
    yearStatus: "Machined / validated",
    role: "Designer and Fabricator",
    homepageTitle: "Aluminum V-Jaw Fixture",
    homepageGroup: "research",
    homepageDescription:
      "A machined MAX-sample fixture developed through mill-tested prototypes, cutting an estimated 60-minute step to 20.",
    homepageTags: ["CAD", "CNC", "DFM"],
    homepageHideMedia: true,
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
    homepageTitle: "Purdue Electric Racing",
    homepageGroup: "engineering",
    homepageDescription:
      "Aero design carried into composite fabrication, mounting hardware, and a more stable vacuum-infusion port.",
    homepageTags: ["Composites", "Tooling", "FSAE"],
    description:
      "Aerodynamic component and composite-manufacturing work for a Formula SAE team, including resin-infusion workflow support and FDM tooling for vacuum processes.",
    tags: ["Composites", "FDM", "Aerodynamics", "Manufacturing"],
    mediaLabels: ["Composite Tooling / Race-Car Component"],
    cardMedia: {
      src: "/assets/per/per-26-full-car.webp",
      alt: "Purdue Electric Racing Formula SAE car with aero package in the paddock.",
      caption: "PER 26 full-car context",
      fit: "cover",
      tone: "photo",
      unoptimized: true
    },
    media: [
      {
        src: "/assets/per/per-26-full-car.webp",
        alt: "Purdue Electric Racing Formula SAE car with aero package in the paddock.",
        caption: "2026 Purdue Electric Racing vehicle context for aero and composite work.",
        fit: "cover",
        tone: "photo",
        unoptimized: true
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
          "PER put design and production in the same loop. My contribution covered geometry, mounting, documentation, and composite workflow details without claiming ownership of the full aero package.",
          "The practical lesson was that an aero component is more than its surface geometry. It also depends on molds, fixtures, fasteners, process timing, assembly access, and inspection."
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
    homepage: false,
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
    homepageTitle: "FRC / Team 868",
    homepageGroup: "engineering",
    homepageDescription:
      "Intake and shooter mechanism work, fabrication support, and mechanical leadership for FRC Team 868.",
    homepageTags: ["Robotics", "Manufacturing", "Leadership"],
    description:
      "Mechanical subsystem design, fabrication, and cross-functional leadership for Team 868, including CAD and machining mentorship.",
    tags: ["Robotics", "CAD", "Manufacturing", "Leadership"],
    mediaLabels: ["Competition Robot / Mechanism"],
    cardMedia: {
      src: "/assets/frc/techhounds-bot-in-competition-2024.webp",
      alt: "TechHOUNDS Team 868 robot competing on a 2024 FRC field.",
      caption: "2024 competition robot",
      fit: "cover",
      tone: "photo",
      unoptimized: true
    },
    media: [
      {
        src: "/assets/frc/techhounds-bot-in-competition-2024.webp",
        alt: "TechHOUNDS Team 868 robot competing on a 2024 FRC field.",
        caption: "Competition context",
        fit: "cover",
        tone: "photo",
        unoptimized: true
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

export const engineeringProjects = projects.filter(
  (project) => project.homepageGroup === "engineering" && project.homepage !== false
);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
