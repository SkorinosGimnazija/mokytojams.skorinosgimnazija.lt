import { currentDate, getMonthEnd, getMonthStart } from '@/utils/dateUtils.ts'
import { MonthPickerInput } from '@mantine/dates'
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

export function SimpleMonthPicker<T extends DateRangeFields>({ form }: DateRangeFormProps<T>) {
  const handleChange = (newDate: string | null) => {
    if (!newDate) {
      return
    }

    const date = dayjs(newDate)

    form.setValues({
      startDate: getMonthStart(date),
      endDate: getMonthEnd(date),
    } as Partial<typeof form.values>)
  }

  return (
    <MonthPickerInput
      placeholder="Data"
      onChange={handleChange}
      defaultValue={currentDate()}
      rightSection={<CalendarIcon size="1.3rem"/>}
      rightSectionPointerEvents="none"
      valueFormat="MMMM"
      clearable={false}
    />
  )
}