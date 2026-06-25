export const superheroJourneyIntro = {
  eyebrow: '具身认知 · Embodied Growth',
  title: '超级英雄探索之旅',
  lead: '徒步、游学与航海——三条具身路径，让身体与认知同步定投。与社群成员一起，在挑战与远行中书写家族同频的超级英雄叙事。',
} as const

export const communityJoinCtas = {
  afterHero: {
    title: '加入我们',
    tagline: '与社群同频，在具身挑战与远行中开启认知定投。',
    ctaLabel: '加入我们',
    ctaHref: '/member',
  },
  beforeMillionaire: {
    title: '加入我们',
    tagline: '进入朗敦道生态，参与财商沙龙、读书会与线上课。',
    ctaLabel: '加入我们',
    ctaHref: '/member',
  },
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

export type MillionaireEventCategory =
  | 'online-course'
  | 'salon'
  | 'reading'
  | 'education-salon'

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
  coverSrc: string
  href: string
}

const assetsBase = '/assets'
const eventCoverBase = `${assetsBase}/bearbitcoffee/event-cover`

const defaultEventImageClass =
  'bg-gradient-to-br from-zinc-400 to-zinc-600' as const

function eventCoverByMiniProgramId(id: number) {
  return `${eventCoverBase}/event-${id}.jpg`
}

type MillionaireEventSeed = {
  miniProgramId: number
  title: string
  href: string
  category: MillionaireEventCategory
  typeLabel: string
}

function buildMillionaireEvent(seed: MillionaireEventSeed): MillionaireEvent {
  return {
    id: `event-${seed.miniProgramId}`,
    category: seed.category,
    typeLabel: seed.typeLabel,
    title: seed.title,
    date: '详见小程序',
    isPast: false,
    imageClass: defaultEventImageClass,
    coverSrc: eventCoverByMiniProgramId(seed.miniProgramId),
    href: seed.href,
  }
}

export const millionairePlanMeta = {
  eyebrow: '财商定投 · MILLIONAIRE PLAN',
  title: '千万富翁养成计划',
  lead: '线上课、财富沙龙、教育沙龙与读书会——按主题筛选活动，查看分享与参与方式。',
} as const

export const millionairePlanFilters: {
  id: MillionairePlanFilterId
  label: string
}[] = [
  { id: 'upcoming', label: '全部活动' },
  { id: 'online-course', label: '线上课' },
  { id: 'salon', label: '财富沙龙' },
  { id: 'education-salon', label: '教育沙龙' },
  { id: 'reading', label: '读书会' },
]

export const millionairePlanEvents: MillionaireEvent[] = [
  buildMillionaireEvent({
    miniProgramId: 152,
    title: '选对升学赛道，听招生主任说真话：香港本科升学闭门沙',
    href: 'https://wxaurl.cn/5pvPh65SDop',
    category: 'education-salon',
    typeLabel: '教育沙龙',
  }),
  buildMillionaireEvent({
    miniProgramId: 149,
    title: '八部委联合出手，千万港美股账户迎来生死大考',
    href: 'https://wxaurl.cn/TQ4r0wbOMVc',
    category: 'online-course',
    typeLabel: '线上课',
  }),
  buildMillionaireEvent({
    miniProgramId: 151,
    title: '用一趟环球旅程，换一张直通海外名校的美高学籍',
    href: 'https://wxaurl.cn/tgCpL3bIQZg',
    category: 'education-salon',
    typeLabel: '教育沙龙',
  }),
  buildMillionaireEvent({
    miniProgramId: 146,
    title: '站在时代风口，拿捏未来财富机遇——香帅共潮生・香港专场',
    href: 'https://wxaurl.cn/dexWGoZbPoo',
    category: 'salon',
    typeLabel: '财富沙龙',
  }),
  buildMillionaireEvent({
    miniProgramId: 142,
    title: '表哥春季私董会—多元私人财富管理闭门交流会',
    href: 'https://wxaurl.cn/iiFSJhSdBMe',
    category: 'salon',
    typeLabel: '财富沙龙',
  }),
  buildMillionaireEvent({
    miniProgramId: 141,
    title: '娃哈哈信托启示录：海外信托与家族财富传承',
    href: 'https://wxaurl.cn/U6cpwRtABwm',
    category: 'online-course',
    typeLabel: '线上课',
  }),
  buildMillionaireEvent({
    miniProgramId: 139,
    title: '全球布局 稳守丰盈',
    href: 'https://wxaurl.cn/HXm2ZS6Ljjg',
    category: 'online-course',
    typeLabel: '线上课',
  }),
  buildMillionaireEvent({
    miniProgramId: 137,
    title: '做好全球资产配置让财富源远流长',
    href: 'https://wxaurl.cn/2MrCiZhoSUu',
    category: 'online-course',
    typeLabel: '线上课',
  }),
  buildMillionaireEvent({
    miniProgramId: 136,
    title: '太保大讲堂——新时代家庭财富的确定性布局',
    href: 'https://wxaurl.cn/AqwOd2lSrFj',
    category: 'salon',
    typeLabel: '财富沙龙',
  }),
  buildMillionaireEvent({
    miniProgramId: 114,
    title: '高考低分逆袭之路讲座',
    href: 'https://wxaurl.cn/NmUMp2iD0xc',
    category: 'education-salon',
    typeLabel: '教育沙龙',
  }),
  buildMillionaireEvent({
    miniProgramId: 112,
    title: '花卉小镇英语角',
    href: 'https://wxaurl.cn/rLDzpxFVdrc',
    category: 'education-salon',
    typeLabel: '教育沙龙',
  }),
  buildMillionaireEvent({
    miniProgramId: 106,
    title: '《但愿人长久》观影·漫谈夜',
    href: 'https://wxaurl.cn/2csoKw0hybj',
    category: 'salon',
    typeLabel: '财富沙龙',
  }),
  buildMillionaireEvent({
    miniProgramId: 100,
    title: '一期一会：不用主动开口，3招让客户主动来买单！',
    href: 'https://wxaurl.cn/iJyZsxomgBk',
    category: 'salon',
    typeLabel: '财富沙龙',
  }),
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
    'education-salon': millionairePlanEvents.filter(
      (event) => event.category === 'education-salon'
    ).length,
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
