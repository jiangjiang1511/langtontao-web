import Link from 'next/link'
import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import { Coffee2DisplayTypewriter } from '@/components/sections/coffee2/coffee2-display-typewriter'
import { ReadingGallerySection } from '@/components/sections/coffee2/reading-gallery-section'
import { JarsyReveal } from '@/components/jarsy/jarsy-reveal'
import { ReadingBookshelfRow } from '@/components/sections/education2/reading-bookshelf-row'
import {
  readingPhilosophyIntro,
  readingSectionMeta,
} from '@/lib/content/education2-page'

export function Education2ReadingSection() {
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
            <Coffee2DisplayTypewriter
              text={readingSectionMeta.title}
              charStagger={100}
            />
          </h2>
          <p className="mt-4 text-xl font-semibold tracking-tight text-zinc-500 md:text-2xl">
            <Coffee2AnnotatedText as="span" text={readingSectionMeta.tagline} />
          </p>
          <p className="mt-4 text-sm text-zinc-500">{readingSectionMeta.helper}</p>
        </JarsyReveal>

        <ReadingGallerySection />

        <ReadingBookshelfRow />

        <JarsyReveal delay={80} className="mt-12">
          <div className="reading-philosophy-card c2-card p-6 text-center md:p-8">
            <h3 className="text-xl font-semibold text-zinc-950 md:text-2xl">
              {readingPhilosophyIntro.title}
            </h3>
            <div className="mx-auto mt-6 grid max-w-3xl gap-6">
              {readingPhilosophyIntro.paragraphs.map((paragraph) => (
                <Coffee2AnnotatedText
                  key={paragraph.slice(0, 24)}
                  text={paragraph}
                  className="text-base leading-relaxed text-zinc-600"
                />
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <Link
                href={readingPhilosophyIntro.ctaHref}
                className="coffee2-cta-button"
              >
                {readingPhilosophyIntro.ctaLabel}
              </Link>
            </div>
          </div>
        </JarsyReveal>
      </div>
    </section>
  )
}
