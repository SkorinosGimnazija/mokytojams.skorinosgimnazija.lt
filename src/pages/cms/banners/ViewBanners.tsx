import { DeleteButton } from '@/components/buttons/DeleteButton.tsx'
import { EditButton } from '@/components/buttons/EditButton.tsx'
import { NewRecordButton } from '@/components/buttons/NewRecordButton.tsx'
import { CheckMarkIcon } from '@/components/icons/CheckMarkIcon.tsx'
import { TableLayout } from '@/layout/TableLayout.tsx'
import { useDeleteBannerMutation, useListBannersQuery } from '@/services/generatedApi.ts'
import { recordsCountText } from '@/utils/constants.ts'
import { Table } from '@mantine/core'

export function ViewBanners() {
  const query = useListBannersQuery()
  const [deleteRecord] = useDeleteBannerMutation()

  return (
    <TableLayout topBar={<NewRecordButton/>}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th w="4%"></Table.Th>
          <Table.Th w="51%">Pavadinimas</Table.Th>
          <Table.Th w="15%">Kalba</Table.Th>
          <Table.Th w="15%">Eilė</Table.Th>
          <Table.Th w="15%" ta="right" title={recordsCountText}>#{query.data?.length}</Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        {query.data?.map(item => (
          <Table.Tr key={item.id}>
            <Table.Td pr="0">
              <CheckMarkIcon active={item.isPublished}/>
            </Table.Td>
            <Table.Td>{item.title}</Table.Td>
            <Table.Td>{item.language}</Table.Td>
            <Table.Td>{item.order}</Table.Td>
            <Table.Td align="right">
              <EditButton to={item.id}/>
              <DeleteButton onClick={() => deleteRecord(item.id)}/>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </TableLayout>
  )
}