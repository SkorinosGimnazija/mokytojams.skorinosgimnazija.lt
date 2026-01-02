import { DeleteButton } from '@/components/buttons/DeleteButton.tsx'
import { EditButton } from '@/components/buttons/EditButton.tsx'
import { NewRecordButton } from '@/components/buttons/NewRecordButton.tsx'
import { CheckMarkIcon } from '@/components/icons/CheckMarkIcon.tsx'
import { TableLayout } from '@/layout/TableLayout.tsx'
import { useDeleteObservationStudentMutation, useListObservationStudentsQuery } from '@/services/generatedApi.ts'
import { recordsCountText } from '@/utils/constants.ts'
import { Table } from '@mantine/core'
import React from 'react'

export function ViewObservationStudents() {
  const query = useListObservationStudentsQuery(false)

  const [deleteRecord] = useDeleteObservationStudentMutation()

  return (
    <TableLayout topBar={<NewRecordButton/>}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th w="1rem"></Table.Th>
          <Table.Th>Mokinys</Table.Th>
          <Table.Th ta="right" title={recordsCountText}>
            #{query.data?.length}
          </Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        {query.data?.map((x) => (
          <Table.Tr key={x.id}>
            <Table.Td pr={0}><CheckMarkIcon active={x.isActive}/></Table.Td>
            <Table.Td>{x.name}</Table.Td>
            <Table.Td ta="right">
              <EditButton to={x.id}/>
              <DeleteButton onClick={() => deleteRecord(x.id)}/>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>

    </TableLayout>
  )
}