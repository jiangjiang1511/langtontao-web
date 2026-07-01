export type CaseStory = {
  slug: string
  author: string
  title: string
  excerpt: string
  coverSrc: string
  coverAlt: string
  body: string[]
  publishedAt?: string
  sourceUrl?: string
}

export const casesPageMeta = {
  eyebrow: 'CASE LAB · 050',
  title: '拆解50个高净值家庭财险配资方案',
  lead:
    '我们从真实家庭的风控档案中抽取样本，把「买了什么、缺了什么、为什么失效」讲清楚——不卖产品，只帮你看懂已有配置里的结构与漏洞。以下为先公开的 4 个脱敏拆解片段，更多案例持续更新。',
  description:
    '朗敦道拆解 50 个高净值家庭财险配资方案：从保单结构、风险敞口与配资逻辑出发，呈现可复用的风控经验。',
} as const

export const caseStories: CaseStory[] = [
  {
    slug: 'manufacturing-policy-stack',
    author: '案例 01 · 金融从业家族',
    title: '保单堆了不少，大额数字资产却零保障',
    excerpt:
      '传统人身险与财险配得很满，加密货币、股权份额与数字账户却完全不在风控地图里。',
    coverSrc: '/cases/manufacturing-policy-stack.svg',
    coverAlt: '金融家族财险配资拆解封面',
    publishedAt: '脱敏片段 01',
    sourceUrl: 'https://mp.weixin.qq.com/s/Q9SsAQ28ozLM2drt-QiXQA',
    body: [
      '这家华北金融从业家庭，夫妻与二代名下合计多份寿险、年金与团险，年缴保费不低，主观感受是「该买的都买了」。财富大健康体检时，我们把资产按「可承保标的」重新分类，才发现：家族约四成可投资资产以数字形式存在，却没有任何与之匹配的责任与财产安排。',
      '体检发现一：多份终身寿与年金功能重叠，占用大量现金流，却未回答「若主理人短期无法履职，数字资产密钥与托管权限如何接续」这一核心问题。',
      '体检发现二：企业团险与个人保单互相不知情，受益人仍是十年前的写法；一旦出险，理赔路径与家族治理结构可能完全错位。',
      '体检发现三：早期配置的财产险仅覆盖实体房产与车辆，钱包、交易所账户、链上资产与第三方托管协议均处于「保障盲区」。',
      '重构方向：先做「按标的分类」的家庭敞口地图，把数字资产纳入可讨论、可制度化的风控框架，再谈保单增减——堆量不等于配对。',
      '本文为脱敏案例，仅供财富大健康体检与风控认知参考，不构成产品推荐或投资建议。',
    ],
  },
  {
    slug: 'cross-border-coverage-gap',
    author: '案例 02 · 跨境电商家族',
    title: '跨境电商家庭，境内外财险踩坑实录',
    excerpt:
      '广州仓、香港账户与内地保单并行，理赔时才发现标的、司法管辖与医疗网络都没打通。',
    coverSrc: '/cases/cross-border-coverage-gap.svg',
    coverAlt: '跨境电商家庭财险配资拆解封面',
    publishedAt: '脱敏片段 02',
    sourceUrl: 'https://mp.weixin.qq.com/s/VL3RYFinwE_GyxnQXh2lEA',
    body: [
      '客户主营跨境电商，供应链与仓储分布在华南与东南亚，家庭常驻大湾区，父母与部分固定资产仍在内地。境内外各有一套「看起来完整」的保障，但缺少一张总览表：哪类风险在哪边承保、哪类风险实际上无人覆盖。',
      '体检发现一：境外医疗险无法覆盖内地突发住院；内地重疾险的海外就医附加条款早已过期，却仍在续费。',
      '体检发现二：电商仓储与货运节点的财产险分散在多个主体名下，保单上的地址与实际控制人结构不一致，一旦出险可能面临「主体不符」拒赔。',
      '体检发现三：跨境资金路径上的账户安全、雇员责任与平台合规风险完全空白；配偶一方掌握境外保单，另一方掌握内地保单，信息孤岛严重。',
      '重构方向：建立「一张家庭风控总图」，按人、按资产、按地域、按经营主体标注承保边界，再谈增补、替换与受益人同步。',
      '本文为脱敏案例，仅供财富大健康体检与风控认知参考，不构成产品推荐或投资建议。',
    ],
  },
  {
    slug: 'succession-beneficiary-mismatch',
    author: '案例 03 · 商贸经销家族',
    title: '省级总代家族，财险与接班架构完全对不上',
    excerpt:
      '经销网络与股权接班同步推进，保单受益人却仍停在十年前的直系亲属名单上。',
    coverSrc: '/cases/succession-beneficiary-mismatch.svg',
    coverAlt: '商贸经销家族受益结构拆解封面',
    publishedAt: '脱敏片段 03',
    sourceUrl: 'https://mp.weixin.qq.com/s/Fhf7-Nb7Eex7p5SjmwZTfg',
    body: [
      '家族经营省级总代生意多年，已进入二代接班筹备期，律师团队正在梳理股权、经销权与家族信托方案。体检时发现：多份大额保单的受益人、投保人主体与当前拟定的接班路径存在明显冲突。',
      '体检发现一：企业财产险与个人寿险分属不同顾问推荐，从未放在同一张架构图里对照；若企业主突发变故，理赔金可能绕开信托账户直接进入个人账户。',
      '体检发现二：团险覆盖范围与一线仓储、门店雇员实际人数脱节；部分保单仍指定已不再参与经营的旁系亲属为受益人。',
      '体检发现三：经销商保证金、库存与应收账款等「表外敞口」未纳入任何责任险评估，接班演练时暴露出「有钱有保单，却挡不住经营连续性风险」。',
      '重构方向：以接班目标倒推受益结构与投保主体，让保险理赔路径与股权、信托、家庭协议同一套逻辑说话，并纳入年度风控年检。',
      '本文为脱敏案例，仅供财富大健康体检与风控认知参考，不构成产品推荐或投资建议。',
    ],
  },
  {
    slug: 'liquidity-risk-blindspot',
    author: '案例 04 · 文旅经营家族',
    title: '民宿老板家庭，账面资产高却输在责任敞口',
    excerpt:
      '多套物业与民宿业态带来可观现金流，公众责任与经营中断险却远低于真实敞口。',
    coverSrc: '/cases/liquidity-risk-blindspot.svg',
    coverAlt: '文旅经营家族流动性与责任险拆解封面',
    publishedAt: '脱敏片段 04',
    sourceUrl: 'https://mp.weixin.qq.com/s/1wR5hfNb7MlgIaFu0-nsKA',
    body: [
      '家族在华东经营连锁民宿与物业投资，账面资产规模可观，年度现金流稳定，但可用于应急的流动性有限。企业主个人对外担保、雇员管理与高频接待访客，叠加了非预期的责任敞口。',
      '体检发现一：现有公众责任与雇主责任险限额，远低于多门店合并经营后的实际规模；装修翻新期间的火灾、滑倒等风险未单独评估。',
      '体检发现二：个人高端医疗配置充足，却未配置与出行、接待频率匹配的紧急救援与法律费用保障；民宿平台责任与线下经营责任在保单中边界模糊。',
      '体检发现三：家庭从未做过「压力测试」：若主理人 90 天内无法履职，现有保单能否支撑贷款续期、员工薪酬与客房退款？答案是否定的。',
      '重构方向：先算清「现金流缺口」与「责任峰值」，再匹配责任险、营业中断与关键人保障，让高净值不等于高脆弱。',
      '本文为脱敏案例，仅供财富大健康体检与风控认知参考，不构成产品推荐或投资建议。',
    ],
  },
]

export function getCaseStory(slug: string) {
  return caseStories.find((story) => story.slug === slug)
}

export function getAdjacentCaseStories(slug: string) {
  const index = caseStories.findIndex((story) => story.slug === slug)
  if (index === -1) return { prev: undefined, next: undefined }

  return {
    prev: index > 0 ? caseStories[index - 1] : undefined,
    next: index < caseStories.length - 1 ? caseStories[index + 1] : undefined,
  }
}
