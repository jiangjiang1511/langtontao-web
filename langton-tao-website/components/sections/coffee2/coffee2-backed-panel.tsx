import type { ReactNode } from 'react'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import type { Coffee2BackedPanelTitle } from '@/lib/content/coffee-manifesto'
import { cn } from '@/lib/utils'

type Coffee2BackedPanelProps = {
  title: Coffee2BackedPanelTitle
  children: ReactNode
  className?: string
  revealDelay?: number
  id?: string
  ariaLabelledBy?: string
  stackPosition?: 'top' | 'middle' | 'bottom' | 'solo'
  titleVariant?: 'pop' | 'jarsy'
  panelVariant?: 'default' | 'minimal'
}

function resolvePanelTitle(title: Coffee2BackedPanelTitle) {
  if (typeof title === 'string') {
    return { zh: title, en: null as string | null }
  }

  return { zh: title.zh, en: title.en }
}

export function Coffee2BackedPanel({
  title,
  children,
  className,
  revealDelay = 0,
  id,
  ariaLabelledBy,
  stackPosition = 'solo',
  titleVariant = 'pop',
  panelVariant = 'default',
}: Coffee2BackedPanelProps) {
  const { zh, en } = resolvePanelTitle(title)

  return (
    <Coffee2Reveal
      delay={revealDelay}
      className={cn(
        'coffee2-backed-panel',
        stackPosition !== 'solo' && `coffee2-backed-panel--stack-${stackPosition}`,
        titleVariant === 'jarsy' && 'coffee2-backed-panel--title-jarsy',
        panelVariant === 'minimal' && 'coffee2-backed-panel--minimal',
        className
      )}
    >
      <div
        id={id}
        className="coffee2-backed-panel__shell"
        aria-labelledby={ariaLabelledBy}
      >
        <p id={ariaLabelledBy} className="coffee2-backed-panel__title">
          <span className="coffee2-backed-panel__title-line">
            <span className="coffee2-backed-panel__title-zh">{zh}</span>
            {en ? (
              <>
                <span className="coffee2-backed-panel__title-sep" aria-hidden>
                  ·
                </span>
                <span className="coffee2-backed-panel__title-en">{en}</span>
              </>
            ) : null}
          </span>
        </p>
        <div className="coffee2-backed-panel__body">{children}</div>
      </div>
    </Coffee2Reveal>
  )
}
