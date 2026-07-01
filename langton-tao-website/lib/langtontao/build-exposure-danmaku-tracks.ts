import type { LangtontaoExposureItem } from '@/lib/content/langtontao/langtontao-why-mfo'

export const EXPOSURE_DANMAKU_LANE_COUNT = 5
export const EXPOSURE_DANMAKU_DEPTH_COUNT = 5
export const EXPOSURE_DANMAKU_SAFE_TOP_PCT = 14
export const EXPOSURE_DANMAKU_SAFE_BOTTOM_PCT = 82
export const EXPOSURE_DANMAKU_VERTICAL_SPAN_PCT =
  EXPOSURE_DANMAKU_SAFE_BOTTOM_PCT - EXPOSURE_DANMAKU_SAFE_TOP_PCT

export type ExposureDepthProfile = {
  depthIndex: number
  durationSec: number
  scale: number
  blurPx: number
  opacity: number
}

/** Depth tiers — blur/scale/speed only; decoupled from vertical position */
export const EXPOSURE_DANMAKU_DEPTH_PROFILES: ExposureDepthProfile[] = [
  { depthIndex: 0, durationSec: 90, scale: 0.88, blurPx: 2, opacity: 0.82 },
  { depthIndex: 1, durationSec: 75, scale: 0.92, blurPx: 1.5, opacity: 0.88 },
  { depthIndex: 2, durationSec: 60, scale: 0.96, blurPx: 1, opacity: 0.94 },
  { depthIndex: 3, durationSec: 48, scale: 1, blurPx: 0.5, opacity: 1 },
  { depthIndex: 4, durationSec: 38, scale: 1.04, blurPx: 0, opacity: 1 },
]

export type ExposureDanmakuTrack = {
  itemId: string
  lane: number
  depthIndex: number
  durationSec: number
  delaySec: number
  scale: number
  blurPx: number
  opacity: number
  topPercent: number
  rotateDeg: number
  collageVariant: number
}

function hashString(value: string): number {
  let hash = 0
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0
  }
  return hash
}

export function buildExposureDanmakuTracks(
  items: LangtontaoExposureItem[],
  categoryKey: string
): ExposureDanmakuTrack[] {
  const laneNextDelay = Array.from({ length: EXPOSURE_DANMAKU_LANE_COUNT }, () => 0)

  return items.map((item, index) => {
    const hash = hashString(`${categoryKey}:${item.id}`)
    const depthIndex = hash % EXPOSURE_DANMAKU_DEPTH_COUNT
    const profile = EXPOSURE_DANMAKU_DEPTH_PROFILES[depthIndex]!
    const lane = (hash >> 4) % EXPOSURE_DANMAKU_LANE_COUNT
    const topPercent =
      EXPOSURE_DANMAKU_SAFE_TOP_PCT +
      ((hash >> 8) % EXPOSURE_DANMAKU_VERTICAL_SPAN_PCT)
    const rotateDeg = -4 + (hash % 9)
    const collageVariant = hash % 4
    const jitter = (hash % 11) * 0.45
    const rawDelaySec = laneNextDelay[lane] + jitter
    const delaySec = Math.max(0, Number.isFinite(rawDelaySec) ? rawDelaySec : 0)
    const durationSec = profile.durationSec + (hash % 9) * 0.35

    laneNextDelay[lane] = delaySec + durationSec * 0.22 + 2.8 + (index % 4) * 0.6

    return {
      itemId: item.id,
      lane,
      depthIndex,
      durationSec,
      delaySec,
      scale: profile.scale,
      blurPx: profile.blurPx,
      opacity: profile.opacity,
      topPercent,
      rotateDeg,
      collageVariant,
    }
  })
}
