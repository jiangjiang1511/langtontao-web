import Image from 'next/image'
import type { MillionaireEvent } from '@/lib/content/community-page'
import { cn } from '@/lib/utils'

export function Community2EventCard({ event }: { event: MillionaireEvent }) {
  const content = (
    <>
      <div
        className={cn(
          'relative aspect-square w-full',
          !event.coverSrc && event.imageClass
        )}
      >
        {event.coverSrc ? (
          <Image
            src={event.coverSrc}
            alt={event.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 50vw, 33vw"
          />
        ) : null}
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

        <h3 className="mt-4 text-sm font-semibold leading-snug text-zinc-950 md:text-base">
          {event.title}
        </h3>

        <p className="mt-auto pt-4 text-xs text-zinc-500">{event.date}</p>
      </div>
    </>
  )

  if (event.href) {
    return (
      <a
        href={event.href}
        target="_blank"
        rel="noopener noreferrer"
        className="c2-card flex flex-col overflow-hidden transition-shadow hover:border-zinc-300 hover:shadow-md"
        aria-label={`${event.title}：打开小程序详情`}
      >
        {content}
      </a>
    )
  }

  return (
    <article className="c2-card flex flex-col overflow-hidden">{content}</article>
  )
}
