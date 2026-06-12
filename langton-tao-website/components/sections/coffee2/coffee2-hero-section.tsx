import { Coffee2HeroOrbitBackground } from '@/components/sections/coffee2/coffee2-hero-orbit-background'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { coffee2Hero } from '@/lib/content/coffee2-page'

export function Coffee2HeroSection() {
  return (
    <section
      id="coffee2-hero"
      className="relative scroll-mt-20 overflow-visible border-b-0 bg-white"
      aria-labelledby="coffee2-hero-title"
    >
      <Coffee2HeroOrbitBackground />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl flex-col justify-end px-4 pb-10 pt-28 sm:px-6 md:min-h-[calc(100svh-4.5rem)] md:pb-12 md:pt-32 lg:px-8">
        <Coffee2Reveal eager delay={0}>
          <p className="c2-eyebrow">{coffee2Hero.eyebrow}</p>
        </Coffee2Reveal>

        <Coffee2Reveal eager delay={80} className="mt-6 overflow-hidden">
          <p
            className="c2-display text-[clamp(2.75rem,9vw,7rem)] text-zinc-950"
            aria-hidden
          >
            {coffee2Hero.titleLines[0]}
          </p>
          <p
            className="c2-display text-[clamp(2.75rem,9vw,7rem)] text-zinc-950"
            aria-hidden
          >
            {coffee2Hero.titleLines[1]}
          </p>
        </Coffee2Reveal>

        <h1 id="coffee2-hero-title" className="sr-only">
          {coffee2Hero.titleLines.join('')}
        </h1>

        <Coffee2Reveal eager delay={140}>
          <p className="mt-8 text-xl font-semibold tracking-tight text-zinc-800 md:text-2xl">
            {coffee2Hero.tagline}
          </p>
        </Coffee2Reveal>

        <Coffee2Reveal eager delay={200}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-600 md:text-lg">
            {coffee2Hero.lead}
          </p>
        </Coffee2Reveal>
      </div>
    </section>
  )
}
