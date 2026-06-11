import Link from 'next/link'
import { JarsyReveal } from '@/components/jarsy/jarsy-reveal'
import {
  getAdjacentCaseStories,
  type CaseStory,
} from '@/lib/content/cases2-page'

export function Cases2Detail({ story }: { story: CaseStory }) {
  const { prev, next } = getAdjacentCaseStories(story.slug)

  return (
    <div className="jarsy-v2-page bg-white text-zinc-950">
      <section
        className="scroll-mt-20 border-b border-zinc-200 py-16 md:py-24"
        aria-labelledby="cases2-detail-title"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <JarsyReveal eager>
            <p className="c2-eyebrow">
              {story.author}
              {story.publishedAt ? ` · ${story.publishedAt}` : null}
            </p>
            <h1
              id="cases2-detail-title"
              className="c2-display mt-4 text-3xl text-zinc-950 md:text-5xl"
            >
              {story.title}
            </h1>
          </JarsyReveal>

          <div className="mt-10 space-y-6">
            {story.body.map((paragraph, index) => (
              <JarsyReveal key={paragraph.slice(0, 32)} delay={index * 60}>
                <p className="text-base leading-relaxed text-zinc-700 md:text-lg">
                  {paragraph}
                </p>
              </JarsyReveal>
            ))}
          </div>

          <JarsyReveal delay={200} className="mt-12">
            <nav
              className="flex flex-col gap-4 border-t border-zinc-200 pt-8 sm:flex-row sm:items-center sm:justify-between"
              aria-label="案例导航"
            >
              {prev ? (
                <Link
                  href={`/cases/${prev.slug}`}
                  className="text-sm font-medium text-zinc-600 hover:text-zinc-950"
                >
                  ‹ {prev.author}
                </Link>
              ) : (
                <span />
              )}
              <Link
                href="/langtontao#checkup-cases"
                className="c2-btn-secondary text-center text-sm"
              >
                返回案例
              </Link>
              {next ? (
                <Link
                  href={`/cases/${next.slug}`}
                  className="text-right text-sm font-medium text-zinc-600 hover:text-zinc-950"
                >
                  {next.author} ›
                </Link>
              ) : (
                <span />
              )}
            </nav>
          </JarsyReveal>
        </div>
      </section>
    </div>
  )
}
