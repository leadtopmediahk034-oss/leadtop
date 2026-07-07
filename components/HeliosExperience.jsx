"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SolarScene from "./SolarScene";

const sections = [
  {
    id: "hero",
    step: "01",
    src: "/helios/sections/hero-reference.png",
    width: 1672,
    height: 941,
    title: "B2C/DTC 独立站增长引擎",
    label: "Helios Growth Engine",
    copy: "让 GMV 放大可控，ROI/MER 更稳定。Traffic、Conversion、Revenue 三大引擎形成增长闭环。",
    solar: "hero",
  },
  {
    id: "positioning",
    step: "02",
    src: "/helios/sections/positioning.png",
    width: 1672,
    height: 941,
    title: "DTC 独立站全链路效果增长系统",
    label: "System Positioning",
    copy: "面向 B2C 品牌、Shopify 店铺与平台转独立站团队，把广告、CRO、素材、复购和数据放进同一套增长模型。",
  },
  {
    id: "pain",
    step: "03",
    src: "/helios/sections/pain.png",
    width: 1672,
    height: 941,
    title: "独立站不是投不起来，而是增长不够稳定",
    label: "Growth Leaks",
    copy: "广告、素材、页面、产品组合、复购和数据归因没有协同，预算一放大，ROI 就开始失真。",
  },
  {
    id: "engine",
    step: "04",
    src: "/helios/sections/engine-reference.png",
    width: 1672,
    height: 941,
    title: "三大引擎，把流量变成收入和利润",
    label: "Engine System",
    copy: "用同一套经营模型连接广告获客、站内转化、收入放大与数据归因。",
    solar: "engine",
  },
  {
    id: "traffic",
    step: "05",
    src: "/helios/sections/traffic.png",
    width: 1672,
    height: 941,
    title: "让广告投放可控、可测试、可放大",
    label: "Traffic Engine",
    copy: "从预算分配、账户结构、素材测试到 Feed 优化和再营销，让每一份流量都进入可复盘的增长模型。",
  },
  {
    id: "conversion",
    step: "06",
    src: "/helios/sections/conversion.png",
    width: 1536,
    height: 1024,
    title: "让每一次访问产生更高价值",
    label: "Conversion Engine",
    copy: "优化 PDP、购物车、Checkout、评价、FAQ 与信任模块，让同样流量带来更多加购、支付和收入。",
  },
  {
    id: "revenue",
    step: "07",
    src: "/helios/sections/revenue.png",
    width: 1536,
    height: 1024,
    title: "让增长从一次成交走向长期利润",
    label: "Revenue Engine",
    copy: "通过 Bundle、Upsell、EDM/SMS、会员体系和复购 Campaign，把一次购买带入长期客户价值。",
  },
  {
    id: "campaign",
    step: "08",
    src: "/helios/sections/campaign.png",
    width: 1692,
    height: 930,
    title: "围绕全球营销节点，提前规划 DTC 增长节奏",
    label: "Campaign Rhythm",
    copy: "把素材、页面、广告预算、EDM Campaign 和复购活动放进同一张年度作战表。",
  },
  {
    id: "proof",
    step: "09",
    src: "/helios/sections/proof.png",
    width: 1536,
    height: 1024,
    title: "不只看 ROAS，更看整站增长质量",
    label: "Measurement Layer",
    copy: "把广告效率、站内转化、客单价、复购和长期利润放在一张表里判断。",
  },
  {
    id: "diagnosis",
    step: "10",
    src: "/helios/sections/diagnosis.png",
    width: 1536,
    height: 1024,
    title: "让 Helios Growth Engine 先诊断你的增长瓶颈",
    label: "Start with Diagnosis",
    copy: "留下店铺链接，Leadtop 将从广告、素材、页面、复购和数据五个维度判断优先优化点。",
  },
];

export default function HeliosExperience() {
  const rootRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return undefined;

    const context = gsap.context(() => {
      gsap.set(".scene-frame", { autoAlpha: 0.55, y: 34, scale: 0.965 });

      gsap.utils.toArray(".poster-section").forEach((section) => {
        const frame = section.querySelector(".scene-frame");

        gsap.to(frame, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 74%",
            end: "top 25%",
            scrub: 0.8,
          },
        });
      });

      gsap.to(".meter-fill", {
        scaleY: 1,
        transformOrigin: "top",
        ease: "none",
        scrollTrigger: {
          trigger: ".helios-experience",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
    }, rootRef);

    return () => context.revert();
  }, []);

  return (
    <main ref={rootRef} className="helios-experience">
      <a className="skip-link" href="#hero">
        跳至 Helios 页面
      </a>

      <aside className="chapter-meter" aria-label="页面章节进度">
        <span className="meter-track">
          <span className="meter-fill" />
        </span>
        <ol>
          {sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`} aria-label={`${section.step} ${section.title}`}>
                {section.step}
              </a>
            </li>
          ))}
        </ol>
      </aside>

      <a className="floating-diagnosis" href="#diagnosis">
        获取诊断
      </a>

      {sections.map((section, index) => {
        const ratio = section.width / section.height;

        return (
          <section
            id={section.id}
            key={section.id}
            className={`poster-section poster-${section.id}`}
            aria-labelledby={`${section.id}-title`}
          >
            <div
              className="scene-frame"
              style={{
                "--section-ratio": ratio,
              }}
            >
              <Image
                className="scene-shot"
                src={section.src}
                width={section.width}
                height={section.height}
                alt=""
                priority={index < 2}
                sizes="(max-width: 760px) 100vw, 96vw"
              />
              {section.solar ? (
                <div className={`solar-layer solar-layer-${section.solar}`}>
                  <SolarScene compact={section.solar !== "engine"} />
                </div>
              ) : null}
            </div>

            <div className="semantic-copy">
              {index === 0 ? (
                <h1 id={`${section.id}-title`}>{section.title}</h1>
              ) : (
                <h2 id={`${section.id}-title`}>{section.title}</h2>
              )}
              <p>{section.copy}</p>
            </div>
          </section>
        );
      })}
    </main>
  );
}
