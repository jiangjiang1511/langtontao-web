'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Coffee2PreservationArticleCard } from '@/components/sections/coffee2/coffee2-preservation-article-card'
import type { CoffeePreservationInsurer } from '@/lib/content/coffee-preservation-insurers'

type PreservationInsurerStagePanelProps = {
  insurer: CoffeePreservationInsurer
  enterToken: number
}

type ContentPhase = 'entering' | 'idle' | 'exiting'

const EXIT_MS = 300
const ENTER_MS = 480

export function PreservationInsurerStagePanel({
  insurer,
  enterToken,
}: PreservationInsurerStagePanelProps) {
  const [displayInsurer, setDisplayInsurer] = useState(insurer)
  const [phase, setPhase] = useState<ContentPhase>('idle')
  const displayIdRef = useRef(insurer.id)
  const timersRef = useRef<number[]>([])

  useEffect(() => {
    const clearTimers = () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer))
      timersRef.current = []
    }

    const schedule = (fn: () => void, ms: number) => {
      const timer = window.setTimeout(fn, ms)
      timersRef.current.push(timer)
    }

    clearTimers()

    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion) {
      setDisplayInsurer(insurer)
      displayIdRef.current = insurer.id
      setPhase('idle')
      return clearTimers
    }

    const insurerChanged = insurer.id !== displayIdRef.current

    if (!insurerChanged && enterToken === 0) {
      setDisplayInsurer(insurer)
      displayIdRef.current = insurer.id
      setPhase('idle')
      return clearTimers
    }

    const runEnter = () => {
      setPhase('entering')
      schedule(() => setPhase('idle'), ENTER_MS)
    }

    if (insurerChanged) {
      setPhase('exiting')
      schedule(() => {
        setDisplayInsurer(insurer)
        displayIdRef.current = insurer.id
        runEnter()
      }, EXIT_MS)
    } else {
      runEnter()
    }

    return clearTimers
  }, [insurer, enterToken])

  const linkedArticles = displayInsurer.articles.filter((article) => article.href)

  return (
    <div
      className="cg-stage pi-stage"
      style={{ '--cg-accent': '#ffe600' } as CSSProperties}
      data-enter-token={enterToken}
    >
      <div className="cg-stage-grid" aria-hidden />

      <div className="pi-stage-content-shell">
        <div className="pi-stage-content" data-phase={phase}>
          <header className="cg-stage-header">
            <div className="cg-stage-header-main">
              <p className="cg-stage-eyebrow">合作保司 · {displayInsurer.name}</p>
              <h4 className="cg-stage-title">{displayInsurer.headline}</h4>
              <p className="cg-stage-tagline">
                <span className="text-zinc-500">买手标签 · </span>
                {displayInsurer.buyerTag}
              </p>
            </div>
            <span className="cg-stage-cagr-badge">精选保司</span>
          </header>

          <div className="cg-stage-body pi-stage-body">
            <div className="pi-stage-intro">
              {displayInsurer.intro.map((paragraph, index) => (
                <p key={`${displayInsurer.id}-intro-${index}`}>{paragraph}</p>
              ))}
            </div>

            {linkedArticles.length > 0 ? (
              <ul className="pi-stage-articles grid gap-4 sm:grid-cols-2">
                {linkedArticles.map((article) => (
                  <li key={article.id}>
                    <Coffee2PreservationArticleCard article={article} />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
