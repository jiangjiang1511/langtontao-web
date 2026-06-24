'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Coffee2ManifestoLightboxDialog, getGalleryLightboxOrigin, type GalleryLightboxState } from '@/components/sections/coffee2/coffee2-manifesto-lightbox-dialog'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import {
  computeReadingGalleryFrameSizes,
  readingGalleryImages,
  type ReadingGalleryFrameSize,
  type ReadingGalleryImage,
} from '@/lib/content/coffee-reading-gallery'

export function ReadingGallerySection() {
  const rowRef = useRef<HTMLDivElement | null>(null)
  const [frameSizes, setFrameSizes] = useState<
    Record<string, ReadingGalleryFrameSize>
  >({})
  const [lightbox, setLightbox] = useState<GalleryLightboxState>(null)

  useEffect(() => {
    const row = rowRef.current
    if (!row) return

    const updateSizes = () => {
      const styles = window.getComputedStyle(row)
      const gap = Number.parseFloat(styles.columnGap || styles.gap || '0')
      const isMobile = row.clientWidth < 768
      setFrameSizes(
        computeReadingGalleryFrameSizes(
          readingGalleryImages,
          row.clientWidth,
          Number.isFinite(gap) ? gap : 0,
          isMobile ? 'mobile' : 'desktop'
        )
      )
    }

    updateSizes()

    const observer = new ResizeObserver(updateSizes)
    observer.observe(row)
    window.addEventListener('resize', updateSizes)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateSizes)
    }
  }, [])

  return (
    <div className="reading-gallery">
      <div
        ref={rowRef}
        className="reading-gallery__row mt-10 md:mt-12"
        role="group"
        aria-label="读书会图片集"
      >
        {readingGalleryImages.map((image, index) => {
          const size = frameSizes[image.id]

          return (
            <Coffee2Reveal
              key={image.id}
              delay={index * 110}
              className="reading-gallery__card-shell"
            >
              <figure
                className="reading-gallery__card"
                style={
                  image.rotate
                    ? { transform: `rotate(${image.rotate}deg)` }
                    : undefined
                }
              >
                <button
                  type="button"
                  className="reading-gallery__trigger"
                  aria-label={`查看大图：${image.alt}`}
                  onClick={(event) => {
                    setLightbox({
                      image,
                      origin: getGalleryLightboxOrigin(event.currentTarget),
                    })
                  }}
                >
                  <div
                    className="reading-gallery__frame"
                    style={
                      size
                        ? { width: size.width, height: size.height }
                        : {
                            width: '100%',
                            aspectRatio: `${image.width} / ${image.height}`,
                          }
                    }
                  >
                    <Image
                      src={image.src}
                      alt=""
                      width={image.width}
                      height={image.height}
                      sizes="(max-width: 768px) 24vw, 240px"
                      className="reading-gallery__image"
                    />
                  </div>
                </button>
              </figure>
            </Coffee2Reveal>
          )
        })}
      </div>

      <Coffee2ManifestoLightboxDialog
        lightbox={lightbox}
        onClose={() => setLightbox(null)}
      />
    </div>
  )
}
