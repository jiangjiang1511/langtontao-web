/** Site-wide glossary: term data and auto-annotation for all public pages. */
export type Coffee2GlossarySection = {
  title?: string
  paragraphs?: readonly string[]
  bullets?: readonly string[]
}

export const COFFEE2_GLOSSARY_EXCLUDED_LABELS = [
  'TAO路径',
  'TAO 路径',
  'TAO定律',
  'TAO 定律',
  '人生认知定投',
  '认知定投',
  '默会知识',
  '周期共识',
  '康德拉季耶夫',
  '康波周期',
  '康波',
  '朱格拉周期',
  '朱格拉',
  '家族办公室',
  '新型家办',
  '家办',
  '共同体技艺',
] as const

export const coffee2GlossaryTerms = {
  bearbit: {
    id: 'bearbit',
    label: '熊比特',
    shortLabel: 'BearBit · Schumpeter Coffee',
    definition:
      '「熊比特」取自经济学家约瑟夫·熊彼特（Joseph Schumpeter），致敬他提出的「创造性破坏」。',
    sections: [
      {
        paragraphs: [
          '创造性破坏认为：真正的增长，来自打破旧结构、主动重建，而非在静止均衡里反复优化。',
          '名字里藏着一种态度——在变化里寻找下一步，而不是守住上一版答案。',
        ],
      },
      {
        title: '为什么是一杯咖啡',
        paragraphs: [
          '熊比特把这一脉络落在对话场景里：一张小桌、一杯热饮，让人愿意慢下来，交换还未成形的判断。',
          '我们不急着给标准答案，更想提供一个可以诚实交谈的空间。',
        ],
      },
    ],
  },
  mediocristan: {
    id: 'mediocristan',
    label: '平均斯坦',
    shortLabel: 'Mediocristan',
    definition: '在平均斯坦里，规则是积累、装载燃料、稳定提升。',
    sections: [
      {
        paragraphs: [
          '它的核心任务，是装载燃料。',
          '现金流、信用、健康、专业能力、家庭纪律、基本储蓄，这些都是燃料。',
          '没有这些燃料，一个人没有资格谈跃迁。',
        ],
      },
      {
        title: '在平均斯坦时',
        paragraphs: [
          '做的是现金流、风险隔离、跨币种配置、家庭规则、下一代教育、专业网络。',
          '这些看起来慢，甚至不刺激。但它们是在装燃料。',
        ],
      },
    ],
  },
  extremistan: {
    id: 'extremistan',
    label: '极端斯坦',
    shortLabel: 'Extremistan',
    definition: '在极端斯坦里，规则是不对称点火、赢家通吃、窗口期跃迁。',
    sections: [
      {
        title: '典型场景',
        bullets: [
          '一个关键行业窗口，可能让一家企业突然变大；',
          '一次资产价格重估，可能改变一个家庭的阶层位置；',
          '一次错误担保，可能毁掉多年积累；',
          '一次接班失败，可能让家族企业迅速衰落；',
          '一次制度或身份安排，可能决定未来二十年的选择空间。',
        ],
      },
      {
        title: '在极端斯坦时',
        paragraphs: [
          '等到市场出现错配、行业出现窗口、身份和制度安排出现必要性、家族传承进入关键阶段时，前面这些燃料就决定了你能不能点火。',
        ],
      },
    ],
  },
  honestInvesting: {
    id: 'honestInvesting',
    label: '诚实投资学',
    shortLabel: 'Honest Investing',
    definition:
      '诚实投资学教的是框架与风控，不是话术——承认没有万能方案，承认家庭阶段不同则敞口完全不同。',
    sections: [
      {
        paragraphs: [
          '不诚实的投资，本质上是用话术掩盖旧经验与新现实之间的裂缝：许诺高收益、零波动、随时可取、免税传承的单一产品。',
          '诚实，是承认本站与社群以教育、认知与架构咨询为主——具体产品由持牌合作方在合规框架下交付。',
        ],
      },
    ],
  },
  chaos: {
    id: 'chaos',
    label: '混沌',
    shortLabel: 'Chaos',
    definition:
      '混沌是旧经验在新结构面前集体失效时，家庭同时失去方向感与选择权的感受——并非来自神秘外力。',
    sections: [
      {
        paragraphs: [
          '财富可能经购买力、资产缩水、债务三条通道「凭空消失」——比「有没有钱」更关键的是「钱有没有结构」。',
          '守住家庭在未来的选择权，用长期同频与可年检的结构，替代对旧地图的执念。',
        ],
      },
    ],
  },
  greatDeflation: {
    id: 'greatDeflation',
    label: '大通缩时代',
    shortLabel: 'Great Deflation',
    definition:
      '大通缩时代里，资产价格、收入预期、债务压力与消费信心相互牵动，曾经「安全」的资产都可能被重新定价。',
    sections: [
      {
        paragraphs: [
          '宏观资金填息差而非进入真实消费，企业现金流与未来家庭责任同时承压。',
          '家庭需要主动防御：结构、流动性与同频，而非单靠乐观。',
        ],
      },
    ],
  },
  wealthThreeStages: {
    id: 'wealthThreeStages',
    label: '财富三段式',
    shortLabel: 'Wealth Three Stages',
    definition: '朗敦道「问道」主线上的财富三段式：保全、增长、传承。',
    sections: [
      {
        bullets: [
          '保全：化债、保险类等，先卸下包袱、筑好底线；',
          '增长：在正确阶段配置正确工具；',
          '传承：让财富与认知跨代际延续。',
        ],
      },
    ],
  },
  goodAncestor: {
    id: 'goodAncestor',
    label: '好祖先',
    shortLabel: 'Good Ancestor',
    definition:
      '好祖先不是道德口号——一生终极的目标，是让子孙继承认知、智慧与审慎思维，而不只是账户数字。',
    sections: [
      {
        paragraphs: [
          '理财从来不只是数学问题，更是在预算范围内的情感问题——金钱链向安全、尊严、关系、责任、选择与爱。',
          '从劳动与守本金，到黄金锚点与慈善传承——家庭完成的不仅是积累，更是可传递的代际系统。',
        ],
      },
    ],
  },
  yitishuangkua: {
    id: 'yitishuangkua',
    label: '一体双跨',
    shortLabel: 'Integrated Dual-Cross',
    definition:
      '一体：同一套家族传承目标与教育 × 财富双螺旋。双跨：跨地域（内地中枢 + 香港交付）与跨领域（教育 × 财富）。',
    sections: [
      {
        paragraphs: [
          '香港节点承担契约、资本市场与专业网络的交付角色，与内地顶层规划同频。',
          '熊比特咖啡是这一架构里的交谈场景：复杂议题在对话里诚实拆解。',
        ],
      },
    ],
  },
  decameron: {
    id: 'decameron',
    label: '十日谈',
    shortLabel: 'Decameron Coffee',
    definition:
      '「十日谈咖啡联名储值卡」是熊比特精神的实体凭证——十次坐下来、十次交换、十次把复杂议题汇聚于具体对话。',
    sections: [
      {
        paragraphs: [
          '家族传承里最稀缺的，往往不是更多一份说明书，而是更多一段愿意开口、愿意倾听的时间。',
        ],
      },
    ],
  },
  eduWealthSpiral: {
    id: 'eduWealthSpiral',
    label: '教育×财富双螺旋',
    shortLabel: 'Education × Wealth',
    definition:
      '教育 × 财富双螺旋：智库与专家提供判断，具身活动提供记忆与同频，会员与社群提供持续场域。',
    sections: [
      {
        paragraphs: [
          '朗敦道以双螺旋同时作用于财富表、关系脉与选择根——解决的不是「再多一个产品」，而是孤独决策与系统缺席。',
        ],
      },
    ],
  },
  richThreeGenerations: {
    id: 'richThreeGenerations',
    label: '富不过三代',
    shortLabel: 'Three Generations',
    definition:
      '富不过三代不是命运诅咒，而是系统缺席——缺乏治理、敞口年检与同频机制时，财富会在周期与关系中系统性漏损。',
    sections: [
      {
        paragraphs: [
          '事业接班与财富传承若混淆：企业交给能干的二代，不等于信托、保险与沟通节奏已同频。',
          '观念、价值观、信息三同频，是打破死局的软基础设施。',
        ],
      },
    ],
  },
  psychologicalOwnership: {
    id: 'psychologicalOwnership',
    label: '心理所有权',
    shortLabel: 'Psychological Ownership',
    definition:
      '心理所有权指向「团结而强大的持股家族」——成员是否真正认同自己是家族一员，愿意承担责任与维护声誉。',
    sections: [
      {
        paragraphs: [
          '若仅有法律权利而无心理认同，下一代极易成为「提款人」：享有权益却不承担守护。',
        ],
      },
    ],
  },
  financialOwnership: {
    id: 'financialOwnership',
    label: '金融所有权',
    shortLabel: 'Financial Ownership',
    definition:
      '金融所有权指向「悉心经营的财富家族」——资产、股权、收益权、控制权与分配机制如何对称设计。',
    sections: [
      {
        paragraphs: [
          '把权利与义务写入治理，而非只谈「留多少钱」——谁可以享受、谁必须负责，需要被明确讨论。',
        ],
      },
    ],
  },
  withdrawer: {
    id: 'withdrawer',
    label: '提款人',
    shortLabel: 'Withdrawer',
    definition:
      '提款人指享有家族权益却不愿承担守护责任的一代——心理所有权缺失的典型风险。',
    sections: [
      {
        paragraphs: [
          '传承不仅是「法律上归谁」，更是成员是否理解创财不易、愿意维护集体利益。',
        ],
      },
    ],
  },
  qualifiedFamilyCitizen: {
    id: 'qualifiedFamilyCitizen',
    label: '合格家族公民',
    shortLabel: 'Qualified Family Citizen',
    definition:
      '合格家族公民是能接班、能守护、能同频的一代——而非只继承消费权的「提款人」。',
    sections: [
      {
        paragraphs: [
          '家族是在培养能承担治理与沟通的人，还是只留账户？这是第二天人生大事里二代传承的核心追问。',
        ],
      },
    ],
  },
  embodiedCognition: {
    id: 'embodiedCognition',
    label: '具身认知',
    shortLabel: 'Embodied Cognition · AI Era',
    definition:
      '具身认知是 AI 时代的核心概念：当智能体与物理 AI 能处理海量屏幕信息，人真正的优势在于身体在场、真实场域与行动验证——认知必须进入经验，而非停留在二手信息里。',
    sections: [
      {
        title: '为什么是 AI 时代的关键词',
        paragraphs: [
          '大模型可以替你读、替你算、替你生成答案，但无法替你走过麦理浩径、在风浪里协作、在沙龙里把判断说到底。具身认知强调：把肉身变成传感器，在真实世界里修正先验。',
          '朗敦道的具身路径——徒步、航海、游学、私董会——不是「团建」，而是在物理 AI 时代为人保留不可被算法替代的判断力与共同体技艺。',
        ],
      },
      {
        paragraphs: [
          '问道、关系与具身三道主线缺一则决策短视；具身活动把判断练成可重复的家庭与社群技艺。',
        ],
      },
    ],
  },
  malthusianTrap: {
    id: 'malthusianTrap',
    label: '马尔萨斯陷阱',
    shortLabel: 'Malthusian Trap',
    definition:
      '马尔萨斯陷阱描述旧系统下增长极易被吞噬——人口与资源失衡时，勤劳难以摆脱结构性贫困。',
    sections: [
      {
        paragraphs: [
          '在工业革命之前，极度贫穷才是常态；打破死局依赖系统升级，而非在同一规则里更拼命。',
        ],
      },
    ],
  },
  bayesianAcceleration: {
    id: 'bayesianAcceleration',
    label: '贝叶斯式加速',
    shortLabel: 'Bayesian Acceleration',
    definition:
      '财富演进基于不断获取新信息、修正先验、推动技术与契约系统升级——非线性而非重复旧动作。',
    sections: [
      {
        paragraphs: [
          '家庭在模糊情境中持续修正：旧系统扛不住新摩擦，就必须升级。',
        ],
      },
    ],
  },
  systemUpgrade: {
    id: 'systemUpgrade',
    label: '系统升级',
    shortLabel: 'System Upgrade',
    definition:
      '命运改变往往来自系统换轨——能源、信用、组织、技术、金融的连锁跃迁。',
    sections: [
      {
        paragraphs: [
          '从蒸汽、电气、信息到离火时代，每一轮升级重新定义生产率与财富规则。',
          '识别时代位置，比追逐每一个短波拐点更重要。',
        ],
      },
    ],
  },
  lihuoEra: {
    id: 'lihuoEra',
    label: '离火时代',
    shortLabel: 'Li-Fire Era',
    definition:
      '离火时代（约 2008 起）：算力即权力，财富向分布式系统防御转移，旧全球化—金融化组合触及边界。',
    sections: [
      {
        paragraphs: [
          '家庭需要同时理解流动性、算法与链上资产的新规则。',
          '加密与算力工具是这一阶段的分布式防御选项之一。',
        ],
      },
    ],
  },
  ballast: {
    id: 'ballast',
    label: '压舱石',
    shortLabel: 'Ballast Assets',
    definition:
      '压舱石是穿越周期时的确定性锚点——保险、房产、身份等，在第十年阶段强调配置。',
    sections: [
      {
        paragraphs: [
          '但若流动性与变现成本未纳入规划，「安全资产」可能在最需要时最难动用。',
          '流动性、收益性与安全性需要三角平衡。',
        ],
      },
    ],
  },
  fourQuadrants: {
    id: 'fourQuadrants',
    label: '四象限',
    shortLabel: 'Four Quadrants',
    definition:
      '四象限是家庭在模糊情境中寻找最优解的框架——资产按属性与常见度分布，一览处置类型。',
    sections: [
      {
        paragraphs: [
          '朗敦道将大类资产与风险敞口纳入同一地图，避免单点产品堆砌。',
        ],
      },
    ],
  },
  kitchin: {
    id: 'kitchin',
    label: '基钦周期',
    shortLabel: 'Kitchin Cycle',
    definition:
      '基钦周期约 3–5 年，由库存与供应链补库、去库驱动——看见短波，是为了保持纪律而非押注每一拐点。',
    sections: [
      {
        paragraphs: [
          '地缘冲突、关税与政策冲击常在季度尺度上改写预期。',
        ],
      },
    ],
  },
  kuznets: {
    id: 'kuznets',
    label: '库兹涅茨周期',
    shortLabel: 'Kuznets Cycle',
    definition:
      '库兹涅茨周期约 15–25 年，与基建、城市化与人口结构相关——常与朱格拉、康波叠加共振。',
    sections: [
      {
        paragraphs: [
          '理解人口与基建底座，有助于区分真实生产率增长与周期性顺风。',
        ],
      },
    ],
  },
  familyTrust: {
    id: 'familyTrust',
    label: '家族信托',
    shortLabel: 'Family Trust',
    definition:
      '家族信托把继任与分产分开——让商业运转与受益安排可执行、可迭代，而非只靠口头默契。',
    sections: [
      {
        paragraphs: [
          '纸面安排之外，心理所有权与金融所有权是否同频，决定信托能否被尊重地执行。',
        ],
      },
    ],
  },
  trustBeneficiary: {
    id: 'trustBeneficiary',
    label: '信托受益人',
    shortLabel: 'Trust Beneficiary',
    definition:
      '受益人名单是家族权力与信息同频的晴雨表——不是写一次就完，而是治理的一部分。',
    sections: [
      {
        paragraphs: [
          '人身险受益人与信托受益人若各写各的，理赔金可能绕开你精心设计的架构。',
        ],
      },
    ],
  },
  crs: {
    id: 'crs',
    label: 'CRS',
    shortLabel: 'Common Reporting Standard',
    definition:
      'CRS（共同申报准则）是跨境税务信息自动交换框架——影响境外账户披露与传承架构设计。',
    sections: [
      {
        paragraphs: [
          '传承周期的关键子题：税务身份、披露义务与生态伙伴协同交付。',
        ],
      },
    ],
  },
  identityPlanning: {
    id: 'identityPlanning',
    label: '身份规划',
    shortLabel: 'Identity Planning',
    definition:
      '身份规划决定你站在哪套规则之下——与税务身份、置业、留学及跨境结构紧密相连。',
    sections: [
      {
        paragraphs: [
          'TAO 路径第十年强调保险、房产、身份等压舱石配置。',
        ],
      },
    ],
  },
  offshoreStructure: {
    id: 'offshoreStructure',
    label: '离岸结构',
    shortLabel: 'Offshore Structure',
    definition:
      '离岸结构连接跨境法税、信托与控股安排——是接入国际信用网络的架构接口，而非单纯「多开一个账户」。',
    sections: [
      {
        paragraphs: [
          '保单、离岸公司与信托需由律师与会计师协同调度，才能形成可执行的传承系统。',
        ],
      },
    ],
  },
  reinsurance: {
    id: 'reinsurance',
    label: '再保险',
    shortLabel: 'Reinsurance',
    definition:
      '再保险是保司背后的保司——用终极概率模型核算死亡率、违约率与巨灾风险，支撑零售保单的可兑付性。',
    sections: [
      {
        paragraphs: [
          '慕再等机构代表财富管理的最高常识：长期契约的可验证性与数据底座。',
        ],
      },
    ],
  },
} as const

export type Coffee2GlossaryTermId = keyof typeof coffee2GlossaryTerms

export type Coffee2GlossaryTerm = (typeof coffee2GlossaryTerms)[Coffee2GlossaryTermId]

export type Coffee2GlossarySegment =
  | { type: 'text'; value: string }
  | { type: 'term'; id: Coffee2GlossaryTermId }

export type Coffee2SectionCopyBlock =
  | string
  | { type: 'annotated'; segments: readonly Coffee2GlossarySegment[] }

const COFFEE2_GLOSSARY_ALIASES: ReadonlyArray<{
  label: string
  id: Coffee2GlossaryTermId
}> = [
  { label: '熊比特咖啡', id: 'bearbit' },
  { label: '税务 CRS', id: 'crs' },
  { label: '四象', id: 'fourQuadrants' },
  { label: '贝叶斯式修正', id: 'bayesianAcceleration' },
  { label: '受益人', id: 'trustBeneficiary' },
  { label: '信托', id: 'familyTrust' },
  { label: '大通缩', id: 'greatDeflation' },
  { label: '离岸控股', id: 'offshoreStructure' },
]

type GlossaryMatcher = {
  label: string
  id?: Coffee2GlossaryTermId
  excluded?: boolean
}

function buildGlossaryMatchers(): GlossaryMatcher[] {
  const termMatchers: GlossaryMatcher[] = Object.values(coffee2GlossaryTerms).map(
    (term) => ({
      label: term.label,
      id: term.id,
    })
  )

  const aliasMatchers: GlossaryMatcher[] = COFFEE2_GLOSSARY_ALIASES.map(
    ({ label, id }) => ({ label, id })
  )

  const excludedMatchers: GlossaryMatcher[] = COFFEE2_GLOSSARY_EXCLUDED_LABELS.map(
    (label) => ({ label, excluded: true })
  )

  return [...termMatchers, ...aliasMatchers, ...excludedMatchers].sort(
    (a, b) => b.label.length - a.label.length
  )
}

const GLOSSARY_MATCHERS = buildGlossaryMatchers()

function findMatcherAt(text: string, index: number): GlossaryMatcher | null {
  for (const matcher of GLOSSARY_MATCHERS) {
    if (text.startsWith(matcher.label, index)) {
      return matcher
    }
  }
  return null
}

export function annotateCoffeeGlossaryText(text: string): Coffee2GlossarySegment[] {
  const segments: Coffee2GlossarySegment[] = []
  let index = 0
  let textBuffer = ''

  const flushText = () => {
    if (textBuffer) {
      segments.push({ type: 'text', value: textBuffer })
      textBuffer = ''
    }
  }

  while (index < text.length) {
    const matcher = findMatcherAt(text, index)

    if (matcher?.id) {
      flushText()
      segments.push({ type: 'term', id: matcher.id })
      index += matcher.label.length
      continue
    }

    if (matcher?.excluded) {
      textBuffer += matcher.label
      index += matcher.label.length
      continue
    }

    textBuffer += text[index]
    index += 1
  }

  flushText()
  return segments
}

export function toAnnotatedCopyBlock(text: string): Coffee2SectionCopyBlock {
  const segments = annotateCoffeeGlossaryText(text)
  const hasTerm = segments.some((segment) => segment.type === 'term')

  if (!hasTerm) {
    return text
  }

  return { type: 'annotated', segments }
}

export function getCoffee2GlossaryTerm(id: Coffee2GlossaryTermId) {
  return coffee2GlossaryTerms[id]
}

export function isAnnotatedSectionCopyBlock(
  block: Coffee2SectionCopyBlock
): block is Extract<Coffee2SectionCopyBlock, { type: 'annotated' }> {
  return typeof block === 'object' && block.type === 'annotated'
}
