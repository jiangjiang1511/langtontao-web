import type { Coffee2LifeEvent } from '@/lib/content/coffee-manifesto'
import { Coffee2NavGridCard } from '@/components/sections/coffee2/coffee2-nav-grid-card'

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
  return (
    <Coffee2NavGridCard
      item={event}
      tag="人生大事"
      variantId={event.id}
      className={className}
      href={href}
    />
  )
}
