# 首页 Success Stories 文案与素材重设计结果

## 完成内容

- 从首页 Success Stories 卡片中移除 `DEMO`、每项指标后的“模拟”以及 ALT 中的“模拟案例场景”。
- 未增加图片顶部编号；顶部只保留对应案例名称。
- 按用户要求保留三张卡片的现有业绩数字。
- 为精密制造、智能家居、户外生活方式分别生成并接入一张新的 1672×941 PNG 素材。
- 清理已不再使用的图片编号与指标小字样式。
- 将 Success Stories 桌面端调整为至少一屏高度，主卡片下移到标题区下方，避免内容过短或与标题区域挤压。
- 将案例名称从图片覆盖层移到独立栏，保留名称信息并释放图片主体区域。
- 未提交、未推送、未部署。

## 变更文件

- `components/LeadtopHomepage.jsx`
- `components/LeadtopHomepage.module.css`
- `public/leadtop/success-stories/precision-manufacturing-v2.png`
- `public/leadtop/success-stories/smart-home-v2.png`
- `public/leadtop/success-stories/outdoor-lifestyle-v2.png`

## 备份与恢复

- 备份时间：2026-09-15 10:28:15 Asia/Shanghai。
- 备份位置：`/Users/qianwenyi/Desktop/leadtop-backups/homepage-success-stories-20260915-102815/`。
- 恢复方式：将备份中的 JSX 与 CSS 复制回原路径；如需完整回滚，再仅移除本轮新增的三个素材文件。
- 备份继续保留。
- 本轮布局备份位置：`/Users/qianwenyi/Desktop/leadtop-backups/homepage-success-stories-layout-20260915-114651/`。

## 图片生成方式与提示词

- 生成方式：用户指定的 `imagegen` 技能，内置图片生成模式。
- 共生成 3 张独立素材，均要求 16:9、高级写实编辑摄影、暖橙与石墨灰氛围、顶部留出标签空间，并禁止文字、数字、Logo、水印、品牌标记及悬浮 UI。
- 精密制造提示词主题：现代 CNC 工厂，精密金属部件、工程师与国际采购协作，远景带出口物流语境。
- 智能家居提示词主题：黄昏时的现代欧洲住宅，可信的智能灯控、温控与安防设备在真实生活中使用。
- 户外生活方式提示词主题：海岸山地营地的真实产品使用与内容创作场景，纪录片式户外摄影。

## 验证结果

- `git diff --check`：通过。
- 桌面端局部预览：通过；三张新素材进入既有轮播构图，活动卡与两侧预览正常。
- 手机端布局数据：页面 `scrollWidth` 与视口宽度一致；活动卡、图片和指标均处于视口内；图片自然尺寸为 1672×941 且加载完成。
- 可访问文本检查：Success Stories 区块不再包含“模拟”或 `DEMO`，业绩数字仍存在。
- `npm run build`：通过；21 个静态页面生成完成。
- 本地预览：`http://127.0.0.1:3001/#proof`，服务已启动并返回 HTTP 200。
- 本轮仅验证页面呈现与构建，不声称搜索、询盘或转化改善。

## 保留事项

- 业绩数字按用户要求暂时保留；源码继续提醒发布前应以批准的案例证据替换或确认相关文案与指标。
