'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

type Community2ProgramGalleryProps = {
  programTitle: string
  gallery: readonly string[]
  previewCount?: number
  collapsible?: boolean
}

export function Community2ProgramGallery({
  programTitle,
  gallery,
  previewCount = 3,
  collapsible = false,
}: Community2ProgramGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [expanded, setExpanded] = useState(false)
  const [allowCollapse, setAllowCollapse] = useState(false)
  const isOpen = activeIndex !== null
  const canCollapse = collapsible && allowCollapse && gallery.length > previewCount
  const visibleGallery =
    canCollapse && !expanded ? gallery.slice(0, previewCount) : gallery

  useEffect(() => {
    setExpanded(false)
  }, [programTitle, gallery])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const sync = () => setAllowCollapse(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const close = useCallback(() => setActiveIndex(null), [])

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return null
      return (current - 1 + gallery.length) % gallery.length
    })
  }, [gallery.length])

  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return null
      return (current + 1) % gallery.length
    })
  }, [gallery.length])

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowLeft') showPrevious()
      if (event.key === 'ArrowRight') showNext()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [close, isOpen, showNext, showPrevious])

  const activeSrc = activeIndex !== null ? gallery[activeIndex] : null

  return (
    <>
      <div className="c2-gallery-shell mt-4">
        <div
          className={cn(
            'c2-gallery pb-2',
            canCollapse && !expanded && 'c2-gallery--preview',
            canCollapse && expanded && 'c2-gallery--expanded'
          )}
        >
          {visibleGallery.map((src, imageIndex) => (
            <button
              key={`${programTitle}-${src}`}
              type="button"
              className={cn(
                'c2-gallery-item relative h-36 w-[min(72vw,17.5rem)] shrink-0 overflow-hidden rounded-xl border border-zinc-200',
                'cursor-zoom-in transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950',
                'sm:h-40 sm:w-56 md:h-48 md:w-64'
              )}
              onClick={() => setActiveIndex(imageIndex)}
              aria-label={`放大查看 ${programTitle} 活动图 ${imageIndex + 1}`}
            >
              <Image
                src={src}
                alt={`${programTitle} 活动图 ${imageIndex + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 72vw, 256px"
              />
            </button>
          ))}
        </div>
        {canCollapse ? (
          <button
            type="button"
            className="c2-gallery-toggle"
            aria-expanded={expanded}
            onClick={() => setExpanded((value) => !value)}
          >
            {expanded ? '收起图集' : `展开全部（${gallery.length} 张）`}
          </button>
        ) : null}
      </div>

      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) close()
        }}
      >
        <DialogContent
          className={cn(
            'max-w-[min(92vw,56rem)] overflow-hidden rounded-2xl border border-zinc-200 bg-white p-0 shadow-2xl',
            '[&>button]:right-3 [&>button]:top-3 [&>button]:rounded-full [&>button]:border-zinc-200 [&>button]:bg-white/90 [&>button]:shadow-sm [&>button]:hover:bg-white'
          )}
        >
          {activeSrc && activeIndex !== null ? (
            <>
              <DialogTitle className="sr-only">
                {programTitle} 活动图 {activeIndex + 1}
              </DialogTitle>

              <div className="relative flex min-h-[240px] items-center justify-center bg-zinc-950 px-3 py-10 sm:px-6">
                <Image
                  src={activeSrc}
                  alt={`${programTitle} 活动图 ${activeIndex + 1}`}
                  width={1600}
                  height={1200}
                  className="max-h-[76vh] w-auto max-w-full object-contain"
                  sizes="92vw"
                  priority
                />

                {gallery.length > 1 ? (
                  <>
                    <button
                      type="button"
                      onClick={showPrevious}
                      className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60"
                      aria-label="上一张"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={showNext}
                      className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60"
                      aria-label="下一张"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                ) : null}
              </div>

              <p className="px-4 py-3 text-center text-sm text-zinc-500">
                {programTitle} · {activeIndex + 1} / {gallery.length}
              </p>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  )
}
