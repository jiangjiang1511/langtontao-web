'use client'

import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'
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
  membershipCommissionProducts,
  type CommissionProductId,
} from '@/lib/content/membership-commission'
import { drawCommissionPoster } from '@/lib/membership/draw-commission-poster'

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

  const drawPoster = useCallback(async (): Promise<boolean> => {
    const canvas = canvasRef.current
    if (!canvas) return false

    try {
      await drawCommissionPoster(canvas, {
        tierId,
        productId,
        productName,
        orderAmount,
        commissionAmount,
        shareUrl,
      })
    } catch (error) {
      console.error('Commission poster draw failed:', error)
    } finally {
      setPosterReady(true)
    }

    return true
  }, [commissionAmount, productName, shareUrl, tierId, productId])

  useLayoutEffect(() => {
    if (!open) {
      setPosterReady(false)
      return
    }

    let cancelled = false
    let attempts = 0

    const run = () => {
      if (cancelled) return
      void drawPoster().then((ready) => {
        if (cancelled) return
        if (!ready && attempts < 8) {
          attempts += 1
          requestAnimationFrame(run)
        }
      })
    }

    run()
    return () => {
      cancelled = true
    }
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
          title: '朗敦道 · 事业合伙人',
          text: `我分享了「${productName}」，预估可获得 ${commissionAmount.toLocaleString('zh-CN')} 元渠道收益。你也来一起吧！`,
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
            海报以「我分享了…你也来一起吧」话术呈现，扫码进入计算器并带入当前档位、产品与金额。
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
