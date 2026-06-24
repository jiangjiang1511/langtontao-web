'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { Coffee2GlossaryTermDialog } from '@/components/sections/coffee2/coffee2-glossary-term-dialog'
import type { Coffee2GlossaryTermId } from '@/lib/content/coffee-glossary'
import { getCoffee2GlossaryTerm } from '@/lib/content/coffee-glossary'

type GlossaryContextValue = {
  openGlossaryTerm: (termId: Coffee2GlossaryTermId) => void
  closeGlossaryTerm: () => void
}

const GlossaryContext = createContext<GlossaryContextValue | null>(null)

export function GlossaryProvider({ children }: { children: React.ReactNode }) {
  const [activeTermId, setActiveTermId] = useState<Coffee2GlossaryTermId | null>(
    null
  )

  const openGlossaryTerm = useCallback((termId: Coffee2GlossaryTermId) => {
    setActiveTermId(termId)
  }, [])

  const closeGlossaryTerm = useCallback(() => {
    setActiveTermId(null)
  }, [])

  const value = useMemo(
    () => ({ openGlossaryTerm, closeGlossaryTerm }),
    [openGlossaryTerm, closeGlossaryTerm]
  )

  const activeTerm = activeTermId ? getCoffee2GlossaryTerm(activeTermId) : null

  return (
    <GlossaryContext.Provider value={value}>
      {children}
      <Coffee2GlossaryTermDialog
        term={activeTerm}
        onClose={closeGlossaryTerm}
      />
    </GlossaryContext.Provider>
  )
}

export function useGlossary() {
  const ctx = useContext(GlossaryContext)
  if (!ctx) {
    throw new Error('useGlossary must be used within GlossaryProvider')
  }
  return ctx
}
