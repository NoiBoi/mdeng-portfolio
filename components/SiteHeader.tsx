"use client";

import Link from "next/link";
import Image from "next/image";
import { type MouseEvent, useEffect, useState } from "react";
import { siteConfig } from "@/data/site";

const navItems = [
  { label: "Research", href: "/#research" },
  { label: "Engineering", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" }
];

export function SiteHeader() {
  const [showBrand, setShowBrand] = useState(false);

  const handleBrandClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname !== "/") return;
    event.preventDefault();
    window.history.replaceState(null, "", "/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const update = () => {
      const onHome = window.location.pathname === "/";
      const revealThreshold = window.matchMedia("(min-width: 901px)").matches ? 0.56 : 0.22;
      setShowBrand(!onHome || window.scrollY > window.innerHeight * revealThreshold);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("hashchange", update);
    window.addEventListener("popstate", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("hashchange", update);
      window.removeEventListener("popstate", update);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-graphite-950/82 backdrop-blur-md">
      <nav
        className="mx-auto flex h-16 max-w-[1680px] items-center justify-between px-5 md:px-6"
        aria-label="Primary navigation"
      >
        <Link
          href="/"
          onClick={handleBrandClick}
          aria-label="Matthew Deng — home"
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
