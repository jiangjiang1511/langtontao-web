import type {
  NarrativeBubble,
  NarrativePathStep,
  NarrativeSubsection,
} from '@/lib/content/narrative-bubble'

export type PathHubVariant = 'default' | 'subsection-matrix'

export type PathHubMatrixBubbleItem = {
  type: 'bubble'
  id: string
  bubble: NarrativeBubble
}

export type PathHubMatrixSubsectionItem = {
  type: 'subsection'
  id: string
  parentBubble: NarrativeBubble
  subsection: NarrativeSubsection
}

export type PathHubMatrixItem =
  | PathHubMatrixBubbleItem
  | PathHubMatrixSubsectionItem

export function subsectionToCardBubble(
  subsection: NarrativeSubsection,
  parentBubble: NarrativeBubble
): NarrativeBubble {
  const [first, ...rest] = subsection.paragraphs
  return {
    id: subsection.id ?? subsection.title,
    label: subsection.title,
    summary: first ?? '',
    body: rest.length > 0 ? rest.join('\n\n') : undefined,
    coverSrc: subsection.coverSrc ?? parentBubble.coverSrc,
    readings: subsection.readings,
  }
}

export function getPathHubMatrixItems(
  step: NarrativePathStep,
  variant: PathHubVariant
): PathHubMatrixItem[] {
  if (variant !== 'subsection-matrix') {
    return step.bubbles.map((bubble) => ({
      type: 'bubble',
      id: bubble.id,
      bubble,
    }))
  }

  const primary = step.bubbles[0]
  if (primary?.subsections?.length) {
    return primary.subsections.map((subsection) => ({
      type: 'subsection',
      id: subsection.id ?? subsection.title,
      parentBubble: primary,
      subsection,
    }))
  }

  return step.bubbles.map((bubble) => ({
    type: 'bubble',
    id: bubble.id,
    bubble,
  }))
}

export function getPathHubStageLead(step: NarrativePathStep, variant: PathHubVariant): string {
  const first = step.bubbles[0]
  if (variant === 'subsection-matrix') {
    return first?.hook ?? first?.summary ?? ''
  }
  return first?.hook ?? first?.summary ?? ''
}

export function getPathHubTabBubbleLabel(step: NarrativePathStep): string | null {
  if (step.bubbles.length !== 1) return null
  return step.bubbles[0]?.label ?? null
}
