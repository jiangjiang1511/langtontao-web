export type CaseStory = {
  slug: string
  author: string
  title: string
  excerpt: string
  coverSrc: string
  coverAlt: string
  body: string[]
  publishedAt?: string
}

export const casesPageMeta = {
  eyebrow: 'CASE LAB · 050',
  title: '拆解50个高净值家庭财险配资方案',
  lead:
    '我们从真实家庭的风控档案中抽取样本，把「买了什么、缺了什么、为什么失效」讲清楚——不卖产品，只帮你看懂已有配置里的结构与漏洞。以下为先公开的 4 个拆解片段，更多案例持续更新。',
  description:
    '朗敦道拆解 50 个高净值家庭财险配资方案：从保单结构、风险敞口与配资逻辑出发，呈现可复用的风控经验。',
} as const

export const caseStories: CaseStory[] = [
  {
    slug: 'manufacturing-policy-stack',
    author: '案例 01 · 制造业家族',
    title: '保单堆了七八份，大额风险却不在保障范围内',
    excerpt:
      '年缴保费不低，但责任重叠、关键敞口空白——「买了很多」不等于「配对了」。',
    coverSrc: '/cases/manufacturing-policy-stack.svg',
    coverAlt: '制造业家族财险配资拆解封面',
    publishedAt: '拆解片段 01',
    body: [
      '这家制造业家族在内地与东南亚均有产能布局，夫妻与二代名下合计持有 8 份人身险与 3 份财产险，年缴保费超过七位数。表面上看「配置很满」，但体检后发现：企业主个人身故保障与企业债务隔离之间几乎没有有效衔接。',
      '拆解重点一：多份终身寿与年金功能重叠，流动性占用高，却未覆盖私人飞机与跨境设备运输的专项财产险缺口。',
      '拆解重点二：早期购买的团险与个险受益人结构混乱，一旦发生理赔，家族成员并不清楚该找谁、赔多少、赔给谁。',
      '重构方向：先做责任地图，再谈产品增减——把「堆量」改成「对齐敞口」，是这类家庭的第一课。',
    ],
  },
  {
    slug: 'cross-border-coverage-gap',
    author: '案例 02 · 跨境双居家庭',
    title: '内地与境外各买各的，理赔时才发现「两边都不赔」',
    excerpt:
      '香港保单 + 内地保单并行，但司法管辖、医疗网络与财产标的并未打通。',
    coverSrc: '/cases/cross-border-coverage-gap.svg',
    coverAlt: '跨境家庭财险配资拆解封面',
    publishedAt: '拆解片段 02',
    body: [
      '客户常驻香港，父母与核心资产仍在内地。境内外各有一套「看起来完整」的保障，却缺少一张总览表说明：哪类风险在哪边承保、哪类风险实际上无人覆盖。',
      '拆解发现：境外医疗险无法覆盖内地突发住院；内地财产险未含香港自宅；跨境汇款路径上的账户安全与盗刷风险完全空白。',
      '更隐蔽的问题在于信息孤岛——配偶一方掌握境外保单，另一方掌握内地保单，双方都不知道完整图景。',
      '重构方向：建立「一张家庭风控总图」，按人、按资产、按地域标注承保边界，再谈增补与替换。',
    ],
  },
  {
    slug: 'succession-beneficiary-mismatch',
    author: '案例 03 · 接班预备家族',
    title: '人身险受益写得很满，股权传承却完全对不上',
    excerpt:
      '保单受益人与信托、股权架构脱节，二代接班前夜可能触发意外纠纷。',
    coverSrc: '/cases/succession-beneficiary-mismatch.svg',
    coverAlt: '接班家族受益结构拆解封面',
    publishedAt: '拆解片段 03',
    body: [
      '家族已进入二代接班筹备期，律师团队正在梳理股权与信托架构。体检时发现：多份大额保单的受益人仍是十年前填写的直系亲属，与当前拟定的接班方案存在明显冲突。',
      '若企业主突发变故，保险理赔金可能绕开信托账户直接进入个人账户，打乱原本设计的控制权安排；部分保单甚至仍指定已不参与经营的旁系亲属。',
      '这类问题在高净值家庭并不罕见：保单是「活文件」，但多数家庭从未按架构迭代同步更新。',
      '重构方向：以接班目标倒推受益结构，让保险理赔路径与股权、信托、家庭协议同一套逻辑说话。',
    ],
  },
  {
    slug: 'liquidity-risk-blindspot',
    author: '案例 04 · 高流动性资产家族',
    title: '账面财富很高，一场意外却可能先卡在「没钱赔」',
    excerpt:
      '资产大多锁在股权与不动产里，短期流动性不足，责任险限额远低于实际敞口。',
    coverSrc: '/cases/liquidity-risk-blindspot.svg',
    coverAlt: '流动性风险财险配资拆解封面',
    publishedAt: '拆解片段 04',
    body: [
      '家族资产以股权和一线城市核心物业为主，年度现金流看起来稳定，但可用于应急的流动性有限。企业主个人对外担保与家族成员高频国际出行，叠加了非预期的责任敞口。',
      '拆解发现：现有公众责任与雇主责任险限额，远低于实际经营规模；个人高端医疗虽充足，却未配置与出行频率匹配的境外紧急救援与法律费用保障。',
      '更关键的是——家庭从未做过「压力测试」：若主理人 90 天内无法履职，现有保单能否支撑企业续贷与家人生活开支？答案是否定的。',
      '重构方向：先算清「现金流缺口」，再匹配责任险与流动性工具，让高净值不等于高脆弱。',
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
