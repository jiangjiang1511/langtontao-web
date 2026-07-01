'use client'

import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import {
  LangtontaoWealthStructureChart,
  LangtontaoWealthTimeline,
} from '@/components/sections/langtontao/langtontao-wealth-charts'
import { TopicPhoneDialog } from '@/components/shared/topic-phone-dialog'
import type { LangtontaoTopicItem } from '@/lib/content/langtontao/langtontao-topic-types'
import { resolveTopicSharePoster } from '@/lib/topic-share/topic-share-posters'

type LangtontaoTopicModalProps = {
  topic: LangtontaoTopicItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LangtontaoTopicModal({
  topic,
  open,
  onOpenChange,
}: LangtontaoTopicModalProps) {
  if (!topic) return null

  const posterSrc = resolveTopicSharePoster('langtontao', topic.id, topic.sharePosterSrc)

  return (
    <TopicPhoneDialog
      open={open}
      onOpenChange={onOpenChange}
      title={topic.title}
      eyebrow="朗敦道 · 话题"
      className="lt-topic-modal"
      bodyClassName="lt-topic-modal__body space-y-4"
      descriptionId={`lt-topic-modal-${topic.id}`}
      share={{
        pathname: '/langtontao',
        topicId: topic.id,
        topicTitle: topic.title,
        posterSrc,
      }}
    >
      <p className="text-sm leading-relaxed text-zinc-600">
        <Coffee2AnnotatedText text={topic.summary} as="span" />
      </p>
      {topic.formula ? (
        <p className="lt-topic-modal__formula" aria-label="公式">
          {topic.formula}
        </p>
      ) : null}
      {topic.body ? (
        <p className="text-sm leading-relaxed text-zinc-600">
          <Coffee2AnnotatedText text={topic.body} as="span" />
        </p>
      ) : null}
      {topic.expandKind === 'timeline' ? (
        <div className="lt-topic-modal__embed">
          <LangtontaoWealthTimeline />
        </div>
      ) : null}
      {topic.expandKind === 'structure' ? (
        <div className="lt-topic-modal__embed">
          <LangtontaoWealthStructureChart />
        </div>
      ) : null}
      {topic.expandKind === 'nested' && topic.nestedItems?.length ? (
        <ul className="lt-topic-modal__nested">
          {topic.nestedItems.map((item) => (
            <li key={item.title} className="lt-topic-modal__nested-item">
              <p className="font-semibold text-zinc-950">{item.title}</p>
              <p className="mt-1 text-sm text-zinc-600">
                <Coffee2AnnotatedText text={item.body} as="span" />
              </p>
            </li>
          ))}
        </ul>
      ) : null}
    </TopicPhoneDialog>
  )
}
