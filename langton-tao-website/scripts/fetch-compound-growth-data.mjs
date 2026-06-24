#!/usr/bin/env node
/**
 * Fetch 2016–2026 investment return series (normalized to 10,000 at start).
 * Usage: npm run fetch:compound-growth
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '../public/data/compound-growth')
const PERIOD_START = '20160101'
const BASE_INVESTMENT = 10_000

const catalog = [
  {
    slug: 'bitcoin',
    ticker: 'BTC',
    name: '比特币',
    nameEn: 'Bitcoin',
    market: 'US',
    currency: 'USD',
    tagline: '2016 年直接买入比特币',
    accent: '#f59e0b',
    beg: PERIOD_START,
    kind: 'market',
    yahoo: 'BTC-USD',
    dataSource: 'Yahoo Finance BTC-USD 月度收盘价，累计收益率',
  },
  {
    slug: 'gold',
    ticker: 'GLD',
    secid: '105.GLD',
    name: '黄金',
    nameEn: 'Gold',
    market: 'US',
    currency: 'USD',
    tagline: '买入 SPDR 黄金 ETF（GLD）',
    accent: '#eab308',
    beg: PERIOD_START,
    kind: 'market',
    yahoo: 'GLD',
    dataSource: 'SPDR Gold Shares（GLD）月度收盘价，累计收益率',
  },
  {
    slug: 'nasdaq',
    ticker: 'QQQ',
    secid: '105.QQQ',
    name: '纳斯达克100',
    nameEn: 'Nasdaq-100',
    market: 'US',
    currency: 'USD',
    tagline: '买入纳斯达克100指数基金（QQQ）',
    accent: '#60a5fa',
    beg: PERIOD_START,
    kind: 'market',
    yahoo: 'QQQ',
    dataSource: 'Invesco QQQ 月度收盘价，累计收益率',
  },
  {
    slug: 'sp500',
    ticker: 'SPY',
    secid: '105.SPY',
    name: '标普500',
    nameEn: 'S&P 500',
    market: 'US',
    currency: 'USD',
    tagline: '买入标普500指数基金（SPY）',
    accent: '#22c55e',
    beg: PERIOD_START,
    kind: 'market',
    yahoo: 'SPY',
    dataSource: 'SPDR S&P 500 ETF（SPY）月度收盘价，累计收益率',
  },
  {
    slug: 'csi300',
    ticker: '510300',
    secid: '1.510300',
    name: 'A股大盘',
    nameEn: 'CSI 300 ETF',
    market: 'CN',
    currency: 'CNY',
    tagline: '买入沪深300指数基金（510300）',
    accent: '#ef4444',
    beg: PERIOD_START,
    kind: 'market',
    dataSource: '华泰柏瑞沪深300ETF（510300）月度收盘价，累计收益率',
  },
  {
    slug: 'us-treasury',
    ticker: '10Y',
    name: '美国国债',
    nameEn: 'US Treasury 10Y',
    market: 'US',
    currency: 'USD',
    tagline: '2016 年买入 10 年期美债并持有到期',
    accent: '#a78bfa',
    kind: 'treasury_10y_hold',
    dataSource:
      '2016 年初 10 年期美债收益率（FRED DGS10），按买入持有到期、票息再投资估算',
  },
  {
    slug: 'bank-deposit',
    ticker: '定存',
    name: '银行存款',
    nameEn: 'Bank Deposit',
    market: 'CN',
    currency: 'CNY',
    tagline: '按一年期定存利率存入中国银行',
    accent: '#a1a1aa',
    kind: 'deposit',
    dataSource: '参考中国商业银行一年期定存利率区间估算（月度复利）',
  },
]

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function computeStats(points) {
  const start = points[0]
  const end = points[points.length - 1]
  const startMs = new Date(start.date).getTime()
  const endMs = new Date(end.date).getTime()
  const years = Math.max((endMs - startMs) / (365.25 * 24 * 60 * 60 * 1000), 0.25)
  const cagr =
    start.marketCap > 0 && end.marketCap > 0
      ? Math.pow(end.marketCap / start.marketCap, 1 / years) - 1
      : 0

  return {
    startCap: start.marketCap,
    endCap: end.marketCap,
    cagr,
    years,
    startDate: start.date,
    endDate: end.date,
  }
}

function dedupeByMonth(points) {
  const map = new Map()
  for (const point of points) {
    map.set(point.date.slice(0, 7), point)
  }
  return [...map.values()].sort((a, b) => a.date.localeCompare(b.date))
}

function filterFrom2016(points) {
  return points.filter((point) => point.date >= '2016-01-01')
}

function normalizeToBase(points, base = BASE_INVESTMENT) {
  if (!points.length) return []
  const startValue = points[0].marketCap
  if (startValue <= 0) return []
  return points.map((point) => ({
    date: point.date,
    marketCap: Math.round((point.marketCap / startValue) * base),
  }))
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      Referer: 'https://quote.eastmoney.com/',
    },
  })
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }
  return response.json()
}

async function fetchMonthlyKlines(secid, beg) {
  const end = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const url =
    `https://push2his.eastmoney.com/api/qt/stock/kline/get?secid=${encodeURIComponent(secid)}` +
    `&klt=103&fqt=2&beg=${beg}&end=${end}&fields1=f1&fields2=f51,f53`

  const json = await fetchJson(url)
  const rows = json.data?.klines ?? []
  return rows
    .map((row) => {
      const [date, closeRaw] = row.split(',')
      const close = Number(closeRaw)
      if (!date || !Number.isFinite(close) || close <= 0) return null
      return { date, close }
    })
    .filter(Boolean)
}

async function fetchYahooMonthly(symbol, startDate = '2016-01-01') {
  const period1 = Math.floor(new Date(startDate).getTime() / 1000)
  const period2 = Math.floor(Date.now() / 1000)
  const url =
    `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}` +
    `?period1=${period1}&period2=${period2}&interval=1mo`

  const response = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0' },
  })
  if (!response.ok) throw new Error(`Yahoo HTTP ${response.status}`)

  const json = await response.json()
  const result = json.chart?.result?.[0]
  const timestamps = result?.timestamp ?? []
  const quotes = result?.indicators?.quote?.[0] ?? {}
  const adjCloses = result?.indicators?.adjclose?.[0]?.adjclose ?? []
  const closes = quotes.close ?? []

  return timestamps
    .map((ts, index) => {
      const adj = adjCloses[index]
      const close = closes[index]
      const price = Number.isFinite(adj) && adj > 0 ? adj : close
      if (!Number.isFinite(price) || price <= 0) return null
      const date = new Date(ts * 1000).toISOString().slice(0, 10)
      return { date, close: price }
    })
    .filter(Boolean)
}

function buildDepositSeries() {
  const points = []
  const start = new Date('2016-01-01')
  const end = new Date()
  const annualRates = {
    2016: 0.0155,
    2017: 0.0145,
    2018: 0.014,
    2019: 0.0135,
    2020: 0.0125,
    2021: 0.012,
    2022: 0.0115,
    2023: 0.011,
    2024: 0.0105,
    2025: 0.01,
    2026: 0.01,
  }

  let value = BASE_INVESTMENT
  const cursor = new Date(start)

  while (cursor <= end) {
    const year = cursor.getFullYear()
    const rate = annualRates[year] ?? 0.01
    const monthlyRate = rate / 12
    if (points.length > 0) {
      value *= 1 + monthlyRate
    }
    points.push({
      date: cursor.toISOString().slice(0, 10),
      marketCap: Math.round(value),
    })
    cursor.setMonth(cursor.getMonth() + 1)
  }

  return points
}

const YAHOO_FALLBACK = {
  gold: 'GLD',
  nasdaq: 'QQQ',
  sp500: 'SPY',
  bitcoin: 'BTC-USD',
}

async function fetchFredDgs10() {
  const url = 'https://fred.stlouisfed.org/graph/fredgraph.csv?id=DGS10'
  const response = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0' },
  })
  if (!response.ok) throw new Error(`FRED HTTP ${response.status}`)

  const text = await response.text()
  const rows = text
    .trim()
    .split('\n')
    .slice(1)
    .map((line) => {
      const [date, valueRaw] = line.split(',')
      const value = Number(valueRaw)
      if (!date || !Number.isFinite(value) || value <= 0) return null
      return { date, yield: value / 100 }
    })
    .filter(Boolean)

  return rows
}

function buildTreasury10YHoldSeries(stock, purchaseYield) {
  const ytm = purchaseYield
  const points = []
  const start = new Date('2016-01-01')
  const end = new Date()
  let value = BASE_INVESTMENT
  const cursor = new Date(start)

  while (cursor <= end) {
    if (points.length > 0) {
      value *= 1 + ytm / 12
    }
    points.push({
      date: cursor.toISOString().slice(0, 10),
      marketCap: Math.round(value),
    })
    cursor.setMonth(cursor.getMonth() + 1)
  }

  const stats = {
    ...computeStats(points),
    totalReturn: points[points.length - 1].marketCap / BASE_INVESTMENT - 1,
  }

  return {
    slug: stock.slug,
    ticker: stock.ticker,
    name: stock.name,
    nameEn: stock.nameEn,
    market: stock.market,
    currency: stock.currency,
    listedYear: 2016,
    tagline: stock.tagline,
    accent: stock.accent,
    dataSource: `${stock.dataSource}（买入收益率 ${(ytm * 100).toFixed(2)}%）`,
    purchaseYield: ytm,
    points,
    stats,
  }
}

async function fetchTreasury10YHoldSeries(stock) {
  const rows = await fetchFredDgs10()
  const jan2016 = rows.find(
    (row) => row.date >= '2016-01-01' && row.date < '2016-02-01'
  )
  const first2016 =
    jan2016 ?? rows.find((row) => row.date.startsWith('2016-'))

  if (!first2016) {
    throw new Error('No DGS10 yield for 2016')
  }

  return buildTreasury10YHoldSeries(stock, first2016.yield)
}

async function fetchMarketSeries(stock) {
  let klines = []

  if (stock.yahoo) {
    try {
      klines = await fetchYahooMonthly(stock.yahoo)
    } catch {
      klines = []
    }
  }

  if (!klines.length && stock.secid) {
    try {
      klines = await fetchMonthlyKlines(stock.secid, stock.beg)
    } catch {
      klines = []
    }
  }

  if (!klines.length) {
    const yahooSymbol = YAHOO_FALLBACK[stock.slug]
    if (yahooSymbol) {
      klines = await fetchYahooMonthly(yahooSymbol)
    }
  }

  if (!klines.length) {
    throw new Error('No kline rows returned')
  }

  const rawPoints = dedupeByMonth(
    klines.map((row) => ({
      date: row.date,
      marketCap: row.close,
    }))
  )

  const filtered = filterFrom2016(rawPoints)
  const points = normalizeToBase(filtered.length ? filtered : rawPoints)

  if (points.length < 8) {
    throw new Error(`Insufficient points (${points.length})`)
  }

  const stats = computeStats(points)
  const listedYear = 2016

  return {
    slug: stock.slug,
    ticker: stock.ticker,
    name: stock.name,
    nameEn: stock.nameEn,
    market: stock.market,
    currency: stock.currency,
    listedYear,
    tagline: stock.tagline,
    accent: stock.accent,
    dataSource: stock.dataSource ?? '公开行情月度收盘价，累计收益率',
    points,
    stats,
  }
}

async function fetchBitcoinSeries(stock) {
  const klines = await fetchYahooMonthly('BTC-USD')
  if (!klines.length) {
    throw new Error('No bitcoin data from Yahoo')
  }

  const rawPoints = dedupeByMonth(
    klines.map((row) => ({
      date: row.date,
      marketCap: row.close,
    }))
  )

  const points = normalizeToBase(filterFrom2016(rawPoints))
  if (points.length < 8) {
    throw new Error(`Insufficient bitcoin points (${points.length})`)
  }

  const stats = computeStats(points)

  return {
    slug: stock.slug,
    ticker: stock.ticker,
    name: stock.name,
    nameEn: stock.nameEn,
    market: stock.market,
    currency: stock.currency,
    listedYear: 2016,
    tagline: stock.tagline,
    accent: stock.accent,
    dataSource: stock.dataSource ?? 'Yahoo Finance BTC-USD 月度收盘价，累计收益率',
    points,
    stats,
  }
}

async function fetchSeries(stock) {
  if (stock.kind === 'deposit') {
    const points = buildDepositSeries()
    const stats = computeStats(points)
    return {
      slug: stock.slug,
      ticker: stock.ticker,
      name: stock.name,
      nameEn: stock.nameEn,
      market: stock.market,
      currency: stock.currency,
      listedYear: 2016,
      tagline: stock.tagline,
      accent: stock.accent,
      dataSource: stock.dataSource,
      points,
      stats,
    }
  }

  if (stock.kind === 'treasury_10y_hold') {
    return fetchTreasury10YHoldSeries(stock)
  }

  if (stock.slug === 'bitcoin') {
    try {
      return await fetchBitcoinSeries(stock)
    } catch {
      return fetchMarketSeries({ ...stock, yahoo: 'BTC-USD' })
    }
  }

  return fetchMarketSeries(stock)
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true })

  const indexStocks = []
  const report = []

  for (const stock of catalog) {
    try {
      console.log(`Fetching ${stock.name} (${stock.slug})…`)
      const series = await fetchSeries(stock)

      fs.writeFileSync(
        path.join(outDir, `${stock.slug}.json`),
        `${JSON.stringify(series, null, 2)}\n`
      )

      indexStocks.push({
        slug: series.slug,
        ticker: series.ticker,
        name: series.name,
        nameEn: series.nameEn,
        market: series.market,
        currency: series.currency,
        tagline: series.tagline,
        accent: series.accent,
        listedYear: series.listedYear,
        stats: series.stats,
      })

      report.push({
        slug: stock.slug,
        status: 'ok',
        points: series.points.length,
        cagr: `${(series.stats.cagr * 100).toFixed(1)}%`,
        years: series.stats.years.toFixed(1),
      })
    } catch (error) {
      report.push({
        slug: stock.slug,
        status: 'error',
        reason: error.message,
      })
      console.error(`Failed ${stock.slug}:`, error.message)
    }

    await sleep(400)
  }

  const index = {
    generatedAt: new Date().toISOString(),
    periodLabel: '过去十年（2016–2026）',
    disclaimer:
      '收益数据基于公开行情或基准利率估算，反映「2016 年买入并持有」的累计回报，仅供教育与交流，不构成投资建议。历史表现不代表未来结果。',
    stocks: indexStocks,
  }

  fs.writeFileSync(path.join(outDir, 'index.json'), `${JSON.stringify(index, null, 2)}\n`)
  fs.writeFileSync(
    path.join(outDir, 'fetch-report.json'),
    `${JSON.stringify(report, null, 2)}\n`
  )

  console.log(`Done. ${indexStocks.length} assets written to ${outDir}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
