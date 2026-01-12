import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://oklahomabillionaire.com";

  // Static pages
  const staticPages = [
    "",
    "/vision",
    "/portfolio",
    "/news",
    "/press",
    "/contact",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  return staticEntries;
}
