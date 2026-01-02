import { ProtectedComponent } from '@/components/auth/ProtectedComponent.tsx'
import { ConfirmationButton } from '@/components/buttons/ConfirmationButton.tsx'
import { DeleteButton } from '@/components/buttons/DeleteButton.tsx'
import { EditButton } from '@/components/buttons/EditButton.tsx'
import { NewRecordButton } from '@/components/buttons/NewRecordButton.tsx'
import { TableLayout } from '@/layout/TableLayout.tsx'
import {
  useDeleteAppointmentTypeMutation,
  useListAppointmentTypesQuery,
  useResetAppointmentTypeMutation
} from '@/services/generatedApi.ts'
import { recordsCountText } from '@/utils/constants.ts'
import { formatDateTime } from '@/utils/dateUtils.ts'
import { ActionIcon, Table } from '@mantine/core'
import { CalendarSlashIcon, ClockIcon, UserIcon } from '@phosphor-icons/react'
import React from 'react'
import { Link } from 'react-router'

export function ViewAppointmentTypes() {
  const query = useListAppointmentTypesQuery(false)

  const [deleteRecord] = useDeleteAppointmentTypeMutation()
  const [resetRecord] = useResetAppointmentTypeMutation()

  return (
    <TableLayout
      topBar={
        <ProtectedComponent authRole={'Admin'}>
          <NewRecordButton/>
        </ProtectedComponent>
      }
    >
      <Table.Thead>
        <Table.Tr>
          <Table.Th w="35%">Pavadinimas</Table.Th>
          <Table.Th w="25%">Registracijos pabaiga</Table.Th>
          <Table.Th w="20%"></Table.Th>
          <Table.Th w="20%" ta="right" title={recordsCountText}>
            #{query.data?.length}
          </Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        {query.data?.map((item) => (
          <Table.Tr key={item.id}>
            <Table.Td>{item.name}</Table.Td>
            <Table.Td>
              {formatDateTime(item.registrationEndsAt)}
            </Table.Td>
            <Table.Td ta="center">
              <ProtectedComponent authRole={'Admin'}>
                <ActionIcon
                  component={Link}
                  to={`${item.id}/dates`}
                  preventScrollReset
                  title="Laikas"
                  variant="subtle"
                  size="2.25rem"
                >
                  <ClockIcon size="1.5rem"/>
                </ActionIcon>
              </ProtectedComponent>
              <ActionIcon
                component={Link}
                to={`${item.id}/users`}
                preventScrollReset
                title="Mokytojų laikas"
                variant="subtle"
                size="2.25rem"
              >
                <UserIcon size="1.5rem"/>
              </ActionIcon>
            </Table.Td>
            <Table.Td align="right">
              <ProtectedComponent authRole={'Admin'}>
                <EditButton to={item.id}/>
                <ConfirmationButton
                  onClick={() => resetRecord(item.id)}
                  icon={<CalendarSlashIcon color="orange" size="1.5rem"/>}
                  modalTitle="Ištrinti visas registracijas?"
                  tooltipTitle="Ištrinti registracijas"
                />
                <DeleteButton onClick={() => deleteRecord(item.id)}/>
              </ProtectedComponent>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>

    </TableLayout>
  )
}