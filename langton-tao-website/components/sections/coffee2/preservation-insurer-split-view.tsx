'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { PreservationInsurerList } from '@/components/sections/coffee2/preservation-insurer-list'
import { PreservationInsurerStagePanel } from '@/components/sections/coffee2/preservation-insurer-stage-panel'
import { useInViewTrigger } from '@/hooks/use-in-view-trigger'
import { coffeePreservationInsurers } from '@/lib/content/coffee-preservation-insurers'

export function PreservationInsurerSplitView() {
  const insurers = coffeePreservationInsurers
  const { ref, enterCount } = useInViewTrigger()
  const [activeId, setActiveId] = useState<string | null>(
    () => insurers[0]?.id ?? null
  )
  const [enterToken, setEnterToken] = useState(0)

  const activeInsurer = useMemo(
    () => insurers.find((insurer) => insurer.id === activeId) ?? insurers[0] ?? null,
    [insurers, activeId]
  )

  useEffect(() => {
    if (enterCount > 0) {
      setEnterToken((token) => token + 1)
    }
  }, [enterCount])

  const handleSelect = useCallback(
    (id: string) => {
      if (id === activeId) return
      setActiveId(id)
      setEnterToken((token) => token + 1)
    },
    [activeId]
  )

  if (!activeInsurer) return null

  return (
    <div ref={ref} className="cg-split mt-8">
      <PreservationInsurerList
        insurers={insurers}
        activeId={activeInsurer.id}
        onSelect={handleSelect}
      />
      <PreservationInsurerStagePanel
        insurer={activeInsurer}
        enterToken={enterToken}
      />
    </div>
  )
}
