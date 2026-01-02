import { DeleteButton } from '@/components/buttons/DeleteButton.tsx'
import { EditButton } from '@/components/buttons/EditButton.tsx'
import { NewRecordButton } from '@/components/buttons/NewRecordButton.tsx'
import { useAuth } from '@/hooks/useAuth.tsx'
import { useFetchPageInViewport } from '@/hooks/useFetchPageInViewport.tsx'
import { TableLayout } from '@/layout/TableLayout.tsx'
import { useDeleteBullyReportMutation } from '@/services/generatedApi.ts'
import { useListBullyReportsInfiniteQuery } from '@/services/injectedApi.ts'
import { recordsCountText } from '@/utils/constants.ts'
import { formatDate } from '@/utils/dateUtils.ts'
import { Table } from '@mantine/core'
import React, { useMemo } from 'react'

export function ViewBullyReports() {
  const auth = useAuth()

  const query = useListBullyReportsInfiniteQuery({ items: 20, userId: auth.userId })
  const [deleteRecord] = useDeleteBullyReportMutation()

  const ref = useFetchPageInViewport(query)
  const data = useMemo(() => query.data?.pages.flatMap(x => x.items) ?? [], [query.data])

  return (
    <TableLayout topBar={<NewRecordButton/>}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th w="30%">Skriaudėjas</Table.Th>
          <Table.Th w="30%">Auka</Table.Th>
          <Table.Th w="25%">Data</Table.Th>
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
            <Table.Td>{item.bullyName}</Table.Td>
            <Table.Td> {item.victimName}</Table.Td>
            <Table.Td>{formatDate(item.date)}</Table.Td>
            <Table.Td ta="right">
              <EditButton to={item.id}/>
              <DeleteButton onClick={() => deleteRecord(item.id)}/>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>

    </TableLayout>
  )
}