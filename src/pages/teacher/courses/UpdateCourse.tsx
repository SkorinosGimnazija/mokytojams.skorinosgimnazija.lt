import { SubmitButton } from '@/components/buttons/SubmitButton.tsx'
import { useParamId } from '@/hooks/useParamId.tsx'
import { useRequestHandler } from '@/hooks/useRequestHandler.tsx'
import { DrawerLayout } from '@/layout/DrawerLayout.tsx'
import { useCreateCourseMutation, useGetCourseQuery, useUpdateCourseMutation } from '@/services/generatedApi.ts'
import { validationErrorNotification } from '@/utils/notifications.ts'
import { Checkbox, Group, NumberInput, Stack, TextInput } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { isNotEmpty, useForm } from '@mantine/form'
import React, { useEffect, useEffectEvent } from 'react'

export function UpdateCourse() {
  const { id, isEdit } = useParamId()

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      id,
      title: '',
      organizer: '',
      startDate: null as string | null,
      endDate: null as string | null,
      durationInHours: '',
      certificate: '',
      isUseful: false,
    },
    onValuesChange: (values) => {
      if (!values.startDate || values.endDate) {
        return
      }
      form.setFieldValue('endDate', values.startDate)
    },
    transformValues: (values) => ({
      ...values,
      durationInHours: Number(values.durationInHours),
      startDate: String(values.startDate),
      endDate: String(values.endDate),
    }),
    validate: {
      title: isNotEmpty(),
      organizer: isNotEmpty(),
      startDate: isNotEmpty(),
      endDate: isNotEmpty(),
      durationInHours: isNotEmpty(),
    }
  })

  const query = useGetCourseQuery(id, { skip: !isEdit || form.initialized })
  const [createRecord] = useCreateCourseMutation()
  const [updateRecord] = useUpdateCourseMutation()
  const handleRequest = useRequestHandler()

  const initForm = useEffectEvent((data: NonNullable<typeof query.data>) => {
    form.initialize({
      id: data.id,
      title: data.title,
      organizer: data.organizer,
      startDate: data.startDate,
      endDate: data.endDate,
      durationInHours: String(data.durationInHours),
      certificate: data.certificate ?? '',
      isUseful: data.isUseful,
    })
  })

  useEffect(() => {
    if (query.data) {
      initForm(query.data)
    }
  }, [query.data])

  return (
    <DrawerLayout>
      <form autoComplete="off" onSubmit={form.onSubmit(async (data) => {
        await handleRequest({ createRecord, updateRecord, data })
      }, validationErrorNotification)}>
        <Stack>

          <TextInput
            key={form.key('title')}
            {...form.getInputProps('title')}
            label="Pavadinimas"
            withAsterisk
            maxLength={256}
          />

          <TextInput
            key={form.key('organizer')}
            {...form.getInputProps('organizer')}
            label="Organizatorius"
            withAsterisk
            maxLength={256}
          />

          <TextInput
            key={form.key('certificate')}
            {...form.getInputProps('certificate')}
            label="Pažymėjimo numeris"
            maxLength={128}
          />

          <Group grow>
            <DatePickerInput
              key={form.key('startDate')}
              {...form.getInputProps('startDate')}
              label="Nuo"
              withAsterisk
              valueFormat="YYYY-MM-DD"
            />
            <DatePickerInput
              key={form.key('endDate')}
              {...form.getInputProps('endDate')}
              label="Iki"
              withAsterisk
              valueFormat="YYYY-MM-DD"
            />
            <NumberInput
              key={form.key('durationInHours')}
              {...form.getInputProps('durationInHours')}
              label="Trukmė (val.)"
              withAsterisk
              allowNegative={false}
            />
          </Group>

          <Checkbox
            key={form.key('isUseful')}
            {...form.getInputProps('isUseful', { type: 'checkbox' })}
            label="Mokymai buvo naudingi"
          />

          <SubmitButton disabled={form.submitting || query.isFetching}/>
        </Stack>
      </form>
    </DrawerLayout>
  )
}