import { Button, type ButtonProps } from '@mantine/core'
import React from 'react'

interface Props {
  disabled: boolean;
  title?: string;
  w?: ButtonProps['w'];
}

export function SubmitButton({ disabled, title, w }: Props) {
  return (
    <Button
      type="submit"
      mt="md"
      w={w ?? '10rem'}
      disabled={disabled}
    >
      {title ?? 'Išsaugoti'}
    </Button>
  )
}