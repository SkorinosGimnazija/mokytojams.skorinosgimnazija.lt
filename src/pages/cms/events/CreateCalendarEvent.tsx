import { SubmitButton } from '@/components/buttons/SubmitButton.tsx'
import { useRequestHandler } from '@/hooks/useRequestHandler.tsx'
import { DrawerLayout } from '@/layout/DrawerLayout.tsx'
import { parseEvent } from '@/pages/cms/events/parseEvent.ts'
import { useCreateCalendarEventMutation } from '@/services/generatedApi.ts'
import { formatDate, formatDateTime, ISO } from '@/utils/dateUtils.ts'
import { errorNotification, validationErrorNotification } from '@/utils/notifications.ts'
import { Button, Checkbox, Group, Stack, Textarea } from '@mantine/core'
import { DatePickerInput, DateTimePicker } from '@mantine/dates'
import { isNotEmpty, useForm } from '@mantine/form'
import dayjs from 'dayjs'
import React from 'react'

export function CreateCalendarEvent() {
  const form = useForm({
    mode: 'controlled',
    initialValues: {
      title: '',
      placeholder: '',
      allDay: false,
      startDate: null as any as string,
      endDate: null as any as string,
    },
    validate: {
      title: isNotEmpty(),
      startDate: isNotEmpty(),
      endDate: isNotEmpty(),
    },
    transformValues: (values) => {
      const start = values.allDay ? formatDate(values.startDate) : ISO(values.startDate)
      const end = values.allDay ? formatDate(values.endDate) : ISO(values.endDate)

      return {
        title: values.title,
        allDay: values.allDay,
        startDate: start,
        endDate: end,
      }
    }
  })

  const [createRecord] = useCreateCalendarEventMutation()
  const handleRequest = useRequestHandler({ redirect: false })

  const increaseDay = () => {
    const startDate = dayjs(form.getValues().startDate)
    if (!startDate.isValid()) {
      return
    }

    const date = startDate.add(1, 'day')
    const formated = form.getValues().allDay ? formatDate(date) : formatDateTime(date)

    form.setValues({ startDate: formated, endDate: formated })
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    // if (form.getValues().title) {
    //   return
    // }

    e.preventDefault()

    try {
      const text = e.clipboardData.getData('text/plain')
      const parse = parseEvent({ text, date: form.getValues().startDate })
      form.setValues(parse)
    } catch (e: any) {
      errorNotification({ message: e.toString() })
    }
  }

  return (
    <DrawerLayout>
      <form autoComplete="off" onSubmit={form.onSubmit(async (data) => {
        const response = await handleRequest({ createRecord, data })
        if (response) {
          form.setValues({ title: '', placeholder: response.title })
        }
      }, validationErrorNotification)}>
        <Stack>
          <Textarea
            key={form.key('title')}
            {...form.getInputProps('title')}
            label="Pavadinimas"
            placeholder={form.getValues().placeholder}
            maxLength={256}
            minRows={2}
            onPaste={handlePaste}
            autosize
            withAsterisk
          />

          <Group>
            <Checkbox
              label="Visą dieną"
              key={form.key('allDay')}
              {...form.getInputProps('allDay', { type: 'checkbox' })}
            />
          </Group>

          <Group grow align="flex-end">
            <Button onClick={increaseDay}>+1 d.</Button>
            {form.getValues().allDay ?
              <>
                <DatePickerInput
                  key={form.key('startDate')}
                  {...form.getInputProps('startDate')}
                  label="Pradžia"
                  valueFormat="YYYY-MM-DD"
                  w="10rem"
                  withAsterisk
                />
                <DatePickerInput
                  key={form.key('endDate')}
                  {...form.getInputProps('endDate')}
                  label="Pabaiga"
                  valueFormat="YYYY-MM-DD"
                  w="10rem"
                  withAsterisk
                />
              </>
              :
              <>
                <DateTimePicker
                  key={form.key('startDate')}
                  {...form.getInputProps('startDate')}
                  label="Pradžia"
                  valueFormat="YYYY-MM-DD HH:mm"
                  w="10rem"
                  withAsterisk
                />
                <DateTimePicker
                  key={form.key('endDate')}
                  {...form.getInputProps('endDate')}
                  label="Pabaiga"
                  valueFormat="YYYY-MM-DD HH:mm"
                  w="10rem"
                  withAsterisk
                />
              </>
            }

          </Group>

          <SubmitButton disabled={form.submitting}/>
        </Stack>
      </form>
    </DrawerLayout>
  )
}