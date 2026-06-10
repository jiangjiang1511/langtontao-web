import Image from 'next/image'
import Link from 'next/link'
import { JarsyReveal } from '@/components/jarsy/jarsy-reveal'
import {
  caseStories,
  cases2IndexMeta,
} from '@/lib/content/cases2-page'

export function Cases2IndexSection() {
  return (
    <section
      id="cases-index"
      className="scroll-mt-20 border-b border-zinc-200 py-16 md:py-24"
      aria-labelledby="cases2-index-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <JarsyReveal className="max-w-2xl">
          <p className="c2-eyebrow">{cases2IndexMeta.eyebrow}</p>
          <h2
            id="cases2-index-title"
            className="c2-display mt-4 text-4xl text-zinc-950 md:text-5xl"
          >
            {cases2IndexMeta.title}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-zinc-600 md:text-lg">
            {cases2IndexMeta.lead}
          </p>
        </JarsyReveal>

        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-8">
          {caseStories.map((story, index) => (
            <JarsyReveal key={story.slug} as="li" delay={index * 80}>
              <Link
                href={`/cases/${story.slug}`}
                className="c2-card group block overflow-hidden"
              >
                <div className="relative aspect-[16/10] border-b border-zinc-200 bg-zinc-50">
                  <Image
                    src={story.coverSrc}
                    alt={story.coverAlt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
                    {story.author}
                    {story.publishedAt ? ` · ${story.publishedAt}` : null}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold leading-snug text-zinc-950 md:text-2xl">
                    {story.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                    {story.excerpt}
                  </p>
                  <p className="mt-6 text-sm font-semibold text-zinc-950">
                    阅读全文 →
                  </p>
                </div>
              </Link>
            </JarsyReveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
