import { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://oklahomabillionaire.com";

  // Static pages
  const staticPages = [
    { route: "", changeFrequency: "weekly" as const, priority: 1 },
    { route: "/vision", changeFrequency: "monthly" as const, priority: 0.9 },
    { route: "/portfolio", changeFrequency: "monthly" as const, priority: 0.9 },
    { route: "/news", changeFrequency: "weekly" as const, priority: 0.8 },
    { route: "/press", changeFrequency: "monthly" as const, priority: 0.6 },
    { route: "/contact", changeFrequency: "monthly" as const, priority: 0.6 },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${baseUrl}${page.route}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  // Dynamic blog posts
  const posts = getPublishedPosts();
  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/news/${post.slug}`,
    lastModified: post.updated_at ? new Date(post.updated_at) : new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries];
}
