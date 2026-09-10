# Blog News Index Redesign — Stage 9 Preparation

Date: 2026-09-10
Status: Preparation only; no optimization or production code change is authorized yet.

## Stage and Gate

- SOP stage: Stage 9, Content Production and Page Optimization.
- Applicable gate: Gate 2, permission to begin page and content construction.
- Gate status for this narrow task: not revalidated in full. The implementation must wait for the exact approval phrase `开始优化`.
- URL decision: retain the existing `/blog` index and `/blog/[slug]` article routes. Do not create a competing `/news` route.

## Evidence and Baseline

- Reference page: `https://www.meetsocial.com/news`, inspected on 2026-09-10 (China, desktop HTML/CSS source).
- Target page: `https://www.leadtopmedia.com/blog`, inspected on 2026-09-10.
- Current implementation: `app/blog/page.jsx`, `app/blog/Blog.module.css`, `app/blog/[slug]/page.jsx`, `lib/wordpress.js`, and `app/sitemap.js`.
- Current target metadata: canonical `/blog`; title `Growth Insights | Leadtop 数字营销`; description covers independent sites, Google Ads, SEO/GEO, content, conversion, and overseas growth.
- Current sitemap already contains `/blog` and WordPress article URLs.
- WordPress REST baseline: HTTP 200; `X-WP-Total: 0`, `X-WP-TotalPages: 0` on 2026-09-10. Visual verification with real cards is therefore blocked until posts exist; no sample claims or fabricated articles will be published.
- Existing unrelated untracked files are present and must remain untouched.

## Reference Pattern to Reproduce

- Pale blue page background (`#f7faff`) and generous editorial spacing.
- Centered oversized bilingual heading: English display line above a blue Chinese title.
- Featured-news area using a large white rounded panel, image-led split layout, carousel pagination, and restrained arrow control.
- Filter row with rounded category tabs and a search field.
- Three-column desktop article grid; each card has a roughly 62% image ratio, date, two-line title, rounded corners, and blue hover treatment.
- Centered Prev / numbered pages / Next pagination.
- Mobile layout: stacked feature panel, two-column-style category tab wrapping, full-width search, single-column cards, and compact pagination.

Leadtop branding, navigation, WordPress content, URLs, and conversion paths remain authoritative. Competitor text, logos, news, claims, and media will not be copied.

## Prepared Scope

Affected files/systems after approval:

- `app/blog/page.jsx`: rebuild the index hierarchy and query-driven states.
- `app/blog/Blog.module.css`: reproduce the reference layout, responsive behavior, hover states, and visual rhythm while preserving article-detail styles.
- `lib/wordpress.js`: add the minimum read-only WordPress query support required for category filtering and search, if needed by the approved 1:1 interaction scope.
- `docs/`: save the final validation record.

Not in scope:

- Article-detail redesign.
- WordPress publishing, CMS edits, production deployment, external uploads, or copied competitor assets/content.
- Route changes, redirects, navigation restructuring, or unrelated homepage/component refactors.

## Backup and Restore

Immediately before the first approved code write, create a timestamped recoverable snapshot of every affected existing file under `.codex-backups/blog-news-<timestamp>/`. Record source files, timestamp, scope, and restore commands in the final result. The backup will remain untracked and retained unless deletion is separately approved after acceptance checks pass.

## Acceptance Criteria

- `/blog` keeps its canonical URL and existing WordPress-backed content contract.
- Desktop and mobile layouts visibly match the reference hierarchy and proportions, adapted only for Leadtop branding and content.
- Featured content, category filter, search, cards, empty/results states, and pagination are keyboard-accessible and use valid URLs/query parameters.
- Empty CMS state remains truthful and visually intentional.
- Existing `/blog/[slug]` rendering, metadata, schema, sitemap coverage, header, and footer are not regressed.
- `git diff --check` passes.
- Desktop and mobile checks pass at the affected page.
- One final `npm run build` passes after the final edit.
- No unrelated user changes are modified; no commit, push, or deployment occurs unless separately requested.

## Ordered Actions After Approval

1. Create and record the pre-change backup.
2. Generate one desktop and one mobile Leadtop news-index visual reference, then inspect typography, spacing, colors, cards, filters, controls, and responsive behavior before coding, as required by the image-to-code skill.
3. Implement the `/blog` index and only the minimal WordPress query additions needed for filters/search.
4. Start or reuse `npm run dev:preview` at `http://127.0.0.1:3001`.
5. Verify the affected page at desktop and mobile widths, including empty state and query behavior available with the current CMS dataset.
6. Run `git diff --check` and one final `npm run build`.
7. Save the result record with changed files, evidence, validation, limitations, and rollback instructions.

## Risks and Assumptions

- “1:1” is interpreted as visual structure, proportions, interaction model, and responsive behavior—not copying protected brand assets or editorial content.
- The requested “new page” is interpreted as a news-style redesign of the existing `/blog` page, because the user explicitly selected that URL.
- With zero published WordPress posts, final card-content parity cannot be proven against production data in this stage. The implementation can still validate layout, empty state, build integrity, and query handling.
- Browser visual attachment timed out twice during preparation. The reference DOM and production CSS were inspected directly; post-approval verification will use the local preview and will record any remaining visual-tool limitation.

## 中文版本

# 博客新闻列表页重做——阶段 9 准备

日期：2026-09-10
状态：仅准备；尚未授权优化或修改生产代码。

## 阶段与 Gate

- SOP 阶段：阶段 9「内容生产与页面优化」。
- 适用 Gate：Gate 2「允许开始页面和内容建设」。
- 本次窄范围 Gate 状态：尚未完整复核。实施必须等待准确口令 `开始优化`。
- URL 决策：保留现有 `/blog` 列表页和 `/blog/[slug]` 文章页，不创建相互竞争的 `/news` 路由。

## 证据与基线

- 参考页：`https://www.meetsocial.com/news`，2026-09-10 检查（中国地区、桌面端 HTML/CSS 源码）。
- 目标页：`https://www.leadtopmedia.com/blog`，2026-09-10 检查。
- 当前实现：`app/blog/page.jsx`、`app/blog/Blog.module.css`、`app/blog/[slug]/page.jsx`、`lib/wordpress.js`、`app/sitemap.js`。
- 当前目标页元数据：Canonical 为 `/blog`；标题为 `Growth Insights | Leadtop 数字营销`；描述覆盖独立站、Google Ads、SEO/GEO、内容、转化与海外增长。
- 当前 Sitemap 已包含 `/blog` 与 WordPress 文章 URL。
- WordPress REST 基线：2026-09-10 返回 HTTP 200、`X-WP-Total: 0`、`X-WP-TotalPages: 0`。在 CMS 有文章前，真实卡片视觉验收受限；不会发布示例业绩或虚构文章。
- 仓库存在与本任务无关的未跟踪文件，必须保持不动。

## 需要复刻的参考模式

- 浅蓝页面背景（`#f7faff`）与宽松的编辑式留白。
- 居中的超大双语标题：英文展示标题在上、蓝色中文标题在下。
- 重点新闻区采用大尺寸白色圆角面板、图片主导的左右分栏、轮播分页点和克制的箭头控件。
- 圆角分类 Tab 与搜索框组成筛选行。
- 桌面三列文章网格；卡片图片比例约 62%，包含日期、两行标题、圆角和蓝色 Hover 状态。
- 居中的 Prev / 页码 / Next 分页。
- 移动端采用重点内容纵向堆叠、分类 Tab 两列换行、搜索框满宽、单列卡片和紧凑分页。

Leadtop 的品牌、导航、WordPress 内容、URL 与转化路径保持权威。不会复制竞品文案、Logo、新闻、宣传数据或媒体素材。

## 已准备范围

批准后可能影响的文件/系统：

- `app/blog/page.jsx`：重建列表页层级和查询状态。
- `app/blog/Blog.module.css`：复刻参考布局、响应式、Hover 和页面节奏，同时保留文章详情样式。
- `lib/wordpress.js`：如 1:1 交互需要，增加最小化的 WordPress 分类筛选与搜索只读查询支持。
- `docs/`：保存最终验证记录。

不在范围内：

- 文章详情页重做。
- WordPress 发布、CMS 修改、生产部署、外部上传，或复制竞品资产/内容。
- 路由变更、重定向、导航重构，或无关首页/组件重构。

## 备份与恢复

在获得批准后的首次代码写入前，将所有受影响的既有文件保存到 `.codex-backups/blog-news-<timestamp>/` 的带时间戳可恢复快照，并在结果记录中写明源文件、时间、范围和恢复命令。备份不纳入 Git；除非验收全部通过且用户另行批准删除，否则持续保留。

## 验收标准

- `/blog` 保持原 Canonical 与 WordPress 内容数据契约。
- 桌面和移动端的层级与比例明显对齐参考页，仅按 Leadtop 品牌和内容做必要适配。
- 重点内容、分类筛选、搜索、卡片、空状态/结果状态与分页具备键盘可访问性，并使用有效 URL/查询参数。
- CMS 空内容状态真实且视觉完整。
- 现有 `/blog/[slug]` 渲染、元数据、Schema、Sitemap、页头与页脚不回归。
- `git diff --check` 通过。
- 受影响页面桌面端和移动端检查通过。
- 最终编辑后只运行一次 `npm run build` 并通过。
- 不修改无关用户改动；除非另行要求，不提交、不推送、不部署。

## 批准后的执行顺序

1. 创建并记录改动前备份。
2. 按 image-to-code 技能要求，先生成一张桌面端与一张移动端 Leadtop 新闻列表视觉参考，再分析字体、间距、颜色、卡片、筛选、控件和响应式行为，然后编码。
3. 实现 `/blog` 列表页，以及筛选/搜索所需的最小 WordPress 查询扩展。
4. 启动或复用 `http://127.0.0.1:3001` 的 `npm run dev:preview`。
5. 在桌面与移动宽度检查页面，并在当前 CMS 数据范围内验证空状态与查询行为。
6. 运行 `git diff --check` 和一次最终 `npm run build`。
7. 保存结果记录，包括改动文件、证据、验证、限制和回滚说明。

## 风险与假设

- “1:1”解释为复刻视觉结构、比例、交互模式和响应式行为，不复制受保护的品牌资产或编辑内容。
- 用户明确指定 `/blog`，因此“new 页面”解释为把现有 `/blog` 重做成 news 风格，而不是新增 `/news`。
- WordPress 当前没有已发布文章，本阶段无法用生产内容证明卡片区完全一致；仍可验证布局、空状态、构建完整性和查询处理。
- 准备阶段的浏览器可视化连接连续两次超时；已直接检查参考页 DOM 和生产 CSS。批准后将用本地预览做视觉验收，并记录仍存在的可视化工具限制。
