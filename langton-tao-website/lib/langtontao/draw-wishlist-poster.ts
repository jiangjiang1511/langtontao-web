import QRCode from 'qrcode'
import {
  getWishlistDimensionLabel,
  langtontaoWishlistQuestions,
  resolveWishlistProfile,
  type WishlistAnswers,
} from '@/lib/content/langtontao/langtontao-wishlist-survey'

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

export async function drawWishlistPoster(
  canvas: HTMLCanvasElement,
  answers: WishlistAnswers,
  shareUrl: string
) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const profile = resolveWishlistProfile(answers)
  const width = 720
  const height = 1080
  canvas.width = width
  canvas.height = height

  const margin = 56
  const contentW = width - margin * 2

  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, '#fafafa')
  gradient.addColorStop(0.5, '#ffffff')
  gradient.addColorStop(1, '#f4f4f5')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  ctx.fillStyle = '#09090b'
  ctx.font = '700 28px "Noto Sans SC", system-ui, sans-serif'
  ctx.fillText('家庭十年愿望清单', margin, 72)

  ctx.fillStyle = '#71717a'
  ctx.font = '500 16px "Noto Sans SC", system-ui, sans-serif'
  ctx.fillText('朗敦道 Langton Tao', margin, 104)

  ctx.fillStyle = '#8b5cf6'
  ctx.fillRect(margin, 120, 64, 4)

  ctx.fillStyle = '#09090b'
  ctx.font = '700 22px "Noto Sans SC", system-ui, sans-serif'
  let y = 168
  ctx.fillText(`优先维度：${getWishlistDimensionLabel(profile.topDimension)}`, margin, y)
  y += 36

  ctx.fillStyle = '#52525b'
  ctx.font = '500 15px "Noto Sans SC", system-ui, sans-serif'
  y = wrapText(ctx, profile.stageLabel, margin, y, contentW, 24) + 20
  y = wrapText(ctx, profile.exposureHint, margin, y, contentW, 22) + 32

  ctx.fillStyle = '#09090b'
  ctx.font = '600 14px "Noto Sans SC", system-ui, sans-serif'
  ctx.fillText('我的选择', margin, y)
  y += 28

  for (const question of langtontaoWishlistQuestions) {
    const optionId = answers[question.id]
    const option = question.options.find((item) => item.id === optionId)
    if (!option) continue

    ctx.fillStyle = '#a1a1aa'
    ctx.font = '500 12px "Noto Sans SC", system-ui, sans-serif'
    ctx.fillText(getWishlistDimensionLabel(question.dimension), margin, y)
    y += 18

    ctx.fillStyle = '#3f3f46'
    ctx.font = '500 13px "Noto Sans SC", system-ui, sans-serif'
    y = wrapText(ctx, option.label, margin, y, contentW, 20) + 16
    if (y > height - 280) break
  }

  const qrSize = 148
  const qrX = width - qrSize - margin
  const qrY = height - qrSize - 64

  ctx.fillStyle = '#71717a'
  ctx.font = '500 14px "Noto Sans SC", system-ui, sans-serif'
  wrapText(
    ctx,
    '扫码查看愿望清单 · 开启朗敦道传承对话',
    margin,
    height - 108,
    width - qrSize - margin * 2 - 24,
    22
  )

  ctx.fillStyle = '#ffffff'
  ctx.fillRect(qrX - 8, qrY - 8, qrSize + 16, qrSize + 16)

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
