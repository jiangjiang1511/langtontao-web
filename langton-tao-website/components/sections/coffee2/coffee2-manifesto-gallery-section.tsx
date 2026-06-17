'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Coffee2ManifestoLightboxDialog } from '@/components/sections/coffee2/coffee2-manifesto-lightbox-dialog'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import {
  coffee2ManifestoGalleryMeta,
  coffee2ManifestoImages,
  type Coffee2ManifestoImage,
  type Coffee2ManifestoScatterLayout,
  type Coffee2ManifestoStackLayout,
} from '@/lib/content/coffee2-manifesto-gallery'

function stackVars(layout: Coffee2ManifestoStackLayout): CSSProperties {
  return {
    '--manifesto-stack-x': layout.x,
    '--manifesto-stack-y': layout.y,
    '--manifesto-stack-rotate': `${layout.rotate}deg`,
    '--manifesto-stack-scale': String(layout.scale),
    '--manifesto-stack-z': String(layout.zIndex),
    '--manifesto-stack-width': layout.width,
  } as CSSProperties
}

function scatterVars(layout: Coffee2ManifestoScatterLayout): CSSProperties {
  return {
    '--manifesto-scatter-left': layout.left,
    '--manifesto-scatter-top': layout.top,
    '--manifesto-scatter-rotate': `${layout.rotate}deg`,
    '--manifesto-scatter-scale': String(layout.scale),
    '--manifesto-scatter-z': String(layout.zIndex),
    '--manifesto-scatter-width': layout.width,
  } as CSSProperties
}

export function Coffee2ManifestoGallerySection() {
  const stageRef = useRef<HTMLDivElement | null>(null)
  const [isExploded, setIsExploded] = useState(false)
  const [selectedImage, setSelectedImage] = useState<Coffee2ManifestoImage | null>(
    null
  )

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

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
    <section
      id="coffee2-manifesto-gallery"
      className="coffee2-manifesto-gallery scroll-mt-28 py-12 md:py-16"
      aria-labelledby="coffee2-manifesto-gallery-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Coffee2Reveal className="coffee2-manifesto-gallery__header max-w-2xl">
          <p className="c2-eyebrow">{coffee2ManifestoGalleryMeta.eyebrow}</p>
          <h2
            id="coffee2-manifesto-gallery-title"
            className="c2-display mt-4 text-4xl text-zinc-950 md:text-5xl"
          >
            {coffee2ManifestoGalleryMeta.title}
          </h2>
          <p className="mt-4 text-xl font-semibold tracking-tight text-zinc-500 md:text-2xl">
            {coffee2ManifestoGalleryMeta.tagline}
          </p>
          <p className="mt-4 text-sm text-zinc-500">
            {coffee2ManifestoGalleryMeta.helper}
          </p>
        </Coffee2Reveal>

        <div
          ref={stageRef}
          className="coffee2-manifesto-gallery__stage mt-10 md:mt-12"
          data-exploded={isExploded ? 'true' : 'false'}
          role="group"
          aria-label="熊比特 manifesto 图片集"
        >
          {coffee2ManifestoImages.map((image, index) => (
            <figure
              key={image.id}
              className="coffee2-manifesto-gallery__card"
              style={{
                ...stackVars(image.stack),
                ...scatterVars(image.scatter),
                '--manifesto-stagger': `${index * 65}ms`,
              } as CSSProperties}
            >
              <button
                type="button"
                className="coffee2-manifesto-gallery__trigger"
                aria-label={`查看大图：${image.alt}`}
                onClick={() => setSelectedImage(image)}
              >
                <div className="coffee2-manifesto-gallery__frame">
                  <Image
                    src={image.src}
                    alt=""
                    width={image.width}
                    height={image.height}
                    sizes="(max-width: 768px) 42vw, 340px"
                    className="coffee2-manifesto-gallery__image"
                  />
                </div>
              </button>
            </figure>
          ))}
        </div>
      </div>

      <Coffee2ManifestoLightboxDialog
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </section>
  )
}
