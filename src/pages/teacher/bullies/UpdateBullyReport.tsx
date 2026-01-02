import { SubmitButton } from '@/components/buttons/SubmitButton.tsx'
import { useParamId } from '@/hooks/useParamId.tsx'
import { useRequestHandler } from '@/hooks/useRequestHandler.tsx'
import { DrawerLayout } from '@/layout/DrawerLayout.tsx'
import {
  useCreateBullyReportMutation,
  useGetBullyReportQuery,
  useUpdateBullyReportMutation
} from '@/services/generatedApi.ts'
import { currentDate } from '@/utils/dateUtils.ts'
import { validationErrorNotification } from '@/utils/notifications.ts'
import { Group, Stack, Textarea, TextInput } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { isNotEmpty, useForm } from '@mantine/form'
import React, { useEffect, useEffectEvent } from 'react'

export function UpdateBullyReport() {
  const { id, isEdit } = useParamId()

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      id,
      date: currentDate(),
      victimName: '',
      bullyName: '',
      location: '',
      details: '',
      actions: ''
    },
    validate: {
      date: isNotEmpty(),
      victimName: isNotEmpty(),
      bullyName: isNotEmpty(),
      location: isNotEmpty(),
      details: isNotEmpty(),
    }
  })

  const query = useGetBullyReportQuery(id, { skip: !isEdit || form.initialized })
  const [createRecord] = useCreateBullyReportMutation()
  const [updateRecord] = useUpdateBullyReportMutation()
  const handleRequest = useRequestHandler()

  const initForm = useEffectEvent((data: NonNullable<typeof query.data>) => {
    form.initialize({
      id: data.id,
      date: data.date,
      victimName: data.victimName,
      bullyName: data.bullyName,
      location: data.location,
      details: data.details,
      actions: data.actions ?? ''
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
            key={form.key('bullyName')}
            {...form.getInputProps('bullyName')}
            label="Smurtaujantis/besityčiojantis asmuo"
            maxLength={256}
            withAsterisk
          />

          <TextInput
            key={form.key('victimName')}
            {...form.getInputProps('victimName')}
            label="Smurtą/patyčias patiriantis asmuo"
            maxLength={256}
            withAsterisk
          />

          <Textarea
            key={form.key('details')}
            {...form.getInputProps('details')}
            label="Patyčios"
            maxLength={1024}
            minRows={2}
            withAsterisk
            autosize
          />

          <Group grow>
            <TextInput
              key={form.key('location')}
              {...form.getInputProps('location')}
              maxLength={128}
              withAsterisk
              label="Vieta"
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

          <Textarea
            key={form.key('actions')}
            {...form.getInputProps('actions')}
            label="Taikytos priemonės (pagalba)"
            minRows={2}
            maxLength={1024}
            autosize
          />

          <SubmitButton disabled={form.submitting || query.isFetching}/>
        </Stack>

      </form>
    </DrawerLayout>
  )
}