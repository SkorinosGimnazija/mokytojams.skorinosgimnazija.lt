import { DeleteButton } from '@/components/buttons/DeleteButton.tsx'
import { EditButton } from '@/components/buttons/EditButton.tsx'
import { NewRecordButton } from '@/components/buttons/NewRecordButton.tsx'
import { CheckMarkIcon } from '@/components/icons/CheckMarkIcon.tsx'
import { SearchInput } from '@/components/inputs/SearchInput.tsx'
import { useFetchPageInViewport } from '@/hooks/useFetchPageInViewport.tsx'
import { TableLayout } from '@/layout/TableLayout.tsx'
import { useDeletePostMutation } from '@/services/generatedApi.ts'
import { useListPostsInfiniteQuery } from '@/services/injectedApi.ts'
import { recordsCountText } from '@/utils/constants.ts'
import { formatDateTime } from '@/utils/dateUtils.ts'
import { Table, Text } from '@mantine/core'
import { useDebouncedState } from '@mantine/hooks'
import { useMemo } from 'react'

export function ViewPosts() {
  const [searchTerm, setSearchTerm] = useDebouncedState('', 250)

  const query = useListPostsInfiniteQuery({ items: 20, searchTerm })
  const [deleteRecord] = useDeletePostMutation()

  const ref = useFetchPageInViewport(query)
  const data = useMemo(() => query.data?.pages.flatMap(x => x.items) ?? [], [query.data])

  return (
    <TableLayout topBar={
      <>
        <NewRecordButton/>
        <SearchInput onChange={setSearchTerm}/>
      </>
    }>
      <Table.Thead>
        <Table.Tr>
          <Table.Th w="4%"></Table.Th>
          <Table.Th w="46%">Pavadinimas</Table.Th>
          <Table.Th w="20%">Kalba</Table.Th>
          <Table.Th w="15%">Data</Table.Th>
          <Table.Th w="15%" ta="right" title={recordsCountText}>#{query.data?.pages[0].totalItems}</Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        {data.map((item, index) => (
          <Table.Tr key={item.id} ref={index === data.length - 5 ? ref : undefined}>
            <Table.Td pr="0">
              <CheckMarkIcon active={item.isPublished}/>
            </Table.Td>
            <Table.Td>
              <Text fw={item.isFeatured ? 'bold' : undefined} size="sm">{item.title}</Text>
            </Table.Td>
            <Table.Td>{item.language} {item.showInFeed && '(Naujienos)'}</Table.Td>
            <Table.Td>
              {formatDateTime(item.publishedAt)}
              {item.modifiedAt && <Text size="sm">{formatDateTime(item.modifiedAt)}</Text>}
            </Table.Td>
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