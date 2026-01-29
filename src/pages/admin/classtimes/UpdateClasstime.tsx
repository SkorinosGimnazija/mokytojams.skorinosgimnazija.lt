import { SubmitButton } from '@/components/buttons/SubmitButton.tsx'
import { useParamId } from '@/hooks/useParamId.tsx'
import { useRequestHandler } from '@/hooks/useRequestHandler.tsx'
import { DrawerLayout } from '@/layout/DrawerLayout.tsx'
import { useGetClasstimeQuery, useUpsertClasstimeMutation, } from '@/services/generatedApi.ts'
import { validationErrorNotification } from '@/utils/notifications.ts'
import { Group, NumberInput, Stack } from '@mantine/core'
import { TimeInput } from '@mantine/dates'
import { isNotEmpty, useForm } from '@mantine/form'
import React, { useEffect, useEffectEvent } from 'react'

export function UpdateClasstime() {
  const { id, isEdit } = useParamId()

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      id,
      startTime: '',
      startTimeShort: '' as string | null | undefined,
      endTime: '',
      endTimeShort: '' as string | null | undefined,
    },
    validate: {
      id: isNotEmpty(),
      startTime: isNotEmpty(),
      endTime: isNotEmpty()
    },
    transformValues: (values) => {
      return {
        ...values,
        startTimeShort: values.startTimeShort ? values.startTimeShort : null,
        endTimeShort: values.endTimeShort ? values.endTimeShort : null,
      }
    }
  })

  const query = useGetClasstimeQuery(id, { skip: !isEdit || form.initialized })
  const [updateRecord] = useUpsertClasstimeMutation()
  const handleRequest = useRequestHandler()

  const initForm = useEffectEvent((data: NonNullable<typeof query.data>) => {
    form.initialize({
      id: data.id,
      startTime: data.startTime,
      startTimeShort: data.startTimeShort,
      endTime: data.endTime,
      endTimeShort: data.endTimeShort,
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
        await handleRequest({ updateRecord, data })
      }, validationErrorNotification)}>
        <Stack>
          <NumberInput
            key={form.key('id')}
            {...form.getInputProps('id')}
            label="Nr"
            withAsterisk
            allowNegative={false}
            disabled={isEdit}
          />

          <Group grow>
            <TimeInput
              key={form.key('startTime')}
              {...form.getInputProps('startTime')}
              label="Nuo"
              withAsterisk
            />

            <TimeInput
              key={form.key('endTime')}
              {...form.getInputProps('endTime')}
              label="Iki"
              withAsterisk
            />
          </Group>

          <Group grow>
            <TimeInput
              key={form.key('startTimeShort')}
              {...form.getInputProps('startTimeShort')}
              label="Nuo (sutrumpintas)"
            />

            <TimeInput
              key={form.key('endTimeShort')}
              {...form.getInputProps('endTimeShort')}
              label="Iki (sutrumpintas)"
            />
          </Group>

          <SubmitButton disabled={form.submitting || query.isFetching}/>
        </Stack>
      </form>
    </DrawerLayout>
  )
}