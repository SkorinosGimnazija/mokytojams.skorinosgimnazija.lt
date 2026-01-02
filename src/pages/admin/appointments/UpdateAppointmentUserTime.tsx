import { SubmitButton } from '@/components/buttons/SubmitButton.tsx'
import { useParamId } from '@/hooks/useParamId.tsx'
import { DrawerLayout } from '@/layout/DrawerLayout.tsx'
import {
  useListAppointmentTypeAvailableHostsQuery,
  useListAppointmentTypesQuery,
  useListAppointmentTypeStatusDatesQuery,
  useUpdateAppointmentReservedDatesMutation
} from '@/services/generatedApi.ts'
import { nothingFoundMessage } from '@/utils/constants.ts'
import { formatDateTime } from '@/utils/dateUtils.ts'
import { itemSavedNotification } from '@/utils/notifications.ts'
import { lithuanianSearchFilter } from '@/utils/optionFilters.ts'
import { MultiSelect, Select, Stack } from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import React, { useEffect, useEffectEvent } from 'react'

export function UpdateAppointmentUserTime() {
  const { id: typeId } = useParamId()
  const form = useForm({
    mode: 'controlled',
    initialValues: {
      hostId: '',
      dateIds: [] as string[],
    },
    transformValues: (values) => (
      values.dateIds.map(id => ({
        hostId: Number(values.hostId),
        dateId: Number(id),
      }))
    ),
    validate: {
      hostId: isNotEmpty(),
    }
  })

  const appointmentTypeNameQuery = useListAppointmentTypesQuery(false, {
    selectFromResult: ({ data }) => ({
      data: data?.find(x => x.id === Number(typeId))?.name ?? ''
    })
  })

  const datesQuery = useListAppointmentTypeStatusDatesQuery(
    { typeId, hostId: Number(form.getValues().hostId) },
    {
      skip: !form.getValues().hostId,
      selectFromResult: ({ data }) => ({
        data: data?.map(x => ({
          value: String(x.id),
          label: formatDateTime(x.date),
          disabled: x.isRegistered,
          reserved: x.isReserved,
        })) ?? []
      })
    }
  )

  const hostsQuery = useListAppointmentTypeAvailableHostsQuery(typeId, {
    selectFromResult: ({ data }) => ({
      data: data?.map(x => ({
        value: String(x.id),
        label: x.name,
        normalizedName: x.normalizedName
      })) ?? []
    })
  })

  const [updateRecord] = useUpdateAppointmentReservedDatesMutation()

  const setForm = useEffectEvent((data: NonNullable<typeof datesQuery.data>) => {
    form.setFieldValue('dateIds', data.filter(x => x.reserved).map(x => x.value))
  })

  useEffect(() => {
    if (datesQuery.data) {
      setForm(datesQuery.data)
    }
  }, [datesQuery.data])

  return (
    <DrawerLayout title={`Rezervuoti laiką "${appointmentTypeNameQuery.data}"`} closeNavLink="../../">
      <form autoComplete="off" onSubmit={form.onSubmit(async (data) => {
        const response = await updateRecord(data)
        if ('data' in response) {
          itemSavedNotification()
        }
      })}>

        <Stack>
          <Select
            key={form.key('hostId')}
            {...form.getInputProps('hostId')}
            label="Mokytojas"
            data={hostsQuery.data}
            nothingFoundMessage={nothingFoundMessage}
            allowDeselect={false}
            filter={lithuanianSearchFilter}
            searchable
            withAsterisk
          />

          <MultiSelect
            key={form.key('dateIds')}
            {...form.getInputProps('dateIds')}
            label="Laikas"
            maxDropdownHeight={300}
            disabled={!form.getValues().hostId}
            withAlignedLabels
            data={datesQuery.data}
          />

          <SubmitButton disabled={form.submitting}/>
        </Stack>

      </form>
    </DrawerLayout>
  )
}