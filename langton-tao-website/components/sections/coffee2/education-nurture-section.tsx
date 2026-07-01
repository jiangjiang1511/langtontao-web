import { ChildCostCalculatorsSection } from '@/components/sections/coffee2/child-cost-calculators-section'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import { EducationTopicCardsSection } from '@/components/sections/coffee2/education-topic-cards-section'
import { educationYuSectionMeta } from '@/lib/content/coffee-education-topics'

export function EducationNurtureSection() {
  return (
    <section
      className="education-pillar education-pillar--yu mt-16 md:mt-24"
      aria-labelledby="education-yu-title"
    >
      <Coffee2Reveal>
        <p className="c2-pop-stamp">{educationYuSectionMeta.eyebrow}</p>
        <h3
          id="education-yu-title"
          className="mt-3 text-2xl font-black tracking-tight text-zinc-950 md:text-3xl"
        >
          {educationYuSectionMeta.title}
        </h3>
        <Coffee2AnnotatedText
          text={educationYuSectionMeta.lead}
          className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600 md:text-base"
        />
      </Coffee2Reveal>

      <div className="mt-10 md:mt-12">
        <EducationTopicCardsSection pillar="yu" />
      </div>

      <div className="mt-16 md:mt-20">
        <ChildCostCalculatorsSection />
      </div>
    </section>
  )
}
