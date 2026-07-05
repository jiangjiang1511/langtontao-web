'use client'

import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import type { BlueprintZonePanel } from '@/lib/content/lifecycle-blueprint'
import type { LifecycleStage, LifecycleTrap } from '@/lib/content/enterprise-lifecycle'
import { cn } from '@/lib/utils'

function PaeiCode({
  code,
  className,
}: {
  code: string
  className?: string
}) {
  return (
    <span className={cn('font-mono text-lg tracking-widest', className)}>
      {code.split('').map((char, index) => (
        <span
          key={`${char}-${index}`}
          className={cn(
            char === char.toUpperCase() && char !== '-'
              ? 'font-black text-jarsy-violet'
              : 'font-bold text-zinc-400'
          )}
        >
          {char}
        </span>
      ))}
    </span>
  )
}

type LifecycleChartCalloutProps = {
  selectedStage: LifecycleStage | undefined
  selectedTrap: LifecycleTrap | undefined
  selectedZone?: BlueprintZonePanel | undefined
  classPrefix: string
}

export function LifecycleChartCallout({
  selectedStage,
  selectedTrap,
  selectedZone,
  classPrefix,
}: LifecycleChartCalloutProps) {
  return (
    <div className={`${classPrefix}__callout-rail`}>
      <div className={`${classPrefix}__callout`} aria-live="polite">
        <div className={`${classPrefix}__callout-inner`}>
          {selectedStage ? (
            <>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h4 className="text-lg font-black text-pop-black md:text-xl">
                  {selectedStage.label}
                </h4>
                <PaeiCode
                  code={selectedStage.paeiCode}
                  className={`${classPrefix}__paei-code`}
                />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-zinc-700 md:text-base">
                <Coffee2AnnotatedText text={selectedStage.summary} as="span" />
              </p>
            </>
          ) : selectedTrap ? (
            <>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h4 className="text-lg font-black text-pop-black md:text-xl">
                  {selectedTrap.label}
                </h4>
                <PaeiCode code={selectedTrap.code} className={`${classPrefix}__paei-code`} />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-zinc-700 md:text-base">
                <Coffee2AnnotatedText text={selectedTrap.summary} as="span" />
              </p>
            </>
          ) : selectedZone ? (
            <>
              <h4 className="text-lg font-black text-pop-black md:text-xl">{selectedZone.label}</h4>
              <p className="mt-2 text-sm leading-relaxed text-zinc-700 md:text-base">
                <Coffee2AnnotatedText text={selectedZone.body} as="span" />
              </p>
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}
