export type LangtontaoSuperheroPillar = {
  id: string
  title: string
  summary: string
  accent: string
}

export type LangtontaoSuperheroCoreProgram = {
  id: string
  anchor: string
  title: string
  hook: string
  subtitle: string
  description: string
  philosophy: string
  audience: string
  highlights: readonly string[]
  accent: string
  coverSrc: string
  coverAlt: string
  gallery: readonly string[]
}

export type LangtontaoSuperheroExpeditionStatus = 'open' | 'upcoming' | 'past'

export type LangtontaoSuperheroExpedition = {
  id: string
  title: string
  location: string
  summary: string
  status: LangtontaoSuperheroExpeditionStatus
  statusLabel?: string
  dateLabel?: string
  coverSrc: string
  href?: string
}

export type LangtontaoSuperheroJoinStep = {
  id: string
  number: string
  title: string
  summary: string
  detail: string
}

import { langtontaoCommunityDetailLinks } from '@/lib/content/langtontao/langtontao-miniprogram-links'

const superheroAssetBase = {
  maclehose: '/assets/langtontao/superhero-MacLehose',
  baretscholar: '/assets/langtontao/superhero-baretscholar',
  sail: '/assets/langtontao/superhero-sail',
  others: '/assets/langtontao/superhero-others',
} as const

const programGalleries = {
  maclehose: {
    cover: `${superheroAssetBase.maclehose}/hike2.jpg`,
    gallery: [
      `${superheroAssetBase.maclehose}/hike1.jpg`,
      `${superheroAssetBase.maclehose}/hike2.jpg`,
      `${superheroAssetBase.maclehose}/hike10.jpg`,
      `${superheroAssetBase.maclehose}/hike11.jpg`,
      `${superheroAssetBase.maclehose}/hike5.jpg`,
      `${superheroAssetBase.maclehose}/hike6.jpg`,
      `${superheroAssetBase.maclehose}/hike9.jpg`,
      `${superheroAssetBase.maclehose}/hike12.jpg`,
    ],
  },
  borui: {
    cover: `${superheroAssetBase.baretscholar}/baretscholar1.jpg`,
    gallery: [
      `${superheroAssetBase.baretscholar}/baretscholar1.jpg`,
      `${superheroAssetBase.baretscholar}/baretscholar2.jpg`,
      `${superheroAssetBase.baretscholar}/baretscholar3.jpeg`,
      `${superheroAssetBase.baretscholar}/baretscholar4.jpg`,
      `${superheroAssetBase.baretscholar}/baretscholar5.jpg`,
      `${superheroAssetBase.baretscholar}/baretscholar6.jpg`,
      `${superheroAssetBase.baretscholar}/baretscholar7.jpeg`,
    ],
  },
  nezha: {
    cover: `${superheroAssetBase.sail}/sail4.jpg`,
    gallery: [
      `${superheroAssetBase.sail}/sail1.jpg`,
      `${superheroAssetBase.sail}/sail2.jpg`,
      `${superheroAssetBase.sail}/sail3.jpg`,
      `${superheroAssetBase.sail}/sail4.jpg`,
      `${superheroAssetBase.sail}/sail5.jpeg`,
      `${superheroAssetBase.sail}/sail6.jpeg`,
    ],
  },
} as const

export const langtontaoSuperheroProgramGalleries = programGalleries

export const langtontaoSuperheroPhilosophy = {
  eyebrow: 'Embodied Cognition · 具身认知',
  title: '什么是超级英雄之旅？',
  lead: '在资产配置的路上，真正改变决策质量的，往往不是多读一份报告，而是实地走、实地看、实地感。',
  paragraphs: [
    '超级英雄之旅，是用具身认知的方式，真实地了解社会、识别机会、体察风险——肉身在场，认知才在场。那些走在追求财富自由道路上的巨身行走，都是同一种英雄主义的不同形态。',
    '麦理浩径的香港徒步、博睿学者的全球游学、哪吒航海的海上远征，以及不定期更新的海外投资考察——它们不是彼此独立的「活动清单」，而是同一套具身认知定投的不同入口。',
  ],
} as const

export const langtontaoSuperheroPillars: readonly LangtontaoSuperheroPillar[] = [
  {
    id: 'society',
    title: '体察社会',
    summary: '在真实街景、产业现场与跨境节点里，感受制度、周期与人心如何共同定价。',
    accent: '#8b5cf6',
  },
  {
    id: 'opportunity',
    title: '识别机会',
    summary: '机会往往藏在实地走访的缝隙里——看项目、看城市、看供需，比屏幕上的曲线更接近真实赔率。',
    accent: '#6366f1',
  },
  {
    id: 'risk',
    title: '感知风险',
    summary: '风险不是表格里的数字，而是现场才能闻到的收缩、摩擦与错配——先感知，再定价。',
    accent: '#fb7185',
  },
] as const

export const langtontaoSuperheroProgramHubMeta = {
  eyebrow: 'Core Paths · 核心路径',
  title: '三条固定路径，同一种英雄之旅',
  lead: '徒步、游学与航海——形态不同，本质相同：让身体与认知同步定投，在共同挑战中传递默会知识。',
} as const

export const langtontaoSuperheroCorePrograms: readonly LangtontaoSuperheroCoreProgram[] = [
  {
    id: 'maclehose',
    anchor: 'maclehose',
    title: '麦理浩径',
    hook: '香港具身 · 家族对话 · 财富沙龙',
    subtitle: '十段挑战 · 巅峰叙事',
    philosophy: '用脚步丈量香港，用对话连接家族，用沙龙沉淀判断。',
    audience:
      '面向对全球资产配置感兴趣，想用脚实地感受这一位于国内的第一国际金融中心的朋友。',
    description:
      '沿麦理浩径分段完成具身挑战，在山路与海岸之间感受耐力、节奏与彼此。这不只是户外徒步——是以香港为场域的具身体验：走完一段路，也在路上完成家族对话；抵达终点海港城，进入财富沙龙，把身体经历转化为可讨论、可传承的认知资产。',
    highlights: [
      '全球第一金融中心的具身体验',
      '海港城财富沙龙',
      '全球资产配置',
    ],
    accent: '#22c55e',
    coverSrc: programGalleries.maclehose.cover,
    coverAlt: '麦理浩径徒步活动实拍',
    gallery: programGalleries.maclehose.gallery,
  },
  {
    id: 'borui',
    anchor: 'borui',
    title: '博睿学者',
    hook: '先看世界 · 再配全球',
    subtitle: '游学 · 顶层认知拓展',
    philosophy: '先具身理解世界如何运行，再谈全球资产配置。',
    audience:
      '面向想要看见更大的世界，通过具身认知的方式，增加国际视野、收获成长的朋友。（年龄：17岁～21岁）',
    description:
      '博睿学者连接国内大脑与架构中枢：在实地走访、学者对话与行业现场中，拓展顶层视野。先通过具身体验理解世界的运行规律，再为未来以全球视野做资产配置、做认知与商业储备——游学不是观光，是为传承系统补足认知纵深。',
    highlights: ['耶鲁前校长发起', '环球1年的顶层游学规划', '学者与同频家庭对话', '全球视野与架构链接', '认知商业储备'],
    accent: '#ec4899',
    coverSrc: programGalleries.borui.cover,
    coverAlt: '博睿学者游学活动实拍',
    gallery: programGalleries.borui.gallery,
  },
  {
    id: 'nezha',
    anchor: 'nezha',
    title: '哪吒航海',
    hook: '海上远征 · 团队决断',
    subtitle: '海上具身 · 远征定投',
    philosophy: '在风浪与航线里，锻炼另一种形式的勇气与默契。',
    audience:
      '面向渴望挑战、渴望冒险，想在真实的自然中感受成长的儿童和成人（包含针对学生群体的背景提升计划）',
    description:
      '以航海为载体的具身认知项目：海风、航线与团队协作，构成另一重挑战场景。会员可专享参与，在远征节奏里锻炼决断力、默契感与跨情境适应——身体在场，认知也在场；海上的一天，往往比会议室里的一季更能看清自己。',
    highlights: ['会员专享参与', '海上团队协作', '远征式认知定投', '风浪中的决断力'],
    accent: '#0ea5e9',
    coverSrc: programGalleries.nezha.cover,
    coverAlt: '哪吒航海活动实拍',
    gallery: programGalleries.nezha.gallery,
  },
] as const

export const langtontaoSuperheroExpeditionsMeta = {
  eyebrow: 'Expeditions · 不定期远征',
  title: '海外具身考察',
  lead: '零散、不规律、随机会更新——日本看房、海外城市投资考察、主题游学，都在这里持续上新。',
  emptyMessage: '新路线筹备中。预约咨询了解下一期海外具身考察。',
} as const

export const langtontaoSuperheroExpeditions: readonly LangtontaoSuperheroExpedition[] = [
  {
    id: 'japan-property',
    title: '日本房产实地走访',
    location: '东京 · 大阪 · 熊本',
    summary:
      '走进真实楼盘与社区，感受汇率、租售比、政策与本地供需——把「海外配置」从概念变成可触摸的现场判断。',
    status: 'upcoming',
    dateLabel: '筹备中',
    coverSrc: `${superheroAssetBase.others}/japanrealestate-cover.jpeg`,
  },
  {
    id: 'overseas-invest-tour',
    title: 'AI半导体产业考察',
    location: '韩国 · 日本 · 中国台湾',
    summary:
      '2026年台日韩接连公布国家级 AI 与半导体投资蓝图——韩国西南圈集群与 HBM 产能、日本官民路线图与次世代产线、台湾先进制程与 AI 新十大建设。朗敦道主题游学走进产业链关键节点，用具身认知把宏观趋势、政策红利与全球资产配置判断落到现场。',
    status: 'upcoming',
    dateLabel: '筹备中',
    coverSrc: `${superheroAssetBase.others}/AI-industry-cover.jpg`,
  },
  {
    id: 'theme-study-tour',
    title: '2025香港巴塞尔 VIP游学招募',
    location: '香港 · 巴塞尔艺术展',
    summary:
      '朗敦道主题游学——在 Art Basel Hong Kong 贵宾场与同频同行者走进湾仔会展主展、M+ 与西九文化区，以具身方式读懂亚洲顶级艺术市场与跨境资产配置语境；与顾问、从业者与本地资源同场，把信息变成可执行的认知。',
    status: 'past',
    dateLabel: '活动已结束',
    coverSrc: `${superheroAssetBase.others}/artbasel-cover.jpg`,
    ...(langtontaoCommunityDetailLinks.artBaselVipTour2025
      ? { href: langtontaoCommunityDetailLinks.artBaselVipTour2025 }
      : {}),
  },
] as const

export const langtontaoSuperheroJoinMeta = {
  eyebrow: 'How to Join · 如何参与',
  title: '开启你的超级英雄之旅',
  lead: '加入朗敦道生态，选择核心路径或关注不定期远征——在具身挑战与同频社群里，完成认知定投。',
  communityHref: '/coffee#pillars',
  memberHref: '/member',
} as const

export const langtontaoSuperheroJoinSteps: readonly LangtontaoSuperheroJoinStep[] = [
  {
    id: 'join-member',
    number: '01',
    title: '加入朗敦道会员',
    summary: '进入完整生态与同频社群，开启人生认知定投。',
    detail:
      '加入朗敦道会员，一起 all in here。会员可参与 300+ 赋能活动、财富沙龙、线上课与读书会，并享有麦理浩径、哪吒航海等具身探索权益。',
  },
  {
    id: 'choose-path',
    number: '02',
    title: '选择路径或远征',
    summary: '三大核心路径 × 不定期海外考察，按需组合参与。',
    detail:
      '麦理浩径、博睿学者、哪吒航海是固定核心路径；海外具身考察随机会更新。可与千万富翁养成计划中的沙龙、线上课并行，按家族阶段灵活安排。',
  },
] as const

export function getLangtontaoSuperheroProgram(id: string) {
  return langtontaoSuperheroCorePrograms.find((program) => program.id === id) ?? null
}
