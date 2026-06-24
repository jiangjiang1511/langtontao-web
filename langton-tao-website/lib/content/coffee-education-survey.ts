export type EducationSurveyTrack = 'procreation' | 'education'

export type EducationOutcomeId =
  | 'philo-open-world'
  | 'philo-global-embodied'
  | 'philo-sail-confidence'
  | 'philo-study-path'
  | 'proc-child-security'
  | 'proc-fertility-support'
  | 'proc-pet-family'

export type EducationSurveyOption = {
  id: string
  label: string
  description?: string
  weights: Partial<Record<EducationOutcomeId, number>>
}

export type EducationSurveyQuestion = {
  id: string
  prompt: string
  subPrompt?: string
  options: readonly EducationSurveyOption[]
}

export type EducationSurveyAnswers = Record<string, string>

export type EducationSurveyRootChoice = {
  id: EducationSurveyTrack
  label: string
  description?: string
}

export const educationSurveyMeta = {
  eyebrow: 'Interactive · 教育调研',
  title: '教育 · 与孩子的关系',
  lead: '生育与教育，表面是两件事，底层却是同一张家庭时间表的两种写法。几道单选题，帮你们看清此刻真实的倾向——没有标准答案，只有你们自己的节奏。',
  hint: '单选推进 · 可随时返回上一步',
  backLabel: '上一步',
  restartLabel: '重新探索',
  rootPrompt: '你想先从哪条路径谈起？',
  rootSubPrompt: '生育安排，或教育方向',
} as const

export const educationSurveyRootChoices: readonly EducationSurveyRootChoice[] = [
  { id: 'procreation', label: '生育' },
  { id: 'education', label: '教育' },
]

export const procreationSurveyQuestions: readonly EducationSurveyQuestion[] = [
  {
    id: 'proc-q1-stage',
    prompt: '关于家庭生命阶段，你们目前更接近哪种状态？',
    subPrompt: '诚实面对此刻，而非理想剧本',
    options: [
      {
        id: 'has-children',
        label: '已有孩子',
        description: '养育已在日常议程里',
        weights: {
          'proc-child-security': 2,
        },
      },
      {
        id: 'planning',
        label: '备孕或规划中',
        description: '在谈要不要、何时要、怎么要',
        weights: {
          'proc-fertility-support': 3,
        },
      },
      {
        id: 'dink',
        label: '主动不生育或丁克',
        description: '二人或其他结构是主动选择',
        weights: {
          'proc-pet-family': 2,
        },
      },
    ],
  },
  {
    id: 'proc-q2-resources',
    prompt: '若谈资源投入，你们更常争论或思考的是？',
    options: [
      {
        id: 'rich-upbringing',
        label: '视野与体验',
        description: '尽量在物质与体验上给予充裕',
        weights: {
          'proc-child-security': 2,
        },
      },
      {
        id: 'poor-upbringing',
        label: '节制与自立',
        description: '强调吃苦、边界与长期韧性',
        weights: {
          'proc-child-security': 1,
          'proc-fertility-support': 1,
        },
      },
      {
        id: 'not-debating',
        label: '尚未争论',
        description: '还没形成清晰共识',
        weights: {
          'proc-fertility-support': 1,
        },
      },
    ],
  },
  {
    id: 'proc-q3-future',
    prompt: '对未来的不确定性，你们更倾向哪种准备方式？',
    options: [
      {
        id: 'cryo',
        label: '保留生物与时间窗口',
        description: '冻卵冻精等技术延长选择',
        weights: {
          'proc-fertility-support': 4,
        },
      },
      {
        id: 'adoption',
        label: '以另一种方式成为父母',
        description: '领养或其他组建家庭的路径',
        weights: {
          'proc-fertility-support': 2,
          'proc-child-security': 2,
        },
      },
      {
        id: 'accept-structure',
        label: '接受当下的家庭结构',
        description: '不急于改变，先对齐内部期待',
        weights: {
          'proc-pet-family': 2,
        },
      },
    ],
  },
  {
    id: 'proc-q4-responsibility',
    prompt: '家庭责任感的练习，你们更常在哪里发生？',
    options: [
      {
        id: 'long-term-planning',
        label: '为孩子做长期安排',
        description: '教育金、保障与人生底线的规划',
        weights: {
          'proc-child-security': 4,
        },
      },
      {
        id: 'fertility-care',
        label: '在生育路径上寻求支持',
        description: '医学、养护与身心状态的照护',
        weights: {
          'proc-fertility-support': 4,
        },
      },
      {
        id: 'pet-care',
        label: '在宠物陪伴里承担照顾',
        description: '陪伴、日常节律与情感寄托',
        weights: {
          'proc-pet-family': 4,
        },
      },
    ],
  },
  {
    id: 'proc-q5-clarify',
    prompt: '此刻最想先厘清的是？',
    subPrompt: '以下均为方向，而非单一产品',
    options: [
      {
        id: 'education-fund',
        label: '教育金与人生保障',
        description: '为孩子存下一份可预期的未来',
        weights: {
          'proc-child-security': 5,
        },
      },
      {
        id: 'fertility-assist',
        label: '生育辅助与养护',
        description: '在生育路上保留选项与身心支持',
        weights: {
          'proc-fertility-support': 5,
        },
      },
      {
        id: 'pet-family',
        label: '宠物作为家庭成员的保障',
        description: '大病、陪伴与生命终点的安排',
        weights: {
          'proc-pet-family': 5,
        },
      },
    ],
  },
]

export const educationSurveyQuestions: readonly EducationSurveyQuestion[] = [
  {
    id: 'edu-q1-anxiety',
    prompt: '在教育上，你们此刻最焦虑的差距是？',
    subPrompt: '诚实面对，而非理想剧本',
    options: [
      {
        id: 'info-gap',
        label: '信息闭塞，跟不上世界变化',
        description: '担心视野与机会被语言与信息壁垒挡住',
        weights: {
          'philo-open-world': 4,
        },
      },
      {
        id: 'book-life-gap',
        label: '书本脱离真实生活',
        description: '知识很多，却缺少在真实场域里的体感',
        weights: {
          'philo-global-embodied': 4,
        },
      },
      {
        id: 'independence-gap',
        label: '不敢独立应对风浪',
        description: '担心协作、勇气与抗压尚未被锻炼',
        weights: {
          'philo-sail-confidence': 4,
        },
      },
      {
        id: 'path-gap',
        label: '升学节点容易失控',
        description: '方向与时间线模糊，焦虑来自未知',
        weights: {
          'philo-study-path': 4,
        },
      },
    ],
  },
  {
    id: 'edu-q2-scene',
    prompt: '理想的学习场景，更接近哪一种？',
    options: [
      {
        id: 'cross-cultural',
        label: '跨文化对话',
        description: '在不同语境里理解自己与他人的位置',
        weights: {
          'philo-open-world': 2,
          'philo-global-embodied': 3,
        },
      },
      {
        id: 'pbl-real',
        label: '在项目中解决真问题',
        description: 'PBL 与具身认知，身体记住的路线',
        weights: {
          'philo-global-embodied': 4,
        },
      },
      {
        id: 'team-mission',
        label: '团队协作的真实任务',
        description: '分工、信任与共同决策里的成长',
        weights: {
          'philo-sail-confidence': 4,
        },
      },
      {
        id: 'staged-plan',
        label: '可执行的阶段性计划',
        description: '节点清晰、节奏可控的路径拆解',
        weights: {
          'philo-study-path': 4,
        },
      },
    ],
  },
  {
    id: 'edu-q3-language',
    prompt: '语言在你们家庭教育中的位置？',
    options: [
      {
        id: 'world-tool',
        label: '连接世界的工具',
        description: '英语是推开更大世界的入口',
        weights: {
          'philo-open-world': 4,
        },
      },
      {
        id: 'secondary',
        label: '不是当前重点',
        description: '更关心场域、心性或路径本身',
        weights: {
          'philo-global-embodied': 1,
          'philo-sail-confidence': 1,
          'philo-study-path': 1,
        },
      },
      {
        id: 'balanced',
        label: '与其他能力并重',
        description: '语言、协作与路径需要一起谈',
        weights: {
          'philo-open-world': 1,
          'philo-study-path': 2,
        },
      },
    ],
  },
  {
    id: 'edu-q4-investment',
    prompt: '你们愿意为孩子投入的深度，更接近？',
    options: [
      {
        id: 'cognitive-infra',
        label: '认知基础设施',
        description: '视野、思维与表达能力的长期建设',
        weights: {
          'philo-open-world': 4,
        },
      },
      {
        id: 'embodied-exp',
        label: '具身经历',
        description: '在不同文化与社会里轻轻交手',
        weights: {
          'philo-global-embodied': 4,
        },
      },
      {
        id: 'character-build',
        label: '心性锻造',
        description: '在真实挑战里建立协作与信心',
        weights: {
          'philo-sail-confidence': 4,
        },
      },
      {
        id: 'structured-path',
        label: '结构化路径',
        description: '方向、节点与家庭节奏的可执行拆解',
        weights: {
          'philo-study-path': 4,
        },
      },
    ],
  },
  {
    id: 'edu-q5-first-step',
    prompt: '若只能先迈一步，你们更希望？',
    subPrompt: '以下均为教育方向，而非单一产品',
    options: [
      {
        id: 'open-vision',
        label: '打开视野',
        description: '主动介入世界，在变化来临前先一步',
        weights: {
          'philo-open-world': 5,
        },
      },
      {
        id: 'gentle-encounter',
        label: '与社会轻轻交手',
        description: '用身体记住的路线，而非隔窗观火',
        weights: {
          'philo-global-embodied': 5,
        },
      },
      {
        id: 'storm-collab',
        label: '在风浪里协作',
        description: '分工、信任与共同决策里的成长',
        weights: {
          'philo-sail-confidence': 5,
        },
      },
      {
        id: 'path-breakdown',
        label: '路径拆解',
        description: '把留学与升学变成可管理的项目',
        weights: {
          'philo-study-path': 5,
        },
      },
    ],
  },
]

export function getEducationSurveyQuestions(
  track: EducationSurveyTrack
): readonly EducationSurveyQuestion[] {
  return track === 'procreation'
    ? procreationSurveyQuestions
    : educationSurveyQuestions
}

export function getEducationSurveyQuestion(
  track: EducationSurveyTrack,
  questionId: string
): EducationSurveyQuestion | null {
  return (
    getEducationSurveyQuestions(track).find((q) => q.id === questionId) ?? null
  )
}

export function getEducationSurveyOption(
  track: EducationSurveyTrack,
  questionId: string,
  optionId: string
): EducationSurveyOption | null {
  const question = getEducationSurveyQuestion(track, questionId)
  return question?.options.find((o) => o.id === optionId) ?? null
}
