'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { langtontaoSectionNav } from '@/lib/content/langtontao-page'
import { cn } from '@/lib/utils'

export function LangtontaoSectionNav() {
  const [activeId, setActiveId] = useState<string>(
    langtontaoSectionNav[0]?.id ?? 'education'
  )

  useEffect(() => {
    const sections = langtontaoSectionNav
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => element !== null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0, 0.15, 0.35],
      }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      aria-label="朗敦道业务板块导航"
      className="sticky top-[4.5rem] z-10 border-b border-zinc-200 bg-white/95 py-3 backdrop-blur-sm md:top-20"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-2 px-4 sm:px-6 lg:px-8">
        {langtontaoSectionNav.map((item) => (
          <Link
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-bold transition-colors',
              activeId === item.id
                ? 'bg-zinc-950 text-white'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-950'
            )}
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="/langton"
          className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-bold text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-950"
        >
          关于朗敦道
        </Link>
      </div>
    </nav>
  )
}
