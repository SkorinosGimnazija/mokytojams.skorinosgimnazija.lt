import { ActionIcon, Button, FileButton, Image, Modal, SimpleGrid, Stack } from '@mantine/core'
import { TrashIcon, UploadSimpleIcon } from '@phosphor-icons/react'
import React, { useEffect, useState } from 'react'

interface Props {
  opened: boolean
  onClose: () => void
  onSelect: (newFiles: File[], remainingOldImages: string[]) => void
  title: string
  multiple?: boolean
  oldImages?: string | string[] | null
  currentImages?: File | File[] | null
}

export function ImageSelector({ opened, onClose, onSelect, title, multiple, oldImages, currentImages }: Props) {
  const [selectedImages, setSelectedImages] = useState<{ file: File, url: string }[]>([])
  const [currentOldImages, setCurrentOldImages] = useState<string[]>([])

  useEffect(() => {
    return () => {
      selectedImages.forEach(({ url }) => URL.revokeObjectURL(url))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setCurrentOldImages(oldImages ? [oldImages].flat() : [])
  }, [oldImages])

  useEffect(() => {
    if (!currentImages) {
      setSelectedImages(prev => {
        prev.forEach(({ url }) => URL.revokeObjectURL(url))
        return []
      })
    }
  }, [currentImages])

  const handleFileSelect = (files: File | File[] | null) => {
    if (!files) {
      return
    }

    const selected = [files].flat().map(file => ({ file, url: URL.createObjectURL(file) }))

    setSelectedImages(prev => {
      if (!multiple) {
        return selected
      }

      const newFiles = selected.filter(x => !prev.some(p => p.file.name === x.file.name))
      return [...prev, ...newFiles]
    })
  }

  const removePreviewImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i != index))
  }

  const removeOldImage = (index: number) => {
    setCurrentOldImages(prev => prev.filter((_, i) => i != index))
  }

  const onConfirm = () => {
    const newFiles = selectedImages.map(({ file }) => file)
    onSelect(newFiles, currentOldImages)
    onClose()
  }

  return (
    <Modal
      title={title}
      opened={opened}
      onClose={onConfirm}
      size="lg"
    >
      <Stack>
        <FileButton
          onChange={handleFileSelect}
          accept="image/*"
          multiple={multiple}
        >
          {(props) => (
            <Button {...props} leftSection={<UploadSimpleIcon size={16}/>}>
              Pasirinkti
            </Button>
          )}
        </FileButton>

        <SimpleGrid cols={{ base: 2, sm: 3 }} spacing="md">
          {(multiple || !selectedImages.length) && currentOldImages.map((url, index) => (
            <div key={url} style={{ position: 'relative' }}>
              <Image
                src={import.meta.env.VITE_APP_STATIC_URL + url}
                radius="md"
                h={120}
                fit="cover"
              />
              <ActionIcon
                color="red"
                variant="filled"
                size="sm"
                style={{ position: 'absolute', top: 3, right: 3 }}
                onClick={() => removeOldImage(index)}
              >
                <TrashIcon/>
              </ActionIcon>
            </div>
          ))}
          {selectedImages.map(({ url }, index) => (
            <div key={url} style={{ position: 'relative' }}>
              <Image
                src={url}
                radius="md"
                h={120}
                fit="cover"
                fallbackSrc="https://placehold.co/600x400?text=No+preview"
              />
              <ActionIcon
                color="red"
                variant="filled"
                size="sm"
                style={{ position: 'absolute', top: 3, right: 3 }}
                onClick={() => removePreviewImage(index)}
              >
                <TrashIcon/>
              </ActionIcon>
            </div>
          ))}
        </SimpleGrid>
      </Stack>
    </Modal>
  )
}