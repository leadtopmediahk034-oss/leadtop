"use client";

import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import { useState } from "react";

import styles from "./CompanyPages.module.css";

const fields = [
  { id: "name", label: "姓名", autoComplete: "name", required: true },
  { id: "phone", label: "电话", type: "tel", autoComplete: "tel", required: true },
  { id: "wechat", label: "微信/QQ", autoComplete: "off" },
  { id: "email", label: "邮箱", type: "email", autoComplete: "email", required: true },
  { id: "company", label: "公司名称", autoComplete: "organization" },
  { id: "website", label: "您的网站", type: "url", autoComplete: "url" },
];

export default function ContactForm() {
  const [status, setStatus] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Leadtop 官网咨询 - ${data.get("company") || data.get("name")}`);
    const body = encodeURIComponent([
      `姓名：${data.get("name")}`,
      `电话：${data.get("phone")}`,
      `微信/QQ：${data.get("wechat") || "未填写"}`,
      `邮箱：${data.get("email")}`,
      `公司名称：${data.get("company") || "未填写"}`,
      `网站：${data.get("website") || "未填写"}`,
      `公司主营产品：${data.get("product") || "未填写"}`,
      `其他需求：${data.get("needs") || "未填写"}`,
    ].join("\n"));

    setStatus("已为您整理咨询内容，请在邮件客户端中确认发送。");
    window.location.href = `mailto:service@leadtopmedia.com?subject=${subject}&body=${body}`;
  }

  return (
    <form className={styles.contactForm} onSubmit={handleSubmit}>
      <div className={styles.formHeading}>
        <span>立即咨询</span>
        <h2>联系我们吧</h2>
        <p>填写以下信息，我们会根据您的业务与市场情况安排对应顾问沟通。</p>
      </div>

      <div className={styles.formGrid}>
        {fields.map((field) => (
          <label className={styles.field} key={field.id} htmlFor={field.id}>
            <span>{field.label}{field.required ? " *" : ""}</span>
            <input
              autoComplete={field.autoComplete}
              id={field.id}
              name={field.id}
              required={field.required}
              type={field.type || "text"}
            />
          </label>
        ))}

        <label className={`${styles.field} ${styles.fieldWide}`} htmlFor="product">
          <span>公司主营产品</span>
          <input id="product" name="product" type="text" />
        </label>

        <label className={`${styles.field} ${styles.fieldWide}`} htmlFor="needs">
          <span>其他需求</span>
          <textarea
            id="needs"
            name="needs"
            placeholder="为了更高效地与您沟通，请简述您的经营模式和业务需求。"
            rows={6}
          />
        </label>
      </div>

      <button className={styles.submitButton} type="submit">
        提交咨询
        <span><ArrowRight aria-hidden="true" size={17} weight="bold" /></span>
      </button>

      <p className={styles.formNote}>提交后将打开您的邮件客户端，咨询内容会发送至 service@leadtopmedia.com。</p>
      {status && <p className={styles.formStatus} role="status"><CheckCircle aria-hidden="true" size={18} weight="fill" />{status}</p>}
    </form>
  );
}
