import { useAppDispatch } from '@/hooks/useAppDispatch.tsx'
import { useAuth } from '@/hooks/useAuth.tsx'
import { setId, setRoles } from '@/store/authSlice.ts'
import { ActionIcon, Menu, Text } from '@mantine/core'
import { SignOutIcon, UserIcon } from '@phosphor-icons/react'
import React from 'react'

export function UserProfileButton() {
  const auth = useAuth()
  const dispatch = useAppDispatch()

  if (!auth.isAuthenticated) {
    return (
      <ActionIcon variant="default" size={36} disabled>
        <UserIcon size={26}/>
      </ActionIcon>
    )
  }

  return (
    <Menu shadow="md" width={200} position="bottom-end" withinPortal={false}>

      <Menu.Target>
        <ActionIcon variant="default" size={36}>
          <Text fw={500} size="lg" tt="uppercase">
            {auth.name.at(0)}
          </Text>
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>

        <Menu.Label>{auth.name}</Menu.Label>
        <Menu.Divider/>

        <Menu.Item
          leftSection={<SignOutIcon size="1rem"/>}
          onClick={() => auth.logout()}
        >
          Atsijungti
        </Menu.Item>

        {import.meta.env.DEV && ( // todo delete?
          <>
            <Menu.Divider/>

            <Menu.Item onClick={() => dispatch(setRoles(['Admin', 'Teacher', 'Manager', 'Tech', 'Social']))}>
              Admin
            </Menu.Item>

            <Menu.Item onClick={() => dispatch(setRoles(['Teacher']))}>
              Teacher
            </Menu.Item>

            <Menu.Item onClick={() => dispatch(setRoles(['Manager']))}>
              Manager
            </Menu.Item>

            <Menu.Item onClick={() => dispatch(setRoles(['Tech']))}>
              Tech
            </Menu.Item>

            <Menu.Item onClick={() => dispatch(setRoles(['Social']))}>
              Social
            </Menu.Item>

            <Menu.Divider/>

            <Menu.Item onClick={() => dispatch(setId(2))}>
              Change user id
            </Menu.Item>
          </>
        )}

      </Menu.Dropdown>

    </Menu>
  )
}