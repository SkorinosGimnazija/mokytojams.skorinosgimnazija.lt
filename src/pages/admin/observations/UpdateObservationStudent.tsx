import { SubmitButton } from '@/components/buttons/SubmitButton.tsx'
import { useParamId } from '@/hooks/useParamId.tsx'
import { useRequestHandler } from '@/hooks/useRequestHandler.tsx'
import { DrawerLayout } from '@/layout/DrawerLayout.tsx'
import {
  useCreateObservationStudentMutation,
  useGetObservationStudentQuery,
  useUpdateObservationStudentMutation
} from '@/services/generatedApi'
import { validationErrorNotification } from '@/utils/notifications.ts'
import { Checkbox, Stack, TextInput } from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import React, { useEffect, useEffectEvent } from 'react'

export function UpdateObservationStudent() {
  const { id, isEdit } = useParamId()
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      id,
      name: '',
      isActive: true,
    },
    validate: {
      name: isNotEmpty(),
    }
  })

  const query = useGetObservationStudentQuery(id, { skip: !isEdit || form.initialized })
  const [createRecord] = useCreateObservationStudentMutation()
  const [updateRecord] = useUpdateObservationStudentMutation()
  const handleResponse = useRequestHandler()

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
        await handleResponse({ createRecord, updateRecord, data })
      }, validationErrorNotification)}>
        <Stack>

          <TextInput
            key={form.key('name')}
            {...form.getInputProps('name')}
            label="Vardas"
            withAsterisk
            maxLength={128}
          />

          <Checkbox
            label="Aktyvus"
            key={form.key('isActive')}
            {...form.getInputProps('isActive', { type: 'checkbox' })}
          />

          <SubmitButton disabled={form.submitting || query.isFetching}/>
        </Stack>

      </form>
    </DrawerLayout>
  )
}