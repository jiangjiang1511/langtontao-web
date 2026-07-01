export type LangtontaoMajorTheme = 'home' | 'superhero' | 'checkup' | 'network'

export type LangtontaoMajorSectionMeta = {
  id: string
  eyebrow: string
  title: string
  lead: string
  theme: LangtontaoMajorTheme
}

export const langtontaoMajorSections: readonly LangtontaoMajorSectionMeta[] = [
  {
    id: 'home-roots',
    eyebrow: 'Part I · 何以为家',
    title: '何以为家',
    lead: '从何必家办到何事惊慌、何为财富——理解家庭在周期中的位置，再勾勒未来十年的愿望与漂亮体系。',
    theme: 'home',
  },
  {
    id: 'superhero',
    eyebrow: 'Part II · 超级英雄之旅',
    title: '超级英雄之旅',
    lead: '超级英雄之旅的本质在于具身认知：实地走、看、感，把全球资产配置从「听懂了」推进到「做对了」。体察社会、识别机会、感知风险——让配置判断落在真实世界里，而非纸面逻辑。麦理浩径、博睿学者、哪吒航海与海外考察，都是这趟旅程的不同形态。',
    theme: 'superhero',
  },
  {
    id: 'wealth-checkup',
    eyebrow: 'Part III · 财富健康体检',
    title: '财富健康体检',
    lead: '先年检家庭敞口与结构，再谈配置——资产负债表问诊、年度陪跑与真实案例修复。',
    theme: 'checkup',
  },
  {
    id: 'yitishuangkua',
    eyebrow: 'Part IV · 一体双跨',
    title: '一体双跨',
    lead: '内地顶层架构与香港跨境交付同频运作——同一套传承逻辑，跨地域、跨领域的全球网络。',
    theme: 'network',
  },
] as const

export function getLangtontaoMajorSection(id: string) {
  return langtontaoMajorSections.find((section) => section.id === id) ?? null
}
