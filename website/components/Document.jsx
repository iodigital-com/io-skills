import '../assets/site.css'
import '../assets/hero.css'

export function Document({ lang, children }) {
  return (
    <html lang={lang}>
      <head>
        <link rel="stylesheet" href="/brand/io.css" />
      </head>
      <body>{children}</body>
    </html>
  )
}
