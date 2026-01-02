import { TableLayout } from '@/layout/TableLayout.tsx'
import { parseTimetable } from '@/pages/admin/timetable/parseTimetable.ts'
import {
  useCreateTimetableMutation,
  useGetTimetableStatsQuery,
  useListClassdaysQuery,
  useListClassroomsQuery,
  useListClasstimesQuery
} from '@/services/generatedApi.ts'
import { formatDate } from '@/utils/dateUtils.ts'
import { errorNotification, itemSavedNotification, validationErrorNotification } from '@/utils/notifications.ts'
import { Button, Table } from '@mantine/core'
import { Link } from 'react-router'

export function ViewTimetable() {
  const query = useGetTimetableStatsQuery()

  const roomsQuery = useListClassroomsQuery()
  const daysQuery = useListClassdaysQuery()
  const timesQuery = useListClasstimesQuery()

  const [createTimetableMutation] = useCreateTimetableMutation()

  const handleImport = async () => {
    try {
      const clipboard = await navigator.clipboard.read()
      const blob = await clipboard[0].getType('text/html')
      const html = await blob.text()

      const data = parseTimetable({ html, rooms: roomsQuery.data, days: daysQuery.data, times: timesQuery.data })
      if (!data.length) {
        validationErrorNotification()
        return
      }

      const response = await createTimetableMutation(data)
      if ('error' in response) {
        return
      }

      itemSavedNotification()
    } catch (e: any) {
      errorNotification({ message: e.toString() })
    }
  }

  return (
    <TableLayout topBar={
      <>
        <Button onClick={handleImport}>Importuoti tvarkaraštį</Button>
        <Button component={Link} to="delete" viewTransition>Ištrinti tvarkaraštį</Button>
        <Button component={Link} to="classrooms">Klasės</Button>
        <Button component={Link} to="classtimes">Pamokos</Button>
        <Button component={Link} to="short-days">Sutrumpintos dienos</Button>
      </>
    }>
      <Table.Thead>
        <Table.Tr>
          <Table.Th w="32%">Klasė</Table.Th>
          <Table.Th w="32%">Pamokų kiekis</Table.Th>
          <Table.Th w="36%">Pakeitimai</Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        {query.data?.map((x) => {
          return (
            <Table.Tr key={x.roomId}>
              <Table.Td>{x.roomName}</Table.Td>
              <Table.Td>{Object.values(x.countsByDay).join(', ')}</Table.Td>
              <Table.Td>{x.overrideDates.map(x => formatDate(x)).join(', ')}</Table.Td>
            </Table.Tr>
          )
        })}
      </Table.Tbody>

    </TableLayout>
  )
}