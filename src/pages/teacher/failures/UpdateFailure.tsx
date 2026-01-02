import { SubmitButton } from '@/components/buttons/SubmitButton.tsx'
import { useParamId } from '@/hooks/useParamId.tsx'
import { useRequestHandler } from '@/hooks/useRequestHandler.tsx'
import { DrawerLayout } from '@/layout/DrawerLayout.tsx'
import {
  useCreateFailureReportMutation,
  useGetFailureReportQuery,
  useUpdateFailureReportMutation
} from '@/services/generatedApi.ts'
import { validationErrorNotification } from '@/utils/notifications.ts'
import { Stack, Textarea, TextInput } from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import { useEffect, useEffectEvent } from 'react'

export function UpdateFailure() {
  const { id, isEdit } = useParamId()
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      id,
      location: '',
      details: '',
    },
    validate: {
      location: isNotEmpty(),
      details: isNotEmpty(),
    }
  })

  const query = useGetFailureReportQuery(id, { skip: !isEdit || form.initialized })
  const [createRecord] = useCreateFailureReportMutation()
  const [updateRecord] = useUpdateFailureReportMutation()
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
            key={form.key('location')}
            {...form.getInputProps('location')}
            label="Vieta"
            withAsterisk
            maxLength={64}
          />

          <Textarea
            key={form.key('details')}
            {...form.getInputProps('details')}
            label="Gedimo apibūdinimas"
            withAsterisk
            autosize
            maxLength={512}
          />

          <SubmitButton disabled={form.submitting || query.isFetching}/>

        </Stack>
      </form>
    </DrawerLayout>
  )
}