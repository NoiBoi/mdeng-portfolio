"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { type MouseEvent, useEffect, useState } from "react";
import { siteConfig } from "@/data/site";

const navItems = [
  { label: "Research", href: "/#research" },
  { label: "Engineering", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" }
];

export function SiteHeader() {
  const pathname = usePathname();
  const [showBrand, setShowBrand] = useState(false);

  const handleBrandClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname !== "/") return;
    event.preventDefault();
    window.history.replaceState(null, "", "/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    let frame = 0;

    const clamp = (value: number, min: number, max: number) =>
      Math.min(max, Math.max(min, value));

    const smoothstep = (start: number, end: number, value: number) => {
      const amount = clamp((value - start) / (end - start), 0, 1);
      return amount * amount * (3 - 2 * amount);
    };

    const update = () => {
      const onHome = pathname === "/";
      const width = window.innerWidth;
      const baseInset = width < 768 ? 20 : 24;
      const centeredInset = Math.max(baseInset, (width - 1680) / 2 + 24);
      let headerExpansion = 0;
      let heroProgress = onHome ? 0 : 1;

      if (onHome && width > 900) {
        const hero = document.querySelector<HTMLElement>(".hero-section");
        if (hero) {
          const rect = hero.getBoundingClientRect();
          const scrollable = Math.max(1, hero.offsetHeight - window.innerHeight);
          const rawHeroProgress = -rect.top / scrollable;
          const recenterEnd =
            (hero.offsetHeight - window.innerHeight * 0.5) / scrollable;
          heroProgress = clamp(rawHeroProgress, 0, 1);
          const expand = smoothstep(0.16, 0.56, heroProgress);
          const recenter = smoothstep(0.92, recenterEnd, rawHeroProgress);
          const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

          headerExpansion = reducedMotion
            ? rawHeroProgress >= 0.56 && rawHeroProgress < 0.92
              ? 1
              : 0
            : expand * (1 - recenter);
        }
      }

      if (onHome && width <= 900) {
        heroProgress = clamp(window.scrollY / Math.max(1, window.innerHeight * 2.25), 0, 1);
      }

      setShowBrand(!onHome || heroProgress >= (width > 900 ? 0.56 : 0.22));

      const outerInset = clamp(width * 0.02, 20, 36);
      const currentInset = centeredInset + (outerInset - centeredInset) * headerExpansion;
      document.documentElement.style.setProperty("--hero-frame-inset", `${currentInset}px`);
    };

    const requestUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("hashchange", requestUpdate);
    window.addEventListener("popstate", requestUpdate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("hashchange", requestUpdate);
      window.removeEventListener("popstate", requestUpdate);
      document.documentElement.style.removeProperty("--hero-frame-inset");
    };
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-graphite-950/82 backdrop-blur-md">
      <nav
        className="site-header-nav mx-auto flex h-16 items-center justify-between"
        aria-label="Primary navigation"
      >
        <Link
          href="/"
          onClick={handleBrandClick}
          aria-label="Matthew Deng home"
          className={`site-brand font-mono text-xs font-bold uppercase text-paper transition hover:text-cyan focus-visible:focus-ring ${
            showBrand ? "site-brand-visible" : ""
          }`}
        >
          <span className="site-brand-lockup">
            <span className="site-brand-logo">
              <Image
                src={siteConfig.purdueLogoSrc}
                alt=""
                width={22}
                height={14}
                aria-hidden="true"
                style={{ width: "auto", height: "auto" }}
              />
            </span>
            <span className="site-brand-name" aria-hidden="true">
              <Image
                src="/assets/identity/matthew-wordmark.png"
                alt=""
                width={1556}
                height={416}
              />
              <Image
                src="/assets/identity/deng-wordmark.png"
                alt=""
                width={769}
                height={415}
              />
            </span>
          </span>
        </Link>
        <div className="flex items-center gap-5 md:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="site-nav-link hidden text-sm font-semibold text-muted transition-colors hover:text-paper focus-visible:focus-ring sm:inline-flex"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={siteConfig.resumeInquiryHref}
            className="text-sm font-semibold text-muted transition-colors hover:text-paper focus-visible:focus-ring"
          >
            Résumé
          </a>
        </div>
      </nav>
    </header>
  );
}
