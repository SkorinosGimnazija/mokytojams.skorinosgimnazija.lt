import { SubmitButton } from '@/components/buttons/SubmitButton.tsx'
import { useParamId } from '@/hooks/useParamId.tsx'
import { DrawerLayout } from '@/layout/DrawerLayout.tsx'
import {
  useGetAppointmentTypeQuery,
  useListAppointmentTypeDatesQuery,
  useListAppointmentTypesQuery,
  useUpdateAppointmentDatesMutation
} from '@/services/generatedApi.ts'
import { formatDateTime, ISO } from '@/utils/dateUtils.ts'
import { itemSavedNotification, validationErrorNotification } from '@/utils/notifications.ts'
import { Button, Group, Pill, Stack } from '@mantine/core'
import { DatePickerInput, TimePicker } from '@mantine/dates'
import { useForm } from '@mantine/form'
import dayjs from 'dayjs'
import React, { useEffect, useEffectEvent } from 'react'

export function UpdateAppointmentTime() {
  const { id: typeId } = useParamId()
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      startTime: '',
      endTime: '',
      datesToGenerate: [] as string[],
      generatedDates: [] as string[],
    },
    transformValues: (values) => (
      values.generatedDates.map(date => ({ typeId, date }))
    )
  })

  const typeQuery = useGetAppointmentTypeQuery(typeId)
  const datesQuery = useListAppointmentTypeDatesQuery(typeId)
  const appointmentTypeNameQuery = useListAppointmentTypesQuery(false, {
    selectFromResult: ({ data }) => ({
      data: data?.find(x => x.id === Number(typeId))?.name ?? ''
    })
  })

  const [patchRecord] = useUpdateAppointmentDatesMutation()

  const setForm = useEffectEvent((data: NonNullable<typeof datesQuery.data>) => {
    form.setFieldValue('generatedDates', data.map(x => ISO(x.date)))
  })

  useEffect(() => {
    if (datesQuery.data) {
      setForm(datesQuery.data)
    }
  }, [datesQuery.data])

  const generateDates = () => {
    const duration = typeQuery.data?.durationInMinutes ?? 0
    const { startTime, endTime, datesToGenerate } = form.getValues()

    if (duration <= 0 || !startTime || !endTime || !datesToGenerate.length) {
      validationErrorNotification()
      return
    }

    const generatedDates: string[] = []

    for (const date of datesToGenerate) {
      const lastDatetime = dayjs(`${date} ${endTime}`).subtract(duration, 'minute')
      let currentDatetime = dayjs(`${date} ${startTime}`)

      while (currentDatetime <= lastDatetime) {
        generatedDates.push(currentDatetime.toISOString())
        currentDatetime = currentDatetime.add(duration, 'minute')
      }
    }

    form.setFieldValue('generatedDates', (prev) => {
      return Array.from(
        new Set([
          ...prev,
          ...generatedDates,
        ])
      )
    })
  }

  const deleteDate = (date: string) => {
    form.setFieldValue('generatedDates', (prev) => prev.filter((x) => x !== date))
  }

  const groupedDates = () => {
    const groupByDay = Object.groupBy(
      form.getValues().generatedDates.map(x => dayjs(x)).sort((a, b) => a.diff(b)),
      (date) => date.format('YYYY-MM-DD')) as Record<string, dayjs.Dayjs[]>

    return Object.values(groupByDay)
      .map((group) => {
        return group.map((date) => ({
          dateDisplay: formatDateTime(date),
          dateISO: date.toISOString(),
        }))
      })
  }

  return (
    <DrawerLayout title={`Laikas "${appointmentTypeNameQuery.data}"`} closeNavLink="../../">
      <form autoComplete="off" onSubmit={form.onSubmit(async (data) => {
        const response = await patchRecord(data)
        if ('data' in response) {
          itemSavedNotification()
        }
      })}>
        <Stack>
          <Group>
            <TimePicker
              key={form.key('startTime')}
              {...form.getInputProps('startTime')}
              label="Nuo"
              withDropdown
            />
            <TimePicker
              key={form.key('endTime')}
              {...form.getInputProps('endTime')}
              label="Iki"
              withDropdown
            />
            <DatePickerInput
              key={form.key('datesToGenerate')}
              {...form.getInputProps('datesToGenerate')}
              label="Datos"
              type="multiple"
              valueFormat="YYYY-MM-DD"
              clearable
              flex="1"
            />
          </Group>

          <Group>
            <Button mt="md" onClick={() => generateDates()}>Generuoti</Button>
            <SubmitButton disabled={form.submitting}/>
          </Group>

        </Stack>

        <Group mt="xl" gap="xl" align="start">
          {groupedDates().map((group, index) => {
            return (
              <Stack key={index}>
                {group.map((item) => {
                  return (
                    <Pill
                      key={item.dateDisplay}
                      size="lg"
                      withRemoveButton
                      onRemove={() => deleteDate(item.dateISO)}
                    >
                      {item.dateDisplay}
                    </Pill>
                  )
                })}
              </Stack>)
          })}
        </Group>

      </form>
    </DrawerLayout>
  )
}