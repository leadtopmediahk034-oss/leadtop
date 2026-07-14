import { serviceSlugs } from "../components/servicePageData";
import { getPostsForSitemap } from "../lib/wordpress";

export const revalidate = 300;

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://leadtopmedia.com";
  const now = new Date();
  const staticRoutes = ["", "/aboutus", "/contactus", "/polaris", "/helios", "/blog"];
  const posts = await getPostsForSitemap();

  return [
    ...staticRoutes.map((route) => ({ url: `${baseUrl}${route}`, lastModified: now, changeFrequency: route === "/blog" ? "daily" : "monthly", priority: route === "" ? 1 : .8 })),
    ...serviceSlugs.map((slug) => ({ url: `${baseUrl}/services/${slug}`, lastModified: now, changeFrequency: "monthly", priority: .7 })),
    ...posts.map((post) => ({ url: `${baseUrl}/blog/${post.slug}`, lastModified: new Date(post.modified), changeFrequency: "monthly", priority: .7 })),
  ];
}
