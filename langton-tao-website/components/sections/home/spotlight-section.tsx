import Link from 'next/link'
import { spotlightStory } from '@/lib/content/home-sections'
import { SectionSurface } from '@/components/layout/section-surface'

export function SpotlightSection() {
  return (
    <SectionSurface id="spotlight" theme="white" narrow aria-labelledby="spotlight-quote">
      <blockquote
        id="spotlight-quote"
        className="border-l-4 border-pop-yellow pl-6 text-xl font-bold leading-relaxed text-pop-black md:text-2xl"
      >
        「{spotlightStory.quote}」
      </blockquote>
      <footer className="mt-8">
        <p className="font-black text-pop-black">{spotlightStory.name}</p>
        <p className="mt-1 text-sm font-bold text-[color:var(--section-muted)]">
          {spotlightStory.subtitle}
        </p>
        <Link
          href="/community"
          className="mt-6 inline-block text-sm font-black text-pop-black hover:underline"
        >
          阅读更多 →
        </Link>
      </footer>
    </SectionSurface>
  )
}
