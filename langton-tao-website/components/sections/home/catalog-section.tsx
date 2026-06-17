import { bookshelf } from '@/lib/content/home-sections'
import { HorizontalScroll } from '@/components/shared/horizontal-scroll'
import { FlipBookCard } from '@/components/sections/home/flip-book-card'
import { Eyebrow, SectionSurface, SectionTitle } from '@/components/layout/section-surface'
import { PillLink } from '@/components/ui/pill-link'

export function CatalogSection() {
  return (
    <SectionSurface id="catalog" theme="white" aria-labelledby="catalog-title">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <Eyebrow>WHAT WE READ</Eyebrow>
          <SectionTitle id="catalog-title" display>
            朗敦道书架
          </SectionTitle>
          <p className="mt-3 text-sm font-bold text-[color:var(--section-muted)]">
            悬停或点击书籍，查看朗敦道选书金句
          </p>
        </div>
        <PillLink href="/coffee#reading" variant="outline">
          查看更多
        </PillLink>
      </div>
      <HorizontalScroll className="mt-8 gap-8 py-12 md:gap-10 md:py-14">
        {bookshelf.map((book) => (
          <FlipBookCard key={book.id} book={book} navigateOnClick={false} />
        ))}
      </HorizontalScroll>
    </SectionSurface>
  )
}
