import { Tooltip } from '@mantine/core'
import { WarningCircleIcon } from '@phosphor-icons/react'
import React from 'react'

interface Props {
  tooltip?: string | null
}

export function NoteIcon({ tooltip }: Props) {
  if (!tooltip) {
    return null
  }

  return (
    <Tooltip label={tooltip} multiline maw="400px" color="gray" position="bottom">
      <WarningCircleIcon color="orange" size="1.5rem"/>
    </Tooltip>
  )
}