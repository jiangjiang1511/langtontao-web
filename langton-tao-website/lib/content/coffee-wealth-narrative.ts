export type WealthStatItem = {
  id: string
  label: string
  scale: string
  share?: string
  description: string
}

export type WealthNarrativeNode = {
  id: string
  title: string
  summary?: string
  body?: string
  formula?: string
  coverSrc?: string
  posterSrc?: string
  stats?: WealthStatItem[]
  children?: WealthNarrativeNode[]
}

export const wealthNarrativeSectionMeta = {
  eyebrow: 'Wealth System · 财富系统',
  title: '财富是如何积累与传承的？',
  lead: '从「人类财富死局」到系统升级，再到今天的中国国内资产格局——按两大主题分区浏览，点击话题卡片深入了解正文、公式与国内资产拆分。',
} as const

export const wealthNarrativeRoot: WealthNarrativeNode = {
  id: 'wealth-root',
  title: '财富是如何积累与传承的？',
  children: [
    {
      id: 'wealth-deadlock',
      title: '人类财富死局',
      summary: '在系统升级之前，极度贫穷才是常态。',
      children: [
        {
          id: 'poverty-norm',
          title: '极度贫穷是常态',
          coverSrc: '/assets/bearbitcoffee/wealthdelema/wealthdelema-01.jpg',
          body: '在工业革命之前，人类社会的默认状态是物质匮乏。财富积累极其缓慢，代际之间很难出现跃迁——「穷」不是偶然，而是系统缺位时的常态。',
        },
        {
          id: 'malthusian-trap',
          title: '马尔萨斯陷阱',
          coverSrc: '/assets/bearbitcoffee/wealthdelema/wealthdelema-02.jpg',
          body: '人口增长快于粮食与产出增长，生产力一旦停滞，新增人口就会把人均资源拉回生存线。家庭层面表现为：靠勤劳难以摆脱结构性贫困，除非遭遇技术或制度的外生冲击。',
        },
      ],
    },
    {
      id: 'wealth-breakthrough',
      title: '如何打破死局？',
      summary: '贝叶斯式修正、系统升级，以及今天所处的离火时代坐标。',
      children: [
        {
          id: 'bayesian-acceleration',
          title: '贝叶斯式加速',
          coverSrc: '/assets/bearbitcoffee/wealthdelema/breakthrough-01.jpg',
          summary: '在模糊的【四象】中不断寻找最优解。',
          formula: 'P(A|B) = P(B|A) × P(A) / P(B)',
          body: '财富的演进并非线性，而是基于人类在实践中不断获取新信息、修正先验概率、促成技术与契约系统升级的非线性过程。真正改变命运的，不是更辛苦地重复旧动作，而是一次次系统升级。对家庭财富来说也是一样：旧系统扛不住新摩擦，就必须升级。',
        },
        {
          id: 'system-upgrade',
          title: '系统升级',
          coverSrc: '/assets/bearbitcoffee/wealthdelema/breakthrough-02.jpg',
          summary: '能源、信用、组织、技术、金融的连锁跃迁。',
          children: [
            {
              id: 'original-system',
              title: '原始系统',
              body: '极度贫穷 + 马尔萨斯陷阱。几乎没有积累和增长，家庭财富高度依赖土地、宗族与偶然性。',
            },
            {
              id: 'stage-steam',
              title: '阶段一 · 蒸汽时代（1760–1870）',
              body: '打破生存诅咒：手工转向机器，生产率跃升，城市化与资本市场萌芽，财富开始脱离纯粹的土地束缚。',
            },
            {
              id: 'stage-electrical',
              title: '阶段二 · 电气时代（1870–1950）',
              body: '两难时代：电气化带来效率革命，但两次大战让财富在毁灭与重组中剧烈洗牌，家族传承第一次面对全球化风险。',
            },
            {
              id: 'stage-information',
              title: '阶段三 · 信息时代（1950–2008）',
              body: '指数扩张：信用工具与金融市场深化，「信用虚空」故事开启，资产价格与实体经济周期开始脱钩。',
            },
            {
              id: 'stage-li-fire',
              title: '阶段四 · 离火时代（2008–2025）',
              body: '数字主机与范式转移：算力即权力，财富向分布式系统防御转移。家庭需要同时理解流动性、算法与链上资产的新规则。',
            },
          ],
        },
        {
          id: 'wealth-today',
          title: '现在的人类财富系统到了哪一步？',
          coverSrc: '/assets/bearbitcoffee/wealthdelema/breakthrough-03.jpg',
          posterSrc: '/assets/bearbitcoffee/wealthdelema/breakthrough-03poster.png',
          summary: '471 万亿宏大叙事——中国国内资产格局的五块拼图。',
          children: [
            {
              id: 'global-471t',
              title: '471 万亿宏大叙事',
              body: '以下为中国国内财富存量的大致拆分（教育演示口径，非投资建议）。它回答的是：今天的钱，主要压在国内哪些资产形态上。',
              stats: [
                {
                  id: 'global-real-estate',
                  label: '房地产',
                  scale: '约 170 万亿',
                  share: '>36%',
                  description: '肉身安放处与最终的税收陷阱',
                },
                {
                  id: 'global-equities',
                  label: '金融资产 / 股市',
                  scale: '约 115 万亿',
                  share: '24%',
                  description: '流动性舞池，算法围猎的主战场',
                },
                {
                  id: 'global-gov-debt',
                  label: '政府债务',
                  scale: '约 90 万亿',
                  description: '主权信用的物理契约与杠杆底座',
                },
                {
                  id: 'global-gold',
                  label: '黄金',
                  scale: '约 3 万亿',
                  description: '穿越周期的终极防线与永恒墓志铭',
                },
                {
                  id: 'global-crypto',
                  label: '加密资产',
                  scale: '约 3 万亿',
                  description: '新力量，离火时代的分布式防御工具',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export function findWealthNodeByPath(
  root: WealthNarrativeNode,
  path: string[]
): WealthNarrativeNode | null {
  let current: WealthNarrativeNode | undefined = root
  for (const id of path) {
    current = current?.children?.find((child) => child.id === id)
    if (!current) return null
  }
  return current ?? null
}

export function getWealthBreadcrumb(
  root: WealthNarrativeNode,
  path: string[]
): WealthNarrativeNode[] {
  const crumbs: WealthNarrativeNode[] = [root]
  let current = root
  for (const id of path) {
    const next = current.children?.find((child) => child.id === id)
    if (!next) break
    crumbs.push(next)
    current = next
  }
  return crumbs
}
