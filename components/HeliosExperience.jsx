"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { SiteFooter, SiteHeader } from "./SiteChrome";

const assetPrefix = process.env.NEXT_PUBLIC_ASSET_PREFIX || "";
const withAssetPrefix = (path) => `${assetPrefix}${path}`;
const assetBackground = (path) => `url(${withAssetPrefix(path)})`;

const metrics = [
  { key: "ROAS", label: "广告效率", value: "4.21", delta: "+18%" },
  { key: "MER", label: "整站效率", value: "3.67", delta: "+14%" },
  { key: "CAC", label: "新客成本", value: "$28.6", delta: "-18%" },
  { key: "CVR", label: "转化率", value: "2.35%", delta: "+23%" },
  { key: "AOV", label: "客单价", value: "$87.4", delta: "+15%" },
  { key: "LTV", label: "生命周期价值", value: "$198", delta: "+20%" },
];

const fitCards = [
  {
    title: "DTC 品牌",
    copy: "已有产品与供应链，寻求可持续增长。",
    image: "/helios/assets/revenue.png",
    position: "72% 44%",
  },
  {
    title: "Shopify 独立站",
    copy: "以独立站为主阵地，提升 GMV 与利润率。",
    image: "/helios/assets/hero.png",
    position: "66% 38%",
  },
  {
    title: "跨境电商品牌",
    copy: "深耕海外市场，实现品牌全球化。",
    image: "/helios/assets/traffic.png",
    position: "36% 54%",
  },
  {
    title: "平台转独立站",
    copy: "从平台走向品牌官网，掌握用户与数据。",
    image: "/helios/assets/diagnosis.png",
    position: "38% 58%",
  },
];

const painCards = [
  {
    no: "01",
    icon: "↗",
    title: "广告效果波动大",
    copy: "小预算能跑，一扩量 ROI 下滑。",
    detail: "ROAS 4.21",
    stat: "ROAS 4.21",
    preview: "media",
  },
  {
    no: "02",
    icon: "▶",
    title: "素材测试跟不上",
    copy: "爆款素材难复制，内容效率变低。",
    detail: "Hook / Offer / Product",
    stat: "素材队列 3 组",
    preview: "creative",
  },
  {
    no: "03",
    icon: "▱",
    title: "PDP 与 Checkout 流失",
    copy: "有访问，却没有足够加购和支付。",
    detail: "支付转化 2.1%",
    stat: "支付转化 2.1%",
    preview: "funnel",
  },
  {
    no: "04",
    icon: "◇",
    title: "AOV / LTV 提不上去",
    copy: "Bundle、Upsell、复购体系薄弱。",
    detail: "AOV $87.4 / LTV $198",
    stat: "LTV $198",
    preview: "revenue",
  },
  {
    no: "05",
    icon: "◷",
    title: "数据归因不清晰",
    copy: "只看 ROAS，看不清 MER 和真实利润。",
    detail: "广告投放 -> 站内访问 -> 下单转化 -> 复购",
    stat: "MER 3.67",
    preview: "attribution",
  },
];

const heroTrafficItems = [
  ["g", "Google"],
  ["m", "Meta"],
  ["t", "TikTok"],
  ["s", "SEO / 内容营销"],
  ["k", "KOL / 社媒合作"],
];

const heroRevenueItems = [
  ["e", "EDM / SMS"],
  ["x", "短信营销"],
  ["a", "AOV / LTV 提升"],
  ["v", "会员与积分体系"],
];

const engines = [
  {
    id: "traffic",
    title: "流量引擎",
    eyebrow: "Traffic Engine",
    tag: "精准获客 · 低成本流入",
    summary: "整合 Google、Meta、TikTok、SEO/GEO 与 KOL，让广告投放可控、可测试、可放大。",
    items: ["Google", "Meta", "TikTok", "SEO-GEO", "KOL"],
    bullets: ["预算分配与账户结构", "素材测试队列", "Feed 管理与再营销", "Pixel、CAPI、GA4 校准"],
  },
  {
    id: "conversion",
    title: "转化引擎",
    eyebrow: "Conversion Engine",
    tag: "降低流失 · 提升转化",
    summary: "优化 PDP、Cart、Checkout、Review 与 Guarantee，让每一次访问产生更高价值。",
    items: ["PDP", "Cart", "Checkout", "Review", "Guarantee"],
    bullets: ["卖点表达与信任模块", "评价、FAQ 与保障政策", "Bundle 与加价购", "热图、录屏和 A/B Testing"],
  },
  {
    id: "revenue",
    title: "收入引擎",
    eyebrow: "Revenue Engine",
    tag: "放大收入 · 提升复购与客单",
    summary: "通过 Bundle、EDM/SMS、会员与复购 Campaign，把一次成交带入长期利润。",
    items: ["Bundle", "EDM/SMS", "Membership", "Repeat Purchase"],
    bullets: ["欢迎流、弃购与浏览召回", "AOV 提升与组合售卖", "会员积分与权益设计", "LTV、复购率和老客营收分析"],
  },
];

const conversionSteps = [
  {
    id: "pdp",
    icon: "▣",
    title: "PDP",
    copy: "商品详情页优化卖点与信任。",
    metric: "CVR +23%",
    action: "重写首屏卖点、规格选择、保障信息和购买动线。",
  },
  {
    id: "cart",
    icon: "🛒",
    title: "Cart",
    copy: "购物车页提升加购与优惠感知。",
    metric: "ATC +18%",
    action: "把免邮门槛、优惠提醒和加购理由放到用户犹豫点。",
  },
  {
    id: "checkout",
    icon: "☑",
    title: "Checkout",
    copy: "结账页减少流失步骤。",
    metric: "Drop -14%",
    action: "压缩表单阻力，补齐支付安全、退换承诺和进度反馈。",
  },
  {
    id: "purchase",
    icon: "✓",
    title: "Purchase",
    copy: "支付成功后承接复购路径。",
    metric: "Repeat +16%",
    action: "用 Thank-you page 承接会员、订阅、二次购买和评价触发。",
  },
  {
    id: "upsell",
    icon: "◇",
    title: "Upsell",
    copy: "复购与加购提升客单价。",
    metric: "AOV +15%",
    action: "用 Bundle、加价购和组合套装提升客单价与利润空间。",
  },
];

const conversionAnnotations = [
  { key: "value", step: "pdp", title: "卖点表达", copy: "清晰传递核心价值", className: "note-1" },
  { key: "ugc", step: "pdp", title: "Review/UGC", copy: "真实评价提升信任", className: "note-2" },
  { key: "guarantee", step: "checkout", title: "Guarantee", copy: "降低购买风险", className: "note-3" },
  { key: "bundle", step: "upsell", title: "Bundle", copy: "提高客单价", className: "note-4" },
  { key: "friction", step: "checkout", title: "Checkout friction", copy: "减少流失步骤", className: "note-5" },
];

const revenueSteps = [
  {
    id: "first",
    no: "01",
    title: "First Purchase",
    label: "首单",
    copy: "完成第一笔订单，建立可追踪客户资产。",
    image: "/helios/assets/revenue.png",
    bullets: ["订单完成", "$39.00"],
  },
  {
    id: "bundle",
    no: "02",
    title: "Bundle / Upsell",
    label: "客单价提升",
    copy: "推荐搭配、加购优惠和组合售卖。",
    image: "/helios/assets/diagnosis.png",
    bullets: ["推荐搭配", "加购优惠"],
  },
  {
    id: "welcome",
    no: "03",
    title: "Welcome Flow",
    label: "欢迎邮件",
    copy: "用自动化欢迎流承接新客关系。",
    image: "/helios/assets/traffic.png",
    bullets: ["Welcome Email", "Shop Now"],
  },
  {
    id: "sms",
    no: "04",
    title: "SMS Recall",
    label: "召回",
    copy: "通过短信召回购物车、浏览和售后场景。",
    image: "/helios/assets/hero.png",
    bullets: ["购物车召回", "浏览召回"],
  },
  {
    id: "member",
    no: "05",
    title: "Membership / Repurchase",
    label: "会员复购",
    copy: "积分、等级和权益让老客贡献长期收入。",
    image: "/helios/assets/revenue.png",
    bullets: ["积分累计换礼", "定期补货提醒"],
  },
];

const quarters = [
  {
    id: "q1",
    title: "Valentine / Spring Launch",
    months: "1月 - 3月",
    tone: "green",
    rows: [
      { label: "素材准备", copy: "春季上新素材", media: ["revenue", "diagnosis", "traffic"] },
      { label: "Sale Page", copy: "春季上新专题页", media: ["hero"] },
      { label: "广告预算", copy: "预算占比 20%", budget: "20%" },
      { label: "EDM / SMS", copy: "新品首发 + 优惠券", tags: ["EDM", "SMS"] },
      { label: "复购召回", copy: "老客专享券 + 积分激励" },
    ],
  },
  {
    id: "q2",
    title: "Mother's Day / Summer Sale",
    months: "4月 - 6月",
    tone: "amber",
    rows: [
      { label: "素材准备", copy: "节日礼赠素材", media: ["diagnosis", "revenue", "hero"] },
      { label: "Sale Page", copy: "母亲节礼遇 / 夏季促销", media: ["traffic"] },
      { label: "广告预算", copy: "预算占比 25%", budget: "25%" },
      { label: "EDM / SMS", copy: "节日礼遇 + 限时折扣", tags: ["EDM", "SMS"] },
      { label: "复购召回", copy: "加购未购 / 沉睡唤醒" },
    ],
  },
  {
    id: "q3",
    title: "Back to School / Prime Day",
    months: "7月 - 9月",
    tone: "green",
    rows: [
      { label: "素材准备", copy: "返校与 Prime Day 素材", media: ["hero", "traffic", "revenue"] },
      { label: "Sale Page", copy: "开学季 / Prime Day 专题", media: ["diagnosis"] },
      { label: "广告预算", copy: "预算占比 30%", budget: "30%" },
      { label: "EDM / SMS", copy: "Prime Day 提醒 + 抢购", tags: ["EDM", "SMS"] },
      { label: "复购召回", copy: "浏览未购 / 回购激励" },
    ],
  },
  {
    id: "q4",
    title: "Black Friday / Christmas",
    months: "10月 - 12月",
    tone: "orange",
    rows: [
      { label: "素材准备", copy: "黑五与圣诞素材", media: ["traffic", "hero", "diagnosis"] },
      { label: "Sale Page", copy: "黑五大促 / 圣诞礼遇", media: ["revenue"] },
      { label: "广告预算", copy: "预算占比 25%", budget: "25%" },
      { label: "EDM / SMS", copy: "黑五预热 + 圣诞礼券", tags: ["EDM", "SMS"] },
      { label: "复购召回", copy: "VIP 专享 / 年终回馈" },
    ],
  },
];

const campaignFlow = [
  { key: "insight", title: "Insight", copy: "市场洞察与人群分析" },
  { key: "creative", title: "Creative", copy: "素材策略与创意制作" },
  { key: "landing-page", title: "Landing Page", copy: "落地页与转化优化" },
  { key: "media", title: "Media", copy: "广告投放与预算分配" },
  { key: "retention", title: "Retention", copy: "复购与会员运营" },
  { key: "review", title: "Review", copy: "数据复盘与优化迭代" },
];

const proofRows = [
  {
    industry: "家居生活",
    issue: "自然流量低，付费依赖广告；转化率和客单价偏低",
    action: "重构站内体验与信任体系；优化素材结构与落地页；搭建 EDM 与复购自动化",
    result: "ROI 与 GMV 阶段性提升；CVR 与 AOV 同步优化；邮件营收占比提升",
  },
  {
    industry: "美妆个护",
    issue: "广告成本高，新客留存差；内容同质化，复购率低",
    action: "UGC 内容体系搭建；受众分层与再营销策略；会员体系与权益设计",
    result: "ROI 与 GMV 阶段性提升；CVR 与 AOV 同步优化；邮件营收占比提升",
  },
  {
    industry: "运动户外",
    issue: "流量波动大，转化不稳定；购物车放弃率高",
    action: "广告账户结构与预算优化；PDP 优化与评价体系完善；购物车与结账流程优化",
    result: "ROI 与 GMV 阶段性提升；CVR 与 AOV 同步优化；邮件营收占比提升",
  },
];

const trustPoints = ["数据看板", "周报复盘", "月度增长建议", "节点营销计划"];

const engineHighlights = [
  ["shield", "统一经营模型", "流量 · 转化 · 收入一体化闭环"],
  ["trend", "数据驱动决策", "全链路归因，优化更精准"],
  ["lab", "自动化增长系统", "EDM/SMS · 复购 · 会员自动化"],
  ["team", "可复制 · 可放大", "稳定 ROI，长期利润增长"],
];

export default function HeliosExperience() {
  const [activeEngine, setActiveEngine] = useState("traffic");
  const [activeStep, setActiveStep] = useState("pdp");
  const [activeRevenue, setActiveRevenue] = useState("first");
  const [activeQuarter, setActiveQuarter] = useState("q4");
  const [activeMetric, setActiveMetric] = useState("ROAS");
  const [activePain, setActivePain] = useState("01");
  const [formStatus, setFormStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const blocks = Array.from(document.querySelectorAll(".reveal-block"));
    blocks.forEach((block, index) => {
      block.classList.add("reveal");
      block.style.setProperty("--delay", `${Math.min(index * 65, 260)}ms`);
    });

    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      blocks.forEach((block) => block.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.14 },
    );

    blocks.forEach((block) => observer.observe(block));
    return () => observer.disconnect();
  }, []);

  const currentStep = useMemo(() => conversionSteps.find((step) => step.id === activeStep) ?? conversionSteps[0], [activeStep]);
  const currentRevenue = useMemo(
    () => revenueSteps.find((step) => step.id === activeRevenue) ?? revenueSteps[0],
    [activeRevenue],
  );
  const currentQuarter = useMemo(() => quarters.find((quarter) => quarter.id === activeQuarter) ?? quarters[3], [activeQuarter]);
  const currentMetric = useMemo(() => metrics.find((metric) => metric.key === activeMetric) ?? metrics[0], [activeMetric]);

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setIsSubmitting(true);
    setFormStatus("正在提交店铺信息...");

    window.setTimeout(() => {
      setIsSubmitting(false);
      setFormStatus("已收到，我们会根据店铺链接给出初步增长判断。");
      form.reset();
    }, 700);
  }

  return (
    <>
    <SiteHeader />
    <main id="top" className="helios-page system-page">
      <div className="scroll-progress" aria-hidden="true" />

      <section className="hero section-shell" aria-labelledby="hero-title">
        <div className="hero-media" aria-hidden="true">
          <Image src="/helios/assets/traffic.png" alt="" width={1792} height={1024} priority />
        </div>

        <div className="hero-stage">
          <div className="hero-copy">
            <span className="sun-glyph" aria-hidden="true" />
            <h1 id="hero-title" className="system-name">Helios Growth Engine</h1>
            <p className="hero-subtitle">围绕 流量（Traffic）× 转化（Conversion）× 留存（Retention）× 数据（Data） 四大核心能力，实现 GMV 与 ROI 的持续规模化增长和品牌资产沉淀</p>
            <div className="hero-actions" aria-label="主要行动">
              <a className="btn btn-primary" href="#diagnosis">获取 DTC 增长诊断</a>
              <a className="btn btn-secondary" href="#engine">查看增长模型</a>
            </div>
          </div>
        </div>
      </section>

      <section id="fit" className="fit-section section-shell reveal-block" aria-labelledby="fit-title">
        <div className="section-center">
          <p className="small-kicker">Helios Growth Engine</p>
          <h2 id="fit-title">Leadtop 面向 B2C 品牌打造的独立站全链路增长解决方案</h2>
          <p>聚焦 GMV 与 ROI 的规模化增长，帮助品牌实现从获客、转化、复购到品牌资产沉淀的持续增长。</p>
        </div>

        <div className="section-rule"><span>服务的品牌与团队</span></div>
        <div className="fit-grid">
          {fitCards.map((card) => (
            <article className="fit-card" key={card.title}>
              <div
                className="fit-media"
                style={{
                  "--fit-image": assetBackground(card.image),
                  "--fit-position": card.position,
                }}
              >
                <span aria-hidden="true" />
              </div>
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
            </article>
          ))}
        </div>

        <div className="section-rule"><span>Growth System Coverage</span></div>
        <div className="coverage-strip" aria-label="Helios 覆盖能力">
          {["SEM营销推广", "SNS营销推广", "SEO", "GEO", "CRO优化", "EMD", "社媒运营", "内容产出"].map((item) => (
            <button key={item} type="button">{item}</button>
          ))}
        </div>
        <a className="text-link align-right" href="#diagnosis">查看适合你的增长路径</a>
      </section>

      <section className="pain-section section-shell reveal-block" aria-labelledby="pain-title">
        <div className="pain-bg" aria-hidden="true">
          <Image src="/helios/assets/traffic.png" alt="" width={1792} height={1024} />
        </div>
        <div className="pain-copy">
          <p className="small-kicker">Growth Leaks</p>
          <h2 id="pain-title">你如果面临独立站无法健康的增长，可能存在以下问题</h2>
          <p>广告、素材、页面、复购和数据没有协同，预算一放大，ROI 就开始失真。</p>
          <a className="text-link" href="#diagnosis">先做一次 DTC 增长诊断</a>
        </div>
        <div className="pain-board">
          {painCards.map((card) => (
            <button
              className={`leak-card ${activePain === card.no ? "is-active" : ""}`}
              key={card.no}
              type="button"
              onClick={() => setActivePain(card.no)}
            >
              <span className="leak-no">{card.no}</span>
              <i className="leak-icon" aria-hidden="true">{card.icon}</i>
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
              <LeakVisual type={card.preview} />
              <small>{card.stat}</small>
            </button>
          ))}
        </div>
      </section>

      <section id="engine" className="engine-section section-shell reveal-block" aria-labelledby="engine-title">
        <div className="section-center">
          <p className="small-kicker">Helios Growth Engine</p>
          <h2 id="engine-title">三大引擎，把流量变成收入和利润</h2>
          <p>用同一套经营模型连接广告获客、站内转化、收入放大与数据归因，让 GMV 放大可控，ROI/MER 更稳定。</p>
        </div>

        <div className="engine-orbit-board" aria-label="Helios 三大引擎模型">
          <div className="engine-rings" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="engine-sun-core">
            <span>Helios</span>
            <strong>Growth Engine</strong>
          </div>
          <i className="orbit-arrow arrow-top-left" aria-hidden="true" />
          <i className="orbit-arrow arrow-top-right" aria-hidden="true" />
          <i className="orbit-arrow arrow-bottom" aria-hidden="true" />
          {engines.map((engine) => (
            <button
              className={`engine-model-card ${engine.id}-engine ${activeEngine === engine.id ? "is-active" : ""}`}
              key={engine.id}
              type="button"
              onClick={() => setActiveEngine(engine.id)}
            >
              <div className="engine-card-head">
                <span className={`engine-symbol symbol-${engine.id}`} aria-hidden="true" />
                <div>
                  <small>{engine.eyebrow}</small>
                  <h3>{engine.title}</h3>
                </div>
                <b>{engine.tag}</b>
              </div>
              <div className="engine-item-flow">
                {engine.items.map((item) => (
                  <span key={item}>
                    <EngineItemIcon name={item} />
                    {item}
                  </span>
                ))}
              </div>
              <div className="engine-metric-row">
                {metrics.map((metric) => (
                  <span key={metric.key}>
                    <small>{metric.key}</small>
                    <strong>{metric.value}</strong>
                    <b>{metric.delta}</b>
                  </span>
                ))}
              </div>
            </button>
          ))}
          <div className="engine-benefit-strip">
            {engineHighlights.map(([icon, title, copy]) => (
              <article key={title}>
                <i className={`benefit-icon benefit-${icon}`} aria-hidden="true" />
                <strong>{title}</strong>
                <span>{copy}</span>
              </article>
            ))}
          </div>
          <div className="engine-orbit-actions">
            <a className="btn btn-primary" href="#diagnosis">获取 DTC 增长诊断</a>
            <a className="text-link" href="#conversion-title">查看 Helios 增长方法论</a>
          </div>
        </div>
      </section>

      <section className="conversion-section section-shell reveal-block" aria-labelledby="conversion-title">
        <div className="conversion-copy">
          <p className="small-kicker">Conversion Engine</p>
          <h2 id="conversion-title">让每一次访问产生更高价值</h2>
          <p>优化 PDP、购物车、Checkout、评价、FAQ 与信任模块，让同样流量带来更多加购、支付和收入。</p>
          <a className="btn btn-primary" href="#diagnosis">查看转化引擎动作</a>
          <div className="conversion-photo" aria-hidden="true" />
          <div className="conversion-side-metrics" aria-label="转化提升示例">
            <article>
              <span>CVR 提升</span>
              <strong>2.35%</strong>
              <small>+23%</small>
            </article>
            <article>
              <span>AOV 提升</span>
              <strong>$87.4</strong>
              <small>+15%</small>
            </article>
          </div>
        </div>

        <div className="product-stage" aria-label="独立站转化路径示意">
          <div className="shop-window">
            <div className="shop-nav">
              <strong><i aria-hidden="true">S</i>Shopify</strong>
              <span>Shop</span>
              <span>Best Sellers</span>
              <span>Skincare</span>
              <span>Bundles</span>
              <span>About</span>
              <b aria-hidden="true">⌕</b>
              <b aria-hidden="true">□</b>
            </div>

            <div className={`product-gallery ${activeStep === "pdp" ? "is-active" : ""}`}>
              <div className="thumb-rail" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </div>
              <button className="product-photo" type="button" onClick={() => setActiveStep("pdp")} aria-label="查看商品详情页优化">
                <span className="product-toast toast-mail">Welcome flow ready</span>
                <span className="product-toast toast-offer">Bundle save 15%</span>
                <span className="product-phone" aria-hidden="true">
                  <i />
                  <b>Add to cart</b>
                </span>
              </button>
            </div>

            <div className={`product-info ${activeStep === "pdp" || activeStep === "cart" ? "is-active" : ""}`}>
              <span>Daily Hydrating Cleanser</span>
              <div className="rating-row" aria-label="4.8 星评价">★★★★★ <b>4.8 (1,259 reviews)</b></div>
              <strong>$39.00 <em>USD</em></strong>
              <p>A gentle daily cleanser with botanical extracts that cleanses without stripping.</p>
              <div className="size-row" aria-label="规格选择">
                <button type="button" onClick={() => setActiveStep("pdp")}>120ml</button>
                <button type="button" className="is-selected" onClick={() => setActiveStep("cart")}>250ml</button>
                <button type="button" onClick={() => setActiveStep("pdp")}>500ml</button>
              </div>
              <div className="quantity-row" aria-label="数量选择">
                <button type="button" onClick={() => setActiveStep("cart")}>−</button>
                <strong>1</strong>
                <button type="button" onClick={() => setActiveStep("cart")}>+</button>
              </div>
              <button className="add-cart" type="button" onClick={() => setActiveStep("cart")}>Add to Cart</button>
              <button className="buy-now" type="button" onClick={() => setActiveStep("checkout")}>Buy it now</button>
              <small>Free shipping over $49</small>
              <small>30-day returns</small>
              <small>Secure payment</small>
            </div>

            <button className={`review-box module-card ${activeStep === "pdp" ? "is-active" : ""}`} type="button" onClick={() => setActiveStep("pdp")}>
              <strong>Reviews</strong>
              <span className="review-avatars" aria-hidden="true"><i /><i /><i /></span>
              <p>Love the texture and mild formula. My skin feels clean and hydrated.</p>
              <em>Sarah M.</em>
              <span>See all reviews →</span>
            </button>

            <button className={`faq-box module-card ${activeStep === "checkout" ? "is-active" : ""}`} type="button" onClick={() => setActiveStep("checkout")}>
              <strong>FAQ</strong>
              <span>Is it suitable for sensitive skin? <b>+</b></span>
              <span>What are the key ingredients? <b>+</b></span>
              <span>How often should I use it? <b>+</b></span>
              <span>Where is it made? <b>+</b></span>
            </button>

            <button className={`trust-box module-card ${activeStep === "checkout" ? "is-active" : ""}`} type="button" onClick={() => setActiveStep("checkout")}>
              <span><i>♧</i>Dermatologist Tested</span>
              <span><i>♡</i>Cruelty Free</span>
              <span><i>◇</i>30-Day Guarantee</span>
            </button>

            <button className={`bundle-box module-card ${activeStep === "upsell" ? "is-active" : ""}`} type="button" onClick={() => setActiveStep("upsell")}>
              <strong>Frequently bought together</strong>
              <div className="bundle-products" aria-hidden="true">
                <i />
                <b>+</b>
                <i />
                <b>−</b>
                <i />
              </div>
              <span>Complete Your Routine · Save 15%</span>
              <b>$93.50 <small>$110.00</small></b>
              <em>Add Bundle</em>
            </button>

            <button className={`checkout-box module-card ${activeStep === "checkout" ? "is-active" : ""}`} type="button" onClick={() => setActiveStep("checkout")}>
              <strong>Checkout</strong>
              <span className="is-done"><i>1</i>Cart ✓</span>
              <span className="is-current"><i>2</i>Information</span>
              <span><i></i>Shipping</span>
              <span><i></i>Payment</span>
            </button>
          </div>
          {conversionAnnotations.map((note) => (
            <button
              className={`annotation ${note.className} ${activeStep === note.step ? "is-active" : ""}`}
              key={note.key}
              type="button"
              onClick={() => setActiveStep(note.step)}
            >
              <strong>{note.title}</strong>
              <span>{note.copy}</span>
            </button>
          ))}
          <div className="conversion-path">
            {conversionSteps.map((step) => (
              <button
                className={activeStep === step.id ? "is-active" : ""}
                key={step.id}
                type="button"
                onClick={() => setActiveStep(step.id)}
              >
                <i aria-hidden="true">{step.icon}</i>
                <span>{step.title}</span>
                <small>{step.copy}</small>
              </button>
            ))}
            <article>
              <small>{currentStep.metric}</small>
              <strong>{currentStep.title}</strong>
              <span>{currentStep.action}</span>
            </article>
          </div>
        </div>
      </section>

      <section className="revenue-section section-shell reveal-block" aria-labelledby="revenue-title">
        <div className="revenue-copy">
          <p className="small-kicker">Revenue Engine</p>
          <h2 id="revenue-title">让增长从一次成交走向长期利润。</h2>
          <p>通过 Bundle、Upsell、EDM/SMS、会员体系和复购 Campaign，把一次购买带入长期客户价值。</p>
          <a className="text-link" href="#diagnosis">查看收入引擎动作</a>
        </div>
        <div className="revenue-benefits" aria-label="收入引擎目标">
          {[
            ["chart", "提升客单价", "AOV 持续增长"],
            ["repeat", "提高复购率", "老客贡献放大"],
            ["mail", "放大私域营收", "EDM/SMS 增长"],
            ["gem", "增强客户价值", "LTV 长期提升"],
          ].map(([icon, title, copy]) => (
            <article key={title}>
              <EngineItemIcon name={icon} />
              <strong>{title}</strong>
              <span>{copy}</span>
            </article>
          ))}
        </div>
        <div className="revenue-card-stage">
          <div className="revenue-arc" aria-hidden="true" />
          <div className="revenue-orbit-center" aria-hidden="true">
            <i />
          </div>
          {revenueSteps.map((step) => (
            <button
              className={`revenue-step-card revenue-card-${step.id} ${activeRevenue === step.id ? "is-active" : ""}`}
              key={step.id}
              type="button"
              onClick={() => setActiveRevenue(step.id)}
            >
              <span className="revenue-step-no">{step.no}</span>
              <strong>{step.title}</strong>
              <b>{step.label}</b>
              <RevenueCardVisual step={step} />
              <ul>
                {step.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </button>
          ))}
          <div className="revenue-layer">
            <strong>Helios Growth Engine / Revenue Layer</strong>
            <p>{currentRevenue.copy}</p>
            <div className="revenue-layer-metrics">
              {[
                ["AOV", "$87.4", "+15%"],
                ["LTV", "$198", "+20%"],
                ["复购率", "32.6%", "+18%"],
                ["EDM 营收占比", "24.1%", "+22%"],
              ].map(([key, value, delta]) => (
                <button key={key} type="button">
                  <span>{key}</span>
                  <strong>{value}</strong>
                  <small>{delta}</small>
                  <MiniLineChart tone="amber" />
                </button>
              ))}
            </div>
          </div>
          <div className="revenue-phone" aria-hidden="true">
            <strong>Subscribe & Save</strong>
            <span>定期补货更省心</span>
            <article>
              <i />
              <b>Every 30 Days</b>
              <small>10% OFF</small>
            </article>
            <article className="is-active">
              <i />
              <b>Every 60 Days</b>
              <small>15% OFF</small>
            </article>
            <article>
              <i />
              <b>Every 90 Days</b>
              <small>15% OFF</small>
            </article>
            <em>Subscribe Now</em>
          </div>
        </div>
      </section>

      <section className="campaign-section section-shell reveal-block" aria-labelledby="campaign-title">
        <div className="section-center">
          <p className="small-kicker">Campaign Rhythm</p>
          <h2 id="campaign-title">围绕全球营销节点，提前规划 DTC 增长节奏</h2>
          <p>Helios Growth Engine 将素材、页面、广告预算、EDM Campaign 和复购活动放进同一张年度作战表。</p>
          <div className="layer-pill campaign-layer-pill">Helios Growth Engine / Campaign Layer</div>
        </div>
        <div className="calendar-grid">
          {quarters.map((quarter) => (
            <button
              className={`calendar-card tone-${quarter.tone} ${activeQuarter === quarter.id ? "is-active" : ""}`}
              key={quarter.id}
              type="button"
              onClick={() => setActiveQuarter(quarter.id)}
            >
              <span className="quarter-badge">{quarter.id.toUpperCase()}</span>
              <strong>{quarter.title}</strong>
              <small>{quarter.months}</small>
              <ul className="campaign-task-list">
                {quarter.rows.map((row) => (
                  <li key={row.label}>
                    <EngineItemIcon name={row.label} />
                    <div>
                      <b>{row.label}</b>
                      <em>{row.copy}</em>
                    </div>
                    {row.media ? <CampaignMedia keysList={row.media} /> : null}
                    {row.budget ? <i className="campaign-budget" style={{ "--bar": row.budget }} /> : null}
                    {row.tags ? (
                      <span className="campaign-tags">
                        {row.tags.map((tag) => (
                          <strong key={tag}>{tag}</strong>
                        ))}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>
        <div className="rhythm-flow">
          {campaignFlow.map((item) => (
            <span key={item.key}>
              <EngineItemIcon name={item.key} />
              <b>{item.title}</b>
              <small>{item.copy}</small>
            </span>
          ))}
        </div>
        <div className="campaign-footer">
          <p>年度作战表驱动增长更可控：计划 → 执行 → 复盘 → 优化，当前选中 {currentQuarter.title}。</p>
          <a className="btn btn-primary" href="#diagnosis">获取适合你品类的年度营销节奏建议</a>
        </div>
      </section>

      <section id="proof" className="proof-section section-shell reveal-block" aria-labelledby="proof-title">
        <div className="proof-board">
          <div className="proof-copy">
            <p className="small-kicker">Growth Quality</p>
            <h2 id="proof-title">不止看短期 ROI，更看长期增长稳健性。</h2>
            <p>Helios Growth Engine 把广告效率、站内转化、客单价、复购和长期利润放在一张表里判断。</p>
            <a className="text-link" href="#diagnosis">查看可脱敏案例结构</a>
            <div className="active-note">
              <strong>{currentMetric.key} · {currentMetric.value}</strong>
              <span>{currentMetric.label} {currentMetric.delta}</span>
            </div>
          </div>
          <div className="measurement-badge">Helios Growth Engine / Measurement Layer</div>
          <div className="metrics-grid">
            {metrics.map((metric) => (
              <button
                className={activeMetric === metric.key ? "is-active" : ""}
                key={metric.key}
                type="button"
                onClick={() => setActiveMetric(metric.key)}
              >
                <span>{metric.key}</span>
                <strong>{metric.label}</strong>
                <b>{metric.value}</b>
                <small>{metric.delta}</small>
              </button>
            ))}
          </div>
          <div className="case-table">
            <h3>案例精选（部分行业）</h3>
            <div className="case-header">
              <span>行业</span>
              <span>原始问题</span>
              <span>Leadtop 动作</span>
              <span>阶段结果（90天）</span>
            </div>
            {proofRows.map((row) => (
              <article key={row.industry}>
                <strong>{row.industry}</strong>
                <p>{row.issue}</p>
                <p>{row.action}</p>
                <p>{row.result}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="diagnosis" className="diagnosis-section reveal-block" aria-labelledby="diagnosis-title">
        <div className="diagnosis-bg" aria-hidden="true">
          <Image src="/helios/assets/diagnosis.png" alt="" width={1792} height={1024} />
        </div>
        <div className="diagnosis-shell">
          <div className="diagnosis-copy">
            <p className="small-kicker">Start with Diagnosis</p>
            <h2 id="diagnosis-title">让 Helios Growth Engine 先诊断你的增长瓶颈</h2>
            <p>留下店铺链接，Leadtop 将从广告、素材、页面、复购和数据五个维度判断优先优化点。</p>
            <div className="diagnosis-actions">
              <a className="btn btn-primary" href="#diagnosis-form">获取 DTC 增长诊断</a>
              <a className="btn btn-secondary" href="#engine">咨询 Helios Growth Engine</a>
            </div>
            <div className="trust-row">
              {trustPoints.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <div className="layer-pill lower">Helios Growth Engine / Traffic + Conversion + Revenue</div>
          </div>

          <form id="diagnosis-form" className="diagnosis-form" onSubmit={handleSubmit}>
            <h3>获取 DTC 独立站增长诊断</h3>
            <label>
              <span>姓名</span>
              <input name="name" type="text" autoComplete="name" required />
            </label>
            <label>
              <span>公司</span>
              <input name="company" type="text" autoComplete="organization" required />
            </label>
            <label>
              <span>手机 / 微信</span>
              <input name="contact" type="text" autoComplete="tel" required />
            </label>
            <label>
              <span>官网 / 店铺链接</span>
              <input name="site" type="url" placeholder="https://yourstore.com" required />
            </label>
            <label>
              <span>当前最想解决的问题</span>
              <textarea name="problem" rows={4} placeholder="例如：ROI 不稳定、转化率低、客单价低、复购弱等" />
            </label>
            <button className="btn btn-primary form-button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "提交中..." : "提交店铺，评估增长空间"}
            </button>
            <output className={formStatus.includes("已收到") ? "form-status is-success" : "form-status"} aria-live="polite">
              {formStatus}
            </output>
          </form>
        </div>
      </section>
    </main>
    <SiteFooter />
    </>
  );
}

function LeakVisual({ type }) {
  if (type === "creative") {
    return (
      <div className="leak-visual leak-visual-creative" aria-hidden="true">
        <span className="creative-thumb-one"><i /></span>
        <span className="creative-thumb-two" />
        <span className="creative-thumb-three" />
      </div>
    );
  }

  if (type === "funnel") {
    return (
      <div className="leak-visual leak-visual-funnel" aria-hidden="true">
        <span><b>PDP 访问</b><strong>100%</strong><i /></span>
        <span><b>加购</b><strong>8.7%</strong><i /></span>
        <span><b>支付转化</b><strong>2.1%</strong><i /></span>
      </div>
    );
  }

  if (type === "revenue") {
    return (
      <div className="leak-visual leak-visual-revenue" aria-hidden="true">
        <span>
          <b>AOV</b>
          <strong>$87.4</strong>
          <MiniLineChart tone="green" />
        </span>
        <span>
          <b>LTV</b>
          <strong>$198</strong>
          <MiniLineChart tone="green" />
        </span>
      </div>
    );
  }

  if (type === "attribution") {
    return (
      <div className="leak-visual leak-visual-attribution" aria-hidden="true">
        {["广告投放", "站内访问", "下单转化", "复购"].map((item) => (
          <span key={item}><i />{item}</span>
        ))}
        <b />
      </div>
    );
  }

  return (
    <div className="leak-visual leak-visual-media" aria-hidden="true">
      <span>ROAS</span>
      <strong>4.21</strong>
      <MiniLineChart tone="amber" />
    </div>
  );
}

function MiniLineChart({ tone }) {
  return (
    <svg className={`mini-line-chart chart-${tone}`} viewBox="0 0 180 70" role="img" aria-label="">
      <path d="M8 50 C 22 48, 27 38, 42 42 S 62 51, 76 38 S 98 34, 110 28 S 132 21, 146 30 S 162 34, 172 18" />
    </svg>
  );
}

function EngineItemIcon({ name }) {
  const aliases = {
    素材准备: "creative",
    广告预算: "media",
    "复购召回": "retention",
  };
  const key = aliases[name] ?? name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return <i className={`engine-item-icon icon-${key}`} aria-hidden="true" />;
}

function RevenueCardVisual({ step }) {
  if (step.id === "sms") {
    return (
      <div className="revenue-card-visual sms-visual" aria-hidden="true">
        <span>Hey there. Get 15% off today.</span>
        <b>Code: AURORA15</b>
      </div>
    );
  }

  if (step.id === "member") {
    return (
      <div className="revenue-card-visual member-visual" aria-hidden="true">
        <strong>Aurora Club</strong>
        <span>Gold Member</span>
      </div>
    );
  }

  return (
    <div className="revenue-card-visual product-visual" aria-hidden="true">
      <span style={{ "--revenue-image": assetBackground(step.image) }} />
      <b>{step.id === "bundle" ? "Cleanser + Toner" : step.id === "welcome" ? "Welcome to Aurora" : "Hydrating Cleanser"}</b>
      <small>{step.id === "bundle" ? "$68.00" : step.id === "welcome" ? "Shop Now" : "$39.00"}</small>
    </div>
  );
}

function CampaignMedia({ keysList }) {
  const imageMap = {
    revenue: "/helios/assets/revenue.png",
    diagnosis: "/helios/assets/diagnosis.png",
    traffic: "/helios/assets/traffic.png",
    hero: "/helios/assets/hero.png",
  };

  return (
    <span className={`campaign-media media-count-${keysList.length}`} aria-hidden="true">
      {keysList.map((key) => (
        <i key={key} style={{ "--campaign-image": assetBackground(imageMap[key]) }} />
      ))}
    </span>
  );
}
