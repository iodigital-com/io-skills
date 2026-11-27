import { cpSync, rmSync } from 'node:fs'

for (const lang of ['nl', 'en']) {
  cpSync(
    new URL('../../docs/' + lang + '/prototypes/bike-shop/', import.meta.url),
    new URL('../../public/prototypes/bike-shop/docs/' + lang + '/', import.meta.url),
    { recursive: true }
  )
}

for (const file of ['spec.md', 'design.md']) {
  cpSync(
    new URL('../../spec/examples/bike-shop/' + file, import.meta.url),
    new URL('../../public/prototypes/bike-shop/docs/en/' + file, import.meta.url)
  )
  // Earlier previews published translated specs into the generated assets.
  rmSync(new URL('../../public/prototypes/bike-shop/docs/nl/' + file, import.meta.url), { force: true })
}
