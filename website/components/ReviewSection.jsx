import { Accessibility, CodeXml, Gauge, ScanEye, ShieldCheck } from 'lucide-react'
import english from '../../docs/en/reviews.json'
import dutch from '../../docs/nl/reviews.json'
import { href } from '../paths.mjs'
import { phaseForSkill } from '../phases.mjs'
import '../assets/reviews.css'

const icons = {
  'code-review-and-quality': CodeXml,
  'accessibility-engineering': Accessibility,
  'security-and-hardening': ShieldCheck,
  'performance-optimization': Gauge,
}

export default function ReviewSection({ lang }) {
  const section = lang === 'nl' ? dutch : english
  return (
    <section className="section review-section" aria-labelledby="review-title">
      <div className="shell review-layout">
        <div className="review-intro">
          <p className="section-label">
            <ScanEye aria-hidden="true" />
            {section.label}
          </p>
          <h2 id="review-title">{section.title}</h2>
          <p className="section-intro">{section.intro}</p>
        </div>
        <ul className="review-list">
          {Object.entries(section.questions).map(([id, item]) => {
            const Icon = icons[id]
            return (
              <li key={id}>
                <a className="review-link" data-phase={phaseForSkill(id)} href={href(lang, 'skills/' + id)}>
                  <Icon className="review-icon" size={20} aria-hidden="true" />
                  <div>
                    <strong>{item.label}</strong>
                    <p>{item.question}</p>
                  </div>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
