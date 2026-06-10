import Link from 'next/link'
import { FlipBookCard } from '@/components/sections/home/flip-book-card'
import { JarsyReveal } from '@/components/jarsy/jarsy-reveal'
import {
  getBooksByPhase,
  getPhaseLabel,
  phaseOrder,
  readingPhilosophyIntro,
  readingSectionMeta,
} from '@/lib/content/education2-page'

export function Education2ReadingSection() {
  const grouped = phaseOrder.map((phase) => ({
    phase,
    label: getPhaseLabel(phase),
    books: getBooksByPhase(phase),
  }))

  return (
    <section
      id="reading"
      className="scroll-mt-20 border-b border-zinc-200 py-16 md:py-24"
      aria-labelledby="education2-reading-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <JarsyReveal className="max-w-2xl">
          <p className="c2-eyebrow">{readingSectionMeta.eyebrow}</p>
          <h2
            id="education2-reading-title"
            className="c2-display mt-4 text-4xl text-zinc-950 md:text-5xl"
          >
            {readingSectionMeta.title}
          </h2>
          <p className="mt-4 text-xl font-semibold tracking-tight text-zinc-500 md:text-2xl">
            {readingSectionMeta.tagline}
          </p>
          <p className="mt-4 text-sm text-zinc-500">{readingSectionMeta.helper}</p>
        </JarsyReveal>

        <JarsyReveal delay={80} className="mt-12">
          <div className="c2-card p-6 md:p-8">
            <h3 className="text-xl font-semibold text-zinc-950 md:text-2xl">
              {readingPhilosophyIntro.title}
            </h3>
            <div className="mt-6 grid gap-6 md:grid-cols-2 md:gap-8">
              {readingPhilosophyIntro.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="text-base leading-relaxed text-zinc-600"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <Link
              href={readingPhilosophyIntro.ctaHref}
              className="c2-btn-primary mt-8"
            >
              {readingPhilosophyIntro.ctaLabel}
            </Link>
          </div>
        </JarsyReveal>

        <div className="mt-16 space-y-16 md:mt-20 md:space-y-20">
          {grouped.map((group, groupIndex) => (
            <div key={group.phase}>
              <JarsyReveal delay={groupIndex * 60}>
                <h3
                  id={`phase-${group.phase}`}
                  className="border-b border-zinc-200 pb-3 text-xs font-medium uppercase tracking-widest text-zinc-500"
                >
                  {group.label}
                </h3>
              </JarsyReveal>
              <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {group.books.map((book, bookIndex) => (
                  <JarsyReveal
                    key={book.id}
                    as="li"
                    delay={groupIndex * 60 + bookIndex * 40}
                  >
                    <FlipBookCard book={book} navigateOnClick={false} />
                  </JarsyReveal>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
