# Blog Article Scroll UI — Preparation

Date: 2026-09-10
Status: preparation only; revised after scope expansion. No production source, commit, push, or deployment change has been made in this stage.

## Stage and Gate

- SOP stage: Stage 9, existing-page interaction refinement and release validation.
- Applicable gate: Gate 2 remains applicable.
- Production baseline: `5cdcbfd` on `main` and `origin/main`.
- Primary implementation guidance: `redesign-existing-projects`, used to keep the change targeted, semantic, accessible, and within the existing React/CSS Modules/Phosphor stack.

## Requested Changes

1. Remove the article-detail CTA section containing “让下一次全球增长 更清晰”.
2. Keep the desktop article table of contents visibly fixed while the reader scrolls through the article.
3. Turn the mobile article TOC into a compact sticky directory bar that remains available while reading and expands to show its links.
4. Hide the site header site-wide while scrolling down and reveal it while scrolling up.

## Current Diagnosis

- The removable CTA is an independent `articleCta` section in `app/blog/[slug]/page.jsx` with matching rules in `app/blog/Blog.module.css`.
- The desktop TOC currently applies `position: sticky` directly to a CSS Grid item. A dedicated full-height rail with an inner sticky navigation is more reliable and makes the intended scrolling behavior explicit.
- The mobile TOC currently stays in normal document flow and scrolls out of view with the article.
- The shared `SiteHeader` is fixed but has no scroll-direction state or hidden style. The revised request intentionally applies direction-aware hiding to the shared header across the whole site.

## Exact Scope

- `app/blog/[slug]/page.jsx`
- `app/blog/[slug]/ArticleToc.jsx`
- `app/blog/Blog.module.css`
- `components/SiteChrome.jsx`
- `components/LeadtopHomepage.module.css`
- This revised preparation record and a result record.

No CMS post, WordPress plugin, blog content, footer, environment variable, external service configuration, or other working-tree file is included. Header scroll behavior changes site-wide because every page uses the shared header.

## Intended Behavior

- The article CTA section is absent; the article proceeds from body/share content directly to the optional next-article banner or footer.
- At desktop widths, a full-height left rail remains in the article Grid and its inner TOC stays sticky while the article body scrolls.
- Active-heading tracking and smooth anchor navigation remain unchanged.
- At mobile widths, the TOC becomes a compact sticky bar. It remains reachable during article reading, can expand/collapse without covering the current section unnecessarily, and moves below the header when the header is visible.
- On every site page, the header hides after deliberate downward scrolling beyond the top region and reappears on upward scrolling or when returning near the top.
- Opening the mobile navigation keeps the header visible.
- The header transition uses transform and opacity and respects the existing reduced-motion rules.

## Backup and Rollback

Immediately after approval and before the first source write, create a timestamped backup of the five exact source files. The production Git rollback baseline is `5cdcbfd`. If production validation finds a Critical or High regression, revert only the release commit and push the revert. Preserve the backup until the result is validated.

## Acceptance Criteria

- “让下一次全球增长 更清晰” and its article CTA container are absent from the article detail page.
- Desktop TOC remains visible and fixed during a long downward scroll through the current four-heading test article.
- TOC links and active-heading highlighting continue to work.
- Mobile TOC remains visible as a sticky compact bar during a long article scroll and expands/collapses correctly.
- The mobile TOC does not overlap the site header when the header reappears.
- The shared site header hides on downward scroll and reappears on upward scroll and near page top across article, blog index, homepage, case, and service page checks.
- Mobile navigation can open without the header being hidden.
- Desktop and 390 × 844 article checks pass.
- `git diff --check` and one final `npm run build` pass.
- Only scoped files are committed to `main` and pushed to `origin/main`.
- Vercel production article returns HTTP 200 and exposes the updated TOC/header behavior without the removed CTA.

## Ordered Actions After Approval

1. Create the exact pre-change backup.
2. Remove the article CTA markup and unused scoped CSS.
3. Introduce the dedicated desktop TOC rail and the sticky mobile directory bar.
4. Add direction-aware hiding to the shared site header across all pages, including safe mobile-menu behavior.
5. Run local desktop/mobile interaction checks on the article plus representative homepage, blog index, case, and service routes.
6. Run diff checks and one final build.
7. Save the result record, stage only scoped files, inspect the staged diff, commit to `main`, and push.
8. Validate the production article and report the release commit and rollback point.

---

# 博客文章滚动交互——准备说明

日期：2026-09-10
状态：仅准备；已根据扩展范围更新，尚未修改生产源码、提交、推送或部署。

## 本次调整

- 删除文章详情页底部“让下一次全球增长 更清晰”CTA 区块。
- 将桌面目录改成“整高轨道 + 内层粘性目录”，阅读正文时持续固定显示。
- 移动端增加紧凑的固定目录栏，阅读时持续可用，并可展开/收起目录链接。
- 全站向下滚动时隐藏导航栏，向上滚动或回到顶部时恢复。

导航隐藏应用于所有使用共享导航的页面。移动菜单打开时导航保持可见；文章页的移动目录会根据导航显示状态调整固定位置，避免相互遮挡。

## 影响范围

仍只修改文章详情、目录组件、博客样式、共享导航组件及导航样式，共 5 个源码文件，并保存阶段记录。共享导航滚动行为会影响全站；CMS 文章、WordPress 插件、页脚、环境变量和其他工作区文件均不在范围内。

## 验收与发布

- 桌面端长距离滚动时目录持续固定，链接与高亮正常。
- 移动端长距离滚动时保持紧凑固定目录栏，展开/收起与目录链接正常，且不遮挡重新出现的导航。
- 首页、新闻列表、文章、案例与服务代表页面均实现下滑隐藏导航，上滑及接近顶部恢复。
- 移动导航打开时保持正常。
- CTA 完全移除。
- 桌面、390 × 844、差异检查和最终构建通过。
- 仅提交限定文件到 `main`，推送后验证 Vercel 正式页。

批准后将先备份，生产回滚基线为 `5cdcbfd`。
