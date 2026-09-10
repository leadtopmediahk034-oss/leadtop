# Blog Article Template — Stage 9 Preparation

Date: 2026-09-10
Status: Preparation only. No article-template, WordPress plugin, CMS, or frontend change is authorized yet.

## Stage and Gate

- SOP stage: Stage 9, Content Production and Page Optimization.
- Applicable gate: Gate 2.
- Scope type: article-detail template and editor workflow; the existing `/blog/[slug]` URL pattern and keyword ownership do not change.
- Implementation must wait for the exact approval phrase `开始优化`.

## Evidence and Current Baseline

- Reference article: `https://www.meetsocial.com/news/123`, HTML and production CSS inspected on 2026-09-10.
- Existing Leadtop detail route: `app/blog/[slug]/page.jsx`.
- Existing data layer: `lib/wordpress.js` reads standard WordPress post fields and sanitizes rendered body HTML.
- Existing CMS integration: the local `Leadtop 询盘管理` WordPress plugin already listens for ordinary post changes and notifies Next.js revalidation.
- Current WordPress published-post baseline remains zero, so a populated production-data detail page is not available for local visual comparison.
- The current sanitizer keeps headings, paragraphs, lists, blockquotes, links, images, figures, captions, code and tables. It removes scripts, forms, buttons, iframes, SVG, inline events and arbitrary styling. The editor template must therefore use semantic native Gutenberg blocks rather than pasted page HTML.
- The current worktree contains the approved `/blog` index redesign and unrelated user files. All must be preserved.

## Reference Structure to Adapt

The MeetSocial reference uses:

1. A narrow centered article column, approximately 56% of the desktop viewport.
2. A utility row with a back control and share actions.
3. A large 2–3 line H1.
4. Category, publication date, and source metadata.
5. A long-form single-column body with strong paragraphs and full-width rounded images.
6. A large image-led “Next” article banner.
7. A global consultation CTA and footer.
8. On mobile, the same reading order collapses cleanly with smaller type, wider relative content width, and a compact next-article banner.

Leadtop will retain its own ivory, navy, sand, and orange palette. Competitor copy, claims, logos, images, share QR code, and blue color system will not be copied.

## Concrete Leadtop Article Template

### CMS fields the operator completes

| Field | Required | Frontend use |
| --- | --- | --- |
| Title | Yes | H1, browser title, Open Graph title, Article headline |
| Excerpt | Yes | Article standfirst and Meta Description |
| Featured image + ALT | Yes | Article hero, Open Graph image, Article image |
| Category | Yes | Article label and `/blog` filter |
| Author | Yes | Metadata and Article author |
| Publication date | Automatic/review | Metadata and `datePublished` |
| Slug | Review | Stable `/blog/[slug]` URL |
| Body blocks | Yes | Semantic long-form article content |

No code, HTML, CSS, schema, share URL, next-article URL, or CTA markup is entered by the operator.

### Automatic Gutenberg body skeleton

Every new ordinary WordPress post will open with a reusable `Leadtop 标准新闻文章` pattern:

```text
导语段落：用 2–3 句说明发生了什么、为什么重要

H2：背景与核心变化
正文段落
正文段落
图片（要求填写 ALT）
图片说明

H2：关键内容或方法
正文段落
要点列表
引用 / 关键结论

H2：对出海企业意味着什么
正文段落
正文段落

H2：结论
总结段落
```

The skeleton uses only native Paragraph, Heading, Image, List, Quote, and optional Table blocks. Editors may duplicate or remove a section without touching markup. Existing posts are not overwritten.

### Automatic article navigation

- Build the directory from sanitized `h2` and `h3` headings; operators do not create or maintain anchor links.
- Generate unique heading IDs on the server, including deterministic suffixes for duplicate headings.
- Desktop: render a sticky chapter rail to the left of the narrow reading column.
- Mobile: render an accessible collapsible directory above the article body.
- Highlight the current section while scrolling; clicking an item scrolls to the section and updates the URL hash.
- Support keyboard navigation and offset anchors for the fixed site header with `scroll-margin-top`.
- Hide the directory automatically when an article has fewer than two eligible headings.

### Frontend-owned template regions

```text
Site header
→ Back to news + share actions
→ Category / date / author
→ H1
→ Excerpt standfirst
→ Featured image
→ Automatic article navigation + CMS body blocks
→ Automatic consultation CTA
→ Automatic next article
→ Site footer
```

The next article is selected automatically from WordPress by publication order, with a fallback to the newest other article. Share actions generate the current canonical URL. Article JSON-LD remains frontend-generated.

## Prepared Implementation Scope

After approval, the implementation may change only:

- `app/blog/[slug]/page.jsx`: render the new article hierarchy, navigation data, share controls, CTA, and automatic next article.
- `app/blog/[slug]/ArticleToc.jsx`: provide active-section tracking and desktop/mobile navigation interactions.
- `app/blog/Blog.module.css`: add Leadtop article-detail desktop/mobile styles while preserving the approved index page.
- `lib/wordpress.js`: expose only the additional standard post fields and next-article query required by the template.
- `wordpress/leadtop-inquiries/`: add a self-contained Gutenberg article-template module, an editor-side publishing checklist, plugin version update, and local package rebuild.
- `docs/`: save the editor guide and final validation record.

Not in scope:

- Publishing or modifying WordPress posts.
- Uploading/installing the plugin in the live CMS.
- Changing existing article URLs, redirects, navigation, `/blog` index structure, or unrelated site pages.
- Adding ACF, Elementor, a page builder, or another dependency.
- Deploying, committing, or pushing unless separately requested.

## Backup and Restore

Immediately before the first approved write, create a new timestamped snapshot containing the current versions of the affected Next.js files and the complete `wordpress/leadtop-inquiries/` plugin directory. The snapshot must preserve the already-approved `/blog` index work. Record the exact source, scope, location, timestamp, and restore steps. Keep it untracked and retain it unless deletion is separately approved after all acceptance checks pass.

## Acceptance Criteria

- A non-technical editor can click “新建文章” and receive the complete body skeleton automatically.
- The same pattern is available for manual insertion as `Leadtop 标准新闻文章`.
- Existing posts remain unchanged and editable.
- The editor sees a concise publishing checklist for title, excerpt, featured image, ALT, category, slug, and body structure.
- The frontend visually follows the reference reading hierarchy using Leadtop colors.
- Article headings automatically produce a sticky desktop navigation and collapsible mobile directory with active-section feedback.
- Navigation, share actions, back navigation, CTA, and next article are generated automatically and are keyboard accessible.
- Title, excerpt, canonical, Open Graph, image, author, dates, and Article JSON-LD remain aligned.
- Sanitized WordPress content renders headings, paragraphs, images, captions, lists, quotes, links, code, and tables without accepting unsafe markup.
- Desktop and 390 px mobile layouts pass local visual checks where fixture data permits.
- `php -l` passes for every changed PHP file.
- `git diff --check` and one final `npm run build` pass.
- A local plugin ZIP is rebuilt; no live CMS upload or installation occurs.

## Ordered Actions After Approval

1. Create the pre-change Next.js and WordPress plugin backup.
2. Generate separate desktop article-header/body/navigation, desktop next-article/CTA, and mobile article reference images in Leadtop colors; inspect typography, gutters, media frames, metadata, controls, navigation states, and reading rhythm before coding.
3. Implement the native Gutenberg pattern and automatic new-post skeleton without affecting existing posts.
4. Add the editor checklist and update the local WordPress plugin package/version.
5. Implement the frontend article template and automatic H2/H3 navigation, including sticky desktop and collapsible mobile behavior.
6. Add the automatic next article, CTA, and share controls.
7. Reuse the running local preview and validate desktop/mobile behavior and navigation state. Because the production CMS is empty, use only a local non-published fixture or generated reference for populated-layout checks; do not write test content to the CMS.
8. Run PHP syntax checks, `git diff --check`, and one final Next.js build.
9. Save the operator guide and result record with rollback instructions and the remaining live-CMS installation step.

## Risks and Assumptions

- “Template” means a native Gutenberg editing skeleton plus a fixed frontend presentation, not a copied HTML document.
- The reference page currently has weak canonical/Open Graph implementation; Leadtop will preserve its stronger per-article metadata rather than copy those defects.
- The current CMS has no published article, so end-to-end production-content acceptance requires a later controlled test article after plugin installation.
- Remote visual attachment timed out during preparation. The reference HTML and CSS were collected directly; generated design references and local previews will be used during implementation.

## 中文版本

# 博客文章模板——阶段 9 准备

日期：2026-09-10
状态：仅准备；尚未授权修改文章模板、WordPress 插件、CMS 或前端。

## 阶段与 Gate

- SOP 阶段：阶段 9「内容生产与页面优化」。
- 适用 Gate：Gate 2。
- 范围类型：文章详情模板与编辑流程；现有 `/blog/[slug]` URL 和关键词归属不变。
- 实施必须等待准确口令 `开始优化`。

## 证据与当前基线

- 参考文章：`https://www.meetsocial.com/news/123`，2026-09-10 检查 HTML 与生产 CSS。
- Leadtop 当前详情路由：`app/blog/[slug]/page.jsx`。
- 当前数据层：`lib/wordpress.js` 读取 WordPress 标准文章字段并清洗正文 HTML。
- 当前 CMS 集成：本地 `Leadtop 询盘管理` WordPress 插件已监听普通文章变更并通知 Next.js 刷新缓存。
- WordPress 当前仍为 0 篇已发布文章，因此暂时没有可供本地对比的真实详情页。
- 当前安全清洗保留标题、段落、列表、引用、链接、图片、Figure、图片说明、代码和表格；会移除脚本、表单、按钮、iframe、SVG、内联事件和任意样式。因此编辑模板应使用语义化 Gutenberg 原生区块，而不是复制整页 HTML。
- 当前工作区包含已批准的 `/blog` 列表页重做和其他用户文件，必须全部保留。

## 参考页结构

MeetSocial 参考页采用：

1. 桌面端约占视口 56% 的窄幅居中阅读栏。
2. 返回与分享操作行。
3. 约 54px、2–3 行的 H1。
4. 分类、发布日期和来源信息。
5. 长文单栏正文、重点粗体段落和全宽圆角图片。
6. 图片主导的“下一篇”横幅。
7. 全局咨询 CTA 与页脚。
8. 移动端保持同一阅读顺序，缩小字号、扩大正文相对宽度，并使用紧凑的下一篇横幅。

Leadtop 使用自己的米白、深海军蓝、沙色和橙色。不会复制竞品文案、业绩、Logo、图片、分享二维码或蓝色体系。

## Leadtop 具体文章模板

### 运营人员填写的 CMS 字段

| 字段 | 必填 | 前端用途 |
| --- | --- | --- |
| 标题 | 是 | H1、浏览器标题、Open Graph 标题、Article headline |
| 摘要 | 是 | 文章导语和 Meta Description |
| 特色图片 + ALT | 是 | 文章主图、Open Graph 图片、Article image |
| 分类 | 是 | 文章标签和 `/blog` 筛选 |
| 作者 | 是 | 元数据和 Article author |
| 发布日期 | 自动/复核 | 元数据和 `datePublished` |
| Slug | 复核 | 稳定的 `/blog/[slug]` URL |
| 正文区块 | 是 | 语义化长文内容 |

运营人员不填写代码、HTML、CSS、Schema、分享链接、下一篇链接或 CTA 标记。

### 自动出现的 Gutenberg 正文骨架

每次新建 WordPress 普通文章时，自动带出可复用的 `Leadtop 标准新闻文章` 模板：

```text
导语段落：用 2–3 句说明发生了什么、为什么重要

H2：背景与核心变化
正文段落
正文段落
图片（要求填写 ALT）
图片说明

H2：关键内容或方法
正文段落
要点列表
引用 / 关键结论

H2：对出海企业意味着什么
正文段落
正文段落

H2：结论
总结段落
```

骨架仅使用 Paragraph、Heading、Image、List、Quote 和可选 Table 原生区块。运营人员可以复制或删除章节，无需接触标记。现有文章不会被覆盖。

### 自动文章导航

- 从清洗后的 `h2`、`h3` 标题自动生成目录，运营人员无需创建或维护锚点链接。
- 服务端为标题生成唯一 ID；标题重复时自动增加稳定后缀。
- 桌面端：在窄正文栏左侧显示吸顶章节导航。
- 移动端：在正文前显示可展开、可收起的无障碍目录。
- 阅读滚动时高亮当前章节；点击目录定位到章节并更新 URL 锚点。
- 支持键盘操作，并用 `scroll-margin-top` 避免固定页头遮挡标题。
- 正文少于两个有效标题时自动隐藏目录。

### 前端自动管理的模板区域

```text
网站页头
→ 返回新闻 + 分享操作
→ 分类 / 日期 / 作者
→ H1
→ 摘要导语
→ 特色图片
→ 自动文章导航 + CMS 正文区块
→ 自动咨询 CTA
→ 自动下一篇文章
→ 网站页脚
```

下一篇文章按 WordPress 发布时间自动选择；找不到时回退到其他最新文章。分享操作自动使用当前 Canonical URL。Article JSON-LD 继续由前端生成。

## 已准备实施范围

批准后只允许修改：

- `app/blog/[slug]/page.jsx`：实现新文章层级、导航数据、分享、CTA 和自动下一篇。
- `app/blog/[slug]/ArticleToc.jsx`：实现当前章节追踪以及桌面/移动目录交互。
- `app/blog/Blog.module.css`：增加 Leadtop 文章详情桌面/移动样式，保留已经批准的列表页。
- `lib/wordpress.js`：仅补充模板和下一篇查询所需的标准文章字段。
- `wordpress/leadtop-inquiries/`：新增独立的 Gutenberg 文章模板模块、编辑端发布检查、插件版本更新和本地安装包重建。
- `docs/`：保存运营指南与最终验证记录。

不在范围内：

- 发布或修改 WordPress 文章。
- 上传或安装插件到线上 CMS。
- 修改现有文章 URL、重定向、导航、`/blog` 列表结构或其他页面。
- 添加 ACF、Elementor、页面构建器或其他依赖。
- 除非另行要求，不部署、不提交、不推送。

## 备份与恢复

在获批后的第一次写入前，新建带时间戳快照，包含所有受影响 Next.js 文件的当前版本以及完整 `wordpress/leadtop-inquiries/` 插件目录。快照必须保留刚完成的 `/blog` 列表页工作。记录准确来源、范围、位置、时间和恢复步骤。备份保持未跟踪；只有验收全部通过并另行获批删除后才处理。

## 验收标准

- 非技术运营点击“新建文章”即可自动获得完整正文骨架。
- 同一骨架可以通过 `Leadtop 标准新闻文章` 手动插入。
- 现有文章不被修改，并继续可编辑。
- 编辑器显示简明发布检查：标题、摘要、特色图片、ALT、分类、Slug 和正文结构。
- 前端使用 Leadtop 配色，并在阅读层级上匹配参考页。
- 正文标题自动生成桌面吸顶导航和移动折叠目录，并反馈当前阅读章节。
- 导航、分享、返回、CTA 和下一篇自动生成且支持键盘操作。
- Title、Excerpt、Canonical、Open Graph、图片、作者、日期与 Article JSON-LD 保持一致。
- 清洗后的 WordPress 内容可正常呈现标题、段落、图片、Caption、列表、引用、链接、代码和表格，同时不接受危险标记。
- 在测试数据允许的范围内，桌面与 390 px 移动布局通过本地视觉检查。
- 所有变更 PHP 文件通过 `php -l`。
- `git diff --check` 和一次最终 `npm run build` 通过。
- 本地 WordPress 插件 ZIP 重新生成；不上传或安装到线上 CMS。

## 获批后的执行顺序

1. 创建 Next.js 与 WordPress 插件的修改前备份。
2. 分别生成桌面文章头部/正文/导航、桌面下一篇/CTA、移动文章三张 Leadtop 配色视觉参考；编码前分析字体、边距、媒体框、元数据、控件、导航状态和阅读节奏。
3. 实现 Gutenberg 原生区块模板和新文章自动骨架，不影响现有文章。
4. 增加编辑器发布检查，更新本地插件版本和安装包。
5. 实现前端文章模板和自动 H2/H3 导航，包括桌面吸顶与移动端折叠交互。
6. 增加自动下一篇、CTA 与分享。
7. 复用本地预览检查桌面、移动端与导航状态。由于生产 CMS 为空，只使用本地未发布 Fixture 或生成参考检查有内容布局，不向 CMS 写入测试文章。
8. 执行 PHP 语法检查、`git diff --check` 和一次最终 Next.js 构建。
9. 保存运营指南和结果记录，包括回滚方法与尚待执行的线上 CMS 安装步骤。

## 风险与假设

- “模板”解释为 Gutenberg 原生编辑骨架与固定前端展示，而不是复制 HTML 文档。
- 参考页当前 Canonical/Open Graph 实现较弱；Leadtop 保留更准确的逐文章元数据，不复制这些缺陷。
- 当前 CMS 没有已发布文章，端到端生产内容验收需要以后在插件安装后发布一篇受控测试文章。
- 准备阶段远程可视化连接超时；已直接采集参考页 HTML 和 CSS，实施阶段将使用生成视觉参考和本地预览。
