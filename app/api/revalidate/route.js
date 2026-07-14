import { timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function secureEqual(received, expected) {
  const left = Buffer.from(received || "");
  const right = Buffer.from(expected || "");
  return left.length === right.length && timingSafeEqual(left, right);
}

export async function POST(request) {
  const secret = process.env.WORDPRESS_REVALIDATE_SECRET;
  if (!secret) return NextResponse.json({ success: false, message: "刷新服务尚未配置。" }, { status: 503 });

  const authorization = request.headers.get("authorization") || "";
  const received = authorization.startsWith("Bearer ") ? authorization.slice(7) : "";
  if (!secureEqual(received, secret)) return NextResponse.json({ success: false, message: "无权执行刷新。" }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const slug = typeof body.slug === "string" && /^[a-z0-9][a-z0-9-]{0,199}$/i.test(body.slug) ? body.slug : "";

  revalidateTag("wordpress-posts", "max");
  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");
  if (slug) {
    revalidateTag(`wordpress-post-${slug}`, "max");
    revalidatePath(`/blog/${slug}`);
  }

  return NextResponse.json({ success: true, revalidated: true, slug: slug || null, timestamp: new Date().toISOString() });
}
