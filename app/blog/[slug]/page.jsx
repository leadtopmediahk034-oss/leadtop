import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteFooter, SiteHeader } from "../../../components/SiteChrome";
import { getPostBySlug, getPosts } from "../../../lib/wordpress";
import styles from "../Blog.module.css";

export const dynamicParams = true;
export const revalidate = 300;

function formatDate(value) {
  return new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "long", day: "numeric" }).format(new Date(value));
}

export async function generateStaticParams() {
  const { posts } = await getPosts({ perPage: 100 });
  return posts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const description = post.excerpt || `阅读 Leadtop 关于${post.title}的增长洞察。`;
  return {
    title: `${post.title} | Leadtop Growth Insights`,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description,
      type: "article",
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: [post.author],
      images: post.featuredImage ? [{ url: post.featuredImage, alt: post.featuredImageAlt }] : [],
    },
  };
}

export default async function BlogArticlePage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://leadtopmedia.com";
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.modified,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: "Leadtop", url: siteUrl },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
    image: post.featuredImage || undefined,
  };

  return (
    <>
      <SiteHeader />
      <main className={styles.page}>
        <article>
          <header className={styles.articleHeader}>
            <Link className={styles.backLink} href="/blog">← 返回 Growth Insights</Link>
            <h1>{post.title}</h1>
            <div className={styles.articleMeta}>
              <span>{post.categories[0]?.name || "Growth Insights"}</span>
              <span>{post.author}</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
          </header>

          {post.featuredImage && <div className={styles.articleImage}><img alt={post.featuredImageAlt} src={post.featuredImage} /></div>}

          <div className={styles.articleLayout}>
            <div className={styles.prose} dangerouslySetInnerHTML={{ __html: post.content }} />
            <aside className={styles.articleAside}>
              <span>Start with diagnosis</span>
              <strong>先识别主要增长约束，再决定渠道与投入顺序。</strong>
              <Link href="/contactus">预约增长咨询</Link>
            </aside>
          </div>
        </article>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }} />
      </main>
      <SiteFooter />
    </>
  );
}
