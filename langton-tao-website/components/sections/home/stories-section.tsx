import { memberStories } from '@/lib/content/home-sections'
import { Marquee } from '@/components/shared/marquee'
import { PillLink } from '@/components/ui/pill-link'
import { SectionSurface } from '@/components/layout/section-surface'
import { cn } from '@/lib/utils'

export function StoriesSection() {
  const featured = memberStories[0]

  return (
    <SectionSurface
      id="stories"
      theme="yellow"
      aria-labelledby="stories-title"
      className="overflow-hidden"
    >
      <blockquote className="mx-auto max-w-3xl text-center text-xl font-bold leading-snug text-pop-black md:text-3xl lg:text-4xl">
        「{featured.quote}」
      </blockquote>

      <div className="mt-8 flex justify-center">
        <PillLink href="/cases" variant="dark">
          会员故事
        </PillLink>
      </div>

      <p className="sr-only" id="stories-title">
        会员故事
      </p>

      <div className="mt-12">
        <Marquee>
          {memberStories.map((story) => (
            <article
              key={`${story.name}-${story.city}`}
              className="w-[300px] shrink-0 rounded-2xl border-2 border-pop-black bg-pop-white p-6 shadow-pop-black md:w-[380px]"
            >
              <p className="text-sm font-bold leading-relaxed text-pop-black">
                {story.quote}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full border-2 border-pop-black bg-pop-yellow text-sm font-black'
                  )}
                >
                  {story.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-black text-pop-black">
                    {story.name}
                  </p>
                  <p className="text-xs font-bold text-[color:var(--section-muted)]">
                    {story.city}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </Marquee>
      </div>
    </SectionSurface>
  )
}
