export type ReadingGalleryImage = {
  id: string
  src: string
  alt: string
  width: number
  height: number
  rotate?: number
}

export const readingGalleryImages: readonly ReadingGalleryImage[] = [
  {
    id: 'reading-1',
    src: '/assets/bearbitcoffee/reading-club/reading1.jpg',
    alt: '读书会围读现场',
    width: 1702,
    height: 1276,
    rotate: -2,
  },
  {
    id: 'reading-2',
    src: '/assets/bearbitcoffee/reading-club/reading2.jpg',
    alt: '读书会分享讨论',
    width: 1279,
    height: 2275,
    rotate: 1.5,
  },
  {
    id: 'reading-3',
    src: '/assets/bearbitcoffee/reading-club/reading3.jpg',
    alt: '读书会社群共读',
    width: 1170,
    height: 2532,
    rotate: -1,
  },
  {
    id: 'reading-4',
    src: '/assets/bearbitcoffee/reading-club/reading4.jpg',
    alt: '读书会线下聚会',
    width: 1170,
    height: 2532,
    rotate: 2,
  },
] as const

const READING_GALLERY_COLUMNS = 4
const READING_GALLERY_ASPECT_BONUS = 0.3
const READING_GALLERY_COMPACT_SCALE = 0.86
const READING_GALLERY_LAYOUT_BUDGET = 0.78
const READING_GALLERY_SIZE_SCALE = 1.5
const READING_GALLERY_MOBILE_HEIGHT_SCALE = 1.5

export type ReadingGalleryLayoutMode = 'desktop' | 'mobile'

export type ReadingGalleryFrameSize = {
  width: number
  height: number
}

function scaleSizesToRowWidth(
  sizes: Record<string, ReadingGalleryFrameSize>,
  images: readonly ReadingGalleryImage[],
  rowWidth: number,
  gap: number
): Record<string, ReadingGalleryFrameSize> {
  const totalWidth =
    images.reduce((sum, image) => sum + (sizes[image.id]?.width ?? 0), 0) +
    gap * Math.max(0, images.length - 1)

  if (totalWidth <= 0) return sizes

  const factor = rowWidth / totalWidth
  if (Math.abs(factor - 1) < 0.01) return sizes

  return Object.fromEntries(
    images.map((image) => {
      const size = sizes[image.id]
      if (!size) return [image.id, size]

      return [
        image.id,
        {
          width: Math.round(size.width * factor),
          height: Math.round(size.height * factor),
        },
      ]
    })
  )
}

export function computeReadingGalleryFrameSizes(
  images: readonly ReadingGalleryImage[],
  rowWidth: number,
  gap: number,
  mode: ReadingGalleryLayoutMode = 'desktop'
): Record<string, ReadingGalleryFrameSize> {
  if (rowWidth <= 0 || images.length === 0) return {}

  const isMobile = mode === 'mobile'
  const layoutBudget = isMobile ? 1 : READING_GALLERY_LAYOUT_BUDGET
  const compactScale = isMobile ? 1 : READING_GALLERY_COMPACT_SCALE
  const sizeScale = isMobile
    ? READING_GALLERY_SIZE_SCALE * READING_GALLERY_MOBILE_HEIGHT_SCALE
    : READING_GALLERY_SIZE_SCALE
  const columns = READING_GALLERY_COLUMNS

  const budgetWidth = rowWidth * layoutBudget
  const columnWidth =
    ((budgetWidth - gap * (columns - 1)) / columns) * compactScale
  const minAspect = Math.min(...images.map((image) => image.height / image.width))
  const baseHeight = columnWidth * minAspect

  const sizes = Object.fromEntries(
    images.map((image) => {
      const aspect = image.height / image.width
      const tallBonus = Math.max(0, aspect - minAspect) * READING_GALLERY_ASPECT_BONUS
      const height = Math.round(baseHeight * (1 + tallBonus) * sizeScale)
      const width = Math.round(height / aspect)

      return [image.id, { width, height }]
    })
  )

  if (isMobile) {
    return scaleSizesToRowWidth(sizes, images, rowWidth, gap)
  }

  return sizes
}
