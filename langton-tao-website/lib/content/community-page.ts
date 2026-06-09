export const superheroJourneyIntro = {
  eyebrow: '具身认知 · Embodied Growth',
  title: '超级英雄探索之旅',
  lead: '徒步、游学与航海——三条具身路径，让身体与认知同步定投。与社群成员一起，在挑战与远行中书写家族同频的超级英雄叙事。',
} as const

export const superheroPrograms = [
  {
    id: 'maclehose',
    anchor: 'maclehose',
    title: '麦理浩径',
    subtitle: '十段挑战 · 巅峰叙事',
    description:
      '户外具身认知旗舰项目：沿香港麦理浩径完成分段徒步挑战，在山路与海岸之间沉淀身体耐力与家族对话。完成十段者可在巅峰分享个人故事，把具身经历转化为可传承的认知资产。',
    highlights: ['每月可选参与', '麦理浩径超级英雄之旅', '巅峰个人叙事分享'],
    imageSrc: '/community/maclehose.svg',
    imageAlt: '麦理浩径徒步风景占位图',
    imageClass:
      'bg-gradient-to-br from-emerald-900 via-green-800 to-zinc-900',
  },
  {
    id: 'borui',
    anchor: 'borui',
    title: '博睿学者',
    subtitle: '游学 · 顶层认知拓展',
    description:
      '连接国内大脑与架构中枢的游学项目：在实地走访与学者对话中拓展顶层视野，把宏观判断、行业洞察与家族战略思考融入具身学习，为传承系统补足认知纵深。',
    highlights: ['顶层规划游学', '学者与同频家庭对话', '国内资源矩阵实地链接'],
    imageSrc: '/community/borui.svg',
    imageAlt: '博睿学者游学占位图',
    imageClass:
      'bg-gradient-to-br from-amber-800 via-amber-600 to-zinc-900',
  },
  {
    id: 'nezha',
    anchor: 'nezha',
    title: '哪咤航海',
    subtitle: '海上具身 · 远征定投',
    description:
      '以航海为载体的具身认知项目：在海风、航线与团队协作中完成另一重挑战。会员可专享参与，在远征节奏里锻炼决断力、默契感与跨情境适应——身体在场，认知也在场。',
    highlights: ['会员专享参与', '海上团队协作', '远征式认知定投'],
    imageSrc: '/community/nezha.svg',
    imageAlt: '哪咤航海占位图',
    imageClass:
      'bg-gradient-to-br from-sky-950 via-blue-900 to-pop-black',
  },
] as const

export type MillionaireEventCategory = 'online-course' | 'salon' | 'reading'

export type MillionairePlanFilterId = 'upcoming' | MillionaireEventCategory

export type MillionaireEvent = {
  id: string
  category: MillionaireEventCategory
  typeLabel: string
  title: string
  date: string
  isPast: boolean
  status?: 'open' | 'full'
  imageClass: string
  coverSrc?: string
}

export const millionairePlanMeta = {
  eyebrow: '财商定投 · MILLIONAIRE PLAN',
  title: '千万富翁养成计划',
  lead: '线上课、财富沙龙与读书会——三条财商认知路径，按主题筛选活动，查看分享与参与方式。',
} as const

export const millionairePlanFilters: {
  id: MillionairePlanFilterId
  label: string
}[] = [
  { id: 'upcoming', label: '即将开始' },
  { id: 'online-course', label: '线上课' },
  { id: 'salon', label: '财富沙龙' },
  { id: 'reading', label: '读书会' },
]

export const millionairePlanEvents: MillionaireEvent[] = [
  {
    id: 'salon-succession-2026',
    category: 'salon',
    typeLabel: '财富沙龙',
    title: '财富夜话：二代传承与跨境架构',
    date: '2026年5月28日',
    isPast: false,
    imageClass: 'bg-gradient-to-br from-zinc-500 to-zinc-800',
  },
  {
    id: 'reading-antifragile-2026',
    category: 'reading',
    typeLabel: '读书会',
    title: '六月主题共读《反脆弱》',
    date: '2026年6月1日',
    isPast: false,
    imageClass: 'bg-gradient-to-br from-pop-yellow/80 to-amber-200',
  },
  {
    id: 'online-course-risk-101',
    category: 'online-course',
    typeLabel: '线上课',
    title: '家族风控体系 101',
    date: '2026年7月5日',
    isPast: false,
    imageClass: 'bg-gradient-to-br from-sky-200 to-blue-400',
  },
  {
    id: 'online-course-cognition-2026',
    category: 'online-course',
    typeLabel: '线上课',
    title: '财商认知定投入门工作坊',
    date: '2026年6月22日',
    isPast: false,
    imageClass: 'bg-gradient-to-br from-amber-100 to-pop-yellow',
  },
  {
    id: 'salon-shanghai-meetup-full',
    category: 'salon',
    typeLabel: '财富沙龙',
    title: '「已满」上海线下 Meetup：卓越的方式',
    date: '2026年6月6日',
    isPast: false,
    status: 'full',
    imageClass: 'bg-gradient-to-br from-teal-700 to-emerald-900',
  },
  {
    id: 'reading-dip-2026',
    category: 'reading',
    typeLabel: '读书会',
    title: '2026年6月读书会《The Dip》',
    date: '2026年6月1日',
    isPast: false,
    imageClass: 'bg-gradient-to-br from-orange-200 to-rose-300',
  },
  {
    id: 'past-year-end-2025',
    category: 'salon',
    typeLabel: '财富沙龙',
    title: '2025 年终财富复盘沙龙',
    date: '2025年12月20日',
    isPast: true,
    imageClass: 'bg-gradient-to-br from-zinc-400 to-zinc-600',
  },
  {
    id: 'past-reading-2025',
    category: 'reading',
    typeLabel: '读书会',
    title: '十二月共读《纳瓦尔宝典》',
    date: '2025年12月1日',
    isPast: true,
    imageClass: 'bg-gradient-to-br from-violet-300 to-indigo-500',
  },
]

export function isMillionaireEventOpenForRegistration(
  event: MillionaireEvent
): boolean {
  return !event.isPast && event.status !== 'full'
}

export function filterMillionairePlanEvents(
  filterId: MillionairePlanFilterId
): MillionaireEvent[] {
  if (filterId === 'upcoming') {
    return millionairePlanEvents.filter(isMillionaireEventOpenForRegistration)
  }
  return millionairePlanEvents.filter((event) => event.category === filterId)
}

export function getMillionairePlanCategoryCounts() {
  return {
    upcoming: millionairePlanEvents.filter(
      isMillionaireEventOpenForRegistration
    ).length,
    'online-course': millionairePlanEvents.filter(
      (event) => event.category === 'online-course'
    ).length,
    salon: millionairePlanEvents.filter((event) => event.category === 'salon')
      .length,
    reading: millionairePlanEvents.filter(
      (event) => event.category === 'reading'
    ).length,
  }
}

/** 首页「即将开始」展示用（取前 N 条报名中的活动） */
export function getUpcomingEventsPreview(limit = 3) {
  return filterMillionairePlanEvents('upcoming')
    .slice(0, limit)
    .map((event) => ({
      id: event.id,
      type: event.typeLabel,
      title: event.title,
      date: event.date,
      imageClass: event.imageClass,
    }))
}

export const communityMembershipMeta = {
  eyebrow: '朗敦道 MFO · MEMBERSHIP',
  title: '会员档位',
  lead: '从认知定投到财富体检与私董会圈层——选择适合家族阶段的会员方案，进入完整生态。',
} as const
