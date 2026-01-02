import { DeleteButton } from '@/components/buttons/DeleteButton.tsx'
import { EditButton } from '@/components/buttons/EditButton.tsx'
import { NewRecordButton } from '@/components/buttons/NewRecordButton.tsx'
import { TableLayout } from '@/layout/TableLayout.tsx'
import { useDeleteClassroomMutation, useListClassroomsQuery } from '@/services/generatedApi.ts'
import { recordsCountText } from '@/utils/constants.ts'
import { Table } from '@mantine/core'
import React from 'react'

export function ViewClassrooms() {
  const query = useListClassroomsQuery()
  const [deleteRecord] = useDeleteClassroomMutation()

  return (
    <TableLayout topBar={<NewRecordButton/>}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th w="10%">Nr.</Table.Th>
          <Table.Th w="60%">Klasė</Table.Th>
          <Table.Th w="20%" ta="right" title={recordsCountText}>#{query.data?.length}</Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        {query.data?.map((x) => (
          <Table.Tr key={x.id}>
            <Table.Td>{x.id}</Table.Td>
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