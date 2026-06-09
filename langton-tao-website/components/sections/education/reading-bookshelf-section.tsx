import { FlipBookCard } from '@/components/sections/home/flip-book-card'
import {
  Eyebrow,
  SectionSurface,
  SectionTitle,
} from '@/components/layout/section-surface'
import { readingSectionMeta } from '@/lib/content/education-page'
import { bookshelf, type BookshelfPhase } from '@/lib/content/home-sections'

const phaseOrder: BookshelfPhase[] = [
  'awakening',
  'foundation',
  'weapon',
  'dragon',
]

export function ReadingBookshelfSection() {
  const grouped = phaseOrder.map((phase) => ({
    phase,
    label: bookshelf.find((book) => book.phase === phase)?.phaseLabel ?? phase,
    books: bookshelf.filter((book) => book.phase === phase),
  }))

  return (
    <SectionSurface
      id="reading"
      theme="paper"
      className="pt-24 md:pt-28"
      aria-labelledby="reading-title"
    >
      <Eyebrow>{readingSectionMeta.eyebrow}</Eyebrow>
      <SectionTitle id="reading-title" display>
        {readingSectionMeta.title}
      </SectionTitle>
      <p className="mt-6 max-w-2xl text-base font-bold leading-relaxed text-[color:var(--section-muted)] md:text-lg">
        {readingSectionMeta.tagline}
      </p>
      <p className="mt-3 text-sm font-bold text-[color:var(--section-muted)]">
        {readingSectionMeta.lead}
      </p>

      <div className="mt-12 space-y-14 md:space-y-16">
        {grouped.map((group) => (
          <section
            key={group.phase}
            aria-labelledby={`phase-${group.phase}`}
          >
            <h3
              id={`phase-${group.phase}`}
              className="text-sm font-black uppercase tracking-widest text-[color:var(--section-muted)]"
            >
              {group.label}
            </h3>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {group.books.map((book) => (
                <li key={book.id}>
                  <FlipBookCard book={book} navigateOnClick={false} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </SectionSurface>
  )
}
