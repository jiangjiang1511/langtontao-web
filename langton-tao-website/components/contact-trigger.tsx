'use client'

import { Button, type ButtonProps } from '@/components/ui/button'
import { useContact } from '@/components/providers/contact-provider'

type ContactTriggerProps = ButtonProps & {
  intent?: string
}

export function ContactTrigger({
  intent,
  children,
  onClick,
  ...props
}: ContactTriggerProps) {
  const { openContact } = useContact()

  return (
    <Button
      {...props}
      onClick={(e) => {
        openContact(intent)
        onClick?.(e)
      }}
    >
      {children}
    </Button>
  )
}
