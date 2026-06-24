'use client'

import { useRef, type CSSProperties } from 'react'
import type { CompoundGrowthIndexEntry } from '@/lib/compound-growth/types'
import { formatCagr } from '@/lib/compound-growth/format-market-cap'
import { useAutoScrollLoop } from '@/hooks/use-auto-scroll-loop'
import { useMediaQuery } from '@/hooks/use-media-query'

type CompoundGrowthStockListProps = {
  stocks: CompoundGrowthIndexEntry[]
  activeSlug: string | null
  onSelect: (slug: string) => void
}

type StockListItemProps = {
  stock: CompoundGrowthIndexEntry
  index: number
  isActive: boolean
  isClone?: boolean
  onSelect: (slug: string) => void
}

function StockListItem({
  stock,
  index,
  isActive,
  isClone = false,
  onSelect,
}: StockListItemProps) {
  return (
    <button
      key={isClone ? `clone-${stock.slug}` : stock.slug}
      type="button"
      role="option"
      aria-selected={isClone ? undefined : isActive}
      aria-hidden={isClone || undefined}
      tabIndex={isClone ? -1 : undefined}
      className="cg-list-item"
      data-active={isActive}
      style={{ '--cg-accent': stock.accent } as CSSProperties}
      onClick={() => onSelect(stock.slug)}
    >
      <span className="cg-list-item-accent" aria-hidden />
      <span className="cg-list-item-index">{String(index + 1).padStart(2, '0')}</span>
      <span className="cg-list-item-ticker">{stock.ticker}</span>
      <span className="cg-list-item-name">{stock.name}</span>
      <span
        className="cg-list-item-cagr"
        aria-label={`年化收益率 ${formatCagr(stock.stats.cagr)}`}
      >
        <span className="cg-list-item-cagr-label">年化收益</span>
        <span className="cg-list-item-cagr-value">{formatCagr(stock.stats.cagr)}</span>
      </span>
    </button>
  )
}

export function CompoundGrowthStockList({
  stocks,
  activeSlug,
  onSelect,
}: CompoundGrowthStockListProps) {
  const listRef = useRef<HTMLDivElement>(null)
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const axis = isDesktop ? 'y' : 'x'

  useAutoScrollLoop(listRef, {
    axis,
    speed: axis === 'x' ? 0.35 : 0.28,
    loop: true,
  })

  return (
    <div className="cg-list-shell">
      <div className="cg-list-header">
        <p className="cg-list-heading">复利标的 · 2016–2026</p>
        <p className="cg-list-lead">若十年前买入并持有</p>
      </div>
      <div
        ref={listRef}
        className="cg-list cg-list--auto-scroll"
        role="listbox"
        aria-label="复利标的列表"
      >
        {stocks.map((stock, index) => (
          <StockListItem
            key={stock.slug}
            stock={stock}
            index={index}
            isActive={stock.slug === activeSlug}
            onSelect={onSelect}
          />
        ))}
        {stocks.map((stock, index) => (
          <StockListItem
            key={`clone-${stock.slug}`}
            stock={stock}
            index={index}
            isActive={stock.slug === activeSlug}
            isClone
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  )
}
