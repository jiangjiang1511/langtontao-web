'use client'

import { useEffect, useRef } from 'react'
import { LangtontaoBeautifulFamilyosCard } from '@/components/sections/langtontao/langtontao-beautiful-familyos-card'
import { langtontaoFamilyOsTree } from '@/lib/content/langtontao/langtontao-beautiful-business'
import { scrollChildWithinContainer } from '@/lib/utils/scroll-child-within-container'

const LINK_COMPONENT_ASSET_DIR = '/assets/langtontao/linkcomponent'

export type FamilyOsListItem = {
  id: string
  branchTitle: string
  title: string
  philosophy: string
  backgroundImage: string
  detailItems?: { title: string; body: string }[]
}

function linkComponentBackground(index: number): string {
  const num = String((index % 4) + 1).padStart(2, '0')
  return `url(${LINK_COMPONENT_ASSET_DIR}/linkcomponent-${num}.jpg)`
}

export const langtontaoFamilyOsListItems: FamilyOsListItem[] =
  langtontaoFamilyOsTree.flatMap((branch) =>
    branch.children.map((leaf) => ({
      id: leaf.id,
      branchTitle: branch.title,
      title: leaf.title,
      philosophy: leaf.philosophy,
      detailItems: leaf.detailItems,
      backgroundImage: '',
    }))
  ).map((item, index) => ({
    ...item,
    backgroundImage: linkComponentBackground(index),
  }))

type LangtontaoBeautifulFamilyosRailProps = {
  items: FamilyOsListItem[]
  activeId: string
  onSelect: (id: string) => void
}

export function LangtontaoBeautifulFamilyosRail({
  items,
  activeId,
  onSelect,
}: LangtontaoBeautifulFamilyosRailProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const activeCardRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const track = trackRef.current
    const card = activeCardRef.current
    if (!track || !card) return
    scrollChildWithinContainer(track, card)
  }, [activeId])

  return (
    <aside className="lt-beautiful-familyos-hub__rail" aria-label="FamilyOS 业务模块">
      <div ref={trackRef} className="lt-beautiful-familyos-hub__rail-track">
        {items.map((item, index) => {
          const selected = item.id === activeId
          return (
            <LangtontaoBeautifulFamilyosCard
              key={item.id}
              ref={selected ? activeCardRef : null}
              item={item}
              index={index}
              selected={selected}
              onSelect={() => onSelect(item.id)}
            />
          )
        })}
      </div>
    </aside>
  )
}
