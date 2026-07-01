'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import { TopicPhoneDialog } from '@/components/shared/topic-phone-dialog'
import {
  yearOneHkCardModule,
  type YearOneHkCardItem,
} from '@/lib/content/year-one-hk-card'
import { cn } from '@/lib/utils'

function HkCardItemModal({
  item,
  open,
  onOpenChange,
}: {
  item: YearOneHkCardItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  if (!item) return null

  const descriptionId = `horizon-hk-card-modal-${item.id}`

  return (
    <TopicPhoneDialog
      open={open}
      onOpenChange={onOpenChange}
      title={item.label}
      eyebrow={yearOneHkCardModule.eyebrow}
      descriptionId={descriptionId}
      className="horizon-hk-card-modal"
      bodyClassName="horizon-hk-card-modal__body"
    >
      <Coffee2AnnotatedText
        className="horizon-hk-card-modal__summary"
        text={item.summary}
        as="p"
      />
      {item.body.split('\n\n').map((paragraph, index) => (
        <Coffee2AnnotatedText
          key={index}
          className="horizon-hk-card-modal__paragraph"
          text={paragraph}
          as="p"
        />
      ))}
    </TopicPhoneDialog>
  )
}

export function HorizonHkCardModule() {
  const [activeItemId, setActiveItemId] = useState<string | null>(null)
  const activeItem =
    yearOneHkCardModule.items.find((item) => item.id === activeItemId) ?? null

  return (
    <div className="horizon-hk-card-module mx-auto mt-12 max-w-5xl border-t border-zinc-200 pt-12 text-center md:mt-16 md:pt-16">
      <p className="c2-eyebrow">{yearOneHkCardModule.eyebrow}</p>
      <h3 className="horizon-hk-card-module__title c2-display mt-3 text-2xl text-zinc-950 md:text-3xl">
        {yearOneHkCardModule.title}
      </h3>

      <div className="horizon-hk-card-module__intro mx-auto mt-6 max-w-3xl md:mt-8">
        {yearOneHkCardModule.intro.map((line, index) => (
          <Coffee2AnnotatedText
            key={line}
            className={cn(
              'horizon-hk-card-module__line text-base leading-relaxed text-zinc-600 md:text-lg',
              index > 0 && 'mt-4'
            )}
            text={line}
            as="p"
          />
        ))}
      </div>

      <div className="horizon-hk-card-module__actions mx-auto mt-8 grid max-w-3xl gap-4 md:mt-10 md:grid-cols-2">
        {yearOneHkCardModule.items.map((item) => (
          <button
            key={item.id}
            type="button"
            className="horizon-hk-card-module__btn"
            onClick={() => setActiveItemId(item.id)}
          >
            <span className="horizon-hk-card-module__btn-label">{item.label}</span>
            <span className="horizon-hk-card-module__btn-hint">{item.summary}</span>
          </button>
        ))}
      </div>

      <div className="horizon-hk-card-module__guide">
        <p className="horizon-hk-card-module__guide-line">{yearOneHkCardModule.guideCta.line}</p>
        <Link href={yearOneHkCardModule.guideCta.href} className="coffee2-cta-button inline-flex">
          {yearOneHkCardModule.guideCta.label}
        </Link>
      </div>

      <HkCardItemModal
        item={activeItem}
        open={activeItemId !== null}
        onOpenChange={(open) => {
          if (!open) setActiveItemId(null)
        }}
      />
    </div>
  )
}
