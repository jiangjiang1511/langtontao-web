'use client'

import {
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type Ref,
  type ReactNode,
} from 'react'
import { cn } from '@/lib/utils'

const DRAG_THRESHOLD_PX = 6

type DragState = {
  startX: number
  startScrollLeft: number
  dragged: boolean
  pointerId: number
  captureTarget: HTMLDivElement | null
}

export function DraggableScrollRow({
  children,
  className,
  trackClassName,
  ariaLabel,
  containerRef,
}: {
  children: ReactNode
  className?: string
  trackClassName?: string
  ariaLabel?: string
  containerRef?: Ref<HTMLDivElement>
}) {
  const viewportElementRef = useRef<HTMLDivElement | null>(null)
  const dragRef = useRef<DragState | null>(null)
  const suppressClickRef = useRef(false)
  const [isDragging, setIsDragging] = useState(false)

  const finishDrag = (
    event: ReactPointerEvent<HTMLDivElement>,
    didDrag: boolean
  ) => {
    const drag = dragRef.current
    if (!drag) return

    if (drag.captureTarget) {
      drag.captureTarget.releasePointerCapture(drag.pointerId)
    }

    dragRef.current = null
    if (didDrag) {
      suppressClickRef.current = true
    }
    setIsDragging(false)
  }

  const beginDrag = (
    event: ReactPointerEvent<HTMLDivElement>,
    drag: DragState
  ) => {
    const viewport = viewportElementRef.current
    if (!viewport) return

    const distance = Math.abs(event.clientX - drag.startX)
    if (distance < DRAG_THRESHOLD_PX) return

    drag.dragged = true
    drag.captureTarget = viewport
    viewport.setPointerCapture(event.pointerId)
    setIsDragging(true)
  }

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 && event.pointerType !== 'touch') return

    const viewport = viewportElementRef.current
    if (!viewport) return

    dragRef.current = {
      startX: event.clientX,
      startScrollLeft: viewport.scrollLeft,
      dragged: false,
      pointerId: event.pointerId,
      captureTarget: null,
    }
  }

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    const viewport = viewportElementRef.current
    if (!drag || !viewport) return

    if (!drag.dragged) {
      beginDrag(event, drag)
    }

    if (!drag.dragged) return

    const delta = drag.startX - event.clientX
    viewport.scrollLeft = drag.startScrollLeft + delta
  }

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag) return
    finishDrag(event, drag.dragged)
  }

  const onClickCapture = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!suppressClickRef.current) return
    suppressClickRef.current = false
    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <div
      ref={(element) => {
        viewportElementRef.current = element
        if (typeof containerRef === 'function') {
          containerRef(element)
        } else if (containerRef) {
          containerRef.current = element
        }
      }}
      aria-label={ariaLabel}
      className={cn(
        'reading-bookshelf__viewport coffee2-draggable-marquee coffee2-draggable-marquee--scroll overflow-x-auto',
        isDragging && 'coffee2-draggable-marquee--dragging',
        className
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onClickCapture={onClickCapture}
    >
      <div className={cn('reading-bookshelf__track flex w-max', trackClassName)}>
        {children}
      </div>
    </div>
  )
}
