# Blog Frontend Production Release — Stage 9 Result

Date: 2026-09-10
Status: Production release complete and validated.

## Release Outcome

The redesigned blog news index and article-detail experience were committed to `main`, pushed to `origin/main`, and deployed by Vercel.

- Release commit: `9a28e74` (`feat: publish blog news and article experience`)
- Previous production baseline: `4ca8901`
- Production site: `https://www.leadtopmedia.com`
- Validation completed: 2026-09-10 16:02:47 +08:00

The release includes:

- Redesigned `/blog` news index.
- Featured article carousel.
- WordPress category navigation and search.
- Paginated article cards.
- Redesigned article header and three-column desktop body.
- Sticky desktop article table of contents.
- Collapsible mobile article table of contents.
- Heading anchors and active-section tracking.
- LinkedIn, X, native/mobile, and copy-link share controls.
- Article CTA and next-article treatment.
- Updated WordPress data normalization for headings, categories, pagination, and adjacent posts.

## Pre-Release Validation

- Dedicated backup created at `.codex-backups/blog-production-release-20260910-155236/`.
- The backup contains the six production source files and the tracked source diff.
- Local `/blog/38-2` desktop check passed with four sticky TOC links.
- Local `/blog/38-2` check at 390 × 844 passed with the expanded collapsible TOC and four links.
- Local `/blog` desktop and mobile checks passed with the published test-post data.
- Temporary browser viewport override was reset.
- `git diff --check` passed after Markdown formatting cleanup.
- `npm run build` passed with Next.js 16.2.10.
- All 20 generated routes completed, including `/blog`, `/blog/[slug]`, and `/sitemap.xml`.
- Only the 12 scoped blog source and documentation files entered the release commit.

## Production Validation

Validated with cache-busting release parameters after Vercel switched production:

- `https://www.leadtopmedia.com/blog` — HTTP 200.
- `https://www.leadtopmedia.com/blog/38-2` — HTTP 200.
- `https://www.leadtopmedia.com/sitemap.xml` — HTTP 200.
- Production article HTML contains the desktop TOC.
- Production article HTML contains the mobile TOC.
- Production article HTML contains four TOC labels and four matching H2 IDs.
- `HEAD` and `origin/main` both resolved to `9a28e74` during production validation.

No Critical or High routing, rendering, TOC, build, or sitemap regression was observed.

## Content Limitation

WordPress post 38 is intentionally a temporary test post. It still has an empty title, numeric slug `38-2`, default category, no featured image, and placeholder template content. As a result, the production page has an empty headline and incomplete title metadata. This is an existing CMS content issue, not a frontend release regression, and no content-quality improvement is claimed.

After visual testing, change the post back to draft or replace every placeholder field before treating it as a real public article.

## Backup and Rollback

- Release backup: `.codex-backups/blog-production-release-20260910-155236/`
- Earlier backups retained:
  - `.codex-backups/blog-news-20260910-112500/`
  - `.codex-backups/blog-article-20260910-123334/`
- Git rollback baseline: `4ca8901`

If rollback is required, revert release commit `9a28e74` on `main` and push the revert so Vercel restores the previous frontend. No rollback was needed or performed.

## Scope Confirmation

No CMS post, WordPress data, plugin, ZIP archive, environment variable, or Vercel setting was changed during this release. Unrelated working-tree files remained untracked and were not committed.

---

# 博客前端正式发布——阶段 9 结果

日期：2026-09-10
状态：正式发布与线上验证完成。

## 发布结果

新版博客新闻列表页和文章详情页已经提交到 `main`、推送至 `origin/main`，并由 Vercel 发布到正式站。

- 发布提交：`9a28e74`
- 上一生产基线：`4ca8901`
- 正式站：`https://www.leadtopmedia.com`
- 验证时间：2026-09-10 16:02:47 +08:00

## 验证结果

- 本地桌面端文章目录：通过，共 4 项。
- 390 × 844 移动端折叠目录：通过，共 4 项。
- 本地新闻列表桌面与移动布局：通过。
- `git diff --check`：通过。
- `npm run build`：通过，20 个路由正常生成。
- 正式 `/blog`：HTTP 200。
- 正式 `/blog/38-2`：HTTP 200。
- 正式 `/sitemap.xml`：HTTP 200。
- 线上文章已包含桌面目录、移动目录和 4 个对应的 H2 锚点。
- 验证时 `HEAD` 与 `origin/main` 均为 `9a28e74`。

未发现 Critical 或 High 级路由、渲染、目录、构建或 Sitemap 回归。

## 测试文章限制

文章 38 仍是临时测试内容：标题为空、别名为 `38-2`、使用默认分类、没有特色图片，正文仍是占位提示。因此线上标题和 Meta 信息不完整。这是已有 CMS 内容问题，不是本次前端发布回归。

测试完成后，应将文章改回草稿，或补齐全部字段并替换所有占位内容后再作为正式文章保留。

## 回滚

发布备份位于 `.codex-backups/blog-production-release-20260910-155236/`，生产回滚基线为 `4ca8901`。本次验收通过，未执行回滚。CMS、插件、ZIP、环境变量和 Vercel 设置均未修改，无关工作区文件未进入提交。
