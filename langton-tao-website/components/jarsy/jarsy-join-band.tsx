import Link from 'next/link'
import { JarsyReveal } from '@/components/jarsy/jarsy-reveal'

type JarsyJoinBandProps = {
  id?: string
  statement: string
  tagline: string
  ctaLabel: string
  ctaHref: string
}

export function JarsyJoinBand({
  id = 'join-band-title',
  statement,
  tagline,
  ctaLabel,
  ctaHref,
}: JarsyJoinBandProps) {
  return (
    <section
      className="border-b border-zinc-200 bg-zinc-950 py-20 md:py-28"
      aria-labelledby={id}
    >
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <JarsyReveal>
          <p id={id} className="c2-display text-3xl text-white md:text-5xl lg:text-6xl">
            {statement}
          </p>
        </JarsyReveal>
        <JarsyReveal delay={100} className="c2-reveal-fade">
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg">
            {tagline}
          </p>
        </JarsyReveal>
        <JarsyReveal delay={180} className="c2-reveal-fade">
          <Link href={ctaHref} className="c2-btn-cta-emphasis mt-10">
            {ctaLabel}
          </Link>
        </JarsyReveal>
      </div>
    </section>
  )
}
