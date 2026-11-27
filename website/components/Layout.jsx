import { Terminal, PanelTop, BookOpen, Layers } from 'lucide-react'
import { href } from '../paths.mjs'
import { copyFor } from '../model.mjs'

export function Brand({ lang }) {
  return (
    <a className="brand" href={href(lang)} aria-label="iO Skills">
      <img className="io-mark" src="/brand/io-logo.svg" alt="" width="48" height="34" />
      <span className="brand-divider" aria-hidden="true" />
      <span>Skills</span>
    </a>
  )
}

export function Frame({ lang, route, children }) {
  const copy = copyFor(lang)
  const navLinks = [
    ['skills', copy.skills],
    ['workflow', copy.workflow],
    ['guides', copy.tutorials],
    ['guides/contribute', copy.contribute],
  ]
  return (
    <>
      <a className="skip-link" href="#content">
        {copy.skip}
      </a>
      <header className="site-header">
        <div className="shell header-inner">
          <Brand lang={lang} />
          <nav className="main-nav" aria-label={copy.navigation}>
            {navLinks.map(([path, label]) => (
              <a
                key={path}
                href={href(lang, path)}
                aria-current={path === route ? 'page' : undefined}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <div className="languages" aria-label={copy.language} role="group">
              {['nl', 'en'].map((code) => (
                <a
                  key={code}
                  hrefLang={code}
                  lang={code}
                  href={href(code, route)}
                  aria-label={code === 'nl' ? 'Nederlands' : 'English'}
                  aria-current={code === lang ? 'true' : undefined}
                >
                  {code.toUpperCase()}
                </a>
              ))}
            </div>
            <a className="start-link" href={href(lang, 'guides/install')}>
              <Terminal size={16} />
              {copy.start}
            </a>
          </div>
        </div>
      </header>
      <main id="content" tabIndex="-1">
        {children}
      </main>
      <footer className="site-footer">
        <div className="shell footer-inner">
          <Brand lang={lang} />
          <nav aria-label={copy.resources}>
            <a href={href(lang, 'skills')}>
              <Layers />
              {copy.catalog}
            </a>
            <a href={href(lang, 'guides')}>
              <BookOpen />
              {copy.tutorials}
            </a>
            <a href={href(lang, 'project-intent')}>
              <PanelTop />
              {copy.projectIntent}
            </a>
          </nav>
        </div>
      </footer>
    </>
  )
}

export function Breadcrumbs({ lang, copy, crumbs }) {
  return (
    <nav className="breadcrumbs" aria-label={copy.breadcrumb}>
      <ol>
        <li>
          <a href={href(lang)}>{copy.home}</a>
        </li>
        {crumbs.map(([name, route], index) => (
          <li key={index}>
            {route ? (
              <a href={href(lang, route)}>{name}</a>
            ) : (
              <span aria-current="page">{name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
