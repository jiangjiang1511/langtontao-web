'use client'

import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import type { HorizonTopic } from '@/lib/content/century-horizons'
import { cn } from '@/lib/utils'

type HorizonStoryStageProps = {
  topic: HorizonTopic
  panelId: string
  labelledBy: string
  className?: string
}

export function HorizonStoryStage({
  topic,
  panelId,
  labelledBy,
  className,
}: HorizonStoryStageProps) {
  return (
    <div
      id={panelId}
      role="tabpanel"
      aria-labelledby={labelledBy}
      className={cn('horizon-story-stage', className)}
    >
      {topic.hook ? (
        <p className="horizon-story-stage__hook">
          <Coffee2AnnotatedText text={topic.hook} as="span" />
        </p>
      ) : null}
      <p className="horizon-story-stage__summary">
        <Coffee2AnnotatedText text={topic.summary} as="span" />
      </p>
      {topic.body ? (
        <div className="horizon-story-stage__body">
          {topic.body.split('\n\n').map((paragraph, index) => (
            <Coffee2AnnotatedText
              key={index}
              className="horizon-story-stage__paragraph"
              text={paragraph}
              as="p"
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
