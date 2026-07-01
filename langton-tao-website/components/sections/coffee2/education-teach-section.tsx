import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import { EducationSmartEnglishShowcase } from '@/components/sections/coffee2/education-smart-english-showcase'
import { EducationTeachCtaSection } from '@/components/sections/coffee2/education-teach-cta-section'
import { EducationTopicCardsSection } from '@/components/sections/coffee2/education-topic-cards-section'
import { educationJiaoSectionMeta } from '@/lib/content/coffee-education-topics'

export function EducationTeachSection() {
  return (
    <section
      className="education-pillar education-pillar--jiao mt-16 md:mt-20"
      aria-labelledby="education-jiao-title"
    >
      <Coffee2Reveal>
        <p className="c2-pop-stamp">{educationJiaoSectionMeta.eyebrow}</p>
        <h3
          id="education-jiao-title"
          className="mt-3 text-2xl font-black tracking-tight text-zinc-950 md:text-3xl"
        >
          {educationJiaoSectionMeta.title}
        </h3>
        <Coffee2AnnotatedText
          text={educationJiaoSectionMeta.lead}
          className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600 md:text-base"
        />
      </Coffee2Reveal>

      <div className="mt-10 md:mt-12">
        <EducationTopicCardsSection pillar="jiao" />
      </div>

      <div className="mt-14 md:mt-16">
        <EducationSmartEnglishShowcase />
      </div>

      <EducationTeachCtaSection />
    </section>
  )
}
