import type { MillionaireEvent } from '@/lib/content/community-page'
import { cn } from '@/lib/utils'

export function Community2EventCard({ event }: { event: MillionaireEvent }) {
  return (
    <article className="c2-card flex flex-col overflow-hidden">
      <div
        className={cn(
          'relative aspect-[4/3] w-full',
          !event.coverSrc && event.imageClass
        )}
      >
        {event.status === 'full' ? (
          <span className="absolute right-3 top-3 rounded-full bg-zinc-950 px-3 py-1 text-xs font-medium text-white">
            已满
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <span className="inline-block w-fit rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600">
          {event.typeLabel}
        </span>

        <h3 className="mt-4 text-base font-semibold leading-snug text-zinc-950 md:text-lg">
          {event.title}
        </h3>

        <p className="mt-auto pt-4 text-sm text-zinc-500">{event.date}</p>
      </div>
    </article>
  )
}
