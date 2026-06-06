import Link from 'next/link'
import { bookshelf } from '@/lib/content/home-sections'
import { HorizontalScroll } from '@/components/shared/horizontal-scroll'
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
            点击书籍，查看过往每月读书的相关活动
          </p>
        </div>
        <PillLink href="/education#reading" variant="outline">
          查看更多
        </PillLink>
      </div>
      <HorizontalScroll className="mt-8">
        {bookshelf.map((book) => (
          <Link
            key={`${book.title}-${book.date}`}
            href="/education#reading"
            className="pop-card w-[220px] shrink-0 snap-start rounded-lg border-2 border-pop-black bg-pop-paper p-5 md:w-[260px]"
          >
            <p className="text-sm font-black leading-snug text-pop-black">
              {book.title}
            </p>
            <p className="mt-3 text-sm font-bold text-[color:var(--section-muted)]">
              {book.author}
            </p>
            <p className="mt-2 text-xs font-bold text-[color:var(--section-muted)]">
              {book.date}
            </p>
          </Link>
        ))}
      </HorizontalScroll>
    </SectionSurface>
  )
}
