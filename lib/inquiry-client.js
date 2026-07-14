const ATTRIBUTION_KEY = "leadtop_inquiry_attribution_v1";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

function readStoredAttribution() {
  try {
    return JSON.parse(window.sessionStorage.getItem(ATTRIBUTION_KEY) || "null");
  } catch {
    return null;
  }
}

export function captureInquiryAttribution() {
  if (typeof window === "undefined") return {};

  const stored = readStoredAttribution();
  if (stored?.landing_url) return stored;

  const url = new URL(window.location.href);
  const attribution = {
    landing_url: url.toString(),
    referrer: document.referrer || "",
  };

  UTM_KEYS.forEach((key) => {
    attribution[key] = url.searchParams.get(key) || "";
  });

  try {
    window.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution));
  } catch {
    // Privacy modes can block session storage; submission still uses current-page data.
  }

  return attribution;
}

export function getInquiryAttribution() {
  if (typeof window === "undefined") return {};

  const stored = readStoredAttribution() || captureInquiryAttribution();
  return {
    ...stored,
    source_page: `${window.location.pathname}${window.location.search}`,
  };
}

export async function submitInquiry(form, formType) {
  const formData = new FormData(form);
  const payload = Object.fromEntries(
    Array.from(formData.entries(), ([key, value]) => [key, typeof value === "string" ? value.trim() : value]),
  );

  const response = await fetch("/api/inquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      ...getInquiryAttribution(),
      form_type: formType,
    }),
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(result.message || "提交暂时失败，请稍后重试或直接联系我们。");
  }

  return result;
}
