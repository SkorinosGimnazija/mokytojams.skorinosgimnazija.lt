import { SubmitButton } from '@/components/buttons/SubmitButton.tsx'
import { useParamId } from '@/hooks/useParamId.tsx'
import { DrawerLayout } from '@/layout/DrawerLayout.tsx'
import {
  useCreateBannerMutation,
  useGetBannerQuery,
  useListLanguagesQuery,
  useUpdateBannerMutation
} from '@/services/generatedApi.ts'
import { createFormData } from '@/utils/formUtils.ts'
import { itemSavedNotification, validationErrorNotification } from '@/utils/notifications.ts'
import { Checkbox, FileInput, Group, Image, NumberInput, Select, SimpleGrid, Stack, TextInput } from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import React, { useEffect, useEffectEvent } from 'react'
import { useNavigate } from 'react-router'

export function UpdateBanner() {
  const { id, isEdit } = useParamId()
  const navigate = useNavigate()

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      id,
      title: '',
      url: '',
      isPublished: true,
      order: 0,
      languageId: 'lt',
      image: null as File | null,
      imageUrl: null as string | null
    },
    validate: {
      title: isNotEmpty(),
      url: isNotEmpty(),
      order: isNotEmpty(),
      languageId: isNotEmpty(),
      image: (value, values) => {
        if (!values.id && !value) return <></>
        return null
      },
    },
    transformValues: (values) => {
      const { imageUrl, ...data } = values
      return data
    }
  })

  const query = useGetBannerQuery(id, { skip: !isEdit || form.initialized })
  const [createRecord] = useCreateBannerMutation()
  const [updateRecord] = useUpdateBannerMutation()
  const languagesQuery = useListLanguagesQuery()

  const initForm = useEffectEvent((data: NonNullable<typeof query.data>) => {
    form.initialize({
      id: data.id,
      title: data.title,
      url: data.url,
      isPublished: data.isPublished,
      order: data.order,
      languageId: String(data.languageId),
      imageUrl: data.imageUrl,
      image: null,
    })
  })

  useEffect(() => {
    if (query.data) {
      initForm(query.data)
    }
  }, [query.data])

  const onSubmit = form.onSubmit(async (values) => {
    const fd = createFormData(values) as any

    const response = isEdit ? await updateRecord(fd) : await createRecord(fd)
    if ('error' in response) {
      return
    }

    itemSavedNotification()
    navigate('..', { relative: 'path', viewTransition: true, preventScrollReset: true })
  }, validationErrorNotification)

  const image = form.getValues().image || form.getValues().imageUrl

  return (
    <DrawerLayout>
      <form autoComplete="off" onSubmit={onSubmit}>
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
            withAsterisk
            maxLength={256}
          />

          <Group grow>
            <NumberInput
              key={form.key('order')}
              {...form.getInputProps('order')}
              withAsterisk
              label="Eilė"
              allowDecimal={false}
            />

            <Select
              key={form.key('languageId')}
              {...form.getInputProps('languageId')}
              withAsterisk
              label="Kalba"
              data={languagesQuery.data?.map((x) => ({ value: String(x.id), label: x.name })) ?? []}
            />
          </Group>

          <Checkbox
            label="Paskelbtas"
            key={form.key('isPublished')}
            {...form.getInputProps('isPublished', { type: 'checkbox' })}
          />

          <SimpleGrid cols={{ base: 1, xs: 2 }}>
            <Stack>
              <FileInput
                key={form.key('image')}
                {...form.getInputProps('image')}
                accept="image/*"
                label="Paveikslėlis"
                placeholder={isEdit ? 'Pakeisti' : undefined}
              />
              <SubmitButton disabled={form.submitting || query.isFetching}/>
            </Stack>

            {image &&
              <Image
                src={typeof image == 'object' ?
                  URL.createObjectURL(image) :
                  import.meta.env.VITE_APP_STATIC_URL + image}
                onLoad={(e) => {
                  const target = e.target as HTMLImageElement
                  URL.revokeObjectURL(target?.currentSrc)
                }}
                fallbackSrc="https://placehold.co/300x100?text=No+preview"
                mah="200px"
                fit="contain"
              />
            }
          </SimpleGrid>

        </Stack>
      </form>
    </DrawerLayout>
  )
}