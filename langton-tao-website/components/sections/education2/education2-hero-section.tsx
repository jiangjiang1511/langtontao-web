import Link from 'next/link'
import { JarsyReveal } from '@/components/jarsy/jarsy-reveal'
import { education2Hero } from '@/lib/content/education2-page'

export function Education2HeroSection() {
  return (
    <section
      className="scroll-mt-20 border-b border-zinc-200"
      aria-labelledby="education2-hero-title"
    >
      <div className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 md:min-h-[calc(100svh-4.5rem)] md:pb-24 md:pt-32 lg:px-8">
        <JarsyReveal eager delay={0}>
          <p className="c2-eyebrow">{education2Hero.eyebrow}</p>
        </JarsyReveal>
        <JarsyReveal eager delay={80} className="mt-6 overflow-hidden">
          <p className="c2-display text-[clamp(2.75rem,9vw,7rem)] text-zinc-950" aria-hidden>
            {education2Hero.titleLines[0]}
          </p>
          <p className="c2-display text-[clamp(2.75rem,9vw,7rem)] text-zinc-950" aria-hidden>
            {education2Hero.titleLines[1]}
          </p>
        </JarsyReveal>
        <h1 id="education2-hero-title" className="sr-only">
          {education2Hero.titleLines.join('')}
        </h1>
        <JarsyReveal eager delay={140}>
          <p className="mt-8 text-xl font-semibold tracking-tight text-zinc-800 md:text-2xl">
            {education2Hero.tagline}
          </p>
        </JarsyReveal>
        <JarsyReveal eager delay={200}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-600 md:text-lg">
            {education2Hero.lead}
          </p>
        </JarsyReveal>
        <JarsyReveal eager delay={260}>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href={education2Hero.cta.ctaHref} className="c2-btn-primary">
              {education2Hero.cta.ctaLabel}
            </Link>
            <Link href="#reading" className="c2-btn-secondary">
              探索读书
            </Link>
          </div>
        </JarsyReveal>
      </div>
    </section>
  )
}
