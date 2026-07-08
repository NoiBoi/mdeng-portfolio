import type { Metadata } from "next";
import Script from "next/script";
import "@/app/globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { siteConfig } from "@/data/site";

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
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <Script id="hash-scroll-behavior" strategy="beforeInteractive">
          {`
            if (window.location.hash) {
              document.documentElement.style.scrollBehavior = "auto";
              window.addEventListener("load", function () {
                document.documentElement.style.scrollBehavior = "";
              }, { once: true });
            }
          `}
        </Script>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
