'use client'

import { createContext, useContext } from 'react'

export const DeferredMountAnchorContext = createContext<string | null>(null)

/** Returns undefined when a parent DeferredMount already owns this section id. */
export function useSectionDomId(sectionId: string): string | undefined {
  const ownedAnchor = useContext(DeferredMountAnchorContext)
  return ownedAnchor === sectionId ? undefined : sectionId
}

export const DEFERRED_MOUNT_READY_EVENT = 'deferred-mount:ready'

export type DeferredMountReadyDetail = {
  anchorId: string
}
