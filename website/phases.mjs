// Workflow order. The first skill in each step is the entry point shown on the homepage.
const skillsByStep = {
  brief: ['interview-me', 'idea-refine'],
  specify: ['spec-driven-development', 'constraint-driven-development', 'api-and-interface-design'],
  prototype: ['prototype-shell', 'design-spec', 'functional-analysis'],
  build: [
    'incremental-implementation',
    'planning-and-task-breakdown',
    'frontend-ui-engineering',
    'source-driven-development',
    'git-workflow-and-versioning',
    'code-simplification',
  ],
  test: [
    'test-driven-development',
    'browser-testing-with-devtools',
    'debugging-and-error-recovery',
    'accessibility-engineering',
    'security-and-hardening',
    'performance-optimization',
  ],
  ship: [
    'shipping-and-launch',
    'code-review-and-quality',
    'ci-cd-and-automation',
    'deprecation-and-migration',
    'observability-and-instrumentation',
  ],
}

export const workflowSteps = Object.entries(skillsByStep).map(([phase, [skill]]) => ({ phase, skill }))

const skillPhases = new Map(
  Object.entries(skillsByStep).flatMap(([phase, skills]) => skills.map((id) => [id, phase]))
)

export function phaseForSkill(id) {
  return skillPhases.get(id) ?? 'general'
}
