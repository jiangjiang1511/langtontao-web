#!/usr/bin/env node
/**
 * Fetch debt article drafts and cover images from original news URLs.
 *
 * Usage:
 *   node scripts/fetch-debt-articles.mjs           # print JSON draft
 *   node scripts/fetch-debt-articles.mjs --covers # download cover images only
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outRoot = path.join(__dirname, '../public/assets/debt-articles')
const coversOnly = process.argv.includes('--covers')

const sources = [
  {
    id: 'story-mortgage-cycle',
    url: 'http://news.szhome.com/392495.html',
  },
  {
    id: 'story-guarantee-trap',
    url: 'https://wuxiaobo.blog.caixin.com/archives/283667',
  },
  {
    id: 'story-business-cashflow',
    url: 'https://www.163.com/dy/article/KVS7PJNN0556CE4K.html',
  },
  {
    id: 'story-education-advance',
    url: 'https://www.163.com/dy/article/KNEUFOE205564PRP.html',
  },
  {
    id: 'story-restructure',
    url: 'https://www.163.com/dy/article/L00036GQ05568W0A.html',
  },
  {
    id: 'story-silent-debt',
    url: 'https://m.36kr.com/p/1722196328449',
  },
]

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'

function decodeHtml(text) {
  return text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

function extractMeta(html, property) {
  const re = new RegExp(
    `<meta[^>]+(?:property|name)=["']${property}["'][^>]+content=["']([^"']+)["']`,
    'i'
  )
  const match = html.match(re)
  if (match) return decodeHtml(match[1])
  const re2 = new RegExp(
    `<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${property}["']`,
    'i'
  )
  const match2 = html.match(re2)
  return match2 ? decodeHtml(match2[1]) : null
}

function extractParagraphs(html) {
  const paragraphs = []
  const re = /<p[^>]*>([\s\S]*?)<\/p>/gi
  let match
  while ((match = re.exec(html)) !== null) {
    const text = decodeHtml(match[1].replace(/<[^>]+>/g, ''))
    if (text.length >= 40) paragraphs.push(text)
  }
  return paragraphs.slice(0, 8)
}

function normalizeImageUrl(raw, pageUrl) {
  if (!raw) return null
  let url = decodeHtml(raw)
  if (url.startsWith('//')) url = `https:${url}`
  if (url.startsWith('/')) {
    const base = new URL(pageUrl)
    url = `${base.origin}${url}`
  }

  // NetEase proxy: decode embedded source URL
  if (url.includes('nimg.ws.126.net') && url.includes('url=')) {
    try {
      const parsed = new URL(url)
      const embedded = parsed.searchParams.get('url')
      if (embedded) url = decodeURIComponent(embedded)
    } catch {
      /* keep proxy url */
    }
  }

  return url
}

function isLikelyContentImage(url) {
  const lower = url.toLowerCase()
  if (
    lower.includes('logo') ||
    lower.includes('icon') ||
    lower.includes('avatar') ||
    lower.includes('favicon') ||
    lower.includes('default180x120') ||
    lower.includes('beian') ||
    lower.includes('qrcode') ||
    lower.includes('app.png')
  ) {
    return false
  }
  return /\.(jpe?g|png|webp|gif)(\?|$)/i.test(lower)
}

function extractCoverImage(html, pageUrl) {
  const og =
    extractMeta(html, 'og:image') ?? extractMeta(html, 'twitter:image')
  if (og) return normalizeImageUrl(og, pageUrl)

  const candidates = []

  const imgTagRe = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi
  let match
  while ((match = imgTagRe.exec(html)) !== null) {
    const url = normalizeImageUrl(match[1], pageUrl)
    if (url && isLikelyContentImage(url)) candidates.push(url)
  }

  const urlRe =
    /https?:\/\/[^"'\\s>]+\.(?:jpg|jpeg|png|webp)(?:\?[^"'\\s>]*)?/gi
  while ((match = urlRe.exec(html)) !== null) {
    const url = normalizeImageUrl(match[0], pageUrl)
    if (url && isLikelyContentImage(url)) candidates.push(url)
  }

  const host = new URL(pageUrl).hostname

  const ranked = [...new Set(candidates)].sort((a, b) => {
    const score = (url) => {
      let s = 0
      if (host.includes('szhome') && url.includes('szhomeimg.com/Article/Big'))
        s += 10
      if (host.includes('caixin') && url.includes('pic.caixin.com/beditor'))
        s += 10
      if (host.includes('163.com') && url.includes('dingyue.ws.126.net')) s += 10
      if (host.includes('36kr.com') && url.includes('36krcdn.com')) s += 10
      if (url.includes('/Article/Big/')) s += 5
      if (url.includes('blog/upload')) s += 5
      return s
    }
    return score(b) - score(a)
  })

  return ranked[0] ?? null
}

function extFromUrl(url) {
  try {
    const pathname = new URL(url).pathname
    const ext = path.extname(pathname).toLowerCase()
    if (['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext)) return ext
  } catch {
    /* noop */
  }
  return '.jpg'
}

async function download(url, dest) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  fs.writeFileSync(dest, buf)
}

async function fetchSource(source) {
  const dir = path.join(outRoot, source.id)
  fs.mkdirSync(dir, { recursive: true })

  const res = await fetch(source.url, { headers: { 'User-Agent': UA } })
  const html = await res.text()
  const title =
    extractMeta(html, 'og:title') ??
    extractMeta(html, 'twitter:title') ??
    html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim()
  const imageUrl = extractCoverImage(html, source.url)
  const paragraphs = extractParagraphs(html)

  let savedImage = null
  let coverFile = null

  if (imageUrl) {
    const ext = extFromUrl(imageUrl)
    coverFile = `article-cover${ext}`
    const dest = path.join(dir, coverFile)
    await download(imageUrl, dest)
    savedImage = `/assets/debt-articles/${source.id}/${coverFile}`

    // Remove stale cover files with other extensions
    for (const entry of fs.readdirSync(dir)) {
      if (
        (entry.startsWith('cover.') || entry.startsWith('article-cover.')) &&
        entry !== coverFile
      ) {
        fs.unlinkSync(path.join(dir, entry))
      }
    }
  }

  return {
    id: source.id,
    url: source.url,
    title,
    imageUrl,
    savedImage,
    coverFile,
    paragraphCount: paragraphs.length,
    paragraphs,
  }
}

async function main() {
  const results = []

  for (const source of sources) {
    try {
      const draft = await fetchSource(source)
      results.push(draft)
      console.log(
        `${draft.savedImage ? 'OK ' : 'MISS'} ${source.id} -> ${draft.savedImage ?? 'no image'}`
      )
    } catch (error) {
      results.push({ id: source.id, url: source.url, error: error.message })
      console.log(`ERR ${source.id}: ${error.message}`)
    }
  }

  if (!coversOnly) {
    console.log('\n--- Draft JSON (for manual curation) ---\n')
    console.log(JSON.stringify(results, null, 2))
  }

  console.log('\n--- Cover paths for debt-topic-articles.ts ---\n')
  for (const item of results) {
    if (item.savedImage) {
      console.log(`${item.id}: ${item.savedImage}`)
    }
  }
}

main()
