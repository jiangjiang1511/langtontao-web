'use client'

import Link from 'next/link'
import type { CSSProperties } from 'react'
import type { FiftyYearProduct } from '@/lib/content/fifty-year-narrative'
import { cn } from '@/lib/utils'
import {
  CENTER_MOTION_STAGGER_MS,
  useCenterZoneVisible,
} from '@/components/sections/home-jarsy/use-center-zone-visible'
import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'

type HomeJarsyFeatureBlocksProps = {
  products: FiftyYearProduct[]
}

function FeatureCard({
  product,
  index,
  total,
  visible,
}: {
  product: FiftyYearProduct
  index: number
  total: number
  visible: boolean
}) {
  const style = {
    '--c2-reveal-delay': `${index * CENTER_MOTION_STAGGER_MS}ms`,
    '--c2-exit-delay': `${(total - 1 - index) * CENTER_MOTION_STAGGER_MS}ms`,
  } as CSSProperties

  return (
    <article
      data-visible={visible ? 'true' : 'false'}
      style={style}
      className="home-jarsy-center-motion flex flex-col items-center text-center"
      aria-labelledby={`feature-${product.label}`}
    >
      <div
        className={cn(
          'relative aspect-square w-full overflow-hidden rounded-2xl border border-zinc-200',
          product.visualClass ??
            'bg-gradient-to-br from-zinc-100 via-zinc-50 to-white'
        )}
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.7),transparent_55%)]" />
        <div className="absolute bottom-0 left-0 p-5">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">
            {String(index + 1).padStart(2, '0')}
          </p>
        </div>
      </div>

      <h3
        id={`feature-${product.label}`}
        className="mt-6 text-xl font-semibold leading-snug tracking-tight text-zinc-950 md:mt-8 md:text-2xl"
      >
        {product.label}
      </h3>

      {product.summary ? (
        <p className="mt-3 text-sm leading-relaxed text-zinc-600 md:mt-4 md:text-base">
          <Coffee2AnnotatedText text={product.summary} as="span" />
        </p>
      ) : null}

      {product.subItems && product.subItems.length > 0 ? (
        <ul className="mt-4 flex flex-wrap justify-center gap-2 md:mt-5">
          {product.subItems.map((item) => (
            <li key={item.label}>
              {item.href ? (
                <Link
                  href={item.href}
                  className="c2-chip bg-white transition-colors hover:border-zinc-400"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="c2-chip bg-white">{item.label}</span>
              )}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  )
}

export function HomeJarsyFeatureBlocks({ products }: HomeJarsyFeatureBlocksProps) {
  const { ref, visible } = useCenterZoneVisible<HTMLDivElement>()

  return (
    <div className="home-jarsy-feature-blocks mx-auto mt-12 max-w-6xl md:mt-16">
      <div
        ref={ref}
        className="home-jarsy-feature-row grid gap-10 md:grid-cols-3 md:gap-6 lg:gap-10"
      >
        {products.map((product, index) => (
          <FeatureCard
            key={product.label}
            product={product}
            index={index}
            total={products.length}
            visible={visible}
          />
        ))}
      </div>
    </div>
  )
}
