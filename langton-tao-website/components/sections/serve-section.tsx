'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/scroll-reveal'

export function ServeSection() {
  return (
    <section
      id="serve"
      className="bg-primary py-20 text-white"
      aria-labelledby="serve-heading"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="flex flex-col items-center text-center">
          <h2
            id="serve-heading"
            className="font-serif text-[26px] font-semibold md:text-[40px]"
          >
            我们服务于谁
          </h2>
          <p className="mt-6 max-w-[640px] font-serif text-[18px] leading-[1.6] text-white/90 md:text-[22px]">
            致力于为高净值家庭提供跨越周期的「家族传承系统解决方案」。
          </p>
          <Button
            variant="outline"
            className="mt-8 h-[48px] border-white/30 bg-transparent px-8 text-[15px] text-white hover:bg-white/10 hover:text-white"
            asChild
          >
            <Link href="/hebi">了解何必家办</Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  )
}
