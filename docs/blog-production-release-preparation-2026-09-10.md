# Blog Frontend Production Release — Preparation

Date: 2026-09-10
Status: preparation only; no commit, push, or production deployment has been performed in this stage.

## Stage and Gate

- SOP stage: Stage 9, content production and page optimization — release and production validation step.
- Applicable gate: Gate 2 remains applicable from the approved blog index and article-template work.
- Scope change: publish the already implemented local blog index and article-detail frontend changes to the production Next.js site.

## Current Baseline

- Branch: `main`.
- Local HEAD and `origin/main`: `4ca8901` (`feat: redesign homepage success stories`).
- Production host: Vercel, serving `https://www.leadtopmedia.com`.
- Production `/blog/38-2` returns HTTP 200 and renders the published WordPress test post, but uses the old article layout and has no table of contents.
- The published test post already contains four H2 headings, so missing headings are not the cause.
- Local source contains the new article TOC, desktop sticky navigation, mobile collapsible navigation, share actions, updated article layout, redesigned blog index, filtering, search, featured carousel, and pagination.
- The local preview server is currently stopped. The last recorded `npm run build`, desktop check, mobile check, and search check passed before this release preparation.
- The WordPress test post has an empty title, placeholder copy, no featured image, and the default category. Those content issues predate this release and are not part of the deployment code scope.

## Exact Release Scope

Production source files:

- `app/blog/page.jsx`
- `app/blog/BlogFeatured.jsx`
- `app/blog/Blog.module.css`
- `app/blog/[slug]/page.jsx`
- `app/blog/[slug]/ArticleToc.jsx`
- `lib/wordpress.js`

Stage records included in the release commit:

- `docs/blog-news-page-preparation-2026-09-10.md`
- `docs/blog-news-page-result-2026-09-10.md`
- `docs/blog-article-template-preparation-2026-09-10.md`
- `docs/blog-article-template-result-2026-09-10.md`
- `docs/blog-editor-guide.md`
- `docs/blog-production-release-preparation-2026-09-10.md`
- A release result record created after validation.

Explicitly excluded:

- WordPress plugin source and ZIP archives.
- `.codex-backups/`, `.next-stale-20260909/`, scripts, unrelated documents, images, and all other user changes.
- CMS post edits, title/slug/category/image/content changes, plugin changes, environment variables, and Vercel configuration changes.

## Backup and Restore

Immediately after approval and before the first release write, create a timestamped local snapshot of the six exact production source files and their staged diff. Retain the existing pre-change backups:

- `.codex-backups/blog-news-20260910-112500/`
- `.codex-backups/blog-article-20260910-123334/`

The production rollback point is Git commit `4ca8901`. If the deployment fails acceptance, preserve all backups and restore production by reverting only the release commit on `main`, then pushing that revert. No rollback will be performed unless it is required by the approved release validation or separately requested.

## Acceptance Criteria

- Only the exact scoped files are staged and committed on `main`.
- `git diff --check` passes.
- Local `/blog` and `/blog/38-2` render successfully at desktop and 390 × 844 mobile widths.
- The local article displays the desktop table of contents and mobile collapsible table of contents from the existing H2 headings.
- Search behavior and the current empty/available content state remain truthful.
- One final `npm run build` passes after the final source state.
- The release commit is pushed to `origin/main` without including unrelated files.
- Vercel serves the new production build.
- Production `/blog` and `/blog/38-2` return HTTP 200.
- Production `/blog/38-2` contains the article TOC and heading anchors.
- No Critical or High regression is found in routing, metadata generation, article rendering, sitemap generation, or mobile layout.
- The empty-title test post remains explicitly reported as a CMS content issue; the deployment is not described as a content-quality improvement.

## Ordered Actions After Approval

1. Create the exact release backup and record its location.
2. Start or reuse `npm run dev:preview` on `127.0.0.1:3001`.
3. Verify `/blog` and `/blog/38-2` at desktop and mobile widths, including the TOC.
4. Run `git diff --check` and one final `npm run build`.
5. Create the release result record.
6. Stage only the listed source and blog documentation files; inspect the staged diff.
7. Commit directly to `main` and push to `origin/main`.
8. Wait for the Vercel production deployment and validate the two live routes and TOC.
9. Report the commit, production evidence, remaining test-content limitation, and rollback point.

---

# 博客前端正式发布——准备说明

日期：2026-09-10
状态：仅准备；本阶段尚未提交、推送或触发正式部署。

## 发布目标

把已经在本地完成的博客新闻列表页和文章详情页新版前端发布到 Vercel 正式站。当前线上测试文章已有四个 H2，但仍使用旧版文章模板，因此没有目录；本次发布将上线桌面粘性目录、移动折叠目录、分享、CTA、新版详情布局，以及新版博客列表、搜索、分类、轮播和分页。

## 精确范围

仅发布 6 个博客前端源码文件及对应阶段记录。WordPress 插件、ZIP、备份、脚本、其他文档和所有无关用户文件均不进入提交。本次不修改测试文章的标题、别名、分类、图片或正文，也不改 Vercel 配置与环境变量。

## 验收与回滚

- 发布前创建精确备份，生产回滚基线为 `4ca8901`。
- 本地桌面与 390 × 844 移动端验证 `/blog` 和 `/blog/38-2`。
- `git diff --check` 与最终 `npm run build` 通过。
- 仅将限定文件提交到 `main` 并推送 `origin/main`。
- 等待 Vercel 完成后验证正式站两个路由为 200，文章目录与标题锚点出现。
- 测试文章空标题和占位内容继续作为 CMS 内容问题单独报告，不把本次发布描述为内容质量提升。

批准后才会执行备份、预览、构建、提交、推送和线上验证。
