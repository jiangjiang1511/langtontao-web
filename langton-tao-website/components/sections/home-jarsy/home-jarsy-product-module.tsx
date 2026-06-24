import Link from 'next/link'
import { JarsyReveal } from '@/components/jarsy/jarsy-reveal'
import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import { HomeJarsyInsurerGrid } from '@/components/sections/home-jarsy/home-jarsy-insurer-grid'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { FiftyYearProduct } from '@/lib/content/fifty-year-narrative'
import { cn } from '@/lib/utils'

function resolveVariant(product: FiftyYearProduct) {
  if (product.variant) return product.variant
  if (product.insurers?.length) return 'insurerGrid'
  if (product.subItems?.length) return 'accordion'
  if (product.href) return 'linkCard'
  return 'plain'
}

function AccordionProduct({
  product,
  id,
}: {
  product: FiftyYearProduct
  id: string
}) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={id} className="border-zinc-200">
        <AccordionTrigger className="c2-faq-trigger justify-center py-4 text-center text-base hover:no-underline [&>svg]:ml-2">
          <Coffee2AnnotatedText as="span" text={product.label} />
        </AccordionTrigger>
        <AccordionContent className="c2-faq-content pb-4 text-center">
          <ul className="space-y-2">
            {product.subItems?.map((item) => (
              <li key={item.label}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="text-zinc-700 transition-colors hover:text-zinc-950"
                  >
                    <Coffee2AnnotatedText as="span" text={item.label} />
                  </Link>
                ) : (
                  <Coffee2AnnotatedText as="span" text={item.label} />
                )}
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

function LinkCardProduct({ product }: { product: FiftyYearProduct }) {
  const content = (
    <>
      <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">
        进入
      </p>
      <p className="mt-3 text-xl font-semibold tracking-tight text-zinc-950 md:text-2xl">
        <Coffee2AnnotatedText as="span" text={product.label} />
      </p>
    </>
  )

  if (!product.href) {
    return <div className="c2-card p-6 text-center md:p-8">{content}</div>
  }

  return (
    <Link href={product.href} className="c2-card block p-6 text-center md:p-8">
      {content}
    </Link>
  )
}

function PlainProduct({ product }: { product: FiftyYearProduct }) {
  return (
    <span className="c2-chip">
      <Coffee2AnnotatedText as="span" text={product.label} />
    </span>
  )
}

type HomeJarsyProductModuleProps = {
  product: FiftyYearProduct
  index: number
  stageId: string
}

export function HomeJarsyProductModule({
  product,
  index,
  stageId,
}: HomeJarsyProductModuleProps) {
  const variant = resolveVariant(product)
  const itemId = `${stageId}-product-${index}`

  if (variant === 'insurerGrid') {
    return <HomeJarsyInsurerGrid product={product} />
  }

  if (variant === 'linkCard') {
    return (
      <JarsyReveal delay={index * 60}>
        <LinkCardProduct product={product} />
      </JarsyReveal>
    )
  }

  if (variant === 'plain') {
    return <PlainProduct product={product} />
  }

  return (
    <JarsyReveal delay={index * 60}>
      <div className="rounded-2xl border border-zinc-200 bg-white px-4 md:px-6">
        <AccordionProduct product={product} id={itemId} />
      </div>
    </JarsyReveal>
  )
}

type HomeJarsyProductListProps = {
  products: FiftyYearProduct[]
  stageId: string
}

export function HomeJarsyProductList({
  products,
  stageId,
}: HomeJarsyProductListProps) {
  const plainProducts = products.filter(
    (product) => resolveVariant(product) === 'plain'
  )
  const blockProducts = products.filter(
    (product) => resolveVariant(product) !== 'plain'
  )

  return (
    <div className="mx-auto mt-10 max-w-4xl space-y-4 text-center">
      <div className="home-jarsy-product-grid">
        {blockProducts.map((product, index) => (
          <div
            key={`${stageId}-${product.label}-${index}`}
            className={cn(
              resolveVariant(product) === 'insurerGrid' &&
                'col-span-full sm:col-span-2 sm:justify-self-center sm:w-full'
            )}
          >
            <HomeJarsyProductModule
              product={product}
              index={index}
              stageId={stageId}
            />
          </div>
        ))}
      </div>

      {plainProducts.length > 0 ? (
        <JarsyReveal delay={120} className="flex flex-wrap justify-center gap-2 pt-2">
          {plainProducts.map((product, index) => (
            <HomeJarsyProductModule
              key={`${stageId}-plain-${product.label}-${index}`}
              product={product}
              index={index}
              stageId={stageId}
            />
          ))}
        </JarsyReveal>
      ) : null}
    </div>
  )
}
