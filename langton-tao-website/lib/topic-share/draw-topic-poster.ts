import QRCode from 'qrcode'

export function resolvePosterUrl(src: string) {
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) {
    return src
  }
  if (typeof window === 'undefined') {
    return src
  }
  return `${window.location.origin}${src.startsWith('/') ? src : `/${src}`}`
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error(`Failed to load image: ${src}`))
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
  ctx.font = '500 14px system-ui, sans-serif'
  ctx.fillText('扫码链接', qrX + 16, qrY + qrSize / 2 - 4)
  ctx.font = '400 11px system-ui, sans-serif'
  const shortUrl = shareUrl.replace(/^https?:\/\//, '')
  ctx.fillText(shortUrl.slice(0, 24), qrX + 16, qrY + qrSize / 2 + 14)
}

export async function drawTopicSharePoster(
  canvas: HTMLCanvasElement,
  posterSrc: string,
  shareUrl: string
) {
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    throw new Error('Canvas context unavailable')
  }

  const poster = await loadImage(resolvePosterUrl(posterSrc))
  const width = poster.naturalWidth
  const height = poster.naturalHeight

  if (!width || !height) {
    throw new Error('Poster image has invalid dimensions')
  }

  canvas.width = width
  canvas.height = height

  ctx.drawImage(poster, 0, 0, width, height)

  const qrSize = Math.round(width * 0.2)
  const margin = Math.round(width * 0.035)
  const qrX = width - qrSize - margin
  const qrY = height - qrSize - margin
  const pad = Math.round(qrSize * 0.08)

  fillRoundedRect(
    ctx,
    qrX - pad,
    qrY - pad,
    qrSize + pad * 2,
    qrSize + pad * 2,
    Math.round(pad * 1.5),
    '#ffffff'
  )

  try {
    const qrDataUrl = await buildQrDataUrl(shareUrl)
    const qr = await loadImage(qrDataUrl)
    ctx.drawImage(qr, qrX, qrY, qrSize, qrSize)
  } catch (qrError) {
    console.error('Topic share poster QR failed:', qrError)
    drawQrFallback(ctx, qrX, qrY, qrSize, shareUrl)
  }
}
