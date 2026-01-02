import { SubmitButton } from '@/components/buttons/SubmitButton.tsx'
import { useParamId } from '@/hooks/useParamId.tsx'
import { useRequestHandler } from '@/hooks/useRequestHandler.tsx'
import { DrawerLayout } from '@/layout/DrawerLayout.tsx'
import { useGetFailureReportQuery, usePatchFailureReportMutation } from '@/services/generatedApi.ts'
import { validationErrorNotification } from '@/utils/notifications.ts'
import { Fieldset, Radio, Stack, Textarea, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useEffect, useEffectEvent } from 'react'

export function UpdateFailureState() {
  const { id, isEdit } = useParamId()
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      id,
      note: '',
      location: '',
      details: '',
      isFixedRadio: 'null'
    },
    transformValues: (values) => {
      return ({
        id: values.id,
        note: values.note,
        isFixed: JSON.parse(values.isFixedRadio)
      })
    }
  })

  const query = useGetFailureReportQuery(id, { skip: !isEdit || form.initialized })
  const [updateRecord] = usePatchFailureReportMutation()
  const handleRequest = useRequestHandler({ redirectPath: '../../' })

  const initForm = useEffectEvent((data: NonNullable<typeof query.data>) => {
    form.initialize({
      id: data.id,
      isFixedRadio: String(data.isFixed),
      location: data.location,
      details: data.details,
      note: ''
    })
  })

  useEffect(() => {
    if (query.data) {
      initForm(query.data)
    }
  }, [query.data])

  return (
    <DrawerLayout closeNavLink="../../" title="Gedimas">
      <form autoComplete="off" onSubmit={form.onSubmit(async (data) => {
        await handleRequest({ updateRecord, data })
      }, validationErrorNotification)}>
        <Stack>
          <Fieldset>
            <TextInput
              key={form.key('location')}
              {...form.getInputProps('location')}
              label="Vieta"
              readOnly
              maxLength={64}
            />

            <Textarea
              key={form.key('details')}
              {...form.getInputProps('details')}
              label="Gedimo/defekto apibūdinimas"
              readOnly
              autosize
              maxLength={512}
            />
          </Fieldset>

          <Radio.Group
            key={form.key('isFixedRadio')}
            {...form.getInputProps('isFixedRadio')}
          >
            <Stack mt="xs">
              <Radio value="true" label="Gedimas sutvarkytas"/>
              <Radio value="null" label="Gedimas tvarkomas"/>
              <Radio value="false" label="Gedimas nesutvarkytas"/>
            </Stack>
          </Radio.Group>

          <Textarea
            key={form.key('note')}
            {...form.getInputProps('note')}
            label="Pastaba"
            description="Siunčiama mokytojui el. paštu, žurnale neišsaugoma"
            autosize
            maxLength={512}
          />

          <SubmitButton disabled={form.submitting || query.isFetching}/>

        </Stack>
      </form>
    </DrawerLayout>
  )
}