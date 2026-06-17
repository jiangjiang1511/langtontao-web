import Image from 'next/image'
import Link from 'next/link'
import type { CoffeePreservationArticle } from '@/lib/content/coffee-preservation-insurers'
import { cn } from '@/lib/utils'

type Coffee2PreservationArticleCardProps = {
  article: CoffeePreservationArticle
  className?: string
}

export function Coffee2PreservationArticleCard({
  article,
  className,
}: Coffee2PreservationArticleCardProps) {
  const content = (
    <>
      <div className="coffee2-preservation-article-card__cover relative aspect-[16/10] border-b border-zinc-200 bg-zinc-50">
        <Image
          src={article.coverSrc}
          alt={article.coverAlt ?? article.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="coffee2-preservation-article-card__body p-4 md:p-5">
        <h4 className="text-base font-semibold leading-snug text-zinc-950 md:text-lg">
          {article.title}
        </h4>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {article.tags.map((tag) => (
            <span key={tag} className="c2-chip bg-white text-[0.6875rem]">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </>
  )

  if (article.href) {
    const isExternal = article.href.startsWith('http')

    return (
      <Link
        href={article.href}
        className={cn(
          'coffee2-preservation-article-card c2-card group block overflow-hidden',
          className
        )}
        {...(isExternal
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
      >
        {content}
      </Link>
    )
  }

  return (
    <article
      className={cn(
        'coffee2-preservation-article-card c2-card overflow-hidden',
        className
      )}
    >
      {content}
    </article>
  )
}
