"use client";

import Link from "next/link";
import {
  type CSSProperties,
  type MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import { AnimatedWords } from "@/components/AnimatedWords";
import { siteConfig } from "@/data/site";

type AnnotationId = "actuator" | "architecture" | "lightweighting" | "drive";

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
    id: "actuator",
    ariaLabel: "Inspect the upper actuator packaging",
    label: "ACTUATOR PACKAGING",
    zoneClass: "left-[58.75%] top-[15.0%]",
    markerClass: "left-[63.0%] top-[19.5%]",
    annotationClass: "left-[66.2%] top-[17.0%]",
    leaderPoints: "63.5,19.5 65.0,17.7 66.5,17.7"
  },
  {
    id: "architecture",
    ariaLabel: "Inspect the modular upper-leg architecture",
    label: "MODULAR LEG ARCHITECTURE",
    zoneClass: "left-[49.55%] top-[10.3%]",
    markerClass: "left-[53.8%] top-[14.8%]",
    annotationClass: "left-[40.8%] top-[13.0%]",
    leaderPoints: "53.3,14.8 48.7,13.7 41.1,13.7"
  },
  {
    id: "lightweighting",
    ariaLabel: "Inspect the generative-lightweighting side structure",
    label: "GENERATIVE LIGHTWEIGHTING",
    zoneClass: "left-[53.95%] top-[43.7%]",
    markerClass: "left-[58.2%] top-[48.2%]",
    annotationClass: "left-[62.0%] top-[45.9%]",
    leaderPoints: "58.7,48.2 60.4,46.6 62.3,46.6"
  },
  {
    id: "drive",
    ariaLabel: "Inspect the lower precision belt drive",
    label: "PRECISION BELT DRIVE",
    zoneClass: "left-[55.75%] top-[65.5%]",
    markerClass: "left-[60.0%] top-[70.0%]",
    annotationClass: "left-[63.8%] top-[71.6%]",
    leaderPoints: "60.5,70.0 62.2,71.7 64.1,71.7"
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
  const isMobileStage = viewport.width <= 900;
  const isCompactLandscape =
    isMobileStage && viewport.width > viewport.height && viewport.height <= 520;
  const isShortPortrait =
    isMobileStage && viewport.height > viewport.width && viewport.height <= 740;

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
  const introOut = smoothstep(isMobileStage ? 0.08 : 0.18, isMobileStage ? 0.22 : 0.29, displayProgress);
  const fullscreen = smoothstep(isMobileStage ? 0.12 : 0.18, isMobileStage ? 0.36 : 0.38, displayProgress);
  const mediaBlend = displayProgress <= (isMobileStage ? 0.3 : 0.28)
    ? 0
    : smoothstep(isMobileStage ? 0.3 : 0.34, isMobileStage ? 0.46 : 0.56, displayProgress);
  const archiveOut = smoothstep(isMobileStage ? 0.06 : 0.52, isMobileStage ? 0.16 : 0.64, displayProgress);
  const mobileNodeExit = 1 - smoothstep(0.72, 0.76, displayProgress);
  const mobileNodeOpacity = (index: number) =>
    smoothstep(0.38 + index * 0.09, 0.43 + index * 0.09, displayProgress) * mobileNodeExit;
  const desktopNodeExit = 1 - smoothstep(0.84, 0.94, displayProgress);
  const desktopNodeOpacity = (index: number) =>
    smoothstep(0.5 + index * 0.04, 0.54 + index * 0.04, displayProgress) * desktopNodeExit;
  const overlayIn = smoothstep(isMobileStage ? 0.76 : 0.52, isMobileStage ? 0.8 : 0.64, displayProgress);
  const overlayOut = smoothstep(isMobileStage ? 0.965 : 0.84, isMobileStage ? 0.985 : 0.94, displayProgress);
  const overlayOpacity = reducedMotion ? 1 : overlayIn * (1 - overlayOut);
  const hotspotsAvailable =
    !isMobileStage && !reducedMotion && displayProgress > 0.52 && displayProgress < 0.92;
  const mobileStageX = isCompactLandscape
    ? viewport.width * 0.28
    : viewport.width * (isShortPortrait ? 0.22 : 0.13);
  const mobileStageY = isCompactLandscape
    ? viewport.height * 0.02
    : viewport.height * (isShortPortrait ? 0.32 : 0.4);
  const mobileInitialScale = isCompactLandscape ? 0.72 : isShortPortrait ? 1 : 0.82;
  const mobileFinalScale = isCompactLandscape ? 0.95 : 2.35;
  const mobileEndStageX = viewport.width * (isCompactLandscape ? -0.018 : -0.045);
  const mobileEndStageY = viewport.height * (isCompactLandscape ? 0.07 : 0.04);
  const currentStageY = lerp(
    isMobileStage ? mobileStageY : 0,
    isMobileStage ? mobileEndStageY : 0,
    fullscreen
  );
  const currentMediaScale = lerp(
    isMobileStage ? mobileInitialScale : 0.78,
    isMobileStage ? mobileFinalScale : 0.96,
    fullscreen
  );

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

  const heroStyle = {
    "--intro-opacity": 1 - introOut,
    "--intro-y": `${introOut * -18}px`,
    "--overlay-opacity": overlayOpacity,
    "--overlay-y": `${(1 - overlayOpacity) * 14}px`,
    "--archive-opacity": isMobileStage ? 1 - archiveOut : 1 - overlayOut,
    "--inspect-opacity": activeHotspot ? 0 : overlayOpacity,
    "--art-x": `${pointer.x * 6}px`,
    "--art-y": `${pointer.y * 4}px`,
    "--hero-stage-x": `${lerp(
      isMobileStage ? mobileStageX : viewport.width * 0.18,
      isMobileStage ? mobileEndStageX : 0,
      fullscreen
    )}px`,
    "--hero-stage-y": `${currentStageY}px`,
    "--authentic-shadow-opacity": (isMobileStage ? 1 : 0.72) * mediaBlend,
    "--authentic-shadow-y": `${lerp(59, 72, fullscreen)}%`,
    "--transparent-opacity": 1,
    "--background-opacity": mediaBlend,
    "--hero-media-scale": currentMediaScale
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
          <div className="hero-type-flare" aria-hidden="true" />
          <div
            className="hero-name hero-reveal hero-delay-1"
            role="img"
            aria-label="Matthew Deng"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="hero-name-image hero-name-image-matthew"
              src="/assets/identity/matthew-wordmark.png"
              alt=""
              aria-hidden="true"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="hero-name-image hero-name-image-deng"
              src="/assets/identity/deng-wordmark.png"
              alt=""
              aria-hidden="true"
            />
          </div>
          <h1
            id="hero-title"
            className="hero-title hero-reveal hero-delay-2 mt-5 text-balance text-5xl font-semibold leading-[1.02] text-paper md:text-6xl xl:text-[4.9rem]"
          >
            <AnimatedWords text="Mechanical Engineering at Purdue." startDelay={210} />
          </h1>
          <p className="hero-reveal hero-delay-3 mt-7 max-w-xl text-lg leading-8 text-muted">
            <AnimatedWords
              text="Packaging / materials / experimental systems"
              startDelay={430}
            />
          </p>
          <p className="hero-reveal hero-delay-4 mt-7 max-w-2xl font-mono text-[0.68rem] font-bold uppercase leading-5 text-dim">
            4.00 GPA
          </p>
          <div className="hero-reveal hero-delay-5 mt-8 flex flex-wrap gap-3">
            <Link href="/#work" onClick={handleJumpToWork} className="button-primary">
              Explore selected work
            </Link>
            <a href={siteConfig.resumeInquiryHref} className="button-secondary">
              Request résumé
            </a>
          </div>
        </div>

        <p className="hero-archive-label">
          FEATURED ARTIFACT / LYNX MK.1 LEG MODULE
        </p>

        <div
          className="hero-art-plane"
          onPointerMove={onPointerMove}
          onPointerLeave={resetPointer}
        >
          <div className="hero-image-layer hero-image-layer-shadow" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={siteConfig.heroMediaSrc} alt="" />
          </div>
          <div className="hero-image-layer hero-image-layer-background" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={siteConfig.heroMediaSrc} alt="" />
          </div>
          <div className="hero-image-layer hero-image-layer-transparent">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={siteConfig.heroTransparentMediaSrc}
              alt="LYNX Mk.1 leg module render"
            />
          </div>
          <div className="hero-image-vignette" aria-hidden="true" />

          <p className="hero-inspect-prompt">Hover components to inspect</p>

          <div className="hero-caption" aria-hidden={overlayOpacity < 0.08}>
            <div className="hero-caption-kicker">
              <span>01</span>
              <span>Featured system</span>
            </div>
            <div className="hero-caption-heading">
              <p>LYNX</p>
              <p>Modular 12-DOF quadruped leg</p>
            </div>
            <div className="hero-caption-meta">
              <span>Founder &amp; Lead Engineer</span>
              <span>2023 to Present</span>
            </div>
            <Link href="/projects/lynx" className="hero-caption-link">
              Open case study <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="hero-hotspot-layer" aria-hidden={!hotspotsAvailable}>
            {hotspots.map((hotspot, index) => (
              <span
                key={`${hotspot.id}-marker`}
                data-node={hotspot.id}
                data-label={hotspot.label}
                className={`inspection-marker ${hotspot.markerClass} ${
                  activeHotspot === hotspot.id ? "inspection-marker-active" : ""
                }`}
                style={
                  ({
                    "--node-opacity": isMobileStage
                      ? mobileNodeOpacity(index)
                      : desktopNodeOpacity(index)
                  } as CSSProperties)
                }
                aria-hidden="true"
              >
              </span>
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

        <div className={`scroll-cue ${displayProgress > 0.18 ? "opacity-0" : "opacity-100"}`}>
          <span className="scroll-cue-mark" aria-hidden="true" />
          <span className="scroll-cue-label">Scroll to inspect</span>
        </div>
      </div>
    </section>
  );
}
