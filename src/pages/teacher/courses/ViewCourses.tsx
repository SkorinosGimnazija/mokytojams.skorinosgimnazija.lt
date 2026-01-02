import { DeleteButton } from '@/components/buttons/DeleteButton.tsx'
import { EditButton } from '@/components/buttons/EditButton.tsx'
import { NewRecordButton } from '@/components/buttons/NewRecordButton.tsx'
import { useAuth } from '@/hooks/useAuth.tsx'
import { useFetchPageInViewport } from '@/hooks/useFetchPageInViewport.tsx'
import { TableLayout } from '@/layout/TableLayout.tsx'
import { useDeleteCourseMutation } from '@/services/generatedApi.ts'
import { useListCoursesInfiniteQuery } from '@/services/injectedApi.ts'
import { recordsCountText } from '@/utils/constants.ts'
import { formatDate } from '@/utils/dateUtils.ts'
import { Table, Text } from '@mantine/core'
import { useMemo } from 'react'

export function ViewCourses() {
  const auth = useAuth()

  const query = useListCoursesInfiniteQuery({ items: 20, userId: auth.userId })
  const [deleteRecord] = useDeleteCourseMutation()

  const ref = useFetchPageInViewport(query)
  const items = useMemo(() => query.data?.pages.flatMap(x => x.items) ?? [], [query.data])

  return (
    <TableLayout topBar={<NewRecordButton/>}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th w="35%">Pavadinimas</Table.Th>
          <Table.Th w="25%">Organizatorius</Table.Th>
          <Table.Th w="15%">Data</Table.Th>
          <Table.Th w="10%">Trukmė</Table.Th>
          <Table.Th w="15%" ta="right" title={recordsCountText}>#{query.data?.pages[0].totalItems}</Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        {items.map((item, index) => (
          <Table.Tr key={item.id} ref={index === items.length - 5 ? ref : undefined}>
            <Table.Td>{item.title}</Table.Td>
            <Table.Td>{item.organizer}</Table.Td>
            <Table.Td>
              <Text size="sm">{formatDate(item.startDate)}</Text>
              <Text size="sm">{formatDate(item.endDate)}</Text>
            </Table.Td>
            <Table.Td>{item.durationInHours} val.</Table.Td>
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