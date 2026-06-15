import Link from 'next/link'
import type { Coffee2LifeEvent } from '@/lib/content/coffee-manifesto'
import { cn } from '@/lib/utils'

type Coffee2LifeEventCardProps = {
  event: Coffee2LifeEvent
  className?: string
  href?: string
}

export function Coffee2LifeEventCard({
  event,
  className,
  href,
}: Coffee2LifeEventCardProps) {
  const cardClassName = cn(
    'coffee2-life-event-card',
    `coffee2-life-event-card--${event.id}`,
    href && 'coffee2-life-event-card--link',
    className
  )

  const content = (
    <>
      <div className="coffee2-life-event-card__meta">
        <span className="coffee2-life-event-card__number">{event.number}</span>
        <span className="coffee2-life-event-card__tag">人生大事</span>
      </div>
      <p className="coffee2-life-event-card__title">{event.title}</p>
      <p className="coffee2-life-event-card__summary">{event.summary}</p>
    </>
  )

  if (href) {
    return (
      <Link
        href={href}
        className={cardClassName}
        aria-label={`${event.title}：${event.summary}`}
      >
        {content}
      </Link>
    )
  }

  return (
    <article className={cardClassName} aria-label={event.title}>
      {content}
    </article>
  )
}
