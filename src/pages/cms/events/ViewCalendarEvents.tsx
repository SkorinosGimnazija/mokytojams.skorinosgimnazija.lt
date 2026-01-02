import { DeleteButton } from '@/components/buttons/DeleteButton.tsx'
import { NewRecordButton } from '@/components/buttons/NewRecordButton.tsx'
import { SimpleMonthPicker } from '@/components/inputs/SimpleMonthPicker.tsx'
import { TableLayout } from '@/layout/TableLayout.tsx'
import { useDeleteCalendarEventMutation, useListCalendarEventsQuery } from '@/services/generatedApi.ts'
import { recordsCountText } from '@/utils/constants.ts'
import { formatDate, formatDateTime, getMonthEnd, getMonthStart } from '@/utils/dateUtils.ts'
import { Table, Text } from '@mantine/core'
import { useForm } from '@mantine/form'
import React from 'react'

export function ViewCalendarEvents() {
  const form = useForm({
    mode: 'controlled',
    initialValues: {
      startDate: getMonthStart(),
      endDate: getMonthEnd(),
    }
  })

  const query = useListCalendarEventsQuery({ ...form.getValues() })
  const [deleteRecord] = useDeleteCalendarEventMutation()

  return (
    <TableLayout topBar={
      <>
        <NewRecordButton/>
        <SimpleMonthPicker form={form}/>
      </>
    }>
      <Table.Thead>
        <Table.Tr>
          <Table.Th w="70%">Pavadinimas</Table.Th>
          <Table.Th w="15%">Laikas</Table.Th>
          <Table.Th w="15%" ta="right" title={recordsCountText}>#{query.data?.length}</Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        {query.data?.map((x) => (
          <Table.Tr key={x.id}>
            <Table.Td>{x.title}</Table.Td>
            <Table.Td>
              <Text size="sm">{x.allDay ? formatDate(x.startDate) : formatDateTime(x.startDate)}</Text>
              <Text size="sm">{x.allDay ? formatDate(x.endDate) : formatDateTime(x.endDate)}</Text>
            </Table.Td>
            <Table.Td ta="right">
              <DeleteButton onClick={() => deleteRecord(x.id)}/>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>

    </TableLayout>
  )
}