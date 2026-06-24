export const langtontaoToolsMeta = {
  eyebrow: 'Professional Tools',
  title: '专业工具',
  lead: '演示用途的计算与术语拆解，帮助理解复杂概念——不构成法定投资建议。',
  disclaimer:
    '以下工具仅供教育与演示，演示数据不代表真实产品收益。具体产品由持牌合作方在合规框架下交付。',
  tabCalculators: '计算器',
  tabGlossary: '术语拆解',
} as const

export const langtontaoHkSavingsDefaults = {
  annualPremium: 100_000,
  years: 10,
  dividendRateLow: 0.04,
  dividendRateMid: 0.055,
  dividendRateHigh: 0.07,
  currency: 'USD',
} as const

export const langtontaoPolicyFinancingDefaults = {
  cashValue: 500_000,
  loanRatio: 0.8,
  loanRate: 0.045,
  holdYears: 5,
  portfolioReturn: 0.08,
} as const

export type LangtontaoGlossaryTermId =
  | 'hk-dividend-insurance'
  | 'policy-financing'
  | 'irr'
  | 'cash-surrender-value'
  | 'premium-financing'
  | 'dividend-smooth'
  | 'multi-currency-policy'

export type LangtontaoGlossaryTerm = {
  id: LangtontaoGlossaryTermId
  label: string
  category: 'insurance' | 'investment' | 'structure'
  definition: string
  bullets?: string[]
}

export const langtontaoGlossaryTerms: LangtontaoGlossaryTerm[] = [
  {
    id: 'hk-dividend-insurance',
    label: '香港储蓄分红险',
    category: 'insurance',
    definition: '以长期储蓄为目标、分红非保证的寿险保单，常见于跨境资产配置与传承规划。',
    bullets: ['分红含非保证部分', '适合长期持有', '需结合家庭阶段与敞口检视'],
  },
  {
    id: 'policy-financing',
    label: '融资保单',
    category: 'insurance',
    definition: '以保单现金价值为质押获取银行贷款，放大资金效率的策略——伴随利率与流动性风险。',
    bullets: ['需关注贷款利率变动', '现金价值波动影响质押比例', '适合有专业陪跑的家庭'],
  },
  {
    id: 'irr',
    label: 'IRR（内部收益率）',
    category: 'investment',
    definition: '使现金流净现值为零的折现率，用于比较不同期限与缴费结构的长期回报。',
  },
  {
    id: 'cash-surrender-value',
    label: '现金价值',
    category: 'insurance',
    definition: '保单在退保或质押时可获得的金额，随缴费年限与产品设计累积。',
  },
  {
    id: 'premium-financing',
    label: '保费融资',
    category: 'structure',
    definition: '通过银行贷款支付保费，以杠杆方式建立保单——需严格测算净收益与风险敞口。',
  },
  {
    id: 'dividend-smooth',
    label: '分红平滑机制',
    category: 'insurance',
    definition: '保险公司通过储备账户平滑好年与差年的分红派发，但不保证未来分红水平。',
  },
  {
    id: 'multi-currency-policy',
    label: '多币种保单',
    category: 'structure',
    definition: '以美元、港币等计价的长线保单，用于分散单一货币购买力风险。',
  },
]

export const langtontaoGlossaryById = Object.fromEntries(
  langtontaoGlossaryTerms.map((t) => [t.id, t])
) as Record<LangtontaoGlossaryTermId, LangtontaoGlossaryTerm>
