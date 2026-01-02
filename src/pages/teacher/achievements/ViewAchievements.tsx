import { DeleteButton } from '@/components/buttons/DeleteButton.tsx'
import { EditButton } from '@/components/buttons/EditButton.tsx'
import { NewRecordButton } from '@/components/buttons/NewRecordButton.tsx'
import { useAuth } from '@/hooks/useAuth.tsx'
import { useFetchPageInViewport } from '@/hooks/useFetchPageInViewport.tsx'
import { TableLayout } from '@/layout/TableLayout.tsx'
import { useDeleteAchievementMutation } from '@/services/generatedApi.ts'
import { useListAchievementsInfiniteQuery } from '@/services/injectedApi.ts'
import { recordsCountText } from '@/utils/constants.ts'
import { formatDate } from '@/utils/dateUtils.ts'
import { Table, Text } from '@mantine/core'
import { useMemo } from 'react'

export function ViewAchievements() {
  const auth = useAuth()

  const query = useListAchievementsInfiniteQuery({ items: 20, userId: auth.userId })
  const [deleteRecord] = useDeleteAchievementMutation()
  const ref = useFetchPageInViewport(query)
  const items = useMemo(() => query.data?.pages.flatMap(x => x.items) ?? [], [query.data])

  return (
    <TableLayout topBar={<NewRecordButton/>}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th w="30%">Renginys</Table.Th>
          <Table.Th w="25%">Mokiniai</Table.Th>
          <Table.Th w="20%">Mokytojai</Table.Th>
          <Table.Th w="10%">Data</Table.Th>
          <Table.Th w="15%" ta="right" title={recordsCountText}>#{query.data?.pages[0].totalItems}</Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        {items.map((item, index) => (
          <Table.Tr key={item.id} ref={index === items.length - 5 ? ref : undefined}>
            <Table.Td>
              {item.name}
              <Text size="xs">{item.scaleName}</Text>
            </Table.Td>
            <Table.Td>
              {item.students.map(x => {
                return <Text size="sm" key={x.id}>{x.name} {x.classroomName} ({x.achievementTypeName})</Text>
              })}
            </Table.Td>
            <Table.Td>
              {item.creatorName}
              {item.additionalTeachers.map(x => {
                return <Text size="sm" key={x.id}>{x.name}</Text>
              })}
            </Table.Td>
            <Table.Td>{formatDate(item.date)}</Table.Td>
            <Table.Td ta="right">
              {auth.userId === item.creatorId && (
                <>
                  <EditButton to={item.id}/>
                  <DeleteButton onClick={() => deleteRecord(item.id)}/>
                </>
              )}
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </TableLayout>
  )
}