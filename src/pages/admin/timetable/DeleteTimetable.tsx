import { SubmitButton } from '@/components/buttons/SubmitButton.tsx'
import { useRequestHandler } from '@/hooks/useRequestHandler.tsx'
import { DrawerLayout } from '@/layout/DrawerLayout.tsx'
import { useDeleteTimetableMutation, useListClassdaysQuery } from '@/services/generatedApi.ts'
import { validationErrorNotification } from '@/utils/notifications.ts'
import { Checkbox, Stack } from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { useEffect, useEffectEvent } from 'react'

export function DeleteTimetable() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      dayIds: [] as { id: number, name: string, active?: boolean }[],
    },
    transformValues: (values) => {
      return values.dayIds.filter(x => x.active).map(x => x.id)
    }
  })

  const query = useListClassdaysQuery()
  const [deleteTimetableMutation] = useDeleteTimetableMutation()
  const handleRequest = useRequestHandler()

  const initForm = useEffectEvent((data: NonNullable<typeof query.data>) => {
    form.initialize({
      dayIds: [...data, { id: -1, name: 'Pakeitimai' }]
    })
  })

  useEffect(() => {
    if (query.data) {
      initForm(query.data)
    }
  }, [query])

  return (
    <DrawerLayout title="Ištrinti tvarkaraštį" closeNavLink="../">
      <form autoComplete="off" onSubmit={form.onSubmit(async (data) => {
        await handleRequest({ createRecord: deleteTimetableMutation, data })
      }, validationErrorNotification)}>

        <Stack>
          {form.getValues().dayIds.map((item, index) => (
            <React.Fragment key={item.id}>
              <Checkbox
                key={form.key(`dayIds.${index}.active`)}
                {...form.getInputProps(`dayIds.${index}.active`, { type: 'checkbox' })}
                label={item.name}
              />
            </React.Fragment>
          ))}
        </Stack>

        <SubmitButton disabled={form.submitting || query.isFetching} title={'Ištrinti'}/>

      </form>
    </DrawerLayout>
  )
}