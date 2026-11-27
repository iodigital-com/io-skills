import {
  BookOpen,
  Boxes,
  Braces,
  CheckCheck,
  ClipboardList,
  FileText,
  GitBranch,
  Layers,
  MessageSquareText,
  PanelsTopLeft,
  Rocket,
  Terminal,
} from 'lucide-react'
import { readArticle } from '../content.mjs'
import { copyFor, featuredIds, library, tutorialSlugs } from '../model.mjs'
import { href } from '../paths.mjs'
import HeroFigure from './HeroFigure'
import ReviewSection from './ReviewSection'
import { SkillCard, GuideCard } from './Cards'
import { Breadcrumbs } from './Layout'
import Command, { Prompt } from './Command'
import Catalog from './Catalog'
import '../assets/skill-links.css'

const steps = [
  { icon: MessageSquareText, skill: 'interview-me' },
  { icon: FileText, skill: 'spec-driven-development' },
  { icon: PanelsTopLeft, skill: 'prototype-shell' },
  { icon: Braces, skill: 'incremental-implementation' },
  { icon: CheckCheck, skill: 'test-driven-development' },
  { icon: Rocket, skill: 'shipping-and-launch' },
]

function TutorialCards({ lang, copy }) {
  return (
    <div className="guide-grid">
      {tutorialSlugs.map((guide) => (
        <GuideCard
          key={guide}
          lang={lang}
          copy={copy}
          guide={guide}
          article={readArticle(lang, 'guides/' + guide + '.md')}
        />
      ))}
    </div>
  )
}

export function Home({ lang }) {
  const copy = copyFor(lang)
  const skills = library(lang)
  const workflow = readArticle(lang, 'workflow.md')
  return (
    <>
      <section className="shell hero">
        <div className="hero-copy">
          <p className="topic">
            <GitBranch size={16} />
            {copy.heroTopic}
          </p>
          <h1>
            {copy.heroTitle[0]}
            <br />
            <em>{copy.heroTitle[1]}</em>
          </h1>
          <p className="lede">{copy.heroIntro}</p>
          <div className="hero-command">
            <Command command="npx skills add iodigital-com/io-skills" copy={copy} />
          </div>
          <div className="actions">
            <a className="button primary" href={href(lang, 'guides/install')}>
              <Terminal />
              {copy.start}
            </a>
            <a className="button secondary" href={href(lang, 'skills')}>
              <Layers />
              {copy.browse}
            </a>
          </div>
        </div>
        <div className="hero-art">
          <HeroFigure lang={lang} />
        </div>
      </section>
      <section className="section band">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="section-label">
                <GitBranch />
                {copy.workflow}
              </p>
              <h2>{copy.workflowTitle}</h2>
            </div>
            <a className="text-link" href={href(lang, 'workflow')}>
              {copy.fullWorkflow}
            </a>
          </div>
          <p className="section-intro">{copy.workflowIntro}</p>
          <div className="loop-grid">
            {[0, 1].map((loop) => (
              <div className={'loop loop-' + loop} key={loop}>
                <div className="loop-title">
                  <span className="loop-line" />
                  {copy.loopNames[loop]}
                  <span className="loop-line" />
                </div>
                <div className="steps">
                  {steps.slice(loop * 3, loop * 3 + 3).map(({ icon: Icon, skill }, i) => {
                    const index = loop * 3 + i
                    return (
                      <div className={'step phase-method step-' + index} key={skill}>
                        <a
                          className="phase-method-link"
                          href={
                            href(lang, 'workflow') +
                            '#' +
                            workflow.headings.find((heading) => heading.text === copy.phases[index])
                              .id
                          }
                        >
                          <span className="step-icon">
                            <Icon size={22} aria-hidden="true" />
                          </span>
                          <strong>{copy.phases[index]}</strong>
                        </a>
                        <small>{copy.phaseTriggers[index]}</small>
                        <a className="phase-skill-link" href={href(lang, 'skills/' + skill)}>
                          {skill}
                        </a>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="shell section">
        <div className="section-heading">
          <div>
            <p className="section-label">
              <Boxes />
              {copy.catalog}
            </p>
            <h2>{copy.featuredTitle}</h2>
          </div>
          <a className="text-link" href={href(lang, 'skills')}>
            {copy.fullCatalog.replace('{count}', skills.length)}
          </a>
        </div>
        <div className="cards">
          {featuredIds.map((id) => (
            <SkillCard key={id} lang={lang} copy={copy} skill={skills.find((s) => s.id === id)} />
          ))}
        </div>
      </section>
      <section className="section dark-band">
        <div className="shell">
          <h2>{copy.whyTitle}</h2>
          <div className="principles">
            {copy.why.map(([title, body], i) => {
              const Icon = [GitBranch, PanelsTopLeft, ClipboardList][i]
              return (
                <div key={title}>
                  <Icon size={24} />
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      <ReviewSection lang={lang} copy={copy} />
      <section className="shell section">
        <p className="section-label">
          <BookOpen />
          {copy.tutorials}
        </p>
        <h2>{copy.guidesTitle}</h2>
        <TutorialCards lang={lang} copy={copy} />
      </section>
    </>
  )
}

export function CatalogPage({ lang }) {
  const copy = copyFor(lang)
  return (
    <div className="shell inner-page">
      <Breadcrumbs lang={lang} copy={copy} crumbs={[[copy.catalog]]} />
      <div className="page-heading">
        <p className="section-label">
          <Boxes />
          {copy.catalog}
        </p>
        <h1>{copy.catalogTitle}</h1>
        <p className="lede">{copy.catalogIntro}</p>
      </div>
      <Catalog lang={lang} copy={copy} skills={library(lang)} />
      <section className="install-block">
        <h2>{copy.installAll}</h2>
        <p>{copy.installIntro}</p>
        <Command
          command="npx skills add iodigital-com/io-skills --skill '*'"
          copy={copy}
        />
        <a className="text-link" href={href(lang, 'guides/install')}>
          {copy.installDocs}
        </a>
      </section>
    </div>
  )
}

export function Tutorials({ lang }) {
  const copy = copyFor(lang)
  return (
    <div className="shell inner-page">
      <Breadcrumbs lang={lang} copy={copy} crumbs={[[copy.tutorials]]} />
      <div className="page-heading">
        <p className="section-label">
          <BookOpen />
          {copy.tutorials}
        </p>
        <h1>{copy.guidesTitle}</h1>
        <p className="lede">{copy.guidesIntro}</p>
      </div>
      <TutorialCards lang={lang} copy={copy} />
      <div className="related-band">
        <h2>{copy.resources}</h2>
        {['guides/install', 'guides/briefing', 'workflow'].map((path) => (
          <a key={path} href={href(lang, path)}>
            {readArticle(lang, path + '.md').title}
          </a>
        ))}
      </div>
    </div>
  )
}

export function Article({ lang, route }) {
  const copy = copyFor(lang)
  const doc = readArticle(lang, route + '.md')
  const skill = route.startsWith('skills/') ? route.split('/')[1] : null
  const crumbs = []
  if (skill) crumbs.push([copy.catalog, 'skills'])
  const tutorial = tutorialSlugs.some((s) => route === 'guides/' + s)
  if (tutorial) crumbs.push([copy.tutorials, 'guides'])
  crumbs.push([doc.title])
  const links = skill
    ? ['skills', 'guides/new-project', 'guides/existing-project']
    : [
        'guides/install',
        'guides/new-project',
        'guides/existing-project',
        'guides/briefing',
        'workflow',
        'guides/contribute',
      ]
  const heading = (
    <header className="article-heading">
      {skill && (
        <p className="topic">
          <Layers size={15} />
          {skill}
        </p>
      )}
      <h1>{doc.title}</h1>
      <p className="lede">{doc.intro}</p>
    </header>
  )
  return (
    <div className="shell inner-page">
      <Breadcrumbs lang={lang} copy={copy} crumbs={crumbs} />
      <div className={tutorial ? 'reading-layout tutorial-layout' : 'reading-layout'}>
        {tutorial && (
          <>
            {heading}
            <nav className="tutorial-outline" aria-label={copy.skillsPerStep}>
              <h2>{copy.skillsPerStep}</h2>
              <ol>
                {doc.headings.map((step) => (
                  <li key={step.id}>
                    <a className="tutorial-step-link" href={'#' + step.id}>
                      {step.text}
                    </a>
                    {step.skills.length > 0 && (
                      <ul className="tutorial-step-skills">
                        {step.skills.map((id) => (
                          <li key={id}>
                            <a href={href(lang, 'skills/' + id)}>{id}</a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </>
        )}
        <article>
          {!tutorial && heading}
          <div className="prose">
            {doc.blocks.map((block, index) =>
              block.kind === 'prompt' ? (
                <Prompt key={index} block={block} copy={copy} />
              ) : (
                <div key={index} dangerouslySetInnerHTML={{ __html: block.content }} />
              )
            )}
          </div>
          {skill && (
            <section className="install-block" id="install">
              <h2>{copy.installSkill}</h2>
              <p>{copy.installIntro}</p>
              <Command
                command={'npx skills add iodigital-com/io-skills --skill ' + skill}
                copy={copy}
              />
              <a className="text-link" href={href(lang, 'guides/install')}>
                {copy.installDocs}
              </a>
            </section>
          )}
        </article>
        <aside className="side">
          {!tutorial && (
            <nav aria-label={copy.contents}>
              <h2>{copy.contents}</h2>
              <ul>
                {doc.headings.map((h) => (
                  <li key={h.id}>
                    <a href={'#' + h.id}>{h.text}</a>
                  </li>
                ))}
                {skill && (
                  <li>
                    <a href="#install">{copy.installSkill}</a>
                  </li>
                )}
              </ul>
            </nav>
          )}
          <nav aria-label={copy.related}>
            <h2>{copy.related}</h2>
            <ul>
              {links
                .filter((path) => path !== route)
                .map((path) => (
                  <li key={path}>
                    <a href={href(lang, path)}>
                      {path === 'skills' ? copy.catalog : readArticle(lang, path + '.md').title}
                    </a>
                  </li>
                ))}
            </ul>
          </nav>
        </aside>
      </div>
    </div>
  )
}
