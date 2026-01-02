import { SubmitButton } from '@/components/buttons/SubmitButton.tsx'
import { useParamId } from '@/hooks/useParamId.tsx'
import { useRequestHandler } from '@/hooks/useRequestHandler.tsx'
import { DrawerLayout } from '@/layout/DrawerLayout.tsx'
import { useCreateShortDayMutation, useGetShortDayQuery, useUpdateShortDayMutation } from '@/services/generatedApi.ts'
import { validationErrorNotification } from '@/utils/notifications.ts'
import { Stack } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { isNotEmpty, useForm } from '@mantine/form'
import { useEffect, useEffectEvent } from 'react'

export function UpdateShortDay() {
  const { id, isEdit } = useParamId()

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      id,
      date: undefined as string | undefined,
    },
    validate: {
      date: isNotEmpty(),
    },
    transformValues: (values) => ({
      ...values,
      date: String(values.date),
    })
  })

  const query = useGetShortDayQuery(id, { skip: !isEdit || form.initialized })
  const [createRecord] = useCreateShortDayMutation()
  const [updateRecord] = useUpdateShortDayMutation()
  const handleRequest = useRequestHandler()

  const initForm = useEffectEvent((data: NonNullable<typeof query.data>) => {
    form.initialize({
      id: data.id,
      date: data.date,
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
          <DatePickerInput
            key={form.key('date')}
            {...form.getInputProps('date')}
            label="Data"
            minDate={new Date()}
            withAsterisk
            highlightToday
            valueFormat="YYYY-MM-DD"
          />
          <SubmitButton disabled={form.submitting || query.isFetching}/>
        </Stack>
      </form>
    </DrawerLayout>
  )
}