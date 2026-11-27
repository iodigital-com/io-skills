import { BookOpen, Layers } from 'lucide-react'
import { href } from '../paths.mjs'
import { PhaseLabel } from './Phase'

export function SkillCard({ lang, copy, skill }) {
  return (
    <a className="skill-card" data-phase={skill.group} href={href(lang, 'skills/' + skill.id)}>
      <PhaseLabel phase={skill.group} copy={copy} />
      <h3>{skill.title}</h3>
      <p>{skill.intro}</p>
      <code>{skill.id}</code>
    </a>
  )
}

export function GuideCard({ lang, copy, guide, article }) {
  const Icon = guide === 'new-project' ? BookOpen : Layers
  return (
    <a className="guide-card" href={href(lang, 'guides/' + guide)}>
      <Icon className="guide-icon" size={25} />
      <h3>{article.title}</h3>
      <p>{article.intro}</p>
      <span>{copy.tutorialAction}</span>
    </a>
  )
}
