import Link from 'next/link'
import { JarsyReveal } from '@/components/jarsy/jarsy-reveal'
import { Coffee2TypewriterReveal } from '@/components/sections/coffee2/coffee2-typewriter-reveal'
import { homeJarsyHero } from '@/lib/content/home-jarsy-page'

const HERO_STAGGER = {
  eyebrow: 0,
  subtitle: 120,
  formula: 200,
  lead: 320,
  cta: 460,
} as const

const HERO_TITLE_TYPEWRITER = {
  baseDelay: 580,
  charStagger: 150,
} as const

export function HomeJarsyHero() {
  return (
    <section
      id="hero"
      className="scroll-mt-20 border-b border-zinc-200"
      aria-labelledby="home-jarsy-hero-title"
    >
      <div className="home-jarsy-hero__content mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl flex-col items-center justify-end px-4 pb-16 pt-28 text-center sm:px-6 md:min-h-[calc(100svh-4.5rem)] md:pb-24 md:pt-32 lg:px-8">
        <JarsyReveal eager delay={HERO_STAGGER.eyebrow} className="order-1">
          <p className="c2-eyebrow normal-case">{homeJarsyHero.eyebrow}</p>
        </JarsyReveal>

        <JarsyReveal eager delay={HERO_STAGGER.subtitle} className="order-3 mt-4 w-full md:mt-6">
          <p
            className="home-jarsy-hero-subtitle text-xl font-semibold tracking-tight text-zinc-400 md:text-2xl lg:text-3xl"
            aria-hidden
          >
            {homeJarsyHero.subtitle}
          </p>
        </JarsyReveal>

        <h1 id="home-jarsy-hero-title" className="sr-only">
          {homeJarsyHero.title}
          {homeJarsyHero.subtitle}
        </h1>

        <JarsyReveal eager delay={HERO_STAGGER.formula} className="order-4 mt-6 w-full md:mt-8">
          <div
            className="home-jarsy-hero-formula"
            aria-label={`${homeJarsyHero.formula.result}等于${homeJarsyHero.formula.terms.join('加')}乘以${homeJarsyHero.formula.multiplier}`}
          >
            <span className="home-jarsy-hero-formula__result">{homeJarsyHero.formula.result}</span>
            <span className="home-jarsy-hero-formula__eq" aria-hidden>
              =
            </span>
            <span className="home-jarsy-hero-formula__group">
              <span className="home-jarsy-hero-formula__paren" aria-hidden>
                (
              </span>
              <span className="home-jarsy-hero-formula__term">{homeJarsyHero.formula.terms[0]}</span>
              <span className="home-jarsy-hero-formula__op" aria-hidden>
                +
              </span>
              <span className="home-jarsy-hero-formula__term">{homeJarsyHero.formula.terms[1]}</span>
              <span className="home-jarsy-hero-formula__paren" aria-hidden>
                )
              </span>
            </span>
            <span className="home-jarsy-hero-formula__op home-jarsy-hero-formula__op--times" aria-hidden>
              ×
            </span>
            <span className="home-jarsy-hero-formula__multiplier">
              {homeJarsyHero.formula.multiplier}
            </span>
          </div>
        </JarsyReveal>

        <JarsyReveal eager delay={HERO_STAGGER.lead} className="order-5">
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-zinc-600 md:text-lg">
            {homeJarsyHero.lead}
          </p>
        </JarsyReveal>

        <JarsyReveal eager delay={HERO_STAGGER.cta} className="order-6 home-jarsy-hero__cta">
          <Link href={homeJarsyHero.cta.primaryHref} className="coffee2-cta-button">
            {homeJarsyHero.cta.primaryLabel}
          </Link>
        </JarsyReveal>

        <div className="home-jarsy-hero__title-wrap order-2 mt-6 w-full" aria-hidden>
          <Coffee2TypewriterReveal
            eager
            text={homeJarsyHero.title}
            baseDelay={HERO_TITLE_TYPEWRITER.baseDelay}
            charStagger={HERO_TITLE_TYPEWRITER.charStagger}
            className="home-jarsy-hero-title c2-display mx-auto block text-[clamp(4rem,14vw,10rem)] text-zinc-950"
          />
        </div>
      </div>
    </section>
  )
}
