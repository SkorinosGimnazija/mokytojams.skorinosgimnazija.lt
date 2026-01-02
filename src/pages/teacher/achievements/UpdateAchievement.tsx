import { QuickDeleteButton } from '@/components/buttons/QuickDeleteButton.tsx'
import { SubmitButton } from '@/components/buttons/SubmitButton.tsx'
import { useAuth } from '@/hooks/useAuth.tsx'
import { useParamId } from '@/hooks/useParamId.tsx'
import { useRequestHandler } from '@/hooks/useRequestHandler.tsx'
import { DrawerLayout } from '@/layout/DrawerLayout.tsx'
import {
  useCreateAchievementMutation,
  useGetAchievementQuery,
  useListAchievementScalesQuery,
  useListAchievementTypesQuery,
  useListClassroomsQuery,
  useListTeachersQuery,
  useUpdateAchievementMutation
} from '@/services/generatedApi.ts'
import { nothingFoundMessage } from '@/utils/constants.ts'
import { currentDate } from '@/utils/dateUtils.ts'
import { validationErrorNotification } from '@/utils/notifications.ts'
import { lithuanianSearchFilter } from '@/utils/optionFilters.ts'
import { Button, Fieldset, Group, MultiSelect, Select, Stack, TextInput } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { isNotEmpty, useForm } from '@mantine/form'
import { randomId } from '@mantine/hooks'
import { useEffect, useEffectEvent } from 'react'

export function UpdateAchievement() {
  const auth = useAuth()
  const { id, isEdit } = useParamId()

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      id,
      name: '',
      date: currentDate(),
      scaleId: '',
      additionalTeachers: [] as string[],
      students: [{ key: randomId(), name: '', achievementTypeId: '1', classroomId: '' }],
    },
    transformValues: (values) => ({
      ...values,
      scaleId: Number(values.scaleId),
      additionalTeachers: values.additionalTeachers.map(x => Number(x)),
      students: values.students.map(x => ({
        name: x.name,
        achievementTypeId: Number(x.achievementTypeId),
        classroomId: Number(x.classroomId)
      })),
    }),
    validate: {
      name: isNotEmpty(),
      date: isNotEmpty(),
      scaleId: isNotEmpty(),
      students: {
        name: isNotEmpty(),
        achievementTypeId: isNotEmpty(),
        classroomId: isNotEmpty(),
      },
    }
  })

  const query = useGetAchievementQuery(id, { skip: !isEdit || form.initialized })
  const [createRecord] = useCreateAchievementMutation()
  const [updateRecord] = useUpdateAchievementMutation()
  const handleRequest = useRequestHandler()

  const teachersQuery = useListTeachersQuery(undefined, {
    selectFromResult: ({ data }) => ({
      data: data?.filter(x => x.id !== auth.userId).map(x => ({
        value: String(x.id),
        label: x.name,
        normalizedName: x.normalizedName
      })) ?? []
    })
  })

  const scalesQuery = useListAchievementScalesQuery(undefined, {
    selectFromResult: ({ data }) => ({
      data: data?.map(x => ({ value: String(x.id), label: x.name })) ?? []
    })
  })

  const classroomsQuery = useListClassroomsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      data: data?.map(x => ({ value: String(x.id), label: x.name })) ?? []
    })
  })

  const achievementTypesQuery = useListAchievementTypesQuery(undefined, {
    selectFromResult: ({ data }) => ({
      data: data?.map(x => ({ value: String(x.id), label: x.name })) ?? []
    })
  })

  const initForm = useEffectEvent((data: NonNullable<typeof query.data>) => {
    form.initialize({
      id: data.id,
      name: data.name,
      date: data.date,
      scaleId: String(data.scaleId),
      additionalTeachers: data.additionalTeachers.map(x => String(x.id)),
      students: data.students.map(x => ({
        key: randomId(),
        name: x.name,
        achievementTypeId: String(x.achievementTypeId),
        classroomId: String(x.classroomId),
      })),
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
            withAsterisk
            label="Renginio pavadinimas"
            maxLength={256}
          />

          <Group>
            <Select
              key={form.key('scaleId')}
              {...form.getInputProps('scaleId')}
              withAsterisk
              label="Mastas"
              nothingFoundMessage={nothingFoundMessage}
              data={scalesQuery.data}
            />

            <DatePickerInput
              key={form.key('date')}
              {...form.getInputProps('date')}
              withAsterisk
              highlightToday
              valueFormat="YYYY-MM-DD"
              label="Data"
            />
          </Group>

          <Fieldset legend="Mokiniai">
            <Stack>

              {form.getValues().students.map((item, index) => (
                <Group key={item.key} align="flex-end">
                  <TextInput
                    key={form.key(`students.${index}.name`)}
                    {...form.getInputProps(`students.${index}.name`)}
                    label="Vardas pavardė"
                    flex="2"
                    withAsterisk
                    maxLength={256}
                  />
                  <Select
                    key={form.key(`students.${index}.classroomId`)}
                    {...form.getInputProps(`students.${index}.classroomId`)}
                    label="Klasė"
                    flex="1"
                    nothingFoundMessage={nothingFoundMessage}
                    searchable
                    withAsterisk
                    allowDeselect={false}
                    data={classroomsQuery.data}
                  />
                  <Select
                    key={form.key(`students.${index}.achievementTypeId`)}
                    {...form.getInputProps(`students.${index}.achievementTypeId`)}
                    label="Laimėjimas"
                    flex="1"
                    withAsterisk
                    allowDeselect={false}
                    data={achievementTypesQuery.data}
                  />
                  <QuickDeleteButton onClick={() => {
                    if (form.getValues().students.length === 1) return
                    form.removeListItem('students', index)
                  }}/>
                </Group>
              ))}

              <Button
                type="button"
                variant="light"
                onClick={() => {
                  form.insertListItem('students', {
                    key: randomId(),
                    name: '',
                    achievementTypeId: '1',
                    classroomId: '',
                  })
                }}
              >
                Pridėti mokinį
              </Button>

            </Stack>
          </Fieldset>

          <MultiSelect
            key={form.key('additionalTeachers')}
            {...form.getInputProps('additionalTeachers')}
            label="Papildomai prisidėję mokytojai"
            nothingFoundMessage={nothingFoundMessage}
            filter={lithuanianSearchFilter}
            maxDropdownHeight={200}
            data={teachersQuery.data}
            withAlignedLabels
            searchable
          />

          <SubmitButton disabled={form.submitting || query.isFetching}/>
        </Stack>
      </form>
    </DrawerLayout>
  )
}