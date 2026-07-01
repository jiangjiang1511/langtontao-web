import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { LangtontaoSubsectionHeader } from '@/components/sections/langtontao/langtontao-subsection-header'
import { langtontaoSuperheroPhilosophy } from '@/lib/content/langtontao/langtontao-superhero-journey'

export function LangtontaoSuperheroPhilosophy() {
  const { eyebrow, title, lead, paragraphs } = langtontaoSuperheroPhilosophy

  return (
    <div className="lt-superhero-philosophy">
      <LangtontaoSubsectionHeader
        eyebrow={eyebrow}
        title={title}
        lead={lead}
        theme="superhero"
      />

      <div className="mt-8 max-w-3xl space-y-4">
        {paragraphs.map((paragraph, index) => (
          <Coffee2Reveal key={index} delay={80 + index * 60}>
            <p className="text-sm leading-relaxed text-zinc-600 md:text-base">{paragraph}</p>
          </Coffee2Reveal>
        ))}
      </div>
    </div>
  )
}
