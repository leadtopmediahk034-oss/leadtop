# Blog Article Template — Stage 9 Result

Date: 2026-09-10
Status: implemented locally; not installed in the live CMS and not deployed.

## Delivered

- Leadtop-colored editorial article detail layout based on the approved reference hierarchy.
- Server-generated H2/H3 directory with unique IDs, duplicate-title handling, desktop sticky navigation, mobile disclosure, active-section tracking, smooth anchors, and keyboard-accessible controls.
- Article header utilities, standfirst, featured image, consultation CTA, share controls, and automatic next article.
- WordPress-native `Leadtop 标准新闻文章` Gutenberg pattern and automatic skeleton for new ordinary posts only.
- Editor-side `Leadtop 发布检查` checklist.
- WordPress plugin version 1.2.0 and a local installable ZIP.
- Bilingual editor guide.

## Applied Visual System

- Warm ivory reading surface, deep navy type, sand dividers, and burnt orange reserved for active state and conversion actions.
- Desktop article grid: approximately 210 px directory / 740 px reading column / 210 px consultation rail with generous gaps.
- Article title: responsive 48–68 px range; body: approximately 17–18 px with 1.8 line height.
- Desktop directory: open vertical rail with a 2 px orange current-section marker; no surrounding card.
- Mobile: 24 px article gutters, 32–43 px title range, 44 px minimum directory targets, and a flat disclosure separated by rules.
- Media: controlled landscape frames, restrained 10–18 px radii, and an image-led next-article banner.

## Evidence and Validation

- Pre-change snapshot: `.codex-backups/blog-article-20260910-123334/`.
- Three standalone visual references were generated and inspected before implementation: desktop header/body/navigation, desktop CTA/next article, and 390 px mobile article.
- Heading conversion test passed for Chinese H2, H3, and duplicate heading IDs.
- `git diff --check` passed before the final build.
- `npm run build` passed with `/blog/[slug]` included in the generated route set.
- The empty-state `/blog` page was checked in the local browser after hot reload and remained functional.
- PHP CLI is not installed on this host, so `php -l` remains required before installing the ZIP in WordPress.
- Plugin ZIP: `wordpress/leadtop-inquiries-1.2.0.zip`, SHA-256 `12fdd23d076ad478d1179c54c51574c749bd5b0077163fb10bd982733539b307`.

## Remaining Release Checks

- Run `php -l` for all plugin PHP files in the CMS staging environment.
- Install plugin 1.2.0 in WordPress staging and create one controlled draft article.
- Confirm skeleton insertion, pattern insertion, checklist visibility, excerpt, featured image ALT, categories, and save/revalidation behavior.
- Preview the populated article at desktop and 390 px mobile widths.
- Confirm share URLs, heading anchors, active navigation, CTA, next article, Canonical, Open Graph, and Article JSON-LD.
- Publishing, deployment, Git commit, and Git push remain outside this approved scope.

No SEO performance improvement is claimed because the CMS currently has no published article baseline and no post-release observation window.

---

# 博客文章模板——阶段 9 结果

日期：2026-09-10
状态：已在本地完成；未安装到线上 CMS，未部署。

## 已交付

- 使用 Leadtop 配色、对齐已批准参考层级的文章详情阅读布局。
- 服务端自动生成 H2/H3 目录，支持唯一 ID、重复标题、桌面吸顶、移动折叠、当前章节追踪、平滑锚点和键盘操作。
- 文章头部操作、导语、特色图、咨询 CTA、分享与自动下一篇。
- WordPress 原生 `Leadtop 标准新闻文章` Gutenberg 样板，以及只对新建普通文章生效的自动骨架。
- 编辑器侧 `Leadtop 发布检查` 清单。
- WordPress 插件 1.2.0 与本地可安装 ZIP。
- 中英文运营指南。

## 已应用的视觉系统

- 米白阅读底色、深海军蓝文字、沙色分隔线，橙色只用于当前状态和转化行动。
- 桌面文章网格约为 210 px 目录 / 740 px 正文 / 210 px 咨询栏，并保留充足间距。
- 文章标题响应式范围约 48–68 px；正文约 17–18 px、1.8 倍行高。
- 桌面目录使用开放式竖向导轨和 2 px 橙色当前章节标记，不套卡片。
- 移动端使用 24 px 正文边距、32–43 px 标题、至少 44 px 的目录触控区域，以及上下分隔线的扁平折叠目录。
- 媒体采用固定横向比例、克制的 10–18 px 圆角和图片主导的下一篇横幅。

## 证据与验证

- 修改前快照：`.codex-backups/blog-article-20260910-123334/`。
- 编码前生成并检查了三张独立视觉参考：桌面文章头部/正文/目录、桌面 CTA/下一篇、390 px 移动文章。
- 中文 H2、H3 与重复标题 ID 的转换测试通过。
- 最终构建前 `git diff --check` 通过。
- `npm run build` 通过，生成路由包含 `/blog/[slug]`。
- 热更新后在本地浏览器检查了 CMS 空状态 `/blog`，功能保持正常。
- 当前主机没有 PHP CLI，因此安装 ZIP 前仍需在 WordPress 环境执行 `php -l`。
- 插件 ZIP：`wordpress/leadtop-inquiries-1.2.0.zip`，SHA-256 为 `12fdd23d076ad478d1179c54c51574c749bd5b0077163fb10bd982733539b307`。

## 剩余发布检查

- 在 CMS 测试环境对全部插件 PHP 文件执行 `php -l`。
- 在 WordPress 测试环境安装插件 1.2.0，并创建一篇受控草稿。
- 确认自动骨架、手动样板、发布检查、摘要、特色图 ALT、分类与保存刷新流程。
- 在桌面端和 390 px 移动端预览有内容的文章。
- 确认分享 URL、标题锚点、当前目录状态、CTA、下一篇、Canonical、Open Graph 与 Article JSON-LD。
- 发布、部署、Git 提交和推送仍不在当前批准范围内。

由于 CMS 当前没有已发布文章基线，也没有发布后的观察窗口，本次不宣称 SEO 表现已经提升。
