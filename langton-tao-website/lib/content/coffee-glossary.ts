/** Site-wide glossary: term data and auto-annotation for all public pages. */
export type Coffee2GlossarySection = {
  title?: string
  paragraphs?: readonly string[]
  bullets?: readonly string[]
}

export const COFFEE2_GLOSSARY_EXCLUDED_LABELS = [] as const

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
  taoLaw: {
    id: 'taoLaw',
    label: 'TAO定律',
    shortLabel: 'TAO Law',
    definition:
      'TAO定律是朗敦道把宏观判断落到家庭时间轴的框架——从第一天本金到第一百年慈善与传承，核心落在财富三段式。',
    sections: [
      {
        paragraphs: [
          '「问道」对应穿越周期的 TAO 定律：保全（化债、保险类等）、增长（在正确阶段配置正确工具）、传承（让财富与认知跨代际延续）。',
          '在百年尺度上，家庭完成的不仅是财富积累，更是可同频、可年检、可传递的代际系统。',
        ],
      },
    ],
  },
  taoPath: {
    id: 'taoPath',
    label: 'TAO路径',
    shortLabel: 'TAO Path',
    definition:
      'TAO路径是家庭穿越数十年的阶段路线图——从劳动与教育储备，到守本金、压舱石、出花园、信托传承，直至慈善与好祖先。',
    sections: [
      {
        bullets: [
          '第一天：本金、劳动、教育、化债与同频；',
          '第二天：守本金、国债储蓄与现金流纪律；',
          '第十年：压舱石（保险、房产、身份）；',
          '第三十年至第一百年：信托、养老、黄金锚点与传承。',
        ],
      },
    ],
  },
  cognitiveDca: {
    id: 'cognitiveDca',
    label: '认知定投',
    shortLabel: 'Cognitive DCA',
    definition:
      '朗敦道所说的「定投」，首先是认知定投，其次才是资金定投——把判断从预测风口转向持续修正阶段与敞口。',
    sections: [
      {
        paragraphs: [
          '周期会放大贪婪与恐惧；家庭若没有可重复执行的认知纪律，就会在波段里反复做情绪的奴隶。',
          '认知定投是一场跨越数十年的诚实学习：我处于 TAO 路径的哪一阶段？该守本金、该配压舱石，还是该布局传承？',
        ],
      },
    ],
  },
  tacitKnowledge: {
    id: 'tacitKnowledge',
    label: '默会知识',
    shortLabel: 'Tacit Knowledge',
    definition:
      '默会知识是真正决定传承能否发生的隐性共识——纸面信托与股权协议只能解决「法律上归谁」。',
    sections: [
      {
        paragraphs: [
          '朗敦道将其分为心理所有权、金融所有权，以及二者交集处的家族共同利益。',
          '共读、陪跑、超级英雄之旅与私董会，正是把默会知识从「饭桌上的默契」转化为可传递、可演练的共同体技艺。',
        ],
      },
    ],
  },
  cycleConsensus: {
    id: 'cycleConsensus',
    label: '周期共识',
    shortLabel: 'Cycle Consensus',
    definition:
      '周期共识是家庭对宏观波段与自身阶段位置的共同理解——避免在短波里追涨杀跌，也避免在长波里忽视换轨。',
    sections: [
      {
        paragraphs: [
          '基钦、朱格拉、库兹涅茨与康德拉季耶夫周期叠加共振时，需要可年检的结构与同频机制，而非各自解读新闻。',
        ],
      },
    ],
  },
  kondratiev: {
    id: 'kondratiev',
    label: '康德拉季耶夫',
    shortLabel: 'Kondratiev Wave',
    definition:
      '康德拉季耶夫周期（康波）是约 45–60 年的技术—资本长波——能源、信用与生产率换轨时，财富规则被系统性重写。',
    sections: [
      {
        paragraphs: [
          '理解康波位置，有助于区分真实系统升级与周期性顺风，避免把长波红利误当作个人能力的永久兑现。',
        ],
      },
    ],
  },
  juglar: {
    id: 'juglar',
    label: '朱格拉周期',
    shortLabel: 'Juglar Cycle',
    definition:
      '朱格拉周期约 7–11 年，与设备投资、产能扩张与库存周期相关——是产业景气最常见的中波刻度。',
    sections: [
      {
        paragraphs: [
          '常与库兹涅茨、康波叠加；看见朱格拉，是为了保持配置纪律，而非押注每一个拐点。',
        ],
      },
    ],
  },
  familyOffice: {
    id: 'familyOffice',
    label: '家办',
    shortLabel: 'Family Office',
    definition:
      '家办不是「资产到了某个数字」之后的奢侈品，而是统摄家庭关系、人脉、重大选择与财富目标的顶层架构。',
    sections: [
      {
        paragraphs: [
          '新型家办是 AI、专家、具身与商业模式创新的组合拳——从静态仓库变成可触达、可参与、可升级的操作系统。',
          '价值在于让家庭提前拥有「操作系统」，而不是在拐点叠加时被动救火。',
        ],
      },
    ],
  },
  communityCraft: {
    id: 'communityCraft',
    label: '共同体技艺',
    shortLabel: 'Community Craft',
    definition:
      '共同体技艺是把默会知识转化为可演练、可传递的家族与社群能力——而非只停留在饭桌默契或口头期待。',
    sections: [
      {
        paragraphs: [
          '共读、陪跑、私董会、六人茶局与超级英雄之旅，都是把「我们共同保护什么」练成可执行的技艺。',
        ],
      },
    ],
  },
  superIndividual: {
    id: 'superIndividual',
    label: '超级个体',
    shortLabel: 'Super Individual',
    definition:
      '超级个体是第一天在平均斯坦肉身撞墙、以试错期权撬开极端斯坦大门后，锻造出的不可替代能力组合。',
    sections: [
      {
        paragraphs: [
          '人生第一天拥有最高的期权价值——趁还能犯错、还能推倒重来，成为不可替代的超级个体，是第二天超级英雄之旅的前置燃料。',
        ],
      },
    ],
  },
  superhero: {
    id: 'superhero',
    label: '超级英雄',
    shortLabel: 'Superhero',
    definition:
      '超级英雄是第二天觉醒的状态——以认知为铠甲、以周期为罗盘，执掌家族命运的决策者，而非只看数字的旁观者。',
    sections: [
      {
        paragraphs: [
          '真正的超级英雄从来不是无所不能，而是无比清醒地知道自己的边界——能力圈的大小不重要，知道边界在哪里才最重要。',
        ],
      },
    ],
  },
  superheroJourney: {
    id: 'superheroJourney',
    label: '超级英雄之旅',
    shortLabel: 'Superhero Journey',
    definition:
      '超级英雄之旅是朗敦道把传承默会知识工具化的具身路径——把「成为好祖先」练成可参与、可演练的旅程。',
    sections: [
      {
        paragraphs: [
          '在学习类、工具类 OPC 与具身活动层，超级英雄之旅承担把心理所有权与金融所有权对齐的入口角色。',
        ],
      },
    ],
  },
  wenDao: {
    id: 'wenDao',
    label: '问道',
    shortLabel: 'Wen Dao',
    definition:
      '「问道」是朗敦道家族传承三道主线之一——回答「往哪走」，对应穿越周期的 TAO 定律与财富三段式。',
    sections: [
      {
        paragraphs: [
          '问道、关系与具身三者缺一则决策必然短视；问道把宏观判断落到家庭可执行的时间轴与阶段选择。',
        ],
      },
    ],
  },
  familyOs: {
    id: 'familyOs',
    label: 'Family OS',
    shortLabel: 'Family Operating System',
    definition:
      'Family OS 是新型家办的工具类 OPC 中枢——承担宏观经济、顶层架构与风险诊断的数字化操作系统。',
    sections: [
      {
        paragraphs: [
          '与龙虾助手、数字化业务流、CRM 与分佣体系协同，让家办从静态仓库变成可触达、可参与、可升级的系统。',
        ],
      },
    ],
  },
  opc: {
    id: 'opc',
    label: 'OPC',
    shortLabel: 'One Person Company',
    definition:
      'OPC（一人公司）在朗敦道架构中指可独立交付专业判断的专家与 AI 分身单元——学习类与工具类 OPC 构成新型家办的能力层。',
    sections: [
      {
        paragraphs: [
          '顶级赛博顾问（AI 专家分身）与实战操盘专家组，分别提供效率与具身判断，嵌套于教育 × 财富双螺旋。',
        ],
      },
    ],
  },
  lobsterAssistant: {
    id: 'lobsterAssistant',
    label: '龙虾助手',
    shortLabel: 'Lobster Assistant',
    definition:
      '龙虾助手是 Family OS 的 7×24 数字化入口——把宏观经济、架构咨询与风险诊断延伸到随时可触达的服务界面。',
    sections: [
      {
        paragraphs: [
          '作为工具类 OPC 的一部分，与数字化业务流、CRM 与会员生态协同，降低家庭孤独决策的成本。',
        ],
      },
    ],
  },
  jointMfo: {
    id: 'jointMfo',
    label: '联合 MFO',
    shortLabel: 'Joint MFO',
    definition:
      '联合 MFO 是朗敦道会员生态中的多家族办公室协同工具——同时作用于财富表、关系脉与选择根。',
    sections: [
      {
        paragraphs: [
          '解决的不是「再多一个产品」，而是让家庭在不确定时代拥有可执行的传承系统与专业网络支撑。',
        ],
      },
    ],
  },
  sixTea: {
    id: 'sixTea',
    label: '六人茶局',
    shortLabel: 'Six-Person Tea Circle',
    definition:
      '六人茶局是朗敦道具身活动层的微型同频场域——小人数、深对话，把判断练成可重复的家庭与社群技艺。',
    sections: [
      {
        paragraphs: [
          '与线下读书会、投资沙龙、私董会、DOK 新型社交一起，补足「活人感」与关系同频。',
        ],
      },
    ],
  },
  privateBoard: {
    id: 'privateBoard',
    label: '私董会',
    shortLabel: 'Private Board',
    definition:
      '私董会是朗敦道具身路径中的高信任决策场——在真实对话里拆解复杂议题，把默会知识转化为可演练的治理技艺。',
    sections: [
      {
        paragraphs: [
          '与超级英雄之旅、共读与陪跑协同，帮助家族在重大节点作出不后悔的决策。',
        ],
      },
    ],
  },
  dok: {
    id: 'dok',
    label: 'DOK',
    shortLabel: 'DOK Social',
    definition:
      'DOK 是朗敦道的新型社交形态——在具身活动层提供关系同频与「活人感」，补足纯线上与纯产品的空白。',
    sections: [
      {
        paragraphs: [
          '与六人茶局、私董会、读书会一起，构成新型家办具身活动层的社交基础设施。',
        ],
      },
    ],
  },
  dayOne: {
    id: 'dayOne',
    label: '第一天',
    shortLabel: 'Day One',
    definition:
      '第一天是 TAO 路径的起点——劳动、教育、化债、会员与同频，在平均斯坦装载跃迁所需的燃料。',
    sections: [
      {
        paragraphs: [
          '趁还拥有最高期权价值，成为不可替代的超级个体，是第二天觉醒超级英雄的前置条件。',
        ],
      },
    ],
  },
  dayTwo: {
    id: 'dayTwo',
    label: '第二天',
    shortLabel: 'Day Two',
    definition:
      '第二天是财富积累的分水岭——守本金、资产配置、教育认知、二代传承与人性信仰等重大人生议题集中涌现。',
    sections: [
      {
        paragraphs: [
          '第二天的人以认知为铠甲、以周期为罗盘，正式觉醒为执掌家族命运的超级英雄。',
        ],
      },
    ],
  },
  riskExposure: {
    id: 'riskExposure',
    label: '十类风险敞口',
    shortLabel: 'Ten Risk Exposures',
    definition:
      '十类风险敞口是朗敦道对家庭风险地图的系统分类——避免只盯收益而忽视结构性漏损入口。',
    sections: [
      {
        paragraphs: [
          '与十一类大类资产及一体双跨网络共同构成朗敦道关注的核心问题域，支撑敞口年检与架构迭代。',
        ],
      },
    ],
  },
  assetClasses: {
    id: 'assetClasses',
    label: '十一类大类资产',
    shortLabel: 'Eleven Asset Classes',
    definition:
      '十一类大类资产是朗敦道四象限框架下的资产全景——帮助家庭在模糊情境中一览属性与配置逻辑，而非单点产品堆砌。',
    sections: [
      {
        paragraphs: [
          '与十类风险敞口、TAO 路径阶段选择协同，支撑诚实投资学与周期共识下的配置纪律。',
        ],
      },
    ],
  },
  wealthMacro471: {
    id: 'wealthMacro471',
    label: '471万亿',
    shortLabel: '¥471T · China Domestic',
    definition:
      '约 471 万亿是中国国内的宏观财富结构总量——房地产、金融资产、政府债务、黄金与加密各占不同权重。',
    sections: [
      {
        bullets: [
          '房地产约 170 万亿（超 36%）——肉身所居与周期风险锚点；',
          '金融资产/股市约 115 万亿（24%）——流动性与博弈主战场；',
          '政府债务约 90 万亿——主权信用与杠杆底座；',
          '黄金与加密各约 3 万亿——跨周期防线与离火时代新工具。',
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
  { label: 'TAO 定律', id: 'taoLaw' },
  { label: 'TAO 路径', id: 'taoPath' },
  { label: '人生认知定投', id: 'cognitiveDca' },
  { label: '康波周期', id: 'kondratiev' },
  { label: '康波', id: 'kondratiev' },
  { label: '朱格拉', id: 'juglar' },
  { label: '家族办公室', id: 'familyOffice' },
  { label: '新型家办', id: 'familyOffice' },
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
