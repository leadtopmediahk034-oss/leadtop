# Headless WordPress 博客接入说明

更新日期：2026-07-14

## 内容发布流程

接入完成后，编辑只需要在 WordPress 后台新增、更新、取消发布或删除普通“文章”。Next.js 会读取公开 REST API 并生成：

- `/blog`：文章列表、分页和空内容状态。
- `/blog/[slug]`：文章正文、作者、分类、日期和特色图片。
- `/sitemap.xml`：静态页面、服务页面和已发布文章。
- `/robots.txt`：允许公开页面抓取并声明 Sitemap。

列表与详情默认每 300 秒重新验证缓存，因此即使 webhook 暂时不可用，文章也会在约五分钟内自动同步，不需要重新构建或部署。

## WordPress 字段

前端使用 WordPress 默认文章字段：

| WordPress 字段 | 前端用途 |
| --- | --- |
| 标题 | 列表卡片、文章 H1、SEO 标题 |
| 正文 | 文章详情内容 |
| 摘要 | 列表摘要、Meta Description |
| 特色图片及替代文字 | 卡片和文章主图、Open Graph 图片 |
| 分类 | 列表和详情的内容标签 |
| 作者、发布日期、修改日期 | 文章元信息和 Article Schema |
| Slug | `/blog/[slug]` URL |

WordPress 正文进入 React 前会经过服务端白名单清洗。脚本、表单、iframe、SVG、内联事件和任意样式不会输出；保留标题、段落、列表、引用、链接、图片、代码和表格等正文元素。

## 自动刷新

Next.js 提供：

```text
POST /api/revalidate
Authorization: Bearer <WORDPRESS_REVALIDATE_SECRET>
```

WordPress 插件 `Leadtop 询盘管理 1.1.0` 在文章变化后调用该接口，刷新文章列表、对应详情和 Sitemap。

启用即时刷新需要一次性配置：

1. 在 Vercel 新增一个高强度随机值 `WORDPRESS_REVALIDATE_SECRET`。
2. 将更新后的 `dist/leadtop-inquiries.zip` 安装到 WordPress，覆盖 1.0.0。
3. 在“询盘管理 > 询盘设置”填写：
   - 博客刷新地址：`https://正式前台域名/api/revalidate`
   - 博客刷新密钥：与 Vercel 环境变量完全相同

未配置 webhook 时，五分钟自动刷新仍然有效。

## SEO

- 博客列表和文章详情分别生成 title、description、canonical 和 Open Graph。
- 文章详情输出 `Article` JSON-LD。
- Sitemap 自动纳入 WordPress 已发布文章及其修改时间。
- 根布局设置 `metadataBase`，避免社交图片使用本地域名解析。

如果后续使用 Yoast SEO 或 Rank Math，需要另行确认其 REST 字段是否公开，再决定是否优先采用插件自定义的 SEO 标题和描述。

## 环境变量

```text
WORDPRESS_URL=https://cms.leadtopmedia.com
WP_API_USER=仅供询盘写入的用户
WP_APP_PASSWORD=WordPress Application Password
WORDPRESS_REVALIDATE_SECRET=高强度随机值
NEXT_PUBLIC_SITE_URL=https://正式前台域名
```

公开文章读取不使用 WordPress 应用密码。应用密码仍只用于服务端询盘写入。

## 上线前验收

1. 在 WordPress 发布一篇包含标题、摘要、特色图片、分类和正文的测试文章。
2. 确认 `/blog` 显示卡片，详情页正文与图片正常。
3. 更新标题或正文，确认页面自动刷新。
4. 移入回收站，确认列表与详情消失。
5. 检查 `/sitemap.xml` 包含文章 URL，页面 canonical 指向正式前台域名。
