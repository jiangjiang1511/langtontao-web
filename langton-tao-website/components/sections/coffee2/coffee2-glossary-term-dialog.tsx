'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { Coffee2GlossaryTerm } from '@/lib/content/coffee-glossary'

type Coffee2GlossaryTermDialogProps = {
  term: Coffee2GlossaryTerm | null
  onClose: () => void
}

export function Coffee2GlossaryTermDialog({
  term,
  onClose,
}: Coffee2GlossaryTermDialogProps) {
  return (
    <Dialog
      open={term !== null}
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      {term ? (
        <DialogContent className="coffee2-glossary-dialog coffee2-tenet-dialog inset-0 m-auto h-fit w-[calc(100%-2rem)] max-h-[85vh] max-w-lg translate-x-0 translate-y-0 overflow-y-auto">
          <DialogHeader>
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-zinc-400">
              {term.shortLabel}
            </p>
            <DialogTitle className="text-2xl text-zinc-950">{term.label}</DialogTitle>
          </DialogHeader>

          <div className="coffee2-glossary-dialog__article">
            <p className="coffee2-glossary-dialog__definition">{term.definition}</p>

            {term.sections.map((section, sectionIndex) => {
              const sectionTitle =
                'title' in section ? section.title : undefined

              return (
              <section
                key={sectionTitle ?? `section-${sectionIndex}`}
                className="coffee2-glossary-dialog__section"
              >
                {sectionTitle ? (
                  <h3 className="coffee2-glossary-dialog__section-title">
                    {sectionTitle}
                  </h3>
                ) : null}

                {'paragraphs' in section && section.paragraphs
                  ? section.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 24)} className="coffee2-glossary-dialog__text">
                        {paragraph}
                      </p>
                    ))
                  : null}

                {'bullets' in section && section.bullets ? (
                  <ul className="coffee2-glossary-dialog__list">
                    {section.bullets.map((bullet) => (
                      <li key={bullet.slice(0, 24)}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
              )
            })}
          </div>
        </DialogContent>
      ) : null}
    </Dialog>
  )
}
