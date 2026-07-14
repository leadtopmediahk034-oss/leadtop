"use client";

import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import { useState } from "react";

import { submitInquiry } from "../lib/inquiry-client";
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
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setIsSubmitting(true);
    setStatus({ type: "pending", message: "正在提交咨询信息..." });

    try {
      const result = await submitInquiry(form, "contact_consultation");
      setStatus({ type: "success", message: result.message || "提交成功，我们会尽快与您联系。" });
      form.reset();
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className={styles.contactForm} onSubmit={handleSubmit}>
      <div className={styles.formHeading}>
        <span>立即咨询</span>
        <h2>联系我们吧</h2>
        <p>填写以下信息，我们会根据您的业务与市场情况安排对应顾问沟通。</p>
      </div>

      <div className={styles.formGrid}>
        <input aria-hidden="true" autoComplete="off" hidden name="website_confirm" tabIndex={-1} type="text" />
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

      <button className={styles.submitButton} disabled={isSubmitting} type="submit">
        {isSubmitting ? "提交中..." : "提交咨询"}
        <span><ArrowRight aria-hidden="true" size={17} weight="bold" /></span>
      </button>

      <p className={styles.formNote}>提交信息仅用于本次业务判断与后续沟通，我们会妥善保护您的联系方式。</p>
      {status && <p className={`${styles.formStatus} ${status.type === "error" ? styles.formStatusError : ""}`} role="status"><CheckCircle aria-hidden="true" size={18} weight="fill" />{status.message}</p>}
    </form>
  );
}
