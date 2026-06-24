'use client'

import Image from 'next/image'
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  LANGTONTAO_HERO_LOGOS,
  LANGTONTAO_HERO_ORBIT_PHASE_MS,
  getOrbitTransforms,
  getStaticCircleTransforms,
  type LangtontaoHeroOrbitPhase,
  type LogoTransform,
} from '@/lib/content/langtontao-hero-orbit'
import { LANGTONTAO_HERO_ORBIT_RING_TICKS } from '@/lib/orbit-ring-geometry'
import { cn } from '@/lib/utils'

type LogoVariant = 'color' | 'mono'

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function easeInCubic(t: number) {
  return t * t * t
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function lerpTransforms(
  from: LogoTransform[],
  to: LogoTransform[],
  eased: number
): LogoTransform[] {
  return from.map((start, index) => {
    const target = to[index]
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
    <div className="langtontao-hero-orbit__rings" aria-hidden>
      <svg
        className="langtontao-hero-orbit__rings-svg langtontao-hero-orbit__rings-svg--1"
        viewBox="0 0 400 400"
        role="presentation"
      >
        <circle cx="200" cy="200" r="168" fill="none" />
        {LANGTONTAO_HERO_ORBIT_RING_TICKS.map((tick, index) => (
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
        className="langtontao-hero-orbit__rings-svg langtontao-hero-orbit__rings-svg--2"
        viewBox="0 0 400 400"
        role="presentation"
      >
        <circle cx="200" cy="200" r="128" fill="none" strokeDasharray="6 8" />
      </svg>
      <svg
        className="langtontao-hero-orbit__rings-svg langtontao-hero-orbit__rings-svg--3"
        viewBox="0 0 400 400"
        role="presentation"
      >
        <ellipse cx="200" cy="200" rx="188" ry="72" fill="none" />
        <ellipse cx="200" cy="200" rx="72" ry="188" fill="none" />
      </svg>
    </div>
  )
}

export function LangtontaoHeroLogoOrbit() {
  const stageRef = useRef<HTMLDivElement>(null)
  const logoRefs = useRef<(HTMLDivElement | null)[]>([])
  const rafRef = useRef<number>(0)
  const phaseRef = useRef<LangtontaoHeroOrbitPhase>('holdStatic')
  const phaseStartRef = useRef(0)
  const orbitAngleRef = useRef(0)
  const maxRadiusRef = useRef(240)
  const staticRadiusFactorRef = useRef(0.34)
  const variantRef = useRef<LogoVariant>('color')
  const staticTransformsRef = useRef<LogoTransform[]>([])
  const transitionFromRef = useRef<LogoTransform[]>([])
  const orbitSnapshotRef = useRef<LogoTransform[]>([])
  const stutterUntilRef = useRef(0)
  const reducedMotionRef = useRef(false)

  const [glitching, setGlitching] = useState(false)
  const [variant, setVariant] = useState<LogoVariant>('color')
  const [reducedMotion, setReducedMotion] = useState(false)

  const applyTransforms = useCallback((transforms: LogoTransform[]) => {
    transforms.forEach((t, index) => {
      const el = logoRefs.current[index]
      if (!el) return
      el.style.transform = `translate3d(calc(-50% + ${t.x}px), calc(-50% + ${t.y}px), ${t.z}px) scale(${t.scale})`
      el.style.opacity = String(t.opacity)
      el.style.filter = t.blur > 0.1 ? `blur(${t.blur}px)` : 'none'
    })
  }, [])

  const refreshStaticTransforms = useCallback(() => {
    staticTransformsRef.current = getStaticCircleTransforms(
      maxRadiusRef.current,
      staticRadiusFactorRef.current
    )
  }, [])

  const measure = useCallback(() => {
    const stage = stageRef.current
    if (!stage) return
    const { width, height } = stage.getBoundingClientRect()
    const isMobile = width < 768
    maxRadiusRef.current = Math.max(
      width * (isMobile ? 0.4 : 0.32),
      height * (isMobile ? 0.24 : 0.19)
    )
    staticRadiusFactorRef.current = isMobile ? 0.32 : 0.22
    refreshStaticTransforms()
  }, [refreshStaticTransforms])

  const tick = useCallback(
    (now: number) => {
      if (!phaseStartRef.current) phaseStartRef.current = now

      const phase = phaseRef.current
      const elapsed = now - phaseStartRef.current
      const duration = LANGTONTAO_HERO_ORBIT_PHASE_MS[phase]
      const maxRadius = maxRadiusRef.current

      if (reducedMotionRef.current) return

      let transforms: LogoTransform[]

      switch (phase) {
        case 'holdStatic': {
          transforms = staticTransformsRef.current
          if (elapsed >= duration) {
            transitionFromRef.current = transforms
            orbitAngleRef.current = 0
            phaseRef.current = 'explode'
            phaseStartRef.current = now
          }
          break
        }
        case 'explode': {
          const t = Math.min(1, elapsed / duration)
          const orbitTargets = getOrbitTransforms(orbitAngleRef.current, maxRadius)
          transforms = lerpTransforms(
            transitionFromRef.current,
            orbitTargets,
            easeOutCubic(t)
          )
          if (elapsed >= duration) {
            orbitSnapshotRef.current = transforms
            phaseRef.current = 'orbit'
            phaseStartRef.current = now
          }
          break
        }
        case 'orbit': {
          const inStutter = now < stutterUntilRef.current
          if (!inStutter) {
            orbitAngleRef.current += 0.0034
            if (Math.random() < 0.0016) {
              stutterUntilRef.current = now + 80 + Math.random() * 120
            }
          } else if (Math.random() < 0.1) {
            orbitAngleRef.current += 0.0003
          }

          transforms = getOrbitTransforms(orbitAngleRef.current, maxRadius)
          orbitSnapshotRef.current = transforms

          if (elapsed >= duration) {
            transitionFromRef.current = transforms
            phaseRef.current = 'glitch'
            phaseStartRef.current = now
            setGlitching(true)
          }
          break
        }
        case 'glitch': {
          transforms = transitionFromRef.current
          if (elapsed >= duration) {
            const nextVariant: LogoVariant =
              variantRef.current === 'color' ? 'mono' : 'color'
            variantRef.current = nextVariant
            setVariant(nextVariant)
            setGlitching(false)
            transitionFromRef.current = transforms
            phaseRef.current = 'collapse'
            phaseStartRef.current = now
          }
          break
        }
        case 'collapse': {
          const t = Math.min(1, elapsed / duration)
          const staticTargets = getStaticCircleTransforms(
            maxRadius,
            staticRadiusFactorRef.current
          )
          transforms = lerpTransforms(
            transitionFromRef.current,
            staticTargets,
            easeInCubic(t)
          )
          if (elapsed >= duration) {
            staticTransformsRef.current = transforms
            phaseRef.current = 'holdStatic'
            phaseStartRef.current = now
          }
          break
        }
        default:
          transforms = staticTransformsRef.current
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

    measure()
    const stage = stageRef.current
    const observer = stage ? new ResizeObserver(() => {
      measure()
      if (phaseRef.current === 'holdStatic') {
        applyTransforms(staticTransformsRef.current)
      }
    }) : null
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

    if (!media.matches) {
      variantRef.current = 'color'
      setVariant('color')
      phaseRef.current = 'holdStatic'
      applyTransforms(staticTransformsRef.current)
      phaseStartRef.current = performance.now()
      rafRef.current = requestAnimationFrame(tick)
    } else {
      applyTransforms(
        getStaticCircleTransforms(
          maxRadiusRef.current,
          staticRadiusFactorRef.current
        )
      )
    }

    return () => {
      cancelAnimationFrame(rafRef.current)
      media.removeEventListener('change', updateMotion)
      observer?.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [applyTransforms, measure, tick])

  return (
    <div
      className={cn(
        'langtontao-hero-orbit',
        glitching && 'langtontao-hero-orbit--glitch',
        reducedMotion && 'langtontao-hero-orbit--reduced'
      )}
      aria-hidden="true"
    >
      <div className="langtontao-hero-orbit__vignette" />
      <OrbitRings />
      <div ref={stageRef} className="langtontao-hero-orbit__stage">
        <div className="langtontao-hero-orbit__logos">
          {LANGTONTAO_HERO_LOGOS.map((logo, index) => (
            <div
              key={logo.id}
              ref={(el) => {
                logoRefs.current[index] = el
              }}
              className="langtontao-hero-orbit__logo"
            >
              <Image
                src={variant === 'color' ? logo.colorSrc : logo.monoSrc}
                alt=""
                width={320}
                height={320}
                priority={index === 0}
                className="langtontao-hero-orbit__logo-image"
              />
            </div>
          ))}
        </div>
      </div>
      {glitching ? (
        <div className="langtontao-hero-orbit__glitch-scan" aria-hidden />
      ) : null}
    </div>
  )
}
