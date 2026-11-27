import english from '../../docs/en/figure.json'
import dutch from '../../docs/nl/figure.json'

export default function HeroFigure({ lang }) {
  const copy = lang === 'nl' ? dutch : english
  return (
    <figure className="hero-figure" role="img" aria-label={copy.description}>
      <div className="hf-canvas" aria-hidden="true">
        <div className="hf-spec">
          <div className="hf-titlebar">
            <span className="hf-file-icon" />
            <span>{copy.file}</span>
            <span className="hf-window-dots" />
          </div>
          <div className="hf-code">
            <span className="hf-line">
              <i>1</i>
              <span>
                <b>##</b> {copy.scenario}
              </span>
            </span>
            <span className="hf-line">
              <i>2</i>
              <span>
                <em>{copy.actorLabel}</em>: {copy.actor}
              </span>
            </span>
            <span className="hf-line">
              <i>3</i>
              <span>
                <em>{copy.ruleLabel}</em>: {copy.rule}
              </span>
            </span>
          </div>
        </div>
        <span className="hf-trace" />
        <div className="hf-preview">
          <div className="hf-previewbar">
            <span className="hf-layout-icon" />
            {copy.preview}
          </div>
          <div className="hf-preview-body">
            <div className="hf-request-row">
              <span className="hf-request">{copy.title}</span>
              <span className="hf-status">{copy.status}</span>
            </div>
            <div className="hf-reason">
              <strong>{copy.detailLabel}</strong>
              <span>{copy.message}</span>
            </div>
          </div>
        </div>
      </div>
    </figure>
  )
}
