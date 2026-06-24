export type DebtTopicArticle = {
  title: string
  outlet: string
  url: string
}

export type DebtTopicCard = {
  id: string
  title: string
  insight: string
  article: DebtTopicArticle
}

export type DebtSurveyOption = {
  id: string
  label: string
}

export type DebtSurveyQuestion = {
  id: string
  prompt: string
  subPrompt?: string
  resultLabel: string
  selectionMode: 'multi' | 'single'
  options: readonly DebtSurveyOption[]
  mockStats: Record<string, number>
}

export const debtSectionMeta = {
  topicsEyebrow: '关键议题 · 化债',
  topicsTitle: '卸下包袱，还是动用杠杆？',
  surveyEyebrow: 'Survey · 小调查',
  surveyTitle: '家庭负债认知小测',
  surveyLead: '没有标准答案——选最接近你们家真实状态的选项，可多选。',
  surveyStageEyebrow: 'Interactive · 一分钟小测',
  surveyStageTitle: '今晚饭桌，先聊哪一笔账？',
  surveyStageLead:
    '四张卡片、随手点选——没有标准答案，只有你们家真实的敞口。完成后带走一句追问，分享给家人。',
  surveyStageHint: '点选翻页 · 约 1 分钟',
  surveyThanks:
    '谢谢你愿意花几分钟，把家庭负债这件事放进对话里。下面是社群演示分布——不代表真实统计，但也许能帮你感受这个话题有多普遍。',
  surveyResultsContinueLabel: '继续',
  surveyCommentaryEyebrow: 'Coffee Chat · 一句点评',
  surveyPosterQuestion: '你们家欠了什么没名字的东西？',
  submitLabel: '提交，看看大家的分布',
  resubmitLabel: '重新填写',
  nextLabel: '下一题',
  completeLabel: '完成',
  prevLabel: '上一题',
} as const

export const debtTopicCards: readonly DebtTopicCard[] = [
  {
    id: 'story-mortgage-cycle',
    title: '房贷与家庭月供共识',
    insight:
      '月供占家庭收入多少才算还得起——不少家庭从未对齐过这个数字，却按月雷打不动还款。',
    article: {
      title: '被「房贷倒挂」笼罩的深圳业主，还不起又不敢断供！',
      outlet: '深圳房地产信息网',
      url: 'http://news.szhome.com/392495.html',
    },
  },
  {
    id: 'story-guarantee-trap',
    title: '帮亲戚担保与家庭关系',
    insight:
      '担保在法律上等于自己的债。债务可以转移，信任与家庭关系却很难补票。',
    article: {
      title: '司法解释可否加一条：企业破产避免夫妻连带责任',
      outlet: '财新网',
      url: 'https://wuxiaobo.blog.caixin.com/archives/283667',
    },
  },
  {
    id: 'story-business-cashflow',
    title: '经营贷与企业主家庭账',
    insight:
      '公司现金流和家庭现金流往往不是同一本账。经营贷续贷失败时，压力常常落在家里。',
    article: {
      title: '10万亿经营贷兜不住了！违规挪用的后果，贷款者一个都跑不掉',
      outlet: '网易财经',
      url: 'https://www.163.com/dy/article/KVS7PJNN0556CE4K.html',
    },
  },
  {
    id: 'story-education-advance',
    title: '教育支出与安全垫透支',
    insight:
      '为子女教育提前动用应急储备，本质是一笔未必被命名、却长期占用现金流的债。',
    article: {
      title: '中产家庭晒账单：教育支出猛降40%，中产终于不再「焦虑跟风」',
      outlet: '网易',
      url: 'https://www.163.com/dy/article/KNEUFOE205564PRP.html',
    },
  },
  {
    id: 'story-restructure',
    title: '资产重组与家庭规则重建',
    insight:
      '化债之后家庭对话有时反而更多——终点不一定是数字归零，而是谁说了算、怎么花的规则重建。',
    article: {
      title: '求是网罕见喊话「修复居民资产负债表」，这次事情可能真有些不一样了！',
      outlet: '网易财经',
      url: 'https://www.163.com/dy/article/L00036GQ05568W0A.html',
    },
  },
  {
    id: 'story-silent-debt',
    title: '家庭不谈债与信息盲区',
    insight:
      '沉默有时是保护，有时把敞口留给最后知道的那个人。债务也是家庭信息同步问题。',
    article: {
      title: '丈夫欠钱妻子还？最高院发话了：这些情况可以不还',
      outlet: '36氪',
      url: 'https://m.36kr.com/p/1722196328449',
    },
  },
]

export const debtSurveyQuestions: readonly DebtSurveyQuestion[] = [
  {
    id: 'q2-dialogue',
    prompt: '上一次家里认真聊「欠了什么、怎么还」，是什么时候？',
    subPrompt: '债务往往藏在沉默里',
    resultLabel: '聊债频率',
    selectionMode: 'single',
    options: [
      { id: 'silent', label: '几乎不谈，能避则避' },
      { id: 'open', label: '会专门聊，或有固定谈法' },
    ],
    mockStats: {
      silent: 72,
      open: 28,
    },
  },
  {
    id: 'q3-mortgage-frame',
    prompt: '一套占家庭收入大头的房贷——在你心里，它算「负债」，还是算「生活本身」？',
    subPrompt: '同样是月供，不同家庭会给不同名字',
    resultLabel: '房贷命名',
    selectionMode: 'single',
    options: [
      { id: 'debt', label: '毫无疑问是负债' },
      { id: 'reframe', label: '更像生活成本，或还没对齐' },
    ],
    mockStats: {
      debt: 36,
      reframe: 64,
    },
  },
  {
    id: 'q4-education-debt',
    prompt: '如果为孩子的教育或未来，提前透支了今天的安全垫——这算不算一种「负债」？',
    subPrompt: '没有对错，只有你们愿不愿意命名它',
    resultLabel: '教育透支',
    selectionMode: 'single',
    options: [
      { id: 'yes', label: '算，值得摊开谈 / 要看安全垫' },
      { id: 'no', label: '不算，或未讨论安全垫' },
    ],
    mockStats: {
      yes: 58,
      no: 42,
    },
  },
  {
    id: 'q1-exposure',
    prompt: '如果今晚家人围桌，你会先摊开哪一类「账」？',
    subPrompt: '可多选——没有标准答案，只有你们家真实的敞口',
    resultLabel: '家庭敞口',
    selectionMode: 'multi',
    options: [
      { id: 'mortgage', label: '房贷月供' },
      { id: 'business', label: '生意或经营周转' },
      { id: 'consumer', label: '信用卡与消费分期' },
      { id: 'guarantee', label: '帮别人做的担保' },
      { id: 'rarely', label: '其实很少谈这些' },
    ],
    mockStats: {
      mortgage: 42,
      business: 28,
      consumer: 15,
      guarantee: 10,
      rarely: 5,
    },
  },
]

export type DebtSurveyAnswers = Record<string, string[]>
