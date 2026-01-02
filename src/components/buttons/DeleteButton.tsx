import { ConfirmationButton } from '@/components/buttons/ConfirmationButton.tsx'
import { TrashIcon } from '@phosphor-icons/react'
import React from 'react'

interface Props {
  onClick: () => void
}

export function DeleteButton({ onClick }: Props) {
  return (
    <ConfirmationButton
      icon={<TrashIcon size="1.5rem" color="red"/>}
      onClick={onClick}
      modalTitle="Ištrinti įrašą?"
      tooltipTitle="Ištrinti"
    />
  )
}