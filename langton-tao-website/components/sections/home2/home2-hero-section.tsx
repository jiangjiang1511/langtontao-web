import { fiftyYearPageTitle } from '@/lib/content/fifty-year-narrative'

export function Home2HeroSection() {
  const [line1, line2] = fiftyYearPageTitle.split('：')

  return (
    <section
      id="hero"
      aria-labelledby="home2-hero-title"
      className="scroll-mt-20 border-b border-zinc-200 bg-white"
    >
      <div className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 md:min-h-[calc(100svh-4.5rem)] md:pb-24 md:pt-32 lg:px-8">
        <div className="overflow-hidden">
          <p
            className="home2-marquee text-[clamp(2.75rem,9vw,7rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-zinc-950"
            aria-hidden
          >
            {line1}：
          </p>
          <p
            className="home2-marquee home2-marquee--delay text-[clamp(2.75rem,9vw,7rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-zinc-950"
            aria-hidden
          >
            {line2}
          </p>
        </div>
        <h1
          id="home2-hero-title"
          className="sr-only"
        >
          {fiftyYearPageTitle}
        </h1>
      </div>
    </section>
  )
}
