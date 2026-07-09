import {
  Browser,
  Certificate,
  ChartBar,
  Factory,
  FileText,
  Funnel,
  GlobeHemisphereWest,
  GoogleLogo,
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
  UserFocus,
} from "@phosphor-icons/react/dist/ssr";

import styles from "./PolarisExperience.module.css";

const iconProps = { size: 34, weight: "regular", "aria-hidden": true };

const painItems = [
  {
    no: "01",
    title: "网站建好了，但没有询盘",
    tag: "Site",
    copy: "页面没有围绕海外买家的搜索意图、采购顾虑和联系路径设计。",
    Icon: Browser,
  },
  {
    no: "02",
    title: "Google Ads 有点击，线索质量不稳",
    tag: "Traffic",
    copy: "搜索词、落地页和转化追踪没有联动，点击没有变成可跟进客户。",
    Icon: ChartBar,
  },
  {
    no: "03",
    title: "SEO/GEO 没有长期布局",
    tag: "Trust",
    copy: "产品页、FAQ、博客内容和结构化信息缺少系统规划。",
    Icon: MagnifyingGlass,
  },
  {
    no: "04",
    title: "品牌信任不足",
    tag: "Site",
    copy: "工厂实力、认证资质、客户案例和常见问题展示不完整。",
    Icon: ShieldCheck,
  },
  {
    no: "05",
    title: "数据追踪不清",
    tag: "Review",
    copy: "无法判断哪些关键词、页面和渠道真正带来高质量询盘。",
    Icon: ChartBar,
  },
];

const systems = [
  {
    no: "01",
    title: "Traffic System",
    cn: "流量系统",
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
  { no: "01", stage: "定位", title: "增长定位与客户画像", tag: "Strategy", preview: "客户画像与价值主张", Icon: UserFocus },
  { no: "02", stage: "建站", title: "B2B 外贸独立站建设", tag: "Site", preview: "工业解决方案首页", Icon: GlobeHemisphereWest },
  { no: "03", stage: "建站", title: "产品页与 Landing Page 制作", tag: "Site", preview: "落地页线框", Icon: Browser },
  { no: "04", stage: "引流", title: "Google Ads 与多渠道投放", tag: "Traffic", preview: "搜索词与账户结构", Icon: GoogleLogo },
  { no: "05", stage: "引流", title: "谷歌 SEO 与 GEO 优化", tag: "Traffic", preview: "关键词矩阵", Icon: MagnifyingGlass },
  { no: "06", stage: "转化", title: "CRO 转化率优化", tag: "Conversion", preview: "表单与 A/B 测试", Icon: Funnel },
  { no: "07", stage: "转化", title: "社媒内容与品牌背书", tag: "Trust", preview: "FAQ 内容库", Icon: FileText },
  { no: "08", stage: "复盘", title: "数据追踪与增长复盘", tag: "Review", preview: "月度增长报告", Icon: ChartBar },
];

const serviceStages = [
  { label: "定位", sub: "Positioning", Icon: Target },
  { label: "建站", sub: "Site", Icon: Monitor },
  { label: "引流", sub: "Traffic", Icon: PaperPlaneTilt },
  { label: "转化", sub: "Conversion", Icon: Funnel },
  { label: "复盘", sub: "Review", Icon: ChartBar },
];

const processSteps = [
  { no: "01", time: "第 1-2 个月", title: "诊断、建站与数据基建", items: ["业务诊断", "关键词研究", "核心页面", "GA4-GTM"], Icon: Strategy },
  { no: "02", time: "第 2-3 个月", title: "广告测试与询盘反馈", items: ["Google Ads", "Bing", "LinkedIn", "表单反馈"], Icon: ChartBar },
  { no: "03", time: "第 3-6 个月", title: "SEO/GEO 内容资产起势", items: ["产品页", "FAQ", "案例", "外链引用"], Icon: FileText },
  { no: "04", time: "持续优化", title: "用数据提升询盘质量", items: ["搜索词", "CVR", "CPL", "销售反馈"], Icon: Target },
];

const proofCards = [
  {
    no: "01",
    title: "Landing Page 联动广告",
    tag: "搜索词 / 落地页 / 表单 / 销售反馈",
    points: ["关键词与搜索意图对齐", "落地页结构与转化路径优化", "表单字段精简与分级", "销售反馈闭环与线索分配"],
  },
  {
    no: "02",
    title: "SEO / GEO 内容资产",
    tag: "产品词 / 应用场景 / FAQ / 行业引用",
    points: ["产品与应用场景内容体系化", "FAQ 覆盖用户关键决策问题", "行业引用与可信来源增强信任", "内容更新与搜索可见性提升"],
  },
  {
    no: "03",
    title: "月度增长复盘",
    tag: "CPL / CVR / 询盘质量 / 销售反馈",
    points: ["关键指标变动与原因分析", "高价值页面与内容表现复盘", "询盘质量与销售反馈对齐", "下月优化重点与实验计划"],
  },
];

const faqs = [
  ["B2B 外贸企业适合做独立站吗？", "适合。尤其是客单价较高、技术方案型产品、需要建立信任与长期合作的企业。独立站能沉淀品牌资产，获取更精准的询盘线索，降低对平台的依赖。"],
  ["外贸独立站建好后多久能有询盘？", "如果配合广告测试，通常可以更快获得市场反馈。SEO/GEO 属于长期资产，需要持续内容和页面优化。"],
  ["Google Ads 有点击没询盘怎么办？", "需要同时检查搜索词、广告文案、落地页、表单、CTA、移动端体验和转化追踪。"],
  ["SEO 和 GEO 有什么区别？", "SEO 更关注搜索排名，GEO 更关注 AI 搜索与生成式回答里的品牌可见性。"],
  ["Polaris 和普通外贸推广有什么不同？", "Polaris 把网站、广告、SEO/GEO、信任内容和数据复盘放在同一套系统里，以询盘质量和获客成本作为核心指标。"],
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
        <Certificate size={42} weight="regular" aria-hidden />
        <strong>Certificate</strong>
        <span>ISO 9001</span>
      </div>
      <div className={styles.factoryGrid}>
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className={styles.ratingMock}>Great product quality</div>
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
  return (
    <main className={styles.page}>
      <section id="top" className={`${styles.section} ${styles.hero}`}>
        <div className={styles.heroBrand}>
          <span className={styles.compass} aria-hidden="true" />
          <strong>Leadtop</strong>
          <em>Polaris Growth System</em>
        </div>
        <div className={styles.heroMedia} aria-hidden="true" />
        <div className={styles.heroCopy}>
          <p>B2B Growth System</p>
          <h1>B2B 独立站海外询盘增长系统</h1>
          <span>打通建站、Google Ads、SEO/GEO、转化与信任，让官网持续获取高质量海外询盘。</span>
          <div className={styles.actions}>
            <a className={styles.primary} href="#diagnosis">获取获客诊断</a>
            <a className={styles.secondary} href="#systems">查看增长系统</a>
          </div>
        </div>
        <div className={styles.heroPanel}>
          <div className={styles.panelHead}>
            <strong>Polaris Growth System</strong>
            <small>Calibrated for B2B growth</small>
          </div>
          <div className={styles.heroFlow}>
            {["Traffic", "Conversion", "Trust", "Inquiry"].map((item, index) => (
              <article key={item}>
                <span>{index + 1}</span>
                <strong>{item}</strong>
                <p>{["Google Ads / SEO", "Landing Page", "Case Proof", "Leads / CPL / CVR"][index]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="pain" className={`${styles.section} ${styles.pain}`}>
        <div className={styles.sectionCopy}>
          <p className={styles.kicker}>当前困境</p>
          <h2>问题不是单点失败，而是获客链路断开</h2>
          <span>网站、流量、信任和数据没有接成闭环，询盘自然会断在某个环节。</span>
        </div>
        <div className={styles.diagnosticBoard}>
          <div className={styles.boardFrame} aria-hidden="true">
            <span />
            <i />
          </div>
          <svg className={styles.chainSvg} viewBox="0 0 1000 620" aria-hidden="true">
            <defs>
              <marker id="polaris-chain-arrow" markerWidth="14" markerHeight="14" refX="10" refY="7" orient="auto">
                <path d="M2 2 L10 7 L2 12" />
              </marker>
            </defs>
            <path d="M335 165 H617" markerEnd="url(#polaris-chain-arrow)" />
            <path d="M620 284 H448" markerEnd="url(#polaris-chain-arrow)" />
            <path d="M452 360 H610" markerEnd="url(#polaris-chain-arrow)" />
            <path d="M825 505 H718" markerEnd="url(#polaris-chain-arrow)" />
          </svg>
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
          <a href="#diagnosis" className={styles.inlineLink}>先做一次获客诊断</a>
        </div>
      </section>

      <section id="systems" className={`${styles.section} ${styles.systems}`}>
        <div className={styles.centered}>
          <span>增长系统</span>
          <h2>三套系统一起工作，询盘才会稳定</h2>
          <p>把流量获取、页面转化和信任背书放进同一块增长控制台，最后统一指向高质量询盘。</p>
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
              <p>Leads / CPL / CVR / Pipeline</p>
            </aside>
          </div>
        </div>
      </section>

      <section id="services" className={`${styles.section} ${styles.services}`}>
        <div className={styles.serviceCopy}>
          <p className={styles.kicker}>服务内容</p>
          <h2>从定位到复盘，按一条链路交付</h2>
          <span>每一步都有对应的页面、素材、数据和转化目标，避免服务内容散落在背景之外。</span>
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
                <strong>{service.title}</strong>
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
          <h2>90-180 天，搭建可持续获客基础</h2>
          <span>先打牢网站和数据基建，再用广告验证市场，随后沉淀 SEO/GEO 内容资产和长期询盘来源。</span>
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
            <strong>Review cadence</strong>
            <div>
              <b>周报</b>
              <span>关键词覆盖追踪<br />与执行进展同步</span>
            </div>
            <div>
              <b>月报</b>
              <span>效果复盘与优化建议<br />下一步计划</span>
            </div>
            <div>
              <b>季度复盘</b>
              <span>增长目标回顾<br />策略与资源调整</span>
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
          <h2>案例不是截图，而是一套复盘证据</h2>
          <span>Polaris 更关注关键词、页面、内容、询盘质量和销售反馈是否形成可复用的增长档案。</span>
        </div>
        <div className={styles.dossier}>
          <div className={styles.clip} aria-hidden="true" />
          <div className={styles.caseTable}>
            <strong>Recommended Case Format</strong>
            <div>
              {["行业", "原始问题", "Leadtop 动作", "结果指标"].map((item) => <b key={item}>{item}</b>)}
              {["机械设备", "关键词分散，页面与搜索意图不匹配", "关键词体系重建，页面分层优化", "关键词覆盖更清晰，高意向询盘提升"].map((item) => <span key={item}>{item}</span>)}
              {["工业配件", "广告页面不稳定，内容薄弱", "重构落地页与表单逻辑，广告页面联动", "表单转化率提升，有效询盘占比提升"].map((item) => <span key={item}>{item}</span>)}
              {["定制制造", "有流量但转化低，销售信息不足", "内容资产补强，表单分级，销售跟进机制优化", "CPL 优化，销售跟进效率提升"].map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>
          <div className={styles.proofCards}>
            {proofCards.map((card) => (
              <article key={card.title}>
                <b>{card.no}</b>
                <h3>{card.title}</h3>
                <em>{card.tag}</em>
                <ul>{card.points.map((item) => <li key={item}>{item}</li>)}</ul>
                <div className={styles.proofMini} aria-hidden="true">
                  <span />
                  <i />
                  <i />
                  <b />
                </div>
              </article>
            ))}
          </div>
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
        <form id="diagnosis" className={styles.form}>
          <span className={styles.formMark} aria-hidden="true" />
          <h2>获取 B2B 独立站获客诊断</h2>
          <p>留下官网链接和当前问题，我们将从五个维度给出初步判断。</p>
          <label><span>姓名</span><input name="name" type="text" placeholder="请输入姓名" /></label>
          <label><span>手机 / 微信</span><input name="contact" type="text" placeholder="便于顾问联系你" /></label>
          <label><span>官网链接</span><input name="website" type="text" placeholder="https://www.yourdomain.com" /></label>
          <label><span>当前问题</span><textarea name="problem" rows="4" placeholder="尽量详细描述，帮助我们更准确诊断" /></label>
          <button type="submit">提交网站，获取获客诊断</button>
          <small>初步判断 / 不承诺虚假倍数 / 先看问题优先级</small>
          <aside>
            {["网站承接", "广告结构", "SEO/GEO", "信任内容", "询盘路径"].map((item) => <b key={item}>{item}</b>)}
          </aside>
        </form>
        <footer className={styles.footer}>
          <span className={styles.compass} aria-hidden="true" />
          <strong>Leadtop Polaris Growth System</strong>
          <p>品牌为舟 / 流量为帆 / 线索为桨 / 增长为海</p>
        </footer>
      </section>
    </main>
  );
}
