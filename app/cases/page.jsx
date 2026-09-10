"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { SiteFooter, SiteHeader } from "../../components/SiteChrome";
import styles from "./Cases.module.css";

const cases = [
  { id: "polaris", name: "精密制造企业", type: "B2B", category: "工业制造", market: "欧美市场", title: "让专业制造能力，成为海外采购的优先选择", copy: "重构产品与应用场景页面，连接高意向搜索广告与询盘筛选，让采购需求从第一次访问进入销售跟进。", image: "/polaris/assets/hero-command-center.png", href: "/polaris", cta: "了解 B2B 增长方案", metrics: [["150%", "有效询盘增长"], ["38.6%", "MQL 占比"]] },
  { id: "helios", name: "智能家居品牌", type: "DTC", category: "智能家居", market: "德国市场", title: "从新品冷启动，到品牌独立站的持续增长", copy: "围绕生活场景组织创意素材，协同广告测试、商品页优化与再营销，把产品关注转化为购买行动。", image: "/helios/assets/revenue.png", href: "/helios", cta: "了解 DTC 增长方案", metrics: [["200%", "首销目标达成率"], ["5.0", "广告投入产出比"]] },
  { id: "outdoor", name: "户外生活方式品牌", type: "BRAND", category: "运动户外", market: "全球市场", title: "用真实生活场景，让品牌走进海外用户日常", copy: "以场景内容和达人创意打开认知，连接社媒传播与独立站承接，让一次曝光成为理解品牌的开始。", image: "/helios/sections/proof.png", href: "/services/socialmedia", cta: "了解品牌社媒方案", metrics: [["1.38亿+", "累计内容曝光"], ["906万+", "内容互动量"]] },
];

const filters = [["ALL", "全部案例"], ["B2B", "B2B 出海"], ["DTC", "DTC 品牌"], ["BRAND", "品牌出海"]];

export default function CasesPage() {
  const [filter, setFilter] = useState("ALL");
  const visibleCases = useMemo(() => filter === "ALL" ? cases : cases.filter((item) => item.type === filter), [filter]);
  return <div className={styles.page}>
    <SiteHeader />
    <main>
      <section className={styles.hero} aria-labelledby="cases-title">
        <div className={styles.eyebrow}><span aria-hidden="true">◆</span> CASES</div>
        <h1 id="cases-title">Success Stories</h1>
        <p className={styles.heroCn}>成功案例</p>
        <p className={styles.heroCopy}>从业务问题、关键动作到结果口径，查看增长如何发生。</p>
        <div className={styles.filters} role="group" aria-label="案例分类">
          {filters.map(([value, label]) => <button key={value} type="button" className={filter === value ? styles.filterActive : ""} aria-pressed={filter === value} onClick={() => setFilter(value)}>{label}</button>)}
        </div>
      </section>
      <section className={styles.grid} aria-live="polite" aria-label="案例列表">
        {visibleCases.map((item, index) => <article className={styles.card} key={item.id}>
          <Link className={styles.cardLink} href={item.href} aria-label={`${item.title}，${item.cta}`}>
            <div className={styles.cardImage}><Image src={item.image} alt={`${item.name}案例示意`} fill sizes="(max-width: 760px) 100vw, 50vw" /><span>DEMO / {String(index + 1).padStart(2, "0")}</span><span className={styles.cardArrow} aria-hidden="true"><ArrowRight size={22} /></span></div>
            <div className={styles.cardBody}><div className={styles.meta}><span>{item.type}</span><span>{item.category}</span><span>{item.market}</span></div><h2>{item.title}</h2><p>{item.copy}</p></div>
            <div className={styles.flipPanel} style={{ "--flip-image": `url(${item.image})` }}><span className={styles.flipLabel}>CASE DATA · 模拟</span><h3>{item.title}</h3><p>{item.copy}</p><div className={styles.metrics}>{item.metrics.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}<small>模拟</small></span></div>)}</div><span className={styles.flipCta}>{item.cta}<ArrowRight size={18} /></span></div>
          </Link>
        </article>)}
        {!visibleCases.length && <div className={styles.empty}>暂时没有符合条件的案例。<button type="button" onClick={() => setFilter("ALL")}>查看全部案例</button></div>}
      </section>
      <section className={styles.cta}><div><span>START WITH THE PRIMARY CONSTRAINT</span><h2>让下一个增长动作有清晰的依据</h2><p>告诉我们当前最需要解决的问题，我们会从业务目标、页面、渠道与数据基础开始判断。</p></div><Link href="/contactus">咨询增长方案<ArrowRight size={18} /></Link></section>
    </main>
    <SiteFooter />
  </div>;
}
