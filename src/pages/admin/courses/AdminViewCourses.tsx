import { ProtectedComponent } from '@/components/auth/ProtectedComponent.tsx'
import { DeleteButton } from '@/components/buttons/DeleteButton.tsx'
import { EditButton } from '@/components/buttons/EditButton.tsx'
import { useFetchPageInViewport } from '@/hooks/useFetchPageInViewport.tsx'
import { TableLayout } from '@/layout/TableLayout.tsx'
import { useDeleteCourseMutation } from '@/services/generatedApi.ts'
import { useListCoursesInfiniteQuery } from '@/services/injectedApi.ts'
import { recordsCountText } from '@/utils/constants.ts'
import { formatDate } from '@/utils/dateUtils.ts'
import { Button, Table, Text } from '@mantine/core'
import React, { useMemo } from 'react'
import { Link } from 'react-router'

export function AdminViewCourses() {
  const query = useListCoursesInfiniteQuery({ items: 20 })
  const [deleteRecord] = useDeleteCourseMutation()
  const ref = useFetchPageInViewport(query)
  const items = useMemo(() => query.data?.pages.flatMap(x => x.items) ?? [], [query.data])

  return (
    <TableLayout topBar={<Button variant="light" component={Link} to="stats">Statistika</Button>}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th w="45%">Pavadinimas</Table.Th>
          <Table.Th w="20%">Mokytojas</Table.Th>
          <Table.Th w="10%">Data</Table.Th>
          <Table.Th w="10%">Trukmė</Table.Th>
          <Table.Th w="15%" ta="right" title={recordsCountText}>#{query.data?.pages[0].totalItems}</Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        {items.map((item, index) => (
          <Table.Tr key={item.id} ref={index === items.length - 5 ? ref : undefined}>
            <Table.Td>
              {item.title}
              <Text size="xs">{item.organizer}</Text>
            </Table.Td>
            <Table.Td>{item.creatorName}</Table.Td>
            <Table.Td>
              <Text size="sm">{formatDate(item.startDate)}</Text>
              <Text size="sm">{formatDate(item.endDate)}</Text>
            </Table.Td>
            <Table.Td>{item.durationInHours} val.</Table.Td>
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