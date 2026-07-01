'use client'

import { useCallback, useMemo, useState } from 'react'
import {
  LangtontaoBeautifulFamilyosRail,
  langtontaoFamilyOsListItems,
} from '@/components/sections/langtontao/langtontao-beautiful-familyos-rail'
import { LangtontaoBeautifulFamilyosStage } from '@/components/sections/langtontao/langtontao-beautiful-familyos-stage'
import { LangtontaoSubsectionHeader } from '@/components/sections/langtontao/langtontao-subsection-header'
import { langtontaoBeautifulFamilyOsMeta } from '@/lib/content/langtontao/langtontao-beautiful-business'

export function LangtontaoBeautifulFamilyosHub() {
  const items = langtontaoFamilyOsListItems
  const [activeId, setActiveId] = useState(items[0]?.id ?? '')

  const activeItem = useMemo(
    () => items.find((item) => item.id === activeId) ?? items[0] ?? null,
    [activeId, items]
  )

  const handleSelect = useCallback((id: string) => {
    setActiveId(id)
  }, [])

  if (!activeItem || items.length === 0) return null

  return (
    <div className="lt-beautiful-familyos-hub">
      <LangtontaoSubsectionHeader
        eyebrow={langtontaoBeautifulFamilyOsMeta.eyebrow}
        title={langtontaoBeautifulFamilyOsMeta.title}
        lead={langtontaoBeautifulFamilyOsMeta.lead}
        theme="home"
      />

      <div className="lt-beautiful-familyos-hub__shell mt-10">
        <div className="lt-beautiful-familyos-hub__layout">
          <LangtontaoBeautifulFamilyosRail
            items={items}
            activeId={activeItem.id}
            onSelect={handleSelect}
          />
          <LangtontaoBeautifulFamilyosStage item={activeItem} />
        </div>
      </div>
    </div>
  )
}
