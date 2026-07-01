import { PillLink } from '@/components/ui/pill-link'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { smartEnglishMeta } from '@/lib/content/smart-english'

export function EducationTeachCtaSection() {
  return (
    <Coffee2Reveal delay={80}>
      <section
        className="education-teach-cta c2-pop-panel mt-14 md:mt-16"
        aria-labelledby="education-teach-cta-title"
      >
        <p className="c2-pop-stamp">Next Step · 下一步</p>
        <h4
          id="education-teach-cta-title"
          className="mt-3 text-xl font-black tracking-tight text-zinc-950 md:text-2xl"
        >
          用一门语言，打开更大的世界
        </h4>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600 md:text-base">
          {smartEnglishMeta.parentCallout.response}
        </p>
        <PillLink
          href={smartEnglishMeta.ctaHref}
          variant="yellow"
          className="mt-6"
        >
          {smartEnglishMeta.ctaLabel}
        </PillLink>
      </section>
    </Coffee2Reveal>
  )
}
