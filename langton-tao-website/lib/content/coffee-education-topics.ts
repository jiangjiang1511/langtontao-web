export type EducationPillar = 'jiao' | 'yu'

export type EducationTopicArticleRef = {
  title: string
  outlet: string
  url: string
}

export type EducationTopicCard = {
  id: string
  pillar: EducationPillar
  title: string
  insight: string
  article: EducationTopicArticleRef
}

export const educationJiaoSectionMeta = {
  eyebrow: '教 · TEACH',
  title: '推开世界的门',
  lead: '学识、价值观与视野的传承——英语不只是考试科目，更是变化世界里孩子与外界连接的窗口。',
  topicsEyebrow: '家庭对话 · 教',
  topicsTitle: '成长路上，你们最常聊什么？',
} as const

export const educationYuSectionMeta = {
  eyebrow: '育 · NURTURE',
  title: '成家与优生优育',
  lead: '生育和教育写的是同一张家庭时间表——备孕、结构、照护与成本，都值得被认真看见。',
  topicsEyebrow: '家庭对话 · 育',
  topicsTitle: '成家路上，这些对话常被跳过',
} as const

export const educationTopicCards: readonly EducationTopicCard[] = [
  {
    id: 'yu-life-science-procreation',
    pillar: 'yu',
    title: '生命科学与生育规划',
    insight:
      '技术能买来时间，却买不来「我们要不要」——备孕、丁克、冻卵、领养，伴侣之间这一步聊过吗？',
    article: {
      title: '生命科学与生育规划',
      outlet: '熊比特 Coffee Chat',
      url: '/member',
    },
  },
  {
    id: 'yu-pet-member-care',
    pillar: 'yu',
    title: '家庭宠物成员关怀',
    insight:
      '它可能是家里被最早叫醒、最晚被安顿的成员——谁照顾、谁出钱、谁有权决定，你们聊过吗？',
    article: {
      title: '家庭宠物成员关怀',
      outlet: '熊比特 Coffee Chat',
      url: '/member',
    },
  },
  {
    id: 'yu-cyber-immortality',
    pillar: 'yu',
    title: '家庭成员赛博永生',
    insight:
      '相册里上万张图，孩子却未必知道你们为何这样活——想留下什么给下一代？',
    article: {
      title: '家庭成员赛博永生',
      outlet: '熊比特 Coffee Chat',
      url: '/member',
    },
  },
  {
    id: 'yu-proc-q1-stage',
    pillar: 'yu',
    title: '家庭阶段决定规划重心',
    insight:
      '已在育、在备孕、或已选定结构——照护与保障不能用同一张模板，阶段不同，重心就不同。',
    article: {
      title: '家庭阶段决定规划重心',
      outlet: '熊比特 Coffee Chat',
      url: '/coffee#life-education',
    },
  },
  {
    id: 'yu-proc-q2-resources',
    pillar: 'yu',
    title: '富养与韧性：资源基调要谈清',
    insight:
      '给足视野体验，还是节制一点让他自己扛——两种「好家长」想象，不对齐就会在内耗里烧钱。',
    article: {
      title: '富养与韧性：资源基调要谈清',
      outlet: '熊比特 Coffee Chat',
      url: '/coffee#life-education',
    },
  },
  {
    id: 'yu-proc-responsibility-clarity',
    pillar: 'yu',
    title: '教育金与保障：先谈最挂心的一件',
    insight:
      '长线打算、照护分工、现金流——责任落在哪，预算和情绪就落在哪；比空泛焦虑更管用。',
    article: {
      title: '教育金与保障：先谈最挂心的一件',
      outlet: '熊比特 Coffee Chat',
      url: '/coffee#life-education',
    },
  },
  {
    id: 'jiao-education-door',
    pillar: 'jiao',
    title: '孩子怎么长、往哪走',
    insight:
      '焦虑、路径、语言、升学——成长已在日程里或近在眼前，先说说你们此刻最占心思的那件事。',
    article: {
      title: '孩子怎么长、往哪走',
      outlet: '熊比特 Coffee Chat',
      url: '/coffee#life-education',
    },
  },
  {
    id: 'jiao-edu-q1-anxiety',
    pillar: 'jiao',
    title: '躺平时，你们最常冒出来的担心是…',
    insight:
      '怕跟不上世界在变、怕书读得多生活接不上、怕不敢自己扛、怕升学节点失控——每种担心指向不同的补位方向。',
    article: {
      title: '躺平时最冒出来的担心',
      outlet: '熊比特 Coffee Chat',
      url: '/education',
    },
  },
  {
    id: 'jiao-edu-q2-scene',
    pillar: 'jiao',
    title: '如果让孩子多一种经历，你们更想是…',
    insight:
      '跨文化对话、真问题里动手做、团队任务里长本事，或有一条能照着走的计划——经历塑造的不只是履历。',
    article: {
      title: '多一种什么样的经历',
      outlet: '熊比特 Coffee Chat',
      url: '/community#borui',
    },
  },
  {
    id: 'jiao-edu-q3-language',
    pillar: 'jiao',
    title: '在你们家，语言（尤其是英语）现在是…',
    insight:
      '是考试科目，还是一扇门——家庭里的定位，决定孩子学的是分数还是连接。',
    article: {
      title: '英语在家庭里是什么位置',
      outlet: '熊比特 Coffee Chat',
      url: '/education',
    },
  },
  {
    id: 'jiao-edu-q4-investment',
    pillar: 'jiao',
    title: '你们更愿意把力气花在…',
    insight:
      '眼界思维表达、真实经历场域、心性协作抗压，或可执行的路径拆解——力气花在哪，结果就长在哪。',
    article: {
      title: '力气更愿意花在哪',
      outlet: '熊比特 Coffee Chat',
      url: '/education',
    },
  },
  {
    id: 'jiao-edu-q5-first-step',
    pillar: 'jiao',
    title: '如果只能先迈一小步，你们希望是…',
    insight:
      '打开视野、和社会轻轻交手、在风浪里练协作，或把路径拆清楚——小步对齐，比空泛焦虑更管用。',
    article: {
      title: '先迈哪一小步',
      outlet: '熊比特 Coffee Chat',
      url: '/education',
    },
  },
] as const

export function getEducationTopicCards(
  pillar: EducationPillar
): readonly EducationTopicCard[] {
  return educationTopicCards.filter((card) => card.pillar === pillar)
}
