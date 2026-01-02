import { Breadcrumbs } from '@/components/app/Breadcrumbs.tsx'
import { Navigation } from '@/components/app/Navigation.tsx'
import { NavigationLoadingBar } from '@/components/app/NavigationLoadingBar.tsx'
import { ToggleThemeButton } from '@/components/app/ToggleThemeButton.tsx'
import { UserProfileButton } from '@/components/app/UserProfileButton.tsx'
import { AppShell, Burger, Group, ScrollArea, Stack, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import React from 'react'
import { Outlet, ScrollRestoration } from 'react-router'

export function App() {
  const [openedDisclosure, { open: openDisclosure, close: closeDisclosure }] = useDisclosure()

  return (
    <AppShell
      layout="alt"
      padding="xs"
      withBorder={false}
      header={{ height: { base: 48, md: 60 } }}
      navbar={{
        width: 300,
        breakpoint: 'md',
        collapsed: { mobile: !openedDisclosure }
      }}
    >
      <ScrollRestoration/>
      <NavigationLoadingBar/>

      <AppShell.Header>
        <Group h="100%" justify="space-between" wrap="nowrap">

          <Burger onClick={openDisclosure} hiddenFrom="md" size="1.5rem"/>
          <Breadcrumbs/>

          <Group wrap="nowrap">
            <ToggleThemeButton/>
            <UserProfileButton/>
          </Group>

        </Group>
      </AppShell.Header>

      <AppShell.Navbar>
        <Stack>

          <Group>
            <Burger opened onClick={closeDisclosure} hiddenFrom="md" size="sm"/>
            <Title size="lg" mx="auto">P. Skorinos gimnazija</Title>
          </Group>

          <ScrollArea scrollHideDelay={0} scrollbarSize={4} offsetScrollbars>
            <Navigation onClick={closeDisclosure}/>
          </ScrollArea>

        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet/>
      </AppShell.Main>

    </AppShell>
  )
}