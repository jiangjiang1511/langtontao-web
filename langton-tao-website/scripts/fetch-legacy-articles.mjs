#!/usr/bin/env node
/**
 * Fetch legacy article cover images from original news URLs.
 *
 * Usage:
 *   node scripts/fetch-legacy-articles.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outRoot = path.join(__dirname, '../public/assets/legacy-articles')

const sources = [
  {
    id: 'story-li-trust-third-son',
    url: 'https://www.jiemian.com/article/2464850.html',
  },
  {
    id: 'story-four-families-succession',
    url: 'https://www.jiemian.com/article/3134774.html',
  },
  {
    id: 'story-kwok-beneficiary-exclusion',
    url: 'https://www.cfwia2020.org/post/%E6%8F%AD%E7%A7%98%EF%BC%9A%E9%A6%99%E6%B8%AF%E3%80%8C%E5%9B%9B%E5%A4%A7%E5%AE%B6%E6%97%8F%E3%80%8D%E5%A6%82%E4%BD%95%E5%81%9A%E8%B2%A1%E5%AF%8C%E5%82%B3%E6%89%BF%EF%BC%9F',
  },
  {
    id: 'story-beneficiary-mismatch',
    url: 'https://www.caitc.cn/website/info/12967',
  },
  {
    id: 'story-three-generations',
    url: 'https://paper.people.com.cn/rmwz/html/2013-07/01/content_1264523.htm',
  },
  {
    id: 'story-withdrawer-vs-citizen',
    url: 'https://www.jiemian.com/article/2464850.html',
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

function extractCoverImage(html, pageUrl) {
  const og = extractMeta(html, 'og:image')
  if (og) return og

  const candidates = []
  const imgRe = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi
  let match
  while ((match = imgRe.exec(html)) !== null) {
    let url = match[1]
    if (url.startsWith('//')) url = `https:${url}`
    else if (url.startsWith('/')) {
      try {
        url = new URL(url, pageUrl).href
      } catch {
        continue
      }
    }
    if (!/^https?:\/\//i.test(url)) continue
    if (/logo|icon|avatar|emoji|1x1|pixel|spacer/i.test(url)) continue
    candidates.push(url)
  }

  const ranked = candidates.sort((a, b) => {
    function score(url) {
      let s = 0
      const host = new URL(url).hostname
      if (host.includes('jiemian.com') && url.includes('img.jiemian.com')) s += 10
      if (host.includes('people.com.cn')) s += 8
      if (host.includes('cfwia2020.org')) s += 8
      if (host.includes('caitc.cn')) s += 8
      if (/cover|article|content|upload|photo|image/i.test(url)) s += 5
      if (/\.(jpg|jpeg|png|webp)(\?|$)/i.test(url)) s += 3
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
  const imageUrl = extractCoverImage(html, source.url)

  let savedImage = null

  if (imageUrl) {
    const ext = extFromUrl(imageUrl)
    const coverFile = `article-cover${ext}`
    const dest = path.join(dir, coverFile)
    await download(imageUrl, dest)
    savedImage = `/assets/legacy-articles/${source.id}/${coverFile}`

    for (const entry of fs.readdirSync(dir)) {
      if (
        (entry.startsWith('cover.') || entry.startsWith('article-cover.')) &&
        entry !== coverFile
      ) {
        fs.unlinkSync(path.join(dir, entry))
      }
    }
  }

  return { id: source.id, imageUrl, savedImage }
}

async function main() {
  for (const source of sources) {
    try {
      const result = await fetchSource(source)
      console.log(
        `${result.savedImage ? 'OK ' : 'MISS'} ${source.id} -> ${result.savedImage ?? result.imageUrl ?? 'no image'}`
      )
    } catch (error) {
      console.log(`ERR ${source.id}: ${error.message}`)
    }
  }
}

main()
