#!/usr/bin/env node
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const SKIP = ['/app/home-backup/', '/components/sections/home/', '/node_modules/', '/scripts/']

const REPLACEMENTS = [
  [/rgba\(255, 230, 0/g, 'rgba(139, 92, 246'],
  [/rgba\(255,230,0/g, 'rgba(139,92,246'],
  [/#fbbf24/gi, '#a78bfa'],
  [/#fef3c7/gi, '#ede9fe'],
  [/#fff7ed/gi, '#f5f3ff'],
  [/#fffbeb/gi, '#f5f3ff'],
  [/#fff9c4/gi, '#ede9fe'],
  [/4px 4px 0 0 var\(--pop-black\)/g, 'var(--ji-glow)'],
  [/4px 4px 0 var\(--pop-black\)/g, 'var(--ji-glow)'],
  [/3px 3px 0 0 var\(--pop-black\)/g, 'var(--ji-glow)'],
  [/2px 2px 0 0 var\(--pop-black\)/g, 'var(--ji-glow)'],
  [/4px 4px 0 0 var\(--el-ink\)/g, 'var(--ji-glow)'],
  [/4px 4px 0 0 var\(--lb-ink\)/g, 'var(--ji-glow)'],
  [/4px 4px 0 0 var\(--c2-fg\)/g, 'var(--ji-glow)'],
  [/4px 4px 0 #09090b/g, 'var(--ji-glow)'],
  [/3px 3px 0 #09090b/g, 'var(--ji-glow)'],
  [/2px 2px 0 #09090b/g, 'var(--ji-glow)'],
  [/5px 5px 0 0 #fbbf24/g, 'var(--ji-glow-strong)'],
  [/3px 3px 0 0 #fbbf24/g, 'var(--ji-glow)'],
  [/3px 3px 0 0 #92400e/g, 'var(--ji-glow)'],
  [/box-shadow: 4px 4px 0 0 var\(--iq-black\)/g, 'box-shadow: var(--ji-glow)'],
  [/box-shadow: 3px 3px 0 0 var\(--iq-yellow\)/g, 'box-shadow: var(--ji-glow-strong)'],
  [/box-shadow: 2px 2px 0 0 var\(--iq-yellow\)/g, 'box-shadow: var(--ji-glow)'],
  [/#ff0040/g, '#ec4899'],
  [/#00d4ff/g, '#3b82f6'],
  [/--el-ink: var\(--pop-black\)/g, '--el-ink: var(--ji-ink)'],
  [/--el-paper: var\(--pop-paper\)/g, '--el-paper: var(--c2-surface)'],
  [/--el-surface: var\(--pop-white\)/g, '--el-surface: var(--ji-surface)'],
  [/--lb-ink: var\(--pop-black\)/g, '--lb-ink: var(--ji-ink)'],
  [/--lb-paper: var\(--pop-paper\)/g, '--lb-paper: var(--c2-surface)'],
  [/--lb-surface: var\(--pop-white\)/g, '--lb-surface: var(--ji-surface)'],
  [/--lb-shadow: 4px 4px 0 0 var\(--pop-black\)/g, '--lb-shadow: var(--ji-glow)'],
  [/--lb-shadow-yellow: 3px 3px 0 0 var\(--jarsy-violet\)/g, '--lb-shadow-accent: var(--ji-glow)'],
  [/drop-shadow\(4px 4px 0 var\(--el-ink\)\)/g, 'drop-shadow(0 8px 24px rgb(99 102 241 / 0.25))'],
  [/border: 2px solid var\(--c2-pop-black\)/g, 'border: 1px solid var(--ji-border)'],
  [/border: 2px solid var\(--iq-black\)/g, 'border: 1px solid var(--ji-border)'],
]

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (SKIP.some((s) => p.includes(s))) continue
    const st = statSync(p)
    if (st.isDirectory()) walk(p, files)
    else if (/\.(css|tsx?)$/.test(name)) files.push(p)
  }
  return files
}

let changed = 0
for (const file of walk(ROOT)) {
  let src = readFileSync(file, 'utf8')
  let next = src
  for (const [re, rep] of REPLACEMENTS) next = next.replace(re, rep)
  if (next !== src) {
    writeFileSync(file, next)
    changed++
  }
}
console.log(`Updated ${changed} files`)
