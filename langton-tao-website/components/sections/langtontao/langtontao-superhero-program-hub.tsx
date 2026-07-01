'use client'

import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { LangtontaoSubsectionHeader } from '@/components/sections/langtontao/langtontao-subsection-header'
import { Community2ProgramGallery } from '@/components/sections/community2/community2-program-gallery'
import { LangtontaoSuperheroProgramRail } from '@/components/sections/langtontao/langtontao-superhero-program-rail'
import {
  langtontaoSuperheroCorePrograms,
  langtontaoSuperheroProgramHubMeta,
} from '@/lib/content/langtontao/langtontao-superhero-journey'

const AUTO_ADVANCE_MS = 8000
const HUB_VIEWPORT_THRESHOLD = 0.25
const PROGRAM_ANCHORS = langtontaoSuperheroCorePrograms.map((program) => program.anchor)

function resolveProgramIdFromHash(hash: string) {
  const anchor = hash.replace(/^#/, '')
  if (!anchor) return null
  const program = langtontaoSuperheroCorePrograms.find((item) => item.anchor === anchor)
  return program?.id ?? null
}

export function LangtontaoSuperheroProgramHub() {
  const programs = langtontaoSuperheroCorePrograms
  const [activeId, setActiveId] = useState(programs[0]?.id ?? '')
  const [inViewport, setInViewport] = useState(false)
  const shellRef = useRef<HTMLDivElement>(null)

  const activeProgram = useMemo(
    () => programs.find((program) => program.id === activeId) ?? programs[0] ?? null,
    [activeId, programs]
  )

  const handleSelect = useCallback((id: string) => {
    setActiveId(id)
    const program = programs.find((item) => item.id === id)
    if (program && typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#${program.anchor}`)
    }
  }, [programs])

  useEffect(() => {
    const syncFromHash = () => {
      const programId = resolveProgramIdFromHash(window.location.hash)
      if (programId) setActiveId(programId)
    }

    syncFromHash()
    window.addEventListener('hashchange', syncFromHash)
    return () => window.removeEventListener('hashchange', syncFromHash)
  }, [])

  useEffect(() => {
    const shell = shellRef.current
    if (!shell) return

    const observer = new IntersectionObserver(
      ([entry]) => setInViewport(entry.isIntersecting),
      { threshold: HUB_VIEWPORT_THRESHOLD }
    )

    observer.observe(shell)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inViewport || programs.length <= 1) return

    const timer = window.setInterval(() => {
      setActiveId((currentId) => {
        const index = programs.findIndex((program) => program.id === currentId)
        const nextProgram = programs[(index + 1) % programs.length]
        return nextProgram?.id ?? currentId
      })
    }, AUTO_ADVANCE_MS)

    return () => window.clearInterval(timer)
  }, [inViewport, programs])

  if (!activeProgram) return null

  return (
    <section
      id="superhero-programs"
      className="lt-superhero-program-hub scroll-mt-28 mt-16 md:mt-20"
      aria-labelledby="superhero-program-hub-title"
    >
      {PROGRAM_ANCHORS.map((anchor) => (
        <span
          key={anchor}
          id={anchor}
          className="block h-0 scroll-mt-28 overflow-hidden"
          tabIndex={-1}
          aria-hidden
        />
      ))}

      <LangtontaoSubsectionHeader
        id="superhero-program-hub-title"
        eyebrow={langtontaoSuperheroProgramHubMeta.eyebrow}
        title={langtontaoSuperheroProgramHubMeta.title}
        lead={langtontaoSuperheroProgramHubMeta.lead}
        theme="superhero"
      />

      <div ref={shellRef} className="lt-superhero-program-hub__shell mt-10">
        <div className="lt-superhero-program-hub__layout">
          <LangtontaoSuperheroProgramRail
            programs={programs}
            activeId={activeProgram.id}
            advanceMs={AUTO_ADVANCE_MS}
            onSelect={handleSelect}
          />

          <div
            id={`superhero-panel-${activeProgram.id}`}
            role="tabpanel"
            aria-labelledby={`superhero-tab-${activeProgram.id}`}
            className="lt-superhero-program-hub__stage"
          >
            <div
              key={activeProgram.id}
              className="lt-superhero-program-hub__stage-inner lt-superhero-program-hub__stage-inner--enter"
            >
              <div className="lt-superhero-program-hub__stage-header">
                <div>
                  <p className="lt-superhero-program-hub__stage-eyebrow">
                    {activeProgram.subtitle}
                  </p>
                  <h4 className="lt-superhero-program-hub__stage-title">{activeProgram.title}</h4>
                  <p className="lt-superhero-program-hub__stage-lead">{activeProgram.philosophy}</p>
                </div>

                <div className="lt-superhero-program-hub__cover relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-zinc-200 lg:max-w-xs">
                  <Image
                    src={activeProgram.coverSrc}
                    alt={activeProgram.coverAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 320px"
                  />
                </div>
              </div>

              <div
                className="lt-superhero-program-hub__audience"
                style={{ '--lt-superhero-accent': activeProgram.accent } as CSSProperties}
              >
                <p className="lt-superhero-program-hub__audience-label">目标人群</p>
                <p className="lt-superhero-program-hub__audience-text">{activeProgram.audience}</p>
              </div>

              <p className="lt-superhero-program-hub__stage-body">{activeProgram.description}</p>

              <ul className="lt-superhero-program-hub__highlights">
                {activeProgram.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <Community2ProgramGallery
                programTitle={activeProgram.title}
                gallery={activeProgram.gallery}
                previewCount={3}
                collapsible
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
