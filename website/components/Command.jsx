'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Check, Copy, MessageSquareText } from 'lucide-react'

function CopyButton({ target, copy, visibleLabel, context }) {
  const [status, setStatus] = useState('')

  useEffect(() => {
    if (status !== 'copied') return
    const timeout = setTimeout(() => setStatus(''), 2400)
    return () => clearTimeout(timeout)
  }, [status])

  async function copyText() {
    const source = target.current
    if (!source) return
    try {
      await navigator.clipboard.writeText(source.textContent)
      setStatus('copied')
    } catch {
      const selection = window.getSelection()
      if (selection) {
        const range = document.createRange()
        range.selectNodeContents(source)
        selection.removeAllRanges()
        selection.addRange(range)
      }
      setStatus('manual')
    }
  }

  const label = visibleLabel || copy.copy
  return (
    <>
      <button
        type="button"
        className="copy-button"
        onClick={copyText}
        title={label}
        aria-label={context ? label + ' · ' + context : label}
      >
        {status === 'copied' ? (
          <Check size={17} aria-hidden="true" />
        ) : (
          <Copy size={17} aria-hidden="true" />
        )}
        {visibleLabel && <span>{status === 'copied' ? copy.copied : label}</span>}
      </button>
      <span className={status === 'manual' ? 'copy-feedback' : 'sr-only'} role="status">
        {status === 'manual' && copy.copyFailed}
        {status === 'copied' && copy.copied}
      </span>
    </>
  )
}

export default function Command({ command, copy }) {
  const target = useRef(null)
  return (
    <div className="command" role="group" aria-label={copy.commandLabel}>
      <span className="command-prompt" aria-hidden="true">
        $
      </span>
      <code ref={target}>{command}</code>
      <CopyButton target={target} copy={copy} />
    </div>
  )
}

export function Prompt({ block, copy }) {
  const target = useRef(null)
  return (
    <figure className="tutorial-prompt" id={'prompt-' + block.number}>
      <figcaption>
        <span className="prompt-title">
          <MessageSquareText aria-hidden="true" size={17} />
          {copy.promptLabel}
        </span>
        <CopyButton target={target} copy={copy} visibleLabel={copy.copyPrompt} context={block.section} />
      </figcaption>
      <p ref={target} className="prompt-body">
        {block.content}
      </p>
      {block.output && (
        <a className="prompt-result" href={block.output.href}>
          <ArrowUpRight size={16} aria-hidden="true" />
          {block.output.label}
        </a>
      )}
    </figure>
  )
}
