"use client";

import Link from "next/link";
import {
  type CSSProperties,
  type MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { AnimatedWords } from "@/components/AnimatedWords";
import { siteConfig } from "@/data/site";

type AnnotationId =
  | "belt"
  | "lightweighting"
  | "actuator"
  | "robotArchitecture"
  | "electronics"
  | "printedStructure";

type Hotspot = {
  id: AnnotationId;
  ariaLabel: string;
  label: string;
  zoneClass: string;
  markerClass: string;
  annotationClass: string;
  leaderPoints: string;
};

const legHotspots: Hotspot[] = [
  {
    id: "belt",
    ariaLabel: "Inspect the belt-driven joint module in the lower leg assembly",
    label: "BELT-DRIVEN JOINT MODULE",
    zoneClass: "left-[20.5%] top-[68.5%] w-[7%] h-[8%]",
    markerClass: "left-[24.0%] top-[72.5%]",
    annotationClass: "left-[31.2%] top-[78.0%]",
    leaderPoints: "24.9,73.0 29.3,77.8 31.35,77.8"
  },
  {
    id: "lightweighting",
    ariaLabel: "Inspect the generative-design lightweighting structure in the central bracket",
    label: "GENERATIVE-DESIGN LIGHTWEIGHTING",
    zoneClass: "left-[20.0%] top-[42.5%] w-[7%] h-[8%]",
    markerClass: "left-[23.6%] top-[46.5%]",
    annotationClass: "left-[31.0%] top-[43.4%]",
    leaderPoints: "24.55,46.1 29.0,43.6 31.15,43.6"
  },
  {
    id: "actuator",
    ariaLabel: "Inspect the actuator packaging in the upper leg module",
    label: "ACTUATOR PACKAGING",
    zoneClass: "left-[22.0%] top-[20.5%] w-[7%] h-[8%]",
    markerClass: "left-[25.4%] top-[24.4%]",
    annotationClass: "left-[32.6%] top-[19.2%]",
    leaderPoints: "26.35,23.95 30.4,19.4 32.75,19.4"
  }
];

const robotHotspots: Hotspot[] = [
  {
    id: "robotArchitecture",
    ariaLabel: "Inspect the modular 12 degree of freedom quadruped architecture",
    label: "12-DOF MODULAR ARCHITECTURE",
    zoneClass: "left-[46%] top-[51%] w-[8%] h-[9%]",
    markerClass: "left-[50.4%] top-[55.4%]",
    annotationClass: "left-[27.5%] top-[56.2%]",
    leaderPoints: "49.45,55.45 42.2,56.05 27.65,56.05"
  },
  {
    id: "electronics",
    ariaLabel: "Inspect the electronics and control PCB integration area",
    label: "PCB + CONTROL INTEGRATION",
    zoneClass: "left-[66.8%] top-[43%] w-[7%] h-[8%]",
    markerClass: "left-[70.35%] top-[46.9%]",
    annotationClass: "left-[75.7%] top-[42.2%]",
    leaderPoints: "71.25,46.35 74.45,42.45 75.85,42.45"
  },
  {
    id: "printedStructure",
    ariaLabel: "Inspect the printed lightweight structural frame and serviceable modules",
    label: "PRINTED LIGHTWEIGHT STRUCTURE",
    zoneClass: "left-[55%] top-[34%] w-[9%] h-[8%]",
    markerClass: "left-[59.3%] top-[38.0%]",
    annotationClass: "left-[36.0%] top-[33.8%]",
    leaderPoints: "58.35,37.75 51.8,34.0 36.15,34.0"
  }
];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * amount;
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const x = clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return x * x * (3 - 2 * x);
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const frame = requestAnimationFrame(() => setReduced(query.matches));
    const onChange = () => setReduced(query.matches);
    query.addEventListener("change", onChange);
    return () => {
      cancelAnimationFrame(frame);
      query.removeEventListener("change", onChange);
    };
  }, []);

  return reduced;
}

function useViewportSize() {
  const [size, setSize] = useState({ width: 1440, height: 900 });

  useEffect(() => {
    const update = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    const frame = requestAnimationFrame(update);
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", update);
    };
  }, []);

  return size;
}

export function LynxHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pointerTargetRef = useRef({ x: 0, y: 0 });
  const pointerCurrentRef = useRef({ x: 0, y: 0 });
  const pointerRafRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [scrollCueActive, setScrollCueActive] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [activeHotspot, setActiveHotspot] = useState<AnnotationId | null>(null);
  const reducedMotion = useReducedMotion();
  const viewport = useViewportSize();

  useEffect(() => {
    if (reducedMotion) return;

    let raf = 0;
    const update = () => {
      const node = sectionRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      setProgress(clamp(-rect.top / scrollable, 0, 1));
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;

    const tick = () => {
      const current = pointerCurrentRef.current;
      const target = pointerTargetRef.current;
      current.x += (target.x - current.x) * 0.1;
      current.y += (target.y - current.y) * 0.1;
      setPointer({ x: current.x, y: current.y });
      pointerRafRef.current = requestAnimationFrame(tick);
    };

    pointerRafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(pointerRafRef.current);
  }, [reducedMotion]);

  const displayProgress = reducedMotion ? 0.6 : progress;
  const introOut = smoothstep(0.18, 0.29, displayProgress);
  const fullscreen = smoothstep(0.18, 0.46, displayProgress);
  const mediaBlend = smoothstep(0.24, 0.54, displayProgress);
  const robotReveal = smoothstep(0.56, 0.78, displayProgress);
  const robotHalo = smoothstep(0.56, 0.7, displayProgress);
  const archiveOut = smoothstep(0.16, 0.34, displayProgress);
  const overlayIn = smoothstep(0.52, 0.64, displayProgress);
  const overlayOut = smoothstep(0.84, 0.94, displayProgress);
  const exit = smoothstep(0.84, 1, displayProgress);
  const overlayOpacity = reducedMotion ? 1 : overlayIn * (1 - overlayOut);
  const activeHotspots = [...legHotspots, ...robotHotspots];
  const hotspotsAvailable =
    !reducedMotion && displayProgress > 0.68 && displayProgress < 0.92;

  const planeGeometry = useMemo(() => {
    const startWidth = Math.min(viewport.width * 0.74, 1110);
    const startHeight = startWidth / 1.32;
    const startLeft = viewport.width * 0.31;
    const startTop = viewport.height * 0.105;
    const width = lerp(startWidth, viewport.width, fullscreen);
    const height = lerp(startHeight, viewport.height * 0.94, fullscreen);

    return {
      left: lerp(startLeft, 0, fullscreen),
      top: lerp(startTop, viewport.height * 0.06, fullscreen),
      width,
      height
    };
  }, [fullscreen, viewport.height, viewport.width]);

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (reducedMotion || !window.matchMedia("(pointer: fine)").matches) return;
      const rect = event.currentTarget.getBoundingClientRect();
      pointerTargetRef.current = {
        x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((event.clientY - rect.top) / rect.height - 0.5) * 2
      };
      if (event.target instanceof Element && !event.target.closest(".hero-hotspot")) {
        setActiveHotspot(null);
      }
    },
    [reducedMotion]
  );

  const resetPointer = useCallback(() => {
    pointerTargetRef.current = { x: 0, y: 0 };
    setActiveHotspot(null);
  }, []);

  const handleJumpToWork = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    document.getElementById("work")?.scrollIntoView({ block: "start", behavior: "auto" });
    window.history.replaceState(null, "", "/#work");
    window.setTimeout(() => {
      root.style.scrollBehavior = previousBehavior;
    }, 80);
  }, []);

  const handleScrollCueClick = useCallback(() => {
    if (reducedMotion) return;
    setScrollCueActive(true);
    const node = sectionRef.current;
    const target = node
      ? window.scrollY + node.getBoundingClientRect().top + window.innerHeight * 1.45
      : window.innerHeight * 1.45;
    window.scrollTo({ top: target, behavior: "smooth" });
    window.setTimeout(() => setScrollCueActive(false), 900);
  }, [reducedMotion]);

  const heroStyle = {
    "--intro-opacity": 1 - introOut,
    "--intro-y": `${introOut * -18}px`,
    "--overlay-opacity": overlayOpacity,
    "--overlay-y": `${(1 - overlayOpacity) * 14}px`,
    "--archive-opacity": 1 - archiveOut,
    "--inspect-opacity": activeHotspot ? 0 : overlayOpacity,
    "--marker-opacity": activeHotspot ? 0.18 : overlayOpacity,
    "--art-x": `${pointer.x * 6}px`,
    "--art-y": `${pointer.y * 4}px`,
    "--transparent-opacity": 1 - mediaBlend,
    "--background-opacity": mediaBlend,
    "--robot-opacity": 1,
    "--robot-halo-opacity": robotHalo * 0.46,
    "--robot-slide-x": `${lerp(64, 0, robotReveal)}vw`,
    "--leg-shift-x": `${lerp(0, -30, fullscreen)}vw`,
    "--leg-fade": 1 - robotReveal * 0.08,
    "--hero-media-scale": lerp(1.62, 1.05, fullscreen),
    "--hero-media-y": `${lerp(11, 10.5, fullscreen)}%`
  } as CSSProperties;

  const planeStyle = {
    left: `${planeGeometry.left}px`,
    top: `${planeGeometry.top - exit * viewport.height * 0.025}px`,
    width: `${planeGeometry.width}px`,
    height: `${planeGeometry.height}px`,
    opacity: 1 - exit * 0.24,
    transform: `scale(${1 - exit * 0.035})`
  } as CSSProperties;

  return (
    <section
      ref={sectionRef}
      className="hero-section"
      aria-labelledby="hero-title"
      style={heroStyle}
    >
      <div className="hero-sticky">
        <div className="technical-backdrop" aria-hidden="true" />

        <div className="hero-copy" aria-hidden={introOut > 0.96}>
          <p className="hero-reveal section-label">Purdue University</p>
          <p className="hero-name hero-reveal hero-delay-1">
            <AnimatedWords text="Matthew Deng" />
          </p>
          <h1
            id="hero-title"
            className="hero-title hero-reveal hero-delay-2 mt-5 text-balance text-5xl font-semibold leading-[1.02] text-paper md:text-6xl xl:text-[4.9rem]"
          >
            <AnimatedWords text="Engineering systems from CAD to fabricated hardware." startDelay={210} />
          </h1>
          <p className="hero-reveal hero-delay-3 mt-7 max-w-xl text-lg leading-8 text-muted">
            <AnimatedWords
              text="Robotics, advanced materials, propulsion, and manufacturing at Purdue University."
              startDelay={430}
            />
          </p>
          <p className="hero-reveal hero-delay-4 mt-7 max-w-2xl font-mono text-[0.68rem] font-bold uppercase leading-5 text-dim">
            Mechanical Engineering / Artificial Intelligence and Machine Learning Minor / 4.00 GPA
          </p>
          <div className="hero-reveal hero-delay-5 mt-8 flex flex-wrap gap-3">
            <Link href="/#work" onClick={handleJumpToWork} className="button-primary">
              Explore selected work
            </Link>
            <a href={siteConfig.resumeInquiryHref} className="button-secondary">
              Request résumé
            </a>
            <Link href="/projects/lynx" className="button-secondary hero-mobile-project-link">
              View LYNX project
            </Link>
          </div>
        </div>

        <div
          className="hero-art-plane"
          style={planeStyle}
          onPointerMove={onPointerMove}
          onPointerLeave={resetPointer}
        >
          <div className="hero-image-layer hero-image-layer-transparent">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={siteConfig.heroTransparentMediaSrc}
              alt="LYNX Mk.1 leg module render"
            />
          </div>
          <div className="hero-image-layer hero-image-layer-background" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={siteConfig.heroMediaSrc} alt="" />
          </div>
          <div className="hero-image-layer hero-image-layer-robot-halo" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={siteConfig.heroRobotHaloMediaSrc} alt="" />
          </div>
          <div className="hero-image-layer hero-image-layer-robot" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={siteConfig.heroRobotMediaSrc} alt="" />
          </div>
          <div className="hero-image-vignette" aria-hidden="true" />

          <p className="hero-archive-label">LYNX MK.1 LEG MODULE / DRIVE ASSEMBLY</p>
          <p className="hero-inspect-prompt">Hover components to inspect</p>

          <div className="hero-caption" aria-hidden={overlayOpacity < 0.08}>
            <p className="font-mono text-[0.7rem] font-bold uppercase text-paper">
              LYNX - Modular 12-DOF Quadruped Robot
            </p>
            <p className="mt-2 text-sm text-muted">Founder & Lead Engineer / 2023-Present</p>
            <Link href="/projects/lynx" className="mt-5 inline-flex button-secondary">
              View project
            </Link>
          </div>

          <div className="hero-hotspot-layer" aria-hidden={!hotspotsAvailable}>
            {activeHotspots.map((hotspot) => (
              <span
                key={`${hotspot.id}-marker`}
                className={`inspection-marker ${hotspot.markerClass} ${
                  activeHotspot === hotspot.id ? "inspection-marker-active" : ""
                }`}
                aria-hidden="true"
              >
              </span>
            ))}
            {activeHotspots.map((hotspot) => (
              <button
                key={hotspot.id}
                type="button"
                data-hotspot={hotspot.id}
                aria-label={hotspot.ariaLabel}
                disabled={!hotspotsAvailable}
                className={`hero-hotspot ${hotspot.zoneClass}`}
                onFocus={() => setActiveHotspot(hotspot.id)}
                onBlur={() => setActiveHotspot(null)}
                onMouseEnter={() => setActiveHotspot(hotspot.id)}
                onMouseLeave={() => setActiveHotspot(null)}
                onPointerEnter={() => setActiveHotspot(hotspot.id)}
                onPointerLeave={() => setActiveHotspot(null)}
              />
            ))}
          </div>

          <div className="hero-note-layer" aria-hidden={!activeHotspot}>
            <svg
              className="hero-leader-svg"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {activeHotspots.map((hotspot) => (
                <polyline
                  key={`${hotspot.id}-leader`}
                  className={`hero-leader-line ${
                    activeHotspot === hotspot.id ? "hero-leader-line-active" : ""
                  }`}
                  points={hotspot.leaderPoints}
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>
            {activeHotspots.map((hotspot) => {
              const active = activeHotspot === hotspot.id;
              return (
                <div
                  key={hotspot.id}
                  data-note={hotspot.id}
                  className={`hero-note ${hotspot.annotationClass} ${
                    active ? "hero-note-active" : ""
                  }`}
                >
                  <span className="hero-note-text">{hotspot.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          className={`scroll-cue ${scrollCueActive ? "scroll-cue-active" : ""} ${
            displayProgress > 0.18 ? "opacity-0" : "opacity-100"
          }`}
          onClick={handleScrollCueClick}
          aria-label="Scroll to inspect the LYNX leg module"
        >
          <span className="scroll-cue-chevron" aria-hidden="true" />
          <span>Scroll to inspect</span>
        </button>
      </div>
    </section>
  );
}
