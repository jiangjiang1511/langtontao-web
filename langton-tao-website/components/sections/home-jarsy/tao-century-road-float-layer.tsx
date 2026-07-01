'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import {
  TAO_ROAD_FLOAT_TOKENS,
  TAO_ROAD_FLOAT_TOKENS_MOBILE,
  depthStyle,
  type TaoRoadFloatToken,
} from '@/lib/content/tao-century-road'
import { cn } from '@/lib/utils'

type TaoCenturyRoadFloatLayerProps = {
  active: boolean
  reducedMotion: boolean
}

type TokenTransform = {
  x: number
  y: number
  opacity: number
  blur: number
  scale: number
  rotate: number
}

function computeTransform(
  token: TaoRoadFloatToken,
  time: number,
  width: number,
  height: number
): TokenTransform {
  const drift = time * token.driftSpeed
  const x =
    token.baseX * width +
    Math.sin(drift + token.zPhase) * width * 0.028 +
    Math.cos(drift * 0.7 + token.zPhase) * width * 0.012
  const y =
    token.baseY * height +
    Math.cos(drift * 0.9 + token.zPhase) * height * 0.032 +
    Math.sin(drift * 0.55) * height * 0.014
  const z = Math.sin(drift * 0.65 + token.zPhase) * 42
  const depth = depthStyle(z, 48)

  return {
    x: x - width / 2,
    y: y - height / 2,
    opacity: depth.opacity * 0.55,
    blur: depth.blur,
    scale: depth.scale * 0.92,
    rotate: token.rotate + Math.sin(drift * 0.4) * 4,
  }
}

export function TaoCenturyRoadFloatLayer({
  active,
  reducedMotion,
}: TaoCenturyRoadFloatLayerProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const tokenRefs = useRef<(HTMLSpanElement | null)[]>([])
  const rafRef = useRef(0)
  const startRef = useRef(0)
  const [isMobile, setIsMobile] = useState(false)

  const displayTokens = isMobile ? TAO_ROAD_FLOAT_TOKENS_MOBILE : TAO_ROAD_FLOAT_TOKENS

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage || !active) return

    const tokens = () => (isMobile ? TAO_ROAD_FLOAT_TOKENS_MOBILE : TAO_ROAD_FLOAT_TOKENS)

    const applyStatic = () => {
      const rect = stage.getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      const list = tokens()

      list.forEach((token, index) => {
        const el = tokenRefs.current[index]
        if (!el) return
        const transform = computeTransform(token, 0, width, height)
        el.style.opacity = String(active ? transform.opacity : 0)
        el.style.filter = transform.blur > 0 ? `blur(${transform.blur}px)` : 'none'
        el.style.transform = `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${transform.scale}) rotate(${transform.rotate}deg)`
      })
    }

    if (reducedMotion) {
      applyStatic()
      return
    }

    const tick = (now: number) => {
      if (!startRef.current) startRef.current = now
      const elapsed = (now - startRef.current) / 1000
      const rect = stage.getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      const list = tokens()
      const fadeIn = Math.min(1, elapsed / 1.2)

      list.forEach((token, index) => {
        const el = tokenRefs.current[index]
        if (!el) return
        const transform = computeTransform(token, elapsed, width, height)
        el.style.opacity = String(transform.opacity * fadeIn)
        el.style.filter = transform.blur > 0 ? `blur(${transform.blur}px)` : 'none'
        el.style.transform = `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${transform.scale}) rotate(${transform.rotate}deg)`
      })

      rafRef.current = requestAnimationFrame(tick)
    }

    startRef.current = 0
    rafRef.current = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(rafRef.current)
  }, [active, isMobile, reducedMotion])

  return (
    <div
      ref={stageRef}
      className={cn(
        'tao-century-road__float-layer',
        active && 'tao-century-road__float-layer--active'
      )}
      aria-hidden
    >
      {displayTokens.map((token, index) => (
        <span
          key={token.id}
          ref={(el) => {
            tokenRefs.current[index] = el
          }}
          className={cn(
            'tao-century-road__float-token',
            'home-jarsy-hero-formula-orbit__token',
            `home-jarsy-hero-formula-orbit__token--${token.kind}`
          )}
          style={
            {
              opacity: 0,
              '--float-index': index,
            } as CSSProperties
          }
        >
          {token.label}
        </span>
      ))}
    </div>
  )
}
