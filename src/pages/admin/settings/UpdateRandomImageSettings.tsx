import { SubmitButton } from '@/components/buttons/SubmitButton.tsx'
import { useRequestHandler } from '@/hooks/useRequestHandler.tsx'
import { DrawerLayout } from '@/layout/DrawerLayout.tsx'
import {
  type RandomImageSettings,
  useGetPostQuery,
  useGetRandomImageSettingsQuery,
  usePostRandomImageSettingsMutation
} from '@/services/generatedApi.ts'
import { useListPostsInfiniteQuery } from '@/services/injectedApi.ts'
import { nothingFoundMessage } from '@/utils/constants.ts'
import { validationErrorNotification } from '@/utils/notifications.ts'
import { disabledSearchFilter } from '@/utils/optionFilters.ts'
import { NumberInput, Select, Stack } from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import { useDebouncedValue } from '@mantine/hooks'
import React, { useEffect, useEffectEvent, useMemo, useState } from 'react'

export function UpdateRandomImageSettings() {
  const [searchPost, setSearchPost] = useState<string>()
  const [searchPostDebounced] = useDebouncedValue(searchPost, 200)

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      forcedPostId: '',
      cacheDurationInMinutes: 0,
    },
    validate: {
      cacheDurationInMinutes: isNotEmpty(),
    },
    transformValues: (values) => ({
      ...values,
      forcedPostId: !values.forcedPostId ? null : Number(values.forcedPostId),
    }) as RandomImageSettings,
  })

  const query = useGetRandomImageSettingsQuery()
  const [createRecord] = usePostRandomImageSettingsMutation()
  const handleRequest = useRequestHandler()

  const postQuery = useGetPostQuery(
    Number(form.getValues().forcedPostId),
    { skip: !form.getValues().forcedPostId }
  )

  const postsQuery = useListPostsInfiniteQuery(
    { items: 10, searchTerm: searchPostDebounced },
    { skip: !form.isTouched('forcedPostId') }
  )

  const postQueryData = useMemo(() => {
    const posts =
      postsQuery.data?.pages[0].items.filter(x => x.id != postQuery.data?.id).map((x) => ({
        value: String(x.id),
        label: `${x.title} (id: ${x.id})`
      })) ?? []

    if (postQuery.data) {
      posts.unshift({
        value: String(postQuery.data.id),
        label: `${postQuery.data.title} (id: ${postQuery.data.id})`
      })
    }

    return posts
  }, [postsQuery.data, postQuery.data])

  const initForm = useEffectEvent((data: NonNullable<typeof query.data>) => {
    form.initialize({
      forcedPostId: data.forcedPostId ? String(data.forcedPostId) : '',
      cacheDurationInMinutes: data.cacheDurationInMinutes,
    })
  })

  useEffect(() => {
    if (query.data) {
      initForm(query.data)
    }
  }, [query.data])

  return (
    <DrawerLayout title="Nuotraukų nustatymai">
      <form autoComplete="off" onSubmit={form.onSubmit(async (data) => {
        await handleRequest({ createRecord, data })
      }, validationErrorNotification)}>

        <Stack>
          <Select
            key={form.key('forcedPostId')}
            {...form.getInputProps('forcedPostId')}
            label="Rodyti tik"
            data={postQueryData}
            filter={disabledSearchFilter}
            searchValue={searchPost}
            onSearchChange={setSearchPost}
            nothingFoundMessage={nothingFoundMessage}
            clearable
            searchable
          />

          <NumberInput
            key={form.key('cacheDurationInMinutes')}
            {...form.getInputProps('cacheDurationInMinutes')}
            label="Atnaujinimo dažnis (minutėmis)"
            min={1}
            withAsterisk
          />

          <SubmitButton disabled={form.submitting}/>
        </Stack>
      </form>
    </DrawerLayout>
  )
}