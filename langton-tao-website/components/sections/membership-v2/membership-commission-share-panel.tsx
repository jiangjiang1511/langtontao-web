'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Copy, Download, Share2 } from 'lucide-react'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import type { MembershipTierId } from '@/lib/content/membership'
import {
  getCommissionRuleLabel,
  membershipCommissionProducts,
  membershipCommissionTierLabels,
  type CommissionProductId,
} from '@/lib/content/membership-commission'

type MembershipCommissionSharePanelProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  tierId: MembershipTierId
  productId: CommissionProductId
  orderAmount: number
  commissionAmount: number
}

function buildShareUrl(
  tierId: MembershipTierId,
  productId: CommissionProductId,
  orderAmount: number
) {
  if (typeof window === 'undefined') {
    return `/member/commission?tier=${tierId}&product=${productId}&amount=${orderAmount}`
  }
  const url = new URL('/member/commission', window.location.origin)
  url.searchParams.set('tier', tierId)
  url.searchParams.set('product', productId)
  url.searchParams.set('amount', String(orderAmount))
  return url.toString()
}

function buildQrImageUrl(data: string) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=280x280&margin=12&data=${encodeURIComponent(data)}`
}

export function MembershipCommissionSharePanel({
  open,
  onOpenChange,
  tierId,
  productId,
  orderAmount,
  commissionAmount,
}: MembershipCommissionSharePanelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [posterReady, setPosterReady] = useState(false)

  const shareUrl = useMemo(
    () => buildShareUrl(tierId, productId, orderAmount),
    [tierId, productId, orderAmount]
  )

  const productName =
    membershipCommissionProducts.find((item) => item.id === productId)?.name ??
    '分享产品'

  const drawPoster = useCallback(async () => {
    const canvas = canvasRef.current
    if (!canvas) return

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

    ctx.strokeStyle = 'rgba(255, 230, 0, 0.35)'
    ctx.lineWidth = 3
    ctx.strokeRect(28, 28, width - 56, height - 56)

    ctx.fillStyle = '#ffe600'
    ctx.font = '700 22px "Noto Sans SC", system-ui, sans-serif'
    ctx.fillText('LANGTON TAO · MFO', 56, 96)

    ctx.fillStyle = '#ffffff'
    ctx.font = '700 52px "Noto Sans SC", system-ui, sans-serif'
    ctx.fillText('渠道收益计算器', 56, 170)

    ctx.fillStyle = 'rgba(255,255,255,0.72)'
    ctx.font = '500 24px "Noto Sans SC", system-ui, sans-serif'
    wrapText(
      ctx,
      '扫码进入独立试算页 · 选择档位与产品 · 即时查看推荐渠道收益',
      56,
      220,
      width - 112,
      34
    )

    ctx.fillStyle = '#ffe600'
    ctx.font = '700 28px "Noto Sans SC", system-ui, sans-serif'
    ctx.fillText(membershipCommissionTierLabels[tierId], 56, 360)

    ctx.fillStyle = '#ffffff'
    ctx.font = '600 26px "Noto Sans SC", system-ui, sans-serif'
    wrapText(ctx, productName, 56, 404, width - 112, 32)

    ctx.fillStyle = 'rgba(255,255,255,0.55)'
    ctx.font = '500 20px "Noto Sans SC", system-ui, sans-serif'
    ctx.fillText(
      `占位预估渠道收益 ¥${commissionAmount.toLocaleString('zh-CN')}`,
      56,
      470
    )
    ctx.fillText(getCommissionRuleLabel(tierId, productId), 56, 504)

    const qrSize = 240
    const qrX = width - qrSize - 56
    const qrY = height - qrSize - 120

    ctx.fillStyle = '#ffffff'
    ctx.beginPath()
    ctx.roundRect(qrX - 12, qrY - 12, qrSize + 24, qrSize + 24, 16)
    ctx.fill()

    try {
      const qr = await loadImage(buildQrImageUrl(shareUrl))
      ctx.drawImage(qr, qrX, qrY, qrSize, qrSize)
    } catch {
      ctx.fillStyle = '#09090b'
      ctx.font = '500 18px system-ui, sans-serif'
      ctx.fillText('QR', qrX + 100, qrY + 124)
    }

    ctx.fillStyle = 'rgba(255,255,255,0.45)'
    ctx.font = '500 18px "Noto Sans SC", system-ui, sans-serif'
    ctx.fillText('扫码打开计算器', qrX + 24, qrY + qrSize + 36)

    setPosterReady(true)
  }, [commissionAmount, productName, shareUrl, tierId, productId])

  useEffect(() => {
    if (!open) {
      setPosterReady(false)
      return
    }
    void drawPoster()
  }, [open, drawPoster])

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl)
      toast.success('链接已复制')
    } catch {
      toast.error('复制失败，请手动复制链接')
    }
  }

  function handleDownload() {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement('a')
    link.download = 'langton-commission-calculator.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
    toast.success('海报已下载')
  }

  async function handleNativeShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '朗敦道 · 渠道收益计算器',
          text: `${membershipCommissionTierLabels[tierId]} · ${productName}`,
          url: shareUrl,
        })
        return
      } catch {
        /* fall through */
      }
    }
    await handleCopyLink()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg border-zinc-800 bg-zinc-950 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <Share2 className="h-5 w-5 text-pop-yellow" />
            分享海报
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 p-3">
            <canvas
              ref={canvasRef}
              className="mx-auto block h-auto w-full max-w-[280px] rounded-lg"
              aria-label="渠道收益计算器分享海报预览"
            />
            {!posterReady ? (
              <p className="mt-2 text-center text-xs text-zinc-500">生成中…</p>
            ) : null}
          </div>

          <p className="text-xs leading-relaxed text-zinc-400">
            海报含二维码，扫码进入{' '}
            <span className="text-zinc-200">/member/commission</span>{' '}
            并带入当前档位、产品与金额参数。
          </p>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              type="button"
              variant="default"
              className="flex-1"
              onClick={handleDownload}
              disabled={!posterReady}
            >
              <Download className="h-4 w-4" />
              下载海报
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1 border-zinc-600 bg-transparent text-white hover:bg-zinc-800"
              onClick={handleNativeShare}
            >
              <Share2 className="h-4 w-4" />
              分享链接
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1 border-zinc-600 bg-transparent text-white hover:bg-zinc-800"
              onClick={handleCopyLink}
            >
              <Copy className="h-4 w-4" />
              复制链接
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
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
    image.crossOrigin = 'anonymous'
    image.onload = () => resolve(image)
    image.onerror = reject
    image.src = src
  })
}
