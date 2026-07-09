import type { Metadata } from "next";
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
        <SiteHeader />
        {children}
	<Analytics />
      </body>
    </html>
  );
}
