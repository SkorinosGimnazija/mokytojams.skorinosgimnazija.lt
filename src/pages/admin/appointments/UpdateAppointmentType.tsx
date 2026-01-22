import { SubmitButton } from '@/components/buttons/SubmitButton.tsx'
import { useParamId } from '@/hooks/useParamId.tsx'
import { useRequestHandler } from '@/hooks/useRequestHandler.tsx'
import { DrawerLayout } from '@/layout/DrawerLayout.tsx'
import {
  useCreateAppointmentTypeMutation,
  useGetAppointmentTypeQuery,
  useListTeachersQuery,
  useUpdateAppointmentTypeMutation
} from '@/services/generatedApi.ts'
import { nothingFoundMessage } from '@/utils/constants.ts'
import { ISO } from '@/utils/dateUtils.ts'
import { validationErrorNotification } from '@/utils/notifications.ts'
import { lithuanianSearchFilter } from '@/utils/optionFilters.ts'
import { Checkbox, Group, MultiSelect, NumberInput, Stack, TextInput } from '@mantine/core'
import { DateTimePicker } from '@mantine/dates'
import { isNotEmpty, useForm } from '@mantine/form'
import { CalendarIcon } from '@phosphor-icons/react'
import React, { useEffect, useEffectEvent } from 'react'

export function UpdateAppointmentType() {
  const { id, isEdit } = useParamId()
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      id,
      name: '',
      description: '',
      exclusiveHostIds: [] as string[],
      additionalInviteeIds: [] as string[],
      durationInMinutes: '' as number | string,
      registrationEndsAt: '',
      isPublic: false,
      isOnline: false,
    },
    validate: {
      name: isNotEmpty(),
      description: isNotEmpty(),
      registrationEndsAt: isNotEmpty(),
      durationInMinutes: isNotEmpty(),
    },
    transformValues: (values) => ({
      ...values,
      durationInMinutes: Number(values.durationInMinutes),
      registrationEndsAt: ISO(values.registrationEndsAt),
      additionalInviteeIds: values.additionalInviteeIds.map(x => Number(x)),
      exclusiveHostIds: values.exclusiveHostIds.map(x => Number(x)),
    }),
  })

  const query = useGetAppointmentTypeQuery(id, { skip: !isEdit })
  const [createRecord] = useCreateAppointmentTypeMutation()
  const [updateRecord] = useUpdateAppointmentTypeMutation()
  const handleRequest = useRequestHandler()

  const teachersQuery = useListTeachersQuery(undefined, {
    selectFromResult: ({ data }) => ({
      data: data?.map(x => ({
        value: String(x.id),
        label: x.name,
        normalizedName: x.normalizedName
      })) ?? []
    })
  })

  const initForm = useEffectEvent((data: NonNullable<typeof query.data>) => {
    form.initialize({
      ...data,
      additionalInviteeIds: data.additionalInviteeIds.map(x => String(x)),
      exclusiveHostIds: data.exclusiveHostIds.map(x => String(x)),
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
            key={form.key('name')}
            {...form.getInputProps('name')}
            label="Pavadinimas"
            withAsterisk
            maxLength={128}
          />

          <TextInput
            key={form.key('description')}
            {...form.getInputProps('description')}
            label="Aprašymas"
            withAsterisk
            maxLength={128}
          />

          <Group grow>
            <DateTimePicker
              key={form.key('registrationEndsAt')}
              {...form.getInputProps('registrationEndsAt')}
              withAsterisk
              rightSection={<CalendarIcon size="1.2rem"/>}
              rightSectionPointerEvents="none"
              w="12rem"
              label="Registracijos pabaiga"
              valueFormat="YYYY-MM-DD HH:mm"
            />

            <NumberInput
              key={form.key('durationInMinutes')}
              {...form.getInputProps('durationInMinutes')}
              withAsterisk
              w="12rem"
              label="Trukmė"
              suffix="min."
              min={1}
              allowNegative={false}
              allowDecimal={false}
            />
          </Group>

          <MultiSelect
            key={form.key('exclusiveHostIds')}
            {...form.getInputProps('exclusiveHostIds')}
            label="Apriboti registraciją"
            nothingFoundMessage={nothingFoundMessage}
            filter={lithuanianSearchFilter}
            maxDropdownHeight={200}
            data={teachersQuery.data}
            searchable
            withAlignedLabels
          />

          <MultiSelect
            key={form.key('additionalInviteeIds')}
            {...form.getInputProps('additionalInviteeIds')}
            label="Siųsti papildomą kvietimą"
            nothingFoundMessage={nothingFoundMessage}
            filter={lithuanianSearchFilter}
            maxDropdownHeight={200}
            data={teachersQuery.data}
            searchable
            withAlignedLabels
          />

          <Group mt="lg">

            <Checkbox
              label="Viešas"
              key={form.key('isPublic')}
              {...form.getInputProps('isPublic', { type: 'checkbox' })}
            />

            <Checkbox
              label="Nuotolinis"
              key={form.key('isOnline')}
              {...form.getInputProps('isOnline', { type: 'checkbox' })}
            />

          </Group>

          <SubmitButton disabled={form.submitting}/>
        </Stack>

      </form>
    </DrawerLayout>
  )
}