export type NarrativeReadingRef = {
  id: string
  title: string
  outlet: string
}

export type NarrativeSubsection = {
  id?: string
  title: string
  paragraphs: string[]
  readings?: NarrativeReadingRef[]
  /** Optional cover for subsection-matrix topic cards */
  coverSrc?: string
}

export type NarrativeBubble = {
  id: string
  label: string
  hook?: string
  summary: string
  subsections?: NarrativeSubsection[]
  body?: string
  href?: string
  readings?: NarrativeReadingRef[]
  /** Optional cover image for topic cards (placeholder gradient when omitted) */
  coverSrc?: string
  /** Smooth-scroll to element id (without #) when user clicks the scroll CTA */
  scrollTarget?: string
  scrollCtaLabel?: string
}

export type NarrativePathStep = {
  id: string
  title: string
  bubbles: NarrativeBubble[]
}
