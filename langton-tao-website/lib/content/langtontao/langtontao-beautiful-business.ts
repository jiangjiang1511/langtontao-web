import type { LangtontaoChallengeId } from '@/lib/content/langtontao/langtontao-challenge-links'
import type { LangtontaoSolutionAnchor } from '@/lib/content/langtontao/langtontao-challenge-links'

export const langtontaoBeautifulMeta = {
  eyebrow: '何为漂亮',
  title: '何为漂亮',
  lead: '漂亮的系统，不是看起来收益最高，而是能诚实面对零和游戏、长期养根，并保留人的真实判断力。',
} as const

export const langtontaoBeautifulFamilyOsMeta = {
  eyebrow: 'FamilyOS · 业务体系',
  title: 'LangtonTAO FamilyOS / VFO · MFO',
  lead: '为家族企业与财富传承提供系统解决方案——混沌中的家族操作系统；专业赋能华人家族办公室一同成长。',
} as const

export type BeautifulPhilosophySurface = {
  background: string
  accent: string
  foreground: string
  muted: string
}

export type BeautifulPhilosophyPillar = {
  id: string
  number: string
  title: string
  summary: string
  body?: string
  surface: BeautifulPhilosophySurface
  challengeIds: LangtontaoChallengeId[]
}

export const langtontaoBeautifulPhilosophyPillars: BeautifulPhilosophyPillar[] = [
  {
    id: 'beautiful-system',
    number: '01',
    title: '什么是真正漂亮的体系？',
    summary: '诚实面对零和游戏、长期养根，保留真实判断力。',
    surface: {
      background: '#fffef5',
      accent: '#ffe600',
      foreground: '#09090b',
      muted: '#71717a',
    },
    challengeIds: ['debt-channel', 'asset-shrinkage'],
  },
  {
    id: 'four-quadrants',
    number: '02',
    title: '四维生存象限',
    summary: '择良地而居 · 遇明人而交 · 观大势而动 · 知进退而安。',
    surface: {
      background: '#09090b',
      accent: '#ffe600',
      foreground: '#fafafa',
      muted: '#a1a1aa',
    },
    challengeIds: ['global-allocation', 'order-shakeup'],
  },
  {
    id: 'good-ancestor',
    number: '03',
    title: '终极目标：成为好祖先',
    summary: '留下面对不确定性的能力，而非仅留下资产。',
    surface: {
      background: '#f4f4f5',
      accent: '#18181b',
      foreground: '#18181b',
      muted: '#52525b',
    },
    challengeIds: ['succession', 'cognition-gap'],
  },
  {
    id: 'macro-micro',
    number: '04',
    title: '宏观接受 · 微观大有作为',
    summary: '做价值的捕手，不做焦虑的奴隶——在微观层面做能做的事。',
    surface: {
      background: 'linear-gradient(145deg, #fff9c4 0%, #ffe600 72%)',
      accent: '#09090b',
      foreground: '#09090b',
      muted: '#3f3f46',
    },
    challengeIds: ['deflation-shadow', 'cognition-gap'],
  },
]

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

export type FamilyOsDetailItem = {
  title: string
  body: string
}

export type FamilyOsLeaf = {
  id: string
  title: string
  philosophy: string
  challengeIds: LangtontaoChallengeId[]
  detailItems?: FamilyOsDetailItem[]
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
        detailItems: [
          {
            title: '家庭需求 / 风险敞口定位',
            body: '资产结构、行业特性与财富阶段不同，风险敞口完全不同——先问诊资产负债表，再谈增长与配置。',
          },
          {
            title: '专属风控系统搭建',
            body: '梳理已有保障、识别缺口，设计可落地的家庭风控架构——不仅懂保险，更懂高净值家庭的资产结构。',
          },
          {
            title: '年度风控年检',
            body: '避免家庭资产或人员结构变化后保障持续失效；用年检让风控体系跟上财富变化。',
          },
          {
            title: '专属年度陪跑',
            body: '1 对 1 深度沟通、日常咨询对接与家庭风控知识赋能，让全家都懂风控、守住财富底线。',
          },
        ],
      },
      {
        id: 'excellence-gen',
        title: '卓越世代计划',
        philosophy: '国际教育规划、升学指导与游学——代际人力资本投资。',
        challengeIds: ['education-cognition', 'employment-ice-age'],
        anchor: 'beautiful-education',
        embed: 'education',
        detailItems: [
          {
            title: '国际教育规划',
            body: '以代际目标倒推升学与身份路径，把教育金从「一次性支出」升级为可复盘的人力资本投资。',
          },
          {
            title: '升学指导',
            body: '语言、标化与院校策略协同——在就业冰河时代为孩子保留更宽的选择半径。',
          },
          {
            title: '游学与具身认知',
            body: '博睿学者等游学形态，用实地走访拓展国际视野，为未来的全球配置储备认知纵深。',
          },
        ],
      },
      {
        id: 'family-leader',
        title: '家族领袖计划',
        philosophy: '身份规划、信托设立、家族宪章——传承的顶层外壳。',
        challengeIds: ['succession', 'order-shakeup'],
        anchor: 'beautiful-leader',
        embed: 'leader',
        detailItems: [
          {
            title: '身份规划',
            body: '海内外身份与通行安排，为家族跨地域经营与资产配置预留合规通道。',
          },
          {
            title: '《家族宪章》',
            body: '把价值观、决策机制与争议解决写进可执行的家族规则，减少传承中的情绪与权力摩擦。',
          },
          {
            title: '信托设立',
            body: '以信托等顶层外壳承接资产与受益安排，让接班、赠与与风控在同一套逻辑下协同。',
          },
          {
            title: '生命科学',
            body: '备孕、冻卵、生命健康与家庭阶段安排——技术能买来时间，却买不来「我们要不要」；把生命健康纳入传承版图，按家庭阶段定制。',
          },
          {
            title: '数字资产',
            body: '个人叙事、IP 与账号等大类资产确权与积累——把家族故事沉淀为可复利、可跨境传承的数字资产。',
          },
          {
            title: '赛博永生',
            body: '数字化永久留存家族精神、先辈事迹与财富规划脉络——让下一代读得懂你们为何这样活，而非只继承账户与沉默。',
          },
        ],
      },
      {
        id: 'global-assets',
        title: '全球资产配置',
        philosophy: '跨币种、跨周期、跨境法税——在宏观结构中定位家庭坐标。',
        challengeIds: ['global-allocation', 'deflation-shadow'],
        anchor: 'beautiful-allocation',
        embed: 'allocation',
        detailItems: [
          {
            title: '保险',
            body: '跨境港险与家庭压舱石配置——在周期波动中守住底线敞口，对应 TAO 路径「保全」阶段的确定性锚点。',
          },
          {
            title: '跨币种配置',
            body: '多币种资产组合与汇率敞口管理，在宏观结构变迁中分散单一货币与单一市场风险。',
          },
          {
            title: '跨境法税',
            body: '境内外主体协同、合规架构下的配置纪律——企业上市前规划与跨境交付一体考虑。',
          },
          {
            title: '数字资产',
            body: '数字资产确权与加密货币等在整体配置中的位置，在一体双跨网络中协同落地。',
          },
        ],
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
        detailItems: [
          {
            title: '智能英语',
            body: '朗敦道 AI 智能英语——AI 系统 + 真人伴学，阶梯化模块与标准交付，让语言从应试技能升级为可迁移的认知资产。',
          },
          {
            title: '升学与留学路径',
            body: '北美芝仕留学等模块，为家庭提供国际升学与身份规划的长期路线图。',
          },
        ],
      },
      {
        id: 'courage',
        title: '勇气历练计划',
        philosophy: '寒晓航海、博睿学者——具身认知与默会知识传递。',
        challengeIds: ['cognition-gap'],
        anchor: 'beautiful-community',
        embed: 'community',
        detailItems: [
          {
            title: '麦理浩径',
            body: '香港十段徒步挑战——用脚步丈量城市，在共同挑战中沉淀家族对话与财富沙龙。',
          },
          {
            title: '博睿学者',
            body: '全球游学与学者对话，在实地走访中拓展顶层视野，理解世界如何运行。',
          },
          {
            title: '哪吒航海',
            body: '海上远征与团队决断——具身陪跑，让默会知识在共同经历中传递。',
          },
        ],
      },
      {
        id: 'cognition-circle',
        title: '认知兑现圈',
        philosophy: '读书会、财富沙龙、私董会——诚实投资学的长期场域。',
        challengeIds: ['cognition-gap'],
        anchor: 'beautiful-cognition',
        embed: 'cognition',
        detailItems: [
          {
            title: '认知定投读书会',
            body: '线上读书会构成全年认知定投的基础节奏，把诚实投资学变成可坚持的日常。',
          },
          {
            title: '财富投资沙龙',
            body: '闭门财商沙龙与财富夜话，在会员同频场域中讨论配置与周期判断。',
          },
          {
            title: '私董会圈层',
            body: '更深水域的圈层共创与全球权益配置共享，静待同频家族入座。',
          },
        ],
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
