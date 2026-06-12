import { CoffeeCyclesTimeline } from '@/components/sections/coffee2/coffee-cycles-timeline'

export function Coffee2TimelineSection() {
  return (
    <section
      id="coffee-cycles"
      className="coffee-cycles-timeline-section relative z-10 scroll-mt-28 bg-white"
      aria-labelledby="coffee-cycles-timeline-title"
    >
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-6 sm:px-6 md:pb-16 md:pt-8 lg:px-8">
        <CoffeeCyclesTimeline />
      </div>
    </section>
  )
}
