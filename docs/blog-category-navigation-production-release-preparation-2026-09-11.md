# Blog category navigation production release — preparation

Date: 2026-09-11
Status: Preparation only; no commit, push, or production deployment performed.

## SOP stage and gate

- Stage: Stage 8 — technical remediation and production acceptance.
- Scope change: release the already implemented and locally validated blog category/navigation improvements to the production Next.js site.
- Production baseline: `2d239aa`; local `main`, `origin/main`, and production deployment source are aligned before release.

## Release scope

Only these production source files will enter the release commit:

- `app/blog/Blog.module.css`
- `app/blog/BlogFeatured.jsx`
- `app/blog/page.jsx`
- `components/SiteChrome.jsx`
- `lib/wordpress.js`

The release includes:

- Wider and refined blog-card presentation already validated locally.
- Empty WordPress categories visible in the category selector.
- Normalized Chinese category slugs and consistent category URLs.
- News-category links in desktop and mobile navigation.
- The featured-news block visible across all category states.
- Category clicks landing at `#featured-news` with fixed-header clearance.

## Explicit exclusions

- `.codex-backups/`, `.next-stale-*`, scripts, WordPress plugins and ZIP files, standalone images, unrelated documentation, environment files, and CMS data.
- No WordPress post/category edit, plugin upload, Vercel setting change, or manual CMS deployment.

## Baseline and acceptance criteria

- Pre-release production `/blog`: HTTP 200 on 2026-09-11.
- `main` and `origin/main`: `2d239aa`, divergence `0/0` after fetch.
- Local category links select the correct category, preserve the featured section, and land the section 110 px below the viewport top.
- Local `git diff --check` and `npm run build` have passed.
- After push, wait for Vercel production to serve the release commit.
- Production `/blog` and all four category URLs return HTTP 200.
- Production HTML contains `id="featured-news"`, all four category links, and no double-encoded `%25` category URLs.
- No Critical or High rendering, routing, category-selection, or deployment regression remains.

## Backup and rollback

- Immediately before staging, create a timestamped snapshot of the five scoped source files and their diff under `.codex-backups/`.
- Retain the snapshot after release.
- Rollback baseline: `2d239aa`.
- If production acceptance fails, preserve evidence and restore production by reverting only the release commit and pushing the revert; no CMS rollback is required.

## Ordered release actions

1. Create the release snapshot.
2. Re-run the scoped diff check and one final build only if code changed after the last successful build.
3. Stage only the five source files and this release preparation/result documentation.
4. Review the staged diff and confirm branch `main`.
5. Commit and push to `origin/main`.
6. Wait for Vercel deployment and validate production routes and rendered category anchors.
7. Record the release commit, production evidence, exclusions, and rollback point.
