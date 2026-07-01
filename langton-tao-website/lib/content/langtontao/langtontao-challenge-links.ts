export type LangtontaoChallengeId =
  | 'employment-ice-age'
  | 'asset-landslide'
  | 'deflation-shadow'
  | 'order-shakeup'
  | 'purchasing-power'
  | 'asset-shrinkage'
  | 'debt-channel'
  | 'cognition-gap'
  | 'succession'
  | 'education-cognition'
  | 'global-allocation'

export type LangtontaoSolutionAnchor =
  | 'beautiful-checkup'
  | 'beautiful-cases'
  | 'beautiful-education'
  | 'beautiful-community'
  | 'beautiful-leader'
  | 'beautiful-allocation'
  | 'beautiful-cognition'
  | 'beautiful-tools'

export type LangtontaoChallengeLink = {
  challengeId: LangtontaoChallengeId
  solutionAnchor: LangtontaoSolutionAnchor
  ctaLabel: string
  philosophy: string
}

export const langtontaoChallengeLinks: LangtontaoChallengeLink[] = [
  {
    challengeId: 'employment-ice-age',
    solutionAnchor: 'beautiful-education',
    ctaLabel: '英语钥匙与升学规划',
    philosophy: '在就业冰河时代，语言能力与国际升学路径是家庭人力资本的长期期权。',
  },
  {
    challengeId: 'asset-landslide',
    solutionAnchor: 'beautiful-checkup',
    ctaLabel: '财富大健康体检',
    philosophy: '先年检敞口与结构，再谈配置——体检是识别资产滑坡前的第一道防线。',
  },
  {
    challengeId: 'deflation-shadow',
    solutionAnchor: 'beautiful-allocation',
    ctaLabel: '全球资产配置',
    philosophy: '跨币种、跨周期的配置纪律，是对抗通缩阴影与购买力侵蚀的结构性回应。',
  },
  {
    challengeId: 'order-shakeup',
    solutionAnchor: 'beautiful-leader',
    ctaLabel: '家族领袖与身份规划',
    philosophy: '国际秩序重构时，身份、信托与跨境主体是家庭规则的外壳。',
  },
  {
    challengeId: 'purchasing-power',
    solutionAnchor: 'beautiful-checkup',
    ctaLabel: '检视购买力敞口',
    philosophy: '医疗、养老、教育与国际通行成本抬升——需要把现金流与责任放进同一张表。',
  },
  {
    challengeId: 'asset-shrinkage',
    solutionAnchor: 'beautiful-cases',
    ctaLabel: '查看真实修复案例',
    philosophy: '地产与股权重估不是抽象新闻，案例看见问题如何被识别、拆解与修复。',
  },
  {
    challengeId: 'debt-channel',
    solutionAnchor: 'beautiful-checkup',
    ctaLabel: '资产负债问诊',
    philosophy: '资产缩、债务不缩——体检把隐性担保与现金流缺口摆到桌面上。',
  },
  {
    challengeId: 'cognition-gap',
    solutionAnchor: 'beautiful-cognition',
    ctaLabel: '认知兑现圈',
    philosophy: '诚实投资学与读书会，是把财商缺口变成可重复执行的认知定投。',
  },
  {
    challengeId: 'succession',
    solutionAnchor: 'beautiful-leader',
    ctaLabel: '家族传承架构',
    philosophy: '传承不是留多少钱，而是架构、治理与下一代能力的同频传递。',
  },
  {
    challengeId: 'education-cognition',
    solutionAnchor: 'beautiful-education',
    ctaLabel: '卓越世代计划',
    philosophy: '教育金与升学路径，是家庭十年愿望清单里最常被低估的长期负债。',
  },
  {
    challengeId: 'global-allocation',
    solutionAnchor: 'beautiful-allocation',
    ctaLabel: '全球资产配置方案',
    philosophy: '在中国 471 万亿宏观结构中定位自家坐标，再谈工具与交付节点。',
  },
]

export const langtontaoChallengeLinkById = Object.fromEntries(
  langtontaoChallengeLinks.map((link) => [link.challengeId, link])
) as Record<LangtontaoChallengeId, LangtontaoChallengeLink>

export function getChallengeLink(challengeId: string) {
  return langtontaoChallengeLinkById[challengeId as LangtontaoChallengeId]
}
