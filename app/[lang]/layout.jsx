import { Document } from '../../website/components/Document'
import { languages } from '../../website/model.mjs'
import { validateTranslations } from '../../website/content.mjs'

export const dynamicParams = false
export function generateStaticParams() {
  validateTranslations()
  return languages.map((lang) => ({ lang }))
}
export default async function Layout({ children, params }) {
  const { lang } = await params
  return <Document lang={lang}>{children}</Document>
}
