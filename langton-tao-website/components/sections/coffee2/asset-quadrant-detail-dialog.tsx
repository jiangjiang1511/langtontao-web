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
      open={quadrantId !== null}
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      <DialogContent
        overlayClassName="invest-phone-dialog-overlay"
        className="invest-quadrant-dialog invest-phone-dialog inset-0 m-auto translate-x-0 translate-y-0"
        aria-describedby={
          quadrant ? `invest-quadrant-dialog-${quadrant.id}` : undefined
        }
        style={
          quadrant
            ? ({ '--quadrant-accent': quadrant.accent } as React.CSSProperties)
            : undefined
        }
      >
        {quadrant ? (
          <>
            <div className="invest-phone-dialog__header">
              <DialogHeader className="space-y-0 text-left">
                <p className="c2-pop-stamp invest-phone-dialog__eyebrow">资产类别</p>
                <DialogTitle className="invest-phone-dialog__title">
                  {quadrant.label}
                </DialogTitle>
                <p className="invest-phone-dialog__desc">{quadrant.description}</p>
              </DialogHeader>
            </div>

            <div
              className="invest-phone-dialog__body"
              id={`invest-quadrant-dialog-${quadrant.id}`}
            >
              <ul className="invest-quadrant-dialog__list">
                {assets.map((asset, index) => (
                  <li
                    key={asset.id}
                    className="invest-quadrant-dialog__item"
                    style={{ '--item-index': index } as React.CSSProperties}
                  >
                    <span
                      className="invest-quadrant-dialog__swatch"
                      style={{ backgroundColor: asset.color }}
                      aria-hidden
                    />
                    <span className="invest-quadrant-dialog__label">{asset.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
