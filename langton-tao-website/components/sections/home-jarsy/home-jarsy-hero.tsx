import Link from 'next/link'
import { JarsyReveal } from '@/components/jarsy/jarsy-reveal'
import { homeJarsyHero } from '@/lib/content/home-jarsy-page'
import { fiftyYearPageTitle } from '@/lib/content/fifty-year-narrative'

export function HomeJarsyHero() {
  return (
    <section
      id="hero"
      className="scroll-mt-20 border-b border-zinc-200"
      aria-labelledby="home-jarsy-hero-title"
    >
      <div className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl flex-col items-center justify-end px-4 pb-16 pt-28 text-center sm:px-6 md:min-h-[calc(100svh-4.5rem)] md:pb-24 md:pt-32 lg:px-8">
        <JarsyReveal eager delay={0}>
          <p className="c2-eyebrow normal-case">{homeJarsyHero.eyebrow}</p>
        </JarsyReveal>

        <JarsyReveal eager delay={80} className="mt-6 w-full overflow-hidden">
          {homeJarsyHero.titleLines.map((line) => (
            <p
              key={line}
              className="c2-display text-[clamp(2.75rem,9vw,7rem)] text-zinc-950"
              aria-hidden
            >
              {line}
            </p>
          ))}
        </JarsyReveal>

        <h1 id="home-jarsy-hero-title" className="sr-only">
          {fiftyYearPageTitle}
        </h1>

        <JarsyReveal eager delay={160}>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-zinc-600 md:text-lg">
            {homeJarsyHero.lead}
          </p>
        </JarsyReveal>

        <JarsyReveal eager delay={240}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href={homeJarsyHero.cta.primaryHref} className="c2-btn-primary">
              {homeJarsyHero.cta.primaryLabel}
            </Link>
            <Link
              href={homeJarsyHero.cta.secondaryHref}
              className="c2-btn-secondary"
            >
              {homeJarsyHero.cta.secondaryLabel}
            </Link>
          </div>
        </JarsyReveal>
      </div>
    </section>
  )
}
