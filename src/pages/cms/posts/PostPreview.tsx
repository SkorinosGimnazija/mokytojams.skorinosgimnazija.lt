import { Markdown } from '@/components/markdown/Markdown.tsx'
import { Modal } from '@mantine/core'
import React from 'react'

interface Props {
  opened: boolean
  onClose: () => void
  title: string
  intro: string
  text: string
}

export function PostPreview({ opened, onClose, title, intro, text }: Props) {
  return (
    <Modal
      title={title}
      opened={opened}
      onClose={onClose}
      size="xl"
    >
      <Markdown>
        {intro}
      </Markdown>
      <hr/>
      <Markdown>
        {text}
      </Markdown>
    </Modal>
  )
}