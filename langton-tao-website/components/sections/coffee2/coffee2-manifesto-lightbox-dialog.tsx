'use client'

import Image from 'next/image'
import { X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export type GalleryLightboxImage = {
  src: string
  alt: string
  width: number
  height: number
}

export type GalleryLightboxOrigin = {
  top: number
  left: number
  width: number
  height: number
}

export type GalleryLightboxState = {
  image: GalleryLightboxImage
  origin: GalleryLightboxOrigin
} | null

type Coffee2ManifestoLightboxDialogProps = {
  lightbox: GalleryLightboxState
  onClose: () => void
}

const LIGHTBOX_MS = 420

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function computeTargetRect(image: GalleryLightboxImage): GalleryLightboxOrigin {
  const viewportW = window.innerWidth
  const viewportH = window.innerHeight
  const maxW = Math.min(896, viewportW * 0.92)
  const maxH = viewportH * 0.82
  const aspect = image.width / image.height

  let width = maxW
  let height = width / aspect

  if (height > maxH) {
    height = maxH
    width = height * aspect
  }

  return {
    top: (viewportH - height) / 2,
    left: (viewportW - width) / 2,
    width,
    height,
  }
}

export function getGalleryLightboxOrigin(
  trigger: HTMLElement
): GalleryLightboxOrigin {
  const frame =
    trigger.querySelector<HTMLElement>(
      '.coffee2-manifesto-gallery__frame, .education-gallery__frame, .reading-gallery__frame'
    ) ?? trigger

  const rect = frame.getBoundingClientRect()

  return {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
  }
}

export function Coffee2ManifestoLightboxDialog({
  lightbox,
  onClose,
}: Coffee2ManifestoLightboxDialogProps) {
  const [mounted, setMounted] = useState(false)
  const [panelRect, setPanelRect] = useState<GalleryLightboxOrigin | null>(null)
  const [overlayVisible, setOverlayVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const closeTimer = useRef<number | null>(null)

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }, [])

  useEffect(() => {
    setMounted(true)
    return () => clearCloseTimer()
  }, [clearCloseTimer])

  useEffect(() => {
    if (!lightbox) {
      setPanelRect(null)
      setOverlayVisible(false)
      setIsClosing(false)
      return
    }

    clearCloseTimer()
    setIsClosing(false)
    document.body.style.overflow = 'hidden'

    const reduced = prefersReducedMotion()
    const target = computeTargetRect(lightbox.image)

    if (reduced) {
      setPanelRect(target)
      setOverlayVisible(true)
      return
    }

    setPanelRect(lightbox.origin)
    setOverlayVisible(false)

    const raf = window.requestAnimationFrame(() => {
      setOverlayVisible(true)
      window.requestAnimationFrame(() => {
        setPanelRect(target)
      })
    })

    return () => {
      window.cancelAnimationFrame(raf)
      document.body.style.overflow = ''
    }
  }, [lightbox, clearCloseTimer])

  const handleClose = useCallback(() => {
    if (!lightbox || isClosing) return

    if (prefersReducedMotion()) {
      document.body.style.overflow = ''
      onClose()
      return
    }

    setIsClosing(true)
    setOverlayVisible(false)
    setPanelRect(lightbox.origin)

    clearCloseTimer()
    closeTimer.current = window.setTimeout(() => {
      document.body.style.overflow = ''
      onClose()
      setIsClosing(false)
    }, LIGHTBOX_MS)
  }, [lightbox, isClosing, onClose, clearCloseTimer])

  useEffect(() => {
    if (!lightbox) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleClose()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [lightbox, handleClose])

  if (!mounted || !lightbox || !panelRect) return null

  const { image } = lightbox

  return createPortal(
    <>
      <button
        type="button"
        className="gallery-lightbox-overlay"
        aria-label="关闭大图"
        data-visible={overlayVisible ? 'true' : 'false'}
        onClick={handleClose}
      />
      <div
        className="gallery-lightbox-panel"
        role="dialog"
        aria-modal="true"
        aria-label={image.alt}
        style={{
          top: panelRect.top,
          left: panelRect.left,
          width: panelRect.width,
          height: panelRect.height,
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="gallery-lightbox-panel__close"
          aria-label="关闭"
          onClick={handleClose}
        >
          <X className="h-4 w-4" />
        </button>
        <div className="gallery-lightbox-panel__frame">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(max-width: 768px) 92vw, 896px"
            className="gallery-lightbox-panel__image"
            priority
          />
        </div>
      </div>
    </>,
    document.body
  )
}
