import { ActionIcon } from '@mantine/core'
import { TrashIcon } from '@phosphor-icons/react'
import React from 'react'

interface Props {
  onClick: () => void
}

export function QuickDeleteButton({ onClick }: Props) {
  return (
    <ActionIcon
      onClick={onClick}
      variant="subtle"
      size="2.25rem"
      title="Ištrinti"
    >
      <TrashIcon size="1.5rem" color="red"/>
    </ActionIcon>
  )
}