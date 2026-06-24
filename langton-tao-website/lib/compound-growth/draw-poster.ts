import QRCode from 'qrcode'
import {
  buildChartPath,
  getMultiSeriesScale,
} from '@/components/sections/coffee2/use-compound-growth-player'
import {
  formatCagrLabel,
  formatPeriodLabel,
  formatTotalReturnFromStats,
} from '@/lib/compound-growth/format-market-cap'
import type { CompoundGrowthSeries } from '@/lib/compound-growth/types'

export function buildCompoundShareUrl(slug: string) {
  if (typeof window === 'undefined') {
    return `/coffee?compound=${slug}`
  }
  const url = new URL('/coffee', window.location.origin)
  url.searchParams.set('compound', slug)
  url.hash = 'invest'
  return url.toString()
}

export function buildCompoundOverviewShareUrl() {
  if (typeof window === 'undefined') {
    return '/coffee#invest'
  }
  const url = new URL('/coffee', window.location.origin)
  url.hash = 'invest'
  return url.toString()
}

async function buildQrDataUrl(text: string) {
  return QRCode.toDataURL(text, {
    width: 280,
    margin: 1,
    color: { dark: '#09090b', light: '#ffffff' },
  })
}

function fillRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  radius: number,
  fillStyle: string
) {
  ctx.fillStyle = fillStyle
  if (typeof ctx.roundRect === 'function') {
    ctx.beginPath()
    ctx.roundRect(x, y, w, h, radius)
    ctx.fill()
    return
  }
  ctx.fillRect(x, y, w, h)
}

function drawQrFallback(
  ctx: CanvasRenderingContext2D,
  qrX: number,
  qrY: number,
  qrSize: number,
  shareUrl: string
) {
  ctx.fillStyle = '#09090b'
  ctx.font = '500 16px system-ui, sans-serif'
  ctx.fillText('扫码链接', qrX + 72, qrY + qrSize / 2 - 8)
  ctx.font = '400 12px system-ui, sans-serif'
  const shortUrl = shareUrl.replace(/^https?:\/\//, '')
  ctx.fillText(shortUrl.slice(0, 28), qrX + 16, qrY + qrSize / 2 + 16)
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const chars = text.split('')
  let line = ''
  let cursorY = y

  for (const char of chars) {
    const testLine = line + char
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line, x, cursorY)
      line = char
      cursorY += lineHeight
    } else {
      line = testLine
    }
  }
  ctx.fillText(line, x, cursorY)
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = reject
    image.src = src
  })
}

export async function drawCompoundGrowthPoster(
  canvas: HTMLCanvasElement,
  series: CompoundGrowthSeries,
  shareUrl: string
) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const width = 720
  const height = 1080
  canvas.width = width
  canvas.height = height

  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, '#09090b')
  gradient.addColorStop(0.5, '#18181b')
  gradient.addColorStop(1, '#0f0f12')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  ctx.strokeStyle = `${series.accent}55`
  ctx.lineWidth = 3
  ctx.strokeRect(28, 28, width - 56, height - 56)

  ctx.fillStyle = '#ffe600'
  ctx.font = '700 20px "Noto Sans SC", system-ui, sans-serif'
  ctx.fillText('LANGTON TAO · 熊比特咖啡', 56, 88)

  ctx.fillStyle = '#ffffff'
  ctx.font = '700 48px "Noto Sans SC", system-ui, sans-serif'
  ctx.fillText('复利见证', 56, 156)

  ctx.fillStyle = series.accent
  ctx.font = '700 36px "Noto Sans SC", system-ui, sans-serif'
  ctx.fillText(series.name, 56, 212)

  ctx.fillStyle = 'rgba(255,255,255,0.65)'
  ctx.font = '500 22px "Noto Sans SC", system-ui, sans-serif'
  ctx.fillText(
    `${series.ticker} · ${formatCagrLabel(series.stats.cagr)}`,
    56,
    252
  )

  const chartW = width - 112
  const chartH = 220
  const chartX = 56
  const chartY = 290
  const { coords } = buildChartPath(series.points, chartW, chartH, 1)

  if (coords.length > 1) {
    ctx.beginPath()
    coords.forEach((coord, index) => {
      const x = chartX + coord.x
      const y = chartY + coord.y
      if (index === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    })
    ctx.strokeStyle = series.accent
    ctx.lineWidth = 3
    ctx.stroke()

    ctx.lineTo(chartX + coords[coords.length - 1].x, chartY + chartH)
    ctx.lineTo(chartX + coords[0].x, chartY + chartH)
    ctx.closePath()
    ctx.fillStyle = `${series.accent}33`
    ctx.fill()
  }

  ctx.fillStyle = 'rgba(255,255,255,0.55)'
  ctx.font = '500 20px "Noto Sans SC", system-ui, sans-serif'
  ctx.fillText(formatPeriodLabel(series.stats.years, series.listedYear), 56, 560)
  ctx.fillStyle = '#ffffff'
  ctx.font = '600 24px "Noto Sans SC", system-ui, sans-serif'
  ctx.fillText(
    `十年累计 ${formatTotalReturnFromStats(series.stats.startCap, series.stats.endCap)}`,
    56,
    598
  )

  ctx.fillStyle = 'rgba(255,255,255,0.45)'
  ctx.font = '500 16px "Noto Sans SC", system-ui, sans-serif'
  wrapText(
    ctx,
    '扫码打开熊比特 · 观看完整复利动画。数据仅供教育演示，不构成投资建议。',
    56,
    660,
    width - 112,
    24
  )

  const qrSize = 220
  const qrX = width - qrSize - 56
  const qrY = height - qrSize - 100

  fillRoundedRect(ctx, qrX - 10, qrY - 10, qrSize + 20, qrSize + 20, 14, '#ffffff')

  try {
    const qrDataUrl = await buildQrDataUrl(shareUrl)
    const qr = await loadImage(qrDataUrl)
    ctx.drawImage(qr, qrX, qrY, qrSize, qrSize)
  } catch (qrError) {
    console.error('Compound growth poster QR failed:', qrError)
    drawQrFallback(ctx, qrX, qrY, qrSize, shareUrl)
  }
}

export async function drawCompoundGrowthOverviewPoster(
  canvas: HTMLCanvasElement,
  seriesList: CompoundGrowthSeries[],
  shareUrl: string
) {
  const ctx = canvas.getContext('2d')
  if (!ctx || !seriesList.length) return

  const width = 720
  const height = 1180
  canvas.width = width
  canvas.height = height

  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, '#09090b')
  gradient.addColorStop(0.5, '#18181b')
  gradient.addColorStop(1, '#0f0f12')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  ctx.strokeStyle = '#ffe60055'
  ctx.lineWidth = 3
  ctx.strokeRect(28, 28, width - 56, height - 56)

  ctx.fillStyle = '#ffe600'
  ctx.font = '700 20px "Noto Sans SC", system-ui, sans-serif'
  ctx.fillText('LANGTON TAO · 熊比特咖啡', 56, 88)

  ctx.fillStyle = '#ffffff'
  ctx.font = '700 48px "Noto Sans SC", system-ui, sans-serif'
  ctx.fillText('复利对比', 56, 156)

  ctx.fillStyle = 'rgba(255,255,255,0.65)'
  ctx.font = '500 22px "Noto Sans SC", system-ui, sans-serif'
  ctx.fillText('2016–2026 · 七类资产十年累计收益', 56, 200)

  const chartW = width - 112
  const chartH = 280
  const chartX = 56
  const chartY = 230
  const chartPadding = { top: 12, right: 12, bottom: 20, left: 8 }
  const scale = getMultiSeriesScale(
    seriesList.map((series) => series.points),
    true
  )

  for (const series of seriesList) {
    const { coords } = buildChartPath(
      series.points,
      chartW,
      chartH,
      1,
      chartPadding,
      scale
    )

    if (coords.length < 2) continue

    ctx.beginPath()
    coords.forEach((coord, index) => {
      const x = chartX + coord.x
      const y = chartY + coord.y
      if (index === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    })
    ctx.strokeStyle = series.accent
    ctx.lineWidth = 2.5
    ctx.stroke()
  }

  const legendX = 56
  let legendY = chartY + chartH + 36
  const legendColW = (width - 112) / 2

  seriesList.forEach((series, index) => {
    const col = index % 2
    const row = Math.floor(index / 2)
    const x = legendX + col * legendColW
    const y = legendY + row * 34

    ctx.fillStyle = series.accent
    ctx.fillRect(x, y - 10, 14, 3)

    ctx.fillStyle = '#ffffff'
    ctx.font = '500 18px "Noto Sans SC", system-ui, sans-serif'
    const totalReturn = formatTotalReturnFromStats(
      series.stats.startCap,
      series.stats.endCap
    )
    ctx.fillText(`${series.name} ${totalReturn}`, x + 22, y)
  })

  const legendRows = Math.ceil(seriesList.length / 2)
  const footerY = legendY + legendRows * 34 + 24

  ctx.fillStyle = 'rgba(255,255,255,0.45)'
  ctx.font = '500 16px "Noto Sans SC", system-ui, sans-serif'
  wrapText(
    ctx,
    '扫码打开熊比特 · 观看完整复利动画。数据仅供教育演示，不构成投资建议。',
    56,
    footerY,
    width - 112,
    24
  )

  const qrSize = 200
  const qrX = width - qrSize - 56
  const qrY = height - qrSize - 88

  fillRoundedRect(ctx, qrX - 10, qrY - 10, qrSize + 20, qrSize + 20, 14, '#ffffff')

  try {
    const qrDataUrl = await buildQrDataUrl(shareUrl)
    const qr = await loadImage(qrDataUrl)
    ctx.drawImage(qr, qrX, qrY, qrSize, qrSize)
  } catch (qrError) {
    console.error('Compound growth overview poster QR failed:', qrError)
    drawQrFallback(ctx, qrX, qrY, qrSize, shareUrl)
  }
}
