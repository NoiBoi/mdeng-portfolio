import type { Metadata } from "next";
import Script from "next/script";
import "@/app/globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { siteConfig } from "@/data/site";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Matthew Deng | Mechanical Engineering Portfolio",
  description: siteConfig.description,
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Matthew Deng | Mechanical Engineering Portfolio",
    description: siteConfig.description,
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <Script id="instant-work-jump" strategy="beforeInteractive">
          {`
            (function () {
              if (window.location.hash !== "#work" || !window.location.search.includes("instantWork=1")) return;
              document.documentElement.dataset.instantWorkJump = "true";
              document.documentElement.style.scrollBehavior = "auto";
              window.addEventListener("load", function () {
                var target = document.getElementById("work");
                if (!target) return;
                var snap = function () {
                  window.scrollTo({ top: window.scrollY + target.getBoundingClientRect().top, behavior: "auto" });
                };
                snap();
                window.history.replaceState(null, "", "/#work");
                requestAnimationFrame(snap);
                window.setTimeout(snap, 80);
                window.setTimeout(snap, 240);
                window.setTimeout(function () {
                  document.documentElement.style.scrollBehavior = "";
                }, 300);
              }, { once: true });
            })();
          `}
        </Script>
        <SiteHeader />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
