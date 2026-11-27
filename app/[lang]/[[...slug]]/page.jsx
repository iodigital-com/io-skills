import { notFound } from 'next/navigation'
import { routes, copyFor, routeTitle } from '../../../website/model.mjs'
import { readArticle } from '../../../website/content.mjs'
import { Frame } from '../../../website/components/Layout'
import { Home, Tutorials, CatalogPage, Article } from '../../../website/components/Pages'

export const dynamicParams = false
export function generateStaticParams() {
  return routes().map((route) => ({ slug: route ? route.split('/') : [] }))
}
export async function generateMetadata({ params }) {
  const { lang, slug = [] } = await params
  const route = slug.join('/')
  if (!copyFor(lang) || !routes().includes(route)) return {}
  const copy = copyFor(lang)
  const description = !route
    ? copy.heroIntro
    : route === 'skills'
      ? copy.catalogIntro
      : route === 'guides'
        ? copy.guidesIntro
        : readArticle(lang, route + '.md').intro
  return { title: routeTitle(lang, route) + ' · iO Skills', description }
}
export default async function Page({ params }) {
  const { lang, slug = [] } = await params
  const route = slug.join('/')
  if (!copyFor(lang) || !routes().includes(route)) notFound()
  return (
    <Frame lang={lang} route={route}>
      {route === '' ? (
        <Home lang={lang} />
      ) : route === 'skills' ? (
        <CatalogPage lang={lang} />
      ) : route === 'guides' ? (
        <Tutorials lang={lang} />
      ) : (
        <Article lang={lang} route={route} />
      )}
    </Frame>
  )
}
