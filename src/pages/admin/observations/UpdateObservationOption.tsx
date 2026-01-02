import { SubmitButton } from '@/components/buttons/SubmitButton.tsx'
import { useParamId } from '@/hooks/useParamId.tsx'
import { useRequestHandler } from '@/hooks/useRequestHandler.tsx'
import { DrawerLayout } from '@/layout/DrawerLayout.tsx'
import {
  useCreateObservationOptionMutation,
  useGetObservationOptionQuery,
  useUpdateObservationOptionMutation
} from '@/services/generatedApi.ts'
import { validationErrorNotification } from '@/utils/notifications.ts'
import { Stack, TextInput } from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import React, { useEffect, useEffectEvent } from 'react'

export function UpdateObservationOption() {
  const { id, isEdit } = useParamId()
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      id,
      name: ''
    },
    validate: {
      name: isNotEmpty()
    }
  })

  const query = useGetObservationOptionQuery(id, { skip: !isEdit || form.initialized })
  const [createRecord] = useCreateObservationOptionMutation()
  const [updateRecord] = useUpdateObservationOptionMutation()
  const handleRequest = useRequestHandler()

  const initForm = useEffectEvent((data: NonNullable<typeof query.data>) => {
    form.initialize(data)
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
            maxLength={256}
          />

          <SubmitButton disabled={form.submitting || query.isFetching}/>

        </Stack>
      </form>
    </DrawerLayout>
  )
}