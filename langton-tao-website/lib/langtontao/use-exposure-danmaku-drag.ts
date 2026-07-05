'use client'

import { useCallback, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'

const DRAG_THRESHOLD_PX = 6
const VERTICAL_BLEED_PX = 12

type DragState = {
  pointerId: number
  startClientX: number
  startClientY: number
  originX: number
  originY: number
  dragged: boolean
}

function getTransformTranslation(element: HTMLElement) {
  const matrix = new DOMMatrixReadOnly(getComputedStyle(element).transform)
  return { x: matrix.m41, y: matrix.m42 }
}

function getDriftBounds(element: HTMLElement) {
  const viewportWidth = window.innerWidth
  const cardWidth = element.offsetWidth
  const startX = viewportWidth * 1.1
  const endX = -cardWidth * 1.3
  return { startX, endX, travel: endX - startX }
}

function syncDriftAnimation(element: HTMLElement, durationSec: number) {
  const { x } = getTransformTranslation(element)
  const { startX, travel } = getDriftBounds(element)
  if (travel === 0) return

  const progress = Math.min(1, Math.max(0, (x - startX) / travel))
  const delaySec = progress * durationSec

  element.style.animation = 'none'
  element.style.transform = getComputedStyle(element).transform
  void element.offsetHeight
  element.style.animation = ''
  element.style.removeProperty('transform')
  element.style.animationDelay = `-${delaySec}s`
  element.style.removeProperty('animation-play-state')
}

type UseExposureDanmakuDragOptions = {
  durationSec: number
  rotateDeg: number
  scale: number
  stageRef: React.RefObject<HTMLElement | null>
  onDragStarted?: () => void
  onDragEnded?: (dragged: boolean) => void
}

export function useExposureDanmakuDrag({
  durationSec,
  rotateDeg,
  scale,
  stageRef,
  onDragStarted,
  onDragEnded,
}: UseExposureDanmakuDragOptions) {
  const elementRef = useRef<HTMLButtonElement>(null)
  const dragRef = useRef<DragState | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [suppressClick, setSuppressClick] = useState(false)

  const applyDragTransform = useCallback(
    (x: number, y: number) => {
      const element = elementRef.current
      if (!element) return
      element.style.transform = `translate(${x}px, ${y}px) translateY(-50%) scale(${scale}) rotate(${rotateDeg}deg)`
    },
    [rotateDeg, scale]
  )

  const clampY = useCallback(
    (y: number, element: HTMLElement) => {
      const stage = stageRef.current
      if (!stage) return y
      const halfHeight = element.offsetHeight / 2
      const minY = halfHeight + VERTICAL_BLEED_PX - element.offsetTop
      const maxY =
        stage.clientHeight - halfHeight - VERTICAL_BLEED_PX - element.offsetTop
      return Math.min(maxY, Math.max(minY, y))
    },
    [stageRef]
  )

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLButtonElement>) => {
      if (event.button !== 0) return
      const element = elementRef.current
      if (!element) return

      const { x, y } = getTransformTranslation(element)
      element.style.animationPlayState = 'paused'

      dragRef.current = {
        pointerId: event.pointerId,
        startClientX: event.clientX,
        startClientY: event.clientY,
        originX: x,
        originY: y,
        dragged: false,
      }

      element.setPointerCapture(event.pointerId)
    },
    []
  )

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLButtonElement>) => {
      const drag = dragRef.current
      const element = elementRef.current
      if (!drag || !element || drag.pointerId !== event.pointerId) return

      const deltaX = event.clientX - drag.startClientX
      const deltaY = event.clientY - drag.startClientY

      if (!drag.dragged && Math.hypot(deltaX, deltaY) < DRAG_THRESHOLD_PX) return

      if (!drag.dragged) {
        drag.dragged = true
        setIsDragging(true)
        onDragStarted?.()
      }

      const nextX = drag.originX + deltaX
      const nextY = clampY(drag.originY + deltaY, element)
      applyDragTransform(nextX, nextY)
    },
    [applyDragTransform, clampY, onDragStarted]
  )

  const finishDrag = useCallback(
    (event: ReactPointerEvent<HTMLButtonElement>) => {
      const drag = dragRef.current
      const element = elementRef.current
      if (!drag || !element || drag.pointerId !== event.pointerId) return

      const dragged = drag.dragged

      if (dragged) {
        const { y } = getTransformTranslation(element)
        if (y !== 0) {
          element.style.top = `${element.offsetTop + y}px`
        }
        syncDriftAnimation(element, durationSec)
        setSuppressClick(true)
        window.setTimeout(() => setSuppressClick(false), 0)
      } else {
        element.style.removeProperty('animation-play-state')
      }

      if (element.hasPointerCapture(event.pointerId)) {
        element.releasePointerCapture(event.pointerId)
      }

      dragRef.current = null
      setIsDragging(false)
      onDragEnded?.(dragged)
    },
    [durationSec, onDragEnded]
  )

  const handlePointerUp = useCallback(
    (event: ReactPointerEvent<HTMLButtonElement>) => {
      finishDrag(event)
    },
    [finishDrag]
  )

  const handlePointerCancel = useCallback(
    (event: ReactPointerEvent<HTMLButtonElement>) => {
      finishDrag(event)
    },
    [finishDrag]
  )

  return {
    elementRef,
    isDragging,
    suppressClick,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerCancel,
  }
}
