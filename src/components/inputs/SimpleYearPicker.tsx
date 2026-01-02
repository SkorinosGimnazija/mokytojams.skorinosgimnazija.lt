import { getYearEnd, getYearStart } from '@/utils/dateUtils.ts'
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

export function SimpleYearPicker<T extends DateRangeFields>({ form }: DateRangeFormProps<T>) {
  const handleChange = (newDate: string | null) => {
    if (!newDate) {
      return
    }

    const date = dayjs(newDate)

    form.setValues({
      startDate: getYearStart(date),
      endDate: getYearEnd(date),
    } as Partial<typeof form.values>)
  }

  return (
    <YearPickerInput
      placeholder="Data"
      onChange={handleChange}
      defaultValue={getYearStart()}
      rightSection={<CalendarIcon size="1.3rem"/>}
      rightSectionPointerEvents="none"
      valueFormat="YYYY [m.]"
      clearable={false}
    />
  )
}