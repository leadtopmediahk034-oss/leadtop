"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import {
  ArrowRight,
  Buildings,
  ChartLineUp,
  CheckCircle,
  Code,
  Compass,
  Database,
  EnvelopeSimple,
  GlobeHemisphereWest,
  Handshake,
  MapPin,
  Megaphone,
  Phone,
  Sparkle,
  Strategy,
  Target,
  Timer,
  UsersThree,
} from "@phosphor-icons/react";

import ContactForm from "./ContactForm";
import styles from "./CompanyPages.module.css";
import { SiteFooter, SiteHeader } from "./SiteChrome";

const originMilestones = [
  {
    year: "2016",
    items: [
      "宁波领拓营销策划有限公司成立",
      "聚焦海外数字营销服务，服务华东地区外贸企业出海需求",
      "从 Google Ads、Bing Ads、Meta Ads 代投业务切入，帮助中国企业获取海外客户",
    ],
  },
  {
    year: "2018",
    items: [
      "成立领拓（香港）LEADTOPMEDIA DIGITAL MARKETING (HONGKONG) CO., LIMITED",
      "加强海外业务承接能力",
      "支撑跨境电商及品牌出海客户的全球化运营需求",
    ],
  },
];

const capabilityMilestones = [
  {
    year: "2020",
    items: ["启动技术能力建设", "搭建数字营销数据与运营基础设施", "提升客户增长过程中的数据追踪、分析和优化能力"],
  },
  {
    year: "2022",
    items: ["加强支付、数据、技术创新方向探索", "完善跨境业务基础设施能力"],
  },
];

const partnerMilestones = [
  {
    year: "2022",
    partner: "Google Ads",
    items: ["成为 Google Ads 官方合作伙伴（一代、官方一级代理）", "获得全球领先广告平台认证", "建立全员专业化广告投放体系"],
  },
  {
    year: "2023",
    partner: "Criteo Ads",
    items: ["成为 Criteo Ads 官方合作伙伴（一代、官方一级代理）", "深入程序化广告及效果营销领域", "服务品牌增长再营销需求"],
  },
  {
    year: "2024",
    partner: "Shopify Plus",
    items: ["成为 Shopify Plus 官方合作伙伴（一代、官方一级代理）", "从流量获取进一步延伸至独立站建设、网站优化、转化率提升与用户增长体系"],
  },
];

const capabilityMatrix = [
  ["流量获取", "Google / Meta / Criteo / Bing / Pinterest / Reddit"],
  ["网站增长", "Shopify Plus 独立站建设及优化"],
  ["数据增长", "GA4 / Tracking / CRO"],
  ["用户运营", "EDM / CRM / Retention"],
  ["品牌背书", "KOL / UGC / 社媒运营 / Creative"],
];

const growthSystems = [
  {
    key: "polaris",
    name: "Polaris Growth System",
    title: "面向 B2B 企业的全链路增长系统",
    copy: "帮助中国制造企业和工业品牌，从展会获客、传统外贸模式，升级到网站资产、SEO 增长、GEO 搜索、Google Ads 与社媒营销协同的持续获客体系。",
    details: ["B2B 独立站建设", "SEO 增长", "GEO（AI 搜索优化）", "Google Ads 获客", "LinkedIn / Facebook 营销", "询盘转化优化"],
    href: "/polaris",
  },
  {
    key: "helios",
    name: "Helios Growth Engine",
    title: "面向 B2C 品牌的独立站增长引擎",
    copy: "帮助消费品牌从产品销售升级到品牌资产与独立站 GMV 稳健增长体系。",
    details: ["Shopify / Plus 独立站", "CRO 转化优化", "Google Ads", "Meta Ads", "Bing Ads", "Criteo Ads", "Pinterest Ads", "Influencer Marketing", "SEO / GEO", "EDM 会员增长"],
    href: "/helios",
  },
];

const futurePillars = [
  {
    number: "01",
    title: "增长技术化",
    copy: "打造 AI Marketing、GEO 智能增长、数据分析平台与自动化营销系统。",
    Icon: Code,
  },
  {
    number: "02",
    title: "服务产品化",
    copy: "以 Polaris 构建制造企业全球获客基础设施，以 Helios 构建消费品牌全球 GMV 与 ROI 稳健增长引擎。",
    Icon: Buildings,
  },
  {
    number: "03",
    title: "生态平台化",
    copy: "连接全球广告平台、电商基础设施、AI 工具生态、内容创作者与海外市场资源。",
    Icon: GlobeHemisphereWest,
  },
];

const coreServices = [
  { title: "DTC / B2B 独立站全链路代运营与获客转化", Icon: Strategy },
  { title: "Google、Meta、Bing、Pinterest、Criteo、Yandex、LinkedIn 等媒体广告代投放", Icon: Megaphone },
  { title: "KOL 红人营销及视频素材采集", Icon: UsersThree },
  { title: "Shopify 高转化率建站服务（B2C）、WordPress 高转化率建站服务（B2B）", Icon: Code },
  { title: "SEO / GEO 搜索增长与内容优化", Icon: GlobeHemisphereWest },
  { title: "社交媒体代运营", Icon: Handshake },
  { title: "EDM 营销", Icon: EnvelopeSimple },
];

const cultureValues = [
  ["客户第一", "客户成功就是我们存在的理由，一切以客户目标为导向"],
  ["真实坦诚", "有问题讲在当下，有成果说到公开，让信任成为常态"],
  ["专业实践", "懂业务、能落地、有复盘，从细节中积累势能"],
  ["共享成长", "赚到一起分，成长一起拉，优秀不是个体，而是团队"],
  ["主动负责", "不甩锅、不拖延，对自己交付的每一个策略和预算负责"],
  ["创新复利", "拒绝重复劳动，持续建设系统、方法和能力壁垒"],
];

const managementPrinciples = [
  ["店小二", "不为‘看起来很忙’而努力，而是为客户效果、品牌影响力和真实增长负责"],
  ["真分钱", "鼓励结果导向，对达成客户目标的团队和个人进行利润分享、奖金激励"],
  ["制度驱动", "奖罚分明、规则公平，构建一个靠贡献和能力说话的组织"],
  ["长期陪跑", "重视客户生命周期价值，也重视员工的职业成长路径"],
];

const partnerMarqueeItems = ["Google Ads", "Criteo Ads", "Shopify Plus", "Meta Ads", "Bing Ads", "Pinterest", "LinkedIn", "GA4", "CRO", "GEO"];

function ScrubText({ children }) {
  return (
    <p data-scrub-text aria-label={children}>
      {Array.from(children).map((character, index) => (
        <span aria-hidden="true" key={`${character}-${index}`}>{character}</span>
      ))}
    </p>
  );
}

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
  const aboutRef = useRef(null);

  useLayoutEffect(() => {
    let context;
    let cancelled = false;

    async function initializeMotion() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (cancelled || !aboutRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.registerPlugin(ScrollTrigger);
      context = gsap.context(() => {
        gsap.utils.toArray("[data-motion-image]").forEach((frame) => {
          const image = frame.querySelector("img");
          if (!image) return;

          gsap.timeline({
            scrollTrigger: {
              trigger: frame,
              start: "top 92%",
              end: "bottom 8%",
              scrub: 0.8,
            },
          })
            .fromTo(image, { scale: 0.88, opacity: 0.42 }, { scale: 1, opacity: 1, duration: 0.48, ease: "none" })
            .to(image, { scale: 1.035, opacity: 0.28, duration: 0.52, ease: "none" });
        });

        gsap.utils.toArray("[data-scrub-text]").forEach((paragraph) => {
          gsap.fromTo(paragraph.children,
            { opacity: 0.12 },
            {
              opacity: 1,
              stagger: 0.035,
              ease: "none",
              scrollTrigger: {
                trigger: paragraph,
                start: "top 82%",
                end: "bottom 48%",
                scrub: 0.7,
              },
            });
        });

        gsap.fromTo(`.${styles.systemsYear}`,
          { yPercent: 32, opacity: 0, scale: 0.88 },
          {
            yPercent: 0,
            opacity: 1,
            scale: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: `.${styles.systemsSection}`,
              start: "top 72%",
              end: "top 32%",
              scrub: 0.7,
            },
          });

        gsap.utils.toArray(`.${styles.systemPanel}`).forEach((panel, index) => {
          gsap.fromTo(panel,
            { y: 90 + index * 28, rotate: index === 0 ? -1.4 : 1.4 },
            {
              y: 0,
              rotate: 0,
              ease: "none",
              scrollTrigger: {
                trigger: `.${styles.systemsGrid}`,
                start: "top 86%",
                end: "top 28%",
                scrub: 0.8,
              },
            });
        });
      }, aboutRef);

      ScrollTrigger.refresh();
    }

    initializeMotion();
    return () => {
      cancelled = true;
      context?.revert();
    };
  }, []);

  return (
    <PageShell>
      <main className={styles.aboutMain} id="main-content" ref={aboutRef}>
        <section className={styles.aboutHero} aria-labelledby="about-title">
          <Image
            alt="Leadtop 团队在宁波办公室围绕全球增长项目协作"
            className={styles.aboutHeroImage}
            fill
            priority
            sizes="100vw"
            src="/leadtop/about/concepts/about-hero-effect.png"
          />
          <div className={styles.aboutHeroShade} />
          <div className={styles.heroCopy}>
            <span className={styles.aboutKicker}>Leadtop · 2016—2030</span>
            <h1 id="about-title">从宁波出发，<br />陪中国品牌走向全球</h1>
            <p className={styles.heroStatement}>从海外营销服务商，到全球品牌增长伙伴</p>
            <p className={styles.heroIntro}>Leadtop 聚焦中国企业全球化增长，以数字营销、独立站、数据技术与用户运营能力，构建面向 B2B 与 B2C 的全链路增长体系。</p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href="#history">了解成长历程<span><ArrowRight aria-hidden="true" size={17} weight="bold" /></span></Link>
              <Link className={styles.heroTextLink} href="#systems">认识两套增长系统<ArrowRight aria-hidden="true" size={17} weight="bold" /></Link>
            </div>
          </div>
          <div className={styles.heroEraRail} aria-label="Leadtop 发展时间轴">
            {["2016", "2020", "2022", "2025", "2026", "2030"].map((year) => <span key={year}>{year}</span>)}
          </div>
        </section>

        <section className={`${styles.aboutSection} ${styles.businessSection}`} id="services" aria-labelledby="business-title">
          <div className={styles.businessIntro}>
            <span>全球增长 Global growth</span>
            <h2 id="business-title">企业主要业务</h2>
            <p>围绕独立站、媒体投放、内容与用户运营，提供全球增长所需的核心能力。</p>
          </div>
          <div className={styles.businessGrid}>
            <div className={styles.serviceIndex}>
              {coreServices.map(({ title, Icon }, index) => (
                <article key={title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <Icon aria-hidden="true" size={23} weight="duotone" />
                  <h3>{title}</h3>
                </article>
              ))}
            </div>
            <aside className={styles.licensePanel}>
              <div className={styles.licenseImage}><Image alt="Leadtop 的 Google Partner、Criteo Partner 与 Shopify Plus Partner 专业牌照" fill sizes="(max-width: 900px) 100vw, 44vw" src="/leadtop/about/concepts/about-licenses-effect.png" /></div>
            </aside>
          </div>
        </section>

        <section className={`${styles.aboutSection} ${styles.originSection}`} id="history" aria-labelledby="origin-title">
          <div className={styles.sectionIntro}>
            <span>起点 Origin</span>
            <p>2016—2019</p>
            <h2 id="origin-title">扎根宁波，服务中国企业全球化第一阶段</h2>
          </div>
          <div className={styles.originLayout}>
            <div className={styles.milestoneColumn}>
              {originMilestones.map((milestone) => (
                <article className={styles.milestone} key={milestone.year}>
                  <strong>{milestone.year}</strong>
                  <ul>{milestone.items.map((item) => <li key={item}>{item}</li>)}</ul>
                </article>
              ))}
              <div className={styles.stageCallout}>
                <Compass aria-hidden="true" size={30} weight="duotone" />
                <p><span>阶段定位</span>从传统外贸获客服务商，成长为中国企业数字化出海营销伙伴</p>
              </div>
              <div className={styles.capabilityTags} aria-label="起步阶段核心能力">
                {["海外广告投放", "搜索营销", "外贸企业获客", "海外市场推广"].map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>
            <div className={styles.originVisual} data-motion-image>
              <Image alt="Leadtop 起步阶段办公室与宁波港" fill sizes="(max-width: 900px) 100vw, 50vw" src="/leadtop/about/concepts/about-origin-effect.png" />
              <div><span>Ningbo, China</span><strong>我们的起点</strong></div>
            </div>
          </div>
        </section>

        <section className={`${styles.aboutSection} ${styles.capabilitySection}`} aria-labelledby="capability-title">
          <div className={styles.capabilityMedia} data-motion-image>
            <Image alt="Leadtop 团队分析数字营销数据与增长路径" fill sizes="(max-width: 900px) 100vw, 55vw" src="/leadtop/about/concepts/about-capability-effect.png" />
            <div className={styles.routeLine}><span>Ningbo</span><i /><i /><i /><strong>Global markets</strong></div>
          </div>
          <div className={styles.capabilityContent}>
            <span className={styles.darkIndex}>能力进化 Capability</span>
            <h2 id="capability-title">2020—2022<small>从流量服务，走向技术驱动的增长服务</small></h2>
            <div className={styles.darkMilestones}>
              {capabilityMilestones.map((milestone) => (
                <article key={milestone.year}>
                  <strong>{milestone.year}</strong>
                  <ul>{milestone.items.map((item) => <li key={item}>{item}</li>)}</ul>
                </article>
              ))}
            </div>
            <div className={styles.darkStage}><Database aria-hidden="true" size={27} weight="duotone" /><p><span>阶段定位</span>从单一营销服务，升级为具备数据、技术和运营能力的综合增长服务商</p></div>
            <div className={styles.darkCapabilities}>
              {["数据分析体系", "转化追踪体系", "跨境业务基础设施", "营销技术能力"].map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>
        </section>

        <section className={`${styles.aboutSection} ${styles.partnerSection}`} aria-labelledby="partner-title">
          <div className={styles.partnerHeader}>
            <div className={styles.sectionIntro}>
              <span>全球伙伴 Partner ecosystem</span>
              <p>2022—2024</p>
              <h2 id="partner-title">链接全球领先平台，建立专业增长能力</h2>
            </div>
            <strong aria-hidden="true">24</strong>
          </div>
          <div className={styles.partnerStoryLayout}>
            <div className={styles.partnerMilestones}>
              {partnerMilestones.map((milestone) => (
                <article key={milestone.year}>
                  <div><strong>{milestone.year}</strong><span>{milestone.partner}</span></div>
                  <ul>{milestone.items.map((item) => <li key={item}>{item}</li>)}</ul>
                </article>
              ))}
            </div>
            <div className={styles.partnerVisual}>
              <Image alt="Leadtop 的 Google、Criteo 与 Shopify Plus 合作伙伴认证展示" fill sizes="(max-width: 900px) 100vw, 46vw" src="/leadtop/about/concepts/about-partner-effect.png" />
            </div>
          </div>
          <div className={styles.partnerMarquee} aria-label="Leadtop 全球增长能力生态">
            <div>
              {[...partnerMarqueeItems, ...partnerMarqueeItems].map((item, index) => <span aria-hidden={index >= partnerMarqueeItems.length} key={`${item}-${index}`}>{item}</span>)}
            </div>
          </div>
          <div className={styles.partnerStage}><ChartLineUp aria-hidden="true" size={28} weight="duotone" />从广告代理商，升级为独立站全链路增长服务商</div>
          <div className={styles.capabilityMatrix}>
            {capabilityMatrix.map(([title, copy]) => <div key={title}><strong>{title}</strong><p>{copy}</p></div>)}
          </div>
        </section>

        <section className={`${styles.aboutSection} ${styles.systemsSection}`} id="systems" aria-labelledby="systems-title">
          <div className={styles.systemsHeader}>
            <div className={styles.systemsTitleLockup}>
              <strong className={styles.systemsYear}>2025</strong>
              <div><span>增长系统 Growth systems</span><h2 id="systems-title">打造面向不同商业模式的增长解决方案</h2></div>
            </div>
            <ScrubText>基于多年服务 B2B 和 B2C 客户经验，Leadtop 正式打造两大增长体系。</ScrubText>
          </div>
          <div className={styles.systemsGrid}>
            {growthSystems.map((system) => (
              <article className={`${styles.systemPanel} ${styles[system.key]}`} key={system.name}>
                <span>{system.key === "polaris" ? "B2B" : "B2C"}</span>
                <h3>{system.name}</h3>
                <strong>{system.title}</strong>
                <p>{system.copy}</p>
                <ul>{system.details.map((item) => <li key={item}><CheckCircle aria-hidden="true" size={17} weight="fill" />{item}</li>)}</ul>
                <Link href={system.href}>查看增长系统<ArrowRight aria-hidden="true" size={17} weight="bold" /></Link>
              </article>
            ))}
          </div>
          <div className={styles.systemsOutcome}><ChartLineUp aria-hidden="true" size={30} weight="duotone" /><p>从服务项目交付，升级为<strong>可复制的增长系统输出</strong></p></div>
        </section>

        <section className={`${styles.aboutSection} ${styles.roadmapSection}`} aria-labelledby="roadmap-title">
          <aside className={styles.validationPanel}>
            <span>规模验证 Validation</span>
            <h2>2026<small>从方法论验证，进入增长成果复制</small></h2>
            <h3>2026 H1</h3>
            <ul>
              <li>完成第一阶段增长验证</li>
              <li>70% 的合作客户达到或完成 2025 全年业绩目标</li>
              <li>验证 Polaris Growth System 与 Helios Growth Engine 的商业价值</li>
            </ul>
            <h3>阶段成果</h3>
            <div className={styles.validationChecks}>
              {["增长模型得到验证", "服务体系标准化", "行业解决方案形成", "客户长期增长合作模式建立"].map((item) => <p key={item}><CheckCircle aria-hidden="true" size={20} weight="fill" />{item}</p>)}
            </div>
          </aside>
          <div className={styles.futurePanel}>
            <span>未来规划 · 2026—2030</span>
            <h2 id="roadmap-title">成为中国品牌全球增长领域领先服务平台</h2>
            <div className={styles.futureRoute}><i /><i /><i /><i /></div>
            <div className={styles.futurePillars}>
              {futurePillars.map(({ number, title, copy, Icon }) => (
                <article key={number}>
                  <div><Icon aria-hidden="true" size={27} weight="duotone" /><span>{number}</span></div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
            <div className={styles.futureGoal}><Target aria-hidden="true" size={28} weight="duotone" />成为帮助中国企业实现全球增长的长期战略伙伴。</div>
          </div>
        </section>

        <section className={`${styles.aboutSection} ${styles.cultureSection}`} id="culture" aria-labelledby="culture-title">
          <div className={styles.cultureVisual}>
            <Image alt="Leadtop 团队协作与企业文化" fill sizes="(max-width: 900px) 100vw, 42vw" src="/leadtop/about/team-collaboration.jpg" />
            <span>企业文化 Culture</span>
          </div>
          <div className={styles.cultureContent}>
            <h2 id="culture-title">Leadtop 文化</h2>
            <div className={styles.cultureLead}>
              <article><Compass aria-hidden="true" size={27} weight="duotone" /><div><span>愿景 Vision</span><p>让世界看见中国品牌的力量，成为最值得信赖的全球数字营销服务商</p></div></article>
              <article><Target aria-hidden="true" size={27} weight="duotone" /><div><span>使命 Mission</span><p>以专业驱动增长，以真诚服务客户，让每一位员工和客户都能“有得赚、赚得值”</p></div></article>
            </div>
            <div className={styles.cultureColumns}>
              <div>
                <h3>核心价值观 <small>Core values</small></h3>
                {cultureValues.map(([title, copy]) => <article key={title}><strong>{title}</strong><p>{copy}</p></article>)}
              </div>
              <div>
                <h3>经营理念 <small>Management philosophy</small></h3>
                {managementPrinciples.map(([title, copy]) => <article key={title}><strong>{title}</strong><p>{copy}</p></article>)}
              </div>
            </div>
            <div className={styles.cultureCta}>
              <p>和一群长期主义者，<br />一起做值得复利的事</p>
              <div><Link href="/contactus">与 Leadtop 一起增长<ArrowRight aria-hidden="true" size={18} weight="bold" /></Link><Link href="/contactus">加入我们<ArrowRight aria-hidden="true" size={16} /></Link></div>
            </div>
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
