'use client'

import { useCallback, useEffect, useRef } from 'react'

/** Bump when replacing hero-anime.mp4 to bust browser cache. */
const HERO_VIDEO_CACHE_VERSION = '20260705-2'

export const LANGTONTAO_HERO_VIDEO_SRC = `/assets/langtontao/hero-anime.mp4?v=${HERO_VIDEO_CACHE_VERSION}`

const DESKTOP_MEDIA = '(min-width: 768px)'
const HEADER_CAPSULE_SELECTOR = 'header > div > .site-header-capsule'

function syncVideoSize(video: HTMLVideoElement) {
  const hero = video.closest<HTMLElement>('.langtontao-hero--video')
  if (!hero) return

  const isDesktop = window.matchMedia(DESKTOP_MEDIA).matches
  let size = 0

  if (isDesktop) {
    const capsule = document.querySelector<HTMLElement>(HEADER_CAPSULE_SELECTOR)
    if (capsule) size = capsule.getBoundingClientRect().width
  } else {
    const tagline = hero.querySelector<HTMLElement>('.langtontao-hero__title-sub')
    if (tagline) size = tagline.getBoundingClientRect().width
  }

  if (size > 0) {
    hero.style.setProperty('--langtontao-hero-video-size', `${Math.round(size)}px`)
  }
}

export function LangtontaoHeroVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)

  const syncPlayback = useCallback((video: HTMLVideoElement) => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (mediaQuery.matches) {
      video.pause()
      video.currentTime = 0
      return
    }

    void video.play().catch(() => {})
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const handleCanPlay = () => {
      syncPlayback(video)
    }

    const handleMotionChange = () => syncPlayback(video)

    video.load()
    video.addEventListener('canplay', handleCanPlay)
    mediaQuery.addEventListener('change', handleMotionChange)

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
      mediaQuery.removeEventListener('change', handleMotionChange)
    }
  }, [syncPlayback])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const hero = video.closest<HTMLElement>('.langtontao-hero--video')
    if (!hero) return

    const desktopMedia = window.matchMedia(DESKTOP_MEDIA)
    const observers: ResizeObserver[] = []

    const measure = () => syncVideoSize(video)

    const observe = (element: Element | null) => {
      if (!element || typeof ResizeObserver === 'undefined') return
      const observer = new ResizeObserver(measure)
      observer.observe(element)
      observers.push(observer)
    }

    const bindTargets = () => {
      observers.forEach((observer) => observer.disconnect())
      observers.length = 0

      if (desktopMedia.matches) {
        observe(document.querySelector(HEADER_CAPSULE_SELECTOR))
      } else {
        observe(hero.querySelector('.langtontao-hero__title-sub'))
      }

      measure()
    }

    bindTargets()
    desktopMedia.addEventListener('change', bindTargets)
    window.addEventListener('resize', measure)

    return () => {
      desktopMedia.removeEventListener('change', bindTargets)
      window.removeEventListener('resize', measure)
      observers.forEach((observer) => observer.disconnect())
    }
  }, [])

  return (
    <div className="langtontao-hero__video-wrap" aria-hidden>
      <video
        key={HERO_VIDEO_CACHE_VERSION}
        ref={videoRef}
        className="langtontao-hero__video"
        src={LANGTONTAO_HERO_VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={(event) => syncPlayback(event.currentTarget)}
      />
    </div>
  )
}
