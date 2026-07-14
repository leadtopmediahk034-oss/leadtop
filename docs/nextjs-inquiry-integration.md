# Next.js 询盘接入说明

更新日期：2026-07-14

## 已接入表单

| 页面 | 表单类型 `form_type` | 核心字段 |
| --- | --- | --- |
| `/contactus` | `contact_consultation` | 姓名、电话、微信/QQ、邮箱、公司、网站、产品、需求 |
| `/` | `growth_priority` | 姓名、公司、联系方式、业务类型、网站、主要问题 |
| `/polaris` | `polaris_b2b_diagnosis` | 姓名、手机/微信、官网、当前问题 |
| `/helios` | `helios_dtc_diagnosis` | 姓名、公司、手机/微信、官网/店铺、当前问题 |

浏览器统一提交到同域 `POST /api/inquiries`。WordPress 用户名和 Application Password 只由该服务端路由读取，不会进入客户端 JavaScript。

## 归因数据

全站首次加载时将首次触达数据保存到当前标签页的 `sessionStorage`：

- `landing_url`：首次进入网站的完整 URL。
- `referrer`：首次进入时的引荐页面。
- `utm_source`、`utm_medium`、`utm_campaign`、`utm_term`、`utm_content`：首次落地 URL 中的 UTM 参数。
- `source_page`：用户实际提交表单时的路径和查询参数。

首次触达字段在同一个浏览器标签页中保持不变，`source_page` 随最终提交页更新。WordPress 插件会在询盘详情和 CSV 导出中保留这些字段。

## 服务端安全与错误处理

- 只接受预定义字段，并按字段截断最大长度。
- 至少要求姓名和一种联系方式。
- 校验邮箱与 HTTP(S) URL 格式。
- 32KB 请求体上限、隐藏蜜罐字段、单实例每 IP 十分钟五次的基础限流。
- WordPress 请求十秒超时，前端不会看到上游凭据或内部错误信息。
- 成功后清空表单；失败时保留已填写内容，允许用户重试。

基础限流用于减少明显滥用，不替代 Vercel Firewall、Cloudflare Turnstile 或持久化分布式限流。

## 部署环境变量

Vercel 的 Production、Preview 和 Development 已配置：

```text
WORDPRESS_URL
WP_API_USER
WP_APP_PASSWORD
```

环境变量只在新部署中生效，不应写入 `.env`、客户端变量或 Git。

## 验证记录

- `npm run build`：通过，`/api/inquiries` 被识别为 Node.js 动态路由。
- `/`、`/contactus`、`/polaris`、`/helios`：本地 HTTP 均返回 200。
- 本地空请求：返回 400 和必填字段提示。
- 本地蜜罐请求：返回模拟成功，不访问 WordPress。
- WordPress 认证与插件路由：空请求返回预期的 `400 leadtop_missing_contact`，未创建测试询盘。

## 人工测试建议

1. 使用带 UTM 的地址进入网站，例如 `/?utm_source=test&utm_medium=manual&utm_campaign=form_test`。
2. 导航到任意一个表单页面并提交真实可识别的测试询盘。
3. 在 WordPress“询盘管理”中确认表单类型、来源页、首次落地页和 UTM 字段。
4. 分别验证手机和桌面宽度下的提交中、成功和失败提示。
5. 测试完成后将测试询盘标记为垃圾或移入回收站。
