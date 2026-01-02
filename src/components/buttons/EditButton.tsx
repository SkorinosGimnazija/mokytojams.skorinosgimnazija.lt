import { ActionIcon } from '@mantine/core'
import { PencilSimpleIcon } from '@phosphor-icons/react'
import React from 'react'
import { Link } from 'react-router'

interface Props {
  to: string | number
}

export function EditButton({ to }: Props) {
  return (
    <ActionIcon
      component={Link}
      to={{ pathname: String(to) }}
      viewTransition
      preventScrollReset={true}
      title="Redaguoti"
      variant="subtle"
      size="2.25rem"
    >
      <PencilSimpleIcon size="1.5rem"/>
    </ActionIcon>
  )
}