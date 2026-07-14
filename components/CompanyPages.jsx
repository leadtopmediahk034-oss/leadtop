"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Buildings,
  ChartLineUp,
  Code,
  EnvelopeSimple,
  GlobeHemisphereWest,
  MapPin,
  Megaphone,
  Phone,
  Sparkle,
  Strategy,
  Timer,
} from "@phosphor-icons/react";

import ContactForm from "./ContactForm";
import styles from "./CompanyPages.module.css";
import { SiteFooter, SiteHeader } from "./SiteChrome";

const growthSystems = [
  {
    title: "Polaris B2B 增长系统",
    href: "/polaris",
    details: ["转化型网站", "Google Ads", "SEO / GEO", "专业内容", "销售反馈闭环"],
    Icon: GlobeHemisphereWest,
  },
  {
    title: "Helios DTC 增长引擎",
    href: "/helios",
    details: ["广告投放", "创意素材", "Shopify CRO", "SEO / GEO", "用户运营"],
    Icon: ChartLineUp,
  },
];

const advantages = [
  { title: "营销思维", copy: "竞品调性、品牌调性、品牌定位、内容模块、效果驱动", Icon: Strategy },
  { title: "网站建设", copy: "内容规划、用户体验、Landing Page 设计、站内优化、社交媒体链接", Icon: Code },
  { title: "渠道引流", copy: "SEM: Google、Bing、Yandex；Video: YouTube、TikTok；SNS: Facebook、Pinterest、Twitter、Instagram、LinkedIn；DSP", Icon: Megaphone },
  { title: "数据跟踪", copy: "各媒体渠道代码部署、目标及事件配置、电子商务、转化可视化漏斗、种子用户", Icon: ChartLineUp },
  { title: "效果分析", copy: "渠道与媒介、归因模型、站内与站外流量、兴趣、地理位置、行为、技术、设备等", Icon: Sparkle },
  { title: "后续目标", copy: "定期复盘、确定下阶段目标和方向、网站体验升级、品牌重塑", Icon: ArrowRight },
];

const timeline = [
  { year: "2016", title: "元翼科技成立", copy: "收款便捷，科技创新" },
  { year: "2018", title: "十六阶成立", copy: "系统研发，高效全面" },
  { year: "2020", title: "领拓（香港）成立", copy: "跨境电商，出海计划" },
  { year: "2022", title: "宁波领拓成立", copy: "立足宁波，覆盖全国" },
];

function PageShell({ children }) {
  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#main-content">跳到主要内容</a>
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}

export function AboutPage() {
  return (
    <PageShell>
      <main id="main-content">
        <section className={styles.aboutHero} aria-labelledby="about-title">
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>关于领拓</span>
            <h1 id="about-title">专注客户效果服务，全链路<br />数字营销整合解决方案</h1>
            <p>与全球消费者有效链接</p>
            <Link className={styles.primaryButton} href="#services">了解两套系统<span><ArrowRight aria-hidden="true" size={17} weight="bold" /></span></Link>
          </div>
          <div className={styles.heroImage}>
            <Image
              alt="Leadtop 独立站增长系统展示"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 52vw"
              src="/leadtop/about/team-workspace.jpg"
            />
          </div>
        </section>

        <section className={styles.introSection} aria-labelledby="intro-title">
          <div className={styles.sectionHeading}>
            <span className={styles.eyebrow}>了解我们</span>
            <h2 id="intro-title">领拓数字营销</h2>
          </div>
          <div className={styles.introGrid}>
            <article className={styles.introLead}>
              <Buildings aria-hidden="true" size={36} weight="duotone" />
              <h3>领拓数字营销</h3>
              <p>领拓数字营销(LeadtopMedia)聚焦为出海企业提供竞品调研分析、网站建设、多渠道引流、广告代投放、效果分析、创意素材制作、PR 等全链路数字营销整合解决方案服务。团队平均数字营销经验 5 年，累计服务客户 500+，累计广告投放金额 $300,000,000。</p>
            </article>
            <div className={styles.introPhoto}>
              <Image alt="Leadtop 团队围绕客户增长策略开展协作" fill sizes="(max-width: 900px) 100vw, 54vw" src="/leadtop/about/team-collaboration.jpg" />
            </div>
          </div>
        </section>

        <section className={styles.servicesSection} id="services" aria-labelledby="services-title">
          <div className={styles.sectionHeading}>
            <p>两类业务目标，两条增长路径</p>
            <h2 id="services-title">两套增长系统</h2>
          </div>
          <div className={styles.serviceGrid}>
            {growthSystems.map(({ title, details, href, Icon }, index) => (
              <article className={styles.serviceCard} key={title}>
                <div className={styles.serviceTop}><span>{index + 1}</span><Icon aria-hidden="true" size={28} weight="duotone" /></div>
                <h3>{title}</h3>
                <p>{details.join(" / ")}</p>
                <Link className={styles.serviceLink} href={href}>查看系统<ArrowRight aria-hidden="true" size={15} weight="bold" /></Link>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.advantagesSection} aria-labelledby="advantages-title">
          <div className={styles.sectionHeading}>
            <p>服务优势</p>
            <h2 id="advantages-title">全链路数字营销整合解决方案</h2>
          </div>
          <div className={styles.advantageLayout}>
            <div className={styles.advantageVisual}>
              <Image alt="数字营销团队分析跨渠道增长数据" fill sizes="(max-width: 900px) 100vw, 40vw" src="/leadtop/about/growth-strategy.jpg" />
            </div>
            <div className={styles.advantageList}>
              {advantages.map(({ title, copy, Icon }) => (
                <article key={title}>
                  <Icon aria-hidden="true" size={23} weight="duotone" />
                  <div><h3>{title}</h3><p>{copy}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.timelineSection} id="timeline" aria-labelledby="timeline-title">
          <div className={styles.sectionHeading}>
            <p>了解我们</p>
            <h2 id="timeline-title">公司发展历程</h2>
          </div>
          <div className={styles.timeline}>
            {timeline.map((item) => (
              <article key={item.year}>
                <strong>{item.year}</strong>
                <div><h3>{item.title}</h3><p>{item.copy}</p></div>
              </article>
            ))}
          </div>
        </section>

      </main>
    </PageShell>
  );
}

export function ContactPage() {
  const contacts = [
    {
      title: "电话",
      lines: ["全国咨询：17815956889", "华南区：+86 150 5889 8105", "华东华北区：+86 137 3216 5859"],
      Icon: Phone,
    },
    { title: "地址", lines: ["浙江省宁波市宁波中心 A 座"], Icon: MapPin },
    { title: "邮箱", lines: ["service@leadtopmedia.com"], Icon: EnvelopeSimple },
  ];

  return (
    <PageShell>
      <main id="main-content">
        <section className={styles.contactHero} aria-labelledby="contact-title">
          <div className={styles.contactHeroCopy}>
            <span className={styles.eyebrow}>联系我们</span>
            <h1 id="contact-title">您与线上成功营销之旅，仅差一次点击的距离</h1>
            <div className={styles.contactHighlights}>
              <p><Buildings aria-hidden="true" size={21} weight="duotone" /><span><strong>公司地址</strong>总部位于宁波，业务遍及全球市场，为全球企业提供专业高效的支持服务</span></p>
              <p><Timer aria-hidden="true" size={21} weight="duotone" /><span><strong>服务时间</strong>7 天 * 24 小时，随时为您服务</span></p>
            </div>
          </div>
          <div className={styles.contactHeroImage}>
            <Image alt="Leadtop 增长顾问沟通与业务诊断" fill priority sizes="(max-width: 900px) 100vw, 48vw" src="/helios/assets/diagnosis.png" />
          </div>
        </section>

        <section className={styles.contactSection} aria-label="立即咨询与联系信息">
          <div className={styles.formWrap} id="contact-form"><ContactForm /></div>
          <aside className={styles.contactAside} aria-label="联系信息">
            <div className={styles.asideHeading}><span>联系信息</span><h2>立即咨询</h2></div>
            <div className={styles.contactCards}>
              {contacts.map(({ title, lines, Icon }) => (
                <article key={title}>
                  <Icon aria-hidden="true" size={27} weight="duotone" />
                  <div><h3>{title}</h3>{lines.map((line) => <p key={line}>{line}</p>)}</div>
                </article>
              ))}
            </div>
            <div className={styles.contactAsideImage}>
              <Image alt="Leadtop 全球营销服务与客户支持" fill sizes="(max-width: 900px) 100vw, 34vw" src="/leadtop/hero/homepage-banner-independent-growth.png" />
            </div>
          </aside>
        </section>

      </main>
    </PageShell>
  );
}
