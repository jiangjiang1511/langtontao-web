import type { LangtontaoChallengeId } from '@/lib/content/langtontao/langtontao-challenge-links'

export const langtontaoPanicWealthMeta = {
  eyebrow: 'Part II · 何以为家',
  title: '何事惊慌 · 何为财富',
  lead: '放下宏大叙事的执念，从专业视角理解惊慌的源头，以及财富在人类文明史中的位置。',
} as const

export type PanicWealthNode = {
  id: string
  section: 'panic' | 'wealth'
  title: string
  summary: string
  body: string
  chartType?: 'timeline' | 'structure' | 'channels' | 'formula'
  solutionIds: LangtontaoChallengeId[]
}

export const langtontaoPanicNodes: PanicWealthNode[] = [
  {
    id: 'inheritance-essence',
    section: 'panic',
    title: '传承的本质：一切为了孩子',
    summary: '熊比特本质——财富是为未来服务的系统，而非账户上的数字。',
    body: '朗敦道相信：传承不是留下最多的钱，而是让下一代拥有面对不确定性的能力。一切为了孩子，意味着架构、认知与规则先于产品。',
    solutionIds: ['succession', 'education-cognition'],
  },
  {
    id: 'panic-source',
    section: 'panic',
    title: '惊慌的源头是什么？',
    summary: '以人之躯直面系统性摩擦——惊慌不源自胆小，而是感知到多个系统失灵、重定价与再排序。',
    body: '就业、资产、供需与国际秩序同时重构，家庭失去方向感与选择权。惊慌是旧经验在新结构面前集体失效的信号。',
    solutionIds: ['employment-ice-age', 'asset-landslide', 'deflation-shadow', 'order-shakeup'],
  },
  {
    id: 'employment-ice-age',
    section: 'panic',
    title: '就业冰河',
    summary: '人力资本回报曲线变平，家庭收入预期需要重新定价。',
    body: '当就业市场进入冰河期，语言、国际路径与可迁移技能成为家庭资产负债表上的隐形资产。',
    solutionIds: ['employment-ice-age'],
  },
  {
    id: 'asset-landslide',
    section: 'panic',
    title: '财富型资产滑坡',
    summary: '地产、股权与公司估值被周期重估，许多家庭约 70% 资产锚定房产。',
    body: '资产缩水通道：曾经「安全」的配置在新周期里被重新定价。结构先于收益率。',
    solutionIds: ['asset-landslide', 'asset-shrinkage'],
  },
  {
    id: 'deflation-shadow',
    section: 'panic',
    title: '供需错配通缩阴影',
    summary: '消费信心、收入预期与债务压力相互牵动。',
    body: '大通缩时代的链式反应，让购买力与资产价格同时承压。家庭需要跨币种与跨周期的防御架构。',
    solutionIds: ['deflation-shadow', 'purchasing-power'],
  },
  {
    id: 'order-shakeup',
    section: 'panic',
    title: '国际秩序动摇',
    summary: '跨境规则、身份与交付节点的重要性上升。',
    body: '国际秩序重构时，家庭不能只看资产本身，还要看制度环境与专业服务网络——香港是这一叙事的关键节点。',
    solutionIds: ['order-shakeup', 'global-allocation'],
  },
  {
    id: 'chaos-channels',
    section: 'panic',
    title: '财富「凭空消失」的三条通道',
    summary: '购买力 · 资产缩水 · 债务——比「有没有钱」更关键的是「钱有没有结构」。',
    body: '购买力通道：医疗、养老、教育与国际通行成本系统性抬升。资产缩水通道：地产、股权、公司估值重估。债务通道：资产缩、债务不缩；现金流降、利息不缩；担保责任仍在。',
    chartType: 'channels',
    solutionIds: ['purchasing-power', 'asset-shrinkage', 'debt-channel'],
  },
]

export const langtontaoWealthNodes: PanicWealthNode[] = [
  {
    id: 'wealth-deadlock',
    section: 'wealth',
    title: '人类财富死局',
    summary: '极度贫穷是常态；马尔萨斯陷阱描述旧系统下增长极易被吞噬。',
    body: '若把视野拉长到人类文明史，财富积累对绝大多数家庭本就艰难。打破死局依赖系统升级，而非在同一规则里更拼命。',
    solutionIds: ['cognition-gap'],
  },
  {
    id: 'bayesian',
    section: 'wealth',
    title: '贝叶斯式加速',
    summary: '在模糊的四象中不断寻找最优解——获取新信息、修正先验、推动契约系统升级。',
    body: '财富的演进并非线性，而是基于人类在实践中不断获取新信息、修正先验概率、促进技术与契约系统升级的非线性过程。',
    chartType: 'formula',
    solutionIds: ['cognition-gap', 'global-allocation'],
  },
  {
    id: 'system-upgrade',
    section: 'wealth',
    title: '系统升级五阶段',
    summary: '蒸汽 → 电气 → 信息 → 离火——命运改变来自系统换轨，而非重复旧动作。',
    body: '真正改变命运的，是一遍又一遍的系统升级：能源、信用、组织、技术、金融。家庭财富亦然——旧系统扛不住新摩擦，就必须升级。',
    chartType: 'timeline',
    solutionIds: ['global-allocation'],
  },
  {
    id: 'wealth-471t',
    section: 'wealth',
    title: '471 万亿宏大叙事',
    summary: '房地产 · 金融 · 政府债 · 黄金 · 加密——识别时代位置，再谈家庭坐标。',
    body: '华人家庭今天的选择，发生在约 471 万亿的宏观结构之中。积累与传承不是「选哪个产品」，而是识别时代位置后持续升级家庭操作系统。',
    chartType: 'structure',
    solutionIds: ['global-allocation', 'asset-landslide'],
  },
  {
    id: 'family-wealth-path',
    section: 'wealth',
    title: '家庭的财富要如何积累与传承？',
    summary: 'TAO 定律：保全 · 增长 · 传承——从第一天本金到第一百年慈善。',
    body: '朗敦道用 TAO 定律把宏观判断落到家庭时间轴：第一天本金 → 第二天现金 → 压舱石 → 信托与传承 → 黄金锚点 → 慈善与传承。积累与传承是同一条河的两岸。',
    solutionIds: ['succession', 'debt-channel', 'global-allocation'],
  },
]

export const langtontaoWealthTimeline = [
  { era: '原始系统', years: '—', label: '极度贫穷 + 马尔萨斯陷阱', note: '几乎无积累' },
  { era: '蒸汽时代', years: '1760–1870', label: '手工到机器', note: '打破生存诅咒' },
  { era: '电气时代', years: '1870–1950', label: '财富毁灭与重组', note: '两次大战' },
  { era: '信息时代', years: '1950–2008', label: '指数扩张', note: '信用_void 叙事开端' },
  { era: '离火时代', years: '2008–2025', label: '算力即权力', note: '分布式防御' },
] as const

export const langtontaoWealthStructure = [
  { id: 'realestate', label: '房地产', amount: '~170 万亿', share: 36, tagline: '肉身安放处与税收陷阱' },
  { id: 'financial', label: '金融资产/股市', amount: '~115 万亿', share: 24, tagline: '流动性舞池，算法围猎主战场' },
  { id: 'govdebt', label: '政府债务', amount: '~90 万亿', share: 19, tagline: '主权信用与杠杆底座' },
  { id: 'gold', label: '黄金', amount: '~13 万亿', share: 3, tagline: '穿越周期的终极防线' },
  { id: 'crypto', label: '加密资产', amount: '~3 万亿', share: 1, tagline: '离火时代分布式防御工具' },
] as const

export const langtontaoChaosChannels = [
  { id: 'purchasing-power' as const, title: '购买力通道', body: '医疗、养老、教育、国际通行成本系统性抬升' },
  { id: 'asset-shrinkage' as const, title: '资产缩水通道', body: '地产、股权、公司估值被周期重估' },
  { id: 'debt-channel' as const, title: '债务通道', body: '资产缩、债务不缩；担保与现金流缺口' },
]

export const langtontaoPanicWealthAllNodes = [
  ...langtontaoPanicNodes,
  ...langtontaoWealthNodes,
]
