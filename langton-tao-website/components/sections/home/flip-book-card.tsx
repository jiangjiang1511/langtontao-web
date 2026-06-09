'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import type { BookshelfItem } from '@/lib/content/bookshelf'
import { BookCoverFallback } from '@/components/sections/home/book-cover-fallback'
import { cn } from '@/lib/utils'

const OPEN_MS = 720

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function FlipBookCard({
  book,
  navigateOnClick = true,
  className,
}: {
  book: BookshelfItem
  navigateOnClick?: boolean
  className?: string
}) {
  const router = useRouter()
  const [coverError, setCoverError] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleActivate = useCallback(() => {
    if (!navigateOnClick) {
      setIsOpen((prev) => !prev)
      return
    }

    if (isOpen) return
    setIsOpen(true)
    const delay = prefersReducedMotion() ? 0 : OPEN_MS
    window.setTimeout(() => router.push(book.href), delay)
  }, [book.href, isOpen, navigateOnClick, router])

  return (
    <button
      type="button"
      onClick={handleActivate}
      aria-label={`${book.title}，${book.author}。${book.quote}`}
      aria-pressed={!navigateOnClick ? isOpen : undefined}
      className={cn(
        'book-scene group text-left',
        navigateOnClick
          ? 'w-[168px] shrink-0 snap-start md:w-[196px]'
          : 'mx-auto w-full max-w-[196px]',
        isOpen && 'book-scene--navigating',
        className
      )}
    >
      <div className="book-stack">
        <div className="book-flipper">
          <div className="book-inside">
            <p className="book-inside-quote">{book.quote}</p>
            <p className="book-inside-meta">{book.author}</p>
            <p className="book-inside-phase">{book.phaseLabel}</p>
          </div>
          <div className="book-cover">
            <div className="book-cover-face">
              {coverError ? (
                <BookCoverFallback
                  title={book.title}
                  author={book.author}
                  phase={book.phase}
                  className="rounded-sm"
                />
              ) : (
                <Image
                  src={book.coverSrc}
                  alt={book.coverAlt}
                  fill
                  sizes="(max-width: 768px) 168px, 196px"
                  className="rounded-sm object-cover"
                  onError={() => setCoverError(true)}
                />
              )}
            </div>
            <span className="book-spine" aria-hidden />
            <span className="book-cover-edge" aria-hidden />
          </div>
        </div>
      </div>
      <p className="mt-3 line-clamp-2 text-xs font-black leading-snug text-pop-black">
        {book.title}
      </p>
    </button>
  )
}
