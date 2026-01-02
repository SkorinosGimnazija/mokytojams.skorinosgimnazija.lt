import { Text } from '@mantine/core'
import React, { useEffect } from 'react'
import { useRouteError } from 'react-router'

export function ErrorPage() {
  const error = useRouteError() as Error

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <>
      <Text size="lg">Įvyko klaida!</Text>
      <Text>{error.message}</Text>
    </>
  )
}
