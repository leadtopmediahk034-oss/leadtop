"use client";

import { useState } from "react";
import {
  ChartBar,
  MagnifyingGlass,
  Monitor,
  ShieldCheck,
  TrendUp,
} from "@phosphor-icons/react";

import styles from "./PolarisExperience.module.css";

export default function SystemAdvantageExplorer({ advantages }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = advantages[activeIndex];
  const iconMap = {
    monitor: Monitor,
    trend: TrendUp,
    search: MagnifyingGlass,
    trust: ShieldCheck,
    review: ChartBar,
  };
  const Icon = iconMap[active.icon];

  return (
    <div className={styles.advantageExplorer}>
      <div className={styles.advantageTabs} role="tablist" aria-label="Polaris 系统优势">
        {advantages.map((item, index) => {
          const ItemIcon = iconMap[item.icon];
          const isActive = index === activeIndex;
          return (
            <button
              type="button"
              key={item.label}
              className={isActive ? styles.advantageTabActive : ""}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveIndex(index)}
            >
              <ItemIcon size={22} weight="regular" aria-hidden />
              {item.label}
            </button>
          );
        })}
      </div>
      <div className={styles.advantageDetail}>
        <div className={styles.advantageBadge} aria-hidden="true"><Icon size={34} weight="regular" /></div>
        <h3>{active.title}</h3>
        <div className={styles.advantageCompare}>
          <div>
            <span>常见做法</span>
            <p>{active.problem}</p>
          </div>
          <div>
            <span>Polaris 的做法</span>
            <p>{active.solution}</p>
          </div>
        </div>
        <div className={styles.advantageProof}>
          {active.proof.map((item) => <span key={item}>{item}</span>)}
        </div>
      </div>
    </div>
  );
}
