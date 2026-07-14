=== Leadtop 询盘管理 ===
Contributors: leadtop
Tags: inquiries, leads, headless wordpress, crm
Requires at least: 6.4
Tested up to: 6.8
Requires PHP: 7.4
Stable tag: 1.1.0
License: GPLv2 or later

接收 Leadtop 官网表单，并在 WordPress 后台统一管理询盘。

== 功能 ==

* 私有询盘数据，不开放匿名查询
* 适配官网咨询、增长优先级评估、B2B 诊断和 DTC 诊断表单
* 状态、负责人、跟进备注和批量状态更新
* 来源页面、表单类型和 UTM 归因
* UTF-8 CSV 导出（兼容 Excel）
* 可配置的新询盘邮件通知
* 为 Next.js 服务端提供经 WordPress Application Password 认证的 REST 接口
* 激活时创建最小权限的“Leadtop 询盘接口”用户角色
* 文章发布、更新、取消发布或删除时自动通知 Next.js 刷新博客缓存

== 安装 ==

1. 将 leadtop-inquiries.zip 上传到“插件 > 安装插件 > 上传插件”。
2. 激活“Leadtop 询盘管理”。
3. 创建一个专用 WordPress 用户，将角色设为“Leadtop 询盘接口”。
4. 在该用户资料页创建应用密码。
5. 将 WordPress REST API 地址、用户名和应用密码配置在 Next.js 服务端环境变量中。
6. 在“询盘管理 > 询盘设置”中配置通知邮箱。
7. 如需文章即时同步，在同一设置页填写 Next.js 刷新地址和共享密钥。

== REST API ==

POST /wp-json/leadtop/v1/inquiries

必须使用 WordPress Application Password 进行 Basic Authentication。最低要求是姓名，以及联系方式、电话或邮箱中的一项。

支持字段：name, phone, wechat, email, company, contact, website, product,
business_type（也兼容 businessType）, problem, needs, form_type, source_page, landing_url, referrer,
utm_source, utm_medium, utm_campaign, utm_term, utm_content, consent。

Helios 表单当前使用的 site 字段也会自动归一为 website。

成功响应状态码为 201，并返回 inquiry_id、submitted_at 和面向前端的 message。

== 隐私 ==

插件会保存表单中提交的个人联系方式。站点运营方应在隐私政策中说明用途、保存期限和删除方式，并仅向确有需要的后台人员开放询盘管理权限。

== Changelog ==

= 1.1.0 =
* 增加 WordPress 文章变更后的 Next.js 博客缓存刷新 webhook。

= 1.0.0 =
* 初始版本。
