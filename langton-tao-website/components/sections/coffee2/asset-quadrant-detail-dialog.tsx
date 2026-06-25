'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  assetQuadrants,
  getBubblesForQuadrant,
  type AssetQuadrantId,
} from '@/lib/content/coffee-asset-classes'

type AssetQuadrantDetailDialogProps = {
  quadrantId: AssetQuadrantId | null
  onClose: () => void
}

export function AssetQuadrantDetailDialog({
  quadrantId,
  onClose,
}: AssetQuadrantDetailDialogProps) {
  const quadrant = quadrantId
    ? assetQuadrants.find((item) => item.id === quadrantId)
    : null
  const assets = quadrantId
    ? getBubblesForQuadrant(quadrantId).sort((a, b) => b.weight - a.weight)
    : []

  return (
    <Dialog
      open={quadrant !== null}
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      {quadrant ? (
        <DialogContent className="invest-quadrant-dialog inset-0 m-auto h-fit w-[calc(100%-2rem)] max-h-[85vh] max-w-md translate-x-0 translate-y-0 overflow-y-auto border border-zinc-200 bg-white p-6 shadow-xl">
          <DialogHeader>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-zinc-400">
              资产类别
            </p>
            <DialogTitle className="text-2xl text-zinc-950">
              {quadrant.label}
            </DialogTitle>
          </DialogHeader>

          <p className="mt-2 text-sm leading-relaxed text-zinc-600">
            {quadrant.description}
          </p>

          <ul className="invest-quadrant-dialog__list mt-6 space-y-2">
            {assets.map((asset) => (
              <li
                key={asset.id}
                className="invest-quadrant-dialog__item flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3"
              >
                <span
                  className="invest-quadrant-dialog__swatch h-3 w-3 shrink-0 rounded-full"
                  style={{ backgroundColor: asset.color }}
                  aria-hidden
                />
                <span className="text-sm font-semibold text-zinc-950">
                  {asset.label}
                </span>
              </li>
            ))}
          </ul>
        </DialogContent>
      ) : null}
    </Dialog>
  )
}
