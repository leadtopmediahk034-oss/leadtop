import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_BODY_BYTES = 32 * 1024;
const rateLimitStore = new Map();

const FIELD_LIMITS = {
  name: 250,
  phone: 250,
  wechat: 250,
  email: 254,
  company: 250,
  contact: 250,
  website: 2048,
  product: 250,
  business_type: 250,
  problem: 5000,
  needs: 5000,
  form_type: 250,
  source_page: 250,
  landing_url: 2048,
  referrer: 2048,
  utm_source: 250,
  utm_medium: 250,
  utm_campaign: 250,
  utm_term: 250,
  utm_content: 250,
};

function json(message, status, extra = {}) {
  return NextResponse.json(
    { success: status < 400, message, ...extra },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}

function clientIp(request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || "unknown";
}

function isRateLimited(ip) {
  const now = Date.now();
  const recent = (rateLimitStore.get(ip) || []).filter((timestamp) => now - timestamp < WINDOW_MS);
  recent.push(now);
  rateLimitStore.set(ip, recent);

  if (rateLimitStore.size > 500) {
    for (const [key, timestamps] of rateLimitStore) {
      if (!timestamps.some((timestamp) => now - timestamp < WINDOW_MS)) rateLimitStore.delete(key);
    }
  }

  return recent.length > MAX_REQUESTS;
}

function normalizePayload(input) {
  const payload = {};

  for (const [field, maxLength] of Object.entries(FIELD_LIMITS)) {
    const value = input[field];
    if (typeof value === "string" && value.trim()) payload[field] = value.trim().slice(0, maxLength);
  }

  if (!payload.business_type && typeof input.businessType === "string") {
    payload.business_type = input.businessType.trim().slice(0, FIELD_LIMITS.business_type);
  }
  if (!payload.website && typeof input.site === "string") {
    payload.website = input.site.trim().slice(0, FIELD_LIMITS.website);
  }

  return payload;
}

function validHttpUrl(value) {
  if (!value) return true;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export async function POST(request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) return json("提交内容过长。", 413);

  let input;
  try {
    input = await request.json();
  } catch {
    return json("提交格式无效。", 400);
  }

  if (!input || typeof input !== "object" || Array.isArray(input)) return json("提交格式无效。", 400);
  if (typeof input.website_confirm === "string" && input.website_confirm.trim()) {
    return json("提交成功，我们会尽快与您联系。", 200);
  }

  if (isRateLimited(clientIp(request))) return json("提交过于频繁，请稍后再试。", 429);

  const payload = normalizePayload(input);
  if (!payload.name || (!payload.contact && !payload.phone && !payload.email)) {
    return json("请填写姓名和至少一种联系方式。", 400);
  }
  if (payload.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return json("请填写有效的邮箱地址。", 400);
  }
  for (const field of ["website", "landing_url", "referrer"]) {
    if (!validHttpUrl(payload[field])) return json("请填写有效的网址。", 400);
  }

  const wordpressUrl = process.env.WORDPRESS_URL?.replace(/\/+$/, "");
  const apiUser = process.env.WP_API_USER;
  const appPassword = process.env.WP_APP_PASSWORD;
  if (!wordpressUrl || !apiUser || !appPassword) {
    console.error("Leadtop inquiries: missing WordPress server environment variables.");
    return json("询盘服务尚未配置完成，请稍后重试。", 503);
  }

  try {
    const upstream = await fetch(`${wordpressUrl}/wp-json/leadtop/v1/inquiries`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${apiUser}:${appPassword}`).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
    const result = await upstream.json().catch(() => ({}));

    if (!upstream.ok) {
      console.error(`Leadtop inquiries: WordPress returned ${upstream.status}.`);
      return json("提交暂时失败，请稍后重试或直接联系我们。", 502);
    }

    return json(result.message || "提交成功，我们会尽快与您联系。", 201, {
      inquiry_id: result.inquiry_id,
      submitted_at: result.submitted_at,
    });
  } catch (error) {
    console.error(`Leadtop inquiries: ${error instanceof Error ? error.name : "upstream request failed"}.`);
    return json("提交暂时失败，请稍后重试或直接联系我们。", 502);
  }
}
