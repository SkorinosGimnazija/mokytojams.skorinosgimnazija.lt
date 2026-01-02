import { Button } from '@mantine/core'
import React from 'react'
import { Link } from 'react-router'

interface Props {
  title?: string
}

export function NewRecordButton({ title }: Props) {
  return <Button component={Link} to="new" viewTransition>{title ?? 'Naujas įrašas'}</Button>
}