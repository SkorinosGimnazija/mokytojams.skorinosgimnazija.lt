import { searchMessage } from '@/utils/constants.ts'
import type { ComboboxStringData } from '@mantine/core'
import { Autocomplete } from '@mantine/core'
import React from 'react'

interface Props {
  onChange: (value: string) => void
  autocompleteData?: ComboboxStringData
}

export function SearchInput({ autocompleteData, onChange }: Props) {
  return (
    <Autocomplete
      placeholder={searchMessage}
      data={autocompleteData}
      onChange={onChange}
      maxLength={64}
      w={'13rem'}
      clearable
    />
  )
}