import type { ReactNode } from 'react'
import { ContactTrigger } from '@/components/contact-trigger'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { cn } from '@/lib/utils'

type LangtontaoSolutionPanelProps = {
  id: string
  eyebrow: string
  title: string
  philosophy: string
  children: ReactNode
  className?: string
}

export function LangtontaoSolutionPanel({
  id,
  eyebrow,
  title,
  philosophy,
  children,
  className,
}: LangtontaoSolutionPanelProps) {
  return (
    <Coffee2Reveal>
      <article
        id={id}
        className={cn(
          'lt-solution-panel scroll-mt-28 rounded-2xl border border-zinc-200 bg-white p-6 md:p-8',
          className
        )}
      >
        <p className="c2-eyebrow">{eyebrow}</p>
        <h3 className="c2-display mt-3 text-2xl text-zinc-950 md:text-3xl">
          {title}
        </h3>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-600 md:text-base">
          {philosophy}
        </p>
        <div className="mt-8">{children}</div>
        <div className="mt-8 flex flex-wrap gap-3">
          <ContactTrigger size="lg" className="coffee2-cta-button">
            预约咨询
          </ContactTrigger>
        </div>
      </article>
    </Coffee2Reveal>
  )
}
