import { useParamId } from '@/hooks/useParamId.tsx'
import { Drawer } from '@mantine/core'
import React from 'react'
import { useNavigate } from 'react-router'

interface Props extends React.PropsWithChildren {
  title?: string;
  closeNavLink?: string;
}

export function DrawerLayout({ children, title, closeNavLink = '../' }: Props) {
  const nav = useNavigate()
  const { isEdit } = useParamId()

  return (
    <Drawer
      opened
      onClose={() => nav(closeNavLink, { relative: 'path', viewTransition: true, preventScrollReset: true })}
      title={title ?? (isEdit ? 'Redagavimas' : 'Naujas įrašas')}
      size="xl"
      position="right"
      offset={5}
      radius={5}
      closeOnClickOutside={false}
      transitionProps={{ transition: 'fade', duration: 500 }}
    >
      {children}
    </Drawer>
  )
}