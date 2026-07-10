import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowsClockwise,
  Browser,
  Certificate,
  ChartLineUp,
  CursorClick,
  Factory,
  MagnifyingGlass,
  Medal,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr";

import styles from "./LeadtopHomepage.module.css";

const assetPrefix = process.env.NEXT_PUBLIC_ASSET_PREFIX || "";
const withAssetPrefix = (path) => `${assetPrefix}${path}`;

const partners = [
  { name: "Google Ads", image: "/leadtop/brands/google-ads.svg", width: 226, height: 78 },
  { name: "Criteo", image: "/leadtop/brands/criteo.svg", width: 228, height: 62 },
  { name: "Shopify", image: "/leadtop/brands/shopify.svg", width: 220, height: 70 },
  { name: "Amazon Ads", image: "/leadtop/brands/amazon-ads.png", width: 238, height: 60 },
];

const certificates = [
  {
    title: "Google Ads 专业认证成绩",
    copy: "全国代理商专业认证考试总分排名第一",
    image: "/leadtop/credentials/google-ranking.png",
    className: styles.ranking,
  },
  {
    title: "广告学霸团队奖",
    copy: "Google Ads Academy 创意特训营",
    image: "/leadtop/credentials/google-award.png",
    className: styles.award,
  },
  {
    title: "Digital Guru / Expert",
    copy: "Google Ads 专业能力认证",
    image: "/leadtop/credentials/google-expert.png",
    className: styles.expert,
  },
];

const solutions = [
  {
    name: "Polaris Growth System",
    audience: "B2B 外贸与制造业",
    title: "让真正有采购意向的海外客户找到你、相信你、联系你",
    copy: "用转化型网站、Google Ads、SEO/GEO、Landing Page 与信任内容，持续获得值得销售跟进的海外询盘。",
    image: "/polaris/assets/hero-command-center.png",
    href: "/polaris",
    cta: "查看 B2B 获客方案",
    outcomes: ["高质量询盘", "线索质量", "CPL / CVR", "自然流量"],
    className: styles.polarisSolution,
  },
  {
    name: "Helios Growth Engine",
    audience: "B2C / DTC 品牌",
    title: "让流量、转化与复购共同推动长期收入",
    copy: "用多渠道广告、站内 CRO、素材测试、SEO/GEO 与用户运营，提升整站效率并降低对单次爆量的依赖。",
    image: "/helios/assets/hero.png",
    href: "/helios",
    cta: "查看 DTC 增长方案",
    outcomes: ["ROI / MER", "CVR", "AOV / LTV", "复购"],
    className: styles.heliosSolution,
  },
];

const growthBreaks = [
  {
    title: "有访问，没有询盘或订单",
    response: "重构页面卖点、CTA、表单或结账路径，减少高意向访客流失。",
    Icon: Browser,
  },
  {
    title: "广告有点击，成本和质量不稳定",
    response: "联动搜索词、受众、素材、落地页、转化追踪与真实业务反馈。",
    Icon: CursorClick,
  },
  {
    title: "SEO、内容与 AI 搜索没有积累",
    response: "围绕产品、场景、问题与比较内容建立可持续的结构化信息资产。",
    Icon: MagnifyingGlass,
  },
  {
    title: "陌生客户对品牌缺乏信任",
    response: "让案例、工厂实力、资质、评价和 FAQ 进入客户决策路径。",
    Icon: ShieldCheck,
  },
  {
    title: "供应商分段执行，增长无法复盘",
    response: "统一目标、指标和迭代节奏，把页面、内容、投放与数据放回同一条路线。",
    Icon: ArrowsClockwise,
  },
];

function BrandMark() {
  return (
    <span className={styles.brandMark} aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

export default function LeadtopHomepage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="Leadtop 首页">
          <BrandMark />
          <span>
            <strong>Leadtop</strong>
            <small>领拓出海增长</small>
          </span>
        </Link>

        <nav className={styles.nav} aria-label="主导航">
          <Link href="/polaris">Polaris</Link>
          <Link href="/helios">Helios</Link>
          <a href="#solutions">增长能力</a>
          <a href="#problems">案例与洞察</a>
          <a href="#credentials">关于 Leadtop</a>
        </nav>

        <a className={styles.headerCta} href="#credentials">
          获取增长诊断
          <ArrowRight size={17} weight="bold" aria-hidden="true" />
        </a>

      </header>

      <section className={styles.credentials} id="credentials">
        <div className={styles.sectionIntro}>
          <div className={styles.iconPlate} aria-hidden="true">
            <Certificate size={30} weight="regular" />
          </div>
          <h1>连接关键增长生态，也把执行落到每个页面和数据动作</h1>
          <p>
            平台合作带来方法、产品与资源支持。Leadtop 再把媒体、内容、站点和数据组织成适合品牌当前阶段的增长路径。
          </p>
        </div>

        <div className={styles.credentialLayout}>
          <article className={styles.partnerPanel}>
            <div className={styles.panelHeading}>
              <div>
                <span>官方合作伙伴</span>
                <h2>一线增长资源</h2>
              </div>
              <p>搜索、再营销、独立站与电商程序化广告生态</p>
            </div>

            <div className={styles.partnerGrid}>
              {partners.map((partner) => (
                <div className={styles.partnerLogo} key={partner.name}>
                  <Image
                    alt={partner.name}
                    height={partner.height}
                    src={withAssetPrefix(partner.image)}
                    width={partner.width}
                  />
                </div>
              ))}
            </div>

            <div className={styles.rankingProof}>
              <strong>No.1</strong>
              <span>
                Google Ads 全国代理商
                <br />
                专业认证考试成绩认可
              </span>
              <Medal size={32} weight="regular" aria-hidden="true" />
            </div>
          </article>

          <div className={styles.certificateGallery}>
            {certificates.map((certificate) => (
              <figure className={`${styles.certificateCard} ${certificate.className}`} key={certificate.title}>
                <div className={styles.certificateImage}>
                  <Image
                    alt={certificate.title}
                    fill
                    sizes="(max-width: 760px) 100vw, 28vw"
                    src={withAssetPrefix(certificate.image)}
                  />
                </div>
                <figcaption>
                  <strong>{certificate.title}</strong>
                  <span>{certificate.copy}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className={styles.credentialFooter}>
          <span>自 2016 年起，持续服务品牌全球化增长</span>
          <span>合作状态、正式称谓与 Logo 使用规范以上线前复核为准</span>
        </div>
      </section>

      <section className={styles.solutions} id="solutions">
        <div className={styles.solutionsIntro}>
          <h2>同样做独立站，B2B 和 DTC 需要不同的增长系统</h2>
          <p>
            B2B 关注值得销售跟进的海外询盘，DTC 关注流量、转化和复购带来的整站收入。Leadtop 用两套系统匹配不同业务模型。
          </p>
        </div>

        <div className={styles.solutionGrid}>
          {solutions.map((solution) => (
            <article className={`${styles.solutionPanel} ${solution.className}`} key={solution.name}>
              <div className={styles.solutionVisual}>
                <Image
                  alt={`${solution.name} 增长场景`}
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  src={withAssetPrefix(solution.image)}
                />
              </div>

              <div className={styles.solutionContent}>
                <div className={styles.solutionIdentity}>
                  <span>{solution.audience}</span>
                  <strong>{solution.name}</strong>
                </div>
                <h3>{solution.title}</h3>
                <p>{solution.copy}</p>

                <div className={styles.outcomeGrid}>
                  {solution.outcomes.map((outcome) => (
                    <span key={outcome}>{outcome}</span>
                  ))}
                </div>

                <Link className={styles.solutionLink} href={solution.href}>
                  {solution.cta}
                  <ArrowRight size={18} weight="bold" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <aside className={styles.ecosystemNote}>
          <div>
            <ChartLineUp size={27} weight="regular" aria-hidden="true" />
            <strong>已经在 Amazon 销售，也希望做大品牌自有站？</strong>
          </div>
          <p>把 Amazon DSP 与 AMC 洞察，连接到 DTC 独立站的广告、转化和复购运营。</p>
          <a href="#problems">
            评估当前增长路径
            <ArrowRight size={17} weight="bold" aria-hidden="true" />
          </a>
        </aside>
      </section>

      <section className={styles.problems} id="problems">
        <div className={styles.problemStatement}>
          <Factory size={34} weight="regular" aria-hidden="true" />
          <h2>网站上线、广告开跑，为什么增长还是不稳定？</h2>
          <p>多数问题不只出在一个渠道。每个断点都会放大下一个环节的损耗。</p>
          <strong>增长不是单点工程</strong>
        </div>

        <div className={styles.problemResponses}>
          {growthBreaks.map(({ title, response, Icon }) => (
            <article className={styles.problemRow} key={title}>
              <span className={styles.problemIcon}>
                <Icon size={25} weight="regular" aria-hidden="true" />
              </span>
              <h3>{title}</h3>
              <ArrowRight className={styles.problemArrow} size={21} weight="bold" aria-hidden="true" />
              <p>{response}</p>
            </article>
          ))}
        </div>

        <div className={styles.problemConclusion}>
          Leadtop 不把建站、投放和 SEO 当成互不相干的采购项，而是把它们组织成可验证、可优化、可沉淀的增长链路。
        </div>
      </section>
    </main>
  );
}
