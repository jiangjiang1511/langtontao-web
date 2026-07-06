/** Calibrated placeholder min-heights to reduce layout shift on lazy mount (@375px). */
export const SECTION_MIN_HEIGHTS = {
  'home-roots': 'min(100vh, 3200px)',
  pillars: 'min(50vh, 900px)',
  superhero: 'min(120vh, 4200px)',
  'wealth-checkup': 'min(110vh, 4000px)',
  yitishuangkua: 'min(80vh, 2400px)',
  'tao-framework': 'min(90vh, 2800px)',
  'day-1': 'min(100vh, 3600px)',
  'day-2': 'min(100vh, 3400px)',
  'year-1': 'min(90vh, 3000px)',
  'year-6': 'min(85vh, 2800px)',
  'year-15': 'min(85vh, 2800px)',
  'year-30': 'min(80vh, 2600px)',
  'year-50': 'min(75vh, 2400px)',
  'year-100': 'min(70vh, 2200px)',
  'century-bridge': 'min(60vh, 2000px)',
  'coffee-life-events-content': 'min(100vh, 3800px)',
  'life-living': 'min(100vh, 3600px)',
  'life-alliance': 'min(95vh, 3200px)',
  'life-education': 'min(90vh, 3000px)',
  'life-retirement': 'min(85vh, 2800px)',
  'life-legacy': 'min(85vh, 2800px)',
  'coffee-join-band': '20vh',
  'coffee-pillars': '35vh',
  'coffee-manifesto': '35vh',
  'coffee-reading': '30vh',
  'coffee-events': '35vh',
  'coffee-collaboration': '25vh',
  'commission-overview': 'min(80vh, 2600px)',
  'tier-benefits': 'min(85vh, 2800px)',
  'plan-compare': 'min(75vh, 2400px)',
  'tier-board': 'min(60vh, 2000px)',
  'jarsy-join-band': '20vh',
  'langtontao-join-band': '20vh',
} as const

export type SectionMinHeightKey = keyof typeof SECTION_MIN_HEIGHTS

export function sectionMinHeight(key: SectionMinHeightKey | string, fallback = '50vh') {
  if (key in SECTION_MIN_HEIGHTS) {
    return SECTION_MIN_HEIGHTS[key as SectionMinHeightKey]
  }
  return fallback
}
