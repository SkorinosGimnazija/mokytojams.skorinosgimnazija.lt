import { Markdown } from '@/components/markdown/Markdown'
import { PageLayout } from '@/layout/PageLayout.tsx'
import { useGetPostByUrlPublicQuery } from '@/services/generatedApi.ts'

const UTA_POST = { languageId: 'lt', menuUrl: 'uta-bankas-mokytojams' }

export function ViewUtaPage() {
  const query = useGetPostByUrlPublicQuery(UTA_POST)

  return (
    <PageLayout>
      <Markdown children={query.data?.text ?? ''}/>
    </PageLayout>
  )
}