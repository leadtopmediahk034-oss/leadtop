"use client";

import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";

import styles from "./Blog.module.css";

export default function BlogFeatured({ posts }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activePost = posts[activeIndex];

  if (!activePost) return null;

  const selectPost = (index) => setActiveIndex((index + posts.length) % posts.length);

  return (
    <section
      aria-label="重点新闻"
      className={styles.featured}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") selectPost(activeIndex - 1);
        if (event.key === "ArrowRight") selectPost(activeIndex + 1);
      }}
      tabIndex={0}
    >
      <article className={styles.featuredCard} aria-live="polite">
        <Link className={styles.featuredImage} href={`/blog/${activePost.slug}`} tabIndex="-1">
          {activePost.featuredImage
            ? <img alt={activePost.featuredImageAlt} src={activePost.featuredImage} />
            : <span className={styles.featuredPlaceholder} aria-hidden="true">L</span>}
        </Link>

        <div className={styles.featuredCopy}>
          <span className={styles.featuredCategory}>{activePost.categories[0]?.name || "新闻资讯"}</span>
          <Link href={`/blog/${activePost.slug}`}><h2>{activePost.title}</h2></Link>
          {activePost.excerpt && <p>{activePost.excerpt}</p>}
          <div className={styles.featuredFooter}>
            <time dateTime={activePost.date}>{activePost.dateLabel}</time>
            <div className={styles.featuredArrows} aria-label="切换重点新闻">
              <button aria-label="上一条重点新闻" disabled={posts.length < 2} onClick={() => selectPost(activeIndex - 1)} type="button">
                <ArrowLeft size={18} weight="bold" />
              </button>
              <button aria-label="下一条重点新闻" disabled={posts.length < 2} onClick={() => selectPost(activeIndex + 1)} type="button">
                <ArrowRight size={18} weight="bold" />
              </button>
            </div>
          </div>
        </div>
      </article>

      {posts.length > 1 && (
        <div className={styles.featuredDots} aria-label="选择重点新闻">
          {posts.map((post, index) => (
            <button
              aria-label={`查看第 ${index + 1} 条重点新闻`}
              aria-pressed={index === activeIndex}
              className={index === activeIndex ? styles.featuredDotActive : ""}
              key={post.id}
              onClick={() => selectPost(index)}
              type="button"
            />
          ))}
        </div>
      )}
    </section>
  );
}
