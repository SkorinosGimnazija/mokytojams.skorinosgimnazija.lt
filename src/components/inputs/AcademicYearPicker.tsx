import { getAcademicYearEnd, getAcademicYearStart } from '@/utils/dateUtils.ts'
import { YearPickerInput } from '@mantine/dates'
import type { UseFormReturnType } from '@mantine/form'
import { CalendarIcon } from '@phosphor-icons/react'
import dayjs from 'dayjs'
import React from 'react'

type DateRangeFields = {
  startDate: string;
  endDate: string;
};

type DateRangeFormProps<T extends DateRangeFields> = {
  form: UseFormReturnType<T>;
};

export function AcademicYearPicker<T extends DateRangeFields>({ form }: DateRangeFormProps<T>) {
  const handleChange = (newDate: string | null) => {
    if (!newDate) {
      return
    }

    const date = dayjs(newDate).add(1, 'year')

    form.setValues({
      startDate: getAcademicYearStart(date),
      endDate: getAcademicYearEnd(date),
    } as Partial<typeof form.values>)
  }

  return (
    <YearPickerInput
      placeholder="Data"
      onChange={handleChange}
      defaultValue={getAcademicYearStart()}
      rightSection={<CalendarIcon size="1.3rem"/>}
      rightSectionPointerEvents="none"
      clearable={false}
      valueFormat="YYYY [m.m.]"
    />
  )
}