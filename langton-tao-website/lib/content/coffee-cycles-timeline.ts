export type CycleId = 'kitchin' | 'juglar' | 'kuznets' | 'kondratiev' | 'composite'

export type CoffeeCycleWave = {
  id: Exclude<CycleId, 'composite'>
  label: string
  periodLabel: string
  intro: string
  periodYears: number
  color: string
  strokeWidth: number
  amplitude: number
  phase: number
}

export type CoffeeCycleEvent = {
  id: string
  year: number
  title: string
  summary: string
  body: string
  cycles: Exclude<CycleId, 'composite'>[]
  /** Alternate bubble above/below the axis */
  placement: 'above' | 'below'
  /** Manual override for resonance filter */
  forceInclude?: boolean
}

export const coffeeCyclesTimeline = {
  range: { start: 1760, end: 'today' as const },
  chart: {
    title: '如何穿越周期？',
    initialSnapEventId: 'revolutions-1848',
  },
  cycles: [
    {
      id: 'kitchin',
      label: '基钦周期',
      periodLabel: '约 3–5 年',
      intro:
        '由企业库存与供应链补库、去库驱动的短波周期。地缘冲突、关税与政策冲击常在季度尺度上改写预期——看见基钦，是为了在短波扰动里保持纪律，而非押注每一个拐点。',
      periodYears: 4,
      color: '#8b5cf6',
      strokeWidth: 0.75,
      amplitude: 12,
      phase: 0,
    },
    {
      id: 'juglar',
      label: '朱格拉周期',
      periodLabel: '约 7–11 年',
      intro:
        '由设备投资、信贷扩张与景气波段主导的中周期。企业现金流、房产与风险资产在此尺度上重估——诚实投资学强调可重复执行的纪律，而非预测每一个拐点。',
      periodYears: 10,
      color: '#d4d4d8',
      strokeWidth: 0.85,
      amplitude: 22,
      phase: 0.6,
    },
    {
      id: 'kuznets',
      label: '库兹涅茨周期',
      periodLabel: '约 15–25 年',
      intro:
        '由人口变迁、基建投资与城市化节奏驱动的结构周期。移民、地产周期与区域再平衡往往在此尺度上展开——它连接短波波动与长波主题。',
      periodYears: 20,
      color: '#a1a1aa',
      strokeWidth: 1,
      amplitude: 32,
      phase: 1.1,
    },
    {
      id: 'kondratiev',
      label: '康德拉季耶夫周期',
      periodLabel: '约 50–60 年',
      intro:
        '由技术革命、通胀与通缩、资产大类主导逻辑决定时代主题的长波周期。家庭需要回答：我们处于长波的哪个阶段？该守本金、配压舱石，还是布局传承？',
      periodYears: 55,
      color: '#71717a',
      strokeWidth: 1.1,
      amplitude: 42,
      phase: 0.3,
    },
  ] satisfies CoffeeCycleWave[],
  composite: {
    id: 'composite' as const,
    label: '熊比特大事周期',
    color: '#09090b',
    strokeWidth: 3.25,
  },
  centuryMarks: [
    { year: 1800, label: '1800' },
    { year: 1850, label: '1850' },
    { year: 1900, label: '1900' },
    { year: 1950, label: '1950' },
    { year: 2000, label: '2000' },
  ],
  events: [
    {
      id: 'steam',
      year: 1760,
      title: '第一次工业革命',
      summary: '蒸汽机与工厂体系开启现代增长范式。',
      body: '1760 年代前后，蒸汽动力与工厂制度在英国扩散，人类第一次系统性地用化石能源替代肌肉。这不是单一技术突破，而是康德拉季耶夫长波的第一轮上升段：旧农业—手工业均衡被创造性破坏打碎，新的生产率轨道开始形成。\n\n对家庭而言，这意味着「靠土地与手艺吃饭」的旧地图开始失效，劳动、信用与组织方式被重新定义。周期视角提醒我们：时代的切换往往发生在几代人之内，而不是一夜之间。',
      cycles: ['kondratiev'],
      placement: 'above',
    },
    {
      id: 'revolutions-1848',
      year: 1848,
      title: '1848 欧洲革命浪潮',
      summary: '政治秩序与阶级结构在中周期震荡中重构。',
      body: '1848 年，欧洲多国同时爆发革命与改革浪潮。表面是政治事件，底层是工业化带来的社会结构撕裂：新阶级崛起、旧特权松动、城市与乡村的再平衡。\n\n这类节点往往叠在朱格拉与库兹涅茨周期的共振区——中短周期的景气波动，放大了长波转型期的社会摩擦。历史告诉我们：当多个周期同向施压，「平稳优化」往往不够，系统必须换轨。',
      cycles: ['juglar', 'kuznets'],
      placement: 'below',
      forceInclude: true,
    },
    {
      id: 'long-depression',
      year: 1873,
      title: '1873 长萧条',
      summary: '第二轮康波繁荣后的深度调整与通缩。',
      body: '1873 年起的「长萧条」横跨欧美，铁路投机退潮、价格长期低迷、失业与破产蔓延。这是电气时代前夜的一次长波回调——旧动能耗尽，新动能尚未完全接管。\n\n康德拉季耶夫周期的下行段，往往伴随资产重估与信用收缩。家庭若只按繁荣期的经验配置，容易在周期拐点同时失去方向感与选择权。',
      cycles: ['kondratiev', 'juglar'],
      placement: 'above',
    },
    {
      id: 'electrical-era',
      year: 1890,
      title: '电气时代加速',
      summary: '电力、化工与流水线把第二轮长波推入高峰。',
      body: '19 世纪末至 20 世纪初，电力、内燃机、化学工业与大规模生产彼此强化，第二轮康波进入繁荣段。库兹涅茨周期里的基建与城市化，与朱格拉周期的投资景气相互放大。\n\n这是「系统升级」的典型窗口：不是在同一规则里更拼命，而是换一套生产率底座。对家族而言，理解长波主题，比追逐每一个短波拐点更重要。',
      cycles: ['kondratiev', 'kuznets'],
      placement: 'below',
    },
    {
      id: 'ww1',
      year: 1914,
      title: '第一次世界大战',
      summary: '长波萧条与秩序崩解的极端共振。',
      body: '1914 年，欧洲协调机制瓦解，全球进入战争与通胀交织的十年。长波的下行段叠加地缘政治断裂，让「正常商业周期」的模型集体失效。\n\n当康波、朱格拉与政治周期同向恶化，家庭面对的不仅是市场波动，而是规则与边界的重写。周期思维的价值，在于提前看见：有些风险无法靠分散持仓解决，需要结构、流动性与同频。',
      cycles: ['kondratiev', 'juglar'],
      placement: 'above',
    },
    {
      id: 'great-depression',
      year: 1929,
      title: '1929 大萧条',
      summary: '信贷周期、库存周期与长波下行三重叠加。',
      body: '1929 年华尔街崩盘后，全球陷入深度萧条。这是朱格拉信贷—投资周期与康波长波下行共振的教科书案例：资产价格坍塌、银行连锁收缩、失业率长期高企。\n\n基钦级别的库存调整被放大成长达十年的社会创伤。它提醒家庭：短周期可以「熬过去」，但若缺少现金流与结构底线，中周期拐点可能变成代际伤痕。',
      cycles: ['kondratiev', 'juglar', 'kitchin'],
      placement: 'below',
    },
    {
      id: 'postwar-order',
      year: 1945,
      title: '战后秩序重建',
      summary: '布雷顿森林雏形与第三轮长波回升。',
      body: '1945 年后，布雷顿森林体系、马歇尔计划与大众消费社会共同推动第三轮康波回升。库兹涅茨周期的 suburbanization 与婴儿潮，为战后二十年高增长提供人口与基建底座。\n\n这是「制度 + 技术 + 人口」同向的罕见窗口。理解这类回升段，有助于区分：哪些增长来自真实生产率，哪些只是周期性的顺风。',
      cycles: ['kondratiev', 'kuznets'],
      placement: 'above',
    },
    {
      id: 'nixon-shock',
      year: 1971,
      title: '1971 尼克松冲击',
      summary: '黄金本位终结，信用货币时代全面开启。',
      body: '1971 年，美国终止美元与黄金的可兑换性，全球进入纯信用货币体系。通胀、利率波动与资产定价逻辑被永久改写——朱格拉周期的信贷扩张，不再受金属锚约束。\n\n这是离火时代的前奏：金融化加速、全球化深化、家庭资产负债表与宏观杠杆更紧密地绑在一起。周期坐标系里，这是一个「规则换轨」节点，而非普通景气波动。',
      cycles: ['juglar', 'kondratiev'],
      placement: 'below',
    },
    {
      id: 'cold-war-end',
      year: 1989,
      title: '冷战结束与全球化高峰',
      summary: '供应链重组与信息技术长波共振。',
      body: '1989 年柏林墙倒塌，1990 年代全球化与信息技术投资并进。朱格拉周期的设备投资、库兹涅茨周期的基建与城市化，在跨境分工下被重新定价。\n\n对家庭而言，这是「单一市场经验」最顺风的年代——也最容易把时代红利误认为是个人能力的永久溢价。周期视角是一剂诚实：顺风会退，结构才留。',
      cycles: ['juglar', 'kuznets', 'kondratiev'],
      placement: 'above',
    },
    {
      id: 'dotcom',
      year: 2000,
      title: '2000 互联网泡沫',
      summary: '信息长波亢奋段的中周期出清。',
      body: '2000 年纳斯达克崩盘，是信息技术康波繁荣段的一次朱格拉级别出清。创新真实发生，但估值跑在现金流前面——基钦与朱格拉的短波调整，在长波叙事里被赋予过度象征意义。\n\n它示范了「正确方向 + 错误节奏」的风险：站在长波赢家一侧，仍可能在中间周期里付出昂贵学费。诚实投资学强调纪律，而非预言每一个拐点。',
      cycles: ['kitchin', 'juglar', 'kondratiev'],
      placement: 'below',
    },
    {
      id: 'gfc-2008',
      year: 2008,
      title: '2008 全球金融危机',
      summary: '信用超级周期拐点，离火时代起点。',
      body: '2008 年雷曼倒闭触发全球金融危机，杠杆、地产与影子银行同时重定价。在朗敦道叙事里，这也是「离火时代」的起点：旧全球化—金融化组合触及边界，分布式防御、算力与新的安全逻辑开始上位。\n\n康波第四轮的信息技术长波进入成熟—切换期，朱格拉信贷周期剧烈出清。家庭需要回答：我们的敞口，是为过去二十年顺风而设计，还是为接下来二十年的换轨而准备？',
      cycles: ['kondratiev', 'juglar'],
      placement: 'above',
      forceInclude: true,
    },
    {
      id: 'covid-2020',
      year: 2020,
      title: '2020 疫情冲击',
      summary: '基钦级别供给中断与数字化跃迁并置。',
      body: '2020 年新冠疫情冻结全球供应链，各国史无前例地同时财政与货币刺激。这是典型的基钦—朱格拉短波冲击：库存、运输、劳动力同时错位，又在数字基础设施上被加速修复。\n\n短波冲击往往触发长波叙事更新——远程协作、平台经济、健康与地缘风险被重新定价。周期叠加视角下，一次「意外」可能是 deeper 结构变化的催化剂。',
      cycles: ['kitchin', 'juglar'],
      placement: 'below',
    },
    {
      id: 'ai-2024',
      year: 2024,
      title: 'AI 生产力跃迁',
      summary: '新一轮长波切换窗口中的技术奇点邻近。',
      body: '2023—2024 年，大模型与生成式 AI 从实验室进入生产工具链，资本、监管与劳动市场同时重估「智能」的成本。历史类比指向每一次康波切换前夜：旧部门效率见顶，新通用技术尚未完全接管增长叙事。\n\n这是开放节点，而非结论——我们是否在第五轮长波的切换窗口？朱格拉与库兹涅茨相位又如何叠加在 AI 投资热潮之上？图表无法替家庭作答，但可以逼问：你的结构与认知，是为哪一段周期而设计？',
      cycles: ['kondratiev', 'juglar', 'kuznets'],
      placement: 'above',
      forceInclude: true,
    },
  ] satisfies CoffeeCycleEvent[],
  presentMoment: {
    narrative:
      '地缘撕裂、逆全球化、增长放缓与 AI 跃迁——多重周期同屏共振。\n\n' +
      '2020 年代并非「单一拐点」的故事：俄乌冲突、中东局势与大国博弈抬升能源与航运的风险溢价；贸易与科技管制推动供应链从「全球分工」转向「区域化、友岸化」——逆全球化不是退回封闭，而是安全与韧性压过纯效率。后疫情时代，主要经济体在债务高位、通胀记忆与劳动力缺口之间艰难再平衡，消费与投资普遍疲软，传统股债平衡与单一市场经验的回报中枢正在下移。\n\n' +
      '与此同时，生成式 AI 以史无前例的速度进入生产与资本开支周期——它既是康波切换的候选引擎，也在朱格拉尺度上点燃新一轮投资热潮。旧地图同时失效：地缘冲突改写边界，逆全球化改写供应链，低利率时代远去改写资产定价，AI 改写劳动与估值。图表无法替家庭下结论，但可以逼问：你的结构与认知，是为这一段叠加相位而设计的吗？',
  },
} as const
