import QRCode from 'qrcode'
import {
  debtSurveyQuestions,
  type DebtSurveyAnswers,
} from '@/lib/content/coffee-debt-page'

export type DebtSurveyPosterData = {
  reflection: string
  invite: string
  answers: DebtSurveyAnswers
}

export function buildDebtSurveyShareUrl() {
  if (typeof window === 'undefined') {
    return '/coffee#debt'
  }
  return `${window.location.origin}/coffee#debt`
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const chars = [...text]
  let line = ''
  let currentY = y

  for (const char of chars) {
    const test = line + char
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, currentY)
      line = char
      currentY += lineHeight
    } else {
      line = test
    }
  }

  if (line) ctx.fillText(line, x, currentY)
  return currentY
}

function fillRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  radius: number
) {
  ctx.beginPath()
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(x, y, w, h, radius)
  } else {
    ctx.rect(x, y, w, h)
  }
  ctx.fill()
}

function getUserAnswerRows(answers: DebtSurveyAnswers) {
  return debtSurveyQuestions
    .map((question) => ({
      label: question.resultLabel,
      selected: (answers[question.id] ?? [])
        .map((id) => question.options.find((o) => o.id === id)?.label)
        .filter((label): label is string => Boolean(label)),
    }))
    .filter((row) => row.selected.length > 0)
}

function drawBackground(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, '#09090b')
  gradient.addColorStop(0.5, '#111118')
  gradient.addColorStop(1, '#09090b')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  const blob1 = ctx.createRadialGradient(width * 0.2, height * 0.12, 0, width * 0.2, height * 0.12, 320)
  blob1.addColorStop(0, 'rgba(139,92,246,0.14)')
  blob1.addColorStop(1, 'rgba(139,92,246,0)')
  ctx.fillStyle = blob1
  ctx.fillRect(0, 0, width, height)

  const blob2 = ctx.createRadialGradient(width * 0.9, height * 0.35, 0, width * 0.9, height * 0.35, 260)
  blob2.addColorStop(0, 'rgba(255,255,255,0.05)')
  blob2.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = blob2
  ctx.fillRect(0, 0, width, height)

  ctx.strokeStyle = 'rgba(139, 92, 246, 0.33)'
  ctx.lineWidth = 3
  ctx.strokeRect(28, 28, width - 56, height - 56)
}

function drawCommentaryHero(
  ctx: CanvasRenderingContext2D,
  reflection: string,
  invite: string,
  x: number,
  y: number,
  maxWidth: number,
  maxBottomY: number
) {
  ctx.fillStyle = '#8b5cf6'
  ctx.font = '700 13px "Noto Sans SC", system-ui, sans-serif'
  ctx.fillText('COFFEE CHAT · 熊比特', x, y)

  ctx.fillStyle = 'rgba(255,255,255,0.45)'
  ctx.font = '500 12px "Noto Sans SC", system-ui, sans-serif'
  ctx.fillText('家庭负债认知小测', x, y + 28)

  const quoteStartY = y + 72

  ctx.fillStyle = '#8b5cf6'
  ctx.fillRect(x, quoteStartY, 6, 48)

  ctx.fillStyle = '#ffffff'
  ctx.font = '900 36px "Noto Sans SC", system-ui, sans-serif'
  const reflectionEndY = wrapText(
    ctx,
    reflection,
    x + 20,
    quoteStartY + 44,
    maxWidth - 20,
    50
  )

  const inviteY = Math.min(reflectionEndY + 36, maxBottomY - 40)
  ctx.fillStyle = 'rgba(139,92,246,0.9)'
  ctx.font = '700 15px "Noto Sans SC", system-ui, sans-serif'
  const inviteEndY = wrapText(ctx, invite, x + 20, inviteY, maxWidth - 20, 24)

  return Math.min(inviteEndY, maxBottomY)
}

function drawUserChoicesPanel(
  ctx: CanvasRenderingContext2D,
  answers: DebtSurveyAnswers,
  panelX: number,
  panelY: number,
  panelW: number
) {
  const rows = getUserAnswerRows(answers)
  if (rows.length === 0) return panelY

  const rowH = 36
  const headerH = 44
  const panelH = headerH + rows.length * rowH + 16
  const radius = 16

  ctx.fillStyle = 'rgba(255,255,255,0.05)'
  fillRoundedRect(ctx, panelX, panelY, panelW, panelH, radius)

  ctx.strokeStyle = 'rgba(255,255,255,0.12)'
  ctx.lineWidth = 1
  ctx.beginPath()
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(panelX, panelY, panelW, panelH, radius)
  } else {
    ctx.rect(panelX, panelY, panelW, panelH)
  }
  ctx.stroke()

  ctx.fillStyle = 'rgba(255,255,255,0.5)'
  ctx.font = '700 11px "Noto Sans SC", system-ui, sans-serif'
  ctx.fillText('你的选择', panelX + 20, panelY + 28)

  let cursorY = panelY + headerH

  rows.forEach((row) => {
    ctx.fillStyle = 'rgba(255,255,255,0.35)'
    ctx.font = '500 11px "Noto Sans SC", system-ui, sans-serif'
    ctx.fillText(row.label, panelX + 20, cursorY + 14)

    let chipX = panelX + 100
    const chipY = cursorY + 2

    row.selected.forEach((label) => {
      const display =
        label.length > 12 ? `${label.slice(0, 10)}…` : label
      ctx.font = '700 12px "Noto Sans SC", system-ui, sans-serif'
      const chipW = Math.min(ctx.measureText(display).width + 20, panelW - 120)

      ctx.fillStyle = 'rgba(139,92,246,0.15)'
      fillRoundedRect(ctx, chipX, chipY, chipW, 22, 6)
      ctx.strokeStyle = 'rgba(139,92,246,0.45)'
      ctx.lineWidth = 1
      ctx.beginPath()
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(chipX, chipY, chipW, 22, 6)
      } else {
        ctx.rect(chipX, chipY, chipW, 22)
      }
      ctx.stroke()

      ctx.fillStyle = '#8b5cf6'
      ctx.fillText(display, chipX + 10, chipY + 15)

      chipX += chipW + 8
      if (chipX > panelX + panelW - 80) return
    })

    cursorY += rowH
  })

  return panelY + panelH
}

async function buildQrDataUrl(text: string) {
  return QRCode.toDataURL(text, {
    width: 280,
    margin: 1,
    color: { dark: '#09090b', light: '#ffffff' },
  })
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

export async function drawDebtSurveyPoster(
  canvas: HTMLCanvasElement,
  data: DebtSurveyPosterData,
  shareUrl: string
) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const width = 720
  const height = 1080
  canvas.width = width
  canvas.height = height

  const margin = 56
  const contentW = width - margin * 2

  drawBackground(ctx, width, height)

  const choicesZoneTop = height - 320

  const reflectionEndY = drawCommentaryHero(
    ctx,
    data.reflection,
    data.invite,
    margin,
    72,
    contentW,
    choicesZoneTop - 24
  )

  const choicesPanelY = Math.min(reflectionEndY + 40, choicesZoneTop)
  drawUserChoicesPanel(
    ctx,
    data.answers,
    margin - 8,
    choicesPanelY,
    contentW + 16
  )

  const qrSize = 148
  const qrX = width - qrSize - margin
  const qrY = height - qrSize - 64

  ctx.fillStyle = 'rgba(255,255,255,0.38)'
  ctx.font = '500 14px "Noto Sans SC", system-ui, sans-serif'
  wrapText(
    ctx,
    '扫码完成小测 · 与家人朋友一起追问',
    margin,
    height - 108,
    width - qrSize - margin * 2 - 24,
    22
  )

  ctx.save()
  ctx.shadowColor = 'rgba(139, 92, 246, 0.33)'
  ctx.shadowBlur = 18
  ctx.fillStyle = '#ffffff'
  fillRoundedRect(ctx, qrX - 8, qrY - 8, qrSize + 16, qrSize + 16, 12)
  ctx.restore()

  try {
    const qrDataUrl = await buildQrDataUrl(shareUrl)
    const qr = await loadImage(qrDataUrl)
    ctx.drawImage(qr, qrX, qrY, qrSize, qrSize)
  } catch {
    ctx.fillStyle = '#71717a'
    ctx.font = '500 14px system-ui, sans-serif'
    ctx.fillText('QR', qrX + qrSize / 2 - 12, qrY + qrSize / 2)
  }
}
