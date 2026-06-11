export const coffee2TenTopicsVerse = [
  '一切二让看三观，',
  '四象五法六维度。',
  '七个习惯高效能，',
  '八方来财朗敦道。',
  '九交朋友十幸福。',
] as const

export const coffee2TenTopics = [
  { number: '01', title: '一切', verseLine: '一切二让看三观' },
  { number: '02', title: '二让', verseLine: '一切二让看三观' },
  { number: '03', title: '三观', verseLine: '一切二让看三观' },
  {
    number: '04',
    title: '四象',
    verseLine: '四象五法六维度',
    summary: '以四象框架看清家庭所处的宏观位置与阶段。',
  },
  {
    number: '05',
    title: '五法',
    verseLine: '四象五法六维度',
    summary: '五法是可重复执行的判断与行动方法，而非一次性咨询。',
  },
  {
    number: '06',
    title: '六维度',
    verseLine: '四象五法六维度',
    summary: '从关系、敞口、现金流、配置、合规与传承六维统摄家庭决策。',
  },
  {
    number: '07',
    title: '七个习惯 · 高效能',
    verseLine: '七个习惯高效能',
    summary: '把认知定投变成日常习惯，让家庭在周期中保持高效能同频。',
  },
  {
    number: '08',
    title: '八方来财 · 朗敦道',
    verseLine: '八方来财朗敦道',
    summary: '一体双跨网络与诚实投资学，让机会从多方汇聚而非单点依赖。',
  },
  {
    number: '09',
    title: '九交朋友',
    verseLine: '九交朋友十幸福',
    summary: 'Coffee Chat 与社群同频——交换观点，而非单向灌输产品。',
  },
  {
    number: '10',
    title: '十幸福',
    verseLine: '九交朋友十幸福',
    summary: '传承的终点是家族幸福与选择权，而非资产负债表上的数字本身。',
  },
] as const

export const coffee2LifeEvents = [
  {
    title: '活着',
    summary: '现金流、健康与基本盘——让家庭在不确定时代保有运转的安全垫。',
  },
  {
    title: '养老',
    summary: '长寿风险与购买力——提前布局，避免「钱还在、日子难」的错位。',
  },
  {
    title: '教育',
    summary: '代际承诺与全球视野——读书、英语与升学路径的系统选择。',
  },
  {
    title: '婚姻',
    summary: '关系结构改变资产负债表——婚育、再婚与家庭形态的敞口管理。',
  },
  {
    title: '传承',
    summary: '治理、信托与受益人——让财富在代际间可执行、可同频地传递。',
  },
] as const

export const coffee2Manifesto = {
  eyebrow: 'Bearbit · 十日谈',
  title: '熊比特：聊聊人生大事',
  subtitle: '联动十日谈，用十天参透十个人生话题',
  paragraphs: [
    '「十日谈咖啡联名储值卡」是熊比特精神的实体凭证——十次坐下来、十次交换、十次把复杂议题汇聚于具体对话的机会。它提醒你：家族传承里最稀缺的，往往不是更多一份说明书，而是更多一段愿意开口、愿意倾听的时间。',
    '熊比特咖啡不是产品货架，而是交谈场景：投资、保全、化债、传承，可在像喝咖啡一样自然的节奏里被诚实拆解。先建立共识，再谈配置与交付。',
  ],
  cta: { label: '了解会员', href: '/member' },
} as const

export const coffee2Cycles = {
  eyebrow: 'Cycles · 周期',
  title: '看见周期，再谈选择',
  lead: '家庭财富不是在静止均衡里优化，而是在康波与朱格拉的叠加中被重新定价。先建立周期共识，四话题才有共同的坐标系。',
  items: [
    {
      id: 'kondratiev',
      title: '康波周期',
      duration: '约 50–60 年',
      summary:
        '长周期决定时代主题——技术革命、通胀与通缩、资产大类的主导逻辑。家庭需要回答：我们处于长波的哪个阶段？该守本金、配压舱石，还是布局传承？',
      topics: ['投资', '传承'],
    },
    {
      id: 'juglar',
      title: '朱格拉周期',
      duration: '约 7–11 年',
      summary:
        '中周期带来库存、信贷与景气波动——企业现金流、房产与风险资产的波段重估。诚实投资学强调：不预测每一个拐点，但要有可重复执行的纪律。',
      topics: ['投资', '保全', '化债'],
    },
  ],
} as const
