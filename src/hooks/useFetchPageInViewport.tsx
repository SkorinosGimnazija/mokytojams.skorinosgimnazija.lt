import { useInViewport } from '@mantine/hooks'
import { useEffect } from 'react'

interface Props {
  isFetching: boolean
  fetchNextPage: VoidFunction
}

export function useFetchPageInViewport(query: Props) {
  const { ref, inViewport } = useInViewport()

  useEffect(() => {
    if (inViewport && !query.isFetching) {
      query.fetchNextPage()
    }

    // todo check if query is needed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inViewport])

  return ref
}