import nl from '../docs/nl/index.json' with { type: 'json' }
import en from '../docs/en/index.json' with { type: 'json' }
import { readArticle, skillIds } from './content.mjs'

export const languages = ['nl', 'en']
export const copyFor = (lang) => ({ nl, en })[lang]
export const tutorialSlugs = ['new-project', 'existing-project']
export const guideSlugs = ['install', ...tutorialSlugs, 'briefing', 'contribute']
export const featuredIds = [
  'spec-driven-development',
  'design-spec',
  'functional-analysis',
  'incremental-implementation',
  'test-driven-development',
  'code-review-and-quality',
]

const phases = {
  define: [
    'interview-me',
    'idea-refine',
    'spec-driven-development',
    'constraint-driven-development',
    'planning-and-task-breakdown',
  ],
  design: ['design-spec', 'prototype-shell', 'functional-analysis', 'api-and-interface-design'],
  build: [
    'incremental-implementation',
    'frontend-ui-engineering',
    'source-driven-development',
    'git-workflow-and-versioning',
  ],
  verify: [
    'test-driven-development',
    'browser-testing-with-devtools',
    'debugging-and-error-recovery',
  ],
  review: [
    'code-review-and-quality',
    'accessibility-engineering',
    'security-and-hardening',
    'performance-optimization',
    'code-simplification',
    'doubt-driven-development',
  ],
  ship: [
    'shipping-and-launch',
    'ci-cd-and-automation',
    'deprecation-and-migration',
    'observability-and-instrumentation',
  ],
  general: ['using-agent-skills', 'context-engineering', 'documentation-and-adrs'],
}
const skillGroups = new Map(
  Object.entries(phases).flatMap(([group, ids]) => ids.map((id) => [id, group]))
)

export function library(lang) {
  return skillIds().map((id) => {
    const { title, intro, blocks } = readArticle(lang, 'skills/' + id + '.md')
    return {
      id,
      title,
      intro,
      group: skillGroups.get(id) || 'general',
      keywords: blocks
        .map((block) => block.content)
        .join(' ')
        .replace(/<[^>]+>/g, ' '),
    }
  })
}

export function routes() {
  return [
    '',
    'skills',
    'guides',
    'workflow',
    'project-intent',
    ...guideSlugs.map((id) => 'guides/' + id),
    ...skillIds().map((id) => 'skills/' + id),
  ]
}

export function routeTitle(lang, route) {
  const copy = copyFor(lang)
  if (!route) return copy.heroTitle.join(' ')
  if (route === 'skills') return copy.catalog
  if (route === 'guides') return copy.tutorials
  return readArticle(lang, route + '.md').title
}
