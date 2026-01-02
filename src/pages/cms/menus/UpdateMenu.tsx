import { SubmitButton } from '@/components/buttons/SubmitButton.tsx'
import { useParamId } from '@/hooks/useParamId.tsx'
import { useRequestHandler } from '@/hooks/useRequestHandler.tsx'
import { DrawerLayout } from '@/layout/DrawerLayout.tsx'
import {
  useCreateMenuMutation,
  useGetMenuQuery,
  useListLanguagesQuery,
  useListMenusQuery,
  useUpdateMenuMutation
} from '@/services/generatedApi.ts'
import { useListPostsInfiniteQuery } from '@/services/injectedApi.ts'
import { nothingFoundMessage } from '@/utils/constants.ts'
import { validationErrorNotification } from '@/utils/notifications.ts'
import { disabledSearchFilter, lithuanianSearchFilter, normalizeLithuanian } from '@/utils/optionFilters.ts'
import { ActionIcon, Checkbox, Group, NumberInput, Select, Stack, TextInput } from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import { useDebouncedValue } from '@mantine/hooks'
import { LightningIcon } from '@phosphor-icons/react'
import React, { useEffect, useEffectEvent, useMemo, useState } from 'react'
import slug from 'slug'

export function UpdateMenu() {
  const { id, isEdit } = useParamId()
  const [searchPost, setSearchPost] = useState<string>()
  const [searchPostDebounced] = useDebouncedValue(searchPost, 200)

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      id,
      title: '',
      order: 0,
      isPublished: true,
      isHidden: false,
      languageId: 'lt',
      url: '',
      postId: '',
      parentMenuId: '',
    },
    validate: {
      title: isNotEmpty(),
      order: isNotEmpty(),
      languageId: isNotEmpty(),
    },
    transformValues: (values) => {
      return {
        ...values,
        postId: !values.postId ? null : Number(values.postId),
        parentMenuId: !values.parentMenuId ? null : Number(values.parentMenuId),
      }
    },
  })

  const query = useGetMenuQuery(id, { skip: !isEdit || form.initialized })
  const [createRecord] = useCreateMenuMutation()
  const [updateRecord] = useUpdateMenuMutation()
  const handleRequest = useRequestHandler()

  const postsQuery = useListPostsInfiniteQuery(
    { items: 10, searchTerm: searchPostDebounced },
    { skip: !form.isTouched('postId') }
  )
  const postQueryData = useMemo(() => {
    const posts =
      postsQuery.data?.pages[0].items.filter(x => x.id != query.data?.postId).map(x => ({
        value: String(x.id),
        label: x.title
      })) ?? []

    if (query.data?.postId) {
      posts.push({ value: String(query.data.postId), label: query.data.postTitle! })
    }

    return posts
  }, [postsQuery.data, query.data])

  const languagesQuery = useListLanguagesQuery(undefined, {
    selectFromResult: ({ data }) => ({
      data: data?.map(x => ({
        value: String(x.id),
        label: x.name
      })) ?? []
    })
  })

  const menusQuery = useListMenusQuery(undefined, {
    selectFromResult: ({ data }) => ({
      data: data?.filter(x => !x.url && x.id != id).map(x => ({
        value: String(x.id),
        label: x.title,
        normalizedName: normalizeLithuanian(x.title)
      })) ?? []
    })
  })

  const initForm = useEffectEvent((data: NonNullable<typeof query.data>) => {
    form.initialize({
      id: data.id,
      title: data.title,
      order: data.order,
      isPublished: data.isPublished,
      isHidden: data.isHidden,
      languageId: data.languageId,
      url: data.url ?? '',
      postId: data.postId ? String(data.postId) : '',
      parentMenuId: data.parentMenuId ? String(data.parentMenuId) : '',
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
            key={form.key('title')}
            {...form.getInputProps('title')}
            label="Pavadinimas"
            withAsterisk
            maxLength={256}
          />

          <TextInput
            key={form.key('url')}
            {...form.getInputProps('url')}
            label="Nuoroda"
            maxLength={256}
            rightSection={
              <ActionIcon
                title="Auto"
                variant="subtle"
                onClick={() => {
                  const { title, parentMenuId } = form.getValues()
                  const parentTitle = menusQuery.data.find(x => x.value == parentMenuId)?.label
                  const slugified = [parentTitle, title].filter(Boolean).map(x => slug(x!)).join('/')
                  form.setFieldValue('url', slugified)
                }}
              >
                <LightningIcon/>
              </ActionIcon>
            }
          />

          <Group grow>
            <NumberInput
              key={form.key('order')}
              {...form.getInputProps('order')}
              label="Eilė"
              withAsterisk
              allowDecimal={false}
            />

            <Select
              key={form.key('languageId')}
              {...form.getInputProps('languageId')}
              label="Kalba"
              withAsterisk
              data={languagesQuery.data}
            />
          </Group>

          <Group grow>
            <Select
              key={form.key('postId')}
              {...form.getInputProps('postId')}
              label="Naujiena"
              data={postQueryData}
              filter={disabledSearchFilter}
              searchValue={searchPost}
              onSearchChange={setSearchPost}
              nothingFoundMessage={nothingFoundMessage}
              clearable
              searchable
            />

            <Select
              key={form.key('parentMenuId')}
              {...form.getInputProps('parentMenuId')}
              label="Tėvinis meniu"
              data={menusQuery.data}
              filter={lithuanianSearchFilter}
              nothingFoundMessage={nothingFoundMessage}
              clearable
              searchable
            />
          </Group>

          <Group>
            <Checkbox
              label="Paskelbtas"
              key={form.key('isPublished')}
              {...form.getInputProps('isPublished', { type: 'checkbox' })}
            />

            <Checkbox
              label="Paslėptas"
              key={form.key('isHidden')}
              {...form.getInputProps('isHidden', { type: 'checkbox' })}
            />
          </Group>

          <SubmitButton disabled={form.submitting || query.isFetching}/>
        </Stack>
      </form>
    </DrawerLayout>
  )
}