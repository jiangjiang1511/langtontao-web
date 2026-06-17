import { cn } from '@/lib/utils'
import { CoffeeCyclesTimeline } from '@/components/sections/coffee2/coffee-cycles-timeline'

type Coffee2TimelineSectionProps = {
  placement?: 'default' | 'after-hero'
}

export function Coffee2TimelineSection({
  placement = 'default',
}: Coffee2TimelineSectionProps) {
  return (
    <section
      id="coffee-cycles"
      className={cn(
        'coffee-cycles-timeline-section relative z-10 scroll-mt-28 bg-white',
        placement === 'after-hero' && 'coffee-cycles-timeline-section--after-hero'
      )}
      aria-label="经济周期时间轴"
    >
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-6 sm:px-6 md:pb-16 md:pt-8 lg:px-8">
        <CoffeeCyclesTimeline />
      </div>
    </section>
  )
}
