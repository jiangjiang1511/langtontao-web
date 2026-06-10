'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HeroImageFrame } from '@/components/sections/home/hero-image-frame'
import { cn } from '@/lib/utils'

const storyAvatars = [
  { label: 'A', tone: 'bg-pop-yellow' },
  { label: 'B', tone: 'bg-pop-white' },
  { label: 'C', tone: 'bg-pop-paper' },
  { label: 'D', tone: 'bg-zinc-300' },
] as const

export function HeroSection() {
  return (
    <section
      id="hero"
      data-theme="paper"
      aria-labelledby="hero-title"
      className="section-surface scroll-mt-20 border-b-2 border-pop-black"
    >
      <div className="relative mx-auto h-[calc(100svh-4rem)] max-w-7xl overflow-hidden px-4 py-6 sm:px-6 md:h-[calc(100svh-4.5rem)] lg:grid lg:h-auto lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-2 lg:items-center lg:gap-16 lg:overflow-visible lg:px-8 lg:py-16">
        <HeroImageFrame
          variant="background"
          className="pointer-events-none absolute -right-6 bottom-8 z-0 w-[72%] max-w-[320px] sm:-right-4 sm:max-w-[360px] lg:hidden"
        />

        <div className="relative z-10 flex h-full min-h-0 flex-col justify-between lg:h-auto lg:justify-start">
          <h1
            id="hero-title"
            className="text-display max-w-3xl text-[3rem] leading-[0.92] text-pop-black sm:text-[3.5rem] md:text-[4rem] lg:text-[4.5rem] xl:text-[5.25rem]"
          >
            <Link
              href="/langton"
              className="group block w-fit rounded-lg border-2 border-transparent px-1 -mx-1 transition-colors hover:border-pop-black hover:bg-pop-yellow focus-visible:border-pop-black focus-visible:bg-pop-yellow focus-visible:outline-none"
            >
              <span className="block">朗敦道 LangtonTAO</span>
              <span className="block">VFO / MFO Leader in China</span>
              <span className="mt-2 block text-xs font-black uppercase tracking-widest text-pop-black/60 group-hover:text-pop-black sm:mt-3 sm:text-sm">
                了解朗敦道 →
              </span>
            </Link>
            <span className="mt-3 block text-xl font-black leading-snug sm:text-2xl md:text-3xl lg:text-[2rem]">
              ——为华人家庭理财提供系统解决方案
            </span>
          </h1>

          <div className="lg:mt-5">
            <p className="max-w-md text-base font-bold leading-relaxed text-pop-black sm:text-lg md:mt-6">
              人生认知定投计划，普通人的诚实投资学
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center lg:mt-8">
              <Button variant="default" size="lg" asChild>
                <Link href="/member">加入我们</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#upcoming-events">查看活动日历</a>
              </Button>
            </div>
          </div>

          <div className="lg:mt-12">
            <p className="text-sm font-bold text-pop-black">我们的故事</p>
            <div className="mt-3 flex items-center">
              <Link
                href="/community"
                className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-pop-black bg-pop-black text-pop-white transition-transform hover:-translate-y-0.5"
                aria-label="查看会员故事"
              >
                <ArrowRight className="h-5 w-5" />
              </Link>
              <div className="flex items-center">
                {storyAvatars.map((avatar, index) => (
                  <div
                    key={avatar.label}
                    className={cn(
                      '-ml-3 flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-pop-black',
                      avatar.tone
                    )}
                    style={{ zIndex: storyAvatars.length - index }}
                  >
                    <span className="text-xs font-black text-pop-black">
                      {avatar.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <HeroImageFrame className="mx-auto hidden w-full max-w-md lg:block lg:max-w-none" />
      </div>
    </section>
  )
}
