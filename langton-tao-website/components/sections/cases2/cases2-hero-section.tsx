import Link from 'next/link'
import { JarsyReveal } from '@/components/jarsy/jarsy-reveal'
import { cases2Hero } from '@/lib/content/cases2-page'

export function Cases2HeroSection() {
  return (
    <section
      className="scroll-mt-20 border-b border-zinc-200"
      aria-labelledby="cases2-hero-title"
    >
      <div className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 md:min-h-[calc(100svh-4.5rem)] md:pb-24 md:pt-32 lg:px-8">
        <JarsyReveal eager delay={0}>
          <p className="c2-eyebrow">{cases2Hero.eyebrow}</p>
        </JarsyReveal>
        <JarsyReveal eager delay={80} className="mt-6 overflow-hidden">
          <p className="c2-display text-[clamp(2rem,7vw,5.5rem)] text-zinc-950" aria-hidden>
            {cases2Hero.titleLines[0]}
          </p>
          <p className="c2-display text-[clamp(2rem,7vw,5.5rem)] text-zinc-950" aria-hidden>
            {cases2Hero.titleLines[1]}
          </p>
        </JarsyReveal>
        <h1 id="cases2-hero-title" className="sr-only">
          {cases2Hero.titleLines.join('')}
        </h1>
        <JarsyReveal eager delay={160}>
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-zinc-600 md:text-lg">
            {cases2Hero.lead}
          </p>
        </JarsyReveal>
        <JarsyReveal eager delay={240}>
          <Link href="#cases-index" className="c2-btn-primary mt-10">
            浏览案例
          </Link>
        </JarsyReveal>
      </div>
    </section>
  )
}
