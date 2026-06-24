import type { LangtontaoChallengeId } from '@/lib/content/langtontao/langtontao-challenge-links'

export type WishlistDimension = 'wealth' | 'relations' | 'education' | 'legacy'

export type WishlistSurveyOption = {
  id: string
  label: string
  weight: Partial<Record<WishlistDimension, number>>
  challengeHint?: LangtontaoChallengeId
}

export type WishlistSurveyQuestion = {
  id: string
  dimension: WishlistDimension
  prompt: string
  options: readonly WishlistSurveyOption[]
}

export const langtontaoWishlistMeta = {
  eyebrow: 'Interactive · 十年愿望清单',
  title: '家庭十年愿望清单',
  lead: '财富、关系、教育、传承——四个维度，勾勒你们家未来十年的优先序。没有标准答案，只有更诚实的方向感。',
  stageHint: '点选翻页 · 约 3 分钟',
  thanks: '谢谢你愿意把家庭的长期愿望放进对话里。以下是基于你选择的演示画像——建议与顾问进一步对齐。',
  resultsCta: '查看推荐方案',
  nextLabel: '下一题',
  prevLabel: '上一题',
  completeLabel: '查看画像',
} as const

export const langtontaoWishlistQuestions: readonly WishlistSurveyQuestion[] = [
  {
    id: 'w1',
    dimension: 'wealth',
    prompt: '未来十年，财富方面你最想守住的是什么？',
    options: [
      { id: 'w1a', label: '购买力与生活品质', weight: { wealth: 2 }, challengeHint: 'purchasing-power' },
      { id: 'w1b', label: '资产不缩水、结构清晰', weight: { wealth: 2 }, challengeHint: 'asset-shrinkage' },
      { id: 'w1c', label: '债务可控、现金流安全', weight: { wealth: 2 }, challengeHint: 'debt-channel' },
      { id: 'w1d', label: '跨境配置与币种分散', weight: { wealth: 1 }, challengeHint: 'global-allocation' },
    ],
  },
  {
    id: 'w2',
    dimension: 'wealth',
    prompt: '若只能优先一件事，你会选？',
    options: [
      { id: 'w2a', label: '先做一次全面的财富健康体检', weight: { wealth: 3 }, challengeHint: 'debt-channel' },
      { id: 'w2b', label: '建立全球资产配置框架', weight: { wealth: 2 }, challengeHint: 'global-allocation' },
      { id: 'w2c', label: '提升投资认知，拒绝话术', weight: { wealth: 1 }, challengeHint: 'cognition-gap' },
    ],
  },
  {
    id: 'r1',
    dimension: 'relations',
    prompt: '家庭关系方面，十年内你最担心什么？',
    options: [
      { id: 'r1a', label: '成员理念不同频、沟通断裂', weight: { relations: 2 } },
      { id: 'r1b', label: '接班与权力交接无规则', weight: { relations: 2 }, challengeHint: 'succession' },
      { id: 'r1c', label: '婚姻或家庭结构变化带来风险', weight: { relations: 1 } },
    ],
  },
  {
    id: 'r2',
    dimension: 'relations',
    prompt: '你希望家庭如何「一起面对不确定」？',
    options: [
      { id: 'r2a', label: '建立家族治理与沟通节奏', weight: { relations: 2 }, challengeHint: 'succession' },
      { id: 'r2b', label: '通过共同经历建立同频', weight: { relations: 1 }, challengeHint: 'cognition-gap' },
      { id: 'r2c', label: '先厘清法律关系与资产归属', weight: { relations: 2 }, challengeHint: 'debt-channel' },
    ],
  },
  {
    id: 'e1',
    dimension: 'education',
    prompt: '教育规划上，十年愿景更接近？',
    options: [
      { id: 'e1a', label: '国际升学与身份路径', weight: { education: 2 }, challengeHint: 'education-cognition' },
      { id: 'e1b', label: '英语与认知能力提升', weight: { education: 2 }, challengeHint: 'employment-ice-age' },
      { id: 'e1c', label: '财商与下一代判断力', weight: { education: 1 }, challengeHint: 'cognition-gap' },
    ],
  },
  {
    id: 'e2',
    dimension: 'education',
    prompt: '你为教育金与升学预留了吗？',
    options: [
      { id: 'e2a', label: '尚未系统规划，需要路线图', weight: { education: 3 }, challengeHint: 'education-cognition' },
      { id: 'e2b', label: '有储备但担心购买力侵蚀', weight: { education: 2 }, challengeHint: 'purchasing-power' },
      { id: 'e2c', label: '已有方案，希望优化结构', weight: { education: 1 } },
    ],
  },
  {
    id: 'l1',
    dimension: 'legacy',
    prompt: '传承方面，你希望十年后留下什么？',
    options: [
      { id: 'l1a', label: '可执行的信托与治理架构', weight: { legacy: 2 }, challengeHint: 'succession' },
      { id: 'l1b', label: '下一代的认知与勇气', weight: { legacy: 2 }, challengeHint: 'cognition-gap' },
      { id: 'l1c', label: '跨境资产与身份的有序交接', weight: { legacy: 2 }, challengeHint: 'order-shakeup' },
    ],
  },
  {
    id: 'l2',
    dimension: 'legacy',
    prompt: '「成为好祖先」对你意味着什么？',
    options: [
      { id: 'l2a', label: '留下面对不确定性的能力', weight: { legacy: 3 } },
      { id: 'l2b', label: '资产、风险隔离与规则一并交接', weight: { legacy: 2 }, challengeHint: 'succession' },
      { id: 'l2c', label: '家族故事与价值观的可传递', weight: { legacy: 1 } },
    ],
  },
]

export type WishlistAnswers = Record<string, string>

export type WishlistProfile = {
  topDimension: WishlistDimension
  dimensionScores: Record<WishlistDimension, number>
  stageLabel: string
  exposureHint: string
  recommendedChallengeId: LangtontaoChallengeId
}

const dimensionLabels: Record<WishlistDimension, string> = {
  wealth: '财富',
  relations: '关系',
  education: '教育',
  legacy: '传承',
}

export function resolveWishlistProfile(answers: WishlistAnswers): WishlistProfile {
  const scores: Record<WishlistDimension, number> = {
    wealth: 0,
    relations: 0,
    education: 0,
    legacy: 0,
  }
  let topChallenge: LangtontaoChallengeId = 'debt-channel'
  let challengeWeight = 0

  for (const question of langtontaoWishlistQuestions) {
    const optionId = answers[question.id]
    const option = question.options.find((o) => o.id === optionId)
    if (!option) continue

    for (const [dim, w] of Object.entries(option.weight)) {
      scores[dim as WishlistDimension] += w ?? 0
    }
    if (option.challengeHint) {
      const w = Object.values(option.weight).reduce((a, b) => a + (b ?? 0), 0)
      if (w > challengeWeight) {
        challengeWeight = w
        topChallenge = option.challengeHint
      }
    }
  }

  const topDimension = (Object.entries(scores).sort(
    (a, b) => b[1] - a[1]
  )[0]?.[0] ?? 'wealth') as WishlistDimension

  const stageLabels: Record<WishlistDimension, string> = {
    wealth: '结构检视期——建议优先年检敞口与现金流',
    relations: '同频建设期——建议梳理关系与治理规则',
    education: '代际投资期——建议对齐升学与认知路径',
    legacy: '传承架构期——建议启动顶层设计与香港交付节点',
  }

  const exposureHints: Record<WishlistDimension, string> = {
    wealth: '购买力、资产缩水与债务三通道需一并审视',
    relations: '家庭关系与社会关系是传承执行的底层操作系统',
    education: '教育金与国际路线是十年期最常被低估的负债',
    legacy: '好祖先留下的是能力、架构与规则，而非单一账户',
  }

  return {
    topDimension,
    dimensionScores: scores,
    stageLabel: stageLabels[topDimension],
    exposureHint: exposureHints[topDimension],
    recommendedChallengeId: topChallenge,
  }
}

export function getWishlistDimensionLabel(dim: WishlistDimension) {
  return dimensionLabels[dim]
}
