import { useRoutes } from '@/hooks/useRoutes.tsx'
import { NavLink } from '@mantine/core'
import { CaretDoubleRightIcon } from '@phosphor-icons/react/CaretDoubleRight'
import React from 'react'
import { NavLink as RouterLink } from 'react-router'

interface Props {
  onClick: () => void
}

export function Navigation({ onClick }: Props) {
  const { authorizedRoutes } = useRoutes()

  return authorizedRoutes.map((group) => (
    <NavLink
      key={group.path}
      label={group.handle.breadcrumb.title}
      leftSection={React.createElement(group.icon, { size: '1.25rem' })}
      variant="subtle"
      defaultOpened
      active
    >
      {group.routes.map((route) => (
        <NavLink
          key={route.path}
          label={route.handle.breadcrumb.title}
          leftSection={<CaretDoubleRightIcon size="1rem" style={{ transform: 'translateY(1px)' }}/>}
          to={`/${group.path}/${route.path}`}
          component={RouterLink}
          onClick={onClick}
        />
      ))}
    </NavLink>
  ))
}