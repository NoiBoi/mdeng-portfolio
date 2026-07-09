"use client";

import Link from "next/link";
import Image from "next/image";
import { type MouseEvent, useEffect, useState } from "react";
import { siteConfig } from "@/data/site";

const navItems = [
  { label: "Work", href: "/#work" },
  { label: "Research", href: "/#research" },
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
      setShowBrand(!onHome || window.scrollY > window.innerHeight * 0.22);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("hashchange", update);
    window.addEventListener("popstate", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("hashchange", update);
      window.removeEventListener("popstate", update);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-graphite-950/82 backdrop-blur-md">
      <nav
        className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-5 md:px-8"
        aria-label="Primary navigation"
      >
        <Link
          href="/"
          onClick={handleBrandClick}
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
            <span>Matthew Deng</span>
          </span>
        </Link>
        <div className="flex items-center gap-5 md:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hidden text-sm font-semibold text-muted transition-colors hover:text-paper focus-visible:focus-ring sm:inline-flex"
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
