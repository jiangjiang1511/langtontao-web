'use client'

import { useEffect, useRef } from 'react'
import { createRubiksExperience } from '@/lib/rubiks/create-experience'
import {
  testRubiksSections,
  testRubiksStory,
} from '@/lib/content/test-rubiks-story'

export function RubiksExperience() {
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const canvasHost = canvasRef.current
    if (!root || !canvasHost) return

    const experience = createRubiksExperience({
      container: canvasHost,
      story: testRubiksStory,
      scroll: {
        sectionSelector: '.story-section',
        sectionsRoot: root,
      },
    })

    return () => {
      experience.destroy()
    }
  }, [])

  return (
    <div ref={rootRef} className="rubiks-experience bg-pop-black text-pop-white">
      <div ref={canvasRef} className="rubiks-canvas" aria-hidden />

      {testRubiksSections.map((section, index) => (
        <section
          key={section.id}
          className="story-section flex min-h-[100dvh] items-center border-b border-white/10 px-4 py-24 sm:px-6 lg:px-8"
          aria-labelledby={`test-story-title-${section.id}`}
        >
          <div className="relative z-[1] mx-auto w-full max-w-4xl">
            {section.periodLabel ? (
              <>
                <h2
                  id={`test-story-title-${section.id}`}
                  className="text-display text-[clamp(3.5rem,14vw,8.5rem)] font-black leading-[0.92] tracking-[-0.03em] text-jarsy-violet"
                >
                  {section.periodLabel}
                </h2>
                <p className="mt-5 text-2xl font-black leading-tight text-pop-white md:mt-6 md:text-3xl lg:text-4xl">
                  {section.title}
                </p>
              </>
            ) : (
              <>
                {section.eyebrow ? (
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-jarsy-violet">
                    {section.eyebrow}
                  </p>
                ) : null}
                <h2
                  id={`test-story-title-${section.id}`}
                  className="text-display mt-4 text-4xl text-pop-white md:text-6xl"
                >
                  {section.title}
                </h2>
              </>
            )}
            {section.body ? (
              <p className="mt-8 max-w-2xl whitespace-pre-line text-base font-bold leading-relaxed text-pop-white/70 md:mt-10 md:text-lg">
                {section.body}
              </p>
            ) : null}
            <p className="mt-8 text-xs font-black uppercase tracking-widest text-pop-white/40">
              {index + 1} / {testRubiksSections.length}
            </p>
          </div>
        </section>
      ))}
    </div>
  )
}
