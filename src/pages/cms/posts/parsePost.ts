import { htmlParser } from '@/utils/htmlParser.ts'
import slug from 'slug'
import TurndownService from 'turndown'

const turndownService = new TurndownService()
turndownService.addRule('unwrapPInLi', {
  filter: (node) => {
    return node.nodeName === 'P' && node.parentNode?.nodeName === 'LI'
  },
  replacement: (content) => {
    return content
  }
})

export function parsePost({ html }: { html: string }) {
  const doc = htmlParser.parse(html)
  const body = doc.body

  for (const element of body.querySelectorAll('p')) {
    if (!element.textContent.trim()) {
      element.remove()
    }
  }

  const title = body.querySelector('p[align="center"]')
  const intro = body.querySelector('p[align="center"]+p')
  title?.remove()

  return {
    title: turndownService.turndown(title?.textContent ?? ''),
    slug: slug(title?.textContent ?? ''),
    introText: turndownService.turndown(intro?.innerHTML ?? ''),
    text: turndownService.turndown(body.innerHTML),
    meta: turndownService.turndown(intro?.textContent ?? '')
  }
}