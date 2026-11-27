export function href(lang, route = '') {
  return '/' + lang + '/' + (route ? route + '/' : '')
}
