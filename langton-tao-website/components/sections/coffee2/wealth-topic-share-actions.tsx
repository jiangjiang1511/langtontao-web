'use client'

import {
  useCallback,
  useEffect,
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
  buildWealthTopicShareUrl,
  drawWealthTopicSharePoster,
} from '@/lib/wealth-topic/draw-poster'

const CANVAS_RETRY_MAX = 12

type WealthTopicShareActionsProps = {
  posterSrc: string
  topicTitle: string
  shareOpen: boolean
  onShareOpenChange: (open: boolean) => void
}

function slugifyFilename(title: string) {
  const safe = title
    .replace(/[^\u4e00-\u9fff\w\s-]/g, '')
    .trim()
    .slice(0, 32)
  return safe || 'wealth-topic'
}

type WealthTopicSharePosterOverlayProps = {
  open: boolean
  posterSrc: string
  topicTitle: string
  onClose: () => void
}

function WealthTopicSharePosterOverlay({
  open,
  posterSrc,
  topicTitle,
  onClose,
}: WealthTopicSharePosterOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [posterReady, setPosterReady] = useState(false)
  const [posterError, setPosterError] = useState(false)

  const shareUrl = useMemo(() => buildWealthTopicShareUrl(), [])

  const drawPoster = useCallback(async (): Promise<boolean> => {
    const canvas = canvasRef.current
    if (!canvas) return false

    try {
      await drawWealthTopicSharePoster(canvas, posterSrc, shareUrl)
      setPosterError(false)
      setPosterReady(true)
      return true
    } catch (error) {
      console.error('Wealth topic poster draw failed:', error)
      setPosterError(true)
      setPosterReady(true)
      return false
    }
  }, [posterSrc, shareUrl])

  useEffect(() => {
    if (!open) {
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
  }, [open, drawPoster])

  function handleDownload() {
    const canvas = canvasRef.current
    if (!canvas || posterError) return
    const link = document.createElement('a')
    link.download = `langton-${slugifyFilename(topicTitle)}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
    toast.success('海报已下载')
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) onClose()
      }}
    >
      <DialogPortal>
        <DialogOverlay className="z-[140]" />
        <DialogPrimitive.Content
          className={cn(
            'fixed left-1/2 top-1/2 z-[150] w-full max-w-md -translate-x-1/2 -translate-y-1/2',
            'rounded-lg border-2 border-zinc-800 bg-zinc-950 p-6 text-white shadow-pop-black'
          )}
          aria-describedby="wealth-share-overlay-hint"
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-white">
              <Share2 className="h-5 w-5 text-pop-yellow" aria-hidden />
              分享话题海报
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            <div className="cg-share-dialog-preview overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 p-3">
              <canvas
                ref={canvasRef}
                className="mx-auto block h-auto w-full max-w-[280px] rounded-lg"
                aria-label="财富话题分享海报预览"
              />
              {!posterReady ? (
                <p className="mt-2 text-center text-xs text-zinc-500">生成海报…</p>
              ) : null}
              {posterReady && posterError ? (
                <p className="mt-2 text-center text-xs text-red-400">
                  生成失败，请关闭后重试
                </p>
              ) : null}
            </div>

            <p
              id="wealth-share-overlay-hint"
              className="text-xs leading-relaxed text-zinc-400"
            >
              扫码打开熊比特咖啡 · 投资与生活话题
            </p>

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
  )
}

export function WealthTopicShareActions({
  posterSrc,
  topicTitle,
  shareOpen,
  onShareOpenChange,
}: WealthTopicShareActionsProps) {
  const shareUrl = useMemo(() => buildWealthTopicShareUrl(), [])

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl)
      toast.success('链接已复制')
    } catch {
      toast.error('复制失败，请手动复制链接')
    }
  }

  return (
    <>
      <div className="invest-wealth-topic-modal__share-band">
        <div className="invest-wealth-topic-modal__share debt-share-actions flex flex-col gap-3">
          <Button
            type="button"
            variant="default"
            className={cn(
              'coffee2-cta-button w-full justify-center gap-2',
              'min-w-0 px-6 py-3 text-base'
            )}
            onClick={() => onShareOpenChange(true)}
          >
            <Share2 className="h-4 w-4" />
            分享海报
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="cg-share-btn cg-share-btn-outline w-full justify-center"
            onClick={handleCopyLink}
          >
            <Copy className="h-3.5 w-3.5" />
            复制链接
          </Button>
        </div>
      </div>

      <WealthTopicSharePosterOverlay
        open={shareOpen}
        posterSrc={posterSrc}
        topicTitle={topicTitle}
        onClose={() => onShareOpenChange(false)}
      />
    </>
  )
}
