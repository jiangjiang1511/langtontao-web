'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import { PathTopicArticleDialog } from '@/components/sections/home-jarsy/path-topic-article-dialog'
import { PathTopicReadingList } from '@/components/sections/home-jarsy/path-topic-reading-list'
import { TopicPhoneDialog } from '@/components/shared/topic-phone-dialog'
import type { NarrativeBubble, NarrativeSubsection } from '@/lib/content/narrative-bubble'
import { dayOneAccentMap } from '@/lib/content/day-one-narrative'
import { getPathTopicArticle } from '@/lib/content/path-topic-articles'
import { resolveTopicSharePoster } from '@/lib/topic-share/topic-share-posters'
import type { CSSProperties } from 'react'

type DayOneTopicModalProps = {
  bubble: NarrativeBubble | null
  subsection?: NarrativeSubsection | null
  accentMap?: Record<string, string>
  accentId?: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

function ModalBody({ text }: { text: string }) {
  return (
    <>
      {text.split('\n\n').map((paragraph, index) => (
        <Coffee2AnnotatedText
          key={index}
          className="day-one-path-modal__paragraph"
          text={paragraph}
          as="p"
        />
      ))}
    </>
  )
}

export function DayOneTopicModal({
  bubble,
  subsection,
  accentMap = dayOneAccentMap,
  accentId,
  open,
  onOpenChange,
}: DayOneTopicModalProps) {
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null)
  const activeArticle = activeArticleId
    ? getPathTopicArticle(activeArticleId) ?? null
    : null

  const isSubsection = Boolean(subsection)
  const title = isSubsection ? subsection!.title : bubble?.label ?? ''
  const topicId = isSubsection
    ? subsection!.id ?? subsection!.title
    : bubble?.id ?? ''
  const descriptionId = isSubsection
    ? `day-one-path-modal-sub-${subsection!.id ?? subsection!.title}`
    : bubble
      ? `day-one-path-modal-${bubble.id}`
      : undefined
  const accentKey = accentId ?? bubble?.id ?? subsection?.id ?? ''
  const accent = accentKey ? (accentMap[accentKey] ?? '#ffe600') : '#ffe600'
  const readings = isSubsection ? subsection?.readings : bubble?.readings
  const posterSrc = resolveTopicSharePoster('path', topicId)

  const handleTopicOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) setActiveArticleId(null)
    onOpenChange(nextOpen)
  }

  if (!title) return null

  return (
    <>
      <TopicPhoneDialog
        open={open}
        onOpenChange={handleTopicOpenChange}
        title={title}
        descriptionId={descriptionId}
        className="day-one-path-modal"
        bodyClassName="day-one-path-modal__body"
        style={{ '--day-one-accent': accent } as CSSProperties}
        share={{
          pathname: '/',
          topicId,
          topicTitle: title,
          posterSrc,
        }}
      >
        {isSubsection && subsection ? (
          <>
            {subsection.paragraphs.map((paragraph, index) => (
              <Coffee2AnnotatedText
                key={index}
                className={
                  index === 0
                    ? 'day-one-path-modal__summary'
                    : 'day-one-path-modal__paragraph'
                }
                text={paragraph}
                as="p"
              />
            ))}
          </>
        ) : bubble ? (
          <>
            {bubble.hook ? (
              <div className="day-one-path-modal__hook">
                <Coffee2AnnotatedText text={bubble.hook} as="p" />
              </div>
            ) : null}

            <Coffee2AnnotatedText
              className="day-one-path-modal__summary"
              text={bubble.summary}
              as="p"
            />

            {bubble.subsections?.map((sub) => (
              <div key={sub.title} className="day-one-path-modal__subsection">
                <h5 className="day-one-path-modal__subsection-title">{sub.title}</h5>
                {sub.paragraphs.map((paragraph, index) => (
                  <Coffee2AnnotatedText
                    key={index}
                    className="day-one-path-modal__paragraph"
                    text={paragraph}
                    as="p"
                  />
                ))}
              </div>
            ))}

            {bubble.body ? (
              <div className="day-one-path-modal__full">
                <ModalBody text={bubble.body} />
              </div>
            ) : null}

            {bubble.href ? (
              <div className="day-one-path-modal__actions">
                <Link href={bubble.href} className="day-one-path-modal__cta">
                  深入了解 →
                </Link>
              </div>
            ) : null}
          </>
        ) : null}

        <PathTopicReadingList readings={readings} onSelect={setActiveArticleId} />
      </TopicPhoneDialog>

      <PathTopicArticleDialog
        article={activeArticle}
        onClose={() => setActiveArticleId(null)}
      />
    </>
  )
}
