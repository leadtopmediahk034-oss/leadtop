import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteFooter, SiteHeader } from "../../../components/SiteChrome";
import { getNextPost, getPostBySlug, getPosts } from "../../../lib/wordpress";
import styles from "../Blog.module.css";
import { ArticleToc, ShareActions } from "./ArticleToc";

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

  const nextPost = await getNextPost(post);
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://leadtopmedia.com").replace(/\/+$/, "");
  const articleUrl = `${siteUrl}/blog/${post.slug}`;
  const category = post.categories[0]?.name || "Growth Insights";
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.modified,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: "Leadtop", url: siteUrl },
    mainEntityOfPage: articleUrl,
    image: post.featuredImage || undefined,
    articleSection: post.categories.map(({ name }) => name),
  };

  return (
    <>
      <SiteHeader />
      <main className={styles.page}>
        <article className={styles.article}>
          <header className={styles.articleHeader}>
            <div className={styles.articleUtilities}>
              <Link className={styles.backLink} href="/blog">← 返回新闻</Link>
              <ShareActions title={post.title} url={articleUrl} />
            </div>
            <div className={styles.articleMeta}>
              <span>{category}</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>作者 {post.author}</span>
            </div>
            <h1>{post.title}</h1>
            {post.excerpt && <p className={styles.articleStandfirst}>{post.excerpt}</p>}
          </header>

          {post.featuredImage && <div className={styles.articleImage}><img alt={post.featuredImageAlt} src={post.featuredImage} /></div>}

          <div className={styles.articleLayout}>
            <ArticleToc headings={post.headings} />
            <div className={styles.articleMain}>
              <div className={styles.prose} dangerouslySetInnerHTML={{ __html: post.content }} />
              <div className={styles.articleShareBottom}>
                <strong>分享本文</strong>
                <ShareActions title={post.title} url={articleUrl} />
              </div>
            </div>
            <aside className={styles.articleAside}>
              <span>Global growth</span>
              <strong>面向全球市场的品牌增长伙伴</strong>
              <p>从市场洞察到本地化执行，建立更清晰的增长路径。</p>
              <Link href="/contactus">联系我们 <span aria-hidden="true">→</span></Link>
            </aside>
          </div>

          <section className={styles.articleCta}>
            <span>Let&apos;s talk</span>
            <h2>让下一次全球增长<br />更清晰</h2>
            <p>无论你正处于出海的哪个阶段，Leadtop 都愿意成为你的长期伙伴，用全球视野与本地经验走向更大的市场。</p>
            <Link href="/contactus">联系我们 <span aria-hidden="true">→</span></Link>
          </section>

          {nextPost && (
            <Link className={styles.nextArticle} href={`/blog/${nextPost.slug}`}>
              {nextPost.featuredImage && <img alt="" src={nextPost.featuredImage} />}
              <span className={styles.nextArticleOverlay} aria-hidden="true" />
              <span className={styles.nextArticleContent}>
                <span>下一篇文章</span>
                <small>{nextPost.categories[0]?.name || "Growth Insights"}　/　{formatDate(nextPost.date)}</small>
                <strong>{nextPost.title}</strong>
              </span>
              <span className={styles.nextArticleArrow} aria-hidden="true">→</span>
            </Link>
          )}
        </article>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }} />
      </main>
      <SiteFooter />
    </>
  );
}
