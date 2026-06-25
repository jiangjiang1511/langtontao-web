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
  eyebrow: 'Coffee Chat · 家庭对话',
  title: '教育 · 与孩子的关系',
  lead: '生育和教育，写的是同一张家庭时间表。没有标准答案——先说说你们此刻最占心思的那件事。',
  hint: '点选最贴近你们的一句 · 随时可以返回',
  backLabel: '回到上一句',
  restartLabel: '换个开头聊聊',
  rootPrompt: '如果今晚只能先聊一件，你们会先打开哪扇门？',
  rootSubPrompt: '没有先后顺序，从我们此刻最在意的说起。',
} as const

export const educationSurveyRootChoices: readonly EducationSurveyRootChoice[] = [
  {
    id: 'procreation',
    label: '要不要、何时要、怎么要',
    description: '备孕、丁克、冻卵、领养——家庭结构还在书写中',
  },
  {
    id: 'education',
    label: '孩子怎么长、往哪走',
    description: '焦虑、路径、语言、升学——成长已在日程里或近在眼前',
  },
]

export const procreationSurveyQuestions: readonly EducationSurveyQuestion[] = [
  {
    id: 'proc-q1-stage',
    prompt: '说到孩子，你们家现在更像哪个片段？',
    options: [
      {
        id: 'has-children',
        label: '孩子已经在日常里了',
        description: '接送、花费、陪伴都是真议题',
        weights: {
          'proc-child-security': 2,
        },
      },
      {
        id: 'planning',
        label: '还在谈要不要、何时要',
        description: '备孕、规划，或路线还没定下来',
        weights: {
          'proc-fertility-support': 3,
        },
      },
      {
        id: 'dink',
        label: '我们主动选择了现在的家庭结构',
        description: '丁克、二人世界，或其他我们认同的样子',
        weights: {
          'proc-pet-family': 2,
        },
      },
    ],
  },
  {
    id: 'proc-q2-resources',
    prompt: '如果只能先定一个基调，你们会更倾向…',
    options: [
      {
        id: 'rich-upbringing',
        label: '尽量给足视野和体验',
        description: '物质与经历上不想让孩子吃亏',
        weights: {
          'proc-child-security': 2,
        },
      },
      {
        id: 'poor-upbringing',
        label: '节制一点，让他自己扛',
        description: '吃苦、边界和韧性比舒适更重要',
        weights: {
          'proc-child-security': 1,
          'proc-fertility-support': 1,
        },
      },
      {
        id: 'not-debating',
        label: '还没吵到这一步',
        description: '大方向都没对齐，谈不上细账',
        weights: {
          'proc-fertility-support': 1,
        },
      },
    ],
  },
  {
    id: 'proc-q3-future',
    prompt: '面对「还不确定」这件事，你们更想先…',
    options: [
      {
        id: 'cryo',
        label: '把时间和选项留住',
        description: '冻卵冻精这类，让「以后还能选」',
        weights: {
          'proc-fertility-support': 4,
        },
      },
      {
        id: 'adoption',
        label: '换一条路成为父母',
        description: '领养或其他组建家庭的方式',
        weights: {
          'proc-fertility-support': 2,
          'proc-child-security': 2,
        },
      },
      {
        id: 'accept-structure',
        label: '先接受现在的样子',
        description: '不急着改结构，把彼此期待说清楚',
        weights: {
          'proc-pet-family': 2,
        },
      },
    ],
  },
  {
    id: 'proc-q4-responsibility',
    prompt: '在你们的生活里，「照顾与负责」最常出现在…',
    options: [
      {
        id: 'long-term-planning',
        label: '给孩子做长线打算',
        description: '教育金、保障、人生底线这些事',
        weights: {
          'proc-child-security': 4,
        },
      },
      {
        id: 'fertility-care',
        label: '生育这条路上的照护',
        description: '医学、养护、身心状态都在日程里',
        weights: {
          'proc-fertility-support': 4,
        },
      },
      {
        id: 'pet-care',
        label: '照顾家里的另一个成员',
        description: '宠物带来的陪伴、节律和牵挂',
        weights: {
          'proc-pet-family': 4,
        },
      },
    ],
  },
  {
    id: 'proc-q5-clarify',
    prompt: '如果先解决一个最挂心的问题，会是…',
    options: [
      {
        id: 'education-fund',
        label: '给孩子留一份看得见的未来',
        description: '教育金、保障，让不确定少吓我们一点',
        weights: {
          'proc-child-security': 5,
        },
      },
      {
        id: 'fertility-assist',
        label: '生育路上有人帮、有选项',
        description: '辅助、养护，别把路走死',
        weights: {
          'proc-fertility-support': 5,
        },
      },
      {
        id: 'pet-family',
        label: '陪伴也要被认真安排',
        description: '大病、照护、生命终点都不敷衍',
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
    prompt: '躺平时，你们最常冒出来的担心是…',
    options: [
      {
        id: 'info-gap',
        label: '怕他跟不上世界在变什么',
        description: '信息、语言、视野像隔着一堵墙',
        weights: {
          'philo-open-world': 4,
        },
      },
      {
        id: 'book-life-gap',
        label: '怕书读得多，生活却接不上',
        description: '知识有，真实场域里的体感没有',
        weights: {
          'philo-global-embodied': 4,
        },
      },
      {
        id: 'independence-gap',
        label: '怕他遇事不敢自己扛',
        description: '协作、勇气、抗压还没练出来',
        weights: {
          'philo-sail-confidence': 4,
        },
      },
      {
        id: 'path-gap',
        label: '怕升学节点一乱就失控',
        description: '方向、时间线模糊，未知最耗人',
        weights: {
          'philo-study-path': 4,
        },
      },
    ],
  },
  {
    id: 'edu-q2-scene',
    prompt: '如果让孩子多一种经历，你们更想是…',
    options: [
      {
        id: 'cross-cultural',
        label: '在不同文化里对话',
        description: '换语境，重新理解自己和世界',
        weights: {
          'philo-open-world': 2,
          'philo-global-embodied': 3,
        },
      },
      {
        id: 'pbl-real',
        label: '在真问题里动手做',
        description: '项目式学习，让身体记住路线',
        weights: {
          'philo-global-embodied': 4,
        },
      },
      {
        id: 'team-mission',
        label: '在团队任务里长本事',
        description: '分工、信任、一起扛结果',
        weights: {
          'philo-sail-confidence': 4,
        },
      },
      {
        id: 'staged-plan',
        label: '有一条能照着走的计划',
        description: '节点清楚，节奏在自己手里',
        weights: {
          'philo-study-path': 4,
        },
      },
    ],
  },
  {
    id: 'edu-q3-language',
    prompt: '在你们家，语言（尤其是英语）现在是…',
    options: [
      {
        id: 'world-tool',
        label: '推开更大世界的门',
        description: '不只是考试，是连接外面的工具',
        weights: {
          'philo-open-world': 4,
        },
      },
      {
        id: 'secondary',
        label: '不是眼下最急的',
        description: '场域、心性或路径更值得先谈',
        weights: {
          'philo-global-embodied': 1,
          'philo-sail-confidence': 1,
          'philo-study-path': 1,
        },
      },
      {
        id: 'balanced',
        label: '和其他能力一起抓',
        description: '语言、协作、路径都得兼顾',
        weights: {
          'philo-open-world': 1,
          'philo-study-path': 2,
        },
      },
    ],
  },
  {
    id: 'edu-q4-investment',
    prompt: '你们更愿意把力气花在…',
    options: [
      {
        id: 'cognitive-infra',
        label: '眼界、思维、表达',
        description: '认知底子要慢慢垒，急不来',
        weights: {
          'philo-open-world': 4,
        },
      },
      {
        id: 'embodied-exp',
        label: '真实的经历和场域',
        description: '在不同地方轻轻交手，而非隔窗看',
        weights: {
          'philo-global-embodied': 4,
        },
      },
      {
        id: 'character-build',
        label: '心性、协作、抗压',
        description: '在挑战里练出敢扛事的底气',
        weights: {
          'philo-sail-confidence': 4,
        },
      },
      {
        id: 'structured-path',
        label: '可执行的路径拆解',
        description: '方向、节点、家庭节奏对齐',
        weights: {
          'philo-study-path': 4,
        },
      },
    ],
  },
  {
    id: 'edu-q5-first-step',
    prompt: '如果只能先迈一小步，你们希望是…',
    options: [
      {
        id: 'open-vision',
        label: '先帮他打开视野',
        description: '变化来之前，先一步介入世界',
        weights: {
          'philo-open-world': 5,
        },
      },
      {
        id: 'gentle-encounter',
        label: '先和社会轻轻交手',
        description: '用经历记住，而不是纸上谈',
        weights: {
          'philo-global-embodied': 5,
        },
      },
      {
        id: 'storm-collab',
        label: '先在风浪里练协作',
        description: '分工、信任、一起决策',
        weights: {
          'philo-sail-confidence': 5,
        },
      },
      {
        id: 'path-breakdown',
        label: '先把路径拆清楚',
        description: '留学升学变成能管的项目',
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
