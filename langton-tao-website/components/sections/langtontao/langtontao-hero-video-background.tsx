'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

/** Bump when replacing hero-anime.mp4 to bust browser cache. */
const HERO_VIDEO_CACHE_VERSION = '20260705-2'

export const LANGTONTAO_HERO_VIDEO_SRC = `/assets/langtontao/hero-anime.mp4?v=${HERO_VIDEO_CACHE_VERSION}`
export const LANGTONTAO_HERO_VIDEO_POSTER = '/assets/langtontao/langtontao-logo.png'

const DESKTOP_MEDIA = '(min-width: 768px)'
const HEADER_CAPSULE_SELECTOR = 'header > div > .site-header-capsule'

function syncVideoSize(video: HTMLVideoElement) {
  const hero = video.closest<HTMLElement>('.langtontao-hero--video')
  if (!hero) return

  const isDesktop = window.matchMedia(DESKTOP_MEDIA).matches

  if (!isDesktop) {
    hero.style.removeProperty('--langtontao-hero-video-size')
    return
  }

  const capsule = document.querySelector<HTMLElement>(HEADER_CAPSULE_SELECTOR)
  const size = capsule?.getBoundingClientRect().width ?? 0

  if (size > 0) {
    hero.style.setProperty('--langtontao-hero-video-size', `${Math.round(size)}px`)
  }
}

export function LangtontaoHeroVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [preload, setPreload] = useState<'auto' | 'metadata'>('metadata')

  useEffect(() => {
    setPreload(window.matchMedia(DESKTOP_MEDIA).matches ? 'auto' : 'metadata')
  }, [])

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
    let capsuleObserver: ResizeObserver | undefined

    const measure = () => syncVideoSize(video)

    const bindTargets = () => {
      capsuleObserver?.disconnect()
      capsuleObserver = undefined

      if (desktopMedia.matches) {
        const capsule = document.querySelector(HEADER_CAPSULE_SELECTOR)
        if (capsule && typeof ResizeObserver !== 'undefined') {
          capsuleObserver = new ResizeObserver(measure)
          capsuleObserver.observe(capsule)
        }
      } else {
        hero.style.removeProperty('--langtontao-hero-video-size')
      }

      measure()
    }

    bindTargets()
    desktopMedia.addEventListener('change', bindTargets)
    window.addEventListener('resize', measure)

    return () => {
      desktopMedia.removeEventListener('change', bindTargets)
      window.removeEventListener('resize', measure)
      capsuleObserver?.disconnect()
    }
  }, [])

  return (
    <div className="langtontao-hero__video-wrap" aria-hidden>
      <video
        key={HERO_VIDEO_CACHE_VERSION}
        ref={videoRef}
        className="langtontao-hero__video"
        src={LANGTONTAO_HERO_VIDEO_SRC}
        poster={LANGTONTAO_HERO_VIDEO_POSTER}
        autoPlay
        muted
        loop
        playsInline
        preload={preload}
        onLoadedData={(event) => syncPlayback(event.currentTarget)}
      />
    </div>
  )
}
