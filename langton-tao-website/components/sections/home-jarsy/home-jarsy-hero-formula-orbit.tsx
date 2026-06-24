'use client'

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react'
import {
  FORMULA_PHASE_MS,
  FORMULA_TOKENS,
  buildSnapLayout,
  depthStyle,
  getOrbitPosition,
  holdTransformsFromLayout,
  type FormulaPhase,
  type FormulaTokenConfig,
} from '@/lib/content/home-jarsy-hero-formula'
import {
  HOME_JARSY_FORMULA_ORBIT_RING_TICKS_INNER,
  HOME_JARSY_FORMULA_ORBIT_RING_TICKS_OUTER,
} from '@/lib/orbit-ring-geometry'
import { cn } from '@/lib/utils'

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function easeInCubic(t: number) {
  return t * t * t
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

type TokenTransform = {
  x: number
  y: number
  z: number
  opacity: number
  blur: number
  scale: number
}

function computeOrbitTransforms(
  tokens: FormulaTokenConfig[],
  angle: number,
  maxRadius: number
): TokenTransform[] {
  return tokens.map((token) => {
    const { x, y, z } = getOrbitPosition(token, angle, maxRadius)
    const depth = depthStyle(z, maxRadius)
    return { x, y, z, ...depth }
  })
}

function computeSnapTransforms(
  from: TokenTransform[],
  targets: Array<{ x: number; y: number }>,
  rowScale: number,
  eased: number
): TokenTransform[] {
  return from.map((start, index) => {
    const target = targets[index]
    return {
      x: lerp(start.x, target.x, eased),
      y: lerp(start.y, target.y, eased),
      z: lerp(start.z, 0, eased),
      opacity: lerp(start.opacity, 0.92, eased),
      blur: lerp(start.blur, 0, eased),
      scale: lerp(start.scale, rowScale, eased),
    }
  })
}

function computeExplodeTransforms(
  from: TokenTransform[],
  angle: number,
  maxRadius: number,
  eased: number
): TokenTransform[] {
  const orbitTargets = computeOrbitTransforms(FORMULA_TOKENS, angle, maxRadius)
  return from.map((start, index) => {
    const target = orbitTargets[index]
    return {
      x: lerp(start.x, target.x, eased),
      y: lerp(start.y, target.y, eased),
      z: lerp(start.z, target.z, eased),
      opacity: lerp(start.opacity, target.opacity, eased),
      blur: lerp(start.blur, target.blur, eased),
      scale: lerp(start.scale, target.scale, eased),
    }
  })
}

function OrbitRings() {
  return (
    <div className="home-jarsy-hero-formula-orbit__rings" aria-hidden>
      <svg
        className="home-jarsy-hero-formula-orbit__rings-svg home-jarsy-hero-formula-orbit__rings-svg--1"
        viewBox="0 0 400 400"
        role="presentation"
      >
        <circle cx="200" cy="200" r="168" fill="none" />
        {HOME_JARSY_FORMULA_ORBIT_RING_TICKS_OUTER.map((tick, index) => (
          <line
            key={index}
            x1={tick.x1}
            y1={tick.y1}
            x2={tick.x2}
            y2={tick.y2}
          />
        ))}
      </svg>
      <svg
        className="home-jarsy-hero-formula-orbit__rings-svg home-jarsy-hero-formula-orbit__rings-svg--2"
        viewBox="0 0 400 400"
        role="presentation"
      >
        <circle cx="200" cy="200" r="128" fill="none" strokeDasharray="6 8" />
        {HOME_JARSY_FORMULA_ORBIT_RING_TICKS_INNER.map((tick, index) => (
          <line
            key={index}
            x1={tick.x1}
            y1={tick.y1}
            x2={tick.x2}
            y2={tick.y2}
          />
        ))}
      </svg>
      <svg
        className="home-jarsy-hero-formula-orbit__rings-svg home-jarsy-hero-formula-orbit__rings-svg--3"
        viewBox="0 0 400 400"
        role="presentation"
      >
        <ellipse cx="200" cy="200" rx="188" ry="72" fill="none" />
        <ellipse cx="200" cy="200" rx="72" ry="188" fill="none" />
      </svg>
    </div>
  )
}

export function HomeJarsyHeroFormulaOrbit() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const tokenRefs = useRef<(HTMLSpanElement | null)[]>([])
  const rafRef = useRef<number>(0)
  const phaseRef = useRef<FormulaPhase>('hold')
  const phaseStartRef = useRef(0)
  const orbitAngleRef = useRef(0)
  const snapFromRef = useRef<TokenTransform[]>([])
  const holdTransformsRef = useRef<TokenTransform[]>([])
  const maxRadiusRef = useRef(280)
  const snapTargetsRef = useRef<Array<{ x: number; y: number }>>([])
  const rowScaleRef = useRef(1)
  const reducedMotionRef = useRef(false)

  const [glitching, setGlitching] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  const applyTransforms = useCallback((transforms: TokenTransform[]) => {
    transforms.forEach((t, index) => {
      const el = tokenRefs.current[index]
      if (!el) return
      el.style.transform = `translate3d(calc(-50% + ${t.x}px), calc(-50% + ${t.y}px), ${t.z}px) scale(${t.scale})`
      el.style.opacity = String(t.opacity)
      el.style.filter = t.blur > 0.1 ? `blur(${t.blur}px)` : 'none'
    })
  }, [])

  const measure = useCallback(() => {
    const stage = stageRef.current
    if (!stage) return false

    const { width, height } = stage.getBoundingClientRect()
    maxRadiusRef.current = Math.max(width * 0.46, height * 0.28)

    const tokenWidths = tokenRefs.current.map((el) => el?.offsetWidth ?? 0)
    const layout = buildSnapLayout(width, tokenWidths)

    if (!layout.targets.length) return false

    snapTargetsRef.current = layout.targets
    rowScaleRef.current = layout.rowScale
    holdTransformsRef.current = holdTransformsFromLayout(layout)
    return true
  }, [])

  const refreshHoldTransforms = useCallback(() => {
    if (measure()) {
      const phase = phaseRef.current
      if (phase === 'hold' || phase === 'glitch') {
        applyTransforms(holdTransformsRef.current)
      }
    }
  }, [applyTransforms, measure])

  const tick = useCallback(
    (now: number) => {
      if (!phaseStartRef.current) phaseStartRef.current = now

      const phase = phaseRef.current
      const elapsed = now - phaseStartRef.current
      const duration = FORMULA_PHASE_MS[phase]
      const tokens = FORMULA_TOKENS
      const maxRadius = maxRadiusRef.current
      const targets = snapTargetsRef.current
      const rowScale = rowScaleRef.current

      if (reducedMotionRef.current) {
        if (holdTransformsRef.current.length) {
          applyTransforms(holdTransformsRef.current)
        }
        return
      }

      if (phase === 'orbit') {
        orbitAngleRef.current += 0.004
      }

      let transforms: TokenTransform[]

      switch (phase) {
        case 'hold': {
          transforms = holdTransformsRef.current
          if (elapsed >= duration) {
            phaseRef.current = 'glitch'
            phaseStartRef.current = now
            setGlitching(true)
          }
          break
        }
        case 'glitch': {
          transforms = holdTransformsRef.current
          if (elapsed >= duration) {
            setGlitching(false)
            snapFromRef.current = transforms
            phaseRef.current = 'explode'
            phaseStartRef.current = now
          }
          break
        }
        case 'explode': {
          const t = Math.min(1, elapsed / duration)
          transforms = computeExplodeTransforms(
            snapFromRef.current,
            orbitAngleRef.current,
            maxRadius,
            easeInCubic(t)
          )
          if (elapsed >= duration) {
            phaseRef.current = 'orbit'
            phaseStartRef.current = now
          }
          break
        }
        case 'orbit': {
          transforms = computeOrbitTransforms(
            tokens,
            orbitAngleRef.current,
            maxRadius
          )
          if (elapsed >= duration) {
            measure()
            snapFromRef.current = transforms
            phaseRef.current = 'snap'
            phaseStartRef.current = now
          }
          break
        }
        case 'snap': {
          const t = Math.min(1, elapsed / duration)
          transforms = computeSnapTransforms(
            snapFromRef.current,
            targets,
            rowScale,
            easeOutCubic(t)
          )
          if (elapsed >= duration) {
            holdTransformsRef.current = transforms
            phaseRef.current = 'hold'
            phaseStartRef.current = now
          }
          break
        }
        default:
          transforms = holdTransformsRef.current
      }

      applyTransforms(transforms)
      rafRef.current = requestAnimationFrame(tick)
    },
    [applyTransforms]
  )

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotion = () => {
      reducedMotionRef.current = media.matches
      setReducedMotion(media.matches)
    }
    updateMotion()
    media.addEventListener('change', updateMotion)

    const stage = stageRef.current
    const observer = stage
      ? new ResizeObserver(() => refreshHoldTransforms())
      : null
    if (stage && observer) observer.observe(stage)

    const onVisibility = () => {
      if (document.visibilityState === 'hidden') {
        cancelAnimationFrame(rafRef.current)
      } else if (!reducedMotionRef.current) {
        phaseStartRef.current = performance.now()
        rafRef.current = requestAnimationFrame(tick)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    const startAnimation = () => {
      if (!measure()) return
      phaseRef.current = 'hold'
      applyTransforms(holdTransformsRef.current)
      phaseStartRef.current = performance.now()
      rafRef.current = requestAnimationFrame(tick)
    }

    if (!media.matches) {
      requestAnimationFrame(startAnimation)
    } else if (measure()) {
      applyTransforms(holdTransformsRef.current)
    }

    return () => {
      cancelAnimationFrame(rafRef.current)
      media.removeEventListener('change', updateMotion)
      observer?.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [applyTransforms, measure, refreshHoldTransforms, tick])

  return (
    <div
      ref={containerRef}
      className={cn(
        'home-jarsy-hero-formula-orbit',
        glitching && 'home-jarsy-hero-formula-orbit--glitch',
        reducedMotion && 'home-jarsy-hero-formula-orbit--reduced'
      )}
      aria-hidden="true"
    >
      <div className="home-jarsy-hero-formula-orbit__vignette" />
      <OrbitRings />
      <div ref={stageRef} className="home-jarsy-hero-formula-orbit__stage">
        <div className="home-jarsy-hero-formula-orbit__tokens">
          {FORMULA_TOKENS.map((token, index) => (
            <span
              key={token.id}
              ref={(el) => {
                tokenRefs.current[index] = el
              }}
              className={cn(
                'home-jarsy-hero-formula-orbit__token',
                `home-jarsy-hero-formula-orbit__token--${token.kind}`
              )}
              style={
                {
                  '--token-index': index,
                } as CSSProperties
              }
            >
              {token.label}
            </span>
          ))}
        </div>
      </div>
      {glitching ? (
        <div className="home-jarsy-hero-formula-orbit__glitch-scan" aria-hidden />
      ) : null}
    </div>
  )
}
