export type LegacyTopicArticle = {
  title: string
  outlet: string
  url: string
}

export type LegacyTopicCard = {
  id: string
  title: string
  insight: string
  article: LegacyTopicArticle
}

export type LegacySurveyOption = {
  id: string
  label: string
}

export type LegacySurveyQuestion = {
  id: string
  prompt: string
  subPrompt?: string
  resultLabel: string
  selectionMode: 'single'
  options: readonly LegacySurveyOption[]
  mockStats: Record<string, number>
}

export const legacySectionMeta = {
  topicsEyebrow: '关键议题 · 传承',
  topicsTitle: '纸面安排之外，还欠哪一场对话？',
  surveyStageEyebrow: 'Survey · 传承问诊',
  surveyStageTitle: '你们家，传承的卡点在哪里？',
  surveyStageLead:
    '四张卡片、随手点选——没有标准答案，只有你们家真实的敞口。完成后带走一条理念路径。',
  surveyStageHint: '点选翻页 · 约 1 分钟',
  surveyResultsContinueLabel: '继续',
  surveyCommentaryEyebrow: 'Coffee Chat · 你的路径',
  nextLabel: '下一题',
  completeLabel: '完成',
  prevLabel: '上一题',
  resubmitLabel: '重新问诊',
  comingSoonTitle: '敬请期待',
  comingSoonBody:
    '相关内容正在筹备中，欢迎先通过 Coffee Chat 与我们聊聊你们家的传承节奏。',
} as const

export const legacyTopicCards: readonly LegacyTopicCard[] = [
  {
    id: 'story-li-trust-third-son',
    title: '李嘉诚的「第三个儿子」',
    insight:
      '家族信托被李嘉诚称为心中的「第三个儿子」——继任与分产分开，让商业帝国运转，也让两个儿子「可以有兄弟做」。',
    article: {
      title: '家族信托教科书级案例：揭秘李嘉诚家族信托',
      outlet: '界面新闻',
      url: 'https://www.jiemian.com/article/2464850.html',
    },
  },
  {
    id: 'story-four-families-succession',
    title: '四大家族接班：兄弟做还是兄弟争',
    insight:
      '万亿财富平稳传承是技术活：用信托把鸡蛋放进不同篮子，既布好接班局，也用分红安抚次子，避免诉讼分家。',
    article: {
      title: '香港四大家族接班启示录：万亿财富平稳传承',
      outlet: '界面新闻',
      url: 'https://www.jiemian.com/article/3134774.html',
    },
  },
  {
    id: 'story-kwok-beneficiary-exclusion',
    title: '信托受益人名单：最狠的家族规则',
    insight:
      '新鸿基郭炳湘曾被剔除出家族信托受益人名单——受益人不是写一次就完，而是家族权力与信息同频的晴雨表。',
    article: {
      title: '揭秘：香港「四大家族」如何做财富传承？',
      outlet: 'CFWIA',
      url: 'https://www.cfwia2020.org/post/%E6%8F%AD%E7%A7%98%EF%BC%9A%E9%A6%99%E6%B8%AF%E3%80%8C%E5%9B%9B%E5%A4%A7%E5%AE%B6%E6%97%8F%E3%80%8D%E5%A6%82%E4%BD%95%E5%81%9A%E8%B2%A1%E5%AF%8C%E5%82%B3%E6%89%BF%EF%BC%9F',
    },
  },
  {
    id: 'story-beneficiary-mismatch',
    title: '保单写满，股权传承却对不上',
    insight:
      '人身险受益人写得满满当当，信托与股权接班却是另一套图纸——理赔金可能绕开你精心设计的架构。',
    article: {
      title: '人身险受益写得很满，股权传承却完全对不上',
      outlet: '朗敦道案例库',
      url: 'https://www.caitc.cn/website/info/12967',
    },
  },
  {
    id: 'story-three-generations',
    title: '富不过三代：体力衰退还是系统缺席',
    insight:
      '三代人里，第一代靠体力，第二代靠系统——若家族没有可迭代的治理与对话机制，财富常在第三代前耗尽。',
    article: {
      title: '李嘉诚与洛克菲勒：家族信托如何打破富不过三代',
      outlet: '人民文摘',
      url: 'https://paper.people.com.cn/rmwz/html/2013-07/01/content_1264523.htm',
    },
  },
  {
    id: 'story-withdrawer-vs-citizen',
    title: '「提款人」还是「合格家族公民」',
    insight:
      '心理所有权、金融所有权与家族共同利益往往错位——下一代继承的是账户，还是方法与责任感？',
    article: {
      title: '李泽楷，华人家族第二代的完美典范',
      outlet: '朗敦道保全',
      url: 'https://www.jiemian.com/article/2464850.html',
    },
  },
]

export const legacySurveyQuestions: readonly LegacySurveyQuestion[] = [
  {
    id: 'q1-priority',
    prompt: '若只能先解决一件事，你们家传承里最紧的是什么？',
    subPrompt: '没有标准答案，只有你们此刻真实的敞口',
    resultLabel: '传承优先级',
    selectionMode: 'single',
    options: [
      { id: 'estate', label: '钱怎么传下去、传给谁' },
      { id: 'family', label: '家里人怎么分、会不会吵' },
      { id: 'containment', label: '万一出事，资产会不会被一锅端' },
      { id: 'alignment', label: '孩子愿不愿意接、理念合不合' },
    ],
    mockStats: {
      estate: 28,
      family: 24,
      containment: 22,
      alignment: 26,
    },
  },
  {
    id: 'q2-alignment',
    prompt: '保单、信托、股权安排——全家人是否「同一张图」？',
    subPrompt: '信息不同频，往往在继承层爆发',
    resultLabel: '架构同频',
    selectionMode: 'single',
    options: [
      { id: 'aligned', label: '基本对齐，定期复盘' },
      { id: 'partial', label: '少数人知道，未全家同步' },
      { id: 'fragmented', label: '各管各的，从未对齐' },
      { id: 'unsure', label: '还没认真谈过' },
    ],
    mockStats: {
      aligned: 18,
      partial: 32,
      fragmented: 28,
      unsure: 22,
    },
  },
  {
    id: 'q3-risk',
    prompt: '若主理人 90 天无法履职，理赔金/控制权会走哪条路？',
    subPrompt: '纸面安排与真实路径可能不是同一条',
    resultLabel: '极端情形',
    selectionMode: 'single',
    options: [
      { id: 'planned', label: '有书面安排，路径清晰' },
      { id: 'insurance', label: '主要靠保单/信托，但未演练' },
      { id: 'personal', label: '大概率进个人账户或纠纷' },
      { id: 'unknown', label: '从未想过这个问题' },
    ],
    mockStats: {
      planned: 15,
      insurance: 35,
      personal: 28,
      unknown: 22,
    },
  },
  {
    id: 'q4-next-gen',
    prompt: '下一代对家业的态度，更接近哪一种？',
    subPrompt: '接班意愿与价值观，决定传承工具能否落地',
    resultLabel: '下一代态度',
    selectionMode: 'single',
    options: [
      { id: 'ready', label: '有意愿，也在学习接班' },
      { id: 'other-path', label: '更想走自己的路' },
      { id: 'passive', label: '被动等待安排' },
      { id: 'unclear', label: '还没认真对话过' },
    ],
    mockStats: {
      ready: 22,
      'other-path': 30,
      passive: 26,
      unclear: 22,
    },
  },
]

export type LegacySurveyAnswers = Record<string, string[]>
