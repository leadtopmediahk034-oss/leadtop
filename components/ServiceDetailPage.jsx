"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ChartLineUp,
  Check,
  Code,
  GraduationCap,
  Megaphone,
  PaintBrush,
  ShareNetwork,
  Strategy,
} from "@phosphor-icons/react";

import styles from "./ServiceDetailPage.module.css";
import { servicePages } from "./servicePageData";
import { SiteFooter, SiteHeader } from "./SiteChrome";

const serviceIcons = {
  websitedesign: Code,
  mediabuy: ChartLineUp,
  ads: Megaphone,
  ui: PaintBrush,
  socialmedia: ShareNetwork,
  incubation: GraduationCap,
  consultation: Strategy,
};

function CtaArrow() {
  return <span><ArrowRight aria-hidden="true" size={17} weight="bold" /></span>;
}

function SectionIntro({ eyebrow, title, intro }) {
  return (
    <div className={styles.sectionIntro}>
      {eyebrow && <p className={styles.sectionEyebrow}>{eyebrow}</p>}
      <h2>{title}</h2>
      {intro && <p className={styles.sectionLead}>{intro}</p>}
    </div>
  );
}

function PointList({ points }) {
  if (!points?.length) return null;

  return (
    <ul className={styles.pointList}>
      {points.map((point) => (
        <li key={point}><Check aria-hidden="true" size={15} weight="bold" /><span>{point}</span></li>
      ))}
    </ul>
  );
}

function SplitSection({ section, index }) {
  return (
    <section className={`${styles.splitSection} ${section.reverse ? styles.splitReverse : ""}`} aria-labelledby={`service-section-${index}`}>
      <div className={styles.splitMedia}>
        <Image alt={section.imageAlt} fill sizes="(max-width: 900px) 100vw, 46vw" src={section.image} />
      </div>
      <div className={styles.splitCopy}>
        {section.eyebrow && <p className={styles.sectionEyebrow}>{section.eyebrow}</p>}
        <h2 id={`service-section-${index}`}>{section.title}</h2>
        {section.intro && <p className={styles.sectionLead}>{section.intro}</p>}
        {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <PointList points={section.points} />
        {section.items?.length > 0 && (
          <div className={styles.splitItems}>
            {section.items.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                {item.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                <PointList points={item.points} />
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProcessSection({ section, index }) {
  return (
    <section className={styles.processSection} aria-labelledby={`service-section-${index}`}>
      <SectionIntro eyebrow={section.eyebrow} intro={section.intro} title={section.title} />
      <div className={`${styles.processGrid} ${section.items.every((item) => !item.points?.length) ? styles.compactProcess : ""}`}>
        {section.items.map((item, itemIndex) => (
          <article key={`${item.title}-${itemIndex}`}>
            <span>{String(itemIndex + 1).padStart(2, "0")}</span>
            <h3>{item.title}</h3>
            <PointList points={item.points} />
          </article>
        ))}
      </div>
    </section>
  );
}

function MilestonesSection({ section, index }) {
  return (
    <section className={styles.milestonesSection} aria-labelledby={`service-section-${index}`}>
      <SectionIntro eyebrow={section.eyebrow} title={section.title} />
      <ol>
        {section.items.map((item, itemIndex) => (
          <li key={item}><span>{itemIndex + 1}</span><strong>{item}</strong></li>
        ))}
      </ol>
    </section>
  );
}

function GallerySection({ section, index }) {
  return (
    <section className={styles.gallerySection} aria-labelledby={`service-section-${index}`}>
      <SectionIntro eyebrow={section.eyebrow} intro={section.intro} title={section.title} />
      <div className={styles.galleryGrid}>
        {section.items.map((item) => (
          <article key={item.title}>
            <div><Image alt={`${item.title}旧站创意案例`} fill sizes="(max-width: 620px) 100vw, (max-width: 1100px) 50vw, 25vw" src={item.image} /></div>
            <h3>{item.title}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}

function StatementSection({ section, index }) {
  return (
    <section className={styles.statementSection} aria-labelledby={`service-section-${index}`}>
      <p className={styles.sectionEyebrow}>{section.eyebrow}</p>
      <h2 id={`service-section-${index}`}>{section.title}</h2>
      <p>{section.copy}</p>
    </section>
  );
}

function RolesSection({ section, index }) {
  return (
    <section className={styles.rolesSection} aria-labelledby={`service-section-${index}`}>
      <SectionIntro eyebrow={section.eyebrow} title={section.title} />
      <div>
        {section.items.map((item, itemIndex) => <article key={item}><span>{itemIndex + 1}</span><h3>{item}</h3></article>)}
      </div>
    </section>
  );
}

function ServiceSection({ section, index }) {
  if (section.type === "split") return <SplitSection index={index} section={section} />;
  if (section.type === "process") return <ProcessSection index={index} section={section} />;
  if (section.type === "milestones") return <MilestonesSection index={index} section={section} />;
  if (section.type === "gallery") return <GallerySection index={index} section={section} />;
  if (section.type === "statement") return <StatementSection index={index} section={section} />;
  if (section.type === "roles") return <RolesSection index={index} section={section} />;
  return null;
}

function RelatedServices({ slugs }) {
  return (
    <section className={styles.relatedSection} aria-labelledby="related-services-title">
      <SectionIntro eyebrow="我们旨在解决真正的问题" title="还有以下解决方案" />
      <div className={styles.relatedGrid}>
        {slugs.map((slug) => {
          const related = servicePages[slug];
          const Icon = serviceIcons[slug];
          return (
            <Link href={`/services/${slug}`} key={slug}>
              <div className={styles.relatedMedia}>
                <Image alt={related.imageAlt} fill sizes="(max-width: 760px) 100vw, 50vw" src={related.image} />
              </div>
              <div className={styles.relatedCopy}>
                <Icon aria-hidden="true" size={25} weight="duotone" />
                <h3>{related.navLabel}</h3>
                <span>查看服务<ArrowRight aria-hidden="true" size={15} weight="bold" /></span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default function ServiceDetailPage({ service }) {
  const Icon = serviceIcons[service.slug];

  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#main-content">跳到主要内容</a>
      <SiteHeader />
      <main id="main-content">
        <section className={styles.hero} aria-labelledby="service-title">
          <div className={styles.heroCopy}>
            <Link className={styles.backLink} href="/#capabilities"><ArrowLeft aria-hidden="true" size={15} weight="bold" />服务内容</Link>
            <div className={styles.heroLabel}><Icon aria-hidden="true" size={24} weight="duotone" /><span>{service.navLabel}</span></div>
            <h1 id="service-title">{service.title}</h1>
            <p>{service.subtitle}</p>
            <Link className={styles.primaryButton} href="/contactus">立即咨询<CtaArrow /></Link>
          </div>
          <div className={styles.heroMedia}>
            <Image alt={service.imageAlt} fill priority sizes="(max-width: 900px) 100vw, 48vw" src={service.image} />
            <p>{service.kicker}</p>
          </div>
        </section>

        {service.sections.map((section, index) => <ServiceSection index={index} key={`${section.type}-${section.title}`} section={section} />)}

        <RelatedServices slugs={service.related} />

        <section className={styles.pageCta} aria-labelledby="service-cta-title">
          <div>
            <p>全球线上营销成功营，即刻开启您的全链路数字营销之旅</p>
            <h2 id="service-cta-title">探索更多无限可能！</h2>
          </div>
          <Link href="/contactus">联系 Leadtop<CtaArrow /></Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
