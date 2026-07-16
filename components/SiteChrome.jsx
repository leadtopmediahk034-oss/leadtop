"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CaretDown, List, X } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";

import styles from "./LeadtopHomepage.module.css";

const navigation = [
  { label: "增长方案", intro: "先按业务目标选择增长系统，再配置不重复的专项服务。", groups: [
    { title: "增长系统", links: [["Polaris B2B 增长系统", "/polaris"], ["Helios DTC 增长引擎", "/helios"]] },
    { title: "建站与转化", links: [["WordPress 与 Shopify 建站", "/services/websitedesign"], ["落地页与创意设计", "/services/ui"], ["SEO / GEO 与转化优化", "#capabilities"]] },
    { title: "获客与运营", links: [["广告投放与效果运营", "/services/ads"], ["媒体开户与充值", "/services/mediabuy"], ["社交媒体运营", "/services/socialmedia"], ["品牌孵化与增长咨询", "/services/incubation"]] },
  ] },
  { label: "行业", intro: "按行业决策路径与增长约束配置团队、渠道和内容。", groups: [
    { title: "B2B 行业", links: [["工业制造", "#systems"], ["机械设备", "#systems"], ["医疗健康", "#systems"], ["电子科技", "#systems"], ["新能源", "#systems"]] },
    { title: "B2C 行业", links: [["家居家具", "#systems"], ["运动户外", "#systems"], ["时尚服饰", "#systems"], ["美妆个护", "#systems"], ["生活方式", "#systems"], ["宠物用品", "#systems"]] },
  ] },
  { label: "客户案例", intro: "从业务问题、关键动作到结果口径，查看增长如何发生。", groups: [
    { title: "案例分类", links: [["B2B 出海案例", "#proof"], ["DTC 品牌案例", "#proof"], ["按行业查看", "#proof"]] },
  ] },
  { label: "资源中心", intro: "面向出海团队的洞察、指南和可执行增长资产。", groups: [
    { title: "增长知识", links: [["增长洞察", "/blog"], ["实战指南", "/blog"], ["行业报告", "/blog"]] },
    { title: "实用资源", links: [["方法模板", "#resources"], ["线上研讨会", "#resources"], ["常见问题", "#faq"]] },
  ] },
  { label: "关于我们", intro: "了解 Leadtop 的团队、合作生态与全球增长实践。", groups: [
    { title: "了解 Leadtop", links: [["公司介绍", "/aboutus"], ["专业团队", "/aboutus"], ["合作伙伴", "/aboutus"], ["加入我们", "/aboutus"], ["公司动态", "/aboutus"], ["联系我们", "/contactus"]] },
  ] },
];

const footerNavigation = [
  { title: "服务与方案", links: [["Polaris B2B 增长系统", "/polaris"], ["Helios DTC 增长引擎", "/helios"], ["独立站建设与转化", "/services/websitedesign"], ["广告投放与媒体", "/services/ads"], ["SEO / GEO 与内容", "#capabilities"], ["社媒与品牌运营", "/services/socialmedia"]] },
  { title: "案例与资源", links: [["B2B 出海案例", "#proof"], ["DTC 品牌案例", "#proof"], ["增长洞察", "/blog"], ["实战指南", "/blog"], ["常见问题", "#faq"]] },
  { title: "关于 Leadtop", links: [["公司介绍", "/aboutus"], ["专业团队", "/aboutus"], ["合作伙伴", "/aboutus"], ["公司动态", "/aboutus"]] },
  { title: "联系与合作", links: [["联系我们", "/contactus"], ["加入我们", "/aboutus"], ["获取增长方案", "/contactus"]] },
];

const pageHref = (href, isHomepage) => href.startsWith("#") && !isHomepage ? `/${href}` : href;

function BrandLogo({ footer = false }) {
  return (
    <Image
      alt=""
      aria-hidden="true"
      className={footer ? styles.footerBrandLogo : styles.brandLogo}
      height={172}
      loading={footer ? "lazy" : "eager"}
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
                <div className={styles.megaIntro}><span>{item.label}</span><p>{item.intro}</p><Link href={isHomepage ? "#diagnosis" : "/contactus"} onClick={() => setActiveMenu(null)}>咨询增长方案<ArrowRight size={16} weight="bold" /></Link></div>
                <div className={styles.megaGroups}>{item.groups.map((group) => <div key={group.title}><strong>{group.title}</strong>{group.links.map(([label, href]) => <Link key={label} href={pageHref(href, isHomepage)} onClick={() => setActiveMenu(null)}>{label}<ArrowRight size={14} /></Link>)}</div>)}</div>
              </div>
            </div>
          ))}
        </nav>
        <Link className={styles.headerCta} href={isHomepage ? "#diagnosis" : "/contactus"}>免费获取方案<CtaArrow /></Link>
        <button className={styles.menuButton} type="button" aria-expanded={mobileOpen} aria-label={mobileOpen ? "关闭导航" : "打开导航"} onClick={() => setMobileOpen((value) => !value)}>{mobileOpen ? <X size={22} /> : <List size={22} />}</button>
      </header>
      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ""}`} aria-hidden={!mobileOpen}>
        <div className={styles.mobileMenuInner}>
          {navigation.map((item) => <details key={item.label}><summary>{item.label}<CaretDown size={17} weight="bold" /></summary><div className={styles.mobileGroups}>{item.groups.map((group) => <div key={group.title}><strong>{group.title}</strong>{group.links.map(([label, href]) => <Link key={label} href={pageHref(href, isHomepage)} onClick={() => setMobileOpen(false)}>{label}<ArrowRight size={15} /></Link>)}</div>)}</div></details>)}
          <Link className={styles.mobileStrategy} href={isHomepage ? "#diagnosis" : "/contactus"} onClick={() => setMobileOpen(false)}>免费获取方案<ArrowRight size={18} /></Link>
        </div>
      </div>
    </>
  );
}

export function SiteFooter({ isHomepage = false }) {
  const href = (anchor) => isHomepage ? anchor : `/${anchor}`;
  return (
    <footer className={styles.siteFooter} id="about">
      <div className={styles.footerLead}>
        <Link className={styles.footerBrand} href="/" aria-label="Leadtop 首页"><BrandLogo footer /></Link>
        <h2>让全球增长成为<br />可持续经营能力</h2>
        <p>连接独立站、媒体、内容、转化与数据，为 B2B 企业和 DTC 品牌建设长期增长系统。</p>
      </div>
      <nav className={styles.footerNav} id="resources" aria-label="页脚导航">{footerNavigation.map((group) => <section key={group.title}><h3>{group.title}</h3><div className={styles.footerGroup}>{group.links.map(([label, link]) => <Link key={label} href={pageHref(link, isHomepage)}>{label}</Link>)}</div></section>)}</nav>
      <div className={styles.footerBottom}><span>Leadtop © 2026</span><span>Polaris 增长系统 · Helios 增长引擎</span><div><Link href={href("#privacy")}>隐私政策</Link><Link href={href("#terms")}>使用条款</Link><Link href={href("#sitemap")}>网站地图</Link></div></div>
    </footer>
  );
}
