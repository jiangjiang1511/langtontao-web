export type CompoundGrowthMarket = 'US' | 'HK' | 'CN'

export type CompoundGrowthStockMeta = {
  slug: string
  ticker: string
  name: string
  nameEn: string
  market: CompoundGrowthMarket
  tagline: string
  accent: string
}

export const compoundGrowthSectionMeta = {
  eyebrow: 'Asset Comparison · 复利对比',
  title: '种一棵树，最好的时间是十年前，其次就是现在。',
  lead: '十年前，你有没有开始为家庭规划资产配置？如果有，当年主要是哪些品种？如果还没有，现在动手也不晚。下面用 2016–2026 的真实走势，回看比特币、黄金、美股与 A 股大盘指数、美国国债，以及银行存款——若当年买入并持有，十年后会走出怎样的复利曲线？',
  disclaimer:
    '收益数据基于公开行情或基准利率估算，反映「买入并持有」的累计回报，仅供教育与交流，不构成投资建议。历史表现不代表未来结果。',
} as const

export const compoundGrowthStockCatalog: CompoundGrowthStockMeta[] = [
  {
    slug: 'bitcoin',
    ticker: 'BTC',
    name: '比特币',
    nameEn: 'Bitcoin',
    market: 'US',
    tagline: '2016 年直接买入比特币',
    accent: '#ec4899',
  },
  {
    slug: 'gold',
    ticker: 'GLD',
    name: '黄金',
    nameEn: 'Gold',
    market: 'US',
    tagline: '买入 SPDR 黄金 ETF',
    accent: '#eab308',
  },
  {
    slug: 'nasdaq',
    ticker: 'QQQ',
    name: '纳斯达克100',
    nameEn: 'Nasdaq-100',
    market: 'US',
    tagline: '买入纳斯达克100指数基金',
    accent: '#60a5fa',
  },
  {
    slug: 'sp500',
    ticker: 'SPY',
    name: '标普500',
    nameEn: 'S&P 500',
    market: 'US',
    tagline: '买入标普500指数基金',
    accent: '#22c55e',
  },
  {
    slug: 'csi300',
    ticker: '510300',
    name: 'A股大盘',
    nameEn: 'CSI 300 ETF',
    market: 'CN',
    tagline: '买入沪深300指数基金',
    accent: '#ef4444',
  },
  {
    slug: 'us-treasury',
    ticker: '10Y',
    name: '美国国债',
    nameEn: 'US Treasury 10Y',
    market: 'US',
    tagline: '2016 年买入 10 年期美债并持有到期',
    accent: '#a78bfa',
  },
  {
    slug: 'bank-deposit',
    ticker: '定存',
    name: '银行存款',
    nameEn: 'Bank Deposit',
    market: 'CN',
    tagline: '按一年期定存利率存入银行',
    accent: '#a1a1aa',
  },
]

export function getCompoundGrowthStockBySlug(slug: string) {
  return compoundGrowthStockCatalog.find((stock) => stock.slug === slug)
}

export function getCompoundGrowthStockByTicker(ticker: string) {
  return compoundGrowthStockCatalog.find((stock) => stock.ticker === ticker)
}
