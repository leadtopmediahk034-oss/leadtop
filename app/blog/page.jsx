import Link from "next/link";

import { SiteFooter, SiteHeader } from "../../components/SiteChrome";
import { getCategories, getPosts } from "../../lib/wordpress";
import BlogFeatured from "./BlogFeatured";
import styles from "./Blog.module.css";

export const revalidate = 300;

export const metadata = {
  title: "新闻资讯与增长洞察 | Leadtop 数字营销",
  description: "关注 Leadtop 最新动态，获取独立站、Google Ads、SEO/GEO、内容、转化与海外增长洞察。",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "新闻资讯与增长洞察 | Leadtop 数字营销",
    description: "关注出海行业前沿动态，获取可落地的独立站与数字营销增长洞察。",
    type: "website",
    url: "/blog",
  },
};

function formatDate(value) {
  return new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(value));
}

function blogUrl({ page = 1, category = "", search = "" } = {}) {
  const query = new URLSearchParams();
  if (category) query.set("category", category);
  if (search) query.set("search", search);
  if (page > 1) query.set("page", String(page));
  const suffix = query.toString();
  return suffix ? `/blog?${suffix}#news-list` : "/blog#news-list";
}

export default async function BlogPage({ searchParams }) {
  const query = await searchParams;
  const page = Math.max(1, Number.parseInt(query?.page || "1", 10) || 1);
  const categorySlug = typeof query?.category === "string" ? query.category : "";
  const search = typeof query?.search === "string" ? query.search.trim().slice(0, 100) : "";
  const categories = (await getCategories()).filter((category) => category.slug !== "uncategorized").slice(0, 4);
  const activeCategory = categories.find((category) => category.slug === categorySlug);
  const { posts, total, totalPages } = await getPosts({ page, categoryId: activeCategory?.id, search });
  const featuredPosts = page === 1 && !categorySlug && !search
    ? posts.slice(0, 3).map((post) => ({ ...post, dateLabel: formatDate(post.date) }))
    : [];
  const hasQuery = Boolean(categorySlug || search);

  return (
    <>
      <SiteHeader />
      <main className={styles.page}>
        <section className={styles.hero} aria-labelledby="blog-title">
          <h1 id="blog-title">Latest Insights</h1>
          <span className={styles.heroChinese}>新闻资讯</span>
          <p>关注出海行业前沿动态，获取可落地的增长洞察</p>
          <BlogFeatured posts={featuredPosts} />
        </section>

        <section className={styles.feed} aria-labelledby="latest-insights" id="news-list">
          <h2 className={styles.srOnly} id="latest-insights">新闻列表</h2>
          <div className={styles.tools}>
            <nav className={styles.categories} aria-label="新闻分类">
              <Link aria-current={!categorySlug ? "page" : undefined} className={!categorySlug ? styles.categoryActive : ""} href={blogUrl({ search })}>全部</Link>
              {categories.map((category) => (
                <Link
                  aria-current={category.slug === categorySlug ? "page" : undefined}
                  className={category.slug === categorySlug ? styles.categoryActive : ""}
                  href={blogUrl({ category: category.slug, search })}
                  key={category.id}
                >
                  {category.name}
                </Link>
              ))}
            </nav>
            <form action="/blog" className={styles.search} method="get" role="search">
              {categorySlug && <input name="category" type="hidden" value={categorySlug} />}
              <span aria-hidden="true" className={styles.searchIcon} />
              <input aria-label="搜索新闻" defaultValue={search} name="search" placeholder="搜索文章、关键词或话题…" type="search" />
              <button type="submit">搜索</button>
            </form>
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
                    <div className={styles.meta}><span>{post.categories[0]?.name || "新闻资讯"}</span><time dateTime={post.date}>{formatDate(post.date)}</time></div>
                    <h2>{post.title}</h2>
                    <span className={styles.readMore}>阅读文章</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <strong>{hasQuery ? "没有找到匹配的新闻" : "第一篇增长洞察即将发布"}</strong>
              <p>{hasQuery ? "请调整分类或搜索关键词后再试。" : "在 WordPress 后台发布文章后，这里会自动同步显示。"}</p>
              {hasQuery && <Link href="/blog#news-list">查看全部新闻</Link>}
            </div>
          )}

          {totalPages > 1 && (
            <nav className={styles.pagination} aria-label="博客分页">
              {page > 1 && <Link className={styles.pageDirection} href={blogUrl({ page: page - 1, category: categorySlug, search })}>← Prev</Link>}
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => number === page
                ? <span aria-current="page" key={number}>{number}</span>
                : <Link href={blogUrl({ page: number, category: categorySlug, search })} key={number}>{number}</Link>)}
              {page < totalPages && <Link className={styles.pageDirection} href={blogUrl({ page: page + 1, category: categorySlug, search })}>Next →</Link>}
            </nav>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
