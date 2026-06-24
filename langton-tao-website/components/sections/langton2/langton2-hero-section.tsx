import Link from 'next/link'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { Coffee2TypewriterReveal } from '@/components/sections/coffee2/coffee2-typewriter-reveal'
import { LangtontaoHeroLogoOrbit } from '@/components/sections/langtontao/langtontao-hero-logo-orbit'
import { langtonHero } from '@/lib/content/langton-page'

export function Langton2HeroSection() {
  return (
    <section
      id="langton-hero"
      className="langtontao-hero relative scroll-mt-20 overflow-hidden border-b border-zinc-200 bg-white"
      aria-labelledby="langton-hero-title"
    >
      <LangtontaoHeroLogoOrbit />

      <div className="langtontao-hero__inner relative z-10 mx-auto flex max-w-7xl flex-col px-4 text-center sm:px-6 lg:px-8">
        <div className="langtontao-hero__upper" aria-hidden>
          <div className="langtontao-hero__logo-slot langtontao-hero__logo-slot--layout" />
        </div>

        <div className="langtontao-hero__headline w-full max-w-3xl">
          <p className="c2-eyebrow">{langtonHero.eyebrow}</p>
          <h1 id="langton-hero-title" className="langtontao-hero__title mt-4">
            <Coffee2Reveal
              eager
              delay={520}
              as="span"
              className="langtontao-hero__title-main c2-display block text-zinc-950"
            >
              {langtonHero.title}
            </Coffee2Reveal>
          </h1>
        </div>

        <div className="langtontao-hero__lower">
          <Coffee2TypewriterReveal
            eager
            baseDelay={880}
            charStagger={90}
            className="langtontao-hero__title-sub c2-display mx-auto block max-w-3xl text-zinc-700"
            text={langtonHero.tagline}
          />

          <Coffee2Reveal eager delay={680} className="langtontao-hero__lead mt-6 w-full max-w-2xl">
            <p className="langtontao-hero__lead-text text-base leading-relaxed text-zinc-600 md:text-lg">
              {langtonHero.lead}
            </p>
          </Coffee2Reveal>

          <Coffee2Reveal eager delay={1480} className="langtontao-hero__cta mt-10 w-full">
            <div className="flex flex-col items-center gap-2">
              <Link href={langtonHero.cta.href} className="coffee2-cta-button">
                {langtonHero.cta.label}
              </Link>
              <p className="text-center text-xs font-medium text-zinc-500">
                {langtonHero.cta.description}
              </p>
            </div>
          </Coffee2Reveal>
        </div>
      </div>
    </section>
  )
}
