'use client'

import {
  useEffect,
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

  useEffect(() => {
    const onWindowPointerMove = (event: PointerEvent) => {
      const drag = dragRef.current
      const viewport = viewportElementRef.current
      if (!drag || !viewport || event.pointerId !== drag.pointerId) return

      const distance = Math.abs(event.clientX - drag.startX)
      if (!drag.dragged) {
        if (distance < DRAG_THRESHOLD_PX) return
        drag.dragged = true
        setIsDragging(true)
      }

      event.preventDefault()
      const delta = drag.startX - event.clientX
      viewport.scrollLeft = drag.startScrollLeft + delta
    }

    const onWindowPointerEnd = (event: PointerEvent) => {
      const drag = dragRef.current
      if (!drag || event.pointerId !== drag.pointerId) return

      if (drag.dragged) {
        suppressClickRef.current = true
      }

      dragRef.current = null
      setIsDragging(false)
    }

    window.addEventListener('pointermove', onWindowPointerMove)
    window.addEventListener('pointerup', onWindowPointerEnd)
    window.addEventListener('pointercancel', onWindowPointerEnd)

    return () => {
      window.removeEventListener('pointermove', onWindowPointerMove)
      window.removeEventListener('pointerup', onWindowPointerEnd)
      window.removeEventListener('pointercancel', onWindowPointerEnd)
    }
  }, [])

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    // Touch uses native horizontal scroll (touch-action: pan-x on the viewport).
    if (event.pointerType === 'touch') return
    if (event.button !== 0) return

    const viewport = viewportElementRef.current
    if (!viewport) return

    dragRef.current = {
      startX: event.clientX,
      startScrollLeft: viewport.scrollLeft,
      dragged: false,
      pointerId: event.pointerId,
    }
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
      onClickCapture={onClickCapture}
    >
      <div className={cn('reading-bookshelf__track flex w-max', trackClassName)}>
        {children}
      </div>
    </div>
  )
}
