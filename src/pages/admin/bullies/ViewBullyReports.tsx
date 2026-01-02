import { ProtectedComponent } from '@/components/auth/ProtectedComponent.tsx'
import { DeleteButton } from '@/components/buttons/DeleteButton.tsx'
import { EditButton } from '@/components/buttons/EditButton.tsx'
import { CheckMarkIcon } from '@/components/icons/CheckMarkIcon.tsx'
import { useFetchPageInViewport } from '@/hooks/useFetchPageInViewport.tsx'
import { TableLayout } from '@/layout/TableLayout.tsx'
import { useDeleteBullyReportMutation } from '@/services/generatedApi.ts'
import { useListBullyReportsInfiniteQuery } from '@/services/injectedApi.ts'
import { recordsCountText } from '@/utils/constants.ts'
import { formatDate } from '@/utils/dateUtils.ts'
import { ActionIcon, Table, Text } from '@mantine/core'
import { ClipboardTextIcon } from '@phosphor-icons/react'
import React, { useMemo } from 'react'
import { Link } from 'react-router'

export function ViewBullyReports() {
  const query = useListBullyReportsInfiniteQuery({ items: 20 })
  const [deleteRecord] = useDeleteBullyReportMutation()

  const ref = useFetchPageInViewport(query)
  const data = useMemo(() => query.data?.pages.flatMap(x => x.items) ?? [], [query.data])

  return (
    <TableLayout>
      <Table.Thead>
        <Table.Tr>
          <Table.Th w="4%"></Table.Th>
          <Table.Th w="20%">Pranešėjas</Table.Th>
          <Table.Th w="23%">Skriaudėjas</Table.Th>
          <Table.Th w="23%">Auka</Table.Th>
          <Table.Th w="15%">Data</Table.Th>
          <Table.Th w="15%" ta="right" title={recordsCountText}>
            #{query.data?.pages[0].totalItems}
          </Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        {data.map((item, index) => (
          <Table.Tr
            key={item.id}
            ref={index === data.length - 5 ? ref : undefined}
          >
            <Table.Td pr="0">
              <CheckMarkIcon active={!!item.actions}/>
            </Table.Td>
            <Table.Td>
              <Text size="sm">{item.creatorName}</Text>
              {item.isPublicReport ?
                <Text size="sm">Patyčių dėžutė</Text>
                :
                <Text size="xs">Patyčių žurnalas</Text>
              }
            </Table.Td>
            <Table.Td>{item.bullyName}</Table.Td>
            <Table.Td>{item.victimName}</Table.Td>
            <Table.Td>{formatDate(item.createdAt)}</Table.Td>
            <Table.Td ta="right">
              <ActionIcon
                component={Link}
                to={{ pathname: `${item.id}/resolve` }}
                viewTransition
                preventScrollReset={true}
                title="Pranešimas"
                variant="subtle"
                size="2.25rem"
              >
                <ClipboardTextIcon size="1.5rem"/>
              </ActionIcon>
              <ProtectedComponent authRole={'Admin'}>
                <EditButton to={item.id}/>
                <DeleteButton onClick={() => deleteRecord(item.id)}/>
              </ProtectedComponent>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>

    </TableLayout>
  )
}