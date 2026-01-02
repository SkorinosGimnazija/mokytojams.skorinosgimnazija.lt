import { ProtectedComponent } from '@/components/auth/ProtectedComponent.tsx'
import { DeleteButton } from '@/components/buttons/DeleteButton.tsx'
import { useFetchPageInViewport } from '@/hooks/useFetchPageInViewport.tsx'
import { TableLayout } from '@/layout/TableLayout.tsx'
import { useDeleteAppointmentMutation, useListTeachersQuery } from '@/services/generatedApi.ts'
import { useListAppointmentsInfiniteQuery } from '@/services/injectedApi.ts'
import { nothingFoundMessage, recordsCountText, searchMessage } from '@/utils/constants.ts'
import { formatDateTime } from '@/utils/dateUtils.ts'
import { lithuanianSearchFilter } from '@/utils/optionFilters.ts'
import { Button, Select, Table, Text } from '@mantine/core'
import { useField } from '@mantine/form'
import React, { useMemo } from 'react'
import { Link } from 'react-router'

export function ViewAppointments() {
  const teacher = useField({ initialValue: '' })

  const query = useListAppointmentsInfiniteQuery({
    items: 20,
    userId: teacher.getValue() ? Number(teacher.getValue()) : undefined
  })
  const [deleteRecord] = useDeleteAppointmentMutation()

  const ref = useFetchPageInViewport(query)
  const data = useMemo(() => query.data?.pages.flatMap(x => x.items) ?? [], [query.data])

  const teachersQuery = useListTeachersQuery(undefined, {
    selectFromResult: ({ data }) => ({
      data: data?.map(x => ({
        value: String(x.id),
        label: x.name,
        normalizedName: x.normalizedName
      })) ?? []
    })
  })

  return (
    <TableLayout topBar={
      <>
        <Button component={Link} to="types">Nustatymai</Button>
        <Select
          {...teacher.getInputProps()}
          placeholder={searchMessage}
          nothingFoundMessage={nothingFoundMessage}
          filter={lithuanianSearchFilter}
          maxDropdownHeight={200}
          searchable
          clearable
          w={'13rem'}
          data={teachersQuery.data}
        />
      </>
    }>

      <Table.Thead>
        <Table.Tr>
          <Table.Th w="40%">Dalyvis</Table.Th>
          <Table.Th w="20%">Mokytojas</Table.Th>
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
              {item.attendeeName} {item.note && `(${item.note})`}
              <Text size="xs">{item.attendeeEmail}</Text>
            </Table.Td>
            <Table.Td>
              {item.hostName}
            </Table.Td>
            <Table.Td>
              {formatDateTime(item.date)}
              <Text size="xs">{item.typeName}</Text>
            </Table.Td>
            <Table.Td ta="right">
              <ProtectedComponent authRole={'Admin'}>
                <DeleteButton onClick={() => deleteRecord(item.id)}/>
              </ProtectedComponent>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>

    </TableLayout>
  )
}