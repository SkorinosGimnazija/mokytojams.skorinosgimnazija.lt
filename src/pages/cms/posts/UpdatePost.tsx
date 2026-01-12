import { SubmitButton } from '@/components/buttons/SubmitButton.tsx'
import { useParamId } from '@/hooks/useParamId.tsx'
import { PageLayout } from '@/layout/PageLayout.tsx'
import { parsePost } from '@/pages/cms/posts/parsePost.ts'
import { PostPreview } from '@/pages/cms/posts/PostPreview.tsx'
import {
  useCreatePostMutation,
  useGetPostQuery,
  useListLanguagesQuery,
  useUpdatePostMutation
} from '@/services/generatedApi.ts'
import { currentDateTime, ISO } from '@/utils/dateUtils.ts'
import { createFormData } from '@/utils/formUtils.ts'
import { errorNotification, itemSavedNotification, validationErrorNotification } from '@/utils/notifications.ts'
import { ActionIcon, Button, Checkbox, Grid, Group, Popover, Select, Stack, Textarea, TextInput } from '@mantine/core'
import { DateTimePicker } from '@mantine/dates'
import { hasLength, isNotEmpty, useForm } from '@mantine/form'
import { FileIcon, ImageIcon, LinkIcon, YoutubeLogoIcon } from '@phosphor-icons/react'
import React, { useEffect, useEffectEvent, useRef } from 'react'
import { useNavigate } from 'react-router'
import slug from 'slug'
import { FileSelector } from './FileSelector.tsx'
import { ImageSelector } from './ImageSelector.tsx'

export function UpdatePost() {
  const { id, isEdit } = useParamId()
  const navigate = useNavigate()
  const textRef = useRef<HTMLTextAreaElement>(null)

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      id,
      title: '',
      slug: '',
      languageId: 'lt',
      isPublished: true,
      optimizeImages: true,
      isFeatured: false,
      showInFeed: true,
      publishedAt: currentDateTime(),
      modifiedAt: '',
      introText: '',
      text: '',
      meta: '',
      newFeaturedImage: null as File | null,
      oldFeaturedImage: null as string | null,
      oldImages: null as string[] | null,
      newImages: null as File[] | null,
      newFiles: null as File[] | null,
      additional: {
        openedMarkdownPreview: false,
        openedImageSelector: false,
        openedGallerySelector: false,
        openedFileSelector: false,
        fileUrlName: '',
        fileSelected: '',
        filePopoverOpened: false,
        imageSelected: '',
        imagePopoverOpened: false,
        linkName: '',
        linkUrl: '',
        linkPopoverOpened: false,
        youtubeLink: '',
        youtubePopoverOpened: false,
      }
    },
    validateInputOnChange: true,
    validate: {
      title: isNotEmpty(),
      slug: isNotEmpty(),
      languageId: isNotEmpty(),
      publishedAt: isNotEmpty(),
      meta: hasLength({ max: 256 }),
    },
    transformValues: (values) => {
      const { additional, ...data } = values
      return {
        ...data,
        publishedAt: ISO(values.publishedAt),
        modifiedAt: values.modifiedAt ? ISO(values.modifiedAt) : null,
      }
    },
  })

  const query = useGetPostQuery(id, { skip: !isEdit })
  const [createRecord] = useCreatePostMutation()
  const [updateRecord] = useUpdatePostMutation()

  const languagesQuery = useListLanguagesQuery()

  const initForm = useEffectEvent((data: NonNullable<typeof query.data>) => {
    form.initialize({
      ...form.getInitialValues(),
      id: data.id,
      title: data.title ?? '',
      slug: data.slug ?? '',
      languageId: data.languageId,
      isPublished: data.isPublished,
      isFeatured: data.isFeatured,
      showInFeed: data.showInFeed,
      publishedAt: ISO(data.publishedAt),
      modifiedAt: data.modifiedAt ? currentDateTime() : '',
      introText: data.introText ?? '',
      text: data.text ?? '',
      meta: data.meta ?? '',
      oldFeaturedImage: data.featuredImage ?? null,
      oldImages: data.images ?? [],
      optimizeImages: form.getValues().optimizeImages,
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

    if (isEdit) {
      form.setValues({
        id: response.data.id,
        title: response.data.title,
        slug: response.data.slug,
        introText: response.data.introText ?? '',
        text: response.data.text ?? '',
        meta: response.data.meta ?? '',
        oldFeaturedImage: response.data.featuredImage,
        oldImages: response.data.images,
        newImages: null,
        newFiles: null,
        newFeaturedImage: null
      })
    } else {
      navigate(`../${response.data.id}`, { relative: 'path', replace: true, preventScrollReset: true })
    }

    itemSavedNotification()
  }, validationErrorNotification)

  const insertAtCursor = (textToInsert: string, additional: any) => {
    const textInput = textRef.current
    if (!textInput) return

    textInput.setRangeText(textToInsert)
    form.setFieldValue('text', textInput.value, { forceUpdate: false })
    form.setFieldValue('additional', (value) => ({ ...value, ...additional }))
  }

  return (
    <PageLayout>
      <form autoComplete="off" onSubmit={onSubmit}>
        <Stack>

          <Group align="flex-end">
            <Button
              onClick={async () => {
                try {
                  const clipboard = await navigator.clipboard.read()
                  const blob = await clipboard[0].getType('text/html')
                  const html = await blob.text()

                  const data = parsePost({ html })
                  if (!data) {
                    validationErrorNotification()
                    return
                  }

                  form.setValues(data)
                  form.validate()
                } catch (e: any) {
                  errorNotification({ message: e.toString() })
                }
              }}
            >
              Importuoti
            </Button>

            <TextInput
              key={form.key('title')}
              {...form.getInputProps('title')}
              label="Pavadinimas"
              withAsterisk
              flex="1"
            />

            <TextInput
              key={form.key('slug')}
              {...form.getInputProps('slug')}
              label="Nuoroda"
              withAsterisk
              onBlur={(e) => form.setFieldValue('slug', slug(e.target.value))}
              flex="1"
            />
          </Group>

          <Grid>

            <Grid.Col span={9}>
              <Stack>

                <Textarea
                  key={form.key('introText')}
                  {...form.getInputProps('introText')}
                  label="Įžanginis tekstas"
                  rows={3}
                />

                <ActionIcon.Group style={{ marginBlock: '-0.5rem' }}>
                  <Popover
                    opened={form.getValues().additional.filePopoverOpened}
                    onChange={() => form.setFieldValue('additional.filePopoverOpened', v => !v)}
                    position="bottom-start"
                    withArrow
                    shadow="md"
                  >
                    <Popover.Target>
                      <ActionIcon
                        title="Failas"
                        variant="default"
                        size="2rem"
                        onClick={() => form.setFieldValue('additional.filePopoverOpened', v => !v)}
                      >
                        <FileIcon size="1.25rem"/>
                      </ActionIcon>
                    </Popover.Target>
                    <Popover.Dropdown>
                      <Group>
                        <Select
                          key={form.key('additional.fileSelected')}
                          {...form.getInputProps('additional.fileSelected')}
                          placeholder="Failas"
                          data={form.getValues().newFiles?.map((x) => ({ value: x.name, label: x.name })) ?? []}
                          comboboxProps={{ withinPortal: false }}
                        />
                        <TextInput
                          key={form.key('additional.fileUrlName')}
                          {...form.getInputProps('additional.fileUrlName')}
                          placeholder="Pavadinimas"
                        />
                        <Button
                          variant="light"
                          onClick={() => {
                            const fileName = form.getValues().additional.fileSelected
                            const urlName = form.getValues().additional.fileUrlName

                            if (fileName && urlName) {
                              const link = `[${urlName}]({{generate-link-${fileName}}})`
                              insertAtCursor(link, { fileSelected: '', fileUrlName: '', filePopoverOpened: false })
                            }
                          }}
                        >
                          Ok
                        </Button>
                      </Group>
                    </Popover.Dropdown>
                  </Popover>

                  <Popover
                    opened={form.getValues().additional.imagePopoverOpened}
                    onChange={() => form.setFieldValue('additional.imagePopoverOpened', v => !v)}
                    position="bottom-start"
                    withArrow
                    shadow="md"
                  >
                    <Popover.Target>
                      <ActionIcon
                        title="Paveikslėlis"
                        variant="default"
                        size="2rem"
                        onClick={() => form.setFieldValue('additional.imagePopoverOpened', v => !v)}
                      >
                        <ImageIcon size="1.25rem"/>
                      </ActionIcon>
                    </Popover.Target>
                    <Popover.Dropdown>
                      <Group>
                        <Select
                          key={form.key('additional.imageSelected')}
                          {...form.getInputProps('additional.imageSelected')}
                          placeholder="Paveikslėlis"
                          data={form.getValues().newFiles?.filter((x) => x.type.startsWith('image/')).map((x) => ({
                            value: x.name,
                            label: x.name
                          })) ?? []}
                          comboboxProps={{ withinPortal: false }}
                        />
                        <Button
                          variant="light"
                          onClick={async () => {
                            const imageName = form.getValues().additional.imageSelected
                            const image = form.getValues().newFiles?.find((x) => x.name === imageName)

                            if (imageName && image) {
                              const { width, height } = await createImageBitmap(image)
                              const img = `<img src="{{generate-link-${imageName}}}" width="${width}" height="${height}" style="margin:auto" alt="" />`
                              insertAtCursor(img, { imageSelected: '', imagePopoverOpened: false })
                            }
                          }}
                        >
                          Ok
                        </Button>
                      </Group>
                    </Popover.Dropdown>
                  </Popover>

                  <Popover
                    opened={form.getValues().additional.linkPopoverOpened}
                    onChange={() => form.setFieldValue('additional.linkPopoverOpened', v => !v)}
                    position="bottom-start"
                    withArrow
                    shadow="md"
                  >
                    <Popover.Target>
                      <ActionIcon
                        title="Nuoroda"
                        variant="default"
                        size="2rem"
                        onClick={() => form.setFieldValue('additional.linkPopoverOpened', v => !v)}
                      >
                        <LinkIcon size="1.25rem"/>
                      </ActionIcon>
                    </Popover.Target>
                    <Popover.Dropdown>
                      <Group>
                        <TextInput
                          key={form.key('additional.linkName')}
                          {...form.getInputProps('additional.linkName')}
                          placeholder="Pavadinimas"
                        />
                        <TextInput
                          key={form.key('additional.linkUrl')}
                          {...form.getInputProps('additional.linkUrl')}
                          placeholder="Nuoroda"
                        />
                        <Button
                          variant="light"
                          onClick={() => {
                            const linkName = form.getValues().additional.linkName
                            const linkUrl = form.getValues().additional.linkUrl

                            if (linkName && linkUrl) {
                              const link = `[${linkName}](${linkUrl})`
                              insertAtCursor(link, { linkName: '', linkUrl: '', linkPopoverOpened: false })
                            }
                          }}
                        >
                          Ok
                        </Button>
                      </Group>
                    </Popover.Dropdown>
                  </Popover>


                  <Popover
                    opened={form.getValues().additional.youtubePopoverOpened}
                    onChange={() => form.setFieldValue('additional.youtubePopoverOpened', v => !v)}
                    position="bottom-start"
                    withArrow
                    shadow="md"
                  >
                    <Popover.Target>
                      <ActionIcon
                        title="Youtube"
                        variant="default"
                        size="2rem"
                        onClick={() => form.setFieldValue('additional.youtubePopoverOpened', v => !v)}
                      >
                        <YoutubeLogoIcon size="1.25rem"/>
                      </ActionIcon>
                    </Popover.Target>
                    <Popover.Dropdown>
                      <Group>
                        <TextInput
                          key={form.key('additional.youtubeLink')}
                          {...form.getInputProps('additional.youtubeLink')}
                          placeholder="YouTube Nuoroda"
                        />
                        <Button
                          variant="light"
                          onClick={() => {
                            const youtubeLink = form.getValues().additional.youtubeLink
                            const urlObj = new URL(youtubeLink)
                            const videoId = urlObj.hostname === 'youtu.be'
                              ? urlObj.pathname.slice(1)
                              : urlObj.searchParams.get('v')

                            if (youtubeLink && videoId) {
                              const youtube = `<Youtube id="${videoId}" src="${youtubeLink}" />`
                              insertAtCursor(youtube, { youtubeLink: '', youtubePopoverOpened: false })
                            }
                          }}
                        >
                          Ok
                        </Button>
                      </Group>
                    </Popover.Dropdown>
                  </Popover>

                </ActionIcon.Group>

                <Textarea
                  key={form.key('text')}
                  {...form.getInputProps('text')}
                  ref={textRef}
                  label="Pilnas tekstas"
                  rows={10}
                />

                <Textarea
                  key={form.key('meta')}
                  {...form.getInputProps('meta')}
                  label="Meta aprašymas"
                  rows={3}
                />

              </Stack>
            </Grid.Col>

            <Grid.Col span={3}>
              <Stack>

                <Select
                  key={form.key('languageId')}
                  {...form.getInputProps('languageId')}
                  withAsterisk
                  label="Kalba"
                  data={languagesQuery.data?.map((x) => ({ value: String(x.id), label: x.name })) ?? []}
                />

                <DateTimePicker
                  key={form.key('publishedAt')}
                  {...form.getInputProps('publishedAt')}
                  withAsterisk
                  label="Publikavimo data"
                  valueFormat="YYYY-MM-DD HH:mm"
                  highlightToday
                />

                <DateTimePicker
                  key={form.key('modifiedAt')}
                  {...form.getInputProps('modifiedAt')}
                  label="Atnaujinimo data"
                  valueFormat="YYYY-MM-DD HH:mm"
                  highlightToday
                  clearable
                />

                <Group justify="space-between">
                  <Checkbox
                    label="Paskelbtas"
                    key={form.key('isPublished')}
                    {...form.getInputProps('isPublished', { type: 'checkbox' })}
                  />
                  <Checkbox
                    label="Rodyti naujienose"
                    key={form.key('showInFeed')}
                    {...form.getInputProps('showInFeed', { type: 'checkbox' })}
                  />
                  <Checkbox
                    label="Išskirtinis"
                    key={form.key('isFeatured')}
                    {...form.getInputProps('isFeatured', { type: 'checkbox' })}
                  />
                  <Checkbox
                    label="Optimizuoti galeriją"
                    key={form.key('optimizeImages')}
                    {...form.getInputProps('optimizeImages', { type: 'checkbox' })}
                  />
                </Group>

                <Stack gap="xs">
                  <Button
                    variant="light"
                    onClick={() => form.setFieldValue('additional.openedImageSelector', true)}
                  >
                    Titulinis vaizdas
                  </Button>
                  <Button
                    variant="light"
                    onClick={() => form.setFieldValue('additional.openedGallerySelector', true)}
                  >
                    Galerija
                  </Button>
                  <Button
                    variant="light"
                    onClick={() => form.setFieldValue('additional.openedFileSelector', true)}
                  >
                    Failai
                  </Button>
                  <Button
                    variant="light"
                    onClick={() => form.setFieldValue('additional.openedMarkdownPreview', true)}
                  >
                    Peržiūrėti
                  </Button>

                  <SubmitButton w="100%" disabled={form.submitting || query.isFetching}/>
                </Stack>

              </Stack>
            </Grid.Col>

          </Grid>
        </Stack>
      </form>

      <ImageSelector
        opened={form.getValues().additional.openedImageSelector}
        onClose={() => form.setFieldValue('additional.openedImageSelector', false)}
        title="Pasirinkti titulinį vaizdą"
        multiple={false}
        currentImages={form.getValues().newFeaturedImage}
        oldImages={form.getValues().oldFeaturedImage}
        onSelect={(newImages, oldImages) => {
          form.setFieldValue('newFeaturedImage', newImages[0])
          form.setFieldValue('oldFeaturedImage', oldImages[0])
        }}
      />

      <ImageSelector
        opened={form.getValues().additional.openedGallerySelector}
        onClose={() => form.setFieldValue('additional.openedGallerySelector', false)}
        title="Papildyti galeriją"
        multiple={true}
        currentImages={form.getValues().newImages}
        oldImages={form.getValues().oldImages}
        onSelect={(newImages, oldImages) => {
          form.setFieldValue('newImages', newImages)
          form.setFieldValue('oldImages', oldImages)
        }}
      />

      <FileSelector
        opened={form.getValues().additional.openedFileSelector}
        onClose={() => form.setFieldValue('additional.openedFileSelector', false)}
        title="Pridėti failus"
        multiple={true}
        currentFiles={form.getValues().newFiles}
        onSelect={(newFiles) => {
          form.setFieldValue('newFiles', newFiles)
        }}
      />

      <PostPreview
        opened={form.getValues().additional.openedMarkdownPreview}
        onClose={() => form.setFieldValue('additional.openedMarkdownPreview', false)}
        title={form.getValues().title}
        intro={form.getValues().introText}
        text={form.getValues().text}
      />

    </PageLayout>
  )
}