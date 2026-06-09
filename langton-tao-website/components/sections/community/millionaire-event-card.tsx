import Image from 'next/image'
import type { MillionaireEvent } from '@/lib/content/community-page'
import { cn } from '@/lib/utils'

export function MillionaireEventCard({ event }: { event: MillionaireEvent }) {
  return (
    <article className="flex flex-col">
      <div
        className={cn(
          'relative aspect-[4/3] overflow-hidden rounded-lg border-2 border-pop-black',
          !event.coverSrc && event.imageClass
        )}
      >
        {event.coverSrc ? (
          <Image
            src={event.coverSrc}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        ) : null}
      </div>

      <span className="mt-4 inline-block w-fit rounded-full border-2 border-pop-black bg-pop-yellow px-3 py-1 text-xs font-black text-pop-black">
        {event.typeLabel}
      </span>

      <h3 className="mt-3 text-base font-black leading-snug text-pop-black md:text-lg">
        {event.title}
      </h3>

      <p className="mt-2 text-sm font-bold text-[color:var(--section-muted)]">
        {event.date}
      </p>
    </article>
  )
}
