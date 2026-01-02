import { SubmitButton } from '@/components/buttons/SubmitButton.tsx'
import { useParamId } from '@/hooks/useParamId.tsx'
import { useRequestHandler } from '@/hooks/useRequestHandler.tsx'
import { DrawerLayout } from '@/layout/DrawerLayout.tsx'
import { useGetClassroomQuery, useUpsertClassroomMutation, } from '@/services/generatedApi.ts'
import { validationErrorNotification } from '@/utils/notifications.ts'
import { NumberInput, Stack, TextInput } from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import React, { useEffect, useEffectEvent } from 'react'

export function UpdateClassroom() {
  const { id, isEdit } = useParamId()

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      id,
      name: '',
    },
    validate: {
      id: isNotEmpty(),
      name: isNotEmpty(),
    }
  })

  const query = useGetClassroomQuery(id, { skip: !isEdit || form.initialized })
  const [updateRecord] = useUpsertClassroomMutation()
  const handleRequest = useRequestHandler()

  const initForm = useEffectEvent((data: NonNullable<typeof query.data>) => {
    form.initialize({
      id: data.id,
      name: data.name,
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

          <TextInput
            key={form.key('name')}
            {...form.getInputProps('name')}
            label="Klasė"
            withAsterisk
            maxLength={64}
          />

          <SubmitButton disabled={form.submitting || query.isFetching}/>
        </Stack>
      </form>
    </DrawerLayout>
  )
}