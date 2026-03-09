import { ProtectedComponent } from '@/components/auth/ProtectedComponent.tsx'
import { DeleteButton } from '@/components/buttons/DeleteButton.tsx'
import { EditButton } from '@/components/buttons/EditButton.tsx'
import { useFetchPageInViewport } from '@/hooks/useFetchPageInViewport.tsx'
import { TableLayout } from '@/layout/TableLayout.tsx'
import { useDeleteObservationMutation } from '@/services/generatedApi.ts'
import { useListObservationsInfiniteQuery } from '@/services/injectedApi.ts'
import { recordsCountText } from '@/utils/constants.ts'
import { Button, Table, Text } from '@mantine/core'
import React, { useMemo } from 'react'
import { Link } from 'react-router'

export function ViewObservations() {
  const query = useListObservationsInfiniteQuery({ items: 20 })
  const [deleteRecord] = useDeleteObservationMutation()

  const ref = useFetchPageInViewport(query)
  const data = useMemo(() => query.data?.pages.flatMap(x => x.items) ?? [], [query.data])

  return (
    <TableLayout
      topBar={
        <>
          <ProtectedComponent authRole="Admin">
            <Button variant="light" component={Link} to="students">Mokiniai</Button>
            <Button variant="light" component={Link} to="lessons">Pamokos</Button>
            <Button variant="light" component={Link} to="types">Pasirinkimai</Button>
          </ProtectedComponent>
          <Button variant="light" component={Link} to="stats">Statistika</Button>
        </>
      }
    >
      <Table.Thead>
        <Table.Tr>
          <Table.Th w="30%">Mokytojas</Table.Th>
          <Table.Th w="30%">Mokinys</Table.Th>
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
            <Table.Td>
              {item.creatorName}
              <Text size="xs">{item.lessonName}</Text>
            </Table.Td>
            <Table.Td>{item.studentName}</Table.Td>
            <Table.Td>{item.date}</Table.Td>
            <Table.Td ta="right">
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