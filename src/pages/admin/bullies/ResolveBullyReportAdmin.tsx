import { SubmitButton } from '@/components/buttons/SubmitButton.tsx'
import { useParamId } from '@/hooks/useParamId.tsx'
import { useRequestHandler } from '@/hooks/useRequestHandler.tsx'
import { DrawerLayout } from '@/layout/DrawerLayout.tsx'
import { useGetBullyReportQuery, usePatchBullyReportMutation } from '@/services/generatedApi.ts'
import { validationErrorNotification } from '@/utils/notifications.ts'
import { Fieldset, Group, Stack, Textarea, TextInput } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import React, { useEffect, useEffectEvent } from 'react'

export function ResolveBullyReportAdmin() {
  const { id, isEdit } = useParamId()

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      id,
      date: null as string | null,
      createdAt: null as string | null,
      victimName: '',
      bullyName: '',
      location: '',
      details: '',
      observers: '',
      actions: ''
    },
    transformValues: (values) => {
      return {
        id: values.id,
        actions: values.actions
      }
    }
  })

  const query = useGetBullyReportQuery(id, { skip: !isEdit || form.initialized })
  const [updateRecord] = usePatchBullyReportMutation()
  const handleRequest = useRequestHandler({ redirectPath: '../../' })

  const initForm = useEffectEvent((data: NonNullable<typeof query.data>) => {
    form.initialize({
      id: data.id,
      date: data.date,
      createdAt: data.createdAt,
      victimName: data.victimName,
      bullyName: data.bullyName,
      location: data.location,
      details: data.details,
      observers: data.observers ?? '',
      actions: data.actions ?? ''
    })
  })

  useEffect(() => {
    if (query.data) {
      initForm(query.data)
    }
  }, [query.data])

  return (
    <DrawerLayout title="Pranešimas apie patyčias" closeNavLink="../../">
      <form autoComplete="off" onSubmit={form.onSubmit(async (data) => {
        await handleRequest({ updateRecord, data })
      }, validationErrorNotification)}>
        <Stack>
          <Fieldset>
            <Group grow>
              <TextInput
                key={form.key('bullyName')}
                {...form.getInputProps('bullyName')}
                label="Smurtaujantis/besityčiojantis asmuo"
                maxLength={256}
                readOnly
                withAsterisk
              />

              <TextInput
                key={form.key('victimName')}
                {...form.getInputProps('victimName')}
                label="Smurtą/patyčias patiriantis asmuo"
                maxLength={256}
                readOnly
                withAsterisk
              />
            </Group>

            <Textarea
              key={form.key('details')}
              {...form.getInputProps('details')}
              label="Patyčios"
              maxLength={1024}
              minRows={2}
              readOnly
              withAsterisk
              autosize
            />

            <Group grow>
              <TextInput
                key={form.key('location')}
                {...form.getInputProps('location')}
                maxLength={128}
                readOnly
                withAsterisk
                label="Vieta"
              />

              <Group grow>
                <DatePickerInput
                  key={form.key('date')}
                  {...form.getInputProps('date')}
                  label="Įvykio data"
                  withAsterisk
                  highlightToday
                  readOnly
                  valueFormat="YYYY-MM-DD"
                />

                <DatePickerInput
                  key={form.key('createdAt')}
                  {...form.getInputProps('createdAt')}
                  label="Pranešimo data"
                  withAsterisk
                  highlightToday
                  readOnly
                  valueFormat="YYYY-MM-DD"
                />
              </Group>
            </Group>

            <Textarea
              key={form.key('observers')}
              {...form.getInputProps('observers')}
              label="Stebėjo patyčias"
              maxLength={1024}
              readOnly
              autosize
            />
          </Fieldset>

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