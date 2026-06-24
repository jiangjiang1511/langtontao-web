#!/usr/bin/env node
/**
 * Fetch WeChat article content for preservation article dialogs.
 *
 * Usage:
 *   node scripts/fetch-preservation-articles.mjs
 *   node scripts/fetch-preservation-articles.mjs --write  # update TS content file
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const writeMode = process.argv.includes('--write')

const WECHAT_UA =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.43(0x18002b2d) NetType/WIFI Language/zh_CN'

const sources = [
  {
    id: 'fwd-article-richard-li',
    url: 'https://mp.weixin.qq.com/s/F6WChaheUpmJXlE_4jOgtw',
    outlet: '微信公众号',
  },
]

function decodeHtml(text) {
  return text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16))
    )
    .replace(/&#(\d+);/g, (_, num) => String.fromCharCode(Number(num)))
    .replace(/\s+/g, ' ')
    .trim()
}

function extractTitle(html) {
  return (
    decodeHtml(
      html.match(/id="activity-name"[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? ''
    ).replace(/<[^>]+>/g, '') ||
    decodeHtml(html.match(/property="og:title"[^>]+content="([^"]+)"/i)?.[1] ?? '')
  )
}

function extractJsContent(html) {
  const start = html.indexOf('id="js_content"')
  if (start < 0) return ''

  const openEnd = html.indexOf('>', start)
  if (openEnd < 0) return ''

  const endMarkers = [
    'id="js_tags_preview"',
    'id="js_temp_bottom_area"',
    'id="js_tags"',
    'class="rich_media_tool_area"',
  ]

  let close = -1
  for (const marker of endMarkers) {
    const index = html.indexOf(marker, openEnd)
    if (index >= 0 && (close < 0 || index < close)) {
      close = index
    }
  }

  if (close < 0) return html.slice(openEnd + 1)

  return html.slice(openEnd + 1, close)
}

function extractBlocks(contentHtml) {
  const blocks = []
  const seenImages = new Set()
  const tokenRe = /<img[^>]+>|<p[^>]*>[\s\S]*?<\/p>/gi
  let match

  while ((match = tokenRe.exec(contentHtml)) !== null) {
    const token = match[0]

    if (token.startsWith('<img')) {
      const srcMatch = token.match(/(?:data-src|src)=["']([^"']+)["']/i)
      const src = srcMatch ? decodeHtml(srcMatch[1]) : ''
      if (!src.startsWith('http') || seenImages.has(src)) continue
      seenImages.add(src)
      blocks.push({ type: 'image', src, alt: '文章配图' })
      continue
    }

    const text = decodeHtml(token.replace(/<[^>]+>/g, ''))
    if (text.length >= 8) {
      blocks.push({ type: 'paragraph', text })
    }
  }

  return blocks
}

async function fetchHtml(url) {
  const response = await fetch(url, {
    headers: {
      'User-Agent': WECHAT_UA,
      Accept: 'text/html,application/xhtml+xml',
      'Accept-Language': 'zh-CN,zh;q=0.9',
    },
    redirect: 'follow',
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`)
  }

  return response.text()
}

async function downloadImage(url, destPath) {
  const response = await fetch(url, {
    headers: {
      'User-Agent': WECHAT_UA,
      Referer: 'https://mp.weixin.qq.com/',
    },
  })

  if (!response.ok) {
    throw new Error(`Image HTTP ${response.status}: ${url}`)
  }

  const buffer = Buffer.from(await response.arrayBuffer())
  fs.mkdirSync(path.dirname(destPath), { recursive: true })
  fs.writeFileSync(destPath, buffer)
}

function guessExt(url) {
  if (url.includes('wx_fmt=png')) return '.png'
  if (url.includes('wx_fmt=gif')) return '.gif'
  if (url.includes('wx_fmt=webp')) return '.webp'
  return '.jpg'
}

async function processSource(source) {
  const html = await fetchHtml(source.url)
  const title = extractTitle(html)
  const contentHtml = extractJsContent(html)
  const rawBlocks = extractBlocks(contentHtml)

  const assetDir = path.join(
    __dirname,
    `../public/assets/preservation-articles/${source.id}`
  )
  fs.mkdirSync(assetDir, { recursive: true })

  const blocks = []
  let imageIndex = 0

  for (const block of rawBlocks) {
    if (block.type === 'paragraph') {
      blocks.push(block)
      continue
    }

    imageIndex += 1
    const ext = guessExt(block.src)
    const filename = `page-${String(imageIndex).padStart(2, '0')}${ext}`
    const destPath = path.join(assetDir, filename)
    await downloadImage(block.src, destPath)
    blocks.push({
      type: 'image',
      src: `/assets/preservation-articles/${source.id}/${filename}`,
      alt: `《${title}》配图 ${imageIndex}`,
    })
  }

  return {
    id: source.id,
    headline: title,
    outlet: source.outlet,
    sourceUrl: source.url,
    blocks,
  }
}

function formatTs(articles) {
  const body = articles
    .map((article) => {
      const blocks = article.blocks
        .map((block) => {
          if (block.type === 'paragraph') {
            return `      { type: 'paragraph', text: ${JSON.stringify(block.text)} },`
          }
          return `      {
        type: 'image',
        src: ${JSON.stringify(block.src)},
        alt: ${JSON.stringify(block.alt)},
      },`
        })
        .join('\n')

      return `  {
    id: ${JSON.stringify(article.id)},
    headline: ${JSON.stringify(article.headline)},
    outlet: ${JSON.stringify(article.outlet)},
    sourceUrl: ${JSON.stringify(article.sourceUrl)},
    blocks: [
${blocks}
    ],
  },`
    })
    .join('\n')

  return `export type PreservationArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'image'; src: string; alt: string; caption?: string }

export type CoffeePreservationArticleContent = {
  id: string
  headline: string
  outlet: string
  publishedAt?: string
  sourceUrl: string
  lead?: string
  blocks: readonly PreservationArticleBlock[]
}

export const coffeePreservationArticles: readonly CoffeePreservationArticleContent[] =
  [
${body}
  ]

export function getCoffeePreservationArticle(id: string) {
  return coffeePreservationArticles.find((article) => article.id === id)
}
`
}

const articles = []
for (const source of sources) {
  console.log(`Fetching ${source.id}...`)
  const article = await processSource(source)
  articles.push(article)
  console.log(
    `  ${article.headline} — ${article.blocks.filter((b) => b.type === 'image').length} images, ${article.blocks.filter((b) => b.type === 'paragraph').length} paragraphs`
  )
}

if (writeMode) {
  const outPath = path.join(
    __dirname,
    '../lib/content/coffee-preservation-articles.ts'
  )
  fs.writeFileSync(outPath, formatTs(articles))
  console.log(`Wrote ${outPath}`)
} else {
  console.log(JSON.stringify(articles, null, 2))
}
