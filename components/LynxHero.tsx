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
  mobileSourceX: number;
  mobileSourceY: number;
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
    mobileSourceX: 0.638,
    mobileSourceY: 0.195,
    zoneClass: "left-[58.75%] top-[15.0%]",
    markerClass: "left-[63.0%] top-[19.5%]",
    annotationClass: "left-[66.2%] top-[17.0%]",
    leaderPoints: "63.5,19.5 65.0,17.7 66.5,17.7"
  },
  {
    id: "architecture",
    ariaLabel: "Inspect the modular upper-leg architecture",
    label: "MODULAR LEG ARCHITECTURE",
    mobileSourceX: 0.545,
    mobileSourceY: 0.148,
    zoneClass: "left-[49.55%] top-[10.3%]",
    markerClass: "left-[53.8%] top-[14.8%]",
    annotationClass: "left-[40.8%] top-[13.0%]",
    leaderPoints: "53.3,14.8 48.7,13.7 41.1,13.7"
  },
  {
    id: "lightweighting",
    ariaLabel: "Inspect the generative-lightweighting side structure",
    label: "GENERATIVE LIGHTWEIGHTING",
    mobileSourceX: 0.6,
    mobileSourceY: 0.484,
    zoneClass: "left-[53.95%] top-[43.7%]",
    markerClass: "left-[58.2%] top-[48.2%]",
    annotationClass: "left-[62.0%] top-[45.9%]",
    leaderPoints: "58.7,48.2 60.4,46.6 62.3,46.6"
  },
  {
    id: "drive",
    ariaLabel: "Inspect the lower precision belt drive",
    label: "PRECISION BELT DRIVE",
    mobileSourceX: 0.549,
    mobileSourceY: 0.7,
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

function getContainedMediaSize(width: number, height: number) {
  return {
    width: Math.min(width, height * (16 / 9)),
    height: Math.min(height, width * (9 / 16))
  };
}

function getMobileHotspotPosition(
  hotspot: Hotspot,
  viewportWidth: number,
  viewportHeight: number,
  stageX: number,
  stageY: number,
  mediaScale: number
) {
  const media = getContainedMediaSize(viewportWidth, viewportHeight);
  return {
    left:
      viewportWidth * 0.5 +
      stageX +
      (hotspot.mobileSourceX - 0.5) * media.width * mediaScale,
    top:
      viewportHeight * 0.5 +
      stageY +
      (hotspot.mobileSourceY - 0.5) * media.height * mediaScale
  };
}

function getHeroMotion(progress: number, isMobile: boolean) {
  const introOut = smoothstep(isMobile ? 0.08 : 0.18, isMobile ? 0.22 : 0.29, progress);
  const fullscreen = smoothstep(isMobile ? 0.12 : 0.18, isMobile ? 0.36 : 0.38, progress);
  const mediaBlend = progress <= (isMobile ? 0.3 : 0.28)
    ? 0
    : smoothstep(isMobile ? 0.3 : 0.34, isMobile ? 0.46 : 0.56, progress);
  const archiveOut = smoothstep(isMobile ? 0.06 : 0.52, isMobile ? 0.16 : 0.64, progress);
  const nodeExit = 1 - smoothstep(isMobile ? 0.72 : 0.84, isMobile ? 0.76 : 0.94, progress);
  const nodeOpacities = Array.from({ length: hotspots.length }, (_, index) =>
    smoothstep(
      (isMobile ? 0.38 : 0.5) + index * (isMobile ? 0.09 : 0.04),
      (isMobile ? 0.43 : 0.54) + index * (isMobile ? 0.09 : 0.04),
      progress
    ) * nodeExit
  );
  const overlayIn = smoothstep(isMobile ? 0.76 : 0.52, isMobile ? 0.8 : 0.64, progress);
  const overlayOut = smoothstep(isMobile ? 0.965 : 0.84, isMobile ? 0.985 : 0.94, progress);

  return {
    introOut,
    fullscreen,
    mediaBlend,
    archiveOut,
    nodeOpacities,
    overlayOut,
    overlayOpacity: overlayIn * (1 - overlayOut)
  };
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
  const heroCopyRef = useRef<HTMLDivElement | null>(null);
  const mobileCopyBottomRef = useRef(0);
  const pointerTargetRef = useRef({ x: 0, y: 0 });
  const pointerCurrentRef = useRef({ x: 0, y: 0 });
  const pointerRafRef = useRef(0);
  const hotspotsAvailableRef = useRef(false);
  const [activeHotspot, setActiveHotspot] = useState<AnnotationId | null>(null);
  const [hotspotsAvailable, setHotspotsAvailable] = useState(false);
  const [mobileCopyBottom, setMobileCopyBottom] = useState(0);
  const reducedMotion = useReducedMotion();
  const viewport = useViewportSize();
  const isMobileStage = viewport.width <= 900;
  const isCompactLandscape =
    isMobileStage && viewport.width > viewport.height && viewport.height <= 520;

  useEffect(() => {
    const copy = heroCopyRef.current;
    const section = sectionRef.current;
    const sticky = section?.querySelector<HTMLElement>(".hero-sticky");
    if (!copy || !sticky) return;

    let frame = 0;
    const getBottomWithinSticky = (element: HTMLElement) => {
      let top = 0;
      let current: HTMLElement | null = element;

      while (current && current !== sticky) {
        top += current.offsetTop;
        current = current.offsetParent as HTMLElement | null;
      }

      return top + element.offsetHeight;
    };
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const actionElements = Array.from(copy.querySelectorAll<HTMLElement>("a, button"));
        const nextBottom = Math.max(
          getBottomWithinSticky(copy),
          ...actionElements.map(getBottomWithinSticky)
        );
        mobileCopyBottomRef.current = nextBottom;
        setMobileCopyBottom((current) =>
          Math.abs(current - nextBottom) < 0.5 ? current : nextBottom
        );
      });
    };

    const observer = new ResizeObserver(update);
    observer.observe(copy);
    copy.querySelectorAll<HTMLElement>("a, button").forEach((element) => observer.observe(element));
    window.addEventListener("resize", update);
    update();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const node = sectionRef.current;
    if (!node) return;

    const copy = node.querySelector<HTMLElement>(".hero-copy");
    const caption = node.querySelector<HTMLElement>(".hero-caption");
    const cue = node.querySelector<HTMLElement>(".scroll-cue");
    const hotspotLayer = node.querySelector<HTMLElement>(".hero-hotspot-layer");
    const markers = Array.from(node.querySelectorAll<HTMLElement>(".inspection-marker"));
    const hotspotButtons = Array.from(node.querySelectorAll<HTMLButtonElement>(".hero-hotspot"));
    let sectionTop = 0;
    let scrollable = 1;
    let raf = 0;

    const updateMetrics = () => {
      sectionTop = window.scrollY + node.getBoundingClientRect().top;
      scrollable = Math.max(1, node.offsetHeight - window.innerHeight);
    };

    const update = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isMobile = width <= 900;
      const compactLandscape = isMobile && width > height && height <= 520;
      const nextProgress = clamp((window.scrollY - sectionTop) / scrollable, 0, 1);
      const motion = getHeroMotion(nextProgress, isMobile);
      const initialScale = isMobile ? (compactLandscape ? 0.72 : 1) : 0.78;
      const finalScale = isMobile ? (compactLandscape ? 0.95 : 2.35) : 0.96;
      const containedMedia = getContainedMediaSize(width, height);
      const anchorBottom = mobileCopyBottomRef.current || height * 0.62;
      const initialX = isMobile ? width * (compactLandscape ? 0.28 : 0.15) : width * 0.18;
      const finalX = isMobile ? width * (compactLandscape ? -0.018 : -0.045) : 0;
      const initialY = isMobile
        ? compactLandscape
          ? height * 0.02
          : anchorBottom - 35 + containedMedia.height * initialScale * 0.5 - height * 0.5
        : 0;
      const finalY = isMobile ? height * (compactLandscape ? 0.07 : 0.04) : 0;
      const mediaScale = lerp(initialScale, finalScale, motion.fullscreen);
      const stageX = lerp(initialX, finalX, motion.fullscreen);
      const stageY = lerp(initialY, finalY, motion.fullscreen);
      const nextHotspotsAvailable =
        !isMobile && nextProgress > 0.52 && nextProgress < 0.92;
      const style = node.style;

      style.setProperty("--intro-opacity", `${1 - motion.introOut}`);
      style.setProperty("--intro-y", `${motion.introOut * -18}px`);
      style.setProperty("--overlay-opacity", `${motion.overlayOpacity}`);
      style.setProperty("--overlay-y", `${(1 - motion.overlayOpacity) * 14}px`);
      style.setProperty(
        "--archive-opacity",
        `${isMobile ? 1 - motion.archiveOut : 1 - motion.overlayOut}`
      );
      style.setProperty("--inspect-opacity", `${motion.overlayOpacity}`);
      style.setProperty("--hero-stage-x", `${stageX}px`);
      style.setProperty("--hero-stage-y", `${stageY}px`);
      style.setProperty("--authentic-shadow-opacity", `${motion.mediaBlend}`);
      style.setProperty("--background-opacity", `${motion.mediaBlend}`);
      style.setProperty("--hero-media-scale", `${mediaScale}`);

      copy?.setAttribute("aria-hidden", `${motion.introOut > 0.96}`);
      caption?.setAttribute("aria-hidden", `${motion.overlayOpacity < 0.08}`);
      hotspotLayer?.setAttribute("aria-hidden", `${!nextHotspotsAvailable}`);
      hotspotButtons.forEach((button) => {
        button.disabled = !nextHotspotsAvailable;
      });
      if (hotspotsAvailableRef.current !== nextHotspotsAvailable) {
        hotspotsAvailableRef.current = nextHotspotsAvailable;
        setHotspotsAvailable(nextHotspotsAvailable);
      }
      node.classList.toggle("hero-authentic-shadow", motion.mediaBlend > 0.9);
      if (cue) cue.style.opacity = nextProgress > 0.18 ? "0" : "1";

      markers.forEach((marker, index) => {
        marker.style.setProperty("--node-opacity", `${motion.nodeOpacities[index] ?? 0}`);
        if (!isMobile) {
          marker.style.removeProperty("left");
          marker.style.removeProperty("top");
          return;
        }

        const hotspot = hotspots[index];
        if (!hotspot) return;
        const position = getMobileHotspotPosition(
          hotspot,
          width,
          height,
          stageX,
          stageY,
          mediaScale
        );
        marker.style.left = `${position.left}px`;
        marker.style.top = `${position.top}px`;
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    const onResize = () => {
      updateMetrics();
      onScroll();
    };

    updateMetrics();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [mobileCopyBottom, reducedMotion, viewport.height, viewport.width]);

  useEffect(() => () => cancelAnimationFrame(pointerRafRef.current), []);

  const displayProgress = reducedMotion ? 0.6 : 0;
  const motion = getHeroMotion(displayProgress, isMobileStage);
  const {
    introOut,
    fullscreen,
    mediaBlend,
    archiveOut,
    nodeOpacities,
    overlayOut
  } = motion;
  const overlayOpacity = reducedMotion ? 1 : motion.overlayOpacity;
  const mobileNodeOpacity = (index: number) => nodeOpacities[index] ?? 0;
  const desktopNodeOpacity = mobileNodeOpacity;
  const mobileStageX = isCompactLandscape
    ? viewport.width * 0.28
    : viewport.width * 0.15;
  const mobileInitialScale = isCompactLandscape ? 0.72 : 1;
  const containedMedia = getContainedMediaSize(viewport.width, viewport.height);
  const mobileAnchorBottom = mobileCopyBottom || viewport.height * 0.62;
  const mobileStageY = isCompactLandscape
    ? viewport.height * 0.02
    : mobileAnchorBottom - 35 + containedMedia.height * mobileInitialScale * 0.5 - viewport.height * 0.5;
  const mobileFinalScale = isCompactLandscape ? 0.95 : 2.35;
  const shadowScale = isMobileStage ? mobileFinalScale : 0.96;
  const mobileEndStageX = viewport.width * (isCompactLandscape ? -0.018 : -0.045);
  const mobileEndStageY = viewport.height * (isCompactLandscape ? 0.07 : 0.04);
  const currentStageX = lerp(
    isMobileStage ? mobileStageX : viewport.width * 0.18,
    isMobileStage ? mobileEndStageX : 0,
    fullscreen
  );
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
  const mobileHotspotPositions = hotspots.map((hotspot) =>
    getMobileHotspotPosition(
      hotspot,
      viewport.width,
      viewport.height,
      currentStageX,
      currentStageY,
      currentMediaScale
    )
  );

  const startPointerAnimation = useCallback(() => {
    if (pointerRafRef.current) return;

    const tick = () => {
      const current = pointerCurrentRef.current;
      const target = pointerTargetRef.current;
      const deltaX = target.x - current.x;
      const deltaY = target.y - current.y;

      if (Math.abs(deltaX) < 0.001 && Math.abs(deltaY) < 0.001) {
        current.x = target.x;
        current.y = target.y;
        sectionRef.current?.style.setProperty("--art-x", `${target.x * 6}px`);
        sectionRef.current?.style.setProperty("--art-y", `${target.y * 4}px`);
        pointerRafRef.current = 0;
        return;
      }

      current.x += deltaX * 0.1;
      current.y += deltaY * 0.1;
      sectionRef.current?.style.setProperty("--art-x", `${current.x * 6}px`);
      sectionRef.current?.style.setProperty("--art-y", `${current.y * 4}px`);
      pointerRafRef.current = requestAnimationFrame(tick);
    };

    pointerRafRef.current = requestAnimationFrame(tick);
  }, []);

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (reducedMotion || !window.matchMedia("(pointer: fine)").matches) return;
      const rect = event.currentTarget.getBoundingClientRect();
      pointerTargetRef.current = {
        x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((event.clientY - rect.top) / rect.height - 0.5) * 2
      };
      startPointerAnimation();
      if (event.target instanceof Element && !event.target.closest(".hero-hotspot")) {
        setActiveHotspot(null);
      }
    },
    [reducedMotion, startPointerAnimation]
  );

  const resetPointer = useCallback(() => {
    pointerTargetRef.current = { x: 0, y: 0 };
    startPointerAnimation();
    setActiveHotspot(null);
  }, [startPointerAnimation]);

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
    "--art-x": "0px",
    "--art-y": "0px",
    "--hero-stage-x": `${currentStageX}px`,
    "--hero-stage-y": `${currentStageY}px`,
    "--authentic-shadow-opacity": mediaBlend,
    "--authentic-shadow-x": `${viewport.width * 0.5}px`,
    "--authentic-shadow-y": `${
      viewport.height * 0.5 + containedMedia.height * shadowScale * 0.26
    }px`,
    "--authentic-shadow-width": `${containedMedia.width * shadowScale * 0.28}px`,
    "--authentic-shadow-height": `${containedMedia.height * shadowScale * 0.14}px`,
    "--transparent-opacity": 1,
    "--background-opacity": mediaBlend,
    "--hero-media-scale": currentMediaScale
  } as CSSProperties;

  return (
    <section
      ref={sectionRef}
      className={`hero-section ${activeHotspot ? "hero-has-active" : ""}`}
      aria-labelledby="hero-title"
      style={heroStyle}
    >
      <div className="hero-sticky">
        <div className="technical-backdrop" aria-hidden="true" />

        <div ref={heroCopyRef} className="hero-copy" aria-hidden={introOut > 0.96}>
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
            <img
              src={siteConfig.heroMediaSrc}
              alt=""
              width={1889}
              height={1063}
              decoding="async"
              fetchPriority="low"
            />
          </div>
          <div className="hero-image-layer hero-image-layer-transparent">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={siteConfig.heroTransparentMediaSrc}
              alt="LYNX Mk.1 leg module render"
              width={1889}
              height={1063}
              decoding="async"
              fetchPriority="high"
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
                      : desktopNodeOpacity(index),
                    ...(isMobileStage
                      ? {
                          left: `${mobileHotspotPositions[index]?.left ?? 0}px`,
                          top: `${mobileHotspotPositions[index]?.top ?? 0}px`
                        }
                      : {})
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
