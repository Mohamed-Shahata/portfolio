import type { MetadataRoute } from "next";
import { getPublishedProjects } from "@/lib/data";

const SITE_URL = "https://devcore.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const PROJECTS = await getPublishedProjects();
  const projectEntries: MetadataRoute.Sitemap = PROJECTS.map((p) => ({
    url: `${SITE_URL}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...projectEntries,
  ];
}
