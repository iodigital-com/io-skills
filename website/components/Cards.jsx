import {
  BookOpen,
  Braces,
  ClipboardCheck,
  Compass,
  FileText,
  FlaskConical,
  Layers,
  PanelsTopLeft,
  Rocket,
  ScanEye,
} from 'lucide-react'
import { href } from '../paths.mjs'

const groupIcons = {
  define: FileText,
  design: PanelsTopLeft,
  build: Braces,
  verify: FlaskConical,
  review: ScanEye,
  ship: Rocket,
  general: Compass,
}
export function SkillCard({ lang, copy, skill }) {
  const Icon = groupIcons[skill.group] || ClipboardCheck
  return (
    <a className="skill-card" href={href(lang, 'skills/' + skill.id)}>
      <span className={'phase-label phase-' + skill.group}>
        <Icon size={16} />
        {copy.groups[skill.group]}
      </span>
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
