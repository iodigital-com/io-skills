import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { dirname, join, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import MarkdownIt from 'markdown-it'
import nl from '../docs/nl/index.json' with { type: 'json' }
import en from '../docs/en/index.json' with { type: 'json' }
import { phaseForSkill, workflowSteps } from './phases.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const languages = ['nl', 'en']
const markdown = new MarkdownIt({ html: false })
export const copyFor = (lang) => ({ nl, en })[lang]

export function skillIds() {
  const directory = join(root, 'skills')
  return readdirSync(directory, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isDirectory() &&
        !entry.name.startsWith('.') &&
        existsSync(join(directory, entry.name, 'SKILL.md'))
    )
    .map((entry) => entry.name)
    .sort()
}

function contentPaths(directory, prefix = '') {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name.startsWith('.')) return []
    const path = prefix + entry.name
    if (entry.isDirectory()) return contentPaths(join(directory, entry.name), path + '/')
    return entry.isFile() ? [path] : []
  })
}

export function validateTranslations() {
  const byLanguage = languages.map((lang) => new Set(contentPaths(join(root, 'docs', lang))))
  const required = new Set([
    ...byLanguage[0],
    ...byLanguage[1],
    ...skillIds().map((id) => `skills/${id}.md`),
  ])
  const missing = languages.flatMap((lang, index) =>
    [...required]
      .filter((path) => !byLanguage[index].has(path))
      .map((path) => `docs/${lang}/${path}`)
  )
  if (missing.length) throw new Error('Missing documentation: ' + missing.sort().join(', '))
}

function inlineText(token) {
  return token.children
    .map((child) => {
      if (['text', 'code_inline', 'image'].includes(child.type)) return child.content
      return ['softbreak', 'hardbreak'].includes(child.type) ? ' ' : ''
    })
    .join('')
}

function prepareLinks(inline, documentUrl, heading) {
  for (const token of inline.children) {
    if (token.type !== 'link_open') continue
    const href = token.attrGet('href')
    if (!href) continue
    if (!href.startsWith('/') && !/^[a-z][a-z\d+.-]*:/i.test(href)) {
      const target = new URL(href, documentUrl)
      if (/^[^?#]*\.md(?:[?#]|$)/i.test(href) && /^\/(nl|en)\//.test(target.pathname)) {
        token.attrSet('href', target.pathname.replace(/\.md$/i, '/') + target.search + target.hash)
      }
    }
    const skillLink = /^\/(?:nl|en)\/skills\/([a-z0-9-]+)\/(?:[?#].*)?$/.exec(token.attrGet('href'))
    if (skillLink) {
      const id = skillLink[1]
      token.attrSet('data-phase', phaseForSkill(id))
      if (heading && !heading.skills.includes(id)) heading.skills.push(id)
    }
  }
}

function readPromptOutput(tokens, index, number) {
  // A demo link in its own paragraph immediately after a prompt belongs to that prompt.
  if (tokens[index]?.type !== 'paragraph_open') return null
  const items = tokens[index + 1].children
  if (items?.length !== 3) return null
  const [link, label, closing] = items
  if (link.type !== 'link_open' || label.type !== 'text' || closing.type !== 'link_close') return null
  const href = link.attrGet('href')
  if (!href?.startsWith('/prototypes/')) return null
  const url = new URL(href, 'https://docs.invalid')
  url.searchParams.set('prompt', String(number))
  return { href: url.pathname + url.search + url.hash, label: label.content }
}

export function readArticle(lang, relativeMarkdownPath) {
  if (!languages.includes(lang)) throw new Error('Unknown documentation language: ' + lang)
  const languageRoot = join(root, 'docs', lang)
  const filename = resolve(languageRoot, relativeMarkdownPath)
  const path = relative(languageRoot, filename)
  if (!path.endsWith('.md') || path.startsWith('..' + sep) || filename === languageRoot) {
    throw new Error('Invalid documentation path: ' + relativeMarkdownPath)
  }
  const tokens = markdown.parse(readFileSync(filename, 'utf8'), {})
  if (tokens[0]?.tag !== 'h1') throw new Error('Missing article title: ' + filename)
  const title = inlineText(tokens[1])
  // The project intent also serves as a standalone Markdown document with its own language links.
  const hasLanguageLinks =
    path === 'project-intent.md' &&
    tokens[3]?.type === 'paragraph_open' &&
    tokens[4].children.some(
      (token) =>
        token.type === 'link_open' &&
        /\.\.\/(nl|en)\/project-intent\.md$/.test(token.attrGet('href'))
    )
  const introStart = hasLanguageLinks ? 6 : 3
  if (tokens[introStart]?.type !== 'paragraph_open')
    throw new Error('Missing article introduction: ' + filename)
  const intro = inlineText(tokens[introStart + 1])
  const body = tokens.slice(introStart + 3)
  const blocks = []
  let start = 0
  let promptNumber = 0
  function renderProse(end) {
    if (end > start) {
      blocks.push({
        kind: 'html',
        content: markdown.renderer.render(body.slice(start, end), markdown.options, {}),
      })
    }
  }
  const headings = []
  const usedIds = new Set()
  const workflowPhases = path === 'workflow.md'
    ? new Map(workflowSteps.map(({ phase }) => [copyFor(lang).groups[phase], phase]))
    : null
  const documentUrl = new URL('/' + lang + '/' + path.split(sep).join('/'), 'https://docs.invalid')
  for (const [index, token] of body.entries()) {
    if (token.type === 'inline') prepareLinks(token, documentUrl, headings.at(-1))
    if (token.type === 'fence' && token.level === 0 && token.info.trim() === 'prompt') {
      renderProse(index)
      promptNumber++
      const output = readPromptOutput(body, index + 1, promptNumber)
      blocks.push({
        kind: 'prompt',
        number: promptNumber,
        output,
        content: token.content.replace(/\n$/, ''),
        section: headings.at(-1)?.text || title,
      })
      start = index + (output ? 4 : 1)
    }
    if (token.type !== 'heading_open' || token.tag !== 'h2') continue
    const text = inlineText(body[index + 1])
    const base =
      text
        .normalize('NFKD')
        .replace(/\p{M}/gu, '')
        .toLowerCase()
        .replace(/[^\p{L}\p{N}]+/gu, '-')
        .replace(/^-|-$/g, '') || 'section'
    let id = base
    for (let suffix = 2; usedIds.has(id); suffix++) id = base + '-' + suffix
    usedIds.add(id)
    token.attrSet('id', id)
    const phase = workflowPhases?.get(text)
    if (phase) token.attrSet('data-phase', phase)
    headings.push({ id, text, skills: [], phase })
  }
  renderProse(body.length)
  return { title, intro, blocks, headings }
}
