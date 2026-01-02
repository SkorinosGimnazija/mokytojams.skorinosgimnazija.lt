import { ActionIcon, Button, FileButton, List, Modal, Stack, Text } from '@mantine/core'
import { TrashIcon, UploadSimpleIcon } from '@phosphor-icons/react'
import React, { useEffect, useState } from 'react'

interface Props {
  opened: boolean
  onClose: () => void
  onSelect: (newFiles: File[]) => void
  title: string
  multiple?: boolean
  currentFiles?: File | File[] | null
}

export function FileSelector({ opened, onClose, onSelect, title, multiple, currentFiles }: Props) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  useEffect(() => {
    if (!currentFiles) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedFiles([])
    }
  }, [currentFiles])

  const handleFileSelect = (files: File | File[] | null) => {
    if (!files) {
      return
    }

    const selected = [files].flat()

    setSelectedFiles(prev => {
      if (!multiple) {
        return selected
      }

      const newFiles = selected.filter(x => !prev.some(p => p.name === x.name))
      return [...prev, ...newFiles]
    })
  }

  const removePreviewFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i != index))
  }

  const onConfirm = () => {
    onSelect(selectedFiles)
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
          multiple={multiple}
        >
          {(props) => (
            <Button {...props} leftSection={<UploadSimpleIcon size={16}/>}>
              Pasirinkti
            </Button>
          )}
        </FileButton>

        <List spacing="xs">
          {selectedFiles.map((file, index) => (
            <List.Item
              key={file.name}
              icon={
                <ActionIcon
                  color="red"
                  variant="filled"
                  size="sm"
                  onClick={() => removePreviewFile(index)}
                >
                  <TrashIcon/>
                </ActionIcon>
              }>
              <Text c="blue">{file.name}</Text>
            </List.Item>
          ))}
        </List>

      </Stack>
    </Modal>
  )
}