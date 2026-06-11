'use client'

import { useEffect, useRef, useState } from 'react'

/** 入场：区块中心在屏幕中心下方此比例内即提前触发（越大越早） */
export const CENTER_ENTER_LEAD_RATIO = 0.38

/** 退场：组件顶部距视口底边的容差（px），触达后再触发退场 */
export const EXIT_VIEWPORT_BOTTOM_MARGIN = 24

export const CENTER_MOTION_STAGGER_MS = 180

/**
 * 中央触发 reveal，方向感知：
 * - 向下浏览（scrollY 增加）：进入提前入场区域时入场，离开后保持可见
 * - 向上返回（scrollY 减少）：组件顶部触达视口底边时退场
 */
export function useCenterZoneVisible<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    let frame = 0

    const updateVisibility = (isInitial = false) => {
      const scrollY = window.scrollY
      const scrollingDown = scrollY > lastScrollY.current
      const scrollingUp = scrollY < lastScrollY.current
      lastScrollY.current = scrollY

      const rect = element.getBoundingClientRect()
      const elementCenterY = rect.top + rect.height / 2
      const viewportCenterY = window.innerHeight / 2
      const viewportHeight = window.innerHeight
      const enterLead = viewportHeight * CENTER_ENTER_LEAD_RATIO
      const inEnterZone =
        elementCenterY <= viewportCenterY + enterLead &&
        rect.bottom > 0 &&
        rect.top < viewportHeight
      const touchesViewportBottom =
        rect.top >= viewportHeight - EXIT_VIEWPORT_BOTTOM_MARGIN

      setVisible((prev) => {
        if (isInitial && inEnterZone) return true
        if (scrollingDown && inEnterZone) return true
        if (scrollingUp && touchesViewportBottom) return false
        return prev
      })
    }

    const onScrollOrResize = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => updateVisibility(false))
    }

    lastScrollY.current = window.scrollY
    updateVisibility(true)
    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
    }
  }, [])

  return { ref, visible }
}
