"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChartLineUp,
  CaretDown,
  Check,
  Code,
  Database,
  GlobeHemisphereWest,
  List,
  MagnifyingGlass,
  Megaphone,
  PenNib,
  ShieldCheck,
  Target,
  TrendUp,
  UserFocus,
  X,
} from "@phosphor-icons/react";

import styles from "./LeadtopHomepage.module.css";
import { SiteFooter, SiteHeader } from "./SiteChrome";
import { submitInquiry } from "../lib/inquiry-client";

const assetPrefix = process.env.NEXT_PUBLIC_ASSET_PREFIX || "";
const withAssetPrefix = (path) => `${assetPrefix}${path}`;

const partners = [
  { name: "Google Ads", image: "/leadtop/brands/google-ads.svg", width: 180, height: 56 },
  { name: "Microsoft Bing", image: "/leadtop/brands/microsoft-bing.svg", width: 512, height: 80 },
  { name: "Facebook", image: "/leadtop/brands/facebook.svg", width: 180, height: 56 },
  { name: "Instagram", image: "/leadtop/brands/instagram.svg", width: 180, height: 56 },
  { name: "Pinterest", image: "/leadtop/brands/pinterest.svg", width: 180, height: 56 },
  { name: "Yandex", image: "/leadtop/brands/yandex-official.png", width: 1000, height: 524 },
  { name: "Reddit", image: "/leadtop/brands/reddit.svg", width: 180, height: 56 },
  { name: "Criteo", image: "/leadtop/brands/criteo.svg", width: 582, height: 159 },
  { name: "TikTok", image: "/leadtop/brands/tiktok.svg", width: 96, height: 96 },
  { name: "LinkedIn", image: "/leadtop/brands/linkedin.png", width: 2212, height: 540 },
  { name: "Shopify", href: "https://www.shopify.com/partners/directory/partner/leadtopmedia4", image: "/leadtop/brands/shopify.svg", width: 180, height: 56 },
  { name: "WordPress", image: "/leadtop/brands/wordpress.png", width: 1000, height: 1000 },
];

const systems = [
  {
    name: "Polaris Growth System",
    audience: "B2B 外贸与制造业",
    title: "让真正有采购意向的海外客户找到你、相信你、联系你",
    copy: "围绕高质量询盘，把转化型网站、Google Ads、SEO / GEO、专业内容与销售反馈组织成持续获客系统。",
    image: "/polaris/assets/hero-command-center.png",
    href: "/polaris",
    cta: "查看 Polaris",
    outcomes: ["高质量询盘", "MQL", "Pipeline", "CPL / CVR"],
  },
  {
    name: "Helios Growth Engine",
    audience: "B2C / DTC 品牌",
    title: "让流量、转化与复购共同推动长期收入",
    copy: "围绕可盈利增长，协同广告、素材、站内 CRO、SEO / GEO 与用户运营，改善整站经营效率。",
    image: "/helios/assets/hero.png",
    href: "/helios",
    cta: "查看 Helios",
    outcomes: ["GMV / MER", "CAC", "CVR", "AOV / LTV"],
  },
];

const constraints = [
  ["流量质量不稳定", "渠道带来点击，却没有持续产生匹配的询盘或订单。"],
  ["页面承接不足", "价值表达、信任内容与行动路径没有回应真实决策顾虑。"],
  ["品牌信任薄弱", "案例、认证、内容和社会证明没有进入关键决策节点。"],
  ["数据无法指导决策", "来源、成本、页面和业务结果没有形成统一判断口径。"],
];

const capabilities = [
  {
    title: "独立站与页面基础",
    copy: "让网站和关键页面承担清晰的获客、转化与信任任务。",
    detail: "围绕客户决策路径规划信息架构、关键页面、Landing Page、技术基础与移动端体验。",
    image: "/polaris/services.png",
    Icon: Code,
  },
  {
    title: "付费媒体与获客",
    copy: "用可解释的渠道结构持续验证关键词、受众与市场机会。",
    detail: "连接 Google Ads、再营销、素材、落地页和转化事件，以业务反馈优化预算优先级。",
    image: "/helios/sections/traffic.png",
    Icon: Megaphone,
  },
  {
    title: "SEO / GEO 与内容增长",
    copy: "将专业知识转化为持续的搜索可见性与品牌权威资产。",
    detail: "建设主题集群、产品与场景内容、FAQ、案例、结构化数据和 AI 搜索可见性。",
    image: "/polaris/proof.png",
    Icon: MagnifyingGlass,
  },
  {
    title: "CRO 转化率优化",
    copy: "在相同流量基础上，提高有效询盘、加购与支付效率。",
    detail: "基于行为数据持续优化价值主张、信任模块、CTA、表单、PDP、购物车与 Checkout。",
    image: "/helios/sections/conversion.png",
    Icon: TrendUp,
  },
  {
    title: "创意、内容与品牌信任",
    copy: "让品牌表达进入客户决策过程，而不只停留在曝光层面。",
    detail: "组织广告素材、品牌故事、案例、白皮书、UGC、KOL 与社交内容，建立专业可信度。",
    image: "/helios/sections/campaign.png",
    Icon: PenNib,
  },
  {
    title: "用户留存与生命周期经营",
    copy: "将一次转化延伸为可持续的用户关系与长期收入。",
    detail: "规划 EDM / SMS、用户分层、会员机制、复购活动、Bundle 与生命周期沟通。",
    image: "/helios/sections/revenue.png",
    Icon: UserFocus,
  },
  {
    title: "数据追踪与增长决策",
    copy: "让渠道、页面和内容投入能够被解释、比较并持续优化。",
    detail: "配置关键事件与业务反馈机制，建立覆盖来源、成本、页面、询盘、订单和用户价值的决策视图。",
    image: "/helios/sections/proof.png",
    Icon: Database,
  },
];

const methodSteps = [
  ["诊断与定义", "明确业务目标与首要增长约束", "问题清单 · 指标基线 · 优先级"],
  ["建设与校准", "完善页面、内容、信任与数据基础", "关键页面 · 内容素材 · 数据配置"],
  ["市场验证", "以真实流量与业务反馈验证假设", "MQL / 订单 · CAC / CPL · 页面表现"],
  ["优化与放大", "将有效动作沉淀为可复用资产", "预算优先级 · 路线图 · 下一轮行动"],
];

const deliveryPhases = [
  ["PHASE 01", "业务诊断与路线图", "建立共同目标、数据基线和实施优先级。", "/helios/assets/diagnosis.png"],
  ["PHASE 02", "基础建设与首轮实施", "完成影响首轮验证的关键基础与执行动作。", "/polaris/process.png"],
  ["PHASE 03", "迭代优化与规模验证", "根据真实反馈改善效率并判断可放大的组合。", "/helios/sections/proof.png"],
  ["CONTINUOUS", "持续复盘与资产沉淀", "将阶段经验转化为长期增长能力。", "/helios/assets/revenue.png"],
];

const teamRoles = [
  ["增长策略", Target],
  ["媒体运营", ChartLineUp],
  ["内容与创意", PenNib],
  ["设计与技术", Code],
  ["CRO 与用户运营", UserFocus],
  ["数据分析", Database],
];

const faqs = [
  ["为什么 B2B 与 DTC 需要两套不同的增长系统？", "B2B 关注匹配的销售线索与长决策周期信任，DTC 关注获客成本、转化、客单价、复购和利润质量，因此由 Polaris 与 Helios 分别承接。"],
  ["Google Ads、SEO / GEO 和网站改版应该从哪一项开始？", "实施顺序取决于现有基础与验证目标。Leadtop 会先判断主要约束，再确定渠道、页面与内容的先后顺序。"],
  ["Leadtop 如何判断项目是否真正取得进展？", "Polaris 关注询盘质量、MQL、CPL、页面 CVR、Pipeline 与自然流量；Helios 关注 MER、CAC、CVR、AOV、LTV 与复购。"],
  ["项目是否需要一次启用所有服务？", "不需要。Leadtop 会先识别当前最影响结果的约束，再按优先级配置渠道、页面、内容、CRO 与数据能力，分阶段验证后再决定是否扩大投入。"],
  ["增长诊断会提供哪些内容？", "我们会从流量、页面、信任、内容和数据五个维度识别主要约束、建议优先验证的环节，并判断适配的增长系统。"],
  ["案例中的 ROI、GMV 和销量数据应该如何理解？", "这些数据来自既有项目 PPT 的阶段复盘，反映特定项目在特定周期内的结果。不同项目的基础、预算、产品和市场条件不同，因此历史数据不代表所有项目表现，也不构成结果承诺。"],
];

function CtaArrow() {
  return <span className={styles.ctaIcon}><ArrowRight size={16} weight="bold" aria-hidden="true" /></span>;
}

export default function LeadtopHomepage() {
  const [activeCapability, setActiveCapability] = useState(6);
  const [formStatus, setFormStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const ActiveCapabilityIcon = capabilities[activeCapability].Icon;

  async function handleInquirySubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setIsSubmitting(true);
    setFormStatus({ type: "pending", message: "正在提交增长评估信息..." });

    try {
      const result = await submitInquiry(form, "growth_priority");
      setFormStatus({ type: "success", message: result.message || "提交成功，我们会尽快与您联系。" });
      form.reset();
    } catch (error) {
      setFormStatus({ type: "error", message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className={styles.page}>
      <a className={styles.skipLink} href="#main-content">跳到主要内容</a>
      <SiteHeader isHomepage />

      <div id="main-content" />
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroMedia} aria-hidden="true">
          <Image alt="" fill loading="eager" priority sizes="100vw" src={withAssetPrefix("/leadtop/hero/homepage-banner-independent-growth.png")} />
        </div>
        <div className={styles.heroCopy} data-reveal>
          <span className={styles.eyebrow}>Leadtop Digital Marketing</span>
          <h1 id="hero-title">让独立站持续带来<br /><em>询盘与收入</em></h1>
          <strong className={styles.heroStatement}>面向 B2B 与 DTC 的两套增长系统</strong>
          <p>把网站、广告、SEO / GEO、内容、CRO 与数据协同起来，<br className={styles.desktopBreak} />让每一笔投入更接近可衡量的业务结果。</p>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href="#diagnosis">预约增长咨询<CtaArrow /></a>
            <a className={styles.secondaryButton} href="#systems">了解服务方案<CtaArrow /></a>
          </div>
          <div className={styles.heroCapabilities} aria-label="核心增长能力">
            <span><Target size={22} weight="duotone" />B2B询盘</span>
            <span><ChartLineUp size={22} weight="duotone" />DTC营收</span>
            <span><GlobeHemisphereWest size={22} weight="duotone" />品牌出海</span>
            <span><Database size={22} weight="duotone" />数据驱动</span>
          </div>
        </div>
      </section>

      <section className={styles.trustStrip} aria-label="合作与技术生态">
        <p><strong>主流媒体与建站技术</strong><span>覆盖搜索、社媒、程序化广告与独立站建设</span></p>
        <div className={styles.partnerLogos}>{partners.map((partner) => <PartnerLogo key={partner.name} partner={partner} />)}</div>
      </section>

      <section className={styles.systems} id="systems" aria-labelledby="systems-title">
        <div className={styles.centerHeading} data-reveal><h2 id="systems-title">两类业务结果，两套增长系统</h2><p>先按业务结果选择路径，再配置渠道与执行能力。</p></div>
        <div className={styles.systemGrid}>
          {systems.map((system, index) => (
            <article className={styles.systemShell} key={system.name} data-reveal>
              <div className={styles.systemCard}>
                <div className={styles.systemCopy}>
                  <span className={styles.systemIndex}>0{index + 1}</span>
                  <p className={styles.systemAudience}>{system.audience}</p>
                  <strong className={styles.systemName}>{system.name}</strong>
                  <h3>{system.title}</h3><p>{system.copy}</p>
                  <div className={styles.outcomes}>{system.outcomes.map((item) => <span key={item}>{item}</span>)}</div>
                  <Link className={styles.systemLink} href={system.href}>{system.cta}<ArrowRight size={17} weight="bold" /></Link>
                </div>
                <div className={styles.systemImage}><Image alt={`${system.name} 增长场景`} fill sizes="(max-width: 760px) 100vw, 35vw" src={withAssetPrefix(system.image)} /></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.constraints} aria-labelledby="constraints-title">
        <div className={styles.constraintLead} data-reveal><h2 id="constraints-title">增长卡住，<br />通常不是缺一个渠道</h2><p>网站、流量、内容、转化与数据没有围绕同一个业务结果协同，单点优化只会把问题推向下一环。</p><div className={styles.calibrationLabel}><Target size={20} weight="light" />诊断问题，找到增长真正的卡点</div></div>
        <div className={styles.constraintTrack} aria-hidden="true"><i /><i /><i /><i /></div>
        <div className={styles.constraintList}>{constraints.map(([title, copy], index) => <article key={title} data-reveal><span>0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div><div className={styles.constraintPreview}>{index === 0 && <ChartLineUp size={38} weight="light" />}{index === 1 && <Code size={38} weight="light" />}{index === 2 && <ShieldCheck size={38} weight="light" />}{index === 3 && <Database size={38} weight="light" />}</div></article>)}</div>
      </section>

      <section className={styles.capabilities} id="capabilities" aria-labelledby="capabilities-title">
        <div className={styles.capabilityHeading} data-reveal><span className={styles.eyebrow}>CAPABILITY CONFIGURATION</span><h2 id="capabilities-title">围绕增长约束，配置所需执行能力</h2><p>每个项目不必启用全部能力。Leadtop 根据阶段目标、数据基础与首要约束确定组合和顺序。</p></div>
        <div className={styles.capabilityStack} data-reveal>
          {capabilities.map(({ Icon, ...item }, index) => (
            <article className={styles.capabilityCard} key={item.title} style={{ "--card-index": index }}>
              <div className={styles.capabilityCardCopy}>
                <span>0{index + 1}</span>
                <Icon size={28} weight="light" />
                <h3>{item.title}</h3>
                <strong>{item.copy}</strong>
                <p>{item.detail}</p>
                <a href="#diagnosis">配置这项能力<ArrowRight size={16} weight="bold" /></a>
              </div>
              <div className={styles.capabilityCardMedia}><Image alt={`${item.title}示意`} fill sizes="(max-width: 760px) 100vw, 52vw" src={withAssetPrefix(item.image)} /></div>
            </article>
          ))}
        </div>
        <a className={styles.textLink} href="#diagnosis">评估当前需要优先配置的能力<ArrowRight size={17} weight="bold" /></a>
      </section>

      <section className={styles.proof} id="proof" aria-labelledby="proof-title">
        <div className={styles.proofHeading} data-reveal><h2 id="proof-title">以项目过程与业务结果<br />验证增长方法</h2><p>左侧展示 Polaris 的项目推进结构；右侧展示既有项目 PPT 中可公开使用的阶段成果数据。</p></div>
        <span className={styles.proofNumber} aria-hidden="true">05</span>
        <div className={styles.caseGrid}>
          <article className={styles.casePrimary} data-reveal><div className={styles.caseMedia}><Image alt="Polaris B2B 增长项目推进场景" fill sizes="(max-width: 760px) 100vw, 52vw" src={withAssetPrefix("/polaris/assets/hero-command-center.png")} /></div><div className={styles.caseCopy}><div className={styles.caseMeta}><span>POLARIS / B2B INQUIRY</span></div><h3>从搜索点击到值得销售跟进的海外询盘</h3><EvidenceRows rows={[["业务起点", "已有官网与搜索投放，但询盘质量缺少稳定判断"], ["核心约束", "搜索意图、页面承接与采购信任没有形成闭环"], ["推进结构", "诊断关键词与页面，再用真实询盘反馈持续校准"]]} /><CaseMetrics metrics={[["有效询盘", "+146%"], ["MQL 占比", "38.6%"], ["CPL", "-24.7%"], ["Pipeline", "$1.26M"]]} /><Link href="/polaris">查看 Polaris 项目方法<ArrowRight size={16} /></Link></div></article>
          <article className={styles.caseSecondary} data-reveal><div className={styles.caseCopy}><div className={styles.caseMeta}><span>HELIOS / DTC REVENUE</span></div><h3>从广告效率修复到 GMV 与单品增长</h3><EvidenceRows rows={[["项目阶段", "既有独立站项目的阶段复盘"], ["增长目标", "改善广告效率，并验证 GMV 与重点商品的放大空间"], ["协同方向", "围绕投放、页面承接与商品策略持续迭代"]]} /><CaseMetrics metrics={[["ROI", "1.5 → 2.5+"], ["单月 GMV", "+300%"], ["连续增长", "3 个月"], ["单品销量", "+260%"]]} /><Link href="/helios">查看 Helios 项目方法<ArrowRight size={16} /></Link></div><div className={styles.caseMedia}><Image alt="Helios DTC 项目阶段增长场景" fill sizes="(max-width: 760px) 100vw, 35vw" src={withAssetPrefix("/helios/assets/revenue.png")} /></div></article>
        </div>
        <p className={styles.caseDisclaimer}>左侧询盘、MQL、CPL 与 Pipeline 为案例排版模拟数据；右侧 ROI、GMV 与单品销量来自特定项目阶段的历史复盘。不同项目结果会因基础、预算、产品和市场条件而异。</p>
      </section>

      <section className={styles.method} id="method" aria-labelledby="method-title">
        <div className={styles.methodHeading} data-reveal><h2 id="method-title">从增长约束出发，<br />以阶段治理保障持续交付</h2><p>每一项投入都有验证假设，每一轮复盘都形成下一步决策。</p></div>
        <div className={styles.methodLayout}>
          <div className={styles.methodSteps}>{methodSteps.map(([title, copy, output], index) => <article key={title} data-reveal><span>0{index + 1}</span><div><h3>{title}</h3><strong>{copy}</strong><p>{output}</p></div></article>)}</div>
          <div className={styles.delivery} data-reveal><div className={styles.deliveryLine} />{deliveryPhases.map(([label, title, copy, image]) => <article key={label}><span>{label}</span><h3>{title}</h3><p>{copy}</p><div><Image alt={`${title}交付阶段`} fill sizes="(max-width: 760px) 100vw, 18vw" src={withAssetPrefix(image)} /></div></article>)}</div>
        </div>
        <div className={styles.teamRail} data-reveal><strong>专业协作能力</strong>{teamRoles.map(([role, Icon]) => <span key={role}><Icon size={23} weight="light" />{role}</span>)}</div>
      </section>

      <section className={styles.faq} id="faq" aria-labelledby="faq-title">
        <div className={styles.faqIntro} data-reveal><h2 id="faq-title">合作前需要明确的关键问题</h2><p>说明 Leadtop 的服务边界、决策方式与合作前提。</p><blockquote>“先明确增长约束，再决定渠道、预算与执行顺序。”</blockquote></div>
        <div className={styles.faqList} data-reveal>{faqs.map(([question, answer], index) => <details key={question} open={index === 0}><summary><span>0{index + 1}</span><strong>{question}</strong><ArrowRight size={19} weight="light" /></summary><p>{answer}</p></details>)}</div>
      </section>

      <section className={styles.diagnosis} id="diagnosis" aria-labelledby="diagnosis-title">
        <div className={styles.diagnosisBackdrop} aria-hidden="true"><Image alt="" fill sizes="100vw" src={withAssetPrefix("/helios/assets/diagnosis.png")} /></div>
        <div className={styles.diagnosisCopy} data-reveal><span className={styles.eyebrow}>START WITH THE PRIMARY CONSTRAINT</span><h2 id="diagnosis-title">先识别主要增长约束，<br />再确定下一阶段投入</h2><p>Leadtop 将从流量、页面、信任、内容与数据五个维度进行初步判断。</p><div className={styles.diagnosisMap}><div>{["流量", "页面", "信任", "内容", "数据"].map((item) => <span key={item}><Check size={16} weight="bold" />{item}</span>)}</div><ArrowRight size={24} /><div>{["约束判断", "优先环节", "系统建议", "信息清单"].map((item) => <span key={item}>{item}</span>)}</div></div></div>
        <form className={styles.form} onSubmit={handleInquirySubmit} data-reveal>
          <h3>获取初步增长判断</h3>
          <div className={styles.formGrid}>
            <input aria-hidden="true" autoComplete="off" hidden name="website_confirm" tabIndex={-1} type="text" />
            <label><span>姓名 <em>*</em></span><input name="name" autoComplete="name" required /></label>
            <label><span>公司名称 <em>*</em></span><input name="company" autoComplete="organization" required /></label>
            <label><span>联系方式 <em>*</em></span><input name="contact" autoComplete="tel" required /></label>
            <label><span>业务类型 <em>*</em></span><select name="businessType" defaultValue="" required><option value="" disabled>请选择</option><option>B2B 外贸 / 制造业</option><option>B2C / DTC 品牌</option><option>品牌出海 / 海外市场拓展</option><option>其他</option></select></label>
            <label className={styles.formWide}><span>官网或店铺链接 <small>选填</small></span><input name="website" placeholder="https://" type="url" autoComplete="url" /></label>
            <label className={styles.formWide}><span>当前最需要解决的问题 <em>*</em></span><select name="problem" defaultValue="" required><option value="" disabled>请选择主要问题</option><option>B2B 询盘不足或质量不稳定</option><option>广告获客成本或 ROI 波动</option><option>独立站转化率偏低</option><option>SEO / GEO 尚未形成增长</option><option>复购与 LTV 不足</option><option>品牌内容与信任不足</option><option>数据追踪与归因不清</option></select></label>
          </div>
          <button disabled={isSubmitting} type="submit">{isSubmitting ? "提交中..." : "评估我的增长优先级"}<CtaArrow /></button>
          {formStatus && <output className={`${styles.formStatus} ${formStatus.type === "error" ? styles.formStatusError : ""}`} aria-live="polite">{formStatus.message}</output>}
          <p className={styles.formNote}><ShieldCheck size={16} weight="light" />提交信息不代表签约，相关信息仅用于本次业务判断与后续沟通。</p>
        </form>
      </section>

      <SiteFooter isHomepage />
    </main>
  );
}

function EvidenceRows({ rows }) {
  return <dl>{rows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>;
}

function CaseMetrics({ metrics }) {
  return <div className={styles.caseMetrics}>{metrics.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>;
}

function PartnerLogo({ partner }) {
  const logo = partner.remote
    ? <img alt={partner.name} src={partner.image} />
    : <Image alt={partner.name} height={partner.height} src={withAssetPrefix(partner.image)} width={partner.width} />;

  if (partner.href) {
    return <a aria-label={`查看 ${partner.name} 官方合作伙伴页面`} className={styles.partnerLogo} href={partner.href} rel="noopener noreferrer" target="_blank">{logo}</a>;
  }

  return <span className={styles.partnerLogo}>{logo}</span>;
}
