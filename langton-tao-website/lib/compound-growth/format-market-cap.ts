export type CompoundGrowthCurrency = 'USD' | 'HKD' | 'CNY'

export const COMPOUND_GROWTH_BASE = 10_000

const CURRENCY_SYMBOL: Record<CompoundGrowthCurrency, string> = {
  USD: '$',
  HKD: 'HK$',
  CNY: '¥',
}

export function formatMarketCap(
  value: number,
  currency: CompoundGrowthCurrency,
  compact = true
): string {
  const symbol = CURRENCY_SYMBOL[currency] ?? ''
  const abs = Math.abs(value)

  if (!compact) {
    return `${symbol}${Math.round(value).toLocaleString('zh-CN')}`
  }

  if (currency === 'CNY' || currency === 'HKD') {
    if (abs >= 1_0000_0000_0000) {
      return `${symbol}${(value / 1_0000_0000_0000).toFixed(2)}万亿`
    }
    if (abs >= 1_0000_0000) {
      return `${symbol}${(value / 1_0000_0000).toFixed(1)}亿`
    }
  }

  if (abs >= 1_000_000_000_000) {
    return `${symbol}${(value / 1_000_000_000_000).toFixed(2)}T`
  }
  if (abs >= 1_000_000_000) {
    return `${symbol}${(value / 1_000_000_000).toFixed(1)}B`
  }
  if (abs >= 1_000_000) {
    return `${symbol}${(value / 1_000_000).toFixed(1)}M`
  }

  return `${symbol}${Math.round(value).toLocaleString('zh-CN')}`
}

export function formatCagr(cagr: number): string {
  return `${(cagr * 100).toFixed(1)}%`
}

/** 中文年化收益标签，用于角标与列表 */
export function formatCagrLabel(cagr: number): string {
  return `年化收益 ${formatCagr(cagr)}`
}

export function totalReturnRatio(
  value: number,
  base = COMPOUND_GROWTH_BASE
): number {
  if (base <= 0) return 0
  return value / base - 1
}

/** 累计收益率（相对 10,000 起点） */
export function formatTotalReturn(
  value: number,
  base = COMPOUND_GROWTH_BASE
): string {
  const pct = totalReturnRatio(value, base) * 100
  const sign = pct >= 0 ? '+' : ''
  if (Math.abs(pct) >= 1000) return `${sign}${pct.toFixed(0)}%`
  if (Math.abs(pct) >= 100) return `${sign}${pct.toFixed(1)}%`
  return `${sign}${pct.toFixed(2)}%`
}

export function formatTotalReturnFromStats(startCap: number, endCap: number): string {
  if (startCap <= 0) return '—'
  const pct = (endCap / startCap - 1) * 100
  const sign = pct >= 0 ? '+' : ''
  if (Math.abs(pct) >= 1000) return `${sign}${pct.toFixed(0)}%`
  if (Math.abs(pct) >= 100) return `${sign}${pct.toFixed(1)}%`
  return `${sign}${pct.toFixed(2)}%`
}

export function formatYearLabel(dateIso: string): string {
  const date = new Date(dateIso)
  if (Number.isNaN(date.getTime())) return dateIso.slice(0, 4)
  return String(date.getFullYear())
}

export function formatPeriodLabel(years: number, listedYear?: number): string {
  if (listedYear === 2016) return '过去十年（2016–2026）'
  if (years >= 9.5 && years <= 10.5) return '过去十年（2016–2026）'
  if (years >= 29) return '约 30 年'
  if (listedYear) return `自 ${listedYear} 年起`
  return `${years.toFixed(1)} 年`
}

export function formatInvestmentValue(
  value: number,
  currency: CompoundGrowthCurrency,
  compact = true
): string {
  return formatMarketCap(value, currency, compact)
}

export function formatChartAxisValue(value: number): string {
  const pct = totalReturnRatio(value) * 100
  if (Math.abs(pct) >= 1000) return `${pct >= 0 ? '+' : ''}${pct.toFixed(0)}%`
  if (Math.abs(pct) >= 100) return `${pct >= 0 ? '+' : ''}${pct.toFixed(0)}%`
  return `${pct >= 0 ? '+' : ''}${pct.toFixed(0)}%`
}
