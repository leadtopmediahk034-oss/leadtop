import Link from "next/link";

import { SiteFooter, SiteHeader } from "../../components/SiteChrome";
import { getPosts } from "../../lib/wordpress";
import styles from "./Blog.module.css";

export const revalidate = 300;

export const metadata = {
  title: "Growth Insights | Leadtop 数字营销",
  description: "Leadtop 关于独立站、Google Ads、SEO/GEO、内容、转化与海外增长的实战洞察。",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Growth Insights | Leadtop 数字营销",
    description: "连接流量、内容、转化与数据的海外增长洞察。",
    type: "website",
    url: "/blog",
  },
};

function formatDate(value) {
  return new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "long", day: "numeric" }).format(new Date(value));
}

export default async function BlogPage({ searchParams }) {
  const query = await searchParams;
  const page = Math.max(1, Number.parseInt(query?.page || "1", 10) || 1);
  const { posts, total, totalPages } = await getPosts({ page });

  return (
    <>
      <SiteHeader />
      <main className={styles.page}>
        <section className={styles.hero} aria-labelledby="blog-title">
          <span className={styles.eyebrow}>Leadtop Growth Hub</span>
          <h1 id="blog-title">Growth<br />Insights</h1>
          <p>从独立站、媒体与内容出发，拆解真正影响询盘、转化和收入的增长问题。</p>
        </section>

        <section className={styles.feed} aria-labelledby="latest-insights">
          <div className={styles.feedHeading}>
            <h2 id="latest-insights">最新洞察</h2>
            <span>{total > 0 ? `${total} 篇文章` : "内容正在准备中"}</span>
          </div>

          {posts.length > 0 ? (
            <div className={styles.grid}>
              {posts.map((post) => (
                <Link className={styles.card} href={`/blog/${post.slug}`} key={post.id}>
                  <div className={styles.image}>
                    {post.featuredImage
                      ? <img alt={post.featuredImageAlt} src={post.featuredImage} />
                      : <span className={styles.placeholder}>L</span>}
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.meta}><span>{post.categories[0]?.name || "Growth Insights"}</span><time dateTime={post.date}>{formatDate(post.date)}</time></div>
                    <h2>{post.title}</h2>
                    {post.excerpt && <p>{post.excerpt}</p>}
                    <span className={styles.readMore}>阅读文章</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <strong>第一篇增长洞察即将发布</strong>
              <p>在 WordPress 后台发布文章后，这里会自动同步显示，无需修改前端代码。</p>
            </div>
          )}

          {totalPages > 1 && (
            <nav className={styles.pagination} aria-label="博客分页">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => number === page
                ? <span aria-current="page" key={number}>{number}</span>
                : <Link href={number === 1 ? "/blog" : `/blog?page=${number}`} key={number}>{number}</Link>)}
            </nav>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
