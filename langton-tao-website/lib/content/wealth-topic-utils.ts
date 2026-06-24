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
      'linear-gradient(145deg, #fafafa 0%, #f4f4f5 45%, #ffe600 140%)',
    glyph: '#09090b',
  },
  {
    background:
      'linear-gradient(145deg, #fffef5 0%, #fff9c4 50%, #ffe600 100%)',
    glyph: '#09090b',
  },
  {
    background:
      'linear-gradient(145deg, #f4f4f5 0%, #e4e4e7 55%, #fafafa 100%)',
    glyph: '#52525b',
  },
  {
    background:
      'linear-gradient(145deg, #18181b 0%, #3f3f46 60%, #71717a 100%)',
    glyph: '#ffe600',
  },
  {
    background:
      'linear-gradient(145deg, #ffffff 0%, #fafafa 50%, #e4e4e7 100%)',
    glyph: '#09090b',
  },
] as const

export function getWealthTopicVisualTheme(index: number) {
  return WEALTH_TOPIC_VISUAL_THEMES[index % WEALTH_TOPIC_VISUAL_THEMES.length]
}
