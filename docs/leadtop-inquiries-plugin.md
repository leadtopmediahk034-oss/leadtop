# Leadtop 询盘管理插件说明

更新日期：2026-07-14

## 表单字段盘点

插件依据网站当前四个实际获客表单建立统一字段模型：

| 表单 | 现有字段 | 建议 `form_type` |
| --- | --- | --- |
| 联系页立即咨询 | 姓名、电话、微信/QQ、邮箱、公司、网站、主营产品、其他需求 | `contact_consultation` |
| 首页增长优先级评估 | 姓名、公司、联系方式、业务类型、官网/店铺、当前问题 | `growth_priority` |
| Polaris B2B 获客诊断 | 姓名、手机/微信、官网、当前问题 | `polaris_b2b_diagnosis` |
| Helios DTC 增长诊断 | 姓名、公司、手机/微信、官网/店铺、当前问题 | `helios_dtc_diagnosis` |

Polaris 页面中的报价计算展示表单没有真实提交用途，因此不纳入询盘接口。

## 插件产物

- 插件源码：`wordpress/leadtop-inquiries/`
- 可安装包：`dist/leadtop-inquiries.zip`
- WordPress 菜单：`询盘管理`
- 写入接口：`POST /wp-json/leadtop/v1/inquiries`

## 安全模型

- 询盘使用私有自定义文章类型保存，不公开访问，不加入搜索，不注册公开的 WordPress REST 控制器。
- 自定义写入接口要求 WordPress Application Password 身份认证和 `create_leadtop_inquiries` 权限。
- 插件激活时创建“Leadtop 询盘接口”最小权限角色。专用接口用户只能写入询盘，不能查看后台询盘列表或编辑其他站点内容。
- 浏览器不应直接请求 WordPress，也不能获得 Application Password。正式链路应为 `浏览器 -> Next.js /api/inquiries -> WordPress`。
- 所有字段在 REST 层限制类型和长度，并按文本、邮箱、URL分别清洗。
- CSV 导出仅限询盘管理员，并对表格公式注入字符做转义。

## 后台能力

- 查看全部表单原始内容、来源页、引荐页和 UTM 参数。
- 设置新询盘、已联系、有效商机、已成交、已关闭、垃圾询盘六种状态。
- 填写负责人和跟进备注。
- 按状态筛选、批量修改状态、导出兼容 Excel 的 UTF-8 CSV。
- 通过“询盘设置”启用新询盘邮件通知，并配置多个收件地址。

## 安装与连接

1. 在 WordPress 后台进入“插件 > 安装插件 > 上传插件”，上传 `dist/leadtop-inquiries.zip` 并激活。
2. 新建一个 WordPress 用户，角色选择“Leadtop 询盘接口”。
3. 在该用户资料页创建 Application Password，密码只保存到 Next.js 服务端。
4. 在 Next.js 部署环境配置：

   ```text
   WORDPRESS_URL=https://cms.example.com
   WP_API_USER=专用接口用户名
   WP_APP_PASSWORD=生成的应用密码
   ```

5. Next.js 服务端向 `${WORDPRESS_URL}/wp-json/leadtop/v1/inquiries` 发起 Basic Auth POST 请求。
6. 完成前端接口的字段映射、限流、蜜罐或 Turnstile 后，再做四个表单的端到端入库测试。

## 字段兼容约定

- Helios 的 `site` 建议在 Next.js API 层映射为 `website`；插件也会兼容接收 `site`。
- React 表单的 `businessType` 建议映射为 `business_type`；插件也会兼容接收 `businessType`。
- `contact` 用于无法拆分的手机/微信；联系页已有独立 `phone`、`wechat`、`email` 字段，可直接传递。
- `source_page` 建议传路由，例如 `/contactus`、`/polaris`、`/helios`。
- `landing_url` 和 `referrer` 传完整 URL；UTM 参数使用对应的 `utm_*` 字段。
- `consent` 记录用户是否明确同意隐私条款，未传时保存为否。

## 博客自动刷新（1.1.0）

插件 1.1.0 可以在普通 WordPress 文章发布、更新、取消发布或删除时通知 Next.js 清理博客缓存。

在“询盘管理 > 询盘设置”配置正式前台的 `/api/revalidate` 地址和共享密钥；共享密钥必须与 Vercel 的 `WORDPRESS_REVALIDATE_SECRET` 一致。未配置时不会发送请求，也不影响询盘功能。
