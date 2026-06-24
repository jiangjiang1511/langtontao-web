import type { LangtontaoChallengeId } from '@/lib/content/langtontao/langtontao-challenge-links'
import type { LangtontaoSolutionAnchor } from '@/lib/content/langtontao/langtontao-challenge-links'

export const langtontaoBeautifulMeta = {
  eyebrow: '何为漂亮',
  title: '何为漂亮 · 朗敦道业务',
  lead: '漂亮的系统，不是看起来收益最高，而是能诚实面对零和游戏、长期养根，并保留人的真实判断力。',
} as const

export type BeautifulPillar = {
  id: string
  title: string
  summary: string
  highlight?: boolean
}

export const langtontaoBeautifulPillars: BeautifulPillar[] = [
  {
    id: 'beautiful-system',
    title: '什么是真正漂亮的体系？',
    summary: '诚实面对零和游戏、长期养根，保留真实判断力。',
  },
  {
    id: 'familyos',
    title: 'LangtonTAO FamilyOS',
    summary: '为家族企业与财富传承提供系统解决方案——混沌中的家族操作系统。',
    highlight: true,
  },
  {
    id: 'vfo-mfo',
    title: 'VFO / MFO 模式',
    summary: '专业赋能华人家族办公室一同成长。',
    highlight: true,
  },
  {
    id: 'four-quadrants',
    title: '四维生存象限',
    summary: '择良地而居 · 遇明人而交 · 观大势而动 · 知进退而安。',
  },
  {
    id: 'good-ancestor',
    title: '终极目标：成为好祖先',
    summary: '留下面对不确定性的能力，而非仅留下资产。',
  },
  {
    id: 'macro-micro',
    title: '宏观接受 · 微观大有作为',
    summary: '做价值的捕手，不做焦虑的奴隶——在微观层面做能做的事。',
  },
]

export type FamilyOsLeaf = {
  id: string
  title: string
  philosophy: string
  challengeIds: LangtontaoChallengeId[]
  anchor?: LangtontaoSolutionAnchor
  embed?: 'checkup' | 'cases' | 'education' | 'community' | 'leader' | 'allocation' | 'cognition'
}

export type FamilyOsBranch = {
  id: string
  title: string
  children: FamilyOsLeaf[]
}

export const langtontaoFamilyOsTree: FamilyOsBranch[] = [
  {
    id: 'wealth-plan',
    title: '财富养成计划',
    children: [
      {
        id: 'health-checkup',
        title: '财富大健康体',
        philosophy: '先年检敞口与结构，再谈配置——资产负债表问诊与年度陪跑。',
        challengeIds: ['debt-channel', 'purchasing-power', 'asset-shrinkage'],
        anchor: 'beautiful-checkup',
        embed: 'checkup',
      },
      {
        id: 'excellence-gen',
        title: '卓越世代计划',
        philosophy: '国际教育规划、升学指导与游学——代际人力资本投资。',
        challengeIds: ['education-cognition', 'employment-ice-age'],
        anchor: 'beautiful-education',
        embed: 'education',
      },
      {
        id: 'family-leader',
        title: '家族领袖计划',
        philosophy: '身份规划、信托设立、家族宪章——传承的顶层外壳。',
        challengeIds: ['succession', 'order-shakeup'],
        anchor: 'beautiful-leader',
        embed: 'leader',
      },
      {
        id: 'global-assets',
        title: '全球资产配置',
        philosophy: '跨币种、跨周期、跨境法税——在宏观结构中定位家庭坐标。',
        challengeIds: ['global-allocation', 'deflation-shadow'],
        anchor: 'beautiful-allocation',
        embed: 'allocation',
      },
    ],
  },
  {
    id: 'superhero',
    title: '超级英雄之旅',
    children: [
      {
        id: 'english-key',
        title: '英语钥匙计划',
        philosophy: '语言是就业冰河时代最可迁移的资产之一。',
        challengeIds: ['employment-ice-age'],
        anchor: 'beautiful-education',
        embed: 'education',
      },
      {
        id: 'courage',
        title: '勇气历练计划',
        philosophy: '寒晓航海、博睿学者——具身认知与默会知识传递。',
        challengeIds: ['cognition-gap'],
        anchor: 'beautiful-community',
        embed: 'community',
      },
      {
        id: 'cognition-circle',
        title: '认知兑现圈',
        philosophy: '读书会、财富沙龙、私董会——诚实投资学的长期场域。',
        challengeIds: ['cognition-gap'],
        anchor: 'beautiful-cognition',
        embed: 'cognition',
      },
    ],
  },
]

export const langtontaoChallengeSolutionBridge = [
  {
    challengeId: 'debt-channel' as LangtontaoChallengeId,
    challenge: '债务通道：资产缩、债务不缩',
    philosophy: '先看清资产负债表，再谈增长',
    solution: '财富大健康体检',
    anchor: 'beautiful-checkup' as LangtontaoSolutionAnchor,
  },
  {
    challengeId: 'asset-shrinkage' as LangtontaoChallengeId,
    challenge: '资产缩水：地产与股权重估',
    philosophy: '结构先于收益率',
    solution: '案例库 + 体检年检',
    anchor: 'beautiful-cases' as LangtontaoSolutionAnchor,
  },
  {
    challengeId: 'education-cognition' as LangtontaoChallengeId,
    challenge: '教育金与升学路径',
    philosophy: '代际投资需要路线图',
    solution: '卓越世代 · 英语钥匙',
    anchor: 'beautiful-education' as LangtontaoSolutionAnchor,
  },
  {
    challengeId: 'cognition-gap' as LangtontaoChallengeId,
    challenge: '财商与同频缺口',
    philosophy: '认知定投对抗周期情绪波动',
    solution: '认知兑现圈 · 社群陪跑',
    anchor: 'beautiful-community' as LangtontaoSolutionAnchor,
  },
  {
    challengeId: 'succession' as LangtontaoChallengeId,
    challenge: '传承与治理缺位',
    philosophy: '好祖先留下能力与规则',
    solution: '家族领袖计划',
    anchor: 'beautiful-leader' as LangtontaoSolutionAnchor,
  },
  {
    challengeId: 'global-allocation' as LangtontaoChallengeId,
    challenge: '宏观结构变迁',
    philosophy: '跨币种跨周期配置纪律',
    solution: '全球资产配置 + 专业工具',
    anchor: 'beautiful-tools' as LangtontaoSolutionAnchor,
  },
]
