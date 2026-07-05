import type { WealthNarrativeNode } from '@/lib/content/coffee-wealth-narrative'

export function nodeHasDetailContent(node: WealthNarrativeNode): boolean {
  return Boolean(node.body || node.formula || node.stats?.length)
}

export function childHasModalContent(child: WealthNarrativeNode): boolean {
  return nodeHasDetailContent(child) || Boolean(child.children?.length)
}

export function canOpenWealthTopicModal(node: WealthNarrativeNode): boolean {
  if (node.children?.length) {
    return node.children.some(childHasModalContent)
  }
  return nodeHasDetailContent(node)
}

export function getWealthTopicTeaser(node: WealthNarrativeNode, maxLength = 100): string {
  if (node.summary) return node.summary
  if (!node.body) return ''
  if (node.body.length <= maxLength) return node.body
  return `${node.body.slice(0, maxLength).trim()}…`
}

export const WEALTH_TOPIC_VISUAL_THEMES = [
  {
    background:
      'linear-gradient(145deg, #fafafa 0%, #f4f4f5 45%, var(--jarsy-violet) 140%)',
    coverOverlay:
      'linear-gradient(145deg, rgba(250, 250, 250, 0.88) 0%, rgba(244, 244, 245, 0.8) 45%, rgba(139, 92, 246, 0.42) 140%)',
    glyph: '#09090b',
  },
  {
    background:
      'linear-gradient(145deg, #fffef5 0%, #ede9fe 50%, var(--jarsy-violet) 100%)',
    coverOverlay:
      'linear-gradient(145deg, rgba(255, 254, 245, 0.9) 0%, rgba(255, 249, 196, 0.78) 50%, rgba(139, 92, 246, 0.48) 100%)',
    glyph: '#09090b',
  },
  {
    background:
      'linear-gradient(145deg, #f4f4f5 0%, #e4e4e7 55%, #fafafa 100%)',
    coverOverlay:
      'linear-gradient(145deg, rgba(244, 244, 245, 0.86) 0%, rgba(228, 228, 231, 0.78) 55%, rgba(250, 250, 250, 0.72) 100%)',
    glyph: '#52525b',
  },
  {
    background:
      'linear-gradient(145deg, #18181b 0%, #3f3f46 60%, #71717a 100%)',
    coverOverlay:
      'linear-gradient(145deg, rgba(24, 24, 27, 0.72) 0%, rgba(63, 63, 70, 0.68) 60%, rgba(113, 113, 122, 0.62) 100%)',
    glyph: '#8b5cf6',
  },
  {
    background:
      'linear-gradient(145deg, #ffffff 0%, #fafafa 50%, #e4e4e7 100%)',
    coverOverlay:
      'linear-gradient(145deg, rgba(255, 255, 255, 0.88) 0%, rgba(250, 250, 250, 0.8) 50%, rgba(228, 228, 231, 0.72) 100%)',
    glyph: '#09090b',
  },
] as const

export function getWealthTopicVisualTheme(index: number) {
  return WEALTH_TOPIC_VISUAL_THEMES[index % WEALTH_TOPIC_VISUAL_THEMES.length]
}

export function getWealthTopicVisualStyle(
  index: number,
  coverSrc?: string
): Record<string, string> {
  const theme = getWealthTopicVisualTheme(index)

  if (coverSrc) {
    return {
      '--wealth-topic-visual-bg': theme.coverOverlay,
      '--wealth-topic-cover-image': `url("${coverSrc}")`,
      '--wealth-topic-visual-glyph': theme.glyph,
    }
  }

  return {
    '--wealth-topic-visual-bg': theme.background,
    '--wealth-topic-visual-glyph': theme.glyph,
  }
}
