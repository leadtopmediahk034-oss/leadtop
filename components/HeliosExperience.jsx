"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

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

const trafficChannels = [
  {
    id: "google",
    icon: "G",
    title: "Google",
    copy: "Search / PMax / YouTube 捕捉高意图需求。",
    budget: "40%",
  },
  {
    id: "meta",
    icon: "∞",
    title: "Meta",
    copy: "用素材矩阵覆盖 TOF/MOF/BOF 人群。",
    budget: "35%",
  },
  {
    id: "tiktok",
    icon: "♪",
    title: "TikTok",
    copy: "短视频与 UGC 快速验证新卖点。",
    budget: "15%",
  },
  {
    id: "seo",
    icon: "⌕",
    title: "SEO / GEO",
    copy: "沉淀可持续自然流量和 AI 搜索可见性。",
    budget: "10%",
  },
];

const trafficCreatives = [
  { label: "Hook", state: "Testing" },
  { label: "Offer", state: "Testing" },
  { label: "Product", state: "Active" },
  { label: "Proof", state: "Active" },
];

const trafficOps = [
  ["◇", "Feed Management", ["Product Feed", "Catalog Sync", "Dynamic Rules"]],
  ["</>", "Pixel & Events", ["Meta Pixel", "TikTok Pixel", "Server-Side Events"]],
  ["☁", "CAPI", ["Conversions API", "Deduplication", "Data Quality"]],
];

const trafficSignals = [
  ["▥", "多渠道协同", "科学分配预算"],
  ["△", "素材持续测试", "找到高表现组合"],
  ["◎", "精准再营销", "提升转化效率"],
  ["↗", "数据闭环", "驱动增长决策"],
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
  { id: "first", no: "01", title: "First Purchase", label: "首单", copy: "完成第一笔订单，建立可追踪客户资产。" },
  { id: "bundle", no: "02", title: "Bundle / Upsell", label: "客单价提升", copy: "推荐搭配、加购优惠和组合售卖。" },
  { id: "welcome", no: "03", title: "Welcome Flow", label: "欢迎邮件", copy: "用自动化欢迎流承接新客关系。" },
  { id: "sms", no: "04", title: "SMS Recall", label: "召回", copy: "通过短信召回购物车、浏览和售后场景。" },
  { id: "member", no: "05", title: "Membership / Repurchase", label: "会员复购", copy: "积分、等级和权益让老客贡献长期收入。" },
];

const quarters = [
  {
    id: "q1",
    title: "Valentine / Spring Launch",
    months: "1月 - 3月",
    rows: ["素材准备", "Sale Page", "广告预算 20%", "EDM / SMS", "复购召回"],
  },
  {
    id: "q2",
    title: "Mother's Day / Summer Sale",
    months: "4月 - 6月",
    rows: ["素材准备", "Sale Page", "广告预算 25%", "EDM / SMS", "复购召回"],
  },
  {
    id: "q3",
    title: "Back to School / Prime Day",
    months: "7月 - 9月",
    rows: ["素材准备", "Sale Page", "广告预算 30%", "EDM / SMS", "复购召回"],
  },
  {
    id: "q4",
    title: "Black Friday / Christmas",
    months: "10月 - 12月",
    rows: ["素材准备", "Sale Page", "广告预算 25%", "EDM / SMS", "复购召回"],
  },
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

export default function HeliosExperience() {
  const [activeEngine, setActiveEngine] = useState("traffic");
  const [activeChannel, setActiveChannel] = useState("google");
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

  const currentEngine = useMemo(() => engines.find((engine) => engine.id === activeEngine) ?? engines[0], [activeEngine]);
  const currentChannel = useMemo(
    () => trafficChannels.find((channel) => channel.id === activeChannel) ?? trafficChannels[0],
    [activeChannel],
  );
  const currentStep = useMemo(() => conversionSteps.find((step) => step.id === activeStep) ?? conversionSteps[0], [activeStep]);
  const currentRevenue = useMemo(
    () => revenueSteps.find((step) => step.id === activeRevenue) ?? revenueSteps[0],
    [activeRevenue],
  );
  const currentQuarter = useMemo(() => quarters.find((quarter) => quarter.id === activeQuarter) ?? quarters[3], [activeQuarter]);
  const currentMetric = useMemo(() => metrics.find((metric) => metric.key === activeMetric) ?? metrics[0], [activeMetric]);
  const currentPain = useMemo(() => painCards.find((card) => card.no === activePain) ?? painCards[0], [activePain]);

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
    <main id="top" className="helios-page">
      <div className="scroll-progress" aria-hidden="true" />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Leadtop Helios Growth Engine">
          <span className="brand-sun" aria-hidden="true" />
          <span>
            <strong>Leadtop</strong>
            <small>Helios Growth Engine</small>
          </span>
        </a>
        <nav className="header-nav" aria-label="页面导航">
          <a href="#fit">适合客户</a>
          <a href="#engine">三大引擎</a>
          <a href="#traffic">服务动作</a>
          <a href="#proof">指标案例</a>
          <a href="#diagnosis">增长诊断</a>
          <a href="#resources">资源中心</a>
        </nav>
        <a className="header-cta" href="#diagnosis">获取诊断</a>
      </header>

      <section className="hero section-shell" aria-labelledby="hero-title">
        <div className="hero-media" aria-hidden="true">
          <Image src="/helios/assets/hero.png" alt="" width={1792} height={1024} priority />
        </div>

        <div className="hero-stage">
          <div className="hero-copy">
            <span className="sun-glyph" aria-hidden="true" />
            <p className="system-name">Helios Growth Engine</p>
            <h1 id="hero-title">B2C/DTC 独立站增长引擎</h1>
            <p className="hero-subtitle">让 GMV 放大可控，ROI/MER 更稳定</p>
            <div className="hero-actions" aria-label="主要行动">
              <a className="btn btn-primary" href="#diagnosis">获取 DTC 增长诊断</a>
              <a className="btn btn-secondary" href="#engine">查看增长模型</a>
            </div>
          </div>

          <button
            className={`hero-panel panel-traffic ${activeEngine === "traffic" ? "is-active" : ""}`}
            type="button"
            onClick={() => setActiveEngine("traffic")}
          >
            <span>Traffic Engine <small>流量引擎</small></span>
            {heroTrafficItems.map(([icon, item]) => (
              <strong key={item}><i>{icon}</i>{item}</strong>
            ))}
          </button>
          <button
            className={`hero-panel panel-revenue ${activeEngine === "revenue" ? "is-active" : ""}`}
            type="button"
            onClick={() => setActiveEngine("revenue")}
          >
            <span>Revenue Engine <small>收入引擎</small></span>
            {heroRevenueItems.map(([icon, item]) => (
              <strong key={item}><i>{icon}</i>{item}</strong>
            ))}
          </button>

          <div className="trust-strip" aria-label="信任信息">
            <span>数据来源：GA4 / Shopify / Ads Platform / Email</span>
            <span>数据安全合规，保障客户隐私</span>
            <span>100+ 品牌合作经验</span>
            <span>全链路指标驱动增长决策</span>
          </div>
        </div>
      </section>

      <section id="fit" className="fit-section section-shell reveal-block" aria-labelledby="fit-title">
        <SideLabel text="Helios / B2C Growth / Independent Site" />
        <div className="section-center">
          <p className="small-kicker">System Positioning</p>
          <h2 id="fit-title">Helios Growth Engine 是 DTC 独立站的全链路效果增长系统</h2>
          <p>面向 B2C 品牌、Shopify 店铺与平台转独立站团队，把广告、CRO、素材、复购和数据放进同一套增长模型。</p>
        </div>

        <div className="section-rule"><span>服务的品牌与团队</span></div>
        <div className="fit-grid">
          {fitCards.map((card) => (
            <article className="fit-card" key={card.title}>
              <div
                className="fit-media"
                style={{
                  "--fit-image": `url(${card.image})`,
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
          {["Google", "Meta", "TikTok", "SEO-GEO", "CRO", "EDM-SMS", "KOL-UGC", "GA4-GTM"].map((item) => (
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
          <h2 id="pain-title">独立站不是投不起来，而是增长不够稳定。</h2>
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
              <span>{card.no}</span>
              <i aria-hidden="true">{card.icon}</i>
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
              <small>{card.stat}</small>
              <b aria-hidden="true" />
            </button>
          ))}
        </div>
        <div className={`pain-preview preview-${currentPain.preview}`} aria-live="polite">
          <div className="preview-header">
            <span>{currentPain.no}</span>
            <strong>{currentPain.title}</strong>
          </div>
          <p>{currentPain.detail}</p>
          <div className="preview-visual" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <div className="preview-foot">
            <span>{currentPain.copy}</span>
            <b>{currentPain.stat}</b>
          </div>
        </div>
      </section>

      <section id="engine" className="engine-section section-shell reveal-block" aria-labelledby="engine-title">
        <div className="section-center">
          <p className="small-kicker">Helios Growth Engine</p>
          <h2 id="engine-title">三大引擎，把流量变成收入和利润</h2>
          <p>用同一套经营模型连接广告获客、站内转化、收入放大与数据归因，让 GMV 放大可控，ROI/MER 更稳定。</p>
        </div>

        <div className="orbit-system" aria-label="Helios 三大引擎模型">
          <div className="solar-core">
            <span>Helios</span>
            <strong>Growth Engine</strong>
          </div>
          {engines.map((engine) => (
            <button
              className={`engine-card ${engine.id}-card ${activeEngine === engine.id ? "is-active" : ""}`}
              key={engine.id}
              type="button"
              onClick={() => setActiveEngine(engine.id)}
            >
              <span>{engine.eyebrow}</span>
              <h3>{engine.title}</h3>
              <small>{engine.tag}</small>
              <div className="mini-chips">
                {engine.items.map((item) => (
                  <b key={item}>{item}</b>
                ))}
              </div>
            </button>
          ))}
        </div>

        <div className="engine-detail-panel">
          <article>
            <p className="small-kicker">{currentEngine.eyebrow}</p>
            <h3>{currentEngine.summary}</h3>
            <ul>
              {currentEngine.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <div className="metric-mini-grid">
            {metrics.map((metric) => (
              <button key={metric.key} type="button" onClick={() => setActiveMetric(metric.key)}>
                <span>{metric.key}</span>
                <strong>{metric.value}</strong>
                <small>{metric.delta}</small>
              </button>
            ))}
          </div>
          <div className="engine-actions">
            <a className="btn btn-primary" href="#diagnosis">获取 DTC 增长诊断</a>
            <a className="text-link" href="#traffic">查看 Helios 增长方法论</a>
          </div>
        </div>
      </section>

      <section id="traffic" className="traffic-section section-shell reveal-block" aria-labelledby="traffic-title">
        <div className="traffic-media">
          <Image src="/helios/assets/traffic.png" alt="电商品牌团队正在规划广告素材与流量投放" width={1792} height={1024} />
          <div className="channel-board">
            <strong>Channel Map</strong>
            <div className="channel-map">
              {trafficChannels.map((channel) => (
                <button
                  className={activeChannel === channel.id ? "is-active" : ""}
                  key={channel.id}
                  type="button"
                  onClick={() => setActiveChannel(channel.id)}
                >
                  <i>{channel.icon}</i>
                  {channel.title}
                </button>
              ))}
              <button type="button"><i>P</i>Pinterest</button>
              <button type="button"><i>K</i>KOL / UGC</button>
              <button type="button"><i>R</i>Retargeting</button>
            </div>
            <div className="layer-banner">Helios Growth Engine / Traffic Layer</div>
          </div>
          <div className="budget-card">
            <strong>Budget Mix</strong>
            {trafficChannels.map((channel) => (
              <button
                className={activeChannel === channel.id ? "is-active" : ""}
                key={channel.id}
                type="button"
                onClick={() => setActiveChannel(channel.id)}
              >
                <span>{channel.title}</span>
                <i style={{ "--bar": channel.budget }} />
                <b>{channel.budget}</b>
              </button>
            ))}
          </div>
          <div className="creative-queue">
            <strong>Creative Test Queue</strong>
            <div className="creative-list">
              {trafficCreatives.map((item, index) => (
                <button key={item.label} type="button">
                  <span aria-hidden="true" className={`creative-thumb thumb-${index + 1}`} />
                  <b>{item.label}</b>
                  <small>{item.state}</small>
                </button>
              ))}
            </div>
          </div>
          <div className="traffic-stack">
            {trafficOps.map(([icon, title, rows]) => (
              <article key={title}>
                <strong><i>{icon}</i>{title}</strong>
                {rows.map((row) => (
                  <span key={row}>{row}<b>✓</b></span>
                ))}
              </article>
            ))}
          </div>
          <div className="traffic-metrics">
            {metrics.slice(0, 3).map((metric) => (
              <button key={metric.key} type="button" onClick={() => setActiveMetric(metric.key)}>
                <span>{metric.key}</span>
                <strong>{metric.value}</strong>
                <small>{metric.delta}</small>
              </button>
            ))}
          </div>
        </div>
        <div className="detail-copy">
          <p className="small-kicker">Traffic Engine</p>
          <h2 id="traffic-title">让广告投放可控、可测试、可放大。</h2>
          <p>从预算分配、账户结构、素材测试到 Feed 优化和再营销，让每一份流量都进入可复盘的增长模型。</p>
          <a className="text-link" href="#engine">查看流量引擎动作</a>
          <div className="active-note">
            <strong>{currentChannel.title}</strong>
            <span>{currentChannel.copy}</span>
          </div>
          <div className="signal-row">
            {trafficSignals.map(([icon, title, copy]) => (
              <article key={title}>
                <i>{icon}</i>
                <strong>{title}</strong>
                <span>{copy}</span>
              </article>
            ))}
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
        </div>

        <div className="product-stage" aria-label="独立站转化路径示意">
          <div className="shop-window">
            <div className="shop-nav">
              <strong>Shopify</strong>
              <span>Shop Best Sellers Skincare Bundles About</span>
            </div>

            <div className={`product-gallery ${activeStep === "pdp" ? "is-active" : ""}`}>
              <div className="thumb-rail" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
              <button className="product-photo" type="button" onClick={() => setActiveStep("pdp")} aria-label="查看商品详情页优化" />
            </div>

            <div className={`product-info ${activeStep === "pdp" || activeStep === "cart" ? "is-active" : ""}`}>
              <span>Daily Hydrating Cleanser</span>
              <div className="rating-row" aria-label="4.8 星评价">★★★★★ <b>4.8</b></div>
              <strong>$39.00</strong>
              <p>A gentle daily cleanser with botanical extracts.</p>
              <div className="size-row" aria-label="规格选择">
                <button type="button" onClick={() => setActiveStep("pdp")}>120ml</button>
                <button type="button" className="is-selected" onClick={() => setActiveStep("cart")}>250ml</button>
                <button type="button" onClick={() => setActiveStep("pdp")}>500ml</button>
              </div>
              <button className="add-cart" type="button" onClick={() => setActiveStep("cart")}>Add to Cart</button>
              <button className="buy-now" type="button" onClick={() => setActiveStep("checkout")}>Buy it now</button>
              <small>Free shipping over $49 / 30-day returns / Secure payment</small>
            </div>

            <button className={`review-box module-card ${activeStep === "pdp" ? "is-active" : ""}`} type="button" onClick={() => setActiveStep("pdp")}>
              <strong>Reviews</strong>
              <p>Love the texture and mild formula. My skin feels clean and hydrated.</p>
              <span>See all reviews →</span>
            </button>

            <button className={`faq-box module-card ${activeStep === "checkout" ? "is-active" : ""}`} type="button" onClick={() => setActiveStep("checkout")}>
              <strong>FAQ</strong>
              <span>Suitable for sensitive skin?</span>
              <span>How often should I use it?</span>
            </button>

            <button className={`trust-box module-card ${activeStep === "checkout" ? "is-active" : ""}`} type="button" onClick={() => setActiveStep("checkout")}>
              <span>Dermatologist Tested</span>
              <span>Cruelty Free</span>
              <span>30-Day Guarantee</span>
            </button>

            <button className={`bundle-box module-card ${activeStep === "upsell" ? "is-active" : ""}`} type="button" onClick={() => setActiveStep("upsell")}>
              <strong>Frequently bought together</strong>
              <span>Complete Your Routine · Save 15%</span>
              <b>$93.50</b>
            </button>

            <button className={`checkout-box module-card ${activeStep === "checkout" ? "is-active" : ""}`} type="button" onClick={() => setActiveStep("checkout")}>
              <strong>Checkout</strong>
              <span>Cart ✓</span>
              <span>Information</span>
              <span>Shipping</span>
              <span>Payment</span>
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
        <div className="revenue-media">
          <Image src="/helios/assets/revenue.png" alt="电商品牌复购与订阅增长场景" width={1792} height={1024} />
        </div>
        <div className="lifecycle-flow">
          {revenueSteps.map((step) => (
            <button
              className={activeRevenue === step.id ? "is-active" : ""}
              key={step.id}
              type="button"
              onClick={() => setActiveRevenue(step.id)}
            >
              <span>{step.no}</span>
              <strong>{step.title}</strong>
              <b>{step.label}</b>
            </button>
          ))}
        </div>
        <div className="revenue-layer">
          <strong>Helios Growth Engine / Revenue Layer</strong>
          <p>{currentRevenue.copy}</p>
          <div className="metric-mini-grid">
            {metrics.slice(3).map((metric) => (
              <button key={metric.key} type="button" onClick={() => setActiveMetric(metric.key)}>
                <span>{metric.key}</span>
                <strong>{metric.value}</strong>
                <small>{metric.delta}</small>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="campaign-section section-shell reveal-block" aria-labelledby="campaign-title">
        <div className="section-center">
          <p className="small-kicker">Campaign Rhythm</p>
          <h2 id="campaign-title">围绕全球营销节点，提前规划 DTC 增长节奏</h2>
          <p>Helios Growth Engine 将素材、页面、广告预算、EDM Campaign 和复购活动放进同一张年度作战表。</p>
          <div className="layer-pill">Helios Growth Engine / Campaign Layer</div>
        </div>
        <div className="calendar-grid">
          {quarters.map((quarter) => (
            <button
              className={activeQuarter === quarter.id ? "is-active" : ""}
              key={quarter.id}
              type="button"
              onClick={() => setActiveQuarter(quarter.id)}
            >
              <span>{quarter.id.toUpperCase()}</span>
              <strong>{quarter.title}</strong>
              <small>{quarter.months}</small>
              <ul>
                {quarter.rows.map((row) => (
                  <li key={row}>{row}</li>
                ))}
              </ul>
            </button>
          ))}
        </div>
        <div className="rhythm-flow">
          {["Insight", "Creative", "Landing Page", "Media", "Retention", "Review"].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div className="campaign-footer">
          <p>当前选中：{currentQuarter.title}，重点节奏为 {currentQuarter.rows.join("、")}。</p>
          <a className="btn btn-primary" href="#diagnosis">获取适合你品类的年度营销节奏建议</a>
        </div>
      </section>

      <section id="proof" className="proof-section section-shell reveal-block" aria-labelledby="proof-title">
        <div className="proof-board">
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
          <div className="growth-loop">
            {trustPoints.map((item) => (
              <a key={item} href="#diagnosis">{item}</a>
            ))}
          </div>
        </div>
        <div className="proof-copy">
          <p className="small-kicker">Growth Quality</p>
          <h2 id="proof-title">不只看 ROAS，更看整站增长质量。</h2>
          <p>Helios Growth Engine 把广告效率、站内转化、客单价、复购和长期利润放在一张表里判断。</p>
          <a className="text-link" href="#diagnosis">查看可脱敏案例结构</a>
          <div className="active-note">
            <strong>{currentMetric.key} · {currentMetric.value}</strong>
            <span>{currentMetric.label} {currentMetric.delta}</span>
          </div>
        </div>
      </section>

      <section id="resources" className="resource-strip reveal-block" aria-label="Helios 信任信息">
        {["数据来源：GA4 / Shopify / Ads Platform / Email", "数据安全合规，保障客户隐私", "100+ 品牌合作经验", "全链路指标驱动增长决策"].map((item) => (
          <span key={item}>{item}</span>
        ))}
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
  );
}

function SideLabel({ text }) {
  return (
    <aside className="side-label" aria-hidden="true">
      <span />
      <b>{text}</b>
    </aside>
  );
}
