'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  hasCoffee2TenetDetail,
  type Coffee2Tenet,
} from '@/lib/content/coffee-manifesto'

type Coffee2TenetDetailDialogProps = {
  tenet: Coffee2Tenet | null
  onClose: () => void
}

export function Coffee2TenetDetailDialog({
  tenet,
  onClose,
}: Coffee2TenetDetailDialogProps) {
  return (
    <Dialog
      open={tenet !== null}
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      {tenet ? (
        <DialogContent className="coffee2-tenet-dialog inset-0 m-auto h-fit w-[calc(100%-2rem)] max-h-[85vh] max-w-lg translate-x-0 translate-y-0 overflow-y-auto">
          <DialogHeader>
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-zinc-400">
              {tenet.verseLine}
            </p>
            <DialogTitle className="text-2xl text-zinc-950">
              {tenet.number} · {tenet.title}
            </DialogTitle>
          </DialogHeader>

          {hasCoffee2TenetDetail(tenet) ? (
            <div className="space-y-5 text-sm leading-relaxed text-zinc-600">
              {tenet.detail?.intro ? (
                <p className="text-base text-zinc-700">{tenet.detail.intro}</p>
              ) : null}

              {tenet.detail?.sections?.map((section) => (
                <div key={section.label}>
                  <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-zinc-400">
                    {section.label}
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {section.points.map((point) => (
                      <li key={point} className="flex gap-2">
                        <span className="text-zinc-300" aria-hidden>
                          ·
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {tenet.detail?.items?.map((item) => (
                <div key={item.title}>
                  <p className="font-semibold text-zinc-950">{item.title}</p>
                  {item.description ? (
                    <p className="mt-1">{item.description}</p>
                  ) : null}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm leading-relaxed text-zinc-500">
              详细说明待补充。
            </p>
          )}
        </DialogContent>
      ) : null}
    </Dialog>
  )
}
