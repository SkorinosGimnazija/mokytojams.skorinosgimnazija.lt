import { CheckCircleIcon, CircleIcon, XCircleIcon } from '@phosphor-icons/react'
import React from 'react'

interface Props {
  active?: boolean | null
  tripleState?: boolean
}

export function CheckMarkIcon({ active, tripleState }: Props) {
  if (active) {
    return <CheckCircleIcon color="green" size="1.5rem"/>
  }

  if (tripleState && active === false) {
    return <XCircleIcon color="red" size="1.5rem"/>
  }

  return <CircleIcon size="1.5rem"/>
}