"use client";

import Link from "next/link";
import {
  type CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { AnimatedWords } from "@/components/AnimatedWords";
import { siteConfig } from "@/data/site";

type AnnotationId = "electronics" | "leg" | "control" | "frame";

type Hotspot = {
  id: AnnotationId;
  ariaLabel: string;
  label: string;
  zoneClass: string;
  markerClass: string;
  annotationClass: string;
  leaderPoints: string;
};

const hotspots: Hotspot[] = [
  {
    id: "electronics",
    ariaLabel: "Inspect custom motor-driver electronics on the front module",
    label: "CUSTOM MOTOR-DRIVER ELECTRONICS",
    zoneClass: "left-[17%] top-[45%]",
    markerClass: "left-[21.25%] top-[49.5%]",
    annotationClass: "left-[5.8%] top-[42.2%]",
    leaderPoints: "20.75,49.05 15.8,43.4 5.9,43.4"
  },
  {
    id: "leg",
    ariaLabel: "Inspect modular 12-DOF leg architecture",
    label: "MODULAR 12-DOF LEG ARCHITECTURE",
    zoneClass: "left-[55%] top-[51%]",
    markerClass: "left-[59.25%] top-[55.5%]",
    annotationClass: "left-[43%] top-[63.6%]",
    leaderPoints: "58.9,56.1 54.5,63.8 43.2,63.8"
  },
  {
    id: "control",
    ariaLabel: "Inspect IMU-based balance control area",
    label: "IMU-BASED BALANCE CONTROL",
    zoneClass: "left-[54%] top-[33%]",
    markerClass: "left-[58.25%] top-[37.5%]",
    annotationClass: "left-[63.2%] top-[29.4%]",
    leaderPoints: "58.7,36.9 62.2,30.5 63.2,30.5"
  },
  {
    id: "frame",
    ariaLabel: "Inspect lightweight frame and enclosure development",
    label: "LIGHTWEIGHT FRAME / ENCLOSURE DEVELOPMENT",
    zoneClass: "left-[66%] top-[23%]",
    markerClass: "left-[70.25%] top-[27.5%]",
    annotationClass: "left-[75.8%] top-[21.8%]",
    leaderPoints: "70.7,26.9 74.8,22.9 75.8,22.9"
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
  const fullscreen = smoothstep(0.22, 0.52, displayProgress);
  const overlayIn = smoothstep(0.52, 0.64, displayProgress);
  const overlayOut = smoothstep(0.84, 0.94, displayProgress);
  const exit = smoothstep(0.84, 1, displayProgress);
  const overlayOpacity = reducedMotion ? 1 : overlayIn * (1 - overlayOut);
  const hotspotsAvailable =
    !reducedMotion && displayProgress > 0.52 && displayProgress < 0.92;

  const planeGeometry = useMemo(() => {
    const startWidth = Math.min(viewport.width * 0.56, 900);
    const startHeight = startWidth / 1.45;
    const pageInset = Math.max(-18, (viewport.width - 1500) / 2 - 8);
    const startLeft = viewport.width - pageInset - startWidth;
    const startTop = viewport.height * 0.145;
    const width = lerp(startWidth, viewport.width, fullscreen);
    const height = lerp(startHeight, viewport.height, fullscreen);

    return {
      left: lerp(startLeft, 0, fullscreen),
      top: lerp(startTop, 0, fullscreen),
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

  const heroStyle = {
    "--intro-opacity": 1 - introOut,
    "--intro-y": `${introOut * -18}px`,
    "--overlay-opacity": overlayOpacity,
    "--overlay-y": `${(1 - overlayOpacity) * 14}px`,
    "--archive-opacity": 1 - overlayIn,
    "--inspect-opacity": activeHotspot ? 0 : overlayOpacity,
    "--marker-opacity": activeHotspot ? 0.18 : overlayOpacity,
    "--art-x": `${pointer.x * 6}px`,
    "--art-y": `${pointer.y * 4}px`
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
            Mechanical Engineering · Artificial Intelligence & Machine Learning Minor · 4.00 GPA
          </p>
          <div className="hero-reveal hero-delay-5 mt-8 flex flex-wrap gap-3">
            <a href="#work" className="button-primary">
              Explore selected work
            </a>
            <a href={siteConfig.resumeInquiryHref} className="button-secondary">
              Request resume
            </a>
          </div>
        </div>

        <div
          className="hero-art-plane"
          style={planeStyle}
          onPointerMove={onPointerMove}
          onPointerLeave={resetPointer}
        >
          <div className="hero-image-layer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={siteConfig.heroMediaSrc} alt="LYNX V1 archival CAD screenshot" />
          </div>
          <div className="hero-image-vignette" aria-hidden="true" />

          <p className="hero-archive-label">LYNX V1 / Archive CAD view</p>
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
            {hotspots.map((hotspot) => (
              <span
                key={`${hotspot.id}-marker`}
                className={`inspection-marker ${hotspot.markerClass} ${
                  activeHotspot === hotspot.id ? "inspection-marker-active" : ""
                }`}
                aria-hidden="true"
              />
            ))}
            {hotspots.map((hotspot) => (
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
              {hotspots.map((hotspot) => (
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
            {hotspots.map((hotspot) => {
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

        <p className={`scroll-cue ${displayProgress > 0.18 ? "opacity-0" : "opacity-100"}`}>
          Scroll to inspect
        </p>
      </div>
    </section>
  );
}
