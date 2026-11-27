'use client'

import { useRef, useState } from 'react'
import { Search } from 'lucide-react'
import { SkillCard } from './Cards'

function searchable(text) {
  return text
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
}

export default function Catalog({ lang, copy, skills }) {
  const [query, setQuery] = useState('')
  const [group, setGroup] = useState('all')
  const input = useRef(null)
  const words = searchable(query).split(' ').filter(Boolean)
  const visible = skills.filter((skill) => {
    if (group !== 'all' && skill.group !== group) return false
    const text = searchable(
      [skill.id, skill.title, skill.intro, skill.keywords, copy.groups[skill.group]].join(' ')
    )
    return words.every((word) => text.includes(word))
  })
  const groups = [['all', copy.all], ...Object.entries(copy.groups)]

  function reset() {
    setGroup('all')
    setQuery('')
    input.current.focus()
  }

  return (
    <>
      <div className="catalog-controls">
        <label className="search-field">
          <span className="sr-only">{copy.search}</span>
          <Search size={19} aria-hidden="true" />
          <input
            type="search"
            value={query}
            ref={input}
            placeholder={copy.placeholder}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <div className="filters" role="group" aria-label={copy.filter}>
          {groups.map(([id, label]) => (
            <button
              type="button"
              key={id}
              className="filter"
              aria-pressed={group === id}
              onClick={() => setGroup(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <p className="results" role="status">
        {visible.length} {visible.length === 1 ? copy.result : copy.results}
      </p>
      {visible.length > 0 ? (
        <section>
          <h2 className="sr-only">{copy.skills}</h2>
          <div className="cards">
            {visible.map((skill) => (
              <SkillCard key={skill.id} lang={lang} copy={copy} skill={skill} />
            ))}
          </div>
        </section>
      ) : (
        <div className="empty">
          <h2>{copy.empty}</h2>
          <p>{copy.emptyHelp}</p>
          <button type="button" onClick={reset}>
            {copy.clear}
          </button>
        </div>
      )}
    </>
  )
}
