'use client'

import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { ContactTrigger } from '@/components/contact-trigger'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  wealthCheckupAudience,
  wealthCheckupDetailCommitments,
  wealthCheckupDetailHero,
  wealthCheckupDetailItems,
  wealthCheckupDetailMeta,
  wealthCheckupDetailProcess,
  wealthCheckupWhyItems,
} from '@/lib/content/langtontao/wealth-checkup-detail-page'

export function WealthCheckupDetailView() {
  return (
    <div className="wh-checkup-page">
      <div className="wh-checkup-page__shell">
        <header className="wh-checkup-page__topbar">
          <Link href={wealthCheckupDetailMeta.backHref} className="wh-checkup-page__back">
            <ChevronLeft className="h-4 w-4" aria-hidden />
            {wealthCheckupDetailMeta.backLabel}
          </Link>
        </header>

        <section className="wh-checkup-page__hero" aria-labelledby="wh-checkup-hero-title">
          <p className="wh-checkup-page__eyebrow">{wealthCheckupDetailHero.eyebrow}</p>
          <h1 id="wh-checkup-hero-title" className="wh-checkup-page__title">
            {wealthCheckupDetailHero.title}
          </h1>
          <p className="wh-checkup-page__lead">{wealthCheckupDetailHero.lead}</p>
        </section>

        <section className="wh-checkup-page__section" aria-labelledby="wh-checkup-why-title">
          <h2 id="wh-checkup-why-title" className="wh-checkup-page__section-title">
            为何要做
          </h2>
          <ul className="wh-checkup-page__why-list">
            {wealthCheckupWhyItems.map((item) => (
              <li key={item.id} className="wh-checkup-page__why-card">
                <p className="wh-checkup-page__why-title">{item.title}</p>
                <p className="wh-checkup-page__why-desc">{item.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="wh-checkup-page__section" aria-labelledby="wh-checkup-items-title">
          <div className="wh-checkup-page__section-head">
            <h2 id="wh-checkup-items-title" className="wh-checkup-page__section-title">
              {wealthCheckupDetailItems.title}
            </h2>
            <p className="wh-checkup-page__section-subtitle">
              {wealthCheckupDetailItems.subtitle}
            </p>
          </div>
          <Accordion type="single" collapsible className="wh-checkup-page__accordion">
            {wealthCheckupDetailItems.items.map((item, index) => (
              <AccordionItem key={item.title} value={`item-${index}`}>
                <AccordionTrigger className="wh-checkup-page__accordion-trigger">
                  <span className="wh-checkup-page__accordion-index">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>{item.title}</span>
                </AccordionTrigger>
                <AccordionContent className="wh-checkup-page__accordion-content">
                  {item.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="wh-checkup-page__section" aria-labelledby="wh-checkup-process-title">
          <h2 id="wh-checkup-process-title" className="wh-checkup-page__section-title">
            {wealthCheckupDetailProcess.title}
          </h2>
          <ol className="wh-checkup-page__steps">
            {wealthCheckupDetailProcess.steps.map((step) => (
              <li key={step.step} className="wh-checkup-page__step">
                <div className="wh-checkup-page__step-marker" aria-hidden>
                  {step.step}
                </div>
                <div className="wh-checkup-page__step-body">
                  <p className="wh-checkup-page__step-label">{step.label}</p>
                  <p className="wh-checkup-page__step-desc">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="wh-checkup-page__section" aria-labelledby="wh-checkup-commitments-title">
          <h2 id="wh-checkup-commitments-title" className="wh-checkup-page__section-title">
            {wealthCheckupDetailCommitments.title}
          </h2>
          <ul className="wh-checkup-page__commitments">
            {wealthCheckupDetailCommitments.items.map((item) => (
              <li key={item.id} className="wh-checkup-page__commitment-card">
                <p className="wh-checkup-page__commitment-title">{item.title}</p>
                <p className="wh-checkup-page__commitment-desc">{item.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="wh-checkup-page__section" aria-labelledby="wh-checkup-audience-title">
          <h2 id="wh-checkup-audience-title" className="wh-checkup-page__section-title">
            {wealthCheckupAudience.title}
          </h2>
          <ul className="wh-checkup-page__audience">
            {wealthCheckupAudience.items.map((item) => (
              <li key={item.id} className="wh-checkup-page__audience-card">
                <p className="wh-checkup-page__audience-title">{item.title}</p>
                <p className="wh-checkup-page__audience-desc">{item.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className="wh-checkup-page__cta-spacer" aria-hidden />
      </div>

      <div className="wh-checkup-page__sticky-cta">
        <ContactTrigger
          intent={wealthCheckupDetailMeta.contactIntent}
          className="wh-checkup-page__cta-btn"
        >
          {wealthCheckupDetailMeta.ctaLabel}
        </ContactTrigger>
      </div>
    </div>
  )
}
