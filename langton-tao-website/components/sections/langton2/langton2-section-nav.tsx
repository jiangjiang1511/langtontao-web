'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { langtonSectionNav } from '@/lib/content/langton-page'
import { cn } from '@/lib/utils'

export function Langton2SectionNav() {
  const [activeId, setActiveId] = useState<string>(
    langtonSectionNav[0]?.id ?? 'mission'
  )

  useEffect(() => {
    const sections = langtonSectionNav
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
      aria-label="关于朗敦道分区导航"
      className="sticky top-[4.5rem] z-10 border-b border-zinc-200 bg-white/95 py-3 backdrop-blur-sm md:top-20"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-2 px-4 sm:px-6 lg:px-8">
        {langtonSectionNav.map((item) => (
          <Link
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              'rounded-full px-3 py-2 text-xs font-bold transition-colors sm:px-4 sm:text-sm',
              activeId === item.id
                ? 'bg-zinc-950 text-white'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-950'
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
