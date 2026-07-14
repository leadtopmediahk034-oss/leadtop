const legacyAsset = (name) => `/leadtop/services-legacy/${name}`;

const fullFunnelProcess = [
  { title: "营销思维", points: ["竞品调性", "品牌调性", "品牌定位", "内容模块", "效果驱动"] },
  { title: "网站建设", points: ["内容规划", "用户体验", "Landing Page 设计", "站内优化", "社交媒体链接"] },
  { title: "渠道引流", points: ["SEM: Google、Bing、Yandex", "Video: YouTube、TikTok", "SNS: Facebook、Pinterest、Twitter、Instagram、LinkedIn", "DSP"] },
  { title: "数据跟踪", points: ["各媒体渠道代码部署", "目标及事件配置", "电子商务", "转化可视化漏斗", "种子用户"] },
  { title: "效果分析", points: ["渠道与媒介", "归因模型", "站内与站外流量", "兴趣、地理位置、行为、技术、设备等"] },
  { title: "后续目标", points: ["竞品调性", "品牌调性", "品牌定位", "内容模块", "效果驱动"] },
];

export const servicePages = {
  websitedesign: {
    slug: "websitedesign",
    navLabel: "网站建设",
    title: "数据驱动决策，提升网站价值",
    subtitle: "基于累计广告投放金额 $300,000,000 的建站经验，深度洞察互联网用户，注重消费者转化逻辑的设计理念。",
    kicker: "在网络上留下足迹，仅需 3 分钟。",
    image: legacyAsset("website-design.jpg"),
    imageAlt: "Leadtop 网站建设项目团队会议",
    metaDescription: "Leadtop 基于消费者转化逻辑提供 WordPress、Shopify、B2B 与 B2C/DTC 独立站建设服务。",
    sections: [
      {
        type: "split",
        title: "即刻开启您的独立站建设之旅",
        image: legacyAsset("website-design.jpg"),
        imageAlt: "网站项目需求与框架讨论",
        items: [
          {
            title: "B2B 网站建设",
            paragraphs: [
              "基于全球热门的网站构建器 WordPress 构建站点，销售产品和服务，写博客，发布公司动态。",
              "43% 的网页在 WordPress 上构建。通过专业设计的主题脱颖而出，加入数百万用户的行列，开启您的全球业务之旅。",
            ],
          },
          {
            title: "B2C/DTC 网站建设",
            paragraphs: [
              "基于全球领先的一站式电商 SaaS 平台 Shopify，其完善的生态系统集云端建站、库存管理、多渠道销售等功能和技术于一体，赋能约 175 个国家和地区的数百万独立站商家、大型零售贸易企业及全球知名品牌，助您从零起步，打造国际品牌。",
            ],
          },
        ],
      },
      {
        type: "process",
        eyebrow: "建站流程了解",
        title: "基于消费者转化逻辑的网站建设服务流程",
        items: [
          { title: "需求整理", points: ["目标人群", "目标市场", "主要产品", "核心优势", "对标同行", "所需功能", "预计投入使用时间", "网站参考初模型", "产品、服务及政策条款"] },
          { title: "调研分析", points: ["竞品网站调研", "市场调研分析", "产品调研分析", "核心优势调研分析", "差异化优势分析", "功能调研分析", "确定网站初框架"] },
          { title: "框架设定", points: ["网站框架确定", "整体布局搭建", "产品模块确认", "服务模块确认", "优势与卖点提炼", "政策条款确认"] },
          { title: "网站建设", points: ["网站搭建", "易于用户浏览", "便于用户转化", "整理布局呈现", "页面细节优化", "内部基础 SEO", "社交媒体链接"] },
          { title: "功能设计开发", points: ["HTTPS 网站加密", "功能调试", "网站测试使用"] },
          { title: "具体细节优化", points: ["用户流程测试", "正式交付", "网站正式上线", "网站交付"] },
        ],
      },
      {
        type: "milestones",
        eyebrow: "有效沟通",
        title: "从资料准备到正式交付",
        items: ["已有资料准备", "另需资料准备", "框架梳理规划", "测试版本上线", "交付之前沟通", "网站正式交付"],
      },
      {
        type: "process",
        title: "合作流程",
        items: [
          { title: "商务洽谈", points: ["沟通项目需求", "确定合同流程", "款项与发票处理", "后续服务器服务"] },
          { title: "项目经理策划", points: ["需求整理", "网站整体风格规划确认", "功能模块沟通确认", "域名与服务器等内容确认"] },
          { title: "技术与设计师搭建", points: ["网站功能与内容搭建", "页面布局与交互设计", "网站功能模块测试", "用户体验测试"] },
          { title: "交付测试", points: ["客户验收网站", "修改发现的新需求"] },
          { title: "网站正式交付", points: ["网站正式上线交付", "管理后台的移交", "服务器的移交（服务器非我司提供服务）"] },
        ],
      },
    ],
    related: ["ads", "ui", "socialmedia"],
  },

  mediabuy: {
    slug: "mediabuy",
    navLabel: "媒体流量采买",
    title: "以结果为导向的媒体流量采买服务",
    subtitle: "提供基于不同阶段、不同营销目标的媒体流量投放策略和媒体采买服务，覆盖购买、谈判和广告活动管理。",
    kicker: "专业媒介服务团队，提供媒介流量采买及媒介服务策略。",
    image: legacyAsset("media-buy.jpg"),
    imageAlt: "Google、Facebook、Bing、LinkedIn、TikTok 等媒体平台",
    metaDescription: "Leadtop 提供以结果为导向的媒体流量采买、谈判、预算分配、活动监控和优化服务。",
    sections: [
      {
        type: "split",
        title: "媒介采买服务",
        image: legacyAsset("media-buy.jpg"),
        imageAlt: "Leadtop 媒体采购平台覆盖范围",
        items: [
          {
            title: "媒体优势",
            paragraphs: ["媒体购买以物有所值而著称。LeadtopMedia 累计超过 $300,000,000 的广告投放经验，经验丰富且训练有素的媒体买手知道如何与广告供应商合作，为客户获得最佳媒体购买资源，包括但不限于最佳价格、附加值、奖金、生产激励、赞助机会和内测机会等。"],
          },
          {
            title: "效果为导向的媒体购买策略",
            paragraphs: [
              "如果您没有在合适的人面前传达信息，那么是否拥有最好的产品、服务或广告创意都无关紧要。",
              "我们为能够为客户确定合适的广告媒体并管理整个过程而感到自豪。",
            ],
          },
        ],
      },
      {
        type: "split",
        reverse: true,
        title: "媒体的采买与运营同样重要",
        image: legacyAsset("media-strategy-1.jpg"),
        imageAlt: "媒体运营策略会议",
        paragraphs: ["我们通过捕捉潜在消费者并制定合适的媒体购买策略，为客户节省了数万美元。我们使用元翼系统监控正在运行的媒体购买，并实时监控媒体投放数据。"],
      },
      {
        type: "split",
        title: "战略与规划",
        image: legacyAsset("media-strategy-2.jpg"),
        imageAlt: "团队制定媒体采购战略与规划",
        paragraphs: [
          "您是在扩大声誉，还是希望对销量产生直接影响？",
          "您是否想推广现有的数字内容、扩大邮寄名单或增加下一次活动的出席率？",
          "根据您销售的产品或服务，我们必须进行大量研究，以确定如何最好地使用分配的预算。这包括对目标受众的研究，以及用最有效的媒介接触该受众。我们会调研大量媒体渠道，包括传统媒体和新媒体。",
          "我们将共同确定您需要接触的对象，以及哪些结果将有助于实现组织目标。",
        ],
      },
      {
        type: "process",
        title: "服务流程",
        intro: "成功且拥有更高投资回报率的营销活动，不仅要传达强有力的相关信息，还需要在正确的时间，以可承受的价格被正确的人看到。我们的策略师和买家团队基于海量投放经验，力求为客户的所有活动取得最佳效果。",
        items: [
          { title: "确定目标受众" },
          { title: "研究竞争对手" },
          { title: "设计购买策略" },
          { title: "分配预算" },
          { title: "启动活动" },
          { title: "监控和响应" },
          { title: "分析有效性" },
          { title: "优化每个渠道" },
        ],
      },
    ],
    related: ["ads", "ui", "socialmedia"],
  },

  ads: {
    slug: "ads",
    navLabel: "广告代投运营",
    title: "效果营销，品牌出海",
    subtitle: "独立站效果营销增长官。数字营销不仅仅是广告，Marketing is more than just advertising.",
    kicker: "100 多个雄心勃勃的品牌取得了显著成果。",
    image: legacyAsset("ads-operations.jpg"),
    imageAlt: "Leadtop 广告运营策略讨论",
    metaDescription: "Leadtop 提供 Google、Bing、Facebook、TikTok、LinkedIn 等媒体广告代投放与效果运营服务。",
    sections: [
      {
        type: "split",
        title: "数字营销和分析有助于投资回报率飙升 800%",
        image: legacyAsset("ads-operations.jpg"),
        imageAlt: "广告研究、规划与投放执行讨论",
        paragraphs: [
          "LeadtopMedia 通过数据驱动策略实现高投资回报率的搜索引擎营销。在您计划与成倍增加的客户打交道的同时，完善线上数字营销。",
          "我们将负责策划和执行您的广告研究、规划、执行和评估。",
          "所以请坐下来，准备好在潜在客户进行的海量搜索中更频繁、更有价值地出现。",
        ],
      },
      {
        type: "split",
        reverse: true,
        eyebrow: "四分之三的消费者会在购买前查询相关社交媒体",
        title: "用引人注目的策略和素材丰富在线营销组合",
        intro: "随着社交媒体格局快速变化，我们帮助客户制作具有行业高转化率的引人入胜内容。",
        image: legacyAsset("ads-platforms.jpg"),
        imageAlt: "Leadtop 覆盖的广告与社交媒体平台",
        points: ["Facebook 广告与主页运维", "Instagram 广告与主页运维", "Pinterest 广告与主页运维", "YouTube 视频内容创建、广告与频道运维", "LinkedIn 广告与频道运维", "Twitter 广告与频道运维", "TikTok 视频内容创建、广告与频道运维"],
      },
      {
        type: "split",
        title: "LeadtopMedia 和您一样重视结果",
        image: legacyAsset("social-media.jpg"),
        imageAlt: "团队沟通数字营销增长结果",
        paragraphs: [
          "我们的数字营销专家服务团队覆盖业务全流程，将与您讨论增长目标，并提供实用、数据驱动且可操作的建议。",
          "我们还将推荐最适合受众的数字营销渠道，以便您准备采取下一步行动时做出明智决策。",
        ],
      },
      {
        type: "process",
        title: "LeadtopMedia 数字营销服务全流程",
        items: fullFunnelProcess,
      },
      {
        type: "roles",
        eyebrow: "专业协作团队",
        title: "从策略到数据分析共同负责",
        items: ["BD", "AM", "设计师", "优化师", "数据分析师"],
      },
    ],
    related: ["mediabuy", "ui", "socialmedia"],
  },

  ui: {
    slug: "ui",
    navLabel: "视觉创意设计",
    title: "视觉与创意素材设计",
    subtitle: "恰到好处的图形设计，以及激发客户行动的用户体验和界面，取悦目标受众。",
    kicker: "为客户提供有价值、有影响力、品效合一的广告创意体验。",
    image: legacyAsset("ui-design.jpg"),
    imageAlt: "Leadtop 视觉创意团队进行设计讨论",
    metaDescription: "Leadtop 提供 UI、UX、用户研究、LOGO、广告素材与视频创意设计服务。",
    sections: [
      {
        type: "split",
        title: "即刻开启您的视觉体验之旅",
        eyebrow: "为什么选择 LeadtopMedia？",
        image: legacyAsset("ui-design.jpg"),
        imageAlt: "视觉设计团队讨论品牌素材",
        paragraphs: ["为客户服务 12 年，LeadtopMedia 是一家专注客户效果和业绩增长的媒体策略及效果投放服务商。素材内容广泛运用于 Google、Bing、Facebook、LinkedIn、Pinterest、TikTok、Instagram 等媒体，通过与消费者强有力的互动，传递产品服务及品牌理念。"],
      },
      {
        type: "gallery",
        title: "视觉创意设计服务",
        items: [
          { title: "用户体验/用户界面设计", image: legacyAsset("ui-ux.jpg") },
          { title: "视觉设计", image: legacyAsset("ui-visual.jpg") },
          { title: "用户研究", image: legacyAsset("ui-research.jpg") },
          { title: "图形和视觉设计", image: legacyAsset("ui-graphic.jpg") },
          { title: "创意制作", image: legacyAsset("ui-creative.jpg") },
          { title: "LOGO 设计", image: legacyAsset("ui-logo.jpg") },
          { title: "广告素材设计", image: legacyAsset("ui-ads.jpg") },
          { title: "视频创意设计", image: legacyAsset("ui-video.jpg") },
        ],
      },
      {
        type: "statement",
        eyebrow: "有价值、有影响力的广告创意体验",
        title: "创意从了解您的业务开始",
        copy: "我们的创意团队着重了解您的业务，以创建量身定制的解决方案来实现目标，并用能够引起客户共鸣的有力方式捕捉品牌精髓。",
      },
    ],
    related: ["ads", "websitedesign", "socialmedia"],
  },

  socialmedia: {
    slug: "socialmedia",
    navLabel: "社交媒体运营",
    title: "社交媒体运营",
    subtitle: "在受众消磨时间的地方培养积极受众，创造多个流量来源，持续带来顾客。",
    kicker: "让业务展现在占世界人口近 48% 的 37.8 亿在线用户面前。",
    image: legacyAsset("social-media.jpg"),
    imageAlt: "Leadtop 社交媒体运营团队讨论内容策略",
    metaDescription: "Leadtop 提供社交媒体策略、内容创作、数据评估和行业洞察服务。",
    sections: [
      {
        type: "split",
        title: "社交媒体营销目标的全局视图",
        image: legacyAsset("ads-platforms.jpg"),
        imageAlt: "Facebook、Instagram、LinkedIn、TikTok 等社交媒体平台",
        intro: "社交媒体能让品牌获得具有经济效益的营销，包括但不限于：",
        points: ["推动流量和销售", "利用网红人脉圈", "建立品牌知名度", "凝聚积极受众", "与现有顾客和潜在顾客建立联系", "提供客服支持"],
        paragraphs: ["品牌持续驾驭着社交媒体营销的浪潮，73% 的营销人员认为他们的努力对企业来说略有成效或非常有效。社交营销策略为您提供社交媒体营销目标的全局视图，以及如何最好地实现这些目标。"],
      },
      {
        type: "split",
        reverse: true,
        title: "全面管理和协调社交媒体客户的日常运营",
        image: legacyAsset("social-media.jpg"),
        imageAlt: "团队规划社交媒体内容与运营",
        paragraphs: [
          "LeadtopMedia 及时了解社交媒体网站的最新信息，以及如何最大限度提高客户参与度和增长。团队跨渠道开发和实施所有社交媒体策略，制作网站或出版物文章，规划适当的新闻报道，校对文章，管理图形和视频制作，确保信息及时、准确地发布。",
          "我们的社交媒体团队在 Facebook、Instagram、Twitter、Pinterest、YouTube、TikTok、LinkedIn 等平台建立引人入胜的品牌影响力，制定并执行促进社交媒体增长的策略，包括吸引新受众、邀请朋友、创建群组和论坛，以及分发品牌营销活动的视频和摄影片段。",
        ],
      },
      {
        type: "process",
        title: "LeadtopMedia 社交媒体运营服务",
        items: [
          { title: "媒体策略服务", points: ["结合不同媒体受众属性，为所有社交媒体账户制定策略", "Facebook 帖子、推文、博客帖子、照片和短链接", "Instagram 频道规划与内容运营", "YouTube 频道规划与内容运营", "Pinterest 频道规划与内容运营", "LinkedIn 与 Twitter 频道规划与内容运营", "TikTok 频道规划与内容运营"] },
          { title: "内容创作服务", points: ["参加活动并提供静态照片、博客文章、新闻报道和社交媒体内容", "撰写、编辑和发布包含照片、视频、文字或图形的博客文章", "与主题专家访谈并制作原创内容", "提炼产品优势与整理内容，配合促销和购物活动进行社媒运营", "在客户及合作伙伴之间建立持续、一致、符合品牌权益且引人注目的对话"] },
          { title: "数据评估服务", points: ["建立一致的社交和移动程序衡量评估系统，并准备渠道使用统计报告", "开发社交媒体分析报告，覆盖布局设计、编辑、信息分析、统计研究、沟通效果与影响力"] },
          { title: "行业洞察服务", points: ["密切关注影响客户的社交媒体和移动趋势", "透视用户需求，深挖消费潜力"] },
        ],
      },
    ],
    related: ["ads", "ui", "mediabuy"],
  },

  incubation: {
    slug: "incubation",
    navLabel: "孵化培训服务",
    title: "孵化培训服务",
    subtitle: "12 年精耕细作，500+ 实战项目演练，覆盖 0 到 $300,000,000 的广告投放量级，提供效果导向的策略及执行方案。",
    kicker: "从知识、资源到执行能力，帮助团队建立出海增长基础。",
    image: legacyAsset("incubation.jpg"),
    imageAlt: "Leadtop 孵化培训与一对一辅导",
    metaDescription: "Leadtop 提供线上培训、线下培训、一对一孵化和全流程系统培训。",
    sections: [
      {
        type: "split",
        eyebrow: "您将会遇到哪些问题",
        title: "领拓数字营销，孵化培训",
        image: legacyAsset("incubation.jpg"),
        imageAlt: "团队参加数字营销孵化培训",
        points: ["独立站的成本和利润如何更好地分配相应资源？", "广告投手及优化团队如何使产品快速起量？", "市场份额及前景如何？", "产品销售的地域性、本土化、差异化、销售途径与资源等如何应对？"],
      },
      {
        type: "statement",
        eyebrow: "帮您解决遇到的问题",
        title: "扶翼计划消除您对跨境出海的担忧",
        copy: "从基础知识、资源对接和渠道选择开始，逐步进入广告投放、媒体运营、数据分析、网站优化与 SEO，让团队真正具备执行能力。",
      },
      {
        type: "process",
        title: "培训内容",
        items: [
          { title: "线上专业培训", points: ["基础知识培训与资源对接", "独立站建站", "引流渠道选择", "广告投放与优化", "媒体运营", "数据追踪与分析", "网站优化技巧", "SEO 基础知识"] },
          { title: "线下专业培训", points: ["行业资深大咖面对面", "行业洞察与案例赏析", "快速起量系统化打法", "精细化运营技巧分享"] },
          { title: "一对一孵化", points: ["一对一定制化培训", "全局调研咨询服务", "方案制定与技术支持"] },
          { title: "全流程系统培训", points: ["从 0 到 1 快速起步", "精细化的课程体系培训"] },
        ],
      },
    ],
    related: ["ads", "ui", "socialmedia"],
  },

  consultation: {
    slug: "consultation",
    navLabel: "顾问咨询服务",
    title: "顾问咨询服务",
    subtitle: "12 年精耕细作，500+ 实战项目演练，覆盖 0 到 $300,000,000 的广告投放量级，提供效果导向的策略及执行方案。",
    kicker: "专业团队、跨平台认证与长期广告投放经验共同支持决策。",
    image: legacyAsset("consultation.png"),
    imageAlt: "Leadtop 顾问咨询服务团队",
    metaDescription: "Leadtop 提供市场调研、营销策略、效果追踪、方案执行、团队培训与营销管理顾问服务。",
    sections: [
      {
        type: "split",
        eyebrow: "专业的服务团队",
        title: "领拓数字营销，顾问咨询",
        image: legacyAsset("consultation.png"),
        imageAlt: "顾问团队共同制定数字营销方案",
        paragraphs: [
          "我们拥有 Google 官方一级代理专业资质，同时具有 Bing、Facebook、TikTok 等多平台营销能力认证证书，以及具有资深广告投放经验的专业团队、投放规划团队和产品技术支持团队。",
          "我们会用优质的适配资源助力产品出海营销，确保产品的效果化与品牌化，帮助 ROAS 效果提升 800%。",
          "我们提供行业未来发展趋势报告、友商和竞品分析、多媒体全链路营销方案、多媒体渠道平台特点解析与组合打法、静态素材与动态素材创意结合、广告投放数据分析，以及周报、月报、季度报告和年度报告等阶梯型、周期性专业报告。",
        ],
      },
      {
        type: "process",
        title: "我们的服务流程",
        items: [
          { title: "市场调研", points: ["品牌调研", "竞品调研", "产品调研", "消费者调研", "目标市场要素调研", "物联网行为分析调研", "市场定位调研", "商业模式调研"] },
          { title: "营销策略", points: ["品牌价值主张", "产品情感诉求", "产品定位战略", "渠道核算分析", "整合营销方案"] },
          { title: "效果追踪", points: ["效果追踪方式", "统计方式部署", "效果统计追踪"] },
          { title: "方案执行", points: ["线上方案执行", "线下方案执行", "新媒体策略执行"] },
          { title: "团队培训", points: ["行业知识科普", "专业技能培训", "入场咨询答疑", "职责技能培训"] },
          { title: "营销管理", points: ["营销组织架构", "岗位职责划分", "配套任务执行", "团队激励政策"] },
        ],
      },
    ],
    related: ["ads", "ui", "socialmedia"],
  },
};

export const serviceSlugs = Object.keys(servicePages);

export function getServicePage(slug) {
  return servicePages[slug] || null;
}
