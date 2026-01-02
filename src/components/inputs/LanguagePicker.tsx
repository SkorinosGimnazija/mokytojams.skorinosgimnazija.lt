import { useListLanguagesQuery } from '@/services/generatedApi.ts'
import { Select } from '@mantine/core'
import type { UseFormReturnType } from '@mantine/form'
import React from 'react'

type LanguagePickerProps<TValues extends Record<string, unknown>> = {
  form: UseFormReturnType<TValues>;
  label?: string;
  placeholder?: string;
  withAsterisk?: boolean;
  clearable?: boolean;
};

export function LanguagePicker<TValues extends Record<string, unknown>>({
  form,
  label,
  placeholder,
  withAsterisk,
  clearable,
}: LanguagePickerProps<TValues>) {
  const languagesQuery = useListLanguagesQuery(undefined, {
    selectFromResult: ({ data }) => ({
      data: data?.map(x => ({
        value: x.id,
        label: x.name
      })) ?? []
    })
  })

  return (
    <Select
      key={form.key('languageId')}
      {...form.getInputProps('languageId')}
      data={languagesQuery.data}
      label={label}
      w={'13rem'}
      placeholder={placeholder}
      withAsterisk={withAsterisk}
      clearable={clearable}
    />
  )
}