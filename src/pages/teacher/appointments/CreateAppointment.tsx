import { SubmitButton } from '@/components/buttons/SubmitButton.tsx'
import { useRequestHandler } from '@/hooks/useRequestHandler.tsx'
import { DrawerLayout } from '@/layout/DrawerLayout.tsx'
import {
  useCreateAppointmentMutation,
  useListAppointmentTypeAvailableDatesQuery,
  useListAppointmentTypeAvailableHostsQuery,
  useListAppointmentTypesQuery
} from '@/services/generatedApi.ts'
import { formatDateTime } from '@/utils/dateUtils.ts'
import { validationErrorNotification } from '@/utils/notifications.ts'
import { Select, Stack } from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import React, { useEffect, useEffectEvent } from 'react'

export function CreateAppointment() {
  const form = useForm({
    mode: 'controlled',
    initialValues: {
      typeId: '',
      hostId: '',
      dateId: '',
    },
    validate: {
      typeId: isNotEmpty(),
      hostId: isNotEmpty(),
      dateId: isNotEmpty(),
    },
    transformValues: (values) => ({
      typeId: Number(values.typeId),
      hostId: Number(values.hostId),
      dateId: Number(values.dateId),
    }),
  })

  const [createRecord] = useCreateAppointmentMutation()
  const handleRequest = useRequestHandler()

  const typesQuery = useListAppointmentTypesQuery(true)
  const hostsQuery = useListAppointmentTypeAvailableHostsQuery(
    Number(form.getValues().typeId),
    {
      skip: !form.getValues().typeId
    })
  const datesQuery = useListAppointmentTypeAvailableDatesQuery({
    hostId: Number(form.getValues().hostId),
    typeId: Number(form.getValues().typeId),
  }, {
    skip: !form.getValues().hostId,
  })

  const setForm = useEffectEvent((data: NonNullable<typeof typesQuery.data>) => {
    if (data.length === 1) {
      form.setFieldValue('typeId', String(data[0].id))
    }
  })

  useEffect(() => {
    if (typesQuery.data) {
      setForm(typesQuery.data)
    }
  }, [typesQuery.data])

  return (
    <DrawerLayout title="Registracija">
      <form autoComplete="off" onSubmit={form.onSubmit(async (data) => {
        await handleRequest({ createRecord, data })
      }, validationErrorNotification)}>
        <Stack>

          <Select
            key={form.key('typeId')}
            {...form.getInputProps('typeId')}
            label="Tipas"
            data={typesQuery.data?.map(x => ({ value: String(x.id), label: x.name }))}
            allowDeselect={false}
            withAsterisk
          />

          <Select
            key={form.key('hostId')}
            {...form.getInputProps('hostId')}
            label="Vadovas"
            disabled={!form.getValues().typeId || hostsQuery.isFetching}
            data={hostsQuery.data?.map(x => ({ value: String(x.id), label: x.name }))}
            allowDeselect={false}
            withAsterisk
          />

          <Select
            key={form.key('dateId')}
            {...form.getInputProps('dateId')}
            label="Laikas"
            disabled={!form.getValues().hostId || datesQuery.isFetching}
            data={datesQuery.data?.map(x => ({ value: String(x.id), label: formatDateTime(x.date) }))}
            withAsterisk
          />

          <SubmitButton disabled={form.submitting}/>

        </Stack>
      </form>
    </DrawerLayout>
  )
}