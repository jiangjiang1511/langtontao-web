export type RetirementSoulAngle = 'common' | 'langton'

export type RetirementSoulQuestion = {
  id: string
  prompt: string
  angle: RetirementSoulAngle
  sting: string
  source: string
}

export type RetirementSoulSurveyOption = {
  id: string
  label: string
}

export type RetirementSoulSurveyQuestion = {
  id: string
  prompt: string
  subPrompt?: string
  angle: RetirementSoulAngle
  sting: string
  selectionMode: 'single'
  options: readonly RetirementSoulSurveyOption[]
  anxiousOptionIds: readonly string[]
}

export type RetirementSoulSurveyAnswers = Record<string, string[]>

export type RetirementBubble = {
  id: string
  label: string
  summary: string
  body: string
  x: number
  y: number
  weight: 1 | 2 | 3 | 4 | 5
}

export type CityTier = 'tier1' | 'tier2' | 'tier3' | 'tier4'

export type HomeCareLevel = 'selfCare' | 'partial' | 'disabled'
export type HomeCaregiver = 'family' | 'hourly' | 'liveIn' | 'mixed'
export type HomeRetrofit = 'none' | 'basic' | 'heavy'
export type HomeMeal = 'family' | 'delivery' | 'nutrition'
export type ChronicDisease = 'no' | 'yes'
export type LtcInsurance = 'none' | 'partial' | 'high'

export type HomeCareInput = {
  cityTier: CityTier
  careLevel: HomeCareLevel
  chronicDisease: ChronicDisease
  caregiver: HomeCaregiver
  retrofit: HomeRetrofit
  meal: HomeMeal
  ltcInsurance: LtcInsurance
  planningYears: number
}

export type InstitutionalType = 'public' | 'standard' | 'premium' | 'medical'
export type InstitutionalCareLevel =
  | 'selfCare'
  | 'mild'
  | 'partial'
  | 'disabled'
  | 'cognitive'
export type InstitutionalRoom = 'shared' | 'double' | 'single' | 'suite'
export type MedicalAddon = 'none' | 'basic' | 'full'

export type InstitutionalCareInput = {
  cityTier: CityTier
  institutionType: InstitutionalType
  careLevel: InstitutionalCareLevel
  roomType: InstitutionalRoom
  chronicDisease: ChronicDisease
  medicalAddon: MedicalAddon
  ltcInsurance: LtcInsurance
  planningYears: number
}

export type RetirementCostBranch = {
  id: string
  label: string
  amount: number
}

export type RetirementCostResult = {
  monthlyTotal: number
  planningYears: number
  lifetimeExposure: number
  branches: RetirementCostBranch[]
  notes: string[]
}

export const retirementSectionMeta = {
  soulEyebrow: 'Survey · 灵魂问诊',
  soulTitle: '关于养老，你问过自己吗？',
  soulLead:
    '六张问诊卡、随手点选——没有标准答案，只有你们家对长寿与购买力的真实敞口。完成后带走几处「为什么这会疼」。',
  soulHint: '点选翻页 · 约 2 分钟',
  soulResultsEyebrow: '你的问诊小结',
  soulResultsTitle: '这几处，最疼',
  soulResultsLead:
    '根据你的点选，从朗敦道思维导图里摘出最该正视的追问——不代表诊断，只是一面镜子。',
  soulResultsContinueLabel: '带走一句追问',
  soulCommentaryEyebrow: 'Coffee Chat · 朗敦追问',
  soulResubmitLabel: '重新问诊',
  soulCopyReflectionLabel: '复制追问',
  soulCopyReflectionSuccess: '已复制到剪贴板',
  soulNextLabel: '下一题',
  soulCompleteLabel: '完成',
  soulPrevLabel: '上一题',
  soulTapHint: '进入下一页',
  calcEyebrow: 'Interactive · 费用估算',
  calcTitle: '你的养老，每月要烧多少钱？',
  calcLead:
    '居家与机构，两条完全不同的现金流路径。根据城市、护理等级与照护方式，拼出属于你的鱼骨费用结构——再拉长到十年、二十年，看总敞口。',
  calcHint: '教育用途估算，非投资建议或机构报价',
  calcDisclaimer:
    '本计算器基于发改委 36 城监测数据与公开行业区间建立假设模型，因城市、机构、政策与个人健康状况差异，实际费用可能显著不同。不构成投资建议、保险建议或任何机构的正式报价。',
  bubblesEyebrow: '关键议题 · 泡泡星座',
  bubblesTitle: '养老路上，还有哪些坑？',
  bubblesLead:
    '从朗敦道思维导图提炼——长寿、购买力、照护、结构、代际，一张网里的关键节点。',
  bubblesHint: '点选泡泡，展开议题',
  planningYearsLabel: '规划年限',
  monthlyLabel: '预估月费',
  lifetimeLabel: '规划期总敞口',
  homeTab: '居家养老',
  institutionalTab: '机构养老',
} as const

export const retirementPlanningYearOptions = [10, 15, 20, 25, 30] as const

export const cityTierOptions: readonly { id: CityTier; label: string }[] = [
  { id: 'tier1', label: '一线城市' },
  { id: 'tier2', label: '二线城市' },
  { id: 'tier3', label: '三四线城市' },
  { id: 'tier4', label: '县域/乡镇' },
]

export const homeCareLevelOptions: readonly {
  id: HomeCareLevel
  label: string
}[] = [
  { id: 'selfCare', label: '生活自理' },
  { id: 'partial', label: '半失能（需部分协助）' },
  { id: 'disabled', label: '全失能（24 小时照护）' },
]

export const homeCaregiverOptions: readonly {
  id: HomeCaregiver
  label: string
}[] = [
  { id: 'family', label: '子女/家人为主' },
  { id: 'hourly', label: '钟点工上门' },
  { id: 'liveIn', label: '住家保姆' },
  { id: 'mixed', label: '家人 + 专业照护混合' },
]

export const homeRetrofitOptions: readonly { id: HomeRetrofit; label: string }[] =
  [
    { id: 'none', label: '无需改造' },
    { id: 'basic', label: '基础适老化（防滑、扶手等）' },
    { id: 'heavy', label: '重度改造（电梯、卫浴整体）' },
  ]

export const homeMealOptions: readonly { id: HomeMeal; label: string }[] = [
  { id: 'family', label: '家人做饭' },
  { id: 'delivery', label: '送餐上门' },
  { id: 'nutrition', label: '营养餐/配餐服务' },
]

export const chronicDiseaseOptions: readonly {
  id: ChronicDisease
  label: string
}[] = [
  { id: 'no', label: '无慢性病' },
  { id: 'yes', label: '有慢性病（需长期用药/复诊）' },
]

export const ltcInsuranceOptions: readonly { id: LtcInsurance; label: string }[] =
  [
    { id: 'none', label: '未享受长护险' },
    { id: 'partial', label: '长护险部分报销' },
    { id: 'high', label: '长护险较高报销' },
  ]

export const institutionalTypeOptions: readonly {
  id: InstitutionalType
  label: string
}[] = [
  { id: 'public', label: '普惠公办' },
  { id: 'standard', label: '民营标准' },
  { id: 'premium', label: '高端医养' },
  { id: 'medical', label: '医养结合（内设医疗）' },
]

export const institutionalCareLevelOptions: readonly {
  id: InstitutionalCareLevel
  label: string
}[] = [
  { id: 'selfCare', label: '自理型' },
  { id: 'mild', label: '轻度失能' },
  { id: 'partial', label: '半失能' },
  { id: 'disabled', label: '全失能' },
  { id: 'cognitive', label: '认知症专项' },
]

export const institutionalRoomOptions: readonly {
  id: InstitutionalRoom
  label: string
}[] = [
  { id: 'shared', label: '多人间' },
  { id: 'double', label: '双人间' },
  { id: 'single', label: '单人间' },
  { id: 'suite', label: '套房' },
]

export const medicalAddonOptions: readonly { id: MedicalAddon; label: string }[] =
  [
    { id: 'none', label: '无额外医疗' },
    { id: 'basic', label: '基础医护监测' },
    { id: 'full', label: '内设医疗机构' },
  ]

export const defaultHomeCareInput: HomeCareInput = {
  cityTier: 'tier1',
  careLevel: 'partial',
  chronicDisease: 'yes',
  caregiver: 'mixed',
  retrofit: 'basic',
  meal: 'delivery',
  ltcInsurance: 'partial',
  planningYears: 20,
}

export const defaultInstitutionalCareInput: InstitutionalCareInput = {
  cityTier: 'tier1',
  institutionType: 'standard',
  careLevel: 'partial',
  roomType: 'double',
  chronicDisease: 'yes',
  medicalAddon: 'basic',
  ltcInsurance: 'partial',
  planningYears: 20,
}

export const retirementSoulSurveyQuestions: readonly RetirementSoulSurveyQuestion[] =
  [
    {
      id: 'enough-money',
      prompt: '你算过：若活到 90 岁，现在的存款够撑多少年？',
      subPrompt: '账户余额，不等于购买力',
      angle: 'common',
      sting:
        '许多家庭用「账户余额」衡量安全感，却忽略了医疗、照护与生活成本在购买力通道里系统性抬升——钱还在，能换来的服务却越来越少。',
      selectionMode: 'single',
      options: [
        { id: 'never', label: '从没认真算过' },
        { id: 'vague', label: '模糊觉得够或不够' },
        { id: 'detailed', label: '有详细测算或规划' },
      ],
      anxiousOptionIds: ['never', 'vague'],
    },
    {
      id: 'who-cares',
      prompt: '父母失能那天，谁来 24 小时照顾？你本人能请几天假？',
      subPrompt: '照护不是抽象概念',
      angle: 'common',
      sting:
        '照护是子女的时间、事业与家庭结构的硬约束。把照护默认成「以后再说」，往往等于把风险转嫁给下一代。',
      selectionMode: 'single',
      options: [
        { id: 'assume-family', label: '默认家人扛，没具体分工' },
        { id: 'unspoken', label: '从未认真讨论过' },
        { id: 'planned', label: '有分工、预案或专业支持' },
      ],
      anxiousOptionIds: ['assume-family', 'unspoken'],
    },
    {
      id: 'couple-sync',
      prompt: '你和伴侣认真聊过「谁先需要被照顾、钱从哪出」吗？',
      subPrompt: '理财也是关系题',
      angle: 'common',
      sting:
        '理财从来不只是数学问题，更是在预算范围内的情感问题——金钱链向安全、尊严、关系与责任。不同频的伴侣，会在危机时各自为政。',
      selectionMode: 'single',
      options: [
        { id: 'avoid', label: '能避则避，很少聊' },
        { id: 'once', label: '聊过，但没有结论' },
        { id: 'aligned', label: '会定期对齐或专门聊' },
      ],
      anxiousOptionIds: ['avoid', 'once'],
    },
    {
      id: 'purchasing-power',
      prompt: '二十年后，同样的 100 万，还能换来同样的照护与尊严吗？',
      subPrompt: '朗敦道 · 购买力通道',
      angle: 'langton',
      sting:
        '朗敦道所说的购买力通道：养老、医疗、教育与生活成本系统性抬升。比「有没有钱」更紧要的，是钱有没有对抗通胀与周期的结构。',
      selectionMode: 'single',
      options: [
        { id: 'same', label: '觉得差不多，没想太多' },
        { id: 'worry', label: '隐隐担心，但没行动' },
        { id: 'structured', label: '已在搭对抗通胀的结构' },
      ],
      anxiousOptionIds: ['same', 'worry'],
    },
    {
      id: 'money-structure',
      prompt: '你的养老钱，是「账户余额」还是「现金流结构」？',
      subPrompt: '钱还在，日子难——往往因结构缺席',
      angle: 'langton',
      sting:
        '无结构的钱被通胀稀释，无结构的家庭财富被健康、关系与继承风险一点点吃掉。「钱还在、日子难」，往往是结构缺席的信号。',
      selectionMode: 'single',
      options: [
        { id: 'balance', label: '主要是存款/房产数字' },
        { id: 'mixed', label: '有一些安排，但不系统' },
        { id: 'cashflow', label: '按现金流与阶段在搭' },
      ],
      anxiousOptionIds: ['balance', 'mixed'],
    },
    {
      id: 'three-inflection',
      prompt: '若宏观周期、家族生命周期与监管规则三拐点同时到来，你的养老安排扛得住吗？',
      subPrompt: '朗敦道 · 三拐点叠加',
      angle: 'langton',
      sting:
        '三拐点叠加——含长辈照护——时，单点产品架构往往集体失效。养老不能等到拐点叠加才第一次「看见」敞口。',
      selectionMode: 'single',
      options: [
        { id: 'never', label: '没想过会叠加' },
        { id: 'aware', label: '知道风险，但没布局' },
        { id: 'planning', label: '已在年检架构或预案' },
      ],
      anxiousOptionIds: ['never', 'aware'],
    },
  ]

export const retirementSoulQuestions: readonly RetirementSoulQuestion[] = [
  {
    id: 'enough-money',
    prompt: '你算过：若活到 90 岁，现在的存款够撑多少年？',
    angle: 'common',
    sting:
      '许多家庭用「账户余额」衡量安全感，却忽略了医疗、照护与生活成本在购买力通道里系统性抬升——钱还在，能换来的服务却越来越少。',
    source: 'faq-mindmaps',
  },
  {
    id: 'who-cares',
    prompt: '父母失能那天，谁来 24 小时照顾？你本人能请几天假？',
    angle: 'common',
    sting:
      '照护不是抽象概念，是子女的时间、事业与家庭结构的硬约束。把照护默认成「以后再说」，往往等于把风险转嫁给下一代。',
    source: 'education-page',
  },
  {
    id: 'social-security',
    prompt: '社保养老金 + 企业年金，够覆盖你期待的老年生活品质吗？',
    angle: 'common',
    sting:
      '第一支柱保基本，第二支柱看企业——但真正决定老年尊严的，往往是个人第三支柱有没有提前、诚实地布局。',
    source: 'common',
  },
  {
    id: 'house-retirement',
    prompt: '「有房就敢老」——你的房子，能变成现金流吗？',
    angle: 'common',
    sting:
      '约 70% 家庭资产锚定房产，但房产不等于流动性。卖房养老、以房养老、留给子女，每一条路径都有摩擦成本与家庭博弈。',
    source: 'faq-mindmaps',
  },
  {
    id: 'children-cost',
    prompt: '让子女辞职照顾父母，这个「免费」选项的真实成本是多少？',
    angle: 'common',
    sting:
      '机会成本、夫妻关系、职业中断与心理耗竭，很少被计入养老账本——却可能是家庭里最贵的一笔支出。',
    source: 'common',
  },
  {
    id: 'medical-inflation',
    prompt: '慢性病一旦缠身，每月药费与复诊，你有单独留过预算吗？',
    angle: 'common',
    sting:
      '医疗通胀长期高于 CPI。一次住院可以吃掉多年储蓄，而慢性病是按月、按年持续渗漏的「隐形漏斗」。',
    source: 'common',
  },
  {
    id: 'couple-sync',
    prompt: '你和伴侣认真聊过「谁先需要被照顾、钱从哪出」吗？',
    angle: 'common',
    sting:
      '理财从来不只是数学问题，更是在预算范围内的情感问题——金钱链向安全、尊严、关系与责任。不同频的伴侣，会在危机时各自为政。',
    source: 'faq-mindmaps',
  },
  {
    id: 'ltc-gap',
    prompt: '你知道所在城市的长护险，能报多少、报多久吗？',
    angle: 'common',
    sting:
      '长护险试点扩面中，但覆盖范围、评估标准与报销比例因地而异。把政策当确定答案，可能高估保障、低估自付。',
    source: 'common',
  },
  {
    id: 'purchasing-power',
    prompt: '二十年后，同样的 100 万，还能换来同样的照护与尊严吗？',
    angle: 'langton',
    sting:
      '朗敦道所说的购买力通道：养老、医疗、教育与生活成本系统性抬升。比「有没有钱」更紧要的，是钱有没有对抗通胀与周期的结构。',
    source: 'faq-mindmaps',
  },
  {
    id: 'money-structure',
    prompt: '你的养老钱，是「账户余额」还是「现金流结构」？',
    angle: 'langton',
    sting:
      '无结构的钱被通胀稀释，无结构的家庭财富被健康、关系与继承风险一点点吃掉。「钱还在、日子难」，往往是结构缺席的信号。',
    source: 'faq-mindmaps',
  },
  {
    id: 'three-inflection',
    prompt: '若宏观周期、家族生命周期与监管规则三拐点同时到来，你的养老安排扛得住吗？',
    angle: 'langton',
    sting:
      '三拐点叠加——含长辈照护——时，单点产品架构往往集体失效。养老不能等到拐点叠加才第一次「看见」敞口。',
    source: 'faq-page',
  },
  {
    id: 'ballast-liquidity',
    prompt: '压舱石配好了，但紧急用钱时，能变现吗？要亏多少？',
    angle: 'langton',
    sting:
      'TAO 路径第十年强调压舱石——保险、房产、身份。但若流动性与变现成本未纳入规划，「安全资产」可能在最需要时最难动用。',
    source: 'fifty-year-narrative',
  },
  {
    id: 'hundred-year-life',
    prompt: '若父母或自己活到 100 岁，现金流能自动续上三十年吗？',
    angle: 'langton',
    sting:
      '百岁人生不是科幻，是精算现实。确定性养老现金流引擎，要的是跨周期的复利与领取纪律，而非一次性存款的幻觉。',
    source: 'coffee-preservation-insurers',
  },
  {
    id: 'tacit-knowledge',
    prompt: '父母的照护偏好、医疗意愿，你们认真写过、聊过吗？',
    angle: 'langton',
    sting:
      '默会知识断档：纸面安排解决不了「他们想怎么老、怕什么、信什么」。未讨论的期待，会在危机时以争吵或暗中掏空出现。',
    source: 'faq-mindmaps',
  },
  {
    id: 'tao-stage',
    prompt: '你处于 TAO 路径哪一阶段——该守本金、配压舱石，还是布局传承？',
    angle: 'langton',
    sting:
      '认知定投是把判断从「预测风口」转向「持续修正阶段」。养老布局与家族阶段错配，会在错误的时间做错误的流动性牺牲。',
    source: 'faq-mindmaps',
  },
  {
    id: 'good-ancestor',
    prompt: '你想成为怎样的「好祖先」——留钱，还是留选择与尊严？',
    angle: 'langton',
    sting:
      '朗敦道的终极目标不是留下数字最多的账户，而是让子孙继承识别紧要之事的智慧。养老规划，是成为好祖先的第一场实操考试。',
    source: 'faq-mindmaps',
  },
]

export const retirementBubbleSizeByWeight: Record<RetirementBubble['weight'], number> =
  {
    1: 44,
    2: 52,
    3: 60,
    4: 72,
    5: 84,
  }

export const retirementBubbles: readonly RetirementBubble[] = [
  {
    id: 'longevity-risk',
    label: '长寿风险',
    summary: '活得太久，比活得太短更需要被认真规划。',
    body: '长寿是祝福，也是财务挑战。每多活五年，就多五年照护、医疗与生活支出。\n\n许多家庭按「平均寿命」做规划，却忽略了方差——夫妻一方长寿、一方早逝，会彻底改写现金流与照护分工。',
    x: 50,
    y: 18,
    weight: 5,
  },
  {
    id: 'purchasing-power',
    label: '购买力侵蚀',
    summary: '钱还在，能换来的服务却越来越少。',
    body: '朗敦道购买力通道指出：养老、医疗、教育与生活成本在大周期里系统性抬升。\n\n账户数字不变，不代表购买力不变。养老规划必须回答：现金流能否跟上成本曲线？',
    x: 22,
    y: 32,
    weight: 5,
  },
  {
    id: 'ltc-gap',
    label: '长护险缺口',
    summary: '政策在扩面，但自付部分仍可能是「无底洞」。',
    body: '长期护理保险是重要补丁，但试点城市、评估等级、报销上限差异很大。\n\n不能把长护险当作全额覆盖。家庭仍需为缺口年份、缺口服务类型单独预留。',
    x: 78,
    y: 30,
    weight: 3,
  },
  {
    id: 'three-pillars',
    label: '养老三支柱',
    summary: '社保 + 企业年金 + 个人储备，缺一不可。',
    body: '第一支柱保基本，第二支柱看雇主，第三支柱决定品质与选择权。\n\n只依赖社保，往往只能维持生存线；真正的老年尊严，来自提前、诚实的个人现金流架构。',
    x: 14,
    y: 58,
    weight: 4,
  },
  {
    id: 'children-care',
    label: '子女照护',
    summary: '「免费照护」是最容易被低估的成本。',
    body: '子女照顾父母，表面零现金支出，实则消耗职业、婚姻、身心健康与代际关系。\n\n可持续的养老方案，要把照护来源当作可选项而非默认项来设计。',
    x: 38,
    y: 52,
    weight: 4,
  },
  {
    id: 'house-myth',
    label: '房产养老误区',
    summary: '有房不等于有养老现金流。',
    body: '房产是存量，养老要的是流量。出售时机、税费、家庭共识与估值波动，都会让「以房养老」远比想象复杂。\n\n朗敦道提醒：约 70% 家庭资产锚定房产，流动性风险是养老大考。',
    x: 62,
    y: 55,
    weight: 3,
  },
  {
    id: 'medical-inflation',
    label: '医疗通胀',
    summary: '慢性病是按月渗漏的隐形漏斗。',
    body: '住院是一次性冲击，慢性病是长期渗漏。药费、复诊、康复、耗材与护工，会随年龄叠加。\n\n医疗预算应独立于「生活费」，否则极易低估真实敞口。',
    x: 86,
    y: 62,
    weight: 3,
  },
  {
    id: 'three-inflection',
    label: '三拐点叠加',
    summary: '周期、家族生命周期、监管——同时来时最凶险。',
    body: '宏观周期拐点、家族生命周期拐点（含长辈照护）、监管与跨境规则拐点，三者叠加时单点产品往往集体失效。\n\n养老安排需要年检，而非一次性签约。',
    x: 28,
    y: 78,
    weight: 4,
  },
  {
    id: 'ballast',
    label: '压舱石流动性',
    summary: '安全资产，未必在需要时最好用。',
    body: 'TAO 第十年强调保险、房产、身份等压舱石。但若变现路径、保单贷款成本与税务摩擦未纳入，「压舱石」可能在危机时变成「压舱石挪不动」。\n\n流动性与收益性、安全性，需要三角平衡。',
    x: 52,
    y: 72,
    weight: 4,
  },
  {
    id: 'tao-fifty',
    label: 'TAO 第五十年',
    summary: '黄金锚点与跨周期养老现金流。',
    body: '朗敦道 TAO 路径：第十年压舱石，第五十年黄金，第一百年传承。\n\n养老不是退休那一刻才启动，而是跨越数十年的阶段序贯——何时守本金、何时配确定性现金流，有节奏可言。',
    x: 72,
    y: 82,
    weight: 3,
  },
  {
    id: 'cognitive',
    label: '认知症专项',
    summary: '最难照护的，往往是最难提前讨论的。',
    body: '认知症照护周期长、行为管理难、机构溢价高，且家庭心理负担极重。\n\n越早讨论意愿、监护与资金隔离，越能避免危机时的仓促与内耗。',
    x: 48,
    y: 42,
    weight: 3,
  },
  {
    id: 'intergenerational',
    label: '代际时间杠杆',
    summary: '提前十年布局，比危机时救火便宜一个数量级。',
    body: '复利不只发生在账户里，也发生在时间上。早做架构、早建同频、早立规则，能显著降低代际冲突与被动卖资产的概率。\n\n养老是家族资产负债表上的代际承诺，不是个人退休后的私事。',
    x: 8,
    y: 42,
    weight: 2,
  },
]
