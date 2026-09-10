# Fashion partnership test news — publication preparation

- Prepared: 2026-09-10 (Asia/Shanghai)
- SOP stage: Stage 9 — content publication and post-release page validation
- Current state: WordPress post ID `40` is a draft.
- Current authorization: preparation and read-only inspection only.

## Requested publication

Publish WordPress draft ID `40` so it becomes visible on the public Leadtop blog.

## Content disclosure and risk boundary

- The title begins with `[测试稿]`.
- The body identifies the partner as `某服装品牌（待替换）` and explicitly states that it is a website test draft rather than a complete public partnership announcement.
- No customer name, contract value, campaign result, spokesperson quote, or third-party logo is included.
- Because publishing still creates a public corporate statement, the test disclosure will remain intact.

## Pre-publication baseline

- Post ID: `40`.
- Status: `draft`.
- Slug: `fashion-brand-marketing-partnership-test`.
- Featured media ID: `41`.
- Category ID: `1` (`未分类`).
- Excerpt: present.
- H2 headings: four.
- Intended public URL: <https://www.leadtopmedia.com/blog/fashion-brand-marketing-partnership-test>.

## Systems affected

- WordPress post ID `40`: status changes from `draft` to `publish` and receives a publication timestamp.
- Next.js public blog: the post becomes eligible for listing/detail retrieval after cache revalidation or the configured revalidation interval.
- No article copy, image, frontend code, category, or existing content will be changed.

## Backup and rollback

- Before changing status, save a timestamped snapshot of all fields for post ID `40` and its featured-media relationship under `.codex-backups/`.
- Preserve the existing local article and image sources in `docs/drafts/`.
- Rollback method: change only post ID `40` from `publish` back to `draft`; do not delete the post or media.
- Retain the backup after publication because this is a test page and no long-term performance window exists.

## Acceptance criteria

- WordPress reports post ID `40` as `publish` with the intended slug.
- Public detail URL returns HTTP 200 and displays the prepared title, excerpt, four H2 sections, and featured image.
- Public `/blog` includes the article after revalidation.
- Desktop and mobile article rendering remain usable, including article table of contents.
- No unrelated post or media record changes.

## Ordered execution after approval

1. Capture the exact pre-publish snapshot of post ID `40`.
2. Change only its status to `publish` through WordPress APIs over SSH.
3. Trigger the existing frontend revalidation endpoint if configured; otherwise wait for the five-minute revalidation window.
4. Validate WordPress state, public detail URL, public blog listing, featured image, headings, canonical/robots/OG output, and mobile rendering.
5. Record publication evidence and rollback instructions.

Execution starts only after the user enters `开始优化` for this publication scope.
