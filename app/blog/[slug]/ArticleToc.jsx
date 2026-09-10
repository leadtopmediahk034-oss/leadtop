"use client";

import { CaretDown, LinkSimple, LinkedinLogo, ShareNetwork, XLogo } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

import styles from "../Blog.module.css";

export function ArticleToc({ headings, mobile = false }) {
  const [activeId, setActiveId] = useState(headings[0]?.id || "");

  useEffect(() => {
    if (headings.length < 2) return undefined;
    const elements = headings.map(({ id }) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-22% 0px -68% 0px", threshold: [0, 1] },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  const navigate = (event, id) => {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    setActiveId(id);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#${encodeURIComponent(id)}`);
  };

  const links = headings.map((heading, index) => (
    <a
      aria-current={activeId === heading.id ? "location" : undefined}
      className={`${styles.tocLink} ${heading.level === 3 ? styles.tocLinkNested : ""} ${activeId === heading.id ? styles.tocLinkActive : ""}`}
      href={`#${heading.id}`}
      key={heading.id}
      onClick={(event) => navigate(event, heading.id)}
    >
      <span>{String(index + 1).padStart(2, "0")}</span>
      {heading.text}
    </a>
  ));

  if (mobile) {
    return (
      <details className={styles.tocMobile}>
        <summary>
          <span>文章目录</span>
          <CaretDown aria-hidden="true" size={18} weight="bold" />
        </summary>
        <nav aria-label="移动端文章目录">{links}</nav>
      </details>
    );
  }

  return (
    <aside className={styles.tocRail}>
      <nav aria-label="文章目录" className={styles.tocDesktop}>
        <strong>文章目录</strong>
        <div>{links}</div>
      </nav>
    </aside>
  );
}

export function ShareActions({ title, url }) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const nativeShare = async () => {
    if (navigator.share) {
      await navigator.share({ title, url });
      return;
    }
    await copyLink();
  };

  return (
    <div aria-label="分享文章" className={styles.shareActions} role="group">
      <span>分享</span>
      <a aria-label="分享到 LinkedIn" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} rel="noreferrer" target="_blank"><LinkedinLogo aria-hidden="true" size={17} weight="bold" /></a>
      <a aria-label="分享到 X" href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`} rel="noreferrer" target="_blank"><XLogo aria-hidden="true" size={17} weight="bold" /></a>
      <button aria-label={copied ? "链接已复制" : "复制文章链接"} onClick={copyLink} type="button"><LinkSimple aria-hidden="true" size={17} weight="bold" /><span className={styles.shareStatus}>{copied ? "已复制" : ""}</span></button>
      <button aria-label="打开系统分享" className={styles.nativeShare} onClick={nativeShare} type="button"><ShareNetwork aria-hidden="true" size={17} weight="bold" /></button>
    </div>
  );
}
