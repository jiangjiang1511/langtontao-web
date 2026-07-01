'use client'

import Link from 'next/link'
import { ContactTrigger } from '@/components/contact-trigger'
import { cn } from '@/lib/utils'

type HomeJarsyStageFooterCtaProps = {
  line?: string
  ctaLabel: string
  href?: string
  contactIntent?: string
  className?: string
}

export function HomeJarsyStageFooterCta({
  line,
  ctaLabel,
  href,
  contactIntent,
  className,
}: HomeJarsyStageFooterCtaProps) {
  const buttonClass = 'coffee2-cta-button inline-flex'

  return (
    <div className={cn('home-jarsy-stage-footer-cta', className)}>
      {line ? <p className="home-jarsy-stage-footer-cta__line">{line}</p> : null}
      {contactIntent ? (
        <ContactTrigger intent={contactIntent} className={buttonClass}>
          {ctaLabel}
        </ContactTrigger>
      ) : href ? (
        <Link href={href} className={buttonClass}>
          {ctaLabel}
        </Link>
      ) : null}
    </div>
  )
}
