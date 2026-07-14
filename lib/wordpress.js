const WORDPRESS_URL = (process.env.WORDPRESS_URL || "https://cms.leadtopmedia.com").replace(/\/+$/, "");
const API_BASE = `${WORDPRESS_URL}/wp-json/wp/v2`;
const CACHE_SECONDS = 300;

const ALLOWED_TAGS = new Set([
  "p", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li", "blockquote",
  "strong", "b", "em", "i", "a", "img", "figure", "figcaption", "pre", "code",
  "br", "hr", "table", "thead", "tbody", "tr", "th", "td", "div", "span",
]);
const VOID_TAGS = new Set(["br", "hr", "img"]);
const ENTITY_MAP = {
  amp: "&", apos: "'", gt: ">", lt: "<", nbsp: " ", quot: '"',
  hellip: "…", mdash: "—", ndash: "–", rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“",
};

function decodeEntities(value = "") {
  return value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (entity, code) => {
    if (code[0] === "#") {
      const numeric = code[1]?.toLowerCase() === "x" ? Number.parseInt(code.slice(2), 16) : Number.parseInt(code.slice(1), 10);
      return Number.isFinite(numeric) ? String.fromCodePoint(numeric) : entity;
    }
    return ENTITY_MAP[code.toLowerCase()] ?? entity;
  });
}

function textOnly(value = "") {
  return decodeEntities(value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim());
}

function escapeAttribute(value) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function safeUrl(value, allowMail = false) {
  const trimmed = decodeEntities(value).trim();
  if ((trimmed.startsWith("/") && !trimmed.startsWith("//")) || trimmed.startsWith("#")) return trimmed;
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === "http:" || parsed.protocol === "https:" || (allowMail && parsed.protocol === "mailto:")) return parsed.toString();
  } catch {
    return "";
  }
  return "";
}

function sanitizedAttributes(tag, token) {
  const allowed = tag === "a"
    ? new Set(["href", "title"])
    : tag === "img"
      ? new Set(["src", "alt", "title", "width", "height"])
      : new Set(["colspan", "rowspan"]);
  const attributes = [];
  const attributePattern = /\s([a-zA-Z_:][\w:.-]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;

  for (const match of token.matchAll(attributePattern)) {
    const name = match[1].toLowerCase();
    if (!allowed.has(name)) continue;
    let value = match[2] ?? match[3] ?? match[4] ?? "";

    if (name === "href" || name === "src") {
      value = safeUrl(value, name === "href");
      if (!value) continue;
    }
    if ((name === "width" || name === "height" || name === "colspan" || name === "rowspan") && !/^\d{1,4}$/.test(value)) continue;
    attributes.push(`${name}="${escapeAttribute(value)}"`);
  }

  if (tag === "a") attributes.push('rel="noopener noreferrer"');
  if (tag === "img") attributes.push('loading="lazy"');
  return attributes.length ? ` ${attributes.join(" ")}` : "";
}

export function sanitizeWordPressHtml(value = "") {
  const clean = value
    .replace(/<!--([\s\S]*?)-->/g, "")
    .replace(/<(script|style|iframe|object|embed|form|svg|math)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, "")
    .replace(/<(script|style|iframe|object|embed|form|input|button|textarea|select|link|meta|base|svg|math)\b[^>]*\/?>/gi, "");
  const tagPattern = /<\/?([a-zA-Z][\w:-]*)(?:\s[^<>]*?)?\/?>/g;
  let output = "";
  let cursor = 0;

  for (const match of clean.matchAll(tagPattern)) {
    output += clean.slice(cursor, match.index).replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const tag = match[1].toLowerCase();
    if (ALLOWED_TAGS.has(tag)) {
      const closing = /^<\s*\//.test(match[0]);
      output += closing && !VOID_TAGS.has(tag) ? `</${tag}>` : closing ? "" : `<${tag}${sanitizedAttributes(tag, match[0])}>`;
    }
    cursor = match.index + match[0].length;
  }

  return output + clean.slice(cursor).replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function normalizePost(post, includeContent = false) {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  const categories = post._embedded?.["wp:term"]?.flat()?.filter((term) => term.taxonomy === "category") || [];
  const author = post._embedded?.author?.[0];

  return {
    id: post.id,
    slug: post.slug,
    link: post.link,
    date: post.date,
    modified: post.modified,
    title: textOnly(post.title?.rendered),
    excerpt: textOnly(post.excerpt?.rendered),
    content: includeContent ? sanitizeWordPressHtml(post.content?.rendered) : "",
    author: author?.name || "Leadtop",
    categories: categories.map(({ id, name, slug }) => ({ id, name: decodeEntities(name), slug })),
    featuredImage: media?.source_url || "",
    featuredImageAlt: media?.alt_text || textOnly(post.title?.rendered),
  };
}

async function wordpressFetch(path, tags = ["wordpress-posts"]) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { Accept: "application/json" },
    next: { revalidate: CACHE_SECONDS, tags },
  });
  if (!response.ok) throw new Error(`WordPress API returned ${response.status}`);
  return response;
}

export async function getPosts({ page = 1, perPage = 9 } = {}) {
  try {
    const query = new URLSearchParams({
      _embed: "1",
      page: String(Math.max(1, page)),
      per_page: String(perPage),
      order: "desc",
      orderby: "date",
      status: "publish",
    });
    const response = await wordpressFetch(`/posts?${query}`);
    const posts = await response.json();
    return {
      posts: posts.map((post) => normalizePost(post)),
      total: Number(response.headers.get("x-wp-total") || posts.length),
      totalPages: Number(response.headers.get("x-wp-totalpages") || 1),
    };
  } catch (error) {
    console.error(`Leadtop blog: ${error instanceof Error ? error.message : "posts request failed"}.`);
    return { posts: [], total: 0, totalPages: 0 };
  }
}

export async function getPostBySlug(slug) {
  try {
    const query = new URLSearchParams({ _embed: "1", slug, status: "publish" });
    const response = await wordpressFetch(`/posts?${query}`, ["wordpress-posts", `wordpress-post-${slug}`]);
    const posts = await response.json();
    return posts[0] ? normalizePost(posts[0], true) : null;
  } catch (error) {
    console.error(`Leadtop blog: ${error instanceof Error ? error.message : "post request failed"}.`);
    return null;
  }
}

export async function getPostsForSitemap() {
  try {
    const response = await wordpressFetch("/posts?per_page=100&status=publish&_fields=slug,modified");
    return await response.json();
  } catch {
    return [];
  }
}
