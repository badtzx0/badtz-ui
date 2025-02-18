import { allDocs, allPosts, allChangelogs } from "@/.contentlayer/generated";
import { absoluteUrl } from "@/lib/utils";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://badtz-ui.com";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date().toISOString(),
      priority: 1.0,
      changeFrequency: "weekly",
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString(),
      priority: 0.6,
      changeFrequency: "weekly",
    },
  ];

  const blogPages: MetadataRoute.Sitemap = allPosts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slugAsParams}`),
    lastModified: new Date(post.date).toISOString(),
    priority: 0.6,
    changeFrequency: "weekly",
  }));

  const docPages: MetadataRoute.Sitemap = allDocs.map((doc) => ({
    url: absoluteUrl(`/docs/${doc.slugAsParams}`),
    lastModified: new Date().toISOString(),
    priority: 0.9,
    changeFrequency: "weekly",
  }));

  const changelogPages: MetadataRoute.Sitemap = allChangelogs.map(
    (changelog) => ({
      url: absoluteUrl(`/changelog/${changelog.slugAsParams}`),
      lastModified: new Date(changelog.date).toISOString(),
      priority: 0.7,
      changeFrequency: "weekly",
    })
  );

  return [...staticPages, ...blogPages, ...docPages, ...changelogPages];
}
