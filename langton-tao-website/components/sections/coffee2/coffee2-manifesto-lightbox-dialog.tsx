'use client'

import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import type { Coffee2ManifestoImage } from '@/lib/content/coffee2-manifesto-gallery'

type Coffee2ManifestoLightboxDialogProps = {
  image: Coffee2ManifestoImage | null
  onClose: () => void
}

export function Coffee2ManifestoLightboxDialog({
  image,
  onClose,
}: Coffee2ManifestoLightboxDialogProps) {
  return (
    <Dialog
      open={image !== null}
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      {image ? (
        <DialogContent className="coffee2-manifesto-lightbox inset-0 m-auto h-fit w-[calc(100%-2rem)] max-h-[90vh] max-w-4xl translate-x-0 translate-y-0 overflow-hidden p-0">
          <DialogTitle className="sr-only">{image.alt}</DialogTitle>
          <div className="coffee2-manifesto-lightbox__frame">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(max-width: 768px) 92vw, 896px"
              className="coffee2-manifesto-lightbox__image"
              priority
            />
          </div>
        </DialogContent>
      ) : null}
    </Dialog>
  )
}
