import Image from 'next/image'
import Link from 'next/link'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { LangtontaoSubsectionHeader } from '@/components/sections/langtontao/langtontao-subsection-header'
import { caseStories } from '@/lib/content/cases'
import { langtontaoCheckupCasesIntro } from '@/lib/content/langtontao-page'

export function LangtontaoCheckupCasesSection() {
  return (
    <section
      id="checkup-cases"
      className="lt-checkup-cases scroll-mt-28"
      aria-labelledby="langtontao-checkup-cases-title"
    >
      <LangtontaoSubsectionHeader
        id="langtontao-checkup-cases-title"
        eyebrow={langtontaoCheckupCasesIntro.eyebrow}
        title={langtontaoCheckupCasesIntro.title}
        lead={langtontaoCheckupCasesIntro.lead}
        theme="checkup"
        align="center"
      />

      <ul className="lt-checkup-cases__grid">
        {caseStories.map((story, index) => (
          <Coffee2Reveal key={story.slug} delay={60 + index * 50} as="li">
            <Link href={`/cases/${story.slug}`} className="lt-checkup-cases__card group">
              <div className="lt-checkup-cases__media relative aspect-[16/9] overflow-hidden">
                <Image
                  src={story.coverSrc}
                  alt={story.coverAlt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="lt-checkup-cases__body">
                <p className="lt-checkup-cases__meta">
                  {story.author}
                  {story.publishedAt ? ` · ${story.publishedAt}` : null}
                </p>
                <h3 className="lt-checkup-cases__title">{story.title}</h3>
                <p className="lt-checkup-cases__excerpt">{story.excerpt}</p>
                <span className="lt-checkup-cases__cta">阅读全文 →</span>
              </div>
            </Link>
          </Coffee2Reveal>
        ))}
      </ul>
    </section>
  )
}
