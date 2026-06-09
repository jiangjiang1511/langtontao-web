import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { CaseStory } from '@/lib/content/cases'

export function CaseStoryCard({ story }: { story: CaseStory }) {
  const href = `/cases/${story.slug}`

  return (
    <article className="flex flex-col gap-5">
      <Link
        href={href}
        className="relative block aspect-[4/3] overflow-hidden rounded-lg border-2 border-pop-black bg-pop-paper"
      >
        <Image
          src={story.coverSrc}
          alt={story.coverAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </Link>

      <div className="flex flex-col gap-3">
        <Link href={href} className="group">
          <p className="text-xs font-black uppercase tracking-widest text-pop-black/60">
            {story.author}
          </p>
          <h2 className="mt-2 text-lg font-black leading-snug text-pop-black transition-transform group-hover:-translate-y-0.5 md:text-xl">
            {story.title}
          </h2>
        </Link>

        <Link
          href={href}
          className="inline-flex w-fit items-center gap-2 text-xs font-black uppercase tracking-widest text-pop-black transition-transform hover:-translate-y-0.5"
        >
          阅读全文
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </article>
  )
}
