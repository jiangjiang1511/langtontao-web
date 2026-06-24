'use client'

import {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Copy, Download, Share2, X } from 'lucide-react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import {
  buildCompoundOverviewShareUrl,
  buildCompoundShareUrl,
  drawCompoundGrowthOverviewPoster,
  drawCompoundGrowthPoster,
} from '@/lib/compound-growth/draw-poster'
import type { CompoundGrowthSeries } from '@/lib/compound-growth/types'

const CANVAS_RETRY_MAX = 5

type CompoundGrowthShareActionsProps =
  | { mode: 'single'; series: CompoundGrowthSeries }
  | { mode: 'overview'; seriesList: CompoundGrowthSeries[] }

export function CompoundGrowthShareActions(props: CompoundGrowthShareActionsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [posterOpen, setPosterOpen] = useState(false)
  const [posterReady, setPosterReady] = useState(false)

  const shareUrl = useMemo(() => {
    if (props.mode === 'overview') {
      return buildCompoundOverviewShareUrl()
    }
    return buildCompoundShareUrl(props.series.slug)
  }, [props])

  const downloadName = useMemo(() => {
    if (props.mode === 'overview') return 'langton-compound-overview.png'
    return `langton-compound-${props.series.slug}.png`
  }, [props])

  const drawPoster = useCallback(async (): Promise<boolean> => {
    const canvas = canvasRef.current
    if (!canvas) return false

    try {
      if (props.mode === 'overview') {
        await drawCompoundGrowthOverviewPoster(canvas, props.seriesList, shareUrl)
      } else {
        await drawCompoundGrowthPoster(canvas, props.series, shareUrl)
      }
    } catch (error) {
      console.error('Compound growth poster draw failed:', error)
    } finally {
      setPosterReady(true)
    }

    return true
  }, [props, shareUrl])

  useLayoutEffect(() => {
    if (!posterOpen) {
      setPosterReady(false)
      return
    }

    let cancelled = false
    let attempts = 0

    const run = () => {
      if (cancelled) return

      void drawPoster().then((ready) => {
        if (cancelled) return
        if (!ready && attempts < CANVAS_RETRY_MAX) {
          attempts += 1
          requestAnimationFrame(run)
        }
      })
    }

    run()

    return () => {
      cancelled = true
    }
  }, [posterOpen, drawPoster])

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
    link.download = downloadName
    link.href = canvas.toDataURL('image/png')
    link.click()
    toast.success('海报已下载')
  }

  return (
    <>
      <div className="cg-share-actions">
        <div className="cg-share-buttons">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="cg-share-btn cg-share-btn-outline"
            onClick={() => setPosterOpen(true)}
          >
            <Share2 className="h-3.5 w-3.5" />
            分享
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="cg-share-btn cg-share-btn-outline"
            onClick={handleCopyLink}
          >
            <Copy className="h-3.5 w-3.5" />
            复制链接
          </Button>
        </div>
      </div>

      <Dialog open={posterOpen} onOpenChange={setPosterOpen}>
        <DialogPortal>
          <DialogOverlay className="z-[120]" />
          <DialogPrimitive.Content
            className={cn(
              'fixed left-1/2 top-1/2 z-[130] w-full max-w-md -translate-x-1/2 -translate-y-1/2',
              'rounded-lg border-2 border-zinc-800 bg-zinc-950 p-6 text-white shadow-pop-black'
            )}
          >
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-white">
                <Share2 className="h-5 w-5 text-pop-yellow" />
                {props.mode === 'overview' ? '分享复利对比海报' : '分享复利海报'}
              </DialogTitle>
            </DialogHeader>

            <div className="mt-4 space-y-4">
              <div className="cg-share-dialog-preview overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 p-3">
                <canvas
                  ref={canvasRef}
                  className="mx-auto block h-auto w-full max-w-[280px] rounded-lg"
                  aria-label="复利见证分享海报预览"
                />
                {!posterReady ? (
                  <p className="mt-2 text-center text-xs text-zinc-500">生成海报…</p>
                ) : null}
              </div>

              <p className="text-xs leading-relaxed text-zinc-400">
                分享海报，与朋友一起见证复利奇迹
              </p>

              <Button
                type="button"
                variant="default"
                className="w-full"
                onClick={handleDownload}
                disabled={!posterReady}
              >
                <Download className="h-4 w-4" />
                下载海报
              </Button>
            </div>

            <DialogClose
              className="absolute right-4 top-4 rounded-md border border-zinc-600 p-1 text-zinc-300 hover:bg-zinc-800"
              aria-label="关闭"
            >
              <X className="h-4 w-4" />
            </DialogClose>
          </DialogPrimitive.Content>
        </DialogPortal>
      </Dialog>
    </>
  )
}
