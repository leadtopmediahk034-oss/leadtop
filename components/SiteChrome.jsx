"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CaretDown, List, X } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";

import styles from "./LeadtopHomepage.module.css";

const navigation = [
  { label: "Solutions", intro: "两套增长系统，覆盖从获客到收入增长的关键路径。", groups: [
    { title: "B2B Growth", links: [["Polaris Growth System", "/polaris"], ["Website & Landing Pages", "#systems"], ["SEO / GEO", "#capabilities"], ["Google Ads", "#capabilities"]] },
    { title: "B2C Growth", links: [["Helios Growth Engine", "/helios"], ["Shopify Plus", "#systems"], ["Paid Media", "#capabilities"], ["CRO & Retention", "#capabilities"]] },
  ] },
  { label: "Industries", intro: "按行业决策路径与增长约束配置团队、渠道和内容。", groups: [
    { title: "B2B Industries", links: [["Industrial Manufacturing", "#systems"], ["Machinery", "#systems"], ["Medical", "#systems"], ["Electronics", "#systems"], ["New Energy", "#systems"]] },
    { title: "Consumer Industries", links: [["Furniture", "#systems"], ["Outdoor", "#systems"], ["Fashion", "#systems"], ["Beauty", "#systems"], ["Home & Living", "#systems"], ["Pet", "#systems"]] },
  ] },
  { label: "Case Studies", intro: "从业务问题、关键动作到结果口径，查看增长如何发生。", groups: [
    { title: "Explore Cases", links: [["By Industry", "#proof"], ["By Service", "#proof"], ["B2B Cases", "#proof"], ["B2C Cases", "#proof"]] },
  ] },
  { label: "Resources", intro: "面向出海团队的洞察、指南和可执行增长资产。", groups: [
    { title: "Knowledge", links: [["Growth Insights", "#resources"], ["Guides", "#resources"], ["Reports", "#resources"]] },
    { title: "Practical Assets", links: [["Templates", "#resources"], ["Webinar", "#resources"], ["FAQ", "#faq"]] },
  ] },
  { label: "About", intro: "了解 Leadtop 的团队、合作生态与全球增长实践。", groups: [
    { title: "Company", links: [["About Leadtop", "#about"], ["Our Team", "#about"], ["Partners", "#about"], ["Careers", "#about"], ["News", "#about"], ["Contact", "#diagnosis"]] },
  ] },
  { label: "Growth Hub", intro: "持续更新的增长知识中心，连接洞察、方法、工具与案例。", groups: [
    { title: "Learn", links: [["Growth Insights", "#resources"], ["Playbooks", "#resources"], ["Academy", "#resources"], ["AI Marketing", "#resources"]] },
    { title: "Use", links: [["Templates", "#resources"], ["Tools", "#resources"], ["Events", "#resources"], ["Customer Stories", "#proof"]] },
  ] },
];

const footerServices = [
  { title: "Website", links: ["WordPress Website", "Shopify Plus", "Landing Pages"] },
  { title: "Search & Content", links: ["SEO", "GEO", "AI Marketing", "Content Marketing"] },
  { title: "Paid Media", links: ["Google Ads", "Meta Ads", "Microsoft Ads", "LinkedIn Ads", "TikTok Ads", "Criteo Ads"] },
  { title: "Growth Operations", links: ["Social Media", "EDM / Email Marketing", "Influencer Marketing", "Crowdfunding", "CRO"] },
];

const pageHref = (href, isHomepage) => href.startsWith("#") && !isHomepage ? "/" : href;

function BrandLogo({ footer = false }) {
  return (
    <Image
      alt=""
      aria-hidden="true"
      className={footer ? styles.footerBrandLogo : styles.brandLogo}
      height={172}
      priority={!footer}
      sizes={footer ? "220px" : "176px"}
      src="/leadtop/brand/leadtop-logo-horizontal.png"
      width={1022}
    />
  );
}

function CtaArrow() {
  return <span className={styles.ctaIcon}><ArrowRight size={16} weight="bold" aria-hidden="true" /></span>;
}

export function SiteHeader({ isHomepage = false }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef(null);
  const cancelClose = () => { if (closeTimer.current) window.clearTimeout(closeTimer.current); closeTimer.current = null; };
  const openMenu = (label) => { cancelClose(); setActiveMenu(label); };
  const scheduleClose = () => { cancelClose(); closeTimer.current = window.setTimeout(() => setActiveMenu(null), 180); };
  useEffect(() => () => cancelClose(), []);

  return (
    <>
      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="Leadtop 首页"><BrandLogo /></Link>
        <nav className={styles.nav} aria-label="主导航" onKeyDown={(event) => event.key === "Escape" && setActiveMenu(null)} onMouseEnter={cancelClose} onMouseLeave={scheduleClose}>
          {navigation.map((item) => (
            <div className={styles.navItem} key={item.label} onMouseEnter={() => openMenu(item.label)}>
              <button type="button" aria-expanded={activeMenu === item.label} onClick={() => setActiveMenu(activeMenu === item.label ? null : item.label)}>{item.label}<CaretDown size={12} weight="bold" /></button>
              <div className={`${styles.megaMenu} ${activeMenu === item.label ? styles.megaMenuOpen : ""}`} aria-hidden={activeMenu !== item.label}>
                <div className={styles.megaIntro}><span>{item.label}</span><p>{item.intro}</p><Link href={isHomepage ? "#diagnosis" : "/"} onClick={() => setActiveMenu(null)}>Discuss your growth plan<ArrowRight size={16} weight="bold" /></Link></div>
                <div className={styles.megaGroups}>{item.groups.map((group) => <div key={group.title}><strong>{group.title}</strong>{group.links.map(([label, href]) => <Link key={label} href={pageHref(href, isHomepage)} onClick={() => setActiveMenu(null)}>{label}<ArrowRight size={14} /></Link>)}</div>)}</div>
              </div>
            </div>
          ))}
        </nav>
        <Link className={styles.headerCta} href={isHomepage ? "#diagnosis" : "/"}>Get Free Strategy<CtaArrow /></Link>
        <button className={styles.menuButton} type="button" aria-expanded={mobileOpen} aria-label={mobileOpen ? "关闭导航" : "打开导航"} onClick={() => setMobileOpen((value) => !value)}>{mobileOpen ? <X size={22} /> : <List size={22} />}</button>
      </header>
      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ""}`} aria-hidden={!mobileOpen}>
        <div className={styles.mobileMenuInner}>
          {navigation.map((item) => <details key={item.label}><summary>{item.label}<CaretDown size={17} weight="bold" /></summary><div className={styles.mobileGroups}>{item.groups.map((group) => <div key={group.title}><strong>{group.title}</strong>{group.links.map(([label, href]) => <Link key={label} href={pageHref(href, isHomepage)} onClick={() => setMobileOpen(false)}>{label}<ArrowRight size={15} /></Link>)}</div>)}</div></details>)}
          <Link className={styles.mobileStrategy} href={isHomepage ? "#diagnosis" : "/"} onClick={() => setMobileOpen(false)}>Get Free Strategy<ArrowRight size={18} /></Link>
        </div>
      </div>
    </>
  );
}

export function SiteFooter({ isHomepage = false }) {
  const href = (anchor) => isHomepage ? anchor : "/";
  return (
    <footer className={styles.siteFooter} id="about">
      <div className={styles.footerLead}>
        <Link className={styles.footerBrand} href="/" aria-label="Leadtop 首页"><BrandLogo footer /></Link>
        <h2>让全球增长成为<br />可持续经营能力</h2>
        <p>连接独立站、媒体、内容、转化与数据，为 B2B 企业和 DTC 品牌建设长期增长系统。</p>
        <Link className={styles.footerCta} href={href("#diagnosis")}>Get Free Strategy<CtaArrow /></Link>
      </div>
      <section className={styles.footerServices} id="resources" aria-labelledby="footer-services-title">
        <div><span>SERVICES</span><h3 id="footer-services-title">增长服务能力</h3><p>服务内容不占用主导航，通过独立页面与页脚目录承接。</p></div>
        <nav aria-label="服务导航">{footerServices.map((group) => <div className={styles.footerServiceGroup} key={group.title}><strong>{group.title}</strong>{group.links.map((label) => <Link key={label} href={href("#capabilities")}>{label}</Link>)}</div>)}</nav>
      </section>
      <nav className={styles.footerNav} aria-label="页脚导航">{navigation.map((item) => <section key={item.label}><h3>{item.label}</h3>{item.groups.map((group) => <div className={styles.footerGroup} key={group.title}>{item.groups.length > 1 && <strong>{group.title}</strong>}{group.links.map(([label, link]) => <Link key={`${group.title}-${label}`} href={pageHref(link, isHomepage)}>{label}</Link>)}</div>)}</section>)}</nav>
      <div className={styles.footerBottom}><span>Leadtop © 2026</span><span>Polaris Growth System · Helios Growth Engine</span><div><Link href={href("#privacy")}>Privacy</Link><Link href={href("#terms")}>Terms</Link><Link href={href("#sitemap")}>Sitemap</Link></div></div>
    </footer>
  );
}
