import { DeleteButton } from '@/components/buttons/DeleteButton.tsx'
import { NewRecordButton } from '@/components/buttons/NewRecordButton.tsx'
import { useAuth } from '@/hooks/useAuth.tsx'
import { useFetchPageInViewport } from '@/hooks/useFetchPageInViewport.tsx'
import { TableLayout } from '@/layout/TableLayout.tsx'
import { useDeleteAppointmentMutation } from '@/services/generatedApi.ts'
import { useListAppointmentsInfiniteQuery } from '@/services/injectedApi.ts'
import { recordsCountText } from '@/utils/constants.ts'
import { formatDateTime } from '@/utils/dateUtils.ts'
import { ActionIcon, Table, Text } from '@mantine/core'
import { VideoCameraIcon } from '@phosphor-icons/react'
import React, { useMemo } from 'react'

export function ViewAppointments() {
  const auth = useAuth()

  const query = useListAppointmentsInfiniteQuery({ items: 20, userId: auth.userId })
  const [deleteRecord] = useDeleteAppointmentMutation()

  const ref = useFetchPageInViewport(query)
  const data = useMemo(() => query.data?.pages.flatMap(x => x.items) ?? [], [query.data])

  return (
    <TableLayout topBar={<NewRecordButton title="Registruotis"/>}>

      <Table.Thead>
        <Table.Tr>
          <Table.Th w="40%">Vardas</Table.Th>
          <Table.Th w="20%">Data</Table.Th>
          <Table.Th w="20%" ta="center">Google Meet</Table.Th>
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
              {auth.userId == item.hostId ?
                <>
                  {item.attendeeName} ({item.note})
                  <Text size="xs">{item.attendeeEmail}</Text>
                </>
                : item.hostName
              }
            </Table.Td>
            <Table.Td>
              {formatDateTime(item.date)}
              <Text size="xs">{item.typeName}</Text>
            </Table.Td>
            <Table.Td ta="center">
              {item.link ?
                <ActionIcon
                  component="a"
                  href={`${item.link}?authuser=${auth.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Prisijungti prie Google Meet"
                  variant="subtle"
                  size="2.25rem"
                >
                  <VideoCameraIcon size="1.5rem"/>
                </ActionIcon> : '-'}
            </Table.Td>
            <Table.Td ta="right">
              {auth.email == item.attendeeEmail &&
                <DeleteButton onClick={() => deleteRecord(item.id)}/>
              }
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>

    </TableLayout>
  )
}