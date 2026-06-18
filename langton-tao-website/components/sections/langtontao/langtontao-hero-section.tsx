import Link from 'next/link'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { Coffee2TypewriterReveal } from '@/components/sections/coffee2/coffee2-typewriter-reveal'
import { LangtontaoHeroLogo } from '@/components/sections/langtontao/langtontao-hero-logo'
import { langtontaoHero } from '@/lib/content/langtontao-page'

export function LangtontaoHeroSection() {
  return (
    <section
      id="langtontao-hero"
      className="langtontao-hero relative scroll-mt-20 overflow-visible border-b border-zinc-200 bg-white"
      aria-labelledby="langtontao-hero-title"
    >
      <div className="langtontao-hero__inner mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 md:min-h-[calc(100svh-4.5rem)] md:py-24 lg:px-8">
        <LangtontaoHeroLogo />

        <div className="langtontao-hero__headline mt-8 w-full max-w-3xl">
          <h1
            id="langtontao-hero-title"
            className="langtontao-hero__title flex flex-col items-center gap-1"
          >
            <Coffee2Reveal
              eager
              delay={520}
              as="span"
              className="langtontao-hero__title-main c2-display block text-zinc-950"
            >
              {langtontaoHero.title}
            </Coffee2Reveal>
            <Coffee2TypewriterReveal
              eager
              baseDelay={880}
              charStagger={120}
              className="langtontao-hero__title-sub c2-display block text-zinc-700"
              text={langtontaoHero.tagline}
            />
          </h1>
        </div>

        <Coffee2Reveal eager delay={680} className="mt-6 w-full max-w-2xl">
          <p className="text-base leading-relaxed text-zinc-600 md:text-lg">
            {langtontaoHero.lead}
          </p>
        </Coffee2Reveal>

        <Coffee2Reveal eager delay={1480} className="langtontao-hero__cta mt-10 w-full">
          <div className="flex flex-col items-center gap-2">
            <div className="coffee2-page">
              <Link
                href={langtontaoHero.cta.href}
                className="coffee2-cta-button"
              >
                {langtontaoHero.cta.label}
              </Link>
            </div>
            <p className="text-center text-xs font-medium text-zinc-500">
              {langtontaoHero.cta.description}
            </p>
          </div>
        </Coffee2Reveal>
      </div>
    </section>
  )
}
