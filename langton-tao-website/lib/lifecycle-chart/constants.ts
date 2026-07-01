export const LIFECYCLE_VIEWBOX_W = 1000
export const LIFECYCLE_VIEWBOX_H = 560
export const LIFECYCLE_CHART_AXIS_Y = 480
export const LIFECYCLE_TRAP_MARKER_HALF = 12

export const LIFECYCLE_ENTER_DELAYS = {
  zones: 0,
  frame: 240,
  chrome: 400,
  traps: 560,
  curve: 720,
  curveDuration: 1400,
  legend: 200,
} as const

export function getTrapMarkerY(endY: number) {
  return Math.min(endY - 16, LIFECYCLE_CHART_AXIS_Y - LIFECYCLE_TRAP_MARKER_HALF - 10)
}
