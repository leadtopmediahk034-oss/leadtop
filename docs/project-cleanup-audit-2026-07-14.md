# 项目清理审计（2026-07-14）

## 结论

当前生产代码是 Next.js App Router 项目，运行入口位于 `app/`，页面实现位于 `components/`。仓库中仍残留首版静态站、视觉迭代产物、未使用资源和仅供 AI 开发使用的本地 Skill；这些内容不属于网站运行依赖，可以安全移除。

## 已删除

- 旧静态站：根目录 `index.html`、`polaris.html`、`helios.html`，以及配套 `scripts/`、`styles/`、`assets/`。
- 重复部署副本：`public/polaris.html` 与 `public/legacy/`。三份 Polaris HTML 内容哈希完全一致。
- 旧 Vercel 重写：原 `vercel.json` 会把 `/` 重写到旧版 `polaris.html`，绕过当前 `app/page.jsx` 新首页。Next.js 项目无需该重写。
- 未使用代码：`components/SolarScene.jsx`，以及仅被该组件使用的 `three` 依赖。
- 未引用的公开图片：通过 `app/`、`components/` 的文件名和路径引用检查确认后删除；保留所有当前页面和服务页使用的图片。
- 视觉过程产物：`artifacts/` 下的临时对照图和阶段截图。
- 系统垃圾文件：已跟踪的 `.DS_Store`，并加入 `.gitignore` 防止再次提交。
- 仓库级 AI Skill：`.agents/skills/` 与 `skills-lock.json`。

## Skill 是否需要保留

不需要用于网站构建、部署或运行。Skill 文件只影响支持 Skill 的 AI 编程工具如何执行设计任务，不会被 Next.js、Vercel 或浏览器加载。

网站已经完成后，删除仓库内 Skill 可以减少维护噪音；如果未来需要大规模视觉改版，可以再从原来源安装。`AGENTS.md` 仍保留，因为它记录的是本仓库的 Git、验证和编辑边界，对后续维护仍有直接价值。

## 有意保留

- `design-previews/`：设计参考、正式素材来源与实现对照，仍有追溯价值。
- `brand-strategy/`、`competitor-profiles/`：品牌、文案和竞品决策依据。
- `docs/`：实现与维护记录。
- `public/leadtop/services-legacy/`：名称虽含 `legacy`，但当前 `components/servicePageData.js` 仍直接使用。
- `.next/`、`out/`、`.vercel/`：均已由 Git 忽略，是本机生成状态，不进入提交；构建时会按需重新生成。

## 验证方法

- 对删除文件执行全局引用残留检查。
- 执行 `git diff --check`。
- 执行一次最终 `npm run build`，确认全部页面和静态路由可正常生成。
