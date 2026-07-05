import QRCode from 'qrcode'
import { formatCny } from '@/lib/retirement/cost-benchmarks'
import type { RetirementCalculatorMode } from '@/lib/retirement/share-url'

export type RetirementPosterData = {
  mode: RetirementCalculatorMode
  modeLabel: string
  monthlyTotal: number
  lifetimeExposure: number
  planningYears: number
  cityLabel: string
  detailLabel: string
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

async function buildQrDataUrl(text: string) {
  return QRCode.toDataURL(text, {
    width: 280,
    margin: 1,
    color: { dark: '#09090b', light: '#ffffff' },
  })
}

export async function drawRetirementPoster(
  canvas: HTMLCanvasElement,
  data: RetirementPosterData,
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
  gradient.addColorStop(0.45, '#18181b')
  gradient.addColorStop(1, '#27272a')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  ctx.strokeStyle = 'rgba(139, 92, 246, 0.35)'
  ctx.lineWidth = 3
  ctx.strokeRect(28, 28, width - 56, height - 56)

  ctx.fillStyle = '#8b5cf6'
  ctx.font = '700 22px "Noto Sans SC", system-ui, sans-serif'
  ctx.fillText('LANGTON TAO · 熊比特咖啡', 56, 96)

  ctx.fillStyle = '#ffffff'
  ctx.font = '700 48px "Noto Sans SC", system-ui, sans-serif'
  ctx.fillText('养老费用估算', 56, 170)

  ctx.fillStyle = '#8b5cf6'
  ctx.font = '600 26px "Noto Sans SC", system-ui, sans-serif'
  ctx.fillText(data.modeLabel, 56, 220)

  ctx.fillStyle = 'rgba(255,255,255,0.65)'
  ctx.font = '500 22px "Noto Sans SC", system-ui, sans-serif'
  wrapText(
    ctx,
    `${data.cityLabel} · ${data.detailLabel}`,
    56,
    268,
    width - 112,
    32
  )

  ctx.fillStyle = 'rgba(255,255,255,0.55)'
  ctx.font = '600 20px "Noto Sans SC", system-ui, sans-serif'
  ctx.fillText('预估月费', 56, 360)

  ctx.fillStyle = '#8b5cf6'
  ctx.font = '700 56px "Noto Sans SC", system-ui, sans-serif'
  ctx.fillText(formatCny(data.monthlyTotal), 56, 430)

  ctx.fillStyle = 'rgba(255,255,255,0.55)'
  ctx.font = '600 20px "Noto Sans SC", system-ui, sans-serif'
  ctx.fillText(`规划期总敞口（${data.planningYears} 年）`, 56, 500)

  ctx.fillStyle = '#ffffff'
  ctx.font = '700 40px "Noto Sans SC", system-ui, sans-serif'
  ctx.fillText(formatCny(data.lifetimeExposure), 56, 560)

  ctx.fillStyle = 'rgba(255,255,255,0.45)'
  ctx.font = '500 16px "Noto Sans SC", system-ui, sans-serif'
  wrapText(
    ctx,
    '教育用途估算，非投资建议。扫码打开计算器，查看完整选项与鱼骨费用结构。',
    56,
    640,
    width - 112,
    24
  )

  const qrSize = 220
  const qrX = width - qrSize - 56
  const qrY = height - qrSize - 100

  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(qrX - 10, qrY - 10, qrSize + 20, qrSize + 20, 14)
  } else {
    ctx.rect(qrX - 10, qrY - 10, qrSize + 20, qrSize + 20)
  }
  ctx.fill()

  try {
    const qrDataUrl = await buildQrDataUrl(shareUrl)
    const qr = await loadImage(qrDataUrl)
    ctx.drawImage(qr, qrX, qrY, qrSize, qrSize)
  } catch {
    ctx.fillStyle = '#09090b'
    ctx.font = '500 18px system-ui, sans-serif'
    ctx.fillText('扫码打开计算器', qrX + 28, qrY + qrSize / 2)
  }

  ctx.fillStyle = 'rgba(255,255,255,0.45)'
  ctx.font = '500 16px "Noto Sans SC", system-ui, sans-serif'
  ctx.fillText('扫码打开计算器', qrX + 36, qrY + qrSize + 28)
}
