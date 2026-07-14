"use client";

import { useState } from "react";
import {
  Browser,
  Calendar,
  Certificate,
  ChartBar,
  ChartPieSlice,
  Check,
  Clock,
  FacebookLogo,
  Factory,
  FileText,
  Funnel,
  Gear,
  GlobeHemisphereWest,
  GoogleLogo,
  InstagramLogo,
  LinkedinLogo,
  MagnifyingGlass,
  Monitor,
  PaperPlaneTilt,
  Path,
  Question,
  Rows,
  ShieldCheck,
  Strategy,
  Target,
  TrendUp,
  Wrench,
  YoutubeLogo,
  UserFocus,
} from "@phosphor-icons/react/dist/ssr";

import styles from "./PolarisExperience.module.css";
import SystemAdvantageExplorer from "./SystemAdvantageExplorer";
import { SiteFooter, SiteHeader } from "./SiteChrome";
import { submitInquiry } from "../lib/inquiry-client";

const iconProps = { size: 34, weight: "regular", "aria-hidden": true };

const painItems = [
  {
    no: "01",
    title: "网站建好了，但没有询盘",
    tag: "Site",
    copy: "页面看起来完整，却没有围绕海外买家的搜索意图、采购顾虑和联系路径设计，访客看完就离开。",
    Icon: Browser,
  },
  {
    no: "02",
    title: "Google Ads 有点击，但线索质量不稳",
    tag: "Traffic",
    copy: "广告账户在花钱，搜索词、落地页和转化追踪却没有联动，点击不少，真正能跟进的客户不多。",
    Icon: ChartBar,
  },
  {
    no: "03",
    title: "SEO 和 GEO 没有长期布局",
    tag: "Trust",
    copy: "关键词、产品页、FAQ、博客内容和结构化信息缺少系统规划，很难持续获得自然流量和 AI 搜索推荐。",
    Icon: MagnifyingGlass,
  },
  {
    no: "04",
    title: "品牌信任不足，海外客户不敢联系",
    tag: "Site",
    copy: "工厂实力、认证资质、客户案例、应用场景和常见问题展示不完整，客户无法判断你是否值得信任。",
    Icon: ShieldCheck,
  },
  {
    no: "05",
    title: "数据追踪不清，优化靠感觉",
    tag: "Review",
    copy: "没有完整的转化事件、来源追踪和询盘质量反馈，很难判断哪些渠道、页面和内容真正带来客户。",
    Icon: ChartBar,
  },
  {
    no: "06",
    title: "询盘跟进断层，增长无法沉淀",
    tag: "Follow-up",
    copy: "表单线索、销售跟进和客户结果没有回流到营销系统，团队无法识别高价值客户，也很难复制有效获客路径。",
    Icon: Path,
  },
];

const systems = [
  {
    no: "01",
    title: "Traffic System",
    cn: "流量系统",
    summary: "让海外买家精准找到你",
    Icon: GlobeHemisphereWest,
    items: [
      { label: "Google Ads", Icon: GoogleLogo },
      { label: "SEO / GEO", Icon: MagnifyingGlass },
      { label: "LinkedIn", Icon: LinkedinLogo },
      { label: "Bing", Icon: Browser },
      { label: "Product Keywords", Icon: FileText },
    ],
    visual: "traffic",
    searches: ["industrial fasteners supplier", "cnc machining parts", "heat exchangers manufacturer"],
  },
  {
    no: "02",
    title: "Conversion System",
    cn: "转化系统",
    summary: "让访问者愿意留下询盘",
    Icon: Funnel,
    items: [
      { label: "B2B 官网", Icon: Monitor },
      { label: "Landing Page", Icon: Browser },
      { label: "表单", Icon: Rows },
      { label: "WhatsApp", Icon: PaperPlaneTilt },
      { label: "CTA", Icon: Target },
    ],
    visual: "conversion",
    searches: ["Name", "Email", "Company", "Message"],
  },
  {
    no: "03",
    title: "Trust System",
    cn: "信任系统",
    summary: "让陌生客户相信你",
    Icon: ShieldCheck,
    items: [
      { label: "案例", Icon: FileText },
      { label: "资质", Icon: Certificate },
      { label: "工厂实拍", Icon: Factory },
      { label: "FAQ", Icon: Question },
      { label: "社媒背书", Icon: LinkedinLogo },
    ],
    visual: "trust",
    searches: ["Certificate", "Factory Proof", "Case Review"],
  },
];

const services = [
  { no: "01", stage: "定位", title: "增长定位与目标客户画像", copy: "明确网站要吸引谁、说服谁、转化谁。", tag: "Strategy", preview: "客户画像与价值主张", Icon: UserFocus },
  { no: "02", stage: "建站", title: "B2B 外贸独立站建设", copy: "搭建能承接搜索、广告和销售开发流量的网站。", tag: "Site", preview: "工业解决方案首页", Icon: GlobeHemisphereWest },
  { no: "03", stage: "建站", title: "产品页与 Landing Page 制作", copy: "用更短路径承接高意向产品词和广告流量。", tag: "Site", preview: "落地页线框", Icon: Browser },
  { no: "04", stage: "引流", title: "Google Ads 与多渠道投放", copy: "验证搜索词、落地页、询盘质量和获客成本。", tag: "Traffic", preview: "搜索词与账户结构", Icon: GoogleLogo },
  { no: "05", stage: "引流", title: "谷歌 SEO 与 GEO 优化", copy: "沉淀产品词、场景词和问答内容资产。", tag: "Traffic", preview: "关键词矩阵", Icon: MagnifyingGlass },
  { no: "06", stage: "转化", title: "CRO 转化率优化", copy: "优化页面、表单、CTA 和信任模块，提高询盘率。", tag: "Conversion", preview: "表单与 A/B 测试", Icon: Funnel },
  { no: "07", stage: "转化", title: "社媒内容与品牌背书", copy: "用案例、资质、FAQ 和社媒内容降低采购顾虑。", tag: "Trust", preview: "FAQ 内容库", Icon: FileText },
  { no: "08", stage: "复盘", title: "数据追踪与增长复盘", copy: "持续判断广告、SEO、页面和内容的真实效果。", tag: "Review", preview: "月度增长报告", Icon: ChartBar },
];

const serviceStages = [
  { label: "定位", sub: "Positioning", Icon: Target },
  { label: "建站", sub: "Site", Icon: Monitor },
  { label: "引流", sub: "Traffic", Icon: PaperPlaneTilt },
  { label: "转化", sub: "Conversion", Icon: Funnel },
  { label: "复盘", sub: "Review", Icon: ChartBar },
];

const processSteps = [
  { no: "01", time: "第 1-2 个月", title: "诊断、建站与数据基建", items: ["业务诊断", "竞品分析", "关键词研究", "GA4/GTM"], Icon: Strategy },
  { no: "02", time: "第 2-3 个月", title: "广告测试与询盘反馈", items: ["Google Ads", "Bing/LinkedIn", "落地页", "询盘质量"], Icon: ChartBar },
  { no: "03", time: "第 3-6 个月", title: "SEO/GEO 内容资产起势", items: ["产品页", "FAQ", "案例", "行业引用"], Icon: FileText },
  { no: "04", time: "持续优化", title: "用数据提升询盘质量", items: ["搜索词", "页面转化", "CPL/CVR", "销售反馈"], Icon: Target },
];

const diagnosisItems = [
  { label: "网站承接", Icon: Browser },
  { label: "广告结构", Icon: ChartBar },
  { label: "SEO/GEO", Icon: MagnifyingGlass },
  { label: "信任内容", Icon: ShieldCheck },
  { label: "询盘路径", Icon: PaperPlaneTilt },
];

const systemAdvantages = [
  {
    label: "建站",
    title: "网站不是交付终点，而是获客系统的起点",
    problem: "只做页面设计，网站上线后没有稳定流量和询盘承接。",
    solution: "先明确目标市场、关键词、流量来源和转化路径，再决定页面结构与内容优先级。",
    proof: ["目标客户画像", "搜索意图结构", "询盘承接路径"],
    icon: "monitor",
  },
  {
    label: "投放",
    title: "广告不只买点击，也验证询盘质量",
    problem: "只盯点击和消耗，搜索词、落地页与销售反馈各自分开。",
    solution: "将广告、Landing Page、表单、CTA 和线索反馈连成一条优化链路。",
    proof: ["搜索词筛选", "页面联动", "线索反馈"],
    icon: "trend",
  },
  {
    label: "SEO/GEO",
    title: "长期内容资产，也要服务当下获客",
    problem: "只做内容堆积，排名周期长，短期没有方向反馈。",
    solution: "用广告先验证高价值关键词，再把产品页、FAQ 和场景内容沉淀为搜索资产。",
    proof: ["关键词验证", "FAQ 内容库", "AI 搜索可见性"],
    icon: "search",
  },
  {
    label: "信任",
    title: "信任内容放在客户决策的关键位置",
    problem: "案例、资质和工厂实力分散，客户看完仍然无法判断是否可靠。",
    solution: "把案例、认证、工厂实拍和常见问题嵌入产品页与询盘路径，降低采购顾虑。",
    proof: ["案例背书", "资质证明", "采购顾虑解答"],
    icon: "trust",
  },
  {
    label: "复盘",
    title: "每一次投入，都能回到数据和销售反馈",
    problem: "流量、表单和销售跟进没有连接，优化只能靠感觉。",
    solution: "通过转化事件、来源追踪和询盘质量反馈，持续判断下一步该优化什么。",
    proof: ["转化追踪", "询盘分级", "月度增长复盘"],
    icon: "review",
  },
];

const proofCards = [
  {
    no: "01",
    title: "Landing Page 联动广告",
    tag: "搜索词 / 落地页 / 表单 / 销售反馈",
    points: ["关键词与搜索意图对齐", "落地页结构与转化路径优化", "表单字段精简与分级", "销售反馈闭环与线索分配"],
    visual: "landing",
  },
  {
    no: "02",
    title: "SEO / GEO 内容资产",
    tag: "产品词 / 应用场景 / FAQ / 行业引用",
    points: ["产品与应用场景内容体系化", "FAQ 覆盖用户关键决策问题", "行业引用与可信来源增强信任", "内容更新与搜索可见性提升"],
    visual: "content",
  },
  {
    no: "03",
    title: "月度增长复盘",
    tag: "CPL / CVR / 询盘质量 / 销售反馈",
    points: ["关键指标变动与原因分析", "高价值页面与内容表现复盘", "询盘质量与销售反馈对齐", "下月优化重点与实验计划"],
    visual: "review",
  },
];

const caseRows = [
  {
    industry: "机械设备",
    Icon: Gear,
    problem: "关键词分散，页面与搜索意图不匹配",
    action: "关键词体系重建，页面分层优化，内容与意图对齐",
    results: ["关键词覆盖更清晰", "高意向询盘提升"],
  },
  {
    industry: "工业配件",
    Icon: Wrench,
    problem: "落地页结构单一，内容薄弱，广告与页面脱节",
    action: "重构落地页与表单逻辑，广告、页面、表单联动",
    results: ["表单转化率提升", "有效询盘占比提升"],
  },
  {
    industry: "定制制造",
    Icon: Factory,
    problem: "有流量但转化低，销售反馈信息不足",
    action: "内容资产补强，表单分级，销售跟进机制优化",
    results: ["CPL 持续优化", "销售跟进效率提升"],
  },
];

function ProofVisual({ type }) {
  if (type === "landing") {
    return (
      <div className={styles.landingProof} aria-label="搜索到销售反馈的落地页联动路径">
        {[
          { label: "搜索", Icon: MagnifyingGlass },
          { label: "页面", Icon: Browser },
          { label: "表单", Icon: Rows },
          { label: "反馈", Icon: PaperPlaneTilt },
        ].map(({ label, Icon }, index) => (
          <div key={label}>
            <span><Icon size={21} weight="regular" aria-hidden /></span>
            <b>{label}</b>
            {index < 3 && <i aria-hidden>→</i>}
          </div>
        ))}
      </div>
    );
  }

  if (type === "content") {
    return (
      <div className={styles.contentProof} aria-label="FAQ 与可信引用内容结构">
        <div>
          <strong>FAQ</strong>
          {["采购周期", "质量标准", "交付能力"].map((item) => (
            <span key={item}><Check size={14} weight="bold" aria-hidden />{item}</span>
          ))}
        </div>
        <blockquote>
          <b>“</b>
          <span>用明确来源和行业内容回答客户的关键决策问题。</span>
        </blockquote>
      </div>
    );
  }

  return (
    <div className={styles.reviewProof} aria-label="月度增长复盘指标">
      {[
        ["CPL", "下降"],
        ["CVR", "提升"],
        ["询盘质量", "提升"],
        ["销售反馈", "闭环"],
      ].map(([label, state]) => (
        <div key={label}>
          <TrendUp size={22} weight="regular" aria-hidden />
          <b>{label}</b>
          <span>{state}</span>
        </div>
      ))}
    </div>
  );
}

const faqs = [
  ["B2B 外贸企业适合做独立站吗？", "适合。尤其是客单价较高、销售周期较长、需要展示资质、工厂实力和案例的企业，独立站可以承接搜索、广告、展会、社媒和销售开发流量，沉淀自己的海外获客资产。"],
  ["外贸独立站建好后多久能有询盘？", "如果配合 Google Ads 或 Bing Ads 测试，通常可以更快获得市场反馈；SEO/GEO 属于长期资产，需要持续内容和页面优化。Polaris 会把短期广告测试和长期自然流量建设结合起来。"],
  ["Google Ads 有点击没询盘怎么办？", "需要同时检查搜索词、广告文案、落地页、表单、CTA、移动端体验和转化追踪。很多时候问题不是广告没有流量，而是页面没有有效承接，或者表单获得的线索没有和销售反馈打通。"],
  ["外贸独立站如何提高询盘质量？", "关键不是让所有访客都填表，而是通过关键词筛选、Landing Page、案例内容、FAQ、表单字段和销售跟进机制，吸引更匹配的目标客户，并持续筛掉低质量流量。"],
  ["SEO 和 GEO 有什么区别？", "SEO 更关注 Google 等搜索引擎的自然排名，GEO 更关注 AI 搜索、生成式回答和问答场景中的品牌可见性。B2B 企业适合通过 FAQ、产品解释、应用场景、行业方案和权威引用同时布局。"],
  ["Polaris 和普通外贸推广有什么不同？", "普通外贸推广往往只负责单一渠道，比如建站、广告或 SEO。Polaris 会把网站、广告、SEO/GEO、Landing Page、信任内容和数据复盘放在同一套系统里，以询盘质量和获客成本作为核心指标。"],
];

function MiniVisual({ type, items }) {
  if (type === "traffic") {
    return (
      <div className={styles.systemVisual}>
        <div className={styles.mapPanel}>
          <span />
          <i />
          <b />
        </div>
        <div className={styles.searchStack}>
          {items.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    );
  }

  if (type === "conversion") {
    return (
      <div className={styles.systemVisual}>
        <div className={styles.pageMock}>
          <b />
          <span />
          <span />
          <i />
        </div>
        <form className={styles.quoteMock}>
          {items.map((item) => (
            <label key={item}>{item}<input aria-label={item} /></label>
          ))}
          <button type="button">Get A Quote</button>
        </form>
      </div>
    );
  }

  return (
    <div className={styles.systemVisual}>
      <div className={styles.certMock}>
        <Certificate size={33} weight="regular" aria-hidden />
        <strong>CERTIFICATE</strong>
        <span>ISO 9001:2015</span>
        <i aria-hidden />
      </div>
      <div className={styles.factoryGrid}>
        <i aria-label="工厂生产线素材" />
        <i aria-label="工厂装配素材" />
      </div>
      <div className={styles.ratingMock}>
        <span>★★★★★</span>
        <strong>Great product quality<br />and professional service.</strong>
      </div>
      <div className={styles.trustSocial} aria-label="社媒背书">
        <LinkedinLogo size={16} weight="fill" aria-hidden />
        <YoutubeLogo size={17} weight="fill" aria-hidden />
        <FacebookLogo size={16} weight="fill" aria-hidden />
        <InstagramLogo size={17} weight="regular" aria-hidden />
      </div>
    </div>
  );
}

function PreviewMaterial({ service }) {
  const previewClass = styles[`preview${service.no}`] || styles[`preview${service.tag}`] || "";
  const content = {
    "01": {
      title: "客户画像与价值主张",
      lines: ["目标客户", "核心痛点", "决策顾虑", "价值主张"],
      type: "profile",
    },
    "02": {
      title: "Your Trusted Partner",
      lines: ["Products", "Solutions", "About", "Resources"],
      type: "site",
    },
    "03": {
      title: "Landing Page 线框",
      lines: ["Hero", "Proof", "CTA"],
      type: "landing",
    },
    "04": {
      title: "Google Ads Account",
      lines: ["Campaign", "Search term", "CVR"],
      type: "chart",
    },
    "05": {
      title: "关键词策略表",
      lines: ["关键词", "搜索意图", "KD", "优先级"],
      type: "table",
    },
    "06": {
      title: "Landing Page 优化清单",
      lines: ["表单字段", "CTA", "A/B"],
      type: "ab",
    },
    "07": {
      title: "FAQ 内容库",
      lines: ["Q1", "Q2", "Q3"],
      type: "faq",
    },
    "08": {
      title: "月度增长复盘报告",
      lines: ["询盘", "转化率", "CPL"],
      type: "report",
    },
  }[service.no];

  return (
    <div className={`${styles.previewMaterial} ${previewClass}`} aria-hidden="true">
      <div className={styles.previewTitle}>{content.title}</div>
      <div className={styles.previewBody}>
        {content.lines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </div>
      <b data-type={content.type} />
    </div>
  );
}

export default function PolarisExperience() {
  const [formStatus, setFormStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleInquirySubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setIsSubmitting(true);
    setFormStatus({ type: "pending", message: "正在提交网站信息..." });

    try {
      const result = await submitInquiry(form, "polaris_b2b_diagnosis");
      setFormStatus({ type: "success", message: result.message || "提交成功，我们会尽快与您联系。" });
      form.reset();
    } catch (error) {
      setFormStatus({ type: "error", message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
    <SiteHeader />
    <main className={`${styles.page} system-page`}>
      <section id="top" className={`${styles.section} ${styles.hero}`}>
        <div className={styles.heroMedia} aria-hidden="true" />
        <div className={styles.heroCopy}>
          <p>B2B 独立站海外询盘增长系统</p>
          <h1>Polaris Growth System</h1>
          <span>让外贸网站从展示窗口，升级为持续获取海外高质量询盘的增长系统。</span>
          <div className={styles.actions}>
            <a className={styles.primary} href="#diagnosis">获取 B2B 独立站获客诊断</a>
            <a className={styles.secondary} href="#systems">查看系统架构</a>
          </div>
        </div>
      </section>

      <section id="pain" className={`${styles.section} ${styles.pain}`}>
        <div className={styles.sectionCopy}>
          <p className={styles.kicker}>当前困境</p>
          <h2>外贸独立站不是没有机会，而是缺少系统获客能力</h2>
          <span>很多 B2B 企业已经做了外贸网站，也尝试过谷歌推广，但询盘仍然不稳定。问题通常不在某一个渠道，而是网站承接、关键词策略、广告结构、信任内容和转化路径没有形成闭环。</span>
        </div>
        <div className={styles.diagnosticBoard}>
          {painItems.map(({ Icon, ...item }, index) => (
            <article key={item.title} className={`${styles.painCard} ${styles[`pain${index + 1}`]}`}>
              <div>
                <b>{item.no}</b>
                <Icon {...iconProps} />
              </div>
              <strong>{item.title}</strong>
              <p>{item.copy}</p>
              <em>{item.tag}</em>
            </article>
          ))}
          <a href="#diagnosis" className={styles.inlineLink}>不确定问题出在哪里？先做一次诊断</a>
        </div>
      </section>

      <section id="systems" className={`${styles.section} ${styles.systems}`}>
        <div className={styles.centered}>
          <span>增长系统</span>
          <h2>Polaris 用三套系统，让外贸网站持续获得高质量询盘</h2>
          <p>把流量获取、页面转化和品牌信任放在同一套增长系统里，让每一个渠道都围绕高质量询盘工作。</p>
        </div>
        <div className={styles.systemConsole}>
          <div className={styles.consoleChrome} aria-hidden="true">
            <b>LEADTOP POLARIS GROWTH SYSTEM</b>
            <span>CALIBRATED FOR B2B GROWTH</span>
          </div>
          <div className={styles.systemTrack}>
            {systems.map(({ Icon, ...system }) => (
              <article key={system.title} className={styles.systemCard}>
                <div className={styles.systemCardHead}>
                  <small>{system.no}</small>
                  <Icon {...iconProps} />
                </div>
                <h3>{system.title}<br />{system.cn}</h3>
                <p className={styles.systemSummary}>{system.summary}</p>
                <div className={styles.systemBody}>
                  <ul>
                    {system.items.map(({ label, Icon: ItemIcon }) => (
                      <li key={label}>
                        <ItemIcon size={22} weight="regular" aria-hidden />
                        {label}
                      </li>
                    ))}
                  </ul>
                  <MiniVisual type={system.visual} items={system.searches} />
                </div>
              </article>
            ))}
            <aside className={styles.outputCard}>
              <span className={styles.compass} aria-hidden="true" />
              <strong>High Quality<br />Inquiry</strong>
              <p>Leads · CPL · CVR · Pipeline</p>
            </aside>
          </div>
          <div className={styles.systemFooter}>
            <a href="#services">查看完整服务内容</a>
            <span>Traffic</span>
            <span>Conversion</span>
            <span>Trust</span>
            <strong>Inquiry</strong>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.difference}`}>
        <div className={styles.differenceCopy}>
          <p className={styles.kicker}>系统优势</p>
          <h2>Polaris 和传统外贸推广服务有什么不同？</h2>
          <span>Leadtop 不把 B2B 独立站当成一个“网站项目”，而是当成海外获客系统来搭建。页面、内容、广告和数据都围绕同一个目标：让真正有采购意向的客户更容易找到你、相信你、联系你。</span>
        </div>
        <SystemAdvantageExplorer advantages={systemAdvantages} />
      </section>

      <section id="services" className={`${styles.section} ${styles.services}`}>
        <div className={styles.serviceCopy}>
          <p className={styles.kicker}>服务内容</p>
          <h2>从外贸网站建设到询盘增长，Leadtop 负责完整落地</h2>
          <span>页面、内容、广告和数据不是分开的工作流。Polaris 把每个动作都放回同一个增长目标：让真正有采购意向的客户更容易找到你、相信你、联系你。</span>
          <div className={styles.serviceActions}>
            <a className={styles.primary} href="#diagnosis">获取 B2B Growth 方案</a>
            <a className={styles.textLink} href="#proof">查看诊断维度</a>
          </div>
        </div>
        <div className={styles.serviceBoard}>
          <div className={styles.stageRail}>
            {serviceStages.map(({ Icon, ...stage }) => (
              <div key={stage.label}>
                <span><Icon size={34} weight="regular" aria-hidden /></span>
                <strong>{stage.label}</strong>
                <small>{stage.sub}</small>
              </div>
            ))}
          </div>
          <div className={styles.serviceRows}>
            {services.map(({ Icon, ...service }) => (
              <article key={service.title}>
                <b>{service.no}</b>
                <Icon size={34} weight="regular" aria-hidden />
                <div className={styles.serviceText}>
                  <strong>{service.title}</strong>
                  <p>{service.copy}</p>
                </div>
                <em>{service.tag}</em>
                <PreviewMaterial service={service} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className={`${styles.section} ${styles.process}`}>
        <div className={styles.processCopy}>
          <p className={styles.kicker}>交付路径</p>
          <h2>90-180 天，搭建可持续的海外获客基础</h2>
          <span>先把网站和数据基建打牢，再用广告验证市场，随后沉淀 SEO/GEO 内容资产和长期询盘来源。Polaris 会把短期反馈和长期资产放在同一张增长路线图里。</span>
        </div>
        <div className={styles.routeMap}>
          <div className={styles.mapTexture} aria-hidden="true" />
          <div className={styles.routeCompass} aria-hidden="true">
            <span>NORTH STAR</span>
          </div>
          <svg className={styles.routePath} viewBox="0 0 1280 310" aria-hidden="true">
            <defs>
              <marker id="route-arrow" markerWidth="18" markerHeight="18" refX="14" refY="9" orient="auto">
                <path d="M2 2 L14 9 L2 16" />
              </marker>
            </defs>
            <path d="M0 225 C105 175 150 270 260 226 S420 172 520 225 S682 274 802 222 S1005 178 1124 224 L1210 224" markerEnd="url(#route-arrow)" />
          </svg>
          {processSteps.map(({ Icon, ...step }, index) => (
            <article key={step.no} className={`${styles.processCard} ${styles[`process${index + 1}`]}`}>
              <div>
                <b>{step.no}</b>
                <Icon size={30} weight="regular" aria-hidden />
              </div>
              <strong>{step.time}</strong>
              <h3>{step.title}</h3>
              <ul>{step.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
          <a href="#diagnosis" className={styles.routeCta}>查看诊断流程</a>
          <aside className={styles.cadencePanel}>
            <strong><Clock size={30} weight="regular" aria-hidden />Review cadence</strong>
            <div>
              <i aria-hidden><Calendar size={28} weight="regular" /></i>
              <b>周报</b>
              <span>关键词覆盖追踪<br />与执行进展同步</span>
              <Check size={24} weight="bold" aria-hidden />
            </div>
            <div>
              <i aria-hidden><ChartBar size={28} weight="regular" /></i>
              <b>月报</b>
              <span>效果复盘与优化建议<br />下一步计划</span>
              <Check size={24} weight="bold" aria-hidden />
            </div>
            <div>
              <i aria-hidden><ChartPieSlice size={28} weight="regular" /></i>
              <b>季度复盘</b>
              <span>增长目标回顾<br />策略与资源调整</span>
              <Check size={24} weight="bold" aria-hidden />
            </div>
            <p>透明协作 · 数据驱动<br />让每一步都可衡量、可优化、可沉淀</p>
          </aside>
          <div className={styles.processFooter} aria-hidden="true">
            <strong>LEADTOP</strong>
            <span>POLARIS GROWTH SYSTEM</span>
            <em>图例</em>
            <i>关键里程碑</i>
            <i>持续优化路径</i>
          </div>
        </div>
      </section>

      <section id="proof" className={`${styles.section} ${styles.proof}`}>
        <div className={styles.proofCopy}>
          <p className={styles.kicker}>案例与信任</p>
          <h2>用真实页面、真实数据和真实复盘推动增长</h2>
          <span>B2B 增长不能只看流量截图。Polaris 更关注每一次优化是否带来更清晰的关键词、更有效的页面、更可信的内容和更值得销售跟进的询盘。</span>
        </div>
        <div className={styles.dossier}>
          <div className={styles.dossierLayers} aria-hidden="true"><i /><i /><i /></div>
          <div className={styles.clip} aria-hidden="true" />
          <div className={styles.dossierTab} aria-hidden="true">Polaris Case Dossier</div>
          <div className={styles.caseTable}>
            <strong>Recommended Case Format</strong>
            <div className={styles.caseGrid}>
              {["行业", "原始问题", "Leadtop 动作", "结果指标"].map((item) => <b key={item}>{item}</b>)}
              {caseRows.map(({ industry, Icon, problem, action, results }) => (
                <div className={styles.caseRow} key={industry}>
                  <span className={styles.industryCell}><Icon size={29} weight="regular" aria-hidden /><strong>{industry}</strong></span>
                  <span>{problem}</span>
                  <span>{action}</span>
                  <span className={styles.resultCell}>{results.map((result) => <i key={result}><Check size={17} weight="bold" aria-hidden />{result}</i>)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.proofCards}>
            {proofCards.map((card) => (
              <article key={card.title}>
                <header><b>{card.no}</b><h3>{card.title}</h3></header>
                <em>{card.tag}</em>
                <ul>{card.points.map((item) => <li key={item}><Check size={16} weight="bold" aria-hidden />{item}</li>)}</ul>
                <ProofVisual type={card.visual} />
              </article>
            ))}
          </div>
          <div className={styles.confidentialStamp} aria-hidden="true">CASE<br />CONFIDENTIAL</div>
          <p className={styles.dossierNote}>Real pages. Real data. Real review. Real growth.</p>
        </div>
      </section>

      <section id="faq" className={`${styles.section} ${styles.faq}`}>
        <div className={styles.faqCopy}>
          <p className={styles.kicker}>FAQ</p>
          <h2>关于 B2B 独立站获客，你可能还想了解</h2>
          <div className={styles.faqList}>
            {faqs.map(([question, answer], index) => (
              <details key={question} open={index === 0}>
                <summary><span>{index + 1}</span>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="diagnosis" className={`${styles.section} ${styles.diagnosis}`}>
        <form className={styles.form} onSubmit={handleInquirySubmit}>
          <span className={styles.formMark} aria-hidden="true" />
          <h2>获取 B2B 独立站获客诊断</h2>
          <p>留下官网链接和当前问题，我们将从网站承接、广告结构、SEO/GEO、信任内容和询盘路径五个维度给出初步判断。</p>
          <input aria-hidden="true" autoComplete="off" hidden name="website_confirm" tabIndex={-1} type="text" />
          <label><span>姓名</span><input autoComplete="name" name="name" type="text" placeholder="请输入姓名" required /></label>
          <label><span>手机 / 微信</span><input autoComplete="tel" name="contact" type="text" placeholder="便于顾问联系你" required /></label>
          <label><span>官网链接</span><input autoComplete="url" name="website" type="url" placeholder="https://www.yourdomain.com" required /></label>
          <label><span>当前问题</span><textarea name="problem" rows="4" placeholder="尽量详细描述，帮助我们更准确诊断" /></label>
          <button disabled={isSubmitting} type="submit">{isSubmitting ? "提交中..." : "提交网站，获取获客诊断"}</button>
          {formStatus && <output className={`${styles.formStatus} ${formStatus.type === "error" ? styles.formStatusError : ""}`} aria-live="polite">{formStatus.message}</output>}
          <small>提交后，Leadtop 将先判断关键问题，再与你沟通适合的增长优先级。</small>
          <aside>
            {diagnosisItems.map(({ label, Icon }) => (
              <b key={label}><Icon size={23} weight="regular" aria-hidden />{label}</b>
            ))}
          </aside>
        </form>
      </section>
    </main>
    <SiteFooter />
    </>
  );
}
