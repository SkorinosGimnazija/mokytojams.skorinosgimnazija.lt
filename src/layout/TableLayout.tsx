import { Group, Table } from '@mantine/core'
import React from 'react'
import { Outlet } from 'react-router'

interface Props {
  topBar?: React.ReactNode
  topBarRight?: React.ReactNode
  layout?: 'auto' | 'fixed'
  children: React.ReactNode
}

export function TableLayout({ children, topBar, topBarRight, layout = 'auto' }: Props) {
  return (
    <>
      <Outlet/>

      <Group py="md" pr="md">
        <Group grow>
          {topBar}
        </Group>
        <Group>
          {topBarRight}
        </Group>
      </Group>

      <Table
        layout={layout}
        highlightOnHover
        stickyHeader
        stickyHeaderOffset="var(--app-shell-header-height)"
        horizontalSpacing="md"
      >
        {children}
      </Table>
    </>
  )
}