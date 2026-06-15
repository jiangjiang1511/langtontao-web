'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Coffee2GlossaryTermDialog } from '@/components/sections/coffee2/coffee2-glossary-term-dialog'
import type {
  Coffee2GlossarySegment,
  Coffee2GlossaryTermId,
} from '@/lib/content/coffee-glossary'
import { getCoffee2GlossaryTerm } from '@/lib/content/coffee-glossary'

type Coffee2AnnotatedParagraphProps = {
  segments: readonly Coffee2GlossarySegment[]
  className?: string
}

function GlossaryTermButton({
  termId,
  onOpen,
}: {
  termId: Coffee2GlossaryTermId
  onOpen: (termId: Coffee2GlossaryTermId) => void
}) {
  const term = getCoffee2GlossaryTerm(termId)

  return (
    <button
      type="button"
      className="coffee2-glossary-term"
      onClick={() => onOpen(termId)}
      aria-label={`查看「${term.label}」说明`}
    >
      <span className="coffee2-glossary-term__label">{term.label}</span>
      <span className="coffee2-glossary-term__marker" aria-hidden>
        注
      </span>
    </button>
  )
}

export function Coffee2AnnotatedParagraph({
  segments,
  className,
}: Coffee2AnnotatedParagraphProps) {
  const [activeTermId, setActiveTermId] = useState<Coffee2GlossaryTermId | null>(
    null
  )
  const activeTerm = activeTermId ? getCoffee2GlossaryTerm(activeTermId) : null

  return (
    <>
      <p className={cn(className)}>
        {segments.map((segment, index) => {
          if (segment.type === 'text') {
            return <span key={`text-${index}`}>{segment.value}</span>
          }

          return (
            <GlossaryTermButton
              key={`term-${segment.id}-${index}`}
              termId={segment.id}
              onOpen={setActiveTermId}
            />
          )
        })}
      </p>

      <Coffee2GlossaryTermDialog
        term={activeTerm}
        onClose={() => setActiveTermId(null)}
      />
    </>
  )
}
