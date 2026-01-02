import type { BreadcrumbHandle } from '@/routes.ts'
import { Anchor, Breadcrumbs as MantineBreadcrumbs, Text } from '@mantine/core'
import React from 'react'
import type { UIMatch } from 'react-router'
import { Link, useMatches } from 'react-router'

export function Breadcrumbs() {
  const matches = useMatches() as UIMatch<unknown, BreadcrumbHandle>[]

  return (
    <MantineBreadcrumbs visibleFrom="md">
      {matches.map((match, index) => {
        const breadcrumb = match.handle?.breadcrumb
        if (!breadcrumb) return null

        if (breadcrumb.noLink) {
          return <Text key={index} component="span">
            {breadcrumb.title}
          </Text>
        } else {
          return <Anchor key={index} to={match.pathname} component={Link}>
            {breadcrumb.title}
          </Anchor>
        }
      })}
    </MantineBreadcrumbs>
  )
}