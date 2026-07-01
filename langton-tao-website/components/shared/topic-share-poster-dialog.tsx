'use client'

import {
  useCallback,
  useEffect,
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
import { drawTopicSharePoster } from '@/lib/topic-share/draw-topic-poster'
import { cn } from '@/lib/utils'

const CANVAS_RETRY_MAX = 12

type TopicSharePosterDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  topicTitle: string
  shareUrl: string
  posterSrc?: string | null
}

function slugifyFilename(title: string) {
  const safe = title
    .replace(/[^\u4e00-\u9fff\w\s-]/g, '')
    .trim()
    .slice(0, 32)
  return safe || 'topic-card'
}

export function TopicSharePosterDialog({
  open,
  onOpenChange,
  topicTitle,
  shareUrl,
  posterSrc,
}: TopicSharePosterDialogProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [posterReady, setPosterReady] = useState(false)
  const [posterError, setPosterError] = useState(false)
  const hasPoster = Boolean(posterSrc)

  const drawPoster = useCallback(async (): Promise<boolean> => {
    if (!posterSrc) return false

    const canvas = canvasRef.current
    if (!canvas) return false

    try {
      await drawTopicSharePoster(canvas, posterSrc, shareUrl)
      setPosterError(false)
      setPosterReady(true)
      return true
    } catch (error) {
      console.error('Topic share poster draw failed:', error)
      setPosterError(true)
      setPosterReady(true)
      return false
    }
  }, [posterSrc, shareUrl])

  useEffect(() => {
    if (!open || !hasPoster) {
      setPosterReady(false)
      setPosterError(false)
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
          window.setTimeout(run, attempts === 1 ? 32 : 48)
        } else if (!ready) {
          setPosterError(true)
          setPosterReady(true)
        }
      })
    }

    const frame = requestAnimationFrame(run)

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
    }
  }, [open, hasPoster, drawPoster])

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
    if (!canvas || posterError || !hasPoster) return
    const link = document.createElement('a')
    link.download = `langton-${slugifyFilename(topicTitle)}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
    toast.success('海报已下载')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="z-[140]" />
        <DialogPrimitive.Content
          className={cn(
            'topic-share-poster-dialog fixed left-1/2 top-1/2 z-[150] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2',
            'rounded-lg border-2 border-zinc-800 bg-white p-6 text-zinc-950 shadow-pop-black'
          )}
          aria-describedby="topic-share-poster-hint"
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-zinc-950">
              <Share2 className="h-5 w-5 text-pop-yellow" aria-hidden />
              分享话题卡片
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            {hasPoster ? (
              <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 p-3">
                <canvas
                  ref={canvasRef}
                  className="mx-auto block h-auto w-full max-w-[280px] rounded-lg"
                  aria-label="话题分享海报预览"
                />
                {!posterReady ? (
                  <p className="mt-2 text-center text-xs text-zinc-500">生成海报…</p>
                ) : null}
                {posterReady && posterError ? (
                  <p className="mt-2 text-center text-xs text-red-500">
                    生成失败，请关闭后重试
                  </p>
                ) : null}
              </div>
            ) : (
              <div className="topic-share-poster-dialog__upgrade">
                <p className="topic-share-poster-dialog__upgrade-title">卡片升级中</p>
                <p className="topic-share-poster-dialog__upgrade-desc">
                  该话题的分享海报正在制作，可先复制链接分享给朋友。
                </p>
              </div>
            )}

            <p id="topic-share-poster-hint" className="text-xs leading-relaxed text-zinc-500">
              扫码打开页面并定位到该话题卡片
            </p>

            <div className="flex flex-col gap-2">
              {hasPoster ? (
                <Button
                  type="button"
                  variant="default"
                  className="w-full"
                  onClick={handleDownload}
                  disabled={!posterReady || posterError}
                >
                  <Download className="h-4 w-4" />
                  下载海报
                </Button>
              ) : null}
              <Button type="button" variant="outline" size="sm" className="w-full" onClick={() => void handleCopyLink()}>
                <Copy className="h-3.5 w-3.5" />
                复制链接
              </Button>
            </div>
          </div>

          <DialogClose
            className="absolute right-4 top-4 rounded-md border border-zinc-200 p-1 text-zinc-500 hover:bg-zinc-100"
            aria-label="关闭"
          >
            <X className="h-4 w-4" />
          </DialogClose>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  )
}
