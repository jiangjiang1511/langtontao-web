import Link from 'next/link'
import { getUpcomingEventsPreview } from '@/lib/content/community-page'
import { ScribbleAccent } from '@/components/decorative/scribble-accent'
import { PillLink } from '@/components/ui/pill-link'
import { Eyebrow, SectionSurface, SectionTitle } from '@/components/layout/section-surface'
import { cn } from '@/lib/utils'

export function UpcomingEventsSection() {
  const upcomingEvents = getUpcomingEventsPreview(3)

  return (
    <SectionSurface
      id="upcoming-events"
      theme="paper"
      aria-labelledby="events-title"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="flex items-center gap-3">
          <ScribbleAccent />
          <div>
            <Eyebrow>UPCOMING EVENTS</Eyebrow>
            <SectionTitle id="events-title" display>
              朗敦道活动
            </SectionTitle>
          </div>
          <ScribbleAccent side="right" />
        </div>
        <PillLink href="/coffee#millionaire-plan" variant="dark">
          查看全部
        </PillLink>
      </div>

      <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {upcomingEvents.map((event) => (
          <li key={event.id}>
            <Link href="/coffee#millionaire-plan" className="group block">
              <div
                className={cn(
                  'aspect-[4/3] overflow-hidden rounded-2xl border-2 border-pop-black',
                  event.imageClass
                )}
              />
              <span className="mt-4 inline-block rounded-full border-2 border-pop-black bg-pop-yellow px-3 py-1 text-xs font-black text-pop-black">
                {event.type}
              </span>
              <h3 className="mt-3 text-base font-bold leading-snug text-pop-black group-hover:underline">
                {event.title}
              </h3>
              <p className="mt-2 text-sm font-bold text-[color:var(--section-muted)]">
                {event.date}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </SectionSurface>
  )
}
