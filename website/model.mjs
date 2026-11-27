import { copyFor, readArticle, skillIds } from './content.mjs'
import { phaseForSkill } from './phases.mjs'

export { copyFor }
export const languages = ['nl', 'en']
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

export function library(lang) {
  return skillIds().map((id) => {
    const { title, intro, blocks } = readArticle(lang, 'skills/' + id + '.md')
    return {
      id,
      title,
      intro,
      group: phaseForSkill(id),
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
