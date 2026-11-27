import { Document } from '../website/components/Document'
import { copyFor } from '../website/model.mjs'
import { href } from '../website/paths.mjs'

export const metadata = { title: '404 · iO Skills' }
export default function NotFound() {
  return (
    <Document lang="nl">
      <main className="shell inner-page">
        <h1 className="error-title">404</h1>
        {['nl', 'en'].map((lang) => (
          <section key={lang} lang={lang} className="related-band">
            <h2>{copyFor(lang).missing}</h2>
            <a href={href(lang)}>{copyFor(lang).notfound}</a>
          </section>
        ))}
      </main>
    </Document>
  )
}
