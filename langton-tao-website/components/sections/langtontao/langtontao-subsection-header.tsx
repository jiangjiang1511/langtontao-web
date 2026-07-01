import type { ReactNode } from 'react'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import type { LangtontaoMajorTheme } from '@/lib/content/langtontao/langtontao-major-sections'
import { cn } from '@/lib/utils'

type LangtontaoSubsectionHeaderProps = {
  eyebrow: string
  title: string
  lead?: string
  id?: string
  align?: 'left' | 'center'
  theme?: LangtontaoMajorTheme
  showRule?: boolean
  delay?: number
  className?: string
  children?: ReactNode
}

export function LangtontaoSubsectionHeader({
  eyebrow,
  title,
  lead,
  id,
  align = 'left',
  theme,
  showRule = true,
  delay = 0,
  className,
  children,
}: LangtontaoSubsectionHeaderProps) {
  const isCenter = align === 'center'
  const withRule = showRule && theme

  return (
    <Coffee2Reveal delay={delay} className={className}>
      <div
        className={cn(
          'lt-subsection-header',
          isCenter ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl text-left',
          theme && `lt-subsection-header--${theme}`
        )}
      >
        <p className="c2-eyebrow lt-heading-l2__eyebrow">{eyebrow}</p>
        <h3
          id={id}
          className={cn(
            'lt-heading-l2',
            withRule && 'lt-heading-l2--with-rule',
            isCenter && 'lt-heading-l2--center'
          )}
        >
          {withRule ? <span className="lt-heading-l2__rule" aria-hidden /> : null}
          {title}
        </h3>
        {isCenter && withRule ? (
          <span className="lt-heading-l2__rule lt-heading-l2__rule--center" aria-hidden />
        ) : null}
        {lead ? <p className="lt-heading-l2__lead">{lead}</p> : null}
        {children}
      </div>
    </Coffee2Reveal>
  )
}

type LangtontaoZoneHeaderProps = {
  title: string
  id?: string
  className?: string
}

export function LangtontaoZoneHeader({ title, id, className }: LangtontaoZoneHeaderProps) {
  return (
    <h4 id={id} className={cn('lt-heading-l3 lt-topic-zone__title', className)}>
      {title}
    </h4>
  )
}
