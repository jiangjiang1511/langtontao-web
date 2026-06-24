'use client'

import { cn } from '@/lib/utils'
import { useGlossary } from '@/components/providers/glossary-provider'
import type {
  Coffee2GlossarySegment,
  Coffee2GlossaryTermId,
  Coffee2SectionCopyBlock,
} from '@/lib/content/coffee-glossary'
import {
  annotateCoffeeGlossaryText,
  getCoffee2GlossaryTerm,
  isAnnotatedSectionCopyBlock,
} from '@/lib/content/coffee-glossary'

type Coffee2GlossaryTermButtonProps = {
  termId: Coffee2GlossaryTermId
}

export function Coffee2GlossaryTermButton({
  termId,
}: Coffee2GlossaryTermButtonProps) {
  const { openGlossaryTerm } = useGlossary()
  const term = getCoffee2GlossaryTerm(termId)

  return (
    <span
      className="coffee2-glossary-term"
      role="button"
      tabIndex={0}
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        openGlossaryTerm(termId)
      }}
      onKeyDown={(event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return
        event.preventDefault()
        event.stopPropagation()
        openGlossaryTerm(termId)
      }}
      aria-label={`查看「${term.label}」说明`}
    >
      <span className="coffee2-glossary-term__label">{term.label}</span>
      <span className="coffee2-glossary-term__marker" aria-hidden>
        注
      </span>
    </span>
  )
}

type Coffee2AnnotatedParagraphProps = {
  segments: readonly Coffee2GlossarySegment[]
  className?: string
  as?: 'p' | 'span'
}

export function Coffee2AnnotatedParagraph({
  segments,
  className,
  as = 'p',
}: Coffee2AnnotatedParagraphProps) {
  const Wrapper = as

  return (
    <Wrapper className={cn(className)}>
      {segments.map((segment, index) => {
        if (segment.type === 'text') {
          return <span key={`text-${index}`}>{segment.value}</span>
        }

        return (
          <Coffee2GlossaryTermButton
            key={`term-${segment.id}-${index}`}
            termId={segment.id}
          />
        )
      })}
    </Wrapper>
  )
}

type Coffee2AnnotatedTextProps = {
  text: string
  className?: string
  as?: 'p' | 'span'
}

export function Coffee2AnnotatedText({
  text,
  className,
  as = 'p',
}: Coffee2AnnotatedTextProps) {
  return (
    <Coffee2AnnotatedParagraph
      segments={annotateCoffeeGlossaryText(text)}
      className={className}
      as={as}
    />
  )
}

type Coffee2AnnotatedCopyBlockProps = {
  block: Coffee2SectionCopyBlock
  className?: string
  as?: 'p' | 'span'
}

export function Coffee2AnnotatedCopyBlock({
  block,
  className,
  as = 'p',
}: Coffee2AnnotatedCopyBlockProps) {
  if (isAnnotatedSectionCopyBlock(block)) {
    return (
      <Coffee2AnnotatedParagraph
        segments={block.segments}
        className={className}
        as={as}
      />
    )
  }

  return <Coffee2AnnotatedText text={block} className={className} as={as} />
}
