import { Coffee2HeroMotion } from '@/components/sections/coffee2/coffee2-hero-motion'
import { Coffee2HeroOrbitBackgroundLazy } from '@/components/sections/coffee2/coffee2-hero-orbit-background-lazy'

export function Coffee2HeroSection() {
  return (
    <section
      id="coffee2-hero"
      className="relative scroll-mt-20 overflow-visible border-b border-zinc-200 bg-white jarsy-glow"
      aria-labelledby="coffee2-hero-title"
    >
      <Coffee2HeroOrbitBackgroundLazy />

      <div className="coffee2-hero__content relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 md:min-h-[calc(100svh-4.5rem)] md:pb-20 md:pt-32 lg:px-8">
        <Coffee2HeroMotion />
      </div>
    </section>
  )
}
