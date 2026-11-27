import { Braces, CheckCheck, Compass, FileText, MessageSquareText, PanelsTopLeft, Rocket } from 'lucide-react'

const icons = {
  brief: MessageSquareText,
  specify: FileText,
  prototype: PanelsTopLeft,
  build: Braces,
  test: CheckCheck,
  ship: Rocket,
  general: Compass,
}

export function PhaseIcon({ phase, size = 16 }) {
  const Icon = icons[phase]
  return <Icon size={size} aria-hidden="true" />
}

export function PhaseLabel({ phase, copy }) {
  return (
    <span className="phase-label" data-phase={phase}>
      <PhaseIcon phase={phase} />
      {copy.groups[phase]}
    </span>
  )
}
