import { useParamId } from '@/hooks/useParamId.tsx'
import { Drawer } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

interface Props extends React.PropsWithChildren {
  title?: string;
  closeNavLink?: string;
}

export function DrawerLayout({ children, title, closeNavLink = '../' }: Props) {
  const nav = useNavigate()
  const { isEdit } = useParamId()
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setOpened(true), 10)
    return () => clearTimeout(id)
  }, [])

  const handleClose = () => {
    setOpened(false)
    setTimeout(() => {nav(closeNavLink, { relative: 'path', preventScrollReset: true })}, 300)
  }

  return (
    <Drawer
      opened={opened}
      title={title ?? (isEdit ? 'Redagavimas' : 'Naujas įrašas')}
      onClose={handleClose}
      size="xl"
      position="right"
      offset={5}
      radius={5}
      closeOnClickOutside={false}
      transitionProps={{ duration: 300 }}
    >
      {children}
    </Drawer>
  )
}