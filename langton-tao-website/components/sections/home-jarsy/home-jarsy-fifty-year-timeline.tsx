'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { fiftyYearStages } from '@/lib/content/fifty-year-narrative'
import { summarizeStageBody } from '@/lib/content/tao-fifty-year-timeline'
import { cn } from '@/lib/utils'

export function HomeJarsyFiftyYearTimeline() {
  const [activeId, setActiveId] = useState(fiftyYearStages[0]?.id ?? 'day-1')

  useEffect(() => {
    const sections = fiftyYearStages
      .map((stage) => document.getElementById(stage.id))
      .filter((element): element is HTMLElement => element !== null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0, 0.15, 0.35, 0.55],
      }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className="tao-fifty-year-timeline"
      aria-label="TAO 定律九段旅程时间轴"
    >
      <div className="tao-fifty-year-timeline__track-wrap">
        <ol className="tao-fifty-year-timeline__track">
          {fiftyYearStages.map((stage, index) => {
            const isActive = activeId === stage.id
            const summary = summarizeStageBody(stage.body)

            return (
              <li key={stage.id} className="tao-fifty-year-timeline__item">
                <Link
                  href={`#${stage.id}`}
                  className={cn(
                    'tao-fifty-year-timeline__node',
                    isActive && 'tao-fifty-year-timeline__node--active'
                  )}
                  aria-current={isActive ? 'location' : undefined}
                >
                  <span className="tao-fifty-year-timeline__marker" aria-hidden>
                    <span className="tao-fifty-year-timeline__dot" />
                    <span className="tao-fifty-year-timeline__number">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </span>
                  <span className="tao-fifty-year-timeline__period">
                    {stage.periodLabel}
                  </span>
                  <span className="tao-fifty-year-timeline__theme">
                    {stage.theme}
                  </span>
                  {summary ? (
                    <span className="tao-fifty-year-timeline__summary">
                      {summary}
                    </span>
                  ) : null}
                </Link>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
