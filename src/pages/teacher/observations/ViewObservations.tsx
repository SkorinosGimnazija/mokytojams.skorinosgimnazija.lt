import { DeleteButton } from '@/components/buttons/DeleteButton.tsx'
import { EditButton } from '@/components/buttons/EditButton.tsx'
import { NewRecordButton } from '@/components/buttons/NewRecordButton.tsx'
import { useAuth } from '@/hooks/useAuth.tsx'
import { useFetchPageInViewport } from '@/hooks/useFetchPageInViewport.tsx'
import { TableLayout } from '@/layout/TableLayout.tsx'
import { useDeleteObservationMutation } from '@/services/generatedApi.ts'
import { useListObservationsInfiniteQuery } from '@/services/injectedApi.ts'
import { recordsCountText } from '@/utils/constants.ts'
import { Table } from '@mantine/core'
import React, { useMemo } from 'react'

export function ViewObservations() {
  const auth = useAuth()

  const query = useListObservationsInfiniteQuery({ items: 20, creatorId: auth.userId })
  const [deleteRecord] = useDeleteObservationMutation()

  const ref = useFetchPageInViewport(query)
  const data = useMemo(() => query.data?.pages.flatMap(x => x.items) ?? [], [query.data])

  return (
    <TableLayout topBar={<NewRecordButton/>}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th w="30%">Mokinys</Table.Th>
          <Table.Th w="30%">Pamoka</Table.Th>
          <Table.Th w="20%">Data</Table.Th>
          <Table.Th w="20%" ta="right" title={recordsCountText}>
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
            <Table.Td>{item.studentName}</Table.Td>
            <Table.Td>{item.lessonName}</Table.Td>
            <Table.Td>{item.date}</Table.Td>
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