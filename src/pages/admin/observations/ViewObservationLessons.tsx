import { DeleteButton } from '@/components/buttons/DeleteButton.tsx'
import { EditButton } from '@/components/buttons/EditButton.tsx'
import { NewRecordButton } from '@/components/buttons/NewRecordButton.tsx'
import { TableLayout } from '@/layout/TableLayout.tsx'
import { useDeleteObservationLessonMutation, useListObservationLessonsQuery } from '@/services/generatedApi.ts'
import { recordsCountText } from '@/utils/constants.ts'
import { Table } from '@mantine/core'
import React from 'react'

export function ViewObservationLessons() {
  const query = useListObservationLessonsQuery()
  const [deleteRecord] = useDeleteObservationLessonMutation()

  return (
    <TableLayout
      topBar={
        <>
          <NewRecordButton/>
        </>
      }
    >
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Pamoka</Table.Th>
          <Table.Th ta="right" title={recordsCountText}>
            #{query.data?.length}
          </Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        {query.data?.map((x) => (
          <Table.Tr key={x.id}>
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