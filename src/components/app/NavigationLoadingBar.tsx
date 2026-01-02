import { useAppSelector } from '@/hooks/useAppSelector.tsx'
import { useTimeout } from '@mantine/hooks'
import { NavigationProgress, nprogress, nprogressStore } from '@mantine/nprogress'
import React, { useEffect } from 'react'

export function NavigationLoadingBar() {
  const { start: complete, clear: completeCancel } = useTimeout(() => nprogress.complete(), 150)

  const isQueryPending = useAppSelector(state => {
    return Object.values(state.api.queries)
      .some(query => query?.status === 'pending')
  })
  const isMutationPending = useAppSelector(state => {
    return Object.values(state.api.mutations)
      .some(mutation => mutation?.status === 'pending')
  })

  // const debounceComplete = useDebouncedCallback(() => {
  //   nprogress.complete()
  // }, 150)

  useEffect(() => {
    const isLoading = isQueryPending || isMutationPending
    const progressStarted = nprogressStore.getState().progress > 0

    if (isLoading) {
      if (progressStarted) {
        completeCancel()
      } else {
        nprogress.start()
      }
    } else if (progressStarted) {
      // debounceComplete()
      complete()
    }

  }, [isQueryPending, isMutationPending, completeCancel, complete])

  return <NavigationProgress size={5}/>
}