export type AllianceSurveyVariant = 'partner' | 'cofounder' | 'company' | 'friend'

export type AllianceSurveyId = AllianceSurveyVariant

export type AllianceSurveyOption = {
  id: string
  label: string
}

export type AllianceSurveyQuestion = {
  id: string
  prompt: string
  subPrompt?: string
  resultLabel: string
  selectionMode: 'multi' | 'single'
  options: readonly AllianceSurveyOption[]
  mockStats: Record<string, number>
}

export type AllianceSurveyDefinition = {
  id: AllianceSurveyId
  variant: AllianceSurveyVariant
  eyebrow: string
  title: string
  hook: string
  hint: string
  questions: readonly AllianceSurveyQuestion[]
}

export type AllianceSurveyAnswers = Record<string, string[]>

export const allianceSectionMeta = {
  matrixEyebrow: 'Interactive · 关系小测',
  matrixTitle: '四类同盟，四种敞口',
  matrixLead:
    '伴侣、合伙人、公司与挚友——共享利益，也共担风险。四张卡片同时上桌，各测各的关系账本；没有标准答案，只有你们真实的同频程度。',
  matrixHint: '点选翻页 · 每组约 1 分钟',
  resultsEyebrow: '社群演示分布',
  commentaryEyebrow: 'Coffee Chat · 一句追问',
  resultsContinueLabel: '继续',
  resubmitLabel: '重新填写',
  nextLabel: '下一题',
  completeLabel: '完成',
  prevLabel: '上一题',
  copyReflectionLabel: '复制追问',
  copyReflectionSuccess: '已复制到剪贴板',
} as const

export const allianceSurveys: readonly AllianceSurveyDefinition[] = [
  {
    id: 'partner',
    variant: 'partner',
    eyebrow: '同盟 · 伴侣',
    title: '家里的账，是同一张吗？',
    hook: '观念、价值观与信息三同频——从伴侣关系里的财务沉默开始问。',
    hint: '点选即下一题',
    questions: [
      {
        id: 'partner-dialogue',
        prompt: '上次和伴侣认真聊「钱在哪、够撑多久」，是什么时候？',
        subPrompt: '同频往往从敢谈钱开始',
        resultLabel: '财务对话',
        selectionMode: 'single',
        options: [
          { id: 'silent', label: '几乎不谈，能避则避' },
          { id: 'regular', label: '会定期对齐或专门聊' },
        ],
        mockStats: { silent: 61, regular: 39 },
      },
      {
        id: 'partner-decision',
        prompt: '大额支出（房/教育/父母赡养）——谁有最终拍板权？',
        subPrompt: '权力结构藏在日常决策里',
        resultLabel: '拍板权',
        selectionMode: 'single',
        options: [
          { id: 'aligned', label: '基本共识，或分工清楚' },
          { id: 'split', label: '各执己见，常需磨合' },
          { id: 'unspoken', label: '还没认真想过' },
        ],
        mockStats: { aligned: 44, split: 38, unspoken: 18 },
      },
      {
        id: 'partner-cushion',
        prompt: '若一方收入骤降，家里的「安全垫」双方是否对齐？',
        subPrompt: '极端斯坦来临前，信息比乐观更重要',
        resultLabel: '安全垫',
        selectionMode: 'single',
        options: [
          { id: 'clear', label: '清楚且聊过，知道能撑多久' },
          { id: 'vague', label: '模糊，或只有一方心里有数' },
          { id: 'separate', label: '各自记账，未对齐' },
        ],
        mockStats: { clear: 32, vague: 47, separate: 21 },
      },
      {
        id: 'partner-structure',
        prompt: '婚前/婚后财产安排，在你们关系里是？',
        subPrompt: '命名之争往往比数字之争更早',
        resultLabel: '财产安排',
        selectionMode: 'single',
        options: [
          { id: 'open', label: '已摊开谈过，或有书面安排' },
          { id: 'avoid', label: '觉得伤感情，一直回避' },
          { id: 'na', label: '不适用 / 尚未进入这一阶段' },
        ],
        mockStats: { open: 28, avoid: 52, na: 20 },
      },
    ],
  },
  {
    id: 'cofounder',
    variant: 'cofounder',
    eyebrow: '同盟 · 合伙人',
    title: '合伙的账，写得清吗？',
    hook: '权责、分红、退出与信息对称——事业同盟的裂缝常从「没说清」开始。',
    hint: '点选即下一题',
    questions: [
      {
        id: 'cofounder-liability',
        prompt: '公司出问题时，个人要扛多少——你们有过约定吗？',
        subPrompt: '共担风险需要被命名',
        resultLabel: '个人兜底',
        selectionMode: 'single',
        options: [
          { id: 'written', label: '有书面或清晰口头约定' },
          { id: 'vague', label: '模糊，默认「一起扛」' },
          { id: 'none', label: '从没谈过' },
        ],
        mockStats: { written: 26, vague: 48, none: 26 },
      },
      {
        id: 'cofounder-wallets',
        prompt: '分红、再投入、薪酬——三个钱包分得清吗？',
        subPrompt: '混账是合伙关系最常见的摩擦',
        resultLabel: '三钱包',
        selectionMode: 'single',
        options: [
          { id: 'clear', label: '分得清楚，有固定节奏' },
          { id: 'mixed', label: '经常混用，事后才理' },
          { id: 'conflict', label: '这是目前的争议点' },
        ],
        mockStats: { clear: 35, mixed: 45, conflict: 20 },
      },
      {
        id: 'cofounder-exit',
        prompt: '若一方想退出，是否谈过回购或失速条款？',
        subPrompt: '退出规则决定同盟能走多远',
        resultLabel: '退出机制',
        selectionMode: 'single',
        options: [
          { id: 'yes', label: '谈过，有框架或律师看过' },
          { id: 'informal', label: '口头提过，未落地' },
          { id: 'no', label: '觉得还早，从未谈' },
        ],
        mockStats: { yes: 22, informal: 34, no: 44 },
      },
      {
        id: 'cofounder-info',
        prompt: '现金流、负债等关键信息——双方是否同频可见？',
        subPrompt: '信息不同频，任何架构都会在执行层变形',
        resultLabel: '信息同频',
        selectionMode: 'single',
        options: [
          { id: 'shared', label: '定期共享，口径一致' },
          { id: 'partial', label: '一方掌握更多细节' },
          { id: 'opaque', label: '各自掌握，很少对齐' },
        ],
        mockStats: { shared: 38, partial: 41, opaque: 21 },
      },
    ],
  },
  {
    id: 'company',
    variant: 'company',
    eyebrow: '同盟 · 公司',
    title: '公司债，会进家门吗？',
    hook: '家企边界、担保敞口与输血决策——公司往往是家庭资产负债表里的暗线。',
    hint: '点选即下一题',
    questions: [
      {
        id: 'company-books',
        prompt: '公司账与家庭账，在会计与心理上是否两本账？',
        subPrompt: '混账是家办诊断的高频项',
        resultLabel: '家企边界',
        selectionMode: 'single',
        options: [
          { id: 'separate', label: '分明，有防火墙意识' },
          { id: 'blur', label: '经常交叉，边界模糊' },
          { id: 'one', label: '本质上当成一本账' },
        ],
        mockStats: { separate: 31, blur: 49, one: 20 },
      },
      {
        id: 'company-guarantee',
        prompt: '家人是否为公司债务或项目做过担保？',
        subPrompt: '担保责任常在危机时才被「看见」',
        resultLabel: '担保敞口',
        selectionMode: 'single',
        options: [
          { id: 'yes', label: '有，且清楚条款' },
          { id: 'maybe', label: '可能有，细节记不清' },
          { id: 'no', label: '没有 / 明确禁止' },
        ],
        mockStats: { yes: 36, maybe: 28, no: 36 },
      },
      {
        id: 'company-infusion',
        prompt: '公司需要输血时，家庭里谁说了算？',
        subPrompt: '输血决策考验同盟的信任结构',
        resultLabel: '输血决策',
        selectionMode: 'single',
        options: [
          { id: 'joint', label: '夫妻共同或家族合议' },
          { id: 'owner', label: '主要经营者单方面决定' },
          { id: 'avoid', label: '能拖就拖，避免谈' },
        ],
        mockStats: { joint: 40, owner: 38, avoid: 22 },
      },
      {
        id: 'company-succession',
        prompt: '接班或高管变动，是否纳入家庭风险讨论？',
        subPrompt: '人的变动也是资产负债表上的事件',
        resultLabel: '接班风险',
        selectionMode: 'single',
        options: [
          { id: 'yes', label: '会，当作家庭议题' },
          { id: 'sometimes', label: '偶尔提，无固定节奏' },
          { id: 'no', label: '公司的事，很少带回家谈' },
        ],
        mockStats: { yes: 29, sometimes: 43, no: 28 },
      },
    ],
  },
  {
    id: 'friend',
    variant: 'friend',
    eyebrow: '同盟 · 挚友',
    title: '朋友之间，钱怎么算？',
    hook: '人情与规则、担保与跟投——友谊常在金钱面前接受压力测试。',
    hint: '点选即下一题',
    questions: [
      {
        id: 'friend-rules',
        prompt: '朋友借钱或合伙投资时，你会先谈规则还是先谈感情？',
        subPrompt: '规则不是冷漠，是对关系的保护',
        resultLabel: '规则优先',
        selectionMode: 'single',
        options: [
          { id: 'rules', label: '先谈规则，再谈感情' },
          { id: 'feel', label: '先看感情，规则以后再说' },
          { id: 'avoid', label: '尽量回避金钱往来' },
        ],
        mockStats: { rules: 34, feel: 46, avoid: 20 },
      },
      {
        id: 'friend-guarantee',
        prompt: '是否帮朋友做过担保或联名签署？',
        subPrompt: '友谊担保是关系网络里的隐形债',
        resultLabel: '友谊担保',
        selectionMode: 'single',
        options: [
          { id: 'yes', label: '有过，当时觉得没问题' },
          { id: 'refused', label: '拒绝过，或设过底线' },
          { id: 'no', label: '从未 / 明确不碰' },
        ],
        mockStats: { yes: 27, refused: 38, no: 35 },
      },
      {
        id: 'friend-tips',
        prompt: '朋友的「内幕消息」或理财推荐，你通常？',
        subPrompt: '同频不等于跟投',
        resultLabel: '跟投冲动',
        selectionMode: 'single',
        options: [
          { id: 'verify', label: '会独立验证，不盲目跟' },
          { id: 'follow', label: '信朋友，常先跟一点' },
          { id: 'fomo', label: '怕错过，即使不太懂也会上' },
        ],
        mockStats: { verify: 42, follow: 41, fomo: 17 },
      },
      {
        id: 'friend-conflict',
        prompt: '当友谊与金钱发生冲突，你经历过吗？',
        subPrompt: '没有标准答案，只有你的真实敞口',
        resultLabel: '冲突经历',
        selectionMode: 'single',
        options: [
          { id: 'healed', label: '有过，后来修复了' },
          { id: 'strained', label: '有过，关系变疏或尴尬' },
          { id: 'none', label: '几乎没有 / 守住了边界' },
        ],
        mockStats: { healed: 24, strained: 48, none: 28 },
      },
    ],
  },
]

export function getAllianceSurveyById(id: AllianceSurveyId) {
  return allianceSurveys.find((survey) => survey.id === id)
}

export const allianceMatrixOffsets: Record<
  AllianceSurveyId,
  { translateY: number; rotate: number }
> = {
  partner: { translateY: 0, rotate: -1.5 },
  cofounder: { translateY: 12, rotate: 1 },
  company: { translateY: 8, rotate: 0.5 },
  friend: { translateY: 0, rotate: -0.8 },
}
