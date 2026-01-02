import { SubmitButton } from '@/components/buttons/SubmitButton.tsx'
import { useParamId } from '@/hooks/useParamId.tsx'
import { useRequestHandler } from '@/hooks/useRequestHandler.tsx'
import { DrawerLayout } from '@/layout/DrawerLayout.tsx'
import {
  useCreateObservationMutation,
  useGetObservationQuery,
  useListObservationLessonsQuery,
  useListObservationOptionsQuery,
  useListObservationStudentsQuery,
  useUpdateObservationMutation
} from '@/services/generatedApi.ts'
import { currentDate } from '@/utils/dateUtils.ts'
import { validationErrorNotification } from '@/utils/notifications.ts'
import { Checkbox, Group, Select, Stack, Textarea } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { isNotEmpty, useForm } from '@mantine/form'
import React, { useEffect, useEffectEvent } from 'react'

export function UpdateObservation() {
  const { id, isEdit } = useParamId()
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      id,
      studentId: '',
      lessonId: '',
      date: currentDate(),
      note: null as string | null | undefined,
      optionIds: [] as { id: number, name: string, active?: boolean }[],
    },
    transformValues: (values) => {
      return ({
        ...values,
        optionIds: values.optionIds.filter(x => x.active).map(x => x.id),
        studentId: Number(values.studentId),
        lessonId: Number(values.lessonId),
      })
    },
    validate: {
      lessonId: isNotEmpty(),
      studentId: isNotEmpty(),
      date: isNotEmpty(),
    }
  })

  const query = useGetObservationQuery(id, { skip: !isEdit || form.initialized })
  const [createRecord] = useCreateObservationMutation()
  const [updateRecord] = useUpdateObservationMutation()
  const handleRequest = useRequestHandler()

  const studentsQuery = useListObservationStudentsQuery(true)
  const lessonsQuery = useListObservationLessonsQuery()
  const optionsQuery = useListObservationOptionsQuery()

  const initForm = useEffectEvent((data: NonNullable<typeof query.data>, optionsData: NonNullable<typeof optionsQuery.data>) => {
    form.initialize({
      ...data,
      note: data.note,
      studentId: String(data.studentId),
      lessonId: String(data.lessonId),
      optionIds: optionsData.map(type => ({
        ...type,
        active: data.optionIds.includes(type.id)
      }))
    })
  })

  const setForm = useEffectEvent((studentsData: NonNullable<typeof studentsQuery.data>, optionsData: NonNullable<typeof optionsQuery.data>) => {
    if (studentsData.length === 1) {
      form.setFieldValue('studentId', String(studentsData[0].id))
    }

    form.setFieldValue('optionIds', optionsData)
  })

  useEffect(() => {
    if (!optionsQuery.data || !studentsQuery.data) {
      return
    }

    if (query.data) {
      initForm(query.data, optionsQuery.data)
    } else if (query.isUninitialized) {
      setForm(studentsQuery.data, optionsQuery.data)
    }

  }, [query, optionsQuery.data, studentsQuery.data])

  return (
    <DrawerLayout>
      <form autoComplete="off" onSubmit={form.onSubmit(async (data) => {
        await handleRequest({ createRecord, updateRecord, data })
      }, validationErrorNotification)}>
        <Stack>

          <Group>
            <Select
              key={form.key('studentId')}
              {...form.getInputProps('studentId')}
              withAsterisk
              label="Mokinys"
              data={studentsQuery.data?.map(x => ({ value: String(x.id), label: x.name })) ?? []}
              searchable
            />

            <Select
              key={form.key('lessonId')}
              {...form.getInputProps('lessonId')}
              withAsterisk
              label="Pamoka"
              data={lessonsQuery.data?.map(x => ({ value: String(x.id), label: x.name })) ?? []}
              searchable
            />

            <DatePickerInput
              key={form.key('date')}
              {...form.getInputProps('date')}
              withAsterisk
              highlightToday
              valueFormat="YYYY-MM-DD"
              label="Data"
            />
          </Group>

          {form.getValues().optionIds.map((item, index) => (
            <React.Fragment key={item.id}>
              <Checkbox
                key={form.key(`optionIds.${index}.active`)}
                {...form.getInputProps(`optionIds.${index}.active`, { type: 'checkbox' })}
                label={item.name}
              />
            </React.Fragment>
          ))}

          <Textarea
            key={form.key('note')}
            {...form.getInputProps('note')}
            label="Pastaba"
            autosize
            maxLength={512}
          />

          <SubmitButton disabled={form.submitting || query.isFetching}/>
        </Stack>

      </form>
    </DrawerLayout>
  )
}