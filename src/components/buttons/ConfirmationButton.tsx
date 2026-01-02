import { ActionIcon } from '@mantine/core'
import { modals } from '@mantine/modals'
import React from 'react'

interface Props {
  onClick: () => void
  tooltipTitle: string
  modalTitle: string
  icon: React.ReactNode
}

export function ConfirmationButton({ modalTitle, tooltipTitle, onClick, icon }: Props) {
  return (
    <ActionIcon
      title={tooltipTitle}
      variant="subtle"
      size={36}
      onClick={() =>
        modals.openConfirmModal({
          title: modalTitle,
          onConfirm: onClick,
          centered: true,
          transitionProps: { transition: 'fade', duration: 200 }
        })}
    >
      {icon}
    </ActionIcon>
  )
}