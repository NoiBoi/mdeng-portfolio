import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectPages = projects.map((project) => ({
    url: `${siteConfig.siteUrl}/projects/${project.slug}`,
    changeFrequency: "monthly" as const,
    priority: project.featured ? 0.9 : 0.7
  }));

  return [
    {
      url: siteConfig.siteUrl,
      changeFrequency: "monthly",
      priority: 1
    },
    ...projectPages
  ];
}
