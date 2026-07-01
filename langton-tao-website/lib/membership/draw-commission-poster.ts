import QRCode from 'qrcode'
import type { MembershipTierId } from '@/lib/content/membership'
import {
  getCommissionRuleLabel,
  membershipCommissionTierLabels,
  type CommissionProductId,
} from '@/lib/content/membership-commission'

export type CommissionPosterInput = {
  tierId: MembershipTierId
  productId: CommissionProductId
  productName: string
  orderAmount: number
  commissionAmount: number
  shareUrl: string
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
  if (line) ctx.fillText(line, x, cursorY)
  return cursorY
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

function strokeRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  radius: number,
  strokeStyle: string,
  lineWidth: number
) {
  ctx.strokeStyle = strokeStyle
  ctx.lineWidth = lineWidth
  if (typeof ctx.roundRect === 'function') {
    ctx.beginPath()
    ctx.roundRect(x, y, w, h, radius)
    ctx.stroke()
    return
  }
  ctx.strokeRect(x, y, w, h)
}

async function buildQrDataUrl(text: string) {
  return QRCode.toDataURL(text, {
    width: 320,
    margin: 1,
    color: { dark: '#09090b', light: '#ffffff' },
  })
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = reject
    image.src = src
  })
}

function formatMoney(amount: number) {
  return `¥${amount.toLocaleString('zh-CN')}`
}

export async function drawCommissionPoster(
  canvas: HTMLCanvasElement,
  input: CommissionPosterInput
) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const {
    tierId,
    productId,
    productName,
    orderAmount,
    commissionAmount,
    shareUrl,
  } = input

  const width = 720
  const height = 1080
  const margin = 48
  const contentW = width - margin * 2

  canvas.width = width
  canvas.height = height

  const bg = ctx.createLinearGradient(0, 0, 0, height)
  bg.addColorStop(0, '#0a0a0b')
  bg.addColorStop(0.55, '#18181b')
  bg.addColorStop(1, '#09090b')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, width, height)

  ctx.fillStyle = '#ffe600'
  ctx.fillRect(0, 0, width, 8)

  ctx.fillStyle = 'rgba(255, 230, 0, 0.12)'
  ctx.beginPath()
  ctx.arc(width - 80, 120, 140, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.arc(60, 420, 100, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = '#ffe600'
  ctx.font = '700 20px "Noto Sans SC", system-ui, sans-serif'
  ctx.fillText('LANGTON TAO · MFO', margin, 64)

  ctx.fillStyle = 'rgba(255,255,255,0.55)'
  ctx.font = '500 18px "Noto Sans SC", system-ui, sans-serif'
  ctx.fillText('事业合伙人 · 推荐有奖', margin, 96)

  ctx.fillStyle = '#ffffff'
  ctx.font = '700 40px "Noto Sans SC", system-ui, sans-serif'
  ctx.fillText('我分享了', margin, 168)

  ctx.fillStyle = '#ffe600'
  ctx.font = '700 34px "Noto Sans SC", system-ui, sans-serif'
  const productBottom = wrapText(
    ctx,
    `「${productName}」`,
    margin,
    218,
    contentW,
    44
  )

  const cardY = productBottom + 36
  const cardH = 280
  fillRoundedRect(ctx, margin, cardY, contentW, cardH, 20, 'rgba(255,255,255,0.06)')
  strokeRoundedRect(
    ctx,
    margin,
    cardY,
    contentW,
    cardH,
    20,
    'rgba(255, 230, 0, 0.35)',
    2
  )

  const cardPad = 28
  const cardX = margin + cardPad

  ctx.fillStyle = 'rgba(255,255,255,0.65)'
  ctx.font = '600 22px "Noto Sans SC", system-ui, sans-serif'
  ctx.fillText('成功推荐，预估可获得', cardX, cardY + 52)

  const amountText = formatMoney(commissionAmount)
  ctx.fillStyle = '#ffe600'
  ctx.font = '700 72px "Noto Sans SC", system-ui, sans-serif'
  ctx.fillText(amountText, cardX, cardY + 148)

  ctx.fillStyle = 'rgba(255,255,255,0.72)'
  ctx.font = '500 20px "Noto Sans SC", system-ui, sans-serif'
  ctx.fillText(
    `${membershipCommissionTierLabels[tierId]} · ${getCommissionRuleLabel(tierId, productId)}`,
    cardX,
    cardY + 192
  )

  ctx.fillStyle = 'rgba(255,255,255,0.45)'
  ctx.font = '500 17px "Noto Sans SC", system-ui, sans-serif'
  ctx.fillText(
    `按成交额 ${formatMoney(orderAmount)} 测算 · 正式结算以协议为准`,
    cardX,
    cardY + 232
  )

  const ctaY = cardY + cardH + 40
  const ctaH = 72
  fillRoundedRect(ctx, margin, ctaY, contentW, ctaH, 36, '#ffe600')

  ctx.fillStyle = '#09090b'
  ctx.font = '700 28px "Noto Sans SC", system-ui, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('你也来一起吧 →', width / 2, ctaY + 46)
  ctx.textAlign = 'left'

  ctx.fillStyle = 'rgba(255,255,255,0.8)'
  ctx.font = '600 22px "Noto Sans SC", system-ui, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('扫码试算 · 看看你能获得多少', width / 2, ctaY + ctaH + 44)
  ctx.textAlign = 'left'

  const qrSize = 200
  const qrX = (width - qrSize) / 2
  const qrY = ctaY + ctaH + 68

  fillRoundedRect(ctx, qrX - 14, qrY - 14, qrSize + 28, qrSize + 28, 18, '#ffffff')

  try {
    const qrDataUrl = await buildQrDataUrl(shareUrl)
    const qr = await loadImage(qrDataUrl)
    ctx.drawImage(qr, qrX, qrY, qrSize, qrSize)
  } catch {
    ctx.fillStyle = '#71717a'
    ctx.font = '500 16px system-ui, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('扫码打开', width / 2, qrY + qrSize / 2)
    ctx.textAlign = 'left'
  }

  ctx.fillStyle = 'rgba(255,255,255,0.35)'
  ctx.font = '500 15px "Noto Sans SC", system-ui, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('加入朗敦道 · 开启你的渠道收益', width / 2, qrY + qrSize + 40)
  ctx.textAlign = 'left'
}
