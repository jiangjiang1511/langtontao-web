import Link from 'next/link'
import {
  getAdjacentCaseStories,
  type CaseStory,
} from '@/lib/content/cases'
import { PillLink } from '@/components/ui/pill-link'
import { SectionSurface } from '@/components/layout/section-surface'

export function CaseStoryDetail({ story }: { story: CaseStory }) {
  const { prev, next } = getAdjacentCaseStories(story.slug)

  return (
    <SectionSurface
      theme="white"
      narrow
      className="pt-24 md:pt-28"
      aria-labelledby="case-detail-title"
    >
      <article>
        <p className="text-xs font-black uppercase tracking-widest text-pop-black/50">
          {story.author}
          {story.publishedAt ? ` · ${story.publishedAt}` : null}
        </p>
        <h1
          id="case-detail-title"
          className="mt-4 text-2xl font-black leading-tight text-pop-black md:text-4xl"
        >
          {story.title}
        </h1>

        <div className="mt-10 space-y-6">
          {story.body.map((paragraph) => (
            <p
              key={paragraph}
              className="text-base font-bold leading-relaxed text-pop-black/80 md:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </article>

      <nav
        className="mt-12 flex flex-col gap-4 border-t-2 border-pop-black/10 pt-8 sm:flex-row sm:items-center sm:justify-between"
        aria-label="案例导航"
      >
        {prev ? (
          <Link
            href={`/cases/${prev.slug}`}
            className="text-sm font-black text-pop-black/70 hover:text-pop-black"
          >
            ‹ {prev.author}
          </Link>
        ) : (
          <span />
        )}

        <PillLink href="/cases" variant="outline">
          返回案例
        </PillLink>

        {next ? (
          <Link
            href={`/cases/${next.slug}`}
            className="text-right text-sm font-black text-pop-black/70 hover:text-pop-black"
          >
            {next.author} ›
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </SectionSurface>
  )
}
