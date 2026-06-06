'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { ContactDialogForm } from '@/components/contact-dialog-form'

type ContactContextValue = {
  openContact: (intent?: string) => void
}

const ContactContext = createContext<ContactContextValue | null>(null)

export function ContactProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [defaultIntent, setDefaultIntent] = useState('')

  const openContact = useCallback((intent?: string) => {
    setDefaultIntent(intent ?? '')
    setOpen(true)
  }, [])

  const value = useMemo(() => ({ openContact }), [openContact])

  return (
    <ContactContext.Provider value={value}>
      {children}
      <ContactDialogForm
        open={open}
        onOpenChange={setOpen}
        defaultIntent={defaultIntent}
      />
    </ContactContext.Provider>
  )
}

export function useContact() {
  const ctx = useContext(ContactContext)
  if (!ctx) {
    throw new Error('useContact must be used within ContactProvider')
  }
  return ctx
}
