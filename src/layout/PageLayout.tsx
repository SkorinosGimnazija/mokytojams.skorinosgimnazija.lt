import { Box, Group } from '@mantine/core'
import React from 'react'

interface Props {
  topBar?: React.ReactNode
  children: React.ReactNode
}

export function PageLayout({ children, topBar }: Props) {
  return (
    <Box pr="md">
      {topBar && <Group my="md">{topBar}</Group>}
      {children}
    </Box>
  )
}