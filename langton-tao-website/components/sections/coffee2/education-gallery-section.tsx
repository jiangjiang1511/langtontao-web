'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Coffee2ManifestoLightboxDialog, getGalleryLightboxOrigin, type GalleryLightboxState } from '@/components/sections/coffee2/coffee2-manifesto-lightbox-dialog'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import {
  educationGalleryImages,
  type EducationGalleryImage,
} from '@/lib/content/coffee-education-gallery'
import type {
  Coffee2ManifestoScatterLayout,
  Coffee2ManifestoStackLayout,
} from '@/lib/content/coffee2-manifesto-gallery'

function stackVars(layout: Coffee2ManifestoStackLayout): CSSProperties {
  return {
    '--edu-gallery-stack-x': layout.x,
    '--edu-gallery-stack-y': layout.y,
    '--edu-gallery-stack-rotate': `${layout.rotate}deg`,
    '--edu-gallery-stack-scale': String(layout.scale),
    '--edu-gallery-stack-z': String(layout.zIndex),
    '--edu-gallery-stack-width': layout.width,
  } as CSSProperties
}

function scatterVars(layout: Coffee2ManifestoScatterLayout): CSSProperties {
  return {
    '--edu-gallery-scatter-left': layout.left,
    '--edu-gallery-scatter-top': layout.top,
    '--edu-gallery-scatter-rotate': `${layout.rotate}deg`,
    '--edu-gallery-scatter-scale': String(layout.scale),
    '--edu-gallery-scatter-z': String(layout.zIndex),
    '--edu-gallery-scatter-width': layout.width,
  } as CSSProperties
}

export function EducationGallerySection() {
  const stageRef = useRef<HTMLDivElement | null>(null)
  const [isExploded, setIsExploded] = useState(false)
  const [lightbox, setLightbox] = useState<GalleryLightboxState>(null)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsExploded(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
          setIsExploded(true)
          observer.disconnect()
        }
      },
      {
        threshold: [0, 0.25, 0.45, 0.6, 0.75, 1],
        rootMargin: '-20% 0px -20% 0px',
      }
    )

    observer.observe(stage)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="education-gallery">
      <Coffee2Reveal>
        <div
          ref={stageRef}
          className="education-gallery__stage mt-10 md:mt-12"
          data-exploded={isExploded ? 'true' : 'false'}
          role="group"
          aria-label="教育活动图片集"
        >
          {educationGalleryImages.map((image, index) => (
            <figure
              key={image.id}
              className="education-gallery__card"
              style={
                {
                  ...stackVars(image.stack),
                  ...scatterVars(image.scatter),
                  '--edu-gallery-stagger': `${index * 65}ms`,
                } as CSSProperties
              }
            >
              <button
                type="button"
                className="education-gallery__trigger"
                aria-label={`查看大图：${image.alt}`}
                onClick={(event) => {
                  setLightbox({
                    image,
                    origin: getGalleryLightboxOrigin(event.currentTarget),
                  })
                }}
              >
                <div className="education-gallery__frame">
                  <Image
                    src={image.src}
                    alt=""
                    width={image.width}
                    height={image.height}
                    sizes="(max-width: 768px) 42vw, 340px"
                    className="education-gallery__image"
                  />
                </div>
              </button>
            </figure>
          ))}
        </div>
      </Coffee2Reveal>

      <Coffee2ManifestoLightboxDialog
        lightbox={lightbox}
        onClose={() => setLightbox(null)}
      />
    </div>
  )
}
