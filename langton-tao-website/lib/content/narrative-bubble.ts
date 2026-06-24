export type NarrativeSubsection = {
  title: string
  paragraphs: string[]
}

export type NarrativeBubble = {
  id: string
  label: string
  hook?: string
  summary: string
  subsections?: NarrativeSubsection[]
  body?: string
  href?: string
  /** Smooth-scroll to element id (without #) when user clicks the scroll CTA */
  scrollTarget?: string
  scrollCtaLabel?: string
}
