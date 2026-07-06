'use client'

import type { ReactNode } from 'react'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { useSectionDomId } from '@/components/shared/deferred-mount-context'
import type { LangtontaoMajorSectionMeta } from '@/lib/content/langtontao/langtontao-major-sections'
import { cn } from '@/lib/utils'

type LangtontaoMajorSectionShellProps = {
  meta: LangtontaoMajorSectionMeta
  children: ReactNode
  className?: string
}

export function LangtontaoMajorSectionShell({
  meta,
  children,
  className,
}: LangtontaoMajorSectionShellProps) {
  const sectionId = useSectionDomId(meta.id)

  return (
    <section
      id={sectionId}
      className={cn(
        'lt-major-section scroll-mt-28 border-b border-zinc-200 py-16 md:py-24',
        `lt-major-section--${meta.theme}`,
        className
      )}
      aria-labelledby={`${meta.id}-title`}
    >
      <div className="lt-major-section__decor" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Coffee2Reveal>
          <header className="lt-major-section__header mx-auto max-w-3xl text-center">
            <p className="c2-eyebrow lt-heading-l1__eyebrow">{meta.eyebrow}</p>
            <h2 id={`${meta.id}-title`} className="lt-heading-l1">
              {meta.title}
            </h2>
            <p className="lt-heading-l1__lead">{meta.lead}</p>
          </header>
        </Coffee2Reveal>

        <div className="relative z-[1] mt-12">{children}</div>
      </div>
    </section>
  )
}
