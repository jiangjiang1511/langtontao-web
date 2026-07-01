export type HorizonDemo =
  | 'value-investing'
  | 'compound-us'
  | 'compound-bond'
  | 'compound-etf'
  | 'ballast'
  | 'identity'
  | 'garden-ritual'
  | 'education'
  | 'legacy-bento'
  | 'family-bento'
  | 'charity-halo'

export type HorizonCard = {
  title: string
  body: string
  href?: string
  /** Show「了解更多」CTA without navigation when href is omitted */
  cta?: boolean
  /** Full-width lead card in education-style stacked layouts */
  featured?: boolean
  accent?: string
}

export type HorizonRitualStep = {
  id: string
  label: string
  detail: string
}

export type HorizonTopic = {
  id: string
  label: string
  hook: string
  summary: string
  body?: string
  cards?: HorizonCard[]
  ritualSteps?: HorizonRitualStep[]
  demo?: HorizonDemo
}

export type HorizonStageContent = {
  stageId: string
  intro?: readonly string[]
  /** Stage-level cycle illustration shown below the header (not tied to a topic tab) */
  cycleIllustration?: boolean
  topics: HorizonTopic[]
  closing?: readonly string[]
  epilogue?: readonly string[]
}

export const centuryPathIntro = [
  '当你觉醒超级英雄、读懂四层经济周期、厘清资产与债务的底层逻辑后，终极灵魂拷问落在眼前——你看得有多远？',
  '让我们以时间为尺度，穿越百年周期。',
] as const

export const centuryPathBridgeMeta = {
  id: 'century-bridge',
  eyebrow: 'Horizon · 百年刻度',
  title: '穿越周期',
  lines: centuryPathIntro,
} as const

export const centuryPathEpilogue = [
  '所有的远方，都始于第二天的每一步清醒抉择。',
  '而你能走多远、守护几代人，全部取决于你的眼界刻度：从一年的波段机遇，到百年的永续传承——你走的不是一条财富之路，是一条超级英雄之旅。',
] as const

export const centuryHorizonScale = [
  { year: 1, label: '一年' },
  { year: 6, label: '六年' },
  { year: 15, label: '十五年' },
  { year: 30, label: '三十年' },
  { year: 50, label: '五十年' },
  { year: 100, label: '一百年' },
] as const

const yearOne: HorizonStageContent = {
  stageId: 'year-1',
  cycleIllustration: true,
  topics: [
    {
      id: 'value-speculation',
      label: '价值投机',
      hook: '借短期波段收割红利，为长远征途储备弹药',
      summary:
        '站在一年的时间尺度，锚定基钦库存短周期，核心目标是抓取市场阶段性红利，为长期资产布局储备充足弹药。',
      body:
        '这是超级英雄的初次实战练兵，不追求长期重仓押注，而是依托行情波动做波段操作，在可控风险区间内快进快出，落袋为安。\n\n如果你盯着一年时间单位赚取行情馈赠的短期收益，作为财富增量补充，但无法抵御通胀、朱格拉、康波等中长期周期冲击，无法建立家庭财富底盘——这一年，是练兵，不是终局。',
    },
    {
      id: 'value-investing',
      label: '价值投资',
      hook: '真正的价值投资，摒弃短线涨跌焦虑',
      summary: '赚取企业长期成长的复利收益，让时间成为财富最忠实的盟友。',
      body: '什么是价值投资？不是追热点、赌消息，而是以合理价格长期持有优质企业，陪伴其穿越周期。',
      cards: [
        {
          title: '巴菲特',
          body: '一生践行「别人恐惧我贪婪，别人贪婪我恐惧」，坚持以合理价格长期持有优质企业。',
          accent: '#22c55e',
        },
        {
          title: '芒格',
          body: '以多元思维模型、能力圈、逆向思维三大心法，规避绝大多数投资陷阱。',
          accent: '#6366f1',
        },
        {
          title: '李录',
          body: '《文明、现代化、价值投资与中国》：投资的终极目标，是长期守住、持续提升自身购买力。',
          accent: '#f59e0b',
        },
      ],
      demo: 'value-investing',
    },
    {
      id: 'global-vision',
      label: '全球资产配置',
      hook: '跳出单一市场束缚，布局三大全球化核心资产',
      summary:
        '以三十年历史走势印证长期复利的强大力量——美股、美债、ETF 协同发力，复利齿轮彻底转动。',
      body: '全球多元资产协同发力，财富从此摆脱人力束缚，实现自主增长。',
      cards: [
        {
          title: '美股',
          body: '分享全球顶尖科技、消费龙头企业的长期成长红利。',
        },
        {
          title: '美债',
          body: '作为稳健底仓对冲股市剧烈波动，锁定稳定永续现金流。',
        },
        {
          title: 'ETF',
          body: '低成本分散布局全球多赛道，规避个股暴雷、单一行业崩盘风险。',
        },
      ],
    },
    {
      id: 'ballast',
      label: '保障底盘',
      hook: '第一年同步筑牢家庭保障底盘，抵御黑天鹅击穿本金',
      summary:
        '意外、疾病、身故等人生黑天鹅应在第一年纳入规划；同步布局全球房产，搭建跨周期资产压舱石。',
      cards: [
        {
          title: '保险',
          body: '对冲疾病、意外、身故等人生黑天鹅，锁定刚性兜底现金流，杜绝突发风险击穿全家本金。',
          href: '/langtontao#wealth-checkup',
        },
        {
          title: '全球房产',
          body: '跨地域布局不动产，依托地产长周期持续保值，稳定产生租金现金流，长效对冲货币通胀贬值。',
          cta: true,
        },
      ],
      demo: 'ballast',
    },
  ],
}

const yearSix: HorizonStageContent = {
  stageId: 'year-6',
  topics: [
    {
      id: 'school-district',
      label: '学区与置产',
      hook: '孩子六七岁入学，学区与房产决策同步提上日程',
      summary:
        '大部分中国孩子在 6–7 岁踏入义务教育，家庭资产配置迎来新变量——学区逻辑、置产时机与入学规划需提前对齐。',
      body:
        '第六年不是被动等孩子上学才做决策，而是提前把学区、房产与家庭居住结构纳入同一盘棋。学区房不只是「买一张入场券」，而是对教育资源、通勤成本与资产流动性的综合权衡。',
      cards: [
        {
          title: '学区房',
          body: '以入学节点反推置产时机，在学区政策、学位规则与家庭现金流之间找到最优解。',
          cta: true,
        },
        {
          title: '学区规划',
          body: '对比公办、民办与跨境升学路径，让房产决策服务于孩子长期教育布局，而非短期投机。',
          cta: true,
        },
      ],
      demo: 'ballast',
    },
    {
      id: 'edu-reserve',
      label: '教育储备金',
      hook: '专项储备、保险托底，把教育开支从家庭现金流里隔离出来',
      summary:
        '从入学第一年起，教育支出进入长期刚性区间——教育储备金与相关保险产品，是第六年必须落地的财务动作。',
      cards: [
        {
          title: '教育储备金',
          body: '搭建独立隔离型教育资产，不受市场下跌、家庭债务牵连，稳稳覆盖子女从小到大全部教育开支。',
          cta: true,
        },
        {
          title: '教育险',
          body: '以保险产品锁定教育现金流，在意外、疾病等风险发生时，仍保障孩子求学路径不被中断。',
          cta: true,
        },
      ],
      demo: 'education',
    },
  ],
}

const yearFifteen: HorizonStageContent = {
  stageId: 'year-15',
  topics: [
    {
      id: 'garden',
      label: '出花园',
      hook: '从童年的花园，正式迈向成人的广阔世界',
      summary:
        '「出花园」是潮汕地区独有的传统成人礼俗，由古代「冠笄之礼」演变而来。年满15虚岁的少年，在这一天告别童年的「花园」。',
      body:
        '财富规划走到十五年，正是同样的「出花园」时刻——不再只服务于个人资产增值，正式落地代际托举规划。用教育金为孩子铺就花路，用全球身份给孩子穿上「红木屐」，用教育规划帮孩子「咬下鸡头」、开启属于他们的广阔人生。',
      ritualSteps: [
        {
          id: 'bath',
          label: '花园浴',
          detail: '用十二种吉祥鲜花浸水沐浴，洗去身上的孩子气。',
        },
        {
          id: 'shoes',
          label: '红木屐',
          detail: '穿上外婆赠送的红木屐与新衣，象征踏入新的人生阶段。',
        },
        {
          id: 'chicken',
          label: '咬鸡头',
          detail: '坐正位、咬鸡头，寓意出人头地、独占鳌头。',
        },
        {
          id: 'feast',
          label: '头彩食',
          detail: '猪内脏寓意换肠肚、豆干煮葱寓意聪慧有为、粉丝鸡蛋寓意长寿圆通。',
        },
      ],
      demo: 'garden-ritual',
    },
    {
      id: 'education',
      label: '教育体系',
      hook: '以资产托举后辈，让子女从你的花园走向世界的花园',
      summary: '跳出单人财富视角，提前衔接两代人的人生周期。',
      cards: [
        {
          title: '教育规划',
          body: '搭配香港、新加坡全球身份，打通海外名校升学完整通道。',
          cta: true,
        },
        {
          title: '留学',
          body: '给下一代远超父辈的人生选择权。',
          cta: true,
        },
      ],
      demo: 'education',
    },
    {
      id: 'identity',
      label: '身份规划',
      hook: '提前布局跨境身份，给家族留足跨周期选择权',
      summary: '打破地域政策、资产流通、子女教育的壁垒，以更长的人生尺度为孩子预留全球路径。',
      cards: [
        {
          title: '香港身份',
          body: '兼顾内地营商、海外升学、跨境资产隔离多重需求。',
          cta: true,
        },
        {
          title: '新加坡身份',
          body: '适配全球低税环境，方便全球资产存放、跨境信托搭建、海外养老规划。',
          cta: true,
        },
      ],
      demo: 'identity',
    },
  ],
}

const yearThirty: HorizonStageContent = {
  stageId: 'year-30',
  topics: [
    {
      id: 'legacy',
      label: '身后传承',
      hook: '三十年视野，直面晚年养老与身后资产传承',
      summary: '搭建完整闭环的身后事保障体系——人走基业不散，财富有序代代传递。',
      cards: [
        {
          title: '信托',
          body: '完成资产分层风险隔离，定向分配家族财富，隔绝婚姻、债务、遗产分割纠纷。',
          cta: true,
        },
        {
          title: 'BTC',
          body: '配置数字稀缺价值资产，作为跨法币体系的长期价值储备，对冲货币超发与信用体系波动。',
          cta: true,
        },
        {
          title: '养老',
          body: '搭建终身稳定被动现金流，晚年无需变卖核心不动产、股权资产，体面走完人生后半程。',
          cta: true,
        },
      ],
      demo: 'legacy-bento',
    },
  ],
}

const yearFifty: HorizonStageContent = {
  stageId: 'year-50',
  topics: [
    {
      id: 'family-origin',
      label: '家族肇始',
      hook: '五十年周期，完成从单人财富积累到家族肇始的跨越',
      summary: '破解千年难题：富不过三代。',
      cards: [
        {
          title: '三代囚笼',
          body: '深度拆解家族衰败底层根源：资产无隔离、家风断层、后代无财富认知，提前预埋制度规避三代衰败陷阱。',
        },
        {
          title: '家族宪章',
          body: '家风家训成文固化家族价值准则、资产分配规则、后代培育标准，用制度约束人性，用家风凝聚全族人心。',
        },
        {
          title: '赛博永生',
          body: '数字化永久留存家族精神、先辈事迹、财富规划脉络，让家族文化跨越代际永久传递。',
        },
        {
          title: '黄金',
          body: '配置实物黄金作为跨越康波长周期的终极锚定资产，对冲战争、恶性通胀、全球货币体系重构等极端风险。',
          cta: true,
        },
      ],
      demo: 'family-bento',
    },
  ],
}

const yearHundred: HorizonStageContent = {
  stageId: 'year-100',
  topics: [
    {
      id: 'charity',
      label: '慈善基金',
      hook: '一百年，以慈善定格家族荣光',
      summary:
        '眺望百年时间长河，冰冷的数字资产不再是规划核心，财富升维为家族精神、社会价值的永续载体。',
      body:
        '落地专属家族慈善基金，绑定家族名义持续回馈社会，让家族格局、善意、名望跨越百年持续流转；物质资产守护血脉代代延续，慈善精神铸就家族不朽精神图腾，完成物质财富与精神价值的双重永续传承。',
      demo: 'charity-halo',
    },
  ],
  epilogue: [...centuryPathEpilogue],
}

export const centuryHorizonsByStageId: Record<string, HorizonStageContent> = {
  'year-1': yearOne,
  'year-6': yearSix,
  'year-15': yearFifteen,
  'year-30': yearThirty,
  'year-50': yearFifty,
  'year-100': yearHundred,
}

export function getCenturyHorizon(stageId: string): HorizonStageContent | null {
  return centuryHorizonsByStageId[stageId] ?? null
}

export const HORIZON_STAGE_IDS = [
  'year-1',
  'year-6',
  'year-15',
  'year-30',
  'year-50',
  'year-100',
] as const
