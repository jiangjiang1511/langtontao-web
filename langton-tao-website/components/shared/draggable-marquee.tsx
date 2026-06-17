'use client'

import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactElement,
  type ReactNode,
} from 'react'
import { cn } from '@/lib/utils'

const DRAG_THRESHOLD_PX = 6
const DEFAULT_MARQUEE_DURATION_S = 45

type MarqueeDragContextValue = {
  suppressClick: boolean
}

const MarqueeDragContext = createContext<MarqueeDragContextValue>({
  suppressClick: false,
})

export function useMarqueeDragGuard() {
  return useContext(MarqueeDragContext)
}

type DraggableMarqueeProps = {
  children: ReactNode
  className?: string
  trackClassName?: string
  durationSeconds?: number
}

type DragState = {
  startX: number
  startTranslateX: number
  startScrollLeft: number
  dragged: boolean
  pointerId: number
  captureTarget: HTMLDivElement | null
}

function getTranslateX(element: HTMLElement) {
  const matrix = new DOMMatrixReadOnly(getComputedStyle(element).transform)
  return matrix.m41
}

function normalizeMarqueeOffset(offset: number, halfWidth: number) {
  if (halfWidth <= 0) return 0

  let x = offset % halfWidth
  if (x > 0) x -= halfWidth
  return x
}

function syncAnimationFromOffset(
  track: HTMLElement,
  offset: number,
  durationSeconds: number
) {
  const halfWidth = track.scrollWidth / 2
  if (halfWidth <= 0) return

  const normalized = normalizeMarqueeOffset(offset, halfWidth)
  const progress = -normalized / halfWidth

  track.style.animation = 'none'
  track.style.transform = `translateX(${normalized}px)`
  void track.offsetHeight
  track.style.animation = ''
  track.style.transform = ''
  track.style.animationDelay = `-${progress * durationSeconds}s`
  track.style.removeProperty('animation-play-state')
}

function cloneMarqueeSet(children: ReactNode, suffix: 'a' | 'b') {
  return Children.map(children, (child, index) => {
    if (!isValidElement(child)) return child

    const element = child as ReactElement<{ key?: string | number }>
    const baseKey = element.key ?? index

    return cloneElement(element, {
      key: `${String(baseKey)}-${suffix}`,
    })
  })
}

function duplicateForMarquee(children: ReactNode) {
  return (
    <>
      {cloneMarqueeSet(children, 'a')}
      {cloneMarqueeSet(children, 'b')}
    </>
  )
}

export function DraggableMarquee({
  children,
  className,
  trackClassName,
  durationSeconds = DEFAULT_MARQUEE_DURATION_S,
}: DraggableMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<DragState | null>(null)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [suppressClick, setSuppressClick] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const marqueeChildren = useMemo(() => duplicateForMarquee(children), [children])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduceMotion(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  const releaseCapture = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag?.captureTarget) return

    if (drag.captureTarget.hasPointerCapture(drag.pointerId)) {
      drag.captureTarget.releasePointerCapture(drag.pointerId)
    }
  }, [])

  const finishDrag = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>, dragged: boolean) => {
      if (dragged) {
        setSuppressClick(true)
        window.setTimeout(() => setSuppressClick(false), 0)
      }

      const track = trackRef.current
      if (track && !reduceMotion && dragged) {
        syncAnimationFromOffset(track, getTranslateX(track), durationSeconds)
      } else if (track && !reduceMotion) {
        track.style.removeProperty('animation-play-state')
      }

      releaseCapture(event)
      dragRef.current = null
      setIsDragging(false)
    },
    [durationSeconds, reduceMotion, releaseCapture]
  )

  const beginMarqueeDrag = (
    event: ReactPointerEvent<HTMLDivElement>,
    drag: DragState,
    track: HTMLDivElement
  ) => {
    const delta = event.clientX - drag.startX
    if (drag.dragged || Math.abs(delta) < DRAG_THRESHOLD_PX) return

    drag.dragged = true
    setIsDragging(true)

    const currentX = getTranslateX(track)
    drag.startTranslateX = currentX
    drag.startX = event.clientX

    track.style.animation = 'none'
    track.style.transform = `translateX(${currentX}px)`

    event.currentTarget.setPointerCapture(event.pointerId)
    drag.captureTarget = event.currentTarget
    drag.pointerId = event.pointerId
  }

  const onMarqueePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return

    const track = trackRef.current
    if (!track) return

    dragRef.current = {
      startX: event.clientX,
      startTranslateX: getTranslateX(track),
      startScrollLeft: 0,
      dragged: false,
      pointerId: event.pointerId,
      captureTarget: null,
    }
  }

  const onMarqueePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    const track = trackRef.current
    if (!drag || !track) return

    if (!drag.dragged) {
      beginMarqueeDrag(event, drag, track)
    }

    if (!drag.dragged) return

    const delta = event.clientX - drag.startX
    track.style.transform = `translateX(${drag.startTranslateX + delta}px)`
  }

  const onMarqueePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag) return

    finishDrag(event, drag.dragged)
  }

  const beginScrollDrag = (
    event: ReactPointerEvent<HTMLDivElement>,
    drag: DragState
  ) => {
    const delta = event.clientX - drag.startX
    if (drag.dragged || Math.abs(delta) < DRAG_THRESHOLD_PX) return

    drag.dragged = true
    setIsDragging(true)

    event.currentTarget.setPointerCapture(event.pointerId)
    drag.captureTarget = event.currentTarget
    drag.pointerId = event.pointerId
  }

  const onScrollPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return

    const scroll = scrollRef.current
    if (!scroll) return

    dragRef.current = {
      startX: event.clientX,
      startTranslateX: 0,
      startScrollLeft: scroll.scrollLeft,
      dragged: false,
      pointerId: event.pointerId,
      captureTarget: null,
    }
  }

  const onScrollPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    const scroll = scrollRef.current
    if (!drag || !scroll) return

    if (!drag.dragged) {
      beginScrollDrag(event, drag)
    }

    if (!drag.dragged) return

    const delta = drag.startX - event.clientX
    scroll.scrollLeft = drag.startScrollLeft + delta
  }

  const onScrollPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag) return

    finishDrag(event, drag.dragged)
  }

  if (reduceMotion) {
    return (
      <MarqueeDragContext.Provider value={{ suppressClick }}>
        <div
          ref={scrollRef}
          className={cn(
            'coffee2-draggable-marquee coffee2-draggable-marquee--scroll overflow-x-auto',
            isDragging && 'coffee2-draggable-marquee--dragging',
            className
          )}
          onPointerDown={onScrollPointerDown}
          onPointerMove={onScrollPointerMove}
          onPointerUp={onScrollPointerUp}
          onPointerCancel={onScrollPointerUp}
        >
          <div className={cn('flex w-max gap-4', trackClassName)}>{children}</div>
        </div>
      </MarqueeDragContext.Provider>
    )
  }

  return (
    <MarqueeDragContext.Provider value={{ suppressClick }}>
      <div
        className={cn(
          'coffee2-draggable-marquee overflow-hidden',
          isDragging && 'coffee2-draggable-marquee--dragging',
          isHovered && 'coffee2-draggable-marquee--hover-paused',
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onPointerDown={onMarqueePointerDown}
        onPointerMove={onMarqueePointerMove}
        onPointerUp={onMarqueePointerUp}
        onPointerCancel={onMarqueePointerUp}
      >
        <div
          ref={trackRef}
          className={cn(
            'flex w-max animate-marquee gap-4 motion-reduce:animate-none',
            isDragging && 'coffee2-draggable-marquee__track--dragging',
            trackClassName
          )}
        >
          {marqueeChildren}
        </div>
      </div>
    </MarqueeDragContext.Provider>
  )
}
