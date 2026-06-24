import Link from 'next/link'
import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { coffee2CollaborationCta } from '@/lib/content/coffee-manifesto'

export function Coffee2CollaborationCta() {
  return (
    <div className="coffee2-collaboration-cta">
      <Coffee2Reveal delay={180} className="coffee2-collaboration-cta__copy">
        {coffee2CollaborationCta.paragraphs.map((paragraph) => (
          <Coffee2AnnotatedText
            key={paragraph.slice(0, 24)}
            text={paragraph}
            className="text-base leading-relaxed text-zinc-600 md:text-lg"
          />
        ))}
      </Coffee2Reveal>

      <Coffee2Reveal delay={720} className="c2-reveal-fade coffee2-collaboration-cta__action">
        <Link href={coffee2CollaborationCta.ctaHref} className="coffee2-cta-button">
          {coffee2CollaborationCta.ctaLabel}
        </Link>
      </Coffee2Reveal>
    </div>
  )
}
