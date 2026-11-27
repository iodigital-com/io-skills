import { Home } from '../../website/components/Pages'
import { Frame } from '../../website/components/Layout'
import { copyFor } from '../../website/model.mjs'
const copy = copyFor('nl')
export const metadata = {
  title: 'iO Skills · ' + copy.heroTitle.join(' '),
  description: copy.heroIntro,
}
export default function Page() {
  return (
    <Frame lang="nl" route="">
      <Home lang="nl" />
    </Frame>
  )
}
